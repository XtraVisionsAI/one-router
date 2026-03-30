function t(r) {
  return r == null ? "\u2014" : "$" + r.toFixed(2);
}
function e(r) {
  return r >= 1e6 ? (r / 1e6).toFixed(1) + "M" : r >= 1e3 ? (r / 1e3).toFixed(1) + "K" : String(r);
}
function f(r) {
  return r < 60 ? `${r}s` : r < 3600 ? `${Math.floor(r / 60)}m` : `${Math.floor(r / 3600)}h ${Math.floor(r % 3600 / 60)}m`;
}
function n(r) {
  return r === "healthy" ? "success" : r === "unhealthy" ? "error" : "default";
}
export {
  t as a,
  e as b,
  f,
  n as h
};
