import { aB as Ne, a as k, r as N, a8 as ct, d as ve, i as Ee, j as r, aI as no, X as Bt, aJ as Vn, o as $t, aK as Wn, aL as Yo, L as yt, K as $e, t as ce, aM as Gt, w as it, ag as so, f as z, h as ee, e as Q, $ as qe, k as Ae, l as ke, aN as qn, m as et, J as he, al as mt, T as co, g as U, H as je, I as uo, ar as fo, _ as st, aO as Xn, au as zt, a4 as xt, b as Gn, aP as Zn, F as Re, Y as Yn, ai as Pt, aQ as Jn, M as wt, aR as Qn, R as Ct, G as pt, aj as Jo, aS as Qo, ae as ro, N as en, aT as er, aU as tn, aV as on, a7 as tr, aW as nn, at as or, aq as nr, as as rr, aX as lr, aw as ar, ax as ir, aY as sr, aZ as rn, a_ as ln, a$ as dr, a5 as cr, ah as Tt, c as ur, b0 as fr, an as hr, b1 as vr, ao as Co, b2 as gr } from "./index-BeCJuQaP.js";
import { c as wo, f as Xe, g as Ro, B as ko } from "./Button-VZQzYgCk.js";
import { r as Rt, b as Et, c as oe, u as Ft, a as Qe } from "./use-form-item-FVzrOHI4.js";
import { l as br, n as lo, o as Zt, q as ho, f as vo, r as pr, k as at, s as mr, t as So, N as go, v as bo, w as yr, x as zo, B as xr, V as Cr, e as wr, j as It, c as Po, y as Rr, A as kr, C as Sr, D as zr } from "./Dropdown-Ci2kVRZD.js";
import { u as At, N as Pr, _ as Fo, C as Fr } from "./Input-ZeuXgzVS.js";
import { u as Tr } from "./use-compitable-E97dXjzV.js";
function To(e) {
  return e & -e;
}
class an {
  constructor(t, o) {
    this.l = t, this.min = o;
    const n = new Array(t + 1);
    for (let l = 0; l < t + 1; ++l) n[l] = 0;
    this.ft = n;
  }
  add(t, o) {
    if (o === 0) return;
    const { l: n, ft: l } = this;
    for (t += 1; t <= n; ) l[t] += o, t += To(t);
  }
  get(t) {
    return this.sum(t + 1) - this.sum(t);
  }
  sum(t) {
    if (t === void 0 && (t = this.l), t <= 0) return 0;
    const { ft: o, min: n, l } = this;
    if (t > l) throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let i = t * n;
    for (; t > 0; ) i += o[t], t -= To(t);
    return i;
  }
  getBound(t) {
    let o = 0, n = this.l;
    for (; n > o; ) {
      const l = Math.floor((o + n) / 2), i = this.sum(l);
      if (i > t) {
        n = l;
        continue;
      } else if (i < t) {
        if (o === l) return this.sum(o + 1) <= t ? o + 1 : l;
        o = l;
      } else return l;
    }
    return o;
  }
}
let Ot;
function Or() {
  return typeof document > "u" ? false : (Ot === void 0 && ("matchMedia" in window ? Ot = window.matchMedia("(pointer:coarse)").matches : Ot = false), Ot);
}
let Yt;
function Oo() {
  return typeof document > "u" ? 1 : (Yt === void 0 && (Yt = "chrome" in window ? window.devicePixelRatio : 1), Yt);
}
const sn = "VVirtualListXScroll";
function Mr({ columnsRef: e, renderColRef: t, renderItemWithColsRef: o }) {
  const n = N(0), l = N(0), i = k(() => {
    const s = e.value;
    if (s.length === 0) return null;
    const y = new an(s.length, 0);
    return s.forEach((b, C) => {
      y.add(C, b.width);
    }), y;
  }), f = Ne(() => {
    const s = i.value;
    return s !== null ? Math.max(s.getBound(l.value) - 1, 0) : 0;
  }), a = (s) => {
    const y = i.value;
    return y !== null ? y.sum(s) : 0;
  }, c = Ne(() => {
    const s = i.value;
    return s !== null ? Math.min(s.getBound(l.value + n.value) + 1, e.value.length - 1) : 0;
  });
  return ct(sn, { startIndexRef: f, endIndexRef: c, columnsRef: e, renderColRef: t, renderItemWithColsRef: o, getLeft: a }), { listWidthRef: n, scrollLeftRef: l };
}
const Mo = ve({ name: "VirtualListRow", props: { index: { type: Number, required: true }, item: { type: Object, required: true } }, setup() {
  const { startIndexRef: e, endIndexRef: t, columnsRef: o, getLeft: n, renderColRef: l, renderItemWithColsRef: i } = Ee(sn);
  return { startIndex: e, endIndex: t, columns: o, renderCol: l, renderItemWithCols: i, getLeft: n };
}, render() {
  const { startIndex: e, endIndex: t, columns: o, renderCol: n, renderItemWithCols: l, getLeft: i, item: f } = this;
  if (l != null) return l({ itemIndex: this.index, startColIndex: e, endColIndex: t, allColumns: o, item: f, getLeft: i });
  if (n != null) {
    const a = [];
    for (let c = e; c <= t; ++c) {
      const s = o[c];
      a.push(n({ column: s, left: i(c), item: f }));
    }
    return a;
  }
  return null;
} }), Br = Zt(".v-vl", { maxHeight: "inherit", height: "100%", overflow: "auto", minWidth: "1px" }, [Zt("&:not(.v-vl--show-scrollbar)", { scrollbarWidth: "none" }, [Zt("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", { width: 0, height: 0, display: "none" })])]), po = ve({ name: "VirtualList", inheritAttrs: false, props: { showScrollbar: { type: Boolean, default: true }, columns: { type: Array, default: () => [] }, renderCol: Function, renderItemWithCols: Function, items: { type: Array, default: () => [] }, itemSize: { type: Number, required: true }, itemResizable: Boolean, itemsStyle: [String, Object], visibleItemsTag: { type: [String, Object], default: "div" }, visibleItemsProps: Object, ignoreItemResize: Boolean, onScroll: Function, onWheel: Function, onResize: Function, defaultScrollKey: [Number, String], defaultScrollIndex: Number, keyField: { type: String, default: "key" }, paddingTop: { type: [Number, String], default: 0 }, paddingBottom: { type: [Number, String], default: 0 } }, setup(e) {
  const t = Vn();
  Br.mount({ id: "vueuc/virtual-list", head: true, anchorMetaName: br, ssr: t }), $t(() => {
    const { defaultScrollIndex: p, defaultScrollKey: S } = e;
    p != null ? h({ index: p }) : S != null && h({ key: S });
  });
  let o = false, n = false;
  Wn(() => {
    if (o = false, !n) {
      n = true;
      return;
    }
    h({ top: v.value, left: f.value });
  }), Yo(() => {
    o = true, n || (n = true);
  });
  const l = Ne(() => {
    if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0) return;
    let p = 0;
    return e.columns.forEach((S) => {
      p += S.width;
    }), p;
  }), i = k(() => {
    const p = /* @__PURE__ */ new Map(), { keyField: S } = e;
    return e.items.forEach((L, H) => {
      p.set(L[S], H);
    }), p;
  }), { scrollLeftRef: f, listWidthRef: a } = Mr({ columnsRef: ce(e, "columns"), renderColRef: ce(e, "renderCol"), renderItemWithColsRef: ce(e, "renderItemWithCols") }), c = N(null), s = N(void 0), y = /* @__PURE__ */ new Map(), b = k(() => {
    const { items: p, itemSize: S, keyField: L } = e, H = new an(p.length, S);
    return p.forEach((D, K) => {
      const X = D[L], Z = y.get(X);
      Z !== void 0 && H.add(K, Z);
    }), H;
  }), C = N(0), v = N(0), d = Ne(() => Math.max(b.value.getBound(v.value - yt(e.paddingTop)) - 1, 0)), u = k(() => {
    const { value: p } = s;
    if (p === void 0) return [];
    const { items: S, itemSize: L } = e, H = d.value, D = Math.min(H + Math.ceil(p / L + 1), S.length - 1), K = [];
    for (let X = H; X <= D; ++X) K.push(S[X]);
    return K;
  }), h = (p, S) => {
    if (typeof p == "number") {
      B(p, S, "auto");
      return;
    }
    const { left: L, top: H, index: D, key: K, position: X, behavior: Z, debounce: P = true } = p;
    if (L !== void 0 || H !== void 0) B(L, H, Z);
    else if (D !== void 0) M(D, Z, P);
    else if (K !== void 0) {
      const A = i.value.get(K);
      A !== void 0 && M(A, Z, P);
    } else X === "bottom" ? B(0, Number.MAX_SAFE_INTEGER, Z) : X === "top" && B(0, 0, Z);
  };
  let x, w = null;
  function M(p, S, L) {
    const { value: H } = b, D = H.sum(p) + yt(e.paddingTop);
    if (!L) c.value.scrollTo({ left: 0, top: D, behavior: S });
    else {
      x = p, w !== null && window.clearTimeout(w), w = window.setTimeout(() => {
        x = void 0, w = null;
      }, 16);
      const { scrollTop: K, offsetHeight: X } = c.value;
      if (D > K) {
        const Z = H.get(p);
        D + Z <= K + X || c.value.scrollTo({ left: 0, top: D + Z - X, behavior: S });
      } else c.value.scrollTo({ left: 0, top: D, behavior: S });
    }
  }
  function B(p, S, L) {
    c.value.scrollTo({ left: p, top: S, behavior: L });
  }
  function T(p, S) {
    var L, H, D;
    if (o || e.ignoreItemResize || E(S.target)) return;
    const { value: K } = b, X = i.value.get(p), Z = K.get(X), P = (D = (H = (L = S.borderBoxSize) === null || L === void 0 ? void 0 : L[0]) === null || H === void 0 ? void 0 : H.blockSize) !== null && D !== void 0 ? D : S.contentRect.height;
    if (P === Z) return;
    P - e.itemSize === 0 ? y.delete(p) : y.set(p, P - e.itemSize);
    const G = P - Z;
    if (G === 0) return;
    K.add(X, G);
    const m = c.value;
    if (m != null) {
      if (x === void 0) {
        const F = K.sum(X);
        m.scrollTop > F && m.scrollBy(0, G);
      } else if (X < x) m.scrollBy(0, G);
      else if (X === x) {
        const F = K.sum(X);
        P + F > m.scrollTop + m.offsetHeight && m.scrollBy(0, G);
      }
      ne();
    }
    C.value++;
  }
  const _ = !Or();
  let I = false;
  function q(p) {
    var S;
    (S = e.onScroll) === null || S === void 0 || S.call(e, p), (!_ || !I) && ne();
  }
  function te(p) {
    var S;
    if ((S = e.onWheel) === null || S === void 0 || S.call(e, p), _) {
      const L = c.value;
      if (L != null) {
        if (p.deltaX === 0 && (L.scrollTop === 0 && p.deltaY <= 0 || L.scrollTop + L.offsetHeight >= L.scrollHeight && p.deltaY >= 0)) return;
        p.preventDefault(), L.scrollTop += p.deltaY / Oo(), L.scrollLeft += p.deltaX / Oo(), ne(), I = true, lo(() => {
          I = false;
        });
      }
    }
  }
  function le(p) {
    if (o || E(p.target)) return;
    if (e.renderCol == null && e.renderItemWithCols == null) {
      if (p.contentRect.height === s.value) return;
    } else if (p.contentRect.height === s.value && p.contentRect.width === a.value) return;
    s.value = p.contentRect.height, a.value = p.contentRect.width;
    const { onResize: S } = e;
    S !== void 0 && S(p);
  }
  function ne() {
    const { value: p } = c;
    p != null && (v.value = p.scrollTop, f.value = p.scrollLeft);
  }
  function E(p) {
    let S = p;
    for (; S !== null; ) {
      if (S.style.display === "none") return true;
      S = S.parentElement;
    }
    return false;
  }
  return { listHeight: s, listStyle: { overflow: "auto" }, keyToIndex: i, itemsStyle: k(() => {
    const { itemResizable: p } = e, S = $e(b.value.sum());
    return C.value, [e.itemsStyle, { boxSizing: "content-box", width: $e(l.value), height: p ? "" : S, minHeight: p ? S : "", paddingTop: $e(e.paddingTop), paddingBottom: $e(e.paddingBottom) }];
  }), visibleItemsStyle: k(() => (C.value, { transform: `translateY(${$e(b.value.sum(d.value))})` })), viewportItems: u, listElRef: c, itemsElRef: N(null), scrollTo: h, handleListResize: le, handleListScroll: q, handleListWheel: te, handleItemResize: T };
}, render() {
  const { itemResizable: e, keyField: t, keyToIndex: o, visibleItemsTag: n } = this;
  return r(no, { onResize: this.handleListResize }, { default: () => {
    var l, i;
    return r("div", Bt(this.$attrs, { class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"], onScroll: this.handleListScroll, onWheel: this.handleListWheel, ref: "listElRef" }), [this.items.length !== 0 ? r("div", { ref: "itemsElRef", class: "v-vl-items", style: this.itemsStyle }, [r(n, Object.assign({ class: "v-vl-visible-items", style: this.visibleItemsStyle }, this.visibleItemsProps), { default: () => {
      const { renderCol: f, renderItemWithCols: a } = this;
      return this.viewportItems.map((c) => {
        const s = c[t], y = o.get(s), b = f != null ? r(Mo, { index: y, item: c }) : void 0, C = a != null ? r(Mo, { index: y, item: c }) : void 0, v = this.$slots.default({ item: c, renderedCols: b, renderedItemWithCols: C, index: y })[0];
        return e ? r(no, { key: s, onResize: (d) => this.handleItemResize(s, d) }, { default: () => v }) : (v.key = s, v);
      });
    } })]) : (i = (l = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(l)]);
  } });
} });
function dn(e, t) {
  t && ($t(() => {
    const { value: o } = e;
    o && Gt.registerHandler(o, t);
  }), it(e, (o, n) => {
    n && Gt.unregisterHandler(n);
  }, { deep: false }), so(() => {
    const { value: o } = e;
    o && Gt.unregisterHandler(o);
  }));
}
function Ir(e, t) {
  if (!e) return;
  const o = document.createElement("a");
  o.href = e, t !== void 0 && (o.download = t), document.body.appendChild(o), o.click(), document.body.removeChild(o);
}
const cn = /* @__PURE__ */ new WeakSet();
function _r(e) {
  cn.add(e);
}
function ya(e) {
  return !cn.has(e);
}
function Bo(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const $r = { tiny: "mini", small: "tiny", medium: "small", large: "medium", huge: "large" };
function Io(e) {
  const t = $r[e];
  if (t === void 0) throw new Error(`${e} has no smaller size.`);
  return t;
}
function Er(e, t = "default", o = []) {
  const l = e.$slots[t];
  return l === void 0 ? o : l();
}
function St(e) {
  const t = e.filter((o) => o !== void 0);
  if (t.length !== 0) return t.length === 1 ? t[0] : (o) => {
    e.forEach((n) => {
      n && n(o);
    });
  };
}
const Ar = ve({ name: "ArrowDown", render() {
  return r("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, r("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, r("g", { "fill-rule": "nonzero" }, r("path", { d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z" }))));
} }), _o = ve({ name: "Backward", render() {
  return r("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, r("path", { d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z", fill: "currentColor" }));
} }), Lr = ve({ name: "Checkmark", render() {
  return r("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, r("g", { fill: "none" }, r("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })));
} }), Nr = ve({ name: "Empty", render() {
  return r("svg", { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, r("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }), r("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" }));
} }), $o = ve({ name: "FastBackward", render() {
  return r("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, r("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, r("g", { fill: "currentColor", "fill-rule": "nonzero" }, r("path", { d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z" }))));
} }), Eo = ve({ name: "FastForward", render() {
  return r("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, r("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, r("g", { fill: "currentColor", "fill-rule": "nonzero" }, r("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" }))));
} }), Dr = ve({ name: "Filter", render() {
  return r("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, r("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, r("g", { "fill-rule": "nonzero" }, r("path", { d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z" }))));
} }), Ao = ve({ name: "Forward", render() {
  return r("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, r("path", { d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z", fill: "currentColor" }));
} }), Lo = ve({ name: "More", render() {
  return r("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, r("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, r("g", { fill: "currentColor", "fill-rule": "nonzero" }, r("path", { d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z" }))));
} }), Ur = ve({ props: { onFocus: Function, onBlur: Function }, setup(e) {
  return () => r("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
} }), Hr = z("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [ee("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [Q("+", [ee("description", `
 margin-top: 8px;
 `)])]), ee("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), ee("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), jr = Object.assign(Object.assign({}, ke.props), { description: String, showDescription: { type: Boolean, default: true }, showIcon: { type: Boolean, default: true }, size: { type: String, default: "medium" }, renderIcon: Function }), un = ve({ name: "Empty", props: jr, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedComponentPropsRef: n } = Ae(e), l = ke("Empty", "-empty", Hr, qn, e, t), { localeRef: i } = At("Empty"), f = k(() => {
    var y, b, C;
    return (y = e.description) !== null && y !== void 0 ? y : (C = (b = n == null ? void 0 : n.value) === null || b === void 0 ? void 0 : b.Empty) === null || C === void 0 ? void 0 : C.description;
  }), a = k(() => {
    var y, b;
    return ((b = (y = n == null ? void 0 : n.value) === null || y === void 0 ? void 0 : y.Empty) === null || b === void 0 ? void 0 : b.renderIcon) || (() => r(Nr, null));
  }), c = k(() => {
    const { size: y } = e, { common: { cubicBezierEaseInOut: b }, self: { [he("iconSize", y)]: C, [he("fontSize", y)]: v, textColor: d, iconColor: u, extraTextColor: h } } = l.value;
    return { "--n-icon-size": C, "--n-font-size": v, "--n-bezier": b, "--n-text-color": d, "--n-icon-color": u, "--n-extra-text-color": h };
  }), s = o ? et("empty", k(() => {
    let y = "";
    const { size: b } = e;
    return y += b[0], y;
  }), c, e) : void 0;
  return { mergedClsPrefix: t, mergedRenderIcon: a, localizedDescription: k(() => f.value || i.value.description), cssVars: o ? void 0 : c, themeClass: s == null ? void 0 : s.themeClass, onRender: s == null ? void 0 : s.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: o } = this;
  return o == null ? void 0 : o(), r("div", { class: [`${t}-empty`, this.themeClass], style: this.cssVars }, this.showIcon ? r("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : r(qe, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null, this.showDescription ? r("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? r("div", { class: `${t}-empty__extra` }, e.extra()) : null);
} }), No = ve({ name: "NBaseSelectGroupHeader", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup() {
  const { renderLabelRef: e, renderOptionRef: t, labelFieldRef: o, nodePropsRef: n } = Ee(ho);
  return { labelField: o, nodeProps: n, renderLabel: e, renderOption: t };
}, render() {
  const { clsPrefix: e, renderLabel: t, renderOption: o, nodeProps: n, tmNode: { rawNode: l } } = this, i = n == null ? void 0 : n(l), f = t ? t(l, false) : mt(l[this.labelField], l, false), a = r("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), f);
  return l.render ? l.render({ node: a, option: l }) : o ? o({ node: a, option: l, selected: false }) : a;
} });
function Kr(e, t) {
  return r(co, { name: "fade-in-scale-up-transition" }, { default: () => e ? r(qe, { clsPrefix: t, class: `${t}-base-select-option__check` }, { default: () => r(Lr) }) : null });
}
const Do = ve({ name: "NBaseSelectOption", props: { clsPrefix: { type: String, required: true }, tmNode: { type: Object, required: true } }, setup(e) {
  const { valueRef: t, pendingTmNodeRef: o, multipleRef: n, valueSetRef: l, renderLabelRef: i, renderOptionRef: f, labelFieldRef: a, valueFieldRef: c, showCheckmarkRef: s, nodePropsRef: y, handleOptionClick: b, handleOptionMouseEnter: C } = Ee(ho), v = Ne(() => {
    const { value: x } = o;
    return x ? e.tmNode.key === x.key : false;
  });
  function d(x) {
    const { tmNode: w } = e;
    w.disabled || b(x, w);
  }
  function u(x) {
    const { tmNode: w } = e;
    w.disabled || C(x, w);
  }
  function h(x) {
    const { tmNode: w } = e, { value: M } = v;
    w.disabled || M || C(x, w);
  }
  return { multiple: n, isGrouped: Ne(() => {
    const { tmNode: x } = e, { parent: w } = x;
    return w && w.rawNode.type === "group";
  }), showCheckmark: s, nodeProps: y, isPending: v, isSelected: Ne(() => {
    const { value: x } = t, { value: w } = n;
    if (x === null) return false;
    const M = e.tmNode.rawNode[c.value];
    if (w) {
      const { value: B } = l;
      return B.has(M);
    } else return x === M;
  }), labelField: a, renderLabel: i, renderOption: f, handleMouseMove: h, handleMouseEnter: u, handleClick: d };
}, render() {
  const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: o, isPending: n, isGrouped: l, showCheckmark: i, nodeProps: f, renderOption: a, renderLabel: c, handleClick: s, handleMouseEnter: y, handleMouseMove: b } = this, C = Kr(o, e), v = c ? [c(t, o), i && C] : [mt(t[this.labelField], t, o), i && C], d = f == null ? void 0 : f(t), u = r("div", Object.assign({}, d, { class: [`${e}-base-select-option`, t.class, d == null ? void 0 : d.class, { [`${e}-base-select-option--disabled`]: t.disabled, [`${e}-base-select-option--selected`]: o, [`${e}-base-select-option--grouped`]: l, [`${e}-base-select-option--pending`]: n, [`${e}-base-select-option--show-checkmark`]: i }], style: [(d == null ? void 0 : d.style) || "", t.style || ""], onClick: St([s, d == null ? void 0 : d.onClick]), onMouseenter: St([y, d == null ? void 0 : d.onMouseenter]), onMousemove: St([b, d == null ? void 0 : d.onMousemove]) }), r("div", { class: `${e}-base-select-option__content` }, v));
  return t.render ? t.render({ node: u, option: t, selected: o }) : a ? a({ node: u, option: t, selected: o }) : u;
} }), Vr = z("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [z("scrollbar", `
 max-height: var(--n-height);
 `), z("virtual-list", `
 max-height: var(--n-height);
 `), z("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [ee("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), z("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), z("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), ee("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), ee("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), ee("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), ee("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), z("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), z("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [U("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), Q("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), Q("&:active", `
 color: var(--n-option-text-color-pressed);
 `), U("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), U("pending", [Q("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), U("selected", `
 color: var(--n-option-text-color-active);
 `, [Q("&::before", `
 background-color: var(--n-option-color-active);
 `), U("pending", [Q("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), U("disabled", `
 cursor: not-allowed;
 `, [je("selected", `
 color: var(--n-option-text-color-disabled);
 `), U("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), ee("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [vo({ enterScale: "0.5" })])])]), fn = ve({ name: "InternalSelectMenu", props: Object.assign(Object.assign({}, ke.props), { clsPrefix: { type: String, required: true }, scrollable: { type: Boolean, default: true }, treeMate: { type: Object, required: true }, multiple: Boolean, size: { type: String, default: "medium" }, value: { type: [String, Number, Array], default: null }, autoPending: Boolean, virtualScroll: { type: Boolean, default: true }, show: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, loading: Boolean, focusable: Boolean, renderLabel: Function, renderOption: Function, nodeProps: Function, showCheckmark: { type: Boolean, default: true }, onMousedown: Function, onScroll: Function, onFocus: Function, onBlur: Function, onKeyup: Function, onKeydown: Function, onTabOut: Function, onMouseenter: Function, onMouseleave: Function, onResize: Function, resetMenuOnOptionsChange: { type: Boolean, default: true }, inlineThemeDisabled: Boolean, scrollbarProps: Object, onToggle: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: o, mergedComponentPropsRef: n } = Ae(e), l = st("InternalSelectMenu", o, t), i = ke("InternalSelectMenu", "-internal-select-menu", Vr, Xn, e, ce(e, "clsPrefix")), f = N(null), a = N(null), c = N(null), s = k(() => e.treeMate.getFlattenedNodes()), y = k(() => pr(s.value)), b = N(null);
  function C() {
    const { treeMate: m } = e;
    let F = null;
    const { value: de } = e;
    de === null ? F = m.getFirstAvailableNode() : (e.multiple ? F = m.getNode((de || [])[(de || []).length - 1]) : F = m.getNode(de), (!F || F.disabled) && (F = m.getFirstAvailableNode())), H(F || null);
  }
  function v() {
    const { value: m } = b;
    m && !e.treeMate.getNode(m.key) && (b.value = null);
  }
  let d;
  it(() => e.show, (m) => {
    m ? d = it(() => e.treeMate, () => {
      e.resetMenuOnOptionsChange ? (e.autoPending ? C() : v(), zt(D)) : v();
    }, { immediate: true }) : d == null ? void 0 : d();
  }, { immediate: true }), so(() => {
    d == null ? void 0 : d();
  });
  const u = k(() => yt(i.value.self[he("optionHeight", e.size)])), h = k(() => xt(i.value.self[he("padding", e.size)])), x = k(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), w = k(() => {
    const m = s.value;
    return m && m.length === 0;
  }), M = k(() => {
    var m, F;
    return (F = (m = n == null ? void 0 : n.value) === null || m === void 0 ? void 0 : m.Select) === null || F === void 0 ? void 0 : F.renderEmpty;
  });
  function B(m) {
    const { onToggle: F } = e;
    F && F(m);
  }
  function T(m) {
    const { onScroll: F } = e;
    F && F(m);
  }
  function _(m) {
    var F;
    (F = c.value) === null || F === void 0 || F.sync(), T(m);
  }
  function I() {
    var m;
    (m = c.value) === null || m === void 0 || m.sync();
  }
  function q() {
    const { value: m } = b;
    return m || null;
  }
  function te(m, F) {
    F.disabled || H(F, false);
  }
  function le(m, F) {
    F.disabled || B(F);
  }
  function ne(m) {
    var F;
    at(m, "action") || (F = e.onKeyup) === null || F === void 0 || F.call(e, m);
  }
  function E(m) {
    var F;
    at(m, "action") || (F = e.onKeydown) === null || F === void 0 || F.call(e, m);
  }
  function p(m) {
    var F;
    (F = e.onMousedown) === null || F === void 0 || F.call(e, m), !e.focusable && m.preventDefault();
  }
  function S() {
    const { value: m } = b;
    m && H(m.getNext({ loop: true }), true);
  }
  function L() {
    const { value: m } = b;
    m && H(m.getPrev({ loop: true }), true);
  }
  function H(m, F = false) {
    b.value = m, F && D();
  }
  function D() {
    var m, F;
    const de = b.value;
    if (!de) return;
    const me = y.value(de.key);
    me !== null && (e.virtualScroll ? (m = a.value) === null || m === void 0 || m.scrollTo({ index: me }) : (F = c.value) === null || F === void 0 || F.scrollTo({ index: me, elSize: u.value }));
  }
  function K(m) {
    var F, de;
    !((F = f.value) === null || F === void 0) && F.contains(m.target) && ((de = e.onFocus) === null || de === void 0 || de.call(e, m));
  }
  function X(m) {
    var F, de;
    !((F = f.value) === null || F === void 0) && F.contains(m.relatedTarget) || (de = e.onBlur) === null || de === void 0 || de.call(e, m);
  }
  ct(ho, { handleOptionMouseEnter: te, handleOptionClick: le, valueSetRef: x, pendingTmNodeRef: b, nodePropsRef: ce(e, "nodeProps"), showCheckmarkRef: ce(e, "showCheckmark"), multipleRef: ce(e, "multiple"), valueRef: ce(e, "value"), renderLabelRef: ce(e, "renderLabel"), renderOptionRef: ce(e, "renderOption"), labelFieldRef: ce(e, "labelField"), valueFieldRef: ce(e, "valueField") }), ct(mr, f), $t(() => {
    const { value: m } = c;
    m && m.sync();
  });
  const Z = k(() => {
    const { size: m } = e, { common: { cubicBezierEaseInOut: F }, self: { height: de, borderRadius: me, color: ge, groupHeaderTextColor: pe, actionDividerColor: O, optionTextColorPressed: ae, optionTextColor: xe, optionTextColorDisabled: ye, optionTextColorActive: ze, optionOpacityDisabled: Me, optionCheckColor: Ie, actionTextColor: ie, optionColorPending: be, optionColorActive: Pe, loadingColor: we, loadingSize: _e, optionColorActivePending: De, [he("optionFontSize", m)]: Oe, [he("optionHeight", m)]: $, [he("optionPadding", m)]: j } } = i.value;
    return { "--n-height": de, "--n-action-divider-color": O, "--n-action-text-color": ie, "--n-bezier": F, "--n-border-radius": me, "--n-color": ge, "--n-option-font-size": Oe, "--n-group-header-text-color": pe, "--n-option-check-color": Ie, "--n-option-color-pending": be, "--n-option-color-active": Pe, "--n-option-color-active-pending": De, "--n-option-height": $, "--n-option-opacity-disabled": Me, "--n-option-text-color": xe, "--n-option-text-color-active": ze, "--n-option-text-color-disabled": ye, "--n-option-text-color-pressed": ae, "--n-option-padding": j, "--n-option-padding-left": xt(j, "left"), "--n-option-padding-right": xt(j, "right"), "--n-loading-color": we, "--n-loading-size": _e };
  }), { inlineThemeDisabled: P } = e, A = P ? et("internal-select-menu", k(() => e.size[0]), Z, e) : void 0, G = { selfRef: f, next: S, prev: L, getPendingTmNode: q };
  return dn(f, e.onResize), Object.assign({ mergedTheme: i, mergedClsPrefix: t, rtlEnabled: l, virtualListRef: a, scrollbarRef: c, itemSize: u, padding: h, flattenedNodes: s, empty: w, mergedRenderEmpty: M, virtualListContainer() {
    const { value: m } = a;
    return m == null ? void 0 : m.listElRef;
  }, virtualListContent() {
    const { value: m } = a;
    return m == null ? void 0 : m.itemsElRef;
  }, doScroll: T, handleFocusin: K, handleFocusout: X, handleKeyUp: ne, handleKeyDown: E, handleMouseDown: p, handleVirtualListResize: I, handleVirtualListScroll: _, cssVars: P ? void 0 : Z, themeClass: A == null ? void 0 : A.themeClass, onRender: A == null ? void 0 : A.onRender }, G);
}, render() {
  const { $slots: e, virtualScroll: t, clsPrefix: o, mergedTheme: n, themeClass: l, onRender: i } = this;
  return i == null ? void 0 : i(), r("div", { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [`${o}-base-select-menu`, `${o}-base-select-menu--${this.size}-size`, this.rtlEnabled && `${o}-base-select-menu--rtl`, l, this.multiple && `${o}-base-select-menu--multiple`], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, Rt(e.header, (f) => f && r("div", { class: `${o}-base-select-menu__header`, "data-header": true, key: "header" }, f)), this.loading ? r("div", { class: `${o}-base-select-menu__loading` }, r(uo, { clsPrefix: o, strokeWidth: 20 })) : this.empty ? r("div", { class: `${o}-base-select-menu__empty`, "data-empty": true }, Et(e.empty, () => {
    var f;
    return [((f = this.mergedRenderEmpty) === null || f === void 0 ? void 0 : f.call(this)) || r(un, { theme: n.peers.Empty, themeOverrides: n.peerOverrides.Empty, size: this.size })];
  })) : r(fo, Object.assign({ ref: "scrollbarRef", theme: n.peers.Scrollbar, themeOverrides: n.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, this.scrollbarProps), { default: () => t ? r(po, { ref: "virtualListRef", class: `${o}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: false, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: true }, { default: ({ item: f }) => f.isGroup ? r(No, { key: f.key, clsPrefix: o, tmNode: f }) : f.ignored ? null : r(Do, { clsPrefix: o, key: f.key, tmNode: f }) }) : r("div", { class: `${o}-base-select-menu-option-wrapper`, style: { paddingTop: this.padding.top, paddingBottom: this.padding.bottom } }, this.flattenedNodes.map((f) => f.isGroup ? r(No, { key: f.key, clsPrefix: o, tmNode: f }) : r(Do, { clsPrefix: o, key: f.key, tmNode: f }))) }), Rt(e.action, (f) => f && [r("div", { class: `${o}-base-select-menu__action`, "data-action": true, key: "action" }, f), r(Ur, { onFocus: this.onTabOut, key: "focus-detector" })]));
} });
function Wr(e) {
  const { textColor2: t, primaryColorHover: o, primaryColorPressed: n, primaryColor: l, infoColor: i, successColor: f, warningColor: a, errorColor: c, baseColor: s, borderColor: y, opacityDisabled: b, tagColor: C, closeIconColor: v, closeIconColorHover: d, closeIconColorPressed: u, borderRadiusSmall: h, fontSizeMini: x, fontSizeTiny: w, fontSizeSmall: M, fontSizeMedium: B, heightMini: T, heightTiny: _, heightSmall: I, heightMedium: q, closeColorHover: te, closeColorPressed: le, buttonColor2Hover: ne, buttonColor2Pressed: E, fontWeightStrong: p } = e;
  return Object.assign(Object.assign({}, Zn), { closeBorderRadius: h, heightTiny: T, heightSmall: _, heightMedium: I, heightLarge: q, borderRadius: h, opacityDisabled: b, fontSizeTiny: x, fontSizeSmall: w, fontSizeMedium: M, fontSizeLarge: B, fontWeightStrong: p, textColorCheckable: t, textColorHoverCheckable: t, textColorPressedCheckable: t, textColorChecked: s, colorCheckable: "#0000", colorHoverCheckable: ne, colorPressedCheckable: E, colorChecked: l, colorCheckedHover: o, colorCheckedPressed: n, border: `1px solid ${y}`, textColor: t, color: C, colorBordered: "rgb(250, 250, 252)", closeIconColor: v, closeIconColorHover: d, closeIconColorPressed: u, closeColorHover: te, closeColorPressed: le, borderPrimary: `1px solid ${Re(l, { alpha: 0.3 })}`, textColorPrimary: l, colorPrimary: Re(l, { alpha: 0.12 }), colorBorderedPrimary: Re(l, { alpha: 0.1 }), closeIconColorPrimary: l, closeIconColorHoverPrimary: l, closeIconColorPressedPrimary: l, closeColorHoverPrimary: Re(l, { alpha: 0.12 }), closeColorPressedPrimary: Re(l, { alpha: 0.18 }), borderInfo: `1px solid ${Re(i, { alpha: 0.3 })}`, textColorInfo: i, colorInfo: Re(i, { alpha: 0.12 }), colorBorderedInfo: Re(i, { alpha: 0.1 }), closeIconColorInfo: i, closeIconColorHoverInfo: i, closeIconColorPressedInfo: i, closeColorHoverInfo: Re(i, { alpha: 0.12 }), closeColorPressedInfo: Re(i, { alpha: 0.18 }), borderSuccess: `1px solid ${Re(f, { alpha: 0.3 })}`, textColorSuccess: f, colorSuccess: Re(f, { alpha: 0.12 }), colorBorderedSuccess: Re(f, { alpha: 0.1 }), closeIconColorSuccess: f, closeIconColorHoverSuccess: f, closeIconColorPressedSuccess: f, closeColorHoverSuccess: Re(f, { alpha: 0.12 }), closeColorPressedSuccess: Re(f, { alpha: 0.18 }), borderWarning: `1px solid ${Re(a, { alpha: 0.35 })}`, textColorWarning: a, colorWarning: Re(a, { alpha: 0.15 }), colorBorderedWarning: Re(a, { alpha: 0.12 }), closeIconColorWarning: a, closeIconColorHoverWarning: a, closeIconColorPressedWarning: a, closeColorHoverWarning: Re(a, { alpha: 0.12 }), closeColorPressedWarning: Re(a, { alpha: 0.18 }), borderError: `1px solid ${Re(c, { alpha: 0.23 })}`, textColorError: c, colorError: Re(c, { alpha: 0.1 }), colorBorderedError: Re(c, { alpha: 0.08 }), closeIconColorError: c, closeIconColorHoverError: c, closeIconColorPressedError: c, closeColorHoverError: Re(c, { alpha: 0.12 }), closeColorPressedError: Re(c, { alpha: 0.18 }) });
}
const qr = { common: Gn, self: Wr }, Xr = { color: Object, type: { type: String, default: "default" }, round: Boolean, size: String, closable: Boolean, disabled: { type: Boolean, default: void 0 } }, Gr = z("tag", `
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
`, [U("strong", `
 font-weight: var(--n-font-weight-strong);
 `), ee("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), ee("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), ee("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), ee("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), U("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [ee("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), ee("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), U("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), U("icon, avatar", [U("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), U("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), U("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [je("disabled", [Q("&:hover", "background-color: var(--n-color-hover-checkable);", [je("checked", "color: var(--n-text-color-hover-checkable);")]), Q("&:active", "background-color: var(--n-color-pressed-checkable);", [je("checked", "color: var(--n-text-color-pressed-checkable);")])]), U("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [je("disabled", [Q("&:hover", "background-color: var(--n-color-checked-hover);"), Q("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Zr = Object.assign(Object.assign(Object.assign({}, ke.props), Xr), { bordered: { type: Boolean, default: void 0 }, checked: Boolean, checkable: Boolean, strong: Boolean, triggerClickOnClose: Boolean, onClose: [Array, Function], onMouseenter: Function, onMouseleave: Function, "onUpdate:checked": Function, onUpdateChecked: Function, internalCloseFocusable: { type: Boolean, default: true }, internalCloseIsButtonTag: { type: Boolean, default: true }, onCheckedChange: Function }), Yr = Pt("n-tag"), Jt = ve({ name: "Tag", props: Zr, slots: Object, setup(e) {
  const t = N(null), { mergedBorderedRef: o, mergedClsPrefixRef: n, inlineThemeDisabled: l, mergedRtlRef: i, mergedComponentPropsRef: f } = Ae(e), a = k(() => {
    var u, h;
    return e.size || ((h = (u = f == null ? void 0 : f.value) === null || u === void 0 ? void 0 : u.Tag) === null || h === void 0 ? void 0 : h.size) || "medium";
  }), c = ke("Tag", "-tag", Gr, qr, e, n);
  ct(Yr, { roundRef: ce(e, "round") });
  function s() {
    if (!e.disabled && e.checkable) {
      const { checked: u, onCheckedChange: h, onUpdateChecked: x, "onUpdate:checked": w } = e;
      x && x(!u), w && w(!u), h && h(!u);
    }
  }
  function y(u) {
    if (e.triggerClickOnClose || u.stopPropagation(), !e.disabled) {
      const { onClose: h } = e;
      h && oe(h, u);
    }
  }
  const b = { setTextContent(u) {
    const { value: h } = t;
    h && (h.textContent = u);
  } }, C = st("Tag", i, n), v = k(() => {
    const { type: u, color: { color: h, textColor: x } = {} } = e, w = a.value, { common: { cubicBezierEaseInOut: M }, self: { padding: B, closeMargin: T, borderRadius: _, opacityDisabled: I, textColorCheckable: q, textColorHoverCheckable: te, textColorPressedCheckable: le, textColorChecked: ne, colorCheckable: E, colorHoverCheckable: p, colorPressedCheckable: S, colorChecked: L, colorCheckedHover: H, colorCheckedPressed: D, closeBorderRadius: K, fontWeightStrong: X, [he("colorBordered", u)]: Z, [he("closeSize", w)]: P, [he("closeIconSize", w)]: A, [he("fontSize", w)]: G, [he("height", w)]: m, [he("color", u)]: F, [he("textColor", u)]: de, [he("border", u)]: me, [he("closeIconColor", u)]: ge, [he("closeIconColorHover", u)]: pe, [he("closeIconColorPressed", u)]: O, [he("closeColorHover", u)]: ae, [he("closeColorPressed", u)]: xe } } = c.value, ye = xt(T);
    return { "--n-font-weight-strong": X, "--n-avatar-size-override": `calc(${m} - 8px)`, "--n-bezier": M, "--n-border-radius": _, "--n-border": me, "--n-close-icon-size": A, "--n-close-color-pressed": xe, "--n-close-color-hover": ae, "--n-close-border-radius": K, "--n-close-icon-color": ge, "--n-close-icon-color-hover": pe, "--n-close-icon-color-pressed": O, "--n-close-icon-color-disabled": ge, "--n-close-margin-top": ye.top, "--n-close-margin-right": ye.right, "--n-close-margin-bottom": ye.bottom, "--n-close-margin-left": ye.left, "--n-close-size": P, "--n-color": h || (o.value ? Z : F), "--n-color-checkable": E, "--n-color-checked": L, "--n-color-checked-hover": H, "--n-color-checked-pressed": D, "--n-color-hover-checkable": p, "--n-color-pressed-checkable": S, "--n-font-size": G, "--n-height": m, "--n-opacity-disabled": I, "--n-padding": B, "--n-text-color": x || de, "--n-text-color-checkable": q, "--n-text-color-checked": ne, "--n-text-color-hover-checkable": te, "--n-text-color-pressed-checkable": le };
  }), d = l ? et("tag", k(() => {
    let u = "";
    const { type: h, color: { color: x, textColor: w } = {} } = e;
    return u += h[0], u += a.value[0], x && (u += `a${wo(x)}`), w && (u += `b${wo(w)}`), o.value && (u += "c"), u;
  }), v, e) : void 0;
  return Object.assign(Object.assign({}, b), { rtlEnabled: C, mergedClsPrefix: n, contentRef: t, mergedBordered: o, handleClick: s, handleCloseClick: y, cssVars: l ? void 0 : v, themeClass: d == null ? void 0 : d.themeClass, onRender: d == null ? void 0 : d.onRender });
}, render() {
  var e, t;
  const { mergedClsPrefix: o, rtlEnabled: n, closable: l, color: { borderColor: i } = {}, round: f, onRender: a, $slots: c } = this;
  a == null ? void 0 : a();
  const s = Rt(c.avatar, (b) => b && r("div", { class: `${o}-tag__avatar` }, b)), y = Rt(c.icon, (b) => b && r("div", { class: `${o}-tag__icon` }, b));
  return r("div", { class: [`${o}-tag`, this.themeClass, { [`${o}-tag--rtl`]: n, [`${o}-tag--strong`]: this.strong, [`${o}-tag--disabled`]: this.disabled, [`${o}-tag--checkable`]: this.checkable, [`${o}-tag--checked`]: this.checkable && this.checked, [`${o}-tag--round`]: f, [`${o}-tag--avatar`]: s, [`${o}-tag--icon`]: y, [`${o}-tag--closable`]: l }], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave }, y || s, r("span", { class: `${o}-tag__content`, ref: "contentRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && l ? r(Yn, { clsPrefix: o, class: `${o}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: f, isButtonTag: this.internalCloseIsButtonTag, absolute: true }) : null, !this.checkable && this.mergedBordered ? r("div", { class: `${o}-tag__border`, style: { borderColor: i } }) : null);
} }), Jr = Q([z("base-selection", `
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
 `, [z("base-loading", `
 color: var(--n-loading-color);
 `), z("base-selection-tags", "min-height: var(--n-height);"), ee("border, state-border", `
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
 `), ee("state-border", `
 z-index: 1;
 border-color: #0000;
 `), z("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [ee("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), z("base-selection-overlay", `
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
 `, [ee("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), z("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [ee("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), z("base-selection-tags", `
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
 `), z("base-selection-label", `
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
 `, [z("base-selection-input", `
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
 `, [ee("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), ee("render-label", `
 color: var(--n-text-color);
 `)]), je("disabled", [Q("&:hover", [ee("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), U("focus", [ee("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), U("active", [ee("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), z("base-selection-label", "background-color: var(--n-color-active);"), z("base-selection-tags", "background-color: var(--n-color-active);")])]), U("disabled", "cursor: not-allowed;", [ee("arrow", `
 color: var(--n-arrow-color-disabled);
 `), z("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [z("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), ee("render-label", `
 color: var(--n-text-color-disabled);
 `)]), z("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), z("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), z("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [ee("input", `
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
 `), ee("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => U(`${e}-status`, [ee("state-border", `border: var(--n-border-${e});`), je("disabled", [Q("&:hover", [ee("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), U("active", [ee("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), z("base-selection-label", `background-color: var(--n-color-active-${e});`), z("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), U("focus", [ee("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), z("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), z("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [Q("&:last-child", "padding-right: 0;"), z("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [ee("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Qr = ve({ name: "InternalSelection", props: Object.assign(Object.assign({}, ke.props), { clsPrefix: { type: String, required: true }, bordered: { type: Boolean, default: void 0 }, active: Boolean, pattern: { type: String, default: "" }, placeholder: String, selectedOption: { type: Object, default: null }, selectedOptions: { type: Array, default: null }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: { type: String, default: "medium" }, loading: Boolean, autofocus: Boolean, showArrow: { type: Boolean, default: true }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], ellipsisTagPopoverProps: Object, onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: true }, onResize: Function }), setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: o } = Ae(e), n = st("InternalSelection", o, t), l = N(null), i = N(null), f = N(null), a = N(null), c = N(null), s = N(null), y = N(null), b = N(null), C = N(null), v = N(null), d = N(false), u = N(false), h = N(false), x = ke("InternalSelection", "-internal-selection", Jr, Qn, e, ce(e, "clsPrefix")), w = k(() => e.clearable && !e.disabled && (h.value || e.active)), M = k(() => e.selectedOption ? e.renderTag ? e.renderTag({ option: e.selectedOption, handleClose: () => {
  } }) : e.renderLabel ? e.renderLabel(e.selectedOption, true) : mt(e.selectedOption[e.labelField], e.selectedOption, true) : e.placeholder), B = k(() => {
    const $ = e.selectedOption;
    if ($) return $[e.labelField];
  }), T = k(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
  function _() {
    var $;
    const { value: j } = l;
    if (j) {
      const { value: Ce } = i;
      Ce && (Ce.style.width = `${j.offsetWidth}px`, e.maxTagCount !== "responsive" && (($ = C.value) === null || $ === void 0 || $.sync({ showAllItemsBeforeCalculate: false })));
    }
  }
  function I() {
    const { value: $ } = v;
    $ && ($.style.display = "none");
  }
  function q() {
    const { value: $ } = v;
    $ && ($.style.display = "inline-block");
  }
  it(ce(e, "active"), ($) => {
    $ || I();
  }), it(ce(e, "pattern"), () => {
    e.multiple && zt(_);
  });
  function te($) {
    const { onFocus: j } = e;
    j && j($);
  }
  function le($) {
    const { onBlur: j } = e;
    j && j($);
  }
  function ne($) {
    const { onDeleteOption: j } = e;
    j && j($);
  }
  function E($) {
    const { onClear: j } = e;
    j && j($);
  }
  function p($) {
    const { onPatternInput: j } = e;
    j && j($);
  }
  function S($) {
    var j;
    (!$.relatedTarget || !(!((j = f.value) === null || j === void 0) && j.contains($.relatedTarget))) && te($);
  }
  function L($) {
    var j;
    !((j = f.value) === null || j === void 0) && j.contains($.relatedTarget) || le($);
  }
  function H($) {
    E($);
  }
  function D() {
    h.value = true;
  }
  function K() {
    h.value = false;
  }
  function X($) {
    !e.active || !e.filterable || $.target !== i.value && $.preventDefault();
  }
  function Z($) {
    ne($);
  }
  const P = N(false);
  function A($) {
    if ($.key === "Backspace" && !P.value && !e.pattern.length) {
      const { selectedOptions: j } = e;
      (j == null ? void 0 : j.length) && Z(j[j.length - 1]);
    }
  }
  let G = null;
  function m($) {
    const { value: j } = l;
    if (j) {
      const Ce = $.target.value;
      j.textContent = Ce, _();
    }
    e.ignoreComposition && P.value ? G = $ : p($);
  }
  function F() {
    P.value = true;
  }
  function de() {
    P.value = false, e.ignoreComposition && p(G), G = null;
  }
  function me($) {
    var j;
    u.value = true, (j = e.onPatternFocus) === null || j === void 0 || j.call(e, $);
  }
  function ge($) {
    var j;
    u.value = false, (j = e.onPatternBlur) === null || j === void 0 || j.call(e, $);
  }
  function pe() {
    var $, j;
    if (e.filterable) u.value = false, ($ = s.value) === null || $ === void 0 || $.blur(), (j = i.value) === null || j === void 0 || j.blur();
    else if (e.multiple) {
      const { value: Ce } = a;
      Ce == null ? void 0 : Ce.blur();
    } else {
      const { value: Ce } = c;
      Ce == null ? void 0 : Ce.blur();
    }
  }
  function O() {
    var $, j, Ce;
    e.filterable ? (u.value = false, ($ = s.value) === null || $ === void 0 || $.focus()) : e.multiple ? (j = a.value) === null || j === void 0 || j.focus() : (Ce = c.value) === null || Ce === void 0 || Ce.focus();
  }
  function ae() {
    const { value: $ } = i;
    $ && (q(), $.focus());
  }
  function xe() {
    const { value: $ } = i;
    $ && $.blur();
  }
  function ye($) {
    const { value: j } = y;
    j && j.setTextContent(`+${$}`);
  }
  function ze() {
    const { value: $ } = b;
    return $;
  }
  function Me() {
    return i.value;
  }
  let Ie = null;
  function ie() {
    Ie !== null && window.clearTimeout(Ie);
  }
  function be() {
    e.active || (ie(), Ie = window.setTimeout(() => {
      T.value && (d.value = true);
    }, 100));
  }
  function Pe() {
    ie();
  }
  function we($) {
    $ || (ie(), d.value = false);
  }
  it(T, ($) => {
    $ || (d.value = false);
  }), $t(() => {
    Ct(() => {
      const $ = s.value;
      $ && (e.disabled ? $.removeAttribute("tabindex") : $.tabIndex = u.value ? -1 : 0);
    });
  }), dn(f, e.onResize);
  const { inlineThemeDisabled: _e } = e, De = k(() => {
    const { size: $ } = e, { common: { cubicBezierEaseInOut: j }, self: { fontWeight: Ce, borderRadius: Ge, color: Be, placeholderColor: Te, textColor: Ue, paddingSingle: Fe, paddingMultiple: Ve, caretColor: We, colorDisabled: Ke, textColorDisabled: Y, placeholderColorDisabled: ue, colorActive: g, boxShadowFocus: R, boxShadowActive: W, boxShadowHover: se, border: V, borderFocus: J, borderHover: re, borderActive: fe, arrowColor: Se, arrowColorDisabled: ot, loadingColor: Ze, colorActiveWarning: nt, boxShadowFocusWarning: rt, boxShadowActiveWarning: ut, boxShadowHoverWarning: ft, borderWarning: lt, borderFocusWarning: dt, borderHoverWarning: ht, borderActiveWarning: Ye, colorActiveError: vt, boxShadowFocusError: kt, boxShadowActiveError: Le, boxShadowHoverError: He, borderError: Lt, borderFocusError: Nt, borderHoverError: Dt, borderActiveError: Ut, clearColor: Ht, clearColorHover: jt, clearColorPressed: Kt, clearSize: Vt, arrowSize: Wt, [he("height", $)]: qt, [he("fontSize", $)]: Xt } } = x.value, gt = xt(Fe), bt = xt(Ve);
    return { "--n-bezier": j, "--n-border": V, "--n-border-active": fe, "--n-border-focus": J, "--n-border-hover": re, "--n-border-radius": Ge, "--n-box-shadow-active": W, "--n-box-shadow-focus": R, "--n-box-shadow-hover": se, "--n-caret-color": We, "--n-color": Be, "--n-color-active": g, "--n-color-disabled": Ke, "--n-font-size": Xt, "--n-height": qt, "--n-padding-single-top": gt.top, "--n-padding-multiple-top": bt.top, "--n-padding-single-right": gt.right, "--n-padding-multiple-right": bt.right, "--n-padding-single-left": gt.left, "--n-padding-multiple-left": bt.left, "--n-padding-single-bottom": gt.bottom, "--n-padding-multiple-bottom": bt.bottom, "--n-placeholder-color": Te, "--n-placeholder-color-disabled": ue, "--n-text-color": Ue, "--n-text-color-disabled": Y, "--n-arrow-color": Se, "--n-arrow-color-disabled": ot, "--n-loading-color": Ze, "--n-color-active-warning": nt, "--n-box-shadow-focus-warning": rt, "--n-box-shadow-active-warning": ut, "--n-box-shadow-hover-warning": ft, "--n-border-warning": lt, "--n-border-focus-warning": dt, "--n-border-hover-warning": ht, "--n-border-active-warning": Ye, "--n-color-active-error": vt, "--n-box-shadow-focus-error": kt, "--n-box-shadow-active-error": Le, "--n-box-shadow-hover-error": He, "--n-border-error": Lt, "--n-border-focus-error": Nt, "--n-border-hover-error": Dt, "--n-border-active-error": Ut, "--n-clear-size": Vt, "--n-clear-color": Ht, "--n-clear-color-hover": jt, "--n-clear-color-pressed": Kt, "--n-arrow-size": Wt, "--n-font-weight": Ce };
  }), Oe = _e ? et("internal-selection", k(() => e.size[0]), De, e) : void 0;
  return { mergedTheme: x, mergedClearable: w, mergedClsPrefix: t, rtlEnabled: n, patternInputFocused: u, filterablePlaceholder: M, label: B, selected: T, showTagsPanel: d, isComposing: P, counterRef: y, counterWrapperRef: b, patternInputMirrorRef: l, patternInputRef: i, selfRef: f, multipleElRef: a, singleElRef: c, patternInputWrapperRef: s, overflowRef: C, inputTagElRef: v, handleMouseDown: X, handleFocusin: S, handleClear: H, handleMouseEnter: D, handleMouseLeave: K, handleDeleteOption: Z, handlePatternKeyDown: A, handlePatternInputInput: m, handlePatternInputBlur: ge, handlePatternInputFocus: me, handleMouseEnterCounter: be, handleMouseLeaveCounter: Pe, handleFocusout: L, handleCompositionEnd: de, handleCompositionStart: F, onPopoverUpdateShow: we, focus: O, focusInput: ae, blur: pe, blurInput: xe, updateCounter: ye, getCounter: ze, getTail: Me, renderLabel: e.renderLabel, cssVars: _e ? void 0 : De, themeClass: Oe == null ? void 0 : Oe.themeClass, onRender: Oe == null ? void 0 : Oe.onRender };
}, render() {
  const { status: e, multiple: t, size: o, disabled: n, filterable: l, maxTagCount: i, bordered: f, clsPrefix: a, ellipsisTagPopoverProps: c, onRender: s, renderTag: y, renderLabel: b } = this;
  s == null ? void 0 : s();
  const C = i === "responsive", v = typeof i == "number", d = C || v, u = r(Jn, null, { default: () => r(Pr, { clsPrefix: a, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, { default: () => {
    var x, w;
    return (w = (x = this.$slots).arrow) === null || w === void 0 ? void 0 : w.call(x);
  } }) });
  let h;
  if (t) {
    const { labelField: x } = this, w = (p) => r("div", { class: `${a}-base-selection-tag-wrapper`, key: p.value }, y ? y({ option: p, handleClose: () => {
      this.handleDeleteOption(p);
    } }) : r(Jt, { size: o, closable: !p.disabled, disabled: n, onClose: () => {
      this.handleDeleteOption(p);
    }, internalCloseIsButtonTag: false, internalCloseFocusable: false }, { default: () => b ? b(p, true) : mt(p[x], p, true) })), M = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), B = l ? r("div", { class: `${a}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" }, r("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: n, value: this.pattern, autofocus: this.autofocus, class: `${a}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), r("span", { ref: "patternInputMirrorRef", class: `${a}-base-selection-input-tag__mirror` }, this.pattern)) : null, T = C ? () => r("div", { class: `${a}-base-selection-tag-wrapper`, ref: "counterWrapperRef" }, r(Jt, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: n })) : void 0;
    let _;
    if (v) {
      const p = this.selectedOptions.length - i;
      p > 0 && (_ = r("div", { class: `${a}-base-selection-tag-wrapper`, key: "__counter__" }, r(Jt, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: n }, { default: () => `+${p}` })));
    }
    const I = C ? l ? r(So, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: M, counter: T, tail: () => B }) : r(So, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: M, counter: T }) : v && _ ? M().concat(_) : M(), q = d ? () => r("div", { class: `${a}-base-selection-popover` }, C ? M() : this.selectedOptions.map(w)) : void 0, te = d ? Object.assign({ show: this.showTagsPanel, trigger: "hover", overlap: true, placement: "top", width: "trigger", onUpdateShow: this.onPopoverUpdateShow, theme: this.mergedTheme.peers.Popover, themeOverrides: this.mergedTheme.peerOverrides.Popover }, c) : null, ne = (this.selected ? false : this.active ? !this.pattern && !this.isComposing : true) ? r("div", { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay` }, r("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)) : null, E = l ? r("div", { ref: "patternInputWrapperRef", class: `${a}-base-selection-tags` }, I, C ? null : B, u) : r("div", { ref: "multipleElRef", class: `${a}-base-selection-tags`, tabindex: n ? void 0 : 0 }, I, u);
    h = r(wt, null, d ? r(go, Object.assign({}, te, { scrollable: true, style: "max-height: calc(var(--v-target-height) * 6.6);" }), { trigger: () => E, default: q }) : E, ne);
  } else if (l) {
    const x = this.pattern || this.isComposing, w = this.active ? !x : !this.selected, M = this.active ? false : this.selected;
    h = r("div", { ref: "patternInputWrapperRef", class: `${a}-base-selection-label`, title: this.patternInputFocused ? void 0 : Bo(this.label) }, r("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${a}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: n, disabled: n, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })), M ? r("div", { class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`, key: "input" }, r("div", { class: `${a}-base-selection-overlay__wrapper` }, y ? y({ option: this.selectedOption, handleClose: () => {
    } }) : b ? b(this.selectedOption, true) : mt(this.label, this.selectedOption, true))) : null, w ? r("div", { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" }, r("div", { class: `${a}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)) : null, u);
  } else h = r("div", { ref: "singleElRef", class: `${a}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 }, this.label !== void 0 ? r("div", { class: `${a}-base-selection-input`, title: Bo(this.label), key: "input" }, r("div", { class: `${a}-base-selection-input__content` }, y ? y({ option: this.selectedOption, handleClose: () => {
  } }) : b ? b(this.selectedOption, true) : mt(this.label, this.selectedOption, true))) : r("div", { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" }, r("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)), u);
  return r("div", { ref: "selfRef", class: [`${a}-base-selection`, this.rtlEnabled && `${a}-base-selection--rtl`, this.themeClass, e && `${a}-base-selection--${e}-status`, { [`${a}-base-selection--active`]: this.active, [`${a}-base-selection--selected`]: this.selected || this.active && this.pattern, [`${a}-base-selection--disabled`]: this.disabled, [`${a}-base-selection--multiple`]: this.multiple, [`${a}-base-selection--focus`]: this.focused }], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown }, h, f ? r("div", { class: `${a}-base-selection__border` }) : null, f ? r("div", { class: `${a}-base-selection__state-border` }) : null);
} });
function _t(e) {
  return e.type === "group";
}
function hn(e) {
  return e.type === "ignored";
}
function Qt(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return false;
  }
}
function vn(e, t) {
  return { getIsGroup: _t, getIgnored: hn, getKey(n) {
    return _t(n) ? n.name || n.key || "key-required" : n[e];
  }, getChildren(n) {
    return n[t];
  } };
}
function el(e, t, o, n) {
  if (!t) return e;
  function l(i) {
    if (!Array.isArray(i)) return [];
    const f = [];
    for (const a of i) if (_t(a)) {
      const c = l(a[n]);
      c.length && f.push(Object.assign({}, a, { [n]: c }));
    } else {
      if (hn(a)) continue;
      t(o, a) && f.push(a);
    }
    return f;
  }
  return l(e);
}
function tl(e, t, o) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    _t(l) ? l[o].forEach((i) => {
      n.set(i[t], i);
    }) : n.set(l[t], l);
  }), n;
}
const gn = Pt("n-checkbox-group"), ol = { min: Number, max: Number, size: String, value: Array, defaultValue: { type: Array, default: null }, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onChange: [Function, Array] }, nl = ve({ name: "CheckboxGroup", props: ol, setup(e) {
  const { mergedClsPrefixRef: t } = Ae(e), o = Ft(e), { mergedSizeRef: n, mergedDisabledRef: l } = o, i = N(e.defaultValue), f = k(() => e.value), a = Qe(f, i), c = k(() => {
    var b;
    return ((b = a.value) === null || b === void 0 ? void 0 : b.length) || 0;
  }), s = k(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
  function y(b, C) {
    const { nTriggerFormInput: v, nTriggerFormChange: d } = o, { onChange: u, "onUpdate:value": h, onUpdateValue: x } = e;
    if (Array.isArray(a.value)) {
      const w = Array.from(a.value), M = w.findIndex((B) => B === C);
      b ? ~M || (w.push(C), x && oe(x, w, { actionType: "check", value: C }), h && oe(h, w, { actionType: "check", value: C }), v(), d(), i.value = w, u && oe(u, w)) : ~M && (w.splice(M, 1), x && oe(x, w, { actionType: "uncheck", value: C }), h && oe(h, w, { actionType: "uncheck", value: C }), u && oe(u, w), i.value = w, v(), d());
    } else b ? (x && oe(x, [C], { actionType: "check", value: C }), h && oe(h, [C], { actionType: "check", value: C }), u && oe(u, [C]), i.value = [C], v(), d()) : (x && oe(x, [], { actionType: "uncheck", value: C }), h && oe(h, [], { actionType: "uncheck", value: C }), u && oe(u, []), i.value = [], v(), d());
  }
  return ct(gn, { checkedCountRef: c, maxRef: ce(e, "max"), minRef: ce(e, "min"), valueSetRef: s, disabledRef: l, mergedSizeRef: n, toggleCheckbox: y }), { mergedClsPrefix: t };
}, render() {
  return r("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
} }), rl = () => r("svg", { viewBox: "0 0 64 64", class: "check-icon" }, r("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })), ll = () => r("svg", { viewBox: "0 0 100 100", class: "line-icon" }, r("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })), al = Q([z("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [U("show-label", "line-height: var(--n-label-line-height);"), Q("&:hover", [z("checkbox-box", [ee("border", "border: var(--n-border-checked);")])]), Q("&:focus:not(:active)", [z("checkbox-box", [ee("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), U("inside-table", [z("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), U("checked", [z("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [z("checkbox-icon", [Q(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), U("indeterminate", [z("checkbox-box", [z("checkbox-icon", [Q(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), Q(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), U("checked, indeterminate", [Q("&:focus:not(:active)", [z("checkbox-box", [ee("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), z("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [ee("border", { border: "var(--n-border-checked)" })])]), U("disabled", { cursor: "not-allowed" }, [U("checked", [z("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [ee("border", { border: "var(--n-border-disabled-checked)" }), z("checkbox-icon", [Q(".check-icon, .line-icon", { fill: "var(--n-check-mark-color-disabled-checked)" })])])]), z("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [ee("border", `
 border: var(--n-border-disabled);
 `), z("checkbox-icon", [Q(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), ee("label", `
 color: var(--n-text-color-disabled);
 `)]), z("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), z("checkbox-box", `
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
 `, [ee("border", `
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
 `), z("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [Q(".check-icon, .line-icon", `
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
 `), pt({ left: "1px", top: "1px" })])]), ee("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [Q("&:empty", { display: "none" })])]), Jo(z("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)), Qo(z("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))]), il = Object.assign(Object.assign({}, ke.props), { size: String, checked: { type: [Boolean, String, Number], default: void 0 }, defaultChecked: { type: [Boolean, String, Number], default: false }, value: [String, Number], disabled: { type: Boolean, default: void 0 }, indeterminate: Boolean, label: String, focusable: { type: Boolean, default: true }, checkedValue: { type: [Boolean, String, Number], default: true }, uncheckedValue: { type: [Boolean, String, Number], default: false }, "onUpdate:checked": [Function, Array], onUpdateChecked: [Function, Array], privateInsideTable: Boolean, onChange: [Function, Array] }), mo = ve({ name: "Checkbox", props: il, setup(e) {
  const t = Ee(gn, null), o = N(null), { mergedClsPrefixRef: n, inlineThemeDisabled: l, mergedRtlRef: i, mergedComponentPropsRef: f } = Ae(e), a = N(e.defaultChecked), c = ce(e, "checked"), s = Qe(c, a), y = Ne(() => {
    if (t) {
      const I = t.valueSetRef.value;
      return I && e.value !== void 0 ? I.has(e.value) : false;
    } else return s.value === e.checkedValue;
  }), b = Ft(e, { mergedSize(I) {
    var q, te;
    const { size: le } = e;
    if (le !== void 0) return le;
    if (t) {
      const { value: E } = t.mergedSizeRef;
      if (E !== void 0) return E;
    }
    if (I) {
      const { mergedSize: E } = I;
      if (E !== void 0) return E.value;
    }
    const ne = (te = (q = f == null ? void 0 : f.value) === null || q === void 0 ? void 0 : q.Checkbox) === null || te === void 0 ? void 0 : te.size;
    return ne || "medium";
  }, mergedDisabled(I) {
    const { disabled: q } = e;
    if (q !== void 0) return q;
    if (t) {
      if (t.disabledRef.value) return true;
      const { maxRef: { value: te }, checkedCountRef: le } = t;
      if (te !== void 0 && le.value >= te && !y.value) return true;
      const { minRef: { value: ne } } = t;
      if (ne !== void 0 && le.value <= ne && y.value) return true;
    }
    return I ? I.disabled.value : false;
  } }), { mergedDisabledRef: C, mergedSizeRef: v } = b, d = ke("Checkbox", "-checkbox", al, er, e, n);
  function u(I) {
    if (t && e.value !== void 0) t.toggleCheckbox(!y.value, e.value);
    else {
      const { onChange: q, "onUpdate:checked": te, onUpdateChecked: le } = e, { nTriggerFormInput: ne, nTriggerFormChange: E } = b, p = y.value ? e.uncheckedValue : e.checkedValue;
      te && oe(te, p, I), le && oe(le, p, I), q && oe(q, p, I), ne(), E(), a.value = p;
    }
  }
  function h(I) {
    C.value || u(I);
  }
  function x(I) {
    if (!C.value) switch (I.key) {
      case " ":
      case "Enter":
        u(I);
    }
  }
  function w(I) {
    switch (I.key) {
      case " ":
        I.preventDefault();
    }
  }
  const M = { focus: () => {
    var I;
    (I = o.value) === null || I === void 0 || I.focus();
  }, blur: () => {
    var I;
    (I = o.value) === null || I === void 0 || I.blur();
  } }, B = st("Checkbox", i, n), T = k(() => {
    const { value: I } = v, { common: { cubicBezierEaseInOut: q }, self: { borderRadius: te, color: le, colorChecked: ne, colorDisabled: E, colorTableHeader: p, colorTableHeaderModal: S, colorTableHeaderPopover: L, checkMarkColor: H, checkMarkColorDisabled: D, border: K, borderFocus: X, borderDisabled: Z, borderChecked: P, boxShadowFocus: A, textColor: G, textColorDisabled: m, checkMarkColorDisabledChecked: F, colorDisabledChecked: de, borderDisabledChecked: me, labelPadding: ge, labelLineHeight: pe, labelFontWeight: O, [he("fontSize", I)]: ae, [he("size", I)]: xe } } = d.value;
    return { "--n-label-line-height": pe, "--n-label-font-weight": O, "--n-size": xe, "--n-bezier": q, "--n-border-radius": te, "--n-border": K, "--n-border-checked": P, "--n-border-focus": X, "--n-border-disabled": Z, "--n-border-disabled-checked": me, "--n-box-shadow-focus": A, "--n-color": le, "--n-color-checked": ne, "--n-color-table": p, "--n-color-table-modal": S, "--n-color-table-popover": L, "--n-color-disabled": E, "--n-color-disabled-checked": de, "--n-text-color": G, "--n-text-color-disabled": m, "--n-check-mark-color": H, "--n-check-mark-color-disabled": D, "--n-check-mark-color-disabled-checked": F, "--n-font-size": ae, "--n-label-padding": ge };
  }), _ = l ? et("checkbox", k(() => v.value[0]), T, e) : void 0;
  return Object.assign(b, M, { rtlEnabled: B, selfRef: o, mergedClsPrefix: n, mergedDisabled: C, renderedChecked: y, mergedTheme: d, labelId: tn(), handleClick: h, handleKeyUp: x, handleKeyDown: w, cssVars: l ? void 0 : T, themeClass: _ == null ? void 0 : _.themeClass, onRender: _ == null ? void 0 : _.onRender });
}, render() {
  var e;
  const { $slots: t, renderedChecked: o, mergedDisabled: n, indeterminate: l, privateInsideTable: i, cssVars: f, labelId: a, label: c, mergedClsPrefix: s, focusable: y, handleKeyUp: b, handleKeyDown: C, handleClick: v } = this;
  (e = this.onRender) === null || e === void 0 || e.call(this);
  const d = Rt(t.default, (u) => c || u ? r("span", { class: `${s}-checkbox__label`, id: a }, c || u) : null);
  return r("div", { ref: "selfRef", class: [`${s}-checkbox`, this.themeClass, this.rtlEnabled && `${s}-checkbox--rtl`, o && `${s}-checkbox--checked`, n && `${s}-checkbox--disabled`, l && `${s}-checkbox--indeterminate`, i && `${s}-checkbox--inside-table`, d && `${s}-checkbox--show-label`], tabindex: n || !y ? void 0 : 0, role: "checkbox", "aria-checked": l ? "mixed" : o, "aria-labelledby": a, style: f, onKeyup: b, onKeydown: C, onClick: v, onMousedown: () => {
    ro("selectstart", window, (u) => {
      u.preventDefault();
    }, { once: true });
  } }, r("div", { class: `${s}-checkbox-box-wrapper` }, "\xA0", r("div", { class: `${s}-checkbox-box` }, r(en, null, { default: () => this.indeterminate ? r("div", { key: "indeterminate", class: `${s}-checkbox-icon` }, ll()) : r("div", { key: "check", class: `${s}-checkbox-icon` }, rl()) }), r("div", { class: `${s}-checkbox-box__border` }))), d);
} }), bn = Pt("n-popselect"), sl = z("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), yo = { multiple: Boolean, value: { type: [String, Number, Array], default: null }, cancelable: Boolean, options: { type: Array, default: () => [] }, size: String, scrollable: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onMouseenter: Function, onMouseleave: Function, renderLabel: Function, showCheckmark: { type: Boolean, default: void 0 }, nodeProps: Function, virtualScroll: Boolean, onChange: [Function, Array] }, Uo = tr(yo), dl = ve({ name: "PopselectPanel", props: yo, setup(e) {
  const t = Ee(bn), { mergedClsPrefixRef: o, inlineThemeDisabled: n, mergedComponentPropsRef: l } = Ae(e), i = k(() => {
    var d, u;
    return e.size || ((u = (d = l == null ? void 0 : l.value) === null || d === void 0 ? void 0 : d.Popselect) === null || u === void 0 ? void 0 : u.size) || "medium";
  }), f = ke("Popselect", "-pop-select", sl, on, t.props, o), a = k(() => bo(e.options, vn("value", "children")));
  function c(d, u) {
    const { onUpdateValue: h, "onUpdate:value": x, onChange: w } = e;
    h && oe(h, d, u), x && oe(x, d, u), w && oe(w, d, u);
  }
  function s(d) {
    b(d.key);
  }
  function y(d) {
    !at(d, "action") && !at(d, "empty") && !at(d, "header") && d.preventDefault();
  }
  function b(d) {
    const { value: { getNode: u } } = a;
    if (e.multiple) if (Array.isArray(e.value)) {
      const h = [], x = [];
      let w = true;
      e.value.forEach((M) => {
        if (M === d) {
          w = false;
          return;
        }
        const B = u(M);
        B && (h.push(B.key), x.push(B.rawNode));
      }), w && (h.push(d), x.push(u(d).rawNode)), c(h, x);
    } else {
      const h = u(d);
      h && c([d], [h.rawNode]);
    }
    else if (e.value === d && e.cancelable) c(null, null);
    else {
      const h = u(d);
      h && c(d, h.rawNode);
      const { "onUpdate:show": x, onUpdateShow: w } = t.props;
      x && oe(x, false), w && oe(w, false), t.setShow(false);
    }
    zt(() => {
      t.syncPosition();
    });
  }
  it(ce(e, "options"), () => {
    zt(() => {
      t.syncPosition();
    });
  });
  const C = k(() => {
    const { self: { menuBoxShadow: d } } = f.value;
    return { "--n-menu-box-shadow": d };
  }), v = n ? et("select", void 0, C, t.props) : void 0;
  return { mergedTheme: t.mergedThemeRef, mergedClsPrefix: o, treeMate: a, handleToggle: s, handleMenuMousedown: y, cssVars: n ? void 0 : C, themeClass: v == null ? void 0 : v.themeClass, onRender: v == null ? void 0 : v.onRender, mergedSize: i, scrollbarProps: t.props.scrollbarProps };
}, render() {
  var e;
  return (e = this.onRender) === null || e === void 0 || e.call(this), r(fn, { clsPrefix: this.mergedClsPrefix, focusable: true, nodeProps: this.nodeProps, class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass], style: this.cssVars, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, multiple: this.multiple, treeMate: this.treeMate, size: this.mergedSize, value: this.value, virtualScroll: this.virtualScroll, scrollable: this.scrollable, scrollbarProps: this.scrollbarProps, renderLabel: this.renderLabel, onToggle: this.handleToggle, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseenter, onMousedown: this.handleMenuMousedown, showCheckmark: this.showCheckmark }, { header: () => {
    var t, o;
    return ((o = (t = this.$slots).header) === null || o === void 0 ? void 0 : o.call(t)) || [];
  }, action: () => {
    var t, o;
    return ((o = (t = this.$slots).action) === null || o === void 0 ? void 0 : o.call(t)) || [];
  }, empty: () => {
    var t, o;
    return ((o = (t = this.$slots).empty) === null || o === void 0 ? void 0 : o.call(t)) || [];
  } });
} }), cl = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ke.props), nn(zo, ["showArrow", "arrow"])), { placement: Object.assign(Object.assign({}, zo.placement), { default: "bottom" }), trigger: { type: String, default: "hover" } }), yo), { scrollbarProps: Object }), ul = ve({ name: "Popselect", props: cl, slots: Object, inheritAttrs: false, __popover__: true, setup(e) {
  const { mergedClsPrefixRef: t } = Ae(e), o = ke("Popselect", "-popselect", void 0, on, e, t), n = N(null);
  function l() {
    var a;
    (a = n.value) === null || a === void 0 || a.syncPosition();
  }
  function i(a) {
    var c;
    (c = n.value) === null || c === void 0 || c.setShow(a);
  }
  return ct(bn, { props: e, mergedThemeRef: o, syncPosition: l, setShow: i }), Object.assign(Object.assign({}, { syncPosition: l, setShow: i }), { popoverInstRef: n, mergedTheme: o });
}, render() {
  const { mergedTheme: e } = this, t = { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: { padding: "0" }, ref: "popoverInstRef", internalRenderBody: (o, n, l, i, f) => {
    const { $attrs: a } = this;
    return r(dl, Object.assign({}, a, { class: [a.class, o], style: [a.style, ...l] }, or(this.$props, Uo), { ref: yr(n), onMouseenter: St([i, a.onMouseenter]), onMouseleave: St([f, a.onMouseleave]) }), { header: () => {
      var c, s;
      return (s = (c = this.$slots).header) === null || s === void 0 ? void 0 : s.call(c);
    }, action: () => {
      var c, s;
      return (s = (c = this.$slots).action) === null || s === void 0 ? void 0 : s.call(c);
    }, empty: () => {
      var c, s;
      return (s = (c = this.$slots).empty) === null || s === void 0 ? void 0 : s.call(c);
    } });
  } };
  return r(go, Object.assign({}, nn(this.$props, Uo), t, { internalDeactivateImmediately: true }), { trigger: () => {
    var o, n;
    return (n = (o = this.$slots).default) === null || n === void 0 ? void 0 : n.call(o);
  } });
} }), fl = Q([z("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), z("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [vo({ originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)" })])]), hl = Object.assign(Object.assign({}, ke.props), { to: It.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, clearCreatedOptionsOnClear: { type: Boolean, default: true }, clearFilterAfterSelect: { type: Boolean, default: true }, options: { type: Array, default: () => [] }, defaultValue: { type: [String, Number, Array], default: null }, keyboard: { type: Boolean, default: true }, value: [String, Number, Array], placeholder: String, menuProps: Object, multiple: Boolean, size: String, menuSize: { type: String }, filterable: Boolean, disabled: { type: Boolean, default: void 0 }, remote: Boolean, loading: Boolean, filter: Function, placement: { type: String, default: "bottom-start" }, widthMode: { type: String, default: "trigger" }, tag: Boolean, onCreate: Function, fallbackOption: { type: [Function, Boolean], default: void 0 }, show: { type: Boolean, default: void 0 }, showArrow: { type: Boolean, default: true }, maxTagCount: [Number, String], ellipsisTagPopoverProps: Object, consistentMenuWidth: { type: Boolean, default: true }, virtualScroll: { type: Boolean, default: true }, labelField: { type: String, default: "label" }, valueField: { type: String, default: "value" }, childrenField: { type: String, default: "children" }, renderLabel: Function, renderOption: Function, renderTag: Function, "onUpdate:value": [Function, Array], inputProps: Object, nodeProps: Function, ignoreComposition: { type: Boolean, default: true }, showOnFocus: Boolean, onUpdateValue: [Function, Array], onBlur: [Function, Array], onClear: [Function, Array], onFocus: [Function, Array], onScroll: [Function, Array], onSearch: [Function, Array], onUpdateShow: [Function, Array], "onUpdate:show": [Function, Array], displayDirective: { type: String, default: "show" }, resetMenuOnOptionsChange: { type: Boolean, default: true }, status: String, showCheckmark: { type: Boolean, default: true }, scrollbarProps: Object, onChange: [Function, Array], items: Array }), vl = ve({ name: "Select", props: hl, slots: Object, setup(e) {
  const { mergedClsPrefixRef: t, mergedBorderedRef: o, namespaceRef: n, inlineThemeDisabled: l, mergedComponentPropsRef: i } = Ae(e), f = ke("Select", "-select", fl, lr, e, t), a = N(e.defaultValue), c = ce(e, "value"), s = Qe(c, a), y = N(false), b = N(""), C = Tr(e, ["items", "options"]), v = N([]), d = N([]), u = k(() => d.value.concat(v.value).concat(C.value)), h = k(() => {
    const { filter: g } = e;
    if (g) return g;
    const { labelField: R, valueField: W } = e;
    return (se, V) => {
      if (!V) return false;
      const J = V[R];
      if (typeof J == "string") return Qt(se, J);
      const re = V[W];
      return typeof re == "string" ? Qt(se, re) : typeof re == "number" ? Qt(se, String(re)) : false;
    };
  }), x = k(() => {
    if (e.remote) return C.value;
    {
      const { value: g } = u, { value: R } = b;
      return !R.length || !e.filterable ? g : el(g, h.value, R, e.childrenField);
    }
  }), w = k(() => {
    const { valueField: g, childrenField: R } = e, W = vn(g, R);
    return bo(x.value, W);
  }), M = k(() => tl(u.value, e.valueField, e.childrenField)), B = N(false), T = Qe(ce(e, "show"), B), _ = N(null), I = N(null), q = N(null), { localeRef: te } = At("Select"), le = k(() => {
    var g;
    return (g = e.placeholder) !== null && g !== void 0 ? g : te.value.placeholder;
  }), ne = [], E = N(/* @__PURE__ */ new Map()), p = k(() => {
    const { fallbackOption: g } = e;
    if (g === void 0) {
      const { labelField: R, valueField: W } = e;
      return (se) => ({ [R]: String(se), [W]: se });
    }
    return g === false ? false : (R) => Object.assign(g(R), { value: R });
  });
  function S(g) {
    const R = e.remote, { value: W } = E, { value: se } = M, { value: V } = p, J = [];
    return g.forEach((re) => {
      if (se.has(re)) J.push(se.get(re));
      else if (R && W.has(re)) J.push(W.get(re));
      else if (V) {
        const fe = V(re);
        fe && J.push(fe);
      }
    }), J;
  }
  const L = k(() => {
    if (e.multiple) {
      const { value: g } = s;
      return Array.isArray(g) ? S(g) : [];
    }
    return null;
  }), H = k(() => {
    const { value: g } = s;
    return !e.multiple && !Array.isArray(g) ? g === null ? null : S([g])[0] || null : null;
  }), D = Ft(e, { mergedSize: (g) => {
    var R, W;
    const { size: se } = e;
    if (se) return se;
    const { mergedSize: V } = g || {};
    if (V == null ? void 0 : V.value) return V.value;
    const J = (W = (R = i == null ? void 0 : i.value) === null || R === void 0 ? void 0 : R.Select) === null || W === void 0 ? void 0 : W.size;
    return J || "medium";
  } }), { mergedSizeRef: K, mergedDisabledRef: X, mergedStatusRef: Z } = D;
  function P(g, R) {
    const { onChange: W, "onUpdate:value": se, onUpdateValue: V } = e, { nTriggerFormChange: J, nTriggerFormInput: re } = D;
    W && oe(W, g, R), V && oe(V, g, R), se && oe(se, g, R), a.value = g, J(), re();
  }
  function A(g) {
    const { onBlur: R } = e, { nTriggerFormBlur: W } = D;
    R && oe(R, g), W();
  }
  function G() {
    const { onClear: g } = e;
    g && oe(g);
  }
  function m(g) {
    const { onFocus: R, showOnFocus: W } = e, { nTriggerFormFocus: se } = D;
    R && oe(R, g), se(), W && pe();
  }
  function F(g) {
    const { onSearch: R } = e;
    R && oe(R, g);
  }
  function de(g) {
    const { onScroll: R } = e;
    R && oe(R, g);
  }
  function me() {
    var g;
    const { remote: R, multiple: W } = e;
    if (R) {
      const { value: se } = E;
      if (W) {
        const { valueField: V } = e;
        (g = L.value) === null || g === void 0 || g.forEach((J) => {
          se.set(J[V], J);
        });
      } else {
        const V = H.value;
        V && se.set(V[e.valueField], V);
      }
    }
  }
  function ge(g) {
    const { onUpdateShow: R, "onUpdate:show": W } = e;
    R && oe(R, g), W && oe(W, g), B.value = g;
  }
  function pe() {
    X.value || (ge(true), B.value = true, e.filterable && Ve());
  }
  function O() {
    ge(false);
  }
  function ae() {
    b.value = "", d.value = ne;
  }
  const xe = N(false);
  function ye() {
    e.filterable && (xe.value = true);
  }
  function ze() {
    e.filterable && (xe.value = false, T.value || ae());
  }
  function Me() {
    X.value || (T.value ? e.filterable ? Ve() : O() : pe());
  }
  function Ie(g) {
    var R, W;
    !((W = (R = q.value) === null || R === void 0 ? void 0 : R.selfRef) === null || W === void 0) && W.contains(g.relatedTarget) || (y.value = false, A(g), O());
  }
  function ie(g) {
    m(g), y.value = true;
  }
  function be() {
    y.value = true;
  }
  function Pe(g) {
    var R;
    !((R = _.value) === null || R === void 0) && R.$el.contains(g.relatedTarget) || (y.value = false, A(g), O());
  }
  function we() {
    var g;
    (g = _.value) === null || g === void 0 || g.focus(), O();
  }
  function _e(g) {
    var R;
    T.value && (!((R = _.value) === null || R === void 0) && R.$el.contains(ir(g)) || O());
  }
  function De(g) {
    if (!Array.isArray(g)) return [];
    if (p.value) return Array.from(g);
    {
      const { remote: R } = e, { value: W } = M;
      if (R) {
        const { value: se } = E;
        return g.filter((V) => W.has(V) || se.has(V));
      } else return g.filter((se) => W.has(se));
    }
  }
  function Oe(g) {
    $(g.rawNode);
  }
  function $(g) {
    if (X.value) return;
    const { tag: R, remote: W, clearFilterAfterSelect: se, valueField: V } = e;
    if (R && !W) {
      const { value: J } = d, re = J[0] || null;
      if (re) {
        const fe = v.value;
        fe.length ? fe.push(re) : v.value = [re], d.value = ne;
      }
    }
    if (W && E.value.set(g[V], g), e.multiple) {
      const J = De(s.value), re = J.findIndex((fe) => fe === g[V]);
      if (~re) {
        if (J.splice(re, 1), R && !W) {
          const fe = j(g[V]);
          ~fe && (v.value.splice(fe, 1), se && (b.value = ""));
        }
      } else J.push(g[V]), se && (b.value = "");
      P(J, S(J));
    } else {
      if (R && !W) {
        const J = j(g[V]);
        ~J ? v.value = [v.value[J]] : v.value = ne;
      }
      Fe(), O(), P(g[V], g);
    }
  }
  function j(g) {
    return v.value.findIndex((W) => W[e.valueField] === g);
  }
  function Ce(g) {
    T.value || pe();
    const { value: R } = g.target;
    b.value = R;
    const { tag: W, remote: se } = e;
    if (F(R), W && !se) {
      if (!R) {
        d.value = ne;
        return;
      }
      const { onCreate: V } = e, J = V ? V(R) : { [e.labelField]: R, [e.valueField]: R }, { valueField: re, labelField: fe } = e;
      C.value.some((Se) => Se[re] === J[re] || Se[fe] === J[fe]) || v.value.some((Se) => Se[re] === J[re] || Se[fe] === J[fe]) ? d.value = ne : d.value = [J];
    }
  }
  function Ge(g) {
    g.stopPropagation();
    const { multiple: R, tag: W, remote: se, clearCreatedOptionsOnClear: V } = e;
    !R && e.filterable && O(), W && !se && V && (v.value = ne), G(), R ? P([], []) : P(null, null);
  }
  function Be(g) {
    !at(g, "action") && !at(g, "empty") && !at(g, "header") && g.preventDefault();
  }
  function Te(g) {
    de(g);
  }
  function Ue(g) {
    var R, W, se, V, J;
    if (!e.keyboard) {
      g.preventDefault();
      return;
    }
    switch (g.key) {
      case " ":
        if (e.filterable) break;
        g.preventDefault();
      case "Enter":
        if (!(!((R = _.value) === null || R === void 0) && R.isComposing)) {
          if (T.value) {
            const re = (W = q.value) === null || W === void 0 ? void 0 : W.getPendingTmNode();
            re ? Oe(re) : e.filterable || (O(), Fe());
          } else if (pe(), e.tag && xe.value) {
            const re = d.value[0];
            if (re) {
              const fe = re[e.valueField], { value: Se } = s;
              e.multiple && Array.isArray(Se) && Se.includes(fe) || $(re);
            }
          }
        }
        g.preventDefault();
        break;
      case "ArrowUp":
        if (g.preventDefault(), e.loading) return;
        T.value && ((se = q.value) === null || se === void 0 || se.prev());
        break;
      case "ArrowDown":
        if (g.preventDefault(), e.loading) return;
        T.value ? (V = q.value) === null || V === void 0 || V.next() : pe();
        break;
      case "Escape":
        T.value && (_r(g), O()), (J = _.value) === null || J === void 0 || J.focus();
        break;
    }
  }
  function Fe() {
    var g;
    (g = _.value) === null || g === void 0 || g.focus();
  }
  function Ve() {
    var g;
    (g = _.value) === null || g === void 0 || g.focusInput();
  }
  function We() {
    var g;
    T.value && ((g = I.value) === null || g === void 0 || g.syncPosition());
  }
  me(), it(ce(e, "options"), me);
  const Ke = { focus: () => {
    var g;
    (g = _.value) === null || g === void 0 || g.focus();
  }, focusInput: () => {
    var g;
    (g = _.value) === null || g === void 0 || g.focusInput();
  }, blur: () => {
    var g;
    (g = _.value) === null || g === void 0 || g.blur();
  }, blurInput: () => {
    var g;
    (g = _.value) === null || g === void 0 || g.blurInput();
  } }, Y = k(() => {
    const { self: { menuBoxShadow: g } } = f.value;
    return { "--n-menu-box-shadow": g };
  }), ue = l ? et("select", void 0, Y, e) : void 0;
  return Object.assign(Object.assign({}, Ke), { mergedStatus: Z, mergedClsPrefix: t, mergedBordered: o, namespace: n, treeMate: w, isMounted: ar(), triggerRef: _, menuRef: q, pattern: b, uncontrolledShow: B, mergedShow: T, adjustedTo: It(e), uncontrolledValue: a, mergedValue: s, followerRef: I, localizedPlaceholder: le, selectedOption: H, selectedOptions: L, mergedSize: K, mergedDisabled: X, focused: y, activeWithoutMenuOpen: xe, inlineThemeDisabled: l, onTriggerInputFocus: ye, onTriggerInputBlur: ze, handleTriggerOrMenuResize: We, handleMenuFocus: be, handleMenuBlur: Pe, handleMenuTabOut: we, handleTriggerClick: Me, handleToggle: Oe, handleDeleteOption: $, handlePatternInput: Ce, handleClear: Ge, handleTriggerBlur: Ie, handleTriggerFocus: ie, handleKeydown: Ue, handleMenuAfterLeave: ae, handleMenuClickOutside: _e, handleMenuScroll: Te, handleMenuKeydown: Ue, handleMenuMousedown: Be, mergedTheme: f, cssVars: l ? void 0 : Y, themeClass: ue == null ? void 0 : ue.themeClass, onRender: ue == null ? void 0 : ue.onRender });
}, render() {
  return r("div", { class: `${this.mergedClsPrefix}-select` }, r(xr, null, { default: () => [r(Cr, null, { default: () => r(Qr, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, ellipsisTagPopoverProps: this.ellipsisTagPopoverProps, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, { arrow: () => {
    var e, t;
    return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
  } }) }), r(wr, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === It.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, { default: () => r(co, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, { default: () => {
    var e, t, o;
    return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), nr(r(fn, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (t = this.menuProps) === null || t === void 0 ? void 0 : t.class], clsPrefix: this.mergedClsPrefix, focusable: true, labelField: this.labelField, valueField: this.valueField, autoPending: true, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: this.menuSize, renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(o = this.menuProps) === null || o === void 0 ? void 0 : o.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange, scrollbarProps: this.scrollbarProps }), { empty: () => {
      var n, l;
      return [(l = (n = this.$slots).empty) === null || l === void 0 ? void 0 : l.call(n)];
    }, header: () => {
      var n, l;
      return [(l = (n = this.$slots).header) === null || l === void 0 ? void 0 : l.call(n)];
    }, action: () => {
      var n, l;
      return [(l = (n = this.$slots).action) === null || l === void 0 ? void 0 : l.call(n)];
    } }), this.displayDirective === "show" ? [[rr, this.mergedShow], [Po, this.handleMenuClickOutside, void 0, { capture: true }]] : [[Po, this.handleMenuClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), Ho = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, jo = [U("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], gl = z("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [z("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), z("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), Q("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), z("select", `
 width: var(--n-select-width);
 `), Q("&.transition-disabled", [z("pagination-item", "transition: none!important;")]), z("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [z("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), z("pagination-item", `
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
 `, [U("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [z("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), je("disabled", [U("hover", Ho, jo), Q("&:hover", Ho, jo), Q("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [U("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), U("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [Q("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), U("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [U("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), U("disabled", `
 cursor: not-allowed;
 `, [z("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), U("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [z("pagination-quick-jumper", [z("input", `
 margin: 0;
 `)])])]);
function pn(e) {
  var t;
  if (!e) return 10;
  const { defaultPageSize: o } = e;
  if (o !== void 0) return o;
  const n = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof n == "number" ? n : (n == null ? void 0 : n.value) || 10;
}
function bl(e, t, o, n) {
  let l = false, i = false, f = 1, a = t;
  if (t === 1) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: a, fastBackwardTo: f, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }] };
  if (t === 2) return { hasFastBackward: false, hasFastForward: false, fastForwardTo: a, fastBackwardTo: f, items: [{ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }, { type: "page", label: 2, active: e === 2, mayBeFastBackward: true, mayBeFastForward: false }] };
  const c = 1, s = t;
  let y = e, b = e;
  const C = (o - 5) / 2;
  b += Math.ceil(C), b = Math.min(Math.max(b, c + o - 3), s - 2), y -= Math.floor(C), y = Math.max(Math.min(y, s - o + 3), c + 2);
  let v = false, d = false;
  y > c + 2 && (v = true), b < s - 2 && (d = true);
  const u = [];
  u.push({ type: "page", label: 1, active: e === 1, mayBeFastBackward: false, mayBeFastForward: false }), v ? (l = true, f = y - 1, u.push({ type: "fast-backward", active: false, label: void 0, options: n ? Ko(c + 1, y - 1) : null })) : s >= c + 1 && u.push({ type: "page", label: c + 1, mayBeFastBackward: true, mayBeFastForward: false, active: e === c + 1 });
  for (let h = y; h <= b; ++h) u.push({ type: "page", label: h, mayBeFastBackward: false, mayBeFastForward: false, active: e === h });
  return d ? (i = true, a = b + 1, u.push({ type: "fast-forward", active: false, label: void 0, options: n ? Ko(b + 1, s - 1) : null })) : b === s - 2 && u[u.length - 1].label !== s - 1 && u.push({ type: "page", mayBeFastForward: true, mayBeFastBackward: false, label: s - 1, active: e === s - 1 }), u[u.length - 1].label !== s && u.push({ type: "page", mayBeFastForward: false, mayBeFastBackward: false, label: s, active: e === s }), { hasFastBackward: l, hasFastForward: i, fastBackwardTo: f, fastForwardTo: a, items: u };
}
function Ko(e, t) {
  const o = [];
  for (let n = e; n <= t; ++n) o.push({ label: `${n}`, value: n });
  return o;
}
const pl = Object.assign(Object.assign({}, ke.props), { simple: Boolean, page: Number, defaultPage: { type: Number, default: 1 }, itemCount: Number, pageCount: Number, defaultPageCount: { type: Number, default: 1 }, showSizePicker: Boolean, pageSize: Number, defaultPageSize: Number, pageSizes: { type: Array, default() {
  return [10];
} }, showQuickJumper: Boolean, size: String, disabled: Boolean, pageSlot: { type: Number, default: 9 }, selectProps: Object, prev: Function, next: Function, goto: Function, prefix: Function, suffix: Function, label: Function, displayOrder: { type: Array, default: ["pages", "size-picker", "quick-jumper"] }, to: It.propTo, showQuickJumpDropdown: { type: Boolean, default: true }, scrollbarProps: Object, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], onPageSizeChange: [Function, Array], onChange: [Function, Array] }), ml = ve({ name: "Pagination", props: pl, slots: Object, setup(e) {
  const { mergedComponentPropsRef: t, mergedClsPrefixRef: o, inlineThemeDisabled: n, mergedRtlRef: l } = Ae(e), i = k(() => {
    var O, ae;
    return e.size || ((ae = (O = t == null ? void 0 : t.value) === null || O === void 0 ? void 0 : O.Pagination) === null || ae === void 0 ? void 0 : ae.size) || "medium";
  }), f = ke("Pagination", "-pagination", gl, sr, e, o), { localeRef: a } = At("Pagination"), c = N(null), s = N(e.defaultPage), y = N(pn(e)), b = Qe(ce(e, "page"), s), C = Qe(ce(e, "pageSize"), y), v = k(() => {
    const { itemCount: O } = e;
    if (O !== void 0) return Math.max(1, Math.ceil(O / C.value));
    const { pageCount: ae } = e;
    return ae !== void 0 ? Math.max(ae, 1) : 1;
  }), d = N("");
  Ct(() => {
    e.simple, d.value = String(b.value);
  });
  const u = N(false), h = N(false), x = N(false), w = N(false), M = () => {
    e.disabled || (u.value = true, H());
  }, B = () => {
    e.disabled || (u.value = false, H());
  }, T = () => {
    h.value = true, H();
  }, _ = () => {
    h.value = false, H();
  }, I = (O) => {
    D(O);
  }, q = k(() => bl(b.value, v.value, e.pageSlot, e.showQuickJumpDropdown));
  Ct(() => {
    q.value.hasFastBackward ? q.value.hasFastForward || (u.value = false, x.value = false) : (h.value = false, w.value = false);
  });
  const te = k(() => {
    const O = a.value.selectionSuffix;
    return e.pageSizes.map((ae) => typeof ae == "number" ? { label: `${ae} / ${O}`, value: ae } : ae);
  }), le = k(() => {
    var O, ae;
    return ((ae = (O = t == null ? void 0 : t.value) === null || O === void 0 ? void 0 : O.Pagination) === null || ae === void 0 ? void 0 : ae.inputSize) || Io(i.value);
  }), ne = k(() => {
    var O, ae;
    return ((ae = (O = t == null ? void 0 : t.value) === null || O === void 0 ? void 0 : O.Pagination) === null || ae === void 0 ? void 0 : ae.selectSize) || Io(i.value);
  }), E = k(() => (b.value - 1) * C.value), p = k(() => {
    const O = b.value * C.value - 1, { itemCount: ae } = e;
    return ae !== void 0 && O > ae - 1 ? ae - 1 : O;
  }), S = k(() => {
    const { itemCount: O } = e;
    return O !== void 0 ? O : (e.pageCount || 1) * C.value;
  }), L = st("Pagination", l, o);
  function H() {
    zt(() => {
      var O;
      const { value: ae } = c;
      ae && (ae.classList.add("transition-disabled"), (O = c.value) === null || O === void 0 || O.offsetWidth, ae.classList.remove("transition-disabled"));
    });
  }
  function D(O) {
    if (O === b.value) return;
    const { "onUpdate:page": ae, onUpdatePage: xe, onChange: ye, simple: ze } = e;
    ae && oe(ae, O), xe && oe(xe, O), ye && oe(ye, O), s.value = O, ze && (d.value = String(O));
  }
  function K(O) {
    if (O === C.value) return;
    const { "onUpdate:pageSize": ae, onUpdatePageSize: xe, onPageSizeChange: ye } = e;
    ae && oe(ae, O), xe && oe(xe, O), ye && oe(ye, O), y.value = O, v.value < b.value && D(v.value);
  }
  function X() {
    if (e.disabled) return;
    const O = Math.min(b.value + 1, v.value);
    D(O);
  }
  function Z() {
    if (e.disabled) return;
    const O = Math.max(b.value - 1, 1);
    D(O);
  }
  function P() {
    if (e.disabled) return;
    const O = Math.min(q.value.fastForwardTo, v.value);
    D(O);
  }
  function A() {
    if (e.disabled) return;
    const O = Math.max(q.value.fastBackwardTo, 1);
    D(O);
  }
  function G(O) {
    K(O);
  }
  function m() {
    const O = Number.parseInt(d.value);
    Number.isNaN(O) || (D(Math.max(1, Math.min(O, v.value))), e.simple || (d.value = ""));
  }
  function F() {
    m();
  }
  function de(O) {
    if (!e.disabled) switch (O.type) {
      case "page":
        D(O.label);
        break;
      case "fast-backward":
        A();
        break;
      case "fast-forward":
        P();
        break;
    }
  }
  function me(O) {
    d.value = O.replace(/\D+/g, "");
  }
  Ct(() => {
    b.value, C.value, H();
  });
  const ge = k(() => {
    const O = i.value, { self: { buttonBorder: ae, buttonBorderHover: xe, buttonBorderPressed: ye, buttonIconColor: ze, buttonIconColorHover: Me, buttonIconColorPressed: Ie, itemTextColor: ie, itemTextColorHover: be, itemTextColorPressed: Pe, itemTextColorActive: we, itemTextColorDisabled: _e, itemColor: De, itemColorHover: Oe, itemColorPressed: $, itemColorActive: j, itemColorActiveHover: Ce, itemColorDisabled: Ge, itemBorder: Be, itemBorderHover: Te, itemBorderPressed: Ue, itemBorderActive: Fe, itemBorderDisabled: Ve, itemBorderRadius: We, jumperTextColor: Ke, jumperTextColorDisabled: Y, buttonColor: ue, buttonColorHover: g, buttonColorPressed: R, [he("itemPadding", O)]: W, [he("itemMargin", O)]: se, [he("inputWidth", O)]: V, [he("selectWidth", O)]: J, [he("inputMargin", O)]: re, [he("selectMargin", O)]: fe, [he("jumperFontSize", O)]: Se, [he("prefixMargin", O)]: ot, [he("suffixMargin", O)]: Ze, [he("itemSize", O)]: nt, [he("buttonIconSize", O)]: rt, [he("itemFontSize", O)]: ut, [`${he("itemMargin", O)}Rtl`]: ft, [`${he("inputMargin", O)}Rtl`]: lt }, common: { cubicBezierEaseInOut: dt } } = f.value;
    return { "--n-prefix-margin": ot, "--n-suffix-margin": Ze, "--n-item-font-size": ut, "--n-select-width": J, "--n-select-margin": fe, "--n-input-width": V, "--n-input-margin": re, "--n-input-margin-rtl": lt, "--n-item-size": nt, "--n-item-text-color": ie, "--n-item-text-color-disabled": _e, "--n-item-text-color-hover": be, "--n-item-text-color-active": we, "--n-item-text-color-pressed": Pe, "--n-item-color": De, "--n-item-color-hover": Oe, "--n-item-color-disabled": Ge, "--n-item-color-active": j, "--n-item-color-active-hover": Ce, "--n-item-color-pressed": $, "--n-item-border": Be, "--n-item-border-hover": Te, "--n-item-border-disabled": Ve, "--n-item-border-active": Fe, "--n-item-border-pressed": Ue, "--n-item-padding": W, "--n-item-border-radius": We, "--n-bezier": dt, "--n-jumper-font-size": Se, "--n-jumper-text-color": Ke, "--n-jumper-text-color-disabled": Y, "--n-item-margin": se, "--n-item-margin-rtl": ft, "--n-button-icon-size": rt, "--n-button-icon-color": ze, "--n-button-icon-color-hover": Me, "--n-button-icon-color-pressed": Ie, "--n-button-color-hover": g, "--n-button-color": ue, "--n-button-color-pressed": R, "--n-button-border": ae, "--n-button-border-hover": xe, "--n-button-border-pressed": ye };
  }), pe = n ? et("pagination", k(() => {
    let O = "";
    return O += i.value[0], O;
  }), ge, e) : void 0;
  return { rtlEnabled: L, mergedClsPrefix: o, locale: a, selfRef: c, mergedPage: b, pageItems: k(() => q.value.items), mergedItemCount: S, jumperValue: d, pageSizeOptions: te, mergedPageSize: C, inputSize: le, selectSize: ne, mergedTheme: f, mergedPageCount: v, startIndex: E, endIndex: p, showFastForwardMenu: x, showFastBackwardMenu: w, fastForwardActive: u, fastBackwardActive: h, handleMenuSelect: I, handleFastForwardMouseenter: M, handleFastForwardMouseleave: B, handleFastBackwardMouseenter: T, handleFastBackwardMouseleave: _, handleJumperInput: me, handleBackwardClick: Z, handleForwardClick: X, handlePageItemClick: de, handleSizePickerChange: G, handleQuickJumperChange: F, cssVars: n ? void 0 : ge, themeClass: pe == null ? void 0 : pe.themeClass, onRender: pe == null ? void 0 : pe.onRender };
}, render() {
  const { $slots: e, mergedClsPrefix: t, disabled: o, cssVars: n, mergedPage: l, mergedPageCount: i, pageItems: f, showSizePicker: a, showQuickJumper: c, mergedTheme: s, locale: y, inputSize: b, selectSize: C, mergedPageSize: v, pageSizeOptions: d, jumperValue: u, simple: h, prev: x, next: w, prefix: M, suffix: B, label: T, goto: _, handleJumperInput: I, handleSizePickerChange: q, handleBackwardClick: te, handlePageItemClick: le, handleForwardClick: ne, handleQuickJumperChange: E, onRender: p } = this;
  p == null ? void 0 : p();
  const S = M || e.prefix, L = B || e.suffix, H = x || e.prev, D = w || e.next, K = T || e.label;
  return r("div", { ref: "selfRef", class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, o && `${t}-pagination--disabled`, h && `${t}-pagination--simple`], style: n }, S ? r("div", { class: `${t}-pagination-prefix` }, S({ page: l, pageSize: v, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null, this.displayOrder.map((X) => {
    switch (X) {
      case "pages":
        return r(wt, null, r("div", { class: [`${t}-pagination-item`, !H && `${t}-pagination-item--button`, (l <= 1 || l > i || o) && `${t}-pagination-item--disabled`], onClick: te }, H ? H({ page: l, pageSize: v, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount }) : r(qe, { clsPrefix: t }, { default: () => this.rtlEnabled ? r(Ao, null) : r(_o, null) })), h ? r(wt, null, r("div", { class: `${t}-pagination-quick-jumper` }, r(Fo, { value: u, onUpdateValue: I, size: b, placeholder: "", disabled: o, theme: s.peers.Input, themeOverrides: s.peerOverrides.Input, onChange: E })), "\xA0/", " ", i) : f.map((Z, P) => {
          let A, G, m;
          const { type: F } = Z;
          switch (F) {
            case "page":
              const me = Z.label;
              K ? A = K({ type: "page", node: me, active: Z.active }) : A = me;
              break;
            case "fast-forward":
              const ge = this.fastForwardActive ? r(qe, { clsPrefix: t }, { default: () => this.rtlEnabled ? r($o, null) : r(Eo, null) }) : r(qe, { clsPrefix: t }, { default: () => r(Lo, null) });
              K ? A = K({ type: "fast-forward", node: ge, active: this.fastForwardActive || this.showFastForwardMenu }) : A = ge, G = this.handleFastForwardMouseenter, m = this.handleFastForwardMouseleave;
              break;
            case "fast-backward":
              const pe = this.fastBackwardActive ? r(qe, { clsPrefix: t }, { default: () => this.rtlEnabled ? r(Eo, null) : r($o, null) }) : r(qe, { clsPrefix: t }, { default: () => r(Lo, null) });
              K ? A = K({ type: "fast-backward", node: pe, active: this.fastBackwardActive || this.showFastBackwardMenu }) : A = pe, G = this.handleFastBackwardMouseenter, m = this.handleFastBackwardMouseleave;
              break;
          }
          const de = r("div", { key: P, class: [`${t}-pagination-item`, Z.active && `${t}-pagination-item--active`, F !== "page" && (F === "fast-backward" && this.showFastBackwardMenu || F === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, o && `${t}-pagination-item--disabled`, F === "page" && `${t}-pagination-item--clickable`], onClick: () => {
            le(Z);
          }, onMouseenter: G, onMouseleave: m }, A);
          if (F === "page" && !Z.mayBeFastBackward && !Z.mayBeFastForward) return de;
          {
            const me = Z.type === "page" ? Z.mayBeFastBackward ? "fast-backward" : "fast-forward" : Z.type;
            return Z.type !== "page" && !Z.options ? de : r(ul, { to: this.to, key: me, disabled: o, trigger: "hover", virtualScroll: true, style: { width: "60px" }, theme: s.peers.Popselect, themeOverrides: s.peerOverrides.Popselect, builtinThemeOverrides: { peers: { InternalSelectMenu: { height: "calc(var(--n-option-height) * 4.6)" } } }, nodeProps: () => ({ style: { justifyContent: "center" } }), show: F === "page" ? false : F === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu, onUpdateShow: (ge) => {
              F !== "page" && (ge ? F === "fast-backward" ? this.showFastBackwardMenu = ge : this.showFastForwardMenu = ge : (this.showFastBackwardMenu = false, this.showFastForwardMenu = false));
            }, options: Z.type !== "page" && Z.options ? Z.options : [], onUpdateValue: this.handleMenuSelect, scrollable: true, scrollbarProps: this.scrollbarProps, showCheckmark: false }, { default: () => de });
          }
        }), r("div", { class: [`${t}-pagination-item`, !D && `${t}-pagination-item--button`, { [`${t}-pagination-item--disabled`]: l < 1 || l >= i || o }], onClick: ne }, D ? D({ page: l, pageSize: v, pageCount: i, itemCount: this.mergedItemCount, startIndex: this.startIndex, endIndex: this.endIndex }) : r(qe, { clsPrefix: t }, { default: () => this.rtlEnabled ? r(_o, null) : r(Ao, null) })));
      case "size-picker":
        return !h && a ? r(vl, Object.assign({ consistentMenuWidth: false, placeholder: "", showCheckmark: false, to: this.to }, this.selectProps, { size: C, options: d, value: v, disabled: o, scrollbarProps: this.scrollbarProps, theme: s.peers.Select, themeOverrides: s.peerOverrides.Select, onUpdateValue: q })) : null;
      case "quick-jumper":
        return !h && c ? r("div", { class: `${t}-pagination-quick-jumper` }, _ ? _() : Et(this.$slots.goto, () => [y.goto]), r(Fo, { value: u, onUpdateValue: I, size: b, placeholder: "", disabled: o, theme: s.peers.Input, themeOverrides: s.peerOverrides.Input, onChange: E })) : null;
      default:
        return null;
    }
  }), L ? r("div", { class: `${t}-pagination-suffix` }, L({ page: l, pageSize: v, pageCount: i, startIndex: this.startIndex, endIndex: this.endIndex, itemCount: this.mergedItemCount })) : null);
} }), yl = Object.assign(Object.assign({}, ke.props), { onUnstableColumnResize: Function, pagination: { type: [Object, Boolean], default: false }, paginateSinglePage: { type: Boolean, default: true }, minHeight: [Number, String], maxHeight: [Number, String], columns: { type: Array, default: () => [] }, rowClassName: [String, Function], rowProps: Function, rowKey: Function, summary: [Function], data: { type: Array, default: () => [] }, loading: Boolean, bordered: { type: Boolean, default: void 0 }, bottomBordered: { type: Boolean, default: void 0 }, striped: Boolean, scrollX: [Number, String], defaultCheckedRowKeys: { type: Array, default: () => [] }, checkedRowKeys: Array, singleLine: { type: Boolean, default: true }, singleColumn: Boolean, size: String, remote: Boolean, defaultExpandedRowKeys: { type: Array, default: [] }, defaultExpandAll: Boolean, expandedRowKeys: Array, stickyExpandedRows: Boolean, virtualScroll: Boolean, virtualScrollX: Boolean, virtualScrollHeader: Boolean, headerHeight: { type: Number, default: 28 }, heightForRow: Function, minRowHeight: { type: Number, default: 28 }, tableLayout: { type: String, default: "auto" }, allowCheckingNotLoaded: Boolean, cascade: { type: Boolean, default: true }, childrenKey: { type: String, default: "children" }, indent: { type: Number, default: 16 }, flexHeight: Boolean, summaryPlacement: { type: String, default: "bottom" }, paginationBehaviorOnFilter: { type: String, default: "current" }, filterIconPopoverProps: Object, scrollbarProps: Object, renderCell: Function, renderExpandIcon: Function, spinProps: Object, getCsvCell: Function, getCsvHeader: Function, onLoad: Function, "onUpdate:page": [Function, Array], onUpdatePage: [Function, Array], "onUpdate:pageSize": [Function, Array], onUpdatePageSize: [Function, Array], "onUpdate:sorter": [Function, Array], onUpdateSorter: [Function, Array], "onUpdate:filters": [Function, Array], onUpdateFilters: [Function, Array], "onUpdate:checkedRowKeys": [Function, Array], onUpdateCheckedRowKeys: [Function, Array], "onUpdate:expandedRowKeys": [Function, Array], onUpdateExpandedRowKeys: [Function, Array], onScroll: Function, onPageChange: [Function, Array], onPageSizeChange: [Function, Array], onSorterChange: [Function, Array], onFiltersChange: [Function, Array], onCheckedRowKeysChange: [Function, Array] }), tt = Pt("n-data-table"), mn = 40, yn = 40;
function Vo(e) {
  if (e.type === "selection") return e.width === void 0 ? mn : yt(e.width);
  if (e.type === "expand") return e.width === void 0 ? yn : yt(e.width);
  if (!("children" in e)) return typeof e.width == "string" ? yt(e.width) : e.width;
}
function xl(e) {
  var t, o;
  if (e.type === "selection") return Xe((t = e.width) !== null && t !== void 0 ? t : mn);
  if (e.type === "expand") return Xe((o = e.width) !== null && o !== void 0 ? o : yn);
  if (!("children" in e)) return Xe(e.width);
}
function Je(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function Wo(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function Cl(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function wl(e, t, o) {
  return o !== void 0 && (e = Math.min(e, typeof o == "number" ? o : Number.parseFloat(o))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function Rl(e, t) {
  if (t !== void 0) return { width: t, minWidth: t, maxWidth: t };
  const o = xl(e), { minWidth: n, maxWidth: l } = e;
  return { width: o, minWidth: Xe(n) || o, maxWidth: Xe(l) };
}
function kl(e, t, o) {
  return typeof o == "function" ? o(e, t) : o || "";
}
function eo(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function to(e) {
  return "children" in e ? false : !!e.sorter;
}
function xn(e) {
  return "children" in e && e.children.length ? false : !!e.resizable;
}
function qo(e) {
  return "children" in e ? false : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function Xo(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return false;
}
function Sl(e, t) {
  if (e.sorter === void 0) return null;
  const { customNextSortOrder: o } = e;
  return t === null || t.columnKey !== e.key ? { columnKey: e.key, sorter: e.sorter, order: Xo(false) } : Object.assign(Object.assign({}, t), { order: (o || Xo)(t.order) });
}
function Cn(e, t) {
  return t.find((o) => o.columnKey === e.key && o.order) !== void 0;
}
function zl(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function Pl(e, t, o, n) {
  const l = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== false), i = l.map((a) => n ? n(a) : a.title).join(","), f = t.map((a) => l.map((c) => o ? o(a[c.key], a, c) : zl(a[c.key])).join(","));
  return [i, ...f].join(`
`);
}
const Fl = ve({ name: "DataTableBodyCheckbox", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, mergedInderminateRowKeySetRef: o } = Ee(tt);
  return () => {
    const { rowKey: n } = e;
    return r(mo, { privateInsideTable: true, disabled: e.disabled, indeterminate: o.value.has(n), checked: t.value.has(n), onUpdateChecked: e.onUpdateChecked });
  };
} }), Tl = z("radio", `
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
`, [U("checked", [ee("dot", `
 background-color: var(--n-color-active);
 `)]), ee("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), z("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), ee("dot", `
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
 `, [Q("&::before", `
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
 `), U("checked", { boxShadow: "var(--n-box-shadow-active)" }, [Q("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), ee("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), je("disabled", `
 cursor: pointer;
 `, [Q("&:hover", [ee("dot", { boxShadow: "var(--n-box-shadow-hover)" })]), U("focus", [Q("&:not(:active)", [ee("dot", { boxShadow: "var(--n-box-shadow-focus)" })])])]), U("disabled", `
 cursor: not-allowed;
 `, [ee("dot", { boxShadow: "var(--n-box-shadow-disabled)", backgroundColor: "var(--n-color-disabled)" }, [Q("&::before", { backgroundColor: "var(--n-dot-color-disabled)" }), U("checked", `
 opacity: 1;
 `)]), ee("label", { color: "var(--n-text-color-disabled)" }), z("radio-input", `
 cursor: not-allowed;
 `)])]), Ol = { name: String, value: { type: [String, Number, Boolean], default: "on" }, checked: { type: Boolean, default: void 0 }, defaultChecked: Boolean, disabled: { type: Boolean, default: void 0 }, label: String, size: String, onUpdateChecked: [Function, Array], "onUpdate:checked": [Function, Array], checkedValue: { type: Boolean, default: void 0 } }, wn = Pt("n-radio-group");
function Ml(e) {
  const t = Ee(wn, null), { mergedClsPrefixRef: o, mergedComponentPropsRef: n } = Ae(e), l = Ft(e, { mergedSize(B) {
    var T, _;
    const { size: I } = e;
    if (I !== void 0) return I;
    if (t) {
      const { mergedSizeRef: { value: te } } = t;
      if (te !== void 0) return te;
    }
    if (B) return B.mergedSize.value;
    const q = (_ = (T = n == null ? void 0 : n.value) === null || T === void 0 ? void 0 : T.Radio) === null || _ === void 0 ? void 0 : _.size;
    return q || "medium";
  }, mergedDisabled(B) {
    return !!(e.disabled || (t == null ? void 0 : t.disabledRef.value) || (B == null ? void 0 : B.disabled.value));
  } }), { mergedSizeRef: i, mergedDisabledRef: f } = l, a = N(null), c = N(null), s = N(e.defaultChecked), y = ce(e, "checked"), b = Qe(y, s), C = Ne(() => t ? t.valueRef.value === e.value : b.value), v = Ne(() => {
    const { name: B } = e;
    if (B !== void 0) return B;
    if (t) return t.nameRef.value;
  }), d = N(false);
  function u() {
    if (t) {
      const { doUpdateValue: B } = t, { value: T } = e;
      oe(B, T);
    } else {
      const { onUpdateChecked: B, "onUpdate:checked": T } = e, { nTriggerFormInput: _, nTriggerFormChange: I } = l;
      B && oe(B, true), T && oe(T, true), _(), I(), s.value = true;
    }
  }
  function h() {
    f.value || C.value || u();
  }
  function x() {
    h(), a.value && (a.value.checked = C.value);
  }
  function w() {
    d.value = false;
  }
  function M() {
    d.value = true;
  }
  return { mergedClsPrefix: t ? t.mergedClsPrefixRef : o, inputRef: a, labelRef: c, mergedName: v, mergedDisabled: f, renderSafeChecked: C, focus: d, mergedSize: i, handleRadioInputChange: x, handleRadioInputBlur: w, handleRadioInputFocus: M };
}
const Bl = Object.assign(Object.assign({}, ke.props), Ol), Rn = ve({ name: "Radio", props: Bl, setup(e) {
  const t = Ml(e), o = ke("Radio", "-radio", Tl, rn, e, t.mergedClsPrefix), n = k(() => {
    const { mergedSize: { value: s } } = t, { common: { cubicBezierEaseInOut: y }, self: { boxShadow: b, boxShadowActive: C, boxShadowDisabled: v, boxShadowFocus: d, boxShadowHover: u, color: h, colorDisabled: x, colorActive: w, textColor: M, textColorDisabled: B, dotColorActive: T, dotColorDisabled: _, labelPadding: I, labelLineHeight: q, labelFontWeight: te, [he("fontSize", s)]: le, [he("radioSize", s)]: ne } } = o.value;
    return { "--n-bezier": y, "--n-label-line-height": q, "--n-label-font-weight": te, "--n-box-shadow": b, "--n-box-shadow-active": C, "--n-box-shadow-disabled": v, "--n-box-shadow-focus": d, "--n-box-shadow-hover": u, "--n-color": h, "--n-color-active": w, "--n-color-disabled": x, "--n-dot-color-active": T, "--n-dot-color-disabled": _, "--n-font-size": le, "--n-radio-size": ne, "--n-text-color": M, "--n-text-color-disabled": B, "--n-label-padding": I };
  }), { inlineThemeDisabled: l, mergedClsPrefixRef: i, mergedRtlRef: f } = Ae(e), a = st("Radio", f, i), c = l ? et("radio", k(() => t.mergedSize.value[0]), n, e) : void 0;
  return Object.assign(t, { rtlEnabled: a, cssVars: l ? void 0 : n, themeClass: c == null ? void 0 : c.themeClass, onRender: c == null ? void 0 : c.onRender });
}, render() {
  const { $slots: e, mergedClsPrefix: t, onRender: o, label: n } = this;
  return o == null ? void 0 : o(), r("label", { class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`], style: this.cssVars }, r("div", { class: `${t}-radio__dot-wrapper` }, "\xA0", r("div", { class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`] }), r("input", { ref: "inputRef", type: "radio", class: `${t}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur })), Rt(e.default, (l) => !l && !n ? null : r("div", { ref: "labelRef", class: `${t}-radio__label` }, l || n)));
} }), Il = z("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [ee("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [U("checked", { backgroundColor: "var(--n-button-border-color-active)" }), U("disabled", { opacity: "var(--n-opacity-disabled)" })]), U("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [z("radio-button", { height: "var(--n-height)", lineHeight: "var(--n-height)" }), ee("splitor", { height: "var(--n-height)" })]), z("radio-button", `
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
 `, [z("radio-input", `
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
 `), ee("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), Q("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [ee("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), Q("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [ee("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), je("disabled", `
 cursor: pointer;
 `, [Q("&:hover", [ee("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), je("checked", { color: "var(--n-button-text-color-hover)" })]), U("focus", [Q("&:not(:active)", [ee("state-border", { boxShadow: "var(--n-button-box-shadow-focus)" })])])]), U("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), U("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function _l(e, t, o) {
  var n;
  const l = [];
  let i = false;
  for (let f = 0; f < e.length; ++f) {
    const a = e[f], c = (n = a.type) === null || n === void 0 ? void 0 : n.name;
    c === "RadioButton" && (i = true);
    const s = a.props;
    if (c !== "RadioButton") {
      l.push(a);
      continue;
    }
    if (f === 0) l.push(a);
    else {
      const y = l[l.length - 1].props, b = t === y.value, C = y.disabled, v = t === s.value, d = s.disabled, u = (b ? 2 : 0) + (C ? 0 : 1), h = (v ? 2 : 0) + (d ? 0 : 1), x = { [`${o}-radio-group__splitor--disabled`]: C, [`${o}-radio-group__splitor--checked`]: b }, w = { [`${o}-radio-group__splitor--disabled`]: d, [`${o}-radio-group__splitor--checked`]: v }, M = u < h ? w : x;
      l.push(r("div", { class: [`${o}-radio-group__splitor`, M] }), a);
    }
  }
  return { children: l, isButtonGroup: i };
}
const $l = Object.assign(Object.assign({}, ke.props), { name: String, value: [String, Number, Boolean], defaultValue: { type: [String, Number, Boolean], default: null }, size: String, disabled: { type: Boolean, default: void 0 }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), El = ve({ name: "RadioGroup", props: $l, setup(e) {
  const t = N(null), { mergedSizeRef: o, mergedDisabledRef: n, nTriggerFormChange: l, nTriggerFormInput: i, nTriggerFormBlur: f, nTriggerFormFocus: a } = Ft(e), { mergedClsPrefixRef: c, inlineThemeDisabled: s, mergedRtlRef: y } = Ae(e), b = ke("Radio", "-radio-group", Il, rn, e, c), C = N(e.defaultValue), v = ce(e, "value"), d = Qe(v, C);
  function u(T) {
    const { onUpdateValue: _, "onUpdate:value": I } = e;
    _ && oe(_, T), I && oe(I, T), C.value = T, l(), i();
  }
  function h(T) {
    const { value: _ } = t;
    _ && (_.contains(T.relatedTarget) || a());
  }
  function x(T) {
    const { value: _ } = t;
    _ && (_.contains(T.relatedTarget) || f());
  }
  ct(wn, { mergedClsPrefixRef: c, nameRef: ce(e, "name"), valueRef: d, disabledRef: n, mergedSizeRef: o, doUpdateValue: u });
  const w = st("Radio", y, c), M = k(() => {
    const { value: T } = o, { common: { cubicBezierEaseInOut: _ }, self: { buttonBorderColor: I, buttonBorderColorActive: q, buttonBorderRadius: te, buttonBoxShadow: le, buttonBoxShadowFocus: ne, buttonBoxShadowHover: E, buttonColor: p, buttonColorActive: S, buttonTextColor: L, buttonTextColorActive: H, buttonTextColorHover: D, opacityDisabled: K, [he("buttonHeight", T)]: X, [he("fontSize", T)]: Z } } = b.value;
    return { "--n-font-size": Z, "--n-bezier": _, "--n-button-border-color": I, "--n-button-border-color-active": q, "--n-button-border-radius": te, "--n-button-box-shadow": le, "--n-button-box-shadow-focus": ne, "--n-button-box-shadow-hover": E, "--n-button-color": p, "--n-button-color-active": S, "--n-button-text-color": L, "--n-button-text-color-hover": D, "--n-button-text-color-active": H, "--n-height": X, "--n-opacity-disabled": K };
  }), B = s ? et("radio-group", k(() => o.value[0]), M, e) : void 0;
  return { selfElRef: t, rtlEnabled: w, mergedClsPrefix: c, mergedValue: d, handleFocusout: x, handleFocusin: h, cssVars: s ? void 0 : M, themeClass: B == null ? void 0 : B.themeClass, onRender: B == null ? void 0 : B.onRender };
}, render() {
  var e;
  const { mergedValue: t, mergedClsPrefix: o, handleFocusin: n, handleFocusout: l } = this, { children: i, isButtonGroup: f } = _l(Rr(Er(this)), t, o);
  return (e = this.onRender) === null || e === void 0 || e.call(this), r("div", { onFocusin: n, onFocusout: l, ref: "selfElRef", class: [`${o}-radio-group`, this.rtlEnabled && `${o}-radio-group--rtl`, this.themeClass, f && `${o}-radio-group--button-group`], style: this.cssVars }, i);
} }), Al = ve({ name: "DataTableBodyRadio", props: { rowKey: { type: [String, Number], required: true }, disabled: { type: Boolean, required: true }, onUpdateChecked: { type: Function, required: true } }, setup(e) {
  const { mergedCheckedRowKeySetRef: t, componentId: o } = Ee(tt);
  return () => {
    const { rowKey: n } = e;
    return r(Rn, { name: o, disabled: e.disabled, checked: t.value.has(n), onUpdateChecked: e.onUpdateChecked });
  };
} }), kn = z("ellipsis", { overflow: "hidden" }, [je("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), U("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), U("cursor-pointer", `
 cursor: pointer;
 `)]);
function ao(e) {
  return `${e}-ellipsis--line-clamp`;
}
function io(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Sn = Object.assign(Object.assign({}, ke.props), { expandTrigger: String, lineClamp: [Number, String], tooltip: { type: [Boolean, Object], default: true } }), xo = ve({ name: "Ellipsis", inheritAttrs: false, props: Sn, slots: Object, setup(e, { slots: t, attrs: o }) {
  const n = ln(), l = ke("Ellipsis", "-ellipsis", kn, dr, e, n), i = N(null), f = N(null), a = N(null), c = N(false), s = k(() => {
    const { lineClamp: h } = e, { value: x } = c;
    return h !== void 0 ? { textOverflow: "", "-webkit-line-clamp": x ? "" : h } : { textOverflow: x ? "" : "ellipsis", "-webkit-line-clamp": "" };
  });
  function y() {
    let h = false;
    const { value: x } = c;
    if (x) return true;
    const { value: w } = i;
    if (w) {
      const { lineClamp: M } = e;
      if (v(w), M !== void 0) h = w.scrollHeight <= w.offsetHeight;
      else {
        const { value: B } = f;
        B && (h = B.getBoundingClientRect().width <= w.getBoundingClientRect().width);
      }
      d(w, h);
    }
    return h;
  }
  const b = k(() => e.expandTrigger === "click" ? () => {
    var h;
    const { value: x } = c;
    x && ((h = a.value) === null || h === void 0 || h.setShow(false)), c.value = !x;
  } : void 0);
  Yo(() => {
    var h;
    e.tooltip && ((h = a.value) === null || h === void 0 || h.setShow(false));
  });
  const C = () => r("span", Object.assign({}, Bt(o, { class: [`${n.value}-ellipsis`, e.lineClamp !== void 0 ? ao(n.value) : void 0, e.expandTrigger === "click" ? io(n.value, "pointer") : void 0], style: s.value }), { ref: "triggerRef", onClick: b.value, onMouseenter: e.expandTrigger === "click" ? y : void 0 }), e.lineClamp ? t : r("span", { ref: "triggerInnerRef" }, t));
  function v(h) {
    if (!h) return;
    const x = s.value, w = ao(n.value);
    e.lineClamp !== void 0 ? u(h, w, "add") : u(h, w, "remove");
    for (const M in x) h.style[M] !== x[M] && (h.style[M] = x[M]);
  }
  function d(h, x) {
    const w = io(n.value, "pointer");
    e.expandTrigger === "click" && !x ? u(h, w, "add") : u(h, w, "remove");
  }
  function u(h, x, w) {
    w === "add" ? h.classList.contains(x) || h.classList.add(x) : h.classList.contains(x) && h.classList.remove(x);
  }
  return { mergedTheme: l, triggerRef: i, triggerInnerRef: f, tooltipRef: a, handleClick: b, renderTrigger: C, getTooltipDisabled: y };
}, render() {
  var e;
  const { tooltip: t, renderTrigger: o, $slots: n } = this;
  if (t) {
    const { mergedTheme: l } = this;
    return r(kr, Object.assign({ ref: "tooltipRef", placement: "top" }, t, { getDisabled: this.getTooltipDisabled, theme: l.peers.Tooltip, themeOverrides: l.peerOverrides.Tooltip }), { trigger: o, default: (e = n.tooltip) !== null && e !== void 0 ? e : n.default });
  } else return o();
} }), Ll = ve({ name: "PerformantEllipsis", props: Sn, inheritAttrs: false, setup(e, { attrs: t, slots: o }) {
  const n = N(false), l = ln();
  return cr("-ellipsis", kn, l), { mouseEntered: n, renderTrigger: () => {
    const { lineClamp: f } = e, a = l.value;
    return r("span", Object.assign({}, Bt(t, { class: [`${a}-ellipsis`, f !== void 0 ? ao(a) : void 0, e.expandTrigger === "click" ? io(a, "pointer") : void 0], style: f === void 0 ? { textOverflow: "ellipsis" } : { "-webkit-line-clamp": f } }), { onMouseenter: () => {
      n.value = true;
    } }), f ? o : r("span", null, o));
  } };
}, render() {
  return this.mouseEntered ? r(xo, Bt({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
} }), Nl = ve({ name: "DataTableCell", props: { clsPrefix: { type: String, required: true }, row: { type: Object, required: true }, index: { type: Number, required: true }, column: { type: Object, required: true }, isSummary: Boolean, mergedTheme: { type: Object, required: true }, renderCell: Function }, render() {
  var e;
  const { isSummary: t, column: o, row: n, renderCell: l } = this;
  let i;
  const { render: f, key: a, ellipsis: c } = o;
  if (f && !t ? i = f(n, this.index) : t ? i = (e = n[a]) === null || e === void 0 ? void 0 : e.value : i = l ? l(Ro(n, a), n, o) : Ro(n, a), c) if (typeof c == "object") {
    const { mergedTheme: s } = this;
    return o.ellipsisComponent === "performant-ellipsis" ? r(Ll, Object.assign({}, c, { theme: s.peers.Ellipsis, themeOverrides: s.peerOverrides.Ellipsis }), { default: () => i }) : r(xo, Object.assign({}, c, { theme: s.peers.Ellipsis, themeOverrides: s.peerOverrides.Ellipsis }), { default: () => i });
  } else return r("span", { class: `${this.clsPrefix}-data-table-td__ellipsis` }, i);
  return i;
} }), Go = ve({ name: "DataTableExpandTrigger", props: { clsPrefix: { type: String, required: true }, expanded: Boolean, loading: Boolean, onClick: { type: Function, required: true }, renderExpandIcon: { type: Function }, rowData: { type: Object, required: true } }, render() {
  const { clsPrefix: e } = this;
  return r("div", { class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`], onClick: this.onClick, onMousedown: (t) => {
    t.preventDefault();
  } }, r(en, null, { default: () => this.loading ? r(uo, { key: "loading", clsPrefix: this.clsPrefix, radius: 85, strokeWidth: 15, scale: 0.88 }) : this.renderExpandIcon ? this.renderExpandIcon({ expanded: this.expanded, rowData: this.rowData }) : r(qe, { clsPrefix: e, key: "base-icon" }, { default: () => r(Sr, null) }) }));
} }), Dl = ve({ name: "DataTableFilterMenu", props: { column: { type: Object, required: true }, radioGroupName: { type: String, required: true }, multiple: { type: Boolean, required: true }, value: { type: [Array, String, Number], default: null }, options: { type: Array, required: true }, onConfirm: { type: Function, required: true }, onClear: { type: Function, required: true }, onChange: { type: Function, required: true } }, setup(e) {
  const { mergedClsPrefixRef: t, mergedRtlRef: o } = Ae(e), n = st("DataTable", o, t), { mergedClsPrefixRef: l, mergedThemeRef: i, localeRef: f } = Ee(tt), a = N(e.value), c = k(() => {
    const { value: d } = a;
    return Array.isArray(d) ? d : null;
  }), s = k(() => {
    const { value: d } = a;
    return eo(e.column) ? Array.isArray(d) && d.length && d[0] || null : Array.isArray(d) ? null : d;
  });
  function y(d) {
    e.onChange(d);
  }
  function b(d) {
    e.multiple && Array.isArray(d) ? a.value = d : eo(e.column) && !Array.isArray(d) ? a.value = [d] : a.value = d;
  }
  function C() {
    y(a.value), e.onConfirm();
  }
  function v() {
    e.multiple || eo(e.column) ? y([]) : y(null), e.onClear();
  }
  return { mergedClsPrefix: l, rtlEnabled: n, mergedTheme: i, locale: f, checkboxGroupValue: c, radioGroupValue: s, handleChange: b, handleConfirmClick: C, handleClearClick: v };
}, render() {
  const { mergedTheme: e, locale: t, mergedClsPrefix: o } = this;
  return r("div", { class: [`${o}-data-table-filter-menu`, this.rtlEnabled && `${o}-data-table-filter-menu--rtl`] }, r(fo, null, { default: () => {
    const { checkboxGroupValue: n, handleChange: l } = this;
    return this.multiple ? r(nl, { value: n, class: `${o}-data-table-filter-menu__group`, onUpdateValue: l }, { default: () => this.options.map((i) => r(mo, { key: i.value, theme: e.peers.Checkbox, themeOverrides: e.peerOverrides.Checkbox, value: i.value }, { default: () => i.label })) }) : r(El, { name: this.radioGroupName, class: `${o}-data-table-filter-menu__group`, value: this.radioGroupValue, onUpdateValue: this.handleChange }, { default: () => this.options.map((i) => r(Rn, { key: i.value, value: i.value, theme: e.peers.Radio, themeOverrides: e.peerOverrides.Radio }, { default: () => i.label })) });
  } }), r("div", { class: `${o}-data-table-filter-menu__action` }, r(ko, { size: "tiny", theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, onClick: this.handleClearClick }, { default: () => t.clear }), r(ko, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, type: "primary", size: "tiny", onClick: this.handleConfirmClick }, { default: () => t.confirm })));
} }), Ul = ve({ name: "DataTableRenderFilter", props: { render: { type: Function, required: true }, active: { type: Boolean, default: false }, show: { type: Boolean, default: false } }, render() {
  const { render: e, active: t, show: o } = this;
  return e({ active: t, show: o });
} });
function Hl(e, t, o) {
  const n = Object.assign({}, e);
  return n[t] = o, n;
}
const jl = ve({ name: "DataTableFilterButton", props: { column: { type: Object, required: true }, options: { type: Array, default: () => [] } }, setup(e) {
  const { mergedComponentPropsRef: t } = Ae(), { mergedThemeRef: o, mergedClsPrefixRef: n, mergedFilterStateRef: l, filterMenuCssVarsRef: i, paginationBehaviorOnFilterRef: f, doUpdatePage: a, doUpdateFilters: c, filterIconPopoverPropsRef: s } = Ee(tt), y = N(false), b = l, C = k(() => e.column.filterMultiple !== false), v = k(() => {
    const M = b.value[e.column.key];
    if (M === void 0) {
      const { value: B } = C;
      return B ? [] : null;
    }
    return M;
  }), d = k(() => {
    const { value: M } = v;
    return Array.isArray(M) ? M.length > 0 : M !== null;
  }), u = k(() => {
    var M, B;
    return ((B = (M = t == null ? void 0 : t.value) === null || M === void 0 ? void 0 : M.DataTable) === null || B === void 0 ? void 0 : B.renderFilter) || e.column.renderFilter;
  });
  function h(M) {
    const B = Hl(b.value, e.column.key, M);
    c(B, e.column), f.value === "first" && a(1);
  }
  function x() {
    y.value = false;
  }
  function w() {
    y.value = false;
  }
  return { mergedTheme: o, mergedClsPrefix: n, active: d, showPopover: y, mergedRenderFilter: u, filterIconPopoverProps: s, filterMultiple: C, mergedFilterValue: v, filterMenuCssVars: i, handleFilterChange: h, handleFilterMenuConfirm: w, handleFilterMenuCancel: x };
}, render() {
  const { mergedTheme: e, mergedClsPrefix: t, handleFilterMenuCancel: o, filterIconPopoverProps: n } = this;
  return r(go, Object.assign({ show: this.showPopover, onUpdateShow: (l) => this.showPopover = l, trigger: "click", theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, placement: "bottom" }, n, { style: { padding: 0 } }), { trigger: () => {
    const { mergedRenderFilter: l } = this;
    if (l) return r(Ul, { "data-data-table-filter": true, render: l, active: this.active, show: this.showPopover });
    const { renderFilterIcon: i } = this.column;
    return r("div", { "data-data-table-filter": true, class: [`${t}-data-table-filter`, { [`${t}-data-table-filter--active`]: this.active, [`${t}-data-table-filter--show`]: this.showPopover }] }, i ? i({ active: this.active, show: this.showPopover }) : r(qe, { clsPrefix: t }, { default: () => r(Dr, null) }));
  }, default: () => {
    const { renderFilterMenu: l } = this.column;
    return l ? l({ hide: o }) : r(Dl, { style: this.filterMenuCssVars, radioGroupName: String(this.column.key), multiple: this.filterMultiple, value: this.mergedFilterValue, options: this.options, column: this.column, onChange: this.handleFilterChange, onClear: this.handleFilterMenuCancel, onConfirm: this.handleFilterMenuConfirm });
  } });
} }), Kl = ve({ name: "ColumnResizeButton", props: { onResizeStart: Function, onResize: Function, onResizeEnd: Function }, setup(e) {
  const { mergedClsPrefixRef: t } = Ee(tt), o = N(false);
  let n = 0;
  function l(c) {
    return c.clientX;
  }
  function i(c) {
    var s;
    c.preventDefault();
    const y = o.value;
    n = l(c), o.value = true, y || (ro("mousemove", window, f), ro("mouseup", window, a), (s = e.onResizeStart) === null || s === void 0 || s.call(e));
  }
  function f(c) {
    var s;
    (s = e.onResize) === null || s === void 0 || s.call(e, l(c) - n);
  }
  function a() {
    var c;
    o.value = false, (c = e.onResizeEnd) === null || c === void 0 || c.call(e), Tt("mousemove", window, f), Tt("mouseup", window, a);
  }
  return so(() => {
    Tt("mousemove", window, f), Tt("mouseup", window, a);
  }), { mergedClsPrefix: t, active: o, handleMousedown: i };
}, render() {
  const { mergedClsPrefix: e } = this;
  return r("span", { "data-data-table-resizable": true, class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`], onMousedown: this.handleMousedown });
} }), Vl = ve({ name: "DataTableRenderSorter", props: { render: { type: Function, required: true }, order: { type: [String, Boolean], default: false } }, render() {
  const { render: e, order: t } = this;
  return e({ order: t });
} }), Wl = ve({ name: "SortIcon", props: { column: { type: Object, required: true } }, setup(e) {
  const { mergedComponentPropsRef: t } = Ae(), { mergedSortStateRef: o, mergedClsPrefixRef: n } = Ee(tt), l = k(() => o.value.find((c) => c.columnKey === e.column.key)), i = k(() => l.value !== void 0), f = k(() => {
    const { value: c } = l;
    return c && i.value ? c.order : false;
  }), a = k(() => {
    var c, s;
    return ((s = (c = t == null ? void 0 : t.value) === null || c === void 0 ? void 0 : c.DataTable) === null || s === void 0 ? void 0 : s.renderSorter) || e.column.renderSorter;
  });
  return { mergedClsPrefix: n, active: i, mergedSortOrder: f, mergedRenderSorter: a };
}, render() {
  const { mergedRenderSorter: e, mergedSortOrder: t, mergedClsPrefix: o } = this, { renderSorterIcon: n } = this.column;
  return e ? r(Vl, { render: e, order: t }) : r("span", { class: [`${o}-data-table-sorter`, t === "ascend" && `${o}-data-table-sorter--asc`, t === "descend" && `${o}-data-table-sorter--desc`] }, n ? n({ order: t }) : r(qe, { clsPrefix: o }, { default: () => r(Ar, null) }));
} }), zn = "_n_all__", Pn = "_n_none__";
function ql(e, t, o, n) {
  return e ? (l) => {
    for (const i of e) switch (l) {
      case zn:
        o(true);
        return;
      case Pn:
        n(true);
        return;
      default:
        if (typeof i == "object" && i.key === l) {
          i.onSelect(t.value);
          return;
        }
    }
  } : () => {
  };
}
function Xl(e, t) {
  return e ? e.map((o) => {
    switch (o) {
      case "all":
        return { label: t.checkTableAll, key: zn };
      case "none":
        return { label: t.uncheckTableAll, key: Pn };
      default:
        return o;
    }
  }) : [];
}
const Gl = ve({ name: "DataTableSelectionMenu", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  const { props: t, localeRef: o, checkOptionsRef: n, rawPaginatedDataRef: l, doCheckAll: i, doUncheckAll: f } = Ee(tt), a = k(() => ql(n.value, l, i, f)), c = k(() => Xl(n.value, o.value));
  return () => {
    var s, y, b, C;
    const { clsPrefix: v } = e;
    return r(zr, { theme: (y = (s = t.theme) === null || s === void 0 ? void 0 : s.peers) === null || y === void 0 ? void 0 : y.Dropdown, themeOverrides: (C = (b = t.themeOverrides) === null || b === void 0 ? void 0 : b.peers) === null || C === void 0 ? void 0 : C.Dropdown, options: c.value, onSelect: a.value }, { default: () => r(qe, { clsPrefix: v, class: `${v}-data-table-check-extra` }, { default: () => r(Fr, null) }) });
  };
} });
function oo(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const Zl = ve({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, width: String }, render() {
  const { clsPrefix: e, id: t, cols: o, width: n } = this;
  return r("table", { style: { tableLayout: "fixed", width: n }, class: `${e}-data-table-table` }, r("colgroup", null, o.map((l) => r("col", { key: l.key, style: l.style }))), r("thead", { "data-n-id": t, class: `${e}-data-table-thead` }, this.$slots));
} }), Fn = ve({ name: "DataTableHeader", props: { discrete: { type: Boolean, default: true } }, setup() {
  const { mergedClsPrefixRef: e, scrollXRef: t, fixedColumnLeftMapRef: o, fixedColumnRightMapRef: n, mergedCurrentPageRef: l, allRowsCheckedRef: i, someRowsCheckedRef: f, rowsRef: a, colsRef: c, mergedThemeRef: s, checkOptionsRef: y, mergedSortStateRef: b, componentId: C, mergedTableLayoutRef: v, headerCheckboxDisabledRef: d, virtualScrollHeaderRef: u, headerHeightRef: h, onUnstableColumnResize: x, doUpdateResizableWidth: w, handleTableHeaderScroll: M, deriveNextSorter: B, doUncheckAll: T, doCheckAll: _ } = Ee(tt), I = N(), q = N({});
  function te(L) {
    const H = q.value[L];
    return H == null ? void 0 : H.getBoundingClientRect().width;
  }
  function le() {
    i.value ? T() : _();
  }
  function ne(L, H) {
    if (at(L, "dataTableFilter") || at(L, "dataTableResizable") || !to(H)) return;
    const D = b.value.find((X) => X.columnKey === H.key) || null, K = Sl(H, D);
    B(K);
  }
  const E = /* @__PURE__ */ new Map();
  function p(L) {
    E.set(L.key, te(L.key));
  }
  function S(L, H) {
    const D = E.get(L.key);
    if (D === void 0) return;
    const K = D + H, X = wl(K, L.minWidth, L.maxWidth);
    x(K, X, L, te), w(L, X);
  }
  return { cellElsRef: q, componentId: C, mergedSortState: b, mergedClsPrefix: e, scrollX: t, fixedColumnLeftMap: o, fixedColumnRightMap: n, currentPage: l, allRowsChecked: i, someRowsChecked: f, rows: a, cols: c, mergedTheme: s, checkOptions: y, mergedTableLayout: v, headerCheckboxDisabled: d, headerHeight: h, virtualScrollHeader: u, virtualListRef: I, handleCheckboxUpdateChecked: le, handleColHeaderClick: ne, handleTableHeaderScroll: M, handleColumnResizeStart: p, handleColumnResize: S };
}, render() {
  const { cellElsRef: e, mergedClsPrefix: t, fixedColumnLeftMap: o, fixedColumnRightMap: n, currentPage: l, allRowsChecked: i, someRowsChecked: f, rows: a, cols: c, mergedTheme: s, checkOptions: y, componentId: b, discrete: C, mergedTableLayout: v, headerCheckboxDisabled: d, mergedSortState: u, virtualScrollHeader: h, handleColHeaderClick: x, handleCheckboxUpdateChecked: w, handleColumnResizeStart: M, handleColumnResize: B } = this, T = (te, le, ne) => te.map(({ column: E, colIndex: p, colSpan: S, rowSpan: L, isLast: H }) => {
    var D, K;
    const X = Je(E), { ellipsis: Z } = E, P = () => E.type === "selection" ? E.multiple !== false ? r(wt, null, r(mo, { key: l, privateInsideTable: true, checked: i, indeterminate: f, disabled: d, onUpdateChecked: w }), y ? r(Gl, { clsPrefix: t }) : null) : null : r(wt, null, r("div", { class: `${t}-data-table-th__title-wrapper` }, r("div", { class: `${t}-data-table-th__title` }, Z === true || Z && !Z.tooltip ? r("div", { class: `${t}-data-table-th__ellipsis` }, oo(E)) : Z && typeof Z == "object" ? r(xo, Object.assign({}, Z, { theme: s.peers.Ellipsis, themeOverrides: s.peerOverrides.Ellipsis }), { default: () => oo(E) }) : oo(E)), to(E) ? r(Wl, { column: E }) : null), qo(E) ? r(jl, { column: E, options: E.filterOptions }) : null, xn(E) ? r(Kl, { onResizeStart: () => {
      M(E);
    }, onResize: (F) => {
      B(E, F);
    } }) : null), A = X in o, G = X in n, m = le && !E.fixed ? "div" : "th";
    return r(m, { ref: (F) => e[X] = F, key: X, style: [le && !E.fixed ? { position: "absolute", left: $e(le(p)), top: 0, bottom: 0 } : { left: $e((D = o[X]) === null || D === void 0 ? void 0 : D.start), right: $e((K = n[X]) === null || K === void 0 ? void 0 : K.start) }, { width: $e(E.width), textAlign: E.titleAlign || E.align, height: ne }], colspan: S, rowspan: L, "data-col-key": X, class: [`${t}-data-table-th`, (A || G) && `${t}-data-table-th--fixed-${A ? "left" : "right"}`, { [`${t}-data-table-th--sorting`]: Cn(E, u), [`${t}-data-table-th--filterable`]: qo(E), [`${t}-data-table-th--sortable`]: to(E), [`${t}-data-table-th--selection`]: E.type === "selection", [`${t}-data-table-th--last`]: H }, E.className], onClick: E.type !== "selection" && E.type !== "expand" && !("children" in E) ? (F) => {
      x(F, E);
    } : void 0 }, P());
  });
  if (h) {
    const { headerHeight: te } = this;
    let le = 0, ne = 0;
    return c.forEach((E) => {
      E.column.fixed === "left" ? le++ : E.column.fixed === "right" && ne++;
    }), r(po, { ref: "virtualListRef", class: `${t}-data-table-base-table-header`, style: { height: $e(te) }, onScroll: this.handleTableHeaderScroll, columns: c, itemSize: te, showScrollbar: false, items: [{}], itemResizable: false, visibleItemsTag: Zl, visibleItemsProps: { clsPrefix: t, id: b, cols: c, width: Xe(this.scrollX) }, renderItemWithCols: ({ startColIndex: E, endColIndex: p, getLeft: S }) => {
      const L = c.map((D, K) => ({ column: D.column, isLast: K === c.length - 1, colIndex: D.index, colSpan: 1, rowSpan: 1 })).filter(({ column: D }, K) => !!(E <= K && K <= p || D.fixed)), H = T(L, S, $e(te));
      return H.splice(le, 0, r("th", { colspan: c.length - le - ne, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), r("tr", { style: { position: "relative" } }, H);
    } }, { default: ({ renderedItemWithCols: E }) => E });
  }
  const _ = r("thead", { class: `${t}-data-table-thead`, "data-n-id": b }, a.map((te) => r("tr", { class: `${t}-data-table-tr` }, T(te, null, void 0))));
  if (!C) return _;
  const { handleTableHeaderScroll: I, scrollX: q } = this;
  return r("div", { class: `${t}-data-table-base-table-header`, onScroll: I }, r("table", { class: `${t}-data-table-table`, style: { minWidth: Xe(q), tableLayout: v } }, r("colgroup", null, c.map((te) => r("col", { key: te.key, style: te.style }))), _));
} });
function Yl(e, t) {
  const o = [];
  function n(l, i) {
    l.forEach((f) => {
      f.children && t.has(f.key) ? (o.push({ tmNode: f, striped: false, key: f.key, index: i }), n(f.children, i)) : o.push({ key: f.key, tmNode: f, striped: false, index: i });
    });
  }
  return e.forEach((l) => {
    o.push(l);
    const { children: i } = l.tmNode;
    i && t.has(l.key) && n(i, l.index);
  }), o;
}
const Jl = ve({ props: { clsPrefix: { type: String, required: true }, id: { type: String, required: true }, cols: { type: Array, required: true }, onMouseenter: Function, onMouseleave: Function }, render() {
  const { clsPrefix: e, id: t, cols: o, onMouseenter: n, onMouseleave: l } = this;
  return r("table", { style: { tableLayout: "fixed" }, class: `${e}-data-table-table`, onMouseenter: n, onMouseleave: l }, r("colgroup", null, o.map((i) => r("col", { key: i.key, style: i.style }))), r("tbody", { "data-n-id": t, class: `${e}-data-table-tbody` }, this.$slots));
} }), Ql = ve({ name: "DataTableBody", props: { onResize: Function, showHeader: Boolean, flexHeight: Boolean, bodyStyle: Object }, setup(e) {
  const { slots: t, bodyWidthRef: o, mergedExpandedRowKeysRef: n, mergedClsPrefixRef: l, mergedThemeRef: i, scrollXRef: f, colsRef: a, paginatedDataRef: c, rawPaginatedDataRef: s, fixedColumnLeftMapRef: y, fixedColumnRightMapRef: b, mergedCurrentPageRef: C, rowClassNameRef: v, leftActiveFixedColKeyRef: d, leftActiveFixedChildrenColKeysRef: u, rightActiveFixedColKeyRef: h, rightActiveFixedChildrenColKeysRef: x, renderExpandRef: w, hoverKeyRef: M, summaryRef: B, mergedSortStateRef: T, virtualScrollRef: _, virtualScrollXRef: I, heightForRowRef: q, minRowHeightRef: te, componentId: le, mergedTableLayoutRef: ne, childTriggerColIndexRef: E, indentRef: p, rowPropsRef: S, stripedRef: L, loadingRef: H, onLoadRef: D, loadingKeySetRef: K, expandableRef: X, stickyExpandedRowsRef: Z, renderExpandIconRef: P, summaryPlacementRef: A, treeMateRef: G, scrollbarPropsRef: m, setHeaderScrollLeft: F, doUpdateExpandedRowKeys: de, handleTableBodyScroll: me, doCheck: ge, doUncheck: pe, renderCell: O, xScrollableRef: ae, explicitlyScrollableRef: xe } = Ee(tt), ye = Ee(ur), ze = N(null), Me = N(null), Ie = N(null), ie = k(() => {
    var Y, ue;
    return (ue = (Y = ye == null ? void 0 : ye.mergedComponentPropsRef.value) === null || Y === void 0 ? void 0 : Y.DataTable) === null || ue === void 0 ? void 0 : ue.renderEmpty;
  }), be = Ne(() => c.value.length === 0), Pe = Ne(() => _.value && !be.value);
  let we = "";
  const _e = k(() => new Set(n.value));
  function De(Y) {
    var ue;
    return (ue = G.value.getNode(Y)) === null || ue === void 0 ? void 0 : ue.rawNode;
  }
  function Oe(Y, ue, g) {
    const R = De(Y.key);
    if (!R) {
      Co("data-table", `fail to get row data with key ${Y.key}`);
      return;
    }
    if (g) {
      const W = c.value.findIndex((se) => se.key === we);
      if (W !== -1) {
        const se = c.value.findIndex((fe) => fe.key === Y.key), V = Math.min(W, se), J = Math.max(W, se), re = [];
        c.value.slice(V, J + 1).forEach((fe) => {
          fe.disabled || re.push(fe.key);
        }), ue ? ge(re, false, R) : pe(re, R), we = Y.key;
        return;
      }
    }
    ue ? ge(Y.key, false, R) : pe(Y.key, R), we = Y.key;
  }
  function $(Y) {
    const ue = De(Y.key);
    if (!ue) {
      Co("data-table", `fail to get row data with key ${Y.key}`);
      return;
    }
    ge(Y.key, true, ue);
  }
  function j() {
    if (Pe.value) return Be();
    const { value: Y } = ze;
    return Y ? Y.containerRef : null;
  }
  function Ce(Y, ue) {
    var g;
    if (K.value.has(Y)) return;
    const { value: R } = n, W = R.indexOf(Y), se = Array.from(R);
    ~W ? (se.splice(W, 1), de(se)) : ue && !ue.isLeaf && !ue.shallowLoaded ? (K.value.add(Y), (g = D.value) === null || g === void 0 || g.call(D, ue.rawNode).then(() => {
      const { value: V } = n, J = Array.from(V);
      ~J.indexOf(Y) || J.push(Y), de(J);
    }).finally(() => {
      K.value.delete(Y);
    })) : (se.push(Y), de(se));
  }
  function Ge() {
    M.value = null;
  }
  function Be() {
    const { value: Y } = Me;
    return (Y == null ? void 0 : Y.listElRef) || null;
  }
  function Te() {
    const { value: Y } = Me;
    return (Y == null ? void 0 : Y.itemsElRef) || null;
  }
  function Ue(Y) {
    var ue;
    me(Y), (ue = ze.value) === null || ue === void 0 || ue.sync();
  }
  function Fe(Y) {
    var ue;
    const { onResize: g } = e;
    g && g(Y), (ue = ze.value) === null || ue === void 0 || ue.sync();
  }
  const Ve = { getScrollContainer: j, scrollTo(Y, ue) {
    var g, R;
    _.value ? (g = Me.value) === null || g === void 0 || g.scrollTo(Y, ue) : (R = ze.value) === null || R === void 0 || R.scrollTo(Y, ue);
  } }, We = Q([({ props: Y }) => {
    const ue = (R) => R === null ? null : Q(`[data-n-id="${Y.componentId}"] [data-col-key="${R}"]::after`, { boxShadow: "var(--n-box-shadow-after)" }), g = (R) => R === null ? null : Q(`[data-n-id="${Y.componentId}"] [data-col-key="${R}"]::before`, { boxShadow: "var(--n-box-shadow-before)" });
    return Q([ue(Y.leftActiveFixedColKey), g(Y.rightActiveFixedColKey), Y.leftActiveFixedChildrenColKeys.map((R) => ue(R)), Y.rightActiveFixedChildrenColKeys.map((R) => g(R))]);
  }]);
  let Ke = false;
  return Ct(() => {
    const { value: Y } = d, { value: ue } = u, { value: g } = h, { value: R } = x;
    if (!Ke && Y === null && g === null) return;
    const W = { leftActiveFixedColKey: Y, leftActiveFixedChildrenColKeys: ue, rightActiveFixedColKey: g, rightActiveFixedChildrenColKeys: R, componentId: le };
    We.mount({ id: `n-${le}`, force: true, props: W, anchorMetaName: fr, parent: ye == null ? void 0 : ye.styleMountTarget }), Ke = true;
  }), hr(() => {
    We.unmount({ id: `n-${le}`, parent: ye == null ? void 0 : ye.styleMountTarget });
  }), Object.assign({ bodyWidth: o, summaryPlacement: A, dataTableSlots: t, componentId: le, scrollbarInstRef: ze, virtualListRef: Me, emptyElRef: Ie, summary: B, mergedClsPrefix: l, mergedTheme: i, mergedRenderEmpty: ie, scrollX: f, cols: a, loading: H, shouldDisplayVirtualList: Pe, empty: be, paginatedDataAndInfo: k(() => {
    const { value: Y } = L;
    let ue = false;
    return { data: c.value.map(Y ? (R, W) => (R.isLeaf || (ue = true), { tmNode: R, key: R.key, striped: W % 2 === 1, index: W }) : (R, W) => (R.isLeaf || (ue = true), { tmNode: R, key: R.key, striped: false, index: W })), hasChildren: ue };
  }), rawPaginatedData: s, fixedColumnLeftMap: y, fixedColumnRightMap: b, currentPage: C, rowClassName: v, renderExpand: w, mergedExpandedRowKeySet: _e, hoverKey: M, mergedSortState: T, virtualScroll: _, virtualScrollX: I, heightForRow: q, minRowHeight: te, mergedTableLayout: ne, childTriggerColIndex: E, indent: p, rowProps: S, loadingKeySet: K, expandable: X, stickyExpandedRows: Z, renderExpandIcon: P, scrollbarProps: m, setHeaderScrollLeft: F, handleVirtualListScroll: Ue, handleVirtualListResize: Fe, handleMouseleaveTable: Ge, virtualListContainer: Be, virtualListContent: Te, handleTableBodyScroll: me, handleCheckboxUpdateChecked: Oe, handleRadioUpdateChecked: $, handleUpdateExpanded: Ce, renderCell: O, explicitlyScrollable: xe, xScrollable: ae }, Ve);
}, render() {
  const { mergedTheme: e, scrollX: t, mergedClsPrefix: o, explicitlyScrollable: n, xScrollable: l, loadingKeySet: i, onResize: f, setHeaderScrollLeft: a, empty: c, shouldDisplayVirtualList: s } = this, y = { minWidth: Xe(t) || "100%" };
  t && (y.width = "100%");
  const b = () => r("div", { class: [`${o}-data-table-empty`, this.loading && `${o}-data-table-empty--hide`], style: [this.bodyStyle, l ? "position: sticky; left: 0; width: var(--n-scrollbar-current-width);" : void 0], ref: "emptyElRef" }, Et(this.dataTableSlots.empty, () => {
    var v;
    return [((v = this.mergedRenderEmpty) === null || v === void 0 ? void 0 : v.call(this)) || r(un, { theme: this.mergedTheme.peers.Empty, themeOverrides: this.mergedTheme.peerOverrides.Empty })];
  })), C = r(fo, Object.assign({}, this.scrollbarProps, { ref: "scrollbarInstRef", scrollable: n || l, class: `${o}-data-table-base-table-body`, style: c ? "height: initial;" : this.bodyStyle, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, contentStyle: y, container: s ? this.virtualListContainer : void 0, content: s ? this.virtualListContent : void 0, horizontalRailStyle: { zIndex: 3 }, verticalRailStyle: { zIndex: 3 }, internalExposeWidthCssVar: l && c, xScrollable: l, onScroll: s ? void 0 : this.handleTableBodyScroll, internalOnUpdateScrollLeft: a, onResize: f }), { default: () => {
    if (this.empty && !this.showHeader && (this.explicitlyScrollable || this.xScrollable)) return b();
    const v = {}, d = {}, { cols: u, paginatedDataAndInfo: h, mergedTheme: x, fixedColumnLeftMap: w, fixedColumnRightMap: M, currentPage: B, rowClassName: T, mergedSortState: _, mergedExpandedRowKeySet: I, stickyExpandedRows: q, componentId: te, childTriggerColIndex: le, expandable: ne, rowProps: E, handleMouseleaveTable: p, renderExpand: S, summary: L, handleCheckboxUpdateChecked: H, handleRadioUpdateChecked: D, handleUpdateExpanded: K, heightForRow: X, minRowHeight: Z, virtualScrollX: P } = this, { length: A } = u;
    let G;
    const { data: m, hasChildren: F } = h, de = F ? Yl(m, I) : m;
    if (L) {
      const ie = L(this.rawPaginatedData);
      if (Array.isArray(ie)) {
        const be = ie.map((Pe, we) => ({ isSummaryRow: true, key: `__n_summary__${we}`, tmNode: { rawNode: Pe, disabled: true }, index: -1 }));
        G = this.summaryPlacement === "top" ? [...be, ...de] : [...de, ...be];
      } else {
        const be = { isSummaryRow: true, key: "__n_summary__", tmNode: { rawNode: ie, disabled: true }, index: -1 };
        G = this.summaryPlacement === "top" ? [be, ...de] : [...de, be];
      }
    } else G = de;
    const me = F ? { width: $e(this.indent) } : void 0, ge = [];
    G.forEach((ie) => {
      S && I.has(ie.key) && (!ne || ne(ie.tmNode.rawNode)) ? ge.push(ie, { isExpandedRow: true, key: `${ie.key}-expand`, tmNode: ie.tmNode, index: ie.index }) : ge.push(ie);
    });
    const { length: pe } = ge, O = {};
    m.forEach(({ tmNode: ie }, be) => {
      O[be] = ie.key;
    });
    const ae = q ? this.bodyWidth : null, xe = ae === null ? void 0 : `${ae}px`, ye = this.virtualScrollX ? "div" : "td";
    let ze = 0, Me = 0;
    P && u.forEach((ie) => {
      ie.column.fixed === "left" ? ze++ : ie.column.fixed === "right" && Me++;
    });
    const Ie = ({ rowInfo: ie, displayedRowIndex: be, isVirtual: Pe, isVirtualX: we, startColIndex: _e, endColIndex: De, getLeft: Oe }) => {
      const { index: $ } = ie;
      if ("isExpandedRow" in ie) {
        const { tmNode: { key: g, rawNode: R } } = ie;
        return r("tr", { class: `${o}-data-table-tr ${o}-data-table-tr--expanded`, key: `${g}__expand` }, r("td", { class: [`${o}-data-table-td`, `${o}-data-table-td--last-col`, be + 1 === pe && `${o}-data-table-td--last-row`], colspan: A }, q ? r("div", { class: `${o}-data-table-expand`, style: { width: xe } }, S(R, $)) : S(R, $)));
      }
      const j = "isSummaryRow" in ie, Ce = !j && ie.striped, { tmNode: Ge, key: Be } = ie, { rawNode: Te } = Ge, Ue = I.has(Be), Fe = E ? E(Te, $) : void 0, Ve = typeof T == "string" ? T : kl(Te, $, T), We = we ? u.filter((g, R) => !!(_e <= R && R <= De || g.column.fixed)) : u, Ke = we ? $e((X == null ? void 0 : X(Te, $)) || Z) : void 0, Y = We.map((g) => {
        var R, W, se, V, J;
        const re = g.index;
        if (be in v) {
          const Le = v[be], He = Le.indexOf(re);
          if (~He) return Le.splice(He, 1), null;
        }
        const { column: fe } = g, Se = Je(g), { rowSpan: ot, colSpan: Ze } = fe, nt = j ? ((R = ie.tmNode.rawNode[Se]) === null || R === void 0 ? void 0 : R.colSpan) || 1 : Ze ? Ze(Te, $) : 1, rt = j ? ((W = ie.tmNode.rawNode[Se]) === null || W === void 0 ? void 0 : W.rowSpan) || 1 : ot ? ot(Te, $) : 1, ut = re + nt === A, ft = be + rt === pe, lt = rt > 1;
        if (lt && (d[be] = { [re]: [] }), nt > 1 || lt) for (let Le = be; Le < be + rt; ++Le) {
          lt && d[be][re].push(O[Le]);
          for (let He = re; He < re + nt; ++He) Le === be && He === re || (Le in v ? v[Le].push(He) : v[Le] = [He]);
        }
        const dt = lt ? this.hoverKey : null, { cellProps: ht } = fe, Ye = ht == null ? void 0 : ht(Te, $), vt = { "--indent-offset": "" }, kt = fe.fixed ? "td" : ye;
        return r(kt, Object.assign({}, Ye, { key: Se, style: [{ textAlign: fe.align || void 0, width: $e(fe.width) }, we && { height: Ke }, we && !fe.fixed ? { position: "absolute", left: $e(Oe(re)), top: 0, bottom: 0 } : { left: $e((se = w[Se]) === null || se === void 0 ? void 0 : se.start), right: $e((V = M[Se]) === null || V === void 0 ? void 0 : V.start) }, vt, (Ye == null ? void 0 : Ye.style) || ""], colspan: nt, rowspan: Pe ? void 0 : rt, "data-col-key": Se, class: [`${o}-data-table-td`, fe.className, Ye == null ? void 0 : Ye.class, j && `${o}-data-table-td--summary`, dt !== null && d[be][re].includes(dt) && `${o}-data-table-td--hover`, Cn(fe, _) && `${o}-data-table-td--sorting`, fe.fixed && `${o}-data-table-td--fixed-${fe.fixed}`, fe.align && `${o}-data-table-td--${fe.align}-align`, fe.type === "selection" && `${o}-data-table-td--selection`, fe.type === "expand" && `${o}-data-table-td--expand`, ut && `${o}-data-table-td--last-col`, ft && `${o}-data-table-td--last-row`] }), F && re === le ? [vr(vt["--indent-offset"] = j ? 0 : ie.tmNode.level, r("div", { class: `${o}-data-table-indent`, style: me })), j || ie.tmNode.isLeaf ? r("div", { class: `${o}-data-table-expand-placeholder` }) : r(Go, { class: `${o}-data-table-expand-trigger`, clsPrefix: o, expanded: Ue, rowData: Te, renderExpandIcon: this.renderExpandIcon, loading: i.has(ie.key), onClick: () => {
          K(Be, ie.tmNode);
        } })] : null, fe.type === "selection" ? j ? null : fe.multiple === false ? r(Al, { key: B, rowKey: Be, disabled: ie.tmNode.disabled, onUpdateChecked: () => {
          D(ie.tmNode);
        } }) : r(Fl, { key: B, rowKey: Be, disabled: ie.tmNode.disabled, onUpdateChecked: (Le, He) => {
          H(ie.tmNode, Le, He.shiftKey);
        } }) : fe.type === "expand" ? j ? null : !fe.expandable || !((J = fe.expandable) === null || J === void 0) && J.call(fe, Te) ? r(Go, { clsPrefix: o, rowData: Te, expanded: Ue, renderExpandIcon: this.renderExpandIcon, onClick: () => {
          K(Be, null);
        } }) : null : r(Nl, { clsPrefix: o, index: $, row: Te, column: fe, isSummary: j, mergedTheme: x, renderCell: this.renderCell }));
      });
      return we && ze && Me && Y.splice(ze, 0, r("td", { colspan: u.length - ze - Me, style: { pointerEvents: "none", visibility: "hidden", height: 0 } })), r("tr", Object.assign({}, Fe, { onMouseenter: (g) => {
        var R;
        this.hoverKey = Be, (R = Fe == null ? void 0 : Fe.onMouseenter) === null || R === void 0 || R.call(Fe, g);
      }, key: Be, class: [`${o}-data-table-tr`, j && `${o}-data-table-tr--summary`, Ce && `${o}-data-table-tr--striped`, Ue && `${o}-data-table-tr--expanded`, Ve, Fe == null ? void 0 : Fe.class], style: [Fe == null ? void 0 : Fe.style, we && { height: Ke }] }), Y);
    };
    return this.shouldDisplayVirtualList ? r(po, { ref: "virtualListRef", items: ge, itemSize: this.minRowHeight, visibleItemsTag: Jl, visibleItemsProps: { clsPrefix: o, id: te, cols: u, onMouseleave: p }, showScrollbar: false, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemsStyle: y, itemResizable: !P, columns: u, renderItemWithCols: P ? ({ itemIndex: ie, item: be, startColIndex: Pe, endColIndex: we, getLeft: _e }) => Ie({ displayedRowIndex: ie, isVirtual: true, isVirtualX: true, rowInfo: be, startColIndex: Pe, endColIndex: we, getLeft: _e }) : void 0 }, { default: ({ item: ie, index: be, renderedItemWithCols: Pe }) => Pe || Ie({ rowInfo: ie, displayedRowIndex: be, isVirtual: true, isVirtualX: false, startColIndex: 0, endColIndex: 0, getLeft(we) {
      return 0;
    } }) }) : r(wt, null, r("table", { class: `${o}-data-table-table`, onMouseleave: p, style: { tableLayout: this.mergedTableLayout } }, r("colgroup", null, u.map((ie) => r("col", { key: ie.key, style: ie.style }))), this.showHeader ? r(Fn, { discrete: false }) : null, this.empty ? null : r("tbody", { "data-n-id": te, class: `${o}-data-table-tbody` }, ge.map((ie, be) => Ie({ rowInfo: ie, displayedRowIndex: be, isVirtual: false, isVirtualX: false, startColIndex: -1, endColIndex: -1, getLeft(Pe) {
      return -1;
    } })))), this.empty && this.xScrollable ? b() : null);
  } });
  return this.empty ? this.explicitlyScrollable || this.xScrollable ? C : r(no, { onResize: this.onResize }, { default: b }) : C;
} }), ea = ve({ name: "MainTable", setup() {
  const { mergedClsPrefixRef: e, rightFixedColumnsRef: t, leftFixedColumnsRef: o, bodyWidthRef: n, maxHeightRef: l, minHeightRef: i, flexHeightRef: f, virtualScrollHeaderRef: a, syncScrollState: c, scrollXRef: s } = Ee(tt), y = N(null), b = N(null), C = N(null), v = N(!(o.value.length || t.value.length)), d = k(() => ({ maxHeight: Xe(l.value), minHeight: Xe(i.value) }));
  function u(M) {
    n.value = M.contentRect.width, c(), v.value || (v.value = true);
  }
  function h() {
    var M;
    const { value: B } = y;
    return B ? a.value ? ((M = B.virtualListRef) === null || M === void 0 ? void 0 : M.listElRef) || null : B.$el : null;
  }
  function x() {
    const { value: M } = b;
    return M ? M.getScrollContainer() : null;
  }
  const w = { getBodyElement: x, getHeaderElement: h, scrollTo(M, B) {
    var T;
    (T = b.value) === null || T === void 0 || T.scrollTo(M, B);
  } };
  return Ct(() => {
    const { value: M } = C;
    if (!M) return;
    const B = `${e.value}-data-table-base-table--transition-disabled`;
    v.value ? setTimeout(() => {
      M.classList.remove(B);
    }, 0) : M.classList.add(B);
  }), Object.assign({ maxHeight: l, mergedClsPrefix: e, selfElRef: C, headerInstRef: y, bodyInstRef: b, bodyStyle: d, flexHeight: f, handleBodyResize: u, scrollX: s }, w);
}, render() {
  const { mergedClsPrefix: e, maxHeight: t, flexHeight: o } = this, n = t === void 0 && !o;
  return r("div", { class: `${e}-data-table-base-table`, ref: "selfElRef" }, n ? null : r(Fn, { ref: "headerInstRef" }), r(Ql, { ref: "bodyInstRef", bodyStyle: this.bodyStyle, showHeader: n, flexHeight: o, onResize: this.handleBodyResize }));
} }), Zo = oa(), ta = Q([z("data-table", `
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
 `, [z("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), U("flex-height", [Q(">", [z("data-table-wrapper", [Q(">", [z("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [Q(">", [z("data-table-base-table-body", "flex-basis: 0;", [Q("&:last-child", "flex-grow: 1;")])])])])])])]), Q(">", [z("data-table-loading-wrapper", `
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
 `, [vo({ originalTransform: "translateX(-50%) translateY(-50%)" })])]), z("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), z("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), z("data-table-expand-trigger", `
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
 `, [U("expanded", [z("icon", "transform: rotate(90deg);", [pt({ originalTransform: "rotate(90deg)" })]), z("base-icon", "transform: rotate(90deg);", [pt({ originalTransform: "rotate(90deg)" })])]), z("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [pt()]), z("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [pt()]), z("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [pt()])]), z("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), z("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [z("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), U("striped", "background-color: var(--n-merged-td-color-striped);", [z("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), je("summary", [Q("&:hover", "background-color: var(--n-merged-td-color-hover);", [Q(">", [z("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), z("data-table-th", `
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
 `, [U("filterable", `
 padding-right: 36px;
 `, [U("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Zo, U("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), ee("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [ee("title", `
 flex: 1;
 min-width: 0;
 `)]), ee("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), U("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), U("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), U("sortable", `
 cursor: pointer;
 `, [ee("ellipsis", `
 max-width: calc(100% - 18px);
 `), Q("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), z("data-table-sorter", `
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
 `, [z("base-icon", "transition: transform .3s var(--n-bezier)"), U("desc", [z("base-icon", `
 transform: rotate(0deg);
 `)]), U("asc", [z("base-icon", `
 transform: rotate(-180deg);
 `)]), U("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), z("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [Q("&::after", `
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
 `), U("active", [Q("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), Q("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), z("data-table-filter", `
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
 `, [Q("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), U("show", `
 background-color: var(--n-th-button-color-hover);
 `), U("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), z("data-table-td", `
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
 `, [U("expand", [z("data-table-expand-trigger", `
 margin-right: 0;
 `)]), U("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [Q("&::after", `
 bottom: 0 !important;
 `), Q("&::before", `
 bottom: 0 !important;
 `)]), U("summary", `
 background-color: var(--n-merged-th-color);
 `), U("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), U("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), ee("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), U("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Zo]), z("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [U("hide", `
 opacity: 0;
 `)]), ee("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), z("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), U("loading", [z("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), U("single-column", [z("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [Q("&::after, &::before", `
 bottom: 0 !important;
 `)])]), je("single-line", [z("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [U("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), z("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [U("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), U("bordered", [z("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), z("data-table-base-table", [U("transition-disabled", [z("data-table-th", [Q("&::after, &::before", "transition: none;")]), z("data-table-td", [Q("&::after, &::before", "transition: none;")])])]), U("bottom-bordered", [z("data-table-td", [U("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), z("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), z("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [Q("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), z("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), z("data-table-filter-menu", [z("scrollbar", `
 max-height: 240px;
 `), ee("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [z("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), z("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), ee("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [z("button", [Q("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), Q("&:last-child", `
 margin-right: 0;
 `)])]), z("divider", `
 margin: 0 !important;
 `)]), Jo(z("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), Qo(z("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function oa() {
  return [U("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [Q("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), U("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [Q("&::before", `
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
function na(e, t) {
  const { paginatedDataRef: o, treeMateRef: n, selectionColumnRef: l } = t, i = N(e.defaultCheckedRowKeys), f = k(() => {
    var T;
    const { checkedRowKeys: _ } = e, I = _ === void 0 ? i.value : _;
    return ((T = l.value) === null || T === void 0 ? void 0 : T.multiple) === false ? { checkedKeys: I.slice(0, 1), indeterminateKeys: [] } : n.value.getCheckedKeys(I, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded });
  }), a = k(() => f.value.checkedKeys), c = k(() => f.value.indeterminateKeys), s = k(() => new Set(a.value)), y = k(() => new Set(c.value)), b = k(() => {
    const { value: T } = s;
    return o.value.reduce((_, I) => {
      const { key: q, disabled: te } = I;
      return _ + (!te && T.has(q) ? 1 : 0);
    }, 0);
  }), C = k(() => o.value.filter((T) => T.disabled).length), v = k(() => {
    const { length: T } = o.value, { value: _ } = y;
    return b.value > 0 && b.value < T - C.value || o.value.some((I) => _.has(I.key));
  }), d = k(() => {
    const { length: T } = o.value;
    return b.value !== 0 && b.value === T - C.value;
  }), u = k(() => o.value.length === 0);
  function h(T, _, I) {
    const { "onUpdate:checkedRowKeys": q, onUpdateCheckedRowKeys: te, onCheckedRowKeysChange: le } = e, ne = [], { value: { getNode: E } } = n;
    T.forEach((p) => {
      var S;
      const L = (S = E(p)) === null || S === void 0 ? void 0 : S.rawNode;
      ne.push(L);
    }), q && oe(q, T, ne, { row: _, action: I }), te && oe(te, T, ne, { row: _, action: I }), le && oe(le, T, ne, { row: _, action: I }), i.value = T;
  }
  function x(T, _ = false, I) {
    if (!e.loading) {
      if (_) {
        h(Array.isArray(T) ? T.slice(0, 1) : [T], I, "check");
        return;
      }
      h(n.value.check(T, a.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, I, "check");
    }
  }
  function w(T, _) {
    e.loading || h(n.value.uncheck(T, a.value, { cascade: e.cascade, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, _, "uncheck");
  }
  function M(T = false) {
    const { value: _ } = l;
    if (!_ || e.loading) return;
    const I = [];
    (T ? n.value.treeNodes : o.value).forEach((q) => {
      q.disabled || I.push(q.key);
    }), h(n.value.check(I, a.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "checkAll");
  }
  function B(T = false) {
    const { value: _ } = l;
    if (!_ || e.loading) return;
    const I = [];
    (T ? n.value.treeNodes : o.value).forEach((q) => {
      q.disabled || I.push(q.key);
    }), h(n.value.uncheck(I, a.value, { cascade: true, allowNotLoaded: e.allowCheckingNotLoaded }).checkedKeys, void 0, "uncheckAll");
  }
  return { mergedCheckedRowKeySetRef: s, mergedCheckedRowKeysRef: a, mergedInderminateRowKeySetRef: y, someRowsCheckedRef: v, allRowsCheckedRef: d, headerCheckboxDisabledRef: u, doUpdateCheckedRowKeys: h, doCheckAll: M, doUncheckAll: B, doCheck: x, doUncheck: w };
}
function ra(e, t) {
  const o = Ne(() => {
    for (const s of e.columns) if (s.type === "expand") return s.renderExpand;
  }), n = Ne(() => {
    let s;
    for (const y of e.columns) if (y.type === "expand") {
      s = y.expandable;
      break;
    }
    return s;
  }), l = N(e.defaultExpandAll ? (o == null ? void 0 : o.value) ? (() => {
    const s = [];
    return t.value.treeNodes.forEach((y) => {
      var b;
      !((b = n.value) === null || b === void 0) && b.call(n, y.rawNode) && s.push(y.key);
    }), s;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = ce(e, "expandedRowKeys"), f = ce(e, "stickyExpandedRows"), a = Qe(i, l);
  function c(s) {
    const { onUpdateExpandedRowKeys: y, "onUpdate:expandedRowKeys": b } = e;
    y && oe(y, s), b && oe(b, s), l.value = s;
  }
  return { stickyExpandedRowsRef: f, mergedExpandedRowKeysRef: a, renderExpandRef: o, expandableRef: n, doUpdateExpandedRowKeys: c };
}
function la(e, t) {
  const o = [], n = [], l = [], i = /* @__PURE__ */ new WeakMap();
  let f = -1, a = 0, c = false, s = 0;
  function y(C, v) {
    v > f && (o[v] = [], f = v), C.forEach((d) => {
      if ("children" in d) y(d.children, v + 1);
      else {
        const u = "key" in d ? d.key : void 0;
        n.push({ key: Je(d), style: Rl(d, u !== void 0 ? Xe(t(u)) : void 0), column: d, index: s++, width: d.width === void 0 ? 128 : Number(d.width) }), a += 1, c || (c = !!d.ellipsis), l.push(d);
      }
    });
  }
  y(e, 0), s = 0;
  function b(C, v) {
    let d = 0;
    C.forEach((u) => {
      var h;
      if ("children" in u) {
        const x = s, w = { column: u, colIndex: s, colSpan: 0, rowSpan: 1, isLast: false };
        b(u.children, v + 1), u.children.forEach((M) => {
          var B, T;
          w.colSpan += (T = (B = i.get(M)) === null || B === void 0 ? void 0 : B.colSpan) !== null && T !== void 0 ? T : 0;
        }), x + w.colSpan === a && (w.isLast = true), i.set(u, w), o[v].push(w);
      } else {
        if (s < d) {
          s += 1;
          return;
        }
        let x = 1;
        "titleColSpan" in u && (x = (h = u.titleColSpan) !== null && h !== void 0 ? h : 1), x > 1 && (d = s + x);
        const w = s + x === a, M = { column: u, colSpan: x, colIndex: s, rowSpan: f - v + 1, isLast: w };
        i.set(u, M), o[v].push(M), s += 1;
      }
    });
  }
  return b(e, 0), { hasEllipsis: c, rows: o, cols: n, dataRelatedCols: l };
}
function aa(e, t) {
  const o = k(() => la(e.columns, t));
  return { rowsRef: k(() => o.value.rows), colsRef: k(() => o.value.cols), hasEllipsisRef: k(() => o.value.hasEllipsis), dataRelatedColsRef: k(() => o.value.dataRelatedCols) };
}
function ia() {
  const e = N({});
  function t(l) {
    return e.value[l];
  }
  function o(l, i) {
    xn(l) && "key" in l && (e.value[l.key] = i);
  }
  function n() {
    e.value = {};
  }
  return { getResizableWidth: t, doUpdateResizableWidth: o, clearResizableWidth: n };
}
function sa(e, { mainTableInstRef: t, mergedCurrentPageRef: o, bodyWidthRef: n, maxHeightRef: l, mergedTableLayoutRef: i }) {
  const f = k(() => e.scrollX !== void 0 || l.value !== void 0 || e.flexHeight), a = k(() => {
    const p = !f.value && i.value === "auto";
    return e.scrollX !== void 0 || p;
  });
  let c = 0;
  const s = N(), y = N(null), b = N([]), C = N(null), v = N([]), d = k(() => Xe(e.scrollX)), u = k(() => e.columns.filter((p) => p.fixed === "left")), h = k(() => e.columns.filter((p) => p.fixed === "right")), x = k(() => {
    const p = {};
    let S = 0;
    function L(H) {
      H.forEach((D) => {
        const K = { start: S, end: 0 };
        p[Je(D)] = K, "children" in D ? (L(D.children), K.end = S) : (S += Vo(D) || 0, K.end = S);
      });
    }
    return L(u.value), p;
  }), w = k(() => {
    const p = {};
    let S = 0;
    function L(H) {
      for (let D = H.length - 1; D >= 0; --D) {
        const K = H[D], X = { start: S, end: 0 };
        p[Je(K)] = X, "children" in K ? (L(K.children), X.end = S) : (S += Vo(K) || 0, X.end = S);
      }
    }
    return L(h.value), p;
  });
  function M() {
    var p, S;
    const { value: L } = u;
    let H = 0;
    const { value: D } = x;
    let K = null;
    for (let X = 0; X < L.length; ++X) {
      const Z = Je(L[X]);
      if (c > (((p = D[Z]) === null || p === void 0 ? void 0 : p.start) || 0) - H) K = Z, H = ((S = D[Z]) === null || S === void 0 ? void 0 : S.end) || 0;
      else break;
    }
    y.value = K;
  }
  function B() {
    b.value = [];
    let p = e.columns.find((S) => Je(S) === y.value);
    for (; p && "children" in p; ) {
      const S = p.children.length;
      if (S === 0) break;
      const L = p.children[S - 1];
      b.value.push(Je(L)), p = L;
    }
  }
  function T() {
    var p, S;
    const { value: L } = h, H = Number(e.scrollX), { value: D } = n;
    if (D === null) return;
    let K = 0, X = null;
    const { value: Z } = w;
    for (let P = L.length - 1; P >= 0; --P) {
      const A = Je(L[P]);
      if (Math.round(c + (((p = Z[A]) === null || p === void 0 ? void 0 : p.start) || 0) + D - K) < H) X = A, K = ((S = Z[A]) === null || S === void 0 ? void 0 : S.end) || 0;
      else break;
    }
    C.value = X;
  }
  function _() {
    v.value = [];
    let p = e.columns.find((S) => Je(S) === C.value);
    for (; p && "children" in p && p.children.length; ) {
      const S = p.children[0];
      v.value.push(Je(S)), p = S;
    }
  }
  function I() {
    const p = t.value ? t.value.getHeaderElement() : null, S = t.value ? t.value.getBodyElement() : null;
    return { header: p, body: S };
  }
  function q() {
    const { body: p } = I();
    p && (p.scrollTop = 0);
  }
  function te() {
    s.value !== "body" ? lo(ne) : s.value = void 0;
  }
  function le(p) {
    var S;
    (S = e.onScroll) === null || S === void 0 || S.call(e, p), s.value !== "head" ? lo(ne) : s.value = void 0;
  }
  function ne() {
    const { header: p, body: S } = I();
    if (!S) return;
    const { value: L } = n;
    if (L !== null) {
      if (p) {
        const H = c - p.scrollLeft;
        s.value = H !== 0 ? "head" : "body", s.value === "head" ? (c = p.scrollLeft, S.scrollLeft = c) : (c = S.scrollLeft, p.scrollLeft = c);
      } else c = S.scrollLeft;
      M(), B(), T(), _();
    }
  }
  function E(p) {
    const { header: S } = I();
    S && (S.scrollLeft = p, ne());
  }
  return it(o, () => {
    q();
  }), { styleScrollXRef: d, fixedColumnLeftMapRef: x, fixedColumnRightMapRef: w, leftFixedColumnsRef: u, rightFixedColumnsRef: h, leftActiveFixedColKeyRef: y, leftActiveFixedChildrenColKeysRef: b, rightActiveFixedColKeyRef: C, rightActiveFixedChildrenColKeysRef: v, syncScrollState: ne, handleTableBodyScroll: le, handleTableHeaderScroll: te, setHeaderScrollLeft: E, explicitlyScrollableRef: f, xScrollableRef: a };
}
function Mt(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : false;
}
function da(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? ca(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : false;
}
function ca(e) {
  return (t, o) => {
    const n = t[e], l = o[e];
    return n == null ? l == null ? 0 : -1 : l == null ? 1 : typeof n == "number" && typeof l == "number" ? n - l : typeof n == "string" && typeof l == "string" ? n.localeCompare(l) : 0;
  };
}
function ua(e, { dataRelatedColsRef: t, filteredDataRef: o }) {
  const n = [];
  t.value.forEach((v) => {
    var d;
    v.sorter !== void 0 && C(n, { columnKey: v.key, sorter: v.sorter, order: (d = v.defaultSortOrder) !== null && d !== void 0 ? d : false });
  });
  const l = N(n), i = k(() => {
    const v = t.value.filter((h) => h.type !== "selection" && h.sorter !== void 0 && (h.sortOrder === "ascend" || h.sortOrder === "descend" || h.sortOrder === false)), d = v.filter((h) => h.sortOrder !== false);
    if (d.length) return d.map((h) => ({ columnKey: h.key, order: h.sortOrder, sorter: h.sorter }));
    if (v.length) return [];
    const { value: u } = l;
    return Array.isArray(u) ? u : u ? [u] : [];
  }), f = k(() => {
    const v = i.value.slice().sort((d, u) => {
      const h = Mt(d.sorter) || 0;
      return (Mt(u.sorter) || 0) - h;
    });
    return v.length ? o.value.slice().sort((u, h) => {
      let x = 0;
      return v.some((w) => {
        const { columnKey: M, sorter: B, order: T } = w, _ = da(B, M);
        return _ && T && (x = _(u.rawNode, h.rawNode), x !== 0) ? (x = x * Cl(T), true) : false;
      }), x;
    }) : o.value;
  });
  function a(v) {
    let d = i.value.slice();
    return v && Mt(v.sorter) !== false ? (d = d.filter((u) => Mt(u.sorter) !== false), C(d, v), d) : v || null;
  }
  function c(v) {
    const d = a(v);
    s(d);
  }
  function s(v) {
    const { "onUpdate:sorter": d, onUpdateSorter: u, onSorterChange: h } = e;
    d && oe(d, v), u && oe(u, v), h && oe(h, v), l.value = v;
  }
  function y(v, d = "ascend") {
    if (!v) b();
    else {
      const u = t.value.find((x) => x.type !== "selection" && x.type !== "expand" && x.key === v);
      if (!(u == null ? void 0 : u.sorter)) return;
      const h = u.sorter;
      c({ columnKey: v, sorter: h, order: d });
    }
  }
  function b() {
    s(null);
  }
  function C(v, d) {
    const u = v.findIndex((h) => (d == null ? void 0 : d.columnKey) && h.columnKey === d.columnKey);
    u !== void 0 && u >= 0 ? v[u] = d : v.push(d);
  }
  return { clearSorter: b, sort: y, sortedDataRef: f, mergedSortStateRef: i, deriveNextSorter: c };
}
function fa(e, { dataRelatedColsRef: t }) {
  const o = k(() => {
    const P = (A) => {
      for (let G = 0; G < A.length; ++G) {
        const m = A[G];
        if ("children" in m) return P(m.children);
        if (m.type === "selection") return m;
      }
      return null;
    };
    return P(e.columns);
  }), n = k(() => {
    const { childrenKey: P } = e;
    return bo(e.data, { ignoreEmptyChildren: true, getKey: e.rowKey, getChildren: (A) => A[P], getDisabled: (A) => {
      var G, m;
      return !!(!((m = (G = o.value) === null || G === void 0 ? void 0 : G.disabled) === null || m === void 0) && m.call(G, A));
    } });
  }), l = Ne(() => {
    const { columns: P } = e, { length: A } = P;
    let G = null;
    for (let m = 0; m < A; ++m) {
      const F = P[m];
      if (!F.type && G === null && (G = m), "tree" in F && F.tree) return m;
    }
    return G || 0;
  }), i = N({}), { pagination: f } = e, a = N(f && f.defaultPage || 1), c = N(pn(f)), s = k(() => {
    const P = t.value.filter((m) => m.filterOptionValues !== void 0 || m.filterOptionValue !== void 0), A = {};
    return P.forEach((m) => {
      var F;
      m.type === "selection" || m.type === "expand" || (m.filterOptionValues === void 0 ? A[m.key] = (F = m.filterOptionValue) !== null && F !== void 0 ? F : null : A[m.key] = m.filterOptionValues);
    }), Object.assign(Wo(i.value), A);
  }), y = k(() => {
    const P = s.value, { columns: A } = e;
    function G(de) {
      return (me, ge) => !!~String(ge[de]).indexOf(String(me));
    }
    const { value: { treeNodes: m } } = n, F = [];
    return A.forEach((de) => {
      de.type === "selection" || de.type === "expand" || "children" in de || F.push([de.key, de]);
    }), m ? m.filter((de) => {
      const { rawNode: me } = de;
      for (const [ge, pe] of F) {
        let O = P[ge];
        if (O == null || (Array.isArray(O) || (O = [O]), !O.length)) continue;
        const ae = pe.filter === "default" ? G(ge) : pe.filter;
        if (pe && typeof ae == "function") if (pe.filterMode === "and") {
          if (O.some((xe) => !ae(xe, me))) return false;
        } else {
          if (O.some((xe) => ae(xe, me))) continue;
          return false;
        }
      }
      return true;
    }) : [];
  }), { sortedDataRef: b, deriveNextSorter: C, mergedSortStateRef: v, sort: d, clearSorter: u } = ua(e, { dataRelatedColsRef: t, filteredDataRef: y });
  t.value.forEach((P) => {
    var A;
    if (P.filter) {
      const G = P.defaultFilterOptionValues;
      P.filterMultiple ? i.value[P.key] = G || [] : G !== void 0 ? i.value[P.key] = G === null ? [] : G : i.value[P.key] = (A = P.defaultFilterOptionValue) !== null && A !== void 0 ? A : null;
    }
  });
  const h = k(() => {
    const { pagination: P } = e;
    if (P !== false) return P.page;
  }), x = k(() => {
    const { pagination: P } = e;
    if (P !== false) return P.pageSize;
  }), w = Qe(h, a), M = Qe(x, c), B = Ne(() => {
    const P = w.value;
    return e.remote ? P : Math.max(1, Math.min(Math.ceil(y.value.length / M.value), P));
  }), T = k(() => {
    const { pagination: P } = e;
    if (P) {
      const { pageCount: A } = P;
      if (A !== void 0) return A;
    }
  }), _ = k(() => {
    if (e.remote) return n.value.treeNodes;
    if (!e.pagination) return b.value;
    const P = M.value, A = (B.value - 1) * P;
    return b.value.slice(A, A + P);
  }), I = k(() => _.value.map((P) => P.rawNode));
  function q(P) {
    const { pagination: A } = e;
    if (A) {
      const { onChange: G, "onUpdate:page": m, onUpdatePage: F } = A;
      G && oe(G, P), F && oe(F, P), m && oe(m, P), E(P);
    }
  }
  function te(P) {
    const { pagination: A } = e;
    if (A) {
      const { onPageSizeChange: G, "onUpdate:pageSize": m, onUpdatePageSize: F } = A;
      G && oe(G, P), F && oe(F, P), m && oe(m, P), p(P);
    }
  }
  const le = k(() => {
    if (e.remote) {
      const { pagination: P } = e;
      if (P) {
        const { itemCount: A } = P;
        if (A !== void 0) return A;
      }
      return;
    }
    return y.value.length;
  }), ne = k(() => Object.assign(Object.assign({}, e.pagination), { onChange: void 0, onUpdatePage: void 0, onUpdatePageSize: void 0, onPageSizeChange: void 0, "onUpdate:page": q, "onUpdate:pageSize": te, page: B.value, pageSize: M.value, pageCount: le.value === void 0 ? T.value : void 0, itemCount: le.value }));
  function E(P) {
    const { "onUpdate:page": A, onPageChange: G, onUpdatePage: m } = e;
    m && oe(m, P), A && oe(A, P), G && oe(G, P), a.value = P;
  }
  function p(P) {
    const { "onUpdate:pageSize": A, onPageSizeChange: G, onUpdatePageSize: m } = e;
    G && oe(G, P), m && oe(m, P), A && oe(A, P), c.value = P;
  }
  function S(P, A) {
    const { onUpdateFilters: G, "onUpdate:filters": m, onFiltersChange: F } = e;
    G && oe(G, P, A), m && oe(m, P, A), F && oe(F, P, A), i.value = P;
  }
  function L(P, A, G, m) {
    var F;
    (F = e.onUnstableColumnResize) === null || F === void 0 || F.call(e, P, A, G, m);
  }
  function H(P) {
    E(P);
  }
  function D() {
    K();
  }
  function K() {
    X({});
  }
  function X(P) {
    Z(P);
  }
  function Z(P) {
    P ? P && (i.value = Wo(P)) : i.value = {};
  }
  return { treeMateRef: n, mergedCurrentPageRef: B, mergedPaginationRef: ne, paginatedDataRef: _, rawPaginatedDataRef: I, mergedFilterStateRef: s, mergedSortStateRef: v, hoverKeyRef: N(null), selectionColumnRef: o, childTriggerColIndexRef: l, doUpdateFilters: S, deriveNextSorter: C, doUpdatePageSize: p, doUpdatePage: E, onUnstableColumnResize: L, filter: Z, filters: X, clearFilter: D, clearFilters: K, clearSorter: u, page: H, sort: d };
}
const xa = ve({ name: "DataTable", alias: ["AdvancedTable"], props: yl, slots: Object, setup(e, { slots: t }) {
  const { mergedBorderedRef: o, mergedClsPrefixRef: n, inlineThemeDisabled: l, mergedRtlRef: i, mergedComponentPropsRef: f } = Ae(e), a = st("DataTable", i, n), c = k(() => {
    var V, J;
    return e.size || ((J = (V = f == null ? void 0 : f.value) === null || V === void 0 ? void 0 : V.DataTable) === null || J === void 0 ? void 0 : J.size) || "medium";
  }), s = k(() => {
    const { bottomBordered: V } = e;
    return o.value ? false : V !== void 0 ? V : true;
  }), y = ke("DataTable", "-data-table", ta, gr, e, n), b = N(null), C = N(null), { getResizableWidth: v, clearResizableWidth: d, doUpdateResizableWidth: u } = ia(), { rowsRef: h, colsRef: x, dataRelatedColsRef: w, hasEllipsisRef: M } = aa(e, v), { treeMateRef: B, mergedCurrentPageRef: T, paginatedDataRef: _, rawPaginatedDataRef: I, selectionColumnRef: q, hoverKeyRef: te, mergedPaginationRef: le, mergedFilterStateRef: ne, mergedSortStateRef: E, childTriggerColIndexRef: p, doUpdatePage: S, doUpdateFilters: L, onUnstableColumnResize: H, deriveNextSorter: D, filter: K, filters: X, clearFilter: Z, clearFilters: P, clearSorter: A, page: G, sort: m } = fa(e, { dataRelatedColsRef: w }), F = (V) => {
    const { fileName: J = "data.csv", keepOriginalData: re = false } = V || {}, fe = re ? e.data : I.value, Se = Pl(e.columns, fe, e.getCsvCell, e.getCsvHeader), ot = new Blob([Se], { type: "text/csv;charset=utf-8" }), Ze = URL.createObjectURL(ot);
    Ir(Ze, J.endsWith(".csv") ? J : `${J}.csv`), URL.revokeObjectURL(Ze);
  }, { doCheckAll: de, doUncheckAll: me, doCheck: ge, doUncheck: pe, headerCheckboxDisabledRef: O, someRowsCheckedRef: ae, allRowsCheckedRef: xe, mergedCheckedRowKeySetRef: ye, mergedInderminateRowKeySetRef: ze } = na(e, { selectionColumnRef: q, treeMateRef: B, paginatedDataRef: _ }), { stickyExpandedRowsRef: Me, mergedExpandedRowKeysRef: Ie, renderExpandRef: ie, expandableRef: be, doUpdateExpandedRowKeys: Pe } = ra(e, B), we = ce(e, "maxHeight"), _e = k(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || M.value ? "fixed" : e.tableLayout), { handleTableBodyScroll: De, handleTableHeaderScroll: Oe, syncScrollState: $, setHeaderScrollLeft: j, leftActiveFixedColKeyRef: Ce, leftActiveFixedChildrenColKeysRef: Ge, rightActiveFixedColKeyRef: Be, rightActiveFixedChildrenColKeysRef: Te, leftFixedColumnsRef: Ue, rightFixedColumnsRef: Fe, fixedColumnLeftMapRef: Ve, fixedColumnRightMapRef: We, xScrollableRef: Ke, explicitlyScrollableRef: Y } = sa(e, { bodyWidthRef: b, mainTableInstRef: C, mergedCurrentPageRef: T, maxHeightRef: we, mergedTableLayoutRef: _e }), { localeRef: ue } = At("DataTable");
  ct(tt, { xScrollableRef: Ke, explicitlyScrollableRef: Y, props: e, treeMateRef: B, renderExpandIconRef: ce(e, "renderExpandIcon"), loadingKeySetRef: N(/* @__PURE__ */ new Set()), slots: t, indentRef: ce(e, "indent"), childTriggerColIndexRef: p, bodyWidthRef: b, componentId: tn(), hoverKeyRef: te, mergedClsPrefixRef: n, mergedThemeRef: y, scrollXRef: k(() => e.scrollX), rowsRef: h, colsRef: x, paginatedDataRef: _, leftActiveFixedColKeyRef: Ce, leftActiveFixedChildrenColKeysRef: Ge, rightActiveFixedColKeyRef: Be, rightActiveFixedChildrenColKeysRef: Te, leftFixedColumnsRef: Ue, rightFixedColumnsRef: Fe, fixedColumnLeftMapRef: Ve, fixedColumnRightMapRef: We, mergedCurrentPageRef: T, someRowsCheckedRef: ae, allRowsCheckedRef: xe, mergedSortStateRef: E, mergedFilterStateRef: ne, loadingRef: ce(e, "loading"), rowClassNameRef: ce(e, "rowClassName"), mergedCheckedRowKeySetRef: ye, mergedExpandedRowKeysRef: Ie, mergedInderminateRowKeySetRef: ze, localeRef: ue, expandableRef: be, stickyExpandedRowsRef: Me, rowKeyRef: ce(e, "rowKey"), renderExpandRef: ie, summaryRef: ce(e, "summary"), virtualScrollRef: ce(e, "virtualScroll"), virtualScrollXRef: ce(e, "virtualScrollX"), heightForRowRef: ce(e, "heightForRow"), minRowHeightRef: ce(e, "minRowHeight"), virtualScrollHeaderRef: ce(e, "virtualScrollHeader"), headerHeightRef: ce(e, "headerHeight"), rowPropsRef: ce(e, "rowProps"), stripedRef: ce(e, "striped"), checkOptionsRef: k(() => {
    const { value: V } = q;
    return V == null ? void 0 : V.options;
  }), rawPaginatedDataRef: I, filterMenuCssVarsRef: k(() => {
    const { self: { actionDividerColor: V, actionPadding: J, actionButtonMargin: re } } = y.value;
    return { "--n-action-padding": J, "--n-action-button-margin": re, "--n-action-divider-color": V };
  }), onLoadRef: ce(e, "onLoad"), mergedTableLayoutRef: _e, maxHeightRef: we, minHeightRef: ce(e, "minHeight"), flexHeightRef: ce(e, "flexHeight"), headerCheckboxDisabledRef: O, paginationBehaviorOnFilterRef: ce(e, "paginationBehaviorOnFilter"), summaryPlacementRef: ce(e, "summaryPlacement"), filterIconPopoverPropsRef: ce(e, "filterIconPopoverProps"), scrollbarPropsRef: ce(e, "scrollbarProps"), syncScrollState: $, doUpdatePage: S, doUpdateFilters: L, getResizableWidth: v, onUnstableColumnResize: H, clearResizableWidth: d, doUpdateResizableWidth: u, deriveNextSorter: D, doCheck: ge, doUncheck: pe, doCheckAll: de, doUncheckAll: me, doUpdateExpandedRowKeys: Pe, handleTableHeaderScroll: Oe, handleTableBodyScroll: De, setHeaderScrollLeft: j, renderCell: ce(e, "renderCell") });
  const g = { filter: K, filters: X, clearFilters: P, clearSorter: A, page: G, sort: m, clearFilter: Z, downloadCsv: F, scrollTo: (V, J) => {
    var re;
    (re = C.value) === null || re === void 0 || re.scrollTo(V, J);
  } }, R = k(() => {
    const V = c.value, { common: { cubicBezierEaseInOut: J }, self: { borderColor: re, tdColorHover: fe, tdColorSorting: Se, tdColorSortingModal: ot, tdColorSortingPopover: Ze, thColorSorting: nt, thColorSortingModal: rt, thColorSortingPopover: ut, thColor: ft, thColorHover: lt, tdColor: dt, tdTextColor: ht, thTextColor: Ye, thFontWeight: vt, thButtonColorHover: kt, thIconColor: Le, thIconColorActive: He, filterSize: Lt, borderRadius: Nt, lineHeight: Dt, tdColorModal: Ut, thColorModal: Ht, borderColorModal: jt, thColorHoverModal: Kt, tdColorHoverModal: Vt, borderColorPopover: Wt, thColorPopover: qt, tdColorPopover: Xt, tdColorHoverPopover: gt, thColorHoverPopover: bt, paginationMargin: Tn, emptyPadding: On, boxShadowAfter: Mn, boxShadowBefore: Bn, sorterSize: In, resizableContainerSize: _n, resizableSize: $n, loadingColor: En, loadingSize: An, opacityLoading: Ln, tdColorStriped: Nn, tdColorStripedModal: Dn, tdColorStripedPopover: Un, [he("fontSize", V)]: Hn, [he("thPadding", V)]: jn, [he("tdPadding", V)]: Kn } } = y.value;
    return { "--n-font-size": Hn, "--n-th-padding": jn, "--n-td-padding": Kn, "--n-bezier": J, "--n-border-radius": Nt, "--n-line-height": Dt, "--n-border-color": re, "--n-border-color-modal": jt, "--n-border-color-popover": Wt, "--n-th-color": ft, "--n-th-color-hover": lt, "--n-th-color-modal": Ht, "--n-th-color-hover-modal": Kt, "--n-th-color-popover": qt, "--n-th-color-hover-popover": bt, "--n-td-color": dt, "--n-td-color-hover": fe, "--n-td-color-modal": Ut, "--n-td-color-hover-modal": Vt, "--n-td-color-popover": Xt, "--n-td-color-hover-popover": gt, "--n-th-text-color": Ye, "--n-td-text-color": ht, "--n-th-font-weight": vt, "--n-th-button-color-hover": kt, "--n-th-icon-color": Le, "--n-th-icon-color-active": He, "--n-filter-size": Lt, "--n-pagination-margin": Tn, "--n-empty-padding": On, "--n-box-shadow-before": Bn, "--n-box-shadow-after": Mn, "--n-sorter-size": In, "--n-resizable-container-size": _n, "--n-resizable-size": $n, "--n-loading-size": An, "--n-loading-color": En, "--n-opacity-loading": Ln, "--n-td-color-striped": Nn, "--n-td-color-striped-modal": Dn, "--n-td-color-striped-popover": Un, "--n-td-color-sorting": Se, "--n-td-color-sorting-modal": ot, "--n-td-color-sorting-popover": Ze, "--n-th-color-sorting": nt, "--n-th-color-sorting-modal": rt, "--n-th-color-sorting-popover": ut };
  }), W = l ? et("data-table", k(() => c.value[0]), R, e) : void 0, se = k(() => {
    if (!e.pagination) return false;
    if (e.paginateSinglePage) return true;
    const V = le.value, { pageCount: J } = V;
    return J !== void 0 ? J > 1 : V.itemCount && V.pageSize && V.itemCount > V.pageSize;
  });
  return Object.assign({ mainTableInstRef: C, mergedClsPrefix: n, rtlEnabled: a, mergedTheme: y, paginatedData: _, mergedBordered: o, mergedBottomBordered: s, mergedPagination: le, mergedShowPagination: se, cssVars: l ? void 0 : R, themeClass: W == null ? void 0 : W.themeClass, onRender: W == null ? void 0 : W.onRender }, g);
}, render() {
  const { mergedClsPrefix: e, themeClass: t, onRender: o, $slots: n, spinProps: l } = this;
  return o == null ? void 0 : o(), r("div", { class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, { [`${e}-data-table--bordered`]: this.mergedBordered, [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered, [`${e}-data-table--single-line`]: this.singleLine, [`${e}-data-table--single-column`]: this.singleColumn, [`${e}-data-table--loading`]: this.loading, [`${e}-data-table--flex-height`]: this.flexHeight }], style: this.cssVars }, r("div", { class: `${e}-data-table-wrapper` }, r(ea, { ref: "mainTableInstRef" })), this.mergedShowPagination ? r("div", { class: `${e}-data-table__pagination` }, r(ml, Object.assign({ theme: this.mergedTheme.peers.Pagination, themeOverrides: this.mergedTheme.peerOverrides.Pagination, disabled: this.loading }, this.mergedPagination))) : null, r(co, { name: "fade-in-scale-up-transition" }, { default: () => this.loading ? r("div", { class: `${e}-data-table-loading-wrapper` }, Et(n.loading, () => [r(uo, Object.assign({ clsPrefix: e, strokeWidth: 20 }, l))])) : null }));
} });
export {
  _o as B,
  Ur as F,
  Jt as N,
  po as V,
  vl as _,
  xa as a,
  $o as b,
  Ao as c,
  Eo as d,
  ya as e,
  _r as m
};
