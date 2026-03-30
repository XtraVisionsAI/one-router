import { r as D, a9 as eo, w as Ee, ax as Hr, o as Rt, ac as yt, aa as We, ab as pl, ad as Be, ay as gl, ae as Xe, i as Ce, B as Kr, L as ut, az as jr, d as le, a4 as Le, an as nn, aA as bl, j as c, aB as ml, c as $, t as oe, as as po, aC as go, ar as _t, aD as to, U as Tt, aE as yl, aF as Ur, K as Ut, J as Ue, aG as xl, aH as bo, at as fn, aI as Ln, al as At, aJ as yn, aK as xn, aL as wl, aM as Cl, aN as mo, aO as Sl, aP as Gt, aQ as Wr, aR as Xt, aS as no, aT as kl, aU as jo, aV as Rl, aW as Uo, aX as Wo, aY as un, aZ as Pl, a_ as Vo, a$ as zl, b0 as Fl, b1 as $l, b2 as Ml, b3 as Tl, b4 as Ol, b5 as Il, b as Ze, f as M, h as Q, e as X, W as it, k as Oe, l as xe, m as Qe, I as pe, af as xt, aj as yo, ai as bt, T as on, b6 as Bl, g as G, G as Ne, H as xo, ao as wo, a0 as wt, a1 as Wt, b7 as _l, P as Mt, b8 as Vr, ap as Gr, am as Al, b9 as El, aq as Co, E as ye, V as Ll, ba as Nl, F as jt, ag as qr, bb as Xr, N as Zr, a3 as Dl, bc as Yr, R as Re, bd as Jr, a2 as Hl, ak as Kl, be as jl, a as Ul, bf as Wl } from "./index-HnuybbhN.js";
import { c as ze, d as Vl, t as So, f as Qr, g as oo, h as Gl, u as wn, j as Ge, k as Go, N as ql, a as Xl, _ as qo, b as Zl, B as Xo, C as Yl } from "./Button-DSNNFXd2.js";
import { r as kt, b as Cn, i as Zo, a as tt, c as ne, u as rn } from "./use-form-item-DgrHZmhA.js";
import { b as ei } from "./useApi-ViaiVG_-.js";
let hn = [];
const ti = /* @__PURE__ */ new WeakMap();
function Jl() {
  hn.forEach((e) => e(...ti.get(e))), hn = [];
}
function vn(e, ...t) {
  ti.set(e, t), !hn.includes(e) && hn.push(e) === 1 && requestAnimationFrame(Jl);
}
function lt(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0) return true;
    n = n.parentElement;
  }
  return false;
}
function Ql(e) {
  const t = D(!!e.value);
  if (t.value) return eo(t);
  const n = Ee(e, (o) => {
    o && (t.value = true, n());
  });
  return eo(t);
}
function ea() {
  return Hr() !== null;
}
const ta = typeof window < "u";
let Vt, Qt;
const na = () => {
  var e, t;
  Vt = ta ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Qt = false, Vt !== void 0 ? Vt.then(() => {
    Qt = true;
  }) : Qt = true;
};
na();
function oa(e) {
  if (Qt) return;
  let t = false;
  Rt(() => {
    Qt || (Vt == null ? void 0 : Vt.then(() => {
      t || e();
    }));
  }), yt(() => {
    t = true;
  });
}
function ra(e = {}, t) {
  const n = gl({ ctrl: false, command: false, win: false, shift: false, tab: false }), { keydown: o, keyup: r } = e, i = (s) => {
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
    o !== void 0 && Object.keys(o).forEach((d) => {
      if (d !== s.key) return;
      const f = o[d];
      if (typeof f == "function") f(s);
      else {
        const { stop: v = false, prevent: m = false } = f;
        v && s.stopPropagation(), m && s.preventDefault(), f.handler(s);
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
    r !== void 0 && Object.keys(r).forEach((d) => {
      if (d !== s.key) return;
      const f = r[d];
      if (typeof f == "function") f(s);
      else {
        const { stop: v = false, prevent: m = false } = f;
        v && s.stopPropagation(), m && s.preventDefault(), f.handler(s);
      }
    });
  }, l = () => {
    (t === void 0 || t.value) && (We("keydown", document, i), We("keyup", document, a)), t !== void 0 && Ee(t, (s) => {
      s ? (We("keydown", document, i), We("keyup", document, a)) : (Be("keydown", document, i), Be("keyup", document, a));
    });
  };
  return ea() ? (pl(l), yt(() => {
    (t === void 0 || t.value) && (Be("keydown", document, i), Be("keyup", document, a));
  })) : l(), eo(n);
}
const ko = Xe("n-internal-select-menu"), ni = Xe("n-internal-select-menu-body"), Ro = Xe("n-drawer-body"), Po = Xe("n-modal-body"), Hu = Xe("n-modal-provider"), Ku = Xe("n-modal"), Sn = Xe("n-popover-body"), oi = "__disabled__";
function mt(e) {
  const t = Ce(Po, null), n = Ce(Ro, null), o = Ce(Sn, null), r = Ce(ni, null), i = D();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    Rt(() => {
      We("fullscreenchange", document, a);
    }), yt(() => {
      Be("fullscreenchange", document, a);
    });
  }
  return ze(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === false ? oi : l === true ? i.value || "body" : l : (t == null ? void 0 : t.value) ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : (n == null ? void 0 : n.value) ? n.value : (o == null ? void 0 : o.value) ? o.value : (r == null ? void 0 : r.value) ? r.value : l ?? (i.value || "body");
  });
}
mt.tdkey = oi;
mt.propTo = { type: [String, Object, Boolean], default: void 0 };
function ia(e, t, n) {
  const o = D(e.value);
  let r = null;
  return Ee(e, (i) => {
    r !== null && window.clearTimeout(r), i === true ? n && !n.value ? o.value = true : r = window.setTimeout(() => {
      o.value = true;
    }, t) : o.value = false;
  }), o;
}
function ro(e, t, n = "default") {
  const o = t[n];
  if (o === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function io(e, t = true, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Kr(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        io(o, t, n);
        return;
      }
      if (o.type === ut) {
        if (o.children === null) return;
        Array.isArray(o.children) && io(o.children, t, n);
      } else o.type !== jr && n.push(o);
    }
  }), n;
}
function Yo(e, t, n = "default") {
  const o = t[n];
  if (o === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = io(o());
  if (r.length === 1) return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let zt = null;
function ri() {
  if (zt === null && (zt = document.getElementById("v-binder-view-measurer"), zt === null)) {
    zt = document.createElement("div"), zt.id = "v-binder-view-measurer";
    const { style: e } = zt;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(zt);
  }
  return zt.getBoundingClientRect();
}
function la(e, t) {
  const n = ri();
  return { top: t, left: e, height: 0, width: 0, right: n.width - e, bottom: n.height - t };
}
function Nn(e) {
  const t = e.getBoundingClientRect(), n = ri();
  return { left: t.left - n.left, top: t.top - n.top, bottom: n.height + n.top - t.bottom, right: n.width + n.left - t.right, width: t.width, height: t.height };
}
function aa(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function ii(e) {
  if (e === null) return null;
  const t = aa(e);
  if (t === null) return null;
  if (t.nodeType === 9) return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o)) return t;
  }
  return ii(t);
}
const zo = le({ name: "Binder", props: { syncTargetWithParent: Boolean, syncTarget: { type: Boolean, default: true } }, setup(e) {
  var t;
  Le("VBinder", (t = Hr()) === null || t === void 0 ? void 0 : t.proxy);
  const n = Ce("VBinder", null), o = D(null), r = (b) => {
    o.value = b, n && e.syncTargetWithParent && n.setTargetRef(b);
  };
  let i = [];
  const a = () => {
    let b = o.value;
    for (; b = ii(b), b !== null; ) i.push(b);
    for (const y of i) We("scroll", y, v, true);
  }, l = () => {
    for (const b of i) Be("scroll", b, v, true);
    i = [];
  }, s = /* @__PURE__ */ new Set(), d = (b) => {
    s.size === 0 && a(), s.has(b) || s.add(b);
  }, f = (b) => {
    s.has(b) && s.delete(b), s.size === 0 && l();
  }, v = () => {
    vn(m);
  }, m = () => {
    s.forEach((b) => b());
  }, g = /* @__PURE__ */ new Set(), u = (b) => {
    g.size === 0 && We("resize", window, p), g.has(b) || g.add(b);
  }, h = (b) => {
    g.has(b) && g.delete(b), g.size === 0 && Be("resize", window, p);
  }, p = () => {
    g.forEach((b) => b());
  };
  return yt(() => {
    Be("resize", window, p), l();
  }), { targetRef: o, setTargetRef: r, addScrollListener: d, removeScrollListener: f, addResizeListener: u, removeResizeListener: h };
}, render() {
  return ro("binder", this.$slots);
} }), Fo = le({ name: "Target", setup() {
  const { setTargetRef: e, syncTarget: t } = Ce("VBinder");
  return { syncTarget: t, setTargetDirective: { mounted: e, updated: e } };
}, render() {
  const { syncTarget: e, setTargetDirective: t } = this;
  return e ? nn(Yo("follower", this.$slots), [[t]]) : Yo("follower", this.$slots);
} }), Dt = "@@mmoContext", sa = { mounted(e, { value: t }) {
  e[Dt] = { handler: void 0 }, typeof t == "function" && (e[Dt].handler = t, We("mousemoveoutside", e, t));
}, updated(e, { value: t }) {
  const n = e[Dt];
  typeof t == "function" ? n.handler ? n.handler !== t && (Be("mousemoveoutside", e, n.handler), n.handler = t, We("mousemoveoutside", e, t)) : (e[Dt].handler = t, We("mousemoveoutside", e, t)) : n.handler && (Be("mousemoveoutside", e, n.handler), n.handler = void 0);
}, unmounted(e) {
  const { handler: t } = e[Dt];
  t && Be("mousemoveoutside", e, t), e[Dt].handler = void 0;
} }, Ht = "@@coContext", pn = { mounted(e, { value: t, modifiers: n }) {
  e[Ht] = { handler: void 0 }, typeof t == "function" && (e[Ht].handler = t, We("clickoutside", e, t, { capture: n.capture }));
}, updated(e, { value: t, modifiers: n }) {
  const o = e[Ht];
  typeof t == "function" ? o.handler ? o.handler !== t && (Be("clickoutside", e, o.handler, { capture: n.capture }), o.handler = t, We("clickoutside", e, t, { capture: n.capture })) : (e[Ht].handler = t, We("clickoutside", e, t, { capture: n.capture })) : o.handler && (Be("clickoutside", e, o.handler, { capture: n.capture }), o.handler = void 0);
}, unmounted(e, { modifiers: t }) {
  const { handler: n } = e[Ht];
  n && Be("clickoutside", e, n, { capture: t.capture }), e[Ht].handler = void 0;
} };
function da(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class ca {
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
    o.has(t) ? o.delete(t) : n === void 0 && da("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Dn = new ca(), Kt = "@@ziContext", li = { mounted(e, t) {
  const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
  e[Kt] = { enabled: !!r, initialized: false }, r && (Dn.ensureZIndex(e, o), e[Kt].initialized = true);
}, updated(e, t) {
  const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[Kt].enabled;
  r && !i && (Dn.ensureZIndex(e, o), e[Kt].initialized = true), e[Kt].enabled = !!r;
}, unmounted(e, t) {
  if (!e[Kt].initialized) return;
  const { value: n = {} } = t, { zIndex: o } = n;
  Dn.unregister(e, o);
} }, { c: $t } = bl(), $o = "vueuc-style";
function Jo(e) {
  return e & -e;
}
class ai {
  constructor(t, n) {
    this.l = t, this.min = n;
    const o = new Array(t + 1);
    for (let r = 0; r < t + 1; ++r) o[r] = 0;
    this.ft = o;
  }
  add(t, n) {
    if (n === 0) return;
    const { l: o, ft: r } = this;
    for (t += 1; t <= o; ) r[t] += n, t += Jo(t);
  }
  get(t) {
    return this.sum(t + 1) - this.sum(t);
  }
  sum(t) {
    if (t === void 0 && (t = this.l), t <= 0) return 0;
    const { ft: n, min: o, l: r } = this;
    if (t > r) throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let i = t * o;
    for (; t > 0; ) i += n[t], t -= Jo(t);
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
function Qo(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const ua = le({ name: "LazyTeleport", props: { to: { type: [String, Object], default: void 0 }, disabled: Boolean, show: { type: Boolean, required: true } }, setup(e) {
  return { showTeleport: Ql(oe(e, "show")), mergedTo: $(() => {
    const { to: t } = e;
    return t ?? "body";
  }) };
}, render() {
  return this.showTeleport ? this.disabled ? ro("lazy-teleport", this.$slots) : c(ml, { disabled: this.disabled, to: this.mergedTo }, ro("lazy-teleport", this.$slots)) : null;
} }), an = { top: "bottom", bottom: "top", left: "right", right: "left" }, er = { start: "end", center: "center", end: "start" }, Hn = { top: "height", bottom: "height", left: "width", right: "width" }, fa = { "bottom-start": "top left", bottom: "top center", "bottom-end": "top right", "top-start": "bottom left", top: "bottom center", "top-end": "bottom right", "right-start": "top left", right: "center left", "right-end": "bottom left", "left-start": "top right", left: "center right", "left-end": "bottom right" }, ha = { "bottom-start": "bottom left", bottom: "bottom center", "bottom-end": "bottom right", "top-start": "top left", top: "top center", "top-end": "top right", "right-start": "top right", right: "center right", "right-end": "bottom right", "left-start": "top left", left: "center left", "left-end": "bottom left" }, va = { "bottom-start": "right", "bottom-end": "left", "top-start": "right", "top-end": "left", "right-start": "bottom", "right-end": "top", "left-start": "bottom", "left-end": "top" }, tr = { top: true, bottom: false, left: true, right: false }, nr = { top: "end", bottom: "start", left: "end", right: "start" };
function pa(e, t, n, o, r, i) {
  if (!r || i) return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", d = { top: 0, left: 0 };
  const f = (g, u, h) => {
    let p = 0, b = 0;
    const y = n[g] - t[u] - t[g];
    return y > 0 && o && (h ? b = tr[u] ? y : -y : p = tr[u] ? y : -y), { left: p, top: b };
  }, v = a === "left" || a === "right";
  if (s !== "center") {
    const g = va[e], u = an[g], h = Hn[g];
    if (n[h] > t[h]) {
      if (t[g] + t[h] < n[h]) {
        const p = (n[h] - t[h]) / 2;
        t[g] < p || t[u] < p ? t[g] < t[u] ? (s = er[l], d = f(h, u, v)) : d = f(h, g, v) : s = "center";
      }
    } else n[h] < t[h] && t[u] < 0 && t[g] > t[u] && (s = er[l]);
  } else {
    const g = a === "bottom" || a === "top" ? "left" : "top", u = an[g], h = Hn[g], p = (n[h] - t[h]) / 2;
    (t[g] < p || t[u] < p) && (t[g] > t[u] ? (s = nr[g], d = f(h, g, v)) : (s = nr[u], d = f(h, u, v)));
  }
  let m = a;
  return t[a] < n[Hn[a]] && t[a] < t[an[a]] && (m = an[a]), { placement: s !== "center" ? `${m}-${s}` : m, left: d.left, top: d.top };
}
function ga(e, t) {
  return t ? ha[e] : fa[e];
}
function ba(e, t, n, o, r, i) {
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
const ma = $t([$t(".v-binder-follower-container", { position: "absolute", left: "0", right: "0", top: "0", height: "0", pointerEvents: "none", zIndex: "auto" }), $t(".v-binder-follower-content", { position: "absolute", zIndex: "auto" }, [$t("> *", { pointerEvents: "all" })])]), Mo = le({ name: "Follower", inheritAttrs: false, props: { show: Boolean, enabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom" }, syncTrigger: { type: Array, default: ["resize", "scroll"] }, to: [String, Object], flip: { type: Boolean, default: true }, internalShift: Boolean, x: Number, y: Number, width: String, minWidth: String, containerClass: String, teleportDisabled: Boolean, zindexable: { type: Boolean, default: true }, zIndex: Number, overlap: Boolean }, setup(e) {
  const t = Ce("VBinder"), n = ze(() => e.enabled !== void 0 ? e.enabled : e.show), o = D(null), r = D(null), i = () => {
    const { syncTrigger: m } = e;
    m.includes("scroll") && t.addScrollListener(s), m.includes("resize") && t.addResizeListener(s);
  }, a = () => {
    t.removeScrollListener(s), t.removeResizeListener(s);
  };
  Rt(() => {
    n.value && (s(), i());
  });
  const l = go();
  ma.mount({ id: "vueuc/binder", head: true, anchorMetaName: $o, ssr: l }), yt(() => {
    a();
  }), oa(() => {
    n.value && s();
  });
  const s = () => {
    if (!n.value) return;
    const m = o.value;
    if (m === null) return;
    const g = t.targetRef, { x: u, y: h, overlap: p } = e, b = u !== void 0 && h !== void 0 ? la(u, h) : Nn(g);
    m.style.setProperty("--v-target-width", `${Math.round(b.width)}px`), m.style.setProperty("--v-target-height", `${Math.round(b.height)}px`);
    const { width: y, minWidth: P, placement: x, internalShift: C, flip: O } = e;
    m.setAttribute("v-placement", x), p ? m.setAttribute("v-overlap", "") : m.removeAttribute("v-overlap");
    const { style: T } = m;
    y === "target" ? T.width = `${b.width}px` : y !== void 0 ? T.width = y : T.width = "", P === "target" ? T.minWidth = `${b.width}px` : P !== void 0 ? T.minWidth = P : T.minWidth = "";
    const W = Nn(m), N = Nn(r.value), { left: K, top: q, placement: I } = pa(x, b, W, C, O, p), w = ga(I, p), { left: k, top: R, transform: B } = ba(I, N, b, q, K, p);
    m.setAttribute("v-placement", I), m.style.setProperty("--v-offset-left", `${Math.round(K)}px`), m.style.setProperty("--v-offset-top", `${Math.round(q)}px`), m.style.transform = `translateX(${k}) translateY(${R}) ${B}`, m.style.setProperty("--v-transform-origin", w), m.style.transformOrigin = w;
  };
  Ee(n, (m) => {
    m ? (i(), d()) : a();
  });
  const d = () => {
    _t().then(s).catch((m) => console.error(m));
  };
  ["placement", "x", "y", "internalShift", "flip", "width", "overlap", "minWidth"].forEach((m) => {
    Ee(oe(e, m), s);
  }), ["teleportDisabled"].forEach((m) => {
    Ee(oe(e, m), d);
  }), Ee(oe(e, "syncTrigger"), (m) => {
    m.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), m.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
  });
  const f = po(), v = ze(() => {
    const { to: m } = e;
    if (m !== void 0) return m;
    f.value;
  });
  return { VBinder: t, mergedEnabled: n, offsetContainerRef: r, followerRef: o, mergedTo: v, syncPosition: s };
}, render() {
  return c(ua, { show: this.show, to: this.mergedTo, disabled: this.teleportDisabled }, { default: () => {
    var e, t;
    const n = c("div", { class: ["v-binder-follower-container", this.containerClass], ref: "offsetContainerRef" }, [c("div", { class: "v-binder-follower-content", ref: "followerRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))]);
    return this.zindexable ? nn(n, [[li, { enabled: this.mergedEnabled, zIndex: this.zIndex }]]) : n;
  } });
} });
let sn;
function ya() {
  return typeof document > "u" ? false : (sn === void 0 && ("matchMedia" in window ? sn = window.matchMedia("(pointer:coarse)").matches : sn = false), sn);
}
let Kn;
function or() {
  return typeof document > "u" ? 1 : (Kn === void 0 && (Kn = "chrome" in window ? window.devicePixelRatio : 1), Kn);
}
const si = "VVirtualListXScroll";
function xa({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = D(0), r = D(0), i = $(() => {
    const d = e.value;
    if (d.length === 0) return null;
    const f = new ai(d.length, 0);
    return d.forEach((v, m) => {
      f.add(m, v.width);
    }), f;
  }), a = ze(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), l = (d) => {
    const f = i.value;
    return f !== null ? f.sum(d) : 0;
  }, s = ze(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return Le(si, { startIndexRef: a, endIndexRef: s, columnsRef: e, renderColRef: t, renderItemWithColsRef: n, getLeft: l }), { listWidthRef: o, scrollLeftRef: r };
}
const rr = le({ name: "VirtualListRow", props: { index: { type: Number, required: true }, item: { type: Object, required: true } }, setup() {
  const { startIndexRef: e, endIndexRef: t, columnsRef: n, getLeft: o, renderColRef: r, renderItemWithColsRef: i } = Ce(si);
  return { startIndex: e, endIndex: t, columns: n, renderCol: r, renderItemWithCols: i, getLeft: o };
}, render() {
  const { startIndex: e, endIndex: t, columns: n, renderCol: o, renderItemWithCols: r, getLeft: i, item: a } = this;
  if (r != null) return r({ itemIndex: this.index, startColIndex: e, endColIndex: t, allColumns: n, item: a, getLeft: i });
  if (o != null) {
    const l = [];
    for (let s = e; s <= t; ++s) {
      const d = n[s];
      l.push(o({ column: d, left: i(s), item: a }));
    }
    return l;
  }
  return null;
} }), wa = $t(".v-vl", { maxHeight: "inherit", height: "100%", overflow: "auto", minWidth: "1px" }, [$t("&:not(.v-vl--show-scrollbar)", { scrollbarWidth: "none" }, [$t("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", { width: 0, height: 0, display: "none" })])]), To = le({ name: "VirtualList", inheritAttrs: false, props: { showScrollbar: { type: Boolean, default: true }, columns: { type: Array, default: () => [] }, renderCol: Function, renderItemWithCols: Function, items: { type: Array, default: () => [] }, itemSize: { type: Number, required: true }, itemResizable: Boolean, itemsStyle: [String, Object], visibleItemsTag: { type: [String, Object], default: "div" }, visibleItemsProps: Object, ignoreItemResize: Boolean, onScroll: Function, onWheel: Function, onResize: Function, defaultScrollKey: [Number, String], defaultScrollIndex: Number, keyField: { type: String, default: "key" }, paddingTop: { type: [Number, String], default: 0 }, paddingBottom: { type: [Number, String], default: 0 } }, setup(e) {
  const t = go();
  wa.mount({ id: "vueuc/virtual-list", head: true, anchorMetaName: $o, ssr: t }), Rt(() => {
    const { defaultScrollIndex: w, defaultScrollKey: k } = e;
    w != null ? p({ index: w }) : k != null && p({ key: k });
  });
  let n = false, o = false;
  yl(() => {
    if (n = false, !o) {
      o = true;
      return;
    }
    p({ top: g.value, left: a.value });
  }), Ur(() => {
    n = true, o || (o = true);
  });
  const r = ze(() => {
    if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0) return;
    let w = 0;
    return e.columns.forEach((k) => {
      w += k.width;
    }), w;
  }), i = $(() => {
    const w = /* @__PURE__ */ new Map(), { keyField: k } = e;
    return e.items.forEach((R, B) => {
      w.set(R[k], B);
    }), w;
  }), { scrollLeftRef: a, listWidthRef: l } = xa({ columnsRef: oe(e, "columns"), renderColRef: oe(e, "renderCol"), renderItemWithColsRef: oe(e, "renderItemWithCols") }), s = D(null), d = D(void 0), f = /* @__PURE__ */ new Map(), v = $(() => {
    const { items: w, itemSize: k, keyField: R } = e, B = new ai(w.length, k);
    return w.forEach((F, L) => {
      const V = F[R], Z = f.get(V);
      Z !== void 0 && B.add(L, Z);
    }), B;
  }), m = D(0), g = D(0), u = ze(() => Math.max(v.value.getBound(g.value - Ut(e.paddingTop)) - 1, 0)), h = $(() => {
    const { value: w } = d;
    if (w === void 0) return [];
    const { items: k, itemSize: R } = e, B = u.value, F = Math.min(B + Math.ceil(w / R + 1), k.length - 1), L = [];
    for (let V = B; V <= F; ++V) L.push(k[V]);
    return L;
  }), p = (w, k) => {
    if (typeof w == "number") {
      x(w, k, "auto");
      return;
    }
    const { left: R, top: B, index: F, key: L, position: V, behavior: Z, debounce: _ = true } = w;
    if (R !== void 0 || B !== void 0) x(R, B, Z);
    else if (F !== void 0) P(F, Z, _);
    else if (L !== void 0) {
      const j = i.value.get(L);
      j !== void 0 && P(j, Z, _);
    } else V === "bottom" ? x(0, Number.MAX_SAFE_INTEGER, Z) : V === "top" && x(0, 0, Z);
  };
  let b, y = null;
  function P(w, k, R) {
    const { value: B } = v, F = B.sum(w) + Ut(e.paddingTop);
    if (!R) s.value.scrollTo({ left: 0, top: F, behavior: k });
    else {
      b = w, y !== null && window.clearTimeout(y), y = window.setTimeout(() => {
        b = void 0, y = null;
      }, 16);
      const { scrollTop: L, offsetHeight: V } = s.value;
      if (F > L) {
        const Z = B.get(w);
        F + Z <= L + V || s.value.scrollTo({ left: 0, top: F + Z - V, behavior: k });
      } else s.value.scrollTo({ left: 0, top: F, behavior: k });
    }
  }
  function x(w, k, R) {
    s.value.scrollTo({ left: w, top: k, behavior: R });
  }
  function C(w, k) {
    var R, B, F;
    if (n || e.ignoreItemResize || I(k.target)) return;
    const { value: L } = v, V = i.value.get(w), Z = L.get(V), _ = (F = (B = (R = k.borderBoxSize) === null || R === void 0 ? void 0 : R[0]) === null || B === void 0 ? void 0 : B.blockSize) !== null && F !== void 0 ? F : k.contentRect.height;
    if (_ === Z) return;
    _ - e.itemSize === 0 ? f.delete(w) : f.set(w, _ - e.itemSize);
    const ee = _ - Z;
    if (ee === 0) return;
    L.add(V, ee);
    const z = s.value;
    if (z != null) {
      if (b === void 0) {
        const E = L.sum(V);
        z.scrollTop > E && z.scrollBy(0, ee);
      } else if (V < b) z.scrollBy(0, ee);
      else if (V === b) {
        const E = L.sum(V);
        _ + E > z.scrollTop + z.offsetHeight && z.scrollBy(0, ee);
      }
      q();
    }
    m.value++;
  }
  const O = !ya();
  let T = false;
  function W(w) {
    var k;
    (k = e.onScroll) === null || k === void 0 || k.call(e, w), (!O || !T) && q();
  }
  function N(w) {
    var k;
    if ((k = e.onWheel) === null || k === void 0 || k.call(e, w), O) {
      const R = s.value;
      if (R != null) {
        if (w.deltaX === 0 && (R.scrollTop === 0 && w.deltaY <= 0 || R.scrollTop + R.offsetHeight >= R.scrollHeight && w.deltaY >= 0)) return;
        w.preventDefault(), R.scrollTop += w.deltaY / or(), R.scrollLeft += w.deltaX / or(), q(), T = true, vn(() => {
          T = false;
        });
      }
    }
  }
  function K(w) {
    if (n || I(w.target)) return;
    if (e.renderCol == null && e.renderItemWithCols == null) {
      if (w.contentRect.height === d.value) return;
    } else if (w.contentRect.height === d.value && w.contentRect.width === l.value) return;
    d.value = w.contentRect.height, l.value = w.contentRect.width;
    const { onResize: k } = e;
    k !== void 0 && k(w);
  }
  function q() {
    const { value: w } = s;
    w != null && (g.value = w.scrollTop, a.value = w.scrollLeft);
  }
  function I(w) {
    let k = w;
    for (; k !== null; ) {
      if (k.style.display === "none") return true;
      k = k.parentElement;
    }
    return false;
  }
  return { listHeight: d, listStyle: { overflow: "auto" }, keyToIndex: i, itemsStyle: $(() => {
    const { itemResizable: w } = e, k = Ue(v.value.sum());
    return m.value, [e.itemsStyle, { boxSizing: "content-box", width: Ue(r.value), height: w ? "" : k, minHeight: w ? k : "", paddingTop: Ue(e.paddingTop), paddingBottom: Ue(e.paddingBottom) }];
  }), visibleItemsStyle: $(() => (m.value, { transform: `translateY(${Ue(v.value.sum(u.value))})` })), viewportItems: h, listElRef: s, itemsElRef: D(null), scrollTo: p, handleListResize: K, handleListScroll: W, handleListWheel: N, handleItemResize: C };
}, render() {
  const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
  return c(to, { onResize: this.handleListResize }, { default: () => {
    var r, i;
    return c("div", Tt(this.$attrs, { class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"], onScroll: this.handleListScroll, onWheel: this.handleListWheel, ref: "listElRef" }), [this.items.length !== 0 ? c("div", { ref: "itemsElRef", class: "v-vl-items", style: this.itemsStyle }, [c(o, Object.assign({ class: "v-vl-visible-items", style: this.visibleItemsStyle }, this.visibleItemsProps), { default: () => {
      const { renderCol: a, renderItemWithCols: l } = this;
      return this.viewportItems.map((s) => {
        const d = s[t], f = n.get(d), v = a != null ? c(rr, { index: f, item: s }) : void 0, m = l != null ? c(rr, { index: f, item: s }) : void 0, g = this.$slots.default({ item: s, renderedCols: v, renderedItemWithCols: m, index: f })[0];
        return e ? c(to, { key: d, onResize: (u) => this.handleItemResize(d, u) }, { default: () => g }) : (g.key = d, g);
      });
    } })]) : (i = (r = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(r)]);
  } });
} }), Ct = "v-hidden", Ca = $t("[v-hidden]", { display: "none!important" }), ir = le({ name: "Overflow", props: { getCounter: Function, getTail: Function, updateCounter: Function, onUpdateCount: Function, onUpdateOverflow: Function }, setup(e, { slots: t }) {
  const n = D(null), o = D(null);
  function r(a) {
    const { value: l } = n, { getCounter: s, getTail: d } = e;
    let f;
    if (s !== void 0 ? f = s() : f = o.value, !l || !f) return;
    f.hasAttribute(Ct) && f.removeAttribute(Ct);
    const { children: v } = l;
    if (a.showAllItemsBeforeCalculate) for (const P of v) P.hasAttribute(Ct) && P.removeAttribute(Ct);
    const m = l.offsetWidth, g = [], u = t.tail ? d == null ? void 0 : d() : null;
    let h = u ? u.offsetWidth : 0, p = false;
    const b = l.children.length - (t.tail ? 1 : 0);
    for (let P = 0; P < b - 1; ++P) {
      if (P < 0) continue;
      const x = v[P];
      if (p) {
        x.hasAttribute(Ct) || x.setAttribute(Ct, "");
        continue;
      } else x.hasAttribute(Ct) && x.removeAttribute(Ct);
      const C = x.offsetWidth;
      if (h += C, g[P] = C, h > m) {
        const { updateCounter: O } = e;
        for (let T = P; T >= 0; --T) {
          const W = b - 1 - T;
          O !== void 0 ? O(W) : f.textContent = `${W}`;
          const N = f.offsetWidth;
          if (h -= g[T], h + N <= m || T === 0) {
            p = true, P = T - 1, u && (P === -1 ? (u.style.maxWidth = `${m - N}px`, u.style.boxSizing = "border-box") : u.style.maxWidth = "");
            const { onUpdateCount: K } = e;
            K && K(W);
            break;
          }
        }
      }
    }
    const { onUpdateOverflow: y } = e;
    p ? y !== void 0 && y(true) : (y !== void 0 && y(false), f.setAttribute(Ct, ""));
  }
  const i = go();
  return Ca.mount({ id: "vueuc/overflow", head: true, anchorMetaName: $o, ssr: i }), Rt(() => r({ showAllItemsBeforeCalculate: false })), { selfRef: n, counterRef: o, sync: r };
}, render() {
  const { $slots: e } = this;
  return _t(() => this.sync({ showAllItemsBeforeCalculate: false })), c("div", { class: "v-overflow", ref: "selfRef" }, [xl(e, "default"), e.counter ? e.counter() : c("span", { style: { display: "inline-block" }, ref: "counterRef" }), e.tail ? e.tail() : null]);
} });
function di(e) {
  return e instanceof HTMLElement;
}
function ci(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (di(n) && (fi(n) || ci(n))) return true;
  }
  return false;
}
function ui(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (di(n) && (fi(n) || ui(n))) return true;
  }
  return false;
}
function fi(e) {
  if (!Sa(e)) return false;
  try {
    e.focus({ preventScroll: true });
  } catch {
  }
  return document.activeElement === e;
}
function Sa(e) {
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
let Jt = [];
const ka = le({ name: "FocusTrap", props: { disabled: Boolean, active: Boolean, autoFocus: { type: Boolean, default: true }, onEsc: Function, initialFocusTo: [String, Function], finalFocusTo: [String, Function], returnFocusOnDeactivated: { type: Boolean, default: true } }, setup(e) {
  const t = bo(), n = D(null), o = D(null);
  let r = false, i = false;
  const a = typeof document > "u" ? null : document.activeElement;
  function l() {
    return Jt[Jt.length - 1] === t;
  }
  function s(p) {
    var b;
    p.code === "Escape" && l() && ((b = e.onEsc) === null || b === void 0 || b.call(e, p));
  }
  Rt(() => {
    Ee(() => e.active, (p) => {
      p ? (v(), We("keydown", document, s)) : (Be("keydown", document, s), r && m());
    }, { immediate: true });
  }), yt(() => {
    Be("keydown", document, s), r && m();
  });
  function d(p) {
    if (!i && l()) {
      const b = f();
      if (b === null || b.contains(fn(p))) return;
      g("first");
    }
  }
  function f() {
    const p = n.value;
    if (p === null) return null;
    let b = p;
    for (; b = b.nextSibling, !(b === null || b instanceof Element && b.tagName === "DIV"); ) ;
    return b;
  }
  function v() {
    var p;
    if (!e.disabled) {
      if (Jt.push(t), e.autoFocus) {
        const { initialFocusTo: b } = e;
        b === void 0 ? g("first") : (p = Qo(b)) === null || p === void 0 || p.focus({ preventScroll: true });
      }
      r = true, document.addEventListener("focus", d, true);
    }
  }
  function m() {
    var p;
    if (e.disabled || (document.removeEventListener("focus", d, true), Jt = Jt.filter((y) => y !== t), l())) return;
    const { finalFocusTo: b } = e;
    b !== void 0 ? (p = Qo(b)) === null || p === void 0 || p.focus({ preventScroll: true }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = true, a.focus({ preventScroll: true }), i = false);
  }
  function g(p) {
    if (l() && e.active) {
      const b = n.value, y = o.value;
      if (b !== null && y !== null) {
        const P = f();
        if (P == null || P === y) {
          i = true, b.focus({ preventScroll: true }), i = false;
          return;
        }
        i = true;
        const x = p === "first" ? ci(P) : ui(P);
        i = false, x || (i = true, b.focus({ preventScroll: true }), i = false);
      }
    }
  }
  function u(p) {
    if (i) return;
    const b = f();
    b !== null && (p.relatedTarget !== null && b.contains(p.relatedTarget) ? g("last") : g("first"));
  }
  function h(p) {
    i || (p.relatedTarget !== null && p.relatedTarget === n.value ? g("last") : g("first"));
  }
  return { focusableStartRef: n, focusableEndRef: o, focusableStyle: "position: absolute; height: 0; width: 0;", handleStartFocus: u, handleEndFocus: h };
}, render() {
  const { default: e } = this.$slots;
  if (e === void 0) return null;
  if (this.disabled) return e();
  const { active: t, focusableStyle: n } = this;
  return c(ut, null, [c("div", { "aria-hidden": "true", tabindex: t ? "0" : "-1", ref: "focusableStartRef", style: n, onFocus: this.handleStartFocus }), e(), c("div", { "aria-hidden": "true", style: n, ref: "focusableEndRef", tabindex: t ? "0" : "-1", onFocus: this.handleEndFocus })]);
} });
function hi(e, t) {
  t && (Rt(() => {
    const { value: n } = e;
    n && Ln.registerHandler(n, t);
  }), Ee(e, (n, o) => {
    o && Ln.unregisterHandler(o);
  }, { deep: false }), yt(() => {
    const { value: n } = e;
    n && Ln.unregisterHandler(n);
  }));
}
function Ra(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let jn;
function Pa() {
  return jn === void 0 && (jn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), jn;
}
const vi = /* @__PURE__ */ new WeakSet();
function za(e) {
  vi.add(e);
}
function ju(e) {
  return !vi.has(e);
}
function lr(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Fa = { tiny: "mini", small: "tiny", medium: "small", large: "medium", huge: "large" };
function ar(e) {
  const t = Fa[e];
  if (t === void 0) throw new Error(`${e} has no smaller size.`);
  return t;
}
function pi(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
function tn(e, t = true, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Kr(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        tn(o, t, n);
        return;
      }
      if (o.type === ut) {
        if (o.children === null) return;
        Array.isArray(o.children) && tn(o.children, t, n);
      } else {
        if (o.type === jr && t) return;
        n.push(o);
      }
    }
  }), n;
}
function $a(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o) return At("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = tn(o(n));
  return r.length === 1 ? r[0] : (At("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function Uu(e, t, n) {
  if (!t) return null;
  const o = tn(t(n));
  return o.length === 1 ? o[0] : (At("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
}
function Ma(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
function en(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0) return t.length === 1 ? t[0] : (n) => {
    e.forEach((o) => {
      o && o(n);
    });
  };
}
var lo = yn(xn, "WeakMap"), Ta = wl(Object.keys, Object), Oa = Object.prototype, Ia = Oa.hasOwnProperty;
function Ba(e) {
  if (!Cl(e)) return Ta(e);
  var t = [];
  for (var n in Object(e)) Ia.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Oo(e) {
  return mo(e) ? Sl(e) : Ba(e);
}
function _a(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; ) e[r + n] = t[n];
  return e;
}
function Aa(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var a = e[n];
    t(a, n, e) && (i[r++] = a);
  }
  return i;
}
function Ea() {
  return [];
}
var La = Object.prototype, Na = La.propertyIsEnumerable, sr = Object.getOwnPropertySymbols, Da = sr ? function(e) {
  return e == null ? [] : (e = Object(e), Aa(sr(e), function(t) {
    return Na.call(e, t);
  }));
} : Ea;
function Ha(e, t, n) {
  var o = t(e);
  return Gt(e) ? o : _a(o, n(e));
}
function dr(e) {
  return Ha(e, Oo, Da);
}
var ao = yn(xn, "DataView"), so = yn(xn, "Promise"), co = yn(xn, "Set"), cr = "[object Map]", Ka = "[object Object]", ur = "[object Promise]", fr = "[object Set]", hr = "[object WeakMap]", vr = "[object DataView]", ja = Xt(ao), Ua = Xt(no), Wa = Xt(so), Va = Xt(co), Ga = Xt(lo), Ft = Wr;
(ao && Ft(new ao(new ArrayBuffer(1))) != vr || no && Ft(new no()) != cr || so && Ft(so.resolve()) != ur || co && Ft(new co()) != fr || lo && Ft(new lo()) != hr) && (Ft = function(e) {
  var t = Wr(e), n = t == Ka ? e.constructor : void 0, o = n ? Xt(n) : "";
  if (o) switch (o) {
    case ja:
      return vr;
    case Ua:
      return cr;
    case Wa:
      return ur;
    case Va:
      return fr;
    case Ga:
      return hr;
  }
  return t;
});
var qa = "__lodash_hash_undefined__";
function Xa(e) {
  return this.__data__.set(e, qa), this;
}
function Za(e) {
  return this.__data__.has(e);
}
function gn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new kl(); ++t < n; ) this.add(e[t]);
}
gn.prototype.add = gn.prototype.push = Xa;
gn.prototype.has = Za;
function Ya(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; ) if (t(e[n], n, e)) return true;
  return false;
}
function Ja(e, t) {
  return e.has(t);
}
var Qa = 1, es = 2;
function gi(e, t, n, o, r, i) {
  var a = n & Qa, l = e.length, s = t.length;
  if (l != s && !(a && s > l)) return false;
  var d = i.get(e), f = i.get(t);
  if (d && f) return d == t && f == e;
  var v = -1, m = true, g = n & es ? new gn() : void 0;
  for (i.set(e, t), i.set(t, e); ++v < l; ) {
    var u = e[v], h = t[v];
    if (o) var p = a ? o(h, u, v, t, e, i) : o(u, h, v, e, t, i);
    if (p !== void 0) {
      if (p) continue;
      m = false;
      break;
    }
    if (g) {
      if (!Ya(t, function(b, y) {
        if (!Ja(g, y) && (u === b || r(u, b, n, o, i))) return g.push(y);
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
function ts(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function ns(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var os = 1, rs = 2, is = "[object Boolean]", ls = "[object Date]", as = "[object Error]", ss = "[object Map]", ds = "[object Number]", cs = "[object RegExp]", us = "[object Set]", fs = "[object String]", hs = "[object Symbol]", vs = "[object ArrayBuffer]", ps = "[object DataView]", pr = jo ? jo.prototype : void 0, Un = pr ? pr.valueOf : void 0;
function gs(e, t, n, o, r, i, a) {
  switch (n) {
    case ps:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return false;
      e = e.buffer, t = t.buffer;
    case vs:
      return !(e.byteLength != t.byteLength || !i(new Uo(e), new Uo(t)));
    case is:
    case ls:
    case ds:
      return Rl(+e, +t);
    case as:
      return e.name == t.name && e.message == t.message;
    case cs:
    case fs:
      return e == t + "";
    case ss:
      var l = ts;
    case us:
      var s = o & os;
      if (l || (l = ns), e.size != t.size && !s) return false;
      var d = a.get(e);
      if (d) return d == t;
      o |= rs, a.set(e, t);
      var f = gi(l(e), l(t), o, r, i, a);
      return a.delete(e), f;
    case hs:
      if (Un) return Un.call(e) == Un.call(t);
  }
  return false;
}
var bs = 1, ms = Object.prototype, ys = ms.hasOwnProperty;
function xs(e, t, n, o, r, i) {
  var a = n & bs, l = dr(e), s = l.length, d = dr(t), f = d.length;
  if (s != f && !a) return false;
  for (var v = s; v--; ) {
    var m = l[v];
    if (!(a ? m in t : ys.call(t, m))) return false;
  }
  var g = i.get(e), u = i.get(t);
  if (g && u) return g == t && u == e;
  var h = true;
  i.set(e, t), i.set(t, e);
  for (var p = a; ++v < s; ) {
    m = l[v];
    var b = e[m], y = t[m];
    if (o) var P = a ? o(y, b, m, t, e, i) : o(b, y, m, e, t, i);
    if (!(P === void 0 ? b === y || r(b, y, n, o, i) : P)) {
      h = false;
      break;
    }
    p || (p = m == "constructor");
  }
  if (h && !p) {
    var x = e.constructor, C = t.constructor;
    x != C && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof C == "function" && C instanceof C) && (h = false);
  }
  return i.delete(e), i.delete(t), h;
}
var ws = 1, gr = "[object Arguments]", br = "[object Array]", dn = "[object Object]", Cs = Object.prototype, mr = Cs.hasOwnProperty;
function Ss(e, t, n, o, r, i) {
  var a = Gt(e), l = Gt(t), s = a ? br : Ft(e), d = l ? br : Ft(t);
  s = s == gr ? dn : s, d = d == gr ? dn : d;
  var f = s == dn, v = d == dn, m = s == d;
  if (m && Wo(e)) {
    if (!Wo(t)) return false;
    a = true, f = false;
  }
  if (m && !f) return i || (i = new un()), a || Pl(e) ? gi(e, t, n, o, r, i) : gs(e, t, s, n, o, r, i);
  if (!(n & ws)) {
    var g = f && mr.call(e, "__wrapped__"), u = v && mr.call(t, "__wrapped__");
    if (g || u) {
      var h = g ? e.value() : e, p = u ? t.value() : t;
      return i || (i = new un()), r(h, p, n, o, i);
    }
  }
  return m ? (i || (i = new un()), xs(e, t, n, o, r, i)) : false;
}
function Io(e, t, n, o, r) {
  return e === t ? true : e == null || t == null || !Vo(e) && !Vo(t) ? e !== e && t !== t : Ss(e, t, n, o, Io, r);
}
var ks = 1, Rs = 2;
function Ps(e, t, n, o) {
  var r = n.length, i = r;
  if (e == null) return !i;
  for (e = Object(e); r--; ) {
    var a = n[r];
    if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return false;
  }
  for (; ++r < i; ) {
    a = n[r];
    var l = a[0], s = e[l], d = a[1];
    if (a[2]) {
      if (s === void 0 && !(l in e)) return false;
    } else {
      var f = new un(), v;
      if (!(v === void 0 ? Io(d, s, ks | Rs, o, f) : v)) return false;
    }
  }
  return true;
}
function bi(e) {
  return e === e && !zl(e);
}
function zs(e) {
  for (var t = Oo(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, bi(r)];
  }
  return t;
}
function mi(e, t) {
  return function(n) {
    return n == null ? false : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Fs(e) {
  var t = zs(e);
  return t.length == 1 && t[0][2] ? mi(t[0][0], t[0][1]) : function(n) {
    return n === e || Ps(n, e, t);
  };
}
function $s(e, t) {
  return e != null && t in Object(e);
}
function Ms(e, t, n) {
  t = Vl(t, e);
  for (var o = -1, r = t.length, i = false; ++o < r; ) {
    var a = So(t[o]);
    if (!(i = e != null && n(e, a))) break;
    e = e[a];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && Fl(r) && $l(a, r) && (Gt(e) || Ml(e)));
}
function Ts(e, t) {
  return e != null && Ms(e, t, $s);
}
var Os = 1, Is = 2;
function Bs(e, t) {
  return Qr(e) && bi(t) ? mi(So(e), t) : function(n) {
    var o = oo(n, e);
    return o === void 0 && o === t ? Ts(n, e) : Io(t, o, Os | Is);
  };
}
function _s(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function As(e) {
  return function(t) {
    return Gl(t, e);
  };
}
function Es(e) {
  return Qr(e) ? _s(So(e)) : As(e);
}
function Ls(e) {
  return typeof e == "function" ? e : e == null ? Tl : typeof e == "object" ? Gt(e) ? Bs(e[0], e[1]) : Fs(e) : Es(e);
}
function Ns(e, t) {
  return e && Ol(e, t, Oo);
}
function Ds(e, t) {
  return function(n, o) {
    if (n == null) return n;
    if (!mo(n)) return e(n, o);
    for (var r = n.length, i = -1, a = Object(n); ++i < r && o(a[i], i, a) !== false; ) ;
    return n;
  };
}
var Hs = Ds(Ns);
function Ks(e, t) {
  var n = -1, o = mo(e) ? Array(e.length) : [];
  return Hs(e, function(r, i, a) {
    o[++n] = t(r, i, a);
  }), o;
}
function js(e, t) {
  var n = Gt(e) ? Il : Ks;
  return n(e, Ls(t));
}
const Us = le({ name: "ArrowDown", render() {
  return c("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, c("g", { "fill-rule": "nonzero" }, c("path", { d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z" }))));
} }), yr = le({ name: "Backward", render() {
  return c("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, c("path", { d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z", fill: "currentColor" }));
} }), Ws = le({ name: "Checkmark", render() {
  return c("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, c("g", { fill: "none" }, c("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })));
} }), yi = le({ name: "ChevronRight", render() {
  return c("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, c("path", { d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z", fill: "currentColor" }));
} }), Vs = le({ name: "Empty", render() {
  return c("svg", { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, c("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }), c("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" }));
} }), xr = le({ name: "FastBackward", render() {
  return c("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, c("g", { fill: "currentColor", "fill-rule": "nonzero" }, c("path", { d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z" }))));
} }), wr = le({ name: "FastForward", render() {
  return c("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, c("g", { fill: "currentColor", "fill-rule": "nonzero" }, c("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" }))));
} }), Gs = le({ name: "Filter", render() {
  return c("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, c("g", { "fill-rule": "nonzero" }, c("path", { d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z" }))));
} }), Cr = le({ name: "Forward", render() {
  return c("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, c("path", { d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z", fill: "currentColor" }));
} }), Sr = le({ name: "More", render() {
  return c("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, c("g", { fill: "currentColor", "fill-rule": "nonzero" }, c("path", { d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z" }))));
} }), qs = le({ props: { onFocus: Function, onBlur: Function }, setup(e) {
  return () => c("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
} });
function kr(e) {
  return Array.isArray(e) ? e : [e];
}
const uo = { STOP: "STOP" };
function xi(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== uo.STOP && e.children.forEach((o) => xi(o, t));
}
function Xs(e, t = {}) {
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
function Zs(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function Ys(e) {
  return e.children;
}
function Js(e) {
  return e.key;
}
function Qs() {
  return false;
}
function ed(e, t) {
  const { isLeaf: n } = e;
  return !(n === false && !Array.isArray(t(e)));
}
function td(e) {
  return e.disabled === true;
}
function nd(e, t) {
  return e.isLeaf === false && !Array.isArray(t(e));
}
function Wn(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function Vn(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function od(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function rd(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function id(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function ld(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class ad extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function sd(e, t, n, o) {
  return bn(t.concat(e), n, o, false);
}
function dd(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    const r = t.treeNodeMap.get(o);
    if (r !== void 0) {
      let i = r.parent;
      for (; i !== null && !(i.disabled || n.has(i.key)); ) n.add(i.key), i = i.parent;
    }
  }), n;
}
function cd(e, t, n, o) {
  const r = bn(t, n, o, false), i = bn(e, n, o, true), a = dd(e, n), l = [];
  return r.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => r.delete(s)), r;
}
function Gn(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: d } = e;
  if (!a) return o !== void 0 ? { checkedKeys: od(n, o), indeterminateKeys: Array.from(i) } : r !== void 0 ? { checkedKeys: rd(n, r), indeterminateKeys: Array.from(i) } : { checkedKeys: Array.from(n), indeterminateKeys: Array.from(i) };
  const { levelTreeNodeMap: f } = t;
  let v;
  r !== void 0 ? v = cd(r, n, t, d) : o !== void 0 ? v = sd(o, n, t, d) : v = bn(n, t, d, false);
  const m = s === "parent", g = s === "child" || l, u = v, h = /* @__PURE__ */ new Set(), p = Math.max.apply(null, Array.from(f.keys()));
  for (let b = p; b >= 0; b -= 1) {
    const y = b === 0, P = f.get(b);
    for (const x of P) {
      if (x.isLeaf) continue;
      const { key: C, shallowLoaded: O } = x;
      if (g && O && x.children.forEach((K) => {
        !K.disabled && !K.isLeaf && K.shallowLoaded && u.has(K.key) && u.delete(K.key);
      }), x.disabled || !O) continue;
      let T = true, W = false, N = true;
      for (const K of x.children) {
        const q = K.key;
        if (!K.disabled) {
          if (N && (N = false), u.has(q)) W = true;
          else if (h.has(q)) {
            W = true, T = false;
            break;
          } else if (T = false, W) break;
        }
      }
      T && !N ? (m && x.children.forEach((K) => {
        !K.disabled && u.has(K.key) && u.delete(K.key);
      }), u.add(C)) : W && h.add(C), y && g && u.has(C) && u.delete(C);
    }
  }
  return { checkedKeys: Array.from(u), indeterminateKeys: Array.from(h) };
}
function bn(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && xi(d, (f) => {
      if (f.disabled) return uo.STOP;
      const { key: v } = f;
      if (!a.has(v) && (a.add(v), l.add(v), nd(f.rawNode, i))) {
        if (o) return uo.STOP;
        if (!n) throw new ad();
      }
    });
  }), l;
}
function ud(e, { includeGroup: t = false, includeSelf: n = true }, o) {
  var r;
  const i = o.treeNodeMap;
  let a = e == null ? null : (r = i.get(e)) !== null && r !== void 0 ? r : null;
  const l = { keyPath: [], treeNodePath: [], treeNode: a };
  if (a == null ? void 0 : a.ignored) return l.treeNode = null, l;
  for (; a; ) !a.ignored && (t || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), n || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function fd(e) {
  if (e.length === 0) return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function hd(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Rr(e, t, { loop: n = false, includeDisabled: o = false } = {}) {
  const r = t === "prev" ? vd : hd, i = { reverse: t === "prev" };
  let a = false, l = null;
  function s(d) {
    if (d !== null) {
      if (d === e) {
        if (!a) a = true;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!d.disabled || o) && !d.ignored && !d.isGroup) {
        l = d;
        return;
      }
      if (d.isGroup) {
        const f = Bo(d, i);
        f !== null ? l = f : s(r(d, n));
      } else {
        const f = r(d, false);
        if (f !== null) s(f);
        else {
          const v = pd(d);
          (v == null ? void 0 : v.isGroup) ? s(r(v, n)) : n && s(r(d, true));
        }
      }
    }
  }
  return s(e), l;
}
function vd(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function pd(e) {
  return e.parent;
}
function Bo(e, t = {}) {
  const { reverse: n = false } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, a = n ? -1 : r, l = n ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const d = o[s];
      if (!d.disabled && !d.ignored) if (d.isGroup) {
        const f = Bo(d, t);
        if (f !== null) return f;
      } else return d;
    }
  }
  return null;
}
const gd = { getChild() {
  return this.ignored ? null : Bo(this);
}, getParent() {
  const { parent: e } = this;
  return (e == null ? void 0 : e.isGroup) ? e.getParent() : e;
}, getNext(e = {}) {
  return Rr(this, "next", e);
}, getPrev(e = {}) {
  return Rr(this, "prev", e);
} };
function bd(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((a) => {
      o.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || n === void 0 || n.has(a.key)) && r(a.children);
    });
  }
  return r(e), o;
}
function md(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n) return true;
    t = t.parent;
  }
  return false;
}
function wi(e, t, n, o, r, i = null, a = 0) {
  const l = [];
  return e.forEach((s, d) => {
    var f;
    const v = Object.create(o);
    if (v.rawNode = s, v.siblings = l, v.level = a, v.index = d, v.isFirstChild = d === 0, v.isLastChild = d + 1 === e.length, v.parent = i, !v.ignored) {
      const m = r(s);
      Array.isArray(m) && (v.children = wi(m, t, n, o, r, v, a + 1));
    }
    l.push(v), t.set(v.key, v), n.has(a) || n.set(a, []), (f = n.get(a)) === null || f === void 0 || f.push(v);
  }), l;
}
function kn(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = td, getIgnored: a = Qs, getIsGroup: l = id, getKey: s = Js } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : Ys, f = t.ignoreEmptyChildren ? (x) => {
    const C = d(x);
    return Array.isArray(C) ? C.length ? C : null : C;
  } : d, v = Object.assign({ get key() {
    return s(this.rawNode);
  }, get disabled() {
    return i(this.rawNode);
  }, get isGroup() {
    return l(this.rawNode);
  }, get isLeaf() {
    return Zs(this.rawNode, f);
  }, get shallowLoaded() {
    return ed(this.rawNode, f);
  }, get ignored() {
    return a(this.rawNode);
  }, contains(x) {
    return md(this, x);
  } }, gd), m = wi(e, o, r, v, f);
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
    const O = u(x);
    return O ? O.getPrev(C) : null;
  }
  function p(x, C) {
    const O = u(x);
    return O ? O.getNext(C) : null;
  }
  function b(x) {
    const C = u(x);
    return C ? C.getParent() : null;
  }
  function y(x) {
    const C = u(x);
    return C ? C.getChild() : null;
  }
  const P = { treeNodes: m, treeNodeMap: o, levelTreeNodeMap: r, maxLevel: Math.max(...r.keys()), getChildren: f, getFlattenedNodes(x) {
    return bd(m, x);
  }, getNode: g, getPrev: h, getNext: p, getParent: b, getChild: y, getFirstAvailableNode() {
    return fd(m);
  }, getPath(x, C = {}) {
    return ud(x, C, P);
  }, getCheckedKeys(x, C = {}) {
    const { cascade: O = true, leafOnly: T = false, checkStrategy: W = "all", allowNotLoaded: N = false } = C;
    return Gn({ checkedKeys: Wn(x), indeterminateKeys: Vn(x), cascade: O, leafOnly: T, checkStrategy: W, allowNotLoaded: N }, P);
  }, check(x, C, O = {}) {
    const { cascade: T = true, leafOnly: W = false, checkStrategy: N = "all", allowNotLoaded: K = false } = O;
    return Gn({ checkedKeys: Wn(C), indeterminateKeys: Vn(C), keysToCheck: x == null ? [] : kr(x), cascade: T, leafOnly: W, checkStrategy: N, allowNotLoaded: K }, P);
  }, uncheck(x, C, O = {}) {
    const { cascade: T = true, leafOnly: W = false, checkStrategy: N = "all", allowNotLoaded: K = false } = O;
    return Gn({ checkedKeys: Wn(C), indeterminateKeys: Vn(C), keysToUncheck: x == null ? [] : kr(x), cascade: T, leafOnly: W, checkStrategy: N, allowNotLoaded: K }, P);
  }, getNonLeafKeys(x = {}) {
    return Xs(m, x);
  } };
  return P;
}
const yd = { iconSizeTiny: "28px", iconSizeSmall: "34px", iconSizeMedium: "40px", iconSizeLarge: "46px", iconSizeHuge: "52px" };
function xd(e) {
  const { textColorDisabled: t, iconColor: n, textColor2: o, fontSizeTiny: r, fontSizeSmall: i, fontSizeMedium: a, fontSizeLarge: l, fontSizeHuge: s } = e;
  return Object.assign(Object.assign({}, yd), { fontSizeTiny: r, fontSizeSmall: i, fontSizeMedium: a, fontSizeLarge: l, fontSizeHuge: s, textColor: t, iconColor: n, extraTextColor: o });
}
const _o = { name: "Empty", common: Ze, self: xd }, wd = M("empty", `
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
 `)]), Cd = Object.assign(Object.assign({}, xe.props), { description: String, showDescription: { type: Boolean, default: true }, showIcon: { type: Boolean, default: true }, size: { type: String, default: "medium" }, renderIcon: Function }), Ci = le({ name: "Empty", props: Cd, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: n, mergedComponentPropsRef: o } = Oe(e), r = xe("Empty", "-empty", wd, _o, e, t), { localeRef: i } = wn("Empty"), a = $(() => {
    var f, v, m;
    return (f = e.description) !== null && f !== void 0 ? f : (m = (v = o == null ? void 0 : o.value) === null || v === void 0 ? void 0 : v.Empty) === null || m === void 0 ? void 0 : m.description;
  }), l = $(() => {
    var f, v;
    return ((v = (f = o == null ? void 0 : o.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.renderIcon) || (() => c(Vs, null));
  }), s = $(() => {
    const { size: f } = e, { common: { cubicBezierEaseInOut: v }, self: { [pe("iconSize", f)]: m, [pe("fontSize", f)]: g, textColor: u, iconColor: h, extraTextColor: p } } = r.value;
    return { "--n-icon-size": m, "--n-font-size": g, "--n-bezier": v, "--n-text-color": u, "--n-icon-color": h, "--n-extra-text-color": p };
  }), d = n ? Qe("empty", $(() => {
    let f = "";
    const { size: v } = e;
    return f += v[0], f;
  }), s, e) : void 0;
  return { mergedClsPrefix: t, mergedRenderIcon: l, localizedDescription: $(() => a.value || i.value.description), cssVars: n ? void 0 : s, themeClass: d == null ? void 0 : d.themeClass, onRender: d == null ? void 0 : d.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: n } = this;
  return n == null ? void 0 : n(), c("div", { class: [`${t}-empty`, this.themeClass], style: this.cssVars }, this.showIcon ? c("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : c(it, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null, this.showDescription ? c("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? c("div", { class: `${t}-empty__extra` }, e.extra()) : null);
} }), Sd = { height: "calc(var(--n-option-height) * 7.6)", paddingTiny: "4px 0", paddingSmall: "4px 0", paddingMedium: "4px 0", paddingLarge: "4px 0", paddingHuge: "4px 0", optionPaddingTiny: "0 12px", optionPaddingSmall: "0 12px", optionPaddingMedium: "0 12px", optionPaddingLarge: "0 12px", optionPaddingHuge: "0 12px", loadingSize: "18px" };
function kd(e) {
  const { borderRadius: t, popoverColor: n, textColor3: o, dividerColor: r, textColor2: i, primaryColorPressed: a, textColorDisabled: l, primaryColor: s, opacityDisabled: d, hoverColor: f, fontSizeTiny: v, fontSizeSmall: m, fontSizeMedium: g, fontSizeLarge: u, fontSizeHuge: h, heightTiny: p, heightSmall: b, heightMedium: y, heightLarge: P, heightHuge: x } = e;
  return Object.assign(Object.assign({}, Sd), { optionFontSizeTiny: v, optionFontSizeSmall: m, optionFontSizeMedium: g, optionFontSizeLarge: u, optionFontSizeHuge: h, optionHeightTiny: p, optionHeightSmall: b, optionHeightMedium: y, optionHeightLarge: P, optionHeightHuge: x, borderRadius: t, color: n, groupHeaderTextColor: o, actionDividerColor: r, optionTextColor: i, optionTextColorPressed: a, optionTextColorDisabled: l, optionTextColorActive: s, optionOpacityDisabled: d, optionCheckColor: s, optionColorPending: f, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: f, actionTextColor: i, loadingColor: s });
}
const Ao = xt({ name: "InternalSelectMenu", common: Ze, peers: { Scrollbar: yo, Empty: _o }, self: kd }), Pr = le({ name: "NBaseSelectGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { renderLabelRef: e, renderOptionRef: t, labelFieldRef: n, nodePropsRef: o } = Ce(ko);
  return { labelField: n, nodeProps: o, renderLabel: e, renderOption: t };
}, render() {
  const { clsPrefix: e, renderLabel: t, renderOption: n, nodeProps: o, tmNode: { rawNode: r } } = this, i = o == null ? void 0 : o(r), a = t ? t(r, false) : bt(r[this.labelField], r, false), l = c("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), a);
  return r.render ? r.render({ node: l, option: r }) : n ? n({ node: l, option: r, selected: false }) : l;
} });
function Rd(e, t) {
  return c(on, { name: "fade-in-scale-up-transition" }, { default: () => e ? c(it, { clsPrefix: t, class: `${t}-base-select-option__check` }, { default: () => c(Ws) }) : null });
}
const zr = le({ name: "NBaseSelectOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup(e) {
  const { valueRef: t, pendingTmNodeRef: n, multipleRef: o, valueSetRef: r, renderLabelRef: i, renderOptionRef: a, labelFieldRef: l, valueFieldRef: s, showCheckmarkRef: d, nodePropsRef: f, handleOptionClick: v, handleOptionMouseEnter: m } = Ce(ko), g = ze(() => {
    const { value: b } = n;
    return b ? e.tmNode.key === b.key : false;
  });
  function u(b) {
    const { tmNode: y } = e;
    y.disabled || v(b, y);
  }
  function h(b) {
    const { tmNode: y } = e;
    y.disabled || m(b, y);
  }
  function p(b) {
    const { tmNode: y } = e, { value: P } = g;
    y.disabled || P || m(b, y);
  }
  return { multiple: o, isGrouped: ze(() => {
    const { tmNode: b } = e, { parent: y } = b;
    return y && y.rawNode.type === "group";
  }), showCheckmark: d, nodeProps: f, isPending: g, isSelected: ze(() => {
    const { value: b } = t, { value: y } = o;
    if (b === null) return false;
    const P = e.tmNode.rawNode[s.value];
    if (y) {
      const { value: x } = r;
      return x.has(P);
    } else return b === P;
  }), labelField: l, renderLabel: i, renderOption: a, handleMouseMove: p, handleMouseEnter: h, handleClick: u };
}, render() {
  const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: n, isPending: o, isGrouped: r, showCheckmark: i, nodeProps: a, renderOption: l, renderLabel: s, handleClick: d, handleMouseEnter: f, handleMouseMove: v } = this, m = Rd(n, e), g = s ? [s(t, n), i && m] : [bt(t[this.labelField], t, n), i && m], u = a == null ? void 0 : a(t), h = c("div", Object.assign({}, u, { class: [`${e}-base-select-option`, t.class, u == null ? void 0 : u.class, { [`${e}-base-select-option--disabled`]: t.disabled, [`${e}-base-select-option--selected`]: n, [`${e}-base-select-option--grouped`]: r, [`${e}-base-select-option--pending`]: o, [`${e}-base-select-option--show-checkmark`]: i }], style: [(u == null ? void 0 : u.style) || "", t.style || ""], onClick: en([d, u == null ? void 0 : u.onClick]), onMouseenter: en([f, u == null ? void 0 : u.onMouseenter]), onMousemove: en([v, u == null ? void 0 : u.onMousemove]) }), c("div", { class: `${e}-base-select-option__content` }, g));
  return t.render ? t.render({ node: h, option: t, selected: n }) : l ? l({ node: h, option: t, selected: n }) : h;
} }), { cubicBezierEaseIn: Fr, cubicBezierEaseOut: $r } = Bl;
function Rn({ transformOrigin: e = "inherit", duration: t = ".2s", enterScale: n = ".9", originalTransform: o = "", originalTransition: r = "" } = {}) {
  return [X("&.fade-in-scale-up-transition-leave-active", { transformOrigin: e, transition: `opacity ${t} ${Fr}, transform ${t} ${Fr} ${r && `,${r}`}` }), X("&.fade-in-scale-up-transition-enter-active", { transformOrigin: e, transition: `opacity ${t} ${$r}, transform ${t} ${$r} ${r && `,${r}`}` }), X("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", { opacity: 0, transform: `${o} scale(${n})` }), X("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", { opacity: 1, transform: `${o} scale(1)` })];
}
const Pd = M("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [M("scrollbar", `
 max-height: var(--n-height);
 `), M("virtual-list", `
 max-height: var(--n-height);
 `), M("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [Q("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), M("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), M("base-select-menu-option-wrapper", `
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
 `), M("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), M("base-select-option", `
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
 `, [Ne("selected", `
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
 `, [Rn({ enterScale: "0.5" })])])]), Si = le({ name: "InternalSelectMenu", props: Object.assign(Object.assign({}, xe.props), { clsPrefix: { type: String, required: true }, scrollable: { type: Boolean, default: true }, treeMate: { type: Object, required: true }, multiple: Boolean, size: { type: String, default: "medium" }, value: { type: [String, Number, Array], default: null }, autoPending: Boolean, virtualScroll: { type: Boolean, default: true }, show: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, loading: Boolean, focusable: Boolean, renderLabel: Function, renderOption: Function, nodeProps: Function, showCheckmark: { type: Boolean, default: true }, onMousedown: Function, onScroll: Function, onFocus: Function, onBlur: Function, onKeyup: Function, onKeydown: Function, onTabOut: Function, onMouseenter: Function, onMouseleave: Function, onResize: Function, resetMenuOnOptionsChange: { type: Boolean, default: true }, inlineThemeDisabled: Boolean, scrollbarProps: Object, onToggle: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n, mergedComponentPropsRef: o } = Oe(e), r = wt("InternalSelectMenu", n, t), i = xe("InternalSelectMenu", "-internal-select-menu", Pd, Ao, e, oe(e, "clsPrefix")), a = D(null), l = D(null), s = D(null), d = $(() => e.treeMate.getFlattenedNodes()), f = $(() => ld(d.value)), v = D(null);
  function m() {
    const { treeMate: z } = e;
    let E = null;
    const { value: ue } = e;
    ue === null ? E = z.getFirstAvailableNode() : (e.multiple ? E = z.getNode((ue || [])[(ue || []).length - 1]) : E = z.getNode(ue), (!E || E.disabled) && (E = z.getFirstAvailableNode())), B(E || null);
  }
  function g() {
    const { value: z } = v;
    z && !e.treeMate.getNode(z.key) && (v.value = null);
  }
  let u;
  Ee(() => e.show, (z) => {
    z ? u = Ee(() => e.treeMate, () => {
      e.resetMenuOnOptionsChange ? (e.autoPending ? m() : g(), _t(F)) : g();
    }, { immediate: true }) : u == null ? void 0 : u();
  }, { immediate: true }), yt(() => {
    u == null ? void 0 : u();
  });
  const h = $(() => Ut(i.value.self[pe("optionHeight", e.size)])), p = $(() => Wt(i.value.self[pe("padding", e.size)])), b = $(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), y = $(() => {
    const z = d.value;
    return z && z.length === 0;
  }), P = $(() => {
    var z, E;
    return (E = (z = o == null ? void 0 : o.value) === null || z === void 0 ? void 0 : z.Select) === null || E === void 0 ? void 0 : E.renderEmpty;
  });
  function x(z) {
    const { onToggle: E } = e;
    E && E(z);
  }
  function C(z) {
    const { onScroll: E } = e;
    E && E(z);
  }
  function O(z) {
    var E;
    (E = s.value) === null || E === void 0 || E.sync(), C(z);
  }
  function T() {
    var z;
    (z = s.value) === null || z === void 0 || z.sync();
  }
  function W() {
    const { value: z } = v;
    return z || null;
  }
  function N(z, E) {
    E.disabled || B(E, false);
  }
  function K(z, E) {
    E.disabled || x(E);
  }
  function q(z) {
    var E;
    lt(z, "action") || (E = e.onKeyup) === null || E === void 0 || E.call(e, z);
  }
  function I(z) {
    var E;
    lt(z, "action") || (E = e.onKeydown) === null || E === void 0 || E.call(e, z);
  }
  function w(z) {
    var E;
    (E = e.onMousedown) === null || E === void 0 || E.call(e, z), !e.focusable && z.preventDefault();
  }
  function k() {
    const { value: z } = v;
    z && B(z.getNext({ loop: true }), true);
  }
  function R() {
    const { value: z } = v;
    z && B(z.getPrev({ loop: true }), true);
  }
  function B(z, E = false) {
    v.value = z, E && F();
  }
  function F() {
    var z, E;
    const ue = v.value;
    if (!ue) return;
    const me = f.value(ue.key);
    me !== null && (e.virtualScroll ? (z = l.value) === null || z === void 0 || z.scrollTo({ index: me }) : (E = s.value) === null || E === void 0 || E.scrollTo({ index: me, elSize: h.value }));
  }
  function L(z) {
    var E, ue;
    !((E = a.value) === null || E === void 0) && E.contains(z.target) && ((ue = e.onFocus) === null || ue === void 0 || ue.call(e, z));
  }
  function V(z) {
    var E, ue;
    !((E = a.value) === null || E === void 0) && E.contains(z.relatedTarget) || (ue = e.onBlur) === null || ue === void 0 || ue.call(e, z);
  }
  Le(ko, { handleOptionMouseEnter: N, handleOptionClick: K, valueSetRef: b, pendingTmNodeRef: v, nodePropsRef: oe(e, "nodeProps"), showCheckmarkRef: oe(e, "showCheckmark"), multipleRef: oe(e, "multiple"), valueRef: oe(e, "value"), renderLabelRef: oe(e, "renderLabel"), renderOptionRef: oe(e, "renderOption"), labelFieldRef: oe(e, "labelField"), valueFieldRef: oe(e, "valueField") }), Le(ni, a), Rt(() => {
    const { value: z } = s;
    z && z.sync();
  });
  const Z = $(() => {
    const { size: z } = e, { common: { cubicBezierEaseInOut: E }, self: { height: ue, borderRadius: me, color: ge, groupHeaderTextColor: se, actionDividerColor: H, optionTextColorPressed: de, optionTextColor: Se, optionTextColorDisabled: we, optionTextColorActive: $e, optionOpacityDisabled: De, optionCheckColor: Ke, actionTextColor: ce, optionColorPending: be, optionColorActive: Me, loadingColor: Pe, loadingSize: je, optionColorActivePending: qe, [pe("optionFontSize", z)]: _e, [pe("optionHeight", z)]: U, [pe("optionPadding", z)]: Y } } = i.value;
    return { "--n-height": ue, "--n-action-divider-color": H, "--n-action-text-color": ce, "--n-bezier": E, "--n-border-radius": me, "--n-color": ge, "--n-option-font-size": _e, "--n-group-header-text-color": se, "--n-option-check-color": Ke, "--n-option-color-pending": be, "--n-option-color-active": Me, "--n-option-color-active-pending": qe, "--n-option-height": U, "--n-option-opacity-disabled": De, "--n-option-text-color": Se, "--n-option-text-color-active": $e, "--n-option-text-color-disabled": we, "--n-option-text-color-pressed": de, "--n-option-padding": Y, "--n-option-padding-left": Wt(Y, "left"), "--n-option-padding-right": Wt(Y, "right"), "--n-loading-color": Pe, "--n-loading-size": je };
  }), { inlineThemeDisabled: _ } = e, j = _ ? Qe("internal-select-menu", $(() => e.size[0]), Z, e) : void 0, ee = { selfRef: a, next: k, prev: R, getPendingTmNode: W };
  return hi(a, e.onResize), Object.assign({ mergedTheme: i, mergedClsPrefix: t, rtlEnabled: r, virtualListRef: l, scrollbarRef: s, itemSize: h, padding: p, flattenedNodes: d, empty: y, mergedRenderEmpty: P, virtualListContainer() {
    const { value: z } = l;
    return z == null ? void 0 : z.listElRef;
  }, virtualListContent() {
    const { value: z } = l;
    return z == null ? void 0 : z.itemsElRef;
  }, doScroll: C, handleFocusin: L, handleFocusout: V, handleKeyUp: q, handleKeyDown: I, handleMouseDown: w, handleVirtualListResize: T, handleVirtualListScroll: O, cssVars: _ ? void 0 : Z, themeClass: j == null ? void 0 : j.themeClass, onRender: j == null ? void 0 : j.onRender }, ee);
}, render() {
  const { $slots: e, virtualScroll: t, clsPrefix: n, mergedTheme: o, themeClass: r, onRender: i } = this;
  return i == null ? void 0 : i(), c("div", { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [`${n}-base-select-menu`, `${n}-base-select-menu--${this.size}-size`, this.rtlEnabled && `${n}-base-select-menu--rtl`, r, this.multiple && `${n}-base-select-menu--multiple`], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, kt(e.header, (a) => a && c("div", { class: `${n}-base-select-menu__header`, "data-header": true, key: "header" }, a)), this.loading ? c("div", { class: `${n}-base-select-menu__loading` }, c(xo, { clsPrefix: n, strokeWidth: 20 })) : this.empty ? c("div", { class: `${n}-base-select-menu__empty`, "data-empty": true }, Cn(e.empty, () => {
    var a;
    return [((a = this.mergedRenderEmpty) === null || a === void 0 ? void 0 : a.call(this)) || c(Ci, { theme: o.peers.Empty, themeOverrides: o.peerOverrides.Empty, size: this.size })];
  })) : c(wo, Object.assign({ ref: "scrollbarRef", theme: o.peers.Scrollbar, themeOverrides: o.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, this.scrollbarProps), { default: () => t ? c(To, { ref: "virtualListRef", class: `${n}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: false, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: true }, { default: ({ item: a }) => a.isGroup ? c(Pr, { key: a.key, clsPrefix: n, tmNode: a }) : a.ignored ? null : c(zr, { clsPrefix: n, key: a.key, tmNode: a }) }) : c("div", { class: `${n}-base-select-menu-option-wrapper`, style: { paddingTop: this.padding.top, paddingBottom: this.padding.bottom } }, this.flattenedNodes.map((a) => a.isGroup ? c(Pr, { key: a.key, clsPrefix: n, tmNode: a }) : c(zr, { clsPrefix: n, key: a.key, tmNode: a }))) }), kt(e.action, (a) => a && [c("div", { class: `${n}-base-select-menu__action`, "data-action": true, key: "action" }, a), c(qs, { onFocus: this.onTabOut, key: "focus-detector" })]));
} }), zd = { space: "6px", spaceArrow: "10px", arrowOffset: "10px", arrowOffsetVertical: "10px", arrowHeight: "6px", padding: "8px 14px" };
function Fd(e) {
  const { boxShadow2: t, popoverColor: n, textColor2: o, borderRadius: r, fontSize: i, dividerColor: a } = e;
  return Object.assign(Object.assign({}, zd), { fontSize: i, borderRadius: r, color: n, dividerColor: a, textColor: o, boxShadow: t });
}
const Zt = xt({ name: "Popover", common: Ze, peers: { Scrollbar: yo }, self: Fd }), qn = { top: "bottom", bottom: "top", left: "right", right: "left" }, Ae = "var(--n-arrow-height) * 1.414", $d = X([M("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [X(">", [M("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Ne("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Ne("scrollable", [Ne("show-header-or-footer", "padding: var(--n-padding);")])]), Q("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), Q("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), G("scrollable, show-header-or-footer", [Q("content", `
 padding: var(--n-padding);
 `)])]), M("popover-shared", `
 transform-origin: inherit;
 `, [M("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [M("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${Ae});
 height: calc(${Ae});
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
 `)]), rt("top-start", `
 top: calc(${Ae} / -2);
 left: calc(${St("top-start")} - var(--v-offset-left));
 `), rt("top", `
 top: calc(${Ae} / -2);
 transform: translateX(calc(${Ae} / -2)) rotate(45deg);
 left: 50%;
 `), rt("top-end", `
 top: calc(${Ae} / -2);
 right: calc(${St("top-end")} + var(--v-offset-left));
 `), rt("bottom-start", `
 bottom: calc(${Ae} / -2);
 left: calc(${St("bottom-start")} - var(--v-offset-left));
 `), rt("bottom", `
 bottom: calc(${Ae} / -2);
 transform: translateX(calc(${Ae} / -2)) rotate(45deg);
 left: 50%;
 `), rt("bottom-end", `
 bottom: calc(${Ae} / -2);
 right: calc(${St("bottom-end")} + var(--v-offset-left));
 `), rt("left-start", `
 left: calc(${Ae} / -2);
 top: calc(${St("left-start")} - var(--v-offset-top));
 `), rt("left", `
 left: calc(${Ae} / -2);
 transform: translateY(calc(${Ae} / -2)) rotate(45deg);
 top: 50%;
 `), rt("left-end", `
 left: calc(${Ae} / -2);
 bottom: calc(${St("left-end")} + var(--v-offset-top));
 `), rt("right-start", `
 right: calc(${Ae} / -2);
 top: calc(${St("right-start")} - var(--v-offset-top));
 `), rt("right", `
 right: calc(${Ae} / -2);
 transform: translateY(calc(${Ae} / -2)) rotate(45deg);
 top: 50%;
 `), rt("right-end", `
 right: calc(${Ae} / -2);
 bottom: calc(${St("right-end")} + var(--v-offset-top));
 `), ...js({ top: ["right-start", "left-start"], right: ["top-end", "bottom-end"], bottom: ["right-end", "left-end"], left: ["top-start", "bottom-start"] }, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", l = `calc((${`var(--v-target-${o}, 0px)`} - ${Ae}) / 2)`, s = St(r);
    return X(`[v-placement="${r}"] >`, [M("popover-shared", [G("center-arrow", [M("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function St(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function rt(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return X(`[v-placement="${e}"] >`, [M("popover-shared", `
 margin-${qn[n]}: var(--n-space);
 `, [G("show-arrow", `
 margin-${qn[n]}: var(--n-space-arrow);
 `), G("overlap", `
 margin: 0;
 `), _l("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${qn[n]}: auto;
 ${o}
 `, [M("popover-arrow", t)])])]);
}
const ki = Object.assign(Object.assign({}, xe.props), { to: mt.propTo, show: Boolean, trigger: String, showArrow: Boolean, delay: Number, duration: Number, raw: Boolean, arrowPointToCenter: Boolean, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], displayDirective: String, x: Number, y: Number, flip: Boolean, overlap: Boolean, placement: String, width: [Number, String], keepAliveOnHover: Boolean, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], internalDeactivateImmediately: Boolean, animated: Boolean, onClickoutside: Function, internalTrapFocus: Boolean, internalOnAfterLeave: Function, minWidth: Number, maxWidth: Number });
function Ri({ arrowClass: e, arrowStyle: t, arrowWrapperClass: n, arrowWrapperStyle: o, clsPrefix: r }) {
  return c("div", { key: "__popover-arrow__", style: o, class: [`${r}-popover-arrow-wrapper`, n] }, c("div", { class: [`${r}-popover-arrow`, e], style: t }));
}
const Md = le({ name: "PopoverBody", inheritAttrs: false, props: ki, setup(e, { slots: t, attrs: n }) {
  const { namespaceRef: o, mergedClsPrefixRef: r, inlineThemeDisabled: i, mergedRtlRef: a } = Oe(e), l = xe("Popover", "-popover", $d, Zt, e, r), s = wt("Popover", a, r), d = D(null), f = Ce("NPopover"), v = D(null), m = D(e.show), g = D(false);
  Mt(() => {
    const { show: N } = e;
    N && !Pa() && !e.internalDeactivateImmediately && (g.value = true);
  });
  const u = $(() => {
    const { trigger: N, onClickoutside: K } = e, q = [], { positionManuallyRef: { value: I } } = f;
    return I || (N === "click" && !K && q.push([pn, O, void 0, { capture: true }]), N === "hover" && q.push([sa, C])), K && q.push([pn, O, void 0, { capture: true }]), (e.displayDirective === "show" || e.animated && g.value) && q.push([Gr, e.show]), q;
  }), h = $(() => {
    const { common: { cubicBezierEaseInOut: N, cubicBezierEaseIn: K, cubicBezierEaseOut: q }, self: { space: I, spaceArrow: w, padding: k, fontSize: R, textColor: B, dividerColor: F, color: L, boxShadow: V, borderRadius: Z, arrowHeight: _, arrowOffset: j, arrowOffsetVertical: ee } } = l.value;
    return { "--n-box-shadow": V, "--n-bezier": N, "--n-bezier-ease-in": K, "--n-bezier-ease-out": q, "--n-font-size": R, "--n-text-color": B, "--n-color": L, "--n-divider-color": F, "--n-border-radius": Z, "--n-arrow-height": _, "--n-arrow-offset": j, "--n-arrow-offset-vertical": ee, "--n-padding": k, "--n-space": I, "--n-space-arrow": w };
  }), p = $(() => {
    const N = e.width === "trigger" ? void 0 : Ge(e.width), K = [];
    N && K.push({ width: N });
    const { maxWidth: q, minWidth: I } = e;
    return q && K.push({ maxWidth: Ge(q) }), I && K.push({ maxWidth: Ge(I) }), i || K.push(h.value), K;
  }), b = i ? Qe("popover", void 0, h, e) : void 0;
  f.setBodyInstance({ syncPosition: y }), yt(() => {
    f.setBodyInstance(null);
  }), Ee(oe(e, "show"), (N) => {
    e.animated || (N ? m.value = true : m.value = false);
  });
  function y() {
    var N;
    (N = d.value) === null || N === void 0 || N.syncPosition();
  }
  function P(N) {
    e.trigger === "hover" && e.keepAliveOnHover && e.show && f.handleMouseEnter(N);
  }
  function x(N) {
    e.trigger === "hover" && e.keepAliveOnHover && f.handleMouseLeave(N);
  }
  function C(N) {
    e.trigger === "hover" && !T().contains(fn(N)) && f.handleMouseMoveOutside(N);
  }
  function O(N) {
    (e.trigger === "click" && !T().contains(fn(N)) || e.onClickoutside) && f.handleClickOutside(N);
  }
  function T() {
    return f.getTriggerElement();
  }
  Le(Sn, v), Le(Ro, null), Le(Po, null);
  function W() {
    if (b == null ? void 0 : b.onRender(), !(e.displayDirective === "show" || e.show || e.animated && g.value)) return null;
    let K;
    const q = f.internalRenderBodyRef.value, { value: I } = r;
    if (q) K = q([`${I}-popover-shared`, (s == null ? void 0 : s.value) && `${I}-popover--rtl`, b == null ? void 0 : b.themeClass.value, e.overlap && `${I}-popover-shared--overlap`, e.showArrow && `${I}-popover-shared--show-arrow`, e.arrowPointToCenter && `${I}-popover-shared--center-arrow`], v, p.value, P, x);
    else {
      const { value: w } = f.extraClassRef, { internalTrapFocus: k } = e, R = !Zo(t.header) || !Zo(t.footer), B = () => {
        var F, L;
        const V = R ? c(ut, null, kt(t.header, (j) => j ? c("div", { class: [`${I}-popover__header`, e.headerClass], style: e.headerStyle }, j) : null), kt(t.default, (j) => j ? c("div", { class: [`${I}-popover__content`, e.contentClass], style: e.contentStyle }, t) : null), kt(t.footer, (j) => j ? c("div", { class: [`${I}-popover__footer`, e.footerClass], style: e.footerStyle }, j) : null)) : e.scrollable ? (F = t.default) === null || F === void 0 ? void 0 : F.call(t) : c("div", { class: [`${I}-popover__content`, e.contentClass], style: e.contentStyle }, t), Z = e.scrollable ? c(Vr, { themeOverrides: l.value.peerOverrides.Scrollbar, theme: l.value.peers.Scrollbar, contentClass: R ? void 0 : `${I}-popover__content ${(L = e.contentClass) !== null && L !== void 0 ? L : ""}`, contentStyle: R ? void 0 : e.contentStyle }, { default: () => V }) : V, _ = e.showArrow ? Ri({ arrowClass: e.arrowClass, arrowStyle: e.arrowStyle, arrowWrapperClass: e.arrowWrapperClass, arrowWrapperStyle: e.arrowWrapperStyle, clsPrefix: I }) : null;
        return [Z, _];
      };
      K = c("div", Tt({ class: [`${I}-popover`, `${I}-popover-shared`, (s == null ? void 0 : s.value) && `${I}-popover--rtl`, b == null ? void 0 : b.themeClass.value, w.map((F) => `${I}-${F}`), { [`${I}-popover--scrollable`]: e.scrollable, [`${I}-popover--show-header-or-footer`]: R, [`${I}-popover--raw`]: e.raw, [`${I}-popover-shared--overlap`]: e.overlap, [`${I}-popover-shared--show-arrow`]: e.showArrow, [`${I}-popover-shared--center-arrow`]: e.arrowPointToCenter }], ref: v, style: p.value, onKeydown: f.handleKeydown, onMouseenter: P, onMouseleave: x }, n), k ? c(ka, { active: e.show, autoFocus: true }, { default: B }) : B());
    }
    return nn(K, u.value);
  }
  return { displayed: g, namespace: o, isMounted: f.isMountedRef, zIndex: f.zIndexRef, followerRef: d, adjustedTo: mt(e), followerEnabled: m, renderContentNode: W };
}, render() {
  return c(Mo, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === mt.tdkey }, { default: () => this.animated ? c(on, { name: "popover-transition", appear: this.isMounted, onEnter: () => {
    this.followerEnabled = true;
  }, onAfterLeave: () => {
    var e;
    (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = false, this.displayed = false;
  } }, { default: this.renderContentNode }) : this.renderContentNode() });
} }), Td = Object.keys(ki), Od = { focus: ["onFocus", "onBlur"], click: ["onClick"], hover: ["onMouseenter", "onMouseleave"], manual: [], nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"] };
function Id(e, t, n) {
  Od[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...a) => {
      r(...a), i(...a);
    } : e.props[o] = i;
  });
}
const qt = { show: { type: Boolean, default: void 0 }, defaultShow: Boolean, showArrow: { type: Boolean, default: true }, trigger: { type: String, default: "hover" }, delay: { type: Number, default: 100 }, duration: { type: Number, default: 100 }, raw: Boolean, placement: { type: String, default: "top" }, x: Number, y: Number, arrowPointToCenter: Boolean, disabled: Boolean, getDisabled: Function, displayDirective: { type: String, default: "if" }, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], flip: { type: Boolean, default: true }, animated: { type: Boolean, default: true }, width: { type: [Number, String], default: void 0 }, overlap: Boolean, keepAliveOnHover: { type: Boolean, default: true }, zIndex: Number, to: mt.propTo, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], onClickoutside: Function, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], internalDeactivateImmediately: Boolean, internalSyncTargetWithParent: Boolean, internalInheritedEventHandlers: { type: Array, default: () => [] }, internalTrapFocus: Boolean, internalExtraClass: { type: Array, default: () => [] }, onShow: [Function, Array], onHide: [Function, Array], arrow: { type: Boolean, default: void 0 }, minWidth: Number, maxWidth: Number }, Bd = Object.assign(Object.assign(Object.assign({}, xe.props), qt), { internalOnAfterLeave: Function, internalRenderBody: Function }), ln = le({ name: "Popover", inheritAttrs: false, props: Bd, slots: Object, __popover__: true, setup(e) {
  const t = po(), n = D(null), o = $(() => e.show), r = D(e.defaultShow), i = tt(o, r), a = ze(() => e.disabled ? false : i.value), l = () => {
    if (e.disabled) return true;
    const { getDisabled: R } = e;
    return !!(R == null ? void 0 : R());
  }, s = () => l() ? false : i.value, d = ei(e, ["arrow", "showArrow"]), f = $(() => e.overlap ? false : d.value);
  let v = null;
  const m = D(null), g = D(null), u = ze(() => e.x !== void 0 && e.y !== void 0);
  function h(R) {
    const { "onUpdate:show": B, onUpdateShow: F, onShow: L, onHide: V } = e;
    r.value = R, B && ne(B, R), F && ne(F, R), R && L && ne(L, true), R && V && ne(V, false);
  }
  function p() {
    v && v.syncPosition();
  }
  function b() {
    const { value: R } = m;
    R && (window.clearTimeout(R), m.value = null);
  }
  function y() {
    const { value: R } = g;
    R && (window.clearTimeout(R), g.value = null);
  }
  function P() {
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
      if (y(), m.value !== null || s()) return;
      const B = () => {
        h(true), m.value = null;
      }, { delay: F } = e;
      F === 0 ? B() : m.value = window.setTimeout(B, F);
    }
  }
  function O() {
    const R = l();
    if (e.trigger === "hover" && !R) {
      if (b(), g.value !== null || !s()) return;
      const B = () => {
        h(false), g.value = null;
      }, { duration: F } = e;
      F === 0 ? B() : g.value = window.setTimeout(B, F);
    }
  }
  function T() {
    O();
  }
  function W(R) {
    var B;
    s() && (e.trigger === "click" && (b(), y(), h(false)), (B = e.onClickoutside) === null || B === void 0 || B.call(e, R));
  }
  function N() {
    if (e.trigger === "click" && !l()) {
      b(), y();
      const R = !s();
      h(R);
    }
  }
  function K(R) {
    e.internalTrapFocus && R.key === "Escape" && (b(), y(), h(false));
  }
  function q(R) {
    r.value = R;
  }
  function I() {
    var R;
    return (R = n.value) === null || R === void 0 ? void 0 : R.targetRef;
  }
  function w(R) {
    v = R;
  }
  return Le("NPopover", { getTriggerElement: I, handleKeydown: K, handleMouseEnter: C, handleMouseLeave: O, handleClickOutside: W, handleMouseMoveOutside: T, setBodyInstance: w, positionManuallyRef: u, isMountedRef: t, zIndexRef: oe(e, "zIndex"), extraClassRef: oe(e, "internalExtraClass"), internalRenderBodyRef: oe(e, "internalRenderBody") }), Mt(() => {
    i.value && l() && h(false);
  }), { binderInstRef: n, positionManually: u, mergedShowConsideringDisabledProp: a, uncontrolledShow: r, mergedShowArrow: f, getMergedShow: s, setShow: q, handleClick: N, handleMouseEnter: C, handleMouseLeave: O, handleFocus: P, handleBlur: x, syncPosition: p };
}, render() {
  var e;
  const { positionManually: t, $slots: n } = this;
  let o, r = false;
  if (!t && (o = $a(n, "trigger"), o)) {
    o = Al(o), o = o.type === El ? c("span", [o]) : o;
    const i = { onClick: this.handleClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur };
    if (!((e = o.type) === null || e === void 0) && e.__popover__) r = true, o.props || (o.props = { internalSyncTargetWithParent: true, internalInheritedEventHandlers: [] }), o.props.internalSyncTargetWithParent = true, o.props.internalInheritedEventHandlers ? o.props.internalInheritedEventHandlers = [i, ...o.props.internalInheritedEventHandlers] : o.props.internalInheritedEventHandlers = [i];
    else {
      const { internalInheritedEventHandlers: a } = this, l = [i, ...a], s = { onBlur: (d) => {
        l.forEach((f) => {
          f.onBlur(d);
        });
      }, onFocus: (d) => {
        l.forEach((f) => {
          f.onFocus(d);
        });
      }, onClick: (d) => {
        l.forEach((f) => {
          f.onClick(d);
        });
      }, onMouseenter: (d) => {
        l.forEach((f) => {
          f.onMouseenter(d);
        });
      }, onMouseleave: (d) => {
        l.forEach((f) => {
          f.onMouseleave(d);
        });
      } };
      Id(o, a ? "nested" : t ? "manual" : this.trigger, s);
    }
  }
  return c(zo, { ref: "binderInstRef", syncTarget: !r, syncTargetWithParent: this.internalSyncTargetWithParent }, { default: () => {
    this.mergedShowConsideringDisabledProp;
    const i = this.getMergedShow();
    return [this.internalTrapFocus && i ? nn(c("div", { style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 } }), [[li, { enabled: i, zIndex: this.zIndex }]]) : null, t ? null : c(Fo, null, { default: () => o }), c(Md, Co(this.$props, Td, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), { default: () => {
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
} }), _d = { closeIconSizeTiny: "12px", closeIconSizeSmall: "12px", closeIconSizeMedium: "14px", closeIconSizeLarge: "14px", closeSizeTiny: "16px", closeSizeSmall: "16px", closeSizeMedium: "18px", closeSizeLarge: "18px", padding: "0 7px", closeMargin: "0 0 0 4px" };
function Ad(e) {
  const { textColor2: t, primaryColorHover: n, primaryColorPressed: o, primaryColor: r, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: f, opacityDisabled: v, tagColor: m, closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: h, borderRadiusSmall: p, fontSizeMini: b, fontSizeTiny: y, fontSizeSmall: P, fontSizeMedium: x, heightMini: C, heightTiny: O, heightSmall: T, heightMedium: W, closeColorHover: N, closeColorPressed: K, buttonColor2Hover: q, buttonColor2Pressed: I, fontWeightStrong: w } = e;
  return Object.assign(Object.assign({}, _d), { closeBorderRadius: p, heightTiny: C, heightSmall: O, heightMedium: T, heightLarge: W, borderRadius: p, opacityDisabled: v, fontSizeTiny: b, fontSizeSmall: y, fontSizeMedium: P, fontSizeLarge: x, fontWeightStrong: w, textColorCheckable: t, textColorHoverCheckable: t, textColorPressedCheckable: t, textColorChecked: d, colorCheckable: "#0000", colorHoverCheckable: q, colorPressedCheckable: I, colorChecked: r, colorCheckedHover: n, colorCheckedPressed: o, border: `1px solid ${f}`, textColor: t, color: m, colorBordered: "rgb(250, 250, 252)", closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: h, closeColorHover: N, closeColorPressed: K, borderPrimary: `1px solid ${ye(r, { alpha: 0.3 })}`, textColorPrimary: r, colorPrimary: ye(r, { alpha: 0.12 }), colorBorderedPrimary: ye(r, { alpha: 0.1 }), closeIconColorPrimary: r, closeIconColorHoverPrimary: r, closeIconColorPressedPrimary: r, closeColorHoverPrimary: ye(r, { alpha: 0.12 }), closeColorPressedPrimary: ye(r, { alpha: 0.18 }), borderInfo: `1px solid ${ye(i, { alpha: 0.3 })}`, textColorInfo: i, colorInfo: ye(i, { alpha: 0.12 }), colorBorderedInfo: ye(i, { alpha: 0.1 }), closeIconColorInfo: i, closeIconColorHoverInfo: i, closeIconColorPressedInfo: i, closeColorHoverInfo: ye(i, { alpha: 0.12 }), closeColorPressedInfo: ye(i, { alpha: 0.18 }), borderSuccess: `1px solid ${ye(a, { alpha: 0.3 })}`, textColorSuccess: a, colorSuccess: ye(a, { alpha: 0.12 }), colorBorderedSuccess: ye(a, { alpha: 0.1 }), closeIconColorSuccess: a, closeIconColorHoverSuccess: a, closeIconColorPressedSuccess: a, closeColorHoverSuccess: ye(a, { alpha: 0.12 }), closeColorPressedSuccess: ye(a, { alpha: 0.18 }), borderWarning: `1px solid ${ye(l, { alpha: 0.35 })}`, textColorWarning: l, colorWarning: ye(l, { alpha: 0.15 }), colorBorderedWarning: ye(l, { alpha: 0.12 }), closeIconColorWarning: l, closeIconColorHoverWarning: l, closeIconColorPressedWarning: l, closeColorHoverWarning: ye(l, { alpha: 0.12 }), closeColorPressedWarning: ye(l, { alpha: 0.18 }), borderError: `1px solid ${ye(s, { alpha: 0.23 })}`, textColorError: s, colorError: ye(s, { alpha: 0.1 }), colorBorderedError: ye(s, { alpha: 0.08 }), closeIconColorError: s, closeIconColorHoverError: s, closeIconColorPressedError: s, closeColorHoverError: ye(s, { alpha: 0.12 }), closeColorPressedError: ye(s, { alpha: 0.18 }) });
}
const Ed = { common: Ze, self: Ad }, Ld = { color: Object, type: { type: String, default: "default" }, round: Boolean, size: String, closable: Boolean, disabled: { type: Boolean, default: void 0 } }, Nd = M("tag", `
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
 `, [Ne("disabled", [X("&:hover", "background-color: var(--n-color-hover-checkable);", [Ne("checked", "color: var(--n-text-color-hover-checkable);")]), X("&:active", "background-color: var(--n-color-pressed-checkable);", [Ne("checked", "color: var(--n-text-color-pressed-checkable);")])]), G("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Ne("disabled", [X("&:hover", "background-color: var(--n-color-checked-hover);"), X("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Dd = Object.assign(Object.assign(Object.assign({}, xe.props), Ld), { bordered: { type: Boolean, default: void 0 }, checked: Boolean, checkable: Boolean, strong: Boolean, triggerClickOnClose: Boolean, onClose: [Array, Function], onMouseenter: Function, onMouseleave: Function, "onUpdate:checked": Function, onUpdateChecked: Function, internalCloseFocusable: { type: Boolean, default: true }, internalCloseIsButtonTag: { type: Boolean, default: true }, onCheckedChange: Function }), Hd = Xe("n-tag"), Xn = le({ name: "Tag", props: Dd, slots: Object, setup(e) {
  const t = D(null), { mergedBorderedRef: n, mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Oe(e), l = $(() => {
    var h, p;
    return e.size || ((p = (h = a == null ? void 0 : a.value) === null || h === void 0 ? void 0 : h.Tag) === null || p === void 0 ? void 0 : p.size) || "medium";
  }), s = xe("Tag", "-tag", Nd, Ed, e, o);
  Le(Hd, { roundRef: oe(e, "round") });
  function d() {
    if (!e.disabled && e.checkable) {
      const { checked: h, onCheckedChange: p, onUpdateChecked: b, "onUpdate:checked": y } = e;
      b && b(!h), y && y(!h), p && p(!h);
    }
  }
  function f(h) {
    if (e.triggerClickOnClose || h.stopPropagation(), !e.disabled) {
      const { onClose: p } = e;
      p && ne(p, h);
    }
  }
  const v = { setTextContent(h) {
    const { value: p } = t;
    p && (p.textContent = h);
  } }, m = wt("Tag", i, o), g = $(() => {
    const { type: h, color: { color: p, textColor: b } = {} } = e, y = l.value, { common: { cubicBezierEaseInOut: P }, self: { padding: x, closeMargin: C, borderRadius: O, opacityDisabled: T, textColorCheckable: W, textColorHoverCheckable: N, textColorPressedCheckable: K, textColorChecked: q, colorCheckable: I, colorHoverCheckable: w, colorPressedCheckable: k, colorChecked: R, colorCheckedHover: B, colorCheckedPressed: F, closeBorderRadius: L, fontWeightStrong: V, [pe("colorBordered", h)]: Z, [pe("closeSize", y)]: _, [pe("closeIconSize", y)]: j, [pe("fontSize", y)]: ee, [pe("height", y)]: z, [pe("color", h)]: E, [pe("textColor", h)]: ue, [pe("border", h)]: me, [pe("closeIconColor", h)]: ge, [pe("closeIconColorHover", h)]: se, [pe("closeIconColorPressed", h)]: H, [pe("closeColorHover", h)]: de, [pe("closeColorPressed", h)]: Se } } = s.value, we = Wt(C);
    return { "--n-font-weight-strong": V, "--n-avatar-size-override": `calc(${z} - 8px)`, "--n-bezier": P, "--n-border-radius": O, "--n-border": me, "--n-close-icon-size": j, "--n-close-color-pressed": Se, "--n-close-color-hover": de, "--n-close-border-radius": L, "--n-close-icon-color": ge, "--n-close-icon-color-hover": se, "--n-close-icon-color-pressed": H, "--n-close-icon-color-disabled": ge, "--n-close-margin-top": we.top, "--n-close-margin-right": we.right, "--n-close-margin-bottom": we.bottom, "--n-close-margin-left": we.left, "--n-close-size": _, "--n-color": p || (n.value ? Z : E), "--n-color-checkable": I, "--n-color-checked": R, "--n-color-checked-hover": B, "--n-color-checked-pressed": F, "--n-color-hover-checkable": w, "--n-color-pressed-checkable": k, "--n-font-size": ee, "--n-height": z, "--n-opacity-disabled": T, "--n-padding": x, "--n-text-color": b || ue, "--n-text-color-checkable": W, "--n-text-color-checked": q, "--n-text-color-hover-checkable": N, "--n-text-color-pressed-checkable": K };
  }), u = r ? Qe("tag", $(() => {
    let h = "";
    const { type: p, color: { color: b, textColor: y } = {} } = e;
    return h += p[0], h += l.value[0], b && (h += `a${Go(b)}`), y && (h += `b${Go(y)}`), n.value && (h += "c"), h;
  }), g, e) : void 0;
  return Object.assign(Object.assign({}, v), { rtlEnabled: m, mergedClsPrefix: o, contentRef: t, mergedBordered: n, handleClick: d, handleCloseClick: f, cssVars: r ? void 0 : g, themeClass: u == null ? void 0 : u.themeClass, onRender: u == null ? void 0 : u.onRender });
}, render() {
  var e, t;
  const { mergedClsPrefix: n, rtlEnabled: o, closable: r, color: { borderColor: i } = {}, round: a, onRender: l, $slots: s } = this;
  l == null ? void 0 : l();
  const d = kt(s.avatar, (v) => v && c("div", { class: `${n}-tag__avatar` }, v)), f = kt(s.icon, (v) => v && c("div", { class: `${n}-tag__icon` }, v));
  return c("div", { class: [`${n}-tag`, this.themeClass, { [`${n}-tag--rtl`]: o, [`${n}-tag--strong`]: this.strong, [`${n}-tag--disabled`]: this.disabled, [`${n}-tag--checkable`]: this.checkable, [`${n}-tag--checked`]: this.checkable && this.checked, [`${n}-tag--round`]: a, [`${n}-tag--avatar`]: d, [`${n}-tag--icon`]: f, [`${n}-tag--closable`]: r }], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, f || d, c("span", { class: `${n}-tag__content`, ref: "contentRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? c(Ll, { clsPrefix: n, class: `${n}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: a, isButtonTag: this.internalCloseIsButtonTag, absolute: true }) : null, !this.checkable && this.mergedBordered ? c("div", { class: `${n}-tag__border`, style: { borderColor: i } }) : null);
} }), Kd = { paddingSingle: "0 26px 0 12px", paddingMultiple: "3px 26px 0 12px", clearSize: "16px", arrowSize: "16px" };
function jd(e) {
  const { borderRadius: t, textColor2: n, textColorDisabled: o, inputColor: r, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: f, errorColorHover: v, borderColor: m, iconColor: g, iconColorDisabled: u, clearColor: h, clearColorHover: p, clearColorPressed: b, placeholderColor: y, placeholderColorDisabled: P, fontSizeTiny: x, fontSizeSmall: C, fontSizeMedium: O, fontSizeLarge: T, heightTiny: W, heightSmall: N, heightMedium: K, heightLarge: q, fontWeight: I } = e;
  return Object.assign(Object.assign({}, Kd), { fontSizeTiny: x, fontSizeSmall: C, fontSizeMedium: O, fontSizeLarge: T, heightTiny: W, heightSmall: N, heightMedium: K, heightLarge: q, borderRadius: t, fontWeight: I, textColor: n, textColorDisabled: o, placeholderColor: y, placeholderColorDisabled: P, color: r, colorDisabled: i, colorActive: r, border: `1px solid ${m}`, borderHover: `1px solid ${l}`, borderActive: `1px solid ${a}`, borderFocus: `1px solid ${l}`, boxShadowHover: "none", boxShadowActive: `0 0 0 2px ${ye(a, { alpha: 0.2 })}`, boxShadowFocus: `0 0 0 2px ${ye(a, { alpha: 0.2 })}`, caretColor: a, arrowColor: g, arrowColorDisabled: u, loadingColor: a, borderWarning: `1px solid ${s}`, borderHoverWarning: `1px solid ${d}`, borderActiveWarning: `1px solid ${s}`, borderFocusWarning: `1px solid ${d}`, boxShadowHoverWarning: "none", boxShadowActiveWarning: `0 0 0 2px ${ye(s, { alpha: 0.2 })}`, boxShadowFocusWarning: `0 0 0 2px ${ye(s, { alpha: 0.2 })}`, colorActiveWarning: r, caretColorWarning: s, borderError: `1px solid ${f}`, borderHoverError: `1px solid ${v}`, borderActiveError: `1px solid ${f}`, borderFocusError: `1px solid ${v}`, boxShadowHoverError: "none", boxShadowActiveError: `0 0 0 2px ${ye(f, { alpha: 0.2 })}`, boxShadowFocusError: `0 0 0 2px ${ye(f, { alpha: 0.2 })}`, colorActiveError: r, caretColorError: f, clearColor: h, clearColorHover: p, clearColorPressed: b });
}
const Pi = xt({ name: "InternalSelection", common: Ze, peers: { Popover: Zt }, self: jd }), Ud = X([M("base-selection", `
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
 `, [M("base-loading", `
 color: var(--n-loading-color);
 `), M("base-selection-tags", "min-height: var(--n-height);"), Q("border, state-border", `
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
 `), M("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [Q("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), M("base-selection-overlay", `
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
 `)]), M("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [Q("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), M("base-selection-tags", `
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
 `), M("base-selection-label", `
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
 `, [M("base-selection-input", `
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
 `)]), Ne("disabled", [X("&:hover", [Q("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), G("focus", [Q("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), G("active", [Q("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), M("base-selection-label", "background-color: var(--n-color-active);"), M("base-selection-tags", "background-color: var(--n-color-active);")])]), G("disabled", "cursor: not-allowed;", [Q("arrow", `
 color: var(--n-arrow-color-disabled);
 `), M("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [M("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), Q("render-label", `
 color: var(--n-text-color-disabled);
 `)]), M("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), M("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), M("base-selection-input-tag", `
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
 `)]), ["warning", "error"].map((e) => G(`${e}-status`, [Q("state-border", `border: var(--n-border-${e});`), Ne("disabled", [X("&:hover", [Q("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), G("active", [Q("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), M("base-selection-label", `background-color: var(--n-color-active-${e});`), M("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), G("focus", [Q("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), M("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), M("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [X("&:last-child", "padding-right: 0;"), M("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [Q("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Wd = le({ name: "InternalSelection", props: Object.assign(Object.assign({}, xe.props), { clsPrefix: { type: String, required: true }, bordered: { type: Boolean, default: void 0 }, active: Boolean, pattern: { type: String, default: "" }, placeholder: String, selectedOption: { type: Object, default: null }, selectedOptions: { type: Array, default: null }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: { type: String, default: "medium" }, loading: Boolean, autofocus: Boolean, showArrow: { type: Boolean, default: true }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], ellipsisTagPopoverProps: Object, onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: true }, onResize: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n } = Oe(e), o = wt("InternalSelection", n, t), r = D(null), i = D(null), a = D(null), l = D(null), s = D(null), d = D(null), f = D(null), v = D(null), m = D(null), g = D(null), u = D(false), h = D(false), p = D(false), b = xe("InternalSelection", "-internal-selection", Ud, Pi, e, oe(e, "clsPrefix")), y = $(() => e.clearable && !e.disabled && (p.value || e.active)), P = $(() => e.selectedOption ? e.renderTag ? e.renderTag({ option: e.selectedOption, handleClose: () => {
  } }) : e.renderLabel ? e.renderLabel(e.selectedOption, true) : bt(e.selectedOption[e.labelField], e.selectedOption, true) : e.placeholder), x = $(() => {
    const U = e.selectedOption;
    if (U) return U[e.labelField];
  }), C = $(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
  function O() {
    var U;
    const { value: Y } = r;
    if (Y) {
      const { value: ke } = i;
      ke && (ke.style.width = `${Y.offsetWidth}px`, e.maxTagCount !== "responsive" && ((U = m.value) === null || U === void 0 || U.sync({ showAllItemsBeforeCalculate: false })));
    }
  }
  function T() {
    const { value: U } = g;
    U && (U.style.display = "none");
  }
  function W() {
    const { value: U } = g;
    U && (U.style.display = "inline-block");
  }
  Ee(oe(e, "active"), (U) => {
    U || T();
  }), Ee(oe(e, "pattern"), () => {
    e.multiple && _t(O);
  });
  function N(U) {
    const { onFocus: Y } = e;
    Y && Y(U);
  }
  function K(U) {
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
  function w(U) {
    const { onPatternInput: Y } = e;
    Y && Y(U);
  }
  function k(U) {
    var Y;
    (!U.relatedTarget || !(!((Y = a.value) === null || Y === void 0) && Y.contains(U.relatedTarget))) && N(U);
  }
  function R(U) {
    var Y;
    !((Y = a.value) === null || Y === void 0) && Y.contains(U.relatedTarget) || K(U);
  }
  function B(U) {
    I(U);
  }
  function F() {
    p.value = true;
  }
  function L() {
    p.value = false;
  }
  function V(U) {
    !e.active || !e.filterable || U.target !== i.value && U.preventDefault();
  }
  function Z(U) {
    q(U);
  }
  const _ = D(false);
  function j(U) {
    if (U.key === "Backspace" && !_.value && !e.pattern.length) {
      const { selectedOptions: Y } = e;
      (Y == null ? void 0 : Y.length) && Z(Y[Y.length - 1]);
    }
  }
  let ee = null;
  function z(U) {
    const { value: Y } = r;
    if (Y) {
      const ke = U.target.value;
      Y.textContent = ke, O();
    }
    e.ignoreComposition && _.value ? ee = U : w(U);
  }
  function E() {
    _.value = true;
  }
  function ue() {
    _.value = false, e.ignoreComposition && w(ee), ee = null;
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
    if (e.filterable) h.value = false, (U = d.value) === null || U === void 0 || U.blur(), (Y = i.value) === null || Y === void 0 || Y.blur();
    else if (e.multiple) {
      const { value: ke } = l;
      ke == null ? void 0 : ke.blur();
    } else {
      const { value: ke } = s;
      ke == null ? void 0 : ke.blur();
    }
  }
  function H() {
    var U, Y, ke;
    e.filterable ? (h.value = false, (U = d.value) === null || U === void 0 || U.focus()) : e.multiple ? (Y = l.value) === null || Y === void 0 || Y.focus() : (ke = s.value) === null || ke === void 0 || ke.focus();
  }
  function de() {
    const { value: U } = i;
    U && (W(), U.focus());
  }
  function Se() {
    const { value: U } = i;
    U && U.blur();
  }
  function we(U) {
    const { value: Y } = f;
    Y && Y.setTextContent(`+${U}`);
  }
  function $e() {
    const { value: U } = v;
    return U;
  }
  function De() {
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
  function Me() {
    ce();
  }
  function Pe(U) {
    U || (ce(), u.value = false);
  }
  Ee(C, (U) => {
    U || (u.value = false);
  }), Rt(() => {
    Mt(() => {
      const U = d.value;
      U && (e.disabled ? U.removeAttribute("tabindex") : U.tabIndex = h.value ? -1 : 0);
    });
  }), hi(a, e.onResize);
  const { inlineThemeDisabled: je } = e, qe = $(() => {
    const { size: U } = e, { common: { cubicBezierEaseInOut: Y }, self: { fontWeight: ke, borderRadius: at, color: He, placeholderColor: Ie, textColor: Ye, paddingSingle: Te, paddingMultiple: nt, caretColor: ot, colorDisabled: et, textColorDisabled: re, placeholderColorDisabled: he, colorActive: S, boxShadowFocus: A, boxShadowActive: te, boxShadowHover: fe, border: J, borderFocus: ie, borderHover: ae, borderActive: ve, arrowColor: Fe, arrowColorDisabled: ht, loadingColor: st, colorActiveWarning: vt, boxShadowFocusWarning: pt, boxShadowActiveWarning: Ot, boxShadowHoverWarning: It, borderWarning: gt, borderFocusWarning: Pt, borderHoverWarning: Bt, borderActiveWarning: dt, colorActiveError: Et, boxShadowFocusError: Yt, boxShadowActiveError: Ve, boxShadowHoverError: Je, borderError: zn, borderFocusError: Fn, borderHoverError: $n, borderActiveError: Mn, clearColor: Tn, clearColorHover: On, clearColorPressed: In, clearSize: Bn, arrowSize: _n, [pe("height", U)]: An, [pe("fontSize", U)]: En } } = b.value, Lt = Wt(Te), Nt = Wt(nt);
    return { "--n-bezier": Y, "--n-border": J, "--n-border-active": ve, "--n-border-focus": ie, "--n-border-hover": ae, "--n-border-radius": at, "--n-box-shadow-active": te, "--n-box-shadow-focus": A, "--n-box-shadow-hover": fe, "--n-caret-color": ot, "--n-color": He, "--n-color-active": S, "--n-color-disabled": et, "--n-font-size": En, "--n-height": An, "--n-padding-single-top": Lt.top, "--n-padding-multiple-top": Nt.top, "--n-padding-single-right": Lt.right, "--n-padding-multiple-right": Nt.right, "--n-padding-single-left": Lt.left, "--n-padding-multiple-left": Nt.left, "--n-padding-single-bottom": Lt.bottom, "--n-padding-multiple-bottom": Nt.bottom, "--n-placeholder-color": Ie, "--n-placeholder-color-disabled": he, "--n-text-color": Ye, "--n-text-color-disabled": re, "--n-arrow-color": Fe, "--n-arrow-color-disabled": ht, "--n-loading-color": st, "--n-color-active-warning": vt, "--n-box-shadow-focus-warning": pt, "--n-box-shadow-active-warning": Ot, "--n-box-shadow-hover-warning": It, "--n-border-warning": gt, "--n-border-focus-warning": Pt, "--n-border-hover-warning": Bt, "--n-border-active-warning": dt, "--n-color-active-error": Et, "--n-box-shadow-focus-error": Yt, "--n-box-shadow-active-error": Ve, "--n-box-shadow-hover-error": Je, "--n-border-error": zn, "--n-border-focus-error": Fn, "--n-border-hover-error": $n, "--n-border-active-error": Mn, "--n-clear-size": Bn, "--n-clear-color": Tn, "--n-clear-color-hover": On, "--n-clear-color-pressed": In, "--n-arrow-size": _n, "--n-font-weight": ke };
  }), _e = je ? Qe("internal-selection", $(() => e.size[0]), qe, e) : void 0;
  return { mergedTheme: b, mergedClearable: y, mergedClsPrefix: t, rtlEnabled: o, patternInputFocused: h, filterablePlaceholder: P, label: x, selected: C, showTagsPanel: u, isComposing: _, counterRef: f, counterWrapperRef: v, patternInputMirrorRef: r, patternInputRef: i, selfRef: a, multipleElRef: l, singleElRef: s, patternInputWrapperRef: d, overflowRef: m, inputTagElRef: g, handleMouseDown: V, handleFocusin: k, handleClear: B, handleMouseEnter: F, handleMouseLeave: L, handleDeleteOption: Z, handlePatternKeyDown: j, handlePatternInputInput: z, handlePatternInputBlur: ge, handlePatternInputFocus: me, handleMouseEnterCounter: be, handleMouseLeaveCounter: Me, handleFocusout: R, handleCompositionEnd: ue, handleCompositionStart: E, onPopoverUpdateShow: Pe, focus: H, focusInput: de, blur: se, blurInput: Se, updateCounter: we, getCounter: $e, getTail: De, renderLabel: e.renderLabel, cssVars: je ? void 0 : qe, themeClass: _e == null ? void 0 : _e.themeClass, onRender: _e == null ? void 0 : _e.onRender };
}, render() {
  const { status: e, multiple: t, size: n, disabled: o, filterable: r, maxTagCount: i, bordered: a, clsPrefix: l, ellipsisTagPopoverProps: s, onRender: d, renderTag: f, renderLabel: v } = this;
  d == null ? void 0 : d();
  const m = i === "responsive", g = typeof i == "number", u = m || g, h = c(Nl, null, { default: () => c(ql, { clsPrefix: l, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, { default: () => {
    var b, y;
    return (y = (b = this.$slots).arrow) === null || y === void 0 ? void 0 : y.call(b);
  } }) });
  let p;
  if (t) {
    const { labelField: b } = this, y = (w) => c("div", { class: `${l}-base-selection-tag-wrapper`, key: w.value }, f ? f({ option: w, handleClose: () => {
      this.handleDeleteOption(w);
    } }) : c(Xn, { size: n, closable: !w.disabled, disabled: o, onClose: () => {
      this.handleDeleteOption(w);
    }, internalCloseIsButtonTag: false, internalCloseFocusable: false }, { default: () => v ? v(w, true) : bt(w[b], w, true) })), P = () => (g ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(y), x = r ? c("div", { class: `${l}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" }, c("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: o, value: this.pattern, autofocus: this.autofocus, class: `${l}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), c("span", { ref: "patternInputMirrorRef", class: `${l}-base-selection-input-tag__mirror` }, this.pattern)) : null, C = m ? () => c("div", { class: `${l}-base-selection-tag-wrapper`, ref: "counterWrapperRef" }, c(Xn, { size: n, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: o })) : void 0;
    let O;
    if (g) {
      const w = this.selectedOptions.length - i;
      w > 0 && (O = c("div", { class: `${l}-base-selection-tag-wrapper`, key: "__counter__" }, c(Xn, { size: n, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: o }, { default: () => `+${w}` })));
    }
    const T = m ? r ? c(ir, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: P, counter: C, tail: () => x }) : c(ir, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: P, counter: C }) : g && O ? P().concat(O) : P(), W = u ? () => c("div", { class: `${l}-base-selection-popover` }, m ? P() : this.selectedOptions.map(y)) : void 0, N = u ? Object.assign({ show: this.showTagsPanel, trigger: "hover", overlap: true, placement: "top", width: "trigger", onUpdateShow: this.onPopoverUpdateShow, theme: this.mergedTheme.peers.Popover, themeOverrides: this.mergedTheme.peerOverrides.Popover }, s) : null, q = (this.selected ? false : this.active ? !this.pattern && !this.isComposing : true) ? c("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay` }, c("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)) : null, I = r ? c("div", { ref: "patternInputWrapperRef", class: `${l}-base-selection-tags` }, T, m ? null : x, h) : c("div", { ref: "multipleElRef", class: `${l}-base-selection-tags`, tabindex: o ? void 0 : 0 }, T, h);
    p = c(ut, null, u ? c(ln, Object.assign({}, N, { scrollable: true, style: "max-height: calc(var(--v-target-height) * 6.6);" }), { trigger: () => I, default: W }) : I, q);
  } else if (r) {
    const b = this.pattern || this.isComposing, y = this.active ? !b : !this.selected, P = this.active ? false : this.selected;
    p = c("div", { ref: "patternInputWrapperRef", class: `${l}-base-selection-label`, title: this.patternInputFocused ? void 0 : lr(this.label) }, c("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${l}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: o, disabled: o, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), P ? c("div", { class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`, key: "input" }, c("div", { class: `${l}-base-selection-overlay__wrapper` }, f ? f({ option: this.selectedOption, handleClose: () => {
    } }) : v ? v(this.selectedOption, true) : bt(this.label, this.selectedOption, true))) : null, y ? c("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" }, c("div", { class: `${l}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)) : null, h);
  } else p = c("div", { ref: "singleElRef", class: `${l}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 }, this.label !== void 0 ? c("div", { class: `${l}-base-selection-input`, title: lr(this.label), key: "input" }, c("div", { class: `${l}-base-selection-input__content` }, f ? f({ option: this.selectedOption, handleClose: () => {
  } }) : v ? v(this.selectedOption, true) : bt(this.label, this.selectedOption, true))) : c("div", { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" }, c("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)), h);
  return c("div", { ref: "selfRef", class: [`${l}-base-selection`, this.rtlEnabled && `${l}-base-selection--rtl`, this.themeClass, e && `${l}-base-selection--${e}-status`, { [`${l}-base-selection--active`]: this.active, [`${l}-base-selection--selected`]: this.selected || this.active && this.pattern, [`${l}-base-selection--disabled`]: this.disabled, [`${l}-base-selection--multiple`]: this.multiple, [`${l}-base-selection--focus`]: this.focused }], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown }, p, a ? c("div", { class: `${l}-base-selection__border` }) : null, a ? c("div", { class: `${l}-base-selection__state-border` }) : null);
} });
function mn(e) {
  return e.type === "group";
}
function zi(e) {
  return e.type === "ignored";
}
function Zn(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return false;
  }
}
function Fi(e, t) {
  return { getIsGroup: mn, getIgnored: zi, getKey(o) {
    return mn(o) ? o.name || o.key || "key-required" : o[e];
  }, getChildren(o) {
    return o[t];
  } };
}
function Vd(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const a = [];
    for (const l of i) if (mn(l)) {
      const s = r(l[o]);
      s.length && a.push(Object.assign({}, l, { [o]: s }));
    } else {
      if (zi(l)) continue;
      t(n, l) && a.push(l);
    }
    return a;
  }
  return r(e);
}
function Gd(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    mn(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
const qd = { sizeSmall: "14px", sizeMedium: "16px", sizeLarge: "18px", labelPadding: "0 8px", labelFontWeight: "400" };
function Xd(e) {
  const { baseColor: t, inputColorDisabled: n, cardColor: o, modalColor: r, popoverColor: i, textColorDisabled: a, borderColor: l, primaryColor: s, textColor2: d, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: m, borderRadiusSmall: g, lineHeight: u } = e;
  return Object.assign(Object.assign({}, qd), { labelLineHeight: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: m, borderRadius: g, color: t, colorChecked: s, colorDisabled: n, colorDisabledChecked: n, colorTableHeader: o, colorTableHeaderModal: r, colorTableHeaderPopover: i, checkMarkColor: t, checkMarkColorDisabled: a, checkMarkColorDisabledChecked: a, border: `1px solid ${l}`, borderDisabled: `1px solid ${l}`, borderDisabledChecked: `1px solid ${l}`, borderChecked: `1px solid ${s}`, borderFocus: `1px solid ${s}`, boxShadowFocus: `0 0 0 2px ${ye(s, { alpha: 0.3 })}`, textColor: d, textColorDisabled: a });
}
const $i = { name: "Checkbox", common: Ze, self: Xd }, Mi = Xe("n-checkbox-group"), Zd = { min: Number, max: Number, size: String, value: Array, defaultValue: { type: Array, default: null }, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onChange: [Function, Array] }, Yd = le({ name: "CheckboxGroup", props: Zd, setup(e) {
  const { mergedClsPrefixRef: t } = Oe(e), n = rn(e), { mergedSizeRef: o, mergedDisabledRef: r } = n, i = D(e.defaultValue), a = $(() => e.value), l = tt(a, i), s = $(() => {
    var v;
    return ((v = l.value) === null || v === void 0 ? void 0 : v.length) || 0;
  }), d = $(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
  function f(v, m) {
    const { nTriggerFormInput: g, nTriggerFormChange: u } = n, { onChange: h, "onUpdate:value": p, onUpdateValue: b } = e;
    if (Array.isArray(l.value)) {
      const y = Array.from(l.value), P = y.findIndex((x) => x === m);
      v ? ~P || (y.push(m), b && ne(b, y, { actionType: "check", value: m }), p && ne(p, y, { actionType: "check", value: m }), g(), u(), i.value = y, h && ne(h, y)) : ~P && (y.splice(P, 1), b && ne(b, y, { actionType: "uncheck", value: m }), p && ne(p, y, { actionType: "uncheck", value: m }), h && ne(h, y), i.value = y, g(), u());
    } else v ? (b && ne(b, [m], { actionType: "check", value: m }), p && ne(p, [m], { actionType: "check", value: m }), h && ne(h, [m]), i.value = [m], g(), u()) : (b && ne(b, [], { actionType: "uncheck", value: m }), p && ne(p, [], { actionType: "uncheck", value: m }), h && ne(h, []), i.value = [], g(), u());
  }
  return Le(Mi, { checkedCountRef: s, maxRef: oe(e, "max"), minRef: oe(e, "min"), valueSetRef: d, disabledRef: r, mergedSizeRef: o, toggleCheckbox: f }), { mergedClsPrefix: t };
}, render() {
  return c("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
} }), Jd = () => c("svg", { viewBox: "0 0 64 64", class: "check-icon" }, c("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })), Qd = () => c("svg", { viewBox: "0 0 100 100", class: "line-icon" }, c("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })), ec = X([M("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [G("show-label", "line-height: var(--n-label-line-height);"), X("&:hover", [M("checkbox-box", [Q("border", "border: var(--n-border-checked);")])]), X("&:focus:not(:active)", [M("checkbox-box", [Q("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), G("inside-table", [M("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), G("checked", [M("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [M("checkbox-icon", [X(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), G("indeterminate", [M("checkbox-box", [M("checkbox-icon", [X(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), X(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), G("checked, indeterminate", [X("&:focus:not(:active)", [M("checkbox-box", [Q("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), M("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [Q("border", { border: "var(--n-border-checked)" })])]), G("disabled", { cursor: "not-allowed" }, [G("checked", [M("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [Q("border", { border: "var(--n-border-disabled-checked)" }), M("checkbox-icon", [X(".check-icon, .line-icon", { fill: "var(--n-check-mark-color-disabled-checked)" })])])]), M("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [Q("border", `
 border: var(--n-border-disabled);
 `), M("checkbox-icon", [X(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), Q("label", `
 color: var(--n-text-color-disabled);
 `)]), M("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), M("checkbox-box", `
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
 `), M("checkbox-icon", `
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
 `), jt({ left: "1px", top: "1px" })])]), Q("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [X("&:empty", { display: "none" })])]), qr(M("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)), Xr(M("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))]), tc = Object.assign(Object.assign({}, xe.props), { size: String, checked: { type: [Boolean, String, Number], default: void 0 }, defaultChecked: { type: [Boolean, String, Number], default: false }, value: [String, Number], disabled: { type: Boolean, default: void 0 }, indeterminate: Boolean, label: String, focusable: { type: Boolean, default: true }, checkedValue: { type: [Boolean, String, Number], default: true }, uncheckedValue: { type: [Boolean, String, Number], default: false }, "onUpdate:checked": [Function, Array], onUpdateChecked: [Function, Array], privateInsideTable: Boolean, onChange: [Function, Array] }), Eo = le({ name: "Checkbox", props: tc, setup(e) {
  const t = Ce(Mi, null), n = D(null), { mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Oe(e), l = D(e.defaultChecked), s = oe(e, "checked"), d = tt(s, l), f = ze(() => {
    if (t) {
      const T = t.valueSetRef.value;
      return T && e.value !== void 0 ? T.has(e.value) : false;
    } else return d.value === e.checkedValue;
  }), v = rn(e, { mergedSize(T) {
    var W, N;
    const { size: K } = e;
    if (K !== void 0) return K;
    if (t) {
      const { value: I } = t.mergedSizeRef;
      if (I !== void 0) return I;
    }
    if (T) {
      const { mergedSize: I } = T;
      if (I !== void 0) return I.value;
    }
    const q = (N = (W = a == null ? void 0 : a.value) === null || W === void 0 ? void 0 : W.Checkbox) === null || N === void 0 ? void 0 : N.size;
    return q || "medium";
  }, mergedDisabled(T) {
    const { disabled: W } = e;
    if (W !== void 0) return W;
    if (t) {
      if (t.disabledRef.value) return true;
      const { maxRef: { value: N }, checkedCountRef: K } = t;
      if (N !== void 0 && K.value >= N && !f.value) return true;
      const { minRef: { value: q } } = t;
      if (q !== void 0 && K.value <= q && f.value) return true;
    }
    return T ? T.disabled.value : false;
  } }), { mergedDisabledRef: m, mergedSizeRef: g } = v, u = xe("Checkbox", "-checkbox", ec, $i, e, o);
  function h(T) {
    if (t && e.value !== void 0) t.toggleCheckbox(!f.value, e.value);
    else {
      const { onChange: W, "onUpdate:checked": N, onUpdateChecked: K } = e, { nTriggerFormInput: q, nTriggerFormChange: I } = v, w = f.value ? e.uncheckedValue : e.checkedValue;
      N && ne(N, w, T), K && ne(K, w, T), W && ne(W, w, T), q(), I(), l.value = w;
    }
  }
  function p(T) {
    m.value || h(T);
  }
  function b(T) {
    if (!m.value) switch (T.key) {
      case " ":
      case "Enter":
        h(T);
    }
  }
  function y(T) {
    switch (T.key) {
      case " ":
        T.preventDefault();
    }
  }
  const P = { focus: () => {
    var T;
    (T = n.value) === null || T === void 0 || T.focus();
  }, blur: () => {
    var T;
    (T = n.value) === null || T === void 0 || T.blur();
  } }, x = wt("Checkbox", i, o), C = $(() => {
    const { value: T } = g, { common: { cubicBezierEaseInOut: W }, self: { borderRadius: N, color: K, colorChecked: q, colorDisabled: I, colorTableHeader: w, colorTableHeaderModal: k, colorTableHeaderPopover: R, checkMarkColor: B, checkMarkColorDisabled: F, border: L, borderFocus: V, borderDisabled: Z, borderChecked: _, boxShadowFocus: j, textColor: ee, textColorDisabled: z, checkMarkColorDisabledChecked: E, colorDisabledChecked: ue, borderDisabledChecked: me, labelPadding: ge, labelLineHeight: se, labelFontWeight: H, [pe("fontSize", T)]: de, [pe("size", T)]: Se } } = u.value;
    return { "--n-label-line-height": se, "--n-label-font-weight": H, "--n-size": Se, "--n-bezier": W, "--n-border-radius": N, "--n-border": L, "--n-border-checked": _, "--n-border-focus": V, "--n-border-disabled": Z, "--n-border-disabled-checked": me, "--n-box-shadow-focus": j, "--n-color": K, "--n-color-checked": q, "--n-color-table": w, "--n-color-table-modal": k, "--n-color-table-popover": R, "--n-color-disabled": I, "--n-color-disabled-checked": ue, "--n-text-color": ee, "--n-text-color-disabled": z, "--n-check-mark-color": B, "--n-check-mark-color-disabled": F, "--n-check-mark-color-disabled-checked": E, "--n-font-size": de, "--n-label-padding": ge };
  }), O = r ? Qe("checkbox", $(() => g.value[0]), C, e) : void 0;
  return Object.assign(v, P, { rtlEnabled: x, selfRef: n, mergedClsPrefix: o, mergedDisabled: m, renderedChecked: f, mergedTheme: u, labelId: bo(), handleClick: p, handleKeyUp: b, handleKeyDown: y, cssVars: r ? void 0 : C, themeClass: O == null ? void 0 : O.themeClass, onRender: O == null ? void 0 : O.onRender });
}, render() {
  var e;
  const { $slots: t, renderedChecked: n, mergedDisabled: o, indeterminate: r, privateInsideTable: i, cssVars: a, labelId: l, label: s, mergedClsPrefix: d, focusable: f, handleKeyUp: v, handleKeyDown: m, handleClick: g } = this;
  (e = this.onRender) === null || e === void 0 || e.call(this);
  const u = kt(t.default, (h) => s || h ? c("span", { class: `${d}-checkbox__label`, id: l }, s || h) : null);
  return c("div", { ref: "selfRef", class: [`${d}-checkbox`, this.themeClass, this.rtlEnabled && `${d}-checkbox--rtl`, n && `${d}-checkbox--checked`, o && `${d}-checkbox--disabled`, r && `${d}-checkbox--indeterminate`, i && `${d}-checkbox--inside-table`, u && `${d}-checkbox--show-label`], tabindex: o || !f ? void 0 : 0, role: "checkbox", "aria-checked": r ? "mixed" : n, "aria-labelledby": l, style: a, onKeyup: v, onKeydown: m, onClick: g, onMousedown: () => {
    We("selectstart", window, (h) => {
      h.preventDefault();
    }, { once: true });
  } }, c("div", { class: `${d}-checkbox-box-wrapper` }, "\xA0", c("div", { class: `${d}-checkbox-box` }, c(Zr, null, { default: () => this.indeterminate ? c("div", { key: "indeterminate", class: `${d}-checkbox-icon` }, Qd()) : c("div", { key: "check", class: `${d}-checkbox-icon` }, Jd()) }), c("div", { class: `${d}-checkbox-box__border` }))), u);
} });
function nc(e) {
  const { boxShadow2: t } = e;
  return { menuBoxShadow: t };
}
const Lo = xt({ name: "Popselect", common: Ze, peers: { Popover: Zt, InternalSelectMenu: Ao }, self: nc }), Ti = Xe("n-popselect"), oc = M("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), No = { multiple: Boolean, value: { type: [String, Number, Array], default: null }, cancelable: Boolean, options: { type: Array, default: () => [] }, size: String, scrollable: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onMouseenter: Function, onMouseleave: Function, renderLabel: Function, showCheckmark: { type: Boolean, default: void 0 }, nodeProps: Function, virtualScroll: Boolean, onChange: [Function, Array] }, Mr = Dl(No), rc = le({ name: "PopselectPanel", props: No, setup(e) {
  const t = Ce(Ti), { mergedClsPrefixRef: n, inlineThemeDisabled: o, mergedComponentPropsRef: r } = Oe(e), i = $(() => {
    var u, h;
    return e.size || ((h = (u = r == null ? void 0 : r.value) === null || u === void 0 ? void 0 : u.Popselect) === null || h === void 0 ? void 0 : h.size) || "medium";
  }), a = xe("Popselect", "-pop-select", oc, Lo, t.props, n), l = $(() => kn(e.options, Fi("value", "children")));
  function s(u, h) {
    const { onUpdateValue: p, "onUpdate:value": b, onChange: y } = e;
    p && ne(p, u, h), b && ne(b, u, h), y && ne(y, u, h);
  }
  function d(u) {
    v(u.key);
  }
  function f(u) {
    !lt(u, "action") && !lt(u, "empty") && !lt(u, "header") && u.preventDefault();
  }
  function v(u) {
    const { value: { getNode: h } } = l;
    if (e.multiple) if (Array.isArray(e.value)) {
      const p = [], b = [];
      let y = true;
      e.value.forEach((P) => {
        if (P === u) {
          y = false;
          return;
        }
        const x = h(P);
        x && (p.push(x.key), b.push(x.rawNode));
      }), y && (p.push(u), b.push(h(u).rawNode)), s(p, b);
    } else {
      const p = h(u);
      p && s([u], [p.rawNode]);
    }
    else if (e.value === u && e.cancelable) s(null, null);
    else {
      const p = h(u);
      p && s(u, p.rawNode);
      const { "onUpdate:show": b, onUpdateShow: y } = t.props;
      b && ne(b, false), y && ne(y, false), t.setShow(false);
    }
    _t(() => {
      t.syncPosition();
    });
  }
  Ee(oe(e, "options"), () => {
    _t(() => {
      t.syncPosition();
    });
  });
  const m = $(() => {
    const { self: { menuBoxShadow: u } } = a.value;
    return { "--n-menu-box-shadow": u };
  }), g = o ? Qe("select", void 0, m, t.props) : void 0;
  return { mergedTheme: t.mergedThemeRef, mergedClsPrefix: n, treeMate: l, handleToggle: d, handleMenuMousedown: f, cssVars: o ? void 0 : m, themeClass: g == null ? void 0 : g.themeClass, onRender: g == null ? void 0 : g.onRender, mergedSize: i, scrollbarProps: t.props.scrollbarProps };
}, render() {
  var e;
  return (e = this.onRender) === null || e === void 0 || e.call(this), c(Si, { clsPrefix: this.mergedClsPrefix, focusable: true, nodeProps: this.nodeProps, class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass], style: this.cssVars, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, multiple: this.multiple, treeMate: this.treeMate, size: this.mergedSize, value: this.value, virtualScroll: this.virtualScroll, scrollable: this.scrollable, scrollbarProps: this.scrollbarProps, renderLabel: this.renderLabel, onToggle: this.handleToggle, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseenter, onMousedown: this.handleMenuMousedown, showCheckmark: this.showCheckmark }, { header: () => {
    var t, n;
    return ((n = (t = this.$slots).header) === null || n === void 0 ? void 0 : n.call(t)) || [];
  }, action: () => {
    var t, n;
    return ((n = (t = this.$slots).action) === null || n === void 0 ? void 0 : n.call(t)) || [];
  }, empty: () => {
    var t, n;
    return ((n = (t = this.$slots).empty) === null || n === void 0 ? void 0 : n.call(t)) || [];
  } });
} }), ic = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, xe.props), Yr(qt, ["showArrow", "arrow"])), { placement: Object.assign(Object.assign({}, qt.placement), { default: "bottom" }), trigger: { type: String, default: "hover" } }), No), { scrollbarProps: Object }), lc = le({ name: "Popselect", props: ic, slots: Object, inheritAttrs: false, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Oe(e), n = xe("Popselect", "-popselect", void 0, Lo, e, t), o = D(null);
  function r() {
    var l;
    (l = o.value) === null || l === void 0 || l.syncPosition();
  }
  function i(l) {
    var s;
    (s = o.value) === null || s === void 0 || s.setShow(l);
  }
  return Le(Ti, { props: e, mergedThemeRef: n, syncPosition: r, setShow: i }), Object.assign(Object.assign({}, { syncPosition: r, setShow: i }), { popoverInstRef: o, mergedTheme: n });
}, render() {
  const { mergedTheme: e } = this, t = { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: { padding: "0" }, ref: "popoverInstRef", internalRenderBody: (n, o, r, i, a) => {
    const { $attrs: l } = this;
    return c(rc, Object.assign({}, l, { class: [l.class, n], style: [l.style, ...r] }, Co(this.$props, Mr), { ref: pi(o), onMouseenter: en([i, l.onMouseenter]), onMouseleave: en([a, l.onMouseleave]) }), { header: () => {
      var s, d;
      return (d = (s = this.$slots).header) === null || d === void 0 ? void 0 : d.call(s);
    }, action: () => {
      var s, d;
      return (d = (s = this.$slots).action) === null || d === void 0 ? void 0 : d.call(s);
    }, empty: () => {
      var s, d;
      return (d = (s = this.$slots).empty) === null || d === void 0 ? void 0 : d.call(s);
    } });
  } };
  return c(ln, Object.assign({}, Yr(this.$props, Mr), t, { internalDeactivateImmediately: true }), { trigger: () => {
    var n, o;
    return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
  } });
} });
function ac(e) {
  const { boxShadow2: t } = e;
  return { menuBoxShadow: t };
}
const Oi = xt({ name: "Select", common: Ze, peers: { InternalSelection: Pi, InternalSelectMenu: Ao }, self: ac }), sc = X([M("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), M("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [Rn({ originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)" })])]), dc = Object.assign(Object.assign({}, xe.props), { to: mt.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, clearCreatedOptionsOnClear: { type: Boolean, default: true }, clearFilterAfterSelect: { type: Boolean, default: true }, options: { type: Array, default: () => [] }, defaultValue: { type: [String, Number, Array], default: null }, keyboard: { type: Boolean, default: true }, value: [String, Number, Array], placeholder: String, menuProps: Object, multiple: Boolean, size: String, menuSize: { type: String }, filterable: Boolean, disabled: { type: Boolean, default: void 0 }, remote: Boolean, loading: Boolean, filter: Function, placement: { type: String, default: "bottom-start" }, widthMode: { type: String, default: "trigger" }, tag: Boolean, onCreate: Function, fallbackOption: { type: [Function, Boolean], default: void 0 }, show: { type: Boolean, default: void 0 }, showArrow: { type: Boolean, default: true }, maxTagCount: [Number, String], ellipsisTagPopoverProps: Object, consistentMenuWidth: { type: Boolean, default: true }, virtualScroll: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, childrenField: { type: String, default: "children" }, renderLabel: Function, renderOption: Function, renderTag: Function, "onUpdate:value": [Function, Array], inputProps: Object, nodeProps: Function, ignoreComposition: { type: Boolean, default: true }, showOnFocus: Boolean, onUpdateValue: [Function, Array], onBlur: [Function, Array], onClear: [Function, Array], onFocus: [Function, Array], onScroll: [Function, Array], onSearch: [Function, Array], onUpdateShow: [Function, Array], "onUpdate:show": [Function, Array], displayDirective: { type: String, default: "show" }, resetMenuOnOptionsChange: { type: Boolean, default: true }, status: String, showCheckmark: { type: Boolean, default: true }, scrollbarProps: Object, onChange: [Function, Array], items: Array }), cc = le({ name: "Select", props: dc, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, mergedBorderedRef: n, namespaceRef: o, inlineThemeDisabled: r, mergedComponentPropsRef: i } = Oe(e), a = xe("Select", "-select", sc, Oi, e, t), l = D(e.defaultValue), s = oe(e, "value"), d = tt(s, l), f = D(false), v = D(""), m = ei(e, ["items", "options"]), g = D([]), u = D([]), h = $(() => u.value.concat(g.value).concat(m.value)), p = $(() => {
    const { filter: S } = e;
    if (S) return S;
    const { labelField: A, valueField: te } = e;
    return (fe, J) => {
      if (!J) return false;
      const ie = J[A];
      if (typeof ie == "string") return Zn(fe, ie);
      const ae = J[te];
      return typeof ae == "string" ? Zn(fe, ae) : typeof ae == "number" ? Zn(fe, String(ae)) : false;
    };
  }), b = $(() => {
    if (e.remote) return m.value;
    {
      const { value: S } = h, { value: A } = v;
      return !A.length || !e.filterable ? S : Vd(S, p.value, A, e.childrenField);
    }
  }), y = $(() => {
    const { valueField: S, childrenField: A } = e, te = Fi(S, A);
    return kn(b.value, te);
  }), P = $(() => Gd(h.value, e.valueField, e.childrenField)), x = D(false), C = tt(oe(e, "show"), x), O = D(null), T = D(null), W = D(null), { localeRef: N } = wn("Select"), K = $(() => {
    var S;
    return (S = e.placeholder) !== null && S !== void 0 ? S : N.value.placeholder;
  }), q = [], I = D(/* @__PURE__ */ new Map()), w = $(() => {
    const { fallbackOption: S } = e;
    if (S === void 0) {
      const { labelField: A, valueField: te } = e;
      return (fe) => ({ [A]: String(fe), [te]: fe });
    }
    return S === false ? false : (A) => Object.assign(S(A), { value: A });
  });
  function k(S) {
    const A = e.remote, { value: te } = I, { value: fe } = P, { value: J } = w, ie = [];
    return S.forEach((ae) => {
      if (fe.has(ae)) ie.push(fe.get(ae));
      else if (A && te.has(ae)) ie.push(te.get(ae));
      else if (J) {
        const ve = J(ae);
        ve && ie.push(ve);
      }
    }), ie;
  }
  const R = $(() => {
    if (e.multiple) {
      const { value: S } = d;
      return Array.isArray(S) ? k(S) : [];
    }
    return null;
  }), B = $(() => {
    const { value: S } = d;
    return !e.multiple && !Array.isArray(S) ? S === null ? null : k([S])[0] || null : null;
  }), F = rn(e, { mergedSize: (S) => {
    var A, te;
    const { size: fe } = e;
    if (fe) return fe;
    const { mergedSize: J } = S || {};
    if (J == null ? void 0 : J.value) return J.value;
    const ie = (te = (A = i == null ? void 0 : i.value) === null || A === void 0 ? void 0 : A.Select) === null || te === void 0 ? void 0 : te.size;
    return ie || "medium";
  } }), { mergedSizeRef: L, mergedDisabledRef: V, mergedStatusRef: Z } = F;
  function _(S, A) {
    const { onChange: te, "onUpdate:value": fe, onUpdateValue: J } = e, { nTriggerFormChange: ie, nTriggerFormInput: ae } = F;
    te && ne(te, S, A), J && ne(J, S, A), fe && ne(fe, S, A), l.value = S, ie(), ae();
  }
  function j(S) {
    const { onBlur: A } = e, { nTriggerFormBlur: te } = F;
    A && ne(A, S), te();
  }
  function ee() {
    const { onClear: S } = e;
    S && ne(S);
  }
  function z(S) {
    const { onFocus: A, showOnFocus: te } = e, { nTriggerFormFocus: fe } = F;
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
        const J = B.value;
        J && fe.set(J[e.valueField], J);
      }
    }
  }
  function ge(S) {
    const { onUpdateShow: A, "onUpdate:show": te } = e;
    A && ne(A, S), te && ne(te, S), x.value = S;
  }
  function se() {
    V.value || (ge(true), x.value = true, e.filterable && nt());
  }
  function H() {
    ge(false);
  }
  function de() {
    v.value = "", u.value = q;
  }
  const Se = D(false);
  function we() {
    e.filterable && (Se.value = true);
  }
  function $e() {
    e.filterable && (Se.value = false, C.value || de());
  }
  function De() {
    V.value || (C.value ? e.filterable ? nt() : H() : se());
  }
  function Ke(S) {
    var A, te;
    !((te = (A = W.value) === null || A === void 0 ? void 0 : A.selfRef) === null || te === void 0) && te.contains(S.relatedTarget) || (f.value = false, j(S), H());
  }
  function ce(S) {
    z(S), f.value = true;
  }
  function be() {
    f.value = true;
  }
  function Me(S) {
    var A;
    !((A = O.value) === null || A === void 0) && A.$el.contains(S.relatedTarget) || (f.value = false, j(S), H());
  }
  function Pe() {
    var S;
    (S = O.value) === null || S === void 0 || S.focus(), H();
  }
  function je(S) {
    var A;
    C.value && (!((A = O.value) === null || A === void 0) && A.$el.contains(fn(S)) || H());
  }
  function qe(S) {
    if (!Array.isArray(S)) return [];
    if (w.value) return Array.from(S);
    {
      const { remote: A } = e, { value: te } = P;
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
    if (V.value) return;
    const { tag: A, remote: te, clearFilterAfterSelect: fe, valueField: J } = e;
    if (A && !te) {
      const { value: ie } = u, ae = ie[0] || null;
      if (ae) {
        const ve = g.value;
        ve.length ? ve.push(ae) : g.value = [ae], u.value = q;
      }
    }
    if (te && I.value.set(S[J], S), e.multiple) {
      const ie = qe(d.value), ae = ie.findIndex((ve) => ve === S[J]);
      if (~ae) {
        if (ie.splice(ae, 1), A && !te) {
          const ve = Y(S[J]);
          ~ve && (g.value.splice(ve, 1), fe && (v.value = ""));
        }
      } else ie.push(S[J]), fe && (v.value = "");
      _(ie, k(ie));
    } else {
      if (A && !te) {
        const ie = Y(S[J]);
        ~ie ? g.value = [g.value[ie]] : g.value = q;
      }
      Te(), H(), _(S[J], S);
    }
  }
  function Y(S) {
    return g.value.findIndex((te) => te[e.valueField] === S);
  }
  function ke(S) {
    C.value || se();
    const { value: A } = S.target;
    v.value = A;
    const { tag: te, remote: fe } = e;
    if (E(A), te && !fe) {
      if (!A) {
        u.value = q;
        return;
      }
      const { onCreate: J } = e, ie = J ? J(A) : { [e.labelField]: A, [e.valueField]: A }, { valueField: ae, labelField: ve } = e;
      m.value.some((Fe) => Fe[ae] === ie[ae] || Fe[ve] === ie[ve]) || g.value.some((Fe) => Fe[ae] === ie[ae] || Fe[ve] === ie[ve]) ? u.value = q : u.value = [ie];
    }
  }
  function at(S) {
    S.stopPropagation();
    const { multiple: A, tag: te, remote: fe, clearCreatedOptionsOnClear: J } = e;
    !A && e.filterable && H(), te && !fe && J && (g.value = q), ee(), A ? _([], []) : _(null, null);
  }
  function He(S) {
    !lt(S, "action") && !lt(S, "empty") && !lt(S, "header") && S.preventDefault();
  }
  function Ie(S) {
    ue(S);
  }
  function Ye(S) {
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
        if (!(!((A = O.value) === null || A === void 0) && A.isComposing)) {
          if (C.value) {
            const ae = (te = W.value) === null || te === void 0 ? void 0 : te.getPendingTmNode();
            ae ? _e(ae) : e.filterable || (H(), Te());
          } else if (se(), e.tag && Se.value) {
            const ae = u.value[0];
            if (ae) {
              const ve = ae[e.valueField], { value: Fe } = d;
              e.multiple && Array.isArray(Fe) && Fe.includes(ve) || U(ae);
            }
          }
        }
        S.preventDefault();
        break;
      case "ArrowUp":
        if (S.preventDefault(), e.loading) return;
        C.value && ((fe = W.value) === null || fe === void 0 || fe.prev());
        break;
      case "ArrowDown":
        if (S.preventDefault(), e.loading) return;
        C.value ? (J = W.value) === null || J === void 0 || J.next() : se();
        break;
      case "Escape":
        C.value && (za(S), H()), (ie = O.value) === null || ie === void 0 || ie.focus();
        break;
    }
  }
  function Te() {
    var S;
    (S = O.value) === null || S === void 0 || S.focus();
  }
  function nt() {
    var S;
    (S = O.value) === null || S === void 0 || S.focusInput();
  }
  function ot() {
    var S;
    C.value && ((S = T.value) === null || S === void 0 || S.syncPosition());
  }
  me(), Ee(oe(e, "options"), me);
  const et = { focus: () => {
    var S;
    (S = O.value) === null || S === void 0 || S.focus();
  }, focusInput: () => {
    var S;
    (S = O.value) === null || S === void 0 || S.focusInput();
  }, blur: () => {
    var S;
    (S = O.value) === null || S === void 0 || S.blur();
  }, blurInput: () => {
    var S;
    (S = O.value) === null || S === void 0 || S.blurInput();
  } }, re = $(() => {
    const { self: { menuBoxShadow: S } } = a.value;
    return { "--n-menu-box-shadow": S };
  }), he = r ? Qe("select", void 0, re, e) : void 0;
  return Object.assign(Object.assign({}, et), { mergedStatus: Z, mergedClsPrefix: t, mergedBordered: n, namespace: o, treeMate: y, isMounted: po(), triggerRef: O, menuRef: W, pattern: v, uncontrolledShow: x, mergedShow: C, adjustedTo: mt(e), uncontrolledValue: l, mergedValue: d, followerRef: T, localizedPlaceholder: K, selectedOption: B, selectedOptions: R, mergedSize: L, mergedDisabled: V, focused: f, activeWithoutMenuOpen: Se, inlineThemeDisabled: r, onTriggerInputFocus: we, onTriggerInputBlur: $e, handleTriggerOrMenuResize: ot, handleMenuFocus: be, handleMenuBlur: Me, handleMenuTabOut: Pe, handleTriggerClick: De, handleToggle: _e, handleDeleteOption: U, handlePatternInput: ke, handleClear: at, handleTriggerBlur: Ke, handleTriggerFocus: ce, handleKeydown: Ye, handleMenuAfterLeave: de, handleMenuClickOutside: je, handleMenuScroll: Ie, handleMenuKeydown: Ye, handleMenuMousedown: He, mergedTheme: a, cssVars: r ? void 0 : re, themeClass: he == null ? void 0 : he.themeClass, onRender: he == null ? void 0 : he.onRender });
}, render() {
  return c("div", { class: `${this.mergedClsPrefix}-select` }, c(zo, null, { default: () => [c(Fo, null, { default: () => c(Wd, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, ellipsisTagPopoverProps: this.ellipsisTagPopoverProps, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, { arrow: () => {
    var e, t;
    return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
  } }) }), c(Mo, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === mt.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, { default: () => c(on, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, { default: () => {
    var e, t, n;
    return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), nn(c(Si, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (t = this.menuProps) === null || t === void 0 ? void 0 : t.class], clsPrefix: this.mergedClsPrefix, focusable: true, labelField: this.labelField, valueField: this.valueField, autoPending: true, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: this.menuSize, renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(n = this.menuProps) === null || n === void 0 ? void 0 : n.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange, scrollbarProps: this.scrollbarProps }), { empty: () => {
      var o, r;
      return [(r = (o = this.$slots).empty) === null || r === void 0 ? void 0 : r.call(o)];
    }, header: () => {
      var o, r;
      return [(r = (o = this.$slots).header) === null || r === void 0 ? void 0 : r.call(o)];
    }, action: () => {
      var o, r;
      return [(r = (o = this.$slots).action) === null || r === void 0 ? void 0 : r.call(o)];
    } }), this.displayDirective === "show" ? [[Gr, this.mergedShow], [pn, this.handleMenuClickOutside, void 0, { capture: true }]] : [[pn, this.handleMenuClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), uc = { itemPaddingSmall: "0 4px", itemMarginSmall: "0 0 0 8px", itemMarginSmallRtl: "0 8px 0 0", itemPaddingMedium: "0 4px", itemMarginMedium: "0 0 0 8px", itemMarginMediumRtl: "0 8px 0 0", itemPaddingLarge: "0 4px", itemMarginLarge: "0 0 0 8px", itemMarginLargeRtl: "0 8px 0 0", buttonIconSizeSmall: "14px", buttonIconSizeMedium: "16px", buttonIconSizeLarge: "18px", inputWidthSmall: "60px", selectWidthSmall: "unset", inputMarginSmall: "0 0 0 8px", inputMarginSmallRtl: "0 8px 0 0", selectMarginSmall: "0 0 0 8px", prefixMarginSmall: "0 8px 0 0", suffixMarginSmall: "0 0 0 8px", inputWidthMedium: "60px", selectWidthMedium: "unset", inputMarginMedium: "0 0 0 8px", inputMarginMediumRtl: "0 8px 0 0", selectMarginMedium: "0 0 0 8px", prefixMarginMedium: "0 8px 0 0", suffixMarginMedium: "0 0 0 8px", inputWidthLarge: "60px", selectWidthLarge: "unset", inputMarginLarge: "0 0 0 8px", inputMarginLargeRtl: "0 8px 0 0", selectMarginLarge: "0 0 0 8px", prefixMarginLarge: "0 8px 0 0", suffixMarginLarge: "0 0 0 8px" };
function fc(e) {
  const { textColor2: t, primaryColor: n, primaryColorHover: o, primaryColorPressed: r, inputColorDisabled: i, textColorDisabled: a, borderColor: l, borderRadius: s, fontSizeTiny: d, fontSizeSmall: f, fontSizeMedium: v, heightTiny: m, heightSmall: g, heightMedium: u } = e;
  return Object.assign(Object.assign({}, uc), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${l}`, buttonBorderHover: `1px solid ${l}`, buttonBorderPressed: `1px solid ${l}`, buttonIconColor: t, buttonIconColorHover: t, buttonIconColorPressed: t, itemTextColor: t, itemTextColorHover: o, itemTextColorPressed: r, itemTextColorActive: n, itemTextColorDisabled: a, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${n}`, itemBorderDisabled: `1px solid ${l}`, itemBorderRadius: s, itemSizeSmall: m, itemSizeMedium: g, itemSizeLarge: u, itemFontSizeSmall: d, itemFontSizeMedium: f, itemFontSizeLarge: v, jumperFontSizeSmall: d, jumperFontSizeMedium: f, jumperFontSizeLarge: v, jumperTextColor: t, jumperTextColorDisabled: a });
}
const Ii = xt({ name: "Pagination", common: Ze, peers: { Select: Oi, Input: Xl, Popselect: Lo }, self: fc }), Tr = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, Or = [G("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], hc = M("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [M("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), M("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), X("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), M("select", `
 width: var(--n-select-width);
 `), X("&.transition-disabled", [M("pagination-item", "transition: none!important;")]), M("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [M("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), M("pagination-item", `
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
 `, [M("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), Ne("disabled", [G("hover", Tr, Or), X("&:hover", Tr, Or), X("&:active", `
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
 `, [M("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), G("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [M("pagination-quick-jumper", [M("input", `
 margin: 0;
 `)])])]);
function Bi(e) {
  var t;
  if (!e) return 10;
  const { defaultPageSize: n } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function vc(e, t, n, o) {
  let r = false, i = false, a = 1, l = t;
  if (t === 1) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: l, fastBackwardTo: a, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }] };
  if (t === 2) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: l, fastBackwardTo: a, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }, { type: "page", label: 2, active: e === 2, mayBeFastBackward: true, mayBeFastForward: false }] };
  const s = 1, d = t;
  let f = e, v = e;
  const m = (n - 5) / 2;
  v += Math.ceil(m), v = Math.min(Math.max(v, s + n - 3), d - 2), f -= Math.floor(m), f = Math.max(Math.min(f, d - n + 3), s + 2);
  let g = false, u = false;
  f > s + 2 && (g = true), v < d - 2 && (u = true);
  const h = [];
  h.push({ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }), g ? (r = true, a = f - 1, h.push({ type: "fast-backward", active: false, label: void 0, options: o ? Ir(s + 1, f - 1) : null })) : d >= s + 1 && h.push({ type: "page", label: s + 1, mayBeFastBackward: true, mayBeFastForward: false, active: e === s + 1 });
  for (let p = f; p <= v; ++p) h.push({ type: "page", label: p, mayBeFastBackward: false, mayBeFastForward: false, active: e === p });
  return u ? (i = true, l = v + 1, h.push({ type: "fast-forward", active: false, label: void 0, options: o ? Ir(v + 1, d - 1) : null })) : v === d - 2 && h[h.length - 1].label !== d - 1 && h.push({ type: "page", mayBeFastForward: true, mayBeFastBackward: false, label: d - 1, active: e === d - 1 }), h[h.length - 1].label !== d && h.push({ type: "page", mayBeFastForward: false, mayBeFastBackward: false, label: d, active: e === d }), { hasFastBackward: r, hasFastForward: i, fastBackwardTo: a, fastForwardTo: l, items: h };
}
function Ir(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o) n.push({ label: `${o}`, value: o });
  return n;
}
const pc = Object.assign(Object.assign({}, xe.props), { simple: Boolean, page: Number, defaultPage: { type: Number, default: 1 }, itemCount: Number, pageCount: Number, defaultPageCount: { type: Number, default: 1 }, showSizePicker: Boolean, pageSize: Number, defaultPageSize: Number, pageSizes: { type: Array, default() {
  return [10];
} }, showQuickJumper: Boolean, size: String, disabled: Boolean, pageSlot: { type: Number, default: 9 }, selectProps: Object, prev: Function, next: Function, goto: Function, prefix: Function, suffix: Function, label: Function, displayOrder: { type: Array, default: ["pages", "size-picker", "quick-jumper"] }, to: mt.propTo, showQuickJumpDropdown: { type: Boolean, default: true }, scrollbarProps: Object, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], onPageSizeChange: [Function, Array], onChange: [Function, Array] }), gc = le({ name: "Pagination", props: pc, slots: Object, setup(e) {
  const { mergedComponentPropsRef: t, mergedClsPrefixRef: n, inlineThemeDisabled: o, mergedRtlRef: r } = Oe(e), i = $(() => {
    var H, de;
    return e.size || ((de = (H = t == null ? void 0 : t.value) === null || H === void 0 ? void 0 : H.Pagination) === null || de === void 0 ? void 0 : de.size) || "medium";
  }), a = xe("Pagination", "-pagination", hc, Ii, e, n), { localeRef: l } = wn("Pagination"), s = D(null), d = D(e.defaultPage), f = D(Bi(e)), v = tt(oe(e, "page"), d), m = tt(oe(e, "pageSize"), f), g = $(() => {
    const { itemCount: H } = e;
    if (H !== void 0) return Math.max(1, Math.ceil(H / m.value));
    const { pageCount: de } = e;
    return de !== void 0 ? Math.max(de, 1) : 1;
  }), u = D("");
  Mt(() => {
    e.simple, u.value = String(v.value);
  });
  const h = D(false), p = D(false), b = D(false), y = D(false), P = () => {
    e.disabled || (h.value = true, B());
  }, x = () => {
    e.disabled || (h.value = false, B());
  }, C = () => {
    p.value = true, B();
  }, O = () => {
    p.value = false, B();
  }, T = (H) => {
    F(H);
  }, W = $(() => vc(v.value, g.value, e.pageSlot, e.showQuickJumpDropdown));
  Mt(() => {
    W.value.hasFastBackward ? W.value.hasFastForward || (h.value = false, b.value = false) : (p.value = false, y.value = false);
  });
  const N = $(() => {
    const H = l.value.selectionSuffix;
    return e.pageSizes.map((de) => typeof de == "number" ? { label: `${de} / ${H}`, value: de } : de);
  }), K = $(() => {
    var H, de;
    return ((de = (H = t == null ? void 0 : t.value) === null || H === void 0 ? void 0 : H.Pagination) === null || de === void 0 ? void 0 : de.inputSize) || ar(i.value);
  }), q = $(() => {
    var H, de;
    return ((de = (H = t == null ? void 0 : t.value) === null || H === void 0 ? void 0 : H.Pagination) === null || de === void 0 ? void 0 : de.selectSize) || ar(i.value);
  }), I = $(() => (v.value - 1) * m.value), w = $(() => {
    const H = v.value * m.value - 1, { itemCount: de } = e;
    return de !== void 0 && H > de - 1 ? de - 1 : H;
  }), k = $(() => {
    const { itemCount: H } = e;
    return H !== void 0 ? H : (e.pageCount || 1) * m.value;
  }), R = wt("Pagination", r, n);
  function B() {
    _t(() => {
      var H;
      const { value: de } = s;
      de && (de.classList.add("transition-disabled"), (H = s.value) === null || H === void 0 || H.offsetWidth, de.classList.remove("transition-disabled"));
    });
  }
  function F(H) {
    if (H === v.value) return;
    const { "onUpdate:page": de, onUpdatePage: Se, onChange: we, simple: $e } = e;
    de && ne(de, H), Se && ne(Se, H), we && ne(we, H), d.value = H, $e && (u.value = String(H));
  }
  function L(H) {
    if (H === m.value) return;
    const { "onUpdate:pageSize": de, onUpdatePageSize: Se, onPageSizeChange: we } = e;
    de && ne(de, H), Se && ne(Se, H), we && ne(we, H), f.value = H, g.value < v.value && F(g.value);
  }
  function V() {
    if (e.disabled) return;
    const H = Math.min(v.value + 1, g.value);
    F(H);
  }
  function Z() {
    if (e.disabled) return;
    const H = Math.max(v.value - 1, 1);
    F(H);
  }
  function _() {
    if (e.disabled) return;
    const H = Math.min(W.value.fastForwardTo, g.value);
    F(H);
  }
  function j() {
    if (e.disabled) return;
    const H = Math.max(W.value.fastBackwardTo, 1);
    F(H);
  }
  function ee(H) {
    L(H);
  }
  function z() {
    const H = Number.parseInt(u.value);
    Number.isNaN(H) || (F(Math.max(1, Math.min(H, g.value))), e.simple || (u.value = ""));
  }
  function E() {
    z();
  }
  function ue(H) {
    if (!e.disabled) switch (H.type) {
      case "page":
        F(H.label);
        break;
      case "fast-backward":
        j();
        break;
      case "fast-forward":
        _();
        break;
    }
  }
  function me(H) {
    u.value = H.replace(/\D+/g, "");
  }
  Mt(() => {
    v.value, m.value, B();
  });
  const ge = $(() => {
    const H = i.value, { self: { buttonBorder: de, buttonBorderHover: Se, buttonBorderPressed: we, buttonIconColor: $e, buttonIconColorHover: De, buttonIconColorPressed: Ke, itemTextColor: ce, itemTextColorHover: be, itemTextColorPressed: Me, itemTextColorActive: Pe, itemTextColorDisabled: je, itemColor: qe, itemColorHover: _e, itemColorPressed: U, itemColorActive: Y, itemColorActiveHover: ke, itemColorDisabled: at, itemBorder: He, itemBorderHover: Ie, itemBorderPressed: Ye, itemBorderActive: Te, itemBorderDisabled: nt, itemBorderRadius: ot, jumperTextColor: et, jumperTextColorDisabled: re, buttonColor: he, buttonColorHover: S, buttonColorPressed: A, [pe("itemPadding", H)]: te, [pe("itemMargin", H)]: fe, [pe("inputWidth", H)]: J, [pe("selectWidth", H)]: ie, [pe("inputMargin", H)]: ae, [pe("selectMargin", H)]: ve, [pe("jumperFontSize", H)]: Fe, [pe("prefixMargin", H)]: ht, [pe("suffixMargin", H)]: st, [pe("itemSize", H)]: vt, [pe("buttonIconSize", H)]: pt, [pe("itemFontSize", H)]: Ot, [`${pe("itemMargin", H)}Rtl`]: It, [`${pe("inputMargin", H)}Rtl`]: gt }, common: { cubicBezierEaseInOut: Pt } } = a.value;
    return { "--n-prefix-margin": ht, "--n-suffix-margin": st, "--n-item-font-size": Ot, "--n-select-width": ie, "--n-select-margin": ve, "--n-input-width": J, "--n-input-margin": ae, "--n-input-margin-rtl": gt, "--n-item-size": vt, "--n-item-text-color": ce, "--n-item-text-color-disabled": je, "--n-item-text-color-hover": be, "--n-item-text-color-active": Pe, "--n-item-text-color-pressed": Me, "--n-item-color": qe, "--n-item-color-hover": _e, "--n-item-color-disabled": at, "--n-item-color-active": Y, "--n-item-color-active-hover": ke, "--n-item-color-pressed": U, "--n-item-border": He, "--n-item-border-hover": Ie, "--n-item-border-disabled": nt, "--n-item-border-active": Te, "--n-item-border-pressed": Ye, "--n-item-padding": te, "--n-item-border-radius": ot, "--n-bezier": Pt, "--n-jumper-font-size": Fe, "--n-jumper-text-color": et, "--n-jumper-text-color-disabled": re, "--n-item-margin": fe, "--n-item-margin-rtl": It, "--n-button-icon-size": pt, "--n-button-icon-color": $e, "--n-button-icon-color-hover": De, "--n-button-icon-color-pressed": Ke, "--n-button-color-hover": S, "--n-button-color": he, "--n-button-color-pressed": A, "--n-button-border": de, "--n-button-border-hover": Se, "--n-button-border-pressed": we };
  }), se = o ? Qe("pagination", $(() => {
    let H = "";
    return H += i.value[0], H;
  }), ge, e) : void 0;
  return { rtlEnabled: R, mergedClsPrefix: n, locale: l, selfRef: s, mergedPage: v, pageItems: $(() => W.value.items), mergedItemCount: k, jumperValue: u, pageSizeOptions: N, mergedPageSize: m, inputSize: K, selectSize: q, mergedTheme: a, mergedPageCount: g, startIndex: I, endIndex: w, showFastForwardMenu: b, showFastBackwardMenu: y, fastForwardActive: h, fastBackwardActive: p, handleMenuSelect: T, handleFastForwardMouseenter: P, handleFastForwardMouseleave: x, handleFastBackwardMouseenter: C, handleFastBackwardMouseleave: O, handleJumperInput: me, handleBackwardClick: Z, handleForwardClick: V, handlePageItemClick: ue, handleSizePickerChange: ee, handleQuickJumperChange: E, cssVars: o ? void 0 : ge, themeClass: se == null ? void 0 : se.themeClass, onRender: se == null ? void 0 : se.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, disabled: n, cssVars: o, mergedPage: r, mergedPageCount: i, pageItems: a, showSizePicker: l, showQuickJumper: s, mergedTheme: d, locale: f, inputSize: v, selectSize: m, mergedPageSize: g, pageSizeOptions: u, jumperValue: h, simple: p, prev: b, next: y, prefix: P, suffix: x, label: C, goto: O, handleJumperInput: T, handleSizePickerChange: W, handleBackwardClick: N, handlePageItemClick: K, handleForwardClick: q, handleQuickJumperChange: I, onRender: w } = this;
  w == null ? void 0 : w();
  const k = P || e.prefix, R = x || e.suffix, B = b || e.prev, F = y || e.next, L = C || e.label;
  return c("div", { ref: "selfRef", class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, p && `${t}-pagination--simple`], style: o }, k ? c("div", { class: `${t}-pagination-prefix` }, k({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null, this.displayOrder.map((V) => {
    switch (V) {
      case "pages":
        return c(ut, null, c("div", { class: [`${t}-pagination-item`, !B && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`], onClick: N }, B ? B({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount }) : c(it, { clsPrefix: t }, { default: () => this.rtlEnabled ? c(Cr, null) : c(yr, null) })), p ? c(ut, null, c("div", { class: `${t}-pagination-quick-jumper` }, c(qo, { value: h, onUpdateValue: T, size: v, placeholder: "", disabled: n, theme: d.peers.Input, themeOverrides: d.peerOverrides.Input, onChange: I })), "\xA0/", " ", i) : a.map((Z, _) => {
          let j, ee, z;
          const { type: E } = Z;
          switch (E) {
            case "page":
              const me = Z.label;
              L ? j = L({ type: "page", node: me, active: Z.active }) : j = me;
              break;
            case "fast-forward":
              const ge = this.fastForwardActive ? c(it, { clsPrefix: t }, { default: () => this.rtlEnabled ? c(xr, null) : c(wr, null) }) : c(it, { clsPrefix: t }, { default: () => c(Sr, null) });
              L ? j = L({ type: "fast-forward", node: ge, active: this.fastForwardActive || this.showFastForwardMenu }) : j = ge, ee = this.handleFastForwardMouseenter, z = this.handleFastForwardMouseleave;
              break;
            case "fast-backward":
              const se = this.fastBackwardActive ? c(it, { clsPrefix: t }, { default: () => this.rtlEnabled ? c(wr, null) : c(xr, null) }) : c(it, { clsPrefix: t }, { default: () => c(Sr, null) });
              L ? j = L({ type: "fast-backward", node: se, active: this.fastBackwardActive || this.showFastBackwardMenu }) : j = se, ee = this.handleFastBackwardMouseenter, z = this.handleFastBackwardMouseleave;
              break;
          }
          const ue = c("div", { key: _, class: [`${t}-pagination-item`, Z.active && `${t}-pagination-item--active`, E !== "page" && (E === "fast-backward" && this.showFastBackwardMenu || E === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, E === "page" && `${t}-pagination-item--clickable`], onClick: () => {
            K(Z);
          }, onMouseenter: ee, onMouseleave: z }, j);
          if (E === "page" && !Z.mayBeFastBackward && !Z.mayBeFastForward) return ue;
          {
            const me = Z.type === "page" ? Z.mayBeFastBackward ? "fast-backward" : "fast-forward" : Z.type;
            return Z.type !== "page" && !Z.options ? ue : c(lc, { to: this.to, key: me, disabled: n, trigger: "hover", virtualScroll: true, style: { width: "60px" }, theme: d.peers.Popselect, themeOverrides: d.peerOverrides.Popselect, builtinThemeOverrides: { peers: { InternalSelectMenu: { height: "calc(var(--n-option-height) * 4.6)" } } }, nodeProps: () => ({ style: { justifyContent: "center" } }), show: E === "page" ? false : E === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu, onUpdateShow: (ge) => {
              E !== "page" && (ge ? E === "fast-backward" ? this.showFastBackwardMenu = ge : this.showFastForwardMenu = ge : (this.showFastBackwardMenu = false, this.showFastForwardMenu = false));
            }, options: Z.type !== "page" && Z.options ? Z.options : [], onUpdateValue: this.handleMenuSelect, scrollable: true, scrollbarProps: this.scrollbarProps, showCheckmark: false }, { default: () => ue });
          }
        }), c("div", { class: [`${t}-pagination-item`, !F && `${t}-pagination-item--button`, { [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n }], onClick: q }, F ? F({ page: r, pageSize: g, pageCount: i, itemCount: this.mergedItemCount, startIndex: this.startIndex, endIndex: this.endIndex }) : c(it, { clsPrefix: t }, { default: () => this.rtlEnabled ? c(yr, null) : c(Cr, null) })));
      case "size-picker":
        return !p && l ? c(cc, Object.assign({ consistentMenuWidth: false, placeholder: "", showCheckmark: false, to: this.to }, this.selectProps, { size: m, options: u, value: g, disabled: n, scrollbarProps: this.scrollbarProps, theme: d.peers.Select, themeOverrides: d.peerOverrides.Select, onUpdateValue: W })) : null;
      case "quick-jumper":
        return !p && s ? c("div", { class: `${t}-pagination-quick-jumper` }, O ? O() : Cn(this.$slots.goto, () => [f.goto]), c(qo, { value: h, onUpdateValue: T, size: v, placeholder: "", disabled: n, theme: d.peers.Input, themeOverrides: d.peerOverrides.Input, onChange: I })) : null;
      default:
        return null;
    }
  }), R ? c("div", { class: `${t}-pagination-suffix` }, R({ page: r, pageSize: g, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null);
} }), bc = { padding: "4px 0", optionIconSizeSmall: "14px", optionIconSizeMedium: "16px", optionIconSizeLarge: "16px", optionIconSizeHuge: "18px", optionSuffixWidthSmall: "14px", optionSuffixWidthMedium: "14px", optionSuffixWidthLarge: "16px", optionSuffixWidthHuge: "16px", optionIconSuffixWidthSmall: "32px", optionIconSuffixWidthMedium: "32px", optionIconSuffixWidthLarge: "36px", optionIconSuffixWidthHuge: "36px", optionPrefixWidthSmall: "14px", optionPrefixWidthMedium: "14px", optionPrefixWidthLarge: "16px", optionPrefixWidthHuge: "16px", optionIconPrefixWidthSmall: "36px", optionIconPrefixWidthMedium: "36px", optionIconPrefixWidthLarge: "40px", optionIconPrefixWidthHuge: "40px" };
function mc(e) {
  const { primaryColor: t, textColor2: n, dividerColor: o, hoverColor: r, popoverColor: i, invertedColor: a, borderRadius: l, fontSizeSmall: s, fontSizeMedium: d, fontSizeLarge: f, fontSizeHuge: v, heightSmall: m, heightMedium: g, heightLarge: u, heightHuge: h, textColor3: p, opacityDisabled: b } = e;
  return Object.assign(Object.assign({}, bc), { optionHeightSmall: m, optionHeightMedium: g, optionHeightLarge: u, optionHeightHuge: h, borderRadius: l, fontSizeSmall: s, fontSizeMedium: d, fontSizeLarge: f, fontSizeHuge: v, optionTextColor: n, optionTextColorHover: n, optionTextColorActive: t, optionTextColorChildActive: t, color: i, dividerColor: o, suffixColor: n, prefixColor: n, optionColorHover: r, optionColorActive: ye(t, { alpha: 0.1 }), groupHeaderTextColor: p, optionTextColorInverted: "#BBB", optionTextColorHoverInverted: "#FFF", optionTextColorActiveInverted: "#FFF", optionTextColorChildActiveInverted: "#FFF", colorInverted: a, dividerColorInverted: "#BBB", suffixColorInverted: "#BBB", prefixColorInverted: "#BBB", optionColorHoverInverted: t, optionColorActiveInverted: t, groupHeaderTextColorInverted: "#AAA", optionOpacityDisabled: b });
}
const _i = xt({ name: "Dropdown", common: Ze, peers: { Popover: Zt }, self: mc }), yc = { padding: "8px 14px" };
function xc(e) {
  const { borderRadius: t, boxShadow2: n, baseColor: o } = e;
  return Object.assign(Object.assign({}, yc), { borderRadius: t, boxShadow: n, color: Re(o, "rgba(0, 0, 0, .85)"), textColor: o });
}
const Ai = xt({ name: "Tooltip", common: Ze, peers: { Popover: Zt }, self: xc }), Ei = xt({ name: "Ellipsis", common: Ze, peers: { Tooltip: Ai } }), wc = { radioSizeSmall: "14px", radioSizeMedium: "16px", radioSizeLarge: "18px", labelPadding: "0 8px", labelFontWeight: "400" };
function Cc(e) {
  const { borderColor: t, primaryColor: n, baseColor: o, textColorDisabled: r, inputColorDisabled: i, textColor2: a, opacityDisabled: l, borderRadius: s, fontSizeSmall: d, fontSizeMedium: f, fontSizeLarge: v, heightSmall: m, heightMedium: g, heightLarge: u, lineHeight: h } = e;
  return Object.assign(Object.assign({}, wc), { labelLineHeight: h, buttonHeightSmall: m, buttonHeightMedium: g, buttonHeightLarge: u, fontSizeSmall: d, fontSizeMedium: f, fontSizeLarge: v, boxShadow: `inset 0 0 0 1px ${t}`, boxShadowActive: `inset 0 0 0 1px ${n}`, boxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${ye(n, { alpha: 0.2 })}`, boxShadowHover: `inset 0 0 0 1px ${n}`, boxShadowDisabled: `inset 0 0 0 1px ${t}`, color: o, colorDisabled: i, colorActive: "#0000", textColor: a, textColorDisabled: r, dotColorActive: n, dotColorDisabled: t, buttonBorderColor: t, buttonBorderColorActive: n, buttonBorderColorHover: t, buttonColor: o, buttonColorActive: o, buttonTextColor: a, buttonTextColorActive: n, buttonTextColorHover: n, opacityDisabled: l, buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${ye(n, { alpha: 0.3 })}`, buttonBoxShadowHover: "inset 0 0 0 1px #0000", buttonBoxShadow: "inset 0 0 0 1px #0000", buttonBorderRadius: s });
}
const Do = { name: "Radio", common: Ze, self: Cc }, Sc = { thPaddingSmall: "8px", thPaddingMedium: "12px", thPaddingLarge: "12px", tdPaddingSmall: "8px", tdPaddingMedium: "12px", tdPaddingLarge: "12px", sorterSize: "15px", resizableContainerSize: "8px", resizableSize: "2px", filterSize: "15px", paginationMargin: "12px 0 0 0", emptyPadding: "48px 0", actionPadding: "8px 12px", actionButtonMargin: "0 8px 0 0" };
function kc(e) {
  const { cardColor: t, modalColor: n, popoverColor: o, textColor2: r, textColor1: i, tableHeaderColor: a, tableColorHover: l, iconColor: s, primaryColor: d, fontWeightStrong: f, borderRadius: v, lineHeight: m, fontSizeSmall: g, fontSizeMedium: u, fontSizeLarge: h, dividerColor: p, heightSmall: b, opacityDisabled: y, tableColorStriped: P } = e;
  return Object.assign(Object.assign({}, Sc), { actionDividerColor: p, lineHeight: m, borderRadius: v, fontSizeSmall: g, fontSizeMedium: u, fontSizeLarge: h, borderColor: Re(t, p), tdColorHover: Re(t, l), tdColorSorting: Re(t, l), tdColorStriped: Re(t, P), thColor: Re(t, a), thColorHover: Re(Re(t, a), l), thColorSorting: Re(Re(t, a), l), tdColor: t, tdTextColor: r, thTextColor: i, thFontWeight: f, thButtonColorHover: l, thIconColor: s, thIconColorActive: d, borderColorModal: Re(n, p), tdColorHoverModal: Re(n, l), tdColorSortingModal: Re(n, l), tdColorStripedModal: Re(n, P), thColorModal: Re(n, a), thColorHoverModal: Re(Re(n, a), l), thColorSortingModal: Re(Re(n, a), l), tdColorModal: n, borderColorPopover: Re(o, p), tdColorHoverPopover: Re(o, l), tdColorSortingPopover: Re(o, l), tdColorStripedPopover: Re(o, P), thColorPopover: Re(o, a), thColorHoverPopover: Re(Re(o, a), l), thColorSortingPopover: Re(Re(o, a), l), tdColorPopover: o, boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)", boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)", loadingColor: d, loadingSize: b, opacityLoading: y });
}
const Rc = xt({ name: "DataTable", common: Ze, peers: { Button: Zl, Checkbox: $i, Radio: Do, Pagination: Ii, Scrollbar: yo, Empty: _o, Popover: Zt, Ellipsis: Ei, Dropdown: _i }, self: kc }), Pc = Object.assign(Object.assign({}, xe.props), { onUnstableColumnResize: Function, pagination: { type: [Object, Boolean], default: false }, paginateSinglePage: { type: Boolean, default: true }, minHeight: [Number, String], maxHeight: [Number, String], columns: { type: Array, default: () => [] }, rowClassName: [String, Function], rowProps: Function, rowKey: Function, summary: [Function], data: { type: Array, default: () => [] }, loading: Boolean, bordered: { type: Boolean, default: void 0 }, bottomBordered: { type: Boolean, default: void 0 }, striped: Boolean, scrollX: [Number, String], defaultCheckedRowKeys: { type: Array, default: () => [] }, checkedRowKeys: Array, singleLine: { type: Boolean, default: true }, singleColumn: Boolean, size: String, remote: Boolean, defaultExpandedRowKeys: { type: Array, default: [] }, defaultExpandAll: Boolean, expandedRowKeys: Array, stickyExpandedRows: Boolean, virtualScroll: Boolean, virtualScrollX: Boolean, virtualScrollHeader: Boolean, headerHeight: { type: Number, default: 28 }, heightForRow: Function, minRowHeight: { type: Number, default: 28 }, tableLayout: { type: String, default: "auto" }, allowCheckingNotLoaded: Boolean, cascade: { type: Boolean, default: true }, childrenKey: { type: String, default: "children" }, indent: { type: Number, default: 16 }, flexHeight: Boolean, summaryPlacement: { type: String, default: "bottom" }, paginationBehaviorOnFilter: { type: String, default: "current" }, filterIconPopoverProps: Object, scrollbarProps: Object, renderCell: Function, renderExpandIcon: Function, spinProps: Object, getCsvCell: Function, getCsvHeader: Function, onLoad: Function, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], "onUpdate:sorter": [Function, Array], onUpdateSorter: [Function, Array], "onUpdate:filters": [Function, Array], onUpdateFilters: [Function, Array], "onUpdate:checkedRowKeys": [Function, Array], onUpdateCheckedRowKeys: [Function, Array], "onUpdate:expandedRowKeys": [Function, Array], onUpdateExpandedRowKeys: [Function, Array], onScroll: Function, onPageChange: [Function, Array], onPageSizeChange: [Function, Array], onSorterChange: [Function, Array], onFiltersChange: [Function, Array], onCheckedRowKeysChange: [Function, Array] }), ft = Xe("n-data-table"), Li = 40, Ni = 40;
function Br(e) {
  if (e.type === "selection") return e.width === void 0 ? Li : Ut(e.width);
  if (e.type === "expand") return e.width === void 0 ? Ni : Ut(e.width);
  if (!("children" in e)) return typeof e.width == "string" ? Ut(e.width) : e.width;
}
function zc(e) {
  var t, n;
  if (e.type === "selection") return Ge((t = e.width) !== null && t !== void 0 ? t : Li);
  if (e.type === "expand") return Ge((n = e.width) !== null && n !== void 0 ? n : Ni);
  if (!("children" in e)) return Ge(e.width);
}
function ct(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function _r(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function Fc(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function $c(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function Mc(e, t) {
  if (t !== void 0) return { width: t, minWidth: t, maxWidth: t };
  const n = zc(e), { minWidth: o, maxWidth: r } = e;
  return { width: n, minWidth: Ge(o) || n, maxWidth: Ge(r) };
}
function Tc(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Yn(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function Jn(e) {
  return "children" in e ? false : !!e.sorter;
}
function Di(e) {
  return "children" in e && e.children.length ? false : !!e.resizable;
}
function Ar(e) {
  return "children" in e ? false : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function Er(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return false;
}
function Oc(e, t) {
  if (e.sorter === void 0) return null;
  const { customNextSortOrder: n } = e;
  return t === null || t.columnKey !== e.key ? { columnKey: e.key, sorter: e.sorter, order: Er(false) } : Object.assign(Object.assign({}, t), { order: (n || Er)(t.order) });
}
function Hi(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function Ic(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function Bc(e, t, n, o) {
  const r = e.filter((l) => l.type !== "expand" && l.type !== "selection" && l.allowExport !== false), i = r.map((l) => o ? o(l) : l.title).join(","), a = t.map((l) => r.map((s) => n ? n(l[s.key], l, s) : Ic(l[s.key])).join(","));
  return [i, ...a].join(`
`);
}
const _c = le({ name: "DataTableBodyCheckbox", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, mergedInderminateRowKeySetRef: n } = Ce(ft);
  return () => {
    const { rowKey: o } = e;
    return c(Eo, { privateInsideTable: true, disabled: e.disabled, indeterminate: n.value.has(o), checked: t.value.has(o), onUpdateChecked: e.onUpdateChecked });
  };
} }), Ac = M("radio", `
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
 `), M("radio-input", `
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
 `), Ne("disabled", `
 cursor: pointer;
 `, [X("&:hover", [Q("dot", { boxShadow: "var(--n-box-shadow-hover)" })]), G("focus", [X("&:not(:active)", [Q("dot", { boxShadow: "var(--n-box-shadow-focus)" })])])]), G("disabled", `
 cursor: not-allowed;
 `, [Q("dot", { boxShadow: "var(--n-box-shadow-disabled)", backgroundColor: "var(--n-color-disabled)" }, [X("&::before", { backgroundColor: "var(--n-dot-color-disabled)" }), G("checked", `
 opacity: 1;
 `)]), Q("label", { color: "var(--n-text-color-disabled)" }), M("radio-input", `
 cursor: not-allowed;
 `)])]), Ec = { name: String, value: { type: [String, Number, Boolean], default: "on" }, checked: { type: Boolean, default: void 0 }, defaultChecked: Boolean, disabled: { type: Boolean, default: void 0 }, label: String, size: String, onUpdateChecked: [Function, Array], "onUpdate:checked": [Function, Array], checkedValue: { type: Boolean, default: void 0 } }, Ki = Xe("n-radio-group");
function Lc(e) {
  const t = Ce(Ki, null), { mergedClsPrefixRef: n, mergedComponentPropsRef: o } = Oe(e), r = rn(e, { mergedSize(x) {
    var C, O;
    const { size: T } = e;
    if (T !== void 0) return T;
    if (t) {
      const { mergedSizeRef: { value: N } } = t;
      if (N !== void 0) return N;
    }
    if (x) return x.mergedSize.value;
    const W = (O = (C = o == null ? void 0 : o.value) === null || C === void 0 ? void 0 : C.Radio) === null || O === void 0 ? void 0 : O.size;
    return W || "medium";
  }, mergedDisabled(x) {
    return !!(e.disabled || (t == null ? void 0 : t.disabledRef.value) || (x == null ? void 0 : x.disabled.value));
  } }), { mergedSizeRef: i, mergedDisabledRef: a } = r, l = D(null), s = D(null), d = D(e.defaultChecked), f = oe(e, "checked"), v = tt(f, d), m = ze(() => t ? t.valueRef.value === e.value : v.value), g = ze(() => {
    const { name: x } = e;
    if (x !== void 0) return x;
    if (t) return t.nameRef.value;
  }), u = D(false);
  function h() {
    if (t) {
      const { doUpdateValue: x } = t, { value: C } = e;
      ne(x, C);
    } else {
      const { onUpdateChecked: x, "onUpdate:checked": C } = e, { nTriggerFormInput: O, nTriggerFormChange: T } = r;
      x && ne(x, true), C && ne(C, true), O(), T(), d.value = true;
    }
  }
  function p() {
    a.value || m.value || h();
  }
  function b() {
    p(), l.value && (l.value.checked = m.value);
  }
  function y() {
    u.value = false;
  }
  function P() {
    u.value = true;
  }
  return { mergedClsPrefix: t ? t.mergedClsPrefixRef : n, inputRef: l, labelRef: s, mergedName: g, mergedDisabled: a, renderSafeChecked: m, focus: u, mergedSize: i, handleRadioInputChange: b, handleRadioInputBlur: y, handleRadioInputFocus: P };
}
const Nc = Object.assign(Object.assign({}, xe.props), Ec), ji = le({ name: "Radio", props: Nc, setup(e) {
  const t = Lc(e), n = xe("Radio", "-radio", Ac, Do, e, t.mergedClsPrefix), o = $(() => {
    const { mergedSize: { value: d } } = t, { common: { cubicBezierEaseInOut: f }, self: { boxShadow: v, boxShadowActive: m, boxShadowDisabled: g, boxShadowFocus: u, boxShadowHover: h, color: p, colorDisabled: b, colorActive: y, textColor: P, textColorDisabled: x, dotColorActive: C, dotColorDisabled: O, labelPadding: T, labelLineHeight: W, labelFontWeight: N, [pe("fontSize", d)]: K, [pe("radioSize", d)]: q } } = n.value;
    return { "--n-bezier": f, "--n-label-line-height": W, "--n-label-font-weight": N, "--n-box-shadow": v, "--n-box-shadow-active": m, "--n-box-shadow-disabled": g, "--n-box-shadow-focus": u, "--n-box-shadow-hover": h, "--n-color": p, "--n-color-active": y, "--n-color-disabled": b, "--n-dot-color-active": C, "--n-dot-color-disabled": O, "--n-font-size": K, "--n-radio-size": q, "--n-text-color": P, "--n-text-color-disabled": x, "--n-label-padding": T };
  }), { inlineThemeDisabled: r, mergedClsPrefixRef: i, mergedRtlRef: a } = Oe(e), l = wt("Radio", a, i), s = r ? Qe("radio", $(() => t.mergedSize.value[0]), o, e) : void 0;
  return Object.assign(t, { rtlEnabled: l, cssVars: r ? void 0 : o, themeClass: s == null ? void 0 : s.themeClass, onRender: s == null ? void 0 : s.onRender });
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: n, label: o } = this;
  return n == null ? void 0 : n(), c("label", { class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`], style: this.cssVars }, c("div", { class: `${t}-radio__dot-wrapper` }, "\xA0", c("div", { class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`] }), c("input", { ref: "inputRef", type: "radio", class: `${t}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur })), kt(e.default, (r) => !r && !o ? null : c("div", { ref: "labelRef", class: `${t}-radio__label` }, r || o)));
} }), Dc = M("radio-group", `
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
 `, [M("radio-button", { height: "var(--n-height)", lineHeight: "var(--n-height)" }), Q("splitor", { height: "var(--n-height)" })]), M("radio-button", `
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
 `, [M("radio-input", `
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
 `)]), Ne("disabled", `
 cursor: pointer;
 `, [X("&:hover", [Q("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), Ne("checked", { color: "var(--n-button-text-color-hover)" })]), G("focus", [X("&:not(:active)", [Q("state-border", { boxShadow: "var(--n-button-box-shadow-focus)" })])])]), G("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), G("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function Hc(e, t, n) {
  var o;
  const r = [];
  let i = false;
  for (let a = 0; a < e.length; ++a) {
    const l = e[a], s = (o = l.type) === null || o === void 0 ? void 0 : o.name;
    s === "RadioButton" && (i = true);
    const d = l.props;
    if (s !== "RadioButton") {
      r.push(l);
      continue;
    }
    if (a === 0) r.push(l);
    else {
      const f = r[r.length - 1].props, v = t === f.value, m = f.disabled, g = t === d.value, u = d.disabled, h = (v ? 2 : 0) + (m ? 0 : 1), p = (g ? 2 : 0) + (u ? 0 : 1), b = { [`${n}-radio-group__splitor--disabled`]: m, [`${n}-radio-group__splitor--checked`]: v }, y = { [`${n}-radio-group__splitor--disabled`]: u, [`${n}-radio-group__splitor--checked`]: g }, P = h < p ? y : b;
      r.push(c("div", { class: [`${n}-radio-group__splitor`, P] }), l);
    }
  }
  return { children: r, isButtonGroup: i };
}
const Kc = Object.assign(Object.assign({}, xe.props), { name: String, value: [String, Number, Boolean], defaultValue: { type: [String, Number, Boolean], default: null }, size: String, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), jc = le({ name: "RadioGroup", props: Kc, setup(e) {
  const t = D(null), { mergedSizeRef: n, mergedDisabledRef: o, nTriggerFormChange: r, nTriggerFormInput: i, nTriggerFormBlur: a, nTriggerFormFocus: l } = rn(e), { mergedClsPrefixRef: s, inlineThemeDisabled: d, mergedRtlRef: f } = Oe(e), v = xe("Radio", "-radio-group", Dc, Do, e, s), m = D(e.defaultValue), g = oe(e, "value"), u = tt(g, m);
  function h(C) {
    const { onUpdateValue: O, "onUpdate:value": T } = e;
    O && ne(O, C), T && ne(T, C), m.value = C, r(), i();
  }
  function p(C) {
    const { value: O } = t;
    O && (O.contains(C.relatedTarget) || l());
  }
  function b(C) {
    const { value: O } = t;
    O && (O.contains(C.relatedTarget) || a());
  }
  Le(Ki, { mergedClsPrefixRef: s, nameRef: oe(e, "name"), valueRef: u, disabledRef: o, mergedSizeRef: n, doUpdateValue: h });
  const y = wt("Radio", f, s), P = $(() => {
    const { value: C } = n, { common: { cubicBezierEaseInOut: O }, self: { buttonBorderColor: T, buttonBorderColorActive: W, buttonBorderRadius: N, buttonBoxShadow: K, buttonBoxShadowFocus: q, buttonBoxShadowHover: I, buttonColor: w, buttonColorActive: k, buttonTextColor: R, buttonTextColorActive: B, buttonTextColorHover: F, opacityDisabled: L, [pe("buttonHeight", C)]: V, [pe("fontSize", C)]: Z } } = v.value;
    return { "--n-font-size": Z, "--n-bezier": O, "--n-button-border-color": T, "--n-button-border-color-active": W, "--n-button-border-radius": N, "--n-button-box-shadow": K, "--n-button-box-shadow-focus": q, "--n-button-box-shadow-hover": I, "--n-button-color": w, "--n-button-color-active": k, "--n-button-text-color": R, "--n-button-text-color-hover": F, "--n-button-text-color-active": B, "--n-height": V, "--n-opacity-disabled": L };
  }), x = d ? Qe("radio-group", $(() => n.value[0]), P, e) : void 0;
  return { selfElRef: t, rtlEnabled: y, mergedClsPrefix: s, mergedValue: u, handleFocusout: b, handleFocusin: p, cssVars: d ? void 0 : P, themeClass: x == null ? void 0 : x.themeClass, onRender: x == null ? void 0 : x.onRender };
}, render() {
  var e;
  const { mergedValue: t, mergedClsPrefix: n, handleFocusin: o, handleFocusout: r } = this, { children: i, isButtonGroup: a } = Hc(tn(Ma(this)), t, n);
  return (e = this.onRender) === null || e === void 0 || e.call(this), c("div", { onFocusin: o, onFocusout: r, ref: "selfElRef", class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, a && `${n}-radio-group--button-group`], style: this.cssVars }, i);
} }), Uc = le({ name: "DataTableBodyRadio", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, componentId: n } = Ce(ft);
  return () => {
    const { rowKey: o } = e;
    return c(ji, { name: n, disabled: e.disabled, checked: t.value.has(o), onUpdateChecked: e.onUpdateChecked });
  };
} }), Wc = Object.assign(Object.assign({}, qt), xe.props), Vc = le({ name: "Tooltip", props: Wc, slots: Object, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Oe(e), n = xe("Tooltip", "-tooltip", void 0, Ai, e, t), o = D(null);
  return Object.assign(Object.assign({}, { syncPosition() {
    o.value.syncPosition();
  }, setShow(i) {
    o.value.setShow(i);
  } }), { popoverRef: o, mergedTheme: n, popoverThemeOverrides: $(() => n.value.self) });
}, render() {
  const { mergedTheme: e, internalExtraClass: t } = this;
  return c(ln, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
} }), Ui = M("ellipsis", { overflow: "hidden" }, [Ne("line-clamp", `
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
function fo(e) {
  return `${e}-ellipsis--line-clamp`;
}
function ho(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Wi = Object.assign(Object.assign({}, xe.props), { expandTrigger: String, lineClamp: [Number, String], tooltip: { type: [Boolean, Object], default: true } }), Ho = le({ name: "Ellipsis", inheritAttrs: false, props: Wi, slots: Object, setup(e, { slots: t, attrs: n }) {
  const o = Jr(), r = xe("Ellipsis", "-ellipsis", Ui, Ei, e, o), i = D(null), a = D(null), l = D(null), s = D(false), d = $(() => {
    const { lineClamp: p } = e, { value: b } = s;
    return p !== void 0 ? { textOverflow: "", "-webkit-line-clamp": b ? "" : p } : { textOverflow: b ? "" : "ellipsis", "-webkit-line-clamp": "" };
  });
  function f() {
    let p = false;
    const { value: b } = s;
    if (b) return true;
    const { value: y } = i;
    if (y) {
      const { lineClamp: P } = e;
      if (g(y), P !== void 0) p = y.scrollHeight <= y.offsetHeight;
      else {
        const { value: x } = a;
        x && (p = x.getBoundingClientRect().width <= y.getBoundingClientRect().width);
      }
      u(y, p);
    }
    return p;
  }
  const v = $(() => e.expandTrigger === "click" ? () => {
    var p;
    const { value: b } = s;
    b && ((p = l.value) === null || p === void 0 || p.setShow(false)), s.value = !b;
  } : void 0);
  Ur(() => {
    var p;
    e.tooltip && ((p = l.value) === null || p === void 0 || p.setShow(false));
  });
  const m = () => c("span", Object.assign({}, Tt(n, { class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? fo(o.value) : void 0, e.expandTrigger === "click" ? ho(o.value, "pointer") : void 0], style: d.value }), { ref: "triggerRef", onClick: v.value, onMouseenter: e.expandTrigger === "click" ? f : void 0 }), e.lineClamp ? t : c("span", { ref: "triggerInnerRef" }, t));
  function g(p) {
    if (!p) return;
    const b = d.value, y = fo(o.value);
    e.lineClamp !== void 0 ? h(p, y, "add") : h(p, y, "remove");
    for (const P in b) p.style[P] !== b[P] && (p.style[P] = b[P]);
  }
  function u(p, b) {
    const y = ho(o.value, "pointer");
    e.expandTrigger === "click" && !b ? h(p, y, "add") : h(p, y, "remove");
  }
  function h(p, b, y) {
    y === "add" ? p.classList.contains(b) || p.classList.add(b) : p.classList.contains(b) && p.classList.remove(b);
  }
  return { mergedTheme: r, triggerRef: i, triggerInnerRef: a, tooltipRef: l, handleClick: v, renderTrigger: m, getTooltipDisabled: f };
}, render() {
  var e;
  const { tooltip: t, renderTrigger: n, $slots: o } = this;
  if (t) {
    const { mergedTheme: r } = this;
    return c(Vc, Object.assign({ ref: "tooltipRef", placement: "top" }, t, { getDisabled: this.getTooltipDisabled, theme: r.peers.Tooltip, themeOverrides: r.peerOverrides.Tooltip }), { trigger: n, default: (e = o.tooltip) !== null && e !== void 0 ? e : o.default });
  } else return n();
} }), Gc = le({ name: "PerformantEllipsis", props: Wi, inheritAttrs: false, setup(e, { attrs: t, slots: n }) {
  const o = D(false), r = Jr();
  return Hl("-ellipsis", Ui, r), { mouseEntered: o, renderTrigger: () => {
    const { lineClamp: a } = e, l = r.value;
    return c("span", Object.assign({}, Tt(t, { class: [`${l}-ellipsis`, a !== void 0 ? fo(l) : void 0, e.expandTrigger === "click" ? ho(l, "pointer") : void 0], style: a === void 0 ? { textOverflow: "ellipsis" } : { "-webkit-line-clamp": a } }), { onMouseenter: () => {
      o.value = true;
    } }), a ? n : c("span", null, n));
  } };
}, render() {
  return this.mouseEntered ? c(Ho, Tt({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
} }), qc = le({ name: "DataTableCell", props: { clsPrefix: { type: String, required: true }, row: { type: Object, required: true }, index: { type: Number, required: true }, column: { type: Object, required: true }, isSummary: Boolean, mergedTheme: { type: Object, required: true }, renderCell: Function }, render() {
  var e;
  const { isSummary: t, column: n, row: o, renderCell: r } = this;
  let i;
  const { render: a, key: l, ellipsis: s } = n;
  if (a && !t ? i = a(o, this.index) : t ? i = (e = o[l]) === null || e === void 0 ? void 0 : e.value : i = r ? r(oo(o, l), o, n) : oo(o, l), s) if (typeof s == "object") {
    const { mergedTheme: d } = this;
    return n.ellipsisComponent === "performant-ellipsis" ? c(Gc, Object.assign({}, s, { theme: d.peers.Ellipsis, themeOverrides: d.peerOverrides.Ellipsis }), { default: () => i }) : c(Ho, Object.assign({}, s, { theme: d.peers.Ellipsis, themeOverrides: d.peerOverrides.Ellipsis }), { default: () => i });
  } else return c("span", { class: `${this.clsPrefix}-data-table-td__ellipsis` }, i);
  return i;
} }), Lr = le({ name: "DataTableExpandTrigger", props: { clsPrefix: { type: String, required: true }, expanded: Boolean, loading: Boolean, onClick: { type: Function, required: true }, renderExpandIcon: { type: Function }, rowData: { type: Object, required: true } }, render() {
  const { clsPrefix: e } = this;
  return c("div", { class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`], onClick: this.onClick, onMousedown: (t) => {
    t.preventDefault();
  } }, c(Zr, null, { default: () => this.loading ? c(xo, { key: "loading", clsPrefix: this.clsPrefix, radius: 85, strokeWidth: 15, scale: 0.88 }) : this.renderExpandIcon ? this.renderExpandIcon({ expanded: this.expanded, rowData: this.rowData }) : c(it, { clsPrefix: e, key: "base-icon" }, { default: () => c(yi, null) }) }));
} }), Xc = le({ name: "DataTableFilterMenu", props: { column: { type: Object, required: true }, radioGroupName: { type: String, required: true }, multiple: { type: Boolean, required: true }, value: { type: [Array, String, Number], default: null }, options: { type: Array, required: true }, onConfirm: { type: Function, required: true }, onClear: { type: Function, required: true }, onChange: { type: Function, required: true } }, setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: n } = Oe(e), o = wt("DataTable", n, t), { mergedClsPrefixRef: r, mergedThemeRef: i, localeRef: a } = Ce(ft), l = D(e.value), s = $(() => {
    const { value: u } = l;
    return Array.isArray(u) ? u : null;
  }), d = $(() => {
    const { value: u } = l;
    return Yn(e.column) ? Array.isArray(u) && u.length && u[0] || null : Array.isArray(u) ? null : u;
  });
  function f(u) {
    e.onChange(u);
  }
  function v(u) {
    e.multiple && Array.isArray(u) ? l.value = u : Yn(e.column) && !Array.isArray(u) ? l.value = [u] : l.value = u;
  }
  function m() {
    f(l.value), e.onConfirm();
  }
  function g() {
    e.multiple || Yn(e.column) ? f([]) : f(null), e.onClear();
  }
  return { mergedClsPrefix: r, rtlEnabled: o, mergedTheme: i, locale: a, checkboxGroupValue: s, radioGroupValue: d, handleChange: v, handleConfirmClick: m, handleClearClick: g };
}, render() {
  const { mergedTheme: e, locale: t, mergedClsPrefix: n } = this;
  return c("div", { class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`] }, c(wo, null, { default: () => {
    const { checkboxGroupValue: o, handleChange: r } = this;
    return this.multiple ? c(Yd, { value: o, class: `${n}-data-table-filter-menu__group`, onUpdateValue: r }, { default: () => this.options.map((i) => c(Eo, { key: i.value, theme: e.peers.Checkbox, themeOverrides: e.peerOverrides.Checkbox, value: i.value }, { default: () => i.label })) }) : c(jc, { name: this.radioGroupName, class: `${n}-data-table-filter-menu__group`, value: this.radioGroupValue, onUpdateValue: this.handleChange }, { default: () => this.options.map((i) => c(ji, { key: i.value, value: i.value, theme: e.peers.Radio, themeOverrides: e.peerOverrides.Radio }, { default: () => i.label })) });
  } }), c("div", { class: `${n}-data-table-filter-menu__action` }, c(Xo, { size: "tiny", theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, onClick: this.handleClearClick }, { default: () => t.clear }), c(Xo, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, type: "primary", size: "tiny", onClick: this.handleConfirmClick }, { default: () => t.confirm })));
} }), Zc = le({ name: "DataTableRenderFilter", props: { render: { type: Function, required: true }, active: { type: Boolean, default: false }, show: { type: Boolean, default: false } }, render() {
  const { render: e, active: t, show: n } = this;
  return e({ active: t, show: n });
} });
function Yc(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const Jc = le({ name: "DataTableFilterButton", props: { column: { type: Object, required: true }, options: { type: Array, default: () => [] } }, setup(e) {
  const { mergedComponentPropsRef: t } = Oe(), { mergedThemeRef: n, mergedClsPrefixRef: o, mergedFilterStateRef: r, filterMenuCssVarsRef: i, paginationBehaviorOnFilterRef: a, doUpdatePage: l, doUpdateFilters: s, filterIconPopoverPropsRef: d } = Ce(ft), f = D(false), v = r, m = $(() => e.column.filterMultiple !== false), g = $(() => {
    const P = v.value[e.column.key];
    if (P === void 0) {
      const { value: x } = m;
      return x ? [] : null;
    }
    return P;
  }), u = $(() => {
    const { value: P } = g;
    return Array.isArray(P) ? P.length > 0 : P !== null;
  }), h = $(() => {
    var P, x;
    return ((x = (P = t == null ? void 0 : t.value) === null || P === void 0 ? void 0 : P.DataTable) === null || x === void 0 ? void 0 : x.renderFilter) || e.column.renderFilter;
  });
  function p(P) {
    const x = Yc(v.value, e.column.key, P);
    s(x, e.column), a.value === "first" && l(1);
  }
  function b() {
    f.value = false;
  }
  function y() {
    f.value = false;
  }
  return { mergedTheme: n, mergedClsPrefix: o, active: u, showPopover: f, mergedRenderFilter: h, filterIconPopoverProps: d, filterMultiple: m, mergedFilterValue: g, filterMenuCssVars: i, handleFilterChange: p, handleFilterMenuConfirm: y, handleFilterMenuCancel: b };
}, render() {
  const { mergedTheme: e, mergedClsPrefix: t, handleFilterMenuCancel: n, filterIconPopoverProps: o } = this;
  return c(ln, Object.assign({ show: this.showPopover, onUpdateShow: (r) => this.showPopover = r, trigger: "click", theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, placement: "bottom" }, o, { style: { padding: 0 } }), { trigger: () => {
    const { mergedRenderFilter: r } = this;
    if (r) return c(Zc, { "data-data-table-filter": true, render: r, active: this.active, show: this.showPopover });
    const { renderFilterIcon: i } = this.column;
    return c("div", { "data-data-table-filter": true, class: [`${t}-data-table-filter`, { [`${t}-data-table-filter--active`]: this.active, [`${t}-data-table-filter--show`]: this.showPopover }] }, i ? i({ active: this.active, show: this.showPopover }) : c(it, { clsPrefix: t }, { default: () => c(Gs, null) }));
  }, default: () => {
    const { renderFilterMenu: r } = this.column;
    return r ? r({ hide: n }) : c(Xc, { style: this.filterMenuCssVars, radioGroupName: String(this.column.key), multiple: this.filterMultiple, value: this.mergedFilterValue, options: this.options, column: this.column, onChange: this.handleFilterChange, onClear: this.handleFilterMenuCancel, onConfirm: this.handleFilterMenuConfirm });
  } });
} }), Qc = le({ name: "ColumnResizeButton", props: { onResizeStart: Function, onResize: Function, onResizeEnd: Function }, setup(e) {
  const { mergedClsPrefixRef: t } = Ce(ft), n = D(false);
  let o = 0;
  function r(s) {
    return s.clientX;
  }
  function i(s) {
    var d;
    s.preventDefault();
    const f = n.value;
    o = r(s), n.value = true, f || (We("mousemove", window, a), We("mouseup", window, l), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
  }
  function a(s) {
    var d;
    (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
  }
  function l() {
    var s;
    n.value = false, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), Be("mousemove", window, a), Be("mouseup", window, l);
  }
  return yt(() => {
    Be("mousemove", window, a), Be("mouseup", window, l);
  }), { mergedClsPrefix: t, active: n, handleMousedown: i };
}, render() {
  const { mergedClsPrefix: e } = this;
  return c("span", { "data-data-table-resizable": true, class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`], onMousedown: this.handleMousedown });
} }), eu = le({ name: "DataTableRenderSorter", props: { render: { type: Function, required: true }, order: { type: [String, Boolean], default: false } }, render() {
  const { render: e, order: t } = this;
  return e({ order: t });
} }), tu = le({ name: "SortIcon", props: { column: { type: Object, required: true } }, setup(e) {
  const { mergedComponentPropsRef: t } = Oe(), { mergedSortStateRef: n, mergedClsPrefixRef: o } = Ce(ft), r = $(() => n.value.find((s) => s.columnKey === e.column.key)), i = $(() => r.value !== void 0), a = $(() => {
    const { value: s } = r;
    return s && i.value ? s.order : false;
  }), l = $(() => {
    var s, d;
    return ((d = (s = t == null ? void 0 : t.value) === null || s === void 0 ? void 0 : s.DataTable) === null || d === void 0 ? void 0 : d.renderSorter) || e.column.renderSorter;
  });
  return { mergedClsPrefix: o, active: i, mergedSortOrder: a, mergedRenderSorter: l };
}, render() {
  const { mergedRenderSorter: e, mergedSortOrder: t, mergedClsPrefix: n } = this, { renderSorterIcon: o } = this.column;
  return e ? c(eu, { render: e, order: t }) : c("span", { class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`] }, o ? o({ order: t }) : c(it, { clsPrefix: n }, { default: () => c(Us, null) }));
} }), Ko = Xe("n-dropdown-menu"), Pn = Xe("n-dropdown"), Nr = Xe("n-dropdown-option"), Vi = le({ name: "DropdownDivider", props: { clsPrefix: { type: String, required: true } }, render() {
  return c("div", { class: `${this.clsPrefix}-dropdown-divider` });
} }), nu = le({ name: "DropdownGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { showIconRef: e, hasSubmenuRef: t } = Ce(Ko), { renderLabelRef: n, labelFieldRef: o, nodePropsRef: r, renderOptionRef: i } = Ce(Pn);
  return { labelField: o, showIcon: e, hasSubmenu: t, renderLabel: n, nodeProps: r, renderOption: i };
}, render() {
  var e;
  const { clsPrefix: t, hasSubmenu: n, showIcon: o, nodeProps: r, renderLabel: i, renderOption: a } = this, { rawNode: l } = this.tmNode, s = c("div", Object.assign({ class: `${t}-dropdown-option` }, r == null ? void 0 : r(l)), c("div", { class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group` }, c("div", { "data-dropdown-option": true, class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`] }, bt(l.icon)), c("div", { class: `${t}-dropdown-option-body__label`, "data-dropdown-option": true }, i ? i(l) : bt((e = l.title) !== null && e !== void 0 ? e : l[this.labelField])), c("div", { class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`], "data-dropdown-option": true })));
  return a ? a({ node: s, option: l }) : s;
} });
function ou(e) {
  const { textColorBase: t, opacity1: n, opacity2: o, opacity3: r, opacity4: i, opacity5: a } = e;
  return { color: t, opacity1Depth: n, opacity2Depth: o, opacity3Depth: r, opacity4Depth: i, opacity5Depth: a };
}
const ru = { common: Ze, self: ou }, iu = M("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [G("color-transition", { transition: "color .3s var(--n-bezier)" }), G("depth", { color: "var(--n-color)" }, [X("svg", { opacity: "var(--n-opacity)", transition: "opacity .3s var(--n-bezier)" })]), X("svg", { height: "1em", width: "1em" })]), lu = Object.assign(Object.assign({}, xe.props), { depth: [String, Number], size: [Number, String], color: String, component: [Object, Function] }), au = le({ _n_icon__: true, name: "Icon", inheritAttrs: false, props: lu, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: n } = Oe(e), o = xe("Icon", "-icon", iu, ru, e, t), r = $(() => {
    const { depth: a } = e, { common: { cubicBezierEaseInOut: l }, self: s } = o.value;
    if (a !== void 0) {
      const { color: d, [`opacity${a}Depth`]: f } = s;
      return { "--n-bezier": l, "--n-color": d, "--n-opacity": f };
    }
    return { "--n-bezier": l, "--n-color": "", "--n-opacity": "" };
  }), i = n ? Qe("icon", $(() => `${e.depth || "d"}`), r, e) : void 0;
  return { mergedClsPrefix: t, mergedStyle: $(() => {
    const { size: a, color: l } = e;
    return { fontSize: Ge(a), color: l };
  }), cssVars: n ? void 0 : r, themeClass: i == null ? void 0 : i.themeClass, onRender: i == null ? void 0 : i.onRender };
}, render() {
  var e;
  const { $parent: t, depth: n, mergedClsPrefix: o, component: r, onRender: i, themeClass: a } = this;
  return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && At("icon", "don't wrap `n-icon` inside `n-icon`"), i == null ? void 0 : i(), c("i", Tt(this.$attrs, { role: "img", class: [`${o}-icon`, a, { [`${o}-icon--depth`]: n, [`${o}-icon--color-transition`]: n !== void 0 }], style: [this.cssVars, this.mergedStyle] }), r ? c(r) : this.$slots);
} });
function vo(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function su(e) {
  return e.type === "group";
}
function Gi(e) {
  return e.type === "divider";
}
function du(e) {
  return e.type === "render";
}
const qi = le({ name: "DropdownOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null }, placement: { type: String, default: "right-start" }, props: Object, scrollable: Boolean }, setup(e) {
  const t = Ce(Pn), { hoverKeyRef: n, keyboardKeyRef: o, lastToggledSubmenuKeyRef: r, pendingKeyPathRef: i, activeKeyPathRef: a, animatedRef: l, mergedShowRef: s, renderLabelRef: d, renderIconRef: f, labelFieldRef: v, childrenFieldRef: m, renderOptionRef: g, nodePropsRef: u, menuPropsRef: h } = t, p = Ce(Nr, null), b = Ce(Ko), y = Ce(Sn), P = $(() => e.tmNode.rawNode), x = $(() => {
    const { value: F } = m;
    return vo(e.tmNode.rawNode, F);
  }), C = $(() => {
    const { disabled: F } = e.tmNode;
    return F;
  }), O = $(() => {
    if (!x.value) return false;
    const { key: F, disabled: L } = e.tmNode;
    if (L) return false;
    const { value: V } = n, { value: Z } = o, { value: _ } = r, { value: j } = i;
    return V !== null ? j.includes(F) : Z !== null ? j.includes(F) && j[j.length - 1] !== F : _ !== null ? j.includes(F) : false;
  }), T = $(() => o.value === null && !l.value), W = ia(O, 300, T), N = $(() => !!(p == null ? void 0 : p.enteringSubmenuRef.value)), K = D(false);
  Le(Nr, { enteringSubmenuRef: K });
  function q() {
    K.value = true;
  }
  function I() {
    K.value = false;
  }
  function w() {
    const { parentKey: F, tmNode: L } = e;
    L.disabled || s.value && (r.value = F, o.value = null, n.value = L.key);
  }
  function k() {
    const { tmNode: F } = e;
    F.disabled || s.value && n.value !== F.key && w();
  }
  function R(F) {
    if (e.tmNode.disabled || !s.value) return;
    const { relatedTarget: L } = F;
    L && !lt({ target: L }, "dropdownOption") && !lt({ target: L }, "scrollbarRail") && (n.value = null);
  }
  function B() {
    const { value: F } = x, { tmNode: L } = e;
    s.value && !F && !L.disabled && (t.doSelect(L.key, L.rawNode), t.doUpdateShow(false));
  }
  return { labelField: v, renderLabel: d, renderIcon: f, siblingHasIcon: b.showIconRef, siblingHasSubmenu: b.hasSubmenuRef, menuProps: h, popoverBody: y, animated: l, mergedShowSubmenu: $(() => W.value && !N.value), rawNode: P, hasSubmenu: x, pending: ze(() => {
    const { value: F } = i, { key: L } = e.tmNode;
    return F.includes(L);
  }), childActive: ze(() => {
    const { value: F } = a, { key: L } = e.tmNode, V = F.findIndex((Z) => L === Z);
    return V === -1 ? false : V < F.length - 1;
  }), active: ze(() => {
    const { value: F } = a, { key: L } = e.tmNode, V = F.findIndex((Z) => L === Z);
    return V === -1 ? false : V === F.length - 1;
  }), mergedDisabled: C, renderOption: g, nodeProps: u, handleClick: B, handleMouseMove: k, handleMouseEnter: w, handleMouseLeave: R, handleSubmenuBeforeEnter: q, handleSubmenuAfterEnter: I };
}, render() {
  var e, t;
  const { animated: n, rawNode: o, mergedShowSubmenu: r, clsPrefix: i, siblingHasIcon: a, siblingHasSubmenu: l, renderLabel: s, renderIcon: d, renderOption: f, nodeProps: v, props: m, scrollable: g } = this;
  let u = null;
  if (r) {
    const y = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
    u = c(Xi, Object.assign({}, y, { clsPrefix: i, scrollable: this.scrollable, tmNodes: this.tmNode.children, parentKey: this.tmNode.key }));
  }
  const h = { class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`], onMousemove: this.handleMouseMove, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onClick: this.handleClick }, p = v == null ? void 0 : v(o), b = c("div", Object.assign({ class: [`${i}-dropdown-option`, p == null ? void 0 : p.class], "data-dropdown-option": true }, p), c("div", Tt(h, m), [c("div", { class: [`${i}-dropdown-option-body__prefix`, a && `${i}-dropdown-option-body__prefix--show-icon`] }, [d ? d(o) : bt(o.icon)]), c("div", { "data-dropdown-option": true, class: `${i}-dropdown-option-body__label` }, s ? s(o) : bt((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), c("div", { "data-dropdown-option": true, class: [`${i}-dropdown-option-body__suffix`, l && `${i}-dropdown-option-body__suffix--has-submenu`] }, this.hasSubmenu ? c(au, null, { default: () => c(yi, null) }) : null)]), this.hasSubmenu ? c(zo, null, { default: () => [c(Fo, null, { default: () => c("div", { class: `${i}-dropdown-offset-container` }, c(Mo, { show: this.mergedShowSubmenu, placement: this.placement, to: g && this.popoverBody || void 0, teleportDisabled: !g }, { default: () => c("div", { class: `${i}-dropdown-menu-wrapper` }, n ? c(on, { onBeforeEnter: this.handleSubmenuBeforeEnter, onAfterEnter: this.handleSubmenuAfterEnter, name: "fade-in-scale-up-transition", appear: true }, { default: () => u }) : u) })) })] }) : null);
  return f ? f({ node: b, option: o }) : b;
} }), cu = le({ name: "NDropdownGroup", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null } }, render() {
  const { tmNode: e, parentKey: t, clsPrefix: n } = this, { children: o } = e;
  return c(ut, null, c(nu, { clsPrefix: n, tmNode: e, key: e.key }), o == null ? void 0 : o.map((r) => {
    const { rawNode: i } = r;
    return i.show === false ? null : Gi(i) ? c(Vi, { clsPrefix: n, key: r.key }) : r.isGroup ? (At("dropdown", "`group` node is not allowed to be put in `group` node."), null) : c(qi, { clsPrefix: n, tmNode: r, parentKey: t, key: r.key });
  }));
} }), uu = le({ name: "DropdownRenderOption", props: { tmNode: { type: Object, required: true } }, render() {
  const { rawNode: { render: e, props: t } } = this.tmNode;
  return c("div", t, [e == null ? void 0 : e()]);
} }), Xi = le({ name: "DropdownMenu", props: { scrollable: Boolean, showArrow: Boolean, arrowStyle: [String, Object], clsPrefix: { type: String, required: true }, tmNodes: { type: Array, default: () => [] }, parentKey: { type: [String, Number], default: null } }, setup(e) {
  const { renderIconRef: t, childrenFieldRef: n } = Ce(Pn);
  Le(Ko, { showIconRef: $(() => {
    const r = t.value;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => r ? r(s) : s.icon);
      const { rawNode: l } = i;
      return r ? r(l) : l.icon;
    });
  }), hasSubmenuRef: $(() => {
    const { value: r } = n;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => vo(s, r));
      const { rawNode: l } = i;
      return vo(l, r);
    });
  }) });
  const o = D(null);
  return Le(Po, null), Le(Ro, null), Le(Sn, o), { bodyRef: o };
}, render() {
  const { parentKey: e, clsPrefix: t, scrollable: n } = this, o = this.tmNodes.map((r) => {
    const { rawNode: i } = r;
    return i.show === false ? null : du(i) ? c(uu, { tmNode: r, key: r.key }) : Gi(i) ? c(Vi, { clsPrefix: t, key: r.key }) : su(i) ? c(cu, { clsPrefix: t, tmNode: r, parentKey: e, key: r.key }) : c(qi, { clsPrefix: t, tmNode: r, parentKey: e, key: r.key, props: i.props, scrollable: n });
  });
  return c("div", { class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`], ref: "bodyRef" }, n ? c(Vr, { contentClass: `${t}-dropdown-menu__content` }, { default: () => o }) : o, this.showArrow ? Ri({ clsPrefix: t, arrowStyle: this.arrowStyle, arrowClass: void 0, arrowWrapperClass: void 0, arrowWrapperStyle: void 0 }) : null);
} }), fu = M("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [Rn(), M("dropdown-option", `
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
 `)]), M("dropdown-option-body", `
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
 `), Ne("disabled", [G("pending", `
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
 `), M("icon", `
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
 `), M("icon", `
 font-size: var(--n-option-icon-size);
 `)]), M("dropdown-menu", "pointer-events: all;")]), M("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), M("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), M("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), X(">", [M("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Ne("scrollable", `
 padding: var(--n-padding);
 `), G("scrollable", [Q("content", `
 padding: var(--n-padding);
 `)])]), hu = { animated: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, size: String, inverted: Boolean, placement: { type: String, default: "bottom" }, onSelect: [Function, Array], options: { type: Array, default: () => [] }, menuProps: Function, showArrow: Boolean, renderLabel: Function, renderIcon: Function, renderOption: Function, nodeProps: Function, labelField: { type: String, default: "label" }, keyField: { type: String, default: "key" }, childrenField: { type: String, default: "children" }, value: [String, Number] }, vu = Object.keys(qt), pu = Object.assign(Object.assign(Object.assign({}, qt), hu), xe.props), gu = le({ name: "Dropdown", inheritAttrs: false, props: pu, setup(e) {
  const t = D(false), n = tt(oe(e, "show"), t), o = $(() => {
    const { keyField: k, childrenField: R } = e;
    return kn(e.options, { getKey(B) {
      return B[k];
    }, getDisabled(B) {
      return B.disabled === true;
    }, getIgnored(B) {
      return B.type === "divider" || B.type === "render";
    }, getChildren(B) {
      return B[R];
    } });
  }), r = $(() => o.value.treeNodes), i = D(null), a = D(null), l = D(null), s = $(() => {
    var k, R, B;
    return (B = (R = (k = i.value) !== null && k !== void 0 ? k : a.value) !== null && R !== void 0 ? R : l.value) !== null && B !== void 0 ? B : null;
  }), d = $(() => o.value.getPath(s.value).keyPath), f = $(() => o.value.getPath(e.value).keyPath), v = ze(() => e.keyboard && n.value);
  ra({ keydown: { ArrowUp: { prevent: true, handler: T }, ArrowRight: { prevent: true, handler: O }, ArrowDown: { prevent: true, handler: W }, ArrowLeft: { prevent: true, handler: C }, Enter: { prevent: true, handler: N }, Escape: x } }, v);
  const { mergedClsPrefixRef: m, inlineThemeDisabled: g, mergedComponentPropsRef: u } = Oe(e), h = $(() => {
    var k, R;
    return e.size || ((R = (k = u == null ? void 0 : u.value) === null || k === void 0 ? void 0 : k.Dropdown) === null || R === void 0 ? void 0 : R.size) || "medium";
  }), p = xe("Dropdown", "-dropdown", fu, _i, e, m);
  Le(Pn, { labelFieldRef: oe(e, "labelField"), childrenFieldRef: oe(e, "childrenField"), renderLabelRef: oe(e, "renderLabel"), renderIconRef: oe(e, "renderIcon"), hoverKeyRef: i, keyboardKeyRef: a, lastToggledSubmenuKeyRef: l, pendingKeyPathRef: d, activeKeyPathRef: f, animatedRef: oe(e, "animated"), mergedShowRef: n, nodePropsRef: oe(e, "nodeProps"), renderOptionRef: oe(e, "renderOption"), menuPropsRef: oe(e, "menuProps"), doSelect: b, doUpdateShow: y }), Ee(n, (k) => {
    !e.animated && !k && P();
  });
  function b(k, R) {
    const { onSelect: B } = e;
    B && ne(B, k, R);
  }
  function y(k) {
    const { "onUpdate:show": R, onUpdateShow: B } = e;
    R && ne(R, k), B && ne(B, k), t.value = k;
  }
  function P() {
    i.value = null, a.value = null, l.value = null;
  }
  function x() {
    y(false);
  }
  function C() {
    q("left");
  }
  function O() {
    q("right");
  }
  function T() {
    q("up");
  }
  function W() {
    q("down");
  }
  function N() {
    const k = K();
    (k == null ? void 0 : k.isLeaf) && n.value && (b(k.key, k.rawNode), y(false));
  }
  function K() {
    var k;
    const { value: R } = o, { value: B } = s;
    return !R || B === null ? null : (k = R.getNode(B)) !== null && k !== void 0 ? k : null;
  }
  function q(k) {
    const { value: R } = s, { value: { getFirstAvailableNode: B } } = o;
    let F = null;
    if (R === null) {
      const L = B();
      L !== null && (F = L.key);
    } else {
      const L = K();
      if (L) {
        let V;
        switch (k) {
          case "down":
            V = L.getNext();
            break;
          case "up":
            V = L.getPrev();
            break;
          case "right":
            V = L.getChild();
            break;
          case "left":
            V = L.getParent();
            break;
        }
        V && (F = V.key);
      }
    }
    F !== null && (i.value = null, a.value = F);
  }
  const I = $(() => {
    const { inverted: k } = e, R = h.value, { common: { cubicBezierEaseInOut: B }, self: F } = p.value, { padding: L, dividerColor: V, borderRadius: Z, optionOpacityDisabled: _, [pe("optionIconSuffixWidth", R)]: j, [pe("optionSuffixWidth", R)]: ee, [pe("optionIconPrefixWidth", R)]: z, [pe("optionPrefixWidth", R)]: E, [pe("fontSize", R)]: ue, [pe("optionHeight", R)]: me, [pe("optionIconSize", R)]: ge } = F, se = { "--n-bezier": B, "--n-font-size": ue, "--n-padding": L, "--n-border-radius": Z, "--n-option-height": me, "--n-option-prefix-width": E, "--n-option-icon-prefix-width": z, "--n-option-suffix-width": ee, "--n-option-icon-suffix-width": j, "--n-option-icon-size": ge, "--n-divider-color": V, "--n-option-opacity-disabled": _ };
    return k ? (se["--n-color"] = F.colorInverted, se["--n-option-color-hover"] = F.optionColorHoverInverted, se["--n-option-color-active"] = F.optionColorActiveInverted, se["--n-option-text-color"] = F.optionTextColorInverted, se["--n-option-text-color-hover"] = F.optionTextColorHoverInverted, se["--n-option-text-color-active"] = F.optionTextColorActiveInverted, se["--n-option-text-color-child-active"] = F.optionTextColorChildActiveInverted, se["--n-prefix-color"] = F.prefixColorInverted, se["--n-suffix-color"] = F.suffixColorInverted, se["--n-group-header-text-color"] = F.groupHeaderTextColorInverted) : (se["--n-color"] = F.color, se["--n-option-color-hover"] = F.optionColorHover, se["--n-option-color-active"] = F.optionColorActive, se["--n-option-text-color"] = F.optionTextColor, se["--n-option-text-color-hover"] = F.optionTextColorHover, se["--n-option-text-color-active"] = F.optionTextColorActive, se["--n-option-text-color-child-active"] = F.optionTextColorChildActive, se["--n-prefix-color"] = F.prefixColor, se["--n-suffix-color"] = F.suffixColor, se["--n-group-header-text-color"] = F.groupHeaderTextColor), se;
  }), w = g ? Qe("dropdown", $(() => `${h.value[0]}${e.inverted ? "i" : ""}`), I, e) : void 0;
  return { mergedClsPrefix: m, mergedTheme: p, mergedSize: h, tmNodes: r, mergedShow: n, handleAfterLeave: () => {
    e.animated && P();
  }, doUpdateShow: y, cssVars: g ? void 0 : I, themeClass: w == null ? void 0 : w.themeClass, onRender: w == null ? void 0 : w.onRender };
}, render() {
  const e = (o, r, i, a, l) => {
    var s;
    const { mergedClsPrefix: d, menuProps: f } = this;
    (s = this.onRender) === null || s === void 0 || s.call(this);
    const v = (f == null ? void 0 : f(void 0, this.tmNodes.map((g) => g.rawNode))) || {}, m = { ref: pi(r), class: [o, `${d}-dropdown`, `${d}-dropdown--${this.mergedSize}-size`, this.themeClass], clsPrefix: d, tmNodes: this.tmNodes, style: [...i, this.cssVars], showArrow: this.showArrow, arrowStyle: this.arrowStyle, scrollable: this.scrollable, onMouseenter: a, onMouseleave: l };
    return c(Xi, Tt(this.$attrs, m, v));
  }, { mergedTheme: t } = this, n = { show: this.mergedShow, theme: t.peers.Popover, themeOverrides: t.peerOverrides.Popover, internalOnAfterLeave: this.handleAfterLeave, internalRenderBody: e, onUpdateShow: this.doUpdateShow, "onUpdate:show": void 0 };
  return c(ln, Object.assign({}, Co(this.$props, vu), n), { trigger: () => {
    var o, r;
    return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
  } });
} }), Zi = "_n_all__", Yi = "_n_none__";
function bu(e, t, n, o) {
  return e ? (r) => {
    for (const i of e) switch (r) {
      case Zi:
        n(true);
        return;
      case Yi:
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
function mu(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return { label: t.checkTableAll, key: Zi };
      case "none":
        return { label: t.uncheckTableAll, key: Yi };
      default:
        return n;
    }
  }) : [];
}
const yu = le({ name: "DataTableSelectionMenu", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  const { props: t, localeRef: n, checkOptionsRef: o, rawPaginatedDataRef: r, doCheckAll: i, doUncheckAll: a } = Ce(ft), l = $(() => bu(o.value, r, i, a)), s = $(() => mu(o.value, n.value));
  return () => {
    var d, f, v, m;
    const { clsPrefix: g } = e;
    return c(gu, { theme: (f = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || f === void 0 ? void 0 : f.Dropdown, themeOverrides: (m = (v = t.themeOverrides) === null || v === void 0 ? void 0 : v.peers) === null || m === void 0 ? void 0 : m.Dropdown, options: s.value, onSelect: l.value }, { default: () => c(it, { clsPrefix: g, class: `${g}-data-table-check-extra` }, { default: () => c(Yl, null) }) });
  };
} });
function Qn(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const xu = le({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, width: String }, render() {
  const { clsPrefix: e, id: t, cols: n, width: o } = this;
  return c("table", { style: { tableLayout: "fixed", width: o }, class: `${e}-data-table-table` }, c("colgroup", null, n.map((r) => c("col", { key: r.key, style: r.style }))), c("thead", { "data-n-id": t, class: `${e}-data-table-thead` }, this.$slots));
} }), Ji = le({ name: "DataTableHeader", props: { discrete: { type: Boolean, default: true } }, setup() {
  const { mergedClsPrefixRef: e, scrollXRef: t, fixedColumnLeftMapRef: n, fixedColumnRightMapRef: o, mergedCurrentPageRef: r, allRowsCheckedRef: i, someRowsCheckedRef: a, rowsRef: l, colsRef: s, mergedThemeRef: d, checkOptionsRef: f, mergedSortStateRef: v, componentId: m, mergedTableLayoutRef: g, headerCheckboxDisabledRef: u, virtualScrollHeaderRef: h, headerHeightRef: p, onUnstableColumnResize: b, doUpdateResizableWidth: y, handleTableHeaderScroll: P, deriveNextSorter: x, doUncheckAll: C, doCheckAll: O } = Ce(ft), T = D(), W = D({});
  function N(R) {
    const B = W.value[R];
    return B == null ? void 0 : B.getBoundingClientRect().width;
  }
  function K() {
    i.value ? C() : O();
  }
  function q(R, B) {
    if (lt(R, "dataTableFilter") || lt(R, "dataTableResizable") || !Jn(B)) return;
    const F = v.value.find((V) => V.columnKey === B.key) || null, L = Oc(B, F);
    x(L);
  }
  const I = /* @__PURE__ */ new Map();
  function w(R) {
    I.set(R.key, N(R.key));
  }
  function k(R, B) {
    const F = I.get(R.key);
    if (F === void 0) return;
    const L = F + B, V = $c(L, R.minWidth, R.maxWidth);
    b(L, V, R, N), y(R, V);
  }
  return { cellElsRef: W, componentId: m, mergedSortState: v, mergedClsPrefix: e, scrollX: t, fixedColumnLeftMap: n, fixedColumnRightMap: o, currentPage: r, allRowsChecked: i, someRowsChecked: a, rows: l, cols: s, mergedTheme: d, checkOptions: f, mergedTableLayout: g, headerCheckboxDisabled: u, headerHeight: p, virtualScrollHeader: h, virtualListRef: T, handleCheckboxUpdateChecked: K, handleColHeaderClick: q, handleTableHeaderScroll: P, handleColumnResizeStart: w, handleColumnResize: k };
}, render() {
  const { cellElsRef: e, mergedClsPrefix: t, fixedColumnLeftMap: n, fixedColumnRightMap: o, currentPage: r, allRowsChecked: i, someRowsChecked: a, rows: l, cols: s, mergedTheme: d, checkOptions: f, componentId: v, discrete: m, mergedTableLayout: g, headerCheckboxDisabled: u, mergedSortState: h, virtualScrollHeader: p, handleColHeaderClick: b, handleCheckboxUpdateChecked: y, handleColumnResizeStart: P, handleColumnResize: x } = this, C = (N, K, q) => N.map(({ column: I, colIndex: w, colSpan: k, rowSpan: R, isLast: B }) => {
    var F, L;
    const V = ct(I), { ellipsis: Z } = I, _ = () => I.type === "selection" ? I.multiple !== false ? c(ut, null, c(Eo, { key: r, privateInsideTable: true, checked: i, indeterminate: a, disabled: u, onUpdateChecked: y }), f ? c(yu, { clsPrefix: t }) : null) : null : c(ut, null, c("div", { class: `${t}-data-table-th__title-wrapper` }, c("div", { class: `${t}-data-table-th__title` }, Z === true || Z && !Z.tooltip ? c("div", { class: `${t}-data-table-th__ellipsis` }, Qn(I)) : Z && typeof Z == "object" ? c(Ho, Object.assign({}, Z, { theme: d.peers.Ellipsis, themeOverrides: d.peerOverrides.Ellipsis }), { default: () => Qn(I) }) : Qn(I)), Jn(I) ? c(tu, { column: I }) : null), Ar(I) ? c(Jc, { column: I, options: I.filterOptions }) : null, Di(I) ? c(Qc, { onResizeStart: () => {
      P(I);
    }, onResize: (E) => {
      x(I, E);
    } }) : null), j = V in n, ee = V in o, z = K && !I.fixed ? "div" : "th";
    return c(z, { ref: (E) => e[V] = E, key: V, style: [K && !I.fixed ? { position: "absolute", left: Ue(K(w)), top: 0, bottom: 0 } : { left: Ue((F = n[V]) === null || F === void 0 ? void 0 : F.start), right: Ue((L = o[V]) === null || L === void 0 ? void 0 : L.start) }, { width: Ue(I.width), textAlign: I.titleAlign || I.align, height: q }], colspan: k, rowspan: R, "data-col-key": V, class: [`${t}-data-table-th`, (j || ee) && `${t}-data-table-th--fixed-${j ? "left" : "right"}`, { [`${t}-data-table-th--sorting`]: Hi(I, h), [`${t}-data-table-th--filterable`]: Ar(I), [`${t}-data-table-th--sortable`]: Jn(I), [`${t}-data-table-th--selection`]: I.type === "selection", [`${t}-data-table-th--last`]: B }, I.className], onClick: I.type !== "selection" && I.type !== "expand" && !("children" in I) ? (E) => {
      b(E, I);
    } : void 0 }, _());
  });
  if (p) {
    const { headerHeight: N } = this;
    let K = 0, q = 0;
    return s.forEach((I) => {
      I.column.fixed === "left" ? K++ : I.column.fixed === "right" && q++;
    }), c(To, { ref: "virtualListRef", class: `${t}-data-table-base-table-header`, style: { height: Ue(N) }, onScroll: this.handleTableHeaderScroll, columns: s, itemSize: N, showScrollbar: false, items: [{}], itemResizable: false, visibleItemsTag: xu, visibleItemsProps: { clsPrefix: t, id: v, cols: s, width: Ge(this.scrollX) }, renderItemWithCols: ({ startColIndex: I, endColIndex: w, getLeft: k }) => {
      const R = s.map((F, L) => ({ column: F.column, isLast: L === s.length - 1, colIndex: F.index, colSpan: 1, rowSpan: 1 })).filter(({ column: F }, L) => !!(I <= L && L <= w || F.fixed)), B = C(R, k, Ue(N));
      return B.splice(K, 0, c("th", { colspan: s.length - K - q, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), c("tr", { style: { position: "relative" } }, B);
    } }, { default: ({ renderedItemWithCols: I }) => I });
  }
  const O = c("thead", { class: `${t}-data-table-thead`, "data-n-id": v }, l.map((N) => c("tr", { class: `${t}-data-table-tr` }, C(N, null, void 0))));
  if (!m) return O;
  const { handleTableHeaderScroll: T, scrollX: W } = this;
  return c("div", { class: `${t}-data-table-base-table-header`, onScroll: T }, c("table", { class: `${t}-data-table-table`, style: { minWidth: Ge(W), tableLayout: g } }, c("colgroup", null, s.map((N) => c("col", { key: N.key, style: N.style }))), O));
} });
function wu(e, t) {
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
const Cu = le({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, onMouseenter: Function, onMouseleave: Function }, render() {
  const { clsPrefix: e, id: t, cols: n, onMouseenter: o, onMouseleave: r } = this;
  return c("table", { style: { tableLayout: "fixed" }, class: `${e}-data-table-table`, onMouseenter: o, onMouseleave: r }, c("colgroup", null, n.map((i) => c("col", { key: i.key, style: i.style }))), c("tbody", { "data-n-id": t, class: `${e}-data-table-tbody` }, this.$slots));
} }), Su = le({ name: "DataTableBody", props: { onResize: Function, showHeader: Boolean, flexHeight: Boolean, bodyStyle: Object }, setup(e) {
  const { slots: t, bodyWidthRef: n, mergedExpandedRowKeysRef: o, mergedClsPrefixRef: r, mergedThemeRef: i, scrollXRef: a, colsRef: l, paginatedDataRef: s, rawPaginatedDataRef: d, fixedColumnLeftMapRef: f, fixedColumnRightMapRef: v, mergedCurrentPageRef: m, rowClassNameRef: g, leftActiveFixedColKeyRef: u, leftActiveFixedChildrenColKeysRef: h, rightActiveFixedColKeyRef: p, rightActiveFixedChildrenColKeysRef: b, renderExpandRef: y, hoverKeyRef: P, summaryRef: x, mergedSortStateRef: C, virtualScrollRef: O, virtualScrollXRef: T, heightForRowRef: W, minRowHeightRef: N, componentId: K, mergedTableLayoutRef: q, childTriggerColIndexRef: I, indentRef: w, rowPropsRef: k, stripedRef: R, loadingRef: B, onLoadRef: F, loadingKeySetRef: L, expandableRef: V, stickyExpandedRowsRef: Z, renderExpandIconRef: _, summaryPlacementRef: j, treeMateRef: ee, scrollbarPropsRef: z, setHeaderScrollLeft: E, doUpdateExpandedRowKeys: ue, handleTableBodyScroll: me, doCheck: ge, doUncheck: se, renderCell: H, xScrollableRef: de, explicitlyScrollableRef: Se } = Ce(ft), we = Ce(Ul), $e = D(null), De = D(null), Ke = D(null), ce = $(() => {
    var re, he;
    return (he = (re = we == null ? void 0 : we.mergedComponentPropsRef.value) === null || re === void 0 ? void 0 : re.DataTable) === null || he === void 0 ? void 0 : he.renderEmpty;
  }), be = ze(() => s.value.length === 0), Me = ze(() => O.value && !be.value);
  let Pe = "";
  const je = $(() => new Set(o.value));
  function qe(re) {
    var he;
    return (he = ee.value.getNode(re)) === null || he === void 0 ? void 0 : he.rawNode;
  }
  function _e(re, he, S) {
    const A = qe(re.key);
    if (!A) {
      At("data-table", `fail to get row data with key ${re.key}`);
      return;
    }
    if (S) {
      const te = s.value.findIndex((fe) => fe.key === Pe);
      if (te !== -1) {
        const fe = s.value.findIndex((ve) => ve.key === re.key), J = Math.min(te, fe), ie = Math.max(te, fe), ae = [];
        s.value.slice(J, ie + 1).forEach((ve) => {
          ve.disabled || ae.push(ve.key);
        }), he ? ge(ae, false, A) : se(ae, A), Pe = re.key;
        return;
      }
    }
    he ? ge(re.key, false, A) : se(re.key, A), Pe = re.key;
  }
  function U(re) {
    const he = qe(re.key);
    if (!he) {
      At("data-table", `fail to get row data with key ${re.key}`);
      return;
    }
    ge(re.key, true, he);
  }
  function Y() {
    if (Me.value) return He();
    const { value: re } = $e;
    return re ? re.containerRef : null;
  }
  function ke(re, he) {
    var S;
    if (L.value.has(re)) return;
    const { value: A } = o, te = A.indexOf(re), fe = Array.from(A);
    ~te ? (fe.splice(te, 1), ue(fe)) : he && !he.isLeaf && !he.shallowLoaded ? (L.value.add(re), (S = F.value) === null || S === void 0 || S.call(F, he.rawNode).then(() => {
      const { value: J } = o, ie = Array.from(J);
      ~ie.indexOf(re) || ie.push(re), ue(ie);
    }).finally(() => {
      L.value.delete(re);
    })) : (fe.push(re), ue(fe));
  }
  function at() {
    P.value = null;
  }
  function He() {
    const { value: re } = De;
    return (re == null ? void 0 : re.listElRef) || null;
  }
  function Ie() {
    const { value: re } = De;
    return (re == null ? void 0 : re.itemsElRef) || null;
  }
  function Ye(re) {
    var he;
    me(re), (he = $e.value) === null || he === void 0 || he.sync();
  }
  function Te(re) {
    var he;
    const { onResize: S } = e;
    S && S(re), (he = $e.value) === null || he === void 0 || he.sync();
  }
  const nt = { getScrollContainer: Y, scrollTo(re, he) {
    var S, A;
    O.value ? (S = De.value) === null || S === void 0 || S.scrollTo(re, he) : (A = $e.value) === null || A === void 0 || A.scrollTo(re, he);
  } }, ot = X([({ props: re }) => {
    const he = (A) => A === null ? null : X(`[data-n-id="${re.componentId}"] [data-col-key="${A}"]::after`, { boxShadow: "var(--n-box-shadow-after)" }), S = (A) => A === null ? null : X(`[data-n-id="${re.componentId}"] [data-col-key="${A}"]::before`, { boxShadow: "var(--n-box-shadow-before)" });
    return X([he(re.leftActiveFixedColKey), S(re.rightActiveFixedColKey), re.leftActiveFixedChildrenColKeys.map((A) => he(A)), re.rightActiveFixedChildrenColKeys.map((A) => S(A))]);
  }]);
  let et = false;
  return Mt(() => {
    const { value: re } = u, { value: he } = h, { value: S } = p, { value: A } = b;
    if (!et && re === null && S === null) return;
    const te = { leftActiveFixedColKey: re, leftActiveFixedChildrenColKeys: he, rightActiveFixedColKey: S, rightActiveFixedChildrenColKeys: A, componentId: K };
    ot.mount({ id: `n-${K}`, force: true, props: te, anchorMetaName: Wl, parent: we == null ? void 0 : we.styleMountTarget }), et = true;
  }), Kl(() => {
    ot.unmount({ id: `n-${K}`, parent: we == null ? void 0 : we.styleMountTarget });
  }), Object.assign({ bodyWidth: n, summaryPlacement: j, dataTableSlots: t, componentId: K, scrollbarInstRef: $e, virtualListRef: De, emptyElRef: Ke, summary: x, mergedClsPrefix: r, mergedTheme: i, mergedRenderEmpty: ce, scrollX: a, cols: l, loading: B, shouldDisplayVirtualList: Me, empty: be, paginatedDataAndInfo: $(() => {
    const { value: re } = R;
    let he = false;
    return { data: s.value.map(re ? (A, te) => (A.isLeaf || (he = true), { tmNode: A, key: A.key, striped: te % 2 === 1, index: te }) : (A, te) => (A.isLeaf || (he = true), { tmNode: A, key: A.key, striped: false, index: te })), hasChildren: he };
  }), rawPaginatedData: d, fixedColumnLeftMap: f, fixedColumnRightMap: v, currentPage: m, rowClassName: g, renderExpand: y, mergedExpandedRowKeySet: je, hoverKey: P, mergedSortState: C, virtualScroll: O, virtualScrollX: T, heightForRow: W, minRowHeight: N, mergedTableLayout: q, childTriggerColIndex: I, indent: w, rowProps: k, loadingKeySet: L, expandable: V, stickyExpandedRows: Z, renderExpandIcon: _, scrollbarProps: z, setHeaderScrollLeft: E, handleVirtualListScroll: Ye, handleVirtualListResize: Te, handleMouseleaveTable: at, virtualListContainer: He, virtualListContent: Ie, handleTableBodyScroll: me, handleCheckboxUpdateChecked: _e, handleRadioUpdateChecked: U, handleUpdateExpanded: ke, renderCell: H, explicitlyScrollable: Se, xScrollable: de }, nt);
}, render() {
  const { mergedTheme: e, scrollX: t, mergedClsPrefix: n, explicitlyScrollable: o, xScrollable: r, loadingKeySet: i, onResize: a, setHeaderScrollLeft: l, empty: s, shouldDisplayVirtualList: d } = this, f = { minWidth: Ge(t) || "100%" };
  t && (f.width = "100%");
  const v = () => c("div", { class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`], style: [this.bodyStyle, r ? "position: sticky; left: 0; width: var(--n-scrollbar-current-width);" : void 0], ref: "emptyElRef" }, Cn(this.dataTableSlots.empty, () => {
    var g;
    return [((g = this.mergedRenderEmpty) === null || g === void 0 ? void 0 : g.call(this)) || c(Ci, { theme: this.mergedTheme.peers.Empty, themeOverrides: this.mergedTheme.peerOverrides.Empty })];
  })), m = c(wo, Object.assign({}, this.scrollbarProps, { ref: "scrollbarInstRef", scrollable: o || r, class: `${n}-data-table-base-table-body`, style: s ? "height: initial;" : this.bodyStyle, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, contentStyle: f, container: d ? this.virtualListContainer : void 0, content: d ? this.virtualListContent : void 0, horizontalRailStyle: { zIndex: 3 }, verticalRailStyle: { zIndex: 3 }, internalExposeWidthCssVar: r && s, xScrollable: r, onScroll: d ? void 0 : this.handleTableBodyScroll, internalOnUpdateScrollLeft: l, onResize: a }), { default: () => {
    if (this.empty && !this.showHeader && (this.explicitlyScrollable || this.xScrollable)) return v();
    const g = {}, u = {}, { cols: h, paginatedDataAndInfo: p, mergedTheme: b, fixedColumnLeftMap: y, fixedColumnRightMap: P, currentPage: x, rowClassName: C, mergedSortState: O, mergedExpandedRowKeySet: T, stickyExpandedRows: W, componentId: N, childTriggerColIndex: K, expandable: q, rowProps: I, handleMouseleaveTable: w, renderExpand: k, summary: R, handleCheckboxUpdateChecked: B, handleRadioUpdateChecked: F, handleUpdateExpanded: L, heightForRow: V, minRowHeight: Z, virtualScrollX: _ } = this, { length: j } = h;
    let ee;
    const { data: z, hasChildren: E } = p, ue = E ? wu(z, T) : z;
    if (R) {
      const ce = R(this.rawPaginatedData);
      if (Array.isArray(ce)) {
        const be = ce.map((Me, Pe) => ({ isSummaryRow: true, key: `__n_summary__${Pe}`, tmNode: { rawNode: Me, disabled: true }, index: -1 }));
        ee = this.summaryPlacement === "top" ? [...be, ...ue] : [...ue, ...be];
      } else {
        const be = { isSummaryRow: true, key: "__n_summary__", tmNode: { rawNode: ce, disabled: true }, index: -1 };
        ee = this.summaryPlacement === "top" ? [be, ...ue] : [...ue, be];
      }
    } else ee = ue;
    const me = E ? { width: Ue(this.indent) } : void 0, ge = [];
    ee.forEach((ce) => {
      k && T.has(ce.key) && (!q || q(ce.tmNode.rawNode)) ? ge.push(ce, { isExpandedRow: true, key: `${ce.key}-expand`, tmNode: ce.tmNode, index: ce.index }) : ge.push(ce);
    });
    const { length: se } = ge, H = {};
    z.forEach(({ tmNode: ce }, be) => {
      H[be] = ce.key;
    });
    const de = W ? this.bodyWidth : null, Se = de === null ? void 0 : `${de}px`, we = this.virtualScrollX ? "div" : "td";
    let $e = 0, De = 0;
    _ && h.forEach((ce) => {
      ce.column.fixed === "left" ? $e++ : ce.column.fixed === "right" && De++;
    });
    const Ke = ({ rowInfo: ce, displayedRowIndex: be, isVirtual: Me, isVirtualX: Pe, startColIndex: je, endColIndex: qe, getLeft: _e }) => {
      const { index: U } = ce;
      if ("isExpandedRow" in ce) {
        const { tmNode: { key: S, rawNode: A } } = ce;
        return c("tr", { class: `${n}-data-table-tr ${n}-data-table-tr--expanded`, key: `${S}__expand` }, c("td", { class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, be + 1 === se && `${n}-data-table-td--last-row`], colspan: j }, W ? c("div", { class: `${n}-data-table-expand`, style: { width: Se } }, k(A, U)) : k(A, U)));
      }
      const Y = "isSummaryRow" in ce, ke = !Y && ce.striped, { tmNode: at, key: He } = ce, { rawNode: Ie } = at, Ye = T.has(He), Te = I ? I(Ie, U) : void 0, nt = typeof C == "string" ? C : Tc(Ie, U, C), ot = Pe ? h.filter((S, A) => !!(je <= A && A <= qe || S.column.fixed)) : h, et = Pe ? Ue((V == null ? void 0 : V(Ie, U)) || Z) : void 0, re = ot.map((S) => {
        var A, te, fe, J, ie;
        const ae = S.index;
        if (be in g) {
          const Ve = g[be], Je = Ve.indexOf(ae);
          if (~Je) return Ve.splice(Je, 1), null;
        }
        const { column: ve } = S, Fe = ct(S), { rowSpan: ht, colSpan: st } = ve, vt = Y ? ((A = ce.tmNode.rawNode[Fe]) === null || A === void 0 ? void 0 : A.colSpan) || 1 : st ? st(Ie, U) : 1, pt = Y ? ((te = ce.tmNode.rawNode[Fe]) === null || te === void 0 ? void 0 : te.rowSpan) || 1 : ht ? ht(Ie, U) : 1, Ot = ae + vt === j, It = be + pt === se, gt = pt > 1;
        if (gt && (u[be] = { [ae]: [] }), vt > 1 || gt) for (let Ve = be; Ve < be + pt; ++Ve) {
          gt && u[be][ae].push(H[Ve]);
          for (let Je = ae; Je < ae + vt; ++Je) Ve === be && Je === ae || (Ve in g ? g[Ve].push(Je) : g[Ve] = [Je]);
        }
        const Pt = gt ? this.hoverKey : null, { cellProps: Bt } = ve, dt = Bt == null ? void 0 : Bt(Ie, U), Et = { "--indent-offset": "" }, Yt = ve.fixed ? "td" : we;
        return c(Yt, Object.assign({}, dt, { key: Fe, style: [{ textAlign: ve.align || void 0, width: Ue(ve.width) }, Pe && { height: et }, Pe && !ve.fixed ? { position: "absolute", left: Ue(_e(ae)), top: 0, bottom: 0 } : { left: Ue((fe = y[Fe]) === null || fe === void 0 ? void 0 : fe.start), right: Ue((J = P[Fe]) === null || J === void 0 ? void 0 : J.start) }, Et, (dt == null ? void 0 : dt.style) || ""], colspan: vt, rowspan: Me ? void 0 : pt, "data-col-key": Fe, class: [`${n}-data-table-td`, ve.className, dt == null ? void 0 : dt.class, Y && `${n}-data-table-td--summary`, Pt !== null && u[be][ae].includes(Pt) && `${n}-data-table-td--hover`, Hi(ve, O) && `${n}-data-table-td--sorting`, ve.fixed && `${n}-data-table-td--fixed-${ve.fixed}`, ve.align && `${n}-data-table-td--${ve.align}-align`, ve.type === "selection" && `${n}-data-table-td--selection`, ve.type === "expand" && `${n}-data-table-td--expand`, Ot && `${n}-data-table-td--last-col`, It && `${n}-data-table-td--last-row`] }), E && ae === K ? [jl(Et["--indent-offset"] = Y ? 0 : ce.tmNode.level, c("div", { class: `${n}-data-table-indent`, style: me })), Y || ce.tmNode.isLeaf ? c("div", { class: `${n}-data-table-expand-placeholder` }) : c(Lr, { class: `${n}-data-table-expand-trigger`, clsPrefix: n, expanded: Ye, rowData: Ie, renderExpandIcon: this.renderExpandIcon, loading: i.has(ce.key), onClick: () => {
          L(He, ce.tmNode);
        } })] : null, ve.type === "selection" ? Y ? null : ve.multiple === false ? c(Uc, { key: x, rowKey: He, disabled: ce.tmNode.disabled, onUpdateChecked: () => {
          F(ce.tmNode);
        } }) : c(_c, { key: x, rowKey: He, disabled: ce.tmNode.disabled, onUpdateChecked: (Ve, Je) => {
          B(ce.tmNode, Ve, Je.shiftKey);
        } }) : ve.type === "expand" ? Y ? null : !ve.expandable || !((ie = ve.expandable) === null || ie === void 0) && ie.call(ve, Ie) ? c(Lr, { clsPrefix: n, rowData: Ie, expanded: Ye, renderExpandIcon: this.renderExpandIcon, onClick: () => {
          L(He, null);
        } }) : null : c(qc, { clsPrefix: n, index: U, row: Ie, column: ve, isSummary: Y, mergedTheme: b, renderCell: this.renderCell }));
      });
      return Pe && $e && De && re.splice($e, 0, c("td", { colspan: h.length - $e - De, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), c("tr", Object.assign({}, Te, { onMouseenter: (S) => {
        var A;
        this.hoverKey = He, (A = Te == null ? void 0 : Te.onMouseenter) === null || A === void 0 || A.call(Te, S);
      }, key: He, class: [`${n}-data-table-tr`, Y && `${n}-data-table-tr--summary`, ke && `${n}-data-table-tr--striped`, Ye && `${n}-data-table-tr--expanded`, nt, Te == null ? void 0 : Te.class], style: [Te == null ? void 0 : Te.style, Pe && { height: et }] }), re);
    };
    return this.shouldDisplayVirtualList ? c(To, { ref: "virtualListRef", items: ge, itemSize: this.minRowHeight, visibleItemsTag: Cu, visibleItemsProps: { clsPrefix: n, id: N, cols: h, onMouseleave: w }, showScrollbar: false, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemsStyle: f, itemResizable: !_, columns: h, renderItemWithCols: _ ? ({ itemIndex: ce, item: be, startColIndex: Me, endColIndex: Pe, getLeft: je }) => Ke({ displayedRowIndex: ce, isVirtual: true, isVirtualX: true, rowInfo: be, startColIndex: Me, endColIndex: Pe, getLeft: je }) : void 0 }, { default: ({ item: ce, index: be, renderedItemWithCols: Me }) => Me || Ke({ rowInfo: ce, displayedRowIndex: be, isVirtual: true, isVirtualX: false, startColIndex: 0, endColIndex: 0, getLeft(Pe) {
      return 0;
    } }) }) : c(ut, null, c("table", { class: `${n}-data-table-table`, onMouseleave: w, style: { tableLayout: this.mergedTableLayout } }, c("colgroup", null, h.map((ce) => c("col", { key: ce.key, style: ce.style }))), this.showHeader ? c(Ji, { discrete: false }) : null, this.empty ? null : c("tbody", { "data-n-id": N, class: `${n}-data-table-tbody` }, ge.map((ce, be) => Ke({ rowInfo: ce, displayedRowIndex: be, isVirtual: false, isVirtualX: false, startColIndex: -1, endColIndex: -1, getLeft(Me) {
      return -1;
    } })))), this.empty && this.xScrollable ? v() : null);
  } });
  return this.empty ? this.explicitlyScrollable || this.xScrollable ? m : c(to, { onResize: this.onResize }, { default: v }) : m;
} }), ku = le({ name: "MainTable", setup() {
  const { mergedClsPrefixRef: e, rightFixedColumnsRef: t, leftFixedColumnsRef: n, bodyWidthRef: o, maxHeightRef: r, minHeightRef: i, flexHeightRef: a, virtualScrollHeaderRef: l, syncScrollState: s, scrollXRef: d } = Ce(ft), f = D(null), v = D(null), m = D(null), g = D(!(n.value.length || t.value.length)), u = $(() => ({ maxHeight: Ge(r.value), minHeight: Ge(i.value) }));
  function h(P) {
    o.value = P.contentRect.width, s(), g.value || (g.value = true);
  }
  function p() {
    var P;
    const { value: x } = f;
    return x ? l.value ? ((P = x.virtualListRef) === null || P === void 0 ? void 0 : P.listElRef) || null : x.$el : null;
  }
  function b() {
    const { value: P } = v;
    return P ? P.getScrollContainer() : null;
  }
  const y = { getBodyElement: b, getHeaderElement: p, scrollTo(P, x) {
    var C;
    (C = v.value) === null || C === void 0 || C.scrollTo(P, x);
  } };
  return Mt(() => {
    const { value: P } = m;
    if (!P) return;
    const x = `${e.value}-data-table-base-table--transition-disabled`;
    g.value ? setTimeout(() => {
      P.classList.remove(x);
    }, 0) : P.classList.add(x);
  }), Object.assign({ maxHeight: r, mergedClsPrefix: e, selfElRef: m, headerInstRef: f, bodyInstRef: v, bodyStyle: u, flexHeight: a, handleBodyResize: h, scrollX: d }, y);
}, render() {
  const { mergedClsPrefix: e, maxHeight: t, flexHeight: n } = this, o = t === void 0 && !n;
  return c("div", { class: `${e}-data-table-base-table`, ref: "selfElRef" }, o ? null : c(Ji, { ref: "headerInstRef" }), c(Su, { ref: "bodyInstRef", bodyStyle: this.bodyStyle, showHeader: o, flexHeight: n, onResize: this.handleBodyResize }));
} }), Dr = Pu(), Ru = X([M("data-table", `
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
 `, [M("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), G("flex-height", [X(">", [M("data-table-wrapper", [X(">", [M("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [X(">", [M("data-table-base-table-body", "flex-basis: 0;", [X("&:last-child", "flex-grow: 1;")])])])])])])]), X(">", [M("data-table-loading-wrapper", `
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
 `, [Rn({ originalTransform: "translateX(-50%) translateY(-50%)" })])]), M("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), M("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), M("data-table-expand-trigger", `
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
 `, [G("expanded", [M("icon", "transform: rotate(90deg);", [jt({ originalTransform: "rotate(90deg)" })]), M("base-icon", "transform: rotate(90deg);", [jt({ originalTransform: "rotate(90deg)" })])]), M("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [jt()]), M("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [jt()]), M("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [jt()])]), M("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), M("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [M("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), G("striped", "background-color: var(--n-merged-td-color-striped);", [M("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), Ne("summary", [X("&:hover", "background-color: var(--n-merged-td-color-hover);", [X(">", [M("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), M("data-table-th", `
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
 `)]), Dr, G("selection", `
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
 `)]), M("data-table-sorter", `
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
 `, [M("base-icon", "transition: transform .3s var(--n-bezier)"), G("desc", [M("base-icon", `
 transform: rotate(0deg);
 `)]), G("asc", [M("base-icon", `
 transform: rotate(-180deg);
 `)]), G("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), M("data-table-resize-button", `
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
 `)]), M("data-table-filter", `
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
 `)])]), M("data-table-td", `
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
 `, [G("expand", [M("data-table-expand-trigger", `
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
 `), Dr]), M("data-table-empty", `
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
 `), M("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), G("loading", [M("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), G("single-column", [M("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [X("&::after, &::before", `
 bottom: 0 !important;
 `)])]), Ne("single-line", [M("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [G("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), M("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [G("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), G("bordered", [M("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), M("data-table-base-table", [G("transition-disabled", [M("data-table-th", [X("&::after, &::before", "transition: none;")]), M("data-table-td", [X("&::after, &::before", "transition: none;")])])]), G("bottom-bordered", [M("data-table-td", [G("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), M("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), M("data-table-base-table-header", `
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
 `)]), M("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), M("data-table-filter-menu", [M("scrollbar", `
 max-height: 240px;
 `), Q("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [M("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), M("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), Q("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [M("button", [X("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), X("&:last-child", `
 margin-right: 0;
 `)])]), M("divider", `
 margin: 0 !important;
 `)]), qr(M("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), Xr(M("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function Pu() {
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
function zu(e, t) {
  const { paginatedDataRef: n, treeMateRef: o, selectionColumnRef: r } = t, i = D(e.defaultCheckedRowKeys), a = $(() => {
    var C;
    const { checkedRowKeys: O } = e, T = O === void 0 ? i.value : O;
    return ((C = r.value) === null || C === void 0 ? void 0 : C.multiple) === false ? { checkedKeys: T.slice(0, 1), indeterminateKeys: [] } : o.value.getCheckedKeys(T, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded });
  }), l = $(() => a.value.checkedKeys), s = $(() => a.value.indeterminateKeys), d = $(() => new Set(l.value)), f = $(() => new Set(s.value)), v = $(() => {
    const { value: C } = d;
    return n.value.reduce((O, T) => {
      const { key: W, disabled: N } = T;
      return O + (!N && C.has(W) ? 1 : 0);
    }, 0);
  }), m = $(() => n.value.filter((C) => C.disabled).length), g = $(() => {
    const { length: C } = n.value, { value: O } = f;
    return v.value > 0 && v.value < C - m.value || n.value.some((T) => O.has(T.key));
  }), u = $(() => {
    const { length: C } = n.value;
    return v.value !== 0 && v.value === C - m.value;
  }), h = $(() => n.value.length === 0);
  function p(C, O, T) {
    const { "onUpdate:checkedRowKeys": W, onUpdateCheckedRowKeys: N, onCheckedRowKeysChange: K } = e, q = [], { value: { getNode: I } } = o;
    C.forEach((w) => {
      var k;
      const R = (k = I(w)) === null || k === void 0 ? void 0 : k.rawNode;
      q.push(R);
    }), W && ne(W, C, q, { row: O, action: T }), N && ne(N, C, q, { row: O, action: T }), K && ne(K, C, q, { row: O, action: T }), i.value = C;
  }
  function b(C, O = false, T) {
    if (!e.loading) {
      if (O) {
        p(Array.isArray(C) ? C.slice(0, 1) : [C], T, "check");
        return;
      }
      p(o.value.check(C, l.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, T, "check");
    }
  }
  function y(C, O) {
    e.loading || p(o.value.uncheck(C, l.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, O, "uncheck");
  }
  function P(C = false) {
    const { value: O } = r;
    if (!O || e.loading) return;
    const T = [];
    (C ? o.value.treeNodes : n.value).forEach((W) => {
      W.disabled || T.push(W.key);
    }), p(o.value.check(T, l.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "checkAll");
  }
  function x(C = false) {
    const { value: O } = r;
    if (!O || e.loading) return;
    const T = [];
    (C ? o.value.treeNodes : n.value).forEach((W) => {
      W.disabled || T.push(W.key);
    }), p(o.value.uncheck(T, l.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "uncheckAll");
  }
  return { mergedCheckedRowKeySetRef: d, mergedCheckedRowKeysRef: l, mergedInderminateRowKeySetRef: f, someRowsCheckedRef: g, allRowsCheckedRef: u, headerCheckboxDisabledRef: h, doUpdateCheckedRowKeys: p, doCheckAll: P, doUncheckAll: x, doCheck: b, doUncheck: y };
}
function Fu(e, t) {
  const n = ze(() => {
    for (const d of e.columns) if (d.type === "expand") return d.renderExpand;
  }), o = ze(() => {
    let d;
    for (const f of e.columns) if (f.type === "expand") {
      d = f.expandable;
      break;
    }
    return d;
  }), r = D(e.defaultExpandAll ? (n == null ? void 0 : n.value) ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((f) => {
      var v;
      !((v = o.value) === null || v === void 0) && v.call(o, f.rawNode) && d.push(f.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = oe(e, "expandedRowKeys"), a = oe(e, "stickyExpandedRows"), l = tt(i, r);
  function s(d) {
    const { onUpdateExpandedRowKeys: f, "onUpdate:expandedRowKeys": v } = e;
    f && ne(f, d), v && ne(v, d), r.value = d;
  }
  return { stickyExpandedRowsRef: a, mergedExpandedRowKeysRef: l, renderExpandRef: n, expandableRef: o, doUpdateExpandedRowKeys: s };
}
function $u(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let a = -1, l = 0, s = false, d = 0;
  function f(m, g) {
    g > a && (n[g] = [], a = g), m.forEach((u) => {
      if ("children" in u) f(u.children, g + 1);
      else {
        const h = "key" in u ? u.key : void 0;
        o.push({ key: ct(u), style: Mc(u, h !== void 0 ? Ge(t(h)) : void 0), column: u, index: d++, width: u.width === void 0 ? 128 : Number(u.width) }), l += 1, s || (s = !!u.ellipsis), r.push(u);
      }
    });
  }
  f(e, 0), d = 0;
  function v(m, g) {
    let u = 0;
    m.forEach((h) => {
      var p;
      if ("children" in h) {
        const b = d, y = { column: h, colIndex: d, colSpan: 0, rowSpan: 1, isLast: false };
        v(h.children, g + 1), h.children.forEach((P) => {
          var x, C;
          y.colSpan += (C = (x = i.get(P)) === null || x === void 0 ? void 0 : x.colSpan) !== null && C !== void 0 ? C : 0;
        }), b + y.colSpan === l && (y.isLast = true), i.set(h, y), n[g].push(y);
      } else {
        if (d < u) {
          d += 1;
          return;
        }
        let b = 1;
        "titleColSpan" in h && (b = (p = h.titleColSpan) !== null && p !== void 0 ? p : 1), b > 1 && (u = d + b);
        const y = d + b === l, P = { column: h, colSpan: b, colIndex: d, rowSpan: a - g + 1, isLast: y };
        i.set(h, P), n[g].push(P), d += 1;
      }
    });
  }
  return v(e, 0), { hasEllipsis: s, rows: n, cols: o, dataRelatedCols: r };
}
function Mu(e, t) {
  const n = $(() => $u(e.columns, t));
  return { rowsRef: $(() => n.value.rows), colsRef: $(() => n.value.cols), hasEllipsisRef: $(() => n.value.hasEllipsis), dataRelatedColsRef: $(() => n.value.dataRelatedCols) };
}
function Tu() {
  const e = D({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    Di(r) && "key" in r && (e.value[r.key] = i);
  }
  function o() {
    e.value = {};
  }
  return { getResizableWidth: t, doUpdateResizableWidth: n, clearResizableWidth: o };
}
function Ou(e, { mainTableInstRef: t, mergedCurrentPageRef: n, bodyWidthRef: o, maxHeightRef: r, mergedTableLayoutRef: i }) {
  const a = $(() => e.scrollX !== void 0 || r.value !== void 0 || e.flexHeight), l = $(() => {
    const w = !a.value && i.value === "auto";
    return e.scrollX !== void 0 || w;
  });
  let s = 0;
  const d = D(), f = D(null), v = D([]), m = D(null), g = D([]), u = $(() => Ge(e.scrollX)), h = $(() => e.columns.filter((w) => w.fixed === "left")), p = $(() => e.columns.filter((w) => w.fixed === "right")), b = $(() => {
    const w = {};
    let k = 0;
    function R(B) {
      B.forEach((F) => {
        const L = { start: k, end: 0 };
        w[ct(F)] = L, "children" in F ? (R(F.children), L.end = k) : (k += Br(F) || 0, L.end = k);
      });
    }
    return R(h.value), w;
  }), y = $(() => {
    const w = {};
    let k = 0;
    function R(B) {
      for (let F = B.length - 1; F >= 0; --F) {
        const L = B[F], V = { start: k, end: 0 };
        w[ct(L)] = V, "children" in L ? (R(L.children), V.end = k) : (k += Br(L) || 0, V.end = k);
      }
    }
    return R(p.value), w;
  });
  function P() {
    var w, k;
    const { value: R } = h;
    let B = 0;
    const { value: F } = b;
    let L = null;
    for (let V = 0; V < R.length; ++V) {
      const Z = ct(R[V]);
      if (s > (((w = F[Z]) === null || w === void 0 ? void 0 : w.start) || 0) - B) L = Z, B = ((k = F[Z]) === null || k === void 0 ? void 0 : k.end) || 0;
      else break;
    }
    f.value = L;
  }
  function x() {
    v.value = [];
    let w = e.columns.find((k) => ct(k) === f.value);
    for (; w && "children" in w; ) {
      const k = w.children.length;
      if (k === 0) break;
      const R = w.children[k - 1];
      v.value.push(ct(R)), w = R;
    }
  }
  function C() {
    var w, k;
    const { value: R } = p, B = Number(e.scrollX), { value: F } = o;
    if (F === null) return;
    let L = 0, V = null;
    const { value: Z } = y;
    for (let _ = R.length - 1; _ >= 0; --_) {
      const j = ct(R[_]);
      if (Math.round(s + (((w = Z[j]) === null || w === void 0 ? void 0 : w.start) || 0) + F - L) < B) V = j, L = ((k = Z[j]) === null || k === void 0 ? void 0 : k.end) || 0;
      else break;
    }
    m.value = V;
  }
  function O() {
    g.value = [];
    let w = e.columns.find((k) => ct(k) === m.value);
    for (; w && "children" in w && w.children.length; ) {
      const k = w.children[0];
      g.value.push(ct(k)), w = k;
    }
  }
  function T() {
    const w = t.value ? t.value.getHeaderElement() : null, k = t.value ? t.value.getBodyElement() : null;
    return { header: w, body: k };
  }
  function W() {
    const { body: w } = T();
    w && (w.scrollTop = 0);
  }
  function N() {
    d.value !== "body" ? vn(q) : d.value = void 0;
  }
  function K(w) {
    var k;
    (k = e.onScroll) === null || k === void 0 || k.call(e, w), d.value !== "head" ? vn(q) : d.value = void 0;
  }
  function q() {
    const { header: w, body: k } = T();
    if (!k) return;
    const { value: R } = o;
    if (R !== null) {
      if (w) {
        const B = s - w.scrollLeft;
        d.value = B !== 0 ? "head" : "body", d.value === "head" ? (s = w.scrollLeft, k.scrollLeft = s) : (s = k.scrollLeft, w.scrollLeft = s);
      } else s = k.scrollLeft;
      P(), x(), C(), O();
    }
  }
  function I(w) {
    const { header: k } = T();
    k && (k.scrollLeft = w, q());
  }
  return Ee(n, () => {
    W();
  }), { styleScrollXRef: u, fixedColumnLeftMapRef: b, fixedColumnRightMapRef: y, leftFixedColumnsRef: h, rightFixedColumnsRef: p, leftActiveFixedColKeyRef: f, leftActiveFixedChildrenColKeysRef: v, rightActiveFixedColKeyRef: m, rightActiveFixedChildrenColKeysRef: g, syncScrollState: q, handleTableBodyScroll: K, handleTableHeaderScroll: N, setHeaderScrollLeft: I, explicitlyScrollableRef: a, xScrollableRef: l };
}
function cn(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : false;
}
function Iu(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? Bu(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : false;
}
function Bu(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function _u(e, { dataRelatedColsRef: t, filteredDataRef: n }) {
  const o = [];
  t.value.forEach((g) => {
    var u;
    g.sorter !== void 0 && m(o, { columnKey: g.key, sorter: g.sorter, order: (u = g.defaultSortOrder) !== null && u !== void 0 ? u : false });
  });
  const r = D(o), i = $(() => {
    const g = t.value.filter((p) => p.type !== "selection" && p.sorter !== void 0 && (p.sortOrder === "ascend" || p.sortOrder === "descend" || p.sortOrder === false)), u = g.filter((p) => p.sortOrder !== false);
    if (u.length) return u.map((p) => ({ columnKey: p.key, order: p.sortOrder, sorter: p.sorter }));
    if (g.length) return [];
    const { value: h } = r;
    return Array.isArray(h) ? h : h ? [h] : [];
  }), a = $(() => {
    const g = i.value.slice().sort((u, h) => {
      const p = cn(u.sorter) || 0;
      return (cn(h.sorter) || 0) - p;
    });
    return g.length ? n.value.slice().sort((h, p) => {
      let b = 0;
      return g.some((y) => {
        const { columnKey: P, sorter: x, order: C } = y, O = Iu(x, P);
        return O && C && (b = O(h.rawNode, p.rawNode), b !== 0) ? (b = b * Fc(C), true) : false;
      }), b;
    }) : n.value;
  });
  function l(g) {
    let u = i.value.slice();
    return g && cn(g.sorter) !== false ? (u = u.filter((h) => cn(h.sorter) !== false), m(u, g), u) : g || null;
  }
  function s(g) {
    const u = l(g);
    d(u);
  }
  function d(g) {
    const { "onUpdate:sorter": u, onUpdateSorter: h, onSorterChange: p } = e;
    u && ne(u, g), h && ne(h, g), p && ne(p, g), r.value = g;
  }
  function f(g, u = "ascend") {
    if (!g) v();
    else {
      const h = t.value.find((b) => b.type !== "selection" && b.type !== "expand" && b.key === g);
      if (!(h == null ? void 0 : h.sorter)) return;
      const p = h.sorter;
      s({ columnKey: g, sorter: p, order: u });
    }
  }
  function v() {
    d(null);
  }
  function m(g, u) {
    const h = g.findIndex((p) => (u == null ? void 0 : u.columnKey) && p.columnKey === u.columnKey);
    h !== void 0 && h >= 0 ? g[h] = u : g.push(u);
  }
  return { clearSorter: v, sort: f, sortedDataRef: a, mergedSortStateRef: i, deriveNextSorter: s };
}
function Au(e, { dataRelatedColsRef: t }) {
  const n = $(() => {
    const _ = (j) => {
      for (let ee = 0; ee < j.length; ++ee) {
        const z = j[ee];
        if ("children" in z) return _(z.children);
        if (z.type === "selection") return z;
      }
      return null;
    };
    return _(e.columns);
  }), o = $(() => {
    const { childrenKey: _ } = e;
    return kn(e.data, { ignoreEmptyChildren: true, getKey: e.rowKey, getChildren: (j) => j[_], getDisabled: (j) => {
      var ee, z;
      return !!(!((z = (ee = n.value) === null || ee === void 0 ? void 0 : ee.disabled) === null || z === void 0) && z.call(ee, j));
    } });
  }), r = ze(() => {
    const { columns: _ } = e, { length: j } = _;
    let ee = null;
    for (let z = 0; z < j; ++z) {
      const E = _[z];
      if (!E.type && ee === null && (ee = z), "tree" in E && E.tree) return z;
    }
    return ee || 0;
  }), i = D({}), { pagination: a } = e, l = D(a && a.defaultPage || 1), s = D(Bi(a)), d = $(() => {
    const _ = t.value.filter((z) => z.filterOptionValues !== void 0 || z.filterOptionValue !== void 0), j = {};
    return _.forEach((z) => {
      var E;
      z.type === "selection" || z.type === "expand" || (z.filterOptionValues === void 0 ? j[z.key] = (E = z.filterOptionValue) !== null && E !== void 0 ? E : null : j[z.key] = z.filterOptionValues);
    }), Object.assign(_r(i.value), j);
  }), f = $(() => {
    const _ = d.value, { columns: j } = e;
    function ee(ue) {
      return (me, ge) => !!~String(ge[ue]).indexOf(String(me));
    }
    const { value: { treeNodes: z } } = o, E = [];
    return j.forEach((ue) => {
      ue.type === "selection" || ue.type === "expand" || "children" in ue || E.push([ue.key, ue]);
    }), z ? z.filter((ue) => {
      const { rawNode: me } = ue;
      for (const [ge, se] of E) {
        let H = _[ge];
        if (H == null || (Array.isArray(H) || (H = [H]), !H.length)) continue;
        const de = se.filter === "default" ? ee(ge) : se.filter;
        if (se && typeof de == "function") if (se.filterMode === "and") {
          if (H.some((Se) => !de(Se, me))) return false;
        } else {
          if (H.some((Se) => de(Se, me))) continue;
          return false;
        }
      }
      return true;
    }) : [];
  }), { sortedDataRef: v, deriveNextSorter: m, mergedSortStateRef: g, sort: u, clearSorter: h } = _u(e, { dataRelatedColsRef: t, filteredDataRef: f });
  t.value.forEach((_) => {
    var j;
    if (_.filter) {
      const ee = _.defaultFilterOptionValues;
      _.filterMultiple ? i.value[_.key] = ee || [] : ee !== void 0 ? i.value[_.key] = ee === null ? [] : ee : i.value[_.key] = (j = _.defaultFilterOptionValue) !== null && j !== void 0 ? j : null;
    }
  });
  const p = $(() => {
    const { pagination: _ } = e;
    if (_ !== false) return _.page;
  }), b = $(() => {
    const { pagination: _ } = e;
    if (_ !== false) return _.pageSize;
  }), y = tt(p, l), P = tt(b, s), x = ze(() => {
    const _ = y.value;
    return e.remote ? _ : Math.max(1, Math.min(Math.ceil(f.value.length / P.value), _));
  }), C = $(() => {
    const { pagination: _ } = e;
    if (_) {
      const { pageCount: j } = _;
      if (j !== void 0) return j;
    }
  }), O = $(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return v.value;
    const _ = P.value, j = (x.value - 1) * _;
    return v.value.slice(j, j + _);
  }), T = $(() => O.value.map((_) => _.rawNode));
  function W(_) {
    const { pagination: j } = e;
    if (j) {
      const { onChange: ee, "onUpdate:page": z, onUpdatePage: E } = j;
      ee && ne(ee, _), E && ne(E, _), z && ne(z, _), I(_);
    }
  }
  function N(_) {
    const { pagination: j } = e;
    if (j) {
      const { onPageSizeChange: ee, "onUpdate:pageSize": z, onUpdatePageSize: E } = j;
      ee && ne(ee, _), E && ne(E, _), z && ne(z, _), w(_);
    }
  }
  const K = $(() => {
    if (e.remote) {
      const { pagination: _ } = e;
      if (_) {
        const { itemCount: j } = _;
        if (j !== void 0) return j;
      }
      return;
    }
    return f.value.length;
  }), q = $(() => Object.assign(Object.assign({}, e.pagination), { onChange: void 0, onUpdatePage: void 0, onUpdatePageSize: void 0, onPageSizeChange: void 0, "onUpdate:page": W, "onUpdate:pageSize": N, page: x.value, pageSize: P.value, pageCount: K.value === void 0 ? C.value : void 0, itemCount: K.value }));
  function I(_) {
    const { "onUpdate:page": j, onPageChange: ee, onUpdatePage: z } = e;
    z && ne(z, _), j && ne(j, _), ee && ne(ee, _), l.value = _;
  }
  function w(_) {
    const { "onUpdate:pageSize": j, onPageSizeChange: ee, onUpdatePageSize: z } = e;
    ee && ne(ee, _), z && ne(z, _), j && ne(j, _), s.value = _;
  }
  function k(_, j) {
    const { onUpdateFilters: ee, "onUpdate:filters": z, onFiltersChange: E } = e;
    ee && ne(ee, _, j), z && ne(z, _, j), E && ne(E, _, j), i.value = _;
  }
  function R(_, j, ee, z) {
    var E;
    (E = e.onUnstableColumnResize) === null || E === void 0 || E.call(e, _, j, ee, z);
  }
  function B(_) {
    I(_);
  }
  function F() {
    L();
  }
  function L() {
    V({});
  }
  function V(_) {
    Z(_);
  }
  function Z(_) {
    _ ? _ && (i.value = _r(_)) : i.value = {};
  }
  return { treeMateRef: o, mergedCurrentPageRef: x, mergedPaginationRef: q, paginatedDataRef: O, rawPaginatedDataRef: T, mergedFilterStateRef: d, mergedSortStateRef: g, hoverKeyRef: D(null), selectionColumnRef: n, childTriggerColIndexRef: r, doUpdateFilters: k, deriveNextSorter: m, doUpdatePageSize: w, doUpdatePage: I, onUnstableColumnResize: R, filter: Z, filters: V, clearFilter: F, clearFilters: L, clearSorter: h, page: B, sort: u };
}
const Wu = le({ name: "DataTable", alias: ["AdvancedTable"], props: Pc, slots: Object, setup(e, { slots: t }) {
  const { mergedBorderedRef: n, mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: i, mergedComponentPropsRef: a } = Oe(e), l = wt("DataTable", i, o), s = $(() => {
    var J, ie;
    return e.size || ((ie = (J = a == null ? void 0 : a.value) === null || J === void 0 ? void 0 : J.DataTable) === null || ie === void 0 ? void 0 : ie.size) || "medium";
  }), d = $(() => {
    const { bottomBordered: J } = e;
    return n.value ? false : J !== void 0 ? J : true;
  }), f = xe("DataTable", "-data-table", Ru, Rc, e, o), v = D(null), m = D(null), { getResizableWidth: g, clearResizableWidth: u, doUpdateResizableWidth: h } = Tu(), { rowsRef: p, colsRef: b, dataRelatedColsRef: y, hasEllipsisRef: P } = Mu(e, g), { treeMateRef: x, mergedCurrentPageRef: C, paginatedDataRef: O, rawPaginatedDataRef: T, selectionColumnRef: W, hoverKeyRef: N, mergedPaginationRef: K, mergedFilterStateRef: q, mergedSortStateRef: I, childTriggerColIndexRef: w, doUpdatePage: k, doUpdateFilters: R, onUnstableColumnResize: B, deriveNextSorter: F, filter: L, filters: V, clearFilter: Z, clearFilters: _, clearSorter: j, page: ee, sort: z } = Au(e, { dataRelatedColsRef: y }), E = (J) => {
    const { fileName: ie = "data.csv", keepOriginalData: ae = false } = J || {}, ve = ae ? e.data : T.value, Fe = Bc(e.columns, ve, e.getCsvCell, e.getCsvHeader), ht = new Blob([Fe], { type: "text/csv;charset=utf-8" }), st = URL.createObjectURL(ht);
    Ra(st, ie.endsWith(".csv") ? ie : `${ie}.csv`), URL.revokeObjectURL(st);
  }, { doCheckAll: ue, doUncheckAll: me, doCheck: ge, doUncheck: se, headerCheckboxDisabledRef: H, someRowsCheckedRef: de, allRowsCheckedRef: Se, mergedCheckedRowKeySetRef: we, mergedInderminateRowKeySetRef: $e } = zu(e, { selectionColumnRef: W, treeMateRef: x, paginatedDataRef: O }), { stickyExpandedRowsRef: De, mergedExpandedRowKeysRef: Ke, renderExpandRef: ce, expandableRef: be, doUpdateExpandedRowKeys: Me } = Fu(e, x), Pe = oe(e, "maxHeight"), je = $(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || P.value ? "fixed" : e.tableLayout), { handleTableBodyScroll: qe, handleTableHeaderScroll: _e, syncScrollState: U, setHeaderScrollLeft: Y, leftActiveFixedColKeyRef: ke, leftActiveFixedChildrenColKeysRef: at, rightActiveFixedColKeyRef: He, rightActiveFixedChildrenColKeysRef: Ie, leftFixedColumnsRef: Ye, rightFixedColumnsRef: Te, fixedColumnLeftMapRef: nt, fixedColumnRightMapRef: ot, xScrollableRef: et, explicitlyScrollableRef: re } = Ou(e, { bodyWidthRef: v, mainTableInstRef: m, mergedCurrentPageRef: C, maxHeightRef: Pe, mergedTableLayoutRef: je }), { localeRef: he } = wn("DataTable");
  Le(ft, { xScrollableRef: et, explicitlyScrollableRef: re, props: e, treeMateRef: x, renderExpandIconRef: oe(e, "renderExpandIcon"), loadingKeySetRef: D(/* @__PURE__ */ new Set()), slots: t, indentRef: oe(e, "indent"), childTriggerColIndexRef: w, bodyWidthRef: v, componentId: bo(), hoverKeyRef: N, mergedClsPrefixRef: o, mergedThemeRef: f, scrollXRef: $(() => e.scrollX), rowsRef: p, colsRef: b, paginatedDataRef: O, leftActiveFixedColKeyRef: ke, leftActiveFixedChildrenColKeysRef: at, rightActiveFixedColKeyRef: He, rightActiveFixedChildrenColKeysRef: Ie, leftFixedColumnsRef: Ye, rightFixedColumnsRef: Te, fixedColumnLeftMapRef: nt, fixedColumnRightMapRef: ot, mergedCurrentPageRef: C, someRowsCheckedRef: de, allRowsCheckedRef: Se, mergedSortStateRef: I, mergedFilterStateRef: q, loadingRef: oe(e, "loading"), rowClassNameRef: oe(e, "rowClassName"), mergedCheckedRowKeySetRef: we, mergedExpandedRowKeysRef: Ke, mergedInderminateRowKeySetRef: $e, localeRef: he, expandableRef: be, stickyExpandedRowsRef: De, rowKeyRef: oe(e, "rowKey"), renderExpandRef: ce, summaryRef: oe(e, "summary"), virtualScrollRef: oe(e, "virtualScroll"), virtualScrollXRef: oe(e, "virtualScrollX"), heightForRowRef: oe(e, "heightForRow"), minRowHeightRef: oe(e, "minRowHeight"), virtualScrollHeaderRef: oe(e, "virtualScrollHeader"), headerHeightRef: oe(e, "headerHeight"), rowPropsRef: oe(e, "rowProps"), stripedRef: oe(e, "striped"), checkOptionsRef: $(() => {
    const { value: J } = W;
    return J == null ? void 0 : J.options;
  }), rawPaginatedDataRef: T, filterMenuCssVarsRef: $(() => {
    const { self: { actionDividerColor: J, actionPadding: ie, actionButtonMargin: ae } } = f.value;
    return { "--n-action-padding": ie, "--n-action-button-margin": ae, "--n-action-divider-color": J };
  }), onLoadRef: oe(e, "onLoad"), mergedTableLayoutRef: je, maxHeightRef: Pe, minHeightRef: oe(e, "minHeight"), flexHeightRef: oe(e, "flexHeight"), headerCheckboxDisabledRef: H, paginationBehaviorOnFilterRef: oe(e, "paginationBehaviorOnFilter"), summaryPlacementRef: oe(e, "summaryPlacement"), filterIconPopoverPropsRef: oe(e, "filterIconPopoverProps"), scrollbarPropsRef: oe(e, "scrollbarProps"), syncScrollState: U, doUpdatePage: k, doUpdateFilters: R, getResizableWidth: g, onUnstableColumnResize: B, clearResizableWidth: u, doUpdateResizableWidth: h, deriveNextSorter: F, doCheck: ge, doUncheck: se, doCheckAll: ue, doUncheckAll: me, doUpdateExpandedRowKeys: Me, handleTableHeaderScroll: _e, handleTableBodyScroll: qe, setHeaderScrollLeft: Y, renderCell: oe(e, "renderCell") });
  const S = { filter: L, filters: V, clearFilters: _, clearSorter: j, page: ee, sort: z, clearFilter: Z, downloadCsv: E, scrollTo: (J, ie) => {
    var ae;
    (ae = m.value) === null || ae === void 0 || ae.scrollTo(J, ie);
  } }, A = $(() => {
    const J = s.value, { common: { cubicBezierEaseInOut: ie }, self: { borderColor: ae, tdColorHover: ve, tdColorSorting: Fe, tdColorSortingModal: ht, tdColorSortingPopover: st, thColorSorting: vt, thColorSortingModal: pt, thColorSortingPopover: Ot, thColor: It, thColorHover: gt, tdColor: Pt, tdTextColor: Bt, thTextColor: dt, thFontWeight: Et, thButtonColorHover: Yt, thIconColor: Ve, thIconColorActive: Je, filterSize: zn, borderRadius: Fn, lineHeight: $n, tdColorModal: Mn, thColorModal: Tn, borderColorModal: On, thColorHoverModal: In, tdColorHoverModal: Bn, borderColorPopover: _n, thColorPopover: An, tdColorPopover: En, tdColorHoverPopover: Lt, thColorHoverPopover: Nt, paginationMargin: Qi, emptyPadding: el, boxShadowAfter: tl, boxShadowBefore: nl, sorterSize: ol, resizableContainerSize: rl, resizableSize: il, loadingColor: ll, loadingSize: al, opacityLoading: sl, tdColorStriped: dl, tdColorStripedModal: cl, tdColorStripedPopover: ul, [pe("fontSize", J)]: fl, [pe("thPadding", J)]: hl, [pe("tdPadding", J)]: vl } } = f.value;
    return { "--n-font-size": fl, "--n-th-padding": hl, "--n-td-padding": vl, "--n-bezier": ie, "--n-border-radius": Fn, "--n-line-height": $n, "--n-border-color": ae, "--n-border-color-modal": On, "--n-border-color-popover": _n, "--n-th-color": It, "--n-th-color-hover": gt, "--n-th-color-modal": Tn, "--n-th-color-hover-modal": In, "--n-th-color-popover": An, "--n-th-color-hover-popover": Nt, "--n-td-color": Pt, "--n-td-color-hover": ve, "--n-td-color-modal": Mn, "--n-td-color-hover-modal": Bn, "--n-td-color-popover": En, "--n-td-color-hover-popover": Lt, "--n-th-text-color": dt, "--n-td-text-color": Bt, "--n-th-font-weight": Et, "--n-th-button-color-hover": Yt, "--n-th-icon-color": Ve, "--n-th-icon-color-active": Je, "--n-filter-size": zn, "--n-pagination-margin": Qi, "--n-empty-padding": el, "--n-box-shadow-before": nl, "--n-box-shadow-after": tl, "--n-sorter-size": ol, "--n-resizable-container-size": rl, "--n-resizable-size": il, "--n-loading-size": al, "--n-loading-color": ll, "--n-opacity-loading": sl, "--n-td-color-striped": dl, "--n-td-color-striped-modal": cl, "--n-td-color-striped-popover": ul, "--n-td-color-sorting": Fe, "--n-td-color-sorting-modal": ht, "--n-td-color-sorting-popover": st, "--n-th-color-sorting": vt, "--n-th-color-sorting-modal": pt, "--n-th-color-sorting-popover": Ot };
  }), te = r ? Qe("data-table", $(() => s.value[0]), A, e) : void 0, fe = $(() => {
    if (!e.pagination) return false;
    if (e.paginateSinglePage) return true;
    const J = K.value, { pageCount: ie } = J;
    return ie !== void 0 ? ie > 1 : J.itemCount && J.pageSize && J.itemCount > J.pageSize;
  });
  return Object.assign({ mainTableInstRef: m, mergedClsPrefix: o, rtlEnabled: l, mergedTheme: f, paginatedData: O, mergedBordered: n, mergedBottomBordered: d, mergedPagination: K, mergedShowPagination: fe, cssVars: r ? void 0 : A, themeClass: te == null ? void 0 : te.themeClass, onRender: te == null ? void 0 : te.onRender }, S);
}, render() {
  const { mergedClsPrefix: e, themeClass: t, onRender: n, $slots: o, spinProps: r } = this;
  return n == null ? void 0 : n(), c("div", { class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, { [`${e}-data-table--bordered`]: this.mergedBordered, [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered, [`${e}-data-table--single-line`]: this.singleLine, [`${e}-data-table--single-column`]: this.singleColumn, [`${e}-data-table--loading`]: this.loading, [`${e}-data-table--flex-height`]: this.flexHeight }], style: this.cssVars }, c("div", { class: `${e}-data-table-wrapper` }, c(ku, { ref: "mainTableInstRef" })), this.mergedShowPagination ? c("div", { class: `${e}-data-table__pagination` }, c(gc, Object.assign({ theme: this.mergedTheme.peers.Pagination, themeOverrides: this.mergedTheme.peerOverrides.Pagination, disabled: this.loading }, this.mergedPagination))) : null, c(on, { name: "fade-in-scale-up-transition" }, { default: () => this.loading ? c("div", { class: `${e}-data-table-loading-wrapper` }, Cn(o.loading, () => [c(xo, Object.assign({ clsPrefix: e, strokeWidth: 20 }, r))])) : null }));
} });
export {
  zo as B,
  ka as F,
  ua as L,
  Xn as N,
  To as V,
  cc as _,
  Wu as a,
  Po as b,
  pn as c,
  Ro as d,
  ju as e,
  Rn as f,
  Uu as g,
  ea as h,
  ta as i,
  Hu as j,
  qs as k,
  Fo as l,
  Ku as m,
  Mo as n,
  xr as o,
  Sn as p,
  yr as q,
  Cr as r,
  wr as s,
  mt as t,
  ra as u,
  za as v,
  lt as w,
  li as z
};
