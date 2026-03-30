import { bL as c, aK as g, M as v, ag as F, i as y, a, ai as h, a8 as p } from "./index-YqbknKjl.js";
function C(e, ...r) {
  if (Array.isArray(e)) e.forEach((t) => C(t, ...r));
  else return e(...r);
}
function u(e) {
  return e.some((r) => c(r) ? !(r.type === g || r.type === v && !u(r.children)) : true) ? e : null;
}
function S(e, r) {
  return e && u(e()) || r();
}
function T(e, r, t) {
  return e && u(e(r)) || t(r);
}
function V(e, r) {
  const t = e && u(e());
  return r(t || null);
}
function b(e) {
  return !(e && u(e()));
}
const f = h("n-form-item");
function j(e, { defaultSize: r = "medium", mergedSize: t, mergedDisabled: o } = {}) {
  const n = y(f, null);
  p(f, null);
  const l = a(t ? () => t(n) : () => {
    const { size: i } = e;
    if (i) return i;
    if (n) {
      const { mergedSize: s } = n;
      if (s.value !== void 0) return s.value;
    }
    return r;
  }), m = a(o ? () => o(n) : () => {
    const { disabled: i } = e;
    return i !== void 0 ? i : n ? n.disabled.value : false;
  }), d = a(() => {
    const { status: i } = e;
    return i || (n == null ? void 0 : n.mergedValidationStatus.value);
  });
  return F(() => {
    n && n.restoreValidation();
  }), { mergedSizeRef: l, mergedDisabledRef: m, mergedStatusRef: d, nTriggerFormBlur() {
    n && n.handleContentBlur();
  }, nTriggerFormChange() {
    n && n.handleContentChange();
  }, nTriggerFormFocus() {
    n && n.handleContentFocus();
  }, nTriggerFormInput() {
    n && n.handleContentInput();
  } };
}
export {
  S as a,
  T as b,
  C as c,
  u as e,
  f,
  b as i,
  V as r,
  j as u
};
