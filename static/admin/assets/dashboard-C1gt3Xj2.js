import { u as B } from "./backends-By8nl6Vb.js";
import { u as N } from "./keys-DtrRsEFo.js";
import { u as K, _ as o } from "./useApi-ClSvQxGZ.js";
import { _ as r } from "./Statistic-BA45VDrC.js";
import { _ as M } from "./Spin-CObAkYad.js";
import { d as R, o as $, n as C, z as P, y as l, v as a, q as i, s as t, r as u, j as m } from "./index-YqbknKjl.js";
import { u as T } from "./use-message-B7xbmhU1.js";
import { a as y, N as c } from "./DataTable-14e5pRmB.js";
import "./use-form-item-B02FE9As.js";
import "./Input-DK9mG32G.js";
import "./Button-CV4-g0dr.js";
const E = { class: "grid grid-cols-4 gap-4 mb-8" }, q = { class: "mb-8" }, O = R({ __name: "dashboard", setup(w) {
  const h = T(), k = B(), v = N(), { request: b } = K(), d = u([]), n = u([]), _ = u(""), f = u(true);
  function g(e) {
    return e < 60 ? `${e}s` : e < 3600 ? `${Math.floor(e / 60)}m` : `${Math.floor(e / 3600)}h ${Math.floor(e % 3600 / 60)}m`;
  }
  function x(e) {
    return e === "healthy" ? "success" : e === "unhealthy" ? "error" : "default";
  }
  $(async () => {
    try {
      const [e, s, p] = await Promise.all([k.list(), v.list(), b("GET", "/status")]);
      d.value = e.data, n.value = s.data, _.value = g(p.uptime_seconds);
    } catch (e) {
      h.error(e.message);
    } finally {
      f.value = false;
    }
  });
  const z = [{ title: "Name", key: "name" }, { title: "Type", key: "backend_type" }, { title: "Priority", key: "priority" }, { title: "Health", key: "health_status", render: (e) => m(c, { type: x(e.health_status), size: "small" }, { default: () => e.health_status }) }, { title: "Enabled", key: "enabled", render: (e) => m(c, { type: e.enabled ? "success" : "default", size: "small" }, { default: () => e.enabled ? "enabled" : "disabled" }) }], A = [{ title: "Name", key: "name" }, { title: "Key", key: "api_key", ellipsis: { tooltip: true }, render: (e) => m("span", { class: "font-mono text-xs text-slate-400" }, e.api_key) }, { title: "Rate Limit", key: "rate_limit", render: (e) => e.rate_limit > 0 ? `${e.rate_limit} rpm` : "\u2014" }, { title: "Status", key: "is_active", render: (e) => m(c, { type: e.is_active ? "success" : "error", size: "small" }, { default: () => e.is_active ? "active" : "inactive" }) }];
  return (e, s) => (C(), P("div", null, [s[2] || (s[2] = l("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Dashboard", -1)), a(t(M), { show: t(f) }, { default: i(() => [l("div", E, [a(t(o), { size: "small" }, { default: i(() => [a(t(r), { label: "API Keys", value: t(n).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small" }, { default: i(() => [a(t(r), { label: "Backends", value: t(d).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small" }, { default: i(() => [a(t(r), { label: "Active Keys", value: t(n).filter((p) => p.is_active).length }, null, 8, ["value"])]), _: 1 }), a(t(o), { size: "small" }, { default: i(() => [a(t(r), { label: "Uptime", value: t(_) }, null, 8, ["value"])]), _: 1 })]), l("div", q, [s[0] || (s[0] = l("h2", { class: "text-sm font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Backend Status", -1)), a(t(y), { columns: z, data: t(d), pagination: false, size: "small" }, null, 8, ["data"])]), l("div", null, [s[1] || (s[1] = l("h2", { class: "text-sm font-medium text-slate-400 uppercase tracking-wider mb-3" }, "Recent API Keys", -1)), a(t(y), { columns: A, data: t(n).slice(0, 5), pagination: false, size: "small" }, null, 8, ["data"])])]), _: 1 }, 8, ["show"])]));
} });
export {
  O as default
};
