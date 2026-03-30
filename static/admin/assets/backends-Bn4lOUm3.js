import { u as Q } from "./backends-BAGDnhcs.js";
import { u as X } from "./use-message-DGZGK5Il.js";
import { _ as ee } from "./FormItem-BLFgOPpX.js";
import { _ as te } from "./Input-VFsf8aBL.js";
import { i as ne, c as se, a as B, b as le, e as H, f as ae, g as G, h as oe, d as W, j, k as ie, o as Y, w as q, t as K, l as Z, m as re, r as k, n as C, p as P, q as b, s as n, v as x, x as F, y as v, z as T, A as J, B as D, C as N, D as ue, _ as de, E as ce } from "./index-DicalUKt.js";
import { _ as me, a as fe, N as U } from "./DataTable-DkCuQcym.js";
import { _ as he } from "./InputNumber-ABEEFNvO.js";
import { h as ve } from "./format-bYRzmlsO.js";
import { u as ge } from "./composables-CpeOe2QS.js";
import "./useApi-yvWB8agy.js";
import "./get-BZTOcoVz.js";
import "./use-merged-state-CkMZ2DWG.js";
import "./Dropdown-DwMgs0HP.js";
import "./use-compitable-Cxdw_G8M.js";
function pe(l, e) {
  const a = ne(se, null);
  return B(() => l.hljs || (a == null ? void 0 : a.mergedHljsRef.value));
}
function ye(l) {
  const { textColor2: e, fontSize: a, fontWeightStrong: g, textColor3: h } = l;
  return { textColor: e, fontSize: a, fontWeightStrong: g, "mono-3": "#a0a1a7", "hue-1": "#0184bb", "hue-2": "#4078f2", "hue-3": "#a626a4", "hue-4": "#50a14f", "hue-5": "#e45649", "hue-5-2": "#c91243", "hue-6": "#986801", "hue-6-2": "#c18401", lineNumberTextColor: h };
}
const _e = { common: le, self: ye }, be = H([ae("code", `
 font-size: var(--n-font-size);
 font-family: var(--n-font-family);
 `, [G("show-line-numbers", `
 display: flex;
 `), oe("line-numbers", `
 user-select: none;
 padding-right: 12px;
 text-align: right;
 transition: color .3s var(--n-bezier);
 color: var(--n-line-number-text-color);
 `), G("word-wrap", [H("pre", `
 white-space: pre-wrap;
 word-break: break-all;
 `)]), H("pre", `
 margin: 0;
 line-height: inherit;
 font-size: inherit;
 font-family: inherit;
 `), H("[class^=hljs]", `
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), ({ props: l }) => {
  const e = `${l.bPrefix}code`;
  return [`${e} .hljs-comment,
 ${e} .hljs-quote {
 color: var(--n-mono-3);
 font-style: italic;
 }`, `${e} .hljs-doctag,
 ${e} .hljs-keyword,
 ${e} .hljs-formula {
 color: var(--n-hue-3);
 }`, `${e} .hljs-section,
 ${e} .hljs-name,
 ${e} .hljs-selector-tag,
 ${e} .hljs-deletion,
 ${e} .hljs-subst {
 color: var(--n-hue-5);
 }`, `${e} .hljs-literal {
 color: var(--n-hue-1);
 }`, `${e} .hljs-string,
 ${e} .hljs-regexp,
 ${e} .hljs-addition,
 ${e} .hljs-attribute,
 ${e} .hljs-meta-string {
 color: var(--n-hue-4);
 }`, `${e} .hljs-built_in,
 ${e} .hljs-class .hljs-title {
 color: var(--n-hue-6-2);
 }`, `${e} .hljs-attr,
 ${e} .hljs-variable,
 ${e} .hljs-template-variable,
 ${e} .hljs-type,
 ${e} .hljs-selector-class,
 ${e} .hljs-selector-attr,
 ${e} .hljs-selector-pseudo,
 ${e} .hljs-number {
 color: var(--n-hue-6);
 }`, `${e} .hljs-symbol,
 ${e} .hljs-bullet,
 ${e} .hljs-link,
 ${e} .hljs-meta,
 ${e} .hljs-selector-id,
 ${e} .hljs-title {
 color: var(--n-hue-2);
 }`, `${e} .hljs-emphasis {
 font-style: italic;
 }`, `${e} .hljs-strong {
 font-weight: var(--n-font-weight-strong);
 }`, `${e} .hljs-link {
 text-decoration: underline;
 }`];
}]), xe = Object.assign(Object.assign({}, Z.props), { language: String, code: { type: String, default: "" }, trim: { type: Boolean, default: true }, hljs: Object, uri: Boolean, inline: Boolean, wordWrap: Boolean, showLineNumbers: Boolean, internalFontSize: Number, internalNoHighlight: Boolean }), ke = W({ name: "Code", props: xe, setup(l, { slots: e }) {
  const { internalNoHighlight: a } = l, { mergedClsPrefixRef: g, inlineThemeDisabled: h } = ie(), y = k(null), d = a ? { value: void 0 } : pe(l), S = (o, t, s) => {
    const { value: p } = d;
    return !p || !(o && p.getLanguage(o)) ? null : p.highlight(s ? t.trim() : t, { language: o }).value;
  }, c = B(() => l.inline || l.wordWrap ? false : l.showLineNumbers), r = () => {
    if (e.default) return;
    const { value: o } = y;
    if (!o) return;
    const { language: t } = l, s = l.uri ? window.decodeURIComponent(l.code) : l.code;
    if (t) {
      const _ = S(t, s, l.trim);
      if (_ !== null) {
        if (l.inline) o.innerHTML = _;
        else {
          const O = o.querySelector(".__code__");
          O && o.removeChild(O);
          const z = document.createElement("pre");
          z.className = "__code__", z.innerHTML = _, o.appendChild(z);
        }
        return;
      }
    }
    if (l.inline) {
      o.textContent = s;
      return;
    }
    const p = o.querySelector(".__code__");
    if (p) p.textContent = s;
    else {
      const _ = document.createElement("pre");
      _.className = "__code__", _.textContent = s, o.innerHTML = "", o.appendChild(_);
    }
  };
  Y(r), q(K(l, "language"), r), q(K(l, "code"), r), a || q(d, r);
  const u = Z("Code", "-code", be, _e, l, g), $ = B(() => {
    const { common: { cubicBezierEaseInOut: o, fontFamilyMono: t }, self: { textColor: s, fontSize: p, fontWeightStrong: _, lineNumberTextColor: O, "mono-3": z, "hue-1": V, "hue-2": f, "hue-3": i, "hue-4": E, "hue-5": R, "hue-5-2": A, "hue-6": M, "hue-6-2": I } } = u.value, { internalFontSize: L } = l;
    return { "--n-font-size": L ? `${L}px` : p, "--n-font-family": t, "--n-font-weight-strong": _, "--n-bezier": o, "--n-text-color": s, "--n-mono-3": z, "--n-hue-1": V, "--n-hue-2": f, "--n-hue-3": i, "--n-hue-4": E, "--n-hue-5": R, "--n-hue-5-2": A, "--n-hue-6": M, "--n-hue-6-2": I, "--n-line-number-text-color": O };
  }), m = h ? re("code", B(() => `${l.internalFontSize || "a"}`), $, l) : void 0;
  return { mergedClsPrefix: g, codeRef: y, mergedShowLineNumbers: c, lineNumbers: B(() => {
    let o = 1;
    const t = [];
    let s = false;
    for (const p of l.code) p === `
` ? (s = true, t.push(o++)) : s = false;
    return s || t.push(o++), t.join(`
`);
  }), cssVars: h ? void 0 : $, themeClass: m == null ? void 0 : m.themeClass, onRender: m == null ? void 0 : m.onRender };
}, render() {
  var l, e;
  const { mergedClsPrefix: a, wordWrap: g, mergedShowLineNumbers: h, onRender: y } = this;
  return y == null ? void 0 : y(), j("code", { class: [`${a}-code`, this.themeClass, g && `${a}-code--word-wrap`, h && `${a}-code--show-line-numbers`], style: this.cssVars, ref: "codeRef" }, h ? j("pre", { class: `${a}-code__line-numbers` }, this.lineNumbers) : null, (e = (l = this.$slots).default) === null || e === void 0 ? void 0 : e.call(l));
} }), $e = { class: "flex gap-4" }, we = { key: 0, class: "w-full" }, Ce = { class: "flex items-center justify-between mb-2" }, je = { class: "text-xs text-slate-400" }, Ne = { key: 2, class: "text-xs text-red-400 mt-1" }, Be = { key: 3, class: "text-xs text-green-400 mt-1" }, Se = { key: 1, class: "w-full" }, ze = { key: 0, class: "text-xs text-red-400 mt-1" }, Ee = { key: 1, class: "text-xs text-green-400 mt-1" }, Te = { class: "flex justify-end gap-2" }, Oe = W({ __name: "BackendModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(l, { emit: e }) {
  const a = l, g = e, h = X(), y = Q(), d = B(() => !!a.existing), S = B(() => d.value ? `Edit Backend: ${a.existing.name}` : "Add Backend"), c = k({ name: "", backend_type: "gemini", priority: 0 }), r = k(""), u = k("idle"), $ = k(""), m = k(false), o = k(false), t = k(false);
  q(() => a.show, (f) => {
    var _a, _b, _c;
    f && (c.value = { name: ((_a = a.existing) == null ? void 0 : _a.name) ?? "", backend_type: ((_b = a.existing) == null ? void 0 : _b.backend_type) ?? "gemini", priority: ((_c = a.existing) == null ? void 0 : _c.priority) ?? 0 }, r.value = "", u.value = "idle", $.value = "", m.value = false);
  });
  function s(f) {
    if (!f.trim()) {
      u.value = "idle", $.value = "";
      return;
    }
    try {
      JSON.parse(f), u.value = "valid", $.value = "";
    } catch (i) {
      u.value = "invalid", $.value = i.message;
    }
  }
  function p(f) {
    r.value = f, s(f);
  }
  function _() {
    if (r.value.trim()) try {
      r.value = JSON.stringify(JSON.parse(r.value), null, 2), u.value = "valid";
    } catch {
    }
  }
  async function O() {
    if (m.value) {
      m.value = false, r.value = "", u.value = "idle";
      return;
    }
    o.value = true;
    try {
      const f = await y.getConfig(a.existing.name);
      r.value = JSON.stringify(f.config, null, 2), u.value = "valid", m.value = true;
    } catch (f) {
      h.error(`Failed to load config: ${f.message}`);
    } finally {
      o.value = false;
    }
  }
  async function z() {
    var _a;
    if (!c.value.name) {
      h.error("Name is required");
      return;
    }
    if (!d.value && !r.value.trim()) {
      h.error("Config JSON is required");
      return;
    }
    if (r.value.trim() && u.value === "invalid") {
      h.error("Invalid JSON in config field");
      return;
    }
    let f;
    r.value.trim() && (f = JSON.parse(r.value));
    const i = { name: c.value.name, backend_type: c.value.backend_type, priority: c.value.priority, enabled: ((_a = a.existing) == null ? void 0 : _a.enabled) ?? true, ...f !== void 0 ? { config: f } : {} };
    t.value = true;
    try {
      d.value ? await y.update(a.existing.name, i) : await y.create(i), h.success(d.value ? "Backend updated" : "Backend created"), g("update:show", false), g("saved");
    } catch (E) {
      h.error(E.message);
    } finally {
      t.value = false;
    }
  }
  const V = B(() => {
    var _a;
    return ((_a = a.existing) == null ? void 0 : _a.config_summary) ? JSON.stringify(a.existing.config_summary, null, 2) : "";
  });
  return (f, i) => {
    const E = te, R = ee, A = me, M = he, I = D, L = de;
    return C(), P(L, { show: l.show, title: n(S), preset: "card", style: { width: "520px" }, "onUpdate:show": i[4] || (i[4] = (w) => g("update:show", w)) }, { footer: b(() => [v("div", Te, [x(I, { onClick: i[3] || (i[3] = (w) => g("update:show", false)) }, { default: b(() => [...i[7] || (i[7] = [N("Cancel", -1)])]), _: 1 }), x(I, { type: "primary", loading: n(t), onClick: z }, { default: b(() => [N(J(n(d) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: b(() => [n(d) ? F("", true) : (C(), P(R, { key: 0, label: "Name", required: "" }, { default: b(() => [x(E, { value: n(c).name, "onUpdate:value": i[0] || (i[0] = (w) => n(c).name = w), placeholder: "e.g. gemini-prod" }, null, 8, ["value"])]), _: 1 })), v("div", $e, [x(R, { label: "Type", class: "flex-1", required: "" }, { default: b(() => [x(A, { value: n(c).backend_type, "onUpdate:value": i[1] || (i[1] = (w) => n(c).backend_type = w), options: ["gemini", "anthropic", "openai", "bedrock"].map((w) => ({ label: w, value: w })) }, null, 8, ["value", "options"])]), _: 1 }), x(R, { label: "Priority", class: "w-28" }, { default: b(() => [x(M, { value: n(c).priority, "onUpdate:value": i[2] || (i[2] = (w) => n(c).priority = w), min: -999, max: 999 }, null, 8, ["value"])]), _: 1 })]), x(R, { label: n(d) ? "Config" : "Config JSON", required: !n(d) }, { default: b(() => [n(d) ? (C(), T("div", we, [v("div", Ce, [v("span", je, J(n(m) ? "Decrypted config (editable)" : "Current config summary"), 1), x(I, { size: "tiny", loading: n(o), onClick: O }, { icon: b(() => [v("span", { class: ue(n(m) ? "i-carbon-view-off" : "i-carbon-view") }, null, 2)]), default: b(() => [N(" " + J(n(m) ? "Hide" : "View / Edit Config"), 1)]), _: 1 }, 8, ["loading"])]), n(m) ? (C(), P(E, { key: 1, value: n(r), type: "textarea", rows: 8, placeholder: "Leave empty to keep existing config", status: n(u) === "invalid" ? "error" : n(u) === "valid" ? "success" : void 0, onInput: p, onBlur: _ }, null, 8, ["value", "status"])) : (C(), P(n(ke), { key: 0, code: n(V), language: "json", class: "text-xs" }, null, 8, ["code"])), n(u) === "invalid" ? (C(), T("div", Ne, "\u2717 " + J(n($)), 1)) : n(u) === "valid" && n(m) ? (C(), T("div", Be, "\u2713 Valid JSON")) : F("", true), i[5] || (i[5] = v("p", { class: "text-xs text-slate-500 mt-1" }, "Leave empty to keep existing config.", -1))])) : (C(), T("div", Se, [x(E, { value: n(r), type: "textarea", rows: 6, placeholder: '{"api_keys":["AIza..."]}', status: n(u) === "invalid" ? "error" : n(u) === "valid" ? "success" : void 0, onInput: p, onBlur: _ }, null, 8, ["value", "status"]), n(u) === "invalid" ? (C(), T("div", ze, "\u2717 " + J(n($)), 1)) : n(u) === "valid" ? (C(), T("div", Ee, "\u2713 Valid JSON")) : F("", true), i[6] || (i[6] = v("p", { class: "text-xs text-slate-500 mt-1" }, [N(" Credentials are encrypted before storage."), v("br"), N(" Gemini/Anthropic/OpenAI: "), v("code", null, '{"api_keys":["key1"]}'), v("br"), N(" Bedrock: "), v("code", null, '{"region":"us-east-1"}')], -1))]))]), _: 1 }, 8, ["label", "required"])]), _: 1 }, 8, ["show", "title"]);
  };
} }), Re = { class: "flex items-center justify-between mb-6" }, De = { class: "py-12 text-center" }, Qe = W({ __name: "backends", setup(l) {
  const e = X(), a = ge(), g = Q(), h = k([]), y = k(true), d = k(false), S = k();
  async function c() {
    y.value = true;
    try {
      const t = await g.list();
      h.value = t.data;
    } catch (t) {
      e.error(t.message);
    } finally {
      y.value = false;
    }
  }
  function r() {
    S.value = void 0, d.value = true;
  }
  function u(t) {
    S.value = t, d.value = true;
  }
  async function $(t) {
    try {
      await g.toggle(t), e.success("Backend updated"), await c();
    } catch (s) {
      e.error(s.message);
    }
  }
  function m(t) {
    a.warning({ title: "Delete Backend", content: `Delete "${t}"? This cannot be undone.`, positiveText: "Delete", negativeText: "Cancel", onPositiveClick: async () => {
      try {
        await g.delete(t), e.success("Backend deleted"), await c();
      } catch (s) {
        e.error(s.message);
      }
    } });
  }
  const o = [{ title: "Name", key: "name" }, { title: "Type", key: "backend_type", render: (t) => j(U, { size: "small" }, { default: () => t.backend_type }) }, { title: "Priority", key: "priority" }, { title: "Health", key: "health_status", render: (t) => j(U, { type: ve(t.health_status), size: "small" }, { default: () => t.health_status }) }, { title: "Enabled", key: "enabled", render: (t) => j(U, { type: t.enabled ? "success" : "default", size: "small" }, { default: () => t.enabled ? "enabled" : "disabled" }) }, { title: "Actions", key: "actions", render: (t) => j("div", { class: "flex gap-2" }, [j(D, { size: "small", onClick: () => u(t) }, { default: () => "Edit" }), j(D, { size: "small", onClick: () => $(t.name) }, { default: () => t.enabled ? "Disable" : "Enable" }), j(D, { size: "small", type: "error", onClick: () => m(t.name) }, { default: () => "Delete" })]) }];
  return Y(c), (t, s) => {
    const p = fe;
    return C(), T("div", null, [v("div", Re, [s[3] || (s[3] = v("h1", { class: "text-xl font-semibold text-slate-100" }, "Backends", -1)), x(n(D), { type: "primary", onClick: r }, { icon: b(() => [...s[1] || (s[1] = [v("span", { class: "i-carbon-add" }, null, -1)])]), default: b(() => [s[2] || (s[2] = N(" Add Backend ", -1))]), _: 1 })]), x(p, { columns: o, data: n(h), loading: n(y), pagination: false, size: "small" }, { empty: b(() => [v("div", De, [s[5] || (s[5] = v("span", { class: "i-carbon-server-dns text-4xl text-slate-600 block mx-auto mb-3" }, null, -1)), s[6] || (s[6] = v("p", { class: "text-slate-500 text-sm" }, "No backends configured", -1)), x(n(D), { type: "primary", size: "small", class: "mt-4", onClick: r }, { default: b(() => [...s[4] || (s[4] = [N("Add your first backend", -1)])]), _: 1 })])]), _: 1 }, 8, ["data", "loading"]), x(Oe, { show: n(d), "onUpdate:show": s[0] || (s[0] = (_) => ce(d) ? d.value = _ : null), existing: n(S), onSaved: c }, null, 8, ["show", "existing"])]);
  };
} });
export {
  Qe as default
};
