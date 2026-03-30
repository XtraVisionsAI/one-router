import { u as L } from "./keys-0lEPjgJp.js";
import { _ as ee, B as A } from "./Button-DSNNFXd2.js";
import { b as oe, R as S, E as $, f as P, h as x, g as M, S as te, e as re, d as W, j as u, U as ne, V as se, W as le, X as ie, Y as ae, Z as ce, _ as de, $ as ue, k as ve, l as U, a0 as me, m as pe, c as N, r as T, a1 as ge, I as z, w as fe, n as B, p as _, q as l, s as E, y as k, v as b, x as K, B as H, A as V, o as be, z as _e, D as he } from "./index-HnuybbhN.js";
import { u as D } from "./useApi-ViaiVG_-.js";
import { _ as Ce, a as ye } from "./InputNumber-W3KW47sQ.js";
import { _ as xe } from "./FormItem-CcawL2pJ.js";
import { b as Ie, r as we } from "./use-form-item-DgrHZmhA.js";
import { a as ze, N as ke } from "./DataTable-r4E-uZoH.js";
const Se = { iconMargin: "11px 8px 0 12px", iconMarginRtl: "11px 12px 0 8px", iconSize: "24px", closeIconSize: "16px", closeSize: "20px", closeMargin: "13px 14px 0 0", closeMarginRtl: "13px 0 0 14px", padding: "13px" };
function $e(d) {
  const { lineHeight: r, borderRadius: i, fontWeightStrong: p, baseColor: a, dividerColor: g, actionColor: h, textColor1: f, textColor2: o, closeColorHover: C, closeColorPressed: y, closeIconColor: m, closeIconColorHover: n, closeIconColorPressed: c, infoColor: t, successColor: I, warningColor: e, errorColor: s, fontSize: v } = d;
  return Object.assign(Object.assign({}, Se), { fontSize: v, lineHeight: r, titleFontWeight: p, borderRadius: i, border: `1px solid ${g}`, color: h, titleTextColor: f, iconColor: o, contentTextColor: o, closeBorderRadius: i, closeColorHover: C, closeColorPressed: y, closeIconColor: m, closeIconColorHover: n, closeIconColorPressed: c, borderInfo: `1px solid ${S(a, $(t, { alpha: 0.25 }))}`, colorInfo: S(a, $(t, { alpha: 0.08 })), titleTextColorInfo: f, iconColorInfo: t, contentTextColorInfo: o, closeColorHoverInfo: C, closeColorPressedInfo: y, closeIconColorInfo: m, closeIconColorHoverInfo: n, closeIconColorPressedInfo: c, borderSuccess: `1px solid ${S(a, $(I, { alpha: 0.25 }))}`, colorSuccess: S(a, $(I, { alpha: 0.08 })), titleTextColorSuccess: f, iconColorSuccess: I, contentTextColorSuccess: o, closeColorHoverSuccess: C, closeColorPressedSuccess: y, closeIconColorSuccess: m, closeIconColorHoverSuccess: n, closeIconColorPressedSuccess: c, borderWarning: `1px solid ${S(a, $(e, { alpha: 0.33 }))}`, colorWarning: S(a, $(e, { alpha: 0.08 })), titleTextColorWarning: f, iconColorWarning: e, contentTextColorWarning: o, closeColorHoverWarning: C, closeColorPressedWarning: y, closeIconColorWarning: m, closeIconColorHoverWarning: n, closeIconColorPressedWarning: c, borderError: `1px solid ${S(a, $(s, { alpha: 0.25 }))}`, colorError: S(a, $(s, { alpha: 0.08 })), titleTextColorError: f, iconColorError: s, contentTextColorError: o, closeColorHoverError: C, closeColorPressedError: y, closeIconColorError: m, closeIconColorHoverError: n, closeIconColorPressedError: c });
}
const Te = { common: oe, self: $e }, Pe = P("alert", `
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
 `), M("closable", [P("alert-body", [x("title", `
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
 `), M("show-icon", [P("alert-body", { paddingLeft: "calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))" })]), M("right-adjust", [P("alert-body", { paddingRight: "calc(var(--n-close-size) + var(--n-padding) + 2px)" })]), P("alert-body", `
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `, [x("title", `
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `, [re("& +", [x("content", { marginTop: "9px" })])]), x("content", { transition: "color .3s var(--n-bezier)", fontSize: "var(--n-font-size)" })]), x("icon", { transition: "color .3s var(--n-bezier)" })]), Re = Object.assign(Object.assign({}, U.props), { title: String, showIcon: { type: Boolean, default: true }, type: { type: String, default: "default" }, bordered: { type: Boolean, default: true }, closable: Boolean, onClose: Function, onAfterLeave: Function, onAfterHide: Function }), Ae = W({ name: "Alert", inheritAttrs: false, props: Re, slots: Object, setup(d) {
  const { mergedClsPrefixRef: r, mergedBorderedRef: i, inlineThemeDisabled: p, mergedRtlRef: a } = ve(d), g = U("Alert", "-alert", Pe, Te, d, r), h = me("Alert", a, r), f = N(() => {
    const { common: { cubicBezierEaseInOut: c }, self: t } = g.value, { fontSize: I, borderRadius: e, titleFontWeight: s, lineHeight: v, iconSize: R, iconMargin: j, iconMarginRtl: F, closeIconSize: O, closeBorderRadius: q, closeSize: X, closeMargin: Y, closeMarginRtl: Z, padding: G } = t, { type: w } = d, { left: J, right: Q } = ge(j);
    return { "--n-bezier": c, "--n-color": t[z("color", w)], "--n-close-icon-size": O, "--n-close-border-radius": q, "--n-close-color-hover": t[z("closeColorHover", w)], "--n-close-color-pressed": t[z("closeColorPressed", w)], "--n-close-icon-color": t[z("closeIconColor", w)], "--n-close-icon-color-hover": t[z("closeIconColorHover", w)], "--n-close-icon-color-pressed": t[z("closeIconColorPressed", w)], "--n-icon-color": t[z("iconColor", w)], "--n-border": t[z("border", w)], "--n-title-text-color": t[z("titleTextColor", w)], "--n-content-text-color": t[z("contentTextColor", w)], "--n-line-height": v, "--n-border-radius": e, "--n-font-size": I, "--n-title-font-weight": s, "--n-icon-size": R, "--n-icon-margin": j, "--n-icon-margin-rtl": F, "--n-close-size": X, "--n-close-margin": Y, "--n-close-margin-rtl": Z, "--n-padding": G, "--n-icon-margin-left": J, "--n-icon-margin-right": Q };
  }), o = p ? pe("alert", N(() => d.type[0]), f, d) : void 0, C = T(true), y = () => {
    const { onAfterLeave: c, onAfterHide: t } = d;
    c && c(), t && t();
  };
  return { rtlEnabled: h, mergedClsPrefix: r, mergedBordered: i, visible: C, handleCloseClick: () => {
    var c;
    Promise.resolve((c = d.onClose) === null || c === void 0 ? void 0 : c.call(d)).then((t) => {
      t !== false && (C.value = false);
    });
  }, handleAfterLeave: () => {
    y();
  }, mergedTheme: g, cssVars: p ? void 0 : f, themeClass: o == null ? void 0 : o.themeClass, onRender: o == null ? void 0 : o.onRender };
}, render() {
  var d;
  return (d = this.onRender) === null || d === void 0 || d.call(this), u(ue, { onAfterLeave: this.handleAfterLeave }, { default: () => {
    const { mergedClsPrefix: r, $slots: i } = this, p = { class: [`${r}-alert`, this.themeClass, this.closable && `${r}-alert--closable`, this.showIcon && `${r}-alert--show-icon`, !this.title && this.closable && `${r}-alert--right-adjust`, this.rtlEnabled && `${r}-alert--rtl`], style: this.cssVars, role: "alert" };
    return this.visible ? u("div", Object.assign({}, ne(this.$attrs, p)), this.closable && u(se, { clsPrefix: r, class: `${r}-alert__close`, onClick: this.handleCloseClick }), this.bordered && u("div", { class: `${r}-alert__border` }), this.showIcon && u("div", { class: `${r}-alert__icon`, "aria-hidden": "true" }, Ie(i.icon, () => [u(le, { clsPrefix: r }, { default: () => {
      switch (this.type) {
        case "success":
          return u(de, null);
        case "info":
          return u(ce, null);
        case "warning":
          return u(ae, null);
        case "error":
          return u(ie, null);
        default:
          return null;
      }
    } })])), u("div", { class: [`${r}-alert-body`, this.mergedBordered && `${r}-alert-body--bordered`] }, we(i.header, (a) => {
      const g = a || this.title;
      return g ? u("div", { class: `${r}-alert-body__title` }, g) : null;
    }), i.default && u("div", { class: `${r}-alert-body__content` }, i))) : null;
  } });
} }), Ee = { class: "space-y-1" }, Be = { class: "flex gap-4" }, Ne = { class: "flex justify-end gap-2" }, He = W({ __name: "KeyModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(d, { emit: r }) {
  const i = d, p = r, a = D(), g = L(), h = N(() => !!i.existing), f = N(() => h.value ? "Edit API Key" : "Create API Key"), o = T({ name: "", user_id: "", rate_limit: 100, monthly_budget: null, service_tier: "default" }), C = T(false);
  fe(() => i.show, (m) => {
    var _a, _b, _c, _d, _e2;
    m && (o.value = { name: ((_a = i.existing) == null ? void 0 : _a.name) ?? "", user_id: ((_b = i.existing) == null ? void 0 : _b.user_id) ?? "", rate_limit: ((_c = i.existing) == null ? void 0 : _c.rate_limit) ?? 100, monthly_budget: ((_d = i.existing) == null ? void 0 : _d.monthly_budget) ?? null, service_tier: ((_e2 = i.existing) == null ? void 0 : _e2.service_tier) ?? "default" });
  });
  async function y() {
    if (!o.value.name.trim()) {
      a.error("Name is required");
      return;
    }
    if (!h.value && !o.value.user_id.trim()) {
      a.error("User ID is required");
      return;
    }
    C.value = true;
    try {
      if (h.value) {
        const m = { name: o.value.name, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier };
        await g.update(i.existing.api_key, m), a.success("Key updated"), p("update:show", false), p("saved");
      } else {
        const m = { name: o.value.name, user_id: o.value.user_id, rate_limit: o.value.rate_limit, monthly_budget: o.value.monthly_budget, service_tier: o.value.service_tier }, n = await g.create(m);
        a.success("Key created"), p("update:show", false), p("saved", n.api_key);
      }
    } catch (m) {
      a.error(m.message);
    } finally {
      C.value = false;
    }
  }
  return (m, n) => {
    const c = ee, t = xe, I = ye, e = A, s = Ce;
    return E(), B(s, { show: d.show, title: l(f), preset: "card", style: { width: "480px" }, "onUpdate:show": n[6] || (n[6] = (v) => p("update:show", v)) }, { footer: _(() => [k("div", Ne, [b(e, { onClick: n[5] || (n[5] = (v) => p("update:show", false)) }, { default: _(() => [...n[7] || (n[7] = [H("Cancel", -1)])]), _: 1 }), b(e, { type: "primary", loading: l(C), onClick: y }, { default: _(() => [H(V(l(h) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: _(() => [k("div", Ee, [l(h) ? (E(), B(t, { key: 0, label: "Key" }, { default: _(() => [b(c, { value: d.existing.api_key, readonly: "" }, null, 8, ["value"])]), _: 1 })) : K("", true), b(t, { label: "Name", required: "" }, { default: _(() => [b(c, { value: l(o).name, "onUpdate:value": n[0] || (n[0] = (v) => l(o).name = v), placeholder: "e.g. Production App" }, null, 8, ["value"])]), _: 1 }), l(h) ? K("", true) : (E(), B(t, { key: 1, label: "User ID", required: "" }, { default: _(() => [b(c, { value: l(o).user_id, "onUpdate:value": n[1] || (n[1] = (v) => l(o).user_id = v), placeholder: "e.g. user_001" }, null, 8, ["value"])]), _: 1 })), k("div", Be, [b(t, { label: "Rate Limit (rpm)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).rate_limit, "onUpdate:value": n[2] || (n[2] = (v) => l(o).rate_limit = v), min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), b(t, { label: "Monthly Budget ($)", class: "flex-1" }, { default: _(() => [b(I, { value: l(o).monthly_budget, "onUpdate:value": n[3] || (n[3] = (v) => l(o).monthly_budget = v), min: 0, precision: 2, placeholder: "unlimited", class: "w-full" }, null, 8, ["value"])]), _: 1 })]), b(t, { label: "Service Tier" }, { default: _(() => [b(c, { value: l(o).service_tier, "onUpdate:value": n[4] || (n[4] = (v) => l(o).service_tier = v) }, null, 8, ["value"])]), _: 1 })])]), _: 1 }, 8, ["show", "title"]);
  };
} }), Me = { class: "flex items-center justify-between mb-6" }, Ke = { class: "flex items-center gap-3 mt-2" }, We = { class: "font-mono text-sm" }, Xe = W({ __name: "keys", setup(d) {
  const r = D(), i = L(), p = T([]), a = T(true), g = T(false), h = T(), f = T(null);
  async function o() {
    a.value = true;
    try {
      const e = await i.list();
      p.value = e.data;
    } catch (e) {
      r.error(e.message);
    } finally {
      a.value = false;
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
      e.is_active ? (await i.deactivate(e.api_key), r.success("Key deactivated")) : (await i.activate(e.api_key), r.success("Key activated")), await o();
    } catch (s) {
      r.error(s.message);
    }
  }
  function n(e) {
    e && (f.value = e), o();
  }
  function c(e) {
    navigator.clipboard.writeText(e).then(() => r.success("Copied!"));
  }
  function t(e) {
    return e == null ? "\u2014" : "$" + e.toFixed(2);
  }
  const I = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => u("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "User", key: "user_id", render: (e) => u("span", { class: "text-slate-400" }, e.user_id) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Budget MTD", key: "budget", render: (e) => e.monthly_budget != null ? `${t(e.budget_used_mtd)} / ${t(e.monthly_budget)}` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => u(ke, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }, { title: "Actions", key: "actions", render: (e) => u("div", { class: "flex gap-2" }, [u(A, { size: "small", onClick: () => y(e) }, { default: () => "Edit" }), u(A, { size: "small", type: e.is_active ? "warning" : "default", onClick: () => m(e) }, { default: () => e.is_active ? "Deactivate" : "Activate" })]) }];
  return be(o), (e, s) => {
    const v = ze;
    return E(), _e("div", null, [k("div", Me, [s[5] || (s[5] = k("h1", { class: "text-xl font-semibold text-slate-100" }, "API Keys", -1)), b(l(A), { type: "primary", onClick: C }, { icon: _(() => [...s[3] || (s[3] = [k("span", { class: "i-carbon-add" }, null, -1)])]), default: _(() => [s[4] || (s[4] = H(" Create Key ", -1))]), _: 1 })]), l(f) ? (E(), B(l(Ae), { key: 0, type: "success", class: "mb-4", title: "API Key Created \u2014 save this key now, it will not be shown again", closable: "", onClose: s[1] || (s[1] = (R) => f.value = null) }, { default: _(() => [k("div", Ke, [k("span", We, V(l(f)), 1), b(l(A), { size: "small", onClick: s[0] || (s[0] = (R) => c(l(f))) }, { icon: _(() => [...s[6] || (s[6] = [k("span", { class: "i-carbon-copy" }, null, -1)])]), default: _(() => [s[7] || (s[7] = H(" Copy ", -1))]), _: 1 })])]), _: 1 })) : K("", true), b(v, { columns: I, data: l(p), loading: l(a), pagination: { pageSize: 20 }, size: "small" }, null, 8, ["data", "loading"]), b(He, { show: l(g), "onUpdate:show": s[2] || (s[2] = (R) => he(g) ? g.value = R : null), existing: l(h), onSaved: n }, null, 8, ["show", "existing"])]);
  };
} });
export {
  Xe as default
};
