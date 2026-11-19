"""Fake host for the PTC runner (driven by runner.rs tests): one reply frame per host message."""
import base64, json, os, select, subprocess, sys, time

RUNNER = sys.argv[1]

def b64e(s): return base64.b64encode(s.encode()).decode()
def b64d(s): return base64.b64decode(s).decode()

class Host:
    def __init__(self):
        self.p = subprocess.Popen([sys.executable, "-u", "-B", RUNNER],
                                  stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                  stderr=subprocess.PIPE, env={**os.environ, "PTC_TOOLS": "echo,slow"})
        self.buf = {self.p.stdout.fileno(): b"", self.p.stderr.fileno(): b""}
        assert self.next_frame(5) == ("ready", None)

    def next_frame(self, timeout):
        deadline = time.monotonic() + timeout
        while True:
            for fd, data in self.buf.items():
                if b"\n" in data:
                    line, rest = data.split(b"\n", 1)
                    self.buf[fd] = rest
                    line = line.decode()
                    if line == "__READY__": return ("ready", None)
                    if line.startswith("__PTC_TOOL_CALL__"):
                        return ("call", json.loads(b64d(line[len("__PTC_TOOL_CALL__"):-len("__PTC_END_CALL__")])))
                    if line.startswith("__PTC_OUTPUT__"):
                        return ("output", json.loads(b64d(line[len("__PTC_OUTPUT__"):-len("__PTC_END_OUTPUT__")])))
                    return ("noise", line)
            rem = deadline - time.monotonic()
            if rem <= 0: return None
            r, _, _ = select.select(list(self.buf), [], [], rem)
            for fd in r:
                chunk = os.read(fd, 65536)
                if not chunk: return ("eof", None)
                self.buf[fd] += chunk

    def send(self, data):
        self.p.stdin.write(data.encode()); self.p.stdin.flush()

    def run(self, code, answer, drop_ids=()):
        """Returns (output, list of batch sizes). Asserts one frame per message."""
        self.send(f"__CODE_START__\n{b64e(code)}\n__CODE_END__\n")
        batches = []
        while True:
            f = self.next_frame(30)
            assert f is not None, "no reply frame"
            # One frame per host message: nothing more may arrive before we reply.
            extra = self.next_frame(0.3)
            assert extra is None, f"unsolicited frame: {extra}"
            kind, payload = f
            if kind == "output":
                return payload, batches
            assert kind == "call", f
            calls = payload["calls"]
            assert len(calls) <= 32
            ids = [c["tool_use_id"] for c in calls]
            assert len(set(ids)) == len(ids)
            batches.append(len(calls))
            res = [{"tool_use_id": c["tool_use_id"], "content": answer(c)}
                   for c in calls if c["tool_use_id"] not in drop_ids and c["input"].get("i") not in drop_ids]
            self.send(f"__PTC_TOOL_RESULT__{b64e(json.dumps({'results': res}))}__PTC_END_RESULT__\n")

def echo(c): return {"tool": c["name"], "i": c["input"].get("i")}

h = Host()

# 1. Concurrent calls from 8 threads → routed correctly, no None.
out, batches = h.run("""
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(8) as ex:
    rs = list(ex.map(lambda i: echo(i=i), range(8)))
assert all(r is not None for r in rs), rs
assert [r['i'] for r in rs] == list(range(8)), rs
print('ok1', len(rs))
""", echo)
assert out["exit_code"] == 0, out
assert "ok1 8" in out["stdout"], out
print("test1 batches", batches)
assert sum(batches) == 8 and len(batches) <= 2

# 2. Nested: each thread makes 3 sequential calls; 16 tasks on 8 threads.
out, batches = h.run("""
from concurrent.futures import ThreadPoolExecutor
def work(i):
    a = echo(i=i*10+0); b = slow(i=i*10+1); c = echo(i=i*10+2)
    return [a['i'], b['i'], c['i'], b['tool']]
with ThreadPoolExecutor(8) as ex:
    rs = list(ex.map(work, range(16)))
for i, r in enumerate(rs):
    assert r == [i*10, i*10+1, i*10+2, 'slow'], (i, r)
print('ok2')
""", echo)
assert out["exit_code"] == 0 and "ok2" in out["stdout"], out
print("test2 batches", batches)
assert sum(batches) == 48

# 3. Sequential single-thread calls still work, one per round-trip.
out, batches = h.run("print([echo(i=k)['i'] for k in range(3)])", echo)
assert "[0, 1, 2]" in out["stdout"] and batches == [1, 1, 1], (out, batches)

# 4. > 32 concurrent calls: excess get error results, session survives.
out, batches = h.run("""
import threading
res = {}
bar = threading.Barrier(40)
def w(i):
    bar.wait(); res[i] = echo(i=i)
ts = [threading.Thread(target=w, args=(i,)) for i in range(40)]
[t.start() for t in ts]; [t.join() for t in ts]
ok = [i for i, r in res.items() if r.get('i') == i]
err = [i for i, r in res.items() if 'error' in r]
assert len(res) == 40 and len(ok) + len(err) == 40, res
print('ok4', len(ok), len(err))
""", echo)
assert out["exit_code"] == 0 and "ok4" in out["stdout"], out
print("test4", out["stdout"].strip(), batches)

# 5. Missing result in the host reply → error for that call, not None / hang.
out, batches = h.run("r = echo(i=7); print('missing' if 'error' in r else r)", echo, drop_ids=(7,))
assert "missing" in out["stdout"], out

# 6. Straggler thread still calling after code ends → no frame after output.
out, batches = h.run("""
import threading, time
def late():
    time.sleep(0.5); echo(i=99)
threading.Thread(target=late, daemon=True).start()
print('done6')
""", echo)
assert "done6" in out["stdout"], out
time.sleep(1.0)
assert h.next_frame(0.5) is None, "straggler frame leaked"

# 7. Session still usable afterwards.
out, batches = h.run("print(echo(i=5)['i'])", echo)
assert out["stdout"].strip() == "5", out
print("ALL OK")
h.p.stdin.close(); h.p.wait(5)
