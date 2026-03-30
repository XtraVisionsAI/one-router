var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { u as Ir, _ as Vr } from "./useApi-CfwRZjbt.js";
import { aD as da, j as o, ai as Qa, i as On, r as T, au as wn, a as y, w as ut, d as Qe, ar as st, o as Xa, T as ca, aq as fa, ax as ha, aE as Nr, e as I, f as L, g as j, h as me, H as Ht, $ as Dn, k as Ka, l as Fn, aF as zr, m as kn, aw as Za, t as Ue, a8 as Ga, R as Hr, aG as Er, ao as Br, J as Ta, n as zn, z as Hn, y as gn, v as Oe, q as ct, D as En, s as He, B as qr, x as Oa, M as jr } from "./index-w60up3r6.js";
import { e as Ja, u as Pn, _ as Rt } from "./Input-DqhnxmUZ.js";
import { u as er, B as ma, V as va, e as pa, c as ga, f as tr, j as jt, k as nr } from "./Dropdown-BLuUSGvM.js";
import { V as Gn, F as At, b as Ut, B as Lt, c as Wt, d as Qt, m as Cn, _ as Ur, a as Lr } from "./DataTable-CHOh6Qw0.js";
import { r as ar, d as Ne, b as J, u as rr, a as Jn, c as pe } from "./use-form-item-beXUzR1J.js";
import { X as bt, B as Fe } from "./Button-B26OUYFO.js";
import { u as Wr } from "./use-message-Cv6bvOaR.js";
import { _ as Qr } from "./FormItem-DjL365dO.js";
import { _ as Xr } from "./Statistic-x-yuECyA.js";
import "./use-compitable-D7US21yc.js";
const ir = 6048e5, Kr = 864e5, Zr = 6e4, Gr = 36e5, Jr = 1e3, Fa = Symbol.for("constructDateFrom");
function oe(n, e) {
  return typeof n == "function" ? n(e) : n && typeof n == "object" && Fa in n ? n[Fa](e) : n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Gt(n, ...e) {
  const a = oe.bind(null, n || e.find((t) => typeof t == "object"));
  return e.map(a);
}
let ei = {};
function Jt() {
  return ei;
}
function P(n, e) {
  return oe(e || n, n);
}
function tt(n, e) {
  var _a2, _b, _c, _d;
  const a = Jt(), t = (e == null ? void 0 : e.weekStartsOn) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? a.weekStartsOn ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, r = P(n, e == null ? void 0 : e.in), i = r.getDay(), l = (i < t ? 7 : 0) + i - t;
  return r.setDate(r.getDate() - l), r.setHours(0, 0, 0, 0), r;
}
function ti(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e);
  return +tt(t, a) == +tt(r, a);
}
const Pa = da("date", () => o("svg", { width: "28px", height: "28px", viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, o("g", { "fill-rule": "nonzero" }, o("path", { d: "M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z M23.5,9.503 L4.5,9.503 L4.5,21.75 C4.5,22.7164983 5.28350169,23.5 6.25,23.5 L21.75,23.5 C22.7164983,23.5 23.5,22.7164983 23.5,21.75 L23.5,9.503 Z M21.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,8.003 L23.5,8.003 L23.5,6.25 C23.5,5.28350169 22.7164983,4.5 21.75,4.5 Z" }))))), ni = da("time", () => o("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, o("path", { d: "M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z", style: `
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
      ` }))), ai = da("to", () => o("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, o("g", { fill: "currentColor", "fill-rule": "nonzero" }, o("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" })))));
function Bt(n, e, a) {
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
function Xt(n, e) {
  return tt(n, { ...e, weekStartsOn: 1 });
}
function or(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = oe(a, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = Xt(r), l = oe(a, 0);
  l.setFullYear(t, 0, 4), l.setHours(0, 0, 0, 0);
  const u = Xt(l);
  return a.getTime() >= i.getTime() ? t + 1 : a.getTime() >= u.getTime() ? t : t - 1;
}
function xn(n) {
  const e = P(n), a = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return a.setUTCFullYear(e.getFullYear()), +n - +a;
}
function Kt(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setHours(0, 0, 0, 0), a;
}
function ri(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e), i = Kt(t), l = Kt(r), u = +i - xn(i), c = +l - xn(l);
  return Math.round((u - c) / Kr);
}
function ii(n, e) {
  const a = or(n, e), t = oe(n, 0);
  return t.setFullYear(a, 0, 4), t.setHours(0, 0, 0, 0), Xt(t);
}
function oi(n, e, a) {
  return Ce(n, e * 3, a);
}
function ea(n, e, a) {
  return Ce(n, e * 12, a);
}
function li(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e);
  return +Kt(t) == +Kt(r);
}
function si(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function We(n) {
  return !(!si(n) && typeof n != "number" || isNaN(+P(n)));
}
function ui(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return Math.trunc(a.getMonth() / 3) + 1;
}
function hn(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getMonth(), r = t - t % 3;
  return a.setMonth(r, 1), a.setHours(0, 0, 0, 0), a;
}
function ft(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setDate(1), a.setHours(0, 0, 0, 0), a;
}
function mn(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setFullYear(a.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
}
function di(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return ri(a, mn(a)) + 1;
}
function lr(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = +Xt(a) - +ii(a);
  return Math.round(t / ir) + 1;
}
function ya(n, e) {
  var _a2, _b, _c, _d;
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = Jt(), i = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d = (_c = r.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = oe((e == null ? void 0 : e.in) || n, 0);
  l.setFullYear(t + 1, 0, i), l.setHours(0, 0, 0, 0);
  const u = tt(l, e), c = oe((e == null ? void 0 : e.in) || n, 0);
  c.setFullYear(t, 0, i), c.setHours(0, 0, 0, 0);
  const f = tt(c, e);
  return +a >= +u ? t + 1 : +a >= +f ? t : t - 1;
}
function ci(n, e) {
  var _a2, _b, _c, _d;
  const a = Jt(), t = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, r = ya(n, e), i = oe((e == null ? void 0 : e.in) || n, 0);
  return i.setFullYear(r, 0, t), i.setHours(0, 0, 0, 0), tt(i, e);
}
function sr(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = +tt(a, e) - +ci(a, e);
  return Math.round(t / ir) + 1;
}
function X(n, e) {
  const a = n < 0 ? "-" : "", t = Math.abs(n).toString().padStart(e, "0");
  return a + t;
}
const gt = { y(n, e) {
  const a = n.getFullYear(), t = a > 0 ? a : 1 - a;
  return X(e === "yy" ? t % 100 : t, e.length);
}, M(n, e) {
  const a = n.getMonth();
  return e === "M" ? String(a + 1) : X(a + 1, 2);
}, d(n, e) {
  return X(n.getDate(), e.length);
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
  return X(n.getHours() % 12 || 12, e.length);
}, H(n, e) {
  return X(n.getHours(), e.length);
}, m(n, e) {
  return X(n.getMinutes(), e.length);
}, s(n, e) {
  return X(n.getSeconds(), e.length);
}, S(n, e) {
  const a = e.length, t = n.getMilliseconds(), r = Math.trunc(t * Math.pow(10, a - 3));
  return X(r, e.length);
} }, Nt = { midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, Ra = { G: function(n, e, a) {
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
    return X(l, 2);
  }
  return e === "Yo" ? a.ordinalNumber(i, { unit: "year" }) : X(i, e.length);
}, R: function(n, e) {
  const a = or(n);
  return X(a, e.length);
}, u: function(n, e) {
  const a = n.getFullYear();
  return X(a, e.length);
}, Q: function(n, e, a) {
  const t = Math.ceil((n.getMonth() + 1) / 3);
  switch (e) {
    case "Q":
      return String(t);
    case "QQ":
      return X(t, 2);
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
      return X(t, 2);
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
      return X(t + 1, 2);
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
  return e === "wo" ? a.ordinalNumber(r, { unit: "week" }) : X(r, e.length);
}, I: function(n, e, a) {
  const t = lr(n);
  return e === "Io" ? a.ordinalNumber(t, { unit: "week" }) : X(t, e.length);
}, d: function(n, e, a) {
  return e === "do" ? a.ordinalNumber(n.getDate(), { unit: "date" }) : gt.d(n, e);
}, D: function(n, e, a) {
  const t = di(n);
  return e === "Do" ? a.ordinalNumber(t, { unit: "dayOfYear" }) : X(t, e.length);
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
      return X(i, 2);
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
      return X(i, e.length);
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
      return X(r, e.length);
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
  switch (t === 12 ? r = Nt.noon : t === 0 ? r = Nt.midnight : r = t / 12 >= 1 ? "pm" : "am", e) {
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
  switch (t >= 17 ? r = Nt.evening : t >= 12 ? r = Nt.afternoon : t >= 4 ? r = Nt.morning : r = Nt.night, e) {
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
  return e === "Ko" ? a.ordinalNumber(t, { unit: "hour" }) : X(t, e.length);
}, k: function(n, e, a) {
  let t = n.getHours();
  return t === 0 && (t = 24), e === "ko" ? a.ordinalNumber(t, { unit: "hour" }) : X(t, e.length);
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
  return X(t, e.length);
}, T: function(n, e, a) {
  return X(+n, e.length);
} };
function Ya(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.trunc(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + X(i, 2);
}
function Aa(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + X(Math.abs(n) / 60, 2) : Pt(n, e);
}
function Pt(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = X(Math.trunc(t / 60), 2), i = X(t % 60, 2);
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
}, fi = (n, e) => {
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
}, ta = { p: ur, P: fi }, hi = /^D+$/, mi = /^Y+$/, vi = ["D", "DD", "YY", "YYYY"];
function dr(n) {
  return hi.test(n);
}
function cr(n) {
  return mi.test(n);
}
function na(n, e, a) {
  const t = pi(n, e, a);
  if (console.warn(t), vi.includes(n)) throw new RangeError(t);
}
function pi(n, e, a) {
  const t = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${t} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const gi = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, yi = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, bi = /^'([^]*?)'?$/, wi = /''/g, Di = /[a-zA-Z]/;
function K(n, e, a) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const t = Jt(), r = (a == null ? void 0 : a.locale) ?? t.locale ?? Ja, i = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = (a == null ? void 0 : a.weekStartsOn) ?? ((_f = (_e = a == null ? void 0 : a.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? t.weekStartsOn ?? ((_h = (_g = t.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0, u = P(n, a == null ? void 0 : a.in);
  if (!We(u)) throw new RangeError("Invalid time value");
  let c = e.match(yi).map((m) => {
    const p = m[0];
    if (p === "p" || p === "P") {
      const g = ta[p];
      return g(m, r.formatLong);
    }
    return m;
  }).join("").match(gi).map((m) => {
    if (m === "''") return { isToken: false, value: "'" };
    const p = m[0];
    if (p === "'") return { isToken: false, value: ki(m) };
    if (Ra[p]) return { isToken: true, value: m };
    if (p.match(Di)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + p + "`");
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
function ki(n) {
  const e = n.match(bi);
  return e ? e[1].replace(wi, "'") : n;
}
function Le(n, e) {
  return P(n, e == null ? void 0 : e.in).getDate();
}
function Ci(n, e) {
  return P(n, e == null ? void 0 : e.in).getDay();
}
function xi(n, e) {
  const a = P(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = a.getMonth(), i = oe(a, 0);
  return i.setFullYear(t, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function fr() {
  return Object.assign({}, Jt());
}
function yt(n, e) {
  return P(n, e == null ? void 0 : e.in).getHours();
}
function Si(n, e) {
  const a = P(n, e == null ? void 0 : e.in).getDay();
  return a === 0 ? 7 : a;
}
function Mi(n) {
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
function _i(n, e) {
  const a = Ti(e) ? new e(0) : oe(e, 0);
  return a.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), a.setHours(n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()), a;
}
function Ti(n) {
  var _a2;
  return typeof n == "function" && ((_a2 = n.prototype) == null ? void 0 : _a2.constructor) === n;
}
const Oi = 10;
class hr {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(e, a) {
    return true;
  }
}
class Fi extends hr {
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
class Pi extends hr {
  constructor(e, a) {
    super();
    __publicField(this, "priority", Oi);
    __publicField(this, "subPriority", -1);
    this.context = e || ((t) => oe(a, t));
  }
  set(e, a) {
    return a.timestampIsSet ? e : oe(e, _i(e, this.context));
  }
}
class W {
  run(e, a, t, r) {
    const i = this.parse(e, a, t, r);
    return i ? { setter: new Fi(i.value, this.validate, this.set, this.priority, this.subPriority), rest: i.rest } : null;
  }
  validate(e, a, t) {
    return true;
  }
}
class Ri extends W {
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
const ce = { month: /^(1[0-2]|0?\d)/, date: /^(3[0-1]|[0-2]?\d)/, dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, week: /^(5[0-3]|[0-4]?\d)/, hour23h: /^(2[0-3]|[0-1]?\d)/, hour24h: /^(2[0-4]|[0-1]?\d)/, hour11h: /^(1[0-1]|0?\d)/, hour12h: /^(1[0-2]|0?\d)/, minute: /^[0-5]?\d/, second: /^[0-5]?\d/, singleDigit: /^\d/, twoDigits: /^\d{1,2}/, threeDigits: /^\d{1,3}/, fourDigits: /^\d{1,4}/, anyDigitsSigned: /^-?\d+/, singleDigitSigned: /^-?\d/, twoDigitsSigned: /^-?\d{1,2}/, threeDigitsSigned: /^-?\d{1,3}/, fourDigitsSigned: /^-?\d{1,4}/ }, ot = { basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/, basic: /^([+-])(\d{2})(\d{2})|Z/, basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/, extended: /^([+-])(\d{2}):(\d{2})|Z/, extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/ };
function fe(n, e) {
  return n && { value: e(n.value), rest: n.rest };
}
function le(n, e) {
  const a = e.match(n);
  return a ? { value: parseInt(a[0], 10), rest: e.slice(a[0].length) } : null;
}
function lt(n, e) {
  const a = e.match(n);
  if (!a) return null;
  if (a[0] === "Z") return { value: 0, rest: e.slice(1) };
  const t = a[1] === "+" ? 1 : -1, r = a[2] ? parseInt(a[2], 10) : 0, i = a[3] ? parseInt(a[3], 10) : 0, l = a[5] ? parseInt(a[5], 10) : 0;
  return { value: t * (r * Gr + i * Zr + l * Jr), rest: e.slice(a[0].length) };
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
function _n(n, e) {
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
class Yi extends W {
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
class Ai extends W {
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
class $i extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return _n(a === "R" ? 4 : a.length, e);
  }
  set(e, a, t) {
    const r = oe(e, 0);
    return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), Xt(r);
  }
}
class Ii extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return _n(a === "u" ? 4 : a.length, e);
  }
  set(e, a, t) {
    return e.setFullYear(t, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Vi extends W {
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
class Ni extends W {
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
class zi extends W {
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
class Hi extends W {
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
function Ei(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = sr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), P(t, a == null ? void 0 : a.in);
}
class Bi extends W {
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
    return tt(Ei(e, t, r), r);
  }
}
function qi(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = lr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), t;
}
class ji extends W {
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
    return Xt(qi(e, t));
  }
}
const Ui = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Li = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class Wi extends W {
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
    return r ? a >= 1 && a <= Li[i] : a >= 1 && a <= Ui[i];
  }
  set(e, a, t) {
    return e.setDate(t), e.setHours(0, 0, 0, 0), e;
  }
}
class Qi extends W {
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
  const t = Jt(), r = (a == null ? void 0 : a.weekStartsOn) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? t.weekStartsOn ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, i = P(n, a == null ? void 0 : a.in), l = i.getDay(), c = (e % 7 + 7) % 7, f = 7 - r, m = e < 0 || e > 6 ? e - (l + f) % 7 : (c + f) % 7 - (l + f) % 7;
  return Bt(i, m, a);
}
class Xi extends W {
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
class Ki extends W {
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
class Zi extends W {
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
function Gi(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = Si(t, a), i = e - r;
  return Bt(t, i, a);
}
class Ji extends W {
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
    return e = Gi(e, t), e.setHours(0, 0, 0, 0), e;
  }
}
class eo extends W {
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
class to extends W {
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
class no extends W {
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
class ao extends W {
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
class ro extends W {
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
class io extends W {
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
class oo extends W {
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
class lo extends W {
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
class so extends W {
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
class uo extends W {
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
class co extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, a) {
    switch (a) {
      case "X":
        return lt(ot.basicOptionalMinutes, e);
      case "XX":
        return lt(ot.basic, e);
      case "XXXX":
        return lt(ot.basicOptionalSeconds, e);
      case "XXXXX":
        return lt(ot.extendedOptionalSeconds, e);
      case "XXX":
      default:
        return lt(ot.extended, e);
    }
  }
  set(e, a, t) {
    return a.timestampIsSet ? e : oe(e, e.getTime() - xn(e) - t);
  }
}
class fo extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, a) {
    switch (a) {
      case "x":
        return lt(ot.basicOptionalMinutes, e);
      case "xx":
        return lt(ot.basic, e);
      case "xxxx":
        return lt(ot.basicOptionalSeconds, e);
      case "xxxxx":
        return lt(ot.extendedOptionalSeconds, e);
      case "xxx":
      default:
        return lt(ot.extended, e);
    }
  }
  set(e, a, t) {
    return a.timestampIsSet ? e : oe(e, e.getTime() - xn(e) - t);
  }
}
class ho extends W {
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
class mo extends W {
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
const vo = { G: new Ri(), y: new Yi(), Y: new Ai(), R: new $i(), u: new Ii(), Q: new Vi(), q: new Ni(), M: new zi(), L: new Hi(), w: new Bi(), I: new ji(), d: new Wi(), D: new Qi(), E: new Xi(), e: new Ki(), c: new Zi(), i: new Ji(), a: new eo(), b: new to(), B: new no(), h: new ao(), H: new ro(), K: new io(), k: new oo(), m: new lo(), s: new so(), S: new uo(), X: new co(), x: new fo(), t: new ho(), T: new mo() }, po = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, go = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, yo = /^'([^]*?)'?$/, bo = /''/g, wo = /\S/, Do = /[a-zA-Z]/;
function ko(n, e, a, t) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const r = () => oe((t == null ? void 0 : t.in) || a, NaN), i = fr(), l = (t == null ? void 0 : t.locale) ?? i.locale ?? Ja, u = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((_d = (_c = i.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, c = (t == null ? void 0 : t.weekStartsOn) ?? ((_f = (_e = t == null ? void 0 : t.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? i.weekStartsOn ?? ((_h = (_g = i.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (!e) return n ? r() : P(a, t == null ? void 0 : t.in);
  const f = { firstWeekContainsDate: u, weekStartsOn: c, locale: l }, m = [new Pi(t == null ? void 0 : t.in, a)], p = e.match(go).map((S) => {
    const R = S[0];
    if (R in ta) {
      const N = ta[R];
      return N(S, l.formatLong);
    }
    return S;
  }).join("").match(po), g = [];
  for (let S of p) {
    !(t == null ? void 0 : t.useAdditionalWeekYearTokens) && cr(S) && na(S, e, n), !(t == null ? void 0 : t.useAdditionalDayOfYearTokens) && dr(S) && na(S, e, n);
    const R = S[0], N = vo[R];
    if (N) {
      const { incompatibleTokens: q } = N;
      if (Array.isArray(q)) {
        const F = g.find((E) => q.includes(E.token) || E.token === R);
        if (F) throw new RangeError(`The format string mustn't contain \`${F.fullToken}\` and \`${S}\` at the same time`);
      } else if (N.incompatibleTokens === "*" && g.length > 0) throw new RangeError(`The format string mustn't contain \`${S}\` and any other token at the same time`);
      g.push({ token: R, fullToken: S });
      const H = N.run(n, S, l.match, f);
      if (!H) return r();
      m.push(H.setter), n = H.rest;
    } else {
      if (R.match(Do)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + R + "`");
      if (S === "''" ? S = "'" : R === "'" && (S = Co(S)), n.indexOf(S) === 0) n = n.slice(S.length);
      else return r();
    }
  }
  if (n.length > 0 && wo.test(n)) return r();
  const _ = m.map((S) => S.priority).sort((S, R) => R - S).filter((S, R, N) => N.indexOf(S) === R).map((S) => m.filter((R) => R.priority === S).sort((R, N) => N.subPriority - R.subPriority)).map((S) => S[0]);
  let $ = P(a, t == null ? void 0 : t.in);
  if (isNaN(+$)) return r();
  const Z = {};
  for (const S of _) {
    if (!S.validate($, f)) return r();
    const R = S.set($, Z, f);
    Array.isArray(R) ? ($ = R[0], Object.assign(Z, R[1])) : $ = R;
  }
  return $;
}
function Co(n) {
  return n.match(yo)[1].replace(bo, "'");
}
function xo(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setMinutes(0, 0, 0), a;
}
function So(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setSeconds(0, 0), a;
}
function vn(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function gr(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e);
  return +hn(t) == +hn(r);
}
function Da(n, e) {
  const a = P(n, e == null ? void 0 : e.in);
  return a.setMilliseconds(0), a;
}
function yr(n, e, a) {
  const [t, r] = Gt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear();
}
function ka(n, e, a) {
  const t = P(n, a == null ? void 0 : a.in), r = t.getFullYear(), i = t.getDate(), l = oe(n, 0);
  l.setFullYear(r, e, 15), l.setHours(0, 0, 0, 0);
  const u = xi(l);
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
function Mo(n, e, a) {
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
const _o = { date: li, month: vn, year: yr, quarter: gr };
function To(n) {
  return (e, a) => {
    const t = Oo(n);
    return ti(e, a, { weekStartsOn: t });
  };
}
function Oo(n) {
  return (n + 1) % 7;
}
function Ye(n, e, a, t = 0) {
  return (a === "week" ? To(t) : _o[a])(n, e);
}
function jn(n, e, a, t, r, i) {
  return r === "date" ? Fo(n, e, a, t) : Po(n, e, a, t, i);
}
function Fo(n, e, a, t) {
  let r = false, i = false, l = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (r = true), Ye(a[0], n, "date") && (i = true), Ye(a[1], n, "date") && (l = true));
  const u = a !== null && (Array.isArray(a) ? Ye(a[0], n, "date") || Ye(a[1], n, "date") : Ye(a, n, "date"));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: vn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: r, inSelectedWeek: false, startOfSpan: i, endOfSpan: l, selected: u, ts: D(n) };
}
function br(n, e, a) {
  const t = new Date(2e3, n, 1).getTime();
  return K(t, e, { locale: a });
}
function wr(n, e, a) {
  const t = new Date(n, 1, 1).getTime();
  return K(t, e, { locale: a });
}
function Dr(n, e, a) {
  const t = new Date(2e3, n * 3 - 2, 1).getTime();
  return K(t, e, { locale: a });
}
function Po(n, e, a, t, r) {
  let i = false, l = false, u = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (i = true), Ye(a[0], n, "week", r) && (l = true), Ye(a[1], n, "week", r) && (u = true));
  const c = a !== null && (Array.isArray(a) ? Ye(a[0], n, "week", r) || Ye(a[1], n, "week", r) : Ye(a, n, "week", r));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: vn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: i, startOfSpan: l, endOfSpan: u, selected: false, inSelectedWeek: c, ts: D(n) };
}
function Ro(n, e, a, { monthFormat: t }) {
  return { type: "month", monthFormat: t, dateObject: { month: te(n), year: ie(n) }, isCurrent: vn(a, n), selected: e !== null && Ye(e, n, "month"), ts: D(n) };
}
function Yo(n, e, a, { yearFormat: t }) {
  return { type: "year", yearFormat: t, dateObject: { year: ie(n) }, isCurrent: yr(a, n), selected: e !== null && Ye(e, n, "year"), ts: D(n) };
}
function Ao(n, e, a, { quarterFormat: t }) {
  return { type: "quarter", quarterFormat: t, dateObject: { quarter: ui(n), year: ie(n) }, isCurrent: gr(a, n), selected: e !== null && Ye(e, n, "quarter"), ts: D(n) };
}
function ra(n, e, a, t, r = false, i = false) {
  const l = i ? "week" : "date", u = te(n);
  let c = D(ft(n)), f = D(Bt(c, -1));
  const m = [];
  let p = !r;
  for (; Ci(f) !== t || p; ) m.unshift(jn(f, n, e, a, l, t)), f = D(Bt(f, -1)), p = false;
  for (; te(c) === u; ) m.push(jn(c, n, e, a, l, t)), c = D(Bt(c, 1));
  const g = r ? m.length <= 28 ? 28 : m.length <= 35 ? 35 : 42 : 42;
  for (; m.length < g; ) m.push(jn(c, n, e, a, l, t)), c = D(Bt(c, 1));
  return m;
}
function ia(n, e, a, t) {
  const r = [], i = mn(n);
  for (let l = 0; l < 12; l++) r.push(Ro(D(Ce(i, l)), e, a, t));
  return r;
}
function oa(n, e, a, t) {
  const r = [], i = mn(n);
  for (let l = 0; l < 4; l++) r.push(Ao(D(oi(i, l)), e, a, t));
  return r;
}
function la(n, e, a, t) {
  const r = t.value, i = [], l = mn(aa(/* @__PURE__ */ new Date(), r[0]));
  for (let u = 0; u < r[1] - r[0]; u++) i.push(Yo(D(ea(l, u)), n, e, a));
  return i;
}
function Ve(n, e, a, t) {
  const r = ko(n, e, a, t);
  return We(r) ? K(r, e, t) === n ? r : new Date(Number.NaN) : r;
}
function $o(n, e) {
  const a = e(n);
  return qt(a);
}
function Ia(n, e, a, t) {
  const r = e(n, a, t);
  return qt(r);
}
function qt(n) {
  if (n === void 0) return;
  if (typeof n == "number") return n;
  const [e, a, t] = n.split(":");
  return { hours: Number(e), minutes: Number(a), seconds: Number(t) };
}
function zt(n, e) {
  return Array.isArray(n) ? n[e === "start" ? 0 : 1] : null;
}
const Rn = Qa("n-date-picker"), Yt = 40, Io = "HH:mm:ss", kr = { active: Boolean, dateFormat: String, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, required: true }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, timePickerFormat: { type: String, value: Io }, value: { type: [Array, Number], default: null }, shortcuts: Object, defaultTime: [Number, String, Array, Function], inputReadonly: Boolean, onClear: Function, onConfirm: Function, onClose: Function, onTabOut: Function, onKeydown: Function, actions: Array, onSelectYear: Function, onSelectMonth: Function, onUpdateValue: { type: Function, required: true }, themeClass: String, onRender: Function, panel: Boolean, onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function };
function Cr(n) {
  const { dateLocaleRef: e, timePickerSizeRef: a, timePickerPropsRef: t, localeRef: r, mergedClsPrefixRef: i, mergedThemeRef: l } = On(Rn), u = y(() => ({ locale: e.value.locale })), c = T(null), f = er();
  function m() {
    const { onClear: V } = n;
    V && V();
  }
  function p() {
    const { onConfirm: V, value: C } = n;
    V && V(C);
  }
  function g(V, C) {
    const { onUpdateValue: De } = n;
    De(V, C);
  }
  function _(V = false) {
    const { onClose: C } = n;
    C && C(V);
  }
  function $() {
    const { onTabOut: V } = n;
    V && V();
  }
  function Z() {
    g(null, true), _(true), m();
  }
  function S() {
    $();
  }
  function R() {
    (n.active || n.panel) && wn(() => {
      const { value: V } = c;
      if (!V) return;
      const C = V.querySelectorAll("[data-n-date]");
      C.forEach((De) => {
        De.classList.add("transition-disabled");
      }), V.offsetWidth, C.forEach((De) => {
        De.classList.remove("transition-disabled");
      });
    });
  }
  function N(V) {
    V.key === "Tab" && V.target === c.value && f.shift && (V.preventDefault(), $());
  }
  function q(V) {
    const { value: C } = c;
    f.tab && V.target === C && (C == null ? void 0 : C.contains(V.relatedTarget)) && $();
  }
  let H = null, F = false;
  function E() {
    H = n.value, F = true;
  }
  function U() {
    F = false;
  }
  function be() {
    F && (g(H, false), F = false);
  }
  function Xe(V) {
    return typeof V == "function" ? V() : V;
  }
  const ae = T(false);
  function we() {
    ae.value = !ae.value;
  }
  return { mergedTheme: l, mergedClsPrefix: i, dateFnsOptions: u, timePickerSize: a, timePickerProps: t, selfRef: c, locale: r, doConfirm: p, doClose: _, doUpdateValue: g, doTabOut: $, handleClearClick: Z, handleFocusDetectorFocus: S, disableTransitionOneTick: R, handlePanelKeyDown: N, handlePanelFocus: q, cachePendingValue: E, clearPendingValue: U, restorePendingValue: be, getShortcutValue: Xe, handleShortcutMouseleave: be, showMonthYearPanel: ae, handleOpenQuickSelectMonthPanel: we };
}
const Ca = Object.assign(Object.assign({}, kr), { defaultCalendarStartTime: Number, actions: { type: Array, default: () => ["now", "clear", "confirm"] } });
function xa(n, e) {
  var a;
  const t = Cr(n), { isValueInvalidRef: r, isDateDisabledRef: i, isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: c, isHourDisabledRef: f, isMinuteDisabledRef: m, isSecondDisabledRef: p, localeRef: g, firstDayOfWeekRef: _, datePickerSlots: $, yearFormatRef: Z, monthFormatRef: S, quarterFormatRef: R, yearRangeRef: N } = On(Rn), q = { isValueInvalid: r, isDateDisabled: i, isDateInvalid: l, isTimeInvalid: u, isDateTimeInvalid: c, isHourDisabled: f, isMinuteDisabled: m, isSecondDisabled: p }, H = y(() => n.dateFormat || g.value.dateFormat), F = y(() => n.calendarDayFormat || g.value.dayFormat), E = T(n.value === null || Array.isArray(n.value) ? "" : K(n.value, H.value)), U = T(n.value === null || Array.isArray(n.value) ? (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Date.now() : n.value), be = T(null), Xe = T(null), ae = T(null), we = T(Date.now()), V = y(() => {
    var v;
    return ra(U.value, n.value, we.value, (v = _.value) !== null && v !== void 0 ? v : g.value.firstDayOfWeek, false, e === "week");
  }), C = y(() => {
    const { value: v } = n;
    return ia(U.value, Array.isArray(v) ? null : v, we.value, { monthFormat: S.value });
  }), De = y(() => {
    const { value: v } = n;
    return la(Array.isArray(v) ? null : v, we.value, { yearFormat: Z.value }, N);
  }), Ke = y(() => {
    const { value: v } = n;
    return oa(U.value, Array.isArray(v) ? null : v, we.value, { quarterFormat: R.value });
  }), Ee = y(() => V.value.slice(0, 7).map((v) => {
    const { ts: O } = v;
    return K(O, F.value, t.dateFnsOptions.value);
  })), Ze = y(() => K(U.value, n.calendarHeaderMonthFormat || g.value.monthFormat, t.dateFnsOptions.value)), Ge = y(() => K(U.value, n.calendarHeaderYearFormat || g.value.yearFormat, t.dateFnsOptions.value)), Be = y(() => {
    var v;
    return (v = n.calendarHeaderMonthBeforeYear) !== null && v !== void 0 ? v : g.value.monthBeforeYear;
  });
  ut(U, (v, O) => {
    (e === "date" || e === "datetime") && (vn(v, O) || t.disableTransitionOneTick());
  }), ut(y(() => n.value), (v) => {
    v !== null && !Array.isArray(v) ? (E.value = K(v, H.value, t.dateFnsOptions.value), U.value = v) : E.value = "";
  });
  function Se(v) {
    var O;
    if (e === "datetime") return D(Da(v));
    if (e === "month") return D(ft(v));
    if (e === "year") return D(mn(v));
    if (e === "quarter") return D(hn(v));
    if (e === "week") {
      const Q = (((O = _.value) !== null && O !== void 0 ? O : g.value.firstDayOfWeek) + 1) % 7;
      return D(tt(v, { weekStartsOn: Q }));
    }
    return D(Kt(v));
  }
  function Pe(v, O) {
    const { isDateDisabled: { value: Q } } = q;
    return Q ? Q(v, O) : false;
  }
  function ge(v) {
    const O = Ve(v, H.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (We(O)) {
      if (n.value === null) t.doUpdateValue(D(Se(Date.now())), n.panel);
      else if (!Array.isArray(n.value)) {
        const Q = xe(n.value, { year: ie(O), month: te(O), date: Le(O) });
        t.doUpdateValue(D(Se(D(Q))), n.panel);
      }
    } else E.value = v;
  }
  function dt() {
    const v = Ve(E.value, H.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (We(v)) {
      if (n.value === null) t.doUpdateValue(D(Se(Date.now())), false);
      else if (!Array.isArray(n.value)) {
        const O = xe(n.value, { year: ie(v), month: te(v), date: Le(v) });
        t.doUpdateValue(D(Se(D(O))), false);
      }
    } else B();
  }
  function re() {
    t.doUpdateValue(null, true), E.value = "", t.doClose(true), t.handleClearClick();
  }
  function ne() {
    t.doUpdateValue(D(Se(Date.now())), true);
    const v = Date.now();
    U.value = v, t.doClose(true), n.panel && (e === "month" || e === "quarter" || e === "year") && (t.disableTransitionOneTick(), Je(v));
  }
  const Me = T(null);
  function he(v) {
    v.type === "date" && e === "week" && (Me.value = Se(D(v.ts)));
  }
  function ze(v) {
    return v.type === "date" && e === "week" ? Se(D(v.ts)) === Me.value : false;
  }
  function _e(v) {
    if (Pe(v.ts, v.type === "date" ? { type: "date", year: v.dateObject.year, month: v.dateObject.month, date: v.dateObject.date } : v.type === "month" ? { type: "month", year: v.dateObject.year, month: v.dateObject.month } : v.type === "year" ? { type: "year", year: v.dateObject.year } : { type: "quarter", year: v.dateObject.year, quarter: v.dateObject.quarter })) return;
    let O;
    if (n.value !== null && !Array.isArray(n.value) ? O = n.value : O = Date.now(), e === "datetime" && n.defaultTime !== null && !Array.isArray(n.defaultTime)) {
      let Q;
      typeof n.defaultTime == "function" ? Q = $o(v.ts, n.defaultTime) : Q = qt(n.defaultTime), Q && (O = D(xe(O, Q)));
    }
    switch (O = D(v.type === "quarter" && v.dateObject.quarter ? Mo(aa(O, v.dateObject.year), v.dateObject.quarter) : xe(O, v.dateObject)), t.doUpdateValue(Se(O), n.panel || e === "date" || e === "week" || e === "year"), e) {
      case "date":
      case "week":
        t.doClose();
        break;
      case "year":
        n.panel && t.disableTransitionOneTick(), t.doClose();
        break;
      case "month":
        t.disableTransitionOneTick(), Je(O);
        break;
      case "quarter":
        t.disableTransitionOneTick(), Je(O);
        break;
    }
  }
  function wt(v, O) {
    let Q;
    n.value !== null && !Array.isArray(n.value) ? Q = n.value : Q = Date.now(), Q = D(v.type === "month" ? ka(Q, v.dateObject.month) : aa(Q, v.dateObject.year)), O(Q), Je(Q);
  }
  function $e(v) {
    U.value = v;
  }
  function B(v) {
    if (n.value === null || Array.isArray(n.value)) {
      E.value = "";
      return;
    }
    v === void 0 && (v = n.value), E.value = K(v, H.value, t.dateFnsOptions.value);
  }
  function ht() {
    q.isDateInvalid.value || q.isTimeInvalid.value || (t.doConfirm(), nt());
  }
  function nt() {
    n.active && t.doClose();
  }
  function Dt() {
    var v;
    U.value = D(ea(U.value, 1)), (v = n.onNextYear) === null || v === void 0 || v.call(n);
  }
  function kt() {
    var v;
    U.value = D(ea(U.value, -1)), (v = n.onPrevYear) === null || v === void 0 || v.call(n);
  }
  function Ct() {
    var v;
    U.value = D(Ce(U.value, 1)), (v = n.onNextMonth) === null || v === void 0 || v.call(n);
  }
  function xt() {
    var v;
    U.value = D(Ce(U.value, -1)), (v = n.onPrevMonth) === null || v === void 0 || v.call(n);
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
  function _t(v) {
    t.cachePendingValue();
    const O = t.getShortcutValue(v);
    typeof O == "number" && t.doUpdateValue(O, false);
  }
  function Tt(v) {
    const O = t.getShortcutValue(v);
    typeof O == "number" && (t.doUpdateValue(O, n.panel), t.clearPendingValue(), ht());
  }
  function Je(v) {
    const { value: O } = n;
    if (ae.value) {
      const Q = te(v === void 0 ? O === null ? Date.now() : O : v);
      ae.value.scrollTo({ top: Q * Yt });
    }
    if (be.value) {
      const Q = ie(v === void 0 ? O === null ? Date.now() : O : v) - N.value[0];
      be.value.scrollTo({ top: Q * Yt });
    }
  }
  const Ot = { monthScrollbarRef: ae, yearScrollbarRef: Xe, yearVlRef: be };
  return Object.assign(Object.assign(Object.assign(Object.assign({ dateArray: V, monthArray: C, yearArray: De, quarterArray: Ke, calendarYear: Ge, calendarMonth: Ze, weekdays: Ee, calendarMonthBeforeYear: Be, mergedIsDateDisabled: Pe, nextYear: Dt, prevYear: kt, nextMonth: Ct, prevMonth: xt, handleNowClick: ne, handleConfirmClick: ht, handleSingleShortcutMouseenter: _t, handleSingleShortcutClick: Tt }, q), t), Ot), { handleDateClick: _e, handleDateInputBlur: dt, handleDateInput: ge, handleDateMouseEnter: he, isWeekHovered: ze, handleTimePickerChange: qe, clearSelectedDateTime: re, virtualListContainer: St, virtualListContent: Mt, handleVirtualListScroll: mt, timePickerSize: t.timePickerSize, dateInputValue: E, datePickerSlots: $, handleQuickMonthClick: wt, justifyColumnsScrollState: Je, calendarValue: U, onUpdateCalendarValue: $e });
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
      var g, _;
      l.type === "year" ? (g = n.onSelectYear) === null || g === void 0 || g.call(n) : l.type === "month" && ((_ = n.onSelectMonth) === null || _ === void 0 || _.call(n)), r ? p(l, ($) => {
        n.onUpdateValue($, false);
      }) : m(l);
    } }, t(l));
  };
  return Xa(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: i });
}, render() {
  const { mergedClsPrefix: n, mergedTheme: e, shortcuts: a, actions: t, renderItem: r, type: i, onRender: l } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${n}-date-panel`, `${n}-date-panel--month`, !this.panel && `${n}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${n}-date-panel-month-calendar` }, o(st, { ref: "yearScrollbarRef", class: `${n}-date-panel-month-calendar__picker-col`, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, container: this.virtualListContainer, content: this.virtualListContent, horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "yearVlRef", items: this.yearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleVirtualListScroll, paddingBottom: 4 }, { default: ({ item: u, index: c }) => r(u, c, n) }) }), i === "month" || i === "quarter" ? o("div", { class: `${n}-date-panel-month-calendar__picker-col` }, o(st, { ref: "monthScrollbarRef", theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar }, { default: () => [(i === "month" ? this.monthArray : this.quarterArray).map((u, c) => r(u, c, n)), o("div", { class: `${n}-date-panel-${i}-calendar__padding` })] })) : null), ar(this.datePickerSlots.footer, (u) => u ? o("div", { class: `${n}-date-panel-footer` }, u) : null), (t == null ? void 0 : t.length) || a ? o("div", { class: `${n}-date-panel-actions` }, o("div", { class: `${n}-date-panel-actions__prefix` }, a && Object.keys(a).map((u) => {
    const c = a[u];
    return Array.isArray(c) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(c);
    }, onClick: () => {
      this.handleSingleShortcutClick(c);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => u });
  })), o("div", { class: `${n}-date-panel-actions__suffix` }, (t == null ? void 0 : t.includes("clear")) ? Ne(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Fe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, (t == null ? void 0 : t.includes("now")) ? Ne(this.datePickerSlots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Fe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, (t == null ? void 0 : t.includes("confirm")) ? Ne(this.datePickerSlots.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Fe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Zt = Qe({ props: { mergedClsPrefix: { type: String, required: true }, value: Number, monthBeforeYear: { type: Boolean, required: true }, monthYearSeparator: { type: String, required: true }, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarMonth: { type: String, required: true }, calendarYear: { type: String, required: true }, onUpdateValue: { type: Function, required: true } }, setup(n) {
  const e = T(null), a = T(null), t = T(false);
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
} }), Vo = Qe({ name: "DatePanel", props: Object.assign(Object.assign({}, Ca), { type: { type: String, required: true } }), setup(n) {
  return xa(n, n.type);
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u, type: c } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--${c}`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${t}-date-panel-calendar` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.prevYear }, J(u["prev-year"], () => [o(Ut, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.prevMonth }, J(u["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: t, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.nextMonth }, J(u["next-month"], () => [o(Wt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.nextYear }, J(u["next-year"], () => [o(Qt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel-dates` }, this.dateArray.map((f, m) => o("div", { "data-n-date": true, key: m, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(f.ts, { type: "date", year: f.dateObject.year, month: f.dateObject.month, date: f.dateObject.date }), [`${t}-date-panel-date--week-hovered`]: this.isWeekHovered(f), [`${t}-date-panel-date--week-selected`]: f.inSelectedWeek }], onClick: () => {
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
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.$slots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ne(this.$slots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Sa = Object.assign(Object.assign({}, kr), { defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, actions: { type: Array, default: () => ["clear", "confirm"] } });
function Ma(n, e) {
  var a, t;
  const { isDateDisabledRef: r, isStartHourDisabledRef: i, isEndHourDisabledRef: l, isStartMinuteDisabledRef: u, isEndMinuteDisabledRef: c, isStartSecondDisabledRef: f, isEndSecondDisabledRef: m, isStartDateInvalidRef: p, isEndDateInvalidRef: g, isStartTimeInvalidRef: _, isEndTimeInvalidRef: $, isStartValueInvalidRef: Z, isEndValueInvalidRef: S, isRangeInvalidRef: R, localeRef: N, rangesRef: q, closeOnSelectRef: H, updateValueOnCloseRef: F, firstDayOfWeekRef: E, datePickerSlots: U, monthFormatRef: be, yearFormatRef: Xe, quarterFormatRef: ae, yearRangeRef: we } = On(Rn), V = { isDateDisabled: r, isStartHourDisabled: i, isEndHourDisabled: l, isStartMinuteDisabled: u, isEndMinuteDisabled: c, isStartSecondDisabled: f, isEndSecondDisabled: m, isStartDateInvalid: p, isEndDateInvalid: g, isStartTimeInvalid: _, isEndTimeInvalid: $, isStartValueInvalid: Z, isEndValueInvalid: S, isRangeInvalid: R }, C = Cr(n), De = T(null), Ke = T(null), Ee = T(null), Ze = T(null), Ge = T(null), Be = T(null), Se = T(null), Pe = T(null), { value: ge } = n, dt = (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Array.isArray(ge) && typeof ge[0] == "number" ? ge[0] : Date.now(), re = T(dt), ne = T((t = n.defaultCalendarEndTime) !== null && t !== void 0 ? t : Array.isArray(ge) && typeof ge[1] == "number" ? ge[1] : D(Ce(dt, 1)));
  ke(true);
  const Me = T(Date.now()), he = T(false), ze = T(0), _e = y(() => n.dateFormat || N.value.dateFormat), wt = y(() => n.calendarDayFormat || N.value.dayFormat), $e = T(Array.isArray(ge) ? K(ge[0], _e.value, C.dateFnsOptions.value) : ""), B = T(Array.isArray(ge) ? K(ge[1], _e.value, C.dateFnsOptions.value) : ""), ht = y(() => he.value ? "end" : "start"), nt = y(() => {
    var s;
    return ra(re.value, n.value, Me.value, (s = E.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), Dt = y(() => {
    var s;
    return ra(ne.value, n.value, Me.value, (s = E.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), kt = y(() => nt.value.slice(0, 7).map((s) => {
    const { ts: w } = s;
    return K(w, wt.value, C.dateFnsOptions.value);
  })), Ct = y(() => K(re.value, n.calendarHeaderMonthFormat || N.value.monthFormat, C.dateFnsOptions.value)), xt = y(() => K(ne.value, n.calendarHeaderMonthFormat || N.value.monthFormat, C.dateFnsOptions.value)), St = y(() => K(re.value, n.calendarHeaderYearFormat || N.value.yearFormat, C.dateFnsOptions.value)), Mt = y(() => K(ne.value, n.calendarHeaderYearFormat || N.value.yearFormat, C.dateFnsOptions.value)), mt = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[0] : null;
  }), qe = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[1] : null;
  }), _t = y(() => {
    const { shortcuts: s } = n;
    return s || q.value;
  }), Tt = y(() => la(zt(n.value, "start"), Me.value, { yearFormat: Xe.value }, we)), Je = y(() => la(zt(n.value, "end"), Me.value, { yearFormat: Xe.value }, we)), Ot = y(() => {
    const s = zt(n.value, "start");
    return oa(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), v = y(() => {
    const s = zt(n.value, "end");
    return oa(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), O = y(() => {
    const s = zt(n.value, "start");
    return ia(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), Q = y(() => {
    const s = zt(n.value, "end");
    return ia(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), en = y(() => {
    var s;
    return (s = n.calendarHeaderMonthBeforeYear) !== null && s !== void 0 ? s : N.value.monthBeforeYear;
  });
  ut(y(() => n.value), (s) => {
    if (s !== null && Array.isArray(s)) {
      const [w, M] = s;
      $e.value = K(w, _e.value, C.dateFnsOptions.value), B.value = K(M, _e.value, C.dateFnsOptions.value), he.value || z(s);
    } else $e.value = "", B.value = "";
  });
  function $t(s, w) {
    (e === "daterange" || e === "datetimerange") && (ie(s) !== ie(w) || te(s) !== te(w)) && C.disableTransitionOneTick();
  }
  ut(re, $t), ut(ne, $t);
  function ke(s) {
    const w = ft(re.value), M = ft(ne.value);
    (n.bindCalendarMonths || w >= M) && (s ? ne.value = D(Ce(w, 1)) : re.value = D(Ce(M, -1)));
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
  function tn() {
    re.value = D(Ce(re.value, -1)), ke(true);
  }
  function Ie() {
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
  function x(s) {
    ne.value = s, ke(false);
  }
  function Y(s) {
    const w = r.value;
    if (!w) return false;
    if (!Array.isArray(n.value) || ht.value === "start") return w(s, "start", null);
    {
      const { value: M } = ze;
      return s < ze.value ? w(s, "start", [M, M]) : w(s, "end", [M, M]);
    }
  }
  function z(s) {
    if (s === null) return;
    const [w, M] = s;
    re.value = w, ft(M) <= ft(w) ? ne.value = D(ft(Ce(w, 1))) : ne.value = D(ft(M));
  }
  function se(s) {
    if (!he.value) he.value = true, ze.value = s.ts, A(s.ts, s.ts, "done");
    else {
      he.value = false;
      const { value: w } = n;
      n.panel && Array.isArray(w) ? A(w[0], w[1], "done") : H.value && e === "daterange" && (F.value ? d() : ye());
    }
  }
  function Re(s) {
    if (he.value) {
      if (Y(s.ts)) return;
      s.ts >= ze.value ? A(ze.value, s.ts, "wipPreview") : A(s.ts, ze.value, "wipPreview");
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
  function A(s, w, M) {
    if (typeof s != "number" && (s = D(s)), M !== "shortcutPreview" && M !== "shortcutDone") {
      let ve, et;
      if (e === "datetimerange") {
        const { defaultTime: ee } = n;
        typeof ee == "function" ? (ve = Ia(s, ee, "start", [s, w]), et = Ia(w, ee, "end", [s, w])) : Array.isArray(ee) ? (ve = qt(ee[0]), et = qt(ee[1])) : (ve = qt(ee), et = ve);
      }
      ve && (s = D(xe(s, ve))), et && (w = D(xe(w, et)));
    }
    C.doUpdateValue([s, w], n.panel && (M === "done" || M === "shortcutDone"));
  }
  function G(s) {
    return D(e === "datetimerange" ? Da(s) : e === "monthrange" ? ft(s) : Kt(s));
  }
  function Te(s) {
    const w = Ve(s, _e.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (We(w)) if (n.value) {
      if (Array.isArray(n.value)) {
        const M = xe(n.value[0], { year: ie(w), month: te(w), date: Le(w) });
        b(G(D(M)));
      }
    } else {
      const M = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
      b(G(D(M)));
    }
    else $e.value = s;
  }
  function ue(s) {
    const w = Ve(s, _e.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (We(w)) {
      if (n.value === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
        k(G(D(M)));
      } else if (Array.isArray(n.value)) {
        const M = xe(n.value[1], { year: ie(w), month: te(w), date: Le(w) });
        k(G(D(M)));
      }
    } else B.value = s;
  }
  function nn() {
    const s = Ve($e.value, _e.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        b(G(D(M)));
      } else if (Array.isArray(w)) {
        const M = xe(w[0], { year: ie(s), month: te(s), date: Le(s) });
        b(G(D(M)));
      }
    } else Vt();
  }
  function an() {
    const s = Ve(B.value, _e.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        k(G(D(M)));
      } else if (Array.isArray(w)) {
        const M = xe(w[1], { year: ie(s), month: te(s), date: Le(s) });
        k(G(D(M)));
      }
    } else Vt();
  }
  function Vt(s) {
    const { value: w } = n;
    if (w === null || !Array.isArray(w)) {
      $e.value = "", B.value = "";
      return;
    }
    s === void 0 && (s = w), $e.value = K(s[0], _e.value, C.dateFnsOptions.value), B.value = K(s[1], _e.value, C.dateFnsOptions.value);
  }
  function rn(s) {
    s !== null && b(s);
  }
  function on(s) {
    s !== null && k(s);
  }
  function ln(s) {
    C.cachePendingValue();
    const w = C.getShortcutValue(s);
    Array.isArray(w) && A(w[0], w[1], "shortcutPreview");
  }
  function sn(s) {
    const w = C.getShortcutValue(s);
    Array.isArray(w) && (A(w[0], w[1], "shortcutDone"), C.clearPendingValue(), ye());
  }
  function it(s, w) {
    const M = s === void 0 ? n.value : s;
    if (s === void 0 || w === "start") {
      if (Se.value) {
        const ve = Array.isArray(M) ? te(M[0]) : te(Date.now());
        Se.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Ge.value) {
        const ve = (Array.isArray(M) ? ie(M[0]) : ie(Date.now())) - we.value[0];
        Ge.value.scrollTo({ index: ve, debounce: false });
      }
    }
    if (s === void 0 || w === "end") {
      if (Pe.value) {
        const ve = Array.isArray(M) ? te(M[1]) : te(Date.now());
        Pe.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Be.value) {
        const ve = (Array.isArray(M) ? ie(M[1]) : ie(Date.now())) - we.value[0];
        Be.value.scrollTo({ index: ve, debounce: false });
      }
    }
  }
  function Yn(s, w) {
    const { value: M } = n, ve = !Array.isArray(M), et = s.type === "year" && e !== "yearrange" ? ve ? xe(s.ts, { month: te(e === "quarterrange" ? hn(/* @__PURE__ */ new Date()) : /* @__PURE__ */ new Date()) }).valueOf() : xe(s.ts, { month: te(e === "quarterrange" ? hn(M[w === "start" ? 0 : 1]) : M[w === "start" ? 0 : 1]) }).valueOf() : s.ts;
    if (ve) {
      const pn = G(et), dn = [pn, pn];
      C.doUpdateValue(dn, n.panel), it(dn, "start"), it(dn, "end"), C.disableTransitionOneTick();
      return;
    }
    const ee = [M[0], M[1]];
    let un = false;
    switch (w === "start" ? (ee[0] = G(et), ee[0] > ee[1] && (ee[1] = ee[0], un = true)) : (ee[1] = G(et), ee[0] > ee[1] && (ee[0] = ee[1], un = true)), C.doUpdateValue(ee, n.panel), e) {
      case "monthrange":
      case "quarterrange":
        C.disableTransitionOneTick(), un ? (it(ee, "start"), it(ee, "end")) : it(ee, w);
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
    var w, M;
    return s === "start" ? ((w = Ge.value) === null || w === void 0 ? void 0 : w.listElRef) || null : ((M = Be.value) === null || M === void 0 ? void 0 : M.listElRef) || null;
  }
  function Vn(s) {
    var w, M;
    return s === "start" ? ((w = Ge.value) === null || w === void 0 ? void 0 : w.itemsElRef) || null : ((M = Be.value) === null || M === void 0 ? void 0 : M.itemsElRef) || null;
  }
  const Nn = { startYearVlRef: Ge, endYearVlRef: Be, startMonthScrollbarRef: Se, endMonthScrollbarRef: Pe, startYearScrollbarRef: Ee, endYearScrollbarRef: Ze };
  return Object.assign(Object.assign(Object.assign(Object.assign({ startDatesElRef: De, endDatesElRef: Ke, handleDateClick: se, handleColItemClick: Yn, handleDateMouseEnter: Re, handleConfirmClick: ye, startCalendarPrevYear: vt, startCalendarPrevMonth: tn, startCalendarNextYear: je, startCalendarNextMonth: pt, endCalendarPrevYear: at, endCalendarPrevMonth: rt, endCalendarNextMonth: It, endCalendarNextYear: Ie, mergedIsDateDisabled: Y, changeStartEndTime: A, ranges: q, calendarMonthBeforeYear: en, startCalendarMonth: Ct, startCalendarYear: St, endCalendarMonth: xt, endCalendarYear: Mt, weekdays: kt, startDateArray: nt, endDateArray: Dt, startYearArray: Tt, startMonthArray: O, startQuarterArray: Ot, endYearArray: Je, endMonthArray: Q, endQuarterArray: v, isSelecting: he, handleRangeShortcutMouseenter: ln, handleRangeShortcutClick: sn }, C), V), Nn), { startDateDisplayString: $e, endDateInput: B, timePickerSize: C.timePickerSize, startTimeValue: mt, endTimeValue: qe, datePickerSlots: U, shortcuts: _t, startCalendarDateTime: re, endCalendarDateTime: ne, justifyColumnsScrollState: it, handleFocusDetectorFocus: C.handleFocusDetectorFocus, handleStartTimePickerChange: rn, handleEndTimePickerChange: on, handleStartDateInput: Te, handleStartDateInputBlur: nn, handleEndDateInput: ue, handleEndDateInputBlur: an, handleStartYearVlScroll: An, handleEndYearVlScroll: $n, virtualListContainer: In, virtualListContent: Vn, onUpdateStartCalendarValue: h, onUpdateEndCalendarValue: x });
}
const No = Qe({ name: "DateRangePanel", props: Sa, setup(n) {
  return Ma(n, "daterange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, J(u["prev-year"], () => [o(Ut, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, J(u["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, J(u["next-month"], () => [o(Wt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, J(u["next-year"], () => [o(Qt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((c) => o("div", { key: c, class: `${t}-date-panel-weekdays__day` }, c))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((c, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !c.inCurrentMonth, [`${t}-date-panel-date--current`]: c.isCurrentDate, [`${t}-date-panel-date--selected`]: c.selected, [`${t}-date-panel-date--covered`]: c.inSpan, [`${t}-date-panel-date--start`]: c.startOfSpan, [`${t}-date-panel-date--end`]: c.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(c.ts) }], onClick: () => {
    this.handleDateClick(c);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(c);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), c.dateObject.date, c.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, J(u["prev-year"], () => [o(Ut, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, J(u["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, J(u["next-month"], () => [o(Wt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, J(u["next-year"], () => [o(Qt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((c) => o("div", { key: c, class: `${t}-date-panel-weekdays__day` }, c))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((c, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !c.inCurrentMonth, [`${t}-date-panel-date--current`]: c.isCurrentDate, [`${t}-date-panel-date--selected`]: c.selected, [`${t}-date-panel-date--covered`]: c.inSpan, [`${t}-date-panel-date--start`]: c.startOfSpan, [`${t}-date-panel-date--end`]: c.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(c.ts) }], onClick: () => {
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
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(u.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(u.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} });
function Va(n, e, a) {
  const t = fr(), r = Eo(n, a.timeZone, a.locale ?? t.locale);
  return "formatToParts" in r ? zo(r, e) : Ho(r, e);
}
function zo(n, e) {
  const a = n.formatToParts(e);
  for (let t = a.length - 1; t >= 0; --t) if (a[t].type === "timeZoneName") return a[t].value;
}
function Ho(n, e) {
  const a = n.format(e).replace(/\u200E/g, ""), t = / [\w-+ ]+$/.exec(a);
  return t ? t[0].substr(1) : "";
}
function Eo(n, e, a) {
  return new Intl.DateTimeFormat(a ? [a.code, "en-US"] : void 0, { timeZone: e, timeZoneName: n });
}
function Bo(n, e) {
  const a = Wo(e);
  return "formatToParts" in a ? jo(a, n) : Uo(a, n);
}
const qo = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
function jo(n, e) {
  try {
    const a = n.formatToParts(e), t = [];
    for (let r = 0; r < a.length; r++) {
      const i = qo[a[r].type];
      i !== void 0 && (t[i] = parseInt(a[r].value, 10));
    }
    return t;
  } catch (a) {
    if (a instanceof RangeError) return [NaN];
    throw a;
  }
}
function Uo(n, e) {
  const a = n.format(e), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [parseInt(t[3], 10), parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[4], 10), parseInt(t[5], 10), parseInt(t[6], 10)];
}
const Un = {}, Na = new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Lo = Na === "06/25/2014, 00:00:00" || Na === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
function Wo(n) {
  return Un[n] || (Un[n] = Lo ? new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })), Un[n];
}
function Sr(n, e, a, t, r, i, l) {
  const u = /* @__PURE__ */ new Date(0);
  return u.setUTCFullYear(n, e, a), u.setUTCHours(t, r, i, l), u;
}
const za = 36e5, Qo = 6e4, Ln = { timezoneZ: /^(Z)$/, timezoneHH: /^([+-]\d{2})$/, timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/ };
function _a(n, e, a) {
  if (!n) return 0;
  let t = Ln.timezoneZ.exec(n);
  if (t) return 0;
  let r, i;
  if (t = Ln.timezoneHH.exec(n), t) return r = parseInt(t[1], 10), Ha(r) ? -(r * za) : NaN;
  if (t = Ln.timezoneHHMM.exec(n), t) {
    r = parseInt(t[2], 10);
    const l = parseInt(t[3], 10);
    return Ha(r, l) ? (i = Math.abs(r) * za + l * Qo, t[1] === "+" ? -i : i) : NaN;
  }
  if (Zo(n)) {
    e = new Date(e || Date.now());
    const l = a ? e : Xo(e), u = sa(l, n);
    return -(a ? u : Ko(e, u, n));
  }
  return NaN;
}
function Xo(n) {
  return Sr(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());
}
function sa(n, e) {
  const a = Bo(n, e), t = Sr(a[0], a[1] - 1, a[2], a[3] % 24, a[4], a[5], 0).getTime();
  let r = n.getTime();
  const i = r % 1e3;
  return r -= i >= 0 ? i : 1e3 + i, t - r;
}
function Ko(n, e, a) {
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
function Zo(n) {
  if (Ea[n]) return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: n }), Ea[n] = true, true;
  } catch {
    return false;
  }
}
const Go = 60 * 1e3, Jo = { X: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  if (t === 0) return "Z";
  switch (e) {
    case "X":
      return Ba(t);
    case "XXXX":
    case "XX":
      return Et(t);
    case "XXXXX":
    case "XXX":
    default:
      return Et(t, ":");
  }
}, x: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  switch (e) {
    case "x":
      return Ba(t);
    case "xxxx":
    case "xx":
      return Et(t);
    case "xxxxx":
    case "xxx":
    default:
      return Et(t, ":");
  }
}, O: function(n, e, a) {
  const t = Wn(a.timeZone, n);
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + el(t, ":");
    case "OOOO":
    default:
      return "GMT" + Et(t, ":");
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
  const a = n ? _a(n, e, true) / Go : (e == null ? void 0 : e.getTimezoneOffset()) ?? 0;
  if (Number.isNaN(a)) throw new RangeError("Invalid time zone specified: " + n);
  return a;
}
function Tn(n, e) {
  const a = n < 0 ? "-" : "";
  let t = Math.abs(n).toString();
  for (; t.length < e; ) t = "0" + t;
  return a + t;
}
function Et(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Tn(Math.floor(t / 60), 2), i = Tn(Math.floor(t % 60), 2);
  return a + r + e + i;
}
function Ba(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + Tn(Math.abs(n) / 60, 2) : Et(n, e);
}
function el(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.floor(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + Tn(i, 2);
}
function qa(n) {
  const e = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
  return e.setUTCFullYear(n.getFullYear()), +n - +e;
}
const tl = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Qn = 36e5, ja = 6e4, nl = 2, Ae = { dateTimePattern: /^([0-9W+-]+)(T| )(.*)/, datePattern: /^([0-9W+-]+)(.*)/, YY: /^(\d{2})$/, YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/], YYYY: /^(\d{4})/, YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/], MM: /^-(\d{2})$/, DDD: /^-?(\d{3})$/, MMDD: /^-?(\d{2})-?(\d{2})$/, Www: /^-?W(\d{2})$/, WwwD: /^-?W(\d{2})-?(\d{1})$/, HH: /^(\d{2}([.,]\d*)?)$/, HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/, HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/, timeZone: tl };
function Mr(n, e = {}) {
  if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (n === null) return /* @__PURE__ */ new Date(NaN);
  const a = e.additionalDigits == null ? nl : Number(e.additionalDigits);
  if (a !== 2 && a !== 1 && a !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]") return new Date(n.getTime());
  if (typeof n == "number" || Object.prototype.toString.call(n) === "[object Number]") return new Date(n);
  if (Object.prototype.toString.call(n) !== "[object String]") return /* @__PURE__ */ new Date(NaN);
  const t = al(n), { year: r, restDateString: i } = rl(t.date, a), l = il(i, r);
  if (l === null || isNaN(l.getTime())) return /* @__PURE__ */ new Date(NaN);
  if (l) {
    const u = l.getTime();
    let c = 0, f;
    if (t.time && (c = ol(t.time), c === null || isNaN(c))) return /* @__PURE__ */ new Date(NaN);
    if (t.timeZone || e.timeZone) {
      if (f = _a(t.timeZone || e.timeZone, new Date(u + c)), isNaN(f)) return /* @__PURE__ */ new Date(NaN);
    } else f = qa(new Date(u + c)), f = qa(new Date(u + c + f));
    return new Date(u + c + f);
  } else return /* @__PURE__ */ new Date(NaN);
}
function al(n) {
  const e = {};
  let a = Ae.dateTimePattern.exec(n), t;
  if (a ? (e.date = a[1], t = a[3]) : (a = Ae.datePattern.exec(n), a ? (e.date = a[1], t = a[2]) : (e.date = null, t = n)), t) {
    const r = Ae.timeZone.exec(t);
    r ? (e.time = t.replace(r[1], ""), e.timeZone = r[1].trim()) : e.time = t;
  }
  return e;
}
function rl(n, e) {
  if (n) {
    const a = Ae.YYY[e], t = Ae.YYYYY[e];
    let r = Ae.YYYY.exec(n) || t.exec(n);
    if (r) {
      const i = r[1];
      return { year: parseInt(i, 10), restDateString: n.slice(i.length) };
    }
    if (r = Ae.YY.exec(n) || a.exec(n), r) {
      const i = r[1];
      return { year: parseInt(i, 10) * 100, restDateString: n.slice(i.length) };
    }
  }
  return { year: null };
}
function il(n, e) {
  if (e === null) return null;
  let a, t, r;
  if (!n || !n.length) return a = /* @__PURE__ */ new Date(0), a.setUTCFullYear(e), a;
  let i = Ae.MM.exec(n);
  if (i) return a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1, La(e, t) ? (a.setUTCFullYear(e, t), a) : /* @__PURE__ */ new Date(NaN);
  if (i = Ae.DDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0);
    const l = parseInt(i[1], 10);
    return ul(e, l) ? (a.setUTCFullYear(e, 0, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ae.MMDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10);
    return La(e, t, l) ? (a.setUTCFullYear(e, t, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ae.Www.exec(n), i) return r = parseInt(i[1], 10) - 1, Wa(r) ? Ua(e, r) : /* @__PURE__ */ new Date(NaN);
  if (i = Ae.WwwD.exec(n), i) {
    r = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10) - 1;
    return Wa(r, l) ? Ua(e, r, l) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function ol(n) {
  let e, a, t = Ae.HH.exec(n);
  if (t) return e = parseFloat(t[1].replace(",", ".")), Xn(e) ? e % 24 * Qn : NaN;
  if (t = Ae.HHMM.exec(n), t) return e = parseInt(t[1], 10), a = parseFloat(t[2].replace(",", ".")), Xn(e, a) ? e % 24 * Qn + a * ja : NaN;
  if (t = Ae.HHMMSS.exec(n), t) {
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
const ll = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], sl = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function _r(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
function La(n, e, a) {
  if (e < 0 || e > 11) return false;
  if (a != null) {
    if (a < 1) return false;
    const t = _r(n);
    if (t && a > sl[e] || !t && a > ll[e]) return false;
  }
  return true;
}
function ul(n, e) {
  if (e < 1) return false;
  const a = _r(n);
  return !(a && e > 366 || !a && e > 365);
}
function Wa(n, e) {
  return !(n < 0 || n > 52 || e != null && (e < 0 || e > 6));
}
function Xn(n, e, a) {
  return !(n < 0 || n >= 25 || e != null && (e < 0 || e >= 60) || a != null && (a < 0 || a >= 60));
}
const dl = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
function cl(n, e, a = {}) {
  e = String(e);
  const t = e.match(dl);
  if (t) {
    const r = Mr(a.originalDate || n, a);
    e = t.reduce(function(i, l) {
      if (l[0] === "'") return i;
      const u = i.indexOf(l), c = i[u - 1] === "'", f = i.replace(l, "'" + Jo[l[0]](r, l, a) + "'");
      return c ? f.substring(0, u - 1) + f.substring(u + 1) : f;
    }, e);
  }
  return K(n, e, a);
}
function fl(n, e, a) {
  n = Mr(n, a);
  const t = _a(e, n, true), r = new Date(n.getTime() - t), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), i.setHours(r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds()), i;
}
function hl(n, e, a, t) {
  return t = { ...t, timeZone: e, originalDate: n }, cl(fl(n, e, { timeZone: t.timeZone }), a, t);
}
const Tr = Qa("n-time-picker"), yn = Qe({ name: "TimePickerPanelCol", props: { clsPrefix: { type: String, required: true }, data: { type: Array, required: true }, activeValue: { type: [Number, String], default: null }, onItemClick: Function }, render() {
  const { activeValue: n, onItemClick: e, clsPrefix: a } = this;
  return this.data.map((t) => {
    const { label: r, disabled: i, value: l } = t, u = n === l;
    return o("div", { key: r, "data-active": u ? "" : null, class: [`${a}-time-picker-col__item`, u && `${a}-time-picker-col__item--active`, i && `${a}-time-picker-col__item--disabled`], onClick: e && !i ? () => {
      e(l);
    } : void 0 }, r);
  });
} }), cn = { amHours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], pmHours: ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], hours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], minutes: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], seconds: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], period: ["AM", "PM"] };
function Kn(n) {
  return `00${n}`.slice(-2);
}
function fn(n, e, a) {
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
function ml(n, e, a) {
  const t = fn(cn[e], a).map(Number);
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
function vl(n) {
  return yt(n) < 12 ? "am" : "pm";
}
const pl = { actions: { type: Array, default: () => ["now", "confirm"] }, showHour: { type: Boolean, default: true }, showMinute: { type: Boolean, default: true }, showSecond: { type: Boolean, default: true }, showPeriod: { type: Boolean, default: true }, isHourInvalid: Boolean, isMinuteInvalid: Boolean, isSecondInvalid: Boolean, isAmPmInvalid: Boolean, isValueInvalid: Boolean, hourValue: { type: Number, default: null }, minuteValue: { type: Number, default: null }, secondValue: { type: Number, default: null }, amPmValue: { type: String, default: null }, isHourDisabled: Function, isMinuteDisabled: Function, isSecondDisabled: Function, onHourClick: { type: Function, required: true }, onMinuteClick: { type: Function, required: true }, onSecondClick: { type: Function, required: true }, onAmPmClick: { type: Function, required: true }, onNowClick: Function, clearText: String, nowText: String, confirmText: String, transitionDisabled: Boolean, onClearClick: Function, onConfirmClick: Function, onFocusin: Function, onFocusout: Function, onFocusDetectorFocus: Function, onKeydown: Function, hours: [Number, Array], minutes: [Number, Array], seconds: [Number, Array], use12Hours: Boolean }, gl = Qe({ name: "TimePickerPanel", props: pl, setup(n) {
  const { mergedThemeRef: e, mergedClsPrefixRef: a } = On(Tr), t = y(() => {
    const { isHourDisabled: u, hours: c, use12Hours: f, amPmValue: m } = n;
    if (f) {
      const p = m ?? vl(Date.now());
      return fn(cn.hours, c, p).map((g) => {
        const _ = Number(g), $ = p === "pm" && _ !== 12 ? _ + 12 : _;
        return { label: g, value: $, disabled: u ? u($) : false };
      });
    } else return fn(cn.hours, c).map((p) => ({ label: p, value: Number(p), disabled: u ? u(Number(p)) : false }));
  }), r = y(() => {
    const { isMinuteDisabled: u, minutes: c } = n;
    return fn(cn.minutes, c).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.hourValue) : false }));
  }), i = y(() => {
    const { isSecondDisabled: u, seconds: c } = n;
    return fn(cn.seconds, c).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.minuteValue, n.hourValue) : false }));
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
  return { mergedTheme: e, mergedClsPrefix: a, hours: t, minutes: r, seconds: i, amPm: l, hourScrollRef: T(null), minuteScrollRef: T(null), secondScrollRef: T(null), amPmScrollRef: T(null) };
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i } = this;
  return o("div", { tabindex: 0, class: `${r}-time-picker-panel`, onFocusin: this.onFocusin, onFocusout: this.onFocusout, onKeydown: this.onKeydown }, o("div", { class: `${r}-time-picker-cols` }, this.showHour ? o("div", { class: [`${r}-time-picker-col`, this.isHourInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "hourScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.hours, activeValue: this.hourValue, onItemClick: this.onHourClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showMinute ? o("div", { class: [`${r}-time-picker-col`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`, this.isMinuteInvalid && `${r}-time-picker-col--invalid`] }, o(st, { ref: "minuteScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.minutes, activeValue: this.minuteValue, onItemClick: this.onMinuteClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showSecond ? o("div", { class: [`${r}-time-picker-col`, this.isSecondInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "secondScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.seconds, activeValue: this.secondValue, onItemClick: this.onSecondClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.use12Hours ? o("div", { class: [`${r}-time-picker-col`, this.isAmPmInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "amPmScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.amPm, activeValue: this.amPmValue, onItemClick: this.onAmPmClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null), !((n = this.actions) === null || n === void 0) && n.length ? o("div", { class: `${r}-time-picker-actions` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? o(Fe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.onClearClick }, { default: () => this.clearText }) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? o(Fe, { size: "tiny", theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, onClick: this.onNowClick }, { default: () => this.nowText }) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? o(Fe, { size: "tiny", type: "primary", class: `${r}-time-picker-actions__confirm`, theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, disabled: this.isValueInvalid, onClick: this.onConfirmClick }, { default: () => this.confirmText }) : null) : null, o(At, { onFocus: this.onFocusDetectorFocus }));
} }), yl = I([L("time-picker", `
 z-index: auto;
 position: relative;
 `, [L("time-picker-icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), j("disabled", [L("time-picker-icon", `
 color: var(--n-icon-color-disabled-override);
 `)])]), L("time-picker-panel", `
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
 `, [tr(), L("time-picker-actions", `
 padding: var(--n-panel-action-padding);
 align-items: center;
 display: flex;
 justify-content: space-evenly;
 `), L("time-picker-cols", `
 height: calc(var(--n-item-height) * 6);
 display: flex;
 position: relative;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-panel-divider-color);
 `), L("time-picker-col", `
 flex-grow: 1;
 min-width: var(--n-item-width);
 height: calc(var(--n-item-height) * 6);
 flex-direction: column;
 transition: box-shadow .3s var(--n-bezier);
 `, [j("transition-disabled", [me("item", "transition: none;", [I("&::before", "transition: none;")])]), me("padding", `
 height: calc(var(--n-item-height) * 5);
 `), I("&:first-child", "min-width: calc(var(--n-item-width) + 4px);", [me("item", [I("&::before", "left: 4px;")])]), me("item", `
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
 `, [I("&::before", `
 content: "";
 transition: background-color .3s var(--n-bezier);
 z-index: -1;
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-item-border-radius);
 `), Ht("disabled", [I("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `)]), j("active", `
 color: var(--n-item-text-color-active);
 `, [I("&::before", `
 background-color: var(--n-item-color-hover);
 `)]), j("disabled", `
 opacity: var(--n-item-opacity-disabled);
 cursor: not-allowed;
 `)]), j("invalid", [me("item", [j("active", `
 text-decoration: line-through;
 text-decoration-color: var(--n-item-text-color-active);
 `)])])])])]);
function Zn(n, e) {
  return n === void 0 ? true : Array.isArray(n) ? n.every((a) => a >= 0 && a <= e) : n >= 0 && n <= e;
}
const bl = Object.assign(Object.assign({}, Fn.props), { to: jt.propTo, bordered: { type: Boolean, default: void 0 }, actions: Array, defaultValue: { type: Number, default: null }, defaultFormattedValue: String, placeholder: String, placement: { type: String, default: "bottom-start" }, value: Number, format: { type: String, default: "HH:mm:ss" }, valueFormat: String, formattedValue: String, isHourDisabled: Function, size: String, isMinuteDisabled: Function, isSecondDisabled: Function, inputReadonly: Boolean, clearable: Boolean, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:formattedValue": [Function, Array], onBlur: [Function, Array], onConfirm: [Function, Array], onClear: Function, onFocus: [Function, Array], timeZone: String, showIcon: { type: Boolean, default: true }, disabled: { type: Boolean, default: void 0 }, show: { type: Boolean, default: void 0 }, hours: { type: [Number, Array], validator: (n) => Zn(n, 23) }, minutes: { type: [Number, Array], validator: (n) => Zn(n, 59) }, seconds: { type: [Number, Array], validator: (n) => Zn(n, 59) }, use12Hours: Boolean, stateful: { type: Boolean, default: true }, onChange: [Function, Array] }), ua = Qe({ name: "TimePicker", props: bl, setup(n) {
  const { mergedBorderedRef: e, mergedClsPrefixRef: a, namespaceRef: t, inlineThemeDisabled: r, mergedComponentPropsRef: i } = Ka(n), { localeRef: l, dateLocaleRef: u } = Pn("TimePicker"), c = rr(n, { mergedSize: (d) => {
    var b, k;
    const { size: A } = n;
    if (A) return A;
    const { mergedSize: G } = d || {};
    if (G == null ? void 0 : G.value) return G.value;
    const Te = (k = (b = i == null ? void 0 : i.value) === null || b === void 0 ? void 0 : b.TimePicker) === null || k === void 0 ? void 0 : k.size;
    return Te || "medium";
  } }), { mergedSizeRef: f, mergedDisabledRef: m, mergedStatusRef: p } = c, g = Fn("TimePicker", "-time-picker", yl, zr, n, a), _ = er(), $ = T(null), Z = T(null), S = y(() => ({ locale: u.value.locale }));
  function R(d) {
    return d === null ? null : Ve(d, n.valueFormat || n.format, /* @__PURE__ */ new Date(), S.value).getTime();
  }
  const { defaultValue: N, defaultFormattedValue: q } = n, H = T(q !== void 0 ? R(q) : N), F = y(() => {
    const { formattedValue: d } = n;
    if (d !== void 0) return R(d);
    const { value: b } = n;
    return b !== void 0 ? b : H.value;
  }), E = y(() => {
    const { timeZone: d } = n;
    return d ? (b, k, A) => hl(b, d, k, A) : (b, k, A) => K(b, k, A);
  }), U = T("");
  ut(() => n.timeZone, () => {
    const d = F.value;
    U.value = d === null ? "" : E.value(d, n.format, S.value);
  }, { immediate: true });
  const be = T(false), Xe = Ue(n, "show"), ae = Jn(Xe, be), we = T(F.value), V = T(false), C = y(() => l.value.clear), De = y(() => l.value.now), Ke = y(() => n.placeholder !== void 0 ? n.placeholder : l.value.placeholder), Ee = y(() => l.value.negativeText), Ze = y(() => l.value.positiveText), Ge = y(() => /H|h|K|k/.test(n.format)), Be = y(() => n.format.includes("m")), Se = y(() => n.format.includes("s")), Pe = y(() => {
    const { value: d } = F;
    return d === null ? null : Number(E.value(d, "HH", S.value));
  }), ge = y(() => {
    const { value: d } = F;
    return d === null ? null : Number(E.value(d, "mm", S.value));
  }), dt = y(() => {
    const { value: d } = F;
    return d === null ? null : Number(E.value(d, "ss", S.value));
  }), re = y(() => {
    const { isHourDisabled: d } = n;
    return Pe.value === null ? false : bn(Pe.value, "hours", n.hours) ? d ? d(Pe.value) : false : true;
  }), ne = y(() => {
    const { value: d } = ge, { value: b } = Pe;
    if (d === null || b === null) return false;
    if (!bn(d, "minutes", n.minutes)) return true;
    const { isMinuteDisabled: k } = n;
    return k ? k(d, b) : false;
  }), Me = y(() => {
    const { value: d } = ge, { value: b } = Pe, { value: k } = dt;
    if (k === null || d === null || b === null) return false;
    if (!bn(k, "seconds", n.seconds)) return true;
    const { isSecondDisabled: A } = n;
    return A ? A(k, d, b) : false;
  }), he = y(() => re.value || ne.value || Me.value), ze = y(() => n.format.length + 4), _e = y(() => {
    const { value: d } = F;
    return d === null ? null : yt(d) < 12 ? "am" : "pm";
  });
  function wt(d, b) {
    const { onUpdateFormattedValue: k, "onUpdate:formattedValue": A } = n;
    k && pe(k, d, b), A && pe(A, d, b);
  }
  function $e(d) {
    return d === null ? null : E.value(d, n.valueFormat || n.format);
  }
  function B(d) {
    const { onUpdateValue: b, "onUpdate:value": k, onChange: A } = n, { nTriggerFormChange: G, nTriggerFormInput: Te } = c, ue = $e(d);
    b && pe(b, d, ue), k && pe(k, d, ue), A && pe(A, d, ue), wt(ue, d), H.value = d, G(), Te();
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
    d && pe(d, F.value, $e(F.value));
  }
  function kt(d) {
    var b;
    d.stopPropagation(), B(null), v(null), (b = n.onClear) === null || b === void 0 || b.call(n);
  }
  function Ct() {
    Ie({ returnFocus: true });
  }
  function xt() {
    B(null), v(null), Ie({ returnFocus: true });
  }
  function St(d) {
    d.key === "Escape" && ae.value && Cn(d);
  }
  function Mt(d) {
    var b;
    switch (d.key) {
      case "Escape":
        ae.value && (Cn(d), Ie({ returnFocus: true }));
        break;
      case "Tab":
        _.shift && d.target === ((b = Z.value) === null || b === void 0 ? void 0 : b.$el) && (d.preventDefault(), Ie({ returnFocus: true }));
        break;
    }
  }
  function mt() {
    V.value = true, wn(() => {
      V.value = false;
    });
  }
  function qe(d) {
    m.value || nr(d, "clear") || ae.value || pt();
  }
  function _t(d) {
    typeof d != "string" && (F.value === null ? B(D(Ft(xo(/* @__PURE__ */ new Date()), d))) : B(D(Ft(F.value, d))));
  }
  function Tt(d) {
    typeof d != "string" && (F.value === null ? B(D(Bn(So(/* @__PURE__ */ new Date()), d))) : B(D(Bn(F.value, d))));
  }
  function Je(d) {
    typeof d != "string" && (F.value === null ? B(D(qn(Da(/* @__PURE__ */ new Date()), d))) : B(D(qn(F.value, d))));
  }
  function Ot(d) {
    const { value: b } = F;
    if (b === null) {
      const k = /* @__PURE__ */ new Date(), A = yt(k);
      d === "pm" && A < 12 ? B(D(Ft(k, A + 12))) : d === "am" && A >= 12 && B(D(Ft(k, A - 12))), B(D(k));
    } else {
      const k = yt(b);
      d === "pm" && k < 12 ? B(D(Ft(b, k + 12))) : d === "am" && k >= 12 && B(D(Ft(b, k - 12)));
    }
  }
  function v(d) {
    d === void 0 && (d = F.value), d === null ? U.value = "" : U.value = E.value(d, n.format, S.value);
  }
  function O(d) {
    vt(d) || ht(d);
  }
  function Q(d) {
    var b;
    if (!vt(d)) if (ae.value) {
      const k = (b = Z.value) === null || b === void 0 ? void 0 : b.$el;
      (k == null ? void 0 : k.contains(d.relatedTarget)) || (v(), nt(d), Ie({ returnFocus: false }));
    } else v(), nt(d);
  }
  function en() {
    m.value || ae.value || pt();
  }
  function $t() {
    m.value || (v(), Ie({ returnFocus: false }));
  }
  function ke() {
    if (!Z.value) return;
    const { hourScrollRef: d, minuteScrollRef: b, secondScrollRef: k, amPmScrollRef: A } = Z.value;
    [d, b, k, A].forEach((G) => {
      var Te;
      if (!G) return;
      const ue = (Te = G.contentRef) === null || Te === void 0 ? void 0 : Te.querySelector("[data-active]");
      ue && G.scrollTo({ top: ue.offsetTop });
    });
  }
  function je(d) {
    be.value = d;
    const { onUpdateShow: b, "onUpdate:show": k } = n;
    b && pe(b, d), k && pe(k, d);
  }
  function vt(d) {
    var b, k, A;
    return !!(!((k = (b = $.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || k === void 0) && k.contains(d.relatedTarget) || !((A = Z.value) === null || A === void 0) && A.$el.contains(d.relatedTarget));
  }
  function pt() {
    we.value = F.value, je(true), wn(ke);
  }
  function tn(d) {
    var b, k;
    ae.value && !(!((k = (b = $.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || k === void 0) && k.contains(ha(d))) && Ie({ returnFocus: false });
  }
  function Ie({ returnFocus: d }) {
    var b;
    ae.value && (je(false), d && ((b = $.value) === null || b === void 0 || b.focus()));
  }
  function at(d) {
    if (d === "") {
      B(null);
      return;
    }
    const b = Ve(d, n.format, /* @__PURE__ */ new Date(), S.value);
    if (U.value = d, We(b)) {
      const { value: k } = F;
      if (k !== null) {
        const A = xe(k, { hours: yt(b), minutes: Sn(b), seconds: Mn(b), milliseconds: Mi(b) });
        B(D(A));
      } else B(D(b));
    }
  }
  function It() {
    B(we.value), je(false);
  }
  function rt() {
    const d = /* @__PURE__ */ new Date(), b = { hours: yt, minutes: Sn, seconds: Mn }, [k, A, G] = ["hours", "minutes", "seconds"].map((ue) => !n[ue] || bn(b[ue](d), ue, n[ue]) ? b[ue](d) : ml(b[ue](d), ue, n[ue])), Te = qn(Bn(Ft(F.value ? F.value : D(d), k), A), G);
    B(D(Te));
  }
  function h() {
    v(), Dt(), Ie({ returnFocus: true });
  }
  function x(d) {
    vt(d) || (v(), nt(d), Ie({ returnFocus: false }));
  }
  ut(F, (d) => {
    v(d), mt(), wn(ke);
  }), ut(ae, () => {
    he.value && B(we.value);
  }), Ga(Tr, { mergedThemeRef: g, mergedClsPrefixRef: a });
  const Y = { focus: () => {
    var d;
    (d = $.value) === null || d === void 0 || d.focus();
  }, blur: () => {
    var d;
    (d = $.value) === null || d === void 0 || d.blur();
  } }, z = y(() => {
    const { common: { cubicBezierEaseInOut: d }, self: { iconColor: b, iconColorDisabled: k } } = g.value;
    return { "--n-icon-color-override": b, "--n-icon-color-disabled-override": k, "--n-bezier": d };
  }), se = r ? kn("time-picker-trigger", void 0, z, n) : void 0, Re = y(() => {
    const { self: { panelColor: d, itemTextColor: b, itemTextColorActive: k, itemColorHover: A, panelDividerColor: G, panelBoxShadow: Te, itemOpacityDisabled: ue, borderRadius: nn, itemFontSize: an, itemWidth: Vt, itemHeight: rn, panelActionPadding: on, itemBorderRadius: ln }, common: { cubicBezierEaseInOut: sn } } = g.value;
    return { "--n-bezier": sn, "--n-border-radius": nn, "--n-item-color-hover": A, "--n-item-font-size": an, "--n-item-height": rn, "--n-item-opacity-disabled": ue, "--n-item-text-color": b, "--n-item-text-color-active": k, "--n-item-width": Vt, "--n-panel-action-padding": on, "--n-panel-box-shadow": Te, "--n-panel-color": d, "--n-panel-divider-color": G, "--n-item-border-radius": ln };
  }), ye = r ? kn("time-picker", void 0, Re, n) : void 0;
  return { focus: Y.focus, blur: Y.blur, mergedStatus: p, mergedBordered: e, mergedClsPrefix: a, namespace: t, uncontrolledValue: H, mergedValue: F, isMounted: Za(), inputInstRef: $, panelInstRef: Z, adjustedTo: jt(n), mergedShow: ae, localizedClear: C, localizedNow: De, localizedPlaceholder: Ke, localizedNegativeText: Ee, localizedPositiveText: Ze, hourInFormat: Ge, minuteInFormat: Be, secondInFormat: Se, mergedAttrSize: ze, displayTimeString: U, mergedSize: f, mergedDisabled: m, isValueInvalid: he, isHourInvalid: re, isMinuteInvalid: ne, isSecondInvalid: Me, transitionDisabled: V, hourValue: Pe, minuteValue: ge, secondValue: dt, amPmValue: _e, handleInputKeydown: St, handleTimeInputFocus: O, handleTimeInputBlur: Q, handleNowClick: rt, handleConfirmClick: h, handleTimeInputUpdateValue: at, handleMenuFocusOut: x, handleCancelClick: It, handleClickOutside: tn, handleTimeInputActivate: en, handleTimeInputDeactivate: $t, handleHourClick: _t, handleMinuteClick: Tt, handleSecondClick: Je, handleAmPmClick: Ot, handleTimeInputClear: kt, handleFocusDetectorFocus: Ct, handleMenuKeydown: Mt, handleTriggerClick: qe, mergedTheme: g, triggerCssVars: r ? void 0 : z, triggerThemeClass: se == null ? void 0 : se.themeClass, triggerOnRender: se == null ? void 0 : se.onRender, cssVars: r ? void 0 : Re, themeClass: ye == null ? void 0 : ye.themeClass, onRender: ye == null ? void 0 : ye.onRender, clearSelectedValue: xt };
}, render() {
  const { mergedClsPrefix: n, $slots: e, triggerOnRender: a } = this;
  return a == null ? void 0 : a(), o("div", { class: [`${n}-time-picker`, this.triggerThemeClass], style: this.triggerCssVars }, o(ma, null, { default: () => [o(va, null, { default: () => o(Rt, { ref: "inputInstRef", status: this.mergedStatus, value: this.displayTimeString, bordered: this.mergedBordered, passivelyActivated: true, attrSize: this.mergedAttrSize, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, stateful: this.stateful, size: this.mergedSize, placeholder: this.localizedPlaceholder, clearable: this.clearable, disabled: this.mergedDisabled, textDecoration: this.isValueInvalid ? "line-through" : void 0, onFocus: this.handleTimeInputFocus, onBlur: this.handleTimeInputBlur, onActivate: this.handleTimeInputActivate, onDeactivate: this.handleTimeInputDeactivate, onUpdateValue: this.handleTimeInputUpdateValue, onClear: this.handleTimeInputClear, internalDeactivateOnEnter: true, internalForceFocus: this.mergedShow, readonly: this.inputReadonly || this.mergedDisabled, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown }, this.showIcon ? { [this.clearable ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: n, class: `${n}-time-picker-icon` }, { default: () => e.icon ? e.icon() : o(ni, null) }) } : null) }), o(pa, { teleportDisabled: this.adjustedTo === jt.tdkey, show: this.mergedShow, to: this.adjustedTo, containerClass: this.namespace, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => {
    var t;
    return this.mergedShow ? ((t = this.onRender) === null || t === void 0 || t.call(this), fa(o(gl, { ref: "panelInstRef", actions: this.actions, class: this.themeClass, style: this.cssVars, seconds: this.seconds, minutes: this.minutes, hours: this.hours, transitionDisabled: this.transitionDisabled, hourValue: this.hourValue, showHour: this.hourInFormat, isHourInvalid: this.isHourInvalid, isHourDisabled: this.isHourDisabled, minuteValue: this.minuteValue, showMinute: this.minuteInFormat, isMinuteInvalid: this.isMinuteInvalid, isMinuteDisabled: this.isMinuteDisabled, secondValue: this.secondValue, amPmValue: this.amPmValue, showSecond: this.secondInFormat, isSecondInvalid: this.isSecondInvalid, isSecondDisabled: this.isSecondDisabled, isValueInvalid: this.isValueInvalid, clearText: this.localizedClear, nowText: this.localizedNow, confirmText: this.localizedPositiveText, use12Hours: this.use12Hours, onFocusout: this.handleMenuFocusOut, onKeydown: this.handleMenuKeydown, onHourClick: this.handleHourClick, onMinuteClick: this.handleMinuteClick, onSecondClick: this.handleSecondClick, onAmPmClick: this.handleAmPmClick, onNowClick: this.handleNowClick, onConfirmClick: this.handleConfirmClick, onClearClick: this.clearSelectedValue, onFocusDetectorFocus: this.handleFocusDetectorFocus }), [[ga, this.handleClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), wl = Qe({ name: "DateTimePanel", props: Ca, setup(n) {
  return xa(n, "datetime");
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i, shortcuts: l, timePickerProps: u, datePickerSlots: c, onRender: f } = this;
  return f == null ? void 0 : f(), o("div", { ref: "selfRef", tabindex: 0, class: [`${r}-date-panel`, `${r}-date-panel--datetime`, !this.panel && `${r}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${r}-date-panel-header` }, o(Rt, { value: this.dateInputValue, theme: i.peers.Input, themeOverrides: i.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${r}-date-panel-date-input`, textDecoration: this.isDateInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleDateInputBlur, onUpdateValue: this.handleDateInput }), o(ua, Object.assign({ size: this.timePickerSize, placeholder: this.locale.selectTime, format: this.timePickerFormat }, Array.isArray(u) ? void 0 : u, { showIcon: false, to: false, theme: i.peers.TimePicker, themeOverrides: i.peerOverrides.TimePicker, value: Array.isArray(this.value) ? null : this.value, isHourDisabled: this.isHourDisabled, isMinuteDisabled: this.isMinuteDisabled, isSecondDisabled: this.isSecondDisabled, onUpdateValue: this.handleTimePickerChange, stateful: false }))), o("div", { class: `${r}-date-panel-calendar` }, o("div", { class: `${r}-date-panel-month` }, o("div", { class: `${r}-date-panel-month__fast-prev`, onClick: this.prevYear }, J(c["prev-year"], () => [o(Ut, null)])), o("div", { class: `${r}-date-panel-month__prev`, onClick: this.prevMonth }, J(c["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: r, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${r}-date-panel-month__next`, onClick: this.nextMonth }, J(c["next-month"], () => [o(Wt, null)])), o("div", { class: `${r}-date-panel-month__fast-next`, onClick: this.nextYear }, J(c["next-year"], () => [o(Qt, null)]))), o("div", { class: `${r}-date-panel-weekdays` }, this.weekdays.map((m) => o("div", { key: m, class: `${r}-date-panel-weekdays__day` }, m))), o("div", { class: `${r}-date-panel-dates` }, this.dateArray.map((m, p) => o("div", { "data-n-date": true, key: p, class: [`${r}-date-panel-date`, { [`${r}-date-panel-date--current`]: m.isCurrentDate, [`${r}-date-panel-date--selected`]: m.selected, [`${r}-date-panel-date--excluded`]: !m.inCurrentMonth, [`${r}-date-panel-date--disabled`]: this.mergedIsDateDisabled(m.ts, { type: "date", year: m.dateObject.year, month: m.dateObject.month, date: m.dateObject.date }) }], onClick: () => {
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
  })), o("div", { class: `${r}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.datePickerSlots.clear, { onClear: this.clearSelectedDateTime, text: this.locale.clear }, () => [o(Fe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.clearSelectedDateTime }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ne(c.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Fe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? Ne(c.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Fe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Dl = Qe({ name: "DateTimeRangePanel", props: Sa, setup(n) {
  return Ma(n, "datetimerange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, timePickerProps: l, onRender: u, datePickerSlots: c } = this;
  return u == null ? void 0 : u(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--datetimerange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${t}-date-panel-header` }, o(Rt, { value: this.startDateDisplayString, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, size: this.timePickerSize, stateful: false, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isStartValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleStartDateInputBlur, onUpdateValue: this.handleStartDateInput }), o(ua, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[0] : l, { value: this.startTimeValue, to: false, showIcon: false, disabled: this.isSelecting, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, stateful: false, isHourDisabled: this.isStartHourDisabled, isMinuteDisabled: this.isStartMinuteDisabled, isSecondDisabled: this.isStartSecondDisabled, onUpdateValue: this.handleStartTimePickerChange })), o(Rt, { value: this.endDateInput, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isEndValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleEndDateInputBlur, onUpdateValue: this.handleEndDateInput }), o(ua, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[1] : l, { disabled: this.isSelecting, showIcon: false, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, to: false, stateful: false, value: this.endTimeValue, isHourDisabled: this.isEndHourDisabled, isMinuteDisabled: this.isEndMinuteDisabled, isSecondDisabled: this.isEndSecondDisabled, onUpdateValue: this.handleEndTimePickerChange }))), o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, J(c["prev-year"], () => [o(Ut, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, J(c["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, J(c["next-month"], () => [o(Wt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, J(c["next-year"], () => [o(Qt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((f, m) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: m, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, J(c["prev-year"], () => [o(Ut, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, J(c["prev-month"], () => [o(Lt, null)])), o(Zt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, monthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, J(c["next-month"], () => [o(Wt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, J(c["next-year"], () => [o(Qt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((f, m) => {
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
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(c.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(c.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Fe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), kl = Qe({ name: "MonthRangePanel", props: Object.assign(Object.assign({}, Sa), { type: { type: String, required: true } }), setup(n) {
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
  return c == null ? void 0 : c(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(st, { ref: "startYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("start"), content: () => this.virtualListContent("start"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "startYearVlRef", items: this.startYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleStartYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: m }) => u(f, m, t, "start") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(st, { ref: "startMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.startMonthArray : this.startQuarterArray).map((f, m) => u(f, m, t, "start")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(st, { ref: "endYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("end"), content: () => this.virtualListContent("end"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Gn, { ref: "endYearVlRef", items: this.endYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleEndYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: m }) => u(f, m, t, "end") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(st, { ref: "endMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.endMonthArray : this.endQuarterArray).map((f, m) => u(f, m, t, "end")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), ar(this.datePickerSlots.footer, (f) => f ? o("div", { class: `${t}-date-panel-footer` }, f) : null), !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const m = i[f];
    return Array.isArray(m) || typeof m == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(m);
    }, onClick: () => {
      this.handleRangeShortcutClick(m);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(this.datePickerSlots.confirm, { disabled: this.isRangeInvalid, onConfirm: this.handleConfirmClick, text: this.locale.confirm }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Cl = Object.assign(Object.assign({}, Fn.props), { to: jt.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, fastYearSelect: Boolean, fastMonthSelect: Boolean, updateValueOnClose: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, default: " " }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, defaultValue: [Number, Array], defaultFormattedValue: [String, Array], defaultTime: [Number, String, Array, Function], disabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom-start" }, value: [Number, Array], formattedValue: [String, Array], size: String, type: { type: String, default: "date" }, valueFormat: String, separator: String, placeholder: String, startPlaceholder: String, endPlaceholder: String, format: String, dateFormat: String, timePickerFormat: String, actions: Array, shortcuts: Object, isDateDisabled: Function, isTimeDisabled: Function, show: { type: Boolean, default: void 0 }, panel: Boolean, ranges: Object, firstDayOfWeek: Number, inputReadonly: Boolean, closeOnSelect: Boolean, status: String, timePickerProps: [Object, Array], onClear: Function, onConfirm: Function, defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, monthFormat: { type: String, default: "M" }, yearFormat: { type: String, default: "y" }, quarterFormat: { type: String, default: "'Q'Q" }, yearRange: { type: Array, default: () => [1901, 2100] }, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], "onUpdate:formattedValue": [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function, onChange: [Function, Array] }), xl = I([L("date-picker", `
 position: relative;
 z-index: auto;
 `, [L("date-picker-icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), L("icon", `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), j("disabled", [L("date-picker-icon", `
 color: var(--n-icon-color-disabled-override);
 `), L("icon", `
 color: var(--n-icon-color-disabled-override);
 `)])]), L("date-panel", `
 width: fit-content;
 outline: none;
 margin: 4px 0;
 display: grid;
 grid-template-columns: 0fr;
 border-radius: var(--n-panel-border-radius);
 background-color: var(--n-panel-color);
 color: var(--n-panel-text-color);
 user-select: none;
 `, [tr(), j("shadow", `
 box-shadow: var(--n-panel-box-shadow);
 `), L("date-panel-calendar", { padding: "var(--n-calendar-left-padding)", display: "grid", gridTemplateColumns: "1fr", gridArea: "left-calendar" }, [j("end", { padding: "var(--n-calendar-right-padding)", gridArea: "right-calendar" })]), L("date-panel-month-calendar", { display: "flex", gridArea: "left-calendar" }, [me("picker-col", `
 min-width: var(--n-scroll-item-width);
 height: calc(var(--n-scroll-item-height) * 6);
 user-select: none;
 -webkit-user-select: none;
 `, [I("&:first-child", `
 min-width: calc(var(--n-scroll-item-width) + 4px);
 `, [me("picker-col-item", [I("&::before", "left: 4px;")])]), me("padding", `
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
 `, [I("&::before", `
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
 `), Ht("disabled", [I("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `), j("selected", `
 color: var(--n-item-color-active);
 `, [I("&::before", "background-color: var(--n-item-color-hover);")])]), j("disabled", `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `, [j("selected", [I("&::before", `
 background-color: var(--n-item-color-disabled);
 `)])])])]), j("date", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), j("week", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), j("daterange", { gridTemplateAreas: `
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 ` }), j("datetime", { gridTemplateAreas: `
 "header"
 "left-calendar"
 "footer"
 "action"
 ` }), j("datetimerange", { gridTemplateAreas: `
 "header header header"
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 ` }), j("month", { gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 ` }), L("date-panel-footer", { gridArea: "footer" }), L("date-panel-actions", { gridArea: "action" }), L("date-panel-header", { gridArea: "header" }), L("date-panel-header", `
 box-sizing: border-box;
 width: 100%;
 align-items: center;
 padding: var(--n-panel-header-padding);
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid var(--n-panel-header-divider-color);
 `, [I(">", [I("*:not(:last-child)", { marginRight: "10px" }), I("*", { flex: 1, width: 0 }), L("time-picker", { zIndex: 1 })])]), L("date-panel-month", `
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
 `, [j("active", `
 background-color: var(--n-calendar-title-color-hover);
 `), I("&:hover", `
 background-color: var(--n-calendar-title-color-hover);
 `)])])]), L("date-panel-weekdays", `
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
 `)]), L("date-panel-dates", `
 margin: auto;
 display: grid;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(6, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 flex-wrap: wrap;
 `, [L("date-panel-date", `
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
 `), j("current", [me("sup", `
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
 `)]), I("&::after", `
 content: "";
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 transition: background-color .3s var(--n-bezier);
 `), j("covered, start, end", [Ht("excluded", [I("&::before", `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `), I("&:nth-child(7n + 1)::before", { borderTopLeftRadius: "var(--n-item-border-radius)", borderBottomLeftRadius: "var(--n-item-border-radius)" }), I("&:nth-child(7n + 7)::before", { borderTopRightRadius: "var(--n-item-border-radius)", borderBottomRightRadius: "var(--n-item-border-radius)" })])]), j("selected", { color: "var(--n-item-text-color-active)" }, [I("&::after", { backgroundColor: "var(--n-item-color-active)" }), j("start", [I("&::before", { left: "50%" })]), j("end", [I("&::before", { right: "50%" })]), me("sup", { backgroundColor: "var(--n-panel-color)" })]), j("excluded", { color: "var(--n-item-text-color-disabled)" }, [j("selected", [I("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), j("disabled", { cursor: "not-allowed", color: "var(--n-item-text-color-disabled)" }, [j("covered", [I("&::before", { backgroundColor: "var(--n-item-color-disabled)" })]), j("selected", [I("&::before", { backgroundColor: "var(--n-item-color-disabled)" }), I("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), j("week-hovered", [I("&::before", `
 background-color: var(--n-item-color-included);
 `), I("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), I("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)]), j("week-selected", `
 color: var(--n-item-text-color-active)
 `, [I("&::before", `
 background-color: var(--n-item-color-active);
 `), I("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), I("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)])])]), Ht("week", [L("date-panel-dates", [L("date-panel-date", [Ht("disabled", [Ht("selected", [I("&:hover", `
 background-color: var(--n-item-color-hover);
 `)])])])])]), j("week", [L("date-panel-dates", [L("date-panel-date", [I("&::before", `
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
 `), L("date-panel-footer", `
 border-top: 1px solid var(--n-panel-action-divider-color);
 padding: var(--n-panel-extra-footer-padding);
 `), L("date-panel-actions", `
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
 `), L("button", `
 margin-bottom: 8px;
 `, [I("&:not(:last-child)", `
 margin-right: 8px;
 `)])])]), I("[data-n-date].transition-disabled", { transition: "none !important" }, [I("&::before, &::after", { transition: "none !important" })])]);
function Sl(n, e) {
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
    const g = new Date(p), _ = g.getHours(), $ = g.getMinutes(), Z = g.getMinutes();
    return (t.value ? t.value(_) : false) || (r.value ? r.value($, _) : false) || (i.value ? i.value(Z, $, _) : false);
  }), c = y(() => l.value || u.value);
  return { isValueInvalidRef: y(() => {
    const { type: m } = n;
    return m === "date" ? l.value : m === "datetime" ? c.value : false;
  }), isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: c, isHourDisabledRef: t, isMinuteDisabledRef: r, isSecondDisabledRef: i };
}
function Ml(n, e) {
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
    const { type: p, isDateDisabled: g } = n, { value: _ } = e;
    return _ === null || !Array.isArray(_) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(_[0], "start", _);
  }), i = y(() => {
    const { type: p, isDateDisabled: g } = n, { value: _ } = e;
    return _ === null || !Array.isArray(_) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(_[1], "end", _);
  }), l = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const _ = yt(g[0]), $ = Sn(g[0]), Z = Mn(g[0]), { isStartHourDisabledRef: S, isStartMinuteDisabledRef: R, isStartSecondDisabledRef: N } = t;
    return (S.value ? S.value(_) : false) || (R.value ? R.value($, _) : false) || (N.value ? N.value(Z, $, _) : false);
  }), u = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const _ = yt(g[1]), $ = Sn(g[1]), Z = Mn(g[1]), { isEndHourDisabledRef: S, isEndMinuteDisabledRef: R, isEndSecondDisabledRef: N } = t;
    return (S.value ? S.value(_) : false) || (R.value ? R.value($, _) : false) || (N.value ? N.value(Z, $, _) : false);
  }), c = y(() => r.value || l.value), f = y(() => i.value || u.value), m = y(() => c.value || f.value);
  return Object.assign(Object.assign({}, t), { isStartDateInvalidRef: r, isEndDateInvalidRef: i, isStartTimeInvalidRef: l, isEndTimeInvalidRef: u, isStartValueInvalidRef: c, isEndValueInvalidRef: f, isRangeInvalidRef: m });
}
const _l = Qe({ name: "DatePicker", props: Cl, slots: Object, setup(n, { slots: e }) {
  var a;
  const { localeRef: t, dateLocaleRef: r } = Pn("DatePicker"), { mergedComponentPropsRef: i, mergedClsPrefixRef: l, mergedBorderedRef: u, namespaceRef: c, inlineThemeDisabled: f } = Ka(n), m = rr(n, { mergedSize: (h) => {
    var x, Y;
    const { size: z } = n;
    if (z) return z;
    const { mergedSize: se } = h || {};
    if (se == null ? void 0 : se.value) return se.value;
    const Re = (Y = (x = i == null ? void 0 : i.value) === null || x === void 0 ? void 0 : x.DatePicker) === null || Y === void 0 ? void 0 : Y.size;
    return Re || "medium";
  } }), { mergedSizeRef: p, mergedDisabledRef: g, mergedStatusRef: _ } = m, $ = T(null), Z = T(null), S = T(null), R = T(false), N = Ue(n, "show"), q = Jn(N, R), H = y(() => ({ locale: r.value.locale, useAdditionalWeekYearTokens: true })), F = y(() => {
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
  }), E = y(() => {
    var h;
    return (h = n.valueFormat) !== null && h !== void 0 ? h : F.value;
  });
  function U(h) {
    if (h === null) return null;
    const { value: x } = E, { value: Y } = H;
    return Array.isArray(h) ? [Ve(h[0], x, /* @__PURE__ */ new Date(), Y).getTime(), Ve(h[1], x, /* @__PURE__ */ new Date(), Y).getTime()] : Ve(h, x, /* @__PURE__ */ new Date(), Y).getTime();
  }
  const { defaultFormattedValue: be, defaultValue: Xe } = n, ae = T((a = be !== void 0 ? U(be) : Xe) !== null && a !== void 0 ? a : null), we = y(() => {
    const { formattedValue: h } = n;
    return h !== void 0 ? U(h) : n.value;
  }), V = Jn(we, ae), C = T(null);
  Hr(() => {
    C.value = V.value;
  });
  const De = T(""), Ke = T(""), Ee = T(""), Ze = Fn("DatePicker", "-date-picker", xl, Er, n, l), Ge = y(() => {
    var h, x;
    return ((x = (h = i == null ? void 0 : i.value) === null || h === void 0 ? void 0 : h.DatePicker) === null || x === void 0 ? void 0 : x.timePickerSize) || "small";
  }), Be = y(() => ["daterange", "datetimerange", "monthrange", "quarterrange", "yearrange"].includes(n.type)), Se = y(() => {
    const { placeholder: h } = n;
    if (h === void 0) {
      const { type: x } = n;
      switch (x) {
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
  }), Pe = y(() => n.startPlaceholder === void 0 ? n.type === "daterange" ? t.value.startDatePlaceholder : n.type === "datetimerange" ? t.value.startDatetimePlaceholder : n.type === "monthrange" ? t.value.startMonthPlaceholder : "" : n.startPlaceholder), ge = y(() => n.endPlaceholder === void 0 ? n.type === "daterange" ? t.value.endDatePlaceholder : n.type === "datetimerange" ? t.value.endDatetimePlaceholder : n.type === "monthrange" ? t.value.endMonthPlaceholder : "" : n.endPlaceholder), dt = y(() => {
    const { actions: h, type: x, clearable: Y } = n;
    if (h === null) return [];
    if (h !== void 0) return h;
    const z = Y ? ["clear"] : [];
    switch (x) {
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
      const { value: x } = E, { value: Y } = H;
      return [K(h[0], x, Y), K(h[1], x, H.value)];
    } else return K(h, E.value, H.value);
  }
  function ne(h) {
    C.value = h;
  }
  function Me(h, x) {
    const { "onUpdate:formattedValue": Y, onUpdateFormattedValue: z } = n;
    Y && pe(Y, h, x), z && pe(z, h, x);
  }
  function he(h, x) {
    const { "onUpdate:value": Y, onUpdateValue: z, onChange: se } = n, { nTriggerFormChange: Re, nTriggerFormInput: ye } = m, d = re(h);
    x.doConfirm && _e(h, d), z && pe(z, h, d), Y && pe(Y, h, d), se && pe(se, h, d), ae.value = h, Me(d, h), Re(), ye();
  }
  function ze() {
    const { onClear: h } = n;
    h == null ? void 0 : h();
  }
  function _e(h, x) {
    const { onConfirm: Y } = n;
    Y && Y(h, x);
  }
  function wt(h) {
    const { onFocus: x } = n, { nTriggerFormFocus: Y } = m;
    x && pe(x, h), Y();
  }
  function $e(h) {
    const { onBlur: x } = n, { nTriggerFormBlur: Y } = m;
    x && pe(x, h), Y();
  }
  function B(h) {
    const { "onUpdate:show": x, onUpdateShow: Y } = n;
    x && pe(x, h), Y && pe(Y, h), R.value = h;
  }
  function ht(h) {
    h.key === "Escape" && q.value && (Cn(h), je({ returnFocus: true }));
  }
  function nt(h) {
    h.key === "Escape" && q.value && Cn(h);
  }
  function Dt() {
    var h;
    B(false), (h = S.value) === null || h === void 0 || h.deactivate(), ze();
  }
  function kt() {
    var h;
    (h = S.value) === null || h === void 0 || h.deactivate(), ze();
  }
  function Ct() {
    je({ returnFocus: true });
  }
  function xt(h) {
    var x;
    q.value && !(!((x = Z.value) === null || x === void 0) && x.contains(ha(h))) && je({ returnFocus: false });
  }
  function St(h) {
    je({ returnFocus: true, disableUpdateOnClose: h });
  }
  function Mt(h, x) {
    x ? he(h, { doConfirm: false }) : ne(h);
  }
  function mt() {
    const h = C.value;
    he(Array.isArray(h) ? [h[0], h[1]] : h, { doConfirm: true });
  }
  function qe() {
    const { value: h } = C;
    Be.value ? (Array.isArray(h) || h === null) && Tt(h) : Array.isArray(h) || _t(h);
  }
  function _t(h) {
    h === null ? De.value = "" : De.value = K(h, F.value, H.value);
  }
  function Tt(h) {
    if (h === null) Ke.value = "", Ee.value = "";
    else {
      const x = H.value;
      Ke.value = K(h[0], F.value, x), Ee.value = K(h[1], F.value, x);
    }
  }
  function Je() {
    q.value || ke();
  }
  function Ot(h) {
    var x;
    !((x = $.value) === null || x === void 0) && x.$el.contains(h.relatedTarget) || ($e(h), qe(), je({ returnFocus: false }));
  }
  function v() {
    g.value || (qe(), je({ returnFocus: false }));
  }
  function O(h) {
    if (h === "") {
      he(null, { doConfirm: false }), C.value = null, De.value = "";
      return;
    }
    const x = Ve(h, F.value, /* @__PURE__ */ new Date(), H.value);
    We(x) ? (he(D(x), { doConfirm: false }), qe()) : De.value = h;
  }
  function Q(h, { source: x }) {
    if (h[0] === "" && h[1] === "") {
      he(null, { doConfirm: false }), C.value = null, Ke.value = "", Ee.value = "";
      return;
    }
    const [Y, z] = h, se = Ve(Y, F.value, /* @__PURE__ */ new Date(), H.value), Re = Ve(z, F.value, /* @__PURE__ */ new Date(), H.value);
    if (We(se) && We(Re)) {
      let ye = D(se), d = D(Re);
      Re < se && (x === 0 ? d = ye : ye = d), he([ye, d], { doConfirm: false }), qe();
    } else [Ke.value, Ee.value] = h;
  }
  function en(h) {
    g.value || nr(h, "clear") || q.value || ke();
  }
  function $t(h) {
    g.value || wt(h);
  }
  function ke() {
    g.value || q.value || B(true);
  }
  function je({ returnFocus: h, disableUpdateOnClose: x }) {
    var Y;
    q.value && (B(false), n.type !== "date" && n.updateValueOnClose && !x && mt(), h && ((Y = S.value) === null || Y === void 0 || Y.focus()));
  }
  ut(C, () => {
    qe();
  }), qe(), ut(q, (h) => {
    h || (C.value = V.value);
  });
  const vt = Sl(n, C), pt = Ml(n, C);
  Ga(Rn, Object.assign(Object.assign(Object.assign({ mergedClsPrefixRef: l, mergedThemeRef: Ze, timePickerSizeRef: Ge, localeRef: t, dateLocaleRef: r, firstDayOfWeekRef: Ue(n, "firstDayOfWeek"), isDateDisabledRef: Ue(n, "isDateDisabled"), rangesRef: Ue(n, "ranges"), timePickerPropsRef: Ue(n, "timePickerProps"), closeOnSelectRef: Ue(n, "closeOnSelect"), updateValueOnCloseRef: Ue(n, "updateValueOnClose"), monthFormatRef: Ue(n, "monthFormat"), yearFormatRef: Ue(n, "yearFormat"), quarterFormatRef: Ue(n, "quarterFormat"), yearRangeRef: Ue(n, "yearRange") }, vt), pt), { datePickerSlots: e }));
  const tn = { focus: () => {
    var h;
    (h = S.value) === null || h === void 0 || h.focus();
  }, blur: () => {
    var h;
    (h = S.value) === null || h === void 0 || h.blur();
  } }, Ie = y(() => {
    const { common: { cubicBezierEaseInOut: h }, self: { iconColor: x, iconColorDisabled: Y } } = Ze.value;
    return { "--n-bezier": h, "--n-icon-color-override": x, "--n-icon-color-disabled-override": Y };
  }), at = f ? kn("date-picker-trigger", void 0, Ie, n) : void 0, It = y(() => {
    const { type: h } = n, { common: { cubicBezierEaseInOut: x }, self: { calendarTitleFontSize: Y, calendarDaysFontSize: z, itemFontSize: se, itemTextColor: Re, itemColorDisabled: ye, itemColorIncluded: d, itemColorHover: b, itemColorActive: k, itemBorderRadius: A, itemTextColorDisabled: G, itemTextColorActive: Te, panelColor: ue, panelTextColor: nn, arrowColor: an, calendarTitleTextColor: Vt, panelActionDividerColor: rn, panelHeaderDividerColor: on, calendarDaysDividerColor: ln, panelBoxShadow: sn, panelBorderRadius: it, calendarTitleFontWeight: Yn, panelExtraFooterPadding: An, panelActionPadding: $n, itemSize: In, itemCellWidth: Vn, itemCellHeight: Nn, scrollItemWidth: s, scrollItemHeight: w, calendarTitlePadding: M, calendarTitleHeight: ve, calendarDaysHeight: et, calendarDaysTextColor: ee, arrowSize: un, panelHeaderPadding: pn, calendarDividerColor: dn, calendarTitleGridTempateColumns: Or, iconColor: Fr, iconColorDisabled: Pr, scrollItemBorderRadius: Rr, calendarTitleColorHover: Yr, [Ta("calendarLeftPadding", h)]: Ar, [Ta("calendarRightPadding", h)]: $r } } = Ze.value;
    return { "--n-bezier": x, "--n-panel-border-radius": it, "--n-panel-color": ue, "--n-panel-box-shadow": sn, "--n-panel-text-color": nn, "--n-panel-header-padding": pn, "--n-panel-header-divider-color": on, "--n-calendar-left-padding": Ar, "--n-calendar-right-padding": $r, "--n-calendar-title-color-hover": Yr, "--n-calendar-title-height": ve, "--n-calendar-title-padding": M, "--n-calendar-title-font-size": Y, "--n-calendar-title-font-weight": Yn, "--n-calendar-title-text-color": Vt, "--n-calendar-title-grid-template-columns": Or, "--n-calendar-days-height": et, "--n-calendar-days-divider-color": ln, "--n-calendar-days-font-size": z, "--n-calendar-days-text-color": ee, "--n-calendar-divider-color": dn, "--n-panel-action-padding": $n, "--n-panel-extra-footer-padding": An, "--n-panel-action-divider-color": rn, "--n-item-font-size": se, "--n-item-border-radius": A, "--n-item-size": In, "--n-item-cell-width": Vn, "--n-item-cell-height": Nn, "--n-item-text-color": Re, "--n-item-color-included": d, "--n-item-color-disabled": ye, "--n-item-color-hover": b, "--n-item-color-active": k, "--n-item-text-color-disabled": G, "--n-item-text-color-active": Te, "--n-scroll-item-width": s, "--n-scroll-item-height": w, "--n-scroll-item-border-radius": Rr, "--n-arrow-size": un, "--n-arrow-color": an, "--n-icon-color": Fr, "--n-icon-color-disabled": Pr };
  }), rt = f ? kn("date-picker", y(() => n.type), It, n) : void 0;
  return Object.assign(Object.assign({}, tn), { mergedStatus: _, mergedClsPrefix: l, mergedBordered: u, namespace: c, uncontrolledValue: ae, pendingValue: C, panelInstRef: $, triggerElRef: Z, inputInstRef: S, isMounted: Za(), displayTime: De, displayStartTime: Ke, displayEndTime: Ee, mergedShow: q, adjustedTo: jt(n), isRange: Be, localizedStartPlaceholder: Pe, localizedEndPlaceholder: ge, mergedSize: p, mergedDisabled: g, localizedPlacehoder: Se, isValueInvalid: vt.isValueInvalidRef, isStartValueInvalid: pt.isStartValueInvalidRef, isEndValueInvalid: pt.isEndValueInvalidRef, handleInputKeydown: nt, handleClickOutside: xt, handleKeydown: ht, handleClear: Dt, handlePanelClear: kt, handleTriggerClick: en, handleInputActivate: Je, handleInputDeactivate: v, handleInputFocus: $t, handleInputBlur: Ot, handlePanelTabOut: Ct, handlePanelClose: St, handleRangeUpdateValue: Q, handleSingleUpdateValue: O, handlePanelUpdateValue: Mt, handlePanelConfirm: mt, mergedTheme: Ze, actions: dt, triggerCssVars: f ? void 0 : Ie, triggerThemeClass: at == null ? void 0 : at.themeClass, triggerOnRender: at == null ? void 0 : at.onRender, cssVars: f ? void 0 : It, themeClass: rt == null ? void 0 : rt.themeClass, onRender: rt == null ? void 0 : rt.onRender, onNextMonth: n.onNextMonth, onPrevMonth: n.onPrevMonth, onNextYear: n.onNextYear, onPrevYear: n.onPrevYear });
}, render() {
  const { clearable: n, triggerOnRender: e, mergedClsPrefix: a, $slots: t } = this, r = { onUpdateValue: this.handlePanelUpdateValue, onTabOut: this.handlePanelTabOut, onClose: this.handlePanelClose, onClear: this.handlePanelClear, onKeydown: this.handleKeydown, onConfirm: this.handlePanelConfirm, ref: "panelInstRef", value: this.pendingValue, active: this.mergedShow, actions: this.actions, shortcuts: this.shortcuts, style: this.cssVars, defaultTime: this.defaultTime, themeClass: this.themeClass, panel: this.panel, inputReadonly: this.inputReadonly || this.mergedDisabled, onRender: this.onRender, onNextMonth: this.onNextMonth, onPrevMonth: this.onPrevMonth, onNextYear: this.onNextYear, onPrevYear: this.onPrevYear, timePickerFormat: this.timePickerFormat, dateFormat: this.dateFormat, fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, calendarDayFormat: this.calendarDayFormat, calendarHeaderYearFormat: this.calendarHeaderYearFormat, calendarHeaderMonthFormat: this.calendarHeaderMonthFormat, calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear }, i = () => {
    const { type: u } = this;
    return u === "datetime" ? o(wl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime }), t) : u === "daterange" ? o(No, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "datetimerange" ? o(Dl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "month" || u === "year" || u === "quarter" ? o(xr, Object.assign({}, r, { type: u, key: u })) : u === "monthrange" || u === "yearrange" || u === "quarterrange" ? o(kl, Object.assign({}, r, { type: u })) : o(Vo, Object.assign({}, r, { type: u, defaultCalendarStartTime: this.defaultCalendarStartTime }), t);
  };
  if (this.panel) return i();
  e == null ? void 0 : e();
  const l = { bordered: this.mergedBordered, size: this.mergedSize, passivelyActivated: true, disabled: this.mergedDisabled, readonly: this.inputReadonly || this.mergedDisabled, clearable: n, onClear: this.handleClear, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown, onActivate: this.handleInputActivate, onDeactivate: this.handleInputDeactivate, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur };
  return o("div", { ref: "triggerElRef", class: [`${a}-date-picker`, this.mergedDisabled && `${a}-date-picker--disabled`, this.isRange && `${a}-date-picker--range`, this.triggerThemeClass], style: this.triggerCssVars, onKeydown: this.handleKeydown }, o(ma, null, { default: () => [o(va, null, { default: () => this.isRange ? o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: [this.displayStartTime, this.displayEndTime], placeholder: [this.localizedStartPlaceholder, this.localizedEndPlaceholder], textDecoration: [this.isStartValueInvalid ? "line-through" : "", this.isEndValueInvalid ? "line-through" : ""], pair: true, onUpdateValue: this.handleRangeUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { separator: () => this.separator === void 0 ? J(t.separator, () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(ai, null) })]) : this.separator, [n ? "clear-icon-placeholder" : "suffix"]: () => J(t["date-icon"], () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(Pa, null) })]) }) : o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: this.displayTime, placeholder: this.localizedPlacehoder, textDecoration: this.isValueInvalid && !this.isRange ? "line-through" : "", onUpdateValue: this.handleSingleUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { [n ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => J(t["date-icon"], () => [o(Pa, null)]) }) }) }), o(pa, { show: this.mergedShow, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === jt.tdkey, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => this.mergedShow ? fa(i(), [[ga, this.handleClickOutside, void 0, { capture: true }]]) : null }) })] }));
} });
function Tl() {
  const { request: n } = Ir();
  return { summary: (e) => {
    const a = new URLSearchParams({ group_by: e.group_by });
    return e.api_key && a.set("api_key", e.api_key), e.start_time && a.set("start_time", e.start_time), e.end_time && a.set("end_time", e.end_time), n("GET", `/usage/summary?${a.toString()}`);
  } };
}
const Ol = { class: "flex gap-3 mb-6 flex-wrap items-end" }, Fl = { key: 0, class: "text-slate-500 text-sm" }, Pl = { class: "grid grid-cols-4 gap-4 mb-6" }, ql = Qe({ __name: "usage", setup(n) {
  const e = Wr(), a = Tl(), t = T(""), r = T("hour"), i = T(null), l = T(null), u = T(false);
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
  return (g, _) => {
    const $ = Rt, Z = Qr, S = _l, R = Ur, N = Fe, q = Xr, H = Vr, F = Lr;
    return zn(), Hn("div", null, [_[5] || (_[5] = gn("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Usage", -1)), gn("div", Ol, [Oe(Z, { label: "API Key", class: "mb-0" }, { default: ct(() => [Oe($, { value: He(t), "onUpdate:value": _[0] || (_[0] = (E) => En(t) ? t.value = E : null), placeholder: "Optional \u2014 leave empty for all", style: { width: "240px" }, clearable: "" }, null, 8, ["value"])]), _: 1 }), Oe(Z, { label: "Date Range", class: "mb-0" }, { default: ct(() => [Oe(S, { value: He(i), "onUpdate:value": _[1] || (_[1] = (E) => En(i) ? i.value = E : null), type: "daterange", clearable: "", style: { width: "240px" } }, null, 8, ["value"])]), _: 1 }), Oe(Z, { label: "Group By", class: "mb-0" }, { default: ct(() => [Oe(R, { value: He(r), "onUpdate:value": _[2] || (_[2] = (E) => En(r) ? r.value = E : null), options: [{ label: "By Hour", value: "hour" }, { label: "By Model", value: "model" }], style: { width: "130px" } }, null, 8, ["value"])]), _: 1 }), Oe(N, { type: "primary", loading: He(u), onClick: m }, { icon: ct(() => [..._[3] || (_[3] = [gn("span", { class: "i-carbon-search" }, null, -1)])]), default: ct(() => [_[4] || (_[4] = qr(" Query ", -1))]), _: 1 }, 8, ["loading"])]), !He(l) && !He(u) ? (zn(), Hn("p", Fl, " Select filters and click Query. Leave API key empty to aggregate all keys. ")) : Oa("", true), He(l) ? (zn(), Hn(jr, { key: 1 }, [gn("div", Pl, [Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Requests", value: He(l).summary.total_requests.toLocaleString() }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Input Tokens", value: c(He(l).summary.total_input_tokens) }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Output Tokens", value: c(He(l).summary.total_output_tokens) }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Total Cost", value: f(He(l).summary.total_cost) }, null, 8, ["value"])]), _: 1 })]), Oe(F, { columns: He(p), data: He(l).data, pagination: { pageSize: 50 }, size: "small" }, null, 8, ["columns", "data"])], 64)) : Oa("", true)]);
  };
} });
export {
  ql as default
};
