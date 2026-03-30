import { u as L } from "./keys-Cq4-olxl.js";
import { B } from "./Button-VZQzYgCk.js";
import { b as ee, U as oe, V as $, F as S, f as P, h as x, g as K, W as te, e as re, d as M, j as u, X as ne, Y as se, Z as le, k as ae, l as U, _ as ie, m as ce, a as N, $ as de, a0 as ue, a1 as ve, a2 as me, a3 as fe, a4 as ge, J as k, r as T, w as pe, n as E, p as R, q as _, y as z, s as l, v as b, x as W, B as H, A as F, o as be, z as _e, D as he } from "./index-BeCJuQaP.js";
import { u as V } from "./use-message-DKczUg3b.js";
import { _ as Ce } from "./FormItem-Bv_x9aEm.js";
import { _ as ye } from "./Input-ZeuXgzVS.js";
import { _ as xe, a as Ie } from "./InputNumber-3jxQTUTU.js";
import { b as we, r as ke } from "./use-form-item-FVzrOHI4.js";
import { a as ze, N as $e } from "./DataTable-oI1U9dT2.js";
import "./useApi-vKujPf0b.js";
import "./Dropdown-Ci2kVRZD.js";
import "./use-compitable-E97dXjzV.js";
function Se(d) {
  const { lineHeight: r, borderRadius: a, fontWeightStrong: f, baseColor: i, dividerColor: g, actionColor: h, textColor1: p, textColor2: o, closeColorHover: C, closeColorPressed: y, closeIconColor: m, closeIconColorHover: n, closeIconColorPressed: c, infoColor: t, successColor: I, warningColor: e, errorColor: s, fontSize: v } = d;
  return Object.assign(Object.assign({}, oe), { fontSize: v, lineHeight: r, titleFontWeight: f, borderRadius: a, border: `1px solid ${g}`, color: h, titleTextColor: p, iconColor: o, contentTextColor: o, closeBorderRadius: a, closeColorHover: C, closeColorPressed: y, closeIconColor: m, closeIconColorHover: n, closeIconColorPressed: c, borderInfo: `1px solid ${$(i, S(t, { alpha: 0.25 }))}`, colorInfo: $(i, S(t, { alpha: 0.08 })), titleTextColorInfo: p, iconColorInfo: t, contentTextColorInfo: o, closeColorHoverInfo: C, closeColorPressedInfo: y, closeIconColorInfo: m, closeIconColorHoverInfo: n, closeIconColorPressedInfo: c, borderSuccess: `1px solid ${$(i, S(I, { alpha: 0.25 }))}`, colorSuccess: $(i, S(I, { alpha: 0.08 })), titleTextColorSuccess: p, iconColorSuccess: I, contentTextColorSuccess: o, closeColorHoverSuccess: C, closeColorPressedSuccess: y, closeIconColorSuccess: m, closeIconColorHoverSuccess: n, closeIconColorPressedSuccess: c, borderWarning: `1px solid ${$(i, S(e, { alpha: 0.33 }))}`, colorWarning: $(i, S(e, { alpha: 0.08 })), titleTextColorWarning: p, iconColorWarning: e, contentTextColorWarning: o, closeColorHoverWarning: C, closeColorPressedWarning: y, closeIconColorWarning: m, closeIconColorHoverWarning: n, closeIconColorPressedWarning: c, borderError: `1px solid ${$(i, S(s, { alpha: 0.25 }))}`, colorError: $(i, S(s, { alpha: 0.08 })), titleTextColorError: p, iconColorError: s, contentTextColorError: o, closeColorHoverError: C, closeColorPressedError: y, closeIconColorError: m, closeIconColorHoverError: n, closeIconColorPressedError: c });
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
 `, [re("& +", [x("content", { marginTop: "9px" })])]), x("content", { transition: "color .3s var(--n-bezier)", fontSize: "var(--n-font-size)" })]), x("icon", { transition: "color .3s var(--n-bezier)" })]), Ae = Object.assign(Object.assign({}, U.props), { title: String, showIcon: { type: Boolean, default: true }, type: { type: String, default: "default" }, bordered: { type: Boolean, default: true }, closable: Boolean, onClose: Function, onAfterLeave: Function, onAfterHide: Function }), Be = M({ name: "Alert", inheritAttrs: false, props: Ae, slots: Object, setup(d) {
  const { mergedClsPrefixRef: r, mergedBorderedRef: a, inlineThemeDisabled: f, mergedRtlRef: i } = ae(d), g = U("Alert", "-alert", Pe, Te, d, r), h = ie("Alert", i, r), p = N(() => {
    const { common: { cubicBezierEaseInOut: c }, self: t } = g.value, { fontSize: I, borderRadius: e, titleFontWeight: s, lineHeight: v, iconSize: A, iconMargin: j, iconMarginRtl: D, closeIconSize: O, closeBorderRadius: q, closeSize: J, closeMargin: X, closeMarginRtl: Y, padding: Z } = t, { type: w } = d, { left: G, right: Q } = ge(j);
    return { "--n-bezier": c, "--n-color": t[k("color", w)], "--n-close-icon-size": O, "--n-close-border-radius": q, "--n-close-color-hover": t[k("closeColorHover", w)], "--n-close-color-pressed": t[k("closeColorPressed", w)], "--n-close-icon-color": t[k("closeIconColor", w)], "--n-close-icon-color-hover": t[k("closeIconColorHover", w)], "--n-close-icon-color-pressed": t[k("closeIconColorPressed", w)], "--n-icon-color": t[k("iconColor", w)], "--n-border": t[k("border", w)], "--n-title-text-color": t[k("titleTextColor", w)], "--n-content-text-color": t[k("contentTextColor", w)], "--n-line-height": v, "--n-border-radius": e, "--n-font-size": I, "--n-title-font-weight": s, "--n-icon-size": A, "--n-icon-margin": j, "--n-icon-margin-rtl": D, "--n-close-size": J, "--n-close-margin": X, "--n-close-margin-rtl": Y, "--n-padding": Z, "--n-icon-margin-left": G, "--n-icon-margin-right": Q };
  }), o = f ? ce("alert", N(() => d.type[0]), p, d) : void 0, C = T(true), y = () => {
    const { onAfterLeave: c, onAfterHide: t } = d;
    c && c(), t && t();
  };
  return { rtlEnabled: h, mergedClsPrefix: r, mergedBordered: a, visible: C, handleCloseClick: () => {
    var c;
    Promise.resolve((c = d.onClose) === null || c === void 0 ? void 0 : c.call(d)).then((t) => {
      t !== false && (C.value = false);
    });
  }, handleAfterLeave: () => {
    y();
  }, mergedTheme: g, cssVars: f ? void 0 : p, themeClass: o == null ? void 0 : o.themeClass, onRender: o == null ? void 0 : o.onRender };
}, render() {
  var d;
  return (d = this.onRender) === null || d === void 0 || d.call(this), u(le, { onAfterLeave: this.handleAfterLeave }, { default: () => {
    const { mergedClsPrefix: r, $slots: a } = this, f = { class: [`${r}-alert`, this.themeClass, this.closable && `${r}-alert--closable`, this.showIcon && `${r}-alert--show-icon`, !this.title && this.closable && `${r}-alert--right-adjust`, this.rtlEnabled && `${r}-alert--rtl`], style: this.cssVars, role: "alert" };
    return this.visible ? u("div", Object.assign({}, ne(this.$attrs, f)), this.closable && u(se, { clsPrefix: r, class: `${r}-alert__close`, onClick: this.handleCloseClick }), this.bordered && u("div", { class: `${r}-alert__border` }), this.showIcon && u("div", { class: `${r}-alert__icon`, "aria-hidden": "true" }, we(a.icon, () => [u(de, { clsPrefix: r }, { default: () => {
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
    } })])), u("div", { class: [`${r}-alert-body`, this.mergedBordered && `${r}-alert-body--bordered`] }, ke(a.header, (i) => {
      const g = i || this.title;
      return g ? u("div", { class: `${r}-alert-body__title` }, g) : null;
    }), a.default && u("div", { class: `${r}-alert-body__content` }, a))) : null;
  } });
} }), Ee = { class: "space-y-1" }, Re = { class: "flex gap-4" }, Ne = { class: "flex justify-end gap-2" }, He = M({ __name: "KeyModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(d, { emit: r }) {
  const a = d, f = r, i = V(), g = L(), h = N(() => !!a.existing), p = N(() => h.value ? "Edit API Key" : "Create API Key"), o = T({ name: "", user_id: "", rate_limit: 100, monthly_budget: null, service_tier: "default" }), C = T(false);
  pe(() => a.show, (m) => {
    var _a, _b, _c, _d, _e2;
    m && (o.value = { name: ((_a = a.existing) == null ? void 0 : _a.name) ?? "", user_id: ((_b = a.existing) == null ? void 0 : _b.user_id) ?? "", rate_limit: ((_c = a.existing) == null ? void 0 : _c.rate_limit) ?? 100, monthly_budget: ((_d = a.existing) == null ? void 0 : _d.monthly_budget) ?? null, service_tier: ((_e2 = a.existing) == null ? void 0 : _e2.service_tier) ?? "default" });
  });
  async function y() {
    if (!o.value.name.trim()) {
      i.error("Name is required");
      return;
    }
    if (!h.value && !o.value.user_id.trim()) {
      i.error("User ID is required");
      return;
    }
    C.value = true;
    try {
      if (h.value) {
        const m = { name: o.value.name, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier };
        await g.update(a.existing.api_key, m), i.success("Key updated"), f("update:show", false), f("saved");
      } else {
        const m = { name: o.value.name, user_id: o.value.user_id, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier }, n = await g.create(m);
        i.success("Key created"), f("update:show", false), f("saved", n.api_key);
      }
    } catch (m) {
      i.error(m.message);
    } finally {
      C.value = false;
    }
  }
  return (m, n) => {
    const c = ye, t = Ce, I = xe, e = B, s = Ie;
    return E(), R(s, { show: d.show, title: l(p), preset: "card", style: { width: "480px" }, "onUpdate:show": n[6] || (n[6] = (v) => f("update:show", v)) }, { footer: _(() => [z("div", Ne, [b(e, { onClick: n[5] || (n[5] = (v) => f("update:show", false)) }, { default: _(() => [...n[7] || (n[7] = [H("Cancel", -1)])]), _: 1 }), b(e, { type: "primary", loading: l(C), onClick: y }, { default: _(() => [H(F(l(h) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: _(() => [z("div", Ee, [l(h) ? (E(), R(t, { key: 0, label: "Key" }, { default: _(() => [b(c, { value: d.existing.api_key, readonly: "" }, null, 8, ["value"])]), _: 1 })) : W("", true), b(t, { label: "Name", required: "" }, { default: _(() => [b(c, { value: l(o).name, "onUpdate:value": n[0] || (n[0] = (v) => l(o).name = v), placeholder: "e.g. Production App" }, null, 8, ["value"])]), _: 1 }), l(h) ? W("", true) : (E(), R(t, { key: 1, label: "User ID", required: "" }, { default: _(() => [b(c, { value: l(o).user_id, "onUpdate:value": n[1] || (n[1] = (v) => l(o).user_id = v), placeholder: "e.g. user_001" }, null, 8, ["value"])]), _: 1 })), z("div", Re, [b(t, { label: "Rate Limit (rpm)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).rate_limit, "onUpdate:value": n[2] || (n[2] = (v) => l(o).rate_limit = v), min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), b(t, { label: "Monthly Budget ($)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).monthly_budget, "onUpdate:value": n[3] || (n[3] = (v) => l(o).monthly_budget = v), min: 0, precision: 2, placeholder: "unlimited", class: "w-full" }, null, 8, ["value"])]), _: 1 })]), b(t, { label: "Service Tier" }, { default: _(() => [b(c, { value: l(o).service_tier, "onUpdate:value": n[4] || (n[4] = (v) => l(o).service_tier = v) }, null, 8, ["value"])]), _: 1 })])]), _: 1 }, 8, ["show", "title"]);
  };
} }), Ke = { class: "flex items-center justify-between mb-6" }, We = { class: "flex items-center gap-3 mt-2" }, Me = { class: "font-mono text-sm" }, Ge = M({ __name: "keys", setup(d) {
  const r = V(), a = L(), f = T([]), i = T(true), g = T(false), h = T(), p = T(null);
  async function o() {
    i.value = true;
    try {
      const e = await a.list();
      f.value = e.data;
    } catch (e) {
      r.error(e.message);
    } finally {
      i.value = false;
    }
  }
  function C() {
    h.value = void 0, g.value = true;
  }
  function y(e) {
    h.value = e, g.value = true;
  }
  async function m(e) {
    try {
      e.is_active ? (await a.deactivate(e.api_key), r.success("Key deactivated")) : (await a.activate(e.api_key), r.success("Key activated")), await o();
    } catch (s) {
      r.error(s.message);
    }
  }
  function n(e) {
    e && (p.value = e), o();
  }
  function c(e) {
    navigator.clipboard.writeText(e).then(() => r.success("Copied!"));
  }
  function t(e) {
    return e == null ? "\u2014" : "$" + e.toFixed(2);
  }
  const I = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => u("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "User", key: "user_id", render: (e) => u("span", { class: "text-slate-400" }, e.user_id) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Budget MTD", key: "budget", render: (e) => e.monthly_budget != null ? `${t(e.budget_used_mtd)} / ${t(e.monthly_budget)}` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => u($e, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }, { title: "Actions", key: "actions", render: (e) => u("div", { class: "flex gap-2" }, [u(B, { size: "small", onClick: () => y(e) }, { default: () => "Edit" }), u(B, { size: "small", type: e.is_active ? "warning" : "default", onClick: () => m(e) }, { default: () => e.is_active ? "Deactivate" : "Activate" })]) }];
  return be(o), (e, s) => {
    const v = ze;
    return E(), _e("div", null, [z("div", Ke, [s[5] || (s[5] = z("h1", { class: "text-xl font-semibold text-slate-100" }, "API Keys", -1)), b(l(B), { type: "primary", onClick: C }, { icon: _(() => [...s[3] || (s[3] = [z("span", { class: "i-carbon-add" }, null, -1)])]), default: _(() => [s[4] || (s[4] = H(" Create Key ", -1))]), _: 1 })]), l(p) ? (E(), R(l(Be), { key: 0, type: "success", class: "mb-4", title: "API Key Created \u2014 save this key now, it will not be shown again", closable: "", onClose: s[1] || (s[1] = (A) => p.value = null) }, { default: _(() => [z("div", We, [z("span", Me, F(l(p)), 1), b(l(B), { size: "small", onClick: s[0] || (s[0] = (A) => c(l(p))) }, { icon: _(() => [...s[6] || (s[6] = [z("span", { class: "i-carbon-copy" }, null, -1)])]), default: _(() => [s[7] || (s[7] = H(" Copy ", -1))]), _: 1 })])]), _: 1 })) : W("", true), b(v, { columns: I, data: l(f), loading: l(i), pagination: { pageSize: 20 }, size: "small" }, null, 8, ["data", "loading"]), b(He, { show: l(g), "onUpdate:show": s[2] || (s[2] = (A) => he(g) ? g.value = A : null), existing: l(h), onSaved: n }, null, 8, ["show", "existing"])]);
  };
} });
export {
  Ge as default
};
