import { r as H, w as Ee, c as Y, aP as fo, bh as vo, aT as po, bi as Wr, i as Je, a as Br, d as oe, j as s, av as Ir, f as E, e as T, h as c, F as bo, N as mo, a2 as eo, W as Re, t as We, H as go, b6 as _r, ac as Ar, ar as Ye, af as Hr, aj as Lr, b as xo, E as de, ae as yo, g as O, G as se, ao as Vr, L as Or, aD as Nr, k as Co, l as Be, o as Gr, ax as jr, P as io, a0 as wo, m as Po, aa as lo, ad as so, I as y, a1 as Kr, a4 as Ur, R as So, $ as qr } from "./index-HnuybbhN.js";
import { b as Se, d as Xr, r as be, a as Yr, u as To, c as U, i as Qr } from "./use-form-item-DgrHZmhA.js";
function Qe(e) {
  const n = Y(e), t = H(n.value);
  return Ee(n, (l) => {
    t.value = l;
  }), typeof e == "function" ? t : { __v_isRef: true, get value() {
    return t.value;
  }, set value(l) {
    e.set(l);
  } };
}
const Ie = typeof document < "u" && typeof window < "u";
function co(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Zr = /^(\d|\.)+$/, uo = /(\d|\.)+/;
function Cn(e, { c: n = 1, offset: t = 0, attachPx: l = true } = {}) {
  if (typeof e == "number") {
    const d = (e + t) * n;
    return d === 0 ? "0" : `${d}px`;
  } else if (typeof e == "string") if (Zr.test(e)) {
    const d = (Number(e) + t) * n;
    return l ? d === 0 ? "0" : `${d}px` : `${d}`;
  } else {
    const d = uo.exec(e);
    return d ? e.replace(uo, String((Number(d[0]) + t) * n)) : e;
  }
  return e;
}
const Jr = { name: "en-US", global: { undo: "Undo", redo: "Redo", confirm: "Confirm", clear: "Clear" }, Popconfirm: { positiveText: "Confirm", negativeText: "Cancel" }, Cascader: { placeholder: "Please Select", loading: "Loading", loadingRequiredMessage: (e) => `Please load all ${e}'s descendants before checking it.` }, Time: { dateFormat: "yyyy-MM-dd", dateTimeFormat: "yyyy-MM-dd HH:mm:ss" }, DatePicker: { yearFormat: "yyyy", monthFormat: "MMM", dayFormat: "eeeeee", yearTypeFormat: "yyyy", monthTypeFormat: "yyyy-MM", dateFormat: "yyyy-MM-dd", dateTimeFormat: "yyyy-MM-dd HH:mm:ss", quarterFormat: "yyyy-qqq", weekFormat: "YYYY-w", clear: "Clear", now: "Now", confirm: "Confirm", selectTime: "Select Time", selectDate: "Select Date", datePlaceholder: "Select Date", datetimePlaceholder: "Select Date and Time", monthPlaceholder: "Select Month", yearPlaceholder: "Select Year", quarterPlaceholder: "Select Quarter", weekPlaceholder: "Select Week", startDatePlaceholder: "Start Date", endDatePlaceholder: "End Date", startDatetimePlaceholder: "Start Date and Time", endDatetimePlaceholder: "End Date and Time", startMonthPlaceholder: "Start Month", endMonthPlaceholder: "End Month", monthBeforeYear: true, firstDayOfWeek: 6, today: "Today" }, DataTable: { checkTableAll: "Select all in the table", uncheckTableAll: "Unselect all in the table", confirm: "Confirm", clear: "Clear" }, LegacyTransfer: { sourceTitle: "Source", targetTitle: "Target" }, Transfer: { selectAll: "Select all", unselectAll: "Unselect all", clearAll: "Clear", total: (e) => `Total ${e} items`, selected: (e) => `${e} items selected` }, Empty: { description: "No Data" }, Select: { placeholder: "Please Select" }, TimePicker: { placeholder: "Select Time", positiveText: "OK", negativeText: "Cancel", now: "Now", clear: "Clear" }, Pagination: { goto: "Goto", selectionSuffix: "page" }, DynamicTags: { add: "Add" }, Log: { loading: "Loading" }, Input: { placeholder: "Please Input" }, InputNumber: { placeholder: "Please Input" }, DynamicInput: { create: "Create" }, ThemeEditor: { title: "Theme Editor", clearAllVars: "Clear All Variables", clearSearch: "Clear Search", filterCompName: "Filter Component Name", filterVarName: "Filter Variable Name", import: "Import", export: "Export", restore: "Reset to Default" }, Image: { tipPrevious: "Previous picture (\u2190)", tipNext: "Next picture (\u2192)", tipCounterclockwise: "Counterclockwise", tipClockwise: "Clockwise", tipZoomOut: "Zoom out", tipZoomIn: "Zoom in", tipDownload: "Download", tipClose: "Close (Esc)", tipOriginalSize: "Zoom to original size" }, Heatmap: { less: "less", more: "more", monthFormat: "MMM", weekdayFormat: "eee" } };
function Xe(e) {
  return (n = {}) => {
    const t = n.width ? String(n.width) : e.defaultWidth;
    return e.formats[t] || e.formats[e.defaultWidth];
  };
}
function we(e) {
  return (n, t) => {
    const l = (t == null ? void 0 : t.context) ? String(t.context) : "standalone";
    let d;
    if (l === "formatting" && e.formattingValues) {
      const p = e.defaultFormattingWidth || e.defaultWidth, i = (t == null ? void 0 : t.width) ? String(t.width) : p;
      d = e.formattingValues[i] || e.formattingValues[p];
    } else {
      const p = e.defaultWidth, i = (t == null ? void 0 : t.width) ? String(t.width) : e.defaultWidth;
      d = e.values[i] || e.values[p];
    }
    const h = e.argumentCallback ? e.argumentCallback(n) : n;
    return d[h];
  };
}
function Pe(e) {
  return (n, t = {}) => {
    const l = t.width, d = l && e.matchPatterns[l] || e.matchPatterns[e.defaultMatchWidth], h = n.match(d);
    if (!h) return null;
    const p = h[0], i = l && e.parsePatterns[l] || e.parsePatterns[e.defaultParseWidth], x = Array.isArray(i) ? ot(i, (b) => b.test(p)) : et(i, (b) => b.test(p));
    let D;
    D = e.valueCallback ? e.valueCallback(x) : x, D = t.valueCallback ? t.valueCallback(D) : D;
    const k = n.slice(p.length);
    return { value: D, rest: k };
  };
}
function et(e, n) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t) && n(e[t])) return t;
}
function ot(e, n) {
  for (let t = 0; t < e.length; t++) if (n(e[t])) return t;
}
function rt(e) {
  return (n, t = {}) => {
    const l = n.match(e.matchPattern);
    if (!l) return null;
    const d = l[0], h = n.match(e.parsePattern);
    if (!h) return null;
    let p = e.valueCallback ? e.valueCallback(h[0]) : h[0];
    p = t.valueCallback ? t.valueCallback(p) : p;
    const i = n.slice(d.length);
    return { value: p, rest: i };
  };
}
const tt = { lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" }, xSeconds: { one: "1 second", other: "{{count}} seconds" }, halfAMinute: "half a minute", lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" }, xMinutes: { one: "1 minute", other: "{{count}} minutes" }, aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" }, xHours: { one: "1 hour", other: "{{count}} hours" }, xDays: { one: "1 day", other: "{{count}} days" }, aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" }, xWeeks: { one: "1 week", other: "{{count}} weeks" }, aboutXMonths: { one: "about 1 month", other: "about {{count}} months" }, xMonths: { one: "1 month", other: "{{count}} months" }, aboutXYears: { one: "about 1 year", other: "about {{count}} years" }, xYears: { one: "1 year", other: "{{count}} years" }, overXYears: { one: "over 1 year", other: "over {{count}} years" }, almostXYears: { one: "almost 1 year", other: "almost {{count}} years" } }, nt = (e, n, t) => {
  let l;
  const d = tt[e];
  return typeof d == "string" ? l = d : n === 1 ? l = d.one : l = d.other.replace("{{count}}", n.toString()), (t == null ? void 0 : t.addSuffix) ? t.comparison && t.comparison > 0 ? "in " + l : l + " ago" : l;
}, at = { lastWeek: "'last' eeee 'at' p", yesterday: "'yesterday at' p", today: "'today at' p", tomorrow: "'tomorrow at' p", nextWeek: "eeee 'at' p", other: "P" }, it = (e, n, t, l) => at[e], lt = { narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"] }, st = { narrow: ["1", "2", "3", "4"], abbreviated: ["Q1", "Q2", "Q3", "Q4"], wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"] }, dt = { narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, ct = { narrow: ["S", "M", "T", "W", "T", "F", "S"], short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, ut = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" } }, ht = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" } }, ft = (e, n) => {
  const t = Number(e), l = t % 100;
  if (l > 20 || l < 10) switch (l % 10) {
    case 1:
      return t + "st";
    case 2:
      return t + "nd";
    case 3:
      return t + "rd";
  }
  return t + "th";
}, vt = { ordinalNumber: ft, era: we({ values: lt, defaultWidth: "wide" }), quarter: we({ values: st, defaultWidth: "wide", argumentCallback: (e) => e - 1 }), month: we({ values: dt, defaultWidth: "wide" }), day: we({ values: ct, defaultWidth: "wide" }), dayPeriod: we({ values: ut, defaultWidth: "wide", formattingValues: ht, defaultFormattingWidth: "wide" }) }, pt = /^(\d+)(th|st|nd|rd)?/i, bt = /\d+/i, mt = { narrow: /^(b|a)/i, abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i, wide: /^(before christ|before common era|anno domini|common era)/i }, gt = { any: [/^b/i, /^(a|c)/i] }, xt = { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i }, yt = { any: [/1/i, /2/i, /3/i, /4/i] }, Ct = { narrow: /^[jfmasond]/i, abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i }, wt = { narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i], any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i] }, Pt = { narrow: /^[smtwf]/i, short: /^(su|mo|tu|we|th|fr|sa)/i, abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i, wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i }, St = { narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i], any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i] }, Tt = { narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i, any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i }, $t = { any: { am: /^a/i, pm: /^p/i, midnight: /^mi/i, noon: /^no/i, morning: /morning/i, afternoon: /afternoon/i, evening: /evening/i, night: /night/i } }, zt = { ordinalNumber: rt({ matchPattern: pt, parsePattern: bt, valueCallback: (e) => parseInt(e, 10) }), era: Pe({ matchPatterns: mt, defaultMatchWidth: "wide", parsePatterns: gt, defaultParseWidth: "any" }), quarter: Pe({ matchPatterns: xt, defaultMatchWidth: "wide", parsePatterns: yt, defaultParseWidth: "any", valueCallback: (e) => e + 1 }), month: Pe({ matchPatterns: Ct, defaultMatchWidth: "wide", parsePatterns: wt, defaultParseWidth: "any" }), day: Pe({ matchPatterns: Pt, defaultMatchWidth: "wide", parsePatterns: St, defaultParseWidth: "any" }), dayPeriod: Pe({ matchPatterns: Tt, defaultMatchWidth: "any", parsePatterns: $t, defaultParseWidth: "any" }) }, Ft = { full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy" }, Mt = { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" }, Dt = { full: "{{date}} 'at' {{time}}", long: "{{date}} 'at' {{time}}", medium: "{{date}}, {{time}}", short: "{{date}}, {{time}}" }, kt = { date: Xe({ formats: Ft, defaultWidth: "full" }), time: Xe({ formats: Mt, defaultWidth: "full" }), dateTime: Xe({ formats: Dt, defaultWidth: "full" }) }, Et = { code: "en-US", formatDistance: nt, formatLong: kt, formatRelative: it, localize: vt, match: zt, options: { weekStartsOn: 0, firstWeekContainsDate: 1 } }, Rt = { name: "en-US", locale: Et };
var Wt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Bt = /^\w*$/;
function It(e, n) {
  if (fo(e)) return false;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || vo(e) ? true : Bt.test(e) || !Wt.test(e) || n != null && e in Object(n);
}
var _t = "Expected a function";
function oo(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function") throw new TypeError(_t);
  var t = function() {
    var l = arguments, d = n ? n.apply(this, l) : l[0], h = t.cache;
    if (h.has(d)) return h.get(d);
    var p = e.apply(this, l);
    return t.cache = h.set(d, p) || h, p;
  };
  return t.cache = new (oo.Cache || po)(), t;
}
oo.Cache = po;
var At = 500;
function Ht(e) {
  var n = oo(e, function(l) {
    return t.size === At && t.clear(), l;
  }), t = n.cache;
  return n;
}
var Lt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Vt = /\\(\\)?/g, Ot = Ht(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(Lt, function(t, l, d, h) {
    n.push(d ? h.replace(Vt, "$1") : l || t);
  }), n;
});
function Nt(e, n) {
  return fo(e) ? e : It(e, n) ? [e] : Ot(Wr(e));
}
function Gt(e) {
  if (typeof e == "string" || vo(e)) return e;
  var n = e + "";
  return n == "0" && 1 / e == -1 / 0 ? "-0" : n;
}
function jt(e, n) {
  n = Nt(n, e);
  for (var t = 0, l = n.length; e != null && t < l; ) e = e[Gt(n[t++])];
  return t && t == l ? e : void 0;
}
function wn(e, n, t) {
  var l = e == null ? void 0 : jt(e, n);
  return l === void 0 ? t : l;
}
function Kt(e) {
  const { mergedLocaleRef: n, mergedDateLocaleRef: t } = Je(Br, null) || {}, l = Y(() => {
    var h, p;
    return (p = (h = n == null ? void 0 : n.value) === null || h === void 0 ? void 0 : h[e]) !== null && p !== void 0 ? p : Jr[e];
  });
  return { dateLocaleRef: Y(() => {
    var h;
    return (h = t == null ? void 0 : t.value) !== null && h !== void 0 ? h : Rt;
  }), localeRef: l };
}
const Ut = oe({ name: "ChevronDown", render() {
  return s("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, s("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" }));
} }), qt = Ir("clear", () => s("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, s("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, s("g", { fill: "currentColor", "fill-rule": "nonzero" }, s("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" }))))), Xt = oe({ name: "Eye", render() {
  return s("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, s("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }), s("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }));
} }), Yt = oe({ name: "EyeOff", render() {
  return s("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, s("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }), s("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }), s("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }), s("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }), s("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" }));
} }), Qt = E("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [T(">", [c("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [T("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), T("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), c("placeholder", `
 display: flex;
 `), c("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [bo({ originalTransform: "translateX(-50%) translateY(-50%)", left: "50%", top: "50%" })])])]), Ze = oe({ name: "BaseClear", props: { clsPrefix: { type: String, required: true }, show: Boolean, onClear: Function }, setup(e) {
  return eo("-base-clear", Qt, We(e, "clsPrefix")), { handleMouseDown(n) {
    n.preventDefault();
  } };
}, render() {
  const { clsPrefix: e } = this;
  return s("div", { class: `${e}-base-clear` }, s(mo, null, { default: () => {
    var n, t;
    return this.show ? s("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": true }, Se(this.$slots.icon, () => [s(Re, { clsPrefix: e }, { default: () => s(qt, null) })])) : s("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (t = (n = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(n));
  } }));
} }), Zt = oe({ name: "InternalSelectionSuffix", props: { clsPrefix: { type: String, required: true }, showArrow: { type: Boolean, default: void 0 }, showClear: { type: Boolean, default: void 0 }, loading: { type: Boolean, default: false }, onClear: Function }, setup(e, { slots: n }) {
  return () => {
    const { clsPrefix: t } = e;
    return s(go, { clsPrefix: t, class: `${t}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, { default: () => e.showArrow ? s(Ze, { clsPrefix: t, show: e.showClear, onClear: e.onClear }, { placeholder: () => s(Re, { clsPrefix: t, class: `${t}-base-suffix__arrow` }, { default: () => Se(n.default, () => [s(Ut, null)]) }) }) : null });
  };
} }), { cubicBezierEaseInOut: te } = _r;
function Jt({ duration: e = ".2s", delay: n = ".1s" } = {}) {
  return [T("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", { opacity: 1 }), T("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), T("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${te},
 max-width ${e} ${te} ${n},
 margin-left ${e} ${te} ${n},
 margin-right ${e} ${te} ${n};
 `), T("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${te} ${n},
 max-width ${e} ${te},
 margin-left ${e} ${te},
 margin-right ${e} ${te};
 `)];
}
const en = E("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), on = oe({ name: "BaseWave", props: { clsPrefix: { type: String, required: true } }, setup(e) {
  eo("-base-wave", en, We(e, "clsPrefix"));
  const n = H(null), t = H(false);
  let l = null;
  return Ar(() => {
    l !== null && window.clearTimeout(l);
  }), { active: t, selfRef: n, play() {
    l !== null && (window.clearTimeout(l), t.value = false, l = null), Ye(() => {
      var d;
      (d = n.value) === null || d === void 0 || d.offsetHeight, t.value = true, l = window.setTimeout(() => {
        t.value = false, l = null;
      }, 1e3);
    });
  } };
}, render() {
  const { clsPrefix: e } = this;
  return s("div", { ref: "selfRef", "aria-hidden": true, class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`] });
} }), rn = Ie && "chrome" in window;
Ie && navigator.userAgent.includes("Firefox");
const $o = Ie && navigator.userAgent.includes("Safari") && !rn, tn = { paddingTiny: "0 8px", paddingSmall: "0 10px", paddingMedium: "0 12px", paddingLarge: "0 14px", clearSize: "16px" };
function nn(e) {
  const { textColor2: n, textColor3: t, textColorDisabled: l, primaryColor: d, primaryColorHover: h, inputColor: p, inputColorDisabled: i, borderColor: x, warningColor: D, warningColorHover: k, errorColor: b, errorColorHover: L, borderRadius: m, lineHeight: v, fontSizeTiny: C, fontSizeSmall: z, fontSizeMedium: g, fontSizeLarge: q, heightTiny: R, heightSmall: N, heightMedium: f, heightLarge: w, actionColor: G, clearColor: a, clearColorHover: W, clearColorPressed: B, placeholderColor: I, placeholderColorDisabled: j, iconColor: V, iconColorDisabled: ee, iconColorHover: Q, iconColorPressed: Z, fontWeight: X } = e;
  return Object.assign(Object.assign({}, tn), { fontWeight: X, countTextColorDisabled: l, countTextColor: t, heightTiny: R, heightSmall: N, heightMedium: f, heightLarge: w, fontSizeTiny: C, fontSizeSmall: z, fontSizeMedium: g, fontSizeLarge: q, lineHeight: v, lineHeightTextarea: v, borderRadius: m, iconSize: "16px", groupLabelColor: G, groupLabelTextColor: n, textColor: n, textColorDisabled: l, textDecorationColor: n, caretColor: d, placeholderColor: I, placeholderColorDisabled: j, color: p, colorDisabled: i, colorFocus: p, groupLabelBorder: `1px solid ${x}`, border: `1px solid ${x}`, borderHover: `1px solid ${h}`, borderDisabled: `1px solid ${x}`, borderFocus: `1px solid ${h}`, boxShadowFocus: `0 0 0 2px ${de(d, { alpha: 0.2 })}`, loadingColor: d, loadingColorWarning: D, borderWarning: `1px solid ${D}`, borderHoverWarning: `1px solid ${k}`, colorFocusWarning: p, borderFocusWarning: `1px solid ${k}`, boxShadowFocusWarning: `0 0 0 2px ${de(D, { alpha: 0.2 })}`, caretColorWarning: D, loadingColorError: b, borderError: `1px solid ${b}`, borderHoverError: `1px solid ${L}`, colorFocusError: p, borderFocusError: `1px solid ${L}`, boxShadowFocusError: `0 0 0 2px ${de(b, { alpha: 0.2 })}`, caretColorError: b, clearColor: a, clearColorHover: W, clearColorPressed: B, iconColor: V, iconColorDisabled: ee, iconColorHover: Q, iconColorPressed: Z, suffixTextColor: n });
}
const an = Hr({ name: "Input", common: xo, peers: { Scrollbar: Lr }, self: nn }), zo = yo("n-input"), ln = E("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [c("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `), c("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `), c("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [T("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), T("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), T("&:-webkit-autofill ~", [c("placeholder", "display: none;")])]), O("round", [se("textarea", "border-radius: calc(var(--n-height) / 2);")]), c("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [T("span", `
 width: 100%;
 display: inline-block;
 `)]), O("textarea", [c("placeholder", "overflow: visible;")]), se("autosize", "width: 100%;"), O("autosize", [c("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]), E("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `), c("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `), c("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [T("&[type=password]::-ms-reveal", "display: none;"), T("+", [c("placeholder", `
 display: flex;
 align-items: center; 
 `)])]), se("textarea", [c("placeholder", "white-space: nowrap;")]), c("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `), O("textarea", "width: 100%;", [E("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), O("resizable", [E("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), c("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `), c("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]), O("pair", [c("input-el, placeholder", "text-align: center;"), c("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [E("icon", `
 color: var(--n-icon-color);
 `), E("base-icon", `
 color: var(--n-icon-color);
 `)])]), O("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [c("border", "border: var(--n-border-disabled);"), c("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), c("placeholder", "color: var(--n-placeholder-color-disabled);"), c("separator", "color: var(--n-text-color-disabled);", [E("icon", `
 color: var(--n-icon-color-disabled);
 `), E("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), E("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), c("suffix, prefix", "color: var(--n-text-color-disabled);", [E("icon", `
 color: var(--n-icon-color-disabled);
 `), E("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]), se("disabled", [c("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [T("&:hover", `
 color: var(--n-icon-color-hover);
 `), T("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), T("&:hover", [c("state-border", "border: var(--n-border-hover);")]), O("focus", "background-color: var(--n-color-focus);", [c("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), c("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), c("state-border", `
 border-color: #0000;
 z-index: 1;
 `), c("prefix", "margin-right: 4px;"), c("suffix", `
 margin-left: 4px;
 `), c("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [E("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), E("base-clear", `
 font-size: var(--n-icon-size);
 `, [c("placeholder", [E("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), T(">", [E("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), E("base-icon", `
 font-size: var(--n-icon-size);
 `)]), E("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `), ["warning", "error"].map((e) => O(`${e}-status`, [se("disabled", [E("base-loading", `
 color: var(--n-loading-color-${e})
 `), c("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), c("state-border", `
 border: var(--n-border-${e});
 `), T("&:hover", [c("state-border", `
 border: var(--n-border-hover-${e});
 `)]), T("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [c("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), O("focus", `
 background-color: var(--n-color-focus-${e});
 `, [c("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), sn = E("input", [O("disabled", [c("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);
function dn(e) {
  let n = 0;
  for (const t of e) n++;
  return n;
}
function De(e) {
  return e === "" || e == null;
}
function cn(e) {
  const n = H(null);
  function t() {
    const { value: h } = e;
    if (!(h == null ? void 0 : h.focus)) {
      d();
      return;
    }
    const { selectionStart: p, selectionEnd: i, value: x } = h;
    if (p == null || i == null) {
      d();
      return;
    }
    n.value = { start: p, end: i, beforeText: x.slice(0, p), afterText: x.slice(i) };
  }
  function l() {
    var h;
    const { value: p } = n, { value: i } = e;
    if (!p || !i) return;
    const { value: x } = i, { start: D, beforeText: k, afterText: b } = p;
    let L = x.length;
    if (x.endsWith(b)) L = x.length - b.length;
    else if (x.startsWith(k)) L = k.length;
    else {
      const m = k[D - 1], v = x.indexOf(m, D - 1);
      v !== -1 && (L = v + 1);
    }
    (h = i.setSelectionRange) === null || h === void 0 || h.call(i, L, L);
  }
  function d() {
    n.value = null;
  }
  return Ee(e, d), { recordCursor: t, restoreCursor: l };
}
const ho = oe({ name: "InputWordCount", setup(e, { slots: n }) {
  const { mergedValueRef: t, maxlengthRef: l, mergedClsPrefixRef: d, countGraphemesRef: h } = Je(zo), p = Y(() => {
    const { value: i } = t;
    return i === null || Array.isArray(i) ? 0 : (h.value || dn)(i);
  });
  return () => {
    const { value: i } = l, { value: x } = t;
    return s("span", { class: `${d.value}-input-word-count` }, Xr(n.default, { value: x === null || Array.isArray(x) ? "" : x }, () => [i === void 0 ? p.value : `${p.value} / ${i}`]));
  };
} }), un = Object.assign(Object.assign({}, Be.props), { bordered: { type: Boolean, default: void 0 }, type: { type: String, default: "text" }, placeholder: [Array, String], defaultValue: { type: [String, Array], default: null }, value: [String, Array], disabled: { type: Boolean, default: void 0 }, size: String, rows: { type: [Number, String], default: 3 }, round: Boolean, minlength: [String, Number], maxlength: [String, Number], clearable: Boolean, autosize: { type: [Boolean, Object], default: false }, pair: Boolean, separator: String, readonly: { type: [String, Boolean], default: false }, passivelyActivated: Boolean, showPasswordOn: String, stateful: { type: Boolean, default: true }, autofocus: Boolean, inputProps: Object, resizable: { type: Boolean, default: true }, showCount: Boolean, loading: { type: Boolean, default: void 0 }, allowInput: Function, renderCount: Function, onMousedown: Function, onKeydown: Function, onKeyup: [Function, Array], onInput: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onClick: [Function, Array], onChange: [Function, Array], onClear: [Function, Array], countGraphemes: Function, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], textDecoration: [String, Array], attrSize: { type: Number, default: 20 }, onInputBlur: [Function, Array], onInputFocus: [Function, Array], onDeactivate: [Function, Array], onActivate: [Function, Array], onWrapperFocus: [Function, Array], onWrapperBlur: [Function, Array], internalDeactivateOnEnter: Boolean, internalForceFocus: Boolean, internalLoadingBeforeSuffix: { type: Boolean, default: true }, showPasswordToggle: Boolean }), Pn = oe({ name: "Input", props: un, slots: Object, setup(e) {
  const { mergedClsPrefixRef: n, mergedBorderedRef: t, inlineThemeDisabled: l, mergedRtlRef: d, mergedComponentPropsRef: h } = Co(e), p = Be("Input", "-input", ln, an, e, n);
  $o && eo("-input-safari", sn, n);
  const i = H(null), x = H(null), D = H(null), k = H(null), b = H(null), L = H(null), m = H(null), v = cn(m), C = H(null), { localeRef: z } = Kt("Input"), g = H(e.defaultValue), q = We(e, "value"), R = Yr(q, g), N = To(e, { mergedSize: (o) => {
    var r, u;
    const { size: $ } = e;
    if ($) return $;
    const { mergedSize: M } = o || {};
    if (M == null ? void 0 : M.value) return M.value;
    const S = (u = (r = h == null ? void 0 : h.value) === null || r === void 0 ? void 0 : r.Input) === null || u === void 0 ? void 0 : u.size;
    return S || "medium";
  } }), { mergedSizeRef: f, mergedDisabledRef: w, mergedStatusRef: G } = N, a = H(false), W = H(false), B = H(false), I = H(false);
  let j = null;
  const V = Y(() => {
    const { placeholder: o, pair: r } = e;
    return r ? Array.isArray(o) ? o : o === void 0 ? ["", ""] : [o, o] : o === void 0 ? [z.value.placeholder] : [o];
  }), ee = Y(() => {
    const { value: o } = B, { value: r } = R, { value: u } = V;
    return !o && (De(r) || Array.isArray(r) && De(r[0])) && u[0];
  }), Q = Y(() => {
    const { value: o } = B, { value: r } = R, { value: u } = V;
    return !o && u[1] && (De(r) || Array.isArray(r) && De(r[1]));
  }), Z = Qe(() => e.internalForceFocus || a.value), X = Qe(() => {
    if (w.value || e.readonly || !e.clearable || !Z.value && !W.value) return false;
    const { value: o } = R, { value: r } = Z;
    return e.pair ? !!(Array.isArray(o) && (o[0] || o[1])) && (W.value || r) : !!o && (W.value || r);
  }), F = Y(() => {
    const { showPasswordOn: o } = e;
    if (o) return o;
    if (e.showPasswordToggle) return "click";
  }), re = H(false), me = Y(() => {
    const { textDecoration: o } = e;
    return o ? Array.isArray(o) ? o.map((r) => ({ textDecoration: r })) : [{ textDecoration: o }] : ["", ""];
  }), J = H(void 0), _e = () => {
    var o, r;
    if (e.type === "textarea") {
      const { autosize: u } = e;
      if (u && (J.value = (r = (o = C.value) === null || o === void 0 ? void 0 : o.$el) === null || r === void 0 ? void 0 : r.offsetWidth), !x.value || typeof u == "boolean") return;
      const { paddingTop: $, paddingBottom: M, lineHeight: S } = window.getComputedStyle(x.value), ne = Number($.slice(0, -2)), ae = Number(M.slice(0, -2)), ie = Number(S.slice(0, -2)), { value: ye } = D;
      if (!ye) return;
      if (u.minRows) {
        const Ce = Math.max(u.minRows, 1), qe = `${ne + ae + ie * Ce}px`;
        ye.style.minHeight = qe;
      }
      if (u.maxRows) {
        const Ce = `${ne + ae + ie * u.maxRows}px`;
        ye.style.maxHeight = Ce;
      }
    }
  }, Te = Y(() => {
    const { maxlength: o } = e;
    return o === void 0 ? void 0 : Number(o);
  });
  Gr(() => {
    const { value: o } = R;
    Array.isArray(o) || Ue(o);
  });
  const Ae = jr().proxy;
  function ce(o, r) {
    const { onUpdateValue: u, "onUpdate:value": $, onInput: M } = e, { nTriggerFormInput: S } = N;
    u && U(u, o, r), $ && U($, o, r), M && U(M, o, r), g.value = o, S();
  }
  function ue(o, r) {
    const { onChange: u } = e, { nTriggerFormChange: $ } = N;
    u && U(u, o, r), g.value = o, $();
  }
  function _(o) {
    const { onBlur: r } = e, { nTriggerFormBlur: u } = N;
    r && U(r, o), u();
  }
  function he(o) {
    const { onFocus: r } = e, { nTriggerFormFocus: u } = N;
    r && U(r, o), u();
  }
  function $e(o) {
    const { onClear: r } = e;
    r && U(r, o);
  }
  function P(o) {
    const { onInputBlur: r } = e;
    r && U(r, o);
  }
  function ge(o) {
    const { onInputFocus: r } = e;
    r && U(r, o);
  }
  function xe() {
    const { onDeactivate: o } = e;
    o && U(o);
  }
  function He() {
    const { onActivate: o } = e;
    o && U(o);
  }
  function Le(o) {
    const { onClick: r } = e;
    r && U(r, o);
  }
  function Ve(o) {
    const { onWrapperFocus: r } = e;
    r && U(r, o);
  }
  function Oe(o) {
    const { onWrapperBlur: r } = e;
    r && U(r, o);
  }
  function Ne() {
    B.value = true;
  }
  function Ge(o) {
    B.value = false, o.target === L.value ? fe(o, 1) : fe(o, 0);
  }
  function fe(o, r = 0, u = "input") {
    const $ = o.target.value;
    if (Ue($), o instanceof InputEvent && !o.isComposing && (B.value = false), e.type === "textarea") {
      const { value: S } = C;
      S && S.syncUnifiedContainer();
    }
    if (j = $, B.value) return;
    v.recordCursor();
    const M = je($);
    if (M) if (!e.pair) u === "input" ? ce($, { source: r }) : ue($, { source: r });
    else {
      let { value: S } = R;
      Array.isArray(S) ? S = [S[0], S[1]] : S = ["", ""], S[r] = $, u === "input" ? ce(S, { source: r }) : ue(S, { source: r });
    }
    Ae.$forceUpdate(), M || Ye(v.restoreCursor);
  }
  function je(o) {
    const { countGraphemes: r, maxlength: u, minlength: $ } = e;
    if (r) {
      let S;
      if (u !== void 0 && (S === void 0 && (S = r(o)), S > Number(u)) || $ !== void 0 && (S === void 0 && (S = r(o)), S < Number(u))) return false;
    }
    const { allowInput: M } = e;
    return typeof M == "function" ? M(o) : true;
  }
  function A(o) {
    P(o), o.relatedTarget === i.value && xe(), o.relatedTarget !== null && (o.relatedTarget === b.value || o.relatedTarget === L.value || o.relatedTarget === x.value) || (I.value = false), ze(o, "blur"), m.value = null;
  }
  function K(o, r) {
    ge(o), a.value = true, I.value = true, He(), ze(o, "focus"), r === 0 ? m.value = b.value : r === 1 ? m.value = L.value : r === 2 && (m.value = x.value);
  }
  function ve(o) {
    e.passivelyActivated && (Oe(o), ze(o, "blur"));
  }
  function Fo(o) {
    e.passivelyActivated && (a.value = true, Ve(o), ze(o, "focus"));
  }
  function ze(o, r) {
    o.relatedTarget !== null && (o.relatedTarget === b.value || o.relatedTarget === L.value || o.relatedTarget === x.value || o.relatedTarget === i.value) || (r === "focus" ? (he(o), a.value = true) : r === "blur" && (_(o), a.value = false));
  }
  function Mo(o, r) {
    fe(o, r, "change");
  }
  function Do(o) {
    Le(o);
  }
  function ko(o) {
    $e(o), ro();
  }
  function ro() {
    e.pair ? (ce(["", ""], { source: "clear" }), ue(["", ""], { source: "clear" })) : (ce("", { source: "clear" }), ue("", { source: "clear" }));
  }
  function Eo(o) {
    const { onMousedown: r } = e;
    r && r(o);
    const { tagName: u } = o.target;
    if (u !== "INPUT" && u !== "TEXTAREA") {
      if (e.resizable) {
        const { value: $ } = i;
        if ($) {
          const { left: M, top: S, width: ne, height: ae } = $.getBoundingClientRect(), ie = 14;
          if (M + ne - ie < o.clientX && o.clientX < M + ne && S + ae - ie < o.clientY && o.clientY < S + ae) return;
        }
      }
      o.preventDefault(), a.value || to();
    }
  }
  function Ro() {
    var o;
    W.value = true, e.type === "textarea" && ((o = C.value) === null || o === void 0 || o.handleMouseEnterWrapper());
  }
  function Wo() {
    var o;
    W.value = false, e.type === "textarea" && ((o = C.value) === null || o === void 0 || o.handleMouseLeaveWrapper());
  }
  function Bo() {
    w.value || F.value === "click" && (re.value = !re.value);
  }
  function Io(o) {
    if (w.value) return;
    o.preventDefault();
    const r = ($) => {
      $.preventDefault(), so("mouseup", document, r);
    };
    if (lo("mouseup", document, r), F.value !== "mousedown") return;
    re.value = true;
    const u = () => {
      re.value = false, so("mouseup", document, u);
    };
    lo("mouseup", document, u);
  }
  function _o(o) {
    e.onKeyup && U(e.onKeyup, o);
  }
  function Ao(o) {
    switch (e.onKeydown && U(e.onKeydown, o), o.key) {
      case "Escape":
        Ke();
        break;
      case "Enter":
        Ho(o);
        break;
    }
  }
  function Ho(o) {
    var r, u;
    if (e.passivelyActivated) {
      const { value: $ } = I;
      if ($) {
        e.internalDeactivateOnEnter && Ke();
        return;
      }
      o.preventDefault(), e.type === "textarea" ? (r = x.value) === null || r === void 0 || r.focus() : (u = b.value) === null || u === void 0 || u.focus();
    }
  }
  function Ke() {
    e.passivelyActivated && (I.value = false, Ye(() => {
      var o;
      (o = i.value) === null || o === void 0 || o.focus();
    }));
  }
  function to() {
    var o, r, u;
    w.value || (e.passivelyActivated ? (o = i.value) === null || o === void 0 || o.focus() : ((r = x.value) === null || r === void 0 || r.focus(), (u = b.value) === null || u === void 0 || u.focus()));
  }
  function Lo() {
    var o;
    !((o = i.value) === null || o === void 0) && o.contains(document.activeElement) && document.activeElement.blur();
  }
  function Vo() {
    var o, r;
    (o = x.value) === null || o === void 0 || o.select(), (r = b.value) === null || r === void 0 || r.select();
  }
  function Oo() {
    w.value || (x.value ? x.value.focus() : b.value && b.value.focus());
  }
  function No() {
    const { value: o } = i;
    (o == null ? void 0 : o.contains(document.activeElement)) && o !== document.activeElement && Ke();
  }
  function Go(o) {
    if (e.type === "textarea") {
      const { value: r } = x;
      r == null ? void 0 : r.scrollTo(o);
    } else {
      const { value: r } = b;
      r == null ? void 0 : r.scrollTo(o);
    }
  }
  function Ue(o) {
    const { type: r, pair: u, autosize: $ } = e;
    if (!u && $) if (r === "textarea") {
      const { value: M } = D;
      M && (M.textContent = `${o ?? ""}\r
`);
    } else {
      const { value: M } = k;
      M && (o ? M.textContent = o : M.innerHTML = "&nbsp;");
    }
  }
  function jo() {
    _e();
  }
  const no = H({ top: "0" });
  function Ko(o) {
    var r;
    const { scrollTop: u } = o.target;
    no.value.top = `${-u}px`, (r = C.value) === null || r === void 0 || r.syncUnifiedContainer();
  }
  let Fe = null;
  io(() => {
    const { autosize: o, type: r } = e;
    o && r === "textarea" ? Fe = Ee(R, (u) => {
      !Array.isArray(u) && u !== j && Ue(u);
    }) : Fe == null ? void 0 : Fe();
  });
  let Me = null;
  io(() => {
    e.type === "textarea" ? Me = Ee(R, (o) => {
      var r;
      !Array.isArray(o) && o !== j && ((r = C.value) === null || r === void 0 || r.syncUnifiedContainer());
    }) : Me == null ? void 0 : Me();
  }), Ur(zo, { mergedValueRef: R, maxlengthRef: Te, mergedClsPrefixRef: n, countGraphemesRef: We(e, "countGraphemes") });
  const Uo = { wrapperElRef: i, inputElRef: b, textareaElRef: x, isCompositing: B, clear: ro, focus: to, blur: Lo, select: Vo, deactivate: No, activate: Oo, scrollTo: Go }, qo = wo("Input", d, n), ao = Y(() => {
    const { value: o } = f, { common: { cubicBezierEaseInOut: r }, self: { color: u, borderRadius: $, textColor: M, caretColor: S, caretColorError: ne, caretColorWarning: ae, textDecorationColor: ie, border: ye, borderDisabled: Ce, borderHover: qe, borderFocus: Xo, placeholderColor: Yo, placeholderColorDisabled: Qo, lineHeightTextarea: Zo, colorDisabled: Jo, colorFocus: er, textColorDisabled: or, boxShadowFocus: rr, iconSize: tr, colorFocusWarning: nr, boxShadowFocusWarning: ar, borderWarning: ir, borderFocusWarning: lr, borderHoverWarning: sr, colorFocusError: dr, boxShadowFocusError: cr, borderError: ur, borderFocusError: hr, borderHoverError: fr, clearSize: vr, clearColor: pr, clearColorHover: br, clearColorPressed: mr, iconColor: gr, iconColorDisabled: xr, suffixTextColor: yr, countTextColor: Cr, countTextColorDisabled: wr, iconColorHover: Pr, iconColorPressed: Sr, loadingColor: Tr, loadingColorError: $r, loadingColorWarning: zr, fontWeight: Fr, [y("padding", o)]: Mr, [y("fontSize", o)]: Dr, [y("height", o)]: kr } } = p.value, { left: Er, right: Rr } = Kr(Mr);
    return { "--n-bezier": r, "--n-count-text-color": Cr, "--n-count-text-color-disabled": wr, "--n-color": u, "--n-font-size": Dr, "--n-font-weight": Fr, "--n-border-radius": $, "--n-height": kr, "--n-padding-left": Er, "--n-padding-right": Rr, "--n-text-color": M, "--n-caret-color": S, "--n-text-decoration-color": ie, "--n-border": ye, "--n-border-disabled": Ce, "--n-border-hover": qe, "--n-border-focus": Xo, "--n-placeholder-color": Yo, "--n-placeholder-color-disabled": Qo, "--n-icon-size": tr, "--n-line-height-textarea": Zo, "--n-color-disabled": Jo, "--n-color-focus": er, "--n-text-color-disabled": or, "--n-box-shadow-focus": rr, "--n-loading-color": Tr, "--n-caret-color-warning": ae, "--n-color-focus-warning": nr, "--n-box-shadow-focus-warning": ar, "--n-border-warning": ir, "--n-border-focus-warning": lr, "--n-border-hover-warning": sr, "--n-loading-color-warning": zr, "--n-caret-color-error": ne, "--n-color-focus-error": dr, "--n-box-shadow-focus-error": cr, "--n-border-error": ur, "--n-border-focus-error": hr, "--n-border-hover-error": fr, "--n-loading-color-error": $r, "--n-clear-color": pr, "--n-clear-size": vr, "--n-clear-color-hover": br, "--n-clear-color-pressed": mr, "--n-icon-color": gr, "--n-icon-color-hover": Pr, "--n-icon-color-pressed": Sr, "--n-icon-color-disabled": xr, "--n-suffix-text-color": yr };
  }), pe = l ? Po("input", Y(() => {
    const { value: o } = f;
    return o[0];
  }), ao, e) : void 0;
  return Object.assign(Object.assign({}, Uo), { wrapperElRef: i, inputElRef: b, inputMirrorElRef: k, inputEl2Ref: L, textareaElRef: x, textareaMirrorElRef: D, textareaScrollbarInstRef: C, rtlEnabled: qo, uncontrolledValue: g, mergedValue: R, passwordVisible: re, mergedPlaceholder: V, showPlaceholder1: ee, showPlaceholder2: Q, mergedFocus: Z, isComposing: B, activated: I, showClearButton: X, mergedSize: f, mergedDisabled: w, textDecorationStyle: me, mergedClsPrefix: n, mergedBordered: t, mergedShowPasswordOn: F, placeholderStyle: no, mergedStatus: G, textAreaScrollContainerWidth: J, handleTextAreaScroll: Ko, handleCompositionStart: Ne, handleCompositionEnd: Ge, handleInput: fe, handleInputBlur: A, handleInputFocus: K, handleWrapperBlur: ve, handleWrapperFocus: Fo, handleMouseEnter: Ro, handleMouseLeave: Wo, handleMouseDown: Eo, handleChange: Mo, handleClick: Do, handleClear: ko, handlePasswordToggleClick: Bo, handlePasswordToggleMousedown: Io, handleWrapperKeydown: Ao, handleWrapperKeyup: _o, handleTextAreaMirrorResize: jo, getTextareaScrollContainer: () => x.value, mergedTheme: p, cssVars: l ? void 0 : ao, themeClass: pe == null ? void 0 : pe.themeClass, onRender: pe == null ? void 0 : pe.onRender });
}, render() {
  var e, n, t, l, d, h, p;
  const { mergedClsPrefix: i, mergedStatus: x, themeClass: D, type: k, countGraphemes: b, onRender: L } = this, m = this.$slots;
  return L == null ? void 0 : L(), s("div", { ref: "wrapperElRef", class: [`${i}-input`, `${i}-input--${this.mergedSize}-size`, D, x && `${i}-input--${x}-status`, { [`${i}-input--rtl`]: this.rtlEnabled, [`${i}-input--disabled`]: this.mergedDisabled, [`${i}-input--textarea`]: k === "textarea", [`${i}-input--resizable`]: this.resizable && !this.autosize, [`${i}-input--autosize`]: this.autosize, [`${i}-input--round`]: this.round && k !== "textarea", [`${i}-input--pair`]: this.pair, [`${i}-input--focus`]: this.mergedFocus, [`${i}-input--stateful`]: this.stateful }], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.handleWrapperKeyup, onKeydown: this.handleWrapperKeydown }, s("div", { class: `${i}-input-wrapper` }, be(m.prefix, (v) => v && s("div", { class: `${i}-input__prefix` }, v)), k === "textarea" ? s(Vr, { ref: "textareaScrollbarInstRef", class: `${i}-input__textarea`, container: this.getTextareaScrollContainer, theme: (n = (e = this.theme) === null || e === void 0 ? void 0 : e.peers) === null || n === void 0 ? void 0 : n.Scrollbar, themeOverrides: (l = (t = this.themeOverrides) === null || t === void 0 ? void 0 : t.peers) === null || l === void 0 ? void 0 : l.Scrollbar, triggerDisplayManually: true, useUnifiedContainer: true, internalHoistYRail: true }, { default: () => {
    var v, C;
    const { textAreaScrollContainerWidth: z } = this, g = { width: this.autosize && z && `${z}px` };
    return s(Or, null, s("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [`${i}-input__textarea-el`, (v = this.inputProps) === null || v === void 0 ? void 0 : v.class], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: b ? void 0 : this.maxlength, minlength: b ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [this.textDecorationStyle[0], (C = this.inputProps) === null || C === void 0 ? void 0 : C.style, g], onBlur: this.handleInputBlur, onFocus: (q) => {
      this.handleInputFocus(q, 2);
    }, onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })), this.showPlaceholder1 ? s("div", { class: `${i}-input__placeholder`, style: [this.placeholderStyle, g], key: "placeholder" }, this.mergedPlaceholder[0]) : null, this.autosize ? s(Nr, { onResize: this.handleTextAreaMirrorResize }, { default: () => s("div", { ref: "textareaMirrorElRef", class: `${i}-input__textarea-mirror`, key: "mirror" }) }) : null);
  } }) : s("div", { class: `${i}-input__input` }, s("input", Object.assign({ type: k === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : k }, this.inputProps, { ref: "inputElRef", class: [`${i}-input__input-el`, (d = this.inputProps) === null || d === void 0 ? void 0 : d.class], style: [this.textDecorationStyle[0], (h = this.inputProps) === null || h === void 0 ? void 0 : h.style], tabindex: this.passivelyActivated && !this.activated ? -1 : (p = this.inputProps) === null || p === void 0 ? void 0 : p.tabindex, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: b ? void 0 : this.maxlength, minlength: b ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (v) => {
    this.handleInputFocus(v, 0);
  }, onInput: (v) => {
    this.handleInput(v, 0);
  }, onChange: (v) => {
    this.handleChange(v, 0);
  } })), this.showPlaceholder1 ? s("div", { class: `${i}-input__placeholder` }, s("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? s("div", { class: `${i}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, "\xA0") : null), !this.pair && be(m.suffix, (v) => v || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? s("div", { class: `${i}-input__suffix` }, [be(m["clear-icon-placeholder"], (C) => (this.clearable || C) && s(Ze, { clsPrefix: i, show: this.showClearButton, onClear: this.handleClear }, { placeholder: () => C, icon: () => {
    var z, g;
    return (g = (z = this.$slots)["clear-icon"]) === null || g === void 0 ? void 0 : g.call(z);
  } })), this.internalLoadingBeforeSuffix ? null : v, this.loading !== void 0 ? s(Zt, { clsPrefix: i, loading: this.loading, showArrow: false, showClear: false, style: this.cssVars }) : null, this.internalLoadingBeforeSuffix ? v : null, this.showCount && this.type !== "textarea" ? s(ho, null, { default: (C) => {
    var z;
    const { renderCount: g } = this;
    return g ? g(C) : (z = m.count) === null || z === void 0 ? void 0 : z.call(m, C);
  } }) : null, this.mergedShowPasswordOn && this.type === "password" ? s("div", { class: `${i}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? Se(m["password-visible-icon"], () => [s(Re, { clsPrefix: i }, { default: () => s(Xt, null) })]) : Se(m["password-invisible-icon"], () => [s(Re, { clsPrefix: i }, { default: () => s(Yt, null) })])) : null]) : null)), this.pair ? s("span", { class: `${i}-input__separator` }, Se(m.separator, () => [this.separator])) : null, this.pair ? s("div", { class: `${i}-input-wrapper` }, s("div", { class: `${i}-input__input` }, s("input", { ref: "inputEl2Ref", type: this.type, class: `${i}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: b ? void 0 : this.maxlength, minlength: b ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (v) => {
    this.handleInputFocus(v, 1);
  }, onInput: (v) => {
    this.handleInput(v, 1);
  }, onChange: (v) => {
    this.handleChange(v, 1);
  } }), this.showPlaceholder2 ? s("div", { class: `${i}-input__placeholder` }, s("span", null, this.mergedPlaceholder[1])) : null), be(m.suffix, (v) => (this.clearable || v) && s("div", { class: `${i}-input__suffix` }, [this.clearable && s(Ze, { clsPrefix: i, show: this.showClearButton, onClear: this.handleClear }, { icon: () => {
    var C;
    return (C = m["clear-icon"]) === null || C === void 0 ? void 0 : C.call(m);
  }, placeholder: () => {
    var C;
    return (C = m["clear-icon-placeholder"]) === null || C === void 0 ? void 0 : C.call(m);
  } }), v]))) : null, this.mergedBordered ? s("div", { class: `${i}-input__border` }) : null, this.mergedBordered ? s("div", { class: `${i}-input__state-border` }) : null, this.showCount && k === "textarea" ? s(ho, null, { default: (v) => {
    var C;
    const { renderCount: z } = this;
    return z ? z(v) : (C = m.count) === null || C === void 0 ? void 0 : C.call(m, v);
  } }) : null);
} });
function le(e) {
  return So(e, [255, 255, 255, 0.16]);
}
function ke(e) {
  return So(e, [0, 0, 0, 0.12]);
}
const hn = yo("n-button-group"), fn = { paddingTiny: "0 6px", paddingSmall: "0 10px", paddingMedium: "0 14px", paddingLarge: "0 18px", paddingRoundTiny: "0 10px", paddingRoundSmall: "0 14px", paddingRoundMedium: "0 18px", paddingRoundLarge: "0 22px", iconMarginTiny: "6px", iconMarginSmall: "6px", iconMarginMedium: "6px", iconMarginLarge: "6px", iconSizeTiny: "14px", iconSizeSmall: "18px", iconSizeMedium: "18px", iconSizeLarge: "20px", rippleDuration: ".6s" };
function vn(e) {
  const { heightTiny: n, heightSmall: t, heightMedium: l, heightLarge: d, borderRadius: h, fontSizeTiny: p, fontSizeSmall: i, fontSizeMedium: x, fontSizeLarge: D, opacityDisabled: k, textColor2: b, textColor3: L, primaryColorHover: m, primaryColorPressed: v, borderColor: C, primaryColor: z, baseColor: g, infoColor: q, infoColorHover: R, infoColorPressed: N, successColor: f, successColorHover: w, successColorPressed: G, warningColor: a, warningColorHover: W, warningColorPressed: B, errorColor: I, errorColorHover: j, errorColorPressed: V, fontWeight: ee, buttonColor2: Q, buttonColor2Hover: Z, buttonColor2Pressed: X, fontWeightStrong: F } = e;
  return Object.assign(Object.assign({}, fn), { heightTiny: n, heightSmall: t, heightMedium: l, heightLarge: d, borderRadiusTiny: h, borderRadiusSmall: h, borderRadiusMedium: h, borderRadiusLarge: h, fontSizeTiny: p, fontSizeSmall: i, fontSizeMedium: x, fontSizeLarge: D, opacityDisabled: k, colorOpacitySecondary: "0.16", colorOpacitySecondaryHover: "0.22", colorOpacitySecondaryPressed: "0.28", colorSecondary: Q, colorSecondaryHover: Z, colorSecondaryPressed: X, colorTertiary: Q, colorTertiaryHover: Z, colorTertiaryPressed: X, colorQuaternary: "#0000", colorQuaternaryHover: Z, colorQuaternaryPressed: X, color: "#0000", colorHover: "#0000", colorPressed: "#0000", colorFocus: "#0000", colorDisabled: "#0000", textColor: b, textColorTertiary: L, textColorHover: m, textColorPressed: v, textColorFocus: m, textColorDisabled: b, textColorText: b, textColorTextHover: m, textColorTextPressed: v, textColorTextFocus: m, textColorTextDisabled: b, textColorGhost: b, textColorGhostHover: m, textColorGhostPressed: v, textColorGhostFocus: m, textColorGhostDisabled: b, border: `1px solid ${C}`, borderHover: `1px solid ${m}`, borderPressed: `1px solid ${v}`, borderFocus: `1px solid ${m}`, borderDisabled: `1px solid ${C}`, rippleColor: z, colorPrimary: z, colorHoverPrimary: m, colorPressedPrimary: v, colorFocusPrimary: m, colorDisabledPrimary: z, textColorPrimary: g, textColorHoverPrimary: g, textColorPressedPrimary: g, textColorFocusPrimary: g, textColorDisabledPrimary: g, textColorTextPrimary: z, textColorTextHoverPrimary: m, textColorTextPressedPrimary: v, textColorTextFocusPrimary: m, textColorTextDisabledPrimary: b, textColorGhostPrimary: z, textColorGhostHoverPrimary: m, textColorGhostPressedPrimary: v, textColorGhostFocusPrimary: m, textColorGhostDisabledPrimary: z, borderPrimary: `1px solid ${z}`, borderHoverPrimary: `1px solid ${m}`, borderPressedPrimary: `1px solid ${v}`, borderFocusPrimary: `1px solid ${m}`, borderDisabledPrimary: `1px solid ${z}`, rippleColorPrimary: z, colorInfo: q, colorHoverInfo: R, colorPressedInfo: N, colorFocusInfo: R, colorDisabledInfo: q, textColorInfo: g, textColorHoverInfo: g, textColorPressedInfo: g, textColorFocusInfo: g, textColorDisabledInfo: g, textColorTextInfo: q, textColorTextHoverInfo: R, textColorTextPressedInfo: N, textColorTextFocusInfo: R, textColorTextDisabledInfo: b, textColorGhostInfo: q, textColorGhostHoverInfo: R, textColorGhostPressedInfo: N, textColorGhostFocusInfo: R, textColorGhostDisabledInfo: q, borderInfo: `1px solid ${q}`, borderHoverInfo: `1px solid ${R}`, borderPressedInfo: `1px solid ${N}`, borderFocusInfo: `1px solid ${R}`, borderDisabledInfo: `1px solid ${q}`, rippleColorInfo: q, colorSuccess: f, colorHoverSuccess: w, colorPressedSuccess: G, colorFocusSuccess: w, colorDisabledSuccess: f, textColorSuccess: g, textColorHoverSuccess: g, textColorPressedSuccess: g, textColorFocusSuccess: g, textColorDisabledSuccess: g, textColorTextSuccess: f, textColorTextHoverSuccess: w, textColorTextPressedSuccess: G, textColorTextFocusSuccess: w, textColorTextDisabledSuccess: b, textColorGhostSuccess: f, textColorGhostHoverSuccess: w, textColorGhostPressedSuccess: G, textColorGhostFocusSuccess: w, textColorGhostDisabledSuccess: f, borderSuccess: `1px solid ${f}`, borderHoverSuccess: `1px solid ${w}`, borderPressedSuccess: `1px solid ${G}`, borderFocusSuccess: `1px solid ${w}`, borderDisabledSuccess: `1px solid ${f}`, rippleColorSuccess: f, colorWarning: a, colorHoverWarning: W, colorPressedWarning: B, colorFocusWarning: W, colorDisabledWarning: a, textColorWarning: g, textColorHoverWarning: g, textColorPressedWarning: g, textColorFocusWarning: g, textColorDisabledWarning: g, textColorTextWarning: a, textColorTextHoverWarning: W, textColorTextPressedWarning: B, textColorTextFocusWarning: W, textColorTextDisabledWarning: b, textColorGhostWarning: a, textColorGhostHoverWarning: W, textColorGhostPressedWarning: B, textColorGhostFocusWarning: W, textColorGhostDisabledWarning: a, borderWarning: `1px solid ${a}`, borderHoverWarning: `1px solid ${W}`, borderPressedWarning: `1px solid ${B}`, borderFocusWarning: `1px solid ${W}`, borderDisabledWarning: `1px solid ${a}`, rippleColorWarning: a, colorError: I, colorHoverError: j, colorPressedError: V, colorFocusError: j, colorDisabledError: I, textColorError: g, textColorHoverError: g, textColorPressedError: g, textColorFocusError: g, textColorDisabledError: g, textColorTextError: I, textColorTextHoverError: j, textColorTextPressedError: V, textColorTextFocusError: j, textColorTextDisabledError: b, textColorGhostError: I, textColorGhostHoverError: j, textColorGhostPressedError: V, textColorGhostFocusError: j, textColorGhostDisabledError: I, borderError: `1px solid ${I}`, borderHoverError: `1px solid ${j}`, borderPressedError: `1px solid ${V}`, borderFocusError: `1px solid ${j}`, borderDisabledError: `1px solid ${I}`, rippleColorError: I, waveOpacity: "0.6", fontWeight: ee, fontWeightStrong: F });
}
const pn = { name: "Button", common: xo, self: vn }, bn = T([E("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [O("color", [c("border", { borderColor: "var(--n-border-color)" }), O("disabled", [c("border", { borderColor: "var(--n-border-color-disabled)" })]), se("disabled", [T("&:focus", [c("state-border", { borderColor: "var(--n-border-color-focus)" })]), T("&:hover", [c("state-border", { borderColor: "var(--n-border-color-hover)" })]), T("&:active", [c("state-border", { borderColor: "var(--n-border-color-pressed)" })]), O("pressed", [c("state-border", { borderColor: "var(--n-border-color-pressed)" })])])]), O("disabled", { backgroundColor: "var(--n-color-disabled)", color: "var(--n-text-color-disabled)" }, [c("border", { border: "var(--n-border-disabled)" })]), se("disabled", [T("&:focus", { backgroundColor: "var(--n-color-focus)", color: "var(--n-text-color-focus)" }, [c("state-border", { border: "var(--n-border-focus)" })]), T("&:hover", { backgroundColor: "var(--n-color-hover)", color: "var(--n-text-color-hover)" }, [c("state-border", { border: "var(--n-border-hover)" })]), T("&:active", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [c("state-border", { border: "var(--n-border-pressed)" })]), O("pressed", { backgroundColor: "var(--n-color-pressed)", color: "var(--n-text-color-pressed)" }, [c("state-border", { border: "var(--n-border-pressed)" })])]), O("loading", "cursor: wait;"), E("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [O("active", { zIndex: 1, animationName: "button-wave-spread, button-wave-opacity" })]), Ie && "MozBoxSizing" in document.createElement("div").style ? T("&::moz-focus-inner", { border: 0 }) : null, c("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), c("border", `
 border: var(--n-border);
 `), c("state-border", `
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `), c("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [E("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [bo({ top: "50%", originalTransform: "translateY(-50%)" })]), Jt()]), c("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [T("~", [c("icon", { margin: "var(--n-icon-margin)", marginRight: 0 })])]), O("block", `
 display: flex;
 width: 100%;
 `), O("dashed", [c("border, state-border", { borderStyle: "dashed !important" })]), O("disabled", { cursor: "not-allowed", opacity: "var(--n-opacity-disabled)" })]), T("@keyframes button-wave-spread", { from: { boxShadow: "0 0 0.5px 0 var(--n-ripple-color)" }, to: { boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)" } }), T("@keyframes button-wave-opacity", { from: { opacity: "var(--n-wave-opacity)" }, to: { opacity: 0 } })]), mn = Object.assign(Object.assign({}, Be.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: { type: Boolean, default: true }, keyboard: { type: Boolean, default: true }, tag: { type: String, default: "button" }, type: { type: String, default: "default" }, dashed: Boolean, renderIcon: Function, iconPlacement: { type: String, default: "left" }, attrType: { type: String, default: "button" }, bordered: { type: Boolean, default: true }, onClick: [Function, Array], nativeFocusBehavior: { type: Boolean, default: !$o }, spinProps: Object }), gn = oe({ name: "Button", props: mn, slots: Object, setup(e) {
  const n = H(null), t = H(null), l = H(false), d = Qe(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), h = Je(hn, {}), { inlineThemeDisabled: p, mergedClsPrefixRef: i, mergedRtlRef: x, mergedComponentPropsRef: D } = Co(e), { mergedSizeRef: k } = To({}, { defaultSize: "medium", mergedSize: (f) => {
    var w, G;
    const { size: a } = e;
    if (a) return a;
    const { size: W } = h;
    if (W) return W;
    const { mergedSize: B } = f || {};
    if (B) return B.value;
    const I = (G = (w = D == null ? void 0 : D.value) === null || w === void 0 ? void 0 : w.Button) === null || G === void 0 ? void 0 : G.size;
    return I || "medium";
  } }), b = Y(() => e.focusable && !e.disabled), L = (f) => {
    var w;
    b.value || f.preventDefault(), !e.nativeFocusBehavior && (f.preventDefault(), !e.disabled && b.value && ((w = n.value) === null || w === void 0 || w.focus({ preventScroll: true })));
  }, m = (f) => {
    var w;
    if (!e.disabled && !e.loading) {
      const { onClick: G } = e;
      G && U(G, f), e.text || (w = t.value) === null || w === void 0 || w.play();
    }
  }, v = (f) => {
    switch (f.key) {
      case "Enter":
        if (!e.keyboard) return;
        l.value = false;
    }
  }, C = (f) => {
    switch (f.key) {
      case "Enter":
        if (!e.keyboard || e.loading) {
          f.preventDefault();
          return;
        }
        l.value = true;
    }
  }, z = () => {
    l.value = false;
  }, g = Be("Button", "-button", bn, pn, e, i), q = wo("Button", x, i), R = Y(() => {
    const f = g.value, { common: { cubicBezierEaseInOut: w, cubicBezierEaseOut: G }, self: a } = f, { rippleDuration: W, opacityDisabled: B, fontWeight: I, fontWeightStrong: j } = a, V = k.value, { dashed: ee, type: Q, ghost: Z, text: X, color: F, round: re, circle: me, textColor: J, secondary: _e, tertiary: Te, quaternary: Ae, strong: ce } = e, ue = { "--n-font-weight": ce ? j : I };
    let _ = { "--n-color": "initial", "--n-color-hover": "initial", "--n-color-pressed": "initial", "--n-color-focus": "initial", "--n-color-disabled": "initial", "--n-ripple-color": "initial", "--n-text-color": "initial", "--n-text-color-hover": "initial", "--n-text-color-pressed": "initial", "--n-text-color-focus": "initial", "--n-text-color-disabled": "initial" };
    const he = Q === "tertiary", $e = Q === "default", P = he ? "default" : Q;
    if (X) {
      const A = J || F;
      _ = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": "#0000", "--n-text-color": A || a[y("textColorText", P)], "--n-text-color-hover": A ? le(A) : a[y("textColorTextHover", P)], "--n-text-color-pressed": A ? ke(A) : a[y("textColorTextPressed", P)], "--n-text-color-focus": A ? le(A) : a[y("textColorTextHover", P)], "--n-text-color-disabled": A || a[y("textColorTextDisabled", P)] };
    } else if (Z || ee) {
      const A = J || F;
      _ = { "--n-color": "#0000", "--n-color-hover": "#0000", "--n-color-pressed": "#0000", "--n-color-focus": "#0000", "--n-color-disabled": "#0000", "--n-ripple-color": F || a[y("rippleColor", P)], "--n-text-color": A || a[y("textColorGhost", P)], "--n-text-color-hover": A ? le(A) : a[y("textColorGhostHover", P)], "--n-text-color-pressed": A ? ke(A) : a[y("textColorGhostPressed", P)], "--n-text-color-focus": A ? le(A) : a[y("textColorGhostHover", P)], "--n-text-color-disabled": A || a[y("textColorGhostDisabled", P)] };
    } else if (_e) {
      const A = $e ? a.textColor : he ? a.textColorTertiary : a[y("color", P)], K = F || A, ve = Q !== "default" && Q !== "tertiary";
      _ = { "--n-color": ve ? de(K, { alpha: Number(a.colorOpacitySecondary) }) : a.colorSecondary, "--n-color-hover": ve ? de(K, { alpha: Number(a.colorOpacitySecondaryHover) }) : a.colorSecondaryHover, "--n-color-pressed": ve ? de(K, { alpha: Number(a.colorOpacitySecondaryPressed) }) : a.colorSecondaryPressed, "--n-color-focus": ve ? de(K, { alpha: Number(a.colorOpacitySecondaryHover) }) : a.colorSecondaryHover, "--n-color-disabled": a.colorSecondary, "--n-ripple-color": "#0000", "--n-text-color": K, "--n-text-color-hover": K, "--n-text-color-pressed": K, "--n-text-color-focus": K, "--n-text-color-disabled": K };
    } else if (Te || Ae) {
      const A = $e ? a.textColor : he ? a.textColorTertiary : a[y("color", P)], K = F || A;
      Te ? (_["--n-color"] = a.colorTertiary, _["--n-color-hover"] = a.colorTertiaryHover, _["--n-color-pressed"] = a.colorTertiaryPressed, _["--n-color-focus"] = a.colorSecondaryHover, _["--n-color-disabled"] = a.colorTertiary) : (_["--n-color"] = a.colorQuaternary, _["--n-color-hover"] = a.colorQuaternaryHover, _["--n-color-pressed"] = a.colorQuaternaryPressed, _["--n-color-focus"] = a.colorQuaternaryHover, _["--n-color-disabled"] = a.colorQuaternary), _["--n-ripple-color"] = "#0000", _["--n-text-color"] = K, _["--n-text-color-hover"] = K, _["--n-text-color-pressed"] = K, _["--n-text-color-focus"] = K, _["--n-text-color-disabled"] = K;
    } else _ = { "--n-color": F || a[y("color", P)], "--n-color-hover": F ? le(F) : a[y("colorHover", P)], "--n-color-pressed": F ? ke(F) : a[y("colorPressed", P)], "--n-color-focus": F ? le(F) : a[y("colorFocus", P)], "--n-color-disabled": F || a[y("colorDisabled", P)], "--n-ripple-color": F || a[y("rippleColor", P)], "--n-text-color": J || (F ? a.textColorPrimary : he ? a.textColorTertiary : a[y("textColor", P)]), "--n-text-color-hover": J || (F ? a.textColorHoverPrimary : a[y("textColorHover", P)]), "--n-text-color-pressed": J || (F ? a.textColorPressedPrimary : a[y("textColorPressed", P)]), "--n-text-color-focus": J || (F ? a.textColorFocusPrimary : a[y("textColorFocus", P)]), "--n-text-color-disabled": J || (F ? a.textColorDisabledPrimary : a[y("textColorDisabled", P)]) };
    let ge = { "--n-border": "initial", "--n-border-hover": "initial", "--n-border-pressed": "initial", "--n-border-focus": "initial", "--n-border-disabled": "initial" };
    X ? ge = { "--n-border": "none", "--n-border-hover": "none", "--n-border-pressed": "none", "--n-border-focus": "none", "--n-border-disabled": "none" } : ge = { "--n-border": a[y("border", P)], "--n-border-hover": a[y("borderHover", P)], "--n-border-pressed": a[y("borderPressed", P)], "--n-border-focus": a[y("borderFocus", P)], "--n-border-disabled": a[y("borderDisabled", P)] };
    const { [y("height", V)]: xe, [y("fontSize", V)]: He, [y("padding", V)]: Le, [y("paddingRound", V)]: Ve, [y("iconSize", V)]: Oe, [y("borderRadius", V)]: Ne, [y("iconMargin", V)]: Ge, waveOpacity: fe } = a, je = { "--n-width": me && !X ? xe : "initial", "--n-height": X ? "initial" : xe, "--n-font-size": He, "--n-padding": me || X ? "initial" : re ? Ve : Le, "--n-icon-size": Oe, "--n-icon-margin": Ge, "--n-border-radius": X ? "initial" : me || re ? xe : Ne };
    return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": w, "--n-bezier-ease-out": G, "--n-ripple-duration": W, "--n-opacity-disabled": B, "--n-wave-opacity": fe }, ue), _), ge), je);
  }), N = p ? Po("button", Y(() => {
    let f = "";
    const { dashed: w, type: G, ghost: a, text: W, color: B, round: I, circle: j, textColor: V, secondary: ee, tertiary: Q, quaternary: Z, strong: X } = e;
    w && (f += "a"), a && (f += "b"), W && (f += "c"), I && (f += "d"), j && (f += "e"), ee && (f += "f"), Q && (f += "g"), Z && (f += "h"), X && (f += "i"), B && (f += `j${co(B)}`), V && (f += `k${co(V)}`);
    const { value: F } = k;
    return f += `l${F[0]}`, f += `m${G[0]}`, f;
  }), R, e) : void 0;
  return { selfElRef: n, waveElRef: t, mergedClsPrefix: i, mergedFocusable: b, mergedSize: k, showBorder: d, enterPressed: l, rtlEnabled: q, handleMousedown: L, handleKeydown: C, handleBlur: z, handleKeyup: v, handleClick: m, customColorCssVars: Y(() => {
    const { color: f } = e;
    if (!f) return null;
    const w = le(f);
    return { "--n-border-color": f, "--n-border-color-hover": w, "--n-border-color-pressed": ke(f), "--n-border-color-focus": w, "--n-border-color-disabled": f };
  }), cssVars: p ? void 0 : R, themeClass: N == null ? void 0 : N.themeClass, onRender: N == null ? void 0 : N.onRender };
}, render() {
  const { mergedClsPrefix: e, tag: n, onRender: t } = this;
  t == null ? void 0 : t();
  const l = be(this.$slots.default, (d) => d && s("span", { class: `${e}-button__content` }, d));
  return s(n, { ref: "selfElRef", class: [this.themeClass, `${e}-button`, `${e}-button--${this.type}-type`, `${e}-button--${this.mergedSize}-type`, this.rtlEnabled && `${e}-button--rtl`, this.disabled && `${e}-button--disabled`, this.block && `${e}-button--block`, this.enterPressed && `${e}-button--pressed`, !this.text && this.dashed && `${e}-button--dashed`, this.color && `${e}-button--color`, this.secondary && `${e}-button--secondary`, this.loading && `${e}-button--loading`, this.ghost && `${e}-button--ghost`], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown }, this.iconPlacement === "right" && l, s(qr, { width: true }, { default: () => be(this.$slots.icon, (d) => (this.loading || this.renderIcon || d) && s("span", { class: `${e}-button__icon`, style: { margin: Qr(this.$slots.default) ? "0" : "" } }, s(mo, null, { default: () => this.loading ? s(go, Object.assign({ clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }, this.spinProps)) : s("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : d) }))) }), this.iconPlacement === "left" && l, this.text ? null : s(on, { ref: "waveElRef", clsPrefix: e }), this.showBorder ? s("div", { "aria-hidden": true, class: `${e}-button__border`, style: this.customColorCssVars }) : null, this.showBorder ? s("div", { "aria-hidden": true, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null);
} }), Sn = gn;
export {
  gn as B,
  Ut as C,
  Zt as N,
  Sn as X,
  Pn as _,
  an as a,
  pn as b,
  Qe as c,
  Nt as d,
  Et as e,
  It as f,
  wn as g,
  jt as h,
  Ie as i,
  Cn as j,
  co as k,
  Gt as t,
  Kt as u
};
