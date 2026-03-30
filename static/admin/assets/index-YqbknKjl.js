const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CFYQhzWw.js","assets/route-block-B_A1xBdJ.js","assets/backends-BXeVOxcI.js","assets/backends-By8nl6Vb.js","assets/useApi-ClSvQxGZ.js","assets/use-form-item-B02FE9As.js","assets/use-message-B7xbmhU1.js","assets/FormItem-DHwZ_qLU.js","assets/Input-DK9mG32G.js","assets/Button-CV4-g0dr.js","assets/DataTable-14e5pRmB.js","assets/InputNumber-B74hWMDY.js","assets/dashboard-C1gt3Xj2.js","assets/keys-DtrRsEFo.js","assets/Statistic-BA45VDrC.js","assets/Spin-CObAkYad.js","assets/flags-BKqtB-8H.js","assets/keys-I9rNC3pg.js","assets/login-COM2woMg.js","assets/mappings-Bz-QOEN6.js","assets/usage-D_5DExzr.js","assets/default-DxAMwicK.js"])))=>i.map(i=>d[i]);
let Fl, kf, Ni, dl, $e, ZS, V, sl, qm, cC, Gt, Ym, Js, qe, dd, jy, uC, uw, Gn, aC, Lr, TC, X, AC, Kc, md, lC, Dl, ie, Jr, fd, gd, pd, hd, Ko, Bl, cw, Kb, Jt, qy, si, Zs, to, Qr, Gb, R1, sw, dw, qr, Bo, tt, Nm, gc, ri, da, yc, wc, Bp, Hu, ua, Ol, ir, Rv, Gu, zl, Ev, On, Tm, Uy, Gy, xn, vr, qn, Xn, Po, tw, Yy, Qy, To, z1, _c, Vb, bo, ky, Cd, Vy, Ub, Vn, aw, hb, Xm, rw, jl, Te, p0, Qu, sr, nr, ni, Ea, qu, ar, Yu, lr, S1, lw, v1, Gr, ew, iw, JC, n0, rx, F1, Mp, Br, Lo, Vu, Nu, ol, Wu, Xx, i0, Ll, cr, wd, Zy, en, nw, Jn, yC, pa, PC, Jy, t1, p1, Fu, h1, m1, w1, C1, ow, oo, Le, Q, pe, ge, Ue, Ae, z, Yr, ko, Il, Tn, Fo, En, fn, Ce, mo, Cl, Ky, Ke, Jo, Ny, Uc, Wy;
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
  function al(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const o of e.split(",")) t[o] = 1;
    return (o) => o in t;
  }
  const Pe = {}, qo = [], Lt = () => {
  }, Ha = () => false, zn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Dn = (e) => e.startsWith("onUpdate:"), We = Object.assign, cl = (e, t) => {
    const o = e.indexOf(t);
    o > -1 && e.splice(o, 1);
  }, Ef = Object.prototype.hasOwnProperty, Se = (e, t) => Ef.call(e, t), le = Array.isArray, Xo = (e) => Ur(e) === "[object Map]", Ia = (e) => Ur(e) === "[object Set]", Gl = (e) => Ur(e) === "[object Date]", ue = (e) => typeof e == "function", ze = (e) => typeof e == "string", bt = (e) => typeof e == "symbol", ve = (e) => e !== null && typeof e == "object", $a = (e) => (ve(e) || ue(e)) && ue(e.then) && ue(e.catch), Oa = Object.prototype.toString, Ur = (e) => Oa.call(e), Rf = (e) => Ur(e).slice(8, -1), Ma = (e) => Ur(e) === "[object Object]", Bn = (e) => ze(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Cr = al(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Fn = (e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((o) => t[o] || (t[o] = e(o)));
  }, Af = /-\w/g, st = Fn((e) => e.replace(Af, (t) => t.slice(1).toUpperCase())), Hf = /\B([A-Z])/g, xo = Fn((e) => e.replace(Hf, "-$1").toLowerCase()), Ln = Fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ui = Fn((e) => e ? `on${Ln(e)}` : ""), Ft = (e, t) => !Object.is(e, t), di = (e, ...t) => {
    for (let o = 0; o < e.length; o++) e[o](...t);
  }, za = (e, t, o, r = false) => {
    Object.defineProperty(e, t, {
      configurable: true,
      enumerable: false,
      writable: r,
      value: o
    });
  }, If = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, $f = (e) => {
    const t = ze(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
  let Ul;
  const kn = () => Ul || (Ul = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function ul(e) {
    if (le(e)) {
      const t = {};
      for (let o = 0; o < e.length; o++) {
        const r = e[o], n = ze(r) ? Df(r) : ul(r);
        if (n) for (const i in n) t[i] = n[i];
      }
      return t;
    } else if (ze(e) || ve(e)) return e;
  }
  const Of = /;(?![^(]*\))/g, Mf = /:([^]+)/, zf = /\/\*[^]*?\*\//g;
  function Df(e) {
    const t = {};
    return e.replace(zf, "").split(Of).forEach((o) => {
      if (o) {
        const r = o.split(Mf);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }), t;
  }
  dl = function(e) {
    let t = "";
    if (ze(e)) t = e;
    else if (le(e)) for (let o = 0; o < e.length; o++) {
      const r = dl(e[o]);
      r && (t += r + " ");
    }
    else if (ve(e)) for (const o in e) e[o] && (t += o + " ");
    return t.trim();
  };
  const Bf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ff = al(Bf);
  function Da(e) {
    return !!e || e === "";
  }
  function Lf(e, t) {
    if (e.length !== t.length) return false;
    let o = true;
    for (let r = 0; o && r < e.length; r++) o = fl(e[r], t[r]);
    return o;
  }
  function fl(e, t) {
    if (e === t) return true;
    let o = Gl(e), r = Gl(t);
    if (o || r) return o && r ? e.getTime() === t.getTime() : false;
    if (o = bt(e), r = bt(t), o || r) return e === t;
    if (o = le(e), r = le(t), o || r) return o && r ? Lf(e, t) : false;
    if (o = ve(e), r = ve(t), o || r) {
      if (!o || !r) return false;
      const n = Object.keys(e).length, i = Object.keys(t).length;
      if (n !== i) return false;
      for (const l in e) {
        const s = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
        if (s && !a || !s && a || !fl(e[l], t[l])) return false;
      }
    }
    return String(e) === String(t);
  }
  let Ba, Fa, fi;
  Ba = (e) => !!(e && e.__v_isRef === true);
  kf = (e) => ze(e) ? e : e == null ? "" : le(e) || ve(e) && (e.toString === Oa || !ue(e.toString)) ? Ba(e) ? kf(e.value) : JSON.stringify(e, Fa, 2) : String(e);
  Fa = (e, t) => Ba(t) ? Fa(e, t.value) : Xo(t) ? {
    [`Map(${t.size})`]: [
      ...t.entries()
    ].reduce((o, [r, n], i) => (o[fi(r, i) + " =>"] = n, o), {})
  } : Ia(t) ? {
    [`Set(${t.size})`]: [
      ...t.values()
    ].map((o) => fi(o))
  } : bt(t) ? fi(t) : ve(t) && !le(t) && !Ma(t) ? String(t) : t;
  fi = (e, t = "") => {
    var o;
    return bt(e) ? `Symbol(${(o = e.description) != null ? o : t})` : e;
  };
  let Qe;
  class La {
    constructor(t = false) {
      this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = Qe, !t && Qe && (this.index = (Qe.scopes || (Qe.scopes = [])).push(this) - 1);
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
        const o = Qe;
        try {
          return Qe = this, t();
        } finally {
          Qe = o;
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = Qe, Qe = this);
    }
    off() {
      this._on > 0 && --this._on === 0 && (Qe = this.prevScope, this.prevScope = void 0);
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
  function ka(e) {
    return new La(e);
  }
  function ja() {
    return Qe;
  }
  function jf(e, t = false) {
    Qe && Qe.cleanups.push(e);
  }
  let _e;
  const pi = /* @__PURE__ */ new WeakSet();
  class Wa {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Qe && Qe.active && Qe.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, pi.has(this) && (pi.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Va(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, Kl(this), Ga(this);
      const t = _e, o = Pt;
      _e = this, Pt = true;
      try {
        return this.fn();
      } finally {
        Ua(this), _e = t, Pt = o, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) gl(t);
        this.deps = this.depsTail = void 0, Kl(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? pi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      Mi(this) && this.run();
    }
    get dirty() {
      return Mi(this);
    }
  }
  let Na = 0, Sr, yr;
  function Va(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = yr, yr = e;
      return;
    }
    e.next = Sr, Sr = e;
  }
  function pl() {
    Na++;
  }
  function hl() {
    if (--Na > 0) return;
    if (yr) {
      let t = yr;
      for (yr = void 0; t; ) {
        const o = t.next;
        t.next = void 0, t.flags &= -9, t = o;
      }
    }
    let e;
    for (; Sr; ) {
      let t = Sr;
      for (Sr = void 0; t; ) {
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
  function Ga(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function Ua(e) {
    let t, o = e.depsTail, r = o;
    for (; r; ) {
      const n = r.prevDep;
      r.version === -1 ? (r === o && (o = n), gl(r), Wf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
    }
    e.deps = t, e.depsTail = o;
  }
  function Mi(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ka(t.dep.computed) || t.dep.version !== t.version)) return true;
    return !!e._dirty;
  }
  function Ka(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ir) || (e.globalVersion = Ir, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Mi(e)))) return;
    e.flags |= 2;
    const t = e.dep, o = _e, r = Pt;
    _e = e, Pt = true;
    try {
      Ga(e);
      const n = e.fn(e._value);
      (t.version === 0 || Ft(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
    } catch (n) {
      throw t.version++, n;
    } finally {
      _e = o, Pt = r, Ua(e), e.flags &= -3;
    }
  }
  function gl(e, t = false) {
    const { dep: o, prevSub: r, nextSub: n } = e;
    if (r && (r.nextSub = n, e.prevSub = void 0), n && (n.prevSub = r, e.nextSub = void 0), o.subs === e && (o.subs = r, !r && o.computed)) {
      o.computed.flags &= -5;
      for (let i = o.computed.deps; i; i = i.nextDep) gl(i, true);
    }
    !t && !--o.sc && o.map && o.map.delete(o.key);
  }
  function Wf(e) {
    const { prevDep: t, nextDep: o } = e;
    t && (t.nextDep = o, e.prevDep = void 0), o && (o.prevDep = t, e.nextDep = void 0);
  }
  let Pt = true;
  const qa = [];
  function Qt() {
    qa.push(Pt), Pt = false;
  }
  function Zt() {
    const e = qa.pop();
    Pt = e === void 0 ? true : e;
  }
  function Kl(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const o = _e;
      _e = void 0;
      try {
        t();
      } finally {
        _e = o;
      }
    }
  }
  let Ir = 0;
  class Nf {
    constructor(t, o) {
      this.sub = t, this.dep = o, this.version = o.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class ml {
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(t) {
      if (!_e || !Pt || _e === this.computed) return;
      let o = this.activeLink;
      if (o === void 0 || o.sub !== _e) o = this.activeLink = new Nf(_e, this), _e.deps ? (o.prevDep = _e.depsTail, _e.depsTail.nextDep = o, _e.depsTail = o) : _e.deps = _e.depsTail = o, Xa(o);
      else if (o.version === -1 && (o.version = this.version, o.nextDep)) {
        const r = o.nextDep;
        r.prevDep = o.prevDep, o.prevDep && (o.prevDep.nextDep = r), o.prevDep = _e.depsTail, o.nextDep = void 0, _e.depsTail.nextDep = o, _e.depsTail = o, _e.deps === o && (_e.deps = r);
      }
      return o;
    }
    trigger(t) {
      this.version++, Ir++, this.notify(t);
    }
    notify(t) {
      pl();
      try {
        for (let o = this.subs; o; o = o.prevSub) o.sub.notify() && o.sub.dep.notify();
      } finally {
        hl();
      }
    }
  }
  function Xa(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) Xa(r);
      }
      const o = e.dep.subs;
      o !== e && (e.prevSub = o, o && (o.nextSub = e)), e.dep.subs = e;
    }
  }
  const vn = /* @__PURE__ */ new WeakMap(), Ho = Symbol(""), zi = Symbol(""), $r = Symbol("");
  function Ze(e, t, o) {
    if (Pt && _e) {
      let r = vn.get(e);
      r || vn.set(e, r = /* @__PURE__ */ new Map());
      let n = r.get(o);
      n || (r.set(o, n = new ml()), n.map = r, n.key = o), n.track();
    }
  }
  function qt(e, t, o, r, n, i) {
    const l = vn.get(e);
    if (!l) {
      Ir++;
      return;
    }
    const s = (a) => {
      a && a.trigger();
    };
    if (pl(), t === "clear") l.forEach(s);
    else {
      const a = le(e), c = a && Bn(o);
      if (a && o === "length") {
        const u = Number(r);
        l.forEach((d, f) => {
          (f === "length" || f === $r || !bt(f) && f >= u) && s(d);
        });
      } else switch ((o !== void 0 || l.has(void 0)) && s(l.get(o)), c && s(l.get($r)), t) {
        case "add":
          a ? c && s(l.get("length")) : (s(l.get(Ho)), Xo(e) && s(l.get(zi)));
          break;
        case "delete":
          a || (s(l.get(Ho)), Xo(e) && s(l.get(zi)));
          break;
        case "set":
          Xo(e) && s(l.get(Ho));
          break;
      }
    }
    hl();
  }
  function Vf(e, t) {
    const o = vn.get(e);
    return o && o.get(t);
  }
  function No(e) {
    const t = me(e);
    return t === e ? t : (Ze(t, "iterate", $r), mt(e) ? t : t.map(Tt));
  }
  function jn(e) {
    return Ze(e = me(e), "iterate", $r), e;
  }
  function Dt(e, t) {
    return eo(e) ? er(Yt(e) ? Tt(t) : t) : Tt(t);
  }
  const Gf = {
    __proto__: null,
    [Symbol.iterator]() {
      return hi(this, Symbol.iterator, (e) => Dt(this, e));
    },
    concat(...e) {
      return No(this).concat(...e.map((t) => le(t) ? No(t) : t));
    },
    entries() {
      return hi(this, "entries", (e) => (e[1] = Dt(this, e[1]), e));
    },
    every(e, t) {
      return Nt(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
      return Nt(this, "filter", e, t, (o) => o.map((r) => Dt(this, r)), arguments);
    },
    find(e, t) {
      return Nt(this, "find", e, t, (o) => Dt(this, o), arguments);
    },
    findIndex(e, t) {
      return Nt(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
      return Nt(this, "findLast", e, t, (o) => Dt(this, o), arguments);
    },
    findLastIndex(e, t) {
      return Nt(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
      return Nt(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
      return gi(this, "includes", e);
    },
    indexOf(...e) {
      return gi(this, "indexOf", e);
    },
    join(e) {
      return No(this).join(e);
    },
    lastIndexOf(...e) {
      return gi(this, "lastIndexOf", e);
    },
    map(e, t) {
      return Nt(this, "map", e, t, void 0, arguments);
    },
    pop() {
      return dr(this, "pop");
    },
    push(...e) {
      return dr(this, "push", e);
    },
    reduce(e, ...t) {
      return ql(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
      return ql(this, "reduceRight", e, t);
    },
    shift() {
      return dr(this, "shift");
    },
    some(e, t) {
      return Nt(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
      return dr(this, "splice", e);
    },
    toReversed() {
      return No(this).toReversed();
    },
    toSorted(e) {
      return No(this).toSorted(e);
    },
    toSpliced(...e) {
      return No(this).toSpliced(...e);
    },
    unshift(...e) {
      return dr(this, "unshift", e);
    },
    values() {
      return hi(this, "values", (e) => Dt(this, e));
    }
  };
  function hi(e, t, o) {
    const r = jn(e), n = r[t]();
    return r !== e && !mt(e) && (n._next = n.next, n.next = () => {
      const i = n._next();
      return i.done || (i.value = o(i.value)), i;
    }), n;
  }
  const Uf = Array.prototype;
  function Nt(e, t, o, r, n, i) {
    const l = jn(e), s = l !== e && !mt(e), a = l[t];
    if (a !== Uf[t]) {
      const d = a.apply(e, i);
      return s ? Tt(d) : d;
    }
    let c = o;
    l !== e && (s ? c = function(d, f) {
      return o.call(this, Dt(e, d), f, e);
    } : o.length > 2 && (c = function(d, f) {
      return o.call(this, d, f, e);
    }));
    const u = a.call(l, c, r);
    return s && n ? n(u) : u;
  }
  function ql(e, t, o, r) {
    const n = jn(e), i = n !== e && !mt(e);
    let l = o, s = false;
    n !== e && (i ? (s = r.length === 0, l = function(c, u, d) {
      return s && (s = false, c = Dt(e, c)), o.call(this, c, Dt(e, u), d, e);
    }) : o.length > 3 && (l = function(c, u, d) {
      return o.call(this, c, u, d, e);
    }));
    const a = n[t](l, ...r);
    return s ? Dt(e, a) : a;
  }
  function gi(e, t, o) {
    const r = me(e);
    Ze(r, "iterate", $r);
    const n = r[t](...o);
    return (n === -1 || n === false) && Wn(o[0]) ? (o[0] = me(o[0]), r[t](...o)) : n;
  }
  function dr(e, t, o = []) {
    Qt(), pl();
    const r = me(e)[t].apply(e, o);
    return hl(), Zt(), r;
  }
  const Kf = al("__proto__,__v_isRef,__isVue"), Ya = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(bt));
  function qf(e) {
    bt(e) || (e = String(e));
    const t = me(this);
    return Ze(t, "has", e), t.hasOwnProperty(e);
  }
  class Ja {
    constructor(t = false, o = false) {
      this._isReadonly = t, this._isShallow = o;
    }
    get(t, o, r) {
      if (o === "__v_skip") return t.__v_skip;
      const n = this._isReadonly, i = this._isShallow;
      if (o === "__v_isReactive") return !n;
      if (o === "__v_isReadonly") return n;
      if (o === "__v_isShallow") return i;
      if (o === "__v_raw") return r === (n ? i ? np : tc : i ? ec : Za).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      const l = le(t);
      if (!n) {
        let a;
        if (l && (a = Gf[o])) return a;
        if (o === "hasOwnProperty") return qf;
      }
      const s = Reflect.get(t, o, $e(t) ? t : r);
      if ((bt(o) ? Ya.has(o) : Kf(o)) || (n || Ze(t, "get", o), i)) return s;
      if ($e(s)) {
        const a = l && Bn(o) ? s : s.value;
        return n && ve(a) ? xn(a) : a;
      }
      return ve(s) ? n ? xn(s) : Bo(s) : s;
    }
  }
  class Qa extends Ja {
    constructor(t = false) {
      super(false, t);
    }
    set(t, o, r, n) {
      let i = t[o];
      const l = le(t) && Bn(o);
      if (!this._isShallow) {
        const c = eo(i);
        if (!mt(r) && !eo(r) && (i = me(i), r = me(r)), !l && $e(i) && !$e(r)) return c || (i.value = r), true;
      }
      const s = l ? Number(o) < t.length : Se(t, o), a = Reflect.set(t, o, r, $e(t) ? t : n);
      return t === me(n) && (s ? Ft(r, i) && qt(t, "set", o, r) : qt(t, "add", o, r)), a;
    }
    deleteProperty(t, o) {
      const r = Se(t, o);
      t[o];
      const n = Reflect.deleteProperty(t, o);
      return n && r && qt(t, "delete", o, void 0), n;
    }
    has(t, o) {
      const r = Reflect.has(t, o);
      return (!bt(o) || !Ya.has(o)) && Ze(t, "has", o), r;
    }
    ownKeys(t) {
      return Ze(t, "iterate", le(t) ? "length" : Ho), Reflect.ownKeys(t);
    }
  }
  class Xf extends Ja {
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
  const Yf = new Qa(), Jf = new Xf(), Qf = new Qa(true);
  const Di = (e) => e, tn = (e) => Reflect.getPrototypeOf(e);
  function Zf(e, t, o) {
    return function(...r) {
      const n = this.__v_raw, i = me(n), l = Xo(i), s = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, c = n[e](...r), u = o ? Di : t ? er : Tt;
      return !t && Ze(i, "iterate", a ? zi : Ho), We(Object.create(c), {
        next() {
          const { value: d, done: f } = c.next();
          return f ? {
            value: d,
            done: f
          } : {
            value: s ? [
              u(d[0]),
              u(d[1])
            ] : u(d),
            done: f
          };
        }
      });
    };
  }
  function on(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function ep(e, t) {
    const o = {
      get(n) {
        const i = this.__v_raw, l = me(i), s = me(n);
        e || (Ft(n, s) && Ze(l, "get", n), Ze(l, "get", s));
        const { has: a } = tn(l), c = t ? Di : e ? er : Tt;
        if (a.call(l, n)) return c(i.get(n));
        if (a.call(l, s)) return c(i.get(s));
        i !== l && i.get(n);
      },
      get size() {
        const n = this.__v_raw;
        return !e && Ze(me(n), "iterate", Ho), n.size;
      },
      has(n) {
        const i = this.__v_raw, l = me(i), s = me(n);
        return e || (Ft(n, s) && Ze(l, "has", n), Ze(l, "has", s)), n === s ? i.has(n) : i.has(n) || i.has(s);
      },
      forEach(n, i) {
        const l = this, s = l.__v_raw, a = me(s), c = t ? Di : e ? er : Tt;
        return !e && Ze(a, "iterate", Ho), s.forEach((u, d) => n.call(i, c(u), c(d), l));
      }
    };
    return We(o, e ? {
      add: on("add"),
      set: on("set"),
      delete: on("delete"),
      clear: on("clear")
    } : {
      add(n) {
        const i = me(this), l = tn(i), s = me(n), a = !t && !mt(n) && !eo(n) ? s : n;
        return l.has.call(i, a) || Ft(n, a) && l.has.call(i, n) || Ft(s, a) && l.has.call(i, s) || (i.add(a), qt(i, "add", a, a)), this;
      },
      set(n, i) {
        !t && !mt(i) && !eo(i) && (i = me(i));
        const l = me(this), { has: s, get: a } = tn(l);
        let c = s.call(l, n);
        c || (n = me(n), c = s.call(l, n));
        const u = a.call(l, n);
        return l.set(n, i), c ? Ft(i, u) && qt(l, "set", n, i) : qt(l, "add", n, i), this;
      },
      delete(n) {
        const i = me(this), { has: l, get: s } = tn(i);
        let a = l.call(i, n);
        a || (n = me(n), a = l.call(i, n)), s && s.call(i, n);
        const c = i.delete(n);
        return a && qt(i, "delete", n, void 0), c;
      },
      clear() {
        const n = me(this), i = n.size !== 0, l = n.clear();
        return i && qt(n, "clear", void 0, void 0), l;
      }
    }), [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ].forEach((n) => {
      o[n] = Zf(n, e, t);
    }), o;
  }
  function bl(e, t) {
    const o = ep(e, t);
    return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get(Se(o, n) && n in r ? o : r, n, i);
  }
  const tp = {
    get: bl(false, false)
  }, op = {
    get: bl(false, true)
  }, rp = {
    get: bl(true, false)
  };
  const Za = /* @__PURE__ */ new WeakMap(), ec = /* @__PURE__ */ new WeakMap(), tc = /* @__PURE__ */ new WeakMap(), np = /* @__PURE__ */ new WeakMap();
  function ip(e) {
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
  function lp(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ip(Rf(e));
  }
  Bo = function(e) {
    return eo(e) ? e : vl(e, false, Yf, tp, Za);
  };
  function oc(e) {
    return vl(e, false, Qf, op, ec);
  }
  xn = function(e) {
    return vl(e, true, Jf, rp, tc);
  };
  function vl(e, t, o, r, n) {
    if (!ve(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = lp(e);
    if (i === 0) return e;
    const l = n.get(e);
    if (l) return l;
    const s = new Proxy(e, i === 2 ? r : o);
    return n.set(e, s), s;
  }
  function Yt(e) {
    return eo(e) ? Yt(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function eo(e) {
    return !!(e && e.__v_isReadonly);
  }
  function mt(e) {
    return !!(e && e.__v_isShallow);
  }
  function Wn(e) {
    return e ? !!e.__v_raw : false;
  }
  function me(e) {
    const t = e && e.__v_raw;
    return t ? me(t) : e;
  }
  function Or(e) {
    return !Se(e, "__v_skip") && Object.isExtensible(e) && za(e, "__v_skip", true), e;
  }
  const Tt = (e) => ve(e) ? Bo(e) : e, er = (e) => ve(e) ? xn(e) : e;
  $e = function(e) {
    return e ? e.__v_isRef === true : false;
  };
  Ce = function(e) {
    return rc(e, false);
  };
  function xl(e) {
    return rc(e, true);
  }
  function rc(e, t) {
    return $e(e) ? e : new sp(e, t);
  }
  class sp {
    constructor(t, o) {
      this.dep = new ml(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = o ? t : me(t), this._value = o ? t : Tt(t), this.__v_isShallow = o;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const o = this._rawValue, r = this.__v_isShallow || mt(t) || eo(t);
      t = r ? t : me(t), Ft(t, o) && (this._rawValue = t, this._value = r ? t : Tt(t), this.dep.trigger());
    }
  }
  mo = function(e) {
    return $e(e) ? e.value : e;
  };
  const ap = {
    get: (e, t, o) => t === "__v_raw" ? e : mo(Reflect.get(e, t, o)),
    set: (e, t, o, r) => {
      const n = e[t];
      return $e(n) && !$e(o) ? (n.value = o, true) : Reflect.set(e, t, o, r);
    }
  };
  function nc(e) {
    return Yt(e) ? e : new Proxy(e, ap);
  }
  function cp(e) {
    const t = le(e) ? new Array(e.length) : {};
    for (const o in e) t[o] = ic(e, o);
    return t;
  }
  class up {
    constructor(t, o, r) {
      this._object = t, this._defaultValue = r, this.__v_isRef = true, this._value = void 0, this._key = bt(o) ? o : String(o), this._raw = me(t);
      let n = true, i = t;
      if (!le(t) || bt(this._key) || !Bn(this._key)) do
        n = !Wn(i) || mt(i);
      while (n && (i = i.__v_raw));
      this._shallow = n;
    }
    get value() {
      let t = this._object[this._key];
      return this._shallow && (t = mo(t)), this._value = t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
      if (this._shallow && $e(this._raw[this._key])) {
        const o = this._object[this._key];
        if ($e(o)) {
          o.value = t;
          return;
        }
      }
      this._object[this._key] = t;
    }
    get dep() {
      return Vf(this._raw, this._key);
    }
  }
  class dp {
    constructor(t) {
      this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
    }
    get value() {
      return this._value = this._getter();
    }
  }
  Cl = function(e, t, o) {
    return $e(e) ? e : ue(e) ? new dp(e) : ve(e) && arguments.length > 1 ? ic(e, t, o) : Ce(e);
  };
  function ic(e, t, o) {
    return new up(e, t, o);
  }
  class fp {
    constructor(t, o, r) {
      this.fn = t, this.setter = o, this._value = void 0, this.dep = new ml(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ir - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !o, this.isSSR = r;
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && _e !== this) return Va(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return Ka(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  }
  function pp(e, t, o = false) {
    let r, n;
    return ue(e) ? r = e : (r = e.get, n = e.set), new fp(r, n, o);
  }
  const rn = {}, Cn = /* @__PURE__ */ new WeakMap();
  let wo;
  function hp(e, t = false, o = wo) {
    if (o) {
      let r = Cn.get(o);
      r || Cn.set(o, r = []), r.push(e);
    }
  }
  function gp(e, t, o = Pe) {
    const { immediate: r, deep: n, once: i, scheduler: l, augmentJob: s, call: a } = o, c = (A) => n ? A : mt(A) || n === false || n === 0 ? Xt(A, 1) : Xt(A);
    let u, d, f, p, h = false, m = false;
    if ($e(e) ? (d = () => e.value, h = mt(e)) : Yt(e) ? (d = () => c(e), h = true) : le(e) ? (m = true, h = e.some((A) => Yt(A) || mt(A)), d = () => e.map((A) => {
      if ($e(A)) return A.value;
      if (Yt(A)) return c(A);
      if (ue(A)) return a ? a(A, 2) : A();
    })) : ue(e) ? t ? d = a ? () => a(e, 2) : e : d = () => {
      if (f) {
        Qt();
        try {
          f();
        } finally {
          Zt();
        }
      }
      const A = wo;
      wo = u;
      try {
        return a ? a(e, 3, [
          p
        ]) : e(p);
      } finally {
        wo = A;
      }
    } : d = Lt, t && n) {
      const A = d, B = n === true ? 1 / 0 : n;
      d = () => Xt(A(), B);
    }
    const v = ja(), x = () => {
      u.stop(), v && v.active && cl(v.effects, u);
    };
    if (i && t) {
      const A = t;
      t = (...B) => {
        A(...B), x();
      };
    }
    let S = m ? new Array(e.length).fill(rn) : rn;
    const T = (A) => {
      if (!(!(u.flags & 1) || !u.dirty && !A)) if (t) {
        const B = u.run();
        if (n || h || (m ? B.some((k, P) => Ft(k, S[P])) : Ft(B, S))) {
          f && f();
          const k = wo;
          wo = u;
          try {
            const P = [
              B,
              S === rn ? void 0 : m && S[0] === rn ? [] : S,
              p
            ];
            S = B, a ? a(t, 3, P) : t(...P);
          } finally {
            wo = k;
          }
        }
      } else u.run();
    };
    return s && s(T), u = new Wa(d), u.scheduler = l ? () => l(T, false) : T, p = (A) => hp(A, false, u), f = u.onStop = () => {
      const A = Cn.get(u);
      if (A) {
        if (a) a(A, 4);
        else for (const B of A) B();
        Cn.delete(u);
      }
    }, t ? r ? T(true) : S = u.run() : l ? l(T.bind(null, true), true) : u.run(), x.pause = u.pause.bind(u), x.resume = u.resume.bind(u), x.stop = x, x;
  }
  function Xt(e, t = 1 / 0, o) {
    if (t <= 0 || !ve(e) || e.__v_skip || (o = o || /* @__PURE__ */ new Map(), (o.get(e) || 0) >= t)) return e;
    if (o.set(e, t), t--, $e(e)) Xt(e.value, t, o);
    else if (le(e)) for (let r = 0; r < e.length; r++) Xt(e[r], t, o);
    else if (Ia(e) || Xo(e)) e.forEach((r) => {
      Xt(r, t, o);
    });
    else if (Ma(e)) {
      for (const r in e) Xt(e[r], t, o);
      for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Xt(e[r], t, o);
    }
    return e;
  }
  function Kr(e, t, o, r) {
    try {
      return r ? e(...r) : e();
    } catch (n) {
      Nn(n, t, o);
    }
  }
  function _t(e, t, o, r) {
    if (ue(e)) {
      const n = Kr(e, t, o, r);
      return n && $a(n) && n.catch((i) => {
        Nn(i, t, o);
      }), n;
    }
    if (le(e)) {
      const n = [];
      for (let i = 0; i < e.length; i++) n.push(_t(e[i], t, o, r));
      return n;
    }
  }
  function Nn(e, t, o, r = true) {
    const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || Pe;
    if (t) {
      let s = t.parent;
      const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${o}`;
      for (; s; ) {
        const u = s.ec;
        if (u) {
          for (let d = 0; d < u.length; d++) if (u[d](e, a, c) === false) return;
        }
        s = s.parent;
      }
      if (i) {
        Qt(), Kr(i, null, 10, [
          e,
          a,
          c
        ]), Zt();
        return;
      }
    }
    mp(e, o, n, r, l);
  }
  function mp(e, t, o, r = true, n = false) {
    if (n) throw e;
    console.error(e);
  }
  const lt = [];
  let Ot = -1;
  const Yo = [];
  let po = null, Go = 0;
  const lc = Promise.resolve();
  let Sn = null;
  Vn = function(e) {
    const t = Sn || lc;
    return e ? t.then(this ? e.bind(this) : e) : t;
  };
  function bp(e) {
    let t = Ot + 1, o = lt.length;
    for (; t < o; ) {
      const r = t + o >>> 1, n = lt[r], i = Mr(n);
      i < e || i === e && n.flags & 2 ? t = r + 1 : o = r;
    }
    return t;
  }
  function Sl(e) {
    if (!(e.flags & 1)) {
      const t = Mr(e), o = lt[lt.length - 1];
      !o || !(e.flags & 2) && t >= Mr(o) ? lt.push(e) : lt.splice(bp(t), 0, e), e.flags |= 1, sc();
    }
  }
  function sc() {
    Sn || (Sn = lc.then(cc));
  }
  function vp(e) {
    le(e) ? Yo.push(...e) : po && e.id === -1 ? po.splice(Go + 1, 0, e) : e.flags & 1 || (Yo.push(e), e.flags |= 1), sc();
  }
  function Xl(e, t, o = Ot + 1) {
    for (; o < lt.length; o++) {
      const r = lt[o];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        lt.splice(o, 1), o--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
      }
    }
  }
  function ac(e) {
    if (Yo.length) {
      const t = [
        ...new Set(Yo)
      ].sort((o, r) => Mr(o) - Mr(r));
      if (Yo.length = 0, po) {
        po.push(...t);
        return;
      }
      for (po = t, Go = 0; Go < po.length; Go++) {
        const o = po[Go];
        o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
      }
      po = null, Go = 0;
    }
  }
  const Mr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
  function cc(e) {
    try {
      for (Ot = 0; Ot < lt.length; Ot++) {
        const t = lt[Ot];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kr(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Ot < lt.length; Ot++) {
        const t = lt[Ot];
        t && (t.flags &= -2);
      }
      Ot = -1, lt.length = 0, ac(), Sn = null, (lt.length || Yo.length) && cc();
    }
  }
  let Xe = null, uc = null;
  function yn(e) {
    const t = Xe;
    return Xe = e, uc = e && e.type.__scopeId || null, t;
  }
  fn = function(e, t = Xe, o) {
    if (!t || e._n) return e;
    const r = (...n) => {
      r._d && _n(-1);
      const i = yn(t);
      let l;
      try {
        l = e(...n);
      } finally {
        yn(i), r._d && _n(1);
      }
      return l;
    };
    return r._n = true, r._c = true, r._d = true, r;
  };
  ky = function(e, t) {
    if (Xe === null) return e;
    const o = Qn(Xe), r = e.dirs || (e.dirs = []);
    for (let n = 0; n < t.length; n++) {
      let [i, l, s, a = Pe] = t[n];
      i && (ue(i) && (i = {
        mounted: i,
        updated: i
      }), i.deep && Xt(l), r.push({
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
  function Co(e, t, o, r) {
    const n = e.dirs, i = t && t.dirs;
    for (let l = 0; l < n.length; l++) {
      const s = n[l];
      i && (s.oldValue = i[l].value);
      let a = s.dir[r];
      a && (Qt(), _t(a, o, 8, [
        e.el,
        s,
        e,
        t
      ]), Zt());
    }
  }
  Jt = function(e, t) {
    if (ot) {
      let o = ot.provides;
      const r = ot.parent && ot.parent.provides;
      r === o && (o = ot.provides = Object.create(r)), o[e] = t;
    }
  };
  Ae = function(e, t, o = false) {
    const r = qr();
    if (r || Io) {
      let n = Io ? Io._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
      if (n && e in n) return n[e];
      if (arguments.length > 1) return o && ue(t) ? t.call(r && r.proxy) : t;
    }
  };
  function xp() {
    return !!(qr() || Io);
  }
  const Cp = Symbol.for("v-scx"), Sp = () => Ae(Cp);
  Gn = function(e, t) {
    return yl(e, null, t);
  };
  Jo = function(e, t, o) {
    return yl(e, t, o);
  };
  function yl(e, t, o = Pe) {
    const { immediate: r, deep: n, flush: i, once: l } = o, s = We({}, o), a = t && r || !t && i !== "post";
    let c;
    if (Fr) {
      if (i === "sync") {
        const p = Sp();
        c = p.__watcherHandles || (p.__watcherHandles = []);
      } else if (!a) {
        const p = () => {
        };
        return p.stop = Lt, p.resume = Lt, p.pause = Lt, p;
      }
    }
    const u = ot;
    s.call = (p, h, m) => _t(p, u, h, m);
    let d = false;
    i === "post" ? s.scheduler = (p) => {
      Je(p, u && u.suspense);
    } : i !== "sync" && (d = true, s.scheduler = (p, h) => {
      h ? p() : Sl(p);
    }), s.augmentJob = (p) => {
      t && (p.flags |= 4), d && (p.flags |= 2, u && (p.id = u.uid, p.i = u));
    };
    const f = gp(e, t, s);
    return Fr && (c ? c.push(f) : a && f()), f;
  }
  function yp(e, t, o) {
    const r = this.proxy, n = ze(e) ? e.includes(".") ? dc(r, e) : () => r[e] : e.bind(r, r);
    let i;
    ue(t) ? i = t : (i = t.handler, o = t);
    const l = Xr(this), s = yl(n, i.bind(r), o);
    return l(), s;
  }
  function dc(e, t) {
    const o = t.split(".");
    return () => {
      let r = e;
      for (let n = 0; n < o.length && r; n++) r = r[o[n]];
      return r;
    };
  }
  const fc = Symbol("_vte"), pc = (e) => e.__isTeleport, wr = (e) => e && (e.disabled || e.disabled === ""), wp = (e) => e && (e.defer || e.defer === ""), Yl = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Jl = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Bi = (e, t) => {
    const o = e && e.to;
    return ze(o) ? t ? t(o) : null : o;
  }, hc = {
    name: "Teleport",
    __isTeleport: true,
    process(e, t, o, r, n, i, l, s, a, c) {
      const { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: h, createText: m, createComment: v } } = c, x = wr(t.props);
      let { shapeFlag: S, children: T, dynamicChildren: A } = t;
      if (e == null) {
        const B = t.el = m(""), k = t.anchor = m("");
        p(B, o, r), p(k, o, r);
        const P = (y, O) => {
          S & 16 && u(T, y, O, n, i, l, s, a);
        }, w = () => {
          const y = t.target = Bi(t.props, h), O = Fi(y, t, m, p);
          y && (l !== "svg" && Yl(y) ? l = "svg" : l !== "mathml" && Jl(y) && (l = "mathml"), n && n.isCE && (n.ce._teleportTargets || (n.ce._teleportTargets = /* @__PURE__ */ new Set())).add(y), x || (P(y, O), pn(t, false)));
        };
        x && (P(o, k), pn(t, true)), wp(t.props) || i && i.pendingBranch ? (t.el.__isMounted = false, Je(() => {
          t.el.__isMounted === false && (w(), delete t.el.__isMounted);
        }, i)) : w();
      } else {
        t.el = e.el, t.targetStart = e.targetStart;
        const B = t.anchor = e.anchor, k = t.target = e.target, P = t.targetAnchor = e.targetAnchor;
        if (e.el.__isMounted === false) {
          Je(() => {
            hc.process(e, t, o, r, n, i, l, s, a, c);
          }, i);
          return;
        }
        const w = wr(e.props), y = w ? o : k, O = w ? B : P;
        if (l === "svg" || Yl(k) ? l = "svg" : (l === "mathml" || Jl(k)) && (l = "mathml"), A ? (f(e.dynamicChildren, A, y, n, i, l, s), _l(e, t, true)) : a || d(e, t, y, O, n, i, l, s, false), x) w ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : nn(t, o, B, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const L = t.target = Bi(t.props, h);
          L && nn(t, L, null, c, 0);
        } else w && nn(t, k, P, c, 1);
        pn(t, x);
      }
    },
    remove(e, t, o, { um: r, o: { remove: n } }, i) {
      const { shapeFlag: l, children: s, anchor: a, targetStart: c, targetAnchor: u, target: d, props: f } = e;
      if (d && (n(c), n(u)), i && n(a), l & 16) {
        const p = i || !wr(f);
        for (let h = 0; h < s.length; h++) {
          const m = s[h];
          r(m, t, o, p, !!m.dynamicChildren);
        }
      }
    },
    move: nn,
    hydrate: Pp
  };
  function nn(e, t, o, { o: { insert: r }, m: n }, i = 2) {
    i === 0 && r(e.targetAnchor, t, o);
    const { el: l, anchor: s, shapeFlag: a, children: c, props: u } = e, d = i === 2;
    if (d && r(l, t, o), (!d || wr(u)) && a & 16) for (let f = 0; f < c.length; f++) n(c[f], t, o, 2);
    d && r(s, t, o);
  }
  function Pp(e, t, o, r, n, i, { o: { nextSibling: l, parentNode: s, querySelector: a, insert: c, createText: u } }, d) {
    function f(v, x) {
      let S = x;
      for (; S; ) {
        if (S && S.nodeType === 8) {
          if (S.data === "teleport start anchor") t.targetStart = S;
          else if (S.data === "teleport anchor") {
            t.targetAnchor = S, v._lpa = t.targetAnchor && l(t.targetAnchor);
            break;
          }
        }
        S = l(S);
      }
    }
    function p(v, x) {
      x.anchor = d(l(v), x, s(v), o, r, n, i);
    }
    const h = t.target = Bi(t.props, a), m = wr(t.props);
    if (h) {
      const v = h._lpa || h.firstChild;
      t.shapeFlag & 16 && (m ? (p(e, t), f(h, v), t.targetAnchor || Fi(h, t, u, c, s(e) === h ? e : null)) : (t.anchor = l(e), f(h, v), t.targetAnchor || Fi(h, t, u, c), d(v && l(v), t, h, o, r, n, i))), pn(t, m);
    } else m && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = l(e));
    return t.anchor && l(t.anchor);
  }
  gc = hc;
  function pn(e, t) {
    const o = e.ctx;
    if (o && o.ut) {
      let r, n;
      for (t ? (r = e.el, n = e.anchor) : (r = e.targetStart, n = e.targetAnchor); r && r !== n; ) r.nodeType === 1 && r.setAttribute("data-v-owner", o.uid), r = r.nextSibling;
      o.ut();
    }
  }
  function Fi(e, t, o, r, n = null) {
    const i = t.targetStart = o(""), l = t.targetAnchor = o("");
    return i[fc] = l, e && (r(i, e, n), r(l, e, n)), l;
  }
  const zt = Symbol("_leaveCb"), fr = Symbol("_enterCb");
  function mc() {
    const e = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return Fo(() => {
      e.isMounted = true;
    }), Xn(() => {
      e.isUnmounting = true;
    }), e;
  }
  const Ct = [
    Function,
    Array
  ], bc = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ct,
    onEnter: Ct,
    onAfterEnter: Ct,
    onEnterCancelled: Ct,
    onBeforeLeave: Ct,
    onLeave: Ct,
    onAfterLeave: Ct,
    onLeaveCancelled: Ct,
    onBeforeAppear: Ct,
    onAppear: Ct,
    onAfterAppear: Ct,
    onAppearCancelled: Ct
  }, vc = (e) => {
    const t = e.subTree;
    return t.component ? vc(t.component) : t;
  }, Tp = {
    name: "BaseTransition",
    props: bc,
    setup(e, { slots: t }) {
      const o = qr(), r = mc();
      return () => {
        const n = t.default && wl(t.default(), true);
        if (!n || !n.length) return;
        const i = xc(n), l = me(e), { mode: s } = l;
        if (r.isLeaving) return mi(i);
        const a = Ql(i);
        if (!a) return mi(i);
        let c = zr(a, l, r, o, (d) => c = d);
        a.type !== tt && zo(a, c);
        let u = o.subTree && Ql(o.subTree);
        if (u && u.type !== tt && !_o(u, a) && vc(o).type !== tt) {
          let d = zr(u, l, r, o);
          if (zo(u, d), s === "out-in" && a.type !== tt) return r.isLeaving = true, d.afterLeave = () => {
            r.isLeaving = false, o.job.flags & 8 || o.update(), delete d.afterLeave, u = void 0;
          }, mi(i);
          s === "in-out" && a.type !== tt ? d.delayLeave = (f, p, h) => {
            const m = Cc(r, u);
            m[String(u.key)] = u, f[zt] = () => {
              p(), f[zt] = void 0, delete c.delayedLeave, u = void 0;
            }, c.delayedLeave = () => {
              h(), delete c.delayedLeave, u = void 0;
            };
          } : u = void 0;
        } else u && (u = void 0);
        return i;
      };
    }
  };
  function xc(e) {
    let t = e[0];
    if (e.length > 1) {
      for (const o of e) if (o.type !== tt) {
        t = o;
        break;
      }
    }
    return t;
  }
  const _p = Tp;
  function Cc(e, t) {
    const { leavingVNodes: o } = e;
    let r = o.get(t.type);
    return r || (r = /* @__PURE__ */ Object.create(null), o.set(t.type, r)), r;
  }
  function zr(e, t, o, r, n) {
    const { appear: i, mode: l, persisted: s = false, onBeforeEnter: a, onEnter: c, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: p, onAfterLeave: h, onLeaveCancelled: m, onBeforeAppear: v, onAppear: x, onAfterAppear: S, onAppearCancelled: T } = t, A = String(e.key), B = Cc(o, e), k = (y, O) => {
      y && _t(y, r, 9, O);
    }, P = (y, O) => {
      const L = O[1];
      k(y, O), le(y) ? y.every((I) => I.length <= 1) && L() : y.length <= 1 && L();
    }, w = {
      mode: l,
      persisted: s,
      beforeEnter(y) {
        let O = a;
        if (!o.isMounted) if (i) O = v || a;
        else return;
        y[zt] && y[zt](true);
        const L = B[A];
        L && _o(e, L) && L.el[zt] && L.el[zt](), k(O, [
          y
        ]);
      },
      enter(y) {
        if (B[A] === e) return;
        let O = c, L = u, I = d;
        if (!o.isMounted) if (i) O = x || c, L = S || u, I = T || d;
        else return;
        let q = false;
        y[fr] = (de) => {
          q || (q = true, de ? k(I, [
            y
          ]) : k(L, [
            y
          ]), w.delayedLeave && w.delayedLeave(), y[fr] = void 0);
        };
        const se = y[fr].bind(null, false);
        O ? P(O, [
          y,
          se
        ]) : se();
      },
      leave(y, O) {
        const L = String(e.key);
        if (y[fr] && y[fr](true), o.isUnmounting) return O();
        k(f, [
          y
        ]);
        let I = false;
        y[zt] = (se) => {
          I || (I = true, O(), se ? k(m, [
            y
          ]) : k(h, [
            y
          ]), y[zt] = void 0, B[L] === e && delete B[L]);
        };
        const q = y[zt].bind(null, false);
        B[L] = e, p ? P(p, [
          y,
          q
        ]) : q();
      },
      clone(y) {
        const O = zr(y, t, o, r, n);
        return n && n(O), O;
      }
    };
    return w;
  }
  function mi(e) {
    if (Un(e)) return e = bo(e), e.children = null, e;
  }
  function Ql(e) {
    if (!Un(e)) return pc(e.type) && e.children ? xc(e.children) : e;
    if (e.component) return e.component.subTree;
    const { shapeFlag: t, children: o } = e;
    if (o) {
      if (t & 16) return o[0];
      if (t & 32 && ue(o.default)) return o.default();
    }
  }
  function zo(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, zo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  function wl(e, t = false, o) {
    let r = [], n = 0;
    for (let i = 0; i < e.length; i++) {
      let l = e[i];
      const s = o == null ? l.key : String(o) + String(l.key != null ? l.key : i);
      l.type === qe ? (l.patchFlag & 128 && n++, r = r.concat(wl(l.children, t, s))) : (t || l.type !== tt) && r.push(s != null ? bo(l, {
        key: s
      }) : l);
    }
    if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
  }
  Le = function(e, t) {
    return ue(e) ? We({
      name: e.name
    }, t, {
      setup: e
    }) : e;
  };
  function Sc(e) {
    e.ids = [
      e.ids[0] + e.ids[2]++ + "-",
      0,
      0
    ];
  }
  function Zl(e, t) {
    let o;
    return !!((o = Object.getOwnPropertyDescriptor(e, t)) && !o.configurable);
  }
  const wn = /* @__PURE__ */ new WeakMap();
  function Pr(e, t, o, r, n = false) {
    if (le(e)) {
      e.forEach((m, v) => Pr(m, t && (le(t) ? t[v] : t), o, r, n));
      return;
    }
    if (Qo(r) && !n) {
      r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Pr(e, t, o, r.component.subTree);
      return;
    }
    const i = r.shapeFlag & 4 ? Qn(r.component) : r.el, l = n ? null : i, { i: s, r: a } = e, c = t && t.r, u = s.refs === Pe ? s.refs = {} : s.refs, d = s.setupState, f = me(d), p = d === Pe ? Ha : (m) => Zl(u, m) ? false : Se(f, m), h = (m, v) => !(v && Zl(u, v));
    if (c != null && c !== a) {
      if (es(t), ze(c)) u[c] = null, p(c) && (d[c] = null);
      else if ($e(c)) {
        const m = t;
        h(c, m.k) && (c.value = null), m.k && (u[m.k] = null);
      }
    }
    if (ue(a)) Kr(a, s, 12, [
      l,
      u
    ]);
    else {
      const m = ze(a), v = $e(a);
      if (m || v) {
        const x = () => {
          if (e.f) {
            const S = m ? p(a) ? d[a] : u[a] : h() || !e.k ? a.value : u[e.k];
            if (n) le(S) && cl(S, i);
            else if (le(S)) S.includes(i) || S.push(i);
            else if (m) u[a] = [
              i
            ], p(a) && (d[a] = u[a]);
            else {
              const T = [
                i
              ];
              h(a, e.k) && (a.value = T), e.k && (u[e.k] = T);
            }
          } else m ? (u[a] = l, p(a) && (d[a] = l)) : v && (h(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
        };
        if (l) {
          const S = () => {
            x(), wn.delete(e);
          };
          S.id = -1, wn.set(e, S), Je(S, o);
        } else es(e), x();
      }
    }
  }
  function es(e) {
    const t = wn.get(e);
    t && (t.flags |= 8, wn.delete(e));
  }
  kn().requestIdleCallback;
  kn().cancelIdleCallback;
  const Qo = (e) => !!e.type.__asyncLoader, Un = (e) => e.type.__isKeepAlive;
  yc = function(e, t) {
    Pc(e, "a", t);
  };
  wc = function(e, t) {
    Pc(e, "da", t);
  };
  function Pc(e, t, o = ot) {
    const r = e.__wdc || (e.__wdc = () => {
      let n = o;
      for (; n; ) {
        if (n.isDeactivated) return;
        n = n.parent;
      }
      return e();
    });
    if (Kn(t, r, o), o) {
      let n = o.parent;
      for (; n && n.parent; ) Un(n.parent.vnode) && Ep(r, t, o, n), n = n.parent;
    }
  }
  function Ep(e, t, o, r) {
    const n = Kn(t, e, r, true);
    _c(() => {
      cl(r[t], n);
    }, o);
  }
  function Kn(e, t, o = ot, r = false) {
    if (o) {
      const n = o[e] || (o[e] = []), i = t.__weh || (t.__weh = (...l) => {
        Qt();
        const s = Xr(o), a = _t(t, o, e, l);
        return s(), Zt(), a;
      });
      return r ? n.unshift(i) : n.push(i), i;
    }
  }
  let ro, Rp, Tc, Ap, Hp, Ip;
  ro = (e) => (t, o = ot) => {
    (!Fr || e === "sp") && Kn(e, (...r) => t(...r), o);
  };
  qn = ro("bm");
  Fo = ro("m");
  Rp = ro("bu");
  Tc = ro("u");
  Xn = ro("bum");
  _c = ro("um");
  Ap = ro("sp");
  Hp = ro("rtg");
  Ip = ro("rtc");
  function $p(e, t = ot) {
    Kn("ec", e, t);
  }
  const Op = "components";
  Mp = function(e, t) {
    return Dp(Op, e, true, t) || e;
  };
  const zp = Symbol.for("v-ndc");
  function Dp(e, t, o = true, r = false) {
    const n = Xe || ot;
    if (n) {
      const i = n.type;
      {
        const s = Ch(i, false);
        if (s && (s === t || s === st(t) || s === Ln(st(t)))) return i;
      }
      const l = ts(n[e] || i[e], t) || ts(n.appContext[e], t);
      return !l && r ? i : l;
    }
  }
  function ts(e, t) {
    return e && (e[t] || e[st(t)] || e[Ln(st(t))]);
  }
  jy = function(e, t, o, r) {
    let n;
    const i = o, l = le(e);
    if (l || ze(e)) {
      const s = l && Yt(e);
      let a = false, c = false;
      s && (a = !mt(e), c = eo(e), e = jn(e)), n = new Array(e.length);
      for (let u = 0, d = e.length; u < d; u++) n[u] = t(a ? c ? er(Tt(e[u])) : Tt(e[u]) : e[u], u, void 0, i);
    } else if (typeof e == "number") {
      n = new Array(e);
      for (let s = 0; s < e; s++) n[s] = t(s + 1, s, void 0, i);
    } else if (ve(e)) if (e[Symbol.iterator]) n = Array.from(e, (s, a) => t(s, a, void 0, i));
    else {
      const s = Object.keys(e);
      n = new Array(s.length);
      for (let a = 0, c = s.length; a < c; a++) {
        const u = s[a];
        n[a] = t(e[u], u, a, i);
      }
    }
    else n = [];
    return n;
  };
  Bp = function(e, t, o = {}, r, n) {
    if (Xe.ce || Xe.parent && Qo(Xe.parent) && Xe.parent.ce) {
      const c = Object.keys(o).length > 0;
      return Tn(), En(qe, null, [
        Ke("slot", o, r)
      ], c ? -2 : 64);
    }
    let i = e[t];
    i && i._c && (i._d = false), Tn();
    const l = i && Ec(i(o)), s = o.key || l && l.key, a = En(qe, {
      key: (s && !bt(s) ? s : `_${t}`) + (!l && r ? "_fb" : "")
    }, l || [], l && e._ === 1 ? 64 : -2);
    return a.scopeId && (a.slotScopeIds = [
      a.scopeId + "-s"
    ]), i && i._c && (i._d = true), a;
  };
  function Ec(e) {
    return e.some((t) => Br(t) ? !(t.type === tt || t.type === qe && !Ec(t.children)) : true) ? e : null;
  }
  const Li = (e) => e ? qc(e) ? Qn(e) : Li(e.parent) : null, Tr = We(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Li(e.parent),
    $root: (e) => Li(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ac(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Sl(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Vn.bind(e.proxy)),
    $watch: (e) => yp.bind(e)
  }), bi = (e, t) => e !== Pe && !e.__isScriptSetup && Se(e, t), Fp = {
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
          if (bi(r, t)) return l[t] = 1, r[t];
          if (n !== Pe && Se(n, t)) return l[t] = 2, n[t];
          if (Se(i, t)) return l[t] = 3, i[t];
          if (o !== Pe && Se(o, t)) return l[t] = 4, o[t];
          ki && (l[t] = 0);
        }
      }
      const c = Tr[t];
      let u, d;
      if (c) return t === "$attrs" && Ze(e.attrs, "get", ""), c(e);
      if ((u = s.__cssModules) && (u = u[t])) return u;
      if (o !== Pe && Se(o, t)) return l[t] = 4, o[t];
      if (d = a.config.globalProperties, Se(d, t)) return d[t];
    },
    set({ _: e }, t, o) {
      const { data: r, setupState: n, ctx: i } = e;
      return bi(n, t) ? (n[t] = o, true) : r !== Pe && Se(r, t) ? (r[t] = o, true) : Se(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = o, true);
    },
    has({ _: { data: e, setupState: t, accessCache: o, ctx: r, appContext: n, props: i, type: l } }, s) {
      let a;
      return !!(o[s] || e !== Pe && s[0] !== "$" && Se(e, s) || bi(t, s) || Se(i, s) || Se(r, s) || Se(Tr, s) || Se(n.config.globalProperties, s) || (a = l.__cssModules) && a[s]);
    },
    defineProperty(e, t, o) {
      return o.get != null ? e._.accessCache[t] = 0 : Se(o, "value") && this.set(e, t, o.value, null), Reflect.defineProperty(e, t, o);
    }
  };
  function os(e) {
    return le(e) ? e.reduce((t, o) => (t[o] = null, t), {}) : e;
  }
  let ki = true;
  function Lp(e) {
    const t = Ac(e), o = e.proxy, r = e.ctx;
    ki = false, t.beforeCreate && rs(t.beforeCreate, e, "bc");
    const { data: n, computed: i, methods: l, watch: s, provide: a, inject: c, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: h, activated: m, deactivated: v, beforeDestroy: x, beforeUnmount: S, destroyed: T, unmounted: A, render: B, renderTracked: k, renderTriggered: P, errorCaptured: w, serverPrefetch: y, expose: O, inheritAttrs: L, components: I, directives: q, filters: se } = t;
    if (c && kp(c, r, null), l) for (const Y in l) {
      const ae = l[Y];
      ue(ae) && (r[Y] = ae.bind(o));
    }
    if (n) {
      const Y = n.call(o, o);
      ve(Y) && (e.data = Bo(Y));
    }
    if (ki = true, i) for (const Y in i) {
      const ae = i[Y], Oe = ue(ae) ? ae.bind(o, o) : ue(ae.get) ? ae.get.bind(o, o) : Lt, ke = !ue(ae) && ue(ae.set) ? ae.set.bind(o) : Lt, De = ie({
        get: Oe,
        set: ke
      });
      Object.defineProperty(r, Y, {
        enumerable: true,
        configurable: true,
        get: () => De.value,
        set: (Be) => De.value = Be
      });
    }
    if (s) for (const Y in s) Rc(s[Y], r, o, Y);
    if (a) {
      const Y = ue(a) ? a.call(o) : a;
      Reflect.ownKeys(Y).forEach((ae) => {
        Jt(ae, Y[ae]);
      });
    }
    u && rs(u, e, "c");
    function ne(Y, ae) {
      le(ae) ? ae.forEach((Oe) => Y(Oe.bind(o))) : ae && Y(ae.bind(o));
    }
    if (ne(qn, d), ne(Fo, f), ne(Rp, p), ne(Tc, h), ne(yc, m), ne(wc, v), ne($p, w), ne(Ip, k), ne(Hp, P), ne(Xn, S), ne(_c, A), ne(Ap, y), le(O)) if (O.length) {
      const Y = e.exposed || (e.exposed = {});
      O.forEach((ae) => {
        Object.defineProperty(Y, ae, {
          get: () => o[ae],
          set: (Oe) => o[ae] = Oe,
          enumerable: true
        });
      });
    } else e.exposed || (e.exposed = {});
    B && e.render === Lt && (e.render = B), L != null && (e.inheritAttrs = L), I && (e.components = I), q && (e.directives = q), y && Sc(e);
  }
  function kp(e, t, o = Lt) {
    le(e) && (e = ji(e));
    for (const r in e) {
      const n = e[r];
      let i;
      ve(n) ? "default" in n ? i = Ae(n.from || r, n.default, true) : i = Ae(n.from || r) : i = Ae(n), $e(i) ? Object.defineProperty(t, r, {
        enumerable: true,
        configurable: true,
        get: () => i.value,
        set: (l) => i.value = l
      }) : t[r] = i;
    }
  }
  function rs(e, t, o) {
    _t(le(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, o);
  }
  function Rc(e, t, o, r) {
    let n = r.includes(".") ? dc(o, r) : () => o[r];
    if (ze(e)) {
      const i = t[e];
      ue(i) && Jo(n, i);
    } else if (ue(e)) Jo(n, e.bind(o));
    else if (ve(e)) if (le(e)) e.forEach((i) => Rc(i, t, o, r));
    else {
      const i = ue(e.handler) ? e.handler.bind(o) : t[e.handler];
      ue(i) && Jo(n, i, e);
    }
  }
  function Ac(e) {
    const t = e.type, { mixins: o, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, s = i.get(t);
    let a;
    return s ? a = s : !n.length && !o && !r ? a = t : (a = {}, n.length && n.forEach((c) => Pn(a, c, l, true)), Pn(a, t, l)), ve(t) && i.set(t, a), a;
  }
  function Pn(e, t, o, r = false) {
    const { mixins: n, extends: i } = t;
    i && Pn(e, i, o, true), n && n.forEach((l) => Pn(e, l, o, true));
    for (const l in t) if (!(r && l === "expose")) {
      const s = jp[l] || o && o[l];
      e[l] = s ? s(e[l], t[l]) : t[l];
    }
    return e;
  }
  const jp = {
    data: ns,
    props: is,
    emits: is,
    methods: br,
    computed: br,
    beforeCreate: nt,
    created: nt,
    beforeMount: nt,
    mounted: nt,
    beforeUpdate: nt,
    updated: nt,
    beforeDestroy: nt,
    beforeUnmount: nt,
    destroyed: nt,
    unmounted: nt,
    activated: nt,
    deactivated: nt,
    errorCaptured: nt,
    serverPrefetch: nt,
    components: br,
    directives: br,
    watch: Np,
    provide: ns,
    inject: Wp
  };
  function ns(e, t) {
    return t ? e ? function() {
      return We(ue(e) ? e.call(this, this) : e, ue(t) ? t.call(this, this) : t);
    } : t : e;
  }
  function Wp(e, t) {
    return br(ji(e), ji(t));
  }
  function ji(e) {
    if (le(e)) {
      const t = {};
      for (let o = 0; o < e.length; o++) t[e[o]] = e[o];
      return t;
    }
    return e;
  }
  function nt(e, t) {
    return e ? [
      ...new Set([].concat(e, t))
    ] : t;
  }
  function br(e, t) {
    return e ? We(/* @__PURE__ */ Object.create(null), e, t) : t;
  }
  function is(e, t) {
    return e ? le(e) && le(t) ? [
      .../* @__PURE__ */ new Set([
        ...e,
        ...t
      ])
    ] : We(/* @__PURE__ */ Object.create(null), os(e), os(t ?? {})) : t;
  }
  function Np(e, t) {
    if (!e) return t;
    if (!t) return e;
    const o = We(/* @__PURE__ */ Object.create(null), e);
    for (const r in t) o[r] = nt(e[r], t[r]);
    return o;
  }
  function Hc() {
    return {
      app: null,
      config: {
        isNativeTag: Ha,
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
  let Vp = 0;
  function Gp(e, t) {
    return function(r, n = null) {
      ue(r) || (r = We({}, r)), n != null && !ve(n) && (n = null);
      const i = Hc(), l = /* @__PURE__ */ new WeakSet(), s = [];
      let a = false;
      const c = i.app = {
        _uid: Vp++,
        _component: r,
        _props: n,
        _container: null,
        _context: i,
        _instance: null,
        version: yh,
        get config() {
          return i.config;
        },
        set config(u) {
        },
        use(u, ...d) {
          return l.has(u) || (u && ue(u.install) ? (l.add(u), u.install(c, ...d)) : ue(u) && (l.add(u), u(c, ...d))), c;
        },
        mixin(u) {
          return i.mixins.includes(u) || i.mixins.push(u), c;
        },
        component(u, d) {
          return d ? (i.components[u] = d, c) : i.components[u];
        },
        directive(u, d) {
          return d ? (i.directives[u] = d, c) : i.directives[u];
        },
        mount(u, d, f) {
          if (!a) {
            const p = c._ceVNode || Ke(r, n);
            return p.appContext = i, f === true ? f = "svg" : f === false && (f = void 0), e(p, u, f), a = true, c._container = u, u.__vue_app__ = c, Qn(p.component);
          }
        },
        onUnmount(u) {
          s.push(u);
        },
        unmount() {
          a && (_t(s, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
        },
        provide(u, d) {
          return i.provides[u] = d, c;
        },
        runWithContext(u) {
          const d = Io;
          Io = c;
          try {
            return u();
          } finally {
            Io = d;
          }
        }
      };
      return c;
    };
  }
  let Io = null;
  const Up = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${st(t)}Modifiers`] || e[`${xo(t)}Modifiers`];
  function Kp(e, t, ...o) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || Pe;
    let n = o;
    const i = t.startsWith("update:"), l = i && Up(r, t.slice(7));
    l && (l.trim && (n = o.map((u) => ze(u) ? u.trim() : u)), l.number && (n = o.map(If)));
    let s, a = r[s = ui(t)] || r[s = ui(st(t))];
    !a && i && (a = r[s = ui(xo(t))]), a && _t(a, e, 6, n);
    const c = r[s + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[s]) return;
      e.emitted[s] = true, _t(c, e, 6, n);
    }
  }
  const qp = /* @__PURE__ */ new WeakMap();
  function Ic(e, t, o = false) {
    const r = o ? qp : t.emitsCache, n = r.get(e);
    if (n !== void 0) return n;
    const i = e.emits;
    let l = {}, s = false;
    if (!ue(e)) {
      const a = (c) => {
        const u = Ic(c, t, true);
        u && (s = true, We(l, u));
      };
      !o && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
    }
    return !i && !s ? (ve(e) && r.set(e, null), null) : (le(i) ? i.forEach((a) => l[a] = null) : We(l, i), ve(e) && r.set(e, l), l);
  }
  function Yn(e, t) {
    return !e || !zn(t) ? false : (t = t.slice(2).replace(/Once$/, ""), Se(e, t[0].toLowerCase() + t.slice(1)) || Se(e, xo(t)) || Se(e, t));
  }
  function ls(e) {
    const { type: t, vnode: o, proxy: r, withProxy: n, propsOptions: [i], slots: l, attrs: s, emit: a, render: c, renderCache: u, props: d, data: f, setupState: p, ctx: h, inheritAttrs: m } = e, v = yn(e);
    let x, S;
    try {
      if (o.shapeFlag & 4) {
        const A = n || r, B = A;
        x = Bt(c.call(B, A, u, d, p, f, h)), S = s;
      } else {
        const A = t;
        x = Bt(A.length > 1 ? A(d, {
          attrs: s,
          slots: l,
          emit: a
        }) : A(d, null)), S = t.props ? s : Xp(s);
      }
    } catch (A) {
      _r.length = 0, Nn(A, e, 1), x = Ke(tt);
    }
    let T = x;
    if (S && m !== false) {
      const A = Object.keys(S), { shapeFlag: B } = T;
      A.length && B & 7 && (i && A.some(Dn) && (S = Yp(S, i)), T = bo(T, S, false, true));
    }
    return o.dirs && (T = bo(T, null, false, true), T.dirs = T.dirs ? T.dirs.concat(o.dirs) : o.dirs), o.transition && zo(T, o.transition), x = T, yn(v), x;
  }
  const Xp = (e) => {
    let t;
    for (const o in e) (o === "class" || o === "style" || zn(o)) && ((t || (t = {}))[o] = e[o]);
    return t;
  }, Yp = (e, t) => {
    const o = {};
    for (const r in e) (!Dn(r) || !(r.slice(9) in t)) && (o[r] = e[r]);
    return o;
  };
  function Jp(e, t, o) {
    const { props: r, children: n, component: i } = e, { props: l, children: s, patchFlag: a } = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return true;
    if (o && a >= 0) {
      if (a & 1024) return true;
      if (a & 16) return r ? ss(r, l, c) : !!l;
      if (a & 8) {
        const u = t.dynamicProps;
        for (let d = 0; d < u.length; d++) {
          const f = u[d];
          if ($c(l, r, f) && !Yn(c, f)) return true;
        }
      }
    } else return (n || s) && (!s || !s.$stable) ? true : r === l ? false : r ? l ? ss(r, l, c) : true : !!l;
    return false;
  }
  function ss(e, t, o) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return true;
    for (let n = 0; n < r.length; n++) {
      const i = r[n];
      if ($c(t, e, i) && !Yn(o, i)) return true;
    }
    return false;
  }
  function $c(e, t, o) {
    const r = e[o], n = t[o];
    return o === "style" && ve(r) && ve(n) ? !fl(r, n) : r !== n;
  }
  function Qp({ vnode: e, parent: t, suspense: o }, r) {
    for (; t; ) {
      const n = t.subTree;
      if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
      else break;
    }
    o && o.activeBranch === e && (o.vnode.el = r);
  }
  const Oc = {}, Mc = () => Object.create(Oc), zc = (e) => Object.getPrototypeOf(e) === Oc;
  function Zp(e, t, o, r = false) {
    const n = {}, i = Mc();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), Dc(e, t, n, i);
    for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
    o ? e.props = r ? n : oc(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
  }
  function eh(e, t, o, r) {
    const { props: n, attrs: i, vnode: { patchFlag: l } } = e, s = me(n), [a] = e.propsOptions;
    let c = false;
    if ((r || l > 0) && !(l & 16)) {
      if (l & 8) {
        const u = e.vnode.dynamicProps;
        for (let d = 0; d < u.length; d++) {
          let f = u[d];
          if (Yn(e.emitsOptions, f)) continue;
          const p = t[f];
          if (a) if (Se(i, f)) p !== i[f] && (i[f] = p, c = true);
          else {
            const h = st(f);
            n[h] = Wi(a, s, h, p, e, false);
          }
          else p !== i[f] && (i[f] = p, c = true);
        }
      }
    } else {
      Dc(e, t, n, i) && (c = true);
      let u;
      for (const d in s) (!t || !Se(t, d) && ((u = xo(d)) === d || !Se(t, u))) && (a ? o && (o[d] !== void 0 || o[u] !== void 0) && (n[d] = Wi(a, s, d, void 0, e, true)) : delete n[d]);
      if (i !== s) for (const d in i) (!t || !Se(t, d)) && (delete i[d], c = true);
    }
    c && qt(e.attrs, "set", "");
  }
  function Dc(e, t, o, r) {
    const [n, i] = e.propsOptions;
    let l = false, s;
    if (t) for (let a in t) {
      if (Cr(a)) continue;
      const c = t[a];
      let u;
      n && Se(n, u = st(a)) ? !i || !i.includes(u) ? o[u] = c : (s || (s = {}))[u] = c : Yn(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = true);
    }
    if (i) {
      const a = me(o), c = s || Pe;
      for (let u = 0; u < i.length; u++) {
        const d = i[u];
        o[d] = Wi(n, a, d, c[d], e, !Se(c, d));
      }
    }
    return l;
  }
  function Wi(e, t, o, r, n, i) {
    const l = e[o];
    if (l != null) {
      const s = Se(l, "default");
      if (s && r === void 0) {
        const a = l.default;
        if (l.type !== Function && !l.skipFactory && ue(a)) {
          const { propsDefaults: c } = n;
          if (o in c) r = c[o];
          else {
            const u = Xr(n);
            r = c[o] = a.call(null, t), u();
          }
        } else r = a;
        n.ce && n.ce._setProp(o, r);
      }
      l[0] && (i && !s ? r = false : l[1] && (r === "" || r === xo(o)) && (r = true));
    }
    return r;
  }
  const th = /* @__PURE__ */ new WeakMap();
  function Bc(e, t, o = false) {
    const r = o ? th : t.propsCache, n = r.get(e);
    if (n) return n;
    const i = e.props, l = {}, s = [];
    let a = false;
    if (!ue(e)) {
      const u = (d) => {
        a = true;
        const [f, p] = Bc(d, t, true);
        We(l, f), p && s.push(...p);
      };
      !o && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
    }
    if (!i && !a) return ve(e) && r.set(e, qo), qo;
    if (le(i)) for (let u = 0; u < i.length; u++) {
      const d = st(i[u]);
      as(d) && (l[d] = Pe);
    }
    else if (i) for (const u in i) {
      const d = st(u);
      if (as(d)) {
        const f = i[u], p = l[d] = le(f) || ue(f) ? {
          type: f
        } : We({}, f), h = p.type;
        let m = false, v = true;
        if (le(h)) for (let x = 0; x < h.length; ++x) {
          const S = h[x], T = ue(S) && S.name;
          if (T === "Boolean") {
            m = true;
            break;
          } else T === "String" && (v = false);
        }
        else m = ue(h) && h.name === "Boolean";
        p[0] = m, p[1] = v, (m || Se(p, "default")) && s.push(d);
      }
    }
    const c = [
      l,
      s
    ];
    return ve(e) && r.set(e, c), c;
  }
  function as(e) {
    return e[0] !== "$" && !Cr(e);
  }
  const Pl = (e) => e === "_" || e === "_ctx" || e === "$stable", Tl = (e) => le(e) ? e.map(Bt) : [
    Bt(e)
  ], oh = (e, t, o) => {
    if (t._n) return t;
    const r = fn((...n) => Tl(t(...n)), o);
    return r._c = false, r;
  }, Fc = (e, t, o) => {
    const r = e._ctx;
    for (const n in e) {
      if (Pl(n)) continue;
      const i = e[n];
      if (ue(i)) t[n] = oh(n, i, r);
      else if (i != null) {
        const l = Tl(i);
        t[n] = () => l;
      }
    }
  }, Lc = (e, t) => {
    const o = Tl(t);
    e.slots.default = () => o;
  }, kc = (e, t, o) => {
    for (const r in t) (o || !Pl(r)) && (e[r] = t[r]);
  }, rh = (e, t, o) => {
    const r = e.slots = Mc();
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? (kc(r, t, o), o && za(r, "_", n, true)) : Fc(t, r);
    } else t && Lc(e, t);
  }, nh = (e, t, o) => {
    const { vnode: r, slots: n } = e;
    let i = true, l = Pe;
    if (r.shapeFlag & 32) {
      const s = t._;
      s ? o && s === 1 ? i = false : kc(n, t, o) : (i = !t.$stable, Fc(t, n)), l = t;
    } else t && (Lc(e, t), l = {
      default: 1
    });
    if (i) for (const s in n) !Pl(s) && l[s] == null && delete n[s];
  }, Je = ch;
  function ih(e) {
    return lh(e);
  }
  function lh(e, t) {
    const o = kn();
    o.__VUE__ = true;
    const { insert: r, remove: n, patchProp: i, createElement: l, createText: s, createComment: a, setText: c, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = Lt, insertStaticContent: h } = e, m = (g, b, C, _ = null, H = null, E = null, W = void 0, j = null, F = !!b.dynamicChildren) => {
      if (g === b) return;
      g && !_o(g, b) && (_ = R(g), Be(g, H, E, true), g = null), b.patchFlag === -2 && (F = false, b.dynamicChildren = null);
      const { type: $, ref: oe, shapeFlag: G } = b;
      switch ($) {
        case Jn:
          v(g, b, C, _);
          break;
        case tt:
          x(g, b, C, _);
          break;
        case xi:
          g == null && S(b, C, _, W);
          break;
        case qe:
          I(g, b, C, _, H, E, W, j, F);
          break;
        default:
          G & 1 ? B(g, b, C, _, H, E, W, j, F) : G & 6 ? q(g, b, C, _, H, E, W, j, F) : (G & 64 || G & 128) && $.process(g, b, C, _, H, E, W, j, F, ee);
      }
      oe != null && H ? Pr(oe, g && g.ref, E, b || g, !b) : oe == null && g && g.ref != null && Pr(g.ref, null, E, g, true);
    }, v = (g, b, C, _) => {
      if (g == null) r(b.el = s(b.children), C, _);
      else {
        const H = b.el = g.el;
        b.children !== g.children && c(H, b.children);
      }
    }, x = (g, b, C, _) => {
      g == null ? r(b.el = a(b.children || ""), C, _) : b.el = g.el;
    }, S = (g, b, C, _) => {
      [g.el, g.anchor] = h(g.children, b, C, _, g.el, g.anchor);
    }, T = ({ el: g, anchor: b }, C, _) => {
      let H;
      for (; g && g !== b; ) H = f(g), r(g, C, _), g = H;
      r(b, C, _);
    }, A = ({ el: g, anchor: b }) => {
      let C;
      for (; g && g !== b; ) C = f(g), n(g), g = C;
      n(b);
    }, B = (g, b, C, _, H, E, W, j, F) => {
      if (b.type === "svg" ? W = "svg" : b.type === "math" && (W = "mathml"), g == null) k(b, C, _, H, E, W, j, F);
      else {
        const $ = g.el && g.el._isVueCE ? g.el : null;
        try {
          $ && $._beginPatch(), y(g, b, H, E, W, j, F);
        } finally {
          $ && $._endPatch();
        }
      }
    }, k = (g, b, C, _, H, E, W, j) => {
      let F, $;
      const { props: oe, shapeFlag: G, transition: Z, dirs: te } = g;
      if (F = g.el = l(g.type, E, oe && oe.is, oe), G & 8 ? u(F, g.children) : G & 16 && w(g.children, F, null, _, H, vi(g, E), W, j), te && Co(g, null, _, "created"), P(F, g, g.scopeId, W, _), oe) {
        for (const ye in oe) ye !== "value" && !Cr(ye) && i(F, ye, null, oe[ye], E, _);
        "value" in oe && i(F, "value", null, oe.value, E), ($ = oe.onVnodeBeforeMount) && At($, _, g);
      }
      te && Co(g, null, _, "beforeMount");
      const he = sh(H, Z);
      he && Z.beforeEnter(F), r(F, b, C), (($ = oe && oe.onVnodeMounted) || he || te) && Je(() => {
        try {
          $ && At($, _, g), he && Z.enter(F), te && Co(g, null, _, "mounted");
        } finally {
        }
      }, H);
    }, P = (g, b, C, _, H) => {
      if (C && p(g, C), _) for (let E = 0; E < _.length; E++) p(g, _[E]);
      if (H) {
        let E = H.subTree;
        if (b === E || Nc(E.type) && (E.ssContent === b || E.ssFallback === b)) {
          const W = H.vnode;
          P(g, W, W.scopeId, W.slotScopeIds, H.parent);
        }
      }
    }, w = (g, b, C, _, H, E, W, j, F = 0) => {
      for (let $ = F; $ < g.length; $++) {
        const oe = g[$] = j ? Kt(g[$]) : Bt(g[$]);
        m(null, oe, b, C, _, H, E, W, j);
      }
    }, y = (g, b, C, _, H, E, W) => {
      const j = b.el = g.el;
      let { patchFlag: F, dynamicChildren: $, dirs: oe } = b;
      F |= g.patchFlag & 16;
      const G = g.props || Pe, Z = b.props || Pe;
      let te;
      if (C && So(C, false), (te = Z.onVnodeBeforeUpdate) && At(te, C, b, g), oe && Co(b, g, C, "beforeUpdate"), C && So(C, true), (G.innerHTML && Z.innerHTML == null || G.textContent && Z.textContent == null) && u(j, ""), $ ? O(g.dynamicChildren, $, j, C, _, vi(b, H), E) : W || ae(g, b, j, null, C, _, vi(b, H), E, false), F > 0) {
        if (F & 16) L(j, G, Z, C, H);
        else if (F & 2 && G.class !== Z.class && i(j, "class", null, Z.class, H), F & 4 && i(j, "style", G.style, Z.style, H), F & 8) {
          const he = b.dynamicProps;
          for (let ye = 0; ye < he.length; ye++) {
            const we = he[ye], He = G[we], Ne = Z[we];
            (Ne !== He || we === "value") && i(j, we, He, Ne, H, C);
          }
        }
        F & 1 && g.children !== b.children && u(j, b.children);
      } else !W && $ == null && L(j, G, Z, C, H);
      ((te = Z.onVnodeUpdated) || oe) && Je(() => {
        te && At(te, C, b, g), oe && Co(b, g, C, "updated");
      }, _);
    }, O = (g, b, C, _, H, E, W) => {
      for (let j = 0; j < b.length; j++) {
        const F = g[j], $ = b[j], oe = F.el && (F.type === qe || !_o(F, $) || F.shapeFlag & 198) ? d(F.el) : C;
        m(F, $, oe, null, _, H, E, W, true);
      }
    }, L = (g, b, C, _, H) => {
      if (b !== C) {
        if (b !== Pe) for (const E in b) !Cr(E) && !(E in C) && i(g, E, b[E], null, H, _);
        for (const E in C) {
          if (Cr(E)) continue;
          const W = C[E], j = b[E];
          W !== j && E !== "value" && i(g, E, j, W, H, _);
        }
        "value" in C && i(g, "value", b.value, C.value, H);
      }
    }, I = (g, b, C, _, H, E, W, j, F) => {
      const $ = b.el = g ? g.el : s(""), oe = b.anchor = g ? g.anchor : s("");
      let { patchFlag: G, dynamicChildren: Z, slotScopeIds: te } = b;
      te && (j = j ? j.concat(te) : te), g == null ? (r($, C, _), r(oe, C, _), w(b.children || [], C, oe, H, E, W, j, F)) : G > 0 && G & 64 && Z && g.dynamicChildren && g.dynamicChildren.length === Z.length ? (O(g.dynamicChildren, Z, C, H, E, W, j), (b.key != null || H && b === H.subTree) && _l(g, b, true)) : ae(g, b, C, oe, H, E, W, j, F);
    }, q = (g, b, C, _, H, E, W, j, F) => {
      b.slotScopeIds = j, g == null ? b.shapeFlag & 512 ? H.ctx.activate(b, C, _, W, F) : se(b, C, _, H, E, W, F) : de(g, b, F);
    }, se = (g, b, C, _, H, E, W) => {
      const j = g.component = gh(g, _, H);
      if (Un(g) && (j.ctx.renderer = ee), mh(j, false, W), j.asyncDep) {
        if (H && H.registerDep(j, ne, W), !g.el) {
          const F = j.subTree = Ke(tt);
          x(null, F, b, C), g.placeholder = F.el;
        }
      } else ne(j, g, b, C, H, E, W);
    }, de = (g, b, C) => {
      const _ = b.component = g.component;
      if (Jp(g, b, C)) if (_.asyncDep && !_.asyncResolved) {
        Y(_, b, C);
        return;
      } else _.next = b, _.update();
      else b.el = g.el, _.vnode = b;
    }, ne = (g, b, C, _, H, E, W) => {
      const j = () => {
        if (g.isMounted) {
          let { next: G, bu: Z, u: te, parent: he, vnode: ye } = g;
          {
            const ct = jc(g);
            if (ct) {
              G && (G.el = ye.el, Y(g, G, W)), ct.asyncDep.then(() => {
                Je(() => {
                  g.isUnmounted || $();
                }, H);
              });
              return;
            }
          }
          let we = G, He;
          So(g, false), G ? (G.el = ye.el, Y(g, G, W)) : G = ye, Z && di(Z), (He = G.props && G.props.onVnodeBeforeUpdate) && At(He, he, G, ye), So(g, true);
          const Ne = ls(g), at = g.subTree;
          g.subTree = Ne, m(at, Ne, d(at.el), R(at), g, H, E), G.el = Ne.el, we === null && Qp(g, Ne.el), te && Je(te, H), (He = G.props && G.props.onVnodeUpdated) && Je(() => At(He, he, G, ye), H);
        } else {
          let G;
          const { el: Z, props: te } = b, { bm: he, m: ye, parent: we, root: He, type: Ne } = g, at = Qo(b);
          So(g, false), he && di(he), !at && (G = te && te.onVnodeBeforeMount) && At(G, we, b), So(g, true);
          {
            He.ce && He.ce._hasShadowRoot() && He.ce._injectChildStyle(Ne, g.parent ? g.parent.type : void 0);
            const ct = g.subTree = ls(g);
            m(null, ct, C, _, g, H, E), b.el = ct.el;
          }
          if (ye && Je(ye, H), !at && (G = te && te.onVnodeMounted)) {
            const ct = b;
            Je(() => At(G, we, ct), H);
          }
          (b.shapeFlag & 256 || we && Qo(we.vnode) && we.vnode.shapeFlag & 256) && g.a && Je(g.a, H), g.isMounted = true, b = C = _ = null;
        }
      };
      g.scope.on();
      const F = g.effect = new Wa(j);
      g.scope.off();
      const $ = g.update = F.run.bind(F), oe = g.job = F.runIfDirty.bind(F);
      oe.i = g, oe.id = g.uid, F.scheduler = () => Sl(oe), So(g, true), $();
    }, Y = (g, b, C) => {
      b.component = g;
      const _ = g.vnode.props;
      g.vnode = b, g.next = null, eh(g, b.props, _, C), nh(g, b.children, C), Qt(), Xl(g), Zt();
    }, ae = (g, b, C, _, H, E, W, j, F = false) => {
      const $ = g && g.children, oe = g ? g.shapeFlag : 0, G = b.children, { patchFlag: Z, shapeFlag: te } = b;
      if (Z > 0) {
        if (Z & 128) {
          ke($, G, C, _, H, E, W, j, F);
          return;
        } else if (Z & 256) {
          Oe($, G, C, _, H, E, W, j, F);
          return;
        }
      }
      te & 8 ? (oe & 16 && je($, H, E), G !== $ && u(C, G)) : oe & 16 ? te & 16 ? ke($, G, C, _, H, E, W, j, F) : je($, H, E, true) : (oe & 8 && u(C, ""), te & 16 && w(G, C, _, H, E, W, j, F));
    }, Oe = (g, b, C, _, H, E, W, j, F) => {
      g = g || qo, b = b || qo;
      const $ = g.length, oe = b.length, G = Math.min($, oe);
      let Z;
      for (Z = 0; Z < G; Z++) {
        const te = b[Z] = F ? Kt(b[Z]) : Bt(b[Z]);
        m(g[Z], te, C, null, H, E, W, j, F);
      }
      $ > oe ? je(g, H, E, true, false, G) : w(b, C, _, H, E, W, j, F, G);
    }, ke = (g, b, C, _, H, E, W, j, F) => {
      let $ = 0;
      const oe = b.length;
      let G = g.length - 1, Z = oe - 1;
      for (; $ <= G && $ <= Z; ) {
        const te = g[$], he = b[$] = F ? Kt(b[$]) : Bt(b[$]);
        if (_o(te, he)) m(te, he, C, null, H, E, W, j, F);
        else break;
        $++;
      }
      for (; $ <= G && $ <= Z; ) {
        const te = g[G], he = b[Z] = F ? Kt(b[Z]) : Bt(b[Z]);
        if (_o(te, he)) m(te, he, C, null, H, E, W, j, F);
        else break;
        G--, Z--;
      }
      if ($ > G) {
        if ($ <= Z) {
          const te = Z + 1, he = te < oe ? b[te].el : _;
          for (; $ <= Z; ) m(null, b[$] = F ? Kt(b[$]) : Bt(b[$]), C, he, H, E, W, j, F), $++;
        }
      } else if ($ > Z) for (; $ <= G; ) Be(g[$], H, E, true), $++;
      else {
        const te = $, he = $, ye = /* @__PURE__ */ new Map();
        for ($ = he; $ <= Z; $++) {
          const ut = b[$] = F ? Kt(b[$]) : Bt(b[$]);
          ut.key != null && ye.set(ut.key, $);
        }
        let we, He = 0;
        const Ne = Z - he + 1;
        let at = false, ct = 0;
        const lo = new Array(Ne);
        for ($ = 0; $ < Ne; $++) lo[$] = 0;
        for ($ = te; $ <= G; $++) {
          const ut = g[$];
          if (He >= Ne) {
            Be(ut, H, E, true);
            continue;
          }
          let M;
          if (ut.key != null) M = ye.get(ut.key);
          else for (we = he; we <= Z; we++) if (lo[we - he] === 0 && _o(ut, b[we])) {
            M = we;
            break;
          }
          M === void 0 ? Be(ut, H, E, true) : (lo[M - he] = $ + 1, M >= ct ? ct = M : at = true, m(ut, b[M], C, null, H, E, W, j, F), He++);
        }
        const Wt = at ? ah(lo) : qo;
        for (we = Wt.length - 1, $ = Ne - 1; $ >= 0; $--) {
          const ut = he + $, M = b[ut], J = b[ut + 1], ce = ut + 1 < oe ? J.el || Wc(J) : _;
          lo[$] === 0 ? m(null, M, C, ce, H, E, W, j, F) : at && (we < 0 || $ !== Wt[we] ? De(M, C, ce, 2) : we--);
        }
      }
    }, De = (g, b, C, _, H = null) => {
      const { el: E, type: W, transition: j, children: F, shapeFlag: $ } = g;
      if ($ & 6) {
        De(g.component.subTree, b, C, _);
        return;
      }
      if ($ & 128) {
        g.suspense.move(b, C, _);
        return;
      }
      if ($ & 64) {
        W.move(g, b, C, ee);
        return;
      }
      if (W === qe) {
        r(E, b, C);
        for (let G = 0; G < F.length; G++) De(F[G], b, C, _);
        r(g.anchor, b, C);
        return;
      }
      if (W === xi) {
        T(g, b, C);
        return;
      }
      if (_ !== 2 && $ & 1 && j) if (_ === 0) j.beforeEnter(E), r(E, b, C), Je(() => j.enter(E), H);
      else {
        const { leave: G, delayLeave: Z, afterLeave: te } = j, he = () => {
          g.ctx.isUnmounted ? n(E) : r(E, b, C);
        }, ye = () => {
          E._isLeaving && E[zt](true), G(E, () => {
            he(), te && te();
          });
        };
        Z ? Z(E, he, ye) : ye();
      }
      else r(E, b, C);
    }, Be = (g, b, C, _ = false, H = false) => {
      const { type: E, props: W, ref: j, children: F, dynamicChildren: $, shapeFlag: oe, patchFlag: G, dirs: Z, cacheIndex: te, memo: he } = g;
      if (G === -2 && (H = false), j != null && (Qt(), Pr(j, null, C, g, true), Zt()), te != null && (b.renderCache[te] = void 0), oe & 256) {
        b.ctx.deactivate(g);
        return;
      }
      const ye = oe & 1 && Z, we = !Qo(g);
      let He;
      if (we && (He = W && W.onVnodeBeforeUnmount) && At(He, b, g), oe & 6) yt(g.component, C, _);
      else {
        if (oe & 128) {
          g.suspense.unmount(C, _);
          return;
        }
        ye && Co(g, null, b, "beforeUnmount"), oe & 64 ? g.type.remove(g, b, C, ee, _) : $ && !$.hasOnce && (E !== qe || G > 0 && G & 64) ? je($, b, C, false, true) : (E === qe && G & 384 || !H && oe & 16) && je(F, b, C), _ && St(g);
      }
      const Ne = he != null && te == null;
      (we && (He = W && W.onVnodeUnmounted) || ye || Ne) && Je(() => {
        He && At(He, b, g), ye && Co(g, null, b, "unmounted"), Ne && (g.el = null);
      }, C);
    }, St = (g) => {
      const { type: b, el: C, anchor: _, transition: H } = g;
      if (b === qe) {
        Rt(C, _);
        return;
      }
      if (b === xi) {
        A(g);
        return;
      }
      const E = () => {
        n(C), H && !H.persisted && H.afterLeave && H.afterLeave();
      };
      if (g.shapeFlag & 1 && H && !H.persisted) {
        const { leave: W, delayLeave: j } = H, F = () => W(C, E);
        j ? j(g.el, E, F) : F();
      } else E();
    }, Rt = (g, b) => {
      let C;
      for (; g !== b; ) C = f(g), n(g), g = C;
      n(b);
    }, yt = (g, b, C) => {
      const { bum: _, scope: H, job: E, subTree: W, um: j, m: F, a: $ } = g;
      cs(F), cs($), _ && di(_), H.stop(), E && (E.flags |= 8, Be(W, g, b, C)), j && Je(j, b), Je(() => {
        g.isUnmounted = true;
      }, b);
    }, je = (g, b, C, _ = false, H = false, E = 0) => {
      for (let W = E; W < g.length; W++) Be(g[W], b, C, _, H);
    }, R = (g) => {
      if (g.shapeFlag & 6) return R(g.component.subTree);
      if (g.shapeFlag & 128) return g.suspense.next();
      const b = f(g.anchor || g.el), C = b && b[fc];
      return C ? f(C) : b;
    };
    let K = false;
    const N = (g, b, C) => {
      let _;
      g == null ? b._vnode && (Be(b._vnode, null, null, true), _ = b._vnode.component) : m(b._vnode || null, g, b, null, null, null, C), b._vnode = g, K || (K = true, Xl(_), ac(), K = false);
    }, ee = {
      p: m,
      um: Be,
      m: De,
      r: St,
      mt: se,
      mc: w,
      pc: ae,
      pbc: O,
      n: R,
      o: e
    };
    return {
      render: N,
      hydrate: void 0,
      createApp: Gp(N)
    };
  }
  function vi({ type: e, props: t }, o) {
    return o === "svg" && e === "foreignObject" || o === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : o;
  }
  function So({ effect: e, job: t }, o) {
    o ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function sh(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function _l(e, t, o = false) {
    const r = e.children, n = t.children;
    if (le(r) && le(n)) for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let s = n[i];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = n[i] = Kt(n[i]), s.el = l.el), !o && s.patchFlag !== -2 && _l(l, s)), s.type === Jn && (s.patchFlag === -1 && (s = n[i] = Kt(s)), s.el = l.el), s.type === tt && !s.el && (s.el = l.el);
    }
  }
  function ah(e) {
    const t = e.slice(), o = [
      0
    ];
    let r, n, i, l, s;
    const a = e.length;
    for (r = 0; r < a; r++) {
      const c = e[r];
      if (c !== 0) {
        if (n = o[o.length - 1], e[n] < c) {
          t[r] = n, o.push(r);
          continue;
        }
        for (i = 0, l = o.length - 1; i < l; ) s = i + l >> 1, e[o[s]] < c ? i = s + 1 : l = s;
        c < e[o[i]] && (i > 0 && (t[r] = o[i - 1]), o[i] = r);
      }
    }
    for (i = o.length, l = o[i - 1]; i-- > 0; ) o[i] = l, l = t[l];
    return o;
  }
  function jc(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : jc(t);
  }
  function cs(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  function Wc(e) {
    if (e.placeholder) return e.placeholder;
    const t = e.component;
    return t ? Wc(t.subTree) : null;
  }
  const Nc = (e) => e.__isSuspense;
  function ch(e, t) {
    t && t.pendingBranch ? le(e) ? t.effects.push(...e) : t.effects.push(e) : vp(e);
  }
  let xi, _r;
  qe = Symbol.for("v-fgt");
  Jn = Symbol.for("v-txt");
  tt = Symbol.for("v-cmt");
  xi = Symbol.for("v-stc");
  _r = [];
  let ht = null;
  Tn = function(e = false) {
    _r.push(ht = e ? null : []);
  };
  function uh() {
    _r.pop(), ht = _r[_r.length - 1] || null;
  }
  let Dr = 1;
  function _n(e, t = false) {
    Dr += e, e < 0 && ht && t && (ht.hasOnce = true);
  }
  function Vc(e) {
    return e.dynamicChildren = Dr > 0 ? ht || qo : null, uh(), Dr > 0 && ht && ht.push(e), e;
  }
  Wy = function(e, t, o, r, n, i) {
    return Vc(Uc(e, t, o, r, n, i, true));
  };
  En = function(e, t, o, r, n) {
    return Vc(Ke(e, t, o, r, n, true));
  };
  Br = function(e) {
    return e ? e.__v_isVNode === true : false;
  };
  function _o(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const Gc = ({ key: e }) => e ?? null, hn = ({ ref: e, ref_key: t, ref_for: o }) => (typeof e == "number" && (e = "" + e), e != null ? ze(e) || $e(e) || ue(e) ? {
    i: Xe,
    r: e,
    k: t,
    f: !!o
  } : e : null);
  Uc = function(e, t = null, o = null, r = 0, n = null, i = e === qe ? 0 : 1, l = false, s = false) {
    const a = {
      __v_isVNode: true,
      __v_skip: true,
      type: e,
      props: t,
      key: t && Gc(t),
      ref: t && hn(t),
      scopeId: uc,
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
      ctx: Xe
    };
    return s ? (El(a, o), i & 128 && e.normalize(a)) : o && (a.shapeFlag |= ze(o) ? 8 : 16), Dr > 0 && !l && ht && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && ht.push(a), a;
  };
  Ke = dh;
  function dh(e, t = null, o = null, r = 0, n = null, i = false) {
    if ((!e || e === zp) && (e = tt), Br(e)) {
      const s = bo(e, t, true);
      return o && El(s, o), Dr > 0 && !i && ht && (s.shapeFlag & 6 ? ht[ht.indexOf(e)] = s : ht.push(s)), s.patchFlag = -2, s;
    }
    if (Sh(e) && (e = e.__vccOpts), t) {
      t = fh(t);
      let { class: s, style: a } = t;
      s && !ze(s) && (t.class = dl(s)), ve(a) && (Wn(a) && !le(a) && (a = We({}, a)), t.style = ul(a));
    }
    const l = ze(e) ? 1 : Nc(e) ? 128 : pc(e) ? 64 : ve(e) ? 4 : ue(e) ? 2 : 0;
    return Uc(e, t, o, r, n, l, i, true);
  }
  function fh(e) {
    return e ? Wn(e) || zc(e) ? We({}, e) : e : null;
  }
  bo = function(e, t, o = false, r = false) {
    const { props: n, ref: i, patchFlag: l, children: s, transition: a } = e, c = t ? Kc(n || {}, t) : n, u = {
      __v_isVNode: true,
      __v_skip: true,
      type: e.type,
      props: c,
      key: c && Gc(c),
      ref: t && t.ref ? o && i ? le(i) ? i.concat(hn(t)) : [
        i,
        hn(t)
      ] : hn(t) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: s,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== qe ? l === -1 ? 16 : l | 16 : l,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: a,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && bo(e.ssContent),
      ssFallback: e.ssFallback && bo(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
    return a && r && zo(u, a.clone(u)), u;
  };
  Ni = function(e = " ", t = 0) {
    return Ke(Jn, null, e, t);
  };
  Ny = function(e = "", t = false) {
    return t ? (Tn(), En(tt, null, e)) : Ke(tt, null, e);
  };
  function Bt(e) {
    return e == null || typeof e == "boolean" ? Ke(tt) : le(e) ? Ke(qe, null, e.slice()) : Br(e) ? Kt(e) : Ke(Jn, null, String(e));
  }
  function Kt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : bo(e);
  }
  function El(e, t) {
    let o = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (le(t)) o = 16;
    else if (typeof t == "object") if (r & 65) {
      const n = t.default;
      n && (n._c && (n._d = false), El(e, n()), n._c && (n._d = true));
      return;
    } else {
      o = 32;
      const n = t._;
      !n && !zc(t) ? t._ctx = Xe : n === 3 && Xe && (Xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
    else ue(t) ? (t = {
      default: t,
      _ctx: Xe
    }, o = 32) : (t = String(t), r & 64 ? (o = 16, t = [
      Ni(t)
    ]) : o = 8);
    e.children = t, e.shapeFlag |= o;
  }
  Kc = function(...e) {
    const t = {};
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      for (const n in r) if (n === "class") t.class !== r.class && (t.class = dl([
        t.class,
        r.class
      ]));
      else if (n === "style") t.style = ul([
        t.style,
        r.style
      ]);
      else if (zn(n)) {
        const i = t[n], l = r[n];
        l && i !== l && !(le(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !Dn(n) && (t[n] = l);
      } else n !== "" && (t[n] = r[n]);
    }
    return t;
  };
  function At(e, t, o, r = null) {
    _t(e, t, 7, [
      o,
      r
    ]);
  }
  const ph = Hc();
  let hh = 0;
  function gh(e, t, o) {
    const r = e.type, n = (t ? t.appContext : e.appContext) || ph, i = {
      uid: hh++,
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
      scope: new La(true),
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
      propsOptions: Bc(r, n),
      emitsOptions: Ic(r, n),
      emit: null,
      emitted: null,
      propsDefaults: Pe,
      inheritAttrs: r.inheritAttrs,
      ctx: Pe,
      data: Pe,
      props: Pe,
      attrs: Pe,
      slots: Pe,
      refs: Pe,
      setupState: Pe,
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
    }, i.root = t ? t.root : i, i.emit = Kp.bind(null, i), e.ce && e.ce(i), i;
  }
  let ot = null;
  qr = () => ot || Xe;
  let Rn, Vi;
  {
    const e = kn(), t = (o, r) => {
      let n;
      return (n = e[o]) || (n = e[o] = []), n.push(r), (i) => {
        n.length > 1 ? n.forEach((l) => l(i)) : n[0](i);
      };
    };
    Rn = t("__VUE_INSTANCE_SETTERS__", (o) => ot = o), Vi = t("__VUE_SSR_SETTERS__", (o) => Fr = o);
  }
  const Xr = (e) => {
    const t = ot;
    return Rn(e), e.scope.on(), () => {
      e.scope.off(), Rn(t);
    };
  }, us = () => {
    ot && ot.scope.off(), Rn(null);
  };
  function qc(e) {
    return e.vnode.shapeFlag & 4;
  }
  let Fr = false;
  function mh(e, t = false, o = false) {
    t && Vi(t);
    const { props: r, children: n } = e.vnode, i = qc(e);
    Zp(e, r, i, t), rh(e, n, o || t);
    const l = i ? bh(e, t) : void 0;
    return t && Vi(false), l;
  }
  function bh(e, t) {
    const o = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Fp);
    const { setup: r } = o;
    if (r) {
      Qt();
      const n = e.setupContext = r.length > 1 ? xh(e) : null, i = Xr(e), l = Kr(r, e, 0, [
        e.props,
        n
      ]), s = $a(l);
      if (Zt(), i(), (s || e.sp) && !Qo(e) && Sc(e), s) {
        if (l.then(us, us), t) return l.then((a) => {
          ds(e, a);
        }).catch((a) => {
          Nn(a, e, 0);
        });
        e.asyncDep = l;
      } else ds(e, l);
    } else Xc(e);
  }
  function ds(e, t, o) {
    ue(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ve(t) && (e.setupState = nc(t)), Xc(e);
  }
  function Xc(e, t, o) {
    const r = e.type;
    e.render || (e.render = r.render || Lt);
    {
      const n = Xr(e);
      Qt();
      try {
        Lp(e);
      } finally {
        Zt(), n();
      }
    }
  }
  const vh = {
    get(e, t) {
      return Ze(e, "get", ""), e[t];
    }
  };
  function xh(e) {
    const t = (o) => {
      e.exposed = o || {};
    };
    return {
      attrs: new Proxy(e.attrs, vh),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
  }
  function Qn(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(nc(Or(e.exposed)), {
      get(t, o) {
        if (o in t) return t[o];
        if (o in Tr) return Tr[o](e);
      },
      has(t, o) {
        return o in t || o in Tr;
      }
    })) : e.proxy;
  }
  function Ch(e, t = true) {
    return ue(e) ? e.displayName || e.name : e.name || t && e.__name;
  }
  function Sh(e) {
    return ue(e) && "__vccOpts" in e;
  }
  ie = (e, t) => pp(e, t, Fr);
  z = function(e, t, o) {
    try {
      _n(-1);
      const r = arguments.length;
      return r === 2 ? ve(t) && !le(t) ? Br(t) ? Ke(e, null, [
        t
      ]) : Ke(e, t) : Ke(e, null, t) : (r > 3 ? o = Array.prototype.slice.call(arguments, 2) : r === 3 && Br(o) && (o = [
        o
      ]), Ke(e, t, o));
    } finally {
      _n(1);
    }
  };
  const yh = "3.5.31";
  let Gi;
  const fs = typeof window < "u" && window.trustedTypes;
  if (fs) try {
    Gi = fs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
  let Yc, wh, Ph, Ut, ps, Th, ao, pr, tr, Jc, Qc, _h, yo, hs;
  Yc = Gi ? (e) => Gi.createHTML(e) : (e) => e;
  wh = "http://www.w3.org/2000/svg";
  Ph = "http://www.w3.org/1998/Math/MathML";
  Ut = typeof document < "u" ? document : null;
  ps = Ut && Ut.createElement("template");
  Th = {
    insert: (e, t, o) => {
      t.insertBefore(e, o || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, o, r) => {
      const n = t === "svg" ? Ut.createElementNS(wh, e) : t === "mathml" ? Ut.createElementNS(Ph, e) : o ? Ut.createElement(e, {
        is: o
      }) : Ut.createElement(e);
      return e === "select" && r && r.multiple != null && n.setAttribute("multiple", r.multiple), n;
    },
    createText: (e) => Ut.createTextNode(e),
    createComment: (e) => Ut.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ut.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, o, r, n, i) {
      const l = o ? o.previousSibling : t.lastChild;
      if (n && (n === i || n.nextSibling)) for (; t.insertBefore(n.cloneNode(true), o), !(n === i || !(n = n.nextSibling)); ) ;
      else {
        ps.innerHTML = Yc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
        const s = ps.content;
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
  ao = "transition";
  pr = "animation";
  tr = Symbol("_vtc");
  Jc = {
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
  Qc = We({}, bc, Jc);
  _h = (e) => (e.displayName = "Transition", e.props = Qc, e);
  Lr = _h((e, { slots: t }) => z(_p, Zc(e), t));
  yo = (e, t = []) => {
    le(e) ? e.forEach((o) => o(...t)) : e && e(...t);
  };
  hs = (e) => e ? le(e) ? e.some((t) => t.length > 1) : e.length > 1 : false;
  function Zc(e) {
    const t = {};
    for (const I in e) I in Jc || (t[I] = e[I]);
    if (e.css === false) return t;
    const { name: o = "v", type: r, duration: n, enterFromClass: i = `${o}-enter-from`, enterActiveClass: l = `${o}-enter-active`, enterToClass: s = `${o}-enter-to`, appearFromClass: a = i, appearActiveClass: c = l, appearToClass: u = s, leaveFromClass: d = `${o}-leave-from`, leaveActiveClass: f = `${o}-leave-active`, leaveToClass: p = `${o}-leave-to` } = e, h = Eh(n), m = h && h[0], v = h && h[1], { onBeforeEnter: x, onEnter: S, onEnterCancelled: T, onLeave: A, onLeaveCancelled: B, onBeforeAppear: k = x, onAppear: P = S, onAppearCancelled: w = T } = t, y = (I, q, se, de) => {
      I._enterCancelled = de, uo(I, q ? u : s), uo(I, q ? c : l), se && se();
    }, O = (I, q) => {
      I._isLeaving = false, uo(I, d), uo(I, p), uo(I, f), q && q();
    }, L = (I) => (q, se) => {
      const de = I ? P : S, ne = () => y(q, I, se);
      yo(de, [
        q,
        ne
      ]), gs(() => {
        uo(q, I ? a : i), $t(q, I ? u : s), hs(de) || ms(q, r, m, ne);
      });
    };
    return We(t, {
      onBeforeEnter(I) {
        yo(x, [
          I
        ]), $t(I, i), $t(I, l);
      },
      onBeforeAppear(I) {
        yo(k, [
          I
        ]), $t(I, a), $t(I, c);
      },
      onEnter: L(false),
      onAppear: L(true),
      onLeave(I, q) {
        I._isLeaving = true;
        const se = () => O(I, q);
        $t(I, d), I._enterCancelled ? ($t(I, f), Ui(I)) : (Ui(I), $t(I, f)), gs(() => {
          I._isLeaving && (uo(I, d), $t(I, p), hs(A) || ms(I, r, v, se));
        }), yo(A, [
          I,
          se
        ]);
      },
      onEnterCancelled(I) {
        y(I, false, void 0, true), yo(T, [
          I
        ]);
      },
      onAppearCancelled(I) {
        y(I, true, void 0, true), yo(w, [
          I
        ]);
      },
      onLeaveCancelled(I) {
        O(I), yo(B, [
          I
        ]);
      }
    });
  }
  function Eh(e) {
    if (e == null) return null;
    if (ve(e)) return [
      Ci(e.enter),
      Ci(e.leave)
    ];
    {
      const t = Ci(e);
      return [
        t,
        t
      ];
    }
  }
  function Ci(e) {
    return $f(e);
  }
  function $t(e, t) {
    t.split(/\s+/).forEach((o) => o && e.classList.add(o)), (e[tr] || (e[tr] = /* @__PURE__ */ new Set())).add(t);
  }
  function uo(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const o = e[tr];
    o && (o.delete(t), o.size || (e[tr] = void 0));
  }
  function gs(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let Rh = 0;
  function ms(e, t, o, r) {
    const n = e._endId = ++Rh, i = () => {
      n === e._endId && r();
    };
    if (o != null) return setTimeout(i, o);
    const { type: l, timeout: s, propCount: a } = eu(e, t);
    if (!l) return r();
    const c = l + "end";
    let u = 0;
    const d = () => {
      e.removeEventListener(c, f), i();
    }, f = (p) => {
      p.target === e && ++u >= a && d();
    };
    setTimeout(() => {
      u < a && d();
    }, s + 1), e.addEventListener(c, f);
  }
  function eu(e, t) {
    const o = window.getComputedStyle(e), r = (h) => (o[h] || "").split(", "), n = r(`${ao}Delay`), i = r(`${ao}Duration`), l = bs(n, i), s = r(`${pr}Delay`), a = r(`${pr}Duration`), c = bs(s, a);
    let u = null, d = 0, f = 0;
    t === ao ? l > 0 && (u = ao, d = l, f = i.length) : t === pr ? c > 0 && (u = pr, d = c, f = a.length) : (d = Math.max(l, c), u = d > 0 ? l > c ? ao : pr : null, f = u ? u === ao ? i.length : a.length : 0);
    const p = u === ao && /\b(?:transform|all)(?:,|$)/.test(r(`${ao}Property`).toString());
    return {
      type: u,
      timeout: d,
      propCount: f,
      hasTransform: p
    };
  }
  function bs(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((o, r) => vs(o) + vs(e[r])));
  }
  function vs(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function Ui(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight;
  }
  function Ah(e, t, o) {
    const r = e[tr];
    r && (t = (t ? [
      t,
      ...r
    ] : [
      ...r
    ]).join(" ")), t == null ? e.removeAttribute("class") : o ? e.setAttribute("class", t) : e.className = t;
  }
  let An, tu;
  An = Symbol("_vod");
  tu = Symbol("_vsh");
  Vy = {
    name: "show",
    beforeMount(e, { value: t }, { transition: o }) {
      e[An] = e.style.display === "none" ? "" : e.style.display, o && t ? o.beforeEnter(e) : hr(e, t);
    },
    mounted(e, { value: t }, { transition: o }) {
      o && t && o.enter(e);
    },
    updated(e, { value: t, oldValue: o }, { transition: r }) {
      !t != !o && (r ? t ? (r.beforeEnter(e), hr(e, true), r.enter(e)) : r.leave(e, () => {
        hr(e, false);
      }) : hr(e, t));
    },
    beforeUnmount(e, { value: t }) {
      hr(e, t);
    }
  };
  function hr(e, t) {
    e.style.display = t ? e[An] : "none", e[tu] = !t;
  }
  const Hh = Symbol(""), Ih = /(?:^|;)\s*display\s*:/;
  function $h(e, t, o) {
    const r = e.style, n = ze(o);
    let i = false;
    if (o && !n) {
      if (t) if (ze(t)) for (const l of t.split(";")) {
        const s = l.slice(0, l.indexOf(":")).trim();
        o[s] == null && gn(r, s, "");
      }
      else for (const l in t) o[l] == null && gn(r, l, "");
      for (const l in o) l === "display" && (i = true), gn(r, l, o[l]);
    } else if (n) {
      if (t !== o) {
        const l = r[Hh];
        l && (o += ";" + l), r.cssText = o, i = Ih.test(o);
      }
    } else t && e.removeAttribute("style");
    An in e && (e[An] = i ? r.display : "", e[tu] && (r.display = "none"));
  }
  const xs = /\s*!important$/;
  function gn(e, t, o) {
    if (le(o)) o.forEach((r) => gn(e, t, r));
    else if (o == null && (o = ""), t.startsWith("--")) e.setProperty(t, o);
    else {
      const r = Oh(e, t);
      xs.test(o) ? e.setProperty(xo(r), o.replace(xs, ""), "important") : e[r] = o;
    }
  }
  const Cs = [
    "Webkit",
    "Moz",
    "ms"
  ], Si = {};
  function Oh(e, t) {
    const o = Si[t];
    if (o) return o;
    let r = st(t);
    if (r !== "filter" && r in e) return Si[t] = r;
    r = Ln(r);
    for (let n = 0; n < Cs.length; n++) {
      const i = Cs[n] + r;
      if (i in e) return Si[t] = i;
    }
    return t;
  }
  const Ss = "http://www.w3.org/1999/xlink";
  function ys(e, t, o, r, n, i = Ff(t)) {
    r && t.startsWith("xlink:") ? o == null ? e.removeAttributeNS(Ss, t.slice(6, t.length)) : e.setAttributeNS(Ss, t, o) : o == null || i && !Da(o) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : bt(o) ? String(o) : o);
  }
  function ws(e, t, o, r, n) {
    if (t === "innerHTML" || t === "textContent") {
      o != null && (e[t] = t === "innerHTML" ? Yc(o) : o);
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
      s === "boolean" ? o = Da(o) : o == null && s === "string" ? (o = "", l = true) : s === "number" && (o = 0, l = true);
    }
    try {
      e[t] = o;
    } catch {
    }
    l && e.removeAttribute(n || t);
  }
  function Mh(e, t, o, r) {
    e.addEventListener(t, o, r);
  }
  function zh(e, t, o, r) {
    e.removeEventListener(t, o, r);
  }
  const Ps = Symbol("_vei");
  function Dh(e, t, o, r, n = null) {
    const i = e[Ps] || (e[Ps] = {}), l = i[t];
    if (r && l) l.value = r;
    else {
      const [s, a] = Bh(t);
      if (r) {
        const c = i[t] = kh(r, n);
        Mh(e, s, c, a);
      } else l && (zh(e, s, l, a), i[t] = void 0);
    }
  }
  const Ts = /(?:Once|Passive|Capture)$/;
  function Bh(e) {
    let t;
    if (Ts.test(e)) {
      t = {};
      let r;
      for (; r = e.match(Ts); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
    }
    return [
      e[2] === ":" ? e.slice(3) : xo(e.slice(2)),
      t
    ];
  }
  let yi = 0;
  const Fh = Promise.resolve(), Lh = () => yi || (Fh.then(() => yi = 0), yi = Date.now());
  function kh(e, t) {
    const o = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= o.attached) return;
      _t(jh(r, o.value), t, 5, [
        r
      ]);
    };
    return o.value = e, o.attached = Lh(), o;
  }
  function jh(e, t) {
    if (le(t)) {
      const o = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        o.call(e), e._stopped = true;
      }, t.map((r) => (n) => !n._stopped && r && r(n));
    } else return t;
  }
  const _s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wh = (e, t, o, r, n, i) => {
    const l = n === "svg";
    t === "class" ? Ah(e, r, l) : t === "style" ? $h(e, o, r) : zn(t) ? Dn(t) || Dh(e, t, o, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : Nh(e, t, r, l)) ? (ws(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ys(e, t, r, l, i, t !== "value")) : e._isVueCE && (Vh(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !ze(r))) ? ws(e, st(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ys(e, t, r, l));
  };
  function Nh(e, t, o, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && _s(t) && ue(o));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
    if (t === "width" || t === "height") {
      const n = e.tagName;
      if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return false;
    }
    return _s(t) && ze(o) ? false : t in e;
  }
  function Vh(e, t) {
    const o = e._def.props;
    if (!o) return false;
    const r = st(t);
    return Array.isArray(o) ? o.some((n) => st(n) === r) : Object.keys(o).some((n) => st(n) === r);
  }
  const ou = /* @__PURE__ */ new WeakMap(), ru = /* @__PURE__ */ new WeakMap(), Hn = Symbol("_moveCb"), Es = Symbol("_enterCb"), Gh = (e) => (delete e.props.mode, e), Uh = Gh({
    name: "TransitionGroup",
    props: We({}, Qc, {
      tag: String,
      moveClass: String
    }),
    setup(e, { slots: t }) {
      const o = qr(), r = mc();
      let n, i;
      return Tc(() => {
        if (!n.length) return;
        const l = e.moveClass || `${e.name || "v"}-move`;
        if (!Jh(n[0].el, o.vnode.el, l)) {
          n = [];
          return;
        }
        n.forEach(qh), n.forEach(Xh);
        const s = n.filter(Yh);
        Ui(o.vnode.el), s.forEach((a) => {
          const c = a.el, u = c.style;
          $t(c, l), u.transform = u.webkitTransform = u.transitionDuration = "";
          const d = c[Hn] = (f) => {
            f && f.target !== c || (!f || f.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", d), c[Hn] = null, uo(c, l));
          };
          c.addEventListener("transitionend", d);
        }), n = [];
      }), () => {
        const l = me(e), s = Zc(l);
        let a = l.tag || qe;
        if (n = [], i) for (let c = 0; c < i.length; c++) {
          const u = i[c];
          u.el && u.el instanceof Element && (n.push(u), zo(u, zr(u, s, r, o)), ou.set(u, nu(u.el)));
        }
        i = t.default ? wl(t.default()) : [];
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          u.key != null && zo(u, zr(u, s, r, o));
        }
        return Ke(a, null, i);
      };
    }
  }), Kh = Uh;
  function qh(e) {
    const t = e.el;
    t[Hn] && t[Hn](), t[Es] && t[Es]();
  }
  function Xh(e) {
    ru.set(e, nu(e.el));
  }
  function Yh(e) {
    const t = ou.get(e), o = ru.get(e), r = t.left - o.left, n = t.top - o.top;
    if (r || n) {
      const i = e.el, l = i.style, s = i.getBoundingClientRect();
      let a = 1, c = 1;
      return i.offsetWidth && (a = s.width / i.offsetWidth), i.offsetHeight && (c = s.height / i.offsetHeight), (!Number.isFinite(a) || a === 0) && (a = 1), (!Number.isFinite(c) || c === 0) && (c = 1), Math.abs(a - 1) < 0.01 && (a = 1), Math.abs(c - 1) < 0.01 && (c = 1), l.transform = l.webkitTransform = `translate(${r / a}px,${n / c}px)`, l.transitionDuration = "0s", e;
    }
  }
  function nu(e) {
    const t = e.getBoundingClientRect();
    return {
      left: t.left,
      top: t.top
    };
  }
  function Jh(e, t, o) {
    const r = e.cloneNode(), n = e[tr];
    n && n.forEach((s) => {
      s.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }), o.split(/\s+/).forEach((s) => s && r.classList.add(s)), r.style.display = "none";
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(r);
    const { hasTransform: l } = eu(r);
    return i.removeChild(r), l;
  }
  let Qh, Zh, eg, tg;
  Qh = [
    "ctrl",
    "shift",
    "alt",
    "meta"
  ];
  Zh = {
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
    exact: (e, t) => Qh.some((o) => e[`${o}Key`] && !t.includes(o))
  };
  Gy = (e, t) => {
    if (!e) return e;
    const o = e._withMods || (e._withMods = {}), r = t.join(".");
    return o[r] || (o[r] = ((n, ...i) => {
      for (let l = 0; l < t.length; l++) {
        const s = Zh[t[l]];
        if (s && s(n, t)) return;
      }
      return e(n, ...i);
    }));
  };
  eg = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  };
  Uy = (e, t) => {
    const o = e._withKeys || (e._withKeys = {}), r = t.join(".");
    return o[r] || (o[r] = ((n) => {
      if (!("key" in n)) return;
      const i = xo(n.key);
      if (t.some((l) => l === i || eg[l] === i)) return e(n);
    }));
  };
  tg = We({
    patchProp: Wh
  }, Th);
  let Rs;
  function og() {
    return Rs || (Rs = ih(tg));
  }
  const rg = ((...e) => {
    const t = og().createApp(...e), { mount: o } = t;
    return t.mount = (r) => {
      const n = ig(r);
      if (!n) return;
      const i = t._component;
      !ue(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
      const l = o(n, false, ng(n));
      return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), l;
    }, t;
  });
  function ng(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
  }
  function ig(e) {
    return ze(e) ? document.querySelector(e) : e;
  }
  let iu;
  const Zn = (e) => iu = e, lu = Symbol();
  function Ki(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var Er;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(Er || (Er = {}));
  function lg() {
    const e = ka(true), t = e.run(() => Ce({}));
    let o = [], r = [];
    const n = Or({
      install(i) {
        Zn(n), n._a = i, i.provide(lu, n), i.config.globalProperties.$pinia = n, r.forEach((l) => o.push(l)), r = [];
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
  const su = () => {
  };
  function As(e, t, o, r = su) {
    e.add(t);
    const n = () => {
      e.delete(t) && r();
    };
    return !o && ja() && jf(n), n;
  }
  function Vo(e, ...t) {
    e.forEach((o) => {
      o(...t);
    });
  }
  const sg = (e) => e(), Hs = Symbol(), wi = Symbol();
  function qi(e, t) {
    e instanceof Map && t instanceof Map ? t.forEach((o, r) => e.set(r, o)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const o in t) {
      if (!t.hasOwnProperty(o)) continue;
      const r = t[o], n = e[o];
      Ki(n) && Ki(r) && e.hasOwnProperty(o) && !$e(r) && !Yt(r) ? e[o] = qi(n, r) : e[o] = r;
    }
    return e;
  }
  const ag = Symbol();
  function cg(e) {
    return !Ki(e) || !Object.prototype.hasOwnProperty.call(e, ag);
  }
  const { assign: fo } = Object;
  function ug(e) {
    return !!($e(e) && e.effect);
  }
  function dg(e, t, o, r) {
    const { state: n, actions: i, getters: l } = t, s = o.state.value[e];
    let a;
    function c() {
      s || (o.state.value[e] = n ? n() : {});
      const u = cp(o.state.value[e]);
      return fo(u, i, Object.keys(l || {}).reduce((d, f) => (d[f] = Or(ie(() => {
        Zn(o);
        const p = o._s.get(e);
        return l[f].call(p, p);
      })), d), {}));
    }
    return a = au(e, c, t, o, r, true), a;
  }
  function au(e, t, o = {}, r, n, i) {
    let l;
    const s = fo({
      actions: {}
    }, o), a = {
      deep: true
    };
    let c, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p;
    const h = r.state.value[e];
    !i && !h && (r.state.value[e] = {});
    let m;
    function v(w) {
      let y;
      c = u = false, typeof w == "function" ? (w(r.state.value[e]), y = {
        type: Er.patchFunction,
        storeId: e,
        events: p
      }) : (qi(r.state.value[e], w), y = {
        type: Er.patchObject,
        payload: w,
        storeId: e,
        events: p
      });
      const O = m = Symbol();
      Vn().then(() => {
        m === O && (c = true);
      }), u = true, Vo(d, y, r.state.value[e]);
    }
    const x = i ? function() {
      const { state: y } = o, O = y ? y() : {};
      this.$patch((L) => {
        fo(L, O);
      });
    } : su;
    function S() {
      l.stop(), d.clear(), f.clear(), r._s.delete(e);
    }
    const T = (w, y = "") => {
      if (Hs in w) return w[wi] = y, w;
      const O = function() {
        Zn(r);
        const L = Array.from(arguments), I = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
        function se(Y) {
          I.add(Y);
        }
        function de(Y) {
          q.add(Y);
        }
        Vo(f, {
          args: L,
          name: O[wi],
          store: B,
          after: se,
          onError: de
        });
        let ne;
        try {
          ne = w.apply(this && this.$id === e ? this : B, L);
        } catch (Y) {
          throw Vo(q, Y), Y;
        }
        return ne instanceof Promise ? ne.then((Y) => (Vo(I, Y), Y)).catch((Y) => (Vo(q, Y), Promise.reject(Y))) : (Vo(I, ne), ne);
      };
      return O[Hs] = true, O[wi] = y, O;
    }, A = {
      _p: r,
      $id: e,
      $onAction: As.bind(null, f),
      $patch: v,
      $reset: x,
      $subscribe(w, y = {}) {
        const O = As(d, w, y.detached, () => L()), L = l.run(() => Jo(() => r.state.value[e], (I) => {
          (y.flush === "sync" ? u : c) && w({
            storeId: e,
            type: Er.direct,
            events: p
          }, I);
        }, fo({}, a, y)));
        return O;
      },
      $dispose: S
    }, B = Bo(A);
    r._s.set(e, B);
    const P = (r._a && r._a.runWithContext || sg)(() => r._e.run(() => (l = ka()).run(() => t({
      action: T
    }))));
    for (const w in P) {
      const y = P[w];
      if ($e(y) && !ug(y) || Yt(y)) i || (h && cg(y) && ($e(y) ? y.value = h[w] : qi(y, h[w])), r.state.value[e][w] = y);
      else if (typeof y == "function") {
        const O = T(y, w);
        P[w] = O, s.actions[w] = y;
      }
    }
    return fo(B, P), fo(me(B), P), Object.defineProperty(B, "$state", {
      get: () => r.state.value[e],
      set: (w) => {
        v((y) => {
          fo(y, w);
        });
      }
    }), r._p.forEach((w) => {
      fo(B, l.run(() => w({
        store: B,
        app: r._a,
        pinia: r,
        options: s
      })));
    }), h && i && o.hydrate && o.hydrate(B.$state, h), c = true, u = true, B;
  }
  function fg(e, t, o) {
    let r;
    const n = typeof t == "function";
    r = n ? o : t;
    function i(l, s) {
      const a = xp();
      return l = l || (a ? Ae(lu, null) : null), l && Zn(l), l = iu, l._s.has(e) || (n ? au(e, t, r, l) : dg(e, r, l)), l._s.get(e);
    }
    return i.$id = e, i;
  }
  const Uo = typeof document < "u";
  function cu(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
  }
  function pg(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && cu(e.default);
  }
  const xe = Object.assign;
  function Pi(e, t) {
    const o = {};
    for (const r in t) {
      const n = t[r];
      o[r] = Et(n) ? n.map(e) : e(n);
    }
    return o;
  }
  const Rr = () => {
  }, Et = Array.isArray;
  function Is(e, t) {
    const o = {};
    for (const r in e) o[r] = r in t ? t[r] : e[r];
    return o;
  }
  const uu = /#/g, hg = /&/g, gg = /\//g, mg = /=/g, bg = /\?/g, du = /\+/g, vg = /%5B/g, xg = /%5D/g, fu = /%5E/g, Cg = /%60/g, pu = /%7B/g, Sg = /%7C/g, hu = /%7D/g, yg = /%20/g;
  function Rl(e) {
    return e == null ? "" : encodeURI("" + e).replace(Sg, "|").replace(vg, "[").replace(xg, "]");
  }
  function wg(e) {
    return Rl(e).replace(pu, "{").replace(hu, "}").replace(fu, "^");
  }
  function Xi(e) {
    return Rl(e).replace(du, "%2B").replace(yg, "+").replace(uu, "%23").replace(hg, "%26").replace(Cg, "`").replace(pu, "{").replace(hu, "}").replace(fu, "^");
  }
  function Pg(e) {
    return Xi(e).replace(mg, "%3D");
  }
  function Tg(e) {
    return Rl(e).replace(uu, "%23").replace(bg, "%3F");
  }
  function _g(e) {
    return Tg(e).replace(gg, "%2F");
  }
  function kr(e) {
    if (e == null) return null;
    try {
      return decodeURIComponent("" + e);
    } catch {
    }
    return "" + e;
  }
  const Eg = /\/$/, Rg = (e) => e.replace(Eg, "");
  function Ti(e, t, o = "/") {
    let r, n = {}, i = "", l = "";
    const s = t.indexOf("#");
    let a = t.indexOf("?");
    return a = s >= 0 && a > s ? -1 : a, a >= 0 && (r = t.slice(0, a), i = t.slice(a, s > 0 ? s : t.length), n = e(i.slice(1))), s >= 0 && (r = r || t.slice(0, s), l = t.slice(s, t.length)), r = $g(r ?? t, o), {
      fullPath: r + i + l,
      path: r,
      query: n,
      hash: kr(l)
    };
  }
  function Ag(e, t) {
    const o = t.query ? e(t.query) : "";
    return t.path + (o && "?") + o + (t.hash || "");
  }
  function $s(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
  }
  function Hg(e, t, o) {
    const r = t.matched.length - 1, n = o.matched.length - 1;
    return r > -1 && r === n && or(t.matched[r], o.matched[n]) && gu(t.params, o.params) && e(t.query) === e(o.query) && t.hash === o.hash;
  }
  function or(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function gu(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return false;
    for (var o in e) if (!Ig(e[o], t[o])) return false;
    return true;
  }
  function Ig(e, t) {
    return Et(e) ? Os(e, t) : Et(t) ? Os(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
  }
  function Os(e, t) {
    return Et(t) ? e.length === t.length && e.every((o, r) => o === t[r]) : e.length === 1 && e[0] === t;
  }
  function $g(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const o = t.split("/"), r = e.split("/"), n = r[r.length - 1];
    (n === ".." || n === ".") && r.push("");
    let i = o.length - 1, l, s;
    for (l = 0; l < r.length; l++) if (s = r[l], s !== ".") if (s === "..") i > 1 && i--;
    else break;
    return o.slice(0, i).join("/") + "/" + r.slice(l).join("/");
  }
  const co = {
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
  let Yi = (function(e) {
    return e.pop = "pop", e.push = "push", e;
  })({}), _i = (function(e) {
    return e.back = "back", e.forward = "forward", e.unknown = "", e;
  })({});
  function Og(e) {
    if (!e) if (Uo) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Rg(e);
  }
  const Mg = /^[^#]+#/;
  function zg(e, t) {
    return e.replace(Mg, "#") + t;
  }
  function Dg(e, t) {
    const o = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - o.left - (t.left || 0),
      top: r.top - o.top - (t.top || 0)
    };
  }
  const ei = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function Bg(e) {
    let t;
    if ("el" in e) {
      const o = e.el, r = typeof o == "string" && o.startsWith("#"), n = typeof o == "string" ? r ? document.getElementById(o.slice(1)) : document.querySelector(o) : o;
      if (!n) return;
      t = Dg(n, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
  }
  function Ms(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const Ji = /* @__PURE__ */ new Map();
  function Fg(e, t) {
    Ji.set(e, t);
  }
  function Lg(e) {
    const t = Ji.get(e);
    return Ji.delete(e), t;
  }
  function kg(e) {
    return typeof e == "string" || e && typeof e == "object";
  }
  function mu(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  let Me = (function(e) {
    return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
  })({});
  const bu = Symbol("");
  Me.MATCHER_NOT_FOUND + "", Me.NAVIGATION_GUARD_REDIRECT + "", Me.NAVIGATION_ABORTED + "", Me.NAVIGATION_CANCELLED + "", Me.NAVIGATION_DUPLICATED + "";
  function rr(e, t) {
    return xe(new Error(), {
      type: e,
      [bu]: true
    }, t);
  }
  function Vt(e, t) {
    return e instanceof Error && bu in e && (t == null || !!(e.type & t));
  }
  const jg = [
    "params",
    "query",
    "hash"
  ];
  function Wg(e) {
    if (typeof e == "string") return e;
    if (e.path != null) return e.path;
    const t = {};
    for (const o of jg) o in e && (t[o] = e[o]);
    return JSON.stringify(t, null, 2);
  }
  function Ng(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const o = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < o.length; ++r) {
      const n = o[r].replace(du, " "), i = n.indexOf("="), l = kr(i < 0 ? n : n.slice(0, i)), s = i < 0 ? null : kr(n.slice(i + 1));
      if (l in t) {
        let a = t[l];
        Et(a) || (a = t[l] = [
          a
        ]), a.push(s);
      } else t[l] = s;
    }
    return t;
  }
  function zs(e) {
    let t = "";
    for (let o in e) {
      const r = e[o];
      if (o = Pg(o), r == null) {
        r !== void 0 && (t += (t.length ? "&" : "") + o);
        continue;
      }
      (Et(r) ? r.map((n) => n && Xi(n)) : [
        r && Xi(r)
      ]).forEach((n) => {
        n !== void 0 && (t += (t.length ? "&" : "") + o, n != null && (t += "=" + n));
      });
    }
    return t;
  }
  function Vg(e) {
    const t = {};
    for (const o in e) {
      const r = e[o];
      r !== void 0 && (t[o] = Et(r) ? r.map((n) => n == null ? null : "" + n) : r == null ? r : "" + r);
    }
    return t;
  }
  const Gg = Symbol(""), Ds = Symbol(""), ti = Symbol(""), Al = Symbol(""), Qi = Symbol("");
  function gr() {
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
  function ho(e, t, o, r, n, i = (l) => l()) {
    const l = r && (r.enterCallbacks[n] = r.enterCallbacks[n] || []);
    return () => new Promise((s, a) => {
      const c = (f) => {
        f === false ? a(rr(Me.NAVIGATION_ABORTED, {
          from: o,
          to: t
        })) : f instanceof Error ? a(f) : kg(f) ? a(rr(Me.NAVIGATION_GUARD_REDIRECT, {
          from: t,
          to: f
        })) : (l && r.enterCallbacks[n] === l && typeof f == "function" && l.push(f), s());
      }, u = i(() => e.call(r && r.instances[n], t, o, c));
      let d = Promise.resolve(u);
      e.length < 3 && (d = d.then(c)), d.catch((f) => a(f));
    });
  }
  function Ei(e, t, o, r, n = (i) => i()) {
    const i = [];
    for (const l of e) for (const s in l.components) {
      let a = l.components[s];
      if (!(t !== "beforeRouteEnter" && !l.instances[s])) if (cu(a)) {
        const c = (a.__vccOpts || a)[t];
        c && i.push(ho(c, o, r, l, s, n));
      } else {
        let c = a();
        i.push(() => c.then((u) => {
          if (!u) throw new Error(`Couldn't resolve component "${s}" at "${l.path}"`);
          const d = pg(u) ? u.default : u;
          l.mods[s] = u, l.components[s] = d;
          const f = (d.__vccOpts || d)[t];
          return f && ho(f, o, r, l, s, n)();
        }));
      }
    }
    return i;
  }
  function Ug(e, t) {
    const o = [], r = [], n = [], i = Math.max(t.matched.length, e.matched.length);
    for (let l = 0; l < i; l++) {
      const s = t.matched[l];
      s && (e.matched.find((c) => or(c, s)) ? r.push(s) : o.push(s));
      const a = e.matched[l];
      a && (t.matched.find((c) => or(c, a)) || n.push(a));
    }
    return [
      o,
      r,
      n
    ];
  }
  let Kg = () => location.protocol + "//" + location.host;
  function vu(e, t) {
    const { pathname: o, search: r, hash: n } = t, i = e.indexOf("#");
    if (i > -1) {
      let l = n.includes(e.slice(i)) ? e.slice(i).length : 1, s = n.slice(l);
      return s[0] !== "/" && (s = "/" + s), $s(s, "");
    }
    return $s(o, e) + r + n;
  }
  function qg(e, t, o, r) {
    let n = [], i = [], l = null;
    const s = ({ state: f }) => {
      const p = vu(e, location), h = o.value, m = t.value;
      let v = 0;
      if (f) {
        if (o.value = p, t.value = f, l && l === h) {
          l = null;
          return;
        }
        v = m ? f.position - m.position : 0;
      } else r(p);
      n.forEach((x) => {
        x(o.value, h, {
          delta: v,
          type: Yi.pop,
          direction: v ? v > 0 ? _i.forward : _i.back : _i.unknown
        });
      });
    };
    function a() {
      l = o.value;
    }
    function c(f) {
      n.push(f);
      const p = () => {
        const h = n.indexOf(f);
        h > -1 && n.splice(h, 1);
      };
      return i.push(p), p;
    }
    function u() {
      if (document.visibilityState === "hidden") {
        const { history: f } = window;
        if (!f.state) return;
        f.replaceState(xe({}, f.state, {
          scroll: ei()
        }), "");
      }
    }
    function d() {
      for (const f of i) f();
      i = [], window.removeEventListener("popstate", s), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u);
    }
    return window.addEventListener("popstate", s), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u), {
      pauseListeners: a,
      listen: c,
      destroy: d
    };
  }
  function Bs(e, t, o, r = false, n = false) {
    return {
      back: e,
      current: t,
      forward: o,
      replaced: r,
      position: window.history.length,
      scroll: n ? ei() : null
    };
  }
  function Xg(e) {
    const { history: t, location: o } = window, r = {
      value: vu(e, o)
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
    function i(a, c, u) {
      const d = e.indexOf("#"), f = d > -1 ? (o.host && document.querySelector("base") ? e : e.slice(d)) + a : Kg() + e + a;
      try {
        t[u ? "replaceState" : "pushState"](c, "", f), n.value = c;
      } catch (p) {
        console.error(p), o[u ? "replace" : "assign"](f);
      }
    }
    function l(a, c) {
      i(a, xe({}, t.state, Bs(n.value.back, a, n.value.forward, true), c, {
        position: n.value.position
      }), true), r.value = a;
    }
    function s(a, c) {
      const u = xe({}, n.value, t.state, {
        forward: a,
        scroll: ei()
      });
      i(u.current, u, true), i(a, xe({}, Bs(r.value, a, null), {
        position: u.position + 1
      }, c), false), r.value = a;
    }
    return {
      location: r,
      state: n,
      push: s,
      replace: l
    };
  }
  function Yg(e) {
    e = Og(e);
    const t = Xg(e), o = qg(e, t.state, t.location, t.replace);
    function r(i, l = true) {
      l || o.pauseListeners(), history.go(i);
    }
    const n = xe({
      location: "",
      base: e,
      go: r,
      createHref: zg.bind(null, e)
    }, t, o);
    return Object.defineProperty(n, "location", {
      enumerable: true,
      get: () => t.location.value
    }), Object.defineProperty(n, "state", {
      enumerable: true,
      get: () => t.state.value
    }), n;
  }
  function Jg(e) {
    return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Yg(e);
  }
  let Eo = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
  })({});
  var Ge = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
  })(Ge || {});
  const Qg = {
    type: Eo.Static,
    value: ""
  }, Zg = /[a-zA-Z0-9_]/;
  function em(e) {
    if (!e) return [
      []
    ];
    if (e === "/") return [
      [
        Qg
      ]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(p) {
      throw new Error(`ERR (${o})/"${c}": ${p}`);
    }
    let o = Ge.Static, r = o;
    const n = [];
    let i;
    function l() {
      i && n.push(i), i = [];
    }
    let s = 0, a, c = "", u = "";
    function d() {
      c && (o === Ge.Static ? i.push({
        type: Eo.Static,
        value: c
      }) : o === Ge.Param || o === Ge.ParamRegExp || o === Ge.ParamRegExpEnd ? (i.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
        type: Eo.Param,
        value: c,
        regexp: u,
        repeatable: a === "*" || a === "+",
        optional: a === "*" || a === "?"
      })) : t("Invalid state to consume buffer"), c = "");
    }
    function f() {
      c += a;
    }
    for (; s < e.length; ) {
      if (a = e[s++], a === "\\" && o !== Ge.ParamRegExp) {
        r = o, o = Ge.EscapeNext;
        continue;
      }
      switch (o) {
        case Ge.Static:
          a === "/" ? (c && d(), l()) : a === ":" ? (d(), o = Ge.Param) : f();
          break;
        case Ge.EscapeNext:
          f(), o = r;
          break;
        case Ge.Param:
          a === "(" ? o = Ge.ParamRegExp : Zg.test(a) ? f() : (d(), o = Ge.Static, a !== "*" && a !== "?" && a !== "+" && s--);
          break;
        case Ge.ParamRegExp:
          a === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + a : o = Ge.ParamRegExpEnd : u += a;
          break;
        case Ge.ParamRegExpEnd:
          d(), o = Ge.Static, a !== "*" && a !== "?" && a !== "+" && s--, u = "";
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return o === Ge.ParamRegExp && t(`Unfinished custom RegExp for param "${c}"`), d(), l(), n;
  }
  const Fs = "[^/]+?", tm = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  var it = (function(e) {
    return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
  })(it || {});
  const om = /[.+*?^${}()[\]/\\]/g;
  function rm(e, t) {
    const o = xe({}, tm, t), r = [];
    let n = o.start ? "^" : "";
    const i = [];
    for (const c of e) {
      const u = c.length ? [] : [
        it.Root
      ];
      o.strict && !c.length && (n += "/");
      for (let d = 0; d < c.length; d++) {
        const f = c[d];
        let p = it.Segment + (o.sensitive ? it.BonusCaseSensitive : 0);
        if (f.type === Eo.Static) d || (n += "/"), n += f.value.replace(om, "\\$&"), p += it.Static;
        else if (f.type === Eo.Param) {
          const { value: h, repeatable: m, optional: v, regexp: x } = f;
          i.push({
            name: h,
            repeatable: m,
            optional: v
          });
          const S = x || Fs;
          if (S !== Fs) {
            p += it.BonusCustomRegExp;
            try {
              `${S}`;
            } catch (A) {
              throw new Error(`Invalid custom RegExp for param "${h}" (${S}): ` + A.message);
            }
          }
          let T = m ? `((?:${S})(?:/(?:${S}))*)` : `(${S})`;
          d || (T = v && c.length < 2 ? `(?:/${T})` : "/" + T), v && (T += "?"), n += T, p += it.Dynamic, v && (p += it.BonusOptional), m && (p += it.BonusRepeatable), S === ".*" && (p += it.BonusWildcard);
        }
        u.push(p);
      }
      r.push(u);
    }
    if (o.strict && o.end) {
      const c = r.length - 1;
      r[c][r[c].length - 1] += it.BonusStrict;
    }
    o.strict || (n += "/?"), o.end ? n += "$" : o.strict && !n.endsWith("/") && (n += "(?:/|$)");
    const l = new RegExp(n, o.sensitive ? "" : "i");
    function s(c) {
      const u = c.match(l), d = {};
      if (!u) return null;
      for (let f = 1; f < u.length; f++) {
        const p = u[f] || "", h = i[f - 1];
        d[h.name] = p && h.repeatable ? p.split("/") : p;
      }
      return d;
    }
    function a(c) {
      let u = "", d = false;
      for (const f of e) {
        (!d || !u.endsWith("/")) && (u += "/"), d = false;
        for (const p of f) if (p.type === Eo.Static) u += p.value;
        else if (p.type === Eo.Param) {
          const { value: h, repeatable: m, optional: v } = p, x = h in c ? c[h] : "";
          if (Et(x) && !m) throw new Error(`Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`);
          const S = Et(x) ? x.join("/") : x;
          if (!S) if (v) f.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : d = true);
          else throw new Error(`Missing required param "${h}"`);
          u += S;
        }
      }
      return u || "/";
    }
    return {
      re: l,
      score: r,
      keys: i,
      parse: s,
      stringify: a
    };
  }
  function nm(e, t) {
    let o = 0;
    for (; o < e.length && o < t.length; ) {
      const r = t[o] - e[o];
      if (r) return r;
      o++;
    }
    return e.length < t.length ? e.length === 1 && e[0] === it.Static + it.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === it.Static + it.Segment ? 1 : -1 : 0;
  }
  function xu(e, t) {
    let o = 0;
    const r = e.score, n = t.score;
    for (; o < r.length && o < n.length; ) {
      const i = nm(r[o], n[o]);
      if (i) return i;
      o++;
    }
    if (Math.abs(n.length - r.length) === 1) {
      if (Ls(r)) return 1;
      if (Ls(n)) return -1;
    }
    return n.length - r.length;
  }
  function Ls(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const im = {
    strict: false,
    end: true,
    sensitive: false
  };
  function lm(e, t, o) {
    const r = rm(em(e.path), o), n = xe(r, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
    return t && !n.record.aliasOf == !t.record.aliasOf && t.children.push(n), n;
  }
  function sm(e, t) {
    const o = [], r = /* @__PURE__ */ new Map();
    t = Is(im, t);
    function n(d) {
      return r.get(d);
    }
    function i(d, f, p) {
      const h = !p, m = js(d);
      m.aliasOf = p && p.record;
      const v = Is(t, d), x = [
        m
      ];
      if ("alias" in d) {
        const A = typeof d.alias == "string" ? [
          d.alias
        ] : d.alias;
        for (const B of A) x.push(js(xe({}, m, {
          components: p ? p.record.components : m.components,
          path: B,
          aliasOf: p ? p.record : m
        })));
      }
      let S, T;
      for (const A of x) {
        const { path: B } = A;
        if (f && B[0] !== "/") {
          const k = f.record.path, P = k[k.length - 1] === "/" ? "" : "/";
          A.path = f.record.path + (B && P + B);
        }
        if (S = lm(A, f, v), p ? p.alias.push(S) : (T = T || S, T !== S && T.alias.push(S), h && d.name && !Ws(S) && l(d.name)), Cu(S) && a(S), m.children) {
          const k = m.children;
          for (let P = 0; P < k.length; P++) i(k[P], S, p && p.children[P]);
        }
        p = p || S;
      }
      return T ? () => {
        l(T);
      } : Rr;
    }
    function l(d) {
      if (mu(d)) {
        const f = r.get(d);
        f && (r.delete(d), o.splice(o.indexOf(f), 1), f.children.forEach(l), f.alias.forEach(l));
      } else {
        const f = o.indexOf(d);
        f > -1 && (o.splice(f, 1), d.record.name && r.delete(d.record.name), d.children.forEach(l), d.alias.forEach(l));
      }
    }
    function s() {
      return o;
    }
    function a(d) {
      const f = um(d, o);
      o.splice(f, 0, d), d.record.name && !Ws(d) && r.set(d.record.name, d);
    }
    function c(d, f) {
      let p, h = {}, m, v;
      if ("name" in d && d.name) {
        if (p = r.get(d.name), !p) throw rr(Me.MATCHER_NOT_FOUND, {
          location: d
        });
        v = p.record.name, h = xe(ks(f.params, p.keys.filter((T) => !T.optional).concat(p.parent ? p.parent.keys.filter((T) => T.optional) : []).map((T) => T.name)), d.params && ks(d.params, p.keys.map((T) => T.name))), m = p.stringify(h);
      } else if (d.path != null) m = d.path, p = o.find((T) => T.re.test(m)), p && (h = p.parse(m), v = p.record.name);
      else {
        if (p = f.name ? r.get(f.name) : o.find((T) => T.re.test(f.path)), !p) throw rr(Me.MATCHER_NOT_FOUND, {
          location: d,
          currentLocation: f
        });
        v = p.record.name, h = xe({}, f.params, d.params), m = p.stringify(h);
      }
      const x = [];
      let S = p;
      for (; S; ) x.unshift(S.record), S = S.parent;
      return {
        name: v,
        path: m,
        params: h,
        matched: x,
        meta: cm(x)
      };
    }
    e.forEach((d) => i(d));
    function u() {
      o.length = 0, r.clear();
    }
    return {
      addRoute: i,
      resolve: c,
      removeRoute: l,
      clearRoutes: u,
      getRoutes: s,
      getRecordMatcher: n
    };
  }
  function ks(e, t) {
    const o = {};
    for (const r of t) r in e && (o[r] = e[r]);
    return o;
  }
  function js(e) {
    const t = {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: e.aliasOf,
      beforeEnter: e.beforeEnter,
      props: am(e),
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
  function am(e) {
    const t = {}, o = e.props || false;
    if ("component" in e) t.default = o;
    else for (const r in e.components) t[r] = typeof o == "object" ? o[r] : o;
    return t;
  }
  function Ws(e) {
    for (; e; ) {
      if (e.record.aliasOf) return true;
      e = e.parent;
    }
    return false;
  }
  function cm(e) {
    return e.reduce((t, o) => xe(t, o.meta), {});
  }
  function um(e, t) {
    let o = 0, r = t.length;
    for (; o !== r; ) {
      const i = o + r >> 1;
      xu(e, t[i]) < 0 ? r = i : o = i + 1;
    }
    const n = dm(e);
    return n && (r = t.lastIndexOf(n, r - 1)), r;
  }
  function dm(e) {
    let t = e;
    for (; t = t.parent; ) if (Cu(t) && xu(e, t) === 0) return t;
  }
  function Cu({ record: e }) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
  }
  function Ns(e) {
    const t = Ae(ti), o = Ae(Al), r = ie(() => {
      const a = mo(e.to);
      return t.resolve(a);
    }), n = ie(() => {
      const { matched: a } = r.value, { length: c } = a, u = a[c - 1], d = o.matched;
      if (!u || !d.length) return -1;
      const f = d.findIndex(or.bind(null, u));
      if (f > -1) return f;
      const p = Vs(a[c - 2]);
      return c > 1 && Vs(u) === p && d[d.length - 1].path !== p ? d.findIndex(or.bind(null, a[c - 2])) : f;
    }), i = ie(() => n.value > -1 && mm(o.params, r.value.params)), l = ie(() => n.value > -1 && n.value === o.matched.length - 1 && gu(o.params, r.value.params));
    function s(a = {}) {
      if (gm(a)) {
        const c = t[mo(e.replace) ? "replace" : "push"](mo(e.to)).catch(Rr);
        return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => c), c;
      }
      return Promise.resolve();
    }
    return {
      route: r,
      href: ie(() => r.value.href),
      isActive: i,
      isExactActive: l,
      navigate: s
    };
  }
  function fm(e) {
    return e.length === 1 ? e[0] : e;
  }
  const pm = Le({
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
    useLink: Ns,
    setup(e, { slots: t }) {
      const o = Bo(Ns(e)), { options: r } = Ae(ti), n = ie(() => ({
        [Gs(e.activeClass, r.linkActiveClass, "router-link-active")]: o.isActive,
        [Gs(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: o.isExactActive
      }));
      return () => {
        const i = t.default && fm(t.default(o));
        return e.custom ? i : z("a", {
          "aria-current": o.isExactActive ? e.ariaCurrentValue : null,
          href: o.href,
          onClick: o.navigate,
          class: n.value
        }, i);
      };
    }
  }), hm = pm;
  function gm(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), true;
    }
  }
  function mm(e, t) {
    for (const o in t) {
      const r = t[o], n = e[o];
      if (typeof r == "string") {
        if (r !== n) return false;
      } else if (!Et(n) || n.length !== r.length || r.some((i, l) => i.valueOf() !== n[l].valueOf())) return false;
    }
    return true;
  }
  function Vs(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
  }
  const Gs = (e, t, o) => e ?? t ?? o, bm = Le({
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
      const r = Ae(Qi), n = ie(() => e.route || r.value), i = Ae(Ds, 0), l = ie(() => {
        let c = mo(i);
        const { matched: u } = n.value;
        let d;
        for (; (d = u[c]) && !d.components; ) c++;
        return c;
      }), s = ie(() => n.value.matched[l.value]);
      Jt(Ds, ie(() => l.value + 1)), Jt(Gg, s), Jt(Qi, n);
      const a = Ce();
      return Jo(() => [
        a.value,
        s.value,
        e.name
      ], ([c, u, d], [f, p, h]) => {
        u && (u.instances[d] = c, p && p !== u && c && c === f && (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards), u.updateGuards.size || (u.updateGuards = p.updateGuards))), c && u && (!p || !or(u, p) || !f) && (u.enterCallbacks[d] || []).forEach((m) => m(c));
      }, {
        flush: "post"
      }), () => {
        const c = n.value, u = e.name, d = s.value, f = d && d.components[u];
        if (!f) return Us(o.default, {
          Component: f,
          route: c
        });
        const p = d.props[u], h = p ? p === true ? c.params : typeof p == "function" ? p(c) : p : null, v = z(f, xe({}, h, t, {
          onVnodeUnmounted: (x) => {
            x.component.isUnmounted && (d.instances[u] = null);
          },
          ref: a
        }));
        return Us(o.default, {
          Component: v,
          route: c
        }) || v;
      };
    }
  });
  function Us(e, t) {
    if (!e) return null;
    const o = e(t);
    return o.length === 1 ? o[0] : o;
  }
  const vm = bm;
  function xm(e) {
    const t = sm(e.routes, e), o = e.parseQuery || Ng, r = e.stringifyQuery || zs, n = e.history, i = gr(), l = gr(), s = gr(), a = xl(co);
    let c = co;
    Uo && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = Pi.bind(null, (R) => "" + R), d = Pi.bind(null, _g), f = Pi.bind(null, kr);
    function p(R, K) {
      let N, ee;
      return mu(R) ? (N = t.getRecordMatcher(R), ee = K) : ee = R, t.addRoute(ee, N);
    }
    function h(R) {
      const K = t.getRecordMatcher(R);
      K && t.removeRoute(K);
    }
    function m() {
      return t.getRoutes().map((R) => R.record);
    }
    function v(R) {
      return !!t.getRecordMatcher(R);
    }
    function x(R, K) {
      if (K = xe({}, K || a.value), typeof R == "string") {
        const C = Ti(o, R, K.path), _ = t.resolve({
          path: C.path
        }, K), H = n.createHref(C.fullPath);
        return xe(C, _, {
          params: f(_.params),
          hash: kr(C.hash),
          redirectedFrom: void 0,
          href: H
        });
      }
      let N;
      if (R.path != null) N = xe({}, R, {
        path: Ti(o, R.path, K.path).path
      });
      else {
        const C = xe({}, R.params);
        for (const _ in C) C[_] == null && delete C[_];
        N = xe({}, R, {
          params: d(C)
        }), K.params = d(K.params);
      }
      const ee = t.resolve(N, K), fe = R.hash || "";
      ee.params = u(f(ee.params));
      const g = Ag(r, xe({}, R, {
        hash: wg(fe),
        path: ee.path
      })), b = n.createHref(g);
      return xe({
        fullPath: g,
        hash: fe,
        query: r === zs ? Vg(R.query) : R.query || {}
      }, ee, {
        redirectedFrom: void 0,
        href: b
      });
    }
    function S(R) {
      return typeof R == "string" ? Ti(o, R, a.value.path) : xe({}, R);
    }
    function T(R, K) {
      if (c !== R) return rr(Me.NAVIGATION_CANCELLED, {
        from: K,
        to: R
      });
    }
    function A(R) {
      return P(R);
    }
    function B(R) {
      return A(xe(S(R), {
        replace: true
      }));
    }
    function k(R, K) {
      const N = R.matched[R.matched.length - 1];
      if (N && N.redirect) {
        const { redirect: ee } = N;
        let fe = typeof ee == "function" ? ee(R, K) : ee;
        return typeof fe == "string" && (fe = fe.includes("?") || fe.includes("#") ? fe = S(fe) : {
          path: fe
        }, fe.params = {}), xe({
          query: R.query,
          hash: R.hash,
          params: fe.path != null ? {} : R.params
        }, fe);
      }
    }
    function P(R, K) {
      const N = c = x(R), ee = a.value, fe = R.state, g = R.force, b = R.replace === true, C = k(N, ee);
      if (C) return P(xe(S(C), {
        state: typeof C == "object" ? xe({}, fe, C.state) : fe,
        force: g,
        replace: b
      }), K || N);
      const _ = N;
      _.redirectedFrom = K;
      let H;
      return !g && Hg(r, ee, N) && (H = rr(Me.NAVIGATION_DUPLICATED, {
        to: _,
        from: ee
      }), De(ee, ee, true, false)), (H ? Promise.resolve(H) : O(_, ee)).catch((E) => Vt(E) ? Vt(E, Me.NAVIGATION_GUARD_REDIRECT) ? E : ke(E) : ae(E, _, ee)).then((E) => {
        if (E) {
          if (Vt(E, Me.NAVIGATION_GUARD_REDIRECT)) return P(xe({
            replace: b
          }, S(E.to), {
            state: typeof E.to == "object" ? xe({}, fe, E.to.state) : fe,
            force: g
          }), K || _);
        } else E = I(_, ee, true, b, fe);
        return L(_, ee, E), E;
      });
    }
    function w(R, K) {
      const N = T(R, K);
      return N ? Promise.reject(N) : Promise.resolve();
    }
    function y(R) {
      const K = Rt.values().next().value;
      return K && typeof K.runWithContext == "function" ? K.runWithContext(R) : R();
    }
    function O(R, K) {
      let N;
      const [ee, fe, g] = Ug(R, K);
      N = Ei(ee.reverse(), "beforeRouteLeave", R, K);
      for (const C of ee) C.leaveGuards.forEach((_) => {
        N.push(ho(_, R, K));
      });
      const b = w.bind(null, R, K);
      return N.push(b), je(N).then(() => {
        N = [];
        for (const C of i.list()) N.push(ho(C, R, K));
        return N.push(b), je(N);
      }).then(() => {
        N = Ei(fe, "beforeRouteUpdate", R, K);
        for (const C of fe) C.updateGuards.forEach((_) => {
          N.push(ho(_, R, K));
        });
        return N.push(b), je(N);
      }).then(() => {
        N = [];
        for (const C of g) if (C.beforeEnter) if (Et(C.beforeEnter)) for (const _ of C.beforeEnter) N.push(ho(_, R, K));
        else N.push(ho(C.beforeEnter, R, K));
        return N.push(b), je(N);
      }).then(() => (R.matched.forEach((C) => C.enterCallbacks = {}), N = Ei(g, "beforeRouteEnter", R, K, y), N.push(b), je(N))).then(() => {
        N = [];
        for (const C of l.list()) N.push(ho(C, R, K));
        return N.push(b), je(N);
      }).catch((C) => Vt(C, Me.NAVIGATION_CANCELLED) ? C : Promise.reject(C));
    }
    function L(R, K, N) {
      s.list().forEach((ee) => y(() => ee(R, K, N)));
    }
    function I(R, K, N, ee, fe) {
      const g = T(R, K);
      if (g) return g;
      const b = K === co, C = Uo ? history.state : {};
      N && (ee || b ? n.replace(R.fullPath, xe({
        scroll: b && C && C.scroll
      }, fe)) : n.push(R.fullPath, fe)), a.value = R, De(R, K, N, b), ke();
    }
    let q;
    function se() {
      q || (q = n.listen((R, K, N) => {
        if (!yt.listening) return;
        const ee = x(R), fe = k(ee, yt.currentRoute.value);
        if (fe) {
          P(xe(fe, {
            replace: true,
            force: true
          }), ee).catch(Rr);
          return;
        }
        c = ee;
        const g = a.value;
        Uo && Fg(Ms(g.fullPath, N.delta), ei()), O(ee, g).catch((b) => Vt(b, Me.NAVIGATION_ABORTED | Me.NAVIGATION_CANCELLED) ? b : Vt(b, Me.NAVIGATION_GUARD_REDIRECT) ? (P(xe(S(b.to), {
          force: true
        }), ee).then((C) => {
          Vt(C, Me.NAVIGATION_ABORTED | Me.NAVIGATION_DUPLICATED) && !N.delta && N.type === Yi.pop && n.go(-1, false);
        }).catch(Rr), Promise.reject()) : (N.delta && n.go(-N.delta, false), ae(b, ee, g))).then((b) => {
          b = b || I(ee, g, false), b && (N.delta && !Vt(b, Me.NAVIGATION_CANCELLED) ? n.go(-N.delta, false) : N.type === Yi.pop && Vt(b, Me.NAVIGATION_ABORTED | Me.NAVIGATION_DUPLICATED) && n.go(-1, false)), L(ee, g, b);
        }).catch(Rr);
      }));
    }
    let de = gr(), ne = gr(), Y;
    function ae(R, K, N) {
      ke(R);
      const ee = ne.list();
      return ee.length ? ee.forEach((fe) => fe(R, K, N)) : console.error(R), Promise.reject(R);
    }
    function Oe() {
      return Y && a.value !== co ? Promise.resolve() : new Promise((R, K) => {
        de.add([
          R,
          K
        ]);
      });
    }
    function ke(R) {
      return Y || (Y = !R, se(), de.list().forEach(([K, N]) => R ? N(R) : K()), de.reset()), R;
    }
    function De(R, K, N, ee) {
      const { scrollBehavior: fe } = e;
      if (!Uo || !fe) return Promise.resolve();
      const g = !N && Lg(Ms(R.fullPath, 0)) || (ee || !N) && history.state && history.state.scroll || null;
      return Vn().then(() => fe(R, K, g)).then((b) => b && Bg(b)).catch((b) => ae(b, R, K));
    }
    const Be = (R) => n.go(R);
    let St;
    const Rt = /* @__PURE__ */ new Set(), yt = {
      currentRoute: a,
      listening: true,
      addRoute: p,
      removeRoute: h,
      clearRoutes: t.clearRoutes,
      hasRoute: v,
      getRoutes: m,
      resolve: x,
      options: e,
      push: A,
      replace: B,
      go: Be,
      back: () => Be(-1),
      forward: () => Be(1),
      beforeEach: i.add,
      beforeResolve: l.add,
      afterEach: s.add,
      onError: ne.add,
      isReady: Oe,
      install(R) {
        R.component("RouterLink", hm), R.component("RouterView", vm), R.config.globalProperties.$router = yt, Object.defineProperty(R.config.globalProperties, "$route", {
          enumerable: true,
          get: () => mo(a)
        }), Uo && !St && a.value === co && (St = true, A(n.location).catch((ee) => {
        }));
        const K = {};
        for (const ee in co) Object.defineProperty(K, ee, {
          get: () => a.value[ee],
          enumerable: true
        });
        R.provide(ti, yt), R.provide(Al, oc(K)), R.provide(Qi, a);
        const N = R.unmount;
        Rt.add(R), R.unmount = function() {
          Rt.delete(R), Rt.size < 1 && (c = co, q && q(), q = null, a.value = co, St = false, Y = false), N();
        };
      }
    };
    function je(R) {
      return R.reduce((K, N) => K.then(() => y(N)), Promise.resolve());
    }
    return yt;
  }
  Ky = function() {
    return Ae(ti);
  };
  qy = function(e) {
    return Ae(Al);
  };
  function Cm(e) {
    const { extendRoutes: t, routes: o } = e;
    return t && console.warn('"extendRoutes()" is deprecated, please modify the routes directly. See https://uvr.esm.is/guide/extending-routes.html#extending-routes-at-runtime for an alternative.'), xm(Object.assign(e, {
      routes: typeof t == "function" && t(o) || o
    }));
  }
  const Sm = "modulepreload", ym = function(e) {
    return "/admin/" + e;
  }, Ks = {}, Mt = function(t, o, r) {
    let n = Promise.resolve();
    if (o && o.length > 0) {
      let l = function(c) {
        return Promise.all(c.map((u) => Promise.resolve(u).then((d) => ({
          status: "fulfilled",
          value: d
        }), (d) => ({
          status: "rejected",
          reason: d
        }))));
      };
      document.getElementsByTagName("link");
      const s = document.querySelector("meta[property=csp-nonce]"), a = (s == null ? void 0 : s.nonce) || (s == null ? void 0 : s.getAttribute("nonce"));
      n = l(o.map((c) => {
        if (c = ym(c), c in Ks) return;
        Ks[c] = true;
        const u = c.endsWith(".css"), d = u ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${c}"]${d}`)) return;
        const f = document.createElement("link");
        if (f.rel = u ? "stylesheet" : Sm, u || (f.as = "script"), f.crossOrigin = "", f.href = c, a && f.setAttribute("nonce", a), document.head.appendChild(f), u) return new Promise((p, h) => {
          f.addEventListener("load", p), f.addEventListener("error", () => h(new Error(`Unable to preload CSS for ${c}`)));
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
  }, wm = [
    {
      path: "/",
      name: "/",
      component: () => Mt(() => import("./index-CFYQhzWw.js"), __vite__mapDeps([0,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/backends",
      name: "/backends",
      component: () => Mt(() => import("./backends-BXeVOxcI.js"), __vite__mapDeps([2,3,4,5,6,7,8,9,10,11]))
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: () => Mt(() => import("./dashboard-C1gt3Xj2.js"), __vite__mapDeps([12,3,4,5,13,14,15,6,10,8,9]))
    },
    {
      path: "/flags",
      name: "/flags",
      component: () => Mt(() => import("./flags-BKqtB-8H.js"), __vite__mapDeps([16,4,5,6,15]))
    },
    {
      path: "/keys",
      name: "/keys",
      component: () => Mt(() => import("./keys-I9rNC3pg.js"), __vite__mapDeps([17,13,4,5,9,6,7,8,11,10]))
    },
    {
      path: "/login",
      name: "/login",
      component: () => Mt(() => import("./login-COM2woMg.js"), __vite__mapDeps([18,9,5,7,8,6,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/mappings",
      name: "/mappings",
      component: () => Mt(() => import("./mappings-Bz-QOEN6.js"), __vite__mapDeps([19,4,5,9,6,7,8,10,11]))
    },
    {
      path: "/usage",
      name: "/usage",
      component: () => Mt(() => import("./usage-D_5DExzr.js"), __vite__mapDeps([20,4,5,8,9,6,10,7,14]))
    }
  ];
  function Pm(e) {
    const t = {};
    Object.entries(Object.assign({
      "/src/layouts/auth.vue": () => Mt(() => import("./auth-BeHcq1pV.js"), []),
      "/src/layouts/default.vue": () => Mt(() => import("./default-DxAMwicK.js"), __vite__mapDeps([21,9,5]))
    })).forEach(([n, i]) => {
      let l = n.replace("/src/layouts/", "").replace(".vue", "");
      t[l] = i;
    });
    function r(n, i = true) {
      return n.map((l) => {
        var _a2, _b2, _c2, _d2, _e2, _f;
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
        return ((_e2 = l.meta) == null ? void 0 : _e2.layout) ? {
          path: l.path,
          component: t[(_f = l.meta) == null ? void 0 : _f.layout],
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
  Tm = fg("auth", () => {
    const e = Ce(sessionStorage.getItem("admin_api_key") ?? ""), t = Ce(sessionStorage.getItem("admin_version") ?? ""), o = ie(() => !!e.value);
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
  function _m(e) {
    let t = ".", o = "__", r = "--", n;
    if (e) {
      let h = e.blockPrefix;
      h && (t = h), h = e.elementPrefix, h && (o = h), h = e.modifierPrefix, h && (r = h);
    }
    const i = {
      install(h) {
        n = h.c;
        const m = h.context;
        m.bem = {}, m.bem.b = null, m.bem.els = null;
      }
    };
    function l(h) {
      let m, v;
      return {
        before(x) {
          m = x.bem.b, v = x.bem.els, x.bem.els = null;
        },
        after(x) {
          x.bem.b = m, x.bem.els = v;
        },
        $({ context: x, props: S }) {
          return h = typeof h == "string" ? h : h({
            context: x,
            props: S
          }), x.bem.b = h, `${(S == null ? void 0 : S.bPrefix) || t}${x.bem.b}`;
        }
      };
    }
    function s(h) {
      let m;
      return {
        before(v) {
          m = v.bem.els;
        },
        after(v) {
          v.bem.els = m;
        },
        $({ context: v, props: x }) {
          return h = typeof h == "string" ? h : h({
            context: v,
            props: x
          }), v.bem.els = h.split(",").map((S) => S.trim()), v.bem.els.map((S) => `${(x == null ? void 0 : x.bPrefix) || t}${v.bem.b}${o}${S}`).join(", ");
        }
      };
    }
    function a(h) {
      return {
        $({ context: m, props: v }) {
          h = typeof h == "string" ? h : h({
            context: m,
            props: v
          });
          const x = h.split(",").map((A) => A.trim());
          function S(A) {
            return x.map((B) => `&${(v == null ? void 0 : v.bPrefix) || t}${m.bem.b}${A !== void 0 ? `${o}${A}` : ""}${r}${B}`).join(", ");
          }
          const T = m.bem.els;
          return T !== null ? S(T[0]) : S();
        }
      };
    }
    function c(h) {
      return {
        $({ context: m, props: v }) {
          h = typeof h == "string" ? h : h({
            context: m,
            props: v
          });
          const x = m.bem.els;
          return `&:not(${(v == null ? void 0 : v.bPrefix) || t}${m.bem.b}${x !== null && x.length > 0 ? `${o}${x[0]}` : ""}${r}${h})`;
        }
      };
    }
    return Object.assign(i, {
      cB: ((...h) => n(l(h[0]), h[1], h[2])),
      cE: ((...h) => n(s(h[0]), h[1], h[2])),
      cM: ((...h) => n(a(h[0]), h[1], h[2])),
      cNotM: ((...h) => n(c(h[0]), h[1], h[2]))
    }), i;
  }
  function Em(e) {
    let t = 0;
    for (let o = 0; o < e.length; ++o) e[o] === "&" && ++t;
    return t;
  }
  const Su = /\s*,(?![^(]*\))\s*/g, Rm = /\s+/g;
  function Am(e, t) {
    const o = [];
    return t.split(Su).forEach((r) => {
      let n = Em(r);
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
  function Hm(e, t) {
    const o = [];
    return t.split(Su).forEach((r) => {
      e.forEach((n) => {
        o.push((n && n + " ") + r);
      });
    }), o;
  }
  function Im(e) {
    let t = [
      ""
    ];
    return e.forEach((o) => {
      o = o && o.trim(), o && (o.includes("&") ? t = Am(t, o) : t = Hm(t, o));
    }), t.join(", ").replace(Rm, " ");
  }
  function qs(e) {
    if (!e) return;
    const t = e.parentElement;
    t && t.removeChild(e);
  }
  function oi(e, t) {
    return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
  }
  function $m(e) {
    const t = document.createElement("style");
    return t.setAttribute("cssr-id", e), t;
  }
  function ln(e) {
    return e ? /^\s*@(s|m)/.test(e) : false;
  }
  const Om = /[A-Z]/g;
  function yu(e) {
    return e.replace(Om, (t) => "-" + t.toLowerCase());
  }
  function Mm(e, t = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${yu(o[0])}: ${o[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
  }
  function zm(e, t, o) {
    return typeof e == "function" ? e({
      context: t.context,
      props: o
    }) : e;
  }
  function Xs(e, t, o, r) {
    if (!t) return "";
    const n = zm(t, o, r);
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
      s = yu(s), a != null && l.push(`  ${s}${Mm(a)}`);
    }), e && l.push("}"), l.join(`
`);
  }
  function Zi(e, t, o) {
    e && e.forEach((r) => {
      if (Array.isArray(r)) Zi(r, t, o);
      else if (typeof r == "function") {
        const n = r(t);
        Array.isArray(n) ? Zi(n, t, o) : n && o(n);
      } else r && o(r);
    });
  }
  function wu(e, t, o, r, n) {
    const i = e.$;
    let l = "";
    if (!i || typeof i == "string") ln(i) ? l = i : t.push(i);
    else if (typeof i == "function") {
      const c = i({
        context: r.context,
        props: n
      });
      ln(c) ? l = c : t.push(c);
    } else if (i.before && i.before(r.context), !i.$ || typeof i.$ == "string") ln(i.$) ? l = i.$ : t.push(i.$);
    else if (i.$) {
      const c = i.$({
        context: r.context,
        props: n
      });
      ln(c) ? l = c : t.push(c);
    }
    const s = Im(t), a = Xs(s, e.props, r, n);
    l ? o.push(`${l} {`) : a.length && o.push(a), e.children && Zi(e.children, {
      context: r.context,
      props: n
    }, (c) => {
      if (typeof c == "string") {
        const u = Xs(s, {
          raw: c
        }, r, n);
        o.push(u);
      } else wu(c, t, o, r, n);
    }), t.pop(), l && o.push("}"), i && i.after && i.after(r.context);
  }
  function Dm(e, t, o) {
    const r = [];
    return wu(e, [], r, t, o), r.join(`

`);
  }
  function jr(e) {
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
  function Bm(e, t, o, r) {
    const { els: n } = t;
    if (o === void 0) n.forEach(qs), t.els = [];
    else {
      const i = oi(o, r);
      i && n.includes(i) && (qs(i), t.els = n.filter((l) => l !== i));
    }
  }
  function Ys(e, t) {
    e.push(t);
  }
  function Fm(e, t, o, r, n, i, l, s, a) {
    let c;
    if (o === void 0 && (c = t.render(r), o = jr(c)), a) {
      a.adapter(o, c ?? t.render(r));
      return;
    }
    s === void 0 && (s = document.head);
    const u = oi(o, s);
    if (u !== null && !i) return u;
    const d = u ?? $m(o);
    if (c === void 0 && (c = t.render(r)), d.textContent = c, u !== null) return u;
    if (l) {
      const f = s.querySelector(`meta[name="${l}"]`);
      if (f) return s.insertBefore(d, f), Ys(t.els, d), d;
    }
    return n ? s.insertBefore(d, s.querySelector("style, link")) : s.appendChild(d), Ys(t.els, d), d;
  }
  function Lm(e) {
    return Dm(this, this.instance, e);
  }
  function km(e = {}) {
    const { id: t, ssr: o, props: r, head: n = false, force: i = false, anchorMetaName: l, parent: s } = e;
    return Fm(this.instance, this, t, r, n, i, l, s, o);
  }
  function jm(e = {}) {
    const { id: t, parent: o } = e;
    Bm(this.instance, this, t, o);
  }
  const sn = function(e, t, o, r) {
    return {
      instance: e,
      $: t,
      props: o,
      children: r,
      els: [],
      render: Lm,
      mount: km,
      unmount: jm
    };
  }, Wm = function(e, t, o, r) {
    return Array.isArray(t) ? sn(e, {
      $: null
    }, null, t) : Array.isArray(o) ? sn(e, t, null, o) : Array.isArray(r) ? sn(e, t, o, r) : sn(e, t, o, null);
  };
  Nm = function(e = {}) {
    const t = {
      c: ((...o) => Wm(t, ...o)),
      use: (o, ...r) => o.install(t, ...r),
      find: oi,
      context: {},
      config: e
    };
    return t;
  };
  function Vm(e, t) {
    if (e === void 0) return false;
    if (t) {
      const { context: { ids: o } } = t;
      return o.has(e);
    }
    return oi(e) !== null;
  }
  const Gm = "n", Wr = `.${Gm}-`, Um = "__", Km = "--", Pu = Nm(), Tu = _m({
    blockPrefix: Wr,
    elementPrefix: Um,
    modifierPrefix: Km
  });
  Pu.use(Tu);
  let Xy;
  ({ c: Q, find: Xy } = Pu);
  ({ cB: pe, cE: Ue, cM: ge, cNotM: qm } = Tu);
  Yy = function(e) {
    return Q(({ props: { bPrefix: t } }) => `${t || Wr}modal, ${t || Wr}drawer`, [
      e
    ]);
  };
  Jy = function(e) {
    return Q(({ props: { bPrefix: t } }) => `${t || Wr}popover`, [
      e
    ]);
  };
  Qy = function(e) {
    return Q(({ props: { bPrefix: t } }) => `&${t || Wr}modal`, e);
  };
  Zy = (...e) => Q(">", [
    pe(...e)
  ]);
  Gt = function(e, t) {
    return e + (t === "default" ? "" : t.replace(/^[a-z]/, (o) => o.toUpperCase()));
  };
  Xm = function(e) {
    return e.composedPath()[0] || null;
  };
  Js = function(e) {
    return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
  };
  Ym = function(e) {
    if (e != null) return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  };
  Ko = function(e, t) {
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
  const Qs = {
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
  function Jm(e, t, o) {
    t /= 100, o /= 100;
    let r = (n, i = (n + e / 60) % 6) => o - o * t * Math.max(Math.min(i, 4 - i, 1), 0);
    return [
      r(5) * 255,
      r(3) * 255,
      r(1) * 255
    ];
  }
  function Qm(e, t, o) {
    t /= 100, o /= 100;
    let r = t * Math.min(o, 1 - o), n = (i, l = (i + e / 30) % 12) => o - r * Math.max(Math.min(l - 3, 9 - l, 1), -1);
    return [
      n(0) * 255,
      n(8) * 255,
      n(4) * 255
    ];
  }
  const kt = "^\\s*", jt = "\\s*$", vo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", gt = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Ro = "([0-9A-Fa-f])", Ao = "([0-9A-Fa-f]{2})", _u = new RegExp(`${kt}hsl\\s*\\(${gt},${vo},${vo}\\)${jt}`), Eu = new RegExp(`${kt}hsv\\s*\\(${gt},${vo},${vo}\\)${jt}`), Ru = new RegExp(`${kt}hsla\\s*\\(${gt},${vo},${vo},${gt}\\)${jt}`), Au = new RegExp(`${kt}hsva\\s*\\(${gt},${vo},${vo},${gt}\\)${jt}`), Zm = new RegExp(`${kt}rgb\\s*\\(${gt},${gt},${gt}\\)${jt}`), eb = new RegExp(`${kt}rgba\\s*\\(${gt},${gt},${gt},${gt}\\)${jt}`), tb = new RegExp(`${kt}#${Ro}${Ro}${Ro}${jt}`), ob = new RegExp(`${kt}#${Ao}${Ao}${Ao}${jt}`), rb = new RegExp(`${kt}#${Ro}${Ro}${Ro}${Ro}${jt}`), nb = new RegExp(`${kt}#${Ao}${Ao}${Ao}${Ao}${jt}`);
  function ft(e) {
    return parseInt(e, 16);
  }
  function ib(e) {
    try {
      let t;
      if (t = Ru.exec(e)) return [
        In(t[1]),
        go(t[5]),
        go(t[9]),
        $o(t[13])
      ];
      if (t = _u.exec(e)) return [
        In(t[1]),
        go(t[5]),
        go(t[9]),
        1
      ];
      throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  function lb(e) {
    try {
      let t;
      if (t = Au.exec(e)) return [
        In(t[1]),
        go(t[5]),
        go(t[9]),
        $o(t[13])
      ];
      if (t = Eu.exec(e)) return [
        In(t[1]),
        go(t[5]),
        go(t[9]),
        1
      ];
      throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  to = function(e) {
    try {
      let t;
      if (t = ob.exec(e)) return [
        ft(t[1]),
        ft(t[2]),
        ft(t[3]),
        1
      ];
      if (t = Zm.exec(e)) return [
        et(t[1]),
        et(t[5]),
        et(t[9]),
        1
      ];
      if (t = eb.exec(e)) return [
        et(t[1]),
        et(t[5]),
        et(t[9]),
        $o(t[13])
      ];
      if (t = tb.exec(e)) return [
        ft(t[1] + t[1]),
        ft(t[2] + t[2]),
        ft(t[3] + t[3]),
        1
      ];
      if (t = nb.exec(e)) return [
        ft(t[1]),
        ft(t[2]),
        ft(t[3]),
        $o(ft(t[4]) / 255)
      ];
      if (t = rb.exec(e)) return [
        ft(t[1] + t[1]),
        ft(t[2] + t[2]),
        ft(t[3] + t[3]),
        $o(ft(t[4] + t[4]) / 255)
      ];
      if (e in Qs) return to(Qs[e]);
      if (_u.test(e) || Ru.test(e)) {
        const [o, r, n, i] = ib(e);
        return [
          ...Qm(o, r, n),
          i
        ];
      } else if (Eu.test(e) || Au.test(e)) {
        const [o, r, n, i] = lb(e);
        return [
          ...Jm(o, r, n),
          i
        ];
      }
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  };
  function sb(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function el(e, t, o, r) {
    return `rgba(${et(e)}, ${et(t)}, ${et(o)}, ${sb(r)})`;
  }
  function Ri(e, t, o, r, n) {
    return et((e * t * (1 - r) + o * r) / n);
  }
  X = function(e, t) {
    Array.isArray(e) || (e = to(e)), Array.isArray(t) || (t = to(t));
    const o = e[3], r = t[3], n = $o(o + r - o * r);
    return el(Ri(e[0], o, t[0], r, n), Ri(e[1], o, t[1], r, n), Ri(e[2], o, t[2], r, n), n);
  };
  V = function(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : to(e);
    return typeof t.alpha == "number" ? el(o, r, n, t.alpha) : el(o, r, n, i);
  };
  function Fe(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : to(e), { lightness: l = 1, alpha: s = 1 } = t;
    return ab([
      o * l,
      r * l,
      n * l,
      i * s
    ]);
  }
  function $o(e) {
    const t = Math.round(Number(e) * 100) / 100;
    return t > 1 ? 1 : t < 0 ? 0 : t;
  }
  function In(e) {
    const t = Math.round(Number(e));
    return t >= 360 || t < 0 ? 0 : t;
  }
  function et(e) {
    const t = Math.round(Number(e));
    return t > 255 ? 255 : t < 0 ? 0 : t;
  }
  function go(e) {
    const t = Math.round(Number(e));
    return t > 100 ? 100 : t < 0 ? 0 : t;
  }
  function ab(e) {
    const [t, o, r] = e;
    return 3 in e ? `rgba(${et(t)}, ${et(o)}, ${et(r)}, ${$o(e[3])})` : `rgba(${et(t)}, ${et(o)}, ${et(r)}, 1)`;
  }
  Hu = function(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  };
  ew = function(e, t) {
    const o = [];
    for (let r = 0; r < e; ++r) o.push(t);
    return o;
  };
  function mn(e) {
    return e.composedPath()[0];
  }
  const cb = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function ub(e, t, o) {
    if (e === "mousemoveoutside") {
      const r = (n) => {
        t.contains(mn(n)) || o(n);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = false;
      const n = (l) => {
        r = !t.contains(mn(l));
      }, i = (l) => {
        r && (t.contains(mn(l)) || o(l));
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
  function Iu(e, t, o) {
    const r = cb[e];
    let n = r.get(t);
    n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(o);
    return i === void 0 && n.set(o, i = ub(e, t, o)), i;
  }
  function db(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Iu(e, t, o);
      return Object.keys(n).forEach((i) => {
        vr(i, document, n[i], r);
      }), true;
    }
    return false;
  }
  function fb(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Iu(e, t, o);
      return Object.keys(n).forEach((i) => {
        Po(i, document, n[i], r);
      }), true;
    }
    return false;
  }
  function pb() {
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
    function n(P, w, y) {
      const O = P[w];
      return P[w] = function() {
        return y.apply(P, arguments), O.apply(P, arguments);
      }, P;
    }
    function i(P, w) {
      P[w] = Event.prototype[w];
    }
    const l = /* @__PURE__ */ new WeakMap(), s = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function a() {
      var P;
      return (P = l.get(this)) !== null && P !== void 0 ? P : null;
    }
    function c(P, w) {
      s !== void 0 && Object.defineProperty(P, "currentTarget", {
        configurable: true,
        enumerable: true,
        get: w ?? s.get
      });
    }
    const u = {
      bubble: {},
      capture: {}
    }, d = {};
    function f() {
      const P = function(w) {
        const { type: y, eventPhase: O, bubbles: L } = w, I = mn(w);
        if (O === 2) return;
        const q = O === 1 ? "capture" : "bubble";
        let se = I;
        const de = [];
        for (; se === null && (se = window), de.push(se), se !== window; ) se = se.parentNode || null;
        const ne = u.capture[y], Y = u.bubble[y];
        if (n(w, "stopPropagation", o), n(w, "stopImmediatePropagation", r), c(w, a), q === "capture") {
          if (ne === void 0) return;
          for (let ae = de.length - 1; ae >= 0 && !e.has(w); --ae) {
            const Oe = de[ae], ke = ne.get(Oe);
            if (ke !== void 0) {
              l.set(w, Oe);
              for (const De of ke) {
                if (t.has(w)) break;
                De(w);
              }
            }
            if (ae === 0 && !L && Y !== void 0) {
              const De = Y.get(Oe);
              if (De !== void 0) for (const Be of De) {
                if (t.has(w)) break;
                Be(w);
              }
            }
          }
        } else if (q === "bubble") {
          if (Y === void 0) return;
          for (let ae = 0; ae < de.length && !e.has(w); ++ae) {
            const Oe = de[ae], ke = Y.get(Oe);
            if (ke !== void 0) {
              l.set(w, Oe);
              for (const De of ke) {
                if (t.has(w)) break;
                De(w);
              }
            }
          }
        }
        i(w, "stopPropagation"), i(w, "stopImmediatePropagation"), c(w);
      };
      return P.displayName = "evtdUnifiedHandler", P;
    }
    function p() {
      const P = function(w) {
        const { type: y, eventPhase: O } = w;
        if (O !== 2) return;
        const L = d[y];
        L !== void 0 && L.forEach((I) => I(w));
      };
      return P.displayName = "evtdUnifiedWindowEventHandler", P;
    }
    const h = f(), m = p();
    function v(P, w) {
      const y = u[P];
      return y[w] === void 0 && (y[w] = /* @__PURE__ */ new Map(), window.addEventListener(w, h, P === "capture")), y[w];
    }
    function x(P) {
      return d[P] === void 0 && (d[P] = /* @__PURE__ */ new Set(), window.addEventListener(P, m)), d[P];
    }
    function S(P, w) {
      let y = P.get(w);
      return y === void 0 && P.set(w, y = /* @__PURE__ */ new Set()), y;
    }
    function T(P, w, y, O) {
      const L = u[w][y];
      if (L !== void 0) {
        const I = L.get(P);
        if (I !== void 0 && I.has(O)) return true;
      }
      return false;
    }
    function A(P, w) {
      const y = d[P];
      return !!(y !== void 0 && y.has(w));
    }
    function B(P, w, y, O) {
      let L;
      if (typeof O == "object" && O.once === true ? L = (ne) => {
        k(P, w, L, O), y(ne);
      } : L = y, db(P, w, L, O)) return;
      const q = O === true || typeof O == "object" && O.capture === true ? "capture" : "bubble", se = v(q, P), de = S(se, w);
      if (de.has(L) || de.add(L), w === window) {
        const ne = x(P);
        ne.has(L) || ne.add(L);
      }
    }
    function k(P, w, y, O) {
      if (fb(P, w, y, O)) return;
      const I = O === true || typeof O == "object" && O.capture === true, q = I ? "capture" : "bubble", se = v(q, P), de = S(se, w);
      if (w === window && !T(w, I ? "bubble" : "capture", P, y) && A(P, y)) {
        const Y = d[P];
        Y.delete(y), Y.size === 0 && (window.removeEventListener(P, m), d[P] = void 0);
      }
      de.has(y) && de.delete(y), de.size === 0 && se.delete(w), se.size === 0 && (window.removeEventListener(P, h, q === "capture"), u[q][P] = void 0);
    }
    return {
      on: B,
      off: k
    };
  }
  ({ on: vr, off: Po } = pb());
  Zs = function(e) {
    const t = ie(e), o = Ce(t.value);
    return Jo(t, (r) => {
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
  hb = function() {
    const e = Ce(false);
    return Fo(() => {
      e.value = true;
    }), xn(e);
  };
  const gb = (typeof window > "u" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
  function mb() {
    return gb;
  }
  tw = function(e) {
    return e;
  };
  function bb(e) {
    const t = {
      isDeactivated: false
    };
    let o = false;
    return yc(() => {
      if (t.isDeactivated = false, !o) {
        o = true;
        return;
      }
      e();
    }), wc(() => {
      t.isDeactivated = true, o || (o = true);
    }), t;
  }
  const vb = "@css-render/vue3-ssr";
  function xb(e, t) {
    return `<style cssr-id="${e}">
${t}
</style>`;
  }
  function Cb(e, t, o) {
    const { styles: r, ids: n } = o;
    n.has(e) || r !== null && (n.add(e), r.push(xb(e, t)));
  }
  const Sb = typeof document < "u";
  ri = function() {
    if (Sb) return;
    const e = Ae(vb, null);
    if (e !== null) return {
      adapter: (t, o) => Cb(t, o, e),
      context: e
    };
  };
  function ea(e, t) {
    console.error(`[vueuc/${e}]: ${t}`);
  }
  var Oo = [], yb = function() {
    return Oo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, wb = function() {
    return Oo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, ta = "ResizeObserver loop completed with undelivered notifications.", Pb = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: ta
    }) : (e = document.createEvent("Event"), e.initEvent("error", false, false), e.message = ta), window.dispatchEvent(e);
  }, Nr;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Nr || (Nr = {}));
  var Mo = function(e) {
    return Object.freeze(e);
  }, Tb = /* @__PURE__ */ (function() {
    function e(t, o) {
      this.inlineSize = t, this.blockSize = o, Mo(this);
    }
    return e;
  })(), $u = (function() {
    function e(t, o, r, n) {
      return this.x = t, this.y = o, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Mo(this);
    }
    return e.prototype.toJSON = function() {
      var t = this, o = t.x, r = t.y, n = t.top, i = t.right, l = t.bottom, s = t.left, a = t.width, c = t.height;
      return {
        x: o,
        y: r,
        top: n,
        right: i,
        bottom: l,
        left: s,
        width: a,
        height: c
      };
    }, e.fromRect = function(t) {
      return new e(t.x, t.y, t.width, t.height);
    }, e;
  })(), Hl = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, Ou = function(e) {
    if (Hl(e)) {
      var t = e.getBBox(), o = t.width, r = t.height;
      return !o && !r;
    }
    var n = e, i = n.offsetWidth, l = n.offsetHeight;
    return !(i || l || e.getClientRects().length);
  }, oa = function(e) {
    var t;
    if (e instanceof Element) return true;
    var o = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
    return !!(o && e instanceof o.Element);
  }, _b = function(e) {
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
  }, Ar = typeof window < "u" ? window : {}, an = /* @__PURE__ */ new WeakMap(), ra = /auto|scroll/, Eb = /^tb|vertical/, Rb = /msie|trident/i.test(Ar.navigator && Ar.navigator.userAgent), Ht = function(e) {
    return parseFloat(e || "0");
  }, Zo = function(e, t, o) {
    return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = false), new Tb((o ? t : e) || 0, (o ? e : t) || 0);
  }, na = Mo({
    devicePixelContentBoxSize: Zo(),
    borderBoxSize: Zo(),
    contentBoxSize: Zo(),
    contentRect: new $u(0, 0, 0, 0)
  }), Mu = function(e, t) {
    if (t === void 0 && (t = false), an.has(e) && !t) return an.get(e);
    if (Ou(e)) return an.set(e, na), na;
    var o = getComputedStyle(e), r = Hl(e) && e.ownerSVGElement && e.getBBox(), n = !Rb && o.boxSizing === "border-box", i = Eb.test(o.writingMode || ""), l = !r && ra.test(o.overflowY || ""), s = !r && ra.test(o.overflowX || ""), a = r ? 0 : Ht(o.paddingTop), c = r ? 0 : Ht(o.paddingRight), u = r ? 0 : Ht(o.paddingBottom), d = r ? 0 : Ht(o.paddingLeft), f = r ? 0 : Ht(o.borderTopWidth), p = r ? 0 : Ht(o.borderRightWidth), h = r ? 0 : Ht(o.borderBottomWidth), m = r ? 0 : Ht(o.borderLeftWidth), v = d + c, x = a + u, S = m + p, T = f + h, A = s ? e.offsetHeight - T - e.clientHeight : 0, B = l ? e.offsetWidth - S - e.clientWidth : 0, k = n ? v + S : 0, P = n ? x + T : 0, w = r ? r.width : Ht(o.width) - k - B, y = r ? r.height : Ht(o.height) - P - A, O = w + v + B + S, L = y + x + A + T, I = Mo({
      devicePixelContentBoxSize: Zo(Math.round(w * devicePixelRatio), Math.round(y * devicePixelRatio), i),
      borderBoxSize: Zo(O, L, i),
      contentBoxSize: Zo(w, y, i),
      contentRect: new $u(d, a, w, y)
    });
    return an.set(e, I), I;
  }, zu = function(e, t, o) {
    var r = Mu(e, o), n = r.borderBoxSize, i = r.contentBoxSize, l = r.devicePixelContentBoxSize;
    switch (t) {
      case Nr.DEVICE_PIXEL_CONTENT_BOX:
        return l;
      case Nr.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, Ab = /* @__PURE__ */ (function() {
    function e(t) {
      var o = Mu(t);
      this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = Mo([
        o.borderBoxSize
      ]), this.contentBoxSize = Mo([
        o.contentBoxSize
      ]), this.devicePixelContentBoxSize = Mo([
        o.devicePixelContentBoxSize
      ]);
    }
    return e;
  })(), Du = function(e) {
    if (Ou(e)) return 1 / 0;
    for (var t = 0, o = e.parentNode; o; ) t += 1, o = o.parentNode;
    return t;
  }, Hb = function() {
    var e = 1 / 0, t = [];
    Oo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var s = [];
        l.activeTargets.forEach(function(c) {
          var u = new Ab(c.target), d = Du(c.target);
          s.push(u), c.lastReportedSize = zu(c.target, c.observedBox), d < e && (e = d);
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
  }, ia = function(e) {
    Oo.forEach(function(o) {
      o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
        n.isActive() && (Du(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
      });
    });
  }, Ib = function() {
    var e = 0;
    for (ia(e); yb(); ) e = Hb(), ia(e);
    return wb() && Pb(), e > 0;
  }, Ai, Bu = [], $b = function() {
    return Bu.splice(0).forEach(function(e) {
      return e();
    });
  }, Ob = function(e) {
    if (!Ai) {
      var t = 0, o = document.createTextNode(""), r = {
        characterData: true
      };
      new MutationObserver(function() {
        return $b();
      }).observe(o, r), Ai = function() {
        o.textContent = "".concat(t ? t-- : t++);
      };
    }
    Bu.push(e), Ai();
  }, Mb = function(e) {
    Ob(function() {
      requestAnimationFrame(e);
    });
  }, bn = 0, zb = function() {
    return !!bn;
  }, Db = 250, Bb = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }, la = [
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
  ], sa = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, Hi = false, Fb = (function() {
    function e() {
      var t = this;
      this.stopped = true, this.listener = function() {
        return t.schedule();
      };
    }
    return e.prototype.run = function(t) {
      var o = this;
      if (t === void 0 && (t = Db), !Hi) {
        Hi = true;
        var r = sa(t);
        Mb(function() {
          var n = false;
          try {
            n = Ib();
          } finally {
            if (Hi = false, t = r - sa(), !zb()) return;
            n ? o.run(1e3) : t > 0 ? o.run(t) : o.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var t = this, o = function() {
        return t.observer && t.observer.observe(document.body, Bb);
      };
      document.body ? o() : Ar.addEventListener("DOMContentLoaded", o);
    }, e.prototype.start = function() {
      var t = this;
      this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), la.forEach(function(o) {
        return Ar.addEventListener(o, t.listener, true);
      }));
    }, e.prototype.stop = function() {
      var t = this;
      this.stopped || (this.observer && this.observer.disconnect(), la.forEach(function(o) {
        return Ar.removeEventListener(o, t.listener, true);
      }), this.stopped = true);
    }, e;
  })(), tl = new Fb(), aa = function(e) {
    !bn && e > 0 && tl.start(), bn += e, !bn && tl.stop();
  }, Lb = function(e) {
    return !Hl(e) && !_b(e) && getComputedStyle(e).display === "inline";
  }, kb = (function() {
    function e(t, o) {
      this.target = t, this.observedBox = o || Nr.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var t = zu(this.target, this.observedBox, true);
      return Lb(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
    }, e;
  })(), jb = /* @__PURE__ */ (function() {
    function e(t, o) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = o;
    }
    return e;
  })(), cn = /* @__PURE__ */ new WeakMap(), ca = function(e, t) {
    for (var o = 0; o < e.length; o += 1) if (e[o].target === t) return o;
    return -1;
  }, un = (function() {
    function e() {
    }
    return e.connect = function(t, o) {
      var r = new jb(t, o);
      cn.set(t, r);
    }, e.observe = function(t, o, r) {
      var n = cn.get(t), i = n.observationTargets.length === 0;
      ca(n.observationTargets, o) < 0 && (i && Oo.push(n), n.observationTargets.push(new kb(o, r && r.box)), aa(1), tl.schedule());
    }, e.unobserve = function(t, o) {
      var r = cn.get(t), n = ca(r.observationTargets, o), i = r.observationTargets.length === 1;
      n >= 0 && (i && Oo.splice(Oo.indexOf(r), 1), r.observationTargets.splice(n, 1), aa(-1));
    }, e.disconnect = function(t) {
      var o = this, r = cn.get(t);
      r.observationTargets.slice().forEach(function(n) {
        return o.unobserve(t, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  })(), Wb = (function() {
    function e(t) {
      if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof t != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      un.connect(this, t);
    }
    return e.prototype.observe = function(t, o) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!oa(t)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      un.observe(this, t, o);
    }, e.prototype.unobserve = function(t) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!oa(t)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      un.unobserve(this, t);
    }, e.prototype.disconnect = function() {
      un.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  })();
  class Nb {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Wb)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
  ua = new Nb();
  da = Le({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let t = false;
      const o = qr().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      Fo(() => {
        const n = o.$el;
        if (n === void 0) {
          ea("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          ea("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (ua.registerHandler(n.nextElementSibling, r), t = true);
      }), Xn(() => {
        t && ua.unregisterHandler(o.$el.nextElementSibling);
      });
    },
    render() {
      return Bp(this.$slots, "default");
    }
  });
  function fa(e) {
    const { left: t, right: o, top: r, bottom: n } = Ko(e);
    return `${r} ${t} ${n} ${o}`;
  }
  Vb = function(e, t) {
    console.error(`[naive/${e}]: ${t}`);
  };
  Gb = function(e, t) {
    throw new Error(`[naive/${e}]: ${t}`);
  };
  Ub = function(e, t = [], o) {
    const r = {};
    return t.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, o);
  };
  Kb = function(e) {
    return Object.keys(e);
  };
  Fu = function(e, t = [], o) {
    const r = {};
    return Object.getOwnPropertyNames(e).forEach((i) => {
      t.includes(i) || (r[i] = e[i]);
    }), Object.assign(r, o);
  };
  To = function(e, ...t) {
    return typeof e == "function" ? e(...t) : typeof e == "string" ? Ni(e) : typeof e == "number" ? Ni(String(e)) : null;
  };
  let $n;
  pa = Le({
    render() {
      var e, t;
      return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
    }
  });
  oo = "n-config-provider";
  $n = "n";
  Yr = function(e = {}, t = {
    defaultBordered: true
  }) {
    const o = Ae(oo, null);
    return {
      inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
      mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
      mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
      mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
      mergedBorderedRef: ie(() => {
        var r, n;
        const { bordered: i } = e;
        return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : true;
      }),
      mergedClsPrefixRef: o ? o.mergedClsPrefixRef : xl($n),
      namespaceRef: ie(() => o == null ? void 0 : o.mergedNamespaceRef.value)
    };
  };
  ow = function() {
    const e = Ae(oo, null);
    return e ? e.mergedClsPrefixRef : xl($n);
  };
  Il = function(e, t, o, r) {
    o || Gb("useThemeClass", "cssVarsRef is not passed");
    const n = Ae(oo, null), i = n == null ? void 0 : n.mergedThemeHashRef, l = n == null ? void 0 : n.styleMountTarget, s = Ce(""), a = ri();
    let c;
    const u = `__${e}`, d = () => {
      let f = u;
      const p = t ? t.value : void 0, h = i == null ? void 0 : i.value;
      h && (f += `-${h}`), p && (f += `-${p}`);
      const { themeOverrides: m, builtinThemeOverrides: v } = r;
      m && (f += `-${jr(JSON.stringify(m))}`), v && (f += `-${jr(JSON.stringify(v))}`), s.value = f, c = () => {
        const x = o.value;
        let S = "";
        for (const T in x) S += `${T}: ${x[T]};`;
        Q(`.${f}`, S).mount({
          id: f,
          ssr: a,
          parent: l
        }), c = void 0;
      };
    };
    return Gn(() => {
      d();
    }), {
      themeClass: s,
      onRender: () => {
        c == null ? void 0 : c();
      }
    };
  };
  let Lu, qb, ku, Xb, Yb, mr;
  Lu = typeof global == "object" && global && global.Object === Object && global;
  qb = typeof self == "object" && self && self.Object === Object && self;
  ir = Lu || qb || Function("return this")();
  nr = ir.Symbol;
  ku = Object.prototype;
  Xb = ku.hasOwnProperty;
  Yb = ku.toString;
  mr = nr ? nr.toStringTag : void 0;
  function Jb(e) {
    var t = Xb.call(e, mr), o = e[mr];
    try {
      e[mr] = void 0;
      var r = true;
    } catch {
    }
    var n = Yb.call(e);
    return r && (t ? e[mr] = o : delete e[mr]), n;
  }
  var Qb = Object.prototype, Zb = Qb.toString;
  function e0(e) {
    return Zb.call(e);
  }
  var t0 = "[object Null]", o0 = "[object Undefined]", ha = nr ? nr.toStringTag : void 0;
  Jr = function(e) {
    return e == null ? e === void 0 ? o0 : t0 : ha && ha in Object(e) ? Jb(e) : e0(e);
  };
  lr = function(e) {
    return e != null && typeof e == "object";
  };
  var r0 = "[object Symbol]";
  n0 = function(e) {
    return typeof e == "symbol" || lr(e) && Jr(e) == r0;
  };
  i0 = function(e, t) {
    for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; ) n[o] = t(e[o], o, e);
    return n;
  };
  let ga, ma;
  On = Array.isArray;
  ga = nr ? nr.prototype : void 0;
  ma = ga ? ga.toString : void 0;
  function ju(e) {
    if (typeof e == "string") return e;
    if (On(e)) return i0(e, ju) + "";
    if (n0(e)) return ma ? ma.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
  }
  Lo = function(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  };
  Wu = function(e) {
    return e;
  };
  var l0 = "[object AsyncFunction]", s0 = "[object Function]", a0 = "[object GeneratorFunction]", c0 = "[object Proxy]";
  function $l(e) {
    if (!Lo(e)) return false;
    var t = Jr(e);
    return t == s0 || t == a0 || t == l0 || t == c0;
  }
  var Ii = ir["__core-js_shared__"], ba = (function() {
    var e = /[^.]+$/.exec(Ii && Ii.keys && Ii.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  })();
  function u0(e) {
    return !!ba && ba in e;
  }
  var d0 = Function.prototype, f0 = d0.toString;
  p0 = function(e) {
    if (e != null) {
      try {
        return f0.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  };
  var h0 = /[\\^$.*+?()[\]{}|]/g, g0 = /^\[object .+?Constructor\]$/, m0 = Function.prototype, b0 = Object.prototype, v0 = m0.toString, x0 = b0.hasOwnProperty, C0 = RegExp("^" + v0.call(x0).replace(h0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function S0(e) {
    if (!Lo(e) || u0(e)) return false;
    var t = $l(e) ? C0 : g0;
    return t.test(p0(e));
  }
  function y0(e, t) {
    return e == null ? void 0 : e[t];
  }
  Ol = function(e, t) {
    var o = y0(e, t);
    return S0(o) ? o : void 0;
  };
  var va = Object.create, w0 = /* @__PURE__ */ (function() {
    function e() {
    }
    return function(t) {
      if (!Lo(t)) return {};
      if (va) return va(t);
      e.prototype = t;
      var o = new e();
      return e.prototype = void 0, o;
    };
  })();
  function P0(e, t, o) {
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
  function T0(e, t) {
    var o = -1, r = e.length;
    for (t || (t = Array(r)); ++o < r; ) t[o] = e[o];
    return t;
  }
  var _0 = 800, E0 = 16, R0 = Date.now;
  function A0(e) {
    var t = 0, o = 0;
    return function() {
      var r = R0(), n = E0 - (r - o);
      if (o = r, n > 0) {
        if (++t >= _0) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function H0(e) {
    return function() {
      return e;
    };
  }
  var Mn = (function() {
    try {
      var e = Ol(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  })(), I0 = Mn ? function(e, t) {
    return Mn(e, "toString", {
      configurable: true,
      enumerable: false,
      value: H0(t),
      writable: true
    });
  } : Wu, $0 = A0(I0), O0 = 9007199254740991, M0 = /^(?:0|[1-9]\d*)$/;
  Nu = function(e, t) {
    var o = typeof e;
    return t = t ?? O0, !!t && (o == "number" || o != "symbol" && M0.test(e)) && e > -1 && e % 1 == 0 && e < t;
  };
  function Ml(e, t, o) {
    t == "__proto__" && Mn ? Mn(e, t, {
      configurable: true,
      enumerable: true,
      value: o,
      writable: true
    }) : e[t] = o;
  }
  ni = function(e, t) {
    return e === t || e !== e && t !== t;
  };
  var z0 = Object.prototype, D0 = z0.hasOwnProperty;
  function B0(e, t, o) {
    var r = e[t];
    (!(D0.call(e, t) && ni(r, o)) || o === void 0 && !(t in e)) && Ml(e, t, o);
  }
  function F0(e, t, o, r) {
    var n = !o;
    o || (o = {});
    for (var i = -1, l = t.length; ++i < l; ) {
      var s = t[i], a = void 0;
      a === void 0 && (a = e[s]), n ? Ml(o, s, a) : B0(o, s, a);
    }
    return o;
  }
  var xa = Math.max;
  function L0(e, t, o) {
    return t = xa(t === void 0 ? e.length - 1 : t, 0), function() {
      for (var r = arguments, n = -1, i = xa(r.length - t, 0), l = Array(i); ++n < i; ) l[n] = r[t + n];
      n = -1;
      for (var s = Array(t + 1); ++n < t; ) s[n] = r[n];
      return s[t] = o(l), P0(e, this, s);
    };
  }
  function k0(e, t) {
    return $0(L0(e, t, Wu), e + "");
  }
  var j0 = 9007199254740991;
  Vu = function(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= j0;
  };
  zl = function(e) {
    return e != null && Vu(e.length) && !$l(e);
  };
  function W0(e, t, o) {
    if (!Lo(o)) return false;
    var r = typeof t;
    return (r == "number" ? zl(o) && Nu(t, o.length) : r == "string" && t in o) ? ni(o[t], e) : false;
  }
  function N0(e) {
    return k0(function(t, o) {
      var r = -1, n = o.length, i = n > 1 ? o[n - 1] : void 0, l = n > 2 ? o[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && W0(o[0], o[1], l) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++r < n; ) {
        var s = o[r];
        s && e(t, s, r, i);
      }
      return t;
    });
  }
  var V0 = Object.prototype;
  Gu = function(e) {
    var t = e && e.constructor, o = typeof t == "function" && t.prototype || V0;
    return e === o;
  };
  function G0(e, t) {
    for (var o = -1, r = Array(e); ++o < e; ) r[o] = t(o);
    return r;
  }
  var U0 = "[object Arguments]";
  function Ca(e) {
    return lr(e) && Jr(e) == U0;
  }
  let Uu, K0, q0;
  Uu = Object.prototype;
  K0 = Uu.hasOwnProperty;
  q0 = Uu.propertyIsEnumerable;
  ol = Ca(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? Ca : function(e) {
    return lr(e) && K0.call(e, "callee") && !q0.call(e, "callee");
  };
  function X0() {
    return false;
  }
  let Ku, Sa, Y0, ya, J0, Q0, Z0, ev, tv, ov, rv, nv, iv, lv, sv, av, cv, uv, dv, fv, pv, hv, gv, mv, bv, vv, xv, Cv, Sv, Re;
  Ku = typeof exports == "object" && exports && !exports.nodeType && exports;
  Sa = Ku && typeof module == "object" && module && !module.nodeType && module;
  Y0 = Sa && Sa.exports === Ku;
  ya = Y0 ? ir.Buffer : void 0;
  J0 = ya ? ya.isBuffer : void 0;
  qu = J0 || X0;
  Q0 = "[object Arguments]";
  Z0 = "[object Array]";
  ev = "[object Boolean]";
  tv = "[object Date]";
  ov = "[object Error]";
  rv = "[object Function]";
  nv = "[object Map]";
  iv = "[object Number]";
  lv = "[object Object]";
  sv = "[object RegExp]";
  av = "[object Set]";
  cv = "[object String]";
  uv = "[object WeakMap]";
  dv = "[object ArrayBuffer]";
  fv = "[object DataView]";
  pv = "[object Float32Array]";
  hv = "[object Float64Array]";
  gv = "[object Int8Array]";
  mv = "[object Int16Array]";
  bv = "[object Int32Array]";
  vv = "[object Uint8Array]";
  xv = "[object Uint8ClampedArray]";
  Cv = "[object Uint16Array]";
  Sv = "[object Uint32Array]";
  Re = {};
  Re[pv] = Re[hv] = Re[gv] = Re[mv] = Re[bv] = Re[vv] = Re[xv] = Re[Cv] = Re[Sv] = true;
  Re[Q0] = Re[Z0] = Re[dv] = Re[ev] = Re[fv] = Re[tv] = Re[ov] = Re[rv] = Re[nv] = Re[iv] = Re[lv] = Re[sv] = Re[av] = Re[cv] = Re[uv] = false;
  function yv(e) {
    return lr(e) && Vu(e.length) && !!Re[Jr(e)];
  }
  function wv(e) {
    return function(t) {
      return e(t);
    };
  }
  let Xu, Hr, Pv, $i, wa, Pa, Tv, _v;
  Xu = typeof exports == "object" && exports && !exports.nodeType && exports;
  Hr = Xu && typeof module == "object" && module && !module.nodeType && module;
  Pv = Hr && Hr.exports === Xu;
  $i = Pv && Lu.process;
  wa = (function() {
    try {
      var e = Hr && Hr.require && Hr.require("util").types;
      return e || $i && $i.binding && $i.binding("util");
    } catch {
    }
  })();
  Pa = wa && wa.isTypedArray;
  Yu = Pa ? wv(Pa) : yv;
  Tv = Object.prototype;
  _v = Tv.hasOwnProperty;
  Ev = function(e, t) {
    var o = On(e), r = !o && ol(e), n = !o && !r && qu(e), i = !o && !r && !n && Yu(e), l = o || r || n || i, s = l ? G0(e.length, String) : [], a = s.length;
    for (var c in e) (t || _v.call(e, c)) && !(l && (c == "length" || n && (c == "offset" || c == "parent") || i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || Nu(c, a))) && s.push(c);
    return s;
  };
  Rv = function(e, t) {
    return function(o) {
      return e(t(o));
    };
  };
  function Av(e) {
    var t = [];
    if (e != null) for (var o in Object(e)) t.push(o);
    return t;
  }
  var Hv = Object.prototype, Iv = Hv.hasOwnProperty;
  function $v(e) {
    if (!Lo(e)) return Av(e);
    var t = Gu(e), o = [];
    for (var r in e) r == "constructor" && (t || !Iv.call(e, r)) || o.push(r);
    return o;
  }
  function Ju(e) {
    return zl(e) ? Ev(e, true) : $v(e);
  }
  var Vr = Ol(Object, "create");
  function Ov() {
    this.__data__ = Vr ? Vr(null) : {}, this.size = 0;
  }
  function Mv(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  var zv = "__lodash_hash_undefined__", Dv = Object.prototype, Bv = Dv.hasOwnProperty;
  function Fv(e) {
    var t = this.__data__;
    if (Vr) {
      var o = t[e];
      return o === zv ? void 0 : o;
    }
    return Bv.call(t, e) ? t[e] : void 0;
  }
  var Lv = Object.prototype, kv = Lv.hasOwnProperty;
  function jv(e) {
    var t = this.__data__;
    return Vr ? t[e] !== void 0 : kv.call(t, e);
  }
  var Wv = "__lodash_hash_undefined__";
  function Nv(e, t) {
    var o = this.__data__;
    return this.size += this.has(e) ? 0 : 1, o[e] = Vr && t === void 0 ? Wv : t, this;
  }
  function Do(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Do.prototype.clear = Ov;
  Do.prototype.delete = Mv;
  Do.prototype.get = Fv;
  Do.prototype.has = jv;
  Do.prototype.set = Nv;
  function Vv() {
    this.__data__ = [], this.size = 0;
  }
  function ii(e, t) {
    for (var o = e.length; o--; ) if (ni(e[o][0], t)) return o;
    return -1;
  }
  var Gv = Array.prototype, Uv = Gv.splice;
  function Kv(e) {
    var t = this.__data__, o = ii(t, e);
    if (o < 0) return false;
    var r = t.length - 1;
    return o == r ? t.pop() : Uv.call(t, o, 1), --this.size, true;
  }
  function qv(e) {
    var t = this.__data__, o = ii(t, e);
    return o < 0 ? void 0 : t[o][1];
  }
  function Xv(e) {
    return ii(this.__data__, e) > -1;
  }
  function Yv(e, t) {
    var o = this.__data__, r = ii(o, e);
    return r < 0 ? (++this.size, o.push([
      e,
      t
    ])) : o[r][1] = t, this;
  }
  function no(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  no.prototype.clear = Vv;
  no.prototype.delete = Kv;
  no.prototype.get = qv;
  no.prototype.has = Xv;
  no.prototype.set = Yv;
  Qu = Ol(ir, "Map");
  function Jv() {
    this.size = 0, this.__data__ = {
      hash: new Do(),
      map: new (Qu || no)(),
      string: new Do()
    };
  }
  function Qv(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  function li(e, t) {
    var o = e.__data__;
    return Qv(t) ? o[typeof t == "string" ? "string" : "hash"] : o.map;
  }
  function Zv(e) {
    var t = li(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  }
  function ex(e) {
    return li(this, e).get(e);
  }
  function tx(e) {
    return li(this, e).has(e);
  }
  function ox(e, t) {
    var o = li(this, e), r = o.size;
    return o.set(e, t), this.size += o.size == r ? 0 : 1, this;
  }
  sr = function(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  };
  sr.prototype.clear = Jv;
  sr.prototype.delete = Zv;
  sr.prototype.get = ex;
  sr.prototype.has = tx;
  sr.prototype.set = ox;
  rx = function(e) {
    return e == null ? "" : ju(e);
  };
  var Zu = Rv(Object.getPrototypeOf, Object), nx = "[object Object]", ix = Function.prototype, lx = Object.prototype, ed = ix.toString, sx = lx.hasOwnProperty, ax = ed.call(Object);
  function cx(e) {
    if (!lr(e) || Jr(e) != nx) return false;
    var t = Zu(e);
    if (t === null) return true;
    var o = sx.call(t, "constructor") && t.constructor;
    return typeof o == "function" && o instanceof o && ed.call(o) == ax;
  }
  function ux(e, t, o) {
    var r = -1, n = e.length;
    t < 0 && (t = -t > n ? 0 : n + t), o = o > n ? n : o, o < 0 && (o += n), n = t > o ? 0 : o - t >>> 0, t >>>= 0;
    for (var i = Array(n); ++r < n; ) i[r] = e[r + t];
    return i;
  }
  function dx(e, t, o) {
    var r = e.length;
    return o = o === void 0 ? r : o, !t && o >= r ? e : ux(e, t, o);
  }
  var fx = "\\ud800-\\udfff", px = "\\u0300-\\u036f", hx = "\\ufe20-\\ufe2f", gx = "\\u20d0-\\u20ff", mx = px + hx + gx, bx = "\\ufe0e\\ufe0f", vx = "\\u200d", xx = RegExp("[" + vx + fx + mx + bx + "]");
  function td(e) {
    return xx.test(e);
  }
  function Cx(e) {
    return e.split("");
  }
  var od = "\\ud800-\\udfff", Sx = "\\u0300-\\u036f", yx = "\\ufe20-\\ufe2f", wx = "\\u20d0-\\u20ff", Px = Sx + yx + wx, Tx = "\\ufe0e\\ufe0f", _x = "[" + od + "]", rl = "[" + Px + "]", nl = "\\ud83c[\\udffb-\\udfff]", Ex = "(?:" + rl + "|" + nl + ")", rd = "[^" + od + "]", nd = "(?:\\ud83c[\\udde6-\\uddff]){2}", id = "[\\ud800-\\udbff][\\udc00-\\udfff]", Rx = "\\u200d", ld = Ex + "?", sd = "[" + Tx + "]?", Ax = "(?:" + Rx + "(?:" + [
    rd,
    nd,
    id
  ].join("|") + ")" + sd + ld + ")*", Hx = sd + ld + Ax, Ix = "(?:" + [
    rd + rl + "?",
    rl,
    nd,
    id,
    _x
  ].join("|") + ")", $x = RegExp(nl + "(?=" + nl + ")|" + Ix + Hx, "g");
  function Ox(e) {
    return e.match($x) || [];
  }
  function Mx(e) {
    return td(e) ? Ox(e) : Cx(e);
  }
  function zx(e) {
    return function(t) {
      t = rx(t);
      var o = td(t) ? Mx(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? dx(o, 1).join("") : t.slice(1);
      return r[e]() + n;
    };
  }
  var Dx = zx("toUpperCase");
  function Bx() {
    this.__data__ = new no(), this.size = 0;
  }
  function Fx(e) {
    var t = this.__data__, o = t.delete(e);
    return this.size = t.size, o;
  }
  function Lx(e) {
    return this.__data__.get(e);
  }
  function kx(e) {
    return this.__data__.has(e);
  }
  var jx = 200;
  function Wx(e, t) {
    var o = this.__data__;
    if (o instanceof no) {
      var r = o.__data__;
      if (!Qu || r.length < jx - 1) return r.push([
        e,
        t
      ]), this.size = ++o.size, this;
      o = this.__data__ = new sr(r);
    }
    return o.set(e, t), this.size = o.size, this;
  }
  ar = function(e) {
    var t = this.__data__ = new no(e);
    this.size = t.size;
  };
  ar.prototype.clear = Bx;
  ar.prototype.delete = Fx;
  ar.prototype.get = Lx;
  ar.prototype.has = kx;
  ar.prototype.set = Wx;
  var ad = typeof exports == "object" && exports && !exports.nodeType && exports, Ta = ad && typeof module == "object" && module && !module.nodeType && module, Nx = Ta && Ta.exports === ad, _a = Nx ? ir.Buffer : void 0;
  _a && _a.allocUnsafe;
  function Vx(e, t) {
    return e.slice();
  }
  Ea = ir.Uint8Array;
  function Gx(e) {
    var t = new e.constructor(e.byteLength);
    return new Ea(t).set(new Ea(e)), t;
  }
  function Ux(e, t) {
    var o = Gx(e.buffer);
    return new e.constructor(o, e.byteOffset, e.length);
  }
  function Kx(e) {
    return typeof e.constructor == "function" && !Gu(e) ? w0(Zu(e)) : {};
  }
  function qx(e) {
    return function(t, o, r) {
      for (var n = -1, i = Object(t), l = r(t), s = l.length; s--; ) {
        var a = l[++n];
        if (o(i[a], a, i) === false) break;
      }
      return t;
    };
  }
  Xx = qx();
  function il(e, t, o) {
    (o !== void 0 && !ni(e[t], o) || o === void 0 && !(t in e)) && Ml(e, t, o);
  }
  function Yx(e) {
    return lr(e) && zl(e);
  }
  function ll(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__") return e[t];
  }
  function Jx(e) {
    return F0(e, Ju(e));
  }
  function Qx(e, t, o, r, n, i, l) {
    var s = ll(e, o), a = ll(t, o), c = l.get(a);
    if (c) {
      il(e, o, c);
      return;
    }
    var u = i ? i(s, a, o + "", e, t, l) : void 0, d = u === void 0;
    if (d) {
      var f = On(a), p = !f && qu(a), h = !f && !p && Yu(a);
      u = a, f || p || h ? On(s) ? u = s : Yx(s) ? u = T0(s) : p ? (d = false, u = Vx(a)) : h ? (d = false, u = Ux(a)) : u = [] : cx(a) || ol(a) ? (u = s, ol(s) ? u = Jx(s) : (!Lo(s) || $l(s)) && (u = Kx(a))) : d = false;
    }
    d && (l.set(a, u), n(u, a, r, i, l), l.delete(a)), il(e, o, u);
  }
  function cd(e, t, o, r, n) {
    e !== t && Xx(t, function(i, l) {
      if (n || (n = new ar()), Lo(i)) Qx(e, t, l, o, cd, r, n);
      else {
        var s = r ? r(ll(e, l), i, l + "", e, t, n) : void 0;
        s === void 0 && (s = i), il(e, l, s);
      }
    }, Ju);
  }
  var xr = N0(function(e, t, o) {
    cd(e, t, o);
  });
  Gr = "naive-ui-style";
  Dl = function(e, t, o) {
    if (!t) return;
    const r = ri(), n = ie(() => {
      const { value: s } = t;
      if (!s) return;
      const a = s[e];
      if (a) return a;
    }), i = Ae(oo, null), l = () => {
      Gn(() => {
        const { value: s } = o, a = `${s}${e}Rtl`;
        if (Vm(a, r)) return;
        const { value: c } = n;
        c && c.style.mount({
          id: a,
          head: true,
          anchorMetaName: Gr,
          props: {
            bPrefix: s ? `.${s}-` : void 0
          },
          ssr: r,
          parent: i == null ? void 0 : i.styleMountTarget
        });
      });
    };
    return r ? l() : qn(l), n;
  };
  let Zx, eC, tC, ud;
  cr = {
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
  ({ fontSize: Zx, fontFamily: eC, lineHeight: tC } = cr);
  ud = Q("body", `
 margin: 0;
 font-size: ${Zx};
 font-family: ${eC};
 line-height: ${tC};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [
    Q("input", `
 font-family: inherit;
 font-size: inherit;
 `)
  ]);
  Bl = function(e, t, o) {
    if (!t) return;
    const r = ri(), n = Ae(oo, null), i = () => {
      const l = o.value;
      t.mount({
        id: l === void 0 ? e : l + e,
        head: true,
        anchorMetaName: Gr,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: r,
        parent: n == null ? void 0 : n.styleMountTarget
      }), (n == null ? void 0 : n.preflightStyleDisabled) || ud.mount({
        id: "n-global",
        head: true,
        anchorMetaName: Gr,
        ssr: r,
        parent: n == null ? void 0 : n.styleMountTarget
      });
    };
    r ? i() : qn(i);
  };
  rw = function(e) {
    return e;
  };
  ko = function(e, t, o, r, n, i) {
    const l = ri(), s = Ae(oo, null);
    if (o) {
      const c = () => {
        const u = i == null ? void 0 : i.value;
        o.mount({
          id: u === void 0 ? t : u + t,
          head: true,
          props: {
            bPrefix: u ? `.${u}-` : void 0
          },
          anchorMetaName: Gr,
          ssr: l,
          parent: s == null ? void 0 : s.styleMountTarget
        }), (s == null ? void 0 : s.preflightStyleDisabled) || ud.mount({
          id: "n-global",
          head: true,
          anchorMetaName: Gr,
          ssr: l,
          parent: s == null ? void 0 : s.styleMountTarget
        });
      };
      l ? c() : qn(c);
    }
    return ie(() => {
      var c;
      const { theme: { common: u, self: d, peers: f = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: h = {} } = n, { common: m, peers: v } = p, { common: x = void 0, [e]: { common: S = void 0, self: T = void 0, peers: A = {} } = {} } = (s == null ? void 0 : s.mergedThemeRef.value) || {}, { common: B = void 0, [e]: k = {} } = (s == null ? void 0 : s.mergedThemeOverridesRef.value) || {}, { common: P, peers: w = {} } = k, y = xr({}, u || S || x || r.common, B, P, m), O = xr((c = d || T || r.self) === null || c === void 0 ? void 0 : c(y), h, k, p);
      return {
        common: y,
        self: O,
        peers: xr({}, r.peers, A, f),
        peerOverrides: xr({}, h.peers, w, v)
      };
    });
  };
  ko.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  let oC;
  oC = pe("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [
    Q("svg", `
 height: 1em;
 width: 1em;
 `)
  ]);
  Fl = Le({
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
      Bl("-base-icon", oC, Cl(e, "clsPrefix"));
    },
    render() {
      return z("i", {
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
  dd = Le({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: t }) {
      const o = hb();
      return () => z(Lr, {
        name: "icon-switch-transition",
        appear: o.value
      }, t);
    }
  });
  Qr = function(e, t) {
    const o = Le({
      render() {
        return t();
      }
    });
    return Le({
      name: Dx(e),
      setup() {
        var r;
        const n = (r = Ae(oo, null)) === null || r === void 0 ? void 0 : r.mergedIconsRef;
        return () => {
          var i;
          const l = (i = n == null ? void 0 : n.value) === null || i === void 0 ? void 0 : i[e];
          return l ? l() : z(o, null);
        };
      }
    });
  };
  let rC, nC;
  rC = Qr("close", () => z("svg", {
    viewBox: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  }, z("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, z("g", {
    fill: "currentColor",
    "fill-rule": "nonzero"
  }, z("path", {
    d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
  })))));
  fd = Qr("error", () => z("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, z("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, z("g", {
    "fill-rule": "nonzero"
  }, z("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
  })))));
  pd = Qr("info", () => z("svg", {
    viewBox: "0 0 28 28",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, z("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, z("g", {
    "fill-rule": "nonzero"
  }, z("path", {
    d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
  })))));
  hd = Qr("success", () => z("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, z("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, z("g", {
    "fill-rule": "nonzero"
  }, z("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
  })))));
  gd = Qr("warning", () => z("svg", {
    viewBox: "0 0 24 24",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, z("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, z("g", {
    "fill-rule": "nonzero"
  }, z("path", {
    d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
  })))));
  ({ cubicBezierEaseInOut: nC } = cr);
  sl = function({ originalTransform: e = "", left: t = 0, top: o = 0, transition: r = `all .3s ${nC} !important` } = {}) {
    return [
      Q("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
        transform: `${e} scale(0.75)`,
        left: t,
        top: o,
        opacity: 0
      }),
      Q("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
        transform: `scale(1) ${e}`,
        left: t,
        top: o,
        opacity: 1
      }),
      Q("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
        transformOrigin: "center",
        position: "absolute",
        left: t,
        top: o,
        transition: r
      })
    ];
  };
  let iC, sC, Oi, Ra;
  iC = pe("base-close", `
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
    ge("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),
    Q("&::before", `
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
    qm("disabled", [
      Q("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
      Q("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `),
      Q("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `),
      Q("&:active", `
 color: var(--n-close-icon-color-pressed);
 `),
      Q("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)
    ]),
    ge("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),
    ge("round", [
      Q("&::before", `
 border-radius: 50%;
 `)
    ])
  ]);
  md = Le({
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
      return Bl("-base-close", iC, Cl(e, "clsPrefix")), () => {
        const { clsPrefix: t, disabled: o, absolute: r, round: n, isButtonTag: i } = e;
        return z(i ? "button" : "div", {
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
        }, z(Fl, {
          clsPrefix: t
        }, {
          default: () => z(rC, null)
        }));
      };
    }
  });
  lC = Le({
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
        const { group: s, width: a, appear: c, mode: u } = e, d = s ? Kh : Lr, f = {
          name: a ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
          appear: c,
          onEnter: i,
          onAfterEnter: l,
          onBeforeLeave: o,
          onLeave: r,
          onAfterLeave: n
        };
        return s || (f.mode = u), z(d, f, t);
      };
    }
  });
  sC = Q([
    Q("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),
    pe("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [
      Ue("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [
        sl()
      ]),
      Ue("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [
        sl({
          left: "50%",
          top: "50%",
          originalTransform: "translateX(-50%) translateY(-50%)"
        })
      ]),
      Ue("container", `
 animation: rotator 3s linear infinite both;
 `, [
        Ue("icon", `
 height: 1em;
 width: 1em;
 `)
      ])
    ])
  ]);
  Oi = "1.6s";
  aC = {
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
  cC = Le({
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
    }, aC),
    setup(e) {
      Bl("-base-loading", sC, Cl(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
      return z("div", {
        class: `${e}-base-loading`,
        role: "img",
        "aria-label": "loading"
      }, z(dd, null, {
        default: () => this.show ? z("div", {
          key: "icon",
          class: `${e}-base-loading__transition-wrapper`
        }, z("div", {
          class: `${e}-base-loading__container`
        }, z("svg", {
          class: `${e}-base-loading__icon`,
          viewBox: `0 0 ${2 * i} ${2 * i}`,
          xmlns: "http://www.w3.org/2000/svg",
          style: {
            color: r
          }
        }, z("g", null, z("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};270 ${i} ${i}`,
          begin: "0s",
          dur: Oi,
          fill: "freeze",
          repeatCount: "indefinite"
        }), z("circle", {
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
        }, z("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
          begin: "0s",
          dur: Oi,
          fill: "freeze",
          repeatCount: "indefinite"
        }), z("animate", {
          attributeName: "stroke-dashoffset",
          values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
          begin: "0s",
          dur: Oi,
          fill: "freeze",
          repeatCount: "indefinite"
        })))))) : z("div", {
          key: "placeholder",
          class: `${e}-base-loading__placeholder`
        }, this.$slots)
      }));
    }
  });
  ({ cubicBezierEaseInOut: Ra } = cr);
  uC = function({ name: e = "fade-in", enterDuration: t = "0.2s", leaveDuration: o = "0.2s", enterCubicBezier: r = Ra, leaveCubicBezier: n = Ra } = {}) {
    return [
      Q(`&.${e}-transition-enter-active`, {
        transition: `all ${t} ${r}!important`
      }),
      Q(`&.${e}-transition-leave-active`, {
        transition: `all ${o} ${n}!important`
      }),
      Q(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
        opacity: 0
      }),
      Q(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
        opacity: 1
      })
    ];
  };
  const U = {
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
  }, dC = to(U.neutralBase), bd = to(U.neutralInvertBase), fC = `rgba(${bd.slice(0, 3).join(", ")}, `;
  function be(e) {
    return `${fC + String(e)})`;
  }
  function pC(e) {
    const t = Array.from(bd);
    return t[3] = Number(e), X(dC, t);
  }
  const D = Object.assign(Object.assign({
    name: "common"
  }, cr), {
    baseColor: U.neutralBase,
    primaryColor: U.primaryDefault,
    primaryColorHover: U.primaryHover,
    primaryColorPressed: U.primaryActive,
    primaryColorSuppl: U.primarySuppl,
    infoColor: U.infoDefault,
    infoColorHover: U.infoHover,
    infoColorPressed: U.infoActive,
    infoColorSuppl: U.infoSuppl,
    successColor: U.successDefault,
    successColorHover: U.successHover,
    successColorPressed: U.successActive,
    successColorSuppl: U.successSuppl,
    warningColor: U.warningDefault,
    warningColorHover: U.warningHover,
    warningColorPressed: U.warningActive,
    warningColorSuppl: U.warningSuppl,
    errorColor: U.errorDefault,
    errorColorHover: U.errorHover,
    errorColorPressed: U.errorActive,
    errorColorSuppl: U.errorSuppl,
    textColorBase: U.neutralTextBase,
    textColor1: be(U.alpha1),
    textColor2: be(U.alpha2),
    textColor3: be(U.alpha3),
    textColorDisabled: be(U.alpha4),
    placeholderColor: be(U.alpha4),
    placeholderColorDisabled: be(U.alpha5),
    iconColor: be(U.alpha4),
    iconColorDisabled: be(U.alpha5),
    iconColorHover: be(Number(U.alpha4) * 1.25),
    iconColorPressed: be(Number(U.alpha4) * 0.8),
    opacity1: U.alpha1,
    opacity2: U.alpha2,
    opacity3: U.alpha3,
    opacity4: U.alpha4,
    opacity5: U.alpha5,
    dividerColor: be(U.alphaDivider),
    borderColor: be(U.alphaBorder),
    closeIconColorHover: be(Number(U.alphaClose)),
    closeIconColor: be(Number(U.alphaClose)),
    closeIconColorPressed: be(Number(U.alphaClose)),
    closeColorHover: "rgba(255, 255, 255, .12)",
    closeColorPressed: "rgba(255, 255, 255, .08)",
    clearColor: be(U.alpha4),
    clearColorHover: Fe(be(U.alpha4), {
      alpha: 1.25
    }),
    clearColorPressed: Fe(be(U.alpha4), {
      alpha: 0.8
    }),
    scrollbarColor: be(U.alphaScrollbar),
    scrollbarColorHover: be(U.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: be(U.alphaProgressRail),
    railColor: be(U.alphaRail),
    popoverColor: U.neutralPopover,
    tableColor: U.neutralCard,
    cardColor: U.neutralCard,
    modalColor: U.neutralModal,
    bodyColor: U.neutralBody,
    tagColor: pC(U.alphaTag),
    avatarColor: be(U.alphaAvatar),
    invertedColor: U.neutralBase,
    inputColor: be(U.alphaInput),
    codeColor: be(U.alphaCode),
    tabColor: be(U.alphaTab),
    actionColor: be(U.alphaAction),
    tableHeaderColor: be(U.alphaAction),
    hoverColor: be(U.alphaPending),
    tableColorHover: be(U.alphaTablePending),
    tableColorStriped: be(U.alphaTableStriped),
    pressedColor: be(U.alphaPressed),
    opacityDisabled: U.alphaDisabled,
    inputColorDisabled: be(U.alphaDisabledInput),
    buttonColor2: "rgba(255, 255, 255, .08)",
    buttonColor2Hover: "rgba(255, 255, 255, .12)",
    buttonColor2Pressed: "rgba(255, 255, 255, .08)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), re = {
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
  }, hC = to(re.neutralBase), vd = to(re.neutralInvertBase), gC = `rgba(${vd.slice(0, 3).join(", ")}, `;
  function Aa(e) {
    return `${gC + String(e)})`;
  }
  function Ye(e) {
    const t = Array.from(vd);
    return t[3] = Number(e), X(hC, t);
  }
  let mC;
  Te = Object.assign(Object.assign({
    name: "common"
  }, cr), {
    baseColor: re.neutralBase,
    primaryColor: re.primaryDefault,
    primaryColorHover: re.primaryHover,
    primaryColorPressed: re.primaryActive,
    primaryColorSuppl: re.primarySuppl,
    infoColor: re.infoDefault,
    infoColorHover: re.infoHover,
    infoColorPressed: re.infoActive,
    infoColorSuppl: re.infoSuppl,
    successColor: re.successDefault,
    successColorHover: re.successHover,
    successColorPressed: re.successActive,
    successColorSuppl: re.successSuppl,
    warningColor: re.warningDefault,
    warningColorHover: re.warningHover,
    warningColorPressed: re.warningActive,
    warningColorSuppl: re.warningSuppl,
    errorColor: re.errorDefault,
    errorColorHover: re.errorHover,
    errorColorPressed: re.errorActive,
    errorColorSuppl: re.errorSuppl,
    textColorBase: re.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    textColorDisabled: Ye(re.alpha4),
    placeholderColor: Ye(re.alpha4),
    placeholderColorDisabled: Ye(re.alpha5),
    iconColor: Ye(re.alpha4),
    iconColorHover: Fe(Ye(re.alpha4), {
      lightness: 0.75
    }),
    iconColorPressed: Fe(Ye(re.alpha4), {
      lightness: 0.9
    }),
    iconColorDisabled: Ye(re.alpha5),
    opacity1: re.alpha1,
    opacity2: re.alpha2,
    opacity3: re.alpha3,
    opacity4: re.alpha4,
    opacity5: re.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    closeIconColor: Ye(Number(re.alphaClose)),
    closeIconColorHover: Ye(Number(re.alphaClose)),
    closeIconColorPressed: Ye(Number(re.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    clearColor: Ye(re.alpha4),
    clearColorHover: Fe(Ye(re.alpha4), {
      lightness: 0.75
    }),
    clearColorPressed: Fe(Ye(re.alpha4), {
      lightness: 0.9
    }),
    scrollbarColor: Aa(re.alphaScrollbar),
    scrollbarColorHover: Aa(re.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: Ye(re.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: re.neutralPopover,
    tableColor: re.neutralCard,
    cardColor: re.neutralCard,
    modalColor: re.neutralModal,
    bodyColor: re.neutralBody,
    tagColor: "#eee",
    avatarColor: Ye(re.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: Ye(re.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: re.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  });
  mC = {
    railInsetHorizontalBottom: "auto 2px 4px 2px",
    railInsetHorizontalTop: "4px 2px auto 2px",
    railInsetVerticalRight: "2px 4px 2px auto",
    railInsetVerticalLeft: "2px auto 2px 4px",
    railColor: "transparent"
  };
  function xd(e) {
    const { scrollbarColor: t, scrollbarColorHover: o, scrollbarHeight: r, scrollbarWidth: n, scrollbarBorderRadius: i } = e;
    return Object.assign(Object.assign({}, mC), {
      height: r,
      width: n,
      borderRadius: i,
      color: t,
      colorHover: o
    });
  }
  let io, rt, bC, vC, xC;
  io = {
    name: "Scrollbar",
    common: Te,
    self: xd
  };
  rt = {
    name: "Scrollbar",
    common: D,
    self: xd
  };
  bC = pe("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [
    Q(">", [
      pe("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [
        Q("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `),
        Q(">", [
          pe("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
        ])
      ])
    ]),
    Q(">, +", [
      pe("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [
        ge("horizontal", `
 height: var(--n-scrollbar-height);
 `, [
          Q(">", [
            Ue("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)
          ])
        ]),
        ge("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),
        ge("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),
        ge("vertical", `
 width: var(--n-scrollbar-width);
 `, [
          Q(">", [
            Ue("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)
          ])
        ]),
        ge("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),
        ge("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),
        ge("disabled", [
          Q(">", [
            Ue("scrollbar", "pointer-events: none;")
          ])
        ]),
        Q(">", [
          Ue("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [
            uC(),
            Q("&:hover", "background-color: var(--n-scrollbar-color-hover);")
          ])
        ])
      ])
    ])
  ]);
  vC = Object.assign(Object.assign({}, ko.props), {
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
  Cd = Le({
    name: "Scrollbar",
    props: vC,
    inheritAttrs: false,
    setup(e) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = Yr(e), n = Dl("Scrollbar", r, t), i = Ce(null), l = Ce(null), s = Ce(null), a = Ce(null), c = Ce(null), u = Ce(null), d = Ce(null), f = Ce(null), p = Ce(null), h = Ce(null), m = Ce(null), v = Ce(0), x = Ce(0), S = Ce(false), T = Ce(false);
      let A = false, B = false, k, P, w = 0, y = 0, O = 0, L = 0;
      const I = mb(), q = ko("Scrollbar", "-scrollbar", bC, io, e, t), se = ie(() => {
        const { value: M } = f, { value: J } = u, { value: ce } = h;
        return M === null || J === null || ce === null ? 0 : Math.min(M, ce * M / J + Js(q.value.self.width) * 1.5);
      }), de = ie(() => `${se.value}px`), ne = ie(() => {
        const { value: M } = p, { value: J } = d, { value: ce } = m;
        return M === null || J === null || ce === null ? 0 : ce * M / J + Js(q.value.self.height) * 1.5;
      }), Y = ie(() => `${ne.value}px`), ae = ie(() => {
        const { value: M } = f, { value: J } = v, { value: ce } = u, { value: Ee } = h;
        if (M === null || ce === null || Ee === null) return 0;
        {
          const Ve = ce - M;
          return Ve ? J / Ve * (Ee - se.value) : 0;
        }
      }), Oe = ie(() => `${ae.value}px`), ke = ie(() => {
        const { value: M } = p, { value: J } = x, { value: ce } = d, { value: Ee } = m;
        if (M === null || ce === null || Ee === null) return 0;
        {
          const Ve = ce - M;
          return Ve ? J / Ve * (Ee - ne.value) : 0;
        }
      }), De = ie(() => `${ke.value}px`), Be = ie(() => {
        const { value: M } = f, { value: J } = u;
        return M !== null && J !== null && J > M;
      }), St = ie(() => {
        const { value: M } = p, { value: J } = d;
        return M !== null && J !== null && J > M;
      }), Rt = ie(() => {
        const { trigger: M } = e;
        return M === "none" || S.value;
      }), yt = ie(() => {
        const { trigger: M } = e;
        return M === "none" || T.value;
      }), je = ie(() => {
        const { container: M } = e;
        return M ? M() : l.value;
      }), R = ie(() => {
        const { content: M } = e;
        return M ? M() : s.value;
      }), K = (M, J) => {
        if (!e.scrollable) return;
        if (typeof M == "number") {
          b(M, J ?? 0, 0, false, "auto");
          return;
        }
        const { left: ce, top: Ee, index: Ve, elSize: dt, position: wt, behavior: Ie, el: xt, debounce: so = true } = M;
        (ce !== void 0 || Ee !== void 0) && b(ce ?? 0, Ee ?? 0, 0, false, Ie), xt !== void 0 ? b(0, xt.offsetTop, xt.offsetHeight, so, Ie) : Ve !== void 0 && dt !== void 0 ? b(0, Ve * dt, dt, so, Ie) : wt === "bottom" ? b(0, Number.MAX_SAFE_INTEGER, 0, false, Ie) : wt === "top" && b(0, 0, 0, false, Ie);
      }, N = bb(() => {
        e.container || K({
          top: v.value,
          left: x.value
        });
      }), ee = () => {
        N.isDeactivated || te();
      }, fe = (M) => {
        if (N.isDeactivated) return;
        const { onResize: J } = e;
        J && J(M), te();
      }, g = (M, J) => {
        if (!e.scrollable) return;
        const { value: ce } = je;
        ce && (typeof M == "object" ? ce.scrollBy(M) : ce.scrollBy(M, J || 0));
      };
      function b(M, J, ce, Ee, Ve) {
        const { value: dt } = je;
        if (dt) {
          if (Ee) {
            const { scrollTop: wt, offsetHeight: Ie } = dt;
            if (J > wt) {
              J + ce <= wt + Ie || dt.scrollTo({
                left: M,
                top: J + ce - Ie,
                behavior: Ve
              });
              return;
            }
          }
          dt.scrollTo({
            left: M,
            top: J,
            behavior: Ve
          });
        }
      }
      function C() {
        j(), F(), te();
      }
      function _() {
        H();
      }
      function H() {
        E(), W();
      }
      function E() {
        P !== void 0 && window.clearTimeout(P), P = window.setTimeout(() => {
          T.value = false;
        }, e.duration);
      }
      function W() {
        k !== void 0 && window.clearTimeout(k), k = window.setTimeout(() => {
          S.value = false;
        }, e.duration);
      }
      function j() {
        k !== void 0 && window.clearTimeout(k), S.value = true;
      }
      function F() {
        P !== void 0 && window.clearTimeout(P), T.value = true;
      }
      function $(M) {
        const { onScroll: J } = e;
        J && J(M), oe();
      }
      function oe() {
        const { value: M } = je;
        M && (v.value = M.scrollTop, x.value = M.scrollLeft * ((n == null ? void 0 : n.value) ? -1 : 1));
      }
      function G() {
        const { value: M } = R;
        M && (u.value = M.offsetHeight, d.value = M.offsetWidth);
        const { value: J } = je;
        J && (f.value = J.offsetHeight, p.value = J.offsetWidth);
        const { value: ce } = c, { value: Ee } = a;
        ce && (m.value = ce.offsetWidth), Ee && (h.value = Ee.offsetHeight);
      }
      function Z() {
        const { value: M } = je;
        M && (v.value = M.scrollTop, x.value = M.scrollLeft * ((n == null ? void 0 : n.value) ? -1 : 1), f.value = M.offsetHeight, p.value = M.offsetWidth, u.value = M.scrollHeight, d.value = M.scrollWidth);
        const { value: J } = c, { value: ce } = a;
        J && (m.value = J.offsetWidth), ce && (h.value = ce.offsetHeight);
      }
      function te() {
        e.scrollable && (e.useUnifiedContainer ? Z() : (G(), oe()));
      }
      function he(M) {
        var J;
        return !(!((J = i.value) === null || J === void 0) && J.contains(Xm(M)));
      }
      function ye(M) {
        M.preventDefault(), M.stopPropagation(), B = true, vr("mousemove", window, we, true), vr("mouseup", window, He, true), y = x.value, O = (n == null ? void 0 : n.value) ? window.innerWidth - M.clientX : M.clientX;
      }
      function we(M) {
        if (!B) return;
        k !== void 0 && window.clearTimeout(k), P !== void 0 && window.clearTimeout(P);
        const { value: J } = p, { value: ce } = d, { value: Ee } = ne;
        if (J === null || ce === null) return;
        const dt = ((n == null ? void 0 : n.value) ? window.innerWidth - M.clientX - O : M.clientX - O) * (ce - J) / (J - Ee), wt = ce - J;
        let Ie = y + dt;
        Ie = Math.min(wt, Ie), Ie = Math.max(Ie, 0);
        const { value: xt } = je;
        if (xt) {
          xt.scrollLeft = Ie * ((n == null ? void 0 : n.value) ? -1 : 1);
          const { internalOnUpdateScrollLeft: so } = e;
          so && so(Ie);
        }
      }
      function He(M) {
        M.preventDefault(), M.stopPropagation(), Po("mousemove", window, we, true), Po("mouseup", window, He, true), B = false, te(), he(M) && H();
      }
      function Ne(M) {
        M.preventDefault(), M.stopPropagation(), A = true, vr("mousemove", window, at, true), vr("mouseup", window, ct, true), w = v.value, L = M.clientY;
      }
      function at(M) {
        if (!A) return;
        k !== void 0 && window.clearTimeout(k), P !== void 0 && window.clearTimeout(P);
        const { value: J } = f, { value: ce } = u, { value: Ee } = se;
        if (J === null || ce === null) return;
        const dt = (M.clientY - L) * (ce - J) / (J - Ee), wt = ce - J;
        let Ie = w + dt;
        Ie = Math.min(wt, Ie), Ie = Math.max(Ie, 0);
        const { value: xt } = je;
        xt && (xt.scrollTop = Ie);
      }
      function ct(M) {
        M.preventDefault(), M.stopPropagation(), Po("mousemove", window, at, true), Po("mouseup", window, ct, true), A = false, te(), he(M) && H();
      }
      Gn(() => {
        const { value: M } = St, { value: J } = Be, { value: ce } = t, { value: Ee } = c, { value: Ve } = a;
        Ee && (M ? Ee.classList.remove(`${ce}-scrollbar-rail--disabled`) : Ee.classList.add(`${ce}-scrollbar-rail--disabled`)), Ve && (J ? Ve.classList.remove(`${ce}-scrollbar-rail--disabled`) : Ve.classList.add(`${ce}-scrollbar-rail--disabled`));
      }), Fo(() => {
        e.container || te();
      }), Xn(() => {
        k !== void 0 && window.clearTimeout(k), P !== void 0 && window.clearTimeout(P), Po("mousemove", window, at, true), Po("mouseup", window, ct, true);
      });
      const lo = ie(() => {
        const { common: { cubicBezierEaseInOut: M }, self: { color: J, colorHover: ce, height: Ee, width: Ve, borderRadius: dt, railInsetHorizontalTop: wt, railInsetHorizontalBottom: Ie, railInsetVerticalRight: xt, railInsetVerticalLeft: so, railColor: uf } } = q.value, { top: df, right: ff, bottom: pf, left: hf } = Ko(wt), { top: gf, right: mf, bottom: bf, left: vf } = Ko(Ie), { top: xf, right: Cf, bottom: Sf, left: yf } = Ko((n == null ? void 0 : n.value) ? fa(xt) : xt), { top: wf, right: Pf, bottom: Tf, left: _f } = Ko((n == null ? void 0 : n.value) ? fa(so) : so);
        return {
          "--n-scrollbar-bezier": M,
          "--n-scrollbar-color": J,
          "--n-scrollbar-color-hover": ce,
          "--n-scrollbar-border-radius": dt,
          "--n-scrollbar-width": Ve,
          "--n-scrollbar-height": Ee,
          "--n-scrollbar-rail-top-horizontal-top": df,
          "--n-scrollbar-rail-right-horizontal-top": ff,
          "--n-scrollbar-rail-bottom-horizontal-top": pf,
          "--n-scrollbar-rail-left-horizontal-top": hf,
          "--n-scrollbar-rail-top-horizontal-bottom": gf,
          "--n-scrollbar-rail-right-horizontal-bottom": mf,
          "--n-scrollbar-rail-bottom-horizontal-bottom": bf,
          "--n-scrollbar-rail-left-horizontal-bottom": vf,
          "--n-scrollbar-rail-top-vertical-right": xf,
          "--n-scrollbar-rail-right-vertical-right": Cf,
          "--n-scrollbar-rail-bottom-vertical-right": Sf,
          "--n-scrollbar-rail-left-vertical-right": yf,
          "--n-scrollbar-rail-top-vertical-left": wf,
          "--n-scrollbar-rail-right-vertical-left": Pf,
          "--n-scrollbar-rail-bottom-vertical-left": Tf,
          "--n-scrollbar-rail-left-vertical-left": _f,
          "--n-scrollbar-rail-color": uf
        };
      }), Wt = o ? Il("scrollbar", void 0, lo, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: K,
        scrollBy: g,
        sync: te,
        syncUnifiedContainer: Z,
        handleMouseEnterWrapper: C,
        handleMouseLeaveWrapper: _
      }), {
        mergedClsPrefix: t,
        rtlEnabled: n,
        containerScrollTop: v,
        wrapperRef: i,
        containerRef: l,
        contentRef: s,
        yRailRef: a,
        xRailRef: c,
        needYBar: Be,
        needXBar: St,
        yBarSizePx: de,
        xBarSizePx: Y,
        yBarTopPx: Oe,
        xBarLeftPx: De,
        isShowXBar: Rt,
        isShowYBar: yt,
        isIos: I,
        handleScroll: $,
        handleContentResize: ee,
        handleContainerResize: fe,
        handleYScrollMouseDown: Ne,
        handleXScrollMouseDown: ye,
        containerWidth: p,
        cssVars: o ? void 0 : lo,
        themeClass: Wt == null ? void 0 : Wt.themeClass,
        onRender: Wt == null ? void 0 : Wt.onRender
      });
    },
    render() {
      var e;
      const { $slots: t, mergedClsPrefix: o, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i, yPlacement: l, xPlacement: s, xScrollable: a } = this;
      if (!this.scrollable) return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
      const c = this.trigger === "none", u = (p, h) => z("div", {
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
      }, z(c ? pa : Lr, c ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? z("div", {
          class: `${o}-scrollbar-rail__scrollbar`,
          style: {
            height: this.yBarSizePx,
            top: this.yBarTopPx
          },
          onMousedown: this.handleYScrollMouseDown
        }) : null
      })), d = () => {
        var p, h;
        return (p = this.onRender) === null || p === void 0 || p.call(this), z("div", Kc(this.$attrs, {
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
          this.container ? (h = t.default) === null || h === void 0 ? void 0 : h.call(t) : z("div", {
            role: "none",
            ref: "containerRef",
            class: [
              `${o}-scrollbar-container`,
              this.containerClass
            ],
            style: [
              this.containerStyle,
              this.internalExposeWidthCssVar ? {
                "--n-scrollbar-current-width": Ym(this.containerWidth)
              } : void 0
            ],
            onScroll: this.handleScroll,
            onWheel: this.onWheel
          }, z(da, {
            onResize: this.handleContentResize
          }, {
            default: () => z("div", {
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
          i ? null : u(void 0, void 0),
          a && z("div", {
            ref: "xRailRef",
            class: [
              `${o}-scrollbar-rail`,
              `${o}-scrollbar-rail--horizontal`,
              `${o}-scrollbar-rail--horizontal--${s}`
            ],
            style: this.horizontalRailStyle,
            "data-scrollbar-rail": true,
            "aria-hidden": true
          }, z(c ? pa : Lr, c ? null : {
            name: "fade-in-transition"
          }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? z("div", {
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
      }, f = this.container ? d() : z(da, {
        onResize: this.handleContainerResize
      }, {
        default: d
      });
      return i ? z(qe, null, f, u(this.themeClass, this.cssVars)) : f;
    }
  });
  nw = Cd;
  xC = {
    iconSizeTiny: "28px",
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  };
  function Sd(e) {
    const { textColorDisabled: t, iconColor: o, textColor2: r, fontSizeTiny: n, fontSizeSmall: i, fontSizeMedium: l, fontSizeLarge: s, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, xC), {
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
  let jo, CC;
  Ll = {
    name: "Empty",
    common: Te,
    self: Sd
  };
  jo = {
    name: "Empty",
    common: D,
    self: Sd
  };
  CC = {
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
  function yd(e) {
    const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: s, primaryColor: a, opacityDisabled: c, hoverColor: u, fontSizeTiny: d, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: h, fontSizeHuge: m, heightTiny: v, heightSmall: x, heightMedium: S, heightLarge: T, heightHuge: A } = e;
    return Object.assign(Object.assign({}, CC), {
      optionFontSizeTiny: d,
      optionFontSizeSmall: f,
      optionFontSizeMedium: p,
      optionFontSizeLarge: h,
      optionFontSizeHuge: m,
      optionHeightTiny: v,
      optionHeightSmall: x,
      optionHeightMedium: S,
      optionHeightLarge: T,
      optionHeightHuge: A,
      borderRadius: t,
      color: o,
      groupHeaderTextColor: r,
      actionDividerColor: n,
      optionTextColor: i,
      optionTextColorPressed: l,
      optionTextColorDisabled: s,
      optionTextColorActive: a,
      optionOpacityDisabled: c,
      optionCheckColor: a,
      optionColorPending: u,
      optionColorActive: "rgba(0, 0, 0, 0)",
      optionColorActivePending: u,
      actionTextColor: i,
      loadingColor: a
    });
  }
  let Zr, SC;
  wd = {
    name: "InternalSelectMenu",
    common: Te,
    peers: {
      Scrollbar: io,
      Empty: Ll
    },
    self: yd
  };
  Zr = {
    name: "InternalSelectMenu",
    common: D,
    peers: {
      Scrollbar: rt,
      Empty: jo
    },
    self: yd
  };
  SC = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  };
  function Pd(e) {
    const { boxShadow2: t, popoverColor: o, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, SC), {
      fontSize: i,
      borderRadius: n,
      color: o,
      dividerColor: l,
      textColor: r,
      boxShadow: t
    });
  }
  let Wo, Td, _d, kl;
  en = {
    name: "Popover",
    common: Te,
    peers: {
      Scrollbar: io
    },
    self: Pd
  };
  Wo = {
    name: "Popover",
    common: D,
    peers: {
      Scrollbar: rt
    },
    self: Pd
  };
  yC = {
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
  Td = {
    name: "Tag",
    common: D,
    self(e) {
      const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: s, errorColor: a, baseColor: c, borderColor: u, tagColor: d, opacityDisabled: f, closeIconColor: p, closeIconColorHover: h, closeIconColorPressed: m, closeColorHover: v, closeColorPressed: x, borderRadiusSmall: S, fontSizeMini: T, fontSizeTiny: A, fontSizeSmall: B, fontSizeMedium: k, heightMini: P, heightTiny: w, heightSmall: y, heightMedium: O, buttonColor2Hover: L, buttonColor2Pressed: I, fontWeightStrong: q } = e;
      return Object.assign(Object.assign({}, yC), {
        closeBorderRadius: S,
        heightTiny: P,
        heightSmall: w,
        heightMedium: y,
        heightLarge: O,
        borderRadius: S,
        opacityDisabled: f,
        fontSizeTiny: T,
        fontSizeSmall: A,
        fontSizeMedium: B,
        fontSizeLarge: k,
        fontWeightStrong: q,
        textColorCheckable: t,
        textColorHoverCheckable: t,
        textColorPressedCheckable: t,
        textColorChecked: c,
        colorCheckable: "#0000",
        colorHoverCheckable: L,
        colorPressedCheckable: I,
        colorChecked: n,
        colorCheckedHover: o,
        colorCheckedPressed: r,
        border: `1px solid ${u}`,
        textColor: t,
        color: d,
        colorBordered: "#0000",
        closeIconColor: p,
        closeIconColorHover: h,
        closeIconColorPressed: m,
        closeColorHover: v,
        closeColorPressed: x,
        borderPrimary: `1px solid ${V(n, {
          alpha: 0.3
        })}`,
        textColorPrimary: n,
        colorPrimary: V(n, {
          alpha: 0.16
        }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: Fe(n, {
          lightness: 0.7
        }),
        closeIconColorHoverPrimary: Fe(n, {
          lightness: 0.7
        }),
        closeIconColorPressedPrimary: Fe(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: V(n, {
          alpha: 0.16
        }),
        closeColorPressedPrimary: V(n, {
          alpha: 0.12
        }),
        borderInfo: `1px solid ${V(i, {
          alpha: 0.3
        })}`,
        textColorInfo: i,
        colorInfo: V(i, {
          alpha: 0.16
        }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: Fe(i, {
          alpha: 0.7
        }),
        closeIconColorHoverInfo: Fe(i, {
          alpha: 0.7
        }),
        closeIconColorPressedInfo: Fe(i, {
          alpha: 0.7
        }),
        closeColorHoverInfo: V(i, {
          alpha: 0.16
        }),
        closeColorPressedInfo: V(i, {
          alpha: 0.12
        }),
        borderSuccess: `1px solid ${V(l, {
          alpha: 0.3
        })}`,
        textColorSuccess: l,
        colorSuccess: V(l, {
          alpha: 0.16
        }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: Fe(l, {
          alpha: 0.7
        }),
        closeIconColorHoverSuccess: Fe(l, {
          alpha: 0.7
        }),
        closeIconColorPressedSuccess: Fe(l, {
          alpha: 0.7
        }),
        closeColorHoverSuccess: V(l, {
          alpha: 0.16
        }),
        closeColorPressedSuccess: V(l, {
          alpha: 0.12
        }),
        borderWarning: `1px solid ${V(s, {
          alpha: 0.3
        })}`,
        textColorWarning: s,
        colorWarning: V(s, {
          alpha: 0.16
        }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: Fe(s, {
          alpha: 0.7
        }),
        closeIconColorHoverWarning: Fe(s, {
          alpha: 0.7
        }),
        closeIconColorPressedWarning: Fe(s, {
          alpha: 0.7
        }),
        closeColorHoverWarning: V(s, {
          alpha: 0.16
        }),
        closeColorPressedWarning: V(s, {
          alpha: 0.11
        }),
        borderError: `1px solid ${V(a, {
          alpha: 0.3
        })}`,
        textColorError: a,
        colorError: V(a, {
          alpha: 0.16
        }),
        colorBorderedError: "#0000",
        closeIconColorError: Fe(a, {
          alpha: 0.7
        }),
        closeIconColorHoverError: Fe(a, {
          alpha: 0.7
        }),
        closeIconColorPressedError: Fe(a, {
          alpha: 0.7
        }),
        closeColorHoverError: V(a, {
          alpha: 0.16
        }),
        closeColorPressedError: V(a, {
          alpha: 0.12
        })
      });
    }
  };
  _d = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  };
  kl = {
    name: "InternalSelection",
    common: D,
    peers: {
      Popover: Wo
    },
    self(e) {
      const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: s, warningColor: a, warningColorHover: c, errorColor: u, errorColorHover: d, iconColor: f, iconColorDisabled: p, clearColor: h, clearColorHover: m, clearColorPressed: v, placeholderColor: x, placeholderColorDisabled: S, fontSizeTiny: T, fontSizeSmall: A, fontSizeMedium: B, fontSizeLarge: k, heightTiny: P, heightSmall: w, heightMedium: y, heightLarge: O, fontWeight: L } = e;
      return Object.assign(Object.assign({}, _d), {
        fontWeight: L,
        fontSizeTiny: T,
        fontSizeSmall: A,
        fontSizeMedium: B,
        fontSizeLarge: k,
        heightTiny: P,
        heightSmall: w,
        heightMedium: y,
        heightLarge: O,
        borderRadius: t,
        textColor: o,
        textColorDisabled: r,
        placeholderColor: x,
        placeholderColorDisabled: S,
        color: n,
        colorDisabled: i,
        colorActive: V(l, {
          alpha: 0.1
        }),
        border: "1px solid #0000",
        borderHover: `1px solid ${s}`,
        borderActive: `1px solid ${l}`,
        borderFocus: `1px solid ${s}`,
        boxShadowHover: "none",
        boxShadowActive: `0 0 8px 0 ${V(l, {
          alpha: 0.4
        })}`,
        boxShadowFocus: `0 0 8px 0 ${V(l, {
          alpha: 0.4
        })}`,
        caretColor: l,
        arrowColor: f,
        arrowColorDisabled: p,
        loadingColor: l,
        borderWarning: `1px solid ${a}`,
        borderHoverWarning: `1px solid ${c}`,
        borderActiveWarning: `1px solid ${a}`,
        borderFocusWarning: `1px solid ${c}`,
        boxShadowHoverWarning: "none",
        boxShadowActiveWarning: `0 0 8px 0 ${V(a, {
          alpha: 0.4
        })}`,
        boxShadowFocusWarning: `0 0 8px 0 ${V(a, {
          alpha: 0.4
        })}`,
        colorActiveWarning: V(a, {
          alpha: 0.1
        }),
        caretColorWarning: a,
        borderError: `1px solid ${u}`,
        borderHoverError: `1px solid ${d}`,
        borderActiveError: `1px solid ${u}`,
        borderFocusError: `1px solid ${d}`,
        boxShadowHoverError: "none",
        boxShadowActiveError: `0 0 8px 0 ${V(u, {
          alpha: 0.4
        })}`,
        boxShadowFocusError: `0 0 8px 0 ${V(u, {
          alpha: 0.4
        })}`,
        colorActiveError: V(u, {
          alpha: 0.1
        }),
        caretColorError: u,
        clearColor: h,
        clearColorHover: m,
        clearColorPressed: v
      });
    }
  };
  function wC(e) {
    const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: s, warningColor: a, warningColorHover: c, errorColor: u, errorColorHover: d, borderColor: f, iconColor: p, iconColorDisabled: h, clearColor: m, clearColorHover: v, clearColorPressed: x, placeholderColor: S, placeholderColorDisabled: T, fontSizeTiny: A, fontSizeSmall: B, fontSizeMedium: k, fontSizeLarge: P, heightTiny: w, heightSmall: y, heightMedium: O, heightLarge: L, fontWeight: I } = e;
    return Object.assign(Object.assign({}, _d), {
      fontSizeTiny: A,
      fontSizeSmall: B,
      fontSizeMedium: k,
      fontSizeLarge: P,
      heightTiny: w,
      heightSmall: y,
      heightMedium: O,
      heightLarge: L,
      borderRadius: t,
      fontWeight: I,
      textColor: o,
      textColorDisabled: r,
      placeholderColor: S,
      placeholderColorDisabled: T,
      color: n,
      colorDisabled: i,
      colorActive: n,
      border: `1px solid ${f}`,
      borderHover: `1px solid ${s}`,
      borderActive: `1px solid ${l}`,
      borderFocus: `1px solid ${s}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 0 2px ${V(l, {
        alpha: 0.2
      })}`,
      boxShadowFocus: `0 0 0 2px ${V(l, {
        alpha: 0.2
      })}`,
      caretColor: l,
      arrowColor: p,
      arrowColorDisabled: h,
      loadingColor: l,
      borderWarning: `1px solid ${a}`,
      borderHoverWarning: `1px solid ${c}`,
      borderActiveWarning: `1px solid ${a}`,
      borderFocusWarning: `1px solid ${c}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 0 2px ${V(a, {
        alpha: 0.2
      })}`,
      boxShadowFocusWarning: `0 0 0 2px ${V(a, {
        alpha: 0.2
      })}`,
      colorActiveWarning: n,
      caretColorWarning: a,
      borderError: `1px solid ${u}`,
      borderHoverError: `1px solid ${d}`,
      borderActiveError: `1px solid ${u}`,
      borderFocusError: `1px solid ${d}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 0 2px ${V(u, {
        alpha: 0.2
      })}`,
      boxShadowFocusError: `0 0 0 2px ${V(u, {
        alpha: 0.2
      })}`,
      colorActiveError: n,
      caretColorError: u,
      clearColor: m,
      clearColorHover: v,
      clearColorPressed: x
    });
  }
  let _C, It, EC, RC;
  PC = {
    name: "InternalSelection",
    common: Te,
    peers: {
      Popover: en
    },
    self: wC
  };
  TC = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  };
  _C = {
    name: "Alert",
    common: D,
    self(e) {
      const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: s, closeColorHover: a, closeColorPressed: c, closeIconColor: u, closeIconColorHover: d, closeIconColorPressed: f, infoColorSuppl: p, successColorSuppl: h, warningColorSuppl: m, errorColorSuppl: v, fontSize: x } = e;
      return Object.assign(Object.assign({}, TC), {
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
        closeColorPressed: c,
        closeIconColor: u,
        closeIconColorHover: d,
        closeIconColorPressed: f,
        borderInfo: `1px solid ${V(p, {
          alpha: 0.35
        })}`,
        colorInfo: V(p, {
          alpha: 0.25
        }),
        titleTextColorInfo: l,
        iconColorInfo: p,
        contentTextColorInfo: s,
        closeColorHoverInfo: a,
        closeColorPressedInfo: c,
        closeIconColorInfo: u,
        closeIconColorHoverInfo: d,
        closeIconColorPressedInfo: f,
        borderSuccess: `1px solid ${V(h, {
          alpha: 0.35
        })}`,
        colorSuccess: V(h, {
          alpha: 0.25
        }),
        titleTextColorSuccess: l,
        iconColorSuccess: h,
        contentTextColorSuccess: s,
        closeColorHoverSuccess: a,
        closeColorPressedSuccess: c,
        closeIconColorSuccess: u,
        closeIconColorHoverSuccess: d,
        closeIconColorPressedSuccess: f,
        borderWarning: `1px solid ${V(m, {
          alpha: 0.35
        })}`,
        colorWarning: V(m, {
          alpha: 0.25
        }),
        titleTextColorWarning: l,
        iconColorWarning: m,
        contentTextColorWarning: s,
        closeColorHoverWarning: a,
        closeColorPressedWarning: c,
        closeIconColorWarning: u,
        closeIconColorHoverWarning: d,
        closeIconColorPressedWarning: f,
        borderError: `1px solid ${V(v, {
          alpha: 0.35
        })}`,
        colorError: V(v, {
          alpha: 0.25
        }),
        titleTextColorError: l,
        iconColorError: v,
        contentTextColorError: s,
        closeColorHoverError: a,
        closeColorPressedError: c,
        closeIconColorError: u,
        closeIconColorHoverError: d,
        closeIconColorPressedError: f
      });
    }
  };
  ({ cubicBezierEaseInOut: It, cubicBezierEaseOut: EC, cubicBezierEaseIn: RC } = cr);
  AC = function({ overflow: e = "hidden", duration: t = ".3s", originalTransition: o = "", leavingDelay: r = "0s", foldPadding: n = false, enterToProps: i = void 0, leaveToProps: l = void 0, reverse: s = false } = {}) {
    const a = s ? "leave" : "enter", c = s ? "enter" : "leave";
    return [
      Q(`&.fade-in-height-expand-transition-${c}-from,
 &.fade-in-height-expand-transition-${a}-to`, Object.assign(Object.assign({}, i), {
        opacity: 1
      })),
      Q(`&.fade-in-height-expand-transition-${c}-to,
 &.fade-in-height-expand-transition-${a}-from`, Object.assign(Object.assign({}, l), {
        opacity: 0,
        marginTop: "0 !important",
        marginBottom: "0 !important",
        paddingTop: n ? "0 !important" : void 0,
        paddingBottom: n ? "0 !important" : void 0
      })),
      Q(`&.fade-in-height-expand-transition-${c}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${It} ${r},
 opacity ${t} ${EC} ${r},
 margin-top ${t} ${It} ${r},
 margin-bottom ${t} ${It} ${r},
 padding-top ${t} ${It} ${r},
 padding-bottom ${t} ${It} ${r}
 ${o ? `,${o}` : ""}
 `),
      Q(`&.fade-in-height-expand-transition-${a}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${It},
 opacity ${t} ${RC},
 margin-top ${t} ${It},
 margin-bottom ${t} ${It},
 padding-top ${t} ${It},
 padding-bottom ${t} ${It}
 ${o ? `,${o}` : ""}
 `)
    ];
  };
  const HC = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  };
  function IC(e) {
    const { borderRadius: t, railColor: o, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, HC), {
      borderRadius: t,
      railColor: o,
      railColorActive: r,
      linkColor: V(r, {
        alpha: 0.15
      }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }
  const $C = {
    name: "Anchor",
    common: D,
    self: IC
  }, Ed = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  };
  function OC(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: s, warningColor: a, warningColorHover: c, errorColor: u, errorColorHover: d, borderRadius: f, lineHeight: p, fontSizeTiny: h, fontSizeSmall: m, fontSizeMedium: v, fontSizeLarge: x, heightTiny: S, heightSmall: T, heightMedium: A, heightLarge: B, clearColor: k, clearColorHover: P, clearColorPressed: w, placeholderColor: y, placeholderColorDisabled: O, iconColor: L, iconColorDisabled: I, iconColorHover: q, iconColorPressed: se, fontWeight: de } = e;
    return Object.assign(Object.assign({}, Ed), {
      fontWeight: de,
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: S,
      heightSmall: T,
      heightMedium: A,
      heightLarge: B,
      fontSizeTiny: h,
      fontSizeSmall: m,
      fontSizeMedium: v,
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
      placeholderColor: y,
      placeholderColorDisabled: O,
      color: l,
      colorDisabled: s,
      colorFocus: V(n, {
        alpha: 0.1
      }),
      groupLabelBorder: "1px solid #0000",
      border: "1px solid #0000",
      borderHover: `1px solid ${i}`,
      borderDisabled: "1px solid #0000",
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 8px 0 ${V(n, {
        alpha: 0.3
      })}`,
      loadingColor: n,
      loadingColorWarning: a,
      borderWarning: `1px solid ${a}`,
      borderHoverWarning: `1px solid ${c}`,
      colorFocusWarning: V(a, {
        alpha: 0.1
      }),
      borderFocusWarning: `1px solid ${c}`,
      boxShadowFocusWarning: `0 0 8px 0 ${V(a, {
        alpha: 0.3
      })}`,
      caretColorWarning: a,
      loadingColorError: u,
      borderError: `1px solid ${u}`,
      borderHoverError: `1px solid ${d}`,
      colorFocusError: V(u, {
        alpha: 0.1
      }),
      borderFocusError: `1px solid ${d}`,
      boxShadowFocusError: `0 0 8px 0 ${V(u, {
        alpha: 0.3
      })}`,
      caretColorError: u,
      clearColor: k,
      clearColorHover: P,
      clearColorPressed: w,
      iconColor: L,
      iconColorDisabled: I,
      iconColorHover: q,
      iconColorPressed: se,
      suffixTextColor: t
    });
  }
  const vt = {
    name: "Input",
    common: D,
    peers: {
      Scrollbar: rt
    },
    self: OC
  };
  function MC(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: s, borderColor: a, warningColor: c, warningColorHover: u, errorColor: d, errorColorHover: f, borderRadius: p, lineHeight: h, fontSizeTiny: m, fontSizeSmall: v, fontSizeMedium: x, fontSizeLarge: S, heightTiny: T, heightSmall: A, heightMedium: B, heightLarge: k, actionColor: P, clearColor: w, clearColorHover: y, clearColorPressed: O, placeholderColor: L, placeholderColorDisabled: I, iconColor: q, iconColorDisabled: se, iconColorHover: de, iconColorPressed: ne, fontWeight: Y } = e;
    return Object.assign(Object.assign({}, Ed), {
      fontWeight: Y,
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: T,
      heightSmall: A,
      heightMedium: B,
      heightLarge: k,
      fontSizeTiny: m,
      fontSizeSmall: v,
      fontSizeMedium: x,
      fontSizeLarge: S,
      lineHeight: h,
      lineHeightTextarea: h,
      borderRadius: p,
      iconSize: "16px",
      groupLabelColor: P,
      groupLabelTextColor: t,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      caretColor: n,
      placeholderColor: L,
      placeholderColorDisabled: I,
      color: l,
      colorDisabled: s,
      colorFocus: l,
      groupLabelBorder: `1px solid ${a}`,
      border: `1px solid ${a}`,
      borderHover: `1px solid ${i}`,
      borderDisabled: `1px solid ${a}`,
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 0 2px ${V(n, {
        alpha: 0.2
      })}`,
      loadingColor: n,
      loadingColorWarning: c,
      borderWarning: `1px solid ${c}`,
      borderHoverWarning: `1px solid ${u}`,
      colorFocusWarning: l,
      borderFocusWarning: `1px solid ${u}`,
      boxShadowFocusWarning: `0 0 0 2px ${V(c, {
        alpha: 0.2
      })}`,
      caretColorWarning: c,
      loadingColorError: d,
      borderError: `1px solid ${d}`,
      borderHoverError: `1px solid ${f}`,
      colorFocusError: l,
      borderFocusError: `1px solid ${f}`,
      boxShadowFocusError: `0 0 0 2px ${V(d, {
        alpha: 0.2
      })}`,
      caretColorError: d,
      clearColor: w,
      clearColorHover: y,
      clearColorPressed: O,
      iconColor: q,
      iconColorDisabled: se,
      iconColorHover: de,
      iconColorPressed: ne,
      suffixTextColor: t
    });
  }
  jl = {
    name: "Input",
    common: Te,
    peers: {
      Scrollbar: io
    },
    self: MC
  };
  function zC(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  const DC = {
    name: "AutoComplete",
    common: D,
    peers: {
      InternalSelectMenu: Zr,
      Input: vt
    },
    self: zC
  };
  function BC(e) {
    const { borderRadius: t, avatarColor: o, cardColor: r, fontSize: n, heightTiny: i, heightSmall: l, heightMedium: s, heightLarge: a, heightHuge: c, modalColor: u, popoverColor: d } = e;
    return {
      borderRadius: t,
      fontSize: n,
      border: `2px solid ${r}`,
      heightTiny: i,
      heightSmall: l,
      heightMedium: s,
      heightLarge: a,
      heightHuge: c,
      color: X(r, o),
      colorModal: X(u, o),
      colorPopover: X(d, o)
    };
  }
  const Rd = {
    name: "Avatar",
    common: D,
    self: BC
  };
  function FC() {
    return {
      gap: "-12px"
    };
  }
  const LC = {
    name: "AvatarGroup",
    common: D,
    peers: {
      Avatar: Rd
    },
    self: FC
  }, kC = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, jC = {
    name: "BackTop",
    common: D,
    self(e) {
      const { popoverColor: t, textColor2: o, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, kC), {
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
  }, WC = {
    name: "Badge",
    common: D,
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
  }, NC = {
    fontWeightActive: "400"
  };
  function VC(e) {
    const { fontSize: t, textColor3: o, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, NC), {
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
  const GC = {
    name: "Breadcrumb",
    common: D,
    self: VC
  }, UC = {
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
  function Ad(e) {
    const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: s, fontSizeMedium: a, fontSizeLarge: c, opacityDisabled: u, textColor2: d, textColor3: f, primaryColorHover: p, primaryColorPressed: h, borderColor: m, primaryColor: v, baseColor: x, infoColor: S, infoColorHover: T, infoColorPressed: A, successColor: B, successColorHover: k, successColorPressed: P, warningColor: w, warningColorHover: y, warningColorPressed: O, errorColor: L, errorColorHover: I, errorColorPressed: q, fontWeight: se, buttonColor2: de, buttonColor2Hover: ne, buttonColor2Pressed: Y, fontWeightStrong: ae } = e;
    return Object.assign(Object.assign({}, UC), {
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
      fontSizeLarge: c,
      opacityDisabled: u,
      colorOpacitySecondary: "0.16",
      colorOpacitySecondaryHover: "0.22",
      colorOpacitySecondaryPressed: "0.28",
      colorSecondary: de,
      colorSecondaryHover: ne,
      colorSecondaryPressed: Y,
      colorTertiary: de,
      colorTertiaryHover: ne,
      colorTertiaryPressed: Y,
      colorQuaternary: "#0000",
      colorQuaternaryHover: ne,
      colorQuaternaryPressed: Y,
      color: "#0000",
      colorHover: "#0000",
      colorPressed: "#0000",
      colorFocus: "#0000",
      colorDisabled: "#0000",
      textColor: d,
      textColorTertiary: f,
      textColorHover: p,
      textColorPressed: h,
      textColorFocus: p,
      textColorDisabled: d,
      textColorText: d,
      textColorTextHover: p,
      textColorTextPressed: h,
      textColorTextFocus: p,
      textColorTextDisabled: d,
      textColorGhost: d,
      textColorGhostHover: p,
      textColorGhostPressed: h,
      textColorGhostFocus: p,
      textColorGhostDisabled: d,
      border: `1px solid ${m}`,
      borderHover: `1px solid ${p}`,
      borderPressed: `1px solid ${h}`,
      borderFocus: `1px solid ${p}`,
      borderDisabled: `1px solid ${m}`,
      rippleColor: v,
      colorPrimary: v,
      colorHoverPrimary: p,
      colorPressedPrimary: h,
      colorFocusPrimary: p,
      colorDisabledPrimary: v,
      textColorPrimary: x,
      textColorHoverPrimary: x,
      textColorPressedPrimary: x,
      textColorFocusPrimary: x,
      textColorDisabledPrimary: x,
      textColorTextPrimary: v,
      textColorTextHoverPrimary: p,
      textColorTextPressedPrimary: h,
      textColorTextFocusPrimary: p,
      textColorTextDisabledPrimary: d,
      textColorGhostPrimary: v,
      textColorGhostHoverPrimary: p,
      textColorGhostPressedPrimary: h,
      textColorGhostFocusPrimary: p,
      textColorGhostDisabledPrimary: v,
      borderPrimary: `1px solid ${v}`,
      borderHoverPrimary: `1px solid ${p}`,
      borderPressedPrimary: `1px solid ${h}`,
      borderFocusPrimary: `1px solid ${p}`,
      borderDisabledPrimary: `1px solid ${v}`,
      rippleColorPrimary: v,
      colorInfo: S,
      colorHoverInfo: T,
      colorPressedInfo: A,
      colorFocusInfo: T,
      colorDisabledInfo: S,
      textColorInfo: x,
      textColorHoverInfo: x,
      textColorPressedInfo: x,
      textColorFocusInfo: x,
      textColorDisabledInfo: x,
      textColorTextInfo: S,
      textColorTextHoverInfo: T,
      textColorTextPressedInfo: A,
      textColorTextFocusInfo: T,
      textColorTextDisabledInfo: d,
      textColorGhostInfo: S,
      textColorGhostHoverInfo: T,
      textColorGhostPressedInfo: A,
      textColorGhostFocusInfo: T,
      textColorGhostDisabledInfo: S,
      borderInfo: `1px solid ${S}`,
      borderHoverInfo: `1px solid ${T}`,
      borderPressedInfo: `1px solid ${A}`,
      borderFocusInfo: `1px solid ${T}`,
      borderDisabledInfo: `1px solid ${S}`,
      rippleColorInfo: S,
      colorSuccess: B,
      colorHoverSuccess: k,
      colorPressedSuccess: P,
      colorFocusSuccess: k,
      colorDisabledSuccess: B,
      textColorSuccess: x,
      textColorHoverSuccess: x,
      textColorPressedSuccess: x,
      textColorFocusSuccess: x,
      textColorDisabledSuccess: x,
      textColorTextSuccess: B,
      textColorTextHoverSuccess: k,
      textColorTextPressedSuccess: P,
      textColorTextFocusSuccess: k,
      textColorTextDisabledSuccess: d,
      textColorGhostSuccess: B,
      textColorGhostHoverSuccess: k,
      textColorGhostPressedSuccess: P,
      textColorGhostFocusSuccess: k,
      textColorGhostDisabledSuccess: B,
      borderSuccess: `1px solid ${B}`,
      borderHoverSuccess: `1px solid ${k}`,
      borderPressedSuccess: `1px solid ${P}`,
      borderFocusSuccess: `1px solid ${k}`,
      borderDisabledSuccess: `1px solid ${B}`,
      rippleColorSuccess: B,
      colorWarning: w,
      colorHoverWarning: y,
      colorPressedWarning: O,
      colorFocusWarning: y,
      colorDisabledWarning: w,
      textColorWarning: x,
      textColorHoverWarning: x,
      textColorPressedWarning: x,
      textColorFocusWarning: x,
      textColorDisabledWarning: x,
      textColorTextWarning: w,
      textColorTextHoverWarning: y,
      textColorTextPressedWarning: O,
      textColorTextFocusWarning: y,
      textColorTextDisabledWarning: d,
      textColorGhostWarning: w,
      textColorGhostHoverWarning: y,
      textColorGhostPressedWarning: O,
      textColorGhostFocusWarning: y,
      textColorGhostDisabledWarning: w,
      borderWarning: `1px solid ${w}`,
      borderHoverWarning: `1px solid ${y}`,
      borderPressedWarning: `1px solid ${O}`,
      borderFocusWarning: `1px solid ${y}`,
      borderDisabledWarning: `1px solid ${w}`,
      rippleColorWarning: w,
      colorError: L,
      colorHoverError: I,
      colorPressedError: q,
      colorFocusError: I,
      colorDisabledError: L,
      textColorError: x,
      textColorHoverError: x,
      textColorPressedError: x,
      textColorFocusError: x,
      textColorDisabledError: x,
      textColorTextError: L,
      textColorTextHoverError: I,
      textColorTextPressedError: q,
      textColorTextFocusError: I,
      textColorTextDisabledError: d,
      textColorGhostError: L,
      textColorGhostHoverError: I,
      textColorGhostPressedError: q,
      textColorGhostFocusError: I,
      textColorGhostDisabledError: L,
      borderError: `1px solid ${L}`,
      borderHoverError: `1px solid ${I}`,
      borderPressedError: `1px solid ${q}`,
      borderFocusError: `1px solid ${I}`,
      borderDisabledError: `1px solid ${L}`,
      rippleColorError: L,
      waveOpacity: "0.6",
      fontWeight: se,
      fontWeightStrong: ae
    });
  }
  let pt, KC;
  si = {
    name: "Button",
    common: Te,
    self: Ad
  };
  pt = {
    name: "Button",
    common: D,
    self(e) {
      const t = Ad(e);
      return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
    }
  };
  KC = {
    titleFontSize: "22px"
  };
  function qC(e) {
    const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: s, fontWeightStrong: a, primaryColor: c, baseColor: u, hoverColor: d, cardColor: f, modalColor: p, popoverColor: h } = e;
    return Object.assign(Object.assign({}, KC), {
      borderRadius: t,
      borderColor: X(f, s),
      borderColorModal: X(p, s),
      borderColorPopover: X(h, s),
      textColor: n,
      titleFontWeight: a,
      titleTextColor: i,
      dayTextColor: l,
      fontSize: o,
      lineHeight: r,
      dateColorCurrent: c,
      dateTextColorCurrent: u,
      cellColorHover: X(f, d),
      cellColorHoverModal: X(p, d),
      cellColorHoverPopover: X(h, d),
      cellColor: f,
      cellColorModal: p,
      cellColorPopover: h,
      barColor: c
    });
  }
  const XC = {
    name: "Calendar",
    common: D,
    peers: {
      Button: pt
    },
    self: qC
  }, YC = {
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
  function Hd(e) {
    const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: s, dividerColor: a, fontWeightStrong: c, closeIconColor: u, closeIconColorHover: d, closeIconColorPressed: f, closeColorHover: p, closeColorPressed: h, modalColor: m, boxShadow1: v, popoverColor: x, actionColor: S } = e;
    return Object.assign(Object.assign({}, YC), {
      lineHeight: r,
      color: i,
      colorModal: m,
      colorPopover: x,
      colorTarget: t,
      colorEmbedded: S,
      colorEmbeddedModal: S,
      colorEmbeddedPopover: S,
      textColor: l,
      titleTextColor: s,
      borderColor: a,
      actionColor: S,
      titleFontWeight: c,
      closeColorHover: p,
      closeColorPressed: h,
      closeBorderRadius: o,
      closeIconColor: u,
      closeIconColorHover: d,
      closeIconColorPressed: f,
      fontSizeSmall: n,
      fontSizeMedium: n,
      fontSizeLarge: n,
      fontSizeHuge: n,
      boxShadow: v,
      borderRadius: o
    });
  }
  let Id;
  JC = {
    name: "Card",
    common: Te,
    self: Hd
  };
  Id = {
    name: "Card",
    common: D,
    self(e) {
      const t = Hd(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
      return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
    }
  };
  function QC() {
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
  const ZC = {
    name: "Carousel",
    common: D,
    self: QC
  }, e1 = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  };
  function $d(e) {
    const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: s, primaryColor: a, textColor2: c, fontSizeSmall: u, fontSizeMedium: d, fontSizeLarge: f, borderRadiusSmall: p, lineHeight: h } = e;
    return Object.assign(Object.assign({}, e1), {
      labelLineHeight: h,
      fontSizeSmall: u,
      fontSizeMedium: d,
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
      boxShadowFocus: `0 0 0 2px ${V(a, {
        alpha: 0.3
      })}`,
      textColor: c,
      textColorDisabled: l
    });
  }
  let ur;
  t1 = {
    name: "Checkbox",
    common: Te,
    self: $d
  };
  ur = {
    name: "Checkbox",
    common: D,
    self(e) {
      const { cardColor: t } = e, o = $d(e);
      return o.color = "#0000", o.checkMarkColor = t, o;
    }
  };
  function o1(e) {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n, textColor3: i, primaryColor: l, textColorDisabled: s, dividerColor: a, hoverColor: c, fontSizeMedium: u, heightMedium: d } = e;
    return {
      menuBorderRadius: t,
      menuColor: r,
      menuBoxShadow: o,
      menuDividerColor: a,
      menuHeight: "calc(var(--n-option-height) * 6.6)",
      optionArrowColor: i,
      optionHeight: d,
      optionFontSize: u,
      optionColorHover: c,
      optionTextColor: n,
      optionTextColorActive: l,
      optionTextColorDisabled: s,
      optionCheckMarkColor: l,
      loadingColor: l,
      columnWidth: "180px"
    };
  }
  const r1 = {
    name: "Cascader",
    common: D,
    peers: {
      InternalSelectMenu: Zr,
      InternalSelection: kl,
      Scrollbar: rt,
      Checkbox: ur,
      Empty: Ll
    },
    self: o1
  }, Od = {
    name: "Code",
    common: D,
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
  function n1(e) {
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
  const i1 = {
    name: "Collapse",
    common: D,
    self: n1
  };
  function l1(e) {
    const { cubicBezierEaseInOut: t } = e;
    return {
      bezier: t
    };
  }
  const s1 = {
    name: "CollapseTransition",
    common: D,
    self: l1
  };
  function a1(e) {
    const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: l, heightSmall: s, heightMedium: a, heightLarge: c, fontSizeSmall: u, fontSizeMedium: d, fontSizeLarge: f, dividerColor: p } = e;
    return {
      panelFontSize: t,
      boxShadow: o,
      color: r,
      textColor: n,
      borderRadius: i,
      border: `1px solid ${l}`,
      heightSmall: s,
      heightMedium: a,
      heightLarge: c,
      fontSizeSmall: u,
      fontSizeMedium: d,
      fontSizeLarge: f,
      dividerColor: p
    };
  }
  const c1 = {
    name: "ColorPicker",
    common: D,
    peers: {
      Input: vt,
      Button: pt
    },
    self: a1
  }, u1 = {
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
      validator: () => (Vb("config-provider", "`as` is deprecated, please use `tag` instead."), true),
      default: void 0
    }
  }, d1 = Le({
    name: "ConfigProvider",
    alias: [
      "App"
    ],
    props: u1,
    setup(e) {
      const t = Ae(oo, null), o = ie(() => {
        const { theme: m } = e;
        if (m === null) return;
        const v = t == null ? void 0 : t.mergedThemeRef.value;
        return m === void 0 ? v : v === void 0 ? m : Object.assign({}, v, m);
      }), r = ie(() => {
        const { themeOverrides: m } = e;
        if (m !== null) {
          if (m === void 0) return t == null ? void 0 : t.mergedThemeOverridesRef.value;
          {
            const v = t == null ? void 0 : t.mergedThemeOverridesRef.value;
            return v === void 0 ? m : xr({}, v, m);
          }
        }
      }), n = Zs(() => {
        const { namespace: m } = e;
        return m === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : m;
      }), i = Zs(() => {
        const { bordered: m } = e;
        return m === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : m;
      }), l = ie(() => {
        const { icons: m } = e;
        return m === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : m;
      }), s = ie(() => {
        const { componentOptions: m } = e;
        return m !== void 0 ? m : t == null ? void 0 : t.mergedComponentPropsRef.value;
      }), a = ie(() => {
        const { clsPrefix: m } = e;
        return m !== void 0 ? m : t ? t.mergedClsPrefixRef.value : $n;
      }), c = ie(() => {
        var m;
        const { rtl: v } = e;
        if (v === void 0) return t == null ? void 0 : t.mergedRtlRef.value;
        const x = {};
        for (const S of v) x[S.name] = Or(S), (m = S.peers) === null || m === void 0 || m.forEach((T) => {
          T.name in x || (x[T.name] = Or(T));
        });
        return x;
      }), u = ie(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), d = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), f = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), p = e.styleMountTarget || (t == null ? void 0 : t.styleMountTarget), h = ie(() => {
        const { value: m } = o, { value: v } = r, x = v && Object.keys(v).length !== 0, S = m == null ? void 0 : m.name;
        return S ? x ? `${S}-${jr(JSON.stringify(r.value))}` : S : x ? jr(JSON.stringify(r.value)) : "";
      });
      return Jt(oo, {
        mergedThemeHashRef: h,
        mergedBreakpointsRef: u,
        mergedRtlRef: c,
        mergedIconsRef: l,
        mergedComponentPropsRef: s,
        mergedBorderedRef: i,
        mergedNamespaceRef: n,
        mergedClsPrefixRef: a,
        mergedLocaleRef: ie(() => {
          const { locale: m } = e;
          if (m !== null) return m === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : m;
        }),
        mergedDateLocaleRef: ie(() => {
          const { dateLocale: m } = e;
          if (m !== null) return m === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : m;
        }),
        mergedHljsRef: ie(() => {
          const { hljs: m } = e;
          return m === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : m;
        }),
        mergedKatexRef: ie(() => {
          const { katex: m } = e;
          return m === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : m;
        }),
        mergedThemeRef: o,
        mergedThemeOverridesRef: r,
        inlineThemeDisabled: d || false,
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
      return this.abstract ? (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o) : z(this.as || this.tag, {
        class: `${this.mergedClsPrefix || $n}-config-provider`
      }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
    }
  }), Md = {
    name: "Popselect",
    common: D,
    peers: {
      Popover: Wo,
      InternalSelectMenu: Zr
    }
  };
  function f1(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  p1 = {
    name: "Popselect",
    common: Te,
    peers: {
      Popover: en,
      InternalSelectMenu: wd
    },
    self: f1
  };
  function zd(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  let Dd, g1;
  h1 = {
    name: "Select",
    common: Te,
    peers: {
      InternalSelection: PC,
      InternalSelectMenu: wd
    },
    self: zd
  };
  Dd = {
    name: "Select",
    common: D,
    peers: {
      InternalSelection: kl,
      InternalSelectMenu: Zr
    },
    self: zd
  };
  g1 = {
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
  function Bd(e) {
    const { textColor2: t, primaryColor: o, primaryColorHover: r, primaryColorPressed: n, inputColorDisabled: i, textColorDisabled: l, borderColor: s, borderRadius: a, fontSizeTiny: c, fontSizeSmall: u, fontSizeMedium: d, heightTiny: f, heightSmall: p, heightMedium: h } = e;
    return Object.assign(Object.assign({}, g1), {
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
      itemFontSizeSmall: c,
      itemFontSizeMedium: u,
      itemFontSizeLarge: d,
      jumperFontSizeSmall: c,
      jumperFontSizeMedium: u,
      jumperFontSizeLarge: d,
      jumperTextColor: t,
      jumperTextColorDisabled: l
    });
  }
  let Fd, b1;
  m1 = {
    name: "Pagination",
    common: Te,
    peers: {
      Select: h1,
      Input: jl,
      Popselect: p1
    },
    self: Bd
  };
  Fd = {
    name: "Pagination",
    common: D,
    peers: {
      Select: Dd,
      Input: vt,
      Popselect: Md
    },
    self(e) {
      const { primaryColor: t, opacity3: o } = e, r = V(t, {
        alpha: Number(o)
      }), n = Bd(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  };
  b1 = {
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
  function Ld(e) {
    const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: s, fontSizeSmall: a, fontSizeMedium: c, fontSizeLarge: u, fontSizeHuge: d, heightSmall: f, heightMedium: p, heightLarge: h, heightHuge: m, textColor3: v, opacityDisabled: x } = e;
    return Object.assign(Object.assign({}, b1), {
      optionHeightSmall: f,
      optionHeightMedium: p,
      optionHeightLarge: h,
      optionHeightHuge: m,
      borderRadius: s,
      fontSizeSmall: a,
      fontSizeMedium: c,
      fontSizeLarge: u,
      fontSizeHuge: d,
      optionTextColor: o,
      optionTextColorHover: o,
      optionTextColorActive: t,
      optionTextColorChildActive: t,
      color: i,
      dividerColor: r,
      suffixColor: o,
      prefixColor: o,
      optionColorHover: n,
      optionColorActive: V(t, {
        alpha: 0.1
      }),
      groupHeaderTextColor: v,
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
  let Wl, kd, ai;
  v1 = {
    name: "Dropdown",
    common: Te,
    peers: {
      Popover: en
    },
    self: Ld
  };
  Wl = {
    name: "Dropdown",
    common: D,
    peers: {
      Popover: Wo
    },
    self(e) {
      const { primaryColorSuppl: t, primaryColor: o, popoverColor: r } = e, n = Ld(e);
      return n.colorInverted = r, n.optionColorActive = V(o, {
        alpha: 0.15
      }), n.optionColorActiveInverted = t, n.optionColorHoverInverted = t, n;
    }
  };
  kd = {
    padding: "8px 14px"
  };
  ai = {
    name: "Tooltip",
    common: D,
    peers: {
      Popover: Wo
    },
    self(e) {
      const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, kd), {
        borderRadius: t,
        boxShadow: o,
        color: r,
        textColor: n
      });
    }
  };
  function x1(e) {
    const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
    return Object.assign(Object.assign({}, kd), {
      borderRadius: t,
      boxShadow: o,
      color: X(r, "rgba(0, 0, 0, .85)"),
      textColor: r
    });
  }
  let jd, Wd, Nd;
  C1 = {
    name: "Tooltip",
    common: Te,
    peers: {
      Popover: en
    },
    self: x1
  };
  jd = {
    name: "Ellipsis",
    common: D,
    peers: {
      Tooltip: ai
    }
  };
  S1 = {
    name: "Ellipsis",
    common: Te,
    peers: {
      Tooltip: C1
    }
  };
  Wd = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  };
  Nd = {
    name: "Radio",
    common: D,
    self(e) {
      const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: s, borderRadius: a, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: d, heightSmall: f, heightMedium: p, heightLarge: h, lineHeight: m } = e;
      return Object.assign(Object.assign({}, Wd), {
        labelLineHeight: m,
        buttonHeightSmall: f,
        buttonHeightMedium: p,
        buttonHeightLarge: h,
        fontSizeSmall: c,
        fontSizeMedium: u,
        fontSizeLarge: d,
        boxShadow: `inset 0 0 0 1px ${t}`,
        boxShadowActive: `inset 0 0 0 1px ${o}`,
        boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${V(o, {
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
        buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${V(o, {
          alpha: 0.3
        })}`,
        buttonBoxShadowHover: `inset 0 0 0 1px ${o}`,
        buttonBoxShadow: "inset 0 0 0 1px #0000",
        buttonBorderRadius: a
      });
    }
  };
  function y1(e) {
    const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: s, borderRadius: a, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: d, heightSmall: f, heightMedium: p, heightLarge: h, lineHeight: m } = e;
    return Object.assign(Object.assign({}, Wd), {
      labelLineHeight: m,
      buttonHeightSmall: f,
      buttonHeightMedium: p,
      buttonHeightLarge: h,
      fontSizeSmall: c,
      fontSizeMedium: u,
      fontSizeLarge: d,
      boxShadow: `inset 0 0 0 1px ${t}`,
      boxShadowActive: `inset 0 0 0 1px ${o}`,
      boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${V(o, {
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
      buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${V(o, {
        alpha: 0.3
      })}`,
      buttonBoxShadowHover: "inset 0 0 0 1px #0000",
      buttonBoxShadow: "inset 0 0 0 1px #0000",
      buttonBorderRadius: a
    });
  }
  let P1;
  w1 = {
    name: "Radio",
    common: Te,
    self: y1
  };
  P1 = {
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
  function Vd(e) {
    const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: s, iconColor: a, primaryColor: c, fontWeightStrong: u, borderRadius: d, lineHeight: f, fontSizeSmall: p, fontSizeMedium: h, fontSizeLarge: m, dividerColor: v, heightSmall: x, opacityDisabled: S, tableColorStriped: T } = e;
    return Object.assign(Object.assign({}, P1), {
      actionDividerColor: v,
      lineHeight: f,
      borderRadius: d,
      fontSizeSmall: p,
      fontSizeMedium: h,
      fontSizeLarge: m,
      borderColor: X(t, v),
      tdColorHover: X(t, s),
      tdColorSorting: X(t, s),
      tdColorStriped: X(t, T),
      thColor: X(t, l),
      thColorHover: X(X(t, l), s),
      thColorSorting: X(X(t, l), s),
      tdColor: t,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: u,
      thButtonColorHover: s,
      thIconColor: a,
      thIconColorActive: c,
      borderColorModal: X(o, v),
      tdColorHoverModal: X(o, s),
      tdColorSortingModal: X(o, s),
      tdColorStripedModal: X(o, T),
      thColorModal: X(o, l),
      thColorHoverModal: X(X(o, l), s),
      thColorSortingModal: X(X(o, l), s),
      tdColorModal: o,
      borderColorPopover: X(r, v),
      tdColorHoverPopover: X(r, s),
      tdColorSortingPopover: X(r, s),
      tdColorStripedPopover: X(r, T),
      thColorPopover: X(r, l),
      thColorHoverPopover: X(X(r, l), s),
      thColorSortingPopover: X(X(r, l), s),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      loadingColor: c,
      loadingSize: x,
      opacityLoading: S
    });
  }
  let T1;
  iw = {
    name: "DataTable",
    common: Te,
    peers: {
      Button: si,
      Checkbox: t1,
      Radio: w1,
      Pagination: m1,
      Scrollbar: io,
      Empty: Ll,
      Popover: en,
      Ellipsis: S1,
      Dropdown: v1
    },
    self: Vd
  };
  T1 = {
    name: "DataTable",
    common: D,
    peers: {
      Button: pt,
      Checkbox: ur,
      Radio: Nd,
      Pagination: Fd,
      Scrollbar: rt,
      Empty: jo,
      Popover: Wo,
      Ellipsis: jd,
      Dropdown: Wl
    },
    self(e) {
      const t = Vd(e);
      return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
    }
  };
  function Gd(e) {
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
  let _1, E1;
  lw = {
    common: Te,
    self: Gd
  };
  _1 = {
    name: "Icon",
    common: D,
    self: Gd
  };
  E1 = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  };
  function Ud(e) {
    const { popoverColor: t, textColor2: o, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: s, borderRadius: a, iconColor: c, iconColorDisabled: u } = e;
    return Object.assign(Object.assign({}, E1), {
      panelColor: t,
      panelBoxShadow: s,
      panelDividerColor: i,
      itemTextColor: o,
      itemTextColorActive: r,
      itemColorHover: n,
      itemOpacityDisabled: l,
      itemBorderRadius: a,
      borderRadius: a,
      iconColor: c,
      iconColorDisabled: u
    });
  }
  let Kd, A1;
  R1 = {
    name: "TimePicker",
    common: Te,
    peers: {
      Scrollbar: io,
      Button: si,
      Input: jl
    },
    self: Ud
  };
  Kd = {
    name: "TimePicker",
    common: D,
    peers: {
      Scrollbar: rt,
      Button: pt,
      Input: vt
    },
    self: Ud
  };
  A1 = {
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
  function qd(e) {
    const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: s, iconColor: a, iconColorDisabled: c, textColor1: u, dividerColor: d, boxShadow2: f, borderRadius: p, fontWeightStrong: h } = e;
    return Object.assign(Object.assign({}, A1), {
      itemFontSize: o,
      calendarDaysFontSize: o,
      calendarTitleFontSize: o,
      itemTextColor: r,
      itemTextColorDisabled: n,
      itemTextColorActive: i,
      itemTextColorCurrent: l,
      itemColorIncluded: V(l, {
        alpha: 0.1
      }),
      itemColorHover: t,
      itemColorDisabled: t,
      itemColorActive: l,
      itemBorderRadius: s,
      panelColor: i,
      panelTextColor: r,
      arrowColor: a,
      calendarTitleTextColor: u,
      calendarTitleColorHover: t,
      calendarDaysTextColor: r,
      panelHeaderDividerColor: d,
      calendarDaysDividerColor: d,
      calendarDividerColor: d,
      panelActionDividerColor: d,
      panelBoxShadow: f,
      panelBorderRadius: p,
      calendarTitleFontWeight: h,
      scrollItemBorderRadius: p,
      iconColor: a,
      iconColorDisabled: c
    });
  }
  let H1, I1;
  sw = {
    name: "DatePicker",
    common: Te,
    peers: {
      Input: jl,
      Button: si,
      TimePicker: R1,
      Scrollbar: io
    },
    self: qd
  };
  H1 = {
    name: "DatePicker",
    common: D,
    peers: {
      Input: vt,
      Button: pt,
      TimePicker: Kd,
      Scrollbar: rt
    },
    self(e) {
      const { popoverColor: t, hoverColor: o, primaryColor: r } = e, n = qd(e);
      return n.itemColorDisabled = X(t, o), n.itemColorIncluded = V(r, {
        alpha: 0.15
      }), n.itemColorHover = X(t, o), n;
    }
  };
  I1 = {
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
  function $1(e) {
    const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: s, borderRadius: a, fontWeightStrong: c, lineHeight: u, fontSizeSmall: d, fontSizeMedium: f, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, I1), {
      lineHeight: u,
      fontSizeSmall: d,
      fontSizeMedium: f,
      fontSizeLarge: p,
      titleTextColor: r,
      thColor: X(n, t),
      thColorModal: X(i, t),
      thColorPopover: X(l, t),
      thTextColor: r,
      thFontWeight: c,
      tdTextColor: o,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: l,
      borderColor: X(n, s),
      borderColorModal: X(i, s),
      borderColorPopover: X(l, s),
      borderRadius: a
    });
  }
  const O1 = {
    name: "Descriptions",
    common: D,
    self: $1
  }, M1 = {
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
  function Xd(e) {
    const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: s, closeColorPressed: a, infoColor: c, successColor: u, warningColor: d, errorColor: f, primaryColor: p, dividerColor: h, borderRadius: m, fontWeightStrong: v, lineHeight: x, fontSize: S } = e;
    return Object.assign(Object.assign({}, M1), {
      fontSize: S,
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
      closeBorderRadius: m,
      iconColor: p,
      iconColorInfo: c,
      iconColorSuccess: u,
      iconColorWarning: d,
      iconColorError: f,
      borderRadius: m,
      titleFontWeight: v
    });
  }
  let Yd;
  z1 = {
    name: "Dialog",
    common: Te,
    peers: {
      Button: si
    },
    self: Xd
  };
  Yd = {
    name: "Dialog",
    common: D,
    peers: {
      Button: pt
    },
    self: Xd
  };
  function Jd(e) {
    const { modalColor: t, textColor2: o, boxShadow3: r } = e;
    return {
      color: t,
      textColor: o,
      boxShadow: r
    };
  }
  let D1, B1, Qd, L1;
  aw = {
    name: "Modal",
    common: Te,
    peers: {
      Scrollbar: io,
      Dialog: z1,
      Card: JC
    },
    self: Jd
  };
  D1 = {
    name: "Modal",
    common: D,
    peers: {
      Scrollbar: rt,
      Dialog: Yd,
      Card: Id
    },
    self: Jd
  };
  B1 = {
    name: "LoadingBar",
    common: D,
    self(e) {
      const { primaryColor: t } = e;
      return {
        colorError: "red",
        colorLoading: t,
        height: "2px"
      };
    }
  };
  F1 = "n-message-api";
  Qd = "n-message-provider";
  L1 = {
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
  function Zd(e) {
    const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: s, warningColor: a, popoverColor: c, boxShadow2: u, primaryColor: d, lineHeight: f, borderRadius: p, closeColorHover: h, closeColorPressed: m } = e;
    return Object.assign(Object.assign({}, L1), {
      closeBorderRadius: p,
      textColor: t,
      textColorInfo: t,
      textColorSuccess: t,
      textColorError: t,
      textColorWarning: t,
      textColorLoading: t,
      color: c,
      colorInfo: c,
      colorSuccess: c,
      colorError: c,
      colorWarning: c,
      colorLoading: c,
      boxShadow: u,
      boxShadowInfo: u,
      boxShadowSuccess: u,
      boxShadowError: u,
      boxShadowWarning: u,
      boxShadowLoading: u,
      iconColor: t,
      iconColorInfo: i,
      iconColorSuccess: l,
      iconColorWarning: a,
      iconColorError: s,
      iconColorLoading: d,
      closeColorHover: h,
      closeColorPressed: m,
      closeIconColor: o,
      closeIconColorHover: r,
      closeIconColorPressed: n,
      closeColorHoverInfo: h,
      closeColorPressedInfo: m,
      closeIconColorInfo: o,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: n,
      closeColorHoverSuccess: h,
      closeColorPressedSuccess: m,
      closeIconColorSuccess: o,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: n,
      closeColorHoverError: h,
      closeColorPressedError: m,
      closeIconColorError: o,
      closeIconColorHoverError: r,
      closeIconColorPressedError: n,
      closeColorHoverWarning: h,
      closeColorPressedWarning: m,
      closeIconColorWarning: o,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: n,
      closeColorHoverLoading: h,
      closeColorPressedLoading: m,
      closeIconColorLoading: o,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: n,
      loadingColor: d,
      lineHeight: f,
      borderRadius: p,
      border: "0"
    });
  }
  const k1 = {
    common: Te,
    self: Zd
  }, j1 = {
    name: "Message",
    common: D,
    self: Zd
  }, ef = {
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
  }, W1 = Q([
    pe("message-wrapper", `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [
      AC({
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
    pe("message", `
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
      Ue("content", `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `),
      Ue("icon", `
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
        ].map((e) => ge(`${e}-type`, [
          Q("> *", `
 color: var(--n-icon-color-${e});
 transition: color .3s var(--n-bezier);
 `)
        ])),
        Q("> *", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [
          sl()
        ])
      ]),
      Ue("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [
        Q("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
        Q("&:active", `
 color: var(--n-close-icon-color-pressed);
 `)
      ])
    ]),
    pe("message-container", `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [
      ge("top", `
 top: 12px;
 left: 0;
 right: 0;
 `),
      ge("top-left", `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `),
      ge("top-right", `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `),
      ge("bottom", `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `),
      ge("bottom-left", `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `),
      ge("bottom-right", `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)
    ])
  ]), N1 = {
    info: () => z(pd, null),
    success: () => z(hd, null),
    warning: () => z(gd, null),
    error: () => z(fd, null),
    default: () => null
  }, V1 = Le({
    name: "Message",
    props: Object.assign(Object.assign({}, ef), {
      render: Function
    }),
    setup(e) {
      const { inlineThemeDisabled: t, mergedRtlRef: o } = Yr(e), { props: r, mergedClsPrefixRef: n } = Ae(Qd), i = Dl("Message", o, n), l = ko("Message", "-message", W1, k1, r, n), s = ie(() => {
        const { type: c } = e, { common: { cubicBezierEaseInOut: u }, self: { padding: d, margin: f, maxWidth: p, iconMargin: h, closeMargin: m, closeSize: v, iconSize: x, fontSize: S, lineHeight: T, borderRadius: A, border: B, iconColorInfo: k, iconColorSuccess: P, iconColorWarning: w, iconColorError: y, iconColorLoading: O, closeIconSize: L, closeBorderRadius: I, [Gt("textColor", c)]: q, [Gt("boxShadow", c)]: se, [Gt("color", c)]: de, [Gt("closeColorHover", c)]: ne, [Gt("closeColorPressed", c)]: Y, [Gt("closeIconColor", c)]: ae, [Gt("closeIconColorPressed", c)]: Oe, [Gt("closeIconColorHover", c)]: ke } } = l.value;
        return {
          "--n-bezier": u,
          "--n-margin": f,
          "--n-padding": d,
          "--n-max-width": p,
          "--n-font-size": S,
          "--n-icon-margin": h,
          "--n-icon-size": x,
          "--n-close-icon-size": L,
          "--n-close-border-radius": I,
          "--n-close-size": v,
          "--n-close-margin": m,
          "--n-text-color": q,
          "--n-color": de,
          "--n-box-shadow": se,
          "--n-icon-color-info": k,
          "--n-icon-color-success": P,
          "--n-icon-color-warning": w,
          "--n-icon-color-error": y,
          "--n-icon-color-loading": O,
          "--n-close-color-hover": ne,
          "--n-close-color-pressed": Y,
          "--n-close-icon-color": ae,
          "--n-close-icon-color-pressed": Oe,
          "--n-close-icon-color-hover": ke,
          "--n-line-height": T,
          "--n-border-radius": A,
          "--n-border": B
        };
      }), a = t ? Il("message", ie(() => e.type[0]), s, {}) : void 0;
      return {
        mergedClsPrefix: n,
        rtlEnabled: i,
        messageProviderProps: r,
        handleClose() {
          var c;
          (c = e.onClose) === null || c === void 0 || c.call(e);
        },
        cssVars: t ? void 0 : s,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender,
        placement: r.placement
      };
    },
    render() {
      const { render: e, type: t, closable: o, content: r, mergedClsPrefix: n, cssVars: i, themeClass: l, onRender: s, icon: a, handleClose: c, showIcon: u } = this;
      s == null ? void 0 : s();
      let d;
      return z("div", {
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
      }, e ? e(this.$props) : z("div", {
        class: [
          `${n}-message ${n}-message--${t}-type`,
          this.rtlEnabled && `${n}-message--rtl`
        ]
      }, (d = G1(a, t, n, this.spinProps)) && u ? z("div", {
        class: `${n}-message__icon ${n}-message__icon--${t}-type`
      }, z(dd, null, {
        default: () => d
      })) : null, z("div", {
        class: `${n}-message__content`
      }, To(r)), o ? z(md, {
        clsPrefix: n,
        class: `${n}-message__close`,
        onClick: c,
        absolute: true
      }) : null));
    }
  });
  function G1(e, t, o, r) {
    if (typeof e == "function") return e();
    {
      const n = t === "loading" ? z(cC, Object.assign({
        clsPrefix: o,
        strokeWidth: 24,
        scale: 0.85
      }, r)) : N1[t]();
      return n ? z(Fl, {
        clsPrefix: o,
        key: t
      }, {
        default: () => n
      }) : null;
    }
  }
  const U1 = Le({
    name: "MessageEnvironment",
    props: Object.assign(Object.assign({}, ef), {
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
      const o = Ce(true);
      Fo(() => {
        r();
      });
      function r() {
        const { duration: u } = e;
        u && (t = window.setTimeout(l, u));
      }
      function n(u) {
        u.currentTarget === u.target && t !== null && (window.clearTimeout(t), t = null);
      }
      function i(u) {
        u.currentTarget === u.target && r();
      }
      function l() {
        const { onHide: u } = e;
        o.value = false, t && (window.clearTimeout(t), t = null), u && u();
      }
      function s() {
        const { onClose: u } = e;
        u && u(), l();
      }
      function a() {
        const { onAfterLeave: u, onInternalAfterLeave: d, onAfterHide: f, internalKey: p } = e;
        u && u(), d && d(p), f && f();
      }
      function c() {
        l();
      }
      return {
        show: o,
        hide: l,
        handleClose: s,
        handleAfterLeave: a,
        handleMouseleave: i,
        handleMouseenter: n,
        deactivate: c
      };
    },
    render() {
      return z(lC, {
        appear: true,
        onAfterLeave: this.handleAfterLeave,
        onLeave: this.onLeave
      }, {
        default: () => [
          this.show ? z(V1, {
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
  }), K1 = Object.assign(Object.assign({}, ko.props), {
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
  }), q1 = Le({
    name: "MessageProvider",
    props: K1,
    setup(e) {
      const { mergedClsPrefixRef: t } = Yr(e), o = Ce([]), r = Ce({}), n = {
        create(a, c) {
          return i(a, Object.assign({
            type: "default"
          }, c));
        },
        info(a, c) {
          return i(a, Object.assign(Object.assign({}, c), {
            type: "info"
          }));
        },
        success(a, c) {
          return i(a, Object.assign(Object.assign({}, c), {
            type: "success"
          }));
        },
        warning(a, c) {
          return i(a, Object.assign(Object.assign({}, c), {
            type: "warning"
          }));
        },
        error(a, c) {
          return i(a, Object.assign(Object.assign({}, c), {
            type: "error"
          }));
        },
        loading(a, c) {
          return i(a, Object.assign(Object.assign({}, c), {
            type: "loading"
          }));
        },
        destroyAll: s
      };
      Jt(Qd, {
        props: e,
        mergedClsPrefixRef: t
      }), Jt(F1, n);
      function i(a, c) {
        const u = Hu(), d = Bo(Object.assign(Object.assign({}, c), {
          content: a,
          key: u,
          destroy: () => {
            var p;
            (p = r.value[u]) === null || p === void 0 || p.hide();
          }
        })), { max: f } = e;
        return f && o.value.length >= f && o.value.shift(), o.value.push(d), d;
      }
      function l(a) {
        o.value.splice(o.value.findIndex((c) => c.key === a), 1), delete r.value[a];
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
      return z(qe, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.messageList.length ? z(gc, {
        to: (o = this.to) !== null && o !== void 0 ? o : "body"
      }, z("div", {
        class: [
          `${this.mergedClsPrefix}-message-container`,
          `${this.mergedClsPrefix}-message-container--${this.placement}`,
          this.containerClass
        ],
        key: "message-container",
        style: this.containerStyle
      }, this.messageList.map((r) => z(U1, Object.assign({
        ref: (n) => {
          n && (this.messageRefs[r.key] = n);
        },
        internalKey: r.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, Fu(r, [
        "destroy"
      ], void 0), {
        duration: r.duration === void 0 ? this.duration : r.duration,
        keepAliveOnHover: r.keepAliveOnHover === void 0 ? this.keepAliveOnHover : r.keepAliveOnHover,
        closable: r.closable === void 0 ? this.closable : r.closable
      }))))) : null);
    }
  }), X1 = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  };
  function tf(e) {
    const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: s, closeIconColorHover: a, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: d, textColor1: f, textColor3: p, borderRadius: h, fontWeightStrong: m, boxShadow2: v, lineHeight: x, fontSize: S } = e;
    return Object.assign(Object.assign({}, X1), {
      borderRadius: h,
      lineHeight: x,
      fontSize: S,
      headerFontWeight: m,
      iconColor: t,
      iconColorSuccess: o,
      iconColorInfo: r,
      iconColorWarning: n,
      iconColorError: i,
      color: l,
      textColor: t,
      closeIconColor: s,
      closeIconColorHover: a,
      closeIconColorPressed: c,
      closeBorderRadius: h,
      closeColorHover: u,
      closeColorPressed: d,
      headerTextColor: f,
      descriptionTextColor: p,
      actionTextColor: t,
      boxShadow: v
    });
  }
  const Y1 = {
    name: "Notification",
    common: Te,
    peers: {
      Scrollbar: io
    },
    self: tf
  }, J1 = {
    name: "Notification",
    common: D,
    peers: {
      Scrollbar: rt
    },
    self: tf
  }, ci = "n-notification-provider", Q1 = Le({
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
      const { mergedThemeRef: e, mergedClsPrefixRef: t, wipTransitionCountRef: o } = Ae(ci), r = Ce(null);
      return Gn(() => {
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
      return z("div", {
        ref: "selfRef",
        class: [
          `${o}-notification-container`,
          t && `${o}-notification-container--scrollable`,
          `${o}-notification-container--${n}`
        ]
      }, t ? z(Cd, {
        theme: r.peers.Scrollbar,
        themeOverrides: r.peerOverrides.Scrollbar,
        contentStyle: {
          overflow: "hidden"
        }
      }, e) : e);
    }
  }), Z1 = {
    info: () => z(pd, null),
    success: () => z(hd, null),
    warning: () => z(gd, null),
    error: () => z(fd, null),
    default: () => null
  }, Nl = {
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
  }, eS = Kb(Nl), tS = Le({
    name: "Notification",
    props: Nl,
    setup(e) {
      const { mergedClsPrefixRef: t, mergedThemeRef: o, props: r } = Ae(ci), { inlineThemeDisabled: n, mergedRtlRef: i } = Yr(), l = Dl("Notification", i, t), s = ie(() => {
        const { type: c } = e, { self: { color: u, textColor: d, closeIconColor: f, closeIconColorHover: p, closeIconColorPressed: h, headerTextColor: m, descriptionTextColor: v, actionTextColor: x, borderRadius: S, headerFontWeight: T, boxShadow: A, lineHeight: B, fontSize: k, closeMargin: P, closeSize: w, width: y, padding: O, closeIconSize: L, closeBorderRadius: I, closeColorHover: q, closeColorPressed: se, titleFontSize: de, metaFontSize: ne, descriptionFontSize: Y, [Gt("iconColor", c)]: ae }, common: { cubicBezierEaseOut: Oe, cubicBezierEaseIn: ke, cubicBezierEaseInOut: De } } = o.value, { left: Be, right: St, top: Rt, bottom: yt } = Ko(O);
        return {
          "--n-color": u,
          "--n-font-size": k,
          "--n-text-color": d,
          "--n-description-text-color": v,
          "--n-action-text-color": x,
          "--n-title-text-color": m,
          "--n-title-font-weight": T,
          "--n-bezier": De,
          "--n-bezier-ease-out": Oe,
          "--n-bezier-ease-in": ke,
          "--n-border-radius": S,
          "--n-box-shadow": A,
          "--n-close-border-radius": I,
          "--n-close-color-hover": q,
          "--n-close-color-pressed": se,
          "--n-close-icon-color": f,
          "--n-close-icon-color-hover": p,
          "--n-close-icon-color-pressed": h,
          "--n-line-height": B,
          "--n-icon-color": ae,
          "--n-close-margin": P,
          "--n-close-size": w,
          "--n-close-icon-size": L,
          "--n-width": y,
          "--n-padding-left": Be,
          "--n-padding-right": St,
          "--n-padding-top": Rt,
          "--n-padding-bottom": yt,
          "--n-title-font-size": de,
          "--n-meta-font-size": ne,
          "--n-description-font-size": Y
        };
      }), a = n ? Il("notification", ie(() => e.type[0]), s, r) : void 0;
      return {
        mergedClsPrefix: t,
        showAvatar: ie(() => e.avatar || e.type !== "default"),
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
      return (e = this.onRender) === null || e === void 0 || e.call(this), z("div", {
        class: [
          `${t}-notification-wrapper`,
          this.themeClass
        ],
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: this.cssVars
      }, z("div", {
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
      }, this.showAvatar ? z("div", {
        class: `${t}-notification__avatar`
      }, this.avatar ? To(this.avatar) : this.type !== "default" ? z(Fl, {
        clsPrefix: t
      }, {
        default: () => Z1[this.type]()
      }) : null) : null, this.closable ? z(md, {
        clsPrefix: t,
        class: `${t}-notification__close`,
        onClick: this.handleCloseClick
      }) : null, z("div", {
        ref: "bodyRef",
        class: `${t}-notification-main`
      }, this.title ? z("div", {
        class: `${t}-notification-main__header`
      }, To(this.title)) : null, this.description ? z("div", {
        class: `${t}-notification-main__description`
      }, To(this.description)) : null, this.content ? z("pre", {
        class: `${t}-notification-main__content`
      }, To(this.content)) : null, this.meta || this.action ? z("div", {
        class: `${t}-notification-main-footer`
      }, this.meta ? z("div", {
        class: `${t}-notification-main-footer__meta`
      }, To(this.meta)) : null, this.action ? z("div", {
        class: `${t}-notification-main-footer__action`
      }, To(this.action)) : null) : null)));
    }
  }), oS = Object.assign(Object.assign({}, Nl), {
    duration: Number,
    onClose: Function,
    onLeave: Function,
    onAfterEnter: Function,
    onAfterLeave: Function,
    onHide: Function,
    onAfterShow: Function,
    onAfterHide: Function
  }), rS = Le({
    name: "NotificationEnvironment",
    props: Object.assign(Object.assign({}, oS), {
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
      const { wipTransitionCountRef: t } = Ae(ci), o = Ce(true);
      let r = null;
      function n() {
        o.value = false, r && window.clearTimeout(r);
      }
      function i(h) {
        t.value++, Vn(() => {
          h.style.height = `${h.offsetHeight}px`, h.style.maxHeight = "0", h.style.transition = "none", h.offsetHeight, h.style.transition = "", h.style.maxHeight = h.style.height;
        });
      }
      function l(h) {
        t.value--, h.style.height = "", h.style.maxHeight = "";
        const { onAfterEnter: m, onAfterShow: v } = e;
        m && m(), v && v();
      }
      function s(h) {
        t.value++, h.style.maxHeight = `${h.offsetHeight}px`, h.style.height = `${h.offsetHeight}px`, h.offsetHeight;
      }
      function a(h) {
        const { onHide: m } = e;
        m && m(), h.style.maxHeight = "0", h.offsetHeight;
      }
      function c() {
        t.value--;
        const { onAfterLeave: h, onInternalAfterLeave: m, onAfterHide: v, internalKey: x } = e;
        h && h(), m(x), v && v();
      }
      function u() {
        const { duration: h } = e;
        h && (r = window.setTimeout(n, h));
      }
      function d(h) {
        h.currentTarget === h.target && r !== null && (window.clearTimeout(r), r = null);
      }
      function f(h) {
        h.currentTarget === h.target && u();
      }
      function p() {
        const { onClose: h } = e;
        h ? Promise.resolve(h()).then((m) => {
          m !== false && n();
        }) : n();
      }
      return Fo(() => {
        e.duration && (r = window.setTimeout(n, e.duration));
      }), {
        show: o,
        hide: n,
        handleClose: p,
        handleAfterLeave: c,
        handleLeave: a,
        handleBeforeLeave: s,
        handleAfterEnter: l,
        handleBeforeEnter: i,
        handleMouseenter: d,
        handleMouseleave: f
      };
    },
    render() {
      return z(Lr, {
        name: "notification-transition",
        appear: true,
        onBeforeEnter: this.handleBeforeEnter,
        onAfterEnter: this.handleAfterEnter,
        onBeforeLeave: this.handleBeforeLeave,
        onLeave: this.handleLeave,
        onAfterLeave: this.handleAfterLeave
      }, {
        default: () => this.show ? z(tS, Object.assign({}, Ub(this.$props, eS), {
          onClose: this.handleClose,
          onMouseenter: this.duration && this.keepAliveOnHover ? this.handleMouseenter : void 0,
          onMouseleave: this.duration && this.keepAliveOnHover ? this.handleMouseleave : void 0
        })) : null
      });
    }
  }), nS = Q([
    pe("notification-container", `
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `, [
      Q(">", [
        pe("scrollbar", `
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
          Q(">", [
            pe("scrollbar-container", `
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
              pe("scrollbar-content", `
 padding-top: 12px;
 padding-bottom: 33px;
 `)
            ])
          ])
        ])
      ]),
      ge("top, top-right, top-left", `
 top: 12px;
 `, [
        Q("&.transitioning >", [
          pe("scrollbar", [
            Q(">", [
              pe("scrollbar-container", `
 min-height: 100vh !important;
 `)
            ])
          ])
        ])
      ]),
      ge("bottom, bottom-right, bottom-left", `
 bottom: 12px;
 `, [
        Q(">", [
          pe("scrollbar", [
            Q(">", [
              pe("scrollbar-container", [
                pe("scrollbar-content", `
 padding-bottom: 12px;
 `)
              ])
            ])
          ])
        ]),
        pe("notification-wrapper", `
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)
      ]),
      ge("top, bottom", `
 left: 50%;
 transform: translateX(-50%);
 `, [
        pe("notification-wrapper", [
          Q("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: scale(0.85);
 `),
          Q("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: scale(1);
 `)
        ])
      ]),
      ge("top", [
        pe("notification-wrapper", `
 transform-origin: top center;
 `)
      ]),
      ge("bottom", [
        pe("notification-wrapper", `
 transform-origin: bottom center;
 `)
      ]),
      ge("top-right, bottom-right", [
        pe("notification", `
 margin-left: 28px;
 margin-right: 16px;
 `)
      ]),
      ge("top-left, bottom-left", [
        pe("notification", `
 margin-left: 16px;
 margin-right: 28px;
 `)
      ]),
      ge("top-right", `
 right: 0;
 `, [
        dn("top-right")
      ]),
      ge("top-left", `
 left: 0;
 `, [
        dn("top-left")
      ]),
      ge("bottom-right", `
 right: 0;
 `, [
        dn("bottom-right")
      ]),
      ge("bottom-left", `
 left: 0;
 `, [
        dn("bottom-left")
      ]),
      ge("scrollable", [
        ge("top-right", `
 top: 0;
 `),
        ge("top-left", `
 top: 0;
 `),
        ge("bottom-right", `
 bottom: 0;
 `),
        ge("bottom-left", `
 bottom: 0;
 `)
      ]),
      pe("notification-wrapper", `
 margin-bottom: 12px;
 `, [
        Q("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),
        Q("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 opacity: 1;
 `),
        Q("&.notification-transition-leave-active", `
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
        Q("&.notification-transition-enter-active", `
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
      pe("notification", `
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
        Ue("avatar", [
          pe("icon", `
 color: var(--n-icon-color);
 `),
          pe("base-icon", `
 color: var(--n-icon-color);
 `)
        ]),
        ge("show-avatar", [
          pe("notification-main", `
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)
        ]),
        ge("closable", [
          pe("notification-main", [
            Q("> *:first-child", `
 padding-right: 20px;
 `)
          ]),
          Ue("close", `
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)
        ]),
        Ue("avatar", `
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
          pe("icon", "transition: color .3s var(--n-bezier);")
        ]),
        pe("notification-main", `
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `, [
          pe("notification-main-footer", `
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `, [
            Ue("meta", `
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
            Ue("action", `
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)
          ]),
          Ue("header", `
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),
          Ue("description", `
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
          Ue("content", `
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `, [
            Q("&:first-child", "margin: 0;")
          ])
        ])
      ])
    ])
  ]);
  function dn(e) {
    const o = e.split("-")[1] === "left" ? "calc(-100%)" : "calc(100%)";
    return pe("notification-wrapper", [
      Q("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: translate(${o}, 0);
 `),
      Q("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: translate(0, 0);
 `)
    ]);
  }
  const iS = "n-notification-api", lS = Object.assign(Object.assign({}, ko.props), {
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
  }), sS = Le({
    name: "NotificationProvider",
    props: lS,
    setup(e) {
      const { mergedClsPrefixRef: t } = Yr(e), o = Ce([]), r = {}, n = /* @__PURE__ */ new Set();
      function i(p) {
        const h = Hu(), m = () => {
          n.add(h), r[h] && r[h].hide();
        }, v = Bo(Object.assign(Object.assign({}, p), {
          key: h,
          destroy: m,
          hide: m,
          deactivate: m
        })), { max: x } = e;
        if (x && o.value.length - n.size >= x) {
          let S = false, T = 0;
          for (const A of o.value) {
            if (!n.has(A.key)) {
              r[A.key] && (A.destroy(), S = true);
              break;
            }
            T++;
          }
          S || o.value.splice(T, 1);
        }
        return o.value.push(v), v;
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
      const a = ko("Notification", "-notification", nS, Y1, e, t), c = {
        create: i,
        info: l[0],
        success: l[1],
        warning: l[2],
        error: l[3],
        open: d,
        destroyAll: f
      }, u = Ce(0);
      Jt(iS, c), Jt(ci, {
        props: e,
        mergedClsPrefixRef: t,
        mergedThemeRef: a,
        wipTransitionCountRef: u
      });
      function d(p) {
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
      }, c);
    },
    render() {
      var e, t, o;
      const { placement: r } = this;
      return z(qe, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.notificationList.length ? z(gc, {
        to: (o = this.to) !== null && o !== void 0 ? o : "body"
      }, z(Q1, {
        class: this.containerClass,
        style: this.containerStyle,
        scrollable: this.scrollable && r !== "top" && r !== "bottom",
        placement: r
      }, {
        default: () => this.notificationList.map((n) => z(rS, Object.assign({
          ref: (i) => {
            const l = n.key;
            i === null ? delete this.notificationRefs[l] : this.notificationRefs[l] = i;
          }
        }, Fu(n, [
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
  function aS(e) {
    const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
    return {
      textColor: t,
      color: o,
      fontWeight: r
    };
  }
  const cS = {
    name: "Divider",
    common: D,
    self: aS
  };
  function uS(e) {
    const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: l, dividerColor: s, closeColorHover: a, closeColorPressed: c, closeIconColor: u, closeIconColorHover: d, closeIconColorPressed: f, borderRadius: p, primaryColorHover: h } = e;
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
      closeIconColor: u,
      closeIconColorHover: d,
      closeIconColorPressed: f,
      closeSize: "22px",
      closeIconSize: "18px",
      closeColorHover: a,
      closeColorPressed: c,
      closeBorderRadius: p,
      resizableTriggerColorHover: h
    };
  }
  const dS = {
    name: "Drawer",
    common: D,
    peers: {
      Scrollbar: rt
    },
    self: uS
  }, fS = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, pS = {
    name: "DynamicInput",
    common: D,
    peers: {
      Input: vt,
      Button: pt
    },
    self() {
      return fS;
    }
  }, hS = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, of = {
    name: "Space",
    self() {
      return hS;
    }
  }, gS = {
    name: "DynamicTags",
    common: D,
    peers: {
      Input: vt,
      Button: pt,
      Tag: Td,
      Space: of
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, mS = {
    name: "Element",
    common: D
  }, bS = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, vS = {
    name: "Flex",
    self() {
      return bS;
    }
  }, xS = {
    name: "ButtonGroup",
    common: D
  }, CS = {
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
  function rf(e) {
    const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: s, textColor3: a } = e;
    return Object.assign(Object.assign({}, CS), {
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
  let SS, yS, wS;
  cw = {
    common: Te,
    self: rf
  };
  SS = {
    name: "Form",
    common: D,
    self: rf
  };
  yS = {
    name: "GradientText",
    common: D,
    self(e) {
      const { primaryColor: t, successColor: o, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: l, successColorSuppl: s, warningColorSuppl: a, errorColorSuppl: c, infoColorSuppl: u, fontWeightStrong: d } = e;
      return {
        fontWeight: d,
        rotate: "252deg",
        colorStartPrimary: t,
        colorEndPrimary: l,
        colorStartInfo: i,
        colorEndInfo: u,
        colorStartWarning: r,
        colorEndWarning: a,
        colorStartError: n,
        colorEndError: c,
        colorStartSuccess: o,
        colorEndSuccess: s
      };
    }
  };
  wS = {
    name: "InputNumber",
    common: D,
    peers: {
      Button: pt,
      Input: vt
    },
    self(e) {
      const { textColorDisabled: t } = e;
      return {
        iconColorDisabled: t
      };
    }
  };
  function PS() {
    return {
      inputWidthSmall: "24px",
      inputWidthMedium: "30px",
      inputWidthLarge: "36px",
      gapSmall: "8px",
      gapMedium: "8px",
      gapLarge: "8px"
    };
  }
  const TS = {
    name: "InputOtp",
    common: D,
    peers: {
      Input: vt
    },
    self: PS
  }, _S = {
    name: "Layout",
    common: D,
    peers: {
      Scrollbar: rt
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
        siderToggleBarColor: X(o, l),
        siderToggleBarColorHover: X(o, s),
        __invertScrollbar: "false"
      };
    }
  }, ES = {
    name: "Row",
    common: D
  };
  function RS(e) {
    const { textColor2: t, cardColor: o, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: l, fontSize: s, hoverColor: a } = e;
    return {
      textColor: t,
      color: o,
      colorHover: a,
      colorModal: r,
      colorHoverModal: X(r, a),
      colorPopover: n,
      colorHoverPopover: X(n, a),
      borderColor: i,
      borderColorModal: X(r, i),
      borderColorPopover: X(n, i),
      borderRadius: l,
      fontSize: s
    };
  }
  const AS = {
    name: "List",
    common: D,
    self: RS
  }, HS = {
    name: "Log",
    common: D,
    peers: {
      Scrollbar: rt,
      Code: Od
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
  }, IS = {
    name: "Mention",
    common: D,
    peers: {
      InternalSelectMenu: Zr,
      Input: vt
    },
    self(e) {
      const { boxShadow2: t } = e;
      return {
        menuBoxShadow: t
      };
    }
  };
  function $S(e, t, o, r) {
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
  function OS(e) {
    const { borderRadius: t, textColor3: o, primaryColor: r, textColor2: n, textColor1: i, fontSize: l, dividerColor: s, hoverColor: a, primaryColorHover: c } = e;
    return Object.assign({
      borderRadius: t,
      color: "#0000",
      groupTextColor: o,
      itemColorHover: a,
      itemColorActive: V(r, {
        alpha: 0.1
      }),
      itemColorActiveHover: V(r, {
        alpha: 0.1
      }),
      itemColorActiveCollapsed: V(r, {
        alpha: 0.1
      }),
      itemTextColor: n,
      itemTextColorHover: n,
      itemTextColorActive: r,
      itemTextColorActiveHover: r,
      itemTextColorChildActive: r,
      itemTextColorChildActiveHover: r,
      itemTextColorHorizontal: n,
      itemTextColorHoverHorizontal: c,
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
      itemIconColorHoverHorizontal: c,
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
    }, $S("#BBB", r, "#FFF", "#AAA"));
  }
  const MS = {
    name: "Menu",
    common: D,
    peers: {
      Tooltip: ai,
      Dropdown: Wl
    },
    self(e) {
      const { primaryColor: t, primaryColorSuppl: o } = e, r = OS(e);
      return r.itemColorActive = V(t, {
        alpha: 0.15
      }), r.itemColorActiveHover = V(t, {
        alpha: 0.15
      }), r.itemColorActiveCollapsed = V(t, {
        alpha: 0.15
      }), r.itemColorActiveInverted = o, r.itemColorActiveHoverInverted = o, r.itemColorActiveCollapsedInverted = o, r;
    }
  }, zS = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function DS(e) {
    const { textColor1: t, textColor2: o, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: s } = e;
    return Object.assign(Object.assign({}, zS), {
      titleFontWeight: i,
      fontSize: n,
      titleTextColor: t,
      backColor: o,
      backColorHover: l,
      backColorPressed: s,
      subtitleTextColor: r
    });
  }
  const BS = {
    name: "PageHeader",
    common: D,
    self: DS
  }, FS = {
    iconSize: "22px"
  };
  function LS(e) {
    const { fontSize: t, warningColor: o } = e;
    return Object.assign(Object.assign({}, FS), {
      fontSize: t,
      iconColor: o
    });
  }
  const kS = {
    name: "Popconfirm",
    common: D,
    peers: {
      Button: pt,
      Popover: Wo
    },
    self: LS
  };
  function jS(e) {
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
  const nf = {
    name: "Progress",
    common: D,
    self(e) {
      const t = jS(e);
      return t.textColorLineInner = "rgb(0, 0, 0)", t.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", t;
    }
  }, WS = {
    name: "Rate",
    common: D,
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
  }, NS = {
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
  function VS(e) {
    const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: s, fontWeightStrong: a } = e;
    return Object.assign(Object.assign({}, NS), {
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
  const GS = {
    name: "Result",
    common: D,
    self: VS
  }, US = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, KS = {
    name: "Slider",
    common: D,
    self(e) {
      const t = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: o, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: s, borderRadius: a, fontSize: c, opacityDisabled: u } = e;
      return Object.assign(Object.assign({}, US), {
        fontSize: c,
        markFontSize: c,
        railColor: o,
        railColorHover: o,
        fillColor: n,
        fillColorHover: n,
        opacityDisabled: u,
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
  function lf(e) {
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
  let qS;
  uw = {
    common: Te,
    self: lf
  };
  qS = {
    name: "Spin",
    common: D,
    self: lf
  };
  function sf(e) {
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
  let XS, YS;
  dw = {
    common: Te,
    self: sf
  };
  XS = {
    name: "Statistic",
    common: D,
    self: sf
  };
  YS = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  };
  function JS(e) {
    const { fontWeightStrong: t, baseColor: o, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: s } = e;
    return Object.assign(Object.assign({}, YS), {
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
  let QS, ey, ty;
  QS = {
    name: "Steps",
    common: D,
    self: JS
  };
  ZS = {
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
  ey = {
    name: "Switch",
    common: D,
    self(e) {
      const { primaryColorSuppl: t, opacityDisabled: o, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e;
      return Object.assign(Object.assign({}, ZS), {
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
        boxShadowFocus: `0 0 8px 0 ${V(n, {
          alpha: 0.3
        })}`
      });
    }
  };
  ty = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  };
  function oy(e) {
    const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: s, textColor2: a, borderRadius: c, fontWeightStrong: u, lineHeight: d, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: h } = e;
    return Object.assign(Object.assign({}, ty), {
      fontSizeSmall: f,
      fontSizeMedium: p,
      fontSizeLarge: h,
      lineHeight: d,
      borderRadius: c,
      borderColor: X(o, t),
      borderColorModal: X(r, t),
      borderColorPopover: X(n, t),
      tdColor: o,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: X(o, l),
      tdColorStripedModal: X(r, l),
      tdColorStripedPopover: X(n, l),
      thColor: X(o, i),
      thColorModal: X(r, i),
      thColorPopover: X(n, i),
      thTextColor: s,
      tdTextColor: a,
      thFontWeight: u
    });
  }
  const ry = {
    name: "Table",
    common: D,
    self: oy
  }, ny = {
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
  function iy(e) {
    const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: s, closeColorPressed: a, tabColor: c, baseColor: u, dividerColor: d, fontWeight: f, textColor1: p, borderRadius: h, fontSize: m, fontWeightStrong: v } = e;
    return Object.assign(Object.assign({}, ny), {
      colorSegment: c,
      tabFontSizeCard: m,
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
      tabColor: c,
      tabColorSegment: u,
      tabBorderColor: d,
      tabFontWeightActive: f,
      tabFontWeight: f,
      tabBorderRadius: h,
      paneTextColor: t,
      fontWeightStrong: v
    });
  }
  const ly = {
    name: "Tabs",
    common: D,
    self(e) {
      const t = iy(e), { inputColor: o } = e;
      return t.colorSegment = o, t.tabColorSegment = o, t;
    }
  };
  function sy(e) {
    const { textColor1: t, textColor2: o, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: t,
      textColor: o,
      titleFontWeight: r
    };
  }
  const ay = {
    name: "Thing",
    common: D,
    self: sy
  }, cy = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, uy = {
    name: "Timeline",
    common: D,
    self(e) {
      const { textColor3: t, infoColorSuppl: o, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: s, railColor: a, fontWeightStrong: c, fontSize: u } = e;
      return Object.assign(Object.assign({}, cy), {
        contentFontSize: u,
        titleFontWeight: c,
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
  }, dy = {
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
  }, fy = {
    name: "Transfer",
    common: D,
    peers: {
      Checkbox: ur,
      Scrollbar: rt,
      Input: vt,
      Empty: jo,
      Button: pt
    },
    self(e) {
      const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: s, inputColor: a, tableHeaderColor: c, textColor1: u, textColorDisabled: d, textColor2: f, textColor3: p, hoverColor: h, closeColorHover: m, closeColorPressed: v, closeIconColor: x, closeIconColorHover: S, closeIconColorPressed: T, dividerColor: A } = e;
      return Object.assign(Object.assign({}, dy), {
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
        headerColor: c,
        titleTextColor: u,
        titleTextColorDisabled: d,
        extraTextColor: p,
        extraTextColorDisabled: d,
        itemTextColor: f,
        itemTextColorDisabled: d,
        itemColorPending: h,
        titleFontWeight: t,
        closeColorHover: m,
        closeColorPressed: v,
        closeIconColor: x,
        closeIconColorHover: S,
        closeIconColorPressed: T
      });
    }
  };
  function py(e) {
    const { borderRadiusSmall: t, dividerColor: o, hoverColor: r, pressedColor: n, primaryColor: i, textColor3: l, textColor2: s, textColorDisabled: a, fontSize: c } = e;
    return {
      fontSize: c,
      lineHeight: "1.5",
      nodeHeight: "30px",
      nodeWrapperPadding: "3px 0",
      nodeBorderRadius: t,
      nodeColorHover: r,
      nodeColorPressed: n,
      nodeColorActive: V(i, {
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
  const af = {
    name: "Tree",
    common: D,
    peers: {
      Checkbox: ur,
      Scrollbar: rt,
      Empty: jo
    },
    self(e) {
      const { primaryColor: t } = e, o = py(e);
      return o.nodeColorActive = V(t, {
        alpha: 0.15
      }), o;
    }
  }, hy = {
    name: "TreeSelect",
    common: D,
    peers: {
      Tree: af,
      Empty: jo,
      InternalSelection: kl
    }
  }, gy = {
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
  function my(e) {
    const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: l, dividerColor: s, fontWeightStrong: a, textColor1: c, textColor3: u, infoColor: d, warningColor: f, errorColor: p, successColor: h, codeColor: m } = e;
    return Object.assign(Object.assign({}, gy), {
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
      headerTextColor: c,
      pTextColor: o,
      pTextColor1Depth: c,
      pTextColor2Depth: o,
      pTextColor3Depth: u,
      pLineHeight: n,
      pFontSize: i,
      headerBarColor: t,
      headerBarColorPrimary: t,
      headerBarColorInfo: d,
      headerBarColorError: p,
      headerBarColorWarning: f,
      headerBarColorSuccess: h,
      textColor: o,
      textColor1Depth: c,
      textColor2Depth: o,
      textColor3Depth: u,
      textColorPrimary: t,
      textColorInfo: d,
      textColorSuccess: h,
      textColorWarning: f,
      textColorError: p,
      codeTextColor: o,
      codeColor: m,
      codeBorder: "1px solid #0000"
    });
  }
  const by = {
    name: "Typography",
    common: D,
    self: my
  };
  function vy(e) {
    const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: l, actionColor: s, borderColor: a, hoverColor: c, lineHeight: u, borderRadius: d, fontSize: f } = e;
    return {
      fontSize: f,
      lineHeight: u,
      borderRadius: d,
      draggerColor: s,
      draggerBorder: `1px dashed ${a}`,
      draggerBorderHover: `1px dashed ${o}`,
      itemColorHover: c,
      itemColorHoverError: V(r, {
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
  const xy = {
    name: "Upload",
    common: D,
    peers: {
      Button: pt,
      Progress: nf
    },
    self(e) {
      const { errorColor: t } = e, o = vy(e);
      return o.itemColorHoverError = V(t, {
        alpha: 0.09
      }), o;
    }
  }, Cy = {
    name: "Watermark",
    common: D,
    self(e) {
      const { fontFamily: t } = e;
      return {
        fontFamily: t
      };
    }
  }, Sy = {
    name: "FloatButton",
    common: D,
    self(e) {
      const { popoverColor: t, textColor2: o, buttonColor2Hover: r, buttonColor2Pressed: n, primaryColor: i, primaryColorHover: l, primaryColorPressed: s, baseColor: a, borderRadius: c } = e;
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
        borderRadiusSquare: c
      };
    }
  };
  function yy(e) {
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
  const wy = {
    name: "Heatmap",
    common: D,
    self(e) {
      const t = yy(e);
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
  function Py(e) {
    const { primaryColor: t, baseColor: o } = e;
    return {
      color: t,
      iconColor: o
    };
  }
  const Ty = {
    name: "IconWrapper",
    common: D,
    self: Py
  }, _y = {
    name: "Image",
    common: D,
    peers: {
      Tooltip: ai
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
  }, Ey = {
    extraFontSize: "12px",
    width: "440px"
  }, Ry = {
    name: "Transfer",
    common: D,
    peers: {
      Checkbox: ur,
      Scrollbar: rt,
      Input: vt,
      Empty: jo,
      Button: pt
    },
    self(e) {
      const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: s, heightMedium: a, heightSmall: c, borderRadius: u, inputColor: d, tableHeaderColor: f, textColor1: p, textColorDisabled: h, textColor2: m, hoverColor: v } = e;
      return Object.assign(Object.assign({}, Ey), {
        itemHeightSmall: c,
        itemHeightMedium: a,
        itemHeightLarge: s,
        fontSizeSmall: l,
        fontSizeMedium: i,
        fontSizeLarge: n,
        borderRadius: u,
        borderColor: "#0000",
        listColor: d,
        headerColor: f,
        titleTextColor: p,
        titleTextColorDisabled: h,
        extraTextColor: m,
        filterDividerColor: "#0000",
        itemTextColor: m,
        itemTextColorDisabled: h,
        itemColorPending: v,
        titleFontWeight: r,
        iconColor: o,
        iconColorDisabled: t
      });
    }
  };
  function Ay() {
    return {};
  }
  const Hy = {
    name: "Marquee",
    common: D,
    self: Ay
  }, Iy = {
    name: "QrCode",
    common: D,
    self: (e) => ({
      borderRadius: e.borderRadius
    })
  }, $y = {
    name: "Skeleton",
    common: D,
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
  }, Oy = {
    name: "Split",
    common: D
  }, My = () => ({}), zy = {
    name: "Equation",
    common: D,
    self: My
  }, Dy = {
    name: "FloatButtonGroup",
    common: D,
    self(e) {
      const { popoverColor: t, dividerColor: o, borderRadius: r } = e;
      return {
        color: t,
        buttonBorderColor: o,
        borderRadiusSquare: r,
        boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)"
      };
    }
  }, By = {
    name: "dark",
    common: D,
    Alert: _C,
    Anchor: $C,
    AutoComplete: DC,
    Avatar: Rd,
    AvatarGroup: LC,
    BackTop: jC,
    Badge: WC,
    Breadcrumb: GC,
    Button: pt,
    ButtonGroup: xS,
    Calendar: XC,
    Card: Id,
    Carousel: ZC,
    Cascader: r1,
    Checkbox: ur,
    Code: Od,
    Collapse: i1,
    CollapseTransition: s1,
    ColorPicker: c1,
    DataTable: T1,
    DatePicker: H1,
    Descriptions: O1,
    Dialog: Yd,
    Divider: cS,
    Drawer: dS,
    Dropdown: Wl,
    DynamicInput: pS,
    DynamicTags: gS,
    Element: mS,
    Empty: jo,
    Ellipsis: jd,
    Equation: zy,
    Flex: vS,
    Form: SS,
    GradientText: yS,
    Heatmap: wy,
    Icon: _1,
    IconWrapper: Ty,
    Image: _y,
    Input: vt,
    InputNumber: wS,
    InputOtp: TS,
    LegacyTransfer: Ry,
    Layout: _S,
    List: AS,
    LoadingBar: B1,
    Log: HS,
    Menu: MS,
    Mention: IS,
    Message: j1,
    Modal: D1,
    Notification: J1,
    PageHeader: BS,
    Pagination: Fd,
    Popconfirm: kS,
    Popover: Wo,
    Popselect: Md,
    Progress: nf,
    QrCode: Iy,
    Radio: Nd,
    Rate: WS,
    Result: GS,
    Row: ES,
    Scrollbar: rt,
    Select: Dd,
    Skeleton: $y,
    Slider: KS,
    Space: of,
    Spin: qS,
    Statistic: XS,
    Steps: QS,
    Switch: ey,
    Table: ry,
    Tabs: ly,
    Tag: Td,
    Thing: ay,
    TimePicker: Kd,
    Timeline: uy,
    Tooltip: ai,
    Transfer: fy,
    Tree: af,
    TreeSelect: hy,
    Typography: by,
    Upload: xy,
    Watermark: Cy,
    Split: Oy,
    FloatButton: Sy,
    FloatButtonGroup: Dy,
    Marquee: Hy
  }, Fy = Le({
    __name: "App",
    setup(e) {
      return (t, o) => {
        const r = Mp("RouterView"), n = sS, i = q1, l = d1;
        return Tn(), En(l, {
          theme: mo(By)
        }, {
          default: fn(() => [
            Ke(i, null, {
              default: fn(() => [
                Ke(n, null, {
                  default: fn(() => [
                    Ke(r)
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
  }), Vl = rg(Fy), Ly = lg(), cf = Cm({
    history: Jg(),
    routes: Pm(wm)
  });
  cf.beforeEach((e) => {
    const t = Tm();
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
  Vl.use(Ly);
  Vl.use(cf);
  Vl.mount("#app");
})();
export {
  Fl as $,
  kf as A,
  Ni as B,
  dl as C,
  $e as D,
  ZS as E,
  V as F,
  sl as G,
  qm as H,
  cC as I,
  Gt as J,
  Ym as K,
  Js as L,
  qe as M,
  dd as N,
  jy as O,
  uC as P,
  uw as Q,
  Gn as R,
  aC as S,
  Lr as T,
  TC as U,
  X as V,
  AC as W,
  Kc as X,
  md as Y,
  lC as Z,
  Dl as _,
  __tla,
  ie as a,
  Jr as a$,
  fd as a0,
  gd as a1,
  pd as a2,
  hd as a3,
  Ko as a4,
  Bl as a5,
  cw as a6,
  Kb as a7,
  Jt as a8,
  qy as a9,
  si as aA,
  Zs as aB,
  to as aC,
  Qr as aD,
  Gb as aE,
  R1 as aF,
  sw as aG,
  dw as aH,
  qr as aI,
  Bo as aJ,
  tt as aK,
  Nm as aL,
  gc as aM,
  ri as aN,
  da as aO,
  yc as aP,
  wc as aQ,
  Bp as aR,
  Hu as aS,
  ua as aT,
  Ol as aU,
  ir as aV,
  Rv as aW,
  Gu as aX,
  zl as aY,
  Ev as aZ,
  On as a_,
  Tm as aa,
  Uy as ab,
  Gy as ac,
  xn as ad,
  vr as ae,
  qn as af,
  Xn as ag,
  Po as ah,
  tw as ai,
  Yy as aj,
  Qy as ak,
  To as al,
  z1 as am,
  _c as an,
  Vb as ao,
  bo as ap,
  ky as aq,
  Cd as ar,
  Vy as as,
  Ub as at,
  Vn as au,
  aw as av,
  hb as aw,
  Xm as ax,
  rw as ay,
  jl as az,
  Te as b,
  p0 as b0,
  Qu as b1,
  sr as b2,
  nr as b3,
  ni as b4,
  Ea as b5,
  qu as b6,
  ar as b7,
  Yu as b8,
  lr as b9,
  S1 as bA,
  lw as bB,
  v1 as bC,
  Gr as bD,
  ew as bE,
  iw as bF,
  JC as bG,
  n0 as bH,
  rx as bI,
  F1 as bJ,
  Mp as bK,
  Br as bL,
  Lo as ba,
  Vu as bb,
  Nu as bc,
  ol as bd,
  Wu as be,
  Xx as bf,
  i0 as bg,
  Ll as bh,
  cr as bi,
  wd as bj,
  Zy as bk,
  en as bl,
  nw as bm,
  Jn as bn,
  yC as bo,
  pa as bp,
  PC as bq,
  Jy as br,
  t1 as bs,
  p1 as bt,
  Fu as bu,
  h1 as bv,
  m1 as bw,
  w1 as bx,
  C1 as by,
  ow as bz,
  oo as c,
  Le as d,
  Q as e,
  pe as f,
  ge as g,
  Ue as h,
  Ae as i,
  z as j,
  Yr as k,
  ko as l,
  Il as m,
  Tn as n,
  Fo as o,
  En as p,
  fn as q,
  Ce as r,
  mo as s,
  Cl as t,
  Ky as u,
  Ke as v,
  Jo as w,
  Ny as x,
  Uc as y,
  Wy as z
};
