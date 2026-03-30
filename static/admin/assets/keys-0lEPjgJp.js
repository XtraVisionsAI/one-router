import { a } from "./useApi-ViaiVG_-.js";
function s() {
  const { request: t } = a();
  return { list: () => t("GET", "/keys"), create: (e) => t("POST", "/keys", e), update: (e, o) => t("PUT", `/keys/${encodeURIComponent(e)}`, o), activate: (e) => t("POST", `/keys/${encodeURIComponent(e)}/activate`), deactivate: (e) => t("DELETE", `/keys/${encodeURIComponent(e)}?action=deactivate`) };
}
export {
  s as u
};
