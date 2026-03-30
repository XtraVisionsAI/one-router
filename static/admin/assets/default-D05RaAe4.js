import { d as k, j as a, ai as G, e as b, f as g, g as y, h as p, H as B, W as Ee, al as O, $ as Te, i as T, a as C, aB as Y, a7 as te, M as Fe, a8 as U, at as X, Z as Oe, r as F, aI as Ke, k as Be, l as ge, R as se, m as Le, aU as $e, X as je, b8 as De, t as ue, aa as Ve, z as Ue, y as H, v as J, s as ve, A as Ge, q as me, u as qe, a9 as We, b7 as Ze, n as Xe, B as Je } from "./index-BeCJuQaP.js";
import { A as Qe, D as Ye, t as eo, v as Q } from "./Dropdown-Ci2kVRZD.js";
import { a as he, c as M } from "./use-form-item-FVzrOHI4.js";
import { u as oo } from "./use-compitable-E97dXjzV.js";
import { B as to } from "./Button-VZQzYgCk.js";
const no = k({ name: "ChevronDownFilled", render() {
  return a("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, a("path", { d: "M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z", fill: "currentColor" }));
} }), ro = G("n-layout-sider"), L = G("n-menu"), xe = G("n-submenu"), ne = G("n-menu-item-group"), pe = [b("&::before", "background-color: var(--n-item-color-hover);"), p("arrow", `
 color: var(--n-arrow-color-hover);
 `), p("icon", `
 color: var(--n-item-icon-color-hover);
 `), g("menu-item-content-header", `
 color: var(--n-item-text-color-hover);
 `, [b("a", `
 color: var(--n-item-text-color-hover);
 `), p("extra", `
 color: var(--n-item-text-color-hover);
 `)])], fe = [p("icon", `
 color: var(--n-item-icon-color-hover-horizontal);
 `), g("menu-item-content-header", `
 color: var(--n-item-text-color-hover-horizontal);
 `, [b("a", `
 color: var(--n-item-text-color-hover-horizontal);
 `), p("extra", `
 color: var(--n-item-text-color-hover-horizontal);
 `)])], io = b([g("menu", `
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `, [y("horizontal", `
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `, [g("submenu", "margin: 0;"), g("menu-item", "margin: 0;"), g("menu-item-content", `
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `, [b("&::before", "display: none;"), y("selected", "border-bottom: 2px solid var(--n-border-color-horizontal)")]), g("menu-item-content", [y("selected", [p("icon", "color: var(--n-item-icon-color-active-horizontal);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-active-horizontal);
 `, [b("a", "color: var(--n-item-text-color-active-horizontal);"), p("extra", "color: var(--n-item-text-color-active-horizontal);")])]), y("child-active", `
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `, [g("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-horizontal);
 `, [b("a", `
 color: var(--n-item-text-color-child-active-horizontal);
 `), p("extra", `
 color: var(--n-item-text-color-child-active-horizontal);
 `)]), p("icon", `
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]), B("disabled", [B("selected, child-active", [b("&:focus-within", fe)]), y("selected", [E(null, [p("icon", "color: var(--n-item-icon-color-active-hover-horizontal);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-active-hover-horizontal);
 `, [b("a", "color: var(--n-item-text-color-active-hover-horizontal);"), p("extra", "color: var(--n-item-text-color-active-hover-horizontal);")])])]), y("child-active", [E(null, [p("icon", "color: var(--n-item-icon-color-child-active-hover-horizontal);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `, [b("a", "color: var(--n-item-text-color-child-active-hover-horizontal);"), p("extra", "color: var(--n-item-text-color-child-active-hover-horizontal);")])])]), E("border-bottom: 2px solid var(--n-border-color-horizontal);", fe)]), g("menu-item-content-header", [b("a", "color: var(--n-item-text-color-horizontal);")])])]), B("responsive", [g("menu-item-content-header", `
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), y("collapsed", [g("menu-item-content", [y("selected", [b("&::before", `
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]), g("menu-item-content-header", "opacity: 0;"), p("arrow", "opacity: 0;"), p("icon", "color: var(--n-item-icon-color-collapsed);")])]), g("menu-item", `
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `), g("menu-item-content", `
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [b("> *", "z-index: 1;"), b("&::before", `
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), y("disabled", `
 opacity: .45;
 cursor: not-allowed;
 `), y("collapsed", [p("arrow", "transform: rotate(0);")]), y("selected", [b("&::before", "background-color: var(--n-item-color-active);"), p("arrow", "color: var(--n-arrow-color-active);"), p("icon", "color: var(--n-item-icon-color-active);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-active);
 `, [b("a", "color: var(--n-item-text-color-active);"), p("extra", "color: var(--n-item-text-color-active);")])]), y("child-active", [g("menu-item-content-header", `
 color: var(--n-item-text-color-child-active);
 `, [b("a", `
 color: var(--n-item-text-color-child-active);
 `), p("extra", `
 color: var(--n-item-text-color-child-active);
 `)]), p("arrow", `
 color: var(--n-arrow-color-child-active);
 `), p("icon", `
 color: var(--n-item-icon-color-child-active);
 `)]), B("disabled", [B("selected, child-active", [b("&:focus-within", pe)]), y("selected", [E(null, [p("arrow", "color: var(--n-arrow-color-active-hover);"), p("icon", "color: var(--n-item-icon-color-active-hover);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-active-hover);
 `, [b("a", "color: var(--n-item-text-color-active-hover);"), p("extra", "color: var(--n-item-text-color-active-hover);")])])]), y("child-active", [E(null, [p("arrow", "color: var(--n-arrow-color-child-active-hover);"), p("icon", "color: var(--n-item-icon-color-child-active-hover);"), g("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-hover);
 `, [b("a", "color: var(--n-item-text-color-child-active-hover);"), p("extra", "color: var(--n-item-text-color-child-active-hover);")])])]), y("selected", [E(null, [b("&::before", "background-color: var(--n-item-color-active-hover);")])]), E(null, pe)]), p("icon", `
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `), p("arrow", `
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `), g("menu-item-content-header", `
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `, [b("a", `
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `, [b("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), p("extra", `
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]), g("submenu", `
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `, [g("menu-item-content", `
 height: var(--n-item-height);
 `), g("submenu-children", `
 overflow: hidden;
 padding: 0;
 `, [Ee({ duration: ".2s" })])]), g("menu-item-group", [g("menu-item-group-title", `
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]), g("menu-tooltip", [b("a", `
 color: inherit;
 text-decoration: none;
 `)]), g("menu-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);
function E(e, r) {
  return [y("hover", e, r), b("&:hover", e, r)];
}
const be = k({ name: "MenuOptionContent", props: { collapsed: Boolean, disabled: Boolean, title: [String, Function], icon: Function, extra: [String, Function], showArrow: Boolean, childActive: Boolean, hover: Boolean, paddingLeft: Number, selected: Boolean, maxIconSize: { type: Number, required: true }, activeIconSize: { type: Number, required: true }, iconMarginRight: { type: Number, required: true }, clsPrefix: { type: String, required: true }, onClick: Function, tmNode: { type: Object, required: true }, isEllipsisPlaceholder: Boolean }, setup(e) {
  const { props: r } = T(L);
  return { menuProps: r, style: C(() => {
    const { paddingLeft: n } = e;
    return { paddingLeft: n && `${n}px` };
  }), iconStyle: C(() => {
    const { maxIconSize: n, activeIconSize: s, iconMarginRight: c } = e;
    return { width: `${n}px`, height: `${n}px`, fontSize: `${s}px`, marginRight: `${c}px` };
  }) };
}, render() {
  const { clsPrefix: e, tmNode: r, menuProps: { renderIcon: n, renderLabel: s, renderExtra: c, expandIcon: d } } = this, m = n ? n(r.rawNode) : O(this.icon);
  return a("div", { onClick: (x) => {
    var u;
    (u = this.onClick) === null || u === void 0 || u.call(this, x);
  }, role: "none", class: [`${e}-menu-item-content`, { [`${e}-menu-item-content--selected`]: this.selected, [`${e}-menu-item-content--collapsed`]: this.collapsed, [`${e}-menu-item-content--child-active`]: this.childActive, [`${e}-menu-item-content--disabled`]: this.disabled, [`${e}-menu-item-content--hover`]: this.hover }], style: this.style }, m && a("div", { class: `${e}-menu-item-content__icon`, style: this.iconStyle, role: "none" }, [m]), a("div", { class: `${e}-menu-item-content-header`, role: "none" }, this.isEllipsisPlaceholder ? this.title : s ? s(r.rawNode) : O(this.title), this.extra || c ? a("span", { class: `${e}-menu-item-content-header__extra` }, " ", c ? c(r.rawNode) : O(this.extra)) : null), this.showArrow ? a(Te, { ariaHidden: true, class: `${e}-menu-item-content__arrow`, clsPrefix: e }, { default: () => d ? d(r.rawNode) : a(no, null) }) : null);
} }), V = 8;
function re(e) {
  const r = T(L), { props: n, mergedCollapsedRef: s } = r, c = T(xe, null), d = T(ne, null), m = C(() => n.mode === "horizontal"), x = C(() => m.value ? n.dropdownPlacement : "tmNodes" in e ? "right-start" : "right"), u = C(() => {
    var v;
    return Math.max((v = n.collapsedIconSize) !== null && v !== void 0 ? v : n.iconSize, n.iconSize);
  }), f = C(() => {
    var v;
    return !m.value && e.root && s.value && (v = n.collapsedIconSize) !== null && v !== void 0 ? v : n.iconSize;
  }), R = C(() => {
    if (m.value) return;
    const { collapsedWidth: v, indent: w, rootIndent: A } = n, { root: S, isGroup: P } = e, _ = A === void 0 ? w : A;
    return S ? s.value ? v / 2 - u.value / 2 : _ : d && typeof d.paddingLeftRef.value == "number" ? w / 2 + d.paddingLeftRef.value : c && typeof c.paddingLeftRef.value == "number" ? (P ? w / 2 : w) + c.paddingLeftRef.value : 0;
  }), I = C(() => {
    const { collapsedWidth: v, indent: w, rootIndent: A } = n, { value: S } = u, { root: P } = e;
    return m.value || !P || !s.value ? V : (A === void 0 ? w : A) + S + V - (v + S) / 2;
  });
  return { dropdownPlacement: x, activeIconSize: f, maxIconSize: u, paddingLeft: R, iconMarginRight: I, NMenu: r, NSubmenu: c, NMenuOptionGroup: d };
}
const ie = { internalKey: { type: [String, Number], required: true }, root: Boolean, isGroup: Boolean, level: { type: Number, required: true }, title: [String, Function], extra: [String, Function] }, lo = k({ name: "MenuDivider", setup() {
  const e = T(L), { mergedClsPrefixRef: r, isHorizontalRef: n } = e;
  return () => n.value ? null : a("div", { class: `${r.value}-menu-divider` });
} }), Ce = Object.assign(Object.assign({}, ie), { tmNode: { type: Object, required: true }, disabled: Boolean, icon: Function, onClick: Function }), ao = te(Ce), co = k({ name: "MenuOption", props: Ce, setup(e) {
  const r = re(e), { NSubmenu: n, NMenu: s, NMenuOptionGroup: c } = r, { props: d, mergedClsPrefixRef: m, mergedCollapsedRef: x } = s, u = n ? n.mergedDisabledRef : c ? c.mergedDisabledRef : { value: false }, f = C(() => u.value || e.disabled);
  function R(v) {
    const { onClick: w } = e;
    w && w(v);
  }
  function I(v) {
    f.value || (s.doSelect(e.internalKey, e.tmNode.rawNode), R(v));
  }
  return { mergedClsPrefix: m, dropdownPlacement: r.dropdownPlacement, paddingLeft: r.paddingLeft, iconMarginRight: r.iconMarginRight, maxIconSize: r.maxIconSize, activeIconSize: r.activeIconSize, mergedTheme: s.mergedThemeRef, menuProps: d, dropdownEnabled: Y(() => e.root && x.value && d.mode !== "horizontal" && !f.value), selected: Y(() => s.mergedValueRef.value === e.internalKey), mergedDisabled: f, handleClick: I };
}, render() {
  const { mergedClsPrefix: e, mergedTheme: r, tmNode: n, menuProps: { renderLabel: s, nodeProps: c } } = this, d = c == null ? void 0 : c(n.rawNode);
  return a("div", Object.assign({}, d, { role: "menuitem", class: [`${e}-menu-item`, d == null ? void 0 : d.class] }), a(Qe, { theme: r.peers.Tooltip, themeOverrides: r.peerOverrides.Tooltip, trigger: "hover", placement: this.dropdownPlacement, disabled: !this.dropdownEnabled || this.title === void 0, internalExtraClass: ["menu-tooltip"] }, { default: () => s ? s(n.rawNode) : O(this.title), trigger: () => a(be, { tmNode: n, clsPrefix: e, paddingLeft: this.paddingLeft, iconMarginRight: this.iconMarginRight, maxIconSize: this.maxIconSize, activeIconSize: this.activeIconSize, selected: this.selected, title: this.title, extra: this.extra, disabled: this.mergedDisabled, icon: this.icon, onClick: this.handleClick }) }));
} }), ze = Object.assign(Object.assign({}, ie), { tmNode: { type: Object, required: true }, tmNodes: { type: Array, required: true } }), so = te(ze), uo = k({ name: "MenuOptionGroup", props: ze, setup(e) {
  const r = re(e), { NSubmenu: n } = r, s = C(() => (n == null ? void 0 : n.mergedDisabledRef.value) ? true : e.tmNode.disabled);
  U(ne, { paddingLeftRef: r.paddingLeft, mergedDisabledRef: s });
  const { mergedClsPrefixRef: c, props: d } = T(L);
  return function() {
    const { value: m } = c, x = r.paddingLeft.value, { nodeProps: u } = d, f = u == null ? void 0 : u(e.tmNode.rawNode);
    return a("div", { class: `${m}-menu-item-group`, role: "group" }, a("div", Object.assign({}, f, { class: [`${m}-menu-item-group-title`, f == null ? void 0 : f.class], style: [(f == null ? void 0 : f.style) || "", x !== void 0 ? `padding-left: ${x}px;` : ""] }), O(e.title), e.extra ? a(Fe, null, " ", O(e.extra)) : null), a("div", null, e.tmNodes.map((R) => le(R, d))));
  };
} });
function ee(e) {
  return e.type === "divider" || e.type === "render";
}
function vo(e) {
  return e.type === "divider";
}
function le(e, r) {
  const { rawNode: n } = e, { show: s } = n;
  if (s === false) return null;
  if (ee(n)) return vo(n) ? a(lo, Object.assign({ key: e.key }, n.props)) : null;
  const { labelField: c } = r, { key: d, level: m, isGroup: x } = e, u = Object.assign(Object.assign({}, n), { title: n.title || n[c], extra: n.titleExtra || n.extra, key: d, internalKey: d, level: m, root: m === 0, isGroup: x });
  return e.children ? e.isGroup ? a(uo, X(u, so, { tmNode: e, tmNodes: e.children, key: d })) : a(oe, X(u, mo, { key: d, rawNodes: n[r.childrenField], tmNodes: e.children, tmNode: e })) : a(co, X(u, ao, { key: d, tmNode: e }));
}
const ye = Object.assign(Object.assign({}, ie), { rawNodes: { type: Array, default: () => [] }, tmNodes: { type: Array, default: () => [] }, tmNode: { type: Object, required: true }, disabled: Boolean, icon: Function, onClick: Function, domId: String, virtualChildActive: { type: Boolean, default: void 0 }, isEllipsisPlaceholder: Boolean }), mo = te(ye), oe = k({ name: "Submenu", props: ye, setup(e) {
  const r = re(e), { NMenu: n, NSubmenu: s } = r, { props: c, mergedCollapsedRef: d, mergedThemeRef: m } = n, x = C(() => {
    const { disabled: v } = e;
    return (s == null ? void 0 : s.mergedDisabledRef.value) || c.disabled ? true : v;
  }), u = F(false);
  U(xe, { paddingLeftRef: r.paddingLeft, mergedDisabledRef: x }), U(ne, null);
  function f() {
    const { onClick: v } = e;
    v && v();
  }
  function R() {
    x.value || (d.value || n.toggleExpand(e.internalKey), f());
  }
  function I(v) {
    u.value = v;
  }
  return { menuProps: c, mergedTheme: m, doSelect: n.doSelect, inverted: n.invertedRef, isHorizontal: n.isHorizontalRef, mergedClsPrefix: n.mergedClsPrefixRef, maxIconSize: r.maxIconSize, activeIconSize: r.activeIconSize, iconMarginRight: r.iconMarginRight, dropdownPlacement: r.dropdownPlacement, dropdownShow: u, paddingLeft: r.paddingLeft, mergedDisabled: x, mergedValue: n.mergedValueRef, childActive: Y(() => {
    var v;
    return (v = e.virtualChildActive) !== null && v !== void 0 ? v : n.activePathRef.value.includes(e.internalKey);
  }), collapsed: C(() => c.mode === "horizontal" ? false : d.value ? true : !n.mergedExpandedKeysRef.value.includes(e.internalKey)), dropdownEnabled: C(() => !x.value && (c.mode === "horizontal" || d.value)), handlePopoverShowChange: I, handleClick: R };
}, render() {
  var e;
  const { mergedClsPrefix: r, menuProps: { renderIcon: n, renderLabel: s } } = this, c = () => {
    const { isHorizontal: m, paddingLeft: x, collapsed: u, mergedDisabled: f, maxIconSize: R, activeIconSize: I, title: v, childActive: w, icon: A, handleClick: S, menuProps: { nodeProps: P }, dropdownShow: _, iconMarginRight: q, tmNode: K, mergedClsPrefix: $, isEllipsisPlaceholder: W, extra: j } = this, N = P == null ? void 0 : P(K.rawNode);
    return a("div", Object.assign({}, N, { class: [`${$}-menu-item`, N == null ? void 0 : N.class], role: "menuitem" }), a(be, { tmNode: K, paddingLeft: x, collapsed: u, disabled: f, iconMarginRight: q, maxIconSize: R, activeIconSize: I, title: v, extra: j, showArrow: !m, childActive: w, clsPrefix: $, icon: A, hover: _, onClick: S, isEllipsisPlaceholder: W }));
  }, d = () => a(Oe, null, { default: () => {
    const { tmNodes: m, collapsed: x } = this;
    return x ? null : a("div", { class: `${r}-submenu-children`, role: "menu" }, m.map((u) => le(u, this.menuProps)));
  } });
  return this.root ? a(Ye, Object.assign({ size: "large", trigger: "hover" }, (e = this.menuProps) === null || e === void 0 ? void 0 : e.dropdownProps, { themeOverrides: this.mergedTheme.peerOverrides.Dropdown, theme: this.mergedTheme.peers.Dropdown, builtinThemeOverrides: { fontSizeLarge: "14px", optionIconSizeLarge: "18px" }, value: this.mergedValue, disabled: !this.dropdownEnabled, placement: this.dropdownPlacement, keyField: this.menuProps.keyField, labelField: this.menuProps.labelField, childrenField: this.menuProps.childrenField, onUpdateShow: this.handlePopoverShowChange, options: this.rawNodes, onSelect: this.doSelect, inverted: this.inverted, renderIcon: n, renderLabel: s }), { default: () => a("div", { class: `${r}-submenu`, role: "menu", "aria-expanded": !this.collapsed, id: this.domId }, c(), this.isHorizontal ? null : d()) }) : a("div", { class: `${r}-submenu`, role: "menu", "aria-expanded": !this.collapsed, id: this.domId }, c(), d());
} }), ho = Object.assign(Object.assign({}, ge.props), { options: { type: Array, default: () => [] }, collapsed: { type: Boolean, default: void 0 }, collapsedWidth: { type: Number, default: 48 }, iconSize: { type: Number, default: 20 }, collapsedIconSize: { type: Number, default: 24 }, rootIndent: Number, indent: { type: Number, default: 32 }, labelField: { type: String, default: "label" }, keyField: { type: String, default: "key" }, childrenField: { type: String, default: "children" }, disabledField: { type: String, default: "disabled" }, defaultExpandAll: Boolean, defaultExpandedKeys: Array, expandedKeys: Array, value: [String, Number], defaultValue: { type: [String, Number], default: null }, mode: { type: String, default: "vertical" }, watchProps: { type: Array, default: void 0 }, disabled: Boolean, show: { type: Boolean, default: true }, inverted: Boolean, "onUpdate:expandedKeys": [Function, Array], onUpdateExpandedKeys: [Function, Array], onUpdateValue: [Function, Array], "onUpdate:value": [Function, Array], expandIcon: Function, renderIcon: Function, renderLabel: Function, renderExtra: Function, dropdownProps: Object, accordion: Boolean, nodeProps: Function, dropdownPlacement: { type: String, default: "bottom" }, responsive: Boolean, items: Array, onOpenNamesChange: [Function, Array], onSelect: [Function, Array], onExpandedNamesChange: [Function, Array], expandedNames: Array, defaultExpandedNames: Array }), po = k({ name: "Menu", inheritAttrs: false, props: ho, setup(e) {
  const { mergedClsPrefixRef: r, inlineThemeDisabled: n } = Be(e), s = ge("Menu", "-menu", io, De, e, r), c = T(ro, null), d = C(() => {
    var i;
    const { collapsed: h } = e;
    if (h !== void 0) return h;
    if (c) {
      const { collapseModeRef: o, collapsedRef: l } = c;
      if (o.value === "width") return (i = l.value) !== null && i !== void 0 ? i : false;
    }
    return false;
  }), m = C(() => {
    const { keyField: i, childrenField: h, disabledField: o } = e;
    return Q(e.items || e.options, { getIgnored(l) {
      return ee(l);
    }, getChildren(l) {
      return l[h];
    }, getDisabled(l) {
      return l[o];
    }, getKey(l) {
      var z;
      return (z = l[i]) !== null && z !== void 0 ? z : l.name;
    } });
  }), x = C(() => new Set(m.value.treeNodes.map((i) => i.key))), { watchProps: u } = e, f = F(null);
  (u == null ? void 0 : u.includes("defaultValue")) ? se(() => {
    f.value = e.defaultValue;
  }) : f.value = e.defaultValue;
  const R = ue(e, "value"), I = he(R, f), v = F([]), w = () => {
    v.value = e.defaultExpandAll ? m.value.getNonLeafKeys() : e.defaultExpandedNames || e.defaultExpandedKeys || m.value.getPath(I.value, { includeSelf: false }).keyPath;
  };
  (u == null ? void 0 : u.includes("defaultExpandedKeys")) ? se(w) : w();
  const A = oo(e, ["expandedNames", "expandedKeys"]), S = he(A, v), P = C(() => m.value.treeNodes), _ = C(() => m.value.getPath(I.value).keyPath);
  U(L, { props: e, mergedCollapsedRef: d, mergedThemeRef: s, mergedValueRef: I, mergedExpandedKeysRef: S, activePathRef: _, mergedClsPrefixRef: r, isHorizontalRef: C(() => e.mode === "horizontal"), invertedRef: ue(e, "inverted"), doSelect: q, toggleExpand: $ });
  function q(i, h) {
    const { "onUpdate:value": o, onUpdateValue: l, onSelect: z } = e;
    l && M(l, i, h), o && M(o, i, h), z && M(z, i, h), f.value = i;
  }
  function K(i) {
    const { "onUpdate:expandedKeys": h, onUpdateExpandedKeys: o, onExpandedNamesChange: l, onOpenNamesChange: z } = e;
    h && M(h, i), o && M(o, i), l && M(l, i), z && M(z, i), v.value = i;
  }
  function $(i) {
    const h = Array.from(S.value), o = h.findIndex((l) => l === i);
    if (~o) h.splice(o, 1);
    else {
      if (e.accordion && x.value.has(i)) {
        const l = h.findIndex((z) => x.value.has(z));
        l > -1 && h.splice(l, 1);
      }
      h.push(i);
    }
    K(h);
  }
  const W = (i) => {
    const h = m.value.getPath(i ?? I.value, { includeSelf: false }).keyPath;
    if (!h.length) return;
    const o = Array.from(S.value), l = /* @__PURE__ */ new Set([...o, ...h]);
    e.accordion && x.value.forEach((z) => {
      l.has(z) && !h.includes(z) && l.delete(z);
    }), K(Array.from(l));
  }, j = C(() => {
    const { inverted: i } = e, { common: { cubicBezierEaseInOut: h }, self: o } = s.value, { borderRadius: l, borderColorHorizontal: z, fontSize: _e, itemHeight: ke, dividerColor: Me } = o, t = { "--n-divider-color": Me, "--n-bezier": h, "--n-font-size": _e, "--n-border-color-horizontal": z, "--n-border-radius": l, "--n-item-height": ke };
    return i ? (t["--n-group-text-color"] = o.groupTextColorInverted, t["--n-color"] = o.colorInverted, t["--n-item-text-color"] = o.itemTextColorInverted, t["--n-item-text-color-hover"] = o.itemTextColorHoverInverted, t["--n-item-text-color-active"] = o.itemTextColorActiveInverted, t["--n-item-text-color-child-active"] = o.itemTextColorChildActiveInverted, t["--n-item-text-color-child-active-hover"] = o.itemTextColorChildActiveInverted, t["--n-item-text-color-active-hover"] = o.itemTextColorActiveHoverInverted, t["--n-item-icon-color"] = o.itemIconColorInverted, t["--n-item-icon-color-hover"] = o.itemIconColorHoverInverted, t["--n-item-icon-color-active"] = o.itemIconColorActiveInverted, t["--n-item-icon-color-active-hover"] = o.itemIconColorActiveHoverInverted, t["--n-item-icon-color-child-active"] = o.itemIconColorChildActiveInverted, t["--n-item-icon-color-child-active-hover"] = o.itemIconColorChildActiveHoverInverted, t["--n-item-icon-color-collapsed"] = o.itemIconColorCollapsedInverted, t["--n-item-text-color-horizontal"] = o.itemTextColorHorizontalInverted, t["--n-item-text-color-hover-horizontal"] = o.itemTextColorHoverHorizontalInverted, t["--n-item-text-color-active-horizontal"] = o.itemTextColorActiveHorizontalInverted, t["--n-item-text-color-child-active-horizontal"] = o.itemTextColorChildActiveHorizontalInverted, t["--n-item-text-color-child-active-hover-horizontal"] = o.itemTextColorChildActiveHoverHorizontalInverted, t["--n-item-text-color-active-hover-horizontal"] = o.itemTextColorActiveHoverHorizontalInverted, t["--n-item-icon-color-horizontal"] = o.itemIconColorHorizontalInverted, t["--n-item-icon-color-hover-horizontal"] = o.itemIconColorHoverHorizontalInverted, t["--n-item-icon-color-active-horizontal"] = o.itemIconColorActiveHorizontalInverted, t["--n-item-icon-color-active-hover-horizontal"] = o.itemIconColorActiveHoverHorizontalInverted, t["--n-item-icon-color-child-active-horizontal"] = o.itemIconColorChildActiveHorizontalInverted, t["--n-item-icon-color-child-active-hover-horizontal"] = o.itemIconColorChildActiveHoverHorizontalInverted, t["--n-arrow-color"] = o.arrowColorInverted, t["--n-arrow-color-hover"] = o.arrowColorHoverInverted, t["--n-arrow-color-active"] = o.arrowColorActiveInverted, t["--n-arrow-color-active-hover"] = o.arrowColorActiveHoverInverted, t["--n-arrow-color-child-active"] = o.arrowColorChildActiveInverted, t["--n-arrow-color-child-active-hover"] = o.arrowColorChildActiveHoverInverted, t["--n-item-color-hover"] = o.itemColorHoverInverted, t["--n-item-color-active"] = o.itemColorActiveInverted, t["--n-item-color-active-hover"] = o.itemColorActiveHoverInverted, t["--n-item-color-active-collapsed"] = o.itemColorActiveCollapsedInverted) : (t["--n-group-text-color"] = o.groupTextColor, t["--n-color"] = o.color, t["--n-item-text-color"] = o.itemTextColor, t["--n-item-text-color-hover"] = o.itemTextColorHover, t["--n-item-text-color-active"] = o.itemTextColorActive, t["--n-item-text-color-child-active"] = o.itemTextColorChildActive, t["--n-item-text-color-child-active-hover"] = o.itemTextColorChildActiveHover, t["--n-item-text-color-active-hover"] = o.itemTextColorActiveHover, t["--n-item-icon-color"] = o.itemIconColor, t["--n-item-icon-color-hover"] = o.itemIconColorHover, t["--n-item-icon-color-active"] = o.itemIconColorActive, t["--n-item-icon-color-active-hover"] = o.itemIconColorActiveHover, t["--n-item-icon-color-child-active"] = o.itemIconColorChildActive, t["--n-item-icon-color-child-active-hover"] = o.itemIconColorChildActiveHover, t["--n-item-icon-color-collapsed"] = o.itemIconColorCollapsed, t["--n-item-text-color-horizontal"] = o.itemTextColorHorizontal, t["--n-item-text-color-hover-horizontal"] = o.itemTextColorHoverHorizontal, t["--n-item-text-color-active-horizontal"] = o.itemTextColorActiveHorizontal, t["--n-item-text-color-child-active-horizontal"] = o.itemTextColorChildActiveHorizontal, t["--n-item-text-color-child-active-hover-horizontal"] = o.itemTextColorChildActiveHoverHorizontal, t["--n-item-text-color-active-hover-horizontal"] = o.itemTextColorActiveHoverHorizontal, t["--n-item-icon-color-horizontal"] = o.itemIconColorHorizontal, t["--n-item-icon-color-hover-horizontal"] = o.itemIconColorHoverHorizontal, t["--n-item-icon-color-active-horizontal"] = o.itemIconColorActiveHorizontal, t["--n-item-icon-color-active-hover-horizontal"] = o.itemIconColorActiveHoverHorizontal, t["--n-item-icon-color-child-active-horizontal"] = o.itemIconColorChildActiveHorizontal, t["--n-item-icon-color-child-active-hover-horizontal"] = o.itemIconColorChildActiveHoverHorizontal, t["--n-arrow-color"] = o.arrowColor, t["--n-arrow-color-hover"] = o.arrowColorHover, t["--n-arrow-color-active"] = o.arrowColorActive, t["--n-arrow-color-active-hover"] = o.arrowColorActiveHover, t["--n-arrow-color-child-active"] = o.arrowColorChildActive, t["--n-arrow-color-child-active-hover"] = o.arrowColorChildActiveHover, t["--n-item-color-hover"] = o.itemColorHover, t["--n-item-color-active"] = o.itemColorActive, t["--n-item-color-active-hover"] = o.itemColorActiveHover, t["--n-item-color-active-collapsed"] = o.itemColorActiveCollapsed), t;
  }), N = n ? Le("menu", C(() => e.inverted ? "a" : "b"), j, e) : void 0, Z = $e(), ae = F(null), Ie = F(null);
  let ce = true;
  const de = () => {
    var i;
    ce ? ce = false : (i = ae.value) === null || i === void 0 || i.sync({ showAllItemsBeforeCalculate: true });
  };
  function we() {
    return document.getElementById(Z);
  }
  const D = F(-1);
  function Re(i) {
    D.value = e.options.length - i;
  }
  function Se(i) {
    i || (D.value = -1);
  }
  const Ne = C(() => {
    const i = D.value;
    return { children: i === -1 ? [] : e.options.slice(i) };
  }), Ae = C(() => {
    const { childrenField: i, disabledField: h, keyField: o } = e;
    return Q([Ne.value], { getIgnored(l) {
      return ee(l);
    }, getChildren(l) {
      return l[i];
    }, getDisabled(l) {
      return l[h];
    }, getKey(l) {
      var z;
      return (z = l[o]) !== null && z !== void 0 ? z : l.name;
    } });
  }), Pe = C(() => Q([{}]).treeNodes[0]);
  function He() {
    var i;
    if (D.value === -1) return a(oe, { root: true, level: 0, key: "__ellpisisGroupPlaceholder__", internalKey: "__ellpisisGroupPlaceholder__", title: "\xB7\xB7\xB7", tmNode: Pe.value, domId: Z, isEllipsisPlaceholder: true });
    const h = Ae.value.treeNodes[0], o = _.value, l = !!(!((i = h.children) === null || i === void 0) && i.some((z) => o.includes(z.key)));
    return a(oe, { level: 0, root: true, key: "__ellpisisGroup__", internalKey: "__ellpisisGroup__", title: "\xB7\xB7\xB7", virtualChildActive: l, tmNode: h, domId: Z, rawNodes: h.rawNode.children || [], tmNodes: h.children || [], isEllipsisPlaceholder: true });
  }
  return { mergedClsPrefix: r, controlledExpandedKeys: A, uncontrolledExpanededKeys: v, mergedExpandedKeys: S, uncontrolledValue: f, mergedValue: I, activePath: _, tmNodes: P, mergedTheme: s, mergedCollapsed: d, cssVars: n ? void 0 : j, themeClass: N == null ? void 0 : N.themeClass, overflowRef: ae, counterRef: Ie, updateCounter: () => {
  }, onResize: de, onUpdateOverflow: Se, onUpdateCount: Re, renderCounter: He, getCounter: we, onRender: N == null ? void 0 : N.onRender, showOption: W, deriveResponsiveState: de };
}, render() {
  const { mergedClsPrefix: e, mode: r, themeClass: n, onRender: s } = this;
  s == null ? void 0 : s();
  const c = () => this.tmNodes.map((u) => le(u, this.$props)), m = r === "horizontal" && this.responsive, x = () => a("div", je(this.$attrs, { role: r === "horizontal" ? "menubar" : "menu", class: [`${e}-menu`, n, `${e}-menu--${r}`, m && `${e}-menu--responsive`, this.mergedCollapsed && `${e}-menu--collapsed`], style: this.cssVars }), m ? a(eo, { ref: "overflowRef", onUpdateOverflow: this.onUpdateOverflow, getCounter: this.getCounter, onUpdateCount: this.onUpdateCount, updateCounter: this.updateCounter, style: { width: "100%", display: "flex", overflow: "hidden" } }, { default: c, counter: this.renderCounter }) : c());
  return m ? a(Ke, { onResize: this.onResize }, { default: x }) : x();
} }), fo = { style: { display: "flex", height: "100vh", background: "#0f172a", color: "#e2e8f0", overflow: "hidden" } }, go = { style: { width: "208px", display: "flex", "flex-direction": "column", background: "#1e293b", "border-right": "1px solid #334155", "flex-shrink": "0" } }, xo = { style: { padding: "12px 16px", "border-top": "1px solid #334155", display: "flex", "align-items": "center", "justify-content": "space-between" } }, bo = { style: { "font-size": "12px", color: "#94a3b8" } }, Co = { style: { flex: "1", overflow: "auto" } }, zo = { style: { padding: "24px" } }, No = k({ __name: "default", setup(e) {
  const r = Ve(), n = qe(), s = We(), c = [{ key: "/dashboard", label: "Dashboard", icon: () => a("span", { class: "i-carbon-dashboard text-base" }) }, { key: "/keys", label: "API Keys", icon: () => a("span", { class: "i-carbon-api text-base" }) }, { key: "/backends", label: "Backends", icon: () => a("span", { class: "i-carbon-server-dns text-base" }) }, { key: "/mappings", label: "Model Maps", icon: () => a("span", { class: "i-carbon-arrows-horizontal text-base" }) }, { key: "/usage", label: "Usage", icon: () => a("span", { class: "i-carbon-chart-bar text-base" }) }, { key: "/flags", label: "Flags", icon: () => a("span", { class: "i-carbon-toggle text-base" }) }], d = C(() => s.path);
  function m(u) {
    n.push(u);
  }
  function x() {
    r.logout(), n.push("/login");
  }
  return (u, f) => {
    const R = po, I = to, v = Ze("RouterView");
    return Xe(), Ue("div", fo, [H("aside", go, [f[2] || (f[2] = H("div", { style: { padding: "16px 20px", "border-bottom": "1px solid #334155" } }, [H("span", { style: { color: "#818cf8", "font-weight": "600", "font-size": "15px" } }, "one-router"), H("span", { style: { "margin-left": "8px", "font-size": "11px", color: "#94a3b8", background: "#334155", padding: "1px 6px", "border-radius": "4px" } }, "admin")], -1)), J(R, { options: c, value: ve(d), indent: 16, style: { flex: "1", "padding-top": "8px" }, "onUpdate:value": m }, null, 8, ["value"]), H("div", xo, [H("span", bo, "v" + Ge(ve(r).version || "\u2014"), 1), J(I, { size: "tiny", quaternary: "", onClick: x }, { icon: me(() => [...f[0] || (f[0] = [H("span", { class: "i-carbon-logout" }, null, -1)])]), default: me(() => [f[1] || (f[1] = Je(" Sign out ", -1))]), _: 1 })])]), H("main", Co, [H("div", zo, [J(v)])])]);
  };
} });
export {
  No as default
};
