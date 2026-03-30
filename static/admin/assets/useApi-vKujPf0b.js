import { e as o, f as a, ak as ee, g as l, h as d, aj as oe, aS as re, d as te, j as b, Y as ne, ar as ae, k as de, l as k, b3 as se, _ as ie, m as le, a as z, J as S, a4 as ce, a7 as be, aa as ge, u as ve } from "./index-BeCJuQaP.js";
import { r as h, e as p, c as fe } from "./use-form-item-FVzrOHI4.js";
const y = a("card-content", `
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`), he = o([a("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [ee({ background: "var(--n-color-modal)" }), l("hoverable", [o("&:hover", "box-shadow: var(--n-box-shadow);")]), l("content-segmented", [o(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `), d("content-scrollbar", [o(">", [a("scrollbar-container", [o(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])])])]), l("content-soft-segmented", [o(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `), d("content-scrollbar", [o(">", [a("scrollbar-container", [o(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]), l("footer-segmented", [o(">", [d("footer", `
 padding-top: var(--n-padding-bottom);
 `)])]), l("footer-soft-segmented", [o(">", [d("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), o(">", [a("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [d("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), d("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), d("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), d("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), y, a("card-content", [o("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)]), d("content-scrollbar", `
 display: flex;
 flex-direction: column;
 `, [o(">", [a("scrollbar-container", [o(">", [y])])]), o("&:first-child >", [a("scrollbar-container", [o(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])]), d("footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [o("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)]), d("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), a("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [o("img", `
 display: block;
 width: 100%;
 `)]), l("bordered", `
 border: 1px solid var(--n-border-color);
 `, [o("&:target", "border-color: var(--n-color-target);")]), l("action-segmented", [o(">", [d("action", [o("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), l("content-segmented, content-soft-segmented", [o(">", [a("card-content", `
 transition: border-color 0.3s var(--n-bezier);
 `, [o("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)]), d("content-scrollbar", `
 transition: border-color 0.3s var(--n-bezier);
 `, [o("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), l("footer-segmented, footer-soft-segmented", [o(">", [d("footer", `
 transition: border-color 0.3s var(--n-bezier);
 `, [o("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), l("embedded", `
 background-color: var(--n-color-embedded);
 `)]), oe(a("card", `
 background: var(--n-color-modal);
 `, [l("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), re(a("card", `
 background: var(--n-color-popover);
 `, [l("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), $ = { title: [String, Function], contentClass: String, contentStyle: [Object, String], contentScrollable: Boolean, headerClass: String, headerStyle: [Object, String], headerExtraClass: String, headerExtraStyle: [Object, String], footerClass: String, footerStyle: [Object, String], embedded: Boolean, segmented: { type: [Boolean, Object], default: false }, size: String, bordered: { type: Boolean, default: true }, closable: Boolean, hoverable: Boolean, role: String, onClose: [Function, Array], tag: { type: String, default: "div" }, cover: Function, content: [String, Function], footer: Function, action: Function, headerExtra: Function, closeFocusable: Boolean }, xe = be($), pe = Object.assign(Object.assign({}, k.props), $), Ce = te({ name: "Card", props: pe, slots: Object, setup(t) {
  const u = () => {
    const { onClose: n } = t;
    n && fe(n);
  }, { inlineThemeDisabled: f, mergedClsPrefixRef: e, mergedRtlRef: m, mergedComponentPropsRef: c } = de(t), s = k("Card", "-card", he, se, t, e), x = ie("Card", m, e), g = z(() => {
    var n, v;
    return t.size || ((v = (n = c == null ? void 0 : c.value) === null || n === void 0 ? void 0 : n.Card) === null || v === void 0 ? void 0 : v.size) || "medium";
  }), i = z(() => {
    const n = g.value, { self: { color: v, colorModal: C, colorTarget: w, textColor: _, titleTextColor: E, titleFontWeight: B, borderColor: R, actionColor: j, borderRadius: P, lineHeight: F, closeIconColor: O, closeIconColorHover: T, closeIconColorPressed: M, closeColorHover: I, closeColorPressed: V, closeBorderRadius: H, closeIconSize: A, closeSize: K, boxShadow: N, colorPopover: J, colorEmbedded: L, colorEmbeddedModal: W, colorEmbeddedPopover: q, [S("padding", n)]: D, [S("fontSize", n)]: U, [S("titleFontSize", n)]: Y }, common: { cubicBezierEaseInOut: G } } = s.value, { top: Q, left: X, bottom: Z } = ce(D);
    return { "--n-bezier": G, "--n-border-radius": P, "--n-color": v, "--n-color-modal": C, "--n-color-popover": J, "--n-color-embedded": L, "--n-color-embedded-modal": W, "--n-color-embedded-popover": q, "--n-color-target": w, "--n-text-color": _, "--n-line-height": F, "--n-action-color": j, "--n-title-text-color": E, "--n-title-font-weight": B, "--n-close-icon-color": O, "--n-close-icon-color-hover": T, "--n-close-icon-color-pressed": M, "--n-close-color-hover": I, "--n-close-color-pressed": V, "--n-border-color": R, "--n-box-shadow": N, "--n-padding-top": Q, "--n-padding-bottom": Z, "--n-padding-left": X, "--n-font-size": U, "--n-title-font-size": Y, "--n-close-size": K, "--n-close-icon-size": A, "--n-close-border-radius": H };
  }), r = f ? le("card", z(() => g.value[0]), i, t) : void 0;
  return { rtlEnabled: x, mergedClsPrefix: e, mergedTheme: s, handleCloseClick: u, cssVars: f ? void 0 : i, themeClass: r == null ? void 0 : r.themeClass, onRender: r == null ? void 0 : r.onRender };
}, render() {
  const { segmented: t, bordered: u, hoverable: f, mergedClsPrefix: e, rtlEnabled: m, onRender: c, embedded: s, tag: x, $slots: g } = this;
  return c == null ? void 0 : c(), b(x, { class: [`${e}-card`, this.themeClass, s && `${e}-card--embedded`, { [`${e}-card--rtl`]: m, [`${e}-card--content-scrollable`]: this.contentScrollable, [`${e}-card--content${typeof t != "boolean" && t.content === "soft" ? "-soft" : ""}-segmented`]: t === true || t !== false && t.content, [`${e}-card--footer${typeof t != "boolean" && t.footer === "soft" ? "-soft" : ""}-segmented`]: t === true || t !== false && t.footer, [`${e}-card--action-segmented`]: t === true || t !== false && t.action, [`${e}-card--bordered`]: u, [`${e}-card--hoverable`]: f }], style: this.cssVars, role: this.role }, h(g.cover, (i) => {
    const r = this.cover ? p([this.cover()]) : i;
    return r && b("div", { class: `${e}-card-cover`, role: "none" }, r);
  }), h(g.header, (i) => {
    const { title: r } = this, n = r ? p(typeof r == "function" ? [r()] : [r]) : i;
    return n || this.closable ? b("div", { class: [`${e}-card-header`, this.headerClass], style: this.headerStyle, role: "heading" }, b("div", { class: `${e}-card-header__main`, role: "heading" }, n), h(g["header-extra"], (v) => {
      const C = this.headerExtra ? p([this.headerExtra()]) : v;
      return C && b("div", { class: [`${e}-card-header__extra`, this.headerExtraClass], style: this.headerExtraStyle }, C);
    }), this.closable && b(ne, { clsPrefix: e, class: `${e}-card-header__close`, onClick: this.handleCloseClick, focusable: this.closeFocusable, absolute: true })) : null;
  }), h(g.default, (i) => {
    const { content: r } = this, n = r ? p(typeof r == "function" ? [r()] : [r]) : i;
    return n ? this.contentScrollable ? b(ae, { class: `${e}-card__content-scrollbar`, contentClass: [`${e}-card-content`, this.contentClass], contentStyle: this.contentStyle }, n) : b("div", { class: [`${e}-card-content`, this.contentClass], style: this.contentStyle, role: "none" }, n) : null;
  }), h(g.footer, (i) => {
    const r = this.footer ? p([this.footer()]) : i;
    return r && b("div", { class: [`${e}-card__footer`, this.footerClass], style: this.footerStyle, role: "none" }, r);
  }), h(g.action, (i) => {
    const r = this.action ? p([this.action()]) : i;
    return r && b("div", { class: `${e}-card__action`, role: "none" }, r);
  }));
} });
function ze() {
  const t = ge(), u = ve();
  async function f(e, m, c) {
    var _a;
    const s = await fetch("/admin/api" + m, { method: e, headers: { "x-api-key": t.apiKey, ...c !== void 0 ? { "Content-Type": "application/json" } : {} }, body: c !== void 0 ? JSON.stringify(c) : void 0 });
    if (s.status === 401 || s.status === 403) throw t.logout(), u.push("/login"), new Error("Unauthorized");
    if (!s.ok) {
      const x = await s.json().catch(() => ({ error: { message: s.statusText } }));
      throw new Error(`[${s.status}] ${((_a = x.error) == null ? void 0 : _a.message) ?? s.statusText}`);
    }
    return s.json();
  }
  return { request: f };
}
export {
  Ce as _,
  xe as a,
  $ as c,
  ze as u
};
