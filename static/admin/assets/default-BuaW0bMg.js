import { d as v, aa as y, z as r, y as e, M as k, O as w, A as l, s as i, v as o, q as a, u as B, a9 as C, bK as c, n as d, C as p, B as u } from "./index-05ypFx4P.js";
import { B as R } from "./Button-BTod08TO.js";
import "./use-form-item-C0_shOgu.js";
const V = { class: "flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden" }, z = { class: "w-52 flex flex-col bg-[#1e293b] border-r border-slate-700 shrink-0" }, N = { class: "flex-1 py-3 space-y-0.5 px-2" }, A = { class: "px-4 py-3 border-t border-slate-700 flex items-center justify-between" }, L = { class: "text-xs text-slate-500" }, M = { class: "flex-1 overflow-auto" }, S = { class: "p-6" }, j = v({ __name: "default", setup(q) {
  const n = y(), b = B(), x = C(), h = [{ path: "/dashboard", icon: "i-carbon-dashboard", label: "Dashboard" }, { path: "/keys", icon: "i-carbon-api", label: "API Keys" }, { path: "/backends", icon: "i-carbon-server-dns", label: "Backends" }, { path: "/mappings", icon: "i-carbon-arrows-horizontal", label: "Model Maps" }, { path: "/usage", icon: "i-carbon-chart-bar", label: "Usage" }, { path: "/flags", icon: "i-carbon-toggle", label: "Flags" }];
  function g() {
    n.logout(), b.push("/login");
  }
  return (D, t) => {
    const _ = c("RouterLink"), f = R, m = c("RouterView");
    return d(), r("div", V, [e("aside", z, [t[2] || (t[2] = e("div", { class: "px-5 py-4 border-b border-slate-700" }, [e("span", { class: "text-indigo-400 font-semibold text-base" }, "one-router"), e("span", { class: "ml-2 text-xs text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded" }, "admin")], -1)), e("nav", N, [(d(), r(k, null, w(h, (s) => o(_, { key: s.path, to: s.path, class: p(["flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors", { "bg-indigo-600/20 text-indigo-300": i(x).path === s.path }]) }, { default: a(() => [e("span", { class: p([s.icon, "text-base"]) }, null, 2), u(" " + l(s.label), 1)]), _: 2 }, 1032, ["to", "class"])), 64))]), e("div", A, [e("span", L, "v" + l(i(n).version || "\u2014"), 1), o(f, { size: "tiny", quaternary: "", onClick: g }, { icon: a(() => [...t[0] || (t[0] = [e("span", { class: "i-carbon-logout" }, null, -1)])]), default: a(() => [t[1] || (t[1] = u(" Sign out ", -1))]), _: 1 })])]), e("main", M, [e("div", S, [o(m)])])]);
  };
} });
export {
  j as default
};
