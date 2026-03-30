import { u as z } from "./backends-BAGDnhcs.js";
import { u as A } from "./keys-C__mdPdz.js";
import { u as w } from "./useApi-yvWB8agy.js";
import { f as B, h as N } from "./format-bYRzmlsO.js";
import { d as K, o as R, n as C, z as P, y as l, v as a, q as i, s as t, F as o, r, j as u } from "./index-DicalUKt.js";
import { _ as p } from "./Statistic-B_OLFlSU.js";
import { _ as T } from "./Spin-D8G0Ra6i.js";
import { u as E } from "./use-message-DGZGK5Il.js";
import { a as _, N as c } from "./DataTable-DkCuQcym.js";
import "./use-compitable-Cxdw_G8M.js";
import "./get-BZTOcoVz.js";
import "./use-merged-state-CkMZ2DWG.js";
import "./Dropdown-DwMgs0HP.js";
import "./Input-VFsf8aBL.js";
const q = { class: "grid grid-cols-4 gap-4 mb-8" }, I = { class: "mb-8" }, X = K({ __name: "dashboard", setup(M) {
  const b = E(), v = z(), k = A(), { request: x } = w(), m = r([]), n = r([]), y = r(""), f = r(true);
  R(async () => {
    try {
      const [e, s, d] = await Promise.all([v.list(), k.list(), x("GET", "/status")]);
      m.value = e.data, n.value = s.data, y.value = B(d.uptime_seconds);
    } catch (e) {
      b.error(e.message);
    } finally {
      f.value = false;
    }
  });
  const g = [{ title: "Name", key: "name" }, { title: "Type", key: "backend_type" }, { title: "Priority", key: "priority" }, { title: "Health", key: "health_status", render: (e) => u(c, { type: N(e.health_status), size: "small" }, { default: () => e.health_status }) }, { title: "Enabled", key: "enabled", render: (e) => u(c, { type: e.enabled ? "success" : "default", size: "small" }, { default: () => e.enabled ? "enabled" : "disabled" }) }], h = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => u("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => u(c, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }];
  return (e, s) => (C(), P("div", null, [s[6] || (s[6] = l("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Dashboard", -1)), a(t(T), { show: t(f) }, { default: i(() => [l("div", q, [a(t(o), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[0] || (s[0] = l("span", { class: "i-carbon-api absolute top-3 right-3 text-[32px] text-indigo-400 opacity-80" }, null, -1)), a(t(p), { label: "API Keys", value: t(n).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[1] || (s[1] = l("span", { class: "i-carbon-server-dns absolute top-3 right-3 text-[32px] text-emerald-400 opacity-80" }, null, -1)), a(t(p), { label: "Backends", value: t(m).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[2] || (s[2] = l("span", { class: "i-carbon-checkmark-outline absolute top-3 right-3 text-[32px] text-blue-400 opacity-80" }, null, -1)), a(t(p), { label: "Active Keys", value: t(n).filter((d) => d.is_active).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[3] || (s[3] = l("span", { class: "i-carbon-time absolute top-3 right-3 text-[32px] text-amber-400 opacity-80" }, null, -1)), a(t(p), { label: "Uptime", value: t(y) }, null, 8, ["value"])]), _: 1 })]), l("div", I, [s[4] || (s[4] = l("h2", { class: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Backend Status", -1)), a(t(_), { columns: g, data: t(m), pagination: false, size: "small" }, null, 8, ["data"])]), l("div", null, [s[5] || (s[5] = l("h2", { class: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Recent API Keys", -1)), a(t(_), { columns: h, data: t(n).slice(0, 5), pagination: false, size: "small" }, null, 8, ["data"])])]), _: 1 }, 8, ["show"])]));
} });
export {
  X as default
};
