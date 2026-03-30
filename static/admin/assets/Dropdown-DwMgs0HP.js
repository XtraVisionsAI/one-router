import { o as Me, aw as pe, bk as yt, bl as xt, bm as St, bb as J, bn as $t, au as Q, w as ae, bo as Ct, ax as we, i as X, bp as en, bq as nn, br as _e, aq as te, r as K, d as H, bs as Pt, ag as Z, av as At, aF as Ne, bt as un, bu as Ot, j as y, bv as Mt, bw as zn, aP as Kn, aK as Ln, at as Dn, t as R, bx as _t, by as ke, bz as Ee, bA as Nt, bB as kt, bC as tn, bD as Et, bE as fe, bF as ve, bG as Xe, bH as Fn, bI as Tt, bJ as cn, bK as It, bL as fn, bM as hn, bN as Se, bO as Bt, bP as pn, bQ as zt, bR as Kt, bS as Lt, bT as Dt, bU as Ft, bV as Wt, bW as jt, e as G, f as D, J as be, h as q, g as U, bX as Rt, W as Wn, k as Te, l as re, ab as Gt, Y as jn, m as rn, bY as Ht, a as I, K as vn, bZ as Ut, a2 as Ie, L as Le, T as Rn, b_ as Gn, aG as gn, b4 as Xt, aH as bn, b$ as Yt, c0 as Vt, c1 as qt, b3 as Hn, S as de, c2 as Jt, aU as Ce, aB as Un, c3 as Zt, aI as Qt, c4 as er, P as le } from "./index-DicalUKt.js";
import { c as nr, t as on, i as Xn, g as tr, b as rr, f as $e } from "./get-BZTOcoVz.js";
import { u as Yn } from "./use-merged-state-CkMZ2DWG.js";
import { u as or } from "./use-compitable-Cxdw_G8M.js";
let Pe = [];
const Vn = /* @__PURE__ */ new WeakMap();
function ir() {
  Pe.forEach((e) => e(...Vn.get(e))), Pe = [];
}
function ar(e, ...n) {
  Vn.set(e, n), !Pe.includes(e) && Pe.push(e) === 1 && requestAnimationFrame(ir);
}
function mn(e, n) {
  let { target: t } = e;
  for (; t; ) {
    if (t.dataset && t.dataset[n] !== void 0) return true;
    t = t.parentElement;
  }
  return false;
}
let ce, me;
const sr = () => {
  var e, n;
  ce = yt ? (n = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || n === void 0 ? void 0 : n.ready : void 0, me = false, ce !== void 0 ? ce.then(() => {
    me = true;
  }) : me = true;
};
sr();
function lr(e) {
  if (me) return;
  let n = false;
  Me(() => {
    me || (ce == null ? void 0 : ce.then(() => {
      n || e();
    }));
  }), pe(() => {
    n = true;
  });
}
function dr(e = {}, n) {
  const t = Ct({ ctrl: false, command: false, win: false, shift: false, tab: false }), { keydown: r, keyup: o } = e, i = (s) => {
    switch (s.key) {
      case "Control":
        t.ctrl = true;
        break;
      case "Meta":
        t.command = true, t.win = true;
        break;
      case "Shift":
        t.shift = true;
        break;
      case "Tab":
        t.tab = true;
        break;
    }
    r !== void 0 && Object.keys(r).forEach((u) => {
      if (u !== s.key) return;
      const d = r[u];
      if (typeof d == "function") d(s);
      else {
        const { stop: f = false, prevent: c = false } = d;
        f && s.stopPropagation(), c && s.preventDefault(), d.handler(s);
      }
    });
  }, a = (s) => {
    switch (s.key) {
      case "Control":
        t.ctrl = false;
        break;
      case "Meta":
        t.command = false, t.win = false;
        break;
      case "Shift":
        t.shift = false;
        break;
      case "Tab":
        t.tab = false;
        break;
    }
    o !== void 0 && Object.keys(o).forEach((u) => {
      if (u !== s.key) return;
      const d = o[u];
      if (typeof d == "function") d(s);
      else {
        const { stop: f = false, prevent: c = false } = d;
        f && s.stopPropagation(), c && s.preventDefault(), d.handler(s);
      }
    });
  }, l = () => {
    (n === void 0 || n.value) && (Q("keydown", document, i), Q("keyup", document, a)), n !== void 0 && ae(n, (s) => {
      s ? (Q("keydown", document, i), Q("keyup", document, a)) : (J("keydown", document, i), J("keyup", document, a));
    });
  };
  return xt() ? (St(l), pe(() => {
    (n === void 0 || n.value) && (J("keydown", document, i), J("keyup", document, a));
  })) : l(), $t(t);
}
const Ti = we("n-internal-select-menu"), ur = we("n-internal-select-menu-body"), qn = "__disabled__";
function he(e) {
  const n = X(en, null), t = X(nn, null), r = X(_e, null), o = X(ur, null), i = K();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    Me(() => {
      Q("fullscreenchange", document, a);
    }), pe(() => {
      J("fullscreenchange", document, a);
    });
  }
  return te(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === false ? qn : l === true ? i.value || "body" : l : (n == null ? void 0 : n.value) ? (a = n.value.$el) !== null && a !== void 0 ? a : n.value : (t == null ? void 0 : t.value) ? t.value : (r == null ? void 0 : r.value) ? r.value : (o == null ? void 0 : o.value) ? o.value : l ?? (i.value || "body");
  });
}
he.tdkey = qn;
he.propTo = { type: [String, Object, Boolean], default: void 0 };
function cr(e, n, t) {
  const r = K(e.value);
  let o = null;
  return ae(e, (i) => {
    o !== null && window.clearTimeout(o), i === true ? t && !t.value ? r.value = true : o = window.setTimeout(() => {
      r.value = true;
    }, n) : r.value = false;
  }), r;
}
let oe = null;
function Jn() {
  if (oe === null && (oe = document.getElementById("v-binder-view-measurer"), oe === null)) {
    oe = document.createElement("div"), oe.id = "v-binder-view-measurer";
    const { style: e } = oe;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(oe);
  }
  return oe.getBoundingClientRect();
}
function fr(e, n) {
  const t = Jn();
  return { top: n, left: e, height: 0, width: 0, right: t.width - e, bottom: t.height - n };
}
function De(e) {
  const n = e.getBoundingClientRect(), t = Jn();
  return { left: n.left - t.left, top: n.top - t.top, bottom: t.height + t.top - n.bottom, right: t.width + t.left - n.right, width: n.width, height: n.height };
}
function hr(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Zn(e) {
  if (e === null) return null;
  const n = hr(e);
  if (n === null) return null;
  if (n.nodeType === 9) return document;
  if (n.nodeType === 1) {
    const { overflow: t, overflowX: r, overflowY: o } = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(t + o + r)) return n;
  }
  return Zn(n);
}
const Qn = H({ name: "Binder", props: { syncTargetWithParent: Boolean, syncTarget: { type: Boolean, default: true } }, setup(e) {
  var n;
  Z("VBinder", (n = At()) === null || n === void 0 ? void 0 : n.proxy);
  const t = X("VBinder", null), r = K(null), o = (h) => {
    r.value = h, t && e.syncTargetWithParent && t.setTargetRef(h);
  };
  let i = [];
  const a = () => {
    let h = r.value;
    for (; h = Zn(h), h !== null; ) i.push(h);
    for (const A of i) Q("scroll", A, f, true);
  }, l = () => {
    for (const h of i) J("scroll", h, f, true);
    i = [];
  }, s = /* @__PURE__ */ new Set(), u = (h) => {
    s.size === 0 && a(), s.has(h) || s.add(h);
  }, d = (h) => {
    s.has(h) && s.delete(h), s.size === 0 && l();
  }, f = () => {
    ar(c);
  }, c = () => {
    s.forEach((h) => h());
  }, m = /* @__PURE__ */ new Set(), v = (h) => {
    m.size === 0 && Q("resize", window, S), m.has(h) || m.add(h);
  }, w = (h) => {
    m.has(h) && m.delete(h), m.size === 0 && J("resize", window, S);
  }, S = () => {
    m.forEach((h) => h());
  };
  return pe(() => {
    J("resize", window, S), l();
  }), { targetRef: r, setTargetRef: o, addScrollListener: u, removeScrollListener: d, addResizeListener: v, removeResizeListener: w };
}, render() {
  return Pt("binder", this.$slots);
} }), et = H({ name: "Target", setup() {
  const { setTargetRef: e, syncTarget: n } = X("VBinder");
  return { syncTarget: n, setTargetDirective: { mounted: e, updated: e } };
}, render() {
  const { syncTarget: e, setTargetDirective: n } = this;
  return e ? Ne(un("follower", this.$slots), [[n]]) : un("follower", this.$slots);
} }), ue = "@@mmoContext", pr = { mounted(e, { value: n }) {
  e[ue] = { handler: void 0 }, typeof n == "function" && (e[ue].handler = n, Q("mousemoveoutside", e, n));
}, updated(e, { value: n }) {
  const t = e[ue];
  typeof n == "function" ? t.handler ? t.handler !== n && (J("mousemoveoutside", e, t.handler), t.handler = n, Q("mousemoveoutside", e, n)) : (e[ue].handler = n, Q("mousemoveoutside", e, n)) : t.handler && (J("mousemoveoutside", e, t.handler), t.handler = void 0);
}, unmounted(e) {
  const { handler: n } = e[ue];
  n && J("mousemoveoutside", e, n), e[ue].handler = void 0;
} }, { c: ge } = Ot(), nt = "vueuc-style", ye = { top: "bottom", bottom: "top", left: "right", right: "left" }, wn = { start: "end", center: "center", end: "start" }, Fe = { top: "height", bottom: "height", left: "width", right: "width" }, vr = { "bottom-start": "top left", bottom: "top center", "bottom-end": "top right", "top-start": "bottom left", top: "bottom center", "top-end": "bottom right", "right-start": "top left", right: "center left", "right-end": "bottom left", "left-start": "top right", left: "center right", "left-end": "bottom right" }, gr = { "bottom-start": "bottom left", bottom: "bottom center", "bottom-end": "bottom right", "top-start": "top left", top: "top center", "top-end": "top right", "right-start": "top right", right: "center right", "right-end": "bottom right", "left-start": "top left", left: "center left", "left-end": "bottom left" }, br = { "bottom-start": "right", "bottom-end": "left", "top-start": "right", "top-end": "left", "right-start": "bottom", "right-end": "top", "left-start": "bottom", "left-end": "top" }, yn = { top: true, bottom: false, left: true, right: false }, xn = { top: "end", bottom: "start", left: "end", right: "start" };
function mr(e, n, t, r, o, i) {
  if (!o || i) return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", u = { top: 0, left: 0 };
  const d = (m, v, w) => {
    let S = 0, h = 0;
    const A = t[m] - n[v] - n[m];
    return A > 0 && r && (w ? h = yn[v] ? A : -A : S = yn[v] ? A : -A), { left: S, top: h };
  }, f = a === "left" || a === "right";
  if (s !== "center") {
    const m = br[e], v = ye[m], w = Fe[m];
    if (t[w] > n[w]) {
      if (n[m] + n[w] < t[w]) {
        const S = (t[w] - n[w]) / 2;
        n[m] < S || n[v] < S ? n[m] < n[v] ? (s = wn[l], u = d(w, v, f)) : u = d(w, m, f) : s = "center";
      }
    } else t[w] < n[w] && n[v] < 0 && n[m] > n[v] && (s = wn[l]);
  } else {
    const m = a === "bottom" || a === "top" ? "left" : "top", v = ye[m], w = Fe[m], S = (t[w] - n[w]) / 2;
    (n[m] < S || n[v] < S) && (n[m] > n[v] ? (s = xn[m], u = d(w, m, f)) : (s = xn[v], u = d(w, v, f)));
  }
  let c = a;
  return n[a] < t[Fe[a]] && n[a] < n[ye[a]] && (c = ye[a]), { placement: s !== "center" ? `${c}-${s}` : c, left: u.left, top: u.top };
}
function wr(e, n) {
  return n ? gr[e] : vr[e];
}
function yr(e, n, t, r, o, i) {
  if (i) switch (e) {
    case "bottom-start":
      return { top: `${Math.round(t.top - n.top + t.height)}px`, left: `${Math.round(t.left - n.left)}px`, transform: "translateY(-100%)" };
    case "bottom-end":
      return { top: `${Math.round(t.top - n.top + t.height)}px`, left: `${Math.round(t.left - n.left + t.width)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "top-start":
      return { top: `${Math.round(t.top - n.top)}px`, left: `${Math.round(t.left - n.left)}px`, transform: "" };
    case "top-end":
      return { top: `${Math.round(t.top - n.top)}px`, left: `${Math.round(t.left - n.left + t.width)}px`, transform: "translateX(-100%)" };
    case "right-start":
      return { top: `${Math.round(t.top - n.top)}px`, left: `${Math.round(t.left - n.left + t.width)}px`, transform: "translateX(-100%)" };
    case "right-end":
      return { top: `${Math.round(t.top - n.top + t.height)}px`, left: `${Math.round(t.left - n.left + t.width)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "left-start":
      return { top: `${Math.round(t.top - n.top)}px`, left: `${Math.round(t.left - n.left)}px`, transform: "" };
    case "left-end":
      return { top: `${Math.round(t.top - n.top + t.height)}px`, left: `${Math.round(t.left - n.left)}px`, transform: "translateY(-100%)" };
    case "top":
      return { top: `${Math.round(t.top - n.top)}px`, left: `${Math.round(t.left - n.left + t.width / 2)}px`, transform: "translateX(-50%)" };
    case "right":
      return { top: `${Math.round(t.top - n.top + t.height / 2)}px`, left: `${Math.round(t.left - n.left + t.width)}px`, transform: "translateX(-100%) translateY(-50%)" };
    case "left":
      return { top: `${Math.round(t.top - n.top + t.height / 2)}px`, left: `${Math.round(t.left - n.left)}px`, transform: "translateY(-50%)" };
    case "bottom":
    default:
      return { top: `${Math.round(t.top - n.top + t.height)}px`, left: `${Math.round(t.left - n.left + t.width / 2)}px`, transform: "translateX(-50%) translateY(-100%)" };
  }
  switch (e) {
    case "bottom-start":
      return { top: `${Math.round(t.top - n.top + t.height + r)}px`, left: `${Math.round(t.left - n.left + o)}px`, transform: "" };
    case "bottom-end":
      return { top: `${Math.round(t.top - n.top + t.height + r)}px`, left: `${Math.round(t.left - n.left + t.width + o)}px`, transform: "translateX(-100%)" };
    case "top-start":
      return { top: `${Math.round(t.top - n.top + r)}px`, left: `${Math.round(t.left - n.left + o)}px`, transform: "translateY(-100%)" };
    case "top-end":
      return { top: `${Math.round(t.top - n.top + r)}px`, left: `${Math.round(t.left - n.left + t.width + o)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "right-start":
      return { top: `${Math.round(t.top - n.top + r)}px`, left: `${Math.round(t.left - n.left + t.width + o)}px`, transform: "" };
    case "right-end":
      return { top: `${Math.round(t.top - n.top + t.height + r)}px`, left: `${Math.round(t.left - n.left + t.width + o)}px`, transform: "translateY(-100%)" };
    case "left-start":
      return { top: `${Math.round(t.top - n.top + r)}px`, left: `${Math.round(t.left - n.left + o)}px`, transform: "translateX(-100%)" };
    case "left-end":
      return { top: `${Math.round(t.top - n.top + t.height + r)}px`, left: `${Math.round(t.left - n.left + o)}px`, transform: "translateX(-100%) translateY(-100%)" };
    case "top":
      return { top: `${Math.round(t.top - n.top + r)}px`, left: `${Math.round(t.left - n.left + t.width / 2 + o)}px`, transform: "translateY(-100%) translateX(-50%)" };
    case "right":
      return { top: `${Math.round(t.top - n.top + t.height / 2 + r)}px`, left: `${Math.round(t.left - n.left + t.width + o)}px`, transform: "translateY(-50%)" };
    case "left":
      return { top: `${Math.round(t.top - n.top + t.height / 2 + r)}px`, left: `${Math.round(t.left - n.left + o)}px`, transform: "translateY(-50%) translateX(-100%)" };
    case "bottom":
    default:
      return { top: `${Math.round(t.top - n.top + t.height + r)}px`, left: `${Math.round(t.left - n.left + t.width / 2 + o)}px`, transform: "translateX(-50%)" };
  }
}
const xr = ge([ge(".v-binder-follower-container", { position: "absolute", left: "0", right: "0", top: "0", height: "0", pointerEvents: "none", zIndex: "auto" }), ge(".v-binder-follower-content", { position: "absolute", zIndex: "auto" }, [ge("> *", { pointerEvents: "all" })])]), tt = H({ name: "Follower", inheritAttrs: false, props: { show: Boolean, enabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom" }, syncTrigger: { type: Array, default: ["resize", "scroll"] }, to: [String, Object], flip: { type: Boolean, default: true }, internalShift: Boolean, x: Number, y: Number, width: String, minWidth: String, containerClass: String, teleportDisabled: Boolean, zindexable: { type: Boolean, default: true }, zIndex: Number, overlap: Boolean }, setup(e) {
  const n = X("VBinder"), t = te(() => e.enabled !== void 0 ? e.enabled : e.show), r = K(null), o = K(null), i = () => {
    const { syncTrigger: c } = e;
    c.includes("scroll") && n.addScrollListener(s), c.includes("resize") && n.addResizeListener(s);
  }, a = () => {
    n.removeScrollListener(s), n.removeResizeListener(s);
  };
  Me(() => {
    t.value && (s(), i());
  });
  const l = Kn();
  xr.mount({ id: "vueuc/binder", head: true, anchorMetaName: nt, ssr: l }), pe(() => {
    a();
  }), lr(() => {
    t.value && s();
  });
  const s = () => {
    if (!t.value) return;
    const c = r.value;
    if (c === null) return;
    const m = n.targetRef, { x: v, y: w, overlap: S } = e, h = v !== void 0 && w !== void 0 ? fr(v, w) : De(m);
    c.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), c.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
    const { width: A, minWidth: N, placement: b, internalShift: x, flip: E } = e;
    c.setAttribute("v-placement", b), S ? c.setAttribute("v-overlap", "") : c.removeAttribute("v-overlap");
    const { style: k } = c;
    A === "target" ? k.width = `${h.width}px` : A !== void 0 ? k.width = A : k.width = "", N === "target" ? k.minWidth = `${h.width}px` : N !== void 0 ? k.minWidth = N : k.minWidth = "";
    const B = De(c), $ = De(o.value), { left: P, top: T, placement: M } = mr(b, h, B, x, E, S), W = wr(M, S), { left: O, top: p, transform: C } = yr(M, $, h, T, P, S);
    c.setAttribute("v-placement", M), c.style.setProperty("--v-offset-left", `${Math.round(P)}px`), c.style.setProperty("--v-offset-top", `${Math.round(T)}px`), c.style.transform = `translateX(${O}) translateY(${p}) ${C}`, c.style.setProperty("--v-transform-origin", W), c.style.transformOrigin = W;
  };
  ae(t, (c) => {
    c ? (i(), u()) : a();
  });
  const u = () => {
    Dn().then(s).catch((c) => console.error(c));
  };
  ["placement", "x", "y", "internalShift", "flip", "width", "overlap", "minWidth"].forEach((c) => {
    ae(R(e, c), s);
  }), ["teleportDisabled"].forEach((c) => {
    ae(R(e, c), u);
  }), ae(R(e, "syncTrigger"), (c) => {
    c.includes("resize") ? n.addResizeListener(s) : n.removeResizeListener(s), c.includes("scroll") ? n.addScrollListener(s) : n.removeScrollListener(s);
  });
  const d = Ln(), f = te(() => {
    const { to: c } = e;
    if (c !== void 0) return c;
    d.value;
  });
  return { VBinder: n, mergedEnabled: t, offsetContainerRef: o, followerRef: r, mergedTo: f, syncPosition: s };
}, render() {
  return y(Mt, { show: this.show, to: this.mergedTo, disabled: this.teleportDisabled }, { default: () => {
    var e, n;
    const t = y("div", { class: ["v-binder-follower-container", this.containerClass], ref: "offsetContainerRef" }, [y("div", { class: "v-binder-follower-content", ref: "followerRef" }, (n = (e = this.$slots).default) === null || n === void 0 ? void 0 : n.call(e))]);
    return this.zindexable ? Ne(t, [[zn, { enabled: this.mergedEnabled, zIndex: this.zIndex }]]) : t;
  } });
} }), ee = "v-hidden", Sr = ge("[v-hidden]", { display: "none!important" }), Ii = H({ name: "Overflow", props: { getCounter: Function, getTail: Function, updateCounter: Function, onUpdateCount: Function, onUpdateOverflow: Function }, setup(e, { slots: n }) {
  const t = K(null), r = K(null);
  function o(a) {
    const { value: l } = t, { getCounter: s, getTail: u } = e;
    let d;
    if (s !== void 0 ? d = s() : d = r.value, !l || !d) return;
    d.hasAttribute(ee) && d.removeAttribute(ee);
    const { children: f } = l;
    if (a.showAllItemsBeforeCalculate) for (const N of f) N.hasAttribute(ee) && N.removeAttribute(ee);
    const c = l.offsetWidth, m = [], v = n.tail ? u == null ? void 0 : u() : null;
    let w = v ? v.offsetWidth : 0, S = false;
    const h = l.children.length - (n.tail ? 1 : 0);
    for (let N = 0; N < h - 1; ++N) {
      if (N < 0) continue;
      const b = f[N];
      if (S) {
        b.hasAttribute(ee) || b.setAttribute(ee, "");
        continue;
      } else b.hasAttribute(ee) && b.removeAttribute(ee);
      const x = b.offsetWidth;
      if (w += x, m[N] = x, w > c) {
        const { updateCounter: E } = e;
        for (let k = N; k >= 0; --k) {
          const B = h - 1 - k;
          E !== void 0 ? E(B) : d.textContent = `${B}`;
          const $ = d.offsetWidth;
          if (w -= m[k], w + $ <= c || k === 0) {
            S = true, N = k - 1, v && (N === -1 ? (v.style.maxWidth = `${c - $}px`, v.style.boxSizing = "border-box") : v.style.maxWidth = "");
            const { onUpdateCount: P } = e;
            P && P(B);
            break;
          }
        }
      }
    }
    const { onUpdateOverflow: A } = e;
    S ? A !== void 0 && A(true) : (A !== void 0 && A(false), d.setAttribute(ee, ""));
  }
  const i = Kn();
  return Sr.mount({ id: "vueuc/overflow", head: true, anchorMetaName: nt, ssr: i }), Me(() => o({ showAllItemsBeforeCalculate: false })), { selfRef: t, counterRef: r, sync: o };
}, render() {
  const { $slots: e } = this;
  return Dn(() => this.sync({ showAllItemsBeforeCalculate: false })), y("div", { class: "v-overflow", ref: "selfRef" }, [_t(e, "default"), e.counter ? e.counter() : y("span", { style: { display: "inline-block" }, ref: "counterRef" }), e.tail ? e.tail() : null]);
} });
let We;
function $r() {
  return We === void 0 && (We = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), We;
}
function Cr(e) {
  return (n) => {
    n ? e.value = n.$el : e.value = null;
  };
}
var Ye = ke(Ee, "WeakMap"), Pr = Nt(Object.keys, Object), Ar = Object.prototype, Or = Ar.hasOwnProperty;
function Mr(e) {
  if (!kt(e)) return Pr(e);
  var n = [];
  for (var t in Object(e)) Or.call(e, t) && t != "constructor" && n.push(t);
  return n;
}
function an(e) {
  return tn(e) ? Et(e) : Mr(e);
}
function _r(e, n) {
  for (var t = -1, r = n.length, o = e.length; ++t < r; ) e[o + t] = n[t];
  return e;
}
function Nr(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++t < r; ) {
    var a = e[t];
    n(a, t, e) && (i[o++] = a);
  }
  return i;
}
function kr() {
  return [];
}
var Er = Object.prototype, Tr = Er.propertyIsEnumerable, Sn = Object.getOwnPropertySymbols, Ir = Sn ? function(e) {
  return e == null ? [] : (e = Object(e), Nr(Sn(e), function(n) {
    return Tr.call(e, n);
  }));
} : kr;
function Br(e, n, t) {
  var r = n(e);
  return fe(e) ? r : _r(r, t(e));
}
function $n(e) {
  return Br(e, an, Ir);
}
var Ve = ke(Ee, "DataView"), qe = ke(Ee, "Promise"), Je = ke(Ee, "Set"), Cn = "[object Map]", zr = "[object Object]", Pn = "[object Promise]", An = "[object Set]", On = "[object WeakMap]", Mn = "[object DataView]", Kr = ve(Ve), Lr = ve(Xe), Dr = ve(qe), Fr = ve(Je), Wr = ve(Ye), ie = Fn;
(Ve && ie(new Ve(new ArrayBuffer(1))) != Mn || Xe && ie(new Xe()) != Cn || qe && ie(qe.resolve()) != Pn || Je && ie(new Je()) != An || Ye && ie(new Ye()) != On) && (ie = function(e) {
  var n = Fn(e), t = n == zr ? e.constructor : void 0, r = t ? ve(t) : "";
  if (r) switch (r) {
    case Kr:
      return Mn;
    case Lr:
      return Cn;
    case Dr:
      return Pn;
    case Fr:
      return An;
    case Wr:
      return On;
  }
  return n;
});
var jr = "__lodash_hash_undefined__";
function Rr(e) {
  return this.__data__.set(e, jr), this;
}
function Gr(e) {
  return this.__data__.has(e);
}
function Ae(e) {
  var n = -1, t = e == null ? 0 : e.length;
  for (this.__data__ = new Tt(); ++n < t; ) this.add(e[n]);
}
Ae.prototype.add = Ae.prototype.push = Rr;
Ae.prototype.has = Gr;
function Hr(e, n) {
  for (var t = -1, r = e == null ? 0 : e.length; ++t < r; ) if (n(e[t], t, e)) return true;
  return false;
}
function Ur(e, n) {
  return e.has(n);
}
var Xr = 1, Yr = 2;
function rt(e, n, t, r, o, i) {
  var a = t & Xr, l = e.length, s = n.length;
  if (l != s && !(a && s > l)) return false;
  var u = i.get(e), d = i.get(n);
  if (u && d) return u == n && d == e;
  var f = -1, c = true, m = t & Yr ? new Ae() : void 0;
  for (i.set(e, n), i.set(n, e); ++f < l; ) {
    var v = e[f], w = n[f];
    if (r) var S = a ? r(w, v, f, n, e, i) : r(v, w, f, e, n, i);
    if (S !== void 0) {
      if (S) continue;
      c = false;
      break;
    }
    if (m) {
      if (!Hr(n, function(h, A) {
        if (!Ur(m, A) && (v === h || o(v, h, t, r, i))) return m.push(A);
      })) {
        c = false;
        break;
      }
    } else if (!(v === w || o(v, w, t, r, i))) {
      c = false;
      break;
    }
  }
  return i.delete(e), i.delete(n), c;
}
function Vr(e) {
  var n = -1, t = Array(e.size);
  return e.forEach(function(r, o) {
    t[++n] = [o, r];
  }), t;
}
function qr(e) {
  var n = -1, t = Array(e.size);
  return e.forEach(function(r) {
    t[++n] = r;
  }), t;
}
var Jr = 1, Zr = 2, Qr = "[object Boolean]", eo = "[object Date]", no = "[object Error]", to = "[object Map]", ro = "[object Number]", oo = "[object RegExp]", io = "[object Set]", ao = "[object String]", so = "[object Symbol]", lo = "[object ArrayBuffer]", uo = "[object DataView]", _n = cn ? cn.prototype : void 0, je = _n ? _n.valueOf : void 0;
function co(e, n, t, r, o, i, a) {
  switch (t) {
    case uo:
      if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset) return false;
      e = e.buffer, n = n.buffer;
    case lo:
      return !(e.byteLength != n.byteLength || !i(new fn(e), new fn(n)));
    case Qr:
    case eo:
    case ro:
      return It(+e, +n);
    case no:
      return e.name == n.name && e.message == n.message;
    case oo:
    case ao:
      return e == n + "";
    case to:
      var l = Vr;
    case io:
      var s = r & Jr;
      if (l || (l = qr), e.size != n.size && !s) return false;
      var u = a.get(e);
      if (u) return u == n;
      r |= Zr, a.set(e, n);
      var d = rt(l(e), l(n), r, o, i, a);
      return a.delete(e), d;
    case so:
      if (je) return je.call(e) == je.call(n);
  }
  return false;
}
var fo = 1, ho = Object.prototype, po = ho.hasOwnProperty;
function vo(e, n, t, r, o, i) {
  var a = t & fo, l = $n(e), s = l.length, u = $n(n), d = u.length;
  if (s != d && !a) return false;
  for (var f = s; f--; ) {
    var c = l[f];
    if (!(a ? c in n : po.call(n, c))) return false;
  }
  var m = i.get(e), v = i.get(n);
  if (m && v) return m == n && v == e;
  var w = true;
  i.set(e, n), i.set(n, e);
  for (var S = a; ++f < s; ) {
    c = l[f];
    var h = e[c], A = n[c];
    if (r) var N = a ? r(A, h, c, n, e, i) : r(h, A, c, e, n, i);
    if (!(N === void 0 ? h === A || o(h, A, t, r, i) : N)) {
      w = false;
      break;
    }
    S || (S = c == "constructor");
  }
  if (w && !S) {
    var b = e.constructor, x = n.constructor;
    b != x && "constructor" in e && "constructor" in n && !(typeof b == "function" && b instanceof b && typeof x == "function" && x instanceof x) && (w = false);
  }
  return i.delete(e), i.delete(n), w;
}
var go = 1, Nn = "[object Arguments]", kn = "[object Array]", xe = "[object Object]", bo = Object.prototype, En = bo.hasOwnProperty;
function mo(e, n, t, r, o, i) {
  var a = fe(e), l = fe(n), s = a ? kn : ie(e), u = l ? kn : ie(n);
  s = s == Nn ? xe : s, u = u == Nn ? xe : u;
  var d = s == xe, f = u == xe, c = s == u;
  if (c && hn(e)) {
    if (!hn(n)) return false;
    a = true, d = false;
  }
  if (c && !d) return i || (i = new Se()), a || Bt(e) ? rt(e, n, t, r, o, i) : co(e, n, s, t, r, o, i);
  if (!(t & go)) {
    var m = d && En.call(e, "__wrapped__"), v = f && En.call(n, "__wrapped__");
    if (m || v) {
      var w = m ? e.value() : e, S = v ? n.value() : n;
      return i || (i = new Se()), o(w, S, t, r, i);
    }
  }
  return c ? (i || (i = new Se()), vo(e, n, t, r, o, i)) : false;
}
function sn(e, n, t, r, o) {
  return e === n ? true : e == null || n == null || !pn(e) && !pn(n) ? e !== e && n !== n : mo(e, n, t, r, sn, o);
}
var wo = 1, yo = 2;
function xo(e, n, t, r) {
  var o = t.length, i = o;
  if (e == null) return !i;
  for (e = Object(e); o--; ) {
    var a = t[o];
    if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return false;
  }
  for (; ++o < i; ) {
    a = t[o];
    var l = a[0], s = e[l], u = a[1];
    if (a[2]) {
      if (s === void 0 && !(l in e)) return false;
    } else {
      var d = new Se(), f;
      if (!(f === void 0 ? sn(u, s, wo | yo, r, d) : f)) return false;
    }
  }
  return true;
}
function ot(e) {
  return e === e && !zt(e);
}
function So(e) {
  for (var n = an(e), t = n.length; t--; ) {
    var r = n[t], o = e[r];
    n[t] = [r, o, ot(o)];
  }
  return n;
}
function it(e, n) {
  return function(t) {
    return t == null ? false : t[e] === n && (n !== void 0 || e in Object(t));
  };
}
function $o(e) {
  var n = So(e);
  return n.length == 1 && n[0][2] ? it(n[0][0], n[0][1]) : function(t) {
    return t === e || xo(t, e, n);
  };
}
function Co(e, n) {
  return e != null && n in Object(e);
}
function Po(e, n, t) {
  n = nr(n, e);
  for (var r = -1, o = n.length, i = false; ++r < o; ) {
    var a = on(n[r]);
    if (!(i = e != null && t(e, a))) break;
    e = e[a];
  }
  return i || ++r != o ? i : (o = e == null ? 0 : e.length, !!o && Kt(o) && Lt(a, o) && (fe(e) || Dt(e)));
}
function Ao(e, n) {
  return e != null && Po(e, n, Co);
}
var Oo = 1, Mo = 2;
function _o(e, n) {
  return Xn(e) && ot(n) ? it(on(e), n) : function(t) {
    var r = tr(t, e);
    return r === void 0 && r === n ? Ao(t, e) : sn(n, r, Oo | Mo);
  };
}
function No(e) {
  return function(n) {
    return n == null ? void 0 : n[e];
  };
}
function ko(e) {
  return function(n) {
    return rr(n, e);
  };
}
function Eo(e) {
  return Xn(e) ? No(on(e)) : ko(e);
}
function To(e) {
  return typeof e == "function" ? e : e == null ? Ft : typeof e == "object" ? fe(e) ? _o(e[0], e[1]) : $o(e) : Eo(e);
}
function Io(e, n) {
  return e && Wt(e, n, an);
}
function Bo(e, n) {
  return function(t, r) {
    if (t == null) return t;
    if (!tn(t)) return e(t, r);
    for (var o = t.length, i = -1, a = Object(t); ++i < o && r(a[i], i, a) !== false; ) ;
    return t;
  };
}
var zo = Bo(Io);
function Ko(e, n) {
  var t = -1, r = tn(e) ? Array(e.length) : [];
  return zo(e, function(o, i, a) {
    r[++t] = n(o, i, a);
  }), r;
}
function Lo(e, n) {
  var t = fe(e) ? jt : Ko;
  return t(e, To(n));
}
const Do = H({ name: "ChevronRight", render() {
  return y("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, y("path", { d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z", fill: "currentColor" }));
} });
function Tn(e) {
  return Array.isArray(e) ? e : [e];
}
const Ze = { STOP: "STOP" };
function at(e, n) {
  const t = n(e);
  e.children !== void 0 && t !== Ze.STOP && e.children.forEach((r) => at(r, n));
}
function Fo(e, n = {}) {
  const { preserveGroup: t = false } = n, r = [], o = t ? (a) => {
    a.isLeaf || (r.push(a.key), i(a.children));
  } : (a) => {
    a.isLeaf || (a.isGroup || r.push(a.key), i(a.children));
  };
  function i(a) {
    a.forEach(o);
  }
  return i(e), r;
}
function Wo(e, n) {
  const { isLeaf: t } = e;
  return t !== void 0 ? t : !n(e);
}
function jo(e) {
  return e.children;
}
function Ro(e) {
  return e.key;
}
function Go() {
  return false;
}
function Ho(e, n) {
  const { isLeaf: t } = e;
  return !(t === false && !Array.isArray(n(e)));
}
function Uo(e) {
  return e.disabled === true;
}
function Xo(e, n) {
  return e.isLeaf === false && !Array.isArray(n(e));
}
function Re(e) {
  var n;
  return e == null ? [] : Array.isArray(e) ? e : (n = e.checkedKeys) !== null && n !== void 0 ? n : [];
}
function Ge(e) {
  var n;
  return e == null || Array.isArray(e) ? [] : (n = e.indeterminateKeys) !== null && n !== void 0 ? n : [];
}
function Yo(e, n) {
  const t = new Set(e);
  return n.forEach((r) => {
    t.has(r) || t.add(r);
  }), Array.from(t);
}
function Vo(e, n) {
  const t = new Set(e);
  return n.forEach((r) => {
    t.has(r) && t.delete(r);
  }), Array.from(t);
}
function qo(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function Bi(e) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((t, r) => {
    n.set(t.key, r);
  }), (t) => {
    var r;
    return (r = n.get(t)) !== null && r !== void 0 ? r : null;
  };
}
class Jo extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function Zo(e, n, t, r) {
  return Oe(n.concat(e), t, r, false);
}
function Qo(e, n) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((r) => {
    const o = n.treeNodeMap.get(r);
    if (o !== void 0) {
      let i = o.parent;
      for (; i !== null && !(i.disabled || t.has(i.key)); ) t.add(i.key), i = i.parent;
    }
  }), t;
}
function ei(e, n, t, r) {
  const o = Oe(n, t, r, false), i = Oe(e, t, r, true), a = Qo(e, t), l = [];
  return o.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => o.delete(s)), o;
}
function He(e, n) {
  const { checkedKeys: t, keysToCheck: r, keysToUncheck: o, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: u } = e;
  if (!a) return r !== void 0 ? { checkedKeys: Yo(t, r), indeterminateKeys: Array.from(i) } : o !== void 0 ? { checkedKeys: Vo(t, o), indeterminateKeys: Array.from(i) } : { checkedKeys: Array.from(t), indeterminateKeys: Array.from(i) };
  const { levelTreeNodeMap: d } = n;
  let f;
  o !== void 0 ? f = ei(o, t, n, u) : r !== void 0 ? f = Zo(r, t, n, u) : f = Oe(t, n, u, false);
  const c = s === "parent", m = s === "child" || l, v = f, w = /* @__PURE__ */ new Set(), S = Math.max.apply(null, Array.from(d.keys()));
  for (let h = S; h >= 0; h -= 1) {
    const A = h === 0, N = d.get(h);
    for (const b of N) {
      if (b.isLeaf) continue;
      const { key: x, shallowLoaded: E } = b;
      if (m && E && b.children.forEach((P) => {
        !P.disabled && !P.isLeaf && P.shallowLoaded && v.has(P.key) && v.delete(P.key);
      }), b.disabled || !E) continue;
      let k = true, B = false, $ = true;
      for (const P of b.children) {
        const T = P.key;
        if (!P.disabled) {
          if ($ && ($ = false), v.has(T)) B = true;
          else if (w.has(T)) {
            B = true, k = false;
            break;
          } else if (k = false, B) break;
        }
      }
      k && !$ ? (c && b.children.forEach((P) => {
        !P.disabled && v.has(P.key) && v.delete(P.key);
      }), v.add(x)) : B && w.add(x), A && m && v.has(x) && v.delete(x);
    }
  }
  return { checkedKeys: Array.from(v), indeterminateKeys: Array.from(w) };
}
function Oe(e, n, t, r) {
  const { treeNodeMap: o, getChildren: i } = n, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const u = o.get(s);
    u !== void 0 && at(u, (d) => {
      if (d.disabled) return Ze.STOP;
      const { key: f } = d;
      if (!a.has(f) && (a.add(f), l.add(f), Xo(d.rawNode, i))) {
        if (r) return Ze.STOP;
        if (!t) throw new Jo();
      }
    });
  }), l;
}
function ni(e, { includeGroup: n = false, includeSelf: t = true }, r) {
  var o;
  const i = r.treeNodeMap;
  let a = e == null ? null : (o = i.get(e)) !== null && o !== void 0 ? o : null;
  const l = { keyPath: [], treeNodePath: [], treeNode: a };
  if (a == null ? void 0 : a.ignored) return l.treeNode = null, l;
  for (; a; ) !a.ignored && (n || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), t || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function ti(e) {
  if (e.length === 0) return null;
  const n = e[0];
  return n.isGroup || n.ignored || n.disabled ? n.getNext() : n;
}
function ri(e, n) {
  const t = e.siblings, r = t.length, { index: o } = e;
  return n ? t[(o + 1) % r] : o === t.length - 1 ? null : t[o + 1];
}
function In(e, n, { loop: t = false, includeDisabled: r = false } = {}) {
  const o = n === "prev" ? oi : ri, i = { reverse: n === "prev" };
  let a = false, l = null;
  function s(u) {
    if (u !== null) {
      if (u === e) {
        if (!a) a = true;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!u.disabled || r) && !u.ignored && !u.isGroup) {
        l = u;
        return;
      }
      if (u.isGroup) {
        const d = ln(u, i);
        d !== null ? l = d : s(o(u, t));
      } else {
        const d = o(u, false);
        if (d !== null) s(d);
        else {
          const f = ii(u);
          (f == null ? void 0 : f.isGroup) ? s(o(f, t)) : t && s(o(u, true));
        }
      }
    }
  }
  return s(e), l;
}
function oi(e, n) {
  const t = e.siblings, r = t.length, { index: o } = e;
  return n ? t[(o - 1 + r) % r] : o === 0 ? null : t[o - 1];
}
function ii(e) {
  return e.parent;
}
function ln(e, n = {}) {
  const { reverse: t = false } = n, { children: r } = e;
  if (r) {
    const { length: o } = r, i = t ? o - 1 : 0, a = t ? -1 : o, l = t ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const u = r[s];
      if (!u.disabled && !u.ignored) if (u.isGroup) {
        const d = ln(u, n);
        if (d !== null) return d;
      } else return u;
    }
  }
  return null;
}
const ai = { getChild() {
  return this.ignored ? null : ln(this);
}, getParent() {
  const { parent: e } = this;
  return (e == null ? void 0 : e.isGroup) ? e.getParent() : e;
}, getNext(e = {}) {
  return In(this, "next", e);
}, getPrev(e = {}) {
  return In(this, "prev", e);
} };
function si(e, n) {
  const t = n ? new Set(n) : void 0, r = [];
  function o(i) {
    i.forEach((a) => {
      r.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || t === void 0 || t.has(a.key)) && o(a.children);
    });
  }
  return o(e), r;
}
function li(e, n) {
  const t = e.key;
  for (; n; ) {
    if (n.key === t) return true;
    n = n.parent;
  }
  return false;
}
function st(e, n, t, r, o, i = null, a = 0) {
  const l = [];
  return e.forEach((s, u) => {
    var d;
    const f = Object.create(r);
    if (f.rawNode = s, f.siblings = l, f.level = a, f.index = u, f.isFirstChild = u === 0, f.isLastChild = u + 1 === e.length, f.parent = i, !f.ignored) {
      const c = o(s);
      Array.isArray(c) && (f.children = st(c, n, t, r, o, f, a + 1));
    }
    l.push(f), n.set(f.key, f), t.has(a) || t.set(a, []), (d = t.get(a)) === null || d === void 0 || d.push(f);
  }), l;
}
function di(e, n = {}) {
  var t;
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), { getDisabled: i = Uo, getIgnored: a = Go, getIsGroup: l = qo, getKey: s = Ro } = n, u = (t = n.getChildren) !== null && t !== void 0 ? t : jo, d = n.ignoreEmptyChildren ? (b) => {
    const x = u(b);
    return Array.isArray(x) ? x.length ? x : null : x;
  } : u, f = Object.assign({ get key() {
    return s(this.rawNode);
  }, get disabled() {
    return i(this.rawNode);
  }, get isGroup() {
    return l(this.rawNode);
  }, get isLeaf() {
    return Wo(this.rawNode, d);
  }, get shallowLoaded() {
    return Ho(this.rawNode, d);
  }, get ignored() {
    return a(this.rawNode);
  }, contains(b) {
    return li(this, b);
  } }, ai), c = st(e, r, o, f, d);
  function m(b) {
    if (b == null) return null;
    const x = r.get(b);
    return x && !x.isGroup && !x.ignored ? x : null;
  }
  function v(b) {
    if (b == null) return null;
    const x = r.get(b);
    return x && !x.ignored ? x : null;
  }
  function w(b, x) {
    const E = v(b);
    return E ? E.getPrev(x) : null;
  }
  function S(b, x) {
    const E = v(b);
    return E ? E.getNext(x) : null;
  }
  function h(b) {
    const x = v(b);
    return x ? x.getParent() : null;
  }
  function A(b) {
    const x = v(b);
    return x ? x.getChild() : null;
  }
  const N = { treeNodes: c, treeNodeMap: r, levelTreeNodeMap: o, maxLevel: Math.max(...o.keys()), getChildren: d, getFlattenedNodes(b) {
    return si(c, b);
  }, getNode: m, getPrev: w, getNext: S, getParent: h, getChild: A, getFirstAvailableNode() {
    return ti(c);
  }, getPath(b, x = {}) {
    return ni(b, x, N);
  }, getCheckedKeys(b, x = {}) {
    const { cascade: E = true, leafOnly: k = false, checkStrategy: B = "all", allowNotLoaded: $ = false } = x;
    return He({ checkedKeys: Re(b), indeterminateKeys: Ge(b), cascade: E, leafOnly: k, checkStrategy: B, allowNotLoaded: $ }, N);
  }, check(b, x, E = {}) {
    const { cascade: k = true, leafOnly: B = false, checkStrategy: $ = "all", allowNotLoaded: P = false } = E;
    return He({ checkedKeys: Re(x), indeterminateKeys: Ge(x), keysToCheck: b == null ? [] : Tn(b), cascade: k, leafOnly: B, checkStrategy: $, allowNotLoaded: P }, N);
  }, uncheck(b, x, E = {}) {
    const { cascade: k = true, leafOnly: B = false, checkStrategy: $ = "all", allowNotLoaded: P = false } = E;
    return He({ checkedKeys: Re(x), indeterminateKeys: Ge(x), keysToUncheck: b == null ? [] : Tn(b), cascade: k, leafOnly: B, checkStrategy: $, allowNotLoaded: P }, N);
  }, getNonLeafKeys(b = {}) {
    return Fo(c, b);
  } };
  return N;
}
const Ue = { top: "bottom", bottom: "top", left: "right", right: "left" }, F = "var(--n-arrow-height) * 1.414", ui = G([D("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [G(">", [D("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), be("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [be("scrollable", [be("show-header-or-footer", "padding: var(--n-padding);")])]), q("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), q("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), U("scrollable, show-header-or-footer", [q("content", `
 padding: var(--n-padding);
 `)])]), D("popover-shared", `
 transform-origin: inherit;
 `, [D("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [D("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${F});
 height: calc(${F});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]), G("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `), G("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `), G("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `), G("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]), Y("top-start", `
 top: calc(${F} / -2);
 left: calc(${ne("top-start")} - var(--v-offset-left));
 `), Y("top", `
 top: calc(${F} / -2);
 transform: translateX(calc(${F} / -2)) rotate(45deg);
 left: 50%;
 `), Y("top-end", `
 top: calc(${F} / -2);
 right: calc(${ne("top-end")} + var(--v-offset-left));
 `), Y("bottom-start", `
 bottom: calc(${F} / -2);
 left: calc(${ne("bottom-start")} - var(--v-offset-left));
 `), Y("bottom", `
 bottom: calc(${F} / -2);
 transform: translateX(calc(${F} / -2)) rotate(45deg);
 left: 50%;
 `), Y("bottom-end", `
 bottom: calc(${F} / -2);
 right: calc(${ne("bottom-end")} + var(--v-offset-left));
 `), Y("left-start", `
 left: calc(${F} / -2);
 top: calc(${ne("left-start")} - var(--v-offset-top));
 `), Y("left", `
 left: calc(${F} / -2);
 transform: translateY(calc(${F} / -2)) rotate(45deg);
 top: 50%;
 `), Y("left-end", `
 left: calc(${F} / -2);
 bottom: calc(${ne("left-end")} + var(--v-offset-top));
 `), Y("right-start", `
 right: calc(${F} / -2);
 top: calc(${ne("right-start")} - var(--v-offset-top));
 `), Y("right", `
 right: calc(${F} / -2);
 transform: translateY(calc(${F} / -2)) rotate(45deg);
 top: 50%;
 `), Y("right-end", `
 right: calc(${F} / -2);
 bottom: calc(${ne("right-end")} + var(--v-offset-top));
 `), ...Lo({ top: ["right-start", "left-start"], right: ["top-end", "bottom-end"], bottom: ["right-end", "left-end"], left: ["top-start", "bottom-start"] }, (e, n) => {
  const t = ["right", "left"].includes(n), r = t ? "width" : "height";
  return e.map((o) => {
    const i = o.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${F}) / 2)`, s = ne(o);
    return G(`[v-placement="${o}"] >`, [D("popover-shared", [U("center-arrow", [D("popover-arrow", `${n}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${t ? "left" : "top"}));`)])])]);
  });
})]);
function ne(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function Y(e, n) {
  const t = e.split("-")[0], r = ["top", "bottom"].includes(t) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return G(`[v-placement="${e}"] >`, [D("popover-shared", `
 margin-${Ue[t]}: var(--n-space);
 `, [U("show-arrow", `
 margin-${Ue[t]}: var(--n-space-arrow);
 `), U("overlap", `
 margin: 0;
 `), Rt("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${t}: 100%;
 ${Ue[t]}: auto;
 ${r}
 `, [D("popover-arrow", n)])])]);
}
const lt = Object.assign(Object.assign({}, re.props), { to: he.propTo, show: Boolean, trigger: String, showArrow: Boolean, delay: Number, duration: Number, raw: Boolean, arrowPointToCenter: Boolean, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], displayDirective: String, x: Number, y: Number, flip: Boolean, overlap: Boolean, placement: String, width: [Number, String], keepAliveOnHover: Boolean, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], internalDeactivateImmediately: Boolean, animated: Boolean, onClickoutside: Function, internalTrapFocus: Boolean, internalOnAfterLeave: Function, minWidth: Number, maxWidth: Number });
function dt({ arrowClass: e, arrowStyle: n, arrowWrapperClass: t, arrowWrapperStyle: r, clsPrefix: o }) {
  return y("div", { key: "__popover-arrow__", style: r, class: [`${o}-popover-arrow-wrapper`, t] }, y("div", { class: [`${o}-popover-arrow`, e], style: n }));
}
const ci = H({ name: "PopoverBody", inheritAttrs: false, props: lt, setup(e, { slots: n, attrs: t }) {
  const { namespaceRef: r, mergedClsPrefixRef: o, inlineThemeDisabled: i, mergedRtlRef: a } = Te(e), l = re("Popover", "-popover", ui, Ht, e, o), s = Gt("Popover", a, o), u = K(null), d = X("NPopover"), f = K(null), c = K(e.show), m = K(false);
  jn(() => {
    const { show: $ } = e;
    $ && !$r() && !e.internalDeactivateImmediately && (m.value = true);
  });
  const v = I(() => {
    const { trigger: $, onClickoutside: P } = e, T = [], { positionManuallyRef: { value: M } } = d;
    return M || ($ === "click" && !P && T.push([gn, E, void 0, { capture: true }]), $ === "hover" && T.push([pr, x])), P && T.push([gn, E, void 0, { capture: true }]), (e.displayDirective === "show" || e.animated && m.value) && T.push([Xt, e.show]), T;
  }), w = I(() => {
    const { common: { cubicBezierEaseInOut: $, cubicBezierEaseIn: P, cubicBezierEaseOut: T }, self: { space: M, spaceArrow: W, padding: O, fontSize: p, textColor: C, dividerColor: g, color: _, boxShadow: z, borderRadius: V, arrowHeight: se, arrowOffset: j, arrowOffsetVertical: Ke } } = l.value;
    return { "--n-box-shadow": z, "--n-bezier": $, "--n-bezier-ease-in": P, "--n-bezier-ease-out": T, "--n-font-size": p, "--n-text-color": C, "--n-color": _, "--n-divider-color": g, "--n-border-radius": V, "--n-arrow-height": se, "--n-arrow-offset": j, "--n-arrow-offset-vertical": Ke, "--n-padding": O, "--n-space": M, "--n-space-arrow": W };
  }), S = I(() => {
    const $ = e.width === "trigger" ? void 0 : $e(e.width), P = [];
    $ && P.push({ width: $ });
    const { maxWidth: T, minWidth: M } = e;
    return T && P.push({ maxWidth: $e(T) }), M && P.push({ maxWidth: $e(M) }), i || P.push(w.value), P;
  }), h = i ? rn("popover", void 0, w, e) : void 0;
  d.setBodyInstance({ syncPosition: A }), pe(() => {
    d.setBodyInstance(null);
  }), ae(R(e, "show"), ($) => {
    e.animated || ($ ? c.value = true : c.value = false);
  });
  function A() {
    var $;
    ($ = u.value) === null || $ === void 0 || $.syncPosition();
  }
  function N($) {
    e.trigger === "hover" && e.keepAliveOnHover && e.show && d.handleMouseEnter($);
  }
  function b($) {
    e.trigger === "hover" && e.keepAliveOnHover && d.handleMouseLeave($);
  }
  function x($) {
    e.trigger === "hover" && !k().contains(bn($)) && d.handleMouseMoveOutside($);
  }
  function E($) {
    (e.trigger === "click" && !k().contains(bn($)) || e.onClickoutside) && d.handleClickOutside($);
  }
  function k() {
    return d.getTriggerElement();
  }
  Z(_e, f), Z(nn, null), Z(en, null);
  function B() {
    if (h == null ? void 0 : h.onRender(), !(e.displayDirective === "show" || e.show || e.animated && m.value)) return null;
    let P;
    const T = d.internalRenderBodyRef.value, { value: M } = o;
    if (T) P = T([`${M}-popover-shared`, (s == null ? void 0 : s.value) && `${M}-popover--rtl`, h == null ? void 0 : h.themeClass.value, e.overlap && `${M}-popover-shared--overlap`, e.showArrow && `${M}-popover-shared--show-arrow`, e.arrowPointToCenter && `${M}-popover-shared--center-arrow`], f, S.value, N, b);
    else {
      const { value: W } = d.extraClassRef, { internalTrapFocus: O } = e, p = !vn(n.header) || !vn(n.footer), C = () => {
        var g, _;
        const z = p ? y(Rn, null, Le(n.header, (j) => j ? y("div", { class: [`${M}-popover__header`, e.headerClass], style: e.headerStyle }, j) : null), Le(n.default, (j) => j ? y("div", { class: [`${M}-popover__content`, e.contentClass], style: e.contentStyle }, n) : null), Le(n.footer, (j) => j ? y("div", { class: [`${M}-popover__footer`, e.footerClass], style: e.footerStyle }, j) : null)) : e.scrollable ? (g = n.default) === null || g === void 0 ? void 0 : g.call(n) : y("div", { class: [`${M}-popover__content`, e.contentClass], style: e.contentStyle }, n), V = e.scrollable ? y(Gn, { themeOverrides: l.value.peerOverrides.Scrollbar, theme: l.value.peers.Scrollbar, contentClass: p ? void 0 : `${M}-popover__content ${(_ = e.contentClass) !== null && _ !== void 0 ? _ : ""}`, contentStyle: p ? void 0 : e.contentStyle }, { default: () => z }) : z, se = e.showArrow ? dt({ arrowClass: e.arrowClass, arrowStyle: e.arrowStyle, arrowWrapperClass: e.arrowWrapperClass, arrowWrapperStyle: e.arrowWrapperStyle, clsPrefix: M }) : null;
        return [V, se];
      };
      P = y("div", Ie({ class: [`${M}-popover`, `${M}-popover-shared`, (s == null ? void 0 : s.value) && `${M}-popover--rtl`, h == null ? void 0 : h.themeClass.value, W.map((g) => `${M}-${g}`), { [`${M}-popover--scrollable`]: e.scrollable, [`${M}-popover--show-header-or-footer`]: p, [`${M}-popover--raw`]: e.raw, [`${M}-popover-shared--overlap`]: e.overlap, [`${M}-popover-shared--show-arrow`]: e.showArrow, [`${M}-popover-shared--center-arrow`]: e.arrowPointToCenter }], ref: f, style: S.value, onKeydown: d.handleKeydown, onMouseenter: N, onMouseleave: b }, t), O ? y(Ut, { active: e.show, autoFocus: true }, { default: C }) : C());
    }
    return Ne(P, v.value);
  }
  return { displayed: m, namespace: r, isMounted: d.isMountedRef, zIndex: d.zIndexRef, followerRef: u, adjustedTo: he(e), followerEnabled: c, renderContentNode: B };
}, render() {
  return y(tt, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === he.tdkey }, { default: () => this.animated ? y(Wn, { name: "popover-transition", appear: this.isMounted, onEnter: () => {
    this.followerEnabled = true;
  }, onAfterLeave: () => {
    var e;
    (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = false, this.displayed = false;
  } }, { default: this.renderContentNode }) : this.renderContentNode() });
} }), fi = Object.keys(lt), hi = { focus: ["onFocus", "onBlur"], click: ["onClick"], hover: ["onMouseenter", "onMouseleave"], manual: [], nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"] };
function pi(e, n, t) {
  hi[n].forEach((r) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const o = e.props[r], i = t[r];
    o ? e.props[r] = (...a) => {
      o(...a), i(...a);
    } : e.props[r] = i;
  });
}
const Be = { show: { type: Boolean, default: void 0 }, defaultShow: Boolean, showArrow: { type: Boolean, default: true }, trigger: { type: String, default: "hover" }, delay: { type: Number, default: 100 }, duration: { type: Number, default: 100 }, raw: Boolean, placement: { type: String, default: "top" }, x: Number, y: Number, arrowPointToCenter: Boolean, disabled: Boolean, getDisabled: Function, displayDirective: { type: String, default: "if" }, arrowClass: String, arrowStyle: [String, Object], arrowWrapperClass: String, arrowWrapperStyle: [String, Object], flip: { type: Boolean, default: true }, animated: { type: Boolean, default: true }, width: { type: [Number, String], default: void 0 }, overlap: Boolean, keepAliveOnHover: { type: Boolean, default: true }, zIndex: Number, to: he.propTo, scrollable: Boolean, contentClass: String, contentStyle: [Object, String], headerClass: String, headerStyle: [Object, String], footerClass: String, footerStyle: [Object, String], onClickoutside: Function, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], internalDeactivateImmediately: Boolean, internalSyncTargetWithParent: Boolean, internalInheritedEventHandlers: { type: Array, default: () => [] }, internalTrapFocus: Boolean, internalExtraClass: { type: Array, default: () => [] }, onShow: [Function, Array], onHide: [Function, Array], arrow: { type: Boolean, default: void 0 }, minWidth: Number, maxWidth: Number }, vi = Object.assign(Object.assign(Object.assign({}, re.props), Be), { internalOnAfterLeave: Function, internalRenderBody: Function }), ut = H({ name: "Popover", inheritAttrs: false, props: vi, slots: Object, __popover__: true, setup(e) {
  const n = Ln(), t = K(null), r = I(() => e.show), o = K(e.defaultShow), i = Yn(r, o), a = te(() => e.disabled ? false : i.value), l = () => {
    if (e.disabled) return true;
    const { getDisabled: p } = e;
    return !!(p == null ? void 0 : p());
  }, s = () => l() ? false : i.value, u = or(e, ["arrow", "showArrow"]), d = I(() => e.overlap ? false : u.value);
  let f = null;
  const c = K(null), m = K(null), v = te(() => e.x !== void 0 && e.y !== void 0);
  function w(p) {
    const { "onUpdate:show": C, onUpdateShow: g, onShow: _, onHide: z } = e;
    o.value = p, C && de(C, p), g && de(g, p), p && _ && de(_, true), p && z && de(z, false);
  }
  function S() {
    f && f.syncPosition();
  }
  function h() {
    const { value: p } = c;
    p && (window.clearTimeout(p), c.value = null);
  }
  function A() {
    const { value: p } = m;
    p && (window.clearTimeout(p), m.value = null);
  }
  function N() {
    const p = l();
    if (e.trigger === "focus" && !p) {
      if (s()) return;
      w(true);
    }
  }
  function b() {
    const p = l();
    if (e.trigger === "focus" && !p) {
      if (!s()) return;
      w(false);
    }
  }
  function x() {
    const p = l();
    if (e.trigger === "hover" && !p) {
      if (A(), c.value !== null || s()) return;
      const C = () => {
        w(true), c.value = null;
      }, { delay: g } = e;
      g === 0 ? C() : c.value = window.setTimeout(C, g);
    }
  }
  function E() {
    const p = l();
    if (e.trigger === "hover" && !p) {
      if (h(), m.value !== null || !s()) return;
      const C = () => {
        w(false), m.value = null;
      }, { duration: g } = e;
      g === 0 ? C() : m.value = window.setTimeout(C, g);
    }
  }
  function k() {
    E();
  }
  function B(p) {
    var C;
    s() && (e.trigger === "click" && (h(), A(), w(false)), (C = e.onClickoutside) === null || C === void 0 || C.call(e, p));
  }
  function $() {
    if (e.trigger === "click" && !l()) {
      h(), A();
      const p = !s();
      w(p);
    }
  }
  function P(p) {
    e.internalTrapFocus && p.key === "Escape" && (h(), A(), w(false));
  }
  function T(p) {
    o.value = p;
  }
  function M() {
    var p;
    return (p = t.value) === null || p === void 0 ? void 0 : p.targetRef;
  }
  function W(p) {
    f = p;
  }
  return Z("NPopover", { getTriggerElement: M, handleKeydown: P, handleMouseEnter: x, handleMouseLeave: E, handleClickOutside: B, handleMouseMoveOutside: k, setBodyInstance: W, positionManuallyRef: v, isMountedRef: n, zIndexRef: R(e, "zIndex"), extraClassRef: R(e, "internalExtraClass"), internalRenderBodyRef: R(e, "internalRenderBody") }), jn(() => {
    i.value && l() && w(false);
  }), { binderInstRef: t, positionManually: v, mergedShowConsideringDisabledProp: a, uncontrolledShow: o, mergedShowArrow: d, getMergedShow: s, setShow: T, handleClick: $, handleMouseEnter: x, handleMouseLeave: E, handleFocus: N, handleBlur: b, syncPosition: S };
}, render() {
  var e;
  const { positionManually: n, $slots: t } = this;
  let r, o = false;
  if (!n && (r = Yt(t, "trigger"), r)) {
    r = Vt(r), r = r.type === qt ? y("span", [r]) : r;
    const i = { onClick: this.handleClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur };
    if (!((e = r.type) === null || e === void 0) && e.__popover__) o = true, r.props || (r.props = { internalSyncTargetWithParent: true, internalInheritedEventHandlers: [] }), r.props.internalSyncTargetWithParent = true, r.props.internalInheritedEventHandlers ? r.props.internalInheritedEventHandlers = [i, ...r.props.internalInheritedEventHandlers] : r.props.internalInheritedEventHandlers = [i];
    else {
      const { internalInheritedEventHandlers: a } = this, l = [i, ...a], s = { onBlur: (u) => {
        l.forEach((d) => {
          d.onBlur(u);
        });
      }, onFocus: (u) => {
        l.forEach((d) => {
          d.onFocus(u);
        });
      }, onClick: (u) => {
        l.forEach((d) => {
          d.onClick(u);
        });
      }, onMouseenter: (u) => {
        l.forEach((d) => {
          d.onMouseenter(u);
        });
      }, onMouseleave: (u) => {
        l.forEach((d) => {
          d.onMouseleave(u);
        });
      } };
      pi(r, a ? "nested" : n ? "manual" : this.trigger, s);
    }
  }
  return y(Qn, { ref: "binderInstRef", syncTarget: !o, syncTargetWithParent: this.internalSyncTargetWithParent }, { default: () => {
    this.mergedShowConsideringDisabledProp;
    const i = this.getMergedShow();
    return [this.internalTrapFocus && i ? Ne(y("div", { style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 } }), [[zn, { enabled: i, zIndex: this.zIndex }]]) : null, n ? null : y(et, null, { default: () => r }), y(ci, Hn(this.$props, fi, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), { default: () => {
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
} }), gi = Object.assign(Object.assign({}, Be), re.props), zi = H({ name: "Tooltip", props: gi, slots: Object, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: n } = Te(e), t = re("Tooltip", "-tooltip", void 0, Jt, e, n), r = K(null);
  return Object.assign(Object.assign({}, { syncPosition() {
    r.value.syncPosition();
  }, setShow(i) {
    r.value.setShow(i);
  } }), { popoverRef: r, mergedTheme: t, popoverThemeOverrides: I(() => t.value.self) });
}, render() {
  const { mergedTheme: e, internalExtraClass: n } = this;
  return y(ut, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: n.concat("tooltip"), ref: "popoverRef" }), this.$slots);
} }), dn = we("n-dropdown-menu"), ze = we("n-dropdown"), Bn = we("n-dropdown-option"), ct = H({ name: "DropdownDivider", props: { clsPrefix: { type: String, required: true } }, render() {
  return y("div", { class: `${this.clsPrefix}-dropdown-divider` });
} }), bi = H({ name: "DropdownGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { showIconRef: e, hasSubmenuRef: n } = X(dn), { renderLabelRef: t, labelFieldRef: r, nodePropsRef: o, renderOptionRef: i } = X(ze);
  return { labelField: r, showIcon: e, hasSubmenu: n, renderLabel: t, nodeProps: o, renderOption: i };
}, render() {
  var e;
  const { clsPrefix: n, hasSubmenu: t, showIcon: r, nodeProps: o, renderLabel: i, renderOption: a } = this, { rawNode: l } = this.tmNode, s = y("div", Object.assign({ class: `${n}-dropdown-option` }, o == null ? void 0 : o(l)), y("div", { class: `${n}-dropdown-option-body ${n}-dropdown-option-body--group` }, y("div", { "data-dropdown-option": true, class: [`${n}-dropdown-option-body__prefix`, r && `${n}-dropdown-option-body__prefix--show-icon`] }, Ce(l.icon)), y("div", { class: `${n}-dropdown-option-body__label`, "data-dropdown-option": true }, i ? i(l) : Ce((e = l.title) !== null && e !== void 0 ? e : l[this.labelField])), y("div", { class: [`${n}-dropdown-option-body__suffix`, t && `${n}-dropdown-option-body__suffix--has-submenu`], "data-dropdown-option": true })));
  return a ? a({ node: s, option: l }) : s;
} }), mi = D("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [U("color-transition", { transition: "color .3s var(--n-bezier)" }), U("depth", { color: "var(--n-color)" }, [G("svg", { opacity: "var(--n-opacity)", transition: "opacity .3s var(--n-bezier)" })]), G("svg", { height: "1em", width: "1em" })]), wi = Object.assign(Object.assign({}, re.props), { depth: [String, Number], size: [Number, String], color: String, component: [Object, Function] }), yi = H({ _n_icon__: true, name: "Icon", inheritAttrs: false, props: wi, setup(e) {
  const { mergedClsPrefixRef: n, inlineThemeDisabled: t } = Te(e), r = re("Icon", "-icon", mi, Zt, e, n), o = I(() => {
    const { depth: a } = e, { common: { cubicBezierEaseInOut: l }, self: s } = r.value;
    if (a !== void 0) {
      const { color: u, [`opacity${a}Depth`]: d } = s;
      return { "--n-bezier": l, "--n-color": u, "--n-opacity": d };
    }
    return { "--n-bezier": l, "--n-color": "", "--n-opacity": "" };
  }), i = t ? rn("icon", I(() => `${e.depth || "d"}`), o, e) : void 0;
  return { mergedClsPrefix: n, mergedStyle: I(() => {
    const { size: a, color: l } = e;
    return { fontSize: $e(a), color: l };
  }), cssVars: t ? void 0 : o, themeClass: i == null ? void 0 : i.themeClass, onRender: i == null ? void 0 : i.onRender };
}, render() {
  var e;
  const { $parent: n, depth: t, mergedClsPrefix: r, component: o, onRender: i, themeClass: a } = this;
  return !((e = n == null ? void 0 : n.$options) === null || e === void 0) && e._n_icon__ && Un("icon", "don't wrap `n-icon` inside `n-icon`"), i == null ? void 0 : i(), y("i", Ie(this.$attrs, { role: "img", class: [`${r}-icon`, a, { [`${r}-icon--depth`]: t, [`${r}-icon--color-transition`]: t !== void 0 }], style: [this.cssVars, this.mergedStyle] }), o ? y(o) : this.$slots);
} });
function Qe(e, n) {
  return e.type === "submenu" || e.type === void 0 && e[n] !== void 0;
}
function xi(e) {
  return e.type === "group";
}
function ft(e) {
  return e.type === "divider";
}
function Si(e) {
  return e.type === "render";
}
const ht = H({ name: "DropdownOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null }, placement: { type: String, default: "right-start" }, props: Object, scrollable: Boolean }, setup(e) {
  const n = X(ze), { hoverKeyRef: t, keyboardKeyRef: r, lastToggledSubmenuKeyRef: o, pendingKeyPathRef: i, activeKeyPathRef: a, animatedRef: l, mergedShowRef: s, renderLabelRef: u, renderIconRef: d, labelFieldRef: f, childrenFieldRef: c, renderOptionRef: m, nodePropsRef: v, menuPropsRef: w } = n, S = X(Bn, null), h = X(dn), A = X(_e), N = I(() => e.tmNode.rawNode), b = I(() => {
    const { value: g } = c;
    return Qe(e.tmNode.rawNode, g);
  }), x = I(() => {
    const { disabled: g } = e.tmNode;
    return g;
  }), E = I(() => {
    if (!b.value) return false;
    const { key: g, disabled: _ } = e.tmNode;
    if (_) return false;
    const { value: z } = t, { value: V } = r, { value: se } = o, { value: j } = i;
    return z !== null ? j.includes(g) : V !== null ? j.includes(g) && j[j.length - 1] !== g : se !== null ? j.includes(g) : false;
  }), k = I(() => r.value === null && !l.value), B = cr(E, 300, k), $ = I(() => !!(S == null ? void 0 : S.enteringSubmenuRef.value)), P = K(false);
  Z(Bn, { enteringSubmenuRef: P });
  function T() {
    P.value = true;
  }
  function M() {
    P.value = false;
  }
  function W() {
    const { parentKey: g, tmNode: _ } = e;
    _.disabled || s.value && (o.value = g, r.value = null, t.value = _.key);
  }
  function O() {
    const { tmNode: g } = e;
    g.disabled || s.value && t.value !== g.key && W();
  }
  function p(g) {
    if (e.tmNode.disabled || !s.value) return;
    const { relatedTarget: _ } = g;
    _ && !mn({ target: _ }, "dropdownOption") && !mn({ target: _ }, "scrollbarRail") && (t.value = null);
  }
  function C() {
    const { value: g } = b, { tmNode: _ } = e;
    s.value && !g && !_.disabled && (n.doSelect(_.key, _.rawNode), n.doUpdateShow(false));
  }
  return { labelField: f, renderLabel: u, renderIcon: d, siblingHasIcon: h.showIconRef, siblingHasSubmenu: h.hasSubmenuRef, menuProps: w, popoverBody: A, animated: l, mergedShowSubmenu: I(() => B.value && !$.value), rawNode: N, hasSubmenu: b, pending: te(() => {
    const { value: g } = i, { key: _ } = e.tmNode;
    return g.includes(_);
  }), childActive: te(() => {
    const { value: g } = a, { key: _ } = e.tmNode, z = g.findIndex((V) => _ === V);
    return z === -1 ? false : z < g.length - 1;
  }), active: te(() => {
    const { value: g } = a, { key: _ } = e.tmNode, z = g.findIndex((V) => _ === V);
    return z === -1 ? false : z === g.length - 1;
  }), mergedDisabled: x, renderOption: m, nodeProps: v, handleClick: C, handleMouseMove: O, handleMouseEnter: W, handleMouseLeave: p, handleSubmenuBeforeEnter: T, handleSubmenuAfterEnter: M };
}, render() {
  var e, n;
  const { animated: t, rawNode: r, mergedShowSubmenu: o, clsPrefix: i, siblingHasIcon: a, siblingHasSubmenu: l, renderLabel: s, renderIcon: u, renderOption: d, nodeProps: f, props: c, scrollable: m } = this;
  let v = null;
  if (o) {
    const A = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, r, r.children);
    v = y(pt, Object.assign({}, A, { clsPrefix: i, scrollable: this.scrollable, tmNodes: this.tmNode.children, parentKey: this.tmNode.key }));
  }
  const w = { class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`], onMousemove: this.handleMouseMove, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onClick: this.handleClick }, S = f == null ? void 0 : f(r), h = y("div", Object.assign({ class: [`${i}-dropdown-option`, S == null ? void 0 : S.class], "data-dropdown-option": true }, S), y("div", Ie(w, c), [y("div", { class: [`${i}-dropdown-option-body__prefix`, a && `${i}-dropdown-option-body__prefix--show-icon`] }, [u ? u(r) : Ce(r.icon)]), y("div", { "data-dropdown-option": true, class: `${i}-dropdown-option-body__label` }, s ? s(r) : Ce((n = r[this.labelField]) !== null && n !== void 0 ? n : r.title)), y("div", { "data-dropdown-option": true, class: [`${i}-dropdown-option-body__suffix`, l && `${i}-dropdown-option-body__suffix--has-submenu`] }, this.hasSubmenu ? y(yi, null, { default: () => y(Do, null) }) : null)]), this.hasSubmenu ? y(Qn, null, { default: () => [y(et, null, { default: () => y("div", { class: `${i}-dropdown-offset-container` }, y(tt, { show: this.mergedShowSubmenu, placement: this.placement, to: m && this.popoverBody || void 0, teleportDisabled: !m }, { default: () => y("div", { class: `${i}-dropdown-menu-wrapper` }, t ? y(Wn, { onBeforeEnter: this.handleSubmenuBeforeEnter, onAfterEnter: this.handleSubmenuAfterEnter, name: "fade-in-scale-up-transition", appear: true }, { default: () => v }) : v) })) })] }) : null);
  return d ? d({ node: h, option: r }) : h;
} }), $i = H({ name: "NDropdownGroup", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true }, parentKey: { type: [String, Number], default: null } }, render() {
  const { tmNode: e, parentKey: n, clsPrefix: t } = this, { children: r } = e;
  return y(Rn, null, y(bi, { clsPrefix: t, tmNode: e, key: e.key }), r == null ? void 0 : r.map((o) => {
    const { rawNode: i } = o;
    return i.show === false ? null : ft(i) ? y(ct, { clsPrefix: t, key: o.key }) : o.isGroup ? (Un("dropdown", "`group` node is not allowed to be put in `group` node."), null) : y(ht, { clsPrefix: t, tmNode: o, parentKey: n, key: o.key });
  }));
} }), Ci = H({ name: "DropdownRenderOption", props: { tmNode: { type: Object, required: true } }, render() {
  const { rawNode: { render: e, props: n } } = this.tmNode;
  return y("div", n, [e == null ? void 0 : e()]);
} }), pt = H({ name: "DropdownMenu", props: { scrollable: Boolean, showArrow: Boolean, arrowStyle: [String, Object], clsPrefix: { type: String, required: true }, tmNodes: { type: Array, default: () => [] }, parentKey: { type: [String, Number], default: null } }, setup(e) {
  const { renderIconRef: n, childrenFieldRef: t } = X(ze);
  Z(dn, { showIconRef: I(() => {
    const o = n.value;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => o ? o(s) : s.icon);
      const { rawNode: l } = i;
      return o ? o(l) : l.icon;
    });
  }), hasSubmenuRef: I(() => {
    const { value: o } = t;
    return e.tmNodes.some((i) => {
      var a;
      if (i.isGroup) return (a = i.children) === null || a === void 0 ? void 0 : a.some(({ rawNode: s }) => Qe(s, o));
      const { rawNode: l } = i;
      return Qe(l, o);
    });
  }) });
  const r = K(null);
  return Z(en, null), Z(nn, null), Z(_e, r), { bodyRef: r };
}, render() {
  const { parentKey: e, clsPrefix: n, scrollable: t } = this, r = this.tmNodes.map((o) => {
    const { rawNode: i } = o;
    return i.show === false ? null : Si(i) ? y(Ci, { tmNode: o, key: o.key }) : ft(i) ? y(ct, { clsPrefix: n, key: o.key }) : xi(i) ? y($i, { clsPrefix: n, tmNode: o, parentKey: e, key: o.key }) : y(ht, { clsPrefix: n, tmNode: o, parentKey: e, key: o.key, props: i.props, scrollable: t });
  });
  return y("div", { class: [`${n}-dropdown-menu`, t && `${n}-dropdown-menu--scrollable`], ref: "bodyRef" }, t ? y(Gn, { contentClass: `${n}-dropdown-menu__content` }, { default: () => r }) : r, this.showArrow ? dt({ clsPrefix: n, arrowStyle: this.arrowStyle, arrowClass: void 0, arrowWrapperClass: void 0, arrowWrapperStyle: void 0 }) : null);
} }), Pi = D("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [Qt(), D("dropdown-option", `
 position: relative;
 `, [G("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [G("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), D("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [G("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), be("disabled", [U("pending", `
 color: var(--n-option-text-color-hover);
 `, [q("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), G("&::before", "background-color: var(--n-option-color-hover);")]), U("active", `
 color: var(--n-option-text-color-active);
 `, [q("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), G("&::before", "background-color: var(--n-option-color-active);")]), U("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [q("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), U("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), U("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [q("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [U("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), q("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [U("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), D("icon", `
 font-size: var(--n-option-icon-size);
 `)]), q("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), q("suffix", `
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
 `, [U("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), D("icon", `
 font-size: var(--n-option-icon-size);
 `)]), D("dropdown-menu", "pointer-events: all;")]), D("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), D("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), D("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), G(">", [D("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), be("scrollable", `
 padding: var(--n-padding);
 `), U("scrollable", [q("content", `
 padding: var(--n-padding);
 `)])]), Ai = { animated: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, size: String, inverted: Boolean, placement: { type: String, default: "bottom" }, onSelect: [Function, Array], options: { type: Array, default: () => [] }, menuProps: Function, showArrow: Boolean, renderLabel: Function, renderIcon: Function, renderOption: Function, nodeProps: Function, labelField: { type: String, default: "label" }, keyField: { type: String, default: "key" }, childrenField: { type: String, default: "children" }, value: [String, Number] }, Oi = Object.keys(Be), Mi = Object.assign(Object.assign(Object.assign({}, Be), Ai), re.props), Ki = H({ name: "Dropdown", inheritAttrs: false, props: Mi, setup(e) {
  const n = K(false), t = Yn(R(e, "show"), n), r = I(() => {
    const { keyField: O, childrenField: p } = e;
    return di(e.options, { getKey(C) {
      return C[O];
    }, getDisabled(C) {
      return C.disabled === true;
    }, getIgnored(C) {
      return C.type === "divider" || C.type === "render";
    }, getChildren(C) {
      return C[p];
    } });
  }), o = I(() => r.value.treeNodes), i = K(null), a = K(null), l = K(null), s = I(() => {
    var O, p, C;
    return (C = (p = (O = i.value) !== null && O !== void 0 ? O : a.value) !== null && p !== void 0 ? p : l.value) !== null && C !== void 0 ? C : null;
  }), u = I(() => r.value.getPath(s.value).keyPath), d = I(() => r.value.getPath(e.value).keyPath), f = te(() => e.keyboard && t.value);
  dr({ keydown: { ArrowUp: { prevent: true, handler: k }, ArrowRight: { prevent: true, handler: E }, ArrowDown: { prevent: true, handler: B }, ArrowLeft: { prevent: true, handler: x }, Enter: { prevent: true, handler: $ }, Escape: b } }, f);
  const { mergedClsPrefixRef: c, inlineThemeDisabled: m, mergedComponentPropsRef: v } = Te(e), w = I(() => {
    var O, p;
    return e.size || ((p = (O = v == null ? void 0 : v.value) === null || O === void 0 ? void 0 : O.Dropdown) === null || p === void 0 ? void 0 : p.size) || "medium";
  }), S = re("Dropdown", "-dropdown", Pi, er, e, c);
  Z(ze, { labelFieldRef: R(e, "labelField"), childrenFieldRef: R(e, "childrenField"), renderLabelRef: R(e, "renderLabel"), renderIconRef: R(e, "renderIcon"), hoverKeyRef: i, keyboardKeyRef: a, lastToggledSubmenuKeyRef: l, pendingKeyPathRef: u, activeKeyPathRef: d, animatedRef: R(e, "animated"), mergedShowRef: t, nodePropsRef: R(e, "nodeProps"), renderOptionRef: R(e, "renderOption"), menuPropsRef: R(e, "menuProps"), doSelect: h, doUpdateShow: A }), ae(t, (O) => {
    !e.animated && !O && N();
  });
  function h(O, p) {
    const { onSelect: C } = e;
    C && de(C, O, p);
  }
  function A(O) {
    const { "onUpdate:show": p, onUpdateShow: C } = e;
    p && de(p, O), C && de(C, O), n.value = O;
  }
  function N() {
    i.value = null, a.value = null, l.value = null;
  }
  function b() {
    A(false);
  }
  function x() {
    T("left");
  }
  function E() {
    T("right");
  }
  function k() {
    T("up");
  }
  function B() {
    T("down");
  }
  function $() {
    const O = P();
    (O == null ? void 0 : O.isLeaf) && t.value && (h(O.key, O.rawNode), A(false));
  }
  function P() {
    var O;
    const { value: p } = r, { value: C } = s;
    return !p || C === null ? null : (O = p.getNode(C)) !== null && O !== void 0 ? O : null;
  }
  function T(O) {
    const { value: p } = s, { value: { getFirstAvailableNode: C } } = r;
    let g = null;
    if (p === null) {
      const _ = C();
      _ !== null && (g = _.key);
    } else {
      const _ = P();
      if (_) {
        let z;
        switch (O) {
          case "down":
            z = _.getNext();
            break;
          case "up":
            z = _.getPrev();
            break;
          case "right":
            z = _.getChild();
            break;
          case "left":
            z = _.getParent();
            break;
        }
        z && (g = z.key);
      }
    }
    g !== null && (i.value = null, a.value = g);
  }
  const M = I(() => {
    const { inverted: O } = e, p = w.value, { common: { cubicBezierEaseInOut: C }, self: g } = S.value, { padding: _, dividerColor: z, borderRadius: V, optionOpacityDisabled: se, [le("optionIconSuffixWidth", p)]: j, [le("optionSuffixWidth", p)]: Ke, [le("optionIconPrefixWidth", p)]: vt, [le("optionPrefixWidth", p)]: gt, [le("fontSize", p)]: bt, [le("optionHeight", p)]: mt, [le("optionIconSize", p)]: wt } = g, L = { "--n-bezier": C, "--n-font-size": bt, "--n-padding": _, "--n-border-radius": V, "--n-option-height": mt, "--n-option-prefix-width": gt, "--n-option-icon-prefix-width": vt, "--n-option-suffix-width": Ke, "--n-option-icon-suffix-width": j, "--n-option-icon-size": wt, "--n-divider-color": z, "--n-option-opacity-disabled": se };
    return O ? (L["--n-color"] = g.colorInverted, L["--n-option-color-hover"] = g.optionColorHoverInverted, L["--n-option-color-active"] = g.optionColorActiveInverted, L["--n-option-text-color"] = g.optionTextColorInverted, L["--n-option-text-color-hover"] = g.optionTextColorHoverInverted, L["--n-option-text-color-active"] = g.optionTextColorActiveInverted, L["--n-option-text-color-child-active"] = g.optionTextColorChildActiveInverted, L["--n-prefix-color"] = g.prefixColorInverted, L["--n-suffix-color"] = g.suffixColorInverted, L["--n-group-header-text-color"] = g.groupHeaderTextColorInverted) : (L["--n-color"] = g.color, L["--n-option-color-hover"] = g.optionColorHover, L["--n-option-color-active"] = g.optionColorActive, L["--n-option-text-color"] = g.optionTextColor, L["--n-option-text-color-hover"] = g.optionTextColorHover, L["--n-option-text-color-active"] = g.optionTextColorActive, L["--n-option-text-color-child-active"] = g.optionTextColorChildActive, L["--n-prefix-color"] = g.prefixColor, L["--n-suffix-color"] = g.suffixColor, L["--n-group-header-text-color"] = g.groupHeaderTextColor), L;
  }), W = m ? rn("dropdown", I(() => `${w.value[0]}${e.inverted ? "i" : ""}`), M, e) : void 0;
  return { mergedClsPrefix: c, mergedTheme: S, mergedSize: w, tmNodes: o, mergedShow: t, handleAfterLeave: () => {
    e.animated && N();
  }, doUpdateShow: A, cssVars: m ? void 0 : M, themeClass: W == null ? void 0 : W.themeClass, onRender: W == null ? void 0 : W.onRender };
}, render() {
  const e = (r, o, i, a, l) => {
    var s;
    const { mergedClsPrefix: u, menuProps: d } = this;
    (s = this.onRender) === null || s === void 0 || s.call(this);
    const f = (d == null ? void 0 : d(void 0, this.tmNodes.map((m) => m.rawNode))) || {}, c = { ref: Cr(o), class: [r, `${u}-dropdown`, `${u}-dropdown--${this.mergedSize}-size`, this.themeClass], clsPrefix: u, tmNodes: this.tmNodes, style: [...i, this.cssVars], showArrow: this.showArrow, arrowStyle: this.arrowStyle, scrollable: this.scrollable, onMouseenter: a, onMouseleave: l };
    return y(pt, Ie(this.$attrs, c, f));
  }, { mergedTheme: n } = this, t = { show: this.mergedShow, theme: n.peers.Popover, themeOverrides: n.peerOverrides.Popover, internalOnAfterLeave: this.handleAfterLeave, internalRenderBody: e, onUpdateShow: this.doUpdateShow, "onUpdate:show": void 0 };
  return y(ut, Object.assign({}, Hn(this.$props, Oi), t), { trigger: () => {
    var r, o;
    return (o = (r = this.$slots).default) === null || o === void 0 ? void 0 : o.call(r);
  } });
} });
export {
  Qn as B,
  Do as C,
  ut as N,
  et as V,
  tt as a,
  he as b,
  nt as c,
  ar as d,
  ge as e,
  Bi as f,
  ur as g,
  mn as h,
  Ti as i,
  Ii as j,
  di as k,
  Cr as l,
  zi as m,
  Ki as n,
  Be as p,
  dr as u
};
