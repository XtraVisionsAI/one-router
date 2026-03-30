var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { u as Ir, _ as Vr } from "./useApi-C-MENBV9.js";
import { aG as da, j as o, ai as Qa, i as On, r as _, au as wn, a as y, w as dt, d as Qe, ar as ut, o as Xa, T as ca, aq as fa, ax as ha, aH as Nr, e as V, f as j, g as B, h as me, H as Et, $ as Dn, k as Ka, l as Fn, aI as zr, m as kn, aw as Za, t as Ue, a8 as Ga, R as Hr, aJ as Er, ao as Br, J as _a, n as zn, z as Hn, y as ot, v as ze, D as En, s as He, q as Nt, B as qr, x as Oa, M as jr } from "./index-BKXoSCv0.js";
import { e as Ja, u as Pn, _ as Rt } from "./Input-DKOKpeJJ.js";
import { u as er, B as ma, V as va, e as pa, c as ga, f as tr, j as Ut, k as nr } from "./Dropdown-BC1cSchD.js";
import { V as Gn, F as At, b as Lt, B as Wt, c as Qt, d as Xt, m as Cn, _ as Ur, a as Lr } from "./DataTable-DsJvKjqU.js";
import { r as ar, d as Ve, b as G, u as rr, a as Jn, c as pe } from "./use-form-item-PZPZ68wM.js";
import { X as bt, B as Oe } from "./Button-BG9pNlUY.js";
import { u as Wr } from "./use-message-Diy95wEL.js";
import { _ as Qr } from "./Statistic-CjLScO3w.js";
import "./use-compitable-UGUh8sH4.js";
const ir = 6048e5, Xr = 864e5, Kr = 6e4, Zr = 36e5, Gr = 1e3, Fa = Symbol.for("constructDateFrom");
function oe(n, e) {
  return typeof n == "function" ? n(e) : n && typeof n == "object" && Fa in n ? n[Fa](e) : n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Jt(n, ...e) {
  const a = oe.bind(null, n || e.find((t) => typeof t == "object"));
  return e.map(a);
}
let Jr = {};
function en() {
  return Jr;
}
function P(n, e) {
  return oe(e || n, n);
}
function tt(n, e) {
  var _a2, _b, _c, _d;
  const a = en(), t = (e == null ? void 0 : e.weekStartsOn) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? a.weekStartsOn ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, r = P(n, e == null ? void 0 : e.in), i = r.getDay(), l = (i < t ? 7 : 0) + i - t;
  return r.setDate(r.getDate() - l), r.setHours(0, 0, 0, 0), r;
}
function ei(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +tt(t, a) == +tt(r, a);
}
const Pa = da("date", () => o("svg", { width: "28px", height: "28px", viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, o("g", { "fill-rule": "nonzero" }, o("path", { d: "M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z M23.5,9.503 L4.5,9.503 L4.5,21.75 C4.5,22.7164983 5.28350169,23.5 6.25,23.5 L21.75,23.5 C22.7164983,23.5 23.5,22.7164983 23.5,21.75 L23.5,9.503 Z M21.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,8.003 L23.5,8.003 L23.5,6.25 C23.5,5.28350169 22.7164983,4.5 21.75,4.5 Z" }))))), ti = da("time", () => o("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, o("path", { d: "M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z", style: `
        fill: none;
        stroke: currentColor;
        stroke-miterlimit: 10;
        stroke-width: 32px;
      ` }), o("polyline", { points: "256 128 256 272 352 272", style: `
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      ` }))), ni = da("to", () => o("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, o("g", { fill: "currentColor", "fill-rule": "nonzero" }, o("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" })))));
function qt(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  return isNaN(e) ? oe((a == null ? void 0 : a.in) || n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function Ce(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  if (isNaN(e)) return oe(n, NaN);
  if (!e) return t;
  const r = t.getDate(), i = oe(n, t.getTime());
  i.setMonth(t.getMonth() + e + 1, 0);
  const l = i.getDate();
  return r >= l ? i : (t.setFullYear(i.getFullYear(), i.getMonth(), r), t);
}
function Kt(n, e) {
  return tt(n, { ...e, weekStartsOn: 1 });
}
function or(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = oe(a, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = Kt(r), l = oe(a, 0);
  l.setFullYear(t, 0, 4), l.setHours(0, 0, 0, 0);
  const u = Kt(l);
  return a.getTime() >= i.getTime() ? t + 1 : a.getTime() >= u.getTime() ? t : t - 1;
}
function xn(n) {
  const e = P(n), a = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return a.setUTCFullYear(e.getFullYear()), +n - +a;
}
function Zt(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setHours(0, 0, 0, 0), a;
}
function ai(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e), i = Zt(t), l = Zt(r), u = +i - xn(i), c = +l - xn(l);
  return Math.round((u - c) / Xr);
}
function ri(n, e) {
  const a = or(n, e), t = oe(n, 0);
  return t.setFullYear(a, 0, 4), t.setHours(0, 0, 0, 0), Kt(t);
}
function ii(n, e, a) {
  return Ce(n, e * 3, a);
}
function ea(n, e, a) {
  return Ce(n, e * 12, a);
}
function oi(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +Zt(t) == +Zt(r);
}
function li(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function We(n) {
  return !(!li(n) && typeof n != "number" || isNaN(+P(n)));
}
function si(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return Math.trunc(a.getMonth() / 3) + 1;
}
function mn(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getMonth(), r = t - t % 3;
  return a.setMonth(r, 1), a.setHours(0, 0, 0, 0), a;
}
function ft(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setDate(1), a.setHours(0, 0, 0, 0), a;
}
function vn(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setFullYear(a.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
}
function ui(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return ai(a, vn(a)) + 1;
}
function lr(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = +Kt(a) - +ri(a);
  return Math.round(t / ir) + 1;
}
function ya(n, e) {
  var _a2, _b, _c, _d;
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = en(), i = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d = (_c = r.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = oe((e == null ? void 0 : e.in) || n, 0);
  l.setFullYear(t + 1, 0, i), l.setHours(0, 0, 0, 0);
  const u = tt(l, e), c = oe((e == null ? void 0 : e.in) || n, 0);
  c.setFullYear(t, 0, i), c.setHours(0, 0, 0, 0);
  const f = tt(c, e);
  return +a >= +u ? t + 1 : +a >= +f ? t : t - 1;
}
function di(n, e) {
  var _a2, _b, _c, _d;
  const a = en(), t = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, r = ya(n, e), i = oe((e == null ? void 0 : e.in) || n, 0);
  return i.setFullYear(r, 0, t), i.setHours(0, 0, 0, 0), tt(i, e);
}
function sr(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = +tt(a, e) - +di(a, e);
  return Math.round(t / ir) + 1;
}
function Q(n, e) {
  const a = n < 0 ? "-" : "", t = Math.abs(n).toString().padStart(e, "0");
  return a + t;
}
const gt = { y(n, e) {
  const a = n.getFullYear(), t = a > 0 ? a : 1 - a;
  return Q(e === "yy" ? t % 100 : t, e.length);
}, M(n, e) {
  const a = n.getMonth();
  return e === "M" ? String(a + 1) : Q(a + 1, 2);
}, d(n, e) {
  return Q(n.getDate(), e.length);
}, a(n, e) {
  const a = n.getHours() / 12 >= 1 ? "pm" : "am";
  switch (e) {
    case "a":
    case "aa":
      return a.toUpperCase();
    case "aaa":
      return a;
    case "aaaaa":
      return a[0];
    case "aaaa":
    default:
      return a === "am" ? "a.m." : "p.m.";
  }
}, h(n, e) {
  return Q(n.getHours() % 12 || 12, e.length);
}, H(n, e) {
  return Q(n.getHours(), e.length);
}, m(n, e) {
  return Q(n.getMinutes(), e.length);
}, s(n, e) {
  return Q(n.getSeconds(), e.length);
}, S(n, e) {
  const a = e.length, t = n.getMilliseconds(), r = Math.trunc(t * Math.pow(10, a - 3));
  return Q(r, e.length);
} }, zt = { midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, Ra = { G: function(n, e, a) {
  const t = n.getFullYear() > 0 ? 1 : 0;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      return a.era(t, { width: "abbreviated" });
    case "GGGGG":
      return a.era(t, { width: "narrow" });
    case "GGGG":
    default:
      return a.era(t, { width: "wide" });
  }
}, y: function(n, e, a) {
  if (e === "yo") {
    const t = n.getFullYear(), r = t > 0 ? t : 1 - t;
    return a.ordinalNumber(r, { unit: "year" });
  }
  return gt.y(n, e);
}, Y: function(n, e, a, t) {
  const r = ya(n, t), i = r > 0 ? r : 1 - r;
  if (e === "YY") {
    const l = i % 100;
    return Q(l, 2);
  }
  return e === "Yo" ? a.ordinalNumber(i, { unit: "year" }) : Q(i, e.length);
}, R: function(n, e) {
  const a = or(n);
  return Q(a, e.length);
}, u: function(n, e) {
  const a = n.getFullYear();
  return Q(a, e.length);
}, Q: function(n, e, a) {
  const t = Math.ceil((n.getMonth() + 1) / 3);
  switch (e) {
    case "Q":
      return String(t);
    case "QQ":
      return Q(t, 2);
    case "Qo":
      return a.ordinalNumber(t, { unit: "quarter" });
    case "QQQ":
      return a.quarter(t, { width: "abbreviated", context: "formatting" });
    case "QQQQQ":
      return a.quarter(t, { width: "narrow", context: "formatting" });
    case "QQQQ":
    default:
      return a.quarter(t, { width: "wide", context: "formatting" });
  }
}, q: function(n, e, a) {
  const t = Math.ceil((n.getMonth() + 1) / 3);
  switch (e) {
    case "q":
      return String(t);
    case "qq":
      return Q(t, 2);
    case "qo":
      return a.ordinalNumber(t, { unit: "quarter" });
    case "qqq":
      return a.quarter(t, { width: "abbreviated", context: "standalone" });
    case "qqqqq":
      return a.quarter(t, { width: "narrow", context: "standalone" });
    case "qqqq":
    default:
      return a.quarter(t, { width: "wide", context: "standalone" });
  }
}, M: function(n, e, a) {
  const t = n.getMonth();
  switch (e) {
    case "M":
    case "MM":
      return gt.M(n, e);
    case "Mo":
      return a.ordinalNumber(t + 1, { unit: "month" });
    case "MMM":
      return a.month(t, { width: "abbreviated", context: "formatting" });
    case "MMMMM":
      return a.month(t, { width: "narrow", context: "formatting" });
    case "MMMM":
    default:
      return a.month(t, { width: "wide", context: "formatting" });
  }
}, L: function(n, e, a) {
  const t = n.getMonth();
  switch (e) {
    case "L":
      return String(t + 1);
    case "LL":
      return Q(t + 1, 2);
    case "Lo":
      return a.ordinalNumber(t + 1, { unit: "month" });
    case "LLL":
      return a.month(t, { width: "abbreviated", context: "standalone" });
    case "LLLLL":
      return a.month(t, { width: "narrow", context: "standalone" });
    case "LLLL":
    default:
      return a.month(t, { width: "wide", context: "standalone" });
  }
}, w: function(n, e, a, t) {
  const r = sr(n, t);
  return e === "wo" ? a.ordinalNumber(r, { unit: "week" }) : Q(r, e.length);
}, I: function(n, e, a) {
  const t = lr(n);
  return e === "Io" ? a.ordinalNumber(t, { unit: "week" }) : Q(t, e.length);
}, d: function(n, e, a) {
  return e === "do" ? a.ordinalNumber(n.getDate(), { unit: "date" }) : gt.d(n, e);
}, D: function(n, e, a) {
  const t = ui(n);
  return e === "Do" ? a.ordinalNumber(t, { unit: "dayOfYear" }) : Q(t, e.length);
}, E: function(n, e, a) {
  const t = n.getDay();
  switch (e) {
    case "E":
    case "EE":
    case "EEE":
      return a.day(t, { width: "abbreviated", context: "formatting" });
    case "EEEEE":
      return a.day(t, { width: "narrow", context: "formatting" });
    case "EEEEEE":
      return a.day(t, { width: "short", context: "formatting" });
    case "EEEE":
    default:
      return a.day(t, { width: "wide", context: "formatting" });
  }
}, e: function(n, e, a, t) {
  const r = n.getDay(), i = (r - t.weekStartsOn + 8) % 7 || 7;
  switch (e) {
    case "e":
      return String(i);
    case "ee":
      return Q(i, 2);
    case "eo":
      return a.ordinalNumber(i, { unit: "day" });
    case "eee":
      return a.day(r, { width: "abbreviated", context: "formatting" });
    case "eeeee":
      return a.day(r, { width: "narrow", context: "formatting" });
    case "eeeeee":
      return a.day(r, { width: "short", context: "formatting" });
    case "eeee":
    default:
      return a.day(r, { width: "wide", context: "formatting" });
  }
}, c: function(n, e, a, t) {
  const r = n.getDay(), i = (r - t.weekStartsOn + 8) % 7 || 7;
  switch (e) {
    case "c":
      return String(i);
    case "cc":
      return Q(i, e.length);
    case "co":
      return a.ordinalNumber(i, { unit: "day" });
    case "ccc":
      return a.day(r, { width: "abbreviated", context: "standalone" });
    case "ccccc":
      return a.day(r, { width: "narrow", context: "standalone" });
    case "cccccc":
      return a.day(r, { width: "short", context: "standalone" });
    case "cccc":
    default:
      return a.day(r, { width: "wide", context: "standalone" });
  }
}, i: function(n, e, a) {
  const t = n.getDay(), r = t === 0 ? 7 : t;
  switch (e) {
    case "i":
      return String(r);
    case "ii":
      return Q(r, e.length);
    case "io":
      return a.ordinalNumber(r, { unit: "day" });
    case "iii":
      return a.day(t, { width: "abbreviated", context: "formatting" });
    case "iiiii":
      return a.day(t, { width: "narrow", context: "formatting" });
    case "iiiiii":
      return a.day(t, { width: "short", context: "formatting" });
    case "iiii":
    default:
      return a.day(t, { width: "wide", context: "formatting" });
  }
}, a: function(n, e, a) {
  const r = n.getHours() / 12 >= 1 ? "pm" : "am";
  switch (e) {
    case "a":
    case "aa":
      return a.dayPeriod(r, { width: "abbreviated", context: "formatting" });
    case "aaa":
      return a.dayPeriod(r, { width: "abbreviated", context: "formatting" }).toLowerCase();
    case "aaaaa":
      return a.dayPeriod(r, { width: "narrow", context: "formatting" });
    case "aaaa":
    default:
      return a.dayPeriod(r, { width: "wide", context: "formatting" });
  }
}, b: function(n, e, a) {
  const t = n.getHours();
  let r;
  switch (t === 12 ? r = zt.noon : t === 0 ? r = zt.midnight : r = t / 12 >= 1 ? "pm" : "am", e) {
    case "b":
    case "bb":
      return a.dayPeriod(r, { width: "abbreviated", context: "formatting" });
    case "bbb":
      return a.dayPeriod(r, { width: "abbreviated", context: "formatting" }).toLowerCase();
    case "bbbbb":
      return a.dayPeriod(r, { width: "narrow", context: "formatting" });
    case "bbbb":
    default:
      return a.dayPeriod(r, { width: "wide", context: "formatting" });
  }
}, B: function(n, e, a) {
  const t = n.getHours();
  let r;
  switch (t >= 17 ? r = zt.evening : t >= 12 ? r = zt.afternoon : t >= 4 ? r = zt.morning : r = zt.night, e) {
    case "B":
    case "BB":
    case "BBB":
      return a.dayPeriod(r, { width: "abbreviated", context: "formatting" });
    case "BBBBB":
      return a.dayPeriod(r, { width: "narrow", context: "formatting" });
    case "BBBB":
    default:
      return a.dayPeriod(r, { width: "wide", context: "formatting" });
  }
}, h: function(n, e, a) {
  if (e === "ho") {
    let t = n.getHours() % 12;
    return t === 0 && (t = 12), a.ordinalNumber(t, { unit: "hour" });
  }
  return gt.h(n, e);
}, H: function(n, e, a) {
  return e === "Ho" ? a.ordinalNumber(n.getHours(), { unit: "hour" }) : gt.H(n, e);
}, K: function(n, e, a) {
  const t = n.getHours() % 12;
  return e === "Ko" ? a.ordinalNumber(t, { unit: "hour" }) : Q(t, e.length);
}, k: function(n, e, a) {
  let t = n.getHours();
  return t === 0 && (t = 24), e === "ko" ? a.ordinalNumber(t, { unit: "hour" }) : Q(t, e.length);
}, m: function(n, e, a) {
  return e === "mo" ? a.ordinalNumber(n.getMinutes(), { unit: "minute" }) : gt.m(n, e);
}, s: function(n, e, a) {
  return e === "so" ? a.ordinalNumber(n.getSeconds(), { unit: "second" }) : gt.s(n, e);
}, S: function(n, e) {
  return gt.S(n, e);
}, X: function(n, e, a) {
  const t = n.getTimezoneOffset();
  if (t === 0) return "Z";
  switch (e) {
    case "X":
      return Aa(t);
    case "XXXX":
    case "XX":
      return Pt(t);
    case "XXXXX":
    case "XXX":
    default:
      return Pt(t, ":");
  }
}, x: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "x":
      return Aa(t);
    case "xxxx":
    case "xx":
      return Pt(t);
    case "xxxxx":
    case "xxx":
    default:
      return Pt(t, ":");
  }
}, O: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + Ya(t, ":");
    case "OOOO":
    default:
      return "GMT" + Pt(t, ":");
  }
}, z: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "z":
    case "zz":
    case "zzz":
      return "GMT" + Ya(t, ":");
    case "zzzz":
    default:
      return "GMT" + Pt(t, ":");
  }
}, t: function(n, e, a) {
  const t = Math.trunc(+n / 1e3);
  return Q(t, e.length);
}, T: function(n, e, a) {
  return Q(+n, e.length);
} };
function Ya(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.trunc(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + Q(i, 2);
}
function Aa(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + Q(Math.abs(n) / 60, 2) : Pt(n, e);
}
function Pt(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Q(Math.trunc(t / 60), 2), i = Q(t % 60, 2);
  return a + r + e + i;
}
const $a = (n, e) => {
  switch (n) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, ur = (n, e) => {
  switch (n) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, ci = (n, e) => {
  const a = n.match(/(P+)(p+)?/) || [], t = a[1], r = a[2];
  if (!r) return $a(n, e);
  let i;
  switch (t) {
    case "P":
      i = e.dateTime({ width: "short" });
      break;
    case "PP":
      i = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = e.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", $a(t, e)).replace("{{time}}", ur(r, e));
}, ta = { p: ur, P: ci }, fi = /^D+$/, hi = /^Y+$/, mi = ["D", "DD", "YY", "YYYY"];
function dr(n) {
  return fi.test(n);
}
function cr(n) {
  return hi.test(n);
}
function na(n, e, a) {
  const t = vi(n, e, a);
  if (console.warn(t), mi.includes(n)) throw new RangeError(t);
}
function vi(n, e, a) {
  const t = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${t} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const pi = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, gi = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, yi = /^'([^]*?)'?$/, bi = /''/g, wi = /[a-zA-Z]/;
function X(n, e, a) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const t = en(), r = (a == null ? void 0 : a.locale) ?? t.locale ?? Ja, i = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = (a == null ? void 0 : a.weekStartsOn) ?? ((_f = (_e = a == null ? void 0 : a.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? t.weekStartsOn ?? ((_h = (_g = t.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0, u = P(n, a == null ? void 0 : a.in);
  if (!We(u)) throw new RangeError("Invalid time value");
  let c = e.match(gi).map((m) => {
    const p = m[0];
    if (p === "p" || p === "P") {
      const g = ta[p];
      return g(m, r.formatLong);
    }
    return m;
  }).join("").match(pi).map((m) => {
    if (m === "''") return { isToken: false, value: "'" };
    const p = m[0];
    if (p === "'") return { isToken: false, value: Di(m) };
    if (Ra[p]) return { isToken: true, value: m };
    if (p.match(wi)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + p + "`");
    return { isToken: false, value: m };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(u, c));
  const f = { firstWeekContainsDate: i, weekStartsOn: l, locale: r };
  return c.map((m) => {
    if (!m.isToken) return m.value;
    const p = m.value;
    (!(a == null ? void 0 : a.useAdditionalWeekYearTokens) && cr(p) || !(a == null ? void 0 : a.useAdditionalDayOfYearTokens) && dr(p)) && na(p, e, String(n));
    const g = Ra[p[0]];
    return g(u, p, r.localize, f);
  }).join("");
}
function Di(n) {
  const e = n.match(yi);
  return e ? e[1].replace(bi, "'") : n;
}
function Le(n, e) {
  return P(n, e == null ? void 0 : e.in).getDate();
}
function ki(n, e) {
  return P(n, e == null ? void 0 : e.in).getDay();
}
function Ci(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = a.getMonth(), i = oe(a, 0);
  return i.setFullYear(t, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function fr() {
  return Object.assign({}, en());
}
function yt(n, e) {
  return P(n, e == null ? void 0 : e.in).getHours();
}
function xi(n, e) {
  const a = P(n, e == null ? void 0 : e.in).getDay();
  return a === 0 ? 7 : a;
}
function Si(n) {
  return P(n).getMilliseconds();
}
function Sn(n, e) {
  return P(n, e == null ? void 0 : e.in).getMinutes();
}
function te(n, e) {
  return P(n, e == null ? void 0 : e.in).getMonth();
}
function Mn(n) {
  return P(n).getSeconds();
}
function D(n) {
  return +P(n);
}
function ie(n, e) {
  return P(n, e == null ? void 0 : e.in).getFullYear();
}
function Mi(n, e) {
  const a = Ti(e) ? new e(0) : oe(e, 0);
  return a.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), a.setHours(n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()), a;
}
function Ti(n) {
  var _a2;
  return typeof n == "function" && ((_a2 = n.prototype) == null ? void 0 : _a2.constructor) === n;
}
const _i = 10;
class hr {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(e, a) {
    return true;
  }
}
class Oi extends hr {
  constructor(e, a, t, r, i) {
    super(), this.value = e, this.validateValue = a, this.setValue = t, this.priority = r, i && (this.subPriority = i);
  }
  validate(e, a) {
    return this.validateValue(e, this.value, a);
  }
  set(e, a, t) {
    return this.setValue(e, a, this.value, t);
  }
}
class Fi extends hr {
  constructor(e, a) {
    super();
    __publicField(this, "priority", _i);
    __publicField(this, "subPriority", -1);
    this.context = e || ((t) => oe(a, t));
  }
  set(e, a) {
    return a.timestampIsSet ? e : oe(e, Mi(e, this.context));
  }
}
class U {
  run(e, a, t, r) {
    const i = this.parse(e, a, t, r);
    return i ? { setter: new Oi(i.value, this.validate, this.set, this.priority, this.subPriority), rest: i.rest } : null;
  }
  validate(e, a, t) {
    return true;
  }
}
class Pi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 140);
    __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "G":
      case "GG":
      case "GGG":
        return t.era(e, { width: "abbreviated" }) || t.era(e, { width: "narrow" });
      case "GGGGG":
        return t.era(e, { width: "narrow" });
      case "GGGG":
      default:
        return t.era(e, { width: "wide" }) || t.era(e, { width: "abbreviated" }) || t.era(e, { width: "narrow" });
    }
  }
  set(e, a, t) {
    return a.era = t, e.setFullYear(t, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const ce = { month: /^(1[0-2]|0?\d)/, date: /^(3[0-1]|[0-2]?\d)/, dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, week: /^(5[0-3]|[0-4]?\d)/, hour23h: /^(2[0-3]|[0-1]?\d)/, hour24h: /^(2[0-4]|[0-1]?\d)/, hour11h: /^(1[0-1]|0?\d)/, hour12h: /^(1[0-2]|0?\d)/, minute: /^[0-5]?\d/, second: /^[0-5]?\d/, singleDigit: /^\d/, twoDigits: /^\d{1,2}/, threeDigits: /^\d{1,3}/, fourDigits: /^\d{1,4}/, anyDigitsSigned: /^-?\d+/, singleDigitSigned: /^-?\d/, twoDigitsSigned: /^-?\d{1,2}/, threeDigitsSigned: /^-?\d{1,3}/, fourDigitsSigned: /^-?\d{1,4}/ }, lt = { basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/, basic: /^([+-])(\d{2})(\d{2})|Z/, basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/, extended: /^([+-])(\d{2}):(\d{2})|Z/, extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/ };
function fe(n, e) {
  return n && { value: e(n.value), rest: n.rest };
}
function le(n, e) {
  const a = e.match(n);
  return a ? { value: parseInt(a[0], 10), rest: e.slice(a[0].length) } : null;
}
function st(n, e) {
  const a = e.match(n);
  if (!a) return null;
  if (a[0] === "Z") return { value: 0, rest: e.slice(1) };
  const t = a[1] === "+" ? 1 : -1, r = a[2] ? parseInt(a[2], 10) : 0, i = a[3] ? parseInt(a[3], 10) : 0, l = a[5] ? parseInt(a[5], 10) : 0;
  return { value: t * (r * Zr + i * Kr + l * Gr), rest: e.slice(a[0].length) };
}
function mr(n) {
  return le(ce.anyDigitsSigned, n);
}
function de(n, e) {
  switch (n) {
    case 1:
      return le(ce.singleDigit, e);
    case 2:
      return le(ce.twoDigits, e);
    case 3:
      return le(ce.threeDigits, e);
    case 4:
      return le(ce.fourDigits, e);
    default:
      return le(new RegExp("^\\d{1," + n + "}"), e);
  }
}
function Tn(n, e) {
  switch (n) {
    case 1:
      return le(ce.singleDigitSigned, e);
    case 2:
      return le(ce.twoDigitsSigned, e);
    case 3:
      return le(ce.threeDigitsSigned, e);
    case 4:
      return le(ce.fourDigitsSigned, e);
    default:
      return le(new RegExp("^-?\\d{1," + n + "}"), e);
  }
}
function ba(n) {
  switch (n) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function vr(n, e) {
  const a = e > 0, t = a ? e : 1 - e;
  let r;
  if (t <= 50) r = n || 100;
  else {
    const i = t + 50, l = Math.trunc(i / 100) * 100, u = n >= i % 100;
    r = n + l - (u ? 100 : 0);
  }
  return a ? r : 1 - r;
}
function pr(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class Ri extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => ({ year: i, isTwoDigitYear: a === "yy" });
    switch (a) {
      case "y":
        return fe(de(4, e), r);
      case "yo":
        return fe(t.ordinalNumber(e, { unit: "year" }), r);
      default:
        return fe(de(a.length, e), r);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, t) {
    const r = e.getFullYear();
    if (t.isTwoDigitYear) {
      const l = vr(t.year, r);
      return e.setFullYear(l, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const i = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(i, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Yi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => ({ year: i, isTwoDigitYear: a === "YY" });
    switch (a) {
      case "Y":
        return fe(de(4, e), r);
      case "Yo":
        return fe(t.ordinalNumber(e, { unit: "year" }), r);
      default:
        return fe(de(a.length, e), r);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, t, r) {
    const i = ya(e, r);
    if (t.isTwoDigitYear) {
      const u = vr(t.year, i);
      return e.setFullYear(u, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), tt(e, r);
    }
    const l = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(l, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), tt(e, r);
  }
}
class Ai extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return Tn(a === "R" ? 4 : a.length, e);
  }
  set(e, a, t) {
    const r = oe(e, 0);
    return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), Kt(r);
  }
}
class $i extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return Tn(a === "u" ? 4 : a.length, e);
  }
  set(e, a, t) {
    return e.setFullYear(t, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Ii extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "Q":
      case "QQ":
        return de(a.length, e);
      case "Qo":
        return t.ordinalNumber(e, { unit: "quarter" });
      case "QQQ":
        return t.quarter(e, { width: "abbreviated", context: "formatting" }) || t.quarter(e, { width: "narrow", context: "formatting" });
      case "QQQQQ":
        return t.quarter(e, { width: "narrow", context: "formatting" });
      case "QQQQ":
      default:
        return t.quarter(e, { width: "wide", context: "formatting" }) || t.quarter(e, { width: "abbreviated", context: "formatting" }) || t.quarter(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 4;
  }
  set(e, a, t) {
    return e.setMonth((t - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Vi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "q":
      case "qq":
        return de(a.length, e);
      case "qo":
        return t.ordinalNumber(e, { unit: "quarter" });
      case "qqq":
        return t.quarter(e, { width: "abbreviated", context: "standalone" }) || t.quarter(e, { width: "narrow", context: "standalone" });
      case "qqqqq":
        return t.quarter(e, { width: "narrow", context: "standalone" });
      case "qqqq":
      default:
        return t.quarter(e, { width: "wide", context: "standalone" }) || t.quarter(e, { width: "abbreviated", context: "standalone" }) || t.quarter(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 4;
  }
  set(e, a, t) {
    return e.setMonth((t - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Ni extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    __publicField(this, "priority", 110);
  }
  parse(e, a, t) {
    const r = (i) => i - 1;
    switch (a) {
      case "M":
        return fe(le(ce.month, e), r);
      case "MM":
        return fe(de(2, e), r);
      case "Mo":
        return fe(t.ordinalNumber(e, { unit: "month" }), r);
      case "MMM":
        return t.month(e, { width: "abbreviated", context: "formatting" }) || t.month(e, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return t.month(e, { width: "narrow", context: "formatting" });
      case "MMMM":
      default:
        return t.month(e, { width: "wide", context: "formatting" }) || t.month(e, { width: "abbreviated", context: "formatting" }) || t.month(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, t) {
    return e.setMonth(t, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class zi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 110);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => i - 1;
    switch (a) {
      case "L":
        return fe(le(ce.month, e), r);
      case "LL":
        return fe(de(2, e), r);
      case "Lo":
        return fe(t.ordinalNumber(e, { unit: "month" }), r);
      case "LLL":
        return t.month(e, { width: "abbreviated", context: "standalone" }) || t.month(e, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return t.month(e, { width: "narrow", context: "standalone" });
      case "LLLL":
      default:
        return t.month(e, { width: "wide", context: "standalone" }) || t.month(e, { width: "abbreviated", context: "standalone" }) || t.month(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, t) {
    return e.setMonth(t, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function Hi(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = sr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), P(t, a == null ? void 0 : a.in);
}
class Ei extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "w":
        return le(ce.week, e);
      case "wo":
        return t.ordinalNumber(e, { unit: "week" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, t, r) {
    return tt(Hi(e, t, r), r);
  }
}
function Bi(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = lr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), t;
}
class qi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "I":
        return le(ce.week, e);
      case "Io":
        return t.ordinalNumber(e, { unit: "week" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, t) {
    return Kt(Bi(e, t));
  }
}
const ji = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ui = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class Li extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subPriority", 1);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "d":
        return le(ce.date, e);
      case "do":
        return t.ordinalNumber(e, { unit: "date" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    const t = e.getFullYear(), r = pr(t), i = e.getMonth();
    return r ? a >= 1 && a <= Ui[i] : a >= 1 && a <= ji[i];
  }
  set(e, a, t) {
    return e.setDate(t), e.setHours(0, 0, 0, 0), e;
  }
}
class Wi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subpriority", 1);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "D":
      case "DD":
        return le(ce.dayOfYear, e);
      case "Do":
        return t.ordinalNumber(e, { unit: "date" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    const t = e.getFullYear();
    return pr(t) ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
  }
  set(e, a, t) {
    return e.setMonth(0, t), e.setHours(0, 0, 0, 0), e;
  }
}
function wa(n, e, a) {
  var _a2, _b, _c, _d;
  const t = en(), r = (a == null ? void 0 : a.weekStartsOn) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? t.weekStartsOn ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, i = P(n, a == null ? void 0 : a.in), l = i.getDay(), c = (e % 7 + 7) % 7, f = 7 - r, m = e < 0 || e > 6 ? e - (l + f) % 7 : (c + f) % 7 - (l + f) % 7;
  return qt(i, m, a);
}
class Qi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "E":
      case "EE":
      case "EEE":
        return t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return t.day(e, { width: "narrow", context: "formatting" });
      case "EEEEEE":
        return t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return t.day(e, { width: "wide", context: "formatting" }) || t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, t, r) {
    return e = wa(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Xi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
  }
  parse(e, a, t, r) {
    const i = (l) => {
      const u = Math.floor((l - 1) / 7) * 7;
      return (l + r.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "e":
      case "ee":
        return fe(de(a.length, e), i);
      case "eo":
        return fe(t.ordinalNumber(e, { unit: "day" }), i);
      case "eee":
        return t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
      case "eeeee":
        return t.day(e, { width: "narrow", context: "formatting" });
      case "eeeeee":
        return t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return t.day(e, { width: "wide", context: "formatting" }) || t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, t, r) {
    return e = wa(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ki extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
  }
  parse(e, a, t, r) {
    const i = (l) => {
      const u = Math.floor((l - 1) / 7) * 7;
      return (l + r.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "c":
      case "cc":
        return fe(de(a.length, e), i);
      case "co":
        return fe(t.ordinalNumber(e, { unit: "day" }), i);
      case "ccc":
        return t.day(e, { width: "abbreviated", context: "standalone" }) || t.day(e, { width: "short", context: "standalone" }) || t.day(e, { width: "narrow", context: "standalone" });
      case "ccccc":
        return t.day(e, { width: "narrow", context: "standalone" });
      case "cccccc":
        return t.day(e, { width: "short", context: "standalone" }) || t.day(e, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return t.day(e, { width: "wide", context: "standalone" }) || t.day(e, { width: "abbreviated", context: "standalone" }) || t.day(e, { width: "short", context: "standalone" }) || t.day(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, t, r) {
    return e = wa(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
function Zi(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = xi(t, a), i = e - r;
  return qt(t, i, a);
}
class Gi extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => i === 0 ? 7 : i;
    switch (a) {
      case "i":
      case "ii":
        return de(a.length, e);
      case "io":
        return t.ordinalNumber(e, { unit: "day" });
      case "iii":
        return fe(t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" }), r);
      case "iiiii":
        return fe(t.day(e, { width: "narrow", context: "formatting" }), r);
      case "iiiiii":
        return fe(t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" }), r);
      case "iiii":
      default:
        return fe(t.day(e, { width: "wide", context: "formatting" }) || t.day(e, { width: "abbreviated", context: "formatting" }) || t.day(e, { width: "short", context: "formatting" }) || t.day(e, { width: "narrow", context: "formatting" }), r);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 7;
  }
  set(e, a, t) {
    return e = Zi(e, t), e.setHours(0, 0, 0, 0), e;
  }
}
class Ji extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "a":
      case "aa":
      case "aaa":
        return t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "aaaaa":
        return t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "aaaa":
      default:
        return t.dayPeriod(e, { width: "wide", context: "formatting" }) || t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
    }
  }
  set(e, a, t) {
    return e.setHours(ba(t), 0, 0, 0), e;
  }
}
class eo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "b":
      case "bb":
      case "bbb":
        return t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "bbbbb":
        return t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "bbbb":
      default:
        return t.dayPeriod(e, { width: "wide", context: "formatting" }) || t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
    }
  }
  set(e, a, t) {
    return e.setHours(ba(t), 0, 0, 0), e;
  }
}
class to extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "BBBBB":
        return t.dayPeriod(e, { width: "narrow", context: "formatting" });
      case "BBBB":
      default:
        return t.dayPeriod(e, { width: "wide", context: "formatting" }) || t.dayPeriod(e, { width: "abbreviated", context: "formatting" }) || t.dayPeriod(e, { width: "narrow", context: "formatting" });
    }
  }
  set(e, a, t) {
    return e.setHours(ba(t), 0, 0, 0), e;
  }
}
class no extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "h":
        return le(ce.hour12h, e);
      case "ho":
        return t.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 12;
  }
  set(e, a, t) {
    const r = e.getHours() >= 12;
    return r && t < 12 ? e.setHours(t + 12, 0, 0, 0) : !r && t === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(t, 0, 0, 0), e;
  }
}
class ao extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "H":
        return le(ce.hour23h, e);
      case "Ho":
        return t.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 23;
  }
  set(e, a, t) {
    return e.setHours(t, 0, 0, 0), e;
  }
}
class ro extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "K":
        return le(ce.hour11h, e);
      case "Ko":
        return t.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, t) {
    return e.getHours() >= 12 && t < 12 ? e.setHours(t + 12, 0, 0, 0) : e.setHours(t, 0, 0, 0), e;
  }
}
class io extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "k":
        return le(ce.hour24h, e);
      case "ko":
        return t.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 24;
  }
  set(e, a, t) {
    const r = t <= 24 ? t % 24 : t;
    return e.setHours(r, 0, 0, 0), e;
  }
}
class oo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 60);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "m":
        return le(ce.minute, e);
      case "mo":
        return t.ordinalNumber(e, { unit: "minute" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, t) {
    return e.setMinutes(t, 0, 0), e;
  }
}
class lo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 50);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "s":
        return le(ce.second, e);
      case "so":
        return t.ordinalNumber(e, { unit: "second" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, t) {
    return e.setSeconds(t, 0), e;
  }
}
class so extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a) {
    const t = (r) => Math.trunc(r * Math.pow(10, -a.length + 3));
    return fe(de(a.length, e), t);
  }
  set(e, a, t) {
    return e.setMilliseconds(t), e;
  }
}
class uo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, a) {
    switch (a) {
      case "X":
        return st(lt.basicOptionalMinutes, e);
      case "XX":
        return st(lt.basic, e);
      case "XXXX":
        return st(lt.basicOptionalSeconds, e);
      case "XXXXX":
        return st(lt.extendedOptionalSeconds, e);
      case "XXX":
      default:
        return st(lt.extended, e);
    }
  }
  set(e, a, t) {
    return a.timestampIsSet ? e : oe(e, e.getTime() - xn(e) - t);
  }
}
class co extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, a) {
    switch (a) {
      case "x":
        return st(lt.basicOptionalMinutes, e);
      case "xx":
        return st(lt.basic, e);
      case "xxxx":
        return st(lt.basicOptionalSeconds, e);
      case "xxxxx":
        return st(lt.extendedOptionalSeconds, e);
      case "xxx":
      default:
        return st(lt.extended, e);
    }
  }
  set(e, a, t) {
    return a.timestampIsSet ? e : oe(e, e.getTime() - xn(e) - t);
  }
}
class fo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return mr(e);
  }
  set(e, a, t) {
    return [oe(e, t * 1e3), { timestampIsSet: true }];
  }
}
class ho extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return mr(e);
  }
  set(e, a, t) {
    return [oe(e, t), { timestampIsSet: true }];
  }
}
const mo = { G: new Pi(), y: new Ri(), Y: new Yi(), R: new Ai(), u: new $i(), Q: new Ii(), q: new Vi(), M: new Ni(), L: new zi(), w: new Ei(), I: new qi(), d: new Li(), D: new Wi(), E: new Qi(), e: new Xi(), c: new Ki(), i: new Gi(), a: new Ji(), b: new eo(), B: new to(), h: new no(), H: new ao(), K: new ro(), k: new io(), m: new oo(), s: new lo(), S: new so(), X: new uo(), x: new co(), t: new fo(), T: new ho() }, vo = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, po = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, go = /^'([^]*?)'?$/, yo = /''/g, bo = /\S/, wo = /[a-zA-Z]/;
function Do(n, e, a, t) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const r = () => oe((t == null ? void 0 : t.in) || a, NaN), i = fr(), l = (t == null ? void 0 : t.locale) ?? i.locale ?? Ja, u = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((_d = (_c = i.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, c = (t == null ? void 0 : t.weekStartsOn) ?? ((_f = (_e = t == null ? void 0 : t.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? i.weekStartsOn ?? ((_h = (_g = i.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (!e) return n ? r() : P(a, t == null ? void 0 : t.in);
  const f = { firstWeekContainsDate: u, weekStartsOn: c, locale: l }, m = [new Fi(t == null ? void 0 : t.in, a)], p = e.match(po).map((M) => {
    const R = M[0];
    if (R in ta) {
      const I = ta[R];
      return I(M, l.formatLong);
    }
    return M;
  }).join("").match(vo), g = [];
  for (let M of p) {
    !(t == null ? void 0 : t.useAdditionalWeekYearTokens) && cr(M) && na(M, e, n), !(t == null ? void 0 : t.useAdditionalDayOfYearTokens) && dr(M) && na(M, e, n);
    const R = M[0], I = mo[R];
    if (I) {
      const { incompatibleTokens: E } = I;
      if (Array.isArray(E)) {
        const O = g.find((Z) => E.includes(Z.token) || Z.token === R);
        if (O) throw new RangeError(`The format string mustn't contain \`${O.fullToken}\` and \`${M}\` at the same time`);
      } else if (I.incompatibleTokens === "*" && g.length > 0) throw new RangeError(`The format string mustn't contain \`${M}\` and any other token at the same time`);
      g.push({ token: R, fullToken: M });
      const L = I.run(n, M, l.match, f);
      if (!L) return r();
      m.push(L.setter), n = L.rest;
    } else {
      if (R.match(wo)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + R + "`");
      if (M === "''" ? M = "'" : R === "'" && (M = ko(M)), n.indexOf(M) === 0) n = n.slice(M.length);
      else return r();
    }
  }
  if (n.length > 0 && bo.test(n)) return r();
  const x = m.map((M) => M.priority).sort((M, R) => R - M).filter((M, R, I) => I.indexOf(M) === R).map((M) => m.filter((R) => R.priority === M).sort((R, I) => I.subPriority - R.subPriority)).map((M) => M[0]);
  let $ = P(a, t == null ? void 0 : t.in);
  if (isNaN(+$)) return r();
  const J = {};
  for (const M of x) {
    if (!M.validate($, f)) return r();
    const R = M.set($, J, f);
    Array.isArray(R) ? ($ = R[0], Object.assign(J, R[1])) : $ = R;
  }
  return $;
}
function ko(n) {
  return n.match(go)[1].replace(yo, "'");
}
function Co(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setMinutes(0, 0, 0), a;
}
function xo(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setSeconds(0, 0), a;
}
function pn(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function gr(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +mn(t) == +mn(r);
}
function Da(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setMilliseconds(0), a;
}
function yr(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear();
}
function ka(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = t.getFullYear(), i = t.getDate(), l = oe(n, 0);
  l.setFullYear(r, e, 15), l.setHours(0, 0, 0, 0);
  const u = Ci(l);
  return t.setMonth(e, Math.min(i, u)), t;
}
function xe(n, e, a) {
  let t = P(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (e.year != null && t.setFullYear(e.year), e.month != null && (t = ka(t, e.month)), e.date != null && t.setDate(e.date), e.hours != null && t.setHours(e.hours), e.minutes != null && t.setMinutes(e.minutes), e.seconds != null && t.setSeconds(e.seconds), e.milliseconds != null && t.setMilliseconds(e.milliseconds), t);
}
function Ft(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  return t.setHours(e), t;
}
function Bn(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  return t.setMinutes(e), t;
}
function So(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = Math.trunc(t.getMonth() / 3) + 1, i = e - r;
  return ka(t, t.getMonth() + i * 3);
}
function qn(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  return t.setSeconds(e), t;
}
function aa(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (t.setFullYear(e), t);
}
const Mo = { date: oi, month: pn, year: yr, quarter: gr };
function To(n) {
  return (e, a) => {
    const t = _o(n);
    return ei(e, a, { weekStartsOn: t });
  };
}
function _o(n) {
  return (n + 1) % 7;
}
function Re(n, e, a, t = 0) {
  return (a === "week" ? To(t) : Mo[a])(n, e);
}
function jn(n, e, a, t, r, i) {
  return r === "date" ? Oo(n, e, a, t) : Fo(n, e, a, t, i);
}
function Oo(n, e, a, t) {
  let r = false, i = false, l = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (r = true), Re(a[0], n, "date") && (i = true), Re(a[1], n, "date") && (l = true));
  const u = a !== null && (Array.isArray(a) ? Re(a[0], n, "date") || Re(a[1], n, "date") : Re(a, n, "date"));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: pn(n, e), isCurrentDate: Re(t, n, "date"), inSpan: r, inSelectedWeek: false, startOfSpan: i, endOfSpan: l, selected: u, ts: D(n) };
}
function br(n, e, a) {
  const t = new Date(2e3, n, 1).getTime();
  return X(t, e, { locale: a });
}
function wr(n, e, a) {
  const t = new Date(n, 1, 1).getTime();
  return X(t, e, { locale: a });
}
function Dr(n, e, a) {
  const t = new Date(2e3, n * 3 - 2, 1).getTime();
  return X(t, e, { locale: a });
}
function Fo(n, e, a, t, r) {
  let i = false, l = false, u = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (i = true), Re(a[0], n, "week", r) && (l = true), Re(a[1], n, "week", r) && (u = true));
  const c = a !== null && (Array.isArray(a) ? Re(a[0], n, "week", r) || Re(a[1], n, "week", r) : Re(a, n, "week", r));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: pn(n, e), isCurrentDate: Re(t, n, "date"), inSpan: i, startOfSpan: l, endOfSpan: u, selected: false, inSelectedWeek: c, ts: D(n) };
}
function Po(n, e, a, { monthFormat: t }) {
  return { type: "month", monthFormat: t, dateObject: { month: te(n), year: ie(n) }, isCurrent: pn(a, n), selected: e !== null && Re(e, n, "month"), ts: D(n) };
}
function Ro(n, e, a, { yearFormat: t }) {
  return { type: "year", yearFormat: t, dateObject: { year: ie(n) }, isCurrent: yr(a, n), selected: e !== null && Re(e, n, "year"), ts: D(n) };
}
function Yo(n, e, a, { quarterFormat: t }) {
  return { type: "quarter", quarterFormat: t, dateObject: { quarter: si(n), year: ie(n) }, isCurrent: gr(a, n), selected: e !== null && Re(e, n, "quarter"), ts: D(n) };
}
function ra(n, e, a, t, r = false, i = false) {
  const l = i ? "week" : "date", u = te(n);
  let c = D(ft(n)), f = D(qt(c, -1));
  const m = [];
  let p = !r;
  for (; ki(f) !== t || p; ) m.unshift(jn(f, n, e, a, l, t)), f = D(qt(f, -1)), p = false;
  for (; te(c) === u; ) m.push(jn(c, n, e, a, l, t)), c = D(qt(c, 1));
  const g = r ? m.length <= 28 ? 28 : m.length <= 35 ? 35 : 42 : 42;
  for (; m.length < g; ) m.push(jn(c, n, e, a, l, t)), c = D(qt(c, 1));
  return m;
}
function ia(n, e, a, t) {
  const r = [], i = vn(n);
  for (let l = 0; l < 12; l++) r.push(Po(D(Ce(i, l)), e, a, t));
  return r;
}
function oa(n, e, a, t) {
  const r = [], i = vn(n);
  for (let l = 0; l < 4; l++) r.push(Yo(D(ii(i, l)), e, a, t));
  return r;
}
function la(n, e, a, t) {
  const r = t.value, i = [], l = vn(aa(/* @__PURE__ */ new Date(), r[0]));
  for (let u = 0; u < r[1] - r[0]; u++) i.push(Ro(D(ea(l, u)), n, e, a));
  return i;
}
function Ie(n, e, a, t) {
  const r = Do(n, e, a, t);
  return We(r) ? X(r, e, t) === n ? r : new Date(Number.NaN) : r;
}
function Ao(n, e) {
  const a = e(n);
  return jt(a);
}
function Ia(n, e, a, t) {
  const r = e(n, a, t);
  return jt(r);
}
function jt(n) {
  if (n === void 0) return;
  if (typeof n == "number") return n;
  const [e, a, t] = n.split(":");
  return { hours: Number(e), minutes: Number(a), seconds: Number(t) };
}
function Ht(n, e) {
  return Array.isArray(n) ? n[e === "start" ? 0 : 1] : null;
}
const Rn = Qa("n-date-picker"), Yt = 40, $o = "HH:mm:ss", kr = { active: Boolean, dateFormat: String, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, required: true }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, timePickerFormat: { type: String, value: $o }, value: { type: [Array, Number], default: null }, shortcuts: Object, defaultTime: [Number, String, Array, Function], inputReadonly: Boolean, onClear: Function, onConfirm: Function, onClose: Function, onTabOut: Function, onKeydown: Function, actions: Array, onSelectYear: Function, onSelectMonth: Function, onUpdateValue: { type: Function, required: true }, themeClass: String, onRender: Function, panel: Boolean, onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function };
function Cr(n) {
  const { dateLocaleRef: e, timePickerSizeRef: a, timePickerPropsRef: t, localeRef: r, mergedClsPrefixRef: i, mergedThemeRef: l } = On(Rn), u = y(() => ({ locale: e.value.locale })), c = _(null), f = er();
  function m() {
    const { onClear: N } = n;
    N && N();
  }
  function p() {
    const { onConfirm: N, value: C } = n;
    N && N(C);
  }
  function g(N, C) {
    const { onUpdateValue: De } = n;
    De(N, C);
  }
  function x(N = false) {
    const { onClose: C } = n;
    C && C(N);
  }
  function $() {
    const { onTabOut: N } = n;
    N && N();
  }
  function J() {
    g(null, true), x(true), m();
  }
  function M() {
    $();
  }
  function R() {
    (n.active || n.panel) && wn(() => {
      const { value: N } = c;
      if (!N) return;
      const C = N.querySelectorAll("[data-n-date]");
      C.forEach((De) => {
        De.classList.add("transition-disabled");
      }), N.offsetWidth, C.forEach((De) => {
        De.classList.remove("transition-disabled");
      });
    });
  }
  function I(N) {
    N.key === "Tab" && N.target === c.value && f.shift && (N.preventDefault(), $());
  }
  function E(N) {
    const { value: C } = c;
    f.tab && N.target === C && (C == null ? void 0 : C.contains(N.relatedTarget)) && $();
  }
  let L = null, O = false;
  function Z() {
    L = n.value, O = true;
  }
  function q() {
    O = false;
  }
  function be() {
    O && (g(L, false), O = false);
  }
  function Xe(N) {
    return typeof N == "function" ? N() : N;
  }
  const ae = _(false);
  function we() {
    ae.value = !ae.value;
  }
  return { mergedTheme: l, mergedClsPrefix: i, dateFnsOptions: u, timePickerSize: a, timePickerProps: t, selfRef: c, locale: r, doConfirm: p, doClose: x, doUpdateValue: g, doTabOut: $, handleClearClick: J, handleFocusDetectorFocus: M, disableTransitionOneTick: R, handlePanelKeyDown: I, handlePanelFocus: E, cachePendingValue: Z, clearPendingValue: q, restorePendingValue: be, getShortcutValue: Xe, handleShortcutMouseleave: be, showMonthYearPanel: ae, handleOpenQuickSelectMonthPanel: we };
}
const Ca = Object.assign(Object.assign({}, kr), { defaultCalendarStartTime: Number, actions: { type: Array, default: () => ["now", "clear", "confirm"] } });
function xa(n, e) {
  var a;
  const t = Cr(n), { isValueInvalidRef: r, isDateDisabledRef: i, isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: c, isHourDisabledRef: f, isMinuteDisabledRef: m, isSecondDisabledRef: p, localeRef: g, firstDayOfWeekRef: x, datePickerSlots: $, yearFormatRef: J, monthFormatRef: M, quarterFormatRef: R, yearRangeRef: I } = On(Rn), E = { isValueInvalid: r, isDateDisabled: i, isDateInvalid: l, isTimeInvalid: u, isDateTimeInvalid: c, isHourDisabled: f, isMinuteDisabled: m, isSecondDisabled: p }, L = y(() => n.dateFormat || g.value.dateFormat), O = y(() => n.calendarDayFormat || g.value.dayFormat), Z = _(n.value === null || Array.isArray(n.value) ? "" : X(n.value, L.value)), q = _(n.value === null || Array.isArray(n.value) ? (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Date.now() : n.value), be = _(null), Xe = _(null), ae = _(null), we = _(Date.now()), N = y(() => {
    var v;
    return ra(q.value, n.value, we.value, (v = x.value) !== null && v !== void 0 ? v : g.value.firstDayOfWeek, false, e === "week");
  }), C = y(() => {
    const { value: v } = n;
    return ia(q.value, Array.isArray(v) ? null : v, we.value, { monthFormat: M.value });
  }), De = y(() => {
    const { value: v } = n;
    return la(Array.isArray(v) ? null : v, we.value, { yearFormat: J.value }, I);
  }), Ke = y(() => {
    const { value: v } = n;
    return oa(q.value, Array.isArray(v) ? null : v, we.value, { quarterFormat: R.value });
  }), Ee = y(() => N.value.slice(0, 7).map((v) => {
    const { ts: F } = v;
    return X(F, O.value, t.dateFnsOptions.value);
  })), Ze = y(() => X(q.value, n.calendarHeaderMonthFormat || g.value.monthFormat, t.dateFnsOptions.value)), Ge = y(() => X(q.value, n.calendarHeaderYearFormat || g.value.yearFormat, t.dateFnsOptions.value)), Be = y(() => {
    var v;
    return (v = n.calendarHeaderMonthBeforeYear) !== null && v !== void 0 ? v : g.value.monthBeforeYear;
  });
  dt(q, (v, F) => {
    (e === "date" || e === "datetime") && (pn(v, F) || t.disableTransitionOneTick());
  }), dt(y(() => n.value), (v) => {
    v !== null && !Array.isArray(v) ? (Z.value = X(v, L.value, t.dateFnsOptions.value), q.value = v) : Z.value = "";
  });
  function Se(v) {
    var F;
    if (e === "datetime") return D(Da(v));
    if (e === "month") return D(ft(v));
    if (e === "year") return D(vn(v));
    if (e === "quarter") return D(mn(v));
    if (e === "week") {
      const W = (((F = x.value) !== null && F !== void 0 ? F : g.value.firstDayOfWeek) + 1) % 7;
      return D(tt(v, { weekStartsOn: W }));
    }
    return D(Zt(v));
  }
  function Fe(v, F) {
    const { isDateDisabled: { value: W } } = E;
    return W ? W(v, F) : false;
  }
  function ge(v) {
    const F = Ie(v, L.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (We(F)) {
      if (n.value === null) t.doUpdateValue(D(Se(Date.now())), n.panel);
      else if (!Array.isArray(n.value)) {
        const W = xe(n.value, { year: ie(F), month: te(F), date: Le(F) });
        t.doUpdateValue(D(Se(D(W))), n.panel);
      }
    } else Z.value = v;
  }
  function ct() {
    const v = Ie(Z.value, L.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (We(v)) {
      if (n.value === null) t.doUpdateValue(D(Se(Date.now())), false);
      else if (!Array.isArray(n.value)) {
        const F = xe(n.value, { year: ie(v), month: te(v), date: Le(v) });
        t.doUpdateValue(D(Se(D(F))), false);
      }
    } else H();
  }
  function re() {
    t.doUpdateValue(null, true), Z.value = "", t.doClose(true), t.handleClearClick();
  }
  function ne() {
    t.doUpdateValue(D(Se(Date.now())), true);
    const v = Date.now();
    q.value = v, t.doClose(true), n.panel && (e === "month" || e === "quarter" || e === "year") && (t.disableTransitionOneTick(), Je(v));
  }
  const Me = _(null);
  function he(v) {
    v.type === "date" && e === "week" && (Me.value = Se(D(v.ts)));
  }
  function Ne(v) {
    return v.type === "date" && e === "week" ? Se(D(v.ts)) === Me.value : false;
  }
  function Te(v) {
    if (Fe(v.ts, v.type === "date" ? { type: "date", year: v.dateObject.year, month: v.dateObject.month, date: v.dateObject.date } : v.type === "month" ? { type: "month", year: v.dateObject.year, month: v.dateObject.month } : v.type === "year" ? { type: "year", year: v.dateObject.year } : { type: "quarter", year: v.dateObject.year, quarter: v.dateObject.quarter })) return;
    let F;
    if (n.value !== null && !Array.isArray(n.value) ? F = n.value : F = Date.now(), e === "datetime" && n.defaultTime !== null && !Array.isArray(n.defaultTime)) {
      let W;
      typeof n.defaultTime == "function" ? W = Ao(v.ts, n.defaultTime) : W = jt(n.defaultTime), W && (F = D(xe(F, W)));
    }
    switch (F = D(v.type === "quarter" && v.dateObject.quarter ? So(aa(F, v.dateObject.year), v.dateObject.quarter) : xe(F, v.dateObject)), t.doUpdateValue(Se(F), n.panel || e === "date" || e === "week" || e === "year"), e) {
      case "date":
      case "week":
        t.doClose();
        break;
      case "year":
        n.panel && t.disableTransitionOneTick(), t.doClose();
        break;
      case "month":
        t.disableTransitionOneTick(), Je(F);
        break;
      case "quarter":
        t.disableTransitionOneTick(), Je(F);
        break;
    }
  }
  function wt(v, F) {
    let W;
    n.value !== null && !Array.isArray(n.value) ? W = n.value : W = Date.now(), W = D(v.type === "month" ? ka(W, v.dateObject.month) : aa(W, v.dateObject.year)), F(W), Je(W);
  }
  function Ae(v) {
    q.value = v;
  }
  function H(v) {
    if (n.value === null || Array.isArray(n.value)) {
      Z.value = "";
      return;
    }
    v === void 0 && (v = n.value), Z.value = X(v, L.value, t.dateFnsOptions.value);
  }
  function ht() {
    E.isDateInvalid.value || E.isTimeInvalid.value || (t.doConfirm(), nt());
  }
  function nt() {
    n.active && t.doClose();
  }
  function Dt() {
    var v;
    q.value = D(ea(q.value, 1)), (v = n.onNextYear) === null || v === void 0 || v.call(n);
  }
  function kt() {
    var v;
    q.value = D(ea(q.value, -1)), (v = n.onPrevYear) === null || v === void 0 || v.call(n);
  }
  function Ct() {
    var v;
    q.value = D(Ce(q.value, 1)), (v = n.onNextMonth) === null || v === void 0 || v.call(n);
  }
  function xt() {
    var v;
    q.value = D(Ce(q.value, -1)), (v = n.onPrevMonth) === null || v === void 0 || v.call(n);
  }
  function St() {
    const { value: v } = be;
    return (v == null ? void 0 : v.listElRef) || null;
  }
  function Mt() {
    const { value: v } = be;
    return (v == null ? void 0 : v.itemsElRef) || null;
  }
  function mt() {
    var v;
    (v = Xe.value) === null || v === void 0 || v.sync();
  }
  function qe(v) {
    v !== null && t.doUpdateValue(v, n.panel);
  }
  function Tt(v) {
    t.cachePendingValue();
    const F = t.getShortcutValue(v);
    typeof F == "number" && t.doUpdateValue(F, false);
  }
  function _t(v) {
    const F = t.getShortcutValue(v);
    typeof F == "number" && (t.doUpdateValue(F, n.panel), t.clearPendingValue(), ht());
  }
  function Je(v) {
    const { value: F } = n;
    if (ae.value) {
      const W = te(v === void 0 ? F === null ? Date.now() : F : v);
      ae.value.scrollTo({ top: W * Yt });
    }
    if (be.value) {
      const W = ie(v === void 0 ? F === null ? Date.now() : F : v) - I.value[0];
      be.value.scrollTo({ top: W * Yt });
    }
  }
  const Ot = { monthScrollbarRef: ae, yearScrollbarRef: Xe, yearVlRef: be };
  return Object.assign(Object.assign(Object.assign(Object.assign({ dateArray: N, monthArray: C, yearArray: De, quarterArray: Ke, calendarYear: Ge, calendarMonth: Ze, weekdays: Ee, calendarMonthBeforeYear: Be, mergedIsDateDisabled: Fe, nextYear: Dt, prevYear: kt, nextMonth: Ct, prevMonth: xt, handleNowClick: ne, handleConfirmClick: ht, handleSingleShortcutMouseenter: Tt, handleSingleShortcutClick: _t }, E), t), Ot), { handleDateClick: Te, handleDateInputBlur: ct, handleDateInput: ge, handleDateMouseEnter: he, isWeekHovered: Ne, handleTimePickerChange: qe, clearSelectedDateTime: re, virtualListContainer: St, virtualListContent: Mt, handleVirtualListScroll: mt, timePickerSize: t.timePickerSize, dateInputValue: Z, datePickerSlots: $, handleQuickMonthClick: wt, justifyColumnsScrollState: Je, calendarValue: q, onUpdateCalendarValue: Ae });
}
const xr = Qe({ name: "MonthPanel", props: Object.assign(Object.assign({}, Ca), { type: { type: String, required: true }, useAsQuickJump: Boolean }), setup(n) {
  const e = xa(n, n.type), { dateLocaleRef: a } = Pn("DatePicker"), t = (l) => {
    switch (l.type) {
      case "year":
        return wr(l.dateObject.year, l.yearFormat, a.value.locale);
      case "month":
        return br(l.dateObject.month, l.monthFormat, a.value.locale);
      case "quarter":
        return Dr(l.dateObject.quarter, l.quarterFormat, a.value.locale);
    }
  }, { useAsQuickJump: r } = n, i = (l, u, c) => {
    const { mergedIsDateDisabled: f, handleDateClick: m, handleQuickMonthClick: p } = e;
    return o("div", { "data-n-date": true, key: u, class: [`${c}-date-panel-month-calendar__picker-col-item`, l.isCurrent && `${c}-date-panel-month-calendar__picker-col-item--current`, l.selected && `${c}-date-panel-month-calendar__picker-col-item--selected`, !r && f(l.ts, l.type === "year" ? { type: "year", year: l.dateObject.year } : l.type === "month" ? { type: "month", year: l.dateObject.year, month: l.dateObject.month } : l.type === "quarter" ? { type: "month", year: l.dateObject.year, month: l.dateObject.quarter } : null) && `${c}-date-panel-month-calendar__picker-col-item--disabled`], onClick: () => {
      var g, x;
      l.type === "year" ? (g = n.onSelectYear) === null || g === void 0 || g.call(n) : l.type === "month" && ((x = n.onSelectMonth) === null || x === void 0 || x.call(n)), r ? p(l, ($) => {
        n.onUpdateValue($, false);
      }) : m(l);
    } }, t(l));
  };
  return Xa(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: i });
}, render() {
  const { mergedClsPrefix: n, mergedTheme: e, shortcuts: a, actions: t, renderItem: r, type: i, onRender: l } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${n}-date-panel`, `${n}-date-panel--month`, !this.panel && `${n}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${n}-date-panel-month-calendar` }, o(ut, { ref: "yearScrollbarRef", class: `${n}-date-panel-month-calendar__picker-col`, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, container: this.virtualListContainer, content: this.virtualListContent, horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "yearVlRef", items: this.yearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleVirtualListScroll, paddingBottom: 4 }, { default: ({ item: u, index: c }) => r(u, c, n) }) }), i === "month" || i === "quarter" ? o("div", { class: `${n}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "monthScrollbarRef", theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar }, { default: () => [(i === "month" ? this.monthArray : this.quarterArray).map((u, c) => r(u, c, n)), o("div", { class: `${n}-date-panel-${i}-calendar__padding` })] })) : null), ar(this.datePickerSlots.footer, (u) => u ? o("div", { class: `${n}-date-panel-footer` }, u) : null), (t == null ? void 0 : t.length) || a ? o("div", { class: `${n}-date-panel-actions` }, o("div", { class: `${n}-date-panel-actions__prefix` }, a && Object.keys(a).map((u) => {
    const c = a[u];
    return Array.isArray(c) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(c);
    }, onClick: () => {
      this.handleSingleShortcutClick(c);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => u });
  })), o("div", { class: `${n}-date-panel-actions__suffix` }, (t == null ? void 0 : t.includes("clear")) ? Ve(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Oe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, (t == null ? void 0 : t.includes("now")) ? Ve(this.datePickerSlots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Oe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, (t == null ? void 0 : t.includes("confirm")) ? Ve(this.datePickerSlots.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Oe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Gt = Qe({ props: { mergedClsPrefix: { type: String, required: true }, value: Number, monthBeforeYear: { type: Boolean, required: true }, monthYearSeparator: { type: String, required: true }, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarMonth: { type: String, required: true }, calendarYear: { type: String, required: true }, onUpdateValue: { type: Function, required: true } }, setup(n) {
  const e = _(null), a = _(null), t = _(false);
  function r() {
    t.value = !t.value;
  }
  function i() {
    n.fastYearSelect && r();
  }
  function l() {
    n.fastMonthSelect && r();
  }
  function u(f) {
    var m;
    t.value && !(!((m = e.value) === null || m === void 0) && m.contains(ha(f))) && (t.value = false);
  }
  function c() {
    r();
  }
  return { show: t, triggerRef: e, monthPanelRef: a, handleSelectYear: i, handleSelectMonth: l, handleHeaderClick: c, handleClickOutside: u };
}, render() {
  const { handleClickOutside: n, mergedClsPrefix: e } = this;
  return o("div", { class: `${e}-date-panel-month__month-year`, ref: "triggerRef" }, o(ma, null, { default: () => [o(va, null, { default: () => o("div", { class: [`${e}-date-panel-month__text`, this.show && `${e}-date-panel-month__text--active`], onClick: this.handleHeaderClick }, this.monthBeforeYear ? [this.calendarMonth, this.monthYearSeparator, this.calendarYear] : [this.calendarYear, this.monthYearSeparator, this.calendarMonth]) }), o(pa, { show: this.show, teleportDisabled: true }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: true }, { default: () => this.show ? fa(o(xr, { ref: "monthPanelRef", onUpdateValue: this.onUpdateValue, onSelectYear: this.handleSelectYear, onSelectMonth: this.handleSelectMonth, actions: [], calendarHeaderMonthYearSeparator: this.monthYearSeparator, type: "month", key: "month", useAsQuickJump: true, value: this.value }), [[ga, n, void 0, { capture: true }]]) : null }) })] }));
} }), Io = Qe({ name: "DatePanel", props: Object.assign(Object.assign({}, Ca), { type: { type: String, required: true } }), setup(n) {
  return xa(n, n.type);
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u, type: c } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--${c}`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${t}-date-panel-calendar` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.prevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.prevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: t, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.nextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.nextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel-dates` }, this.dateArray.map((f, m) => o("div", { "data-n-date": true, key: m, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(f.ts, { type: "date", year: f.dateObject.year, month: f.dateObject.month, date: f.dateObject.date }), [`${t}-date-panel-date--week-hovered`]: this.isWeekHovered(f), [`${t}-date-panel-date--week-selected`]: f.inSelectedWeek }], onClick: () => {
    this.handleDateClick(f);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(f);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const m = i[f];
    return Array.isArray(m) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(m);
    }, onClick: () => {
      this.handleSingleShortcutClick(m);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f });
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ve(this.$slots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ve(this.$slots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Sa = Object.assign(Object.assign({}, kr), { defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, actions: { type: Array, default: () => ["clear", "confirm"] } });
function Ma(n, e) {
  var a, t;
  const { isDateDisabledRef: r, isStartHourDisabledRef: i, isEndHourDisabledRef: l, isStartMinuteDisabledRef: u, isEndMinuteDisabledRef: c, isStartSecondDisabledRef: f, isEndSecondDisabledRef: m, isStartDateInvalidRef: p, isEndDateInvalidRef: g, isStartTimeInvalidRef: x, isEndTimeInvalidRef: $, isStartValueInvalidRef: J, isEndValueInvalidRef: M, isRangeInvalidRef: R, localeRef: I, rangesRef: E, closeOnSelectRef: L, updateValueOnCloseRef: O, firstDayOfWeekRef: Z, datePickerSlots: q, monthFormatRef: be, yearFormatRef: Xe, quarterFormatRef: ae, yearRangeRef: we } = On(Rn), N = { isDateDisabled: r, isStartHourDisabled: i, isEndHourDisabled: l, isStartMinuteDisabled: u, isEndMinuteDisabled: c, isStartSecondDisabled: f, isEndSecondDisabled: m, isStartDateInvalid: p, isEndDateInvalid: g, isStartTimeInvalid: x, isEndTimeInvalid: $, isStartValueInvalid: J, isEndValueInvalid: M, isRangeInvalid: R }, C = Cr(n), De = _(null), Ke = _(null), Ee = _(null), Ze = _(null), Ge = _(null), Be = _(null), Se = _(null), Fe = _(null), { value: ge } = n, ct = (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Array.isArray(ge) && typeof ge[0] == "number" ? ge[0] : Date.now(), re = _(ct), ne = _((t = n.defaultCalendarEndTime) !== null && t !== void 0 ? t : Array.isArray(ge) && typeof ge[1] == "number" ? ge[1] : D(Ce(ct, 1)));
  ke(true);
  const Me = _(Date.now()), he = _(false), Ne = _(0), Te = y(() => n.dateFormat || I.value.dateFormat), wt = y(() => n.calendarDayFormat || I.value.dayFormat), Ae = _(Array.isArray(ge) ? X(ge[0], Te.value, C.dateFnsOptions.value) : ""), H = _(Array.isArray(ge) ? X(ge[1], Te.value, C.dateFnsOptions.value) : ""), ht = y(() => he.value ? "end" : "start"), nt = y(() => {
    var s;
    return ra(re.value, n.value, Me.value, (s = Z.value) !== null && s !== void 0 ? s : I.value.firstDayOfWeek);
  }), Dt = y(() => {
    var s;
    return ra(ne.value, n.value, Me.value, (s = Z.value) !== null && s !== void 0 ? s : I.value.firstDayOfWeek);
  }), kt = y(() => nt.value.slice(0, 7).map((s) => {
    const { ts: w } = s;
    return X(w, wt.value, C.dateFnsOptions.value);
  })), Ct = y(() => X(re.value, n.calendarHeaderMonthFormat || I.value.monthFormat, C.dateFnsOptions.value)), xt = y(() => X(ne.value, n.calendarHeaderMonthFormat || I.value.monthFormat, C.dateFnsOptions.value)), St = y(() => X(re.value, n.calendarHeaderYearFormat || I.value.yearFormat, C.dateFnsOptions.value)), Mt = y(() => X(ne.value, n.calendarHeaderYearFormat || I.value.yearFormat, C.dateFnsOptions.value)), mt = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[0] : null;
  }), qe = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[1] : null;
  }), Tt = y(() => {
    const { shortcuts: s } = n;
    return s || E.value;
  }), _t = y(() => la(Ht(n.value, "start"), Me.value, { yearFormat: Xe.value }, we)), Je = y(() => la(Ht(n.value, "end"), Me.value, { yearFormat: Xe.value }, we)), Ot = y(() => {
    const s = Ht(n.value, "start");
    return oa(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), v = y(() => {
    const s = Ht(n.value, "end");
    return oa(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), F = y(() => {
    const s = Ht(n.value, "start");
    return ia(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), W = y(() => {
    const s = Ht(n.value, "end");
    return ia(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), tn = y(() => {
    var s;
    return (s = n.calendarHeaderMonthBeforeYear) !== null && s !== void 0 ? s : I.value.monthBeforeYear;
  });
  dt(y(() => n.value), (s) => {
    if (s !== null && Array.isArray(s)) {
      const [w, T] = s;
      Ae.value = X(w, Te.value, C.dateFnsOptions.value), H.value = X(T, Te.value, C.dateFnsOptions.value), he.value || z(s);
    } else Ae.value = "", H.value = "";
  });
  function $t(s, w) {
    (e === "daterange" || e === "datetimerange") && (ie(s) !== ie(w) || te(s) !== te(w)) && C.disableTransitionOneTick();
  }
  dt(re, $t), dt(ne, $t);
  function ke(s) {
    const w = ft(re.value), T = ft(ne.value);
    (n.bindCalendarMonths || w >= T) && (s ? ne.value = D(Ce(w, 1)) : re.value = D(Ce(T, -1)));
  }
  function je() {
    re.value = D(Ce(re.value, 12)), ke(true);
  }
  function vt() {
    re.value = D(Ce(re.value, -12)), ke(true);
  }
  function pt() {
    re.value = D(Ce(re.value, 1)), ke(true);
  }
  function nn() {
    re.value = D(Ce(re.value, -1)), ke(true);
  }
  function $e() {
    ne.value = D(Ce(ne.value, 12)), ke(false);
  }
  function at() {
    ne.value = D(Ce(ne.value, -12)), ke(false);
  }
  function It() {
    ne.value = D(Ce(ne.value, 1)), ke(false);
  }
  function rt() {
    ne.value = D(Ce(ne.value, -1)), ke(false);
  }
  function h(s) {
    re.value = s, ke(true);
  }
  function S(s) {
    ne.value = s, ke(false);
  }
  function Y(s) {
    const w = r.value;
    if (!w) return false;
    if (!Array.isArray(n.value) || ht.value === "start") return w(s, "start", null);
    {
      const { value: T } = Ne;
      return s < Ne.value ? w(s, "start", [T, T]) : w(s, "end", [T, T]);
    }
  }
  function z(s) {
    if (s === null) return;
    const [w, T] = s;
    re.value = w, ft(T) <= ft(w) ? ne.value = D(ft(Ce(w, 1))) : ne.value = D(ft(T));
  }
  function se(s) {
    if (!he.value) he.value = true, Ne.value = s.ts, A(s.ts, s.ts, "done");
    else {
      he.value = false;
      const { value: w } = n;
      n.panel && Array.isArray(w) ? A(w[0], w[1], "done") : L.value && e === "daterange" && (O.value ? d() : ye());
    }
  }
  function Pe(s) {
    if (he.value) {
      if (Y(s.ts)) return;
      s.ts >= Ne.value ? A(Ne.value, s.ts, "wipPreview") : A(s.ts, Ne.value, "wipPreview");
    }
  }
  function ye() {
    R.value || (C.doConfirm(), d());
  }
  function d() {
    he.value = false, n.active && C.doClose();
  }
  function b(s) {
    typeof s != "number" && (s = D(s)), n.value === null ? C.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && C.doUpdateValue([s, Math.max(n.value[1], s)], n.panel);
  }
  function k(s) {
    typeof s != "number" && (s = D(s)), n.value === null ? C.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && C.doUpdateValue([Math.min(n.value[0], s), s], n.panel);
  }
  function A(s, w, T) {
    if (typeof s != "number" && (s = D(s)), T !== "shortcutPreview" && T !== "shortcutDone") {
      let ve, et;
      if (e === "datetimerange") {
        const { defaultTime: ee } = n;
        typeof ee == "function" ? (ve = Ia(s, ee, "start", [s, w]), et = Ia(w, ee, "end", [s, w])) : Array.isArray(ee) ? (ve = jt(ee[0]), et = jt(ee[1])) : (ve = jt(ee), et = ve);
      }
      ve && (s = D(xe(s, ve))), et && (w = D(xe(w, et)));
    }
    C.doUpdateValue([s, w], n.panel && (T === "done" || T === "shortcutDone"));
  }
  function K(s) {
    return D(e === "datetimerange" ? Da(s) : e === "monthrange" ? ft(s) : Zt(s));
  }
  function _e(s) {
    const w = Ie(s, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (We(w)) if (n.value) {
      if (Array.isArray(n.value)) {
        const T = xe(n.value[0], { year: ie(w), month: te(w), date: Le(w) });
        b(K(D(T)));
      }
    } else {
      const T = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
      b(K(D(T)));
    }
    else Ae.value = s;
  }
  function ue(s) {
    const w = Ie(s, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (We(w)) {
      if (n.value === null) {
        const T = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
        k(K(D(T)));
      } else if (Array.isArray(n.value)) {
        const T = xe(n.value[1], { year: ie(w), month: te(w), date: Le(w) });
        k(K(D(T)));
      }
    } else H.value = s;
  }
  function an() {
    const s = Ie(Ae.value, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const T = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        b(K(D(T)));
      } else if (Array.isArray(w)) {
        const T = xe(w[0], { year: ie(s), month: te(s), date: Le(s) });
        b(K(D(T)));
      }
    } else Vt();
  }
  function rn() {
    const s = Ie(H.value, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const T = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        k(K(D(T)));
      } else if (Array.isArray(w)) {
        const T = xe(w[1], { year: ie(s), month: te(s), date: Le(s) });
        k(K(D(T)));
      }
    } else Vt();
  }
  function Vt(s) {
    const { value: w } = n;
    if (w === null || !Array.isArray(w)) {
      Ae.value = "", H.value = "";
      return;
    }
    s === void 0 && (s = w), Ae.value = X(s[0], Te.value, C.dateFnsOptions.value), H.value = X(s[1], Te.value, C.dateFnsOptions.value);
  }
  function on(s) {
    s !== null && b(s);
  }
  function ln(s) {
    s !== null && k(s);
  }
  function sn(s) {
    C.cachePendingValue();
    const w = C.getShortcutValue(s);
    Array.isArray(w) && A(w[0], w[1], "shortcutPreview");
  }
  function un(s) {
    const w = C.getShortcutValue(s);
    Array.isArray(w) && (A(w[0], w[1], "shortcutDone"), C.clearPendingValue(), ye());
  }
  function it(s, w) {
    const T = s === void 0 ? n.value : s;
    if (s === void 0 || w === "start") {
      if (Se.value) {
        const ve = Array.isArray(T) ? te(T[0]) : te(Date.now());
        Se.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Ge.value) {
        const ve = (Array.isArray(T) ? ie(T[0]) : ie(Date.now())) - we.value[0];
        Ge.value.scrollTo({ index: ve, debounce: false });
      }
    }
    if (s === void 0 || w === "end") {
      if (Fe.value) {
        const ve = Array.isArray(T) ? te(T[1]) : te(Date.now());
        Fe.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Be.value) {
        const ve = (Array.isArray(T) ? ie(T[1]) : ie(Date.now())) - we.value[0];
        Be.value.scrollTo({ index: ve, debounce: false });
      }
    }
  }
  function Yn(s, w) {
    const { value: T } = n, ve = !Array.isArray(T), et = s.type === "year" && e !== "yearrange" ? ve ? xe(s.ts, { month: te(e === "quarterrange" ? mn(/* @__PURE__ */ new Date()) : /* @__PURE__ */ new Date()) }).valueOf() : xe(s.ts, { month: te(e === "quarterrange" ? mn(T[w === "start" ? 0 : 1]) : T[w === "start" ? 0 : 1]) }).valueOf() : s.ts;
    if (ve) {
      const gn = K(et), cn = [gn, gn];
      C.doUpdateValue(cn, n.panel), it(cn, "start"), it(cn, "end"), C.disableTransitionOneTick();
      return;
    }
    const ee = [T[0], T[1]];
    let dn = false;
    switch (w === "start" ? (ee[0] = K(et), ee[0] > ee[1] && (ee[1] = ee[0], dn = true)) : (ee[1] = K(et), ee[0] > ee[1] && (ee[0] = ee[1], dn = true)), C.doUpdateValue(ee, n.panel), e) {
      case "monthrange":
      case "quarterrange":
        C.disableTransitionOneTick(), dn ? (it(ee, "start"), it(ee, "end")) : it(ee, w);
        break;
      case "yearrange":
        C.disableTransitionOneTick(), it(ee, "start"), it(ee, "end");
    }
  }
  function An() {
    var s;
    (s = Ee.value) === null || s === void 0 || s.sync();
  }
  function $n() {
    var s;
    (s = Ze.value) === null || s === void 0 || s.sync();
  }
  function In(s) {
    var w, T;
    return s === "start" ? ((w = Ge.value) === null || w === void 0 ? void 0 : w.listElRef) || null : ((T = Be.value) === null || T === void 0 ? void 0 : T.listElRef) || null;
  }
  function Vn(s) {
    var w, T;
    return s === "start" ? ((w = Ge.value) === null || w === void 0 ? void 0 : w.itemsElRef) || null : ((T = Be.value) === null || T === void 0 ? void 0 : T.itemsElRef) || null;
  }
  const Nn = { startYearVlRef: Ge, endYearVlRef: Be, startMonthScrollbarRef: Se, endMonthScrollbarRef: Fe, startYearScrollbarRef: Ee, endYearScrollbarRef: Ze };
  return Object.assign(Object.assign(Object.assign(Object.assign({ startDatesElRef: De, endDatesElRef: Ke, handleDateClick: se, handleColItemClick: Yn, handleDateMouseEnter: Pe, handleConfirmClick: ye, startCalendarPrevYear: vt, startCalendarPrevMonth: nn, startCalendarNextYear: je, startCalendarNextMonth: pt, endCalendarPrevYear: at, endCalendarPrevMonth: rt, endCalendarNextMonth: It, endCalendarNextYear: $e, mergedIsDateDisabled: Y, changeStartEndTime: A, ranges: E, calendarMonthBeforeYear: tn, startCalendarMonth: Ct, startCalendarYear: St, endCalendarMonth: xt, endCalendarYear: Mt, weekdays: kt, startDateArray: nt, endDateArray: Dt, startYearArray: _t, startMonthArray: F, startQuarterArray: Ot, endYearArray: Je, endMonthArray: W, endQuarterArray: v, isSelecting: he, handleRangeShortcutMouseenter: sn, handleRangeShortcutClick: un }, C), N), Nn), { startDateDisplayString: Ae, endDateInput: H, timePickerSize: C.timePickerSize, startTimeValue: mt, endTimeValue: qe, datePickerSlots: q, shortcuts: Tt, startCalendarDateTime: re, endCalendarDateTime: ne, justifyColumnsScrollState: it, handleFocusDetectorFocus: C.handleFocusDetectorFocus, handleStartTimePickerChange: on, handleEndTimePickerChange: ln, handleStartDateInput: _e, handleStartDateInputBlur: an, handleEndDateInput: ue, handleEndDateInputBlur: rn, handleStartYearVlScroll: An, handleEndYearVlScroll: $n, virtualListContainer: In, virtualListContent: Vn, onUpdateStartCalendarValue: h, onUpdateEndCalendarValue: S });
}
const Vo = Qe({ name: "DateRangePanel", props: Sa, setup(n) {
  return Ma(n, "daterange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((c) => o("div", { key: c, class: `${t}-date-panel-weekdays__day` }, c))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((c, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !c.inCurrentMonth, [`${t}-date-panel-date--current`]: c.isCurrentDate, [`${t}-date-panel-date--selected`]: c.selected, [`${t}-date-panel-date--covered`]: c.inSpan, [`${t}-date-panel-date--start`]: c.startOfSpan, [`${t}-date-panel-date--end`]: c.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(c.ts) }], onClick: () => {
    this.handleDateClick(c);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(c);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), c.dateObject.date, c.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((c) => o("div", { key: c, class: `${t}-date-panel-weekdays__day` }, c))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((c, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !c.inCurrentMonth, [`${t}-date-panel-date--current`]: c.isCurrentDate, [`${t}-date-panel-date--selected`]: c.selected, [`${t}-date-panel-date--covered`]: c.inSpan, [`${t}-date-panel-date--start`]: c.startOfSpan, [`${t}-date-panel-date--end`]: c.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(c.ts) }], onClick: () => {
    this.handleDateClick(c);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(c);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), c.dateObject.date, c.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((c) => {
    const f = i[c];
    return Array.isArray(f) || typeof f == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(f);
    }, onClick: () => {
      this.handleRangeShortcutClick(f);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => c }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ve(u.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ve(u.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} });
function Va(n, e, a) {
  const t = fr(), r = Ho(n, a.timeZone, a.locale ?? t.locale);
  return "formatToParts" in r ? No(r, e) : zo(r, e);
}
function No(n, e) {
  const a = n.formatToParts(e);
  for (let t = a.length - 1; t >= 0; --t) if (a[t].type === "timeZoneName") return a[t].value;
}
function zo(n, e) {
  const a = n.format(e).replace(/\u200E/g, ""), t = / [\w-+ ]+$/.exec(a);
  return t ? t[0].substr(1) : "";
}
function Ho(n, e, a) {
  return new Intl.DateTimeFormat(a ? [a.code, "en-US"] : void 0, { timeZone: e, timeZoneName: n });
}
function Eo(n, e) {
  const a = Lo(e);
  return "formatToParts" in a ? qo(a, n) : jo(a, n);
}
const Bo = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
function qo(n, e) {
  try {
    const a = n.formatToParts(e), t = [];
    for (let r = 0; r < a.length; r++) {
      const i = Bo[a[r].type];
      i !== void 0 && (t[i] = parseInt(a[r].value, 10));
    }
    return t;
  } catch (a) {
    if (a instanceof RangeError) return [NaN];
    throw a;
  }
}
function jo(n, e) {
  const a = n.format(e), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [parseInt(t[3], 10), parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[4], 10), parseInt(t[5], 10), parseInt(t[6], 10)];
}
const Un = {}, Na = new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Uo = Na === "06/25/2014, 00:00:00" || Na === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
function Lo(n) {
  return Un[n] || (Un[n] = Uo ? new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })), Un[n];
}
function Sr(n, e, a, t, r, i, l) {
  const u = /* @__PURE__ */ new Date(0);
  return u.setUTCFullYear(n, e, a), u.setUTCHours(t, r, i, l), u;
}
const za = 36e5, Wo = 6e4, Ln = { timezoneZ: /^(Z)$/, timezoneHH: /^([+-]\d{2})$/, timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/ };
function Ta(n, e, a) {
  if (!n) return 0;
  let t = Ln.timezoneZ.exec(n);
  if (t) return 0;
  let r, i;
  if (t = Ln.timezoneHH.exec(n), t) return r = parseInt(t[1], 10), Ha(r) ? -(r * za) : NaN;
  if (t = Ln.timezoneHHMM.exec(n), t) {
    r = parseInt(t[2], 10);
    const l = parseInt(t[3], 10);
    return Ha(r, l) ? (i = Math.abs(r) * za + l * Wo, t[1] === "+" ? -i : i) : NaN;
  }
  if (Ko(n)) {
    e = new Date(e || Date.now());
    const l = a ? e : Qo(e), u = sa(l, n);
    return -(a ? u : Xo(e, u, n));
  }
  return NaN;
}
function Qo(n) {
  return Sr(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());
}
function sa(n, e) {
  const a = Eo(n, e), t = Sr(a[0], a[1] - 1, a[2], a[3] % 24, a[4], a[5], 0).getTime();
  let r = n.getTime();
  const i = r % 1e3;
  return r -= i >= 0 ? i : 1e3 + i, t - r;
}
function Xo(n, e, a) {
  let r = n.getTime() - e;
  const i = sa(new Date(r), a);
  if (e === i) return e;
  r -= i - e;
  const l = sa(new Date(r), a);
  return i === l ? i : Math.max(i, l);
}
function Ha(n, e) {
  return -23 <= n && n <= 23 && (e == null || 0 <= e && e <= 59);
}
const Ea = {};
function Ko(n) {
  if (Ea[n]) return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: n }), Ea[n] = true, true;
  } catch {
    return false;
  }
}
const Zo = 60 * 1e3, Go = { X: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  if (t === 0) return "Z";
  switch (e) {
    case "X":
      return Ba(t);
    case "XXXX":
    case "XX":
      return Bt(t);
    case "XXXXX":
    case "XXX":
    default:
      return Bt(t, ":");
  }
}, x: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  switch (e) {
    case "x":
      return Ba(t);
    case "xxxx":
    case "xx":
      return Bt(t);
    case "xxxxx":
    case "xxx":
    default:
      return Bt(t, ":");
  }
}, O: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + Jo(t, ":");
    case "OOOO":
    default:
      return "GMT" + Bt(t, ":");
  }
}, z: function(n, e, a) {
  switch (e) {
    case "z":
    case "zz":
    case "zzz":
      return Va("short", n, a);
    case "zzzz":
    default:
      return Va("long", n, a);
  }
} };
function Wn(n, e) {
  const a = n ? Ta(n, e, true) / Zo : (e == null ? void 0 : e.getTimezoneOffset()) ?? 0;
  if (Number.isNaN(a)) throw new RangeError("Invalid time zone specified: " + n);
  return a;
}
function _n(n, e) {
  const a = n < 0 ? "-" : "";
  let t = Math.abs(n).toString();
  for (; t.length < e; ) t = "0" + t;
  return a + t;
}
function Bt(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = _n(Math.floor(t / 60), 2), i = _n(Math.floor(t % 60), 2);
  return a + r + e + i;
}
function Ba(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + _n(Math.abs(n) / 60, 2) : Bt(n, e);
}
function Jo(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.floor(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + _n(i, 2);
}
function qa(n) {
  const e = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
  return e.setUTCFullYear(n.getFullYear()), +n - +e;
}
const el = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Qn = 36e5, ja = 6e4, tl = 2, Ye = { dateTimePattern: /^([0-9W+-]+)(T| )(.*)/, datePattern: /^([0-9W+-]+)(.*)/, YY: /^(\d{2})$/, YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/], YYYY: /^(\d{4})/, YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/], MM: /^-(\d{2})$/, DDD: /^-?(\d{3})$/, MMDD: /^-?(\d{2})-?(\d{2})$/, Www: /^-?W(\d{2})$/, WwwD: /^-?W(\d{2})-?(\d{1})$/, HH: /^(\d{2}([.,]\d*)?)$/, HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/, HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/, timeZone: el };
function Mr(n, e = {}) {
  if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (n === null) return /* @__PURE__ */ new Date(NaN);
  const a = e.additionalDigits == null ? tl : Number(e.additionalDigits);
  if (a !== 2 && a !== 1 && a !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]") return new Date(n.getTime());
  if (typeof n == "number" || Object.prototype.toString.call(n) === "[object Number]") return new Date(n);
  if (Object.prototype.toString.call(n) !== "[object String]") return /* @__PURE__ */ new Date(NaN);
  const t = nl(n), { year: r, restDateString: i } = al(t.date, a), l = rl(i, r);
  if (l === null || isNaN(l.getTime())) return /* @__PURE__ */ new Date(NaN);
  if (l) {
    const u = l.getTime();
    let c = 0, f;
    if (t.time && (c = il(t.time), c === null || isNaN(c))) return /* @__PURE__ */ new Date(NaN);
    if (t.timeZone || e.timeZone) {
      if (f = Ta(t.timeZone || e.timeZone, new Date(u + c)), isNaN(f)) return /* @__PURE__ */ new Date(NaN);
    } else f = qa(new Date(u + c)), f = qa(new Date(u + c + f));
    return new Date(u + c + f);
  } else return /* @__PURE__ */ new Date(NaN);
}
function nl(n) {
  const e = {};
  let a = Ye.dateTimePattern.exec(n), t;
  if (a ? (e.date = a[1], t = a[3]) : (a = Ye.datePattern.exec(n), a ? (e.date = a[1], t = a[2]) : (e.date = null, t = n)), t) {
    const r = Ye.timeZone.exec(t);
    r ? (e.time = t.replace(r[1], ""), e.timeZone = r[1].trim()) : e.time = t;
  }
  return e;
}
function al(n, e) {
  if (n) {
    const a = Ye.YYY[e], t = Ye.YYYYY[e];
    let r = Ye.YYYY.exec(n) || t.exec(n);
    if (r) {
      const i = r[1];
      return { year: parseInt(i, 10), restDateString: n.slice(i.length) };
    }
    if (r = Ye.YY.exec(n) || a.exec(n), r) {
      const i = r[1];
      return { year: parseInt(i, 10) * 100, restDateString: n.slice(i.length) };
    }
  }
  return { year: null };
}
function rl(n, e) {
  if (e === null) return null;
  let a, t, r;
  if (!n || !n.length) return a = /* @__PURE__ */ new Date(0), a.setUTCFullYear(e), a;
  let i = Ye.MM.exec(n);
  if (i) return a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1, La(e, t) ? (a.setUTCFullYear(e, t), a) : /* @__PURE__ */ new Date(NaN);
  if (i = Ye.DDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0);
    const l = parseInt(i[1], 10);
    return sl(e, l) ? (a.setUTCFullYear(e, 0, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ye.MMDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10);
    return La(e, t, l) ? (a.setUTCFullYear(e, t, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ye.Www.exec(n), i) return r = parseInt(i[1], 10) - 1, Wa(r) ? Ua(e, r) : /* @__PURE__ */ new Date(NaN);
  if (i = Ye.WwwD.exec(n), i) {
    r = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10) - 1;
    return Wa(r, l) ? Ua(e, r, l) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function il(n) {
  let e, a, t = Ye.HH.exec(n);
  if (t) return e = parseFloat(t[1].replace(",", ".")), Xn(e) ? e % 24 * Qn : NaN;
  if (t = Ye.HHMM.exec(n), t) return e = parseInt(t[1], 10), a = parseFloat(t[2].replace(",", ".")), Xn(e, a) ? e % 24 * Qn + a * ja : NaN;
  if (t = Ye.HHMMSS.exec(n), t) {
    e = parseInt(t[1], 10), a = parseInt(t[2], 10);
    const r = parseFloat(t[3].replace(",", "."));
    return Xn(e, a, r) ? e % 24 * Qn + a * ja + r * 1e3 : NaN;
  }
  return null;
}
function Ua(n, e, a) {
  e = e || 0, a = a || 0;
  const t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(n, 0, 4);
  const r = t.getUTCDay() || 7, i = e * 7 + a + 1 - r;
  return t.setUTCDate(t.getUTCDate() + i), t;
}
const ol = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ll = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Tr(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
function La(n, e, a) {
  if (e < 0 || e > 11) return false;
  if (a != null) {
    if (a < 1) return false;
    const t = Tr(n);
    if (t && a > ll[e] || !t && a > ol[e]) return false;
  }
  return true;
}
function sl(n, e) {
  if (e < 1) return false;
  const a = Tr(n);
  return !(a && e > 366 || !a && e > 365);
}
function Wa(n, e) {
  return !(n < 0 || n > 52 || e != null && (e < 0 || e > 6));
}
function Xn(n, e, a) {
  return !(n < 0 || n >= 25 || e != null && (e < 0 || e >= 60) || a != null && (a < 0 || a >= 60));
}
const ul = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
function dl(n, e, a = {}) {
  e = String(e);
  const t = e.match(ul);
  if (t) {
    const r = Mr(a.originalDate || n, a);
    e = t.reduce(function(i, l) {
      if (l[0] === "'") return i;
      const u = i.indexOf(l), c = i[u - 1] === "'", f = i.replace(l, "'" + Go[l[0]](r, l, a) + "'");
      return c ? f.substring(0, u - 1) + f.substring(u + 1) : f;
    }, e);
  }
  return X(n, e, a);
}
function cl(n, e, a) {
  n = Mr(n, a);
  const t = Ta(e, n, true), r = new Date(n.getTime() - t), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), i.setHours(r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds()), i;
}
function fl(n, e, a, t) {
  return t = { ...t, timeZone: e, originalDate: n }, dl(cl(n, e, { timeZone: t.timeZone }), a, t);
}
const _r = Qa("n-time-picker"), yn = Qe({ name: "TimePickerPanelCol", props: { clsPrefix: { type: String, required: true }, data: { type: Array, required: true }, activeValue: { type: [Number, String], default: null }, onItemClick: Function }, render() {
  const { activeValue: n, onItemClick: e, clsPrefix: a } = this;
  return this.data.map((t) => {
    const { label: r, disabled: i, value: l } = t, u = n === l;
    return o("div", { key: r, "data-active": u ? "" : null, class: [`${a}-time-picker-col__item`, u && `${a}-time-picker-col__item--active`, i && `${a}-time-picker-col__item--disabled`], onClick: e && !i ? () => {
      e(l);
    } : void 0 }, r);
  });
} }), fn = { amHours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], pmHours: ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], hours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], minutes: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], seconds: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], period: ["AM", "PM"] };
function Kn(n) {
  return `00${n}`.slice(-2);
}
function hn(n, e, a) {
  return Array.isArray(e) ? (a === "am" ? e.filter((t) => t < 12) : a === "pm" ? e.filter((t) => t >= 12).map((t) => t === 12 ? 12 : t - 12) : e).map((t) => Kn(t)) : typeof e == "number" ? a === "am" ? n.filter((t) => {
    const r = Number(t);
    return r < 12 && r % e === 0;
  }) : a === "pm" ? n.filter((t) => {
    const r = Number(t);
    return r >= 12 && r % e === 0;
  }).map((t) => {
    const r = Number(t);
    return Kn(r === 12 ? 12 : r - 12);
  }) : n.filter((t) => Number(t) % e === 0) : a === "am" ? n.filter((t) => Number(t) < 12) : a === "pm" ? n.map((t) => Number(t)).filter((t) => Number(t) >= 12).map((t) => Kn(t === 12 ? 12 : t - 12)) : n;
}
function bn(n, e, a) {
  return a ? typeof a == "number" ? n % a === 0 : a.includes(n) : true;
}
function hl(n, e, a) {
  const t = hn(fn[e], a).map(Number);
  let r, i;
  for (let l = 0; l < t.length; ++l) {
    const u = t[l];
    if (u === n) return u;
    if (u > n) {
      i = u;
      break;
    }
    r = u;
  }
  return r === void 0 ? (i || Nr("time-picker", "Please set 'hours' or 'minutes' or 'seconds' props"), i) : i === void 0 || i - n > n - r ? r : i;
}
function ml(n) {
  return yt(n) < 12 ? "am" : "pm";
}
const vl = { actions: { type: Array, default: () => ["now", "confirm"] }, showHour: { type: Boolean, default: true }, showMinute: { type: Boolean, default: true }, showSecond: { type: Boolean, default: true }, showPeriod: { type: Boolean, default: true }, isHourInvalid: Boolean, isMinuteInvalid: Boolean, isSecondInvalid: Boolean, isAmPmInvalid: Boolean, isValueInvalid: Boolean, hourValue: { type: Number, default: null }, minuteValue: { type: Number, default: null }, secondValue: { type: Number, default: null }, amPmValue: { type: String, default: null }, isHourDisabled: Function, isMinuteDisabled: Function, isSecondDisabled: Function, onHourClick: { type: Function, required: true }, onMinuteClick: { type: Function, required: true }, onSecondClick: { type: Function, required: true }, onAmPmClick: { type: Function, required: true }, onNowClick: Function, clearText: String, nowText: String, confirmText: String, transitionDisabled: Boolean, onClearClick: Function, onConfirmClick: Function, onFocusin: Function, onFocusout: Function, onFocusDetectorFocus: Function, onKeydown: Function, hours: [Number, Array], minutes: [Number, Array], seconds: [Number, Array], use12Hours: Boolean }, pl = Qe({ name: "TimePickerPanel", props: vl, setup(n) {
  const { mergedThemeRef: e, mergedClsPrefixRef: a } = On(_r), t = y(() => {
    const { isHourDisabled: u, hours: c, use12Hours: f, amPmValue: m } = n;
    if (f) {
      const p = m ?? ml(Date.now());
      return hn(fn.hours, c, p).map((g) => {
        const x = Number(g), $ = p === "pm" && x !== 12 ? x + 12 : x;
        return { label: g, value: $, disabled: u ? u($) : false };
      });
    } else return hn(fn.hours, c).map((p) => ({ label: p, value: Number(p), disabled: u ? u(Number(p)) : false }));
  }), r = y(() => {
    const { isMinuteDisabled: u, minutes: c } = n;
    return hn(fn.minutes, c).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.hourValue) : false }));
  }), i = y(() => {
    const { isSecondDisabled: u, seconds: c } = n;
    return hn(fn.seconds, c).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.minuteValue, n.hourValue) : false }));
  }), l = y(() => {
    const { isHourDisabled: u } = n;
    let c = true, f = true;
    for (let m = 0; m < 12; ++m) if (!(u == null ? void 0 : u(m))) {
      c = false;
      break;
    }
    for (let m = 12; m < 24; ++m) if (!(u == null ? void 0 : u(m))) {
      f = false;
      break;
    }
    return [{ label: "AM", value: "am", disabled: c }, { label: "PM", value: "pm", disabled: f }];
  });
  return { mergedTheme: e, mergedClsPrefix: a, hours: t, minutes: r, seconds: i, amPm: l, hourScrollRef: _(null), minuteScrollRef: _(null), secondScrollRef: _(null), amPmScrollRef: _(null) };
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i } = this;
  return o("div", { tabindex: 0, class: `${r}-time-picker-panel`, onFocusin: this.onFocusin, onFocusout: this.onFocusout, onKeydown: this.onKeydown }, o("div", { class: `${r}-time-picker-cols` }, this.showHour ? o("div", { class: [`${r}-time-picker-col`, this.isHourInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "hourScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.hours, activeValue: this.hourValue, onItemClick: this.onHourClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showMinute ? o("div", { class: [`${r}-time-picker-col`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`, this.isMinuteInvalid && `${r}-time-picker-col--invalid`] }, o(ut, { ref: "minuteScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.minutes, activeValue: this.minuteValue, onItemClick: this.onMinuteClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showSecond ? o("div", { class: [`${r}-time-picker-col`, this.isSecondInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "secondScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.seconds, activeValue: this.secondValue, onItemClick: this.onSecondClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.use12Hours ? o("div", { class: [`${r}-time-picker-col`, this.isAmPmInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "amPmScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.amPm, activeValue: this.amPmValue, onItemClick: this.onAmPmClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null), !((n = this.actions) === null || n === void 0) && n.length ? o("div", { class: `${r}-time-picker-actions` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? o(Oe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.onClearClick }, { default: () => this.clearText }) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? o(Oe, { size: "tiny", theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, onClick: this.onNowClick }, { default: () => this.nowText }) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? o(Oe, { size: "tiny", type: "primary", class: `${r}-time-picker-actions__confirm`, theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, disabled: this.isValueInvalid, onClick: this.onConfirmClick }, { default: () => this.confirmText }) : null) : null, o(At, { onFocus: this.onFocusDetectorFocus }));
} }), gl = V([j("time-picker", `
 z-index: auto;
 position: relative;
 `, [j("time-picker-icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), B("disabled", [j("time-picker-icon", `
 color: var(--n-icon-color-disabled-override);
 `)])]), j("time-picker-panel", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 font-size: var(--n-item-font-size);
 border-radius: var(--n-border-radius);
 margin: 4px 0;
 min-width: 104px;
 overflow: hidden;
 background-color: var(--n-panel-color);
 box-shadow: var(--n-panel-box-shadow);
 `, [tr(), j("time-picker-actions", `
 padding: var(--n-panel-action-padding);
 align-items: center;
 display: flex;
 justify-content: space-evenly;
 `), j("time-picker-cols", `
 height: calc(var(--n-item-height) * 6);
 display: flex;
 position: relative;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-panel-divider-color);
 `), j("time-picker-col", `
 flex-grow: 1;
 min-width: var(--n-item-width);
 height: calc(var(--n-item-height) * 6);
 flex-direction: column;
 transition: box-shadow .3s var(--n-bezier);
 `, [B("transition-disabled", [me("item", "transition: none;", [V("&::before", "transition: none;")])]), me("padding", `
 height: calc(var(--n-item-height) * 5);
 `), V("&:first-child", "min-width: calc(var(--n-item-width) + 4px);", [me("item", [V("&::before", "left: 4px;")])]), me("item", `
 cursor: pointer;
 height: var(--n-item-height);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 background: #0000;
 text-decoration-color: #0000;
 color: var(--n-item-text-color);
 z-index: 0;
 box-sizing: border-box;
 padding-top: 4px;
 position: relative;
 `, [V("&::before", `
 content: "";
 transition: background-color .3s var(--n-bezier);
 z-index: -1;
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-item-border-radius);
 `), Et("disabled", [V("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `)]), B("active", `
 color: var(--n-item-text-color-active);
 `, [V("&::before", `
 background-color: var(--n-item-color-hover);
 `)]), B("disabled", `
 opacity: var(--n-item-opacity-disabled);
 cursor: not-allowed;
 `)]), B("invalid", [me("item", [B("active", `
 text-decoration: line-through;
 text-decoration-color: var(--n-item-text-color-active);
 `)])])])])]);
function Zn(n, e) {
  return n === void 0 ? true : Array.isArray(n) ? n.every((a) => a >= 0 && a <= e) : n >= 0 && n <= e;
}
const yl = Object.assign(Object.assign({}, Fn.props), { to: Ut.propTo, bordered: { type: Boolean, default: void 0 }, actions: Array, defaultValue: { type: Number, default: null }, defaultFormattedValue: String, placeholder: String, placement: { type: String, default: "bottom-start" }, value: Number, format: { type: String, default: "HH:mm:ss" }, valueFormat: String, formattedValue: String, isHourDisabled: Function, size: String, isMinuteDisabled: Function, isSecondDisabled: Function, inputReadonly: Boolean, clearable: Boolean, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:formattedValue": [Function, Array], onBlur: [Function, Array], onConfirm: [Function, Array], onClear: Function, onFocus: [Function, Array], timeZone: String, showIcon: { type: Boolean, default: true }, disabled: { type: Boolean, default: void 0 }, show: { type: Boolean, default: void 0 }, hours: { type: [Number, Array], validator: (n) => Zn(n, 23) }, minutes: { type: [Number, Array], validator: (n) => Zn(n, 59) }, seconds: { type: [Number, Array], validator: (n) => Zn(n, 59) }, use12Hours: Boolean, stateful: { type: Boolean, default: true }, onChange: [Function, Array] }), ua = Qe({ name: "TimePicker", props: yl, setup(n) {
  const { mergedBorderedRef: e, mergedClsPrefixRef: a, namespaceRef: t, inlineThemeDisabled: r, mergedComponentPropsRef: i } = Ka(n), { localeRef: l, dateLocaleRef: u } = Pn("TimePicker"), c = rr(n, { mergedSize: (d) => {
    var b, k;
    const { size: A } = n;
    if (A) return A;
    const { mergedSize: K } = d || {};
    if (K == null ? void 0 : K.value) return K.value;
    const _e = (k = (b = i == null ? void 0 : i.value) === null || b === void 0 ? void 0 : b.TimePicker) === null || k === void 0 ? void 0 : k.size;
    return _e || "medium";
  } }), { mergedSizeRef: f, mergedDisabledRef: m, mergedStatusRef: p } = c, g = Fn("TimePicker", "-time-picker", gl, zr, n, a), x = er(), $ = _(null), J = _(null), M = y(() => ({ locale: u.value.locale }));
  function R(d) {
    return d === null ? null : Ie(d, n.valueFormat || n.format, /* @__PURE__ */ new Date(), M.value).getTime();
  }
  const { defaultValue: I, defaultFormattedValue: E } = n, L = _(E !== void 0 ? R(E) : I), O = y(() => {
    const { formattedValue: d } = n;
    if (d !== void 0) return R(d);
    const { value: b } = n;
    return b !== void 0 ? b : L.value;
  }), Z = y(() => {
    const { timeZone: d } = n;
    return d ? (b, k, A) => fl(b, d, k, A) : (b, k, A) => X(b, k, A);
  }), q = _("");
  dt(() => n.timeZone, () => {
    const d = O.value;
    q.value = d === null ? "" : Z.value(d, n.format, M.value);
  }, { immediate: true });
  const be = _(false), Xe = Ue(n, "show"), ae = Jn(Xe, be), we = _(O.value), N = _(false), C = y(() => l.value.clear), De = y(() => l.value.now), Ke = y(() => n.placeholder !== void 0 ? n.placeholder : l.value.placeholder), Ee = y(() => l.value.negativeText), Ze = y(() => l.value.positiveText), Ge = y(() => /H|h|K|k/.test(n.format)), Be = y(() => n.format.includes("m")), Se = y(() => n.format.includes("s")), Fe = y(() => {
    const { value: d } = O;
    return d === null ? null : Number(Z.value(d, "HH", M.value));
  }), ge = y(() => {
    const { value: d } = O;
    return d === null ? null : Number(Z.value(d, "mm", M.value));
  }), ct = y(() => {
    const { value: d } = O;
    return d === null ? null : Number(Z.value(d, "ss", M.value));
  }), re = y(() => {
    const { isHourDisabled: d } = n;
    return Fe.value === null ? false : bn(Fe.value, "hours", n.hours) ? d ? d(Fe.value) : false : true;
  }), ne = y(() => {
    const { value: d } = ge, { value: b } = Fe;
    if (d === null || b === null) return false;
    if (!bn(d, "minutes", n.minutes)) return true;
    const { isMinuteDisabled: k } = n;
    return k ? k(d, b) : false;
  }), Me = y(() => {
    const { value: d } = ge, { value: b } = Fe, { value: k } = ct;
    if (k === null || d === null || b === null) return false;
    if (!bn(k, "seconds", n.seconds)) return true;
    const { isSecondDisabled: A } = n;
    return A ? A(k, d, b) : false;
  }), he = y(() => re.value || ne.value || Me.value), Ne = y(() => n.format.length + 4), Te = y(() => {
    const { value: d } = O;
    return d === null ? null : yt(d) < 12 ? "am" : "pm";
  });
  function wt(d, b) {
    const { onUpdateFormattedValue: k, "onUpdate:formattedValue": A } = n;
    k && pe(k, d, b), A && pe(A, d, b);
  }
  function Ae(d) {
    return d === null ? null : Z.value(d, n.valueFormat || n.format);
  }
  function H(d) {
    const { onUpdateValue: b, "onUpdate:value": k, onChange: A } = n, { nTriggerFormChange: K, nTriggerFormInput: _e } = c, ue = Ae(d);
    b && pe(b, d, ue), k && pe(k, d, ue), A && pe(A, d, ue), wt(ue, d), L.value = d, K(), _e();
  }
  function ht(d) {
    const { onFocus: b } = n, { nTriggerFormFocus: k } = c;
    b && pe(b, d), k();
  }
  function nt(d) {
    const { onBlur: b } = n, { nTriggerFormBlur: k } = c;
    b && pe(b, d), k();
  }
  function Dt() {
    const { onConfirm: d } = n;
    d && pe(d, O.value, Ae(O.value));
  }
  function kt(d) {
    var b;
    d.stopPropagation(), H(null), v(null), (b = n.onClear) === null || b === void 0 || b.call(n);
  }
  function Ct() {
    $e({ returnFocus: true });
  }
  function xt() {
    H(null), v(null), $e({ returnFocus: true });
  }
  function St(d) {
    d.key === "Escape" && ae.value && Cn(d);
  }
  function Mt(d) {
    var b;
    switch (d.key) {
      case "Escape":
        ae.value && (Cn(d), $e({ returnFocus: true }));
        break;
      case "Tab":
        x.shift && d.target === ((b = J.value) === null || b === void 0 ? void 0 : b.$el) && (d.preventDefault(), $e({ returnFocus: true }));
        break;
    }
  }
  function mt() {
    N.value = true, wn(() => {
      N.value = false;
    });
  }
  function qe(d) {
    m.value || nr(d, "clear") || ae.value || pt();
  }
  function Tt(d) {
    typeof d != "string" && (O.value === null ? H(D(Ft(Co(/* @__PURE__ */ new Date()), d))) : H(D(Ft(O.value, d))));
  }
  function _t(d) {
    typeof d != "string" && (O.value === null ? H(D(Bn(xo(/* @__PURE__ */ new Date()), d))) : H(D(Bn(O.value, d))));
  }
  function Je(d) {
    typeof d != "string" && (O.value === null ? H(D(qn(Da(/* @__PURE__ */ new Date()), d))) : H(D(qn(O.value, d))));
  }
  function Ot(d) {
    const { value: b } = O;
    if (b === null) {
      const k = /* @__PURE__ */ new Date(), A = yt(k);
      d === "pm" && A < 12 ? H(D(Ft(k, A + 12))) : d === "am" && A >= 12 && H(D(Ft(k, A - 12))), H(D(k));
    } else {
      const k = yt(b);
      d === "pm" && k < 12 ? H(D(Ft(b, k + 12))) : d === "am" && k >= 12 && H(D(Ft(b, k - 12)));
    }
  }
  function v(d) {
    d === void 0 && (d = O.value), d === null ? q.value = "" : q.value = Z.value(d, n.format, M.value);
  }
  function F(d) {
    vt(d) || ht(d);
  }
  function W(d) {
    var b;
    if (!vt(d)) if (ae.value) {
      const k = (b = J.value) === null || b === void 0 ? void 0 : b.$el;
      (k == null ? void 0 : k.contains(d.relatedTarget)) || (v(), nt(d), $e({ returnFocus: false }));
    } else v(), nt(d);
  }
  function tn() {
    m.value || ae.value || pt();
  }
  function $t() {
    m.value || (v(), $e({ returnFocus: false }));
  }
  function ke() {
    if (!J.value) return;
    const { hourScrollRef: d, minuteScrollRef: b, secondScrollRef: k, amPmScrollRef: A } = J.value;
    [d, b, k, A].forEach((K) => {
      var _e;
      if (!K) return;
      const ue = (_e = K.contentRef) === null || _e === void 0 ? void 0 : _e.querySelector("[data-active]");
      ue && K.scrollTo({ top: ue.offsetTop });
    });
  }
  function je(d) {
    be.value = d;
    const { onUpdateShow: b, "onUpdate:show": k } = n;
    b && pe(b, d), k && pe(k, d);
  }
  function vt(d) {
    var b, k, A;
    return !!(!((k = (b = $.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || k === void 0) && k.contains(d.relatedTarget) || !((A = J.value) === null || A === void 0) && A.$el.contains(d.relatedTarget));
  }
  function pt() {
    we.value = O.value, je(true), wn(ke);
  }
  function nn(d) {
    var b, k;
    ae.value && !(!((k = (b = $.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || k === void 0) && k.contains(ha(d))) && $e({ returnFocus: false });
  }
  function $e({ returnFocus: d }) {
    var b;
    ae.value && (je(false), d && ((b = $.value) === null || b === void 0 || b.focus()));
  }
  function at(d) {
    if (d === "") {
      H(null);
      return;
    }
    const b = Ie(d, n.format, /* @__PURE__ */ new Date(), M.value);
    if (q.value = d, We(b)) {
      const { value: k } = O;
      if (k !== null) {
        const A = xe(k, { hours: yt(b), minutes: Sn(b), seconds: Mn(b), milliseconds: Si(b) });
        H(D(A));
      } else H(D(b));
    }
  }
  function It() {
    H(we.value), je(false);
  }
  function rt() {
    const d = /* @__PURE__ */ new Date(), b = { hours: yt, minutes: Sn, seconds: Mn }, [k, A, K] = ["hours", "minutes", "seconds"].map((ue) => !n[ue] || bn(b[ue](d), ue, n[ue]) ? b[ue](d) : hl(b[ue](d), ue, n[ue])), _e = qn(Bn(Ft(O.value ? O.value : D(d), k), A), K);
    H(D(_e));
  }
  function h() {
    v(), Dt(), $e({ returnFocus: true });
  }
  function S(d) {
    vt(d) || (v(), nt(d), $e({ returnFocus: false }));
  }
  dt(O, (d) => {
    v(d), mt(), wn(ke);
  }), dt(ae, () => {
    he.value && H(we.value);
  }), Ga(_r, { mergedThemeRef: g, mergedClsPrefixRef: a });
  const Y = { focus: () => {
    var d;
    (d = $.value) === null || d === void 0 || d.focus();
  }, blur: () => {
    var d;
    (d = $.value) === null || d === void 0 || d.blur();
  } }, z = y(() => {
    const { common: { cubicBezierEaseInOut: d }, self: { iconColor: b, iconColorDisabled: k } } = g.value;
    return { "--n-icon-color-override": b, "--n-icon-color-disabled-override": k, "--n-bezier": d };
  }), se = r ? kn("time-picker-trigger", void 0, z, n) : void 0, Pe = y(() => {
    const { self: { panelColor: d, itemTextColor: b, itemTextColorActive: k, itemColorHover: A, panelDividerColor: K, panelBoxShadow: _e, itemOpacityDisabled: ue, borderRadius: an, itemFontSize: rn, itemWidth: Vt, itemHeight: on, panelActionPadding: ln, itemBorderRadius: sn }, common: { cubicBezierEaseInOut: un } } = g.value;
    return { "--n-bezier": un, "--n-border-radius": an, "--n-item-color-hover": A, "--n-item-font-size": rn, "--n-item-height": on, "--n-item-opacity-disabled": ue, "--n-item-text-color": b, "--n-item-text-color-active": k, "--n-item-width": Vt, "--n-panel-action-padding": ln, "--n-panel-box-shadow": _e, "--n-panel-color": d, "--n-panel-divider-color": K, "--n-item-border-radius": sn };
  }), ye = r ? kn("time-picker", void 0, Pe, n) : void 0;
  return { focus: Y.focus, blur: Y.blur, mergedStatus: p, mergedBordered: e, mergedClsPrefix: a, namespace: t, uncontrolledValue: L, mergedValue: O, isMounted: Za(), inputInstRef: $, panelInstRef: J, adjustedTo: Ut(n), mergedShow: ae, localizedClear: C, localizedNow: De, localizedPlaceholder: Ke, localizedNegativeText: Ee, localizedPositiveText: Ze, hourInFormat: Ge, minuteInFormat: Be, secondInFormat: Se, mergedAttrSize: Ne, displayTimeString: q, mergedSize: f, mergedDisabled: m, isValueInvalid: he, isHourInvalid: re, isMinuteInvalid: ne, isSecondInvalid: Me, transitionDisabled: N, hourValue: Fe, minuteValue: ge, secondValue: ct, amPmValue: Te, handleInputKeydown: St, handleTimeInputFocus: F, handleTimeInputBlur: W, handleNowClick: rt, handleConfirmClick: h, handleTimeInputUpdateValue: at, handleMenuFocusOut: S, handleCancelClick: It, handleClickOutside: nn, handleTimeInputActivate: tn, handleTimeInputDeactivate: $t, handleHourClick: Tt, handleMinuteClick: _t, handleSecondClick: Je, handleAmPmClick: Ot, handleTimeInputClear: kt, handleFocusDetectorFocus: Ct, handleMenuKeydown: Mt, handleTriggerClick: qe, mergedTheme: g, triggerCssVars: r ? void 0 : z, triggerThemeClass: se == null ? void 0 : se.themeClass, triggerOnRender: se == null ? void 0 : se.onRender, cssVars: r ? void 0 : Pe, themeClass: ye == null ? void 0 : ye.themeClass, onRender: ye == null ? void 0 : ye.onRender, clearSelectedValue: xt };
}, render() {
  const { mergedClsPrefix: n, $slots: e, triggerOnRender: a } = this;
  return a == null ? void 0 : a(), o("div", { class: [`${n}-time-picker`, this.triggerThemeClass], style: this.triggerCssVars }, o(ma, null, { default: () => [o(va, null, { default: () => o(Rt, { ref: "inputInstRef", status: this.mergedStatus, value: this.displayTimeString, bordered: this.mergedBordered, passivelyActivated: true, attrSize: this.mergedAttrSize, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, stateful: this.stateful, size: this.mergedSize, placeholder: this.localizedPlaceholder, clearable: this.clearable, disabled: this.mergedDisabled, textDecoration: this.isValueInvalid ? "line-through" : void 0, onFocus: this.handleTimeInputFocus, onBlur: this.handleTimeInputBlur, onActivate: this.handleTimeInputActivate, onDeactivate: this.handleTimeInputDeactivate, onUpdateValue: this.handleTimeInputUpdateValue, onClear: this.handleTimeInputClear, internalDeactivateOnEnter: true, internalForceFocus: this.mergedShow, readonly: this.inputReadonly || this.mergedDisabled, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown }, this.showIcon ? { [this.clearable ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: n, class: `${n}-time-picker-icon` }, { default: () => e.icon ? e.icon() : o(ti, null) }) } : null) }), o(pa, { teleportDisabled: this.adjustedTo === Ut.tdkey, show: this.mergedShow, to: this.adjustedTo, containerClass: this.namespace, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => {
    var t;
    return this.mergedShow ? ((t = this.onRender) === null || t === void 0 || t.call(this), fa(o(pl, { ref: "panelInstRef", actions: this.actions, class: this.themeClass, style: this.cssVars, seconds: this.seconds, minutes: this.minutes, hours: this.hours, transitionDisabled: this.transitionDisabled, hourValue: this.hourValue, showHour: this.hourInFormat, isHourInvalid: this.isHourInvalid, isHourDisabled: this.isHourDisabled, minuteValue: this.minuteValue, showMinute: this.minuteInFormat, isMinuteInvalid: this.isMinuteInvalid, isMinuteDisabled: this.isMinuteDisabled, secondValue: this.secondValue, amPmValue: this.amPmValue, showSecond: this.secondInFormat, isSecondInvalid: this.isSecondInvalid, isSecondDisabled: this.isSecondDisabled, isValueInvalid: this.isValueInvalid, clearText: this.localizedClear, nowText: this.localizedNow, confirmText: this.localizedPositiveText, use12Hours: this.use12Hours, onFocusout: this.handleMenuFocusOut, onKeydown: this.handleMenuKeydown, onHourClick: this.handleHourClick, onMinuteClick: this.handleMinuteClick, onSecondClick: this.handleSecondClick, onAmPmClick: this.handleAmPmClick, onNowClick: this.handleNowClick, onConfirmClick: this.handleConfirmClick, onClearClick: this.clearSelectedValue, onFocusDetectorFocus: this.handleFocusDetectorFocus }), [[ga, this.handleClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), bl = Qe({ name: "DateTimePanel", props: Ca, setup(n) {
  return xa(n, "datetime");
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i, shortcuts: l, timePickerProps: u, datePickerSlots: c, onRender: f } = this;
  return f == null ? void 0 : f(), o("div", { ref: "selfRef", tabindex: 0, class: [`${r}-date-panel`, `${r}-date-panel--datetime`, !this.panel && `${r}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${r}-date-panel-header` }, o(Rt, { value: this.dateInputValue, theme: i.peers.Input, themeOverrides: i.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${r}-date-panel-date-input`, textDecoration: this.isDateInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleDateInputBlur, onUpdateValue: this.handleDateInput }), o(ua, Object.assign({ size: this.timePickerSize, placeholder: this.locale.selectTime, format: this.timePickerFormat }, Array.isArray(u) ? void 0 : u, { showIcon: false, to: false, theme: i.peers.TimePicker, themeOverrides: i.peerOverrides.TimePicker, value: Array.isArray(this.value) ? null : this.value, isHourDisabled: this.isHourDisabled, isMinuteDisabled: this.isMinuteDisabled, isSecondDisabled: this.isSecondDisabled, onUpdateValue: this.handleTimePickerChange, stateful: false }))), o("div", { class: `${r}-date-panel-calendar` }, o("div", { class: `${r}-date-panel-month` }, o("div", { class: `${r}-date-panel-month__fast-prev`, onClick: this.prevYear }, G(c["prev-year"], () => [o(Lt, null)])), o("div", { class: `${r}-date-panel-month__prev`, onClick: this.prevMonth }, G(c["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: r, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${r}-date-panel-month__next`, onClick: this.nextMonth }, G(c["next-month"], () => [o(Qt, null)])), o("div", { class: `${r}-date-panel-month__fast-next`, onClick: this.nextYear }, G(c["next-year"], () => [o(Xt, null)]))), o("div", { class: `${r}-date-panel-weekdays` }, this.weekdays.map((m) => o("div", { key: m, class: `${r}-date-panel-weekdays__day` }, m))), o("div", { class: `${r}-date-panel-dates` }, this.dateArray.map((m, p) => o("div", { "data-n-date": true, key: p, class: [`${r}-date-panel-date`, { [`${r}-date-panel-date--current`]: m.isCurrentDate, [`${r}-date-panel-date--selected`]: m.selected, [`${r}-date-panel-date--excluded`]: !m.inCurrentMonth, [`${r}-date-panel-date--disabled`]: this.mergedIsDateDisabled(m.ts, { type: "date", year: m.dateObject.year, month: m.dateObject.month, date: m.dateObject.date }) }], onClick: () => {
    this.handleDateClick(m);
  } }, o("div", { class: `${r}-date-panel-date__trigger` }), m.dateObject.date, m.isCurrentDate ? o("div", { class: `${r}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${r}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || l ? o("div", { class: `${r}-date-panel-actions` }, o("div", { class: `${r}-date-panel-actions__prefix` }, l && Object.keys(l).map((m) => {
    const p = l[m];
    return Array.isArray(p) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(p);
    }, onClick: () => {
      this.handleSingleShortcutClick(p);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => m });
  })), o("div", { class: `${r}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ve(this.datePickerSlots.clear, { onClear: this.clearSelectedDateTime, text: this.locale.clear }, () => [o(Oe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.clearSelectedDateTime }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ve(c.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Oe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? Ve(c.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Oe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), wl = Qe({ name: "DateTimeRangePanel", props: Sa, setup(n) {
  return Ma(n, "datetimerange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, timePickerProps: l, onRender: u, datePickerSlots: c } = this;
  return u == null ? void 0 : u(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--datetimerange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${t}-date-panel-header` }, o(Rt, { value: this.startDateDisplayString, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, size: this.timePickerSize, stateful: false, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isStartValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleStartDateInputBlur, onUpdateValue: this.handleStartDateInput }), o(ua, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[0] : l, { value: this.startTimeValue, to: false, showIcon: false, disabled: this.isSelecting, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, stateful: false, isHourDisabled: this.isStartHourDisabled, isMinuteDisabled: this.isStartMinuteDisabled, isSecondDisabled: this.isStartSecondDisabled, onUpdateValue: this.handleStartTimePickerChange })), o(Rt, { value: this.endDateInput, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isEndValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleEndDateInputBlur, onUpdateValue: this.handleEndDateInput }), o(ua, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[1] : l, { disabled: this.isSelecting, showIcon: false, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, to: false, stateful: false, value: this.endTimeValue, isHourDisabled: this.isEndHourDisabled, isMinuteDisabled: this.isEndMinuteDisabled, isSecondDisabled: this.isEndSecondDisabled, onUpdateValue: this.handleEndTimePickerChange }))), o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, G(c["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, G(c["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, G(c["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, G(c["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((f, m) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: m, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, G(c["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, G(c["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, monthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, G(c["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, G(c["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((f, m) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: m, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const m = i[f];
    return Array.isArray(m) || typeof m == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(m);
    }, onClick: () => {
      this.handleRangeShortcutClick(m);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ve(c.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ve(c.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Oe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Dl = Qe({ name: "MonthRangePanel", props: Object.assign(Object.assign({}, Sa), { type: { type: String, required: true } }), setup(n) {
  const e = Ma(n, n.type), { dateLocaleRef: a } = Pn("DatePicker"), t = (r, i, l, u) => {
    const { handleColItemClick: c } = e;
    return o("div", { "data-n-date": true, key: i, class: [`${l}-date-panel-month-calendar__picker-col-item`, r.isCurrent && `${l}-date-panel-month-calendar__picker-col-item--current`, r.selected && `${l}-date-panel-month-calendar__picker-col-item--selected`, false], onClick: () => {
      c(r, u);
    } }, r.type === "month" ? br(r.dateObject.month, r.monthFormat, a.value.locale) : r.type === "quarter" ? Dr(r.dateObject.quarter, r.quarterFormat, a.value.locale) : wr(r.dateObject.year, r.yearFormat, a.value.locale));
  };
  return Xa(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: t });
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, type: l, renderItem: u, onRender: c } = this;
  return c == null ? void 0 : c(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(ut, { ref: "startYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("start"), content: () => this.virtualListContent("start"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "startYearVlRef", items: this.startYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleStartYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: m }) => u(f, m, t, "start") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "startMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.startMonthArray : this.startQuarterArray).map((f, m) => u(f, m, t, "start")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(ut, { ref: "endYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("end"), content: () => this.virtualListContent("end"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "endYearVlRef", items: this.endYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleEndYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: m }) => u(f, m, t, "end") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "endMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.endMonthArray : this.endQuarterArray).map((f, m) => u(f, m, t, "end")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), ar(this.datePickerSlots.footer, (f) => f ? o("div", { class: `${t}-date-panel-footer` }, f) : null), !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const m = i[f];
    return Array.isArray(m) || typeof m == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(m);
    }, onClick: () => {
      this.handleRangeShortcutClick(m);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ve(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ve(this.datePickerSlots.confirm, { disabled: this.isRangeInvalid, onConfirm: this.handleConfirmClick, text: this.locale.confirm }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), kl = Object.assign(Object.assign({}, Fn.props), { to: Ut.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, fastYearSelect: Boolean, fastMonthSelect: Boolean, updateValueOnClose: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, default: " " }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, defaultValue: [Number, Array], defaultFormattedValue: [String, Array], defaultTime: [Number, String, Array, Function], disabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom-start" }, value: [Number, Array], formattedValue: [String, Array], size: String, type: { type: String, default: "date" }, valueFormat: String, separator: String, placeholder: String, startPlaceholder: String, endPlaceholder: String, format: String, dateFormat: String, timePickerFormat: String, actions: Array, shortcuts: Object, isDateDisabled: Function, isTimeDisabled: Function, show: { type: Boolean, default: void 0 }, panel: Boolean, ranges: Object, firstDayOfWeek: Number, inputReadonly: Boolean, closeOnSelect: Boolean, status: String, timePickerProps: [Object, Array], onClear: Function, onConfirm: Function, defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, monthFormat: { type: String, default: "M" }, yearFormat: { type: String, default: "y" }, quarterFormat: { type: String, default: "'Q'Q" }, yearRange: { type: Array, default: () => [1901, 2100] }, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], "onUpdate:formattedValue": [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function, onChange: [Function, Array] }), Cl = V([j("date-picker", `
 position: relative;
 z-index: auto;
 `, [j("date-picker-icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), j("icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), B("disabled", [j("date-picker-icon", `
 color: var(--n-icon-color-disabled-override);
 `), j("icon", `
 color: var(--n-icon-color-disabled-override);
 `)])]), j("date-panel", `
 width: fit-content;
 outline: none;
 margin: 4px 0;
 display: grid;
 grid-template-columns: 0fr;
 border-radius: var(--n-panel-border-radius);
 background-color: var(--n-panel-color);
 color: var(--n-panel-text-color);
 user-select: none;
 `, [tr(), B("shadow", `
 box-shadow: var(--n-panel-box-shadow);
 `), j("date-panel-calendar", { padding: "var(--n-calendar-left-padding)", display: "grid", gridTemplateColumns: "1fr", gridArea: "left-calendar" }, [B("end", { padding: "var(--n-calendar-right-padding)", gridArea: "right-calendar" })]), j("date-panel-month-calendar", { display: "flex", gridArea: "left-calendar" }, [me("picker-col", `
 min-width: var(--n-scroll-item-width);
 height: calc(var(--n-scroll-item-height) * 6);
 user-select: none;
 -webkit-user-select: none;
 `, [V("&:first-child", `
 min-width: calc(var(--n-scroll-item-width) + 4px);
 `, [me("picker-col-item", [V("&::before", "left: 4px;")])]), me("padding", `
 height: calc(var(--n-scroll-item-height) * 5)
 `)]), me("picker-col-item", `
 z-index: 0;
 cursor: pointer;
 height: var(--n-scroll-item-height);
 box-sizing: border-box;
 padding-top: 4px;
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background: #0000;
 color: var(--n-item-text-color);
 `, [V("&::before", `
 z-index: -1;
 content: "";
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-scroll-item-border-radius);
 transition: 
 background-color .3s var(--n-bezier);
 `), Et("disabled", [V("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `), B("selected", `
 color: var(--n-item-color-active);
 `, [V("&::before", "background-color: var(--n-item-color-hover);")])]), B("disabled", `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `, [B("selected", [V("&::before", `
 background-color: var(--n-item-color-disabled);
 `)])])])]), B("date", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), B("week", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), B("daterange", { gridTemplateAreas: `
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 ` }), B("datetime", { gridTemplateAreas: `
 "header"
 "left-calendar"
 "footer"
 "action"
 ` }), B("datetimerange", { gridTemplateAreas: `
 "header header header"
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 ` }), B("month", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), j("date-panel-footer", { gridArea: "footer" }), j("date-panel-actions", { gridArea: "action" }), j("date-panel-header", { gridArea: "header" }), j("date-panel-header", `
 box-sizing: border-box;
 width: 100%;
 align-items: center;
 padding: var(--n-panel-header-padding);
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid var(--n-panel-header-divider-color);
 `, [V(">", [V("*:not(:last-child)", { marginRight: "10px" }), V("*", { flex: 1, width: 0 }), j("time-picker", { zIndex: 1 })])]), j("date-panel-month", `
 box-sizing: border-box;
 display: grid;
 grid-template-columns: var(--n-calendar-title-grid-template-columns);
 align-items: center;
 justify-items: center;
 padding: var(--n-calendar-title-padding);
 height: var(--n-calendar-title-height);
 `, [me("prev, next, fast-prev, fast-next", `
 line-height: 0;
 cursor: pointer;
 width: var(--n-arrow-size);
 height: var(--n-arrow-size);
 color: var(--n-arrow-color);
 `), me("month-year", `
 user-select: none;
 -webkit-user-select: none;
 flex-grow: 1;
 position: relative;
 `, [me("text", `
 font-size: var(--n-calendar-title-font-size);
 line-height: var(--n-calendar-title-font-size);
 font-weight: var(--n-calendar-title-font-weight);
 padding: 6px 8px;
 text-align: center;
 color: var(--n-calendar-title-text-color);
 cursor: pointer;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-panel-border-radius);
 `, [B("active", `
 background-color: var(--n-calendar-title-color-hover);
 `), V("&:hover", `
 background-color: var(--n-calendar-title-color-hover);
 `)])])]), j("date-panel-weekdays", `
 display: grid;
 margin: auto;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(1, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 margin-bottom: 4px;
 border-bottom: 1px solid var(--n-calendar-days-divider-color);
 `, [me("day", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 line-height: 15px;
 width: var(--n-item-size);
 text-align: center;
 font-size: var(--n-calendar-days-font-size);
 color: var(--n-item-text-color);
 display: flex;
 align-items: center;
 justify-content: center;
 `)]), j("date-panel-dates", `
 margin: auto;
 display: grid;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(6, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 flex-wrap: wrap;
 `, [j("date-panel-date", `
 user-select: none;
 -webkit-user-select: none;
 position: relative;
 width: var(--n-item-size);
 height: var(--n-item-size);
 line-height: var(--n-item-size);
 text-align: center;
 font-size: var(--n-item-font-size);
 border-radius: var(--n-item-border-radius);
 z-index: 0;
 cursor: pointer;
 transition:
 background-color .2s var(--n-bezier),
 color .2s var(--n-bezier);
 `, [me("trigger", `
 position: absolute;
 left: calc(var(--n-item-size) / 2 - var(--n-item-cell-width) / 2);
 top: calc(var(--n-item-size) / 2 - var(--n-item-cell-height) / 2);
 width: var(--n-item-cell-width);
 height: var(--n-item-cell-height);
 `), B("current", [me("sup", `
 position: absolute;
 top: 2px;
 right: 2px;
 content: "";
 height: 4px;
 width: 4px;
 border-radius: 2px;
 background-color: var(--n-item-color-active);
 transition:
 background-color .2s var(--n-bezier);
 `)]), V("&::after", `
 content: "";
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 transition: background-color .3s var(--n-bezier);
 `), B("covered, start, end", [Et("excluded", [V("&::before", `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `), V("&:nth-child(7n + 1)::before", { borderTopLeftRadius: "var(--n-item-border-radius)", borderBottomLeftRadius: "var(--n-item-border-radius)" }), V("&:nth-child(7n + 7)::before", { borderTopRightRadius: "var(--n-item-border-radius)", borderBottomRightRadius: "var(--n-item-border-radius)" })])]), B("selected", { color: "var(--n-item-text-color-active)" }, [V("&::after", { backgroundColor: "var(--n-item-color-active)" }), B("start", [V("&::before", { left: "50%" })]), B("end", [V("&::before", { right: "50%" })]), me("sup", { backgroundColor: "var(--n-panel-color)" })]), B("excluded", { color: "var(--n-item-text-color-disabled)" }, [B("selected", [V("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), B("disabled", { cursor: "not-allowed", color: "var(--n-item-text-color-disabled)" }, [B("covered", [V("&::before", { backgroundColor: "var(--n-item-color-disabled)" })]), B("selected", [V("&::before", { backgroundColor: "var(--n-item-color-disabled)" }), V("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), B("week-hovered", [V("&::before", `
 background-color: var(--n-item-color-included);
 `), V("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), V("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)]), B("week-selected", `
 color: var(--n-item-text-color-active)
 `, [V("&::before", `
 background-color: var(--n-item-color-active);
 `), V("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), V("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)])])]), Et("week", [j("date-panel-dates", [j("date-panel-date", [Et("disabled", [Et("selected", [V("&:hover", `
 background-color: var(--n-item-color-hover);
 `)])])])])]), B("week", [j("date-panel-dates", [j("date-panel-date", [V("&::before", `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 transition: background-color .3s var(--n-bezier);
 `)])])]), me("vertical-divider", `
 grid-area: divider;
 height: 100%;
 width: 1px;
 background-color: var(--n-calendar-divider-color);
 `), j("date-panel-footer", `
 border-top: 1px solid var(--n-panel-action-divider-color);
 padding: var(--n-panel-extra-footer-padding);
 `), j("date-panel-actions", `
 flex: 1;
 padding: var(--n-panel-action-padding);
 display: flex;
 align-items: center;
 justify-content: space-between;
 border-top: 1px solid var(--n-panel-action-divider-color);
 `, [me("prefix, suffix", `
 display: flex;
 margin-bottom: -8px;
 `), me("suffix", `
 align-self: flex-end;
 `), me("prefix", `
 flex-wrap: wrap;
 `), j("button", `
 margin-bottom: 8px;
 `, [V("&:not(:last-child)", `
 margin-right: 8px;
 `)])])]), V("[data-n-date].transition-disabled", { transition: "none !important" }, [V("&::before, &::after", { transition: "none !important" })])]);
function xl(n, e) {
  const a = y(() => {
    const { isTimeDisabled: m } = n, { value: p } = e;
    if (!(p === null || Array.isArray(p))) return m == null ? void 0 : m(p);
  }), t = y(() => {
    var m;
    return (m = a.value) === null || m === void 0 ? void 0 : m.isHourDisabled;
  }), r = y(() => {
    var m;
    return (m = a.value) === null || m === void 0 ? void 0 : m.isMinuteDisabled;
  }), i = y(() => {
    var m;
    return (m = a.value) === null || m === void 0 ? void 0 : m.isSecondDisabled;
  }), l = y(() => {
    const { type: m, isDateDisabled: p } = n, { value: g } = e;
    return g === null || Array.isArray(g) || !["date", "datetime"].includes(m) || !p ? false : p(g, { type: "input" });
  }), u = y(() => {
    const { type: m } = n, { value: p } = e;
    if (p === null || m === "datetime" || Array.isArray(p)) return false;
    const g = new Date(p), x = g.getHours(), $ = g.getMinutes(), J = g.getMinutes();
    return (t.value ? t.value(x) : false) || (r.value ? r.value($, x) : false) || (i.value ? i.value(J, $, x) : false);
  }), c = y(() => l.value || u.value);
  return { isValueInvalidRef: y(() => {
    const { type: m } = n;
    return m === "date" ? l.value : m === "datetime" ? c.value : false;
  }), isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: c, isHourDisabledRef: t, isMinuteDisabledRef: r, isSecondDisabledRef: i };
}
function Sl(n, e) {
  const a = y(() => {
    const { isTimeDisabled: p } = n, { value: g } = e;
    return !Array.isArray(g) || !p ? [void 0, void 0] : [p == null ? void 0 : p(g[0], "start", g), p == null ? void 0 : p(g[1], "end", g)];
  }), t = { isStartHourDisabledRef: y(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isHourDisabled;
  }), isEndHourDisabledRef: y(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isHourDisabled;
  }), isStartMinuteDisabledRef: y(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isMinuteDisabled;
  }), isEndMinuteDisabledRef: y(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isMinuteDisabled;
  }), isStartSecondDisabledRef: y(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isSecondDisabled;
  }), isEndSecondDisabledRef: y(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isSecondDisabled;
  }) }, r = y(() => {
    const { type: p, isDateDisabled: g } = n, { value: x } = e;
    return x === null || !Array.isArray(x) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(x[0], "start", x);
  }), i = y(() => {
    const { type: p, isDateDisabled: g } = n, { value: x } = e;
    return x === null || !Array.isArray(x) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(x[1], "end", x);
  }), l = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const x = yt(g[0]), $ = Sn(g[0]), J = Mn(g[0]), { isStartHourDisabledRef: M, isStartMinuteDisabledRef: R, isStartSecondDisabledRef: I } = t;
    return (M.value ? M.value(x) : false) || (R.value ? R.value($, x) : false) || (I.value ? I.value(J, $, x) : false);
  }), u = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const x = yt(g[1]), $ = Sn(g[1]), J = Mn(g[1]), { isEndHourDisabledRef: M, isEndMinuteDisabledRef: R, isEndSecondDisabledRef: I } = t;
    return (M.value ? M.value(x) : false) || (R.value ? R.value($, x) : false) || (I.value ? I.value(J, $, x) : false);
  }), c = y(() => r.value || l.value), f = y(() => i.value || u.value), m = y(() => c.value || f.value);
  return Object.assign(Object.assign({}, t), { isStartDateInvalidRef: r, isEndDateInvalidRef: i, isStartTimeInvalidRef: l, isEndTimeInvalidRef: u, isStartValueInvalidRef: c, isEndValueInvalidRef: f, isRangeInvalidRef: m });
}
const Ml = Qe({ name: "DatePicker", props: kl, slots: Object, setup(n, { slots: e }) {
  var a;
  const { localeRef: t, dateLocaleRef: r } = Pn("DatePicker"), { mergedComponentPropsRef: i, mergedClsPrefixRef: l, mergedBorderedRef: u, namespaceRef: c, inlineThemeDisabled: f } = Ka(n), m = rr(n, { mergedSize: (h) => {
    var S, Y;
    const { size: z } = n;
    if (z) return z;
    const { mergedSize: se } = h || {};
    if (se == null ? void 0 : se.value) return se.value;
    const Pe = (Y = (S = i == null ? void 0 : i.value) === null || S === void 0 ? void 0 : S.DatePicker) === null || Y === void 0 ? void 0 : Y.size;
    return Pe || "medium";
  } }), { mergedSizeRef: p, mergedDisabledRef: g, mergedStatusRef: x } = m, $ = _(null), J = _(null), M = _(null), R = _(false), I = Ue(n, "show"), E = Jn(I, R), L = y(() => ({ locale: r.value.locale, useAdditionalWeekYearTokens: true })), O = y(() => {
    const { format: h } = n;
    if (h) return h;
    switch (n.type) {
      case "date":
      case "daterange":
        return t.value.dateFormat;
      case "datetime":
      case "datetimerange":
        return t.value.dateTimeFormat;
      case "year":
      case "yearrange":
        return t.value.yearTypeFormat;
      case "month":
      case "monthrange":
        return t.value.monthTypeFormat;
      case "quarter":
      case "quarterrange":
        return t.value.quarterFormat;
      case "week":
        return t.value.weekFormat;
    }
  }), Z = y(() => {
    var h;
    return (h = n.valueFormat) !== null && h !== void 0 ? h : O.value;
  });
  function q(h) {
    if (h === null) return null;
    const { value: S } = Z, { value: Y } = L;
    return Array.isArray(h) ? [Ie(h[0], S, /* @__PURE__ */ new Date(), Y).getTime(), Ie(h[1], S, /* @__PURE__ */ new Date(), Y).getTime()] : Ie(h, S, /* @__PURE__ */ new Date(), Y).getTime();
  }
  const { defaultFormattedValue: be, defaultValue: Xe } = n, ae = _((a = be !== void 0 ? q(be) : Xe) !== null && a !== void 0 ? a : null), we = y(() => {
    const { formattedValue: h } = n;
    return h !== void 0 ? q(h) : n.value;
  }), N = Jn(we, ae), C = _(null);
  Hr(() => {
    C.value = N.value;
  });
  const De = _(""), Ke = _(""), Ee = _(""), Ze = Fn("DatePicker", "-date-picker", Cl, Er, n, l), Ge = y(() => {
    var h, S;
    return ((S = (h = i == null ? void 0 : i.value) === null || h === void 0 ? void 0 : h.DatePicker) === null || S === void 0 ? void 0 : S.timePickerSize) || "small";
  }), Be = y(() => ["daterange", "datetimerange", "monthrange", "quarterrange", "yearrange"].includes(n.type)), Se = y(() => {
    const { placeholder: h } = n;
    if (h === void 0) {
      const { type: S } = n;
      switch (S) {
        case "date":
          return t.value.datePlaceholder;
        case "datetime":
          return t.value.datetimePlaceholder;
        case "month":
          return t.value.monthPlaceholder;
        case "year":
          return t.value.yearPlaceholder;
        case "quarter":
          return t.value.quarterPlaceholder;
        case "week":
          return t.value.weekPlaceholder;
        default:
          return "";
      }
    } else return h;
  }), Fe = y(() => n.startPlaceholder === void 0 ? n.type === "daterange" ? t.value.startDatePlaceholder : n.type === "datetimerange" ? t.value.startDatetimePlaceholder : n.type === "monthrange" ? t.value.startMonthPlaceholder : "" : n.startPlaceholder), ge = y(() => n.endPlaceholder === void 0 ? n.type === "daterange" ? t.value.endDatePlaceholder : n.type === "datetimerange" ? t.value.endDatetimePlaceholder : n.type === "monthrange" ? t.value.endMonthPlaceholder : "" : n.endPlaceholder), ct = y(() => {
    const { actions: h, type: S, clearable: Y } = n;
    if (h === null) return [];
    if (h !== void 0) return h;
    const z = Y ? ["clear"] : [];
    switch (S) {
      case "date":
      case "week":
        return z.push("now"), z;
      case "datetime":
        return z.push("now", "confirm"), z;
      case "daterange":
        return z.push("confirm"), z;
      case "datetimerange":
        return z.push("confirm"), z;
      case "month":
        return z.push("now", "confirm"), z;
      case "year":
        return z.push("now"), z;
      case "quarter":
        return z.push("now", "confirm"), z;
      case "monthrange":
      case "yearrange":
      case "quarterrange":
        return z.push("confirm"), z;
      default: {
        Br("date-picker", "The type is wrong, n-date-picker's type only supports `date`, `datetime`, `daterange` and `datetimerange`.");
        break;
      }
    }
  });
  function re(h) {
    if (h === null) return null;
    if (Array.isArray(h)) {
      const { value: S } = Z, { value: Y } = L;
      return [X(h[0], S, Y), X(h[1], S, L.value)];
    } else return X(h, Z.value, L.value);
  }
  function ne(h) {
    C.value = h;
  }
  function Me(h, S) {
    const { "onUpdate:formattedValue": Y, onUpdateFormattedValue: z } = n;
    Y && pe(Y, h, S), z && pe(z, h, S);
  }
  function he(h, S) {
    const { "onUpdate:value": Y, onUpdateValue: z, onChange: se } = n, { nTriggerFormChange: Pe, nTriggerFormInput: ye } = m, d = re(h);
    S.doConfirm && Te(h, d), z && pe(z, h, d), Y && pe(Y, h, d), se && pe(se, h, d), ae.value = h, Me(d, h), Pe(), ye();
  }
  function Ne() {
    const { onClear: h } = n;
    h == null ? void 0 : h();
  }
  function Te(h, S) {
    const { onConfirm: Y } = n;
    Y && Y(h, S);
  }
  function wt(h) {
    const { onFocus: S } = n, { nTriggerFormFocus: Y } = m;
    S && pe(S, h), Y();
  }
  function Ae(h) {
    const { onBlur: S } = n, { nTriggerFormBlur: Y } = m;
    S && pe(S, h), Y();
  }
  function H(h) {
    const { "onUpdate:show": S, onUpdateShow: Y } = n;
    S && pe(S, h), Y && pe(Y, h), R.value = h;
  }
  function ht(h) {
    h.key === "Escape" && E.value && (Cn(h), je({ returnFocus: true }));
  }
  function nt(h) {
    h.key === "Escape" && E.value && Cn(h);
  }
  function Dt() {
    var h;
    H(false), (h = M.value) === null || h === void 0 || h.deactivate(), Ne();
  }
  function kt() {
    var h;
    (h = M.value) === null || h === void 0 || h.deactivate(), Ne();
  }
  function Ct() {
    je({ returnFocus: true });
  }
  function xt(h) {
    var S;
    E.value && !(!((S = J.value) === null || S === void 0) && S.contains(ha(h))) && je({ returnFocus: false });
  }
  function St(h) {
    je({ returnFocus: true, disableUpdateOnClose: h });
  }
  function Mt(h, S) {
    S ? he(h, { doConfirm: false }) : ne(h);
  }
  function mt() {
    const h = C.value;
    he(Array.isArray(h) ? [h[0], h[1]] : h, { doConfirm: true });
  }
  function qe() {
    const { value: h } = C;
    Be.value ? (Array.isArray(h) || h === null) && _t(h) : Array.isArray(h) || Tt(h);
  }
  function Tt(h) {
    h === null ? De.value = "" : De.value = X(h, O.value, L.value);
  }
  function _t(h) {
    if (h === null) Ke.value = "", Ee.value = "";
    else {
      const S = L.value;
      Ke.value = X(h[0], O.value, S), Ee.value = X(h[1], O.value, S);
    }
  }
  function Je() {
    E.value || ke();
  }
  function Ot(h) {
    var S;
    !((S = $.value) === null || S === void 0) && S.$el.contains(h.relatedTarget) || (Ae(h), qe(), je({ returnFocus: false }));
  }
  function v() {
    g.value || (qe(), je({ returnFocus: false }));
  }
  function F(h) {
    if (h === "") {
      he(null, { doConfirm: false }), C.value = null, De.value = "";
      return;
    }
    const S = Ie(h, O.value, /* @__PURE__ */ new Date(), L.value);
    We(S) ? (he(D(S), { doConfirm: false }), qe()) : De.value = h;
  }
  function W(h, { source: S }) {
    if (h[0] === "" && h[1] === "") {
      he(null, { doConfirm: false }), C.value = null, Ke.value = "", Ee.value = "";
      return;
    }
    const [Y, z] = h, se = Ie(Y, O.value, /* @__PURE__ */ new Date(), L.value), Pe = Ie(z, O.value, /* @__PURE__ */ new Date(), L.value);
    if (We(se) && We(Pe)) {
      let ye = D(se), d = D(Pe);
      Pe < se && (S === 0 ? d = ye : ye = d), he([ye, d], { doConfirm: false }), qe();
    } else [Ke.value, Ee.value] = h;
  }
  function tn(h) {
    g.value || nr(h, "clear") || E.value || ke();
  }
  function $t(h) {
    g.value || wt(h);
  }
  function ke() {
    g.value || E.value || H(true);
  }
  function je({ returnFocus: h, disableUpdateOnClose: S }) {
    var Y;
    E.value && (H(false), n.type !== "date" && n.updateValueOnClose && !S && mt(), h && ((Y = M.value) === null || Y === void 0 || Y.focus()));
  }
  dt(C, () => {
    qe();
  }), qe(), dt(E, (h) => {
    h || (C.value = N.value);
  });
  const vt = xl(n, C), pt = Sl(n, C);
  Ga(Rn, Object.assign(Object.assign(Object.assign({ mergedClsPrefixRef: l, mergedThemeRef: Ze, timePickerSizeRef: Ge, localeRef: t, dateLocaleRef: r, firstDayOfWeekRef: Ue(n, "firstDayOfWeek"), isDateDisabledRef: Ue(n, "isDateDisabled"), rangesRef: Ue(n, "ranges"), timePickerPropsRef: Ue(n, "timePickerProps"), closeOnSelectRef: Ue(n, "closeOnSelect"), updateValueOnCloseRef: Ue(n, "updateValueOnClose"), monthFormatRef: Ue(n, "monthFormat"), yearFormatRef: Ue(n, "yearFormat"), quarterFormatRef: Ue(n, "quarterFormat"), yearRangeRef: Ue(n, "yearRange") }, vt), pt), { datePickerSlots: e }));
  const nn = { focus: () => {
    var h;
    (h = M.value) === null || h === void 0 || h.focus();
  }, blur: () => {
    var h;
    (h = M.value) === null || h === void 0 || h.blur();
  } }, $e = y(() => {
    const { common: { cubicBezierEaseInOut: h }, self: { iconColor: S, iconColorDisabled: Y } } = Ze.value;
    return { "--n-bezier": h, "--n-icon-color-override": S, "--n-icon-color-disabled-override": Y };
  }), at = f ? kn("date-picker-trigger", void 0, $e, n) : void 0, It = y(() => {
    const { type: h } = n, { common: { cubicBezierEaseInOut: S }, self: { calendarTitleFontSize: Y, calendarDaysFontSize: z, itemFontSize: se, itemTextColor: Pe, itemColorDisabled: ye, itemColorIncluded: d, itemColorHover: b, itemColorActive: k, itemBorderRadius: A, itemTextColorDisabled: K, itemTextColorActive: _e, panelColor: ue, panelTextColor: an, arrowColor: rn, calendarTitleTextColor: Vt, panelActionDividerColor: on, panelHeaderDividerColor: ln, calendarDaysDividerColor: sn, panelBoxShadow: un, panelBorderRadius: it, calendarTitleFontWeight: Yn, panelExtraFooterPadding: An, panelActionPadding: $n, itemSize: In, itemCellWidth: Vn, itemCellHeight: Nn, scrollItemWidth: s, scrollItemHeight: w, calendarTitlePadding: T, calendarTitleHeight: ve, calendarDaysHeight: et, calendarDaysTextColor: ee, arrowSize: dn, panelHeaderPadding: gn, calendarDividerColor: cn, calendarTitleGridTempateColumns: Or, iconColor: Fr, iconColorDisabled: Pr, scrollItemBorderRadius: Rr, calendarTitleColorHover: Yr, [_a("calendarLeftPadding", h)]: Ar, [_a("calendarRightPadding", h)]: $r } } = Ze.value;
    return { "--n-bezier": S, "--n-panel-border-radius": it, "--n-panel-color": ue, "--n-panel-box-shadow": un, "--n-panel-text-color": an, "--n-panel-header-padding": gn, "--n-panel-header-divider-color": ln, "--n-calendar-left-padding": Ar, "--n-calendar-right-padding": $r, "--n-calendar-title-color-hover": Yr, "--n-calendar-title-height": ve, "--n-calendar-title-padding": T, "--n-calendar-title-font-size": Y, "--n-calendar-title-font-weight": Yn, "--n-calendar-title-text-color": Vt, "--n-calendar-title-grid-template-columns": Or, "--n-calendar-days-height": et, "--n-calendar-days-divider-color": sn, "--n-calendar-days-font-size": z, "--n-calendar-days-text-color": ee, "--n-calendar-divider-color": cn, "--n-panel-action-padding": $n, "--n-panel-extra-footer-padding": An, "--n-panel-action-divider-color": on, "--n-item-font-size": se, "--n-item-border-radius": A, "--n-item-size": In, "--n-item-cell-width": Vn, "--n-item-cell-height": Nn, "--n-item-text-color": Pe, "--n-item-color-included": d, "--n-item-color-disabled": ye, "--n-item-color-hover": b, "--n-item-color-active": k, "--n-item-text-color-disabled": K, "--n-item-text-color-active": _e, "--n-scroll-item-width": s, "--n-scroll-item-height": w, "--n-scroll-item-border-radius": Rr, "--n-arrow-size": dn, "--n-arrow-color": rn, "--n-icon-color": Fr, "--n-icon-color-disabled": Pr };
  }), rt = f ? kn("date-picker", y(() => n.type), It, n) : void 0;
  return Object.assign(Object.assign({}, nn), { mergedStatus: x, mergedClsPrefix: l, mergedBordered: u, namespace: c, uncontrolledValue: ae, pendingValue: C, panelInstRef: $, triggerElRef: J, inputInstRef: M, isMounted: Za(), displayTime: De, displayStartTime: Ke, displayEndTime: Ee, mergedShow: E, adjustedTo: Ut(n), isRange: Be, localizedStartPlaceholder: Fe, localizedEndPlaceholder: ge, mergedSize: p, mergedDisabled: g, localizedPlacehoder: Se, isValueInvalid: vt.isValueInvalidRef, isStartValueInvalid: pt.isStartValueInvalidRef, isEndValueInvalid: pt.isEndValueInvalidRef, handleInputKeydown: nt, handleClickOutside: xt, handleKeydown: ht, handleClear: Dt, handlePanelClear: kt, handleTriggerClick: tn, handleInputActivate: Je, handleInputDeactivate: v, handleInputFocus: $t, handleInputBlur: Ot, handlePanelTabOut: Ct, handlePanelClose: St, handleRangeUpdateValue: W, handleSingleUpdateValue: F, handlePanelUpdateValue: Mt, handlePanelConfirm: mt, mergedTheme: Ze, actions: ct, triggerCssVars: f ? void 0 : $e, triggerThemeClass: at == null ? void 0 : at.themeClass, triggerOnRender: at == null ? void 0 : at.onRender, cssVars: f ? void 0 : It, themeClass: rt == null ? void 0 : rt.themeClass, onRender: rt == null ? void 0 : rt.onRender, onNextMonth: n.onNextMonth, onPrevMonth: n.onPrevMonth, onNextYear: n.onNextYear, onPrevYear: n.onPrevYear });
}, render() {
  const { clearable: n, triggerOnRender: e, mergedClsPrefix: a, $slots: t } = this, r = { onUpdateValue: this.handlePanelUpdateValue, onTabOut: this.handlePanelTabOut, onClose: this.handlePanelClose, onClear: this.handlePanelClear, onKeydown: this.handleKeydown, onConfirm: this.handlePanelConfirm, ref: "panelInstRef", value: this.pendingValue, active: this.mergedShow, actions: this.actions, shortcuts: this.shortcuts, style: this.cssVars, defaultTime: this.defaultTime, themeClass: this.themeClass, panel: this.panel, inputReadonly: this.inputReadonly || this.mergedDisabled, onRender: this.onRender, onNextMonth: this.onNextMonth, onPrevMonth: this.onPrevMonth, onNextYear: this.onNextYear, onPrevYear: this.onPrevYear, timePickerFormat: this.timePickerFormat, dateFormat: this.dateFormat, fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, calendarDayFormat: this.calendarDayFormat, calendarHeaderYearFormat: this.calendarHeaderYearFormat, calendarHeaderMonthFormat: this.calendarHeaderMonthFormat, calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear }, i = () => {
    const { type: u } = this;
    return u === "datetime" ? o(bl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime }), t) : u === "daterange" ? o(Vo, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "datetimerange" ? o(wl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "month" || u === "year" || u === "quarter" ? o(xr, Object.assign({}, r, { type: u, key: u })) : u === "monthrange" || u === "yearrange" || u === "quarterrange" ? o(Dl, Object.assign({}, r, { type: u })) : o(Io, Object.assign({}, r, { type: u, defaultCalendarStartTime: this.defaultCalendarStartTime }), t);
  };
  if (this.panel) return i();
  e == null ? void 0 : e();
  const l = { bordered: this.mergedBordered, size: this.mergedSize, passivelyActivated: true, disabled: this.mergedDisabled, readonly: this.inputReadonly || this.mergedDisabled, clearable: n, onClear: this.handleClear, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown, onActivate: this.handleInputActivate, onDeactivate: this.handleInputDeactivate, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur };
  return o("div", { ref: "triggerElRef", class: [`${a}-date-picker`, this.mergedDisabled && `${a}-date-picker--disabled`, this.isRange && `${a}-date-picker--range`, this.triggerThemeClass], style: this.triggerCssVars, onKeydown: this.handleKeydown }, o(ma, null, { default: () => [o(va, null, { default: () => this.isRange ? o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: [this.displayStartTime, this.displayEndTime], placeholder: [this.localizedStartPlaceholder, this.localizedEndPlaceholder], textDecoration: [this.isStartValueInvalid ? "line-through" : "", this.isEndValueInvalid ? "line-through" : ""], pair: true, onUpdateValue: this.handleRangeUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { separator: () => this.separator === void 0 ? G(t.separator, () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(ni, null) })]) : this.separator, [n ? "clear-icon-placeholder" : "suffix"]: () => G(t["date-icon"], () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(Pa, null) })]) }) : o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: this.displayTime, placeholder: this.localizedPlacehoder, textDecoration: this.isValueInvalid && !this.isRange ? "line-through" : "", onUpdateValue: this.handleSingleUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { [n ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => G(t["date-icon"], () => [o(Pa, null)]) }) }) }), o(pa, { show: this.mergedShow, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Ut.tdkey, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => this.mergedShow ? fa(i(), [[ga, this.handleClickOutside, void 0, { capture: true }]]) : null }) })] }));
} });
function Tl() {
  const { request: n } = Ir();
  return { summary: (e) => {
    const a = new URLSearchParams({ group_by: e.group_by });
    return e.api_key && a.set("api_key", e.api_key), e.start_time && a.set("start_time", e.start_time), e.end_time && a.set("end_time", e.end_time), n("GET", `/usage/summary?${a.toString()}`);
  } };
}
const _l = { style: { display: "flex", gap: "12px", "margin-bottom": "24px", "align-items": "flex-end", "flex-wrap": "wrap" } }, Ol = { key: 0, class: "text-slate-500 text-sm" }, Fl = { class: "grid grid-cols-4 gap-4 mb-6" }, El = Qe({ __name: "usage", setup(n) {
  const e = Wr(), a = Tl(), t = _(""), r = _("hour"), i = _(null), l = _(null), u = _(false);
  function c(g) {
    return g >= 1e6 ? (g / 1e6).toFixed(1) + "M" : g >= 1e3 ? (g / 1e3).toFixed(1) + "K" : String(g);
  }
  function f(g) {
    return "$" + g.toFixed(2);
  }
  async function m() {
    u.value = true;
    try {
      const g = { group_by: r.value };
      t.value.trim() && (g.api_key = t.value.trim()), i.value && (g.start_time = new Date(i.value[0]).toISOString(), g.end_time = new Date(i.value[1] + 864e5 - 1).toISOString()), l.value = await a.summary(g);
    } catch (g) {
      e.error(g.message);
    } finally {
      u.value = false;
    }
  }
  const p = y(() => [{ title: r.value === "model" ? "Model" : "Hour", key: "group_key", render: (g) => o("span", { class: "font-mono text-xs" }, g.group_key) }, { title: "Requests", key: "total_requests", render: (g) => g.total_requests.toLocaleString() }, { title: "Errors", key: "error_requests", render: (g) => o("span", { class: g.error_requests > 0 ? "text-red-400" : "" }, String(g.error_requests)) }, { title: "Input", key: "input_tokens", render: (g) => c(g.input_tokens) }, { title: "Output", key: "output_tokens", render: (g) => c(g.output_tokens) }, { title: "Cost", key: "total_cost", render: (g) => f(g.total_cost) }]);
  return (g, x) => {
    const $ = Rt, J = Ml, M = Ur, R = Oe, I = Qr, E = Vr, L = Lr;
    return zn(), Hn("div", null, [x[8] || (x[8] = ot("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Usage", -1)), ot("div", _l, [ot("div", null, [x[3] || (x[3] = ot("div", { style: { "font-size": "12px", color: "#94a3b8", "margin-bottom": "4px" } }, "API Key", -1)), ze($, { value: He(t), "onUpdate:value": x[0] || (x[0] = (O) => En(t) ? t.value = O : null), placeholder: "Optional \u2014 leave empty for all", style: { width: "240px" }, clearable: "" }, null, 8, ["value"])]), ot("div", null, [x[4] || (x[4] = ot("div", { style: { "font-size": "12px", color: "#94a3b8", "margin-bottom": "4px" } }, "Date Range", -1)), ze(J, { value: He(i), "onUpdate:value": x[1] || (x[1] = (O) => En(i) ? i.value = O : null), type: "daterange", clearable: "", style: { width: "260px" } }, null, 8, ["value"])]), ot("div", null, [x[5] || (x[5] = ot("div", { style: { "font-size": "12px", color: "#94a3b8", "margin-bottom": "4px" } }, "Group By", -1)), ze(M, { value: He(r), "onUpdate:value": x[2] || (x[2] = (O) => En(r) ? r.value = O : null), options: [{ label: "By Hour", value: "hour" }, { label: "By Model", value: "model" }], style: { width: "130px" } }, null, 8, ["value"])]), ze(R, { type: "primary", loading: He(u), onClick: m }, { icon: Nt(() => [...x[6] || (x[6] = [ot("span", { class: "i-carbon-search" }, null, -1)])]), default: Nt(() => [x[7] || (x[7] = qr(" Query ", -1))]), _: 1 }, 8, ["loading"])]), !He(l) && !He(u) ? (zn(), Hn("p", Ol, " Select filters and click Query. Leave API key empty to aggregate all keys. ")) : Oa("", true), He(l) ? (zn(), Hn(jr, { key: 1 }, [ot("div", Fl, [ze(E, { size: "small" }, { default: Nt(() => [ze(I, { label: "Requests", value: He(l).summary.total_requests.toLocaleString() }, null, 8, ["value"])]), _: 1 }), ze(E, { size: "small" }, { default: Nt(() => [ze(I, { label: "Input Tokens", value: c(He(l).summary.total_input_tokens) }, null, 8, ["value"])]), _: 1 }), ze(E, { size: "small" }, { default: Nt(() => [ze(I, { label: "Output Tokens", value: c(He(l).summary.total_output_tokens) }, null, 8, ["value"])]), _: 1 }), ze(E, { size: "small" }, { default: Nt(() => [ze(I, { label: "Total Cost", value: f(He(l).summary.total_cost) }, null, 8, ["value"])]), _: 1 })]), ze(L, { columns: He(p), data: He(l).data, pagination: { pageSize: 50 }, size: "small" }, null, 8, ["columns", "data"])], 64)) : Oa("", true)]);
  };
} });
export {
  El as default
};
