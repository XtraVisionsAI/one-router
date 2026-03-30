import { r as D, ad as Zn, w as Ae, aI as Mr, o as Ct, ag as bt, af as tl, ah as Ie, aJ as nl, ae as Ue, ai as qe, i as xe, aB as Pe, B as Ir, M as dt, aK as _r, d as le, a8 as Ee, aq as Jt, aL as ol, j as d, aM as rl, a as F, t as oe, aN as uo, au as Mt, aw as fo, aO as Yn, X as Ft, aP as il, aQ as Br, L as Kt, K as He, aR as ll, aS as ho, ax as sn, aT as _n, ao as It, aU as pn, aV as gn, aW as al, aX as sl, aY as vo, aZ as dl, a_ as Ut, a$ as Ar, b0 as Wt, b1 as Jn, b2 as cl, b3 as _o, b4 as ul, b5 as Bo, b6 as Ao, b7 as an, b8 as fl, b9 as Eo, ba as hl, bb as vl, bc as pl, bd as gl, be as bl, bf as ml, bg as yl, f as O, h as Q, e as X, $ as ot, k as Te, l as ye, bh as wl, m as Ye, J as pe, al as pt, T as Qt, bi as xl, g as G, H as Le, I as po, ar as go, _ as mt, bj as Cl, a4 as jt, bk as Sl, bl as kl, R as zt, as as Er, bm as Lr, ap as Rl, bn as Pl, at as bo, b as zl, bo as Fl, F as Re, Y as $l, bp as Ol, bq as Tl, G as Dt, aj as Nr, br as Dr, N as Kr, bs as Ml, bt as jr, a7 as Il, bu as Hr, bv as _l, bw as Bl, bx as Ur, by as Al, bz as Vr, bA as El, a5 as Ll, bB as Nl, bC as Dl, c as Kl, bD as jl, an as Hl, bE as Ul, bF as Vl } from "./index-05ypFx4P.js";
import { c as Wl, t as mo, i as Wr, g as Qn, b as Gl, u as bn, f as We, N as ql, _ as Lo, C as Xl } from "./Input-DWI3RPho.js";
import { r as xt, a as mn, i as No, c as ne, u as en } from "./use-form-item-C0_shOgu.js";
import { a as Qe } from "./use-message-ATPVOnVB.js";
import { a as Gr } from "./useApi-Dn3Fgv7i.js";
import { c as Do, B as Ko } from "./Button-BTod08TO.js";
let dn = [];
const qr = /* @__PURE__ */ new WeakMap();
function Zl() {
  dn.forEach((e) => e(...qr.get(e))), dn = [];
}
function cn(e, ...t) {
  qr.set(e, t), !dn.includes(e) && dn.push(e) === 1 && requestAnimationFrame(Zl);
}
function rt(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0) return true;
    n = n.parentElement;
  }
  return false;
}
function Yl(e) {
  const t = D(!!e.value);
  if (t.value) return Zn(t);
  const n = Ae(e, (o) => {
    o && (t.value = true, n());
  });
  return Zn(t);
}
function Jl() {
  return Mr() !== null;
}
const Ql = typeof window < "u";
let Ht, Xt;
const ea = () => {
  var e, t;
  Ht = Ql ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Xt = false, Ht !== void 0 ? Ht.then(() => {
    Xt = true;
  }) : Xt = true;
};
ea();
function ta(e) {
  if (Xt) return;
  let t = false;
  Ct(() => {
    Xt || (Ht == null ? void 0 : Ht.then(() => {
      t || e();
    }));
  }), bt(() => {
    t = true;
  });
}
function na(e = {}, t) {
  const n = nl({ ctrl: false, command: false, win: false, shift: false, tab: false }), { keydown: o, keyup: r } = e, i = (s) => {
    switch (s.key) {
      case "Control":
        n.ctrl = true;
        break;
      case "Meta":
        n.command = true, n.win = true;
        break;
      case "Shift":
        n.shift = true;
        break;
      case "Tab":
        n.tab = true;
        break;
    }
    o !== void 0 && Object.keys(o).forEach((c) => {
      if (c !== s.key) return;
      const f = o[c];
      if (typeof f == "function") f(s);
      else {
        const { stop: p = false, prevent: m = false } = f;
        p && s.stopPropagation(), m && s.preventDefault(), f.handler(s);
      }
    });
  }, a = (s) => {
    switch (s.key) {
      case "Control":
        n.ctrl = false;
        break;
      case "Meta":
        n.command = false, n.win = false;
        break;
      case "Shift":
        n.shift = false;
        break;
      case "Tab":
        n.tab = false;
        break;
    }
    r !== void 0 && Object.keys(r).forEach((c) => {
      if (c !== s.key) return;
      const f = r[c];
      if (typeof f == "function") f(s);
      else {
        const { stop: p = false, prevent: m = false } = f;
        p && s.stopPropagation(), m && s.preventDefault(), f.handler(s);
      }
    });
  }, l = () => {
    (t === void 0 || t.value) && (Ue("keydown", document, i), Ue("keyup", document, a)), t !== void 0 && Ae(t, (s) => {
      s ? (Ue("keydown", document, i), Ue("keyup", document, a)) : (Ie("keydown", document, i), Ie("keyup", document, a));
    });
  };
  return Jl() ? (tl(l), bt(() => {
    (t === void 0 || t.value) && (Ie("keydown", document, i), Ie("keyup", document, a));
  })) : l(), Zn(n);
}
const yo = qe("n-internal-select-menu"), Xr = qe("n-internal-select-menu-body"), wo = qe("n-drawer-body"), xo = qe("n-modal-body"), pu = qe("n-modal-provider"), gu = qe("n-modal"), yn = qe("n-popover-body"), Zr = "__disabled__";
function gt(e) {
  const t = xe(xo, null), n = xe(wo, null), o = xe(yn, null), r = xe(Xr, null), i = D();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    Ct(() => {
      Ue("fullscreenchange", document, a);
    }), bt(() => {
      Ie("fullscreenchange", document, a);
    });
  }
  return Pe(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === false ? Zr : l === true ? i.value || "body" : l : (t == null ? void 0 : t.value) ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : (n == null ? void 0 : n.value) ? n.value : (o == null ? void 0 : o.value) ? o.value : (r == null ? void 0 : r.value) ? r.value : l ?? (i.value || "body");
  });
}
gt.tdkey = Zr;
gt.propTo = { type: [String, Object, Boolean], default: void 0 };
function oa(e, t, n) {
  const o = D(e.value);
  let r = null;
  return Ae(e, (i) => {
    r !== null && window.clearTimeout(r), i === true ? n && !n.value ? o.value = true : r = window.setTimeout(() => {
      o.value = true;
    }, t) : o.value = false;
  }), o;
}
function eo(e, t, n = "default") {
  const o = t[n];
  if (o === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function to(e, t = true, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Ir(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        to(o, t, n);
        return;
      }
      if (o.type === dt) {
        if (o.children === null) return;
        Array.isArray(o.children) && to(o.children, t, n);
      } else o.type !== _r && n.push(o);
    }
  }), n;
}
function jo(e, t, n = "default") {
  const o = t[n];
  if (o === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = to(o());
  if (r.length === 1) return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let kt = null;
function Yr() {
  if (kt === null && (kt = document.getElementById("v-binder-view-measurer"), kt === null)) {
    kt = document.createElement("div"), kt.id = "v-binder-view-measurer";
    const { style: e } = kt;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(kt);
  }
  return kt.getBoundingClientRect();
}
function ra(e, t) {
  const n = Yr();
  return { top: t, left: e, height: 0, width: 0, right: n.width - e, bottom: n.height - t };
}
function Bn(e) {
  const t = e.getBoundingClientRect(), n = Yr();
  return { left: t.left - n.left, top: t.top - n.top, bottom: n.height + n.top - t.bottom, right: n.width + n.left - t.right, width: t.width, height: t.height };
}
function ia(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Jr(e) {
  if (e === null) return null;
  const t = ia(e);
  if (t === null) return null;
  if (t.nodeType === 9) return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o)) return t;
  }
  return Jr(t);
}
const Co = le({ name: "Binder", props: { syncTargetWithParent: Boolean, syncTarget: { type: Boolean, default: true } }, setup(e) {
  var t;
  Ee("VBinder", (t = Mr()) === null || t === void 0 ? void 0 : t.proxy);
  const n = xe("VBinder", null), o = D(null), r = (b) => {
    o.value = b, n && e.syncTargetWithParent && n.setTargetRef(b);
  };
  let i = [];
  const a = () => {
    let b = o.value;
    for (; b = Jr(b), b !== null; ) i.push(b);
    for (const w of i) Ue("scroll", w, p, true);
  }, l = () => {
    for (const b of i) Ie("scroll", b, p, true);
    i = [];
  }, s = /* @__PURE__ */ new Set(), c = (b) => {
    s.size === 0 && a(), s.has(b) || s.add(b);
  }, f = (b) => {
    s.has(b) && s.delete(b), s.size === 0 && l();
  }, p = () => {
    cn(m);
  }, m = () => {
    s.forEach((b) => b());
  }, g = /* @__PURE__ */ new Set(), u = (b) => {
    g.size === 0 && Ue("resize", window, v), g.has(b) || g.add(b);
  }, h = (b) => {
    g.has(b) && g.delete(b), g.size === 0 && Ie("resize", window, v);
  }, v = () => {
    g.forEach((b) => b());
  };
  return bt(() => {
    Ie("resize", window, v), l();
  }), { targetRef: o, setTargetRef: r, addScrollListener: c, removeScrollListener: f, addResizeListener: u, removeResizeListener: h };
}, render() {
  return eo("binder", this.$slots);
} }), So = le({ name: "Target", setup() {
  const { setTargetRef: e, syncTarget: t } = xe("VBinder");
  return { syncTarget: t, setTargetDirective: { mounted: e, updated: e } };
}, render() {
  const { syncTarget: e, setTargetDirective: t } = this;
  return e ? Jt(jo("follower", this.$slots), [[t]]) : jo("follower", this.$slots);
} }), Et = "@@mmoContext", la = { mounted(e, { value: t }) {
  e[Et] = { handler: void 0 }, typeof t == "function" && (e[Et].handler = t, Ue("mousemoveoutside", e, t));
}, updated(e, { value: t }) {
  const n = e[Et];
  typeof t == "function" ? n.handler ? n.handler !== t && (Ie("mousemoveoutside", e, n.handler), n.handler = t, Ue("mousemoveoutside", e, t)) : (e[Et].handler = t, Ue("mousemoveoutside", e, t)) : n.handler && (Ie("mousemoveoutside", e, n.handler), n.handler = void 0);
}, unmounted(e) {
  const { handler: t } = e[Et];
  t && Ie("mousemoveoutside", e, t), e[Et].handler = void 0;
} }, Lt = "@@coContext", un = { mounted(e, { value: t, modifiers: n }) {
  e[Lt] = { handler: void 0 }, typeof t == "function" && (e[Lt].handler = t, Ue("clickoutside", e, t, { capture: n.capture }));
}, updated(e, { value: t, modifiers: n }) {
  const o = e[Lt];
  typeof t == "function" ? o.handler ? o.handler !== t && (Ie("clickoutside", e, o.handler, { capture: n.capture }), o.handler = t, Ue("clickoutside", e, t, { capture: n.capture })) : (e[Lt].handler = t, Ue("clickoutside", e, t, { capture: n.capture })) : o.handler && (Ie("clickoutside", e, o.handler, { capture: n.capture }), o.handler = void 0);
}, unmounted(e, { modifiers: t }) {
  const { handler: n } = e[Lt];
  n && Ie("clickoutside", e, n, { capture: t.capture }), e[Lt].handler = void 0;
} };
function aa(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class sa {
  constructor() {
    this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
  }
  get elementCount() {
    return this.elementZIndex.size;
  }
  ensureZIndex(t, n) {
    const { elementZIndex: o } = this;
    if (n !== void 0) {
      t.style.zIndex = `${n}`, o.delete(t);
      return;
    }
    const { nextZIndex: r } = this;
    o.has(t) && o.get(t) + 1 === this.nextZIndex || (t.style.zIndex = `${r}`, o.set(t, r), this.nextZIndex = r + 1, this.squashState());
  }
  unregister(t, n) {
    const { elementZIndex: o } = this;
    o.has(t) ? o.delete(t) : n === void 0 && aa("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
  }
  squashState() {
    const { elementCount: t } = this;
    t || (this.nextZIndex = 2e3), this.nextZIndex - t > 2500 && this.rearrange();
  }
  rearrange() {
    const t = Array.from(this.elementZIndex.entries());
    t.sort((n, o) => n[1] - o[1]), this.nextZIndex = 2e3, t.forEach((n) => {
      const o = n[0], r = this.nextZIndex++;
      `${r}` !== o.style.zIndex && (o.style.zIndex = `${r}`);
    });
  }
}
const An = new sa(), Nt = "@@ziContext", Qr = { mounted(e, t) {
  const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
  e[Nt] = { enabled: !!r, initialized: false }, r && (An.ensureZIndex(e, o), e[Nt].initialized = true);
}, updated(e, t) {
  const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[Nt].enabled;
  r && !i && (An.ensureZIndex(e, o), e[Nt].initialized = true), e[Nt].enabled = !!r;
}, unmounted(e, t) {
  if (!e[Nt].initialized) return;
  const { value: n = {} } = t, { zIndex: o } = n;
  An.unregister(e, o);
} }, { c: Pt } = ol(), ko = "vueuc-style";
function Ho(e) {
  return e & -e;
}
class ei {
  constructor(t, n) {
    this.l = t, this.min = n;
    const o = new Array(t + 1);
    for (let r = 0; r < t + 1; ++r) o[r] = 0;
    this.ft = o;
  }
  add(t, n) {
    if (n === 0) return;
    const { l: o, ft: r } = this;
    for (t += 1; t <= o; ) r[t] += n, t += Ho(t);
  }
  get(t) {
    return this.sum(t + 1) - this.sum(t);
  }
  sum(t) {
    if (t === void 0 && (t = this.l), t <= 0) return 0;
    const { ft: n, min: o, l: r } = this;
    if (t > r) throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let i = t * o;
    for (; t > 0; ) i += n[t], t -= Ho(t);
    return i;
  }
  getBound(t) {
    let n = 0, o = this.l;
    for (; o > n; ) {
      const r = Math.floor((n + o) / 2), i = this.sum(r);
      if (i > t) {
        o = r;
        continue;
      } else if (i < t) {
        if (n === r) return this.sum(n + 1) <= t ? n + 1 : r;
        n = r;
      } else return r;
    }
    return n;
  }
}
function Uo(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const da = le({ name: "LazyTeleport", props: { to: { type: [String, Object], default: void 0 }, disabled: Boolean, show: { type: Boolean, required: true } }, setup(e) {
  return { showTeleport: Yl(oe(e, "show")), mergedTo: F(() => {
    const { to: t } = e;
    return t ?? "body";
  }) };
}, render() {
  return this.showTeleport ? this.disabled ? eo("lazy-teleport", this.$slots) : d(rl, { disabled: this.disabled, to: this.mergedTo }, eo("lazy-teleport", this.$slots)) : null;
} }), nn = { top: "bottom", bottom: "top", left: "right", right: "left" }, Vo = { start: "end", center: "center", end: "start" }, En = { top: "height", bottom: "height", left: "width", right: "width" }, ca = { "bottom-start": "top left", bottom: "top center", "bottom-end": "top right", "top-start": "bottom left", top: "bottom center", "top-end": "bottom right", "right-start": "top left", right: "center left", "right-end": "bottom left", "left-start": "top right", left: "center right", "left-end": "bottom right" }, ua = { "bottom-start": "bottom left", bottom: "bottom center", "bottom-end": "bottom right", "top-start": "top left", top: "top center", "top-end": "top right", "right-start": "top right", right: "center right", "right-end": "bottom right", "left-start": "top left", left: "center left", "left-end": "bottom left" }, fa = { "bottom-start": "right", "bottom-end": "left", "top-start": "right", "top-end": "left", "right-start": "bottom", "right-end": "top", "left-start": "bottom", "left-end": "top" }, Wo = { top: true, bottom: false, left: true, right: false }, Go = { top: "end", bottom: "start", left: "end", right: "start" };
function ha(e, t, n, o, r, i) {
  if (!r || i) return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", c = { top: 0, left: 0 };
  const f = (g, u, h) => {
    let v = 0, b = 0;
    const w = n[g] - t[u] - t[g];
    return w > 0 && o && (h ? b = Wo[u] ? w : -w : v = Wo[u] ? w : -w), { left: v, top: b };
  }, p = a === "left" || a === "right";
  if (s !== "center") {
    const g = fa[e], u = nn[g], h = En[g];
    if (n[h] > t[h]) {
      if (t[g] + t[h] < n[h]) {
        const v = (n[h] - t[h]) / 2;
        t[g] < v || t[u] < v ? t[g] < t[u] ? (s = Vo[l], c = f(h, u, p)) : c = f(h, g, p) : s = "center";
      }
    } else n[h] < t[h] && t[u] < 0 && t[g] > t[u] && (s = Vo[l]);
  } else {
    const g = a === "bottom" || a === "top" ? "left" : "top", u = nn[g], h = En[g], v = (n[h] - t[h]) / 2;
    (t[g] < v || t[u] < v) && (t[g] > t[u] ? (s = Go[g], c = f(h, g, p)) : (s = Go[u], c = f(h, u, p)));
  }
  let m = a;
  return t[a] < n[En[a]] && t[a] < t[nn[a]] && (m = nn[a]), { placement: s !== "center" ? `${m}-${s}` : m, left: c.left, top: c.top };
}
function va(e, t) {
  return t ? ua[e] : ca[e];
}
function pa(e, t, n, o, r, i) {
  if (i) switch (e) {
    case "bottom-start":
      return { top: `${Math.round(n.top - t.top + n.height)}px`, left: `${Math.round(n.left - t.left)}px`, transform: "translateY(-100%)" };
    case "bottom-end":
      return { top: `${Math.round(n.top - t.top + n.height)}px`, left: `${Math.round(n.left - t.left + n.width)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "top-start":
      return { top: `${Math.round(n.top - t.top)}px`, left: `${Math.round(n.left - t.left)}px`, transform: "" };
    case "top-end":
      return { top: `${Math.round(n.top - t.top)}px`, left: `${Math.round(n.left - t.left + n.width)}px`, transform: "translateX(-100%)" };
    case "right-start":
      return { top: `${Math.round(n.top - t.top)}px`, left: `${Math.round(n.left - t.left + n.width)}px`, transform: "translateX(-100%)" };
    case "right-end":
      return { top: `${Math.round(n.top - t.top + n.height)}px`, left: `${Math.round(n.left - t.left + n.width)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "left-start":
      return { top: `${Math.round(n.top - t.top)}px`, left: `${Math.round(n.left - t.left)}px`, transform: "" };
    case "left-end":
      return { top: `${Math.round(n.top - t.top + n.height)}px`, left: `${Math.round(n.left - t.left)}px`, transform: "translateY(-100%)" };
    case "top":
      return { top: `${Math.round(n.top - t.top)}px`, left: `${Math.round(n.left - t.left + n.width / 2)}px`, transform: "translateX(-50%)" };
    case "right":
      return { top: `${Math.round(n.top - t.top + n.height / 2)}px`, left: `${Math.round(n.left - t.left + n.width)}px`, transform: "translateX(-100%) translateY(-50%)" };
    case "left":
      return { top: `${Math.round(n.top - t.top + n.height / 2)}px`, left: `${Math.round(n.left - t.left)}px`, transform: "translateY(-50%)" };
    case "bottom":
    default:
      return { top: `${Math.round(n.top - t.top + n.height)}px`, left: `${Math.round(n.left - t.left + n.width / 2)}px`, transform: "translateX(-50%) translateY(-100%)" };
  }
  switch (e) {
    case "bottom-start":
      return { top: `${Math.round(n.top - t.top + n.height + o)}px`, left: `${Math.round(n.left - t.left + r)}px`, transform: "" };
    case "bottom-end":
      return { top: `${Math.round(n.top - t.top + n.height + o)}px`, left: `${Math.round(n.left - t.left + n.width + r)}px`, transform: "translateX(-100%)" };
    case "top-start":
      return { top: `${Math.round(n.top - t.top + o)}px`, left: `${Math.round(n.left - t.left + r)}px`, transform: "translateY(-100%)" };
    case "top-end":
      return { top: `${Math.round(n.top - t.top + o)}px`, left: `${Math.round(n.left - t.left + n.width + r)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "right-start":
      return { top: `${Math.round(n.top - t.top + o)}px`, left: `${Math.round(n.left - t.left + n.width + r)}px`, transform: "" };
    case "right-end":
      return { top: `${Math.round(n.top - t.top + n.height + o)}px`, left: `${Math.round(n.left - t.left + n.width + r)}px`, transform: "translateY(-100%)" };
    case "left-start":
      return { top: `${Math.round(n.top - t.top + o)}px`, left: `${Math.round(n.left - t.left + r)}px`, transform: "translateX(-100%)" };
    case "left-end":
      return { top: `${Math.round(n.top - t.top + n.height + o)}px`, left: `${Math.round(n.left - t.left + r)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "top":
      return { top: `${Math.round(n.top - t.top + o)}px`, left: `${Math.round(n.left - t.left + n.width / 2 + r)}px`, transform: "translateY(-100%) translateX(-50%)" };
    case "right":
      return { top: `${Math.round(n.top - t.top + n.height / 2 + o)}px`, left: `${Math.round(n.left - t.left + n.width + r)}px`, transform: "translateY(-50%)" };
    case "left":
      return { top: `${Math.round(n.top - t.top + n.height / 2 + o)}px`, left: `${Math.round(n.left - t.left + r)}px`, transform: "translateY(-50%) translateX(-100%)" };
    case "bottom":
    default:
      return { top: `${Math.round(n.top - t.top + n.height + o)}px`, left: `${Math.round(n.left - t.left + n.width / 2 + r)}px`, transform: "translateX(-50%)" };
  }
}
const ga = Pt([Pt(".v-binder-follower-container", { position: "absolute", left: "0", right: "0", top: "0", height: "0", pointerEvents: "none", zIndex: "auto" }), Pt(".v-binder-follower-content", { position: "absolute", zIndex: "auto" }, [Pt("> *", { pointerEvents: "all" })])]), Ro = le({ name: "Follower", inheritAttrs: false, props: { show: Boolean, enabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom" }, syncTrigger: { type: Array, default: ["resize", "scroll"] }, to: [String, Object], flip: { type: Boolean, default: true }, internalShift: Boolean, x: Number, y: Number, width: String, minWidth: String, containerClass: String, teleportDisabled: Boolean, zindexable: { type: Boolean, default: true }, zIndex: Number, overlap: Boolean }, setup(e) {
  const t = xe("VBinder"), n = Pe(() => e.enabled !== void 0 ? e.enabled : e.show), o = D(null), r = D(null), i = () => {
    const { syncTrigger: m } = e;
    m.includes("scroll") && t.addScrollListener(s), m.includes("resize") && t.addResizeListener(s);
  }, a = () => {
    t.removeScrollListener(s), t.removeResizeListener(s);
  };
  Ct(() => {
    n.value && (s(), i());
  });
  const l = uo();
  ga.mount({ id: "vueuc/binder", head: true, anchorMetaName: ko, ssr: l }), bt(() => {
    a();
  }), ta(() => {
    n.value && s();
  });
  const s = () => {
    if (!n.value) return;
    const m = o.value;
    if (m === null) return;
    const g = t.targetRef, { x: u, y: h, overlap: v } = e, b = u !== void 0 && h !== void 0 ? ra(u, h) : Bn(g);
    m.style.setProperty("--v-target-width", `${Math.round(b.width)}px`), m.style.setProperty("--v-target-height", `${Math.round(b.height)}px`);
    const { width: w, minWidth: $, placement: x, internalShift: C, flip: M } = e;
    m.setAttribute("v-placement", x), v ? m.setAttribute("v-overlap", "") : m.removeAttribute("v-overlap");
    const { style: T } = m;
    w === "target" ? T.width = `${b.width}px` : w !== void 0 ? T.width = w : T.width = "", $ === "target" ? T.minWidth = `${b.width}px` : $ !== void 0 ? T.minWidth = $ : T.minWidth = "";
    const V = Bn(m), N = Bn(r.value), { left: H, top: q, placement: I } = ha(x, b, V, C, M, v), y = va(I, v), { left: k, top: R, transform: _ } = pa(I, N, b, q, H, v);
    m.setAttribute("v-placement", I), m.style.setProperty("--v-offset-left", `${Math.round(H)}px`), m.style.setProperty("--v-offset-top", `${Math.round(q)}px`), m.style.transform = `translateX(${k}) translateY(${R}) ${_}`, m.style.setProperty("--v-transform-origin", y), m.style.transformOrigin = y;
  };
  Ae(n, (m) => {
    m ? (i(), c()) : a();
  });
  const c = () => {
    Mt().then(s).catch((m) => console.error(m));
  };
  ["placement", "x", "y", "internalShift", "flip", "width", "overlap", "minWidth"].forEach((m) => {
    Ae(oe(e, m), s);
  }), ["teleportDisabled"].forEach((m) => {
    Ae(oe(e, m), c);
  }), Ae(oe(e, "syncTrigger"), (m) => {
    m.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), m.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
  });
  const f = fo(), p = Pe(() => {
    const { to: m } = e;
    if (m !== void 0) return m;
    f.value;
  });
  return { VBinder: t, mergedEnabled: n, offsetContainerRef: r, followerRef: o, mergedTo: p, syncPosition: s };
}, render() {
  return d(da, { show: this.show, to: this.mergedTo, disabled: this.teleportDisabled }, { default: () => {
    var e, t;
    const n = d("div", { class: ["v-binder-follower-container", this.containerClass], ref: "offsetContainerRef" }, [d("div", { class: "v-binder-follower-content", ref: "followerRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))]);
    return this.zindexable ? Jt(n, [[Qr, { enabled: this.mergedEnabled, zIndex: this.zIndex }]]) : n;
  } });
} });
let on;
function ba() {
  return typeof document > "u" ? false : (on === void 0 && ("matchMedia" in window ? on = window.matchMedia("(pointer:coarse)").matches : on = false), on);
}
let Ln;
function qo() {
  return typeof document > "u" ? 1 : (Ln === void 0 && (Ln = "chrome" in window ? window.devicePixelRatio : 1), Ln);
}
const ti = "VVirtualListXScroll";
function ma({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = D(0), r = D(0), i = F(() => {
    const c = e.value;
    if (c.length === 0) return null;
    const f = new ei(c.length, 0);
    return c.forEach((p, m) => {
      f.add(m, p.width);
    }), f;
  }), a = Pe(() => {
    const c = i.value;
    return c !== null ? Math.max(c.getBound(r.value) - 1, 0) : 0;
  }), l = (c) => {
    const f = i.value;
    return f !== null ? f.sum(c) : 0;
  }, s = Pe(() => {
    const c = i.value;
    return c !== null ? Math.min(c.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return Ee(ti, { startIndexRef: a, endIndexRef: s, columnsRef: e, renderColRef: t, renderItemWithColsRef: n, getLeft: l }), { listWidthRef: o, scrollLeftRef: r };
}
const Xo = le({ name: "VirtualListRow", props: { index: { type: Number, required: true }, item: { type: Object, required: true } }, setup() {
  const { startIndexRef: e, endIndexRef: t, columnsRef: n, getLeft: o, renderColRef: r, renderItemWithColsRef: i } = xe(ti);
  return { startIndex: e, endIndex: t, columns: n, renderCol: r, renderItemWithCols: i, getLeft: o };
}, render() {
  const { startIndex: e, endIndex: t, columns: n, renderCol: o, renderItemWithCols: r, getLeft: i, item: a } = this;
  if (r != null) return r({ itemIndex: this.index, startColIndex: e, endColIndex: t, allColumns: n, item: a, getLeft: i });
  if (o != null) {
    const l = [];
    for (let s = e; s <= t; ++s) {
      const c = n[s];
      l.push(o({ column: c, left: i(s), item: a }));
    }
    return l;
  }
  return null;
} }), ya = Pt(".v-vl", { maxHeight: "inherit", height: "100%", overflow: "auto", minWidth: "1px" }, [Pt("&:not(.v-vl--show-scrollbar)", { scrollbarWidth: "none" }, [Pt("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", { width: 0, height: 0, display: "none" })])]), Po = le({ name: "VirtualList", inheritAttrs: false, props: { showScrollbar: { type: Boolean, default: true }, columns: { type: Array, default: () => [] }, renderCol: Function, renderItemWithCols: Function, items: { type: Array, default: () => [] }, itemSize: { type: Number, required: true }, itemResizable: Boolean, itemsStyle: [String, Object], visibleItemsTag: { type: [String, Object], default: "div" }, visibleItemsProps: Object, ignoreItemResize: Boolean, onScroll: Function, onWheel: Function, onResize: Function, defaultScrollKey: [Number, String], defaultScrollIndex: Number, keyField: { type: String, default: "key" }, paddingTop: { type: [Number, String], default: 0 }, paddingBottom: { type: [Number, String], default: 0 } }, setup(e) {
  const t = uo();
  ya.mount({ id: "vueuc/virtual-list", head: true, anchorMetaName: ko, ssr: t }), Ct(() => {
    const { defaultScrollIndex: y, defaultScrollKey: k } = e;
    y != null ? v({ index: y }) : k != null && v({ key: k });
  });
  let n = false, o = false;
  il(() => {
    if (n = false, !o) {
      o = true;
      return;
    }
    v({ top: g.value, left: a.value });
  }), Br(() => {
    n = true, o || (o = true);
  });
  const r = Pe(() => {
    if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0) return;
    let y = 0;
    return e.columns.forEach((k) => {
      y += k.width;
    }), y;
  }), i = F(() => {
    const y = /* @__PURE__ */ new Map(), { keyField: k } = e;
    return e.items.forEach((R, _) => {
      y.set(R[k], _);
    }), y;
  }), { scrollLeftRef: a, listWidthRef: l } = ma({ columnsRef: oe(e, "columns"), renderColRef: oe(e, "renderCol"), renderItemWithColsRef: oe(e, "renderItemWithCols") }), s = D(null), c = D(void 0), f = /* @__PURE__ */ new Map(), p = F(() => {
    const { items: y, itemSize: k, keyField: R } = e, _ = new ei(y.length, k);
    return y.forEach((z, L) => {
      const W = z[R], Z = f.get(W);
      Z !== void 0 && _.add(L, Z);
    }), _;
  }), m = D(0), g = D(0), u = Pe(() => Math.max(p.value.getBound(g.value - Kt(e.paddingTop)) - 1, 0)), h = F(() => {
    const { value: y } = c;
    if (y === void 0) return [];
    const { items: k, itemSize: R } = e, _ = u.value, z = Math.min(_ + Math.ceil(y / R + 1), k.length - 1), L = [];
    for (let W = _; W <= z; ++W) L.push(k[W]);
    return L;
  }), v = (y, k) => {
    if (typeof y == "number") {
      x(y, k, "auto");
      return;
    }
    const { left: R, top: _, index: z, key: L, position: W, behavior: Z, debounce: B = true } = y;
    if (R !== void 0 || _ !== void 0) x(R, _, Z);
    else if (z !== void 0) $(z, Z, B);
    else if (L !== void 0) {
      const j = i.value.get(L);
      j !== void 0 && $(j, Z, B);
    } else W === "bottom" ? x(0, Number.MAX_SAFE_INTEGER, Z) : W === "top" && x(0, 0, Z);
  };
  let b, w = null;
  function $(y, k, R) {
    const { value: _ } = p, z = _.sum(y) + Kt(e.paddingTop);
    if (!R) s.value.scrollTo({ left: 0, top: z, behavior: k });
    else {
      b = y, w !== null && window.clearTimeout(w), w = window.setTimeout(() => {
        b = void 0, w = null;
      }, 16);
      const { scrollTop: L, offsetHeight: W } = s.value;
      if (z > L) {
        const Z = _.get(y);
        z + Z <= L + W || s.value.scrollTo({ left: 0, top: z + Z - W, behavior: k });
      } else s.value.scrollTo({ left: 0, top: z, behavior: k });
    }
  }
  function x(y, k, R) {
    s.value.scrollTo({ left: y, top: k, behavior: R });
  }
  function C(y, k) {
    var R, _, z;
    if (n || e.ignoreItemResize || I(k.target)) return;
    const { value: L } = p, W = i.value.get(y), Z = L.get(W), B = (z = (_ = (R = k.borderBoxSize) === null || R === void 0 ? void 0 : R[0]) === null || _ === void 0 ? void 0 : _.blockSize) !== null && z !== void 0 ? z : k.contentRect.height;
    if (B === Z) return;
    B - e.itemSize === 0 ? f.delete(y) : f.set(y, B - e.itemSize);
    const ee = B - Z;
    if (ee === 0) return;
    L.add(W, ee);
    const P = s.value;
    if (P != null) {
      if (b === void 0) {
        const E = L.sum(W);
        P.scrollTop > E && P.scrollBy(0, ee);
      } else if (W < b) P.scrollBy(0, ee);
      else if (W === b) {
        const E = L.sum(W);
        B + E > P.scrollTop + P.offsetHeight && P.scrollBy(0, ee);
      }
      q();
    }
    m.value++;
  }
  const M = !ba();
  let T = false;
  function V(y) {
    var k;
    (k = e.onScroll) === null || k === void 0 || k.call(e, y), (!M || !T) && q();
  }
  function N(y) {
    var k;
    if ((k = e.onWheel) === null || k === void 0 || k.call(e, y), M) {
      const R = s.value;
      if (R != null) {
        if (y.deltaX === 0 && (R.scrollTop === 0 && y.deltaY <= 0 || R.scrollTop + R.offsetHeight >= R.scrollHeight && y.deltaY >= 0)) return;
        y.preventDefault(), R.scrollTop += y.deltaY / qo(), R.scrollLeft += y.deltaX / qo(), q(), T = true, cn(() => {
          T = false;
        });
      }
    }
  }
  function H(y) {
    if (n || I(y.target)) return;
    if (e.renderCol == null && e.renderItemWithCols == null) {
      if (y.contentRect.height === c.value) return;
    } else if (y.contentRect.height === c.value && y.contentRect.width === l.value) return;
    c.value = y.contentRect.height, l.value = y.contentRect.width;
    const { onResize: k } = e;
    k !== void 0 && k(y);
  }
  function q() {
    const { value: y } = s;
    y != null && (g.value = y.scrollTop, a.value = y.scrollLeft);
  }
  function I(y) {
    let k = y;
    for (; k !== null; ) {
      if (k.style.display === "none") return true;
      k = k.parentElement;
    }
    return false;
  }
  return { listHeight: c, listStyle: { overflow: "auto" }, keyToIndex: i, itemsStyle: F(() => {
    const { itemResizable: y } = e, k = He(p.value.sum());
    return m.value, [e.itemsStyle, { boxSizing: "content-box", width: He(r.value), height: y ? "" : k, minHeight: y ? k : "", paddingTop: He(e.paddingTop), paddingBottom: He(e.paddingBottom) }];
  }), visibleItemsStyle: F(() => (m.value, { transform: `translateY(${He(p.value.sum(u.value))})` })), viewportItems: h, listElRef: s, itemsElRef: D(null), scrollTo: v, handleListResize: H, handleListScroll: V, handleListWheel: N, handleItemResize: C };
}, render() {
  const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
  return d(Yn, { onResize: this.handleListResize }, { default: () => {
    var r, i;
    return d("div", Ft(this.$attrs, { class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"], onScroll: this.handleListScroll, onWheel: this.handleListWheel, ref: "listElRef" }), [this.items.length !== 0 ? d("div", { ref: "itemsElRef", class: "v-vl-items", style: this.itemsStyle }, [d(o, Object.assign({ class: "v-vl-visible-items", style: this.visibleItemsStyle }, this.visibleItemsProps), { default: () => {
      const { renderCol: a, renderItemWithCols: l } = this;
      return this.viewportItems.map((s) => {
        const c = s[t], f = n.get(c), p = a != null ? d(Xo, { index: f, item: s }) : void 0, m = l != null ? d(Xo, { index: f, item: s }) : void 0, g = this.$slots.default({ item: s, renderedCols: p, renderedItemWithCols: m, index: f })[0];
        return e ? d(Yn, { key: c, onResize: (u) => this.handleItemResize(c, u) }, { default: () => g }) : (g.key = c, g);
      });
    } })]) : (i = (r = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(r)]);
  } });
} }), yt = "v-hidden", wa = Pt("[v-hidden]", { display: "none!important" }), Zo = le({ name: "Overflow", props: { getCounter: Function, getTail: Function, updateCounter: Function, onUpdateCount: Function, onUpdateOverflow: Function }, setup(e, { slots: t }) {
  const n = D(null), o = D(null);
  function r(a) {
    const { value: l } = n, { getCounter: s, getTail: c } = e;
    let f;
    if (s !== void 0 ? f = s() : f = o.value, !l || !f) return;
    f.hasAttribute(yt) && f.removeAttribute(yt);
    const { children: p } = l;
    if (a.showAllItemsBeforeCalculate) for (const $ of p) $.hasAttribute(yt) && $.removeAttribute(yt);
    const m = l.offsetWidth, g = [], u = t.tail ? c == null ? void 0 : c() : null;
    let h = u ? u.offsetWidth : 0, v = false;
    const b = l.children.length - (t.tail ? 1 : 0);
    for (let $ = 0; $ < b - 1; ++$) {
      if ($ < 0) continue;
      const x = p[$];
      if (v) {
        x.hasAttribute(yt) || x.setAttribute(yt, "");
        continue;
      } else x.hasAttribute(yt) && x.removeAttribute(yt);
      const C = x.offsetWidth;
      if (h += C, g[$] = C, h > m) {
        const { updateCounter: M } = e;
        for (let T = $; T >= 0; --T) {
          const V = b - 1 - T;
          M !== void 0 ? M(V) : f.textContent = `${V}`;
          const N = f.offsetWidth;
          if (h -= g[T], h + N <= m || T === 0) {
            v = true, $ = T - 1, u && ($ === -1 ? (u.style.maxWidth = `${m - N}px`, u.style.boxSizing = "border-box") : u.style.maxWidth = "");
            const { onUpdateCount: H } = e;
            H && H(V);
            break;
          }
        }
      }
    }
    const { onUpdateOverflow: w } = e;
    v ? w !== void 0 && w(true) : (w !== void 0 && w(false), f.setAttribute(yt, ""));
  }
  const i = uo();
  return wa.mount({ id: "vueuc/overflow", head: true, anchorMetaName: ko, ssr: i }), Ct(() => r({ showAllItemsBeforeCalculate: false })), { selfRef: n, counterRef: o, sync: r };
}, render() {
  const { $slots: e } = this;
  return Mt(() => this.sync({ showAllItemsBeforeCalculate: false })), d("div", { class: "v-overflow", ref: "selfRef" }, [ll(e, "default"), e.counter ? e.counter() : d("span", { style: { display: "inline-block" }, ref: "counterRef" }), e.tail ? e.tail() : null]);
} });
function ni(e) {
  return e instanceof HTMLElement;
}
function oi(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (ni(n) && (ii(n) || oi(n))) return true;
  }
  return false;
}
function ri(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (ni(n) && (ii(n) || ri(n))) return true;
  }
  return false;
}
function ii(e) {
  if (!xa(e)) return false;
  try {
    e.focus({ preventScroll: true });
  } catch {
  }
  return document.activeElement === e;
}
function xa(e) {
  if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null) return true;
  if (e.getAttribute("disabled")) return false;
  switch (e.nodeName) {
    case "A":
      return !!e.href && e.rel !== "ignore";
    case "INPUT":
      return e.type !== "hidden" && e.type !== "file";
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
}
let qt = [];
const Ca = le({ name: "FocusTrap", props: { disabled: Boolean, active: Boolean, autoFocus: { type: Boolean, default: true }, onEsc: Function, initialFocusTo: [String, Function], finalFocusTo: [String, Function], returnFocusOnDeactivated: { type: Boolean, default: true } }, setup(e) {
  const t = ho(), n = D(null), o = D(null);
  let r = false, i = false;
  const a = typeof document > "u" ? null : document.activeElement;
  function l() {
    return qt[qt.length - 1] === t;
  }
  function s(v) {
    var b;
    v.code === "Escape" && l() && ((b = e.onEsc) === null || b === void 0 || b.call(e, v));
  }
  Ct(() => {
    Ae(() => e.active, (v) => {
      v ? (p(), Ue("keydown", document, s)) : (Ie("keydown", document, s), r && m());
    }, { immediate: true });
  }), bt(() => {
    Ie("keydown", document, s), r && m();
  });
  function c(v) {
    if (!i && l()) {
      const b = f();
      if (b === null || b.contains(sn(v))) return;
      g("first");
    }
  }
  function f() {
    const v = n.value;
    if (v === null) return null;
    let b = v;
    for (; b = b.nextSibling, !(b === null || b instanceof Element && b.tagName === "DIV"); ) ;
    return b;
  }
  function p() {
    var v;
    if (!e.disabled) {
      if (qt.push(t), e.autoFocus) {
        const { initialFocusTo: b } = e;
        b === void 0 ? g("first") : (v = Uo(b)) === null || v === void 0 || v.focus({ preventScroll: true });
      }
      r = true, document.addEventListener("focus", c, true);
    }
  }
  function m() {
    var v;
    if (e.disabled || (document.removeEventListener("focus", c, true), qt = qt.filter((w) => w !== t), l())) return;
    const { finalFocusTo: b } = e;
    b !== void 0 ? (v = Uo(b)) === null || v === void 0 || v.focus({ preventScroll: true }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = true, a.focus({ preventScroll: true }), i = false);
  }
  function g(v) {
    if (l() && e.active) {
      const b = n.value, w = o.value;
      if (b !== null && w !== null) {
        const $ = f();
        if ($ == null || $ === w) {
          i = true, b.focus({ preventScroll: true }), i = false;
          return;
        }
        i = true;
        const x = v === "first" ? oi($) : ri($);
        i = false, x || (i = true, b.focus({ preventScroll: true }), i = false);
      }
    }
  }
  function u(v) {
    if (i) return;
    const b = f();
    b !== null && (v.relatedTarget !== null && b.contains(v.relatedTarget) ? g("last") : g("first"));
  }
  function h(v) {
    i || (v.relatedTarget !== null && v.relatedTarget === n.value ? g("last") : g("first"));
  }
  return { focusableStartRef: n, focusableEndRef: o, focusableStyle: "position: absolute; height: 0; width: 0;", handleStartFocus: u, handleEndFocus: h };
}, render() {
  const { default: e } = this.$slots;
  if (e === void 0) return null;
  if (this.disabled) return e();
  const { active: t, focusableStyle: n } = this;
  return d(dt, null, [d("div", { "aria-hidden": "true", tabindex: t ? "0" : "-1", ref: "focusableStartRef", style: n, onFocus: this.handleStartFocus }), e(), d("div", { "aria-hidden": "true", style: n, ref: "focusableEndRef", tabindex: t ? "0" : "-1", onFocus: this.handleEndFocus })]);
} });
function li(e, t) {
  t && (Ct(() => {
    const { value: n } = e;
    n && _n.registerHandler(n, t);
  }), Ae(e, (n, o) => {
    o && _n.unregisterHandler(o);
  }, { deep: false }), bt(() => {
    const { value: n } = e;
    n && _n.unregisterHandler(n);
  }));
}
function Sa(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let Nn;
function ka() {
  return Nn === void 0 && (Nn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Nn;
}
const ai = /* @__PURE__ */ new WeakSet();
function Ra(e) {
  ai.add(e);
}
function bu(e) {
  return !ai.has(e);
}
function Yo(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Pa = { tiny: "mini", small: "tiny", medium: "small", large: "medium", huge: "large" };
function Jo(e) {
  const t = Pa[e];
  if (t === void 0) throw new Error(`${e} has no smaller size.`);
  return t;
}
function si(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
function Yt(e, t = true, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Ir(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        Yt(o, t, n);
        return;
      }
      if (o.type === dt) {
        if (o.children === null) return;
        Array.isArray(o.children) && Yt(o.children, t, n);
      } else {
        if (o.type === _r && t) return;
        n.push(o);
      }
    }
  }), n;
}
function za(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o) return It("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = Yt(o(n));
  return r.length === 1 ? r[0] : (It("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function mu(e, t, n) {
  if (!t) return null;
  const o = Yt(t(n));
  return o.length === 1 ? o[0] : (It("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
}
function Fa(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
function Zt(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0) return t.length === 1 ? t[0] : (n) => {
    e.forEach((o) => {
      o && o(n);
    });
  };
}
var no = pn(gn, "WeakMap"), $a = al(Object.keys, Object), Oa = Object.prototype, Ta = Oa.hasOwnProperty;
function Ma(e) {
  if (!sl(e)) return $a(e);
  var t = [];
  for (var n in Object(e)) Ta.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function zo(e) {
  return vo(e) ? dl(e) : Ma(e);
}
function Ia(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; ) e[r + n] = t[n];
  return e;
}
function _a(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var a = e[n];
    t(a, n, e) && (i[r++] = a);
  }
  return i;
}
function Ba() {
  return [];
}
var Aa = Object.prototype, Ea = Aa.propertyIsEnumerable, Qo = Object.getOwnPropertySymbols, La = Qo ? function(e) {
  return e == null ? [] : (e = Object(e), _a(Qo(e), function(t) {
    return Ea.call(e, t);
  }));
} : Ba;
function Na(e, t, n) {
  var o = t(e);
  return Ut(e) ? o : Ia(o, n(e));
}
function er(e) {
  return Na(e, zo, La);
}
var oo = pn(gn, "DataView"), ro = pn(gn, "Promise"), io = pn(gn, "Set"), tr = "[object Map]", Da = "[object Object]", nr = "[object Promise]", or = "[object Set]", rr = "[object WeakMap]", ir = "[object DataView]", Ka = Wt(oo), ja = Wt(Jn), Ha = Wt(ro), Ua = Wt(io), Va = Wt(no), Rt = Ar;
(oo && Rt(new oo(new ArrayBuffer(1))) != ir || Jn && Rt(new Jn()) != tr || ro && Rt(ro.resolve()) != nr || io && Rt(new io()) != or || no && Rt(new no()) != rr) && (Rt = function(e) {
  var t = Ar(e), n = t == Da ? e.constructor : void 0, o = n ? Wt(n) : "";
  if (o) switch (o) {
    case Ka:
      return ir;
    case ja:
      return tr;
    case Ha:
      return nr;
    case Ua:
      return or;
    case Va:
      return rr;
  }
  return t;
});
var Wa = "__lodash_hash_undefined__";
function Ga(e) {
  return this.__data__.set(e, Wa), this;
}
function qa(e) {
  return this.__data__.has(e);
}
function fn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new cl(); ++t < n; ) this.add(e[t]);
}
fn.prototype.add = fn.prototype.push = Ga;
fn.prototype.has = qa;
function Xa(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; ) if (t(e[n], n, e)) return true;
  return false;
}
function Za(e, t) {
  return e.has(t);
}
var Ya = 1, Ja = 2;
function di(e, t, n, o, r, i) {
  var a = n & Ya, l = e.length, s = t.length;
  if (l != s && !(a && s > l)) return false;
  var c = i.get(e), f = i.get(t);
  if (c && f) return c == t && f == e;
  var p = -1, m = true, g = n & Ja ? new fn() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < l; ) {
    var u = e[p], h = t[p];
    if (o) var v = a ? o(h, u, p, t, e, i) : o(u, h, p, e, t, i);
    if (v !== void 0) {
      if (v) continue;
      m = false;
      break;
    }
    if (g) {
      if (!Xa(t, function(b, w) {
        if (!Za(g, w) && (u === b || r(u, b, n, o, i))) return g.push(w);
      })) {
        m = false;
        break;
      }
    } else if (!(u === h || r(u, h, n, o, i))) {
      m = false;
      break;
    }
  }
  return i.delete(e), i.delete(t), m;
}
function Qa(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function es(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var ts = 1, ns = 2, os = "[object Boolean]", rs = "[object Date]", is = "[object Error]", ls = "[object Map]", as = "[object Number]", ss = "[object RegExp]", ds = "[object Set]", cs = "[object String]", us = "[object Symbol]", fs = "[object ArrayBuffer]", hs = "[object DataView]", lr = _o ? _o.prototype : void 0, Dn = lr ? lr.valueOf : void 0;
function vs(e, t, n, o, r, i, a) {
  switch (n) {
    case hs:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return false;
      e = e.buffer, t = t.buffer;
    case fs:
      return !(e.byteLength != t.byteLength || !i(new Bo(e), new Bo(t)));
    case os:
    case rs:
    case as:
      return ul(+e, +t);
    case is:
      return e.name == t.name && e.message == t.message;
    case ss:
    case cs:
      return e == t + "";
    case ls:
      var l = Qa;
    case ds:
      var s = o & ts;
      if (l || (l = es), e.size != t.size && !s) return false;
      var c = a.get(e);
      if (c) return c == t;
      o |= ns, a.set(e, t);
      var f = di(l(e), l(t), o, r, i, a);
      return a.delete(e), f;
    case us:
      if (Dn) return Dn.call(e) == Dn.call(t);
  }
  return false;
}
var ps = 1, gs = Object.prototype, bs = gs.hasOwnProperty;
function ms(e, t, n, o, r, i) {
  var a = n & ps, l = er(e), s = l.length, c = er(t), f = c.length;
  if (s != f && !a) return false;
  for (var p = s; p--; ) {
    var m = l[p];
    if (!(a ? m in t : bs.call(t, m))) return false;
  }
  var g = i.get(e), u = i.get(t);
  if (g && u) return g == t && u == e;
  var h = true;
  i.set(e, t), i.set(t, e);
  for (var v = a; ++p < s; ) {
    m = l[p];
    var b = e[m], w = t[m];
    if (o) var $ = a ? o(w, b, m, t, e, i) : o(b, w, m, e, t, i);
    if (!($ === void 0 ? b === w || r(b, w, n, o, i) : $)) {
      h = false;
      break;
    }
    v || (v = m == "constructor");
  }
  if (h && !v) {
    var x = e.constructor, C = t.constructor;
    x != C && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof C == "function" && C instanceof C) && (h = false);
  }
  return i.delete(e), i.delete(t), h;
}
var ys = 1, ar = "[object Arguments]", sr = "[object Array]", rn = "[object Object]", ws = Object.prototype, dr = ws.hasOwnProperty;
function xs(e, t, n, o, r, i) {
  var a = Ut(e), l = Ut(t), s = a ? sr : Rt(e), c = l ? sr : Rt(t);
  s = s == ar ? rn : s, c = c == ar ? rn : c;
  var f = s == rn, p = c == rn, m = s == c;
  if (m && Ao(e)) {
    if (!Ao(t)) return false;
    a = true, f = false;
  }
  if (m && !f) return i || (i = new an()), a || fl(e) ? di(e, t, n, o, r, i) : vs(e, t, s, n, o, r, i);
  if (!(n & ys)) {
    var g = f && dr.call(e, "__wrapped__"), u = p && dr.call(t, "__wrapped__");
    if (g || u) {
      var h = g ? e.value() : e, v = u ? t.value() : t;
      return i || (i = new an()), r(h, v, n, o, i);
    }
  }
  return m ? (i || (i = new an()), ms(e, t, n, o, r, i)) : false;
}
function Fo(e, t, n, o, r) {
  return e === t ? true : e == null || t == null || !Eo(e) && !Eo(t) ? e !== e && t !== t : xs(e, t, n, o, Fo, r);
}
var Cs = 1, Ss = 2;
function ks(e, t, n, o) {
  var r = n.length, i = r;
  if (e == null) return !i;
  for (e = Object(e); r--; ) {
    var a = n[r];
    if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return false;
  }
  for (; ++r < i; ) {
    a = n[r];
    var l = a[0], s = e[l], c = a[1];
    if (a[2]) {
      if (s === void 0 && !(l in e)) return false;
    } else {
      var f = new an(), p;
      if (!(p === void 0 ? Fo(c, s, Cs | Ss, o, f) : p)) return false;
    }
  }
  return true;
}
function ci(e) {
  return e === e && !hl(e);
}
function Rs(e) {
  for (var t = zo(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, ci(r)];
  }
  return t;
}
function ui(e, t) {
  return function(n) {
    return n == null ? false : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Ps(e) {
  var t = Rs(e);
  return t.length == 1 && t[0][2] ? ui(t[0][0], t[0][1]) : function(n) {
    return n === e || ks(n, e, t);
  };
}
function zs(e, t) {
  return e != null && t in Object(e);
}
function Fs(e, t, n) {
  t = Wl(t, e);
  for (var o = -1, r = t.length, i = false; ++o < r; ) {
    var a = mo(t[o]);
    if (!(i = e != null && n(e, a))) break;
    e = e[a];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && vl(r) && pl(a, r) && (Ut(e) || gl(e)));
}
function $s(e, t) {
  return e != null && Fs(e, t, zs);
}
var Os = 1, Ts = 2;
function Ms(e, t) {
  return Wr(e) && ci(t) ? ui(mo(e), t) : function(n) {
    var o = Qn(n, e);
    return o === void 0 && o === t ? $s(n, e) : Fo(t, o, Os | Ts);
  };
}
function Is(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function _s(e) {
  return function(t) {
    return Gl(t, e);
  };
}
function Bs(e) {
  return Wr(e) ? Is(mo(e)) : _s(e);
}
function As(e) {
  return typeof e == "function" ? e : e == null ? bl : typeof e == "object" ? Ut(e) ? Ms(e[0], e[1]) : Ps(e) : Bs(e);
}
function Es(e, t) {
  return e && ml(e, t, zo);
}
function Ls(e, t) {
  return function(n, o) {
    if (n == null) return n;
    if (!vo(n)) return e(n, o);
    for (var r = n.length, i = -1, a = Object(n); ++i < r && o(a[i], i, a) !== false; ) ;
    return n;
  };
}
var Ns = Ls(Es);
function Ds(e, t) {
  var n = -1, o = vo(e) ? Array(e.length) : [];
  return Ns(e, function(r, i, a) {
    o[++n] = t(r, i, a);
  }), o;
}
function Ks(e, t) {
  var n = Ut(e) ? yl : Ds;
  return n(e, As(t));
}
const js = le({ name: "ArrowDown", render() {
  return d("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, d("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, d("g", { "fill-rule": "nonzero" }, d("path", { d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z" }))));
} }), cr = le({ name: "Backward", render() {
  return d("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, d("path", { d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z", fill: "currentColor" }));
} }), Hs = le({ name: "Checkmark", render() {
  return d("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, d("g", { fill: "none" }, d("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })));
} }), fi = le({ name: "ChevronRight", render() {
  return d("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, d("path", { d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z", fill: "currentColor" }));
} }), Us = le({ name: "Empty", render() {
  return d("svg", { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, d("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }), d("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" }));
} }), ur = le({ name: "FastBackward", render() {
  return d("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, d("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, d("g", { fill: "currentColor", "fill-rule": "nonzero" }, d("path", { d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z" }))));
} }), fr = le({ name: "FastForward", render() {
  return d("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, d("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, d("g", { fill: "currentColor", "fill-rule": "nonzero" }, d("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" }))));
} }), Vs = le({ name: "Filter", render() {
  return d("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, d("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, d("g", { "fill-rule": "nonzero" }, d("path", { d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z" }))));
} }), hr = le({ name: "Forward", render() {
  return d("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, d("path", { d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z", fill: "currentColor" }));
} }), vr = le({ name: "More", render() {
  return d("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, d("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, d("g", { fill: "currentColor", "fill-rule": "nonzero" }, d("path", { d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z" }))));
} }), Ws = le({ props: { onFocus: Function, onBlur: Function }, setup(e) {
  return () => d("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
} });
function pr(e) {
  return Array.isArray(e) ? e : [e];
}
const lo = { STOP: "STOP" };
function hi(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== lo.STOP && e.children.forEach((o) => hi(o, t));
}
function Gs(e, t = {}) {
  const { preserveGroup: n = false } = t, o = [], r = n ? (a) => {
    a.isLeaf || (o.push(a.key), i(a.children));
  } : (a) => {
    a.isLeaf || (a.isGroup || o.push(a.key), i(a.children));
  };
  function i(a) {
    a.forEach(r);
  }
  return i(e), o;
}
function qs(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function Xs(e) {
  return e.children;
}
function Zs(e) {
  return e.key;
}
function Ys() {
  return false;
}
function Js(e, t) {
  const { isLeaf: n } = e;
  return !(n === false && !Array.isArray(t(e)));
}
function Qs(e) {
  return e.disabled === true;
}
function ed(e, t) {
  return e.isLeaf === false && !Array.isArray(t(e));
}
function Kn(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function jn(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function td(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function nd(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function od(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function rd(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class id extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function ld(e, t, n, o) {
  return hn(t.concat(e), n, o, false);
}
function ad(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    const r = t.treeNodeMap.get(o);
    if (r !== void 0) {
      let i = r.parent;
      for (; i !== null && !(i.disabled || n.has(i.key)); ) n.add(i.key), i = i.parent;
    }
  }), n;
}
function sd(e, t, n, o) {
  const r = hn(t, n, o, false), i = hn(e, n, o, true), a = ad(e, n), l = [];
  return r.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => r.delete(s)), r;
}
function Hn(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: c } = e;
  if (!a) return o !== void 0 ? { checkedKeys: td(n, o), indeterminateKeys: Array.from(i) } : r !== void 0 ? { checkedKeys: nd(n, r), indeterminateKeys: Array.from(i) } : { checkedKeys: Array.from(n), indeterminateKeys: Array.from(i) };
  const { levelTreeNodeMap: f } = t;
  let p;
  r !== void 0 ? p = sd(r, n, t, c) : o !== void 0 ? p = ld(o, n, t, c) : p = hn(n, t, c, false);
  const m = s === "parent", g = s === "child" || l, u = p, h = /* @__PURE__ */ new Set(), v = Math.max.apply(null, Array.from(f.keys()));
  for (let b = v; b >= 0; b -= 1) {
    const w = b === 0, $ = f.get(b);
    for (const x of $) {
      if (x.isLeaf) continue;
      const { key: C, shallowLoaded: M } = x;
      if (g && M && x.children.forEach((H) => {
        !H.disabled && !H.isLeaf && H.shallowLoaded && u.has(H.key) && u.delete(H.key);
      }), x.disabled || !M) continue;
      let T = true, V = false, N = true;
      for (const H of x.children) {
        const q = H.key;
        if (!H.disabled) {
          if (N && (N = false), u.has(q)) V = true;
          else if (h.has(q)) {
            V = true, T = false;
            break;
          } else if (T = false, V) break;
        }
      }
      T && !N ? (m && x.children.forEach((H) => {
        !H.disabled && u.has(H.key) && u.delete(H.key);
      }), u.add(C)) : V && h.add(C), w && g && u.has(C) && u.delete(C);
    }
  }
  return { checkedKeys: Array.from(u), indeterminateKeys: Array.from(h) };
}
function hn(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const c = r.get(s);
    c !== void 0 && hi(c, (f) => {
      if (f.disabled) return lo.STOP;
      const { key: p } = f;
      if (!a.has(p) && (a.add(p), l.add(p), ed(f.rawNode, i))) {
        if (o) return lo.STOP;
        if (!n) throw new id();
      }
    });
  }), l;
}
function dd(e, { includeGroup: t = false, includeSelf: n = true }, o) {
  var r;
  const i = o.treeNodeMap;
  let a = e == null ? null : (r = i.get(e)) !== null && r !== void 0 ? r : null;
  const l = { keyPath: [], treeNodePath: [], treeNode: a };
  if (a == null ? void 0 : a.ignored) return l.treeNode = null, l;
  for (; a; ) !a.ignored && (t || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), n || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function cd(e) {
  if (e.length === 0) return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function ud(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function gr(e, t, { loop: n = false, includeDisabled: o = false } = {}) {
  const r = t === "prev" ? fd : ud, i = { reverse: t === "prev" };
  let a = false, l = null;
  function s(c) {
    if (c !== null) {
      if (c === e) {
        if (!a) a = true;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!c.disabled || o) && !c.ignored && !c.isGroup) {
        l = c;
        return;
      }
      if (c.isGroup) {
        const f = $o(c, i);
        f !== null ? l = f : s(r(c, n));
      } else {
        const f = r(c, false);
        if (f !== null) s(f);
        else {
          const p = hd(c);
          (p == null ? void 0 : p.isGroup) ? s(r(p, n)) : n && s(r(c, true));
        }
      }
    }
  }
  return s(e), l;
}
function fd(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function hd(e) {
  return e.parent;
}
function $o(e, t = {}) {
  const { reverse: n = false } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, a = n ? -1 : r, l = n ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const c = o[s];
      if (!c.disabled && !c.ignored) if (c.isGroup) {
        const f = $o(c, t);
        if (f !== null) return f;
      } else return c;
    }
  }
  return null;
}
const vd = { getChild() {
  return this.ignored ? null : $o(this);
}, getParent() {
  const { parent: e } = this;
  return (e == null ? void 0 : e.isGroup) ? e.getParent() : e;
}, getNext(e = {}) {
  return gr(this, "next", e);
}, getPrev(e = {}) {
  return gr(this, "prev", e);
} };
function pd(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((a) => {
      o.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || n === void 0 || n.has(a.key)) && r(a.children);
    });
  }
  return r(e), o;
}
function gd(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n) return true;
    t = t.parent;
  }
  return false;
}
function vi(e, t, n, o, r, i = null, a = 0) {
  const l = [];
  return e.forEach((s, c) => {
    var f;
    const p = Object.create(o);
    if (p.rawNode = s, p.siblings = l, p.level = a, p.index = c, p.isFirstChild = c === 0, p.isLastChild = c + 1 === e.length, p.parent = i, !p.ignored) {
      const m = r(s);
      Array.isArray(m) && (p.children = vi(m, t, n, o, r, p, a + 1));
    }
    l.push(p), t.set(p.key, p), n.has(a) || n.set(a, []), (f = n.get(a)) === null || f === void 0 || f.push(p);
  }), l;
}
function wn(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = Qs, getIgnored: a = Ys, getIsGroup: l = od, getKey: s = Zs } = t, c = (n = t.getChildren) !== null && n !== void 0 ? n : Xs, f = t.ignoreEmptyChildren ? (x) => {
    const C = c(x);
    return Array.isArray(C) ? C.length ? C : null : C;
  } : c, p = Object.assign({ get key() {
    return s(this.rawNode);
  }, get disabled() {
    return i(this.rawNode);
  }, get isGroup() {
    return l(this.rawNode);
  }, get isLeaf() {
    return qs(this.rawNode, f);
  }, get shallowLoaded() {
    return Js(this.rawNode, f);
  }, get ignored() {
    return a(this.rawNode);
  }, contains(x) {
    return gd(this, x);
  } }, vd), m = vi(e, o, r, p, f);
  function g(x) {
    if (x == null) return null;
    const C = o.get(x);
    return C && !C.isGroup && !C.ignored ? C : null;
  }
  function u(x) {
    if (x == null) return null;
    const C = o.get(x);
    return C && !C.ignored ? C : null;
  }
  function h(x, C) {
    const M = u(x);
    return M ? M.getPrev(C) : null;
  }
  function v(x, C) {
    const M = u(x);
    return M ? M.getNext(C) : null;
  }
  function b(x) {
    const C = u(x);
    return C ? C.getParent() : null;
  }
  function w(x) {
    const C = u(x);
    return C ? C.getChild() : null;
  }
  const $ = { treeNodes: m, treeNodeMap: o, levelTreeNodeMap: r, maxLevel: Math.max(...r.keys()), getChildren: f, getFlattenedNodes(x) {
    return pd(m, x);
  }, getNode: g, getPrev: h, getNext: v, getParent: b, getChild: w, getFirstAvailableNode() {
    return cd(m);
  }, getPath(x, C = {}) {
    return dd(x, C, $);
  }, getCheckedKeys(x, C = {}) {
    const { cascade: M = true, leafOnly: T = false, checkStrategy: V = "all", allowNotLoaded: N = false } = C;
    return Hn({ checkedKeys: Kn(x), indeterminateKeys: jn(x), cascade: M, leafOnly: T, checkStrategy: V, allowNotLoaded: N }, $);
  }, check(x, C, M = {}) {
    const { cascade: T = true, leafOnly: V = false, checkStrategy: N = "all", allowNotLoaded: H = false } = M;
    return Hn({ checkedKeys: Kn(C), indeterminateKeys: jn(C), keysToCheck: x == null ? [] : pr(x), cascade: T, leafOnly: V, checkStrategy: N, allowNotLoaded: H }, $);
  }, uncheck(x, C, M = {}) {
    const { cascade: T = true, leafOnly: V = false, checkStrategy: N = "all", allowNotLoaded: H = false } = M;
    return Hn({ checkedKeys: Kn(C), indeterminateKeys: jn(C), keysToUncheck: x == null ? [] : pr(x), cascade: T, leafOnly: V, checkStrategy: N, allowNotLoaded: H }, $);
  }, getNonLeafKeys(x = {}) {
    return Gs(m, x);
  } };
  return $;
}
const bd = O("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [Q("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [X("+", [Q("description", `
 margin-top: 8px;
 `)])]), Q("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), Q("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), md = Object.assign(Object.assign({}, ye.props), { description: String, showDescription: { type: Boolean, default: true }, showIcon: { type: Boolean, default: true }, size: { type: String, default: "medium" }, renderIcon: Function }), pi = le({ name: "Empty", props: md, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: n, mergedComponentPropsRef: o } = Te(e), r = ye("Empty", "-empty", bd, wl, e, t), { localeRef: i } = bn("Empty"), a = F(() => {
    var f, p, m;
    return (f = e.description) !== null && f !== void 0 ? f : (m = (p = o == null ? void 0 : o.value) === null || p === void 0 ? void 0 : p.Empty) === null || m === void 0 ? void 0 : m.description;
  }), l = F(() => {
    var f, p;
    return ((p = (f = o == null ? void 0 : o.value) === null || f === void 0 ? void 0 : f.Empty) === null || p === void 0 ? void 0 : p.renderIcon) || (() => d(Us, null));
  }), s = F(() => {
    const { size: f } = e, { common: { cubicBezierEaseInOut: p }, self: { [pe("iconSize", f)]: m, [pe("fontSize", f)]: g, textColor: u, iconColor: h, extraTextColor: v } } = r.value;
    return { "--n-icon-size": m, "--n-font-size": g, "--n-bezier": p, "--n-text-color": u, "--n-icon-color": h, "--n-extra-text-color": v };
  }), c = n ? Ye("empty", F(() => {
    let f = "";
    const { size: p } = e;
    return f += p[0], f;
  }), s, e) : void 0;
  return { mergedClsPrefix: t, mergedRenderIcon: l, localizedDescription: F(() => a.value || i.value.description), cssVars: n ? void 0 : s, themeClass: c == null ? void 0 : c.themeClass, onRender: c == null ? void 0 : c.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: n } = this;
  return n == null ? void 0 : n(), d("div", { class: [`${t}-empty`, this.themeClass], style: this.cssVars }, this.showIcon ? d("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : d(ot, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null, this.showDescription ? d("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? d("div", { class: `${t}-empty__extra` }, e.extra()) : null);
} }), br = le({ name: "NBaseSelectGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { renderLabelRef: e, renderOptionRef: t, labelFieldRef: n, nodePropsRef: o } = xe(yo);
  return { labelField: n, nodeProps: o, renderLabel: e, renderOption: t };
}, render() {
  const { clsPrefix: e, renderLabel: t, renderOption: n, nodeProps: o, tmNode: { rawNode: r } } = this, i = o == null ? void 0 : o(r), a = t ? t(r, false) : pt(r[this.labelField], r, false), l = d("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), a);
  return r.render ? r.render({ node: l, option: r }) : n ? n({ node: l, option: r, selected: false }) : l;
} });
function yd(e, t) {
  return d(Qt, { name: "fade-in-scale-up-transition" }, { default: () => e ? d(ot, { clsPrefix: t, class: `${t}-base-select-option__check` }, { default: () => d(Hs) }) : null });
}
const mr = le({ name: "NBaseSelectOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup(e) {
  const { valueRef: t, pendingTmNodeRef: n, multipleRef: o, valueSetRef: r, renderLabelRef: i, renderOptionRef: a, labelFieldRef: l, valueFieldRef: s, showCheckmarkRef: c, nodePropsRef: f, handleOptionClick: p, handleOptionMouseEnter: m } = xe(yo), g = Pe(() => {
    const { value: b } = n;
    return b ? e.tmNode.key === b.key : false;
  });
  function u(b) {
    const { tmNode: w } = e;
    w.disabled || p(b, w);
  }
  function h(b) {
    const { tmNode: w } = e;
    w.disabled || m(b, w);
  }
  function v(b) {
    const { tmNode: w } = e, { value: $ } = g;
    w.disabled || $ || m(b, w);
  }
  return { multiple: o, isGrouped: Pe(() => {
    const { tmNode: b } = e, { parent: w } = b;
    return w && w.rawNode.type === "group";
  }), showCheckmark: c, nodeProps: f, isPending: g, isSelected: Pe(() => {
    const { value: b } = t, { value: w } = o;
    if (b === null) return false;
    const $ = e.tmNode.rawNode[s.value];
    if (w) {
      const { value: x } = r;
      return x.has($);
    } else return b === $;
  }), labelField: l, renderLabel: i, renderOption: a, handleMouseMove: v, handleMouseEnter: h, handleClick: u };
}, render() {
  const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: n, isPending: o, isGrouped: r, showCheckmark: i, nodeProps: a, renderOption: l, renderLabel: s, handleClick: c, handleMouseEnter: f, handleMouseMove: p } = this, m = yd(n, e), g = s ? [s(t, n), i && m] : [pt(t[this.labelField], t, n), i && m], u = a == null ? void 0 : a(t), h = d("div", Object.assign({}, u, { class: [`${e}-base-select-option`, t.class, u == null ? void 0 : u.class, { [`${e}-base-select-option--disabled`]: t.disabled, [`${e}-base-select-option--selected`]: n, [`${e}-base-select-option--grouped`]: r, [`${e}-base-select-option--pending`]: o, [`${e}-base-select-option--show-checkmark`]: i }], style: [(u == null ? void 0 : u.style) || "", t.style || ""], onClick: Zt([c, u == null ? void 0 : u.onClick]), onMouseenter: Zt([f, u == null ? void 0 : u.onMouseenter]), onMousemove: Zt([p, u == null ? void 0 : u.onMousemove]) }), d("div", { class: `${e}-base-select-option__content` }, g));
  return t.render ? t.render({ node: h, option: t, selected: n }) : l ? l({ node: h, option: t, selected: n }) : h;
} }), { cubicBezierEaseIn: yr, cubicBezierEaseOut: wr } = xl;
function xn({ transformOrigin: e = "inherit", duration: t = ".2s", enterScale: n = ".9", originalTransform: o = "", originalTransition: r = "" } = {}) {
  return [X("&.fade-in-scale-up-transition-leave-active", { transformOrigin: e, transition: `opacity ${t} ${yr}, transform ${t} ${yr} ${r && `,${r}`}` }), X("&.fade-in-scale-up-transition-enter-active", { transformOrigin: e, transition: `opacity ${t} ${wr}, transform ${t} ${wr} ${r && `,${r}`}` }), X("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", { opacity: 0, transform: `${o} scale(${n})` }), X("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", { opacity: 1, transform: `${o} scale(1)` })];
}
const wd = O("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [O("scrollbar", `
 max-height: var(--n-height);
 `), O("virtual-list", `
 max-height: var(--n-height);
 `), O("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [Q("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), O("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), O("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), Q("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), Q("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), Q("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), Q("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), O("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), O("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [G("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), X("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), X("&:active", `
 color: var(--n-option-text-color-pressed);
 `), G("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), G("pending", [X("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), G("selected", `
 color: var(--n-option-text-color-active);
 `, [X("&::before", `
 background-color: var(--n-option-color-active);
 `), G("pending", [X("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), G("disabled", `
 cursor: not-allowed;
 `, [Le("selected", `
 color: var(--n-option-text-color-disabled);
 `), G("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), Q("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [xn({ enterScale: "0.5" })])])]), gi = le({ name: "InternalSelectMenu", props: Object.assign(Object.assign({}, ye.props), { clsPrefix: { type: String, required: true }, scrollable: { type: Boolean, default: true }, treeMate: { type: Object, required: true }, multiple: Boolean, size: { type: String, default: "medium" }, value: { type: [String, Number, Array], default: null }, autoPending: Boolean, virtualScroll: { type: Boolean, default: true }, show: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, loading: Boolean, focusable: Boolean, renderLabel: Function, renderOption: Function, nodeProps: Function, showCheckmark: { type: Boolean, default: true }, onMousedown: Function, onScroll: Function, onFocus: Function, onBlur: Function, onKeyup: Function, onKeydown: Function, onTabOut: Function, onMouseenter: Function, onMouseleave: Function, onResize: Function, resetMenuOnOptionsChange: { type: Boolean, default: true }, inlineThemeDisabled: Boolean, scrollbarProps: Object, onToggle: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n, mergedComponentPropsRef: o } = Te(e), r = mt("InternalSelectMenu", n, t), i = ye("InternalSelectMenu", "-internal-select-menu", wd, Cl, e, oe(e, "clsPrefix")), a = D(null), l = D(null), s = D(null), c = F(() => e.treeMate.getFlattenedNodes()), f = F(() => rd(c.value)), p = D(null);
  function m() {
    const { treeMate: P } = e;
    let E = null;
    const { value: ue } = e;
    ue === null ? E = P.getFirstAvailableNode() : (e.multiple ? E = P.getNode((ue || [])[(ue || []).length - 1]) : E = P.getNode(ue), (!E || E.disabled) && (E = P.getFirstAvailableNode())), _(E || null);
  }
  function g() {
    const { value: P } = p;
    P && !e.treeMate.getNode(P.key) && (p.value = null);
  }
  let u;
  Ae(() => e.show, (P) => {
    P ? u = Ae(() => e.treeMate, () => {
      e.resetMenuOnOptionsChange ? (e.autoPending ? m() : g(), Mt(z)) : g();
    }, { immediate: true }) : u == null ? void 0 : u();
  }, { immediate: true }), bt(() => {
    u == null ? void 0 : u();
  });
  const h = F(() => Kt(i.value.self[pe("optionHeight", e.size)])), v = F(() => jt(i.value.self[pe("padding", e.size)])), b = F(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), w = F(() => {
    const P = c.value;
    return P && P.length === 0;
  }), $ = F(() => {
    var P, E;
    return (E = (P = o == null ? void 0 : o.value) === null || P === void 0 ? void 0 : P.Select) === null || E === void 0 ? void 0 : E.renderEmpty;
  });
  function x(P) {
    const { onToggle: E } = e;
    E && E(P);
  }
  function C(P) {
    const { onScroll: E } = e;
    E && E(P);
  }
  function M(P) {
    var E;
    (E = s.value) === null || E === void 0 || E.sync(), C(P);
  }
  function T() {
    var P;
    (P = s.value) === null || P === void 0 || P.sync();
  }
  function V() {
    const { value: P } = p;
    return P || null;
  }
  function N(P, E) {
    E.disabled || _(E, false);
  }
  function H(P, E) {
    E.disabled || x(E);
  }
  function q(P) {
    var E;
    rt(P, "action") || (E = e.onKeyup) === null || E === void 0 || E.call(e, P);
  }
  function I(P) {
    var E;
    rt(P, "action") || (E = e.onKeydown) === null || E === void 0 || E.call(e, P);
  }
  function y(P) {
    var E;
    (E = e.onMousedown) === null || E === void 0 || E.call(e, P), !e.focusable && P.preventDefault();
  }
  function k() {
    const { value: P } = p;
    P && _(P.getNext({ loop: true }), true);
  }
  function R() {
    const { value: P } = p;
    P && _(P.getPrev({ loop: true }), true);
  }
  function _(P, E = false) {
    p.value = P, E && z();
  }
  function z() {
    var P, E;
    const ue = p.value;
    if (!ue) return;
    const me = f.value(ue.key);
    me !== null && (e.virtualScroll ? (P = l.value) === null || P === void 0 || P.scrollTo({ index: me }) : (E = s.value) === null || E === void 0 || E.scrollTo({ index: me, elSize: h.value }));
  }
  function L(P) {
    var E, ue;
    !((E = a.value) === null || E === void 0) && E.contains(P.target) && ((ue = e.onFocus) === null || ue === void 0 || ue.call(e, P));
  }
  function W(P) {
    var E, ue;
    !((E = a.value) === null || E === void 0) && E.contains(P.relatedTarget) || (ue = e.onBlur) === null || ue === void 0 || ue.call(e, P);
  }
  Ee(yo, { handleOptionMouseEnter: N, handleOptionClick: H, valueSetRef: b, pendingTmNodeRef: p, nodePropsRef: oe(e, "nodeProps"), showCheckmarkRef: oe(e, "showCheckmark"), multipleRef: oe(e, "multiple"), valueRef: oe(e, "value"), renderLabelRef: oe(e, "renderLabel"), renderOptionRef: oe(e, "renderOption"), labelFieldRef: oe(e, "labelField"), valueFieldRef: oe(e, "valueField") }), Ee(Xr, a), Ct(() => {
    const { value: P } = s;
    P && P.sync();
  });
  const Z = F(() => {
    const { size: P } = e, { common: { cubicBezierEaseInOut: E }, self: { height: ue, borderRadius: me, color: ge, groupHeaderTextColor: se, actionDividerColor: K, optionTextColorPressed: de, optionTextColor: Ce, optionTextColorDisabled: we, optionTextColorActive: Fe, optionOpacityDisabled: Ne, optionCheckColor: Ke, actionTextColor: ce, optionColorPending: be, optionColorActive: $e, loadingColor: ke, loadingSize: je, optionColorActivePending: Ge, [pe("optionFontSize", P)]: _e, [pe("optionHeight", P)]: U, [pe("optionPadding", P)]: Y } } = i.value;
    return { "--n-height": ue, "--n-action-divider-color": K, "--n-action-text-color": ce, "--n-bezier": E, "--n-border-radius": me, "--n-color": ge, "--n-option-font-size": _e, "--n-group-header-text-color": se, "--n-option-check-color": Ke, "--n-option-color-pending": be, "--n-option-color-active": $e, "--n-option-color-active-pending": Ge, "--n-option-height": U, "--n-option-opacity-disabled": Ne, "--n-option-text-color": Ce, "--n-option-text-color-active": Fe, "--n-option-text-color-disabled": we, "--n-option-text-color-pressed": de, "--n-option-padding": Y, "--n-option-padding-left": jt(Y, "left"), "--n-option-padding-right": jt(Y, "right"), "--n-loading-color": ke, "--n-loading-size": je };
  }), { inlineThemeDisabled: B } = e, j = B ? Ye("internal-select-menu", F(() => e.size[0]), Z, e) : void 0, ee = { selfRef: a, next: k, prev: R, getPendingTmNode: V };
  return li(a, e.onResize), Object.assign({ mergedTheme: i, mergedClsPrefix: t, rtlEnabled: r, virtualListRef: l, scrollbarRef: s, itemSize: h, padding: v, flattenedNodes: c, empty: w, mergedRenderEmpty: $, virtualListContainer() {
    const { value: P } = l;
    return P == null ? void 0 : P.listElRef;
  }, virtualListContent() {
    const { value: P } = l;
    return P == null ? void 0 : P.itemsElRef;
  }, doScroll: C, handleFocusin: L, handleFocusout: W, handleKeyUp: q, handleKeyDown: I, handleMouseDown: y, handleVirtualListResize: T, handleVirtualListScroll: M, cssVars: B ? void 0 : Z, themeClass: j == null ? void 0 : j.themeClass, onRender: j == null ? void 0 : j.onRender }, ee);
}, render() {
  const { $slots: e, virtualScroll: t, clsPrefix: n, mergedTheme: o, themeClass: r, onRender: i } = this;
  return i == null ? void 0 : i(), d("div", { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [`${n}-base-select-menu`, `${n}-base-select-menu--${this.size}-size`, this.rtlEnabled && `${n}-base-select-menu--rtl`, r, this.multiple && `${n}-base-select-menu--multiple`], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, xt(e.header, (a) => a && d("div", { class: `${n}-base-select-menu__header`, "data-header": true, key: "header" }, a)), this.loading ? d("div", { class: `${n}-base-select-menu__loading` }, d(po, { clsPrefix: n, strokeWidth: 20 })) : this.empty ? d("div", { class: `${n}-base-select-menu__empty`, "data-empty": true }, mn(e.empty, () => {
    var a;
    return [((a = this.mergedRenderEmpty) === null || a === void 0 ? void 0 : a.call(this)) || d(pi, { theme: o.peers.Empty, themeOverrides: o.peerOverrides.Empty, size: this.size })];
  })) : d(go, Object.assign({ ref: "scrollbarRef", theme: o.peers.Scrollbar, themeOverrides: o.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, this.scrollbarProps), { default: () => t ? d(Po, { ref: "virtualListRef", class: `${n}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: false, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: true }, { default: ({ item: a }) => a.isGroup ? d(br, { key: a.key, clsPrefix: n, tmNode: a }) : a.ignored ? null : d(mr, { clsPrefix: n, key: a.key, tmNode: a }) }) : d("div", { class: `${n}-base-select-menu-option-wrapper`, style: { paddingTop: this.padding.top, paddingBottom: this.padding.bottom } }, this.flattenedNodes.map((a) => a.isGroup ? d(br, { key: a.key, clsPrefix: n, tmNode: a }) : d(mr, { clsPrefix: n, key: a.key, tmNode: a }))) }), xt(e.action, (a) => a && [d("div", { class: `${n}-base-select-menu__action`, "data-action": true, key: "action" }, a), d(Ws, { onFocus: this.onTabOut, key: "focus-detector" })]));
} }), Un = { top: "bottom", bottom: "top", left: "right", right: "left" }, Be = "var(--n-arrow-height) * 1.414", xd = X([O("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [X(">", [O("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Le("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Le("scrollable", [Le("show-header-or-footer", "padding: var(--n-padding);")])]), Q("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), Q("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), G("scrollable, show-header-or-footer", [Q("content", `
 padding: var(--n-padding);
 `)])]), O("popover-shared", `
 transform-origin: inherit;
 `, [O("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [O("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${Be});
 height: calc(${Be});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]), X("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `), X("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `), X("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `), X("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]), nt("top-start", `
 top: calc(${Be} / -2);
 left: calc(${wt("top-start")} - var(--v-offset-left));
 `), nt("top", `
 top: calc(${Be} / -2);
 transform: translateX(calc(${Be} / -2)) rotate(45deg);
 left: 50%;
 `), nt("top-end", `
 top: calc(${Be} / -2);
 right: calc(${wt("top-end")} + var(--v-offset-left));
 `), nt("bottom-start", `
 bottom: calc(${Be} / -2);
 left: calc(${wt("bottom-start")} - var(--v-offset-left));
 `), nt("bottom", `
 bottom: calc(${Be} / -2);
 transform: translateX(calc(${Be} / -2)) rotate(45deg);
 left: 50%;
 `), nt("bottom-end", `
 bottom: calc(${Be} / -2);
 right: calc(${wt("bottom-end")} + var(--v-offset-left));
 `), nt("left-start", `
 left: calc(${Be} / -2);
 top: calc(${wt("left-start")} - var(--v-offset-top));
 `), nt("left", `
 left: calc(${Be} / -2);
 transform: translateY(calc(${Be} / -2)) rotate(45deg);
 top: 50%;
 `), nt("left-end", `
 left: calc(${Be} / -2);
 bottom: calc(${wt("left-end")} + var(--v-offset-top));
 `), nt("right-start", `
 right: calc(${Be} / -2);
 top: calc(${wt("right-start")} - var(--v-offset-top));
 `), nt("right", `
 right: calc(${Be} / -2);
 transform: translateY(calc(${Be} / -2)) rotate(45deg);
 top: 50%;
 `), nt("right-end", `
 right: calc(${Be} / -2);
 bottom: calc(${wt("right-end")} + var(--v-offset-top));
 `), ...Ks({ top: ["right-start", "left-start"], right: ["top-end", "bottom-end"], bottom: ["right-end", "left-end"], left: ["top-start", "bottom-start"] }, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", l = `calc((${`var(--v-target-${o}, 0px)`} - ${Be}) / 2)`, s = wt(r);
    return X(`[v-placement="${r}"] >`, [O("popover-shared", [G("center-arrow", [O("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function wt(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function nt(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return X(`[v-placement="${e}"] >`, [O("popover-shared", `
 margin-${Un[n]}: var(--n-space);
 `, [G("show-arrow", `
 margin-${Un[n]}: var(--n-space-arrow);
 `), G("overlap", `
 margin: 0;
 `), Sl("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${Un[n]}: auto;
 ${o}
 `, [O("popover-arrow", t)])])]);
}
const bi = Object.assign(Object.assign({}, ye.props), { to: gt.propTo, show: Boolean, trigger: String, showArrow: Boolean, delay: Number, duration: Number, raw: Boolean, arrowPointToCenter: Boolean, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], displayDirective: String, x: Number, y: Number, flip: Boolean, overlap: Boolean, placement: String, width: [Number, String], keepAliveOnHover: Boolean, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], internalDeactivateImmediately: Boolean, animated: Boolean, onClickoutside: Function, internalTrapFocus: Boolean, internalOnAfterLeave: Function, minWidth: Number, maxWidth: Number });
function mi({ arrowClass: e, arrowStyle: t, arrowWrapperClass: n, arrowWrapperStyle: o, clsPrefix: r }) {
  return d("div", { key: "__popover-arrow__", style: o, class: [`${r}-popover-arrow-wrapper`, n] }, d("div", { class: [`${r}-popover-arrow`, e], style: t }));
}
const Cd = le({ name: "PopoverBody", inheritAttrs: false, props: bi, setup(e, { slots: t, attrs: n }) {
  const { namespaceRef: o, mergedClsPrefixRef: r, inlineThemeDisabled: i, mergedRtlRef: a } = Te(e), l = ye("Popover", "-popover", xd, kl, e, r), s = mt("Popover", a, r), c = D(null), f = xe("NPopover"), p = D(null), m = D(e.show), g = D(false);
  zt(() => {
    const { show: N } = e;
    N && !ka() && !e.internalDeactivateImmediately && (g.value = true);
  });
  const u = F(() => {
    const { trigger: N, onClickoutside: H } = e, q = [], { positionManuallyRef: { value: I } } = f;
    return I || (N === "click" && !H && q.push([un, M, void 0, { capture: true }]), N === "hover" && q.push([la, C])), H && q.push([un, M, void 0, { capture: true }]), (e.displayDirective === "show" || e.animated && g.value) && q.push([Er, e.show]), q;
  }), h = F(() => {
    const { common: { cubicBezierEaseInOut: N, cubicBezierEaseIn: H, cubicBezierEaseOut: q }, self: { space: I, spaceArrow: y, padding: k, fontSize: R, textColor: _, dividerColor: z, color: L, boxShadow: W, borderRadius: Z, arrowHeight: B, arrowOffset: j, arrowOffsetVertical: ee } } = l.value;
    return { "--n-box-shadow": W, "--n-bezier": N, "--n-bezier-ease-in": H, "--n-bezier-ease-out": q, "--n-font-size": R, "--n-text-color": _, "--n-color": L, "--n-divider-color": z, "--n-border-radius": Z, "--n-arrow-height": B, "--n-arrow-offset": j, "--n-arrow-offset-vertical": ee, "--n-padding": k, "--n-space": I, "--n-space-arrow": y };
  }), v = F(() => {
    const N = e.width === "trigger" ? void 0 : We(e.width), H = [];
    N && H.push({ width: N });
    const { maxWidth: q, minWidth: I } = e;
    return q && H.push({ maxWidth: We(q) }), I && H.push({ maxWidth: We(I) }), i || H.push(h.value), H;
  }), b = i ? Ye("popover", void 0, h, e) : void 0;
  f.setBodyInstance({ syncPosition: w }), bt(() => {
    f.setBodyInstance(null);
  }), Ae(oe(e, "show"), (N) => {
    e.animated || (N ? m.value = true : m.value = false);
  });
  function w() {
    var N;
    (N = c.value) === null || N === void 0 || N.syncPosition();
  }
  function $(N) {
    e.trigger === "hover" && e.keepAliveOnHover && e.show && f.handleMouseEnter(N);
  }
  function x(N) {
    e.trigger === "hover" && e.keepAliveOnHover && f.handleMouseLeave(N);
  }
  function C(N) {
    e.trigger === "hover" && !T().contains(sn(N)) && f.handleMouseMoveOutside(N);
  }
  function M(N) {
    (e.trigger === "click" && !T().contains(sn(N)) || e.onClickoutside) && f.handleClickOutside(N);
  }
  function T() {
    return f.getTriggerElement();
  }
  Ee(yn, p), Ee(wo, null), Ee(xo, null);
  function V() {
    if (b == null ? void 0 : b.onRender(), !(e.displayDirective === "show" || e.show || e.animated && g.value)) return null;
    let H;
    const q = f.internalRenderBodyRef.value, { value: I } = r;
    if (q) H = q([`${I}-popover-shared`, (s == null ? void 0 : s.value) && `${I}-popover--rtl`, b == null ? void 0 : b.themeClass.value, e.overlap && `${I}-popover-shared--overlap`, e.showArrow && `${I}-popover-shared--show-arrow`, e.arrowPointToCenter && `${I}-popover-shared--center-arrow`], p, v.value, $, x);
    else {
      const { value: y } = f.extraClassRef, { internalTrapFocus: k } = e, R = !No(t.header) || !No(t.footer), _ = () => {
        var z, L;
        const W = R ? d(dt, null, xt(t.header, (j) => j ? d("div", { class: [`${I}-popover__header`, e.headerClass], style: e.headerStyle }, j) : null), xt(t.default, (j) => j ? d("div", { class: [`${I}-popover__content`, e.contentClass], style: e.contentStyle }, t) : null), xt(t.footer, (j) => j ? d("div", { class: [`${I}-popover__footer`, e.footerClass], style: e.footerStyle }, j) : null)) : e.scrollable ? (z = t.default) === null || z === void 0 ? void 0 : z.call(t) : d("div", { class: [`${I}-popover__content`, e.contentClass], style: e.contentStyle }, t), Z = e.scrollable ? d(Lr, { themeOverrides: l.value.peerOverrides.Scrollbar, theme: l.value.peers.Scrollbar, contentClass: R ? void 0 : `${I}-popover__content ${(L = e.contentClass) !== null && L !== void 0 ? L : ""}`, contentStyle: R ? void 0 : e.contentStyle }, { default: () => W }) : W, B = e.showArrow ? mi({ arrowClass: e.arrowClass, arrowStyle: e.arrowStyle, arrowWrapperClass: e.arrowWrapperClass, arrowWrapperStyle: e.arrowWrapperStyle, clsPrefix: I }) : null;
        return [Z, B];
      };
      H = d("div", Ft({ class: [`${I}-popover`, `${I}-popover-shared`, (s == null ? void 0 : s.value) && `${I}-popover--rtl`, b == null ? void 0 : b.themeClass.value, y.map((z) => `${I}-${z}`), { [`${I}-popover--scrollable`]: e.scrollable, [`${I}-popover--show-header-or-footer`]: R, [`${I}-popover--raw`]: e.raw, [`${I}-popover-shared--overlap`]: e.overlap, [`${I}-popover-shared--show-arrow`]: e.showArrow, [`${I}-popover-shared--center-arrow`]: e.arrowPointToCenter }], ref: p, style: v.value, onKeydown: f.handleKeydown, onMouseenter: $, onMouseleave: x }, n), k ? d(Ca, { active: e.show, autoFocus: true }, { default: _ }) : _());
    }
    return Jt(H, u.value);
  }
  return { displayed: g, namespace: o, isMounted: f.isMountedRef, zIndex: f.zIndexRef, followerRef: c, adjustedTo: gt(e), followerEnabled: m, renderContentNode: V };
}, render() {
  return d(Ro, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === gt.tdkey }, { default: () => this.animated ? d(Qt, { name: "popover-transition", appear: this.isMounted, onEnter: () => {
    this.followerEnabled = true;
  }, onAfterLeave: () => {
    var e;
    (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = false, this.displayed = false;
  } }, { default: this.renderContentNode }) : this.renderContentNode() });
} }), Sd = Object.keys(bi), kd = { focus: ["onFocus", "onBlur"], click: ["onClick"], hover: ["onMouseenter", "onMouseleave"], manual: [], nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"] };
function Rd(e, t, n) {
  kd[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...a) => {
      r(...a), i(...a);
    } : e.props[o] = i;
  });
}
const Vt = { show: { type: Boolean, default: void 0 }, defaultShow: Boolean, showArrow: { type: Boolean, default: true }, trigger: { type: String, default: "hover" }, delay: { type: Number, default: 100 }, duration: { type: Number, default: 100 }, raw: Boolean, placement: { type: String, default: "top" }, x: Number, y: Number, arrowPointToCenter: Boolean, disabled: Boolean, getDisabled: Function, displayDirective: { type: String, default: "if" }, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], flip: { type: Boolean, default: true }, animated: { type: Boolean, default: true }, width: { type: [Number, String], default: void 0 }, overlap: Boolean, keepAliveOnHover: { type: Boolean, default: true }, zIndex: Number, to: gt.propTo, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], onClickoutside: Function, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], internalDeactivateImmediately: Boolean, internalSyncTargetWithParent: Boolean, internalInheritedEventHandlers: { type: Array, default: () => [] }, internalTrapFocus: Boolean, internalExtraClass: { type: Array, default: () => [] }, onShow: [Function, Array], onHide: [Function, Array], arrow: { type: Boolean, default: void 0 }, minWidth: Number, maxWidth: Number }, Pd = Object.assign(Object.assign(Object.assign({}, ye.props), Vt), { internalOnAfterLeave: Function, internalRenderBody: Function }), tn = le({ name: "Popover", inheritAttrs: false, props: Pd, slots: Object, __popover__: true, setup(e) {
  const t = fo(), n = D(null), o = F(() => e.show), r = D(e.defaultShow), i = Qe(o, r), a = Pe(() => e.disabled ? false : i.value), l = () => {
    if (e.disabled) return true;
    const { getDisabled: R } = e;
    return !!(R == null ? void 0 : R());
  }, s = () => l() ? false : i.value, c = Gr(e, ["arrow", "showArrow"]), f = F(() => e.overlap ? false : c.value);
  let p = null;
  const m = D(null), g = D(null), u = Pe(() => e.x !== void 0 && e.y !== void 0);
  function h(R) {
    const { "onUpdate:show": _, onUpdateShow: z, onShow: L, onHide: W } = e;
    r.value = R, _ && ne(_, R), z && ne(z, R), R && L && ne(L, true), R && W && ne(W, false);
  }
  function v() {
    p && p.syncPosition();
  }
  function b() {
    const { value: R } = m;
    R && (window.clearTimeout(R), m.value = null);
  }
  function w() {
    const { value: R } = g;
    R && (window.clearTimeout(R), g.value = null);
  }
  function $() {
    const R = l();
    if (e.trigger === "focus" && !R) {
      if (s()) return;
      h(true);
    }
  }
  function x() {
    const R = l();
    if (e.trigger === "focus" && !R) {
      if (!s()) return;
      h(false);
    }
  }
  function C() {
    const R = l();
    if (e.trigger === "hover" && !R) {
      if (w(), m.value !== null || s()) return;
      const _ = () => {
        h(true), m.value = null;
      }, { delay: z } = e;
      z === 0 ? _() : m.value = window.setTimeout(_, z);
    }
  }
  function M() {
    const R = l();
    if (e.trigger === "hover" && !R) {
      if (b(), g.value !== null || !s()) return;
      const _ = () => {
        h(false), g.value = null;
      }, { duration: z } = e;
      z === 0 ? _() : g.value = window.setTimeout(_, z);
    }
  }
  function T() {
    M();
  }
  function V(R) {
    var _;
    s() && (e.trigger === "click" && (b(), w(), h(false)), (_ = e.onClickoutside) === null || _ === void 0 || _.call(e, R));
  }
  function N() {
    if (e.trigger === "click" && !l()) {
      b(), w();
      const R = !s();
      h(R);
    }
  }
  function H(R) {
    e.internalTrapFocus && R.key === "Escape" && (b(), w(), h(false));
  }
  function q(R) {
    r.value = R;
  }
  function I() {
    var R;
    return (R = n.value) === null || R === void 0 ? void 0 : R.targetRef;
  }
  function y(R) {
    p = R;
  }
  return Ee("NPopover", { getTriggerElement: I, handleKeydown: H, handleMouseEnter: C, handleMouseLeave: M, handleClickOutside: V, handleMouseMoveOutside: T, setBodyInstance: y, positionManuallyRef: u, isMountedRef: t, zIndexRef: oe(e, "zIndex"), extraClassRef: oe(e, "internalExtraClass"), internalRenderBodyRef: oe(e, "internalRenderBody") }), zt(() => {
    i.value && l() && h(false);
  }), { binderInstRef: n, positionManually: u, mergedShowConsideringDisabledProp: a, uncontrolledShow: r, mergedShowArrow: f, getMergedShow: s, setShow: q, handleClick: N, handleMouseEnter: C, handleMouseLeave: M, handleFocus: $, handleBlur: x, syncPosition: v };
}, render() {
  var e;
  const { positionManually: t, $slots: n } = this;
  let o, r = false;
  if (!t && (o = za(n, "trigger"), o)) {
    o = Rl(o), o = o.type === Pl ? d("span", [o]) : o;
    const i = { onClick: this.handleClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur };
    if (!((e = o.type) === null || e === void 0) && e.__popover__) r = true, o.props || (o.props = { internalSyncTargetWithParent: true, internalInheritedEventHandlers: [] }), o.props.internalSyncTargetWithParent = true, o.props.internalInheritedEventHandlers ? o.props.internalInheritedEventHandlers = [i, ...o.props.internalInheritedEventHandlers] : o.props.internalInheritedEventHandlers = [i];
    else {
      const { internalInheritedEventHandlers: a } = this, l = [i, ...a], s = { onBlur: (c) => {
        l.forEach((f) => {
          f.onBlur(c);
        });
      }, onFocus: (c) => {
        l.forEach((f) => {
          f.onFocus(c);
        });
      }, onClick: (c) => {
        l.forEach((f) => {
          f.onClick(c);
        });
      }, onMouseenter: (c) => {
        l.forEach((f) => {
          f.onMouseenter(c);
        });
      }, onMouseleave: (c) => {
        l.forEach((f) => {
          f.onMouseleave(c);
        });
      } };
      Rd(o, a ? "nested" : t ? "manual" : this.trigger, s);
    }
  }
  return d(Co, { ref: "binderInstRef", syncTarget: !r, syncTargetWithParent: this.internalSyncTargetWithParent }, { default: () => {
    this.mergedShowConsideringDisabledProp;
    const i = this.getMergedShow();
    return [this.internalTrapFocus && i ? Jt(d("div", { style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 } }), [[Qr, { enabled: i, zIndex: this.zIndex }]]) : null, t ? null : d(So, null, { default: () => o }), d(Cd, bo(this.$props, Sd, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), { default: () => {
      var a, l;
      return (l = (a = this.$slots).default) === null || l === void 0 ? void 0 : l.call(a);
    }, header: () => {
      var a, l;
      return (l = (a = this.$slots).header) === null || l === void 0 ? void 0 : l.call(a);
    }, footer: () => {
      var a, l;
      return (l = (a = this.$slots).footer) === null || l === void 0 ? void 0 : l.call(a);
    } })];
  } });
} });
function zd(e) {
  const { textColor2: t, primaryColorHover: n, primaryColorPressed: o, primaryColor: r, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: c, borderColor: f, opacityDisabled: p, tagColor: m, closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: h, borderRadiusSmall: v, fontSizeMini: b, fontSizeTiny: w, fontSizeSmall: $, fontSizeMedium: x, heightMini: C, heightTiny: M, heightSmall: T, heightMedium: V, closeColorHover: N, closeColorPressed: H, buttonColor2Hover: q, buttonColor2Pressed: I, fontWeightStrong: y } = e;
  return Object.assign(Object.assign({}, Fl), { closeBorderRadius: v, heightTiny: C, heightSmall: M, heightMedium: T, heightLarge: V, borderRadius: v, opacityDisabled: p, fontSizeTiny: b, fontSizeSmall: w, fontSizeMedium: $, fontSizeLarge: x, fontWeightStrong: y, textColorCheckable: t, textColorHoverCheckable: t, textColorPressedCheckable: t, textColorChecked: c, colorCheckable: "#0000", colorHoverCheckable: q, colorPressedCheckable: I, colorChecked: r, colorCheckedHover: n, colorCheckedPressed: o, border: `1px solid ${f}`, textColor: t, color: m, colorBordered: "rgb(250, 250, 252)", closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: h, closeColorHover: N, closeColorPressed: H, borderPrimary: `1px solid ${Re(r, { alpha: 0.3 })}`, textColorPrimary: r, colorPrimary: Re(r, { alpha: 0.12 }), colorBorderedPrimary: Re(r, { alpha: 0.1 }), closeIconColorPrimary: r, closeIconColorHoverPrimary: r, closeIconColorPressedPrimary: r, closeColorHoverPrimary: Re(r, { alpha: 0.12 }), closeColorPressedPrimary: Re(r, { alpha: 0.18 }), borderInfo: `1px solid ${Re(i, { alpha: 0.3 })}`, textColorInfo: i, colorInfo: Re(i, { alpha: 0.12 }), colorBorderedInfo: Re(i, { alpha: 0.1 }), closeIconColorInfo: i, closeIconColorHoverInfo: i, closeIconColorPressedInfo: i, closeColorHoverInfo: Re(i, { alpha: 0.12 }), closeColorPressedInfo: Re(i, { alpha: 0.18 }), borderSuccess: `1px solid ${Re(a, { alpha: 0.3 })}`, textColorSuccess: a, colorSuccess: Re(a, { alpha: 0.12 }), colorBorderedSuccess: Re(a, { alpha: 0.1 }), closeIconColorSuccess: a, closeIconColorHoverSuccess: a, closeIconColorPressedSuccess: a, closeColorHoverSuccess: Re(a, { alpha: 0.12 }), closeColorPressedSuccess: Re(a, { alpha: 0.18 }), borderWarning: `1px solid ${Re(l, { alpha: 0.35 })}`, textColorWarning: l, colorWarning: Re(l, { alpha: 0.15 }), colorBorderedWarning: Re(l, { alpha: 0.12 }), closeIconColorWarning: l, closeIconColorHoverWarning: l, closeIconColorPressedWarning: l, closeColorHoverWarning: Re(l, { alpha: 0.12 }), closeColorPressedWarning: Re(l, { alpha: 0.18 }), borderError: `1px solid ${Re(s, { alpha: 0.23 })}`, textColorError: s, colorError: Re(s, { alpha: 0.1 }), colorBorderedError: Re(s, { alpha: 0.08 }), closeIconColorError: s, closeIconColorHoverError: s, closeIconColorPressedError: s, closeColorHoverError: Re(s, { alpha: 0.12 }), closeColorPressedError: Re(s, { alpha: 0.18 }) });
}
const Fd = { common: zl, self: zd }, $d = { color: Object, type: { type: String, default: "default" }, round: Boolean, size: String, closable: Boolean, disabled: { type: Boolean, default: void 0 } }, Od = O("tag", `
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [G("strong", `
 font-weight: var(--n-font-weight-strong);
 `), Q("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), Q("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), Q("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), Q("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), G("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [Q("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), Q("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), G("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), G("icon, avatar", [G("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), G("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), G("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Le("disabled", [X("&:hover", "background-color: var(--n-color-hover-checkable);", [Le("checked", "color: var(--n-text-color-hover-checkable);")]), X("&:active", "background-color: var(--n-color-pressed-checkable);", [Le("checked", "color: var(--n-text-color-pressed-checkable);")])]), G("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Le("disabled", [X("&:hover", "background-color: var(--n-color-checked-hover);"), X("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Td = Object.assign(Object.assign(Object.assign({}, ye.props), $d), { bordered: { type: Boolean, default: void 0 }, checked: Boolean, checkable: Boolean, strong: Boolean, triggerClickOnClose: Boolean, onClose: [Array, Function], onMouseenter: Function, onMouseleave: Function, "onUpdate:checked": Function, onUpdateChecked: Function, internalCloseFocusable: { type: Boolean, default: true }, internalCloseIsButtonTag: { type: Boolean, default: true }, onCheckedChange: Function }), Md = qe("n-tag"), Vn = le({ name: "Tag", props: Td, slots: Object, setup(e) {
  const t = D(null), { mergedBorderedRef: n, mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Te(e), l = F(() => {
    var h, v;
    return e.size || ((v = (h = a == null ? void 0 : a.value) === null || h === void 0 ? void 0 : h.Tag) === null || v === void 0 ? void 0 : v.size) || "medium";
  }), s = ye("Tag", "-tag", Od, Fd, e, o);
  Ee(Md, { roundRef: oe(e, "round") });
  function c() {
    if (!e.disabled && e.checkable) {
      const { checked: h, onCheckedChange: v, onUpdateChecked: b, "onUpdate:checked": w } = e;
      b && b(!h), w && w(!h), v && v(!h);
    }
  }
  function f(h) {
    if (e.triggerClickOnClose || h.stopPropagation(), !e.disabled) {
      const { onClose: v } = e;
      v && ne(v, h);
    }
  }
  const p = { setTextContent(h) {
    const { value: v } = t;
    v && (v.textContent = h);
  } }, m = mt("Tag", i, o), g = F(() => {
    const { type: h, color: { color: v, textColor: b } = {} } = e, w = l.value, { common: { cubicBezierEaseInOut: $ }, self: { padding: x, closeMargin: C, borderRadius: M, opacityDisabled: T, textColorCheckable: V, textColorHoverCheckable: N, textColorPressedCheckable: H, textColorChecked: q, colorCheckable: I, colorHoverCheckable: y, colorPressedCheckable: k, colorChecked: R, colorCheckedHover: _, colorCheckedPressed: z, closeBorderRadius: L, fontWeightStrong: W, [pe("colorBordered", h)]: Z, [pe("closeSize", w)]: B, [pe("closeIconSize", w)]: j, [pe("fontSize", w)]: ee, [pe("height", w)]: P, [pe("color", h)]: E, [pe("textColor", h)]: ue, [pe("border", h)]: me, [pe("closeIconColor", h)]: ge, [pe("closeIconColorHover", h)]: se, [pe("closeIconColorPressed", h)]: K, [pe("closeColorHover", h)]: de, [pe("closeColorPressed", h)]: Ce } } = s.value, we = jt(C);
    return { "--n-font-weight-strong": W, "--n-avatar-size-override": `calc(${P} - 8px)`, "--n-bezier": $, "--n-border-radius": M, "--n-border": me, "--n-close-icon-size": j, "--n-close-color-pressed": Ce, "--n-close-color-hover": de, "--n-close-border-radius": L, "--n-close-icon-color": ge, "--n-close-icon-color-hover": se, "--n-close-icon-color-pressed": K, "--n-close-icon-color-disabled": ge, "--n-close-margin-top": we.top, "--n-close-margin-right": we.right, "--n-close-margin-bottom": we.bottom, "--n-close-margin-left": we.left, "--n-close-size": B, "--n-color": v || (n.value ? Z : E), "--n-color-checkable": I, "--n-color-checked": R, "--n-color-checked-hover": _, "--n-color-checked-pressed": z, "--n-color-hover-checkable": y, "--n-color-pressed-checkable": k, "--n-font-size": ee, "--n-height": P, "--n-opacity-disabled": T, "--n-padding": x, "--n-text-color": b || ue, "--n-text-color-checkable": V, "--n-text-color-checked": q, "--n-text-color-hover-checkable": N, "--n-text-color-pressed-checkable": H };
  }), u = r ? Ye("tag", F(() => {
    let h = "";
    const { type: v, color: { color: b, textColor: w } = {} } = e;
    return h += v[0], h += l.value[0], b && (h += `a${Do(b)}`), w && (h += `b${Do(w)}`), n.value && (h += "c"), h;
  }), g, e) : void 0;
  return Object.assign(Object.assign({}, p), { rtlEnabled: m, mergedClsPrefix: o, contentRef: t, mergedBordered: n, handleClick: c, handleCloseClick: f, cssVars: r ? void 0 : g, themeClass: u == null ? void 0 : u.themeClass, onRender: u == null ? void 0 : u.onRender });
}, render() {
  var e, t;
  const { mergedClsPrefix: n, rtlEnabled: o, closable: r, color: { borderColor: i } = {}, round: a, onRender: l, $slots: s } = this;
  l == null ? void 0 : l();
  const c = xt(s.avatar, (p) => p && d("div", { class: `${n}-tag__avatar` }, p)), f = xt(s.icon, (p) => p && d("div", { class: `${n}-tag__icon` }, p));
  return d("div", { class: [`${n}-tag`, this.themeClass, { [`${n}-tag--rtl`]: o, [`${n}-tag--strong`]: this.strong, [`${n}-tag--disabled`]: this.disabled, [`${n}-tag--checkable`]: this.checkable, [`${n}-tag--checked`]: this.checkable && this.checked, [`${n}-tag--round`]: a, [`${n}-tag--avatar`]: c, [`${n}-tag--icon`]: f, [`${n}-tag--closable`]: r }], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, f || c, d("span", { class: `${n}-tag__content`, ref: "contentRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? d($l, { clsPrefix: n, class: `${n}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: a, isButtonTag: this.internalCloseIsButtonTag, absolute: true }) : null, !this.checkable && this.mergedBordered ? d("div", { class: `${n}-tag__border`, style: { borderColor: i } }) : null);
} }), Id = X([O("base-selection", `
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [O("base-loading", `
 color: var(--n-loading-color);
 `), O("base-selection-tags", "min-height: var(--n-height);"), Q("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), Q("state-border", `
 z-index: 1;
 border-color: #0000;
 `), O("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [Q("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), O("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [Q("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), O("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [Q("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), O("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), O("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [O("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [Q("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), Q("render-label", `
 color: var(--n-text-color);
 `)]), Le("disabled", [X("&:hover", [Q("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), G("focus", [Q("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), G("active", [Q("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), O("base-selection-label", "background-color: var(--n-color-active);"), O("base-selection-tags", "background-color: var(--n-color-active);")])]), G("disabled", "cursor: not-allowed;", [Q("arrow", `
 color: var(--n-arrow-color-disabled);
 `), O("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [O("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), Q("render-label", `
 color: var(--n-text-color-disabled);
 `)]), O("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), O("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), O("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [Q("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), Q("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => G(`${e}-status`, [Q("state-border", `border: var(--n-border-${e});`), Le("disabled", [X("&:hover", [Q("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), G("active", [Q("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), O("base-selection-label", `background-color: var(--n-color-active-${e});`), O("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), G("focus", [Q("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), O("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), O("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [X("&:last-child", "padding-right: 0;"), O("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [Q("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), _d = le({ name: "InternalSelection", props: Object.assign(Object.assign({}, ye.props), { clsPrefix: { type: String, required: true }, bordered: { type: Boolean, default: void 0 }, active: Boolean, pattern: { type: String, default: "" }, placeholder: String, selectedOption: { type: Object, default: null }, selectedOptions: { type: Array, default: null }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: { type: String, default: "medium" }, loading: Boolean, autofocus: Boolean, showArrow: { type: Boolean, default: true }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], ellipsisTagPopoverProps: Object, onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: true }, onResize: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n } = Te(e), o = mt("InternalSelection", n, t), r = D(null), i = D(null), a = D(null), l = D(null), s = D(null), c = D(null), f = D(null), p = D(null), m = D(null), g = D(null), u = D(false), h = D(false), v = D(false), b = ye("InternalSelection", "-internal-selection", Id, Tl, e, oe(e, "clsPrefix")), w = F(() => e.clearable && !e.disabled && (v.value || e.active)), $ = F(() => e.selectedOption ? e.renderTag ? e.renderTag({ option: e.selectedOption, handleClose: () => {
  } }) : e.renderLabel ? e.renderLabel(e.selectedOption, true) : pt(e.selectedOption[e.labelField], e.selectedOption, true) : e.placeholder), x = F(() => {
    const U = e.selectedOption;
    if (U) return U[e.labelField];
  }), C = F(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
  function M() {
    var U;
    const { value: Y } = r;
    if (Y) {
      const { value: Se } = i;
      Se && (Se.style.width = `${Y.offsetWidth}px`, e.maxTagCount !== "responsive" && ((U = m.value) === null || U === void 0 || U.sync({ showAllItemsBeforeCalculate: false })));
    }
  }
  function T() {
    const { value: U } = g;
    U && (U.style.display = "none");
  }
  function V() {
    const { value: U } = g;
    U && (U.style.display = "inline-block");
  }
  Ae(oe(e, "active"), (U) => {
    U || T();
  }), Ae(oe(e, "pattern"), () => {
    e.multiple && Mt(M);
  });
  function N(U) {
    const { onFocus: Y } = e;
    Y && Y(U);
  }
  function H(U) {
    const { onBlur: Y } = e;
    Y && Y(U);
  }
  function q(U) {
    const { onDeleteOption: Y } = e;
    Y && Y(U);
  }
  function I(U) {
    const { onClear: Y } = e;
    Y && Y(U);
  }
  function y(U) {
    const { onPatternInput: Y } = e;
    Y && Y(U);
  }
  function k(U) {
    var Y;
    (!U.relatedTarget || !(!((Y = a.value) === null || Y === void 0) && Y.contains(U.relatedTarget))) && N(U);
  }
  function R(U) {
    var Y;
    !((Y = a.value) === null || Y === void 0) && Y.contains(U.relatedTarget) || H(U);
  }
  function _(U) {
    I(U);
  }
  function z() {
    v.value = true;
  }
  function L() {
    v.value = false;
  }
  function W(U) {
    !e.active || !e.filterable || U.target !== i.value && U.preventDefault();
  }
  function Z(U) {
    q(U);
  }
  const B = D(false);
  function j(U) {
    if (U.key === "Backspace" && !B.value && !e.pattern.length) {
      const { selectedOptions: Y } = e;
      (Y == null ? void 0 : Y.length) && Z(Y[Y.length - 1]);
    }
  }
  let ee = null;
  function P(U) {
    const { value: Y } = r;
    if (Y) {
      const Se = U.target.value;
      Y.textContent = Se, M();
    }
    e.ignoreComposition && B.value ? ee = U : y(U);
  }
  function E() {
    B.value = true;
  }
  function ue() {
    B.value = false, e.ignoreComposition && y(ee), ee = null;
  }
  function me(U) {
    var Y;
    h.value = true, (Y = e.onPatternFocus) === null || Y === void 0 || Y.call(e, U);
  }
  function ge(U) {
    var Y;
    h.value = false, (Y = e.onPatternBlur) === null || Y === void 0 || Y.call(e, U);
  }
  function se() {
    var U, Y;
    if (e.filterable) h.value = false, (U = c.value) === null || U === void 0 || U.blur(), (Y = i.value) === null || Y === void 0 || Y.blur();
    else if (e.multiple) {
      const { value: Se } = l;
      Se == null ? void 0 : Se.blur();
    } else {
      const { value: Se } = s;
      Se == null ? void 0 : Se.blur();
    }
  }
  function K() {
    var U, Y, Se;
    e.filterable ? (h.value = false, (U = c.value) === null || U === void 0 || U.focus()) : e.multiple ? (Y = l.value) === null || Y === void 0 || Y.focus() : (Se = s.value) === null || Se === void 0 || Se.focus();
  }
  function de() {
    const { value: U } = i;
    U && (V(), U.focus());
  }
  function Ce() {
    const { value: U } = i;
    U && U.blur();
  }
  function we(U) {
    const { value: Y } = f;
    Y && Y.setTextContent(`+${U}`);
  }
  function Fe() {
    const { value: U } = p;
    return U;
  }
  function Ne() {
    return i.value;
  }
  let Ke = null;
  function ce() {
    Ke !== null && window.clearTimeout(Ke);
  }
  function be() {
    e.active || (ce(), Ke = window.setTimeout(() => {
      C.value && (u.value = true);
    }, 100));
  }
  function $e() {
    ce();
  }
  function ke(U) {
    U || (ce(), u.value = false);
  }
  Ae(C, (U) => {
    U || (u.value = false);
  }), Ct(() => {
    zt(() => {
      const U = c.value;
      U && (e.disabled ? U.removeAttribute("tabindex") : U.tabIndex = h.value ? -1 : 0);
    });
  }), li(a, e.onResize);
  const { inlineThemeDisabled: je } = e, Ge = F(() => {
    const { size: U } = e, { common: { cubicBezierEaseInOut: Y }, self: { fontWeight: Se, borderRadius: it, color: De, placeholderColor: Me, textColor: Xe, paddingSingle: Oe, paddingMultiple: et, caretColor: tt, colorDisabled: Je, textColorDisabled: re, placeholderColorDisabled: he, colorActive: S, boxShadowFocus: A, boxShadowActive: te, boxShadowHover: fe, border: J, borderFocus: ie, borderHover: ae, borderActive: ve, arrowColor: ze, arrowColorDisabled: ut, loadingColor: lt, colorActiveWarning: ft, boxShadowFocusWarning: ht, boxShadowActiveWarning: $t, boxShadowHoverWarning: Ot, borderWarning: vt, borderFocusWarning: St, borderHoverWarning: Tt, borderActiveWarning: at, colorActiveError: _t, boxShadowFocusError: Gt, boxShadowActiveError: Ve, boxShadowHoverError: Ze, borderError: Sn, borderFocusError: kn, borderHoverError: Rn, borderActiveError: Pn, clearColor: zn, clearColorHover: Fn, clearColorPressed: $n, clearSize: On, arrowSize: Tn, [pe("height", U)]: Mn, [pe("fontSize", U)]: In } } = b.value, Bt = jt(Oe), At = jt(et);
    return { "--n-bezier": Y, "--n-border": J, "--n-border-active": ve, "--n-border-focus": ie, "--n-border-hover": ae, "--n-border-radius": it, "--n-box-shadow-active": te, "--n-box-shadow-focus": A, "--n-box-shadow-hover": fe, "--n-caret-color": tt, "--n-color": De, "--n-color-active": S, "--n-color-disabled": Je, "--n-font-size": In, "--n-height": Mn, "--n-padding-single-top": Bt.top, "--n-padding-multiple-top": At.top, "--n-padding-single-right": Bt.right, "--n-padding-multiple-right": At.right, "--n-padding-single-left": Bt.left, "--n-padding-multiple-left": At.left, "--n-padding-single-bottom": Bt.bottom, "--n-padding-multiple-bottom": At.bottom, "--n-placeholder-color": Me, "--n-placeholder-color-disabled": he, "--n-text-color": Xe, "--n-text-color-disabled": re, "--n-arrow-color": ze, "--n-arrow-color-disabled": ut, "--n-loading-color": lt, "--n-color-active-warning": ft, "--n-box-shadow-focus-warning": ht, "--n-box-shadow-active-warning": $t, "--n-box-shadow-hover-warning": Ot, "--n-border-warning": vt, "--n-border-focus-warning": St, "--n-border-hover-warning": Tt, "--n-border-active-warning": at, "--n-color-active-error": _t, "--n-box-shadow-focus-error": Gt, "--n-box-shadow-active-error": Ve, "--n-box-shadow-hover-error": Ze, "--n-border-error": Sn, "--n-border-focus-error": kn, "--n-border-hover-error": Rn, "--n-border-active-error": Pn, "--n-clear-size": On, "--n-clear-color": zn, "--n-clear-color-hover": Fn, "--n-clear-color-pressed": $n, "--n-arrow-size": Tn, "--n-font-weight": Se };
  }), _e = je ? Ye("internal-selection", F(() => e.size[0]), Ge, e) : void 0;
  return { mergedTheme: b, mergedClearable: w, mergedClsPrefix: t, rtlEnabled: o, patternInputFocused: h, filterablePlaceholder: $, label: x, selected: C, showTagsPanel: u, isComposing: B, counterRef: f, counterWrapperRef: p, patternInputMirrorRef: r, patternInputRef: i, selfRef: a, multipleElRef: l, singleElRef: s, patternInputWrapperRef: c, overflowRef: m, inputTagElRef: g, handleMouseDown: W, handleFocusin: k, handleClear: _, handleMouseEnter: z, handleMouseLeave: L, handleDeleteOption: Z, handlePatternKeyDown: j, handlePatternInputInput: P, handlePatternInputBlur: ge, handlePatternInputFocus: me, handleMouseEnterCounter: be, handleMouseLeaveCounter: $e, handleFocusout: R, handleCompositionEnd: ue, handleCompositionStart: E, onPopoverUpdateShow: ke, focus: K, focusInput: de, blur: se, blurInput: Ce, updateCounter: we, getCounter: Fe, getTail: Ne, renderLabel: e.renderLabel, cssVars: je ? void 0 : Ge, themeClass: _e == null ? void 0 : _e.themeClass, onRender: _e == null ? void 0 : _e.onRender };
}, render() {
  const { status: e, multiple: t, size: n, disabled: o, filterable: r, maxTagCount: i, bordered: a, clsPrefix: l, ellipsisTagPopoverProps: s, onRender: c, renderTag: f, renderLabel: p } = this;
  c == null ? void 0 : c();
  const m = i === "responsive", g = typeof i == "number", u = m || g, h = d(Ol, null, { default: () => d(ql, { clsPrefix: l, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, { default: () => {
    var b, w;
    return (w = (b = this.$slots).arrow) === null || w === void 0 ? void 0 : w.call(b);
  } }) });
  let v;
  if (t) {
    const { labelField: b } = this, w = (y) => d("div", { class: `${l}-base-selection-tag-wrapper`, key: y.value }, f ? f({ option: y, handleClose: () => {
      this.handleDeleteOption(y);
    } }) : d(Vn, { size: n, closable: !y.disabled, disabled: o, onClose: () => {
      this.handleDeleteOption(y);
    }, internalCloseIsButtonTag: false, internalCloseFocusable: false }, { default: () => p ? p(y, true) : pt(y[b], y, true) })), $ = () => (g ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), x = r ? d("div", { class: `${l}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" }, d("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: o, value: this.pattern, autofocus: this.autofocus, class: `${l}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), d("span", { ref: "patternInputMirrorRef", class: `${l}-base-selection-input-tag__mirror` }, this.pattern)) : null, C = m ? () => d("div", { class: `${l}-base-selection-tag-wrapper`, ref: "counterWrapperRef" }, d(Vn, { size: n, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: o })) : void 0;
    let M;
    if (g) {
      const y = this.selectedOptions.length - i;
      y > 0 && (M = d("div", { class: `${l}-base-selection-tag-wrapper`, key: "__counter__" }, d(Vn, { size: n, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: o }, { default: () => `+${y}` })));
    }
    const T = m ? r ? d(Zo, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: $, counter: C, tail: () => x }) : d(Zo, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: $, counter: C }) : g && M ? $().concat(M) : $(), V = u ? () => d("div", { class: `${l}-base-selection-popover` }, m ? $() : this.selectedOptions.map(w)) : void 0, N = u ? Object.assign({ show: this.showTagsPanel, trigger: "hover", overlap: true, placement: "top", width: "trigger", onUpdateShow: this.onPopoverUpdateShow, theme: this.mergedTheme.peers.Popover, themeOverrides: this.mergedTheme.peerOverrides.Popover }, s) : null, q = (this.selected ? false : this.active ? !this.pattern && !this.isComposing : true) ? d("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay` }, d("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)) : null, I = r ? d("div", { ref: "patternInputWrapperRef", class: `${l}-base-selection-tags` }, T, m ? null : x, h) : d("div", { ref: "multipleElRef", class: `${l}-base-selection-tags`, tabindex: o ? void 0 : 0 }, T, h);
    v = d(dt, null, u ? d(tn, Object.assign({}, N, { scrollable: true, style: "max-height: calc(var(--v-target-height) * 6.6);" }), { trigger: () => I, default: V }) : I, q);
  } else if (r) {
    const b = this.pattern || this.isComposing, w = this.active ? !b : !this.selected, $ = this.active ? false : this.selected;
    v = d("div", { ref: "patternInputWrapperRef", class: `${l}-base-selection-label`, title: this.patternInputFocused ? void 0 : Yo(this.label) }, d("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${l}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: o, disabled: o, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), $ ? d("div", { class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`, key: "input" }, d("div", { class: `${l}-base-selection-overlay__wrapper` }, f ? f({ option: this.selectedOption, handleClose: () => {
    } }) : p ? p(this.selectedOption, true) : pt(this.label, this.selectedOption, true))) : null, w ? d("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" }, d("div", { class: `${l}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)) : null, h);
  } else v = d("div", { ref: "singleElRef", class: `${l}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 }, this.label !== void 0 ? d("div", { class: `${l}-base-selection-input`, title: Yo(this.label), key: "input" }, d("div", { class: `${l}-base-selection-input__content` }, f ? f({ option: this.selectedOption, handleClose: () => {
  } }) : p ? p(this.selectedOption, true) : pt(this.label, this.selectedOption, true))) : d("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" }, d("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)), h);
  return d("div", { ref: "selfRef", class: [`${l}-base-selection`, this.rtlEnabled && `${l}-base-selection--rtl`, this.themeClass, e && `${l}-base-selection--${e}-status`, { [`${l}-base-selection--active`]: this.active, [`${l}-base-selection--selected`]: this.selected || this.active && this.pattern, [`${l}-base-selection--disabled`]: this.disabled, [`${l}-base-selection--multiple`]: this.multiple, [`${l}-base-selection--focus`]: this.focused }], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown }, v, a ? d("div", { class: `${l}-base-selection__border` }) : null, a ? d("div", { class: `${l}-base-selection__state-border` }) : null);
} });
function vn(e) {
  return e.type === "group";
}
function yi(e) {
  return e.type === "ignored";
}
function Wn(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return false;
  }
}
function wi(e, t) {
  return { getIsGroup: vn, getIgnored: yi, getKey(o) {
    return vn(o) ? o.name || o.key || "key-required" : o[e];
  }, getChildren(o) {
    return o[t];
  } };
}
function Bd(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const a = [];
    for (const l of i) if (vn(l)) {
      const s = r(l[o]);
      s.length && a.push(Object.assign({}, l, { [o]: s }));
    } else {
      if (yi(l)) continue;
      t(n, l) && a.push(l);
    }
    return a;
  }
  return r(e);
}
function Ad(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    vn(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
const xi = qe("n-checkbox-group"), Ed = { min: Number, max: Number, size: String, value: Array, defaultValue: { type: Array, default: null }, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onChange: [Function, Array] }, Ld = le({ name: "CheckboxGroup", props: Ed, setup(e) {
  const { mergedClsPrefixRef: t } = Te(e), n = en(e), { mergedSizeRef: o, mergedDisabledRef: r } = n, i = D(e.defaultValue), a = F(() => e.value), l = Qe(a, i), s = F(() => {
    var p;
    return ((p = l.value) === null || p === void 0 ? void 0 : p.length) || 0;
  }), c = F(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
  function f(p, m) {
    const { nTriggerFormInput: g, nTriggerFormChange: u } = n, { onChange: h, "onUpdate:value": v, onUpdateValue: b } = e;
    if (Array.isArray(l.value)) {
      const w = Array.from(l.value), $ = w.findIndex((x) => x === m);
      p ? ~$ || (w.push(m), b && ne(b, w, { actionType: "check", value: m }), v && ne(v, w, { actionType: "check", value: m }), g(), u(), i.value = w, h && ne(h, w)) : ~$ && (w.splice($, 1), b && ne(b, w, { actionType: "uncheck", value: m }), v && ne(v, w, { actionType: "uncheck", value: m }), h && ne(h, w), i.value = w, g(), u());
    } else p ? (b && ne(b, [m], { actionType: "check", value: m }), v && ne(v, [m], { actionType: "check", value: m }), h && ne(h, [m]), i.value = [m], g(), u()) : (b && ne(b, [], { actionType: "uncheck", value: m }), v && ne(v, [], { actionType: "uncheck", value: m }), h && ne(h, []), i.value = [], g(), u());
  }
  return Ee(xi, { checkedCountRef: s, maxRef: oe(e, "max"), minRef: oe(e, "min"), valueSetRef: c, disabledRef: r, mergedSizeRef: o, toggleCheckbox: f }), { mergedClsPrefix: t };
}, render() {
  return d("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
} }), Nd = () => d("svg", { viewBox: "0 0 64 64", class: "check-icon" }, d("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })), Dd = () => d("svg", { viewBox: "0 0 100 100", class: "line-icon" }, d("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })), Kd = X([O("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [G("show-label", "line-height: var(--n-label-line-height);"), X("&:hover", [O("checkbox-box", [Q("border", "border: var(--n-border-checked);")])]), X("&:focus:not(:active)", [O("checkbox-box", [Q("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), G("inside-table", [O("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), G("checked", [O("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [O("checkbox-icon", [X(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), G("indeterminate", [O("checkbox-box", [O("checkbox-icon", [X(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), X(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), G("checked, indeterminate", [X("&:focus:not(:active)", [O("checkbox-box", [Q("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), O("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [Q("border", { border: "var(--n-border-checked)" })])]), G("disabled", { cursor: "not-allowed" }, [G("checked", [O("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [Q("border", { border: "var(--n-border-disabled-checked)" }), O("checkbox-icon", [X(".check-icon, .line-icon", { fill: "var(--n-check-mark-color-disabled-checked)" })])])]), O("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [Q("border", `
 border: var(--n-border-disabled);
 `), O("checkbox-icon", [X(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), Q("label", `
 color: var(--n-text-color-disabled);
 `)]), O("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), O("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [Q("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), O("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [X(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), Dt({ left: "1px", top: "1px" })])]), Q("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [X("&:empty", { display: "none" })])]), Nr(O("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)), Dr(O("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))]), jd = Object.assign(Object.assign({}, ye.props), { size: String, checked: { type: [Boolean, String, Number], default: void 0 }, defaultChecked: { type: [Boolean, String, Number], default: false }, value: [String, Number], disabled: { type: Boolean, default: void 0 }, indeterminate: Boolean, label: String, focusable: { type: Boolean, default: true }, checkedValue: { type: [Boolean, String, Number], default: true }, uncheckedValue: { type: [Boolean, String, Number], default: false }, "onUpdate:checked": [Function, Array], onUpdateChecked: [Function, Array], privateInsideTable: Boolean, onChange: [Function, Array] }), Oo = le({ name: "Checkbox", props: jd, setup(e) {
  const t = xe(xi, null), n = D(null), { mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Te(e), l = D(e.defaultChecked), s = oe(e, "checked"), c = Qe(s, l), f = Pe(() => {
    if (t) {
      const T = t.valueSetRef.value;
      return T && e.value !== void 0 ? T.has(e.value) : false;
    } else return c.value === e.checkedValue;
  }), p = en(e, { mergedSize(T) {
    var V, N;
    const { size: H } = e;
    if (H !== void 0) return H;
    if (t) {
      const { value: I } = t.mergedSizeRef;
      if (I !== void 0) return I;
    }
    if (T) {
      const { mergedSize: I } = T;
      if (I !== void 0) return I.value;
    }
    const q = (N = (V = a == null ? void 0 : a.value) === null || V === void 0 ? void 0 : V.Checkbox) === null || N === void 0 ? void 0 : N.size;
    return q || "medium";
  }, mergedDisabled(T) {
    const { disabled: V } = e;
    if (V !== void 0) return V;
    if (t) {
      if (t.disabledRef.value) return true;
      const { maxRef: { value: N }, checkedCountRef: H } = t;
      if (N !== void 0 && H.value >= N && !f.value) return true;
      const { minRef: { value: q } } = t;
      if (q !== void 0 && H.value <= q && f.value) return true;
    }
    return T ? T.disabled.value : false;
  } }), { mergedDisabledRef: m, mergedSizeRef: g } = p, u = ye("Checkbox", "-checkbox", Kd, Ml, e, o);
  function h(T) {
    if (t && e.value !== void 0) t.toggleCheckbox(!f.value, e.value);
    else {
      const { onChange: V, "onUpdate:checked": N, onUpdateChecked: H } = e, { nTriggerFormInput: q, nTriggerFormChange: I } = p, y = f.value ? e.uncheckedValue : e.checkedValue;
      N && ne(N, y, T), H && ne(H, y, T), V && ne(V, y, T), q(), I(), l.value = y;
    }
  }
  function v(T) {
    m.value || h(T);
  }
  function b(T) {
    if (!m.value) switch (T.key) {
      case " ":
      case "Enter":
        h(T);
    }
  }
  function w(T) {
    switch (T.key) {
      case " ":
        T.preventDefault();
    }
  }
  const $ = { focus: () => {
    var T;
    (T = n.value) === null || T === void 0 || T.focus();
  }, blur: () => {
    var T;
    (T = n.value) === null || T === void 0 || T.blur();
  } }, x = mt("Checkbox", i, o), C = F(() => {
    const { value: T } = g, { common: { cubicBezierEaseInOut: V }, self: { borderRadius: N, color: H, colorChecked: q, colorDisabled: I, colorTableHeader: y, colorTableHeaderModal: k, colorTableHeaderPopover: R, checkMarkColor: _, checkMarkColorDisabled: z, border: L, borderFocus: W, borderDisabled: Z, borderChecked: B, boxShadowFocus: j, textColor: ee, textColorDisabled: P, checkMarkColorDisabledChecked: E, colorDisabledChecked: ue, borderDisabledChecked: me, labelPadding: ge, labelLineHeight: se, labelFontWeight: K, [pe("fontSize", T)]: de, [pe("size", T)]: Ce } } = u.value;
    return { "--n-label-line-height": se, "--n-label-font-weight": K, "--n-size": Ce, "--n-bezier": V, "--n-border-radius": N, "--n-border": L, "--n-border-checked": B, "--n-border-focus": W, "--n-border-disabled": Z, "--n-border-disabled-checked": me, "--n-box-shadow-focus": j, "--n-color": H, "--n-color-checked": q, "--n-color-table": y, "--n-color-table-modal": k, "--n-color-table-popover": R, "--n-color-disabled": I, "--n-color-disabled-checked": ue, "--n-text-color": ee, "--n-text-color-disabled": P, "--n-check-mark-color": _, "--n-check-mark-color-disabled": z, "--n-check-mark-color-disabled-checked": E, "--n-font-size": de, "--n-label-padding": ge };
  }), M = r ? Ye("checkbox", F(() => g.value[0]), C, e) : void 0;
  return Object.assign(p, $, { rtlEnabled: x, selfRef: n, mergedClsPrefix: o, mergedDisabled: m, renderedChecked: f, mergedTheme: u, labelId: ho(), handleClick: v, handleKeyUp: b, handleKeyDown: w, cssVars: r ? void 0 : C, themeClass: M == null ? void 0 : M.themeClass, onRender: M == null ? void 0 : M.onRender });
}, render() {
  var e;
  const { $slots: t, renderedChecked: n, mergedDisabled: o, indeterminate: r, privateInsideTable: i, cssVars: a, labelId: l, label: s, mergedClsPrefix: c, focusable: f, handleKeyUp: p, handleKeyDown: m, handleClick: g } = this;
  (e = this.onRender) === null || e === void 0 || e.call(this);
  const u = xt(t.default, (h) => s || h ? d("span", { class: `${c}-checkbox__label`, id: l }, s || h) : null);
  return d("div", { ref: "selfRef", class: [`${c}-checkbox`, this.themeClass, this.rtlEnabled && `${c}-checkbox--rtl`, n && `${c}-checkbox--checked`, o && `${c}-checkbox--disabled`, r && `${c}-checkbox--indeterminate`, i && `${c}-checkbox--inside-table`, u && `${c}-checkbox--show-label`], tabindex: o || !f ? void 0 : 0, role: "checkbox", "aria-checked": r ? "mixed" : n, "aria-labelledby": l, style: a, onKeyup: p, onKeydown: m, onClick: g, onMousedown: () => {
    Ue("selectstart", window, (h) => {
      h.preventDefault();
    }, { once: true });
  } }, d("div", { class: `${c}-checkbox-box-wrapper` }, "\xA0", d("div", { class: `${c}-checkbox-box` }, d(Kr, null, { default: () => this.indeterminate ? d("div", { key: "indeterminate", class: `${c}-checkbox-icon` }, Dd()) : d("div", { key: "check", class: `${c}-checkbox-icon` }, Nd()) }), d("div", { class: `${c}-checkbox-box__border` }))), u);
} }), Ci = qe("n-popselect"), Hd = O("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), To = { multiple: Boolean, value: { type: [String, Number, Array], default: null }, cancelable: Boolean, options: { type: Array, default: () => [] }, size: String, scrollable: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onMouseenter: Function, onMouseleave: Function, renderLabel: Function, showCheckmark: { type: Boolean, default: void 0 }, nodeProps: Function, virtualScroll: Boolean, onChange: [Function, Array] }, xr = Il(To), Ud = le({ name: "PopselectPanel", props: To, setup(e) {
  const t = xe(Ci), { mergedClsPrefixRef: n, inlineThemeDisabled: o, mergedComponentPropsRef: r } = Te(e), i = F(() => {
    var u, h;
    return e.size || ((h = (u = r == null ? void 0 : r.value) === null || u === void 0 ? void 0 : u.Popselect) === null || h === void 0 ? void 0 : h.size) || "medium";
  }), a = ye("Popselect", "-pop-select", Hd, jr, t.props, n), l = F(() => wn(e.options, wi("value", "children")));
  function s(u, h) {
    const { onUpdateValue: v, "onUpdate:value": b, onChange: w } = e;
    v && ne(v, u, h), b && ne(b, u, h), w && ne(w, u, h);
  }
  function c(u) {
    p(u.key);
  }
  function f(u) {
    !rt(u, "action") && !rt(u, "empty") && !rt(u, "header") && u.preventDefault();
  }
  function p(u) {
    const { value: { getNode: h } } = l;
    if (e.multiple) if (Array.isArray(e.value)) {
      const v = [], b = [];
      let w = true;
      e.value.forEach(($) => {
        if ($ === u) {
          w = false;
          return;
        }
        const x = h($);
        x && (v.push(x.key), b.push(x.rawNode));
      }), w && (v.push(u), b.push(h(u).rawNode)), s(v, b);
    } else {
      const v = h(u);
      v && s([u], [v.rawNode]);
    }
    else if (e.value === u && e.cancelable) s(null, null);
    else {
      const v = h(u);
      v && s(u, v.rawNode);
      const { "onUpdate:show": b, onUpdateShow: w } = t.props;
      b && ne(b, false), w && ne(w, false), t.setShow(false);
    }
    Mt(() => {
      t.syncPosition();
    });
  }
  Ae(oe(e, "options"), () => {
    Mt(() => {
      t.syncPosition();
    });
  });
  const m = F(() => {
    const { self: { menuBoxShadow: u } } = a.value;
    return { "--n-menu-box-shadow": u };
  }), g = o ? Ye("select", void 0, m, t.props) : void 0;
  return { mergedTheme: t.mergedThemeRef, mergedClsPrefix: n, treeMate: l, handleToggle: c, handleMenuMousedown: f, cssVars: o ? void 0 : m, themeClass: g == null ? void 0 : g.themeClass, onRender: g == null ? void 0 : g.onRender, mergedSize: i, scrollbarProps: t.props.scrollbarProps };
}, render() {
  var e;
  return (e = this.onRender) === null || e === void 0 || e.call(this), d(gi, { clsPrefix: this.mergedClsPrefix, focusable: true, nodeProps: this.nodeProps, class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass], style: this.cssVars, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, multiple: this.multiple, treeMate: this.treeMate, size: this.mergedSize, value: this.value, virtualScroll: this.virtualScroll, scrollable: this.scrollable, scrollbarProps: this.scrollbarProps, renderLabel: this.renderLabel, onToggle: this.handleToggle, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseenter, onMousedown: this.handleMenuMousedown, showCheckmark: this.showCheckmark }, { header: () => {
    var t, n;
    return ((n = (t = this.$slots).header) === null || n === void 0 ? void 0 : n.call(t)) || [];
  }, action: () => {
    var t, n;
    return ((n = (t = this.$slots).action) === null || n === void 0 ? void 0 : n.call(t)) || [];
  }, empty: () => {
    var t, n;
    return ((n = (t = this.$slots).empty) === null || n === void 0 ? void 0 : n.call(t)) || [];
  } });
} }), Vd = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ye.props), Hr(Vt, ["showArrow", "arrow"])), { placement: Object.assign(Object.assign({}, Vt.placement), { default: "bottom" }), trigger: { type: String, default: "hover" } }), To), { scrollbarProps: Object }), Wd = le({ name: "Popselect", props: Vd, slots: Object, inheritAttrs: false, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Te(e), n = ye("Popselect", "-popselect", void 0, jr, e, t), o = D(null);
  function r() {
    var l;
    (l = o.value) === null || l === void 0 || l.syncPosition();
  }
  function i(l) {
    var s;
    (s = o.value) === null || s === void 0 || s.setShow(l);
  }
  return Ee(Ci, { props: e, mergedThemeRef: n, syncPosition: r, setShow: i }), Object.assign(Object.assign({}, { syncPosition: r, setShow: i }), { popoverInstRef: o, mergedTheme: n });
}, render() {
  const { mergedTheme: e } = this, t = { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: { padding: "0" }, ref: "popoverInstRef", internalRenderBody: (n, o, r, i, a) => {
    const { $attrs: l } = this;
    return d(Ud, Object.assign({}, l, { class: [l.class, n], style: [l.style, ...r] }, bo(this.$props, xr), { ref: si(o), onMouseenter: Zt([i, l.onMouseenter]), onMouseleave: Zt([a, l.onMouseleave]) }), { header: () => {
      var s, c;
      return (c = (s = this.$slots).header) === null || c === void 0 ? void 0 : c.call(s);
    }, action: () => {
      var s, c;
      return (c = (s = this.$slots).action) === null || c === void 0 ? void 0 : c.call(s);
    }, empty: () => {
      var s, c;
      return (c = (s = this.$slots).empty) === null || c === void 0 ? void 0 : c.call(s);
    } });
  } };
  return d(tn, Object.assign({}, Hr(this.$props, xr), t, { internalDeactivateImmediately: true }), { trigger: () => {
    var n, o;
    return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
  } });
} }), Gd = X([O("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), O("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [xn({ originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)" })])]), qd = Object.assign(Object.assign({}, ye.props), { to: gt.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, clearCreatedOptionsOnClear: { type: Boolean, default: true }, clearFilterAfterSelect: { type: Boolean, default: true }, options: { type: Array, default: () => [] }, defaultValue: { type: [String, Number, Array], default: null }, keyboard: { type: Boolean, default: true }, value: [String, Number, Array], placeholder: String, menuProps: Object, multiple: Boolean, size: String, menuSize: { type: String }, filterable: Boolean, disabled: { type: Boolean, default: void 0 }, remote: Boolean, loading: Boolean, filter: Function, placement: { type: String, default: "bottom-start" }, widthMode: { type: String, default: "trigger" }, tag: Boolean, onCreate: Function, fallbackOption: { type: [Function, Boolean], default: void 0 }, show: { type: Boolean, default: void 0 }, showArrow: { type: Boolean, default: true }, maxTagCount: [Number, String], ellipsisTagPopoverProps: Object, consistentMenuWidth: { type: Boolean, default: true }, virtualScroll: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, childrenField: { type: String, default: "children" }, renderLabel: Function, renderOption: Function, renderTag: Function, "onUpdate:value": [Function, Array], inputProps: Object, nodeProps: Function, ignoreComposition: { type: Boolean, default: true }, showOnFocus: Boolean, onUpdateValue: [Function, Array], onBlur: [Function, Array], onClear: [Function, Array], onFocus: [Function, Array], onScroll: [Function, Array], onSearch: [Function, Array], onUpdateShow: [Function, Array], "onUpdate:show": [Function, Array], displayDirective: { type: String, default: "show" }, resetMenuOnOptionsChange: { type: Boolean, default: true }, status: String, showCheckmark: { type: Boolean, default: true }, scrollbarProps: Object, onChange: [Function, Array], items: Array }), Xd = le({ name: "Select", props: qd, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, mergedBorderedRef: n, namespaceRef: o, inlineThemeDisabled: r, mergedComponentPropsRef: i } = Te(e), a = ye("Select", "-select", Gd, _l, e, t), l = D(e.defaultValue), s = oe(e, "value"), c = Qe(s, l), f = D(false), p = D(""), m = Gr(e, ["items", "options"]), g = D([]), u = D([]), h = F(() => u.value.concat(g.value).concat(m.value)), v = F(() => {
    const { filter: S } = e;
    if (S) return S;
    const { labelField: A, valueField: te } = e;
    return (fe, J) => {
      if (!J) return false;
      const ie = J[A];
      if (typeof ie == "string") return Wn(fe, ie);
      const ae = J[te];
      return typeof ae == "string" ? Wn(fe, ae) : typeof ae == "number" ? Wn(fe, String(ae)) : false;
    };
  }), b = F(() => {
    if (e.remote) return m.value;
    {
      const { value: S } = h, { value: A } = p;
      return !A.length || !e.filterable ? S : Bd(S, v.value, A, e.childrenField);
    }
  }), w = F(() => {
    const { valueField: S, childrenField: A } = e, te = wi(S, A);
    return wn(b.value, te);
  }), $ = F(() => Ad(h.value, e.valueField, e.childrenField)), x = D(false), C = Qe(oe(e, "show"), x), M = D(null), T = D(null), V = D(null), { localeRef: N } = bn("Select"), H = F(() => {
    var S;
    return (S = e.placeholder) !== null && S !== void 0 ? S : N.value.placeholder;
  }), q = [], I = D(/* @__PURE__ */ new Map()), y = F(() => {
    const { fallbackOption: S } = e;
    if (S === void 0) {
      const { labelField: A, valueField: te } = e;
      return (fe) => ({ [A]: String(fe), [te]: fe });
    }
    return S === false ? false : (A) => Object.assign(S(A), { value: A });
  });
  function k(S) {
    const A = e.remote, { value: te } = I, { value: fe } = $, { value: J } = y, ie = [];
    return S.forEach((ae) => {
      if (fe.has(ae)) ie.push(fe.get(ae));
      else if (A && te.has(ae)) ie.push(te.get(ae));
      else if (J) {
        const ve = J(ae);
        ve && ie.push(ve);
      }
    }), ie;
  }
  const R = F(() => {
    if (e.multiple) {
      const { value: S } = c;
      return Array.isArray(S) ? k(S) : [];
    }
    return null;
  }), _ = F(() => {
    const { value: S } = c;
    return !e.multiple && !Array.isArray(S) ? S === null ? null : k([S])[0] || null : null;
  }), z = en(e, { mergedSize: (S) => {
    var A, te;
    const { size: fe } = e;
    if (fe) return fe;
    const { mergedSize: J } = S || {};
    if (J == null ? void 0 : J.value) return J.value;
    const ie = (te = (A = i == null ? void 0 : i.value) === null || A === void 0 ? void 0 : A.Select) === null || te === void 0 ? void 0 : te.size;
    return ie || "medium";
  } }), { mergedSizeRef: L, mergedDisabledRef: W, mergedStatusRef: Z } = z;
  function B(S, A) {
    const { onChange: te, "onUpdate:value": fe, onUpdateValue: J } = e, { nTriggerFormChange: ie, nTriggerFormInput: ae } = z;
    te && ne(te, S, A), J && ne(J, S, A), fe && ne(fe, S, A), l.value = S, ie(), ae();
  }
  function j(S) {
    const { onBlur: A } = e, { nTriggerFormBlur: te } = z;
    A && ne(A, S), te();
  }
  function ee() {
    const { onClear: S } = e;
    S && ne(S);
  }
  function P(S) {
    const { onFocus: A, showOnFocus: te } = e, { nTriggerFormFocus: fe } = z;
    A && ne(A, S), fe(), te && se();
  }
  function E(S) {
    const { onSearch: A } = e;
    A && ne(A, S);
  }
  function ue(S) {
    const { onScroll: A } = e;
    A && ne(A, S);
  }
  function me() {
    var S;
    const { remote: A, multiple: te } = e;
    if (A) {
      const { value: fe } = I;
      if (te) {
        const { valueField: J } = e;
        (S = R.value) === null || S === void 0 || S.forEach((ie) => {
          fe.set(ie[J], ie);
        });
      } else {
        const J = _.value;
        J && fe.set(J[e.valueField], J);
      }
    }
  }
  function ge(S) {
    const { onUpdateShow: A, "onUpdate:show": te } = e;
    A && ne(A, S), te && ne(te, S), x.value = S;
  }
  function se() {
    W.value || (ge(true), x.value = true, e.filterable && et());
  }
  function K() {
    ge(false);
  }
  function de() {
    p.value = "", u.value = q;
  }
  const Ce = D(false);
  function we() {
    e.filterable && (Ce.value = true);
  }
  function Fe() {
    e.filterable && (Ce.value = false, C.value || de());
  }
  function Ne() {
    W.value || (C.value ? e.filterable ? et() : K() : se());
  }
  function Ke(S) {
    var A, te;
    !((te = (A = V.value) === null || A === void 0 ? void 0 : A.selfRef) === null || te === void 0) && te.contains(S.relatedTarget) || (f.value = false, j(S), K());
  }
  function ce(S) {
    P(S), f.value = true;
  }
  function be() {
    f.value = true;
  }
  function $e(S) {
    var A;
    !((A = M.value) === null || A === void 0) && A.$el.contains(S.relatedTarget) || (f.value = false, j(S), K());
  }
  function ke() {
    var S;
    (S = M.value) === null || S === void 0 || S.focus(), K();
  }
  function je(S) {
    var A;
    C.value && (!((A = M.value) === null || A === void 0) && A.$el.contains(sn(S)) || K());
  }
  function Ge(S) {
    if (!Array.isArray(S)) return [];
    if (y.value) return Array.from(S);
    {
      const { remote: A } = e, { value: te } = $;
      if (A) {
        const { value: fe } = I;
        return S.filter((J) => te.has(J) || fe.has(J));
      } else return S.filter((fe) => te.has(fe));
    }
  }
  function _e(S) {
    U(S.rawNode);
  }
  function U(S) {
    if (W.value) return;
    const { tag: A, remote: te, clearFilterAfterSelect: fe, valueField: J } = e;
    if (A && !te) {
      const { value: ie } = u, ae = ie[0] || null;
      if (ae) {
        const ve = g.value;
        ve.length ? ve.push(ae) : g.value = [ae], u.value = q;
      }
    }
    if (te && I.value.set(S[J], S), e.multiple) {
      const ie = Ge(c.value), ae = ie.findIndex((ve) => ve === S[J]);
      if (~ae) {
        if (ie.splice(ae, 1), A && !te) {
          const ve = Y(S[J]);
          ~ve && (g.value.splice(ve, 1), fe && (p.value = ""));
        }
      } else ie.push(S[J]), fe && (p.value = "");
      B(ie, k(ie));
    } else {
      if (A && !te) {
        const ie = Y(S[J]);
        ~ie ? g.value = [g.value[ie]] : g.value = q;
      }
      Oe(), K(), B(S[J], S);
    }
  }
  function Y(S) {
    return g.value.findIndex((te) => te[e.valueField] === S);
  }
  function Se(S) {
    C.value || se();
    const { value: A } = S.target;
    p.value = A;
    const { tag: te, remote: fe } = e;
    if (E(A), te && !fe) {
      if (!A) {
        u.value = q;
        return;
      }
      const { onCreate: J } = e, ie = J ? J(A) : { [e.labelField]: A, [e.valueField]: A }, { valueField: ae, labelField: ve } = e;
      m.value.some((ze) => ze[ae] === ie[ae] || ze[ve] === ie[ve]) || g.value.some((ze) => ze[ae] === ie[ae] || ze[ve] === ie[ve]) ? u.value = q : u.value = [ie];
    }
  }
  function it(S) {
    S.stopPropagation();
    const { multiple: A, tag: te, remote: fe, clearCreatedOptionsOnClear: J } = e;
    !A && e.filterable && K(), te && !fe && J && (g.value = q), ee(), A ? B([], []) : B(null, null);
  }
  function De(S) {
    !rt(S, "action") && !rt(S, "empty") && !rt(S, "header") && S.preventDefault();
  }
  function Me(S) {
    ue(S);
  }
  function Xe(S) {
    var A, te, fe, J, ie;
    if (!e.keyboard) {
      S.preventDefault();
      return;
    }
    switch (S.key) {
      case " ":
        if (e.filterable) break;
        S.preventDefault();
      case "Enter":
        if (!(!((A = M.value) === null || A === void 0) && A.isComposing)) {
          if (C.value) {
            const ae = (te = V.value) === null || te === void 0 ? void 0 : te.getPendingTmNode();
            ae ? _e(ae) : e.filterable || (K(), Oe());
          } else if (se(), e.tag && Ce.value) {
            const ae = u.value[0];
            if (ae) {
              const ve = ae[e.valueField], { value: ze } = c;
              e.multiple && Array.isArray(ze) && ze.includes(ve) || U(ae);
            }
          }
        }
        S.preventDefault();
        break;
      case "ArrowUp":
        if (S.preventDefault(), e.loading) return;
        C.value && ((fe = V.value) === null || fe === void 0 || fe.prev());
        break;
      case "ArrowDown":
        if (S.preventDefault(), e.loading) return;
        C.value ? (J = V.value) === null || J === void 0 || J.next() : se();
        break;
      case "Escape":
        C.value && (Ra(S), K()), (ie = M.value) === null || ie === void 0 || ie.focus();
        break;
    }
  }
  function Oe() {
    var S;
    (S = M.value) === null || S === void 0 || S.focus();
  }
  function et() {
    var S;
    (S = M.value) === null || S === void 0 || S.focusInput();
  }
  function tt() {
    var S;
    C.value && ((S = T.value) === null || S === void 0 || S.syncPosition());
  }
  me(), Ae(oe(e, "options"), me);
  const Je = { focus: () => {
    var S;
    (S = M.value) === null || S === void 0 || S.focus();
  }, focusInput: () => {
    var S;
    (S = M.value) === null || S === void 0 || S.focusInput();
  }, blur: () => {
    var S;
    (S = M.value) === null || S === void 0 || S.blur();
  }, blurInput: () => {
    var S;
    (S = M.value) === null || S === void 0 || S.blurInput();
  } }, re = F(() => {
    const { self: { menuBoxShadow: S } } = a.value;
    return { "--n-menu-box-shadow": S };
  }), he = r ? Ye("select", void 0, re, e) : void 0;
  return Object.assign(Object.assign({}, Je), { mergedStatus: Z, mergedClsPrefix: t, mergedBordered: n, namespace: o, treeMate: w, isMounted: fo(), triggerRef: M, menuRef: V, pattern: p, uncontrolledShow: x, mergedShow: C, adjustedTo: gt(e), uncontrolledValue: l, mergedValue: c, followerRef: T, localizedPlaceholder: H, selectedOption: _, selectedOptions: R, mergedSize: L, mergedDisabled: W, focused: f, activeWithoutMenuOpen: Ce, inlineThemeDisabled: r, onTriggerInputFocus: we, onTriggerInputBlur: Fe, handleTriggerOrMenuResize: tt, handleMenuFocus: be, handleMenuBlur: $e, handleMenuTabOut: ke, handleTriggerClick: Ne, handleToggle: _e, handleDeleteOption: U, handlePatternInput: Se, handleClear: it, handleTriggerBlur: Ke, handleTriggerFocus: ce, handleKeydown: Xe, handleMenuAfterLeave: de, handleMenuClickOutside: je, handleMenuScroll: Me, handleMenuKeydown: Xe, handleMenuMousedown: De, mergedTheme: a, cssVars: r ? void 0 : re, themeClass: he == null ? void 0 : he.themeClass, onRender: he == null ? void 0 : he.onRender });
}, render() {
  return d("div", { class: `${this.mergedClsPrefix}-select` }, d(Co, null, { default: () => [d(So, null, { default: () => d(_d, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, ellipsisTagPopoverProps: this.ellipsisTagPopoverProps, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, { arrow: () => {
    var e, t;
    return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
  } }) }), d(Ro, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === gt.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, { default: () => d(Qt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, { default: () => {
    var e, t, n;
    return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Jt(d(gi, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (t = this.menuProps) === null || t === void 0 ? void 0 : t.class], clsPrefix: this.mergedClsPrefix, focusable: true, labelField: this.labelField, valueField: this.valueField, autoPending: true, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: this.menuSize, renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(n = this.menuProps) === null || n === void 0 ? void 0 : n.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange, scrollbarProps: this.scrollbarProps }), { empty: () => {
      var o, r;
      return [(r = (o = this.$slots).empty) === null || r === void 0 ? void 0 : r.call(o)];
    }, header: () => {
      var o, r;
      return [(r = (o = this.$slots).header) === null || r === void 0 ? void 0 : r.call(o)];
    }, action: () => {
      var o, r;
      return [(r = (o = this.$slots).action) === null || r === void 0 ? void 0 : r.call(o)];
    } }), this.displayDirective === "show" ? [[Er, this.mergedShow], [un, this.handleMenuClickOutside, void 0, { capture: true }]] : [[un, this.handleMenuClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), Cr = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, Sr = [G("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], Zd = O("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [O("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), O("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), X("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), O("select", `
 width: var(--n-select-width);
 `), X("&.transition-disabled", [O("pagination-item", "transition: none!important;")]), O("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [O("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), O("pagination-item", `
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `, [G("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [O("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), Le("disabled", [G("hover", Cr, Sr), X("&:hover", Cr, Sr), X("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [G("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), G("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [X("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), G("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [G("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), G("disabled", `
 cursor: not-allowed;
 `, [O("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), G("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [O("pagination-quick-jumper", [O("input", `
 margin: 0;
 `)])])]);
function Si(e) {
  var t;
  if (!e) return 10;
  const { defaultPageSize: n } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function Yd(e, t, n, o) {
  let r = false, i = false, a = 1, l = t;
  if (t === 1) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: l, fastBackwardTo: a, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }] };
  if (t === 2) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: l, fastBackwardTo: a, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }, { type: "page", label: 2, active: e === 2, mayBeFastBackward: true, mayBeFastForward: false }] };
  const s = 1, c = t;
  let f = e, p = e;
  const m = (n - 5) / 2;
  p += Math.ceil(m), p = Math.min(Math.max(p, s + n - 3), c - 2), f -= Math.floor(m), f = Math.max(Math.min(f, c - n + 3), s + 2);
  let g = false, u = false;
  f > s + 2 && (g = true), p < c - 2 && (u = true);
  const h = [];
  h.push({ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }), g ? (r = true, a = f - 1, h.push({ type: "fast-backward", active: false, label: void 0, options: o ? kr(s + 1, f - 1) : null })) : c >= s + 1 && h.push({ type: "page", label: s + 1, mayBeFastBackward: true, mayBeFastForward: false, active: e === s + 1 });
  for (let v = f; v <= p; ++v) h.push({ type: "page", label: v, mayBeFastBackward: false, mayBeFastForward: false, active: e === v });
  return u ? (i = true, l = p + 1, h.push({ type: "fast-forward", active: false, label: void 0, options: o ? kr(p + 1, c - 1) : null })) : p === c - 2 && h[h.length - 1].label !== c - 1 && h.push({ type: "page", mayBeFastForward: true, mayBeFastBackward: false, label: c - 1, active: e === c - 1 }), h[h.length - 1].label !== c && h.push({ type: "page", mayBeFastForward: false, mayBeFastBackward: false, label: c, active: e === c }), { hasFastBackward: r, hasFastForward: i, fastBackwardTo: a, fastForwardTo: l, items: h };
}
function kr(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o) n.push({ label: `${o}`, value: o });
  return n;
}
const Jd = Object.assign(Object.assign({}, ye.props), { simple: Boolean, page: Number, defaultPage: { type: Number, default: 1 }, itemCount: Number, pageCount: Number, defaultPageCount: { type: Number, default: 1 }, showSizePicker: Boolean, pageSize: Number, defaultPageSize: Number, pageSizes: { type: Array, default() {
  return [10];
} }, showQuickJumper: Boolean, size: String, disabled: Boolean, pageSlot: { type: Number, default: 9 }, selectProps: Object, prev: Function, next: Function, goto: Function, prefix: Function, suffix: Function, label: Function, displayOrder: { type: Array, default: ["pages", "size-picker", "quick-jumper"] }, to: gt.propTo, showQuickJumpDropdown: { type: Boolean, default: true }, scrollbarProps: Object, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], onPageSizeChange: [Function, Array], onChange: [Function, Array] }), Qd = le({ name: "Pagination", props: Jd, slots: Object, setup(e) {
  const { mergedComponentPropsRef: t, mergedClsPrefixRef: n, inlineThemeDisabled: o, mergedRtlRef: r } = Te(e), i = F(() => {
    var K, de;
    return e.size || ((de = (K = t == null ? void 0 : t.value) === null || K === void 0 ? void 0 : K.Pagination) === null || de === void 0 ? void 0 : de.size) || "medium";
  }), a = ye("Pagination", "-pagination", Zd, Bl, e, n), { localeRef: l } = bn("Pagination"), s = D(null), c = D(e.defaultPage), f = D(Si(e)), p = Qe(oe(e, "page"), c), m = Qe(oe(e, "pageSize"), f), g = F(() => {
    const { itemCount: K } = e;
    if (K !== void 0) return Math.max(1, Math.ceil(K / m.value));
    const { pageCount: de } = e;
    return de !== void 0 ? Math.max(de, 1) : 1;
  }), u = D("");
  zt(() => {
    e.simple, u.value = String(p.value);
  });
  const h = D(false), v = D(false), b = D(false), w = D(false), $ = () => {
    e.disabled || (h.value = true, _());
  }, x = () => {
    e.disabled || (h.value = false, _());
  }, C = () => {
    v.value = true, _();
  }, M = () => {
    v.value = false, _();
  }, T = (K) => {
    z(K);
  }, V = F(() => Yd(p.value, g.value, e.pageSlot, e.showQuickJumpDropdown));
  zt(() => {
    V.value.hasFastBackward ? V.value.hasFastForward || (h.value = false, b.value = false) : (v.value = false, w.value = false);
  });
  const N = F(() => {
    const K = l.value.selectionSuffix;
    return e.pageSizes.map((de) => typeof de == "number" ? { label: `${de} / ${K}`, value: de } : de);
  }), H = F(() => {
    var K, de;
    return ((de = (K = t == null ? void 0 : t.value) === null || K === void 0 ? void 0 : K.Pagination) === null || de === void 0 ? void 0 : de.inputSize) || Jo(i.value);
  }), q = F(() => {
    var K, de;
    return ((de = (K = t == null ? void 0 : t.value) === null || K === void 0 ? void 0 : K.Pagination) === null || de === void 0 ? void 0 : de.selectSize) || Jo(i.value);
  }), I = F(() => (p.value - 1) * m.value), y = F(() => {
    const K = p.value * m.value - 1, { itemCount: de } = e;
    return de !== void 0 && K > de - 1 ? de - 1 : K;
  }), k = F(() => {
    const { itemCount: K } = e;
    return K !== void 0 ? K : (e.pageCount || 1) * m.value;
  }), R = mt("Pagination", r, n);
  function _() {
    Mt(() => {
      var K;
      const { value: de } = s;
      de && (de.classList.add("transition-disabled"), (K = s.value) === null || K === void 0 || K.offsetWidth, de.classList.remove("transition-disabled"));
    });
  }
  function z(K) {
    if (K === p.value) return;
    const { "onUpdate:page": de, onUpdatePage: Ce, onChange: we, simple: Fe } = e;
    de && ne(de, K), Ce && ne(Ce, K), we && ne(we, K), c.value = K, Fe && (u.value = String(K));
  }
  function L(K) {
    if (K === m.value) return;
    const { "onUpdate:pageSize": de, onUpdatePageSize: Ce, onPageSizeChange: we } = e;
    de && ne(de, K), Ce && ne(Ce, K), we && ne(we, K), f.value = K, g.value < p.value && z(g.value);
  }
  function W() {
    if (e.disabled) return;
    const K = Math.min(p.value + 1, g.value);
    z(K);
  }
  function Z() {
    if (e.disabled) return;
    const K = Math.max(p.value - 1, 1);
    z(K);
  }
  function B() {
    if (e.disabled) return;
    const K = Math.min(V.value.fastForwardTo, g.value);
    z(K);
  }
  function j() {
    if (e.disabled) return;
    const K = Math.max(V.value.fastBackwardTo, 1);
    z(K);
  }
  function ee(K) {
    L(K);
  }
  function P() {
    const K = Number.parseInt(u.value);
    Number.isNaN(K) || (z(Math.max(1, Math.min(K, g.value))), e.simple || (u.value = ""));
  }
  function E() {
    P();
  }
  function ue(K) {
    if (!e.disabled) switch (K.type) {
      case "page":
        z(K.label);
        break;
      case "fast-backward":
        j();
        break;
      case "fast-forward":
        B();
        break;
    }
  }
  function me(K) {
    u.value = K.replace(/\D+/g, "");
  }
  zt(() => {
    p.value, m.value, _();
  });
  const ge = F(() => {
    const K = i.value, { self: { buttonBorder: de, buttonBorderHover: Ce, buttonBorderPressed: we, buttonIconColor: Fe, buttonIconColorHover: Ne, buttonIconColorPressed: Ke, itemTextColor: ce, itemTextColorHover: be, itemTextColorPressed: $e, itemTextColorActive: ke, itemTextColorDisabled: je, itemColor: Ge, itemColorHover: _e, itemColorPressed: U, itemColorActive: Y, itemColorActiveHover: Se, itemColorDisabled: it, itemBorder: De, itemBorderHover: Me, itemBorderPressed: Xe, itemBorderActive: Oe, itemBorderDisabled: et, itemBorderRadius: tt, jumperTextColor: Je, jumperTextColorDisabled: re, buttonColor: he, buttonColorHover: S, buttonColorPressed: A, [pe("itemPadding", K)]: te, [pe("itemMargin", K)]: fe, [pe("inputWidth", K)]: J, [pe("selectWidth", K)]: ie, [pe("inputMargin", K)]: ae, [pe("selectMargin", K)]: ve, [pe("jumperFontSize", K)]: ze, [pe("prefixMargin", K)]: ut, [pe("suffixMargin", K)]: lt, [pe("itemSize", K)]: ft, [pe("buttonIconSize", K)]: ht, [pe("itemFontSize", K)]: $t, [`${pe("itemMargin", K)}Rtl`]: Ot, [`${pe("inputMargin", K)}Rtl`]: vt }, common: { cubicBezierEaseInOut: St } } = a.value;
    return { "--n-prefix-margin": ut, "--n-suffix-margin": lt, "--n-item-font-size": $t, "--n-select-width": ie, "--n-select-margin": ve, "--n-input-width": J, "--n-input-margin": ae, "--n-input-margin-rtl": vt, "--n-item-size": ft, "--n-item-text-color": ce, "--n-item-text-color-disabled": je, "--n-item-text-color-hover": be, "--n-item-text-color-active": ke, "--n-item-text-color-pressed": $e, "--n-item-color": Ge, "--n-item-color-hover": _e, "--n-item-color-disabled": it, "--n-item-color-active": Y, "--n-item-color-active-hover": Se, "--n-item-color-pressed": U, "--n-item-border": De, "--n-item-border-hover": Me, "--n-item-border-disabled": et, "--n-item-border-active": Oe, "--n-item-border-pressed": Xe, "--n-item-padding": te, "--n-item-border-radius": tt, "--n-bezier": St, "--n-jumper-font-size": ze, "--n-jumper-text-color": Je, "--n-jumper-text-color-disabled": re, "--n-item-margin": fe, "--n-item-margin-rtl": Ot, "--n-button-icon-size": ht, "--n-button-icon-color": Fe, "--n-button-icon-color-hover": Ne, "--n-button-icon-color-pressed": Ke, "--n-button-color-hover": S, "--n-button-color": he, "--n-button-color-pressed": A, "--n-button-border": de, "--n-button-border-hover": Ce, "--n-button-border-pressed": we };
  }), se = o ? Ye("pagination", F(() => {
    let K = "";
    return K += i.value[0], K;
  }), ge, e) : void 0;
  return { rtlEnabled: R, mergedClsPrefix: n, locale: l, selfRef: s, mergedPage: p, pageItems: F(() => V.value.items), mergedItemCount: k, jumperValue: u, pageSizeOptions: N, mergedPageSize: m, inputSize: H, selectSize: q, mergedTheme: a, mergedPageCount: g, startIndex: I, endIndex: y, showFastForwardMenu: b, showFastBackwardMenu: w, fastForwardActive: h, fastBackwardActive: v, handleMenuSelect: T, handleFastForwardMouseenter: $, handleFastForwardMouseleave: x, handleFastBackwardMouseenter: C, handleFastBackwardMouseleave: M, handleJumperInput: me, handleBackwardClick: Z, handleForwardClick: W, handlePageItemClick: ue, handleSizePickerChange: ee, handleQuickJumperChange: E, cssVars: o ? void 0 : ge, themeClass: se == null ? void 0 : se.themeClass, onRender: se == null ? void 0 : se.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, disabled: n, cssVars: o, mergedPage: r, mergedPageCount: i, pageItems: a, showSizePicker: l, showQuickJumper: s, mergedTheme: c, locale: f, inputSize: p, selectSize: m, mergedPageSize: g, pageSizeOptions: u, jumperValue: h, simple: v, prev: b, next: w, prefix: $, suffix: x, label: C, goto: M, handleJumperInput: T, handleSizePickerChange: V, handleBackwardClick: N, handlePageItemClick: H, handleForwardClick: q, handleQuickJumperChange: I, onRender: y } = this;
  y == null ? void 0 : y();
  const k = $ || e.prefix, R = x || e.suffix, _ = b || e.prev, z = w || e.next, L = C || e.label;
  return d("div", { ref: "selfRef", class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, v && `${t}-pagination--simple`], style: o }, k ? d("div", { class: `${t}-pagination-prefix` }, k({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null, this.displayOrder.map((W) => {
    switch (W) {
      case "pages":
        return d(dt, null, d("div", { class: [`${t}-pagination-item`, !_ && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`], onClick: N }, _ ? _({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount }) : d(ot, { clsPrefix: t }, { default: () => this.rtlEnabled ? d(hr, null) : d(cr, null) })), v ? d(dt, null, d("div", { class: `${t}-pagination-quick-jumper` }, d(Lo, { value: h, onUpdateValue: T, size: p, placeholder: "", disabled: n, theme: c.peers.Input, themeOverrides: c.peerOverrides.Input, onChange: I })), "\xA0/", " ", i) : a.map((Z, B) => {
          let j, ee, P;
          const { type: E } = Z;
          switch (E) {
            case "page":
              const me = Z.label;
              L ? j = L({ type: "page", node: me, active: Z.active }) : j = me;
              break;
            case "fast-forward":
              const ge = this.fastForwardActive ? d(ot, { clsPrefix: t }, { default: () => this.rtlEnabled ? d(ur, null) : d(fr, null) }) : d(ot, { clsPrefix: t }, { default: () => d(vr, null) });
              L ? j = L({ type: "fast-forward", node: ge, active: this.fastForwardActive || this.showFastForwardMenu }) : j = ge, ee = this.handleFastForwardMouseenter, P = this.handleFastForwardMouseleave;
              break;
            case "fast-backward":
              const se = this.fastBackwardActive ? d(ot, { clsPrefix: t }, { default: () => this.rtlEnabled ? d(fr, null) : d(ur, null) }) : d(ot, { clsPrefix: t }, { default: () => d(vr, null) });
              L ? j = L({ type: "fast-backward", node: se, active: this.fastBackwardActive || this.showFastBackwardMenu }) : j = se, ee = this.handleFastBackwardMouseenter, P = this.handleFastBackwardMouseleave;
              break;
          }
          const ue = d("div", { key: B, class: [`${t}-pagination-item`, Z.active && `${t}-pagination-item--active`, E !== "page" && (E === "fast-backward" && this.showFastBackwardMenu || E === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, E === "page" && `${t}-pagination-item--clickable`], onClick: () => {
            H(Z);
          }, onMouseenter: ee, onMouseleave: P }, j);
          if (E === "page" && !Z.mayBeFastBackward && !Z.mayBeFastForward) return ue;
          {
            const me = Z.type === "page" ? Z.mayBeFastBackward ? "fast-backward" : "fast-forward" : Z.type;
            return Z.type !== "page" && !Z.options ? ue : d(Wd, { to: this.to, key: me, disabled: n, trigger: "hover", virtualScroll: true, style: { width: "60px" }, theme: c.peers.Popselect, themeOverrides: c.peerOverrides.Popselect, builtinThemeOverrides: { peers: { InternalSelectMenu: { height: "calc(var(--n-option-height) * 4.6)" } } }, nodeProps: () => ({ style: { justifyContent: "center" } }), show: E === "page" ? false : E === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu, onUpdateShow: (ge) => {
              E !== "page" && (ge ? E === "fast-backward" ? this.showFastBackwardMenu = ge : this.showFastForwardMenu = ge : (this.showFastBackwardMenu = false, this.showFastForwardMenu = false));
            }, options: Z.type !== "page" && Z.options ? Z.options : [], onUpdateValue: this.handleMenuSelect, scrollable: true, scrollbarProps: this.scrollbarProps, showCheckmark: false }, { default: () => ue });
          }
        }), d("div", { class: [`${t}-pagination-item`, !z && `${t}-pagination-item--button`, { [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n }], onClick: q }, z ? z({ page: r, pageSize: g, pageCount: i, itemCount: this.mergedItemCount, startIndex: this.startIndex, endIndex: this.endIndex }) : d(ot, { clsPrefix: t }, { default: () => this.rtlEnabled ? d(cr, null) : d(hr, null) })));
      case "size-picker":
        return !v && l ? d(Xd, Object.assign({ consistentMenuWidth: false, placeholder: "", showCheckmark: false, to: this.to }, this.selectProps, { size: m, options: u, value: g, disabled: n, scrollbarProps: this.scrollbarProps, theme: c.peers.Select, themeOverrides: c.peerOverrides.Select, onUpdateValue: V })) : null;
      case "quick-jumper":
        return !v && s ? d("div", { class: `${t}-pagination-quick-jumper` }, M ? M() : mn(this.$slots.goto, () => [f.goto]), d(Lo, { value: h, onUpdateValue: T, size: p, placeholder: "", disabled: n, theme: c.peers.Input, themeOverrides: c.peerOverrides.Input, onChange: I })) : null;
      default:
        return null;
    }
  }), R ? d("div", { class: `${t}-pagination-suffix` }, R({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null);
} }), ec = Object.assign(Object.assign({}, ye.props), { onUnstableColumnResize: Function, pagination: { type: [Object, Boolean], default: false }, paginateSinglePage: { type: Boolean, default: true }, minHeight: [Number, String], maxHeight: [Number, String], columns: { type: Array, default: () => [] }, rowClassName: [String, Function], rowProps: Function, rowKey: Function, summary: [Function], data: { type: Array, default: () => [] }, loading: Boolean, bordered: { type: Boolean, default: void 0 }, bottomBordered: { type: Boolean, default: void 0 }, striped: Boolean, scrollX: [Number, String], defaultCheckedRowKeys: { type: Array, default: () => [] }, checkedRowKeys: Array, singleLine: { type: Boolean, default: true }, singleColumn: Boolean, size: String, remote: Boolean, defaultExpandedRowKeys: { type: Array, default: [] }, defaultExpandAll: Boolean, expandedRowKeys: Array, stickyExpandedRows: Boolean, virtualScroll: Boolean, virtualScrollX: Boolean, virtualScrollHeader: Boolean, headerHeight: { type: Number, default: 28 }, heightForRow: Function, minRowHeight: { type: Number, default: 28 }, tableLayout: { type: String, default: "auto" }, allowCheckingNotLoaded: Boolean, cascade: { type: Boolean, default: true }, childrenKey: { type: String, default: "children" }, indent: { type: Number, default: 16 }, flexHeight: Boolean, summaryPlacement: { type: String, default: "bottom" }, paginationBehaviorOnFilter: { type: String, default: "current" }, filterIconPopoverProps: Object, scrollbarProps: Object, renderCell: Function, renderExpandIcon: Function, spinProps: Object, getCsvCell: Function, getCsvHeader: Function, onLoad: Function, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], "onUpdate:sorter": [Function, Array], onUpdateSorter: [Function, Array], "onUpdate:filters": [Function, Array], onUpdateFilters: [Function, Array], "onUpdate:checkedRowKeys": [Function, Array], onUpdateCheckedRowKeys: [Function, Array], "onUpdate:expandedRowKeys": [Function, Array], onUpdateExpandedRowKeys: [Function, Array], onScroll: Function, onPageChange: [Function, Array], onPageSizeChange: [Function, Array], onSorterChange: [Function, Array], onFiltersChange: [Function, Array], onCheckedRowKeysChange: [Function, Array] }), ct = qe("n-data-table"), ki = 40, Ri = 40;
function Rr(e) {
  if (e.type === "selection") return e.width === void 0 ? ki : Kt(e.width);
  if (e.type === "expand") return e.width === void 0 ? Ri : Kt(e.width);
  if (!("children" in e)) return typeof e.width == "string" ? Kt(e.width) : e.width;
}
function tc(e) {
  var t, n;
  if (e.type === "selection") return We((t = e.width) !== null && t !== void 0 ? t : ki);
  if (e.type === "expand") return We((n = e.width) !== null && n !== void 0 ? n : Ri);
  if (!("children" in e)) return We(e.width);
}
function st(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function Pr(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function nc(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function oc(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function rc(e, t) {
  if (t !== void 0) return { width: t, minWidth: t, maxWidth: t };
  const n = tc(e), { minWidth: o, maxWidth: r } = e;
  return { width: n, minWidth: We(o) || n, maxWidth: We(r) };
}
function ic(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Gn(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function qn(e) {
  return "children" in e ? false : !!e.sorter;
}
function Pi(e) {
  return "children" in e && e.children.length ? false : !!e.resizable;
}
function zr(e) {
  return "children" in e ? false : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function Fr(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return false;
}
function lc(e, t) {
  if (e.sorter === void 0) return null;
  const { customNextSortOrder: n } = e;
  return t === null || t.columnKey !== e.key ? { columnKey: e.key, sorter: e.sorter, order: Fr(false) } : Object.assign(Object.assign({}, t), { order: (n || Fr)(t.order) });
}
function zi(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function ac(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function sc(e, t, n, o) {
  const r = e.filter((l) => l.type !== "expand" && l.type !== "selection" && l.allowExport !== false), i = r.map((l) => o ? o(l) : l.title).join(","), a = t.map((l) => r.map((s) => n ? n(l[s.key], l, s) : ac(l[s.key])).join(","));
  return [i, ...a].join(`
`);
}
const dc = le({ name: "DataTableBodyCheckbox", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, mergedInderminateRowKeySetRef: n } = xe(ct);
  return () => {
    const { rowKey: o } = e;
    return d(Oo, { privateInsideTable: true, disabled: e.disabled, indeterminate: n.value.has(o), checked: t.value.has(o), onUpdateChecked: e.onUpdateChecked });
  };
} }), cc = O("radio", `
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`, [G("checked", [Q("dot", `
 background-color: var(--n-color-active);
 `)]), Q("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), O("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), Q("dot", `
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `, [X("&::before", `
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), G("checked", { boxShadow: "var(--n-box-shadow-active)" }, [X("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), Q("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), Le("disabled", `
 cursor: pointer;
 `, [X("&:hover", [Q("dot", { boxShadow: "var(--n-box-shadow-hover)" })]), G("focus", [X("&:not(:active)", [Q("dot", { boxShadow: "var(--n-box-shadow-focus)" })])])]), G("disabled", `
 cursor: not-allowed;
 `, [Q("dot", { boxShadow: "var(--n-box-shadow-disabled)", backgroundColor: "var(--n-color-disabled)" }, [X("&::before", { backgroundColor: "var(--n-dot-color-disabled)" }), G("checked", `
 opacity: 1;
 `)]), Q("label", { color: "var(--n-text-color-disabled)" }), O("radio-input", `
 cursor: not-allowed;
 `)])]), uc = { name: String, value: { type: [String, Number, Boolean], default: "on" }, checked: { type: Boolean, default: void 0 }, defaultChecked: Boolean, disabled: { type: Boolean, default: void 0 }, label: String, size: String, onUpdateChecked: [Function, Array], "onUpdate:checked": [Function, Array], checkedValue: { type: Boolean, default: void 0 } }, Fi = qe("n-radio-group");
function fc(e) {
  const t = xe(Fi, null), { mergedClsPrefixRef: n, mergedComponentPropsRef: o } = Te(e), r = en(e, { mergedSize(x) {
    var C, M;
    const { size: T } = e;
    if (T !== void 0) return T;
    if (t) {
      const { mergedSizeRef: { value: N } } = t;
      if (N !== void 0) return N;
    }
    if (x) return x.mergedSize.value;
    const V = (M = (C = o == null ? void 0 : o.value) === null || C === void 0 ? void 0 : C.Radio) === null || M === void 0 ? void 0 : M.size;
    return V || "medium";
  }, mergedDisabled(x) {
    return !!(e.disabled || (t == null ? void 0 : t.disabledRef.value) || (x == null ? void 0 : x.disabled.value));
  } }), { mergedSizeRef: i, mergedDisabledRef: a } = r, l = D(null), s = D(null), c = D(e.defaultChecked), f = oe(e, "checked"), p = Qe(f, c), m = Pe(() => t ? t.valueRef.value === e.value : p.value), g = Pe(() => {
    const { name: x } = e;
    if (x !== void 0) return x;
    if (t) return t.nameRef.value;
  }), u = D(false);
  function h() {
    if (t) {
      const { doUpdateValue: x } = t, { value: C } = e;
      ne(x, C);
    } else {
      const { onUpdateChecked: x, "onUpdate:checked": C } = e, { nTriggerFormInput: M, nTriggerFormChange: T } = r;
      x && ne(x, true), C && ne(C, true), M(), T(), c.value = true;
    }
  }
  function v() {
    a.value || m.value || h();
  }
  function b() {
    v(), l.value && (l.value.checked = m.value);
  }
  function w() {
    u.value = false;
  }
  function $() {
    u.value = true;
  }
  return { mergedClsPrefix: t ? t.mergedClsPrefixRef : n, inputRef: l, labelRef: s, mergedName: g, mergedDisabled: a, renderSafeChecked: m, focus: u, mergedSize: i, handleRadioInputChange: b, handleRadioInputBlur: w, handleRadioInputFocus: $ };
}
const hc = Object.assign(Object.assign({}, ye.props), uc), $i = le({ name: "Radio", props: hc, setup(e) {
  const t = fc(e), n = ye("Radio", "-radio", cc, Ur, e, t.mergedClsPrefix), o = F(() => {
    const { mergedSize: { value: c } } = t, { common: { cubicBezierEaseInOut: f }, self: { boxShadow: p, boxShadowActive: m, boxShadowDisabled: g, boxShadowFocus: u, boxShadowHover: h, color: v, colorDisabled: b, colorActive: w, textColor: $, textColorDisabled: x, dotColorActive: C, dotColorDisabled: M, labelPadding: T, labelLineHeight: V, labelFontWeight: N, [pe("fontSize", c)]: H, [pe("radioSize", c)]: q } } = n.value;
    return { "--n-bezier": f, "--n-label-line-height": V, "--n-label-font-weight": N, "--n-box-shadow": p, "--n-box-shadow-active": m, "--n-box-shadow-disabled": g, "--n-box-shadow-focus": u, "--n-box-shadow-hover": h, "--n-color": v, "--n-color-active": w, "--n-color-disabled": b, "--n-dot-color-active": C, "--n-dot-color-disabled": M, "--n-font-size": H, "--n-radio-size": q, "--n-text-color": $, "--n-text-color-disabled": x, "--n-label-padding": T };
  }), { inlineThemeDisabled: r, mergedClsPrefixRef: i, mergedRtlRef: a } = Te(e), l = mt("Radio", a, i), s = r ? Ye("radio", F(() => t.mergedSize.value[0]), o, e) : void 0;
  return Object.assign(t, { rtlEnabled: l, cssVars: r ? void 0 : o, themeClass: s == null ? void 0 : s.themeClass, onRender: s == null ? void 0 : s.onRender });
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: n, label: o } = this;
  return n == null ? void 0 : n(), d("label", { class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`], style: this.cssVars }, d("div", { class: `${t}-radio__dot-wrapper` }, "\xA0", d("div", { class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`] }), d("input", { ref: "inputRef", type: "radio", class: `${t}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur })), xt(e.default, (r) => !r && !o ? null : d("div", { ref: "labelRef", class: `${t}-radio__label` }, r || o)));
} }), vc = O("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [Q("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [G("checked", { backgroundColor: "var(--n-button-border-color-active)" }), G("disabled", { opacity: "var(--n-opacity-disabled)" })]), G("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [O("radio-button", { height: "var(--n-height)", lineHeight: "var(--n-height)" }), Q("splitor", { height: "var(--n-height)" })]), O("radio-button", `
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `, [O("radio-input", `
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `), Q("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), X("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [Q("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), X("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [Q("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), Le("disabled", `
 cursor: pointer;
 `, [X("&:hover", [Q("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), Le("checked", { color: "var(--n-button-text-color-hover)" })]), G("focus", [X("&:not(:active)", [Q("state-border", { boxShadow: "var(--n-button-box-shadow-focus)" })])])]), G("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), G("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function pc(e, t, n) {
  var o;
  const r = [];
  let i = false;
  for (let a = 0; a < e.length; ++a) {
    const l = e[a], s = (o = l.type) === null || o === void 0 ? void 0 : o.name;
    s === "RadioButton" && (i = true);
    const c = l.props;
    if (s !== "RadioButton") {
      r.push(l);
      continue;
    }
    if (a === 0) r.push(l);
    else {
      const f = r[r.length - 1].props, p = t === f.value, m = f.disabled, g = t === c.value, u = c.disabled, h = (p ? 2 : 0) + (m ? 0 : 1), v = (g ? 2 : 0) + (u ? 0 : 1), b = { [`${n}-radio-group__splitor--disabled`]: m, [`${n}-radio-group__splitor--checked`]: p }, w = { [`${n}-radio-group__splitor--disabled`]: u, [`${n}-radio-group__splitor--checked`]: g }, $ = h < v ? w : b;
      r.push(d("div", { class: [`${n}-radio-group__splitor`, $] }), l);
    }
  }
  return { children: r, isButtonGroup: i };
}
const gc = Object.assign(Object.assign({}, ye.props), { name: String, value: [String, Number, Boolean], defaultValue: { type: [String, Number, Boolean], default: null }, size: String, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), bc = le({ name: "RadioGroup", props: gc, setup(e) {
  const t = D(null), { mergedSizeRef: n, mergedDisabledRef: o, nTriggerFormChange: r, nTriggerFormInput: i, nTriggerFormBlur: a, nTriggerFormFocus: l } = en(e), { mergedClsPrefixRef: s, inlineThemeDisabled: c, mergedRtlRef: f } = Te(e), p = ye("Radio", "-radio-group", vc, Ur, e, s), m = D(e.defaultValue), g = oe(e, "value"), u = Qe(g, m);
  function h(C) {
    const { onUpdateValue: M, "onUpdate:value": T } = e;
    M && ne(M, C), T && ne(T, C), m.value = C, r(), i();
  }
  function v(C) {
    const { value: M } = t;
    M && (M.contains(C.relatedTarget) || l());
  }
  function b(C) {
    const { value: M } = t;
    M && (M.contains(C.relatedTarget) || a());
  }
  Ee(Fi, { mergedClsPrefixRef: s, nameRef: oe(e, "name"), valueRef: u, disabledRef: o, mergedSizeRef: n, doUpdateValue: h });
  const w = mt("Radio", f, s), $ = F(() => {
    const { value: C } = n, { common: { cubicBezierEaseInOut: M }, self: { buttonBorderColor: T, buttonBorderColorActive: V, buttonBorderRadius: N, buttonBoxShadow: H, buttonBoxShadowFocus: q, buttonBoxShadowHover: I, buttonColor: y, buttonColorActive: k, buttonTextColor: R, buttonTextColorActive: _, buttonTextColorHover: z, opacityDisabled: L, [pe("buttonHeight", C)]: W, [pe("fontSize", C)]: Z } } = p.value;
    return { "--n-font-size": Z, "--n-bezier": M, "--n-button-border-color": T, "--n-button-border-color-active": V, "--n-button-border-radius": N, "--n-button-box-shadow": H, "--n-button-box-shadow-focus": q, "--n-button-box-shadow-hover": I, "--n-button-color": y, "--n-button-color-active": k, "--n-button-text-color": R, "--n-button-text-color-hover": z, "--n-button-text-color-active": _, "--n-height": W, "--n-opacity-disabled": L };
  }), x = c ? Ye("radio-group", F(() => n.value[0]), $, e) : void 0;
  return { selfElRef: t, rtlEnabled: w, mergedClsPrefix: s, mergedValue: u, handleFocusout: b, handleFocusin: v, cssVars: c ? void 0 : $, themeClass: x == null ? void 0 : x.themeClass, onRender: x == null ? void 0 : x.onRender };
}, render() {
  var e;
  const { mergedValue: t, mergedClsPrefix: n, handleFocusin: o, handleFocusout: r } = this, { children: i, isButtonGroup: a } = pc(Yt(Fa(this)), t, n);
  return (e = this.onRender) === null || e === void 0 || e.call(this), d("div", { onFocusin: o, onFocusout: r, ref: "selfElRef", class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, a && `${n}-radio-group--button-group`], style: this.cssVars }, i);
} }), mc = le({ name: "DataTableBodyRadio", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, componentId: n } = xe(ct);
  return () => {
    const { rowKey: o } = e;
    return d($i, { name: n, disabled: e.disabled, checked: t.value.has(o), onUpdateChecked: e.onUpdateChecked });
  };
} }), yc = Object.assign(Object.assign({}, Vt), ye.props), wc = le({ name: "Tooltip", props: yc, slots: Object, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Te(e), n = ye("Tooltip", "-tooltip", void 0, Al, e, t), o = D(null);
  return Object.assign(Object.assign({}, { syncPosition() {
    o.value.syncPosition();
  }, setShow(i) {
    o.value.setShow(i);
  } }), { popoverRef: o, mergedTheme: n, popoverThemeOverrides: F(() => n.value.self) });
}, render() {
  const { mergedTheme: e, internalExtraClass: t } = this;
  return d(tn, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
} }), Oi = O("ellipsis", { overflow: "hidden" }, [Le("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), G("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), G("cursor-pointer", `
 cursor: pointer;
 `)]);
function ao(e) {
  return `${e}-ellipsis--line-clamp`;
}
function so(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Ti = Object.assign(Object.assign({}, ye.props), { expandTrigger: String, lineClamp: [Number, String], tooltip: { type: [Boolean, Object], default: true } }), Mo = le({ name: "Ellipsis", inheritAttrs: false, props: Ti, slots: Object, setup(e, { slots: t, attrs: n }) {
  const o = Vr(), r = ye("Ellipsis", "-ellipsis", Oi, El, e, o), i = D(null), a = D(null), l = D(null), s = D(false), c = F(() => {
    const { lineClamp: v } = e, { value: b } = s;
    return v !== void 0 ? { textOverflow: "", "-webkit-line-clamp": b ? "" : v } : { textOverflow: b ? "" : "ellipsis", "-webkit-line-clamp": "" };
  });
  function f() {
    let v = false;
    const { value: b } = s;
    if (b) return true;
    const { value: w } = i;
    if (w) {
      const { lineClamp: $ } = e;
      if (g(w), $ !== void 0) v = w.scrollHeight <= w.offsetHeight;
      else {
        const { value: x } = a;
        x && (v = x.getBoundingClientRect().width <= w.getBoundingClientRect().width);
      }
      u(w, v);
    }
    return v;
  }
  const p = F(() => e.expandTrigger === "click" ? () => {
    var v;
    const { value: b } = s;
    b && ((v = l.value) === null || v === void 0 || v.setShow(false)), s.value = !b;
  } : void 0);
  Br(() => {
    var v;
    e.tooltip && ((v = l.value) === null || v === void 0 || v.setShow(false));
  });
  const m = () => d("span", Object.assign({}, Ft(n, { class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? ao(o.value) : void 0, e.expandTrigger === "click" ? so(o.value, "pointer") : void 0], style: c.value }), { ref: "triggerRef", onClick: p.value, onMouseenter: e.expandTrigger === "click" ? f : void 0 }), e.lineClamp ? t : d("span", { ref: "triggerInnerRef" }, t));
  function g(v) {
    if (!v) return;
    const b = c.value, w = ao(o.value);
    e.lineClamp !== void 0 ? h(v, w, "add") : h(v, w, "remove");
    for (const $ in b) v.style[$] !== b[$] && (v.style[$] = b[$]);
  }
  function u(v, b) {
    const w = so(o.value, "pointer");
    e.expandTrigger === "click" && !b ? h(v, w, "add") : h(v, w, "remove");
  }
  function h(v, b, w) {
    w === "add" ? v.classList.contains(b) || v.classList.add(b) : v.classList.contains(b) && v.classList.remove(b);
  }
  return { mergedTheme: r, triggerRef: i, triggerInnerRef: a, tooltipRef: l, handleClick: p, renderTrigger: m, getTooltipDisabled: f };
}, render() {
  var e;
  const { tooltip: t, renderTrigger: n, $slots: o } = this;
  if (t) {
    const { mergedTheme: r } = this;
    return d(wc, Object.assign({ ref: "tooltipRef", placement: "top" }, t, { getDisabled: this.getTooltipDisabled, theme: r.peers.Tooltip, themeOverrides: r.peerOverrides.Tooltip }), { trigger: n, default: (e = o.tooltip) !== null && e !== void 0 ? e : o.default });
  } else return n();
} }), xc = le({ name: "PerformantEllipsis", props: Ti, inheritAttrs: false, setup(e, { attrs: t, slots: n }) {
  const o = D(false), r = Vr();
  return Ll("-ellipsis", Oi, r), { mouseEntered: o, renderTrigger: () => {
    const { lineClamp: a } = e, l = r.value;
    return d("span", Object.assign({}, Ft(t, { class: [`${l}-ellipsis`, a !== void 0 ? ao(l) : void 0, e.expandTrigger === "click" ? so(l, "pointer") : void 0], style: a === void 0 ? { textOverflow: "ellipsis" } : { "-webkit-line-clamp": a } }), { onMouseenter: () => {
      o.value = true;
    } }), a ? n : d("span", null, n));
  } };
}, render() {
  return this.mouseEntered ? d(Mo, Ft({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
} }), Cc = le({ name: "DataTableCell", props: { clsPrefix: { type: String, required: true }, row: { type: Object, required: true }, index: { type: Number, required: true }, column: { type: Object, required: true }, isSummary: Boolean, mergedTheme: { type: Object, required: true }, renderCell: Function }, render() {
  var e;
  const { isSummary: t, column: n, row: o, renderCell: r } = this;
  let i;
  const { render: a, key: l, ellipsis: s } = n;
  if (a && !t ? i = a(o, this.index) : t ? i = (e = o[l]) === null || e === void 0 ? void 0 : e.value : i = r ? r(Qn(o, l), o, n) : Qn(o, l), s) if (typeof s == "object") {
    const { mergedTheme: c } = this;
    return n.ellipsisComponent === "performant-ellipsis" ? d(xc, Object.assign({}, s, { theme: c.peers.Ellipsis, themeOverrides: c.peerOverrides.Ellipsis }), { default: () => i }) : d(Mo, Object.assign({}, s, { theme: c.peers.Ellipsis, themeOverrides: c.peerOverrides.Ellipsis }), { default: () => i });
  } else return d("span", { class: `${this.clsPrefix}-data-table-td__ellipsis` }, i);
  return i;
} }), $r = le({ name: "DataTableExpandTrigger", props: { clsPrefix: { type: String, required: true }, expanded: Boolean, loading: Boolean, onClick: { type: Function, required: true }, renderExpandIcon: { type: Function }, rowData: { type: Object, required: true } }, render() {
  const { clsPrefix: e } = this;
  return d("div", { class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`], onClick: this.onClick, onMousedown: (t) => {
    t.preventDefault();
  } }, d(Kr, null, { default: () => this.loading ? d(po, { key: "loading", clsPrefix: this.clsPrefix, radius: 85, strokeWidth: 15, scale: 0.88 }) : this.renderExpandIcon ? this.renderExpandIcon({ expanded: this.expanded, rowData: this.rowData }) : d(ot, { clsPrefix: e, key: "base-icon" }, { default: () => d(fi, null) }) }));
} }), Sc = le({ name: "DataTableFilterMenu", props: { column: { type: Object, required: true }, radioGroupName: { type: String, required: true }, multiple: { type: Boolean, required: true }, value: { type: [Array, String, Number], default: null }, options: { type: Array, required: true }, onConfirm: { type: Function, required: true }, onClear: { type: Function, required: true }, onChange: { type: Function, required: true } }, setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n } = Te(e), o = mt("DataTable", n, t), { mergedClsPrefixRef: r, mergedThemeRef: i, localeRef: a } = xe(ct), l = D(e.value), s = F(() => {
    const { value: u } = l;
    return Array.isArray(u) ? u : null;
  }), c = F(() => {
    const { value: u } = l;
    return Gn(e.column) ? Array.isArray(u) && u.length && u[0] || null : Array.isArray(u) ? null : u;
  });
  function f(u) {
    e.onChange(u);
  }
  function p(u) {
    e.multiple && Array.isArray(u) ? l.value = u : Gn(e.column) && !Array.isArray(u) ? l.value = [u] : l.value = u;
  }
  function m() {
    f(l.value), e.onConfirm();
  }
  function g() {
    e.multiple || Gn(e.column) ? f([]) : f(null), e.onClear();
  }
  return { mergedClsPrefix: r, rtlEnabled: o, mergedTheme: i, locale: a, checkboxGroupValue: s, radioGroupValue: c, handleChange: p, handleConfirmClick: m, handleClearClick: g };
}, render() {
  const { mergedTheme: e, locale: t, mergedClsPrefix: n } = this;
  return d("div", { class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`] }, d(go, null, { default: () => {
    const { checkboxGroupValue: o, handleChange: r } = this;
    return this.multiple ? d(Ld, { value: o, class: `${n}-data-table-filter-menu__group`, onUpdateValue: r }, { default: () => this.options.map((i) => d(Oo, { key: i.value, theme: e.peers.Checkbox, themeOverrides: e.peerOverrides.Checkbox, value: i.value }, { default: () => i.label })) }) : d(bc, { name: this.radioGroupName, class: `${n}-data-table-filter-menu__group`, value: this.radioGroupValue, onUpdateValue: this.handleChange }, { default: () => this.options.map((i) => d($i, { key: i.value, value: i.value, theme: e.peers.Radio, themeOverrides: e.peerOverrides.Radio }, { default: () => i.label })) });
  } }), d("div", { class: `${n}-data-table-filter-menu__action` }, d(Ko, { size: "tiny", theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, onClick: this.handleClearClick }, { default: () => t.clear }), d(Ko, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, type: "primary", size: "tiny", onClick: this.handleConfirmClick }, { default: () => t.confirm })));
} }), kc = le({ name: "DataTableRenderFilter", props: { render: { type: Function, required: true }, active: { type: Boolean, default: false }, show: { type: Boolean, default: false } }, render() {
  const { render: e, active: t, show: n } = this;
  return e({ active: t, show: n });
} });
function Rc(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const Pc = le({ name: "DataTableFilterButton", props: { column: { type: Object, required: true }, options: { type: Array, default: () => [] } }, setup(e) {
  const { mergedComponentPropsRef: t } = Te(), { mergedThemeRef: n, mergedClsPrefixRef: o, mergedFilterStateRef: r, filterMenuCssVarsRef: i, paginationBehaviorOnFilterRef: a, doUpdatePage: l, doUpdateFilters: s, filterIconPopoverPropsRef: c } = xe(ct), f = D(false), p = r, m = F(() => e.column.filterMultiple !== false), g = F(() => {
    const $ = p.value[e.column.key];
    if ($ === void 0) {
      const { value: x } = m;
      return x ? [] : null;
    }
    return $;
  }), u = F(() => {
    const { value: $ } = g;
    return Array.isArray($) ? $.length > 0 : $ !== null;
  }), h = F(() => {
    var $, x;
    return ((x = ($ = t == null ? void 0 : t.value) === null || $ === void 0 ? void 0 : $.DataTable) === null || x === void 0 ? void 0 : x.renderFilter) || e.column.renderFilter;
  });
  function v($) {
    const x = Rc(p.value, e.column.key, $);
    s(x, e.column), a.value === "first" && l(1);
  }
  function b() {
    f.value = false;
  }
  function w() {
    f.value = false;
  }
  return { mergedTheme: n, mergedClsPrefix: o, active: u, showPopover: f, mergedRenderFilter: h, filterIconPopoverProps: c, filterMultiple: m, mergedFilterValue: g, filterMenuCssVars: i, handleFilterChange: v, handleFilterMenuConfirm: w, handleFilterMenuCancel: b };
}, render() {
  const { mergedTheme: e, mergedClsPrefix: t, handleFilterMenuCancel: n, filterIconPopoverProps: o } = this;
  return d(tn, Object.assign({ show: this.showPopover, onUpdateShow: (r) => this.showPopover = r, trigger: "click", theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, placement: "bottom" }, o, { style: { padding: 0 } }), { trigger: () => {
    const { mergedRenderFilter: r } = this;
    if (r) return d(kc, { "data-data-table-filter": true, render: r, active: this.active, show: this.showPopover });
    const { renderFilterIcon: i } = this.column;
    return d("div", { "data-data-table-filter": true, class: [`${t}-data-table-filter`, { [`${t}-data-table-filter--active`]: this.active, [`${t}-data-table-filter--show`]: this.showPopover }] }, i ? i({ active: this.active, show: this.showPopover }) : d(ot, { clsPrefix: t }, { default: () => d(Vs, null) }));
  }, default: () => {
    const { renderFilterMenu: r } = this.column;
    return r ? r({ hide: n }) : d(Sc, { style: this.filterMenuCssVars, radioGroupName: String(this.column.key), multiple: this.filterMultiple, value: this.mergedFilterValue, options: this.options, column: this.column, onChange: this.handleFilterChange, onClear: this.handleFilterMenuCancel, onConfirm: this.handleFilterMenuConfirm });
  } });
} }), zc = le({ name: "ColumnResizeButton", props: { onResizeStart: Function, onResize: Function, onResizeEnd: Function }, setup(e) {
  const { mergedClsPrefixRef: t } = xe(ct), n = D(false);
  let o = 0;
  function r(s) {
    return s.clientX;
  }
  function i(s) {
    var c;
    s.preventDefault();
    const f = n.value;
    o = r(s), n.value = true, f || (Ue("mousemove", window, a), Ue("mouseup", window, l), (c = e.onResizeStart) === null || c === void 0 || c.call(e));
  }
  function a(s) {
    var c;
    (c = e.onResize) === null || c === void 0 || c.call(e, r(s) - o);
  }
  function l() {
    var s;
    n.value = false, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), Ie("mousemove", window, a), Ie("mouseup", window, l);
  }
  return bt(() => {
    Ie("mousemove", window, a), Ie("mouseup", window, l);
  }), { mergedClsPrefix: t, active: n, handleMousedown: i };
}, render() {
  const { mergedClsPrefix: e } = this;
  return d("span", { "data-data-table-resizable": true, class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`], onMousedown: this.handleMousedown });
} }), Fc = le({ name: "DataTableRenderSorter", props: { render: { type: Function, required: true }, order: { type: [String, Boolean], default: false } }, render() {
  const { render: e, order: t } = this;
  return e({ order: t });
} }), $c = le({ name: "SortIcon", props: { column: { type: Object, required: true } }, setup(e) {
  const { mergedComponentPropsRef: t } = Te(), { mergedSortStateRef: n, mergedClsPrefixRef: o } = xe(ct), r = F(() => n.value.find((s) => s.columnKey === e.column.key)), i = F(() => r.value !== void 0), a = F(() => {
    const { value: s } = r;
    return s && i.value ? s.order : false;
  }), l = F(() => {
    var s, c;
    return ((c = (s = t == null ? void 0 : t.value) === null || s === void 0 ? void 0 : s.DataTable) === null || c === void 0 ? void 0 : c.renderSorter) || e.column.renderSorter;
  });
  return { mergedClsPrefix: o, active: i, mergedSortOrder: a, mergedRenderSorter: l };
}, render() {
  const { mergedRenderSorter: e, mergedSortOrder: t, mergedClsPrefix: n } = this, { renderSorterIcon: o } = this.column;
  return e ? d(Fc, { render: e, order: t }) : d("span", { class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`] }, o ? o({ order: t }) : d(ot, { clsPrefix: n }, { default: () => d(js, null) }));
} }), Io = qe("n-dropdown-menu"), Cn = qe("n-dropdown"), Or = qe("n-dropdown-option"), Mi = le({ name: "DropdownDivider", props: { clsPrefix: { type: String, required: true } }, render() {
  return d("div", { class: `${this.clsPrefix}-dropdown-divider` });
} }), Oc = le({ name: "DropdownGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { showIconRef: e, hasSubmenuRef: t } = xe(Io), { renderLabelRef: n, labelFieldRef: o, nodePropsRef: r, renderOptionRef: i } = xe(Cn);
  return { labelField: o, showIcon: e, hasSubmenu: t, renderLabel: n, nodeProps: r, renderOption: i };
}, render() {
  var e;
  const { clsPrefix: t, hasSubmenu: n, showIcon: o, nodeProps: r, renderLabel: i, renderOption: a } = this, { rawNode: l } = this.tmNode, s = d("div", Object.assign({ class: `${t}-dropdown-option` }, r == null ? void 0 : r(l)), d("div", { class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group` }, d("div", { "data-dropdown-option": true, class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`] }, pt(l.icon)), d("div", { class: `${t}-dropdown-option-body__label`, "data-dropdown-option": true }, i ? i(l) : pt((e = l.title) !== null && e !== void 0 ? e : l[this.labelField])), d("div", { class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`], "data-dropdown-option": true })));
  return a ? a({ node: s, option: l }) : s;
} }), Tc = O("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [G("color-transition", { transition: "color .3s var(--n-bezier)" }), G("depth", { color: "var(--n-color)" }, [X("svg", { opacity: "var(--n-opacity)", transition: "opacity .3s var(--n-bezier)" })]), X("svg", { height: "1em", width: "1em" })]), Mc = Object.assign(Object.assign({}, ye.props), { depth: [String, Number], size: [Number, String], color: String, component: [Object, Function] }), Ic = le({ _n_icon__: true, name: "Icon", inheritAttrs: false, props: Mc, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: n } = Te(e), o = ye("Icon", "-icon", Tc, Nl, e, t), r = F(() => {
    const { depth: a } = e, { common: { cubicBezierEaseInOut: l }, self: s } = o.value;
    if (a !== void 0) {
      const { color: c, [`opacity${a}Depth`]: f } = s;
      return { "--n-bezier": l, "--n-color": c, "--n-opacity": f };
    }
    return { "--n-bezier": l, "--n-color": "", "--n-opacity": "" };
  }), i = n ? Ye("icon", F(() => `${e.depth || "d"}`), r, e) : void 0;
  return { mergedClsPrefix: t, mergedStyle: F(() => {
    const { size: a, color: l } = e;
    return { fontSize: We(a), color: l };
  }), cssVars: n ? void 0 : r, themeClass: i == null ? void 0 : i.themeClass, onRender: i == null ? void 0 : i.onRender };
}, render() {
  var e;
  const { $parent: t, depth: n, mergedClsPrefix: o, component: r, onRender: i, themeClass: a } = this;
  return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && It("icon", "don't wrap `n-icon` inside `n-icon`"), i == null ? void 0 : i(), d("i", Ft(this.$attrs, { role: "img", class: [`${o}-icon`, a, { [`${o}-icon--depth`]: n, [`${o}-icon--color-transition`]: n !== void 0 }], style: [this.cssVars, this.mergedStyle] }), r ? d(r) : this.$slots);
} });
function co(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function _c(e) {
  return e.type === "group";
}
function Ii(e) {
  return e.type === "divider";
}
function Bc(e) {
  return e.type === "render";
}
const _i = le({ name: "DropdownOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null }, placement: { type: String, default: "right-start" }, props: Object, scrollable: Boolean }, setup(e) {
  const t = xe(Cn), { hoverKeyRef: n, keyboardKeyRef: o, lastToggledSubmenuKeyRef: r, pendingKeyPathRef: i, activeKeyPathRef: a, animatedRef: l, mergedShowRef: s, renderLabelRef: c, renderIconRef: f, labelFieldRef: p, childrenFieldRef: m, renderOptionRef: g, nodePropsRef: u, menuPropsRef: h } = t, v = xe(Or, null), b = xe(Io), w = xe(yn), $ = F(() => e.tmNode.rawNode), x = F(() => {
    const { value: z } = m;
    return co(e.tmNode.rawNode, z);
  }), C = F(() => {
    const { disabled: z } = e.tmNode;
    return z;
  }), M = F(() => {
    if (!x.value) return false;
    const { key: z, disabled: L } = e.tmNode;
    if (L) return false;
    const { value: W } = n, { value: Z } = o, { value: B } = r, { value: j } = i;
    return W !== null ? j.includes(z) : Z !== null ? j.includes(z) && j[j.length - 1] !== z : B !== null ? j.includes(z) : false;
  }), T = F(() => o.value === null && !l.value), V = oa(M, 300, T), N = F(() => !!(v == null ? void 0 : v.enteringSubmenuRef.value)), H = D(false);
  Ee(Or, { enteringSubmenuRef: H });
  function q() {
    H.value = true;
  }
  function I() {
    H.value = false;
  }
  function y() {
    const { parentKey: z, tmNode: L } = e;
    L.disabled || s.value && (r.value = z, o.value = null, n.value = L.key);
  }
  function k() {
    const { tmNode: z } = e;
    z.disabled || s.value && n.value !== z.key && y();
  }
  function R(z) {
    if (e.tmNode.disabled || !s.value) return;
    const { relatedTarget: L } = z;
    L && !rt({ target: L }, "dropdownOption") && !rt({ target: L }, "scrollbarRail") && (n.value = null);
  }
  function _() {
    const { value: z } = x, { tmNode: L } = e;
    s.value && !z && !L.disabled && (t.doSelect(L.key, L.rawNode), t.doUpdateShow(false));
  }
  return { labelField: p, renderLabel: c, renderIcon: f, siblingHasIcon: b.showIconRef, siblingHasSubmenu: b.hasSubmenuRef, menuProps: h, popoverBody: w, animated: l, mergedShowSubmenu: F(() => V.value && !N.value), rawNode: $, hasSubmenu: x, pending: Pe(() => {
    const { value: z } = i, { key: L } = e.tmNode;
    return z.includes(L);
  }), childActive: Pe(() => {
    const { value: z } = a, { key: L } = e.tmNode, W = z.findIndex((Z) => L === Z);
    return W === -1 ? false : W < z.length - 1;
  }), active: Pe(() => {
    const { value: z } = a, { key: L } = e.tmNode, W = z.findIndex((Z) => L === Z);
    return W === -1 ? false : W === z.length - 1;
  }), mergedDisabled: C, renderOption: g, nodeProps: u, handleClick: _, handleMouseMove: k, handleMouseEnter: y, handleMouseLeave: R, handleSubmenuBeforeEnter: q, handleSubmenuAfterEnter: I };
}, render() {
  var e, t;
  const { animated: n, rawNode: o, mergedShowSubmenu: r, clsPrefix: i, siblingHasIcon: a, siblingHasSubmenu: l, renderLabel: s, renderIcon: c, renderOption: f, nodeProps: p, props: m, scrollable: g } = this;
  let u = null;
  if (r) {
    const w = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
    u = d(Bi, Object.assign({}, w, { clsPrefix: i, scrollable: this.scrollable, tmNodes: this.tmNode.children, parentKey: this.tmNode.key }));
  }
  const h = { class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`], onMousemove: this.handleMouseMove, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onClick: this.handleClick }, v = p == null ? void 0 : p(o), b = d("div", Object.assign({ class: [`${i}-dropdown-option`, v == null ? void 0 : v.class], "data-dropdown-option": true }, v), d("div", Ft(h, m), [d("div", { class: [`${i}-dropdown-option-body__prefix`, a && `${i}-dropdown-option-body__prefix--show-icon`] }, [c ? c(o) : pt(o.icon)]), d("div", { "data-dropdown-option": true, class: `${i}-dropdown-option-body__label` }, s ? s(o) : pt((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), d("div", { "data-dropdown-option": true, class: [`${i}-dropdown-option-body__suffix`, l && `${i}-dropdown-option-body__suffix--has-submenu`] }, this.hasSubmenu ? d(Ic, null, { default: () => d(fi, null) }) : null)]), this.hasSubmenu ? d(Co, null, { default: () => [d(So, null, { default: () => d("div", { class: `${i}-dropdown-offset-container` }, d(Ro, { show: this.mergedShowSubmenu, placement: this.placement, to: g && this.popoverBody || void 0, teleportDisabled: !g }, { default: () => d("div", { class: `${i}-dropdown-menu-wrapper` }, n ? d(Qt, { onBeforeEnter: this.handleSubmenuBeforeEnter, onAfterEnter: this.handleSubmenuAfterEnter, name: "fade-in-scale-up-transition", appear: true }, { default: () => u }) : u) })) })] }) : null);
  return f ? f({ node: b, option: o }) : b;
} }), Ac = le({ name: "NDropdownGroup", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null } }, render() {
  const { tmNode: e, parentKey: t, clsPrefix: n } = this, { children: o } = e;
  return d(dt, null, d(Oc, { clsPrefix: n, tmNode: e, key: e.key }), o == null ? void 0 : o.map((r) => {
    const { rawNode: i } = r;
    return i.show === false ? null : Ii(i) ? d(Mi, { clsPrefix: n, key: r.key }) : r.isGroup ? (It("dropdown", "`group` node is not allowed to be put in `group` node."), null) : d(_i, { clsPrefix: n, tmNode: r, parentKey: t, key: r.key });
  }));
} }), Ec = le({ name: "DropdownRenderOption", props: { tmNode: { type: Object, required: true } }, render() {
  const { rawNode: { render: e, props: t } } = this.tmNode;
  return d("div", t, [e == null ? void 0 : e()]);
} }), Bi = le({ name: "DropdownMenu", props: { scrollable: Boolean, showArrow: Boolean, arrowStyle: [String, Object], clsPrefix: { type: String, required: true }, tmNodes: { type: Array, default: () => [] }, parentKey: { type: [String, Number], default: null } }, setup(e) {
  const { renderIconRef: t, childrenFieldRef: n } = xe(Cn);
  Ee(Io, { showIconRef: F(() => {
    const r = t.value;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => r ? r(s) : s.icon);
      const { rawNode: l } = i;
      return r ? r(l) : l.icon;
    });
  }), hasSubmenuRef: F(() => {
    const { value: r } = n;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => co(s, r));
      const { rawNode: l } = i;
      return co(l, r);
    });
  }) });
  const o = D(null);
  return Ee(xo, null), Ee(wo, null), Ee(yn, o), { bodyRef: o };
}, render() {
  const { parentKey: e, clsPrefix: t, scrollable: n } = this, o = this.tmNodes.map((r) => {
    const { rawNode: i } = r;
    return i.show === false ? null : Bc(i) ? d(Ec, { tmNode: r, key: r.key }) : Ii(i) ? d(Mi, { clsPrefix: t, key: r.key }) : _c(i) ? d(Ac, { clsPrefix: t, tmNode: r, parentKey: e, key: r.key }) : d(_i, { clsPrefix: t, tmNode: r, parentKey: e, key: r.key, props: i.props, scrollable: n });
  });
  return d("div", { class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`], ref: "bodyRef" }, n ? d(Lr, { contentClass: `${t}-dropdown-menu__content` }, { default: () => o }) : o, this.showArrow ? mi({ clsPrefix: t, arrowStyle: this.arrowStyle, arrowClass: void 0, arrowWrapperClass: void 0, arrowWrapperStyle: void 0 }) : null);
} }), Lc = O("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [xn(), O("dropdown-option", `
 position: relative;
 `, [X("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [X("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), O("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [X("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), Le("disabled", [G("pending", `
 color: var(--n-option-text-color-hover);
 `, [Q("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), X("&::before", "background-color: var(--n-option-color-hover);")]), G("active", `
 color: var(--n-option-text-color-active);
 `, [Q("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), X("&::before", "background-color: var(--n-option-color-active);")]), G("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [Q("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), G("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), G("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [Q("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [G("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), Q("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [G("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), O("icon", `
 font-size: var(--n-option-icon-size);
 `)]), Q("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), Q("suffix", `
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `, [G("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), O("icon", `
 font-size: var(--n-option-icon-size);
 `)]), O("dropdown-menu", "pointer-events: all;")]), O("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), O("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), O("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), X(">", [O("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Le("scrollable", `
 padding: var(--n-padding);
 `), G("scrollable", [Q("content", `
 padding: var(--n-padding);
 `)])]), Nc = { animated: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, size: String, inverted: Boolean, placement: { type: String, default: "bottom" }, onSelect: [Function, Array], options: { type: Array, default: () => [] }, menuProps: Function, showArrow: Boolean, renderLabel: Function, renderIcon: Function, renderOption: Function, nodeProps: Function, labelField: { type: String, default: "label" }, keyField: { type: String, default: "key" }, childrenField: { type: String, default: "children" }, value: [String, Number] }, Dc = Object.keys(Vt), Kc = Object.assign(Object.assign(Object.assign({}, Vt), Nc), ye.props), jc = le({ name: "Dropdown", inheritAttrs: false, props: Kc, setup(e) {
  const t = D(false), n = Qe(oe(e, "show"), t), o = F(() => {
    const { keyField: k, childrenField: R } = e;
    return wn(e.options, { getKey(_) {
      return _[k];
    }, getDisabled(_) {
      return _.disabled === true;
    }, getIgnored(_) {
      return _.type === "divider" || _.type === "render";
    }, getChildren(_) {
      return _[R];
    } });
  }), r = F(() => o.value.treeNodes), i = D(null), a = D(null), l = D(null), s = F(() => {
    var k, R, _;
    return (_ = (R = (k = i.value) !== null && k !== void 0 ? k : a.value) !== null && R !== void 0 ? R : l.value) !== null && _ !== void 0 ? _ : null;
  }), c = F(() => o.value.getPath(s.value).keyPath), f = F(() => o.value.getPath(e.value).keyPath), p = Pe(() => e.keyboard && n.value);
  na({ keydown: { ArrowUp: { prevent: true, handler: T }, ArrowRight: { prevent: true, handler: M }, ArrowDown: { prevent: true, handler: V }, ArrowLeft: { prevent: true, handler: C }, Enter: { prevent: true, handler: N }, Escape: x } }, p);
  const { mergedClsPrefixRef: m, inlineThemeDisabled: g, mergedComponentPropsRef: u } = Te(e), h = F(() => {
    var k, R;
    return e.size || ((R = (k = u == null ? void 0 : u.value) === null || k === void 0 ? void 0 : k.Dropdown) === null || R === void 0 ? void 0 : R.size) || "medium";
  }), v = ye("Dropdown", "-dropdown", Lc, Dl, e, m);
  Ee(Cn, { labelFieldRef: oe(e, "labelField"), childrenFieldRef: oe(e, "childrenField"), renderLabelRef: oe(e, "renderLabel"), renderIconRef: oe(e, "renderIcon"), hoverKeyRef: i, keyboardKeyRef: a, lastToggledSubmenuKeyRef: l, pendingKeyPathRef: c, activeKeyPathRef: f, animatedRef: oe(e, "animated"), mergedShowRef: n, nodePropsRef: oe(e, "nodeProps"), renderOptionRef: oe(e, "renderOption"), menuPropsRef: oe(e, "menuProps"), doSelect: b, doUpdateShow: w }), Ae(n, (k) => {
    !e.animated && !k && $();
  });
  function b(k, R) {
    const { onSelect: _ } = e;
    _ && ne(_, k, R);
  }
  function w(k) {
    const { "onUpdate:show": R, onUpdateShow: _ } = e;
    R && ne(R, k), _ && ne(_, k), t.value = k;
  }
  function $() {
    i.value = null, a.value = null, l.value = null;
  }
  function x() {
    w(false);
  }
  function C() {
    q("left");
  }
  function M() {
    q("right");
  }
  function T() {
    q("up");
  }
  function V() {
    q("down");
  }
  function N() {
    const k = H();
    (k == null ? void 0 : k.isLeaf) && n.value && (b(k.key, k.rawNode), w(false));
  }
  function H() {
    var k;
    const { value: R } = o, { value: _ } = s;
    return !R || _ === null ? null : (k = R.getNode(_)) !== null && k !== void 0 ? k : null;
  }
  function q(k) {
    const { value: R } = s, { value: { getFirstAvailableNode: _ } } = o;
    let z = null;
    if (R === null) {
      const L = _();
      L !== null && (z = L.key);
    } else {
      const L = H();
      if (L) {
        let W;
        switch (k) {
          case "down":
            W = L.getNext();
            break;
          case "up":
            W = L.getPrev();
            break;
          case "right":
            W = L.getChild();
            break;
          case "left":
            W = L.getParent();
            break;
        }
        W && (z = W.key);
      }
    }
    z !== null && (i.value = null, a.value = z);
  }
  const I = F(() => {
    const { inverted: k } = e, R = h.value, { common: { cubicBezierEaseInOut: _ }, self: z } = v.value, { padding: L, dividerColor: W, borderRadius: Z, optionOpacityDisabled: B, [pe("optionIconSuffixWidth", R)]: j, [pe("optionSuffixWidth", R)]: ee, [pe("optionIconPrefixWidth", R)]: P, [pe("optionPrefixWidth", R)]: E, [pe("fontSize", R)]: ue, [pe("optionHeight", R)]: me, [pe("optionIconSize", R)]: ge } = z, se = { "--n-bezier": _, "--n-font-size": ue, "--n-padding": L, "--n-border-radius": Z, "--n-option-height": me, "--n-option-prefix-width": E, "--n-option-icon-prefix-width": P, "--n-option-suffix-width": ee, "--n-option-icon-suffix-width": j, "--n-option-icon-size": ge, "--n-divider-color": W, "--n-option-opacity-disabled": B };
    return k ? (se["--n-color"] = z.colorInverted, se["--n-option-color-hover"] = z.optionColorHoverInverted, se["--n-option-color-active"] = z.optionColorActiveInverted, se["--n-option-text-color"] = z.optionTextColorInverted, se["--n-option-text-color-hover"] = z.optionTextColorHoverInverted, se["--n-option-text-color-active"] = z.optionTextColorActiveInverted, se["--n-option-text-color-child-active"] = z.optionTextColorChildActiveInverted, se["--n-prefix-color"] = z.prefixColorInverted, se["--n-suffix-color"] = z.suffixColorInverted, se["--n-group-header-text-color"] = z.groupHeaderTextColorInverted) : (se["--n-color"] = z.color, se["--n-option-color-hover"] = z.optionColorHover, se["--n-option-color-active"] = z.optionColorActive, se["--n-option-text-color"] = z.optionTextColor, se["--n-option-text-color-hover"] = z.optionTextColorHover, se["--n-option-text-color-active"] = z.optionTextColorActive, se["--n-option-text-color-child-active"] = z.optionTextColorChildActive, se["--n-prefix-color"] = z.prefixColor, se["--n-suffix-color"] = z.suffixColor, se["--n-group-header-text-color"] = z.groupHeaderTextColor), se;
  }), y = g ? Ye("dropdown", F(() => `${h.value[0]}${e.inverted ? "i" : ""}`), I, e) : void 0;
  return { mergedClsPrefix: m, mergedTheme: v, mergedSize: h, tmNodes: r, mergedShow: n, handleAfterLeave: () => {
    e.animated && $();
  }, doUpdateShow: w, cssVars: g ? void 0 : I, themeClass: y == null ? void 0 : y.themeClass, onRender: y == null ? void 0 : y.onRender };
}, render() {
  const e = (o, r, i, a, l) => {
    var s;
    const { mergedClsPrefix: c, menuProps: f } = this;
    (s = this.onRender) === null || s === void 0 || s.call(this);
    const p = (f == null ? void 0 : f(void 0, this.tmNodes.map((g) => g.rawNode))) || {}, m = { ref: si(r), class: [o, `${c}-dropdown`, `${c}-dropdown--${this.mergedSize}-size`, this.themeClass], clsPrefix: c, tmNodes: this.tmNodes, style: [...i, this.cssVars], showArrow: this.showArrow, arrowStyle: this.arrowStyle, scrollable: this.scrollable, onMouseenter: a, onMouseleave: l };
    return d(Bi, Ft(this.$attrs, m, p));
  }, { mergedTheme: t } = this, n = { show: this.mergedShow, theme: t.peers.Popover, themeOverrides: t.peerOverrides.Popover, internalOnAfterLeave: this.handleAfterLeave, internalRenderBody: e, onUpdateShow: this.doUpdateShow, "onUpdate:show": void 0 };
  return d(tn, Object.assign({}, bo(this.$props, Dc), n), { trigger: () => {
    var o, r;
    return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
  } });
} }), Ai = "_n_all__", Ei = "_n_none__";
function Hc(e, t, n, o) {
  return e ? (r) => {
    for (const i of e) switch (r) {
      case Ai:
        n(true);
        return;
      case Ei:
        o(true);
        return;
      default:
        if (typeof i == "object" && i.key === r) {
          i.onSelect(t.value);
          return;
        }
    }
  } : () => {
  };
}
function Uc(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return { label: t.checkTableAll, key: Ai };
      case "none":
        return { label: t.uncheckTableAll, key: Ei };
      default:
        return n;
    }
  }) : [];
}
const Vc = le({ name: "DataTableSelectionMenu", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  const { props: t, localeRef: n, checkOptionsRef: o, rawPaginatedDataRef: r, doCheckAll: i, doUncheckAll: a } = xe(ct), l = F(() => Hc(o.value, r, i, a)), s = F(() => Uc(o.value, n.value));
  return () => {
    var c, f, p, m;
    const { clsPrefix: g } = e;
    return d(jc, { theme: (f = (c = t.theme) === null || c === void 0 ? void 0 : c.peers) === null || f === void 0 ? void 0 : f.Dropdown, themeOverrides: (m = (p = t.themeOverrides) === null || p === void 0 ? void 0 : p.peers) === null || m === void 0 ? void 0 : m.Dropdown, options: s.value, onSelect: l.value }, { default: () => d(ot, { clsPrefix: g, class: `${g}-data-table-check-extra` }, { default: () => d(Xl, null) }) });
  };
} });
function Xn(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const Wc = le({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, width: String }, render() {
  const { clsPrefix: e, id: t, cols: n, width: o } = this;
  return d("table", { style: { tableLayout: "fixed", width: o }, class: `${e}-data-table-table` }, d("colgroup", null, n.map((r) => d("col", { key: r.key, style: r.style }))), d("thead", { "data-n-id": t, class: `${e}-data-table-thead` }, this.$slots));
} }), Li = le({ name: "DataTableHeader", props: { discrete: { type: Boolean, default: true } }, setup() {
  const { mergedClsPrefixRef: e, scrollXRef: t, fixedColumnLeftMapRef: n, fixedColumnRightMapRef: o, mergedCurrentPageRef: r, allRowsCheckedRef: i, someRowsCheckedRef: a, rowsRef: l, colsRef: s, mergedThemeRef: c, checkOptionsRef: f, mergedSortStateRef: p, componentId: m, mergedTableLayoutRef: g, headerCheckboxDisabledRef: u, virtualScrollHeaderRef: h, headerHeightRef: v, onUnstableColumnResize: b, doUpdateResizableWidth: w, handleTableHeaderScroll: $, deriveNextSorter: x, doUncheckAll: C, doCheckAll: M } = xe(ct), T = D(), V = D({});
  function N(R) {
    const _ = V.value[R];
    return _ == null ? void 0 : _.getBoundingClientRect().width;
  }
  function H() {
    i.value ? C() : M();
  }
  function q(R, _) {
    if (rt(R, "dataTableFilter") || rt(R, "dataTableResizable") || !qn(_)) return;
    const z = p.value.find((W) => W.columnKey === _.key) || null, L = lc(_, z);
    x(L);
  }
  const I = /* @__PURE__ */ new Map();
  function y(R) {
    I.set(R.key, N(R.key));
  }
  function k(R, _) {
    const z = I.get(R.key);
    if (z === void 0) return;
    const L = z + _, W = oc(L, R.minWidth, R.maxWidth);
    b(L, W, R, N), w(R, W);
  }
  return { cellElsRef: V, componentId: m, mergedSortState: p, mergedClsPrefix: e, scrollX: t, fixedColumnLeftMap: n, fixedColumnRightMap: o, currentPage: r, allRowsChecked: i, someRowsChecked: a, rows: l, cols: s, mergedTheme: c, checkOptions: f, mergedTableLayout: g, headerCheckboxDisabled: u, headerHeight: v, virtualScrollHeader: h, virtualListRef: T, handleCheckboxUpdateChecked: H, handleColHeaderClick: q, handleTableHeaderScroll: $, handleColumnResizeStart: y, handleColumnResize: k };
}, render() {
  const { cellElsRef: e, mergedClsPrefix: t, fixedColumnLeftMap: n, fixedColumnRightMap: o, currentPage: r, allRowsChecked: i, someRowsChecked: a, rows: l, cols: s, mergedTheme: c, checkOptions: f, componentId: p, discrete: m, mergedTableLayout: g, headerCheckboxDisabled: u, mergedSortState: h, virtualScrollHeader: v, handleColHeaderClick: b, handleCheckboxUpdateChecked: w, handleColumnResizeStart: $, handleColumnResize: x } = this, C = (N, H, q) => N.map(({ column: I, colIndex: y, colSpan: k, rowSpan: R, isLast: _ }) => {
    var z, L;
    const W = st(I), { ellipsis: Z } = I, B = () => I.type === "selection" ? I.multiple !== false ? d(dt, null, d(Oo, { key: r, privateInsideTable: true, checked: i, indeterminate: a, disabled: u, onUpdateChecked: w }), f ? d(Vc, { clsPrefix: t }) : null) : null : d(dt, null, d("div", { class: `${t}-data-table-th__title-wrapper` }, d("div", { class: `${t}-data-table-th__title` }, Z === true || Z && !Z.tooltip ? d("div", { class: `${t}-data-table-th__ellipsis` }, Xn(I)) : Z && typeof Z == "object" ? d(Mo, Object.assign({}, Z, { theme: c.peers.Ellipsis, themeOverrides: c.peerOverrides.Ellipsis }), { default: () => Xn(I) }) : Xn(I)), qn(I) ? d($c, { column: I }) : null), zr(I) ? d(Pc, { column: I, options: I.filterOptions }) : null, Pi(I) ? d(zc, { onResizeStart: () => {
      $(I);
    }, onResize: (E) => {
      x(I, E);
    } }) : null), j = W in n, ee = W in o, P = H && !I.fixed ? "div" : "th";
    return d(P, { ref: (E) => e[W] = E, key: W, style: [H && !I.fixed ? { position: "absolute", left: He(H(y)), top: 0, bottom: 0 } : { left: He((z = n[W]) === null || z === void 0 ? void 0 : z.start), right: He((L = o[W]) === null || L === void 0 ? void 0 : L.start) }, { width: He(I.width), textAlign: I.titleAlign || I.align, height: q }], colspan: k, rowspan: R, "data-col-key": W, class: [`${t}-data-table-th`, (j || ee) && `${t}-data-table-th--fixed-${j ? "left" : "right"}`, { [`${t}-data-table-th--sorting`]: zi(I, h), [`${t}-data-table-th--filterable`]: zr(I), [`${t}-data-table-th--sortable`]: qn(I), [`${t}-data-table-th--selection`]: I.type === "selection", [`${t}-data-table-th--last`]: _ }, I.className], onClick: I.type !== "selection" && I.type !== "expand" && !("children" in I) ? (E) => {
      b(E, I);
    } : void 0 }, B());
  });
  if (v) {
    const { headerHeight: N } = this;
    let H = 0, q = 0;
    return s.forEach((I) => {
      I.column.fixed === "left" ? H++ : I.column.fixed === "right" && q++;
    }), d(Po, { ref: "virtualListRef", class: `${t}-data-table-base-table-header`, style: { height: He(N) }, onScroll: this.handleTableHeaderScroll, columns: s, itemSize: N, showScrollbar: false, items: [{}], itemResizable: false, visibleItemsTag: Wc, visibleItemsProps: { clsPrefix: t, id: p, cols: s, width: We(this.scrollX) }, renderItemWithCols: ({ startColIndex: I, endColIndex: y, getLeft: k }) => {
      const R = s.map((z, L) => ({ column: z.column, isLast: L === s.length - 1, colIndex: z.index, colSpan: 1, rowSpan: 1 })).filter(({ column: z }, L) => !!(I <= L && L <= y || z.fixed)), _ = C(R, k, He(N));
      return _.splice(H, 0, d("th", { colspan: s.length - H - q, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), d("tr", { style: { position: "relative" } }, _);
    } }, { default: ({ renderedItemWithCols: I }) => I });
  }
  const M = d("thead", { class: `${t}-data-table-thead`, "data-n-id": p }, l.map((N) => d("tr", { class: `${t}-data-table-tr` }, C(N, null, void 0))));
  if (!m) return M;
  const { handleTableHeaderScroll: T, scrollX: V } = this;
  return d("div", { class: `${t}-data-table-base-table-header`, onScroll: T }, d("table", { class: `${t}-data-table-table`, style: { minWidth: We(V), tableLayout: g } }, d("colgroup", null, s.map((N) => d("col", { key: N.key, style: N.style }))), M));
} });
function Gc(e, t) {
  const n = [];
  function o(r, i) {
    r.forEach((a) => {
      a.children && t.has(a.key) ? (n.push({ tmNode: a, striped: false, key: a.key, index: i }), o(a.children, i)) : n.push({ key: a.key, tmNode: a, striped: false, index: i });
    });
  }
  return e.forEach((r) => {
    n.push(r);
    const { children: i } = r.tmNode;
    i && t.has(r.key) && o(i, r.index);
  }), n;
}
const qc = le({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, onMouseenter: Function, onMouseleave: Function }, render() {
  const { clsPrefix: e, id: t, cols: n, onMouseenter: o, onMouseleave: r } = this;
  return d("table", { style: { tableLayout: "fixed" }, class: `${e}-data-table-table`, onMouseenter: o, onMouseleave: r }, d("colgroup", null, n.map((i) => d("col", { key: i.key, style: i.style }))), d("tbody", { "data-n-id": t, class: `${e}-data-table-tbody` }, this.$slots));
} }), Xc = le({ name: "DataTableBody", props: { onResize: Function, showHeader: Boolean, flexHeight: Boolean, bodyStyle: Object }, setup(e) {
  const { slots: t, bodyWidthRef: n, mergedExpandedRowKeysRef: o, mergedClsPrefixRef: r, mergedThemeRef: i, scrollXRef: a, colsRef: l, paginatedDataRef: s, rawPaginatedDataRef: c, fixedColumnLeftMapRef: f, fixedColumnRightMapRef: p, mergedCurrentPageRef: m, rowClassNameRef: g, leftActiveFixedColKeyRef: u, leftActiveFixedChildrenColKeysRef: h, rightActiveFixedColKeyRef: v, rightActiveFixedChildrenColKeysRef: b, renderExpandRef: w, hoverKeyRef: $, summaryRef: x, mergedSortStateRef: C, virtualScrollRef: M, virtualScrollXRef: T, heightForRowRef: V, minRowHeightRef: N, componentId: H, mergedTableLayoutRef: q, childTriggerColIndexRef: I, indentRef: y, rowPropsRef: k, stripedRef: R, loadingRef: _, onLoadRef: z, loadingKeySetRef: L, expandableRef: W, stickyExpandedRowsRef: Z, renderExpandIconRef: B, summaryPlacementRef: j, treeMateRef: ee, scrollbarPropsRef: P, setHeaderScrollLeft: E, doUpdateExpandedRowKeys: ue, handleTableBodyScroll: me, doCheck: ge, doUncheck: se, renderCell: K, xScrollableRef: de, explicitlyScrollableRef: Ce } = xe(ct), we = xe(Kl), Fe = D(null), Ne = D(null), Ke = D(null), ce = F(() => {
    var re, he;
    return (he = (re = we == null ? void 0 : we.mergedComponentPropsRef.value) === null || re === void 0 ? void 0 : re.DataTable) === null || he === void 0 ? void 0 : he.renderEmpty;
  }), be = Pe(() => s.value.length === 0), $e = Pe(() => M.value && !be.value);
  let ke = "";
  const je = F(() => new Set(o.value));
  function Ge(re) {
    var he;
    return (he = ee.value.getNode(re)) === null || he === void 0 ? void 0 : he.rawNode;
  }
  function _e(re, he, S) {
    const A = Ge(re.key);
    if (!A) {
      It("data-table", `fail to get row data with key ${re.key}`);
      return;
    }
    if (S) {
      const te = s.value.findIndex((fe) => fe.key === ke);
      if (te !== -1) {
        const fe = s.value.findIndex((ve) => ve.key === re.key), J = Math.min(te, fe), ie = Math.max(te, fe), ae = [];
        s.value.slice(J, ie + 1).forEach((ve) => {
          ve.disabled || ae.push(ve.key);
        }), he ? ge(ae, false, A) : se(ae, A), ke = re.key;
        return;
      }
    }
    he ? ge(re.key, false, A) : se(re.key, A), ke = re.key;
  }
  function U(re) {
    const he = Ge(re.key);
    if (!he) {
      It("data-table", `fail to get row data with key ${re.key}`);
      return;
    }
    ge(re.key, true, he);
  }
  function Y() {
    if ($e.value) return De();
    const { value: re } = Fe;
    return re ? re.containerRef : null;
  }
  function Se(re, he) {
    var S;
    if (L.value.has(re)) return;
    const { value: A } = o, te = A.indexOf(re), fe = Array.from(A);
    ~te ? (fe.splice(te, 1), ue(fe)) : he && !he.isLeaf && !he.shallowLoaded ? (L.value.add(re), (S = z.value) === null || S === void 0 || S.call(z, he.rawNode).then(() => {
      const { value: J } = o, ie = Array.from(J);
      ~ie.indexOf(re) || ie.push(re), ue(ie);
    }).finally(() => {
      L.value.delete(re);
    })) : (fe.push(re), ue(fe));
  }
  function it() {
    $.value = null;
  }
  function De() {
    const { value: re } = Ne;
    return (re == null ? void 0 : re.listElRef) || null;
  }
  function Me() {
    const { value: re } = Ne;
    return (re == null ? void 0 : re.itemsElRef) || null;
  }
  function Xe(re) {
    var he;
    me(re), (he = Fe.value) === null || he === void 0 || he.sync();
  }
  function Oe(re) {
    var he;
    const { onResize: S } = e;
    S && S(re), (he = Fe.value) === null || he === void 0 || he.sync();
  }
  const et = { getScrollContainer: Y, scrollTo(re, he) {
    var S, A;
    M.value ? (S = Ne.value) === null || S === void 0 || S.scrollTo(re, he) : (A = Fe.value) === null || A === void 0 || A.scrollTo(re, he);
  } }, tt = X([({ props: re }) => {
    const he = (A) => A === null ? null : X(`[data-n-id="${re.componentId}"] [data-col-key="${A}"]::after`, { boxShadow: "var(--n-box-shadow-after)" }), S = (A) => A === null ? null : X(`[data-n-id="${re.componentId}"] [data-col-key="${A}"]::before`, { boxShadow: "var(--n-box-shadow-before)" });
    return X([he(re.leftActiveFixedColKey), S(re.rightActiveFixedColKey), re.leftActiveFixedChildrenColKeys.map((A) => he(A)), re.rightActiveFixedChildrenColKeys.map((A) => S(A))]);
  }]);
  let Je = false;
  return zt(() => {
    const { value: re } = u, { value: he } = h, { value: S } = v, { value: A } = b;
    if (!Je && re === null && S === null) return;
    const te = { leftActiveFixedColKey: re, leftActiveFixedChildrenColKeys: he, rightActiveFixedColKey: S, rightActiveFixedChildrenColKeys: A, componentId: H };
    tt.mount({ id: `n-${H}`, force: true, props: te, anchorMetaName: jl, parent: we == null ? void 0 : we.styleMountTarget }), Je = true;
  }), Hl(() => {
    tt.unmount({ id: `n-${H}`, parent: we == null ? void 0 : we.styleMountTarget });
  }), Object.assign({ bodyWidth: n, summaryPlacement: j, dataTableSlots: t, componentId: H, scrollbarInstRef: Fe, virtualListRef: Ne, emptyElRef: Ke, summary: x, mergedClsPrefix: r, mergedTheme: i, mergedRenderEmpty: ce, scrollX: a, cols: l, loading: _, shouldDisplayVirtualList: $e, empty: be, paginatedDataAndInfo: F(() => {
    const { value: re } = R;
    let he = false;
    return { data: s.value.map(re ? (A, te) => (A.isLeaf || (he = true), { tmNode: A, key: A.key, striped: te % 2 === 1, index: te }) : (A, te) => (A.isLeaf || (he = true), { tmNode: A, key: A.key, striped: false, index: te })), hasChildren: he };
  }), rawPaginatedData: c, fixedColumnLeftMap: f, fixedColumnRightMap: p, currentPage: m, rowClassName: g, renderExpand: w, mergedExpandedRowKeySet: je, hoverKey: $, mergedSortState: C, virtualScroll: M, virtualScrollX: T, heightForRow: V, minRowHeight: N, mergedTableLayout: q, childTriggerColIndex: I, indent: y, rowProps: k, loadingKeySet: L, expandable: W, stickyExpandedRows: Z, renderExpandIcon: B, scrollbarProps: P, setHeaderScrollLeft: E, handleVirtualListScroll: Xe, handleVirtualListResize: Oe, handleMouseleaveTable: it, virtualListContainer: De, virtualListContent: Me, handleTableBodyScroll: me, handleCheckboxUpdateChecked: _e, handleRadioUpdateChecked: U, handleUpdateExpanded: Se, renderCell: K, explicitlyScrollable: Ce, xScrollable: de }, et);
}, render() {
  const { mergedTheme: e, scrollX: t, mergedClsPrefix: n, explicitlyScrollable: o, xScrollable: r, loadingKeySet: i, onResize: a, setHeaderScrollLeft: l, empty: s, shouldDisplayVirtualList: c } = this, f = { minWidth: We(t) || "100%" };
  t && (f.width = "100%");
  const p = () => d("div", { class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`], style: [this.bodyStyle, r ? "position: sticky; left: 0; width: var(--n-scrollbar-current-width);" : void 0], ref: "emptyElRef" }, mn(this.dataTableSlots.empty, () => {
    var g;
    return [((g = this.mergedRenderEmpty) === null || g === void 0 ? void 0 : g.call(this)) || d(pi, { theme: this.mergedTheme.peers.Empty, themeOverrides: this.mergedTheme.peerOverrides.Empty })];
  })), m = d(go, Object.assign({}, this.scrollbarProps, { ref: "scrollbarInstRef", scrollable: o || r, class: `${n}-data-table-base-table-body`, style: s ? "height: initial;" : this.bodyStyle, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, contentStyle: f, container: c ? this.virtualListContainer : void 0, content: c ? this.virtualListContent : void 0, horizontalRailStyle: { zIndex: 3 }, verticalRailStyle: { zIndex: 3 }, internalExposeWidthCssVar: r && s, xScrollable: r, onScroll: c ? void 0 : this.handleTableBodyScroll, internalOnUpdateScrollLeft: l, onResize: a }), { default: () => {
    if (this.empty && !this.showHeader && (this.explicitlyScrollable || this.xScrollable)) return p();
    const g = {}, u = {}, { cols: h, paginatedDataAndInfo: v, mergedTheme: b, fixedColumnLeftMap: w, fixedColumnRightMap: $, currentPage: x, rowClassName: C, mergedSortState: M, mergedExpandedRowKeySet: T, stickyExpandedRows: V, componentId: N, childTriggerColIndex: H, expandable: q, rowProps: I, handleMouseleaveTable: y, renderExpand: k, summary: R, handleCheckboxUpdateChecked: _, handleRadioUpdateChecked: z, handleUpdateExpanded: L, heightForRow: W, minRowHeight: Z, virtualScrollX: B } = this, { length: j } = h;
    let ee;
    const { data: P, hasChildren: E } = v, ue = E ? Gc(P, T) : P;
    if (R) {
      const ce = R(this.rawPaginatedData);
      if (Array.isArray(ce)) {
        const be = ce.map(($e, ke) => ({ isSummaryRow: true, key: `__n_summary__${ke}`, tmNode: { rawNode: $e, disabled: true }, index: -1 }));
        ee = this.summaryPlacement === "top" ? [...be, ...ue] : [...ue, ...be];
      } else {
        const be = { isSummaryRow: true, key: "__n_summary__", tmNode: { rawNode: ce, disabled: true }, index: -1 };
        ee = this.summaryPlacement === "top" ? [be, ...ue] : [...ue, be];
      }
    } else ee = ue;
    const me = E ? { width: He(this.indent) } : void 0, ge = [];
    ee.forEach((ce) => {
      k && T.has(ce.key) && (!q || q(ce.tmNode.rawNode)) ? ge.push(ce, { isExpandedRow: true, key: `${ce.key}-expand`, tmNode: ce.tmNode, index: ce.index }) : ge.push(ce);
    });
    const { length: se } = ge, K = {};
    P.forEach(({ tmNode: ce }, be) => {
      K[be] = ce.key;
    });
    const de = V ? this.bodyWidth : null, Ce = de === null ? void 0 : `${de}px`, we = this.virtualScrollX ? "div" : "td";
    let Fe = 0, Ne = 0;
    B && h.forEach((ce) => {
      ce.column.fixed === "left" ? Fe++ : ce.column.fixed === "right" && Ne++;
    });
    const Ke = ({ rowInfo: ce, displayedRowIndex: be, isVirtual: $e, isVirtualX: ke, startColIndex: je, endColIndex: Ge, getLeft: _e }) => {
      const { index: U } = ce;
      if ("isExpandedRow" in ce) {
        const { tmNode: { key: S, rawNode: A } } = ce;
        return d("tr", { class: `${n}-data-table-tr ${n}-data-table-tr--expanded`, key: `${S}__expand` }, d("td", { class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, be + 1 === se && `${n}-data-table-td--last-row`], colspan: j }, V ? d("div", { class: `${n}-data-table-expand`, style: { width: Ce } }, k(A, U)) : k(A, U)));
      }
      const Y = "isSummaryRow" in ce, Se = !Y && ce.striped, { tmNode: it, key: De } = ce, { rawNode: Me } = it, Xe = T.has(De), Oe = I ? I(Me, U) : void 0, et = typeof C == "string" ? C : ic(Me, U, C), tt = ke ? h.filter((S, A) => !!(je <= A && A <= Ge || S.column.fixed)) : h, Je = ke ? He((W == null ? void 0 : W(Me, U)) || Z) : void 0, re = tt.map((S) => {
        var A, te, fe, J, ie;
        const ae = S.index;
        if (be in g) {
          const Ve = g[be], Ze = Ve.indexOf(ae);
          if (~Ze) return Ve.splice(Ze, 1), null;
        }
        const { column: ve } = S, ze = st(S), { rowSpan: ut, colSpan: lt } = ve, ft = Y ? ((A = ce.tmNode.rawNode[ze]) === null || A === void 0 ? void 0 : A.colSpan) || 1 : lt ? lt(Me, U) : 1, ht = Y ? ((te = ce.tmNode.rawNode[ze]) === null || te === void 0 ? void 0 : te.rowSpan) || 1 : ut ? ut(Me, U) : 1, $t = ae + ft === j, Ot = be + ht === se, vt = ht > 1;
        if (vt && (u[be] = { [ae]: [] }), ft > 1 || vt) for (let Ve = be; Ve < be + ht; ++Ve) {
          vt && u[be][ae].push(K[Ve]);
          for (let Ze = ae; Ze < ae + ft; ++Ze) Ve === be && Ze === ae || (Ve in g ? g[Ve].push(Ze) : g[Ve] = [Ze]);
        }
        const St = vt ? this.hoverKey : null, { cellProps: Tt } = ve, at = Tt == null ? void 0 : Tt(Me, U), _t = { "--indent-offset": "" }, Gt = ve.fixed ? "td" : we;
        return d(Gt, Object.assign({}, at, { key: ze, style: [{ textAlign: ve.align || void 0, width: He(ve.width) }, ke && { height: Je }, ke && !ve.fixed ? { position: "absolute", left: He(_e(ae)), top: 0, bottom: 0 } : { left: He((fe = w[ze]) === null || fe === void 0 ? void 0 : fe.start), right: He((J = $[ze]) === null || J === void 0 ? void 0 : J.start) }, _t, (at == null ? void 0 : at.style) || ""], colspan: ft, rowspan: $e ? void 0 : ht, "data-col-key": ze, class: [`${n}-data-table-td`, ve.className, at == null ? void 0 : at.class, Y && `${n}-data-table-td--summary`, St !== null && u[be][ae].includes(St) && `${n}-data-table-td--hover`, zi(ve, M) && `${n}-data-table-td--sorting`, ve.fixed && `${n}-data-table-td--fixed-${ve.fixed}`, ve.align && `${n}-data-table-td--${ve.align}-align`, ve.type === "selection" && `${n}-data-table-td--selection`, ve.type === "expand" && `${n}-data-table-td--expand`, $t && `${n}-data-table-td--last-col`, Ot && `${n}-data-table-td--last-row`] }), E && ae === H ? [Ul(_t["--indent-offset"] = Y ? 0 : ce.tmNode.level, d("div", { class: `${n}-data-table-indent`, style: me })), Y || ce.tmNode.isLeaf ? d("div", { class: `${n}-data-table-expand-placeholder` }) : d($r, { class: `${n}-data-table-expand-trigger`, clsPrefix: n, expanded: Xe, rowData: Me, renderExpandIcon: this.renderExpandIcon, loading: i.has(ce.key), onClick: () => {
          L(De, ce.tmNode);
        } })] : null, ve.type === "selection" ? Y ? null : ve.multiple === false ? d(mc, { key: x, rowKey: De, disabled: ce.tmNode.disabled, onUpdateChecked: () => {
          z(ce.tmNode);
        } }) : d(dc, { key: x, rowKey: De, disabled: ce.tmNode.disabled, onUpdateChecked: (Ve, Ze) => {
          _(ce.tmNode, Ve, Ze.shiftKey);
        } }) : ve.type === "expand" ? Y ? null : !ve.expandable || !((ie = ve.expandable) === null || ie === void 0) && ie.call(ve, Me) ? d($r, { clsPrefix: n, rowData: Me, expanded: Xe, renderExpandIcon: this.renderExpandIcon, onClick: () => {
          L(De, null);
        } }) : null : d(Cc, { clsPrefix: n, index: U, row: Me, column: ve, isSummary: Y, mergedTheme: b, renderCell: this.renderCell }));
      });
      return ke && Fe && Ne && re.splice(Fe, 0, d("td", { colspan: h.length - Fe - Ne, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), d("tr", Object.assign({}, Oe, { onMouseenter: (S) => {
        var A;
        this.hoverKey = De, (A = Oe == null ? void 0 : Oe.onMouseenter) === null || A === void 0 || A.call(Oe, S);
      }, key: De, class: [`${n}-data-table-tr`, Y && `${n}-data-table-tr--summary`, Se && `${n}-data-table-tr--striped`, Xe && `${n}-data-table-tr--expanded`, et, Oe == null ? void 0 : Oe.class], style: [Oe == null ? void 0 : Oe.style, ke && { height: Je }] }), re);
    };
    return this.shouldDisplayVirtualList ? d(Po, { ref: "virtualListRef", items: ge, itemSize: this.minRowHeight, visibleItemsTag: qc, visibleItemsProps: { clsPrefix: n, id: N, cols: h, onMouseleave: y }, showScrollbar: false, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemsStyle: f, itemResizable: !B, columns: h, renderItemWithCols: B ? ({ itemIndex: ce, item: be, startColIndex: $e, endColIndex: ke, getLeft: je }) => Ke({ displayedRowIndex: ce, isVirtual: true, isVirtualX: true, rowInfo: be, startColIndex: $e, endColIndex: ke, getLeft: je }) : void 0 }, { default: ({ item: ce, index: be, renderedItemWithCols: $e }) => $e || Ke({ rowInfo: ce, displayedRowIndex: be, isVirtual: true, isVirtualX: false, startColIndex: 0, endColIndex: 0, getLeft(ke) {
      return 0;
    } }) }) : d(dt, null, d("table", { class: `${n}-data-table-table`, onMouseleave: y, style: { tableLayout: this.mergedTableLayout } }, d("colgroup", null, h.map((ce) => d("col", { key: ce.key, style: ce.style }))), this.showHeader ? d(Li, { discrete: false }) : null, this.empty ? null : d("tbody", { "data-n-id": N, class: `${n}-data-table-tbody` }, ge.map((ce, be) => Ke({ rowInfo: ce, displayedRowIndex: be, isVirtual: false, isVirtualX: false, startColIndex: -1, endColIndex: -1, getLeft($e) {
      return -1;
    } })))), this.empty && this.xScrollable ? p() : null);
  } });
  return this.empty ? this.explicitlyScrollable || this.xScrollable ? m : d(Yn, { onResize: this.onResize }, { default: p }) : m;
} }), Zc = le({ name: "MainTable", setup() {
  const { mergedClsPrefixRef: e, rightFixedColumnsRef: t, leftFixedColumnsRef: n, bodyWidthRef: o, maxHeightRef: r, minHeightRef: i, flexHeightRef: a, virtualScrollHeaderRef: l, syncScrollState: s, scrollXRef: c } = xe(ct), f = D(null), p = D(null), m = D(null), g = D(!(n.value.length || t.value.length)), u = F(() => ({ maxHeight: We(r.value), minHeight: We(i.value) }));
  function h($) {
    o.value = $.contentRect.width, s(), g.value || (g.value = true);
  }
  function v() {
    var $;
    const { value: x } = f;
    return x ? l.value ? (($ = x.virtualListRef) === null || $ === void 0 ? void 0 : $.listElRef) || null : x.$el : null;
  }
  function b() {
    const { value: $ } = p;
    return $ ? $.getScrollContainer() : null;
  }
  const w = { getBodyElement: b, getHeaderElement: v, scrollTo($, x) {
    var C;
    (C = p.value) === null || C === void 0 || C.scrollTo($, x);
  } };
  return zt(() => {
    const { value: $ } = m;
    if (!$) return;
    const x = `${e.value}-data-table-base-table--transition-disabled`;
    g.value ? setTimeout(() => {
      $.classList.remove(x);
    }, 0) : $.classList.add(x);
  }), Object.assign({ maxHeight: r, mergedClsPrefix: e, selfElRef: m, headerInstRef: f, bodyInstRef: p, bodyStyle: u, flexHeight: a, handleBodyResize: h, scrollX: c }, w);
}, render() {
  const { mergedClsPrefix: e, maxHeight: t, flexHeight: n } = this, o = t === void 0 && !n;
  return d("div", { class: `${e}-data-table-base-table`, ref: "selfElRef" }, o ? null : d(Li, { ref: "headerInstRef" }), d(Xc, { ref: "bodyInstRef", bodyStyle: this.bodyStyle, showHeader: o, flexHeight: n, onResize: this.handleBodyResize }));
} }), Tr = Jc(), Yc = X([O("data-table", `
 width: 100%;
 font-size: var(--n-font-size);
 display: flex;
 flex-direction: column;
 position: relative;
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 --n-merged-th-color-hover: var(--n-th-color-hover);
 --n-merged-th-color-sorting: var(--n-th-color-sorting);
 --n-merged-td-color-hover: var(--n-td-color-hover);
 --n-merged-td-color-sorting: var(--n-td-color-sorting);
 --n-merged-td-color-striped: var(--n-td-color-striped);
 `, [O("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), G("flex-height", [X(">", [O("data-table-wrapper", [X(">", [O("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [X(">", [O("data-table-base-table-body", "flex-basis: 0;", [X("&:last-child", "flex-grow: 1;")])])])])])])]), X(">", [O("data-table-loading-wrapper", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [xn({ originalTransform: "translateX(-50%) translateY(-50%)" })])]), O("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), O("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), O("data-table-expand-trigger", `
 display: inline-flex;
 margin-right: 8px;
 cursor: pointer;
 font-size: 16px;
 vertical-align: -0.2em;
 position: relative;
 width: 16px;
 height: 16px;
 color: var(--n-td-text-color);
 transition: color .3s var(--n-bezier);
 `, [G("expanded", [O("icon", "transform: rotate(90deg);", [Dt({ originalTransform: "rotate(90deg)" })]), O("base-icon", "transform: rotate(90deg);", [Dt({ originalTransform: "rotate(90deg)" })])]), O("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Dt()]), O("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Dt()]), O("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Dt()])]), O("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), O("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [O("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), G("striped", "background-color: var(--n-merged-td-color-striped);", [O("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), Le("summary", [X("&:hover", "background-color: var(--n-merged-td-color-hover);", [X(">", [O("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), O("data-table-th", `
 padding: var(--n-th-padding);
 position: relative;
 text-align: start;
 box-sizing: border-box;
 background-color: var(--n-merged-th-color);
 border-color: var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 color: var(--n-th-text-color);
 transition:
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 font-weight: var(--n-th-font-weight);
 `, [G("filterable", `
 padding-right: 36px;
 `, [G("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Tr, G("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), Q("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [Q("title", `
 flex: 1;
 min-width: 0;
 `)]), Q("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), G("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), G("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), G("sortable", `
 cursor: pointer;
 `, [Q("ellipsis", `
 max-width: calc(100% - 18px);
 `), X("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), O("data-table-sorter", `
 height: var(--n-sorter-size);
 width: var(--n-sorter-size);
 margin-left: 4px;
 position: relative;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 vertical-align: -0.2em;
 color: var(--n-th-icon-color);
 transition: color .3s var(--n-bezier);
 `, [O("base-icon", "transition: transform .3s var(--n-bezier)"), G("desc", [O("base-icon", `
 transform: rotate(0deg);
 `)]), G("asc", [O("base-icon", `
 transform: rotate(-180deg);
 `)]), G("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), O("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [X("&::after", `
 width: var(--n-resizable-size);
 height: 50%;
 position: absolute;
 top: 50%;
 left: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 background-color: var(--n-merged-border-color);
 transform: translateY(-50%);
 transition: background-color .3s var(--n-bezier);
 z-index: 1;
 content: '';
 `), G("active", [X("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), X("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), O("data-table-filter", `
 position: absolute;
 z-index: auto;
 right: 0;
 width: 36px;
 top: 0;
 bottom: 0;
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: var(--n-filter-size);
 color: var(--n-th-icon-color);
 `, [X("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), G("show", `
 background-color: var(--n-th-button-color-hover);
 `), G("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), O("data-table-td", `
 padding: var(--n-td-padding);
 text-align: start;
 box-sizing: border-box;
 border: none;
 background-color: var(--n-merged-td-color);
 color: var(--n-td-text-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [G("expand", [O("data-table-expand-trigger", `
 margin-right: 0;
 `)]), G("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [X("&::after", `
 bottom: 0 !important;
 `), X("&::before", `
 bottom: 0 !important;
 `)]), G("summary", `
 background-color: var(--n-merged-th-color);
 `), G("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), G("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), Q("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), G("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Tr]), O("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [G("hide", `
 opacity: 0;
 `)]), Q("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), O("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), G("loading", [O("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), G("single-column", [O("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [X("&::after, &::before", `
 bottom: 0 !important;
 `)])]), Le("single-line", [O("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [G("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), O("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [G("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), G("bordered", [O("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), O("data-table-base-table", [G("transition-disabled", [O("data-table-th", [X("&::after, &::before", "transition: none;")]), O("data-table-td", [X("&::after, &::before", "transition: none;")])])]), G("bottom-bordered", [O("data-table-td", [G("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), O("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), O("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [X("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), O("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), O("data-table-filter-menu", [O("scrollbar", `
 max-height: 240px;
 `), Q("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [O("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), O("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), Q("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [O("button", [X("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), X("&:last-child", `
 margin-right: 0;
 `)])]), O("divider", `
 margin: 0 !important;
 `)]), Nr(O("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), Dr(O("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function Jc() {
  return [G("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [X("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), G("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [X("&::before", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 left: -36px;
 `)])];
}
function Qc(e, t) {
  const { paginatedDataRef: n, treeMateRef: o, selectionColumnRef: r } = t, i = D(e.defaultCheckedRowKeys), a = F(() => {
    var C;
    const { checkedRowKeys: M } = e, T = M === void 0 ? i.value : M;
    return ((C = r.value) === null || C === void 0 ? void 0 : C.multiple) === false ? { checkedKeys: T.slice(0, 1), indeterminateKeys: [] } : o.value.getCheckedKeys(T, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded });
  }), l = F(() => a.value.checkedKeys), s = F(() => a.value.indeterminateKeys), c = F(() => new Set(l.value)), f = F(() => new Set(s.value)), p = F(() => {
    const { value: C } = c;
    return n.value.reduce((M, T) => {
      const { key: V, disabled: N } = T;
      return M + (!N && C.has(V) ? 1 : 0);
    }, 0);
  }), m = F(() => n.value.filter((C) => C.disabled).length), g = F(() => {
    const { length: C } = n.value, { value: M } = f;
    return p.value > 0 && p.value < C - m.value || n.value.some((T) => M.has(T.key));
  }), u = F(() => {
    const { length: C } = n.value;
    return p.value !== 0 && p.value === C - m.value;
  }), h = F(() => n.value.length === 0);
  function v(C, M, T) {
    const { "onUpdate:checkedRowKeys": V, onUpdateCheckedRowKeys: N, onCheckedRowKeysChange: H } = e, q = [], { value: { getNode: I } } = o;
    C.forEach((y) => {
      var k;
      const R = (k = I(y)) === null || k === void 0 ? void 0 : k.rawNode;
      q.push(R);
    }), V && ne(V, C, q, { row: M, action: T }), N && ne(N, C, q, { row: M, action: T }), H && ne(H, C, q, { row: M, action: T }), i.value = C;
  }
  function b(C, M = false, T) {
    if (!e.loading) {
      if (M) {
        v(Array.isArray(C) ? C.slice(0, 1) : [C], T, "check");
        return;
      }
      v(o.value.check(C, l.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, T, "check");
    }
  }
  function w(C, M) {
    e.loading || v(o.value.uncheck(C, l.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, M, "uncheck");
  }
  function $(C = false) {
    const { value: M } = r;
    if (!M || e.loading) return;
    const T = [];
    (C ? o.value.treeNodes : n.value).forEach((V) => {
      V.disabled || T.push(V.key);
    }), v(o.value.check(T, l.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "checkAll");
  }
  function x(C = false) {
    const { value: M } = r;
    if (!M || e.loading) return;
    const T = [];
    (C ? o.value.treeNodes : n.value).forEach((V) => {
      V.disabled || T.push(V.key);
    }), v(o.value.uncheck(T, l.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "uncheckAll");
  }
  return { mergedCheckedRowKeySetRef: c, mergedCheckedRowKeysRef: l, mergedInderminateRowKeySetRef: f, someRowsCheckedRef: g, allRowsCheckedRef: u, headerCheckboxDisabledRef: h, doUpdateCheckedRowKeys: v, doCheckAll: $, doUncheckAll: x, doCheck: b, doUncheck: w };
}
function eu(e, t) {
  const n = Pe(() => {
    for (const c of e.columns) if (c.type === "expand") return c.renderExpand;
  }), o = Pe(() => {
    let c;
    for (const f of e.columns) if (f.type === "expand") {
      c = f.expandable;
      break;
    }
    return c;
  }), r = D(e.defaultExpandAll ? (n == null ? void 0 : n.value) ? (() => {
    const c = [];
    return t.value.treeNodes.forEach((f) => {
      var p;
      !((p = o.value) === null || p === void 0) && p.call(o, f.rawNode) && c.push(f.key);
    }), c;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = oe(e, "expandedRowKeys"), a = oe(e, "stickyExpandedRows"), l = Qe(i, r);
  function s(c) {
    const { onUpdateExpandedRowKeys: f, "onUpdate:expandedRowKeys": p } = e;
    f && ne(f, c), p && ne(p, c), r.value = c;
  }
  return { stickyExpandedRowsRef: a, mergedExpandedRowKeysRef: l, renderExpandRef: n, expandableRef: o, doUpdateExpandedRowKeys: s };
}
function tu(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let a = -1, l = 0, s = false, c = 0;
  function f(m, g) {
    g > a && (n[g] = [], a = g), m.forEach((u) => {
      if ("children" in u) f(u.children, g + 1);
      else {
        const h = "key" in u ? u.key : void 0;
        o.push({ key: st(u), style: rc(u, h !== void 0 ? We(t(h)) : void 0), column: u, index: c++, width: u.width === void 0 ? 128 : Number(u.width) }), l += 1, s || (s = !!u.ellipsis), r.push(u);
      }
    });
  }
  f(e, 0), c = 0;
  function p(m, g) {
    let u = 0;
    m.forEach((h) => {
      var v;
      if ("children" in h) {
        const b = c, w = { column: h, colIndex: c, colSpan: 0, rowSpan: 1, isLast: false };
        p(h.children, g + 1), h.children.forEach(($) => {
          var x, C;
          w.colSpan += (C = (x = i.get($)) === null || x === void 0 ? void 0 : x.colSpan) !== null && C !== void 0 ? C : 0;
        }), b + w.colSpan === l && (w.isLast = true), i.set(h, w), n[g].push(w);
      } else {
        if (c < u) {
          c += 1;
          return;
        }
        let b = 1;
        "titleColSpan" in h && (b = (v = h.titleColSpan) !== null && v !== void 0 ? v : 1), b > 1 && (u = c + b);
        const w = c + b === l, $ = { column: h, colSpan: b, colIndex: c, rowSpan: a - g + 1, isLast: w };
        i.set(h, $), n[g].push($), c += 1;
      }
    });
  }
  return p(e, 0), { hasEllipsis: s, rows: n, cols: o, dataRelatedCols: r };
}
function nu(e, t) {
  const n = F(() => tu(e.columns, t));
  return { rowsRef: F(() => n.value.rows), colsRef: F(() => n.value.cols), hasEllipsisRef: F(() => n.value.hasEllipsis), dataRelatedColsRef: F(() => n.value.dataRelatedCols) };
}
function ou() {
  const e = D({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    Pi(r) && "key" in r && (e.value[r.key] = i);
  }
  function o() {
    e.value = {};
  }
  return { getResizableWidth: t, doUpdateResizableWidth: n, clearResizableWidth: o };
}
function ru(e, { mainTableInstRef: t, mergedCurrentPageRef: n, bodyWidthRef: o, maxHeightRef: r, mergedTableLayoutRef: i }) {
  const a = F(() => e.scrollX !== void 0 || r.value !== void 0 || e.flexHeight), l = F(() => {
    const y = !a.value && i.value === "auto";
    return e.scrollX !== void 0 || y;
  });
  let s = 0;
  const c = D(), f = D(null), p = D([]), m = D(null), g = D([]), u = F(() => We(e.scrollX)), h = F(() => e.columns.filter((y) => y.fixed === "left")), v = F(() => e.columns.filter((y) => y.fixed === "right")), b = F(() => {
    const y = {};
    let k = 0;
    function R(_) {
      _.forEach((z) => {
        const L = { start: k, end: 0 };
        y[st(z)] = L, "children" in z ? (R(z.children), L.end = k) : (k += Rr(z) || 0, L.end = k);
      });
    }
    return R(h.value), y;
  }), w = F(() => {
    const y = {};
    let k = 0;
    function R(_) {
      for (let z = _.length - 1; z >= 0; --z) {
        const L = _[z], W = { start: k, end: 0 };
        y[st(L)] = W, "children" in L ? (R(L.children), W.end = k) : (k += Rr(L) || 0, W.end = k);
      }
    }
    return R(v.value), y;
  });
  function $() {
    var y, k;
    const { value: R } = h;
    let _ = 0;
    const { value: z } = b;
    let L = null;
    for (let W = 0; W < R.length; ++W) {
      const Z = st(R[W]);
      if (s > (((y = z[Z]) === null || y === void 0 ? void 0 : y.start) || 0) - _) L = Z, _ = ((k = z[Z]) === null || k === void 0 ? void 0 : k.end) || 0;
      else break;
    }
    f.value = L;
  }
  function x() {
    p.value = [];
    let y = e.columns.find((k) => st(k) === f.value);
    for (; y && "children" in y; ) {
      const k = y.children.length;
      if (k === 0) break;
      const R = y.children[k - 1];
      p.value.push(st(R)), y = R;
    }
  }
  function C() {
    var y, k;
    const { value: R } = v, _ = Number(e.scrollX), { value: z } = o;
    if (z === null) return;
    let L = 0, W = null;
    const { value: Z } = w;
    for (let B = R.length - 1; B >= 0; --B) {
      const j = st(R[B]);
      if (Math.round(s + (((y = Z[j]) === null || y === void 0 ? void 0 : y.start) || 0) + z - L) < _) W = j, L = ((k = Z[j]) === null || k === void 0 ? void 0 : k.end) || 0;
      else break;
    }
    m.value = W;
  }
  function M() {
    g.value = [];
    let y = e.columns.find((k) => st(k) === m.value);
    for (; y && "children" in y && y.children.length; ) {
      const k = y.children[0];
      g.value.push(st(k)), y = k;
    }
  }
  function T() {
    const y = t.value ? t.value.getHeaderElement() : null, k = t.value ? t.value.getBodyElement() : null;
    return { header: y, body: k };
  }
  function V() {
    const { body: y } = T();
    y && (y.scrollTop = 0);
  }
  function N() {
    c.value !== "body" ? cn(q) : c.value = void 0;
  }
  function H(y) {
    var k;
    (k = e.onScroll) === null || k === void 0 || k.call(e, y), c.value !== "head" ? cn(q) : c.value = void 0;
  }
  function q() {
    const { header: y, body: k } = T();
    if (!k) return;
    const { value: R } = o;
    if (R !== null) {
      if (y) {
        const _ = s - y.scrollLeft;
        c.value = _ !== 0 ? "head" : "body", c.value === "head" ? (s = y.scrollLeft, k.scrollLeft = s) : (s = k.scrollLeft, y.scrollLeft = s);
      } else s = k.scrollLeft;
      $(), x(), C(), M();
    }
  }
  function I(y) {
    const { header: k } = T();
    k && (k.scrollLeft = y, q());
  }
  return Ae(n, () => {
    V();
  }), { styleScrollXRef: u, fixedColumnLeftMapRef: b, fixedColumnRightMapRef: w, leftFixedColumnsRef: h, rightFixedColumnsRef: v, leftActiveFixedColKeyRef: f, leftActiveFixedChildrenColKeysRef: p, rightActiveFixedColKeyRef: m, rightActiveFixedChildrenColKeysRef: g, syncScrollState: q, handleTableBodyScroll: H, handleTableHeaderScroll: N, setHeaderScrollLeft: I, explicitlyScrollableRef: a, xScrollableRef: l };
}
function ln(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : false;
}
function iu(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? lu(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : false;
}
function lu(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function au(e, { dataRelatedColsRef: t, filteredDataRef: n }) {
  const o = [];
  t.value.forEach((g) => {
    var u;
    g.sorter !== void 0 && m(o, { columnKey: g.key, sorter: g.sorter, order: (u = g.defaultSortOrder) !== null && u !== void 0 ? u : false });
  });
  const r = D(o), i = F(() => {
    const g = t.value.filter((v) => v.type !== "selection" && v.sorter !== void 0 && (v.sortOrder === "ascend" || v.sortOrder === "descend" || v.sortOrder === false)), u = g.filter((v) => v.sortOrder !== false);
    if (u.length) return u.map((v) => ({ columnKey: v.key, order: v.sortOrder, sorter: v.sorter }));
    if (g.length) return [];
    const { value: h } = r;
    return Array.isArray(h) ? h : h ? [h] : [];
  }), a = F(() => {
    const g = i.value.slice().sort((u, h) => {
      const v = ln(u.sorter) || 0;
      return (ln(h.sorter) || 0) - v;
    });
    return g.length ? n.value.slice().sort((h, v) => {
      let b = 0;
      return g.some((w) => {
        const { columnKey: $, sorter: x, order: C } = w, M = iu(x, $);
        return M && C && (b = M(h.rawNode, v.rawNode), b !== 0) ? (b = b * nc(C), true) : false;
      }), b;
    }) : n.value;
  });
  function l(g) {
    let u = i.value.slice();
    return g && ln(g.sorter) !== false ? (u = u.filter((h) => ln(h.sorter) !== false), m(u, g), u) : g || null;
  }
  function s(g) {
    const u = l(g);
    c(u);
  }
  function c(g) {
    const { "onUpdate:sorter": u, onUpdateSorter: h, onSorterChange: v } = e;
    u && ne(u, g), h && ne(h, g), v && ne(v, g), r.value = g;
  }
  function f(g, u = "ascend") {
    if (!g) p();
    else {
      const h = t.value.find((b) => b.type !== "selection" && b.type !== "expand" && b.key === g);
      if (!(h == null ? void 0 : h.sorter)) return;
      const v = h.sorter;
      s({ columnKey: g, sorter: v, order: u });
    }
  }
  function p() {
    c(null);
  }
  function m(g, u) {
    const h = g.findIndex((v) => (u == null ? void 0 : u.columnKey) && v.columnKey === u.columnKey);
    h !== void 0 && h >= 0 ? g[h] = u : g.push(u);
  }
  return { clearSorter: p, sort: f, sortedDataRef: a, mergedSortStateRef: i, deriveNextSorter: s };
}
function su(e, { dataRelatedColsRef: t }) {
  const n = F(() => {
    const B = (j) => {
      for (let ee = 0; ee < j.length; ++ee) {
        const P = j[ee];
        if ("children" in P) return B(P.children);
        if (P.type === "selection") return P;
      }
      return null;
    };
    return B(e.columns);
  }), o = F(() => {
    const { childrenKey: B } = e;
    return wn(e.data, { ignoreEmptyChildren: true, getKey: e.rowKey, getChildren: (j) => j[B], getDisabled: (j) => {
      var ee, P;
      return !!(!((P = (ee = n.value) === null || ee === void 0 ? void 0 : ee.disabled) === null || P === void 0) && P.call(ee, j));
    } });
  }), r = Pe(() => {
    const { columns: B } = e, { length: j } = B;
    let ee = null;
    for (let P = 0; P < j; ++P) {
      const E = B[P];
      if (!E.type && ee === null && (ee = P), "tree" in E && E.tree) return P;
    }
    return ee || 0;
  }), i = D({}), { pagination: a } = e, l = D(a && a.defaultPage || 1), s = D(Si(a)), c = F(() => {
    const B = t.value.filter((P) => P.filterOptionValues !== void 0 || P.filterOptionValue !== void 0), j = {};
    return B.forEach((P) => {
      var E;
      P.type === "selection" || P.type === "expand" || (P.filterOptionValues === void 0 ? j[P.key] = (E = P.filterOptionValue) !== null && E !== void 0 ? E : null : j[P.key] = P.filterOptionValues);
    }), Object.assign(Pr(i.value), j);
  }), f = F(() => {
    const B = c.value, { columns: j } = e;
    function ee(ue) {
      return (me, ge) => !!~String(ge[ue]).indexOf(String(me));
    }
    const { value: { treeNodes: P } } = o, E = [];
    return j.forEach((ue) => {
      ue.type === "selection" || ue.type === "expand" || "children" in ue || E.push([ue.key, ue]);
    }), P ? P.filter((ue) => {
      const { rawNode: me } = ue;
      for (const [ge, se] of E) {
        let K = B[ge];
        if (K == null || (Array.isArray(K) || (K = [K]), !K.length)) continue;
        const de = se.filter === "default" ? ee(ge) : se.filter;
        if (se && typeof de == "function") if (se.filterMode === "and") {
          if (K.some((Ce) => !de(Ce, me))) return false;
        } else {
          if (K.some((Ce) => de(Ce, me))) continue;
          return false;
        }
      }
      return true;
    }) : [];
  }), { sortedDataRef: p, deriveNextSorter: m, mergedSortStateRef: g, sort: u, clearSorter: h } = au(e, { dataRelatedColsRef: t, filteredDataRef: f });
  t.value.forEach((B) => {
    var j;
    if (B.filter) {
      const ee = B.defaultFilterOptionValues;
      B.filterMultiple ? i.value[B.key] = ee || [] : ee !== void 0 ? i.value[B.key] = ee === null ? [] : ee : i.value[B.key] = (j = B.defaultFilterOptionValue) !== null && j !== void 0 ? j : null;
    }
  });
  const v = F(() => {
    const { pagination: B } = e;
    if (B !== false) return B.page;
  }), b = F(() => {
    const { pagination: B } = e;
    if (B !== false) return B.pageSize;
  }), w = Qe(v, l), $ = Qe(b, s), x = Pe(() => {
    const B = w.value;
    return e.remote ? B : Math.max(1, Math.min(Math.ceil(f.value.length / $.value), B));
  }), C = F(() => {
    const { pagination: B } = e;
    if (B) {
      const { pageCount: j } = B;
      if (j !== void 0) return j;
    }
  }), M = F(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return p.value;
    const B = $.value, j = (x.value - 1) * B;
    return p.value.slice(j, j + B);
  }), T = F(() => M.value.map((B) => B.rawNode));
  function V(B) {
    const { pagination: j } = e;
    if (j) {
      const { onChange: ee, "onUpdate:page": P, onUpdatePage: E } = j;
      ee && ne(ee, B), E && ne(E, B), P && ne(P, B), I(B);
    }
  }
  function N(B) {
    const { pagination: j } = e;
    if (j) {
      const { onPageSizeChange: ee, "onUpdate:pageSize": P, onUpdatePageSize: E } = j;
      ee && ne(ee, B), E && ne(E, B), P && ne(P, B), y(B);
    }
  }
  const H = F(() => {
    if (e.remote) {
      const { pagination: B } = e;
      if (B) {
        const { itemCount: j } = B;
        if (j !== void 0) return j;
      }
      return;
    }
    return f.value.length;
  }), q = F(() => Object.assign(Object.assign({}, e.pagination), { onChange: void 0, onUpdatePage: void 0, onUpdatePageSize: void 0, onPageSizeChange: void 0, "onUpdate:page": V, "onUpdate:pageSize": N, page: x.value, pageSize: $.value, pageCount: H.value === void 0 ? C.value : void 0, itemCount: H.value }));
  function I(B) {
    const { "onUpdate:page": j, onPageChange: ee, onUpdatePage: P } = e;
    P && ne(P, B), j && ne(j, B), ee && ne(ee, B), l.value = B;
  }
  function y(B) {
    const { "onUpdate:pageSize": j, onPageSizeChange: ee, onUpdatePageSize: P } = e;
    ee && ne(ee, B), P && ne(P, B), j && ne(j, B), s.value = B;
  }
  function k(B, j) {
    const { onUpdateFilters: ee, "onUpdate:filters": P, onFiltersChange: E } = e;
    ee && ne(ee, B, j), P && ne(P, B, j), E && ne(E, B, j), i.value = B;
  }
  function R(B, j, ee, P) {
    var E;
    (E = e.onUnstableColumnResize) === null || E === void 0 || E.call(e, B, j, ee, P);
  }
  function _(B) {
    I(B);
  }
  function z() {
    L();
  }
  function L() {
    W({});
  }
  function W(B) {
    Z(B);
  }
  function Z(B) {
    B ? B && (i.value = Pr(B)) : i.value = {};
  }
  return { treeMateRef: o, mergedCurrentPageRef: x, mergedPaginationRef: q, paginatedDataRef: M, rawPaginatedDataRef: T, mergedFilterStateRef: c, mergedSortStateRef: g, hoverKeyRef: D(null), selectionColumnRef: n, childTriggerColIndexRef: r, doUpdateFilters: k, deriveNextSorter: m, doUpdatePageSize: y, doUpdatePage: I, onUnstableColumnResize: R, filter: Z, filters: W, clearFilter: z, clearFilters: L, clearSorter: h, page: _, sort: u };
}
const yu = le({ name: "DataTable", alias: ["AdvancedTable"], props: ec, slots: Object, setup(e, { slots: t }) {
  const { mergedBorderedRef: n, mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Te(e), l = mt("DataTable", i, o), s = F(() => {
    var J, ie;
    return e.size || ((ie = (J = a == null ? void 0 : a.value) === null || J === void 0 ? void 0 : J.DataTable) === null || ie === void 0 ? void 0 : ie.size) || "medium";
  }), c = F(() => {
    const { bottomBordered: J } = e;
    return n.value ? false : J !== void 0 ? J : true;
  }), f = ye("DataTable", "-data-table", Yc, Vl, e, o), p = D(null), m = D(null), { getResizableWidth: g, clearResizableWidth: u, doUpdateResizableWidth: h } = ou(), { rowsRef: v, colsRef: b, dataRelatedColsRef: w, hasEllipsisRef: $ } = nu(e, g), { treeMateRef: x, mergedCurrentPageRef: C, paginatedDataRef: M, rawPaginatedDataRef: T, selectionColumnRef: V, hoverKeyRef: N, mergedPaginationRef: H, mergedFilterStateRef: q, mergedSortStateRef: I, childTriggerColIndexRef: y, doUpdatePage: k, doUpdateFilters: R, onUnstableColumnResize: _, deriveNextSorter: z, filter: L, filters: W, clearFilter: Z, clearFilters: B, clearSorter: j, page: ee, sort: P } = su(e, { dataRelatedColsRef: w }), E = (J) => {
    const { fileName: ie = "data.csv", keepOriginalData: ae = false } = J || {}, ve = ae ? e.data : T.value, ze = sc(e.columns, ve, e.getCsvCell, e.getCsvHeader), ut = new Blob([ze], { type: "text/csv;charset=utf-8" }), lt = URL.createObjectURL(ut);
    Sa(lt, ie.endsWith(".csv") ? ie : `${ie}.csv`), URL.revokeObjectURL(lt);
  }, { doCheckAll: ue, doUncheckAll: me, doCheck: ge, doUncheck: se, headerCheckboxDisabledRef: K, someRowsCheckedRef: de, allRowsCheckedRef: Ce, mergedCheckedRowKeySetRef: we, mergedInderminateRowKeySetRef: Fe } = Qc(e, { selectionColumnRef: V, treeMateRef: x, paginatedDataRef: M }), { stickyExpandedRowsRef: Ne, mergedExpandedRowKeysRef: Ke, renderExpandRef: ce, expandableRef: be, doUpdateExpandedRowKeys: $e } = eu(e, x), ke = oe(e, "maxHeight"), je = F(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || $.value ? "fixed" : e.tableLayout), { handleTableBodyScroll: Ge, handleTableHeaderScroll: _e, syncScrollState: U, setHeaderScrollLeft: Y, leftActiveFixedColKeyRef: Se, leftActiveFixedChildrenColKeysRef: it, rightActiveFixedColKeyRef: De, rightActiveFixedChildrenColKeysRef: Me, leftFixedColumnsRef: Xe, rightFixedColumnsRef: Oe, fixedColumnLeftMapRef: et, fixedColumnRightMapRef: tt, xScrollableRef: Je, explicitlyScrollableRef: re } = ru(e, { bodyWidthRef: p, mainTableInstRef: m, mergedCurrentPageRef: C, maxHeightRef: ke, mergedTableLayoutRef: je }), { localeRef: he } = bn("DataTable");
  Ee(ct, { xScrollableRef: Je, explicitlyScrollableRef: re, props: e, treeMateRef: x, renderExpandIconRef: oe(e, "renderExpandIcon"), loadingKeySetRef: D(/* @__PURE__ */ new Set()), slots: t, indentRef: oe(e, "indent"), childTriggerColIndexRef: y, bodyWidthRef: p, componentId: ho(), hoverKeyRef: N, mergedClsPrefixRef: o, mergedThemeRef: f, scrollXRef: F(() => e.scrollX), rowsRef: v, colsRef: b, paginatedDataRef: M, leftActiveFixedColKeyRef: Se, leftActiveFixedChildrenColKeysRef: it, rightActiveFixedColKeyRef: De, rightActiveFixedChildrenColKeysRef: Me, leftFixedColumnsRef: Xe, rightFixedColumnsRef: Oe, fixedColumnLeftMapRef: et, fixedColumnRightMapRef: tt, mergedCurrentPageRef: C, someRowsCheckedRef: de, allRowsCheckedRef: Ce, mergedSortStateRef: I, mergedFilterStateRef: q, loadingRef: oe(e, "loading"), rowClassNameRef: oe(e, "rowClassName"), mergedCheckedRowKeySetRef: we, mergedExpandedRowKeysRef: Ke, mergedInderminateRowKeySetRef: Fe, localeRef: he, expandableRef: be, stickyExpandedRowsRef: Ne, rowKeyRef: oe(e, "rowKey"), renderExpandRef: ce, summaryRef: oe(e, "summary"), virtualScrollRef: oe(e, "virtualScroll"), virtualScrollXRef: oe(e, "virtualScrollX"), heightForRowRef: oe(e, "heightForRow"), minRowHeightRef: oe(e, "minRowHeight"), virtualScrollHeaderRef: oe(e, "virtualScrollHeader"), headerHeightRef: oe(e, "headerHeight"), rowPropsRef: oe(e, "rowProps"), stripedRef: oe(e, "striped"), checkOptionsRef: F(() => {
    const { value: J } = V;
    return J == null ? void 0 : J.options;
  }), rawPaginatedDataRef: T, filterMenuCssVarsRef: F(() => {
    const { self: { actionDividerColor: J, actionPadding: ie, actionButtonMargin: ae } } = f.value;
    return { "--n-action-padding": ie, "--n-action-button-margin": ae, "--n-action-divider-color": J };
  }), onLoadRef: oe(e, "onLoad"), mergedTableLayoutRef: je, maxHeightRef: ke, minHeightRef: oe(e, "minHeight"), flexHeightRef: oe(e, "flexHeight"), headerCheckboxDisabledRef: K, paginationBehaviorOnFilterRef: oe(e, "paginationBehaviorOnFilter"), summaryPlacementRef: oe(e, "summaryPlacement"), filterIconPopoverPropsRef: oe(e, "filterIconPopoverProps"), scrollbarPropsRef: oe(e, "scrollbarProps"), syncScrollState: U, doUpdatePage: k, doUpdateFilters: R, getResizableWidth: g, onUnstableColumnResize: _, clearResizableWidth: u, doUpdateResizableWidth: h, deriveNextSorter: z, doCheck: ge, doUncheck: se, doCheckAll: ue, doUncheckAll: me, doUpdateExpandedRowKeys: $e, handleTableHeaderScroll: _e, handleTableBodyScroll: Ge, setHeaderScrollLeft: Y, renderCell: oe(e, "renderCell") });
  const S = { filter: L, filters: W, clearFilters: B, clearSorter: j, page: ee, sort: P, clearFilter: Z, downloadCsv: E, scrollTo: (J, ie) => {
    var ae;
    (ae = m.value) === null || ae === void 0 || ae.scrollTo(J, ie);
  } }, A = F(() => {
    const J = s.value, { common: { cubicBezierEaseInOut: ie }, self: { borderColor: ae, tdColorHover: ve, tdColorSorting: ze, tdColorSortingModal: ut, tdColorSortingPopover: lt, thColorSorting: ft, thColorSortingModal: ht, thColorSortingPopover: $t, thColor: Ot, thColorHover: vt, tdColor: St, tdTextColor: Tt, thTextColor: at, thFontWeight: _t, thButtonColorHover: Gt, thIconColor: Ve, thIconColorActive: Ze, filterSize: Sn, borderRadius: kn, lineHeight: Rn, tdColorModal: Pn, thColorModal: zn, borderColorModal: Fn, thColorHoverModal: $n, tdColorHoverModal: On, borderColorPopover: Tn, thColorPopover: Mn, tdColorPopover: In, tdColorHoverPopover: Bt, thColorHoverPopover: At, paginationMargin: Ni, emptyPadding: Di, boxShadowAfter: Ki, boxShadowBefore: ji, sorterSize: Hi, resizableContainerSize: Ui, resizableSize: Vi, loadingColor: Wi, loadingSize: Gi, opacityLoading: qi, tdColorStriped: Xi, tdColorStripedModal: Zi, tdColorStripedPopover: Yi, [pe("fontSize", J)]: Ji, [pe("thPadding", J)]: Qi, [pe("tdPadding", J)]: el } } = f.value;
    return { "--n-font-size": Ji, "--n-th-padding": Qi, "--n-td-padding": el, "--n-bezier": ie, "--n-border-radius": kn, "--n-line-height": Rn, "--n-border-color": ae, "--n-border-color-modal": Fn, "--n-border-color-popover": Tn, "--n-th-color": Ot, "--n-th-color-hover": vt, "--n-th-color-modal": zn, "--n-th-color-hover-modal": $n, "--n-th-color-popover": Mn, "--n-th-color-hover-popover": At, "--n-td-color": St, "--n-td-color-hover": ve, "--n-td-color-modal": Pn, "--n-td-color-hover-modal": On, "--n-td-color-popover": In, "--n-td-color-hover-popover": Bt, "--n-th-text-color": at, "--n-td-text-color": Tt, "--n-th-font-weight": _t, "--n-th-button-color-hover": Gt, "--n-th-icon-color": Ve, "--n-th-icon-color-active": Ze, "--n-filter-size": Sn, "--n-pagination-margin": Ni, "--n-empty-padding": Di, "--n-box-shadow-before": ji, "--n-box-shadow-after": Ki, "--n-sorter-size": Hi, "--n-resizable-container-size": Ui, "--n-resizable-size": Vi, "--n-loading-size": Gi, "--n-loading-color": Wi, "--n-opacity-loading": qi, "--n-td-color-striped": Xi, "--n-td-color-striped-modal": Zi, "--n-td-color-striped-popover": Yi, "--n-td-color-sorting": ze, "--n-td-color-sorting-modal": ut, "--n-td-color-sorting-popover": lt, "--n-th-color-sorting": ft, "--n-th-color-sorting-modal": ht, "--n-th-color-sorting-popover": $t };
  }), te = r ? Ye("data-table", F(() => s.value[0]), A, e) : void 0, fe = F(() => {
    if (!e.pagination) return false;
    if (e.paginateSinglePage) return true;
    const J = H.value, { pageCount: ie } = J;
    return ie !== void 0 ? ie > 1 : J.itemCount && J.pageSize && J.itemCount > J.pageSize;
  });
  return Object.assign({ mainTableInstRef: m, mergedClsPrefix: o, rtlEnabled: l, mergedTheme: f, paginatedData: M, mergedBordered: n, mergedBottomBordered: c, mergedPagination: H, mergedShowPagination: fe, cssVars: r ? void 0 : A, themeClass: te == null ? void 0 : te.themeClass, onRender: te == null ? void 0 : te.onRender }, S);
}, render() {
  const { mergedClsPrefix: e, themeClass: t, onRender: n, $slots: o, spinProps: r } = this;
  return n == null ? void 0 : n(), d("div", { class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, { [`${e}-data-table--bordered`]: this.mergedBordered, [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered, [`${e}-data-table--single-line`]: this.singleLine, [`${e}-data-table--single-column`]: this.singleColumn, [`${e}-data-table--loading`]: this.loading, [`${e}-data-table--flex-height`]: this.flexHeight }], style: this.cssVars }, d("div", { class: `${e}-data-table-wrapper` }, d(Zc, { ref: "mainTableInstRef" })), this.mergedShowPagination ? d("div", { class: `${e}-data-table__pagination` }, d(Qd, Object.assign({ theme: this.mergedTheme.peers.Pagination, themeOverrides: this.mergedTheme.peerOverrides.Pagination, disabled: this.loading }, this.mergedPagination))) : null, d(Qt, { name: "fade-in-scale-up-transition" }, { default: () => this.loading ? d("div", { class: `${e}-data-table-loading-wrapper` }, mn(o.loading, () => [d(po, Object.assign({ clsPrefix: e, strokeWidth: 20 }, r))])) : null }));
} });
export {
  Co as B,
  Ca as F,
  da as L,
  Vn as N,
  Po as V,
  Xd as _,
  yu as a,
  xo as b,
  un as c,
  wo as d,
  pu as e,
  xn as f,
  mu as g,
  Jl as h,
  Ql as i,
  bu as j,
  Ws as k,
  So as l,
  gu as m,
  Ro as n,
  ur as o,
  yn as p,
  cr as q,
  hr as r,
  fr as s,
  gt as t,
  na as u,
  Ra as v,
  rt as w,
  Qr as z
};
