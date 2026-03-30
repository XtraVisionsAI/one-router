import { u as pe, _ as we } from "./useApi-CSeysmJh.js";
import { b as xe, E as ye, F as _e, f as q, h as a, G, e as W, g as f, H as X, d as ee, j as s, N as ke, I as Ce, k as Se, l as te, r as N, m as Be, a as T, t as $e, J as k, K as E, L as v, o as Re, n as z, z as O, y as V, v as Y, q as J, s as P, x as Q, M as ze, O as Ve, p as Fe, A as Z } from "./index-CxIvU6Cs.js";
import { i as H, r as C, u as Ne, a as je, c as L } from "./use-form-item-BbXnP5U7.js";
import { u as Te } from "./use-message-B8Ohob0l.js";
import { _ as Oe } from "./Spin-BvmegW0y.js";
import "./use-compitable-C9NC2L_H.js";
function Pe(e) {
  const { primaryColor: r, opacityDisabled: c, borderRadius: i, textColor3: d } = e;
  return Object.assign(Object.assign({}, ye), { iconColor: d, textColor: "white", loadingColor: r, opacityDisabled: c, railColor: "rgba(0, 0, 0, .14)", railColorActive: r, buttonBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", buttonColor: "#FFF", railBorderRadiusSmall: i, railBorderRadiusMedium: i, railBorderRadiusLarge: i, buttonBorderRadiusSmall: i, buttonBorderRadiusMedium: i, buttonBorderRadiusLarge: i, boxShadowFocus: `0 0 0 2px ${_e(r, { alpha: 0.2 })}` });
}
const Me = { common: xe, self: Pe }, Ue = q("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [a("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), a("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), a("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), q("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [G({ left: "50%", top: "50%", originalTransform: "translateX(-50%) translateY(-50%)" })]), a("checked, unchecked", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `), a("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), a("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), W("&:focus", [a("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), f("round", [a("rail", "border-radius: calc(var(--n-rail-height) / 2);", [a("button", "border-radius: calc(var(--n-button-height) / 2);")])]), X("disabled", [X("icon", [f("rubber-band", [f("pressed", [a("rail", [a("button", "max-width: var(--n-button-width-pressed);")])]), a("rail", [W("&:active", [a("button", "max-width: var(--n-button-width-pressed);")])]), f("active", [f("pressed", [a("rail", [a("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), a("rail", [W("&:active", [a("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), f("active", [a("rail", [a("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), a("rail", `
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `, [a("button-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `, [G()]), a("button", `
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]), f("active", [a("rail", "background-color: var(--n-rail-color-active);")]), f("loading", [a("rail", `
 cursor: wait;
 `)]), f("disabled", [a("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), De = Object.assign(Object.assign({}, te.props), { size: String, value: { type: [String, Number, Boolean], default: void 0 }, loading: Boolean, defaultValue: { type: [String, Number, Boolean], default: false }, disabled: { type: Boolean, default: void 0 }, round: { type: Boolean, default: true }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], checkedValue: { type: [String, Number, Boolean], default: true }, uncheckedValue: { type: [String, Number, Boolean], default: false }, railStyle: Function, rubberBand: { type: Boolean, default: true }, spinProps: Object, onChange: [Function, Array] });
let F;
const Ae = ee({ name: "Switch", props: De, slots: Object, setup(e) {
  F === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? F = CSS.supports("width", "max(1px)") : F = false : F = true);
  const { mergedClsPrefixRef: r, inlineThemeDisabled: c, mergedComponentPropsRef: i } = Se(e), d = te("Switch", "-switch", Ue, Me, e, r), h = Ne(e, { mergedSize(t) {
    var m, p;
    if (e.size !== void 0) return e.size;
    if (t) return t.mergedSize.value;
    const _ = (p = (m = i == null ? void 0 : i.value) === null || m === void 0 ? void 0 : m.Switch) === null || p === void 0 ? void 0 : p.size;
    return _ || "medium";
  } }), { mergedSizeRef: y, mergedDisabledRef: n } = h, l = N(e.defaultValue), g = $e(e, "value"), b = je(g, l), S = T(() => b.value === e.checkedValue), o = N(false), u = N(false), $ = T(() => {
    const { railStyle: t } = e;
    if (t) return t({ focused: u.value, checked: S.value });
  });
  function j(t) {
    const { "onUpdate:value": m, onChange: p, onUpdateValue: _ } = e, { nTriggerFormInput: M, nTriggerFormChange: U } = h;
    m && L(m, t), _ && L(_, t), p && L(p, t), l.value = t, M(), U();
  }
  function oe() {
    const { nTriggerFormFocus: t } = h;
    t();
  }
  function ae() {
    const { nTriggerFormBlur: t } = h;
    t();
  }
  function ne() {
    e.loading || n.value || (b.value !== e.checkedValue ? j(e.checkedValue) : j(e.uncheckedValue));
  }
  function ie() {
    u.value = true, oe();
  }
  function re() {
    u.value = false, ae(), o.value = false;
  }
  function se(t) {
    e.loading || n.value || t.key === " " && (b.value !== e.checkedValue ? j(e.checkedValue) : j(e.uncheckedValue), o.value = false);
  }
  function le(t) {
    e.loading || n.value || t.key === " " && (t.preventDefault(), o.value = true);
  }
  const I = T(() => {
    const { value: t } = y, { self: { opacityDisabled: m, railColor: p, railColorActive: _, buttonBoxShadow: M, buttonColor: U, boxShadowFocus: ce, loadingColor: de, textColor: ue, iconColor: he, [k("buttonHeight", t)]: w, [k("buttonWidth", t)]: be, [k("buttonWidthPressed", t)]: fe, [k("railHeight", t)]: x, [k("railWidth", t)]: R, [k("railBorderRadius", t)]: ve, [k("buttonBorderRadius", t)]: ge }, common: { cubicBezierEaseInOut: me } } = d.value;
    let D, A, K;
    return F ? (D = `calc((${x} - ${w}) / 2)`, A = `max(${x}, ${w})`, K = `max(${R}, calc(${R} + ${w} - ${x}))`) : (D = E((v(x) - v(w)) / 2), A = E(Math.max(v(x), v(w))), K = v(x) > v(w) ? R : E(v(R) + v(w) - v(x))), { "--n-bezier": me, "--n-button-border-radius": ge, "--n-button-box-shadow": M, "--n-button-color": U, "--n-button-width": be, "--n-button-width-pressed": fe, "--n-button-height": w, "--n-height": A, "--n-offset": D, "--n-opacity-disabled": m, "--n-rail-border-radius": ve, "--n-rail-color": p, "--n-rail-color-active": _, "--n-rail-height": x, "--n-rail-width": R, "--n-width": K, "--n-box-shadow-focus": ce, "--n-loading-color": de, "--n-text-color": ue, "--n-icon-color": he };
  }), B = c ? Be("switch", T(() => y.value[0]), I, e) : void 0;
  return { handleClick: ne, handleBlur: re, handleFocus: ie, handleKeyup: se, handleKeydown: le, mergedRailStyle: $, pressed: o, mergedClsPrefix: r, mergedValue: b, checked: S, mergedDisabled: n, cssVars: c ? void 0 : I, themeClass: B == null ? void 0 : B.themeClass, onRender: B == null ? void 0 : B.onRender };
}, render() {
  const { mergedClsPrefix: e, mergedDisabled: r, checked: c, mergedRailStyle: i, onRender: d, $slots: h } = this;
  d == null ? void 0 : d();
  const { checked: y, unchecked: n, icon: l, "checked-icon": g, "unchecked-icon": b } = h, S = !(H(l) && H(g) && H(b));
  return s("div", { role: "switch", "aria-checked": c, class: [`${e}-switch`, this.themeClass, S && `${e}-switch--icon`, c && `${e}-switch--active`, r && `${e}-switch--disabled`, this.round && `${e}-switch--round`, this.loading && `${e}-switch--loading`, this.pressed && `${e}-switch--pressed`, this.rubberBand && `${e}-switch--rubber-band`], tabindex: this.mergedDisabled ? void 0 : 0, style: this.cssVars, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown }, s("div", { class: `${e}-switch__rail`, "aria-hidden": "true", style: i }, C(y, (o) => C(n, (u) => o || u ? s("div", { "aria-hidden": true, class: `${e}-switch__children-placeholder` }, s("div", { class: `${e}-switch__rail-placeholder` }, s("div", { class: `${e}-switch__button-placeholder` }), o), s("div", { class: `${e}-switch__rail-placeholder` }, s("div", { class: `${e}-switch__button-placeholder` }), u)) : null)), s("div", { class: `${e}-switch__button` }, C(l, (o) => C(g, (u) => C(b, ($) => s(ke, null, { default: () => this.loading ? s(Ce, Object.assign({ key: "loading", clsPrefix: e, strokeWidth: 20 }, this.spinProps)) : this.checked && (u || o) ? s("div", { class: `${e}-switch__button-icon`, key: u ? "checked-icon" : "icon" }, u || o) : !this.checked && ($ || o) ? s("div", { class: `${e}-switch__button-icon`, key: $ ? "unchecked-icon" : "icon" }, $ || o) : null })))), C(y, (o) => o && s("div", { key: "checked", class: `${e}-switch__checked` }, o)), C(n, (o) => o && s("div", { key: "unchecked", class: `${e}-switch__unchecked` }, o)))));
} });
function Ke() {
  const { request: e } = pe();
  return { list: () => e("GET", "/flags"), update: (r, c) => e("PUT", `/flags/${encodeURIComponent(r)}`, { enabled: c }) };
}
const We = { key: 0, class: "text-slate-500 text-sm" }, Ee = { class: "space-y-2" }, He = { class: "flex items-center justify-between" }, Le = { class: "text-sm font-medium text-slate-200" }, Ie = { key: 0, class: "text-xs text-slate-500 mt-0.5" }, Ze = ee({ __name: "flags", setup(e) {
  const r = Te(), c = Ke(), i = N([]), d = N(true);
  async function h() {
    d.value = true;
    try {
      const n = await c.list();
      i.value = n.data;
    } catch (n) {
      r.error(n.message);
    } finally {
      d.value = false;
    }
  }
  async function y(n) {
    const l = !n.enabled;
    n.enabled = l;
    try {
      await c.update(n.name, l), r.success(`${n.name} ${l ? "enabled" : "disabled"}`);
    } catch (g) {
      n.enabled = !l, r.error(g.message);
    }
  }
  return Re(h), (n, l) => {
    const g = Ae, b = we, S = Oe;
    return z(), O("div", null, [l[0] || (l[0] = V("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Feature Flags", -1)), Y(S, { show: P(d) }, { default: J(() => [P(i).length === 0 && !P(d) ? (z(), O("div", We, " No feature flags configured. ")) : Q("", true), V("div", Ee, [(z(true), O(ze, null, Ve(P(i), (o) => (z(), Fe(b, { key: o.name, size: "small" }, { default: J(() => [V("div", He, [V("div", null, [V("div", Le, Z(o.name), 1), o.description ? (z(), O("div", Ie, Z(o.description), 1)) : Q("", true)]), Y(g, { value: o.enabled, "onUpdate:value": (u) => y(o) }, null, 8, ["value", "onUpdate:value"])])]), _: 2 }, 1024))), 128))])]), _: 1 }, 8, ["show"])]);
  };
} });
export {
  Ze as default
};
