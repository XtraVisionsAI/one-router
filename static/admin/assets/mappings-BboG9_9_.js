import { u as O } from "./useApi-yvWB8agy.js";
import { d as E, w as V, n as z, p as F, q as n, y as r, v as o, s as t, B as U, C as D, A, _ as K, a as I, r as _, o as G, z as H, E as $, j as w } from "./index-DicalUKt.js";
import { u as B } from "./use-message-DGZGK5Il.js";
import { _ as J } from "./FormItem-BLFgOPpX.js";
import { _ as q } from "./Input-VFsf8aBL.js";
import { _ as R, a as Q, N as P } from "./DataTable-DkCuQcym.js";
import { _ as W } from "./InputNumber-ABEEFNvO.js";
import { u as X } from "./composables-CpeOe2QS.js";
import "./get-BZTOcoVz.js";
import "./use-merged-state-CkMZ2DWG.js";
import "./Dropdown-DwMgs0HP.js";
import "./use-compitable-Cxdw_G8M.js";
function h() {
  const { request: f } = O();
  return { list: () => f("GET", "/mappings"), create: (p) => f("POST", "/mappings", p), update: (p, i, m) => f("PUT", `/mappings/${encodeURIComponent(p)}/${encodeURIComponent(i)}`, m), delete: (p, i) => f("DELETE", `/mappings/${encodeURIComponent(p)}/${encodeURIComponent(i)}`) };
}
const Y = { class: "space-y-1" }, Z = { class: "flex gap-4" }, ee = { class: "flex gap-4" }, te = { class: "flex gap-4" }, le = { class: "flex justify-end gap-2" }, ae = E({ __name: "MappingModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(f, { emit: p }) {
  const i = f, m = p, d = B(), b = h(), u = I(() => !!i.existing), k = I(() => u.value ? "Edit Mapping" : "Add Mapping"), a = _({ source_model_id: "", target_model_id: "", provider: "bedrock", display_name: "", priority: 0, status: "active", input_price: 0, output_price: 0 }), v = _(false);
  V(() => i.show, (M) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    M && (a.value = { source_model_id: ((_a = i.existing) == null ? void 0 : _a.source_model_id) ?? "", target_model_id: ((_b = i.existing) == null ? void 0 : _b.target_model_id) ?? "", provider: ((_c = i.existing) == null ? void 0 : _c.provider) ?? "bedrock", display_name: ((_d = i.existing) == null ? void 0 : _d.display_name) ?? "", priority: ((_e = i.existing) == null ? void 0 : _e.priority) ?? 0, status: ((_f = i.existing) == null ? void 0 : _f.status) ?? "active", input_price: ((_g = i.existing) == null ? void 0 : _g.input_price) ?? 0, output_price: ((_h = i.existing) == null ? void 0 : _h.output_price) ?? 0 });
  });
  async function g() {
    if (!a.value.source_model_id.trim()) {
      d.error("Source model ID is required");
      return;
    }
    if (!a.value.target_model_id.trim()) {
      d.error("Target model ID is required");
      return;
    }
    v.value = true;
    try {
      u.value ? await b.update(i.existing.source_model_id, i.existing.provider, a.value) : await b.create(a.value), d.success(u.value ? "Mapping updated" : "Mapping created"), m("update:show", false), m("saved");
    } catch (M) {
      d.error(M.message);
    } finally {
      v.value = false;
    }
  }
  return (M, s) => {
    const x = q, c = J, N = R, C = W, S = U, l = K;
    return z(), F(l, { show: f.show, title: t(k), preset: "card", style: { width: "520px" }, "onUpdate:show": s[9] || (s[9] = (e) => m("update:show", e)) }, { footer: n(() => [r("div", le, [o(S, { onClick: s[8] || (s[8] = (e) => m("update:show", false)) }, { default: n(() => [...s[10] || (s[10] = [D("Cancel", -1)])]), _: 1 }), o(S, { type: "primary", loading: t(v), onClick: g }, { default: n(() => [D(A(t(u) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: n(() => [r("div", Y, [r("div", Z, [o(c, { label: "Source Model ID", required: "", class: "flex-1" }, { default: n(() => [o(x, { value: t(a).source_model_id, "onUpdate:value": s[0] || (s[0] = (e) => t(a).source_model_id = e), placeholder: "claude-3-5-sonnet*", readonly: t(u) }, null, 8, ["value", "readonly"])]), _: 1 }), o(c, { label: "Provider", required: "", class: "w-36" }, { default: n(() => [o(N, { value: t(a).provider, "onUpdate:value": s[1] || (s[1] = (e) => t(a).provider = e), disabled: t(u), options: ["bedrock", "gemini", "anthropic", "openai"].map((e) => ({ label: e, value: e })) }, null, 8, ["value", "disabled", "options"])]), _: 1 })]), o(c, { label: "Target Model ID", required: "" }, { default: n(() => [o(x, { value: t(a).target_model_id, "onUpdate:value": s[2] || (s[2] = (e) => t(a).target_model_id = e), placeholder: "anthropic.claude-3-5-sonnet-20241022-v2:0" }, null, 8, ["value"])]), _: 1 }), o(c, { label: "Display Name" }, { default: n(() => [o(x, { value: t(a).display_name, "onUpdate:value": s[3] || (s[3] = (e) => t(a).display_name = e) }, null, 8, ["value"])]), _: 1 }), r("div", ee, [o(c, { label: "Priority", class: "flex-1" }, { default: n(() => [o(C, { value: t(a).priority, "onUpdate:value": s[4] || (s[4] = (e) => t(a).priority = e), class: "w-full" }, null, 8, ["value"])]), _: 1 }), o(c, { label: "Status", class: "flex-1" }, { default: n(() => [o(N, { value: t(a).status, "onUpdate:value": s[5] || (s[5] = (e) => t(a).status = e), options: [{ label: "active", value: "active" }, { label: "inactive", value: "inactive" }] }, null, 8, ["value"])]), _: 1 })]), r("div", te, [o(c, { label: "Input Price (per 1K)", class: "flex-1" }, { default: n(() => [o(C, { value: t(a).input_price, "onUpdate:value": s[6] || (s[6] = (e) => t(a).input_price = e), precision: 4, min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), o(c, { label: "Output Price (per 1K)", class: "flex-1" }, { default: n(() => [o(C, { value: t(a).output_price, "onUpdate:value": s[7] || (s[7] = (e) => t(a).output_price = e), precision: 4, min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 })])])]), _: 1 }, 8, ["show", "title"]);
  };
} }), se = { class: "flex items-center justify-between mb-4" }, oe = { class: "flex gap-3 mb-4 flex-wrap items-center" }, ie = { class: "text-slate-500 text-xs" }, ne = { class: "py-12 text-center" }, we = E({ __name: "mappings", setup(f) {
  const p = B(), i = X(), m = h(), d = _([]), b = _(true), u = _(false), k = _(), a = _(""), v = _(""), g = _(""), M = I(() => {
    const l = [...new Set(d.value.map((e) => e.provider))].sort();
    return [{ label: "All Providers", value: "" }, ...l.map((e) => ({ label: e, value: e }))];
  }), s = I(() => d.value.filter((l) => !(a.value && !l.source_model_id.toLowerCase().includes(a.value.toLowerCase()) || v.value && l.provider !== v.value || g.value && l.status !== g.value)));
  async function x() {
    b.value = true;
    try {
      const l = await m.list();
      d.value = l.data;
    } catch (l) {
      p.error(l.message);
    } finally {
      b.value = false;
    }
  }
  function c() {
    k.value = void 0, u.value = true;
  }
  function N(l) {
    k.value = l, u.value = true;
  }
  function C(l) {
    i.warning({ title: "Delete Mapping", content: `Delete mapping "${l.source_model_id}" \u2192 ${l.provider}?`, positiveText: "Delete", negativeText: "Cancel", onPositiveClick: async () => {
      try {
        await m.delete(l.source_model_id, l.provider), p.success("Mapping deleted"), await x();
      } catch (e) {
        p.error(e.message);
      }
    } });
  }
  const S = [{ title: "Source Model", key: "source_model_id", render: (l) => w("span", { class: "font-mono text-xs text-slate-200" }, l.source_model_id) }, { title: "Target Model", key: "target_model_id", ellipsis: { tooltip: true }, render: (l) => w("span", { class: "font-mono text-xs text-slate-400" }, l.target_model_id) }, { title: "Provider", key: "provider", render: (l) => w(P, { size: "small" }, { default: () => l.provider }) }, { title: "Priority", key: "priority" }, { title: "Status", key: "status", render: (l) => w(P, { type: l.status === "active" ? "success" : "default", size: "small" }, { default: () => l.status }) }, { title: "Actions", key: "actions", render: (l) => w("div", { class: "flex gap-2" }, [w(U, { size: "small", onClick: () => N(l) }, { default: () => "Edit" }), w(U, { size: "small", type: "error", onClick: () => C(l) }, { default: () => "Delete" })]) }];
  return G(x), (l, e) => {
    const j = q, T = R, L = Q;
    return z(), H("div", null, [r("div", se, [e[6] || (e[6] = r("h1", { class: "text-xl font-semibold text-slate-100" }, "Model Mappings", -1)), o(t(U), { type: "primary", onClick: c }, { icon: n(() => [...e[4] || (e[4] = [r("span", { class: "i-carbon-add" }, null, -1)])]), default: n(() => [e[5] || (e[5] = D(" Add Mapping ", -1))]), _: 1 })]), r("div", oe, [o(j, { value: t(a), "onUpdate:value": e[0] || (e[0] = (y) => $(a) ? a.value = y : null), placeholder: "Filter by source model\u2026", clearable: "", style: { width: "220px" } }, null, 8, ["value"]), o(T, { value: t(v), "onUpdate:value": e[1] || (e[1] = (y) => $(v) ? v.value = y : null), options: t(M), style: { width: "160px" } }, null, 8, ["value", "options"]), o(T, { value: t(g), "onUpdate:value": e[2] || (e[2] = (y) => $(g) ? g.value = y : null), options: [{ label: "All Status", value: "" }, { label: "active", value: "active" }, { label: "inactive", value: "inactive" }], style: { width: "130px" } }, null, 8, ["value"]), r("span", ie, A(t(s).length === t(d).length ? `${t(d).length} mappings` : `${t(s).length} / ${t(d).length}`), 1)]), o(L, { columns: S, data: t(s), loading: t(b), pagination: { pageSize: 30 }, size: "small" }, { empty: n(() => [r("div", ne, [e[8] || (e[8] = r("span", { class: "i-carbon-arrows-horizontal text-4xl text-slate-600 block mx-auto mb-3" }, null, -1)), e[9] || (e[9] = r("p", { class: "text-slate-500 text-sm" }, "No model mappings configured", -1)), o(t(U), { type: "primary", size: "small", class: "mt-4", onClick: c }, { default: n(() => [...e[7] || (e[7] = [D("Add your first mapping", -1)])]), _: 1 })])]), _: 1 }, 8, ["data", "loading"]), o(ae, { show: t(u), "onUpdate:show": e[3] || (e[3] = (y) => $(u) ? u.value = y : null), existing: t(k), onSaved: x }, null, 8, ["show", "existing"])]);
  };
} });
export {
  we as default
};
