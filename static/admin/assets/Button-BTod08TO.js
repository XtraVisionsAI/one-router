import { e as b, bi as Be, f as j, d as oe, j as p, a5 as Se, ag as Pe, au as Te, r as k, t as ke, V as re, ai as Re, g as y, h as d, H as U, G as He, Z as Ie, aB as Ee, k as Oe, l as te, _ as je, m as Fe, a as I, i as _e, N as De, I as Ne, aA as Ge, J as r, F as E } from "./index-05ypFx4P.js";
import { r as Z, u as Ke, c as Me, i as Ve } from "./use-form-item-C0_shOgu.js";
const F = typeof document < "u" && typeof window < "u";
function ee(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const { cubicBezierEaseInOut: C } = Be;
function We({ duration: e = ".2s", delay: f = ".1s" } = {}) {
  return [b("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", { opacity: 1 }), b("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), b("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${C},
 max-width ${e} ${C} ${f},
 margin-left ${e} ${C} ${f},
 margin-right ${e} ${C} ${f};
 `), b("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${C} ${f},
 max-width ${e} ${C},
 margin-left ${e} ${C},
 margin-right ${e} ${C};
 `)];
}
const qe = j("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), Qe = oe({ name: "BaseWave", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  Se("-base-wave", qe, ke(e, "clsPrefix"));
  const f = k(null), h = k(false);
  let u = null;
  return Pe(() => {
    u !== null && window.clearTimeout(u);
  }), { active: h, selfRef: f, play() {
    u !== null && (window.clearTimeout(u), h.value = false, u = null), Te(() => {
      var v;
      (v = f.value) === null || v === void 0 || v.offsetHeight, h.value = true, u = window.setTimeout(() => {
        h.value = false, u = null;
      }, 1e3);
    });
  } };
}, render() {
  const { clsPrefix: e } = this;
  return p("div", { ref: "selfRef", "aria-hidden": true, class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`] });
} }), Ae = F && "chrome" in window;
F && navigator.userAgent.includes("Firefox");
const Le = F && navigator.userAgent.includes("Safari") && !Ae;
function B(e) {
  return re(e, [255, 255, 255, 0.16]);
}
function O(e) {
  return re(e, [0, 0, 0, 0.12]);
}
const Xe = Re("n-button-group"), Ye = b([j("button", `
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
 `, [y("color", [d("border", { borderColor: "var(--n-border-color)" }), y("disabled", [d("border", { borderColor: "var(--n-border-color-disabled)" })]), U("disabled", [b("&:focus", [d("state-border", { borderColor: "var(--n-border-color-focus)" })]), b("&:hover", [d("state-border", { borderColor: "var(--n-border-color-hover)" })]), b("&:active", [d("state-border", { borderColor: "var(--n-border-color-pressed)" })]), y("pressed", [d("state-border", { borderColor: "var(--n-border-color-pressed)" })])])]), y("disabled", { backgroundColor: "var(--n-color-disabled)", color: "var(--n-text-color-disabled)" }, [d("border", { border: "var(--n-border-disabled)" })]), U("disabled", [b("&:focus", { backgroundColor: "var(--n-color-focus)", color: "var(--n-text-color-focus)" }, [d("state-border", { border: "var(--n-border-focus)" })]), b("&:hover", { backgroundColor: "var(--n-color-hover)", color: "var(--n-text-color-hover)" }, [d("state-border", { border: "var(--n-border-hover)" })]), b("&:active", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [d("state-border", { border: "var(--n-border-pressed)" })]), y("pressed", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [d("state-border", { border: "var(--n-border-pressed)" })])]), y("loading", "cursor: wait;"), j("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [y("active", { zIndex: 1, animationName: "button-wave-spread, button-wave-opacity" })]), F && "MozBoxSizing" in document.createElement("div").style ? b("&::moz-focus-inner", { border: 0 }) : null, d("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), d("border", `
 border: var(--n-border);
 `), d("state-border", `
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `), d("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [j("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [He({ top: "50%", originalTransform: "translateY(-50%)" })]), We()]), d("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [b("~", [d("icon", { margin: "var(--n-icon-margin)", marginRight: 0 })])]), y("block", `
 display: flex;
 width: 100%;
 `), y("dashed", [d("border, state-border", { borderStyle: "dashed !important" })]), y("disabled", { cursor: "not-allowed", opacity: "var(--n-opacity-disabled)" })]), b("@keyframes button-wave-spread", { from: { boxShadow: "0 0 0.5px 0 var(--n-ripple-color)" }, to: { boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)" } }), b("@keyframes button-wave-opacity", { from: { opacity: "var(--n-wave-opacity)" }, to: { opacity: 0 } })]), Je = Object.assign(Object.assign({}, te.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, tag: { type: String, default: "button" }, type: { type: String, default: "default" }, dashed: Boolean, renderIcon: Function, iconPlacement: { type: String, default: "left" }, attrType: { type: String, default: "button" }, bordered: { type: Boolean, default: true }, onClick: [Function, Array], nativeFocusBehavior: { type: Boolean, default: !Le }, spinProps: Object }), Ue = oe({ name: "Button", props: Je, slots: Object, setup(e) {
  const f = k(null), h = k(null), u = k(false), v = Ee(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), ne = _e(Xe, {}), { inlineThemeDisabled: A, mergedClsPrefixRef: _, mergedRtlRef: ie, mergedComponentPropsRef: D } = Oe(e), { mergedSizeRef: N } = Ke({}, { defaultSize: "medium", mergedSize: (t) => {
    var l, g;
    const { size: o } = e;
    if (o) return o;
    const { size: P } = ne;
    if (P) return P;
    const { mergedSize: w } = t || {};
    if (w) return w.value;
    const T = (g = (l = D == null ? void 0 : D.value) === null || l === void 0 ? void 0 : l.Button) === null || g === void 0 ? void 0 : g.size;
    return T || "medium";
  } }), G = I(() => e.focusable && !e.disabled), ae = (t) => {
    var l;
    G.value || t.preventDefault(), !e.nativeFocusBehavior && (t.preventDefault(), !e.disabled && G.value && ((l = f.value) === null || l === void 0 || l.focus({ preventScroll: true })));
  }, se = (t) => {
    var l;
    if (!e.disabled && !e.loading) {
      const { onClick: g } = e;
      g && Me(g, t), e.text || (l = h.value) === null || l === void 0 || l.play();
    }
  }, le = (t) => {
    switch (t.key) {
      case "Enter":
        if (!e.keyboard) return;
        u.value = false;
    }
  }, de = (t) => {
    switch (t.key) {
      case "Enter":
        if (!e.keyboard || e.loading) {
          t.preventDefault();
          return;
        }
        u.value = true;
    }
  }, ce = () => {
    u.value = false;
  }, ue = te("Button", "-button", Ye, Ge, e, _), be = je("Button", ie, _), L = I(() => {
    const t = ue.value, { common: { cubicBezierEaseInOut: l, cubicBezierEaseOut: g }, self: o } = t, { rippleDuration: P, opacityDisabled: w, fontWeight: T, fontWeightStrong: K } = o, m = N.value, { dashed: M, type: $, ghost: V, text: x, color: i, round: X, circle: W, textColor: z, secondary: fe, tertiary: Y, quaternary: he, strong: ve } = e, pe = { "--n-font-weight": ve ? K : T };
    let a = { "--n-color": "initial", "--n-color-hover": "initial", "--n-color-pressed": "initial", "--n-color-focus": "initial", "--n-color-disabled": "initial", "--n-ripple-color": "initial", "--n-text-color": "initial", "--n-text-color-hover": "initial", "--n-text-color-pressed": "initial", "--n-text-color-focus": "initial", "--n-text-color-disabled": "initial" };
    const R = $ === "tertiary", J = $ === "default", n = R ? "default" : $;
    if (x) {
      const s = z || i;
      a = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": "#0000", "--n-text-color": s || o[r("textColorText", n)], "--n-text-color-hover": s ? B(s) : o[r("textColorTextHover", n)], "--n-text-color-pressed": s ? O(s) : o[r("textColorTextPressed", n)], "--n-text-color-focus": s ? B(s) : o[r("textColorTextHover", n)], "--n-text-color-disabled": s || o[r("textColorTextDisabled", n)] };
    } else if (V || M) {
      const s = z || i;
      a = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": i || o[r("rippleColor", n)], "--n-text-color": s || o[r("textColorGhost", n)], "--n-text-color-hover": s ? B(s) : o[r("textColorGhostHover", n)], "--n-text-color-pressed": s ? O(s) : o[r("textColorGhostPressed", n)], "--n-text-color-focus": s ? B(s) : o[r("textColorGhostHover", n)], "--n-text-color-disabled": s || o[r("textColorGhostDisabled", n)] };
    } else if (fe) {
      const s = J ? o.textColor : R ? o.textColorTertiary : o[r("color", n)], c = i || s, H = $ !== "default" && $ !== "tertiary";
      a = { "--n-color": H ? E(c, { alpha: Number(o.colorOpacitySecondary) }) : o.colorSecondary, "--n-color-hover": H ? E(c, { alpha: Number(o.colorOpacitySecondaryHover) }) : o.colorSecondaryHover, "--n-color-pressed": H ? E(c, { alpha: Number(o.colorOpacitySecondaryPressed) }) : o.colorSecondaryPressed, "--n-color-focus": H ? E(c, { alpha: Number(o.colorOpacitySecondaryHover) }) : o.colorSecondaryHover, "--n-color-disabled": o.colorSecondary, "--n-ripple-color": "#0000", "--n-text-color": c, "--n-text-color-hover": c, "--n-text-color-pressed": c, "--n-text-color-focus": c, "--n-text-color-disabled": c };
    } else if (Y || he) {
      const s = J ? o.textColor : R ? o.textColorTertiary : o[r("color", n)], c = i || s;
      Y ? (a["--n-color"] = o.colorTertiary, a["--n-color-hover"] = o.colorTertiaryHover, a["--n-color-pressed"] = o.colorTertiaryPressed, a["--n-color-focus"] = o.colorSecondaryHover, a["--n-color-disabled"] = o.colorTertiary) : (a["--n-color"] = o.colorQuaternary, a["--n-color-hover"] = o.colorQuaternaryHover, a["--n-color-pressed"] = o.colorQuaternaryPressed, a["--n-color-focus"] = o.colorQuaternaryHover, a["--n-color-disabled"] = o.colorQuaternary), a["--n-ripple-color"] = "#0000", a["--n-text-color"] = c, a["--n-text-color-hover"] = c, a["--n-text-color-pressed"] = c, a["--n-text-color-focus"] = c, a["--n-text-color-disabled"] = c;
    } else a = { "--n-color": i || o[r("color", n)], "--n-color-hover": i ? B(i) : o[r("colorHover", n)], "--n-color-pressed": i ? O(i) : o[r("colorPressed", n)], "--n-color-focus": i ? B(i) : o[r("colorFocus", n)], "--n-color-disabled": i || o[r("colorDisabled", n)], "--n-ripple-color": i || o[r("rippleColor", n)], "--n-text-color": z || (i ? o.textColorPrimary : R ? o.textColorTertiary : o[r("textColor", n)]), "--n-text-color-hover": z || (i ? o.textColorHoverPrimary : o[r("textColorHover", n)]), "--n-text-color-pressed": z || (i ? o.textColorPressedPrimary : o[r("textColorPressed", n)]), "--n-text-color-focus": z || (i ? o.textColorFocusPrimary : o[r("textColorFocus", n)]), "--n-text-color-disabled": z || (i ? o.textColorDisabledPrimary : o[r("textColorDisabled", n)]) };
    let q = { "--n-border": "initial", "--n-border-hover": "initial", "--n-border-pressed": "initial", "--n-border-focus": "initial", "--n-border-disabled": "initial" };
    x ? q = { "--n-border": "none", "--n-border-hover": "none", "--n-border-pressed": "none", "--n-border-focus": "none", "--n-border-disabled": "none" } : q = { "--n-border": o[r("border", n)], "--n-border-hover": o[r("borderHover", n)], "--n-border-pressed": o[r("borderPressed", n)], "--n-border-focus": o[r("borderFocus", n)], "--n-border-disabled": o[r("borderDisabled", n)] };
    const { [r("height", m)]: Q, [r("fontSize", m)]: ge, [r("padding", m)]: me, [r("paddingRound", m)]: ye, [r("iconSize", m)]: xe, [r("borderRadius", m)]: Ce, [r("iconMargin", m)]: we, waveOpacity: $e } = o, ze = { "--n-width": W && !x ? Q : "initial", "--n-height": x ? "initial" : Q, "--n-font-size": ge, "--n-padding": W || x ? "initial" : X ? ye : me, "--n-icon-size": xe, "--n-icon-margin": we, "--n-border-radius": x ? "initial" : W || X ? Q : Ce };
    return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": l, "--n-bezier-ease-out": g, "--n-ripple-duration": P, "--n-opacity-disabled": w, "--n-wave-opacity": $e }, pe), a), q), ze);
  }), S = A ? Fe("button", I(() => {
    let t = "";
    const { dashed: l, type: g, ghost: o, text: P, color: w, round: T, circle: K, textColor: m, secondary: M, tertiary: $, quaternary: V, strong: x } = e;
    l && (t += "a"), o && (t += "b"), P && (t += "c"), T && (t += "d"), K && (t += "e"), M && (t += "f"), $ && (t += "g"), V && (t += "h"), x && (t += "i"), w && (t += `j${ee(w)}`), m && (t += `k${ee(m)}`);
    const { value: i } = N;
    return t += `l${i[0]}`, t += `m${g[0]}`, t;
  }), L, e) : void 0;
  return { selfElRef: f, waveElRef: h, mergedClsPrefix: _, mergedFocusable: G, mergedSize: N, showBorder: v, enterPressed: u, rtlEnabled: be, handleMousedown: ae, handleKeydown: de, handleBlur: ce, handleKeyup: le, handleClick: se, customColorCssVars: I(() => {
    const { color: t } = e;
    if (!t) return null;
    const l = B(t);
    return { "--n-border-color": t, "--n-border-color-hover": l, "--n-border-color-pressed": O(t), "--n-border-color-focus": l, "--n-border-color-disabled": t };
  }), cssVars: A ? void 0 : L, themeClass: S == null ? void 0 : S.themeClass, onRender: S == null ? void 0 : S.onRender };
}, render() {
  const { mergedClsPrefix: e, tag: f, onRender: h } = this;
  h == null ? void 0 : h();
  const u = Z(this.$slots.default, (v) => v && p("span", { class: `${e}-button__content` }, v));
  return p(f, { ref: "selfElRef", class: [this.themeClass, `${e}-button`, `${e}-button--${this.type}-type`, `${e}-button--${this.mergedSize}-type`, this.rtlEnabled && `${e}-button--rtl`, this.disabled && `${e}-button--disabled`, this.block && `${e}-button--block`, this.enterPressed && `${e}-button--pressed`, !this.text && this.dashed && `${e}-button--dashed`, this.color && `${e}-button--color`, this.secondary && `${e}-button--secondary`, this.loading && `${e}-button--loading`, this.ghost && `${e}-button--ghost`], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown }, this.iconPlacement === "right" && u, p(Ie, { width: true }, { default: () => Z(this.$slots.icon, (v) => (this.loading || this.renderIcon || v) && p("span", { class: `${e}-button__icon`, style: { margin: Ve(this.$slots.default) ? "0" : "" } }, p(De, null, { default: () => this.loading ? p(Ne, Object.assign({ clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }, this.spinProps)) : p("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : v) }))) }), this.iconPlacement === "left" && u, this.text ? null : p(Qe, { ref: "waveElRef", clsPrefix: e }), this.showBorder ? p("div", { "aria-hidden": true, class: `${e}-button__border`, style: this.customColorCssVars }) : null, this.showBorder ? p("div", { "aria-hidden": true, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null);
} }), oo = Ue;
export {
  Ue as B,
  oo as X,
  Le as a,
  ee as c,
  F as i
};
