(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const i of r) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: true, subtree: true });
  function n(r) {
    const i = {};
    return r.integrity && (i.integrity = r.integrity), r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? i.credentials = "include" : r.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function s(r) {
    if (r.ep) return;
    r.ep = true;
    const i = n(r);
    fetch(r.href, i);
  }
})();
/**
* @vue/shared v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function is(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const X = {}, Rt = [], Be = () => {
}, Ar = () => false, yn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), bn = (e) => e.startsWith("onUpdate:"), ce = Object.assign, os = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Gi = Object.prototype.hasOwnProperty, k = (e, t) => Gi.call(e, t), V = Array.isArray, jt = (e) => en(e) === "[object Map]", Ki = (e) => en(e) === "[object Set]", Is = (e) => en(e) === "[object Date]", B = (e) => typeof e == "function", ie = (e) => typeof e == "string", lt = (e) => typeof e == "symbol", Z = (e) => e !== null && typeof e == "object", Sr = (e) => (Z(e) || B(e)) && B(e.then) && B(e.catch), Wi = Object.prototype.toString, en = (e) => Wi.call(e), qi = (e) => en(e).slice(8, -1), ki = (e) => en(e) === "[object Object]", ls = (e) => ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vt = is(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), En = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, $i = /-\w/g, ge = En((e) => e.replace($i, (t) => t.slice(1).toUpperCase())), Ji = /\B([A-Z])/g, mt = En((e) => e.replace(Ji, "-$1").toLowerCase()), xn = En((e) => e.charAt(0).toUpperCase() + e.slice(1)), Tn = En((e) => e ? `on${xn(e)}` : ""), Ve = (e, t) => !Object.is(e, t), In = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, Cr = (e, t, n, s = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: s, value: n });
}, zi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ns;
const Rn = () => Ns || (Ns = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function cs(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = ie(s) ? Zi(s) : cs(s);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else if (ie(e) || Z(e)) return e;
}
const Qi = /;(?![^(]*\))/g, Yi = /:([^]+)/, Xi = /\/\*[^]*?\*\//g;
function Zi(e) {
  const t = {};
  return e.replace(Xi, "").split(Qi).forEach((n) => {
    if (n) {
      const s = n.split(Yi);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function us(e) {
  let t = "";
  if (ie(e)) t = e;
  else if (V(e)) for (let n = 0; n < e.length; n++) {
    const s = us(e[n]);
    s && (t += s + " ");
  }
  else if (Z(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const eo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", to = is(eo);
function wr(e) {
  return !!e || e === "";
}
function no(e, t) {
  if (e.length !== t.length) return false;
  let n = true;
  for (let s = 0; n && s < e.length; s++) n = fs(e[s], t[s]);
  return n;
}
function fs(e, t) {
  if (e === t) return true;
  let n = Is(e), s = Is(t);
  if (n || s) return n && s ? e.getTime() === t.getTime() : false;
  if (n = lt(e), s = lt(t), n || s) return e === t;
  if (n = V(e), s = V(t), n || s) return n && s ? no(e, t) : false;
  if (n = Z(e), s = Z(t), n || s) {
    if (!n || !s) return false;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i) return false;
    for (const o in e) {
      const l = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (l && !c || !l && c || !fs(e[o], t[o])) return false;
    }
  }
  return String(e) === String(t);
}
/**
* @vue/reactivity v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ve;
class Or {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = ve, !t && ve && (this.index = (ve.scopes || (ve.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ve;
      try {
        return ve = this, t();
      } finally {
        ve = n;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = ve, ve = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (ve = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function so(e) {
  return new Or(e);
}
function ro() {
  return ve;
}
let Y;
const Nn = /* @__PURE__ */ new WeakSet();
class Pr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ve && ve.active && ve.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Nn.has(this) && (Nn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ir(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Ms(this), Nr(this);
    const t = Y, n = Se;
    Y = this, Se = true;
    try {
      return this.fn();
    } finally {
      Mr(this), Y = t, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) ds(t);
      this.deps = this.depsTail = void 0, Ms(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Nn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Wn(this) && this.run();
  }
  get dirty() {
    return Wn(this);
  }
}
let Tr = 0, Bt, Ut;
function Ir(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Ut, Ut = e;
    return;
  }
  e.next = Bt, Bt = e;
}
function as() {
  Tr++;
}
function hs() {
  if (--Tr > 0) return;
  if (Ut) {
    let t = Ut;
    for (Ut = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Bt; ) {
    let t = Bt;
    for (Bt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (s) {
        e || (e = s);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function Nr(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Mr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ds(s), io(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Wn(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Dr(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Dr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === $t) || (e.globalVersion = $t, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Wn(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = Y, s = Se;
  Y = e, Se = true;
  try {
    Nr(e);
    const r = e.fn(e._value);
    (t.version === 0 || Ve(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Y = n, Se = s, Mr(e), e.flags &= -3;
  }
}
function ds(e, t = false) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) ds(i, true);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function io(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Se = true;
const Lr = [];
function Qe() {
  Lr.push(Se), Se = false;
}
function Ye() {
  const e = Lr.pop();
  Se = e === void 0 ? true : e;
}
function Ms(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Y;
    Y = void 0;
    try {
      t();
    } finally {
      Y = n;
    }
  }
}
let $t = 0;
class oo {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ps {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!Y || !Se || Y === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Y) n = this.activeLink = new oo(Y, this), Y.deps ? (n.prevDep = Y.depsTail, Y.depsTail.nextDep = n, Y.depsTail = n) : Y.deps = Y.depsTail = n, Fr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Y.depsTail, n.nextDep = void 0, Y.depsTail.nextDep = n, Y.depsTail = n, Y.deps === n && (Y.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, $t++, this.notify(t);
  }
  notify(t) {
    as();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      hs();
    }
  }
}
function Fr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Fr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const qn = /* @__PURE__ */ new WeakMap(), gt = Symbol(""), kn = Symbol(""), Jt = Symbol("");
function ue(e, t, n) {
  if (Se && Y) {
    let s = qn.get(e);
    s || qn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ps()), r.map = s, r.key = n), r.track();
  }
}
function Je(e, t, n, s, r, i) {
  const o = qn.get(e);
  if (!o) {
    $t++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (as(), t === "clear") o.forEach(l);
  else {
    const c = V(e), d = c && ls(n);
    if (c && n === "length") {
      const f = Number(s);
      o.forEach((h, g) => {
        (g === "length" || g === Jt || !lt(g) && g >= f) && l(h);
      });
    } else switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(Jt)), t) {
      case "add":
        c ? d && l(o.get("length")) : (l(o.get(gt)), jt(e) && l(o.get(kn)));
        break;
      case "delete":
        c || (l(o.get(gt)), jt(e) && l(o.get(kn)));
        break;
      case "set":
        jt(e) && l(o.get(gt));
        break;
    }
  }
  hs();
}
function bt(e) {
  const t = q(e);
  return t === e ? t : (ue(t, "iterate", Jt), Ce(e) ? t : t.map(Xe));
}
function gs(e) {
  return ue(e = q(e), "iterate", Jt), e;
}
function He(e, t) {
  return ct(e) ? zt(At(e) ? Xe(t) : t) : Xe(t);
}
const lo = { __proto__: null, [Symbol.iterator]() {
  return Mn(this, Symbol.iterator, (e) => He(this, e));
}, concat(...e) {
  return bt(this).concat(...e.map((t) => V(t) ? bt(t) : t));
}, entries() {
  return Mn(this, "entries", (e) => (e[1] = He(this, e[1]), e));
}, every(e, t) {
  return Ke(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return Ke(this, "filter", e, t, (n) => n.map((s) => He(this, s)), arguments);
}, find(e, t) {
  return Ke(this, "find", e, t, (n) => He(this, n), arguments);
}, findIndex(e, t) {
  return Ke(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return Ke(this, "findLast", e, t, (n) => He(this, n), arguments);
}, findLastIndex(e, t) {
  return Ke(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return Ke(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return Dn(this, "includes", e);
}, indexOf(...e) {
  return Dn(this, "indexOf", e);
}, join(e) {
  return bt(this).join(e);
}, lastIndexOf(...e) {
  return Dn(this, "lastIndexOf", e);
}, map(e, t) {
  return Ke(this, "map", e, t, void 0, arguments);
}, pop() {
  return Dt(this, "pop");
}, push(...e) {
  return Dt(this, "push", e);
}, reduce(e, ...t) {
  return Ds(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return Ds(this, "reduceRight", e, t);
}, shift() {
  return Dt(this, "shift");
}, some(e, t) {
  return Ke(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return Dt(this, "splice", e);
}, toReversed() {
  return bt(this).toReversed();
}, toSorted(e) {
  return bt(this).toSorted(e);
}, toSpliced(...e) {
  return bt(this).toSpliced(...e);
}, unshift(...e) {
  return Dt(this, "unshift", e);
}, values() {
  return Mn(this, "values", (e) => He(this, e));
} };
function Mn(e, t, n) {
  const s = gs(e), r = s[t]();
  return s !== e && !Ce(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const co = Array.prototype;
function Ke(e, t, n, s, r, i) {
  const o = gs(e), l = o !== e && !Ce(e), c = o[t];
  if (c !== co[t]) {
    const h = c.apply(e, i);
    return l ? Xe(h) : h;
  }
  let d = n;
  o !== e && (l ? d = function(h, g) {
    return n.call(this, He(e, h), g, e);
  } : n.length > 2 && (d = function(h, g) {
    return n.call(this, h, g, e);
  }));
  const f = c.call(o, d, s);
  return l && r ? r(f) : f;
}
function Ds(e, t, n, s) {
  const r = gs(e), i = r !== e && !Ce(e);
  let o = n, l = false;
  r !== e && (i ? (l = s.length === 0, o = function(d, f, h) {
    return l && (l = false, d = He(e, d)), n.call(this, d, He(e, f), h, e);
  }) : n.length > 3 && (o = function(d, f, h) {
    return n.call(this, d, f, h, e);
  }));
  const c = r[t](o, ...s);
  return l ? He(e, c) : c;
}
function Dn(e, t, n) {
  const s = q(e);
  ue(s, "iterate", Jt);
  const r = s[t](...n);
  return (r === -1 || r === false) && vs(n[0]) ? (n[0] = q(n[0]), s[t](...n)) : r;
}
function Dt(e, t, n = []) {
  Qe(), as();
  const s = q(e)[t].apply(e, n);
  return hs(), Ye(), s;
}
const uo = is("__proto__,__v_isRef,__isVue"), Hr = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lt));
function fo(e) {
  lt(e) || (e = String(e));
  const t = q(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
class jr {
  constructor(t = false, n = false) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw") return s === (r ? i ? Eo : Gr : i ? Ur : Br).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = V(t);
    if (!r) {
      let c;
      if (o && (c = lo[n])) return c;
      if (n === "hasOwnProperty") return fo;
    }
    const l = Reflect.get(t, n, ae(t) ? t : s);
    if ((lt(n) ? Hr.has(n) : uo(n)) || (r || ue(t, "get", n), i)) return l;
    if (ae(l)) {
      const c = o && ls(n) ? l : l.value;
      return r && Z(c) ? Jn(c) : c;
    }
    return Z(l) ? r ? Jn(l) : An(l) : l;
  }
}
class Vr extends jr {
  constructor(t = false) {
    super(false, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = V(t) && ls(n);
    if (!this._isShallow) {
      const d = ct(i);
      if (!Ce(s) && !ct(s) && (i = q(i), s = q(s)), !o && ae(i) && !ae(s)) return d || (i.value = s), true;
    }
    const l = o ? Number(n) < t.length : k(t, n), c = Reflect.set(t, n, s, ae(t) ? t : r);
    return t === q(r) && (l ? Ve(s, i) && Je(t, "set", n, s) : Je(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = k(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Je(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!lt(n) || !Hr.has(n)) && ue(t, "has", n), s;
  }
  ownKeys(t) {
    return ue(t, "iterate", V(t) ? "length" : gt), Reflect.ownKeys(t);
  }
}
class ao extends jr {
  constructor(t = false) {
    super(true, t);
  }
  set(t, n) {
    return true;
  }
  deleteProperty(t, n) {
    return true;
  }
}
const ho = new Vr(), po = new ao(), go = new Vr(true);
const $n = (e) => e, sn = (e) => Reflect.getPrototypeOf(e);
function mo(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = q(r), o = jt(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), f = n ? $n : t ? zt : Xe;
    return !t && ue(i, "iterate", c ? kn : gt), ce(Object.create(d), { next() {
      const { value: h, done: g } = d.next();
      return g ? { value: h, done: g } : { value: l ? [f(h[0]), f(h[1])] : f(h), done: g };
    } });
  };
}
function rn(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function _o(e, t) {
  const n = { get(r) {
    const i = this.__v_raw, o = q(i), l = q(r);
    e || (Ve(r, l) && ue(o, "get", r), ue(o, "get", l));
    const { has: c } = sn(o), d = t ? $n : e ? zt : Xe;
    if (c.call(o, r)) return d(i.get(r));
    if (c.call(o, l)) return d(i.get(l));
    i !== o && i.get(r);
  }, get size() {
    const r = this.__v_raw;
    return !e && ue(q(r), "iterate", gt), r.size;
  }, has(r) {
    const i = this.__v_raw, o = q(i), l = q(r);
    return e || (Ve(r, l) && ue(o, "has", r), ue(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
  }, forEach(r, i) {
    const o = this, l = o.__v_raw, c = q(l), d = t ? $n : e ? zt : Xe;
    return !e && ue(c, "iterate", gt), l.forEach((f, h) => r.call(i, d(f), d(h), o));
  } };
  return ce(n, e ? { add: rn("add"), set: rn("set"), delete: rn("delete"), clear: rn("clear") } : { add(r) {
    const i = q(this), o = sn(i), l = q(r), c = !t && !Ce(r) && !ct(r) ? l : r;
    return o.has.call(i, c) || Ve(r, c) && o.has.call(i, r) || Ve(l, c) && o.has.call(i, l) || (i.add(c), Je(i, "add", c, c)), this;
  }, set(r, i) {
    !t && !Ce(i) && !ct(i) && (i = q(i));
    const o = q(this), { has: l, get: c } = sn(o);
    let d = l.call(o, r);
    d || (r = q(r), d = l.call(o, r));
    const f = c.call(o, r);
    return o.set(r, i), d ? Ve(i, f) && Je(o, "set", r, i) : Je(o, "add", r, i), this;
  }, delete(r) {
    const i = q(this), { has: o, get: l } = sn(i);
    let c = o.call(i, r);
    c || (r = q(r), c = o.call(i, r)), l && l.call(i, r);
    const d = i.delete(r);
    return c && Je(i, "delete", r, void 0), d;
  }, clear() {
    const r = q(this), i = r.size !== 0, o = r.clear();
    return i && Je(r, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    n[r] = mo(r, e, t);
  }), n;
}
function ms(e, t) {
  const n = _o(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(k(n, r) && r in s ? n : s, r, i);
}
const vo = { get: ms(false, false) }, yo = { get: ms(false, true) }, bo = { get: ms(true, false) };
const Br = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap();
function xo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ro(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xo(qi(e));
}
function An(e) {
  return ct(e) ? e : _s(e, false, ho, vo, Br);
}
function Kr(e) {
  return _s(e, false, go, yo, Ur);
}
function Jn(e) {
  return _s(e, true, po, bo, Gr);
}
function _s(e, t, n, s, r) {
  if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const i = Ro(e);
  if (i === 0) return e;
  const o = r.get(e);
  if (o) return o;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function At(e) {
  return ct(e) ? At(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
function Ce(e) {
  return !!(e && e.__v_isShallow);
}
function vs(e) {
  return e ? !!e.__v_raw : false;
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
function Wr(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && Cr(e, "__v_skip", true), e;
}
const Xe = (e) => Z(e) ? An(e) : e, zt = (e) => Z(e) ? Jn(e) : e;
function ae(e) {
  return e ? e.__v_isRef === true : false;
}
function qr(e) {
  return kr(e, false);
}
function Ao(e) {
  return kr(e, true);
}
function kr(e, t) {
  return ae(e) ? e : new So(e, t);
}
class So {
  constructor(t, n) {
    this.dep = new ps(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : q(t), this._value = n ? t : Xe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || Ce(t) || ct(t);
    t = s ? t : q(t), Ve(t, n) && (this._rawValue = t, this._value = s ? t : Xe(t), this.dep.trigger());
  }
}
function St(e) {
  return ae(e) ? e.value : e;
}
const Co = { get: (e, t, n) => t === "__v_raw" ? e : St(Reflect.get(e, t, n)), set: (e, t, n, s) => {
  const r = e[t];
  return ae(r) && !ae(n) ? (r.value = n, true) : Reflect.set(e, t, n, s);
} };
function $r(e) {
  return At(e) ? e : new Proxy(e, Co);
}
class wo {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ps(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = $t - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && Y !== this) return Ir(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return Dr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Oo(e, t, n = false) {
  let s, r;
  return B(e) ? s = e : (s = e.get, r = e.set), new wo(s, r, n);
}
const on = {}, an = /* @__PURE__ */ new WeakMap();
let dt;
function Po(e, t = false, n = dt) {
  if (n) {
    let s = an.get(n);
    s || an.set(n, s = []), s.push(e);
  }
}
function To(e, t, n = X) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (I) => r ? I : Ce(I) || r === false || r === 0 ? ot(I, 1) : ot(I);
  let f, h, g, m, T = false, S = false;
  if (ae(e) ? (h = () => e.value, T = Ce(e)) : At(e) ? (h = () => d(e), T = true) : V(e) ? (S = true, T = e.some((I) => At(I) || Ce(I)), h = () => e.map((I) => {
    if (ae(I)) return I.value;
    if (At(I)) return d(I);
    if (B(I)) return c ? c(I, 2) : I();
  })) : B(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (g) {
      Qe();
      try {
        g();
      } finally {
        Ye();
      }
    }
    const I = dt;
    dt = f;
    try {
      return c ? c(e, 3, [m]) : e(m);
    } finally {
      dt = I;
    }
  } : h = Be, t && r) {
    const I = h, J = r === true ? 1 / 0 : r;
    h = () => ot(I(), J);
  }
  const j = ro(), F = () => {
    f.stop(), j && j.active && os(j.effects, f);
  };
  if (i && t) {
    const I = t;
    t = (...J) => {
      I(...J), F();
    };
  }
  let O = S ? new Array(e.length).fill(on) : on;
  const N = (I) => {
    if (!(!(f.flags & 1) || !f.dirty && !I)) if (t) {
      const J = f.run();
      if (r || T || (S ? J.some((oe, ee) => Ve(oe, O[ee])) : Ve(J, O))) {
        g && g();
        const oe = dt;
        dt = f;
        try {
          const ee = [J, O === on ? void 0 : S && O[0] === on ? [] : O, m];
          O = J, c ? c(t, 3, ee) : t(...ee);
        } finally {
          dt = oe;
        }
      }
    } else f.run();
  };
  return l && l(N), f = new Pr(h), f.scheduler = o ? () => o(N, false) : N, m = (I) => Po(I, false, f), g = f.onStop = () => {
    const I = an.get(f);
    if (I) {
      if (c) c(I, 4);
      else for (const J of I) J();
      an.delete(f);
    }
  }, t ? s ? N(true) : O = f.run() : o ? o(N.bind(null, true), true) : f.run(), F.pause = f.pause.bind(f), F.resume = f.resume.bind(f), F.stop = F, F;
}
function ot(e, t = 1 / 0, n) {
  if (t <= 0 || !Z(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, ae(e)) ot(e.value, t, n);
  else if (V(e)) for (let s = 0; s < e.length; s++) ot(e[s], t, n);
  else if (Ki(e) || jt(e)) e.forEach((s) => {
    ot(s, t, n);
  });
  else if (ki(e)) {
    for (const s in e) ot(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && ot(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function tn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Sn(r, t, n);
  }
}
function Ue(e, t, n, s) {
  if (B(e)) {
    const r = tn(e, t, n, s);
    return r && Sr(r) && r.catch((i) => {
      Sn(i, t, n);
    }), r;
  }
  if (V(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++) r.push(Ue(e[i], t, n, s));
    return r;
  }
}
function Sn(e, t, n, s = true) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || X;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, c, d) === false) return;
      }
      l = l.parent;
    }
    if (i) {
      Qe(), tn(i, null, 10, [e, c, d]), Ye();
      return;
    }
  }
  Io(e, n, r, s, o);
}
function Io(e, t, n, s = true, r = false) {
  if (r) throw e;
  console.error(e);
}
const pe = [];
let Fe = -1;
const Ct = [];
let rt = null, Et = 0;
const Jr = Promise.resolve();
let hn = null;
function zr(e) {
  const t = hn || Jr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function No(e) {
  let t = Fe + 1, n = pe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = pe[s], i = Qt(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ys(e) {
  if (!(e.flags & 1)) {
    const t = Qt(e), n = pe[pe.length - 1];
    !n || !(e.flags & 2) && t >= Qt(n) ? pe.push(e) : pe.splice(No(t), 0, e), e.flags |= 1, Qr();
  }
}
function Qr() {
  hn || (hn = Jr.then(Xr));
}
function Mo(e) {
  V(e) ? Ct.push(...e) : rt && e.id === -1 ? rt.splice(Et + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), Qr();
}
function Ls(e, t, n = Fe + 1) {
  for (; n < pe.length; n++) {
    const s = pe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      pe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Yr(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)].sort((n, s) => Qt(n) - Qt(s));
    if (Ct.length = 0, rt) {
      rt.push(...t);
      return;
    }
    for (rt = t, Et = 0; Et < rt.length; Et++) {
      const n = rt[Et];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    rt = null, Et = 0;
  }
}
const Qt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Xr(e) {
  try {
    for (Fe = 0; Fe < pe.length; Fe++) {
      const t = pe[Fe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), tn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Fe < pe.length; Fe++) {
      const t = pe[Fe];
      t && (t.flags &= -2);
    }
    Fe = -1, pe.length = 0, Yr(), hn = null, (pe.length || Ct.length) && Xr();
  }
}
let Ae = null, Zr = null;
function dn(e) {
  const t = Ae;
  return Ae = e, Zr = e && e.type.__scopeId || null, t;
}
function Do(e, t = Ae, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && mn(-1);
    const i = dn(t);
    let o;
    try {
      o = e(...r);
    } finally {
      dn(i), s._d && mn(1);
    }
    return o;
  };
  return s._n = true, s._c = true, s._d = true, s;
}
function at(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (Qe(), Ue(c, n, 8, [e.el, l, e, t]), Ye());
  }
}
function ln(e, t) {
  if (fe) {
    let n = fe.provides;
    const s = fe.parent && fe.parent.provides;
    s === n && (n = fe.provides = Object.create(s)), n[e] = t;
  }
}
function ze(e, t, n = false) {
  const s = Ul();
  if (s || wt) {
    let r = wt ? wt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
const Lo = Symbol.for("v-scx"), Fo = () => ze(Lo);
function cn(e, t, n) {
  return ei(e, t, n);
}
function ei(e, t, n = X) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = ce({}, n), c = t && s || !t && i !== "post";
  let d;
  if (Xt) {
    if (i === "sync") {
      const m = Fo();
      d = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = Be, m.resume = Be, m.pause = Be, m;
    }
  }
  const f = fe;
  l.call = (m, T, S) => Ue(m, f, T, S);
  let h = false;
  i === "post" ? l.scheduler = (m) => {
    _e(m, f && f.suspense);
  } : i !== "sync" && (h = true, l.scheduler = (m, T) => {
    T ? m() : ys(m);
  }), l.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const g = To(e, t, l);
  return Xt && (d ? d.push(g) : c && g()), g;
}
function Ho(e, t, n) {
  const s = this.proxy, r = ie(e) ? e.includes(".") ? ti(s, e) : () => s[e] : e.bind(s, s);
  let i;
  B(t) ? i = t : (i = t.handler, n = t);
  const o = nn(this), l = ei(r, i.bind(s), n);
  return o(), l;
}
function ti(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const jo = Symbol("_vte"), Vo = (e) => e.__isTeleport, Bo = Symbol("_leaveCb");
function bs(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, bs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ni(e, t) {
  return B(e) ? ce({ name: e.name }, t, { setup: e }) : e;
}
function si(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fs(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const pn = /* @__PURE__ */ new WeakMap();
function Gt(e, t, n, s, r = false) {
  if (V(e)) {
    e.forEach((S, j) => Gt(S, t && (V(t) ? t[j] : t), n, s, r));
    return;
  }
  if (Kt(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Gt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? As(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, f = l.refs === X ? l.refs = {} : l.refs, h = l.setupState, g = q(h), m = h === X ? Ar : (S) => Fs(f, S) ? false : k(g, S), T = (S, j) => !(j && Fs(f, j));
  if (d != null && d !== c) {
    if (Hs(t), ie(d)) f[d] = null, m(d) && (h[d] = null);
    else if (ae(d)) {
      const S = t;
      T(d, S.k) && (d.value = null), S.k && (f[S.k] = null);
    }
  }
  if (B(c)) tn(c, l, 12, [o, f]);
  else {
    const S = ie(c), j = ae(c);
    if (S || j) {
      const F = () => {
        if (e.f) {
          const O = S ? m(c) ? h[c] : f[c] : T() || !e.k ? c.value : f[e.k];
          if (r) V(O) && os(O, i);
          else if (V(O)) O.includes(i) || O.push(i);
          else if (S) f[c] = [i], m(c) && (h[c] = f[c]);
          else {
            const N = [i];
            T(c, e.k) && (c.value = N), e.k && (f[e.k] = N);
          }
        } else S ? (f[c] = o, m(c) && (h[c] = o)) : j && (T(c, e.k) && (c.value = o), e.k && (f[e.k] = o));
      };
      if (o) {
        const O = () => {
          F(), pn.delete(e);
        };
        O.id = -1, pn.set(e, O), _e(O, n);
      } else Hs(e), F();
    }
  }
}
function Hs(e) {
  const t = pn.get(e);
  t && (t.flags |= 8, pn.delete(e));
}
Rn().requestIdleCallback;
Rn().cancelIdleCallback;
const Kt = (e) => !!e.type.__asyncLoader, ri = (e) => e.type.__isKeepAlive;
function Uo(e, t) {
  ii(e, "a", t);
}
function Go(e, t) {
  ii(e, "da", t);
}
function ii(e, t, n = fe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated) return;
      r = r.parent;
    }
    return e();
  });
  if (Cn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; ) ri(r.parent.vnode) && Ko(s, t, n, r), r = r.parent;
  }
}
function Ko(e, t, n, s) {
  const r = Cn(t, e, s, true);
  oi(() => {
    os(s[t], r);
  }, n);
}
function Cn(e, t, n = fe, s = false) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Qe();
      const l = nn(n), c = Ue(t, n, e, o);
      return l(), Ye(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Ze = (e) => (t, n = fe) => {
  (!Xt || e === "sp") && Cn(e, (...s) => t(...s), n);
}, Wo = Ze("bm"), qo = Ze("m"), ko = Ze("bu"), $o = Ze("u"), Jo = Ze("bum"), oi = Ze("um"), zo = Ze("sp"), Qo = Ze("rtg"), Yo = Ze("rtc");
function Xo(e, t = fe) {
  Cn("ec", e, t);
}
const Zo = "components";
function el(e, t) {
  return nl(Zo, e, true, t) || e;
}
const tl = Symbol.for("v-ndc");
function nl(e, t, n = true, s = false) {
  const r = Ae || fe;
  if (r) {
    const i = r.type;
    {
      const l = kl(i, false);
      if (l && (l === t || l === ge(t) || l === xn(ge(t)))) return i;
    }
    const o = js(r[e] || i[e], t) || js(r.appContext[e], t);
    return !o && s ? i : o;
  }
}
function js(e, t) {
  return e && (e[t] || e[ge(t)] || e[xn(ge(t))]);
}
const zn = (e) => e ? Si(e) ? As(e) : zn(e.parent) : null, Wt = ce(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => zn(e.parent), $root: (e) => zn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => ci(e), $forceUpdate: (e) => e.f || (e.f = () => {
  ys(e.update);
}), $nextTick: (e) => e.n || (e.n = zr.bind(e.proxy)), $watch: (e) => Ho.bind(e) }), Ln = (e, t) => e !== X && !e.__isScriptSetup && k(e, t), sl = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
  if (t[0] !== "$") {
    const g = o[t];
    if (g !== void 0) switch (g) {
      case 1:
        return s[t];
      case 2:
        return r[t];
      case 4:
        return n[t];
      case 3:
        return i[t];
    }
    else {
      if (Ln(s, t)) return o[t] = 1, s[t];
      if (r !== X && k(r, t)) return o[t] = 2, r[t];
      if (k(i, t)) return o[t] = 3, i[t];
      if (n !== X && k(n, t)) return o[t] = 4, n[t];
      Qn && (o[t] = 0);
    }
  }
  const d = Wt[t];
  let f, h;
  if (d) return t === "$attrs" && ue(e.attrs, "get", ""), d(e);
  if ((f = l.__cssModules) && (f = f[t])) return f;
  if (n !== X && k(n, t)) return o[t] = 4, n[t];
  if (h = c.config.globalProperties, k(h, t)) return h[t];
}, set({ _: e }, t, n) {
  const { data: s, setupState: r, ctx: i } = e;
  return Ln(r, t) ? (r[t] = n, true) : s !== X && k(s, t) ? (s[t] = n, true) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = n, true);
}, has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o } }, l) {
  let c;
  return !!(n[l] || e !== X && l[0] !== "$" && k(e, l) || Ln(t, l) || k(i, l) || k(s, l) || k(Wt, l) || k(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
}, defineProperty(e, t, n) {
  return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
} };
function Vs(e) {
  return V(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
let Qn = true;
function rl(e) {
  const t = ci(e), n = e.proxy, s = e.ctx;
  Qn = false, t.beforeCreate && Bs(t.beforeCreate, e, "bc");
  const { data: r, computed: i, methods: o, watch: l, provide: c, inject: d, created: f, beforeMount: h, mounted: g, beforeUpdate: m, updated: T, activated: S, deactivated: j, beforeDestroy: F, beforeUnmount: O, destroyed: N, unmounted: I, render: J, renderTracked: oe, renderTriggered: ee, errorCaptured: Oe, serverPrefetch: et, expose: Pe, inheritAttrs: tt, components: ut, directives: Te, filters: Nt } = t;
  if (d && il(d, s, null), o) for (const $ in o) {
    const K = o[$];
    B(K) && (s[$] = K.bind(n));
  }
  if (r) {
    const $ = r.call(n, n);
    Z($) && (e.data = An($));
  }
  if (Qn = true, i) for (const $ in i) {
    const K = i[$], Ge = B(K) ? K.bind(n, n) : B(K.get) ? K.get.bind(n, n) : Be, nt = !B(K) && B(K.set) ? K.set.bind(n) : Be, Ie = Re({ get: Ge, set: nt });
    Object.defineProperty(s, $, { enumerable: true, configurable: true, get: () => Ie.value, set: (me) => Ie.value = me });
  }
  if (l) for (const $ in l) li(l[$], s, n, $);
  if (c) {
    const $ = B(c) ? c.call(n) : c;
    Reflect.ownKeys($).forEach((K) => {
      ln(K, $[K]);
    });
  }
  f && Bs(f, e, "c");
  function re($, K) {
    V(K) ? K.forEach((Ge) => $(Ge.bind(n))) : K && $(K.bind(n));
  }
  if (re(Wo, h), re(qo, g), re(ko, m), re($o, T), re(Uo, S), re(Go, j), re(Xo, Oe), re(Yo, oe), re(Qo, ee), re(Jo, O), re(oi, I), re(zo, et), V(Pe)) if (Pe.length) {
    const $ = e.exposed || (e.exposed = {});
    Pe.forEach((K) => {
      Object.defineProperty($, K, { get: () => n[K], set: (Ge) => n[K] = Ge, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  J && e.render === Be && (e.render = J), tt != null && (e.inheritAttrs = tt), ut && (e.components = ut), Te && (e.directives = Te), et && si(e);
}
function il(e, t, n = Be) {
  V(e) && (e = Yn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    Z(r) ? "default" in r ? i = ze(r.from || s, r.default, true) : i = ze(r.from || s) : i = ze(r), ae(i) ? Object.defineProperty(t, s, { enumerable: true, configurable: true, get: () => i.value, set: (o) => i.value = o }) : t[s] = i;
  }
}
function Bs(e, t, n) {
  Ue(V(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function li(e, t, n, s) {
  let r = s.includes(".") ? ti(n, s) : () => n[s];
  if (ie(e)) {
    const i = t[e];
    B(i) && cn(r, i);
  } else if (B(e)) cn(r, e.bind(n));
  else if (Z(e)) if (V(e)) e.forEach((i) => li(i, t, n, s));
  else {
    const i = B(e.handler) ? e.handler.bind(n) : t[e.handler];
    B(i) && cn(r, i, e);
  }
}
function ci(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach((d) => gn(c, d, o, true)), gn(c, t, o)), Z(t) && i.set(t, c), c;
}
function gn(e, t, n, s = false) {
  const { mixins: r, extends: i } = t;
  i && gn(e, i, n, true), r && r.forEach((o) => gn(e, o, n, true));
  for (const o in t) if (!(s && o === "expose")) {
    const l = ol[o] || n && n[o];
    e[o] = l ? l(e[o], t[o]) : t[o];
  }
  return e;
}
const ol = { data: Us, props: Gs, emits: Gs, methods: Ht, computed: Ht, beforeCreate: he, created: he, beforeMount: he, mounted: he, beforeUpdate: he, updated: he, beforeDestroy: he, beforeUnmount: he, destroyed: he, unmounted: he, activated: he, deactivated: he, errorCaptured: he, serverPrefetch: he, components: Ht, directives: Ht, watch: cl, provide: Us, inject: ll };
function Us(e, t) {
  return t ? e ? function() {
    return ce(B(e) ? e.call(this, this) : e, B(t) ? t.call(this, this) : t);
  } : t : e;
}
function ll(e, t) {
  return Ht(Yn(e), Yn(t));
}
function Yn(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function he(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? ce(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Gs(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ce(/* @__PURE__ */ Object.create(null), Vs(e), Vs(t ?? {})) : t;
}
function cl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ce(/* @__PURE__ */ Object.create(null), e);
  for (const s in t) n[s] = he(e[s], t[s]);
  return n;
}
function ui() {
  return { app: null, config: { isNativeTag: Ar, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let ul = 0;
function fl(e, t) {
  return function(s, r = null) {
    B(s) || (s = ce({}, s)), r != null && !Z(r) && (r = null);
    const i = ui(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = false;
    const d = i.app = { _uid: ul++, _component: s, _props: r, _container: null, _context: i, _instance: null, version: Jl, get config() {
      return i.config;
    }, set config(f) {
    }, use(f, ...h) {
      return o.has(f) || (f && B(f.install) ? (o.add(f), f.install(d, ...h)) : B(f) && (o.add(f), f(d, ...h))), d;
    }, mixin(f) {
      return i.mixins.includes(f) || i.mixins.push(f), d;
    }, component(f, h) {
      return h ? (i.components[f] = h, d) : i.components[f];
    }, directive(f, h) {
      return h ? (i.directives[f] = h, d) : i.directives[f];
    }, mount(f, h, g) {
      if (!c) {
        const m = d._ceVNode || xe(s, r);
        return m.appContext = i, g === true ? g = "svg" : g === false && (g = void 0), e(m, f, g), c = true, d._container = f, f.__vue_app__ = d, As(m.component);
      }
    }, onUnmount(f) {
      l.push(f);
    }, unmount() {
      c && (Ue(l, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
    }, provide(f, h) {
      return i.provides[f] = h, d;
    }, runWithContext(f) {
      const h = wt;
      wt = d;
      try {
        return f();
      } finally {
        wt = h;
      }
    } };
    return d;
  };
}
let wt = null;
const al = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ge(t)}Modifiers`] || e[`${mt(t)}Modifiers`];
function hl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || X;
  let r = n;
  const i = t.startsWith("update:"), o = i && al(s, t.slice(7));
  o && (o.trim && (r = n.map((f) => ie(f) ? f.trim() : f)), o.number && (r = n.map(zi)));
  let l, c = s[l = Tn(t)] || s[l = Tn(ge(t))];
  !c && i && (c = s[l = Tn(mt(t))]), c && Ue(c, e, 6, r);
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = true, Ue(d, e, 6, r);
  }
}
const dl = /* @__PURE__ */ new WeakMap();
function fi(e, t, n = false) {
  const s = n ? dl : t.emitsCache, r = s.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {}, l = false;
  if (!B(e)) {
    const c = (d) => {
      const f = fi(d, t, true);
      f && (l = true, ce(o, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (Z(e) && s.set(e, null), null) : (V(i) ? i.forEach((c) => o[c] = null) : ce(o, i), Z(e) && s.set(e, o), o);
}
function wn(e, t) {
  return !e || !yn(t) ? false : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, mt(t)) || k(e, t));
}
function Ks(e) {
  const { type: t, vnode: n, proxy: s, withProxy: r, propsOptions: [i], slots: o, attrs: l, emit: c, render: d, renderCache: f, props: h, data: g, setupState: m, ctx: T, inheritAttrs: S } = e, j = dn(e);
  let F, O;
  try {
    if (n.shapeFlag & 4) {
      const I = r || s, J = I;
      F = je(d.call(J, I, f, h, m, g, T)), O = l;
    } else {
      const I = t;
      F = je(I.length > 1 ? I(h, { attrs: l, slots: o, emit: c }) : I(h, null)), O = t.props ? l : pl(l);
    }
  } catch (I) {
    qt.length = 0, Sn(I, e, 1), F = xe(Ot);
  }
  let N = F;
  if (O && S !== false) {
    const I = Object.keys(O), { shapeFlag: J } = N;
    I.length && J & 7 && (i && I.some(bn) && (O = gl(O, i)), N = Pt(N, O, false, true));
  }
  return n.dirs && (N = Pt(N, null, false, true), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && bs(N, n.transition), F = N, dn(j), F;
}
const pl = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || yn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, gl = (e, t) => {
  const n = {};
  for (const s in e) (!bn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ml(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (n && c >= 0) {
    if (c & 1024) return true;
    if (c & 16) return s ? Ws(s, o, d) : !!o;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const g = f[h];
        if (ai(o, s, g) && !wn(d, g)) return true;
      }
    }
  } else return (r || l) && (!l || !l.$stable) ? true : s === o ? false : s ? o ? Ws(s, o, d) : true : !!o;
  return false;
}
function Ws(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return true;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (ai(t, e, i) && !wn(n, i)) return true;
  }
  return false;
}
function ai(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && Z(s) && Z(r) ? !fs(s, r) : s !== r;
}
function _l({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e) (e = t.vnode).el = s, t = t.parent;
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const hi = {}, di = () => Object.create(hi), pi = (e) => Object.getPrototypeOf(e) === hi;
function vl(e, t, n, s = false) {
  const r = {}, i = di();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), gi(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? e.props = s ? r : Kr(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function yl(e, t, n, s) {
  const { props: r, attrs: i, vnode: { patchFlag: o } } = e, l = q(r), [c] = e.propsOptions;
  let d = false;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let g = f[h];
        if (wn(e.emitsOptions, g)) continue;
        const m = t[g];
        if (c) if (k(i, g)) m !== i[g] && (i[g] = m, d = true);
        else {
          const T = ge(g);
          r[T] = Xn(c, l, T, m, e, false);
        }
        else m !== i[g] && (i[g] = m, d = true);
      }
    }
  } else {
    gi(e, t, r, i) && (d = true);
    let f;
    for (const h in l) (!t || !k(t, h) && ((f = mt(h)) === h || !k(t, f))) && (c ? n && (n[h] !== void 0 || n[f] !== void 0) && (r[h] = Xn(c, l, h, void 0, e, true)) : delete r[h]);
    if (i !== l) for (const h in i) (!t || !k(t, h)) && (delete i[h], d = true);
  }
  d && Je(e.attrs, "set", "");
}
function gi(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = false, l;
  if (t) for (let c in t) {
    if (Vt(c)) continue;
    const d = t[c];
    let f;
    r && k(r, f = ge(c)) ? !i || !i.includes(f) ? n[f] = d : (l || (l = {}))[f] = d : wn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = true);
  }
  if (i) {
    const c = q(n), d = l || X;
    for (let f = 0; f < i.length; f++) {
      const h = i[f];
      n[h] = Xn(r, c, h, d[h], e, !k(d, h));
    }
  }
  return o;
}
function Xn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = k(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && B(c)) {
        const { propsDefaults: d } = r;
        if (n in d) s = d[n];
        else {
          const f = nn(r);
          s = d[n] = c.call(null, t), f();
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    o[0] && (i && !l ? s = false : o[1] && (s === "" || s === mt(n)) && (s = true));
  }
  return s;
}
const bl = /* @__PURE__ */ new WeakMap();
function mi(e, t, n = false) {
  const s = n ? bl : t.propsCache, r = s.get(e);
  if (r) return r;
  const i = e.props, o = {}, l = [];
  let c = false;
  if (!B(e)) {
    const f = (h) => {
      c = true;
      const [g, m] = mi(h, t, true);
      ce(o, g), m && l.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !c) return Z(e) && s.set(e, Rt), Rt;
  if (V(i)) for (let f = 0; f < i.length; f++) {
    const h = ge(i[f]);
    qs(h) && (o[h] = X);
  }
  else if (i) for (const f in i) {
    const h = ge(f);
    if (qs(h)) {
      const g = i[f], m = o[h] = V(g) || B(g) ? { type: g } : ce({}, g), T = m.type;
      let S = false, j = true;
      if (V(T)) for (let F = 0; F < T.length; ++F) {
        const O = T[F], N = B(O) && O.name;
        if (N === "Boolean") {
          S = true;
          break;
        } else N === "String" && (j = false);
      }
      else S = B(T) && T.name === "Boolean";
      m[0] = S, m[1] = j, (S || k(m, "default")) && l.push(h);
    }
  }
  const d = [o, l];
  return Z(e) && s.set(e, d), d;
}
function qs(e) {
  return e[0] !== "$" && !Vt(e);
}
const Es = (e) => e === "_" || e === "_ctx" || e === "$stable", xs = (e) => V(e) ? e.map(je) : [je(e)], El = (e, t, n) => {
  if (t._n) return t;
  const s = Do((...r) => xs(t(...r)), n);
  return s._c = false, s;
}, _i = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Es(r)) continue;
    const i = e[r];
    if (B(i)) t[r] = El(r, i, s);
    else if (i != null) {
      const o = xs(i);
      t[r] = () => o;
    }
  }
}, vi = (e, t) => {
  const n = xs(t);
  e.slots.default = () => n;
}, yi = (e, t, n) => {
  for (const s in t) (n || !Es(s)) && (e[s] = t[s]);
}, xl = (e, t, n) => {
  const s = e.slots = di();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (yi(s, t, n), n && Cr(s, "_", r, true)) : _i(t, s);
  } else t && vi(e, t);
}, Rl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = true, o = X;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = false : yi(r, t, n) : (i = !t.$stable, _i(t, r)), o = t;
  } else t && (vi(e, t), o = { default: 1 });
  if (i) for (const l in r) !Es(l) && o[l] == null && delete r[l];
}, _e = Ol;
function Al(e) {
  return Sl(e);
}
function Sl(e, t) {
  const n = Rn();
  n.__VUE__ = true;
  const { insert: s, remove: r, patchProp: i, createElement: o, createText: l, createComment: c, setText: d, setElementText: f, parentNode: h, nextSibling: g, setScopeId: m = Be, insertStaticContent: T } = e, S = (u, a, p, _ = null, b = null, v = null, A = void 0, R = null, x = !!a.dynamicChildren) => {
    if (u === a) return;
    u && !Lt(u, a) && (_ = y(u), me(u, b, v, true), u = null), a.patchFlag === -2 && (x = false, a.dynamicChildren = null);
    const { type: E, ref: L, shapeFlag: w } = a;
    switch (E) {
      case On:
        j(u, a, p, _);
        break;
      case Ot:
        F(u, a, p, _);
        break;
      case Hn:
        u == null && O(a, p, _, A);
        break;
      case ke:
        ut(u, a, p, _, b, v, A, R, x);
        break;
      default:
        w & 1 ? J(u, a, p, _, b, v, A, R, x) : w & 6 ? Te(u, a, p, _, b, v, A, R, x) : (w & 64 || w & 128) && E.process(u, a, p, _, b, v, A, R, x, M);
    }
    L != null && b ? Gt(L, u && u.ref, v, a || u, !a) : L == null && u && u.ref != null && Gt(u.ref, null, v, u, true);
  }, j = (u, a, p, _) => {
    if (u == null) s(a.el = l(a.children), p, _);
    else {
      const b = a.el = u.el;
      a.children !== u.children && d(b, a.children);
    }
  }, F = (u, a, p, _) => {
    u == null ? s(a.el = c(a.children || ""), p, _) : a.el = u.el;
  }, O = (u, a, p, _) => {
    [u.el, u.anchor] = T(u.children, a, p, _, u.el, u.anchor);
  }, N = ({ el: u, anchor: a }, p, _) => {
    let b;
    for (; u && u !== a; ) b = g(u), s(u, p, _), u = b;
    s(a, p, _);
  }, I = ({ el: u, anchor: a }) => {
    let p;
    for (; u && u !== a; ) p = g(u), r(u), u = p;
    r(a);
  }, J = (u, a, p, _, b, v, A, R, x) => {
    if (a.type === "svg" ? A = "svg" : a.type === "math" && (A = "mathml"), u == null) oe(a, p, _, b, v, A, R, x);
    else {
      const E = u.el && u.el._isVueCE ? u.el : null;
      try {
        E && E._beginPatch(), et(u, a, b, v, A, R, x);
      } finally {
        E && E._endPatch();
      }
    }
  }, oe = (u, a, p, _, b, v, A, R) => {
    let x, E;
    const { props: L, shapeFlag: w, transition: D, dirs: H } = u;
    if (x = u.el = o(u.type, v, L && L.is, L), w & 8 ? f(x, u.children) : w & 16 && Oe(u.children, x, null, _, b, Fn(u, v), A, R), H && at(u, null, _, "created"), ee(x, u, u.scopeId, A, _), L) {
      for (const z in L) z !== "value" && !Vt(z) && i(x, z, null, L[z], v, _);
      "value" in L && i(x, "value", null, L.value, v), (E = L.onVnodeBeforeMount) && Le(E, _, u);
    }
    H && at(u, null, _, "beforeMount");
    const G = Cl(b, D);
    G && D.beforeEnter(x), s(x, a, p), ((E = L && L.onVnodeMounted) || G || H) && _e(() => {
      try {
        E && Le(E, _, u), G && D.enter(x), H && at(u, null, _, "mounted");
      } finally {
      }
    }, b);
  }, ee = (u, a, p, _, b) => {
    if (p && m(u, p), _) for (let v = 0; v < _.length; v++) m(u, _[v]);
    if (b) {
      let v = b.subTree;
      if (a === v || Ri(v.type) && (v.ssContent === a || v.ssFallback === a)) {
        const A = b.vnode;
        ee(u, A, A.scopeId, A.slotScopeIds, b.parent);
      }
    }
  }, Oe = (u, a, p, _, b, v, A, R, x = 0) => {
    for (let E = x; E < u.length; E++) {
      const L = u[E] = R ? $e(u[E]) : je(u[E]);
      S(null, L, a, p, _, b, v, A, R);
    }
  }, et = (u, a, p, _, b, v, A) => {
    const R = a.el = u.el;
    let { patchFlag: x, dynamicChildren: E, dirs: L } = a;
    x |= u.patchFlag & 16;
    const w = u.props || X, D = a.props || X;
    let H;
    if (p && ht(p, false), (H = D.onVnodeBeforeUpdate) && Le(H, p, a, u), L && at(a, u, p, "beforeUpdate"), p && ht(p, true), (w.innerHTML && D.innerHTML == null || w.textContent && D.textContent == null) && f(R, ""), E ? Pe(u.dynamicChildren, E, R, p, _, Fn(a, b), v) : A || K(u, a, R, null, p, _, Fn(a, b), v, false), x > 0) {
      if (x & 16) tt(R, w, D, p, b);
      else if (x & 2 && w.class !== D.class && i(R, "class", null, D.class, b), x & 4 && i(R, "style", w.style, D.style, b), x & 8) {
        const G = a.dynamicProps;
        for (let z = 0; z < G.length; z++) {
          const Q = G[z], ne = w[Q], le = D[Q];
          (le !== ne || Q === "value") && i(R, Q, ne, le, b, p);
        }
      }
      x & 1 && u.children !== a.children && f(R, a.children);
    } else !A && E == null && tt(R, w, D, p, b);
    ((H = D.onVnodeUpdated) || L) && _e(() => {
      H && Le(H, p, a, u), L && at(a, u, p, "updated");
    }, _);
  }, Pe = (u, a, p, _, b, v, A) => {
    for (let R = 0; R < a.length; R++) {
      const x = u[R], E = a[R], L = x.el && (x.type === ke || !Lt(x, E) || x.shapeFlag & 198) ? h(x.el) : p;
      S(x, E, L, null, _, b, v, A, true);
    }
  }, tt = (u, a, p, _, b) => {
    if (a !== p) {
      if (a !== X) for (const v in a) !Vt(v) && !(v in p) && i(u, v, a[v], null, b, _);
      for (const v in p) {
        if (Vt(v)) continue;
        const A = p[v], R = a[v];
        A !== R && v !== "value" && i(u, v, R, A, b, _);
      }
      "value" in p && i(u, "value", a.value, p.value, b);
    }
  }, ut = (u, a, p, _, b, v, A, R, x) => {
    const E = a.el = u ? u.el : l(""), L = a.anchor = u ? u.anchor : l("");
    let { patchFlag: w, dynamicChildren: D, slotScopeIds: H } = a;
    H && (R = R ? R.concat(H) : H), u == null ? (s(E, p, _), s(L, p, _), Oe(a.children || [], p, L, b, v, A, R, x)) : w > 0 && w & 64 && D && u.dynamicChildren && u.dynamicChildren.length === D.length ? (Pe(u.dynamicChildren, D, p, b, v, A, R), (a.key != null || b && a === b.subTree) && bi(u, a, true)) : K(u, a, p, L, b, v, A, R, x);
  }, Te = (u, a, p, _, b, v, A, R, x) => {
    a.slotScopeIds = R, u == null ? a.shapeFlag & 512 ? b.ctx.activate(a, p, _, A, x) : Nt(a, p, _, b, v, A, x) : _t(u, a, x);
  }, Nt = (u, a, p, _, b, v, A) => {
    const R = u.component = Bl(u, _, b);
    if (ri(u) && (R.ctx.renderer = M), Gl(R, false, A), R.asyncDep) {
      if (b && b.registerDep(R, re, A), !u.el) {
        const x = R.subTree = xe(Ot);
        F(null, x, a, p), u.placeholder = x.el;
      }
    } else re(R, u, a, p, b, v, A);
  }, _t = (u, a, p) => {
    const _ = a.component = u.component;
    if (ml(u, a, p)) if (_.asyncDep && !_.asyncResolved) {
      $(_, a, p);
      return;
    } else _.next = a, _.update();
    else a.el = u.el, _.vnode = a;
  }, re = (u, a, p, _, b, v, A) => {
    const R = () => {
      if (u.isMounted) {
        let { next: w, bu: D, u: H, parent: G, vnode: z } = u;
        {
          const Me = Ei(u);
          if (Me) {
            w && (w.el = z.el, $(u, w, A)), Me.asyncDep.then(() => {
              _e(() => {
                u.isUnmounted || E();
              }, b);
            });
            return;
          }
        }
        let Q = w, ne;
        ht(u, false), w ? (w.el = z.el, $(u, w, A)) : w = z, D && In(D), (ne = w.props && w.props.onVnodeBeforeUpdate) && Le(ne, G, w, z), ht(u, true);
        const le = Ks(u), Ne = u.subTree;
        u.subTree = le, S(Ne, le, h(Ne.el), y(Ne), u, b, v), w.el = le.el, Q === null && _l(u, le.el), H && _e(H, b), (ne = w.props && w.props.onVnodeUpdated) && _e(() => Le(ne, G, w, z), b);
      } else {
        let w;
        const { el: D, props: H } = a, { bm: G, m: z, parent: Q, root: ne, type: le } = u, Ne = Kt(a);
        ht(u, false), G && In(G), !Ne && (w = H && H.onVnodeBeforeMount) && Le(w, Q, a), ht(u, true);
        {
          ne.ce && ne.ce._hasShadowRoot() && ne.ce._injectChildStyle(le, u.parent ? u.parent.type : void 0);
          const Me = u.subTree = Ks(u);
          S(null, Me, p, _, u, b, v), a.el = Me.el;
        }
        if (z && _e(z, b), !Ne && (w = H && H.onVnodeMounted)) {
          const Me = a;
          _e(() => Le(w, Q, Me), b);
        }
        (a.shapeFlag & 256 || Q && Kt(Q.vnode) && Q.vnode.shapeFlag & 256) && u.a && _e(u.a, b), u.isMounted = true, a = p = _ = null;
      }
    };
    u.scope.on();
    const x = u.effect = new Pr(R);
    u.scope.off();
    const E = u.update = x.run.bind(x), L = u.job = x.runIfDirty.bind(x);
    L.i = u, L.id = u.uid, x.scheduler = () => ys(L), ht(u, true), E();
  }, $ = (u, a, p) => {
    a.component = u;
    const _ = u.vnode.props;
    u.vnode = a, u.next = null, yl(u, a.props, _, p), Rl(u, a.children, p), Qe(), Ls(u), Ye();
  }, K = (u, a, p, _, b, v, A, R, x = false) => {
    const E = u && u.children, L = u ? u.shapeFlag : 0, w = a.children, { patchFlag: D, shapeFlag: H } = a;
    if (D > 0) {
      if (D & 128) {
        nt(E, w, p, _, b, v, A, R, x);
        return;
      } else if (D & 256) {
        Ge(E, w, p, _, b, v, A, R, x);
        return;
      }
    }
    H & 8 ? (L & 16 && Ee(E, b, v), w !== E && f(p, w)) : L & 16 ? H & 16 ? nt(E, w, p, _, b, v, A, R, x) : Ee(E, b, v, true) : (L & 8 && f(p, ""), H & 16 && Oe(w, p, _, b, v, A, R, x));
  }, Ge = (u, a, p, _, b, v, A, R, x) => {
    u = u || Rt, a = a || Rt;
    const E = u.length, L = a.length, w = Math.min(E, L);
    let D;
    for (D = 0; D < w; D++) {
      const H = a[D] = x ? $e(a[D]) : je(a[D]);
      S(u[D], H, p, null, b, v, A, R, x);
    }
    E > L ? Ee(u, b, v, true, false, w) : Oe(a, p, _, b, v, A, R, x, w);
  }, nt = (u, a, p, _, b, v, A, R, x) => {
    let E = 0;
    const L = a.length;
    let w = u.length - 1, D = L - 1;
    for (; E <= w && E <= D; ) {
      const H = u[E], G = a[E] = x ? $e(a[E]) : je(a[E]);
      if (Lt(H, G)) S(H, G, p, null, b, v, A, R, x);
      else break;
      E++;
    }
    for (; E <= w && E <= D; ) {
      const H = u[w], G = a[D] = x ? $e(a[D]) : je(a[D]);
      if (Lt(H, G)) S(H, G, p, null, b, v, A, R, x);
      else break;
      w--, D--;
    }
    if (E > w) {
      if (E <= D) {
        const H = D + 1, G = H < L ? a[H].el : _;
        for (; E <= D; ) S(null, a[E] = x ? $e(a[E]) : je(a[E]), p, G, b, v, A, R, x), E++;
      }
    } else if (E > D) for (; E <= w; ) me(u[E], b, v, true), E++;
    else {
      const H = E, G = E, z = /* @__PURE__ */ new Map();
      for (E = G; E <= D; E++) {
        const ye = a[E] = x ? $e(a[E]) : je(a[E]);
        ye.key != null && z.set(ye.key, E);
      }
      let Q, ne = 0;
      const le = D - G + 1;
      let Ne = false, Me = 0;
      const Mt = new Array(le);
      for (E = 0; E < le; E++) Mt[E] = 0;
      for (E = H; E <= w; E++) {
        const ye = u[E];
        if (ne >= le) {
          me(ye, b, v, true);
          continue;
        }
        let De;
        if (ye.key != null) De = z.get(ye.key);
        else for (Q = G; Q <= D; Q++) if (Mt[Q - G] === 0 && Lt(ye, a[Q])) {
          De = Q;
          break;
        }
        De === void 0 ? me(ye, b, v, true) : (Mt[De - G] = E + 1, De >= Me ? Me = De : Ne = true, S(ye, a[De], p, null, b, v, A, R, x), ne++);
      }
      const Os = Ne ? wl(Mt) : Rt;
      for (Q = Os.length - 1, E = le - 1; E >= 0; E--) {
        const ye = G + E, De = a[ye], Ps = a[ye + 1], Ts = ye + 1 < L ? Ps.el || xi(Ps) : _;
        Mt[E] === 0 ? S(null, De, p, Ts, b, v, A, R, x) : Ne && (Q < 0 || E !== Os[Q] ? Ie(De, p, Ts, 2) : Q--);
      }
    }
  }, Ie = (u, a, p, _, b = null) => {
    const { el: v, type: A, transition: R, children: x, shapeFlag: E } = u;
    if (E & 6) {
      Ie(u.component.subTree, a, p, _);
      return;
    }
    if (E & 128) {
      u.suspense.move(a, p, _);
      return;
    }
    if (E & 64) {
      A.move(u, a, p, M);
      return;
    }
    if (A === ke) {
      s(v, a, p);
      for (let w = 0; w < x.length; w++) Ie(x[w], a, p, _);
      s(u.anchor, a, p);
      return;
    }
    if (A === Hn) {
      N(u, a, p);
      return;
    }
    if (_ !== 2 && E & 1 && R) if (_ === 0) R.beforeEnter(v), s(v, a, p), _e(() => R.enter(v), b);
    else {
      const { leave: w, delayLeave: D, afterLeave: H } = R, G = () => {
        u.ctx.isUnmounted ? r(v) : s(v, a, p);
      }, z = () => {
        v._isLeaving && v[Bo](true), w(v, () => {
          G(), H && H();
        });
      };
      D ? D(v, G, z) : z();
    }
    else s(v, a, p);
  }, me = (u, a, p, _ = false, b = false) => {
    const { type: v, props: A, ref: R, children: x, dynamicChildren: E, shapeFlag: L, patchFlag: w, dirs: D, cacheIndex: H, memo: G } = u;
    if (w === -2 && (b = false), R != null && (Qe(), Gt(R, null, p, u, true), Ye()), H != null && (a.renderCache[H] = void 0), L & 256) {
      a.ctx.deactivate(u);
      return;
    }
    const z = L & 1 && D, Q = !Kt(u);
    let ne;
    if (Q && (ne = A && A.onVnodeBeforeUnmount) && Le(ne, a, u), L & 6) ft(u.component, p, _);
    else {
      if (L & 128) {
        u.suspense.unmount(p, _);
        return;
      }
      z && at(u, null, a, "beforeUnmount"), L & 64 ? u.type.remove(u, a, p, M, _) : E && !E.hasOnce && (v !== ke || w > 0 && w & 64) ? Ee(E, a, p, false, true) : (v === ke && w & 384 || !b && L & 16) && Ee(x, a, p), _ && vt(u);
    }
    const le = G != null && H == null;
    (Q && (ne = A && A.onVnodeUnmounted) || z || le) && _e(() => {
      ne && Le(ne, a, u), z && at(u, null, a, "unmounted"), le && (u.el = null);
    }, p);
  }, vt = (u) => {
    const { type: a, el: p, anchor: _, transition: b } = u;
    if (a === ke) {
      yt(p, _);
      return;
    }
    if (a === Hn) {
      I(u);
      return;
    }
    const v = () => {
      r(p), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (u.shapeFlag & 1 && b && !b.persisted) {
      const { leave: A, delayLeave: R } = b, x = () => A(p, v);
      R ? R(u.el, v, x) : x();
    } else v();
  }, yt = (u, a) => {
    let p;
    for (; u !== a; ) p = g(u), r(u), u = p;
    r(a);
  }, ft = (u, a, p) => {
    const { bum: _, scope: b, job: v, subTree: A, um: R, m: x, a: E } = u;
    ks(x), ks(E), _ && In(_), b.stop(), v && (v.flags |= 8, me(A, u, a, p)), R && _e(R, a), _e(() => {
      u.isUnmounted = true;
    }, a);
  }, Ee = (u, a, p, _ = false, b = false, v = 0) => {
    for (let A = v; A < u.length; A++) me(u[A], a, p, _, b);
  }, y = (u) => {
    if (u.shapeFlag & 6) return y(u.component.subTree);
    if (u.shapeFlag & 128) return u.suspense.next();
    const a = g(u.anchor || u.el), p = a && a[jo];
    return p ? g(p) : a;
  };
  let P = false;
  const C = (u, a, p) => {
    let _;
    u == null ? a._vnode && (me(a._vnode, null, null, true), _ = a._vnode.component) : S(a._vnode || null, u, a, null, null, null, p), a._vnode = u, P || (P = true, Ls(_), Yr(), P = false);
  }, M = { p: S, um: me, m: Ie, r: vt, mt: Nt, mc: Oe, pc: K, pbc: Pe, n: y, o: e };
  return { render: C, hydrate: void 0, createApp: fl(C) };
}
function Fn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ht({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Cl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function bi(e, t, n = false) {
  const s = e.children, r = t.children;
  if (V(s) && V(r)) for (let i = 0; i < s.length; i++) {
    const o = s[i];
    let l = r[i];
    l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = $e(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && bi(o, l)), l.type === On && (l.patchFlag === -1 && (l = r[i] = $e(l)), l.el = o.el), l.type === Ot && !l.el && (l.el = o.el);
  }
}
function wl(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; ) l = i + o >> 1, e[n[l]] < d ? i = l + 1 : o = l;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) n[i] = o, o = t[o];
  return n;
}
function Ei(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ei(t);
}
function ks(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function xi(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? xi(t.subTree) : null;
}
const Ri = (e) => e.__isSuspense;
function Ol(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : Mo(e);
}
const ke = Symbol.for("v-fgt"), On = Symbol.for("v-txt"), Ot = Symbol.for("v-cmt"), Hn = Symbol.for("v-stc"), qt = [];
let be = null;
function Pl(e = false) {
  qt.push(be = e ? null : []);
}
function Tl() {
  qt.pop(), be = qt[qt.length - 1] || null;
}
let Yt = 1;
function mn(e, t = false) {
  Yt += e, e < 0 && be && t && (be.hasOnce = true);
}
function Il(e) {
  return e.dynamicChildren = Yt > 0 ? be || Rt : null, Tl(), Yt > 0 && be && be.push(e), e;
}
function Nl(e, t, n, s, r) {
  return Il(xe(e, t, n, s, r, true));
}
function _n(e) {
  return e ? e.__v_isVNode === true : false;
}
function Lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ai = ({ key: e }) => e ?? null, un = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? ie(e) || ae(e) || B(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function Ml(e, t = null, n = null, s = 0, r = null, i = e === ke ? 0 : 1, o = false, l = false) {
  const c = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && Ai(t), ref: t && un(t), scopeId: Zr, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: s, dynamicProps: r, dynamicChildren: null, appContext: null, ctx: Ae };
  return l ? (Rs(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ie(n) ? 8 : 16), Yt > 0 && !o && be && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && be.push(c), c;
}
const xe = Dl;
function Dl(e, t = null, n = null, s = 0, r = null, i = false) {
  if ((!e || e === tl) && (e = Ot), _n(e)) {
    const l = Pt(e, t, true);
    return n && Rs(l, n), Yt > 0 && !i && be && (l.shapeFlag & 6 ? be[be.indexOf(e)] = l : be.push(l)), l.patchFlag = -2, l;
  }
  if ($l(e) && (e = e.__vccOpts), t) {
    t = Ll(t);
    let { class: l, style: c } = t;
    l && !ie(l) && (t.class = us(l)), Z(c) && (vs(c) && !V(c) && (c = ce({}, c)), t.style = cs(c));
  }
  const o = ie(e) ? 1 : Ri(e) ? 128 : Vo(e) ? 64 : Z(e) ? 4 : B(e) ? 2 : 0;
  return Ml(e, t, n, s, r, o, i, true);
}
function Ll(e) {
  return e ? vs(e) || pi(e) ? ce({}, e) : e : null;
}
function Pt(e, t, n = false, s = false) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? Hl(r || {}, t) : r, f = { __v_isVNode: true, __v_skip: true, type: e.type, props: d, key: d && Ai(d), ref: t && t.ref ? n && i ? V(i) ? i.concat(un(t)) : [i, un(t)] : un(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== ke ? o === -1 ? 16 : o | 16 : o, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: c, component: e.component, suspense: e.suspense, ssContent: e.ssContent && Pt(e.ssContent), ssFallback: e.ssFallback && Pt(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return c && s && bs(f, c.clone(f)), f;
}
function Fl(e = " ", t = 0) {
  return xe(On, null, e, t);
}
function je(e) {
  return e == null || typeof e == "boolean" ? xe(Ot) : V(e) ? xe(ke, null, e.slice()) : _n(e) ? $e(e) : xe(On, null, String(e));
}
function $e(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Pt(e);
}
function Rs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (V(t)) n = 16;
  else if (typeof t == "object") if (s & 65) {
    const r = t.default;
    r && (r._c && (r._d = false), Rs(e, r()), r._c && (r._d = true));
    return;
  } else {
    n = 32;
    const r = t._;
    !r && !pi(t) ? t._ctx = Ae : r === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else B(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Fl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Hl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s) if (r === "class") t.class !== s.class && (t.class = us([t.class, s.class]));
    else if (r === "style") t.style = cs([t.style, s.style]);
    else if (yn(r)) {
      const i = t[r], o = s[r];
      o && i !== o && !(V(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && !bn(r) && (t[r] = o);
    } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Le(e, t, n, s = null) {
  Ue(e, t, 7, [n, s]);
}
const jl = ui();
let Vl = 0;
function Bl(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || jl, i = { uid: Vl++, vnode: e, type: s, parent: t, appContext: r, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Or(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(r.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: mi(s, r), emitsOptions: fi(s, r), emit: null, emitted: null, propsDefaults: X, inheritAttrs: s.inheritAttrs, ctx: X, data: X, props: X, attrs: X, slots: X, refs: X, setupState: X, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = hl.bind(null, i), e.ce && e.ce(i), i;
}
let fe = null;
const Ul = () => fe || Ae;
let vn, Zn;
{
  const e = Rn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  vn = t("__VUE_INSTANCE_SETTERS__", (n) => fe = n), Zn = t("__VUE_SSR_SETTERS__", (n) => Xt = n);
}
const nn = (e) => {
  const t = fe;
  return vn(e), e.scope.on(), () => {
    e.scope.off(), vn(t);
  };
}, $s = () => {
  fe && fe.scope.off(), vn(null);
};
function Si(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = false;
function Gl(e, t = false, n = false) {
  t && Zn(t);
  const { props: s, children: r } = e.vnode, i = Si(e);
  vl(e, s, i, t), xl(e, r, n || t);
  const o = i ? Kl(e, t) : void 0;
  return t && Zn(false), o;
}
function Kl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, sl);
  const { setup: s } = n;
  if (s) {
    Qe();
    const r = e.setupContext = s.length > 1 ? ql(e) : null, i = nn(e), o = tn(s, e, 0, [e.props, r]), l = Sr(o);
    if (Ye(), i(), (l || e.sp) && !Kt(e) && si(e), l) {
      if (o.then($s, $s), t) return o.then((c) => {
        Js(e, c);
      }).catch((c) => {
        Sn(c, e, 0);
      });
      e.asyncDep = o;
    } else Js(e, o);
  } else Ci(e);
}
function Js(e, t, n) {
  B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = $r(t)), Ci(e);
}
function Ci(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Be);
  {
    const r = nn(e);
    Qe();
    try {
      rl(e);
    } finally {
      Ye(), r();
    }
  }
}
const Wl = { get(e, t) {
  return ue(e, "get", ""), e[t];
} };
function ql(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return { attrs: new Proxy(e.attrs, Wl), slots: e.slots, emit: e.emit, expose: t };
}
function As(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy($r(Wr(e.exposed)), { get(t, n) {
    if (n in t) return t[n];
    if (n in Wt) return Wt[n](e);
  }, has(t, n) {
    return n in t || n in Wt;
  } })) : e.proxy;
}
function kl(e, t = true) {
  return B(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function $l(e) {
  return B(e) && "__vccOpts" in e;
}
const Re = (e, t) => Oo(e, t, Xt);
function wi(e, t, n) {
  try {
    mn(-1);
    const s = arguments.length;
    return s === 2 ? Z(t) && !V(t) ? _n(t) ? xe(e, null, [t]) : xe(e, t) : xe(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && _n(n) && (n = [n]), xe(e, t, n));
  } finally {
    mn(1);
  }
}
const Jl = "3.5.31";
/**
* @vue/runtime-dom v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let es;
const zs = typeof window < "u" && window.trustedTypes;
if (zs) try {
  es = zs.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const Oi = es ? (e) => es.createHTML(e) : (e) => e, zl = "http://www.w3.org/2000/svg", Ql = "http://www.w3.org/1998/Math/MathML", qe = typeof document < "u" ? document : null, Qs = qe && qe.createElement("template"), Yl = { insert: (e, t, n) => {
  t.insertBefore(e, n || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, n, s) => {
  const r = t === "svg" ? qe.createElementNS(zl, e) : t === "mathml" ? qe.createElementNS(Ql, e) : n ? qe.createElement(e, { is: n }) : qe.createElement(e);
  return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
}, createText: (e) => qe.createTextNode(e), createComment: (e) => qe.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => qe.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, n, s, r, i) {
  const o = n ? n.previousSibling : t.lastChild;
  if (r && (r === i || r.nextSibling)) for (; t.insertBefore(r.cloneNode(true), n), !(r === i || !(r = r.nextSibling)); ) ;
  else {
    Qs.innerHTML = Oi(s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e);
    const l = Qs.content;
    if (s === "svg" || s === "mathml") {
      const c = l.firstChild;
      for (; c.firstChild; ) l.appendChild(c.firstChild);
      l.removeChild(c);
    }
    t.insertBefore(l, n);
  }
  return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
} }, Xl = Symbol("_vtc");
function Zl(e, t, n) {
  const s = e[Xl];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ys = Symbol("_vod"), ec = Symbol("_vsh"), tc = Symbol(""), nc = /(?:^|;)\s*display\s*:/;
function sc(e, t, n) {
  const s = e.style, r = ie(n);
  let i = false;
  if (n && !r) {
    if (t) if (ie(t)) for (const o of t.split(";")) {
      const l = o.slice(0, o.indexOf(":")).trim();
      n[l] == null && fn(s, l, "");
    }
    else for (const o in t) n[o] == null && fn(s, o, "");
    for (const o in n) o === "display" && (i = true), fn(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[tc];
      o && (n += ";" + o), s.cssText = n, i = nc.test(n);
    }
  } else t && e.removeAttribute("style");
  Ys in e && (e[Ys] = i ? s.display : "", e[ec] && (s.display = "none"));
}
const Xs = /\s*!important$/;
function fn(e, t, n) {
  if (V(n)) n.forEach((s) => fn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const s = rc(e, t);
    Xs.test(n) ? e.setProperty(mt(s), n.replace(Xs, ""), "important") : e[s] = n;
  }
}
const Zs = ["Webkit", "Moz", "ms"], jn = {};
function rc(e, t) {
  const n = jn[t];
  if (n) return n;
  let s = ge(t);
  if (s !== "filter" && s in e) return jn[t] = s;
  s = xn(s);
  for (let r = 0; r < Zs.length; r++) {
    const i = Zs[r] + s;
    if (i in e) return jn[t] = i;
  }
  return t;
}
const er = "http://www.w3.org/1999/xlink";
function tr(e, t, n, s, r, i = to(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(er, t.slice(6, t.length)) : e.setAttributeNS(er, t, n) : n == null || i && !wr(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : lt(n) ? String(n) : n);
}
function nr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Oi(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = false;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = wr(n) : n == null && l === "string" ? (n = "", o = true) : l === "number" && (n = 0, o = true);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function ic(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function oc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const sr = Symbol("_vei");
function lc(e, t, n, s, r = null) {
  const i = e[sr] || (e[sr] = {}), o = i[t];
  if (s && o) o.value = s;
  else {
    const [l, c] = cc(t);
    if (s) {
      const d = i[t] = ac(s, r);
      ic(e, l, d, c);
    } else o && (oc(e, l, o, c), i[t] = void 0);
  }
}
const rr = /(?:Once|Passive|Capture)$/;
function cc(e) {
  let t;
  if (rr.test(e)) {
    t = {};
    let s;
    for (; s = e.match(rr); ) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : mt(e.slice(2)), t];
}
let Vn = 0;
const uc = Promise.resolve(), fc = () => Vn || (uc.then(() => Vn = 0), Vn = Date.now());
function ac(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Ue(hc(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = fc(), n;
}
function hc(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = true;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else return t;
}
const ir = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, dc = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Zl(e, s, o) : t === "style" ? sc(e, n, s) : yn(t) ? bn(t) || lc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : pc(e, t, s, o)) ? (nr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && tr(e, t, s, o, i, t !== "value")) : e._isVueCE && (gc(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !ie(s))) ? nr(e, ge(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), tr(e, t, s, o));
};
function pc(e, t, n, s) {
  if (s) return !!(t === "innerHTML" || t === "textContent" || t in e && ir(t) && B(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE") return false;
  }
  return ir(t) && ie(n) ? false : t in e;
}
function gc(e, t) {
  const n = e._def.props;
  if (!n) return false;
  const s = ge(t);
  return Array.isArray(n) ? n.some((r) => ge(r) === s) : Object.keys(n).some((r) => ge(r) === s);
}
const mc = ce({ patchProp: dc }, Yl);
let or;
function _c() {
  return or || (or = Al(mc));
}
const vc = ((...e) => {
  const t = _c().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = bc(s);
    if (!r) return;
    const i = t._component;
    !B(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, false, yc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function yc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function bc(e) {
  return ie(e) ? document.querySelector(e) : e;
}
/*!
* pinia v3.0.4
* (c) 2025 Eduardo San Martin Morote
* @license MIT
*/
const Ec = Symbol();
var lr;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(lr || (lr = {}));
function xc() {
  const e = so(true), t = e.run(() => qr({}));
  let n = [], s = [];
  const r = Wr({ install(i) {
    r._a = i, i.provide(Ec, r), i.config.globalProperties.$pinia = r, s.forEach((o) => n.push(o)), s = [];
  }, use(i) {
    return this._a ? n.push(i) : s.push(i), this;
  }, _p: n, _a: null, _e: e, _s: /* @__PURE__ */ new Map(), state: t });
  return r;
}
/*!
* vue-router v4.6.4
* (c) 2025 Eduardo San Martin Morote
* @license MIT
*/
const xt = typeof document < "u";
function Pi(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Rc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && Pi(e.default);
}
const W = Object.assign;
function Bn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = we(r) ? r.map(e) : e(r);
  }
  return n;
}
const kt = () => {
}, we = Array.isArray;
function cr(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Ti = /#/g, Ac = /&/g, Sc = /\//g, Cc = /=/g, wc = /\?/g, Ii = /\+/g, Oc = /%5B/g, Pc = /%5D/g, Ni = /%5E/g, Tc = /%60/g, Mi = /%7B/g, Ic = /%7C/g, Di = /%7D/g, Nc = /%20/g;
function Ss(e) {
  return e == null ? "" : encodeURI("" + e).replace(Ic, "|").replace(Oc, "[").replace(Pc, "]");
}
function Mc(e) {
  return Ss(e).replace(Mi, "{").replace(Di, "}").replace(Ni, "^");
}
function ts(e) {
  return Ss(e).replace(Ii, "%2B").replace(Nc, "+").replace(Ti, "%23").replace(Ac, "%26").replace(Tc, "`").replace(Mi, "{").replace(Di, "}").replace(Ni, "^");
}
function Dc(e) {
  return ts(e).replace(Cc, "%3D");
}
function Lc(e) {
  return Ss(e).replace(Ti, "%23").replace(wc, "%3F");
}
function Fc(e) {
  return Lc(e).replace(Sc, "%2F");
}
function Zt(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Hc = /\/$/, jc = (e) => e.replace(Hc, "");
function Un(e, t, n = "/") {
  let s, r = {}, i = "", o = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return c = l >= 0 && c > l ? -1 : c, c >= 0 && (s = t.slice(0, c), i = t.slice(c, l > 0 ? l : t.length), r = e(i.slice(1))), l >= 0 && (s = s || t.slice(0, l), o = t.slice(l, t.length)), s = Gc(s ?? t, n), { fullPath: s + i + o, path: s, query: r, hash: Zt(o) };
}
function Vc(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ur(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Bc(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && Tt(t.matched[s], n.matched[r]) && Li(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Tt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Li(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return false;
  for (var n in e) if (!Uc(e[n], t[n])) return false;
  return true;
}
function Uc(e, t) {
  return we(e) ? fr(e, t) : we(t) ? fr(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function fr(e, t) {
  return we(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Gc(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let i = n.length - 1, o, l;
  for (o = 0; o < s.length; o++) if (l = s[o], l !== ".") if (l === "..") i > 1 && i--;
  else break;
  return n.slice(0, i).join("/") + "/" + s.slice(o).join("/");
}
const st = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
let ns = (function(e) {
  return e.pop = "pop", e.push = "push", e;
})({}), Gn = (function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
})({});
function Kc(e) {
  if (!e) if (xt) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), jc(e);
}
const Wc = /^[^#]+#/;
function qc(e, t) {
  return e.replace(Wc, "#") + t;
}
function kc(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return { behavior: t.behavior, left: s.left - n.left - (t.left || 0), top: s.top - n.top - (t.top || 0) };
}
const Pn = () => ({ left: window.scrollX, top: window.scrollY });
function $c(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) return;
    t = kc(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function ar(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ss = /* @__PURE__ */ new Map();
function Jc(e, t) {
  ss.set(e, t);
}
function zc(e) {
  const t = ss.get(e);
  return ss.delete(e), t;
}
function Qc(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Fi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let te = (function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
})({});
const Hi = Symbol("");
te.MATCHER_NOT_FOUND + "", te.NAVIGATION_GUARD_REDIRECT + "", te.NAVIGATION_ABORTED + "", te.NAVIGATION_CANCELLED + "", te.NAVIGATION_DUPLICATED + "";
function It(e, t) {
  return W(new Error(), { type: e, [Hi]: true }, t);
}
function We(e, t) {
  return e instanceof Error && Hi in e && (t == null || !!(e.type & t));
}
const Yc = ["params", "query", "hash"];
function Xc(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Yc) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Zc(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Ii, " "), i = r.indexOf("="), o = Zt(i < 0 ? r : r.slice(0, i)), l = i < 0 ? null : Zt(r.slice(i + 1));
    if (o in t) {
      let c = t[o];
      we(c) || (c = t[o] = [c]), c.push(l);
    } else t[o] = l;
  }
  return t;
}
function hr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = Dc(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (we(s) ? s.map((r) => r && ts(r)) : [s && ts(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function eu(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = we(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const tu = Symbol(""), dr = Symbol(""), Cs = Symbol(""), ji = Symbol(""), rs = Symbol("");
function Ft() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const r = e.indexOf(s);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function it(e, t, n, s, r, i = (o) => o()) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((l, c) => {
    const d = (g) => {
      g === false ? c(It(te.NAVIGATION_ABORTED, { from: n, to: t })) : g instanceof Error ? c(g) : Qc(g) ? c(It(te.NAVIGATION_GUARD_REDIRECT, { from: t, to: g })) : (o && s.enterCallbacks[r] === o && typeof g == "function" && o.push(g), l());
    }, f = i(() => e.call(s && s.instances[r], t, n, d));
    let h = Promise.resolve(f);
    e.length < 3 && (h = h.then(d)), h.catch((g) => c(g));
  });
}
function Kn(e, t, n, s, r = (i) => i()) {
  const i = [];
  for (const o of e) for (const l in o.components) {
    let c = o.components[l];
    if (!(t !== "beforeRouteEnter" && !o.instances[l])) if (Pi(c)) {
      const d = (c.__vccOpts || c)[t];
      d && i.push(it(d, n, s, o, l, r));
    } else {
      let d = c();
      i.push(() => d.then((f) => {
        if (!f) throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);
        const h = Rc(f) ? f.default : f;
        o.mods[l] = f, o.components[l] = h;
        const g = (h.__vccOpts || h)[t];
        return g && it(g, n, s, o, l, r)();
      }));
    }
  }
  return i;
}
function nu(e, t) {
  const n = [], s = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < i; o++) {
    const l = t.matched[o];
    l && (e.matched.find((d) => Tt(d, l)) ? s.push(l) : n.push(l));
    const c = e.matched[o];
    c && (t.matched.find((d) => Tt(d, c)) || r.push(c));
  }
  return [n, s, r];
}
/*!
* vue-router v4.6.4
* (c) 2025 Eduardo San Martin Morote
* @license MIT
*/
let su = () => location.protocol + "//" + location.host;
function Vi(e, t) {
  const { pathname: n, search: s, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let o = r.includes(e.slice(i)) ? e.slice(i).length : 1, l = r.slice(o);
    return l[0] !== "/" && (l = "/" + l), ur(l, "");
  }
  return ur(n, e) + s + r;
}
function ru(e, t, n, s) {
  let r = [], i = [], o = null;
  const l = ({ state: g }) => {
    const m = Vi(e, location), T = n.value, S = t.value;
    let j = 0;
    if (g) {
      if (n.value = m, t.value = g, o && o === T) {
        o = null;
        return;
      }
      j = S ? g.position - S.position : 0;
    } else s(m);
    r.forEach((F) => {
      F(n.value, T, { delta: j, type: ns.pop, direction: j ? j > 0 ? Gn.forward : Gn.back : Gn.unknown });
    });
  };
  function c() {
    o = n.value;
  }
  function d(g) {
    r.push(g);
    const m = () => {
      const T = r.indexOf(g);
      T > -1 && r.splice(T, 1);
    };
    return i.push(m), m;
  }
  function f() {
    if (document.visibilityState === "hidden") {
      const { history: g } = window;
      if (!g.state) return;
      g.replaceState(W({}, g.state, { scroll: Pn() }), "");
    }
  }
  function h() {
    for (const g of i) g();
    i = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", f), document.removeEventListener("visibilitychange", f);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", f), document.addEventListener("visibilitychange", f), { pauseListeners: c, listen: d, destroy: h };
}
function pr(e, t, n, s = false, r = false) {
  return { back: e, current: t, forward: n, replaced: s, position: window.history.length, scroll: r ? Pn() : null };
}
function iu(e) {
  const { history: t, location: n } = window, s = { value: Vi(e, n) }, r = { value: t.state };
  r.value || i(s.value, { back: null, current: s.value, forward: null, position: t.length - 1, replaced: true, scroll: null }, true);
  function i(c, d, f) {
    const h = e.indexOf("#"), g = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c : su() + e + c;
    try {
      t[f ? "replaceState" : "pushState"](d, "", g), r.value = d;
    } catch (m) {
      console.error(m), n[f ? "replace" : "assign"](g);
    }
  }
  function o(c, d) {
    i(c, W({}, t.state, pr(r.value.back, c, r.value.forward, true), d, { position: r.value.position }), true), s.value = c;
  }
  function l(c, d) {
    const f = W({}, r.value, t.state, { forward: c, scroll: Pn() });
    i(f.current, f, true), i(c, W({}, pr(s.value, c, null), { position: f.position + 1 }, d), false), s.value = c;
  }
  return { location: s, state: r, push: l, replace: o };
}
function ou(e) {
  e = Kc(e);
  const t = iu(e), n = ru(e, t.state, t.location, t.replace);
  function s(i, o = true) {
    o || n.pauseListeners(), history.go(i);
  }
  const r = W({ location: "", base: e, go: s, createHref: qc.bind(null, e) }, t, n);
  return Object.defineProperty(r, "location", { enumerable: true, get: () => t.location.value }), Object.defineProperty(r, "state", { enumerable: true, get: () => t.state.value }), r;
}
function lu(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), ou(e);
}
let pt = (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({});
var se = (function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
})(se || {});
const cu = { type: pt.Static, value: "" }, uu = /[a-zA-Z0-9_]/;
function fu(e) {
  if (!e) return [[]];
  if (e === "/") return [[cu]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${d}": ${m}`);
  }
  let n = se.Static, s = n;
  const r = [];
  let i;
  function o() {
    i && r.push(i), i = [];
  }
  let l = 0, c, d = "", f = "";
  function h() {
    d && (n === se.Static ? i.push({ type: pt.Static, value: d }) : n === se.Param || n === se.ParamRegExp || n === se.ParamRegExpEnd ? (i.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), i.push({ type: pt.Param, value: d, regexp: f, repeatable: c === "*" || c === "+", optional: c === "*" || c === "?" })) : t("Invalid state to consume buffer"), d = "");
  }
  function g() {
    d += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== se.ParamRegExp) {
      s = n, n = se.EscapeNext;
      continue;
    }
    switch (n) {
      case se.Static:
        c === "/" ? (d && h(), o()) : c === ":" ? (h(), n = se.Param) : g();
        break;
      case se.EscapeNext:
        g(), n = s;
        break;
      case se.Param:
        c === "(" ? n = se.ParamRegExp : uu.test(c) ? g() : (h(), n = se.Static, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case se.ParamRegExp:
        c === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + c : n = se.ParamRegExpEnd : f += c;
        break;
      case se.ParamRegExpEnd:
        h(), n = se.Static, c !== "*" && c !== "?" && c !== "+" && l--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === se.ParamRegExp && t(`Unfinished custom RegExp for param "${d}"`), h(), o(), r;
}
const gr = "[^/]+?", au = { sensitive: false, strict: false, start: true, end: true };
var de = (function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
})(de || {});
const hu = /[.+*?^${}()[\]/\\]/g;
function du(e, t) {
  const n = W({}, au, t), s = [];
  let r = n.start ? "^" : "";
  const i = [];
  for (const d of e) {
    const f = d.length ? [] : [de.Root];
    n.strict && !d.length && (r += "/");
    for (let h = 0; h < d.length; h++) {
      const g = d[h];
      let m = de.Segment + (n.sensitive ? de.BonusCaseSensitive : 0);
      if (g.type === pt.Static) h || (r += "/"), r += g.value.replace(hu, "\\$&"), m += de.Static;
      else if (g.type === pt.Param) {
        const { value: T, repeatable: S, optional: j, regexp: F } = g;
        i.push({ name: T, repeatable: S, optional: j });
        const O = F || gr;
        if (O !== gr) {
          m += de.BonusCustomRegExp;
          try {
            `${O}`;
          } catch (I) {
            throw new Error(`Invalid custom RegExp for param "${T}" (${O}): ` + I.message);
          }
        }
        let N = S ? `((?:${O})(?:/(?:${O}))*)` : `(${O})`;
        h || (N = j && d.length < 2 ? `(?:/${N})` : "/" + N), j && (N += "?"), r += N, m += de.Dynamic, j && (m += de.BonusOptional), S && (m += de.BonusRepeatable), O === ".*" && (m += de.BonusWildcard);
      }
      f.push(m);
    }
    s.push(f);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += de.BonusStrict;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const o = new RegExp(r, n.sensitive ? "" : "i");
  function l(d) {
    const f = d.match(o), h = {};
    if (!f) return null;
    for (let g = 1; g < f.length; g++) {
      const m = f[g] || "", T = i[g - 1];
      h[T.name] = m && T.repeatable ? m.split("/") : m;
    }
    return h;
  }
  function c(d) {
    let f = "", h = false;
    for (const g of e) {
      (!h || !f.endsWith("/")) && (f += "/"), h = false;
      for (const m of g) if (m.type === pt.Static) f += m.value;
      else if (m.type === pt.Param) {
        const { value: T, repeatable: S, optional: j } = m, F = T in d ? d[T] : "";
        if (we(F) && !S) throw new Error(`Provided param "${T}" is an array but it is not repeatable (* or + modifiers)`);
        const O = we(F) ? F.join("/") : F;
        if (!O) if (j) g.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : h = true);
        else throw new Error(`Missing required param "${T}"`);
        f += O;
      }
    }
    return f || "/";
  }
  return { re: o, score: s, keys: i, parse: l, stringify: c };
}
function pu(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === de.Static + de.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === de.Static + de.Segment ? 1 : -1 : 0;
}
function Bi(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const i = pu(s[n], r[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (mr(s)) return 1;
    if (mr(r)) return -1;
  }
  return r.length - s.length;
}
function mr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const gu = { strict: false, end: true, sensitive: false };
function mu(e, t, n) {
  const s = du(fu(e.path), n), r = W(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function _u(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = cr(gu, t);
  function r(h) {
    return s.get(h);
  }
  function i(h, g, m) {
    const T = !m, S = vr(h);
    S.aliasOf = m && m.record;
    const j = cr(t, h), F = [S];
    if ("alias" in h) {
      const I = typeof h.alias == "string" ? [h.alias] : h.alias;
      for (const J of I) F.push(vr(W({}, S, { components: m ? m.record.components : S.components, path: J, aliasOf: m ? m.record : S })));
    }
    let O, N;
    for (const I of F) {
      const { path: J } = I;
      if (g && J[0] !== "/") {
        const oe = g.record.path, ee = oe[oe.length - 1] === "/" ? "" : "/";
        I.path = g.record.path + (J && ee + J);
      }
      if (O = mu(I, g, j), m ? m.alias.push(O) : (N = N || O, N !== O && N.alias.push(O), T && h.name && !yr(O) && o(h.name)), Ui(O) && c(O), S.children) {
        const oe = S.children;
        for (let ee = 0; ee < oe.length; ee++) i(oe[ee], O, m && m.children[ee]);
      }
      m = m || O;
    }
    return N ? () => {
      o(N);
    } : kt;
  }
  function o(h) {
    if (Fi(h)) {
      const g = s.get(h);
      g && (s.delete(h), n.splice(n.indexOf(g), 1), g.children.forEach(o), g.alias.forEach(o));
    } else {
      const g = n.indexOf(h);
      g > -1 && (n.splice(g, 1), h.record.name && s.delete(h.record.name), h.children.forEach(o), h.alias.forEach(o));
    }
  }
  function l() {
    return n;
  }
  function c(h) {
    const g = bu(h, n);
    n.splice(g, 0, h), h.record.name && !yr(h) && s.set(h.record.name, h);
  }
  function d(h, g) {
    let m, T = {}, S, j;
    if ("name" in h && h.name) {
      if (m = s.get(h.name), !m) throw It(te.MATCHER_NOT_FOUND, { location: h });
      j = m.record.name, T = W(_r(g.params, m.keys.filter((N) => !N.optional).concat(m.parent ? m.parent.keys.filter((N) => N.optional) : []).map((N) => N.name)), h.params && _r(h.params, m.keys.map((N) => N.name))), S = m.stringify(T);
    } else if (h.path != null) S = h.path, m = n.find((N) => N.re.test(S)), m && (T = m.parse(S), j = m.record.name);
    else {
      if (m = g.name ? s.get(g.name) : n.find((N) => N.re.test(g.path)), !m) throw It(te.MATCHER_NOT_FOUND, { location: h, currentLocation: g });
      j = m.record.name, T = W({}, g.params, h.params), S = m.stringify(T);
    }
    const F = [];
    let O = m;
    for (; O; ) F.unshift(O.record), O = O.parent;
    return { name: j, path: S, params: T, matched: F, meta: yu(F) };
  }
  e.forEach((h) => i(h));
  function f() {
    n.length = 0, s.clear();
  }
  return { addRoute: i, resolve: d, removeRoute: o, clearRoutes: f, getRoutes: l, getRecordMatcher: r };
}
function _r(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function vr(e) {
  const t = { path: e.path, redirect: e.redirect, name: e.name, meta: e.meta || {}, aliasOf: e.aliasOf, beforeEnter: e.beforeEnter, props: vu(e), children: e.children || [], instances: {}, leaveGuards: /* @__PURE__ */ new Set(), updateGuards: /* @__PURE__ */ new Set(), enterCallbacks: {}, components: "components" in e ? e.components || null : e.component && { default: e.component } };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function vu(e) {
  const t = {}, n = e.props || false;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function yr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return true;
    e = e.parent;
  }
  return false;
}
function yu(e) {
  return e.reduce((t, n) => W(t, n.meta), {});
}
function bu(e, t) {
  let n = 0, s = t.length;
  for (; n !== s; ) {
    const i = n + s >> 1;
    Bi(e, t[i]) < 0 ? s = i : n = i + 1;
  }
  const r = Eu(e);
  return r && (s = t.lastIndexOf(r, s - 1)), s;
}
function Eu(e) {
  let t = e;
  for (; t = t.parent; ) if (Ui(t) && Bi(e, t) === 0) return t;
}
function Ui({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function br(e) {
  const t = ze(Cs), n = ze(ji), s = Re(() => {
    const c = St(e.to);
    return t.resolve(c);
  }), r = Re(() => {
    const { matched: c } = s.value, { length: d } = c, f = c[d - 1], h = n.matched;
    if (!f || !h.length) return -1;
    const g = h.findIndex(Tt.bind(null, f));
    if (g > -1) return g;
    const m = Er(c[d - 2]);
    return d > 1 && Er(f) === m && h[h.length - 1].path !== m ? h.findIndex(Tt.bind(null, c[d - 2])) : g;
  }), i = Re(() => r.value > -1 && Cu(n.params, s.value.params)), o = Re(() => r.value > -1 && r.value === n.matched.length - 1 && Li(n.params, s.value.params));
  function l(c = {}) {
    if (Su(c)) {
      const d = t[St(e.replace) ? "replace" : "push"](St(e.to)).catch(kt);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => d), d;
    }
    return Promise.resolve();
  }
  return { route: s, href: Re(() => s.value.href), isActive: i, isExactActive: o, navigate: l };
}
function xu(e) {
  return e.length === 1 ? e[0] : e;
}
const Ru = ni({ name: "RouterLink", compatConfig: { MODE: 3 }, props: { to: { type: [String, Object], required: true }, replace: Boolean, activeClass: String, exactActiveClass: String, custom: Boolean, ariaCurrentValue: { type: String, default: "page" }, viewTransition: Boolean }, useLink: br, setup(e, { slots: t }) {
  const n = An(br(e)), { options: s } = ze(Cs), r = Re(() => ({ [xr(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive, [xr(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive }));
  return () => {
    const i = t.default && xu(t.default(n));
    return e.custom ? i : wi("a", { "aria-current": n.isExactActive ? e.ariaCurrentValue : null, href: n.href, onClick: n.navigate, class: r.value }, i);
  };
} }), Au = Ru;
function Su(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), true;
  }
}
function Cu(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r) return false;
    } else if (!we(r) || r.length !== s.length || s.some((i, o) => i.valueOf() !== r[o].valueOf())) return false;
  }
  return true;
}
function Er(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const xr = (e, t, n) => e ?? t ?? n, wu = ni({ name: "RouterView", inheritAttrs: false, props: { name: { type: String, default: "default" }, route: Object }, compatConfig: { MODE: 3 }, setup(e, { attrs: t, slots: n }) {
  const s = ze(rs), r = Re(() => e.route || s.value), i = ze(dr, 0), o = Re(() => {
    let d = St(i);
    const { matched: f } = r.value;
    let h;
    for (; (h = f[d]) && !h.components; ) d++;
    return d;
  }), l = Re(() => r.value.matched[o.value]);
  ln(dr, Re(() => o.value + 1)), ln(tu, l), ln(rs, r);
  const c = qr();
  return cn(() => [c.value, l.value, e.name], ([d, f, h], [g, m, T]) => {
    f && (f.instances[h] = d, m && m !== f && d && d === g && (f.leaveGuards.size || (f.leaveGuards = m.leaveGuards), f.updateGuards.size || (f.updateGuards = m.updateGuards))), d && f && (!m || !Tt(f, m) || !g) && (f.enterCallbacks[h] || []).forEach((S) => S(d));
  }, { flush: "post" }), () => {
    const d = r.value, f = e.name, h = l.value, g = h && h.components[f];
    if (!g) return Rr(n.default, { Component: g, route: d });
    const m = h.props[f], T = m ? m === true ? d.params : typeof m == "function" ? m(d) : m : null, j = wi(g, W({}, T, t, { onVnodeUnmounted: (F) => {
      F.component.isUnmounted && (h.instances[f] = null);
    }, ref: c }));
    return Rr(n.default, { Component: j, route: d }) || j;
  };
} });
function Rr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Ou = wu;
function Pu(e) {
  const t = _u(e.routes, e), n = e.parseQuery || Zc, s = e.stringifyQuery || hr, r = e.history, i = Ft(), o = Ft(), l = Ft(), c = Ao(st);
  let d = st;
  xt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Bn.bind(null, (y) => "" + y), h = Bn.bind(null, Fc), g = Bn.bind(null, Zt);
  function m(y, P) {
    let C, M;
    return Fi(y) ? (C = t.getRecordMatcher(y), M = P) : M = y, t.addRoute(M, C);
  }
  function T(y) {
    const P = t.getRecordMatcher(y);
    P && t.removeRoute(P);
  }
  function S() {
    return t.getRoutes().map((y) => y.record);
  }
  function j(y) {
    return !!t.getRecordMatcher(y);
  }
  function F(y, P) {
    if (P = W({}, P || c.value), typeof y == "string") {
      const p = Un(n, y, P.path), _ = t.resolve({ path: p.path }, P), b = r.createHref(p.fullPath);
      return W(p, _, { params: g(_.params), hash: Zt(p.hash), redirectedFrom: void 0, href: b });
    }
    let C;
    if (y.path != null) C = W({}, y, { path: Un(n, y.path, P.path).path });
    else {
      const p = W({}, y.params);
      for (const _ in p) p[_] == null && delete p[_];
      C = W({}, y, { params: h(p) }), P.params = h(P.params);
    }
    const M = t.resolve(C, P), U = y.hash || "";
    M.params = f(g(M.params));
    const u = Vc(s, W({}, y, { hash: Mc(U), path: M.path })), a = r.createHref(u);
    return W({ fullPath: u, hash: U, query: s === hr ? eu(y.query) : y.query || {} }, M, { redirectedFrom: void 0, href: a });
  }
  function O(y) {
    return typeof y == "string" ? Un(n, y, c.value.path) : W({}, y);
  }
  function N(y, P) {
    if (d !== y) return It(te.NAVIGATION_CANCELLED, { from: P, to: y });
  }
  function I(y) {
    return ee(y);
  }
  function J(y) {
    return I(W(O(y), { replace: true }));
  }
  function oe(y, P) {
    const C = y.matched[y.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: M } = C;
      let U = typeof M == "function" ? M(y, P) : M;
      return typeof U == "string" && (U = U.includes("?") || U.includes("#") ? U = O(U) : { path: U }, U.params = {}), W({ query: y.query, hash: y.hash, params: U.path != null ? {} : y.params }, U);
    }
  }
  function ee(y, P) {
    const C = d = F(y), M = c.value, U = y.state, u = y.force, a = y.replace === true, p = oe(C, M);
    if (p) return ee(W(O(p), { state: typeof p == "object" ? W({}, U, p.state) : U, force: u, replace: a }), P || C);
    const _ = C;
    _.redirectedFrom = P;
    let b;
    return !u && Bc(s, M, C) && (b = It(te.NAVIGATION_DUPLICATED, { to: _, from: M }), Ie(M, M, true, false)), (b ? Promise.resolve(b) : Pe(_, M)).catch((v) => We(v) ? We(v, te.NAVIGATION_GUARD_REDIRECT) ? v : nt(v) : K(v, _, M)).then((v) => {
      if (v) {
        if (We(v, te.NAVIGATION_GUARD_REDIRECT)) return ee(W({ replace: a }, O(v.to), { state: typeof v.to == "object" ? W({}, U, v.to.state) : U, force: u }), P || _);
      } else v = ut(_, M, true, a, U);
      return tt(_, M, v), v;
    });
  }
  function Oe(y, P) {
    const C = N(y, P);
    return C ? Promise.reject(C) : Promise.resolve();
  }
  function et(y) {
    const P = yt.values().next().value;
    return P && typeof P.runWithContext == "function" ? P.runWithContext(y) : y();
  }
  function Pe(y, P) {
    let C;
    const [M, U, u] = nu(y, P);
    C = Kn(M.reverse(), "beforeRouteLeave", y, P);
    for (const p of M) p.leaveGuards.forEach((_) => {
      C.push(it(_, y, P));
    });
    const a = Oe.bind(null, y, P);
    return C.push(a), Ee(C).then(() => {
      C = [];
      for (const p of i.list()) C.push(it(p, y, P));
      return C.push(a), Ee(C);
    }).then(() => {
      C = Kn(U, "beforeRouteUpdate", y, P);
      for (const p of U) p.updateGuards.forEach((_) => {
        C.push(it(_, y, P));
      });
      return C.push(a), Ee(C);
    }).then(() => {
      C = [];
      for (const p of u) if (p.beforeEnter) if (we(p.beforeEnter)) for (const _ of p.beforeEnter) C.push(it(_, y, P));
      else C.push(it(p.beforeEnter, y, P));
      return C.push(a), Ee(C);
    }).then(() => (y.matched.forEach((p) => p.enterCallbacks = {}), C = Kn(u, "beforeRouteEnter", y, P, et), C.push(a), Ee(C))).then(() => {
      C = [];
      for (const p of o.list()) C.push(it(p, y, P));
      return C.push(a), Ee(C);
    }).catch((p) => We(p, te.NAVIGATION_CANCELLED) ? p : Promise.reject(p));
  }
  function tt(y, P, C) {
    l.list().forEach((M) => et(() => M(y, P, C)));
  }
  function ut(y, P, C, M, U) {
    const u = N(y, P);
    if (u) return u;
    const a = P === st, p = xt ? history.state : {};
    C && (M || a ? r.replace(y.fullPath, W({ scroll: a && p && p.scroll }, U)) : r.push(y.fullPath, U)), c.value = y, Ie(y, P, C, a), nt();
  }
  let Te;
  function Nt() {
    Te || (Te = r.listen((y, P, C) => {
      if (!ft.listening) return;
      const M = F(y), U = oe(M, ft.currentRoute.value);
      if (U) {
        ee(W(U, { replace: true, force: true }), M).catch(kt);
        return;
      }
      d = M;
      const u = c.value;
      xt && Jc(ar(u.fullPath, C.delta), Pn()), Pe(M, u).catch((a) => We(a, te.NAVIGATION_ABORTED | te.NAVIGATION_CANCELLED) ? a : We(a, te.NAVIGATION_GUARD_REDIRECT) ? (ee(W(O(a.to), { force: true }), M).then((p) => {
        We(p, te.NAVIGATION_ABORTED | te.NAVIGATION_DUPLICATED) && !C.delta && C.type === ns.pop && r.go(-1, false);
      }).catch(kt), Promise.reject()) : (C.delta && r.go(-C.delta, false), K(a, M, u))).then((a) => {
        a = a || ut(M, u, false), a && (C.delta && !We(a, te.NAVIGATION_CANCELLED) ? r.go(-C.delta, false) : C.type === ns.pop && We(a, te.NAVIGATION_ABORTED | te.NAVIGATION_DUPLICATED) && r.go(-1, false)), tt(M, u, a);
      }).catch(kt);
    }));
  }
  let _t = Ft(), re = Ft(), $;
  function K(y, P, C) {
    nt(y);
    const M = re.list();
    return M.length ? M.forEach((U) => U(y, P, C)) : console.error(y), Promise.reject(y);
  }
  function Ge() {
    return $ && c.value !== st ? Promise.resolve() : new Promise((y, P) => {
      _t.add([y, P]);
    });
  }
  function nt(y) {
    return $ || ($ = !y, Nt(), _t.list().forEach(([P, C]) => y ? C(y) : P()), _t.reset()), y;
  }
  function Ie(y, P, C, M) {
    const { scrollBehavior: U } = e;
    if (!xt || !U) return Promise.resolve();
    const u = !C && zc(ar(y.fullPath, 0)) || (M || !C) && history.state && history.state.scroll || null;
    return zr().then(() => U(y, P, u)).then((a) => a && $c(a)).catch((a) => K(a, y, P));
  }
  const me = (y) => r.go(y);
  let vt;
  const yt = /* @__PURE__ */ new Set(), ft = { currentRoute: c, listening: true, addRoute: m, removeRoute: T, clearRoutes: t.clearRoutes, hasRoute: j, getRoutes: S, resolve: F, options: e, push: I, replace: J, go: me, back: () => me(-1), forward: () => me(1), beforeEach: i.add, beforeResolve: o.add, afterEach: l.add, onError: re.add, isReady: Ge, install(y) {
    y.component("RouterLink", Au), y.component("RouterView", Ou), y.config.globalProperties.$router = ft, Object.defineProperty(y.config.globalProperties, "$route", { enumerable: true, get: () => St(c) }), xt && !vt && c.value === st && (vt = true, I(r.location).catch((M) => {
    }));
    const P = {};
    for (const M in st) Object.defineProperty(P, M, { get: () => c.value[M], enumerable: true });
    y.provide(Cs, ft), y.provide(ji, Kr(P)), y.provide(rs, c);
    const C = y.unmount;
    yt.add(y), y.unmount = function() {
      yt.delete(y), yt.size < 1 && (d = st, Te && Te(), Te = null, c.value = st, vt = false, $ = false), C();
    };
  } };
  function Ee(y) {
    return y.reduce((P, C) => P.then(() => et(C)), Promise.resolve());
  }
  return ft;
}
function Tu(e) {
  const { extendRoutes: t, routes: n } = e;
  return t && console.warn('"extendRoutes()" is deprecated, please modify the routes directly. See https://uvr.esm.is/guide/extending-routes.html#extending-routes-at-runtime for an alternative.'), Pu(Object.assign(e, { routes: typeof t == "function" && t(n) || n }));
}
const Iu = [], Nu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
}, Mu = {};
function Du(e, t) {
  const n = el("RouterView");
  return Pl(), Nl(n);
}
const Lu = Nu(Mu, [["render", Du]]), ws = vc(Lu), Fu = xc(), Hu = Tu({ history: lu(), routes: Iu });
ws.use(Fu);
ws.use(Hu);
ws.mount("#app");
