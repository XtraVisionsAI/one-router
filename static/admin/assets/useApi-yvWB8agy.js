import { ai as u, u as c } from "./index-DicalUKt.js";
function h() {
  const r = u(), e = c();
  async function o(a, n, s) {
    var _a;
    const t = await fetch("/admin/api" + n, { method: a, headers: { "x-api-key": r.apiKey, ...s !== void 0 ? { "Content-Type": "application/json" } : {} }, body: s !== void 0 ? JSON.stringify(s) : void 0 });
    if (t.status === 401 || t.status === 403) throw r.logout(), e.push("/login"), new Error("Unauthorized");
    if (!t.ok) {
      const i = await t.json().catch(() => ({ error: { message: t.statusText } }));
      throw new Error(`[${t.status}] ${((_a = i.error) == null ? void 0 : _a.message) ?? t.statusText}`);
    }
    return t.json();
  }
  return { request: o };
}
export {
  h as u
};
