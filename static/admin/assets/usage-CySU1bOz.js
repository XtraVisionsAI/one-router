var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { u as Nr } from "./useApi-yvWB8agy.js";
import { b as yn, a as Oa } from "./format-bYRzmlsO.js";
import { aC as ca, j as o, ax as Ka, i as Pn, r as T, at as Dn, a as g, w as dt, d as Xe, aD as ut, L as Za, as as bt, aE as ze, B as Pe, o as Ga, W as fa, aF as ha, aG as ma, aH as va, a4 as G, am as zr, e as I, f as j, g as B, aI as Ja, h as me, J as Et, a5 as kn, k as er, O as tr, l as Fn, aJ as Hr, m as Cn, aK as nr, t as Le, S as pe, aL as xn, ag as ar, Y as Er, aM as Br, aB as qr, P as Pa, n as Hn, z as En, y as Ve, v as Ee, E as Bn, s as Oe, q as Nt, C as jr, x as Fa, T as Ur, F as Lr } from "./index-DicalUKt.js";
import { e as rr, u as Rn, _ as Rt } from "./Input-VFsf8aBL.js";
import { u as ir, B as pa, V as ga, a as ya, b as Ut, h as or } from "./Dropdown-DwMgs0HP.js";
import { V as Jn, F as At, b as Lt, B as Wt, c as Qt, d as Xt, _ as Wr, a as Qr } from "./DataTable-DkCuQcym.js";
import { u as ea } from "./use-merged-state-CkMZ2DWG.js";
import { u as Xr } from "./use-message-DGZGK5Il.js";
import { _ as Kr } from "./Statistic-B_OLFlSU.js";
import "./get-BZTOcoVz.js";
import "./use-compitable-Cxdw_G8M.js";
const lr = 6048e5, Zr = 864e5, Gr = 6e4, Jr = 36e5, ei = 1e3, Ra = Symbol.for("constructDateFrom");
function oe(n, e) {
  return typeof n == "function" ? n(e) : n && typeof n == "object" && Ra in n ? n[Ra](e) : n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Jt(n, ...e) {
  const a = oe.bind(null, n || e.find((t) => typeof t == "object"));
  return e.map(a);
}
let ti = {};
function en() {
  return ti;
}
function F(n, e) {
  return oe(e || n, n);
}
function nt(n, e) {
  var _a2, _b, _c, _d;
  const a = en(), t = (e == null ? void 0 : e.weekStartsOn) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? a.weekStartsOn ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, r = F(n, e == null ? void 0 : e.in), i = r.getDay(), l = (i < t ? 7 : 0) + i - t;
  return r.setDate(r.getDate() - l), r.setHours(0, 0, 0, 0), r;
}
function ni(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +nt(t, a) == +nt(r, a);
}
const Ya = ca("date", () => o("svg", { width: "28px", height: "28px", viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, o("g", { "fill-rule": "nonzero" }, o("path", { d: "M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z M23.5,9.503 L4.5,9.503 L4.5,21.75 C4.5,22.7164983 5.28350169,23.5 6.25,23.5 L21.75,23.5 C22.7164983,23.5 23.5,22.7164983 23.5,21.75 L23.5,9.503 Z M21.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,8.003 L23.5,8.003 L23.5,6.25 C23.5,5.28350169 22.7164983,4.5 21.75,4.5 Z" }))))), ai = ca("time", () => o("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, o("path", { d: "M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z", style: `
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
      ` }))), ri = ca("to", () => o("svg", { viewBox: "0 0 20 20", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, o("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, o("g", { fill: "currentColor", "fill-rule": "nonzero" }, o("path", { d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z" })))));
function qt(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  return isNaN(e) ? oe((a == null ? void 0 : a.in) || n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function Ce(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  if (isNaN(e)) return oe(n, NaN);
  if (!e) return t;
  const r = t.getDate(), i = oe(n, t.getTime());
  i.setMonth(t.getMonth() + e + 1, 0);
  const l = i.getDate();
  return r >= l ? i : (t.setFullYear(i.getFullYear(), i.getMonth(), r), t);
}
function Kt(n, e) {
  return nt(n, { ...e, weekStartsOn: 1 });
}
function sr(n, e) {
  const a = F(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = oe(a, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = Kt(r), l = oe(a, 0);
  l.setFullYear(t, 0, 4), l.setHours(0, 0, 0, 0);
  const u = Kt(l);
  return a.getTime() >= i.getTime() ? t + 1 : a.getTime() >= u.getTime() ? t : t - 1;
}
function Sn(n) {
  const e = F(n), a = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return a.setUTCFullYear(e.getFullYear()), +n - +a;
}
function Zt(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setHours(0, 0, 0, 0), a;
}
function ii(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e), i = Zt(t), l = Zt(r), u = +i - Sn(i), h = +l - Sn(l);
  return Math.round((u - h) / Zr);
}
function oi(n, e) {
  const a = sr(n, e), t = oe(n, 0);
  return t.setFullYear(a, 0, 4), t.setHours(0, 0, 0, 0), Kt(t);
}
function li(n, e, a) {
  return Ce(n, e * 3, a);
}
function ta(n, e, a) {
  return Ce(n, e * 12, a);
}
function si(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +Zt(t) == +Zt(r);
}
function ui(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Qe(n) {
  return !(!ui(n) && typeof n != "number" || isNaN(+F(n)));
}
function di(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return Math.trunc(a.getMonth() / 3) + 1;
}
function mn(n, e) {
  const a = F(n, e == null ? void 0 : e.in), t = a.getMonth(), r = t - t % 3;
  return a.setMonth(r, 1), a.setHours(0, 0, 0, 0), a;
}
function ft(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setDate(1), a.setHours(0, 0, 0, 0), a;
}
function vn(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setFullYear(a.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
}
function ci(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return ii(a, vn(a)) + 1;
}
function ur(n, e) {
  const a = F(n, e == null ? void 0 : e.in), t = +Kt(a) - +oi(a);
  return Math.round(t / lr) + 1;
}
function ba(n, e) {
  var _a2, _b, _c, _d;
  const a = F(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = en(), i = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d = (_c = r.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = oe((e == null ? void 0 : e.in) || n, 0);
  l.setFullYear(t + 1, 0, i), l.setHours(0, 0, 0, 0);
  const u = nt(l, e), h = oe((e == null ? void 0 : e.in) || n, 0);
  h.setFullYear(t, 0, i), h.setHours(0, 0, 0, 0);
  const f = nt(h, e);
  return +a >= +u ? t + 1 : +a >= +f ? t : t - 1;
}
function fi(n, e) {
  var _a2, _b, _c, _d;
  const a = en(), t = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, r = ba(n, e), i = oe((e == null ? void 0 : e.in) || n, 0);
  return i.setFullYear(r, 0, t), i.setHours(0, 0, 0, 0), nt(i, e);
}
function dr(n, e) {
  const a = F(n, e == null ? void 0 : e.in), t = +nt(a, e) - +fi(a, e);
  return Math.round(t / lr) + 1;
}
function W(n, e) {
  const a = n < 0 ? "-" : "", t = Math.abs(n).toString().padStart(e, "0");
  return a + t;
}
const gt = { y(n, e) {
  const a = n.getFullYear(), t = a > 0 ? a : 1 - a;
  return W(e === "yy" ? t % 100 : t, e.length);
}, M(n, e) {
  const a = n.getMonth();
  return e === "M" ? String(a + 1) : W(a + 1, 2);
}, d(n, e) {
  return W(n.getDate(), e.length);
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
  return W(n.getHours() % 12 || 12, e.length);
}, H(n, e) {
  return W(n.getHours(), e.length);
}, m(n, e) {
  return W(n.getMinutes(), e.length);
}, s(n, e) {
  return W(n.getSeconds(), e.length);
}, S(n, e) {
  const a = e.length, t = n.getMilliseconds(), r = Math.trunc(t * Math.pow(10, a - 3));
  return W(r, e.length);
} }, zt = { midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, Aa = { G: function(n, e, a) {
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
  const r = ba(n, t), i = r > 0 ? r : 1 - r;
  if (e === "YY") {
    const l = i % 100;
    return W(l, 2);
  }
  return e === "Yo" ? a.ordinalNumber(i, { unit: "year" }) : W(i, e.length);
}, R: function(n, e) {
  const a = sr(n);
  return W(a, e.length);
}, u: function(n, e) {
  const a = n.getFullYear();
  return W(a, e.length);
}, Q: function(n, e, a) {
  const t = Math.ceil((n.getMonth() + 1) / 3);
  switch (e) {
    case "Q":
      return String(t);
    case "QQ":
      return W(t, 2);
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
      return W(t, 2);
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
      return W(t + 1, 2);
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
  const r = dr(n, t);
  return e === "wo" ? a.ordinalNumber(r, { unit: "week" }) : W(r, e.length);
}, I: function(n, e, a) {
  const t = ur(n);
  return e === "Io" ? a.ordinalNumber(t, { unit: "week" }) : W(t, e.length);
}, d: function(n, e, a) {
  return e === "do" ? a.ordinalNumber(n.getDate(), { unit: "date" }) : gt.d(n, e);
}, D: function(n, e, a) {
  const t = ci(n);
  return e === "Do" ? a.ordinalNumber(t, { unit: "dayOfYear" }) : W(t, e.length);
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
      return W(i, 2);
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
      return W(i, e.length);
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
      return W(r, e.length);
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
  return e === "Ko" ? a.ordinalNumber(t, { unit: "hour" }) : W(t, e.length);
}, k: function(n, e, a) {
  let t = n.getHours();
  return t === 0 && (t = 24), e === "ko" ? a.ordinalNumber(t, { unit: "hour" }) : W(t, e.length);
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
      return Ia(t);
    case "XXXX":
    case "XX":
      return Ft(t);
    case "XXXXX":
    case "XXX":
    default:
      return Ft(t, ":");
  }
}, x: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "x":
      return Ia(t);
    case "xxxx":
    case "xx":
      return Ft(t);
    case "xxxxx":
    case "xxx":
    default:
      return Ft(t, ":");
  }
}, O: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + $a(t, ":");
    case "OOOO":
    default:
      return "GMT" + Ft(t, ":");
  }
}, z: function(n, e, a) {
  const t = n.getTimezoneOffset();
  switch (e) {
    case "z":
    case "zz":
    case "zzz":
      return "GMT" + $a(t, ":");
    case "zzzz":
    default:
      return "GMT" + Ft(t, ":");
  }
}, t: function(n, e, a) {
  const t = Math.trunc(+n / 1e3);
  return W(t, e.length);
}, T: function(n, e, a) {
  return W(+n, e.length);
} };
function $a(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.trunc(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + W(i, 2);
}
function Ia(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + W(Math.abs(n) / 60, 2) : Ft(n, e);
}
function Ft(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = W(Math.trunc(t / 60), 2), i = W(t % 60, 2);
  return a + r + e + i;
}
const Va = (n, e) => {
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
}, cr = (n, e) => {
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
}, hi = (n, e) => {
  const a = n.match(/(P+)(p+)?/) || [], t = a[1], r = a[2];
  if (!r) return Va(n, e);
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
  return i.replace("{{date}}", Va(t, e)).replace("{{time}}", cr(r, e));
}, na = { p: cr, P: hi }, mi = /^D+$/, vi = /^Y+$/, pi = ["D", "DD", "YY", "YYYY"];
function fr(n) {
  return mi.test(n);
}
function hr(n) {
  return vi.test(n);
}
function aa(n, e, a) {
  const t = gi(n, e, a);
  if (console.warn(t), pi.includes(n)) throw new RangeError(t);
}
function gi(n, e, a) {
  const t = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${t} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const yi = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, bi = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, wi = /^'([^]*?)'?$/, Di = /''/g, ki = /[a-zA-Z]/;
function Q(n, e, a) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const t = en(), r = (a == null ? void 0 : a.locale) ?? t.locale ?? rr, i = (a == null ? void 0 : a.firstWeekContainsDate) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, l = (a == null ? void 0 : a.weekStartsOn) ?? ((_f = (_e = a == null ? void 0 : a.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? t.weekStartsOn ?? ((_h = (_g = t.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0, u = F(n, a == null ? void 0 : a.in);
  if (!Qe(u)) throw new RangeError("Invalid time value");
  let h = e.match(bi).map((d) => {
    const p = d[0];
    if (p === "p" || p === "P") {
      const D = na[p];
      return D(d, r.formatLong);
    }
    return d;
  }).join("").match(yi).map((d) => {
    if (d === "''") return { isToken: false, value: "'" };
    const p = d[0];
    if (p === "'") return { isToken: false, value: Ci(d) };
    if (Aa[p]) return { isToken: true, value: d };
    if (p.match(ki)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + p + "`");
    return { isToken: false, value: d };
  });
  r.localize.preprocessor && (h = r.localize.preprocessor(u, h));
  const f = { firstWeekContainsDate: i, weekStartsOn: l, locale: r };
  return h.map((d) => {
    if (!d.isToken) return d.value;
    const p = d.value;
    (!(a == null ? void 0 : a.useAdditionalWeekYearTokens) && hr(p) || !(a == null ? void 0 : a.useAdditionalDayOfYearTokens) && fr(p)) && aa(p, e, String(n));
    const D = Aa[p[0]];
    return D(u, p, r.localize, f);
  }).join("");
}
function Ci(n) {
  const e = n.match(wi);
  return e ? e[1].replace(Di, "'") : n;
}
function We(n, e) {
  return F(n, e == null ? void 0 : e.in).getDate();
}
function xi(n, e) {
  return F(n, e == null ? void 0 : e.in).getDay();
}
function Si(n, e) {
  const a = F(n, e == null ? void 0 : e.in), t = a.getFullYear(), r = a.getMonth(), i = oe(a, 0);
  return i.setFullYear(t, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function mr() {
  return Object.assign({}, en());
}
function yt(n, e) {
  return F(n, e == null ? void 0 : e.in).getHours();
}
function Mi(n, e) {
  const a = F(n, e == null ? void 0 : e.in).getDay();
  return a === 0 ? 7 : a;
}
function Ti(n) {
  return F(n).getMilliseconds();
}
function Mn(n, e) {
  return F(n, e == null ? void 0 : e.in).getMinutes();
}
function te(n, e) {
  return F(n, e == null ? void 0 : e.in).getMonth();
}
function Tn(n) {
  return F(n).getSeconds();
}
function w(n) {
  return +F(n);
}
function ie(n, e) {
  return F(n, e == null ? void 0 : e.in).getFullYear();
}
function _i(n, e) {
  const a = Oi(e) ? new e(0) : oe(e, 0);
  return a.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), a.setHours(n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()), a;
}
function Oi(n) {
  var _a2;
  return typeof n == "function" && ((_a2 = n.prototype) == null ? void 0 : _a2.constructor) === n;
}
const Pi = 10;
class vr {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(e, a) {
    return true;
  }
}
class Fi extends vr {
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
class Ri extends vr {
  constructor(e, a) {
    super();
    __publicField(this, "priority", Pi);
    __publicField(this, "subPriority", -1);
    this.context = e || ((t) => oe(a, t));
  }
  set(e, a) {
    return a.timestampIsSet ? e : oe(e, _i(e, this.context));
  }
}
class U {
  run(e, a, t, r) {
    const i = this.parse(e, a, t, r);
    return i ? { setter: new Fi(i.value, this.validate, this.set, this.priority, this.subPriority), rest: i.rest } : null;
  }
  validate(e, a, t) {
    return true;
  }
}
class Yi extends U {
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
  return { value: t * (r * Jr + i * Gr + l * ei), rest: e.slice(a[0].length) };
}
function pr(n) {
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
function wa(n) {
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
function gr(n, e) {
  const a = e > 0, t = a ? e : 1 - e;
  let r;
  if (t <= 50) r = n || 100;
  else {
    const i = t + 50, l = Math.trunc(i / 100) * 100, u = n >= i % 100;
    r = n + l - (u ? 100 : 0);
  }
  return a ? r : 1 - r;
}
function yr(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class Ai extends U {
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
      const l = gr(t.year, r);
      return e.setFullYear(l, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const i = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(i, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class $i extends U {
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
    const i = ba(e, r);
    if (t.isTwoDigitYear) {
      const u = gr(t.year, i);
      return e.setFullYear(u, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), nt(e, r);
    }
    const l = !("era" in a) || a.era === 1 ? t.year : 1 - t.year;
    return e.setFullYear(l, 0, r.firstWeekContainsDate), e.setHours(0, 0, 0, 0), nt(e, r);
  }
}
class Ii extends U {
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
    return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), Kt(r);
  }
}
class Vi extends U {
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
class Ni extends U {
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
class zi extends U {
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
class Hi extends U {
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
class Ei extends U {
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
function Bi(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in), r = dr(t, a) - e;
  return t.setDate(t.getDate() - r * 7), F(t, a == null ? void 0 : a.in);
}
class qi extends U {
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
    return nt(Bi(e, t, r), r);
  }
}
function ji(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in), r = ur(t, a) - e;
  return t.setDate(t.getDate() - r * 7), t;
}
class Ui extends U {
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
    return Kt(ji(e, t));
  }
}
const Li = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Wi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class Qi extends U {
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
    const t = e.getFullYear(), r = yr(t), i = e.getMonth();
    return r ? a >= 1 && a <= Wi[i] : a >= 1 && a <= Li[i];
  }
  set(e, a, t) {
    return e.setDate(t), e.setHours(0, 0, 0, 0), e;
  }
}
class Xi extends U {
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
    return yr(t) ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
  }
  set(e, a, t) {
    return e.setMonth(0, t), e.setHours(0, 0, 0, 0), e;
  }
}
function Da(n, e, a) {
  var _a2, _b, _c, _d;
  const t = en(), r = (a == null ? void 0 : a.weekStartsOn) ?? ((_b = (_a2 = a == null ? void 0 : a.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? t.weekStartsOn ?? ((_d = (_c = t.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, i = F(n, a == null ? void 0 : a.in), l = i.getDay(), h = (e % 7 + 7) % 7, f = 7 - r, d = e < 0 || e > 6 ? e - (l + f) % 7 : (h + f) % 7 - (l + f) % 7;
  return qt(i, d, a);
}
class Ki extends U {
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
    return e = Da(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Zi extends U {
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
    return e = Da(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Gi extends U {
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
    return e = Da(e, t, r), e.setHours(0, 0, 0, 0), e;
  }
}
function Ji(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in), r = Mi(t, a), i = e - r;
  return qt(t, i, a);
}
class eo extends U {
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
    return e = Ji(e, t), e.setHours(0, 0, 0, 0), e;
  }
}
class to extends U {
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
    return e.setHours(wa(t), 0, 0, 0), e;
  }
}
class no extends U {
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
    return e.setHours(wa(t), 0, 0, 0), e;
  }
}
class ao extends U {
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
    return e.setHours(wa(t), 0, 0, 0), e;
  }
}
class ro extends U {
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
class io extends U {
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
class oo extends U {
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
class lo extends U {
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
class so extends U {
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
class uo extends U {
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
class co extends U {
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
class fo extends U {
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
    return a.timestampIsSet ? e : oe(e, e.getTime() - Sn(e) - t);
  }
}
class ho extends U {
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
    return a.timestampIsSet ? e : oe(e, e.getTime() - Sn(e) - t);
  }
}
class mo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return pr(e);
  }
  set(e, a, t) {
    return [oe(e, t * 1e3), { timestampIsSet: true }];
  }
}
class vo extends U {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return pr(e);
  }
  set(e, a, t) {
    return [oe(e, t), { timestampIsSet: true }];
  }
}
const po = { G: new Yi(), y: new Ai(), Y: new $i(), R: new Ii(), u: new Vi(), Q: new Ni(), q: new zi(), M: new Hi(), L: new Ei(), w: new qi(), I: new Ui(), d: new Qi(), D: new Xi(), E: new Ki(), e: new Zi(), c: new Gi(), i: new eo(), a: new to(), b: new no(), B: new ao(), h: new ro(), H: new io(), K: new oo(), k: new lo(), m: new so(), s: new uo(), S: new co(), X: new fo(), x: new ho(), t: new mo(), T: new vo() }, go = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, yo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, bo = /^'([^]*?)'?$/, wo = /''/g, Do = /\S/, ko = /[a-zA-Z]/;
function Co(n, e, a, t) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const r = () => oe((t == null ? void 0 : t.in) || a, NaN), i = mr(), l = (t == null ? void 0 : t.locale) ?? i.locale ?? rr, u = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((_d = (_c = i.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, h = (t == null ? void 0 : t.weekStartsOn) ?? ((_f = (_e = t == null ? void 0 : t.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? i.weekStartsOn ?? ((_h = (_g = i.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (!e) return n ? r() : F(a, t == null ? void 0 : t.in);
  const f = { firstWeekContainsDate: u, weekStartsOn: h, locale: l }, d = [new Ri(t == null ? void 0 : t.in, a)], p = e.match(yo).map((x) => {
    const _ = x[0];
    if (_ in na) {
      const N = na[_];
      return N(x, l.formatLong);
    }
    return x;
  }).join("").match(go), D = [];
  for (let x of p) {
    !(t == null ? void 0 : t.useAdditionalWeekYearTokens) && hr(x) && aa(x, e, n), !(t == null ? void 0 : t.useAdditionalDayOfYearTokens) && fr(x) && aa(x, e, n);
    const _ = x[0], N = po[_];
    if (N) {
      const { incompatibleTokens: H } = N;
      if (Array.isArray(H)) {
        const Y = D.find((Z) => H.includes(Z.token) || Z.token === _);
        if (Y) throw new RangeError(`The format string mustn't contain \`${Y.fullToken}\` and \`${x}\` at the same time`);
      } else if (N.incompatibleTokens === "*" && D.length > 0) throw new RangeError(`The format string mustn't contain \`${x}\` and any other token at the same time`);
      D.push({ token: _, fullToken: x });
      const X = N.run(n, x, l.match, f);
      if (!X) return r();
      d.push(X.setter), n = X.rest;
    } else {
      if (_.match(ko)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + _ + "`");
      if (x === "''" ? x = "'" : _ === "'" && (x = xo(x)), n.indexOf(x) === 0) n = n.slice(x.length);
      else return r();
    }
  }
  if (n.length > 0 && Do.test(n)) return r();
  const P = d.map((x) => x.priority).sort((x, _) => _ - x).filter((x, _, N) => N.indexOf(x) === _).map((x) => d.filter((_) => _.priority === x).sort((_, N) => N.subPriority - _.subPriority)).map((x) => x[0]);
  let $ = F(a, t == null ? void 0 : t.in);
  if (isNaN(+$)) return r();
  const J = {};
  for (const x of P) {
    if (!x.validate($, f)) return r();
    const _ = x.set($, J, f);
    Array.isArray(_) ? ($ = _[0], Object.assign(J, _[1])) : $ = _;
  }
  return $;
}
function xo(n) {
  return n.match(bo)[1].replace(wo, "'");
}
function So(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setMinutes(0, 0, 0), a;
}
function Mo(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setSeconds(0, 0), a;
}
function pn(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function br(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return +mn(t) == +mn(r);
}
function ka(n, e) {
  const a = F(n, e == null ? void 0 : e.in);
  return a.setMilliseconds(0), a;
}
function wr(n, e, a) {
  const [t, r] = Jt(a == null ? void 0 : a.in, n, e);
  return t.getFullYear() === r.getFullYear();
}
function Ca(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in), r = t.getFullYear(), i = t.getDate(), l = oe(n, 0);
  l.setFullYear(r, e, 15), l.setHours(0, 0, 0, 0);
  const u = Si(l);
  return t.setMonth(e, Math.min(i, u)), t;
}
function xe(n, e, a) {
  let t = F(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (e.year != null && t.setFullYear(e.year), e.month != null && (t = Ca(t, e.month)), e.date != null && t.setDate(e.date), e.hours != null && t.setHours(e.hours), e.minutes != null && t.setMinutes(e.minutes), e.seconds != null && t.setSeconds(e.seconds), e.milliseconds != null && t.setMilliseconds(e.milliseconds), t);
}
function Pt(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  return t.setHours(e), t;
}
function qn(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  return t.setMinutes(e), t;
}
function To(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in), r = Math.trunc(t.getMonth() / 3) + 1, i = e - r;
  return Ca(t, t.getMonth() + i * 3);
}
function jn(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  return t.setSeconds(e), t;
}
function ra(n, e, a) {
  const t = F(n, a == null ? void 0 : a.in);
  return isNaN(+t) ? oe(n, NaN) : (t.setFullYear(e), t);
}
const _o = { date: si, month: pn, year: wr, quarter: br };
function Oo(n) {
  return (e, a) => {
    const t = Po(n);
    return ni(e, a, { weekStartsOn: t });
  };
}
function Po(n) {
  return (n + 1) % 7;
}
function Ye(n, e, a, t = 0) {
  return (a === "week" ? Oo(t) : _o[a])(n, e);
}
function Un(n, e, a, t, r, i) {
  return r === "date" ? Fo(n, e, a, t) : Ro(n, e, a, t, i);
}
function Fo(n, e, a, t) {
  let r = false, i = false, l = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (r = true), Ye(a[0], n, "date") && (i = true), Ye(a[1], n, "date") && (l = true));
  const u = a !== null && (Array.isArray(a) ? Ye(a[0], n, "date") || Ye(a[1], n, "date") : Ye(a, n, "date"));
  return { type: "date", dateObject: { date: We(n), month: te(n), year: ie(n) }, inCurrentMonth: pn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: r, inSelectedWeek: false, startOfSpan: i, endOfSpan: l, selected: u, ts: w(n) };
}
function Dr(n, e, a) {
  const t = new Date(2e3, n, 1).getTime();
  return Q(t, e, { locale: a });
}
function kr(n, e, a) {
  const t = new Date(n, 1, 1).getTime();
  return Q(t, e, { locale: a });
}
function Cr(n, e, a) {
  const t = new Date(2e3, n * 3 - 2, 1).getTime();
  return Q(t, e, { locale: a });
}
function Ro(n, e, a, t, r) {
  let i = false, l = false, u = false;
  Array.isArray(a) && (a[0] < n && n < a[1] && (i = true), Ye(a[0], n, "week", r) && (l = true), Ye(a[1], n, "week", r) && (u = true));
  const h = a !== null && (Array.isArray(a) ? Ye(a[0], n, "week", r) || Ye(a[1], n, "week", r) : Ye(a, n, "week", r));
  return { type: "date", dateObject: { date: We(n), month: te(n), year: ie(n) }, inCurrentMonth: pn(n, e), isCurrentDate: Ye(t, n, "date"), inSpan: i, startOfSpan: l, endOfSpan: u, selected: false, inSelectedWeek: h, ts: w(n) };
}
function Yo(n, e, a, { monthFormat: t }) {
  return { type: "month", monthFormat: t, dateObject: { month: te(n), year: ie(n) }, isCurrent: pn(a, n), selected: e !== null && Ye(e, n, "month"), ts: w(n) };
}
function Ao(n, e, a, { yearFormat: t }) {
  return { type: "year", yearFormat: t, dateObject: { year: ie(n) }, isCurrent: wr(a, n), selected: e !== null && Ye(e, n, "year"), ts: w(n) };
}
function $o(n, e, a, { quarterFormat: t }) {
  return { type: "quarter", quarterFormat: t, dateObject: { quarter: di(n), year: ie(n) }, isCurrent: br(a, n), selected: e !== null && Ye(e, n, "quarter"), ts: w(n) };
}
function ia(n, e, a, t, r = false, i = false) {
  const l = i ? "week" : "date", u = te(n);
  let h = w(ft(n)), f = w(qt(h, -1));
  const d = [];
  let p = !r;
  for (; xi(f) !== t || p; ) d.unshift(Un(f, n, e, a, l, t)), f = w(qt(f, -1)), p = false;
  for (; te(h) === u; ) d.push(Un(h, n, e, a, l, t)), h = w(qt(h, 1));
  const D = r ? d.length <= 28 ? 28 : d.length <= 35 ? 35 : 42 : 42;
  for (; d.length < D; ) d.push(Un(h, n, e, a, l, t)), h = w(qt(h, 1));
  return d;
}
function oa(n, e, a, t) {
  const r = [], i = vn(n);
  for (let l = 0; l < 12; l++) r.push(Yo(w(Ce(i, l)), e, a, t));
  return r;
}
function la(n, e, a, t) {
  const r = [], i = vn(n);
  for (let l = 0; l < 4; l++) r.push($o(w(li(i, l)), e, a, t));
  return r;
}
function sa(n, e, a, t) {
  const r = t.value, i = [], l = vn(ra(/* @__PURE__ */ new Date(), r[0]));
  for (let u = 0; u < r[1] - r[0]; u++) i.push(Ao(w(ta(l, u)), n, e, a));
  return i;
}
function Ne(n, e, a, t) {
  const r = Co(n, e, a, t);
  return Qe(r) ? Q(r, e, t) === n ? r : new Date(Number.NaN) : r;
}
function Io(n, e) {
  const a = e(n);
  return jt(a);
}
function Na(n, e, a, t) {
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
const Yn = Ka("n-date-picker"), Yt = 40, Vo = "HH:mm:ss", xr = { active: Boolean, dateFormat: String, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, required: true }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, timePickerFormat: { type: String, value: Vo }, value: { type: [Array, Number], default: null }, shortcuts: Object, defaultTime: [Number, String, Array, Function], inputReadonly: Boolean, onClear: Function, onConfirm: Function, onClose: Function, onTabOut: Function, onKeydown: Function, actions: Array, onSelectYear: Function, onSelectMonth: Function, onUpdateValue: { type: Function, required: true }, themeClass: String, onRender: Function, panel: Boolean, onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function };
function Sr(n) {
  const { dateLocaleRef: e, timePickerSizeRef: a, timePickerPropsRef: t, localeRef: r, mergedClsPrefixRef: i, mergedThemeRef: l } = Pn(Yn), u = g(() => ({ locale: e.value.locale })), h = T(null), f = ir();
  function d() {
    const { onClear: V } = n;
    V && V();
  }
  function p() {
    const { onConfirm: V, value: C } = n;
    V && V(C);
  }
  function D(V, C) {
    const { onUpdateValue: De } = n;
    De(V, C);
  }
  function P(V = false) {
    const { onClose: C } = n;
    C && C(V);
  }
  function $() {
    const { onTabOut: V } = n;
    V && V();
  }
  function J() {
    D(null, true), P(true), d();
  }
  function x() {
    $();
  }
  function _() {
    (n.active || n.panel) && Dn(() => {
      const { value: V } = h;
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
    V.key === "Tab" && V.target === h.value && f.shift && (V.preventDefault(), $());
  }
  function H(V) {
    const { value: C } = h;
    f.tab && V.target === C && (C == null ? void 0 : C.contains(V.relatedTarget)) && $();
  }
  let X = null, Y = false;
  function Z() {
    X = n.value, Y = true;
  }
  function q() {
    Y = false;
  }
  function be() {
    Y && (D(X, false), Y = false);
  }
  function Ke(V) {
    return typeof V == "function" ? V() : V;
  }
  const ae = T(false);
  function we() {
    ae.value = !ae.value;
  }
  return { mergedTheme: l, mergedClsPrefix: i, dateFnsOptions: u, timePickerSize: a, timePickerProps: t, selfRef: h, locale: r, doConfirm: p, doClose: P, doUpdateValue: D, doTabOut: $, handleClearClick: J, handleFocusDetectorFocus: x, disableTransitionOneTick: _, handlePanelKeyDown: N, handlePanelFocus: H, cachePendingValue: Z, clearPendingValue: q, restorePendingValue: be, getShortcutValue: Ke, handleShortcutMouseleave: be, showMonthYearPanel: ae, handleOpenQuickSelectMonthPanel: we };
}
const xa = Object.assign(Object.assign({}, xr), { defaultCalendarStartTime: Number, actions: { type: Array, default: () => ["now", "clear", "confirm"] } });
function Sa(n, e) {
  var a;
  const t = Sr(n), { isValueInvalidRef: r, isDateDisabledRef: i, isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: h, isHourDisabledRef: f, isMinuteDisabledRef: d, isSecondDisabledRef: p, localeRef: D, firstDayOfWeekRef: P, datePickerSlots: $, yearFormatRef: J, monthFormatRef: x, quarterFormatRef: _, yearRangeRef: N } = Pn(Yn), H = { isValueInvalid: r, isDateDisabled: i, isDateInvalid: l, isTimeInvalid: u, isDateTimeInvalid: h, isHourDisabled: f, isMinuteDisabled: d, isSecondDisabled: p }, X = g(() => n.dateFormat || D.value.dateFormat), Y = g(() => n.calendarDayFormat || D.value.dayFormat), Z = T(n.value === null || Array.isArray(n.value) ? "" : Q(n.value, X.value)), q = T(n.value === null || Array.isArray(n.value) ? (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Date.now() : n.value), be = T(null), Ke = T(null), ae = T(null), we = T(Date.now()), V = g(() => {
    var v;
    return ia(q.value, n.value, we.value, (v = P.value) !== null && v !== void 0 ? v : D.value.firstDayOfWeek, false, e === "week");
  }), C = g(() => {
    const { value: v } = n;
    return oa(q.value, Array.isArray(v) ? null : v, we.value, { monthFormat: x.value });
  }), De = g(() => {
    const { value: v } = n;
    return sa(Array.isArray(v) ? null : v, we.value, { yearFormat: J.value }, N);
  }), Ze = g(() => {
    const { value: v } = n;
    return la(q.value, Array.isArray(v) ? null : v, we.value, { quarterFormat: _.value });
  }), Be = g(() => V.value.slice(0, 7).map((v) => {
    const { ts: O } = v;
    return Q(O, Y.value, t.dateFnsOptions.value);
  })), Ge = g(() => Q(q.value, n.calendarHeaderMonthFormat || D.value.monthFormat, t.dateFnsOptions.value)), Je = g(() => Q(q.value, n.calendarHeaderYearFormat || D.value.yearFormat, t.dateFnsOptions.value)), qe = g(() => {
    var v;
    return (v = n.calendarHeaderMonthBeforeYear) !== null && v !== void 0 ? v : D.value.monthBeforeYear;
  });
  dt(q, (v, O) => {
    (e === "date" || e === "datetime") && (pn(v, O) || t.disableTransitionOneTick());
  }), dt(g(() => n.value), (v) => {
    v !== null && !Array.isArray(v) ? (Z.value = Q(v, X.value, t.dateFnsOptions.value), q.value = v) : Z.value = "";
  });
  function Se(v) {
    var O;
    if (e === "datetime") return w(ka(v));
    if (e === "month") return w(ft(v));
    if (e === "year") return w(vn(v));
    if (e === "quarter") return w(mn(v));
    if (e === "week") {
      const L = (((O = P.value) !== null && O !== void 0 ? O : D.value.firstDayOfWeek) + 1) % 7;
      return w(nt(v, { weekStartsOn: L }));
    }
    return w(Zt(v));
  }
  function Fe(v, O) {
    const { isDateDisabled: { value: L } } = H;
    return L ? L(v, O) : false;
  }
  function ge(v) {
    const O = Ne(v, X.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (Qe(O)) {
      if (n.value === null) t.doUpdateValue(w(Se(Date.now())), n.panel);
      else if (!Array.isArray(n.value)) {
        const L = xe(n.value, { year: ie(O), month: te(O), date: We(O) });
        t.doUpdateValue(w(Se(w(L))), n.panel);
      }
    } else Z.value = v;
  }
  function ct() {
    const v = Ne(Z.value, X.value, /* @__PURE__ */ new Date(), t.dateFnsOptions.value);
    if (Qe(v)) {
      if (n.value === null) t.doUpdateValue(w(Se(Date.now())), false);
      else if (!Array.isArray(n.value)) {
        const O = xe(n.value, { year: ie(v), month: te(v), date: We(v) });
        t.doUpdateValue(w(Se(w(O))), false);
      }
    } else E();
  }
  function re() {
    t.doUpdateValue(null, true), Z.value = "", t.doClose(true), t.handleClearClick();
  }
  function ne() {
    t.doUpdateValue(w(Se(Date.now())), true);
    const v = Date.now();
    q.value = v, t.doClose(true), n.panel && (e === "month" || e === "quarter" || e === "year") && (t.disableTransitionOneTick(), et(v));
  }
  const Me = T(null);
  function he(v) {
    v.type === "date" && e === "week" && (Me.value = Se(w(v.ts)));
  }
  function He(v) {
    return v.type === "date" && e === "week" ? Se(w(v.ts)) === Me.value : false;
  }
  function Te(v) {
    if (Fe(v.ts, v.type === "date" ? { type: "date", year: v.dateObject.year, month: v.dateObject.month, date: v.dateObject.date } : v.type === "month" ? { type: "month", year: v.dateObject.year, month: v.dateObject.month } : v.type === "year" ? { type: "year", year: v.dateObject.year } : { type: "quarter", year: v.dateObject.year, quarter: v.dateObject.quarter })) return;
    let O;
    if (n.value !== null && !Array.isArray(n.value) ? O = n.value : O = Date.now(), e === "datetime" && n.defaultTime !== null && !Array.isArray(n.defaultTime)) {
      let L;
      typeof n.defaultTime == "function" ? L = Io(v.ts, n.defaultTime) : L = jt(n.defaultTime), L && (O = w(xe(O, L)));
    }
    switch (O = w(v.type === "quarter" && v.dateObject.quarter ? To(ra(O, v.dateObject.year), v.dateObject.quarter) : xe(O, v.dateObject)), t.doUpdateValue(Se(O), n.panel || e === "date" || e === "week" || e === "year"), e) {
      case "date":
      case "week":
        t.doClose();
        break;
      case "year":
        n.panel && t.disableTransitionOneTick(), t.doClose();
        break;
      case "month":
        t.disableTransitionOneTick(), et(O);
        break;
      case "quarter":
        t.disableTransitionOneTick(), et(O);
        break;
    }
  }
  function wt(v, O) {
    let L;
    n.value !== null && !Array.isArray(n.value) ? L = n.value : L = Date.now(), L = w(v.type === "month" ? Ca(L, v.dateObject.month) : ra(L, v.dateObject.year)), O(L), et(L);
  }
  function $e(v) {
    q.value = v;
  }
  function E(v) {
    if (n.value === null || Array.isArray(n.value)) {
      Z.value = "";
      return;
    }
    v === void 0 && (v = n.value), Z.value = Q(v, X.value, t.dateFnsOptions.value);
  }
  function ht() {
    H.isDateInvalid.value || H.isTimeInvalid.value || (t.doConfirm(), at());
  }
  function at() {
    n.active && t.doClose();
  }
  function Dt() {
    var v;
    q.value = w(ta(q.value, 1)), (v = n.onNextYear) === null || v === void 0 || v.call(n);
  }
  function kt() {
    var v;
    q.value = w(ta(q.value, -1)), (v = n.onPrevYear) === null || v === void 0 || v.call(n);
  }
  function Ct() {
    var v;
    q.value = w(Ce(q.value, 1)), (v = n.onNextMonth) === null || v === void 0 || v.call(n);
  }
  function xt() {
    var v;
    q.value = w(Ce(q.value, -1)), (v = n.onPrevMonth) === null || v === void 0 || v.call(n);
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
    (v = Ke.value) === null || v === void 0 || v.sync();
  }
  function je(v) {
    v !== null && t.doUpdateValue(v, n.panel);
  }
  function Tt(v) {
    t.cachePendingValue();
    const O = t.getShortcutValue(v);
    typeof O == "number" && t.doUpdateValue(O, false);
  }
  function _t(v) {
    const O = t.getShortcutValue(v);
    typeof O == "number" && (t.doUpdateValue(O, n.panel), t.clearPendingValue(), ht());
  }
  function et(v) {
    const { value: O } = n;
    if (ae.value) {
      const L = te(v === void 0 ? O === null ? Date.now() : O : v);
      ae.value.scrollTo({ top: L * Yt });
    }
    if (be.value) {
      const L = ie(v === void 0 ? O === null ? Date.now() : O : v) - N.value[0];
      be.value.scrollTo({ top: L * Yt });
    }
  }
  const Ot = { monthScrollbarRef: ae, yearScrollbarRef: Ke, yearVlRef: be };
  return Object.assign(Object.assign(Object.assign(Object.assign({ dateArray: V, monthArray: C, yearArray: De, quarterArray: Ze, calendarYear: Je, calendarMonth: Ge, weekdays: Be, calendarMonthBeforeYear: qe, mergedIsDateDisabled: Fe, nextYear: Dt, prevYear: kt, nextMonth: Ct, prevMonth: xt, handleNowClick: ne, handleConfirmClick: ht, handleSingleShortcutMouseenter: Tt, handleSingleShortcutClick: _t }, H), t), Ot), { handleDateClick: Te, handleDateInputBlur: ct, handleDateInput: ge, handleDateMouseEnter: he, isWeekHovered: He, handleTimePickerChange: je, clearSelectedDateTime: re, virtualListContainer: St, virtualListContent: Mt, handleVirtualListScroll: mt, timePickerSize: t.timePickerSize, dateInputValue: Z, datePickerSlots: $, handleQuickMonthClick: wt, justifyColumnsScrollState: et, calendarValue: q, onUpdateCalendarValue: $e });
}
const Mr = Xe({ name: "MonthPanel", props: Object.assign(Object.assign({}, xa), { type: { type: String, required: true }, useAsQuickJump: Boolean }), setup(n) {
  const e = Sa(n, n.type), { dateLocaleRef: a } = Rn("DatePicker"), t = (l) => {
    switch (l.type) {
      case "year":
        return kr(l.dateObject.year, l.yearFormat, a.value.locale);
      case "month":
        return Dr(l.dateObject.month, l.monthFormat, a.value.locale);
      case "quarter":
        return Cr(l.dateObject.quarter, l.quarterFormat, a.value.locale);
    }
  }, { useAsQuickJump: r } = n, i = (l, u, h) => {
    const { mergedIsDateDisabled: f, handleDateClick: d, handleQuickMonthClick: p } = e;
    return o("div", { "data-n-date": true, key: u, class: [`${h}-date-panel-month-calendar__picker-col-item`, l.isCurrent && `${h}-date-panel-month-calendar__picker-col-item--current`, l.selected && `${h}-date-panel-month-calendar__picker-col-item--selected`, !r && f(l.ts, l.type === "year" ? { type: "year", year: l.dateObject.year } : l.type === "month" ? { type: "month", year: l.dateObject.year, month: l.dateObject.month } : l.type === "quarter" ? { type: "month", year: l.dateObject.year, month: l.dateObject.quarter } : null) && `${h}-date-panel-month-calendar__picker-col-item--disabled`], onClick: () => {
      var D, P;
      l.type === "year" ? (D = n.onSelectYear) === null || D === void 0 || D.call(n) : l.type === "month" && ((P = n.onSelectMonth) === null || P === void 0 || P.call(n)), r ? p(l, ($) => {
        n.onUpdateValue($, false);
      }) : d(l);
    } }, t(l));
  };
  return Ga(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: i });
}, render() {
  const { mergedClsPrefix: n, mergedTheme: e, shortcuts: a, actions: t, renderItem: r, type: i, onRender: l } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${n}-date-panel`, `${n}-date-panel--month`, !this.panel && `${n}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${n}-date-panel-month-calendar` }, o(ut, { ref: "yearScrollbarRef", class: `${n}-date-panel-month-calendar__picker-col`, theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar, container: this.virtualListContainer, content: this.virtualListContent, horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Jn, { ref: "yearVlRef", items: this.yearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleVirtualListScroll, paddingBottom: 4 }, { default: ({ item: u, index: h }) => r(u, h, n) }) }), i === "month" || i === "quarter" ? o("div", { class: `${n}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "monthScrollbarRef", theme: e.peers.Scrollbar, themeOverrides: e.peerOverrides.Scrollbar }, { default: () => [(i === "month" ? this.monthArray : this.quarterArray).map((u, h) => r(u, h, n)), o("div", { class: `${n}-date-panel-${i}-calendar__padding` })] })) : null), Za(this.datePickerSlots.footer, (u) => u ? o("div", { class: `${n}-date-panel-footer` }, u) : null), (t == null ? void 0 : t.length) || a ? o("div", { class: `${n}-date-panel-actions` }, o("div", { class: `${n}-date-panel-actions__prefix` }, a && Object.keys(a).map((u) => {
    const h = a[u];
    return Array.isArray(h) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(h);
    }, onClick: () => {
      this.handleSingleShortcutClick(h);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => u });
  })), o("div", { class: `${n}-date-panel-actions__suffix` }, (t == null ? void 0 : t.includes("clear")) ? ze(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, (t == null ? void 0 : t.includes("now")) ? ze(this.datePickerSlots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, (t == null ? void 0 : t.includes("confirm")) ? ze(this.datePickerSlots.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Pe, { theme: e.peers.Button, themeOverrides: e.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Gt = Xe({ props: { mergedClsPrefix: { type: String, required: true }, value: Number, monthBeforeYear: { type: Boolean, required: true }, monthYearSeparator: { type: String, required: true }, fastYearSelect: Boolean, fastMonthSelect: Boolean, calendarMonth: { type: String, required: true }, calendarYear: { type: String, required: true }, onUpdateValue: { type: Function, required: true } }, setup(n) {
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
    var d;
    t.value && !(!((d = e.value) === null || d === void 0) && d.contains(va(f))) && (t.value = false);
  }
  function h() {
    r();
  }
  return { show: t, triggerRef: e, monthPanelRef: a, handleSelectYear: i, handleSelectMonth: l, handleHeaderClick: h, handleClickOutside: u };
}, render() {
  const { handleClickOutside: n, mergedClsPrefix: e } = this;
  return o("div", { class: `${e}-date-panel-month__month-year`, ref: "triggerRef" }, o(pa, null, { default: () => [o(ga, null, { default: () => o("div", { class: [`${e}-date-panel-month__text`, this.show && `${e}-date-panel-month__text--active`], onClick: this.handleHeaderClick }, this.monthBeforeYear ? [this.calendarMonth, this.monthYearSeparator, this.calendarYear] : [this.calendarYear, this.monthYearSeparator, this.calendarMonth]) }), o(ya, { show: this.show, teleportDisabled: true }, { default: () => o(fa, { name: "fade-in-scale-up-transition", appear: true }, { default: () => this.show ? ha(o(Mr, { ref: "monthPanelRef", onUpdateValue: this.onUpdateValue, onSelectYear: this.handleSelectYear, onSelectMonth: this.handleSelectMonth, actions: [], calendarHeaderMonthYearSeparator: this.monthYearSeparator, type: "month", key: "month", useAsQuickJump: true, value: this.value }), [[ma, n, void 0, { capture: true }]]) : null }) })] }));
} }), No = Xe({ name: "DatePanel", props: Object.assign(Object.assign({}, xa), { type: { type: String, required: true } }), setup(n) {
  return Sa(n, n.type);
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u, type: h } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--${h}`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown }, o("div", { class: `${t}-date-panel-calendar` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.prevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.prevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: t, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.nextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.nextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel-dates` }, this.dateArray.map((f, d) => o("div", { "data-n-date": true, key: d, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(f.ts, { type: "date", year: f.dateObject.year, month: f.dateObject.month, date: f.dateObject.date }), [`${t}-date-panel-date--week-hovered`]: this.isWeekHovered(f), [`${t}-date-panel-date--week-selected`]: f.inSelectedWeek }], onClick: () => {
    this.handleDateClick(f);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(f);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const d = i[f];
    return Array.isArray(d) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(d);
    }, onClick: () => {
      this.handleSingleShortcutClick(d);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f });
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? ze(this.$slots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? ze(this.$slots.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Ma = Object.assign(Object.assign({}, xr), { defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, actions: { type: Array, default: () => ["clear", "confirm"] } });
function Ta(n, e) {
  var a, t;
  const { isDateDisabledRef: r, isStartHourDisabledRef: i, isEndHourDisabledRef: l, isStartMinuteDisabledRef: u, isEndMinuteDisabledRef: h, isStartSecondDisabledRef: f, isEndSecondDisabledRef: d, isStartDateInvalidRef: p, isEndDateInvalidRef: D, isStartTimeInvalidRef: P, isEndTimeInvalidRef: $, isStartValueInvalidRef: J, isEndValueInvalidRef: x, isRangeInvalidRef: _, localeRef: N, rangesRef: H, closeOnSelectRef: X, updateValueOnCloseRef: Y, firstDayOfWeekRef: Z, datePickerSlots: q, monthFormatRef: be, yearFormatRef: Ke, quarterFormatRef: ae, yearRangeRef: we } = Pn(Yn), V = { isDateDisabled: r, isStartHourDisabled: i, isEndHourDisabled: l, isStartMinuteDisabled: u, isEndMinuteDisabled: h, isStartSecondDisabled: f, isEndSecondDisabled: d, isStartDateInvalid: p, isEndDateInvalid: D, isStartTimeInvalid: P, isEndTimeInvalid: $, isStartValueInvalid: J, isEndValueInvalid: x, isRangeInvalid: _ }, C = Sr(n), De = T(null), Ze = T(null), Be = T(null), Ge = T(null), Je = T(null), qe = T(null), Se = T(null), Fe = T(null), { value: ge } = n, ct = (a = n.defaultCalendarStartTime) !== null && a !== void 0 ? a : Array.isArray(ge) && typeof ge[0] == "number" ? ge[0] : Date.now(), re = T(ct), ne = T((t = n.defaultCalendarEndTime) !== null && t !== void 0 ? t : Array.isArray(ge) && typeof ge[1] == "number" ? ge[1] : w(Ce(ct, 1)));
  ke(true);
  const Me = T(Date.now()), he = T(false), He = T(0), Te = g(() => n.dateFormat || N.value.dateFormat), wt = g(() => n.calendarDayFormat || N.value.dayFormat), $e = T(Array.isArray(ge) ? Q(ge[0], Te.value, C.dateFnsOptions.value) : ""), E = T(Array.isArray(ge) ? Q(ge[1], Te.value, C.dateFnsOptions.value) : ""), ht = g(() => he.value ? "end" : "start"), at = g(() => {
    var s;
    return ia(re.value, n.value, Me.value, (s = Z.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), Dt = g(() => {
    var s;
    return ia(ne.value, n.value, Me.value, (s = Z.value) !== null && s !== void 0 ? s : N.value.firstDayOfWeek);
  }), kt = g(() => at.value.slice(0, 7).map((s) => {
    const { ts: b } = s;
    return Q(b, wt.value, C.dateFnsOptions.value);
  })), Ct = g(() => Q(re.value, n.calendarHeaderMonthFormat || N.value.monthFormat, C.dateFnsOptions.value)), xt = g(() => Q(ne.value, n.calendarHeaderMonthFormat || N.value.monthFormat, C.dateFnsOptions.value)), St = g(() => Q(re.value, n.calendarHeaderYearFormat || N.value.yearFormat, C.dateFnsOptions.value)), Mt = g(() => Q(ne.value, n.calendarHeaderYearFormat || N.value.yearFormat, C.dateFnsOptions.value)), mt = g(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[0] : null;
  }), je = g(() => {
    const { value: s } = n;
    return Array.isArray(s) ? s[1] : null;
  }), Tt = g(() => {
    const { shortcuts: s } = n;
    return s || H.value;
  }), _t = g(() => sa(Ht(n.value, "start"), Me.value, { yearFormat: Ke.value }, we)), et = g(() => sa(Ht(n.value, "end"), Me.value, { yearFormat: Ke.value }, we)), Ot = g(() => {
    const s = Ht(n.value, "start");
    return la(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), v = g(() => {
    const s = Ht(n.value, "end");
    return la(s ?? Date.now(), s, Me.value, { quarterFormat: ae.value });
  }), O = g(() => {
    const s = Ht(n.value, "start");
    return oa(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), L = g(() => {
    const s = Ht(n.value, "end");
    return oa(s ?? Date.now(), s, Me.value, { monthFormat: be.value });
  }), tn = g(() => {
    var s;
    return (s = n.calendarHeaderMonthBeforeYear) !== null && s !== void 0 ? s : N.value.monthBeforeYear;
  });
  dt(g(() => n.value), (s) => {
    if (s !== null && Array.isArray(s)) {
      const [b, M] = s;
      $e.value = Q(b, Te.value, C.dateFnsOptions.value), E.value = Q(M, Te.value, C.dateFnsOptions.value), he.value || z(s);
    } else $e.value = "", E.value = "";
  });
  function $t(s, b) {
    (e === "daterange" || e === "datetimerange") && (ie(s) !== ie(b) || te(s) !== te(b)) && C.disableTransitionOneTick();
  }
  dt(re, $t), dt(ne, $t);
  function ke(s) {
    const b = ft(re.value), M = ft(ne.value);
    (n.bindCalendarMonths || b >= M) && (s ? ne.value = w(Ce(b, 1)) : re.value = w(Ce(M, -1)));
  }
  function Ue() {
    re.value = w(Ce(re.value, 12)), ke(true);
  }
  function vt() {
    re.value = w(Ce(re.value, -12)), ke(true);
  }
  function pt() {
    re.value = w(Ce(re.value, 1)), ke(true);
  }
  function nn() {
    re.value = w(Ce(re.value, -1)), ke(true);
  }
  function Ie() {
    ne.value = w(Ce(ne.value, 12)), ke(false);
  }
  function rt() {
    ne.value = w(Ce(ne.value, -12)), ke(false);
  }
  function It() {
    ne.value = w(Ce(ne.value, 1)), ke(false);
  }
  function it() {
    ne.value = w(Ce(ne.value, -1)), ke(false);
  }
  function m(s) {
    re.value = s, ke(true);
  }
  function S(s) {
    ne.value = s, ke(false);
  }
  function R(s) {
    const b = r.value;
    if (!b) return false;
    if (!Array.isArray(n.value) || ht.value === "start") return b(s, "start", null);
    {
      const { value: M } = He;
      return s < He.value ? b(s, "start", [M, M]) : b(s, "end", [M, M]);
    }
  }
  function z(s) {
    if (s === null) return;
    const [b, M] = s;
    re.value = b, ft(M) <= ft(b) ? ne.value = w(ft(Ce(b, 1))) : ne.value = w(ft(M));
  }
  function se(s) {
    if (!he.value) he.value = true, He.value = s.ts, A(s.ts, s.ts, "done");
    else {
      he.value = false;
      const { value: b } = n;
      n.panel && Array.isArray(b) ? A(b[0], b[1], "done") : X.value && e === "daterange" && (Y.value ? c() : ye());
    }
  }
  function Re(s) {
    if (he.value) {
      if (R(s.ts)) return;
      s.ts >= He.value ? A(He.value, s.ts, "wipPreview") : A(s.ts, He.value, "wipPreview");
    }
  }
  function ye() {
    _.value || (C.doConfirm(), c());
  }
  function c() {
    he.value = false, n.active && C.doClose();
  }
  function y(s) {
    typeof s != "number" && (s = w(s)), n.value === null ? C.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && C.doUpdateValue([s, Math.max(n.value[1], s)], n.panel);
  }
  function k(s) {
    typeof s != "number" && (s = w(s)), n.value === null ? C.doUpdateValue([s, s], n.panel) : Array.isArray(n.value) && C.doUpdateValue([Math.min(n.value[0], s), s], n.panel);
  }
  function A(s, b, M) {
    if (typeof s != "number" && (s = w(s)), M !== "shortcutPreview" && M !== "shortcutDone") {
      let ve, tt;
      if (e === "datetimerange") {
        const { defaultTime: ee } = n;
        typeof ee == "function" ? (ve = Na(s, ee, "start", [s, b]), tt = Na(b, ee, "end", [s, b])) : Array.isArray(ee) ? (ve = jt(ee[0]), tt = jt(ee[1])) : (ve = jt(ee), tt = ve);
      }
      ve && (s = w(xe(s, ve))), tt && (b = w(xe(b, tt)));
    }
    C.doUpdateValue([s, b], n.panel && (M === "done" || M === "shortcutDone"));
  }
  function K(s) {
    return w(e === "datetimerange" ? ka(s) : e === "monthrange" ? ft(s) : Zt(s));
  }
  function _e(s) {
    const b = Ne(s, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (Qe(b)) if (n.value) {
      if (Array.isArray(n.value)) {
        const M = xe(n.value[0], { year: ie(b), month: te(b), date: We(b) });
        y(K(w(M)));
      }
    } else {
      const M = xe(/* @__PURE__ */ new Date(), { year: ie(b), month: te(b), date: We(b) });
      y(K(w(M)));
    }
    else $e.value = s;
  }
  function ue(s) {
    const b = Ne(s, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value);
    if (Qe(b)) {
      if (n.value === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(b), month: te(b), date: We(b) });
        k(K(w(M)));
      } else if (Array.isArray(n.value)) {
        const M = xe(n.value[1], { year: ie(b), month: te(b), date: We(b) });
        k(K(w(M)));
      }
    } else E.value = s;
  }
  function an() {
    const s = Ne($e.value, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: b } = n;
    if (Qe(s)) {
      if (b === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: We(s) });
        y(K(w(M)));
      } else if (Array.isArray(b)) {
        const M = xe(b[0], { year: ie(s), month: te(s), date: We(s) });
        y(K(w(M)));
      }
    } else Vt();
  }
  function rn() {
    const s = Ne(E.value, Te.value, /* @__PURE__ */ new Date(), C.dateFnsOptions.value), { value: b } = n;
    if (Qe(s)) {
      if (b === null) {
        const M = xe(/* @__PURE__ */ new Date(), { year: ie(s), month: te(s), date: We(s) });
        k(K(w(M)));
      } else if (Array.isArray(b)) {
        const M = xe(b[1], { year: ie(s), month: te(s), date: We(s) });
        k(K(w(M)));
      }
    } else Vt();
  }
  function Vt(s) {
    const { value: b } = n;
    if (b === null || !Array.isArray(b)) {
      $e.value = "", E.value = "";
      return;
    }
    s === void 0 && (s = b), $e.value = Q(s[0], Te.value, C.dateFnsOptions.value), E.value = Q(s[1], Te.value, C.dateFnsOptions.value);
  }
  function on(s) {
    s !== null && y(s);
  }
  function ln(s) {
    s !== null && k(s);
  }
  function sn(s) {
    C.cachePendingValue();
    const b = C.getShortcutValue(s);
    Array.isArray(b) && A(b[0], b[1], "shortcutPreview");
  }
  function un(s) {
    const b = C.getShortcutValue(s);
    Array.isArray(b) && (A(b[0], b[1], "shortcutDone"), C.clearPendingValue(), ye());
  }
  function ot(s, b) {
    const M = s === void 0 ? n.value : s;
    if (s === void 0 || b === "start") {
      if (Se.value) {
        const ve = Array.isArray(M) ? te(M[0]) : te(Date.now());
        Se.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (Je.value) {
        const ve = (Array.isArray(M) ? ie(M[0]) : ie(Date.now())) - we.value[0];
        Je.value.scrollTo({ index: ve, debounce: false });
      }
    }
    if (s === void 0 || b === "end") {
      if (Fe.value) {
        const ve = Array.isArray(M) ? te(M[1]) : te(Date.now());
        Fe.value.scrollTo({ debounce: false, index: ve, elSize: Yt });
      }
      if (qe.value) {
        const ve = (Array.isArray(M) ? ie(M[1]) : ie(Date.now())) - we.value[0];
        qe.value.scrollTo({ index: ve, debounce: false });
      }
    }
  }
  function An(s, b) {
    const { value: M } = n, ve = !Array.isArray(M), tt = s.type === "year" && e !== "yearrange" ? ve ? xe(s.ts, { month: te(e === "quarterrange" ? mn(/* @__PURE__ */ new Date()) : /* @__PURE__ */ new Date()) }).valueOf() : xe(s.ts, { month: te(e === "quarterrange" ? mn(M[b === "start" ? 0 : 1]) : M[b === "start" ? 0 : 1]) }).valueOf() : s.ts;
    if (ve) {
      const gn = K(tt), cn = [gn, gn];
      C.doUpdateValue(cn, n.panel), ot(cn, "start"), ot(cn, "end"), C.disableTransitionOneTick();
      return;
    }
    const ee = [M[0], M[1]];
    let dn = false;
    switch (b === "start" ? (ee[0] = K(tt), ee[0] > ee[1] && (ee[1] = ee[0], dn = true)) : (ee[1] = K(tt), ee[0] > ee[1] && (ee[0] = ee[1], dn = true)), C.doUpdateValue(ee, n.panel), e) {
      case "monthrange":
      case "quarterrange":
        C.disableTransitionOneTick(), dn ? (ot(ee, "start"), ot(ee, "end")) : ot(ee, b);
        break;
      case "yearrange":
        C.disableTransitionOneTick(), ot(ee, "start"), ot(ee, "end");
    }
  }
  function $n() {
    var s;
    (s = Be.value) === null || s === void 0 || s.sync();
  }
  function In() {
    var s;
    (s = Ge.value) === null || s === void 0 || s.sync();
  }
  function Vn(s) {
    var b, M;
    return s === "start" ? ((b = Je.value) === null || b === void 0 ? void 0 : b.listElRef) || null : ((M = qe.value) === null || M === void 0 ? void 0 : M.listElRef) || null;
  }
  function Nn(s) {
    var b, M;
    return s === "start" ? ((b = Je.value) === null || b === void 0 ? void 0 : b.itemsElRef) || null : ((M = qe.value) === null || M === void 0 ? void 0 : M.itemsElRef) || null;
  }
  const zn = { startYearVlRef: Je, endYearVlRef: qe, startMonthScrollbarRef: Se, endMonthScrollbarRef: Fe, startYearScrollbarRef: Be, endYearScrollbarRef: Ge };
  return Object.assign(Object.assign(Object.assign(Object.assign({ startDatesElRef: De, endDatesElRef: Ze, handleDateClick: se, handleColItemClick: An, handleDateMouseEnter: Re, handleConfirmClick: ye, startCalendarPrevYear: vt, startCalendarPrevMonth: nn, startCalendarNextYear: Ue, startCalendarNextMonth: pt, endCalendarPrevYear: rt, endCalendarPrevMonth: it, endCalendarNextMonth: It, endCalendarNextYear: Ie, mergedIsDateDisabled: R, changeStartEndTime: A, ranges: H, calendarMonthBeforeYear: tn, startCalendarMonth: Ct, startCalendarYear: St, endCalendarMonth: xt, endCalendarYear: Mt, weekdays: kt, startDateArray: at, endDateArray: Dt, startYearArray: _t, startMonthArray: O, startQuarterArray: Ot, endYearArray: et, endMonthArray: L, endQuarterArray: v, isSelecting: he, handleRangeShortcutMouseenter: sn, handleRangeShortcutClick: un }, C), V), zn), { startDateDisplayString: $e, endDateInput: E, timePickerSize: C.timePickerSize, startTimeValue: mt, endTimeValue: je, datePickerSlots: q, shortcuts: Tt, startCalendarDateTime: re, endCalendarDateTime: ne, justifyColumnsScrollState: ot, handleFocusDetectorFocus: C.handleFocusDetectorFocus, handleStartTimePickerChange: on, handleEndTimePickerChange: ln, handleStartDateInput: _e, handleStartDateInputBlur: an, handleEndDateInput: ue, handleEndDateInputBlur: rn, handleStartYearVlScroll: $n, handleEndYearVlScroll: In, virtualListContainer: Vn, virtualListContent: Nn, onUpdateStartCalendarValue: m, onUpdateEndCalendarValue: S });
}
const zo = Xe({ name: "DateRangePanel", props: Ma, setup(n) {
  return Ta(n, "daterange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, onRender: l, datePickerSlots: u } = this;
  return l == null ? void 0 : l(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((h) => o("div", { key: h, class: `${t}-date-panel-weekdays__day` }, h))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((h, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !h.inCurrentMonth, [`${t}-date-panel-date--current`]: h.isCurrentDate, [`${t}-date-panel-date--selected`]: h.selected, [`${t}-date-panel-date--covered`]: h.inSpan, [`${t}-date-panel-date--start`]: h.startOfSpan, [`${t}-date-panel-date--end`]: h.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(h.ts) }], onClick: () => {
    this.handleDateClick(h);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(h);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), h.dateObject.date, h.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, G(u["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, G(u["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, G(u["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, G(u["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((h) => o("div", { key: h, class: `${t}-date-panel-weekdays__day` }, h))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((h, f) => o("div", { "data-n-date": true, key: f, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !h.inCurrentMonth, [`${t}-date-panel-date--current`]: h.isCurrentDate, [`${t}-date-panel-date--selected`]: h.selected, [`${t}-date-panel-date--covered`]: h.inSpan, [`${t}-date-panel-date--start`]: h.startOfSpan, [`${t}-date-panel-date--end`]: h.endOfSpan, [`${t}-date-panel-date--disabled`]: this.mergedIsDateDisabled(h.ts) }], onClick: () => {
    this.handleDateClick(h);
  }, onMouseenter: () => {
    this.handleDateMouseEnter(h);
  } }, o("div", { class: `${t}-date-panel-date__trigger` }), h.dateObject.date, h.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((h) => {
    const f = i[h];
    return Array.isArray(f) || typeof f == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(f);
    }, onClick: () => {
      this.handleRangeShortcutClick(f);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => h }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? ze(u.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? ze(u.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} });
function za(n, e, a) {
  const t = mr(), r = Bo(n, a.timeZone, a.locale ?? t.locale);
  return "formatToParts" in r ? Ho(r, e) : Eo(r, e);
}
function Ho(n, e) {
  const a = n.formatToParts(e);
  for (let t = a.length - 1; t >= 0; --t) if (a[t].type === "timeZoneName") return a[t].value;
}
function Eo(n, e) {
  const a = n.format(e).replace(/\u200E/g, ""), t = / [\w-+ ]+$/.exec(a);
  return t ? t[0].substr(1) : "";
}
function Bo(n, e, a) {
  return new Intl.DateTimeFormat(a ? [a.code, "en-US"] : void 0, { timeZone: e, timeZoneName: n });
}
function qo(n, e) {
  const a = Qo(e);
  return "formatToParts" in a ? Uo(a, n) : Lo(a, n);
}
const jo = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
function Uo(n, e) {
  try {
    const a = n.formatToParts(e), t = [];
    for (let r = 0; r < a.length; r++) {
      const i = jo[a[r].type];
      i !== void 0 && (t[i] = parseInt(a[r].value, 10));
    }
    return t;
  } catch (a) {
    if (a instanceof RangeError) return [NaN];
    throw a;
  }
}
function Lo(n, e) {
  const a = n.format(e), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [parseInt(t[3], 10), parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[4], 10), parseInt(t[5], 10), parseInt(t[6], 10)];
}
const Ln = {}, Ha = new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Wo = Ha === "06/25/2014, 00:00:00" || Ha === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
function Qo(n) {
  return Ln[n] || (Ln[n] = Wo ? new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: n, year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })), Ln[n];
}
function Tr(n, e, a, t, r, i, l) {
  const u = /* @__PURE__ */ new Date(0);
  return u.setUTCFullYear(n, e, a), u.setUTCHours(t, r, i, l), u;
}
const Ea = 36e5, Xo = 6e4, Wn = { timezoneZ: /^(Z)$/, timezoneHH: /^([+-]\d{2})$/, timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/ };
function _a(n, e, a) {
  if (!n) return 0;
  let t = Wn.timezoneZ.exec(n);
  if (t) return 0;
  let r, i;
  if (t = Wn.timezoneHH.exec(n), t) return r = parseInt(t[1], 10), Ba(r) ? -(r * Ea) : NaN;
  if (t = Wn.timezoneHHMM.exec(n), t) {
    r = parseInt(t[2], 10);
    const l = parseInt(t[3], 10);
    return Ba(r, l) ? (i = Math.abs(r) * Ea + l * Xo, t[1] === "+" ? -i : i) : NaN;
  }
  if (Go(n)) {
    e = new Date(e || Date.now());
    const l = a ? e : Ko(e), u = ua(l, n);
    return -(a ? u : Zo(e, u, n));
  }
  return NaN;
}
function Ko(n) {
  return Tr(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());
}
function ua(n, e) {
  const a = qo(n, e), t = Tr(a[0], a[1] - 1, a[2], a[3] % 24, a[4], a[5], 0).getTime();
  let r = n.getTime();
  const i = r % 1e3;
  return r -= i >= 0 ? i : 1e3 + i, t - r;
}
function Zo(n, e, a) {
  let r = n.getTime() - e;
  const i = ua(new Date(r), a);
  if (e === i) return e;
  r -= i - e;
  const l = ua(new Date(r), a);
  return i === l ? i : Math.max(i, l);
}
function Ba(n, e) {
  return -23 <= n && n <= 23 && (e == null || 0 <= e && e <= 59);
}
const qa = {};
function Go(n) {
  if (qa[n]) return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: n }), qa[n] = true, true;
  } catch {
    return false;
  }
}
const Jo = 60 * 1e3, el = { X: function(n, e, a) {
  const t = Qn(a.timeZone, n);
  if (t === 0) return "Z";
  switch (e) {
    case "X":
      return ja(t);
    case "XXXX":
    case "XX":
      return Bt(t);
    case "XXXXX":
    case "XXX":
    default:
      return Bt(t, ":");
  }
}, x: function(n, e, a) {
  const t = Qn(a.timeZone, n);
  switch (e) {
    case "x":
      return ja(t);
    case "xxxx":
    case "xx":
      return Bt(t);
    case "xxxxx":
    case "xxx":
    default:
      return Bt(t, ":");
  }
}, O: function(n, e, a) {
  const t = Qn(a.timeZone, n);
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + tl(t, ":");
    case "OOOO":
    default:
      return "GMT" + Bt(t, ":");
  }
}, z: function(n, e, a) {
  switch (e) {
    case "z":
    case "zz":
    case "zzz":
      return za("short", n, a);
    case "zzzz":
    default:
      return za("long", n, a);
  }
} };
function Qn(n, e) {
  const a = n ? _a(n, e, true) / Jo : (e == null ? void 0 : e.getTimezoneOffset()) ?? 0;
  if (Number.isNaN(a)) throw new RangeError("Invalid time zone specified: " + n);
  return a;
}
function On(n, e) {
  const a = n < 0 ? "-" : "";
  let t = Math.abs(n).toString();
  for (; t.length < e; ) t = "0" + t;
  return a + t;
}
function Bt(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = On(Math.floor(t / 60), 2), i = On(Math.floor(t % 60), 2);
  return a + r + e + i;
}
function ja(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + On(Math.abs(n) / 60, 2) : Bt(n, e);
}
function tl(n, e = "") {
  const a = n > 0 ? "-" : "+", t = Math.abs(n), r = Math.floor(t / 60), i = t % 60;
  return i === 0 ? a + String(r) : a + String(r) + e + On(i, 2);
}
function Ua(n) {
  const e = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
  return e.setUTCFullYear(n.getFullYear()), +n - +e;
}
const nl = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Xn = 36e5, La = 6e4, al = 2, Ae = { dateTimePattern: /^([0-9W+-]+)(T| )(.*)/, datePattern: /^([0-9W+-]+)(.*)/, YY: /^(\d{2})$/, YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/], YYYY: /^(\d{4})/, YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/], MM: /^-(\d{2})$/, DDD: /^-?(\d{3})$/, MMDD: /^-?(\d{2})-?(\d{2})$/, Www: /^-?W(\d{2})$/, WwwD: /^-?W(\d{2})-?(\d{1})$/, HH: /^(\d{2}([.,]\d*)?)$/, HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/, HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/, timeZone: nl };
function _r(n, e = {}) {
  if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (n === null) return /* @__PURE__ */ new Date(NaN);
  const a = e.additionalDigits == null ? al : Number(e.additionalDigits);
  if (a !== 2 && a !== 1 && a !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]") return new Date(n.getTime());
  if (typeof n == "number" || Object.prototype.toString.call(n) === "[object Number]") return new Date(n);
  if (Object.prototype.toString.call(n) !== "[object String]") return /* @__PURE__ */ new Date(NaN);
  const t = rl(n), { year: r, restDateString: i } = il(t.date, a), l = ol(i, r);
  if (l === null || isNaN(l.getTime())) return /* @__PURE__ */ new Date(NaN);
  if (l) {
    const u = l.getTime();
    let h = 0, f;
    if (t.time && (h = ll(t.time), h === null || isNaN(h))) return /* @__PURE__ */ new Date(NaN);
    if (t.timeZone || e.timeZone) {
      if (f = _a(t.timeZone || e.timeZone, new Date(u + h)), isNaN(f)) return /* @__PURE__ */ new Date(NaN);
    } else f = Ua(new Date(u + h)), f = Ua(new Date(u + h + f));
    return new Date(u + h + f);
  } else return /* @__PURE__ */ new Date(NaN);
}
function rl(n) {
  const e = {};
  let a = Ae.dateTimePattern.exec(n), t;
  if (a ? (e.date = a[1], t = a[3]) : (a = Ae.datePattern.exec(n), a ? (e.date = a[1], t = a[2]) : (e.date = null, t = n)), t) {
    const r = Ae.timeZone.exec(t);
    r ? (e.time = t.replace(r[1], ""), e.timeZone = r[1].trim()) : e.time = t;
  }
  return e;
}
function il(n, e) {
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
function ol(n, e) {
  if (e === null) return null;
  let a, t, r;
  if (!n || !n.length) return a = /* @__PURE__ */ new Date(0), a.setUTCFullYear(e), a;
  let i = Ae.MM.exec(n);
  if (i) return a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1, Qa(e, t) ? (a.setUTCFullYear(e, t), a) : /* @__PURE__ */ new Date(NaN);
  if (i = Ae.DDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0);
    const l = parseInt(i[1], 10);
    return dl(e, l) ? (a.setUTCFullYear(e, 0, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ae.MMDD.exec(n), i) {
    a = /* @__PURE__ */ new Date(0), t = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10);
    return Qa(e, t, l) ? (a.setUTCFullYear(e, t, l), a) : /* @__PURE__ */ new Date(NaN);
  }
  if (i = Ae.Www.exec(n), i) return r = parseInt(i[1], 10) - 1, Xa(r) ? Wa(e, r) : /* @__PURE__ */ new Date(NaN);
  if (i = Ae.WwwD.exec(n), i) {
    r = parseInt(i[1], 10) - 1;
    const l = parseInt(i[2], 10) - 1;
    return Xa(r, l) ? Wa(e, r, l) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function ll(n) {
  let e, a, t = Ae.HH.exec(n);
  if (t) return e = parseFloat(t[1].replace(",", ".")), Kn(e) ? e % 24 * Xn : NaN;
  if (t = Ae.HHMM.exec(n), t) return e = parseInt(t[1], 10), a = parseFloat(t[2].replace(",", ".")), Kn(e, a) ? e % 24 * Xn + a * La : NaN;
  if (t = Ae.HHMMSS.exec(n), t) {
    e = parseInt(t[1], 10), a = parseInt(t[2], 10);
    const r = parseFloat(t[3].replace(",", "."));
    return Kn(e, a, r) ? e % 24 * Xn + a * La + r * 1e3 : NaN;
  }
  return null;
}
function Wa(n, e, a) {
  e = e || 0, a = a || 0;
  const t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(n, 0, 4);
  const r = t.getUTCDay() || 7, i = e * 7 + a + 1 - r;
  return t.setUTCDate(t.getUTCDate() + i), t;
}
const sl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ul = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Or(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
function Qa(n, e, a) {
  if (e < 0 || e > 11) return false;
  if (a != null) {
    if (a < 1) return false;
    const t = Or(n);
    if (t && a > ul[e] || !t && a > sl[e]) return false;
  }
  return true;
}
function dl(n, e) {
  if (e < 1) return false;
  const a = Or(n);
  return !(a && e > 366 || !a && e > 365);
}
function Xa(n, e) {
  return !(n < 0 || n > 52 || e != null && (e < 0 || e > 6));
}
function Kn(n, e, a) {
  return !(n < 0 || n >= 25 || e != null && (e < 0 || e >= 60) || a != null && (a < 0 || a >= 60));
}
const cl = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
function fl(n, e, a = {}) {
  e = String(e);
  const t = e.match(cl);
  if (t) {
    const r = _r(a.originalDate || n, a);
    e = t.reduce(function(i, l) {
      if (l[0] === "'") return i;
      const u = i.indexOf(l), h = i[u - 1] === "'", f = i.replace(l, "'" + el[l[0]](r, l, a) + "'");
      return h ? f.substring(0, u - 1) + f.substring(u + 1) : f;
    }, e);
  }
  return Q(n, e, a);
}
function hl(n, e, a) {
  n = _r(n, a);
  const t = _a(e, n, true), r = new Date(n.getTime() - t), i = /* @__PURE__ */ new Date(0);
  return i.setFullYear(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), i.setHours(r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds()), i;
}
function ml(n, e, a, t) {
  return t = { ...t, timeZone: e, originalDate: n }, fl(hl(n, e, { timeZone: t.timeZone }), a, t);
}
const Pr = Ka("n-time-picker"), bn = Xe({ name: "TimePickerPanelCol", props: { clsPrefix: { type: String, required: true }, data: { type: Array, required: true }, activeValue: { type: [Number, String], default: null }, onItemClick: Function }, render() {
  const { activeValue: n, onItemClick: e, clsPrefix: a } = this;
  return this.data.map((t) => {
    const { label: r, disabled: i, value: l } = t, u = n === l;
    return o("div", { key: r, "data-active": u ? "" : null, class: [`${a}-time-picker-col__item`, u && `${a}-time-picker-col__item--active`, i && `${a}-time-picker-col__item--disabled`], onClick: e && !i ? () => {
      e(l);
    } : void 0 }, r);
  });
} }), fn = { amHours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], pmHours: ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], hours: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], minutes: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], seconds: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], period: ["AM", "PM"] };
function Zn(n) {
  return `00${n}`.slice(-2);
}
function hn(n, e, a) {
  return Array.isArray(e) ? (a === "am" ? e.filter((t) => t < 12) : a === "pm" ? e.filter((t) => t >= 12).map((t) => t === 12 ? 12 : t - 12) : e).map((t) => Zn(t)) : typeof e == "number" ? a === "am" ? n.filter((t) => {
    const r = Number(t);
    return r < 12 && r % e === 0;
  }) : a === "pm" ? n.filter((t) => {
    const r = Number(t);
    return r >= 12 && r % e === 0;
  }).map((t) => {
    const r = Number(t);
    return Zn(r === 12 ? 12 : r - 12);
  }) : n.filter((t) => Number(t) % e === 0) : a === "am" ? n.filter((t) => Number(t) < 12) : a === "pm" ? n.map((t) => Number(t)).filter((t) => Number(t) >= 12).map((t) => Zn(t === 12 ? 12 : t - 12)) : n;
}
function wn(n, e, a) {
  return a ? typeof a == "number" ? n % a === 0 : a.includes(n) : true;
}
function vl(n, e, a) {
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
  return r === void 0 ? (i || zr("time-picker", "Please set 'hours' or 'minutes' or 'seconds' props"), i) : i === void 0 || i - n > n - r ? r : i;
}
function pl(n) {
  return yt(n) < 12 ? "am" : "pm";
}
const gl = { actions: { type: Array, default: () => ["now", "confirm"] }, showHour: { type: Boolean, default: true }, showMinute: { type: Boolean, default: true }, showSecond: { type: Boolean, default: true }, showPeriod: { type: Boolean, default: true }, isHourInvalid: Boolean, isMinuteInvalid: Boolean, isSecondInvalid: Boolean, isAmPmInvalid: Boolean, isValueInvalid: Boolean, hourValue: { type: Number, default: null }, minuteValue: { type: Number, default: null }, secondValue: { type: Number, default: null }, amPmValue: { type: String, default: null }, isHourDisabled: Function, isMinuteDisabled: Function, isSecondDisabled: Function, onHourClick: { type: Function, required: true }, onMinuteClick: { type: Function, required: true }, onSecondClick: { type: Function, required: true }, onAmPmClick: { type: Function, required: true }, onNowClick: Function, clearText: String, nowText: String, confirmText: String, transitionDisabled: Boolean, onClearClick: Function, onConfirmClick: Function, onFocusin: Function, onFocusout: Function, onFocusDetectorFocus: Function, onKeydown: Function, hours: [Number, Array], minutes: [Number, Array], seconds: [Number, Array], use12Hours: Boolean }, yl = Xe({ name: "TimePickerPanel", props: gl, setup(n) {
  const { mergedThemeRef: e, mergedClsPrefixRef: a } = Pn(Pr), t = g(() => {
    const { isHourDisabled: u, hours: h, use12Hours: f, amPmValue: d } = n;
    if (f) {
      const p = d ?? pl(Date.now());
      return hn(fn.hours, h, p).map((D) => {
        const P = Number(D), $ = p === "pm" && P !== 12 ? P + 12 : P;
        return { label: D, value: $, disabled: u ? u($) : false };
      });
    } else return hn(fn.hours, h).map((p) => ({ label: p, value: Number(p), disabled: u ? u(Number(p)) : false }));
  }), r = g(() => {
    const { isMinuteDisabled: u, minutes: h } = n;
    return hn(fn.minutes, h).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.hourValue) : false }));
  }), i = g(() => {
    const { isSecondDisabled: u, seconds: h } = n;
    return hn(fn.seconds, h).map((f) => ({ label: f, value: Number(f), disabled: u ? u(Number(f), n.minuteValue, n.hourValue) : false }));
  }), l = g(() => {
    const { isHourDisabled: u } = n;
    let h = true, f = true;
    for (let d = 0; d < 12; ++d) if (!(u == null ? void 0 : u(d))) {
      h = false;
      break;
    }
    for (let d = 12; d < 24; ++d) if (!(u == null ? void 0 : u(d))) {
      f = false;
      break;
    }
    return [{ label: "AM", value: "am", disabled: h }, { label: "PM", value: "pm", disabled: f }];
  });
  return { mergedTheme: e, mergedClsPrefix: a, hours: t, minutes: r, seconds: i, amPm: l, hourScrollRef: T(null), minuteScrollRef: T(null), secondScrollRef: T(null), amPmScrollRef: T(null) };
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i } = this;
  return o("div", { tabindex: 0, class: `${r}-time-picker-panel`, onFocusin: this.onFocusin, onFocusout: this.onFocusout, onKeydown: this.onKeydown }, o("div", { class: `${r}-time-picker-cols` }, this.showHour ? o("div", { class: [`${r}-time-picker-col`, this.isHourInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "hourScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(bn, { clsPrefix: r, data: this.hours, activeValue: this.hourValue, onItemClick: this.onHourClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showMinute ? o("div", { class: [`${r}-time-picker-col`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`, this.isMinuteInvalid && `${r}-time-picker-col--invalid`] }, o(ut, { ref: "minuteScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(bn, { clsPrefix: r, data: this.minutes, activeValue: this.minuteValue, onItemClick: this.onMinuteClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.showSecond ? o("div", { class: [`${r}-time-picker-col`, this.isSecondInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "secondScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(bn, { clsPrefix: r, data: this.seconds, activeValue: this.secondValue, onItemClick: this.onSecondClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null, this.use12Hours ? o("div", { class: [`${r}-time-picker-col`, this.isAmPmInvalid && `${r}-time-picker-col--invalid`, this.transitionDisabled && `${r}-time-picker-col--transition-disabled`] }, o(ut, { ref: "amPmScrollRef", theme: i.peers.Scrollbar, themeOverrides: i.peerOverrides.Scrollbar }, { default: () => [o(bn, { clsPrefix: r, data: this.amPm, activeValue: this.amPmValue, onItemClick: this.onAmPmClick }), o("div", { class: `${r}-time-picker-col__padding` })] })) : null), !((n = this.actions) === null || n === void 0) && n.length ? o("div", { class: `${r}-time-picker-actions` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.onClearClick }, { default: () => this.clearText }) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? o(Pe, { size: "tiny", theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, onClick: this.onNowClick }, { default: () => this.nowText }) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? o(Pe, { size: "tiny", type: "primary", class: `${r}-time-picker-actions__confirm`, theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, disabled: this.isValueInvalid, onClick: this.onConfirmClick }, { default: () => this.confirmText }) : null) : null, o(At, { onFocus: this.onFocusDetectorFocus }));
} }), bl = I([j("time-picker", `
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
 `, [Ja(), j("time-picker-actions", `
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
 `, [B("transition-disabled", [me("item", "transition: none;", [I("&::before", "transition: none;")])]), me("padding", `
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
 `), Et("disabled", [I("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `)]), B("active", `
 color: var(--n-item-text-color-active);
 `, [I("&::before", `
 background-color: var(--n-item-color-hover);
 `)]), B("disabled", `
 opacity: var(--n-item-opacity-disabled);
 cursor: not-allowed;
 `)]), B("invalid", [me("item", [B("active", `
 text-decoration: line-through;
 text-decoration-color: var(--n-item-text-color-active);
 `)])])])])]);
function Gn(n, e) {
  return n === void 0 ? true : Array.isArray(n) ? n.every((a) => a >= 0 && a <= e) : n >= 0 && n <= e;
}
const wl = Object.assign(Object.assign({}, Fn.props), { to: Ut.propTo, bordered: { type: Boolean, default: void 0 }, actions: Array, defaultValue: { type: Number, default: null }, defaultFormattedValue: String, placeholder: String, placement: { type: String, default: "bottom-start" }, value: Number, format: { type: String, default: "HH:mm:ss" }, valueFormat: String, formattedValue: String, isHourDisabled: Function, size: String, isMinuteDisabled: Function, isSecondDisabled: Function, inputReadonly: Boolean, clearable: Boolean, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:formattedValue": [Function, Array], onBlur: [Function, Array], onConfirm: [Function, Array], onClear: Function, onFocus: [Function, Array], timeZone: String, showIcon: { type: Boolean, default: true }, disabled: { type: Boolean, default: void 0 }, show: { type: Boolean, default: void 0 }, hours: { type: [Number, Array], validator: (n) => Gn(n, 23) }, minutes: { type: [Number, Array], validator: (n) => Gn(n, 59) }, seconds: { type: [Number, Array], validator: (n) => Gn(n, 59) }, use12Hours: Boolean, stateful: { type: Boolean, default: true }, onChange: [Function, Array] }), da = Xe({ name: "TimePicker", props: wl, setup(n) {
  const { mergedBorderedRef: e, mergedClsPrefixRef: a, namespaceRef: t, inlineThemeDisabled: r, mergedComponentPropsRef: i } = er(n), { localeRef: l, dateLocaleRef: u } = Rn("TimePicker"), h = tr(n, { mergedSize: (c) => {
    var y, k;
    const { size: A } = n;
    if (A) return A;
    const { mergedSize: K } = c || {};
    if (K == null ? void 0 : K.value) return K.value;
    const _e = (k = (y = i == null ? void 0 : i.value) === null || y === void 0 ? void 0 : y.TimePicker) === null || k === void 0 ? void 0 : k.size;
    return _e || "medium";
  } }), { mergedSizeRef: f, mergedDisabledRef: d, mergedStatusRef: p } = h, D = Fn("TimePicker", "-time-picker", bl, Hr, n, a), P = ir(), $ = T(null), J = T(null), x = g(() => ({ locale: u.value.locale }));
  function _(c) {
    return c === null ? null : Ne(c, n.valueFormat || n.format, /* @__PURE__ */ new Date(), x.value).getTime();
  }
  const { defaultValue: N, defaultFormattedValue: H } = n, X = T(H !== void 0 ? _(H) : N), Y = g(() => {
    const { formattedValue: c } = n;
    if (c !== void 0) return _(c);
    const { value: y } = n;
    return y !== void 0 ? y : X.value;
  }), Z = g(() => {
    const { timeZone: c } = n;
    return c ? (y, k, A) => ml(y, c, k, A) : (y, k, A) => Q(y, k, A);
  }), q = T("");
  dt(() => n.timeZone, () => {
    const c = Y.value;
    q.value = c === null ? "" : Z.value(c, n.format, x.value);
  }, { immediate: true });
  const be = T(false), Ke = Le(n, "show"), ae = ea(Ke, be), we = T(Y.value), V = T(false), C = g(() => l.value.clear), De = g(() => l.value.now), Ze = g(() => n.placeholder !== void 0 ? n.placeholder : l.value.placeholder), Be = g(() => l.value.negativeText), Ge = g(() => l.value.positiveText), Je = g(() => /H|h|K|k/.test(n.format)), qe = g(() => n.format.includes("m")), Se = g(() => n.format.includes("s")), Fe = g(() => {
    const { value: c } = Y;
    return c === null ? null : Number(Z.value(c, "HH", x.value));
  }), ge = g(() => {
    const { value: c } = Y;
    return c === null ? null : Number(Z.value(c, "mm", x.value));
  }), ct = g(() => {
    const { value: c } = Y;
    return c === null ? null : Number(Z.value(c, "ss", x.value));
  }), re = g(() => {
    const { isHourDisabled: c } = n;
    return Fe.value === null ? false : wn(Fe.value, "hours", n.hours) ? c ? c(Fe.value) : false : true;
  }), ne = g(() => {
    const { value: c } = ge, { value: y } = Fe;
    if (c === null || y === null) return false;
    if (!wn(c, "minutes", n.minutes)) return true;
    const { isMinuteDisabled: k } = n;
    return k ? k(c, y) : false;
  }), Me = g(() => {
    const { value: c } = ge, { value: y } = Fe, { value: k } = ct;
    if (k === null || c === null || y === null) return false;
    if (!wn(k, "seconds", n.seconds)) return true;
    const { isSecondDisabled: A } = n;
    return A ? A(k, c, y) : false;
  }), he = g(() => re.value || ne.value || Me.value), He = g(() => n.format.length + 4), Te = g(() => {
    const { value: c } = Y;
    return c === null ? null : yt(c) < 12 ? "am" : "pm";
  });
  function wt(c, y) {
    const { onUpdateFormattedValue: k, "onUpdate:formattedValue": A } = n;
    k && pe(k, c, y), A && pe(A, c, y);
  }
  function $e(c) {
    return c === null ? null : Z.value(c, n.valueFormat || n.format);
  }
  function E(c) {
    const { onUpdateValue: y, "onUpdate:value": k, onChange: A } = n, { nTriggerFormChange: K, nTriggerFormInput: _e } = h, ue = $e(c);
    y && pe(y, c, ue), k && pe(k, c, ue), A && pe(A, c, ue), wt(ue, c), X.value = c, K(), _e();
  }
  function ht(c) {
    const { onFocus: y } = n, { nTriggerFormFocus: k } = h;
    y && pe(y, c), k();
  }
  function at(c) {
    const { onBlur: y } = n, { nTriggerFormBlur: k } = h;
    y && pe(y, c), k();
  }
  function Dt() {
    const { onConfirm: c } = n;
    c && pe(c, Y.value, $e(Y.value));
  }
  function kt(c) {
    var y;
    c.stopPropagation(), E(null), v(null), (y = n.onClear) === null || y === void 0 || y.call(n);
  }
  function Ct() {
    Ie({ returnFocus: true });
  }
  function xt() {
    E(null), v(null), Ie({ returnFocus: true });
  }
  function St(c) {
    c.key === "Escape" && ae.value && xn(c);
  }
  function Mt(c) {
    var y;
    switch (c.key) {
      case "Escape":
        ae.value && (xn(c), Ie({ returnFocus: true }));
        break;
      case "Tab":
        P.shift && c.target === ((y = J.value) === null || y === void 0 ? void 0 : y.$el) && (c.preventDefault(), Ie({ returnFocus: true }));
        break;
    }
  }
  function mt() {
    V.value = true, Dn(() => {
      V.value = false;
    });
  }
  function je(c) {
    d.value || or(c, "clear") || ae.value || pt();
  }
  function Tt(c) {
    typeof c != "string" && (Y.value === null ? E(w(Pt(So(/* @__PURE__ */ new Date()), c))) : E(w(Pt(Y.value, c))));
  }
  function _t(c) {
    typeof c != "string" && (Y.value === null ? E(w(qn(Mo(/* @__PURE__ */ new Date()), c))) : E(w(qn(Y.value, c))));
  }
  function et(c) {
    typeof c != "string" && (Y.value === null ? E(w(jn(ka(/* @__PURE__ */ new Date()), c))) : E(w(jn(Y.value, c))));
  }
  function Ot(c) {
    const { value: y } = Y;
    if (y === null) {
      const k = /* @__PURE__ */ new Date(), A = yt(k);
      c === "pm" && A < 12 ? E(w(Pt(k, A + 12))) : c === "am" && A >= 12 && E(w(Pt(k, A - 12))), E(w(k));
    } else {
      const k = yt(y);
      c === "pm" && k < 12 ? E(w(Pt(y, k + 12))) : c === "am" && k >= 12 && E(w(Pt(y, k - 12)));
    }
  }
  function v(c) {
    c === void 0 && (c = Y.value), c === null ? q.value = "" : q.value = Z.value(c, n.format, x.value);
  }
  function O(c) {
    vt(c) || ht(c);
  }
  function L(c) {
    var y;
    if (!vt(c)) if (ae.value) {
      const k = (y = J.value) === null || y === void 0 ? void 0 : y.$el;
      (k == null ? void 0 : k.contains(c.relatedTarget)) || (v(), at(c), Ie({ returnFocus: false }));
    } else v(), at(c);
  }
  function tn() {
    d.value || ae.value || pt();
  }
  function $t() {
    d.value || (v(), Ie({ returnFocus: false }));
  }
  function ke() {
    if (!J.value) return;
    const { hourScrollRef: c, minuteScrollRef: y, secondScrollRef: k, amPmScrollRef: A } = J.value;
    [c, y, k, A].forEach((K) => {
      var _e;
      if (!K) return;
      const ue = (_e = K.contentRef) === null || _e === void 0 ? void 0 : _e.querySelector("[data-active]");
      ue && K.scrollTo({ top: ue.offsetTop });
    });
  }
  function Ue(c) {
    be.value = c;
    const { onUpdateShow: y, "onUpdate:show": k } = n;
    y && pe(y, c), k && pe(k, c);
  }
  function vt(c) {
    var y, k, A;
    return !!(!((k = (y = $.value) === null || y === void 0 ? void 0 : y.wrapperElRef) === null || k === void 0) && k.contains(c.relatedTarget) || !((A = J.value) === null || A === void 0) && A.$el.contains(c.relatedTarget));
  }
  function pt() {
    we.value = Y.value, Ue(true), Dn(ke);
  }
  function nn(c) {
    var y, k;
    ae.value && !(!((k = (y = $.value) === null || y === void 0 ? void 0 : y.wrapperElRef) === null || k === void 0) && k.contains(va(c))) && Ie({ returnFocus: false });
  }
  function Ie({ returnFocus: c }) {
    var y;
    ae.value && (Ue(false), c && ((y = $.value) === null || y === void 0 || y.focus()));
  }
  function rt(c) {
    if (c === "") {
      E(null);
      return;
    }
    const y = Ne(c, n.format, /* @__PURE__ */ new Date(), x.value);
    if (q.value = c, Qe(y)) {
      const { value: k } = Y;
      if (k !== null) {
        const A = xe(k, { hours: yt(y), minutes: Mn(y), seconds: Tn(y), milliseconds: Ti(y) });
        E(w(A));
      } else E(w(y));
    }
  }
  function It() {
    E(we.value), Ue(false);
  }
  function it() {
    const c = /* @__PURE__ */ new Date(), y = { hours: yt, minutes: Mn, seconds: Tn }, [k, A, K] = ["hours", "minutes", "seconds"].map((ue) => !n[ue] || wn(y[ue](c), ue, n[ue]) ? y[ue](c) : vl(y[ue](c), ue, n[ue])), _e = jn(qn(Pt(Y.value ? Y.value : w(c), k), A), K);
    E(w(_e));
  }
  function m() {
    v(), Dt(), Ie({ returnFocus: true });
  }
  function S(c) {
    vt(c) || (v(), at(c), Ie({ returnFocus: false }));
  }
  dt(Y, (c) => {
    v(c), mt(), Dn(ke);
  }), dt(ae, () => {
    he.value && E(we.value);
  }), ar(Pr, { mergedThemeRef: D, mergedClsPrefixRef: a });
  const R = { focus: () => {
    var c;
    (c = $.value) === null || c === void 0 || c.focus();
  }, blur: () => {
    var c;
    (c = $.value) === null || c === void 0 || c.blur();
  } }, z = g(() => {
    const { common: { cubicBezierEaseInOut: c }, self: { iconColor: y, iconColorDisabled: k } } = D.value;
    return { "--n-icon-color-override": y, "--n-icon-color-disabled-override": k, "--n-bezier": c };
  }), se = r ? Cn("time-picker-trigger", void 0, z, n) : void 0, Re = g(() => {
    const { self: { panelColor: c, itemTextColor: y, itemTextColorActive: k, itemColorHover: A, panelDividerColor: K, panelBoxShadow: _e, itemOpacityDisabled: ue, borderRadius: an, itemFontSize: rn, itemWidth: Vt, itemHeight: on, panelActionPadding: ln, itemBorderRadius: sn }, common: { cubicBezierEaseInOut: un } } = D.value;
    return { "--n-bezier": un, "--n-border-radius": an, "--n-item-color-hover": A, "--n-item-font-size": rn, "--n-item-height": on, "--n-item-opacity-disabled": ue, "--n-item-text-color": y, "--n-item-text-color-active": k, "--n-item-width": Vt, "--n-panel-action-padding": ln, "--n-panel-box-shadow": _e, "--n-panel-color": c, "--n-panel-divider-color": K, "--n-item-border-radius": sn };
  }), ye = r ? Cn("time-picker", void 0, Re, n) : void 0;
  return { focus: R.focus, blur: R.blur, mergedStatus: p, mergedBordered: e, mergedClsPrefix: a, namespace: t, uncontrolledValue: X, mergedValue: Y, isMounted: nr(), inputInstRef: $, panelInstRef: J, adjustedTo: Ut(n), mergedShow: ae, localizedClear: C, localizedNow: De, localizedPlaceholder: Ze, localizedNegativeText: Be, localizedPositiveText: Ge, hourInFormat: Je, minuteInFormat: qe, secondInFormat: Se, mergedAttrSize: He, displayTimeString: q, mergedSize: f, mergedDisabled: d, isValueInvalid: he, isHourInvalid: re, isMinuteInvalid: ne, isSecondInvalid: Me, transitionDisabled: V, hourValue: Fe, minuteValue: ge, secondValue: ct, amPmValue: Te, handleInputKeydown: St, handleTimeInputFocus: O, handleTimeInputBlur: L, handleNowClick: it, handleConfirmClick: m, handleTimeInputUpdateValue: rt, handleMenuFocusOut: S, handleCancelClick: It, handleClickOutside: nn, handleTimeInputActivate: tn, handleTimeInputDeactivate: $t, handleHourClick: Tt, handleMinuteClick: _t, handleSecondClick: et, handleAmPmClick: Ot, handleTimeInputClear: kt, handleFocusDetectorFocus: Ct, handleMenuKeydown: Mt, handleTriggerClick: je, mergedTheme: D, triggerCssVars: r ? void 0 : z, triggerThemeClass: se == null ? void 0 : se.themeClass, triggerOnRender: se == null ? void 0 : se.onRender, cssVars: r ? void 0 : Re, themeClass: ye == null ? void 0 : ye.themeClass, onRender: ye == null ? void 0 : ye.onRender, clearSelectedValue: xt };
}, render() {
  const { mergedClsPrefix: n, $slots: e, triggerOnRender: a } = this;
  return a == null ? void 0 : a(), o("div", { class: [`${n}-time-picker`, this.triggerThemeClass], style: this.triggerCssVars }, o(pa, null, { default: () => [o(ga, null, { default: () => o(Rt, { ref: "inputInstRef", status: this.mergedStatus, value: this.displayTimeString, bordered: this.mergedBordered, passivelyActivated: true, attrSize: this.mergedAttrSize, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, stateful: this.stateful, size: this.mergedSize, placeholder: this.localizedPlaceholder, clearable: this.clearable, disabled: this.mergedDisabled, textDecoration: this.isValueInvalid ? "line-through" : void 0, onFocus: this.handleTimeInputFocus, onBlur: this.handleTimeInputBlur, onActivate: this.handleTimeInputActivate, onDeactivate: this.handleTimeInputDeactivate, onUpdateValue: this.handleTimeInputUpdateValue, onClear: this.handleTimeInputClear, internalDeactivateOnEnter: true, internalForceFocus: this.mergedShow, readonly: this.inputReadonly || this.mergedDisabled, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown }, this.showIcon ? { [this.clearable ? "clear-icon-placeholder" : "suffix"]: () => o(kn, { clsPrefix: n, class: `${n}-time-picker-icon` }, { default: () => e.icon ? e.icon() : o(ai, null) }) } : null) }), o(ya, { teleportDisabled: this.adjustedTo === Ut.tdkey, show: this.mergedShow, to: this.adjustedTo, containerClass: this.namespace, placement: this.placement }, { default: () => o(fa, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => {
    var t;
    return this.mergedShow ? ((t = this.onRender) === null || t === void 0 || t.call(this), ha(o(yl, { ref: "panelInstRef", actions: this.actions, class: this.themeClass, style: this.cssVars, seconds: this.seconds, minutes: this.minutes, hours: this.hours, transitionDisabled: this.transitionDisabled, hourValue: this.hourValue, showHour: this.hourInFormat, isHourInvalid: this.isHourInvalid, isHourDisabled: this.isHourDisabled, minuteValue: this.minuteValue, showMinute: this.minuteInFormat, isMinuteInvalid: this.isMinuteInvalid, isMinuteDisabled: this.isMinuteDisabled, secondValue: this.secondValue, amPmValue: this.amPmValue, showSecond: this.secondInFormat, isSecondInvalid: this.isSecondInvalid, isSecondDisabled: this.isSecondDisabled, isValueInvalid: this.isValueInvalid, clearText: this.localizedClear, nowText: this.localizedNow, confirmText: this.localizedPositiveText, use12Hours: this.use12Hours, onFocusout: this.handleMenuFocusOut, onKeydown: this.handleMenuKeydown, onHourClick: this.handleHourClick, onMinuteClick: this.handleMinuteClick, onSecondClick: this.handleSecondClick, onAmPmClick: this.handleAmPmClick, onNowClick: this.handleNowClick, onConfirmClick: this.handleConfirmClick, onClearClick: this.clearSelectedValue, onFocusDetectorFocus: this.handleFocusDetectorFocus }), [[ma, this.handleClickOutside, void 0, { capture: true }]])) : null;
  } }) })] }));
} }), Dl = Xe({ name: "DateTimePanel", props: xa, setup(n) {
  return Sa(n, "datetime");
}, render() {
  var n, e, a, t;
  const { mergedClsPrefix: r, mergedTheme: i, shortcuts: l, timePickerProps: u, datePickerSlots: h, onRender: f } = this;
  return f == null ? void 0 : f(), o("div", { ref: "selfRef", tabindex: 0, class: [`${r}-date-panel`, `${r}-date-panel--datetime`, !this.panel && `${r}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${r}-date-panel-header` }, o(Rt, { value: this.dateInputValue, theme: i.peers.Input, themeOverrides: i.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${r}-date-panel-date-input`, textDecoration: this.isDateInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleDateInputBlur, onUpdateValue: this.handleDateInput }), o(da, Object.assign({ size: this.timePickerSize, placeholder: this.locale.selectTime, format: this.timePickerFormat }, Array.isArray(u) ? void 0 : u, { showIcon: false, to: false, theme: i.peers.TimePicker, themeOverrides: i.peerOverrides.TimePicker, value: Array.isArray(this.value) ? null : this.value, isHourDisabled: this.isHourDisabled, isMinuteDisabled: this.isMinuteDisabled, isSecondDisabled: this.isSecondDisabled, onUpdateValue: this.handleTimePickerChange, stateful: false }))), o("div", { class: `${r}-date-panel-calendar` }, o("div", { class: `${r}-date-panel-month` }, o("div", { class: `${r}-date-panel-month__fast-prev`, onClick: this.prevYear }, G(h["prev-year"], () => [o(Lt, null)])), o("div", { class: `${r}-date-panel-month__prev`, onClick: this.prevMonth }, G(h["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: r, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }), o("div", { class: `${r}-date-panel-month__next`, onClick: this.nextMonth }, G(h["next-month"], () => [o(Qt, null)])), o("div", { class: `${r}-date-panel-month__fast-next`, onClick: this.nextYear }, G(h["next-year"], () => [o(Xt, null)]))), o("div", { class: `${r}-date-panel-weekdays` }, this.weekdays.map((d) => o("div", { key: d, class: `${r}-date-panel-weekdays__day` }, d))), o("div", { class: `${r}-date-panel-dates` }, this.dateArray.map((d, p) => o("div", { "data-n-date": true, key: p, class: [`${r}-date-panel-date`, { [`${r}-date-panel-date--current`]: d.isCurrentDate, [`${r}-date-panel-date--selected`]: d.selected, [`${r}-date-panel-date--excluded`]: !d.inCurrentMonth, [`${r}-date-panel-date--disabled`]: this.mergedIsDateDisabled(d.ts, { type: "date", year: d.dateObject.year, month: d.dateObject.month, date: d.dateObject.date }) }], onClick: () => {
    this.handleDateClick(d);
  } }, o("div", { class: `${r}-date-panel-date__trigger` }), d.dateObject.date, d.isCurrentDate ? o("div", { class: `${r}-date-panel-date__sup` }) : null)))), this.datePickerSlots.footer ? o("div", { class: `${r}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || l ? o("div", { class: `${r}-date-panel-actions` }, o("div", { class: `${r}-date-panel-actions__prefix` }, l && Object.keys(l).map((d) => {
    const p = l[d];
    return Array.isArray(p) ? null : o(bt, { size: "tiny", onMouseenter: () => {
      this.handleSingleShortcutMouseenter(p);
    }, onClick: () => {
      this.handleSingleShortcutClick(p);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => d });
  })), o("div", { class: `${r}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? ze(this.datePickerSlots.clear, { onClear: this.clearSelectedDateTime, text: this.locale.clear }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.clearSelectedDateTime }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("now") ? ze(h.now, { onNow: this.handleNowClick, text: this.locale.now }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })]) : null, !((t = this.actions) === null || t === void 0) && t.includes("confirm") ? ze(h.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isDateInvalid, text: this.locale.confirm }, () => [o(Pe, { theme: i.peers.Button, themeOverrides: i.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), kl = Xe({ name: "DateTimeRangePanel", props: Ma, setup(n) {
  return Ta(n, "datetimerange");
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, timePickerProps: l, onRender: u, datePickerSlots: h } = this;
  return u == null ? void 0 : u(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--datetimerange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { class: `${t}-date-panel-header` }, o(Rt, { value: this.startDateDisplayString, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, size: this.timePickerSize, stateful: false, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isStartValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleStartDateInputBlur, onUpdateValue: this.handleStartDateInput }), o(da, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[0] : l, { value: this.startTimeValue, to: false, showIcon: false, disabled: this.isSelecting, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, stateful: false, isHourDisabled: this.isStartHourDisabled, isMinuteDisabled: this.isStartMinuteDisabled, isSecondDisabled: this.isStartSecondDisabled, onUpdateValue: this.handleStartTimePickerChange })), o(Rt, { value: this.endDateInput, theme: r.peers.Input, themeOverrides: r.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${t}-date-panel-date-input`, textDecoration: this.isEndValueInvalid ? "line-through" : "", placeholder: this.locale.selectDate, onBlur: this.handleEndDateInputBlur, onUpdateValue: this.handleEndDateInput }), o(da, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, Array.isArray(l) ? l[1] : l, { disabled: this.isSelecting, showIcon: false, theme: r.peers.TimePicker, themeOverrides: r.peerOverrides.TimePicker, to: false, stateful: false, value: this.endTimeValue, isHourDisabled: this.isEndHourDisabled, isMinuteDisabled: this.isEndMinuteDisabled, isSecondDisabled: this.isEndSecondDisabled, onUpdateValue: this.handleEndTimePickerChange }))), o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, G(h["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, G(h["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: t, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, G(h["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, G(h["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.startDateArray.map((f, d) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: d, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month` }, o("div", { class: `${t}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, G(h["prev-year"], () => [o(Lt, null)])), o("div", { class: `${t}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, G(h["prev-month"], () => [o(Wt, null)])), o(Gt, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: t, monthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }), o("div", { class: `${t}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, G(h["next-month"], () => [o(Qt, null)])), o("div", { class: `${t}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, G(h["next-year"], () => [o(Xt, null)]))), o("div", { class: `${t}-date-panel-weekdays` }, this.weekdays.map((f) => o("div", { key: f, class: `${t}-date-panel-weekdays__day` }, f))), o("div", { class: `${t}-date-panel__divider` }), o("div", { class: `${t}-date-panel-dates` }, this.endDateArray.map((f, d) => {
    const p = this.mergedIsDateDisabled(f.ts);
    return o("div", { "data-n-date": true, key: d, class: [`${t}-date-panel-date`, { [`${t}-date-panel-date--excluded`]: !f.inCurrentMonth, [`${t}-date-panel-date--current`]: f.isCurrentDate, [`${t}-date-panel-date--selected`]: f.selected, [`${t}-date-panel-date--covered`]: f.inSpan, [`${t}-date-panel-date--start`]: f.startOfSpan, [`${t}-date-panel-date--end`]: f.endOfSpan, [`${t}-date-panel-date--disabled`]: p }], onClick: p ? void 0 : () => {
      this.handleDateClick(f);
    }, onMouseenter: p ? void 0 : () => {
      this.handleDateMouseEnter(f);
    } }, o("div", { class: `${t}-date-panel-date__trigger` }), f.dateObject.date, f.isCurrentDate ? o("div", { class: `${t}-date-panel-date__sup` }) : null);
  }))), this.datePickerSlots.footer ? o("div", { class: `${t}-date-panel-footer` }, this.datePickerSlots.footer()) : null, !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const d = i[f];
    return Array.isArray(d) || typeof d == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(d);
    }, onClick: () => {
      this.handleRangeShortcutClick(d);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? ze(h.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? ze(h.confirm, { onConfirm: this.handleConfirmClick, disabled: this.isRangeInvalid || this.isSelecting, text: this.locale.confirm }, () => [o(Pe, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), Cl = Xe({ name: "MonthRangePanel", props: Object.assign(Object.assign({}, Ma), { type: { type: String, required: true } }), setup(n) {
  const e = Ta(n, n.type), { dateLocaleRef: a } = Rn("DatePicker"), t = (r, i, l, u) => {
    const { handleColItemClick: h } = e;
    return o("div", { "data-n-date": true, key: i, class: [`${l}-date-panel-month-calendar__picker-col-item`, r.isCurrent && `${l}-date-panel-month-calendar__picker-col-item--current`, r.selected && `${l}-date-panel-month-calendar__picker-col-item--selected`, false], onClick: () => {
      h(r, u);
    } }, r.type === "month" ? Dr(r.dateObject.month, r.monthFormat, a.value.locale) : r.type === "quarter" ? Cr(r.dateObject.quarter, r.quarterFormat, a.value.locale) : kr(r.dateObject.year, r.yearFormat, a.value.locale));
  };
  return Ga(() => {
    e.justifyColumnsScrollState();
  }), Object.assign(Object.assign({}, e), { renderItem: t });
}, render() {
  var n, e, a;
  const { mergedClsPrefix: t, mergedTheme: r, shortcuts: i, type: l, renderItem: u, onRender: h } = this;
  return h == null ? void 0 : h(), o("div", { ref: "selfRef", tabindex: 0, class: [`${t}-date-panel`, `${t}-date-panel--daterange`, !this.panel && `${t}-date-panel--shadow`, this.themeClass], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus }, o("div", { ref: "startDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--start` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(ut, { ref: "startYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("start"), content: () => this.virtualListContent("start"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Jn, { ref: "startYearVlRef", items: this.startYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleStartYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: d }) => u(f, d, t, "start") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "startMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.startMonthArray : this.startQuarterArray).map((f, d) => u(f, d, t, "start")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), o("div", { class: `${t}-date-panel__vertical-divider` }), o("div", { ref: "endDatesElRef", class: `${t}-date-panel-calendar ${t}-date-panel-calendar--end` }, o("div", { class: `${t}-date-panel-month-calendar` }, o(ut, { ref: "endYearScrollbarRef", class: `${t}-date-panel-month-calendar__picker-col`, theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, container: () => this.virtualListContainer("end"), content: () => this.virtualListContent("end"), horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, { default: () => o(Jn, { ref: "endYearVlRef", items: this.endYearArray, itemSize: Yt, showScrollbar: false, keyField: "ts", onScroll: this.handleEndYearVlScroll, paddingBottom: 4 }, { default: ({ item: f, index: d }) => u(f, d, t, "end") }) }), l === "monthrange" || l === "quarterrange" ? o("div", { class: `${t}-date-panel-month-calendar__picker-col` }, o(ut, { ref: "endMonthScrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar }, { default: () => [(l === "monthrange" ? this.endMonthArray : this.endQuarterArray).map((f, d) => u(f, d, t, "end")), l === "monthrange" && o("div", { class: `${t}-date-panel-month-calendar__padding` })] })) : null)), Za(this.datePickerSlots.footer, (f) => f ? o("div", { class: `${t}-date-panel-footer` }, f) : null), !((n = this.actions) === null || n === void 0) && n.length || i ? o("div", { class: `${t}-date-panel-actions` }, o("div", { class: `${t}-date-panel-actions__prefix` }, i && Object.keys(i).map((f) => {
    const d = i[f];
    return Array.isArray(d) || typeof d == "function" ? o(bt, { size: "tiny", onMouseenter: () => {
      this.handleRangeShortcutMouseenter(d);
    }, onClick: () => {
      this.handleRangeShortcutClick(d);
    }, onMouseleave: () => {
      this.handleShortcutMouseleave();
    } }, { default: () => f }) : null;
  })), o("div", { class: `${t}-date-panel-actions__suffix` }, !((e = this.actions) === null || e === void 0) && e.includes("clear") ? ze(this.datePickerSlots.clear, { onClear: this.handleClearClick, text: this.locale.clear }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })]) : null, !((a = this.actions) === null || a === void 0) && a.includes("confirm") ? ze(this.datePickerSlots.confirm, { disabled: this.isRangeInvalid, onConfirm: this.handleConfirmClick, text: this.locale.confirm }, () => [o(bt, { theme: r.peers.Button, themeOverrides: r.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })]) : null)) : null, o(At, { onFocus: this.handleFocusDetectorFocus }));
} }), xl = Object.assign(Object.assign({}, Fn.props), { to: Ut.propTo, bordered: { type: Boolean, default: void 0 }, clearable: Boolean, fastYearSelect: Boolean, fastMonthSelect: Boolean, updateValueOnClose: Boolean, calendarDayFormat: String, calendarHeaderYearFormat: String, calendarHeaderMonthFormat: String, calendarHeaderMonthYearSeparator: { type: String, default: " " }, calendarHeaderMonthBeforeYear: { type: Boolean, default: void 0 }, defaultValue: [Number, Array], defaultFormattedValue: [String, Array], defaultTime: [Number, String, Array, Function], disabled: { type: Boolean, default: void 0 }, placement: { type: String, default: "bottom-start" }, value: [Number, Array], formattedValue: [String, Array], size: String, type: { type: String, default: "date" }, valueFormat: String, separator: String, placeholder: String, startPlaceholder: String, endPlaceholder: String, format: String, dateFormat: String, timePickerFormat: String, actions: Array, shortcuts: Object, isDateDisabled: Function, isTimeDisabled: Function, show: { type: Boolean, default: void 0 }, panel: Boolean, ranges: Object, firstDayOfWeek: Number, inputReadonly: Boolean, closeOnSelect: Boolean, status: String, timePickerProps: [Object, Array], onClear: Function, onConfirm: Function, defaultCalendarStartTime: Number, defaultCalendarEndTime: Number, bindCalendarMonths: Boolean, monthFormat: { type: String, default: "M" }, yearFormat: { type: String, default: "y" }, quarterFormat: { type: String, default: "'Q'Q" }, yearRange: { type: Array, default: () => [1901, 2100] }, "onUpdate:show": [Function, Array], onUpdateShow: [Function, Array], "onUpdate:formattedValue": [Function, Array], onUpdateFormattedValue: [Function, Array], "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onNextMonth: Function, onPrevMonth: Function, onNextYear: Function, onPrevYear: Function, onChange: [Function, Array] }), Sl = I([j("date-picker", `
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
 `, [Ja(), B("shadow", `
 box-shadow: var(--n-panel-box-shadow);
 `), j("date-panel-calendar", { padding: "var(--n-calendar-left-padding)", display: "grid", gridTemplateColumns: "1fr", gridArea: "left-calendar" }, [B("end", { padding: "var(--n-calendar-right-padding)", gridArea: "right-calendar" })]), j("date-panel-month-calendar", { display: "flex", gridArea: "left-calendar" }, [me("picker-col", `
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
 `), Et("disabled", [I("&:hover::before", `
 background-color: var(--n-item-color-hover);
 `), B("selected", `
 color: var(--n-item-color-active);
 `, [I("&::before", "background-color: var(--n-item-color-hover);")])]), B("disabled", `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `, [B("selected", [I("&::before", `
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
 `, [I(">", [I("*:not(:last-child)", { marginRight: "10px" }), I("*", { flex: 1, width: 0 }), j("time-picker", { zIndex: 1 })])]), j("date-panel-month", `
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
 `), I("&:hover", `
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
 `), B("covered, start, end", [Et("excluded", [I("&::before", `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `), I("&:nth-child(7n + 1)::before", { borderTopLeftRadius: "var(--n-item-border-radius)", borderBottomLeftRadius: "var(--n-item-border-radius)" }), I("&:nth-child(7n + 7)::before", { borderTopRightRadius: "var(--n-item-border-radius)", borderBottomRightRadius: "var(--n-item-border-radius)" })])]), B("selected", { color: "var(--n-item-text-color-active)" }, [I("&::after", { backgroundColor: "var(--n-item-color-active)" }), B("start", [I("&::before", { left: "50%" })]), B("end", [I("&::before", { right: "50%" })]), me("sup", { backgroundColor: "var(--n-panel-color)" })]), B("excluded", { color: "var(--n-item-text-color-disabled)" }, [B("selected", [I("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), B("disabled", { cursor: "not-allowed", color: "var(--n-item-text-color-disabled)" }, [B("covered", [I("&::before", { backgroundColor: "var(--n-item-color-disabled)" })]), B("selected", [I("&::before", { backgroundColor: "var(--n-item-color-disabled)" }), I("&::after", { backgroundColor: "var(--n-item-color-disabled)" })])]), B("week-hovered", [I("&::before", `
 background-color: var(--n-item-color-included);
 `), I("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), I("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)]), B("week-selected", `
 color: var(--n-item-text-color-active)
 `, [I("&::before", `
 background-color: var(--n-item-color-active);
 `), I("&:nth-child(7n + 1)::before", `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), I("&:nth-child(7n + 7)::before", `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)])])]), Et("week", [j("date-panel-dates", [j("date-panel-date", [Et("disabled", [Et("selected", [I("&:hover", `
 background-color: var(--n-item-color-hover);
 `)])])])])]), B("week", [j("date-panel-dates", [j("date-panel-date", [I("&::before", `
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
 `, [I("&:not(:last-child)", `
 margin-right: 8px;
 `)])])]), I("[data-n-date].transition-disabled", { transition: "none !important" }, [I("&::before, &::after", { transition: "none !important" })])]);
function Ml(n, e) {
  const a = g(() => {
    const { isTimeDisabled: d } = n, { value: p } = e;
    if (!(p === null || Array.isArray(p))) return d == null ? void 0 : d(p);
  }), t = g(() => {
    var d;
    return (d = a.value) === null || d === void 0 ? void 0 : d.isHourDisabled;
  }), r = g(() => {
    var d;
    return (d = a.value) === null || d === void 0 ? void 0 : d.isMinuteDisabled;
  }), i = g(() => {
    var d;
    return (d = a.value) === null || d === void 0 ? void 0 : d.isSecondDisabled;
  }), l = g(() => {
    const { type: d, isDateDisabled: p } = n, { value: D } = e;
    return D === null || Array.isArray(D) || !["date", "datetime"].includes(d) || !p ? false : p(D, { type: "input" });
  }), u = g(() => {
    const { type: d } = n, { value: p } = e;
    if (p === null || d === "datetime" || Array.isArray(p)) return false;
    const D = new Date(p), P = D.getHours(), $ = D.getMinutes(), J = D.getMinutes();
    return (t.value ? t.value(P) : false) || (r.value ? r.value($, P) : false) || (i.value ? i.value(J, $, P) : false);
  }), h = g(() => l.value || u.value);
  return { isValueInvalidRef: g(() => {
    const { type: d } = n;
    return d === "date" ? l.value : d === "datetime" ? h.value : false;
  }), isDateInvalidRef: l, isTimeInvalidRef: u, isDateTimeInvalidRef: h, isHourDisabledRef: t, isMinuteDisabledRef: r, isSecondDisabledRef: i };
}
function Tl(n, e) {
  const a = g(() => {
    const { isTimeDisabled: p } = n, { value: D } = e;
    return !Array.isArray(D) || !p ? [void 0, void 0] : [p == null ? void 0 : p(D[0], "start", D), p == null ? void 0 : p(D[1], "end", D)];
  }), t = { isStartHourDisabledRef: g(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isHourDisabled;
  }), isEndHourDisabledRef: g(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isHourDisabled;
  }), isStartMinuteDisabledRef: g(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isMinuteDisabled;
  }), isEndMinuteDisabledRef: g(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isMinuteDisabled;
  }), isStartSecondDisabledRef: g(() => {
    var p;
    return (p = a.value[0]) === null || p === void 0 ? void 0 : p.isSecondDisabled;
  }), isEndSecondDisabledRef: g(() => {
    var p;
    return (p = a.value[1]) === null || p === void 0 ? void 0 : p.isSecondDisabled;
  }) }, r = g(() => {
    const { type: p, isDateDisabled: D } = n, { value: P } = e;
    return P === null || !Array.isArray(P) || !["daterange", "datetimerange"].includes(p) || !D ? false : D(P[0], "start", P);
  }), i = g(() => {
    const { type: p, isDateDisabled: D } = n, { value: P } = e;
    return P === null || !Array.isArray(P) || !["daterange", "datetimerange"].includes(p) || !D ? false : D(P[1], "end", P);
  }), l = g(() => {
    const { type: p } = n, { value: D } = e;
    if (D === null || !Array.isArray(D) || p !== "datetimerange") return false;
    const P = yt(D[0]), $ = Mn(D[0]), J = Tn(D[0]), { isStartHourDisabledRef: x, isStartMinuteDisabledRef: _, isStartSecondDisabledRef: N } = t;
    return (x.value ? x.value(P) : false) || (_.value ? _.value($, P) : false) || (N.value ? N.value(J, $, P) : false);
  }), u = g(() => {
    const { type: p } = n, { value: D } = e;
    if (D === null || !Array.isArray(D) || p !== "datetimerange") return false;
    const P = yt(D[1]), $ = Mn(D[1]), J = Tn(D[1]), { isEndHourDisabledRef: x, isEndMinuteDisabledRef: _, isEndSecondDisabledRef: N } = t;
    return (x.value ? x.value(P) : false) || (_.value ? _.value($, P) : false) || (N.value ? N.value(J, $, P) : false);
  }), h = g(() => r.value || l.value), f = g(() => i.value || u.value), d = g(() => h.value || f.value);
  return Object.assign(Object.assign({}, t), { isStartDateInvalidRef: r, isEndDateInvalidRef: i, isStartTimeInvalidRef: l, isEndTimeInvalidRef: u, isStartValueInvalidRef: h, isEndValueInvalidRef: f, isRangeInvalidRef: d });
}
const _l = Xe({ name: "DatePicker", props: xl, slots: Object, setup(n, { slots: e }) {
  var a;
  const { localeRef: t, dateLocaleRef: r } = Rn("DatePicker"), { mergedComponentPropsRef: i, mergedClsPrefixRef: l, mergedBorderedRef: u, namespaceRef: h, inlineThemeDisabled: f } = er(n), d = tr(n, { mergedSize: (m) => {
    var S, R;
    const { size: z } = n;
    if (z) return z;
    const { mergedSize: se } = m || {};
    if (se == null ? void 0 : se.value) return se.value;
    const Re = (R = (S = i == null ? void 0 : i.value) === null || S === void 0 ? void 0 : S.DatePicker) === null || R === void 0 ? void 0 : R.size;
    return Re || "medium";
  } }), { mergedSizeRef: p, mergedDisabledRef: D, mergedStatusRef: P } = d, $ = T(null), J = T(null), x = T(null), _ = T(false), N = Le(n, "show"), H = ea(N, _), X = g(() => ({ locale: r.value.locale, useAdditionalWeekYearTokens: true })), Y = g(() => {
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
  }), Z = g(() => {
    var m;
    return (m = n.valueFormat) !== null && m !== void 0 ? m : Y.value;
  });
  function q(m) {
    if (m === null) return null;
    const { value: S } = Z, { value: R } = X;
    return Array.isArray(m) ? [Ne(m[0], S, /* @__PURE__ */ new Date(), R).getTime(), Ne(m[1], S, /* @__PURE__ */ new Date(), R).getTime()] : Ne(m, S, /* @__PURE__ */ new Date(), R).getTime();
  }
  const { defaultFormattedValue: be, defaultValue: Ke } = n, ae = T((a = be !== void 0 ? q(be) : Ke) !== null && a !== void 0 ? a : null), we = g(() => {
    const { formattedValue: m } = n;
    return m !== void 0 ? q(m) : n.value;
  }), V = ea(we, ae), C = T(null);
  Er(() => {
    C.value = V.value;
  });
  const De = T(""), Ze = T(""), Be = T(""), Ge = Fn("DatePicker", "-date-picker", Sl, Br, n, l), Je = g(() => {
    var m, S;
    return ((S = (m = i == null ? void 0 : i.value) === null || m === void 0 ? void 0 : m.DatePicker) === null || S === void 0 ? void 0 : S.timePickerSize) || "small";
  }), qe = g(() => ["daterange", "datetimerange", "monthrange", "quarterrange", "yearrange"].includes(n.type)), Se = g(() => {
    const { placeholder: m } = n;
    if (m === void 0) {
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
    } else return m;
  }), Fe = g(() => n.startPlaceholder === void 0 ? n.type === "daterange" ? t.value.startDatePlaceholder : n.type === "datetimerange" ? t.value.startDatetimePlaceholder : n.type === "monthrange" ? t.value.startMonthPlaceholder : "" : n.startPlaceholder), ge = g(() => n.endPlaceholder === void 0 ? n.type === "daterange" ? t.value.endDatePlaceholder : n.type === "datetimerange" ? t.value.endDatetimePlaceholder : n.type === "monthrange" ? t.value.endMonthPlaceholder : "" : n.endPlaceholder), ct = g(() => {
    const { actions: m, type: S, clearable: R } = n;
    if (m === null) return [];
    if (m !== void 0) return m;
    const z = R ? ["clear"] : [];
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
        qr("date-picker", "The type is wrong, n-date-picker's type only supports `date`, `datetime`, `daterange` and `datetimerange`.");
        break;
      }
    }
  });
  function re(m) {
    if (m === null) return null;
    if (Array.isArray(m)) {
      const { value: S } = Z, { value: R } = X;
      return [Q(m[0], S, R), Q(m[1], S, X.value)];
    } else return Q(m, Z.value, X.value);
  }
  function ne(m) {
    C.value = m;
  }
  function Me(m, S) {
    const { "onUpdate:formattedValue": R, onUpdateFormattedValue: z } = n;
    R && pe(R, m, S), z && pe(z, m, S);
  }
  function he(m, S) {
    const { "onUpdate:value": R, onUpdateValue: z, onChange: se } = n, { nTriggerFormChange: Re, nTriggerFormInput: ye } = d, c = re(m);
    S.doConfirm && Te(m, c), z && pe(z, m, c), R && pe(R, m, c), se && pe(se, m, c), ae.value = m, Me(c, m), Re(), ye();
  }
  function He() {
    const { onClear: m } = n;
    m == null ? void 0 : m();
  }
  function Te(m, S) {
    const { onConfirm: R } = n;
    R && R(m, S);
  }
  function wt(m) {
    const { onFocus: S } = n, { nTriggerFormFocus: R } = d;
    S && pe(S, m), R();
  }
  function $e(m) {
    const { onBlur: S } = n, { nTriggerFormBlur: R } = d;
    S && pe(S, m), R();
  }
  function E(m) {
    const { "onUpdate:show": S, onUpdateShow: R } = n;
    S && pe(S, m), R && pe(R, m), _.value = m;
  }
  function ht(m) {
    m.key === "Escape" && H.value && (xn(m), Ue({ returnFocus: true }));
  }
  function at(m) {
    m.key === "Escape" && H.value && xn(m);
  }
  function Dt() {
    var m;
    E(false), (m = x.value) === null || m === void 0 || m.deactivate(), He();
  }
  function kt() {
    var m;
    (m = x.value) === null || m === void 0 || m.deactivate(), He();
  }
  function Ct() {
    Ue({ returnFocus: true });
  }
  function xt(m) {
    var S;
    H.value && !(!((S = J.value) === null || S === void 0) && S.contains(va(m))) && Ue({ returnFocus: false });
  }
  function St(m) {
    Ue({ returnFocus: true, disableUpdateOnClose: m });
  }
  function Mt(m, S) {
    S ? he(m, { doConfirm: false }) : ne(m);
  }
  function mt() {
    const m = C.value;
    he(Array.isArray(m) ? [m[0], m[1]] : m, { doConfirm: true });
  }
  function je() {
    const { value: m } = C;
    qe.value ? (Array.isArray(m) || m === null) && _t(m) : Array.isArray(m) || Tt(m);
  }
  function Tt(m) {
    m === null ? De.value = "" : De.value = Q(m, Y.value, X.value);
  }
  function _t(m) {
    if (m === null) Ze.value = "", Be.value = "";
    else {
      const S = X.value;
      Ze.value = Q(m[0], Y.value, S), Be.value = Q(m[1], Y.value, S);
    }
  }
  function et() {
    H.value || ke();
  }
  function Ot(m) {
    var S;
    !((S = $.value) === null || S === void 0) && S.$el.contains(m.relatedTarget) || ($e(m), je(), Ue({ returnFocus: false }));
  }
  function v() {
    D.value || (je(), Ue({ returnFocus: false }));
  }
  function O(m) {
    if (m === "") {
      he(null, { doConfirm: false }), C.value = null, De.value = "";
      return;
    }
    const S = Ne(m, Y.value, /* @__PURE__ */ new Date(), X.value);
    Qe(S) ? (he(w(S), { doConfirm: false }), je()) : De.value = m;
  }
  function L(m, { source: S }) {
    if (m[0] === "" && m[1] === "") {
      he(null, { doConfirm: false }), C.value = null, Ze.value = "", Be.value = "";
      return;
    }
    const [R, z] = m, se = Ne(R, Y.value, /* @__PURE__ */ new Date(), X.value), Re = Ne(z, Y.value, /* @__PURE__ */ new Date(), X.value);
    if (Qe(se) && Qe(Re)) {
      let ye = w(se), c = w(Re);
      Re < se && (S === 0 ? c = ye : ye = c), he([ye, c], { doConfirm: false }), je();
    } else [Ze.value, Be.value] = m;
  }
  function tn(m) {
    D.value || or(m, "clear") || H.value || ke();
  }
  function $t(m) {
    D.value || wt(m);
  }
  function ke() {
    D.value || H.value || E(true);
  }
  function Ue({ returnFocus: m, disableUpdateOnClose: S }) {
    var R;
    H.value && (E(false), n.type !== "date" && n.updateValueOnClose && !S && mt(), m && ((R = x.value) === null || R === void 0 || R.focus()));
  }
  dt(C, () => {
    je();
  }), je(), dt(H, (m) => {
    m || (C.value = V.value);
  });
  const vt = Ml(n, C), pt = Tl(n, C);
  ar(Yn, Object.assign(Object.assign(Object.assign({ mergedClsPrefixRef: l, mergedThemeRef: Ge, timePickerSizeRef: Je, localeRef: t, dateLocaleRef: r, firstDayOfWeekRef: Le(n, "firstDayOfWeek"), isDateDisabledRef: Le(n, "isDateDisabled"), rangesRef: Le(n, "ranges"), timePickerPropsRef: Le(n, "timePickerProps"), closeOnSelectRef: Le(n, "closeOnSelect"), updateValueOnCloseRef: Le(n, "updateValueOnClose"), monthFormatRef: Le(n, "monthFormat"), yearFormatRef: Le(n, "yearFormat"), quarterFormatRef: Le(n, "quarterFormat"), yearRangeRef: Le(n, "yearRange") }, vt), pt), { datePickerSlots: e }));
  const nn = { focus: () => {
    var m;
    (m = x.value) === null || m === void 0 || m.focus();
  }, blur: () => {
    var m;
    (m = x.value) === null || m === void 0 || m.blur();
  } }, Ie = g(() => {
    const { common: { cubicBezierEaseInOut: m }, self: { iconColor: S, iconColorDisabled: R } } = Ge.value;
    return { "--n-bezier": m, "--n-icon-color-override": S, "--n-icon-color-disabled-override": R };
  }), rt = f ? Cn("date-picker-trigger", void 0, Ie, n) : void 0, It = g(() => {
    const { type: m } = n, { common: { cubicBezierEaseInOut: S }, self: { calendarTitleFontSize: R, calendarDaysFontSize: z, itemFontSize: se, itemTextColor: Re, itemColorDisabled: ye, itemColorIncluded: c, itemColorHover: y, itemColorActive: k, itemBorderRadius: A, itemTextColorDisabled: K, itemTextColorActive: _e, panelColor: ue, panelTextColor: an, arrowColor: rn, calendarTitleTextColor: Vt, panelActionDividerColor: on, panelHeaderDividerColor: ln, calendarDaysDividerColor: sn, panelBoxShadow: un, panelBorderRadius: ot, calendarTitleFontWeight: An, panelExtraFooterPadding: $n, panelActionPadding: In, itemSize: Vn, itemCellWidth: Nn, itemCellHeight: zn, scrollItemWidth: s, scrollItemHeight: b, calendarTitlePadding: M, calendarTitleHeight: ve, calendarDaysHeight: tt, calendarDaysTextColor: ee, arrowSize: dn, panelHeaderPadding: gn, calendarDividerColor: cn, calendarTitleGridTempateColumns: Fr, iconColor: Rr, iconColorDisabled: Yr, scrollItemBorderRadius: Ar, calendarTitleColorHover: $r, [Pa("calendarLeftPadding", m)]: Ir, [Pa("calendarRightPadding", m)]: Vr } } = Ge.value;
    return { "--n-bezier": S, "--n-panel-border-radius": ot, "--n-panel-color": ue, "--n-panel-box-shadow": un, "--n-panel-text-color": an, "--n-panel-header-padding": gn, "--n-panel-header-divider-color": ln, "--n-calendar-left-padding": Ir, "--n-calendar-right-padding": Vr, "--n-calendar-title-color-hover": $r, "--n-calendar-title-height": ve, "--n-calendar-title-padding": M, "--n-calendar-title-font-size": R, "--n-calendar-title-font-weight": An, "--n-calendar-title-text-color": Vt, "--n-calendar-title-grid-template-columns": Fr, "--n-calendar-days-height": tt, "--n-calendar-days-divider-color": sn, "--n-calendar-days-font-size": z, "--n-calendar-days-text-color": ee, "--n-calendar-divider-color": cn, "--n-panel-action-padding": In, "--n-panel-extra-footer-padding": $n, "--n-panel-action-divider-color": on, "--n-item-font-size": se, "--n-item-border-radius": A, "--n-item-size": Vn, "--n-item-cell-width": Nn, "--n-item-cell-height": zn, "--n-item-text-color": Re, "--n-item-color-included": c, "--n-item-color-disabled": ye, "--n-item-color-hover": y, "--n-item-color-active": k, "--n-item-text-color-disabled": K, "--n-item-text-color-active": _e, "--n-scroll-item-width": s, "--n-scroll-item-height": b, "--n-scroll-item-border-radius": Ar, "--n-arrow-size": dn, "--n-arrow-color": rn, "--n-icon-color": Rr, "--n-icon-color-disabled": Yr };
  }), it = f ? Cn("date-picker", g(() => n.type), It, n) : void 0;
  return Object.assign(Object.assign({}, nn), { mergedStatus: P, mergedClsPrefix: l, mergedBordered: u, namespace: h, uncontrolledValue: ae, pendingValue: C, panelInstRef: $, triggerElRef: J, inputInstRef: x, isMounted: nr(), displayTime: De, displayStartTime: Ze, displayEndTime: Be, mergedShow: H, adjustedTo: Ut(n), isRange: qe, localizedStartPlaceholder: Fe, localizedEndPlaceholder: ge, mergedSize: p, mergedDisabled: D, localizedPlacehoder: Se, isValueInvalid: vt.isValueInvalidRef, isStartValueInvalid: pt.isStartValueInvalidRef, isEndValueInvalid: pt.isEndValueInvalidRef, handleInputKeydown: at, handleClickOutside: xt, handleKeydown: ht, handleClear: Dt, handlePanelClear: kt, handleTriggerClick: tn, handleInputActivate: et, handleInputDeactivate: v, handleInputFocus: $t, handleInputBlur: Ot, handlePanelTabOut: Ct, handlePanelClose: St, handleRangeUpdateValue: L, handleSingleUpdateValue: O, handlePanelUpdateValue: Mt, handlePanelConfirm: mt, mergedTheme: Ge, actions: ct, triggerCssVars: f ? void 0 : Ie, triggerThemeClass: rt == null ? void 0 : rt.themeClass, triggerOnRender: rt == null ? void 0 : rt.onRender, cssVars: f ? void 0 : It, themeClass: it == null ? void 0 : it.themeClass, onRender: it == null ? void 0 : it.onRender, onNextMonth: n.onNextMonth, onPrevMonth: n.onPrevMonth, onNextYear: n.onNextYear, onPrevYear: n.onPrevYear });
}, render() {
  const { clearable: n, triggerOnRender: e, mergedClsPrefix: a, $slots: t } = this, r = { onUpdateValue: this.handlePanelUpdateValue, onTabOut: this.handlePanelTabOut, onClose: this.handlePanelClose, onClear: this.handlePanelClear, onKeydown: this.handleKeydown, onConfirm: this.handlePanelConfirm, ref: "panelInstRef", value: this.pendingValue, active: this.mergedShow, actions: this.actions, shortcuts: this.shortcuts, style: this.cssVars, defaultTime: this.defaultTime, themeClass: this.themeClass, panel: this.panel, inputReadonly: this.inputReadonly || this.mergedDisabled, onRender: this.onRender, onNextMonth: this.onNextMonth, onPrevMonth: this.onPrevMonth, onNextYear: this.onNextYear, onPrevYear: this.onPrevYear, timePickerFormat: this.timePickerFormat, dateFormat: this.dateFormat, fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, calendarDayFormat: this.calendarDayFormat, calendarHeaderYearFormat: this.calendarHeaderYearFormat, calendarHeaderMonthFormat: this.calendarHeaderMonthFormat, calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear }, i = () => {
    const { type: u } = this;
    return u === "datetime" ? o(Dl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime }), t) : u === "daterange" ? o(zo, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "datetimerange" ? o(kl, Object.assign({}, r, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), t) : u === "month" || u === "year" || u === "quarter" ? o(Mr, Object.assign({}, r, { type: u, key: u })) : u === "monthrange" || u === "yearrange" || u === "quarterrange" ? o(Cl, Object.assign({}, r, { type: u })) : o(No, Object.assign({}, r, { type: u, defaultCalendarStartTime: this.defaultCalendarStartTime }), t);
  };
  if (this.panel) return i();
  e == null ? void 0 : e();
  const l = { bordered: this.mergedBordered, size: this.mergedSize, passivelyActivated: true, disabled: this.mergedDisabled, readonly: this.inputReadonly || this.mergedDisabled, clearable: n, onClear: this.handleClear, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown, onActivate: this.handleInputActivate, onDeactivate: this.handleInputDeactivate, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur };
  return o("div", { ref: "triggerElRef", class: [`${a}-date-picker`, this.mergedDisabled && `${a}-date-picker--disabled`, this.isRange && `${a}-date-picker--range`, this.triggerThemeClass], style: this.triggerCssVars, onKeydown: this.handleKeydown }, o(pa, null, { default: () => [o(ga, null, { default: () => this.isRange ? o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: [this.displayStartTime, this.displayEndTime], placeholder: [this.localizedStartPlaceholder, this.localizedEndPlaceholder], textDecoration: [this.isStartValueInvalid ? "line-through" : "", this.isEndValueInvalid ? "line-through" : ""], pair: true, onUpdateValue: this.handleRangeUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { separator: () => this.separator === void 0 ? G(t.separator, () => [o(kn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(ri, null) })]) : this.separator, [n ? "clear-icon-placeholder" : "suffix"]: () => G(t["date-icon"], () => [o(kn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => o(Ya, null) })]) }) : o(Rt, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: this.displayTime, placeholder: this.localizedPlacehoder, textDecoration: this.isValueInvalid && !this.isRange ? "line-through" : "", onUpdateValue: this.handleSingleUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, l), { [n ? "clear-icon-placeholder" : "suffix"]: () => o(kn, { clsPrefix: a, class: `${a}-date-picker-icon` }, { default: () => G(t["date-icon"], () => [o(Ya, null)]) }) }) }), o(ya, { show: this.mergedShow, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Ut.tdkey, placement: this.placement }, { default: () => o(fa, { name: "fade-in-scale-up-transition", appear: this.isMounted }, { default: () => this.mergedShow ? ha(i(), [[ma, this.handleClickOutside, void 0, { capture: true }]]) : null }) })] }));
} });
function Ol() {
  const { request: n } = Nr();
  return { summary: (e) => {
    const a = new URLSearchParams({ group_by: e.group_by });
    return e.api_key && a.set("api_key", e.api_key), e.start_time && a.set("start_time", e.start_time), e.end_time && a.set("end_time", e.end_time), n("GET", `/usage/summary?${a.toString()}`);
  } };
}
const Pl = { class: "flex gap-3 mb-6 flex-wrap items-end" }, Fl = { key: 0, class: "text-slate-500 text-sm" }, Rl = { class: "grid grid-cols-4 gap-4 mb-6" }, jl = Xe({ __name: "usage", setup(n) {
  const e = Xr(), a = Ol(), t = T(""), r = T("hour"), i = T(null), l = T(null), u = T(false);
  async function h() {
    u.value = true;
    try {
      const d = { group_by: r.value };
      t.value.trim() && (d.api_key = t.value.trim()), i.value && (d.start_time = new Date(i.value[0]).toISOString(), d.end_time = new Date(i.value[1] + 864e5 - 1).toISOString()), l.value = await a.summary(d);
    } catch (d) {
      e.error(d.message);
    } finally {
      u.value = false;
    }
  }
  const f = g(() => [{ title: r.value === "model" ? "Model" : "Hour", key: "group_key", render: (d) => o("span", { class: "font-mono text-xs" }, d.group_key) }, { title: "Requests", key: "total_requests", render: (d) => d.total_requests.toLocaleString() }, { title: "Errors", key: "error_requests", render: (d) => o("span", { class: d.error_requests > 0 ? "text-red-400" : "" }, String(d.error_requests)) }, { title: "Input", key: "input_tokens", render: (d) => yn(d.input_tokens) }, { title: "Output", key: "output_tokens", render: (d) => yn(d.output_tokens) }, { title: "Cost", key: "total_cost", render: (d) => Oa(d.total_cost) }]);
  return (d, p) => {
    const D = Rt, P = _l, $ = Wr, J = Pe, x = Kr, _ = Lr, N = Qr;
    return Hn(), En("div", null, [p[12] || (p[12] = Ve("h1", { class: "text-xl font-semibold text-slate-100 mb-6" }, "Usage", -1)), Ve("div", Pl, [Ve("div", null, [p[3] || (p[3] = Ve("div", { class: "text-xs text-slate-400 mb-1" }, "API Key", -1)), Ee(D, { value: Oe(t), "onUpdate:value": p[0] || (p[0] = (H) => Bn(t) ? t.value = H : null), placeholder: "Optional \u2014 leave empty for all", style: { width: "240px" }, clearable: "" }, null, 8, ["value"])]), Ve("div", null, [p[4] || (p[4] = Ve("div", { class: "text-xs text-slate-400 mb-1" }, "Date Range", -1)), Ee(P, { value: Oe(i), "onUpdate:value": p[1] || (p[1] = (H) => Bn(i) ? i.value = H : null), type: "daterange", clearable: "", style: { width: "260px" } }, null, 8, ["value"])]), Ve("div", null, [p[5] || (p[5] = Ve("div", { class: "text-xs text-slate-400 mb-1" }, "Group By", -1)), Ee($, { value: Oe(r), "onUpdate:value": p[2] || (p[2] = (H) => Bn(r) ? r.value = H : null), options: [{ label: "By Hour", value: "hour" }, { label: "By Model", value: "model" }], style: { width: "130px" } }, null, 8, ["value"])]), Ee(J, { type: "primary", loading: Oe(u), onClick: h }, { icon: Nt(() => [...p[6] || (p[6] = [Ve("span", { class: "i-carbon-search" }, null, -1)])]), default: Nt(() => [p[7] || (p[7] = jr(" Query ", -1))]), _: 1 }, 8, ["loading"])]), !Oe(l) && !Oe(u) ? (Hn(), En("p", Fl, " Select filters and click Query. Leave API key empty to aggregate all keys. ")) : Fa("", true), Oe(l) ? (Hn(), En(Ur, { key: 1 }, [Ve("div", Rl, [Ee(_, { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: Nt(() => [p[8] || (p[8] = Ve("span", { class: "i-carbon-send absolute top-3 right-3 text-[32px] text-indigo-400 opacity-80" }, null, -1)), Ee(x, { label: "Requests", value: Oe(l).summary.total_requests.toLocaleString() }, null, 8, ["value"])]), _: 1 }), Ee(_, { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: Nt(() => [p[9] || (p[9] = Ve("span", { class: "i-carbon-arrow-down absolute top-3 right-3 text-[32px] text-blue-400 opacity-80" }, null, -1)), Ee(x, { label: "Input Tokens", value: Oe(yn)(Oe(l).summary.total_input_tokens) }, null, 8, ["value"])]), _: 1 }), Ee(_, { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: Nt(() => [p[10] || (p[10] = Ve("span", { class: "i-carbon-arrow-up absolute top-3 right-3 text-[32px] text-emerald-400 opacity-80" }, null, -1)), Ee(x, { label: "Output Tokens", value: Oe(yn)(Oe(l).summary.total_output_tokens) }, null, 8, ["value"])]), _: 1 }), Ee(_, { size: "small", style: { position: "relative", overflow: "hidden" } }, { default: Nt(() => [p[11] || (p[11] = Ve("span", { class: "i-carbon-currency-dollar absolute top-3 right-3 text-[32px] text-amber-400 opacity-80" }, null, -1)), Ee(x, { label: "Total Cost", value: Oe(Oa)(Oe(l).summary.total_cost) }, null, 8, ["value"])]), _: 1 })]), Ee(N, { columns: Oe(f), data: Oe(l).data, pagination: { pageSize: 50 }, size: "small" }, null, 8, ["columns", "data"])], 64)) : Fa("", true)]);
  };
} });
export {
  jl as default
};
