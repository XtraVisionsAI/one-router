import { bk as ne, bK as ie, bo as ae, bL as Re, e as v, aE as Ee, f as F, d as se, j as p, a5 as Ie, ag as He, au as Oe, r as E, t as _e, V as le, ai as Ne, g, h as f, H as ee, G as Fe, Z as De, aB as Me, k as Ke, l as ce, _ as je, m as Ge, a as O, i as Ve, N as Ae, I as We, aA as qe, J as n, F as _ } from "./index-DgE7LE3Y.js";
import { r as oe, u as Qe, c as Le, i as Xe } from "./use-form-item-DYUW7DU-.js";
const D = typeof document < "u" && typeof window < "u";
function re(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Ze = /^(\d|\.)+$/, te = /(\d|\.)+/;
function Co(e, { c: r = 1, offset: t = 0, attachPx: a = true } = {}) {
  if (typeof e == "number") {
    const l = (e + t) * r;
    return l === 0 ? "0" : `${l}px`;
  } else if (typeof e == "string") if (Ze.test(e)) {
    const l = (Number(e) + t) * r;
    return a ? l === 0 ? "0" : `${l}px` : `${l}`;
  } else {
    const l = te.exec(e);
    return l ? e.replace(te, String((Number(l[0]) + t) * r)) : e;
  }
  return e;
}
var Ue = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ye = /^\w*$/;
function Je(e, r) {
  if (ne(e)) return false;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || ie(e) ? true : Ye.test(e) || !Ue.test(e) || r != null && e in Object(r);
}
var eo = "Expected a function";
function X(e, r) {
  if (typeof e != "function" || r != null && typeof r != "function") throw new TypeError(eo);
  var t = function() {
    var a = arguments, l = r ? r.apply(this, a) : a[0], x = t.cache;
    if (x.has(l)) return x.get(l);
    var R = e.apply(this, a);
    return t.cache = x.set(l, R) || x, R;
  };
  return t.cache = new (X.Cache || ae)(), t;
}
X.Cache = ae;
var oo = 500;
function ro(e) {
  var r = X(e, function(a) {
    return t.size === oo && t.clear(), a;
  }), t = r.cache;
  return r;
}
var to = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, no = /\\(\\)?/g, io = ro(function(e) {
  var r = [];
  return e.charCodeAt(0) === 46 && r.push(""), e.replace(to, function(t, a, l, x) {
    r.push(l ? x.replace(no, "$1") : a || t);
  }), r;
});
function ao(e, r) {
  return ne(e) ? e : Je(e, r) ? [e] : io(Re(e));
}
function so(e) {
  if (typeof e == "string" || ie(e)) return e;
  var r = e + "";
  return r == "0" && 1 / e == -1 / 0 ? "-0" : r;
}
function lo(e, r) {
  r = ao(r, e);
  for (var t = 0, a = r.length; e != null && t < a; ) e = e[so(r[t++])];
  return t && t == a ? e : void 0;
}
function wo(e, r, t) {
  var a = e == null ? void 0 : lo(e, r);
  return a === void 0 ? t : a;
}
const { cubicBezierEaseInOut: w } = Ee;
function co({ duration: e = ".2s", delay: r = ".1s" } = {}) {
  return [v("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", { opacity: 1 }), v("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), v("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${w},
 max-width ${e} ${w} ${r},
 margin-left ${e} ${w} ${r},
 margin-right ${e} ${w} ${r};
 `), v("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${w} ${r},
 max-width ${e} ${w},
 margin-left ${e} ${w},
 margin-right ${e} ${w};
 `)];
}
const uo = F("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), bo = se({ name: "BaseWave", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  Ie("-base-wave", uo, _e(e, "clsPrefix"));
  const r = E(null), t = E(false);
  let a = null;
  return He(() => {
    a !== null && window.clearTimeout(a);
  }), { active: t, selfRef: r, play() {
    a !== null && (window.clearTimeout(a), t.value = false, a = null), Oe(() => {
      var l;
      (l = r.value) === null || l === void 0 || l.offsetHeight, t.value = true, a = window.setTimeout(() => {
        t.value = false, a = null;
      }, 1e3);
    });
  } };
}, render() {
  const { clsPrefix: e } = this;
  return p("div", { ref: "selfRef", "aria-hidden": true, class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`] });
} }), fo = D && "chrome" in window;
D && navigator.userAgent.includes("Firefox");
const ho = D && navigator.userAgent.includes("Safari") && !fo;
function B(e) {
  return le(e, [255, 255, 255, 0.16]);
}
function N(e) {
  return le(e, [0, 0, 0, 0.12]);
}
const vo = Ne("n-button-group"), po = v([F("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [g("color", [f("border", { borderColor: "var(--n-border-color)" }), g("disabled", [f("border", { borderColor: "var(--n-border-color-disabled)" })]), ee("disabled", [v("&:focus", [f("state-border", { borderColor: "var(--n-border-color-focus)" })]), v("&:hover", [f("state-border", { borderColor: "var(--n-border-color-hover)" })]), v("&:active", [f("state-border", { borderColor: "var(--n-border-color-pressed)" })]), g("pressed", [f("state-border", { borderColor: "var(--n-border-color-pressed)" })])])]), g("disabled", { backgroundColor: "var(--n-color-disabled)", color: "var(--n-text-color-disabled)" }, [f("border", { border: "var(--n-border-disabled)" })]), ee("disabled", [v("&:focus", { backgroundColor: "var(--n-color-focus)", color: "var(--n-text-color-focus)" }, [f("state-border", { border: "var(--n-border-focus)" })]), v("&:hover", { backgroundColor: "var(--n-color-hover)", color: "var(--n-text-color-hover)" }, [f("state-border", { border: "var(--n-border-hover)" })]), v("&:active", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [f("state-border", { border: "var(--n-border-pressed)" })]), g("pressed", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [f("state-border", { border: "var(--n-border-pressed)" })])]), g("loading", "cursor: wait;"), F("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [g("active", { zIndex: 1, animationName: "button-wave-spread, button-wave-opacity" })]), D && "MozBoxSizing" in document.createElement("div").style ? v("&::moz-focus-inner", { border: 0 }) : null, f("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), f("border", `
 border: var(--n-border);
 `), f("state-border", `
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `), f("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [F("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [Fe({ top: "50%", originalTransform: "translateY(-50%)" })]), co()]), f("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [v("~", [f("icon", { margin: "var(--n-icon-margin)", marginRight: 0 })])]), g("block", `
 display: flex;
 width: 100%;
 `), g("dashed", [f("border, state-border", { borderStyle: "dashed !important" })]), g("disabled", { cursor: "not-allowed", opacity: "var(--n-opacity-disabled)" })]), v("@keyframes button-wave-spread", { from: { boxShadow: "0 0 0.5px 0 var(--n-ripple-color)" }, to: { boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)" } }), v("@keyframes button-wave-opacity", { from: { opacity: "var(--n-wave-opacity)" }, to: { opacity: 0 } })]), mo = Object.assign(Object.assign({}, ce.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, tag: { type: String, default: "button" }, type: { type: String, default: "default" }, dashed: Boolean, renderIcon: Function, iconPlacement: { type: String, default: "left" }, attrType: { type: String, default: "button" }, bordered: { type: Boolean, default: true }, onClick: [Function, Array], nativeFocusBehavior: { type: Boolean, default: !ho }, spinProps: Object }), yo = se({ name: "Button", props: mo, slots: Object, setup(e) {
  const r = E(null), t = E(null), a = E(false), l = Me(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), x = Ve(vo, {}), { inlineThemeDisabled: R, mergedClsPrefixRef: M, mergedRtlRef: de, mergedComponentPropsRef: K } = Ke(e), { mergedSizeRef: j } = Qe({}, { defaultSize: "medium", mergedSize: (i) => {
    var b, m;
    const { size: o } = e;
    if (o) return o;
    const { size: T } = x;
    if (T) return T;
    const { mergedSize: $ } = i || {};
    if ($) return $.value;
    const k = (m = (b = K == null ? void 0 : K.value) === null || b === void 0 ? void 0 : b.Button) === null || m === void 0 ? void 0 : m.size;
    return k || "medium";
  } }), G = O(() => e.focusable && !e.disabled), ue = (i) => {
    var b;
    G.value || i.preventDefault(), !e.nativeFocusBehavior && (i.preventDefault(), !e.disabled && G.value && ((b = r.value) === null || b === void 0 || b.focus({ preventScroll: true })));
  }, be = (i) => {
    var b;
    if (!e.disabled && !e.loading) {
      const { onClick: m } = e;
      m && Le(m, i), e.text || (b = t.value) === null || b === void 0 || b.play();
    }
  }, fe = (i) => {
    switch (i.key) {
      case "Enter":
        if (!e.keyboard) return;
        a.value = false;
    }
  }, he = (i) => {
    switch (i.key) {
      case "Enter":
        if (!e.keyboard || e.loading) {
          i.preventDefault();
          return;
        }
        a.value = true;
    }
  }, ve = () => {
    a.value = false;
  }, pe = ce("Button", "-button", po, qe, e, M), me = je("Button", de, M), Z = O(() => {
    const i = pe.value, { common: { cubicBezierEaseInOut: b, cubicBezierEaseOut: m }, self: o } = i, { rippleDuration: T, opacityDisabled: $, fontWeight: k, fontWeightStrong: V } = o, y = j.value, { dashed: A, type: z, ghost: W, text: C, color: c, round: U, circle: q, textColor: S, secondary: ye, tertiary: Y, quaternary: ge, strong: xe } = e, Ce = { "--n-font-weight": xe ? V : k };
    let d = { "--n-color": "initial", "--n-color-hover": "initial", "--n-color-pressed": "initial", "--n-color-focus": "initial", "--n-color-disabled": "initial", "--n-ripple-color": "initial", "--n-text-color": "initial", "--n-text-color-hover": "initial", "--n-text-color-pressed": "initial", "--n-text-color-focus": "initial", "--n-text-color-disabled": "initial" };
    const I = z === "tertiary", J = z === "default", s = I ? "default" : z;
    if (C) {
      const u = S || c;
      d = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": "#0000", "--n-text-color": u || o[n("textColorText", s)], "--n-text-color-hover": u ? B(u) : o[n("textColorTextHover", s)], "--n-text-color-pressed": u ? N(u) : o[n("textColorTextPressed", s)], "--n-text-color-focus": u ? B(u) : o[n("textColorTextHover", s)], "--n-text-color-disabled": u || o[n("textColorTextDisabled", s)] };
    } else if (W || A) {
      const u = S || c;
      d = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": c || o[n("rippleColor", s)], "--n-text-color": u || o[n("textColorGhost", s)], "--n-text-color-hover": u ? B(u) : o[n("textColorGhostHover", s)], "--n-text-color-pressed": u ? N(u) : o[n("textColorGhostPressed", s)], "--n-text-color-focus": u ? B(u) : o[n("textColorGhostHover", s)], "--n-text-color-disabled": u || o[n("textColorGhostDisabled", s)] };
    } else if (ye) {
      const u = J ? o.textColor : I ? o.textColorTertiary : o[n("color", s)], h = c || u, H = z !== "default" && z !== "tertiary";
      d = { "--n-color": H ? _(h, { alpha: Number(o.colorOpacitySecondary) }) : o.colorSecondary, "--n-color-hover": H ? _(h, { alpha: Number(o.colorOpacitySecondaryHover) }) : o.colorSecondaryHover, "--n-color-pressed": H ? _(h, { alpha: Number(o.colorOpacitySecondaryPressed) }) : o.colorSecondaryPressed, "--n-color-focus": H ? _(h, { alpha: Number(o.colorOpacitySecondaryHover) }) : o.colorSecondaryHover, "--n-color-disabled": o.colorSecondary, "--n-ripple-color": "#0000", "--n-text-color": h, "--n-text-color-hover": h, "--n-text-color-pressed": h, "--n-text-color-focus": h, "--n-text-color-disabled": h };
    } else if (Y || ge) {
      const u = J ? o.textColor : I ? o.textColorTertiary : o[n("color", s)], h = c || u;
      Y ? (d["--n-color"] = o.colorTertiary, d["--n-color-hover"] = o.colorTertiaryHover, d["--n-color-pressed"] = o.colorTertiaryPressed, d["--n-color-focus"] = o.colorSecondaryHover, d["--n-color-disabled"] = o.colorTertiary) : (d["--n-color"] = o.colorQuaternary, d["--n-color-hover"] = o.colorQuaternaryHover, d["--n-color-pressed"] = o.colorQuaternaryPressed, d["--n-color-focus"] = o.colorQuaternaryHover, d["--n-color-disabled"] = o.colorQuaternary), d["--n-ripple-color"] = "#0000", d["--n-text-color"] = h, d["--n-text-color-hover"] = h, d["--n-text-color-pressed"] = h, d["--n-text-color-focus"] = h, d["--n-text-color-disabled"] = h;
    } else d = { "--n-color": c || o[n("color", s)], "--n-color-hover": c ? B(c) : o[n("colorHover", s)], "--n-color-pressed": c ? N(c) : o[n("colorPressed", s)], "--n-color-focus": c ? B(c) : o[n("colorFocus", s)], "--n-color-disabled": c || o[n("colorDisabled", s)], "--n-ripple-color": c || o[n("rippleColor", s)], "--n-text-color": S || (c ? o.textColorPrimary : I ? o.textColorTertiary : o[n("textColor", s)]), "--n-text-color-hover": S || (c ? o.textColorHoverPrimary : o[n("textColorHover", s)]), "--n-text-color-pressed": S || (c ? o.textColorPressedPrimary : o[n("textColorPressed", s)]), "--n-text-color-focus": S || (c ? o.textColorFocusPrimary : o[n("textColorFocus", s)]), "--n-text-color-disabled": S || (c ? o.textColorDisabledPrimary : o[n("textColorDisabled", s)]) };
    let Q = { "--n-border": "initial", "--n-border-hover": "initial", "--n-border-pressed": "initial", "--n-border-focus": "initial", "--n-border-disabled": "initial" };
    C ? Q = { "--n-border": "none", "--n-border-hover": "none", "--n-border-pressed": "none", "--n-border-focus": "none", "--n-border-disabled": "none" } : Q = { "--n-border": o[n("border", s)], "--n-border-hover": o[n("borderHover", s)], "--n-border-pressed": o[n("borderPressed", s)], "--n-border-focus": o[n("borderFocus", s)], "--n-border-disabled": o[n("borderDisabled", s)] };
    const { [n("height", y)]: L, [n("fontSize", y)]: we, [n("padding", y)]: $e, [n("paddingRound", y)]: ze, [n("iconSize", y)]: Se, [n("borderRadius", y)]: Be, [n("iconMargin", y)]: Pe, waveOpacity: Te } = o, ke = { "--n-width": q && !C ? L : "initial", "--n-height": C ? "initial" : L, "--n-font-size": we, "--n-padding": q || C ? "initial" : U ? ze : $e, "--n-icon-size": Se, "--n-icon-margin": Pe, "--n-border-radius": C ? "initial" : q || U ? L : Be };
    return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": b, "--n-bezier-ease-out": m, "--n-ripple-duration": T, "--n-opacity-disabled": $, "--n-wave-opacity": Te }, Ce), d), Q), ke);
  }), P = R ? Ge("button", O(() => {
    let i = "";
    const { dashed: b, type: m, ghost: o, text: T, color: $, round: k, circle: V, textColor: y, secondary: A, tertiary: z, quaternary: W, strong: C } = e;
    b && (i += "a"), o && (i += "b"), T && (i += "c"), k && (i += "d"), V && (i += "e"), A && (i += "f"), z && (i += "g"), W && (i += "h"), C && (i += "i"), $ && (i += `j${re($)}`), y && (i += `k${re(y)}`);
    const { value: c } = j;
    return i += `l${c[0]}`, i += `m${m[0]}`, i;
  }), Z, e) : void 0;
  return { selfElRef: r, waveElRef: t, mergedClsPrefix: M, mergedFocusable: G, mergedSize: j, showBorder: l, enterPressed: a, rtlEnabled: me, handleMousedown: ue, handleKeydown: he, handleBlur: ve, handleKeyup: fe, handleClick: be, customColorCssVars: O(() => {
    const { color: i } = e;
    if (!i) return null;
    const b = B(i);
    return { "--n-border-color": i, "--n-border-color-hover": b, "--n-border-color-pressed": N(i), "--n-border-color-focus": b, "--n-border-color-disabled": i };
  }), cssVars: R ? void 0 : Z, themeClass: P == null ? void 0 : P.themeClass, onRender: P == null ? void 0 : P.onRender };
}, render() {
  const { mergedClsPrefix: e, tag: r, onRender: t } = this;
  t == null ? void 0 : t();
  const a = oe(this.$slots.default, (l) => l && p("span", { class: `${e}-button__content` }, l));
  return p(r, { ref: "selfElRef", class: [this.themeClass, `${e}-button`, `${e}-button--${this.type}-type`, `${e}-button--${this.mergedSize}-type`, this.rtlEnabled && `${e}-button--rtl`, this.disabled && `${e}-button--disabled`, this.block && `${e}-button--block`, this.enterPressed && `${e}-button--pressed`, !this.text && this.dashed && `${e}-button--dashed`, this.color && `${e}-button--color`, this.secondary && `${e}-button--secondary`, this.loading && `${e}-button--loading`, this.ghost && `${e}-button--ghost`], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown }, this.iconPlacement === "right" && a, p(De, { width: true }, { default: () => oe(this.$slots.icon, (l) => (this.loading || this.renderIcon || l) && p("span", { class: `${e}-button__icon`, style: { margin: Xe(this.$slots.default) ? "0" : "" } }, p(Ae, null, { default: () => this.loading ? p(We, Object.assign({ clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }, this.spinProps)) : p("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : l) }))) }), this.iconPlacement === "left" && a, this.text ? null : p(bo, { ref: "waveElRef", clsPrefix: e }), this.showBorder ? p("div", { "aria-hidden": true, class: `${e}-button__border`, style: this.customColorCssVars }) : null, this.showBorder ? p("div", { "aria-hidden": true, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null);
} }), $o = yo;
export {
  yo as B,
  $o as X,
  ho as a,
  ao as b,
  re as c,
  Je as d,
  lo as e,
  Co as f,
  wo as g,
  D as i,
  so as t
};
