import { c as z, b as ee, e as t, f as a, ah as oe, g as b, h as i, ag as re, bb as te, d as ne, j as f, k as ae, l as F, a0 as de, m as se, ao as ie, V as le, a3 as ce, I as E, a1 as be, aw as ge, i as pe, bg as ue, a5 as fe, u as me } from "./index-HnuybbhN.js";
import { r as C, e as S, c as he } from "./use-form-item-DgrHZmhA.js";
function $e(e, g) {
  return z(() => {
    for (const c of g) if (e[c] !== void 0) return e[c];
    return e[g[g.length - 1]];
  });
}
const ve = { paddingSmall: "12px 16px 12px", paddingMedium: "19px 24px 20px", paddingLarge: "23px 32px 24px", paddingHuge: "27px 40px 28px", titleFontSizeSmall: "16px", titleFontSizeMedium: "18px", titleFontSizeLarge: "18px", titleFontSizeHuge: "18px", closeIconSize: "18px", closeSize: "22px" };
function xe(e) {
  const { primaryColor: g, borderRadius: c, lineHeight: o, fontSize: u, cardColor: l, textColor2: d, textColor1: h, dividerColor: p, fontWeightStrong: s, closeIconColor: r, closeIconColorHover: n, closeIconColorPressed: m, closeColorHover: v, closeColorPressed: y, modalColor: w, boxShadow1: $, popoverColor: k, actionColor: x } = e;
  return Object.assign(Object.assign({}, ve), { lineHeight: o, color: l, colorModal: w, colorPopover: k, colorTarget: g, colorEmbedded: x, colorEmbeddedModal: x, colorEmbeddedPopover: x, textColor: d, titleTextColor: h, borderColor: p, actionColor: x, titleFontWeight: s, closeColorHover: v, closeColorPressed: y, closeBorderRadius: c, closeIconColor: r, closeIconColorHover: n, closeIconColorPressed: m, fontSizeSmall: u, fontSizeMedium: u, fontSizeLarge: u, fontSizeHuge: u, boxShadow: $, borderRadius: c });
}
const Ce = { name: "Card", common: ee, self: xe }, _ = a("card-content", `
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`), Se = t([a("card", `
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
 `, [oe({ background: "var(--n-color-modal)" }), b("hoverable", [t("&:hover", "box-shadow: var(--n-box-shadow);")]), b("content-segmented", [t(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `), i("content-scrollbar", [t(">", [a("scrollbar-container", [t(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])])])]), b("content-soft-segmented", [t(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `), i("content-scrollbar", [t(">", [a("scrollbar-container", [t(">", [a("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]), b("footer-segmented", [t(">", [i("footer", `
 padding-top: var(--n-padding-bottom);
 `)])]), b("footer-soft-segmented", [t(">", [i("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), t(">", [a("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [i("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), i("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), i("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), i("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), _, a("card-content", [t("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)]), i("content-scrollbar", `
 display: flex;
 flex-direction: column;
 `, [t(">", [a("scrollbar-container", [t(">", [_])])]), t("&:first-child >", [a("scrollbar-container", [t(">", [a("card-content", `
 padding-top: var(--n-padding-bottom);
 `)])])])]), i("footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [t("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)]), i("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), a("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [t("img", `
 display: block;
 width: 100%;
 `)]), b("bordered", `
 border: 1px solid var(--n-border-color);
 `, [t("&:target", "border-color: var(--n-color-target);")]), b("action-segmented", [t(">", [i("action", [t("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), b("content-segmented, content-soft-segmented", [t(">", [a("card-content", `
 transition: border-color 0.3s var(--n-bezier);
 `, [t("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)]), i("content-scrollbar", `
 transition: border-color 0.3s var(--n-bezier);
 `, [t("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), b("footer-segmented, footer-soft-segmented", [t(">", [i("footer", `
 transition: border-color 0.3s var(--n-bezier);
 `, [t("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)])])]), b("embedded", `
 background-color: var(--n-color-embedded);
 `)]), re(a("card", `
 background: var(--n-color-modal);
 `, [b("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), te(a("card", `
 background: var(--n-color-popover);
 `, [b("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), P = { title: [String, Function], contentClass: String, contentStyle: [Object, String], contentScrollable: Boolean, headerClass: String, headerStyle: [Object, String], headerExtraClass: String, headerExtraStyle: [Object, String], footerClass: String, footerStyle: [Object, String], embedded: Boolean, segmented: { type: [Boolean, Object], default: false }, size: String, bordered: { type: Boolean, default: true }, closable: Boolean, hoverable: Boolean, role: String, onClose: [Function, Array], tag: { type: String, default: "div" }, cover: Function, content: [String, Function], footer: Function, action: Function, headerExtra: Function, closeFocusable: Boolean }, ke = ce(P), ze = Object.assign(Object.assign({}, F.props), P), Ee = ne({ name: "Card", props: ze, slots: Object, setup(e) {
  const g = () => {
    const { onClose: n } = e;
    n && he(n);
  }, { inlineThemeDisabled: c, mergedClsPrefixRef: o, mergedRtlRef: u, mergedComponentPropsRef: l } = ae(e), d = F("Card", "-card", Se, Ce, e, o), h = de("Card", u, o), p = z(() => {
    var n, m;
    return e.size || ((m = (n = l == null ? void 0 : l.value) === null || n === void 0 ? void 0 : n.Card) === null || m === void 0 ? void 0 : m.size) || "medium";
  }), s = z(() => {
    const n = p.value, { self: { color: m, colorModal: v, colorTarget: y, textColor: w, titleTextColor: $, titleFontWeight: k, borderColor: x, actionColor: R, borderRadius: j, lineHeight: B, closeIconColor: M, closeIconColorHover: O, closeIconColorPressed: I, closeColorHover: T, closeColorPressed: H, closeBorderRadius: V, closeIconSize: A, closeSize: L, boxShadow: N, colorPopover: K, colorEmbedded: W, colorEmbeddedModal: q, colorEmbeddedPopover: U, [E("padding", n)]: D, [E("fontSize", n)]: J, [E("titleFontSize", n)]: Q }, common: { cubicBezierEaseInOut: G } } = d.value, { top: X, left: Y, bottom: Z } = be(D);
    return { "--n-bezier": G, "--n-border-radius": j, "--n-color": m, "--n-color-modal": v, "--n-color-popover": K, "--n-color-embedded": W, "--n-color-embedded-modal": q, "--n-color-embedded-popover": U, "--n-color-target": y, "--n-text-color": w, "--n-line-height": B, "--n-action-color": R, "--n-title-text-color": $, "--n-title-font-weight": k, "--n-close-icon-color": M, "--n-close-icon-color-hover": O, "--n-close-icon-color-pressed": I, "--n-close-color-hover": T, "--n-close-color-pressed": H, "--n-border-color": x, "--n-box-shadow": N, "--n-padding-top": X, "--n-padding-bottom": Z, "--n-padding-left": Y, "--n-font-size": J, "--n-title-font-size": Q, "--n-close-size": L, "--n-close-icon-size": A, "--n-close-border-radius": V };
  }), r = c ? se("card", z(() => p.value[0]), s, e) : void 0;
  return { rtlEnabled: h, mergedClsPrefix: o, mergedTheme: d, handleCloseClick: g, cssVars: c ? void 0 : s, themeClass: r == null ? void 0 : r.themeClass, onRender: r == null ? void 0 : r.onRender };
}, render() {
  const { segmented: e, bordered: g, hoverable: c, mergedClsPrefix: o, rtlEnabled: u, onRender: l, embedded: d, tag: h, $slots: p } = this;
  return l == null ? void 0 : l(), f(h, { class: [`${o}-card`, this.themeClass, d && `${o}-card--embedded`, { [`${o}-card--rtl`]: u, [`${o}-card--content-scrollable`]: this.contentScrollable, [`${o}-card--content${typeof e != "boolean" && e.content === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.content, [`${o}-card--footer${typeof e != "boolean" && e.footer === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.footer, [`${o}-card--action-segmented`]: e === true || e !== false && e.action, [`${o}-card--bordered`]: g, [`${o}-card--hoverable`]: c }], style: this.cssVars, role: this.role }, C(p.cover, (s) => {
    const r = this.cover ? S([this.cover()]) : s;
    return r && f("div", { class: `${o}-card-cover`, role: "none" }, r);
  }), C(p.header, (s) => {
    const { title: r } = this, n = r ? S(typeof r == "function" ? [r()] : [r]) : s;
    return n || this.closable ? f("div", { class: [`${o}-card-header`, this.headerClass], style: this.headerStyle, role: "heading" }, f("div", { class: `${o}-card-header__main`, role: "heading" }, n), C(p["header-extra"], (m) => {
      const v = this.headerExtra ? S([this.headerExtra()]) : m;
      return v && f("div", { class: [`${o}-card-header__extra`, this.headerExtraClass], style: this.headerExtraStyle }, v);
    }), this.closable && f(le, { clsPrefix: o, class: `${o}-card-header__close`, onClick: this.handleCloseClick, focusable: this.closeFocusable, absolute: true })) : null;
  }), C(p.default, (s) => {
    const { content: r } = this, n = r ? S(typeof r == "function" ? [r()] : [r]) : s;
    return n ? this.contentScrollable ? f(ie, { class: `${o}-card__content-scrollbar`, contentClass: [`${o}-card-content`, this.contentClass], contentStyle: this.contentStyle }, n) : f("div", { class: [`${o}-card-content`, this.contentClass], style: this.contentStyle, role: "none" }, n) : null;
  }), C(p.footer, (s) => {
    const r = this.footer ? S([this.footer()]) : s;
    return r && f("div", { class: [`${o}-card__footer`, this.footerClass], style: this.footerStyle, role: "none" }, r);
  }), C(p.action, (s) => {
    const r = this.action ? S([this.action()]) : s;
    return r && f("div", { class: `${o}-card__action`, role: "none" }, r);
  }));
} });
function _e() {
  const e = pe(ue, null);
  return e === null && ge("use-message", "No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."), e;
}
function Fe() {
  const e = fe(), g = me();
  async function c(o, u, l) {
    var _a;
    const d = await fetch("/admin/api" + u, { method: o, headers: { "x-api-key": e.apiKey, ...l !== void 0 ? { "Content-Type": "application/json" } : {} }, body: l !== void 0 ? JSON.stringify(l) : void 0 });
    if (d.status === 401 || d.status === 403) throw e.logout(), g.push("/login"), new Error("Unauthorized");
    if (!d.ok) {
      const h = await d.json().catch(() => ({ error: { message: d.statusText } }));
      throw new Error(`[${d.status}] ${((_a = h.error) == null ? void 0 : _a.message) ?? d.statusText}`);
    }
    return d.json();
  }
  return { request: c };
}
export {
  Ee as _,
  Fe as a,
  $e as b,
  Ce as c,
  P as d,
  ke as e,
  _e as u
};
