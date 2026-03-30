import { b as S, f as r, h as c, d as _, j as l, k as T, l as v, a0 as R, m as $, c as F } from "./index-HnuybbhN.js";
import { r as u } from "./use-form-item-DgrHZmhA.js";
function w(s) {
  const { textColor2: e, textColor3: a, fontSize: n, fontWeight: i } = s;
  return { labelFontSize: n, labelFontWeight: i, valueFontWeight: i, valueFontSize: "24px", labelTextColor: a, valuePrefixTextColor: e, valueSuffixTextColor: e, valueTextColor: e };
}
const P = { common: S, self: w }, W = r("statistic", [c("label", `
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `), r("statistic-value", `
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `, [c("prefix", `
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `, [r("icon", { verticalAlign: "-0.125em" })]), c("content", `
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `), c("suffix", `
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `, [r("icon", { verticalAlign: "-0.125em" })])])]), E = Object.assign(Object.assign({}, v.props), { tabularNums: Boolean, label: String, value: [String, Number] }), O = _({ name: "Statistic", props: E, slots: Object, setup(s) {
  const { mergedClsPrefixRef: e, inlineThemeDisabled: a, mergedRtlRef: n } = T(s), i = v("Statistic", "-statistic", W, P, s, e), f = R("Statistic", n, e), t = F(() => {
    const { self: { labelFontWeight: x, valueFontSize: b, valueFontWeight: d, valuePrefixTextColor: m, labelTextColor: h, valueSuffixTextColor: g, valueTextColor: p, labelFontSize: z }, common: { cubicBezierEaseInOut: C } } = i.value;
    return { "--n-bezier": C, "--n-label-font-size": z, "--n-label-font-weight": x, "--n-label-text-color": h, "--n-value-font-weight": d, "--n-value-font-size": b, "--n-value-prefix-text-color": m, "--n-value-suffix-text-color": g, "--n-value-text-color": p };
  }), o = a ? $("statistic", void 0, t, s) : void 0;
  return { rtlEnabled: f, mergedClsPrefix: e, cssVars: a ? void 0 : t, themeClass: o == null ? void 0 : o.themeClass, onRender: o == null ? void 0 : o.onRender };
}, render() {
  var s;
  const { mergedClsPrefix: e, $slots: { default: a, label: n, prefix: i, suffix: f } } = this;
  return (s = this.onRender) === null || s === void 0 || s.call(this), l("div", { class: [`${e}-statistic`, this.themeClass, this.rtlEnabled && `${e}-statistic--rtl`], style: this.cssVars }, u(n, (t) => l("div", { class: `${e}-statistic__label` }, this.label || t)), l("div", { class: `${e}-statistic-value`, style: { fontVariantNumeric: this.tabularNums ? "tabular-nums" : "" } }, u(i, (t) => t && l("span", { class: `${e}-statistic-value__prefix` }, t)), this.value !== void 0 ? l("span", { class: `${e}-statistic-value__content` }, this.value) : u(a, (t) => t && l("span", { class: `${e}-statistic-value__content` }, t)), u(f, (t) => t && l("span", { class: `${e}-statistic-value__suffix` }, t))));
} });
export {
  O as _
};
