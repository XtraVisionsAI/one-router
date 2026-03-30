import { bE as f, c5 as o, bI as p, c6 as m } from "./index-DicalUKt.js";
const y = /^(\d|\.)+$/, c = /(\d|\.)+/;
function R(r, { c: e = 1, offset: n = 0, attachPx: t = true } = {}) {
  if (typeof r == "number") {
    const i = (r + n) * e;
    return i === 0 ? "0" : `${i}px`;
  } else if (typeof r == "string") if (y.test(r)) {
    const i = (Number(r) + n) * e;
    return t ? i === 0 ? "0" : `${i}px` : `${i}`;
  } else {
    const i = c.exec(r);
    return i ? r.replace(c, String((Number(i[0]) + n) * e)) : r;
  }
  return r;
}
var d = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, h = /^\w*$/;
function l(r, e) {
  if (f(r)) return false;
  var n = typeof r;
  return n == "number" || n == "symbol" || n == "boolean" || r == null || o(r) ? true : h.test(r) || !d.test(r) || e != null && r in Object(e);
}
var E = "Expected a function";
function s(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function") throw new TypeError(E);
  var n = function() {
    var t = arguments, i = e ? e.apply(this, t) : t[0], u = n.cache;
    if (u.has(i)) return u.get(i);
    var a = r.apply(this, t);
    return n.cache = u.set(i, a) || u, a;
  };
  return n.cache = new (s.Cache || p)(), n;
}
s.Cache = p;
var b = 500;
function g(r) {
  var e = s(r, function(t) {
    return n.size === b && n.clear(), t;
  }), n = e.cache;
  return e;
}
var x = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, C = /\\(\\)?/g, $ = g(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(x, function(n, t, i, u) {
    e.push(i ? u.replace(C, "$1") : t || n);
  }), e;
});
function I(r, e) {
  return f(r) ? r : l(r, e) ? [r] : $(m(r));
}
function P(r) {
  if (typeof r == "string" || o(r)) return r;
  var e = r + "";
  return e == "0" && 1 / r == -1 / 0 ? "-0" : e;
}
function w(r, e) {
  e = I(e, r);
  for (var n = 0, t = e.length; r != null && n < t; ) r = r[P(e[n++])];
  return n && n == t ? r : void 0;
}
function z(r, e, n) {
  var t = r == null ? void 0 : w(r, e);
  return t === void 0 ? n : t;
}
export {
  w as b,
  I as c,
  R as f,
  z as g,
  l as i,
  P as t
};
