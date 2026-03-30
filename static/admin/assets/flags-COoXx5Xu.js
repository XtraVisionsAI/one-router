import { a as pe, u as we, _ as xe } from "./useApi-ViaiVG_-.js";
import { b as ye, E as _e, f as q, h as o, F as G, e as D, g as f, G as X, d as ee, j as s, N as ke, H as Se, k as Ce, l as te, r as W, m as Be, c as N, I as k, J as A, K as v, t as $e, o as Re, z as P, y as z, v as Y, p as J, q as j, s as V, x as Q, L as ze, M as Ve, n as Fe, A as Z } from "./index-HnuybbhN.js";
import { i as K, r as S, u as We, a as Me, c as E } from "./use-form-item-DgrHZmhA.js";
import { _ as Ne } from "./Spin-CKyYFK8t.js";
const Pe = { buttonHeightSmall: "14px", buttonHeightMedium: "18px", buttonHeightLarge: "22px", buttonWidthSmall: "14px", buttonWidthMedium: "18px", buttonWidthLarge: "22px", buttonWidthPressedSmall: "20px", buttonWidthPressedMedium: "24px", buttonWidthPressedLarge: "28px", railHeightSmall: "18px", railHeightMedium: "22px", railHeightLarge: "26px", railWidthSmall: "32px", railWidthMedium: "40px", railWidthLarge: "48px" };
function je(e) {
  const { primaryColor: r, opacityDisabled: d, borderRadius: n, textColor3: c } = e;
  return Object.assign(Object.assign({}, Pe), { iconColor: c, textColor: "white", loadingColor: r, opacityDisabled: d, railColor: "rgba(0, 0, 0, .14)", railColorActive: r, buttonBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", buttonColor: "#FFF", railBorderRadiusSmall: n, railBorderRadiusMedium: n, railBorderRadiusLarge: n, buttonBorderRadiusSmall: n, buttonBorderRadiusMedium: n, buttonBorderRadiusLarge: n, boxShadowFocus: `0 0 0 2px ${_e(r, { alpha: 0.2 })}` });
}
const He = { common: ye, self: je }, Te = q("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [o("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), o("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), o("button-placeholder", `
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
 `, [G({ left: "50%", top: "50%", originalTransform: "translateX(-50%) translateY(-50%)" })]), o("checked, unchecked", `
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
 `), o("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), o("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), D("&:focus", [o("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), f("round", [o("rail", "border-radius: calc(var(--n-rail-height) / 2);", [o("button", "border-radius: calc(var(--n-button-height) / 2);")])]), X("disabled", [X("icon", [f("rubber-band", [f("pressed", [o("rail", [o("button", "max-width: var(--n-button-width-pressed);")])]), o("rail", [D("&:active", [o("button", "max-width: var(--n-button-width-pressed);")])]), f("active", [f("pressed", [o("rail", [o("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), o("rail", [D("&:active", [o("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), f("active", [o("rail", [o("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), o("rail", `
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
 `, [o("button-icon", `
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
 `, [G()]), o("button", `
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
 `)]), f("active", [o("rail", "background-color: var(--n-rail-color-active);")]), f("loading", [o("rail", `
 cursor: wait;
 `)]), f("disabled", [o("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), Le = Object.assign(Object.assign({}, te.props), { size: String, value: { type: [String, Number, Boolean], default: void 0 }, loading: Boolean, defaultValue: { type: [String, Number, Boolean], default: false }, disabled: { type: Boolean, default: void 0 }, round: { type: Boolean, default: true }, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], checkedValue: { type: [String, Number, Boolean], default: true }, uncheckedValue: { type: [String, Number, Boolean], default: false }, railStyle: Function, rubberBand: { type: Boolean, default: true }, spinProps: Object, onChange: [Function, Array] });
let F;
const Oe = ee({ name: "Switch", props: Le, slots: Object, setup(e) {
  F === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? F = CSS.supports("width", "max(1px)") : F = false : F = true);
  const { mergedClsPrefixRef: r, inlineThemeDisabled: d, mergedComponentPropsRef: n } = Ce(e), c = te("Switch", "-switch", Te, He, e, r), h = We(e, { mergedSize(t) {
    var m, p;
    if (e.size !== void 0) return e.size;
    if (t) return t.mergedSize.value;
    const _ = (p = (m = n == null ? void 0 : n.value) === null || m === void 0 ? void 0 : m.Switch) === null || p === void 0 ? void 0 : p.size;
    return _ || "medium";
  } }), { mergedSizeRef: y, mergedDisabledRef: i } = h, l = W(e.defaultValue), g = $e(e, "value"), b = Me(g, l), C = N(() => b.value === e.checkedValue), a = W(false), u = W(false), $ = N(() => {
    const { railStyle: t } = e;
    if (t) return t({ focused: u.value, checked: C.value });
  });
  function M(t) {
    const { "onUpdate:value": m, onChange: p, onUpdateValue: _ } = e, { nTriggerFormInput: H, nTriggerFormChange: T } = h;
    m && E(m, t), _ && E(_, t), p && E(p, t), l.value = t, H(), T();
  }
  function ae() {
    const { nTriggerFormFocus: t } = h;
    t();
  }
  function oe() {
    const { nTriggerFormBlur: t } = h;
    t();
  }
  function ie() {
    e.loading || i.value || (b.value !== e.checkedValue ? M(e.checkedValue) : M(e.uncheckedValue));
  }
  function ne() {
    u.value = true, ae();
  }
  function re() {
    u.value = false, oe(), a.value = false;
  }
  function se(t) {
    e.loading || i.value || t.key === " " && (b.value !== e.checkedValue ? M(e.checkedValue) : M(e.uncheckedValue), a.value = false);
  }
  function le(t) {
    e.loading || i.value || t.key === " " && (t.preventDefault(), a.value = true);
  }
  const I = N(() => {
    const { value: t } = y, { self: { opacityDisabled: m, railColor: p, railColorActive: _, buttonBoxShadow: H, buttonColor: T, boxShadowFocus: de, loadingColor: ce, textColor: ue, iconColor: he, [k("buttonHeight", t)]: w, [k("buttonWidth", t)]: be, [k("buttonWidthPressed", t)]: fe, [k("railHeight", t)]: x, [k("railWidth", t)]: R, [k("railBorderRadius", t)]: ve, [k("buttonBorderRadius", t)]: ge }, common: { cubicBezierEaseInOut: me } } = c.value;
    let L, O, U;
    return F ? (L = `calc((${x} - ${w}) / 2)`, O = `max(${x}, ${w})`, U = `max(${R}, calc(${R} + ${w} - ${x}))`) : (L = A((v(x) - v(w)) / 2), O = A(Math.max(v(x), v(w))), U = v(x) > v(w) ? R : A(v(R) + v(w) - v(x))), { "--n-bezier": me, "--n-button-border-radius": ge, "--n-button-box-shadow": H, "--n-button-color": T, "--n-button-width": be, "--n-button-width-pressed": fe, "--n-button-height": w, "--n-height": O, "--n-offset": L, "--n-opacity-disabled": m, "--n-rail-border-radius": ve, "--n-rail-color": p, "--n-rail-color-active": _, "--n-rail-height": x, "--n-rail-width": R, "--n-width": U, "--n-box-shadow-focus": de, "--n-loading-color": ce, "--n-text-color": ue, "--n-icon-color": he };
  }), B = d ? Be("switch", N(() => y.value[0]), I, e) : void 0;
  return { handleClick: ie, handleBlur: re, handleFocus: ne, handleKeyup: se, handleKeydown: le, mergedRailStyle: $, pressed: a, mergedClsPrefix: r, mergedValue: b, checked: C, mergedDisabled: i, cssVars: d ? void 0 : I, themeClass: B == null ? void 0 : B.themeClass, onRender: B == null ? void 0 : B.onRender };
}, render() {
  const { mergedClsPrefix: e, mergedDisabled: r, checked: d, mergedRailStyle: n, onRender: c, $slots: h } = this;
  c == null ? void 0 : c();
  const { checked: y, unchecked: i, icon: l, "checked-icon": g, "unchecked-icon": b } = h, C = !(K(l) && K(g) && K(b));
  return s("div", { role: "switch", "aria-checked": d, class: [`${e}-switch`, this.themeClass, C && `${e}-switch--icon`, d && `${e}-switch--active`, r && `${e}-switch--disabled`, this.round && `${e}-switch--round`, this.loading && `${e}-switch--loading`, this.pressed && `${e}-switch--pressed`, this.rubberBand && `${e}-switch--rubber-band`], tabindex: this.mergedDisabled ? void 0 : 0, style: this.cssVars, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown }, s("div", { class: `${e}-switch__rail`, "aria-hidden": "true", style: n }, S(y, (a) => S(i, (u) => a || u ? s("div", { "aria-hidden": true, class: `${e}-switch__children-placeholder` }, s("div", { class: `${e}-switch__rail-placeholder` }, s("div", { class: `${e}-switch__button-placeholder` }), a), s("div", { class: `${e}-switch__rail-placeholder` }, s("div", { class: `${e}-switch__button-placeholder` }), u)) : null)), s("div", { class: `${e}-switch__button` }, S(l, (a) => S(g, (u) => S(b, ($) => s(ke, null, { default: () => this.loading ? s(Se, Object.assign({ key: "loading", clsPrefix: e, strokeWidth: 20 }, this.spinProps)) : this.checked && (u || a) ? s("div", { class: `${e}-switch__button-icon`, key: u ? "checked-icon" : "icon" }, u || a) : !this.checked && ($ || a) ? s("div", { class: `${e}-switch__button-icon`, key: $ ? "unchecked-icon" : "icon" }, $ || a) : null })))), S(y, (a) => a && s("div", { key: "checked", class: `${e}-switch__checked` }, a)), S(i, (a) => a && s("div", { key: "unchecked", class: `${e}-switch__unchecked` }, a)))));
} });
function Ue() {
  const { request: e } = pe();
  return { list: () => e("GET", "/flags"), update: (r, d) => e("PUT", `/flags/${encodeURIComponent(r)}`, { enabled: d }) };
}
const De = { key: 0, class: "text-slate-500 text-sm" }, Ae = { class: "space-y-2" }, Ke = { class: "flex items-center justify-between" }, Ee = { class: "text-sm font-medium text-slate-200" }, Ie = { key: 0, class: "text-xs text-slate-500 mt-0.5" }, Je = ee({ __name: "flags", setup(e) {
  const r = we(), d = Ue(), n = W([]), c = W(true);
  async function h() {
    c.value = true;
    try {
      const i = await d.list();
      n.value = i.data;
    } catch (i) {
      r.error(i.message);
    } finally {
      c.value = false;
    }
  }
  async function y(i) {
    const l = !i.enabled;
    i.enabled = l;
    try {
      await d.update(i.name, l), r.success(`${i.name} ${l ? "enabled" : "disabled"}`);
    } catch (g) {
      i.enabled = !l, r.error(g.message);
    }
  }
  return Re(h), (i, l) => {
    const g = Oe, b = xe, C = Ne;
    return V(), P("div", null, [l[0] || (l[0] = z("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Feature Flags", -1)), Y(C, { show: j(c) }, { default: J(() => [j(n).length === 0 && !j(c) ? (V(), P("div", De, " No feature flags configured. ")) : Q("", true), z("div", Ae, [(V(true), P(ze, null, Ve(j(n), (a) => (V(), Fe(b, { key: a.name, size: "small" }, { default: J(() => [z("div", Ke, [z("div", null, [z("div", Ee, Z(a.name), 1), a.description ? (V(), P("div", Ie, Z(a.description), 1)) : Q("", true)]), Y(g, { value: a.enabled, "onUpdate:value": (u) => y(a) }, null, 8, ["value", "onUpdate:value"])])]), _: 2 }, 1024))), 128))])]), _: 1 }, 8, ["show"])]);
  };
} });
export {
  Je as default
};
