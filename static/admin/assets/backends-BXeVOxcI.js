import { u as Q } from "./backends-By8nl6Vb.js";
import { u as X } from "./use-message-B7xbmhU1.js";
import { _ as ee } from "./FormItem-DHwZ_qLU.js";
import { _ as te } from "./Input-DK9mG32G.js";
import { i as ne, c as se, a as B, b as le, e as P, f as ae, g as G, h as oe, d as W, j as C, k as ie, o as Y, w as V, t as K, l as Z, m as re, r as k, n as j, p as q, q as x, s as n, v as _, x as F, y, z as E, A as J, B as O, C as ue, D as ce } from "./index-YqbknKjl.js";
import { _ as de, a as me, N as U } from "./DataTable-14e5pRmB.js";
import { _ as fe, a as he } from "./InputNumber-B74hWMDY.js";
import { B as L } from "./Button-CV4-g0dr.js";
import "./useApi-ClSvQxGZ.js";
import "./use-form-item-B02FE9As.js";
function ve(s, e) {
  const a = ne(se, null);
  return B(() => s.hljs || (a == null ? void 0 : a.mergedHljsRef.value));
}
function ge(s) {
  const { textColor2: e, fontSize: a, fontWeightStrong: p, textColor3: u } = s;
  return { textColor: e, fontSize: a, fontWeightStrong: p, "mono-3": "#a0a1a7", "hue-1": "#0184bb", "hue-2": "#4078f2", "hue-3": "#a626a4", "hue-4": "#50a14f", "hue-5": "#e45649", "hue-5-2": "#c91243", "hue-6": "#986801", "hue-6-2": "#c18401", lineNumberTextColor: u };
}
const pe = { common: le, self: ge }, ye = P([ae("code", `
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
 `), G("word-wrap", [P("pre", `
 white-space: pre-wrap;
 word-break: break-all;
 `)]), P("pre", `
 margin: 0;
 line-height: inherit;
 font-size: inherit;
 font-family: inherit;
 `), P("[class^=hljs]", `
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), ({ props: s }) => {
  const e = `${s.bPrefix}code`;
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
}]), _e = Object.assign(Object.assign({}, Z.props), { language: String, code: { type: String, default: "" }, trim: { type: Boolean, default: true }, hljs: Object, uri: Boolean, inline: Boolean, wordWrap: Boolean, showLineNumbers: Boolean, internalFontSize: Number, internalNoHighlight: Boolean }), be = W({ name: "Code", props: _e, setup(s, { slots: e }) {
  const { internalNoHighlight: a } = s, { mergedClsPrefixRef: p, inlineThemeDisabled: u } = ie(), m = k(null), f = a ? { value: void 0 } : ve(s), N = (t, l, h) => {
    const { value: g } = f;
    return !g || !(t && g.getLanguage(t)) ? null : g.highlight(h ? l.trim() : l, { language: t }).value;
  }, v = B(() => s.inline || s.wordWrap ? false : s.showLineNumbers), i = () => {
    if (e.default) return;
    const { value: t } = m;
    if (!t) return;
    const { language: l } = s, h = s.uri ? window.decodeURIComponent(s.code) : s.code;
    if (l) {
      const b = N(l, h, s.trim);
      if (b !== null) {
        if (s.inline) t.innerHTML = b;
        else {
          const R = t.querySelector(".__code__");
          R && t.removeChild(R);
          const S = document.createElement("pre");
          S.className = "__code__", S.innerHTML = b, t.appendChild(S);
        }
        return;
      }
    }
    if (s.inline) {
      t.textContent = h;
      return;
    }
    const g = t.querySelector(".__code__");
    if (g) g.textContent = h;
    else {
      const b = document.createElement("pre");
      b.className = "__code__", b.textContent = h, t.innerHTML = "", t.appendChild(b);
    }
  };
  Y(i), V(K(s, "language"), i), V(K(s, "code"), i), a || V(f, i);
  const r = Z("Code", "-code", ye, pe, s, p), $ = B(() => {
    const { common: { cubicBezierEaseInOut: t, fontFamilyMono: l }, self: { textColor: h, fontSize: g, fontWeightStrong: b, lineNumberTextColor: R, "mono-3": S, "hue-1": D, "hue-2": d, "hue-3": o, "hue-4": z, "hue-5": T, "hue-5-2": M, "hue-6": A, "hue-6-2": I } } = r.value, { internalFontSize: H } = s;
    return { "--n-font-size": H ? `${H}px` : g, "--n-font-family": l, "--n-font-weight-strong": b, "--n-bezier": t, "--n-text-color": h, "--n-mono-3": S, "--n-hue-1": D, "--n-hue-2": d, "--n-hue-3": o, "--n-hue-4": z, "--n-hue-5": T, "--n-hue-5-2": M, "--n-hue-6": A, "--n-hue-6-2": I, "--n-line-number-text-color": R };
  }), c = u ? re("code", B(() => `${s.internalFontSize || "a"}`), $, s) : void 0;
  return { mergedClsPrefix: p, codeRef: m, mergedShowLineNumbers: v, lineNumbers: B(() => {
    let t = 1;
    const l = [];
    let h = false;
    for (const g of s.code) g === `
` ? (h = true, l.push(t++)) : h = false;
    return h || l.push(t++), l.join(`
`);
  }), cssVars: u ? void 0 : $, themeClass: c == null ? void 0 : c.themeClass, onRender: c == null ? void 0 : c.onRender };
}, render() {
  var s, e;
  const { mergedClsPrefix: a, wordWrap: p, mergedShowLineNumbers: u, onRender: m } = this;
  return m == null ? void 0 : m(), C("code", { class: [`${a}-code`, this.themeClass, p && `${a}-code--word-wrap`, u && `${a}-code--show-line-numbers`], style: this.cssVars, ref: "codeRef" }, u ? C("pre", { class: `${a}-code__line-numbers` }, this.lineNumbers) : null, (e = (s = this.$slots).default) === null || e === void 0 ? void 0 : e.call(s));
} }), xe = { class: "flex gap-4" }, ke = { key: 0, class: "w-full" }, $e = { class: "flex items-center justify-between mb-2" }, we = { class: "text-xs text-slate-400" }, je = { key: 2, class: "text-xs text-red-400 mt-1" }, Ce = { key: 3, class: "text-xs text-green-400 mt-1" }, Ne = { key: 1, class: "w-full" }, Be = { key: 0, class: "text-xs text-red-400 mt-1" }, Se = { key: 1, class: "text-xs text-green-400 mt-1" }, ze = { class: "flex justify-end gap-2" }, Ee = W({ __name: "BackendModal", props: { show: { type: Boolean }, existing: {} }, emits: ["update:show", "saved"], setup(s, { emit: e }) {
  const a = s, p = e, u = X(), m = Q(), f = B(() => !!a.existing), N = B(() => f.value ? `Edit Backend: ${a.existing.name}` : "Add Backend"), v = k({ name: "", backend_type: "gemini", priority: 0 }), i = k(""), r = k("idle"), $ = k(""), c = k(false), t = k(false), l = k(false);
  V(() => a.show, (d) => {
    var _a, _b, _c;
    d && (v.value = { name: ((_a = a.existing) == null ? void 0 : _a.name) ?? "", backend_type: ((_b = a.existing) == null ? void 0 : _b.backend_type) ?? "gemini", priority: ((_c = a.existing) == null ? void 0 : _c.priority) ?? 0 }, i.value = "", r.value = "idle", $.value = "", c.value = false);
  });
  function h(d) {
    if (!d.trim()) {
      r.value = "idle", $.value = "";
      return;
    }
    try {
      JSON.parse(d), r.value = "valid", $.value = "";
    } catch (o) {
      r.value = "invalid", $.value = o.message;
    }
  }
  function g(d) {
    i.value = d, h(d);
  }
  function b() {
    if (i.value.trim()) try {
      i.value = JSON.stringify(JSON.parse(i.value), null, 2), r.value = "valid";
    } catch {
    }
  }
  async function R() {
    if (c.value) {
      c.value = false, i.value = "", r.value = "idle";
      return;
    }
    t.value = true;
    try {
      const d = await m.getConfig(a.existing.name);
      i.value = JSON.stringify(d.config, null, 2), r.value = "valid", c.value = true;
    } catch (d) {
      u.error(`Failed to load config: ${d.message}`);
    } finally {
      t.value = false;
    }
  }
  async function S() {
    var _a;
    if (!v.value.name) {
      u.error("Name is required");
      return;
    }
    if (!f.value && !i.value.trim()) {
      u.error("Config JSON is required");
      return;
    }
    if (i.value.trim() && r.value === "invalid") {
      u.error("Invalid JSON in config field");
      return;
    }
    let d;
    i.value.trim() && (d = JSON.parse(i.value));
    const o = { name: v.value.name, backend_type: v.value.backend_type, priority: v.value.priority, enabled: ((_a = a.existing) == null ? void 0 : _a.enabled) ?? true, ...d !== void 0 ? { config: d } : {} };
    l.value = true;
    try {
      f.value ? await m.update(a.existing.name, o) : await m.create(o), u.success(f.value ? "Backend updated" : "Backend created"), p("update:show", false), p("saved");
    } catch (z) {
      u.error(z.message);
    } finally {
      l.value = false;
    }
  }
  const D = B(() => {
    var _a;
    return ((_a = a.existing) == null ? void 0 : _a.config_summary) ? JSON.stringify(a.existing.config_summary, null, 2) : "";
  });
  return (d, o) => {
    const z = te, T = ee, M = de, A = fe, I = L, H = he;
    return j(), q(H, { show: s.show, title: n(N), preset: "card", style: { width: "520px" }, "onUpdate:show": o[4] || (o[4] = (w) => p("update:show", w)) }, { footer: x(() => [y("div", ze, [_(I, { onClick: o[3] || (o[3] = (w) => p("update:show", false)) }, { default: x(() => [...o[7] || (o[7] = [O("Cancel", -1)])]), _: 1 }), _(I, { type: "primary", loading: n(l), onClick: S }, { default: x(() => [O(J(n(f) ? "Save" : "Create"), 1)]), _: 1 }, 8, ["loading"])])]), default: x(() => [n(f) ? F("", true) : (j(), q(T, { key: 0, label: "Name", required: "" }, { default: x(() => [_(z, { value: n(v).name, "onUpdate:value": o[0] || (o[0] = (w) => n(v).name = w), placeholder: "e.g. gemini-prod" }, null, 8, ["value"])]), _: 1 })), y("div", xe, [_(T, { label: "Type", class: "flex-1", required: "" }, { default: x(() => [_(M, { value: n(v).backend_type, "onUpdate:value": o[1] || (o[1] = (w) => n(v).backend_type = w), options: ["gemini", "anthropic", "openai", "bedrock"].map((w) => ({ label: w, value: w })) }, null, 8, ["value", "options"])]), _: 1 }), _(T, { label: "Priority", class: "w-28" }, { default: x(() => [_(A, { value: n(v).priority, "onUpdate:value": o[2] || (o[2] = (w) => n(v).priority = w), min: -999, max: 999 }, null, 8, ["value"])]), _: 1 })]), _(T, { label: n(f) ? "Config" : "Config JSON", required: !n(f) }, { default: x(() => [n(f) ? (j(), E("div", ke, [y("div", $e, [y("span", we, J(n(c) ? "Decrypted config (editable)" : "Current config summary"), 1), _(I, { size: "tiny", loading: n(t), onClick: R }, { icon: x(() => [y("span", { class: ue(n(c) ? "i-carbon-view-off" : "i-carbon-view") }, null, 2)]), default: x(() => [O(" " + J(n(c) ? "Hide" : "View / Edit Config"), 1)]), _: 1 }, 8, ["loading"])]), n(c) ? (j(), q(z, { key: 1, value: n(i), type: "textarea", rows: 8, placeholder: "Leave empty to keep existing config", status: n(r) === "invalid" ? "error" : n(r) === "valid" ? "success" : void 0, onInput: g, onBlur: b }, null, 8, ["value", "status"])) : (j(), q(n(be), { key: 0, code: n(D), language: "json", class: "text-xs" }, null, 8, ["code"])), n(r) === "invalid" ? (j(), E("div", je, "\u2717 " + J(n($)), 1)) : n(r) === "valid" && n(c) ? (j(), E("div", Ce, "\u2713 Valid JSON")) : F("", true), o[5] || (o[5] = y("p", { class: "text-xs text-slate-500 mt-1" }, "Leave empty to keep existing config.", -1))])) : (j(), E("div", Ne, [_(z, { value: n(i), type: "textarea", rows: 6, placeholder: '{"api_keys":["AIza..."]}', status: n(r) === "invalid" ? "error" : n(r) === "valid" ? "success" : void 0, onInput: g, onBlur: b }, null, 8, ["value", "status"]), n(r) === "invalid" ? (j(), E("div", Be, "\u2717 " + J(n($)), 1)) : n(r) === "valid" ? (j(), E("div", Se, "\u2713 Valid JSON")) : F("", true), o[6] || (o[6] = y("p", { class: "text-xs text-slate-500 mt-1" }, [O(" Credentials are encrypted before storage."), y("br"), O(" Gemini/Anthropic/OpenAI: "), y("code", null, '{"api_keys":["key1"]}'), y("br"), O(" Bedrock: "), y("code", null, '{"region":"us-east-1"}')], -1))]))]), _: 1 }, 8, ["label", "required"])]), _: 1 }, 8, ["show", "title"]);
  };
} }), Oe = { class: "flex items-center justify-between mb-6" }, Me = W({ __name: "backends", setup(s) {
  const e = X(), a = Q(), p = k([]), u = k(true), m = k(false), f = k();
  async function N() {
    u.value = true;
    try {
      const t = await a.list();
      p.value = t.data;
    } catch (t) {
      e.error(t.message);
    } finally {
      u.value = false;
    }
  }
  function v() {
    f.value = void 0, m.value = true;
  }
  function i(t) {
    f.value = t, m.value = true;
  }
  async function r(t) {
    try {
      await a.toggle(t), e.success("Backend updated"), await N();
    } catch (l) {
      e.error(l.message);
    }
  }
  async function $(t) {
    try {
      await a.delete(t), e.success("Backend deleted"), await N();
    } catch (l) {
      e.error(l.message);
    }
  }
  const c = [{ title: "Name", key: "name" }, { title: "Type", key: "backend_type", render: (t) => C(U, { size: "small" }, { default: () => t.backend_type }) }, { title: "Priority", key: "priority" }, { title: "Health", key: "health_status", render: (t) => {
    const l = t.health_status === "healthy" ? "success" : t.health_status === "unhealthy" ? "error" : "default";
    return C(U, { type: l, size: "small" }, { default: () => t.health_status });
  } }, { title: "Enabled", key: "enabled", render: (t) => C(U, { type: t.enabled ? "success" : "default", size: "small" }, { default: () => t.enabled ? "enabled" : "disabled" }) }, { title: "Actions", key: "actions", render: (t) => C("div", { class: "flex gap-2" }, [C(L, { size: "small", onClick: () => i(t) }, { default: () => "Edit" }), C(L, { size: "small", onClick: () => r(t.name) }, { default: () => t.enabled ? "Disable" : "Enable" }), C(L, { size: "small", type: "error", onClick: () => $(t.name) }, { default: () => "Delete" })]) }];
  return Y(N), (t, l) => {
    const h = me;
    return j(), E("div", null, [y("div", Oe, [l[3] || (l[3] = y("h1", { class: "text-xl font-semibold text-slate-100" }, "Backends", -1)), _(n(L), { type: "primary", onClick: v }, { icon: x(() => [...l[1] || (l[1] = [y("span", { class: "i-carbon-add" }, null, -1)])]), default: x(() => [l[2] || (l[2] = O(" Add Backend ", -1))]), _: 1 })]), _(h, { columns: c, data: n(p), loading: n(u), pagination: false, size: "small" }, null, 8, ["data", "loading"]), _(Ee, { show: n(m), "onUpdate:show": l[0] || (l[0] = (g) => ce(m) ? m.value = g : null), existing: n(f), onSaved: N }, null, 8, ["show", "existing"])]);
  };
} });
export {
  Me as default
};
