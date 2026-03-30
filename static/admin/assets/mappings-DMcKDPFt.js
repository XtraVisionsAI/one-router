import { u as L } from "./useApi-XFDP7FvQ.js";
import { B as N } from "./Button-BEm6njOS.js";
import { d as h, w as O, n as B, p as V, q as r, y as v, v as s, s as e, B as D, A as E, a as I, r as _, o as F, z as K, D as C, j as M } from "./index-DgE7LE3Y.js";
import { u as A } from "./use-message-vokklgCK.js";
import { _ as G } from "./FormItem-Bccte_fY.js";
import { _ as q } from "./Input-BQpKaaGM.js";
import { _ as z, a as H, N as T } from "./DataTable--jcaE6v9.js";
import { _ as J, a as Q } from "./InputNumber-NmSonWBK.js";
import "./use-form-item-DYUW7DU-.js";
import "./Dropdown-CaRLK9DA.js";
import "./use-compitable-Dd8PnVYW.js";
function R() {
  const { request: f } = L();
  return { list: () => f("GET", "/mappings"), create: (p) => f("POST", "/mappings", p), update: (p, n, u) => f("PUT", `/mappings/${encodeURIComponent(p)}/${encodeURIComponent(n)}`, u), delete: (p, n) => f("DELETE", `/mappings/${encodeURIComponent(p)}/${encodeURIComponent(n)}`) };
}
const W = { class: "space-y-1" }, X = { class: "flex gap-4" }, Y = { class: "flex gap-4" }, Z = { class: "flex gap-4" }, ee = { class: "flex justify-end gap-2" }, te = h({ __name: "MappingModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(f, { emit: p }) {
  const n = f, u = p, g = A(), y = R(), d = I(() => !!n.existing), w = I(() => d.value ? "Edit Mapping" : "Add Mapping"), l = _({ source_model_id: "", target_model_id: "", provider: "bedrock", display_name: "", priority: 0, status: "active", input_price: 0, output_price: 0 }), m = _(false);
  O(() => n.show, (x) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    x && (l.value = { source_model_id: ((_a = n.existing) == null ? void 0 : _a.source_model_id) ?? "", target_model_id: ((_b = n.existing) == null ? void 0 : _b.target_model_id) ?? "", provider: ((_c = n.existing) == null ? void 0 : _c.provider) ?? "bedrock", display_name: ((_d = n.existing) == null ? void 0 : _d.display_name) ?? "", priority: ((_e = n.existing) == null ? void 0 : _e.priority) ?? 0, status: ((_f = n.existing) == null ? void 0 : _f.status) ?? "active", input_price: ((_g = n.existing) == null ? void 0 : _g.input_price) ?? 0, output_price: ((_h = n.existing) == null ? void 0 : _h.output_price) ?? 0 });
  });
  async function $() {
    if (!l.value.source_model_id.trim()) {
      g.error("Source model ID is required");
      return;
    }
    if (!l.value.target_model_id.trim()) {
      g.error("Target model ID is required");
      return;
    }
    m.value = true;
    try {
      d.value ? await y.update(n.existing.source_model_id, n.existing.provider, l.value) : await y.create(l.value), g.success(d.value ? "Mapping updated" : "Mapping created"), u("update:show", false), u("saved");
    } catch (x) {
      g.error(x.message);
    } finally {
      m.value = false;
    }
  }
  return (x, a) => {
    const U = q, c = G, S = z, k = J, t = N, o = Q;
    return B(), V(o, { show: f.show, title: e(w), preset: "card", style: { width: "520px" }, "onUpdate:show": a[9] || (a[9] = (i) => u("update:show", i)) }, { footer: r(() => [v("div", ee, [s(t, { onClick: a[8] || (a[8] = (i) => u("update:show", false)) }, { default: r(() => [...a[10] || (a[10] = [D("Cancel", -1)])]), _: 1 }), s(t, { type: "primary", loading: e(m), onClick: $ }, { default: r(() => [D(E(e(d) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: r(() => [v("div", W, [v("div", X, [s(c, { label: "Source Model ID", required: "", class: "flex-1" }, { default: r(() => [s(U, { value: e(l).source_model_id, "onUpdate:value": a[0] || (a[0] = (i) => e(l).source_model_id = i), placeholder: "claude-3-5-sonnet*", readonly: e(d) }, null, 8, ["value", "readonly"])]), _: 1 }), s(c, { label: "Provider", required: "", class: "w-36" }, { default: r(() => [s(S, { value: e(l).provider, "onUpdate:value": a[1] || (a[1] = (i) => e(l).provider = i), disabled: e(d), options: ["bedrock", "gemini", "anthropic", "openai"].map((i) => ({ label: i, value: i })) }, null, 8, ["value", "disabled", "options"])]), _: 1 })]), s(c, { label: "Target Model ID", required: "" }, { default: r(() => [s(U, { value: e(l).target_model_id, "onUpdate:value": a[2] || (a[2] = (i) => e(l).target_model_id = i), placeholder: "anthropic.claude-3-5-sonnet-20241022-v2:0" }, null, 8, ["value"])]), _: 1 }), s(c, { label: "Display Name" }, { default: r(() => [s(U, { value: e(l).display_name, "onUpdate:value": a[3] || (a[3] = (i) => e(l).display_name = i) }, null, 8, ["value"])]), _: 1 }), v("div", Y, [s(c, { label: "Priority", class: "flex-1" }, { default: r(() => [s(k, { value: e(l).priority, "onUpdate:value": a[4] || (a[4] = (i) => e(l).priority = i), class: "w-full" }, null, 8, ["value"])]), _: 1 }), s(c, { label: "Status", class: "flex-1" }, { default: r(() => [s(S, { value: e(l).status, "onUpdate:value": a[5] || (a[5] = (i) => e(l).status = i), options: [{ label: "active", value: "active" }, { label: "inactive", value: "inactive" }] }, null, 8, ["value"])]), _: 1 })]), v("div", Z, [s(c, { label: "Input Price (per 1K)", class: "flex-1" }, { default: r(() => [s(k, { value: e(l).input_price, "onUpdate:value": a[6] || (a[6] = (i) => e(l).input_price = i), precision: 4, min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 }), s(c, { label: "Output Price (per 1K)", class: "flex-1" }, { default: r(() => [s(k, { value: e(l).output_price, "onUpdate:value": a[7] || (a[7] = (i) => e(l).output_price = i), precision: 4, min: 0, class: "w-full" }, null, 8, ["value"])]), _: 1 })])])]), _: 1 }, 8, ["show", "title"]);
  };
} }), le = { class: "flex items-center justify-between mb-4" }, ae = { class: "flex gap-3 mb-4 flex-wrap" }, se = { class: "text-slate-500 text-sm self-center" }, fe = h({ __name: "mappings", setup(f) {
  const p = A(), n = R(), u = _([]), g = _(true), y = _(false), d = _(), w = _(""), l = _(""), m = _(""), $ = I(() => {
    const t = [...new Set(u.value.map((o) => o.provider))].sort();
    return [{ label: "All Providers", value: "" }, ...t.map((o) => ({ label: o, value: o }))];
  }), x = I(() => u.value.filter((t) => !(w.value && !t.source_model_id.toLowerCase().includes(w.value.toLowerCase()) || l.value && t.provider !== l.value || m.value && t.status !== m.value)));
  async function a() {
    g.value = true;
    try {
      const t = await n.list();
      u.value = t.data;
    } catch (t) {
      p.error(t.message);
    } finally {
      g.value = false;
    }
  }
  function U() {
    d.value = void 0, y.value = true;
  }
  function c(t) {
    d.value = t, y.value = true;
  }
  async function S(t) {
    try {
      await n.delete(t.source_model_id, t.provider), p.success("Mapping deleted"), await a();
    } catch (o) {
      p.error(o.message);
    }
  }
  const k = [{ title: "Source Model", key: "source_model_id", render: (t) => M("span", { class: "font-mono text-xs" }, t.source_model_id) }, { title: "Target Model", key: "target_model_id", ellipsis: { tooltip: true }, render: (t) => M("span", { class: "font-mono text-xs text-slate-400" }, t.target_model_id) }, { title: "Provider", key: "provider", render: (t) => M(T, { size: "small" }, { default: () => t.provider }) }, { title: "Priority", key: "priority" }, { title: "Status", key: "status", render: (t) => M(T, { type: t.status === "active" ? "success" : "default", size: "small" }, { default: () => t.status }) }, { title: "Actions", key: "actions", render: (t) => M("div", { class: "flex gap-2" }, [M(N, { size: "small", onClick: () => c(t) }, { default: () => "Edit" }), M(N, { size: "small", type: "error", onClick: () => S(t) }, { default: () => "Delete" })]) }];
  return F(a), (t, o) => {
    const i = q, P = z, j = H;
    return B(), K("div", null, [v("div", le, [o[6] || (o[6] = v("h1", { class: "text-xl font-semibold text-slate-100" }, "Model Mappings", -1)), s(e(N), { type: "primary", onClick: U }, { icon: r(() => [...o[4] || (o[4] = [v("span", { class: "i-carbon-add" }, null, -1)])]), default: r(() => [o[5] || (o[5] = D(" Add Mapping ", -1))]), _: 1 })]), v("div", ae, [s(i, { value: e(w), "onUpdate:value": o[0] || (o[0] = (b) => C(w) ? w.value = b : null), placeholder: "Filter by source model\u2026", clearable: "", style: { width: "220px" } }, null, 8, ["value"]), s(P, { value: e(l), "onUpdate:value": o[1] || (o[1] = (b) => C(l) ? l.value = b : null), options: e($), style: { width: "160px" } }, null, 8, ["value", "options"]), s(P, { value: e(m), "onUpdate:value": o[2] || (o[2] = (b) => C(m) ? m.value = b : null), options: [{ label: "All Status", value: "" }, { label: "active", value: "active" }, { label: "inactive", value: "inactive" }], style: { width: "130px" } }, null, 8, ["value"]), v("span", se, E(e(x).length === e(u).length ? `${e(u).length} mappings` : `${e(x).length} / ${e(u).length}`), 1)]), s(j, { columns: k, data: e(x), loading: e(g), pagination: { pageSize: 30 }, size: "small" }, null, 8, ["data", "loading"]), s(te, { show: e(y), "onUpdate:show": o[3] || (o[3] = (b) => C(y) ? y.value = b : null), existing: e(d), onSaved: a }, null, 8, ["show", "existing"])]);
  };
} });
export {
  fe as default
};
