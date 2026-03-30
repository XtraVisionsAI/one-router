import { a as t } from "./useApi-ViaiVG_-.js";
function s() {
  const { request: n } = t();
  return { list: () => n("GET", "/backends"), getConfig: (e) => n("GET", `/backends/${encodeURIComponent(e)}/config`), create: (e) => n("POST", "/backends", e), update: (e, o) => n("PUT", `/backends/${encodeURIComponent(e)}`, o), toggle: (e) => n("PUT", `/backends/${encodeURIComponent(e)}/toggle`), delete: (e) => n("DELETE", `/backends/${encodeURIComponent(e)}`) };
}
export {
  s as u
};
