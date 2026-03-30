const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C54KWarr.js","assets/route-block-B_A1xBdJ.js","assets/backends-Bn4lOUm3.js","assets/backends-BAGDnhcs.js","assets/useApi-yvWB8agy.js","assets/use-message-DGZGK5Il.js","assets/FormItem-BLFgOPpX.js","assets/get-BZTOcoVz.js","assets/Input-VFsf8aBL.js","assets/use-merged-state-CkMZ2DWG.js","assets/DataTable-DkCuQcym.js","assets/Dropdown-DwMgs0HP.js","assets/use-compitable-Cxdw_G8M.js","assets/InputNumber-ABEEFNvO.js","assets/format-bYRzmlsO.js","assets/composables-CpeOe2QS.js","assets/dashboard-DJ5a_HJi.js","assets/keys-C__mdPdz.js","assets/Statistic-B_OLFlSU.js","assets/Spin-D8G0Ra6i.js","assets/flags-jmHtsGU3.js","assets/keys-aZsi-wnb.js","assets/login-CAiJMcfH.js","assets/mappings-BboG9_9_.js","assets/usage-CySU1bOz.js","assets/default-fiezfaud.js"])))=>i.map(i=>d[i]);
let lS, lh, Nl, an, vr, Le, kS, Jw, G, ci, Hl, E0, Ht, $f, Ss, _0, he, gv, ja, Go, We, k2, Af, Jo, dP, xi, jy, H1, Q, hv, oe, dS, us, Mi, mc, Fi, ws, Ts, ai, Ps, vc, hn, wn, Di, eP, ml, Vv, hs, Qy, g1, Wu, Q2, sP, uP, pc, Ai, $d, Ad, fc, Es, St, Ff, eS, hc, bc, oS, Iu, Rf, Ar, $o, Bi, aP, Ii, tt, U2, Gb, V2, N2, y1, P0, oP, Rs, En, Bl, po, nP, Zo, pt, Tr, Dt, Y2, Bo, $i, Ie, J2, VS, o1, bs, gn, aa, r1, i1, d1, ni, tP, aC, af, ys, sC, li, K0, gf, Sn, Rr, Pr, zi, zc, uf, $r, pf, _r, rr, sf, lf, Dl, nf, $y, L0, q2, Tn, S0, rP, a1, Je, bn, ls, X2, iP, gS, L1, eg, cP, Lu, Du, tr, Zt, Oo, Dv, Mv, kv, ec, Z2, cv, Qv, Kv, rg, xs, Er, ho, fo, wi, op, lP, ep, D0, MC, we, M, te, ne, re, Ee, T, bo, gt, or, Zn, mo, Jn, kr, de, Io, Yt, G2, Ze, At, W2, Qd, j2;
let __tla = (async () => {
  (function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
    new MutationObserver((n) => {
      for (const i of n) if (i.type === "childList") for (const l of i.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function o(n) {
      const i = {};
      return n.integrity && (i.integrity = n.integrity), n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
    }
    function r(n) {
      if (n.ep) return;
      n.ep = true;
      const i = o(n);
      fetch(n.href, i);
    }
  })();
  function Gl(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const o of e.split(",")) t[o] = 1;
    return (o) => o in t;
  }
  const He = {}, pr = [], Xt = () => {
  }, Dc = () => false, di = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ui = (e) => e.startsWith("onUpdate:"), Ge = Object.assign, Ul = (e, t) => {
    const o = e.indexOf(t);
    o > -1 && e.splice(o, 1);
  }, Kp = Object.prototype.hasOwnProperty, Te = (e, t) => Kp.call(e, t), pe = Array.isArray, hr = (e) => vn(e) === "[object Map]", Lc = (e) => vn(e) === "[object Set]", Os = (e) => vn(e) === "[object Date]", me = (e) => typeof e == "function", Ne = (e) => typeof e == "string", Et = (e) => typeof e == "symbol", Se = (e) => e !== null && typeof e == "object", kc = (e) => (Se(e) || me(e)) && me(e.then) && me(e.catch), jc = Object.prototype.toString, vn = (e) => jc.call(e), qp = (e) => vn(e).slice(8, -1), Wc = (e) => vn(e) === "[object Object]", fi = (e) => Ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vr = Gl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), pi = (e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((o) => t[o] || (t[o] = e(o)));
  }, Xp = /-\w/g, ht = pi((e) => e.replace(Xp, (t) => t.slice(1).toUpperCase())), Yp = /\B([A-Z])/g, Ho = pi((e) => e.replace(Yp, "-$1").toLowerCase()), hi = pi((e) => e.charAt(0).toUpperCase() + e.slice(1)), Wi = pi((e) => e ? `on${hi(e)}` : ""), qt = (e, t) => !Object.is(e, t), Ni = (e, ...t) => {
    for (let o = 0; o < e.length; o++) e[o](...t);
  }, Nc = (e, t, o, r = false) => {
    Object.defineProperty(e, t, {
      configurable: true,
      enumerable: false,
      writable: r,
      value: o
    });
  }, Zp = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, Qp = (e) => {
    const t = Ne(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
  let Bs;
  const gi = () => Bs || (Bs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function Kl(e) {
    if (pe(e)) {
      const t = {};
      for (let o = 0; o < e.length; o++) {
        const r = e[o], n = Ne(r) ? oh(r) : Kl(r);
        if (n) for (const i in n) t[i] = n[i];
      }
      return t;
    } else if (Ne(e) || Se(e)) return e;
  }
  const Jp = /;(?![^(]*\))/g, eh = /:([^]+)/, th = /\/\*[^]*?\*\//g;
  function oh(e) {
    const t = {};
    return e.replace(th, "").split(Jp).forEach((o) => {
      if (o) {
        const r = o.split(eh);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }), t;
  }
  vr = function(e) {
    let t = "";
    if (Ne(e)) t = e;
    else if (pe(e)) for (let o = 0; o < e.length; o++) {
      const r = vr(e[o]);
      r && (t += r + " ");
    }
    else if (Se(e)) for (const o in e) e[o] && (t += o + " ");
    return t.trim();
  };
  const rh = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", nh = Gl(rh);
  function Vc(e) {
    return !!e || e === "";
  }
  function ih(e, t) {
    if (e.length !== t.length) return false;
    let o = true;
    for (let r = 0; o && r < e.length; r++) o = ql(e[r], t[r]);
    return o;
  }
  function ql(e, t) {
    if (e === t) return true;
    let o = Os(e), r = Os(t);
    if (o || r) return o && r ? e.getTime() === t.getTime() : false;
    if (o = Et(e), r = Et(t), o || r) return e === t;
    if (o = pe(e), r = pe(t), o || r) return o && r ? ih(e, t) : false;
    if (o = Se(e), r = Se(t), o || r) {
      if (!o || !r) return false;
      const n = Object.keys(e).length, i = Object.keys(t).length;
      if (n !== i) return false;
      for (const l in e) {
        const s = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
        if (s && !a || !s && a || !ql(e[l], t[l])) return false;
      }
    }
    return String(e) === String(t);
  }
  let Gc, Uc, Vi;
  Gc = (e) => !!(e && e.__v_isRef === true);
  lh = (e) => Ne(e) ? e : e == null ? "" : pe(e) || Se(e) && (e.toString === jc || !me(e.toString)) ? Gc(e) ? lh(e.value) : JSON.stringify(e, Uc, 2) : String(e);
  Uc = (e, t) => Gc(t) ? Uc(e, t.value) : hr(t) ? {
    [`Map(${t.size})`]: [
      ...t.entries()
    ].reduce((o, [r, n], i) => (o[Vi(r, i) + " =>"] = n, o), {})
  } : Lc(t) ? {
    [`Set(${t.size})`]: [
      ...t.values()
    ].map((o) => Vi(o))
  } : Et(t) ? Vi(t) : Se(t) && !pe(t) && !Wc(t) ? String(t) : t;
  Vi = (e, t = "") => {
    var o;
    return Et(e) ? `Symbol(${(o = e.description) != null ? o : t})` : e;
  };
  let nt;
  class Kc {
    constructor(t = false) {
      this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = nt, !t && nt && (this.index = (nt.scopes || (nt.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let t, o;
        if (this.scopes) for (t = 0, o = this.scopes.length; t < o; t++) this.scopes[t].pause();
        for (t = 0, o = this.effects.length; t < o; t++) this.effects[t].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let t, o;
        if (this.scopes) for (t = 0, o = this.scopes.length; t < o; t++) this.scopes[t].resume();
        for (t = 0, o = this.effects.length; t < o; t++) this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const o = nt;
        try {
          return nt = this, t();
        } finally {
          nt = o;
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = nt, nt = this);
    }
    off() {
      this._on > 0 && --this._on === 0 && (nt = this.prevScope, this.prevScope = void 0);
    }
    stop(t) {
      if (this._active) {
        this._active = false;
        let o, r;
        for (o = 0, r = this.effects.length; o < r; o++) this.effects[o].stop();
        for (this.effects.length = 0, o = 0, r = this.cleanups.length; o < r; o++) this.cleanups[o]();
        if (this.cleanups.length = 0, this.scopes) {
          for (o = 0, r = this.scopes.length; o < r; o++) this.scopes[o].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const n = this.parent.scopes.pop();
          n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index);
        }
        this.parent = void 0;
      }
    }
  }
  function qc(e) {
    return new Kc(e);
  }
  function Xc() {
    return nt;
  }
  function sh(e, t = false) {
    nt && nt.cleanups.push(e);
  }
  let Oe;
  const Gi = /* @__PURE__ */ new WeakSet();
  class Yc {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, nt && nt.active && nt.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, Gi.has(this) && (Gi.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qc(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, Fs(this), Jc(this);
      const t = Oe, o = Ot;
      Oe = this, Ot = true;
      try {
        return this.fn();
      } finally {
        ed(this), Oe = t, Ot = o, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) Zl(t);
        this.deps = this.depsTail = void 0, Fs(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? Gi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      pl(this) && this.run();
    }
    get dirty() {
      return pl(this);
    }
  }
  let Zc = 0, Gr, Ur;
  function Qc(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = Ur, Ur = e;
      return;
    }
    e.next = Gr, Gr = e;
  }
  function Xl() {
    Zc++;
  }
  function Yl() {
    if (--Zc > 0) return;
    if (Ur) {
      let t = Ur;
      for (Ur = void 0; t; ) {
        const o = t.next;
        t.next = void 0, t.flags &= -9, t = o;
      }
    }
    let e;
    for (; Gr; ) {
      let t = Gr;
      for (Gr = void 0; t; ) {
        const o = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
        t = o;
      }
    }
    if (e) throw e;
  }
  function Jc(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function ed(e) {
    let t, o = e.depsTail, r = o;
    for (; r; ) {
      const n = r.prevDep;
      r.version === -1 ? (r === o && (o = n), Zl(r), ah(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
    }
    e.deps = t, e.depsTail = o;
  }
  function pl(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (td(t.dep.computed) || t.dep.version !== t.version)) return true;
    return !!e._dirty;
  }
  function td(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tn) || (e.globalVersion = tn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !pl(e)))) return;
    e.flags |= 2;
    const t = e.dep, o = Oe, r = Ot;
    Oe = e, Ot = true;
    try {
      Jc(e);
      const n = e.fn(e._value);
      (t.version === 0 || qt(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
    } catch (n) {
      throw t.version++, n;
    } finally {
      Oe = o, Ot = r, ed(e), e.flags &= -3;
    }
  }
  function Zl(e, t = false) {
    const { dep: o, prevSub: r, nextSub: n } = e;
    if (r && (r.nextSub = n, e.prevSub = void 0), n && (n.prevSub = r, e.nextSub = void 0), o.subs === e && (o.subs = r, !r && o.computed)) {
      o.computed.flags &= -5;
      for (let i = o.computed.deps; i; i = i.nextDep) Zl(i, true);
    }
    !t && !--o.sc && o.map && o.map.delete(o.key);
  }
  function ah(e) {
    const { prevDep: t, nextDep: o } = e;
    t && (t.nextDep = o, e.prevDep = void 0), o && (o.prevDep = t, e.nextDep = void 0);
  }
  let Ot = true;
  const od = [];
  function ao() {
    od.push(Ot), Ot = false;
  }
  function co() {
    const e = od.pop();
    Ot = e === void 0 ? true : e;
  }
  function Fs(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const o = Oe;
      Oe = void 0;
      try {
        t();
      } finally {
        Oe = o;
      }
    }
  }
  let tn = 0;
  class ch {
    constructor(t, o) {
      this.sub = t, this.dep = o, this.version = o.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Ql {
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(t) {
      if (!Oe || !Ot || Oe === this.computed) return;
      let o = this.activeLink;
      if (o === void 0 || o.sub !== Oe) o = this.activeLink = new ch(Oe, this), Oe.deps ? (o.prevDep = Oe.depsTail, Oe.depsTail.nextDep = o, Oe.depsTail = o) : Oe.deps = Oe.depsTail = o, rd(o);
      else if (o.version === -1 && (o.version = this.version, o.nextDep)) {
        const r = o.nextDep;
        r.prevDep = o.prevDep, o.prevDep && (o.prevDep.nextDep = r), o.prevDep = Oe.depsTail, o.nextDep = void 0, Oe.depsTail.nextDep = o, Oe.depsTail = o, Oe.deps === o && (Oe.deps = r);
      }
      return o;
    }
    trigger(t) {
      this.version++, tn++, this.notify(t);
    }
    notify(t) {
      Xl();
      try {
        for (let o = this.subs; o; o = o.prevSub) o.sub.notify() && o.sub.dep.notify();
      } finally {
        Yl();
      }
    }
  }
  function rd(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) rd(r);
      }
      const o = e.dep.subs;
      o !== e && (e.prevSub = o, o && (o.nextSub = e)), e.dep.subs = e;
    }
  }
  const Gn = /* @__PURE__ */ new WeakMap(), Uo = Symbol(""), hl = Symbol(""), on = Symbol("");
  function it(e, t, o) {
    if (Ot && Oe) {
      let r = Gn.get(e);
      r || Gn.set(e, r = /* @__PURE__ */ new Map());
      let n = r.get(o);
      n || (r.set(o, n = new Ql()), n.map = r, n.key = o), n.track();
    }
  }
  function io(e, t, o, r, n, i) {
    const l = Gn.get(e);
    if (!l) {
      tn++;
      return;
    }
    const s = (a) => {
      a && a.trigger();
    };
    if (Xl(), t === "clear") l.forEach(s);
    else {
      const a = pe(e), d = a && fi(o);
      if (a && o === "length") {
        const c = Number(r);
        l.forEach((u, f) => {
          (f === "length" || f === on || !Et(f) && f >= c) && s(u);
        });
      } else switch ((o !== void 0 || l.has(void 0)) && s(l.get(o)), d && s(l.get(on)), t) {
        case "add":
          a ? d && s(l.get("length")) : (s(l.get(Uo)), hr(e) && s(l.get(hl)));
          break;
        case "delete":
          a || (s(l.get(Uo)), hr(e) && s(l.get(hl)));
          break;
        case "set":
          hr(e) && s(l.get(Uo));
          break;
      }
    }
    Yl();
  }
  function dh(e, t) {
    const o = Gn.get(e);
    return o && o.get(t);
  }
  function lr(e) {
    const t = xe(e);
    return t === e ? t : (it(t, "iterate", on), Tt(e) ? t : t.map(Bt));
  }
  function mi(e) {
    return it(e = xe(e), "iterate", on), e;
  }
  function Ut(e, t) {
    return uo(e) ? xr(so(e) ? Bt(t) : t) : Bt(t);
  }
  const uh = {
    __proto__: null,
    [Symbol.iterator]() {
      return Ui(this, Symbol.iterator, (e) => Ut(this, e));
    },
    concat(...e) {
      return lr(this).concat(...e.map((t) => pe(t) ? lr(t) : t));
    },
    entries() {
      return Ui(this, "entries", (e) => (e[1] = Ut(this, e[1]), e));
    },
    every(e, t) {
      return to(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
      return to(this, "filter", e, t, (o) => o.map((r) => Ut(this, r)), arguments);
    },
    find(e, t) {
      return to(this, "find", e, t, (o) => Ut(this, o), arguments);
    },
    findIndex(e, t) {
      return to(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
      return to(this, "findLast", e, t, (o) => Ut(this, o), arguments);
    },
    findLastIndex(e, t) {
      return to(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
      return to(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
      return Ki(this, "includes", e);
    },
    indexOf(...e) {
      return Ki(this, "indexOf", e);
    },
    join(e) {
      return lr(this).join(e);
    },
    lastIndexOf(...e) {
      return Ki(this, "lastIndexOf", e);
    },
    map(e, t) {
      return to(this, "map", e, t, void 0, arguments);
    },
    pop() {
      return zr(this, "pop");
    },
    push(...e) {
      return zr(this, "push", e);
    },
    reduce(e, ...t) {
      return Ms(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
      return Ms(this, "reduceRight", e, t);
    },
    shift() {
      return zr(this, "shift");
    },
    some(e, t) {
      return to(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
      return zr(this, "splice", e);
    },
    toReversed() {
      return lr(this).toReversed();
    },
    toSorted(e) {
      return lr(this).toSorted(e);
    },
    toSpliced(...e) {
      return lr(this).toSpliced(...e);
    },
    unshift(...e) {
      return zr(this, "unshift", e);
    },
    values() {
      return Ui(this, "values", (e) => Ut(this, e));
    }
  };
  function Ui(e, t, o) {
    const r = mi(e), n = r[t]();
    return r !== e && !Tt(e) && (n._next = n.next, n.next = () => {
      const i = n._next();
      return i.done || (i.value = o(i.value)), i;
    }), n;
  }
  const fh = Array.prototype;
  function to(e, t, o, r, n, i) {
    const l = mi(e), s = l !== e && !Tt(e), a = l[t];
    if (a !== fh[t]) {
      const u = a.apply(e, i);
      return s ? Bt(u) : u;
    }
    let d = o;
    l !== e && (s ? d = function(u, f) {
      return o.call(this, Ut(e, u), f, e);
    } : o.length > 2 && (d = function(u, f) {
      return o.call(this, u, f, e);
    }));
    const c = a.call(l, d, r);
    return s && n ? n(c) : c;
  }
  function Ms(e, t, o, r) {
    const n = mi(e), i = n !== e && !Tt(e);
    let l = o, s = false;
    n !== e && (i ? (s = r.length === 0, l = function(d, c, u) {
      return s && (s = false, d = Ut(e, d)), o.call(this, d, Ut(e, c), u, e);
    }) : o.length > 3 && (l = function(d, c, u) {
      return o.call(this, d, c, u, e);
    }));
    const a = n[t](l, ...r);
    return s ? Ut(e, a) : a;
  }
  function Ki(e, t, o) {
    const r = xe(e);
    it(r, "iterate", on);
    const n = r[t](...o);
    return (n === -1 || n === false) && bi(o[0]) ? (o[0] = xe(o[0]), r[t](...o)) : n;
  }
  function zr(e, t, o = []) {
    ao(), Xl();
    const r = xe(e)[t].apply(e, o);
    return Yl(), co(), r;
  }
  const ph = Gl("__proto__,__v_isRef,__isVue"), nd = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Et));
  function hh(e) {
    Et(e) || (e = String(e));
    const t = xe(this);
    return it(t, "has", e), t.hasOwnProperty(e);
  }
  class id {
    constructor(t = false, o = false) {
      this._isReadonly = t, this._isShallow = o;
    }
    get(t, o, r) {
      if (o === "__v_skip") return t.__v_skip;
      const n = this._isReadonly, i = this._isShallow;
      if (o === "__v_isReactive") return !n;
      if (o === "__v_isReadonly") return n;
      if (o === "__v_isShallow") return i;
      if (o === "__v_raw") return r === (n ? i ? Ph : cd : i ? ad : sd).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      const l = pe(t);
      if (!n) {
        let a;
        if (l && (a = uh[o])) return a;
        if (o === "hasOwnProperty") return hh;
      }
      const s = Reflect.get(t, o, Le(t) ? t : r);
      if ((Et(o) ? nd.has(o) : ph(o)) || (n || it(t, "get", o), i)) return s;
      if (Le(s)) {
        const a = l && fi(o) ? s : s.value;
        return n && Se(a) ? Zt(a) : a;
      }
      return Se(s) ? n ? Zt(s) : Oo(s) : s;
    }
  }
  class ld extends id {
    constructor(t = false) {
      super(false, t);
    }
    set(t, o, r, n) {
      let i = t[o];
      const l = pe(t) && fi(o);
      if (!this._isShallow) {
        const d = uo(i);
        if (!Tt(r) && !uo(r) && (i = xe(i), r = xe(r)), !l && Le(i) && !Le(r)) return d || (i.value = r), true;
      }
      const s = l ? Number(o) < t.length : Te(t, o), a = Reflect.set(t, o, r, Le(t) ? t : n);
      return t === xe(n) && (s ? qt(r, i) && io(t, "set", o, r) : io(t, "add", o, r)), a;
    }
    deleteProperty(t, o) {
      const r = Te(t, o);
      t[o];
      const n = Reflect.deleteProperty(t, o);
      return n && r && io(t, "delete", o, void 0), n;
    }
    has(t, o) {
      const r = Reflect.has(t, o);
      return (!Et(o) || !nd.has(o)) && it(t, "has", o), r;
    }
    ownKeys(t) {
      return it(t, "iterate", pe(t) ? "length" : Uo), Reflect.ownKeys(t);
    }
  }
  class gh extends id {
    constructor(t = false) {
      super(true, t);
    }
    set(t, o) {
      return true;
    }
    deleteProperty(t, o) {
      return true;
    }
  }
  const mh = new ld(), bh = new gh(), vh = new ld(true);
  const gl = (e) => e, _n = (e) => Reflect.getPrototypeOf(e);
  function xh(e, t, o) {
    return function(...r) {
      const n = this.__v_raw, i = xe(n), l = hr(i), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, d = n[e](...r), c = o ? gl : t ? xr : Bt;
      return !t && it(i, "iterate", a ? hl : Uo), Ge(Object.create(d), {
        next() {
          const { value: u, done: f } = d.next();
          return f ? {
            value: u,
            done: f
          } : {
            value: s ? [
              c(u[0]),
              c(u[1])
            ] : c(u),
            done: f
          };
        }
      });
    };
  }
  function Rn(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Ch(e, t) {
    const o = {
      get(n) {
        const i = this.__v_raw, l = xe(i), s = xe(n);
        e || (qt(n, s) && it(l, "get", n), it(l, "get", s));
        const { has: a } = _n(l), d = t ? gl : e ? xr : Bt;
        if (a.call(l, n)) return d(i.get(n));
        if (a.call(l, s)) return d(i.get(s));
        i !== l && i.get(n);
      },
      get size() {
        const n = this.__v_raw;
        return !e && it(xe(n), "iterate", Uo), n.size;
      },
      has(n) {
        const i = this.__v_raw, l = xe(i), s = xe(n);
        return e || (qt(n, s) && it(l, "has", n), it(l, "has", s)), n === s ? i.has(n) : i.has(n) || i.has(s);
      },
      forEach(n, i) {
        const l = this, s = l.__v_raw, a = xe(s), d = t ? gl : e ? xr : Bt;
        return !e && it(a, "iterate", Uo), s.forEach((c, u) => n.call(i, d(c), d(u), l));
      }
    };
    return Ge(o, e ? {
      add: Rn("add"),
      set: Rn("set"),
      delete: Rn("delete"),
      clear: Rn("clear")
    } : {
      add(n) {
        const i = xe(this), l = _n(i), s = xe(n), a = !t && !Tt(n) && !uo(n) ? s : n;
        return l.has.call(i, a) || qt(n, a) && l.has.call(i, n) || qt(s, a) && l.has.call(i, s) || (i.add(a), io(i, "add", a, a)), this;
      },
      set(n, i) {
        !t && !Tt(i) && !uo(i) && (i = xe(i));
        const l = xe(this), { has: s, get: a } = _n(l);
        let d = s.call(l, n);
        d || (n = xe(n), d = s.call(l, n));
        const c = a.call(l, n);
        return l.set(n, i), d ? qt(i, c) && io(l, "set", n, i) : io(l, "add", n, i), this;
      },
      delete(n) {
        const i = xe(this), { has: l, get: s } = _n(i);
        let a = l.call(i, n);
        a || (n = xe(n), a = l.call(i, n)), s && s.call(i, n);
        const d = i.delete(n);
        return a && io(i, "delete", n, void 0), d;
      },
      clear() {
        const n = xe(this), i = n.size !== 0, l = n.clear();
        return i && io(n, "clear", void 0, void 0), l;
      }
    }), [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ].forEach((n) => {
      o[n] = xh(n, e, t);
    }), o;
  }
  function Jl(e, t) {
    const o = Ch(e, t);
    return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get(Te(o, n) && n in r ? o : r, n, i);
  }
  const yh = {
    get: Jl(false, false)
  }, Sh = {
    get: Jl(false, true)
  }, wh = {
    get: Jl(true, false)
  };
  const sd = /* @__PURE__ */ new WeakMap(), ad = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap(), Ph = /* @__PURE__ */ new WeakMap();
  function Th(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Eh(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Th(qp(e));
  }
  Oo = function(e) {
    return uo(e) ? e : es(e, false, mh, yh, sd);
  };
  function dd(e) {
    return es(e, false, vh, Sh, ad);
  }
  Zt = function(e) {
    return es(e, true, bh, wh, cd);
  };
  function es(e, t, o, r, n) {
    if (!Se(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = Eh(e);
    if (i === 0) return e;
    const l = n.get(e);
    if (l) return l;
    const s = new Proxy(e, i === 2 ? r : o);
    return n.set(e, s), s;
  }
  function so(e) {
    return uo(e) ? so(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function uo(e) {
    return !!(e && e.__v_isReadonly);
  }
  function Tt(e) {
    return !!(e && e.__v_isShallow);
  }
  function bi(e) {
    return e ? !!e.__v_raw : false;
  }
  function xe(e) {
    const t = e && e.__v_raw;
    return t ? xe(t) : e;
  }
  function rn(e) {
    return !Te(e, "__v_skip") && Object.isExtensible(e) && Nc(e, "__v_skip", true), e;
  }
  const Bt = (e) => Se(e) ? Oo(e) : e, xr = (e) => Se(e) ? Zt(e) : e;
  Le = function(e) {
    return e ? e.__v_isRef === true : false;
  };
  de = function(e) {
    return ud(e, false);
  };
  function ts(e) {
    return ud(e, true);
  }
  function ud(e, t) {
    return Le(e) ? e : new _h(e, t);
  }
  class _h {
    constructor(t, o) {
      this.dep = new Ql(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = o ? t : xe(t), this._value = o ? t : Bt(t), this.__v_isShallow = o;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const o = this._rawValue, r = this.__v_isShallow || Tt(t) || uo(t);
      t = r ? t : xe(t), qt(t, o) && (this._rawValue = t, this._value = r ? t : Bt(t), this.dep.trigger());
    }
  }
  Io = function(e) {
    return Le(e) ? e.value : e;
  };
  const Rh = {
    get: (e, t, o) => t === "__v_raw" ? e : Io(Reflect.get(e, t, o)),
    set: (e, t, o, r) => {
      const n = e[t];
      return Le(n) && !Le(o) ? (n.value = o, true) : Reflect.set(e, t, o, r);
    }
  };
  function fd(e) {
    return so(e) ? e : new Proxy(e, Rh);
  }
  function $h(e) {
    const t = pe(e) ? new Array(e.length) : {};
    for (const o in e) t[o] = pd(e, o);
    return t;
  }
  class Ah {
    constructor(t, o, r) {
      this._object = t, this._defaultValue = r, this.__v_isRef = true, this._value = void 0, this._key = Et(o) ? o : String(o), this._raw = xe(t);
      let n = true, i = t;
      if (!pe(t) || Et(this._key) || !fi(this._key)) do
        n = !bi(i) || Tt(i);
      while (n && (i = i.__v_raw));
      this._shallow = n;
    }
    get value() {
      let t = this._object[this._key];
      return this._shallow && (t = Io(t)), this._value = t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
      if (this._shallow && Le(this._raw[this._key])) {
        const o = this._object[this._key];
        if (Le(o)) {
          o.value = t;
          return;
        }
      }
      this._object[this._key] = t;
    }
    get dep() {
      return dh(this._raw, this._key);
    }
  }
  class Ih {
    constructor(t) {
      this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
    }
    get value() {
      return this._value = this._getter();
    }
  }
  Yt = function(e, t, o) {
    return Le(e) ? e : me(e) ? new Ih(e) : Se(e) && arguments.length > 1 ? pd(e, t, o) : de(e);
  };
  function pd(e, t, o) {
    return new Ah(e, t, o);
  }
  class zh {
    constructor(t, o, r) {
      this.fn = t, this.setter = o, this._value = void 0, this.dep = new Ql(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !o, this.isSSR = r;
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && Oe !== this) return Qc(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return td(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  }
  function Hh(e, t, o = false) {
    let r, n;
    return me(e) ? r = e : (r = e.get, n = e.set), new zh(r, n, o);
  }
  const $n = {}, Un = /* @__PURE__ */ new WeakMap();
  let ko;
  function Oh(e, t = false, o = ko) {
    if (o) {
      let r = Un.get(o);
      r || Un.set(o, r = []), r.push(e);
    }
  }
  function Bh(e, t, o = He) {
    const { immediate: r, deep: n, once: i, scheduler: l, augmentJob: s, call: a } = o, d = (A) => n ? A : Tt(A) || n === false || n === 0 ? lo(A, 1) : lo(A);
    let c, u, f, p, h = false, g = false;
    if (Le(e) ? (u = () => e.value, h = Tt(e)) : so(e) ? (u = () => d(e), h = true) : pe(e) ? (g = true, h = e.some((A) => so(A) || Tt(A)), u = () => e.map((A) => {
      if (Le(A)) return A.value;
      if (so(A)) return d(A);
      if (me(A)) return a ? a(A, 2) : A();
    })) : me(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
      if (f) {
        ao();
        try {
          f();
        } finally {
          co();
        }
      }
      const A = ko;
      ko = c;
      try {
        return a ? a(e, 3, [
          p
        ]) : e(p);
      } finally {
        ko = A;
      }
    } : u = Xt, t && n) {
      const A = u, E = n === true ? 1 / 0 : n;
      u = () => lo(A(), E);
    }
    const C = Xc(), x = () => {
      c.stop(), C && C.active && Ul(C.effects, c);
    };
    if (i && t) {
      const A = t;
      t = (...E) => {
        A(...E), x();
      };
    }
    let y = g ? new Array(e.length).fill($n) : $n;
    const _ = (A) => {
      if (!(!(c.flags & 1) || !c.dirty && !A)) if (t) {
        const E = c.run();
        if (n || h || (g ? E.some((R, w) => qt(R, y[w])) : qt(E, y))) {
          f && f();
          const R = ko;
          ko = c;
          try {
            const w = [
              E,
              y === $n ? void 0 : g && y[0] === $n ? [] : y,
              p
            ];
            y = E, a ? a(t, 3, w) : t(...w);
          } finally {
            ko = R;
          }
        }
      } else c.run();
    };
    return s && s(_), c = new Yc(u), c.scheduler = l ? () => l(_, false) : _, p = (A) => Oh(A, false, c), f = c.onStop = () => {
      const A = Un.get(c);
      if (A) {
        if (a) a(A, 4);
        else for (const E of A) E();
        Un.delete(c);
      }
    }, t ? r ? _(true) : y = c.run() : l ? l(_.bind(null, true), true) : c.run(), x.pause = c.pause.bind(c), x.resume = c.resume.bind(c), x.stop = x, x;
  }
  function lo(e, t = 1 / 0, o) {
    if (t <= 0 || !Se(e) || e.__v_skip || (o = o || /* @__PURE__ */ new Map(), (o.get(e) || 0) >= t)) return e;
    if (o.set(e, t), t--, Le(e)) lo(e.value, t, o);
    else if (pe(e)) for (let r = 0; r < e.length; r++) lo(e[r], t, o);
    else if (Lc(e) || hr(e)) e.forEach((r) => {
      lo(r, t, o);
    });
    else if (Wc(e)) {
      for (const r in e) lo(e[r], t, o);
      for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && lo(e[r], t, o);
    }
    return e;
  }
  function xn(e, t, o, r) {
    try {
      return r ? e(...r) : e();
    } catch (n) {
      vi(n, t, o);
    }
  }
  function Ft(e, t, o, r) {
    if (me(e)) {
      const n = xn(e, t, o, r);
      return n && kc(n) && n.catch((i) => {
        vi(i, t, o);
      }), n;
    }
    if (pe(e)) {
      const n = [];
      for (let i = 0; i < e.length; i++) n.push(Ft(e[i], t, o, r));
      return n;
    }
  }
  function vi(e, t, o, r = true) {
    const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || He;
    if (t) {
      let s = t.parent;
      const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${o}`;
      for (; s; ) {
        const c = s.ec;
        if (c) {
          for (let u = 0; u < c.length; u++) if (c[u](e, a, d) === false) return;
        }
        s = s.parent;
      }
      if (i) {
        ao(), xn(i, null, 10, [
          e,
          a,
          d
        ]), co();
        return;
      }
    }
    Fh(e, o, n, r, l);
  }
  function Fh(e, t, o, r = true, n = false) {
    if (n) throw e;
    console.error(e);
  }
  const ft = [];
  let Nt = -1;
  const gr = [];
  let _o = null, ur = 0;
  const hd = Promise.resolve();
  let Kn = null;
  Zo = function(e) {
    const t = Kn || hd;
    return e ? t.then(this ? e.bind(this) : e) : t;
  };
  function Mh(e) {
    let t = Nt + 1, o = ft.length;
    for (; t < o; ) {
      const r = t + o >>> 1, n = ft[r], i = nn(n);
      i < e || i === e && n.flags & 2 ? t = r + 1 : o = r;
    }
    return t;
  }
  function os(e) {
    if (!(e.flags & 1)) {
      const t = nn(e), o = ft[ft.length - 1];
      !o || !(e.flags & 2) && t >= nn(o) ? ft.push(e) : ft.splice(Mh(t), 0, e), e.flags |= 1, gd();
    }
  }
  function gd() {
    Kn || (Kn = hd.then(bd));
  }
  function Dh(e) {
    pe(e) ? gr.push(...e) : _o && e.id === -1 ? _o.splice(ur + 1, 0, e) : e.flags & 1 || (gr.push(e), e.flags |= 1), gd();
  }
  function Ds(e, t, o = Nt + 1) {
    for (; o < ft.length; o++) {
      const r = ft[o];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        ft.splice(o, 1), o--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
      }
    }
  }
  function md(e) {
    if (gr.length) {
      const t = [
        ...new Set(gr)
      ].sort((o, r) => nn(o) - nn(r));
      if (gr.length = 0, _o) {
        _o.push(...t);
        return;
      }
      for (_o = t, ur = 0; ur < _o.length; ur++) {
        const o = _o[ur];
        o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
      }
      _o = null, ur = 0;
    }
  }
  const nn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
  function bd(e) {
    try {
      for (Nt = 0; Nt < ft.length; Nt++) {
        const t = ft[Nt];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), xn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Nt < ft.length; Nt++) {
        const t = ft[Nt];
        t && (t.flags &= -2);
      }
      Nt = -1, ft.length = 0, md(), Kn = null, (ft.length || gr.length) && bd();
    }
  }
  let et = null, vd = null;
  function qn(e) {
    const t = et;
    return et = e, vd = e && e.type.__scopeId || null, t;
  }
  kr = function(e, t = et, o) {
    if (!t || e._n) return e;
    const r = (...n) => {
      r._d && Qn(-1);
      const i = qn(t);
      let l;
      try {
        l = e(...n);
      } finally {
        qn(i), r._d && Qn(1);
      }
      return l;
    };
    return r._n = true, r._c = true, r._d = true, r;
  };
  ml = function(e, t) {
    if (et === null) return e;
    const o = Pi(et), r = e.dirs || (e.dirs = []);
    for (let n = 0; n < t.length; n++) {
      let [i, l, s, a = He] = t[n];
      i && (me(i) && (i = {
        mounted: i,
        updated: i
      }), i.deep && lo(l), r.push({
        dir: i,
        instance: o,
        value: l,
        oldValue: void 0,
        arg: s,
        modifiers: a
      }));
    }
    return e;
  };
  function Fo(e, t, o, r) {
    const n = e.dirs, i = t && t.dirs;
    for (let l = 0; l < n.length; l++) {
      const s = n[l];
      i && (s.oldValue = i[l].value);
      let a = s.dir[r];
      a && (ao(), Ft(a, o, 8, [
        e.el,
        s,
        e,
        t
      ]), co());
    }
  }
  tt = function(e, t) {
    if (st) {
      let o = st.provides;
      const r = st.parent && st.parent.provides;
      r === o && (o = st.provides = Object.create(r)), o[e] = t;
    }
  };
  Ee = function(e, t, o = false) {
    const r = Tr();
    if (r || Ko) {
      let n = Ko ? Ko._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
      if (n && e in n) return n[e];
      if (arguments.length > 1) return o && me(t) ? t.call(r && r.proxy) : t;
    }
  };
  function Lh() {
    return !!(Tr() || Ko);
  }
  const kh = Symbol.for("v-scx"), jh = () => Ee(kh);
  xi = function(e, t) {
    return rs(e, null, t);
  };
  At = function(e, t, o) {
    return rs(e, t, o);
  };
  function rs(e, t, o = He) {
    const { immediate: r, deep: n, flush: i, once: l } = o, s = Ge({}, o), a = t && r || !t && i !== "post";
    let d;
    if (cn) {
      if (i === "sync") {
        const p = jh();
        d = p.__watcherHandles || (p.__watcherHandles = []);
      } else if (!a) {
        const p = () => {
        };
        return p.stop = Xt, p.resume = Xt, p.pause = Xt, p;
      }
    }
    const c = st;
    s.call = (p, h, g) => Ft(p, c, h, g);
    let u = false;
    i === "post" ? s.scheduler = (p) => {
      rt(p, c && c.suspense);
    } : i !== "sync" && (u = true, s.scheduler = (p, h) => {
      h ? p() : os(p);
    }), s.augmentJob = (p) => {
      t && (p.flags |= 4), u && (p.flags |= 2, c && (p.id = c.uid, p.i = c));
    };
    const f = Bh(e, t, s);
    return cn && (d ? d.push(f) : a && f()), f;
  }
  function Wh(e, t, o) {
    const r = this.proxy, n = Ne(e) ? e.includes(".") ? xd(r, e) : () => r[e] : e.bind(r, r);
    let i;
    me(t) ? i = t : (i = t.handler, o = t);
    const l = Cn(this), s = rs(n, i.bind(r), o);
    return l(), s;
  }
  function xd(e, t) {
    const o = t.split(".");
    return () => {
      let r = e;
      for (let n = 0; n < o.length && r; n++) r = r[o[n]];
      return r;
    };
  }
  const Cd = Symbol("_vte"), yd = (e) => e.__isTeleport, Kr = (e) => e && (e.disabled || e.disabled === ""), Nh = (e) => e && (e.defer || e.defer === ""), Ls = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ks = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, bl = (e, t) => {
    const o = e && e.to;
    return Ne(o) ? t ? t(o) : null : o;
  }, Sd = {
    name: "Teleport",
    __isTeleport: true,
    process(e, t, o, r, n, i, l, s, a, d) {
      const { mc: c, pc: u, pbc: f, o: { insert: p, querySelector: h, createText: g, createComment: C } } = d, x = Kr(t.props);
      let { shapeFlag: y, children: _, dynamicChildren: A } = t;
      if (e == null) {
        const E = t.el = g(""), R = t.anchor = g("");
        p(E, o, r), p(R, o, r);
        const w = (S, I) => {
          y & 16 && c(_, S, I, n, i, l, s, a);
        }, b = () => {
          const S = t.target = bl(t.props, h), I = vl(S, t, g, p);
          S && (l !== "svg" && Ls(S) ? l = "svg" : l !== "mathml" && ks(S) && (l = "mathml"), n && n.isCE && (n.ce._teleportTargets || (n.ce._teleportTargets = /* @__PURE__ */ new Set())).add(S), x || (w(S, I), kn(t, false)));
        };
        x && (w(o, R), kn(t, true)), Nh(t.props) || i && i.pendingBranch ? (t.el.__isMounted = false, rt(() => {
          t.el.__isMounted === false && (b(), delete t.el.__isMounted);
        }, i)) : b();
      } else {
        t.el = e.el, t.targetStart = e.targetStart;
        const E = t.anchor = e.anchor, R = t.target = e.target, w = t.targetAnchor = e.targetAnchor;
        if (e.el.__isMounted === false) {
          rt(() => {
            Sd.process(e, t, o, r, n, i, l, s, a, d);
          }, i);
          return;
        }
        const b = Kr(e.props), S = b ? o : R, I = b ? E : w;
        if (l === "svg" || Ls(R) ? l = "svg" : (l === "mathml" || ks(R)) && (l = "mathml"), A ? (f(e.dynamicChildren, A, S, n, i, l, s), cs(e, t, true)) : a || u(e, t, S, I, n, i, l, s, false), x) b ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : An(t, o, E, d, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const D = t.target = bl(t.props, h);
          D && An(t, D, null, d, 0);
        } else b && An(t, R, w, d, 1);
        kn(t, x);
      }
    },
    remove(e, t, o, { um: r, o: { remove: n } }, i) {
      const { shapeFlag: l, children: s, anchor: a, targetStart: d, targetAnchor: c, target: u, props: f } = e;
      if (u && (n(d), n(c)), i && n(a), l & 16) {
        const p = i || !Kr(f);
        for (let h = 0; h < s.length; h++) {
          const g = s[h];
          r(g, t, o, p, !!g.dynamicChildren);
        }
      }
    },
    move: An,
    hydrate: Vh
  };
  function An(e, t, o, { o: { insert: r }, m: n }, i = 2) {
    i === 0 && r(e.targetAnchor, t, o);
    const { el: l, anchor: s, shapeFlag: a, children: d, props: c } = e, u = i === 2;
    if (u && r(l, t, o), (!u || Kr(c)) && a & 16) for (let f = 0; f < d.length; f++) n(d[f], t, o, 2);
    u && r(s, t, o);
  }
  function Vh(e, t, o, r, n, i, { o: { nextSibling: l, parentNode: s, querySelector: a, insert: d, createText: c } }, u) {
    function f(C, x) {
      let y = x;
      for (; y; ) {
        if (y && y.nodeType === 8) {
          if (y.data === "teleport start anchor") t.targetStart = y;
          else if (y.data === "teleport anchor") {
            t.targetAnchor = y, C._lpa = t.targetAnchor && l(t.targetAnchor);
            break;
          }
        }
        y = l(y);
      }
    }
    function p(C, x) {
      x.anchor = u(l(C), x, s(C), o, r, n, i);
    }
    const h = t.target = bl(t.props, a), g = Kr(t.props);
    if (h) {
      const C = h._lpa || h.firstChild;
      t.shapeFlag & 16 && (g ? (p(e, t), f(h, C), t.targetAnchor || vl(h, t, c, d, s(e) === h ? e : null)) : (t.anchor = l(e), f(h, C), t.targetAnchor || vl(h, t, c, d), u(C && l(C), t, h, o, r, n, i))), kn(t, g);
    } else g && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = l(e));
    return t.anchor && l(t.anchor);
  }
  const ns = Sd;
  function kn(e, t) {
    const o = e.ctx;
    if (o && o.ut) {
      let r, n;
      for (t ? (r = e.el, n = e.anchor) : (r = e.targetStart, n = e.targetAnchor); r && r !== n; ) r.nodeType === 1 && r.setAttribute("data-v-owner", o.uid), r = r.nextSibling;
      o.ut();
    }
  }
  function vl(e, t, o, r, n = null) {
    const i = t.targetStart = o(""), l = t.targetAnchor = o("");
    return i[Cd] = l, e && (r(i, e, n), r(l, e, n)), l;
  }
  const Gt = Symbol("_leaveCb"), Hr = Symbol("_enterCb");
  function wd() {
    const e = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return mo(() => {
      e.isMounted = true;
    }), Dt(() => {
      e.isUnmounting = true;
    }), e;
  }
  const $t = [
    Function,
    Array
  ], Pd = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: $t,
    onEnter: $t,
    onAfterEnter: $t,
    onEnterCancelled: $t,
    onBeforeLeave: $t,
    onLeave: $t,
    onAfterLeave: $t,
    onLeaveCancelled: $t,
    onBeforeAppear: $t,
    onAppear: $t,
    onAfterAppear: $t,
    onAppearCancelled: $t
  }, Td = (e) => {
    const t = e.subTree;
    return t.component ? Td(t.component) : t;
  }, Gh = {
    name: "BaseTransition",
    props: Pd,
    setup(e, { slots: t }) {
      const o = Tr(), r = wd();
      return () => {
        const n = t.default && is(t.default(), true);
        if (!n || !n.length) return;
        const i = Ed(n), l = xe(e), { mode: s } = l;
        if (r.isLeaving) return qi(i);
        const a = js(i);
        if (!a) return qi(i);
        let d = ln(a, l, r, o, (u) => d = u);
        a.type !== Ye && Qo(a, d);
        let c = o.subTree && js(o.subTree);
        if (c && c.type !== Ye && !jo(c, a) && Td(o).type !== Ye) {
          let u = ln(c, l, r, o);
          if (Qo(c, u), s === "out-in" && a.type !== Ye) return r.isLeaving = true, u.afterLeave = () => {
            r.isLeaving = false, o.job.flags & 8 || o.update(), delete u.afterLeave, c = void 0;
          }, qi(i);
          s === "in-out" && a.type !== Ye ? u.delayLeave = (f, p, h) => {
            const g = _d(r, c);
            g[String(c.key)] = c, f[Gt] = () => {
              p(), f[Gt] = void 0, delete d.delayedLeave, c = void 0;
            }, d.delayedLeave = () => {
              h(), delete d.delayedLeave, c = void 0;
            };
          } : c = void 0;
        } else c && (c = void 0);
        return i;
      };
    }
  };
  function Ed(e) {
    let t = e[0];
    if (e.length > 1) {
      for (const o of e) if (o.type !== Ye) {
        t = o;
        break;
      }
    }
    return t;
  }
  const Uh = Gh;
  function _d(e, t) {
    const { leavingVNodes: o } = e;
    let r = o.get(t.type);
    return r || (r = /* @__PURE__ */ Object.create(null), o.set(t.type, r)), r;
  }
  function ln(e, t, o, r, n) {
    const { appear: i, mode: l, persisted: s = false, onBeforeEnter: a, onEnter: d, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: f, onLeave: p, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: C, onAppear: x, onAfterAppear: y, onAppearCancelled: _ } = t, A = String(e.key), E = _d(o, e), R = (S, I) => {
      S && Ft(S, r, 9, I);
    }, w = (S, I) => {
      const D = I[1];
      R(S, I), pe(S) ? S.every((H) => H.length <= 1) && D() : S.length <= 1 && D();
    }, b = {
      mode: l,
      persisted: s,
      beforeEnter(S) {
        let I = a;
        if (!o.isMounted) if (i) I = C || a;
        else return;
        S[Gt] && S[Gt](true);
        const D = E[A];
        D && jo(e, D) && D.el[Gt] && D.el[Gt](), R(I, [
          S
        ]);
      },
      enter(S) {
        if (E[A] === e) return;
        let I = d, D = c, H = u;
        if (!o.isMounted) if (i) I = x || d, D = y || c, H = _ || u;
        else return;
        let N = false;
        S[Hr] = (ue) => {
          N || (N = true, ue ? R(H, [
            S
          ]) : R(D, [
            S
          ]), b.delayedLeave && b.delayedLeave(), S[Hr] = void 0);
        };
        const ae = S[Hr].bind(null, false);
        I ? w(I, [
          S,
          ae
        ]) : ae();
      },
      leave(S, I) {
        const D = String(e.key);
        if (S[Hr] && S[Hr](true), o.isUnmounting) return I();
        R(f, [
          S
        ]);
        let H = false;
        S[Gt] = (ae) => {
          H || (H = true, I(), ae ? R(g, [
            S
          ]) : R(h, [
            S
          ]), S[Gt] = void 0, E[D] === e && delete E[D]);
        };
        const N = S[Gt].bind(null, false);
        E[D] = e, p ? w(p, [
          S,
          N
        ]) : N();
      },
      clone(S) {
        const I = ln(S, t, o, r, n);
        return n && n(I), I;
      }
    };
    return b;
  }
  function qi(e) {
    if (Ci(e)) return e = fo(e), e.children = null, e;
  }
  function js(e) {
    if (!Ci(e)) return yd(e.type) && e.children ? Ed(e.children) : e;
    if (e.component) return e.component.subTree;
    const { shapeFlag: t, children: o } = e;
    if (o) {
      if (t & 16) return o[0];
      if (t & 32 && me(o.default)) return o.default();
    }
  }
  function Qo(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Qo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  function is(e, t = false, o) {
    let r = [], n = 0;
    for (let i = 0; i < e.length; i++) {
      let l = e[i];
      const s = o == null ? l.key : String(o) + String(l.key != null ? l.key : i);
      l.type === We ? (l.patchFlag & 128 && n++, r = r.concat(is(l.children, t, s))) : (t || l.type !== Ye) && r.push(s != null ? fo(l, {
        key: s
      }) : l);
    }
    if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
  }
  we = function(e, t) {
    return me(e) ? Ge({
      name: e.name
    }, t, {
      setup: e
    }) : e;
  };
  function Rd(e) {
    e.ids = [
      e.ids[0] + e.ids[2]++ + "-",
      0,
      0
    ];
  }
  function Ws(e, t) {
    let o;
    return !!((o = Object.getOwnPropertyDescriptor(e, t)) && !o.configurable);
  }
  const Xn = /* @__PURE__ */ new WeakMap();
  function qr(e, t, o, r, n = false) {
    if (pe(e)) {
      e.forEach((g, C) => qr(g, t && (pe(t) ? t[C] : t), o, r, n));
      return;
    }
    if (mr(r) && !n) {
      r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && qr(e, t, o, r.component.subTree);
      return;
    }
    const i = r.shapeFlag & 4 ? Pi(r.component) : r.el, l = n ? null : i, { i: s, r: a } = e, d = t && t.r, c = s.refs === He ? s.refs = {} : s.refs, u = s.setupState, f = xe(u), p = u === He ? Dc : (g) => Ws(c, g) ? false : Te(f, g), h = (g, C) => !(C && Ws(c, C));
    if (d != null && d !== a) {
      if (Ns(t), Ne(d)) c[d] = null, p(d) && (u[d] = null);
      else if (Le(d)) {
        const g = t;
        h(d, g.k) && (d.value = null), g.k && (c[g.k] = null);
      }
    }
    if (me(a)) xn(a, s, 12, [
      l,
      c
    ]);
    else {
      const g = Ne(a), C = Le(a);
      if (g || C) {
        const x = () => {
          if (e.f) {
            const y = g ? p(a) ? u[a] : c[a] : h() || !e.k ? a.value : c[e.k];
            if (n) pe(y) && Ul(y, i);
            else if (pe(y)) y.includes(i) || y.push(i);
            else if (g) c[a] = [
              i
            ], p(a) && (u[a] = c[a]);
            else {
              const _ = [
                i
              ];
              h(a, e.k) && (a.value = _), e.k && (c[e.k] = _);
            }
          } else g ? (c[a] = l, p(a) && (u[a] = l)) : C && (h(a, e.k) && (a.value = l), e.k && (c[e.k] = l));
        };
        if (l) {
          const y = () => {
            x(), Xn.delete(e);
          };
          y.id = -1, Xn.set(e, y), rt(y, o);
        } else Ns(e), x();
      }
    }
  }
  function Ns(e) {
    const t = Xn.get(e);
    t && (t.flags |= 8, Xn.delete(e));
  }
  gi().requestIdleCallback;
  gi().cancelIdleCallback;
  const mr = (e) => !!e.type.__asyncLoader, Ci = (e) => e.type.__isKeepAlive;
  $d = function(e, t) {
    Id(e, "a", t);
  };
  Ad = function(e, t) {
    Id(e, "da", t);
  };
  function Id(e, t, o = st) {
    const r = e.__wdc || (e.__wdc = () => {
      let n = o;
      for (; n; ) {
        if (n.isDeactivated) return;
        n = n.parent;
      }
      return e();
    });
    if (yi(t, r, o), o) {
      let n = o.parent;
      for (; n && n.parent; ) Ci(n.parent.vnode) && Kh(r, t, o, n), n = n.parent;
    }
  }
  function Kh(e, t, o, r) {
    const n = yi(t, e, r, true);
    ls(() => {
      Ul(r[t], n);
    }, o);
  }
  function yi(e, t, o = st, r = false) {
    if (o) {
      const n = o[e] || (o[e] = []), i = t.__weh || (t.__weh = (...l) => {
        ao();
        const s = Cn(o), a = Ft(t, o, e, l);
        return s(), co(), a;
      });
      return r ? n.unshift(i) : n.push(i), i;
    }
  }
  let go, qh, zd, Xh, Yh, Zh;
  go = (e) => (t, o = st) => {
    (!cn || e === "sp") && yi(e, (...r) => t(...r), o);
  };
  tr = go("bm");
  mo = go("m");
  qh = go("bu");
  zd = go("u");
  Dt = go("bum");
  ls = go("um");
  Xh = go("sp");
  Yh = go("rtg");
  Zh = go("rtc");
  function Qh(e, t = st) {
    yi("ec", e, t);
  }
  const Jh = "components";
  eg = function(e, t) {
    return og(Jh, e, true, t) || e;
  };
  const tg = Symbol.for("v-ndc");
  function og(e, t, o = true, r = false) {
    const n = et || st;
    if (n) {
      const i = n.type;
      {
        const s = kg(i, false);
        if (s && (s === t || s === ht(t) || s === hi(ht(t)))) return i;
      }
      const l = Vs(n[e] || i[e], t) || Vs(n.appContext[e], t);
      return !l && r ? i : l;
    }
  }
  function Vs(e, t) {
    return e && (e[t] || e[ht(t)] || e[hi(ht(t))]);
  }
  k2 = function(e, t, o, r) {
    let n;
    const i = o, l = pe(e);
    if (l || Ne(e)) {
      const s = l && so(e);
      let a = false, d = false;
      s && (a = !Tt(e), d = uo(e), e = mi(e)), n = new Array(e.length);
      for (let c = 0, u = e.length; c < u; c++) n[c] = t(a ? d ? xr(Bt(e[c])) : Bt(e[c]) : e[c], c, void 0, i);
    } else if (typeof e == "number") {
      n = new Array(e);
      for (let s = 0; s < e; s++) n[s] = t(s + 1, s, void 0, i);
    } else if (Se(e)) if (e[Symbol.iterator]) n = Array.from(e, (s, a) => t(s, a, void 0, i));
    else {
      const s = Object.keys(e);
      n = new Array(s.length);
      for (let a = 0, d = s.length; a < d; a++) {
        const c = s[a];
        n[a] = t(e[c], c, a, i);
      }
    }
    else n = [];
    return n;
  };
  rg = function(e, t, o = {}, r, n) {
    if (et.ce || et.parent && mr(et.parent) && et.parent.ce) {
      const d = Object.keys(o).length > 0;
      return Zn(), Jn(We, null, [
        Ze("slot", o, r)
      ], d ? -2 : 64);
    }
    let i = e[t];
    i && i._c && (i._d = false), Zn();
    const l = i && Hd(i(o)), s = o.key || l && l.key, a = Jn(We, {
      key: (s && !Et(s) ? s : `_${t}`) + (!l && r ? "_fb" : "")
    }, l || [], l && e._ === 1 ? 64 : -2);
    return a.scopeId && (a.slotScopeIds = [
      a.scopeId + "-s"
    ]), i && i._c && (i._d = true), a;
  };
  function Hd(e) {
    return e.some((t) => Cr(t) ? !(t.type === Ye || t.type === We && !Hd(t.children)) : true) ? e : null;
  }
  const xl = (e) => e ? Jd(e) ? Pi(e) : xl(e.parent) : null, Xr = Ge(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xl(e.parent),
    $root: (e) => xl(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Bd(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      os(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Zo.bind(e.proxy)),
    $watch: (e) => Wh.bind(e)
  }), Xi = (e, t) => e !== He && !e.__isScriptSetup && Te(e, t), ng = {
    get({ _: e }, t) {
      if (t === "__v_skip") return true;
      const { ctx: o, setupState: r, data: n, props: i, accessCache: l, type: s, appContext: a } = e;
      if (t[0] !== "$") {
        const f = l[t];
        if (f !== void 0) switch (f) {
          case 1:
            return r[t];
          case 2:
            return n[t];
          case 4:
            return o[t];
          case 3:
            return i[t];
        }
        else {
          if (Xi(r, t)) return l[t] = 1, r[t];
          if (n !== He && Te(n, t)) return l[t] = 2, n[t];
          if (Te(i, t)) return l[t] = 3, i[t];
          if (o !== He && Te(o, t)) return l[t] = 4, o[t];
          Cl && (l[t] = 0);
        }
      }
      const d = Xr[t];
      let c, u;
      if (d) return t === "$attrs" && it(e.attrs, "get", ""), d(e);
      if ((c = s.__cssModules) && (c = c[t])) return c;
      if (o !== He && Te(o, t)) return l[t] = 4, o[t];
      if (u = a.config.globalProperties, Te(u, t)) return u[t];
    },
    set({ _: e }, t, o) {
      const { data: r, setupState: n, ctx: i } = e;
      return Xi(n, t) ? (n[t] = o, true) : r !== He && Te(r, t) ? (r[t] = o, true) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = o, true);
    },
    has({ _: { data: e, setupState: t, accessCache: o, ctx: r, appContext: n, props: i, type: l } }, s) {
      let a;
      return !!(o[s] || e !== He && s[0] !== "$" && Te(e, s) || Xi(t, s) || Te(i, s) || Te(r, s) || Te(Xr, s) || Te(n.config.globalProperties, s) || (a = l.__cssModules) && a[s]);
    },
    defineProperty(e, t, o) {
      return o.get != null ? e._.accessCache[t] = 0 : Te(o, "value") && this.set(e, t, o.value, null), Reflect.defineProperty(e, t, o);
    }
  };
  function Gs(e) {
    return pe(e) ? e.reduce((t, o) => (t[o] = null, t), {}) : e;
  }
  let Cl = true;
  function ig(e) {
    const t = Bd(e), o = e.proxy, r = e.ctx;
    Cl = false, t.beforeCreate && Us(t.beforeCreate, e, "bc");
    const { data: n, computed: i, methods: l, watch: s, provide: a, inject: d, created: c, beforeMount: u, mounted: f, beforeUpdate: p, updated: h, activated: g, deactivated: C, beforeDestroy: x, beforeUnmount: y, destroyed: _, unmounted: A, render: E, renderTracked: R, renderTriggered: w, errorCaptured: b, serverPrefetch: S, expose: I, inheritAttrs: D, components: H, directives: N, filters: ae } = t;
    if (d && lg(d, r, null), l) for (const X in l) {
      const Y = l[X];
      me(Y) && (r[X] = Y.bind(o));
    }
    if (n) {
      const X = n.call(o, o);
      Se(X) && (e.data = Oo(X));
    }
    if (Cl = true, i) for (const X in i) {
      const Y = i[X], _e = me(Y) ? Y.bind(o, o) : me(Y.get) ? Y.get.bind(o, o) : Xt, Ae = !me(Y) && me(Y.set) ? Y.set.bind(o) : Xt, Ce = Q({
        get: _e,
        set: Ae
      });
      Object.defineProperty(r, X, {
        enumerable: true,
        configurable: true,
        get: () => Ce.value,
        set: (ze) => Ce.value = ze
      });
    }
    if (s) for (const X in s) Od(s[X], r, o, X);
    if (a) {
      const X = me(a) ? a.call(o) : a;
      Reflect.ownKeys(X).forEach((Y) => {
        tt(Y, X[Y]);
      });
    }
    c && Us(c, e, "c");
    function le(X, Y) {
      pe(Y) ? Y.forEach((_e) => X(_e.bind(o))) : Y && X(Y.bind(o));
    }
    if (le(tr, u), le(mo, f), le(qh, p), le(zd, h), le($d, g), le(Ad, C), le(Qh, b), le(Zh, R), le(Yh, w), le(Dt, y), le(ls, A), le(Xh, S), pe(I)) if (I.length) {
      const X = e.exposed || (e.exposed = {});
      I.forEach((Y) => {
        Object.defineProperty(X, Y, {
          get: () => o[Y],
          set: (_e) => o[Y] = _e,
          enumerable: true
        });
      });
    } else e.exposed || (e.exposed = {});
    E && e.render === Xt && (e.render = E), D != null && (e.inheritAttrs = D), H && (e.components = H), N && (e.directives = N), S && Rd(e);
  }
  function lg(e, t, o = Xt) {
    pe(e) && (e = yl(e));
    for (const r in e) {
      const n = e[r];
      let i;
      Se(n) ? "default" in n ? i = Ee(n.from || r, n.default, true) : i = Ee(n.from || r) : i = Ee(n), Le(i) ? Object.defineProperty(t, r, {
        enumerable: true,
        configurable: true,
        get: () => i.value,
        set: (l) => i.value = l
      }) : t[r] = i;
    }
  }
  function Us(e, t, o) {
    Ft(pe(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, o);
  }
  function Od(e, t, o, r) {
    let n = r.includes(".") ? xd(o, r) : () => o[r];
    if (Ne(e)) {
      const i = t[e];
      me(i) && At(n, i);
    } else if (me(e)) At(n, e.bind(o));
    else if (Se(e)) if (pe(e)) e.forEach((i) => Od(i, t, o, r));
    else {
      const i = me(e.handler) ? e.handler.bind(o) : t[e.handler];
      me(i) && At(n, i, e);
    }
  }
  function Bd(e) {
    const t = e.type, { mixins: o, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, s = i.get(t);
    let a;
    return s ? a = s : !n.length && !o && !r ? a = t : (a = {}, n.length && n.forEach((d) => Yn(a, d, l, true)), Yn(a, t, l)), Se(t) && i.set(t, a), a;
  }
  function Yn(e, t, o, r = false) {
    const { mixins: n, extends: i } = t;
    i && Yn(e, i, o, true), n && n.forEach((l) => Yn(e, l, o, true));
    for (const l in t) if (!(r && l === "expose")) {
      const s = sg[l] || o && o[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
    return e;
  }
  const sg = {
    data: Ks,
    props: qs,
    emits: qs,
    methods: jr,
    computed: jr,
    beforeCreate: dt,
    created: dt,
    beforeMount: dt,
    mounted: dt,
    beforeUpdate: dt,
    updated: dt,
    beforeDestroy: dt,
    beforeUnmount: dt,
    destroyed: dt,
    unmounted: dt,
    activated: dt,
    deactivated: dt,
    errorCaptured: dt,
    serverPrefetch: dt,
    components: jr,
    directives: jr,
    watch: cg,
    provide: Ks,
    inject: ag
  };
  function Ks(e, t) {
    return t ? e ? function() {
      return Ge(me(e) ? e.call(this, this) : e, me(t) ? t.call(this, this) : t);
    } : t : e;
  }
  function ag(e, t) {
    return jr(yl(e), yl(t));
  }
  function yl(e) {
    if (pe(e)) {
      const t = {};
      for (let o = 0; o < e.length; o++) t[e[o]] = e[o];
      return t;
    }
    return e;
  }
  function dt(e, t) {
    return e ? [
      ...new Set([].concat(e, t))
    ] : t;
  }
  function jr(e, t) {
    return e ? Ge(/* @__PURE__ */ Object.create(null), e, t) : t;
  }
  function qs(e, t) {
    return e ? pe(e) && pe(t) ? [
      .../* @__PURE__ */ new Set([
        ...e,
        ...t
      ])
    ] : Ge(/* @__PURE__ */ Object.create(null), Gs(e), Gs(t ?? {})) : t;
  }
  function cg(e, t) {
    if (!e) return t;
    if (!t) return e;
    const o = Ge(/* @__PURE__ */ Object.create(null), e);
    for (const r in t) o[r] = dt(e[r], t[r]);
    return o;
  }
  function Fd() {
    return {
      app: null,
      config: {
        isNativeTag: Dc,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let dg = 0;
  function ug(e, t) {
    return function(r, n = null) {
      me(r) || (r = Ge({}, r)), n != null && !Se(n) && (n = null);
      const i = Fd(), l = /* @__PURE__ */ new WeakSet(), s = [];
      let a = false;
      const d = i.app = {
        _uid: dg++,
        _component: r,
        _props: n,
        _container: null,
        _context: i,
        _instance: null,
        version: Wg,
        get config() {
          return i.config;
        },
        set config(c) {
        },
        use(c, ...u) {
          return l.has(c) || (c && me(c.install) ? (l.add(c), c.install(d, ...u)) : me(c) && (l.add(c), c(d, ...u))), d;
        },
        mixin(c) {
          return i.mixins.includes(c) || i.mixins.push(c), d;
        },
        component(c, u) {
          return u ? (i.components[c] = u, d) : i.components[c];
        },
        directive(c, u) {
          return u ? (i.directives[c] = u, d) : i.directives[c];
        },
        mount(c, u, f) {
          if (!a) {
            const p = d._ceVNode || Ze(r, n);
            return p.appContext = i, f === true ? f = "svg" : f === false && (f = void 0), e(p, c, f), a = true, d._container = c, c.__vue_app__ = d, Pi(p.component);
          }
        },
        onUnmount(c) {
          s.push(c);
        },
        unmount() {
          a && (Ft(s, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
        },
        provide(c, u) {
          return i.provides[c] = u, d;
        },
        runWithContext(c) {
          const u = Ko;
          Ko = d;
          try {
            return c();
          } finally {
            Ko = u;
          }
        }
      };
      return d;
    };
  }
  let Ko = null;
  const fg = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ht(t)}Modifiers`] || e[`${Ho(t)}Modifiers`];
  function pg(e, t, ...o) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || He;
    let n = o;
    const i = t.startsWith("update:"), l = i && fg(r, t.slice(7));
    l && (l.trim && (n = o.map((c) => Ne(c) ? c.trim() : c)), l.number && (n = o.map(Zp)));
    let s, a = r[s = Wi(t)] || r[s = Wi(ht(t))];
    !a && i && (a = r[s = Wi(Ho(t))]), a && Ft(a, e, 6, n);
    const d = r[s + "Once"];
    if (d) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[s]) return;
      e.emitted[s] = true, Ft(d, e, 6, n);
    }
  }
  const hg = /* @__PURE__ */ new WeakMap();
  function Md(e, t, o = false) {
    const r = o ? hg : t.emitsCache, n = r.get(e);
    if (n !== void 0) return n;
    const i = e.emits;
    let l = {}, s = false;
    if (!me(e)) {
      const a = (d) => {
        const c = Md(d, t, true);
        c && (s = true, Ge(l, c));
      };
      !o && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
    }
    return !i && !s ? (Se(e) && r.set(e, null), null) : (pe(i) ? i.forEach((a) => l[a] = null) : Ge(l, i), Se(e) && r.set(e, l), l);
  }
  function Si(e, t) {
    return !e || !di(t) ? false : (t = t.slice(2).replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, Ho(t)) || Te(e, t));
  }
  function Xs(e) {
    const { type: t, vnode: o, proxy: r, withProxy: n, propsOptions: [i], slots: l, attrs: s, emit: a, render: d, renderCache: c, props: u, data: f, setupState: p, ctx: h, inheritAttrs: g } = e, C = qn(e);
    let x, y;
    try {
      if (o.shapeFlag & 4) {
        const A = n || r, E = A;
        x = Kt(d.call(E, A, c, u, p, f, h)), y = s;
      } else {
        const A = t;
        x = Kt(A.length > 1 ? A(u, {
          attrs: s,
          slots: l,
          emit: a
        }) : A(u, null)), y = t.props ? s : gg(s);
      }
    } catch (A) {
      Yr.length = 0, vi(A, e, 1), x = Ze(Ye);
    }
    let _ = x;
    if (y && g !== false) {
      const A = Object.keys(y), { shapeFlag: E } = _;
      A.length && E & 7 && (i && A.some(ui) && (y = mg(y, i)), _ = fo(_, y, false, true));
    }
    return o.dirs && (_ = fo(_, null, false, true), _.dirs = _.dirs ? _.dirs.concat(o.dirs) : o.dirs), o.transition && Qo(_, o.transition), x = _, qn(C), x;
  }
  const gg = (e) => {
    let t;
    for (const o in e) (o === "class" || o === "style" || di(o)) && ((t || (t = {}))[o] = e[o]);
    return t;
  }, mg = (e, t) => {
    const o = {};
    for (const r in e) (!ui(r) || !(r.slice(9) in t)) && (o[r] = e[r]);
    return o;
  };
  function bg(e, t, o) {
    const { props: r, children: n, component: i } = e, { props: l, children: s, patchFlag: a } = t, d = i.emitsOptions;
    if (t.dirs || t.transition) return true;
    if (o && a >= 0) {
      if (a & 1024) return true;
      if (a & 16) return r ? Ys(r, l, d) : !!l;
      if (a & 8) {
        const c = t.dynamicProps;
        for (let u = 0; u < c.length; u++) {
          const f = c[u];
          if (Dd(l, r, f) && !Si(d, f)) return true;
        }
      }
    } else return (n || s) && (!s || !s.$stable) ? true : r === l ? false : r ? l ? Ys(r, l, d) : true : !!l;
    return false;
  }
  function Ys(e, t, o) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return true;
    for (let n = 0; n < r.length; n++) {
      const i = r[n];
      if (Dd(t, e, i) && !Si(o, i)) return true;
    }
    return false;
  }
  function Dd(e, t, o) {
    const r = e[o], n = t[o];
    return o === "style" && Se(r) && Se(n) ? !ql(r, n) : r !== n;
  }
  function vg({ vnode: e, parent: t, suspense: o }, r) {
    for (; t; ) {
      const n = t.subTree;
      if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
      else break;
    }
    o && o.activeBranch === e && (o.vnode.el = r);
  }
  const Ld = {}, kd = () => Object.create(Ld), jd = (e) => Object.getPrototypeOf(e) === Ld;
  function xg(e, t, o, r = false) {
    const n = {}, i = kd();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), Wd(e, t, n, i);
    for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
    o ? e.props = r ? n : dd(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
  }
  function Cg(e, t, o, r) {
    const { props: n, attrs: i, vnode: { patchFlag: l } } = e, s = xe(n), [a] = e.propsOptions;
    let d = false;
    if ((r || l > 0) && !(l & 16)) {
      if (l & 8) {
        const c = e.vnode.dynamicProps;
        for (let u = 0; u < c.length; u++) {
          let f = c[u];
          if (Si(e.emitsOptions, f)) continue;
          const p = t[f];
          if (a) if (Te(i, f)) p !== i[f] && (i[f] = p, d = true);
          else {
            const h = ht(f);
            n[h] = Sl(a, s, h, p, e, false);
          }
          else p !== i[f] && (i[f] = p, d = true);
        }
      }
    } else {
      Wd(e, t, n, i) && (d = true);
      let c;
      for (const u in s) (!t || !Te(t, u) && ((c = Ho(u)) === u || !Te(t, c))) && (a ? o && (o[u] !== void 0 || o[c] !== void 0) && (n[u] = Sl(a, s, u, void 0, e, true)) : delete n[u]);
      if (i !== s) for (const u in i) (!t || !Te(t, u)) && (delete i[u], d = true);
    }
    d && io(e.attrs, "set", "");
  }
  function Wd(e, t, o, r) {
    const [n, i] = e.propsOptions;
    let l = false, s;
    if (t) for (let a in t) {
      if (Vr(a)) continue;
      const d = t[a];
      let c;
      n && Te(n, c = ht(a)) ? !i || !i.includes(c) ? o[c] = d : (s || (s = {}))[c] = d : Si(e.emitsOptions, a) || (!(a in r) || d !== r[a]) && (r[a] = d, l = true);
    }
    if (i) {
      const a = xe(o), d = s || He;
      for (let c = 0; c < i.length; c++) {
        const u = i[c];
        o[u] = Sl(n, a, u, d[u], e, !Te(d, u));
      }
    }
    return l;
  }
  function Sl(e, t, o, r, n, i) {
    const l = e[o];
    if (l != null) {
      const s = Te(l, "default");
      if (s && r === void 0) {
        const a = l.default;
        if (l.type !== Function && !l.skipFactory && me(a)) {
          const { propsDefaults: d } = n;
          if (o in d) r = d[o];
          else {
            const c = Cn(n);
            r = d[o] = a.call(null, t), c();
          }
        } else r = a;
        n.ce && n.ce._setProp(o, r);
      }
      l[0] && (i && !s ? r = false : l[1] && (r === "" || r === Ho(o)) && (r = true));
    }
    return r;
  }
  const yg = /* @__PURE__ */ new WeakMap();
  function Nd(e, t, o = false) {
    const r = o ? yg : t.propsCache, n = r.get(e);
    if (n) return n;
    const i = e.props, l = {}, s = [];
    let a = false;
    if (!me(e)) {
      const c = (u) => {
        a = true;
        const [f, p] = Nd(u, t, true);
        Ge(l, f), p && s.push(...p);
      };
      !o && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
    }
    if (!i && !a) return Se(e) && r.set(e, pr), pr;
    if (pe(i)) for (let c = 0; c < i.length; c++) {
      const u = ht(i[c]);
      Zs(u) && (l[u] = He);
    }
    else if (i) for (const c in i) {
      const u = ht(c);
      if (Zs(u)) {
        const f = i[c], p = l[u] = pe(f) || me(f) ? {
          type: f
        } : Ge({}, f), h = p.type;
        let g = false, C = true;
        if (pe(h)) for (let x = 0; x < h.length; ++x) {
          const y = h[x], _ = me(y) && y.name;
          if (_ === "Boolean") {
            g = true;
            break;
          } else _ === "String" && (C = false);
        }
        else g = me(h) && h.name === "Boolean";
        p[0] = g, p[1] = C, (g || Te(p, "default")) && s.push(u);
      }
    }
    const d = [
      l,
      s
    ];
    return Se(e) && r.set(e, d), d;
  }
  function Zs(e) {
    return e[0] !== "$" && !Vr(e);
  }
  const ss = (e) => e === "_" || e === "_ctx" || e === "$stable", as = (e) => pe(e) ? e.map(Kt) : [
    Kt(e)
  ], Sg = (e, t, o) => {
    if (t._n) return t;
    const r = kr((...n) => as(t(...n)), o);
    return r._c = false, r;
  }, Vd = (e, t, o) => {
    const r = e._ctx;
    for (const n in e) {
      if (ss(n)) continue;
      const i = e[n];
      if (me(i)) t[n] = Sg(n, i, r);
      else if (i != null) {
        const l = as(i);
        t[n] = () => l;
      }
    }
  }, Gd = (e, t) => {
    const o = as(t);
    e.slots.default = () => o;
  }, Ud = (e, t, o) => {
    for (const r in t) (o || !ss(r)) && (e[r] = t[r]);
  }, wg = (e, t, o) => {
    const r = e.slots = kd();
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? (Ud(r, t, o), o && Nc(r, "_", n, true)) : Vd(t, r);
    } else t && Gd(e, t);
  }, Pg = (e, t, o) => {
    const { vnode: r, slots: n } = e;
    let i = true, l = He;
    if (r.shapeFlag & 32) {
      const s = t._;
      s ? o && s === 1 ? i = false : Ud(n, t, o) : (i = !t.$stable, Vd(t, n)), l = t;
    } else t && (Gd(e, t), l = {
      default: 1
    });
    if (i) for (const s in n) !ss(s) && l[s] == null && delete n[s];
  }, rt = $g;
  function Tg(e) {
    return Eg(e);
  }
  function Eg(e, t) {
    const o = gi();
    o.__VUE__ = true;
    const { insert: r, remove: n, patchProp: i, createElement: l, createText: s, createComment: a, setText: d, setElementText: c, parentNode: u, nextSibling: f, setScopeId: p = Xt, insertStaticContent: h } = e, g = (m, v, P, O = null, F = null, B = null, K = void 0, V = null, W = !!v.dynamicChildren) => {
      if (m === v) return;
      m && !jo(m, v) && (O = $(m), ze(m, F, B, true), m = null), v.patchFlag === -2 && (W = false, v.dynamicChildren = null);
      const { type: z, ref: J, shapeFlag: q } = v;
      switch (z) {
        case wi:
          C(m, v, P, O);
          break;
        case Ye:
          x(m, v, P, O);
          break;
        case Zi:
          m == null && y(v, P, O, K);
          break;
        case We:
          H(m, v, P, O, F, B, K, V, W);
          break;
        default:
          q & 1 ? E(m, v, P, O, F, B, K, V, W) : q & 6 ? N(m, v, P, O, F, B, K, V, W) : (q & 64 || q & 128) && z.process(m, v, P, O, F, B, K, V, W, j);
      }
      J != null && F ? qr(J, m && m.ref, B, v || m, !v) : J == null && m && m.ref != null && qr(m.ref, null, B, m, true);
    }, C = (m, v, P, O) => {
      if (m == null) r(v.el = s(v.children), P, O);
      else {
        const F = v.el = m.el;
        v.children !== m.children && d(F, v.children);
      }
    }, x = (m, v, P, O) => {
      m == null ? r(v.el = a(v.children || ""), P, O) : v.el = m.el;
    }, y = (m, v, P, O) => {
      [m.el, m.anchor] = h(m.children, v, P, O, m.el, m.anchor);
    }, _ = ({ el: m, anchor: v }, P, O) => {
      let F;
      for (; m && m !== v; ) F = f(m), r(m, P, O), m = F;
      r(v, P, O);
    }, A = ({ el: m, anchor: v }) => {
      let P;
      for (; m && m !== v; ) P = f(m), n(m), m = P;
      n(v);
    }, E = (m, v, P, O, F, B, K, V, W) => {
      if (v.type === "svg" ? K = "svg" : v.type === "math" && (K = "mathml"), m == null) R(v, P, O, F, B, K, V, W);
      else {
        const z = m.el && m.el._isVueCE ? m.el : null;
        try {
          z && z._beginPatch(), S(m, v, F, B, K, V, W);
        } finally {
          z && z._endPatch();
        }
      }
    }, R = (m, v, P, O, F, B, K, V) => {
      let W, z;
      const { props: J, shapeFlag: q, transition: se, dirs: ce } = m;
      if (W = m.el = l(m.type, B, J && J.is, J), q & 8 ? c(W, m.children) : q & 16 && b(m.children, W, null, O, F, Yi(m, B), K, V), ce && Fo(m, null, O, "created"), w(W, m, m.scopeId, K, O), J) {
        for (const Re in J) Re !== "value" && !Vr(Re) && i(W, Re, null, J[Re], B, O);
        "value" in J && i(W, "value", null, J.value, B), (z = J.onVnodeBeforeMount) && Lt(z, O, m);
      }
      ce && Fo(m, null, O, "beforeMount");
      const ve = _g(F, se);
      ve && se.beforeEnter(W), r(W, v, P), ((z = J && J.onVnodeMounted) || ve || ce) && rt(() => {
        try {
          z && Lt(z, O, m), ve && se.enter(W), ce && Fo(m, null, O, "mounted");
        } finally {
        }
      }, F);
    }, w = (m, v, P, O, F) => {
      if (P && p(m, P), O) for (let B = 0; B < O.length; B++) p(m, O[B]);
      if (F) {
        let B = F.subTree;
        if (v === B || Xd(B.type) && (B.ssContent === v || B.ssFallback === v)) {
          const K = F.vnode;
          w(m, K, K.scopeId, K.slotScopeIds, F.parent);
        }
      }
    }, b = (m, v, P, O, F, B, K, V, W = 0) => {
      for (let z = W; z < m.length; z++) {
        const J = m[z] = V ? no(m[z]) : Kt(m[z]);
        g(null, J, v, P, O, F, B, K, V);
      }
    }, S = (m, v, P, O, F, B, K) => {
      const V = v.el = m.el;
      let { patchFlag: W, dynamicChildren: z, dirs: J } = v;
      W |= m.patchFlag & 16;
      const q = m.props || He, se = v.props || He;
      let ce;
      if (P && Mo(P, false), (ce = se.onVnodeBeforeUpdate) && Lt(ce, P, v, m), J && Fo(v, m, P, "beforeUpdate"), P && Mo(P, true), (q.innerHTML && se.innerHTML == null || q.textContent && se.textContent == null) && c(V, ""), z ? I(m.dynamicChildren, z, V, P, O, Yi(v, F), B) : K || Y(m, v, V, null, P, O, Yi(v, F), B, false), W > 0) {
        if (W & 16) D(V, q, se, P, F);
        else if (W & 2 && q.class !== se.class && i(V, "class", null, se.class, F), W & 4 && i(V, "style", q.style, se.style, F), W & 8) {
          const ve = v.dynamicProps;
          for (let Re = 0; Re < ve.length; Re++) {
            const $e = ve[Re], Me = q[$e], Ke = se[$e];
            (Ke !== Me || $e === "value") && i(V, $e, Me, Ke, F, P);
          }
        }
        W & 1 && m.children !== v.children && c(V, v.children);
      } else !K && z == null && D(V, q, se, P, F);
      ((ce = se.onVnodeUpdated) || J) && rt(() => {
        ce && Lt(ce, P, v, m), J && Fo(v, m, P, "updated");
      }, O);
    }, I = (m, v, P, O, F, B, K) => {
      for (let V = 0; V < v.length; V++) {
        const W = m[V], z = v[V], J = W.el && (W.type === We || !jo(W, z) || W.shapeFlag & 198) ? u(W.el) : P;
        g(W, z, J, null, O, F, B, K, true);
      }
    }, D = (m, v, P, O, F) => {
      if (v !== P) {
        if (v !== He) for (const B in v) !Vr(B) && !(B in P) && i(m, B, v[B], null, F, O);
        for (const B in P) {
          if (Vr(B)) continue;
          const K = P[B], V = v[B];
          K !== V && B !== "value" && i(m, B, V, K, F, O);
        }
        "value" in P && i(m, "value", v.value, P.value, F);
      }
    }, H = (m, v, P, O, F, B, K, V, W) => {
      const z = v.el = m ? m.el : s(""), J = v.anchor = m ? m.anchor : s("");
      let { patchFlag: q, dynamicChildren: se, slotScopeIds: ce } = v;
      ce && (V = V ? V.concat(ce) : ce), m == null ? (r(z, P, O), r(J, P, O), b(v.children || [], P, J, F, B, K, V, W)) : q > 0 && q & 64 && se && m.dynamicChildren && m.dynamicChildren.length === se.length ? (I(m.dynamicChildren, se, P, F, B, K, V), (v.key != null || F && v === F.subTree) && cs(m, v, true)) : Y(m, v, P, J, F, B, K, V, W);
    }, N = (m, v, P, O, F, B, K, V, W) => {
      v.slotScopeIds = V, m == null ? v.shapeFlag & 512 ? F.ctx.activate(v, P, O, K, W) : ae(v, P, O, F, B, K, W) : ue(m, v, W);
    }, ae = (m, v, P, O, F, B, K) => {
      const V = m.component = Bg(m, O, F);
      if (Ci(m) && (V.ctx.renderer = j), Fg(V, false, K), V.asyncDep) {
        if (F && F.registerDep(V, le, K), !m.el) {
          const W = V.subTree = Ze(Ye);
          x(null, W, v, P), m.placeholder = W.el;
        }
      } else le(V, m, v, P, F, B, K);
    }, ue = (m, v, P) => {
      const O = v.component = m.component;
      if (bg(m, v, P)) if (O.asyncDep && !O.asyncResolved) {
        X(O, v, P);
        return;
      } else O.next = v, O.update();
      else v.el = m.el, O.vnode = v;
    }, le = (m, v, P, O, F, B, K) => {
      const V = () => {
        if (m.isMounted) {
          let { next: q, bu: se, u: ce, parent: ve, vnode: Re } = m;
          {
            const bt = Kd(m);
            if (bt) {
              q && (q.el = Re.el, X(m, q, K)), bt.asyncDep.then(() => {
                rt(() => {
                  m.isUnmounted || z();
                }, F);
              });
              return;
            }
          }
          let $e = q, Me;
          Mo(m, false), q ? (q.el = Re.el, X(m, q, K)) : q = Re, se && Ni(se), (Me = q.props && q.props.onVnodeBeforeUpdate) && Lt(Me, ve, q, Re), Mo(m, true);
          const Ke = Xs(m), mt = m.subTree;
          m.subTree = Ke, g(mt, Ke, u(mt.el), $(mt), m, F, B), q.el = Ke.el, $e === null && vg(m, Ke.el), ce && rt(ce, F), (Me = q.props && q.props.onVnodeUpdated) && rt(() => Lt(Me, ve, q, Re), F);
        } else {
          let q;
          const { el: se, props: ce } = v, { bm: ve, m: Re, parent: $e, root: Me, type: Ke } = m, mt = mr(v);
          Mo(m, false), ve && Ni(ve), !mt && (q = ce && ce.onVnodeBeforeMount) && Lt(q, $e, v), Mo(m, true);
          {
            Me.ce && Me.ce._hasShadowRoot() && Me.ce._injectChildStyle(Ke, m.parent ? m.parent.type : void 0);
            const bt = m.subTree = Xs(m);
            g(null, bt, P, O, m, F, B), v.el = bt.el;
          }
          if (Re && rt(Re, F), !mt && (q = ce && ce.onVnodeMounted)) {
            const bt = v;
            rt(() => Lt(q, $e, bt), F);
          }
          (v.shapeFlag & 256 || $e && mr($e.vnode) && $e.vnode.shapeFlag & 256) && m.a && rt(m.a, F), m.isMounted = true, v = P = O = null;
        }
      };
      m.scope.on();
      const W = m.effect = new Yc(V);
      m.scope.off();
      const z = m.update = W.run.bind(W), J = m.job = W.runIfDirty.bind(W);
      J.i = m, J.id = m.uid, W.scheduler = () => os(J), Mo(m, true), z();
    }, X = (m, v, P) => {
      v.component = m;
      const O = m.vnode.props;
      m.vnode = v, m.next = null, Cg(m, v.props, O, P), Pg(m, v.children, P), ao(), Ds(m), co();
    }, Y = (m, v, P, O, F, B, K, V, W = false) => {
      const z = m && m.children, J = m ? m.shapeFlag : 0, q = v.children, { patchFlag: se, shapeFlag: ce } = v;
      if (se > 0) {
        if (se & 128) {
          Ae(z, q, P, O, F, B, K, V, W);
          return;
        } else if (se & 256) {
          _e(z, q, P, O, F, B, K, V, W);
          return;
        }
      }
      ce & 8 ? (J & 16 && ke(z, F, B), q !== z && c(P, q)) : J & 16 ? ce & 16 ? Ae(z, q, P, O, F, B, K, V, W) : ke(z, F, B, true) : (J & 8 && c(P, ""), ce & 16 && b(q, P, O, F, B, K, V, W));
    }, _e = (m, v, P, O, F, B, K, V, W) => {
      m = m || pr, v = v || pr;
      const z = m.length, J = v.length, q = Math.min(z, J);
      let se;
      for (se = 0; se < q; se++) {
        const ce = v[se] = W ? no(v[se]) : Kt(v[se]);
        g(m[se], ce, P, null, F, B, K, V, W);
      }
      z > J ? ke(m, F, B, true, false, q) : b(v, P, O, F, B, K, V, W, q);
    }, Ae = (m, v, P, O, F, B, K, V, W) => {
      let z = 0;
      const J = v.length;
      let q = m.length - 1, se = J - 1;
      for (; z <= q && z <= se; ) {
        const ce = m[z], ve = v[z] = W ? no(v[z]) : Kt(v[z]);
        if (jo(ce, ve)) g(ce, ve, P, null, F, B, K, V, W);
        else break;
        z++;
      }
      for (; z <= q && z <= se; ) {
        const ce = m[q], ve = v[se] = W ? no(v[se]) : Kt(v[se]);
        if (jo(ce, ve)) g(ce, ve, P, null, F, B, K, V, W);
        else break;
        q--, se--;
      }
      if (z > q) {
        if (z <= se) {
          const ce = se + 1, ve = ce < J ? v[ce].el : O;
          for (; z <= se; ) g(null, v[z] = W ? no(v[z]) : Kt(v[z]), P, ve, F, B, K, V, W), z++;
        }
      } else if (z > se) for (; z <= q; ) ze(m[z], F, B, true), z++;
      else {
        const ce = z, ve = z, Re = /* @__PURE__ */ new Map();
        for (z = ve; z <= se; z++) {
          const vt = v[z] = W ? no(v[z]) : Kt(v[z]);
          vt.key != null && Re.set(vt.key, z);
        }
        let $e, Me = 0;
        const Ke = se - ve + 1;
        let mt = false, bt = 0;
        const Co = new Array(Ke);
        for (z = 0; z < Ke; z++) Co[z] = 0;
        for (z = ce; z <= q; z++) {
          const vt = m[z];
          if (Me >= Ke) {
            ze(vt, F, B, true);
            continue;
          }
          let L;
          if (vt.key != null) L = Re.get(vt.key);
          else for ($e = ve; $e <= se; $e++) if (Co[$e - ve] === 0 && jo(vt, v[$e])) {
            L = $e;
            break;
          }
          L === void 0 ? ze(vt, F, B, true) : (Co[L - ve] = z + 1, L >= bt ? bt = L : mt = true, g(vt, v[L], P, null, F, B, K, V, W), Me++);
        }
        const eo = mt ? Rg(Co) : pr;
        for ($e = eo.length - 1, z = Ke - 1; z >= 0; z--) {
          const vt = ve + z, L = v[vt], ie = v[vt + 1], ge = vt + 1 < J ? ie.el || qd(ie) : O;
          Co[z] === 0 ? g(null, L, P, ge, F, B, K, V, W) : mt && ($e < 0 || z !== eo[$e] ? Ce(L, P, ge, 2) : $e--);
        }
      }
    }, Ce = (m, v, P, O, F = null) => {
      const { el: B, type: K, transition: V, children: W, shapeFlag: z } = m;
      if (z & 6) {
        Ce(m.component.subTree, v, P, O);
        return;
      }
      if (z & 128) {
        m.suspense.move(v, P, O);
        return;
      }
      if (z & 64) {
        K.move(m, v, P, j);
        return;
      }
      if (K === We) {
        r(B, v, P);
        for (let q = 0; q < W.length; q++) Ce(W[q], v, P, O);
        r(m.anchor, v, P);
        return;
      }
      if (K === Zi) {
        _(m, v, P);
        return;
      }
      if (O !== 2 && z & 1 && V) if (O === 0) V.beforeEnter(B), r(B, v, P), rt(() => V.enter(B), F);
      else {
        const { leave: q, delayLeave: se, afterLeave: ce } = V, ve = () => {
          m.ctx.isUnmounted ? n(B) : r(B, v, P);
        }, Re = () => {
          B._isLeaving && B[Gt](true), q(B, () => {
            ve(), ce && ce();
          });
        };
        se ? se(B, ve, Re) : Re();
      }
      else r(B, v, P);
    }, ze = (m, v, P, O = false, F = false) => {
      const { type: B, props: K, ref: V, children: W, dynamicChildren: z, shapeFlag: J, patchFlag: q, dirs: se, cacheIndex: ce, memo: ve } = m;
      if (q === -2 && (F = false), V != null && (ao(), qr(V, null, P, m, true), co()), ce != null && (v.renderCache[ce] = void 0), J & 256) {
        v.ctx.deactivate(m);
        return;
      }
      const Re = J & 1 && se, $e = !mr(m);
      let Me;
      if ($e && (Me = K && K.onVnodeBeforeUnmount) && Lt(Me, v, m), J & 6) ct(m.component, P, O);
      else {
        if (J & 128) {
          m.suspense.unmount(P, O);
          return;
        }
        Re && Fo(m, null, v, "beforeUnmount"), J & 64 ? m.type.remove(m, v, P, j, O) : z && !z.hasOnce && (B !== We || q > 0 && q & 64) ? ke(z, v, P, false, true) : (B === We && q & 384 || !F && J & 16) && ke(W, v, P), O && Qe(m);
      }
      const Ke = ve != null && ce == null;
      ($e && (Me = K && K.onVnodeUnmounted) || Re || Ke) && rt(() => {
        Me && Lt(Me, v, m), Re && Fo(m, null, v, "unmounted"), Ke && (m.el = null);
      }, P);
    }, Qe = (m) => {
      const { type: v, el: P, anchor: O, transition: F } = m;
      if (v === We) {
        Ue(P, O);
        return;
      }
      if (v === Zi) {
        A(m);
        return;
      }
      const B = () => {
        n(P), F && !F.persisted && F.afterLeave && F.afterLeave();
      };
      if (m.shapeFlag & 1 && F && !F.persisted) {
        const { leave: K, delayLeave: V } = F, W = () => K(P, B);
        V ? V(m.el, B, W) : W();
      } else B();
    }, Ue = (m, v) => {
      let P;
      for (; m !== v; ) P = f(m), n(m), m = P;
      n(v);
    }, ct = (m, v, P) => {
      const { bum: O, scope: F, job: B, subTree: K, um: V, m: W, a: z } = m;
      Qs(W), Qs(z), O && Ni(O), F.stop(), B && (B.flags |= 8, ze(K, m, v, P)), V && rt(V, v), rt(() => {
        m.isUnmounted = true;
      }, v);
    }, ke = (m, v, P, O = false, F = false, B = 0) => {
      for (let K = B; K < m.length; K++) ze(m[K], v, P, O, F);
    }, $ = (m) => {
      if (m.shapeFlag & 6) return $(m.component.subTree);
      if (m.shapeFlag & 128) return m.suspense.next();
      const v = f(m.anchor || m.el), P = v && v[Cd];
      return P ? f(P) : v;
    };
    let Z = false;
    const U = (m, v, P) => {
      let O;
      m == null ? v._vnode && (ze(v._vnode, null, null, true), O = v._vnode.component) : g(v._vnode || null, m, v, null, null, null, P), v._vnode = m, Z || (Z = true, Ds(O), md(), Z = false);
    }, j = {
      p: g,
      um: ze,
      m: Ce,
      r: Qe,
      mt: ae,
      mc: b,
      pc: Y,
      pbc: I,
      n: $,
      o: e
    };
    return {
      render: U,
      hydrate: void 0,
      createApp: ug(U)
    };
  }
  function Yi({ type: e, props: t }, o) {
    return o === "svg" && e === "foreignObject" || o === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : o;
  }
  function Mo({ effect: e, job: t }, o) {
    o ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function _g(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function cs(e, t, o = false) {
    const r = e.children, n = t.children;
    if (pe(r) && pe(n)) for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let s = n[i];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = n[i] = no(n[i]), s.el = l.el), !o && s.patchFlag !== -2 && cs(l, s)), s.type === wi && (s.patchFlag === -1 && (s = n[i] = no(s)), s.el = l.el), s.type === Ye && !s.el && (s.el = l.el);
    }
  }
  function Rg(e) {
    const t = e.slice(), o = [
      0
    ];
    let r, n, i, l, s;
    const a = e.length;
    for (r = 0; r < a; r++) {
      const d = e[r];
      if (d !== 0) {
        if (n = o[o.length - 1], e[n] < d) {
          t[r] = n, o.push(r);
          continue;
        }
        for (i = 0, l = o.length - 1; i < l; ) s = i + l >> 1, e[o[s]] < d ? i = s + 1 : l = s;
        d < e[o[i]] && (i > 0 && (t[r] = o[i - 1]), o[i] = r);
      }
    }
    for (i = o.length, l = o[i - 1]; i-- > 0; ) o[i] = l, l = t[l];
    return o;
  }
  function Kd(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Kd(t);
  }
  function Qs(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  function qd(e) {
    if (e.placeholder) return e.placeholder;
    const t = e.component;
    return t ? qd(t.subTree) : null;
  }
  const Xd = (e) => e.__isSuspense;
  function $g(e, t) {
    t && t.pendingBranch ? pe(e) ? t.effects.push(...e) : t.effects.push(e) : Dh(e);
  }
  let Ye, Zi, Yr;
  We = Symbol.for("v-fgt");
  wi = Symbol.for("v-txt");
  Ye = Symbol.for("v-cmt");
  Zi = Symbol.for("v-stc");
  Yr = [];
  let wt = null;
  Zn = function(e = false) {
    Yr.push(wt = e ? null : []);
  };
  function Ag() {
    Yr.pop(), wt = Yr[Yr.length - 1] || null;
  }
  let sn = 1;
  function Qn(e, t = false) {
    sn += e, e < 0 && wt && t && (wt.hasOnce = true);
  }
  function Yd(e) {
    return e.dynamicChildren = sn > 0 ? wt || pr : null, Ag(), sn > 0 && wt && wt.push(e), e;
  }
  j2 = function(e, t, o, r, n, i) {
    return Yd(Qd(e, t, o, r, n, i, true));
  };
  Jn = function(e, t, o, r, n) {
    return Yd(Ze(e, t, o, r, n, true));
  };
  function Cr(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function jo(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const Zd = ({ key: e }) => e ?? null, jn = ({ ref: e, ref_key: t, ref_for: o }) => (typeof e == "number" && (e = "" + e), e != null ? Ne(e) || Le(e) || me(e) ? {
    i: et,
    r: e,
    k: t,
    f: !!o
  } : e : null);
  Qd = function(e, t = null, o = null, r = 0, n = null, i = e === We ? 0 : 1, l = false, s = false) {
    const a = {
      __v_isVNode: true,
      __v_skip: true,
      type: e,
      props: t,
      key: t && Zd(t),
      ref: t && jn(t),
      scopeId: vd,
      slotScopeIds: null,
      children: o,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: r,
      dynamicProps: n,
      dynamicChildren: null,
      appContext: null,
      ctx: et
    };
    return s ? (ds(a, o), i & 128 && e.normalize(a)) : o && (a.shapeFlag |= Ne(o) ? 8 : 16), sn > 0 && !l && wt && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && wt.push(a), a;
  };
  Ze = Ig;
  function Ig(e, t = null, o = null, r = 0, n = null, i = false) {
    if ((!e || e === tg) && (e = Ye), Cr(e)) {
      const s = fo(e, t, true);
      return o && ds(s, o), sn > 0 && !i && wt && (s.shapeFlag & 6 ? wt[wt.indexOf(e)] = s : wt.push(s)), s.patchFlag = -2, s;
    }
    if (jg(e) && (e = e.__vccOpts), t) {
      t = zg(t);
      let { class: s, style: a } = t;
      s && !Ne(s) && (t.class = vr(s)), Se(a) && (bi(a) && !pe(a) && (a = Ge({}, a)), t.style = Kl(a));
    }
    const l = Ne(e) ? 1 : Xd(e) ? 128 : yd(e) ? 64 : Se(e) ? 4 : me(e) ? 2 : 0;
    return Qd(e, t, o, r, n, l, i, true);
  }
  function zg(e) {
    return e ? bi(e) || jd(e) ? Ge({}, e) : e : null;
  }
  fo = function(e, t, o = false, r = false) {
    const { props: n, ref: i, patchFlag: l, children: s, transition: a } = e, d = t ? us(n || {}, t) : n, c = {
      __v_isVNode: true,
      __v_skip: true,
      type: e.type,
      props: d,
      key: d && Zd(d),
      ref: t && t.ref ? o && i ? pe(i) ? i.concat(jn(t)) : [
        i,
        jn(t)
      ] : jn(t) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: s,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== We ? l === -1 ? 16 : l | 16 : l,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: a,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && fo(e.ssContent),
      ssFallback: e.ssFallback && fo(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
    return a && r && Qo(c, a.clone(c)), c;
  };
  an = function(e = " ", t = 0) {
    return Ze(wi, null, e, t);
  };
  W2 = function(e = "", t = false) {
    return t ? (Zn(), Jn(Ye, null, e)) : Ze(Ye, null, e);
  };
  function Kt(e) {
    return e == null || typeof e == "boolean" ? Ze(Ye) : pe(e) ? Ze(We, null, e.slice()) : Cr(e) ? no(e) : Ze(wi, null, String(e));
  }
  function no(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : fo(e);
  }
  function ds(e, t) {
    let o = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (pe(t)) o = 16;
    else if (typeof t == "object") if (r & 65) {
      const n = t.default;
      n && (n._c && (n._d = false), ds(e, n()), n._c && (n._d = true));
      return;
    } else {
      o = 32;
      const n = t._;
      !n && !jd(t) ? t._ctx = et : n === 3 && et && (et.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
    else me(t) ? (t = {
      default: t,
      _ctx: et
    }, o = 32) : (t = String(t), r & 64 ? (o = 16, t = [
      an(t)
    ]) : o = 8);
    e.children = t, e.shapeFlag |= o;
  }
  us = function(...e) {
    const t = {};
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      for (const n in r) if (n === "class") t.class !== r.class && (t.class = vr([
        t.class,
        r.class
      ]));
      else if (n === "style") t.style = Kl([
        t.style,
        r.style
      ]);
      else if (di(n)) {
        const i = t[n], l = r[n];
        l && i !== l && !(pe(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !ui(n) && (t[n] = l);
      } else n !== "" && (t[n] = r[n]);
    }
    return t;
  };
  function Lt(e, t, o, r = null) {
    Ft(e, t, 7, [
      o,
      r
    ]);
  }
  const Hg = Fd();
  let Og = 0;
  function Bg(e, t, o) {
    const r = e.type, n = (t ? t.appContext : e.appContext) || Hg, i = {
      uid: Og++,
      vnode: e,
      type: r,
      parent: t,
      appContext: n,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Kc(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(n.provides),
      ids: t ? t.ids : [
        "",
        0,
        0
      ],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Nd(r, n),
      emitsOptions: Md(r, n),
      emit: null,
      emitted: null,
      propsDefaults: He,
      inheritAttrs: r.inheritAttrs,
      ctx: He,
      data: He,
      props: He,
      attrs: He,
      slots: He,
      refs: He,
      setupState: He,
      setupContext: null,
      suspense: o,
      suspenseId: o ? o.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    return i.ctx = {
      _: i
    }, i.root = t ? t.root : i, i.emit = pg.bind(null, i), e.ce && e.ce(i), i;
  }
  let st = null;
  Tr = () => st || et;
  let ei, wl;
  {
    const e = gi(), t = (o, r) => {
      let n;
      return (n = e[o]) || (n = e[o] = []), n.push(r), (i) => {
        n.length > 1 ? n.forEach((l) => l(i)) : n[0](i);
      };
    };
    ei = t("__VUE_INSTANCE_SETTERS__", (o) => st = o), wl = t("__VUE_SSR_SETTERS__", (o) => cn = o);
  }
  const Cn = (e) => {
    const t = st;
    return ei(e), e.scope.on(), () => {
      e.scope.off(), ei(t);
    };
  }, Js = () => {
    st && st.scope.off(), ei(null);
  };
  function Jd(e) {
    return e.vnode.shapeFlag & 4;
  }
  let cn = false;
  function Fg(e, t = false, o = false) {
    t && wl(t);
    const { props: r, children: n } = e.vnode, i = Jd(e);
    xg(e, r, i, t), wg(e, n, o || t);
    const l = i ? Mg(e, t) : void 0;
    return t && wl(false), l;
  }
  function Mg(e, t) {
    const o = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ng);
    const { setup: r } = o;
    if (r) {
      ao();
      const n = e.setupContext = r.length > 1 ? Lg(e) : null, i = Cn(e), l = xn(r, e, 0, [
        e.props,
        n
      ]), s = kc(l);
      if (co(), i(), (s || e.sp) && !mr(e) && Rd(e), s) {
        if (l.then(Js, Js), t) return l.then((a) => {
          ea(e, a);
        }).catch((a) => {
          vi(a, e, 0);
        });
        e.asyncDep = l;
      } else ea(e, l);
    } else eu(e);
  }
  function ea(e, t, o) {
    me(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Se(t) && (e.setupState = fd(t)), eu(e);
  }
  function eu(e, t, o) {
    const r = e.type;
    e.render || (e.render = r.render || Xt);
    {
      const n = Cn(e);
      ao();
      try {
        ig(e);
      } finally {
        co(), n();
      }
    }
  }
  const Dg = {
    get(e, t) {
      return it(e, "get", ""), e[t];
    }
  };
  function Lg(e) {
    const t = (o) => {
      e.exposed = o || {};
    };
    return {
      attrs: new Proxy(e.attrs, Dg),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
  }
  function Pi(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(fd(rn(e.exposed)), {
      get(t, o) {
        if (o in t) return t[o];
        if (o in Xr) return Xr[o](e);
      },
      has(t, o) {
        return o in t || o in Xr;
      }
    })) : e.proxy;
  }
  function kg(e, t = true) {
    return me(e) ? e.displayName || e.name : e.name || t && e.__name;
  }
  function jg(e) {
    return me(e) && "__vccOpts" in e;
  }
  Q = (e, t) => Hh(e, t, cn);
  T = function(e, t, o) {
    try {
      Qn(-1);
      const r = arguments.length;
      return r === 2 ? Se(t) && !pe(t) ? Cr(t) ? Ze(e, null, [
        t
      ]) : Ze(e, t) : Ze(e, null, t) : (r > 3 ? o = Array.prototype.slice.call(arguments, 2) : r === 3 && Cr(o) && (o = [
        o
      ]), Ze(e, t, o));
    } finally {
      Qn(1);
    }
  };
  const Wg = "3.5.31";
  let Pl;
  const ta = typeof window < "u" && window.trustedTypes;
  if (ta) try {
    Pl = ta.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
  let tu, Ng, Vg, ro, oa, Gg, So, Or, yr, ou, ru, Ug, Do, ra;
  tu = Pl ? (e) => Pl.createHTML(e) : (e) => e;
  Ng = "http://www.w3.org/2000/svg";
  Vg = "http://www.w3.org/1998/Math/MathML";
  ro = typeof document < "u" ? document : null;
  oa = ro && ro.createElement("template");
  Gg = {
    insert: (e, t, o) => {
      t.insertBefore(e, o || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, o, r) => {
      const n = t === "svg" ? ro.createElementNS(Ng, e) : t === "mathml" ? ro.createElementNS(Vg, e) : o ? ro.createElement(e, {
        is: o
      }) : ro.createElement(e);
      return e === "select" && r && r.multiple != null && n.setAttribute("multiple", r.multiple), n;
    },
    createText: (e) => ro.createTextNode(e),
    createComment: (e) => ro.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ro.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, o, r, n, i) {
      const l = o ? o.previousSibling : t.lastChild;
      if (n && (n === i || n.nextSibling)) for (; t.insertBefore(n.cloneNode(true), o), !(n === i || !(n = n.nextSibling)); ) ;
      else {
        oa.innerHTML = tu(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
        const s = oa.content;
        if (r === "svg" || r === "mathml") {
          const a = s.firstChild;
          for (; a.firstChild; ) s.appendChild(a.firstChild);
          s.removeChild(a);
        }
        t.insertBefore(s, o);
      }
      return [
        l ? l.nextSibling : t.firstChild,
        o ? o.previousSibling : t.lastChild
      ];
    }
  };
  So = "transition";
  Or = "animation";
  yr = Symbol("_vtc");
  ou = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [
      String,
      Number,
      Object
    ],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  ru = Ge({}, Pd, ou);
  Ug = (e) => (e.displayName = "Transition", e.props = ru, e);
  Jo = Ug((e, { slots: t }) => T(Uh, nu(e), t));
  Do = (e, t = []) => {
    pe(e) ? e.forEach((o) => o(...t)) : e && e(...t);
  };
  ra = (e) => e ? pe(e) ? e.some((t) => t.length > 1) : e.length > 1 : false;
  function nu(e) {
    const t = {};
    for (const H in e) H in ou || (t[H] = e[H]);
    if (e.css === false) return t;
    const { name: o = "v", type: r, duration: n, enterFromClass: i = `${o}-enter-from`, enterActiveClass: l = `${o}-enter-active`, enterToClass: s = `${o}-enter-to`, appearFromClass: a = i, appearActiveClass: d = l, appearToClass: c = s, leaveFromClass: u = `${o}-leave-from`, leaveActiveClass: f = `${o}-leave-active`, leaveToClass: p = `${o}-leave-to` } = e, h = Kg(n), g = h && h[0], C = h && h[1], { onBeforeEnter: x, onEnter: y, onEnterCancelled: _, onLeave: A, onLeaveCancelled: E, onBeforeAppear: R = x, onAppear: w = y, onAppearCancelled: b = _ } = t, S = (H, N, ae, ue) => {
      H._enterCancelled = ue, To(H, N ? c : s), To(H, N ? d : l), ae && ae();
    }, I = (H, N) => {
      H._isLeaving = false, To(H, u), To(H, p), To(H, f), N && N();
    }, D = (H) => (N, ae) => {
      const ue = H ? w : y, le = () => S(N, H, ae);
      Do(ue, [
        N,
        le
      ]), na(() => {
        To(N, H ? a : i), Wt(N, H ? c : s), ra(ue) || ia(N, r, g, le);
      });
    };
    return Ge(t, {
      onBeforeEnter(H) {
        Do(x, [
          H
        ]), Wt(H, i), Wt(H, l);
      },
      onBeforeAppear(H) {
        Do(R, [
          H
        ]), Wt(H, a), Wt(H, d);
      },
      onEnter: D(false),
      onAppear: D(true),
      onLeave(H, N) {
        H._isLeaving = true;
        const ae = () => I(H, N);
        Wt(H, u), H._enterCancelled ? (Wt(H, f), Tl(H)) : (Tl(H), Wt(H, f)), na(() => {
          H._isLeaving && (To(H, u), Wt(H, p), ra(A) || ia(H, r, C, ae));
        }), Do(A, [
          H,
          ae
        ]);
      },
      onEnterCancelled(H) {
        S(H, false, void 0, true), Do(_, [
          H
        ]);
      },
      onAppearCancelled(H) {
        S(H, true, void 0, true), Do(b, [
          H
        ]);
      },
      onLeaveCancelled(H) {
        I(H), Do(E, [
          H
        ]);
      }
    });
  }
  function Kg(e) {
    if (e == null) return null;
    if (Se(e)) return [
      Qi(e.enter),
      Qi(e.leave)
    ];
    {
      const t = Qi(e);
      return [
        t,
        t
      ];
    }
  }
  function Qi(e) {
    return Qp(e);
  }
  function Wt(e, t) {
    t.split(/\s+/).forEach((o) => o && e.classList.add(o)), (e[yr] || (e[yr] = /* @__PURE__ */ new Set())).add(t);
  }
  function To(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const o = e[yr];
    o && (o.delete(t), o.size || (e[yr] = void 0));
  }
  function na(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let qg = 0;
  function ia(e, t, o, r) {
    const n = e._endId = ++qg, i = () => {
      n === e._endId && r();
    };
    if (o != null) return setTimeout(i, o);
    const { type: l, timeout: s, propCount: a } = iu(e, t);
    if (!l) return r();
    const d = l + "end";
    let c = 0;
    const u = () => {
      e.removeEventListener(d, f), i();
    }, f = (p) => {
      p.target === e && ++c >= a && u();
    };
    setTimeout(() => {
      c < a && u();
    }, s + 1), e.addEventListener(d, f);
  }
  function iu(e, t) {
    const o = window.getComputedStyle(e), r = (h) => (o[h] || "").split(", "), n = r(`${So}Delay`), i = r(`${So}Duration`), l = la(n, i), s = r(`${Or}Delay`), a = r(`${Or}Duration`), d = la(s, a);
    let c = null, u = 0, f = 0;
    t === So ? l > 0 && (c = So, u = l, f = i.length) : t === Or ? d > 0 && (c = Or, u = d, f = a.length) : (u = Math.max(l, d), c = u > 0 ? l > d ? So : Or : null, f = c ? c === So ? i.length : a.length : 0);
    const p = c === So && /\b(?:transform|all)(?:,|$)/.test(r(`${So}Property`).toString());
    return {
      type: c,
      timeout: u,
      propCount: f,
      hasTransform: p
    };
  }
  function la(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((o, r) => sa(o) + sa(e[r])));
  }
  function sa(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function Tl(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight;
  }
  function Xg(e, t, o) {
    const r = e[yr];
    r && (t = (t ? [
      t,
      ...r
    ] : [
      ...r
    ]).join(" ")), t == null ? e.removeAttribute("class") : o ? e.setAttribute("class", t) : e.className = t;
  }
  let ti, lu;
  ti = Symbol("_vod");
  lu = Symbol("_vsh");
  aa = {
    name: "show",
    beforeMount(e, { value: t }, { transition: o }) {
      e[ti] = e.style.display === "none" ? "" : e.style.display, o && t ? o.beforeEnter(e) : Br(e, t);
    },
    mounted(e, { value: t }, { transition: o }) {
      o && t && o.enter(e);
    },
    updated(e, { value: t, oldValue: o }, { transition: r }) {
      !t != !o && (r ? t ? (r.beforeEnter(e), Br(e, true), r.enter(e)) : r.leave(e, () => {
        Br(e, false);
      }) : Br(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Br(e, t);
    }
  };
  function Br(e, t) {
    e.style.display = t ? e[ti] : "none", e[lu] = !t;
  }
  const Yg = Symbol(""), Zg = /(?:^|;)\s*display\s*:/;
  function Qg(e, t, o) {
    const r = e.style, n = Ne(o);
    let i = false;
    if (o && !n) {
      if (t) if (Ne(t)) for (const l of t.split(";")) {
        const s = l.slice(0, l.indexOf(":")).trim();
        o[s] == null && Wn(r, s, "");
      }
      else for (const l in t) o[l] == null && Wn(r, l, "");
      for (const l in o) l === "display" && (i = true), Wn(r, l, o[l]);
    } else if (n) {
      if (t !== o) {
        const l = r[Yg];
        l && (o += ";" + l), r.cssText = o, i = Zg.test(o);
      }
    } else t && e.removeAttribute("style");
    ti in e && (e[ti] = i ? r.display : "", e[lu] && (r.display = "none"));
  }
  const ca = /\s*!important$/;
  function Wn(e, t, o) {
    if (pe(o)) o.forEach((r) => Wn(e, t, r));
    else if (o == null && (o = ""), t.startsWith("--")) e.setProperty(t, o);
    else {
      const r = Jg(e, t);
      ca.test(o) ? e.setProperty(Ho(r), o.replace(ca, ""), "important") : e[r] = o;
    }
  }
  const da = [
    "Webkit",
    "Moz",
    "ms"
  ], Ji = {};
  function Jg(e, t) {
    const o = Ji[t];
    if (o) return o;
    let r = ht(t);
    if (r !== "filter" && r in e) return Ji[t] = r;
    r = hi(r);
    for (let n = 0; n < da.length; n++) {
      const i = da[n] + r;
      if (i in e) return Ji[t] = i;
    }
    return t;
  }
  const ua = "http://www.w3.org/1999/xlink";
  function fa(e, t, o, r, n, i = nh(t)) {
    r && t.startsWith("xlink:") ? o == null ? e.removeAttributeNS(ua, t.slice(6, t.length)) : e.setAttributeNS(ua, t, o) : o == null || i && !Vc(o) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Et(o) ? String(o) : o);
  }
  function pa(e, t, o, r, n) {
    if (t === "innerHTML" || t === "textContent") {
      o != null && (e[t] = t === "innerHTML" ? tu(o) : o);
      return;
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
      const s = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = o == null ? e.type === "checkbox" ? "on" : "" : String(o);
      (s !== a || !("_value" in e)) && (e.value = a), o == null && e.removeAttribute(t), e._value = o;
      return;
    }
    let l = false;
    if (o === "" || o == null) {
      const s = typeof e[t];
      s === "boolean" ? o = Vc(o) : o == null && s === "string" ? (o = "", l = true) : s === "number" && (o = 0, l = true);
    }
    try {
      e[t] = o;
    } catch {
    }
    l && e.removeAttribute(n || t);
  }
  function em(e, t, o, r) {
    e.addEventListener(t, o, r);
  }
  function tm(e, t, o, r) {
    e.removeEventListener(t, o, r);
  }
  const ha = Symbol("_vei");
  function om(e, t, o, r, n = null) {
    const i = e[ha] || (e[ha] = {}), l = i[t];
    if (r && l) l.value = r;
    else {
      const [s, a] = rm(t);
      if (r) {
        const d = i[t] = lm(r, n);
        em(e, s, d, a);
      } else l && (tm(e, s, l, a), i[t] = void 0);
    }
  }
  const ga = /(?:Once|Passive|Capture)$/;
  function rm(e) {
    let t;
    if (ga.test(e)) {
      t = {};
      let r;
      for (; r = e.match(ga); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
    }
    return [
      e[2] === ":" ? e.slice(3) : Ho(e.slice(2)),
      t
    ];
  }
  let el = 0;
  const nm = Promise.resolve(), im = () => el || (nm.then(() => el = 0), el = Date.now());
  function lm(e, t) {
    const o = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= o.attached) return;
      Ft(sm(r, o.value), t, 5, [
        r
      ]);
    };
    return o.value = e, o.attached = im(), o;
  }
  function sm(e, t) {
    if (pe(t)) {
      const o = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        o.call(e), e._stopped = true;
      }, t.map((r) => (n) => !n._stopped && r && r(n));
    } else return t;
  }
  const ma = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, am = (e, t, o, r, n, i) => {
    const l = n === "svg";
    t === "class" ? Xg(e, r, l) : t === "style" ? Qg(e, o, r) : di(t) ? ui(t) || om(e, t, o, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : cm(e, t, r, l)) ? (pa(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fa(e, t, r, l, i, t !== "value")) : e._isVueCE && (dm(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ne(r))) ? pa(e, ht(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), fa(e, t, r, l));
  };
  function cm(e, t, o, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ma(t) && me(o));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
    if (t === "width" || t === "height") {
      const n = e.tagName;
      if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return false;
    }
    return ma(t) && Ne(o) ? false : t in e;
  }
  function dm(e, t) {
    const o = e._def.props;
    if (!o) return false;
    const r = ht(t);
    return Array.isArray(o) ? o.some((n) => ht(n) === r) : Object.keys(o).some((n) => ht(n) === r);
  }
  const su = /* @__PURE__ */ new WeakMap(), au = /* @__PURE__ */ new WeakMap(), oi = Symbol("_moveCb"), ba = Symbol("_enterCb"), um = (e) => (delete e.props.mode, e), fm = um({
    name: "TransitionGroup",
    props: Ge({}, ru, {
      tag: String,
      moveClass: String
    }),
    setup(e, { slots: t }) {
      const o = Tr(), r = wd();
      let n, i;
      return zd(() => {
        if (!n.length) return;
        const l = e.moveClass || `${e.name || "v"}-move`;
        if (!bm(n[0].el, o.vnode.el, l)) {
          n = [];
          return;
        }
        n.forEach(hm), n.forEach(gm);
        const s = n.filter(mm);
        Tl(o.vnode.el), s.forEach((a) => {
          const d = a.el, c = d.style;
          Wt(d, l), c.transform = c.webkitTransform = c.transitionDuration = "";
          const u = d[oi] = (f) => {
            f && f.target !== d || (!f || f.propertyName.endsWith("transform")) && (d.removeEventListener("transitionend", u), d[oi] = null, To(d, l));
          };
          d.addEventListener("transitionend", u);
        }), n = [];
      }), () => {
        const l = xe(e), s = nu(l);
        let a = l.tag || We;
        if (n = [], i) for (let d = 0; d < i.length; d++) {
          const c = i[d];
          c.el && c.el instanceof Element && (n.push(c), Qo(c, ln(c, s, r, o)), su.set(c, cu(c.el)));
        }
        i = t.default ? is(t.default()) : [];
        for (let d = 0; d < i.length; d++) {
          const c = i[d];
          c.key != null && Qo(c, ln(c, s, r, o));
        }
        return Ze(a, null, i);
      };
    }
  }), pm = fm;
  function hm(e) {
    const t = e.el;
    t[oi] && t[oi](), t[ba] && t[ba]();
  }
  function gm(e) {
    au.set(e, cu(e.el));
  }
  function mm(e) {
    const t = su.get(e), o = au.get(e), r = t.left - o.left, n = t.top - o.top;
    if (r || n) {
      const i = e.el, l = i.style, s = i.getBoundingClientRect();
      let a = 1, d = 1;
      return i.offsetWidth && (a = s.width / i.offsetWidth), i.offsetHeight && (d = s.height / i.offsetHeight), (!Number.isFinite(a) || a === 0) && (a = 1), (!Number.isFinite(d) || d === 0) && (d = 1), Math.abs(a - 1) < 0.01 && (a = 1), Math.abs(d - 1) < 0.01 && (d = 1), l.transform = l.webkitTransform = `translate(${r / a}px,${n / d}px)`, l.transitionDuration = "0s", e;
    }
  }
  function cu(e) {
    const t = e.getBoundingClientRect();
    return {
      left: t.left,
      top: t.top
    };
  }
  function bm(e, t, o) {
    const r = e.cloneNode(), n = e[yr];
    n && n.forEach((s) => {
      s.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }), o.split(/\s+/).forEach((s) => s && r.classList.add(s)), r.style.display = "none";
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(r);
    const { hasTransform: l } = iu(r);
    return i.removeChild(r), l;
  }
  let vm, xm, Cm, ym;
  vm = [
    "ctrl",
    "shift",
    "alt",
    "meta"
  ];
  xm = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => vm.some((o) => e[`${o}Key`] && !t.includes(o))
  };
  N2 = (e, t) => {
    if (!e) return e;
    const o = e._withMods || (e._withMods = {}), r = t.join(".");
    return o[r] || (o[r] = ((n, ...i) => {
      for (let l = 0; l < t.length; l++) {
        const s = xm[t[l]];
        if (s && s(n, t)) return;
      }
      return e(n, ...i);
    }));
  };
  Cm = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  };
  V2 = (e, t) => {
    const o = e._withKeys || (e._withKeys = {}), r = t.join(".");
    return o[r] || (o[r] = ((n) => {
      if (!("key" in n)) return;
      const i = Ho(n.key);
      if (t.some((l) => l === i || Cm[l] === i)) return e(n);
    }));
  };
  ym = Ge({
    patchProp: am
  }, Gg);
  let va;
  function Sm() {
    return va || (va = Tg(ym));
  }
  const wm = ((...e) => {
    const t = Sm().createApp(...e), { mount: o } = t;
    return t.mount = (r) => {
      const n = Tm(r);
      if (!n) return;
      const i = t._component;
      !me(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
      const l = o(n, false, Pm(n));
      return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), l;
    }, t;
  });
  function Pm(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
  }
  function Tm(e) {
    return Ne(e) ? document.querySelector(e) : e;
  }
  let du;
  const Ti = (e) => du = e, uu = Symbol();
  function El(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var Zr;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(Zr || (Zr = {}));
  function Em() {
    const e = qc(true), t = e.run(() => de({}));
    let o = [], r = [];
    const n = rn({
      install(i) {
        Ti(n), n._a = i, i.provide(uu, n), i.config.globalProperties.$pinia = n, r.forEach((l) => o.push(l)), r = [];
      },
      use(i) {
        return this._a ? o.push(i) : r.push(i), this;
      },
      _p: o,
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: t
    });
    return n;
  }
  const fu = () => {
  };
  function xa(e, t, o, r = fu) {
    e.add(t);
    const n = () => {
      e.delete(t) && r();
    };
    return !o && Xc() && sh(n), n;
  }
  function sr(e, ...t) {
    e.forEach((o) => {
      o(...t);
    });
  }
  const _m = (e) => e(), Ca = Symbol(), tl = Symbol();
  function _l(e, t) {
    e instanceof Map && t instanceof Map ? t.forEach((o, r) => e.set(r, o)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const o in t) {
      if (!t.hasOwnProperty(o)) continue;
      const r = t[o], n = e[o];
      El(n) && El(r) && e.hasOwnProperty(o) && !Le(r) && !so(r) ? e[o] = _l(n, r) : e[o] = r;
    }
    return e;
  }
  const Rm = Symbol();
  function $m(e) {
    return !El(e) || !Object.prototype.hasOwnProperty.call(e, Rm);
  }
  const { assign: Eo } = Object;
  function Am(e) {
    return !!(Le(e) && e.effect);
  }
  function Im(e, t, o, r) {
    const { state: n, actions: i, getters: l } = t, s = o.state.value[e];
    let a;
    function d() {
      s || (o.state.value[e] = n ? n() : {});
      const c = $h(o.state.value[e]);
      return Eo(c, i, Object.keys(l || {}).reduce((u, f) => (u[f] = rn(Q(() => {
        Ti(o);
        const p = o._s.get(e);
        return l[f].call(p, p);
      })), u), {}));
    }
    return a = pu(e, d, t, o, r, true), a;
  }
  function pu(e, t, o = {}, r, n, i) {
    let l;
    const s = Eo({
      actions: {}
    }, o), a = {
      deep: true
    };
    let d, c, u = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p;
    const h = r.state.value[e];
    !i && !h && (r.state.value[e] = {});
    let g;
    function C(b) {
      let S;
      d = c = false, typeof b == "function" ? (b(r.state.value[e]), S = {
        type: Zr.patchFunction,
        storeId: e,
        events: p
      }) : (_l(r.state.value[e], b), S = {
        type: Zr.patchObject,
        payload: b,
        storeId: e,
        events: p
      });
      const I = g = Symbol();
      Zo().then(() => {
        g === I && (d = true);
      }), c = true, sr(u, S, r.state.value[e]);
    }
    const x = i ? function() {
      const { state: S } = o, I = S ? S() : {};
      this.$patch((D) => {
        Eo(D, I);
      });
    } : fu;
    function y() {
      l.stop(), u.clear(), f.clear(), r._s.delete(e);
    }
    const _ = (b, S = "") => {
      if (Ca in b) return b[tl] = S, b;
      const I = function() {
        Ti(r);
        const D = Array.from(arguments), H = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ new Set();
        function ae(X) {
          H.add(X);
        }
        function ue(X) {
          N.add(X);
        }
        sr(f, {
          args: D,
          name: I[tl],
          store: E,
          after: ae,
          onError: ue
        });
        let le;
        try {
          le = b.apply(this && this.$id === e ? this : E, D);
        } catch (X) {
          throw sr(N, X), X;
        }
        return le instanceof Promise ? le.then((X) => (sr(H, X), X)).catch((X) => (sr(N, X), Promise.reject(X))) : (sr(H, le), le);
      };
      return I[Ca] = true, I[tl] = S, I;
    }, A = {
      _p: r,
      $id: e,
      $onAction: xa.bind(null, f),
      $patch: C,
      $reset: x,
      $subscribe(b, S = {}) {
        const I = xa(u, b, S.detached, () => D()), D = l.run(() => At(() => r.state.value[e], (H) => {
          (S.flush === "sync" ? c : d) && b({
            storeId: e,
            type: Zr.direct,
            events: p
          }, H);
        }, Eo({}, a, S)));
        return I;
      },
      $dispose: y
    }, E = Oo(A);
    r._s.set(e, E);
    const w = (r._a && r._a.runWithContext || _m)(() => r._e.run(() => (l = qc()).run(() => t({
      action: _
    }))));
    for (const b in w) {
      const S = w[b];
      if (Le(S) && !Am(S) || so(S)) i || (h && $m(S) && (Le(S) ? S.value = h[b] : _l(S, h[b])), r.state.value[e][b] = S);
      else if (typeof S == "function") {
        const I = _(S, b);
        w[b] = I, s.actions[b] = S;
      }
    }
    return Eo(E, w), Eo(xe(E), w), Object.defineProperty(E, "$state", {
      get: () => r.state.value[e],
      set: (b) => {
        C((S) => {
          Eo(S, b);
        });
      }
    }), r._p.forEach((b) => {
      Eo(E, l.run(() => b({
        store: E,
        app: r._a,
        pinia: r,
        options: s
      })));
    }), h && i && o.hydrate && o.hydrate(E.$state, h), d = true, c = true, E;
  }
  function zm(e, t, o) {
    let r;
    const n = typeof t == "function";
    r = n ? o : t;
    function i(l, s) {
      const a = Lh();
      return l = l || (a ? Ee(uu, null) : null), l && Ti(l), l = du, l._s.has(e) || (n ? pu(e, t, r, l) : Im(e, r, l)), l._s.get(e);
    }
    return i.$id = e, i;
  }
  const fr = typeof document < "u";
  function hu(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
  }
  function Hm(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && hu(e.default);
  }
  const Pe = Object.assign;
  function ol(e, t) {
    const o = {};
    for (const r in t) {
      const n = t[r];
      o[r] = Mt(n) ? n.map(e) : e(n);
    }
    return o;
  }
  const Qr = () => {
  }, Mt = Array.isArray;
  function ya(e, t) {
    const o = {};
    for (const r in e) o[r] = r in t ? t[r] : e[r];
    return o;
  }
  const gu = /#/g, Om = /&/g, Bm = /\//g, Fm = /=/g, Mm = /\?/g, mu = /\+/g, Dm = /%5B/g, Lm = /%5D/g, bu = /%5E/g, km = /%60/g, vu = /%7B/g, jm = /%7C/g, xu = /%7D/g, Wm = /%20/g;
  function fs(e) {
    return e == null ? "" : encodeURI("" + e).replace(jm, "|").replace(Dm, "[").replace(Lm, "]");
  }
  function Nm(e) {
    return fs(e).replace(vu, "{").replace(xu, "}").replace(bu, "^");
  }
  function Rl(e) {
    return fs(e).replace(mu, "%2B").replace(Wm, "+").replace(gu, "%23").replace(Om, "%26").replace(km, "`").replace(vu, "{").replace(xu, "}").replace(bu, "^");
  }
  function Vm(e) {
    return Rl(e).replace(Fm, "%3D");
  }
  function Gm(e) {
    return fs(e).replace(gu, "%23").replace(Mm, "%3F");
  }
  function Um(e) {
    return Gm(e).replace(Bm, "%2F");
  }
  function dn(e) {
    if (e == null) return null;
    try {
      return decodeURIComponent("" + e);
    } catch {
    }
    return "" + e;
  }
  const Km = /\/$/, qm = (e) => e.replace(Km, "");
  function rl(e, t, o = "/") {
    let r, n = {}, i = "", l = "";
    const s = t.indexOf("#");
    let a = t.indexOf("?");
    return a = s >= 0 && a > s ? -1 : a, a >= 0 && (r = t.slice(0, a), i = t.slice(a, s > 0 ? s : t.length), n = e(i.slice(1))), s >= 0 && (r = r || t.slice(0, s), l = t.slice(s, t.length)), r = Qm(r ?? t, o), {
      fullPath: r + i + l,
      path: r,
      query: n,
      hash: dn(l)
    };
  }
  function Xm(e, t) {
    const o = t.query ? e(t.query) : "";
    return t.path + (o && "?") + o + (t.hash || "");
  }
  function Sa(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
  }
  function Ym(e, t, o) {
    const r = t.matched.length - 1, n = o.matched.length - 1;
    return r > -1 && r === n && Sr(t.matched[r], o.matched[n]) && Cu(t.params, o.params) && e(t.query) === e(o.query) && t.hash === o.hash;
  }
  function Sr(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function Cu(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return false;
    for (var o in e) if (!Zm(e[o], t[o])) return false;
    return true;
  }
  function Zm(e, t) {
    return Mt(e) ? wa(e, t) : Mt(t) ? wa(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
  }
  function wa(e, t) {
    return Mt(t) ? e.length === t.length && e.every((o, r) => o === t[r]) : e.length === 1 && e[0] === t;
  }
  function Qm(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const o = t.split("/"), r = e.split("/"), n = r[r.length - 1];
    (n === ".." || n === ".") && r.push("");
    let i = o.length - 1, l, s;
    for (l = 0; l < r.length; l++) if (s = r[l], s !== ".") if (s === "..") i > 1 && i--;
    else break;
    return o.slice(0, i).join("/") + "/" + r.slice(l).join("/");
  }
  const wo = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  let $l = (function(e) {
    return e.pop = "pop", e.push = "push", e;
  })({}), nl = (function(e) {
    return e.back = "back", e.forward = "forward", e.unknown = "", e;
  })({});
  function Jm(e) {
    if (!e) if (fr) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), qm(e);
  }
  const eb = /^[^#]+#/;
  function tb(e, t) {
    return e.replace(eb, "#") + t;
  }
  function ob(e, t) {
    const o = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - o.left - (t.left || 0),
      top: r.top - o.top - (t.top || 0)
    };
  }
  const Ei = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function rb(e) {
    let t;
    if ("el" in e) {
      const o = e.el, r = typeof o == "string" && o.startsWith("#"), n = typeof o == "string" ? r ? document.getElementById(o.slice(1)) : document.querySelector(o) : o;
      if (!n) return;
      t = ob(n, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
  }
  function Pa(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const Al = /* @__PURE__ */ new Map();
  function nb(e, t) {
    Al.set(e, t);
  }
  function ib(e) {
    const t = Al.get(e);
    return Al.delete(e), t;
  }
  function lb(e) {
    return typeof e == "string" || e && typeof e == "object";
  }
  function yu(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  let je = (function(e) {
    return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
  })({});
  const Su = Symbol("");
  je.MATCHER_NOT_FOUND + "", je.NAVIGATION_GUARD_REDIRECT + "", je.NAVIGATION_ABORTED + "", je.NAVIGATION_CANCELLED + "", je.NAVIGATION_DUPLICATED + "";
  function wr(e, t) {
    return Pe(new Error(), {
      type: e,
      [Su]: true
    }, t);
  }
  function oo(e, t) {
    return e instanceof Error && Su in e && (t == null || !!(e.type & t));
  }
  const sb = [
    "params",
    "query",
    "hash"
  ];
  function ab(e) {
    if (typeof e == "string") return e;
    if (e.path != null) return e.path;
    const t = {};
    for (const o of sb) o in e && (t[o] = e[o]);
    return JSON.stringify(t, null, 2);
  }
  function cb(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const o = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < o.length; ++r) {
      const n = o[r].replace(mu, " "), i = n.indexOf("="), l = dn(i < 0 ? n : n.slice(0, i)), s = i < 0 ? null : dn(n.slice(i + 1));
      if (l in t) {
        let a = t[l];
        Mt(a) || (a = t[l] = [
          a
        ]), a.push(s);
      } else t[l] = s;
    }
    return t;
  }
  function Ta(e) {
    let t = "";
    for (let o in e) {
      const r = e[o];
      if (o = Vm(o), r == null) {
        r !== void 0 && (t += (t.length ? "&" : "") + o);
        continue;
      }
      (Mt(r) ? r.map((n) => n && Rl(n)) : [
        r && Rl(r)
      ]).forEach((n) => {
        n !== void 0 && (t += (t.length ? "&" : "") + o, n != null && (t += "=" + n));
      });
    }
    return t;
  }
  function db(e) {
    const t = {};
    for (const o in e) {
      const r = e[o];
      r !== void 0 && (t[o] = Mt(r) ? r.map((n) => n == null ? null : "" + n) : r == null ? r : "" + r);
    }
    return t;
  }
  const ub = Symbol(""), Ea = Symbol(""), _i = Symbol(""), ps = Symbol(""), Il = Symbol("");
  function Fr() {
    let e = [];
    function t(r) {
      return e.push(r), () => {
        const n = e.indexOf(r);
        n > -1 && e.splice(n, 1);
      };
    }
    function o() {
      e = [];
    }
    return {
      add: t,
      list: () => e.slice(),
      reset: o
    };
  }
  function Ro(e, t, o, r, n, i = (l) => l()) {
    const l = r && (r.enterCallbacks[n] = r.enterCallbacks[n] || []);
    return () => new Promise((s, a) => {
      const d = (f) => {
        f === false ? a(wr(je.NAVIGATION_ABORTED, {
          from: o,
          to: t
        })) : f instanceof Error ? a(f) : lb(f) ? a(wr(je.NAVIGATION_GUARD_REDIRECT, {
          from: t,
          to: f
        })) : (l && r.enterCallbacks[n] === l && typeof f == "function" && l.push(f), s());
      }, c = i(() => e.call(r && r.instances[n], t, o, d));
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(d)), u.catch((f) => a(f));
    });
  }
  function il(e, t, o, r, n = (i) => i()) {
    const i = [];
    for (const l of e) for (const s in l.components) {
      let a = l.components[s];
      if (!(t !== "beforeRouteEnter" && !l.instances[s])) if (hu(a)) {
        const d = (a.__vccOpts || a)[t];
        d && i.push(Ro(d, o, r, l, s, n));
      } else {
        let d = a();
        i.push(() => d.then((c) => {
          if (!c) throw new Error(`Couldn't resolve component "${s}" at "${l.path}"`);
          const u = Hm(c) ? c.default : c;
          l.mods[s] = c, l.components[s] = u;
          const f = (u.__vccOpts || u)[t];
          return f && Ro(f, o, r, l, s, n)();
        }));
      }
    }
    return i;
  }
  function fb(e, t) {
    const o = [], r = [], n = [], i = Math.max(t.matched.length, e.matched.length);
    for (let l = 0; l < i; l++) {
      const s = t.matched[l];
      s && (e.matched.find((d) => Sr(d, s)) ? r.push(s) : o.push(s));
      const a = e.matched[l];
      a && (t.matched.find((d) => Sr(d, a)) || n.push(a));
    }
    return [
      o,
      r,
      n
    ];
  }
  let pb = () => location.protocol + "//" + location.host;
  function wu(e, t) {
    const { pathname: o, search: r, hash: n } = t, i = e.indexOf("#");
    if (i > -1) {
      let l = n.includes(e.slice(i)) ? e.slice(i).length : 1, s = n.slice(l);
      return s[0] !== "/" && (s = "/" + s), Sa(s, "");
    }
    return Sa(o, e) + r + n;
  }
  function hb(e, t, o, r) {
    let n = [], i = [], l = null;
    const s = ({ state: f }) => {
      const p = wu(e, location), h = o.value, g = t.value;
      let C = 0;
      if (f) {
        if (o.value = p, t.value = f, l && l === h) {
          l = null;
          return;
        }
        C = g ? f.position - g.position : 0;
      } else r(p);
      n.forEach((x) => {
        x(o.value, h, {
          delta: C,
          type: $l.pop,
          direction: C ? C > 0 ? nl.forward : nl.back : nl.unknown
        });
      });
    };
    function a() {
      l = o.value;
    }
    function d(f) {
      n.push(f);
      const p = () => {
        const h = n.indexOf(f);
        h > -1 && n.splice(h, 1);
      };
      return i.push(p), p;
    }
    function c() {
      if (document.visibilityState === "hidden") {
        const { history: f } = window;
        if (!f.state) return;
        f.replaceState(Pe({}, f.state, {
          scroll: Ei()
        }), "");
      }
    }
    function u() {
      for (const f of i) f();
      i = [], window.removeEventListener("popstate", s), window.removeEventListener("pagehide", c), document.removeEventListener("visibilitychange", c);
    }
    return window.addEventListener("popstate", s), window.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c), {
      pauseListeners: a,
      listen: d,
      destroy: u
    };
  }
  function _a(e, t, o, r = false, n = false) {
    return {
      back: e,
      current: t,
      forward: o,
      replaced: r,
      position: window.history.length,
      scroll: n ? Ei() : null
    };
  }
  function gb(e) {
    const { history: t, location: o } = window, r = {
      value: wu(e, o)
    }, n = {
      value: t.state
    };
    n.value || i(r.value, {
      back: null,
      current: r.value,
      forward: null,
      position: t.length - 1,
      replaced: true,
      scroll: null
    }, true);
    function i(a, d, c) {
      const u = e.indexOf("#"), f = u > -1 ? (o.host && document.querySelector("base") ? e : e.slice(u)) + a : pb() + e + a;
      try {
        t[c ? "replaceState" : "pushState"](d, "", f), n.value = d;
      } catch (p) {
        console.error(p), o[c ? "replace" : "assign"](f);
      }
    }
    function l(a, d) {
      i(a, Pe({}, t.state, _a(n.value.back, a, n.value.forward, true), d, {
        position: n.value.position
      }), true), r.value = a;
    }
    function s(a, d) {
      const c = Pe({}, n.value, t.state, {
        forward: a,
        scroll: Ei()
      });
      i(c.current, c, true), i(a, Pe({}, _a(r.value, a, null), {
        position: c.position + 1
      }, d), false), r.value = a;
    }
    return {
      location: r,
      state: n,
      push: s,
      replace: l
    };
  }
  function mb(e) {
    e = Jm(e);
    const t = gb(e), o = hb(e, t.state, t.location, t.replace);
    function r(i, l = true) {
      l || o.pauseListeners(), history.go(i);
    }
    const n = Pe({
      location: "",
      base: e,
      go: r,
      createHref: tb.bind(null, e)
    }, t, o);
    return Object.defineProperty(n, "location", {
      enumerable: true,
      get: () => t.location.value
    }), Object.defineProperty(n, "state", {
      enumerable: true,
      get: () => t.state.value
    }), n;
  }
  function bb(e) {
    return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), mb(e);
  }
  let Wo = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
  })({});
  var Xe = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
  })(Xe || {});
  const vb = {
    type: Wo.Static,
    value: ""
  }, xb = /[a-zA-Z0-9_]/;
  function Cb(e) {
    if (!e) return [
      []
    ];
    if (e === "/") return [
      [
        vb
      ]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(p) {
      throw new Error(`ERR (${o})/"${d}": ${p}`);
    }
    let o = Xe.Static, r = o;
    const n = [];
    let i;
    function l() {
      i && n.push(i), i = [];
    }
    let s = 0, a, d = "", c = "";
    function u() {
      d && (o === Xe.Static ? i.push({
        type: Wo.Static,
        value: d
      }) : o === Xe.Param || o === Xe.ParamRegExp || o === Xe.ParamRegExpEnd ? (i.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), i.push({
        type: Wo.Param,
        value: d,
        regexp: c,
        repeatable: a === "*" || a === "+",
        optional: a === "*" || a === "?"
      })) : t("Invalid state to consume buffer"), d = "");
    }
    function f() {
      d += a;
    }
    for (; s < e.length; ) {
      if (a = e[s++], a === "\\" && o !== Xe.ParamRegExp) {
        r = o, o = Xe.EscapeNext;
        continue;
      }
      switch (o) {
        case Xe.Static:
          a === "/" ? (d && u(), l()) : a === ":" ? (u(), o = Xe.Param) : f();
          break;
        case Xe.EscapeNext:
          f(), o = r;
          break;
        case Xe.Param:
          a === "(" ? o = Xe.ParamRegExp : xb.test(a) ? f() : (u(), o = Xe.Static, a !== "*" && a !== "?" && a !== "+" && s--);
          break;
        case Xe.ParamRegExp:
          a === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + a : o = Xe.ParamRegExpEnd : c += a;
          break;
        case Xe.ParamRegExpEnd:
          u(), o = Xe.Static, a !== "*" && a !== "?" && a !== "+" && s--, c = "";
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return o === Xe.ParamRegExp && t(`Unfinished custom RegExp for param "${d}"`), u(), l(), n;
  }
  const Ra = "[^/]+?", yb = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  var ut = (function(e) {
    return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
  })(ut || {});
  const Sb = /[.+*?^${}()[\]/\\]/g;
  function wb(e, t) {
    const o = Pe({}, yb, t), r = [];
    let n = o.start ? "^" : "";
    const i = [];
    for (const d of e) {
      const c = d.length ? [] : [
        ut.Root
      ];
      o.strict && !d.length && (n += "/");
      for (let u = 0; u < d.length; u++) {
        const f = d[u];
        let p = ut.Segment + (o.sensitive ? ut.BonusCaseSensitive : 0);
        if (f.type === Wo.Static) u || (n += "/"), n += f.value.replace(Sb, "\\$&"), p += ut.Static;
        else if (f.type === Wo.Param) {
          const { value: h, repeatable: g, optional: C, regexp: x } = f;
          i.push({
            name: h,
            repeatable: g,
            optional: C
          });
          const y = x || Ra;
          if (y !== Ra) {
            p += ut.BonusCustomRegExp;
            try {
              `${y}`;
            } catch (A) {
              throw new Error(`Invalid custom RegExp for param "${h}" (${y}): ` + A.message);
            }
          }
          let _ = g ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
          u || (_ = C && d.length < 2 ? `(?:/${_})` : "/" + _), C && (_ += "?"), n += _, p += ut.Dynamic, C && (p += ut.BonusOptional), g && (p += ut.BonusRepeatable), y === ".*" && (p += ut.BonusWildcard);
        }
        c.push(p);
      }
      r.push(c);
    }
    if (o.strict && o.end) {
      const d = r.length - 1;
      r[d][r[d].length - 1] += ut.BonusStrict;
    }
    o.strict || (n += "/?"), o.end ? n += "$" : o.strict && !n.endsWith("/") && (n += "(?:/|$)");
    const l = new RegExp(n, o.sensitive ? "" : "i");
    function s(d) {
      const c = d.match(l), u = {};
      if (!c) return null;
      for (let f = 1; f < c.length; f++) {
        const p = c[f] || "", h = i[f - 1];
        u[h.name] = p && h.repeatable ? p.split("/") : p;
      }
      return u;
    }
    function a(d) {
      let c = "", u = false;
      for (const f of e) {
        (!u || !c.endsWith("/")) && (c += "/"), u = false;
        for (const p of f) if (p.type === Wo.Static) c += p.value;
        else if (p.type === Wo.Param) {
          const { value: h, repeatable: g, optional: C } = p, x = h in d ? d[h] : "";
          if (Mt(x) && !g) throw new Error(`Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`);
          const y = Mt(x) ? x.join("/") : x;
          if (!y) if (C) f.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : u = true);
          else throw new Error(`Missing required param "${h}"`);
          c += y;
        }
      }
      return c || "/";
    }
    return {
      re: l,
      score: r,
      keys: i,
      parse: s,
      stringify: a
    };
  }
  function Pb(e, t) {
    let o = 0;
    for (; o < e.length && o < t.length; ) {
      const r = t[o] - e[o];
      if (r) return r;
      o++;
    }
    return e.length < t.length ? e.length === 1 && e[0] === ut.Static + ut.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === ut.Static + ut.Segment ? 1 : -1 : 0;
  }
  function Pu(e, t) {
    let o = 0;
    const r = e.score, n = t.score;
    for (; o < r.length && o < n.length; ) {
      const i = Pb(r[o], n[o]);
      if (i) return i;
      o++;
    }
    if (Math.abs(n.length - r.length) === 1) {
      if ($a(r)) return 1;
      if ($a(n)) return -1;
    }
    return n.length - r.length;
  }
  function $a(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const Tb = {
    strict: false,
    end: true,
    sensitive: false
  };
  function Eb(e, t, o) {
    const r = wb(Cb(e.path), o), n = Pe(r, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
    return t && !n.record.aliasOf == !t.record.aliasOf && t.children.push(n), n;
  }
  function _b(e, t) {
    const o = [], r = /* @__PURE__ */ new Map();
    t = ya(Tb, t);
    function n(u) {
      return r.get(u);
    }
    function i(u, f, p) {
      const h = !p, g = Ia(u);
      g.aliasOf = p && p.record;
      const C = ya(t, u), x = [
        g
      ];
      if ("alias" in u) {
        const A = typeof u.alias == "string" ? [
          u.alias
        ] : u.alias;
        for (const E of A) x.push(Ia(Pe({}, g, {
          components: p ? p.record.components : g.components,
          path: E,
          aliasOf: p ? p.record : g
        })));
      }
      let y, _;
      for (const A of x) {
        const { path: E } = A;
        if (f && E[0] !== "/") {
          const R = f.record.path, w = R[R.length - 1] === "/" ? "" : "/";
          A.path = f.record.path + (E && w + E);
        }
        if (y = Eb(A, f, C), p ? p.alias.push(y) : (_ = _ || y, _ !== y && _.alias.push(y), h && u.name && !za(y) && l(u.name)), Tu(y) && a(y), g.children) {
          const R = g.children;
          for (let w = 0; w < R.length; w++) i(R[w], y, p && p.children[w]);
        }
        p = p || y;
      }
      return _ ? () => {
        l(_);
      } : Qr;
    }
    function l(u) {
      if (yu(u)) {
        const f = r.get(u);
        f && (r.delete(u), o.splice(o.indexOf(f), 1), f.children.forEach(l), f.alias.forEach(l));
      } else {
        const f = o.indexOf(u);
        f > -1 && (o.splice(f, 1), u.record.name && r.delete(u.record.name), u.children.forEach(l), u.alias.forEach(l));
      }
    }
    function s() {
      return o;
    }
    function a(u) {
      const f = Ab(u, o);
      o.splice(f, 0, u), u.record.name && !za(u) && r.set(u.record.name, u);
    }
    function d(u, f) {
      let p, h = {}, g, C;
      if ("name" in u && u.name) {
        if (p = r.get(u.name), !p) throw wr(je.MATCHER_NOT_FOUND, {
          location: u
        });
        C = p.record.name, h = Pe(Aa(f.params, p.keys.filter((_) => !_.optional).concat(p.parent ? p.parent.keys.filter((_) => _.optional) : []).map((_) => _.name)), u.params && Aa(u.params, p.keys.map((_) => _.name))), g = p.stringify(h);
      } else if (u.path != null) g = u.path, p = o.find((_) => _.re.test(g)), p && (h = p.parse(g), C = p.record.name);
      else {
        if (p = f.name ? r.get(f.name) : o.find((_) => _.re.test(f.path)), !p) throw wr(je.MATCHER_NOT_FOUND, {
          location: u,
          currentLocation: f
        });
        C = p.record.name, h = Pe({}, f.params, u.params), g = p.stringify(h);
      }
      const x = [];
      let y = p;
      for (; y; ) x.unshift(y.record), y = y.parent;
      return {
        name: C,
        path: g,
        params: h,
        matched: x,
        meta: $b(x)
      };
    }
    e.forEach((u) => i(u));
    function c() {
      o.length = 0, r.clear();
    }
    return {
      addRoute: i,
      resolve: d,
      removeRoute: l,
      clearRoutes: c,
      getRoutes: s,
      getRecordMatcher: n
    };
  }
  function Aa(e, t) {
    const o = {};
    for (const r of t) r in e && (o[r] = e[r]);
    return o;
  }
  function Ia(e) {
    const t = {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: e.aliasOf,
      beforeEnter: e.beforeEnter,
      props: Rb(e),
      children: e.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      components: "components" in e ? e.components || null : e.component && {
        default: e.component
      }
    };
    return Object.defineProperty(t, "mods", {
      value: {}
    }), t;
  }
  function Rb(e) {
    const t = {}, o = e.props || false;
    if ("component" in e) t.default = o;
    else for (const r in e.components) t[r] = typeof o == "object" ? o[r] : o;
    return t;
  }
  function za(e) {
    for (; e; ) {
      if (e.record.aliasOf) return true;
      e = e.parent;
    }
    return false;
  }
  function $b(e) {
    return e.reduce((t, o) => Pe(t, o.meta), {});
  }
  function Ab(e, t) {
    let o = 0, r = t.length;
    for (; o !== r; ) {
      const i = o + r >> 1;
      Pu(e, t[i]) < 0 ? r = i : o = i + 1;
    }
    const n = Ib(e);
    return n && (r = t.lastIndexOf(n, r - 1)), r;
  }
  function Ib(e) {
    let t = e;
    for (; t = t.parent; ) if (Tu(t) && Pu(e, t) === 0) return t;
  }
  function Tu({ record: e }) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
  }
  function Ha(e) {
    const t = Ee(_i), o = Ee(ps), r = Q(() => {
      const a = Io(e.to);
      return t.resolve(a);
    }), n = Q(() => {
      const { matched: a } = r.value, { length: d } = a, c = a[d - 1], u = o.matched;
      if (!c || !u.length) return -1;
      const f = u.findIndex(Sr.bind(null, c));
      if (f > -1) return f;
      const p = Oa(a[d - 2]);
      return d > 1 && Oa(c) === p && u[u.length - 1].path !== p ? u.findIndex(Sr.bind(null, a[d - 2])) : f;
    }), i = Q(() => n.value > -1 && Fb(o.params, r.value.params)), l = Q(() => n.value > -1 && n.value === o.matched.length - 1 && Cu(o.params, r.value.params));
    function s(a = {}) {
      if (Bb(a)) {
        const d = t[Io(e.replace) ? "replace" : "push"](Io(e.to)).catch(Qr);
        return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => d), d;
      }
      return Promise.resolve();
    }
    return {
      route: r,
      href: Q(() => r.value.href),
      isActive: i,
      isExactActive: l,
      navigate: s
    };
  }
  function zb(e) {
    return e.length === 1 ? e[0] : e;
  }
  const Hb = we({
    name: "RouterLink",
    compatConfig: {
      MODE: 3
    },
    props: {
      to: {
        type: [
          String,
          Object
        ],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      viewTransition: Boolean
    },
    useLink: Ha,
    setup(e, { slots: t }) {
      const o = Oo(Ha(e)), { options: r } = Ee(_i), n = Q(() => ({
        [Ba(e.activeClass, r.linkActiveClass, "router-link-active")]: o.isActive,
        [Ba(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: o.isExactActive
      }));
      return () => {
        const i = t.default && zb(t.default(o));
        return e.custom ? i : T("a", {
          "aria-current": o.isExactActive ? e.ariaCurrentValue : null,
          href: o.href,
          onClick: o.navigate,
          class: n.value
        }, i);
      };
    }
  }), Ob = Hb;
  function Bb(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), true;
    }
  }
  function Fb(e, t) {
    for (const o in t) {
      const r = t[o], n = e[o];
      if (typeof r == "string") {
        if (r !== n) return false;
      } else if (!Mt(n) || n.length !== r.length || r.some((i, l) => i.valueOf() !== n[l].valueOf())) return false;
    }
    return true;
  }
  function Oa(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
  }
  const Ba = (e, t, o) => e ?? t ?? o, Mb = we({
    name: "RouterView",
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: {
      MODE: 3
    },
    setup(e, { attrs: t, slots: o }) {
      const r = Ee(Il), n = Q(() => e.route || r.value), i = Ee(Ea, 0), l = Q(() => {
        let d = Io(i);
        const { matched: c } = n.value;
        let u;
        for (; (u = c[d]) && !u.components; ) d++;
        return d;
      }), s = Q(() => n.value.matched[l.value]);
      tt(Ea, Q(() => l.value + 1)), tt(ub, s), tt(Il, n);
      const a = de();
      return At(() => [
        a.value,
        s.value,
        e.name
      ], ([d, c, u], [f, p, h]) => {
        c && (c.instances[u] = d, p && p !== c && d && d === f && (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards), c.updateGuards.size || (c.updateGuards = p.updateGuards))), d && c && (!p || !Sr(c, p) || !f) && (c.enterCallbacks[u] || []).forEach((g) => g(d));
      }, {
        flush: "post"
      }), () => {
        const d = n.value, c = e.name, u = s.value, f = u && u.components[c];
        if (!f) return Fa(o.default, {
          Component: f,
          route: d
        });
        const p = u.props[c], h = p ? p === true ? d.params : typeof p == "function" ? p(d) : p : null, C = T(f, Pe({}, h, t, {
          onVnodeUnmounted: (x) => {
            x.component.isUnmounted && (u.instances[c] = null);
          },
          ref: a
        }));
        return Fa(o.default, {
          Component: C,
          route: d
        }) || C;
      };
    }
  });
  function Fa(e, t) {
    if (!e) return null;
    const o = e(t);
    return o.length === 1 ? o[0] : o;
  }
  const Db = Mb;
  function Lb(e) {
    const t = _b(e.routes, e), o = e.parseQuery || cb, r = e.stringifyQuery || Ta, n = e.history, i = Fr(), l = Fr(), s = Fr(), a = ts(wo);
    let d = wo;
    fr && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const c = ol.bind(null, ($) => "" + $), u = ol.bind(null, Um), f = ol.bind(null, dn);
    function p($, Z) {
      let U, j;
      return yu($) ? (U = t.getRecordMatcher($), j = Z) : j = $, t.addRoute(j, U);
    }
    function h($) {
      const Z = t.getRecordMatcher($);
      Z && t.removeRoute(Z);
    }
    function g() {
      return t.getRoutes().map(($) => $.record);
    }
    function C($) {
      return !!t.getRecordMatcher($);
    }
    function x($, Z) {
      if (Z = Pe({}, Z || a.value), typeof $ == "string") {
        const P = rl(o, $, Z.path), O = t.resolve({
          path: P.path
        }, Z), F = n.createHref(P.fullPath);
        return Pe(P, O, {
          params: f(O.params),
          hash: dn(P.hash),
          redirectedFrom: void 0,
          href: F
        });
      }
      let U;
      if ($.path != null) U = Pe({}, $, {
        path: rl(o, $.path, Z.path).path
      });
      else {
        const P = Pe({}, $.params);
        for (const O in P) P[O] == null && delete P[O];
        U = Pe({}, $, {
          params: u(P)
        }), Z.params = u(Z.params);
      }
      const j = t.resolve(U, Z), be = $.hash || "";
      j.params = c(f(j.params));
      const m = Xm(r, Pe({}, $, {
        hash: Nm(be),
        path: j.path
      })), v = n.createHref(m);
      return Pe({
        fullPath: m,
        hash: be,
        query: r === Ta ? db($.query) : $.query || {}
      }, j, {
        redirectedFrom: void 0,
        href: v
      });
    }
    function y($) {
      return typeof $ == "string" ? rl(o, $, a.value.path) : Pe({}, $);
    }
    function _($, Z) {
      if (d !== $) return wr(je.NAVIGATION_CANCELLED, {
        from: Z,
        to: $
      });
    }
    function A($) {
      return w($);
    }
    function E($) {
      return A(Pe(y($), {
        replace: true
      }));
    }
    function R($, Z) {
      const U = $.matched[$.matched.length - 1];
      if (U && U.redirect) {
        const { redirect: j } = U;
        let be = typeof j == "function" ? j($, Z) : j;
        return typeof be == "string" && (be = be.includes("?") || be.includes("#") ? be = y(be) : {
          path: be
        }, be.params = {}), Pe({
          query: $.query,
          hash: $.hash,
          params: be.path != null ? {} : $.params
        }, be);
      }
    }
    function w($, Z) {
      const U = d = x($), j = a.value, be = $.state, m = $.force, v = $.replace === true, P = R(U, j);
      if (P) return w(Pe(y(P), {
        state: typeof P == "object" ? Pe({}, be, P.state) : be,
        force: m,
        replace: v
      }), Z || U);
      const O = U;
      O.redirectedFrom = Z;
      let F;
      return !m && Ym(r, j, U) && (F = wr(je.NAVIGATION_DUPLICATED, {
        to: O,
        from: j
      }), Ce(j, j, true, false)), (F ? Promise.resolve(F) : I(O, j)).catch((B) => oo(B) ? oo(B, je.NAVIGATION_GUARD_REDIRECT) ? B : Ae(B) : Y(B, O, j)).then((B) => {
        if (B) {
          if (oo(B, je.NAVIGATION_GUARD_REDIRECT)) return w(Pe({
            replace: v
          }, y(B.to), {
            state: typeof B.to == "object" ? Pe({}, be, B.to.state) : be,
            force: m
          }), Z || O);
        } else B = H(O, j, true, v, be);
        return D(O, j, B), B;
      });
    }
    function b($, Z) {
      const U = _($, Z);
      return U ? Promise.reject(U) : Promise.resolve();
    }
    function S($) {
      const Z = Ue.values().next().value;
      return Z && typeof Z.runWithContext == "function" ? Z.runWithContext($) : $();
    }
    function I($, Z) {
      let U;
      const [j, be, m] = fb($, Z);
      U = il(j.reverse(), "beforeRouteLeave", $, Z);
      for (const P of j) P.leaveGuards.forEach((O) => {
        U.push(Ro(O, $, Z));
      });
      const v = b.bind(null, $, Z);
      return U.push(v), ke(U).then(() => {
        U = [];
        for (const P of i.list()) U.push(Ro(P, $, Z));
        return U.push(v), ke(U);
      }).then(() => {
        U = il(be, "beforeRouteUpdate", $, Z);
        for (const P of be) P.updateGuards.forEach((O) => {
          U.push(Ro(O, $, Z));
        });
        return U.push(v), ke(U);
      }).then(() => {
        U = [];
        for (const P of m) if (P.beforeEnter) if (Mt(P.beforeEnter)) for (const O of P.beforeEnter) U.push(Ro(O, $, Z));
        else U.push(Ro(P.beforeEnter, $, Z));
        return U.push(v), ke(U);
      }).then(() => ($.matched.forEach((P) => P.enterCallbacks = {}), U = il(m, "beforeRouteEnter", $, Z, S), U.push(v), ke(U))).then(() => {
        U = [];
        for (const P of l.list()) U.push(Ro(P, $, Z));
        return U.push(v), ke(U);
      }).catch((P) => oo(P, je.NAVIGATION_CANCELLED) ? P : Promise.reject(P));
    }
    function D($, Z, U) {
      s.list().forEach((j) => S(() => j($, Z, U)));
    }
    function H($, Z, U, j, be) {
      const m = _($, Z);
      if (m) return m;
      const v = Z === wo, P = fr ? history.state : {};
      U && (j || v ? n.replace($.fullPath, Pe({
        scroll: v && P && P.scroll
      }, be)) : n.push($.fullPath, be)), a.value = $, Ce($, Z, U, v), Ae();
    }
    let N;
    function ae() {
      N || (N = n.listen(($, Z, U) => {
        if (!ct.listening) return;
        const j = x($), be = R(j, ct.currentRoute.value);
        if (be) {
          w(Pe(be, {
            replace: true,
            force: true
          }), j).catch(Qr);
          return;
        }
        d = j;
        const m = a.value;
        fr && nb(Pa(m.fullPath, U.delta), Ei()), I(j, m).catch((v) => oo(v, je.NAVIGATION_ABORTED | je.NAVIGATION_CANCELLED) ? v : oo(v, je.NAVIGATION_GUARD_REDIRECT) ? (w(Pe(y(v.to), {
          force: true
        }), j).then((P) => {
          oo(P, je.NAVIGATION_ABORTED | je.NAVIGATION_DUPLICATED) && !U.delta && U.type === $l.pop && n.go(-1, false);
        }).catch(Qr), Promise.reject()) : (U.delta && n.go(-U.delta, false), Y(v, j, m))).then((v) => {
          v = v || H(j, m, false), v && (U.delta && !oo(v, je.NAVIGATION_CANCELLED) ? n.go(-U.delta, false) : U.type === $l.pop && oo(v, je.NAVIGATION_ABORTED | je.NAVIGATION_DUPLICATED) && n.go(-1, false)), D(j, m, v);
        }).catch(Qr);
      }));
    }
    let ue = Fr(), le = Fr(), X;
    function Y($, Z, U) {
      Ae($);
      const j = le.list();
      return j.length ? j.forEach((be) => be($, Z, U)) : console.error($), Promise.reject($);
    }
    function _e() {
      return X && a.value !== wo ? Promise.resolve() : new Promise(($, Z) => {
        ue.add([
          $,
          Z
        ]);
      });
    }
    function Ae($) {
      return X || (X = !$, ae(), ue.list().forEach(([Z, U]) => $ ? U($) : Z()), ue.reset()), $;
    }
    function Ce($, Z, U, j) {
      const { scrollBehavior: be } = e;
      if (!fr || !be) return Promise.resolve();
      const m = !U && ib(Pa($.fullPath, 0)) || (j || !U) && history.state && history.state.scroll || null;
      return Zo().then(() => be($, Z, m)).then((v) => v && rb(v)).catch((v) => Y(v, $, Z));
    }
    const ze = ($) => n.go($);
    let Qe;
    const Ue = /* @__PURE__ */ new Set(), ct = {
      currentRoute: a,
      listening: true,
      addRoute: p,
      removeRoute: h,
      clearRoutes: t.clearRoutes,
      hasRoute: C,
      getRoutes: g,
      resolve: x,
      options: e,
      push: A,
      replace: E,
      go: ze,
      back: () => ze(-1),
      forward: () => ze(1),
      beforeEach: i.add,
      beforeResolve: l.add,
      afterEach: s.add,
      onError: le.add,
      isReady: _e,
      install($) {
        $.component("RouterLink", Ob), $.component("RouterView", Db), $.config.globalProperties.$router = ct, Object.defineProperty($.config.globalProperties, "$route", {
          enumerable: true,
          get: () => Io(a)
        }), fr && !Qe && a.value === wo && (Qe = true, A(n.location).catch((j) => {
        }));
        const Z = {};
        for (const j in wo) Object.defineProperty(Z, j, {
          get: () => a.value[j],
          enumerable: true
        });
        $.provide(_i, ct), $.provide(ps, dd(Z)), $.provide(Il, a);
        const U = $.unmount;
        Ue.add($), $.unmount = function() {
          Ue.delete($), Ue.size < 1 && (d = wo, N && N(), N = null, a.value = wo, Qe = false, X = false), U();
        };
      }
    };
    function ke($) {
      return $.reduce((Z, U) => Z.then(() => S(U)), Promise.resolve());
    }
    return ct;
  }
  G2 = function() {
    return Ee(_i);
  };
  U2 = function(e) {
    return Ee(ps);
  };
  function kb(e) {
    const { extendRoutes: t, routes: o } = e;
    return t && console.warn('"extendRoutes()" is deprecated, please modify the routes directly. See https://uvr.esm.is/guide/extending-routes.html#extending-routes-at-runtime for an alternative.'), Lb(Object.assign(e, {
      routes: typeof t == "function" && t(o) || o
    }));
  }
  const jb = "modulepreload", Wb = function(e) {
    return "/admin/" + e;
  }, Ma = {}, Vt = function(t, o, r) {
    let n = Promise.resolve();
    if (o && o.length > 0) {
      let l = function(d) {
        return Promise.all(d.map((c) => Promise.resolve(c).then((u) => ({
          status: "fulfilled",
          value: u
        }), (u) => ({
          status: "rejected",
          reason: u
        }))));
      };
      document.getElementsByTagName("link");
      const s = document.querySelector("meta[property=csp-nonce]"), a = (s == null ? void 0 : s.nonce) || (s == null ? void 0 : s.getAttribute("nonce"));
      n = l(o.map((d) => {
        if (d = Wb(d), d in Ma) return;
        Ma[d] = true;
        const c = d.endsWith(".css"), u = c ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${d}"]${u}`)) return;
        const f = document.createElement("link");
        if (f.rel = c ? "stylesheet" : jb, c || (f.as = "script"), f.crossOrigin = "", f.href = d, a && f.setAttribute("nonce", a), document.head.appendChild(f), c) return new Promise((p, h) => {
          f.addEventListener("load", p), f.addEventListener("error", () => h(new Error(`Unable to preload CSS for ${d}`)));
        });
      }));
    }
    function i(l) {
      const s = new Event("vite:preloadError", {
        cancelable: true
      });
      if (s.payload = l, window.dispatchEvent(s), !s.defaultPrevented) throw l;
    }
    return n.then((l) => {
      for (const s of l || []) s.status === "rejected" && i(s.reason);
      return t().catch(i);
    });
  }, Nb = [
    {
      path: "/",
      name: "/",
      component: () => Vt(() => import("./index-C54KWarr.js"), __vite__mapDeps([0,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/backends",
      name: "/backends",
      component: () => Vt(() => import("./backends-Bn4lOUm3.js"), __vite__mapDeps([2,3,4,5,6,7,8,9,10,11,12,13,14,15]))
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: () => Vt(() => import("./dashboard-DJ5a_HJi.js"), __vite__mapDeps([16,3,4,17,14,18,19,12,5,10,7,9,11,8]))
    },
    {
      path: "/flags",
      name: "/flags",
      component: () => Vt(() => import("./flags-jmHtsGU3.js"), __vite__mapDeps([20,4,9,5,19,12]))
    },
    {
      path: "/keys",
      name: "/keys",
      component: () => Vt(() => import("./keys-aZsi-wnb.js"), __vite__mapDeps([21,17,4,5,6,7,8,9,13,14,10,11,12]))
    },
    {
      path: "/login",
      name: "/login",
      component: () => Vt(() => import("./login-CAiJMcfH.js"), __vite__mapDeps([22,6,7,5,8,9,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/mappings",
      name: "/mappings",
      component: () => Vt(() => import("./mappings-BboG9_9_.js"), __vite__mapDeps([23,4,5,6,7,8,9,10,11,12,13,15]))
    },
    {
      path: "/usage",
      name: "/usage",
      component: () => Vt(() => import("./usage-CySU1bOz.js"), __vite__mapDeps([24,4,14,8,9,11,7,12,10,5,18]))
    }
  ];
  function Vb(e) {
    const t = {};
    Object.entries(Object.assign({
      "/src/layouts/auth.vue": () => Vt(() => import("./auth-BsopSuwn.js"), []),
      "/src/layouts/default.vue": () => Vt(() => import("./default-fiezfaud.js"), __vite__mapDeps([25,11,7,9,12]))
    })).forEach(([n, i]) => {
      let l = n.replace("/src/layouts/", "").replace(".vue", "");
      t[l] = i;
    });
    function r(n, i = true) {
      return n.map((l) => {
        var _a2, _b2, _c2, _d2, _e, _f2;
        if (((_a2 = l.children) == null ? void 0 : _a2.length) > 0 && (l.children = r(l.children, false)), i) {
          if (!l.component && ((_b2 = l.children) == null ? void 0 : _b2.find((a) => {
            var _a3;
            return (a.path === "" || a.path === "/") && ((_a3 = a.meta) == null ? void 0 : _a3.isLayout);
          }))) return l;
          if (((_c2 = l.meta) == null ? void 0 : _c2.layout) !== false) return {
            path: l.path,
            component: t[((_d2 = l.meta) == null ? void 0 : _d2.layout) || "default"],
            children: l.path === "/" ? [
              l
            ] : [
              {
                ...l,
                path: ""
              }
            ],
            meta: {
              isLayout: true
            }
          };
        }
        return ((_e = l.meta) == null ? void 0 : _e.layout) ? {
          path: l.path,
          component: t[(_f2 = l.meta) == null ? void 0 : _f2.layout],
          children: [
            {
              ...l,
              path: ""
            }
          ],
          meta: {
            isLayout: true
          }
        } : l;
      });
    }
    return r(e);
  }
  Gb = zm("auth", () => {
    const e = de(sessionStorage.getItem("admin_api_key") ?? ""), t = de(sessionStorage.getItem("admin_version") ?? ""), o = Q(() => !!e.value);
    function r(i, l) {
      e.value = i, t.value = l, sessionStorage.setItem("admin_api_key", i), sessionStorage.setItem("admin_version", l);
    }
    function n() {
      e.value = "", t.value = "", sessionStorage.removeItem("admin_api_key"), sessionStorage.removeItem("admin_version");
    }
    return {
      apiKey: e,
      version: t,
      isAuthenticated: o,
      login: r,
      logout: n
    };
  });
  function Ub(e) {
    let t = ".", o = "__", r = "--", n;
    if (e) {
      let h = e.blockPrefix;
      h && (t = h), h = e.elementPrefix, h && (o = h), h = e.modifierPrefix, h && (r = h);
    }
    const i = {
      install(h) {
        n = h.c;
        const g = h.context;
        g.bem = {}, g.bem.b = null, g.bem.els = null;
      }
    };
    function l(h) {
      let g, C;
      return {
        before(x) {
          g = x.bem.b, C = x.bem.els, x.bem.els = null;
        },
        after(x) {
          x.bem.b = g, x.bem.els = C;
        },
        $({ context: x, props: y }) {
          return h = typeof h == "string" ? h : h({
            context: x,
            props: y
          }), x.bem.b = h, `${(y == null ? void 0 : y.bPrefix) || t}${x.bem.b}`;
        }
      };
    }
    function s(h) {
      let g;
      return {
        before(C) {
          g = C.bem.els;
        },
        after(C) {
          C.bem.els = g;
        },
        $({ context: C, props: x }) {
          return h = typeof h == "string" ? h : h({
            context: C,
            props: x
          }), C.bem.els = h.split(",").map((y) => y.trim()), C.bem.els.map((y) => `${(x == null ? void 0 : x.bPrefix) || t}${C.bem.b}${o}${y}`).join(", ");
        }
      };
    }
    function a(h) {
      return {
        $({ context: g, props: C }) {
          h = typeof h == "string" ? h : h({
            context: g,
            props: C
          });
          const x = h.split(",").map((A) => A.trim());
          function y(A) {
            return x.map((E) => `&${(C == null ? void 0 : C.bPrefix) || t}${g.bem.b}${A !== void 0 ? `${o}${A}` : ""}${r}${E}`).join(", ");
          }
          const _ = g.bem.els;
          return _ !== null ? y(_[0]) : y();
        }
      };
    }
    function d(h) {
      return {
        $({ context: g, props: C }) {
          h = typeof h == "string" ? h : h({
            context: g,
            props: C
          });
          const x = g.bem.els;
          return `&:not(${(C == null ? void 0 : C.bPrefix) || t}${g.bem.b}${x !== null && x.length > 0 ? `${o}${x[0]}` : ""}${r}${h})`;
        }
      };
    }
    return Object.assign(i, {
      cB: ((...h) => n(l(h[0]), h[1], h[2])),
      cE: ((...h) => n(s(h[0]), h[1], h[2])),
      cM: ((...h) => n(a(h[0]), h[1], h[2])),
      cNotM: ((...h) => n(d(h[0]), h[1], h[2]))
    }), i;
  }
  function Kb(e) {
    let t = 0;
    for (let o = 0; o < e.length; ++o) e[o] === "&" && ++t;
    return t;
  }
  const Eu = /\s*,(?![^(]*\))\s*/g, qb = /\s+/g;
  function Xb(e, t) {
    const o = [];
    return t.split(Eu).forEach((r) => {
      let n = Kb(r);
      if (n) {
        if (n === 1) {
          e.forEach((l) => {
            o.push(r.replace("&", l));
          });
          return;
        }
      } else {
        e.forEach((l) => {
          o.push((l && l + " ") + r);
        });
        return;
      }
      let i = [
        r
      ];
      for (; n--; ) {
        const l = [];
        i.forEach((s) => {
          e.forEach((a) => {
            l.push(s.replace("&", a));
          });
        }), i = l;
      }
      i.forEach((l) => o.push(l));
    }), o;
  }
  function Yb(e, t) {
    const o = [];
    return t.split(Eu).forEach((r) => {
      e.forEach((n) => {
        o.push((n && n + " ") + r);
      });
    }), o;
  }
  function Zb(e) {
    let t = [
      ""
    ];
    return e.forEach((o) => {
      o = o && o.trim(), o && (o.includes("&") ? t = Xb(t, o) : t = Yb(t, o));
    }), t.join(", ").replace(qb, " ");
  }
  function Da(e) {
    if (!e) return;
    const t = e.parentElement;
    t && t.removeChild(e);
  }
  function Ri(e, t) {
    return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
  }
  function Qb(e) {
    const t = document.createElement("style");
    return t.setAttribute("cssr-id", e), t;
  }
  function In(e) {
    return e ? /^\s*@(s|m)/.test(e) : false;
  }
  const Jb = /[A-Z]/g;
  function _u(e) {
    return e.replace(Jb, (t) => "-" + t.toLowerCase());
  }
  function ev(e, t = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${_u(o[0])}: ${o[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
  }
  function tv(e, t, o) {
    return typeof e == "function" ? e({
      context: t.context,
      props: o
    }) : e;
  }
  function La(e, t, o, r) {
    if (!t) return "";
    const n = tv(t, o, r);
    if (!n) return "";
    if (typeof n == "string") return `${e} {
${n}
}`;
    const i = Object.keys(n);
    if (i.length === 0) return o.config.keepEmptyBlock ? e + ` {
}` : "";
    const l = e ? [
      e + " {"
    ] : [];
    return i.forEach((s) => {
      const a = n[s];
      if (s === "raw") {
        l.push(`
` + a + `
`);
        return;
      }
      s = _u(s), a != null && l.push(`  ${s}${ev(a)}`);
    }), e && l.push("}"), l.join(`
`);
  }
  function zl(e, t, o) {
    e && e.forEach((r) => {
      if (Array.isArray(r)) zl(r, t, o);
      else if (typeof r == "function") {
        const n = r(t);
        Array.isArray(n) ? zl(n, t, o) : n && o(n);
      } else r && o(r);
    });
  }
  function Ru(e, t, o, r, n) {
    const i = e.$;
    let l = "";
    if (!i || typeof i == "string") In(i) ? l = i : t.push(i);
    else if (typeof i == "function") {
      const d = i({
        context: r.context,
        props: n
      });
      In(d) ? l = d : t.push(d);
    } else if (i.before && i.before(r.context), !i.$ || typeof i.$ == "string") In(i.$) ? l = i.$ : t.push(i.$);
    else if (i.$) {
      const d = i.$({
        context: r.context,
        props: n
      });
      In(d) ? l = d : t.push(d);
    }
    const s = Zb(t), a = La(s, e.props, r, n);
    l ? o.push(`${l} {`) : a.length && o.push(a), e.children && zl(e.children, {
      context: r.context,
      props: n
    }, (d) => {
      if (typeof d == "string") {
        const c = La(s, {
          raw: d
        }, r, n);
        o.push(c);
      } else Ru(d, t, o, r, n);
    }), t.pop(), l && o.push("}"), i && i.after && i.after(r.context);
  }
  function ov(e, t, o) {
    const r = [];
    return Ru(e, [], r, t, o), r.join(`

`);
  }
  function un(e) {
    for (var t = 0, o, r = 0, n = e.length; n >= 4; ++r, n -= 4) o = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, o = (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), o ^= o >>> 24, t = (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
    switch (n) {
      case 3:
        t ^= (e.charCodeAt(r + 2) & 255) << 16;
      case 2:
        t ^= (e.charCodeAt(r + 1) & 255) << 8;
      case 1:
        t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
    }
    return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
  }
  typeof window < "u" && (window.__cssrContext = {});
  function rv(e, t, o, r) {
    const { els: n } = t;
    if (o === void 0) n.forEach(Da), t.els = [];
    else {
      const i = Ri(o, r);
      i && n.includes(i) && (Da(i), t.els = n.filter((l) => l !== i));
    }
  }
  function ka(e, t) {
    e.push(t);
  }
  function nv(e, t, o, r, n, i, l, s, a) {
    let d;
    if (o === void 0 && (d = t.render(r), o = un(d)), a) {
      a.adapter(o, d ?? t.render(r));
      return;
    }
    s === void 0 && (s = document.head);
    const c = Ri(o, s);
    if (c !== null && !i) return c;
    const u = c ?? Qb(o);
    if (d === void 0 && (d = t.render(r)), u.textContent = d, c !== null) return c;
    if (l) {
      const f = s.querySelector(`meta[name="${l}"]`);
      if (f) return s.insertBefore(u, f), ka(t.els, u), u;
    }
    return n ? s.insertBefore(u, s.querySelector("style, link")) : s.appendChild(u), ka(t.els, u), u;
  }
  function iv(e) {
    return ov(this, this.instance, e);
  }
  function lv(e = {}) {
    const { id: t, ssr: o, props: r, head: n = false, force: i = false, anchorMetaName: l, parent: s } = e;
    return nv(this.instance, this, t, r, n, i, l, s, o);
  }
  function sv(e = {}) {
    const { id: t, parent: o } = e;
    rv(this.instance, this, t, o);
  }
  const zn = function(e, t, o, r) {
    return {
      instance: e,
      $: t,
      props: o,
      children: r,
      els: [],
      render: iv,
      mount: lv,
      unmount: sv
    };
  }, av = function(e, t, o, r) {
    return Array.isArray(t) ? zn(e, {
      $: null
    }, null, t) : Array.isArray(o) ? zn(e, t, null, o) : Array.isArray(r) ? zn(e, t, o, r) : zn(e, t, o, null);
  };
  cv = function(e = {}) {
    const t = {
      c: ((...o) => av(t, ...o)),
      use: (o, ...r) => o.install(t, ...r),
      find: Ri,
      context: {},
      config: e
    };
    return t;
  };
  function dv(e, t) {
    if (e === void 0) return false;
    if (t) {
      const { context: { ids: o } } = t;
      return o.has(e);
    }
    return Ri(e) !== null;
  }
  const uv = "n", fn = `.${uv}-`, fv = "__", pv = "--", $u = cv(), Au = Ub({
    blockPrefix: fn,
    elementPrefix: fv,
    modifierPrefix: pv
  });
  $u.use(Au);
  let K2;
  ({ c: M, find: K2 } = $u);
  ({ cB: te, cE: re, cM: ne, cNotM: Hl } = Au);
  Iu = function(e) {
    return M(({ props: { bPrefix: t } }) => `${t || fn}modal, ${t || fn}drawer`, [
      e
    ]);
  };
  hv = function(e) {
    return M(({ props: { bPrefix: t } }) => `${t || fn}popover`, [
      e
    ]);
  };
  function zu(e) {
    return M(({ props: { bPrefix: t } }) => `&${t || fn}modal`, e);
  }
  q2 = (...e) => M(">", [
    te(...e)
  ]);
  he = function(e, t) {
    return e + (t === "default" ? "" : t.replace(/^[a-z]/, (o) => o.toUpperCase()));
  };
  hs = function(e) {
    return e.composedPath()[0] || null;
  };
  ja = function(e) {
    return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
  };
  gv = function(e) {
    if (e != null) return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  };
  $o = function(e, t) {
    const o = e.trim().split(/\s+/g), r = {
      top: o[0]
    };
    switch (o.length) {
      case 1:
        r.right = o[0], r.bottom = o[0], r.left = o[0];
        break;
      case 2:
        r.right = o[1], r.left = o[1], r.bottom = o[0];
        break;
      case 3:
        r.right = o[1], r.bottom = o[2], r.left = o[1];
        break;
      case 4:
        r.right = o[1], r.bottom = o[2], r.left = o[3];
        break;
      default:
        throw new Error("[seemly/getMargin]:" + e + " is not a valid value.");
    }
    return t === void 0 ? r : r[t];
  };
  const Wa = {
    aliceblue: "#F0F8FF",
    antiquewhite: "#FAEBD7",
    aqua: "#0FF",
    aquamarine: "#7FFFD4",
    azure: "#F0FFFF",
    beige: "#F5F5DC",
    bisque: "#FFE4C4",
    black: "#000",
    blanchedalmond: "#FFEBCD",
    blue: "#00F",
    blueviolet: "#8A2BE2",
    brown: "#A52A2A",
    burlywood: "#DEB887",
    cadetblue: "#5F9EA0",
    chartreuse: "#7FFF00",
    chocolate: "#D2691E",
    coral: "#FF7F50",
    cornflowerblue: "#6495ED",
    cornsilk: "#FFF8DC",
    crimson: "#DC143C",
    cyan: "#0FF",
    darkblue: "#00008B",
    darkcyan: "#008B8B",
    darkgoldenrod: "#B8860B",
    darkgray: "#A9A9A9",
    darkgrey: "#A9A9A9",
    darkgreen: "#006400",
    darkkhaki: "#BDB76B",
    darkmagenta: "#8B008B",
    darkolivegreen: "#556B2F",
    darkorange: "#FF8C00",
    darkorchid: "#9932CC",
    darkred: "#8B0000",
    darksalmon: "#E9967A",
    darkseagreen: "#8FBC8F",
    darkslateblue: "#483D8B",
    darkslategray: "#2F4F4F",
    darkslategrey: "#2F4F4F",
    darkturquoise: "#00CED1",
    darkviolet: "#9400D3",
    deeppink: "#FF1493",
    deepskyblue: "#00BFFF",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1E90FF",
    firebrick: "#B22222",
    floralwhite: "#FFFAF0",
    forestgreen: "#228B22",
    fuchsia: "#F0F",
    gainsboro: "#DCDCDC",
    ghostwhite: "#F8F8FF",
    gold: "#FFD700",
    goldenrod: "#DAA520",
    gray: "#808080",
    grey: "#808080",
    green: "#008000",
    greenyellow: "#ADFF2F",
    honeydew: "#F0FFF0",
    hotpink: "#FF69B4",
    indianred: "#CD5C5C",
    indigo: "#4B0082",
    ivory: "#FFFFF0",
    khaki: "#F0E68C",
    lavender: "#E6E6FA",
    lavenderblush: "#FFF0F5",
    lawngreen: "#7CFC00",
    lemonchiffon: "#FFFACD",
    lightblue: "#ADD8E6",
    lightcoral: "#F08080",
    lightcyan: "#E0FFFF",
    lightgoldenrodyellow: "#FAFAD2",
    lightgray: "#D3D3D3",
    lightgrey: "#D3D3D3",
    lightgreen: "#90EE90",
    lightpink: "#FFB6C1",
    lightsalmon: "#FFA07A",
    lightseagreen: "#20B2AA",
    lightskyblue: "#87CEFA",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#B0C4DE",
    lightyellow: "#FFFFE0",
    lime: "#0F0",
    limegreen: "#32CD32",
    linen: "#FAF0E6",
    magenta: "#F0F",
    maroon: "#800000",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: "#BA55D3",
    mediumpurple: "#9370DB",
    mediumseagreen: "#3CB371",
    mediumslateblue: "#7B68EE",
    mediumspringgreen: "#00FA9A",
    mediumturquoise: "#48D1CC",
    mediumvioletred: "#C71585",
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: "#FFE4B5",
    navajowhite: "#FFDEAD",
    navy: "#000080",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    orange: "#FFA500",
    orangered: "#FF4500",
    orchid: "#DA70D6",
    palegoldenrod: "#EEE8AA",
    palegreen: "#98FB98",
    paleturquoise: "#AFEEEE",
    palevioletred: "#DB7093",
    papayawhip: "#FFEFD5",
    peachpuff: "#FFDAB9",
    peru: "#CD853F",
    pink: "#FFC0CB",
    plum: "#DDA0DD",
    powderblue: "#B0E0E6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#F00",
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    silver: "#C0C0C0",
    skyblue: "#87CEEB",
    slateblue: "#6A5ACD",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    teal: "#008080",
    thistle: "#D8BFD8",
    tomato: "#FF6347",
    turquoise: "#40E0D0",
    violet: "#EE82EE",
    wheat: "#F5DEB3",
    white: "#FFF",
    whitesmoke: "#F5F5F5",
    yellow: "#FF0",
    yellowgreen: "#9ACD32",
    transparent: "#0000"
  };
  function mv(e, t, o) {
    t /= 100, o /= 100;
    let r = (n, i = (n + e / 60) % 6) => o - o * t * Math.max(Math.min(i, 4 - i, 1), 0);
    return [
      r(5) * 255,
      r(3) * 255,
      r(1) * 255
    ];
  }
  function bv(e, t, o) {
    t /= 100, o /= 100;
    let r = t * Math.min(o, 1 - o), n = (i, l = (i + e / 30) % 12) => o - r * Math.max(Math.min(l - 3, 9 - l, 1), -1);
    return [
      n(0) * 255,
      n(8) * 255,
      n(4) * 255
    ];
  }
  const Qt = "^\\s*", Jt = "\\s*$", zo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", Pt = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", No = "([0-9A-Fa-f])", Vo = "([0-9A-Fa-f]{2})", Hu = new RegExp(`${Qt}hsl\\s*\\(${Pt},${zo},${zo}\\)${Jt}`), Ou = new RegExp(`${Qt}hsv\\s*\\(${Pt},${zo},${zo}\\)${Jt}`), Bu = new RegExp(`${Qt}hsla\\s*\\(${Pt},${zo},${zo},${Pt}\\)${Jt}`), Fu = new RegExp(`${Qt}hsva\\s*\\(${Pt},${zo},${zo},${Pt}\\)${Jt}`), vv = new RegExp(`${Qt}rgb\\s*\\(${Pt},${Pt},${Pt}\\)${Jt}`), xv = new RegExp(`${Qt}rgba\\s*\\(${Pt},${Pt},${Pt},${Pt}\\)${Jt}`), Cv = new RegExp(`${Qt}#${No}${No}${No}${Jt}`), yv = new RegExp(`${Qt}#${Vo}${Vo}${Vo}${Jt}`), Sv = new RegExp(`${Qt}#${No}${No}${No}${No}${Jt}`), wv = new RegExp(`${Qt}#${Vo}${Vo}${Vo}${Vo}${Jt}`);
  function Ct(e) {
    return parseInt(e, 16);
  }
  function Pv(e) {
    try {
      let t;
      if (t = Bu.exec(e)) return [
        ri(t[1]),
        Ao(t[5]),
        Ao(t[9]),
        qo(t[13])
      ];
      if (t = Hu.exec(e)) return [
        ri(t[1]),
        Ao(t[5]),
        Ao(t[9]),
        1
      ];
      throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  function Tv(e) {
    try {
      let t;
      if (t = Fu.exec(e)) return [
        ri(t[1]),
        Ao(t[5]),
        Ao(t[9]),
        qo(t[13])
      ];
      if (t = Ou.exec(e)) return [
        ri(t[1]),
        Ao(t[5]),
        Ao(t[9]),
        1
      ];
      throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  po = function(e) {
    try {
      let t;
      if (t = yv.exec(e)) return [
        Ct(t[1]),
        Ct(t[2]),
        Ct(t[3]),
        1
      ];
      if (t = vv.exec(e)) return [
        lt(t[1]),
        lt(t[5]),
        lt(t[9]),
        1
      ];
      if (t = xv.exec(e)) return [
        lt(t[1]),
        lt(t[5]),
        lt(t[9]),
        qo(t[13])
      ];
      if (t = Cv.exec(e)) return [
        Ct(t[1] + t[1]),
        Ct(t[2] + t[2]),
        Ct(t[3] + t[3]),
        1
      ];
      if (t = wv.exec(e)) return [
        Ct(t[1]),
        Ct(t[2]),
        Ct(t[3]),
        qo(Ct(t[4]) / 255)
      ];
      if (t = Sv.exec(e)) return [
        Ct(t[1] + t[1]),
        Ct(t[2] + t[2]),
        Ct(t[3] + t[3]),
        qo(Ct(t[4] + t[4]) / 255)
      ];
      if (e in Wa) return po(Wa[e]);
      if (Hu.test(e) || Bu.test(e)) {
        const [o, r, n, i] = Pv(e);
        return [
          ...bv(o, r, n),
          i
        ];
      } else if (Ou.test(e) || Fu.test(e)) {
        const [o, r, n, i] = Tv(e);
        return [
          ...mv(o, r, n),
          i
        ];
      }
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  };
  function Ev(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function Ol(e, t, o, r) {
    return `rgba(${lt(e)}, ${lt(t)}, ${lt(o)}, ${Ev(r)})`;
  }
  function ll(e, t, o, r, n) {
    return lt((e * t * (1 - r) + o * r) / n);
  }
  oe = function(e, t) {
    Array.isArray(e) || (e = po(e)), Array.isArray(t) || (t = po(t));
    const o = e[3], r = t[3], n = qo(o + r - o * r);
    return Ol(ll(e[0], o, t[0], r, n), ll(e[1], o, t[1], r, n), ll(e[2], o, t[2], r, n), n);
  };
  G = function(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : po(e);
    return typeof t.alpha == "number" ? Ol(o, r, n, t.alpha) : Ol(o, r, n, i);
  };
  function Ve(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : po(e), { lightness: l = 1, alpha: s = 1 } = t;
    return _v([
      o * l,
      r * l,
      n * l,
      i * s
    ]);
  }
  function qo(e) {
    const t = Math.round(Number(e) * 100) / 100;
    return t > 1 ? 1 : t < 0 ? 0 : t;
  }
  function ri(e) {
    const t = Math.round(Number(e));
    return t >= 360 || t < 0 ? 0 : t;
  }
  function lt(e) {
    const t = Math.round(Number(e));
    return t > 255 ? 255 : t < 0 ? 0 : t;
  }
  function Ao(e) {
    const t = Math.round(Number(e));
    return t > 100 ? 100 : t < 0 ? 0 : t;
  }
  function _v(e) {
    const [t, o, r] = e;
    return 3 in e ? `rgba(${lt(t)}, ${lt(o)}, ${lt(r)}, ${qo(e[3])})` : `rgba(${lt(t)}, ${lt(o)}, ${lt(r)}, 1)`;
  }
  $i = function(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  };
  X2 = function(e, t) {
    const o = [];
    for (let r = 0; r < e; ++r) o.push(t);
    return o;
  };
  function Nn(e) {
    return e.composedPath()[0];
  }
  const Rv = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function $v(e, t, o) {
    if (e === "mousemoveoutside") {
      const r = (n) => {
        t.contains(Nn(n)) || o(n);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = false;
      const n = (l) => {
        r = !t.contains(Nn(l));
      }, i = (l) => {
        r && (t.contains(Nn(l)) || o(l));
      };
      return {
        mousedown: n,
        mouseup: i,
        touchstart: n,
        touchend: i
      };
    }
    return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`), {};
  }
  function Mu(e, t, o) {
    const r = Rv[e];
    let n = r.get(t);
    n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(o);
    return i === void 0 && n.set(o, i = $v(e, t, o)), i;
  }
  function Av(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Mu(e, t, o);
      return Object.keys(n).forEach((i) => {
        pt(i, document, n[i], r);
      }), true;
    }
    return false;
  }
  function Iv(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Mu(e, t, o);
      return Object.keys(n).forEach((i) => {
        Je(i, document, n[i], r);
      }), true;
    }
    return false;
  }
  function zv() {
    if (typeof window > "u") return {
      on: () => {
      },
      off: () => {
      }
    };
    const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    function o() {
      e.set(this, true);
    }
    function r() {
      e.set(this, true), t.set(this, true);
    }
    function n(w, b, S) {
      const I = w[b];
      return w[b] = function() {
        return S.apply(w, arguments), I.apply(w, arguments);
      }, w;
    }
    function i(w, b) {
      w[b] = Event.prototype[b];
    }
    const l = /* @__PURE__ */ new WeakMap(), s = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function a() {
      var w;
      return (w = l.get(this)) !== null && w !== void 0 ? w : null;
    }
    function d(w, b) {
      s !== void 0 && Object.defineProperty(w, "currentTarget", {
        configurable: true,
        enumerable: true,
        get: b ?? s.get
      });
    }
    const c = {
      bubble: {},
      capture: {}
    }, u = {};
    function f() {
      const w = function(b) {
        const { type: S, eventPhase: I, bubbles: D } = b, H = Nn(b);
        if (I === 2) return;
        const N = I === 1 ? "capture" : "bubble";
        let ae = H;
        const ue = [];
        for (; ae === null && (ae = window), ue.push(ae), ae !== window; ) ae = ae.parentNode || null;
        const le = c.capture[S], X = c.bubble[S];
        if (n(b, "stopPropagation", o), n(b, "stopImmediatePropagation", r), d(b, a), N === "capture") {
          if (le === void 0) return;
          for (let Y = ue.length - 1; Y >= 0 && !e.has(b); --Y) {
            const _e = ue[Y], Ae = le.get(_e);
            if (Ae !== void 0) {
              l.set(b, _e);
              for (const Ce of Ae) {
                if (t.has(b)) break;
                Ce(b);
              }
            }
            if (Y === 0 && !D && X !== void 0) {
              const Ce = X.get(_e);
              if (Ce !== void 0) for (const ze of Ce) {
                if (t.has(b)) break;
                ze(b);
              }
            }
          }
        } else if (N === "bubble") {
          if (X === void 0) return;
          for (let Y = 0; Y < ue.length && !e.has(b); ++Y) {
            const _e = ue[Y], Ae = X.get(_e);
            if (Ae !== void 0) {
              l.set(b, _e);
              for (const Ce of Ae) {
                if (t.has(b)) break;
                Ce(b);
              }
            }
          }
        }
        i(b, "stopPropagation"), i(b, "stopImmediatePropagation"), d(b);
      };
      return w.displayName = "evtdUnifiedHandler", w;
    }
    function p() {
      const w = function(b) {
        const { type: S, eventPhase: I } = b;
        if (I !== 2) return;
        const D = u[S];
        D !== void 0 && D.forEach((H) => H(b));
      };
      return w.displayName = "evtdUnifiedWindowEventHandler", w;
    }
    const h = f(), g = p();
    function C(w, b) {
      const S = c[w];
      return S[b] === void 0 && (S[b] = /* @__PURE__ */ new Map(), window.addEventListener(b, h, w === "capture")), S[b];
    }
    function x(w) {
      return u[w] === void 0 && (u[w] = /* @__PURE__ */ new Set(), window.addEventListener(w, g)), u[w];
    }
    function y(w, b) {
      let S = w.get(b);
      return S === void 0 && w.set(b, S = /* @__PURE__ */ new Set()), S;
    }
    function _(w, b, S, I) {
      const D = c[b][S];
      if (D !== void 0) {
        const H = D.get(w);
        if (H !== void 0 && H.has(I)) return true;
      }
      return false;
    }
    function A(w, b) {
      const S = u[w];
      return !!(S !== void 0 && S.has(b));
    }
    function E(w, b, S, I) {
      let D;
      if (typeof I == "object" && I.once === true ? D = (le) => {
        R(w, b, D, I), S(le);
      } : D = S, Av(w, b, D, I)) return;
      const N = I === true || typeof I == "object" && I.capture === true ? "capture" : "bubble", ae = C(N, w), ue = y(ae, b);
      if (ue.has(D) || ue.add(D), b === window) {
        const le = x(w);
        le.has(D) || le.add(D);
      }
    }
    function R(w, b, S, I) {
      if (Iv(w, b, S, I)) return;
      const H = I === true || typeof I == "object" && I.capture === true, N = H ? "capture" : "bubble", ae = C(N, w), ue = y(ae, b);
      if (b === window && !_(b, H ? "bubble" : "capture", w, S) && A(w, S)) {
        const X = u[w];
        X.delete(S), X.size === 0 && (window.removeEventListener(w, g), u[w] = void 0);
      }
      ue.has(S) && ue.delete(S), ue.size === 0 && ae.delete(b), ae.size === 0 && (window.removeEventListener(w, h, N === "capture"), c[N][w] = void 0);
    }
    return {
      on: E,
      off: R
    };
  }
  ({ on: pt, off: Je } = zv());
  function Hv(e) {
    const t = de(!!e.value);
    if (t.value) return Zt(t);
    const o = At(e, (r) => {
      r && (t.value = true, o());
    });
    return Zt(t);
  }
  Bl = function(e) {
    const t = Q(e), o = de(t.value);
    return At(t, (r) => {
      o.value = r;
    }), typeof e == "function" ? o : {
      __v_isRef: true,
      get value() {
        return o.value;
      },
      set value(r) {
        e.set(r);
      }
    };
  };
  Du = function() {
    return Tr() !== null;
  };
  let Wr;
  Lu = typeof window < "u";
  Wr = de(null);
  function Na(e) {
    if (e.clientX > 0 || e.clientY > 0) Wr.value = {
      x: e.clientX,
      y: e.clientY
    };
    else {
      const { target: t } = e;
      if (t instanceof Element) {
        const { left: o, top: r, width: n, height: i } = t.getBoundingClientRect();
        o > 0 || r > 0 ? Wr.value = {
          x: o + n / 2,
          y: r + i / 2
        } : Wr.value = {
          x: 0,
          y: 0
        };
      } else Wr.value = null;
    }
  }
  let Hn = 0, Va = true;
  function ku() {
    if (!Lu) return Zt(de(null));
    Hn === 0 && pt("click", document, Na, true);
    const e = () => {
      Hn += 1;
    };
    return Va && (Va = Du()) ? (tr(e), Dt(() => {
      Hn -= 1, Hn === 0 && Je("click", document, Na, true);
    })) : e(), Zt(Wr);
  }
  const Ov = de(void 0);
  let On = 0;
  function Ga() {
    Ov.value = Date.now();
  }
  let Ua = true;
  function ju(e) {
    if (!Lu) return Zt(de(false));
    const t = de(false);
    let o = null;
    function r() {
      o !== null && window.clearTimeout(o);
    }
    function n() {
      r(), t.value = true, o = window.setTimeout(() => {
        t.value = false;
      }, e);
    }
    On === 0 && pt("click", window, Ga, true);
    const i = () => {
      On += 1, pt("click", window, n, true);
    };
    return Ua && (Ua = Du()) ? (tr(i), Dt(() => {
      On -= 1, On === 0 && Je("click", window, Ga, true), Je("click", window, n, true), r();
    })) : i(), Zt(t);
  }
  Wu = function() {
    const e = de(false);
    return mo(() => {
      e.value = true;
    }), Zt(e);
  };
  const Bv = (typeof window > "u" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
  function Fv() {
    return Bv;
  }
  Y2 = function(e) {
    return e;
  };
  let Lv, Nu, yn, gs;
  Mv = "n-drawer-body";
  Dv = "n-modal-body";
  Lv = "n-modal-provider";
  Nu = "n-modal";
  kv = "n-popover-body";
  yn = typeof document < "u" && typeof window < "u";
  gs = de(false);
  function Ka() {
    gs.value = true;
  }
  function qa() {
    gs.value = false;
  }
  let Mr = 0;
  function jv() {
    return yn && (tr(() => {
      Mr || (window.addEventListener("compositionstart", Ka), window.addEventListener("compositionend", qa)), Mr++;
    }), Dt(() => {
      Mr <= 1 ? (window.removeEventListener("compositionstart", Ka), window.removeEventListener("compositionend", qa), Mr = 0) : Mr--;
    })), gs;
  }
  let ar = 0, Xa = "", Ya = "", Za = "", Qa = "";
  const Ja = de("0px");
  function Wv(e) {
    if (typeof document > "u") return;
    const t = document.documentElement;
    let o, r = false;
    const n = () => {
      t.style.marginRight = Xa, t.style.overflow = Ya, t.style.overflowX = Za, t.style.overflowY = Qa, Ja.value = "0px";
    };
    mo(() => {
      o = At(e, (i) => {
        if (i) {
          if (!ar) {
            const l = window.innerWidth - t.offsetWidth;
            l > 0 && (Xa = t.style.marginRight, t.style.marginRight = `${l}px`, Ja.value = `${l}px`), Ya = t.style.overflow, Za = t.style.overflowX, Qa = t.style.overflowY, t.style.overflow = "hidden", t.style.overflowX = "hidden", t.style.overflowY = "hidden";
          }
          r = true, ar++;
        } else ar--, ar || n(), r = false;
      }, {
        immediate: true
      });
    }), Dt(() => {
      o == null ? void 0 : o(), r && (ar--, ar || n(), r = false);
    });
  }
  function Nv(e) {
    const t = {
      isDeactivated: false
    };
    let o = false;
    return $d(() => {
      if (t.isDeactivated = false, !o) {
        o = true;
        return;
      }
      e();
    }), Ad(() => {
      t.isDeactivated = true, o || (o = true);
    }), t;
  }
  ec = function(e, t, o = "default") {
    const r = t[o];
    if (r === void 0) throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
    return r();
  };
  function Fl(e, t = true, o = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && o.push(an(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          Fl(r, t, o);
          return;
        }
        if (r.type === We) {
          if (r.children === null) return;
          Array.isArray(r.children) && Fl(r.children, t, o);
        } else r.type !== Ye && o.push(r);
      }
    }), o;
  }
  Z2 = function(e, t, o = "default") {
    const r = t[o];
    if (r === void 0) throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
    const n = Fl(r());
    if (n.length === 1) return n[0];
    throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`);
  };
  let cr;
  cr = "@@coContext";
  Vv = {
    mounted(e, { value: t, modifiers: o }) {
      e[cr] = {
        handler: void 0
      }, typeof t == "function" && (e[cr].handler = t, pt("clickoutside", e, t, {
        capture: o.capture
      }));
    },
    updated(e, { value: t, modifiers: o }) {
      const r = e[cr];
      typeof t == "function" ? r.handler ? r.handler !== t && (Je("clickoutside", e, r.handler, {
        capture: o.capture
      }), r.handler = t, pt("clickoutside", e, t, {
        capture: o.capture
      })) : (e[cr].handler = t, pt("clickoutside", e, t, {
        capture: o.capture
      })) : r.handler && (Je("clickoutside", e, r.handler, {
        capture: o.capture
      }), r.handler = void 0);
    },
    unmounted(e, { modifiers: t }) {
      const { handler: o } = e[cr];
      o && Je("clickoutside", e, o, {
        capture: t.capture
      }), e[cr].handler = void 0;
    }
  };
  function Gv(e, t) {
    console.error(`[vdirs/${e}]: ${t}`);
  }
  class Uv {
    constructor() {
      this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
    }
    get elementCount() {
      return this.elementZIndex.size;
    }
    ensureZIndex(t, o) {
      const { elementZIndex: r } = this;
      if (o !== void 0) {
        t.style.zIndex = `${o}`, r.delete(t);
        return;
      }
      const { nextZIndex: n } = this;
      r.has(t) && r.get(t) + 1 === this.nextZIndex || (t.style.zIndex = `${n}`, r.set(t, n), this.nextZIndex = n + 1, this.squashState());
    }
    unregister(t, o) {
      const { elementZIndex: r } = this;
      r.has(t) ? r.delete(t) : o === void 0 && Gv("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
    }
    squashState() {
      const { elementCount: t } = this;
      t || (this.nextZIndex = 2e3), this.nextZIndex - t > 2500 && this.rearrange();
    }
    rearrange() {
      const t = Array.from(this.elementZIndex.entries());
      t.sort((o, r) => o[1] - r[1]), this.nextZIndex = 2e3, t.forEach((o) => {
        const r = o[0], n = this.nextZIndex++;
        `${n}` !== r.style.zIndex && (r.style.zIndex = `${n}`);
      });
    }
  }
  let sl, dr, qv;
  sl = new Uv();
  dr = "@@ziContext";
  Kv = {
    mounted(e, t) {
      const { value: o = {} } = t, { zIndex: r, enabled: n } = o;
      e[dr] = {
        enabled: !!n,
        initialized: false
      }, n && (sl.ensureZIndex(e, r), e[dr].initialized = true);
    },
    updated(e, t) {
      const { value: o = {} } = t, { zIndex: r, enabled: n } = o, i = e[dr].enabled;
      n && !i && (sl.ensureZIndex(e, r), e[dr].initialized = true), e[dr].enabled = !!n;
    },
    unmounted(e, t) {
      if (!e[dr].initialized) return;
      const { value: o = {} } = t, { zIndex: r } = o;
      sl.unregister(e, r);
    }
  };
  qv = "@css-render/vue3-ssr";
  function Xv(e, t) {
    return `<style cssr-id="${e}">
${t}
</style>`;
  }
  function Yv(e, t, o) {
    const { styles: r, ids: n } = o;
    n.has(e) || r !== null && (n.add(e), r.push(Xv(e, t)));
  }
  const Zv = typeof document < "u";
  Ai = function() {
    if (Zv) return;
    const e = Ee(qv, null);
    if (e !== null) return {
      adapter: (t, o) => Yv(t, o, e),
      context: e
    };
  };
  function tc(e, t) {
    console.error(`[vueuc/${e}]: ${t}`);
  }
  function oc(e) {
    return typeof e == "string" ? document.querySelector(e) : e() || null;
  }
  Qv = we({
    name: "LazyTeleport",
    props: {
      to: {
        type: [
          String,
          Object
        ],
        default: void 0
      },
      disabled: Boolean,
      show: {
        type: Boolean,
        required: true
      }
    },
    setup(e) {
      return {
        showTeleport: Hv(Yt(e, "show")),
        mergedTo: Q(() => {
          const { to: t } = e;
          return t ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? ec("lazy-teleport", this.$slots) : T(ns, {
        disabled: this.disabled,
        to: this.mergedTo
      }, ec("lazy-teleport", this.$slots)) : null;
    }
  });
  var Xo = [], Jv = function() {
    return Xo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, e0 = function() {
    return Xo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, rc = "ResizeObserver loop completed with undelivered notifications.", t0 = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: rc
    }) : (e = document.createEvent("Event"), e.initEvent("error", false, false), e.message = rc), window.dispatchEvent(e);
  }, pn;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(pn || (pn = {}));
  var Yo = function(e) {
    return Object.freeze(e);
  }, o0 = /* @__PURE__ */ (function() {
    function e(t, o) {
      this.inlineSize = t, this.blockSize = o, Yo(this);
    }
    return e;
  })(), Vu = (function() {
    function e(t, o, r, n) {
      return this.x = t, this.y = o, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Yo(this);
    }
    return e.prototype.toJSON = function() {
      var t = this, o = t.x, r = t.y, n = t.top, i = t.right, l = t.bottom, s = t.left, a = t.width, d = t.height;
      return {
        x: o,
        y: r,
        top: n,
        right: i,
        bottom: l,
        left: s,
        width: a,
        height: d
      };
    }, e.fromRect = function(t) {
      return new e(t.x, t.y, t.width, t.height);
    }, e;
  })(), ms = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, Gu = function(e) {
    if (ms(e)) {
      var t = e.getBBox(), o = t.width, r = t.height;
      return !o && !r;
    }
    var n = e, i = n.offsetWidth, l = n.offsetHeight;
    return !(i || l || e.getClientRects().length);
  }, nc = function(e) {
    var t;
    if (e instanceof Element) return true;
    var o = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
    return !!(o && e instanceof o.Element);
  }, r0 = function(e) {
    switch (e.tagName) {
      case "INPUT":
        if (e.type !== "image") break;
      case "VIDEO":
      case "AUDIO":
      case "EMBED":
      case "OBJECT":
      case "CANVAS":
      case "IFRAME":
      case "IMG":
        return true;
    }
    return false;
  }, Jr = typeof window < "u" ? window : {}, Bn = /* @__PURE__ */ new WeakMap(), ic = /auto|scroll/, n0 = /^tb|vertical/, i0 = /msie|trident/i.test(Jr.navigator && Jr.navigator.userAgent), kt = function(e) {
    return parseFloat(e || "0");
  }, br = function(e, t, o) {
    return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = false), new o0((o ? t : e) || 0, (o ? e : t) || 0);
  }, lc = Yo({
    devicePixelContentBoxSize: br(),
    borderBoxSize: br(),
    contentBoxSize: br(),
    contentRect: new Vu(0, 0, 0, 0)
  }), Uu = function(e, t) {
    if (t === void 0 && (t = false), Bn.has(e) && !t) return Bn.get(e);
    if (Gu(e)) return Bn.set(e, lc), lc;
    var o = getComputedStyle(e), r = ms(e) && e.ownerSVGElement && e.getBBox(), n = !i0 && o.boxSizing === "border-box", i = n0.test(o.writingMode || ""), l = !r && ic.test(o.overflowY || ""), s = !r && ic.test(o.overflowX || ""), a = r ? 0 : kt(o.paddingTop), d = r ? 0 : kt(o.paddingRight), c = r ? 0 : kt(o.paddingBottom), u = r ? 0 : kt(o.paddingLeft), f = r ? 0 : kt(o.borderTopWidth), p = r ? 0 : kt(o.borderRightWidth), h = r ? 0 : kt(o.borderBottomWidth), g = r ? 0 : kt(o.borderLeftWidth), C = u + d, x = a + c, y = g + p, _ = f + h, A = s ? e.offsetHeight - _ - e.clientHeight : 0, E = l ? e.offsetWidth - y - e.clientWidth : 0, R = n ? C + y : 0, w = n ? x + _ : 0, b = r ? r.width : kt(o.width) - R - E, S = r ? r.height : kt(o.height) - w - A, I = b + C + E + y, D = S + x + A + _, H = Yo({
      devicePixelContentBoxSize: br(Math.round(b * devicePixelRatio), Math.round(S * devicePixelRatio), i),
      borderBoxSize: br(I, D, i),
      contentBoxSize: br(b, S, i),
      contentRect: new Vu(u, a, b, S)
    });
    return Bn.set(e, H), H;
  }, Ku = function(e, t, o) {
    var r = Uu(e, o), n = r.borderBoxSize, i = r.contentBoxSize, l = r.devicePixelContentBoxSize;
    switch (t) {
      case pn.DEVICE_PIXEL_CONTENT_BOX:
        return l;
      case pn.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, l0 = /* @__PURE__ */ (function() {
    function e(t) {
      var o = Uu(t);
      this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = Yo([
        o.borderBoxSize
      ]), this.contentBoxSize = Yo([
        o.contentBoxSize
      ]), this.devicePixelContentBoxSize = Yo([
        o.devicePixelContentBoxSize
      ]);
    }
    return e;
  })(), qu = function(e) {
    if (Gu(e)) return 1 / 0;
    for (var t = 0, o = e.parentNode; o; ) t += 1, o = o.parentNode;
    return t;
  }, s0 = function() {
    var e = 1 / 0, t = [];
    Xo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var s = [];
        l.activeTargets.forEach(function(d) {
          var c = new l0(d.target), u = qu(d.target);
          s.push(c), d.lastReportedSize = Ku(d.target, d.observedBox), u < e && (e = u);
        }), t.push(function() {
          l.callback.call(l.observer, s, l.observer);
        }), l.activeTargets.splice(0, l.activeTargets.length);
      }
    });
    for (var o = 0, r = t; o < r.length; o++) {
      var n = r[o];
      n();
    }
    return e;
  }, sc = function(e) {
    Xo.forEach(function(o) {
      o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
        n.isActive() && (qu(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
      });
    });
  }, a0 = function() {
    var e = 0;
    for (sc(e); Jv(); ) e = s0(), sc(e);
    return e0() && t0(), e > 0;
  }, al, Xu = [], c0 = function() {
    return Xu.splice(0).forEach(function(e) {
      return e();
    });
  }, d0 = function(e) {
    if (!al) {
      var t = 0, o = document.createTextNode(""), r = {
        characterData: true
      };
      new MutationObserver(function() {
        return c0();
      }).observe(o, r), al = function() {
        o.textContent = "".concat(t ? t-- : t++);
      };
    }
    Xu.push(e), al();
  }, u0 = function(e) {
    d0(function() {
      requestAnimationFrame(e);
    });
  }, Vn = 0, f0 = function() {
    return !!Vn;
  }, p0 = 250, h0 = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }, ac = [
    "resize",
    "load",
    "transitionend",
    "animationend",
    "animationstart",
    "animationiteration",
    "keyup",
    "keydown",
    "mouseup",
    "mousedown",
    "mouseover",
    "mouseout",
    "blur",
    "focus"
  ], cc = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, cl = false, g0 = (function() {
    function e() {
      var t = this;
      this.stopped = true, this.listener = function() {
        return t.schedule();
      };
    }
    return e.prototype.run = function(t) {
      var o = this;
      if (t === void 0 && (t = p0), !cl) {
        cl = true;
        var r = cc(t);
        u0(function() {
          var n = false;
          try {
            n = a0();
          } finally {
            if (cl = false, t = r - cc(), !f0()) return;
            n ? o.run(1e3) : t > 0 ? o.run(t) : o.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var t = this, o = function() {
        return t.observer && t.observer.observe(document.body, h0);
      };
      document.body ? o() : Jr.addEventListener("DOMContentLoaded", o);
    }, e.prototype.start = function() {
      var t = this;
      this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), ac.forEach(function(o) {
        return Jr.addEventListener(o, t.listener, true);
      }));
    }, e.prototype.stop = function() {
      var t = this;
      this.stopped || (this.observer && this.observer.disconnect(), ac.forEach(function(o) {
        return Jr.removeEventListener(o, t.listener, true);
      }), this.stopped = true);
    }, e;
  })(), Ml = new g0(), dc = function(e) {
    !Vn && e > 0 && Ml.start(), Vn += e, !Vn && Ml.stop();
  }, m0 = function(e) {
    return !ms(e) && !r0(e) && getComputedStyle(e).display === "inline";
  }, b0 = (function() {
    function e(t, o) {
      this.target = t, this.observedBox = o || pn.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var t = Ku(this.target, this.observedBox, true);
      return m0(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
    }, e;
  })(), v0 = /* @__PURE__ */ (function() {
    function e(t, o) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = o;
    }
    return e;
  })(), Fn = /* @__PURE__ */ new WeakMap(), uc = function(e, t) {
    for (var o = 0; o < e.length; o += 1) if (e[o].target === t) return o;
    return -1;
  }, Mn = (function() {
    function e() {
    }
    return e.connect = function(t, o) {
      var r = new v0(t, o);
      Fn.set(t, r);
    }, e.observe = function(t, o, r) {
      var n = Fn.get(t), i = n.observationTargets.length === 0;
      uc(n.observationTargets, o) < 0 && (i && Xo.push(n), n.observationTargets.push(new b0(o, r && r.box)), dc(1), Ml.schedule());
    }, e.unobserve = function(t, o) {
      var r = Fn.get(t), n = uc(r.observationTargets, o), i = r.observationTargets.length === 1;
      n >= 0 && (i && Xo.splice(Xo.indexOf(r), 1), r.observationTargets.splice(n, 1), dc(-1));
    }, e.disconnect = function(t) {
      var o = this, r = Fn.get(t);
      r.observationTargets.slice().forEach(function(n) {
        return o.unobserve(t, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  })(), x0 = (function() {
    function e(t) {
      if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof t != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      Mn.connect(this, t);
    }
    return e.prototype.observe = function(t, o) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!nc(t)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Mn.observe(this, t, o);
    }, e.prototype.unobserve = function(t) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!nc(t)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Mn.unobserve(this, t);
    }, e.prototype.disconnect = function() {
      Mn.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  })();
  class C0 {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || x0)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
    }
    handleResize(t) {
      for (const o of t) {
        const r = this.elHandlersMap.get(o.target);
        r !== void 0 && r(o);
      }
    }
    registerHandler(t, o) {
      this.elHandlersMap.set(t, o), this.observer.observe(t);
    }
    unregisterHandler(t) {
      this.elHandlersMap.has(t) && (this.elHandlersMap.delete(t), this.observer.unobserve(t));
    }
  }
  fc = new C0();
  pc = we({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let t = false;
      const o = Tr().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      mo(() => {
        const n = o.$el;
        if (n === void 0) {
          tc("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          tc("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (fc.registerHandler(n.nextElementSibling, r), t = true);
      }), Dt(() => {
        t && fc.unregisterHandler(o.$el.nextElementSibling);
      });
    },
    render() {
      return rg(this.$slots, "default");
    }
  });
  function Yu(e) {
    return e instanceof HTMLElement;
  }
  function Zu(e) {
    for (let t = 0; t < e.childNodes.length; t++) {
      const o = e.childNodes[t];
      if (Yu(o) && (Ju(o) || Zu(o))) return true;
    }
    return false;
  }
  function Qu(e) {
    for (let t = e.childNodes.length - 1; t >= 0; t--) {
      const o = e.childNodes[t];
      if (Yu(o) && (Ju(o) || Qu(o))) return true;
    }
    return false;
  }
  function Ju(e) {
    if (!y0(e)) return false;
    try {
      e.focus({
        preventScroll: true
      });
    } catch {
    }
    return document.activeElement === e;
  }
  function y0(e) {
    if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null) return true;
    if (e.getAttribute("disabled")) return false;
    switch (e.nodeName) {
      case "A":
        return !!e.href && e.rel !== "ignore";
      case "INPUT":
        return e.type !== "hidden" && e.type !== "file";
      case "SELECT":
      case "TEXTAREA":
        return true;
      default:
        return false;
    }
  }
  let Dr = [];
  S0 = we({
    name: "FocusTrap",
    props: {
      disabled: Boolean,
      active: Boolean,
      autoFocus: {
        type: Boolean,
        default: true
      },
      onEsc: Function,
      initialFocusTo: [
        String,
        Function
      ],
      finalFocusTo: [
        String,
        Function
      ],
      returnFocusOnDeactivated: {
        type: Boolean,
        default: true
      }
    },
    setup(e) {
      const t = $i(), o = de(null), r = de(null);
      let n = false, i = false;
      const l = typeof document > "u" ? null : document.activeElement;
      function s() {
        return Dr[Dr.length - 1] === t;
      }
      function a(C) {
        var x;
        C.code === "Escape" && s() && ((x = e.onEsc) === null || x === void 0 || x.call(e, C));
      }
      mo(() => {
        At(() => e.active, (C) => {
          C ? (u(), pt("keydown", document, a)) : (Je("keydown", document, a), n && f());
        }, {
          immediate: true
        });
      }), Dt(() => {
        Je("keydown", document, a), n && f();
      });
      function d(C) {
        if (!i && s()) {
          const x = c();
          if (x === null || x.contains(hs(C))) return;
          p("first");
        }
      }
      function c() {
        const C = o.value;
        if (C === null) return null;
        let x = C;
        for (; x = x.nextSibling, !(x === null || x instanceof Element && x.tagName === "DIV"); ) ;
        return x;
      }
      function u() {
        var C;
        if (!e.disabled) {
          if (Dr.push(t), e.autoFocus) {
            const { initialFocusTo: x } = e;
            x === void 0 ? p("first") : (C = oc(x)) === null || C === void 0 || C.focus({
              preventScroll: true
            });
          }
          n = true, document.addEventListener("focus", d, true);
        }
      }
      function f() {
        var C;
        if (e.disabled || (document.removeEventListener("focus", d, true), Dr = Dr.filter((y) => y !== t), s())) return;
        const { finalFocusTo: x } = e;
        x !== void 0 ? (C = oc(x)) === null || C === void 0 || C.focus({
          preventScroll: true
        }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = true, l.focus({
          preventScroll: true
        }), i = false);
      }
      function p(C) {
        if (s() && e.active) {
          const x = o.value, y = r.value;
          if (x !== null && y !== null) {
            const _ = c();
            if (_ == null || _ === y) {
              i = true, x.focus({
                preventScroll: true
              }), i = false;
              return;
            }
            i = true;
            const A = C === "first" ? Zu(_) : Qu(_);
            i = false, A || (i = true, x.focus({
              preventScroll: true
            }), i = false);
          }
        }
      }
      function h(C) {
        if (i) return;
        const x = c();
        x !== null && (C.relatedTarget !== null && x.contains(C.relatedTarget) ? p("last") : p("first"));
      }
      function g(C) {
        i || (C.relatedTarget !== null && C.relatedTarget === o.value ? p("last") : p("first"));
      }
      return {
        focusableStartRef: o,
        focusableEndRef: r,
        focusableStyle: "position: absolute; height: 0; width: 0;",
        handleStartFocus: h,
        handleEndFocus: g
      };
    },
    render() {
      const { default: e } = this.$slots;
      if (e === void 0) return null;
      if (this.disabled) return e();
      const { active: t, focusableStyle: o } = this;
      return T(We, null, [
        T("div", {
          "aria-hidden": "true",
          tabindex: t ? "0" : "-1",
          ref: "focusableStartRef",
          style: o,
          onFocus: this.handleStartFocus
        }),
        e(),
        T("div", {
          "aria-hidden": "true",
          style: o,
          ref: "focusableEndRef",
          tabindex: t ? "0" : "-1",
          onFocus: this.handleEndFocus
        })
      ]);
    }
  });
  hc = function(e) {
    return e.replace(/#|\(|\)|,|\s|\./g, "_");
  };
  function gc(e) {
    const { left: t, right: o, top: r, bottom: n } = $o(e);
    return `${r} ${t} ${n} ${o}`;
  }
  const ef = /* @__PURE__ */ new WeakSet();
  Q2 = function(e) {
    ef.add(e);
  };
  function w0(e) {
    return !ef.has(e);
  }
  hn = function(e, t) {
    console.error(`[naive/${e}]: ${t}`);
  };
  P0 = function(e, t) {
    throw new Error(`[naive/${e}]: ${t}`);
  };
  Go = function(e, ...t) {
    if (Array.isArray(e)) e.forEach((o) => Go(o, ...t));
    else return e(...t);
  };
  ni = function(e, t = true, o = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && o.push(an(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          ni(r, t, o);
          return;
        }
        if (r.type === We) {
          if (r.children === null) return;
          Array.isArray(r.children) && ni(r.children, t, o);
        } else {
          if (r.type === Ye && t) return;
          o.push(r);
        }
      }
    }), o;
  };
  J2 = function(e, t = "default", o = void 0) {
    const r = e[t];
    if (!r) return hn("getFirstSlotVNode", `slot[${t}] is empty`), null;
    const n = ni(r(o));
    return n.length === 1 ? n[0] : (hn("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
  };
  function T0(e, t, o) {
    if (!t) return null;
    const r = ni(t(o));
    return r.length === 1 ? r[0] : (hn("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
  }
  gn = function(e, t = [], o) {
    const r = {};
    return t.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, o);
  };
  Ii = function(e) {
    return Object.keys(e);
  };
  bs = function(e, t = [], o) {
    const r = {};
    return Object.getOwnPropertyNames(e).forEach((i) => {
      t.includes(i) || (r[i] = e[i]);
    }), Object.assign(r, o);
  };
  St = function(e, ...t) {
    return typeof e == "function" ? e(...t) : typeof e == "string" ? an(e) : typeof e == "number" ? an(String(e)) : null;
  };
  function zt(e) {
    return e.some((t) => Cr(t) ? !(t.type === Ye || t.type === We && !zt(t.children)) : true) ? e : null;
  }
  mc = function(e, t) {
    return e && zt(e()) || t();
  };
  eP = function(e, t, o) {
    return e && zt(e(t)) || o(t);
  };
  Ht = function(e, t) {
    const o = e && zt(e());
    return t(o || null);
  };
  E0 = function(e) {
    return !(e && zt(e()));
  };
  let ii;
  bc = we({
    render() {
      var e, t;
      return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
    }
  });
  ho = "n-config-provider";
  ii = "n";
  bo = function(e = {}, t = {
    defaultBordered: true
  }) {
    const o = Ee(ho, null);
    return {
      inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
      mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
      mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
      mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
      mergedBorderedRef: Q(() => {
        var r, n;
        const { bordered: i } = e;
        return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : true;
      }),
      mergedClsPrefixRef: o ? o.mergedClsPrefixRef : ts(ii),
      namespaceRef: Q(() => o == null ? void 0 : o.mergedNamespaceRef.value)
    };
  };
  tP = function() {
    const e = Ee(ho, null);
    return e ? e.mergedClsPrefixRef : ts(ii);
  };
  or = function(e, t, o, r) {
    o || P0("useThemeClass", "cssVarsRef is not passed");
    const n = Ee(ho, null), i = n == null ? void 0 : n.mergedThemeHashRef, l = n == null ? void 0 : n.styleMountTarget, s = de(""), a = Ai();
    let d;
    const c = `__${e}`, u = () => {
      let f = c;
      const p = t ? t.value : void 0, h = i == null ? void 0 : i.value;
      h && (f += `-${h}`), p && (f += `-${p}`);
      const { themeOverrides: g, builtinThemeOverrides: C } = r;
      g && (f += `-${un(JSON.stringify(g))}`), C && (f += `-${un(JSON.stringify(C))}`), s.value = f, d = () => {
        const x = o.value;
        let y = "";
        for (const _ in x) y += `${_}: ${x[_]};`;
        M(`.${f}`, y).mount({
          id: f,
          ssr: a,
          parent: l
        }), d = void 0;
      };
    };
    return xi(() => {
      u();
    }), {
      themeClass: s,
      onRender: () => {
        d == null ? void 0 : d();
      }
    };
  };
  vc = "n-form-item";
  _0 = function(e, { defaultSize: t = "medium", mergedSize: o, mergedDisabled: r } = {}) {
    const n = Ee(vc, null);
    tt(vc, null);
    const i = Q(o ? () => o(n) : () => {
      const { size: a } = e;
      if (a) return a;
      if (n) {
        const { mergedSize: d } = n;
        if (d.value !== void 0) return d.value;
      }
      return t;
    }), l = Q(r ? () => r(n) : () => {
      const { disabled: a } = e;
      return a !== void 0 ? a : n ? n.disabled.value : false;
    }), s = Q(() => {
      const { status: a } = e;
      return a || (n == null ? void 0 : n.mergedValidationStatus.value);
    });
    return Dt(() => {
      n && n.restoreValidation();
    }), {
      mergedSizeRef: i,
      mergedDisabledRef: l,
      mergedStatusRef: s,
      nTriggerFormBlur() {
        n && n.handleContentBlur();
      },
      nTriggerFormChange() {
        n && n.handleContentChange();
      },
      nTriggerFormFocus() {
        n && n.handleContentFocus();
      },
      nTriggerFormInput() {
        n && n.handleContentInput();
      }
    };
  };
  let tf, R0, of, $0, A0, Lr;
  tf = typeof global == "object" && global && global.Object === Object && global;
  R0 = typeof self == "object" && self && self.Object === Object && self;
  Er = tf || R0 || Function("return this")();
  Pr = Er.Symbol;
  of = Object.prototype;
  $0 = of.hasOwnProperty;
  A0 = of.toString;
  Lr = Pr ? Pr.toStringTag : void 0;
  function I0(e) {
    var t = $0.call(e, Lr), o = e[Lr];
    try {
      e[Lr] = void 0;
      var r = true;
    } catch {
    }
    var n = A0.call(e);
    return r && (t ? e[Lr] = o : delete e[Lr]), n;
  }
  var z0 = Object.prototype, H0 = z0.toString;
  function O0(e) {
    return H0.call(e);
  }
  var B0 = "[object Null]", F0 = "[object Undefined]", xc = Pr ? Pr.toStringTag : void 0;
  Sn = function(e) {
    return e == null ? e === void 0 ? F0 : B0 : xc && xc in Object(e) ? I0(e) : O0(e);
  };
  _r = function(e) {
    return e != null && typeof e == "object";
  };
  var M0 = "[object Symbol]";
  D0 = function(e) {
    return typeof e == "symbol" || _r(e) && Sn(e) == M0;
  };
  L0 = function(e, t) {
    for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; ) n[o] = t(e[o], o, e);
    return n;
  };
  let Cc, yc;
  li = Array.isArray;
  Cc = Pr ? Pr.prototype : void 0;
  yc = Cc ? Cc.toString : void 0;
  function rf(e) {
    if (typeof e == "string") return e;
    if (li(e)) return L0(e, rf) + "";
    if (D0(e)) return yc ? yc.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
  }
  rr = function(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  };
  nf = function(e) {
    return e;
  };
  var k0 = "[object AsyncFunction]", j0 = "[object Function]", W0 = "[object GeneratorFunction]", N0 = "[object Proxy]";
  function vs(e) {
    if (!rr(e)) return false;
    var t = Sn(e);
    return t == j0 || t == W0 || t == k0 || t == N0;
  }
  var dl = Er["__core-js_shared__"], Sc = (function() {
    var e = /[^.]+$/.exec(dl && dl.keys && dl.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  })();
  function V0(e) {
    return !!Sc && Sc in e;
  }
  var G0 = Function.prototype, U0 = G0.toString;
  K0 = function(e) {
    if (e != null) {
      try {
        return U0.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  };
  var q0 = /[\\^$.*+?()[\]{}|]/g, X0 = /^\[object .+?Constructor\]$/, Y0 = Function.prototype, Z0 = Object.prototype, Q0 = Y0.toString, J0 = Z0.hasOwnProperty, ex = RegExp("^" + Q0.call(J0).replace(q0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function tx(e) {
    if (!rr(e) || V0(e)) return false;
    var t = vs(e) ? ex : X0;
    return t.test(K0(e));
  }
  function ox(e, t) {
    return e == null ? void 0 : e[t];
  }
  xs = function(e, t) {
    var o = ox(e, t);
    return tx(o) ? o : void 0;
  };
  var wc = Object.create, rx = /* @__PURE__ */ (function() {
    function e() {
    }
    return function(t) {
      if (!rr(t)) return {};
      if (wc) return wc(t);
      e.prototype = t;
      var o = new e();
      return e.prototype = void 0, o;
    };
  })();
  function nx(e, t, o) {
    switch (o.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, o[0]);
      case 2:
        return e.call(t, o[0], o[1]);
      case 3:
        return e.call(t, o[0], o[1], o[2]);
    }
    return e.apply(t, o);
  }
  function ix(e, t) {
    var o = -1, r = e.length;
    for (t || (t = Array(r)); ++o < r; ) t[o] = e[o];
    return t;
  }
  var lx = 800, sx = 16, ax = Date.now;
  function cx(e) {
    var t = 0, o = 0;
    return function() {
      var r = ax(), n = sx - (r - o);
      if (o = r, n > 0) {
        if (++t >= lx) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function dx(e) {
    return function() {
      return e;
    };
  }
  var si = (function() {
    try {
      var e = xs(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  })(), ux = si ? function(e, t) {
    return si(e, "toString", {
      configurable: true,
      enumerable: false,
      value: dx(t),
      writable: true
    });
  } : nf, fx = cx(ux), px = 9007199254740991, hx = /^(?:0|[1-9]\d*)$/;
  lf = function(e, t) {
    var o = typeof e;
    return t = t ?? px, !!t && (o == "number" || o != "symbol" && hx.test(e)) && e > -1 && e % 1 == 0 && e < t;
  };
  function Cs(e, t, o) {
    t == "__proto__" && si ? si(e, t, {
      configurable: true,
      enumerable: true,
      value: o,
      writable: true
    }) : e[t] = o;
  }
  zi = function(e, t) {
    return e === t || e !== e && t !== t;
  };
  var gx = Object.prototype, mx = gx.hasOwnProperty;
  function bx(e, t, o) {
    var r = e[t];
    (!(mx.call(e, t) && zi(r, o)) || o === void 0 && !(t in e)) && Cs(e, t, o);
  }
  function vx(e, t, o, r) {
    var n = !o;
    o || (o = {});
    for (var i = -1, l = t.length; ++i < l; ) {
      var s = t[i], a = void 0;
      a === void 0 && (a = e[s]), n ? Cs(o, s, a) : bx(o, s, a);
    }
    return o;
  }
  var Pc = Math.max;
  function xx(e, t, o) {
    return t = Pc(t === void 0 ? e.length - 1 : t, 0), function() {
      for (var r = arguments, n = -1, i = Pc(r.length - t, 0), l = Array(i); ++n < i; ) l[n] = r[t + n];
      n = -1;
      for (var s = Array(t + 1); ++n < t; ) s[n] = r[n];
      return s[t] = o(l), nx(e, this, s);
    };
  }
  function Cx(e, t) {
    return fx(xx(e, t, nf), e + "");
  }
  var yx = 9007199254740991;
  sf = function(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= yx;
  };
  ys = function(e) {
    return e != null && sf(e.length) && !vs(e);
  };
  function Sx(e, t, o) {
    if (!rr(o)) return false;
    var r = typeof t;
    return (r == "number" ? ys(o) && lf(t, o.length) : r == "string" && t in o) ? zi(o[t], e) : false;
  }
  function wx(e) {
    return Cx(function(t, o) {
      var r = -1, n = o.length, i = n > 1 ? o[n - 1] : void 0, l = n > 2 ? o[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && Sx(o[0], o[1], l) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++r < n; ) {
        var s = o[r];
        s && e(t, s, r, i);
      }
      return t;
    });
  }
  var Px = Object.prototype;
  af = function(e) {
    var t = e && e.constructor, o = typeof t == "function" && t.prototype || Px;
    return e === o;
  };
  function Tx(e, t) {
    for (var o = -1, r = Array(e); ++o < e; ) r[o] = t(o);
    return r;
  }
  var Ex = "[object Arguments]";
  function Tc(e) {
    return _r(e) && Sn(e) == Ex;
  }
  let cf, _x, Rx;
  cf = Object.prototype;
  _x = cf.hasOwnProperty;
  Rx = cf.propertyIsEnumerable;
  Dl = Tc(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? Tc : function(e) {
    return _r(e) && _x.call(e, "callee") && !Rx.call(e, "callee");
  };
  function $x() {
    return false;
  }
  let df, Ec, Ax, _c, Ix, zx, Hx, Ox, Bx, Fx, Mx, Dx, Lx, kx, jx, Wx, Nx, Vx, Gx, Ux, Kx, qx, Xx, Yx, Zx, Qx, Jx, eC, tC, Fe;
  df = typeof exports == "object" && exports && !exports.nodeType && exports;
  Ec = df && typeof module == "object" && module && !module.nodeType && module;
  Ax = Ec && Ec.exports === df;
  _c = Ax ? Er.Buffer : void 0;
  Ix = _c ? _c.isBuffer : void 0;
  uf = Ix || $x;
  zx = "[object Arguments]";
  Hx = "[object Array]";
  Ox = "[object Boolean]";
  Bx = "[object Date]";
  Fx = "[object Error]";
  Mx = "[object Function]";
  Dx = "[object Map]";
  Lx = "[object Number]";
  kx = "[object Object]";
  jx = "[object RegExp]";
  Wx = "[object Set]";
  Nx = "[object String]";
  Vx = "[object WeakMap]";
  Gx = "[object ArrayBuffer]";
  Ux = "[object DataView]";
  Kx = "[object Float32Array]";
  qx = "[object Float64Array]";
  Xx = "[object Int8Array]";
  Yx = "[object Int16Array]";
  Zx = "[object Int32Array]";
  Qx = "[object Uint8Array]";
  Jx = "[object Uint8ClampedArray]";
  eC = "[object Uint16Array]";
  tC = "[object Uint32Array]";
  Fe = {};
  Fe[Kx] = Fe[qx] = Fe[Xx] = Fe[Yx] = Fe[Zx] = Fe[Qx] = Fe[Jx] = Fe[eC] = Fe[tC] = true;
  Fe[zx] = Fe[Hx] = Fe[Gx] = Fe[Ox] = Fe[Ux] = Fe[Bx] = Fe[Fx] = Fe[Mx] = Fe[Dx] = Fe[Lx] = Fe[kx] = Fe[jx] = Fe[Wx] = Fe[Nx] = Fe[Vx] = false;
  function oC(e) {
    return _r(e) && sf(e.length) && !!Fe[Sn(e)];
  }
  function rC(e) {
    return function(t) {
      return e(t);
    };
  }
  let ff, en, nC, ul, Rc, $c, iC, lC;
  ff = typeof exports == "object" && exports && !exports.nodeType && exports;
  en = ff && typeof module == "object" && module && !module.nodeType && module;
  nC = en && en.exports === ff;
  ul = nC && tf.process;
  Rc = (function() {
    try {
      var e = en && en.require && en.require("util").types;
      return e || ul && ul.binding && ul.binding("util");
    } catch {
    }
  })();
  $c = Rc && Rc.isTypedArray;
  pf = $c ? rC($c) : oC;
  iC = Object.prototype;
  lC = iC.hasOwnProperty;
  sC = function(e, t) {
    var o = li(e), r = !o && Dl(e), n = !o && !r && uf(e), i = !o && !r && !n && pf(e), l = o || r || n || i, s = l ? Tx(e.length, String) : [], a = s.length;
    for (var d in e) (t || lC.call(e, d)) && !(l && (d == "length" || n && (d == "offset" || d == "parent") || i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || lf(d, a))) && s.push(d);
    return s;
  };
  aC = function(e, t) {
    return function(o) {
      return e(t(o));
    };
  };
  function cC(e) {
    var t = [];
    if (e != null) for (var o in Object(e)) t.push(o);
    return t;
  }
  var dC = Object.prototype, uC = dC.hasOwnProperty;
  function fC(e) {
    if (!rr(e)) return cC(e);
    var t = af(e), o = [];
    for (var r in e) r == "constructor" && (t || !uC.call(e, r)) || o.push(r);
    return o;
  }
  function hf(e) {
    return ys(e) ? sC(e, true) : fC(e);
  }
  var mn = xs(Object, "create");
  function pC() {
    this.__data__ = mn ? mn(null) : {}, this.size = 0;
  }
  function hC(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  var gC = "__lodash_hash_undefined__", mC = Object.prototype, bC = mC.hasOwnProperty;
  function vC(e) {
    var t = this.__data__;
    if (mn) {
      var o = t[e];
      return o === gC ? void 0 : o;
    }
    return bC.call(t, e) ? t[e] : void 0;
  }
  var xC = Object.prototype, CC = xC.hasOwnProperty;
  function yC(e) {
    var t = this.__data__;
    return mn ? t[e] !== void 0 : CC.call(t, e);
  }
  var SC = "__lodash_hash_undefined__";
  function wC(e, t) {
    var o = this.__data__;
    return this.size += this.has(e) ? 0 : 1, o[e] = mn && t === void 0 ? SC : t, this;
  }
  function er(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  er.prototype.clear = pC;
  er.prototype.delete = hC;
  er.prototype.get = vC;
  er.prototype.has = yC;
  er.prototype.set = wC;
  function PC() {
    this.__data__ = [], this.size = 0;
  }
  function Hi(e, t) {
    for (var o = e.length; o--; ) if (zi(e[o][0], t)) return o;
    return -1;
  }
  var TC = Array.prototype, EC = TC.splice;
  function _C(e) {
    var t = this.__data__, o = Hi(t, e);
    if (o < 0) return false;
    var r = t.length - 1;
    return o == r ? t.pop() : EC.call(t, o, 1), --this.size, true;
  }
  function RC(e) {
    var t = this.__data__, o = Hi(t, e);
    return o < 0 ? void 0 : t[o][1];
  }
  function $C(e) {
    return Hi(this.__data__, e) > -1;
  }
  function AC(e, t) {
    var o = this.__data__, r = Hi(o, e);
    return r < 0 ? (++this.size, o.push([
      e,
      t
    ])) : o[r][1] = t, this;
  }
  function vo(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  vo.prototype.clear = PC;
  vo.prototype.delete = _C;
  vo.prototype.get = RC;
  vo.prototype.has = $C;
  vo.prototype.set = AC;
  gf = xs(Er, "Map");
  function IC() {
    this.size = 0, this.__data__ = {
      hash: new er(),
      map: new (gf || vo)(),
      string: new er()
    };
  }
  function zC(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  function Oi(e, t) {
    var o = e.__data__;
    return zC(t) ? o[typeof t == "string" ? "string" : "hash"] : o.map;
  }
  function HC(e) {
    var t = Oi(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  }
  function OC(e) {
    return Oi(this, e).get(e);
  }
  function BC(e) {
    return Oi(this, e).has(e);
  }
  function FC(e, t) {
    var o = Oi(this, e), r = o.size;
    return o.set(e, t), this.size += o.size == r ? 0 : 1, this;
  }
  Rr = function(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  };
  Rr.prototype.clear = IC;
  Rr.prototype.delete = HC;
  Rr.prototype.get = OC;
  Rr.prototype.has = BC;
  Rr.prototype.set = FC;
  MC = function(e) {
    return e == null ? "" : rf(e);
  };
  var mf = aC(Object.getPrototypeOf, Object), DC = "[object Object]", LC = Function.prototype, kC = Object.prototype, bf = LC.toString, jC = kC.hasOwnProperty, WC = bf.call(Object);
  function NC(e) {
    if (!_r(e) || Sn(e) != DC) return false;
    var t = mf(e);
    if (t === null) return true;
    var o = jC.call(t, "constructor") && t.constructor;
    return typeof o == "function" && o instanceof o && bf.call(o) == WC;
  }
  function VC(e, t, o) {
    var r = -1, n = e.length;
    t < 0 && (t = -t > n ? 0 : n + t), o = o > n ? n : o, o < 0 && (o += n), n = t > o ? 0 : o - t >>> 0, t >>>= 0;
    for (var i = Array(n); ++r < n; ) i[r] = e[r + t];
    return i;
  }
  function GC(e, t, o) {
    var r = e.length;
    return o = o === void 0 ? r : o, !t && o >= r ? e : VC(e, t, o);
  }
  var UC = "\\ud800-\\udfff", KC = "\\u0300-\\u036f", qC = "\\ufe20-\\ufe2f", XC = "\\u20d0-\\u20ff", YC = KC + qC + XC, ZC = "\\ufe0e\\ufe0f", QC = "\\u200d", JC = RegExp("[" + QC + UC + YC + ZC + "]");
  function vf(e) {
    return JC.test(e);
  }
  function ey(e) {
    return e.split("");
  }
  var xf = "\\ud800-\\udfff", ty = "\\u0300-\\u036f", oy = "\\ufe20-\\ufe2f", ry = "\\u20d0-\\u20ff", ny = ty + oy + ry, iy = "\\ufe0e\\ufe0f", ly = "[" + xf + "]", Ll = "[" + ny + "]", kl = "\\ud83c[\\udffb-\\udfff]", sy = "(?:" + Ll + "|" + kl + ")", Cf = "[^" + xf + "]", yf = "(?:\\ud83c[\\udde6-\\uddff]){2}", Sf = "[\\ud800-\\udbff][\\udc00-\\udfff]", ay = "\\u200d", wf = sy + "?", Pf = "[" + iy + "]?", cy = "(?:" + ay + "(?:" + [
    Cf,
    yf,
    Sf
  ].join("|") + ")" + Pf + wf + ")*", dy = Pf + wf + cy, uy = "(?:" + [
    Cf + Ll + "?",
    Ll,
    yf,
    Sf,
    ly
  ].join("|") + ")", fy = RegExp(kl + "(?=" + kl + ")|" + uy + dy, "g");
  function py(e) {
    return e.match(fy) || [];
  }
  function hy(e) {
    return vf(e) ? py(e) : ey(e);
  }
  function gy(e) {
    return function(t) {
      t = MC(t);
      var o = vf(t) ? hy(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? GC(o, 1).join("") : t.slice(1);
      return r[e]() + n;
    };
  }
  var my = gy("toUpperCase");
  function by() {
    this.__data__ = new vo(), this.size = 0;
  }
  function vy(e) {
    var t = this.__data__, o = t.delete(e);
    return this.size = t.size, o;
  }
  function xy(e) {
    return this.__data__.get(e);
  }
  function Cy(e) {
    return this.__data__.has(e);
  }
  var yy = 200;
  function Sy(e, t) {
    var o = this.__data__;
    if (o instanceof vo) {
      var r = o.__data__;
      if (!gf || r.length < yy - 1) return r.push([
        e,
        t
      ]), this.size = ++o.size, this;
      o = this.__data__ = new Rr(r);
    }
    return o.set(e, t), this.size = o.size, this;
  }
  $r = function(e) {
    var t = this.__data__ = new vo(e);
    this.size = t.size;
  };
  $r.prototype.clear = by;
  $r.prototype.delete = vy;
  $r.prototype.get = xy;
  $r.prototype.has = Cy;
  $r.prototype.set = Sy;
  var Tf = typeof exports == "object" && exports && !exports.nodeType && exports, Ac = Tf && typeof module == "object" && module && !module.nodeType && module, wy = Ac && Ac.exports === Tf, Ic = wy ? Er.Buffer : void 0;
  Ic && Ic.allocUnsafe;
  function Py(e, t) {
    return e.slice();
  }
  zc = Er.Uint8Array;
  function Ty(e) {
    var t = new e.constructor(e.byteLength);
    return new zc(t).set(new zc(e)), t;
  }
  function Ey(e, t) {
    var o = Ty(e.buffer);
    return new e.constructor(o, e.byteOffset, e.length);
  }
  function _y(e) {
    return typeof e.constructor == "function" && !af(e) ? rx(mf(e)) : {};
  }
  function Ry(e) {
    return function(t, o, r) {
      for (var n = -1, i = Object(t), l = r(t), s = l.length; s--; ) {
        var a = l[++n];
        if (o(i[a], a, i) === false) break;
      }
      return t;
    };
  }
  $y = Ry();
  function jl(e, t, o) {
    (o !== void 0 && !zi(e[t], o) || o === void 0 && !(t in e)) && Cs(e, t, o);
  }
  function Ay(e) {
    return _r(e) && ys(e);
  }
  function Wl(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__") return e[t];
  }
  function Iy(e) {
    return vx(e, hf(e));
  }
  function zy(e, t, o, r, n, i, l) {
    var s = Wl(e, o), a = Wl(t, o), d = l.get(a);
    if (d) {
      jl(e, o, d);
      return;
    }
    var c = i ? i(s, a, o + "", e, t, l) : void 0, u = c === void 0;
    if (u) {
      var f = li(a), p = !f && uf(a), h = !f && !p && pf(a);
      c = a, f || p || h ? li(s) ? c = s : Ay(s) ? c = ix(s) : p ? (u = false, c = Py(a)) : h ? (u = false, c = Ey(a)) : c = [] : NC(a) || Dl(a) ? (c = s, Dl(s) ? c = Iy(s) : (!rr(s) || vs(s)) && (c = _y(a))) : u = false;
    }
    u && (l.set(a, c), n(c, a, r, i, l), l.delete(a)), jl(e, o, c);
  }
  function Ef(e, t, o, r, n) {
    e !== t && $y(t, function(i, l) {
      if (n || (n = new $r()), rr(i)) zy(e, t, l, o, Ef, r, n);
      else {
        var s = r ? r(Wl(e, l), i, l + "", e, t, n) : void 0;
        s === void 0 && (s = i), jl(e, l, s);
      }
    }, hf);
  }
  var Nr = wx(function(e, t, o) {
    Ef(e, t, o);
  });
  bn = "naive-ui-style";
  Ar = function(e, t, o) {
    if (!t) return;
    const r = Ai(), n = Q(() => {
      const { value: s } = t;
      if (!s) return;
      const a = s[e];
      if (a) return a;
    }), i = Ee(ho, null), l = () => {
      xi(() => {
        const { value: s } = o, a = `${s}${e}Rtl`;
        if (dv(a, r)) return;
        const { value: d } = n;
        d && d.style.mount({
          id: a,
          head: true,
          anchorMetaName: bn,
          props: {
            bPrefix: s ? `.${s}-` : void 0
          },
          ssr: r,
          parent: i == null ? void 0 : i.styleMountTarget
        });
      });
    };
    return r ? l() : tr(l), n;
  };
  let Hy, Oy, By, _f;
  Bo = {
    fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
    fontWeight: "400",
    fontWeightStrong: "500",
    cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
    cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
    cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
    borderRadius: "3px",
    borderRadiusSmall: "2px",
    fontSize: "14px",
    fontSizeMini: "12px",
    fontSizeTiny: "12px",
    fontSizeSmall: "14px",
    fontSizeMedium: "14px",
    fontSizeLarge: "15px",
    fontSizeHuge: "16px",
    lineHeight: "1.6",
    heightMini: "16px",
    heightTiny: "22px",
    heightSmall: "28px",
    heightMedium: "34px",
    heightLarge: "40px",
    heightHuge: "46px"
  };
  ({ fontSize: Hy, fontFamily: Oy, lineHeight: By } = Bo);
  _f = M("body", `
 margin: 0;
 font-size: ${Hy};
 font-family: ${Oy};
 line-height: ${By};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [
    M("input", `
 font-family: inherit;
 font-size: inherit;
 `)
  ]);
  Bi = function(e, t, o) {
    if (!t) return;
    const r = Ai(), n = Ee(ho, null), i = () => {
      const l = o.value;
      t.mount({
        id: l === void 0 ? e : l + e,
        head: true,
        anchorMetaName: bn,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: r,
        parent: n == null ? void 0 : n.styleMountTarget
      }), (n == null ? void 0 : n.preflightStyleDisabled) || _f.mount({
        id: "n-global",
        head: true,
        anchorMetaName: bn,
        ssr: r,
        parent: n == null ? void 0 : n.styleMountTarget
      });
    };
    r ? i() : tr(i);
  };
  oP = function(e) {
    return e;
  };
  gt = function(e, t, o, r, n, i) {
    const l = Ai(), s = Ee(ho, null);
    if (o) {
      const d = () => {
        const c = i == null ? void 0 : i.value;
        o.mount({
          id: c === void 0 ? t : c + t,
          head: true,
          props: {
            bPrefix: c ? `.${c}-` : void 0
          },
          anchorMetaName: bn,
          ssr: l,
          parent: s == null ? void 0 : s.styleMountTarget
        }), (s == null ? void 0 : s.preflightStyleDisabled) || _f.mount({
          id: "n-global",
          head: true,
          anchorMetaName: bn,
          ssr: l,
          parent: s == null ? void 0 : s.styleMountTarget
        });
      };
      l ? d() : tr(d);
    }
    return Q(() => {
      var d;
      const { theme: { common: c, self: u, peers: f = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: h = {} } = n, { common: g, peers: C } = p, { common: x = void 0, [e]: { common: y = void 0, self: _ = void 0, peers: A = {} } = {} } = (s == null ? void 0 : s.mergedThemeRef.value) || {}, { common: E = void 0, [e]: R = {} } = (s == null ? void 0 : s.mergedThemeOverridesRef.value) || {}, { common: w, peers: b = {} } = R, S = Nr({}, c || y || x || r.common, E, w, g), I = Nr((d = u || _ || r.self) === null || d === void 0 ? void 0 : d(S), h, R, p);
      return {
        common: S,
        self: I,
        peers: Nr({}, r.peers, A, f),
        peerOverrides: Nr({}, h.peers, b, C)
      };
    });
  };
  gt.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  let Fy;
  Fy = te("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [
    M("svg", `
 height: 1em;
 width: 1em;
 `)
  ]);
  Fi = we({
    name: "BaseIcon",
    props: {
      role: String,
      ariaLabel: String,
      ariaDisabled: {
        type: Boolean,
        default: void 0
      },
      ariaHidden: {
        type: Boolean,
        default: void 0
      },
      clsPrefix: {
        type: String,
        required: true
      },
      onClick: Function,
      onMousedown: Function,
      onMouseup: Function
    },
    setup(e) {
      Bi("-base-icon", Fy, Yt(e, "clsPrefix"));
    },
    render() {
      return T("i", {
        class: `${this.clsPrefix}-base-icon`,
        onClick: this.onClick,
        onMousedown: this.onMousedown,
        onMouseup: this.onMouseup,
        role: this.role,
        "aria-label": this.ariaLabel,
        "aria-hidden": this.ariaHidden,
        "aria-disabled": this.ariaDisabled
      }, this.$slots);
    }
  });
  Ss = we({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: t }) {
      const o = Wu();
      return () => T(Jo, {
        name: "icon-switch-transition",
        appear: o.value
      }, t);
    }
  });
  wn = function(e, t) {
    const o = we({
      render() {
        return t();
      }
    });
    return we({
      name: my(e),
      setup() {
        var r;
        const n = (r = Ee(ho, null)) === null || r === void 0 ? void 0 : r.mergedIconsRef;
        return () => {
          var i;
          const l = (i = n == null ? void 0 : n.value) === null || i === void 0 ? void 0 : i[e];
          return l ? l() : T(o, null);
        };
      }
    });
  };
  let My, Dy;
  My = wn("close", () => T("svg", {
    viewBox: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  }, T("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, T("g", {
    fill: "currentColor",
    "fill-rule": "nonzero"
  }, T("path", {
    d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
  })))));
  ws = wn("error", () => T("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, T("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, T("g", {
    "fill-rule": "nonzero"
  }, T("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
  })))));
  ai = wn("info", () => T("svg", {
    viewBox: "0 0 28 28",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, T("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, T("g", {
    "fill-rule": "nonzero"
  }, T("path", {
    d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
  })))));
  Ps = wn("success", () => T("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, T("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, T("g", {
    "fill-rule": "nonzero"
  }, T("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
  })))));
  Ts = wn("warning", () => T("svg", {
    viewBox: "0 0 24 24",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, T("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, T("g", {
    "fill-rule": "nonzero"
  }, T("path", {
    d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
  })))));
  ({ cubicBezierEaseInOut: Dy } = Bo);
  ci = function({ originalTransform: e = "", left: t = 0, top: o = 0, transition: r = `all .3s ${Dy} !important` } = {}) {
    return [
      M("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
        transform: `${e} scale(0.75)`,
        left: t,
        top: o,
        opacity: 0
      }),
      M("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
        transform: `scale(1) ${e}`,
        left: t,
        top: o,
        opacity: 1
      }),
      M("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
        transformOrigin: "center",
        position: "absolute",
        left: t,
        top: o,
        transition: r
      })
    ];
  };
  let Ly, ky, fl, Hc;
  Ly = te("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [
    ne("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),
    M("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),
    Hl("disabled", [
      M("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
      M("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `),
      M("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `),
      M("&:active", `
 color: var(--n-close-icon-color-pressed);
 `),
      M("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)
    ]),
    ne("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),
    ne("round", [
      M("&::before", `
 border-radius: 50%;
 `)
    ])
  ]);
  Mi = we({
    name: "BaseClose",
    props: {
      isButtonTag: {
        type: Boolean,
        default: true
      },
      clsPrefix: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      focusable: {
        type: Boolean,
        default: true
      },
      round: Boolean,
      onClick: Function,
      absolute: Boolean
    },
    setup(e) {
      return Bi("-base-close", Ly, Yt(e, "clsPrefix")), () => {
        const { clsPrefix: t, disabled: o, absolute: r, round: n, isButtonTag: i } = e;
        return T(i ? "button" : "div", {
          type: i ? "button" : void 0,
          tabindex: o || !e.focusable ? -1 : 0,
          "aria-disabled": o,
          "aria-label": "close",
          role: i ? void 0 : "button",
          disabled: o,
          class: [
            `${t}-base-close`,
            r && `${t}-base-close--absolute`,
            o && `${t}-base-close--disabled`,
            n && `${t}-base-close--round`
          ],
          onMousedown: (s) => {
            e.focusable || s.preventDefault();
          },
          onClick: e.onClick
        }, T(Fi, {
          clsPrefix: t
        }, {
          default: () => T(My, null)
        }));
      };
    }
  });
  Rf = we({
    name: "FadeInExpandTransition",
    props: {
      appear: Boolean,
      group: Boolean,
      mode: String,
      onLeave: Function,
      onAfterLeave: Function,
      onAfterEnter: Function,
      width: Boolean,
      reverse: Boolean
    },
    setup(e, { slots: t }) {
      function o(s) {
        e.width ? s.style.maxWidth = `${s.offsetWidth}px` : s.style.maxHeight = `${s.offsetHeight}px`, s.offsetWidth;
      }
      function r(s) {
        e.width ? s.style.maxWidth = "0" : s.style.maxHeight = "0", s.offsetWidth;
        const { onLeave: a } = e;
        a && a();
      }
      function n(s) {
        e.width ? s.style.maxWidth = "" : s.style.maxHeight = "";
        const { onAfterLeave: a } = e;
        a && a();
      }
      function i(s) {
        if (s.style.transition = "none", e.width) {
          const a = s.offsetWidth;
          s.style.maxWidth = "0", s.offsetWidth, s.style.transition = "", s.style.maxWidth = `${a}px`;
        } else if (e.reverse) s.style.maxHeight = `${s.offsetHeight}px`, s.offsetHeight, s.style.transition = "", s.style.maxHeight = "0";
        else {
          const a = s.offsetHeight;
          s.style.maxHeight = "0", s.offsetWidth, s.style.transition = "", s.style.maxHeight = `${a}px`;
        }
        s.offsetWidth;
      }
      function l(s) {
        var a;
        e.width ? s.style.maxWidth = "" : e.reverse || (s.style.maxHeight = ""), (a = e.onAfterEnter) === null || a === void 0 || a.call(e);
      }
      return () => {
        const { group: s, width: a, appear: d, mode: c } = e, u = s ? pm : Jo, f = {
          name: a ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
          appear: d,
          onEnter: i,
          onAfterEnter: l,
          onBeforeLeave: o,
          onLeave: r,
          onAfterLeave: n
        };
        return s || (f.mode = c), T(u, f, t);
      };
    }
  });
  ky = M([
    M("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),
    te("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [
      re("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [
        ci()
      ]),
      re("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [
        ci({
          left: "50%",
          top: "50%",
          originalTransform: "translateX(-50%) translateY(-50%)"
        })
      ]),
      re("container", `
 animation: rotator 3s linear infinite both;
 `, [
        re("icon", `
 height: 1em;
 width: 1em;
 `)
      ])
    ])
  ]);
  fl = "1.6s";
  jy = {
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: void 0
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    }
  };
  $f = we({
    name: "BaseLoading",
    props: Object.assign({
      clsPrefix: {
        type: String,
        required: true
      },
      show: {
        type: Boolean,
        default: true
      }
    }, jy),
    setup(e) {
      Bi("-base-loading", ky, Yt(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
      return T("div", {
        class: `${e}-base-loading`,
        role: "img",
        "aria-label": "loading"
      }, T(Ss, null, {
        default: () => this.show ? T("div", {
          key: "icon",
          class: `${e}-base-loading__transition-wrapper`
        }, T("div", {
          class: `${e}-base-loading__container`
        }, T("svg", {
          class: `${e}-base-loading__icon`,
          viewBox: `0 0 ${2 * i} ${2 * i}`,
          xmlns: "http://www.w3.org/2000/svg",
          style: {
            color: r
          }
        }, T("g", null, T("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};270 ${i} ${i}`,
          begin: "0s",
          dur: fl,
          fill: "freeze",
          repeatCount: "indefinite"
        }), T("circle", {
          class: `${e}-base-loading__icon`,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": o,
          "stroke-linecap": "round",
          cx: i,
          cy: i,
          r: t - o / 2,
          "stroke-dasharray": 5.67 * t,
          "stroke-dashoffset": 18.48 * t
        }, T("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
          begin: "0s",
          dur: fl,
          fill: "freeze",
          repeatCount: "indefinite"
        }), T("animate", {
          attributeName: "stroke-dashoffset",
          values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
          begin: "0s",
          dur: fl,
          fill: "freeze",
          repeatCount: "indefinite"
        })))))) : T("div", {
          key: "placeholder",
          class: `${e}-base-loading__placeholder`
        }, this.$slots)
      }));
    }
  });
  ({ cubicBezierEaseInOut: Hc } = Bo);
  Af = function({ name: e = "fade-in", enterDuration: t = "0.2s", leaveDuration: o = "0.2s", enterCubicBezier: r = Hc, leaveCubicBezier: n = Hc } = {}) {
    return [
      M(`&.${e}-transition-enter-active`, {
        transition: `all ${t} ${r}!important`
      }),
      M(`&.${e}-transition-leave-active`, {
        transition: `all ${o} ${n}!important`
      }),
      M(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
        opacity: 0
      }),
      M(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
        opacity: 1
      })
    ];
  };
  const ee = {
    neutralBase: "#000",
    neutralInvertBase: "#fff",
    neutralTextBase: "#fff",
    neutralPopover: "rgb(72, 72, 78)",
    neutralCard: "rgb(24, 24, 28)",
    neutralModal: "rgb(44, 44, 50)",
    neutralBody: "rgb(16, 16, 20)",
    alpha1: "0.9",
    alpha2: "0.82",
    alpha3: "0.52",
    alpha4: "0.38",
    alpha5: "0.28",
    alphaClose: "0.52",
    alphaDisabled: "0.38",
    alphaDisabledInput: "0.06",
    alphaPending: "0.09",
    alphaTablePending: "0.06",
    alphaTableStriped: "0.05",
    alphaPressed: "0.05",
    alphaAvatar: "0.18",
    alphaRail: "0.2",
    alphaProgressRail: "0.12",
    alphaBorder: "0.24",
    alphaDivider: "0.09",
    alphaInput: "0.1",
    alphaAction: "0.06",
    alphaTab: "0.04",
    alphaScrollbar: "0.2",
    alphaScrollbarHover: "0.3",
    alphaCode: "0.12",
    alphaTag: "0.2",
    primaryHover: "#7fe7c4",
    primaryDefault: "#63e2b7",
    primaryActive: "#5acea7",
    primarySuppl: "rgb(42, 148, 125)",
    infoHover: "#8acbec",
    infoDefault: "#70c0e8",
    infoActive: "#66afd3",
    infoSuppl: "rgb(56, 137, 197)",
    errorHover: "#e98b8b",
    errorDefault: "#e88080",
    errorActive: "#e57272",
    errorSuppl: "rgb(208, 58, 82)",
    warningHover: "#f5d599",
    warningDefault: "#f2c97d",
    warningActive: "#e6c260",
    warningSuppl: "rgb(240, 138, 0)",
    successHover: "#7fe7c4",
    successDefault: "#63e2b7",
    successActive: "#5acea7",
    successSuppl: "rgb(42, 148, 125)"
  }, Wy = po(ee.neutralBase), If = po(ee.neutralInvertBase), Ny = `rgba(${If.slice(0, 3).join(", ")}, `;
  function ye(e) {
    return `${Ny + String(e)})`;
  }
  function Vy(e) {
    const t = Array.from(If);
    return t[3] = Number(e), oe(Wy, t);
  }
  const k = Object.assign(Object.assign({
    name: "common"
  }, Bo), {
    baseColor: ee.neutralBase,
    primaryColor: ee.primaryDefault,
    primaryColorHover: ee.primaryHover,
    primaryColorPressed: ee.primaryActive,
    primaryColorSuppl: ee.primarySuppl,
    infoColor: ee.infoDefault,
    infoColorHover: ee.infoHover,
    infoColorPressed: ee.infoActive,
    infoColorSuppl: ee.infoSuppl,
    successColor: ee.successDefault,
    successColorHover: ee.successHover,
    successColorPressed: ee.successActive,
    successColorSuppl: ee.successSuppl,
    warningColor: ee.warningDefault,
    warningColorHover: ee.warningHover,
    warningColorPressed: ee.warningActive,
    warningColorSuppl: ee.warningSuppl,
    errorColor: ee.errorDefault,
    errorColorHover: ee.errorHover,
    errorColorPressed: ee.errorActive,
    errorColorSuppl: ee.errorSuppl,
    textColorBase: ee.neutralTextBase,
    textColor1: ye(ee.alpha1),
    textColor2: ye(ee.alpha2),
    textColor3: ye(ee.alpha3),
    textColorDisabled: ye(ee.alpha4),
    placeholderColor: ye(ee.alpha4),
    placeholderColorDisabled: ye(ee.alpha5),
    iconColor: ye(ee.alpha4),
    iconColorDisabled: ye(ee.alpha5),
    iconColorHover: ye(Number(ee.alpha4) * 1.25),
    iconColorPressed: ye(Number(ee.alpha4) * 0.8),
    opacity1: ee.alpha1,
    opacity2: ee.alpha2,
    opacity3: ee.alpha3,
    opacity4: ee.alpha4,
    opacity5: ee.alpha5,
    dividerColor: ye(ee.alphaDivider),
    borderColor: ye(ee.alphaBorder),
    closeIconColorHover: ye(Number(ee.alphaClose)),
    closeIconColor: ye(Number(ee.alphaClose)),
    closeIconColorPressed: ye(Number(ee.alphaClose)),
    closeColorHover: "rgba(255, 255, 255, .12)",
    closeColorPressed: "rgba(255, 255, 255, .08)",
    clearColor: ye(ee.alpha4),
    clearColorHover: Ve(ye(ee.alpha4), {
      alpha: 1.25
    }),
    clearColorPressed: Ve(ye(ee.alpha4), {
      alpha: 0.8
    }),
    scrollbarColor: ye(ee.alphaScrollbar),
    scrollbarColorHover: ye(ee.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: ye(ee.alphaProgressRail),
    railColor: ye(ee.alphaRail),
    popoverColor: ee.neutralPopover,
    tableColor: ee.neutralCard,
    cardColor: ee.neutralCard,
    modalColor: ee.neutralModal,
    bodyColor: ee.neutralBody,
    tagColor: Vy(ee.alphaTag),
    avatarColor: ye(ee.alphaAvatar),
    invertedColor: ee.neutralBase,
    inputColor: ye(ee.alphaInput),
    codeColor: ye(ee.alphaCode),
    tabColor: ye(ee.alphaTab),
    actionColor: ye(ee.alphaAction),
    tableHeaderColor: ye(ee.alphaAction),
    hoverColor: ye(ee.alphaPending),
    tableColorHover: ye(ee.alphaTablePending),
    tableColorStriped: ye(ee.alphaTableStriped),
    pressedColor: ye(ee.alphaPressed),
    opacityDisabled: ee.alphaDisabled,
    inputColorDisabled: ye(ee.alphaDisabledInput),
    buttonColor2: "rgba(255, 255, 255, .08)",
    buttonColor2Hover: "rgba(255, 255, 255, .12)",
    buttonColor2Pressed: "rgba(255, 255, 255, .08)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), fe = {
    neutralBase: "#FFF",
    neutralInvertBase: "#000",
    neutralTextBase: "#000",
    neutralPopover: "#fff",
    neutralCard: "#fff",
    neutralModal: "#fff",
    neutralBody: "#fff",
    alpha1: "0.82",
    alpha2: "0.72",
    alpha3: "0.38",
    alpha4: "0.24",
    alpha5: "0.18",
    alphaClose: "0.6",
    alphaDisabled: "0.5",
    alphaAvatar: "0.2",
    alphaProgressRail: ".08",
    alphaInput: "0",
    alphaScrollbar: "0.25",
    alphaScrollbarHover: "0.4",
    primaryHover: "#36ad6a",
    primaryDefault: "#18a058",
    primaryActive: "#0c7a43",
    primarySuppl: "#36ad6a",
    infoHover: "#4098fc",
    infoDefault: "#2080f0",
    infoActive: "#1060c9",
    infoSuppl: "#4098fc",
    errorHover: "#de576d",
    errorDefault: "#d03050",
    errorActive: "#ab1f3f",
    errorSuppl: "#de576d",
    warningHover: "#fcb040",
    warningDefault: "#f0a020",
    warningActive: "#c97c10",
    warningSuppl: "#fcb040",
    successHover: "#36ad6a",
    successDefault: "#18a058",
    successActive: "#0c7a43",
    successSuppl: "#36ad6a"
  }, Gy = po(fe.neutralBase), zf = po(fe.neutralInvertBase), Uy = `rgba(${zf.slice(0, 3).join(", ")}, `;
  function Oc(e) {
    return `${Uy + String(e)})`;
  }
  function ot(e) {
    const t = Array.from(zf);
    return t[3] = Number(e), oe(Gy, t);
  }
  let Ky;
  Ie = Object.assign(Object.assign({
    name: "common"
  }, Bo), {
    baseColor: fe.neutralBase,
    primaryColor: fe.primaryDefault,
    primaryColorHover: fe.primaryHover,
    primaryColorPressed: fe.primaryActive,
    primaryColorSuppl: fe.primarySuppl,
    infoColor: fe.infoDefault,
    infoColorHover: fe.infoHover,
    infoColorPressed: fe.infoActive,
    infoColorSuppl: fe.infoSuppl,
    successColor: fe.successDefault,
    successColorHover: fe.successHover,
    successColorPressed: fe.successActive,
    successColorSuppl: fe.successSuppl,
    warningColor: fe.warningDefault,
    warningColorHover: fe.warningHover,
    warningColorPressed: fe.warningActive,
    warningColorSuppl: fe.warningSuppl,
    errorColor: fe.errorDefault,
    errorColorHover: fe.errorHover,
    errorColorPressed: fe.errorActive,
    errorColorSuppl: fe.errorSuppl,
    textColorBase: fe.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    textColorDisabled: ot(fe.alpha4),
    placeholderColor: ot(fe.alpha4),
    placeholderColorDisabled: ot(fe.alpha5),
    iconColor: ot(fe.alpha4),
    iconColorHover: Ve(ot(fe.alpha4), {
      lightness: 0.75
    }),
    iconColorPressed: Ve(ot(fe.alpha4), {
      lightness: 0.9
    }),
    iconColorDisabled: ot(fe.alpha5),
    opacity1: fe.alpha1,
    opacity2: fe.alpha2,
    opacity3: fe.alpha3,
    opacity4: fe.alpha4,
    opacity5: fe.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    closeIconColor: ot(Number(fe.alphaClose)),
    closeIconColorHover: ot(Number(fe.alphaClose)),
    closeIconColorPressed: ot(Number(fe.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    clearColor: ot(fe.alpha4),
    clearColorHover: Ve(ot(fe.alpha4), {
      lightness: 0.75
    }),
    clearColorPressed: Ve(ot(fe.alpha4), {
      lightness: 0.9
    }),
    scrollbarColor: Oc(fe.alphaScrollbar),
    scrollbarColorHover: Oc(fe.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: ot(fe.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: fe.neutralPopover,
    tableColor: fe.neutralCard,
    cardColor: fe.neutralCard,
    modalColor: fe.neutralModal,
    bodyColor: fe.neutralBody,
    tagColor: "#eee",
    avatarColor: ot(fe.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: ot(fe.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: fe.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  });
  Ky = {
    railInsetHorizontalBottom: "auto 2px 4px 2px",
    railInsetHorizontalTop: "4px 2px auto 2px",
    railInsetVerticalRight: "2px 4px 2px auto",
    railInsetVerticalLeft: "2px auto 2px 4px",
    railColor: "transparent"
  };
  function Hf(e) {
    const { scrollbarColor: t, scrollbarColorHover: o, scrollbarHeight: r, scrollbarWidth: n, scrollbarBorderRadius: i } = e;
    return Object.assign(Object.assign({}, Ky), {
      height: r,
      width: n,
      borderRadius: i,
      color: t,
      colorHover: o
    });
  }
  let xo, at, qy, Xy, Yy;
  xo = {
    name: "Scrollbar",
    common: Ie,
    self: Hf
  };
  at = {
    name: "Scrollbar",
    common: k,
    self: Hf
  };
  qy = te("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [
    M(">", [
      te("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [
        M("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `),
        M(">", [
          te("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
        ])
      ])
    ]),
    M(">, +", [
      te("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [
        ne("horizontal", `
 height: var(--n-scrollbar-height);
 `, [
          M(">", [
            re("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)
          ])
        ]),
        ne("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),
        ne("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),
        ne("vertical", `
 width: var(--n-scrollbar-width);
 `, [
          M(">", [
            re("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)
          ])
        ]),
        ne("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),
        ne("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),
        ne("disabled", [
          M(">", [
            re("scrollbar", "pointer-events: none;")
          ])
        ]),
        M(">", [
          re("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [
            Af(),
            M("&:hover", "background-color: var(--n-scrollbar-color-hover);")
          ])
        ])
      ])
    ])
  ]);
  Xy = Object.assign(Object.assign({}, gt.props), {
    duration: {
      type: Number,
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    xScrollable: Boolean,
    trigger: {
      type: String,
      default: "hover"
    },
    useUnifiedContainer: Boolean,
    triggerDisplayManually: Boolean,
    container: Function,
    content: Function,
    containerClass: String,
    containerStyle: [
      String,
      Object
    ],
    contentClass: [
      String,
      Array
    ],
    contentStyle: [
      String,
      Object
    ],
    horizontalRailStyle: [
      String,
      Object
    ],
    verticalRailStyle: [
      String,
      Object
    ],
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    internalOnUpdateScrollLeft: Function,
    internalHoistYRail: Boolean,
    internalExposeWidthCssVar: Boolean,
    yPlacement: {
      type: String,
      default: "right"
    },
    xPlacement: {
      type: String,
      default: "bottom"
    }
  });
  Di = we({
    name: "Scrollbar",
    props: Xy,
    inheritAttrs: false,
    setup(e) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = bo(e), n = Ar("Scrollbar", r, t), i = de(null), l = de(null), s = de(null), a = de(null), d = de(null), c = de(null), u = de(null), f = de(null), p = de(null), h = de(null), g = de(null), C = de(0), x = de(0), y = de(false), _ = de(false);
      let A = false, E = false, R, w, b = 0, S = 0, I = 0, D = 0;
      const H = Fv(), N = gt("Scrollbar", "-scrollbar", qy, xo, e, t), ae = Q(() => {
        const { value: L } = f, { value: ie } = c, { value: ge } = h;
        return L === null || ie === null || ge === null ? 0 : Math.min(L, ge * L / ie + ja(N.value.self.width) * 1.5);
      }), ue = Q(() => `${ae.value}px`), le = Q(() => {
        const { value: L } = p, { value: ie } = u, { value: ge } = g;
        return L === null || ie === null || ge === null ? 0 : ge * L / ie + ja(N.value.self.height) * 1.5;
      }), X = Q(() => `${le.value}px`), Y = Q(() => {
        const { value: L } = f, { value: ie } = C, { value: ge } = c, { value: Be } = h;
        if (L === null || ge === null || Be === null) return 0;
        {
          const qe = ge - L;
          return qe ? ie / qe * (Be - ae.value) : 0;
        }
      }), _e = Q(() => `${Y.value}px`), Ae = Q(() => {
        const { value: L } = p, { value: ie } = x, { value: ge } = u, { value: Be } = g;
        if (L === null || ge === null || Be === null) return 0;
        {
          const qe = ge - L;
          return qe ? ie / qe * (Be - le.value) : 0;
        }
      }), Ce = Q(() => `${Ae.value}px`), ze = Q(() => {
        const { value: L } = f, { value: ie } = c;
        return L !== null && ie !== null && ie > L;
      }), Qe = Q(() => {
        const { value: L } = p, { value: ie } = u;
        return L !== null && ie !== null && ie > L;
      }), Ue = Q(() => {
        const { trigger: L } = e;
        return L === "none" || y.value;
      }), ct = Q(() => {
        const { trigger: L } = e;
        return L === "none" || _.value;
      }), ke = Q(() => {
        const { container: L } = e;
        return L ? L() : l.value;
      }), $ = Q(() => {
        const { content: L } = e;
        return L ? L() : s.value;
      }), Z = (L, ie) => {
        if (!e.scrollable) return;
        if (typeof L == "number") {
          v(L, ie ?? 0, 0, false, "auto");
          return;
        }
        const { left: ge, top: Be, index: qe, elSize: xt, position: It, behavior: De, el: Rt, debounce: yo = true } = L;
        (ge !== void 0 || Be !== void 0) && v(ge ?? 0, Be ?? 0, 0, false, De), Rt !== void 0 ? v(0, Rt.offsetTop, Rt.offsetHeight, yo, De) : qe !== void 0 && xt !== void 0 ? v(0, qe * xt, xt, yo, De) : It === "bottom" ? v(0, Number.MAX_SAFE_INTEGER, 0, false, De) : It === "top" && v(0, 0, 0, false, De);
      }, U = Nv(() => {
        e.container || Z({
          top: C.value,
          left: x.value
        });
      }), j = () => {
        U.isDeactivated || ce();
      }, be = (L) => {
        if (U.isDeactivated) return;
        const { onResize: ie } = e;
        ie && ie(L), ce();
      }, m = (L, ie) => {
        if (!e.scrollable) return;
        const { value: ge } = ke;
        ge && (typeof L == "object" ? ge.scrollBy(L) : ge.scrollBy(L, ie || 0));
      };
      function v(L, ie, ge, Be, qe) {
        const { value: xt } = ke;
        if (xt) {
          if (Be) {
            const { scrollTop: It, offsetHeight: De } = xt;
            if (ie > It) {
              ie + ge <= It + De || xt.scrollTo({
                left: L,
                top: ie + ge - De,
                behavior: qe
              });
              return;
            }
          }
          xt.scrollTo({
            left: L,
            top: ie,
            behavior: qe
          });
        }
      }
      function P() {
        V(), W(), ce();
      }
      function O() {
        F();
      }
      function F() {
        B(), K();
      }
      function B() {
        w !== void 0 && window.clearTimeout(w), w = window.setTimeout(() => {
          _.value = false;
        }, e.duration);
      }
      function K() {
        R !== void 0 && window.clearTimeout(R), R = window.setTimeout(() => {
          y.value = false;
        }, e.duration);
      }
      function V() {
        R !== void 0 && window.clearTimeout(R), y.value = true;
      }
      function W() {
        w !== void 0 && window.clearTimeout(w), _.value = true;
      }
      function z(L) {
        const { onScroll: ie } = e;
        ie && ie(L), J();
      }
      function J() {
        const { value: L } = ke;
        L && (C.value = L.scrollTop, x.value = L.scrollLeft * ((n == null ? void 0 : n.value) ? -1 : 1));
      }
      function q() {
        const { value: L } = $;
        L && (c.value = L.offsetHeight, u.value = L.offsetWidth);
        const { value: ie } = ke;
        ie && (f.value = ie.offsetHeight, p.value = ie.offsetWidth);
        const { value: ge } = d, { value: Be } = a;
        ge && (g.value = ge.offsetWidth), Be && (h.value = Be.offsetHeight);
      }
      function se() {
        const { value: L } = ke;
        L && (C.value = L.scrollTop, x.value = L.scrollLeft * ((n == null ? void 0 : n.value) ? -1 : 1), f.value = L.offsetHeight, p.value = L.offsetWidth, c.value = L.scrollHeight, u.value = L.scrollWidth);
        const { value: ie } = d, { value: ge } = a;
        ie && (g.value = ie.offsetWidth), ge && (h.value = ge.offsetHeight);
      }
      function ce() {
        e.scrollable && (e.useUnifiedContainer ? se() : (q(), J()));
      }
      function ve(L) {
        var ie;
        return !(!((ie = i.value) === null || ie === void 0) && ie.contains(hs(L)));
      }
      function Re(L) {
        L.preventDefault(), L.stopPropagation(), E = true, pt("mousemove", window, $e, true), pt("mouseup", window, Me, true), S = x.value, I = (n == null ? void 0 : n.value) ? window.innerWidth - L.clientX : L.clientX;
      }
      function $e(L) {
        if (!E) return;
        R !== void 0 && window.clearTimeout(R), w !== void 0 && window.clearTimeout(w);
        const { value: ie } = p, { value: ge } = u, { value: Be } = le;
        if (ie === null || ge === null) return;
        const xt = ((n == null ? void 0 : n.value) ? window.innerWidth - L.clientX - I : L.clientX - I) * (ge - ie) / (ie - Be), It = ge - ie;
        let De = S + xt;
        De = Math.min(It, De), De = Math.max(De, 0);
        const { value: Rt } = ke;
        if (Rt) {
          Rt.scrollLeft = De * ((n == null ? void 0 : n.value) ? -1 : 1);
          const { internalOnUpdateScrollLeft: yo } = e;
          yo && yo(De);
        }
      }
      function Me(L) {
        L.preventDefault(), L.stopPropagation(), Je("mousemove", window, $e, true), Je("mouseup", window, Me, true), E = false, ce(), ve(L) && F();
      }
      function Ke(L) {
        L.preventDefault(), L.stopPropagation(), A = true, pt("mousemove", window, mt, true), pt("mouseup", window, bt, true), b = C.value, D = L.clientY;
      }
      function mt(L) {
        if (!A) return;
        R !== void 0 && window.clearTimeout(R), w !== void 0 && window.clearTimeout(w);
        const { value: ie } = f, { value: ge } = c, { value: Be } = ae;
        if (ie === null || ge === null) return;
        const xt = (L.clientY - D) * (ge - ie) / (ie - Be), It = ge - ie;
        let De = b + xt;
        De = Math.min(It, De), De = Math.max(De, 0);
        const { value: Rt } = ke;
        Rt && (Rt.scrollTop = De);
      }
      function bt(L) {
        L.preventDefault(), L.stopPropagation(), Je("mousemove", window, mt, true), Je("mouseup", window, bt, true), A = false, ce(), ve(L) && F();
      }
      xi(() => {
        const { value: L } = Qe, { value: ie } = ze, { value: ge } = t, { value: Be } = d, { value: qe } = a;
        Be && (L ? Be.classList.remove(`${ge}-scrollbar-rail--disabled`) : Be.classList.add(`${ge}-scrollbar-rail--disabled`)), qe && (ie ? qe.classList.remove(`${ge}-scrollbar-rail--disabled`) : qe.classList.add(`${ge}-scrollbar-rail--disabled`));
      }), mo(() => {
        e.container || ce();
      }), Dt(() => {
        R !== void 0 && window.clearTimeout(R), w !== void 0 && window.clearTimeout(w), Je("mousemove", window, mt, true), Je("mouseup", window, bt, true);
      });
      const Co = Q(() => {
        const { common: { cubicBezierEaseInOut: L }, self: { color: ie, colorHover: ge, height: Be, width: qe, borderRadius: xt, railInsetHorizontalTop: It, railInsetHorizontalBottom: De, railInsetVerticalRight: Rt, railInsetVerticalLeft: yo, railColor: Ap } } = N.value, { top: Ip, right: zp, bottom: Hp, left: Op } = $o(It), { top: Bp, right: Fp, bottom: Mp, left: Dp } = $o(De), { top: Lp, right: kp, bottom: jp, left: Wp } = $o((n == null ? void 0 : n.value) ? gc(Rt) : Rt), { top: Np, right: Vp, bottom: Gp, left: Up } = $o((n == null ? void 0 : n.value) ? gc(yo) : yo);
        return {
          "--n-scrollbar-bezier": L,
          "--n-scrollbar-color": ie,
          "--n-scrollbar-color-hover": ge,
          "--n-scrollbar-border-radius": xt,
          "--n-scrollbar-width": qe,
          "--n-scrollbar-height": Be,
          "--n-scrollbar-rail-top-horizontal-top": Ip,
          "--n-scrollbar-rail-right-horizontal-top": zp,
          "--n-scrollbar-rail-bottom-horizontal-top": Hp,
          "--n-scrollbar-rail-left-horizontal-top": Op,
          "--n-scrollbar-rail-top-horizontal-bottom": Bp,
          "--n-scrollbar-rail-right-horizontal-bottom": Fp,
          "--n-scrollbar-rail-bottom-horizontal-bottom": Mp,
          "--n-scrollbar-rail-left-horizontal-bottom": Dp,
          "--n-scrollbar-rail-top-vertical-right": Lp,
          "--n-scrollbar-rail-right-vertical-right": kp,
          "--n-scrollbar-rail-bottom-vertical-right": jp,
          "--n-scrollbar-rail-left-vertical-right": Wp,
          "--n-scrollbar-rail-top-vertical-left": Np,
          "--n-scrollbar-rail-right-vertical-left": Vp,
          "--n-scrollbar-rail-bottom-vertical-left": Gp,
          "--n-scrollbar-rail-left-vertical-left": Up,
          "--n-scrollbar-rail-color": Ap
        };
      }), eo = o ? or("scrollbar", void 0, Co, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Z,
        scrollBy: m,
        sync: ce,
        syncUnifiedContainer: se,
        handleMouseEnterWrapper: P,
        handleMouseLeaveWrapper: O
      }), {
        mergedClsPrefix: t,
        rtlEnabled: n,
        containerScrollTop: C,
        wrapperRef: i,
        containerRef: l,
        contentRef: s,
        yRailRef: a,
        xRailRef: d,
        needYBar: ze,
        needXBar: Qe,
        yBarSizePx: ue,
        xBarSizePx: X,
        yBarTopPx: _e,
        xBarLeftPx: Ce,
        isShowXBar: Ue,
        isShowYBar: ct,
        isIos: H,
        handleScroll: z,
        handleContentResize: j,
        handleContainerResize: be,
        handleYScrollMouseDown: Ke,
        handleXScrollMouseDown: Re,
        containerWidth: p,
        cssVars: o ? void 0 : Co,
        themeClass: eo == null ? void 0 : eo.themeClass,
        onRender: eo == null ? void 0 : eo.onRender
      });
    },
    render() {
      var e;
      const { $slots: t, mergedClsPrefix: o, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i, yPlacement: l, xPlacement: s, xScrollable: a } = this;
      if (!this.scrollable) return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
      const d = this.trigger === "none", c = (p, h) => T("div", {
        ref: "yRailRef",
        class: [
          `${o}-scrollbar-rail`,
          `${o}-scrollbar-rail--vertical`,
          `${o}-scrollbar-rail--vertical--${l}`,
          p
        ],
        "data-scrollbar-rail": true,
        style: [
          h || "",
          this.verticalRailStyle
        ],
        "aria-hidden": true
      }, T(d ? bc : Jo, d ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? T("div", {
          class: `${o}-scrollbar-rail__scrollbar`,
          style: {
            height: this.yBarSizePx,
            top: this.yBarTopPx
          },
          onMousedown: this.handleYScrollMouseDown
        }) : null
      })), u = () => {
        var p, h;
        return (p = this.onRender) === null || p === void 0 || p.call(this), T("div", us(this.$attrs, {
          role: "none",
          ref: "wrapperRef",
          class: [
            `${o}-scrollbar`,
            this.themeClass,
            n && `${o}-scrollbar--rtl`
          ],
          style: this.cssVars,
          onMouseenter: r ? void 0 : this.handleMouseEnterWrapper,
          onMouseleave: r ? void 0 : this.handleMouseLeaveWrapper
        }), [
          this.container ? (h = t.default) === null || h === void 0 ? void 0 : h.call(t) : T("div", {
            role: "none",
            ref: "containerRef",
            class: [
              `${o}-scrollbar-container`,
              this.containerClass
            ],
            style: [
              this.containerStyle,
              this.internalExposeWidthCssVar ? {
                "--n-scrollbar-current-width": gv(this.containerWidth)
              } : void 0
            ],
            onScroll: this.handleScroll,
            onWheel: this.onWheel
          }, T(pc, {
            onResize: this.handleContentResize
          }, {
            default: () => T("div", {
              ref: "contentRef",
              role: "none",
              style: [
                {
                  width: this.xScrollable ? "fit-content" : null
                },
                this.contentStyle
              ],
              class: [
                `${o}-scrollbar-content`,
                this.contentClass
              ]
            }, t)
          })),
          i ? null : c(void 0, void 0),
          a && T("div", {
            ref: "xRailRef",
            class: [
              `${o}-scrollbar-rail`,
              `${o}-scrollbar-rail--horizontal`,
              `${o}-scrollbar-rail--horizontal--${s}`
            ],
            style: this.horizontalRailStyle,
            "data-scrollbar-rail": true,
            "aria-hidden": true
          }, T(d ? bc : Jo, d ? null : {
            name: "fade-in-transition"
          }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? T("div", {
              class: `${o}-scrollbar-rail__scrollbar`,
              style: {
                width: this.xBarSizePx,
                right: n ? this.xBarLeftPx : void 0,
                left: n ? void 0 : this.xBarLeftPx
              },
              onMousedown: this.handleXScrollMouseDown
            }) : null
          }))
        ]);
      }, f = this.container ? u() : T(pc, {
        onResize: this.handleContainerResize
      }, {
        default: u
      });
      return i ? T(We, null, f, c(this.themeClass, this.cssVars)) : f;
    }
  });
  rP = Di;
  Yy = {
    iconSizeTiny: "28px",
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  };
  function Of(e) {
    const { textColorDisabled: t, iconColor: o, textColor2: r, fontSizeTiny: n, fontSizeSmall: i, fontSizeMedium: l, fontSizeLarge: s, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, Yy), {
      fontSizeTiny: n,
      fontSizeSmall: i,
      fontSizeMedium: l,
      fontSizeLarge: s,
      fontSizeHuge: a,
      textColor: t,
      iconColor: o,
      extraTextColor: r
    });
  }
  let nr, Zy;
  Es = {
    name: "Empty",
    common: Ie,
    self: Of
  };
  nr = {
    name: "Empty",
    common: k,
    self: Of
  };
  Zy = {
    height: "calc(var(--n-option-height) * 7.6)",
    paddingTiny: "4px 0",
    paddingSmall: "4px 0",
    paddingMedium: "4px 0",
    paddingLarge: "4px 0",
    paddingHuge: "4px 0",
    optionPaddingTiny: "0 12px",
    optionPaddingSmall: "0 12px",
    optionPaddingMedium: "0 12px",
    optionPaddingLarge: "0 12px",
    optionPaddingHuge: "0 12px",
    loadingSize: "18px"
  };
  function Bf(e) {
    const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: s, primaryColor: a, opacityDisabled: d, hoverColor: c, fontSizeTiny: u, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: h, fontSizeHuge: g, heightTiny: C, heightSmall: x, heightMedium: y, heightLarge: _, heightHuge: A } = e;
    return Object.assign(Object.assign({}, Zy), {
      optionFontSizeTiny: u,
      optionFontSizeSmall: f,
      optionFontSizeMedium: p,
      optionFontSizeLarge: h,
      optionFontSizeHuge: g,
      optionHeightTiny: C,
      optionHeightSmall: x,
      optionHeightMedium: y,
      optionHeightLarge: _,
      optionHeightHuge: A,
      borderRadius: t,
      color: o,
      groupHeaderTextColor: r,
      actionDividerColor: n,
      optionTextColor: i,
      optionTextColorPressed: l,
      optionTextColorDisabled: s,
      optionTextColorActive: a,
      optionOpacityDisabled: d,
      optionCheckColor: a,
      optionColorPending: c,
      optionColorActive: "rgba(0, 0, 0, 0)",
      optionColorActivePending: c,
      actionTextColor: i,
      loadingColor: a
    });
  }
  let Pn, Bc, Fc;
  Ff = {
    name: "InternalSelectMenu",
    common: Ie,
    peers: {
      Scrollbar: xo,
      Empty: Es
    },
    self: Bf
  };
  Pn = {
    name: "InternalSelectMenu",
    common: k,
    peers: {
      Scrollbar: at,
      Empty: nr
    },
    self: Bf
  };
  ({ cubicBezierEaseIn: Bc, cubicBezierEaseOut: Fc } = Bo);
  Qy = function({ transformOrigin: e = "inherit", duration: t = ".2s", enterScale: o = ".9", originalTransform: r = "", originalTransition: n = "" } = {}) {
    return [
      M("&.fade-in-scale-up-transition-leave-active", {
        transformOrigin: e,
        transition: `opacity ${t} ${Bc}, transform ${t} ${Bc} ${n && `,${n}`}`
      }),
      M("&.fade-in-scale-up-transition-enter-active", {
        transformOrigin: e,
        transition: `opacity ${t} ${Fc}, transform ${t} ${Fc} ${n && `,${n}`}`
      }),
      M("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
        opacity: 0,
        transform: `${r} scale(${o})`
      }),
      M("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
        opacity: 1,
        transform: `${r} scale(1)`
      })
    ];
  };
  const Jy = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  };
  function Mf(e) {
    const { boxShadow2: t, popoverColor: o, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, Jy), {
      fontSize: i,
      borderRadius: n,
      color: o,
      dividerColor: l,
      textColor: r,
      boxShadow: t
    });
  }
  let ir, Df, Lf, _s;
  Tn = {
    name: "Popover",
    common: Ie,
    peers: {
      Scrollbar: xo
    },
    self: Mf
  };
  ir = {
    name: "Popover",
    common: k,
    peers: {
      Scrollbar: at
    },
    self: Mf
  };
  eS = {
    closeIconSizeTiny: "12px",
    closeIconSizeSmall: "12px",
    closeIconSizeMedium: "14px",
    closeIconSizeLarge: "14px",
    closeSizeTiny: "16px",
    closeSizeSmall: "16px",
    closeSizeMedium: "18px",
    closeSizeLarge: "18px",
    padding: "0 7px",
    closeMargin: "0 0 0 4px"
  };
  Df = {
    name: "Tag",
    common: k,
    self(e) {
      const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: s, errorColor: a, baseColor: d, borderColor: c, tagColor: u, opacityDisabled: f, closeIconColor: p, closeIconColorHover: h, closeIconColorPressed: g, closeColorHover: C, closeColorPressed: x, borderRadiusSmall: y, fontSizeMini: _, fontSizeTiny: A, fontSizeSmall: E, fontSizeMedium: R, heightMini: w, heightTiny: b, heightSmall: S, heightMedium: I, buttonColor2Hover: D, buttonColor2Pressed: H, fontWeightStrong: N } = e;
      return Object.assign(Object.assign({}, eS), {
        closeBorderRadius: y,
        heightTiny: w,
        heightSmall: b,
        heightMedium: S,
        heightLarge: I,
        borderRadius: y,
        opacityDisabled: f,
        fontSizeTiny: _,
        fontSizeSmall: A,
        fontSizeMedium: E,
        fontSizeLarge: R,
        fontWeightStrong: N,
        textColorCheckable: t,
        textColorHoverCheckable: t,
        textColorPressedCheckable: t,
        textColorChecked: d,
        colorCheckable: "#0000",
        colorHoverCheckable: D,
        colorPressedCheckable: H,
        colorChecked: n,
        colorCheckedHover: o,
        colorCheckedPressed: r,
        border: `1px solid ${c}`,
        textColor: t,
        color: u,
        colorBordered: "#0000",
        closeIconColor: p,
        closeIconColorHover: h,
        closeIconColorPressed: g,
        closeColorHover: C,
        closeColorPressed: x,
        borderPrimary: `1px solid ${G(n, {
          alpha: 0.3
        })}`,
        textColorPrimary: n,
        colorPrimary: G(n, {
          alpha: 0.16
        }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: Ve(n, {
          lightness: 0.7
        }),
        closeIconColorHoverPrimary: Ve(n, {
          lightness: 0.7
        }),
        closeIconColorPressedPrimary: Ve(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: G(n, {
          alpha: 0.16
        }),
        closeColorPressedPrimary: G(n, {
          alpha: 0.12
        }),
        borderInfo: `1px solid ${G(i, {
          alpha: 0.3
        })}`,
        textColorInfo: i,
        colorInfo: G(i, {
          alpha: 0.16
        }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: Ve(i, {
          alpha: 0.7
        }),
        closeIconColorHoverInfo: Ve(i, {
          alpha: 0.7
        }),
        closeIconColorPressedInfo: Ve(i, {
          alpha: 0.7
        }),
        closeColorHoverInfo: G(i, {
          alpha: 0.16
        }),
        closeColorPressedInfo: G(i, {
          alpha: 0.12
        }),
        borderSuccess: `1px solid ${G(l, {
          alpha: 0.3
        })}`,
        textColorSuccess: l,
        colorSuccess: G(l, {
          alpha: 0.16
        }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: Ve(l, {
          alpha: 0.7
        }),
        closeIconColorHoverSuccess: Ve(l, {
          alpha: 0.7
        }),
        closeIconColorPressedSuccess: Ve(l, {
          alpha: 0.7
        }),
        closeColorHoverSuccess: G(l, {
          alpha: 0.16
        }),
        closeColorPressedSuccess: G(l, {
          alpha: 0.12
        }),
        borderWarning: `1px solid ${G(s, {
          alpha: 0.3
        })}`,
        textColorWarning: s,
        colorWarning: G(s, {
          alpha: 0.16
        }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: Ve(s, {
          alpha: 0.7
        }),
        closeIconColorHoverWarning: Ve(s, {
          alpha: 0.7
        }),
        closeIconColorPressedWarning: Ve(s, {
          alpha: 0.7
        }),
        closeColorHoverWarning: G(s, {
          alpha: 0.16
        }),
        closeColorPressedWarning: G(s, {
          alpha: 0.11
        }),
        borderError: `1px solid ${G(a, {
          alpha: 0.3
        })}`,
        textColorError: a,
        colorError: G(a, {
          alpha: 0.16
        }),
        colorBorderedError: "#0000",
        closeIconColorError: Ve(a, {
          alpha: 0.7
        }),
        closeIconColorHoverError: Ve(a, {
          alpha: 0.7
        }),
        closeIconColorPressedError: Ve(a, {
          alpha: 0.7
        }),
        closeColorHoverError: G(a, {
          alpha: 0.16
        }),
        closeColorPressedError: G(a, {
          alpha: 0.12
        })
      });
    }
  };
  Lf = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  };
  _s = {
    name: "InternalSelection",
    common: k,
    peers: {
      Popover: ir
    },
    self(e) {
      const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: s, warningColor: a, warningColorHover: d, errorColor: c, errorColorHover: u, iconColor: f, iconColorDisabled: p, clearColor: h, clearColorHover: g, clearColorPressed: C, placeholderColor: x, placeholderColorDisabled: y, fontSizeTiny: _, fontSizeSmall: A, fontSizeMedium: E, fontSizeLarge: R, heightTiny: w, heightSmall: b, heightMedium: S, heightLarge: I, fontWeight: D } = e;
      return Object.assign(Object.assign({}, Lf), {
        fontWeight: D,
        fontSizeTiny: _,
        fontSizeSmall: A,
        fontSizeMedium: E,
        fontSizeLarge: R,
        heightTiny: w,
        heightSmall: b,
        heightMedium: S,
        heightLarge: I,
        borderRadius: t,
        textColor: o,
        textColorDisabled: r,
        placeholderColor: x,
        placeholderColorDisabled: y,
        color: n,
        colorDisabled: i,
        colorActive: G(l, {
          alpha: 0.1
        }),
        border: "1px solid #0000",
        borderHover: `1px solid ${s}`,
        borderActive: `1px solid ${l}`,
        borderFocus: `1px solid ${s}`,
        boxShadowHover: "none",
        boxShadowActive: `0 0 8px 0 ${G(l, {
          alpha: 0.4
        })}`,
        boxShadowFocus: `0 0 8px 0 ${G(l, {
          alpha: 0.4
        })}`,
        caretColor: l,
        arrowColor: f,
        arrowColorDisabled: p,
        loadingColor: l,
        borderWarning: `1px solid ${a}`,
        borderHoverWarning: `1px solid ${d}`,
        borderActiveWarning: `1px solid ${a}`,
        borderFocusWarning: `1px solid ${d}`,
        boxShadowHoverWarning: "none",
        boxShadowActiveWarning: `0 0 8px 0 ${G(a, {
          alpha: 0.4
        })}`,
        boxShadowFocusWarning: `0 0 8px 0 ${G(a, {
          alpha: 0.4
        })}`,
        colorActiveWarning: G(a, {
          alpha: 0.1
        }),
        caretColorWarning: a,
        borderError: `1px solid ${c}`,
        borderHoverError: `1px solid ${u}`,
        borderActiveError: `1px solid ${c}`,
        borderFocusError: `1px solid ${u}`,
        boxShadowHoverError: "none",
        boxShadowActiveError: `0 0 8px 0 ${G(c, {
          alpha: 0.4
        })}`,
        boxShadowFocusError: `0 0 8px 0 ${G(c, {
          alpha: 0.4
        })}`,
        colorActiveError: G(c, {
          alpha: 0.1
        }),
        caretColorError: c,
        clearColor: h,
        clearColorHover: g,
        clearColorPressed: C
      });
    }
  };
  function tS(e) {
    const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: s, warningColor: a, warningColorHover: d, errorColor: c, errorColorHover: u, borderColor: f, iconColor: p, iconColorDisabled: h, clearColor: g, clearColorHover: C, clearColorPressed: x, placeholderColor: y, placeholderColorDisabled: _, fontSizeTiny: A, fontSizeSmall: E, fontSizeMedium: R, fontSizeLarge: w, heightTiny: b, heightSmall: S, heightMedium: I, heightLarge: D, fontWeight: H } = e;
    return Object.assign(Object.assign({}, Lf), {
      fontSizeTiny: A,
      fontSizeSmall: E,
      fontSizeMedium: R,
      fontSizeLarge: w,
      heightTiny: b,
      heightSmall: S,
      heightMedium: I,
      heightLarge: D,
      borderRadius: t,
      fontWeight: H,
      textColor: o,
      textColorDisabled: r,
      placeholderColor: y,
      placeholderColorDisabled: _,
      color: n,
      colorDisabled: i,
      colorActive: n,
      border: `1px solid ${f}`,
      borderHover: `1px solid ${s}`,
      borderActive: `1px solid ${l}`,
      borderFocus: `1px solid ${s}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 0 2px ${G(l, {
        alpha: 0.2
      })}`,
      boxShadowFocus: `0 0 0 2px ${G(l, {
        alpha: 0.2
      })}`,
      caretColor: l,
      arrowColor: p,
      arrowColorDisabled: h,
      loadingColor: l,
      borderWarning: `1px solid ${a}`,
      borderHoverWarning: `1px solid ${d}`,
      borderActiveWarning: `1px solid ${a}`,
      borderFocusWarning: `1px solid ${d}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 0 2px ${G(a, {
        alpha: 0.2
      })}`,
      boxShadowFocusWarning: `0 0 0 2px ${G(a, {
        alpha: 0.2
      })}`,
      colorActiveWarning: n,
      caretColorWarning: a,
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${u}`,
      borderActiveError: `1px solid ${c}`,
      borderFocusError: `1px solid ${u}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 0 2px ${G(c, {
        alpha: 0.2
      })}`,
      boxShadowFocusError: `0 0 0 2px ${G(c, {
        alpha: 0.2
      })}`,
      colorActiveError: n,
      caretColorError: c,
      clearColor: g,
      clearColorHover: C,
      clearColorPressed: x
    });
  }
  let Po;
  oS = {
    name: "InternalSelection",
    common: Ie,
    peers: {
      Popover: Tn
    },
    self: tS
  };
  ({ cubicBezierEaseInOut: Po } = Bo);
  function rS({ duration: e = ".2s", delay: t = ".1s" } = {}) {
    return [
      M("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
        opacity: 1
      }),
      M("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),
      M("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Po},
 max-width ${e} ${Po} ${t},
 margin-left ${e} ${Po} ${t},
 margin-right ${e} ${Po} ${t};
 `),
      M("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Po} ${t},
 max-width ${e} ${Po},
 margin-left ${e} ${Po},
 margin-right ${e} ${Po};
 `)
    ];
  }
  let nS, iS, sS, jt, aS, cS;
  nS = te("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
  iS = we({
    name: "BaseWave",
    props: {
      clsPrefix: {
        type: String,
        required: true
      }
    },
    setup(e) {
      Bi("-base-wave", nS, Yt(e, "clsPrefix"));
      const t = de(null), o = de(false);
      let r = null;
      return Dt(() => {
        r !== null && window.clearTimeout(r);
      }), {
        active: o,
        selfRef: t,
        play() {
          r !== null && (window.clearTimeout(r), o.value = false, r = null), Zo(() => {
            var n;
            (n = t.value) === null || n === void 0 || n.offsetHeight, o.value = true, r = window.setTimeout(() => {
              o.value = false, r = null;
            }, 1e3);
          });
        }
      };
    },
    render() {
      const { clsPrefix: e } = this;
      return T("div", {
        ref: "selfRef",
        "aria-hidden": true,
        class: [
          `${e}-base-wave`,
          this.active && `${e}-base-wave--active`
        ]
      });
    }
  });
  lS = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  };
  sS = {
    name: "Alert",
    common: k,
    self(e) {
      const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: s, closeColorHover: a, closeColorPressed: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: f, infoColorSuppl: p, successColorSuppl: h, warningColorSuppl: g, errorColorSuppl: C, fontSize: x } = e;
      return Object.assign(Object.assign({}, lS), {
        fontSize: x,
        lineHeight: t,
        titleFontWeight: r,
        borderRadius: o,
        border: `1px solid ${n}`,
        color: i,
        titleTextColor: l,
        iconColor: s,
        contentTextColor: s,
        closeBorderRadius: o,
        closeColorHover: a,
        closeColorPressed: d,
        closeIconColor: c,
        closeIconColorHover: u,
        closeIconColorPressed: f,
        borderInfo: `1px solid ${G(p, {
          alpha: 0.35
        })}`,
        colorInfo: G(p, {
          alpha: 0.25
        }),
        titleTextColorInfo: l,
        iconColorInfo: p,
        contentTextColorInfo: s,
        closeColorHoverInfo: a,
        closeColorPressedInfo: d,
        closeIconColorInfo: c,
        closeIconColorHoverInfo: u,
        closeIconColorPressedInfo: f,
        borderSuccess: `1px solid ${G(h, {
          alpha: 0.35
        })}`,
        colorSuccess: G(h, {
          alpha: 0.25
        }),
        titleTextColorSuccess: l,
        iconColorSuccess: h,
        contentTextColorSuccess: s,
        closeColorHoverSuccess: a,
        closeColorPressedSuccess: d,
        closeIconColorSuccess: c,
        closeIconColorHoverSuccess: u,
        closeIconColorPressedSuccess: f,
        borderWarning: `1px solid ${G(g, {
          alpha: 0.35
        })}`,
        colorWarning: G(g, {
          alpha: 0.25
        }),
        titleTextColorWarning: l,
        iconColorWarning: g,
        contentTextColorWarning: s,
        closeColorHoverWarning: a,
        closeColorPressedWarning: d,
        closeIconColorWarning: c,
        closeIconColorHoverWarning: u,
        closeIconColorPressedWarning: f,
        borderError: `1px solid ${G(C, {
          alpha: 0.35
        })}`,
        colorError: G(C, {
          alpha: 0.25
        }),
        titleTextColorError: l,
        iconColorError: C,
        contentTextColorError: s,
        closeColorHoverError: a,
        closeColorPressedError: d,
        closeIconColorError: c,
        closeIconColorHoverError: u,
        closeIconColorPressedError: f
      });
    }
  };
  ({ cubicBezierEaseInOut: jt, cubicBezierEaseOut: aS, cubicBezierEaseIn: cS } = Bo);
  dS = function({ overflow: e = "hidden", duration: t = ".3s", originalTransition: o = "", leavingDelay: r = "0s", foldPadding: n = false, enterToProps: i = void 0, leaveToProps: l = void 0, reverse: s = false } = {}) {
    const a = s ? "leave" : "enter", d = s ? "enter" : "leave";
    return [
      M(`&.fade-in-height-expand-transition-${d}-from,
 &.fade-in-height-expand-transition-${a}-to`, Object.assign(Object.assign({}, i), {
        opacity: 1
      })),
      M(`&.fade-in-height-expand-transition-${d}-to,
 &.fade-in-height-expand-transition-${a}-from`, Object.assign(Object.assign({}, l), {
        opacity: 0,
        marginTop: "0 !important",
        marginBottom: "0 !important",
        paddingTop: n ? "0 !important" : void 0,
        paddingBottom: n ? "0 !important" : void 0
      })),
      M(`&.fade-in-height-expand-transition-${d}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${jt} ${r},
 opacity ${t} ${aS} ${r},
 margin-top ${t} ${jt} ${r},
 margin-bottom ${t} ${jt} ${r},
 padding-top ${t} ${jt} ${r},
 padding-bottom ${t} ${jt} ${r}
 ${o ? `,${o}` : ""}
 `),
      M(`&.fade-in-height-expand-transition-${a}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${jt},
 opacity ${t} ${cS},
 margin-top ${t} ${jt},
 margin-bottom ${t} ${jt},
 padding-top ${t} ${jt},
 padding-bottom ${t} ${jt}
 ${o ? `,${o}` : ""}
 `)
    ];
  };
  const uS = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  };
  function fS(e) {
    const { borderRadius: t, railColor: o, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, uS), {
      borderRadius: t,
      railColor: o,
      railColorActive: r,
      linkColor: G(r, {
        alpha: 0.15
      }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }
  const pS = {
    name: "Anchor",
    common: k,
    self: fS
  }, hS = yn && "chrome" in window;
  yn && navigator.userAgent.includes("Firefox");
  let kf;
  gS = yn && navigator.userAgent.includes("Safari") && !hS;
  kf = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  };
  function mS(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: s, warningColor: a, warningColorHover: d, errorColor: c, errorColorHover: u, borderRadius: f, lineHeight: p, fontSizeTiny: h, fontSizeSmall: g, fontSizeMedium: C, fontSizeLarge: x, heightTiny: y, heightSmall: _, heightMedium: A, heightLarge: E, clearColor: R, clearColorHover: w, clearColorPressed: b, placeholderColor: S, placeholderColorDisabled: I, iconColor: D, iconColorDisabled: H, iconColorHover: N, iconColorPressed: ae, fontWeight: ue } = e;
    return Object.assign(Object.assign({}, kf), {
      fontWeight: ue,
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: y,
      heightSmall: _,
      heightMedium: A,
      heightLarge: E,
      fontSizeTiny: h,
      fontSizeSmall: g,
      fontSizeMedium: C,
      fontSizeLarge: x,
      lineHeight: p,
      lineHeightTextarea: p,
      borderRadius: f,
      iconSize: "16px",
      groupLabelColor: l,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      groupLabelTextColor: t,
      caretColor: n,
      placeholderColor: S,
      placeholderColorDisabled: I,
      color: l,
      colorDisabled: s,
      colorFocus: G(n, {
        alpha: 0.1
      }),
      groupLabelBorder: "1px solid #0000",
      border: "1px solid #0000",
      borderHover: `1px solid ${i}`,
      borderDisabled: "1px solid #0000",
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 8px 0 ${G(n, {
        alpha: 0.3
      })}`,
      loadingColor: n,
      loadingColorWarning: a,
      borderWarning: `1px solid ${a}`,
      borderHoverWarning: `1px solid ${d}`,
      colorFocusWarning: G(a, {
        alpha: 0.1
      }),
      borderFocusWarning: `1px solid ${d}`,
      boxShadowFocusWarning: `0 0 8px 0 ${G(a, {
        alpha: 0.3
      })}`,
      caretColorWarning: a,
      loadingColorError: c,
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${u}`,
      colorFocusError: G(c, {
        alpha: 0.1
      }),
      borderFocusError: `1px solid ${u}`,
      boxShadowFocusError: `0 0 8px 0 ${G(c, {
        alpha: 0.3
      })}`,
      caretColorError: c,
      clearColor: R,
      clearColorHover: w,
      clearColorPressed: b,
      iconColor: D,
      iconColorDisabled: H,
      iconColorHover: N,
      iconColorPressed: ae,
      suffixTextColor: t
    });
  }
  const _t = {
    name: "Input",
    common: k,
    peers: {
      Scrollbar: at
    },
    self: mS
  };
  function bS(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: s, borderColor: a, warningColor: d, warningColorHover: c, errorColor: u, errorColorHover: f, borderRadius: p, lineHeight: h, fontSizeTiny: g, fontSizeSmall: C, fontSizeMedium: x, fontSizeLarge: y, heightTiny: _, heightSmall: A, heightMedium: E, heightLarge: R, actionColor: w, clearColor: b, clearColorHover: S, clearColorPressed: I, placeholderColor: D, placeholderColorDisabled: H, iconColor: N, iconColorDisabled: ae, iconColorHover: ue, iconColorPressed: le, fontWeight: X } = e;
    return Object.assign(Object.assign({}, kf), {
      fontWeight: X,
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: _,
      heightSmall: A,
      heightMedium: E,
      heightLarge: R,
      fontSizeTiny: g,
      fontSizeSmall: C,
      fontSizeMedium: x,
      fontSizeLarge: y,
      lineHeight: h,
      lineHeightTextarea: h,
      borderRadius: p,
      iconSize: "16px",
      groupLabelColor: w,
      groupLabelTextColor: t,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      caretColor: n,
      placeholderColor: D,
      placeholderColorDisabled: H,
      color: l,
      colorDisabled: s,
      colorFocus: l,
      groupLabelBorder: `1px solid ${a}`,
      border: `1px solid ${a}`,
      borderHover: `1px solid ${i}`,
      borderDisabled: `1px solid ${a}`,
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 0 2px ${G(n, {
        alpha: 0.2
      })}`,
      loadingColor: n,
      loadingColorWarning: d,
      borderWarning: `1px solid ${d}`,
      borderHoverWarning: `1px solid ${c}`,
      colorFocusWarning: l,
      borderFocusWarning: `1px solid ${c}`,
      boxShadowFocusWarning: `0 0 0 2px ${G(d, {
        alpha: 0.2
      })}`,
      caretColorWarning: d,
      loadingColorError: u,
      borderError: `1px solid ${u}`,
      borderHoverError: `1px solid ${f}`,
      colorFocusError: l,
      borderFocusError: `1px solid ${f}`,
      boxShadowFocusError: `0 0 0 2px ${G(u, {
        alpha: 0.2
      })}`,
      caretColorError: u,
      clearColor: b,
      clearColorHover: S,
      clearColorPressed: I,
      iconColor: N,
      iconColorDisabled: ae,
      iconColorHover: ue,
      iconColorPressed: le,
      suffixTextColor: t
    });
  }
  Rs = {
    name: "Input",
    common: Ie,
    peers: {
      Scrollbar: xo
    },
    self: bS
  };
  function vS(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  const xS = {
    name: "AutoComplete",
    common: k,
    peers: {
      InternalSelectMenu: Pn,
      Input: _t
    },
    self: vS
  };
  function CS(e) {
    const { borderRadius: t, avatarColor: o, cardColor: r, fontSize: n, heightTiny: i, heightSmall: l, heightMedium: s, heightLarge: a, heightHuge: d, modalColor: c, popoverColor: u } = e;
    return {
      borderRadius: t,
      fontSize: n,
      border: `2px solid ${r}`,
      heightTiny: i,
      heightSmall: l,
      heightMedium: s,
      heightLarge: a,
      heightHuge: d,
      color: oe(r, o),
      colorModal: oe(c, o),
      colorPopover: oe(u, o)
    };
  }
  const jf = {
    name: "Avatar",
    common: k,
    self: CS
  };
  function yS() {
    return {
      gap: "-12px"
    };
  }
  const SS = {
    name: "AvatarGroup",
    common: k,
    peers: {
      Avatar: jf
    },
    self: yS
  }, wS = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, PS = {
    name: "BackTop",
    common: k,
    self(e) {
      const { popoverColor: t, textColor2: o, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, wS), {
        color: t,
        textColor: o,
        iconColor: o,
        iconColorHover: r,
        iconColorPressed: n,
        boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
        boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
        boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)"
      });
    }
  }, TS = {
    name: "Badge",
    common: k,
    self(e) {
      const { errorColorSuppl: t, infoColorSuppl: o, successColorSuppl: r, warningColorSuppl: n, fontFamily: i } = e;
      return {
        color: t,
        colorInfo: o,
        colorSuccess: r,
        colorError: t,
        colorWarning: n,
        fontSize: "12px",
        fontFamily: i
      };
    }
  }, ES = {
    fontWeightActive: "400"
  };
  function _S(e) {
    const { fontSize: t, textColor3: o, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, ES), {
      fontSize: t,
      itemLineHeight: "1.25",
      itemTextColor: o,
      itemTextColorHover: r,
      itemTextColorPressed: r,
      itemTextColorActive: r,
      itemBorderRadius: n,
      itemColorHover: i,
      itemColorPressed: l,
      separatorColor: o
    });
  }
  const RS = {
    name: "Breadcrumb",
    common: k,
    self: _S
  };
  function Lo(e) {
    return oe(e, [
      255,
      255,
      255,
      0.16
    ]);
  }
  function Dn(e) {
    return oe(e, [
      0,
      0,
      0,
      0.12
    ]);
  }
  const $S = "n-button-group", AS = {
    paddingTiny: "0 6px",
    paddingSmall: "0 10px",
    paddingMedium: "0 14px",
    paddingLarge: "0 18px",
    paddingRoundTiny: "0 10px",
    paddingRoundSmall: "0 14px",
    paddingRoundMedium: "0 18px",
    paddingRoundLarge: "0 22px",
    iconMarginTiny: "6px",
    iconMarginSmall: "6px",
    iconMarginMedium: "6px",
    iconMarginLarge: "6px",
    iconSizeTiny: "14px",
    iconSizeSmall: "18px",
    iconSizeMedium: "18px",
    iconSizeLarge: "20px",
    rippleDuration: ".6s"
  };
  function Wf(e) {
    const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: s, fontSizeMedium: a, fontSizeLarge: d, opacityDisabled: c, textColor2: u, textColor3: f, primaryColorHover: p, primaryColorPressed: h, borderColor: g, primaryColor: C, baseColor: x, infoColor: y, infoColorHover: _, infoColorPressed: A, successColor: E, successColorHover: R, successColorPressed: w, warningColor: b, warningColorHover: S, warningColorPressed: I, errorColor: D, errorColorHover: H, errorColorPressed: N, fontWeight: ae, buttonColor2: ue, buttonColor2Hover: le, buttonColor2Pressed: X, fontWeightStrong: Y } = e;
    return Object.assign(Object.assign({}, AS), {
      heightTiny: t,
      heightSmall: o,
      heightMedium: r,
      heightLarge: n,
      borderRadiusTiny: i,
      borderRadiusSmall: i,
      borderRadiusMedium: i,
      borderRadiusLarge: i,
      fontSizeTiny: l,
      fontSizeSmall: s,
      fontSizeMedium: a,
      fontSizeLarge: d,
      opacityDisabled: c,
      colorOpacitySecondary: "0.16",
      colorOpacitySecondaryHover: "0.22",
      colorOpacitySecondaryPressed: "0.28",
      colorSecondary: ue,
      colorSecondaryHover: le,
      colorSecondaryPressed: X,
      colorTertiary: ue,
      colorTertiaryHover: le,
      colorTertiaryPressed: X,
      colorQuaternary: "#0000",
      colorQuaternaryHover: le,
      colorQuaternaryPressed: X,
      color: "#0000",
      colorHover: "#0000",
      colorPressed: "#0000",
      colorFocus: "#0000",
      colorDisabled: "#0000",
      textColor: u,
      textColorTertiary: f,
      textColorHover: p,
      textColorPressed: h,
      textColorFocus: p,
      textColorDisabled: u,
      textColorText: u,
      textColorTextHover: p,
      textColorTextPressed: h,
      textColorTextFocus: p,
      textColorTextDisabled: u,
      textColorGhost: u,
      textColorGhostHover: p,
      textColorGhostPressed: h,
      textColorGhostFocus: p,
      textColorGhostDisabled: u,
      border: `1px solid ${g}`,
      borderHover: `1px solid ${p}`,
      borderPressed: `1px solid ${h}`,
      borderFocus: `1px solid ${p}`,
      borderDisabled: `1px solid ${g}`,
      rippleColor: C,
      colorPrimary: C,
      colorHoverPrimary: p,
      colorPressedPrimary: h,
      colorFocusPrimary: p,
      colorDisabledPrimary: C,
      textColorPrimary: x,
      textColorHoverPrimary: x,
      textColorPressedPrimary: x,
      textColorFocusPrimary: x,
      textColorDisabledPrimary: x,
      textColorTextPrimary: C,
      textColorTextHoverPrimary: p,
      textColorTextPressedPrimary: h,
      textColorTextFocusPrimary: p,
      textColorTextDisabledPrimary: u,
      textColorGhostPrimary: C,
      textColorGhostHoverPrimary: p,
      textColorGhostPressedPrimary: h,
      textColorGhostFocusPrimary: p,
      textColorGhostDisabledPrimary: C,
      borderPrimary: `1px solid ${C}`,
      borderHoverPrimary: `1px solid ${p}`,
      borderPressedPrimary: `1px solid ${h}`,
      borderFocusPrimary: `1px solid ${p}`,
      borderDisabledPrimary: `1px solid ${C}`,
      rippleColorPrimary: C,
      colorInfo: y,
      colorHoverInfo: _,
      colorPressedInfo: A,
      colorFocusInfo: _,
      colorDisabledInfo: y,
      textColorInfo: x,
      textColorHoverInfo: x,
      textColorPressedInfo: x,
      textColorFocusInfo: x,
      textColorDisabledInfo: x,
      textColorTextInfo: y,
      textColorTextHoverInfo: _,
      textColorTextPressedInfo: A,
      textColorTextFocusInfo: _,
      textColorTextDisabledInfo: u,
      textColorGhostInfo: y,
      textColorGhostHoverInfo: _,
      textColorGhostPressedInfo: A,
      textColorGhostFocusInfo: _,
      textColorGhostDisabledInfo: y,
      borderInfo: `1px solid ${y}`,
      borderHoverInfo: `1px solid ${_}`,
      borderPressedInfo: `1px solid ${A}`,
      borderFocusInfo: `1px solid ${_}`,
      borderDisabledInfo: `1px solid ${y}`,
      rippleColorInfo: y,
      colorSuccess: E,
      colorHoverSuccess: R,
      colorPressedSuccess: w,
      colorFocusSuccess: R,
      colorDisabledSuccess: E,
      textColorSuccess: x,
      textColorHoverSuccess: x,
      textColorPressedSuccess: x,
      textColorFocusSuccess: x,
      textColorDisabledSuccess: x,
      textColorTextSuccess: E,
      textColorTextHoverSuccess: R,
      textColorTextPressedSuccess: w,
      textColorTextFocusSuccess: R,
      textColorTextDisabledSuccess: u,
      textColorGhostSuccess: E,
      textColorGhostHoverSuccess: R,
      textColorGhostPressedSuccess: w,
      textColorGhostFocusSuccess: R,
      textColorGhostDisabledSuccess: E,
      borderSuccess: `1px solid ${E}`,
      borderHoverSuccess: `1px solid ${R}`,
      borderPressedSuccess: `1px solid ${w}`,
      borderFocusSuccess: `1px solid ${R}`,
      borderDisabledSuccess: `1px solid ${E}`,
      rippleColorSuccess: E,
      colorWarning: b,
      colorHoverWarning: S,
      colorPressedWarning: I,
      colorFocusWarning: S,
      colorDisabledWarning: b,
      textColorWarning: x,
      textColorHoverWarning: x,
      textColorPressedWarning: x,
      textColorFocusWarning: x,
      textColorDisabledWarning: x,
      textColorTextWarning: b,
      textColorTextHoverWarning: S,
      textColorTextPressedWarning: I,
      textColorTextFocusWarning: S,
      textColorTextDisabledWarning: u,
      textColorGhostWarning: b,
      textColorGhostHoverWarning: S,
      textColorGhostPressedWarning: I,
      textColorGhostFocusWarning: S,
      textColorGhostDisabledWarning: b,
      borderWarning: `1px solid ${b}`,
      borderHoverWarning: `1px solid ${S}`,
      borderPressedWarning: `1px solid ${I}`,
      borderFocusWarning: `1px solid ${S}`,
      borderDisabledWarning: `1px solid ${b}`,
      rippleColorWarning: b,
      colorError: D,
      colorHoverError: H,
      colorPressedError: N,
      colorFocusError: H,
      colorDisabledError: D,
      textColorError: x,
      textColorHoverError: x,
      textColorPressedError: x,
      textColorFocusError: x,
      textColorDisabledError: x,
      textColorTextError: D,
      textColorTextHoverError: H,
      textColorTextPressedError: N,
      textColorTextFocusError: H,
      textColorTextDisabledError: u,
      textColorGhostError: D,
      textColorGhostHoverError: H,
      textColorGhostPressedError: N,
      textColorGhostFocusError: H,
      textColorGhostDisabledError: D,
      borderError: `1px solid ${D}`,
      borderHoverError: `1px solid ${H}`,
      borderPressedError: `1px solid ${N}`,
      borderFocusError: `1px solid ${H}`,
      borderDisabledError: `1px solid ${D}`,
      rippleColorError: D,
      waveOpacity: "0.6",
      fontWeight: ae,
      fontWeightStrong: Y
    });
  }
  let yt, IS, zS, HS;
  En = {
    name: "Button",
    common: Ie,
    self: Wf
  };
  yt = {
    name: "Button",
    common: k,
    self(e) {
      const t = Wf(e);
      return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
    }
  };
  IS = M([
    te("button", `
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
 `, [
      ne("color", [
        re("border", {
          borderColor: "var(--n-border-color)"
        }),
        ne("disabled", [
          re("border", {
            borderColor: "var(--n-border-color-disabled)"
          })
        ]),
        Hl("disabled", [
          M("&:focus", [
            re("state-border", {
              borderColor: "var(--n-border-color-focus)"
            })
          ]),
          M("&:hover", [
            re("state-border", {
              borderColor: "var(--n-border-color-hover)"
            })
          ]),
          M("&:active", [
            re("state-border", {
              borderColor: "var(--n-border-color-pressed)"
            })
          ]),
          ne("pressed", [
            re("state-border", {
              borderColor: "var(--n-border-color-pressed)"
            })
          ])
        ])
      ]),
      ne("disabled", {
        backgroundColor: "var(--n-color-disabled)",
        color: "var(--n-text-color-disabled)"
      }, [
        re("border", {
          border: "var(--n-border-disabled)"
        })
      ]),
      Hl("disabled", [
        M("&:focus", {
          backgroundColor: "var(--n-color-focus)",
          color: "var(--n-text-color-focus)"
        }, [
          re("state-border", {
            border: "var(--n-border-focus)"
          })
        ]),
        M("&:hover", {
          backgroundColor: "var(--n-color-hover)",
          color: "var(--n-text-color-hover)"
        }, [
          re("state-border", {
            border: "var(--n-border-hover)"
          })
        ]),
        M("&:active", {
          backgroundColor: "var(--n-color-pressed)",
          color: "var(--n-text-color-pressed)"
        }, [
          re("state-border", {
            border: "var(--n-border-pressed)"
          })
        ]),
        ne("pressed", {
          backgroundColor: "var(--n-color-pressed)",
          color: "var(--n-text-color-pressed)"
        }, [
          re("state-border", {
            border: "var(--n-border-pressed)"
          })
        ])
      ]),
      ne("loading", "cursor: wait;"),
      te("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [
        ne("active", {
          zIndex: 1,
          animationName: "button-wave-spread, button-wave-opacity"
        })
      ]),
      yn && "MozBoxSizing" in document.createElement("div").style ? M("&::moz-focus-inner", {
        border: 0
      }) : null,
      re("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),
      re("border", `
 border: var(--n-border);
 `),
      re("state-border", `
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),
      re("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [
        te("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [
          ci({
            top: "50%",
            originalTransform: "translateY(-50%)"
          })
        ]),
        rS()
      ]),
      re("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [
        M("~", [
          re("icon", {
            margin: "var(--n-icon-margin)",
            marginRight: 0
          })
        ])
      ]),
      ne("block", `
 display: flex;
 width: 100%;
 `),
      ne("dashed", [
        re("border, state-border", {
          borderStyle: "dashed !important"
        })
      ]),
      ne("disabled", {
        cursor: "not-allowed",
        opacity: "var(--n-opacity-disabled)"
      })
    ]),
    M("@keyframes button-wave-spread", {
      from: {
        boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
      },
      to: {
        boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
      }
    }),
    M("@keyframes button-wave-opacity", {
      from: {
        opacity: "var(--n-wave-opacity)"
      },
      to: {
        opacity: 0
      }
    })
  ]);
  zS = Object.assign(Object.assign({}, gt.props), {
    color: String,
    textColor: String,
    text: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    circle: Boolean,
    size: String,
    ghost: Boolean,
    round: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
    quaternary: Boolean,
    strong: Boolean,
    focusable: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "default"
    },
    dashed: Boolean,
    renderIcon: Function,
    iconPlacement: {
      type: String,
      default: "left"
    },
    attrType: {
      type: String,
      default: "button"
    },
    bordered: {
      type: Boolean,
      default: true
    },
    onClick: [
      Function,
      Array
    ],
    nativeFocusBehavior: {
      type: Boolean,
      default: !gS
    },
    spinProps: Object
  });
  Nl = we({
    name: "Button",
    props: zS,
    slots: Object,
    setup(e) {
      const t = de(null), o = de(null), r = de(false), n = Bl(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = Ee($S, {}), { inlineThemeDisabled: l, mergedClsPrefixRef: s, mergedRtlRef: a, mergedComponentPropsRef: d } = bo(e), { mergedSizeRef: c } = _0({}, {
        defaultSize: "medium",
        mergedSize: (E) => {
          var R, w;
          const { size: b } = e;
          if (b) return b;
          const { size: S } = i;
          if (S) return S;
          const { mergedSize: I } = E || {};
          if (I) return I.value;
          const D = (w = (R = d == null ? void 0 : d.value) === null || R === void 0 ? void 0 : R.Button) === null || w === void 0 ? void 0 : w.size;
          return D || "medium";
        }
      }), u = Q(() => e.focusable && !e.disabled), f = (E) => {
        var R;
        u.value || E.preventDefault(), !e.nativeFocusBehavior && (E.preventDefault(), !e.disabled && u.value && ((R = t.value) === null || R === void 0 || R.focus({
          preventScroll: true
        })));
      }, p = (E) => {
        var R;
        if (!e.disabled && !e.loading) {
          const { onClick: w } = e;
          w && Go(w, E), e.text || (R = o.value) === null || R === void 0 || R.play();
        }
      }, h = (E) => {
        switch (E.key) {
          case "Enter":
            if (!e.keyboard) return;
            r.value = false;
        }
      }, g = (E) => {
        switch (E.key) {
          case "Enter":
            if (!e.keyboard || e.loading) {
              E.preventDefault();
              return;
            }
            r.value = true;
        }
      }, C = () => {
        r.value = false;
      }, x = gt("Button", "-button", IS, En, e, s), y = Ar("Button", a, s), _ = Q(() => {
        const E = x.value, { common: { cubicBezierEaseInOut: R, cubicBezierEaseOut: w }, self: b } = E, { rippleDuration: S, opacityDisabled: I, fontWeight: D, fontWeightStrong: H } = b, N = c.value, { dashed: ae, type: ue, ghost: le, text: X, color: Y, round: _e, circle: Ae, textColor: Ce, secondary: ze, tertiary: Qe, quaternary: Ue, strong: ct } = e, ke = {
          "--n-font-weight": ct ? H : D
        };
        let $ = {
          "--n-color": "initial",
          "--n-color-hover": "initial",
          "--n-color-pressed": "initial",
          "--n-color-focus": "initial",
          "--n-color-disabled": "initial",
          "--n-ripple-color": "initial",
          "--n-text-color": "initial",
          "--n-text-color-hover": "initial",
          "--n-text-color-pressed": "initial",
          "--n-text-color-focus": "initial",
          "--n-text-color-disabled": "initial"
        };
        const Z = ue === "tertiary", U = ue === "default", j = Z ? "default" : ue;
        if (X) {
          const z = Ce || Y;
          $ = {
            "--n-color": "#0000",
            "--n-color-hover": "#0000",
            "--n-color-pressed": "#0000",
            "--n-color-focus": "#0000",
            "--n-color-disabled": "#0000",
            "--n-ripple-color": "#0000",
            "--n-text-color": z || b[he("textColorText", j)],
            "--n-text-color-hover": z ? Lo(z) : b[he("textColorTextHover", j)],
            "--n-text-color-pressed": z ? Dn(z) : b[he("textColorTextPressed", j)],
            "--n-text-color-focus": z ? Lo(z) : b[he("textColorTextHover", j)],
            "--n-text-color-disabled": z || b[he("textColorTextDisabled", j)]
          };
        } else if (le || ae) {
          const z = Ce || Y;
          $ = {
            "--n-color": "#0000",
            "--n-color-hover": "#0000",
            "--n-color-pressed": "#0000",
            "--n-color-focus": "#0000",
            "--n-color-disabled": "#0000",
            "--n-ripple-color": Y || b[he("rippleColor", j)],
            "--n-text-color": z || b[he("textColorGhost", j)],
            "--n-text-color-hover": z ? Lo(z) : b[he("textColorGhostHover", j)],
            "--n-text-color-pressed": z ? Dn(z) : b[he("textColorGhostPressed", j)],
            "--n-text-color-focus": z ? Lo(z) : b[he("textColorGhostHover", j)],
            "--n-text-color-disabled": z || b[he("textColorGhostDisabled", j)]
          };
        } else if (ze) {
          const z = U ? b.textColor : Z ? b.textColorTertiary : b[he("color", j)], J = Y || z, q = ue !== "default" && ue !== "tertiary";
          $ = {
            "--n-color": q ? G(J, {
              alpha: Number(b.colorOpacitySecondary)
            }) : b.colorSecondary,
            "--n-color-hover": q ? G(J, {
              alpha: Number(b.colorOpacitySecondaryHover)
            }) : b.colorSecondaryHover,
            "--n-color-pressed": q ? G(J, {
              alpha: Number(b.colorOpacitySecondaryPressed)
            }) : b.colorSecondaryPressed,
            "--n-color-focus": q ? G(J, {
              alpha: Number(b.colorOpacitySecondaryHover)
            }) : b.colorSecondaryHover,
            "--n-color-disabled": b.colorSecondary,
            "--n-ripple-color": "#0000",
            "--n-text-color": J,
            "--n-text-color-hover": J,
            "--n-text-color-pressed": J,
            "--n-text-color-focus": J,
            "--n-text-color-disabled": J
          };
        } else if (Qe || Ue) {
          const z = U ? b.textColor : Z ? b.textColorTertiary : b[he("color", j)], J = Y || z;
          Qe ? ($["--n-color"] = b.colorTertiary, $["--n-color-hover"] = b.colorTertiaryHover, $["--n-color-pressed"] = b.colorTertiaryPressed, $["--n-color-focus"] = b.colorSecondaryHover, $["--n-color-disabled"] = b.colorTertiary) : ($["--n-color"] = b.colorQuaternary, $["--n-color-hover"] = b.colorQuaternaryHover, $["--n-color-pressed"] = b.colorQuaternaryPressed, $["--n-color-focus"] = b.colorQuaternaryHover, $["--n-color-disabled"] = b.colorQuaternary), $["--n-ripple-color"] = "#0000", $["--n-text-color"] = J, $["--n-text-color-hover"] = J, $["--n-text-color-pressed"] = J, $["--n-text-color-focus"] = J, $["--n-text-color-disabled"] = J;
        } else $ = {
          "--n-color": Y || b[he("color", j)],
          "--n-color-hover": Y ? Lo(Y) : b[he("colorHover", j)],
          "--n-color-pressed": Y ? Dn(Y) : b[he("colorPressed", j)],
          "--n-color-focus": Y ? Lo(Y) : b[he("colorFocus", j)],
          "--n-color-disabled": Y || b[he("colorDisabled", j)],
          "--n-ripple-color": Y || b[he("rippleColor", j)],
          "--n-text-color": Ce || (Y ? b.textColorPrimary : Z ? b.textColorTertiary : b[he("textColor", j)]),
          "--n-text-color-hover": Ce || (Y ? b.textColorHoverPrimary : b[he("textColorHover", j)]),
          "--n-text-color-pressed": Ce || (Y ? b.textColorPressedPrimary : b[he("textColorPressed", j)]),
          "--n-text-color-focus": Ce || (Y ? b.textColorFocusPrimary : b[he("textColorFocus", j)]),
          "--n-text-color-disabled": Ce || (Y ? b.textColorDisabledPrimary : b[he("textColorDisabled", j)])
        };
        let be = {
          "--n-border": "initial",
          "--n-border-hover": "initial",
          "--n-border-pressed": "initial",
          "--n-border-focus": "initial",
          "--n-border-disabled": "initial"
        };
        X ? be = {
          "--n-border": "none",
          "--n-border-hover": "none",
          "--n-border-pressed": "none",
          "--n-border-focus": "none",
          "--n-border-disabled": "none"
        } : be = {
          "--n-border": b[he("border", j)],
          "--n-border-hover": b[he("borderHover", j)],
          "--n-border-pressed": b[he("borderPressed", j)],
          "--n-border-focus": b[he("borderFocus", j)],
          "--n-border-disabled": b[he("borderDisabled", j)]
        };
        const { [he("height", N)]: m, [he("fontSize", N)]: v, [he("padding", N)]: P, [he("paddingRound", N)]: O, [he("iconSize", N)]: F, [he("borderRadius", N)]: B, [he("iconMargin", N)]: K, waveOpacity: V } = b, W = {
          "--n-width": Ae && !X ? m : "initial",
          "--n-height": X ? "initial" : m,
          "--n-font-size": v,
          "--n-padding": Ae || X ? "initial" : _e ? O : P,
          "--n-icon-size": F,
          "--n-icon-margin": K,
          "--n-border-radius": X ? "initial" : Ae || _e ? m : B
        };
        return Object.assign(Object.assign(Object.assign(Object.assign({
          "--n-bezier": R,
          "--n-bezier-ease-out": w,
          "--n-ripple-duration": S,
          "--n-opacity-disabled": I,
          "--n-wave-opacity": V
        }, ke), $), be), W);
      }), A = l ? or("button", Q(() => {
        let E = "";
        const { dashed: R, type: w, ghost: b, text: S, color: I, round: D, circle: H, textColor: N, secondary: ae, tertiary: ue, quaternary: le, strong: X } = e;
        R && (E += "a"), b && (E += "b"), S && (E += "c"), D && (E += "d"), H && (E += "e"), ae && (E += "f"), ue && (E += "g"), le && (E += "h"), X && (E += "i"), I && (E += `j${hc(I)}`), N && (E += `k${hc(N)}`);
        const { value: Y } = c;
        return E += `l${Y[0]}`, E += `m${w[0]}`, E;
      }), _, e) : void 0;
      return {
        selfElRef: t,
        waveElRef: o,
        mergedClsPrefix: s,
        mergedFocusable: u,
        mergedSize: c,
        showBorder: n,
        enterPressed: r,
        rtlEnabled: y,
        handleMousedown: f,
        handleKeydown: g,
        handleBlur: C,
        handleKeyup: h,
        handleClick: p,
        customColorCssVars: Q(() => {
          const { color: E } = e;
          if (!E) return null;
          const R = Lo(E);
          return {
            "--n-border-color": E,
            "--n-border-color-hover": R,
            "--n-border-color-pressed": Dn(E),
            "--n-border-color-focus": R,
            "--n-border-color-disabled": E
          };
        }),
        cssVars: l ? void 0 : _,
        themeClass: A == null ? void 0 : A.themeClass,
        onRender: A == null ? void 0 : A.onRender
      };
    },
    render() {
      const { mergedClsPrefix: e, tag: t, onRender: o } = this;
      o == null ? void 0 : o();
      const r = Ht(this.$slots.default, (n) => n && T("span", {
        class: `${e}-button__content`
      }, n));
      return T(t, {
        ref: "selfElRef",
        class: [
          this.themeClass,
          `${e}-button`,
          `${e}-button--${this.type}-type`,
          `${e}-button--${this.mergedSize}-type`,
          this.rtlEnabled && `${e}-button--rtl`,
          this.disabled && `${e}-button--disabled`,
          this.block && `${e}-button--block`,
          this.enterPressed && `${e}-button--pressed`,
          !this.text && this.dashed && `${e}-button--dashed`,
          this.color && `${e}-button--color`,
          this.secondary && `${e}-button--secondary`,
          this.loading && `${e}-button--loading`,
          this.ghost && `${e}-button--ghost`
        ],
        tabindex: this.mergedFocusable ? 0 : -1,
        type: this.attrType,
        style: this.cssVars,
        disabled: this.disabled,
        onClick: this.handleClick,
        onBlur: this.handleBlur,
        onMousedown: this.handleMousedown,
        onKeyup: this.handleKeyup,
        onKeydown: this.handleKeydown
      }, this.iconPlacement === "right" && r, T(Rf, {
        width: true
      }, {
        default: () => Ht(this.$slots.icon, (n) => (this.loading || this.renderIcon || n) && T("span", {
          class: `${e}-button__icon`,
          style: {
            margin: E0(this.$slots.default) ? "0" : ""
          }
        }, T(Ss, null, {
          default: () => this.loading ? T($f, Object.assign({
            clsPrefix: e,
            key: "loading",
            class: `${e}-icon-slot`,
            strokeWidth: 20
          }, this.spinProps)) : T("div", {
            key: "icon",
            class: `${e}-icon-slot`,
            role: "none"
          }, this.renderIcon ? this.renderIcon() : n)
        })))
      }), this.iconPlacement === "left" && r, this.text ? null : T(iS, {
        ref: "waveElRef",
        clsPrefix: e
      }), this.showBorder ? T("div", {
        "aria-hidden": true,
        class: `${e}-button__border`,
        style: this.customColorCssVars
      }) : null, this.showBorder ? T("div", {
        "aria-hidden": true,
        class: `${e}-button__state-border`,
        style: this.customColorCssVars
      }) : null);
    }
  });
  nP = Nl;
  HS = {
    titleFontSize: "22px"
  };
  function OS(e) {
    const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: s, fontWeightStrong: a, primaryColor: d, baseColor: c, hoverColor: u, cardColor: f, modalColor: p, popoverColor: h } = e;
    return Object.assign(Object.assign({}, HS), {
      borderRadius: t,
      borderColor: oe(f, s),
      borderColorModal: oe(p, s),
      borderColorPopover: oe(h, s),
      textColor: n,
      titleFontWeight: a,
      titleTextColor: i,
      dayTextColor: l,
      fontSize: o,
      lineHeight: r,
      dateColorCurrent: d,
      dateTextColorCurrent: c,
      cellColorHover: oe(f, u),
      cellColorHoverModal: oe(p, u),
      cellColorHoverPopover: oe(h, u),
      cellColor: f,
      cellColorModal: p,
      cellColorPopover: h,
      barColor: d
    });
  }
  const BS = {
    name: "Calendar",
    common: k,
    peers: {
      Button: yt
    },
    self: OS
  }, FS = {
    paddingSmall: "12px 16px 12px",
    paddingMedium: "19px 24px 20px",
    paddingLarge: "23px 32px 24px",
    paddingHuge: "27px 40px 28px",
    titleFontSizeSmall: "16px",
    titleFontSizeMedium: "18px",
    titleFontSizeLarge: "18px",
    titleFontSizeHuge: "18px",
    closeIconSize: "18px",
    closeSize: "22px"
  };
  function Nf(e) {
    const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: s, dividerColor: a, fontWeightStrong: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: f, closeColorHover: p, closeColorPressed: h, modalColor: g, boxShadow1: C, popoverColor: x, actionColor: y } = e;
    return Object.assign(Object.assign({}, FS), {
      lineHeight: r,
      color: i,
      colorModal: g,
      colorPopover: x,
      colorTarget: t,
      colorEmbedded: y,
      colorEmbeddedModal: y,
      colorEmbeddedPopover: y,
      textColor: l,
      titleTextColor: s,
      borderColor: a,
      actionColor: y,
      titleFontWeight: d,
      closeColorHover: p,
      closeColorPressed: h,
      closeBorderRadius: o,
      closeIconColor: c,
      closeIconColorHover: u,
      closeIconColorPressed: f,
      fontSizeSmall: n,
      fontSizeMedium: n,
      fontSizeLarge: n,
      fontSizeHuge: n,
      boxShadow: C,
      borderRadius: o
    });
  }
  let Vf, Gf, Mc, MS, $s, DS, LS;
  Vf = {
    name: "Card",
    common: Ie,
    self: Nf
  };
  Gf = {
    name: "Card",
    common: k,
    self(e) {
      const t = Nf(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
      return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
    }
  };
  Mc = te("card-content", `
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`);
  MS = M([
    te("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [
      zu({
        background: "var(--n-color-modal)"
      }),
      ne("hoverable", [
        M("&:hover", "box-shadow: var(--n-box-shadow);")
      ]),
      ne("content-segmented", [
        M(">", [
          te("card-content", `
 padding-top: var(--n-padding-bottom);
 `),
          re("content-scrollbar", [
            M(">", [
              te("scrollbar-container", [
                M(">", [
                  te("card-content", `
 padding-top: var(--n-padding-bottom);
 `)
                ])
              ])
            ])
          ])
        ])
      ]),
      ne("content-soft-segmented", [
        M(">", [
          te("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),
          re("content-scrollbar", [
            M(">", [
              te("scrollbar-container", [
                M(">", [
                  te("card-content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)
                ])
              ])
            ])
          ])
        ])
      ]),
      ne("footer-segmented", [
        M(">", [
          re("footer", `
 padding-top: var(--n-padding-bottom);
 `)
        ])
      ]),
      ne("footer-soft-segmented", [
        M(">", [
          re("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)
        ])
      ]),
      M(">", [
        te("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [
          re("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),
          re("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),
          re("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)
        ]),
        re("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),
        Mc,
        te("card-content", [
          M("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)
        ]),
        re("content-scrollbar", `
 display: flex;
 flex-direction: column;
 `, [
          M(">", [
            te("scrollbar-container", [
              M(">", [
                Mc
              ])
            ])
          ]),
          M("&:first-child >", [
            te("scrollbar-container", [
              M(">", [
                te("card-content", `
 padding-top: var(--n-padding-bottom);
 `)
              ])
            ])
          ])
        ]),
        re("footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [
          M("&:first-child", `
 padding-top: var(--n-padding-bottom);
 `)
        ]),
        re("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)
      ]),
      te("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [
        M("img", `
 display: block;
 width: 100%;
 `)
      ]),
      ne("bordered", `
 border: 1px solid var(--n-border-color);
 `, [
        M("&:target", "border-color: var(--n-color-target);")
      ]),
      ne("action-segmented", [
        M(">", [
          re("action", [
            M("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)
          ])
        ])
      ]),
      ne("content-segmented, content-soft-segmented", [
        M(">", [
          te("card-content", `
 transition: border-color 0.3s var(--n-bezier);
 `, [
            M("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)
          ]),
          re("content-scrollbar", `
 transition: border-color 0.3s var(--n-bezier);
 `, [
            M("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)
          ])
        ])
      ]),
      ne("footer-segmented, footer-soft-segmented", [
        M(">", [
          re("footer", `
 transition: border-color 0.3s var(--n-bezier);
 `, [
            M("&:not(:first-child)", `
 border-top: 1px solid var(--n-border-color);
 `)
          ])
        ])
      ]),
      ne("embedded", `
 background-color: var(--n-color-embedded);
 `)
    ]),
    Iu(te("card", `
 background: var(--n-color-modal);
 `, [
      ne("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)
    ])),
    hv(te("card", `
 background: var(--n-color-popover);
 `, [
      ne("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)
    ]))
  ]);
  $s = {
    title: [
      String,
      Function
    ],
    contentClass: String,
    contentStyle: [
      Object,
      String
    ],
    contentScrollable: Boolean,
    headerClass: String,
    headerStyle: [
      Object,
      String
    ],
    headerExtraClass: String,
    headerExtraStyle: [
      Object,
      String
    ],
    footerClass: String,
    footerStyle: [
      Object,
      String
    ],
    embedded: Boolean,
    segmented: {
      type: [
        Boolean,
        Object
      ],
      default: false
    },
    size: String,
    bordered: {
      type: Boolean,
      default: true
    },
    closable: Boolean,
    hoverable: Boolean,
    role: String,
    onClose: [
      Function,
      Array
    ],
    tag: {
      type: String,
      default: "div"
    },
    cover: Function,
    content: [
      String,
      Function
    ],
    footer: Function,
    action: Function,
    headerExtra: Function,
    closeFocusable: Boolean
  };
  DS = Ii($s);
  LS = Object.assign(Object.assign({}, gt.props), $s);
  kS = we({
    name: "Card",
    props: LS,
    slots: Object,
    setup(e) {
      const t = () => {
        const { onClose: u } = e;
        u && Go(u);
      }, { inlineThemeDisabled: o, mergedClsPrefixRef: r, mergedRtlRef: n, mergedComponentPropsRef: i } = bo(e), l = gt("Card", "-card", MS, Vf, e, r), s = Ar("Card", n, r), a = Q(() => {
        var u, f;
        return e.size || ((f = (u = i == null ? void 0 : i.value) === null || u === void 0 ? void 0 : u.Card) === null || f === void 0 ? void 0 : f.size) || "medium";
      }), d = Q(() => {
        const u = a.value, { self: { color: f, colorModal: p, colorTarget: h, textColor: g, titleTextColor: C, titleFontWeight: x, borderColor: y, actionColor: _, borderRadius: A, lineHeight: E, closeIconColor: R, closeIconColorHover: w, closeIconColorPressed: b, closeColorHover: S, closeColorPressed: I, closeBorderRadius: D, closeIconSize: H, closeSize: N, boxShadow: ae, colorPopover: ue, colorEmbedded: le, colorEmbeddedModal: X, colorEmbeddedPopover: Y, [he("padding", u)]: _e, [he("fontSize", u)]: Ae, [he("titleFontSize", u)]: Ce }, common: { cubicBezierEaseInOut: ze } } = l.value, { top: Qe, left: Ue, bottom: ct } = $o(_e);
        return {
          "--n-bezier": ze,
          "--n-border-radius": A,
          "--n-color": f,
          "--n-color-modal": p,
          "--n-color-popover": ue,
          "--n-color-embedded": le,
          "--n-color-embedded-modal": X,
          "--n-color-embedded-popover": Y,
          "--n-color-target": h,
          "--n-text-color": g,
          "--n-line-height": E,
          "--n-action-color": _,
          "--n-title-text-color": C,
          "--n-title-font-weight": x,
          "--n-close-icon-color": R,
          "--n-close-icon-color-hover": w,
          "--n-close-icon-color-pressed": b,
          "--n-close-color-hover": S,
          "--n-close-color-pressed": I,
          "--n-border-color": y,
          "--n-box-shadow": ae,
          "--n-padding-top": Qe,
          "--n-padding-bottom": ct,
          "--n-padding-left": Ue,
          "--n-font-size": Ae,
          "--n-title-font-size": Ce,
          "--n-close-size": N,
          "--n-close-icon-size": H,
          "--n-close-border-radius": D
        };
      }), c = o ? or("card", Q(() => a.value[0]), d, e) : void 0;
      return {
        rtlEnabled: s,
        mergedClsPrefix: r,
        mergedTheme: l,
        handleCloseClick: t,
        cssVars: o ? void 0 : d,
        themeClass: c == null ? void 0 : c.themeClass,
        onRender: c == null ? void 0 : c.onRender
      };
    },
    render() {
      const { segmented: e, bordered: t, hoverable: o, mergedClsPrefix: r, rtlEnabled: n, onRender: i, embedded: l, tag: s, $slots: a } = this;
      return i == null ? void 0 : i(), T(s, {
        class: [
          `${r}-card`,
          this.themeClass,
          l && `${r}-card--embedded`,
          {
            [`${r}-card--rtl`]: n,
            [`${r}-card--content-scrollable`]: this.contentScrollable,
            [`${r}-card--content${typeof e != "boolean" && e.content === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.content,
            [`${r}-card--footer${typeof e != "boolean" && e.footer === "soft" ? "-soft" : ""}-segmented`]: e === true || e !== false && e.footer,
            [`${r}-card--action-segmented`]: e === true || e !== false && e.action,
            [`${r}-card--bordered`]: t,
            [`${r}-card--hoverable`]: o
          }
        ],
        style: this.cssVars,
        role: this.role
      }, Ht(a.cover, (d) => {
        const c = this.cover ? zt([
          this.cover()
        ]) : d;
        return c && T("div", {
          class: `${r}-card-cover`,
          role: "none"
        }, c);
      }), Ht(a.header, (d) => {
        const { title: c } = this, u = c ? zt(typeof c == "function" ? [
          c()
        ] : [
          c
        ]) : d;
        return u || this.closable ? T("div", {
          class: [
            `${r}-card-header`,
            this.headerClass
          ],
          style: this.headerStyle,
          role: "heading"
        }, T("div", {
          class: `${r}-card-header__main`,
          role: "heading"
        }, u), Ht(a["header-extra"], (f) => {
          const p = this.headerExtra ? zt([
            this.headerExtra()
          ]) : f;
          return p && T("div", {
            class: [
              `${r}-card-header__extra`,
              this.headerExtraClass
            ],
            style: this.headerExtraStyle
          }, p);
        }), this.closable && T(Mi, {
          clsPrefix: r,
          class: `${r}-card-header__close`,
          onClick: this.handleCloseClick,
          focusable: this.closeFocusable,
          absolute: true
        })) : null;
      }), Ht(a.default, (d) => {
        const { content: c } = this, u = c ? zt(typeof c == "function" ? [
          c()
        ] : [
          c
        ]) : d;
        return u ? this.contentScrollable ? T(Di, {
          class: `${r}-card__content-scrollbar`,
          contentClass: [
            `${r}-card-content`,
            this.contentClass
          ],
          contentStyle: this.contentStyle
        }, u) : T("div", {
          class: [
            `${r}-card-content`,
            this.contentClass
          ],
          style: this.contentStyle,
          role: "none"
        }, u) : null;
      }), Ht(a.footer, (d) => {
        const c = this.footer ? zt([
          this.footer()
        ]) : d;
        return c && T("div", {
          class: [
            `${r}-card__footer`,
            this.footerClass
          ],
          style: this.footerStyle,
          role: "none"
        }, c);
      }), Ht(a.action, (d) => {
        const c = this.action ? zt([
          this.action()
        ]) : d;
        return c && T("div", {
          class: `${r}-card__action`,
          role: "none"
        }, c);
      }));
    }
  });
  function jS() {
    return {
      dotSize: "8px",
      dotColor: "rgba(255, 255, 255, .3)",
      dotColorActive: "rgba(255, 255, 255, 1)",
      dotColorFocus: "rgba(255, 255, 255, .5)",
      dotLineWidth: "16px",
      dotLineWidthActive: "24px",
      arrowColor: "#eee"
    };
  }
  const WS = {
    name: "Carousel",
    common: k,
    self: jS
  }, NS = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  };
  function Uf(e) {
    const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: s, primaryColor: a, textColor2: d, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, borderRadiusSmall: p, lineHeight: h } = e;
    return Object.assign(Object.assign({}, NS), {
      labelLineHeight: h,
      fontSizeSmall: c,
      fontSizeMedium: u,
      fontSizeLarge: f,
      borderRadius: p,
      color: t,
      colorChecked: a,
      colorDisabled: o,
      colorDisabledChecked: o,
      colorTableHeader: r,
      colorTableHeaderModal: n,
      colorTableHeaderPopover: i,
      checkMarkColor: t,
      checkMarkColorDisabled: l,
      checkMarkColorDisabledChecked: l,
      border: `1px solid ${s}`,
      borderDisabled: `1px solid ${s}`,
      borderDisabledChecked: `1px solid ${s}`,
      borderChecked: `1px solid ${a}`,
      borderFocus: `1px solid ${a}`,
      boxShadowFocus: `0 0 0 2px ${G(a, {
        alpha: 0.3
      })}`,
      textColor: d,
      textColorDisabled: l
    });
  }
  let Ir;
  VS = {
    name: "Checkbox",
    common: Ie,
    self: Uf
  };
  Ir = {
    name: "Checkbox",
    common: k,
    self(e) {
      const { cardColor: t } = e, o = Uf(e);
      return o.color = "#0000", o.checkMarkColor = t, o;
    }
  };
  function GS(e) {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n, textColor3: i, primaryColor: l, textColorDisabled: s, dividerColor: a, hoverColor: d, fontSizeMedium: c, heightMedium: u } = e;
    return {
      menuBorderRadius: t,
      menuColor: r,
      menuBoxShadow: o,
      menuDividerColor: a,
      menuHeight: "calc(var(--n-option-height) * 6.6)",
      optionArrowColor: i,
      optionHeight: u,
      optionFontSize: c,
      optionColorHover: d,
      optionTextColor: n,
      optionTextColorActive: l,
      optionTextColorDisabled: s,
      optionCheckMarkColor: l,
      loadingColor: l,
      columnWidth: "180px"
    };
  }
  const US = {
    name: "Cascader",
    common: k,
    peers: {
      InternalSelectMenu: Pn,
      InternalSelection: _s,
      Scrollbar: at,
      Checkbox: Ir,
      Empty: Es
    },
    self: GS
  }, Kf = {
    name: "Code",
    common: k,
    self(e) {
      const { textColor2: t, fontSize: o, fontWeightStrong: r, textColor3: n } = e;
      return {
        textColor: t,
        fontSize: o,
        fontWeightStrong: r,
        "mono-3": "#5c6370",
        "hue-1": "#56b6c2",
        "hue-2": "#61aeee",
        "hue-3": "#c678dd",
        "hue-4": "#98c379",
        "hue-5": "#e06c75",
        "hue-5-2": "#be5046",
        "hue-6": "#d19a66",
        "hue-6-2": "#e6c07b",
        lineNumberTextColor: n
      };
    }
  };
  function KS(e) {
    const { fontWeight: t, textColor1: o, textColor2: r, textColorDisabled: n, dividerColor: i, fontSize: l } = e;
    return {
      titleFontSize: l,
      titleFontWeight: t,
      dividerColor: i,
      titleTextColor: o,
      titleTextColorDisabled: n,
      fontSize: l,
      textColor: r,
      arrowColor: r,
      arrowColorDisabled: n,
      itemMargin: "16px 0 0 0",
      titlePadding: "16px 0 0 0"
    };
  }
  const qS = {
    name: "Collapse",
    common: k,
    self: KS
  };
  function XS(e) {
    const { cubicBezierEaseInOut: t } = e;
    return {
      bezier: t
    };
  }
  const YS = {
    name: "CollapseTransition",
    common: k,
    self: XS
  };
  function ZS(e) {
    const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: l, heightSmall: s, heightMedium: a, heightLarge: d, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, dividerColor: p } = e;
    return {
      panelFontSize: t,
      boxShadow: o,
      color: r,
      textColor: n,
      borderRadius: i,
      border: `1px solid ${l}`,
      heightSmall: s,
      heightMedium: a,
      heightLarge: d,
      fontSizeSmall: c,
      fontSizeMedium: u,
      fontSizeLarge: f,
      dividerColor: p
    };
  }
  const QS = {
    name: "ColorPicker",
    common: k,
    peers: {
      Input: _t,
      Button: yt
    },
    self: ZS
  }, JS = {
    abstract: Boolean,
    bordered: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
      type: String,
      default: "div"
    },
    hljs: Object,
    katex: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    preflightStyleDisabled: Boolean,
    styleMountTarget: Object,
    inlineThemeDisabled: {
      type: Boolean,
      default: void 0
    },
    as: {
      type: String,
      validator: () => (hn("config-provider", "`as` is deprecated, please use `tag` instead."), true),
      default: void 0
    }
  }, e1 = we({
    name: "ConfigProvider",
    alias: [
      "App"
    ],
    props: JS,
    setup(e) {
      const t = Ee(ho, null), o = Q(() => {
        const { theme: g } = e;
        if (g === null) return;
        const C = t == null ? void 0 : t.mergedThemeRef.value;
        return g === void 0 ? C : C === void 0 ? g : Object.assign({}, C, g);
      }), r = Q(() => {
        const { themeOverrides: g } = e;
        if (g !== null) {
          if (g === void 0) return t == null ? void 0 : t.mergedThemeOverridesRef.value;
          {
            const C = t == null ? void 0 : t.mergedThemeOverridesRef.value;
            return C === void 0 ? g : Nr({}, C, g);
          }
        }
      }), n = Bl(() => {
        const { namespace: g } = e;
        return g === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : g;
      }), i = Bl(() => {
        const { bordered: g } = e;
        return g === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : g;
      }), l = Q(() => {
        const { icons: g } = e;
        return g === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : g;
      }), s = Q(() => {
        const { componentOptions: g } = e;
        return g !== void 0 ? g : t == null ? void 0 : t.mergedComponentPropsRef.value;
      }), a = Q(() => {
        const { clsPrefix: g } = e;
        return g !== void 0 ? g : t ? t.mergedClsPrefixRef.value : ii;
      }), d = Q(() => {
        var g;
        const { rtl: C } = e;
        if (C === void 0) return t == null ? void 0 : t.mergedRtlRef.value;
        const x = {};
        for (const y of C) x[y.name] = rn(y), (g = y.peers) === null || g === void 0 || g.forEach((_) => {
          _.name in x || (x[_.name] = rn(_));
        });
        return x;
      }), c = Q(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), u = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), f = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), p = e.styleMountTarget || (t == null ? void 0 : t.styleMountTarget), h = Q(() => {
        const { value: g } = o, { value: C } = r, x = C && Object.keys(C).length !== 0, y = g == null ? void 0 : g.name;
        return y ? x ? `${y}-${un(JSON.stringify(r.value))}` : y : x ? un(JSON.stringify(r.value)) : "";
      });
      return tt(ho, {
        mergedThemeHashRef: h,
        mergedBreakpointsRef: c,
        mergedRtlRef: d,
        mergedIconsRef: l,
        mergedComponentPropsRef: s,
        mergedBorderedRef: i,
        mergedNamespaceRef: n,
        mergedClsPrefixRef: a,
        mergedLocaleRef: Q(() => {
          const { locale: g } = e;
          if (g !== null) return g === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : g;
        }),
        mergedDateLocaleRef: Q(() => {
          const { dateLocale: g } = e;
          if (g !== null) return g === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : g;
        }),
        mergedHljsRef: Q(() => {
          const { hljs: g } = e;
          return g === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : g;
        }),
        mergedKatexRef: Q(() => {
          const { katex: g } = e;
          return g === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : g;
        }),
        mergedThemeRef: o,
        mergedThemeOverridesRef: r,
        inlineThemeDisabled: u || false,
        preflightStyleDisabled: f || false,
        styleMountTarget: p
      }), {
        mergedClsPrefix: a,
        mergedBordered: i,
        mergedNamespace: n,
        mergedTheme: o,
        mergedThemeOverrides: r
      };
    },
    render() {
      var e, t, o, r;
      return this.abstract ? (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o) : T(this.as || this.tag, {
        class: `${this.mergedClsPrefix || ii}-config-provider`
      }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
    }
  }), qf = {
    name: "Popselect",
    common: k,
    peers: {
      Popover: ir,
      InternalSelectMenu: Pn
    }
  };
  function t1(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  o1 = {
    name: "Popselect",
    common: Ie,
    peers: {
      Popover: Tn,
      InternalSelectMenu: Ff
    },
    self: t1
  };
  function Xf(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  let Yf, n1;
  r1 = {
    name: "Select",
    common: Ie,
    peers: {
      InternalSelection: oS,
      InternalSelectMenu: Ff
    },
    self: Xf
  };
  Yf = {
    name: "Select",
    common: k,
    peers: {
      InternalSelection: _s,
      InternalSelectMenu: Pn
    },
    self: Xf
  };
  n1 = {
    itemPaddingSmall: "0 4px",
    itemMarginSmall: "0 0 0 8px",
    itemMarginSmallRtl: "0 8px 0 0",
    itemPaddingMedium: "0 4px",
    itemMarginMedium: "0 0 0 8px",
    itemMarginMediumRtl: "0 8px 0 0",
    itemPaddingLarge: "0 4px",
    itemMarginLarge: "0 0 0 8px",
    itemMarginLargeRtl: "0 8px 0 0",
    buttonIconSizeSmall: "14px",
    buttonIconSizeMedium: "16px",
    buttonIconSizeLarge: "18px",
    inputWidthSmall: "60px",
    selectWidthSmall: "unset",
    inputMarginSmall: "0 0 0 8px",
    inputMarginSmallRtl: "0 8px 0 0",
    selectMarginSmall: "0 0 0 8px",
    prefixMarginSmall: "0 8px 0 0",
    suffixMarginSmall: "0 0 0 8px",
    inputWidthMedium: "60px",
    selectWidthMedium: "unset",
    inputMarginMedium: "0 0 0 8px",
    inputMarginMediumRtl: "0 8px 0 0",
    selectMarginMedium: "0 0 0 8px",
    prefixMarginMedium: "0 8px 0 0",
    suffixMarginMedium: "0 0 0 8px",
    inputWidthLarge: "60px",
    selectWidthLarge: "unset",
    inputMarginLarge: "0 0 0 8px",
    inputMarginLargeRtl: "0 8px 0 0",
    selectMarginLarge: "0 0 0 8px",
    prefixMarginLarge: "0 8px 0 0",
    suffixMarginLarge: "0 0 0 8px"
  };
  function Zf(e) {
    const { textColor2: t, primaryColor: o, primaryColorHover: r, primaryColorPressed: n, inputColorDisabled: i, textColorDisabled: l, borderColor: s, borderRadius: a, fontSizeTiny: d, fontSizeSmall: c, fontSizeMedium: u, heightTiny: f, heightSmall: p, heightMedium: h } = e;
    return Object.assign(Object.assign({}, n1), {
      buttonColor: "#0000",
      buttonColorHover: "#0000",
      buttonColorPressed: "#0000",
      buttonBorder: `1px solid ${s}`,
      buttonBorderHover: `1px solid ${s}`,
      buttonBorderPressed: `1px solid ${s}`,
      buttonIconColor: t,
      buttonIconColorHover: t,
      buttonIconColorPressed: t,
      itemTextColor: t,
      itemTextColorHover: r,
      itemTextColorPressed: n,
      itemTextColorActive: o,
      itemTextColorDisabled: l,
      itemColor: "#0000",
      itemColorHover: "#0000",
      itemColorPressed: "#0000",
      itemColorActive: "#0000",
      itemColorActiveHover: "#0000",
      itemColorDisabled: i,
      itemBorder: "1px solid #0000",
      itemBorderHover: "1px solid #0000",
      itemBorderPressed: "1px solid #0000",
      itemBorderActive: `1px solid ${o}`,
      itemBorderDisabled: `1px solid ${s}`,
      itemBorderRadius: a,
      itemSizeSmall: f,
      itemSizeMedium: p,
      itemSizeLarge: h,
      itemFontSizeSmall: d,
      itemFontSizeMedium: c,
      itemFontSizeLarge: u,
      jumperFontSizeSmall: d,
      jumperFontSizeMedium: c,
      jumperFontSizeLarge: u,
      jumperTextColor: t,
      jumperTextColorDisabled: l
    });
  }
  let Qf, l1;
  i1 = {
    name: "Pagination",
    common: Ie,
    peers: {
      Select: r1,
      Input: Rs,
      Popselect: o1
    },
    self: Zf
  };
  Qf = {
    name: "Pagination",
    common: k,
    peers: {
      Select: Yf,
      Input: _t,
      Popselect: qf
    },
    self(e) {
      const { primaryColor: t, opacity3: o } = e, r = G(t, {
        alpha: Number(o)
      }), n = Zf(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  };
  l1 = {
    padding: "4px 0",
    optionIconSizeSmall: "14px",
    optionIconSizeMedium: "16px",
    optionIconSizeLarge: "16px",
    optionIconSizeHuge: "18px",
    optionSuffixWidthSmall: "14px",
    optionSuffixWidthMedium: "14px",
    optionSuffixWidthLarge: "16px",
    optionSuffixWidthHuge: "16px",
    optionIconSuffixWidthSmall: "32px",
    optionIconSuffixWidthMedium: "32px",
    optionIconSuffixWidthLarge: "36px",
    optionIconSuffixWidthHuge: "36px",
    optionPrefixWidthSmall: "14px",
    optionPrefixWidthMedium: "14px",
    optionPrefixWidthLarge: "16px",
    optionPrefixWidthHuge: "16px",
    optionIconPrefixWidthSmall: "36px",
    optionIconPrefixWidthMedium: "36px",
    optionIconPrefixWidthLarge: "40px",
    optionIconPrefixWidthHuge: "40px"
  };
  function Jf(e) {
    const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: s, fontSizeSmall: a, fontSizeMedium: d, fontSizeLarge: c, fontSizeHuge: u, heightSmall: f, heightMedium: p, heightLarge: h, heightHuge: g, textColor3: C, opacityDisabled: x } = e;
    return Object.assign(Object.assign({}, l1), {
      optionHeightSmall: f,
      optionHeightMedium: p,
      optionHeightLarge: h,
      optionHeightHuge: g,
      borderRadius: s,
      fontSizeSmall: a,
      fontSizeMedium: d,
      fontSizeLarge: c,
      fontSizeHuge: u,
      optionTextColor: o,
      optionTextColorHover: o,
      optionTextColorActive: t,
      optionTextColorChildActive: t,
      color: i,
      dividerColor: r,
      suffixColor: o,
      prefixColor: o,
      optionColorHover: n,
      optionColorActive: G(t, {
        alpha: 0.1
      }),
      groupHeaderTextColor: C,
      optionTextColorInverted: "#BBB",
      optionTextColorHoverInverted: "#FFF",
      optionTextColorActiveInverted: "#FFF",
      optionTextColorChildActiveInverted: "#FFF",
      colorInverted: l,
      dividerColorInverted: "#BBB",
      suffixColorInverted: "#BBB",
      prefixColorInverted: "#BBB",
      optionColorHoverInverted: t,
      optionColorActiveInverted: t,
      groupHeaderTextColorInverted: "#AAA",
      optionOpacityDisabled: x
    });
  }
  let As, tp, Li;
  ep = {
    name: "Dropdown",
    common: Ie,
    peers: {
      Popover: Tn
    },
    self: Jf
  };
  As = {
    name: "Dropdown",
    common: k,
    peers: {
      Popover: ir
    },
    self(e) {
      const { primaryColorSuppl: t, primaryColor: o, popoverColor: r } = e, n = Jf(e);
      return n.colorInverted = r, n.optionColorActive = G(o, {
        alpha: 0.15
      }), n.optionColorActiveInverted = t, n.optionColorHoverInverted = t, n;
    }
  };
  tp = {
    padding: "8px 14px"
  };
  Li = {
    name: "Tooltip",
    common: k,
    peers: {
      Popover: ir
    },
    self(e) {
      const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, tp), {
        borderRadius: t,
        boxShadow: o,
        color: r,
        textColor: n
      });
    }
  };
  function s1(e) {
    const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
    return Object.assign(Object.assign({}, tp), {
      borderRadius: t,
      boxShadow: o,
      color: oe(r, "rgba(0, 0, 0, .85)"),
      textColor: r
    });
  }
  let rp, np, ip;
  op = {
    name: "Tooltip",
    common: Ie,
    peers: {
      Popover: Tn
    },
    self: s1
  };
  rp = {
    name: "Ellipsis",
    common: k,
    peers: {
      Tooltip: Li
    }
  };
  a1 = {
    name: "Ellipsis",
    common: Ie,
    peers: {
      Tooltip: op
    }
  };
  np = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  };
  ip = {
    name: "Radio",
    common: k,
    self(e) {
      const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: s, borderRadius: a, fontSizeSmall: d, fontSizeMedium: c, fontSizeLarge: u, heightSmall: f, heightMedium: p, heightLarge: h, lineHeight: g } = e;
      return Object.assign(Object.assign({}, np), {
        labelLineHeight: g,
        buttonHeightSmall: f,
        buttonHeightMedium: p,
        buttonHeightLarge: h,
        fontSizeSmall: d,
        fontSizeMedium: c,
        fontSizeLarge: u,
        boxShadow: `inset 0 0 0 1px ${t}`,
        boxShadowActive: `inset 0 0 0 1px ${o}`,
        boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${G(o, {
          alpha: 0.3
        })}`,
        boxShadowHover: `inset 0 0 0 1px ${o}`,
        boxShadowDisabled: `inset 0 0 0 1px ${t}`,
        color: "#0000",
        colorDisabled: i,
        colorActive: "#0000",
        textColor: l,
        textColorDisabled: n,
        dotColorActive: o,
        dotColorDisabled: t,
        buttonBorderColor: t,
        buttonBorderColorActive: o,
        buttonBorderColorHover: o,
        buttonColor: "#0000",
        buttonColorActive: o,
        buttonTextColor: l,
        buttonTextColorActive: r,
        buttonTextColorHover: o,
        opacityDisabled: s,
        buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${G(o, {
          alpha: 0.3
        })}`,
        buttonBoxShadowHover: `inset 0 0 0 1px ${o}`,
        buttonBoxShadow: "inset 0 0 0 1px #0000",
        buttonBorderRadius: a
      });
    }
  };
  function c1(e) {
    const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: s, borderRadius: a, fontSizeSmall: d, fontSizeMedium: c, fontSizeLarge: u, heightSmall: f, heightMedium: p, heightLarge: h, lineHeight: g } = e;
    return Object.assign(Object.assign({}, np), {
      labelLineHeight: g,
      buttonHeightSmall: f,
      buttonHeightMedium: p,
      buttonHeightLarge: h,
      fontSizeSmall: d,
      fontSizeMedium: c,
      fontSizeLarge: u,
      boxShadow: `inset 0 0 0 1px ${t}`,
      boxShadowActive: `inset 0 0 0 1px ${o}`,
      boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${G(o, {
        alpha: 0.2
      })}`,
      boxShadowHover: `inset 0 0 0 1px ${o}`,
      boxShadowDisabled: `inset 0 0 0 1px ${t}`,
      color: r,
      colorDisabled: i,
      colorActive: "#0000",
      textColor: l,
      textColorDisabled: n,
      dotColorActive: o,
      dotColorDisabled: t,
      buttonBorderColor: t,
      buttonBorderColorActive: o,
      buttonBorderColorHover: t,
      buttonColor: r,
      buttonColorActive: r,
      buttonTextColor: l,
      buttonTextColorActive: o,
      buttonTextColorHover: o,
      opacityDisabled: s,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${G(o, {
        alpha: 0.3
      })}`,
      buttonBoxShadowHover: "inset 0 0 0 1px #0000",
      buttonBoxShadow: "inset 0 0 0 1px #0000",
      buttonBorderRadius: a
    });
  }
  let u1;
  d1 = {
    name: "Radio",
    common: Ie,
    self: c1
  };
  u1 = {
    thPaddingSmall: "8px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "8px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px",
    sorterSize: "15px",
    resizableContainerSize: "8px",
    resizableSize: "2px",
    filterSize: "15px",
    paginationMargin: "12px 0 0 0",
    emptyPadding: "48px 0",
    actionPadding: "8px 12px",
    actionButtonMargin: "0 8px 0 0"
  };
  function lp(e) {
    const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: s, iconColor: a, primaryColor: d, fontWeightStrong: c, borderRadius: u, lineHeight: f, fontSizeSmall: p, fontSizeMedium: h, fontSizeLarge: g, dividerColor: C, heightSmall: x, opacityDisabled: y, tableColorStriped: _ } = e;
    return Object.assign(Object.assign({}, u1), {
      actionDividerColor: C,
      lineHeight: f,
      borderRadius: u,
      fontSizeSmall: p,
      fontSizeMedium: h,
      fontSizeLarge: g,
      borderColor: oe(t, C),
      tdColorHover: oe(t, s),
      tdColorSorting: oe(t, s),
      tdColorStriped: oe(t, _),
      thColor: oe(t, l),
      thColorHover: oe(oe(t, l), s),
      thColorSorting: oe(oe(t, l), s),
      tdColor: t,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: c,
      thButtonColorHover: s,
      thIconColor: a,
      thIconColorActive: d,
      borderColorModal: oe(o, C),
      tdColorHoverModal: oe(o, s),
      tdColorSortingModal: oe(o, s),
      tdColorStripedModal: oe(o, _),
      thColorModal: oe(o, l),
      thColorHoverModal: oe(oe(o, l), s),
      thColorSortingModal: oe(oe(o, l), s),
      tdColorModal: o,
      borderColorPopover: oe(r, C),
      tdColorHoverPopover: oe(r, s),
      tdColorSortingPopover: oe(r, s),
      tdColorStripedPopover: oe(r, _),
      thColorPopover: oe(r, l),
      thColorHoverPopover: oe(oe(r, l), s),
      thColorSortingPopover: oe(oe(r, l), s),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      loadingColor: d,
      loadingSize: x,
      opacityLoading: y
    });
  }
  let f1;
  iP = {
    name: "DataTable",
    common: Ie,
    peers: {
      Button: En,
      Checkbox: VS,
      Radio: d1,
      Pagination: i1,
      Scrollbar: xo,
      Empty: Es,
      Popover: Tn,
      Ellipsis: a1,
      Dropdown: ep
    },
    self: lp
  };
  f1 = {
    name: "DataTable",
    common: k,
    peers: {
      Button: yt,
      Checkbox: Ir,
      Radio: ip,
      Pagination: Qf,
      Scrollbar: at,
      Empty: nr,
      Popover: ir,
      Ellipsis: rp,
      Dropdown: As
    },
    self(e) {
      const t = lp(e);
      return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
    }
  };
  function sp(e) {
    const { textColorBase: t, opacity1: o, opacity2: r, opacity3: n, opacity4: i, opacity5: l } = e;
    return {
      color: t,
      opacity1Depth: o,
      opacity2Depth: r,
      opacity3Depth: n,
      opacity4Depth: i,
      opacity5Depth: l
    };
  }
  let p1, h1;
  lP = {
    common: Ie,
    self: sp
  };
  p1 = {
    name: "Icon",
    common: k,
    self: sp
  };
  h1 = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  };
  function ap(e) {
    const { popoverColor: t, textColor2: o, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: s, borderRadius: a, iconColor: d, iconColorDisabled: c } = e;
    return Object.assign(Object.assign({}, h1), {
      panelColor: t,
      panelBoxShadow: s,
      panelDividerColor: i,
      itemTextColor: o,
      itemTextColorActive: r,
      itemColorHover: n,
      itemOpacityDisabled: l,
      itemBorderRadius: a,
      borderRadius: a,
      iconColor: d,
      iconColorDisabled: c
    });
  }
  let cp, m1;
  g1 = {
    name: "TimePicker",
    common: Ie,
    peers: {
      Scrollbar: xo,
      Button: En,
      Input: Rs
    },
    self: ap
  };
  cp = {
    name: "TimePicker",
    common: k,
    peers: {
      Scrollbar: at,
      Button: yt,
      Input: _t
    },
    self: ap
  };
  m1 = {
    itemSize: "24px",
    itemCellWidth: "38px",
    itemCellHeight: "32px",
    scrollItemWidth: "80px",
    scrollItemHeight: "40px",
    panelExtraFooterPadding: "8px 12px",
    panelActionPadding: "8px 12px",
    calendarTitlePadding: "0",
    calendarTitleHeight: "28px",
    arrowSize: "14px",
    panelHeaderPadding: "8px 12px",
    calendarDaysHeight: "32px",
    calendarTitleGridTempateColumns: "28px 28px 1fr 28px 28px",
    calendarLeftPaddingDate: "6px 12px 4px 12px",
    calendarLeftPaddingDatetime: "4px 12px",
    calendarLeftPaddingDaterange: "6px 12px 4px 12px",
    calendarLeftPaddingDatetimerange: "4px 12px",
    calendarLeftPaddingMonth: "0",
    calendarLeftPaddingYear: "0",
    calendarLeftPaddingQuarter: "0",
    calendarLeftPaddingMonthrange: "0",
    calendarLeftPaddingQuarterrange: "0",
    calendarLeftPaddingYearrange: "0",
    calendarLeftPaddingWeek: "6px 12px 4px 12px",
    calendarRightPaddingDate: "6px 12px 4px 12px",
    calendarRightPaddingDatetime: "4px 12px",
    calendarRightPaddingDaterange: "6px 12px 4px 12px",
    calendarRightPaddingDatetimerange: "4px 12px",
    calendarRightPaddingMonth: "0",
    calendarRightPaddingYear: "0",
    calendarRightPaddingQuarter: "0",
    calendarRightPaddingMonthrange: "0",
    calendarRightPaddingQuarterrange: "0",
    calendarRightPaddingYearrange: "0",
    calendarRightPaddingWeek: "0"
  };
  function dp(e) {
    const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: s, iconColor: a, iconColorDisabled: d, textColor1: c, dividerColor: u, boxShadow2: f, borderRadius: p, fontWeightStrong: h } = e;
    return Object.assign(Object.assign({}, m1), {
      itemFontSize: o,
      calendarDaysFontSize: o,
      calendarTitleFontSize: o,
      itemTextColor: r,
      itemTextColorDisabled: n,
      itemTextColorActive: i,
      itemTextColorCurrent: l,
      itemColorIncluded: G(l, {
        alpha: 0.1
      }),
      itemColorHover: t,
      itemColorDisabled: t,
      itemColorActive: l,
      itemBorderRadius: s,
      panelColor: i,
      panelTextColor: r,
      arrowColor: a,
      calendarTitleTextColor: c,
      calendarTitleColorHover: t,
      calendarDaysTextColor: r,
      panelHeaderDividerColor: u,
      calendarDaysDividerColor: u,
      calendarDividerColor: u,
      panelActionDividerColor: u,
      panelBoxShadow: f,
      panelBorderRadius: p,
      calendarTitleFontWeight: h,
      scrollItemBorderRadius: p,
      iconColor: a,
      iconColorDisabled: d
    });
  }
  let b1, v1;
  sP = {
    name: "DatePicker",
    common: Ie,
    peers: {
      Input: Rs,
      Button: En,
      TimePicker: g1,
      Scrollbar: xo
    },
    self: dp
  };
  b1 = {
    name: "DatePicker",
    common: k,
    peers: {
      Input: _t,
      Button: yt,
      TimePicker: cp,
      Scrollbar: at
    },
    self(e) {
      const { popoverColor: t, hoverColor: o, primaryColor: r } = e, n = dp(e);
      return n.itemColorDisabled = oe(t, o), n.itemColorIncluded = G(r, {
        alpha: 0.15
      }), n.itemColorHover = oe(t, o), n;
    }
  };
  v1 = {
    thPaddingBorderedSmall: "8px 12px",
    thPaddingBorderedMedium: "12px 16px",
    thPaddingBorderedLarge: "16px 24px",
    thPaddingSmall: "0",
    thPaddingMedium: "0",
    thPaddingLarge: "0",
    tdPaddingBorderedSmall: "8px 12px",
    tdPaddingBorderedMedium: "12px 16px",
    tdPaddingBorderedLarge: "16px 24px",
    tdPaddingSmall: "0 0 8px 0",
    tdPaddingMedium: "0 0 12px 0",
    tdPaddingLarge: "0 0 16px 0"
  };
  function x1(e) {
    const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: s, borderRadius: a, fontWeightStrong: d, lineHeight: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, v1), {
      lineHeight: c,
      fontSizeSmall: u,
      fontSizeMedium: f,
      fontSizeLarge: p,
      titleTextColor: r,
      thColor: oe(n, t),
      thColorModal: oe(i, t),
      thColorPopover: oe(l, t),
      thTextColor: r,
      thFontWeight: d,
      tdTextColor: o,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: l,
      borderColor: oe(n, s),
      borderColorModal: oe(i, s),
      borderColorPopover: oe(l, s),
      borderRadius: a
    });
  }
  let C1, up, S1, w1;
  C1 = {
    name: "Descriptions",
    common: k,
    self: x1
  };
  up = "n-dialog-provider";
  y1 = "n-dialog-api";
  S1 = "n-dialog-reactive-list";
  w1 = {
    titleFontSize: "18px",
    padding: "16px 28px 20px 28px",
    iconSize: "28px",
    actionSpace: "12px",
    contentMargin: "8px 0 16px 0",
    iconMargin: "0 4px 0 0",
    iconMarginIconTop: "4px 0 8px 0",
    closeSize: "22px",
    closeIconSize: "18px",
    closeMargin: "20px 26px 0 0",
    closeMarginIconTop: "10px 16px 0 0"
  };
  function fp(e) {
    const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: s, closeColorPressed: a, infoColor: d, successColor: c, warningColor: u, errorColor: f, primaryColor: p, dividerColor: h, borderRadius: g, fontWeightStrong: C, lineHeight: x, fontSize: y } = e;
    return Object.assign(Object.assign({}, w1), {
      fontSize: y,
      lineHeight: x,
      border: `1px solid ${h}`,
      titleTextColor: t,
      textColor: o,
      color: r,
      closeColorHover: s,
      closeColorPressed: a,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: l,
      closeBorderRadius: g,
      iconColor: p,
      iconColorInfo: d,
      iconColorSuccess: c,
      iconColorWarning: u,
      iconColorError: f,
      borderRadius: g,
      titleFontWeight: C
    });
  }
  const pp = {
    name: "Dialog",
    common: Ie,
    peers: {
      Button: En
    },
    self: fp
  }, hp = {
    name: "Dialog",
    common: k,
    peers: {
      Button: yt
    },
    self: fp
  }, ki = {
    icon: Function,
    type: {
      type: String,
      default: "default"
    },
    title: [
      String,
      Function
    ],
    closable: {
      type: Boolean,
      default: true
    },
    negativeText: String,
    positiveText: String,
    positiveButtonProps: Object,
    negativeButtonProps: Object,
    content: [
      String,
      Function
    ],
    action: Function,
    showIcon: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    bordered: Boolean,
    iconPlacement: String,
    titleClass: [
      String,
      Array
    ],
    titleStyle: [
      String,
      Object
    ],
    contentClass: [
      String,
      Array
    ],
    contentStyle: [
      String,
      Object
    ],
    actionClass: [
      String,
      Array
    ],
    actionStyle: [
      String,
      Object
    ],
    onPositiveClick: Function,
    onNegativeClick: Function,
    onClose: Function,
    closeFocusable: Boolean
  }, gp = Ii(ki), P1 = M([
    te("dialog", `
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [
      re("icon", `
 color: var(--n-icon-color);
 `),
      ne("bordered", `
 border: var(--n-border);
 `),
      ne("icon-top", [
        re("close", `
 margin: var(--n-close-margin);
 `),
        re("icon", `
 margin: var(--n-icon-margin);
 `),
        re("content", `
 text-align: center;
 `),
        re("title", `
 justify-content: center;
 `),
        re("action", `
 justify-content: center;
 `)
      ]),
      ne("icon-left", [
        re("icon", `
 margin: var(--n-icon-margin);
 `),
        ne("closable", [
          re("title", `
 padding-right: calc(var(--n-close-size) + 6px);
 `)
        ])
      ]),
      re("close", `
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),
      re("content", `
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `, [
        ne("last", "margin-bottom: 0;")
      ]),
      re("action", `
 display: flex;
 justify-content: flex-end;
 `, [
        M("> *:not(:last-child)", `
 margin-right: var(--n-action-space);
 `)
      ]),
      re("icon", `
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),
      re("title", `
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),
      te("dialog-icon-container", `
 display: flex;
 justify-content: center;
 `)
    ]),
    Iu(te("dialog", `
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),
    te("dialog", [
      zu(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)
    ])
  ]), T1 = {
    default: () => T(ai, null),
    info: () => T(ai, null),
    success: () => T(Ps, null),
    warning: () => T(Ts, null),
    error: () => T(ws, null)
  }, mp = we({
    name: "Dialog",
    alias: [
      "NimbusConfirmCard",
      "Confirm"
    ],
    props: Object.assign(Object.assign({}, gt.props), ki),
    slots: Object,
    setup(e) {
      const { mergedComponentPropsRef: t, mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = bo(e), i = Ar("Dialog", n, o), l = Q(() => {
        var p, h;
        const { iconPlacement: g } = e;
        return g || ((h = (p = t == null ? void 0 : t.value) === null || p === void 0 ? void 0 : p.Dialog) === null || h === void 0 ? void 0 : h.iconPlacement) || "left";
      });
      function s(p) {
        const { onPositiveClick: h } = e;
        h && h(p);
      }
      function a(p) {
        const { onNegativeClick: h } = e;
        h && h(p);
      }
      function d() {
        const { onClose: p } = e;
        p && p();
      }
      const c = gt("Dialog", "-dialog", P1, pp, e, o), u = Q(() => {
        const { type: p } = e, h = l.value, { common: { cubicBezierEaseInOut: g }, self: { fontSize: C, lineHeight: x, border: y, titleTextColor: _, textColor: A, color: E, closeBorderRadius: R, closeColorHover: w, closeColorPressed: b, closeIconColor: S, closeIconColorHover: I, closeIconColorPressed: D, closeIconSize: H, borderRadius: N, titleFontWeight: ae, titleFontSize: ue, padding: le, iconSize: X, actionSpace: Y, contentMargin: _e, closeSize: Ae, [h === "top" ? "iconMarginIconTop" : "iconMargin"]: Ce, [h === "top" ? "closeMarginIconTop" : "closeMargin"]: ze, [he("iconColor", p)]: Qe } } = c.value, Ue = $o(Ce);
        return {
          "--n-font-size": C,
          "--n-icon-color": Qe,
          "--n-bezier": g,
          "--n-close-margin": ze,
          "--n-icon-margin-top": Ue.top,
          "--n-icon-margin-right": Ue.right,
          "--n-icon-margin-bottom": Ue.bottom,
          "--n-icon-margin-left": Ue.left,
          "--n-icon-size": X,
          "--n-close-size": Ae,
          "--n-close-icon-size": H,
          "--n-close-border-radius": R,
          "--n-close-color-hover": w,
          "--n-close-color-pressed": b,
          "--n-close-icon-color": S,
          "--n-close-icon-color-hover": I,
          "--n-close-icon-color-pressed": D,
          "--n-color": E,
          "--n-text-color": A,
          "--n-border-radius": N,
          "--n-padding": le,
          "--n-line-height": x,
          "--n-border": y,
          "--n-content-margin": _e,
          "--n-title-font-size": ue,
          "--n-title-font-weight": ae,
          "--n-title-text-color": _,
          "--n-action-space": Y
        };
      }), f = r ? or("dialog", Q(() => `${e.type[0]}${l.value[0]}`), u, e) : void 0;
      return {
        mergedClsPrefix: o,
        rtlEnabled: i,
        mergedIconPlacement: l,
        mergedTheme: c,
        handlePositiveClick: s,
        handleNegativeClick: a,
        handleCloseClick: d,
        cssVars: r ? void 0 : u,
        themeClass: f == null ? void 0 : f.themeClass,
        onRender: f == null ? void 0 : f.onRender
      };
    },
    render() {
      var e;
      const { bordered: t, mergedIconPlacement: o, cssVars: r, closable: n, showIcon: i, title: l, content: s, action: a, negativeText: d, positiveText: c, positiveButtonProps: u, negativeButtonProps: f, handlePositiveClick: p, handleNegativeClick: h, mergedTheme: g, loading: C, type: x, mergedClsPrefix: y } = this;
      (e = this.onRender) === null || e === void 0 || e.call(this);
      const _ = i ? T(Fi, {
        clsPrefix: y,
        class: `${y}-dialog__icon`
      }, {
        default: () => Ht(this.$slots.icon, (E) => E || (this.icon ? St(this.icon) : T1[this.type]()))
      }) : null, A = Ht(this.$slots.action, (E) => E || c || d || a ? T("div", {
        class: [
          `${y}-dialog__action`,
          this.actionClass
        ],
        style: this.actionStyle
      }, E || (a ? [
        St(a)
      ] : [
        this.negativeText && T(Nl, Object.assign({
          theme: g.peers.Button,
          themeOverrides: g.peerOverrides.Button,
          ghost: true,
          size: "small",
          onClick: h
        }, f), {
          default: () => St(this.negativeText)
        }),
        this.positiveText && T(Nl, Object.assign({
          theme: g.peers.Button,
          themeOverrides: g.peerOverrides.Button,
          size: "small",
          type: x === "default" ? "primary" : x,
          disabled: C,
          loading: C,
          onClick: p
        }, u), {
          default: () => St(this.positiveText)
        })
      ])) : null);
      return T("div", {
        class: [
          `${y}-dialog`,
          this.themeClass,
          this.closable && `${y}-dialog--closable`,
          `${y}-dialog--icon-${o}`,
          t && `${y}-dialog--bordered`,
          this.rtlEnabled && `${y}-dialog--rtl`
        ],
        style: r,
        role: "dialog"
      }, n ? Ht(this.$slots.close, (E) => {
        const R = [
          `${y}-dialog__close`,
          this.rtlEnabled && `${y}-dialog--rtl`
        ];
        return E ? T("div", {
          class: R
        }, E) : T(Mi, {
          focusable: this.closeFocusable,
          clsPrefix: y,
          class: R,
          onClick: this.handleCloseClick
        });
      }) : null, i && o === "top" ? T("div", {
        class: `${y}-dialog-icon-container`
      }, _) : null, T("div", {
        class: [
          `${y}-dialog__title`,
          this.titleClass
        ],
        style: this.titleStyle
      }, i && o === "left" ? _ : null, mc(this.$slots.header, () => [
        St(l)
      ])), T("div", {
        class: [
          `${y}-dialog__content`,
          A ? "" : `${y}-dialog__content--last`,
          this.contentClass
        ],
        style: this.contentStyle
      }, mc(this.$slots.default, () => [
        St(s)
      ])), A);
    }
  });
  function bp(e) {
    const { modalColor: t, textColor2: o, boxShadow3: r } = e;
    return {
      color: t,
      textColor: o,
      boxShadow: r
    };
  }
  const E1 = {
    name: "Modal",
    common: Ie,
    peers: {
      Scrollbar: xo,
      Dialog: pp,
      Card: Vf
    },
    self: bp
  }, _1 = {
    name: "Modal",
    common: k,
    peers: {
      Scrollbar: at,
      Dialog: hp,
      Card: Gf
    },
    self: bp
  }, Vl = "n-draggable";
  function R1(e, t) {
    let o;
    const r = Q(() => e.value !== false), n = Q(() => r.value ? Vl : ""), i = Q(() => {
      const a = e.value;
      return a === true || a === false ? true : a ? a.bounds !== "none" : true;
    });
    function l(a) {
      const d = a.querySelector(`.${Vl}`);
      if (!d || !n.value) return;
      let c = 0, u = 0, f = 0, p = 0, h = 0, g = 0, C, x = null, y = null;
      function _(w) {
        w.preventDefault(), C = w;
        const { x: b, y: S, right: I, bottom: D } = a.getBoundingClientRect();
        u = b, p = S, c = window.innerWidth - I, f = window.innerHeight - D;
        const { left: H, top: N } = a.style;
        h = +N.slice(0, -2), g = +H.slice(0, -2);
      }
      function A() {
        y && (a.style.top = `${y.y}px`, a.style.left = `${y.x}px`, y = null), x = null;
      }
      function E(w) {
        if (!C) return;
        const { clientX: b, clientY: S } = C;
        let I = w.clientX - b, D = w.clientY - S;
        i.value && (I > c ? I = c : -I > u && (I = -u), D > f ? D = f : -D > p && (D = -p));
        const H = I + g, N = D + h;
        y = {
          x: H,
          y: N
        }, x || (x = requestAnimationFrame(A));
      }
      function R() {
        C = void 0, x && (cancelAnimationFrame(x), x = null), y && (a.style.top = `${y.y}px`, a.style.left = `${y.x}px`, y = null), t.onEnd(a);
      }
      pt("mousedown", d, _), pt("mousemove", window, E), pt("mouseup", window, R), o = () => {
        x && cancelAnimationFrame(x), Je("mousedown", d, _), Je("mousemove", window, E), Je("mouseup", window, R);
      };
    }
    function s() {
      o && (o(), o = void 0);
    }
    return ls(s), {
      stopDrag: s,
      startDrag: l,
      draggableRef: r,
      draggableClassRef: n
    };
  }
  let Is, $1, A1, I1, z1, O1, B1, F1, M1, D1, vp, k1;
  Is = Object.assign(Object.assign({}, $s), ki);
  $1 = Ii(Is);
  A1 = we({
    name: "ModalBody",
    inheritAttrs: false,
    slots: Object,
    props: Object.assign(Object.assign({
      show: {
        type: Boolean,
        required: true
      },
      preset: String,
      displayDirective: {
        type: String,
        required: true
      },
      trapFocus: {
        type: Boolean,
        default: true
      },
      autoFocus: {
        type: Boolean,
        default: true
      },
      blockScroll: Boolean,
      draggable: {
        type: [
          Boolean,
          Object
        ],
        default: false
      },
      maskHidden: Boolean
    }, Is), {
      renderMask: Function,
      onClickoutside: Function,
      onBeforeLeave: {
        type: Function,
        required: true
      },
      onAfterLeave: {
        type: Function,
        required: true
      },
      onPositiveClick: {
        type: Function,
        required: true
      },
      onNegativeClick: {
        type: Function,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      },
      onAfterEnter: Function,
      onEsc: Function
    }),
    setup(e) {
      const t = de(null), o = de(null), r = de(e.show), n = de(null), i = de(null), l = Ee(Nu);
      let s = null;
      At(Yt(e, "show"), (b) => {
        b && (s = l.getMousePosition());
      }, {
        immediate: true
      });
      const { stopDrag: a, startDrag: d, draggableRef: c, draggableClassRef: u } = R1(Yt(e, "draggable"), {
        onEnd: (b) => {
          g(b);
        }
      }), f = Q(() => vr([
        e.titleClass,
        u.value
      ])), p = Q(() => vr([
        e.headerClass,
        u.value
      ]));
      At(Yt(e, "show"), (b) => {
        b && (r.value = true);
      }), Wv(Q(() => e.blockScroll && r.value));
      function h() {
        if (l.transformOriginRef.value === "center") return "";
        const { value: b } = n, { value: S } = i;
        if (b === null || S === null) return "";
        if (o.value) {
          const I = o.value.containerScrollTop;
          return `${b}px ${S + I}px`;
        }
        return "";
      }
      function g(b) {
        if (l.transformOriginRef.value === "center" || !s || !o.value) return;
        const S = o.value.containerScrollTop, { offsetLeft: I, offsetTop: D } = b, H = s.y, N = s.x;
        n.value = -(I - N), i.value = -(D - H - S), b.style.transformOrigin = h();
      }
      function C(b) {
        Zo(() => {
          g(b);
        });
      }
      function x(b) {
        b.style.transformOrigin = h(), e.onBeforeLeave();
      }
      function y(b) {
        const S = b;
        c.value && d(S), e.onAfterEnter && e.onAfterEnter(S);
      }
      function _() {
        r.value = false, n.value = null, i.value = null, a(), e.onAfterLeave();
      }
      function A() {
        const { onClose: b } = e;
        b && b();
      }
      function E() {
        e.onNegativeClick();
      }
      function R() {
        e.onPositiveClick();
      }
      const w = de(null);
      return At(w, (b) => {
        b && Zo(() => {
          const S = b.el;
          S && t.value !== S && (t.value = S);
        });
      }), tt(Dv, t), tt(Mv, null), tt(kv, null), {
        mergedTheme: l.mergedThemeRef,
        appear: l.appearRef,
        isMounted: l.isMountedRef,
        mergedClsPrefix: l.mergedClsPrefixRef,
        bodyRef: t,
        scrollbarRef: o,
        draggableClass: u,
        displayed: r,
        childNodeRef: w,
        cardHeaderClass: p,
        dialogTitleClass: f,
        handlePositiveClick: R,
        handleNegativeClick: E,
        handleCloseClick: A,
        handleAfterEnter: y,
        handleAfterLeave: _,
        handleBeforeLeave: x,
        handleEnter: C
      };
    },
    render() {
      const { $slots: e, $attrs: t, handleEnter: o, handleAfterEnter: r, handleAfterLeave: n, handleBeforeLeave: i, preset: l, mergedClsPrefix: s } = this;
      let a = null;
      if (!l) {
        if (a = T0("default", e.default, {
          draggableClass: this.draggableClass
        }), !a) {
          hn("modal", "default slot is empty");
          return;
        }
        a = fo(a), a.props = us({
          class: `${s}-modal`
        }, t, a.props || {});
      }
      return this.displayDirective === "show" || this.displayed || this.show ? ml(T("div", {
        role: "none",
        class: [
          `${s}-modal-body-wrapper`,
          this.maskHidden && `${s}-modal-body-wrapper--mask-hidden`
        ]
      }, T(Di, {
        ref: "scrollbarRef",
        theme: this.mergedTheme.peers.Scrollbar,
        themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
        contentClass: `${s}-modal-scroll-content`
      }, {
        default: () => {
          var d;
          return [
            (d = this.renderMask) === null || d === void 0 ? void 0 : d.call(this),
            T(S0, {
              disabled: !this.trapFocus || this.maskHidden,
              active: this.show,
              onEsc: this.onEsc,
              autoFocus: this.autoFocus
            }, {
              default: () => {
                var c;
                return T(Jo, {
                  name: "fade-in-scale-up-transition",
                  appear: (c = this.appear) !== null && c !== void 0 ? c : this.isMounted,
                  onEnter: o,
                  onAfterEnter: r,
                  onAfterLeave: n,
                  onBeforeLeave: i
                }, {
                  default: () => {
                    const u = [
                      [
                        aa,
                        this.show
                      ]
                    ], { onClickoutside: f } = this;
                    return f && u.push([
                      Vv,
                      this.onClickoutside,
                      void 0,
                      {
                        capture: true
                      }
                    ]), ml(this.preset === "confirm" || this.preset === "dialog" ? T(mp, Object.assign({}, this.$attrs, {
                      class: [
                        `${s}-modal`,
                        this.$attrs.class
                      ],
                      ref: "bodyRef",
                      theme: this.mergedTheme.peers.Dialog,
                      themeOverrides: this.mergedTheme.peerOverrides.Dialog
                    }, gn(this.$props, gp), {
                      titleClass: this.dialogTitleClass,
                      "aria-modal": "true"
                    }), e) : this.preset === "card" ? T(kS, Object.assign({}, this.$attrs, {
                      ref: "bodyRef",
                      class: [
                        `${s}-modal`,
                        this.$attrs.class
                      ],
                      theme: this.mergedTheme.peers.Card,
                      themeOverrides: this.mergedTheme.peerOverrides.Card
                    }, gn(this.$props, DS), {
                      headerClass: this.cardHeaderClass,
                      "aria-modal": "true",
                      role: "dialog"
                    }), e) : this.childNodeRef = a, u);
                  }
                });
              }
            })
          ];
        }
      })), [
        [
          aa,
          this.displayDirective === "if" || this.displayed || this.show
        ]
      ]) : null;
    }
  });
  I1 = M([
    te("modal-container", `
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),
    te("modal-mask", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `, [
      Af({
        enterDuration: ".25s",
        leaveDuration: ".25s",
        enterCubicBezier: "var(--n-bezier-ease-out)",
        leaveCubicBezier: "var(--n-bezier-ease-out)"
      })
    ]),
    te("modal-body-wrapper", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `, [
      te("modal-scroll-content", `
 min-height: 100%;
 display: flex;
 position: relative;
 `),
      ne("mask-hidden", "pointer-events: none;", [
        te("modal-scroll-content", [
          M("> *", `
 pointer-events: all;
 `)
        ])
      ])
    ]),
    te("modal", `
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `, [
      Qy({
        duration: ".25s",
        enterScale: ".5"
      }),
      M(`.${Vl}`, `
 cursor: move;
 user-select: none;
 `)
    ])
  ]);
  z1 = Object.assign(Object.assign(Object.assign(Object.assign({}, gt.props), {
    show: Boolean,
    showMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    preset: String,
    to: [
      String,
      Object
    ],
    displayDirective: {
      type: String,
      default: "if"
    },
    transformOrigin: {
      type: String,
      default: "mouse"
    },
    zIndex: Number,
    autoFocus: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    blockScroll: {
      type: Boolean,
      default: true
    }
  }), Is), {
    draggable: [
      Boolean,
      Object
    ],
    onEsc: Function,
    "onUpdate:show": [
      Function,
      Array
    ],
    onUpdateShow: [
      Function,
      Array
    ],
    onAfterEnter: Function,
    onBeforeLeave: Function,
    onAfterLeave: Function,
    onClose: Function,
    onPositiveClick: Function,
    onNegativeClick: Function,
    onMaskClick: Function,
    internalDialog: Boolean,
    internalModal: Boolean,
    internalAppear: {
      type: Boolean,
      default: void 0
    },
    overlayStyle: [
      String,
      Object
    ],
    onBeforeHide: Function,
    onAfterHide: Function,
    onHide: Function,
    unstableShowMask: {
      type: Boolean,
      default: void 0
    }
  });
  H1 = we({
    name: "Modal",
    inheritAttrs: false,
    props: z1,
    slots: Object,
    setup(e) {
      const t = de(null), { mergedClsPrefixRef: o, namespaceRef: r, inlineThemeDisabled: n } = bo(e), i = gt("Modal", "-modal", I1, E1, e, o), l = ju(64), s = ku(), a = Wu(), d = e.internalDialog ? Ee(up, null) : null, c = e.internalModal ? Ee(Lv, null) : null, u = jv();
      function f(R) {
        const { onUpdateShow: w, "onUpdate:show": b, onHide: S } = e;
        w && Go(w, R), b && Go(b, R), S && !R && S(R);
      }
      function p() {
        const { onClose: R } = e;
        R ? Promise.resolve(R()).then((w) => {
          w !== false && f(false);
        }) : f(false);
      }
      function h() {
        const { onPositiveClick: R } = e;
        R ? Promise.resolve(R()).then((w) => {
          w !== false && f(false);
        }) : f(false);
      }
      function g() {
        const { onNegativeClick: R } = e;
        R ? Promise.resolve(R()).then((w) => {
          w !== false && f(false);
        }) : f(false);
      }
      function C() {
        const { onBeforeLeave: R, onBeforeHide: w } = e;
        R && Go(R), w && w();
      }
      function x() {
        const { onAfterLeave: R, onAfterHide: w } = e;
        R && Go(R), w && w();
      }
      function y(R) {
        var w;
        const { onMaskClick: b } = e;
        b && b(R), e.maskClosable && !((w = t.value) === null || w === void 0) && w.contains(hs(R)) && f(false);
      }
      function _(R) {
        var w;
        (w = e.onEsc) === null || w === void 0 || w.call(e), e.show && e.closeOnEsc && w0(R) && (u.value || f(false));
      }
      tt(Nu, {
        getMousePosition: () => {
          const R = d || c;
          if (R) {
            const { clickedRef: w, clickedPositionRef: b } = R;
            if (w.value && b.value) return b.value;
          }
          return l.value ? s.value : null;
        },
        mergedClsPrefixRef: o,
        mergedThemeRef: i,
        isMountedRef: a,
        appearRef: Yt(e, "internalAppear"),
        transformOriginRef: Yt(e, "transformOrigin")
      });
      const A = Q(() => {
        const { common: { cubicBezierEaseOut: R }, self: { boxShadow: w, color: b, textColor: S } } = i.value;
        return {
          "--n-bezier-ease-out": R,
          "--n-box-shadow": w,
          "--n-color": b,
          "--n-text-color": S
        };
      }), E = n ? or("theme-class", void 0, A, e) : void 0;
      return {
        mergedClsPrefix: o,
        namespace: r,
        isMounted: a,
        containerRef: t,
        presetProps: Q(() => gn(e, $1)),
        handleEsc: _,
        handleAfterLeave: x,
        handleClickoutside: y,
        handleBeforeLeave: C,
        doUpdateShow: f,
        handleNegativeClick: g,
        handlePositiveClick: h,
        handleCloseClick: p,
        cssVars: n ? void 0 : A,
        themeClass: E == null ? void 0 : E.themeClass,
        onRender: E == null ? void 0 : E.onRender
      };
    },
    render() {
      const { mergedClsPrefix: e } = this;
      return T(Qv, {
        to: this.to,
        show: this.show
      }, {
        default: () => {
          var t;
          (t = this.onRender) === null || t === void 0 || t.call(this);
          const { showMask: o } = this;
          return ml(T("div", {
            role: "none",
            ref: "containerRef",
            class: [
              `${e}-modal-container`,
              this.themeClass,
              this.namespace
            ],
            style: this.cssVars
          }, T(A1, Object.assign({
            style: this.overlayStyle
          }, this.$attrs, {
            ref: "bodyWrapper",
            displayDirective: this.displayDirective,
            show: this.show,
            preset: this.preset,
            autoFocus: this.autoFocus,
            trapFocus: this.trapFocus,
            draggable: this.draggable,
            blockScroll: this.blockScroll,
            maskHidden: !o
          }, this.presetProps, {
            onEsc: this.handleEsc,
            onClose: this.handleCloseClick,
            onNegativeClick: this.handleNegativeClick,
            onPositiveClick: this.handlePositiveClick,
            onBeforeLeave: this.handleBeforeLeave,
            onAfterEnter: this.onAfterEnter,
            onAfterLeave: this.handleAfterLeave,
            onClickoutside: o ? void 0 : this.handleClickoutside,
            renderMask: o ? () => {
              var r;
              return T(Jo, {
                name: "fade-in-transition",
                key: "mask",
                appear: (r = this.internalAppear) !== null && r !== void 0 ? r : this.isMounted
              }, {
                default: () => this.show ? T("div", {
                  "aria-hidden": true,
                  ref: "containerRef",
                  class: `${e}-modal-mask`,
                  onClick: this.handleClickoutside
                }) : null
              });
            } : void 0
          }), this.$slots)), [
            [
              Kv,
              {
                zIndex: this.zIndex,
                enabled: this.show
              }
            ]
          ]);
        }
      });
    }
  });
  O1 = Object.assign(Object.assign({}, ki), {
    onAfterEnter: Function,
    onAfterLeave: Function,
    transformOrigin: String,
    blockScroll: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    onEsc: Function,
    autoFocus: {
      type: Boolean,
      default: true
    },
    internalStyle: [
      String,
      Object
    ],
    maskClosable: {
      type: Boolean,
      default: true
    },
    zIndex: Number,
    onPositiveClick: Function,
    onNegativeClick: Function,
    onClose: Function,
    onMaskClick: Function,
    draggable: [
      Boolean,
      Object
    ]
  });
  B1 = we({
    name: "DialogEnvironment",
    props: Object.assign(Object.assign({}, O1), {
      internalKey: {
        type: String,
        required: true
      },
      to: [
        String,
        Object
      ],
      onInternalAfterLeave: {
        type: Function,
        required: true
      }
    }),
    setup(e) {
      const t = de(true);
      function o() {
        const { onInternalAfterLeave: c, internalKey: u, onAfterLeave: f } = e;
        c && c(u), f && f();
      }
      function r(c) {
        const { onPositiveClick: u } = e;
        u ? Promise.resolve(u(c)).then((f) => {
          f !== false && a();
        }) : a();
      }
      function n(c) {
        const { onNegativeClick: u } = e;
        u ? Promise.resolve(u(c)).then((f) => {
          f !== false && a();
        }) : a();
      }
      function i() {
        const { onClose: c } = e;
        c ? Promise.resolve(c()).then((u) => {
          u !== false && a();
        }) : a();
      }
      function l(c) {
        const { onMaskClick: u, maskClosable: f } = e;
        u && (u(c), f && a());
      }
      function s() {
        const { onEsc: c } = e;
        c && c();
      }
      function a() {
        t.value = false;
      }
      function d(c) {
        t.value = c;
      }
      return {
        show: t,
        hide: a,
        handleUpdateShow: d,
        handleAfterLeave: o,
        handleCloseClick: i,
        handleNegativeClick: n,
        handlePositiveClick: r,
        handleMaskClick: l,
        handleEsc: s
      };
    },
    render() {
      const { handlePositiveClick: e, handleUpdateShow: t, handleNegativeClick: o, handleCloseClick: r, handleAfterLeave: n, handleMaskClick: i, handleEsc: l, to: s, zIndex: a, maskClosable: d, show: c } = this;
      return T(H1, {
        show: c,
        onUpdateShow: t,
        onMaskClick: i,
        onEsc: l,
        to: s,
        zIndex: a,
        maskClosable: d,
        onAfterEnter: this.onAfterEnter,
        onAfterLeave: n,
        closeOnEsc: this.closeOnEsc,
        blockScroll: this.blockScroll,
        autoFocus: this.autoFocus,
        transformOrigin: this.transformOrigin,
        draggable: this.draggable,
        internalAppear: true,
        internalDialog: true
      }, {
        default: ({ draggableClass: u }) => T(mp, Object.assign({}, gn(this.$props, gp), {
          titleClass: vr([
            this.titleClass,
            u
          ]),
          style: this.internalStyle,
          onClose: r,
          onNegativeClick: o,
          onPositiveClick: e
        }))
      });
    }
  });
  F1 = {
    injectionKey: String,
    to: [
      String,
      Object
    ]
  };
  M1 = we({
    name: "DialogProvider",
    props: F1,
    setup() {
      const e = de([]), t = {};
      function o(s = {}) {
        const a = $i(), d = Oo(Object.assign(Object.assign({}, s), {
          key: a,
          destroy: () => {
            var c;
            (c = t[`n-dialog-${a}`]) === null || c === void 0 || c.hide();
          }
        }));
        return e.value.push(d), d;
      }
      const r = [
        "info",
        "success",
        "warning",
        "error"
      ].map((s) => (a) => o(Object.assign(Object.assign({}, a), {
        type: s
      })));
      function n(s) {
        const { value: a } = e;
        a.splice(a.findIndex((d) => d.key === s), 1);
      }
      function i() {
        Object.values(t).forEach((s) => {
          s == null ? void 0 : s.hide();
        });
      }
      const l = {
        create: o,
        destroyAll: i,
        info: r[0],
        success: r[1],
        warning: r[2],
        error: r[3]
      };
      return tt(y1, l), tt(up, {
        clickedRef: ju(64),
        clickedPositionRef: ku()
      }), tt(S1, e), Object.assign(Object.assign({}, l), {
        dialogList: e,
        dialogInstRefs: t,
        handleAfterLeave: n
      });
    },
    render() {
      var e, t;
      return T(We, null, [
        this.dialogList.map((o) => T(B1, bs(o, [
          "destroy",
          "style"
        ], {
          internalStyle: o.style,
          to: this.to,
          ref: (r) => {
            r === null ? delete this.dialogInstRefs[`n-dialog-${o.key}`] : this.dialogInstRefs[`n-dialog-${o.key}`] = r;
          },
          internalKey: o.key,
          onInternalAfterLeave: this.handleAfterLeave
        }))),
        (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)
      ]);
    }
  });
  D1 = {
    name: "LoadingBar",
    common: k,
    self(e) {
      const { primaryColor: t } = e;
      return {
        colorError: "red",
        colorLoading: t,
        height: "2px"
      };
    }
  };
  L1 = "n-message-api";
  vp = "n-message-provider";
  k1 = {
    margin: "0 0 8px 0",
    padding: "10px 20px",
    maxWidth: "720px",
    minWidth: "420px",
    iconMargin: "0 10px 0 0",
    closeMargin: "0 0 0 10px",
    closeSize: "20px",
    closeIconSize: "16px",
    iconSize: "20px",
    fontSize: "14px"
  };
  function xp(e) {
    const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: s, warningColor: a, popoverColor: d, boxShadow2: c, primaryColor: u, lineHeight: f, borderRadius: p, closeColorHover: h, closeColorPressed: g } = e;
    return Object.assign(Object.assign({}, k1), {
      closeBorderRadius: p,
      textColor: t,
      textColorInfo: t,
      textColorSuccess: t,
      textColorError: t,
      textColorWarning: t,
      textColorLoading: t,
      color: d,
      colorInfo: d,
      colorSuccess: d,
      colorError: d,
      colorWarning: d,
      colorLoading: d,
      boxShadow: c,
      boxShadowInfo: c,
      boxShadowSuccess: c,
      boxShadowError: c,
      boxShadowWarning: c,
      boxShadowLoading: c,
      iconColor: t,
      iconColorInfo: i,
      iconColorSuccess: l,
      iconColorWarning: a,
      iconColorError: s,
      iconColorLoading: u,
      closeColorHover: h,
      closeColorPressed: g,
      closeIconColor: o,
      closeIconColorHover: r,
      closeIconColorPressed: n,
      closeColorHoverInfo: h,
      closeColorPressedInfo: g,
      closeIconColorInfo: o,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: n,
      closeColorHoverSuccess: h,
      closeColorPressedSuccess: g,
      closeIconColorSuccess: o,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: n,
      closeColorHoverError: h,
      closeColorPressedError: g,
      closeIconColorError: o,
      closeIconColorHoverError: r,
      closeIconColorPressedError: n,
      closeColorHoverWarning: h,
      closeColorPressedWarning: g,
      closeIconColorWarning: o,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: n,
      closeColorHoverLoading: h,
      closeColorPressedLoading: g,
      closeIconColorLoading: o,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: n,
      loadingColor: u,
      lineHeight: f,
      borderRadius: p,
      border: "0"
    });
  }
  const j1 = {
    common: Ie,
    self: xp
  }, W1 = {
    name: "Message",
    common: k,
    self: xp
  }, Cp = {
    icon: Function,
    type: {
      type: String,
      default: "info"
    },
    content: [
      String,
      Number,
      Function
    ],
    showIcon: {
      type: Boolean,
      default: true
    },
    closable: Boolean,
    keepAliveOnHover: Boolean,
    spinProps: Object,
    onClose: Function,
    onMouseenter: Function,
    onMouseleave: Function
  }, N1 = M([
    te("message-wrapper", `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [
      dS({
        overflow: "visible",
        originalTransition: "transform .3s var(--n-bezier)",
        enterToProps: {
          transform: "scale(1)"
        },
        leaveToProps: {
          transform: "scale(0.85)"
        }
      })
    ]),
    te("message", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 border: var(--n-border);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `, [
      re("content", `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `),
      re("icon", `
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `, [
        [
          "default",
          "info",
          "success",
          "warning",
          "error",
          "loading"
        ].map((e) => ne(`${e}-type`, [
          M("> *", `
 color: var(--n-icon-color-${e});
 transition: color .3s var(--n-bezier);
 `)
        ])),
        M("> *", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [
          ci()
        ])
      ]),
      re("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [
        M("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
        M("&:active", `
 color: var(--n-close-icon-color-pressed);
 `)
      ])
    ]),
    te("message-container", `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [
      ne("top", `
 top: 12px;
 left: 0;
 right: 0;
 `),
      ne("top-left", `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `),
      ne("top-right", `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `),
      ne("bottom", `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `),
      ne("bottom-left", `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `),
      ne("bottom-right", `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)
    ])
  ]), V1 = {
    info: () => T(ai, null),
    success: () => T(Ps, null),
    warning: () => T(Ts, null),
    error: () => T(ws, null),
    default: () => null
  }, G1 = we({
    name: "Message",
    props: Object.assign(Object.assign({}, Cp), {
      render: Function
    }),
    setup(e) {
      const { inlineThemeDisabled: t, mergedRtlRef: o } = bo(e), { props: r, mergedClsPrefixRef: n } = Ee(vp), i = Ar("Message", o, n), l = gt("Message", "-message", N1, j1, r, n), s = Q(() => {
        const { type: d } = e, { common: { cubicBezierEaseInOut: c }, self: { padding: u, margin: f, maxWidth: p, iconMargin: h, closeMargin: g, closeSize: C, iconSize: x, fontSize: y, lineHeight: _, borderRadius: A, border: E, iconColorInfo: R, iconColorSuccess: w, iconColorWarning: b, iconColorError: S, iconColorLoading: I, closeIconSize: D, closeBorderRadius: H, [he("textColor", d)]: N, [he("boxShadow", d)]: ae, [he("color", d)]: ue, [he("closeColorHover", d)]: le, [he("closeColorPressed", d)]: X, [he("closeIconColor", d)]: Y, [he("closeIconColorPressed", d)]: _e, [he("closeIconColorHover", d)]: Ae } } = l.value;
        return {
          "--n-bezier": c,
          "--n-margin": f,
          "--n-padding": u,
          "--n-max-width": p,
          "--n-font-size": y,
          "--n-icon-margin": h,
          "--n-icon-size": x,
          "--n-close-icon-size": D,
          "--n-close-border-radius": H,
          "--n-close-size": C,
          "--n-close-margin": g,
          "--n-text-color": N,
          "--n-color": ue,
          "--n-box-shadow": ae,
          "--n-icon-color-info": R,
          "--n-icon-color-success": w,
          "--n-icon-color-warning": b,
          "--n-icon-color-error": S,
          "--n-icon-color-loading": I,
          "--n-close-color-hover": le,
          "--n-close-color-pressed": X,
          "--n-close-icon-color": Y,
          "--n-close-icon-color-pressed": _e,
          "--n-close-icon-color-hover": Ae,
          "--n-line-height": _,
          "--n-border-radius": A,
          "--n-border": E
        };
      }), a = t ? or("message", Q(() => e.type[0]), s, {}) : void 0;
      return {
        mergedClsPrefix: n,
        rtlEnabled: i,
        messageProviderProps: r,
        handleClose() {
          var d;
          (d = e.onClose) === null || d === void 0 || d.call(e);
        },
        cssVars: t ? void 0 : s,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender,
        placement: r.placement
      };
    },
    render() {
      const { render: e, type: t, closable: o, content: r, mergedClsPrefix: n, cssVars: i, themeClass: l, onRender: s, icon: a, handleClose: d, showIcon: c } = this;
      s == null ? void 0 : s();
      let u;
      return T("div", {
        class: [
          `${n}-message-wrapper`,
          l
        ],
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: [
          {
            alignItems: this.placement.startsWith("top") ? "flex-start" : "flex-end"
          },
          i
        ]
      }, e ? e(this.$props) : T("div", {
        class: [
          `${n}-message ${n}-message--${t}-type`,
          this.rtlEnabled && `${n}-message--rtl`
        ]
      }, (u = U1(a, t, n, this.spinProps)) && c ? T("div", {
        class: `${n}-message__icon ${n}-message__icon--${t}-type`
      }, T(Ss, null, {
        default: () => u
      })) : null, T("div", {
        class: `${n}-message__content`
      }, St(r)), o ? T(Mi, {
        clsPrefix: n,
        class: `${n}-message__close`,
        onClick: d,
        absolute: true
      }) : null));
    }
  });
  function U1(e, t, o, r) {
    if (typeof e == "function") return e();
    {
      const n = t === "loading" ? T($f, Object.assign({
        clsPrefix: o,
        strokeWidth: 24,
        scale: 0.85
      }, r)) : V1[t]();
      return n ? T(Fi, {
        clsPrefix: o,
        key: t
      }, {
        default: () => n
      }) : null;
    }
  }
  const K1 = we({
    name: "MessageEnvironment",
    props: Object.assign(Object.assign({}, Cp), {
      duration: {
        type: Number,
        default: 3e3
      },
      onAfterLeave: Function,
      onLeave: Function,
      internalKey: {
        type: String,
        required: true
      },
      onInternalAfterLeave: Function,
      onHide: Function,
      onAfterHide: Function
    }),
    setup(e) {
      let t = null;
      const o = de(true);
      mo(() => {
        r();
      });
      function r() {
        const { duration: c } = e;
        c && (t = window.setTimeout(l, c));
      }
      function n(c) {
        c.currentTarget === c.target && t !== null && (window.clearTimeout(t), t = null);
      }
      function i(c) {
        c.currentTarget === c.target && r();
      }
      function l() {
        const { onHide: c } = e;
        o.value = false, t && (window.clearTimeout(t), t = null), c && c();
      }
      function s() {
        const { onClose: c } = e;
        c && c(), l();
      }
      function a() {
        const { onAfterLeave: c, onInternalAfterLeave: u, onAfterHide: f, internalKey: p } = e;
        c && c(), u && u(p), f && f();
      }
      function d() {
        l();
      }
      return {
        show: o,
        hide: l,
        handleClose: s,
        handleAfterLeave: a,
        handleMouseleave: i,
        handleMouseenter: n,
        deactivate: d
      };
    },
    render() {
      return T(Rf, {
        appear: true,
        onAfterLeave: this.handleAfterLeave,
        onLeave: this.onLeave
      }, {
        default: () => [
          this.show ? T(G1, {
            content: this.content,
            type: this.type,
            icon: this.icon,
            showIcon: this.showIcon,
            closable: this.closable,
            spinProps: this.spinProps,
            onClose: this.handleClose,
            onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : void 0,
            onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : void 0
          }) : null
        ]
      });
    }
  }), q1 = Object.assign(Object.assign({}, gt.props), {
    to: [
      String,
      Object
    ],
    duration: {
      type: Number,
      default: 3e3
    },
    keepAliveOnHover: Boolean,
    max: Number,
    placement: {
      type: String,
      default: "top"
    },
    closable: Boolean,
    containerClass: String,
    containerStyle: [
      String,
      Object
    ]
  }), X1 = we({
    name: "MessageProvider",
    props: q1,
    setup(e) {
      const { mergedClsPrefixRef: t } = bo(e), o = de([]), r = de({}), n = {
        create(a, d) {
          return i(a, Object.assign({
            type: "default"
          }, d));
        },
        info(a, d) {
          return i(a, Object.assign(Object.assign({}, d), {
            type: "info"
          }));
        },
        success(a, d) {
          return i(a, Object.assign(Object.assign({}, d), {
            type: "success"
          }));
        },
        warning(a, d) {
          return i(a, Object.assign(Object.assign({}, d), {
            type: "warning"
          }));
        },
        error(a, d) {
          return i(a, Object.assign(Object.assign({}, d), {
            type: "error"
          }));
        },
        loading(a, d) {
          return i(a, Object.assign(Object.assign({}, d), {
            type: "loading"
          }));
        },
        destroyAll: s
      };
      tt(vp, {
        props: e,
        mergedClsPrefixRef: t
      }), tt(L1, n);
      function i(a, d) {
        const c = $i(), u = Oo(Object.assign(Object.assign({}, d), {
          content: a,
          key: c,
          destroy: () => {
            var p;
            (p = r.value[c]) === null || p === void 0 || p.hide();
          }
        })), { max: f } = e;
        return f && o.value.length >= f && o.value.shift(), o.value.push(u), u;
      }
      function l(a) {
        o.value.splice(o.value.findIndex((d) => d.key === a), 1), delete r.value[a];
      }
      function s() {
        Object.values(r.value).forEach((a) => {
          a.hide();
        });
      }
      return Object.assign({
        mergedClsPrefix: t,
        messageRefs: r,
        messageList: o,
        handleAfterLeave: l
      }, n);
    },
    render() {
      var e, t, o;
      return T(We, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.messageList.length ? T(ns, {
        to: (o = this.to) !== null && o !== void 0 ? o : "body"
      }, T("div", {
        class: [
          `${this.mergedClsPrefix}-message-container`,
          `${this.mergedClsPrefix}-message-container--${this.placement}`,
          this.containerClass
        ],
        key: "message-container",
        style: this.containerStyle
      }, this.messageList.map((r) => T(K1, Object.assign({
        ref: (n) => {
          n && (this.messageRefs[r.key] = n);
        },
        internalKey: r.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, bs(r, [
        "destroy"
      ], void 0), {
        duration: r.duration === void 0 ? this.duration : r.duration,
        keepAliveOnHover: r.keepAliveOnHover === void 0 ? this.keepAliveOnHover : r.keepAliveOnHover,
        closable: r.closable === void 0 ? this.closable : r.closable
      }))))) : null);
    }
  }), Y1 = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  };
  function yp(e) {
    const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: s, closeIconColorHover: a, closeIconColorPressed: d, closeColorHover: c, closeColorPressed: u, textColor1: f, textColor3: p, borderRadius: h, fontWeightStrong: g, boxShadow2: C, lineHeight: x, fontSize: y } = e;
    return Object.assign(Object.assign({}, Y1), {
      borderRadius: h,
      lineHeight: x,
      fontSize: y,
      headerFontWeight: g,
      iconColor: t,
      iconColorSuccess: o,
      iconColorInfo: r,
      iconColorWarning: n,
      iconColorError: i,
      color: l,
      textColor: t,
      closeIconColor: s,
      closeIconColorHover: a,
      closeIconColorPressed: d,
      closeBorderRadius: h,
      closeColorHover: c,
      closeColorPressed: u,
      headerTextColor: f,
      descriptionTextColor: p,
      actionTextColor: t,
      boxShadow: C
    });
  }
  const Z1 = {
    name: "Notification",
    common: Ie,
    peers: {
      Scrollbar: xo
    },
    self: yp
  }, Q1 = {
    name: "Notification",
    common: k,
    peers: {
      Scrollbar: at
    },
    self: yp
  }, ji = "n-notification-provider", J1 = we({
    name: "NotificationContainer",
    props: {
      scrollable: {
        type: Boolean,
        required: true
      },
      placement: {
        type: String,
        required: true
      }
    },
    setup() {
      const { mergedThemeRef: e, mergedClsPrefixRef: t, wipTransitionCountRef: o } = Ee(ji), r = de(null);
      return xi(() => {
        var n, i;
        o.value > 0 ? (n = r == null ? void 0 : r.value) === null || n === void 0 || n.classList.add("transitioning") : (i = r == null ? void 0 : r.value) === null || i === void 0 || i.classList.remove("transitioning");
      }), {
        selfRef: r,
        mergedTheme: e,
        mergedClsPrefix: t,
        transitioning: o
      };
    },
    render() {
      const { $slots: e, scrollable: t, mergedClsPrefix: o, mergedTheme: r, placement: n } = this;
      return T("div", {
        ref: "selfRef",
        class: [
          `${o}-notification-container`,
          t && `${o}-notification-container--scrollable`,
          `${o}-notification-container--${n}`
        ]
      }, t ? T(Di, {
        theme: r.peers.Scrollbar,
        themeOverrides: r.peerOverrides.Scrollbar,
        contentStyle: {
          overflow: "hidden"
        }
      }, e) : e);
    }
  }), ew = {
    info: () => T(ai, null),
    success: () => T(Ps, null),
    warning: () => T(Ts, null),
    error: () => T(ws, null),
    default: () => null
  }, zs = {
    closable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "default"
    },
    avatar: Function,
    title: [
      String,
      Function
    ],
    description: [
      String,
      Function
    ],
    content: [
      String,
      Function
    ],
    meta: [
      String,
      Function
    ],
    action: [
      String,
      Function
    ],
    onClose: {
      type: Function,
      required: true
    },
    keepAliveOnHover: Boolean,
    onMouseenter: Function,
    onMouseleave: Function
  }, tw = Ii(zs), ow = we({
    name: "Notification",
    props: zs,
    setup(e) {
      const { mergedClsPrefixRef: t, mergedThemeRef: o, props: r } = Ee(ji), { inlineThemeDisabled: n, mergedRtlRef: i } = bo(), l = Ar("Notification", i, t), s = Q(() => {
        const { type: d } = e, { self: { color: c, textColor: u, closeIconColor: f, closeIconColorHover: p, closeIconColorPressed: h, headerTextColor: g, descriptionTextColor: C, actionTextColor: x, borderRadius: y, headerFontWeight: _, boxShadow: A, lineHeight: E, fontSize: R, closeMargin: w, closeSize: b, width: S, padding: I, closeIconSize: D, closeBorderRadius: H, closeColorHover: N, closeColorPressed: ae, titleFontSize: ue, metaFontSize: le, descriptionFontSize: X, [he("iconColor", d)]: Y }, common: { cubicBezierEaseOut: _e, cubicBezierEaseIn: Ae, cubicBezierEaseInOut: Ce } } = o.value, { left: ze, right: Qe, top: Ue, bottom: ct } = $o(I);
        return {
          "--n-color": c,
          "--n-font-size": R,
          "--n-text-color": u,
          "--n-description-text-color": C,
          "--n-action-text-color": x,
          "--n-title-text-color": g,
          "--n-title-font-weight": _,
          "--n-bezier": Ce,
          "--n-bezier-ease-out": _e,
          "--n-bezier-ease-in": Ae,
          "--n-border-radius": y,
          "--n-box-shadow": A,
          "--n-close-border-radius": H,
          "--n-close-color-hover": N,
          "--n-close-color-pressed": ae,
          "--n-close-icon-color": f,
          "--n-close-icon-color-hover": p,
          "--n-close-icon-color-pressed": h,
          "--n-line-height": E,
          "--n-icon-color": Y,
          "--n-close-margin": w,
          "--n-close-size": b,
          "--n-close-icon-size": D,
          "--n-width": S,
          "--n-padding-left": ze,
          "--n-padding-right": Qe,
          "--n-padding-top": Ue,
          "--n-padding-bottom": ct,
          "--n-title-font-size": ue,
          "--n-meta-font-size": le,
          "--n-description-font-size": X
        };
      }), a = n ? or("notification", Q(() => e.type[0]), s, r) : void 0;
      return {
        mergedClsPrefix: t,
        showAvatar: Q(() => e.avatar || e.type !== "default"),
        handleCloseClick() {
          e.onClose();
        },
        rtlEnabled: l,
        cssVars: n ? void 0 : s,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender
      };
    },
    render() {
      var e;
      const { mergedClsPrefix: t } = this;
      return (e = this.onRender) === null || e === void 0 || e.call(this), T("div", {
        class: [
          `${t}-notification-wrapper`,
          this.themeClass
        ],
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: this.cssVars
      }, T("div", {
        class: [
          `${t}-notification`,
          this.rtlEnabled && `${t}-notification--rtl`,
          this.themeClass,
          {
            [`${t}-notification--closable`]: this.closable,
            [`${t}-notification--show-avatar`]: this.showAvatar
          }
        ],
        style: this.cssVars
      }, this.showAvatar ? T("div", {
        class: `${t}-notification__avatar`
      }, this.avatar ? St(this.avatar) : this.type !== "default" ? T(Fi, {
        clsPrefix: t
      }, {
        default: () => ew[this.type]()
      }) : null) : null, this.closable ? T(Mi, {
        clsPrefix: t,
        class: `${t}-notification__close`,
        onClick: this.handleCloseClick
      }) : null, T("div", {
        ref: "bodyRef",
        class: `${t}-notification-main`
      }, this.title ? T("div", {
        class: `${t}-notification-main__header`
      }, St(this.title)) : null, this.description ? T("div", {
        class: `${t}-notification-main__description`
      }, St(this.description)) : null, this.content ? T("pre", {
        class: `${t}-notification-main__content`
      }, St(this.content)) : null, this.meta || this.action ? T("div", {
        class: `${t}-notification-main-footer`
      }, this.meta ? T("div", {
        class: `${t}-notification-main-footer__meta`
      }, St(this.meta)) : null, this.action ? T("div", {
        class: `${t}-notification-main-footer__action`
      }, St(this.action)) : null) : null)));
    }
  }), rw = Object.assign(Object.assign({}, zs), {
    duration: Number,
    onClose: Function,
    onLeave: Function,
    onAfterEnter: Function,
    onAfterLeave: Function,
    onHide: Function,
    onAfterShow: Function,
    onAfterHide: Function
  }), nw = we({
    name: "NotificationEnvironment",
    props: Object.assign(Object.assign({}, rw), {
      internalKey: {
        type: String,
        required: true
      },
      onInternalAfterLeave: {
        type: Function,
        required: true
      }
    }),
    setup(e) {
      const { wipTransitionCountRef: t } = Ee(ji), o = de(true);
      let r = null;
      function n() {
        o.value = false, r && window.clearTimeout(r);
      }
      function i(h) {
        t.value++, Zo(() => {
          h.style.height = `${h.offsetHeight}px`, h.style.maxHeight = "0", h.style.transition = "none", h.offsetHeight, h.style.transition = "", h.style.maxHeight = h.style.height;
        });
      }
      function l(h) {
        t.value--, h.style.height = "", h.style.maxHeight = "";
        const { onAfterEnter: g, onAfterShow: C } = e;
        g && g(), C && C();
      }
      function s(h) {
        t.value++, h.style.maxHeight = `${h.offsetHeight}px`, h.style.height = `${h.offsetHeight}px`, h.offsetHeight;
      }
      function a(h) {
        const { onHide: g } = e;
        g && g(), h.style.maxHeight = "0", h.offsetHeight;
      }
      function d() {
        t.value--;
        const { onAfterLeave: h, onInternalAfterLeave: g, onAfterHide: C, internalKey: x } = e;
        h && h(), g(x), C && C();
      }
      function c() {
        const { duration: h } = e;
        h && (r = window.setTimeout(n, h));
      }
      function u(h) {
        h.currentTarget === h.target && r !== null && (window.clearTimeout(r), r = null);
      }
      function f(h) {
        h.currentTarget === h.target && c();
      }
      function p() {
        const { onClose: h } = e;
        h ? Promise.resolve(h()).then((g) => {
          g !== false && n();
        }) : n();
      }
      return mo(() => {
        e.duration && (r = window.setTimeout(n, e.duration));
      }), {
        show: o,
        hide: n,
        handleClose: p,
        handleAfterLeave: d,
        handleLeave: a,
        handleBeforeLeave: s,
        handleAfterEnter: l,
        handleBeforeEnter: i,
        handleMouseenter: u,
        handleMouseleave: f
      };
    },
    render() {
      return T(Jo, {
        name: "notification-transition",
        appear: true,
        onBeforeEnter: this.handleBeforeEnter,
        onAfterEnter: this.handleAfterEnter,
        onBeforeLeave: this.handleBeforeLeave,
        onLeave: this.handleLeave,
        onAfterLeave: this.handleAfterLeave
      }, {
        default: () => this.show ? T(ow, Object.assign({}, gn(this.$props, tw), {
          onClose: this.handleClose,
          onMouseenter: this.duration && this.keepAliveOnHover ? this.handleMouseenter : void 0,
          onMouseleave: this.duration && this.keepAliveOnHover ? this.handleMouseleave : void 0
        })) : null
      });
    }
  }), iw = M([
    te("notification-container", `
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `, [
      M(">", [
        te("scrollbar", `
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
          M(">", [
            te("scrollbar-container", `
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
              te("scrollbar-content", `
 padding-top: 12px;
 padding-bottom: 33px;
 `)
            ])
          ])
        ])
      ]),
      ne("top, top-right, top-left", `
 top: 12px;
 `, [
        M("&.transitioning >", [
          te("scrollbar", [
            M(">", [
              te("scrollbar-container", `
 min-height: 100vh !important;
 `)
            ])
          ])
        ])
      ]),
      ne("bottom, bottom-right, bottom-left", `
 bottom: 12px;
 `, [
        M(">", [
          te("scrollbar", [
            M(">", [
              te("scrollbar-container", [
                te("scrollbar-content", `
 padding-bottom: 12px;
 `)
              ])
            ])
          ])
        ]),
        te("notification-wrapper", `
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)
      ]),
      ne("top, bottom", `
 left: 50%;
 transform: translateX(-50%);
 `, [
        te("notification-wrapper", [
          M("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: scale(0.85);
 `),
          M("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: scale(1);
 `)
        ])
      ]),
      ne("top", [
        te("notification-wrapper", `
 transform-origin: top center;
 `)
      ]),
      ne("bottom", [
        te("notification-wrapper", `
 transform-origin: bottom center;
 `)
      ]),
      ne("top-right, bottom-right", [
        te("notification", `
 margin-left: 28px;
 margin-right: 16px;
 `)
      ]),
      ne("top-left, bottom-left", [
        te("notification", `
 margin-left: 16px;
 margin-right: 28px;
 `)
      ]),
      ne("top-right", `
 right: 0;
 `, [
        Ln("top-right")
      ]),
      ne("top-left", `
 left: 0;
 `, [
        Ln("top-left")
      ]),
      ne("bottom-right", `
 right: 0;
 `, [
        Ln("bottom-right")
      ]),
      ne("bottom-left", `
 left: 0;
 `, [
        Ln("bottom-left")
      ]),
      ne("scrollable", [
        ne("top-right", `
 top: 0;
 `),
        ne("top-left", `
 top: 0;
 `),
        ne("bottom-right", `
 bottom: 0;
 `),
        ne("bottom-left", `
 bottom: 0;
 `)
      ]),
      te("notification-wrapper", `
 margin-bottom: 12px;
 `, [
        M("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),
        M("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 opacity: 1;
 `),
        M("&.notification-transition-leave-active", `
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),
        M("&.notification-transition-enter-active", `
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)
      ]),
      te("notification", `
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `, [
        re("avatar", [
          te("icon", `
 color: var(--n-icon-color);
 `),
          te("base-icon", `
 color: var(--n-icon-color);
 `)
        ]),
        ne("show-avatar", [
          te("notification-main", `
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)
        ]),
        ne("closable", [
          te("notification-main", [
            M("> *:first-child", `
 padding-right: 20px;
 `)
          ]),
          re("close", `
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)
        ]),
        re("avatar", `
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [
          te("icon", "transition: color .3s var(--n-bezier);")
        ]),
        te("notification-main", `
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `, [
          te("notification-main-footer", `
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `, [
            re("meta", `
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
            re("action", `
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)
          ]),
          re("header", `
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),
          re("description", `
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
          re("content", `
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `, [
            M("&:first-child", "margin: 0;")
          ])
        ])
      ])
    ])
  ]);
  function Ln(e) {
    const o = e.split("-")[1] === "left" ? "calc(-100%)" : "calc(100%)";
    return te("notification-wrapper", [
      M("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: translate(${o}, 0);
 `),
      M("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: translate(0, 0);
 `)
    ]);
  }
  const lw = "n-notification-api", sw = Object.assign(Object.assign({}, gt.props), {
    containerClass: String,
    containerStyle: [
      String,
      Object
    ],
    to: [
      String,
      Object
    ],
    scrollable: {
      type: Boolean,
      default: true
    },
    max: Number,
    placement: {
      type: String,
      default: "top-right"
    },
    keepAliveOnHover: Boolean
  }), aw = we({
    name: "NotificationProvider",
    props: sw,
    setup(e) {
      const { mergedClsPrefixRef: t } = bo(e), o = de([]), r = {}, n = /* @__PURE__ */ new Set();
      function i(p) {
        const h = $i(), g = () => {
          n.add(h), r[h] && r[h].hide();
        }, C = Oo(Object.assign(Object.assign({}, p), {
          key: h,
          destroy: g,
          hide: g,
          deactivate: g
        })), { max: x } = e;
        if (x && o.value.length - n.size >= x) {
          let y = false, _ = 0;
          for (const A of o.value) {
            if (!n.has(A.key)) {
              r[A.key] && (A.destroy(), y = true);
              break;
            }
            _++;
          }
          y || o.value.splice(_, 1);
        }
        return o.value.push(C), C;
      }
      const l = [
        "info",
        "success",
        "warning",
        "error"
      ].map((p) => (h) => i(Object.assign(Object.assign({}, h), {
        type: p
      })));
      function s(p) {
        n.delete(p), o.value.splice(o.value.findIndex((h) => h.key === p), 1);
      }
      const a = gt("Notification", "-notification", iw, Z1, e, t), d = {
        create: i,
        info: l[0],
        success: l[1],
        warning: l[2],
        error: l[3],
        open: u,
        destroyAll: f
      }, c = de(0);
      tt(lw, d), tt(ji, {
        props: e,
        mergedClsPrefixRef: t,
        mergedThemeRef: a,
        wipTransitionCountRef: c
      });
      function u(p) {
        return i(p);
      }
      function f() {
        Object.values(o.value).forEach((p) => {
          p.hide();
        });
      }
      return Object.assign({
        mergedClsPrefix: t,
        notificationList: o,
        notificationRefs: r,
        handleAfterLeave: s
      }, d);
    },
    render() {
      var e, t, o;
      const { placement: r } = this;
      return T(We, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.notificationList.length ? T(ns, {
        to: (o = this.to) !== null && o !== void 0 ? o : "body"
      }, T(J1, {
        class: this.containerClass,
        style: this.containerStyle,
        scrollable: this.scrollable && r !== "top" && r !== "bottom",
        placement: r
      }, {
        default: () => this.notificationList.map((n) => T(nw, Object.assign({
          ref: (i) => {
            const l = n.key;
            i === null ? delete this.notificationRefs[l] : this.notificationRefs[l] = i;
          }
        }, bs(n, [
          "destroy",
          "hide",
          "deactivate"
        ]), {
          internalKey: n.key,
          onInternalAfterLeave: this.handleAfterLeave,
          keepAliveOnHover: n.keepAliveOnHover === void 0 ? this.keepAliveOnHover : n.keepAliveOnHover
        })))
      })) : null);
    }
  });
  function cw(e) {
    const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
    return {
      textColor: t,
      color: o,
      fontWeight: r
    };
  }
  const dw = {
    name: "Divider",
    common: k,
    self: cw
  };
  function uw(e) {
    const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: l, dividerColor: s, closeColorHover: a, closeColorPressed: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: f, borderRadius: p, primaryColorHover: h } = e;
    return {
      bodyPadding: "16px 24px",
      borderRadius: p,
      headerPadding: "16px 24px",
      footerPadding: "16px 24px",
      color: t,
      textColor: r,
      titleTextColor: o,
      titleFontSize: "18px",
      titleFontWeight: l,
      boxShadow: n,
      lineHeight: i,
      headerBorderBottom: `1px solid ${s}`,
      footerBorderTop: `1px solid ${s}`,
      closeIconColor: c,
      closeIconColorHover: u,
      closeIconColorPressed: f,
      closeSize: "22px",
      closeIconSize: "18px",
      closeColorHover: a,
      closeColorPressed: d,
      closeBorderRadius: p,
      resizableTriggerColorHover: h
    };
  }
  const fw = {
    name: "Drawer",
    common: k,
    peers: {
      Scrollbar: at
    },
    self: uw
  }, pw = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, hw = {
    name: "DynamicInput",
    common: k,
    peers: {
      Input: _t,
      Button: yt
    },
    self() {
      return pw;
    }
  }, gw = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, Sp = {
    name: "Space",
    self() {
      return gw;
    }
  }, mw = {
    name: "DynamicTags",
    common: k,
    peers: {
      Input: _t,
      Button: yt,
      Tag: Df,
      Space: Sp
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, bw = {
    name: "Element",
    common: k
  }, vw = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, xw = {
    name: "Flex",
    self() {
      return vw;
    }
  }, Cw = {
    name: "ButtonGroup",
    common: k
  }, yw = {
    feedbackPadding: "4px 0 0 2px",
    feedbackHeightSmall: "24px",
    feedbackHeightMedium: "24px",
    feedbackHeightLarge: "26px",
    feedbackFontSizeSmall: "13px",
    feedbackFontSizeMedium: "14px",
    feedbackFontSizeLarge: "14px",
    labelFontSizeLeftSmall: "14px",
    labelFontSizeLeftMedium: "14px",
    labelFontSizeLeftLarge: "15px",
    labelFontSizeTopSmall: "13px",
    labelFontSizeTopMedium: "14px",
    labelFontSizeTopLarge: "14px",
    labelHeightSmall: "24px",
    labelHeightMedium: "26px",
    labelHeightLarge: "28px",
    labelPaddingVertical: "0 0 6px 2px",
    labelPaddingHorizontal: "0 12px 0 0",
    labelTextAlignVertical: "left",
    labelTextAlignHorizontal: "right",
    labelFontWeight: "400"
  };
  function wp(e) {
    const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: s, textColor3: a } = e;
    return Object.assign(Object.assign({}, yw), {
      blankHeightSmall: t,
      blankHeightMedium: o,
      blankHeightLarge: r,
      lineHeight: s,
      labelTextColor: n,
      asteriskColor: i,
      feedbackTextColorError: i,
      feedbackTextColorWarning: l,
      feedbackTextColor: a
    });
  }
  let Sw, ww, Pw;
  aP = {
    common: Ie,
    self: wp
  };
  Sw = {
    name: "Form",
    common: k,
    self: wp
  };
  ww = {
    name: "GradientText",
    common: k,
    self(e) {
      const { primaryColor: t, successColor: o, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: l, successColorSuppl: s, warningColorSuppl: a, errorColorSuppl: d, infoColorSuppl: c, fontWeightStrong: u } = e;
      return {
        fontWeight: u,
        rotate: "252deg",
        colorStartPrimary: t,
        colorEndPrimary: l,
        colorStartInfo: i,
        colorEndInfo: c,
        colorStartWarning: r,
        colorEndWarning: a,
        colorStartError: n,
        colorEndError: d,
        colorStartSuccess: o,
        colorEndSuccess: s
      };
    }
  };
  Pw = {
    name: "InputNumber",
    common: k,
    peers: {
      Button: yt,
      Input: _t
    },
    self(e) {
      const { textColorDisabled: t } = e;
      return {
        iconColorDisabled: t
      };
    }
  };
  function Tw() {
    return {
      inputWidthSmall: "24px",
      inputWidthMedium: "30px",
      inputWidthLarge: "36px",
      gapSmall: "8px",
      gapMedium: "8px",
      gapLarge: "8px"
    };
  }
  const Ew = {
    name: "InputOtp",
    common: k,
    peers: {
      Input: _t
    },
    self: Tw
  }, _w = {
    name: "Layout",
    common: k,
    peers: {
      Scrollbar: at
    },
    self(e) {
      const { textColor2: t, bodyColor: o, popoverColor: r, cardColor: n, dividerColor: i, scrollbarColor: l, scrollbarColorHover: s } = e;
      return {
        textColor: t,
        textColorInverted: t,
        color: o,
        colorEmbedded: o,
        headerColor: n,
        headerColorInverted: n,
        footerColor: n,
        footerColorInverted: n,
        headerBorderColor: i,
        headerBorderColorInverted: i,
        footerBorderColor: i,
        footerBorderColorInverted: i,
        siderBorderColor: i,
        siderBorderColorInverted: i,
        siderColor: n,
        siderColorInverted: n,
        siderToggleButtonBorder: "1px solid transparent",
        siderToggleButtonColor: r,
        siderToggleButtonIconColor: t,
        siderToggleButtonIconColorInverted: t,
        siderToggleBarColor: oe(o, l),
        siderToggleBarColorHover: oe(o, s),
        __invertScrollbar: "false"
      };
    }
  }, Rw = {
    name: "Row",
    common: k
  };
  function $w(e) {
    const { textColor2: t, cardColor: o, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: l, fontSize: s, hoverColor: a } = e;
    return {
      textColor: t,
      color: o,
      colorHover: a,
      colorModal: r,
      colorHoverModal: oe(r, a),
      colorPopover: n,
      colorHoverPopover: oe(n, a),
      borderColor: i,
      borderColorModal: oe(r, i),
      borderColorPopover: oe(n, i),
      borderRadius: l,
      fontSize: s
    };
  }
  const Aw = {
    name: "List",
    common: k,
    self: $w
  }, Iw = {
    name: "Log",
    common: k,
    peers: {
      Scrollbar: at,
      Code: Kf
    },
    self(e) {
      const { textColor2: t, inputColor: o, fontSize: r, primaryColor: n } = e;
      return {
        loaderFontSize: r,
        loaderTextColor: t,
        loaderColor: o,
        loaderBorder: "1px solid #0000",
        loadingColor: n
      };
    }
  }, zw = {
    name: "Mention",
    common: k,
    peers: {
      InternalSelectMenu: Pn,
      Input: _t
    },
    self(e) {
      const { boxShadow2: t } = e;
      return {
        menuBoxShadow: t
      };
    }
  };
  function Hw(e, t, o, r) {
    return {
      itemColorHoverInverted: "#0000",
      itemColorActiveInverted: t,
      itemColorActiveHoverInverted: t,
      itemColorActiveCollapsedInverted: t,
      itemTextColorInverted: e,
      itemTextColorHoverInverted: o,
      itemTextColorChildActiveInverted: o,
      itemTextColorChildActiveHoverInverted: o,
      itemTextColorActiveInverted: o,
      itemTextColorActiveHoverInverted: o,
      itemTextColorHorizontalInverted: e,
      itemTextColorHoverHorizontalInverted: o,
      itemTextColorChildActiveHorizontalInverted: o,
      itemTextColorChildActiveHoverHorizontalInverted: o,
      itemTextColorActiveHorizontalInverted: o,
      itemTextColorActiveHoverHorizontalInverted: o,
      itemIconColorInverted: e,
      itemIconColorHoverInverted: o,
      itemIconColorActiveInverted: o,
      itemIconColorActiveHoverInverted: o,
      itemIconColorChildActiveInverted: o,
      itemIconColorChildActiveHoverInverted: o,
      itemIconColorCollapsedInverted: e,
      itemIconColorHorizontalInverted: e,
      itemIconColorHoverHorizontalInverted: o,
      itemIconColorActiveHorizontalInverted: o,
      itemIconColorActiveHoverHorizontalInverted: o,
      itemIconColorChildActiveHorizontalInverted: o,
      itemIconColorChildActiveHoverHorizontalInverted: o,
      arrowColorInverted: e,
      arrowColorHoverInverted: o,
      arrowColorActiveInverted: o,
      arrowColorActiveHoverInverted: o,
      arrowColorChildActiveInverted: o,
      arrowColorChildActiveHoverInverted: o,
      groupTextColorInverted: r
    };
  }
  function Pp(e) {
    const { borderRadius: t, textColor3: o, primaryColor: r, textColor2: n, textColor1: i, fontSize: l, dividerColor: s, hoverColor: a, primaryColorHover: d } = e;
    return Object.assign({
      borderRadius: t,
      color: "#0000",
      groupTextColor: o,
      itemColorHover: a,
      itemColorActive: G(r, {
        alpha: 0.1
      }),
      itemColorActiveHover: G(r, {
        alpha: 0.1
      }),
      itemColorActiveCollapsed: G(r, {
        alpha: 0.1
      }),
      itemTextColor: n,
      itemTextColorHover: n,
      itemTextColorActive: r,
      itemTextColorActiveHover: r,
      itemTextColorChildActive: r,
      itemTextColorChildActiveHover: r,
      itemTextColorHorizontal: n,
      itemTextColorHoverHorizontal: d,
      itemTextColorActiveHorizontal: r,
      itemTextColorActiveHoverHorizontal: r,
      itemTextColorChildActiveHorizontal: r,
      itemTextColorChildActiveHoverHorizontal: r,
      itemIconColor: i,
      itemIconColorHover: i,
      itemIconColorActive: r,
      itemIconColorActiveHover: r,
      itemIconColorChildActive: r,
      itemIconColorChildActiveHover: r,
      itemIconColorCollapsed: i,
      itemIconColorHorizontal: i,
      itemIconColorHoverHorizontal: d,
      itemIconColorActiveHorizontal: r,
      itemIconColorActiveHoverHorizontal: r,
      itemIconColorChildActiveHorizontal: r,
      itemIconColorChildActiveHoverHorizontal: r,
      itemHeight: "42px",
      arrowColor: n,
      arrowColorHover: n,
      arrowColorActive: r,
      arrowColorActiveHover: r,
      arrowColorChildActive: r,
      arrowColorChildActiveHover: r,
      colorInverted: "#0000",
      borderColorHorizontal: "#0000",
      fontSize: l,
      dividerColor: s
    }, Hw("#BBB", r, "#FFF", "#AAA"));
  }
  let Ow, Bw;
  cP = {
    name: "Menu",
    common: Ie,
    peers: {
      Tooltip: op,
      Dropdown: ep
    },
    self: Pp
  };
  Ow = {
    name: "Menu",
    common: k,
    peers: {
      Tooltip: Li,
      Dropdown: As
    },
    self(e) {
      const { primaryColor: t, primaryColorSuppl: o } = e, r = Pp(e);
      return r.itemColorActive = G(t, {
        alpha: 0.15
      }), r.itemColorActiveHover = G(t, {
        alpha: 0.15
      }), r.itemColorActiveCollapsed = G(t, {
        alpha: 0.15
      }), r.itemColorActiveInverted = o, r.itemColorActiveHoverInverted = o, r.itemColorActiveCollapsedInverted = o, r;
    }
  };
  Bw = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function Fw(e) {
    const { textColor1: t, textColor2: o, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: s } = e;
    return Object.assign(Object.assign({}, Bw), {
      titleFontWeight: i,
      fontSize: n,
      titleTextColor: t,
      backColor: o,
      backColorHover: l,
      backColorPressed: s,
      subtitleTextColor: r
    });
  }
  const Mw = {
    name: "PageHeader",
    common: k,
    self: Fw
  }, Dw = {
    iconSize: "22px"
  };
  function Lw(e) {
    const { fontSize: t, warningColor: o } = e;
    return Object.assign(Object.assign({}, Dw), {
      fontSize: t,
      iconColor: o
    });
  }
  const kw = {
    name: "Popconfirm",
    common: k,
    peers: {
      Button: yt,
      Popover: ir
    },
    self: Lw
  };
  function jw(e) {
    const { infoColor: t, successColor: o, warningColor: r, errorColor: n, textColor2: i, progressRailColor: l, fontSize: s, fontWeight: a } = e;
    return {
      fontSize: s,
      fontSizeCircle: "28px",
      fontWeightCircle: a,
      railColor: l,
      railHeight: "8px",
      iconSizeCircle: "36px",
      iconSizeLine: "18px",
      iconColor: t,
      iconColorInfo: t,
      iconColorSuccess: o,
      iconColorWarning: r,
      iconColorError: n,
      textColorCircle: i,
      textColorLineInner: "rgb(255, 255, 255)",
      textColorLineOuter: i,
      fillColor: t,
      fillColorInfo: t,
      fillColorSuccess: o,
      fillColorWarning: r,
      fillColorError: n,
      lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
    };
  }
  const Tp = {
    name: "Progress",
    common: k,
    self(e) {
      const t = jw(e);
      return t.textColorLineInner = "rgb(0, 0, 0)", t.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", t;
    }
  }, Ww = {
    name: "Rate",
    common: k,
    self(e) {
      const { railColor: t } = e;
      return {
        itemColor: t,
        itemColorActive: "#CCAA33",
        itemSize: "20px",
        sizeSmall: "16px",
        sizeMedium: "20px",
        sizeLarge: "24px"
      };
    }
  }, Nw = {
    titleFontSizeSmall: "26px",
    titleFontSizeMedium: "32px",
    titleFontSizeLarge: "40px",
    titleFontSizeHuge: "48px",
    fontSizeSmall: "14px",
    fontSizeMedium: "14px",
    fontSizeLarge: "15px",
    fontSizeHuge: "16px",
    iconSizeSmall: "64px",
    iconSizeMedium: "80px",
    iconSizeLarge: "100px",
    iconSizeHuge: "125px",
    iconColor418: void 0,
    iconColor404: void 0,
    iconColor403: void 0,
    iconColor500: void 0
  };
  function Vw(e) {
    const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: s, fontWeightStrong: a } = e;
    return Object.assign(Object.assign({}, Nw), {
      lineHeight: s,
      titleFontWeight: a,
      titleTextColor: o,
      textColor: t,
      iconColorError: r,
      iconColorSuccess: n,
      iconColorInfo: i,
      iconColorWarning: l
    });
  }
  const Gw = {
    name: "Result",
    common: k,
    self: Vw
  }, Uw = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, Kw = {
    name: "Slider",
    common: k,
    self(e) {
      const t = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: o, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: s, borderRadius: a, fontSize: d, opacityDisabled: c } = e;
      return Object.assign(Object.assign({}, Uw), {
        fontSize: d,
        markFontSize: d,
        railColor: o,
        railColorHover: o,
        fillColor: n,
        fillColorHover: n,
        opacityDisabled: c,
        handleColor: "#FFF",
        dotColor: s,
        dotColorModal: r,
        dotColorPopover: i,
        handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
        handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
        handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
        handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
        indicatorColor: i,
        indicatorBoxShadow: t,
        indicatorTextColor: l,
        indicatorBorderRadius: a,
        dotBorder: `2px solid ${o}`,
        dotBorderActive: `2px solid ${n}`,
        dotBoxShadow: ""
      });
    }
  };
  function Ep(e) {
    const { opacityDisabled: t, heightTiny: o, heightSmall: r, heightMedium: n, heightLarge: i, heightHuge: l, primaryColor: s, fontSize: a } = e;
    return {
      fontSize: a,
      textColor: s,
      sizeTiny: o,
      sizeSmall: r,
      sizeMedium: n,
      sizeLarge: i,
      sizeHuge: l,
      color: s,
      opacitySpinning: t
    };
  }
  let qw;
  dP = {
    common: Ie,
    self: Ep
  };
  qw = {
    name: "Spin",
    common: k,
    self: Ep
  };
  function _p(e) {
    const { textColor2: t, textColor3: o, fontSize: r, fontWeight: n } = e;
    return {
      labelFontSize: r,
      labelFontWeight: n,
      valueFontWeight: n,
      valueFontSize: "24px",
      labelTextColor: o,
      valuePrefixTextColor: t,
      valueSuffixTextColor: t,
      valueTextColor: t
    };
  }
  let Xw, Yw;
  uP = {
    common: Ie,
    self: _p
  };
  Xw = {
    name: "Statistic",
    common: k,
    self: _p
  };
  Yw = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  };
  function Zw(e) {
    const { fontWeightStrong: t, baseColor: o, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: s } = e;
    return Object.assign(Object.assign({}, Yw), {
      stepHeaderFontWeight: t,
      indicatorTextColorProcess: o,
      indicatorTextColorWait: r,
      indicatorTextColorFinish: n,
      indicatorTextColorError: i,
      indicatorBorderColorProcess: n,
      indicatorBorderColorWait: r,
      indicatorBorderColorFinish: n,
      indicatorBorderColorError: i,
      indicatorColorProcess: n,
      indicatorColorWait: "#0000",
      indicatorColorFinish: "#0000",
      indicatorColorError: "#0000",
      splitorColorProcess: r,
      splitorColorWait: r,
      splitorColorFinish: n,
      splitorColorError: r,
      headerTextColorProcess: l,
      headerTextColorWait: r,
      headerTextColorFinish: r,
      headerTextColorError: i,
      descriptionTextColorProcess: s,
      descriptionTextColorWait: r,
      descriptionTextColorFinish: r,
      descriptionTextColorError: i
    });
  }
  let Qw, e2, t2;
  Qw = {
    name: "Steps",
    common: k,
    self: Zw
  };
  Jw = {
    buttonHeightSmall: "14px",
    buttonHeightMedium: "18px",
    buttonHeightLarge: "22px",
    buttonWidthSmall: "14px",
    buttonWidthMedium: "18px",
    buttonWidthLarge: "22px",
    buttonWidthPressedSmall: "20px",
    buttonWidthPressedMedium: "24px",
    buttonWidthPressedLarge: "28px",
    railHeightSmall: "18px",
    railHeightMedium: "22px",
    railHeightLarge: "26px",
    railWidthSmall: "32px",
    railWidthMedium: "40px",
    railWidthLarge: "48px"
  };
  e2 = {
    name: "Switch",
    common: k,
    self(e) {
      const { primaryColorSuppl: t, opacityDisabled: o, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e;
      return Object.assign(Object.assign({}, Jw), {
        iconColor: l,
        textColor: i,
        loadingColor: t,
        opacityDisabled: o,
        railColor: "rgba(255, 255, 255, .20)",
        railColorActive: t,
        buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
        buttonColor: "#FFF",
        railBorderRadiusSmall: r,
        railBorderRadiusMedium: r,
        railBorderRadiusLarge: r,
        buttonBorderRadiusSmall: r,
        buttonBorderRadiusMedium: r,
        buttonBorderRadiusLarge: r,
        boxShadowFocus: `0 0 8px 0 ${G(n, {
          alpha: 0.3
        })}`
      });
    }
  };
  t2 = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  };
  function o2(e) {
    const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: s, textColor2: a, borderRadius: d, fontWeightStrong: c, lineHeight: u, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: h } = e;
    return Object.assign(Object.assign({}, t2), {
      fontSizeSmall: f,
      fontSizeMedium: p,
      fontSizeLarge: h,
      lineHeight: u,
      borderRadius: d,
      borderColor: oe(o, t),
      borderColorModal: oe(r, t),
      borderColorPopover: oe(n, t),
      tdColor: o,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: oe(o, l),
      tdColorStripedModal: oe(r, l),
      tdColorStripedPopover: oe(n, l),
      thColor: oe(o, i),
      thColorModal: oe(r, i),
      thColorPopover: oe(n, i),
      thTextColor: s,
      tdTextColor: a,
      thFontWeight: c
    });
  }
  const r2 = {
    name: "Table",
    common: k,
    self: o2
  }, n2 = {
    tabFontSizeSmall: "14px",
    tabFontSizeMedium: "14px",
    tabFontSizeLarge: "16px",
    tabGapSmallLine: "36px",
    tabGapMediumLine: "36px",
    tabGapLargeLine: "36px",
    tabGapSmallLineVertical: "8px",
    tabGapMediumLineVertical: "8px",
    tabGapLargeLineVertical: "8px",
    tabPaddingSmallLine: "6px 0",
    tabPaddingMediumLine: "10px 0",
    tabPaddingLargeLine: "14px 0",
    tabPaddingVerticalSmallLine: "6px 12px",
    tabPaddingVerticalMediumLine: "8px 16px",
    tabPaddingVerticalLargeLine: "10px 20px",
    tabGapSmallBar: "36px",
    tabGapMediumBar: "36px",
    tabGapLargeBar: "36px",
    tabGapSmallBarVertical: "8px",
    tabGapMediumBarVertical: "8px",
    tabGapLargeBarVertical: "8px",
    tabPaddingSmallBar: "4px 0",
    tabPaddingMediumBar: "6px 0",
    tabPaddingLargeBar: "10px 0",
    tabPaddingVerticalSmallBar: "6px 12px",
    tabPaddingVerticalMediumBar: "8px 16px",
    tabPaddingVerticalLargeBar: "10px 20px",
    tabGapSmallCard: "4px",
    tabGapMediumCard: "4px",
    tabGapLargeCard: "4px",
    tabGapSmallCardVertical: "4px",
    tabGapMediumCardVertical: "4px",
    tabGapLargeCardVertical: "4px",
    tabPaddingSmallCard: "8px 16px",
    tabPaddingMediumCard: "10px 20px",
    tabPaddingLargeCard: "12px 24px",
    tabPaddingSmallSegment: "4px 0",
    tabPaddingMediumSegment: "6px 0",
    tabPaddingLargeSegment: "8px 0",
    tabPaddingVerticalLargeSegment: "0 8px",
    tabPaddingVerticalSmallCard: "8px 12px",
    tabPaddingVerticalMediumCard: "10px 16px",
    tabPaddingVerticalLargeCard: "12px 20px",
    tabPaddingVerticalSmallSegment: "0 4px",
    tabPaddingVerticalMediumSegment: "0 6px",
    tabGapSmallSegment: "0",
    tabGapMediumSegment: "0",
    tabGapLargeSegment: "0",
    tabGapSmallSegmentVertical: "0",
    tabGapMediumSegmentVertical: "0",
    tabGapLargeSegmentVertical: "0",
    panePaddingSmall: "8px 0 0 0",
    panePaddingMedium: "12px 0 0 0",
    panePaddingLarge: "16px 0 0 0",
    closeSize: "18px",
    closeIconSize: "14px"
  };
  function i2(e) {
    const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: s, closeColorPressed: a, tabColor: d, baseColor: c, dividerColor: u, fontWeight: f, textColor1: p, borderRadius: h, fontSize: g, fontWeightStrong: C } = e;
    return Object.assign(Object.assign({}, n2), {
      colorSegment: d,
      tabFontSizeCard: g,
      tabTextColorLine: p,
      tabTextColorActiveLine: o,
      tabTextColorHoverLine: o,
      tabTextColorDisabledLine: r,
      tabTextColorSegment: p,
      tabTextColorActiveSegment: t,
      tabTextColorHoverSegment: t,
      tabTextColorDisabledSegment: r,
      tabTextColorBar: p,
      tabTextColorActiveBar: o,
      tabTextColorHoverBar: o,
      tabTextColorDisabledBar: r,
      tabTextColorCard: p,
      tabTextColorHoverCard: p,
      tabTextColorActiveCard: o,
      tabTextColorDisabledCard: r,
      barColor: o,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: l,
      closeColorHover: s,
      closeColorPressed: a,
      closeBorderRadius: h,
      tabColor: d,
      tabColorSegment: c,
      tabBorderColor: u,
      tabFontWeightActive: f,
      tabFontWeight: f,
      tabBorderRadius: h,
      paneTextColor: t,
      fontWeightStrong: C
    });
  }
  const l2 = {
    name: "Tabs",
    common: k,
    self(e) {
      const t = i2(e), { inputColor: o } = e;
      return t.colorSegment = o, t.tabColorSegment = o, t;
    }
  };
  function s2(e) {
    const { textColor1: t, textColor2: o, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: t,
      textColor: o,
      titleFontWeight: r
    };
  }
  const a2 = {
    name: "Thing",
    common: k,
    self: s2
  }, c2 = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, d2 = {
    name: "Timeline",
    common: k,
    self(e) {
      const { textColor3: t, infoColorSuppl: o, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: s, railColor: a, fontWeightStrong: d, fontSize: c } = e;
      return Object.assign(Object.assign({}, c2), {
        contentFontSize: c,
        titleFontWeight: d,
        circleBorder: `2px solid ${t}`,
        circleBorderInfo: `2px solid ${o}`,
        circleBorderError: `2px solid ${r}`,
        circleBorderSuccess: `2px solid ${n}`,
        circleBorderWarning: `2px solid ${i}`,
        iconColor: t,
        iconColorInfo: o,
        iconColorError: r,
        iconColorSuccess: n,
        iconColorWarning: i,
        titleTextColor: l,
        contentTextColor: s,
        metaTextColor: t,
        lineColor: a
      });
    }
  }, u2 = {
    extraFontSizeSmall: "12px",
    extraFontSizeMedium: "12px",
    extraFontSizeLarge: "14px",
    titleFontSizeSmall: "14px",
    titleFontSizeMedium: "16px",
    titleFontSizeLarge: "16px",
    closeSize: "20px",
    closeIconSize: "16px",
    headerHeightSmall: "44px",
    headerHeightMedium: "44px",
    headerHeightLarge: "50px"
  }, f2 = {
    name: "Transfer",
    common: k,
    peers: {
      Checkbox: Ir,
      Scrollbar: at,
      Input: _t,
      Empty: nr,
      Button: yt
    },
    self(e) {
      const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: s, inputColor: a, tableHeaderColor: d, textColor1: c, textColorDisabled: u, textColor2: f, textColor3: p, hoverColor: h, closeColorHover: g, closeColorPressed: C, closeIconColor: x, closeIconColorHover: y, closeIconColorPressed: _, dividerColor: A } = e;
      return Object.assign(Object.assign({}, u2), {
        itemHeightSmall: l,
        itemHeightMedium: l,
        itemHeightLarge: i,
        fontSizeSmall: n,
        fontSizeMedium: r,
        fontSizeLarge: o,
        borderRadius: s,
        dividerColor: A,
        borderColor: "#0000",
        listColor: a,
        headerColor: d,
        titleTextColor: c,
        titleTextColorDisabled: u,
        extraTextColor: p,
        extraTextColorDisabled: u,
        itemTextColor: f,
        itemTextColorDisabled: u,
        itemColorPending: h,
        titleFontWeight: t,
        closeColorHover: g,
        closeColorPressed: C,
        closeIconColor: x,
        closeIconColorHover: y,
        closeIconColorPressed: _
      });
    }
  };
  function p2(e) {
    const { borderRadiusSmall: t, dividerColor: o, hoverColor: r, pressedColor: n, primaryColor: i, textColor3: l, textColor2: s, textColorDisabled: a, fontSize: d } = e;
    return {
      fontSize: d,
      lineHeight: "1.5",
      nodeHeight: "30px",
      nodeWrapperPadding: "3px 0",
      nodeBorderRadius: t,
      nodeColorHover: r,
      nodeColorPressed: n,
      nodeColorActive: G(i, {
        alpha: 0.1
      }),
      arrowColor: l,
      nodeTextColor: s,
      nodeTextColorDisabled: a,
      loadingColor: i,
      dropMarkColor: i,
      lineColor: o
    };
  }
  const Rp = {
    name: "Tree",
    common: k,
    peers: {
      Checkbox: Ir,
      Scrollbar: at,
      Empty: nr
    },
    self(e) {
      const { primaryColor: t } = e, o = p2(e);
      return o.nodeColorActive = G(t, {
        alpha: 0.15
      }), o;
    }
  }, h2 = {
    name: "TreeSelect",
    common: k,
    peers: {
      Tree: Rp,
      Empty: nr,
      InternalSelection: _s
    }
  }, g2 = {
    headerFontSize1: "30px",
    headerFontSize2: "22px",
    headerFontSize3: "18px",
    headerFontSize4: "16px",
    headerFontSize5: "16px",
    headerFontSize6: "16px",
    headerMargin1: "28px 0 20px 0",
    headerMargin2: "28px 0 20px 0",
    headerMargin3: "28px 0 20px 0",
    headerMargin4: "28px 0 18px 0",
    headerMargin5: "28px 0 18px 0",
    headerMargin6: "28px 0 18px 0",
    headerPrefixWidth1: "16px",
    headerPrefixWidth2: "16px",
    headerPrefixWidth3: "12px",
    headerPrefixWidth4: "12px",
    headerPrefixWidth5: "12px",
    headerPrefixWidth6: "12px",
    headerBarWidth1: "4px",
    headerBarWidth2: "4px",
    headerBarWidth3: "3px",
    headerBarWidth4: "3px",
    headerBarWidth5: "3px",
    headerBarWidth6: "3px",
    pMargin: "16px 0 16px 0",
    liMargin: ".25em 0 0 0",
    olPadding: "0 0 0 2em",
    ulPadding: "0 0 0 2em"
  };
  function m2(e) {
    const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: l, dividerColor: s, fontWeightStrong: a, textColor1: d, textColor3: c, infoColor: u, warningColor: f, errorColor: p, successColor: h, codeColor: g } = e;
    return Object.assign(Object.assign({}, g2), {
      aTextColor: t,
      blockquoteTextColor: o,
      blockquotePrefixColor: r,
      blockquoteLineHeight: n,
      blockquoteFontSize: i,
      codeBorderRadius: l,
      liTextColor: o,
      liLineHeight: n,
      liFontSize: i,
      hrColor: s,
      headerFontWeight: a,
      headerTextColor: d,
      pTextColor: o,
      pTextColor1Depth: d,
      pTextColor2Depth: o,
      pTextColor3Depth: c,
      pLineHeight: n,
      pFontSize: i,
      headerBarColor: t,
      headerBarColorPrimary: t,
      headerBarColorInfo: u,
      headerBarColorError: p,
      headerBarColorWarning: f,
      headerBarColorSuccess: h,
      textColor: o,
      textColor1Depth: d,
      textColor2Depth: o,
      textColor3Depth: c,
      textColorPrimary: t,
      textColorInfo: u,
      textColorSuccess: h,
      textColorWarning: f,
      textColorError: p,
      codeTextColor: o,
      codeColor: g,
      codeBorder: "1px solid #0000"
    });
  }
  const b2 = {
    name: "Typography",
    common: k,
    self: m2
  };
  function v2(e) {
    const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: l, actionColor: s, borderColor: a, hoverColor: d, lineHeight: c, borderRadius: u, fontSize: f } = e;
    return {
      fontSize: f,
      lineHeight: c,
      borderRadius: u,
      draggerColor: s,
      draggerBorder: `1px dashed ${a}`,
      draggerBorderHover: `1px dashed ${o}`,
      itemColorHover: d,
      itemColorHoverError: G(r, {
        alpha: 0.06
      }),
      itemTextColor: n,
      itemTextColorError: r,
      itemTextColorSuccess: i,
      itemIconColor: t,
      itemDisabledOpacity: l,
      itemBorderImageCardError: `1px solid ${r}`,
      itemBorderImageCard: `1px solid ${a}`
    };
  }
  const x2 = {
    name: "Upload",
    common: k,
    peers: {
      Button: yt,
      Progress: Tp
    },
    self(e) {
      const { errorColor: t } = e, o = v2(e);
      return o.itemColorHoverError = G(t, {
        alpha: 0.09
      }), o;
    }
  }, C2 = {
    name: "Watermark",
    common: k,
    self(e) {
      const { fontFamily: t } = e;
      return {
        fontFamily: t
      };
    }
  }, y2 = {
    name: "FloatButton",
    common: k,
    self(e) {
      const { popoverColor: t, textColor2: o, buttonColor2Hover: r, buttonColor2Pressed: n, primaryColor: i, primaryColorHover: l, primaryColorPressed: s, baseColor: a, borderRadius: d } = e;
      return {
        color: t,
        textColor: o,
        boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
        boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
        boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)",
        colorHover: r,
        colorPressed: n,
        colorPrimary: i,
        colorPrimaryHover: l,
        colorPrimaryPressed: s,
        textColorPrimary: a,
        borderRadiusSquare: d
      };
    }
  };
  function S2(e) {
    const { borderRadius: t, fontSizeMini: o, fontSizeTiny: r, fontSizeSmall: n, fontWeight: i, textColor2: l, cardColor: s, buttonColor2Hover: a } = e;
    return {
      activeColors: [
        "#9be9a8",
        "#40c463",
        "#30a14e",
        "#216e39"
      ],
      borderRadius: t,
      borderColor: s,
      textColor: l,
      mininumColor: a,
      fontWeight: i,
      loadingColorStart: "rgba(0, 0, 0, 0.06)",
      loadingColorEnd: "rgba(0, 0, 0, 0.12)",
      rectSizeSmall: "10px",
      rectSizeMedium: "11px",
      rectSizeLarge: "12px",
      borderRadiusSmall: "2px",
      borderRadiusMedium: "2px",
      borderRadiusLarge: "2px",
      xGapSmall: "2px",
      xGapMedium: "3px",
      xGapLarge: "3px",
      yGapSmall: "2px",
      yGapMedium: "3px",
      yGapLarge: "3px",
      fontSizeSmall: r,
      fontSizeMedium: o,
      fontSizeLarge: n
    };
  }
  const w2 = {
    name: "Heatmap",
    common: k,
    self(e) {
      const t = S2(e);
      return Object.assign(Object.assign({}, t), {
        activeColors: [
          "#0d4429",
          "#006d32",
          "#26a641",
          "#39d353"
        ],
        mininumColor: "rgba(255, 255, 255, 0.1)",
        loadingColorStart: "rgba(255, 255, 255, 0.12)",
        loadingColorEnd: "rgba(255, 255, 255, 0.18)"
      });
    }
  };
  function P2(e) {
    const { primaryColor: t, baseColor: o } = e;
    return {
      color: t,
      iconColor: o
    };
  }
  const T2 = {
    name: "IconWrapper",
    common: k,
    self: P2
  }, E2 = {
    name: "Image",
    common: k,
    peers: {
      Tooltip: Li
    },
    self: (e) => {
      const { textColor2: t } = e;
      return {
        toolbarIconColor: t,
        toolbarColor: "rgba(0, 0, 0, .35)",
        toolbarBoxShadow: "none",
        toolbarBorderRadius: "24px"
      };
    }
  }, _2 = {
    extraFontSize: "12px",
    width: "440px"
  }, R2 = {
    name: "Transfer",
    common: k,
    peers: {
      Checkbox: Ir,
      Scrollbar: at,
      Input: _t,
      Empty: nr,
      Button: yt
    },
    self(e) {
      const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: s, heightMedium: a, heightSmall: d, borderRadius: c, inputColor: u, tableHeaderColor: f, textColor1: p, textColorDisabled: h, textColor2: g, hoverColor: C } = e;
      return Object.assign(Object.assign({}, _2), {
        itemHeightSmall: d,
        itemHeightMedium: a,
        itemHeightLarge: s,
        fontSizeSmall: l,
        fontSizeMedium: i,
        fontSizeLarge: n,
        borderRadius: c,
        borderColor: "#0000",
        listColor: u,
        headerColor: f,
        titleTextColor: p,
        titleTextColorDisabled: h,
        extraTextColor: g,
        filterDividerColor: "#0000",
        itemTextColor: g,
        itemTextColorDisabled: h,
        itemColorPending: C,
        titleFontWeight: r,
        iconColor: o,
        iconColorDisabled: t
      });
    }
  };
  function $2() {
    return {};
  }
  const A2 = {
    name: "Marquee",
    common: k,
    self: $2
  }, I2 = {
    name: "QrCode",
    common: k,
    self: (e) => ({
      borderRadius: e.borderRadius
    })
  }, z2 = {
    name: "Skeleton",
    common: k,
    self(e) {
      const { heightSmall: t, heightMedium: o, heightLarge: r, borderRadius: n } = e;
      return {
        color: "rgba(255, 255, 255, 0.12)",
        colorEnd: "rgba(255, 255, 255, 0.18)",
        borderRadius: n,
        heightSmall: t,
        heightMedium: o,
        heightLarge: r
      };
    }
  }, H2 = {
    name: "Split",
    common: k
  }, O2 = () => ({}), B2 = {
    name: "Equation",
    common: k,
    self: O2
  }, F2 = {
    name: "FloatButtonGroup",
    common: k,
    self(e) {
      const { popoverColor: t, dividerColor: o, borderRadius: r } = e;
      return {
        color: t,
        buttonBorderColor: o,
        borderRadiusSquare: r,
        boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)"
      };
    }
  }, M2 = {
    name: "dark",
    common: k,
    Alert: sS,
    Anchor: pS,
    AutoComplete: xS,
    Avatar: jf,
    AvatarGroup: SS,
    BackTop: PS,
    Badge: TS,
    Breadcrumb: RS,
    Button: yt,
    ButtonGroup: Cw,
    Calendar: BS,
    Card: Gf,
    Carousel: WS,
    Cascader: US,
    Checkbox: Ir,
    Code: Kf,
    Collapse: qS,
    CollapseTransition: YS,
    ColorPicker: QS,
    DataTable: f1,
    DatePicker: b1,
    Descriptions: C1,
    Dialog: hp,
    Divider: dw,
    Drawer: fw,
    Dropdown: As,
    DynamicInput: hw,
    DynamicTags: mw,
    Element: bw,
    Empty: nr,
    Ellipsis: rp,
    Equation: B2,
    Flex: xw,
    Form: Sw,
    GradientText: ww,
    Heatmap: w2,
    Icon: p1,
    IconWrapper: T2,
    Image: E2,
    Input: _t,
    InputNumber: Pw,
    InputOtp: Ew,
    LegacyTransfer: R2,
    Layout: _w,
    List: Aw,
    LoadingBar: D1,
    Log: Iw,
    Menu: Ow,
    Mention: zw,
    Message: W1,
    Modal: _1,
    Notification: Q1,
    PageHeader: Mw,
    Pagination: Qf,
    Popconfirm: kw,
    Popover: ir,
    Popselect: qf,
    Progress: Tp,
    QrCode: I2,
    Radio: ip,
    Rate: Ww,
    Result: Gw,
    Row: Rw,
    Scrollbar: at,
    Select: Yf,
    Skeleton: z2,
    Slider: Kw,
    Space: Sp,
    Spin: qw,
    Statistic: Xw,
    Steps: Qw,
    Switch: e2,
    Table: r2,
    Tabs: l2,
    Tag: Df,
    Thing: a2,
    TimePicker: cp,
    Timeline: d2,
    Tooltip: Li,
    Transfer: f2,
    Tree: Rp,
    TreeSelect: h2,
    Typography: b2,
    Upload: x2,
    Watermark: C2,
    Split: H2,
    FloatButton: y2,
    FloatButtonGroup: F2,
    Marquee: A2
  }, D2 = we({
    __name: "App",
    setup(e) {
      const t = {
        common: {
          primaryColor: "#818cf8",
          primaryColorHover: "#a5b4fc",
          primaryColorPressed: "#6366f1",
          primaryColorSuppl: "#818cf8",
          successColor: "#34d399",
          successColorHover: "#6ee7b7",
          successColorPressed: "#10b981",
          warningColor: "#fbbf24",
          warningColorHover: "#fcd34d",
          warningColorPressed: "#f59e0b",
          errorColor: "#f87171",
          errorColorHover: "#fca5a5",
          errorColorPressed: "#ef4444",
          infoColor: "#60a5fa",
          borderRadius: "8px",
          borderRadiusSmall: "6px",
          fontSizeMedium: "13px",
          fontSizeSmall: "12px"
        },
        DataTable: {
          thColor: "#162032",
          thTextColor: "#94a3b8",
          thFontWeight: "500",
          tdColorStriped: "#111c2d",
          borderColor: "#1e2d3f",
          tdTextColor: "#cbd5e1",
          thPaddingSmall: "8px 12px",
          tdPaddingSmall: "8px 12px"
        },
        Card: {
          borderRadius: "10px",
          color: "#1a2638",
          borderColor: "#1e2d3f",
          titleTextColor: "#e2e8f0",
          titleFontSizeMedium: "13px"
        },
        Modal: {
          color: "#1a2638",
          borderRadius: "12px",
          titleTextColor: "#e2e8f0",
          titleFontSizeLarge: "15px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)"
        },
        Menu: {
          itemColorActive: "rgba(129,140,248,0.1)",
          itemColorActiveHover: "rgba(129,140,248,0.15)",
          itemTextColorActive: "#818cf8",
          itemIconColorActive: "#818cf8",
          itemTextColorActiveHover: "#a5b4fc",
          itemIconColorActiveHover: "#a5b4fc",
          itemColorHover: "rgba(255,255,255,0.05)",
          itemTextColorHover: "#e2e8f0",
          itemIconColorHover: "#e2e8f0",
          itemTextColor: "#94a3b8",
          itemIconColor: "#94a3b8",
          color: "transparent",
          borderRadius: "8px",
          itemBorderRadius: "8px"
        },
        Button: {
          borderRadiusMedium: "7px",
          borderRadiusSmall: "6px",
          borderRadiusTiny: "5px",
          fontSizeMedium: "13px",
          fontSizeSmall: "12px",
          fontSizeTiny: "11px"
        },
        Input: {
          borderRadius: "7px",
          fontSizeMedium: "13px",
          fontSizeSmall: "12px",
          color: "#111c2d",
          colorFocus: "#111c2d",
          border: "1px solid #1e2d3f",
          borderFocus: "1px solid #818cf8",
          borderHover: "1px solid #334155"
        },
        Select: {
          menuBorderRadius: "8px"
        },
        Tag: {
          borderRadius: "5px",
          fontSizeMedium: "11px",
          fontSizeSmall: "11px"
        },
        Statistic: {
          labelFontSize: "12px",
          labelTextColor: "#94a3b8",
          valueFontSize: "22px"
        }
      };
      return (o, r) => {
        const n = eg("RouterView"), i = aw, l = X1, s = M1, a = e1;
        return Zn(), Jn(a, {
          theme: Io(M2),
          "theme-overrides": t
        }, {
          default: kr(() => [
            Ze(s, null, {
              default: kr(() => [
                Ze(l, null, {
                  default: kr(() => [
                    Ze(i, null, {
                      default: kr(() => [
                        Ze(n)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, [
          "theme"
        ]);
      };
    }
  }), Hs = wm(D2), L2 = Em(), $p = kb({
    history: bb(),
    routes: Vb(Nb)
  });
  $p.beforeEach((e) => {
    const t = Gb();
    if (!t.isAuthenticated && e.path !== "/login") return {
      path: "/login",
      query: {
        redirect: e.fullPath
      }
    };
    if (t.isAuthenticated && e.path === "/login") return {
      path: "/dashboard"
    };
  });
  Hs.use(L2);
  Hs.use($p);
  Hs.mount("#app");
})();
export {
  lS as $,
  lh as A,
  Nl as B,
  an as C,
  vr as D,
  Le as E,
  kS as F,
  Jw as G,
  G as H,
  ci as I,
  Hl as J,
  E0 as K,
  Ht as L,
  $f as M,
  Ss as N,
  _0 as O,
  he as P,
  gv as Q,
  ja as R,
  Go as S,
  We as T,
  k2 as U,
  Af as V,
  Jo as W,
  dP as X,
  xi as Y,
  jy as Z,
  H1 as _,
  __tla,
  Q as a,
  hv as a$,
  oe as a0,
  dS as a1,
  us as a2,
  Mi as a3,
  mc as a4,
  Fi as a5,
  ws as a6,
  Ts as a7,
  ai as a8,
  Ps as a9,
  vc as aA,
  hn as aB,
  wn as aC,
  Di as aD,
  eP as aE,
  ml as aF,
  Vv as aG,
  hs as aH,
  Qy as aI,
  g1 as aJ,
  Wu as aK,
  Q2 as aL,
  sP as aM,
  uP as aN,
  pc as aO,
  Ai as aP,
  $d as aQ,
  Ad as aR,
  fc as aS,
  Es as aT,
  St as aU,
  Ff as aV,
  eS as aW,
  hc as aX,
  bc as aY,
  oS as aZ,
  Iu as a_,
  Rf as aa,
  Ar as ab,
  $o as ac,
  Bi as ad,
  aP as ae,
  Ii as af,
  tt as ag,
  U2 as ah,
  Gb as ai,
  V2 as aj,
  N2 as ak,
  y1 as al,
  P0 as am,
  oP as an,
  Rs as ao,
  En as ap,
  Bl as aq,
  po as ar,
  nP as as,
  Zo as at,
  pt as au,
  Tr as av,
  Dt as aw,
  Y2 as ax,
  Bo as ay,
  $i as az,
  Ie as b,
  J2 as b$,
  VS as b0,
  o1 as b1,
  bs as b2,
  gn as b3,
  aa as b4,
  r1 as b5,
  i1 as b6,
  d1 as b7,
  ni as b8,
  tP as b9,
  aC as bA,
  af as bB,
  ys as bC,
  sC as bD,
  li as bE,
  K0 as bF,
  gf as bG,
  Sn as bH,
  Rr as bI,
  Pr as bJ,
  zi as bK,
  zc as bL,
  uf as bM,
  $r as bN,
  pf as bO,
  _r as bP,
  rr as bQ,
  sf as bR,
  lf as bS,
  Dl as bT,
  nf as bU,
  $y as bV,
  L0 as bW,
  q2 as bX,
  Tn as bY,
  S0 as bZ,
  rP as b_,
  a1 as ba,
  Je as bb,
  bn as bc,
  ls as bd,
  X2 as be,
  iP as bf,
  gS as bg,
  L1 as bh,
  eg as bi,
  cP as bj,
  Lu as bk,
  Du as bl,
  tr as bm,
  Zt as bn,
  Oo as bo,
  Dv as bp,
  Mv as bq,
  kv as br,
  ec as bs,
  Z2 as bt,
  cv as bu,
  Qv as bv,
  Kv as bw,
  rg as bx,
  xs as by,
  Er as bz,
  ho as c,
  fo as c0,
  wi as c1,
  op as c2,
  lP as c3,
  ep as c4,
  D0 as c5,
  MC as c6,
  we as d,
  M as e,
  te as f,
  ne as g,
  re as h,
  Ee as i,
  T as j,
  bo as k,
  gt as l,
  or as m,
  Zn as n,
  mo as o,
  Jn as p,
  kr as q,
  de as r,
  Io as s,
  Yt as t,
  G2 as u,
  Ze as v,
  At as w,
  W2 as x,
  Qd as y,
  j2 as z
};
