var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as Br, u as qr, _ as jr } from "./useApi-ViaiVG_-.js";
import { e as Qa, a as Xa, b as Ka, X as bt, B as Pe, u as On, _ as Ft } from "./Button-DSNNFXd2.js";
import { av as ua, j as o, af as Ga, aj as Za, b as Ja, E as Ur, ae as er, i as Pn, r as _, ar as wn, c as y, w as dt, d as Qe, ao as st, o as tr, T as ca, an as fa, at as ha, aw as Lr, e as $, f as L, g as j, h as me, G as Ht, W as Dn, k as nr, l as Rn, m as Cn, as as ar, t as Ue, a4 as rr, P as Wr, al as Qr, I as _a, z as zn, y as gn, v as Oe, p as ct, q as He, x as Oa, L as Xr, s as Hn, D as En, B as Kr } from "./index-HnuybbhN.js";
import { u as ir, V as Zn, k as At, B as ma, l as va, n as pa, c as ga, o as jt, q as Ut, r as Lt, s as Wt, f as or, t as Qt, v as kn, w as lr, a as Gr, _ as Zr } from "./DataTable-r4E-uZoH.js";
import { r as sr, d as Ne, b as J, u as dr, a as Jn, c as pe } from "./use-form-item-DgrHZmhA.js";
import { _ as Jr } from "./FormItem-CcawL2pJ.js";
import { _ as ei } from "./Statistic-83i-1M9O.js";
const ur = 6048e5, ti = 864e5, ni = 6e4, ai = 36e5, ri = 1e3, Pa = Symbol.for("constructDateFrom");
function oe(n, e) {
  return typeof n == "function" ? n(e) : n && typeof n == "object" && Pa in n ? n[Pa](e) : n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Zt(n, ...e) {
  const a = oe.bind(null, n || e.find((t) => typeof t == "object"));
  return e.map(a);
}
let ii = {};
function Jt() {
  return ii;
}
function R(n, e) {
  return oe(e || n, n);
}
function tt(n, e) {
  var _a2, _b, _c, _d;
  const a = Jt(), t = (e == null ? void 0 : e.weekStartsOn) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? a.weekStartsOn ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, r = R(n, e == null ? void 0 : e.in), i = r.getDay(), l = (i < t ? 7 : 0) + i - t;
  return r.setDate(r.getDate() - l), r.setHours(0, 0, 0, 0), r;
}
function oi(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e);
  return +tt(t, a) == +tt(r, a);
}
const Ra = ua("date", () => o("svg", { width: "28px", height: "28px", viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, o("g", { "fill-rule": "nonzero" }, o("path", { d: "M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z M23.5,9.503 L4.5,9.503 L4.5,21.75 C4.5,22.7164983 5.28350169,23.5 6.25,23.5 L21.75,23.5 C22.7164983,23.5 23.5,22.7164983 23.5,21.75 L23.5,9.503 Z M21.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,8.003 L23.5,8.003 L23.5,6.25 C23.5,5.28350169 22.7164983,4.5 21.75,4.5 Z" }))))), li = ua("time", () => o("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, o("path", { d: "M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z", style: `
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
      ` }))), si = ua("to", () => o("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, o("g", { fill: "currentColor", "fill-rule": "nonzero" }, o("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" })))));
function Bt(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
  return isNaN(e) ? oe((a == null ? void 0 : a.in) || n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function ke(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
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
function cr(n, e) {
  const a = R(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = oe(a, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = Xt(r), l = oe(a, 0);
  l.setFullYear(t, 0, 4), l.setHours(0, 0, 0, 0);
  const d = Xt(l);
  return a.getTime() >= i.getTime() ? t + 1 : a.getTime() >= d.getTime() ? t : t - 1;
}
function xn(n) {
  const e = R(n), a = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return a.setUTCFullYear(e.getFullYear()), +n - +a;
}
function Kt(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setHours(0, 0, 0, 0), a;
}
function di(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e), i = Kt(t), l = Kt(r), d = +i - xn(i), u = +l - xn(l);
  return Math.round((d - u) / ti);
}
function ui(n, e) {
  const a = cr(n, e), t = oe(n, 0);
  return t.setFullYear(a, 0, 4), t.setHours(0, 0, 0, 0), Xt(t);
}
function ci(n, e, a) {
  return ke(n, e * 3, a);
}
function ea(n, e, a) {
  return ke(n, e * 12, a);
}
function fi(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e);
  return +Kt(t) == +Kt(r);
}
function hi(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function We(n) {
  return !(!hi(n) && typeof n != "number" || isNaN(+R(n)));
}
function mi(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return Math.trunc(a.getMonth() / 3) + 1;
}
function hn(n, e) {
  const a = R(n, e == null ? void 0 : e.in), t = a.getMonth(), r = t - t % 3;
  return a.setMonth(r, 1), a.setHours(0, 0, 0, 0), a;
}
function ft(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setDate(1), a.setHours(0, 0, 0, 0), a;
}
function mn(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setFullYear(a.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
}
function vi(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return di(a, mn(a)) + 1;
}
function fr(n, e) {
  const a = R(n, e == null ? void 0 : e.in), t = +Xt(a) - +ui(a);
  return Math.round(t / ur) + 1;
}
function ya(n, e) {
  var _a2, _b, _c, _d;
  const a = R(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = Jt(), i = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d = (_c = r.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = oe((e == null ? void 0 : e.in) || n, 0);
  l.setFullYear(t + 1, 0, i), l.setHours(0, 0, 0, 0);
  const d = tt(l, e), u = oe((e == null ? void 0 : e.in) || n, 0);
  u.setFullYear(t, 0, i), u.setHours(0, 0, 0, 0);
  const f = tt(u, e);
  return +a >= +d ? t + 1 : +a >= +f ? t : t - 1;
}
function pi(n, e) {
  var _a2, _b, _c, _d;
  const a = Jt(), t = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, r = ya(n, e), i = oe((e == null ? void 0 : e.in) || n, 0);
  return i.setFullYear(r, 0, t), i.setHours(0, 0, 0, 0), tt(i, e);
}
function hr(n, e) {
  const a = R(n, e == null ? void 0 : e.in), t = +tt(a, e) - +pi(a, e);
  return Math.round(t / ur) + 1;
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
} }, Nt = { midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, Fa = { G: function(n, e, a) {
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
  const a = cr(n);
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
  const r = hr(n, t);
  return e === "wo" ? a.ordinalNumber(r, { unit: "week" }) : X(r, e.length);
}, I: function(n, e, a) {
  const t = fr(n);
  return e === "Io" ? a.ordinalNumber(t, { unit: "week" }) : X(t, e.length);
}, d: function(n, e, a) {
  return e === "do" ? a.ordinalNumber(n.getDate(), { unit: "date" }) : gt.d(n, e);
}, D: function(n, e, a) {
  const t = vi(n);
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
      return Rt(t);
    case "XXXXX":
    case "XXX":
    default:
      return Rt(t, ":");
  }
}, x: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "x":
      return Aa(t);
    case "xxxx":
    case "xx":
      return Rt(t);
    case "xxxxx":
    case "xxx":
    default:
      return Rt(t, ":");
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
      return "GMT" + Rt(t, ":");
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
      return "GMT" + Rt(t, ":");
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
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + X(Math.abs(n) / 60, 2) : Rt(n, e);
}
function Rt(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = X(Math.trunc(t / 60), 2), i = X(t % 60, 2);
  return a + r + e + i;
}
const Ia = (n, e) => {
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
}, mr = (n, e) => {
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
}, gi = (n, e) => {
  const a = n.match(/(P+)(p+)?/) || [], t = a[1], r = a[2];
  if (!r) return Ia(n, e);
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
  return i.replace("{{date}}", Ia(t, e)).replace("{{time}}", mr(r, e));
}, ta = { p: mr, P: gi }, yi = /^D+$/, bi = /^Y+$/, wi = ["D", "DD", "YY", "YYYY"];
function vr(n) {
  return yi.test(n);
}
function pr(n) {
  return bi.test(n);
}
function na(n, e, a) {
  const t = Di(n, e, a);
  if (console.warn(t), wi.includes(n)) throw new RangeError(t);
}
function Di(n, e, a) {
  const t = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${t} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ci = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ki = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, xi = /^'([^]*?)'?$/, Si = /''/g, Ti = /[a-zA-Z]/;
function K(n, e, a) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const t = Jt(), r = (a == null ? void 0 : a.locale) ?? t.locale ?? Qa, i = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = (a == null ? void 0 : a.weekStartsOn) ?? ((_f = (_e = a == null ? void 0 : a.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? t.weekStartsOn ?? ((_h = (_g = t.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0, d = R(n, a == null ? void 0 : a.in);
  if (!We(d)) throw new RangeError("Invalid time value");
  let u = e.match(ki).map((h) => {
    const p = h[0];
    if (p === "p" || p === "P") {
      const g = ta[p];
      return g(h, r.formatLong);
    }
    return h;
  }).join("").match(Ci).map((h) => {
    if (h === "''") return { isToken: false, value: "'" };
    const p = h[0];
    if (p === "'") return { isToken: false, value: Mi(h) };
    if (Fa[p]) return { isToken: true, value: h };
    if (p.match(Ti)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + p + "`");
    return { isToken: false, value: h };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(d, u));
  const f = { firstWeekContainsDate: i, weekStartsOn: l, locale: r };
  return u.map((h) => {
    if (!h.isToken) return h.value;
    const p = h.value;
    (!(a == null ? void 0 : a.useAdditionalWeekYearTokens) && pr(p) || !(a == null ? void 0 : a.useAdditionalDayOfYearTokens) && vr(p)) && na(p, e, String(n));
    const g = Fa[p[0]];
    return g(d, p, r.localize, f);
  }).join("");
}
function Mi(n) {
  const e = n.match(xi);
  return e ? e[1].replace(Si, "'") : n;
}
function Le(n, e) {
  return R(n, e == null ? void 0 : e.in).getDate();
}
function _i(n, e) {
  return R(n, e == null ? void 0 : e.in).getDay();
}
function Oi(n, e) {
  const a = R(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = a.getMonth(), i = oe(a, 0);
  return i.setFullYear(t, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function gr() {
  return Object.assign({}, Jt());
}
function yt(n, e) {
  return R(n, e == null ? void 0 : e.in).getHours();
}
function Pi(n, e) {
  const a = R(n, e == null ? void 0 : e.in).getDay();
  return a === 0 ? 7 : a;
}
function Ri(n) {
  return R(n).getMilliseconds();
}
function Sn(n, e) {
  return R(n, e == null ? void 0 : e.in).getMinutes();
}
function te(n, e) {
  return R(n, e == null ? void 0 : e.in).getMonth();
}
function Tn(n) {
  return R(n).getSeconds();
}
function D(n) {
  return +R(n);
}
function ie(n, e) {
  return R(n, e == null ? void 0 : e.in).getFullYear();
}
function Fi(n, e) {
  const a = Yi(e) ? new e(0) : oe(e, 0);
  return a.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), a.setHours(n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()), a;
}
function Yi(n) {
  var _a2;
  return typeof n == "function" && ((_a2 = n.prototype) == null ? void 0 : _a2.constructor) === n;
}
const Ai = 10;
class yr {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(e, a) {
    return true;
  }
}
class Ii extends yr {
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
class $i extends yr {
  constructor(e, a) {
    super();
    __publicField(this, "priority", Ai);
    __publicField(this, "subPriority", -1);
    this.context = e || ((t) => oe(a, t));
  }
  set(e, a) {
    return a.timestampIsSet ? e : oe(e, Fi(e, this.context));
  }
}
class W {
  run(e, a, t, r) {
    const i = this.parse(e, a, t, r);
    return i ? { setter: new Ii(i.value, this.validate, this.set, this.priority, this.subPriority), rest: i.rest } : null;
  }
  validate(e, a, t) {
    return true;
  }
}
class Vi extends W {
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
  return { value: t * (r * ai + i * ni + l * ri), rest: e.slice(a[0].length) };
}
function br(n) {
  return le(ce.anyDigitsSigned, n);
}
function ue(n, e) {
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
function Mn(n, e) {
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
function wr(n, e) {
  const a = e > 0, t = a ? e : 1 - e;
  let r;
  if (t <= 50) r = n || 100;
  else {
    const i = t + 50, l = Math.trunc(i / 100) * 100, d = n >= i % 100;
    r = n + l - (d ? 100 : 0);
  }
  return a ? r : 1 - r;
}
function Dr(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class Ni extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => ({ year: i, isTwoDigitYear: a === "yy" });
    switch (a) {
      case "y":
        return fe(ue(4, e), r);
      case "yo":
        return fe(t.ordinalNumber(e, { unit: "year" }), r);
      default:
        return fe(ue(a.length, e), r);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, t) {
    const r = e.getFullYear();
    if (t.isTwoDigitYear) {
      const l = wr(t.year, r);
      return e.setFullYear(l, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const i = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(i, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class zi extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
  }
  parse(e, a, t) {
    const r = (i) => ({ year: i, isTwoDigitYear: a === "YY" });
    switch (a) {
      case "Y":
        return fe(ue(4, e), r);
      case "Yo":
        return fe(t.ordinalNumber(e, { unit: "year" }), r);
      default:
        return fe(ue(a.length, e), r);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, t, r) {
    const i = ya(e, r);
    if (t.isTwoDigitYear) {
      const d = wr(t.year, i);
      return e.setFullYear(d, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), tt(e, r);
    }
    const l = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(l, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), tt(e, r);
  }
}
class Hi extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return Mn(a === "R" ? 4 : a.length, e);
  }
  set(e, a, t) {
    const r = oe(e, 0);
    return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), Xt(r);
  }
}
class Ei extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return Mn(a === "u" ? 4 : a.length, e);
  }
  set(e, a, t) {
    return e.setFullYear(t, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Bi extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "Q":
      case "QQ":
        return ue(a.length, e);
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
class qi extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, t) {
    switch (a) {
      case "q":
      case "qq":
        return ue(a.length, e);
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
class ji extends W {
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
        return fe(ue(2, e), r);
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
class Ui extends W {
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
        return fe(ue(2, e), r);
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
function Li(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in), r = hr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), R(t, a == null ? void 0 : a.in);
}
class Wi extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, t, r) {
    return tt(Li(e, t, r), r);
  }
}
function Qi(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in), r = fr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), t;
}
class Xi extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, t) {
    return Xt(Qi(e, t));
  }
}
const Ki = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Gi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class Zi extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    const t = e.getFullYear(), r = Dr(t), i = e.getMonth();
    return r ? a >= 1 && a <= Gi[i] : a >= 1 && a <= Ki[i];
  }
  set(e, a, t) {
    return e.setDate(t), e.setHours(0, 0, 0, 0), e;
  }
}
class Ji extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    const t = e.getFullYear();
    return Dr(t) ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
  }
  set(e, a, t) {
    return e.setMonth(0, t), e.setHours(0, 0, 0, 0), e;
  }
}
function wa(n, e, a) {
  var _a2, _b, _c, _d;
  const t = Jt(), r = (a == null ? void 0 : a.weekStartsOn) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? t.weekStartsOn ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, i = R(n, a == null ? void 0 : a.in), l = i.getDay(), u = (e % 7 + 7) % 7, f = 7 - r, h = e < 0 || e > 6 ? e - (l + f) % 7 : (u + f) % 7 - (l + f) % 7;
  return Bt(i, h, a);
}
class eo extends W {
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
class to extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
  }
  parse(e, a, t, r) {
    const i = (l) => {
      const d = Math.floor((l - 1) / 7) * 7;
      return (l + r.weekStartsOn + 6) % 7 + d;
    };
    switch (a) {
      case "e":
      case "ee":
        return fe(ue(a.length, e), i);
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
class no extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
  }
  parse(e, a, t, r) {
    const i = (l) => {
      const d = Math.floor((l - 1) / 7) * 7;
      return (l + r.weekStartsOn + 6) % 7 + d;
    };
    switch (a) {
      case "c":
      case "cc":
        return fe(ue(a.length, e), i);
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
function ao(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in), r = Pi(t, a), i = e - r;
  return Bt(t, i, a);
}
class ro extends W {
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
        return ue(a.length, e);
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
    return e = ao(e, t), e.setHours(0, 0, 0, 0), e;
  }
}
class io extends W {
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
class oo extends W {
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
class lo extends W {
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
class so extends W {
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
        return ue(a.length, e);
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
class uo extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 23;
  }
  set(e, a, t) {
    return e.setHours(t, 0, 0, 0), e;
  }
}
class co extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, t) {
    return e.getHours() >= 12 && t < 12 ? e.setHours(t + 12, 0, 0, 0) : e.setHours(t, 0, 0, 0), e;
  }
}
class fo extends W {
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
        return ue(a.length, e);
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
class ho extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, t) {
    return e.setMinutes(t, 0, 0), e;
  }
}
class mo extends W {
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
        return ue(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, t) {
    return e.setSeconds(t, 0), e;
  }
}
class vo extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a) {
    const t = (r) => Math.trunc(r * Math.pow(10, -a.length + 3));
    return fe(ue(a.length, e), t);
  }
  set(e, a, t) {
    return e.setMilliseconds(t), e;
  }
}
class po extends W {
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
class go extends W {
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
class yo extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return br(e);
  }
  set(e, a, t) {
    return [oe(e, t * 1e3), { timestampIsSet: true }];
  }
}
class bo extends W {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return br(e);
  }
  set(e, a, t) {
    return [oe(e, t), { timestampIsSet: true }];
  }
}
const wo = { G: new Vi(), y: new Ni(), Y: new zi(), R: new Hi(), u: new Ei(), Q: new Bi(), q: new qi(), M: new ji(), L: new Ui(), w: new Wi(), I: new Xi(), d: new Zi(), D: new Ji(), E: new eo(), e: new to(), c: new no(), i: new ro(), a: new io(), b: new oo(), B: new lo(), h: new so(), H: new uo(), K: new co(), k: new fo(), m: new ho(), s: new mo(), S: new vo(), X: new po(), x: new go(), t: new yo(), T: new bo() }, Do = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Co = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ko = /^'([^]*?)'?$/, xo = /''/g, So = /\S/, To = /[a-zA-Z]/;
function Mo(n, e, a, t) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const r = () => oe((t == null ? void 0 : t.in) || a, NaN), i = gr(), l = (t == null ? void 0 : t.locale) ?? i.locale ?? Qa, d = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((_d = (_c = i.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, u = (t == null ? void 0 : t.weekStartsOn) ?? ((_f = (_e = t == null ? void 0 : t.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? i.weekStartsOn ?? ((_h = (_g = i.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (!e) return n ? r() : R(a, t == null ? void 0 : t.in);
  const f = { firstWeekContainsDate: d, weekStartsOn: u, locale: l }, h = [new $i(t == null ? void 0 : t.in, a)], p = e.match(Co).map((S) => {
    const Y = S[0];
    if (Y in ta) {
      const N = ta[Y];
      return N(S, l.formatLong);
    }
    return S;
  }).join("").match(Do), g = [];
  for (let S of p) {
    !(t == null ? void 0 : t.useAdditionalWeekYearTokens) && pr(S) && na(S, e, n), !(t == null ? void 0 : t.useAdditionalDayOfYearTokens) && vr(S) && na(S, e, n);
    const Y = S[0], N = wo[Y];
    if (N) {
      const { incompatibleTokens: q } = N;
      if (Array.isArray(q)) {
        const P = g.find((E) => q.includes(E.token) || E.token === Y);
        if (P) throw new RangeError(`The format string mustn't contain \`${P.fullToken}\` and \`${S}\` at the same time`);
      } else if (N.incompatibleTokens === "*" && g.length > 0) throw new RangeError(`The format string mustn't contain \`${S}\` and any other token at the same time`);
      g.push({ token: Y, fullToken: S });
      const H = N.run(n, S, l.match, f);
      if (!H) return r();
      h.push(H.setter), n = H.rest;
    } else {
      if (Y.match(To)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + Y + "`");
      if (S === "''" ? S = "'" : Y === "'" && (S = _o(S)), n.indexOf(S) === 0) n = n.slice(S.length);
      else return r();
    }
  }
  if (n.length > 0 && So.test(n)) return r();
  const T = h.map((S) => S.priority).sort((S, Y) => Y - S).filter((S, Y, N) => N.indexOf(S) === Y).map((S) => h.filter((Y) => Y.priority === S).sort((Y, N) => N.subPriority - Y.subPriority)).map((S) => S[0]);
  let F = R(a, t == null ? void 0 : t.in);
  if (isNaN(+F)) return r();
  const G = {};
  for (const S of T) {
    if (!S.validate(F, f)) return r();
    const Y = S.set(F, G, f);
    Array.isArray(Y) ? (F = Y[0], Object.assign(G, Y[1])) : F = Y;
  }
  return F;
}
function _o(n) {
  return n.match(ko)[1].replace(xo, "'");
}
function Oo(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setMinutes(0, 0, 0), a;
}
function Po(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setSeconds(0, 0), a;
}
function vn(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function Cr(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e);
  return +hn(t) == +hn(r);
}
function Da(n, e) {
  const a = R(n, e == null ? void 0 : e.in);
  return a.setMilliseconds(0), a;
}
function kr(n, e, a) {
  const [t, r] = Zt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear();
}
function Ca(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in), r = t.getFullYear(), i = t.getDate(), l = oe(n, 0);
  l.setFullYear(r, e, 15), l.setHours(0, 0, 0, 0);
  const d = Oi(l);
  return t.setMonth(e, Math.min(i, d)), t;
}
function xe(n, e, a) {
  let t = R(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (e.year != null && t.setFullYear(e.year), e.month != null && (t = Ca(t, e.month)), e.date != null && t.setDate(e.date), e.hours != null && t.setHours(e.hours), e.minutes != null && t.setMinutes(e.minutes), e.seconds != null && t.setSeconds(e.seconds), e.milliseconds != null && t.setMilliseconds(e.milliseconds), t);
}
function Pt(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
  return t.setHours(e), t;
}
function Bn(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
  return t.setMinutes(e), t;
}
function Ro(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in), r = Math.trunc(t.getMonth() / 3) + 1, i = e - r;
  return Ca(t, t.getMonth() + i * 3);
}
function qn(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
  return t.setSeconds(e), t;
}
function aa(n, e, a) {
  const t = R(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (t.setFullYear(e), t);
}
const Fo = { date: fi, month: vn, year: kr, quarter: Cr };
function Yo(n) {
  return (e, a) => {
    const t = Ao(n);
    return oi(e, a, { weekStartsOn: t });
  };
}
function Ao(n) {
  return (n + 1) % 7;
}
function Ye(n, e, a, t = 0) {
  return (a === "week" ? Yo(t) : Fo[a])(n, e);
}
function jn(n, e, a, t, r, i) {
  return r === "date" ? Io(n, e, a, t) : $o(n, e, a, t, i);
}
function Io(n, e, a, t) {
  let r = false, i = false, l = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (r = true), Ye(a[0], n, "date") && (i = true), Ye(a[1], n, "date") && (l = true));
  const d = a !== null && (Array.isArray(a) ? Ye(a[0], n, "date") || Ye(a[1], n, "date") : Ye(a, n, "date"));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: vn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: r, inSelectedWeek: false, startOfSpan: i, endOfSpan: l, selected: d, ts: D(n) };
}
function xr(n, e, a) {
  const t = new Date(2e3, n, 1).getTime();
  return K(t, e, { locale: a });
}
function Sr(n, e, a) {
  const t = new Date(n, 1, 1).getTime();
  return K(t, e, { locale: a });
}
function Tr(n, e, a) {
  const t = new Date(2e3, n * 3 - 2, 1).getTime();
  return K(t, e, { locale: a });
}
function $o(n, e, a, t, r) {
  let i = false, l = false, d = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (i = true), Ye(a[0], n, "week", r) && (l = true), Ye(a[1], n, "week", r) && (d = true));
  const u = a !== null && (Array.isArray(a) ? Ye(a[0], n, "week", r) || Ye(a[1], n, "week", r) : Ye(a, n, "week", r));
  return { type: "date", dateObject: { date: Le(n), month: te(n), year: ie(n) }, inCurrentMonth: vn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: i, startOfSpan: l, endOfSpan: d, selected: false, inSelectedWeek: u, ts: D(n) };
}
function Vo(n, e, a, { monthFormat: t }) {
  return { type: "month", monthFormat: t, dateObject: { month: te(n), year: ie(n) }, isCurrent: vn(a, n), selected: e !== null && Ye(e, n, "month"), ts: D(n) };
}
function No(n, e, a, { yearFormat: t }) {
  return { type: "year", yearFormat: t, dateObject: { year: ie(n) }, isCurrent: kr(a, n), selected: e !== null && Ye(e, n, "year"), ts: D(n) };
}
function zo(n, e, a, { quarterFormat: t }) {
  return { type: "quarter", quarterFormat: t, dateObject: { quarter: mi(n), year: ie(n) }, isCurrent: Cr(a, n), selected: e !== null && Ye(e, n, "quarter"), ts: D(n) };
}
function ra(n, e, a, t, r = false, i = false) {
  const l = i ? "week" : "date", d = te(n);
  let u = D(ft(n)), f = D(Bt(u, -1));
  const h = [];
  let p = !r;
  for (; _i(f) !== t || p; ) h.unshift(jn(f, n, e, a, l, t)), f = D(Bt(f, -1)), p = false;
  for (; te(u) === d; ) h.push(jn(u, n, e, a, l, t)), u = D(Bt(u, 1));
  const g = r ? h.length <= 28 ? 28 : h.length <= 35 ? 35 : 42 : 42;
  for (; h.length < g; ) h.push(jn(u, n, e, a, l, t)), u = D(Bt(u, 1));
  return h;
}
function ia(n, e, a, t) {
  const r = [], i = mn(n);
  for (let l = 0; l < 12; l++) r.push(Vo(D(ke(i, l)), e, a, t));
  return r;
}
function oa(n, e, a, t) {
  const r = [], i = mn(n);
  for (let l = 0; l < 4; l++) r.push(zo(D(ci(i, l)), e, a, t));
  return r;
}
function la(n, e, a, t) {
  const r = t.value, i = [], l = mn(aa(/* @__PURE__ */ new Date(), r[0]));
  for (let d = 0; d < r[1] - r[0]; d++) i.push(No(D(ea(l, d)), n, e, a));
  return i;
}
function Ve(n, e, a, t) {
  const r = Mo(n, e, a, t);
  return We(r) ? K(r, e, t) === n ? r : new Date(Number.NaN) : r;
}
function Ho(n, e) {
  const a = e(n);
  return qt(a);
}
function $a(n, e, a, t) {
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
const Eo = { itemFontSize: "12px", itemHeight: "36px", itemWidth: "52px", panelActionPadding: "8px 0" };
function Bo(n) {
  const { popoverColor: e, textColor2: a, primaryColor: t, hoverColor: r, dividerColor: i, opacityDisabled: l, boxShadow2: d, borderRadius: u, iconColor: f, iconColorDisabled: h } = n;
  return Object.assign(Object.assign({}, Eo), { panelColor: e, panelBoxShadow: d, panelDividerColor: i, itemTextColor: a, itemTextColorActive: t, itemColorHover: r, itemOpacityDisabled: l, itemBorderRadius: u, borderRadius: u, iconColor: f, iconColorDisabled: h });
}
const Mr = Ga({ name: "TimePicker", common: Ja, peers: { Scrollbar: Za, Button: Ka, Input: Xa }, self: Bo }), qo = { itemSize: "24px", itemCellWidth: "38px", itemCellHeight: "32px", scrollItemWidth: "80px", scrollItemHeight: "40px", panelExtraFooterPadding: "8px 12px", panelActionPadding: "8px 12px", calendarTitlePadding: "0", calendarTitleHeight: "28px", arrowSize: "14px", panelHeaderPadding: "8px 12px", calendarDaysHeight: "32px", calendarTitleGridTempateColumns: "28px 28px 1fr 28px 28px", calendarLeftPaddingDate: "6px 12px 4px 12px", calendarLeftPaddingDatetime: "4px 12px", calendarLeftPaddingDaterange: "6px 12px 4px 12px", calendarLeftPaddingDatetimerange: "4px 12px", calendarLeftPaddingMonth: "0", calendarLeftPaddingYear: "0", calendarLeftPaddingQuarter: "0", calendarLeftPaddingMonthrange: "0", calendarLeftPaddingQuarterrange: "0", calendarLeftPaddingYearrange: "0", calendarLeftPaddingWeek: "6px 12px 4px 12px", calendarRightPaddingDate: "6px 12px 4px 12px", calendarRightPaddingDatetime: "4px 12px", calendarRightPaddingDaterange: "6px 12px 4px 12px", calendarRightPaddingDatetimerange: "4px 12px", calendarRightPaddingMonth: "0", calendarRightPaddingYear: "0", calendarRightPaddingQuarter: "0", calendarRightPaddingMonthrange: "0", calendarRightPaddingQuarterrange: "0", calendarRightPaddingYearrange: "0", calendarRightPaddingWeek: "0" };
function jo(n) {
  const { hoverColor: e, fontSize: a, textColor2: t, textColorDisabled: r, popoverColor: i, primaryColor: l, borderRadiusSmall: d, iconColor: u, iconColorDisabled: f, textColor1: h, dividerColor: p, boxShadow2: g, borderRadius: T, fontWeightStrong: F } = n;
  return Object.assign(Object.assign({}, qo), { itemFontSize: a, calendarDaysFontSize: a, calendarTitleFontSize: a, itemTextColor: t, itemTextColorDisabled: r, itemTextColorActive: i, itemTextColorCurrent: l, itemColorIncluded: Ur(l, { alpha: 0.1 }), itemColorHover: e, itemColorDisabled: e, itemColorActive: l, itemBorderRadius: d, panelColor: i, panelTextColor: t, arrowColor: u, calendarTitleTextColor: h, calendarTitleColorHover: e, calendarDaysTextColor: t, panelHeaderDividerColor: p, calendarDaysDividerColor: p, calendarDividerColor: p, panelActionDividerColor: p, panelBoxShadow: g, panelBorderRadius: T, calendarTitleFontWeight: F, scrollItemBorderRadius: T, iconColor: u, iconColorDisabled: f });
}
const Uo = Ga({ name: "DatePicker", common: Ja, peers: { Input: Xa, Button: Ka, TimePicker: Mr, Scrollbar: Za }, self: jo }), Fn = er("n-date-picker"), Yt = 40, Lo = "HH:mm:ss", _r = { active: Boolean, dateFormat: String, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, required: true }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, timePickerFormat: { type: String, value: Lo }, value: { type: [Array, Number], default: null }, shortcuts: Object, defaultTime: [Number, String, Array, Function], inputReadonly: Boolean, onClear: Function, onConfirm: Function, onClose: Function, onTabOut: Function, onKeydown: Function, actions: Array, onSelectYear: Function, onSelectMonth: Function, onUpdateValue: { type: Function, required: true }, themeClass: String, onRender: Function, panel: Boolean, onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function };
function Or(n) {
  const { dateLocaleRef: e, timePickerSizeRef: a, timePickerPropsRef: t, localeRef: r, mergedClsPrefixRef: i, mergedThemeRef: l } = Pn(Fn), d = y(() => ({ locale: e.value.locale })), u = _(null), f = ir();
  function h() {
    const { onClear: V } = n;
    V && V();
  }
  function p() {
    const { onConfirm: V, value: k } = n;
    V && V(k);
  }
  function g(V, k) {
    const { onUpdateValue: De } = n;
    De(V, k);
  }
  function T(V = false) {
    const { onClose: k } = n;
    k && k(V);
  }
  function F() {
    const { onTabOut: V } = n;
    V && V();
  }
  function G() {
    g(null, true), T(true), h();
  }
  function S() {
    F();
  }
  function Y() {
    (n.active || n.panel) && wn(() => {
      const { value: V } = u;
      if (!V) return;
      const k = V.querySelectorAll("[data-n-date]");
      k.forEach((De) => {
        De.classList.add("transition-disabled");
      }), V.offsetWidth, k.forEach((De) => {
        De.classList.remove("transition-disabled");
      });
    });
  }
  function N(V) {
    V.key === "Tab" && V.target === u.value && f.shift && (V.preventDefault(), F());
  }
  function q(V) {
    const { value: k } = u;
    f.tab && V.target === k && (k == null ? void 0 : k.contains(V.relatedTarget)) && F();
  }
  let H = null, P = false;
  function E() {
    H = n.value, P = true;
  }
  function U() {
    P = false;
  }
  function be() {
    P && (g(H, false), P = false);
  }
  function Xe(V) {
    return typeof V == "function" ? V() : V;
  }
  const ae = _(false);
  function we() {
    ae.value = !ae.value;
  }
  return { mergedTheme: l, mergedClsPrefix: i, dateFnsOptions: d, timePickerSize: a, timePickerProps: t, selfRef: u, locale: r, doConfirm: p, doClose: T, doUpdateValue: g, doTabOut: F, handleClearClick: G, handleFocusDetectorFocus: S, disableTransitionOneTick: Y, handlePanelKeyDown: N, handlePanelFocus: q, cachePendingValue: E, clearPendingValue: U, restorePendingValue: be, getShortcutValue: Xe, handleShortcutMouseleave: be, showMonthYearPanel: ae, handleOpenQuickSelectMonthPanel: we };
}
const ka = Object.assign(Object.assign({}, _r), { defaultCalendarStartTime: Number, actions: { type: Array, default: () => ["now", "clear", "confirm"] } });
function xa(n, e) {
  var a;
  const t = Or(n), { isValueInvalidRef: r, isDateDisabledRef: i, isDateInvalidRef: l, isTimeInvalidRef: d, isDateTimeInvalidRef: u, isHourDisabledRef: f, isMinuteDisabledRef: h, isSecondDisabledRef: p, localeRef: g, firstDayOfWeekRef: T, datePickerSlots: F, yearFormatRef: G, monthFormatRef: S, quarterFormatRef: Y, yearRangeRef: N } = Pn(Fn), q = { isValueInvalid: r, isDateDisabled: i, isDateInvalid: l, isTimeInvalid: d, isDateTimeInvalid: u, isHourDisabled: f, isMinuteDisabled: h, isSecondDisabled: p }, H = y(() => n.dateFormat || g.value.dateFormat), P = y(() => n.calendarDayFormat || g.value.dayFormat), E = _(n.value === null || Array.isArray(n.value) ? "" : K(n.value, H.value)), U = _(n.value === null || Array.isArray(n.value) ? (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Date.now() : n.value), be = _(null), Xe = _(null), ae = _(null), we = _(Date.now()), V = y(() => {
    var v;
    return ra(U.value, n.value, we.value, (v = T.value) !== null && v !== void 0 ? v : g.value.firstDayOfWeek, false, e === "week");
  }), k = y(() => {
    const { value: v } = n;
    return ia(U.value, Array.isArray(v) ? null : v, we.value, { monthFormat: S.value });
  }), De = y(() => {
    const { value: v } = n;
    return la(Array.isArray(v) ? null : v, we.value, { yearFormat: G.value }, N);
  }), Ke = y(() => {
    const { value: v } = n;
    return oa(U.value, Array.isArray(v) ? null : v, we.value, { quarterFormat: Y.value });
  }), Ee = y(() => V.value.slice(0, 7).map((v) => {
    const { ts: O } = v;
    return K(O, P.value, t.dateFnsOptions.value);
  })), Ge = y(() => K(U.value, n.calendarHeaderMonthFormat || g.value.monthFormat, t.dateFnsOptions.value)), Ze = y(() => K(U.value, n.calendarHeaderYearFormat || g.value.yearFormat, t.dateFnsOptions.value)), Be = y(() => {
    var v;
    return (v = n.calendarHeaderMonthBeforeYear) !== null && v !== void 0 ? v : g.value.monthBeforeYear;
  });
  dt(U, (v, O) => {
    (e === "date" || e === "datetime") && (vn(v, O) || t.disableTransitionOneTick());
  }), dt(y(() => n.value), (v) => {
    v !== null && !Array.isArray(v) ? (E.value = K(v, H.value, t.dateFnsOptions.value), U.value = v) : E.value = "";
  });
  function Se(v) {
    var O;
    if (e === "datetime") return D(Da(v));
    if (e === "month") return D(ft(v));
    if (e === "year") return D(mn(v));
    if (e === "quarter") return D(hn(v));
    if (e === "week") {
      const Q = (((O = T.value) !== null && O !== void 0 ? O : g.value.firstDayOfWeek) + 1) % 7;
      return D(tt(v, { weekStartsOn: Q }));
    }
    return D(Kt(v));
  }
  function Re(v, O) {
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
  function ut() {
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
  const Te = _(null);
  function he(v) {
    v.type === "date" && e === "week" && (Te.value = Se(D(v.ts)));
  }
  function ze(v) {
    return v.type === "date" && e === "week" ? Se(D(v.ts)) === Te.value : false;
  }
  function Me(v) {
    if (Re(v.ts, v.type === "date" ? { type: "date", year: v.dateObject.year, month: v.dateObject.month, date: v.dateObject.date } : v.type === "month" ? { type: "month", year: v.dateObject.year, month: v.dateObject.month } : v.type === "year" ? { type: "year", year: v.dateObject.year } : { type: "quarter", year: v.dateObject.year, quarter: v.dateObject.quarter })) return;
    let O;
    if (n.value !== null && !Array.isArray(n.value) ? O = n.value : O = Date.now(), e === "datetime" && n.defaultTime !== null && !Array.isArray(n.defaultTime)) {
      let Q;
      typeof n.defaultTime == "function" ? Q = Ho(v.ts, n.defaultTime) : Q = qt(n.defaultTime), Q && (O = D(xe(O, Q)));
    }
    switch (O = D(v.type === "quarter" && v.dateObject.quarter ? Ro(aa(O, v.dateObject.year), v.dateObject.quarter) : xe(O, v.dateObject)), t.doUpdateValue(Se(O), n.panel || e === "date" || e === "week" || e === "year"), e) {
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
    n.value !== null && !Array.isArray(n.value) ? Q = n.value : Q = Date.now(), Q = D(v.type === "month" ? Ca(Q, v.dateObject.month) : aa(Q, v.dateObject.year)), O(Q), Je(Q);
  }
  function Ie(v) {
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
  function Ct() {
    var v;
    U.value = D(ea(U.value, -1)), (v = n.onPrevYear) === null || v === void 0 || v.call(n);
  }
  function kt() {
    var v;
    U.value = D(ke(U.value, 1)), (v = n.onNextMonth) === null || v === void 0 || v.call(n);
  }
  function xt() {
    var v;
    U.value = D(ke(U.value, -1)), (v = n.onPrevMonth) === null || v === void 0 || v.call(n);
  }
  function St() {
    const { value: v } = be;
    return (v == null ? void 0 : v.listElRef) || null;
  }
  function Tt() {
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
  function Mt(v) {
    t.cachePendingValue();
    const O = t.getShortcutValue(v);
    typeof O == "number" && t.doUpdateValue(O, false);
  }
  function _t(v) {
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
  return Object.assign(Object.assign(Object.assign(Object.assign({ dateArray: V, monthArray: k, yearArray: De, quarterArray: Ke, calendarYear: Ze, calendarMonth: Ge, weekdays: Ee, calendarMonthBeforeYear: Be, mergedIsDateDisabled: Re, nextYear: Dt, prevYear: Ct, nextMonth: kt, prevMonth: xt, handleNowClick: ne, handleConfirmClick: ht, handleSingleShortcutMouseenter: Mt, handleSingleShortcutClick: _t }, q), t), Ot), { handleDateClick: Me, handleDateInputBlur: ut, handleDateInput: ge, handleDateMouseEnter: he, isWeekHovered: ze, handleTimePickerChange: qe, clearSelectedDateTime: re, virtualListContainer: St, virtualListContent: Tt, handleVirtualListScroll: mt, timePickerSize: t.timePickerSize, dateInputValue: E, datePickerSlots: F, handleQuickMonthClick: wt, justifyColumnsScrollState: Je, calendarValue: U, onUpdateCalendarValue: Ie });
}
const Pr = Qe({ name: "MonthPanel", props: Object.assign(Object.assign({}, ka), { type: { type: String, required: true }, useAsQuickJump: Boolean }), setup(n) {
  const e = xa(n, n.type), { dateLocaleRef: a } = On("DatePicker"), t = (l) => {
    switch (l.type) {
      case "year":
        return Sr(l.dateObject.year, l.yearFormat, a.value.locale);
      case "month":
        return xr(l.dateObject.month, l.monthFormat, a.value.locale);
      case "quarter":
        return Tr(l.dateObject.quarter, l.quarterFormat, a.value.locale);
    }
  }, { useAsQuickJump: r } = n, i = (l, d, u) => {
    const { mergedIsDateDisabled: f, handleDateClick: h, handleQuickMonthClick: p } = e;
    return o("div", { "data-n-date": true, key: d, class: [`${u}-date-panel-month-calendar__picker-col-item`, l.isCurrent && `${u}-date-panel-month-calendar__picker-col-item--current`, l.selected && `${u}-date-panel-month-calendar__picker-col-item--selected`, !r && f(l.ts, l.type === "year" ? { type: "year", year: l.dateObject.year } : l.type === "month" ? { type: "month", year: l.dateObject.year, month: l.dateObject.month } : l.type === "quarter" ? { type: "month", year: l.dateObject.year, month: l.dateObject.quarter } : null) && `${u}-date-panel-month-calendar__picker-col-item--disabled`], onClick: () => {
      var g, T;
      l.type === "year" ? (g = n.onSelectYear) === null || g === void 0 || g.call(n) : l.type === "month" && ((T = n.onSelectMonth) === null || T === void 0 || T.call(n)), r ? p(l, (F) => {
        n.onUpdateValue(F, false);
      }) : h(l);
    } }, t(l));
  };
  return tr(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: i });
}, render() {
  const { mergedClsPrefix: n, mergedTheme: e, shortcuts: a, actions: t, renderItem: r, type: i, onRender: l } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${n}-date-panel`, `${n}-date-panel--month`, !this.panel && `${n}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${n}-date-panel-month-calendar` }, o(st, { ref: "yearScrollbarRef", class: `${n}-date-panel-month-calendar__picker-col`, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, container: this.virtualListContainer, content: this.virtualListContent, horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Zn, { ref: "yearVlRef", items: this.yearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleVirtualListScroll, paddingBottom: 4 }, { default: ({ item: d, index: u }) => r(d, u, n) }) }), i === "month" || i === "quarter" ? o("div", { class: `${n}-date-panel-month-calendar__picker-col` }, o(st, { ref: "monthScrollbarRef", theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar }, { default: () => [(i === "month" ? this.monthArray : this.quarterArray).map((d, u) => r(d, u, n)), o("div", { class: `${n}-date-panel-${i}-calendar__padding` })] })) : null), sr(this.datePickerSlots.footer, (d) => d ? o("div", { class: `${n}-date-panel-footer` }, d) : null), (t == null ? void 0 : t.length) || a ? o("div", { class: `${n}-date-panel-actions` }, o("div", { class: `${n}-date-panel-actions__prefix` }, a && Object.keys(a).map((d) => {
    const u = a[d];
    return Array.isArray(u) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(u);
    }, onClick: () => {
      this.handleSingleShortcutClick(u);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => d });
  })), o("div", { class: `${n}-date-panel-actions__suffix` }, (t == null ? void 0 : t.includes("clear")) ? Ne(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, (t == null ? void 0 : t.includes("now")) ? Ne(this.datePickerSlots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, (t == null ? void 0 : t.includes("confirm")) ? Ne(this.datePickerSlots.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
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
  function d(f) {
    var h;
    t.value && !(!((h = e.value) === null || h === void 0) && h.contains(ha(f))) && (t.value = false);
  }
  function u() {
    r();
  }
  return { show: t, triggerRef: e, monthPanelRef: a, handleSelectYear: i, handleSelectMonth: l, handleHeaderClick: u, handleClickOutside: d };
}, render() {
  const { handleClickOutside: n, mergedClsPrefix: e } = this;
  return o("div", { class: `${e}-date-panel-month__month-year`, ref: "triggerRef" }, o(ma, null, { default: () => [o(va, null, { default: () => o("div", { class: [`${e}-date-panel-month__text`, this.show && `${e}-date-panel-month__text--active`], onClick: this.handleHeaderClick }, this.monthBeforeYear ? [this.calendarMonth, this.monthYearSeparator, this.calendarYear] : [this.calendarYear, this.monthYearSeparator, this.calendarMonth]) }), o(pa, { show: this.show, teleportDisabled: true }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: true }, { default: () => this.show ? fa(o(Pr, { ref: "monthPanelRef", onUpdateValue: this.onUpdateValue, onSelectYear: this.handleSelectYear, onSelectMonth: this.handleSelectMonth, actions: [], calendarHeaderMonthYearSeparator: this.monthYearSeparator, type: "month", key: "month", useAsQuickJump: true, value: this.value }), [[ga, n, void 0, { capture: true }]]) : null }) })] }));
} }), Wo = Qe({ name: "DatePanel", props: Object.assign(Object.assign({}, ka), { type: { type: String, required: true } }), setup(n) {
  return xa(n, n.type);
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: d, type: u } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--${u}`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${t}-date-panel-calendar` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.prevYear }, J(d["prev-year"], () => [o(jt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.prevMonth }, J(d["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: t, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.nextMonth }, J(d["next-month"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.nextYear }, J(d["next-year"], () => [o(Wt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel-dates` }, this.dateArray.map((f, h) => o("div", { "data-n-date": true, key: h, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(f.ts, { type: "date", year: f.dateObject.year, month: f.dateObject.month, date: f.dateObject.date }), [`${t}-date-panel-date--week-hovered`]: this.isWeekHovered(f), [`${t}-date-panel-date--week-selected`]: f.inSelectedWeek }], onClick: () => {
    this.handleDateClick(f);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(f);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const h = i[f];
    return Array.isArray(h) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(h);
    }, onClick: () => {
      this.handleSingleShortcutClick(h);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f });
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.$slots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ne(this.$slots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Sa = Object.assign(Object.assign({}, _r), { defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, actions: { type: Array, default: () => ["clear", "confirm"] } });
function Ta(n, e) {
  var a, t;
  const { isDateDisabledRef: r, isStartHourDisabledRef: i, isEndHourDisabledRef: l, isStartMinuteDisabledRef: d, isEndMinuteDisabledRef: u, isStartSecondDisabledRef: f, isEndSecondDisabledRef: h, isStartDateInvalidRef: p, isEndDateInvalidRef: g, isStartTimeInvalidRef: T, isEndTimeInvalidRef: F, isStartValueInvalidRef: G, isEndValueInvalidRef: S, isRangeInvalidRef: Y, localeRef: N, rangesRef: q, closeOnSelectRef: H, updateValueOnCloseRef: P, firstDayOfWeekRef: E, datePickerSlots: U, monthFormatRef: be, yearFormatRef: Xe, quarterFormatRef: ae, yearRangeRef: we } = Pn(Fn), V = { isDateDisabled: r, isStartHourDisabled: i, isEndHourDisabled: l, isStartMinuteDisabled: d, isEndMinuteDisabled: u, isStartSecondDisabled: f, isEndSecondDisabled: h, isStartDateInvalid: p, isEndDateInvalid: g, isStartTimeInvalid: T, isEndTimeInvalid: F, isStartValueInvalid: G, isEndValueInvalid: S, isRangeInvalid: Y }, k = Or(n), De = _(null), Ke = _(null), Ee = _(null), Ge = _(null), Ze = _(null), Be = _(null), Se = _(null), Re = _(null), { value: ge } = n, ut = (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Array.isArray(ge) && typeof ge[0] == "number" ? ge[0] : Date.now(), re = _(ut), ne = _((t = n.defaultCalendarEndTime) !== null && t !== void 0 ? t : Array.isArray(ge) && typeof ge[1] == "number" ? ge[1] : D(ke(ut, 1)));
  Ce(true);
  const Te = _(Date.now()), he = _(false), ze = _(0), Me = y(() => n.dateFormat || N.value.dateFormat), wt = y(() => n.calendarDayFormat || N.value.dayFormat), Ie = _(Array.isArray(ge) ? K(ge[0], Me.value, k.dateFnsOptions.value) : ""), B = _(Array.isArray(ge) ? K(ge[1], Me.value, k.dateFnsOptions.value) : ""), ht = y(() => he.value ? "end" : "start"), nt = y(() => {
    var s;
    return ra(re.value, n.value, Te.value, (s = E.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), Dt = y(() => {
    var s;
    return ra(ne.value, n.value, Te.value, (s = E.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), Ct = y(() => nt.value.slice(0, 7).map((s) => {
    const { ts: w } = s;
    return K(w, wt.value, k.dateFnsOptions.value);
  })), kt = y(() => K(re.value, n.calendarHeaderMonthFormat || N.value.monthFormat, k.dateFnsOptions.value)), xt = y(() => K(ne.value, n.calendarHeaderMonthFormat || N.value.monthFormat, k.dateFnsOptions.value)), St = y(() => K(re.value, n.calendarHeaderYearFormat || N.value.yearFormat, k.dateFnsOptions.value)), Tt = y(() => K(ne.value, n.calendarHeaderYearFormat || N.value.yearFormat, k.dateFnsOptions.value)), mt = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[0] : null;
  }), qe = y(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[1] : null;
  }), Mt = y(() => {
    const { shortcuts: s } = n;
    return s || q.value;
  }), _t = y(() => la(zt(n.value, "start"), Te.value, { yearFormat: Xe.value }, we)), Je = y(() => la(zt(n.value, "end"), Te.value, { yearFormat: Xe.value }, we)), Ot = y(() => {
    const s = zt(n.value, "start");
    return oa(s ?? Date.now(), s, Te.value, { quarterFormat: ae.value });
  }), v = y(() => {
    const s = zt(n.value, "end");
    return oa(s ?? Date.now(), s, Te.value, { quarterFormat: ae.value });
  }), O = y(() => {
    const s = zt(n.value, "start");
    return ia(s ?? Date.now(), s, Te.value, { monthFormat: be.value });
  }), Q = y(() => {
    const s = zt(n.value, "end");
    return ia(s ?? Date.now(), s, Te.value, { monthFormat: be.value });
  }), en = y(() => {
    var s;
    return (s = n.calendarHeaderMonthBeforeYear) !== null && s !== void 0 ? s : N.value.monthBeforeYear;
  });
  dt(y(() => n.value), (s) => {
    if (s !== null && Array.isArray(s)) {
      const [w, M] = s;
      Ie.value = K(w, Me.value, k.dateFnsOptions.value), B.value = K(M, Me.value, k.dateFnsOptions.value), he.value || z(s);
    } else Ie.value = "", B.value = "";
  });
  function It(s, w) {
    (e === "daterange" || e === "datetimerange") && (ie(s) !== ie(w) || te(s) !== te(w)) && k.disableTransitionOneTick();
  }
  dt(re, It), dt(ne, It);
  function Ce(s) {
    const w = ft(re.value), M = ft(ne.value);
    (n.bindCalendarMonths || w >= M) && (s ? ne.value = D(ke(w, 1)) : re.value = D(ke(M, -1)));
  }
  function je() {
    re.value = D(ke(re.value, 12)), Ce(true);
  }
  function vt() {
    re.value = D(ke(re.value, -12)), Ce(true);
  }
  function pt() {
    re.value = D(ke(re.value, 1)), Ce(true);
  }
  function tn() {
    re.value = D(ke(re.value, -1)), Ce(true);
  }
  function $e() {
    ne.value = D(ke(ne.value, 12)), Ce(false);
  }
  function at() {
    ne.value = D(ke(ne.value, -12)), Ce(false);
  }
  function $t() {
    ne.value = D(ke(ne.value, 1)), Ce(false);
  }
  function rt() {
    ne.value = D(ke(ne.value, -1)), Ce(false);
  }
  function m(s) {
    re.value = s, Ce(true);
  }
  function x(s) {
    ne.value = s, Ce(false);
  }
  function A(s) {
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
    re.value = w, ft(M) <= ft(w) ? ne.value = D(ft(ke(w, 1))) : ne.value = D(ft(M));
  }
  function se(s) {
    if (!he.value) he.value = true, ze.value = s.ts, I(s.ts, s.ts, "done");
    else {
      he.value = false;
      const { value: w } = n;
      n.panel && Array.isArray(w) ? I(w[0], w[1], "done") : H.value && e === "daterange" && (P.value ? c() : ye());
    }
  }
  function Fe(s) {
    if (he.value) {
      if (A(s.ts)) return;
      s.ts >= ze.value ? I(ze.value, s.ts, "wipPreview") : I(s.ts, ze.value, "wipPreview");
    }
  }
  function ye() {
    Y.value || (k.doConfirm(), c());
  }
  function c() {
    he.value = false, n.active && k.doClose();
  }
  function b(s) {
    typeof s != "number" && (s = D(s)), n.value === null ? k.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && k.doUpdateValue([s, Math.max(n.value[1], s)], n.panel);
  }
  function C(s) {
    typeof s != "number" && (s = D(s)), n.value === null ? k.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && k.doUpdateValue([Math.min(n.value[0], s), s], n.panel);
  }
  function I(s, w, M) {
    if (typeof s != "number" && (s = D(s)), M !== "shortcutPreview" && M !== "shortcutDone") {
      let ve, et;
      if (e === "datetimerange") {
        const { defaultTime: ee } = n;
        typeof ee == "function" ? (ve = $a(s, ee, "start", [s, w]), et = $a(w, ee, "end", [s, w])) : Array.isArray(ee) ? (ve = qt(ee[0]), et = qt(ee[1])) : (ve = qt(ee), et = ve);
      }
      ve && (s = D(xe(s, ve))), et && (w = D(xe(w, et)));
    }
    k.doUpdateValue([s, w], n.panel && (M === "done" || M === "shortcutDone"));
  }
  function Z(s) {
    return D(e === "datetimerange" ? Da(s) : e === "monthrange" ? ft(s) : Kt(s));
  }
  function _e(s) {
    const w = Ve(s, Me.value, /* @__PURE__ */ new Date(), k.dateFnsOptions.value);
    if (We(w)) if (n.value) {
      if (Array.isArray(n.value)) {
        const M = xe(n.value[0], { year: ie(w), month: te(w), date: Le(w) });
        b(Z(D(M)));
      }
    } else {
      const M = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
      b(Z(D(M)));
    }
    else Ie.value = s;
  }
  function de(s) {
    const w = Ve(s, Me.value, /* @__PURE__ */ new Date(), k.dateFnsOptions.value);
    if (We(w)) {
      if (n.value === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(w), month: te(w), date: Le(w) });
        C(Z(D(M)));
      } else if (Array.isArray(n.value)) {
        const M = xe(n.value[1], { year: ie(w), month: te(w), date: Le(w) });
        C(Z(D(M)));
      }
    } else B.value = s;
  }
  function nn() {
    const s = Ve(Ie.value, Me.value, /* @__PURE__ */ new Date(), k.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        b(Z(D(M)));
      } else if (Array.isArray(w)) {
        const M = xe(w[0], { year: ie(s), month: te(s), date: Le(s) });
        b(Z(D(M)));
      }
    } else Vt();
  }
  function an() {
    const s = Ve(B.value, Me.value, /* @__PURE__ */ new Date(), k.dateFnsOptions.value), { value: w } = n;
    if (We(s)) {
      if (w === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: Le(s) });
        C(Z(D(M)));
      } else if (Array.isArray(w)) {
        const M = xe(w[1], { year: ie(s), month: te(s), date: Le(s) });
        C(Z(D(M)));
      }
    } else Vt();
  }
  function Vt(s) {
    const { value: w } = n;
    if (w === null || !Array.isArray(w)) {
      Ie.value = "", B.value = "";
      return;
    }
    s === void 0 && (s = w), Ie.value = K(s[0], Me.value, k.dateFnsOptions.value), B.value = K(s[1], Me.value, k.dateFnsOptions.value);
  }
  function rn(s) {
    s !== null && b(s);
  }
  function on(s) {
    s !== null && C(s);
  }
  function ln(s) {
    k.cachePendingValue();
    const w = k.getShortcutValue(s);
    Array.isArray(w) && I(w[0], w[1], "shortcutPreview");
  }
  function sn(s) {
    const w = k.getShortcutValue(s);
    Array.isArray(w) && (I(w[0], w[1], "shortcutDone"), k.clearPendingValue(), ye());
  }
  function it(s, w) {
    const M = s === void 0 ? n.value : s;
    if (s === void 0 || w === "start") {
      if (Se.value) {
        const ve = Array.isArray(M) ? te(M[0]) : te(Date.now());
        Se.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Ze.value) {
        const ve = (Array.isArray(M) ? ie(M[0]) : ie(Date.now())) - we.value[0];
        Ze.value.scrollTo({ index: ve, debounce: false });
      }
    }
    if (s === void 0 || w === "end") {
      if (Re.value) {
        const ve = Array.isArray(M) ? te(M[1]) : te(Date.now());
        Re.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
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
      const pn = Z(et), un = [pn, pn];
      k.doUpdateValue(un, n.panel), it(un, "start"), it(un, "end"), k.disableTransitionOneTick();
      return;
    }
    const ee = [M[0], M[1]];
    let dn = false;
    switch (w === "start" ? (ee[0] = Z(et), ee[0] > ee[1] && (ee[1] = ee[0], dn = true)) : (ee[1] = Z(et), ee[0] > ee[1] && (ee[0] = ee[1], dn = true)), k.doUpdateValue(ee, n.panel), e) {
      case "monthrange":
      case "quarterrange":
        k.disableTransitionOneTick(), dn ? (it(ee, "start"), it(ee, "end")) : it(ee, w);
        break;
      case "yearrange":
        k.disableTransitionOneTick(), it(ee, "start"), it(ee, "end");
    }
  }
  function An() {
    var s;
    (s = Ee.value) === null || s === void 0 || s.sync();
  }
  function In() {
    var s;
    (s = Ge.value) === null || s === void 0 || s.sync();
  }
  function $n(s) {
    var w, M;
    return s === "start" ? ((w = Ze.value) === null || w === void 0 ? void 0 : w.listElRef) || null : ((M = Be.value) === null || M === void 0 ? void 0 : M.listElRef) || null;
  }
  function Vn(s) {
    var w, M;
    return s === "start" ? ((w = Ze.value) === null || w === void 0 ? void 0 : w.itemsElRef) || null : ((M = Be.value) === null || M === void 0 ? void 0 : M.itemsElRef) || null;
  }
  const Nn = { startYearVlRef: Ze, endYearVlRef: Be, startMonthScrollbarRef: Se, endMonthScrollbarRef: Re, startYearScrollbarRef: Ee, endYearScrollbarRef: Ge };
  return Object.assign(Object.assign(Object.assign(Object.assign({ startDatesElRef: De, endDatesElRef: Ke, handleDateClick: se, handleColItemClick: Yn, handleDateMouseEnter: Fe, handleConfirmClick: ye, startCalendarPrevYear: vt, startCalendarPrevMonth: tn, startCalendarNextYear: je, startCalendarNextMonth: pt, endCalendarPrevYear: at, endCalendarPrevMonth: rt, endCalendarNextMonth: $t, endCalendarNextYear: $e, mergedIsDateDisabled: A, changeStartEndTime: I, ranges: q, calendarMonthBeforeYear: en, startCalendarMonth: kt, startCalendarYear: St, endCalendarMonth: xt, endCalendarYear: Tt, weekdays: Ct, startDateArray: nt, endDateArray: Dt, startYearArray: _t, startMonthArray: O, startQuarterArray: Ot, endYearArray: Je, endMonthArray: Q, endQuarterArray: v, isSelecting: he, handleRangeShortcutMouseenter: ln, handleRangeShortcutClick: sn }, k), V), Nn), { startDateDisplayString: Ie, endDateInput: B, timePickerSize: k.timePickerSize, startTimeValue: mt, endTimeValue: qe, datePickerSlots: U, shortcuts: Mt, startCalendarDateTime: re, endCalendarDateTime: ne, justifyColumnsScrollState: it, handleFocusDetectorFocus: k.handleFocusDetectorFocus, handleStartTimePickerChange: rn, handleEndTimePickerChange: on, handleStartDateInput: _e, handleStartDateInputBlur: nn, handleEndDateInput: de, handleEndDateInputBlur: an, handleStartYearVlScroll: An, handleEndYearVlScroll: In, virtualListContainer: $n, virtualListContent: Vn, onUpdateStartCalendarValue: m, onUpdateEndCalendarValue: x });
}
const Qo = Qe({ name: "DateRangePanel", props: Sa, setup(n) {
  return Ta(n, "daterange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: d } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, J(d["prev-year"], () => [o(jt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, J(d["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, J(d["next-month"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, J(d["next-year"], () => [o(Wt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((u) => o("div", { key: u, class: `${t}-date-panel-weekdays__day` }, u))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((u, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !u.inCurrentMonth, [`${t}-date-panel-date--current`]: u.isCurrentDate, [`${t}-date-panel-date--selected`]: u.selected, [`${t}-date-panel-date--covered`]: u.inSpan, [`${t}-date-panel-date--start`]: u.startOfSpan, [`${t}-date-panel-date--end`]: u.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(u.ts) }], onClick: () => {
    this.handleDateClick(u);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(u);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), u.dateObject.date, u.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, J(d["prev-year"], () => [o(jt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, J(d["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, J(d["next-month"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, J(d["next-year"], () => [o(Wt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((u) => o("div", { key: u, class: `${t}-date-panel-weekdays__day` }, u))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((u, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !u.inCurrentMonth, [`${t}-date-panel-date--current`]: u.isCurrentDate, [`${t}-date-panel-date--selected`]: u.selected, [`${t}-date-panel-date--covered`]: u.inSpan, [`${t}-date-panel-date--start`]: u.startOfSpan, [`${t}-date-panel-date--end`]: u.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(u.ts) }], onClick: () => {
    this.handleDateClick(u);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(u);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), u.dateObject.date, u.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((u) => {
    const f = i[u];
    return Array.isArray(f) || typeof f == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(f);
    }, onClick: () => {
      this.handleRangeShortcutClick(f);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => u }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(d.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(d.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} });
function Va(n, e, a) {
  const t = gr(), r = Go(n, a.timeZone, a.locale ?? t.locale);
  return "formatToParts" in r ? Xo(r, e) : Ko(r, e);
}
function Xo(n, e) {
  const a = n.formatToParts(e);
  for (let t = a.length - 1; t >= 0; --t) if (a[t].type === "timeZoneName") return a[t].value;
}
function Ko(n, e) {
  const a = n.format(e).replace(/\u200E/g, ""), t = / [\w-+ ]+$/.exec(a);
  return t ? t[0].substr(1) : "";
}
function Go(n, e, a) {
  return new Intl.DateTimeFormat(a ? [a.code, "en-US"] : void 0, { timeZone: e, timeZoneName: n });
}
function Zo(n, e) {
  const a = al(e);
  return "formatToParts" in a ? el(a, n) : tl(a, n);
}
const Jo = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
function el(n, e) {
  try {
    const a = n.formatToParts(e), t = [];
    for (let r = 0; r < a.length; r++) {
      const i = Jo[a[r].type];
      i !== void 0 && (t[i] = parseInt(a[r].value, 10));
    }
    return t;
  } catch (a) {
    if (a instanceof RangeError) return [NaN];
    throw a;
  }
}
function tl(n, e) {
  const a = n.format(e), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [parseInt(t[3], 10), parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[4], 10), parseInt(t[5], 10), parseInt(t[6], 10)];
}
const Un = {}, Na = new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), nl = Na === "06/25/2014, 00:00:00" || Na === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
function al(n) {
  return Un[n] || (Un[n] = nl ? new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })), Un[n];
}
function Rr(n, e, a, t, r, i, l) {
  const d = /* @__PURE__ */ new Date(0);
  return d.setUTCFullYear(n, e, a), d.setUTCHours(t, r, i, l), d;
}
const za = 36e5, rl = 6e4, Ln = { timezoneZ: /^(Z)$/, timezoneHH: /^([+-]\d{2})$/, timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/ };
function Ma(n, e, a) {
  if (!n) return 0;
  let t = Ln.timezoneZ.exec(n);
  if (t) return 0;
  let r, i;
  if (t = Ln.timezoneHH.exec(n), t) return r = parseInt(t[1], 10), Ha(r) ? -(r * za) : NaN;
  if (t = Ln.timezoneHHMM.exec(n), t) {
    r = parseInt(t[2], 10);
    const l = parseInt(t[3], 10);
    return Ha(r, l) ? (i = Math.abs(r) * za + l * rl, t[1] === "+" ? -i : i) : NaN;
  }
  if (ll(n)) {
    e = new Date(e || Date.now());
    const l = a ? e : il(e), d = sa(l, n);
    return -(a ? d : ol(e, d, n));
  }
  return NaN;
}
function il(n) {
  return Rr(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());
}
function sa(n, e) {
  const a = Zo(n, e), t = Rr(a[0], a[1] - 1, a[2], a[3] % 24, a[4], a[5], 0).getTime();
  let r = n.getTime();
  const i = r % 1e3;
  return r -= i >= 0 ? i : 1e3 + i, t - r;
}
function ol(n, e, a) {
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
function ll(n) {
  if (Ea[n]) return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: n }), Ea[n] = true, true;
  } catch {
    return false;
  }
}
const sl = 60 * 1e3, dl = { X: function(n, e, a) {
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
      return "GMT" + ul(t, ":");
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
  const a = n ? Ma(n, e, true) / sl : (e == null ? void 0 : e.getTimezoneOffset()) ?? 0;
  if (Number.isNaN(a)) throw new RangeError("Invalid time zone specified: " + n);
  return a;
}
function _n(n, e) {
  const a = n < 0 ? "-" : "";
  let t = Math.abs(n).toString();
  for (; t.length < e; ) t = "0" + t;
  return a + t;
}
function Et(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = _n(Math.floor(t / 60), 2), i = _n(Math.floor(t % 60), 2);
  return a + r + e + i;
}
function Ba(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + _n(Math.abs(n) / 60, 2) : Et(n, e);
}
function ul(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.floor(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + _n(i, 2);
}
function qa(n) {
  const e = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
  return e.setUTCFullYear(n.getFullYear()), +n - +e;
}
const cl = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Qn = 36e5, ja = 6e4, fl = 2, Ae = { dateTimePattern: /^([0-9W+-]+)(T| )(.*)/, datePattern: /^([0-9W+-]+)(.*)/, YY: /^(\d{2})$/, YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/], YYYY: /^(\d{4})/, YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/], MM: /^-(\d{2})$/, DDD: /^-?(\d{3})$/, MMDD: /^-?(\d{2})-?(\d{2})$/, Www: /^-?W(\d{2})$/, WwwD: /^-?W(\d{2})-?(\d{1})$/, HH: /^(\d{2}([.,]\d*)?)$/, HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/, HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/, timeZone: cl };
function Fr(n, e = {}) {
  if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (n === null) return /* @__PURE__ */ new Date(NaN);
  const a = e.additionalDigits == null ? fl : Number(e.additionalDigits);
  if (a !== 2 && a !== 1 && a !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]") return new Date(n.getTime());
  if (typeof n == "number" || Object.prototype.toString.call(n) === "[object Number]") return new Date(n);
  if (Object.prototype.toString.call(n) !== "[object String]") return /* @__PURE__ */ new Date(NaN);
  const t = hl(n), { year: r, restDateString: i } = ml(t.date, a), l = vl(i, r);
  if (l === null || isNaN(l.getTime())) return /* @__PURE__ */ new Date(NaN);
  if (l) {
    const d = l.getTime();
    let u = 0, f;
    if (t.time && (u = pl(t.time), u === null || isNaN(u))) return /* @__PURE__ */ new Date(NaN);
    if (t.timeZone || e.timeZone) {
      if (f = Ma(t.timeZone || e.timeZone, new Date(d + u)), isNaN(f)) return /* @__PURE__ */ new Date(NaN);
    } else f = qa(new Date(d + u)), f = qa(new Date(d + u + f));
    return new Date(d + u + f);
  } else return /* @__PURE__ */ new Date(NaN);
}
function hl(n) {
  const e = {};
  let a = Ae.dateTimePattern.exec(n), t;
  if (a ? (e.date = a[1], t = a[3]) : (a = Ae.datePattern.exec(n), a ? (e.date = a[1], t = a[2]) : (e.date = null, t = n)), t) {
    const r = Ae.timeZone.exec(t);
    r ? (e.time = t.replace(r[1], ""), e.timeZone = r[1].trim()) : e.time = t;
  }
  return e;
}
function ml(n, e) {
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
function vl(n, e) {
  if (e === null) return null;
  let a, t, r;
  if (!n || !n.length) return a = /* @__PURE__ */ new Date(0), a.setUTCFullYear(e), a;
  let i = Ae.MM.exec(n);
  if (i) return a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1, La(e, t) ? (a.setUTCFullYear(e, t), a) : /* @__PURE__ */ new Date(NaN);
  if (i = Ae.DDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0);
    const l = parseInt(i[1], 10);
    return bl(e, l) ? (a.setUTCFullYear(e, 0, l), a) : /* @__PURE__ */ new Date(NaN);
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
function pl(n) {
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
const gl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], yl = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Yr(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
function La(n, e, a) {
  if (e < 0 || e > 11) return false;
  if (a != null) {
    if (a < 1) return false;
    const t = Yr(n);
    if (t && a > yl[e] || !t && a > gl[e]) return false;
  }
  return true;
}
function bl(n, e) {
  if (e < 1) return false;
  const a = Yr(n);
  return !(a && e > 366 || !a && e > 365);
}
function Wa(n, e) {
  return !(n < 0 || n > 52 || e != null && (e < 0 || e > 6));
}
function Xn(n, e, a) {
  return !(n < 0 || n >= 25 || e != null && (e < 0 || e >= 60) || a != null && (a < 0 || a >= 60));
}
const wl = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
function Dl(n, e, a = {}) {
  e = String(e);
  const t = e.match(wl);
  if (t) {
    const r = Fr(a.originalDate || n, a);
    e = t.reduce(function(i, l) {
      if (l[0] === "'") return i;
      const d = i.indexOf(l), u = i[d - 1] === "'", f = i.replace(l, "'" + dl[l[0]](r, l, a) + "'");
      return u ? f.substring(0, d - 1) + f.substring(d + 1) : f;
    }, e);
  }
  return K(n, e, a);
}
function Cl(n, e, a) {
  n = Fr(n, a);
  const t = Ma(e, n, true), r = new Date(n.getTime() - t), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), i.setHours(r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds()), i;
}
function kl(n, e, a, t) {
  return t = { ...t, timeZone: e, originalDate: n }, Dl(Cl(n, e, { timeZone: t.timeZone }), a, t);
}
const Ar = er("n-time-picker"), yn = Qe({ name: "TimePickerPanelCol", props: { clsPrefix: { type: String, required: true }, data: { type: Array, required: true }, activeValue: { type: [Number, String], default: null }, onItemClick: Function }, render() {
  const { activeValue: n, onItemClick: e, clsPrefix: a } = this;
  return this.data.map((t) => {
    const { label: r, disabled: i, value: l } = t, d = n === l;
    return o("div", { key: r, "data-active": d ? "" : null, class: [`${a}-time-picker-col__item`, d && `${a}-time-picker-col__item--active`, i && `${a}-time-picker-col__item--disabled`], onClick: e && !i ? () => {
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
function xl(n, e, a) {
  const t = fn(cn[e], a).map(Number);
  let r, i;
  for (let l = 0; l < t.length; ++l) {
    const d = t[l];
    if (d === n) return d;
    if (d > n) {
      i = d;
      break;
    }
    r = d;
  }
  return r === void 0 ? (i || Lr("time-picker", "Please set 'hours' or 'minutes' or 'seconds' props"), i) : i === void 0 || i - n > n - r ? r : i;
}
function Sl(n) {
  return yt(n) < 12 ? "am" : "pm";
}
const Tl = { actions: { type: Array, default: () => ["now", "confirm"] }, showHour: { type: Boolean, default: true }, showMinute: { type: Boolean, default: true }, showSecond: { type: Boolean, default: true }, showPeriod: { type: Boolean, default: true }, isHourInvalid: Boolean, isMinuteInvalid: Boolean, isSecondInvalid: Boolean, isAmPmInvalid: Boolean, isValueInvalid: Boolean, hourValue: { type: Number, default: null }, minuteValue: { type: Number, default: null }, secondValue: { type: Number, default: null }, amPmValue: { type: String, default: null }, isHourDisabled: Function, isMinuteDisabled: Function, isSecondDisabled: Function, onHourClick: { type: Function, required: true }, onMinuteClick: { type: Function, required: true }, onSecondClick: { type: Function, required: true }, onAmPmClick: { type: Function, required: true }, onNowClick: Function, clearText: String, nowText: String, confirmText: String, transitionDisabled: Boolean, onClearClick: Function, onConfirmClick: Function, onFocusin: Function, onFocusout: Function, onFocusDetectorFocus: Function, onKeydown: Function, hours: [Number, Array], minutes: [Number, Array], seconds: [Number, Array], use12Hours: Boolean }, Ml = Qe({ name: "TimePickerPanel", props: Tl, setup(n) {
  const { mergedThemeRef: e, mergedClsPrefixRef: a } = Pn(Ar), t = y(() => {
    const { isHourDisabled: d, hours: u, use12Hours: f, amPmValue: h } = n;
    if (f) {
      const p = h ?? Sl(Date.now());
      return fn(cn.hours, u, p).map((g) => {
        const T = Number(g), F = p === "pm" && T !== 12 ? T + 12 : T;
        return { label: g, value: F, disabled: d ? d(F) : false };
      });
    } else return fn(cn.hours, u).map((p) => ({ label: p, value: Number(p), disabled: d ? d(Number(p)) : false }));
  }), r = y(() => {
    const { isMinuteDisabled: d, minutes: u } = n;
    return fn(cn.minutes, u).map((f) => ({ label: f, value: Number(f), disabled: d ? d(Number(f), n.hourValue) : false }));
  }), i = y(() => {
    const { isSecondDisabled: d, seconds: u } = n;
    return fn(cn.seconds, u).map((f) => ({ label: f, value: Number(f), disabled: d ? d(Number(f), n.minuteValue, n.hourValue) : false }));
  }), l = y(() => {
    const { isHourDisabled: d } = n;
    let u = true, f = true;
    for (let h = 0; h < 12; ++h) if (!(d == null ? void 0 : d(h))) {
      u = false;
      break;
    }
    for (let h = 12; h < 24; ++h) if (!(d == null ? void 0 : d(h))) {
      f = false;
      break;
    }
    return [{ label: "AM", value: "am", disabled: u }, { label: "PM", value: "pm", disabled: f }];
  });
  return { mergedTheme: e, mergedClsPrefix: a, hours: t, minutes: r, seconds: i, amPm: l, hourScrollRef: _(null), minuteScrollRef: _(null), secondScrollRef: _(null), amPmScrollRef: _(null) };
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i } = this;
  return o("div", { tabindex: 0, class: `${r}-time-picker-panel`, onFocusin: this.onFocusin, onFocusout: this.onFocusout, onKeydown: this.onKeydown }, o("div", { class: `${r}-time-picker-cols` }, this.showHour ? o("div", { class: [`${r}-time-picker-col`, this.isHourInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "hourScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.hours, activeValue: this.hourValue, onItemClick: this.onHourClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showMinute ? o("div", { class: [`${r}-time-picker-col`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`, this.isMinuteInvalid && `${r}-time-picker-col--invalid`] }, o(st, { ref: "minuteScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.minutes, activeValue: this.minuteValue, onItemClick: this.onMinuteClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showSecond ? o("div", { class: [`${r}-time-picker-col`, this.isSecondInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "secondScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.seconds, activeValue: this.secondValue, onItemClick: this.onSecondClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.use12Hours ? o("div", { class: [`${r}-time-picker-col`, this.isAmPmInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(st, { ref: "amPmScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(yn, { clsPrefix: r, data: this.amPm, activeValue: this.amPmValue, onItemClick: this.onAmPmClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null), !((n = this.actions) === null || n === void 0) && n.length ? o("div", { class: `${r}-time-picker-actions` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.onClearClick }, { default: () => this.clearText }) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? o(Pe, { size: "tiny", theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, onClick: this.onNowClick }, { default: () => this.nowText }) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? o(Pe, { size: "tiny", type: "primary", class: `${r}-time-picker-actions__confirm`, theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, disabled: this.isValueInvalid, onClick: this.onConfirmClick }, { default: () => this.confirmText }) : null) : null, o(At, { onFocus: this.onFocusDetectorFocus }));
} }), _l = $([L("time-picker", `
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
 `, [or(), L("time-picker-actions", `
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
 `, [j("transition-disabled", [me("item", "transition: none;", [$("&::before", "transition: none;")])]), me("padding", `
 height: calc(var(--n-item-height) * 5);
 `), $("&:first-child", "min-width: calc(var(--n-item-width) + 4px);", [me("item", [$("&::before", "left: 4px;")])]), me("item", `
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
 `, [$("&::before", `
 content: "";
 transition: background-color .3s var(--n-bezier);
 z-index: -1;
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-item-border-radius);
 `), Ht("disabled", [$("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `)]), j("active", `
 color: var(--n-item-text-color-active);
 `, [$("&::before", `
 background-color: var(--n-item-color-hover);
 `)]), j("disabled", `
 opacity: var(--n-item-opacity-disabled);
 cursor: not-allowed;
 `)]), j("invalid", [me("item", [j("active", `
 text-decoration: line-through;
 text-decoration-color: var(--n-item-text-color-active);
 `)])])])])]);
function Gn(n, e) {
  return n === void 0 ? true : Array.isArray(n) ? n.every((a) => a >= 0 && a <= e) : n >= 0 && n <= e;
}
const Ol = Object.assign(Object.assign({}, Rn.props), { to: Qt.propTo, bordered: { type: Boolean, default: void 0 }, actions: Array, defaultValue: { type: Number, default: null }, defaultFormattedValue: String, placeholder: String, placement: { type: String, default: "bottom-start" }, value: Number, format: { type: String, default: "HH:mm:ss" }, valueFormat: String, formattedValue: String, isHourDisabled: Function, size: String, isMinuteDisabled: Function, isSecondDisabled: Function, inputReadonly: Boolean, clearable: Boolean, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:formattedValue": [Function, Array], onBlur: [Function, Array], onConfirm: [Function, Array], onClear: Function, onFocus: [Function, Array], timeZone: String, showIcon: { type: Boolean, default: true }, disabled: { type: Boolean, default: void 0 }, show: { type: Boolean, default: void 0 }, hours: { type: [Number, Array], validator: (n) => Gn(n, 23) }, minutes: { type: [Number, Array], validator: (n) => Gn(n, 59) }, seconds: { type: [Number, Array], validator: (n) => Gn(n, 59) }, use12Hours: Boolean, stateful: { type: Boolean, default: true }, onChange: [Function, Array] }), da = Qe({ name: "TimePicker", props: Ol, setup(n) {
  const { mergedBorderedRef: e, mergedClsPrefixRef: a, namespaceRef: t, inlineThemeDisabled: r, mergedComponentPropsRef: i } = nr(n), { localeRef: l, dateLocaleRef: d } = On("TimePicker"), u = dr(n, { mergedSize: (c) => {
    var b, C;
    const { size: I } = n;
    if (I) return I;
    const { mergedSize: Z } = c || {};
    if (Z == null ? void 0 : Z.value) return Z.value;
    const _e = (C = (b = i == null ? void 0 : i.value) === null || b === void 0 ? void 0 : b.TimePicker) === null || C === void 0 ? void 0 : C.size;
    return _e || "medium";
  } }), { mergedSizeRef: f, mergedDisabledRef: h, mergedStatusRef: p } = u, g = Rn("TimePicker", "-time-picker", _l, Mr, n, a), T = ir(), F = _(null), G = _(null), S = y(() => ({ locale: d.value.locale }));
  function Y(c) {
    return c === null ? null : Ve(c, n.valueFormat || n.format, /* @__PURE__ */ new Date(), S.value).getTime();
  }
  const { defaultValue: N, defaultFormattedValue: q } = n, H = _(q !== void 0 ? Y(q) : N), P = y(() => {
    const { formattedValue: c } = n;
    if (c !== void 0) return Y(c);
    const { value: b } = n;
    return b !== void 0 ? b : H.value;
  }), E = y(() => {
    const { timeZone: c } = n;
    return c ? (b, C, I) => kl(b, c, C, I) : (b, C, I) => K(b, C, I);
  }), U = _("");
  dt(() => n.timeZone, () => {
    const c = P.value;
    U.value = c === null ? "" : E.value(c, n.format, S.value);
  }, { immediate: true });
  const be = _(false), Xe = Ue(n, "show"), ae = Jn(Xe, be), we = _(P.value), V = _(false), k = y(() => l.value.clear), De = y(() => l.value.now), Ke = y(() => n.placeholder !== void 0 ? n.placeholder : l.value.placeholder), Ee = y(() => l.value.negativeText), Ge = y(() => l.value.positiveText), Ze = y(() => /H|h|K|k/.test(n.format)), Be = y(() => n.format.includes("m")), Se = y(() => n.format.includes("s")), Re = y(() => {
    const { value: c } = P;
    return c === null ? null : Number(E.value(c, "HH", S.value));
  }), ge = y(() => {
    const { value: c } = P;
    return c === null ? null : Number(E.value(c, "mm", S.value));
  }), ut = y(() => {
    const { value: c } = P;
    return c === null ? null : Number(E.value(c, "ss", S.value));
  }), re = y(() => {
    const { isHourDisabled: c } = n;
    return Re.value === null ? false : bn(Re.value, "hours", n.hours) ? c ? c(Re.value) : false : true;
  }), ne = y(() => {
    const { value: c } = ge, { value: b } = Re;
    if (c === null || b === null) return false;
    if (!bn(c, "minutes", n.minutes)) return true;
    const { isMinuteDisabled: C } = n;
    return C ? C(c, b) : false;
  }), Te = y(() => {
    const { value: c } = ge, { value: b } = Re, { value: C } = ut;
    if (C === null || c === null || b === null) return false;
    if (!bn(C, "seconds", n.seconds)) return true;
    const { isSecondDisabled: I } = n;
    return I ? I(C, c, b) : false;
  }), he = y(() => re.value || ne.value || Te.value), ze = y(() => n.format.length + 4), Me = y(() => {
    const { value: c } = P;
    return c === null ? null : yt(c) < 12 ? "am" : "pm";
  });
  function wt(c, b) {
    const { onUpdateFormattedValue: C, "onUpdate:formattedValue": I } = n;
    C && pe(C, c, b), I && pe(I, c, b);
  }
  function Ie(c) {
    return c === null ? null : E.value(c, n.valueFormat || n.format);
  }
  function B(c) {
    const { onUpdateValue: b, "onUpdate:value": C, onChange: I } = n, { nTriggerFormChange: Z, nTriggerFormInput: _e } = u, de = Ie(c);
    b && pe(b, c, de), C && pe(C, c, de), I && pe(I, c, de), wt(de, c), H.value = c, Z(), _e();
  }
  function ht(c) {
    const { onFocus: b } = n, { nTriggerFormFocus: C } = u;
    b && pe(b, c), C();
  }
  function nt(c) {
    const { onBlur: b } = n, { nTriggerFormBlur: C } = u;
    b && pe(b, c), C();
  }
  function Dt() {
    const { onConfirm: c } = n;
    c && pe(c, P.value, Ie(P.value));
  }
  function Ct(c) {
    var b;
    c.stopPropagation(), B(null), v(null), (b = n.onClear) === null || b === void 0 || b.call(n);
  }
  function kt() {
    $e({ returnFocus: true });
  }
  function xt() {
    B(null), v(null), $e({ returnFocus: true });
  }
  function St(c) {
    c.key === "Escape" && ae.value && kn(c);
  }
  function Tt(c) {
    var b;
    switch (c.key) {
      case "Escape":
        ae.value && (kn(c), $e({ returnFocus: true }));
        break;
      case "Tab":
        T.shift && c.target === ((b = G.value) === null || b === void 0 ? void 0 : b.$el) && (c.preventDefault(), $e({ returnFocus: true }));
        break;
    }
  }
  function mt() {
    V.value = true, wn(() => {
      V.value = false;
    });
  }
  function qe(c) {
    h.value || lr(c, "clear") || ae.value || pt();
  }
  function Mt(c) {
    typeof c != "string" && (P.value === null ? B(D(Pt(Oo(/* @__PURE__ */ new Date()), c))) : B(D(Pt(P.value, c))));
  }
  function _t(c) {
    typeof c != "string" && (P.value === null ? B(D(Bn(Po(/* @__PURE__ */ new Date()), c))) : B(D(Bn(P.value, c))));
  }
  function Je(c) {
    typeof c != "string" && (P.value === null ? B(D(qn(Da(/* @__PURE__ */ new Date()), c))) : B(D(qn(P.value, c))));
  }
  function Ot(c) {
    const { value: b } = P;
    if (b === null) {
      const C = /* @__PURE__ */ new Date(), I = yt(C);
      c === "pm" && I < 12 ? B(D(Pt(C, I + 12))) : c === "am" && I >= 12 && B(D(Pt(C, I - 12))), B(D(C));
    } else {
      const C = yt(b);
      c === "pm" && C < 12 ? B(D(Pt(b, C + 12))) : c === "am" && C >= 12 && B(D(Pt(b, C - 12)));
    }
  }
  function v(c) {
    c === void 0 && (c = P.value), c === null ? U.value = "" : U.value = E.value(c, n.format, S.value);
  }
  function O(c) {
    vt(c) || ht(c);
  }
  function Q(c) {
    var b;
    if (!vt(c)) if (ae.value) {
      const C = (b = G.value) === null || b === void 0 ? void 0 : b.$el;
      (C == null ? void 0 : C.contains(c.relatedTarget)) || (v(), nt(c), $e({ returnFocus: false }));
    } else v(), nt(c);
  }
  function en() {
    h.value || ae.value || pt();
  }
  function It() {
    h.value || (v(), $e({ returnFocus: false }));
  }
  function Ce() {
    if (!G.value) return;
    const { hourScrollRef: c, minuteScrollRef: b, secondScrollRef: C, amPmScrollRef: I } = G.value;
    [c, b, C, I].forEach((Z) => {
      var _e;
      if (!Z) return;
      const de = (_e = Z.contentRef) === null || _e === void 0 ? void 0 : _e.querySelector("[data-active]");
      de && Z.scrollTo({ top: de.offsetTop });
    });
  }
  function je(c) {
    be.value = c;
    const { onUpdateShow: b, "onUpdate:show": C } = n;
    b && pe(b, c), C && pe(C, c);
  }
  function vt(c) {
    var b, C, I;
    return !!(!((C = (b = F.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || C === void 0) && C.contains(c.relatedTarget) || !((I = G.value) === null || I === void 0) && I.$el.contains(c.relatedTarget));
  }
  function pt() {
    we.value = P.value, je(true), wn(Ce);
  }
  function tn(c) {
    var b, C;
    ae.value && !(!((C = (b = F.value) === null || b === void 0 ? void 0 : b.wrapperElRef) === null || C === void 0) && C.contains(ha(c))) && $e({ returnFocus: false });
  }
  function $e({ returnFocus: c }) {
    var b;
    ae.value && (je(false), c && ((b = F.value) === null || b === void 0 || b.focus()));
  }
  function at(c) {
    if (c === "") {
      B(null);
      return;
    }
    const b = Ve(c, n.format, /* @__PURE__ */ new Date(), S.value);
    if (U.value = c, We(b)) {
      const { value: C } = P;
      if (C !== null) {
        const I = xe(C, { hours: yt(b), minutes: Sn(b), seconds: Tn(b), milliseconds: Ri(b) });
        B(D(I));
      } else B(D(b));
    }
  }
  function $t() {
    B(we.value), je(false);
  }
  function rt() {
    const c = /* @__PURE__ */ new Date(), b = { hours: yt, minutes: Sn, seconds: Tn }, [C, I, Z] = ["hours", "minutes", "seconds"].map((de) => !n[de] || bn(b[de](c), de, n[de]) ? b[de](c) : xl(b[de](c), de, n[de])), _e = qn(Bn(Pt(P.value ? P.value : D(c), C), I), Z);
    B(D(_e));
  }
  function m() {
    v(), Dt(), $e({ returnFocus: true });
  }
  function x(c) {
    vt(c) || (v(), nt(c), $e({ returnFocus: false }));
  }
  dt(P, (c) => {
    v(c), mt(), wn(Ce);
  }), dt(ae, () => {
    he.value && B(we.value);
  }), rr(Ar, { mergedThemeRef: g, mergedClsPrefixRef: a });
  const A = { focus: () => {
    var c;
    (c = F.value) === null || c === void 0 || c.focus();
  }, blur: () => {
    var c;
    (c = F.value) === null || c === void 0 || c.blur();
  } }, z = y(() => {
    const { common: { cubicBezierEaseInOut: c }, self: { iconColor: b, iconColorDisabled: C } } = g.value;
    return { "--n-icon-color-override": b, "--n-icon-color-disabled-override": C, "--n-bezier": c };
  }), se = r ? Cn("time-picker-trigger", void 0, z, n) : void 0, Fe = y(() => {
    const { self: { panelColor: c, itemTextColor: b, itemTextColorActive: C, itemColorHover: I, panelDividerColor: Z, panelBoxShadow: _e, itemOpacityDisabled: de, borderRadius: nn, itemFontSize: an, itemWidth: Vt, itemHeight: rn, panelActionPadding: on, itemBorderRadius: ln }, common: { cubicBezierEaseInOut: sn } } = g.value;
    return { "--n-bezier": sn, "--n-border-radius": nn, "--n-item-color-hover": I, "--n-item-font-size": an, "--n-item-height": rn, "--n-item-opacity-disabled": de, "--n-item-text-color": b, "--n-item-text-color-active": C, "--n-item-width": Vt, "--n-panel-action-padding": on, "--n-panel-box-shadow": _e, "--n-panel-color": c, "--n-panel-divider-color": Z, "--n-item-border-radius": ln };
  }), ye = r ? Cn("time-picker", void 0, Fe, n) : void 0;
  return { focus: A.focus, blur: A.blur, mergedStatus: p, mergedBordered: e, mergedClsPrefix: a, namespace: t, uncontrolledValue: H, mergedValue: P, isMounted: ar(), inputInstRef: F, panelInstRef: G, adjustedTo: Qt(n), mergedShow: ae, localizedClear: k, localizedNow: De, localizedPlaceholder: Ke, localizedNegativeText: Ee, localizedPositiveText: Ge, hourInFormat: Ze, minuteInFormat: Be, secondInFormat: Se, mergedAttrSize: ze, displayTimeString: U, mergedSize: f, mergedDisabled: h, isValueInvalid: he, isHourInvalid: re, isMinuteInvalid: ne, isSecondInvalid: Te, transitionDisabled: V, hourValue: Re, minuteValue: ge, secondValue: ut, amPmValue: Me, handleInputKeydown: St, handleTimeInputFocus: O, handleTimeInputBlur: Q, handleNowClick: rt, handleConfirmClick: m, handleTimeInputUpdateValue: at, handleMenuFocusOut: x, handleCancelClick: $t, handleClickOutside: tn, handleTimeInputActivate: en, handleTimeInputDeactivate: It, handleHourClick: Mt, handleMinuteClick: _t, handleSecondClick: Je, handleAmPmClick: Ot, handleTimeInputClear: Ct, handleFocusDetectorFocus: kt, handleMenuKeydown: Tt, handleTriggerClick: qe, mergedTheme: g, triggerCssVars: r ? void 0 : z, triggerThemeClass: se == null ? void 0 : se.themeClass, triggerOnRender: se == null ? void 0 : se.onRender, cssVars: r ? void 0 : Fe, themeClass: ye == null ? void 0 : ye.themeClass, onRender: ye == null ? void 0 : ye.onRender, clearSelectedValue: xt };
}, render() {
  const { mergedClsPrefix: n, $slots: e, triggerOnRender: a } = this;
  return a == null ? void 0 : a(), o("div", { class: [`${n}-time-picker`, this.triggerThemeClass], style: this.triggerCssVars }, o(ma, null, { default: () => [o(va, null, { default: () => o(Ft, { ref: "inputInstRef", status: this.mergedStatus, value: this.displayTimeString, bordered: this.mergedBordered, passivelyActivated: true, attrSize: this.mergedAttrSize, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, stateful: this.stateful, size: this.mergedSize, placeholder: this.localizedPlaceholder, clearable: this.clearable, disabled: this.mergedDisabled, textDecoration: this.isValueInvalid ? "line-through" : void 0, onFocus: this.handleTimeInputFocus, onBlur: this.handleTimeInputBlur, onActivate: this.handleTimeInputActivate, onDeactivate: this.handleTimeInputDeactivate, onUpdateValue: this.handleTimeInputUpdateValue, onClear: this.handleTimeInputClear, internalDeactivateOnEnter: true, internalForceFocus: this.mergedShow, readonly: this.inputReadonly || this.mergedDisabled, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown }, this.showIcon ? { [this.clearable ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: n, class: `${n}-time-picker-icon` }, { default: () => e.icon ? e.icon() : o(li, null) }) } : null) }), o(pa, { teleportDisabled: this.adjustedTo === Qt.tdkey, show: this.mergedShow, to: this.adjustedTo, containerClass: this.namespace, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => {
    var t;
    return this.mergedShow ? ((t = this.onRender) === null || t === void 0 || t.call(this), fa(o(Ml, { ref: "panelInstRef", actions: this.actions, class: this.themeClass, style: this.cssVars, seconds: this.seconds, minutes: this.minutes, hours: this.hours, transitionDisabled: this.transitionDisabled, hourValue: this.hourValue, showHour: this.hourInFormat, isHourInvalid: this.isHourInvalid, isHourDisabled: this.isHourDisabled, minuteValue: this.minuteValue, showMinute: this.minuteInFormat, isMinuteInvalid: this.isMinuteInvalid, isMinuteDisabled: this.isMinuteDisabled, secondValue: this.secondValue, amPmValue: this.amPmValue, showSecond: this.secondInFormat, isSecondInvalid: this.isSecondInvalid, isSecondDisabled: this.isSecondDisabled, isValueInvalid: this.isValueInvalid, clearText: this.localizedClear, nowText: this.localizedNow, confirmText: this.localizedPositiveText, use12Hours: this.use12Hours, onFocusout: this.handleMenuFocusOut, onKeydown: this.handleMenuKeydown, onHourClick: this.handleHourClick, onMinuteClick: this.handleMinuteClick, onSecondClick: this.handleSecondClick, onAmPmClick: this.handleAmPmClick, onNowClick: this.handleNowClick, onConfirmClick: this.handleConfirmClick, onClearClick: this.clearSelectedValue, onFocusDetectorFocus: this.handleFocusDetectorFocus }), [[ga, this.handleClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), Pl = Qe({ name: "DateTimePanel", props: ka, setup(n) {
  return xa(n, "datetime");
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i, shortcuts: l, timePickerProps: d, datePickerSlots: u, onRender: f } = this;
  return f == null ? void 0 : f(), o("div", { ref: "selfRef", tabindex: 0, class: [`${r}-date-panel`, `${r}-date-panel--datetime`, !this.panel && `${r}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${r}-date-panel-header` }, o(Ft, { value: this.dateInputValue, theme: i.peers.Input, themeOverrides: i.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${r}-date-panel-date-input`, textDecoration: this.isDateInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleDateInputBlur, onUpdateValue: this.handleDateInput }), o(da, Object.assign({ size: this.timePickerSize, placeholder: this.locale.selectTime, format: this.timePickerFormat }, Array.isArray(d) ? void 0 : d, { showIcon: false, to: false, theme: i.peers.TimePicker, themeOverrides: i.peerOverrides.TimePicker, value: Array.isArray(this.value) ? null : this.value, isHourDisabled: this.isHourDisabled, isMinuteDisabled: this.isMinuteDisabled, isSecondDisabled: this.isSecondDisabled, onUpdateValue: this.handleTimePickerChange, stateful: false }))), o("div", { class: `${r}-date-panel-calendar` }, o("div", { class: `${r}-date-panel-month` }, o("div", { class: `${r}-date-panel-month__fast-prev`, onClick: this.prevYear }, J(u["prev-year"], () => [o(jt, null)])), o("div", { class: `${r}-date-panel-month__prev`, onClick: this.prevMonth }, J(u["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: r, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${r}-date-panel-month__next`, onClick: this.nextMonth }, J(u["next-month"], () => [o(Lt, null)])), o("div", { class: `${r}-date-panel-month__fast-next`, onClick: this.nextYear }, J(u["next-year"], () => [o(Wt, null)]))), o("div", { class: `${r}-date-panel-weekdays` }, this.weekdays.map((h) => o("div", { key: h, class: `${r}-date-panel-weekdays__day` }, h))), o("div", { class: `${r}-date-panel-dates` }, this.dateArray.map((h, p) => o("div", { "data-n-date": true, key: p, class: [`${r}-date-panel-date`, { [`${r}-date-panel-date--current`]: h.isCurrentDate, [`${r}-date-panel-date--selected`]: h.selected, [`${r}-date-panel-date--excluded`]: !h.inCurrentMonth, [`${r}-date-panel-date--disabled`]: this.mergedIsDateDisabled(h.ts, { type: "date", year: h.dateObject.year, month: h.dateObject.month, date: h.dateObject.date }) }], onClick: () => {
    this.handleDateClick(h);
  } }, o("div", { class: `${r}-date-panel-date__trigger` }), h.dateObject.date, h.isCurrentDate ? o("div", { class: `${r}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${r}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || l ? o("div", { class: `${r}-date-panel-actions` }, o("div", { class: `${r}-date-panel-actions__prefix` }, l && Object.keys(l).map((h) => {
    const p = l[h];
    return Array.isArray(p) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(p);
    }, onClick: () => {
      this.handleSingleShortcutClick(p);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => h });
  })), o("div", { class: `${r}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.datePickerSlots.clear, { onClear: this.clearSelectedDateTime, text: this.locale.clear }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.clearSelectedDateTime }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? Ne(u.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? Ne(u.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Rl = Qe({ name: "DateTimeRangePanel", props: Sa, setup(n) {
  return Ta(n, "datetimerange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, timePickerProps: l, onRender: d, datePickerSlots: u } = this;
  return d == null ? void 0 : d(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--datetimerange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${t}-date-panel-header` }, o(Ft, { value: this.startDateDisplayString, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, size: this.timePickerSize, stateful: false, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isStartValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleStartDateInputBlur, onUpdateValue: this.handleStartDateInput }), o(da, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[0] : l, { value: this.startTimeValue, to: false, showIcon: false, disabled: this.isSelecting, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, stateful: false, isHourDisabled: this.isStartHourDisabled, isMinuteDisabled: this.isStartMinuteDisabled, isSecondDisabled: this.isStartSecondDisabled, onUpdateValue: this.handleStartTimePickerChange })), o(Ft, { value: this.endDateInput, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isEndValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleEndDateInputBlur, onUpdateValue: this.handleEndDateInput }), o(da, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[1] : l, { disabled: this.isSelecting, showIcon: false, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, to: false, stateful: false, value: this.endTimeValue, isHourDisabled: this.isEndHourDisabled, isMinuteDisabled: this.isEndMinuteDisabled, isSecondDisabled: this.isEndSecondDisabled, onUpdateValue: this.handleEndTimePickerChange }))), o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, J(u["prev-year"], () => [o(jt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, J(u["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, J(u["next-month"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, J(u["next-year"], () => [o(Wt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((f, h) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: h, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, J(u["prev-year"], () => [o(jt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, J(u["prev-month"], () => [o(Ut, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, monthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, J(u["next-month"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, J(u["next-year"], () => [o(Wt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((f, h) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: h, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const h = i[f];
    return Array.isArray(h) || typeof h == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(h);
    }, onClick: () => {
      this.handleRangeShortcutClick(h);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(u.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(u.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Fl = Qe({ name: "MonthRangePanel", props: Object.assign(Object.assign({}, Sa), { type: { type: String, required: true } }), setup(n) {
  const e = Ta(n, n.type), { dateLocaleRef: a } = On("DatePicker"), t = (r, i, l, d) => {
    const { handleColItemClick: u } = e;
    return o("div", { "data-n-date": true, key: i, class: [`${l}-date-panel-month-calendar__picker-col-item`, r.isCurrent && `${l}-date-panel-month-calendar__picker-col-item--current`, r.selected && `${l}-date-panel-month-calendar__picker-col-item--selected`, false], onClick: () => {
      u(r, d);
    } }, r.type === "month" ? xr(r.dateObject.month, r.monthFormat, a.value.locale) : r.type === "quarter" ? Tr(r.dateObject.quarter, r.quarterFormat, a.value.locale) : Sr(r.dateObject.year, r.yearFormat, a.value.locale));
  };
  return tr(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: t });
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, type: l, renderItem: d, onRender: u } = this;
  return u == null ? void 0 : u(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(st, { ref: "startYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("start"), content: () => this.virtualListContent("start"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Zn, { ref: "startYearVlRef", items: this.startYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleStartYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: h }) => d(f, h, t, "start") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(st, { ref: "startMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.startMonthArray : this.startQuarterArray).map((f, h) => d(f, h, t, "start")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(st, { ref: "endYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("end"), content: () => this.virtualListContent("end"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Zn, { ref: "endYearVlRef", items: this.endYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleEndYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: h }) => d(f, h, t, "end") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(st, { ref: "endMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.endMonthArray : this.endQuarterArray).map((f, h) => d(f, h, t, "end")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), sr(this.datePickerSlots.footer, (f) => f ? o("div", { class: `${t}-date-panel-footer` }, f) : null), !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const h = i[f];
    return Array.isArray(h) || typeof h == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(h);
    }, onClick: () => {
      this.handleRangeShortcutClick(h);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? Ne(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? Ne(this.datePickerSlots.confirm, { disabled: this.isRangeInvalid, onConfirm: this.handleConfirmClick, text: this.locale.confirm }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Yl = Object.assign(Object.assign({}, Rn.props), { to: Qt.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, fastYearSelect: Boolean, fastMonthSelect: Boolean, updateValueOnClose: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, default: " " }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, defaultValue: [Number, Array], defaultFormattedValue: [String, Array], defaultTime: [Number, String, Array, Function], disabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom-start" }, value: [Number, Array], formattedValue: [String, Array], size: String, type: { type: String, default: "date" }, valueFormat: String, separator: String, placeholder: String, startPlaceholder: String, endPlaceholder: String, format: String, dateFormat: String, timePickerFormat: String, actions: Array, shortcuts: Object, isDateDisabled: Function, isTimeDisabled: Function, show: { type: Boolean, default: void 0 }, panel: Boolean, ranges: Object, firstDayOfWeek: Number, inputReadonly: Boolean, closeOnSelect: Boolean, status: String, timePickerProps: [Object, Array], onClear: Function, onConfirm: Function, defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, monthFormat: { type: String, default: "M" }, yearFormat: { type: String, default: "y" }, quarterFormat: { type: String, default: "'Q'Q" }, yearRange: { type: Array, default: () => [1901, 2100] }, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], "onUpdate:formattedValue": [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function, onChange: [Function, Array] }), Al = $([L("date-picker", `
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
 `, [or(), j("shadow", `
 box-shadow: var(--n-panel-box-shadow);
 `), L("date-panel-calendar", { padding: "var(--n-calendar-left-padding)", display: "grid", gridTemplateColumns: "1fr", gridArea: "left-calendar" }, [j("end", { padding: "var(--n-calendar-right-padding)", gridArea: "right-calendar" })]), L("date-panel-month-calendar", { display: "flex", gridArea: "left-calendar" }, [me("picker-col", `
 min-width: var(--n-scroll-item-width);
 height: calc(var(--n-scroll-item-height) * 6);
 user-select: none;
 -webkit-user-select: none;
 `, [$("&:first-child", `
 min-width: calc(var(--n-scroll-item-width) + 4px);
 `, [me("picker-col-item", [$("&::before", "left: 4px;")])]), me("padding", `
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
 `, [$("&::before", `
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
 `), Ht("disabled", [$("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `), j("selected", `
 color: var(--n-item-color-active);
 `, [$("&::before", "background-color: var(--n-item-color-hover);")])]), j("disabled", `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `, [j("selected", [$("&::before", `
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
 `, [$(">", [$("*:not(:last-child)", { marginRight: "10px" }), $("*", { flex: 1, width: 0 }), L("time-picker", { zIndex: 1 })])]), L("date-panel-month", `
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
 `), $("&:hover", `
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
 `)]), $("&::after", `
 content: "";
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 transition: background-color .3s var(--n-bezier);
 `), j("covered, start, end", [Ht("excluded", [$("&::before", `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `), $("&:nth-child(7n + 1)::before", { borderTopLeftRadius: "var(--n-item-border-radius)", borderBottomLeftRadius: "var(--n-item-border-radius)" }), $("&:nth-child(7n + 7)::before", { borderTopRightRadius: "var(--n-item-border-radius)", borderBottomRightRadius: "var(--n-item-border-radius)" })])]), j("selected", { color: "var(--n-item-text-color-active)" }, [$("&::after", { backgroundColor: "var(--n-item-color-active)" }), j("start", [$("&::before", { left: "50%" })]), j("end", [$("&::before", { right: "50%" })]), me("sup", { backgroundColor: "var(--n-panel-color)" })]), j("excluded", { color: "var(--n-item-text-color-disabled)" }, [j("selected", [$("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), j("disabled", { cursor: "not-allowed", color: "var(--n-item-text-color-disabled)" }, [j("covered", [$("&::before", { backgroundColor: "var(--n-item-color-disabled)" })]), j("selected", [$("&::before", { backgroundColor: "var(--n-item-color-disabled)" }), $("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), j("week-hovered", [$("&::before", `
 background-color: var(--n-item-color-included);
 `), $("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), $("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)]), j("week-selected", `
 color: var(--n-item-text-color-active)
 `, [$("&::before", `
 background-color: var(--n-item-color-active);
 `), $("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), $("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)])])]), Ht("week", [L("date-panel-dates", [L("date-panel-date", [Ht("disabled", [Ht("selected", [$("&:hover", `
 background-color: var(--n-item-color-hover);
 `)])])])])]), j("week", [L("date-panel-dates", [L("date-panel-date", [$("&::before", `
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
 `, [$("&:not(:last-child)", `
 margin-right: 8px;
 `)])])]), $("[data-n-date].transition-disabled", { transition: "none !important" }, [$("&::before, &::after", { transition: "none !important" })])]);
function Il(n, e) {
  const a = y(() => {
    const { isTimeDisabled: h } = n, { value: p } = e;
    if (!(p === null || Array.isArray(p))) return h == null ? void 0 : h(p);
  }), t = y(() => {
    var h;
    return (h = a.value) === null || h === void 0 ? void 0 : h.isHourDisabled;
  }), r = y(() => {
    var h;
    return (h = a.value) === null || h === void 0 ? void 0 : h.isMinuteDisabled;
  }), i = y(() => {
    var h;
    return (h = a.value) === null || h === void 0 ? void 0 : h.isSecondDisabled;
  }), l = y(() => {
    const { type: h, isDateDisabled: p } = n, { value: g } = e;
    return g === null || Array.isArray(g) || !["date", "datetime"].includes(h) || !p ? false : p(g, { type: "input" });
  }), d = y(() => {
    const { type: h } = n, { value: p } = e;
    if (p === null || h === "datetime" || Array.isArray(p)) return false;
    const g = new Date(p), T = g.getHours(), F = g.getMinutes(), G = g.getMinutes();
    return (t.value ? t.value(T) : false) || (r.value ? r.value(F, T) : false) || (i.value ? i.value(G, F, T) : false);
  }), u = y(() => l.value || d.value);
  return { isValueInvalidRef: y(() => {
    const { type: h } = n;
    return h === "date" ? l.value : h === "datetime" ? u.value : false;
  }), isDateInvalidRef: l, isTimeInvalidRef: d, isDateTimeInvalidRef: u, isHourDisabledRef: t, isMinuteDisabledRef: r, isSecondDisabledRef: i };
}
function $l(n, e) {
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
    const { type: p, isDateDisabled: g } = n, { value: T } = e;
    return T === null || !Array.isArray(T) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(T[0], "start", T);
  }), i = y(() => {
    const { type: p, isDateDisabled: g } = n, { value: T } = e;
    return T === null || !Array.isArray(T) || !["daterange", "datetimerange"].includes(p) || !g ? false : g(T[1], "end", T);
  }), l = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const T = yt(g[0]), F = Sn(g[0]), G = Tn(g[0]), { isStartHourDisabledRef: S, isStartMinuteDisabledRef: Y, isStartSecondDisabledRef: N } = t;
    return (S.value ? S.value(T) : false) || (Y.value ? Y.value(F, T) : false) || (N.value ? N.value(G, F, T) : false);
  }), d = y(() => {
    const { type: p } = n, { value: g } = e;
    if (g === null || !Array.isArray(g) || p !== "datetimerange") return false;
    const T = yt(g[1]), F = Sn(g[1]), G = Tn(g[1]), { isEndHourDisabledRef: S, isEndMinuteDisabledRef: Y, isEndSecondDisabledRef: N } = t;
    return (S.value ? S.value(T) : false) || (Y.value ? Y.value(F, T) : false) || (N.value ? N.value(G, F, T) : false);
  }), u = y(() => r.value || l.value), f = y(() => i.value || d.value), h = y(() => u.value || f.value);
  return Object.assign(Object.assign({}, t), { isStartDateInvalidRef: r, isEndDateInvalidRef: i, isStartTimeInvalidRef: l, isEndTimeInvalidRef: d, isStartValueInvalidRef: u, isEndValueInvalidRef: f, isRangeInvalidRef: h });
}
const Vl = Qe({ name: "DatePicker", props: Yl, slots: Object, setup(n, { slots: e }) {
  var a;
  const { localeRef: t, dateLocaleRef: r } = On("DatePicker"), { mergedComponentPropsRef: i, mergedClsPrefixRef: l, mergedBorderedRef: d, namespaceRef: u, inlineThemeDisabled: f } = nr(n), h = dr(n, { mergedSize: (m) => {
    var x, A;
    const { size: z } = n;
    if (z) return z;
    const { mergedSize: se } = m || {};
    if (se == null ? void 0 : se.value) return se.value;
    const Fe = (A = (x = i == null ? void 0 : i.value) === null || x === void 0 ? void 0 : x.DatePicker) === null || A === void 0 ? void 0 : A.size;
    return Fe || "medium";
  } }), { mergedSizeRef: p, mergedDisabledRef: g, mergedStatusRef: T } = h, F = _(null), G = _(null), S = _(null), Y = _(false), N = Ue(n, "show"), q = Jn(N, Y), H = y(() => ({ locale: r.value.locale, useAdditionalWeekYearTokens: true })), P = y(() => {
    const { format: m } = n;
    if (m) return m;
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
    var m;
    return (m = n.valueFormat) !== null && m !== void 0 ? m : P.value;
  });
  function U(m) {
    if (m === null) return null;
    const { value: x } = E, { value: A } = H;
    return Array.isArray(m) ? [Ve(m[0], x, /* @__PURE__ */ new Date(), A).getTime(), Ve(m[1], x, /* @__PURE__ */ new Date(), A).getTime()] : Ve(m, x, /* @__PURE__ */ new Date(), A).getTime();
  }
  const { defaultFormattedValue: be, defaultValue: Xe } = n, ae = _((a = be !== void 0 ? U(be) : Xe) !== null && a !== void 0 ? a : null), we = y(() => {
    const { formattedValue: m } = n;
    return m !== void 0 ? U(m) : n.value;
  }), V = Jn(we, ae), k = _(null);
  Wr(() => {
    k.value = V.value;
  });
  const De = _(""), Ke = _(""), Ee = _(""), Ge = Rn("DatePicker", "-date-picker", Al, Uo, n, l), Ze = y(() => {
    var m, x;
    return ((x = (m = i == null ? void 0 : i.value) === null || m === void 0 ? void 0 : m.DatePicker) === null || x === void 0 ? void 0 : x.timePickerSize) || "small";
  }), Be = y(() => ["daterange", "datetimerange", "monthrange", "quarterrange", "yearrange"].includes(n.type)), Se = y(() => {
    const { placeholder: m } = n;
    if (m === void 0) {
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
    } else return m;
  }), Re = y(() => n.startPlaceholder === void 0 ? n.type === "daterange" ? t.value.startDatePlaceholder : n.type === "datetimerange" ? t.value.startDatetimePlaceholder : n.type === "monthrange" ? t.value.startMonthPlaceholder : "" : n.startPlaceholder), ge = y(() => n.endPlaceholder === void 0 ? n.type === "daterange" ? t.value.endDatePlaceholder : n.type === "datetimerange" ? t.value.endDatetimePlaceholder : n.type === "monthrange" ? t.value.endMonthPlaceholder : "" : n.endPlaceholder), ut = y(() => {
    const { actions: m, type: x, clearable: A } = n;
    if (m === null) return [];
    if (m !== void 0) return m;
    const z = A ? ["clear"] : [];
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
        Qr("date-picker", "The type is wrong, n-date-picker's type only supports `date`, `datetime`, `daterange` and `datetimerange`.");
        break;
      }
    }
  });
  function re(m) {
    if (m === null) return null;
    if (Array.isArray(m)) {
      const { value: x } = E, { value: A } = H;
      return [K(m[0], x, A), K(m[1], x, H.value)];
    } else return K(m, E.value, H.value);
  }
  function ne(m) {
    k.value = m;
  }
  function Te(m, x) {
    const { "onUpdate:formattedValue": A, onUpdateFormattedValue: z } = n;
    A && pe(A, m, x), z && pe(z, m, x);
  }
  function he(m, x) {
    const { "onUpdate:value": A, onUpdateValue: z, onChange: se } = n, { nTriggerFormChange: Fe, nTriggerFormInput: ye } = h, c = re(m);
    x.doConfirm && Me(m, c), z && pe(z, m, c), A && pe(A, m, c), se && pe(se, m, c), ae.value = m, Te(c, m), Fe(), ye();
  }
  function ze() {
    const { onClear: m } = n;
    m == null ? void 0 : m();
  }
  function Me(m, x) {
    const { onConfirm: A } = n;
    A && A(m, x);
  }
  function wt(m) {
    const { onFocus: x } = n, { nTriggerFormFocus: A } = h;
    x && pe(x, m), A();
  }
  function Ie(m) {
    const { onBlur: x } = n, { nTriggerFormBlur: A } = h;
    x && pe(x, m), A();
  }
  function B(m) {
    const { "onUpdate:show": x, onUpdateShow: A } = n;
    x && pe(x, m), A && pe(A, m), Y.value = m;
  }
  function ht(m) {
    m.key === "Escape" && q.value && (kn(m), je({ returnFocus: true }));
  }
  function nt(m) {
    m.key === "Escape" && q.value && kn(m);
  }
  function Dt() {
    var m;
    B(false), (m = S.value) === null || m === void 0 || m.deactivate(), ze();
  }
  function Ct() {
    var m;
    (m = S.value) === null || m === void 0 || m.deactivate(), ze();
  }
  function kt() {
    je({ returnFocus: true });
  }
  function xt(m) {
    var x;
    q.value && !(!((x = G.value) === null || x === void 0) && x.contains(ha(m))) && je({ returnFocus: false });
  }
  function St(m) {
    je({ returnFocus: true, disableUpdateOnClose: m });
  }
  function Tt(m, x) {
    x ? he(m, { doConfirm: false }) : ne(m);
  }
  function mt() {
    const m = k.value;
    he(Array.isArray(m) ? [m[0], m[1]] : m, { doConfirm: true });
  }
  function qe() {
    const { value: m } = k;
    Be.value ? (Array.isArray(m) || m === null) && _t(m) : Array.isArray(m) || Mt(m);
  }
  function Mt(m) {
    m === null ? De.value = "" : De.value = K(m, P.value, H.value);
  }
  function _t(m) {
    if (m === null) Ke.value = "", Ee.value = "";
    else {
      const x = H.value;
      Ke.value = K(m[0], P.value, x), Ee.value = K(m[1], P.value, x);
    }
  }
  function Je() {
    q.value || Ce();
  }
  function Ot(m) {
    var x;
    !((x = F.value) === null || x === void 0) && x.$el.contains(m.relatedTarget) || (Ie(m), qe(), je({ returnFocus: false }));
  }
  function v() {
    g.value || (qe(), je({ returnFocus: false }));
  }
  function O(m) {
    if (m === "") {
      he(null, { doConfirm: false }), k.value = null, De.value = "";
      return;
    }
    const x = Ve(m, P.value, /* @__PURE__ */ new Date(), H.value);
    We(x) ? (he(D(x), { doConfirm: false }), qe()) : De.value = m;
  }
  function Q(m, { source: x }) {
    if (m[0] === "" && m[1] === "") {
      he(null, { doConfirm: false }), k.value = null, Ke.value = "", Ee.value = "";
      return;
    }
    const [A, z] = m, se = Ve(A, P.value, /* @__PURE__ */ new Date(), H.value), Fe = Ve(z, P.value, /* @__PURE__ */ new Date(), H.value);
    if (We(se) && We(Fe)) {
      let ye = D(se), c = D(Fe);
      Fe < se && (x === 0 ? c = ye : ye = c), he([ye, c], { doConfirm: false }), qe();
    } else [Ke.value, Ee.value] = m;
  }
  function en(m) {
    g.value || lr(m, "clear") || q.value || Ce();
  }
  function It(m) {
    g.value || wt(m);
  }
  function Ce() {
    g.value || q.value || B(true);
  }
  function je({ returnFocus: m, disableUpdateOnClose: x }) {
    var A;
    q.value && (B(false), n.type !== "date" && n.updateValueOnClose && !x && mt(), m && ((A = S.value) === null || A === void 0 || A.focus()));
  }
  dt(k, () => {
    qe();
  }), qe(), dt(q, (m) => {
    m || (k.value = V.value);
  });
  const vt = Il(n, k), pt = $l(n, k);
  rr(Fn, Object.assign(Object.assign(Object.assign({ mergedClsPrefixRef: l, mergedThemeRef: Ge, timePickerSizeRef: Ze, localeRef: t, dateLocaleRef: r, firstDayOfWeekRef: Ue(n, "firstDayOfWeek"), isDateDisabledRef: Ue(n, "isDateDisabled"), rangesRef: Ue(n, "ranges"), timePickerPropsRef: Ue(n, "timePickerProps"), closeOnSelectRef: Ue(n, "closeOnSelect"), updateValueOnCloseRef: Ue(n, "updateValueOnClose"), monthFormatRef: Ue(n, "monthFormat"), yearFormatRef: Ue(n, "yearFormat"), quarterFormatRef: Ue(n, "quarterFormat"), yearRangeRef: Ue(n, "yearRange") }, vt), pt), { datePickerSlots: e }));
  const tn = { focus: () => {
    var m;
    (m = S.value) === null || m === void 0 || m.focus();
  }, blur: () => {
    var m;
    (m = S.value) === null || m === void 0 || m.blur();
  } }, $e = y(() => {
    const { common: { cubicBezierEaseInOut: m }, self: { iconColor: x, iconColorDisabled: A } } = Ge.value;
    return { "--n-bezier": m, "--n-icon-color-override": x, "--n-icon-color-disabled-override": A };
  }), at = f ? Cn("date-picker-trigger", void 0, $e, n) : void 0, $t = y(() => {
    const { type: m } = n, { common: { cubicBezierEaseInOut: x }, self: { calendarTitleFontSize: A, calendarDaysFontSize: z, itemFontSize: se, itemTextColor: Fe, itemColorDisabled: ye, itemColorIncluded: c, itemColorHover: b, itemColorActive: C, itemBorderRadius: I, itemTextColorDisabled: Z, itemTextColorActive: _e, panelColor: de, panelTextColor: nn, arrowColor: an, calendarTitleTextColor: Vt, panelActionDividerColor: rn, panelHeaderDividerColor: on, calendarDaysDividerColor: ln, panelBoxShadow: sn, panelBorderRadius: it, calendarTitleFontWeight: Yn, panelExtraFooterPadding: An, panelActionPadding: In, itemSize: $n, itemCellWidth: Vn, itemCellHeight: Nn, scrollItemWidth: s, scrollItemHeight: w, calendarTitlePadding: M, calendarTitleHeight: ve, calendarDaysHeight: et, calendarDaysTextColor: ee, arrowSize: dn, panelHeaderPadding: pn, calendarDividerColor: un, calendarTitleGridTempateColumns: Ir, iconColor: $r, iconColorDisabled: Vr, scrollItemBorderRadius: Nr, calendarTitleColorHover: zr, [_a("calendarLeftPadding", m)]: Hr, [_a("calendarRightPadding", m)]: Er } } = Ge.value;
    return { "--n-bezier": x, "--n-panel-border-radius": it, "--n-panel-color": de, "--n-panel-box-shadow": sn, "--n-panel-text-color": nn, "--n-panel-header-padding": pn, "--n-panel-header-divider-color": on, "--n-calendar-left-padding": Hr, "--n-calendar-right-padding": Er, "--n-calendar-title-color-hover": zr, "--n-calendar-title-height": ve, "--n-calendar-title-padding": M, "--n-calendar-title-font-size": A, "--n-calendar-title-font-weight": Yn, "--n-calendar-title-text-color": Vt, "--n-calendar-title-grid-template-columns": Ir, "--n-calendar-days-height": et, "--n-calendar-days-divider-color": ln, "--n-calendar-days-font-size": z, "--n-calendar-days-text-color": ee, "--n-calendar-divider-color": un, "--n-panel-action-padding": In, "--n-panel-extra-footer-padding": An, "--n-panel-action-divider-color": rn, "--n-item-font-size": se, "--n-item-border-radius": I, "--n-item-size": $n, "--n-item-cell-width": Vn, "--n-item-cell-height": Nn, "--n-item-text-color": Fe, "--n-item-color-included": c, "--n-item-color-disabled": ye, "--n-item-color-hover": b, "--n-item-color-active": C, "--n-item-text-color-disabled": Z, "--n-item-text-color-active": _e, "--n-scroll-item-width": s, "--n-scroll-item-height": w, "--n-scroll-item-border-radius": Nr, "--n-arrow-size": dn, "--n-arrow-color": an, "--n-icon-color": $r, "--n-icon-color-disabled": Vr };
  }), rt = f ? Cn("date-picker", y(() => n.type), $t, n) : void 0;
  return Object.assign(Object.assign({}, tn), { mergedStatus: T, mergedClsPrefix: l, mergedBordered: d, namespace: u, uncontrolledValue: ae, pendingValue: k, panelInstRef: F, triggerElRef: G, inputInstRef: S, isMounted: ar(), displayTime: De, displayStartTime: Ke, displayEndTime: Ee, mergedShow: q, adjustedTo: Qt(n), isRange: Be, localizedStartPlaceholder: Re, localizedEndPlaceholder: ge, mergedSize: p, mergedDisabled: g, localizedPlacehoder: Se, isValueInvalid: vt.isValueInvalidRef, isStartValueInvalid: pt.isStartValueInvalidRef, isEndValueInvalid: pt.isEndValueInvalidRef, handleInputKeydown: nt, handleClickOutside: xt, handleKeydown: ht, handleClear: Dt, handlePanelClear: Ct, handleTriggerClick: en, handleInputActivate: Je, handleInputDeactivate: v, handleInputFocus: It, handleInputBlur: Ot, handlePanelTabOut: kt, handlePanelClose: St, handleRangeUpdateValue: Q, handleSingleUpdateValue: O, handlePanelUpdateValue: Tt, handlePanelConfirm: mt, mergedTheme: Ge, actions: ut, triggerCssVars: f ? void 0 : $e, triggerThemeClass: at == null ? void 0 : at.themeClass, triggerOnRender: at == null ? void 0 : at.onRender, cssVars: f ? void 0 : $t, themeClass: rt == null ? void 0 : rt.themeClass, onRender: rt == null ? void 0 : rt.onRender, onNextMonth: n.onNextMonth, onPrevMonth: n.onPrevMonth, onNextYear: n.onNextYear, onPrevYear: n.onPrevYear });
}, render() {
  const { clearable: n, triggerOnRender: e, mergedClsPrefix: a, $slots: t } = this, r = { onUpdateValue: this.handlePanelUpdateValue, onTabOut: this.handlePanelTabOut, onClose: this.handlePanelClose, onClear: this.handlePanelClear, onKeydown: this.handleKeydown, onConfirm: this.handlePanelConfirm, ref: "panelInstRef", value: this.pendingValue, active: this.mergedShow, actions: this.actions, shortcuts: this.shortcuts, style: this.cssVars, defaultTime: this.defaultTime, themeClass: this.themeClass, panel: this.panel, inputReadonly: this.inputReadonly || this.mergedDisabled, onRender: this.onRender, onNextMonth: this.onNextMonth, onPrevMonth: this.onPrevMonth, onNextYear: this.onNextYear, onPrevYear: this.onPrevYear, timePickerFormat: this.timePickerFormat, dateFormat: this.dateFormat, fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, calendarDayFormat: this.calendarDayFormat, calendarHeaderYearFormat: this.calendarHeaderYearFormat, calendarHeaderMonthFormat: this.calendarHeaderMonthFormat, calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear }, i = () => {
    const { type: d } = this;
    return d === "datetime" ? o(Pl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime }), t) : d === "daterange" ? o(Qo, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : d === "datetimerange" ? o(Rl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : d === "month" || d === "year" || d === "quarter" ? o(Pr, Object.assign({}, r, { type: d, key: d })) : d === "monthrange" || d === "yearrange" || d === "quarterrange" ? o(Fl, Object.assign({}, r, { type: d })) : o(Wo, Object.assign({}, r, { type: d, defaultCalendarStartTime: this.defaultCalendarStartTime }), t);
  };
  if (this.panel) return i();
  e == null ? void 0 : e();
  const l = { bordered: this.mergedBordered, size: this.mergedSize, passivelyActivated: true, disabled: this.mergedDisabled, readonly: this.inputReadonly || this.mergedDisabled, clearable: n, onClear: this.handleClear, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown, onActivate: this.handleInputActivate, onDeactivate: this.handleInputDeactivate, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur };
  return o("div", { ref: "triggerElRef", class: [`${a}-date-picker`, this.mergedDisabled && `${a}-date-picker--disabled`, this.isRange && `${a}-date-picker--range`, this.triggerThemeClass], style: this.triggerCssVars, onKeydown: this.handleKeydown }, o(ma, null, { default: () => [o(va, null, { default: () => this.isRange ? o(Ft, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: [this.displayStartTime, this.displayEndTime], placeholder: [this.localizedStartPlaceholder, this.localizedEndPlaceholder], textDecoration: [this.isStartValueInvalid ? "line-through" : "", this.isEndValueInvalid ? "line-through" : ""], pair: true, onUpdateValue: this.handleRangeUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { separator: () => this.separator === void 0 ? J(t.separator, () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(si, null) })]) : this.separator, [n ? "clear-icon-placeholder" : "suffix"]: () => J(t["date-icon"], () => [o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(Ra, null) })]) }) : o(Ft, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: this.displayTime, placeholder: this.localizedPlacehoder, textDecoration: this.isValueInvalid && !this.isRange ? "line-through" : "", onUpdateValue: this.handleSingleUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { [n ? "clear-icon-placeholder" : "suffix"]: () => o(Dn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => J(t["date-icon"], () => [o(Ra, null)]) }) }) }), o(pa, { show: this.mergedShow, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Qt.tdkey, placement: this.placement }, { default: () => o(ca, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => this.mergedShow ? fa(i(), [[ga, this.handleClickOutside, void 0, { capture: true }]]) : null }) })] }));
} });
function Nl() {
  const { request: n } = Br();
  return { summary: (e) => {
    const a = new URLSearchParams({ group_by: e.group_by });
    return e.api_key && a.set("api_key", e.api_key), e.start_time && a.set("start_time", e.start_time), e.end_time && a.set("end_time", e.end_time), n("GET", `/usage/summary?${a.toString()}`);
  } };
}
const zl = { class: "flex gap-3 mb-6 flex-wrap items-end" }, Hl = { key: 0, class: "text-slate-500 text-sm" }, El = { class: "grid grid-cols-4 gap-4 mb-6" }, Xl = Qe({ __name: "usage", setup(n) {
  const e = qr(), a = Nl(), t = _(""), r = _("hour"), i = _(null), l = _(null), d = _(false);
  function u(g) {
    return g >= 1e6 ? (g / 1e6).toFixed(1) + "M" : g >= 1e3 ? (g / 1e3).toFixed(1) + "K" : String(g);
  }
  function f(g) {
    return "$" + g.toFixed(2);
  }
  async function h() {
    d.value = true;
    try {
      const g = { group_by: r.value };
      t.value.trim() && (g.api_key = t.value.trim()), i.value && (g.start_time = new Date(i.value[0]).toISOString(), g.end_time = new Date(i.value[1] + 864e5 - 1).toISOString()), l.value = await a.summary(g);
    } catch (g) {
      e.error(g.message);
    } finally {
      d.value = false;
    }
  }
  const p = y(() => [{ title: r.value === "model" ? "Model" : "Hour", key: "group_key", render: (g) => o("span", { class: "font-mono text-xs" }, g.group_key) }, { title: "Requests", key: "total_requests", render: (g) => g.total_requests.toLocaleString() }, { title: "Errors", key: "error_requests", render: (g) => o("span", { class: g.error_requests > 0 ? "text-red-400" : "" }, String(g.error_requests)) }, { title: "Input", key: "input_tokens", render: (g) => u(g.input_tokens) }, { title: "Output", key: "output_tokens", render: (g) => u(g.output_tokens) }, { title: "Cost", key: "total_cost", render: (g) => f(g.total_cost) }]);
  return (g, T) => {
    const F = Ft, G = Jr, S = Vl, Y = Zr, N = Pe, q = ei, H = jr, P = Gr;
    return Hn(), zn("div", null, [T[5] || (T[5] = gn("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Usage", -1)), gn("div", zl, [Oe(G, { label: "API Key", class: "mb-0" }, { default: ct(() => [Oe(F, { value: He(t), "onUpdate:value": T[0] || (T[0] = (E) => En(t) ? t.value = E : null), placeholder: "Optional \u2014 leave empty for all", style: { width: "240px" }, clearable: "" }, null, 8, ["value"])]), _: 1 }), Oe(G, { label: "Date Range", class: "mb-0" }, { default: ct(() => [Oe(S, { value: He(i), "onUpdate:value": T[1] || (T[1] = (E) => En(i) ? i.value = E : null), type: "daterange", clearable: "", style: { width: "240px" } }, null, 8, ["value"])]), _: 1 }), Oe(G, { label: "Group By", class: "mb-0" }, { default: ct(() => [Oe(Y, { value: He(r), "onUpdate:value": T[2] || (T[2] = (E) => En(r) ? r.value = E : null), options: [{ label: "By Hour", value: "hour" }, { label: "By Model", value: "model" }], style: { width: "130px" } }, null, 8, ["value"])]), _: 1 }), Oe(N, { type: "primary", loading: He(d), onClick: h }, { icon: ct(() => [...T[3] || (T[3] = [gn("span", { class: "i-carbon-search" }, null, -1)])]), default: ct(() => [T[4] || (T[4] = Kr(" Query ", -1))]), _: 1 }, 8, ["loading"])]), !He(l) && !He(d) ? (Hn(), zn("p", Hl, " Select filters and click Query. Leave API key empty to aggregate all keys. ")) : Oa("", true), He(l) ? (Hn(), zn(Xr, { key: 1 }, [gn("div", El, [Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Requests", value: He(l).summary.total_requests.toLocaleString() }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Input Tokens", value: u(He(l).summary.total_input_tokens) }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Output Tokens", value: u(He(l).summary.total_output_tokens) }, null, 8, ["value"])]), _: 1 }), Oe(H, { size: "small" }, { default: ct(() => [Oe(q, { label: "Total Cost", value: f(He(l).summary.total_cost) }, null, 8, ["value"])]), _: 1 })]), Oe(P, { columns: He(p), data: He(l).data, pagination: { pageSize: 50 }, size: "small" }, null, 8, ["columns", "data"])], 64)) : Oa("", true)]);
  };
} });
export {
  Xl as default
};
