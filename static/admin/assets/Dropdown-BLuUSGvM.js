import { r as z, ad as et, w as ee, b4 as Zt, o as Ce, ag as ce, af as Ln, ah as U, ae as X, b9 as Kn, ai as te, i as Z, aB as oe, B as Xt, M as Ae, ba as qt, d as R, a8 as Q, aq as ze, bb as Dn, j as x, bc as Wn, a as N, t as G, aJ as Yt, aw as Jt, au as Qt, bd as jn, aU as Rn, ax as tt, ao as $e, be as Be, bf as Fe, bg as Hn, bh as Gn, bi as ct, bj as Un, bk as ge, bl as ye, bm as nt, bn as en, bo as Vn, bp as wt, bq as Zn, br as xt, bs as St, bt as Ee, bu as Xn, bv as $t, bw as qn, bx as Yn, by as Jn, bz as Qn, bA as er, bB as tr, bC as nr, e as D, b5 as rr, f as K, H as xe, h as J, g as V, bD as or, T as tn, k as Le, l as ie, _ as ir, R as nn, m as ft, bE as ar, X as Ke, bF as rn, as as sr, ap as lr, bG as dr, at as on, bH as ur, al as Ie, bI as cr, bJ as fr, J as de } from "./index-w60up3r6.js";
import { b as hr, t as ht, d as an, g as pr, e as vr, f as Me } from "./Button-B26OUYFO.js";
import { i as Ct, r as He, a as sn, c as ue } from "./use-form-item-beXUzR1J.js";
import { u as gr } from "./use-compitable-D7US21yc.js";
let ke = [];
const ln = /* @__PURE__ */ new WeakMap();
function br() {
  ke.forEach((e) => e(...ln.get(e))), ke = [];
}
function yr(e, ...t) {
  ln.set(e, t), !ke.includes(e) && ke.push(e) === 1 && requestAnimationFrame(br);
}
function At(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0) return true;
    n = n.parentElement;
  }
  return false;
}
function mr(e) {
  const t = z(!!e.value);
  if (t.value) return et(t);
  const n = ee(e, (r) => {
    r && (t.value = true, n());
  });
  return et(t);
}
function wr() {
  return Zt() !== null;
}
const xr = typeof window < "u";
let ve, Se;
const Sr = () => {
  var e, t;
  ve = xr ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Se = false, ve !== void 0 ? ve.then(() => {
    Se = true;
  }) : Se = true;
};
Sr();
function $r(e) {
  if (Se) return;
  let t = false;
  Ce(() => {
    Se || (ve == null ? void 0 : ve.then(() => {
      t || e();
    }));
  }), ce(() => {
    t = true;
  });
}
function Cr(e = {}, t) {
  const n = Kn({ ctrl: false, command: false, win: false, shift: false, tab: false }), { keydown: r, keyup: o } = e, i = (s) => {
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
    r !== void 0 && Object.keys(r).forEach((c) => {
      if (c !== s.key) return;
      const d = r[c];
      if (typeof d == "function") d(s);
      else {
        const { stop: h = false, prevent: f = false } = d;
        h && s.stopPropagation(), f && s.preventDefault(), d.handler(s);
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
    o !== void 0 && Object.keys(o).forEach((c) => {
      if (c !== s.key) return;
      const d = o[c];
      if (typeof d == "function") d(s);
      else {
        const { stop: h = false, prevent: f = false } = d;
        h && s.stopPropagation(), f && s.preventDefault(), d.handler(s);
      }
    });
  }, l = () => {
    (t === void 0 || t.value) && (X("keydown", document, i), X("keyup", document, a)), t !== void 0 && ee(t, (s) => {
      s ? (X("keydown", document, i), X("keyup", document, a)) : (U("keydown", document, i), U("keyup", document, a));
    });
  };
  return wr() ? (Ln(l), ce(() => {
    (t === void 0 || t.value) && (U("keydown", document, i), U("keyup", document, a));
  })) : l(), et(n);
}
const ta = te("n-internal-select-menu"), Ar = te("n-internal-select-menu-body"), pt = te("n-drawer-body"), vt = te("n-modal-body"), na = te("n-modal-provider"), ra = te("n-modal"), De = te("n-popover-body"), dn = "__disabled__";
function be(e) {
  const t = Z(vt, null), n = Z(pt, null), r = Z(De, null), o = Z(Ar, null), i = z();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    Ce(() => {
      X("fullscreenchange", document, a);
    }), ce(() => {
      U("fullscreenchange", document, a);
    });
  }
  return oe(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === false ? dn : l === true ? i.value || "body" : l : (t == null ? void 0 : t.value) ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : (n == null ? void 0 : n.value) ? n.value : (r == null ? void 0 : r.value) ? r.value : (o == null ? void 0 : o.value) ? o.value : l ?? (i.value || "body");
  });
}
be.tdkey = dn;
be.propTo = { type: [String, Object, Boolean], default: void 0 };
function Pr(e, t, n) {
  const r = z(e.value);
  let o = null;
  return ee(e, (i) => {
    o !== null && window.clearTimeout(o), i === true ? n && !n.value ? r.value = true : o = window.setTimeout(() => {
      r.value = true;
    }, t) : r.value = false;
  }), r;
}
function rt(e, t, n = "default") {
  const r = t[n];
  if (r === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return r();
}
function ot(e, t = true, n = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && n.push(Xt(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        ot(r, t, n);
        return;
      }
      if (r.type === Ae) {
        if (r.children === null) return;
        Array.isArray(r.children) && ot(r.children, t, n);
      } else r.type !== qt && n.push(r);
    }
  }), n;
}
function Pt(e, t, n = "default") {
  const r = t[n];
  if (r === void 0) throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const o = ot(r());
  if (o.length === 1) return o[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let ae = null;
function un() {
  if (ae === null && (ae = document.getElementById("v-binder-view-measurer"), ae === null)) {
    ae = document.createElement("div"), ae.id = "v-binder-view-measurer";
    const { style: e } = ae;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(ae);
  }
  return ae.getBoundingClientRect();
}
function Or(e, t) {
  const n = un();
  return { top: t, left: e, height: 0, width: 0, right: n.width - e, bottom: n.height - t };
}
function Ge(e) {
  const t = e.getBoundingClientRect(), n = un();
  return { left: t.left - n.left, top: t.top - n.top, bottom: n.height + n.top - t.bottom, right: n.width + n.left - t.right, width: t.width, height: t.height };
}
function Er(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function cn(e) {
  if (e === null) return null;
  const t = Er(e);
  if (t === null) return null;
  if (t.nodeType === 9) return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: r, overflowY: o } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + o + r)) return t;
  }
  return cn(t);
}
const fn = R({ name: "Binder", props: { syncTargetWithParent: Boolean, syncTarget: { type: Boolean, default: true } }, setup(e) {
  var t;
  Q("VBinder", (t = Zt()) === null || t === void 0 ? void 0 : t.proxy);
  const n = Z("VBinder", null), r = z(null), o = (u) => {
    r.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
  };
  let i = [];
  const a = () => {
    let u = r.value;
    for (; u = cn(u), u !== null; ) i.push(u);
    for (const $ of i) X("scroll", $, h, true);
  }, l = () => {
    for (const u of i) U("scroll", u, h, true);
    i = [];
  }, s = /* @__PURE__ */ new Set(), c = (u) => {
    s.size === 0 && a(), s.has(u) || s.add(u);
  }, d = (u) => {
    s.has(u) && s.delete(u), s.size === 0 && l();
  }, h = () => {
    yr(f);
  }, f = () => {
    s.forEach((u) => u());
  }, g = /* @__PURE__ */ new Set(), b = (u) => {
    g.size === 0 && X("resize", window, p), g.has(u) || g.add(u);
  }, w = (u) => {
    g.has(u) && g.delete(u), g.size === 0 && U("resize", window, p);
  }, p = () => {
    g.forEach((u) => u());
  };
  return ce(() => {
    U("resize", window, p), l();
  }), { targetRef: r, setTargetRef: o, addScrollListener: c, removeScrollListener: d, addResizeListener: b, removeResizeListener: w };
}, render() {
  return rt("binder", this.$slots);
} }), hn = R({ name: "Target", setup() {
  const { setTargetRef: e, syncTarget: t } = Z("VBinder");
  return { syncTarget: t, setTargetDirective: { mounted: e, updated: e } };
}, render() {
  const { syncTarget: e, setTargetDirective: t } = this;
  return e ? ze(Pt("follower", this.$slots), [[t]]) : Pt("follower", this.$slots);
} }), fe = "@@mmoContext", Mr = { mounted(e, { value: t }) {
  e[fe] = { handler: void 0 }, typeof t == "function" && (e[fe].handler = t, X("mousemoveoutside", e, t));
}, updated(e, { value: t }) {
  const n = e[fe];
  typeof t == "function" ? n.handler ? n.handler !== t && (U("mousemoveoutside", e, n.handler), n.handler = t, X("mousemoveoutside", e, t)) : (e[fe].handler = t, X("mousemoveoutside", e, t)) : n.handler && (U("mousemoveoutside", e, n.handler), n.handler = void 0);
}, unmounted(e) {
  const { handler: t } = e[fe];
  t && U("mousemoveoutside", e, t), e[fe].handler = void 0;
} }, he = "@@coContext", Ot = { mounted(e, { value: t, modifiers: n }) {
  e[he] = { handler: void 0 }, typeof t == "function" && (e[he].handler = t, X("clickoutside", e, t, { capture: n.capture }));
}, updated(e, { value: t, modifiers: n }) {
  const r = e[he];
  typeof t == "function" ? r.handler ? r.handler !== t && (U("clickoutside", e, r.handler, { capture: n.capture }), r.handler = t, X("clickoutside", e, t, { capture: n.capture })) : (e[he].handler = t, X("clickoutside", e, t, { capture: n.capture })) : r.handler && (U("clickoutside", e, r.handler, { capture: n.capture }), r.handler = void 0);
}, unmounted(e, { modifiers: t }) {
  const { handler: n } = e[he];
  n && U("clickoutside", e, n, { capture: t.capture }), e[he].handler = void 0;
} };
function Ir(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class kr {
  constructor() {
    this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
  }
  get elementCount() {
    return this.elementZIndex.size;
  }
  ensureZIndex(t, n) {
    const { elementZIndex: r } = this;
    if (n !== void 0) {
      t.style.zIndex = `${n}`, r.delete(t);
      return;
    }
    const { nextZIndex: o } = this;
    r.has(t) && r.get(t) + 1 === this.nextZIndex || (t.style.zIndex = `${o}`, r.set(t, o), this.nextZIndex = o + 1, this.squashState());
  }
  unregister(t, n) {
    const { elementZIndex: r } = this;
    r.has(t) ? r.delete(t) : n === void 0 && Ir("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
  }
  squashState() {
    const { elementCount: t } = this;
    t || (this.nextZIndex = 2e3), this.nextZIndex - t > 2500 && this.rearrange();
  }
  rearrange() {
    const t = Array.from(this.elementZIndex.entries());
    t.sort((n, r) => n[1] - r[1]), this.nextZIndex = 2e3, t.forEach((n) => {
      const r = n[0], o = this.nextZIndex++;
      `${o}` !== r.style.zIndex && (r.style.zIndex = `${o}`);
    });
  }
}
const Ue = new kr(), pe = "@@ziContext", pn = { mounted(e, t) {
  const { value: n = {} } = t, { zIndex: r, enabled: o } = n;
  e[pe] = { enabled: !!o, initialized: false }, o && (Ue.ensureZIndex(e, r), e[pe].initialized = true);
}, updated(e, t) {
  const { value: n = {} } = t, { zIndex: r, enabled: o } = n, i = e[pe].enabled;
  o && !i && (Ue.ensureZIndex(e, r), e[pe].initialized = true), e[pe].enabled = !!o;
}, unmounted(e, t) {
  if (!e[pe].initialized) return;
  const { value: n = {} } = t, { zIndex: r } = n;
  Ue.unregister(e, r);
} }, { c: we } = Dn(), vn = "vueuc-style";
function Et(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const _r = R({ name: "LazyTeleport", props: { to: { type: [String, Object], default: void 0 }, disabled: Boolean, show: { type: Boolean, required: true } }, setup(e) {
  return { showTeleport: mr(G(e, "show")), mergedTo: N(() => {
    const { to: t } = e;
    return t ?? "body";
  }) };
}, render() {
  return this.showTeleport ? this.disabled ? rt("lazy-teleport", this.$slots) : x(Wn, { disabled: this.disabled, to: this.mergedTo }, rt("lazy-teleport", this.$slots)) : null;
} }), Pe = { top: "bottom", bottom: "top", left: "right", right: "left" }, Mt = { start: "end", center: "center", end: "start" }, Ve = { top: "height", bottom: "height", left: "width", right: "width" }, Tr = { "bottom-start": "top left", bottom: "top center", "bottom-end": "top right", "top-start": "bottom left", top: "bottom center", "top-end": "bottom right", "right-start": "top left", right: "center left", "right-end": "bottom left", "left-start": "top right", left: "center right", "left-end": "bottom right" }, Nr = { "bottom-start": "bottom left", bottom: "bottom center", "bottom-end": "bottom right", "top-start": "top left", top: "top center", "top-end": "top right", "right-start": "top right", right: "center right", "right-end": "bottom right", "left-start": "top left", left: "center left", "left-end": "bottom left" }, zr = { "bottom-start": "right", "bottom-end": "left", "top-start": "right", "top-end": "left", "right-start": "bottom", "right-end": "top", "left-start": "bottom", "left-end": "top" }, It = { top: true, bottom: false, left: true, right: false }, kt = { top: "end", bottom: "start", left: "end", right: "start" };
function Br(e, t, n, r, o, i) {
  if (!o || i) return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", c = { top: 0, left: 0 };
  const d = (g, b, w) => {
    let p = 0, u = 0;
    const $ = n[g] - t[b] - t[g];
    return $ > 0 && r && (w ? u = It[b] ? $ : -$ : p = It[b] ? $ : -$), { left: p, top: u };
  }, h = a === "left" || a === "right";
  if (s !== "center") {
    const g = zr[e], b = Pe[g], w = Ve[g];
    if (n[w] > t[w]) {
      if (t[g] + t[w] < n[w]) {
        const p = (n[w] - t[w]) / 2;
        t[g] < p || t[b] < p ? t[g] < t[b] ? (s = Mt[l], c = d(w, b, h)) : c = d(w, g, h) : s = "center";
      }
    } else n[w] < t[w] && t[b] < 0 && t[g] > t[b] && (s = Mt[l]);
  } else {
    const g = a === "bottom" || a === "top" ? "left" : "top", b = Pe[g], w = Ve[g], p = (n[w] - t[w]) / 2;
    (t[g] < p || t[b] < p) && (t[g] > t[b] ? (s = kt[g], c = d(w, g, h)) : (s = kt[b], c = d(w, b, h)));
  }
  let f = a;
  return t[a] < n[Ve[a]] && t[a] < t[Pe[a]] && (f = Pe[a]), { placement: s !== "center" ? `${f}-${s}` : f, left: c.left, top: c.top };
}
function Fr(e, t) {
  return t ? Nr[e] : Tr[e];
}
function Lr(e, t, n, r, o, i) {
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
      return { top: `${Math.round(n.top - t.top + n.height + r)}px`, left: `${Math.round(n.left - t.left + o)}px`, transform: "" };
    case "bottom-end":
      return { top: `${Math.round(n.top - t.top + n.height + r)}px`, left: `${Math.round(n.left - t.left + n.width + o)}px`, transform: "translateX(-100%)" };
    case "top-start":
      return { top: `${Math.round(n.top - t.top + r)}px`, left: `${Math.round(n.left - t.left + o)}px`, transform: "translateY(-100%)" };
    case "top-end":
      return { top: `${Math.round(n.top - t.top + r)}px`, left: `${Math.round(n.left - t.left + n.width + o)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "right-start":
      return { top: `${Math.round(n.top - t.top + r)}px`, left: `${Math.round(n.left - t.left + n.width + o)}px`, transform: "" };
    case "right-end":
      return { top: `${Math.round(n.top - t.top + n.height + r)}px`, left: `${Math.round(n.left - t.left + n.width + o)}px`, transform: "translateY(-100%)" };
    case "left-start":
      return { top: `${Math.round(n.top - t.top + r)}px`, left: `${Math.round(n.left - t.left + o)}px`, transform: "translateX(-100%)" };
    case "left-end":
      return { top: `${Math.round(n.top - t.top + n.height + r)}px`, left: `${Math.round(n.left - t.left + o)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "top":
      return { top: `${Math.round(n.top - t.top + r)}px`, left: `${Math.round(n.left - t.left + n.width / 2 + o)}px`, transform: "translateY(-100%) translateX(-50%)" };
    case "right":
      return { top: `${Math.round(n.top - t.top + n.height / 2 + r)}px`, left: `${Math.round(n.left - t.left + n.width + o)}px`, transform: "translateY(-50%)" };
    case "left":
      return { top: `${Math.round(n.top - t.top + n.height / 2 + r)}px`, left: `${Math.round(n.left - t.left + o)}px`, transform: "translateY(-50%) translateX(-100%)" };
    case "bottom":
    default:
      return { top: `${Math.round(n.top - t.top + n.height + r)}px`, left: `${Math.round(n.left - t.left + n.width / 2 + o)}px`, transform: "translateX(-50%)" };
  }
}
const Kr = we([we(".v-binder-follower-container", { position: "absolute", left: "0", right: "0", top: "0", height: "0", pointerEvents: "none", zIndex: "auto" }), we(".v-binder-follower-content", { position: "absolute", zIndex: "auto" }, [we("> *", { pointerEvents: "all" })])]), gn = R({ name: "Follower", inheritAttrs: false, props: { show: Boolean, enabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom" }, syncTrigger: { type: Array, default: ["resize", "scroll"] }, to: [String, Object], flip: { type: Boolean, default: true }, internalShift: Boolean, x: Number, y: Number, width: String, minWidth: String, containerClass: String, teleportDisabled: Boolean, zindexable: { type: Boolean, default: true }, zIndex: Number, overlap: Boolean }, setup(e) {
  const t = Z("VBinder"), n = oe(() => e.enabled !== void 0 ? e.enabled : e.show), r = z(null), o = z(null), i = () => {
    const { syncTrigger: f } = e;
    f.includes("scroll") && t.addScrollListener(s), f.includes("resize") && t.addResizeListener(s);
  }, a = () => {
    t.removeScrollListener(s), t.removeResizeListener(s);
  };
  Ce(() => {
    n.value && (s(), i());
  });
  const l = Yt();
  Kr.mount({ id: "vueuc/binder", head: true, anchorMetaName: vn, ssr: l }), ce(() => {
    a();
  }), $r(() => {
    n.value && s();
  });
  const s = () => {
    if (!n.value) return;
    const f = r.value;
    if (f === null) return;
    const g = t.targetRef, { x: b, y: w, overlap: p } = e, u = b !== void 0 && w !== void 0 ? Or(b, w) : Ge(g);
    f.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), f.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
    const { width: $, minWidth: O, placement: y, internalShift: S, flip: _ } = e;
    f.setAttribute("v-placement", y), p ? f.setAttribute("v-overlap", "") : f.removeAttribute("v-overlap");
    const { style: k } = f;
    $ === "target" ? k.width = `${u.width}px` : $ !== void 0 ? k.width = $ : k.width = "", O === "target" ? k.minWidth = `${u.width}px` : O !== void 0 ? k.minWidth = O : k.minWidth = "";
    const B = Ge(f), C = Ge(o.value), { left: P, top: T, placement: M } = Br(y, u, B, S, _, p), j = Fr(M, p), { left: E, top: v, transform: A } = Lr(M, C, u, T, P, p);
    f.setAttribute("v-placement", M), f.style.setProperty("--v-offset-left", `${Math.round(P)}px`), f.style.setProperty("--v-offset-top", `${Math.round(T)}px`), f.style.transform = `translateX(${E}) translateY(${v}) ${A}`, f.style.setProperty("--v-transform-origin", j), f.style.transformOrigin = j;
  };
  ee(n, (f) => {
    f ? (i(), c()) : a();
  });
  const c = () => {
    Qt().then(s).catch((f) => console.error(f));
  };
  ["placement", "x", "y", "internalShift", "flip", "width", "overlap", "minWidth"].forEach((f) => {
    ee(G(e, f), s);
  }), ["teleportDisabled"].forEach((f) => {
    ee(G(e, f), c);
  }), ee(G(e, "syncTrigger"), (f) => {
    f.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), f.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
  });
  const d = Jt(), h = oe(() => {
    const { to: f } = e;
    if (f !== void 0) return f;
    d.value;
  });
  return { VBinder: t, mergedEnabled: n, offsetContainerRef: o, followerRef: r, mergedTo: h, syncPosition: s };
}, render() {
  return x(_r, { show: this.show, to: this.mergedTo, disabled: this.teleportDisabled }, { default: () => {
    var e, t;
    const n = x("div", { class: ["v-binder-follower-container", this.containerClass], ref: "offsetContainerRef" }, [x("div", { class: "v-binder-follower-content", ref: "followerRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))]);
    return this.zindexable ? ze(n, [[pn, { enabled: this.mergedEnabled, zIndex: this.zIndex }]]) : n;
  } });
} }), ne = "v-hidden", Dr = we("[v-hidden]", { display: "none!important" }), oa = R({ name: "Overflow", props: { getCounter: Function, getTail: Function, updateCounter: Function, onUpdateCount: Function, onUpdateOverflow: Function }, setup(e, { slots: t }) {
  const n = z(null), r = z(null);
  function o(a) {
    const { value: l } = n, { getCounter: s, getTail: c } = e;
    let d;
    if (s !== void 0 ? d = s() : d = r.value, !l || !d) return;
    d.hasAttribute(ne) && d.removeAttribute(ne);
    const { children: h } = l;
    if (a.showAllItemsBeforeCalculate) for (const O of h) O.hasAttribute(ne) && O.removeAttribute(ne);
    const f = l.offsetWidth, g = [], b = t.tail ? c == null ? void 0 : c() : null;
    let w = b ? b.offsetWidth : 0, p = false;
    const u = l.children.length - (t.tail ? 1 : 0);
    for (let O = 0; O < u - 1; ++O) {
      if (O < 0) continue;
      const y = h[O];
      if (p) {
        y.hasAttribute(ne) || y.setAttribute(ne, "");
        continue;
      } else y.hasAttribute(ne) && y.removeAttribute(ne);
      const S = y.offsetWidth;
      if (w += S, g[O] = S, w > f) {
        const { updateCounter: _ } = e;
        for (let k = O; k >= 0; --k) {
          const B = u - 1 - k;
          _ !== void 0 ? _(B) : d.textContent = `${B}`;
          const C = d.offsetWidth;
          if (w -= g[k], w + C <= f || k === 0) {
            p = true, O = k - 1, b && (O === -1 ? (b.style.maxWidth = `${f - C}px`, b.style.boxSizing = "border-box") : b.style.maxWidth = "");
            const { onUpdateCount: P } = e;
            P && P(B);
            break;
          }
        }
      }
    }
    const { onUpdateOverflow: $ } = e;
    p ? $ !== void 0 && $(true) : ($ !== void 0 && $(false), d.setAttribute(ne, ""));
  }
  const i = Yt();
  return Dr.mount({ id: "vueuc/overflow", head: true, anchorMetaName: vn, ssr: i }), Ce(() => o({ showAllItemsBeforeCalculate: false })), { selfRef: n, counterRef: r, sync: o };
}, render() {
  const { $slots: e } = this;
  return Qt(() => this.sync({ showAllItemsBeforeCalculate: false })), x("div", { class: "v-overflow", ref: "selfRef" }, [jn(e, "default"), e.counter ? e.counter() : x("span", { style: { display: "inline-block" }, ref: "counterRef" }), e.tail ? e.tail() : null]);
} });
function bn(e) {
  return e instanceof HTMLElement;
}
function yn(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (bn(n) && (wn(n) || yn(n))) return true;
  }
  return false;
}
function mn(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (bn(n) && (wn(n) || mn(n))) return true;
  }
  return false;
}
function wn(e) {
  if (!Wr(e)) return false;
  try {
    e.focus({ preventScroll: true });
  } catch {
  }
  return document.activeElement === e;
}
function Wr(e) {
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
let me = [];
const jr = R({ name: "FocusTrap", props: { disabled: Boolean, active: Boolean, autoFocus: { type: Boolean, default: true }, onEsc: Function, initialFocusTo: [String, Function], finalFocusTo: [String, Function], returnFocusOnDeactivated: { type: Boolean, default: true } }, setup(e) {
  const t = Rn(), n = z(null), r = z(null);
  let o = false, i = false;
  const a = typeof document > "u" ? null : document.activeElement;
  function l() {
    return me[me.length - 1] === t;
  }
  function s(p) {
    var u;
    p.code === "Escape" && l() && ((u = e.onEsc) === null || u === void 0 || u.call(e, p));
  }
  Ce(() => {
    ee(() => e.active, (p) => {
      p ? (h(), X("keydown", document, s)) : (U("keydown", document, s), o && f());
    }, { immediate: true });
  }), ce(() => {
    U("keydown", document, s), o && f();
  });
  function c(p) {
    if (!i && l()) {
      const u = d();
      if (u === null || u.contains(tt(p))) return;
      g("first");
    }
  }
  function d() {
    const p = n.value;
    if (p === null) return null;
    let u = p;
    for (; u = u.nextSibling, !(u === null || u instanceof Element && u.tagName === "DIV"); ) ;
    return u;
  }
  function h() {
    var p;
    if (!e.disabled) {
      if (me.push(t), e.autoFocus) {
        const { initialFocusTo: u } = e;
        u === void 0 ? g("first") : (p = Et(u)) === null || p === void 0 || p.focus({ preventScroll: true });
      }
      o = true, document.addEventListener("focus", c, true);
    }
  }
  function f() {
    var p;
    if (e.disabled || (document.removeEventListener("focus", c, true), me = me.filter(($) => $ !== t), l())) return;
    const { finalFocusTo: u } = e;
    u !== void 0 ? (p = Et(u)) === null || p === void 0 || p.focus({ preventScroll: true }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = true, a.focus({ preventScroll: true }), i = false);
  }
  function g(p) {
    if (l() && e.active) {
      const u = n.value, $ = r.value;
      if (u !== null && $ !== null) {
        const O = d();
        if (O == null || O === $) {
          i = true, u.focus({ preventScroll: true }), i = false;
          return;
        }
        i = true;
        const y = p === "first" ? yn(O) : mn(O);
        i = false, y || (i = true, u.focus({ preventScroll: true }), i = false);
      }
    }
  }
  function b(p) {
    if (i) return;
    const u = d();
    u !== null && (p.relatedTarget !== null && u.contains(p.relatedTarget) ? g("last") : g("first"));
  }
  function w(p) {
    i || (p.relatedTarget !== null && p.relatedTarget === n.value ? g("last") : g("first"));
  }
  return { focusableStartRef: n, focusableEndRef: r, focusableStyle: "position: absolute; height: 0; width: 0;", handleStartFocus: b, handleEndFocus: w };
}, render() {
  const { default: e } = this.$slots;
  if (e === void 0) return null;
  if (this.disabled) return e();
  const { active: t, focusableStyle: n } = this;
  return x(Ae, null, [x("div", { "aria-hidden": "true", tabindex: t ? "0" : "-1", ref: "focusableStartRef", style: n, onFocus: this.handleStartFocus }), e(), x("div", { "aria-hidden": "true", style: n, ref: "focusableEndRef", tabindex: t ? "0" : "-1", onFocus: this.handleEndFocus })]);
} });
let Ze;
function Rr() {
  return Ze === void 0 && (Ze = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Ze;
}
function Hr(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
function _e(e, t = true, n = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && n.push(Xt(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        _e(r, t, n);
        return;
      }
      if (r.type === Ae) {
        if (r.children === null) return;
        Array.isArray(r.children) && _e(r.children, t, n);
      } else {
        if (r.type === qt && t) return;
        n.push(r);
      }
    }
  }), n;
}
function Gr(e, t = "default", n = void 0) {
  const r = e[t];
  if (!r) return $e("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const o = _e(r(n));
  return o.length === 1 ? o[0] : ($e("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function ia(e, t, n) {
  if (!t) return null;
  const r = _e(t(n));
  return r.length === 1 ? r[0] : ($e("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
}
var it = Be(Fe, "WeakMap"), Ur = Hn(Object.keys, Object), Vr = Object.prototype, Zr = Vr.hasOwnProperty;
function Xr(e) {
  if (!Gn(e)) return Ur(e);
  var t = [];
  for (var n in Object(e)) Zr.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function gt(e) {
  return ct(e) ? Un(e) : Xr(e);
}
function qr(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
  return e;
}
function Yr(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++n < r; ) {
    var a = e[n];
    t(a, n, e) && (i[o++] = a);
  }
  return i;
}
function Jr() {
  return [];
}
var Qr = Object.prototype, eo = Qr.propertyIsEnumerable, _t = Object.getOwnPropertySymbols, to = _t ? function(e) {
  return e == null ? [] : (e = Object(e), Yr(_t(e), function(t) {
    return eo.call(e, t);
  }));
} : Jr;
function no(e, t, n) {
  var r = t(e);
  return ge(e) ? r : qr(r, n(e));
}
function Tt(e) {
  return no(e, gt, to);
}
var at = Be(Fe, "DataView"), st = Be(Fe, "Promise"), lt = Be(Fe, "Set"), Nt = "[object Map]", ro = "[object Object]", zt = "[object Promise]", Bt = "[object Set]", Ft = "[object WeakMap]", Lt = "[object DataView]", oo = ye(at), io = ye(nt), ao = ye(st), so = ye(lt), lo = ye(it), se = en;
(at && se(new at(new ArrayBuffer(1))) != Lt || nt && se(new nt()) != Nt || st && se(st.resolve()) != zt || lt && se(new lt()) != Bt || it && se(new it()) != Ft) && (se = function(e) {
  var t = en(e), n = t == ro ? e.constructor : void 0, r = n ? ye(n) : "";
  if (r) switch (r) {
    case oo:
      return Lt;
    case io:
      return Nt;
    case ao:
      return zt;
    case so:
      return Bt;
    case lo:
      return Ft;
  }
  return t;
});
var uo = "__lodash_hash_undefined__";
function co(e) {
  return this.__data__.set(e, uo), this;
}
function fo(e) {
  return this.__data__.has(e);
}
function Te(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Vn(); ++t < n; ) this.add(e[t]);
}
Te.prototype.add = Te.prototype.push = co;
Te.prototype.has = fo;
function ho(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; ) if (t(e[n], n, e)) return true;
  return false;
}
function po(e, t) {
  return e.has(t);
}
var vo = 1, go = 2;
function xn(e, t, n, r, o, i) {
  var a = n & vo, l = e.length, s = t.length;
  if (l != s && !(a && s > l)) return false;
  var c = i.get(e), d = i.get(t);
  if (c && d) return c == t && d == e;
  var h = -1, f = true, g = n & go ? new Te() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < l; ) {
    var b = e[h], w = t[h];
    if (r) var p = a ? r(w, b, h, t, e, i) : r(b, w, h, e, t, i);
    if (p !== void 0) {
      if (p) continue;
      f = false;
      break;
    }
    if (g) {
      if (!ho(t, function(u, $) {
        if (!po(g, $) && (b === u || o(b, u, n, r, i))) return g.push($);
      })) {
        f = false;
        break;
      }
    } else if (!(b === w || o(b, w, n, r, i))) {
      f = false;
      break;
    }
  }
  return i.delete(e), i.delete(t), f;
}
function bo(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function yo(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var mo = 1, wo = 2, xo = "[object Boolean]", So = "[object Date]", $o = "[object Error]", Co = "[object Map]", Ao = "[object Number]", Po = "[object RegExp]", Oo = "[object Set]", Eo = "[object String]", Mo = "[object Symbol]", Io = "[object ArrayBuffer]", ko = "[object DataView]", Kt = wt ? wt.prototype : void 0, Xe = Kt ? Kt.valueOf : void 0;
function _o(e, t, n, r, o, i, a) {
  switch (n) {
    case ko:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return false;
      e = e.buffer, t = t.buffer;
    case Io:
      return !(e.byteLength != t.byteLength || !i(new xt(e), new xt(t)));
    case xo:
    case So:
    case Ao:
      return Zn(+e, +t);
    case $o:
      return e.name == t.name && e.message == t.message;
    case Po:
    case Eo:
      return e == t + "";
    case Co:
      var l = bo;
    case Oo:
      var s = r & mo;
      if (l || (l = yo), e.size != t.size && !s) return false;
      var c = a.get(e);
      if (c) return c == t;
      r |= wo, a.set(e, t);
      var d = xn(l(e), l(t), r, o, i, a);
      return a.delete(e), d;
    case Mo:
      if (Xe) return Xe.call(e) == Xe.call(t);
  }
  return false;
}
var To = 1, No = Object.prototype, zo = No.hasOwnProperty;
function Bo(e, t, n, r, o, i) {
  var a = n & To, l = Tt(e), s = l.length, c = Tt(t), d = c.length;
  if (s != d && !a) return false;
  for (var h = s; h--; ) {
    var f = l[h];
    if (!(a ? f in t : zo.call(t, f))) return false;
  }
  var g = i.get(e), b = i.get(t);
  if (g && b) return g == t && b == e;
  var w = true;
  i.set(e, t), i.set(t, e);
  for (var p = a; ++h < s; ) {
    f = l[h];
    var u = e[f], $ = t[f];
    if (r) var O = a ? r($, u, f, t, e, i) : r(u, $, f, e, t, i);
    if (!(O === void 0 ? u === $ || o(u, $, n, r, i) : O)) {
      w = false;
      break;
    }
    p || (p = f == "constructor");
  }
  if (w && !p) {
    var y = e.constructor, S = t.constructor;
    y != S && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof S == "function" && S instanceof S) && (w = false);
  }
  return i.delete(e), i.delete(t), w;
}
var Fo = 1, Dt = "[object Arguments]", Wt = "[object Array]", Oe = "[object Object]", Lo = Object.prototype, jt = Lo.hasOwnProperty;
function Ko(e, t, n, r, o, i) {
  var a = ge(e), l = ge(t), s = a ? Wt : se(e), c = l ? Wt : se(t);
  s = s == Dt ? Oe : s, c = c == Dt ? Oe : c;
  var d = s == Oe, h = c == Oe, f = s == c;
  if (f && St(e)) {
    if (!St(t)) return false;
    a = true, d = false;
  }
  if (f && !d) return i || (i = new Ee()), a || Xn(e) ? xn(e, t, n, r, o, i) : _o(e, t, s, n, r, o, i);
  if (!(n & Fo)) {
    var g = d && jt.call(e, "__wrapped__"), b = h && jt.call(t, "__wrapped__");
    if (g || b) {
      var w = g ? e.value() : e, p = b ? t.value() : t;
      return i || (i = new Ee()), o(w, p, n, r, i);
    }
  }
  return f ? (i || (i = new Ee()), Bo(e, t, n, r, o, i)) : false;
}
function bt(e, t, n, r, o) {
  return e === t ? true : e == null || t == null || !$t(e) && !$t(t) ? e !== e && t !== t : Ko(e, t, n, r, bt, o);
}
var Do = 1, Wo = 2;
function jo(e, t, n, r) {
  var o = n.length, i = o;
  if (e == null) return !i;
  for (e = Object(e); o--; ) {
    var a = n[o];
    if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return false;
  }
  for (; ++o < i; ) {
    a = n[o];
    var l = a[0], s = e[l], c = a[1];
    if (a[2]) {
      if (s === void 0 && !(l in e)) return false;
    } else {
      var d = new Ee(), h;
      if (!(h === void 0 ? bt(c, s, Do | Wo, r, d) : h)) return false;
    }
  }
  return true;
}
function Sn(e) {
  return e === e && !qn(e);
}
function Ro(e) {
  for (var t = gt(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, Sn(o)];
  }
  return t;
}
function $n(e, t) {
  return function(n) {
    return n == null ? false : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Ho(e) {
  var t = Ro(e);
  return t.length == 1 && t[0][2] ? $n(t[0][0], t[0][1]) : function(n) {
    return n === e || jo(n, e, t);
  };
}
function Go(e, t) {
  return e != null && t in Object(e);
}
function Uo(e, t, n) {
  t = hr(t, e);
  for (var r = -1, o = t.length, i = false; ++r < o; ) {
    var a = ht(t[r]);
    if (!(i = e != null && n(e, a))) break;
    e = e[a];
  }
  return i || ++r != o ? i : (o = e == null ? 0 : e.length, !!o && Yn(o) && Jn(a, o) && (ge(e) || Qn(e)));
}
function Vo(e, t) {
  return e != null && Uo(e, t, Go);
}
var Zo = 1, Xo = 2;
function qo(e, t) {
  return an(e) && Sn(t) ? $n(ht(e), t) : function(n) {
    var r = pr(n, e);
    return r === void 0 && r === t ? Vo(n, e) : bt(t, r, Zo | Xo);
  };
}
function Yo(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Jo(e) {
  return function(t) {
    return vr(t, e);
  };
}
function Qo(e) {
  return an(e) ? Yo(ht(e)) : Jo(e);
}
function ei(e) {
  return typeof e == "function" ? e : e == null ? er : typeof e == "object" ? ge(e) ? qo(e[0], e[1]) : Ho(e) : Qo(e);
}
function ti(e, t) {
  return e && tr(e, t, gt);
}
function ni(e, t) {
  return function(n, r) {
    if (n == null) return n;
    if (!ct(n)) return e(n, r);
    for (var o = n.length, i = -1, a = Object(n); ++i < o && r(a[i], i, a) !== false; ) ;
    return n;
  };
}
var ri = ni(ti);
function oi(e, t) {
  var n = -1, r = ct(e) ? Array(e.length) : [];
  return ri(e, function(o, i, a) {
    r[++n] = t(o, i, a);
  }), r;
}
function ii(e, t) {
  var n = ge(e) ? nr : oi;
  return n(e, ei(t));
}
const ai = R({ name: "ChevronRight", render() {
  return x("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, x("path", { d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z", fill: "currentColor" }));
} });
function Rt(e) {
  return Array.isArray(e) ? e : [e];
}
const dt = { STOP: "STOP" };
function Cn(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== dt.STOP && e.children.forEach((r) => Cn(r, t));
}
function si(e, t = {}) {
  const { preserveGroup: n = false } = t, r = [], o = n ? (a) => {
    a.isLeaf || (r.push(a.key), i(a.children));
  } : (a) => {
    a.isLeaf || (a.isGroup || r.push(a.key), i(a.children));
  };
  function i(a) {
    a.forEach(o);
  }
  return i(e), r;
}
function li(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function di(e) {
  return e.children;
}
function ui(e) {
  return e.key;
}
function ci() {
  return false;
}
function fi(e, t) {
  const { isLeaf: n } = e;
  return !(n === false && !Array.isArray(t(e)));
}
function hi(e) {
  return e.disabled === true;
}
function pi(e, t) {
  return e.isLeaf === false && !Array.isArray(t(e));
}
function qe(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function Ye(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function vi(e, t) {
  const n = new Set(e);
  return t.forEach((r) => {
    n.has(r) || n.add(r);
  }), Array.from(n);
}
function gi(e, t) {
  const n = new Set(e);
  return t.forEach((r) => {
    n.has(r) && n.delete(r);
  }), Array.from(n);
}
function bi(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function aa(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, r) => {
    t.set(n.key, r);
  }), (n) => {
    var r;
    return (r = t.get(n)) !== null && r !== void 0 ? r : null;
  };
}
class yi extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function mi(e, t, n, r) {
  return Ne(t.concat(e), n, r, false);
}
function wi(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((r) => {
    const o = t.treeNodeMap.get(r);
    if (o !== void 0) {
      let i = o.parent;
      for (; i !== null && !(i.disabled || n.has(i.key)); ) n.add(i.key), i = i.parent;
    }
  }), n;
}
function xi(e, t, n, r) {
  const o = Ne(t, n, r, false), i = Ne(e, n, r, true), a = wi(e, n), l = [];
  return o.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => o.delete(s)), o;
}
function Je(e, t) {
  const { checkedKeys: n, keysToCheck: r, keysToUncheck: o, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: c } = e;
  if (!a) return r !== void 0 ? { checkedKeys: vi(n, r), indeterminateKeys: Array.from(i) } : o !== void 0 ? { checkedKeys: gi(n, o), indeterminateKeys: Array.from(i) } : { checkedKeys: Array.from(n), indeterminateKeys: Array.from(i) };
  const { levelTreeNodeMap: d } = t;
  let h;
  o !== void 0 ? h = xi(o, n, t, c) : r !== void 0 ? h = mi(r, n, t, c) : h = Ne(n, t, c, false);
  const f = s === "parent", g = s === "child" || l, b = h, w = /* @__PURE__ */ new Set(), p = Math.max.apply(null, Array.from(d.keys()));
  for (let u = p; u >= 0; u -= 1) {
    const $ = u === 0, O = d.get(u);
    for (const y of O) {
      if (y.isLeaf) continue;
      const { key: S, shallowLoaded: _ } = y;
      if (g && _ && y.children.forEach((P) => {
        !P.disabled && !P.isLeaf && P.shallowLoaded && b.has(P.key) && b.delete(P.key);
      }), y.disabled || !_) continue;
      let k = true, B = false, C = true;
      for (const P of y.children) {
        const T = P.key;
        if (!P.disabled) {
          if (C && (C = false), b.has(T)) B = true;
          else if (w.has(T)) {
            B = true, k = false;
            break;
          } else if (k = false, B) break;
        }
      }
      k && !C ? (f && y.children.forEach((P) => {
        !P.disabled && b.has(P.key) && b.delete(P.key);
      }), b.add(S)) : B && w.add(S), $ && g && b.has(S) && b.delete(S);
    }
  }
  return { checkedKeys: Array.from(b), indeterminateKeys: Array.from(w) };
}
function Ne(e, t, n, r) {
  const { treeNodeMap: o, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const c = o.get(s);
    c !== void 0 && Cn(c, (d) => {
      if (d.disabled) return dt.STOP;
      const { key: h } = d;
      if (!a.has(h) && (a.add(h), l.add(h), pi(d.rawNode, i))) {
        if (r) return dt.STOP;
        if (!n) throw new yi();
      }
    });
  }), l;
}
function Si(e, { includeGroup: t = false, includeSelf: n = true }, r) {
  var o;
  const i = r.treeNodeMap;
  let a = e == null ? null : (o = i.get(e)) !== null && o !== void 0 ? o : null;
  const l = { keyPath: [], treeNodePath: [], treeNode: a };
  if (a == null ? void 0 : a.ignored) return l.treeNode = null, l;
  for (; a; ) !a.ignored && (t || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), n || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function $i(e) {
  if (e.length === 0) return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function Ci(e, t) {
  const n = e.siblings, r = n.length, { index: o } = e;
  return t ? n[(o + 1) % r] : o === n.length - 1 ? null : n[o + 1];
}
function Ht(e, t, { loop: n = false, includeDisabled: r = false } = {}) {
  const o = t === "prev" ? Ai : Ci, i = { reverse: t === "prev" };
  let a = false, l = null;
  function s(c) {
    if (c !== null) {
      if (c === e) {
        if (!a) a = true;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!c.disabled || r) && !c.ignored && !c.isGroup) {
        l = c;
        return;
      }
      if (c.isGroup) {
        const d = yt(c, i);
        d !== null ? l = d : s(o(c, n));
      } else {
        const d = o(c, false);
        if (d !== null) s(d);
        else {
          const h = Pi(c);
          (h == null ? void 0 : h.isGroup) ? s(o(h, n)) : n && s(o(c, true));
        }
      }
    }
  }
  return s(e), l;
}
function Ai(e, t) {
  const n = e.siblings, r = n.length, { index: o } = e;
  return t ? n[(o - 1 + r) % r] : o === 0 ? null : n[o - 1];
}
function Pi(e) {
  return e.parent;
}
function yt(e, t = {}) {
  const { reverse: n = false } = t, { children: r } = e;
  if (r) {
    const { length: o } = r, i = n ? o - 1 : 0, a = n ? -1 : o, l = n ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const c = r[s];
      if (!c.disabled && !c.ignored) if (c.isGroup) {
        const d = yt(c, t);
        if (d !== null) return d;
      } else return c;
    }
  }
  return null;
}
const Oi = { getChild() {
  return this.ignored ? null : yt(this);
}, getParent() {
  const { parent: e } = this;
  return (e == null ? void 0 : e.isGroup) ? e.getParent() : e;
}, getNext(e = {}) {
  return Ht(this, "next", e);
}, getPrev(e = {}) {
  return Ht(this, "prev", e);
} };
function Ei(e, t) {
  const n = t ? new Set(t) : void 0, r = [];
  function o(i) {
    i.forEach((a) => {
      r.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || n === void 0 || n.has(a.key)) && o(a.children);
    });
  }
  return o(e), r;
}
function Mi(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n) return true;
    t = t.parent;
  }
  return false;
}
function An(e, t, n, r, o, i = null, a = 0) {
  const l = [];
  return e.forEach((s, c) => {
    var d;
    const h = Object.create(r);
    if (h.rawNode = s, h.siblings = l, h.level = a, h.index = c, h.isFirstChild = c === 0, h.isLastChild = c + 1 === e.length, h.parent = i, !h.ignored) {
      const f = o(s);
      Array.isArray(f) && (h.children = An(f, t, n, r, o, h, a + 1));
    }
    l.push(h), t.set(h.key, h), n.has(a) || n.set(a, []), (d = n.get(a)) === null || d === void 0 || d.push(h);
  }), l;
}
function Ii(e, t = {}) {
  var n;
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), { getDisabled: i = hi, getIgnored: a = ci, getIsGroup: l = bi, getKey: s = ui } = t, c = (n = t.getChildren) !== null && n !== void 0 ? n : di, d = t.ignoreEmptyChildren ? (y) => {
    const S = c(y);
    return Array.isArray(S) ? S.length ? S : null : S;
  } : c, h = Object.assign({ get key() {
    return s(this.rawNode);
  }, get disabled() {
    return i(this.rawNode);
  }, get isGroup() {
    return l(this.rawNode);
  }, get isLeaf() {
    return li(this.rawNode, d);
  }, get shallowLoaded() {
    return fi(this.rawNode, d);
  }, get ignored() {
    return a(this.rawNode);
  }, contains(y) {
    return Mi(this, y);
  } }, Oi), f = An(e, r, o, h, d);
  function g(y) {
    if (y == null) return null;
    const S = r.get(y);
    return S && !S.isGroup && !S.ignored ? S : null;
  }
  function b(y) {
    if (y == null) return null;
    const S = r.get(y);
    return S && !S.ignored ? S : null;
  }
  function w(y, S) {
    const _ = b(y);
    return _ ? _.getPrev(S) : null;
  }
  function p(y, S) {
    const _ = b(y);
    return _ ? _.getNext(S) : null;
  }
  function u(y) {
    const S = b(y);
    return S ? S.getParent() : null;
  }
  function $(y) {
    const S = b(y);
    return S ? S.getChild() : null;
  }
  const O = { treeNodes: f, treeNodeMap: r, levelTreeNodeMap: o, maxLevel: Math.max(...o.keys()), getChildren: d, getFlattenedNodes(y) {
    return Ei(f, y);
  }, getNode: g, getPrev: w, getNext: p, getParent: u, getChild: $, getFirstAvailableNode() {
    return $i(f);
  }, getPath(y, S = {}) {
    return Si(y, S, O);
  }, getCheckedKeys(y, S = {}) {
    const { cascade: _ = true, leafOnly: k = false, checkStrategy: B = "all", allowNotLoaded: C = false } = S;
    return Je({ checkedKeys: qe(y), indeterminateKeys: Ye(y), cascade: _, leafOnly: k, checkStrategy: B, allowNotLoaded: C }, O);
  }, check(y, S, _ = {}) {
    const { cascade: k = true, leafOnly: B = false, checkStrategy: C = "all", allowNotLoaded: P = false } = _;
    return Je({ checkedKeys: qe(S), indeterminateKeys: Ye(S), keysToCheck: y == null ? [] : Rt(y), cascade: k, leafOnly: B, checkStrategy: C, allowNotLoaded: P }, O);
  }, uncheck(y, S, _ = {}) {
    const { cascade: k = true, leafOnly: B = false, checkStrategy: C = "all", allowNotLoaded: P = false } = _;
    return Je({ checkedKeys: qe(S), indeterminateKeys: Ye(S), keysToUncheck: y == null ? [] : Rt(y), cascade: k, leafOnly: B, checkStrategy: C, allowNotLoaded: P }, O);
  }, getNonLeafKeys(y = {}) {
    return si(f, y);
  } };
  return O;
}
const { cubicBezierEaseIn: Gt, cubicBezierEaseOut: Ut } = rr;
function ki({ transformOrigin: e = "inherit", duration: t = ".2s", enterScale: n = ".9", originalTransform: r = "", originalTransition: o = "" } = {}) {
  return [D("&.fade-in-scale-up-transition-leave-active", { transformOrigin: e, transition: `opacity ${t} ${Gt}, transform ${t} ${Gt} ${o && `,${o}`}` }), D("&.fade-in-scale-up-transition-enter-active", { transformOrigin: e, transition: `opacity ${t} ${Ut}, transform ${t} ${Ut} ${o && `,${o}`}` }), D("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", { opacity: 0, transform: `${r} scale(${n})` }), D("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", { opacity: 1, transform: `${r} scale(1)` })];
}
const Qe = { top: "bottom", bottom: "top", left: "right", right: "left" }, W = "var(--n-arrow-height) * 1.414", _i = D([K("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [D(">", [K("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), xe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [xe("scrollable", [xe("show-header-or-footer", "padding: var(--n-padding);")])]), J("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), J("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), V("scrollable, show-header-or-footer", [J("content", `
 padding: var(--n-padding);
 `)])]), K("popover-shared", `
 transform-origin: inherit;
 `, [K("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [K("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${W});
 height: calc(${W});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]), D("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `), D("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `), D("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `), D("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]), q("top-start", `
 top: calc(${W} / -2);
 left: calc(${re("top-start")} - var(--v-offset-left));
 `), q("top", `
 top: calc(${W} / -2);
 transform: translateX(calc(${W} / -2)) rotate(45deg);
 left: 50%;
 `), q("top-end", `
 top: calc(${W} / -2);
 right: calc(${re("top-end")} + var(--v-offset-left));
 `), q("bottom-start", `
 bottom: calc(${W} / -2);
 left: calc(${re("bottom-start")} - var(--v-offset-left));
 `), q("bottom", `
 bottom: calc(${W} / -2);
 transform: translateX(calc(${W} / -2)) rotate(45deg);
 left: 50%;
 `), q("bottom-end", `
 bottom: calc(${W} / -2);
 right: calc(${re("bottom-end")} + var(--v-offset-left));
 `), q("left-start", `
 left: calc(${W} / -2);
 top: calc(${re("left-start")} - var(--v-offset-top));
 `), q("left", `
 left: calc(${W} / -2);
 transform: translateY(calc(${W} / -2)) rotate(45deg);
 top: 50%;
 `), q("left-end", `
 left: calc(${W} / -2);
 bottom: calc(${re("left-end")} + var(--v-offset-top));
 `), q("right-start", `
 right: calc(${W} / -2);
 top: calc(${re("right-start")} - var(--v-offset-top));
 `), q("right", `
 right: calc(${W} / -2);
 transform: translateY(calc(${W} / -2)) rotate(45deg);
 top: 50%;
 `), q("right-end", `
 right: calc(${W} / -2);
 bottom: calc(${re("right-end")} + var(--v-offset-top));
 `), ...ii({ top: ["right-start", "left-start"], right: ["top-end", "bottom-end"], bottom: ["right-end", "left-end"], left: ["top-start", "bottom-start"] }, (e, t) => {
  const n = ["right", "left"].includes(t), r = n ? "width" : "height";
  return e.map((o) => {
    const i = o.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${W}) / 2)`, s = re(o);
    return D(`[v-placement="${o}"] >`, [K("popover-shared", [V("center-arrow", [K("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function re(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function q(e, t) {
  const n = e.split("-")[0], r = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return D(`[v-placement="${e}"] >`, [K("popover-shared", `
 margin-${Qe[n]}: var(--n-space);
 `, [V("show-arrow", `
 margin-${Qe[n]}: var(--n-space-arrow);
 `), V("overlap", `
 margin: 0;
 `), or("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${Qe[n]}: auto;
 ${r}
 `, [K("popover-arrow", t)])])]);
}
const Pn = Object.assign(Object.assign({}, ie.props), { to: be.propTo, show: Boolean, trigger: String, showArrow: Boolean, delay: Number, duration: Number, raw: Boolean, arrowPointToCenter: Boolean, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], displayDirective: String, x: Number, y: Number, flip: Boolean, overlap: Boolean, placement: String, width: [Number, String], keepAliveOnHover: Boolean, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], internalDeactivateImmediately: Boolean, animated: Boolean, onClickoutside: Function, internalTrapFocus: Boolean, internalOnAfterLeave: Function, minWidth: Number, maxWidth: Number });
function On({ arrowClass: e, arrowStyle: t, arrowWrapperClass: n, arrowWrapperStyle: r, clsPrefix: o }) {
  return x("div", { key: "__popover-arrow__", style: r, class: [`${o}-popover-arrow-wrapper`, n] }, x("div", { class: [`${o}-popover-arrow`, e], style: t }));
}
const Ti = R({ name: "PopoverBody", inheritAttrs: false, props: Pn, setup(e, { slots: t, attrs: n }) {
  const { namespaceRef: r, mergedClsPrefixRef: o, inlineThemeDisabled: i, mergedRtlRef: a } = Le(e), l = ie("Popover", "-popover", _i, ar, e, o), s = ir("Popover", a, o), c = z(null), d = Z("NPopover"), h = z(null), f = z(e.show), g = z(false);
  nn(() => {
    const { show: C } = e;
    C && !Rr() && !e.internalDeactivateImmediately && (g.value = true);
  });
  const b = N(() => {
    const { trigger: C, onClickoutside: P } = e, T = [], { positionManuallyRef: { value: M } } = d;
    return M || (C === "click" && !P && T.push([Ot, _, void 0, { capture: true }]), C === "hover" && T.push([Mr, S])), P && T.push([Ot, _, void 0, { capture: true }]), (e.displayDirective === "show" || e.animated && g.value) && T.push([sr, e.show]), T;
  }), w = N(() => {
    const { common: { cubicBezierEaseInOut: C, cubicBezierEaseIn: P, cubicBezierEaseOut: T }, self: { space: M, spaceArrow: j, padding: E, fontSize: v, textColor: A, dividerColor: m, color: I, boxShadow: F, borderRadius: Y, arrowHeight: le, arrowOffset: H, arrowOffsetVertical: Re } } = l.value;
    return { "--n-box-shadow": F, "--n-bezier": C, "--n-bezier-ease-in": P, "--n-bezier-ease-out": T, "--n-font-size": v, "--n-text-color": A, "--n-color": I, "--n-divider-color": m, "--n-border-radius": Y, "--n-arrow-height": le, "--n-arrow-offset": H, "--n-arrow-offset-vertical": Re, "--n-padding": E, "--n-space": M, "--n-space-arrow": j };
  }), p = N(() => {
    const C = e.width === "trigger" ? void 0 : Me(e.width), P = [];
    C && P.push({ width: C });
    const { maxWidth: T, minWidth: M } = e;
    return T && P.push({ maxWidth: Me(T) }), M && P.push({ maxWidth: Me(M) }), i || P.push(w.value), P;
  }), u = i ? ft("popover", void 0, w, e) : void 0;
  d.setBodyInstance({ syncPosition: $ }), ce(() => {
    d.setBodyInstance(null);
  }), ee(G(e, "show"), (C) => {
    e.animated || (C ? f.value = true : f.value = false);
  });
  function $() {
    var C;
    (C = c.value) === null || C === void 0 || C.syncPosition();
  }
  function O(C) {
    e.trigger === "hover" && e.keepAliveOnHover && e.show && d.handleMouseEnter(C);
  }
  function y(C) {
    e.trigger === "hover" && e.keepAliveOnHover && d.handleMouseLeave(C);
  }
  function S(C) {
    e.trigger === "hover" && !k().contains(tt(C)) && d.handleMouseMoveOutside(C);
  }
  function _(C) {
    (e.trigger === "click" && !k().contains(tt(C)) || e.onClickoutside) && d.handleClickOutside(C);
  }
  function k() {
    return d.getTriggerElement();
  }
  Q(De, h), Q(pt, null), Q(vt, null);
  function B() {
    if (u == null ? void 0 : u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && g.value)) return null;
    let P;
    const T = d.internalRenderBodyRef.value, { value: M } = o;
    if (T) P = T([`${M}-popover-shared`, (s == null ? void 0 : s.value) && `${M}-popover--rtl`, u == null ? void 0 : u.themeClass.value, e.overlap && `${M}-popover-shared--overlap`, e.showArrow && `${M}-popover-shared--show-arrow`, e.arrowPointToCenter && `${M}-popover-shared--center-arrow`], h, p.value, O, y);
    else {
      const { value: j } = d.extraClassRef, { internalTrapFocus: E } = e, v = !Ct(t.header) || !Ct(t.footer), A = () => {
        var m, I;
        const F = v ? x(Ae, null, He(t.header, (H) => H ? x("div", { class: [`${M}-popover__header`, e.headerClass], style: e.headerStyle }, H) : null), He(t.default, (H) => H ? x("div", { class: [`${M}-popover__content`, e.contentClass], style: e.contentStyle }, t) : null), He(t.footer, (H) => H ? x("div", { class: [`${M}-popover__footer`, e.footerClass], style: e.footerStyle }, H) : null)) : e.scrollable ? (m = t.default) === null || m === void 0 ? void 0 : m.call(t) : x("div", { class: [`${M}-popover__content`, e.contentClass], style: e.contentStyle }, t), Y = e.scrollable ? x(rn, { themeOverrides: l.value.peerOverrides.Scrollbar, theme: l.value.peers.Scrollbar, contentClass: v ? void 0 : `${M}-popover__content ${(I = e.contentClass) !== null && I !== void 0 ? I : ""}`, contentStyle: v ? void 0 : e.contentStyle }, { default: () => F }) : F, le = e.showArrow ? On({ arrowClass: e.arrowClass, arrowStyle: e.arrowStyle, arrowWrapperClass: e.arrowWrapperClass, arrowWrapperStyle: e.arrowWrapperStyle, clsPrefix: M }) : null;
        return [Y, le];
      };
      P = x("div", Ke({ class: [`${M}-popover`, `${M}-popover-shared`, (s == null ? void 0 : s.value) && `${M}-popover--rtl`, u == null ? void 0 : u.themeClass.value, j.map((m) => `${M}-${m}`), { [`${M}-popover--scrollable`]: e.scrollable, [`${M}-popover--show-header-or-footer`]: v, [`${M}-popover--raw`]: e.raw, [`${M}-popover-shared--overlap`]: e.overlap, [`${M}-popover-shared--show-arrow`]: e.showArrow, [`${M}-popover-shared--center-arrow`]: e.arrowPointToCenter }], ref: h, style: p.value, onKeydown: d.handleKeydown, onMouseenter: O, onMouseleave: y }, n), E ? x(jr, { active: e.show, autoFocus: true }, { default: A }) : A());
    }
    return ze(P, b.value);
  }
  return { displayed: g, namespace: r, isMounted: d.isMountedRef, zIndex: d.zIndexRef, followerRef: c, adjustedTo: be(e), followerEnabled: f, renderContentNode: B };
}, render() {
  return x(gn, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === be.tdkey }, { default: () => this.animated ? x(tn, { name: "popover-transition", appear: this.isMounted, onEnter: () => {
    this.followerEnabled = true;
  }, onAfterLeave: () => {
    var e;
    (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = false, this.displayed = false;
  } }, { default: this.renderContentNode }) : this.renderContentNode() });
} }), Ni = Object.keys(Pn), zi = { focus: ["onFocus", "onBlur"], click: ["onClick"], hover: ["onMouseenter", "onMouseleave"], manual: [], nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"] };
function Bi(e, t, n) {
  zi[t].forEach((r) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const o = e.props[r], i = n[r];
    o ? e.props[r] = (...a) => {
      o(...a), i(...a);
    } : e.props[r] = i;
  });
}
const We = { show: { type: Boolean, default: void 0 }, defaultShow: Boolean, showArrow: { type: Boolean, default: true }, trigger: { type: String, default: "hover" }, delay: { type: Number, default: 100 }, duration: { type: Number, default: 100 }, raw: Boolean, placement: { type: String, default: "top" }, x: Number, y: Number, arrowPointToCenter: Boolean, disabled: Boolean, getDisabled: Function, displayDirective: { type: String, default: "if" }, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], flip: { type: Boolean, default: true }, animated: { type: Boolean, default: true }, width: { type: [Number, String], default: void 0 }, overlap: Boolean, keepAliveOnHover: { type: Boolean, default: true }, zIndex: Number, to: be.propTo, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], onClickoutside: Function, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], internalDeactivateImmediately: Boolean, internalSyncTargetWithParent: Boolean, internalInheritedEventHandlers: { type: Array, default: () => [] }, internalTrapFocus: Boolean, internalExtraClass: { type: Array, default: () => [] }, onShow: [Function, Array], onHide: [Function, Array], arrow: { type: Boolean, default: void 0 }, minWidth: Number, maxWidth: Number }, Fi = Object.assign(Object.assign(Object.assign({}, ie.props), We), { internalOnAfterLeave: Function, internalRenderBody: Function }), En = R({ name: "Popover", inheritAttrs: false, props: Fi, slots: Object, __popover__: true, setup(e) {
  const t = Jt(), n = z(null), r = N(() => e.show), o = z(e.defaultShow), i = sn(r, o), a = oe(() => e.disabled ? false : i.value), l = () => {
    if (e.disabled) return true;
    const { getDisabled: v } = e;
    return !!(v == null ? void 0 : v());
  }, s = () => l() ? false : i.value, c = gr(e, ["arrow", "showArrow"]), d = N(() => e.overlap ? false : c.value);
  let h = null;
  const f = z(null), g = z(null), b = oe(() => e.x !== void 0 && e.y !== void 0);
  function w(v) {
    const { "onUpdate:show": A, onUpdateShow: m, onShow: I, onHide: F } = e;
    o.value = v, A && ue(A, v), m && ue(m, v), v && I && ue(I, true), v && F && ue(F, false);
  }
  function p() {
    h && h.syncPosition();
  }
  function u() {
    const { value: v } = f;
    v && (window.clearTimeout(v), f.value = null);
  }
  function $() {
    const { value: v } = g;
    v && (window.clearTimeout(v), g.value = null);
  }
  function O() {
    const v = l();
    if (e.trigger === "focus" && !v) {
      if (s()) return;
      w(true);
    }
  }
  function y() {
    const v = l();
    if (e.trigger === "focus" && !v) {
      if (!s()) return;
      w(false);
    }
  }
  function S() {
    const v = l();
    if (e.trigger === "hover" && !v) {
      if ($(), f.value !== null || s()) return;
      const A = () => {
        w(true), f.value = null;
      }, { delay: m } = e;
      m === 0 ? A() : f.value = window.setTimeout(A, m);
    }
  }
  function _() {
    const v = l();
    if (e.trigger === "hover" && !v) {
      if (u(), g.value !== null || !s()) return;
      const A = () => {
        w(false), g.value = null;
      }, { duration: m } = e;
      m === 0 ? A() : g.value = window.setTimeout(A, m);
    }
  }
  function k() {
    _();
  }
  function B(v) {
    var A;
    s() && (e.trigger === "click" && (u(), $(), w(false)), (A = e.onClickoutside) === null || A === void 0 || A.call(e, v));
  }
  function C() {
    if (e.trigger === "click" && !l()) {
      u(), $();
      const v = !s();
      w(v);
    }
  }
  function P(v) {
    e.internalTrapFocus && v.key === "Escape" && (u(), $(), w(false));
  }
  function T(v) {
    o.value = v;
  }
  function M() {
    var v;
    return (v = n.value) === null || v === void 0 ? void 0 : v.targetRef;
  }
  function j(v) {
    h = v;
  }
  return Q("NPopover", { getTriggerElement: M, handleKeydown: P, handleMouseEnter: S, handleMouseLeave: _, handleClickOutside: B, handleMouseMoveOutside: k, setBodyInstance: j, positionManuallyRef: b, isMountedRef: t, zIndexRef: G(e, "zIndex"), extraClassRef: G(e, "internalExtraClass"), internalRenderBodyRef: G(e, "internalRenderBody") }), nn(() => {
    i.value && l() && w(false);
  }), { binderInstRef: n, positionManually: b, mergedShowConsideringDisabledProp: a, uncontrolledShow: o, mergedShowArrow: d, getMergedShow: s, setShow: T, handleClick: C, handleMouseEnter: S, handleMouseLeave: _, handleFocus: O, handleBlur: y, syncPosition: p };
}, render() {
  var e;
  const { positionManually: t, $slots: n } = this;
  let r, o = false;
  if (!t && (r = Gr(n, "trigger"), r)) {
    r = lr(r), r = r.type === dr ? x("span", [r]) : r;
    const i = { onClick: this.handleClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur };
    if (!((e = r.type) === null || e === void 0) && e.__popover__) o = true, r.props || (r.props = { internalSyncTargetWithParent: true, internalInheritedEventHandlers: [] }), r.props.internalSyncTargetWithParent = true, r.props.internalInheritedEventHandlers ? r.props.internalInheritedEventHandlers = [i, ...r.props.internalInheritedEventHandlers] : r.props.internalInheritedEventHandlers = [i];
    else {
      const { internalInheritedEventHandlers: a } = this, l = [i, ...a], s = { onBlur: (c) => {
        l.forEach((d) => {
          d.onBlur(c);
        });
      }, onFocus: (c) => {
        l.forEach((d) => {
          d.onFocus(c);
        });
      }, onClick: (c) => {
        l.forEach((d) => {
          d.onClick(c);
        });
      }, onMouseenter: (c) => {
        l.forEach((d) => {
          d.onMouseenter(c);
        });
      }, onMouseleave: (c) => {
        l.forEach((d) => {
          d.onMouseleave(c);
        });
      } };
      Bi(r, a ? "nested" : t ? "manual" : this.trigger, s);
    }
  }
  return x(fn, { ref: "binderInstRef", syncTarget: !o, syncTargetWithParent: this.internalSyncTargetWithParent }, { default: () => {
    this.mergedShowConsideringDisabledProp;
    const i = this.getMergedShow();
    return [this.internalTrapFocus && i ? ze(x("div", { style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 } }), [[pn, { enabled: i, zIndex: this.zIndex }]]) : null, t ? null : x(hn, null, { default: () => r }), x(Ti, on(this.$props, Ni, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), { default: () => {
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
} }), Li = Object.assign(Object.assign({}, We), ie.props), sa = R({ name: "Tooltip", props: Li, slots: Object, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Le(e), n = ie("Tooltip", "-tooltip", void 0, ur, e, t), r = z(null);
  return Object.assign(Object.assign({}, { syncPosition() {
    r.value.syncPosition();
  }, setShow(i) {
    r.value.setShow(i);
  } }), { popoverRef: r, mergedTheme: n, popoverThemeOverrides: N(() => n.value.self) });
}, render() {
  const { mergedTheme: e, internalExtraClass: t } = this;
  return x(En, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
} }), mt = te("n-dropdown-menu"), je = te("n-dropdown"), Vt = te("n-dropdown-option"), Mn = R({ name: "DropdownDivider", props: { clsPrefix: { type: String, required: true } }, render() {
  return x("div", { class: `${this.clsPrefix}-dropdown-divider` });
} }), Ki = R({ name: "DropdownGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { showIconRef: e, hasSubmenuRef: t } = Z(mt), { renderLabelRef: n, labelFieldRef: r, nodePropsRef: o, renderOptionRef: i } = Z(je);
  return { labelField: r, showIcon: e, hasSubmenu: t, renderLabel: n, nodeProps: o, renderOption: i };
}, render() {
  var e;
  const { clsPrefix: t, hasSubmenu: n, showIcon: r, nodeProps: o, renderLabel: i, renderOption: a } = this, { rawNode: l } = this.tmNode, s = x("div", Object.assign({ class: `${t}-dropdown-option` }, o == null ? void 0 : o(l)), x("div", { class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group` }, x("div", { "data-dropdown-option": true, class: [`${t}-dropdown-option-body__prefix`, r && `${t}-dropdown-option-body__prefix--show-icon`] }, Ie(l.icon)), x("div", { class: `${t}-dropdown-option-body__label`, "data-dropdown-option": true }, i ? i(l) : Ie((e = l.title) !== null && e !== void 0 ? e : l[this.labelField])), x("div", { class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`], "data-dropdown-option": true })));
  return a ? a({ node: s, option: l }) : s;
} }), Di = K("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [V("color-transition", { transition: "color .3s var(--n-bezier)" }), V("depth", { color: "var(--n-color)" }, [D("svg", { opacity: "var(--n-opacity)", transition: "opacity .3s var(--n-bezier)" })]), D("svg", { height: "1em", width: "1em" })]), Wi = Object.assign(Object.assign({}, ie.props), { depth: [String, Number], size: [Number, String], color: String, component: [Object, Function] }), ji = R({ _n_icon__: true, name: "Icon", inheritAttrs: false, props: Wi, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: n } = Le(e), r = ie("Icon", "-icon", Di, cr, e, t), o = N(() => {
    const { depth: a } = e, { common: { cubicBezierEaseInOut: l }, self: s } = r.value;
    if (a !== void 0) {
      const { color: c, [`opacity${a}Depth`]: d } = s;
      return { "--n-bezier": l, "--n-color": c, "--n-opacity": d };
    }
    return { "--n-bezier": l, "--n-color": "", "--n-opacity": "" };
  }), i = n ? ft("icon", N(() => `${e.depth || "d"}`), o, e) : void 0;
  return { mergedClsPrefix: t, mergedStyle: N(() => {
    const { size: a, color: l } = e;
    return { fontSize: Me(a), color: l };
  }), cssVars: n ? void 0 : o, themeClass: i == null ? void 0 : i.themeClass, onRender: i == null ? void 0 : i.onRender };
}, render() {
  var e;
  const { $parent: t, depth: n, mergedClsPrefix: r, component: o, onRender: i, themeClass: a } = this;
  return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && $e("icon", "don't wrap `n-icon` inside `n-icon`"), i == null ? void 0 : i(), x("i", Ke(this.$attrs, { role: "img", class: [`${r}-icon`, a, { [`${r}-icon--depth`]: n, [`${r}-icon--color-transition`]: n !== void 0 }], style: [this.cssVars, this.mergedStyle] }), o ? x(o) : this.$slots);
} });
function ut(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function Ri(e) {
  return e.type === "group";
}
function In(e) {
  return e.type === "divider";
}
function Hi(e) {
  return e.type === "render";
}
const kn = R({ name: "DropdownOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null }, placement: { type: String, default: "right-start" }, props: Object, scrollable: Boolean }, setup(e) {
  const t = Z(je), { hoverKeyRef: n, keyboardKeyRef: r, lastToggledSubmenuKeyRef: o, pendingKeyPathRef: i, activeKeyPathRef: a, animatedRef: l, mergedShowRef: s, renderLabelRef: c, renderIconRef: d, labelFieldRef: h, childrenFieldRef: f, renderOptionRef: g, nodePropsRef: b, menuPropsRef: w } = t, p = Z(Vt, null), u = Z(mt), $ = Z(De), O = N(() => e.tmNode.rawNode), y = N(() => {
    const { value: m } = f;
    return ut(e.tmNode.rawNode, m);
  }), S = N(() => {
    const { disabled: m } = e.tmNode;
    return m;
  }), _ = N(() => {
    if (!y.value) return false;
    const { key: m, disabled: I } = e.tmNode;
    if (I) return false;
    const { value: F } = n, { value: Y } = r, { value: le } = o, { value: H } = i;
    return F !== null ? H.includes(m) : Y !== null ? H.includes(m) && H[H.length - 1] !== m : le !== null ? H.includes(m) : false;
  }), k = N(() => r.value === null && !l.value), B = Pr(_, 300, k), C = N(() => !!(p == null ? void 0 : p.enteringSubmenuRef.value)), P = z(false);
  Q(Vt, { enteringSubmenuRef: P });
  function T() {
    P.value = true;
  }
  function M() {
    P.value = false;
  }
  function j() {
    const { parentKey: m, tmNode: I } = e;
    I.disabled || s.value && (o.value = m, r.value = null, n.value = I.key);
  }
  function E() {
    const { tmNode: m } = e;
    m.disabled || s.value && n.value !== m.key && j();
  }
  function v(m) {
    if (e.tmNode.disabled || !s.value) return;
    const { relatedTarget: I } = m;
    I && !At({ target: I }, "dropdownOption") && !At({ target: I }, "scrollbarRail") && (n.value = null);
  }
  function A() {
    const { value: m } = y, { tmNode: I } = e;
    s.value && !m && !I.disabled && (t.doSelect(I.key, I.rawNode), t.doUpdateShow(false));
  }
  return { labelField: h, renderLabel: c, renderIcon: d, siblingHasIcon: u.showIconRef, siblingHasSubmenu: u.hasSubmenuRef, menuProps: w, popoverBody: $, animated: l, mergedShowSubmenu: N(() => B.value && !C.value), rawNode: O, hasSubmenu: y, pending: oe(() => {
    const { value: m } = i, { key: I } = e.tmNode;
    return m.includes(I);
  }), childActive: oe(() => {
    const { value: m } = a, { key: I } = e.tmNode, F = m.findIndex((Y) => I === Y);
    return F === -1 ? false : F < m.length - 1;
  }), active: oe(() => {
    const { value: m } = a, { key: I } = e.tmNode, F = m.findIndex((Y) => I === Y);
    return F === -1 ? false : F === m.length - 1;
  }), mergedDisabled: S, renderOption: g, nodeProps: b, handleClick: A, handleMouseMove: E, handleMouseEnter: j, handleMouseLeave: v, handleSubmenuBeforeEnter: T, handleSubmenuAfterEnter: M };
}, render() {
  var e, t;
  const { animated: n, rawNode: r, mergedShowSubmenu: o, clsPrefix: i, siblingHasIcon: a, siblingHasSubmenu: l, renderLabel: s, renderIcon: c, renderOption: d, nodeProps: h, props: f, scrollable: g } = this;
  let b = null;
  if (o) {
    const $ = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, r, r.children);
    b = x(_n, Object.assign({}, $, { clsPrefix: i, scrollable: this.scrollable, tmNodes: this.tmNode.children, parentKey: this.tmNode.key }));
  }
  const w = { class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`], onMousemove: this.handleMouseMove, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onClick: this.handleClick }, p = h == null ? void 0 : h(r), u = x("div", Object.assign({ class: [`${i}-dropdown-option`, p == null ? void 0 : p.class], "data-dropdown-option": true }, p), x("div", Ke(w, f), [x("div", { class: [`${i}-dropdown-option-body__prefix`, a && `${i}-dropdown-option-body__prefix--show-icon`] }, [c ? c(r) : Ie(r.icon)]), x("div", { "data-dropdown-option": true, class: `${i}-dropdown-option-body__label` }, s ? s(r) : Ie((t = r[this.labelField]) !== null && t !== void 0 ? t : r.title)), x("div", { "data-dropdown-option": true, class: [`${i}-dropdown-option-body__suffix`, l && `${i}-dropdown-option-body__suffix--has-submenu`] }, this.hasSubmenu ? x(ji, null, { default: () => x(ai, null) }) : null)]), this.hasSubmenu ? x(fn, null, { default: () => [x(hn, null, { default: () => x("div", { class: `${i}-dropdown-offset-container` }, x(gn, { show: this.mergedShowSubmenu, placement: this.placement, to: g && this.popoverBody || void 0, teleportDisabled: !g }, { default: () => x("div", { class: `${i}-dropdown-menu-wrapper` }, n ? x(tn, { onBeforeEnter: this.handleSubmenuBeforeEnter, onAfterEnter: this.handleSubmenuAfterEnter, name: "fade-in-scale-up-transition", appear: true }, { default: () => b }) : b) })) })] }) : null);
  return d ? d({ node: u, option: r }) : u;
} }), Gi = R({ name: "NDropdownGroup", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null } }, render() {
  const { tmNode: e, parentKey: t, clsPrefix: n } = this, { children: r } = e;
  return x(Ae, null, x(Ki, { clsPrefix: n, tmNode: e, key: e.key }), r == null ? void 0 : r.map((o) => {
    const { rawNode: i } = o;
    return i.show === false ? null : In(i) ? x(Mn, { clsPrefix: n, key: o.key }) : o.isGroup ? ($e("dropdown", "`group` node is not allowed to be put in `group` node."), null) : x(kn, { clsPrefix: n, tmNode: o, parentKey: t, key: o.key });
  }));
} }), Ui = R({ name: "DropdownRenderOption", props: { tmNode: { type: Object, required: true } }, render() {
  const { rawNode: { render: e, props: t } } = this.tmNode;
  return x("div", t, [e == null ? void 0 : e()]);
} }), _n = R({ name: "DropdownMenu", props: { scrollable: Boolean, showArrow: Boolean, arrowStyle: [String, Object], clsPrefix: { type: String, required: true }, tmNodes: { type: Array, default: () => [] }, parentKey: { type: [String, Number], default: null } }, setup(e) {
  const { renderIconRef: t, childrenFieldRef: n } = Z(je);
  Q(mt, { showIconRef: N(() => {
    const o = t.value;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => o ? o(s) : s.icon);
      const { rawNode: l } = i;
      return o ? o(l) : l.icon;
    });
  }), hasSubmenuRef: N(() => {
    const { value: o } = n;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => ut(s, o));
      const { rawNode: l } = i;
      return ut(l, o);
    });
  }) });
  const r = z(null);
  return Q(vt, null), Q(pt, null), Q(De, r), { bodyRef: r };
}, render() {
  const { parentKey: e, clsPrefix: t, scrollable: n } = this, r = this.tmNodes.map((o) => {
    const { rawNode: i } = o;
    return i.show === false ? null : Hi(i) ? x(Ui, { tmNode: o, key: o.key }) : In(i) ? x(Mn, { clsPrefix: t, key: o.key }) : Ri(i) ? x(Gi, { clsPrefix: t, tmNode: o, parentKey: e, key: o.key }) : x(kn, { clsPrefix: t, tmNode: o, parentKey: e, key: o.key, props: i.props, scrollable: n });
  });
  return x("div", { class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`], ref: "bodyRef" }, n ? x(rn, { contentClass: `${t}-dropdown-menu__content` }, { default: () => r }) : r, this.showArrow ? On({ clsPrefix: t, arrowStyle: this.arrowStyle, arrowClass: void 0, arrowWrapperClass: void 0, arrowWrapperStyle: void 0 }) : null);
} }), Vi = K("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [ki(), K("dropdown-option", `
 position: relative;
 `, [D("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [D("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), K("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [D("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), xe("disabled", [V("pending", `
 color: var(--n-option-text-color-hover);
 `, [J("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), D("&::before", "background-color: var(--n-option-color-hover);")]), V("active", `
 color: var(--n-option-text-color-active);
 `, [J("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), D("&::before", "background-color: var(--n-option-color-active);")]), V("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [J("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), V("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), V("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [J("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [V("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), J("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [V("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), K("icon", `
 font-size: var(--n-option-icon-size);
 `)]), J("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), J("suffix", `
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
 `, [V("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), K("icon", `
 font-size: var(--n-option-icon-size);
 `)]), K("dropdown-menu", "pointer-events: all;")]), K("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), K("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), K("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), D(">", [K("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), xe("scrollable", `
 padding: var(--n-padding);
 `), V("scrollable", [J("content", `
 padding: var(--n-padding);
 `)])]), Zi = { animated: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, size: String, inverted: Boolean, placement: { type: String, default: "bottom" }, onSelect: [Function, Array], options: { type: Array, default: () => [] }, menuProps: Function, showArrow: Boolean, renderLabel: Function, renderIcon: Function, renderOption: Function, nodeProps: Function, labelField: { type: String, default: "label" }, keyField: { type: String, default: "key" }, childrenField: { type: String, default: "children" }, value: [String, Number] }, Xi = Object.keys(We), qi = Object.assign(Object.assign(Object.assign({}, We), Zi), ie.props), la = R({ name: "Dropdown", inheritAttrs: false, props: qi, setup(e) {
  const t = z(false), n = sn(G(e, "show"), t), r = N(() => {
    const { keyField: E, childrenField: v } = e;
    return Ii(e.options, { getKey(A) {
      return A[E];
    }, getDisabled(A) {
      return A.disabled === true;
    }, getIgnored(A) {
      return A.type === "divider" || A.type === "render";
    }, getChildren(A) {
      return A[v];
    } });
  }), o = N(() => r.value.treeNodes), i = z(null), a = z(null), l = z(null), s = N(() => {
    var E, v, A;
    return (A = (v = (E = i.value) !== null && E !== void 0 ? E : a.value) !== null && v !== void 0 ? v : l.value) !== null && A !== void 0 ? A : null;
  }), c = N(() => r.value.getPath(s.value).keyPath), d = N(() => r.value.getPath(e.value).keyPath), h = oe(() => e.keyboard && n.value);
  Cr({ keydown: { ArrowUp: { prevent: true, handler: k }, ArrowRight: { prevent: true, handler: _ }, ArrowDown: { prevent: true, handler: B }, ArrowLeft: { prevent: true, handler: S }, Enter: { prevent: true, handler: C }, Escape: y } }, h);
  const { mergedClsPrefixRef: f, inlineThemeDisabled: g, mergedComponentPropsRef: b } = Le(e), w = N(() => {
    var E, v;
    return e.size || ((v = (E = b == null ? void 0 : b.value) === null || E === void 0 ? void 0 : E.Dropdown) === null || v === void 0 ? void 0 : v.size) || "medium";
  }), p = ie("Dropdown", "-dropdown", Vi, fr, e, f);
  Q(je, { labelFieldRef: G(e, "labelField"), childrenFieldRef: G(e, "childrenField"), renderLabelRef: G(e, "renderLabel"), renderIconRef: G(e, "renderIcon"), hoverKeyRef: i, keyboardKeyRef: a, lastToggledSubmenuKeyRef: l, pendingKeyPathRef: c, activeKeyPathRef: d, animatedRef: G(e, "animated"), mergedShowRef: n, nodePropsRef: G(e, "nodeProps"), renderOptionRef: G(e, "renderOption"), menuPropsRef: G(e, "menuProps"), doSelect: u, doUpdateShow: $ }), ee(n, (E) => {
    !e.animated && !E && O();
  });
  function u(E, v) {
    const { onSelect: A } = e;
    A && ue(A, E, v);
  }
  function $(E) {
    const { "onUpdate:show": v, onUpdateShow: A } = e;
    v && ue(v, E), A && ue(A, E), t.value = E;
  }
  function O() {
    i.value = null, a.value = null, l.value = null;
  }
  function y() {
    $(false);
  }
  function S() {
    T("left");
  }
  function _() {
    T("right");
  }
  function k() {
    T("up");
  }
  function B() {
    T("down");
  }
  function C() {
    const E = P();
    (E == null ? void 0 : E.isLeaf) && n.value && (u(E.key, E.rawNode), $(false));
  }
  function P() {
    var E;
    const { value: v } = r, { value: A } = s;
    return !v || A === null ? null : (E = v.getNode(A)) !== null && E !== void 0 ? E : null;
  }
  function T(E) {
    const { value: v } = s, { value: { getFirstAvailableNode: A } } = r;
    let m = null;
    if (v === null) {
      const I = A();
      I !== null && (m = I.key);
    } else {
      const I = P();
      if (I) {
        let F;
        switch (E) {
          case "down":
            F = I.getNext();
            break;
          case "up":
            F = I.getPrev();
            break;
          case "right":
            F = I.getChild();
            break;
          case "left":
            F = I.getParent();
            break;
        }
        F && (m = F.key);
      }
    }
    m !== null && (i.value = null, a.value = m);
  }
  const M = N(() => {
    const { inverted: E } = e, v = w.value, { common: { cubicBezierEaseInOut: A }, self: m } = p.value, { padding: I, dividerColor: F, borderRadius: Y, optionOpacityDisabled: le, [de("optionIconSuffixWidth", v)]: H, [de("optionSuffixWidth", v)]: Re, [de("optionIconPrefixWidth", v)]: Tn, [de("optionPrefixWidth", v)]: Nn, [de("fontSize", v)]: zn, [de("optionHeight", v)]: Bn, [de("optionIconSize", v)]: Fn } = m, L = { "--n-bezier": A, "--n-font-size": zn, "--n-padding": I, "--n-border-radius": Y, "--n-option-height": Bn, "--n-option-prefix-width": Nn, "--n-option-icon-prefix-width": Tn, "--n-option-suffix-width": Re, "--n-option-icon-suffix-width": H, "--n-option-icon-size": Fn, "--n-divider-color": F, "--n-option-opacity-disabled": le };
    return E ? (L["--n-color"] = m.colorInverted, L["--n-option-color-hover"] = m.optionColorHoverInverted, L["--n-option-color-active"] = m.optionColorActiveInverted, L["--n-option-text-color"] = m.optionTextColorInverted, L["--n-option-text-color-hover"] = m.optionTextColorHoverInverted, L["--n-option-text-color-active"] = m.optionTextColorActiveInverted, L["--n-option-text-color-child-active"] = m.optionTextColorChildActiveInverted, L["--n-prefix-color"] = m.prefixColorInverted, L["--n-suffix-color"] = m.suffixColorInverted, L["--n-group-header-text-color"] = m.groupHeaderTextColorInverted) : (L["--n-color"] = m.color, L["--n-option-color-hover"] = m.optionColorHover, L["--n-option-color-active"] = m.optionColorActive, L["--n-option-text-color"] = m.optionTextColor, L["--n-option-text-color-hover"] = m.optionTextColorHover, L["--n-option-text-color-active"] = m.optionTextColorActive, L["--n-option-text-color-child-active"] = m.optionTextColorChildActive, L["--n-prefix-color"] = m.prefixColor, L["--n-suffix-color"] = m.suffixColor, L["--n-group-header-text-color"] = m.groupHeaderTextColor), L;
  }), j = g ? ft("dropdown", N(() => `${w.value[0]}${e.inverted ? "i" : ""}`), M, e) : void 0;
  return { mergedClsPrefix: f, mergedTheme: p, mergedSize: w, tmNodes: o, mergedShow: n, handleAfterLeave: () => {
    e.animated && O();
  }, doUpdateShow: $, cssVars: g ? void 0 : M, themeClass: j == null ? void 0 : j.themeClass, onRender: j == null ? void 0 : j.onRender };
}, render() {
  const e = (r, o, i, a, l) => {
    var s;
    const { mergedClsPrefix: c, menuProps: d } = this;
    (s = this.onRender) === null || s === void 0 || s.call(this);
    const h = (d == null ? void 0 : d(void 0, this.tmNodes.map((g) => g.rawNode))) || {}, f = { ref: Hr(o), class: [r, `${c}-dropdown`, `${c}-dropdown--${this.mergedSize}-size`, this.themeClass], clsPrefix: c, tmNodes: this.tmNodes, style: [...i, this.cssVars], showArrow: this.showArrow, arrowStyle: this.arrowStyle, scrollable: this.scrollable, onMouseenter: a, onMouseleave: l };
    return x(_n, Ke(this.$attrs, f, h));
  }, { mergedTheme: t } = this, n = { show: this.mergedShow, theme: t.peers.Popover, themeOverrides: t.peerOverrides.Popover, internalOnAfterLeave: this.handleAfterLeave, internalRenderBody: e, onUpdateShow: this.doUpdateShow, "onUpdate:show": void 0 };
  return x(En, Object.assign({}, on(this.$props, Xi), n), { trigger: () => {
    var r, o;
    return (o = (r = this.$slots).default) === null || o === void 0 ? void 0 : o.call(r);
  } });
} });
export {
  sa as A,
  fn as B,
  ai as C,
  la as D,
  jr as F,
  _r as L,
  En as N,
  hn as V,
  vt as a,
  na as b,
  Ot as c,
  pt as d,
  gn as e,
  ki as f,
  ia as g,
  wr as h,
  xr as i,
  be as j,
  At as k,
  vn as l,
  ra as m,
  yr as n,
  we as o,
  De as p,
  ta as q,
  aa as r,
  Ar as s,
  oa as t,
  Cr as u,
  Ii as v,
  Hr as w,
  We as x,
  _e as y,
  pn as z
};
