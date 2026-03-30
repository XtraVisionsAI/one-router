import { u as U } from "./keys-C__mdPdz.js";
import { b as oe, $ as te, a0 as $, H as P, f as T, h as I, g as H, a1 as se, e as re, d as M, j as m, a2 as ne, a3 as le, a4 as ae, a5 as ie, a6 as ce, a7 as de, a8 as ue, a9 as me, L as ve, aa as pe, k as fe, l as V, ab as ge, m as be, a as N, ac as _e, P as w, r as S, w as ye, n as E, p as R, q as p, y as C, s as l, A as K, x as W, v as _, B as A, C as B, _ as he, o as Ce, z as xe, E as Ie } from "./index-DicalUKt.js";
import { u as D } from "./use-message-DGZGK5Il.js";
import { _ as ke } from "./FormItem-BLFgOPpX.js";
import { _ as we } from "./Input-VFsf8aBL.js";
import { _ as ze } from "./InputNumber-ABEEFNvO.js";
import { a as L } from "./format-bYRzmlsO.js";
import { a as $e, N as Pe } from "./DataTable-DkCuQcym.js";
import "./useApi-yvWB8agy.js";
import "./get-BZTOcoVz.js";
import "./use-merged-state-CkMZ2DWG.js";
import "./Dropdown-DwMgs0HP.js";
import "./use-compitable-Cxdw_G8M.js";
function Se(u) {
  const { lineHeight: s, borderRadius: i, fontWeightStrong: f, baseColor: c, dividerColor: g, actionColor: h, textColor1: b, textColor2: o, closeColorHover: y, closeColorPressed: x, closeIconColor: v, closeIconColorHover: r, closeIconColorPressed: a, infoColor: n, successColor: e, warningColor: t, errorColor: z, fontSize: d } = u;
  return Object.assign(Object.assign({}, te), { fontSize: d, lineHeight: s, titleFontWeight: f, borderRadius: i, border: `1px solid ${g}`, color: h, titleTextColor: b, iconColor: o, contentTextColor: o, closeBorderRadius: i, closeColorHover: y, closeColorPressed: x, closeIconColor: v, closeIconColorHover: r, closeIconColorPressed: a, borderInfo: `1px solid ${$(c, P(n, { alpha: 0.25 }))}`, colorInfo: $(c, P(n, { alpha: 0.08 })), titleTextColorInfo: b, iconColorInfo: n, contentTextColorInfo: o, closeColorHoverInfo: y, closeColorPressedInfo: x, closeIconColorInfo: v, closeIconColorHoverInfo: r, closeIconColorPressedInfo: a, borderSuccess: `1px solid ${$(c, P(e, { alpha: 0.25 }))}`, colorSuccess: $(c, P(e, { alpha: 0.08 })), titleTextColorSuccess: b, iconColorSuccess: e, contentTextColorSuccess: o, closeColorHoverSuccess: y, closeColorPressedSuccess: x, closeIconColorSuccess: v, closeIconColorHoverSuccess: r, closeIconColorPressedSuccess: a, borderWarning: `1px solid ${$(c, P(t, { alpha: 0.33 }))}`, colorWarning: $(c, P(t, { alpha: 0.08 })), titleTextColorWarning: b, iconColorWarning: t, contentTextColorWarning: o, closeColorHoverWarning: y, closeColorPressedWarning: x, closeIconColorWarning: v, closeIconColorHoverWarning: r, closeIconColorPressedWarning: a, borderError: `1px solid ${$(c, P(z, { alpha: 0.25 }))}`, colorError: $(c, P(z, { alpha: 0.08 })), titleTextColorError: b, iconColorError: z, contentTextColorError: o, closeColorHoverError: y, closeColorPressedError: x, closeIconColorError: v, closeIconColorHoverError: r, closeIconColorPressedError: a });
}
const Te = { common: oe, self: Se }, Ae = T("alert", `
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`, [I("border", `
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `), H("closable", [T("alert-body", [I("title", `
 padding-right: 24px;
 `)])]), I("icon", { color: "var(--n-icon-color)" }), T("alert-body", { padding: "var(--n-padding)" }, [I("title", { color: "var(--n-title-text-color)" }), I("content", { color: "var(--n-content-text-color)" })]), se({ originalTransition: "transform .3s var(--n-bezier)", enterToProps: { transform: "scale(1)" }, leaveToProps: { transform: "scale(0.9)" } }), I("icon", `
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `), I("close", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `), H("show-icon", [T("alert-body", { paddingLeft: "calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))" })]), H("right-adjust", [T("alert-body", { paddingRight: "calc(var(--n-close-size) + var(--n-padding) + 2px)" })]), T("alert-body", `
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `, [I("title", `
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `, [re("& +", [I("content", { marginTop: "9px" })])]), I("content", { transition: "color .3s var(--n-bezier)", fontSize: "var(--n-font-size)" })]), I("icon", { transition: "color .3s var(--n-bezier)" })]), Ee = Object.assign(Object.assign({}, V.props), { title: String, showIcon: { type: Boolean, default: true }, type: { type: String, default: "default" }, bordered: { type: Boolean, default: true }, closable: Boolean, onClose: Function, onAfterLeave: Function, onAfterHide: Function }), Be = M({ name: "Alert", inheritAttrs: false, props: Ee, slots: Object, setup(u) {
  const { mergedClsPrefixRef: s, mergedBorderedRef: i, inlineThemeDisabled: f, mergedRtlRef: c } = fe(u), g = V("Alert", "-alert", Ae, Te, u, s), h = ge("Alert", c, s), b = N(() => {
    const { common: { cubicBezierEaseInOut: a }, self: n } = g.value, { fontSize: e, borderRadius: t, titleFontWeight: z, lineHeight: d, iconSize: F, iconMargin: j, iconMarginRtl: O, closeIconSize: q, closeBorderRadius: G, closeSize: J, closeMargin: Q, closeMarginRtl: X, padding: Y } = n, { type: k } = u, { left: Z, right: ee } = _e(j);
    return { "--n-bezier": a, "--n-color": n[w("color", k)], "--n-close-icon-size": q, "--n-close-border-radius": G, "--n-close-color-hover": n[w("closeColorHover", k)], "--n-close-color-pressed": n[w("closeColorPressed", k)], "--n-close-icon-color": n[w("closeIconColor", k)], "--n-close-icon-color-hover": n[w("closeIconColorHover", k)], "--n-close-icon-color-pressed": n[w("closeIconColorPressed", k)], "--n-icon-color": n[w("iconColor", k)], "--n-border": n[w("border", k)], "--n-title-text-color": n[w("titleTextColor", k)], "--n-content-text-color": n[w("contentTextColor", k)], "--n-line-height": d, "--n-border-radius": t, "--n-font-size": e, "--n-title-font-weight": z, "--n-icon-size": F, "--n-icon-margin": j, "--n-icon-margin-rtl": O, "--n-close-size": J, "--n-close-margin": Q, "--n-close-margin-rtl": X, "--n-padding": Y, "--n-icon-margin-left": Z, "--n-icon-margin-right": ee };
  }), o = f ? be("alert", N(() => u.type[0]), b, u) : void 0, y = S(true), x = () => {
    const { onAfterLeave: a, onAfterHide: n } = u;
    a && a(), n && n();
  };
  return { rtlEnabled: h, mergedClsPrefix: s, mergedBordered: i, visible: y, handleCloseClick: () => {
    var a;
    Promise.resolve((a = u.onClose) === null || a === void 0 ? void 0 : a.call(u)).then((n) => {
      n !== false && (y.value = false);
    });
  }, handleAfterLeave: () => {
    x();
  }, mergedTheme: g, cssVars: f ? void 0 : b, themeClass: o == null ? void 0 : o.themeClass, onRender: o == null ? void 0 : o.onRender };
}, render() {
  var u;
  return (u = this.onRender) === null || u === void 0 || u.call(this), m(pe, { onAfterLeave: this.handleAfterLeave }, { default: () => {
    const { mergedClsPrefix: s, $slots: i } = this, f = { class: [`${s}-alert`, this.themeClass, this.closable && `${s}-alert--closable`, this.showIcon && `${s}-alert--show-icon`, !this.title && this.closable && `${s}-alert--right-adjust`, this.rtlEnabled && `${s}-alert--rtl`], style: this.cssVars, role: "alert" };
    return this.visible ? m("div", Object.assign({}, ne(this.$attrs, f)), this.closable && m(le, { clsPrefix: s, class: `${s}-alert__close`, onClick: this.handleCloseClick }), this.bordered && m("div", { class: `${s}-alert__border` }), this.showIcon && m("div", { class: `${s}-alert__icon`, "aria-hidden": "true" }, ae(i.icon, () => [m(ie, { clsPrefix: s }, { default: () => {
      switch (this.type) {
        case "success":
          return m(me, null);
        case "info":
          return m(ue, null);
        case "warning":
          return m(de, null);
        case "error":
          return m(ce, null);
        default:
          return null;
      }
    } })])), m("div", { class: [`${s}-alert-body`, this.mergedBordered && `${s}-alert-body--bordered`] }, ve(i.header, (c) => {
      const g = c || this.title;
      return g ? m("div", { class: `${s}-alert-body__title` }, g) : null;
    }), i.default && m("div", { class: `${s}-alert-body__content` }, i))) : null;
  } });
} }), Re = { class: "space-y-1" }, Ne = { style: { "font-family": "monospace", "font-size": "12px", color: "#94a3b8", padding: "6px 0", "word-break": "break-all" } }, He = { class: "flex gap-4" }, Ke = { class: "flex justify-end gap-2" }, We = M({ __name: "KeyModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(u, { emit: s }) {
  const i = u, f = s, c = D(), g = U(), h = N(() => !!i.existing), b = N(() => h.value ? "Edit API Key" : "Create API Key"), o = S({ name: "", user_id: "", rate_limit: 100, monthly_budget: null, service_tier: "default" }), y = S(false);
  ye(() => i.show, (v) => {
    var _a, _b, _c, _d, _e2;
    v && (o.value = { name: ((_a = i.existing) == null ? void 0 : _a.name) ?? "", user_id: ((_b = i.existing) == null ? void 0 : _b.user_id) ?? "", rate_limit: ((_c = i.existing) == null ? void 0 : _c.rate_limit) ?? 100, monthly_budget: ((_d = i.existing) == null ? void 0 : _d.monthly_budget) ?? null, service_tier: ((_e2 = i.existing) == null ? void 0 : _e2.service_tier) ?? "default" });
  });
  async function x() {
    if (!o.value.name.trim()) {
      c.error("Name is required");
      return;
    }
    if (!h.value && !o.value.user_id.trim()) {
      c.error("User ID is required");
      return;
    }
    y.value = true;
    try {
      if (h.value) {
        const v = { name: o.value.name, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier };
        await g.update(i.existing.api_key, v), c.success("Key updated"), f("update:show", false), f("saved");
      } else {
        const v = { name: o.value.name, user_id: o.value.user_id, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier }, r = await g.create(v);
        c.success("Key created"), f("update:show", false), f("saved", r.api_key);
      }
    } catch (v) {
      c.error(v.message);
    } finally {
      y.value = false;
    }
  }
  return (v, r) => {
    const a = ke, n = we, e = ze, t = A, z = he;
    return E(), R(z, { show: u.show, title: l(b), preset: "card", style: { width: "480px" }, "onUpdate:show": r[6] || (r[6] = (d) => f("update:show", d)) }, { footer: p(() => [C("div", Ke, [_(t, { onClick: r[5] || (r[5] = (d) => f("update:show", false)) }, { default: p(() => [...r[7] || (r[7] = [B("Cancel", -1)])]), _: 1 }), _(t, { type: "primary", loading: l(y), onClick: x }, { default: p(() => [B(K(l(h) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: p(() => [C("div", Re, [l(h) ? (E(), R(a, { key: 0, label: "Key" }, { default: p(() => [C("div", Ne, K(u.existing.api_key), 1)]), _: 1 })) : W("", true), _(a, { label: "Name", required: "" }, { default: p(() => [_(n, { value: l(o).name, "onUpdate:value": r[0] || (r[0] = (d) => l(o).name = d), placeholder: "e.g. Production App" }, null, 8, ["value"])]), _: 1 }), l(h) ? W("", true) : (E(), R(a, { key: 1, label: "User ID", required: "" }, { default: p(() => [_(n, { value: l(o).user_id, "onUpdate:value": r[1] || (r[1] = (d) => l(o).user_id = d), placeholder: "e.g. user_001" }, null, 8, ["value"])]), _: 1 })), C("div", He, [_(a, { label: "Rate Limit (rpm)", class: "flex-1" }, { default: p(() => [_(e, { value: l(o).rate_limit, "onUpdate:value": r[2] || (r[2] = (d) => l(o).rate_limit = d), min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), _(a, { label: "Monthly Budget ($)", class: "flex-1" }, { default: p(() => [_(e, { value: l(o).monthly_budget, "onUpdate:value": r[3] || (r[3] = (d) => l(o).monthly_budget = d), min: 0, precision: 2, placeholder: "unlimited", class: "w-full" }, null, 8, ["value"])]), _: 1 })]), _(a, { label: "Service Tier" }, { default: p(() => [_(n, { value: l(o).service_tier, "onUpdate:value": r[4] || (r[4] = (d) => l(o).service_tier = d) }, null, 8, ["value"])]), _: 1 })])]), _: 1 }, 8, ["show", "title"]);
  };
} }), Me = { class: "flex items-center justify-between mb-6" }, je = { class: "flex items-center gap-3 mt-2" }, Le = { class: "font-mono text-sm" }, Ue = { class: "py-12 text-center" }, to = M({ __name: "keys", setup(u) {
  const s = D(), i = U(), f = S([]), c = S(true), g = S(false), h = S(), b = S(null);
  async function o() {
    c.value = true;
    try {
      const e = await i.list();
      f.value = e.data;
    } catch (e) {
      s.error(e.message);
    } finally {
      c.value = false;
    }
  }
  function y() {
    h.value = void 0, g.value = true;
  }
  function x(e) {
    h.value = e, g.value = true;
  }
  async function v(e) {
    try {
      e.is_active ? (await i.deactivate(e.api_key), s.success("Key deactivated")) : (await i.activate(e.api_key), s.success("Key activated")), await o();
    } catch (t) {
      s.error(t.message);
    }
  }
  function r(e) {
    e && (b.value = e), o();
  }
  function a(e) {
    navigator.clipboard.writeText(e).then(() => s.success("Copied!"));
  }
  const n = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => m("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "User", key: "user_id", render: (e) => m("span", { class: "text-slate-400" }, e.user_id) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Budget MTD", key: "budget", render: (e) => e.monthly_budget != null ? `${L(e.budget_used_mtd)} / ${L(e.monthly_budget)}` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => m(Pe, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }, { title: "Actions", key: "actions", render: (e) => m("div", { class: "flex gap-2" }, [m(A, { size: "small", onClick: () => x(e) }, { default: () => "Edit" }), m(A, { size: "small", type: e.is_active ? "warning" : "default", onClick: () => v(e) }, { default: () => e.is_active ? "Deactivate" : "Activate" })]) }];
  return Ce(o), (e, t) => {
    const z = $e;
    return E(), xe("div", null, [C("div", Me, [t[5] || (t[5] = C("h1", { class: "text-xl font-semibold text-slate-100" }, "API Keys", -1)), _(l(A), { type: "primary", onClick: y }, { icon: p(() => [...t[3] || (t[3] = [C("span", { class: "i-carbon-add" }, null, -1)])]), default: p(() => [t[4] || (t[4] = B(" Create Key ", -1))]), _: 1 })]), l(b) ? (E(), R(l(Be), { key: 0, type: "success", class: "mb-4", title: "API Key Created \u2014 save this key now, it will not be shown again", closable: "", onClose: t[1] || (t[1] = (d) => b.value = null) }, { default: p(() => [C("div", je, [C("span", Le, K(l(b)), 1), _(l(A), { size: "small", onClick: t[0] || (t[0] = (d) => a(l(b))) }, { icon: p(() => [...t[6] || (t[6] = [C("span", { class: "i-carbon-copy" }, null, -1)])]), default: p(() => [t[7] || (t[7] = B(" Copy ", -1))]), _: 1 })])]), _: 1 })) : W("", true), _(z, { columns: n, data: l(f), loading: l(c), pagination: { pageSize: 20 }, size: "small" }, { empty: p(() => [C("div", Ue, [t[9] || (t[9] = C("span", { class: "i-carbon-api text-4xl text-slate-600 block mx-auto mb-3" }, null, -1)), t[10] || (t[10] = C("p", { class: "text-slate-500 text-sm" }, "No API keys yet", -1)), _(l(A), { type: "primary", size: "small", class: "mt-4", onClick: y }, { default: p(() => [...t[8] || (t[8] = [B("Create your first key", -1)])]), _: 1 })])]), _: 1 }, 8, ["data", "loading"]), _(We, { show: l(g), "onUpdate:show": t[2] || (t[2] = (d) => Ie(g) ? g.value = d : null), existing: l(h), onSaved: r }, null, 8, ["show", "existing"])]);
  };
} });
export {
  to as default
};
