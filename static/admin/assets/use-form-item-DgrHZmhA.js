import { w as c, c as a, bj as g, az as v, L as F, ac as h, i as y, ae as p, a4 as C } from "./index-HnuybbhN.js";
function T(e, n) {
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
function V(e, n) {
  return e && i(e()) || n();
}
function b(e, n, t) {
  return e && i(e(n)) || t(n);
}
function j(e, n) {
  const t = e && i(e());
  return n(t || null);
}
function z(e) {
  return !(e && i(e()));
}
const f = p("n-form-item");
function B(e, { defaultSize: n = "medium", mergedSize: t, mergedDisabled: o } = {}) {
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
  T as a,
  V as b,
  I as c,
  b as d,
  i as e,
  f,
  z as i,
  j as r,
  B as u
};
