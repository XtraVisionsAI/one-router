import { u as U } from "./keys-CDSUdvEK.js";
import { B } from "./Button-BG9pNlUY.js";
import { b as ee, U as oe, V as $, F as S, f as P, h as x, g as K, W as te, e as re, d as j, j as u, X as se, Y as ne, Z as le, k as ie, l as F, _ as ae, m as ce, a as N, $ as de, a0 as ue, a1 as ve, a2 as me, a3 as fe, a4 as pe, J as k, r as T, w as ge, n as E, p as R, q as _, y as z, s as l, A as W, x as M, v as b, B as H, o as be, z as _e, D as he } from "./index-BKXoSCv0.js";
import { u as V } from "./use-message-Diy95wEL.js";
import { _ as ye } from "./FormItem-Cc6dA3q3.js";
import { _ as Ce } from "./Input-DKOKpeJJ.js";
import { _ as xe, a as Ie } from "./InputNumber-D8wOYa0x.js";
import { b as we, r as ke } from "./use-form-item-PZPZ68wM.js";
import { a as ze, N as $e } from "./DataTable-DsJvKjqU.js";
import "./useApi-C-MENBV9.js";
import "./Dropdown-BC1cSchD.js";
import "./use-compitable-UGUh8sH4.js";
function Se(d) {
  const { lineHeight: t, borderRadius: a, fontWeightStrong: f, baseColor: c, dividerColor: p, actionColor: h, textColor1: g, textColor2: o, closeColorHover: y, closeColorPressed: C, closeIconColor: m, closeIconColorHover: r, closeIconColorPressed: i, infoColor: s, successColor: I, warningColor: e, errorColor: n, fontSize: v } = d;
  return Object.assign(Object.assign({}, oe), { fontSize: v, lineHeight: t, titleFontWeight: f, borderRadius: a, border: `1px solid ${p}`, color: h, titleTextColor: g, iconColor: o, contentTextColor: o, closeBorderRadius: a, closeColorHover: y, closeColorPressed: C, closeIconColor: m, closeIconColorHover: r, closeIconColorPressed: i, borderInfo: `1px solid ${$(c, S(s, { alpha: 0.25 }))}`, colorInfo: $(c, S(s, { alpha: 0.08 })), titleTextColorInfo: g, iconColorInfo: s, contentTextColorInfo: o, closeColorHoverInfo: y, closeColorPressedInfo: C, closeIconColorInfo: m, closeIconColorHoverInfo: r, closeIconColorPressedInfo: i, borderSuccess: `1px solid ${$(c, S(I, { alpha: 0.25 }))}`, colorSuccess: $(c, S(I, { alpha: 0.08 })), titleTextColorSuccess: g, iconColorSuccess: I, contentTextColorSuccess: o, closeColorHoverSuccess: y, closeColorPressedSuccess: C, closeIconColorSuccess: m, closeIconColorHoverSuccess: r, closeIconColorPressedSuccess: i, borderWarning: `1px solid ${$(c, S(e, { alpha: 0.33 }))}`, colorWarning: $(c, S(e, { alpha: 0.08 })), titleTextColorWarning: g, iconColorWarning: e, contentTextColorWarning: o, closeColorHoverWarning: y, closeColorPressedWarning: C, closeIconColorWarning: m, closeIconColorHoverWarning: r, closeIconColorPressedWarning: i, borderError: `1px solid ${$(c, S(n, { alpha: 0.25 }))}`, colorError: $(c, S(n, { alpha: 0.08 })), titleTextColorError: g, iconColorError: n, contentTextColorError: o, closeColorHoverError: y, closeColorPressedError: C, closeIconColorError: m, closeIconColorHoverError: r, closeIconColorPressedError: i });
}
const Te = { common: ee, self: Se }, Pe = P("alert", `
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`, [x("border", `
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `), K("closable", [P("alert-body", [x("title", `
 padding-right: 24px;
 `)])]), x("icon", { color: "var(--n-icon-color)" }), P("alert-body", { padding: "var(--n-padding)" }, [x("title", { color: "var(--n-title-text-color)" }), x("content", { color: "var(--n-content-text-color)" })]), te({ originalTransition: "transform .3s var(--n-bezier)", enterToProps: { transform: "scale(1)" }, leaveToProps: { transform: "scale(0.9)" } }), x("icon", `
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
 `), x("close", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `), K("show-icon", [P("alert-body", { paddingLeft: "calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))" })]), K("right-adjust", [P("alert-body", { paddingRight: "calc(var(--n-close-size) + var(--n-padding) + 2px)" })]), P("alert-body", `
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `, [x("title", `
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `, [re("& +", [x("content", { marginTop: "9px" })])]), x("content", { transition: "color .3s var(--n-bezier)", fontSize: "var(--n-font-size)" })]), x("icon", { transition: "color .3s var(--n-bezier)" })]), Ae = Object.assign(Object.assign({}, F.props), { title: String, showIcon: { type: Boolean, default: true }, type: { type: String, default: "default" }, bordered: { type: Boolean, default: true }, closable: Boolean, onClose: Function, onAfterLeave: Function, onAfterHide: Function }), Be = j({ name: "Alert", inheritAttrs: false, props: Ae, slots: Object, setup(d) {
  const { mergedClsPrefixRef: t, mergedBorderedRef: a, inlineThemeDisabled: f, mergedRtlRef: c } = ie(d), p = F("Alert", "-alert", Pe, Te, d, t), h = ae("Alert", c, t), g = N(() => {
    const { common: { cubicBezierEaseInOut: i }, self: s } = p.value, { fontSize: I, borderRadius: e, titleFontWeight: n, lineHeight: v, iconSize: A, iconMargin: L, iconMarginRtl: D, closeIconSize: O, closeBorderRadius: q, closeSize: J, closeMargin: X, closeMarginRtl: Y, padding: Z } = s, { type: w } = d, { left: G, right: Q } = pe(L);
    return { "--n-bezier": i, "--n-color": s[k("color", w)], "--n-close-icon-size": O, "--n-close-border-radius": q, "--n-close-color-hover": s[k("closeColorHover", w)], "--n-close-color-pressed": s[k("closeColorPressed", w)], "--n-close-icon-color": s[k("closeIconColor", w)], "--n-close-icon-color-hover": s[k("closeIconColorHover", w)], "--n-close-icon-color-pressed": s[k("closeIconColorPressed", w)], "--n-icon-color": s[k("iconColor", w)], "--n-border": s[k("border", w)], "--n-title-text-color": s[k("titleTextColor", w)], "--n-content-text-color": s[k("contentTextColor", w)], "--n-line-height": v, "--n-border-radius": e, "--n-font-size": I, "--n-title-font-weight": n, "--n-icon-size": A, "--n-icon-margin": L, "--n-icon-margin-rtl": D, "--n-close-size": J, "--n-close-margin": X, "--n-close-margin-rtl": Y, "--n-padding": Z, "--n-icon-margin-left": G, "--n-icon-margin-right": Q };
  }), o = f ? ce("alert", N(() => d.type[0]), g, d) : void 0, y = T(true), C = () => {
    const { onAfterLeave: i, onAfterHide: s } = d;
    i && i(), s && s();
  };
  return { rtlEnabled: h, mergedClsPrefix: t, mergedBordered: a, visible: y, handleCloseClick: () => {
    var i;
    Promise.resolve((i = d.onClose) === null || i === void 0 ? void 0 : i.call(d)).then((s) => {
      s !== false && (y.value = false);
    });
  }, handleAfterLeave: () => {
    C();
  }, mergedTheme: p, cssVars: f ? void 0 : g, themeClass: o == null ? void 0 : o.themeClass, onRender: o == null ? void 0 : o.onRender };
}, render() {
  var d;
  return (d = this.onRender) === null || d === void 0 || d.call(this), u(le, { onAfterLeave: this.handleAfterLeave }, { default: () => {
    const { mergedClsPrefix: t, $slots: a } = this, f = { class: [`${t}-alert`, this.themeClass, this.closable && `${t}-alert--closable`, this.showIcon && `${t}-alert--show-icon`, !this.title && this.closable && `${t}-alert--right-adjust`, this.rtlEnabled && `${t}-alert--rtl`], style: this.cssVars, role: "alert" };
    return this.visible ? u("div", Object.assign({}, se(this.$attrs, f)), this.closable && u(ne, { clsPrefix: t, class: `${t}-alert__close`, onClick: this.handleCloseClick }), this.bordered && u("div", { class: `${t}-alert__border` }), this.showIcon && u("div", { class: `${t}-alert__icon`, "aria-hidden": "true" }, we(a.icon, () => [u(de, { clsPrefix: t }, { default: () => {
      switch (this.type) {
        case "success":
          return u(fe, null);
        case "info":
          return u(me, null);
        case "warning":
          return u(ve, null);
        case "error":
          return u(ue, null);
        default:
          return null;
      }
    } })])), u("div", { class: [`${t}-alert-body`, this.mergedBordered && `${t}-alert-body--bordered`] }, ke(a.header, (c) => {
      const p = c || this.title;
      return p ? u("div", { class: `${t}-alert-body__title` }, p) : null;
    }), a.default && u("div", { class: `${t}-alert-body__content` }, a))) : null;
  } });
} }), Ee = { class: "space-y-1" }, Re = { style: { "font-family": "monospace", "font-size": "12px", color: "#94a3b8", padding: "6px 0", "word-break": "break-all" } }, Ne = { class: "flex gap-4" }, He = { class: "flex justify-end gap-2" }, Ke = j({ __name: "KeyModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(d, { emit: t }) {
  const a = d, f = t, c = V(), p = U(), h = N(() => !!a.existing), g = N(() => h.value ? "Edit API Key" : "Create API Key"), o = T({ name: "", user_id: "", rate_limit: 100, monthly_budget: null, service_tier: "default" }), y = T(false);
  ge(() => a.show, (m) => {
    var _a, _b, _c, _d, _e2;
    m && (o.value = { name: ((_a = a.existing) == null ? void 0 : _a.name) ?? "", user_id: ((_b = a.existing) == null ? void 0 : _b.user_id) ?? "", rate_limit: ((_c = a.existing) == null ? void 0 : _c.rate_limit) ?? 100, monthly_budget: ((_d = a.existing) == null ? void 0 : _d.monthly_budget) ?? null, service_tier: ((_e2 = a.existing) == null ? void 0 : _e2.service_tier) ?? "default" });
  });
  async function C() {
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
        const m = { name: o.value.name, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier };
        await p.update(a.existing.api_key, m), c.success("Key updated"), f("update:show", false), f("saved");
      } else {
        const m = { name: o.value.name, user_id: o.value.user_id, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier }, r = await p.create(m);
        c.success("Key created"), f("update:show", false), f("saved", r.api_key);
      }
    } catch (m) {
      c.error(m.message);
    } finally {
      y.value = false;
    }
  }
  return (m, r) => {
    const i = ye, s = Ce, I = xe, e = B, n = Ie;
    return E(), R(n, { show: d.show, title: l(g), preset: "card", style: { width: "480px" }, "onUpdate:show": r[6] || (r[6] = (v) => f("update:show", v)) }, { footer: _(() => [z("div", He, [b(e, { onClick: r[5] || (r[5] = (v) => f("update:show", false)) }, { default: _(() => [...r[7] || (r[7] = [H("Cancel", -1)])]), _: 1 }), b(e, { type: "primary", loading: l(y), onClick: C }, { default: _(() => [H(W(l(h) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: _(() => [z("div", Ee, [l(h) ? (E(), R(i, { key: 0, label: "Key" }, { default: _(() => [z("div", Re, W(d.existing.api_key), 1)]), _: 1 })) : M("", true), b(i, { label: "Name", required: "" }, { default: _(() => [b(s, { value: l(o).name, "onUpdate:value": r[0] || (r[0] = (v) => l(o).name = v), placeholder: "e.g. Production App" }, null, 8, ["value"])]), _: 1 }), l(h) ? M("", true) : (E(), R(i, { key: 1, label: "User ID", required: "" }, { default: _(() => [b(s, { value: l(o).user_id, "onUpdate:value": r[1] || (r[1] = (v) => l(o).user_id = v), placeholder: "e.g. user_001" }, null, 8, ["value"])]), _: 1 })), z("div", Ne, [b(i, { label: "Rate Limit (rpm)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).rate_limit, "onUpdate:value": r[2] || (r[2] = (v) => l(o).rate_limit = v), min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), b(i, { label: "Monthly Budget ($)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).monthly_budget, "onUpdate:value": r[3] || (r[3] = (v) => l(o).monthly_budget = v), min: 0, precision: 2, placeholder: "unlimited", class: "w-full" }, null, 8, ["value"])]), _: 1 })]), b(i, { label: "Service Tier" }, { default: _(() => [b(s, { value: l(o).service_tier, "onUpdate:value": r[4] || (r[4] = (v) => l(o).service_tier = v) }, null, 8, ["value"])]), _: 1 })])]), _: 1 }, 8, ["show", "title"]);
  };
} }), We = { class: "flex items-center justify-between mb-6" }, Me = { class: "flex items-center gap-3 mt-2" }, je = { class: "font-mono text-sm" }, Qe = j({ __name: "keys", setup(d) {
  const t = V(), a = U(), f = T([]), c = T(true), p = T(false), h = T(), g = T(null);
  async function o() {
    c.value = true;
    try {
      const e = await a.list();
      f.value = e.data;
    } catch (e) {
      t.error(e.message);
    } finally {
      c.value = false;
    }
  }
  function y() {
    h.value = void 0, p.value = true;
  }
  function C(e) {
    h.value = e, p.value = true;
  }
  async function m(e) {
    try {
      e.is_active ? (await a.deactivate(e.api_key), t.success("Key deactivated")) : (await a.activate(e.api_key), t.success("Key activated")), await o();
    } catch (n) {
      t.error(n.message);
    }
  }
  function r(e) {
    e && (g.value = e), o();
  }
  function i(e) {
    navigator.clipboard.writeText(e).then(() => t.success("Copied!"));
  }
  function s(e) {
    return e == null ? "\u2014" : "$" + e.toFixed(2);
  }
  const I = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => u("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "User", key: "user_id", render: (e) => u("span", { class: "text-slate-400" }, e.user_id) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Budget MTD", key: "budget", render: (e) => e.monthly_budget != null ? `${s(e.budget_used_mtd)} / ${s(e.monthly_budget)}` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => u($e, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }, { title: "Actions", key: "actions", render: (e) => u("div", { class: "flex gap-2" }, [u(B, { size: "small", onClick: () => C(e) }, { default: () => "Edit" }), u(B, { size: "small", type: e.is_active ? "warning" : "default", onClick: () => m(e) }, { default: () => e.is_active ? "Deactivate" : "Activate" })]) }];
  return be(o), (e, n) => {
    const v = ze;
    return E(), _e("div", null, [z("div", We, [n[5] || (n[5] = z("h1", { class: "text-xl font-semibold text-slate-100" }, "API Keys", -1)), b(l(B), { type: "primary", onClick: y }, { icon: _(() => [...n[3] || (n[3] = [z("span", { class: "i-carbon-add" }, null, -1)])]), default: _(() => [n[4] || (n[4] = H(" Create Key ", -1))]), _: 1 })]), l(g) ? (E(), R(l(Be), { key: 0, type: "success", class: "mb-4", title: "API Key Created \u2014 save this key now, it will not be shown again", closable: "", onClose: n[1] || (n[1] = (A) => g.value = null) }, { default: _(() => [z("div", Me, [z("span", je, W(l(g)), 1), b(l(B), { size: "small", onClick: n[0] || (n[0] = (A) => i(l(g))) }, { icon: _(() => [...n[6] || (n[6] = [z("span", { class: "i-carbon-copy" }, null, -1)])]), default: _(() => [n[7] || (n[7] = H(" Copy ", -1))]), _: 1 })])]), _: 1 })) : M("", true), b(v, { columns: I, data: l(f), loading: l(c), pagination: { pageSize: 20 }, size: "small" }, null, 8, ["data", "loading"]), b(Ke, { show: l(p), "onUpdate:show": n[2] || (n[2] = (A) => he(p) ? p.value = A : null), existing: l(h), onSaved: r }, null, 8, ["show", "existing"])]);
  };
} });
export {
  Qe as default
};
