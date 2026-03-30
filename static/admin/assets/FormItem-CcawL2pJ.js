import { ax as Be, w as Ve, ac as De, i as se, b as Ue, ae as Te, e as ne, b6 as Ye, f as N, h as he, g as V, k as Ie, c as F, r as ee, d as Ke, j as $, T as Je, aH as Oe, t as ve, l as We, o as Ze, m as Ge, a4 as Qe, al as _e, I as D } from "./index-HnuybbhN.js";
import { r as Xe, f as et } from "./use-form-item-DgrHZmhA.js";
import { g as Ne, j as we } from "./Button-DSNNFXd2.js";
function tt(n, e, t) {
  var r;
  const i = se(n, null);
  if (i === null) return;
  const a = (r = Be()) === null || r === void 0 ? void 0 : r.proxy;
  Ve(t, o), o(t.value), De(() => {
    o(void 0, t.value);
  });
  function o(u, f) {
    if (!i) return;
    const g = i[e];
    f !== void 0 && s(g, f), u !== void 0 && l(g, u);
  }
  function s(u, f) {
    u[f] || (u[f] = []), u[f].splice(u[f].findIndex((g) => g === a), 1);
  }
  function l(u, f) {
    u[f] || (u[f] = []), ~u[f].findIndex((g) => g === a) || u[f].push(a);
  }
}
const rt = { feedbackPadding: "4px 0 0 2px", feedbackHeightSmall: "24px", feedbackHeightMedium: "24px", feedbackHeightLarge: "26px", feedbackFontSizeSmall: "13px", feedbackFontSizeMedium: "14px", feedbackFontSizeLarge: "14px", labelFontSizeLeftSmall: "14px", labelFontSizeLeftMedium: "14px", labelFontSizeLeftLarge: "15px", labelFontSizeTopSmall: "13px", labelFontSizeTopMedium: "14px", labelFontSizeTopLarge: "14px", labelHeightSmall: "24px", labelHeightMedium: "26px", labelHeightLarge: "28px", labelPaddingVertical: "0 0 6px 2px", labelPaddingHorizontal: "0 12px 0 0", labelTextAlignVertical: "left", labelTextAlignHorizontal: "right", labelFontWeight: "400" };
function nt(n) {
  const { heightSmall: e, heightMedium: t, heightLarge: r, textColor1: i, errorColor: a, warningColor: o, lineHeight: s, textColor3: l } = n;
  return Object.assign(Object.assign({}, rt), { blankHeightSmall: e, blankHeightMedium: t, blankHeightLarge: r, lineHeight: s, labelTextColor: i, asteriskColor: a, feedbackTextColorError: a, feedbackTextColorWarning: o, feedbackTextColor: l });
}
const it = { common: Ue, self: nt }, ye = Te("n-form"), at = Te("n-form-item-insts");
function K() {
  return K = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, K.apply(this, arguments);
}
function ot(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, oe(n, e);
}
function Re(n) {
  return Re = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Re(n);
}
function oe(n, e) {
  return oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, oe(n, e);
}
function st() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return false;
  if (typeof Proxy == "function") return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch {
    return false;
  }
}
function be(n, e, t) {
  return st() ? be = Reflect.construct.bind() : be = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var l = Function.bind.apply(i, s), u = new l();
    return o && oe(u, o.prototype), u;
  }, be.apply(null, arguments);
}
function lt(n) {
  return Function.toString.call(n).indexOf("[native code]") !== -1;
}
function qe(n) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return qe = function(r) {
    if (r === null || !lt(r)) return r;
    if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r)) return e.get(r);
      e.set(r, i);
    }
    function i() {
      return be(r, arguments, Re(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, { constructor: { value: i, enumerable: false, writable: true, configurable: true } }), oe(i, r);
  }, qe(n);
}
var ft = /%[sdj%]/g, dt = function() {
};
function Fe(n) {
  if (!n || !n.length) return null;
  var e = {};
  return n.forEach(function(t) {
    var r = t.field;
    e[r] = e[r] || [], e[r].push(t);
  }), e;
}
function j(n) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) t[r - 1] = arguments[r];
  var i = 0, a = t.length;
  if (typeof n == "function") return n.apply(null, t);
  if (typeof n == "string") {
    var o = n.replace(ft, function(s) {
      if (s === "%%") return "%";
      if (i >= a) return s;
      switch (s) {
        case "%s":
          return String(t[i++]);
        case "%d":
          return Number(t[i++]);
        case "%j":
          try {
            return JSON.stringify(t[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return o;
  }
  return n;
}
function ut(n) {
  return n === "string" || n === "url" || n === "hex" || n === "email" || n === "date" || n === "pattern";
}
function q(n, e) {
  return !!(n == null || e === "array" && Array.isArray(n) && !n.length || ut(e) && typeof n == "string" && !n);
}
function ct(n, e, t) {
  var r = [], i = 0, a = n.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && t(r);
  }
  n.forEach(function(s) {
    e(s, o);
  });
}
function Ae(n, e, t) {
  var r = 0, i = n.length;
  function a(o) {
    if (o && o.length) {
      t(o);
      return;
    }
    var s = r;
    r = r + 1, s < i ? e(n[s], a) : t([]);
  }
  a([]);
}
function mt(n) {
  var e = [];
  return Object.keys(n).forEach(function(t) {
    e.push.apply(e, n[t] || []);
  }), e;
}
var $e = (function(n) {
  ot(e, n);
  function e(t, r) {
    var i;
    return i = n.call(this, "Async Validation Error") || this, i.errors = t, i.fields = r, i;
  }
  return e;
})(qe(Error));
function gt(n, e, t, r, i) {
  if (e.first) {
    var a = new Promise(function(p, O) {
      var c = function(d) {
        return r(d), d.length ? O(new $e(d, Fe(d))) : p(i);
      }, m = mt(n);
      Ae(m, t, c);
    });
    return a.catch(function(p) {
      return p;
    }), a;
  }
  var o = e.firstFields === true ? Object.keys(n) : e.firstFields || [], s = Object.keys(n), l = s.length, u = 0, f = [], g = new Promise(function(p, O) {
    var c = function(w) {
      if (f.push.apply(f, w), u++, u === l) return r(f), f.length ? O(new $e(f, Fe(f))) : p(i);
    };
    s.length || (r(f), p(i)), s.forEach(function(m) {
      var w = n[m];
      o.indexOf(m) !== -1 ? Ae(w, t, c) : ct(w, t, c);
    });
  });
  return g.catch(function(p) {
    return p;
  }), g;
}
function ht(n) {
  return !!(n && n.message !== void 0);
}
function vt(n, e) {
  for (var t = n, r = 0; r < e.length; r++) {
    if (t == null) return t;
    t = t[e[r]];
  }
  return t;
}
function Ee(n, e) {
  return function(t) {
    var r;
    return n.fullFields ? r = vt(e, n.fullFields) : r = e[t.field || n.fullField], ht(t) ? (t.field = t.field || n.fullField, t.fieldValue = r, t) : { message: typeof t == "function" ? t() : t, fieldValue: r, field: t.field || n.fullField };
  };
}
function je(n, e) {
  if (e) {
    for (var t in e) if (e.hasOwnProperty(t)) {
      var r = e[t];
      typeof r == "object" && typeof n[t] == "object" ? n[t] = K({}, n[t], r) : n[t] = r;
    }
  }
  return n;
}
var He = function(e, t, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || q(t, o || e.type)) && i.push(j(a.messages.required, e.fullField));
}, pt = function(e, t, r, i, a) {
  (/^\s+$/.test(t) || t === "") && i.push(j(a.messages.whitespace, e.fullField));
}, pe, bt = (function() {
  if (pe) return pe;
  var n = "[a-fA-F\\d:]", e = function(b) {
    return b && b.includeBoundaries ? "(?:(?<=\\s|^)(?=" + n + ")|(?<=" + n + ")(?=\\s|$))" : "";
  }, t = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + t + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + t + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + t + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + t + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + t + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + t + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + t + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + t + "$)|(?:^" + i + "$)"), o = new RegExp("^" + t + "$"), s = new RegExp("^" + i + "$"), l = function(b) {
    return b && b.exact ? a : new RegExp("(?:" + e(b) + t + e(b) + ")|(?:" + e(b) + i + e(b) + ")", "g");
  };
  l.v4 = function(h) {
    return h && h.exact ? o : new RegExp("" + e(h) + t + e(h), "g");
  }, l.v6 = function(h) {
    return h && h.exact ? s : new RegExp("" + e(h) + i + e(h), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", g = l.v4().source, p = l.v6().source, O = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", c = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", w = "(?::\\d{2,5})?", d = '(?:[/?#][^\\s"]*)?', L = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + g + "|" + p + "|" + O + c + m + ")" + w + d;
  return pe = new RegExp("(?:^" + L + "$)", "i"), pe;
}), ze = { email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/, hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i }, ie = { integer: function(e) {
  return ie.number(e) && parseInt(e, 10) === e;
}, float: function(e) {
  return ie.number(e) && !ie.integer(e);
}, array: function(e) {
  return Array.isArray(e);
}, regexp: function(e) {
  if (e instanceof RegExp) return true;
  try {
    return !!new RegExp(e);
  } catch {
    return false;
  }
}, date: function(e) {
  return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
}, number: function(e) {
  return isNaN(e) ? false : typeof e == "number";
}, object: function(e) {
  return typeof e == "object" && !ie.array(e);
}, method: function(e) {
  return typeof e == "function";
}, email: function(e) {
  return typeof e == "string" && e.length <= 320 && !!e.match(ze.email);
}, url: function(e) {
  return typeof e == "string" && e.length <= 2048 && !!e.match(bt());
}, hex: function(e) {
  return typeof e == "string" && !!e.match(ze.hex);
} }, yt = function(e, t, r, i, a) {
  if (e.required && t === void 0) {
    He(e, t, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = e.type;
  o.indexOf(s) > -1 ? ie[s](t) || i.push(j(a.messages.types[s], e.fullField, e.type)) : s && typeof t !== e.type && i.push(j(a.messages.types[s], e.fullField, e.type));
}, xt = function(e, t, r, i, a) {
  var o = typeof e.len == "number", s = typeof e.min == "number", l = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = t, g = null, p = typeof t == "number", O = typeof t == "string", c = Array.isArray(t);
  if (p ? g = "number" : O ? g = "string" : c && (g = "array"), !g) return false;
  c && (f = t.length), O && (f = t.replace(u, "_").length), o ? f !== e.len && i.push(j(a.messages[g].len, e.fullField, e.len)) : s && !l && f < e.min ? i.push(j(a.messages[g].min, e.fullField, e.min)) : l && !s && f > e.max ? i.push(j(a.messages[g].max, e.fullField, e.max)) : s && l && (f < e.min || f > e.max) && i.push(j(a.messages[g].range, e.fullField, e.min, e.max));
}, X = "enum", wt = function(e, t, r, i, a) {
  e[X] = Array.isArray(e[X]) ? e[X] : [], e[X].indexOf(t) === -1 && i.push(j(a.messages[X], e.fullField, e[X].join(", ")));
}, kt = function(e, t, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp) e.pattern.lastIndex = 0, e.pattern.test(t) || i.push(j(a.messages.pattern.mismatch, e.fullField, t, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(t) || i.push(j(a.messages.pattern.mismatch, e.fullField, t, e.pattern));
    }
  }
}, v = { required: He, whitespace: pt, type: yt, range: xt, enum: wt, pattern: kt }, Rt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t, "string") && !e.required) return r();
    v.required(e, t, i, o, a, "string"), q(t, "string") || (v.type(e, t, i, o, a), v.range(e, t, i, o, a), v.pattern(e, t, i, o, a), e.whitespace === true && v.whitespace(e, t, i, o, a));
  }
  r(o);
}, qt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && v.type(e, t, i, o, a);
  }
  r(o);
}, Ft = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (t === "" && (t = void 0), q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && (v.type(e, t, i, o, a), v.range(e, t, i, o, a));
  }
  r(o);
}, St = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && v.type(e, t, i, o, a);
  }
  r(o);
}, Pt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), q(t) || v.type(e, t, i, o, a);
  }
  r(o);
}, Ot = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && (v.type(e, t, i, o, a), v.range(e, t, i, o, a));
  }
  r(o);
}, _t = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && (v.type(e, t, i, o, a), v.range(e, t, i, o, a));
  }
  r(o);
}, At = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (t == null && !e.required) return r();
    v.required(e, t, i, o, a, "array"), t != null && (v.type(e, t, i, o, a), v.range(e, t, i, o, a));
  }
  r(o);
}, $t = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && v.type(e, t, i, o, a);
  }
  r(o);
}, Et = "enum", jt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a), t !== void 0 && v[Et](e, t, i, o, a);
  }
  r(o);
}, zt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t, "string") && !e.required) return r();
    v.required(e, t, i, o, a), q(t, "string") || v.pattern(e, t, i, o, a);
  }
  r(o);
}, Mt = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t, "date") && !e.required) return r();
    if (v.required(e, t, i, o, a), !q(t, "date")) {
      var l;
      t instanceof Date ? l = t : l = new Date(t), v.type(e, l, i, o, a), l && v.range(e, l.getTime(), i, o, a);
    }
  }
  r(o);
}, Lt = function(e, t, r, i, a) {
  var o = [], s = Array.isArray(t) ? "array" : typeof t;
  v.required(e, t, i, o, a, s), r(o);
}, ke = function(e, t, r, i, a) {
  var o = e.type, s = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (q(t, o) && !e.required) return r();
    v.required(e, t, i, s, a, o), q(t, o) || v.type(e, t, i, s, a);
  }
  r(s);
}, Ct = function(e, t, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (q(t) && !e.required) return r();
    v.required(e, t, i, o, a);
  }
  r(o);
}, ae = { string: Rt, method: qt, number: Ft, boolean: St, regexp: Pt, integer: Ot, float: _t, array: At, object: $t, enum: jt, pattern: zt, date: Mt, url: ke, hex: ke, email: ke, required: Lt, any: Ct };
function Se() {
  return { default: "Validation error on field %s", required: "%s is required", enum: "%s must be one of %s", whitespace: "%s cannot be empty", date: { format: "%s date %s is invalid for format %s", parse: "%s date could not be parsed, %s is invalid ", invalid: "%s date %s is invalid" }, types: { string: "%s is not a %s", method: "%s is not a %s (function)", array: "%s is not an %s", object: "%s is not an %s", number: "%s is not a %s", date: "%s is not a %s", boolean: "%s is not a %s", integer: "%s is not an %s", float: "%s is not a %s", regexp: "%s is not a valid %s", email: "%s is not a valid %s", url: "%s is not a valid %s", hex: "%s is not a valid %s" }, string: { len: "%s must be exactly %s characters", min: "%s must be at least %s characters", max: "%s cannot be longer than %s characters", range: "%s must be between %s and %s characters" }, number: { len: "%s must equal %s", min: "%s cannot be less than %s", max: "%s cannot be greater than %s", range: "%s must be between %s and %s" }, array: { len: "%s must be exactly %s in length", min: "%s cannot be less than %s in length", max: "%s cannot be greater than %s in length", range: "%s must be between %s and %s in length" }, pattern: { mismatch: "%s value %s does not match pattern %s" }, clone: function() {
    var e = JSON.parse(JSON.stringify(this));
    return e.clone = this.clone, e;
  } };
}
var Pe = Se(), te = (function() {
  function n(t) {
    this.rules = null, this._messages = Pe, this.define(t);
  }
  var e = n.prototype;
  return e.define = function(r) {
    var i = this;
    if (!r) throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r)) throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(a) {
      var o = r[a];
      i.rules[a] = Array.isArray(o) ? o : [o];
    });
  }, e.messages = function(r) {
    return r && (this._messages = je(Se(), r)), this._messages;
  }, e.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, l = i, u = a;
    if (typeof l == "function" && (u = l, l = {}), !this.rules || Object.keys(this.rules).length === 0) return u && u(null, s), Promise.resolve(s);
    function f(m) {
      var w = [], d = {};
      function L(b) {
        if (Array.isArray(b)) {
          var R;
          w = (R = w).concat.apply(R, b);
        } else w.push(b);
      }
      for (var h = 0; h < m.length; h++) L(m[h]);
      w.length ? (d = Fe(w), u(w, d)) : u(null, s);
    }
    if (l.messages) {
      var g = this.messages();
      g === Pe && (g = Se()), je(g, l.messages), l.messages = g;
    } else l.messages = this.messages();
    var p = {}, O = l.keys || Object.keys(this.rules);
    O.forEach(function(m) {
      var w = o.rules[m], d = s[m];
      w.forEach(function(L) {
        var h = L;
        typeof h.transform == "function" && (s === r && (s = K({}, s)), d = s[m] = h.transform(d)), typeof h == "function" ? h = { validator: h } : h = K({}, h), h.validator = o.getValidationMethod(h), h.validator && (h.field = m, h.fullField = h.fullField || m, h.type = o.getType(h), p[m] = p[m] || [], p[m].push({ rule: h, value: d, source: s, field: m }));
      });
    });
    var c = {};
    return gt(p, l, function(m, w) {
      var _a;
      var d = m.rule, L = (d.type === "object" || d.type === "array") && (typeof d.fields == "object" || typeof d.defaultField == "object");
      L = L && (d.required || !d.required && m.value), d.field = m.field;
      function h(S, T) {
        return K({}, T, { fullField: d.fullField + "." + S, fullFields: d.fullFields ? [].concat(d.fullFields, [S]) : [S] });
      }
      function b(S) {
        S === void 0 && (S = []);
        var T = Array.isArray(S) ? S : [S];
        !l.suppressWarning && T.length && n.warning("async-validator:", T), T.length && d.message !== void 0 && (T = [].concat(d.message));
        var C = T.map(Ee(d, s));
        if (l.first && C.length) return c[d.field] = 1, w(C);
        if (!L) w(C);
        else {
          if (d.required && !m.value) return d.message !== void 0 ? C = [].concat(d.message).map(Ee(d, s)) : l.error && (C = [l.error(d, j(l.messages.required, d.field))]), w(C);
          var U = {};
          d.defaultField && Object.keys(m.value).map(function(z) {
            U[z] = d.defaultField;
          }), U = K({}, U, m.rule.fields);
          var le = {};
          Object.keys(U).forEach(function(z) {
            var P = U[z], xe = Array.isArray(P) ? P : [P];
            le[z] = xe.map(h.bind(null, z));
          });
          var fe = new n(le);
          fe.messages(l.messages), m.rule.options && (m.rule.options.messages = l.messages, m.rule.options.error = l.error), fe.validate(m.value, m.rule.options || l, function(z) {
            var P = [];
            C && C.length && P.push.apply(P, C), z && z.length && P.push.apply(P, z), w(P.length ? P : null);
          });
        }
      }
      var R;
      if (d.asyncValidator) R = d.asyncValidator(d, m.value, b, m.source, l);
      else if (d.validator) {
        try {
          R = d.validator(d, m.value, b, m.source, l);
        } catch (S) {
          (_a = console.error) == null ? void 0 : _a.call(console, S), l.suppressValidatorError || setTimeout(function() {
            throw S;
          }, 0), b(S.message);
        }
        R === true ? b() : R === false ? b(typeof d.message == "function" ? d.message(d.fullField || d.field) : d.message || (d.fullField || d.field) + " fails") : R instanceof Array ? b(R) : R instanceof Error && b(R.message);
      }
      R && R.then && R.then(function() {
        return b();
      }, function(S) {
        return b(S);
      });
    }, function(m) {
      f(m);
    }, s);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !ae.hasOwnProperty(r.type)) throw new Error(j("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function") return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? ae.required : ae[this.getType(r)] || void 0;
  }, n;
})();
te.register = function(e, t) {
  if (typeof t != "function") throw new Error("Cannot register a validator by type, validator is not a function");
  ae[e] = t;
};
te.warning = dt;
te.messages = Pe;
te.validators = ae;
const { cubicBezierEaseInOut: Me } = Ye;
function Vt({ name: n = "fade-down", fromOffset: e = "-4px", enterDuration: t = ".3s", leaveDuration: r = ".3s", enterCubicBezier: i = Me, leaveCubicBezier: a = Me } = {}) {
  return [ne(`&.${n}-transition-enter-from, &.${n}-transition-leave-to`, { opacity: 0, transform: `translateY(${e})` }), ne(`&.${n}-transition-enter-to, &.${n}-transition-leave-from`, { opacity: 1, transform: "translateY(0)" }), ne(`&.${n}-transition-leave-active`, { transition: `opacity ${r} ${a}, transform ${r} ${a}` }), ne(`&.${n}-transition-enter-active`, { transition: `opacity ${t} ${i}, transform ${t} ${i}` })];
}
const Tt = N("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [N("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [he("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), he("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), N("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), V("auto-label-width", [N("form-item-label", "white-space: nowrap;")]), V("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [N("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [V("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), V("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), V("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), V("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), he("text", `
 grid-area: text; 
 `), he("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), V("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [V("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), N("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), N("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), N("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [ne("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), N("form-item-feedback", { transition: "color .3s var(--n-bezier)", color: "var(--n-feedback-text-color)" }, [V("warning", { color: "var(--n-feedback-text-color-warning)" }), V("error", { color: "var(--n-feedback-text-color-error)" }), Vt({ fromOffset: "-3px", enterDuration: ".3s", leaveDuration: ".2s" })])])]);
function It(n) {
  const e = se(ye, null), { mergedComponentPropsRef: t } = Ie(n);
  return { mergedSize: F(() => {
    var r, i;
    if (n.size !== void 0) return n.size;
    if ((e == null ? void 0 : e.props.size) !== void 0) return e.props.size;
    const a = (i = (r = t == null ? void 0 : t.value) === null || r === void 0 ? void 0 : r.Form) === null || i === void 0 ? void 0 : i.size;
    return a || "medium";
  }) };
}
function Wt(n) {
  const e = se(ye, null), t = F(() => {
    const { labelPlacement: c } = n;
    return c !== void 0 ? c : (e == null ? void 0 : e.props.labelPlacement) ? e.props.labelPlacement : "top";
  }), r = F(() => t.value === "left" && (n.labelWidth === "auto" || (e == null ? void 0 : e.props.labelWidth) === "auto")), i = F(() => {
    if (t.value === "top") return;
    const { labelWidth: c } = n;
    if (c !== void 0 && c !== "auto") return we(c);
    if (r.value) {
      const m = e == null ? void 0 : e.maxChildLabelWidthRef.value;
      return m !== void 0 ? we(m) : void 0;
    }
    if ((e == null ? void 0 : e.props.labelWidth) !== void 0) return we(e.props.labelWidth);
  }), a = F(() => {
    const { labelAlign: c } = n;
    if (c) return c;
    if (e == null ? void 0 : e.props.labelAlign) return e.props.labelAlign;
  }), o = F(() => {
    var c;
    return [(c = n.labelProps) === null || c === void 0 ? void 0 : c.style, n.labelStyle, { width: i.value }];
  }), s = F(() => {
    const { showRequireMark: c } = n;
    return c !== void 0 ? c : e == null ? void 0 : e.props.showRequireMark;
  }), l = F(() => {
    const { requireMarkPlacement: c } = n;
    return c !== void 0 ? c : (e == null ? void 0 : e.props.requireMarkPlacement) || "right";
  }), u = ee(false), f = ee(false), g = F(() => {
    const { validationStatus: c } = n;
    if (c !== void 0) return c;
    if (u.value) return "error";
    if (f.value) return "warning";
  }), p = F(() => {
    const { showFeedback: c } = n;
    return c !== void 0 ? c : (e == null ? void 0 : e.props.showFeedback) !== void 0 ? e.props.showFeedback : true;
  }), O = F(() => {
    const { showLabel: c } = n;
    return c !== void 0 ? c : (e == null ? void 0 : e.props.showLabel) !== void 0 ? e.props.showLabel : true;
  });
  return { validationErrored: u, validationWarned: f, mergedLabelStyle: o, mergedLabelPlacement: t, mergedLabelAlign: a, mergedShowRequireMark: s, mergedRequireMarkPlacement: l, mergedValidationStatus: g, mergedShowFeedback: p, mergedShowLabel: O, isAutoLabelWidth: r };
}
function Nt(n) {
  const e = se(ye, null), t = F(() => {
    const { rulePath: o } = n;
    if (o !== void 0) return o;
    const { path: s } = n;
    if (s !== void 0) return s;
  }), r = F(() => {
    const o = [], { rule: s } = n;
    if (s !== void 0 && (Array.isArray(s) ? o.push(...s) : o.push(s)), e) {
      const { rules: l } = e.props, { value: u } = t;
      if (l !== void 0 && u !== void 0) {
        const f = Ne(l, u);
        f !== void 0 && (Array.isArray(f) ? o.push(...f) : o.push(f));
      }
    }
    return o;
  }), i = F(() => r.value.some((o) => o.required)), a = F(() => i.value || n.required);
  return { mergedRules: r, mergedRequired: a };
}
var Le = function(n, e, t, r) {
  function i(a) {
    return a instanceof t ? a : new t(function(o) {
      o(a);
    });
  }
  return new (t || (t = Promise))(function(a, o) {
    function s(f) {
      try {
        u(r.next(f));
      } catch (g) {
        o(g);
      }
    }
    function l(f) {
      try {
        u(r.throw(f));
      } catch (g) {
        o(g);
      }
    }
    function u(f) {
      f.done ? a(f.value) : i(f.value).then(s, l);
    }
    u((r = r.apply(n, e || [])).next());
  });
};
const Ht = Object.assign(Object.assign({}, We.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: { type: Boolean, default: void 0 }, requireMarkPlacement: String, showFeedback: { type: Boolean, default: void 0 }, rule: [Object, Array], size: String, ignorePathChange: Boolean, validationStatus: String, feedback: String, feedbackClass: String, feedbackStyle: [String, Object], showLabel: { type: Boolean, default: void 0 }, labelProps: Object, contentClass: String, contentStyle: [String, Object] });
function Ce(n, e) {
  return (...t) => {
    try {
      const r = n(...t);
      return !e && (typeof r == "boolean" || r instanceof Error || Array.isArray(r)) || (r == null ? void 0 : r.then) ? r : (r === void 0 || _e("form-item/validate", `You return a ${typeof r} typed value in the validator method, which is not recommended. Please use ${e ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), true);
    } catch (r) {
      _e("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(r);
      return;
    }
  };
}
const Yt = Ke({ name: "FormItem", props: Ht, slots: Object, setup(n) {
  tt(at, "formItems", ve(n, "path"));
  const { mergedClsPrefixRef: e, inlineThemeDisabled: t } = Ie(n), r = se(ye, null), i = It(n), a = Wt(n), { validationErrored: o, validationWarned: s } = a, { mergedRequired: l, mergedRules: u } = Nt(n), { mergedSize: f } = i, { mergedLabelPlacement: g, mergedLabelAlign: p, mergedRequireMarkPlacement: O } = a, c = ee([]), m = ee(Oe()), w = ee(null), d = r ? ve(r.props, "disabled") : ee(false), L = We("Form", "-form-item", Tt, it, n, e);
  Ve(ve(n, "path"), () => {
    n.ignorePathChange || b();
  });
  function h() {
    if (!a.isAutoLabelWidth.value) return;
    const x = w.value;
    if (x !== null) {
      const E = x.style.whiteSpace;
      x.style.whiteSpace = "nowrap", x.style.width = "", r == null ? void 0 : r.deriveMaxChildLabelWidth(Number(getComputedStyle(x).width.slice(0, -2))), x.style.whiteSpace = E;
    }
  }
  function b() {
    c.value = [], o.value = false, s.value = false, n.feedback && (m.value = Oe());
  }
  const R = (...x) => Le(this, [...x], void 0, function* (E = null, I = () => true, _ = { suppressWarning: true }) {
    const { path: W } = n;
    _ ? _.first || (_.first = n.first) : _ = {};
    const { value: Y } = u, J = r ? Ne(r.props.model, W || "") : void 0, Z = {}, G = {}, H = (E ? Y.filter((y) => Array.isArray(y.trigger) ? y.trigger.includes(E) : y.trigger === E) : Y).filter(I).map((y, A) => {
      const k = Object.assign({}, y);
      if (k.validator && (k.validator = Ce(k.validator, false)), k.asyncValidator && (k.asyncValidator = Ce(k.asyncValidator, true)), k.renderMessage) {
        const ge = `__renderMessage__${A}`;
        G[ge] = k.message, k.message = ge, Z[ge] = k.renderMessage;
      }
      return k;
    }), B = H.filter((y) => y.level !== "warning"), de = H.filter((y) => y.level === "warning"), M = { valid: true, errors: void 0, warnings: void 0 };
    if (!H.length) return M;
    const Q = W ?? "__n_no_path__", ue = new te({ [Q]: B }), ce = new te({ [Q]: de }), { validateMessages: re } = (r == null ? void 0 : r.props) || {};
    re && (ue.messages(re), ce.messages(re));
    const me = (y) => {
      c.value = y.map((A) => {
        const k = (A == null ? void 0 : A.message) || "";
        return { key: k, render: () => k.startsWith("__renderMessage__") ? Z[k]() : k };
      }), y.forEach((A) => {
        var k;
        !((k = A.message) === null || k === void 0) && k.startsWith("__renderMessage__") && (A.message = G[A.message]);
      });
    };
    if (B.length) {
      const y = yield new Promise((A) => {
        ue.validate({ [Q]: J }, _, A);
      });
      (y == null ? void 0 : y.length) && (M.valid = false, M.errors = y, me(y));
    }
    if (de.length && !M.errors) {
      const y = yield new Promise((A) => {
        ce.validate({ [Q]: J }, _, A);
      });
      (y == null ? void 0 : y.length) && (me(y), M.warnings = y);
    }
    return !M.errors && !M.warnings ? b() : (o.value = !!M.errors, s.value = !!M.warnings), M;
  });
  function S() {
    R("blur");
  }
  function T() {
    R("change");
  }
  function C() {
    R("focus");
  }
  function U() {
    R("input");
  }
  function le(x, E) {
    return Le(this, void 0, void 0, function* () {
      let I, _, W, Y;
      return typeof x == "string" ? (I = x, _ = E) : x !== null && typeof x == "object" && (I = x.trigger, _ = x.callback, W = x.shouldRuleBeApplied, Y = x.options), yield new Promise((J, Z) => {
        R(I, W, Y).then(({ valid: G, errors: H, warnings: B }) => {
          G ? (_ && _(void 0, { warnings: B }), J({ warnings: B })) : (_ && _(H, { warnings: B }), Z(H));
        });
      });
    });
  }
  Qe(et, { path: ve(n, "path"), disabled: d, mergedSize: i.mergedSize, mergedValidationStatus: a.mergedValidationStatus, restoreValidation: b, handleContentBlur: S, handleContentChange: T, handleContentFocus: C, handleContentInput: U });
  const fe = { validate: le, restoreValidation: b, internalValidate: R, invalidateLabelWidth: h };
  Ze(h);
  const z = F(() => {
    var x;
    const { value: E } = f, { value: I } = g, _ = I === "top" ? "vertical" : "horizontal", { common: { cubicBezierEaseInOut: W }, self: { labelTextColor: Y, asteriskColor: J, lineHeight: Z, feedbackTextColor: G, feedbackTextColorWarning: H, feedbackTextColorError: B, feedbackPadding: de, labelFontWeight: M, [D("labelHeight", E)]: Q, [D("blankHeight", E)]: ue, [D("feedbackFontSize", E)]: ce, [D("feedbackHeight", E)]: re, [D("labelPadding", _)]: me, [D("labelTextAlign", _)]: y, [D(D("labelFontSize", I), E)]: A } } = L.value;
    let k = (x = p.value) !== null && x !== void 0 ? x : y;
    return I === "top" && (k = k === "right" ? "flex-end" : "flex-start"), { "--n-bezier": W, "--n-line-height": Z, "--n-blank-height": ue, "--n-label-font-size": A, "--n-label-text-align": k, "--n-label-height": Q, "--n-label-padding": me, "--n-label-font-weight": M, "--n-asterisk-color": J, "--n-label-text-color": Y, "--n-feedback-padding": de, "--n-feedback-font-size": ce, "--n-feedback-height": re, "--n-feedback-text-color": G, "--n-feedback-text-color-warning": H, "--n-feedback-text-color-error": B };
  }), P = t ? Ge("form-item", F(() => {
    var x;
    return `${f.value[0]}${g.value[0]}${((x = p.value) === null || x === void 0 ? void 0 : x[0]) || ""}`;
  }), z, n) : void 0, xe = F(() => g.value === "left" && O.value === "left" && p.value === "left");
  return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef: w, mergedClsPrefix: e, mergedRequired: l, feedbackId: m, renderExplains: c, reverseColSpace: xe }, a), i), fe), { cssVars: t ? void 0 : z, themeClass: P == null ? void 0 : P.themeClass, onRender: P == null ? void 0 : P.onRender });
}, render() {
  const { $slots: n, mergedClsPrefix: e, mergedShowLabel: t, mergedShowRequireMark: r, mergedRequireMarkPlacement: i, onRender: a } = this, o = r !== void 0 ? r : this.mergedRequired;
  a == null ? void 0 : a();
  const s = () => {
    const l = this.$slots.label ? this.$slots.label() : this.label;
    if (!l) return null;
    const u = $("span", { class: `${e}-form-item-label__text` }, l), f = o ? $("span", { class: `${e}-form-item-label__asterisk` }, i !== "left" ? "\xA0*" : "*\xA0") : i === "right-hanging" && $("span", { class: `${e}-form-item-label__asterisk-placeholder` }, "\xA0*"), { labelProps: g } = this;
    return $("label", Object.assign({}, g, { class: [g == null ? void 0 : g.class, `${e}-form-item-label`, `${e}-form-item-label--${i}-mark`, this.reverseColSpace && `${e}-form-item-label--reverse-columns-space`], style: this.mergedLabelStyle, ref: "labelElementRef" }), i === "left" ? [f, u] : [u, f]);
  };
  return $("div", { class: [`${e}-form-item`, this.themeClass, `${e}-form-item--${this.mergedSize}-size`, `${e}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${e}-form-item--auto-label-width`, !t && `${e}-form-item--no-label`], style: this.cssVars }, t && s(), $("div", { class: [`${e}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${e}-form-item-blank--${this.mergedValidationStatus}`], style: this.contentStyle }, n), this.mergedShowFeedback ? $("div", { key: this.feedbackId, style: this.feedbackStyle, class: [`${e}-form-item-feedback-wrapper`, this.feedbackClass] }, $(Je, { name: "fade-down-transition", mode: "out-in" }, { default: () => {
    const { mergedValidationStatus: l } = this;
    return Xe(n.feedback, (u) => {
      var f;
      const { feedback: g } = this, p = u || g ? $("div", { key: "__feedback__", class: `${e}-form-item-feedback__line` }, u || g) : this.renderExplains.length ? (f = this.renderExplains) === null || f === void 0 ? void 0 : f.map(({ key: O, render: c }) => $("div", { key: O, class: `${e}-form-item-feedback__line` }, c())) : null;
      return p ? l === "warning" ? $("div", { key: "controlled-warning", class: `${e}-form-item-feedback ${e}-form-item-feedback--warning` }, p) : l === "error" ? $("div", { key: "controlled-error", class: `${e}-form-item-feedback ${e}-form-item-feedback--error` }, p) : l === "success" ? $("div", { key: "controlled-success", class: `${e}-form-item-feedback ${e}-form-item-feedback--success` }, p) : $("div", { key: "controlled-default", class: `${e}-form-item-feedback` }, p) : null;
    });
  } })) : null);
} });
export {
  Yt as _,
  ye as a,
  at as b,
  it as f
};
