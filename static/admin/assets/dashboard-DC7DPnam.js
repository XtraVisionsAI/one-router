import { u as w } from "./backends-BzivO-ak.js";
import { u as B } from "./keys-D5Y7pN1d.js";
import { u as N, _ as n } from "./useApi-XFDP7FvQ.js";
import { _ as r } from "./Statistic-CEOSbi6S.js";
import { _ as K } from "./Spin-B0yfwHbI.js";
import { d as M, o as R, n as $, z as C, y as l, v as a, q as i, s as t, r as u, j as p } from "./index-DgE7LE3Y.js";
import { u as P } from "./use-message-vokklgCK.js";
import { a as _, N as c } from "./DataTable--jcaE6v9.js";
import "./use-form-item-DYUW7DU-.js";
import "./use-compitable-Dd8PnVYW.js";
import "./Button-BEm6njOS.js";
import "./Dropdown-CaRLK9DA.js";
import "./Input-BQpKaaGM.js";
const T = { class: "grid grid-cols-4 gap-4 mb-8" }, E = { class: "mb-8" }, W = M({ __name: "dashboard", setup(q) {
  const b = P(), v = w(), k = B(), { request: h } = N(), m = u([]), o = u([]), f = u(""), y = u(true);
  function x(e) {
    return e < 60 ? `${e}s` : e < 3600 ? `${Math.floor(e / 60)}m` : `${Math.floor(e / 3600)}h ${Math.floor(e % 3600 / 60)}m`;
  }
  function g(e) {
    return e === "healthy" ? "success" : e === "unhealthy" ? "error" : "default";
  }
  R(async () => {
    try {
      const [e, s, d] = await Promise.all([v.list(), k.list(), h("GET", "/status")]);
      m.value = e.data, o.value = s.data, f.value = x(d.uptime_seconds);
    } catch (e) {
      b.error(e.message);
    } finally {
      y.value = false;
    }
  });
  const z = [{ title: "Name", key: "name" }, { title: "Type", key: "backend_type" }, { title: "Priority", key: "priority" }, { title: "Health", key: "health_status", render: (e) => p(c, { type: g(e.health_status), size: "small" }, { default: () => e.health_status }) }, { title: "Enabled", key: "enabled", render: (e) => p(c, { type: e.enabled ? "success" : "default", size: "small" }, { default: () => e.enabled ? "enabled" : "disabled" }) }], A = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => p("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => p(c, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }];
  return (e, s) => ($(), C("div", null, [s[6] || (s[6] = l("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Dashboard", -1)), a(t(K), { show: t(y) }, { default: i(() => [l("div", T, [a(t(n), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[0] || (s[0] = l("span", { class: "i-carbon-api", style: { position: "absolute", top: "12px", right: "12px", "font-size": "32px", color: "#818cf8", opacity: "0.85" } }, null, -1)), a(t(r), { label: "API Keys", value: t(o).length }, null, 8, ["value"])]), _: 1 }), a(t(n), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[1] || (s[1] = l("span", { class: "i-carbon-server-dns", style: { position: "absolute", top: "12px", right: "12px", "font-size": "32px", color: "#34d399", opacity: "0.85" } }, null, -1)), a(t(r), { label: "Backends", value: t(m).length }, null, 8, ["value"])]), _: 1 }), a(t(n), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[2] || (s[2] = l("span", { class: "i-carbon-checkmark-outline", style: { position: "absolute", top: "12px", right: "12px", "font-size": "32px", color: "#60a5fa", opacity: "0.85" } }, null, -1)), a(t(r), { label: "Active Keys", value: t(o).filter((d) => d.is_active).length }, null, 8, ["value"])]), _: 1 }), a(t(n), { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: i(() => [s[3] || (s[3] = l("span", { class: "i-carbon-time", style: { position: "absolute", top: "12px", right: "12px", "font-size": "32px", color: "#fbbf24", opacity: "0.85" } }, null, -1)), a(t(r), { label: "Uptime", value: t(f) }, null, 8, ["value"])]), _: 1 })]), l("div", E, [s[4] || (s[4] = l("h2", { class: "text-sm font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Backend Status", -1)), a(t(_), { columns: z, data: t(m), pagination: false, size: "small" }, null, 8, ["data"])]), l("div", null, [s[5] || (s[5] = l("h2", { class: "text-sm font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Recent API Keys", -1)), a(t(_), { columns: A, data: t(o).slice(0, 5), pagination: false, size: "small" }, null, 8, ["data"])])]), _: 1 }, 8, ["show"])]));
} });
export {
  W as default
};
