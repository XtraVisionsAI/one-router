import { e as f, f as c, P as C, g as h, d as S, j as o, I as x, T as k, k as T, l as v, Q as $, m as w, a as m, R, K as _, J as j, r as O, S as P } from "./index-CxIvU6Cs.js";
import { u as B } from "./use-compitable-C9NC2L_H.js";
const I = f([f("@keyframes spin-rotate", `
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `), c("spin-container", `
 position: relative;
 `, [c("spin-body", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [C()])]), c("spin-body", `
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `), c("spin", `
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `, [h("rotate", `
 animation: spin-rotate 2s linear infinite;
 `)]), c("spin-description", `
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `), c("spin-content", `
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `, [h("spinning", `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]), V = { small: 20, medium: 18, large: 16 }, N = Object.assign(Object.assign(Object.assign({}, v.props), { contentClass: String, contentStyle: [Object, String], description: String, size: { type: [String, Number], default: "medium" }, show: { type: Boolean, default: true }, rotate: { type: Boolean, default: true }, spinning: { type: Boolean, validator: () => true, default: void 0 }, delay: Number }), P), K = S({ name: "Spin", props: N, slots: Object, setup(e) {
  const { mergedClsPrefixRef: r, inlineThemeDisabled: t } = T(e), s = v("Spin", "-spin", I, $, e, r), d = m(() => {
    const { size: n } = e, { common: { cubicBezierEaseInOut: a }, self: u } = s.value, { opacitySpinning: y, color: g, textColor: b } = u, z = typeof n == "number" ? _(n) : u[j("size", n)];
    return { "--n-bezier": a, "--n-opacity-spinning": y, "--n-size": z, "--n-color": g, "--n-text-color": b };
  }), i = t ? w("spin", m(() => {
    const { size: n } = e;
    return typeof n == "number" ? String(n) : n[0];
  }), d, e) : void 0, p = B(e, ["spinning", "show"]), l = O(false);
  return R((n) => {
    let a;
    if (p.value) {
      const { delay: u } = e;
      if (u) {
        a = window.setTimeout(() => {
          l.value = true;
        }, u), n(() => {
          clearTimeout(a);
        });
        return;
      }
    }
    l.value = p.value;
  }), { mergedClsPrefix: r, active: l, mergedStrokeWidth: m(() => {
    const { strokeWidth: n } = e;
    if (n !== void 0) return n;
    const { size: a } = e;
    return V[typeof a == "number" ? "medium" : a];
  }), cssVars: t ? void 0 : d, themeClass: i == null ? void 0 : i.themeClass, onRender: i == null ? void 0 : i.onRender };
}, render() {
  var e, r;
  const { $slots: t, mergedClsPrefix: s, description: d } = this, i = t.icon && this.rotate, p = (d || t.description) && o("div", { class: `${s}-spin-description` }, d || ((e = t.description) === null || e === void 0 ? void 0 : e.call(t))), l = t.icon ? o("div", { class: [`${s}-spin-body`, this.themeClass] }, o("div", { class: [`${s}-spin`, i && `${s}-spin--rotate`], style: t.default ? "" : this.cssVars }, t.icon()), p) : o("div", { class: [`${s}-spin-body`, this.themeClass] }, o(x, { clsPrefix: s, style: t.default ? "" : this.cssVars, stroke: this.stroke, "stroke-width": this.mergedStrokeWidth, radius: this.radius, scale: this.scale, class: `${s}-spin` }), p);
  return (r = this.onRender) === null || r === void 0 || r.call(this), t.default ? o("div", { class: [`${s}-spin-container`, this.themeClass], style: this.cssVars }, o("div", { class: [`${s}-spin-content`, this.active && `${s}-spin-content--spinning`, this.contentClass], style: this.contentStyle }, t), o(k, { name: "fade-in-transition" }, { default: () => this.active ? l : null })) : l;
} });
export {
  K as _
};
