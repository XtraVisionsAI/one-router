import { a as z, e as r, f as a, ak as ee, g as l, h as d, aj as oe, br as re, d as te, j as b, Y as ne, ar as ae, k as de, l as $, bG as se, _ as ie, m as le, J as S, a4 as ce, a7 as be, aa as ge, u as fe } from "./index-YqbknKjl.js";
import { r as u, e as p, c as ve } from "./use-form-item-B02FE9As.js";
function xe(e, g) {
  return z(() => {
    for (const f of g) if (e[f] !== void 0) return e[f];
    return e[g[g.length - 1]];
  });
}
const y = a("card-content", `
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`), he = r([a("card", `
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
 `, [ee({ background: "var(--n-color-modal)" }), l("hoverable", [r("&:hover", "box-shadow: var(--n-box-shadow);")]), l("content-segmented", [r(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `), d("content-scrollbar", [r(">", [a("scrollbar-container", [r(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])])])]), l("content-soft-segmented", [r(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `), d("content-scrollbar", [r(">", [a("scrollbar-container", [r(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]), l("footer-segmented", [r(">", [d("footer", `
 padding-top: var(--n-padding-bottom);
 `)])]), l("footer-soft-segmented", [r(">", [d("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), r(">", [a("card-header", `
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
 `), y, a("card-content", [r("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)]), d("content-scrollbar", `
 display: flex;
 flex-direction: column;
 `, [r(">", [a("scrollbar-container", [r(">", [y])])]), r("&:first-child >", [a("scrollbar-container", [r(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])]), d("footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [r("&:first-child", `
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
 `, [r("img", `
 display: block;
 width: 100%;
 `)]), l("bordered", `
 border: 1px solid var(--n-border-color);
 `, [r("&:target", "border-color: var(--n-color-target);")]), l("action-segmented", [r(">", [d("action", [r("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), l("content-segmented, content-soft-segmented", [r(">", [a("card-content", `
 transition: border-color 0.3s var(--n-bezier);
 `, [r("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)]), d("content-scrollbar", `
 transition: border-color 0.3s var(--n-bezier);
 `, [r("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), l("footer-segmented, footer-soft-segmented", [r(">", [d("footer", `
 transition: border-color 0.3s var(--n-bezier);
 `, [r("&:not(:first-child)", `
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
 `)]))]), k = { title: [String, Function], contentClass: String, contentStyle: [Object, String], contentScrollable: Boolean, headerClass: String, headerStyle: [Object, String], headerExtraClass: String, headerExtraStyle: [Object, String], footerClass: String, footerStyle: [Object, String], embedded: Boolean, segmented: { type: [Boolean, Object], default: false }, size: String, bordered: { type: Boolean, default: true }, closable: Boolean, hoverable: Boolean, role: String, onClose: [Function, Array], tag: { type: String, default: "div" }, cover: Function, content: [String, Function], footer: Function, action: Function, headerExtra: Function, closeFocusable: Boolean }, Ce = be(k), ue = Object.assign(Object.assign({}, $.props), k), ze = te({ name: "Card", props: ue, slots: Object, setup(e) {
  const g = () => {
    const { onClose: n } = e;
    n && ve(n);
  }, { inlineThemeDisabled: f, mergedClsPrefixRef: o, mergedRtlRef: m, mergedComponentPropsRef: c } = de(e), s = $("Card", "-card", he, se, e, o), x = ie("Card", m, o), v = z(() => {
    var n, h;
    return e.size || ((h = (n = c == null ? void 0 : c.value) === null || n === void 0 ? void 0 : n.Card) === null || h === void 0 ? void 0 : h.size) || "medium";
  }), i = z(() => {
    const n = v.value, { self: { color: h, colorModal: C, colorTarget: w, textColor: _, titleTextColor: E, titleFontWeight: B, borderColor: R, actionColor: j, borderRadius: P, lineHeight: F, closeIconColor: O, closeIconColorHover: T, closeIconColorPressed: M, closeColorHover: I, closeColorPressed: V, closeBorderRadius: H, closeIconSize: A, closeSize: K, boxShadow: N, colorPopover: J, colorEmbedded: L, colorEmbeddedModal: W, colorEmbeddedPopover: q, [S("padding", n)]: D, [S("fontSize", n)]: G, [S("titleFontSize", n)]: U }, common: { cubicBezierEaseInOut: Y } } = s.value, { top: Q, left: X, bottom: Z } = ce(D);
    return { "--n-bezier": Y, "--n-border-radius": P, "--n-color": h, "--n-color-modal": C, "--n-color-popover": J, "--n-color-embedded": L, "--n-color-embedded-modal": W, "--n-color-embedded-popover": q, "--n-color-target": w, "--n-text-color": _, "--n-line-height": F, "--n-action-color": j, "--n-title-text-color": E, "--n-title-font-weight": B, "--n-close-icon-color": O, "--n-close-icon-color-hover": T, "--n-close-icon-color-pressed": M, "--n-close-color-hover": I, "--n-close-color-pressed": V, "--n-border-color": R, "--n-box-shadow": N, "--n-padding-top": Q, "--n-padding-bottom": Z, "--n-padding-left": X, "--n-font-size": G, "--n-title-font-size": U, "--n-close-size": K, "--n-close-icon-size": A, "--n-close-border-radius": H };
  }), t = f ? le("card", z(() => v.value[0]), i, e) : void 0;
  return { rtlEnabled: x, mergedClsPrefix: o, mergedTheme: s, handleCloseClick: g, cssVars: f ? void 0 : i, themeClass: t == null ? void 0 : t.themeClass, onRender: t == null ? void 0 : t.onRender };
}, render() {
  const { segmented: e, bordered: g, hoverable: f, mergedClsPrefix: o, rtlEnabled: m, onRender: c, embedded: s, tag: x, $slots: v } = this;
  return c == null ? void 0 : c(), b(x, { class: [`${o}-card`, this.themeClass, s && `${o}-card--embedded`, { [`${o}-card--rtl`]: m, [`${o}-card--content-scrollable`]: this.contentScrollable, [`${o}-card--content${typeof e != "boolean" && e.content === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.content, [`${o}-card--footer${typeof e != "boolean" && e.footer === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.footer, [`${o}-card--action-segmented`]: e === true || e !== false && e.action, [`${o}-card--bordered`]: g, [`${o}-card--hoverable`]: f }], style: this.cssVars, role: this.role }, u(v.cover, (i) => {
    const t = this.cover ? p([this.cover()]) : i;
    return t && b("div", { class: `${o}-card-cover`, role: "none" }, t);
  }), u(v.header, (i) => {
    const { title: t } = this, n = t ? p(typeof t == "function" ? [t()] : [t]) : i;
    return n || this.closable ? b("div", { class: [`${o}-card-header`, this.headerClass], style: this.headerStyle, role: "heading" }, b("div", { class: `${o}-card-header__main`, role: "heading" }, n), u(v["header-extra"], (h) => {
      const C = this.headerExtra ? p([this.headerExtra()]) : h;
      return C && b("div", { class: [`${o}-card-header__extra`, this.headerExtraClass], style: this.headerExtraStyle }, C);
    }), this.closable && b(ne, { clsPrefix: o, class: `${o}-card-header__close`, onClick: this.handleCloseClick, focusable: this.closeFocusable, absolute: true })) : null;
  }), u(v.default, (i) => {
    const { content: t } = this, n = t ? p(typeof t == "function" ? [t()] : [t]) : i;
    return n ? this.contentScrollable ? b(ae, { class: `${o}-card__content-scrollbar`, contentClass: [`${o}-card-content`, this.contentClass], contentStyle: this.contentStyle }, n) : b("div", { class: [`${o}-card-content`, this.contentClass], style: this.contentStyle, role: "none" }, n) : null;
  }), u(v.footer, (i) => {
    const t = this.footer ? p([this.footer()]) : i;
    return t && b("div", { class: [`${o}-card__footer`, this.footerClass], style: this.footerStyle, role: "none" }, t);
  }), u(v.action, (i) => {
    const t = this.action ? p([this.action()]) : i;
    return t && b("div", { class: `${o}-card__action`, role: "none" }, t);
  }));
} });
function Se() {
  const e = ge(), g = fe();
  async function f(o, m, c) {
    var _a;
    const s = await fetch("/admin/api" + m, { method: o, headers: { "x-api-key": e.apiKey, ...c !== void 0 ? { "Content-Type": "application/json" } : {} }, body: c !== void 0 ? JSON.stringify(c) : void 0 });
    if (s.status === 401 || s.status === 403) throw e.logout(), g.push("/login"), new Error("Unauthorized");
    if (!s.ok) {
      const x = await s.json().catch(() => ({ error: { message: s.statusText } }));
      throw new Error(`[${s.status}] ${((_a = x.error) == null ? void 0 : _a.message) ?? s.statusText}`);
    }
    return s.json();
  }
  return { request: f };
}
export {
  ze as _,
  xe as a,
  Ce as b,
  k as c,
  Se as u
};
