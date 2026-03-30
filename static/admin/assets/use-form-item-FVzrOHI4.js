import { w as c, a, bM as g, ba as v, M as F, ag as h, i as y, ai as p, a8 as C } from "./index-BeCJuQaP.js";
function S(e, n) {
  return c(e, (t) => {
    t !== void 0 && (n.value = t);
  }), a(() => e.value === void 0 ? n.value : e.value);
}
function I(e, ...n) {
  if (Array.isArray(e)) e.forEach((t) => I(t, ...n));
  else return e(...n);
}
function i(e) {
  return e.some((n) => g(n) ? !(n.type === v || n.type === F && !i(n.children)) : true) ? e : null;
}
function T(e, n) {
  return e && i(e()) || n();
}
function V(e, n, t) {
  return e && i(e(n)) || t(n);
}
function j(e, n) {
  const t = e && i(e());
  return n(t || null);
}
function B(e) {
  return !(e && i(e()));
}
const f = p("n-form-item");
function M(e, { defaultSize: n = "medium", mergedSize: t, mergedDisabled: o } = {}) {
  const r = y(f, null);
  C(f, null);
  const l = a(t ? () => t(r) : () => {
    const { size: u } = e;
    if (u) return u;
    if (r) {
      const { mergedSize: s } = r;
      if (s.value !== void 0) return s.value;
    }
    return n;
  }), d = a(o ? () => o(r) : () => {
    const { disabled: u } = e;
    return u !== void 0 ? u : r ? r.disabled.value : false;
  }), m = a(() => {
    const { status: u } = e;
    return u || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return h(() => {
    r && r.restoreValidation();
  }), { mergedSizeRef: l, mergedDisabledRef: d, mergedStatusRef: m, nTriggerFormBlur() {
    r && r.handleContentBlur();
  }, nTriggerFormChange() {
    r && r.handleContentChange();
  }, nTriggerFormFocus() {
    r && r.handleContentFocus();
  }, nTriggerFormInput() {
    r && r.handleContentInput();
  } };
}
export {
  S as a,
  T as b,
  I as c,
  V as d,
  i as e,
  f,
  B as i,
  j as r,
  M as u
};
