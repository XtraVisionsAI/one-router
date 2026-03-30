import { a_ as De, bH as We, b2 as Ee, bI as gn, i as $e, c as bn, a as _, d as I, j as i, aD as yn, f as x, e as z, h as d, G as wn, N as xn, a5 as Ie, t as ge, $ as ae, I as Cn, ai as Pn, g as F, H as q, w as be, r as C, ar as Sn, M as Mn, aO as zn, k as An, l as Be, az as Tn, aB as ze, o as kn, aI as Fn, R as Ae, _ as _n, m as Rn, au as Te, ae as ke, J as me, a4 as Dn, ah as Fe, a8 as Wn } from "./index-05ypFx4P.js";
import { a as En } from "./Button-BTod08TO.js";
import { a as J, b as $n, r as re, u as In, c as P } from "./use-form-item-C0_shOgu.js";
import { a as Bn } from "./use-message-ATPVOnVB.js";
const Ln = /^(\d|\.)+$/, _e = /(\d|\.)+/;
function Yr(e, { c: o = 1, offset: r = 0, attachPx: s = true } = {}) {
  if (typeof e == "number") {
    const c = (e + r) * o;
    return c === 0 ? "0" : `${c}px`;
  } else if (typeof e == "string") if (Ln.test(e)) {
    const c = (Number(e) + r) * o;
    return s ? c === 0 ? "0" : `${c}px` : `${c}`;
  } else {
    const c = _e.exec(e);
    return c ? e.replace(_e, String((Number(c[0]) + r) * o)) : e;
  }
  return e;
}
const Vn = { name: "en-US", global: { undo: "Undo", redo: "Redo", confirm: "Confirm", clear: "Clear" }, Popconfirm: { positiveText: "Confirm", negativeText: "Cancel" }, Cascader: { placeholder: "Please Select", loading: "Loading", loadingRequiredMessage: (e) => `Please load all ${e}'s descendants before checking it.` }, Time: { dateFormat: "yyyy-MM-dd", dateTimeFormat: "yyyy-MM-dd HH:mm:ss" }, DatePicker: { yearFormat: "yyyy", monthFormat: "MMM", dayFormat: "eeeeee", yearTypeFormat: "yyyy", monthTypeFormat: "yyyy-MM", dateFormat: "yyyy-MM-dd", dateTimeFormat: "yyyy-MM-dd HH:mm:ss", quarterFormat: "yyyy-qqq", weekFormat: "YYYY-w", clear: "Clear", now: "Now", confirm: "Confirm", selectTime: "Select Time", selectDate: "Select Date", datePlaceholder: "Select Date", datetimePlaceholder: "Select Date and Time", monthPlaceholder: "Select Month", yearPlaceholder: "Select Year", quarterPlaceholder: "Select Quarter", weekPlaceholder: "Select Week", startDatePlaceholder: "Start Date", endDatePlaceholder: "End Date", startDatetimePlaceholder: "Start Date and Time", endDatetimePlaceholder: "End Date and Time", startMonthPlaceholder: "Start Month", endMonthPlaceholder: "End Month", monthBeforeYear: true, firstDayOfWeek: 6, today: "Today" }, DataTable: { checkTableAll: "Select all in the table", uncheckTableAll: "Unselect all in the table", confirm: "Confirm", clear: "Clear" }, LegacyTransfer: { sourceTitle: "Source", targetTitle: "Target" }, Transfer: { selectAll: "Select all", unselectAll: "Unselect all", clearAll: "Clear", total: (e) => `Total ${e} items`, selected: (e) => `${e} items selected` }, Empty: { description: "No Data" }, Select: { placeholder: "Please Select" }, TimePicker: { placeholder: "Select Time", positiveText: "OK", negativeText: "Cancel", now: "Now", clear: "Clear" }, Pagination: { goto: "Goto", selectionSuffix: "page" }, DynamicTags: { add: "Add" }, Log: { loading: "Loading" }, Input: { placeholder: "Please Input" }, InputNumber: { placeholder: "Please Input" }, DynamicInput: { create: "Create" }, ThemeEditor: { title: "Theme Editor", clearAllVars: "Clear All Variables", clearSearch: "Clear Search", filterCompName: "Filter Component Name", filterVarName: "Filter Variable Name", import: "Import", export: "Export", restore: "Reset to Default" }, Image: { tipPrevious: "Previous picture (\u2190)", tipNext: "Next picture (\u2192)", tipCounterclockwise: "Counterclockwise", tipClockwise: "Clockwise", tipZoomOut: "Zoom out", tipZoomIn: "Zoom in", tipDownload: "Download", tipClose: "Close (Esc)", tipOriginalSize: "Zoom to original size" }, Heatmap: { less: "less", more: "more", monthFormat: "MMM", weekdayFormat: "eee" } };
function pe(e) {
  return (o = {}) => {
    const r = o.width ? String(o.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
function X(e) {
  return (o, r) => {
    const s = (r == null ? void 0 : r.context) ? String(r.context) : "standalone";
    let c;
    if (s === "formatting" && e.formattingValues) {
      const h = e.defaultFormattingWidth || e.defaultWidth, a = (r == null ? void 0 : r.width) ? String(r.width) : h;
      c = e.formattingValues[a] || e.formattingValues[h];
    } else {
      const h = e.defaultWidth, a = (r == null ? void 0 : r.width) ? String(r.width) : e.defaultWidth;
      c = e.values[a] || e.values[h];
    }
    const u = e.argumentCallback ? e.argumentCallback(o) : o;
    return c[u];
  };
}
function Y(e) {
  return (o, r = {}) => {
    const s = r.width, c = s && e.matchPatterns[s] || e.matchPatterns[e.defaultMatchWidth], u = o.match(c);
    if (!u) return null;
    const h = u[0], a = s && e.parsePatterns[s] || e.parsePatterns[e.defaultParseWidth], v = Array.isArray(a) ? On(a, (y) => y.test(h)) : Nn(a, (y) => y.test(h));
    let A;
    A = e.valueCallback ? e.valueCallback(v) : v, A = r.valueCallback ? r.valueCallback(A) : A;
    const S = o.slice(h.length);
    return { value: A, rest: S };
  };
}
function Nn(e, o) {
  for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r) && o(e[r])) return r;
}
function On(e, o) {
  for (let r = 0; r < e.length; r++) if (o(e[r])) return r;
}
function Hn(e) {
  return (o, r = {}) => {
    const s = o.match(e.matchPattern);
    if (!s) return null;
    const c = s[0], u = o.match(e.parsePattern);
    if (!u) return null;
    let h = e.valueCallback ? e.valueCallback(u[0]) : u[0];
    h = r.valueCallback ? r.valueCallback(h) : h;
    const a = o.slice(c.length);
    return { value: h, rest: a };
  };
}
const jn = { lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" }, xSeconds: { one: "1 second", other: "{{count}} seconds" }, halfAMinute: "half a minute", lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" }, xMinutes: { one: "1 minute", other: "{{count}} minutes" }, aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" }, xHours: { one: "1 hour", other: "{{count}} hours" }, xDays: { one: "1 day", other: "{{count}} days" }, aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" }, xWeeks: { one: "1 week", other: "{{count}} weeks" }, aboutXMonths: { one: "about 1 month", other: "about {{count}} months" }, xMonths: { one: "1 month", other: "{{count}} months" }, aboutXYears: { one: "about 1 year", other: "about {{count}} years" }, xYears: { one: "1 year", other: "{{count}} years" }, overXYears: { one: "over 1 year", other: "over {{count}} years" }, almostXYears: { one: "almost 1 year", other: "almost {{count}} years" } }, Un = (e, o, r) => {
  let s;
  const c = jn[e];
  return typeof c == "string" ? s = c : o === 1 ? s = c.one : s = c.other.replace("{{count}}", o.toString()), (r == null ? void 0 : r.addSuffix) ? r.comparison && r.comparison > 0 ? "in " + s : s + " ago" : s;
}, Kn = { lastWeek: "'last' eeee 'at' p", yesterday: "'yesterday at' p", today: "'today at' p", tomorrow: "'tomorrow at' p", nextWeek: "eeee 'at' p", other: "P" }, qn = (e, o, r, s) => Kn[e], Xn = { narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"] }, Yn = { narrow: ["1", "2", "3", "4"], abbreviated: ["Q1", "Q2", "Q3", "Q4"], wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"] }, Jn = { narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, Zn = { narrow: ["S", "M", "T", "W", "T", "F", "S"], short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, Gn = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" } }, Qn = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" } }, er = (e, o) => {
  const r = Number(e), s = r % 100;
  if (s > 20 || s < 10) switch (s % 10) {
    case 1:
      return r + "st";
    case 2:
      return r + "nd";
    case 3:
      return r + "rd";
  }
  return r + "th";
}, tr = { ordinalNumber: er, era: X({ values: Xn, defaultWidth: "wide" }), quarter: X({ values: Yn, defaultWidth: "wide", argumentCallback: (e) => e - 1 }), month: X({ values: Jn, defaultWidth: "wide" }), day: X({ values: Zn, defaultWidth: "wide" }), dayPeriod: X({ values: Gn, defaultWidth: "wide", formattingValues: Qn, defaultFormattingWidth: "wide" }) }, nr = /^(\d+)(th|st|nd|rd)?/i, rr = /\d+/i, or = { narrow: /^(b|a)/i, abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i, wide: /^(before christ|before common era|anno domini|common era)/i }, ar = { any: [/^b/i, /^(a|c)/i] }, ir = { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i }, lr = { any: [/1/i, /2/i, /3/i, /4/i] }, sr = { narrow: /^[jfmasond]/i, abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i }, ur = { narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i], any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i] }, cr = { narrow: /^[smtwf]/i, short: /^(su|mo|tu|we|th|fr|sa)/i, abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i, wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i }, dr = { narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i], any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i] }, hr = { narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i, any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i }, fr = { any: { am: /^a/i, pm: /^p/i, midnight: /^mi/i, noon: /^no/i, morning: /morning/i, afternoon: /afternoon/i, evening: /evening/i, night: /night/i } }, vr = { ordinalNumber: Hn({ matchPattern: nr, parsePattern: rr, valueCallback: (e) => parseInt(e, 10) }), era: Y({ matchPatterns: or, defaultMatchWidth: "wide", parsePatterns: ar, defaultParseWidth: "any" }), quarter: Y({ matchPatterns: ir, defaultMatchWidth: "wide", parsePatterns: lr, defaultParseWidth: "any", valueCallback: (e) => e + 1 }), month: Y({ matchPatterns: sr, defaultMatchWidth: "wide", parsePatterns: ur, defaultParseWidth: "any" }), day: Y({ matchPatterns: cr, defaultMatchWidth: "wide", parsePatterns: dr, defaultParseWidth: "any" }), dayPeriod: Y({ matchPatterns: hr, defaultMatchWidth: "any", parsePatterns: fr, defaultParseWidth: "any" }) }, mr = { full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy" }, pr = { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" }, gr = { full: "{{date}} 'at' {{time}}", long: "{{date}} 'at' {{time}}", medium: "{{date}}, {{time}}", short: "{{date}}, {{time}}" }, br = { date: pe({ formats: mr, defaultWidth: "full" }), time: pe({ formats: pr, defaultWidth: "full" }), dateTime: pe({ formats: gr, defaultWidth: "full" }) }, yr = { code: "en-US", formatDistance: Un, formatLong: br, formatRelative: qn, localize: tr, match: vr, options: { weekStartsOn: 0, firstWeekContainsDate: 1 } }, wr = { name: "en-US", locale: yr };
var xr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Cr = /^\w*$/;
function Pr(e, o) {
  if (De(e)) return false;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || We(e) ? true : Cr.test(e) || !xr.test(e) || o != null && e in Object(o);
}
var Sr = "Expected a function";
function we(e, o) {
  if (typeof e != "function" || o != null && typeof o != "function") throw new TypeError(Sr);
  var r = function() {
    var s = arguments, c = o ? o.apply(this, s) : s[0], u = r.cache;
    if (u.has(c)) return u.get(c);
    var h = e.apply(this, s);
    return r.cache = u.set(c, h) || u, h;
  };
  return r.cache = new (we.Cache || Ee)(), r;
}
we.Cache = Ee;
var Mr = 500;
function zr(e) {
  var o = we(e, function(s) {
    return r.size === Mr && r.clear(), s;
  }), r = o.cache;
  return o;
}
var Ar = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Tr = /\\(\\)?/g, kr = zr(function(e) {
  var o = [];
  return e.charCodeAt(0) === 46 && o.push(""), e.replace(Ar, function(r, s, c, u) {
    o.push(c ? u.replace(Tr, "$1") : s || r);
  }), o;
});
function Fr(e, o) {
  return De(e) ? e : Pr(e, o) ? [e] : kr(gn(e));
}
function _r(e) {
  if (typeof e == "string" || We(e)) return e;
  var o = e + "";
  return o == "0" && 1 / e == -1 / 0 ? "-0" : o;
}
function Rr(e, o) {
  o = Fr(o, e);
  for (var r = 0, s = o.length; e != null && r < s; ) e = e[_r(o[r++])];
  return r && r == s ? e : void 0;
}
function Jr(e, o, r) {
  var s = e == null ? void 0 : Rr(e, o);
  return s === void 0 ? r : s;
}
function Dr(e) {
  const { mergedLocaleRef: o, mergedDateLocaleRef: r } = $e(bn, null) || {}, s = _(() => {
    var u, h;
    return (h = (u = o == null ? void 0 : o.value) === null || u === void 0 ? void 0 : u[e]) !== null && h !== void 0 ? h : Vn[e];
  });
  return { dateLocaleRef: _(() => {
    var u;
    return (u = r == null ? void 0 : r.value) !== null && u !== void 0 ? u : wr;
  }), localeRef: s };
}
const Wr = I({ name: "ChevronDown", render() {
  return i("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, i("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" }));
} }), Er = yn("clear", () => i("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, i("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, i("g", { fill: "currentColor", "fill-rule": "nonzero" }, i("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" }))))), $r = I({ name: "Eye", render() {
  return i("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, i("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }), i("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }));
} }), Ir = I({ name: "EyeOff", render() {
  return i("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, i("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }), i("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }), i("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }), i("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }), i("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" }));
} }), Br = x("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [z(">", [d("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [z("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), z("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), d("placeholder", `
 display: flex;
 `), d("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [wn({ originalTransform: "translateX(-50%) translateY(-50%)", left: "50%", top: "50%" })])])]), ye = I({ name: "BaseClear", props: { clsPrefix: { type: String, required: true }, show: Boolean, onClear: Function }, setup(e) {
  return Ie("-base-clear", Br, ge(e, "clsPrefix")), { handleMouseDown(o) {
    o.preventDefault();
  } };
}, render() {
  const { clsPrefix: e } = this;
  return i("div", { class: `${e}-base-clear` }, i(xn, null, { default: () => {
    var o, r;
    return this.show ? i("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": true }, J(this.$slots.icon, () => [i(ae, { clsPrefix: e }, { default: () => i(Er, null) })])) : i("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (r = (o = this.$slots).placeholder) === null || r === void 0 ? void 0 : r.call(o));
  } }));
} }), Lr = I({ name: "InternalSelectionSuffix", props: { clsPrefix: { type: String, required: true }, showArrow: { type: Boolean, default: void 0 }, showClear: { type: Boolean, default: void 0 }, loading: { type: Boolean, default: false }, onClear: Function }, setup(e, { slots: o }) {
  return () => {
    const { clsPrefix: r } = e;
    return i(Cn, { clsPrefix: r, class: `${r}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, { default: () => e.showArrow ? i(ye, { clsPrefix: r, show: e.showClear, onClear: e.onClear }, { placeholder: () => i(ae, { clsPrefix: r, class: `${r}-base-suffix__arrow` }, { default: () => J(o.default, () => [i(Wr, null)]) }) }) : null });
  };
} }), Le = Pn("n-input"), Vr = x("input", `
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
`, [d("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `), d("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
 `), d("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [z("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), z("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), z("&:-webkit-autofill ~", [d("placeholder", "display: none;")])]), F("round", [q("textarea", "border-radius: calc(var(--n-height) / 2);")]), d("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [z("span", `
 width: 100%;
 display: inline-block;
 `)]), F("textarea", [d("placeholder", "overflow: visible;")]), q("autosize", "width: 100%;"), F("autosize", [d("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]), x("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `), d("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `), d("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [z("&[type=password]::-ms-reveal", "display: none;"), z("+", [d("placeholder", `
 display: flex;
 align-items: center; 
 `)])]), q("textarea", [d("placeholder", "white-space: nowrap;")]), d("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `), F("textarea", "width: 100%;", [x("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), F("resizable", [x("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), d("textarea-el, textarea-mirror, placeholder", `
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
 `), d("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]), F("pair", [d("input-el, placeholder", "text-align: center;"), d("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [x("icon", `
 color: var(--n-icon-color);
 `), x("base-icon", `
 color: var(--n-icon-color);
 `)])]), F("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [d("border", "border: var(--n-border-disabled);"), d("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), d("placeholder", "color: var(--n-placeholder-color-disabled);"), d("separator", "color: var(--n-text-color-disabled);", [x("icon", `
 color: var(--n-icon-color-disabled);
 `), x("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), x("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), d("suffix, prefix", "color: var(--n-text-color-disabled);", [x("icon", `
 color: var(--n-icon-color-disabled);
 `), x("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]), q("disabled", [d("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [z("&:hover", `
 color: var(--n-icon-color-hover);
 `), z("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), z("&:hover", [d("state-border", "border: var(--n-border-hover);")]), F("focus", "background-color: var(--n-color-focus);", [d("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), d("border, state-border", `
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
 `), d("state-border", `
 border-color: #0000;
 z-index: 1;
 `), d("prefix", "margin-right: 4px;"), d("suffix", `
 margin-left: 4px;
 `), d("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [x("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), x("base-clear", `
 font-size: var(--n-icon-size);
 `, [d("placeholder", [x("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), z(">", [x("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), x("base-icon", `
 font-size: var(--n-icon-size);
 `)]), x("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `), ["warning", "error"].map((e) => F(`${e}-status`, [q("disabled", [x("base-loading", `
 color: var(--n-loading-color-${e})
 `), d("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), d("state-border", `
 border: var(--n-border-${e});
 `), z("&:hover", [d("state-border", `
 border: var(--n-border-hover-${e});
 `)]), z("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [d("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), F("focus", `
 background-color: var(--n-color-focus-${e});
 `, [d("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), Nr = x("input", [F("disabled", [d("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);
function Or(e) {
  let o = 0;
  for (const r of e) o++;
  return o;
}
function oe(e) {
  return e === "" || e == null;
}
function Hr(e) {
  const o = C(null);
  function r() {
    const { value: u } = e;
    if (!(u == null ? void 0 : u.focus)) {
      c();
      return;
    }
    const { selectionStart: h, selectionEnd: a, value: v } = u;
    if (h == null || a == null) {
      c();
      return;
    }
    o.value = { start: h, end: a, beforeText: v.slice(0, h), afterText: v.slice(a) };
  }
  function s() {
    var u;
    const { value: h } = o, { value: a } = e;
    if (!h || !a) return;
    const { value: v } = a, { start: A, beforeText: S, afterText: y } = h;
    let M = v.length;
    if (v.endsWith(y)) M = v.length - y.length;
    else if (v.startsWith(S)) M = S.length;
    else {
      const w = S[A - 1], f = v.indexOf(w, A - 1);
      f !== -1 && (M = f + 1);
    }
    (u = a.setSelectionRange) === null || u === void 0 || u.call(a, M, M);
  }
  function c() {
    o.value = null;
  }
  return be(e, c), { recordCursor: r, restoreCursor: s };
}
const Re = I({ name: "InputWordCount", setup(e, { slots: o }) {
  const { mergedValueRef: r, maxlengthRef: s, mergedClsPrefixRef: c, countGraphemesRef: u } = $e(Le), h = _(() => {
    const { value: a } = r;
    return a === null || Array.isArray(a) ? 0 : (u.value || Or)(a);
  });
  return () => {
    const { value: a } = s, { value: v } = r;
    return i("span", { class: `${c.value}-input-word-count` }, $n(o.default, { value: v === null || Array.isArray(v) ? "" : v }, () => [a === void 0 ? h.value : `${h.value} / ${a}`]));
  };
} }), jr = Object.assign(Object.assign({}, Be.props), { bordered: { type: Boolean, default: void 0 }, type: { type: String, default: "text" }, placeholder: [Array, String], defaultValue: { type: [String, Array], default: null }, value: [String, Array], disabled: { type: Boolean, default: void 0 }, size: String, rows: { type: [Number, String], default: 3 }, round: Boolean, minlength: [String, Number], maxlength: [String, Number], clearable: Boolean, autosize: { type: [Boolean, Object], default: false }, pair: Boolean, separator: String, readonly: { type: [String, Boolean], default: false }, passivelyActivated: Boolean, showPasswordOn: String, stateful: { type: Boolean, default: true }, autofocus: Boolean, inputProps: Object, resizable: { type: Boolean, default: true }, showCount: Boolean, loading: { type: Boolean, default: void 0 }, allowInput: Function, renderCount: Function, onMousedown: Function, onKeydown: Function, onKeyup: [Function, Array], onInput: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onClick: [Function, Array], onChange: [Function, Array], onClear: [Function, Array], countGraphemes: Function, status: String, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array], textDecoration: [String, Array], attrSize: { type: Number, default: 20 }, onInputBlur: [Function, Array], onInputFocus: [Function, Array], onDeactivate: [Function, Array], onActivate: [Function, Array], onWrapperFocus: [Function, Array], onWrapperBlur: [Function, Array], internalDeactivateOnEnter: Boolean, internalForceFocus: Boolean, internalLoadingBeforeSuffix: { type: Boolean, default: true }, showPasswordToggle: Boolean }), Zr = I({ name: "Input", props: jr, slots: Object, setup(e) {
  const { mergedClsPrefixRef: o, mergedBorderedRef: r, inlineThemeDisabled: s, mergedRtlRef: c, mergedComponentPropsRef: u } = An(e), h = Be("Input", "-input", Vr, Tn, e, o);
  En && Ie("-input-safari", Nr, o);
  const a = C(null), v = C(null), A = C(null), S = C(null), y = C(null), M = C(null), w = C(null), f = Hr(w), p = C(null), { localeRef: T } = Dr("Input"), k = C(e.defaultValue), ie = ge(e, "value"), R = Bn(ie, k), N = In(e, { mergedSize: (t) => {
    var n, l;
    const { size: g } = e;
    if (g) return g;
    const { mergedSize: b } = t || {};
    if (b == null ? void 0 : b.value) return b.value;
    const m = (l = (n = u == null ? void 0 : u.value) === null || n === void 0 ? void 0 : n.Input) === null || l === void 0 ? void 0 : l.size;
    return m || "medium";
  } }), { mergedSizeRef: le, mergedDisabledRef: B, mergedStatusRef: Ve } = N, L = C(false), O = C(false), D = C(false), H = C(false);
  let se = null;
  const ue = _(() => {
    const { placeholder: t, pair: n } = e;
    return n ? Array.isArray(t) ? t : t === void 0 ? ["", ""] : [t, t] : t === void 0 ? [T.value.placeholder] : [t];
  }), Ne = _(() => {
    const { value: t } = D, { value: n } = R, { value: l } = ue;
    return !t && (oe(n) || Array.isArray(n) && oe(n[0])) && l[0];
  }), Oe = _(() => {
    const { value: t } = D, { value: n } = R, { value: l } = ue;
    return !t && l[1] && (oe(n) || Array.isArray(n) && oe(n[1]));
  }), ce = ze(() => e.internalForceFocus || L.value), He = ze(() => {
    if (B.value || e.readonly || !e.clearable || !ce.value && !O.value) return false;
    const { value: t } = R, { value: n } = ce;
    return e.pair ? !!(Array.isArray(t) && (t[0] || t[1])) && (O.value || n) : !!t && (O.value || n);
  }), de = _(() => {
    const { showPasswordOn: t } = e;
    if (t) return t;
    if (e.showPasswordToggle) return "click";
  }), j = C(false), je = _(() => {
    const { textDecoration: t } = e;
    return t ? Array.isArray(t) ? t.map((n) => ({ textDecoration: n })) : [{ textDecoration: t }] : ["", ""];
  }), xe = C(void 0), Ue = () => {
    var t, n;
    if (e.type === "textarea") {
      const { autosize: l } = e;
      if (l && (xe.value = (n = (t = p.value) === null || t === void 0 ? void 0 : t.$el) === null || n === void 0 ? void 0 : n.offsetWidth), !v.value || typeof l == "boolean") return;
      const { paddingTop: g, paddingBottom: b, lineHeight: m } = window.getComputedStyle(v.value), W = Number(g.slice(0, -2)), E = Number(b.slice(0, -2)), $ = Number(m.slice(0, -2)), { value: U } = A;
      if (!U) return;
      if (l.minRows) {
        const K = Math.max(l.minRows, 1), ve = `${W + E + $ * K}px`;
        U.style.minHeight = ve;
      }
      if (l.maxRows) {
        const K = `${W + E + $ * l.maxRows}px`;
        U.style.maxHeight = K;
      }
    }
  }, Ke = _(() => {
    const { maxlength: t } = e;
    return t === void 0 ? void 0 : Number(t);
  });
  kn(() => {
    const { value: t } = R;
    Array.isArray(t) || fe(t);
  });
  const qe = Fn().proxy;
  function Z(t, n) {
    const { onUpdateValue: l, "onUpdate:value": g, onInput: b } = e, { nTriggerFormInput: m } = N;
    l && P(l, t, n), g && P(g, t, n), b && P(b, t, n), k.value = t, m();
  }
  function G(t, n) {
    const { onChange: l } = e, { nTriggerFormChange: g } = N;
    l && P(l, t, n), k.value = t, g();
  }
  function Xe(t) {
    const { onBlur: n } = e, { nTriggerFormBlur: l } = N;
    n && P(n, t), l();
  }
  function Ye(t) {
    const { onFocus: n } = e, { nTriggerFormFocus: l } = N;
    n && P(n, t), l();
  }
  function Je(t) {
    const { onClear: n } = e;
    n && P(n, t);
  }
  function Ze(t) {
    const { onInputBlur: n } = e;
    n && P(n, t);
  }
  function Ge(t) {
    const { onInputFocus: n } = e;
    n && P(n, t);
  }
  function Qe() {
    const { onDeactivate: t } = e;
    t && P(t);
  }
  function et() {
    const { onActivate: t } = e;
    t && P(t);
  }
  function tt(t) {
    const { onClick: n } = e;
    n && P(n, t);
  }
  function nt(t) {
    const { onWrapperFocus: n } = e;
    n && P(n, t);
  }
  function rt(t) {
    const { onWrapperBlur: n } = e;
    n && P(n, t);
  }
  function ot() {
    D.value = true;
  }
  function at(t) {
    D.value = false, t.target === M.value ? Q(t, 1) : Q(t, 0);
  }
  function Q(t, n = 0, l = "input") {
    const g = t.target.value;
    if (fe(g), t instanceof InputEvent && !t.isComposing && (D.value = false), e.type === "textarea") {
      const { value: m } = p;
      m && m.syncUnifiedContainer();
    }
    if (se = g, D.value) return;
    f.recordCursor();
    const b = it(g);
    if (b) if (!e.pair) l === "input" ? Z(g, { source: n }) : G(g, { source: n });
    else {
      let { value: m } = R;
      Array.isArray(m) ? m = [m[0], m[1]] : m = ["", ""], m[n] = g, l === "input" ? Z(m, { source: n }) : G(m, { source: n });
    }
    qe.$forceUpdate(), b || Te(f.restoreCursor);
  }
  function it(t) {
    const { countGraphemes: n, maxlength: l, minlength: g } = e;
    if (n) {
      let m;
      if (l !== void 0 && (m === void 0 && (m = n(t)), m > Number(l)) || g !== void 0 && (m === void 0 && (m = n(t)), m < Number(l))) return false;
    }
    const { allowInput: b } = e;
    return typeof b == "function" ? b(t) : true;
  }
  function lt(t) {
    Ze(t), t.relatedTarget === a.value && Qe(), t.relatedTarget !== null && (t.relatedTarget === y.value || t.relatedTarget === M.value || t.relatedTarget === v.value) || (H.value = false), ee(t, "blur"), w.value = null;
  }
  function st(t, n) {
    Ge(t), L.value = true, H.value = true, et(), ee(t, "focus"), n === 0 ? w.value = y.value : n === 1 ? w.value = M.value : n === 2 && (w.value = v.value);
  }
  function ut(t) {
    e.passivelyActivated && (rt(t), ee(t, "blur"));
  }
  function ct(t) {
    e.passivelyActivated && (L.value = true, nt(t), ee(t, "focus"));
  }
  function ee(t, n) {
    t.relatedTarget !== null && (t.relatedTarget === y.value || t.relatedTarget === M.value || t.relatedTarget === v.value || t.relatedTarget === a.value) || (n === "focus" ? (Ye(t), L.value = true) : n === "blur" && (Xe(t), L.value = false));
  }
  function dt(t, n) {
    Q(t, n, "change");
  }
  function ht(t) {
    tt(t);
  }
  function ft(t) {
    Je(t), Ce();
  }
  function Ce() {
    e.pair ? (Z(["", ""], { source: "clear" }), G(["", ""], { source: "clear" })) : (Z("", { source: "clear" }), G("", { source: "clear" }));
  }
  function vt(t) {
    const { onMousedown: n } = e;
    n && n(t);
    const { tagName: l } = t.target;
    if (l !== "INPUT" && l !== "TEXTAREA") {
      if (e.resizable) {
        const { value: g } = a;
        if (g) {
          const { left: b, top: m, width: W, height: E } = g.getBoundingClientRect(), $ = 14;
          if (b + W - $ < t.clientX && t.clientX < b + W && m + E - $ < t.clientY && t.clientY < m + E) return;
        }
      }
      t.preventDefault(), L.value || Pe();
    }
  }
  function mt() {
    var t;
    O.value = true, e.type === "textarea" && ((t = p.value) === null || t === void 0 || t.handleMouseEnterWrapper());
  }
  function pt() {
    var t;
    O.value = false, e.type === "textarea" && ((t = p.value) === null || t === void 0 || t.handleMouseLeaveWrapper());
  }
  function gt() {
    B.value || de.value === "click" && (j.value = !j.value);
  }
  function bt(t) {
    if (B.value) return;
    t.preventDefault();
    const n = (g) => {
      g.preventDefault(), Fe("mouseup", document, n);
    };
    if (ke("mouseup", document, n), de.value !== "mousedown") return;
    j.value = true;
    const l = () => {
      j.value = false, Fe("mouseup", document, l);
    };
    ke("mouseup", document, l);
  }
  function yt(t) {
    e.onKeyup && P(e.onKeyup, t);
  }
  function wt(t) {
    switch (e.onKeydown && P(e.onKeydown, t), t.key) {
      case "Escape":
        he();
        break;
      case "Enter":
        xt(t);
        break;
    }
  }
  function xt(t) {
    var n, l;
    if (e.passivelyActivated) {
      const { value: g } = H;
      if (g) {
        e.internalDeactivateOnEnter && he();
        return;
      }
      t.preventDefault(), e.type === "textarea" ? (n = v.value) === null || n === void 0 || n.focus() : (l = y.value) === null || l === void 0 || l.focus();
    }
  }
  function he() {
    e.passivelyActivated && (H.value = false, Te(() => {
      var t;
      (t = a.value) === null || t === void 0 || t.focus();
    }));
  }
  function Pe() {
    var t, n, l;
    B.value || (e.passivelyActivated ? (t = a.value) === null || t === void 0 || t.focus() : ((n = v.value) === null || n === void 0 || n.focus(), (l = y.value) === null || l === void 0 || l.focus()));
  }
  function Ct() {
    var t;
    !((t = a.value) === null || t === void 0) && t.contains(document.activeElement) && document.activeElement.blur();
  }
  function Pt() {
    var t, n;
    (t = v.value) === null || t === void 0 || t.select(), (n = y.value) === null || n === void 0 || n.select();
  }
  function St() {
    B.value || (v.value ? v.value.focus() : y.value && y.value.focus());
  }
  function Mt() {
    const { value: t } = a;
    (t == null ? void 0 : t.contains(document.activeElement)) && t !== document.activeElement && he();
  }
  function zt(t) {
    if (e.type === "textarea") {
      const { value: n } = v;
      n == null ? void 0 : n.scrollTo(t);
    } else {
      const { value: n } = y;
      n == null ? void 0 : n.scrollTo(t);
    }
  }
  function fe(t) {
    const { type: n, pair: l, autosize: g } = e;
    if (!l && g) if (n === "textarea") {
      const { value: b } = A;
      b && (b.textContent = `${t ?? ""}\r
`);
    } else {
      const { value: b } = S;
      b && (t ? b.textContent = t : b.innerHTML = "&nbsp;");
    }
  }
  function At() {
    Ue();
  }
  const Se = C({ top: "0" });
  function Tt(t) {
    var n;
    const { scrollTop: l } = t.target;
    Se.value.top = `${-l}px`, (n = p.value) === null || n === void 0 || n.syncUnifiedContainer();
  }
  let te = null;
  Ae(() => {
    const { autosize: t, type: n } = e;
    t && n === "textarea" ? te = be(R, (l) => {
      !Array.isArray(l) && l !== se && fe(l);
    }) : te == null ? void 0 : te();
  });
  let ne = null;
  Ae(() => {
    e.type === "textarea" ? ne = be(R, (t) => {
      var n;
      !Array.isArray(t) && t !== se && ((n = p.value) === null || n === void 0 || n.syncUnifiedContainer());
    }) : ne == null ? void 0 : ne();
  }), Wn(Le, { mergedValueRef: R, maxlengthRef: Ke, mergedClsPrefixRef: o, countGraphemesRef: ge(e, "countGraphemes") });
  const kt = { wrapperElRef: a, inputElRef: y, textareaElRef: v, isCompositing: D, clear: Ce, focus: Pe, blur: Ct, select: Pt, deactivate: Mt, activate: St, scrollTo: zt }, Ft = _n("Input", c, o), Me = _(() => {
    const { value: t } = le, { common: { cubicBezierEaseInOut: n }, self: { color: l, borderRadius: g, textColor: b, caretColor: m, caretColorError: W, caretColorWarning: E, textDecorationColor: $, border: U, borderDisabled: K, borderHover: ve, borderFocus: _t, placeholderColor: Rt, placeholderColorDisabled: Dt, lineHeightTextarea: Wt, colorDisabled: Et, colorFocus: $t, textColorDisabled: It, boxShadowFocus: Bt, iconSize: Lt, colorFocusWarning: Vt, boxShadowFocusWarning: Nt, borderWarning: Ot, borderFocusWarning: Ht, borderHoverWarning: jt, colorFocusError: Ut, boxShadowFocusError: Kt, borderError: qt, borderFocusError: Xt, borderHoverError: Yt, clearSize: Jt, clearColor: Zt, clearColorHover: Gt, clearColorPressed: Qt, iconColor: en, iconColorDisabled: tn, suffixTextColor: nn, countTextColor: rn, countTextColorDisabled: on, iconColorHover: an, iconColorPressed: ln, loadingColor: sn, loadingColorError: un, loadingColorWarning: cn, fontWeight: dn, [me("padding", t)]: hn, [me("fontSize", t)]: fn, [me("height", t)]: vn } } = h.value, { left: mn, right: pn } = Dn(hn);
    return { "--n-bezier": n, "--n-count-text-color": rn, "--n-count-text-color-disabled": on, "--n-color": l, "--n-font-size": fn, "--n-font-weight": dn, "--n-border-radius": g, "--n-height": vn, "--n-padding-left": mn, "--n-padding-right": pn, "--n-text-color": b, "--n-caret-color": m, "--n-text-decoration-color": $, "--n-border": U, "--n-border-disabled": K, "--n-border-hover": ve, "--n-border-focus": _t, "--n-placeholder-color": Rt, "--n-placeholder-color-disabled": Dt, "--n-icon-size": Lt, "--n-line-height-textarea": Wt, "--n-color-disabled": Et, "--n-color-focus": $t, "--n-text-color-disabled": It, "--n-box-shadow-focus": Bt, "--n-loading-color": sn, "--n-caret-color-warning": E, "--n-color-focus-warning": Vt, "--n-box-shadow-focus-warning": Nt, "--n-border-warning": Ot, "--n-border-focus-warning": Ht, "--n-border-hover-warning": jt, "--n-loading-color-warning": cn, "--n-caret-color-error": W, "--n-color-focus-error": Ut, "--n-box-shadow-focus-error": Kt, "--n-border-error": qt, "--n-border-focus-error": Xt, "--n-border-hover-error": Yt, "--n-loading-color-error": un, "--n-clear-color": Zt, "--n-clear-size": Jt, "--n-clear-color-hover": Gt, "--n-clear-color-pressed": Qt, "--n-icon-color": en, "--n-icon-color-hover": an, "--n-icon-color-pressed": ln, "--n-icon-color-disabled": tn, "--n-suffix-text-color": nn };
  }), V = s ? Rn("input", _(() => {
    const { value: t } = le;
    return t[0];
  }), Me, e) : void 0;
  return Object.assign(Object.assign({}, kt), { wrapperElRef: a, inputElRef: y, inputMirrorElRef: S, inputEl2Ref: M, textareaElRef: v, textareaMirrorElRef: A, textareaScrollbarInstRef: p, rtlEnabled: Ft, uncontrolledValue: k, mergedValue: R, passwordVisible: j, mergedPlaceholder: ue, showPlaceholder1: Ne, showPlaceholder2: Oe, mergedFocus: ce, isComposing: D, activated: H, showClearButton: He, mergedSize: le, mergedDisabled: B, textDecorationStyle: je, mergedClsPrefix: o, mergedBordered: r, mergedShowPasswordOn: de, placeholderStyle: Se, mergedStatus: Ve, textAreaScrollContainerWidth: xe, handleTextAreaScroll: Tt, handleCompositionStart: ot, handleCompositionEnd: at, handleInput: Q, handleInputBlur: lt, handleInputFocus: st, handleWrapperBlur: ut, handleWrapperFocus: ct, handleMouseEnter: mt, handleMouseLeave: pt, handleMouseDown: vt, handleChange: dt, handleClick: ht, handleClear: ft, handlePasswordToggleClick: gt, handlePasswordToggleMousedown: bt, handleWrapperKeydown: wt, handleWrapperKeyup: yt, handleTextAreaMirrorResize: At, getTextareaScrollContainer: () => v.value, mergedTheme: h, cssVars: s ? void 0 : Me, themeClass: V == null ? void 0 : V.themeClass, onRender: V == null ? void 0 : V.onRender });
}, render() {
  var e, o, r, s, c, u, h;
  const { mergedClsPrefix: a, mergedStatus: v, themeClass: A, type: S, countGraphemes: y, onRender: M } = this, w = this.$slots;
  return M == null ? void 0 : M(), i("div", { ref: "wrapperElRef", class: [`${a}-input`, `${a}-input--${this.mergedSize}-size`, A, v && `${a}-input--${v}-status`, { [`${a}-input--rtl`]: this.rtlEnabled, [`${a}-input--disabled`]: this.mergedDisabled, [`${a}-input--textarea`]: S === "textarea", [`${a}-input--resizable`]: this.resizable && !this.autosize, [`${a}-input--autosize`]: this.autosize, [`${a}-input--round`]: this.round && S !== "textarea", [`${a}-input--pair`]: this.pair, [`${a}-input--focus`]: this.mergedFocus, [`${a}-input--stateful`]: this.stateful }], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.handleWrapperKeyup, onKeydown: this.handleWrapperKeydown }, i("div", { class: `${a}-input-wrapper` }, re(w.prefix, (f) => f && i("div", { class: `${a}-input__prefix` }, f)), S === "textarea" ? i(Sn, { ref: "textareaScrollbarInstRef", class: `${a}-input__textarea`, container: this.getTextareaScrollContainer, theme: (o = (e = this.theme) === null || e === void 0 ? void 0 : e.peers) === null || o === void 0 ? void 0 : o.Scrollbar, themeOverrides: (s = (r = this.themeOverrides) === null || r === void 0 ? void 0 : r.peers) === null || s === void 0 ? void 0 : s.Scrollbar, triggerDisplayManually: true, useUnifiedContainer: true, internalHoistYRail: true }, { default: () => {
    var f, p;
    const { textAreaScrollContainerWidth: T } = this, k = { width: this.autosize && T && `${T}px` };
    return i(Mn, null, i("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [`${a}-input__textarea-el`, (f = this.inputProps) === null || f === void 0 ? void 0 : f.class], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: y ? void 0 : this.maxlength, minlength: y ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [this.textDecorationStyle[0], (p = this.inputProps) === null || p === void 0 ? void 0 : p.style, k], onBlur: this.handleInputBlur, onFocus: (ie) => {
      this.handleInputFocus(ie, 2);
    }, onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })), this.showPlaceholder1 ? i("div", { class: `${a}-input__placeholder`, style: [this.placeholderStyle, k], key: "placeholder" }, this.mergedPlaceholder[0]) : null, this.autosize ? i(zn, { onResize: this.handleTextAreaMirrorResize }, { default: () => i("div", { ref: "textareaMirrorElRef", class: `${a}-input__textarea-mirror`, key: "mirror" }) }) : null);
  } }) : i("div", { class: `${a}-input__input` }, i("input", Object.assign({ type: S === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : S }, this.inputProps, { ref: "inputElRef", class: [`${a}-input__input-el`, (c = this.inputProps) === null || c === void 0 ? void 0 : c.class], style: [this.textDecorationStyle[0], (u = this.inputProps) === null || u === void 0 ? void 0 : u.style], tabindex: this.passivelyActivated && !this.activated ? -1 : (h = this.inputProps) === null || h === void 0 ? void 0 : h.tabindex, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: y ? void 0 : this.maxlength, minlength: y ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (f) => {
    this.handleInputFocus(f, 0);
  }, onInput: (f) => {
    this.handleInput(f, 0);
  }, onChange: (f) => {
    this.handleChange(f, 0);
  } })), this.showPlaceholder1 ? i("div", { class: `${a}-input__placeholder` }, i("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? i("div", { class: `${a}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, "\xA0") : null), !this.pair && re(w.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? i("div", { class: `${a}-input__suffix` }, [re(w["clear-icon-placeholder"], (p) => (this.clearable || p) && i(ye, { clsPrefix: a, show: this.showClearButton, onClear: this.handleClear }, { placeholder: () => p, icon: () => {
    var T, k;
    return (k = (T = this.$slots)["clear-icon"]) === null || k === void 0 ? void 0 : k.call(T);
  } })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? i(Lr, { clsPrefix: a, loading: this.loading, showArrow: false, showClear: false, style: this.cssVars }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? i(Re, null, { default: (p) => {
    var T;
    const { renderCount: k } = this;
    return k ? k(p) : (T = w.count) === null || T === void 0 ? void 0 : T.call(w, p);
  } }) : null, this.mergedShowPasswordOn && this.type === "password" ? i("div", { class: `${a}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? J(w["password-visible-icon"], () => [i(ae, { clsPrefix: a }, { default: () => i($r, null) })]) : J(w["password-invisible-icon"], () => [i(ae, { clsPrefix: a }, { default: () => i(Ir, null) })])) : null]) : null)), this.pair ? i("span", { class: `${a}-input__separator` }, J(w.separator, () => [this.separator])) : null, this.pair ? i("div", { class: `${a}-input-wrapper` }, i("div", { class: `${a}-input__input` }, i("input", { ref: "inputEl2Ref", type: this.type, class: `${a}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: y ? void 0 : this.maxlength, minlength: y ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (f) => {
    this.handleInputFocus(f, 1);
  }, onInput: (f) => {
    this.handleInput(f, 1);
  }, onChange: (f) => {
    this.handleChange(f, 1);
  } }), this.showPlaceholder2 ? i("div", { class: `${a}-input__placeholder` }, i("span", null, this.mergedPlaceholder[1])) : null), re(w.suffix, (f) => (this.clearable || f) && i("div", { class: `${a}-input__suffix` }, [this.clearable && i(ye, { clsPrefix: a, show: this.showClearButton, onClear: this.handleClear }, { icon: () => {
    var p;
    return (p = w["clear-icon"]) === null || p === void 0 ? void 0 : p.call(w);
  }, placeholder: () => {
    var p;
    return (p = w["clear-icon-placeholder"]) === null || p === void 0 ? void 0 : p.call(w);
  } }), f]))) : null, this.mergedBordered ? i("div", { class: `${a}-input__border` }) : null, this.mergedBordered ? i("div", { class: `${a}-input__state-border` }) : null, this.showCount && S === "textarea" ? i(Re, null, { default: (f) => {
    var p;
    const { renderCount: T } = this;
    return T ? T(f) : (p = w.count) === null || p === void 0 ? void 0 : p.call(w, f);
  } }) : null);
} });
export {
  Wr as C,
  Lr as N,
  Zr as _,
  Rr as b,
  Fr as c,
  yr as e,
  Yr as f,
  Jr as g,
  Pr as i,
  _r as t,
  Dr as u
};
