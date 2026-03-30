import { f as a, e as d, h as C, d as N, j as E, k as O, a5 as $, g as F, l as V, a6 as K, a7 as M, a8 as R, r as P, u as A, a9 as W, aa as q, n as z, z as G, y as w, v, q as I, ab as D, s as y, D as T, C as U, B as H, ac as J } from "./index-BKXoSCv0.js";
import { B as Q } from "./Button-BG9pNlUY.js";
import { f as X, a as Y, _ as Z } from "./FormItem-Cc6dA3q3.js";
import { u as tt } from "./use-message-Diy95wEL.js";
import { _ as et } from "./Input-DKOKpeJJ.js";
import { b as L } from "./route-block-B_A1xBdJ.js";
import "./use-form-item-PZPZ68wM.js";
const ot = a("input-group", `
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`, [d(">", [a("input", [d("&:not(:last-child)", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), d("&:not(:first-child)", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]), a("button", [d("&:not(:last-child)", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `, [C("state-border, border", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]), d("&:not(:first-child)", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `, [C("state-border, border", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]), d("*", [d("&:not(:last-child)", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `, [d(">", [a("input", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), a("base-selection", [a("base-selection-label", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), a("base-selection-tags", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), C("box-shadow, border, state-border", `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]), d("&:not(:first-child)", `
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `, [d(">", [a("input", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), a("base-selection", [a("base-selection-label", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), a("base-selection-tags", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), C("box-shadow, border, state-border", `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]), rt = {}, nt = N({ name: "InputGroup", props: rt, setup(o) {
  const { mergedClsPrefixRef: u } = O(o);
  return $("-input-group", ot, u), { mergedClsPrefix: u };
}, render() {
  const { mergedClsPrefix: o } = this;
  return E("div", { class: `${o}-input-group` }, this.$slots);
} }), it = a("form", [F("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [a("form-item", { width: "auto", marginRight: "18px" }, [d("&:last-child", { marginRight: 0 })])])]);
var at = function(o, u, r, l) {
  function x(n) {
    return n instanceof r ? n : new r(function(s) {
      s(n);
    });
  }
  return new (r || (r = Promise))(function(n, s) {
    function m(t) {
      try {
        e(l.next(t));
      } catch (i) {
        s(i);
      }
    }
    function c(t) {
      try {
        e(l.throw(t));
      } catch (i) {
        s(i);
      }
    }
    function e(t) {
      t.done ? n(t.value) : x(t.value).then(m, c);
    }
    e((l = l.apply(o, u || [])).next());
  });
};
const st = Object.assign(Object.assign({}, V.props), { inline: Boolean, labelWidth: [Number, String], labelAlign: String, labelPlacement: { type: String, default: "top" }, model: { type: Object, default: () => {
} }, rules: Object, disabled: Boolean, size: String, showRequireMark: { type: Boolean, default: void 0 }, requireMarkPlacement: String, showFeedback: { type: Boolean, default: true }, onSubmit: { type: Function, default: (o) => {
  o.preventDefault();
} }, showLabel: { type: Boolean, default: void 0 }, validateMessages: Object }), dt = N({ name: "Form", props: st, setup(o) {
  const { mergedClsPrefixRef: u } = O(o);
  V("Form", "-form", it, K, o, u);
  const r = {}, l = P(void 0), x = (e) => {
    const t = l.value;
    (t === void 0 || e >= t) && (l.value = e);
  };
  function n() {
    var e;
    for (const t of M(r)) {
      const i = r[t];
      for (const f of i) (e = f.invalidateLabelWidth) === null || e === void 0 || e.call(f);
    }
  }
  function s(e) {
    return at(this, arguments, void 0, function* (t, i = () => true) {
      return yield new Promise((f, B) => {
        const k = [];
        for (const b of M(r)) {
          const h = r[b];
          for (const p of h) p.path && k.push(p.internalValidate(null, i));
        }
        Promise.all(k).then((b) => {
          const h = b.some((g) => !g.valid), p = [], _ = [];
          b.forEach((g) => {
            var S, j;
            !((S = g.errors) === null || S === void 0) && S.length && p.push(g.errors), !((j = g.warnings) === null || j === void 0) && j.length && _.push(g.warnings);
          }), t && t(p.length ? p : void 0, { warnings: _.length ? _ : void 0 }), h ? B(p.length ? p : void 0) : f({ warnings: _.length ? _ : void 0 });
        });
      });
    });
  }
  function m() {
    for (const e of M(r)) {
      const t = r[e];
      for (const i of t) i.restoreValidation();
    }
  }
  return R(X, { props: o, maxChildLabelWidthRef: l, deriveMaxChildLabelWidth: x }), R(Y, { formItems: r }), Object.assign({ validate: s, restoreValidation: m, invalidateLabelWidth: n }, { mergedClsPrefix: u });
}, render() {
  const { mergedClsPrefix: o } = this;
  return E("form", { class: [`${o}-form`, this.inline && `${o}-form--inline`], onSubmit: this.onSubmit }, this.$slots);
} }), lt = { class: "bg-[#1e293b] rounded-xl shadow-2xl p-8 w-[400px] border border-slate-700" }, ut = N({ __name: "login", setup(o) {
  const u = A(), r = W(), l = tt(), x = q(), n = P(""), s = P(false), m = P(false);
  async function c() {
    if (n.value.trim()) {
      s.value = true;
      try {
        const e = await fetch("/admin/api/status", { headers: { "x-api-key": n.value.trim() } });
        if (!e.ok) throw new Error("Invalid API key");
        const t = await e.json();
        x.login(n.value.trim(), t.version ?? "");
        const i = r.query.redirect || "/dashboard";
        u.push(i);
      } catch {
        l.error("Invalid API key. Please try again.");
      } finally {
        s.value = false;
      }
    }
  }
  return (e, t) => {
    const i = et, f = Q, B = nt, k = Z, b = dt;
    return z(), G("div", lt, [t[3] || (t[3] = w("div", { class: "mb-6 text-center" }, [w("span", { class: "text-indigo-400 font-semibold text-xl" }, "one-router"), w("span", { class: "ml-2 text-sm text-slate-500 bg-slate-700 px-2 py-0.5 rounded" }, "admin")], -1)), t[4] || (t[4] = w("p", { class: "text-slate-400 text-sm text-center mb-6" }, " Enter your master or ephemeral API key to continue. ", -1)), v(b, { onSubmit: J(c, ["prevent"]) }, { default: I(() => [v(k, null, { default: I(() => [v(B, null, { default: I(() => [v(i, { value: y(n), "onUpdate:value": t[0] || (t[0] = (h) => T(n) ? n.value = h : null), type: y(m) ? "text" : "password", placeholder: "sk-...", disabled: y(s), onKeydown: D(c, ["enter"]) }, null, 8, ["value", "type", "disabled"]), v(f, { onClick: t[1] || (t[1] = (h) => m.value = !y(m)) }, { icon: I(() => [w("span", { class: U(y(m) ? "i-carbon-view-off" : "i-carbon-view") }, null, 2)]), _: 1 })]), _: 1 })]), _: 1 }), v(f, { type: "primary", block: "", loading: y(s), onClick: c }, { default: I(() => [...t[2] || (t[2] = [H(" Sign in ", -1)])]), _: 1 }, 8, ["loading"])]), _: 1 })]);
  };
} });
typeof L == "function" && L(ut);
export {
  ut as default
};
