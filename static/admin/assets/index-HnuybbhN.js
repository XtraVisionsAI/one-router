const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DhY-29rN.js","assets/route-block-B_A1xBdJ.js","assets/backends--ZcUi5X4.js","assets/backends-CLLt8N6j.js","assets/useApi-ViaiVG_-.js","assets/use-form-item-DgrHZmhA.js","assets/InputNumber-W3KW47sQ.js","assets/Button-DSNNFXd2.js","assets/DataTable-r4E-uZoH.js","assets/FormItem-CcawL2pJ.js","assets/dashboard-Ds_-6f2N.js","assets/keys-0lEPjgJp.js","assets/Statistic-83i-1M9O.js","assets/Spin-CKyYFK8t.js","assets/flags-COoXx5Xu.js","assets/keys-Xree--d-.js","assets/login-XI2yG39w.js","assets/mappings-C7F0tzMn.js","assets/usage-f3KpMkDc.js"])))=>i.map(i=>d[i]);
let Z0, Ff, Ci, Ki, Re, t1, ki, Dg, ty, Bt, kg, Pl, De, ky, Wu, ny, Ro, ey, ev, fy, _r, Ec, Xu, xs, Uu, qu, Ku, Gu, An, Tn, bs, Bn, ys, Nv, tn, mg, Ky, Xy, Gy, eo, Mg, Ga, zo, Vl, ec, tc, Pd, au, kl, gs, Un, xb, Su, ms, yb, po, Fr, im, $u, Gn, Wn, No, ia, Au, qn, Ou, Kn, nr, Oo, Po, un, r1, s1, Jy, Qy, fn, Ju, oc, o1, nn, jy, Zu, Uy, zv, Eo, lv, jg, Cn, Mr, Hv, Pr, En, qe, ws, Cu, _u, Hi, wu, j0, Jv, Br, e1, l1, Io, Ul, Zy, vu, i1, n1, Ar, dy, Yv, Xb, xr, se, Ne, K, ae, ue, ze, Ce, $, Ir, On, hs, ao, Rn, vi, mn, be, so, ns, qy, ke, sr, Wy, Sc, Vy;
let __tla = (async () => {
  (function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver((o) => {
      for (const i of o) if (i.type === "childList") for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function n(o) {
      const i = {};
      return o.integrity && (i.integrity = o.integrity), o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? i.credentials = "include" : o.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
    }
    function r(o) {
      if (o.ep) return;
      o.ep = true;
      const i = n(o);
      fetch(o.href, i);
    }
  })();
  function Vi(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return (n) => n in t;
  }
  const ye = {}, Mn = [], Tt = () => {
  }, aa = () => false, vo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), mo = (e) => e.startsWith("onUpdate:"), Be = Object.assign, Wi = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  }, xf = Object.prototype.hasOwnProperty, ge = (e, t) => xf.call(e, t), ee = Array.isArray, Ln = (e) => Tr(e) === "[object Map]", ca = (e) => Tr(e) === "[object Set]", Ss = (e) => Tr(e) === "[object Date]", re = (e) => typeof e == "function", Oe = (e) => typeof e == "string", at = (e) => typeof e == "symbol", he = (e) => e !== null && typeof e == "object", ua = (e) => (he(e) || re(e)) && re(e.then) && re(e.catch), fa = Object.prototype.toString, Tr = (e) => fa.call(e), wf = (e) => Tr(e).slice(8, -1), da = (e) => Tr(e) === "[object Object]", bo = (e) => Oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rr = Vi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), yo = (e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((n) => t[n] || (t[n] = e(n)));
  }, _f = /-\w/g, Qe = yo((e) => e.replace(_f, (t) => t.slice(1).toUpperCase())), Cf = /\B([A-Z])/g, on = yo((e) => e.replace(Cf, "-$1").toLowerCase()), xo = yo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Vo = yo((e) => e ? `on${xo(e)}` : ""), At = (e, t) => !Object.is(e, t), Wo = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  }, ha = (e, t, n, r = false) => {
    Object.defineProperty(e, t, {
      configurable: true,
      enumerable: false,
      writable: r,
      value: n
    });
  }, Sf = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, Ef = (e) => {
    const t = Oe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
  let Es;
  const wo = () => Es || (Es = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function Ui(e) {
    if (ee(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n], o = Oe(r) ? Of(r) : Ui(r);
        if (o) for (const i in o) t[i] = o[i];
      }
      return t;
    } else if (Oe(e) || he(e)) return e;
  }
  const Rf = /;(?![^(]*\))/g, Af = /:([^]+)/, Tf = /\/\*[^]*?\*\//g;
  function Of(e) {
    const t = {};
    return e.replace(Tf, "").split(Rf).forEach((n) => {
      if (n) {
        const r = n.split(Af);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }), t;
  }
  Ki = function(e) {
    let t = "";
    if (Oe(e)) t = e;
    else if (ee(e)) for (let n = 0; n < e.length; n++) {
      const r = Ki(e[n]);
      r && (t += r + " ");
    }
    else if (he(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  };
  const Pf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", $f = Vi(Pf);
  function pa(e) {
    return !!e || e === "";
  }
  function If(e, t) {
    if (e.length !== t.length) return false;
    let n = true;
    for (let r = 0; n && r < e.length; r++) n = Gi(e[r], t[r]);
    return n;
  }
  function Gi(e, t) {
    if (e === t) return true;
    let n = Ss(e), r = Ss(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : false;
    if (n = at(e), r = at(t), n || r) return e === t;
    if (n = ee(e), r = ee(t), n || r) return n && r ? If(e, t) : false;
    if (n = he(e), r = he(t), n || r) {
      if (!n || !r) return false;
      const o = Object.keys(e).length, i = Object.keys(t).length;
      if (o !== i) return false;
      for (const s in e) {
        const l = e.hasOwnProperty(s), a = t.hasOwnProperty(s);
        if (l && !a || !l && a || !Gi(e[s], t[s])) return false;
      }
    }
    return String(e) === String(t);
  }
  let ga, va, Uo;
  ga = (e) => !!(e && e.__v_isRef === true);
  Ff = (e) => Oe(e) ? e : e == null ? "" : ee(e) || he(e) && (e.toString === fa || !re(e.toString)) ? ga(e) ? Ff(e.value) : JSON.stringify(e, va, 2) : String(e);
  va = (e, t) => ga(t) ? va(e, t.value) : Ln(t) ? {
    [`Map(${t.size})`]: [
      ...t.entries()
    ].reduce((n, [r, o], i) => (n[Uo(r, i) + " =>"] = o, n), {})
  } : ca(t) ? {
    [`Set(${t.size})`]: [
      ...t.values()
    ].map((n) => Uo(n))
  } : at(t) ? Uo(t) : he(t) && !ee(t) && !da(t) ? String(t) : t;
  Uo = (e, t = "") => {
    var n;
    return at(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
  let Ue;
  class ma {
    constructor(t = false) {
      this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = Ue, !t && Ue && (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n = Ue;
        try {
          return Ue = this, t();
        } finally {
          Ue = n;
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = Ue, Ue = this);
    }
    off() {
      this._on > 0 && --this._on === 0 && (Ue = this.prevScope, this.prevScope = void 0);
    }
    stop(t) {
      if (this._active) {
        this._active = false;
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const o = this.parent.scopes.pop();
          o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
        }
        this.parent = void 0;
      }
    }
  }
  function ba(e) {
    return new ma(e);
  }
  function ya() {
    return Ue;
  }
  function Bf(e, t = false) {
    Ue && Ue.cleanups.push(e);
  }
  let xe;
  const Ko = /* @__PURE__ */ new WeakSet();
  class xa {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ue && Ue.active && Ue.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, Ko.has(this) && (Ko.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || _a(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, Rs(this), Ca(this);
      const t = xe, n = pt;
      xe = this, pt = true;
      try {
        return this.fn();
      } finally {
        Sa(this), xe = t, pt = n, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) Yi(t);
        this.deps = this.depsTail = void 0, Rs(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? Ko.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      hi(this) && this.run();
    }
    get dirty() {
      return hi(this);
    }
  }
  let wa = 0, or, ir;
  function _a(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = ir, ir = e;
      return;
    }
    e.next = or, or = e;
  }
  function qi() {
    wa++;
  }
  function Xi() {
    if (--wa > 0) return;
    if (ir) {
      let t = ir;
      for (ir = void 0; t; ) {
        const n = t.next;
        t.next = void 0, t.flags &= -9, t = n;
      }
    }
    let e;
    for (; or; ) {
      let t = or;
      for (or = void 0; t; ) {
        const n = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
        t = n;
      }
    }
    if (e) throw e;
  }
  function Ca(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function Sa(e) {
    let t, n = e.depsTail, r = n;
    for (; r; ) {
      const o = r.prevDep;
      r.version === -1 ? (r === n && (n = o), Yi(r), Mf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
    }
    e.deps = t, e.depsTail = n;
  }
  function hi(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ea(t.dep.computed) || t.dep.version !== t.version)) return true;
    return !!e._dirty;
  }
  function Ea(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === gr) || (e.globalVersion = gr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hi(e)))) return;
    e.flags |= 2;
    const t = e.dep, n = xe, r = pt;
    xe = e, pt = true;
    try {
      Ca(e);
      const o = e.fn(e._value);
      (t.version === 0 || At(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
    } catch (o) {
      throw t.version++, o;
    } finally {
      xe = n, pt = r, Sa(e), e.flags &= -3;
    }
  }
  function Yi(e, t = false) {
    const { dep: n, prevSub: r, nextSub: o } = e;
    if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep) Yi(i, true);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  function Mf(e) {
    const { prevDep: t, nextDep: n } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
  }
  let pt = true;
  const Ra = [];
  function Dt() {
    Ra.push(pt), pt = false;
  }
  function jt() {
    const e = Ra.pop();
    pt = e === void 0 ? true : e;
  }
  function Rs(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const n = xe;
      xe = void 0;
      try {
        t();
      } finally {
        xe = n;
      }
    }
  }
  let gr = 0;
  class Lf {
    constructor(t, n) {
      this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Ji {
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(t) {
      if (!xe || !pt || xe === this.computed) return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== xe) n = this.activeLink = new Lf(xe, this), xe.deps ? (n.prevDep = xe.depsTail, xe.depsTail.nextDep = n, xe.depsTail = n) : xe.deps = xe.depsTail = n, Aa(n);
      else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
        const r = n.nextDep;
        r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = xe.depsTail, n.nextDep = void 0, xe.depsTail.nextDep = n, xe.depsTail = n, xe.deps === n && (xe.deps = r);
      }
      return n;
    }
    trigger(t) {
      this.version++, gr++, this.notify(t);
    }
    notify(t) {
      qi();
      try {
        for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
      } finally {
        Xi();
      }
    }
  }
  function Aa(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) Aa(r);
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
  }
  const Qr = /* @__PURE__ */ new WeakMap(), vn = Symbol(""), pi = Symbol(""), vr = Symbol("");
  function Ke(e, t, n) {
    if (pt && xe) {
      let r = Qr.get(e);
      r || Qr.set(e, r = /* @__PURE__ */ new Map());
      let o = r.get(n);
      o || (r.set(n, o = new Ji()), o.map = r, o.key = n), o.track();
    }
  }
  function Ht(e, t, n, r, o, i) {
    const s = Qr.get(e);
    if (!s) {
      gr++;
      return;
    }
    const l = (a) => {
      a && a.trigger();
    };
    if (qi(), t === "clear") s.forEach(l);
    else {
      const a = ee(e), c = a && bo(n);
      if (a && n === "length") {
        const u = Number(r);
        s.forEach((f, h) => {
          (h === "length" || h === vr || !at(h) && h >= u) && l(f);
        });
      } else switch ((n !== void 0 || s.has(void 0)) && l(s.get(n)), c && l(s.get(vr)), t) {
        case "add":
          a ? c && l(s.get("length")) : (l(s.get(vn)), Ln(e) && l(s.get(pi)));
          break;
        case "delete":
          a || (l(s.get(vn)), Ln(e) && l(s.get(pi)));
          break;
        case "set":
          Ln(e) && l(s.get(vn));
          break;
      }
    }
    Xi();
  }
  function Hf(e, t) {
    const n = Qr.get(e);
    return n && n.get(t);
  }
  function Pn(e) {
    const t = de(e);
    return t === e ? t : (Ke(t, "iterate", vr), lt(e) ? t : t.map(gt));
  }
  function _o(e) {
    return Ke(e = de(e), "iterate", vr), e;
  }
  function Et(e, t) {
    return kt(e) ? Dn(Nt(e) ? gt(t) : t) : gt(t);
  }
  const zf = {
    __proto__: null,
    [Symbol.iterator]() {
      return Go(this, Symbol.iterator, (e) => Et(this, e));
    },
    concat(...e) {
      return Pn(this).concat(...e.map((t) => ee(t) ? Pn(t) : t));
    },
    entries() {
      return Go(this, "entries", (e) => (e[1] = Et(this, e[1]), e));
    },
    every(e, t) {
      return It(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
      return It(this, "filter", e, t, (n) => n.map((r) => Et(this, r)), arguments);
    },
    find(e, t) {
      return It(this, "find", e, t, (n) => Et(this, n), arguments);
    },
    findIndex(e, t) {
      return It(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
      return It(this, "findLast", e, t, (n) => Et(this, n), arguments);
    },
    findLastIndex(e, t) {
      return It(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
      return It(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
      return qo(this, "includes", e);
    },
    indexOf(...e) {
      return qo(this, "indexOf", e);
    },
    join(e) {
      return Pn(this).join(e);
    },
    lastIndexOf(...e) {
      return qo(this, "lastIndexOf", e);
    },
    map(e, t) {
      return It(this, "map", e, t, void 0, arguments);
    },
    pop() {
      return Xn(this, "pop");
    },
    push(...e) {
      return Xn(this, "push", e);
    },
    reduce(e, ...t) {
      return As(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
      return As(this, "reduceRight", e, t);
    },
    shift() {
      return Xn(this, "shift");
    },
    some(e, t) {
      return It(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
      return Xn(this, "splice", e);
    },
    toReversed() {
      return Pn(this).toReversed();
    },
    toSorted(e) {
      return Pn(this).toSorted(e);
    },
    toSpliced(...e) {
      return Pn(this).toSpliced(...e);
    },
    unshift(...e) {
      return Xn(this, "unshift", e);
    },
    values() {
      return Go(this, "values", (e) => Et(this, e));
    }
  };
  function Go(e, t, n) {
    const r = _o(e), o = r[t]();
    return r !== e && !lt(e) && (o._next = o.next, o.next = () => {
      const i = o._next();
      return i.done || (i.value = n(i.value)), i;
    }), o;
  }
  const Nf = Array.prototype;
  function It(e, t, n, r, o, i) {
    const s = _o(e), l = s !== e && !lt(e), a = s[t];
    if (a !== Nf[t]) {
      const f = a.apply(e, i);
      return l ? gt(f) : f;
    }
    let c = n;
    s !== e && (l ? c = function(f, h) {
      return n.call(this, Et(e, f), h, e);
    } : n.length > 2 && (c = function(f, h) {
      return n.call(this, f, h, e);
    }));
    const u = a.call(s, c, r);
    return l && o ? o(u) : u;
  }
  function As(e, t, n, r) {
    const o = _o(e), i = o !== e && !lt(e);
    let s = n, l = false;
    o !== e && (i ? (l = r.length === 0, s = function(c, u, f) {
      return l && (l = false, c = Et(e, c)), n.call(this, c, Et(e, u), f, e);
    }) : n.length > 3 && (s = function(c, u, f) {
      return n.call(this, c, u, f, e);
    }));
    const a = o[t](s, ...r);
    return l ? Et(e, a) : a;
  }
  function qo(e, t, n) {
    const r = de(e);
    Ke(r, "iterate", vr);
    const o = r[t](...n);
    return (o === -1 || o === false) && Co(n[0]) ? (n[0] = de(n[0]), r[t](...n)) : o;
  }
  function Xn(e, t, n = []) {
    Dt(), qi();
    const r = de(e)[t].apply(e, n);
    return Xi(), jt(), r;
  }
  const Df = Vi("__proto__,__v_isRef,__isVue"), Ta = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(at));
  function jf(e) {
    at(e) || (e = String(e));
    const t = de(this);
    return Ke(t, "has", e), t.hasOwnProperty(e);
  }
  class Oa {
    constructor(t = false, n = false) {
      this._isReadonly = t, this._isShallow = n;
    }
    get(t, n, r) {
      if (n === "__v_skip") return t.__v_skip;
      const o = this._isReadonly, i = this._isShallow;
      if (n === "__v_isReactive") return !o;
      if (n === "__v_isReadonly") return o;
      if (n === "__v_isShallow") return i;
      if (n === "__v_raw") return r === (o ? i ? Jf : Fa : i ? Ia : $a).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      const s = ee(t);
      if (!o) {
        let a;
        if (s && (a = zf[n])) return a;
        if (n === "hasOwnProperty") return jf;
      }
      const l = Reflect.get(t, n, Re(t) ? t : r);
      if ((at(n) ? Ta.has(n) : Df(n)) || (o || Ke(t, "get", n), i)) return l;
      if (Re(l)) {
        const a = s && bo(n) ? l : l.value;
        return o && he(a) ? eo(a) : a;
      }
      return he(l) ? o ? eo(l) : En(l) : l;
    }
  }
  class Pa extends Oa {
    constructor(t = false) {
      super(false, t);
    }
    set(t, n, r, o) {
      let i = t[n];
      const s = ee(t) && bo(n);
      if (!this._isShallow) {
        const c = kt(i);
        if (!lt(r) && !kt(r) && (i = de(i), r = de(r)), !s && Re(i) && !Re(r)) return c || (i.value = r), true;
      }
      const l = s ? Number(n) < t.length : ge(t, n), a = Reflect.set(t, n, r, Re(t) ? t : o);
      return t === de(o) && (l ? At(r, i) && Ht(t, "set", n, r) : Ht(t, "add", n, r)), a;
    }
    deleteProperty(t, n) {
      const r = ge(t, n);
      t[n];
      const o = Reflect.deleteProperty(t, n);
      return o && r && Ht(t, "delete", n, void 0), o;
    }
    has(t, n) {
      const r = Reflect.has(t, n);
      return (!at(n) || !Ta.has(n)) && Ke(t, "has", n), r;
    }
    ownKeys(t) {
      return Ke(t, "iterate", ee(t) ? "length" : vn), Reflect.ownKeys(t);
    }
  }
  class kf extends Oa {
    constructor(t = false) {
      super(true, t);
    }
    set(t, n) {
      return true;
    }
    deleteProperty(t, n) {
      return true;
    }
  }
  const Vf = new Pa(), Wf = new kf(), Uf = new Pa(true);
  const gi = (e) => e, Lr = (e) => Reflect.getPrototypeOf(e);
  function Kf(e, t, n) {
    return function(...r) {
      const o = this.__v_raw, i = de(o), s = Ln(i), l = e === "entries" || e === Symbol.iterator && s, a = e === "keys" && s, c = o[e](...r), u = n ? gi : t ? Dn : gt;
      return !t && Ke(i, "iterate", a ? pi : vn), Be(Object.create(c), {
        next() {
          const { value: f, done: h } = c.next();
          return h ? {
            value: f,
            done: h
          } : {
            value: l ? [
              u(f[0]),
              u(f[1])
            ] : u(f),
            done: h
          };
        }
      });
    };
  }
  function Hr(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Gf(e, t) {
    const n = {
      get(o) {
        const i = this.__v_raw, s = de(i), l = de(o);
        e || (At(o, l) && Ke(s, "get", o), Ke(s, "get", l));
        const { has: a } = Lr(s), c = t ? gi : e ? Dn : gt;
        if (a.call(s, o)) return c(i.get(o));
        if (a.call(s, l)) return c(i.get(l));
        i !== s && i.get(o);
      },
      get size() {
        const o = this.__v_raw;
        return !e && Ke(de(o), "iterate", vn), o.size;
      },
      has(o) {
        const i = this.__v_raw, s = de(i), l = de(o);
        return e || (At(o, l) && Ke(s, "has", o), Ke(s, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
      },
      forEach(o, i) {
        const s = this, l = s.__v_raw, a = de(l), c = t ? gi : e ? Dn : gt;
        return !e && Ke(a, "iterate", vn), l.forEach((u, f) => o.call(i, c(u), c(f), s));
      }
    };
    return Be(n, e ? {
      add: Hr("add"),
      set: Hr("set"),
      delete: Hr("delete"),
      clear: Hr("clear")
    } : {
      add(o) {
        const i = de(this), s = Lr(i), l = de(o), a = !t && !lt(o) && !kt(o) ? l : o;
        return s.has.call(i, a) || At(o, a) && s.has.call(i, o) || At(l, a) && s.has.call(i, l) || (i.add(a), Ht(i, "add", a, a)), this;
      },
      set(o, i) {
        !t && !lt(i) && !kt(i) && (i = de(i));
        const s = de(this), { has: l, get: a } = Lr(s);
        let c = l.call(s, o);
        c || (o = de(o), c = l.call(s, o));
        const u = a.call(s, o);
        return s.set(o, i), c ? At(i, u) && Ht(s, "set", o, i) : Ht(s, "add", o, i), this;
      },
      delete(o) {
        const i = de(this), { has: s, get: l } = Lr(i);
        let a = s.call(i, o);
        a || (o = de(o), a = s.call(i, o)), l && l.call(i, o);
        const c = i.delete(o);
        return a && Ht(i, "delete", o, void 0), c;
      },
      clear() {
        const o = de(this), i = o.size !== 0, s = o.clear();
        return i && Ht(o, "clear", void 0, void 0), s;
      }
    }), [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ].forEach((o) => {
      n[o] = Kf(o, e, t);
    }), n;
  }
  function Zi(e, t) {
    const n = Gf(e, t);
    return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(ge(n, o) && o in r ? n : r, o, i);
  }
  const qf = {
    get: Zi(false, false)
  }, Xf = {
    get: Zi(false, true)
  }, Yf = {
    get: Zi(true, false)
  };
  const $a = /* @__PURE__ */ new WeakMap(), Ia = /* @__PURE__ */ new WeakMap(), Fa = /* @__PURE__ */ new WeakMap(), Jf = /* @__PURE__ */ new WeakMap();
  function Zf(e) {
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
  function Qf(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Zf(wf(e));
  }
  En = function(e) {
    return kt(e) ? e : Qi(e, false, Vf, qf, $a);
  };
  function Ba(e) {
    return Qi(e, false, Uf, Xf, Ia);
  }
  eo = function(e) {
    return Qi(e, true, Wf, Yf, Fa);
  };
  function Qi(e, t, n, r, o) {
    if (!he(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = Qf(e);
    if (i === 0) return e;
    const s = o.get(e);
    if (s) return s;
    const l = new Proxy(e, i === 2 ? r : n);
    return o.set(e, l), l;
  }
  function Nt(e) {
    return kt(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function kt(e) {
    return !!(e && e.__v_isReadonly);
  }
  function lt(e) {
    return !!(e && e.__v_isShallow);
  }
  function Co(e) {
    return e ? !!e.__v_raw : false;
  }
  function de(e) {
    const t = e && e.__v_raw;
    return t ? de(t) : e;
  }
  function es(e) {
    return !ge(e, "__v_skip") && Object.isExtensible(e) && ha(e, "__v_skip", true), e;
  }
  const gt = (e) => he(e) ? En(e) : e, Dn = (e) => he(e) ? eo(e) : e;
  Re = function(e) {
    return e ? e.__v_isRef === true : false;
  };
  be = function(e) {
    return Ma(e, false);
  };
  function ts(e) {
    return Ma(e, true);
  }
  function Ma(e, t) {
    return Re(e) ? e : new ed(e, t);
  }
  class ed {
    constructor(t, n) {
      this.dep = new Ji(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : de(t), this._value = n ? t : gt(t), this.__v_isShallow = n;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const n = this._rawValue, r = this.__v_isShallow || lt(t) || kt(t);
      t = r ? t : de(t), At(t, n) && (this._rawValue = t, this._value = r ? t : gt(t), this.dep.trigger());
    }
  }
  mn = function(e) {
    return Re(e) ? e.value : e;
  };
  const td = {
    get: (e, t, n) => t === "__v_raw" ? e : mn(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
      const o = e[t];
      return Re(o) && !Re(n) ? (o.value = n, true) : Reflect.set(e, t, n, r);
    }
  };
  function La(e) {
    return Nt(e) ? e : new Proxy(e, td);
  }
  function nd(e) {
    const t = ee(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = Ha(e, n);
    return t;
  }
  class rd {
    constructor(t, n, r) {
      this._object = t, this._defaultValue = r, this.__v_isRef = true, this._value = void 0, this._key = at(n) ? n : String(n), this._raw = de(t);
      let o = true, i = t;
      if (!ee(t) || at(this._key) || !bo(this._key)) do
        o = !Co(i) || lt(i);
      while (o && (i = i.__v_raw));
      this._shallow = o;
    }
    get value() {
      let t = this._object[this._key];
      return this._shallow && (t = mn(t)), this._value = t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
      if (this._shallow && Re(this._raw[this._key])) {
        const n = this._object[this._key];
        if (Re(n)) {
          n.value = t;
          return;
        }
      }
      this._object[this._key] = t;
    }
    get dep() {
      return Hf(this._raw, this._key);
    }
  }
  class od {
    constructor(t) {
      this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
    }
    get value() {
      return this._value = this._getter();
    }
  }
  ns = function(e, t, n) {
    return Re(e) ? e : re(e) ? new od(e) : he(e) && arguments.length > 1 ? Ha(e, t, n) : be(e);
  };
  function Ha(e, t, n) {
    return new rd(e, t, n);
  }
  class id {
    constructor(t, n, r) {
      this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ji(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = gr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && xe !== this) return _a(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return Ea(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  }
  function sd(e, t, n = false) {
    let r, o;
    return re(e) ? r = e : (r = e.get, o = e.set), new id(r, o, n);
  }
  const zr = {}, to = /* @__PURE__ */ new WeakMap();
  let cn;
  function ld(e, t = false, n = cn) {
    if (n) {
      let r = to.get(n);
      r || to.set(n, r = []), r.push(e);
    }
  }
  function ad(e, t, n = ye) {
    const { immediate: r, deep: o, once: i, scheduler: s, augmentJob: l, call: a } = n, c = (I) => o ? I : lt(I) || o === false || o === 0 ? zt(I, 1) : zt(I);
    let u, f, h, v, p = false, b = false;
    if (Re(e) ? (f = () => e.value, p = lt(e)) : Nt(e) ? (f = () => c(e), p = true) : ee(e) ? (b = true, p = e.some((I) => Nt(I) || lt(I)), f = () => e.map((I) => {
      if (Re(I)) return I.value;
      if (Nt(I)) return c(I);
      if (re(I)) return a ? a(I, 2) : I();
    })) : re(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
      if (h) {
        Dt();
        try {
          h();
        } finally {
          jt();
        }
      }
      const I = cn;
      cn = u;
      try {
        return a ? a(e, 3, [
          v
        ]) : e(v);
      } finally {
        cn = I;
      }
    } : f = Tt, t && o) {
      const I = f, j = o === true ? 1 / 0 : o;
      f = () => zt(I(), j);
    }
    const _ = ya(), E = () => {
      u.stop(), _ && _.active && Wi(_.effects, u);
    };
    if (i && t) {
      const I = t;
      t = (...j) => {
        I(...j), E();
      };
    }
    let x = b ? new Array(e.length).fill(zr) : zr;
    const B = (I) => {
      if (!(!(u.flags & 1) || !u.dirty && !I)) if (t) {
        const j = u.run();
        if (o || p || (b ? j.some((W, A) => At(W, x[A])) : At(j, x))) {
          h && h();
          const W = cn;
          cn = u;
          try {
            const A = [
              j,
              x === zr ? void 0 : b && x[0] === zr ? [] : x,
              v
            ];
            x = j, a ? a(t, 3, A) : t(...A);
          } finally {
            cn = W;
          }
        }
      } else u.run();
    };
    return l && l(B), u = new xa(f), u.scheduler = s ? () => s(B, false) : B, v = (I) => ld(I, false, u), h = u.onStop = () => {
      const I = to.get(u);
      if (I) {
        if (a) a(I, 4);
        else for (const j of I) j();
        to.delete(u);
      }
    }, t ? r ? B(true) : x = u.run() : s ? s(B.bind(null, true), true) : u.run(), E.pause = u.pause.bind(u), E.resume = u.resume.bind(u), E.stop = E, E;
  }
  function zt(e, t = 1 / 0, n) {
    if (t <= 0 || !he(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
    if (n.set(e, t), t--, Re(e)) zt(e.value, t, n);
    else if (ee(e)) for (let r = 0; r < e.length; r++) zt(e[r], t, n);
    else if (ca(e) || Ln(e)) e.forEach((r) => {
      zt(r, t, n);
    });
    else if (da(e)) {
      for (const r in e) zt(e[r], t, n);
      for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && zt(e[r], t, n);
    }
    return e;
  }
  function Or(e, t, n, r) {
    try {
      return r ? e(...r) : e();
    } catch (o) {
      So(o, t, n);
    }
  }
  function vt(e, t, n, r) {
    if (re(e)) {
      const o = Or(e, t, n, r);
      return o && ua(o) && o.catch((i) => {
        So(i, t, n);
      }), o;
    }
    if (ee(e)) {
      const o = [];
      for (let i = 0; i < e.length; i++) o.push(vt(e[i], t, n, r));
      return o;
    }
  }
  function So(e, t, n, r = true) {
    const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: s } = t && t.appContext.config || ye;
    if (t) {
      let l = t.parent;
      const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l; ) {
        const u = l.ec;
        if (u) {
          for (let f = 0; f < u.length; f++) if (u[f](e, a, c) === false) return;
        }
        l = l.parent;
      }
      if (i) {
        Dt(), Or(i, null, 10, [
          e,
          a,
          c
        ]), jt();
        return;
      }
    }
    cd(e, n, o, r, s);
  }
  function cd(e, t, n, r = true, o = false) {
    if (o) throw e;
    console.error(e);
  }
  const Ze = [];
  let Ct = -1;
  const Hn = [];
  let Zt = null, In = 0;
  const za = Promise.resolve();
  let no = null;
  Eo = function(e) {
    const t = no || za;
    return e ? t.then(this ? e.bind(this) : e) : t;
  };
  function ud(e) {
    let t = Ct + 1, n = Ze.length;
    for (; t < n; ) {
      const r = t + n >>> 1, o = Ze[r], i = mr(o);
      i < e || i === e && o.flags & 2 ? t = r + 1 : n = r;
    }
    return t;
  }
  function rs(e) {
    if (!(e.flags & 1)) {
      const t = mr(e), n = Ze[Ze.length - 1];
      !n || !(e.flags & 2) && t >= mr(n) ? Ze.push(e) : Ze.splice(ud(t), 0, e), e.flags |= 1, Na();
    }
  }
  function Na() {
    no || (no = za.then(ja));
  }
  function fd(e) {
    ee(e) ? Hn.push(...e) : Zt && e.id === -1 ? Zt.splice(In + 1, 0, e) : e.flags & 1 || (Hn.push(e), e.flags |= 1), Na();
  }
  function Ts(e, t, n = Ct + 1) {
    for (; n < Ze.length; n++) {
      const r = Ze[n];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        Ze.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
      }
    }
  }
  function Da(e) {
    if (Hn.length) {
      const t = [
        ...new Set(Hn)
      ].sort((n, r) => mr(n) - mr(r));
      if (Hn.length = 0, Zt) {
        Zt.push(...t);
        return;
      }
      for (Zt = t, In = 0; In < Zt.length; In++) {
        const n = Zt[In];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      Zt = null, In = 0;
    }
  }
  const mr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
  function ja(e) {
    try {
      for (Ct = 0; Ct < Ze.length; Ct++) {
        const t = Ze[Ct];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Or(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Ct < Ze.length; Ct++) {
        const t = Ze[Ct];
        t && (t.flags &= -2);
      }
      Ct = -1, Ze.length = 0, Da(), no = null, (Ze.length || Hn.length) && ja();
    }
  }
  let je = null, ka = null;
  function ro(e) {
    const t = je;
    return je = e, ka = e && e.type.__scopeId || null, t;
  }
  vi = function(e, t = je, n) {
    if (!t || e._n) return e;
    const r = (...o) => {
      r._d && lo(-1);
      const i = ro(t);
      let s;
      try {
        s = e(...o);
      } finally {
        ro(i), r._d && lo(1);
      }
      return s;
    };
    return r._n = true, r._c = true, r._d = true, r;
  };
  jy = function(e, t) {
    if (je === null) return e;
    const n = Fo(je), r = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
      let [i, s, l, a = ye] = t[o];
      i && (re(i) && (i = {
        mounted: i,
        updated: i
      }), i.deep && zt(s), r.push({
        dir: i,
        instance: n,
        value: s,
        oldValue: void 0,
        arg: l,
        modifiers: a
      }));
    }
    return e;
  };
  function sn(e, t, n, r) {
    const o = e.dirs, i = t && t.dirs;
    for (let s = 0; s < o.length; s++) {
      const l = o[s];
      i && (l.oldValue = i[s].value);
      let a = l.dir[r];
      a && (Dt(), vt(a, n, 8, [
        e.el,
        l,
        e,
        t
      ]), jt());
    }
  }
  tn = function(e, t) {
    if (Xe) {
      let n = Xe.provides;
      const r = Xe.parent && Xe.parent.provides;
      r === n && (n = Xe.provides = Object.create(r)), n[e] = t;
    }
  };
  Ce = function(e, t, n = false) {
    const r = Pr();
    if (r || bn) {
      let o = bn ? bn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
      if (o && e in o) return o[e];
      if (arguments.length > 1) return n && re(t) ? t.call(r && r.proxy) : t;
    }
  };
  function dd() {
    return !!(Pr() || bn);
  }
  const hd = Symbol.for("v-scx"), pd = () => Ce(hd);
  Ro = function(e, t) {
    return os(e, null, t);
  };
  sr = function(e, t, n) {
    return os(e, t, n);
  };
  function os(e, t, n = ye) {
    const { immediate: r, deep: o, flush: i, once: s } = n, l = Be({}, n), a = t && r || !t && i !== "post";
    let c;
    if (wr) {
      if (i === "sync") {
        const v = pd();
        c = v.__watcherHandles || (v.__watcherHandles = []);
      } else if (!a) {
        const v = () => {
        };
        return v.stop = Tt, v.resume = Tt, v.pause = Tt, v;
      }
    }
    const u = Xe;
    l.call = (v, p, b) => vt(v, u, p, b);
    let f = false;
    i === "post" ? l.scheduler = (v) => {
      We(v, u && u.suspense);
    } : i !== "sync" && (f = true, l.scheduler = (v, p) => {
      p ? v() : rs(v);
    }), l.augmentJob = (v) => {
      t && (v.flags |= 4), f && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
    };
    const h = ad(e, t, l);
    return wr && (c ? c.push(h) : a && h()), h;
  }
  function gd(e, t, n) {
    const r = this.proxy, o = Oe(e) ? e.includes(".") ? Va(r, e) : () => r[e] : e.bind(r, r);
    let i;
    re(t) ? i = t : (i = t.handler, n = t);
    const s = $r(this), l = os(o, i.bind(r), n);
    return s(), l;
  }
  function Va(e, t) {
    const n = t.split(".");
    return () => {
      let r = e;
      for (let o = 0; o < n.length && r; o++) r = r[n[o]];
      return r;
    };
  }
  const Wa = Symbol("_vte"), Ua = (e) => e.__isTeleport, lr = (e) => e && (e.disabled || e.disabled === ""), vd = (e) => e && (e.defer || e.defer === ""), Os = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ps = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, mi = (e, t) => {
    const n = e && e.to;
    return Oe(n) ? t ? t(n) : null : n;
  }, Ka = {
    name: "Teleport",
    __isTeleport: true,
    process(e, t, n, r, o, i, s, l, a, c) {
      const { mc: u, pc: f, pbc: h, o: { insert: v, querySelector: p, createText: b, createComment: _ } } = c, E = lr(t.props);
      let { shapeFlag: x, children: B, dynamicChildren: I } = t;
      if (e == null) {
        const j = t.el = b(""), W = t.anchor = b("");
        v(j, n, r), v(W, n, r);
        const A = (y, M) => {
          x & 16 && u(B, y, M, o, i, s, l, a);
        }, w = () => {
          const y = t.target = mi(t.props, p), M = bi(y, t, b, v);
          y && (s !== "svg" && Os(y) ? s = "svg" : s !== "mathml" && Ps(y) && (s = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add(y), E || (A(y, M), qr(t, false)));
        };
        E && (A(n, W), qr(t, true)), vd(t.props) || i && i.pendingBranch ? (t.el.__isMounted = false, We(() => {
          t.el.__isMounted === false && (w(), delete t.el.__isMounted);
        }, i)) : w();
      } else {
        t.el = e.el, t.targetStart = e.targetStart;
        const j = t.anchor = e.anchor, W = t.target = e.target, A = t.targetAnchor = e.targetAnchor;
        if (e.el.__isMounted === false) {
          We(() => {
            Ka.process(e, t, n, r, o, i, s, l, a, c);
          }, i);
          return;
        }
        const w = lr(e.props), y = w ? n : W, M = w ? j : A;
        if (s === "svg" || Os(W) ? s = "svg" : (s === "mathml" || Ps(W)) && (s = "mathml"), I ? (h(e.dynamicChildren, I, y, o, i, s, l), as(e, t, true)) : a || f(e, t, y, M, o, i, s, l, false), E) w ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Nr(t, n, j, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const V = t.target = mi(t.props, p);
          V && Nr(t, V, null, c, 0);
        } else w && Nr(t, W, A, c, 1);
        qr(t, E);
      }
    },
    remove(e, t, n, { um: r, o: { remove: o } }, i) {
      const { shapeFlag: s, children: l, anchor: a, targetStart: c, targetAnchor: u, target: f, props: h } = e;
      if (f && (o(c), o(u)), i && o(a), s & 16) {
        const v = i || !lr(h);
        for (let p = 0; p < l.length; p++) {
          const b = l[p];
          r(b, t, n, v, !!b.dynamicChildren);
        }
      }
    },
    move: Nr,
    hydrate: md
  };
  function Nr(e, t, n, { o: { insert: r }, m: o }, i = 2) {
    i === 0 && r(e.targetAnchor, t, n);
    const { el: s, anchor: l, shapeFlag: a, children: c, props: u } = e, f = i === 2;
    if (f && r(s, t, n), (!f || lr(u)) && a & 16) for (let h = 0; h < c.length; h++) o(c[h], t, n, 2);
    f && r(l, t, n);
  }
  function md(e, t, n, r, o, i, { o: { nextSibling: s, parentNode: l, querySelector: a, insert: c, createText: u } }, f) {
    function h(_, E) {
      let x = E;
      for (; x; ) {
        if (x && x.nodeType === 8) {
          if (x.data === "teleport start anchor") t.targetStart = x;
          else if (x.data === "teleport anchor") {
            t.targetAnchor = x, _._lpa = t.targetAnchor && s(t.targetAnchor);
            break;
          }
        }
        x = s(x);
      }
    }
    function v(_, E) {
      E.anchor = f(s(_), E, l(_), n, r, o, i);
    }
    const p = t.target = mi(t.props, a), b = lr(t.props);
    if (p) {
      const _ = p._lpa || p.firstChild;
      t.shapeFlag & 16 && (b ? (v(e, t), h(p, _), t.targetAnchor || bi(p, t, u, c, l(e) === p ? e : null)) : (t.anchor = s(e), h(p, _), t.targetAnchor || bi(p, t, u, c), f(_ && s(_), t, p, n, r, o, i))), qr(t, b);
    } else b && t.shapeFlag & 16 && (v(e, t), t.targetStart = e, t.targetAnchor = s(e));
    return t.anchor && s(t.anchor);
  }
  Ga = Ka;
  function qr(e, t) {
    const n = e.ctx;
    if (n && n.ut) {
      let r, o;
      for (t ? (r = e.el, o = e.anchor) : (r = e.targetStart, o = e.targetAnchor); r && r !== o; ) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
      n.ut();
    }
  }
  function bi(e, t, n, r, o = null) {
    const i = t.targetStart = n(""), s = t.targetAnchor = n("");
    return i[Wa] = s, e && (r(i, e, o), r(s, e, o)), s;
  }
  const St = Symbol("_leaveCb"), Yn = Symbol("_enterCb");
  function qa() {
    const e = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return Rn(() => {
      e.isMounted = true;
    }), Po(() => {
      e.isUnmounting = true;
    }), e;
  }
  const ut = [
    Function,
    Array
  ], Xa = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ut,
    onEnter: ut,
    onAfterEnter: ut,
    onEnterCancelled: ut,
    onBeforeLeave: ut,
    onLeave: ut,
    onAfterLeave: ut,
    onLeaveCancelled: ut,
    onBeforeAppear: ut,
    onAppear: ut,
    onAfterAppear: ut,
    onAppearCancelled: ut
  }, Ya = (e) => {
    const t = e.subTree;
    return t.component ? Ya(t.component) : t;
  }, bd = {
    name: "BaseTransition",
    props: Xa,
    setup(e, { slots: t }) {
      const n = Pr(), r = qa();
      return () => {
        const o = t.default && is(t.default(), true);
        if (!o || !o.length) return;
        const i = Ja(o), s = de(e), { mode: l } = s;
        if (r.isLeaving) return Xo(i);
        const a = $s(i);
        if (!a) return Xo(i);
        let c = br(a, s, r, n, (f) => c = f);
        a.type !== qe && _n(a, c);
        let u = n.subTree && $s(n.subTree);
        if (u && u.type !== qe && !dn(u, a) && Ya(n).type !== qe) {
          let f = br(u, s, r, n);
          if (_n(u, f), l === "out-in" && a.type !== qe) return r.isLeaving = true, f.afterLeave = () => {
            r.isLeaving = false, n.job.flags & 8 || n.update(), delete f.afterLeave, u = void 0;
          }, Xo(i);
          l === "in-out" && a.type !== qe ? f.delayLeave = (h, v, p) => {
            const b = Za(r, u);
            b[String(u.key)] = u, h[St] = () => {
              v(), h[St] = void 0, delete c.delayedLeave, u = void 0;
            }, c.delayedLeave = () => {
              p(), delete c.delayedLeave, u = void 0;
            };
          } : u = void 0;
        } else u && (u = void 0);
        return i;
      };
    }
  };
  function Ja(e) {
    let t = e[0];
    if (e.length > 1) {
      for (const n of e) if (n.type !== qe) {
        t = n;
        break;
      }
    }
    return t;
  }
  const yd = bd;
  function Za(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
  }
  function br(e, t, n, r, o) {
    const { appear: i, mode: s, persisted: l = false, onBeforeEnter: a, onEnter: c, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: h, onLeave: v, onAfterLeave: p, onLeaveCancelled: b, onBeforeAppear: _, onAppear: E, onAfterAppear: x, onAppearCancelled: B } = t, I = String(e.key), j = Za(n, e), W = (y, M) => {
      y && vt(y, r, 9, M);
    }, A = (y, M) => {
      const V = M[1];
      W(y, M), ee(y) ? y.every((F) => F.length <= 1) && V() : y.length <= 1 && V();
    }, w = {
      mode: s,
      persisted: l,
      beforeEnter(y) {
        let M = a;
        if (!n.isMounted) if (i) M = _ || a;
        else return;
        y[St] && y[St](true);
        const V = j[I];
        V && dn(e, V) && V.el[St] && V.el[St](), W(M, [
          y
        ]);
      },
      enter(y) {
        if (j[I] === e) return;
        let M = c, V = u, F = f;
        if (!n.isMounted) if (i) M = E || c, V = x || u, F = B || f;
        else return;
        let Q = false;
        y[Yn] = (fe) => {
          Q || (Q = true, fe ? W(F, [
            y
          ]) : W(V, [
            y
          ]), w.delayedLeave && w.delayedLeave(), y[Yn] = void 0);
        };
        const ie = y[Yn].bind(null, false);
        M ? A(M, [
          y,
          ie
        ]) : ie();
      },
      leave(y, M) {
        const V = String(e.key);
        if (y[Yn] && y[Yn](true), n.isUnmounting) return M();
        W(h, [
          y
        ]);
        let F = false;
        y[St] = (ie) => {
          F || (F = true, M(), ie ? W(b, [
            y
          ]) : W(p, [
            y
          ]), y[St] = void 0, j[V] === e && delete j[V]);
        };
        const Q = y[St].bind(null, false);
        j[V] = e, v ? A(v, [
          y,
          Q
        ]) : Q();
      },
      clone(y) {
        const M = br(y, t, n, r, o);
        return o && o(M), M;
      }
    };
    return w;
  }
  function Xo(e) {
    if (Ao(e)) return e = nn(e), e.children = null, e;
  }
  function $s(e) {
    if (!Ao(e)) return Ua(e.type) && e.children ? Ja(e.children) : e;
    if (e.component) return e.component.subTree;
    const { shapeFlag: t, children: n } = e;
    if (n) {
      if (t & 16) return n[0];
      if (t & 32 && re(n.default)) return n.default();
    }
  }
  function _n(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, _n(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  function is(e, t = false, n) {
    let r = [], o = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : i);
      s.type === De ? (s.patchFlag & 128 && o++, r = r.concat(is(s.children, t, l))) : (t || s.type !== qe) && r.push(l != null ? nn(s, {
        key: l
      }) : s);
    }
    if (o > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
  }
  Ne = function(e, t) {
    return re(e) ? Be({
      name: e.name
    }, t, {
      setup: e
    }) : e;
  };
  function Qa(e) {
    e.ids = [
      e.ids[0] + e.ids[2]++ + "-",
      0,
      0
    ];
  }
  function Is(e, t) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
  }
  const oo = /* @__PURE__ */ new WeakMap();
  function ar(e, t, n, r, o = false) {
    if (ee(e)) {
      e.forEach((b, _) => ar(b, t && (ee(t) ? t[_] : t), n, r, o));
      return;
    }
    if (zn(r) && !o) {
      r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ar(e, t, n, r.component.subTree);
      return;
    }
    const i = r.shapeFlag & 4 ? Fo(r.component) : r.el, s = o ? null : i, { i: l, r: a } = e, c = t && t.r, u = l.refs === ye ? l.refs = {} : l.refs, f = l.setupState, h = de(f), v = f === ye ? aa : (b) => Is(u, b) ? false : ge(h, b), p = (b, _) => !(_ && Is(u, _));
    if (c != null && c !== a) {
      if (Fs(t), Oe(c)) u[c] = null, v(c) && (f[c] = null);
      else if (Re(c)) {
        const b = t;
        p(c, b.k) && (c.value = null), b.k && (u[b.k] = null);
      }
    }
    if (re(a)) Or(a, l, 12, [
      s,
      u
    ]);
    else {
      const b = Oe(a), _ = Re(a);
      if (b || _) {
        const E = () => {
          if (e.f) {
            const x = b ? v(a) ? f[a] : u[a] : p() || !e.k ? a.value : u[e.k];
            if (o) ee(x) && Wi(x, i);
            else if (ee(x)) x.includes(i) || x.push(i);
            else if (b) u[a] = [
              i
            ], v(a) && (f[a] = u[a]);
            else {
              const B = [
                i
              ];
              p(a, e.k) && (a.value = B), e.k && (u[e.k] = B);
            }
          } else b ? (u[a] = s, v(a) && (f[a] = s)) : _ && (p(a, e.k) && (a.value = s), e.k && (u[e.k] = s));
        };
        if (s) {
          const x = () => {
            E(), oo.delete(e);
          };
          x.id = -1, oo.set(e, x), We(x, n);
        } else Fs(e), E();
      }
    }
  }
  function Fs(e) {
    const t = oo.get(e);
    t && (t.flags |= 8, oo.delete(e));
  }
  wo().requestIdleCallback;
  wo().cancelIdleCallback;
  const zn = (e) => !!e.type.__asyncLoader, Ao = (e) => e.type.__isKeepAlive;
  ec = function(e, t) {
    nc(e, "a", t);
  };
  tc = function(e, t) {
    nc(e, "da", t);
  };
  function nc(e, t, n = Xe) {
    const r = e.__wdc || (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
    if (To(t, r, n), n) {
      let o = n.parent;
      for (; o && o.parent; ) Ao(o.parent.vnode) && xd(r, t, n, o), o = o.parent;
    }
  }
  function xd(e, t, n, r) {
    const o = To(t, e, r, true);
    oc(() => {
      Wi(r[t], o);
    }, n);
  }
  function To(e, t, n = Xe, r = false) {
    if (n) {
      const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...s) => {
        Dt();
        const l = $r(n), a = vt(t, n, e, s);
        return l(), jt(), a;
      });
      return r ? o.unshift(i) : o.push(i), i;
    }
  }
  let Vt, wd, rc, _d, Cd, Sd;
  Vt = (e) => (t, n = Xe) => {
    (!wr || e === "sp") && To(e, (...r) => t(...r), n);
  };
  Oo = Vt("bm");
  Rn = Vt("m");
  wd = Vt("bu");
  rc = Vt("u");
  Po = Vt("bum");
  oc = Vt("um");
  _d = Vt("sp");
  Cd = Vt("rtg");
  Sd = Vt("rtc");
  function Ed(e, t = Xe) {
    To("ec", e, t);
  }
  const Rd = "components";
  function Ad(e, t) {
    return Od(Rd, e, true, t) || e;
  }
  const Td = Symbol.for("v-ndc");
  function Od(e, t, n = true, r = false) {
    const o = je || Xe;
    if (o) {
      const i = o.type;
      {
        const l = hh(i, false);
        if (l && (l === t || l === Qe(t) || l === xo(Qe(t)))) return i;
      }
      const s = Bs(o[e] || i[e], t) || Bs(o.appContext[e], t);
      return !s && r ? i : s;
    }
  }
  function Bs(e, t) {
    return e && (e[t] || e[Qe(t)] || e[xo(Qe(t))]);
  }
  ky = function(e, t, n, r) {
    let o;
    const i = n, s = ee(e);
    if (s || Oe(e)) {
      const l = s && Nt(e);
      let a = false, c = false;
      l && (a = !lt(e), c = kt(e), e = _o(e)), o = new Array(e.length);
      for (let u = 0, f = e.length; u < f; u++) o[u] = t(a ? c ? Dn(gt(e[u])) : gt(e[u]) : e[u], u, void 0, i);
    } else if (typeof e == "number") {
      o = new Array(e);
      for (let l = 0; l < e; l++) o[l] = t(l + 1, l, void 0, i);
    } else if (he(e)) if (e[Symbol.iterator]) o = Array.from(e, (l, a) => t(l, a, void 0, i));
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        o[a] = t(e[u], u, a, i);
      }
    }
    else o = [];
    return o;
  };
  Pd = function(e, t, n = {}, r, o) {
    if (je.ce || je.parent && zn(je.parent) && je.parent.ce) {
      const c = Object.keys(n).length > 0;
      return so(), ao(De, null, [
        ke("slot", n, r)
      ], c ? -2 : 64);
    }
    let i = e[t];
    i && i._c && (i._d = false), so();
    const s = i && ic(i(n)), l = n.key || s && s.key, a = ao(De, {
      key: (l && !at(l) ? l : `_${t}`) + (!s && r ? "_fb" : "")
    }, s || [], s && e._ === 1 ? 64 : -2);
    return a.scopeId && (a.slotScopeIds = [
      a.scopeId + "-s"
    ]), i && i._c && (i._d = true), a;
  };
  function ic(e) {
    return e.some((t) => xr(t) ? !(t.type === qe || t.type === De && !ic(t.children)) : true) ? e : null;
  }
  const yi = (e) => e ? Rc(e) ? Fo(e) : yi(e.parent) : null, cr = Be(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => yi(e.parent),
    $root: (e) => yi(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => lc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      rs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Eo.bind(e.proxy)),
    $watch: (e) => gd.bind(e)
  }), Yo = (e, t) => e !== ye && !e.__isScriptSetup && ge(e, t), $d = {
    get({ _: e }, t) {
      if (t === "__v_skip") return true;
      const { ctx: n, setupState: r, data: o, props: i, accessCache: s, type: l, appContext: a } = e;
      if (t[0] !== "$") {
        const h = s[t];
        if (h !== void 0) switch (h) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
        else {
          if (Yo(r, t)) return s[t] = 1, r[t];
          if (o !== ye && ge(o, t)) return s[t] = 2, o[t];
          if (ge(i, t)) return s[t] = 3, i[t];
          if (n !== ye && ge(n, t)) return s[t] = 4, n[t];
          xi && (s[t] = 0);
        }
      }
      const c = cr[t];
      let u, f;
      if (c) return t === "$attrs" && Ke(e.attrs, "get", ""), c(e);
      if ((u = l.__cssModules) && (u = u[t])) return u;
      if (n !== ye && ge(n, t)) return s[t] = 4, n[t];
      if (f = a.config.globalProperties, ge(f, t)) return f[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: i } = e;
      return Yo(o, t) ? (o[t] = n, true) : r !== ye && ge(r, t) ? (r[t] = n, true) : ge(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = n, true);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: i, type: s } }, l) {
      let a;
      return !!(n[l] || e !== ye && l[0] !== "$" && ge(e, l) || Yo(t, l) || ge(i, l) || ge(r, l) || ge(cr, l) || ge(o.config.globalProperties, l) || (a = s.__cssModules) && a[l]);
    },
    defineProperty(e, t, n) {
      return n.get != null ? e._.accessCache[t] = 0 : ge(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
    }
  };
  function Ms(e) {
    return ee(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
  }
  let xi = true;
  function Id(e) {
    const t = lc(e), n = e.proxy, r = e.ctx;
    xi = false, t.beforeCreate && Ls(t.beforeCreate, e, "bc");
    const { data: o, computed: i, methods: s, watch: l, provide: a, inject: c, created: u, beforeMount: f, mounted: h, beforeUpdate: v, updated: p, activated: b, deactivated: _, beforeDestroy: E, beforeUnmount: x, destroyed: B, unmounted: I, render: j, renderTracked: W, renderTriggered: A, errorCaptured: w, serverPrefetch: y, expose: M, inheritAttrs: V, components: F, directives: Q, filters: ie } = t;
    if (c && Fd(c, r, null), s) for (const q in s) {
      const ne = s[q];
      re(ne) && (r[q] = ne.bind(n));
    }
    if (o) {
      const q = o.call(n, n);
      he(q) && (e.data = En(q));
    }
    if (xi = true, i) for (const q in i) {
      const ne = i[q], Ae = re(ne) ? ne.bind(n, n) : re(ne.get) ? ne.get.bind(n, n) : Tt, Ie = !re(ne) && re(ne.set) ? ne.set.bind(n) : Tt, Pe = se({
        get: Ae,
        set: Ie
      });
      Object.defineProperty(r, q, {
        enumerable: true,
        configurable: true,
        get: () => Pe.value,
        set: ($e) => Pe.value = $e
      });
    }
    if (l) for (const q in l) sc(l[q], r, n, q);
    if (a) {
      const q = re(a) ? a.call(n) : a;
      Reflect.ownKeys(q).forEach((ne) => {
        tn(ne, q[ne]);
      });
    }
    u && Ls(u, e, "c");
    function oe(q, ne) {
      ee(ne) ? ne.forEach((Ae) => q(Ae.bind(n))) : ne && q(ne.bind(n));
    }
    if (oe(Oo, f), oe(Rn, h), oe(wd, v), oe(rc, p), oe(ec, b), oe(tc, _), oe(Ed, w), oe(Sd, W), oe(Cd, A), oe(Po, x), oe(oc, I), oe(_d, y), ee(M)) if (M.length) {
      const q = e.exposed || (e.exposed = {});
      M.forEach((ne) => {
        Object.defineProperty(q, ne, {
          get: () => n[ne],
          set: (Ae) => n[ne] = Ae,
          enumerable: true
        });
      });
    } else e.exposed || (e.exposed = {});
    j && e.render === Tt && (e.render = j), V != null && (e.inheritAttrs = V), F && (e.components = F), Q && (e.directives = Q), y && Qa(e);
  }
  function Fd(e, t, n = Tt) {
    ee(e) && (e = wi(e));
    for (const r in e) {
      const o = e[r];
      let i;
      he(o) ? "default" in o ? i = Ce(o.from || r, o.default, true) : i = Ce(o.from || r) : i = Ce(o), Re(i) ? Object.defineProperty(t, r, {
        enumerable: true,
        configurable: true,
        get: () => i.value,
        set: (s) => i.value = s
      }) : t[r] = i;
    }
  }
  function Ls(e, t, n) {
    vt(ee(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
  }
  function sc(e, t, n, r) {
    let o = r.includes(".") ? Va(n, r) : () => n[r];
    if (Oe(e)) {
      const i = t[e];
      re(i) && sr(o, i);
    } else if (re(e)) sr(o, e.bind(n));
    else if (he(e)) if (ee(e)) e.forEach((i) => sc(i, t, n, r));
    else {
      const i = re(e.handler) ? e.handler.bind(n) : t[e.handler];
      re(i) && sr(o, i, e);
    }
  }
  function lc(e) {
    const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: i, config: { optionMergeStrategies: s } } = e.appContext, l = i.get(t);
    let a;
    return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach((c) => io(a, c, s, true)), io(a, t, s)), he(t) && i.set(t, a), a;
  }
  function io(e, t, n, r = false) {
    const { mixins: o, extends: i } = t;
    i && io(e, i, n, true), o && o.forEach((s) => io(e, s, n, true));
    for (const s in t) if (!(r && s === "expose")) {
      const l = Bd[s] || n && n[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
    return e;
  }
  const Bd = {
    data: Hs,
    props: zs,
    emits: zs,
    methods: tr,
    computed: tr,
    beforeCreate: Ye,
    created: Ye,
    beforeMount: Ye,
    mounted: Ye,
    beforeUpdate: Ye,
    updated: Ye,
    beforeDestroy: Ye,
    beforeUnmount: Ye,
    destroyed: Ye,
    unmounted: Ye,
    activated: Ye,
    deactivated: Ye,
    errorCaptured: Ye,
    serverPrefetch: Ye,
    components: tr,
    directives: tr,
    watch: Ld,
    provide: Hs,
    inject: Md
  };
  function Hs(e, t) {
    return t ? e ? function() {
      return Be(re(e) ? e.call(this, this) : e, re(t) ? t.call(this, this) : t);
    } : t : e;
  }
  function Md(e, t) {
    return tr(wi(e), wi(t));
  }
  function wi(e) {
    if (ee(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function Ye(e, t) {
    return e ? [
      ...new Set([].concat(e, t))
    ] : t;
  }
  function tr(e, t) {
    return e ? Be(/* @__PURE__ */ Object.create(null), e, t) : t;
  }
  function zs(e, t) {
    return e ? ee(e) && ee(t) ? [
      .../* @__PURE__ */ new Set([
        ...e,
        ...t
      ])
    ] : Be(/* @__PURE__ */ Object.create(null), Ms(e), Ms(t ?? {})) : t;
  }
  function Ld(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Be(/* @__PURE__ */ Object.create(null), e);
    for (const r in t) n[r] = Ye(e[r], t[r]);
    return n;
  }
  function ac() {
    return {
      app: null,
      config: {
        isNativeTag: aa,
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
  let Hd = 0;
  function zd(e, t) {
    return function(r, o = null) {
      re(r) || (r = Be({}, r)), o != null && !he(o) && (o = null);
      const i = ac(), s = /* @__PURE__ */ new WeakSet(), l = [];
      let a = false;
      const c = i.app = {
        _uid: Hd++,
        _component: r,
        _props: o,
        _container: null,
        _context: i,
        _instance: null,
        version: gh,
        get config() {
          return i.config;
        },
        set config(u) {
        },
        use(u, ...f) {
          return s.has(u) || (u && re(u.install) ? (s.add(u), u.install(c, ...f)) : re(u) && (s.add(u), u(c, ...f))), c;
        },
        mixin(u) {
          return i.mixins.includes(u) || i.mixins.push(u), c;
        },
        component(u, f) {
          return f ? (i.components[u] = f, c) : i.components[u];
        },
        directive(u, f) {
          return f ? (i.directives[u] = f, c) : i.directives[u];
        },
        mount(u, f, h) {
          if (!a) {
            const v = c._ceVNode || ke(r, o);
            return v.appContext = i, h === true ? h = "svg" : h === false && (h = void 0), e(v, u, h), a = true, c._container = u, u.__vue_app__ = c, Fo(v.component);
          }
        },
        onUnmount(u) {
          l.push(u);
        },
        unmount() {
          a && (vt(l, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
        },
        provide(u, f) {
          return i.provides[u] = f, c;
        },
        runWithContext(u) {
          const f = bn;
          bn = c;
          try {
            return u();
          } finally {
            bn = f;
          }
        }
      };
      return c;
    };
  }
  let bn = null;
  const Nd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qe(t)}Modifiers`] || e[`${on(t)}Modifiers`];
  function Dd(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || ye;
    let o = n;
    const i = t.startsWith("update:"), s = i && Nd(r, t.slice(7));
    s && (s.trim && (o = n.map((u) => Oe(u) ? u.trim() : u)), s.number && (o = n.map(Sf)));
    let l, a = r[l = Vo(t)] || r[l = Vo(Qe(t))];
    !a && i && (a = r[l = Vo(on(t))]), a && vt(a, e, 6, o);
    const c = r[l + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[l]) return;
      e.emitted[l] = true, vt(c, e, 6, o);
    }
  }
  const jd = /* @__PURE__ */ new WeakMap();
  function cc(e, t, n = false) {
    const r = n ? jd : t.emitsCache, o = r.get(e);
    if (o !== void 0) return o;
    const i = e.emits;
    let s = {}, l = false;
    if (!re(e)) {
      const a = (c) => {
        const u = cc(c, t, true);
        u && (l = true, Be(s, u));
      };
      !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
    }
    return !i && !l ? (he(e) && r.set(e, null), null) : (ee(i) ? i.forEach((a) => s[a] = null) : Be(s, i), he(e) && r.set(e, s), s);
  }
  function $o(e, t) {
    return !e || !vo(t) ? false : (t = t.slice(2).replace(/Once$/, ""), ge(e, t[0].toLowerCase() + t.slice(1)) || ge(e, on(t)) || ge(e, t));
  }
  function Ns(e) {
    const { type: t, vnode: n, proxy: r, withProxy: o, propsOptions: [i], slots: s, attrs: l, emit: a, render: c, renderCache: u, props: f, data: h, setupState: v, ctx: p, inheritAttrs: b } = e, _ = ro(e);
    let E, x;
    try {
      if (n.shapeFlag & 4) {
        const I = o || r, j = I;
        E = Rt(c.call(j, I, u, f, v, h, p)), x = l;
      } else {
        const I = t;
        E = Rt(I.length > 1 ? I(f, {
          attrs: l,
          slots: s,
          emit: a
        }) : I(f, null)), x = t.props ? l : kd(l);
      }
    } catch (I) {
      ur.length = 0, So(I, e, 1), E = ke(qe);
    }
    let B = E;
    if (x && b !== false) {
      const I = Object.keys(x), { shapeFlag: j } = B;
      I.length && j & 7 && (i && I.some(mo) && (x = Vd(x, i)), B = nn(B, x, false, true));
    }
    return n.dirs && (B = nn(B, null, false, true), B.dirs = B.dirs ? B.dirs.concat(n.dirs) : n.dirs), n.transition && _n(B, n.transition), E = B, ro(_), E;
  }
  const kd = (e) => {
    let t;
    for (const n in e) (n === "class" || n === "style" || vo(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  }, Vd = (e, t) => {
    const n = {};
    for (const r in e) (!mo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
  function Wd(e, t, n) {
    const { props: r, children: o, component: i } = e, { props: s, children: l, patchFlag: a } = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return true;
    if (n && a >= 0) {
      if (a & 1024) return true;
      if (a & 16) return r ? Ds(r, s, c) : !!s;
      if (a & 8) {
        const u = t.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          const h = u[f];
          if (uc(s, r, h) && !$o(c, h)) return true;
        }
      }
    } else return (o || l) && (!l || !l.$stable) ? true : r === s ? false : r ? s ? Ds(r, s, c) : true : !!s;
    return false;
  }
  function Ds(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return true;
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      if (uc(t, e, i) && !$o(n, i)) return true;
    }
    return false;
  }
  function uc(e, t, n) {
    const r = e[n], o = t[n];
    return n === "style" && he(r) && he(o) ? !Gi(r, o) : r !== o;
  }
  function Ud({ vnode: e, parent: t, suspense: n }, r) {
    for (; t; ) {
      const o = t.subTree;
      if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e) (e = t.vnode).el = r, t = t.parent;
      else break;
    }
    n && n.activeBranch === e && (n.vnode.el = r);
  }
  const fc = {}, dc = () => Object.create(fc), hc = (e) => Object.getPrototypeOf(e) === fc;
  function Kd(e, t, n, r = false) {
    const o = {}, i = dc();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), pc(e, t, o, i);
    for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
    n ? e.props = r ? o : Ba(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
  }
  function Gd(e, t, n, r) {
    const { props: o, attrs: i, vnode: { patchFlag: s } } = e, l = de(o), [a] = e.propsOptions;
    let c = false;
    if ((r || s > 0) && !(s & 16)) {
      if (s & 8) {
        const u = e.vnode.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          let h = u[f];
          if ($o(e.emitsOptions, h)) continue;
          const v = t[h];
          if (a) if (ge(i, h)) v !== i[h] && (i[h] = v, c = true);
          else {
            const p = Qe(h);
            o[p] = _i(a, l, p, v, e, false);
          }
          else v !== i[h] && (i[h] = v, c = true);
        }
      }
    } else {
      pc(e, t, o, i) && (c = true);
      let u;
      for (const f in l) (!t || !ge(t, f) && ((u = on(f)) === f || !ge(t, u))) && (a ? n && (n[f] !== void 0 || n[u] !== void 0) && (o[f] = _i(a, l, f, void 0, e, true)) : delete o[f]);
      if (i !== l) for (const f in i) (!t || !ge(t, f)) && (delete i[f], c = true);
    }
    c && Ht(e.attrs, "set", "");
  }
  function pc(e, t, n, r) {
    const [o, i] = e.propsOptions;
    let s = false, l;
    if (t) for (let a in t) {
      if (rr(a)) continue;
      const c = t[a];
      let u;
      o && ge(o, u = Qe(a)) ? !i || !i.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : $o(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, s = true);
    }
    if (i) {
      const a = de(n), c = l || ye;
      for (let u = 0; u < i.length; u++) {
        const f = i[u];
        n[f] = _i(o, a, f, c[f], e, !ge(c, f));
      }
    }
    return s;
  }
  function _i(e, t, n, r, o, i) {
    const s = e[n];
    if (s != null) {
      const l = ge(s, "default");
      if (l && r === void 0) {
        const a = s.default;
        if (s.type !== Function && !s.skipFactory && re(a)) {
          const { propsDefaults: c } = o;
          if (n in c) r = c[n];
          else {
            const u = $r(o);
            r = c[n] = a.call(null, t), u();
          }
        } else r = a;
        o.ce && o.ce._setProp(n, r);
      }
      s[0] && (i && !l ? r = false : s[1] && (r === "" || r === on(n)) && (r = true));
    }
    return r;
  }
  const qd = /* @__PURE__ */ new WeakMap();
  function gc(e, t, n = false) {
    const r = n ? qd : t.propsCache, o = r.get(e);
    if (o) return o;
    const i = e.props, s = {}, l = [];
    let a = false;
    if (!re(e)) {
      const u = (f) => {
        a = true;
        const [h, v] = gc(f, t, true);
        Be(s, h), v && l.push(...v);
      };
      !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
    }
    if (!i && !a) return he(e) && r.set(e, Mn), Mn;
    if (ee(i)) for (let u = 0; u < i.length; u++) {
      const f = Qe(i[u]);
      js(f) && (s[f] = ye);
    }
    else if (i) for (const u in i) {
      const f = Qe(u);
      if (js(f)) {
        const h = i[u], v = s[f] = ee(h) || re(h) ? {
          type: h
        } : Be({}, h), p = v.type;
        let b = false, _ = true;
        if (ee(p)) for (let E = 0; E < p.length; ++E) {
          const x = p[E], B = re(x) && x.name;
          if (B === "Boolean") {
            b = true;
            break;
          } else B === "String" && (_ = false);
        }
        else b = re(p) && p.name === "Boolean";
        v[0] = b, v[1] = _, (b || ge(v, "default")) && l.push(f);
      }
    }
    const c = [
      s,
      l
    ];
    return he(e) && r.set(e, c), c;
  }
  function js(e) {
    return e[0] !== "$" && !rr(e);
  }
  const ss = (e) => e === "_" || e === "_ctx" || e === "$stable", ls = (e) => ee(e) ? e.map(Rt) : [
    Rt(e)
  ], Xd = (e, t, n) => {
    if (t._n) return t;
    const r = vi((...o) => ls(t(...o)), n);
    return r._c = false, r;
  }, vc = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (ss(o)) continue;
      const i = e[o];
      if (re(i)) t[o] = Xd(o, i, r);
      else if (i != null) {
        const s = ls(i);
        t[o] = () => s;
      }
    }
  }, mc = (e, t) => {
    const n = ls(t);
    e.slots.default = () => n;
  }, bc = (e, t, n) => {
    for (const r in t) (n || !ss(r)) && (e[r] = t[r]);
  }, Yd = (e, t, n) => {
    const r = e.slots = dc();
    if (e.vnode.shapeFlag & 32) {
      const o = t._;
      o ? (bc(r, t, n), n && ha(r, "_", o, true)) : vc(t, r);
    } else t && mc(e, t);
  }, Jd = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let i = true, s = ye;
    if (r.shapeFlag & 32) {
      const l = t._;
      l ? n && l === 1 ? i = false : bc(o, t, n) : (i = !t.$stable, vc(t, o)), s = t;
    } else t && (mc(e, t), s = {
      default: 1
    });
    if (i) for (const l in o) !ss(l) && s[l] == null && delete o[l];
  }, We = nh;
  function Zd(e) {
    return Qd(e);
  }
  function Qd(e, t) {
    const n = wo();
    n.__VUE__ = true;
    const { insert: r, remove: o, patchProp: i, createElement: s, createText: l, createComment: a, setText: c, setElementText: u, parentNode: f, nextSibling: h, setScopeId: v = Tt, insertStaticContent: p } = e, b = (d, g, m, C = null, T = null, S = null, z = void 0, H = null, L = !!g.dynamicChildren) => {
      if (d === g) return;
      d && !dn(d, g) && (C = R(d), $e(d, T, S, true), d = null), g.patchFlag === -2 && (L = false, g.dynamicChildren = null);
      const { type: O, ref: J, shapeFlag: D } = g;
      switch (O) {
        case Io:
          _(d, g, m, C);
          break;
        case qe:
          E(d, g, m, C);
          break;
        case Zo:
          d == null && x(g, m, C, z);
          break;
        case De:
          F(d, g, m, C, T, S, z, H, L);
          break;
        default:
          D & 1 ? j(d, g, m, C, T, S, z, H, L) : D & 6 ? Q(d, g, m, C, T, S, z, H, L) : (D & 64 || D & 128) && O.process(d, g, m, C, T, S, z, H, L, X);
      }
      J != null && T ? ar(J, d && d.ref, S, g || d, !g) : J == null && d && d.ref != null && ar(d.ref, null, S, d, true);
    }, _ = (d, g, m, C) => {
      if (d == null) r(g.el = l(g.children), m, C);
      else {
        const T = g.el = d.el;
        g.children !== d.children && c(T, g.children);
      }
    }, E = (d, g, m, C) => {
      d == null ? r(g.el = a(g.children || ""), m, C) : g.el = d.el;
    }, x = (d, g, m, C) => {
      [d.el, d.anchor] = p(d.children, g, m, C, d.el, d.anchor);
    }, B = ({ el: d, anchor: g }, m, C) => {
      let T;
      for (; d && d !== g; ) T = h(d), r(d, m, C), d = T;
      r(g, m, C);
    }, I = ({ el: d, anchor: g }) => {
      let m;
      for (; d && d !== g; ) m = h(d), o(d), d = m;
      o(g);
    }, j = (d, g, m, C, T, S, z, H, L) => {
      if (g.type === "svg" ? z = "svg" : g.type === "math" && (z = "mathml"), d == null) W(g, m, C, T, S, z, H, L);
      else {
        const O = d.el && d.el._isVueCE ? d.el : null;
        try {
          O && O._beginPatch(), y(d, g, T, S, z, H, L);
        } finally {
          O && O._endPatch();
        }
      }
    }, W = (d, g, m, C, T, S, z, H) => {
      let L, O;
      const { props: J, shapeFlag: D, transition: G, dirs: Y } = d;
      if (L = d.el = s(d.type, S, J && J.is, J), D & 8 ? u(L, d.children) : D & 16 && w(d.children, L, null, C, T, Jo(d, S), z, H), Y && sn(d, null, C, "created"), A(L, d, d.scopeId, z, C), J) {
        for (const ve in J) ve !== "value" && !rr(ve) && i(L, ve, null, J[ve], S, C);
        "value" in J && i(L, "value", null, J.value, S), (O = J.onVnodeBeforeMount) && yt(O, C, d);
      }
      Y && sn(d, null, C, "beforeMount");
      const ce = eh(T, G);
      ce && G.beforeEnter(L), r(L, g, m), ((O = J && J.onVnodeMounted) || ce || Y) && We(() => {
        try {
          O && yt(O, C, d), ce && G.enter(L), Y && sn(d, null, C, "mounted");
        } finally {
        }
      }, T);
    }, A = (d, g, m, C, T) => {
      if (m && v(d, m), C) for (let S = 0; S < C.length; S++) v(d, C[S]);
      if (T) {
        let S = T.subTree;
        if (g === S || wc(S.type) && (S.ssContent === g || S.ssFallback === g)) {
          const z = T.vnode;
          A(d, z, z.scopeId, z.slotScopeIds, T.parent);
        }
      }
    }, w = (d, g, m, C, T, S, z, H, L = 0) => {
      for (let O = L; O < d.length; O++) {
        const J = d[O] = H ? Lt(d[O]) : Rt(d[O]);
        b(null, J, g, m, C, T, S, z, H);
      }
    }, y = (d, g, m, C, T, S, z) => {
      const H = g.el = d.el;
      let { patchFlag: L, dynamicChildren: O, dirs: J } = g;
      L |= d.patchFlag & 16;
      const D = d.props || ye, G = g.props || ye;
      let Y;
      if (m && ln(m, false), (Y = G.onVnodeBeforeUpdate) && yt(Y, m, g, d), J && sn(g, d, m, "beforeUpdate"), m && ln(m, true), (D.innerHTML && G.innerHTML == null || D.textContent && G.textContent == null) && u(H, ""), O ? M(d.dynamicChildren, O, H, m, C, Jo(g, T), S) : z || ne(d, g, H, null, m, C, Jo(g, T), S, false), L > 0) {
        if (L & 16) V(H, D, G, m, T);
        else if (L & 2 && D.class !== G.class && i(H, "class", null, G.class, T), L & 4 && i(H, "style", D.style, G.style, T), L & 8) {
          const ce = g.dynamicProps;
          for (let ve = 0; ve < ce.length; ve++) {
            const me = ce[ve], Se = D[me], Me = G[me];
            (Me !== Se || me === "value") && i(H, me, Se, Me, T, m);
          }
        }
        L & 1 && d.children !== g.children && u(H, g.children);
      } else !z && O == null && V(H, D, G, m, T);
      ((Y = G.onVnodeUpdated) || J) && We(() => {
        Y && yt(Y, m, g, d), J && sn(g, d, m, "updated");
      }, C);
    }, M = (d, g, m, C, T, S, z) => {
      for (let H = 0; H < g.length; H++) {
        const L = d[H], O = g[H], J = L.el && (L.type === De || !dn(L, O) || L.shapeFlag & 198) ? f(L.el) : m;
        b(L, O, J, null, C, T, S, z, true);
      }
    }, V = (d, g, m, C, T) => {
      if (g !== m) {
        if (g !== ye) for (const S in g) !rr(S) && !(S in m) && i(d, S, g[S], null, T, C);
        for (const S in m) {
          if (rr(S)) continue;
          const z = m[S], H = g[S];
          z !== H && S !== "value" && i(d, S, H, z, T, C);
        }
        "value" in m && i(d, "value", g.value, m.value, T);
      }
    }, F = (d, g, m, C, T, S, z, H, L) => {
      const O = g.el = d ? d.el : l(""), J = g.anchor = d ? d.anchor : l("");
      let { patchFlag: D, dynamicChildren: G, slotScopeIds: Y } = g;
      Y && (H = H ? H.concat(Y) : Y), d == null ? (r(O, m, C), r(J, m, C), w(g.children || [], m, J, T, S, z, H, L)) : D > 0 && D & 64 && G && d.dynamicChildren && d.dynamicChildren.length === G.length ? (M(d.dynamicChildren, G, m, T, S, z, H), (g.key != null || T && g === T.subTree) && as(d, g, true)) : ne(d, g, m, J, T, S, z, H, L);
    }, Q = (d, g, m, C, T, S, z, H, L) => {
      g.slotScopeIds = H, d == null ? g.shapeFlag & 512 ? T.ctx.activate(g, m, C, z, L) : ie(g, m, C, T, S, z, L) : fe(d, g, L);
    }, ie = (d, g, m, C, T, S, z) => {
      const H = d.component = ah(d, C, T);
      if (Ao(d) && (H.ctx.renderer = X), ch(H, false, z), H.asyncDep) {
        if (T && T.registerDep(H, oe, z), !d.el) {
          const L = H.subTree = ke(qe);
          E(null, L, g, m), d.placeholder = L.el;
        }
      } else oe(H, d, g, m, T, S, z);
    }, fe = (d, g, m) => {
      const C = g.component = d.component;
      if (Wd(d, g, m)) if (C.asyncDep && !C.asyncResolved) {
        q(C, g, m);
        return;
      } else C.next = g, C.update();
      else g.el = d.el, C.vnode = g;
    }, oe = (d, g, m, C, T, S, z) => {
      const H = () => {
        if (d.isMounted) {
          let { next: D, bu: G, u: Y, parent: ce, vnode: ve } = d;
          {
            const tt = yc(d);
            if (tt) {
              D && (D.el = ve.el, q(d, D, z)), tt.asyncDep.then(() => {
                We(() => {
                  d.isUnmounted || O();
                }, T);
              });
              return;
            }
          }
          let me = D, Se;
          ln(d, false), D ? (D.el = ve.el, q(d, D, z)) : D = ve, G && Wo(G), (Se = D.props && D.props.onVnodeBeforeUpdate) && yt(Se, ce, D, ve), ln(d, true);
          const Me = Ns(d), et = d.subTree;
          d.subTree = Me, b(et, Me, f(et.el), R(et), d, T, S), D.el = Me.el, me === null && Ud(d, Me.el), Y && We(Y, T), (Se = D.props && D.props.onVnodeUpdated) && We(() => yt(Se, ce, D, ve), T);
        } else {
          let D;
          const { el: G, props: Y } = g, { bm: ce, m: ve, parent: me, root: Se, type: Me } = d, et = zn(g);
          ln(d, false), ce && Wo(ce), !et && (D = Y && Y.onVnodeBeforeMount) && yt(D, me, g), ln(d, true);
          {
            Se.ce && Se.ce._hasShadowRoot() && Se.ce._injectChildStyle(Me, d.parent ? d.parent.type : void 0);
            const tt = d.subTree = Ns(d);
            b(null, tt, m, C, d, T, S), g.el = tt.el;
          }
          if (ve && We(ve, T), !et && (D = Y && Y.onVnodeMounted)) {
            const tt = g;
            We(() => yt(D, me, tt), T);
          }
          (g.shapeFlag & 256 || me && zn(me.vnode) && me.vnode.shapeFlag & 256) && d.a && We(d.a, T), d.isMounted = true, g = m = C = null;
        }
      };
      d.scope.on();
      const L = d.effect = new xa(H);
      d.scope.off();
      const O = d.update = L.run.bind(L), J = d.job = L.runIfDirty.bind(L);
      J.i = d, J.id = d.uid, L.scheduler = () => rs(J), ln(d, true), O();
    }, q = (d, g, m) => {
      g.component = d;
      const C = d.vnode.props;
      d.vnode = g, d.next = null, Gd(d, g.props, C, m), Jd(d, g.children, m), Dt(), Ts(d), jt();
    }, ne = (d, g, m, C, T, S, z, H, L = false) => {
      const O = d && d.children, J = d ? d.shapeFlag : 0, D = g.children, { patchFlag: G, shapeFlag: Y } = g;
      if (G > 0) {
        if (G & 128) {
          Ie(O, D, m, C, T, S, z, H, L);
          return;
        } else if (G & 256) {
          Ae(O, D, m, C, T, S, z, H, L);
          return;
        }
      }
      Y & 8 ? (J & 16 && Fe(O, T, S), D !== O && u(m, D)) : J & 16 ? Y & 16 ? Ie(O, D, m, C, T, S, z, H, L) : Fe(O, T, S, true) : (J & 8 && u(m, ""), Y & 16 && w(D, m, C, T, S, z, H, L));
    }, Ae = (d, g, m, C, T, S, z, H, L) => {
      d = d || Mn, g = g || Mn;
      const O = d.length, J = g.length, D = Math.min(O, J);
      let G;
      for (G = 0; G < D; G++) {
        const Y = g[G] = L ? Lt(g[G]) : Rt(g[G]);
        b(d[G], Y, m, null, T, S, z, H, L);
      }
      O > J ? Fe(d, T, S, true, false, D) : w(g, m, C, T, S, z, H, L, D);
    }, Ie = (d, g, m, C, T, S, z, H, L) => {
      let O = 0;
      const J = g.length;
      let D = d.length - 1, G = J - 1;
      for (; O <= D && O <= G; ) {
        const Y = d[O], ce = g[O] = L ? Lt(g[O]) : Rt(g[O]);
        if (dn(Y, ce)) b(Y, ce, m, null, T, S, z, H, L);
        else break;
        O++;
      }
      for (; O <= D && O <= G; ) {
        const Y = d[D], ce = g[G] = L ? Lt(g[G]) : Rt(g[G]);
        if (dn(Y, ce)) b(Y, ce, m, null, T, S, z, H, L);
        else break;
        D--, G--;
      }
      if (O > D) {
        if (O <= G) {
          const Y = G + 1, ce = Y < J ? g[Y].el : C;
          for (; O <= G; ) b(null, g[O] = L ? Lt(g[O]) : Rt(g[O]), m, ce, T, S, z, H, L), O++;
        }
      } else if (O > G) for (; O <= D; ) $e(d[O], T, S, true), O++;
      else {
        const Y = O, ce = O, ve = /* @__PURE__ */ new Map();
        for (O = ce; O <= G; O++) {
          const nt = g[O] = L ? Lt(g[O]) : Rt(g[O]);
          nt.key != null && ve.set(nt.key, O);
        }
        let me, Se = 0;
        const Me = G - ce + 1;
        let et = false, tt = 0;
        const Ut = new Array(Me);
        for (O = 0; O < Me; O++) Ut[O] = 0;
        for (O = Y; O <= D; O++) {
          const nt = d[O];
          if (Se >= Me) {
            $e(nt, T, S, true);
            continue;
          }
          let P;
          if (nt.key != null) P = ve.get(nt.key);
          else for (me = ce; me <= G; me++) if (Ut[me - ce] === 0 && dn(nt, g[me])) {
            P = me;
            break;
          }
          P === void 0 ? $e(nt, T, S, true) : (Ut[P - ce] = O + 1, P >= tt ? tt = P : et = true, b(nt, g[P], m, null, T, S, z, H, L), Se++);
        }
        const $t = et ? th(Ut) : Mn;
        for (me = $t.length - 1, O = Me - 1; O >= 0; O--) {
          const nt = ce + O, P = g[nt], U = g[nt + 1], te = nt + 1 < J ? U.el || xc(U) : C;
          Ut[O] === 0 ? b(null, P, m, te, T, S, z, H, L) : et && (me < 0 || O !== $t[me] ? Pe(P, m, te, 2) : me--);
        }
      }
    }, Pe = (d, g, m, C, T = null) => {
      const { el: S, type: z, transition: H, children: L, shapeFlag: O } = d;
      if (O & 6) {
        Pe(d.component.subTree, g, m, C);
        return;
      }
      if (O & 128) {
        d.suspense.move(g, m, C);
        return;
      }
      if (O & 64) {
        z.move(d, g, m, X);
        return;
      }
      if (z === De) {
        r(S, g, m);
        for (let D = 0; D < L.length; D++) Pe(L[D], g, m, C);
        r(d.anchor, g, m);
        return;
      }
      if (z === Zo) {
        B(d, g, m);
        return;
      }
      if (C !== 2 && O & 1 && H) if (C === 0) H.beforeEnter(S), r(S, g, m), We(() => H.enter(S), T);
      else {
        const { leave: D, delayLeave: G, afterLeave: Y } = H, ce = () => {
          d.ctx.isUnmounted ? o(S) : r(S, g, m);
        }, ve = () => {
          S._isLeaving && S[St](true), D(S, () => {
            ce(), Y && Y();
          });
        };
        G ? G(S, ce, ve) : ve();
      }
      else r(S, g, m);
    }, $e = (d, g, m, C = false, T = false) => {
      const { type: S, props: z, ref: H, children: L, dynamicChildren: O, shapeFlag: J, patchFlag: D, dirs: G, cacheIndex: Y, memo: ce } = d;
      if (D === -2 && (T = false), H != null && (Dt(), ar(H, null, m, d, true), jt()), Y != null && (g.renderCache[Y] = void 0), J & 256) {
        g.ctx.deactivate(d);
        return;
      }
      const ve = J & 1 && G, me = !zn(d);
      let Se;
      if (me && (Se = z && z.onVnodeBeforeUnmount) && yt(Se, g, d), J & 6) dt(d.component, m, C);
      else {
        if (J & 128) {
          d.suspense.unmount(m, C);
          return;
        }
        ve && sn(d, null, g, "beforeUnmount"), J & 64 ? d.type.remove(d, g, m, X, C) : O && !O.hasOnce && (S !== De || D > 0 && D & 64) ? Fe(O, g, m, false, true) : (S === De && D & 384 || !T && J & 16) && Fe(L, g, m), C && ft(d);
      }
      const Me = ce != null && Y == null;
      (me && (Se = z && z.onVnodeUnmounted) || ve || Me) && We(() => {
        Se && yt(Se, g, d), ve && sn(d, null, g, "unmounted"), Me && (d.el = null);
      }, m);
    }, ft = (d) => {
      const { type: g, el: m, anchor: C, transition: T } = d;
      if (g === De) {
        bt(m, C);
        return;
      }
      if (g === Zo) {
        I(d);
        return;
      }
      const S = () => {
        o(m), T && !T.persisted && T.afterLeave && T.afterLeave();
      };
      if (d.shapeFlag & 1 && T && !T.persisted) {
        const { leave: z, delayLeave: H } = T, L = () => z(m, S);
        H ? H(d.el, S, L) : L();
      } else S();
    }, bt = (d, g) => {
      let m;
      for (; d !== g; ) m = h(d), o(d), d = m;
      o(g);
    }, dt = (d, g, m) => {
      const { bum: C, scope: T, job: S, subTree: z, um: H, m: L, a: O } = d;
      ks(L), ks(O), C && Wo(C), T.stop(), S && (S.flags |= 8, $e(z, d, g, m)), H && We(H, g), We(() => {
        d.isUnmounted = true;
      }, g);
    }, Fe = (d, g, m, C = false, T = false, S = 0) => {
      for (let z = S; z < d.length; z++) $e(d[z], g, m, C, T);
    }, R = (d) => {
      if (d.shapeFlag & 6) return R(d.component.subTree);
      if (d.shapeFlag & 128) return d.suspense.next();
      const g = h(d.anchor || d.el), m = g && g[Wa];
      return m ? h(m) : g;
    };
    let k = false;
    const N = (d, g, m) => {
      let C;
      d == null ? g._vnode && ($e(g._vnode, null, null, true), C = g._vnode.component) : b(g._vnode || null, d, g, null, null, null, m), g._vnode = d, k || (k = true, Ts(C), Da(), k = false);
    }, X = {
      p: b,
      um: $e,
      m: Pe,
      r: ft,
      mt: ie,
      mc: w,
      pc: ne,
      pbc: M,
      n: R,
      o: e
    };
    return {
      render: N,
      hydrate: void 0,
      createApp: zd(N)
    };
  }
  function Jo({ type: e, props: t }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
  }
  function ln({ effect: e, job: t }, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function eh(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function as(e, t, n = false) {
    const r = e.children, o = t.children;
    if (ee(r) && ee(o)) for (let i = 0; i < r.length; i++) {
      const s = r[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = Lt(o[i]), l.el = s.el), !n && l.patchFlag !== -2 && as(s, l)), l.type === Io && (l.patchFlag === -1 && (l = o[i] = Lt(l)), l.el = s.el), l.type === qe && !l.el && (l.el = s.el);
    }
  }
  function th(e) {
    const t = e.slice(), n = [
      0
    ];
    let r, o, i, s, l;
    const a = e.length;
    for (r = 0; r < a; r++) {
      const c = e[r];
      if (c !== 0) {
        if (o = n[n.length - 1], e[o] < c) {
          t[r] = o, n.push(r);
          continue;
        }
        for (i = 0, s = n.length - 1; i < s; ) l = i + s >> 1, e[n[l]] < c ? i = l + 1 : s = l;
        c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
      }
    }
    for (i = n.length, s = n[i - 1]; i-- > 0; ) n[i] = s, s = t[s];
    return n;
  }
  function yc(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : yc(t);
  }
  function ks(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  function xc(e) {
    if (e.placeholder) return e.placeholder;
    const t = e.component;
    return t ? xc(t.subTree) : null;
  }
  const wc = (e) => e.__isSuspense;
  function nh(e, t) {
    t && t.pendingBranch ? ee(e) ? t.effects.push(...e) : t.effects.push(e) : fd(e);
  }
  let Zo, ur;
  De = Symbol.for("v-fgt");
  Io = Symbol.for("v-txt");
  qe = Symbol.for("v-cmt");
  Zo = Symbol.for("v-stc");
  ur = [];
  let it = null;
  so = function(e = false) {
    ur.push(it = e ? null : []);
  };
  function rh() {
    ur.pop(), it = ur[ur.length - 1] || null;
  }
  let yr = 1;
  function lo(e, t = false) {
    yr += e, e < 0 && it && t && (it.hasOnce = true);
  }
  function _c(e) {
    return e.dynamicChildren = yr > 0 ? it || Mn : null, rh(), yr > 0 && it && it.push(e), e;
  }
  Vy = function(e, t, n, r, o, i) {
    return _c(Sc(e, t, n, r, o, i, true));
  };
  ao = function(e, t, n, r, o) {
    return _c(ke(e, t, n, r, o, true));
  };
  xr = function(e) {
    return e ? e.__v_isVNode === true : false;
  };
  function dn(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const Cc = ({ key: e }) => e ?? null, Xr = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? Oe(e) || Re(e) || re(e) ? {
    i: je,
    r: e,
    k: t,
    f: !!n
  } : e : null);
  Sc = function(e, t = null, n = null, r = 0, o = null, i = e === De ? 0 : 1, s = false, l = false) {
    const a = {
      __v_isVNode: true,
      __v_skip: true,
      type: e,
      props: t,
      key: t && Cc(t),
      ref: t && Xr(t),
      scopeId: ka,
      slotScopeIds: null,
      children: n,
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
      dynamicProps: o,
      dynamicChildren: null,
      appContext: null,
      ctx: je
    };
    return l ? (cs(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= Oe(n) ? 8 : 16), yr > 0 && !s && it && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && it.push(a), a;
  };
  ke = oh;
  function oh(e, t = null, n = null, r = 0, o = null, i = false) {
    if ((!e || e === Td) && (e = qe), xr(e)) {
      const l = nn(e, t, true);
      return n && cs(l, n), yr > 0 && !i && it && (l.shapeFlag & 6 ? it[it.indexOf(e)] = l : it.push(l)), l.patchFlag = -2, l;
    }
    if (ph(e) && (e = e.__vccOpts), t) {
      t = ih(t);
      let { class: l, style: a } = t;
      l && !Oe(l) && (t.class = Ki(l)), he(a) && (Co(a) && !ee(a) && (a = Be({}, a)), t.style = Ui(a));
    }
    const s = Oe(e) ? 1 : wc(e) ? 128 : Ua(e) ? 64 : he(e) ? 4 : re(e) ? 2 : 0;
    return Sc(e, t, n, r, o, s, i, true);
  }
  function ih(e) {
    return e ? Co(e) || hc(e) ? Be({}, e) : e : null;
  }
  nn = function(e, t, n = false, r = false) {
    const { props: o, ref: i, patchFlag: s, children: l, transition: a } = e, c = t ? Ec(o || {}, t) : o, u = {
      __v_isVNode: true,
      __v_skip: true,
      type: e.type,
      props: c,
      key: c && Cc(c),
      ref: t && t.ref ? n && i ? ee(i) ? i.concat(Xr(t)) : [
        i,
        Xr(t)
      ] : Xr(t) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== De ? s === -1 ? 16 : s | 16 : s,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: a,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && nn(e.ssContent),
      ssFallback: e.ssFallback && nn(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
    return a && r && _n(u, a.clone(u)), u;
  };
  Ci = function(e = " ", t = 0) {
    return ke(Io, null, e, t);
  };
  Wy = function(e = "", t = false) {
    return t ? (so(), ao(qe, null, e)) : ke(qe, null, e);
  };
  function Rt(e) {
    return e == null || typeof e == "boolean" ? ke(qe) : ee(e) ? ke(De, null, e.slice()) : xr(e) ? Lt(e) : ke(Io, null, String(e));
  }
  function Lt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : nn(e);
  }
  function cs(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (ee(t)) n = 16;
    else if (typeof t == "object") if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = false), cs(e, o()), o._c && (o._d = true));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !hc(t) ? t._ctx = je : o === 3 && je && (je.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
    else re(t) ? (t = {
      default: t,
      _ctx: je
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [
      Ci(t)
    ]) : n = 8);
    e.children = t, e.shapeFlag |= n;
  }
  Ec = function(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const o in r) if (o === "class") t.class !== r.class && (t.class = Ki([
        t.class,
        r.class
      ]));
      else if (o === "style") t.style = Ui([
        t.style,
        r.style
      ]);
      else if (vo(o)) {
        const i = t[o], s = r[o];
        s && i !== s && !(ee(i) && i.includes(s)) ? t[o] = i ? [].concat(i, s) : s : s == null && i == null && !mo(o) && (t[o] = s);
      } else o !== "" && (t[o] = r[o]);
    }
    return t;
  };
  function yt(e, t, n, r = null) {
    vt(e, t, 7, [
      n,
      r
    ]);
  }
  const sh = ac();
  let lh = 0;
  function ah(e, t, n) {
    const r = e.type, o = (t ? t.appContext : e.appContext) || sh, i = {
      uid: lh++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new ma(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      ids: t ? t.ids : [
        "",
        0,
        0
      ],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: gc(r, o),
      emitsOptions: cc(r, o),
      emit: null,
      emitted: null,
      propsDefaults: ye,
      inheritAttrs: r.inheritAttrs,
      ctx: ye,
      data: ye,
      props: ye,
      attrs: ye,
      slots: ye,
      refs: ye,
      setupState: ye,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
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
    }, i.root = t ? t.root : i, i.emit = Dd.bind(null, i), e.ce && e.ce(i), i;
  }
  let Xe = null;
  Pr = () => Xe || je;
  let co, Si;
  {
    const e = wo(), t = (n, r) => {
      let o;
      return (o = e[n]) || (o = e[n] = []), o.push(r), (i) => {
        o.length > 1 ? o.forEach((s) => s(i)) : o[0](i);
      };
    };
    co = t("__VUE_INSTANCE_SETTERS__", (n) => Xe = n), Si = t("__VUE_SSR_SETTERS__", (n) => wr = n);
  }
  const $r = (e) => {
    const t = Xe;
    return co(e), e.scope.on(), () => {
      e.scope.off(), co(t);
    };
  }, Vs = () => {
    Xe && Xe.scope.off(), co(null);
  };
  function Rc(e) {
    return e.vnode.shapeFlag & 4;
  }
  let wr = false;
  function ch(e, t = false, n = false) {
    t && Si(t);
    const { props: r, children: o } = e.vnode, i = Rc(e);
    Kd(e, r, i, t), Yd(e, o, n || t);
    const s = i ? uh(e, t) : void 0;
    return t && Si(false), s;
  }
  function uh(e, t) {
    const n = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $d);
    const { setup: r } = n;
    if (r) {
      Dt();
      const o = e.setupContext = r.length > 1 ? dh(e) : null, i = $r(e), s = Or(r, e, 0, [
        e.props,
        o
      ]), l = ua(s);
      if (jt(), i(), (l || e.sp) && !zn(e) && Qa(e), l) {
        if (s.then(Vs, Vs), t) return s.then((a) => {
          Ws(e, a);
        }).catch((a) => {
          So(a, e, 0);
        });
        e.asyncDep = s;
      } else Ws(e, s);
    } else Ac(e);
  }
  function Ws(e, t, n) {
    re(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) && (e.setupState = La(t)), Ac(e);
  }
  function Ac(e, t, n) {
    const r = e.type;
    e.render || (e.render = r.render || Tt);
    {
      const o = $r(e);
      Dt();
      try {
        Id(e);
      } finally {
        jt(), o();
      }
    }
  }
  const fh = {
    get(e, t) {
      return Ke(e, "get", ""), e[t];
    }
  };
  function dh(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return {
      attrs: new Proxy(e.attrs, fh),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
  }
  function Fo(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(La(es(e.exposed)), {
      get(t, n) {
        if (n in t) return t[n];
        if (n in cr) return cr[n](e);
      },
      has(t, n) {
        return n in t || n in cr;
      }
    })) : e.proxy;
  }
  function hh(e, t = true) {
    return re(e) ? e.displayName || e.name : e.name || t && e.__name;
  }
  function ph(e) {
    return re(e) && "__vccOpts" in e;
  }
  se = (e, t) => sd(e, t, wr);
  $ = function(e, t, n) {
    try {
      lo(-1);
      const r = arguments.length;
      return r === 2 ? he(t) && !ee(t) ? xr(t) ? ke(e, null, [
        t
      ]) : ke(e, t) : ke(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && xr(n) && (n = [
        n
      ]), ke(e, t, n));
    } finally {
      lo(1);
    }
  };
  const gh = "3.5.31";
  let Ei;
  const Us = typeof window < "u" && window.trustedTypes;
  if (Us) try {
    Ei = Us.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
  let Tc, vh, mh, Mt, Ks, bh, Gt, Jn, jn, Oc, Pc, yh, an, Gs;
  Tc = Ei ? (e) => Ei.createHTML(e) : (e) => e;
  vh = "http://www.w3.org/2000/svg";
  mh = "http://www.w3.org/1998/Math/MathML";
  Mt = typeof document < "u" ? document : null;
  Ks = Mt && Mt.createElement("template");
  bh = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t === "svg" ? Mt.createElementNS(vh, e) : t === "mathml" ? Mt.createElementNS(mh, e) : n ? Mt.createElement(e, {
        is: n
      }) : Mt.createElement(e);
      return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
    },
    createText: (e) => Mt.createTextNode(e),
    createComment: (e) => Mt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Mt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, i) {
      const s = n ? n.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(true), n), !(o === i || !(o = o.nextSibling)); ) ;
      else {
        Ks.innerHTML = Tc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
        const l = Ks.content;
        if (r === "svg" || r === "mathml") {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ];
    }
  };
  Gt = "transition";
  Jn = "animation";
  jn = Symbol("_vtc");
  Oc = {
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
  Pc = Be({}, Xa, Oc);
  yh = (e) => (e.displayName = "Transition", e.props = Pc, e);
  _r = yh((e, { slots: t }) => $(yd, $c(e), t));
  an = (e, t = []) => {
    ee(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  };
  Gs = (e) => e ? ee(e) ? e.some((t) => t.length > 1) : e.length > 1 : false;
  function $c(e) {
    const t = {};
    for (const F in e) F in Oc || (t[F] = e[F]);
    if (e.css === false) return t;
    const { name: n = "v", type: r, duration: o, enterFromClass: i = `${n}-enter-from`, enterActiveClass: s = `${n}-enter-active`, enterToClass: l = `${n}-enter-to`, appearFromClass: a = i, appearActiveClass: c = s, appearToClass: u = l, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: h = `${n}-leave-active`, leaveToClass: v = `${n}-leave-to` } = e, p = xh(o), b = p && p[0], _ = p && p[1], { onBeforeEnter: E, onEnter: x, onEnterCancelled: B, onLeave: I, onLeaveCancelled: j, onBeforeAppear: W = E, onAppear: A = x, onAppearCancelled: w = B } = t, y = (F, Q, ie, fe) => {
      F._enterCancelled = fe, Yt(F, Q ? u : l), Yt(F, Q ? c : s), ie && ie();
    }, M = (F, Q) => {
      F._isLeaving = false, Yt(F, f), Yt(F, v), Yt(F, h), Q && Q();
    }, V = (F) => (Q, ie) => {
      const fe = F ? A : x, oe = () => y(Q, F, ie);
      an(fe, [
        Q,
        oe
      ]), qs(() => {
        Yt(Q, F ? a : i), _t(Q, F ? u : l), Gs(fe) || Xs(Q, r, b, oe);
      });
    };
    return Be(t, {
      onBeforeEnter(F) {
        an(E, [
          F
        ]), _t(F, i), _t(F, s);
      },
      onBeforeAppear(F) {
        an(W, [
          F
        ]), _t(F, a), _t(F, c);
      },
      onEnter: V(false),
      onAppear: V(true),
      onLeave(F, Q) {
        F._isLeaving = true;
        const ie = () => M(F, Q);
        _t(F, f), F._enterCancelled ? (_t(F, h), Ri(F)) : (Ri(F), _t(F, h)), qs(() => {
          F._isLeaving && (Yt(F, f), _t(F, v), Gs(I) || Xs(F, r, _, ie));
        }), an(I, [
          F,
          ie
        ]);
      },
      onEnterCancelled(F) {
        y(F, false, void 0, true), an(B, [
          F
        ]);
      },
      onAppearCancelled(F) {
        y(F, true, void 0, true), an(w, [
          F
        ]);
      },
      onLeaveCancelled(F) {
        M(F), an(j, [
          F
        ]);
      }
    });
  }
  function xh(e) {
    if (e == null) return null;
    if (he(e)) return [
      Qo(e.enter),
      Qo(e.leave)
    ];
    {
      const t = Qo(e);
      return [
        t,
        t
      ];
    }
  }
  function Qo(e) {
    return Ef(e);
  }
  function _t(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[jn] || (e[jn] = /* @__PURE__ */ new Set())).add(t);
  }
  function Yt(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const n = e[jn];
    n && (n.delete(t), n.size || (e[jn] = void 0));
  }
  function qs(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let wh = 0;
  function Xs(e, t, n, r) {
    const o = e._endId = ++wh, i = () => {
      o === e._endId && r();
    };
    if (n != null) return setTimeout(i, n);
    const { type: s, timeout: l, propCount: a } = Ic(e, t);
    if (!s) return r();
    const c = s + "end";
    let u = 0;
    const f = () => {
      e.removeEventListener(c, h), i();
    }, h = (v) => {
      v.target === e && ++u >= a && f();
    };
    setTimeout(() => {
      u < a && f();
    }, l + 1), e.addEventListener(c, h);
  }
  function Ic(e, t) {
    const n = window.getComputedStyle(e), r = (p) => (n[p] || "").split(", "), o = r(`${Gt}Delay`), i = r(`${Gt}Duration`), s = Ys(o, i), l = r(`${Jn}Delay`), a = r(`${Jn}Duration`), c = Ys(l, a);
    let u = null, f = 0, h = 0;
    t === Gt ? s > 0 && (u = Gt, f = s, h = i.length) : t === Jn ? c > 0 && (u = Jn, f = c, h = a.length) : (f = Math.max(s, c), u = f > 0 ? s > c ? Gt : Jn : null, h = u ? u === Gt ? i.length : a.length : 0);
    const v = u === Gt && /\b(?:transform|all)(?:,|$)/.test(r(`${Gt}Property`).toString());
    return {
      type: u,
      timeout: f,
      propCount: h,
      hasTransform: v
    };
  }
  function Ys(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, r) => Js(n) + Js(e[r])));
  }
  function Js(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function Ri(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight;
  }
  function _h(e, t, n) {
    const r = e[jn];
    r && (t = (t ? [
      t,
      ...r
    ] : [
      ...r
    ]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
  }
  let uo, Fc;
  uo = Symbol("_vod");
  Fc = Symbol("_vsh");
  Uy = {
    name: "show",
    beforeMount(e, { value: t }, { transition: n }) {
      e[uo] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Zn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n && (r ? t ? (r.beforeEnter(e), Zn(e, true), r.enter(e)) : r.leave(e, () => {
        Zn(e, false);
      }) : Zn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Zn(e, t);
    }
  };
  function Zn(e, t) {
    e.style.display = t ? e[uo] : "none", e[Fc] = !t;
  }
  const Ch = Symbol(""), Sh = /(?:^|;)\s*display\s*:/;
  function Eh(e, t, n) {
    const r = e.style, o = Oe(n);
    let i = false;
    if (n && !o) {
      if (t) if (Oe(t)) for (const s of t.split(";")) {
        const l = s.slice(0, s.indexOf(":")).trim();
        n[l] == null && Yr(r, l, "");
      }
      else for (const s in t) n[s] == null && Yr(r, s, "");
      for (const s in n) s === "display" && (i = true), Yr(r, s, n[s]);
    } else if (o) {
      if (t !== n) {
        const s = r[Ch];
        s && (n += ";" + s), r.cssText = n, i = Sh.test(n);
      }
    } else t && e.removeAttribute("style");
    uo in e && (e[uo] = i ? r.display : "", e[Fc] && (r.display = "none"));
  }
  const Zs = /\s*!important$/;
  function Yr(e, t, n) {
    if (ee(n)) n.forEach((r) => Yr(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
      const r = Rh(e, t);
      Zs.test(n) ? e.setProperty(on(r), n.replace(Zs, ""), "important") : e[r] = n;
    }
  }
  const Qs = [
    "Webkit",
    "Moz",
    "ms"
  ], ei = {};
  function Rh(e, t) {
    const n = ei[t];
    if (n) return n;
    let r = Qe(t);
    if (r !== "filter" && r in e) return ei[t] = r;
    r = xo(r);
    for (let o = 0; o < Qs.length; o++) {
      const i = Qs[o] + r;
      if (i in e) return ei[t] = i;
    }
    return t;
  }
  const el = "http://www.w3.org/1999/xlink";
  function tl(e, t, n, r, o, i = $f(t)) {
    r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(el, t.slice(6, t.length)) : e.setAttributeNS(el, t, n) : n == null || i && !pa(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : at(n) ? String(n) : n);
  }
  function nl(e, t, n, r, o) {
    if (t === "innerHTML" || t === "textContent") {
      n != null && (e[t] = t === "innerHTML" ? Tc(n) : n);
      return;
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
      const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
      (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
      return;
    }
    let s = false;
    if (n === "" || n == null) {
      const l = typeof e[t];
      l === "boolean" ? n = pa(n) : n == null && l === "string" ? (n = "", s = true) : l === "number" && (n = 0, s = true);
    }
    try {
      e[t] = n;
    } catch {
    }
    s && e.removeAttribute(o || t);
  }
  function Ah(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function Th(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  const rl = Symbol("_vei");
  function Oh(e, t, n, r, o = null) {
    const i = e[rl] || (e[rl] = {}), s = i[t];
    if (r && s) s.value = r;
    else {
      const [l, a] = Ph(t);
      if (r) {
        const c = i[t] = Fh(r, o);
        Ah(e, l, c, a);
      } else s && (Th(e, l, s, a), i[t] = void 0);
    }
  }
  const ol = /(?:Once|Passive|Capture)$/;
  function Ph(e) {
    let t;
    if (ol.test(e)) {
      t = {};
      let r;
      for (; r = e.match(ol); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
    }
    return [
      e[2] === ":" ? e.slice(3) : on(e.slice(2)),
      t
    ];
  }
  let ti = 0;
  const $h = Promise.resolve(), Ih = () => ti || ($h.then(() => ti = 0), ti = Date.now());
  function Fh(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      vt(Bh(r, n.value), t, 5, [
        r
      ]);
    };
    return n.value = e, n.attached = Ih(), n;
  }
  function Bh(e, t) {
    if (ee(t)) {
      const n = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        n.call(e), e._stopped = true;
      }, t.map((r) => (o) => !o._stopped && r && r(o));
    } else return t;
  }
  const il = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Mh = (e, t, n, r, o, i) => {
    const s = o === "svg";
    t === "class" ? _h(e, r, s) : t === "style" ? Eh(e, n, r) : vo(t) ? mo(t) || Oh(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : Lh(e, t, r, s)) ? (nl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && tl(e, t, r, s, i, t !== "value")) : e._isVueCE && (Hh(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Oe(r))) ? nl(e, Qe(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), tl(e, t, r, s));
  };
  function Lh(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && il(t) && re(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
    if (t === "width" || t === "height") {
      const o = e.tagName;
      if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE") return false;
    }
    return il(t) && Oe(n) ? false : t in e;
  }
  function Hh(e, t) {
    const n = e._def.props;
    if (!n) return false;
    const r = Qe(t);
    return Array.isArray(n) ? n.some((o) => Qe(o) === r) : Object.keys(n).some((o) => Qe(o) === r);
  }
  const Bc = /* @__PURE__ */ new WeakMap(), Mc = /* @__PURE__ */ new WeakMap(), fo = Symbol("_moveCb"), sl = Symbol("_enterCb"), zh = (e) => (delete e.props.mode, e), Nh = zh({
    name: "TransitionGroup",
    props: Be({}, Pc, {
      tag: String,
      moveClass: String
    }),
    setup(e, { slots: t }) {
      const n = Pr(), r = qa();
      let o, i;
      return rc(() => {
        if (!o.length) return;
        const s = e.moveClass || `${e.name || "v"}-move`;
        if (!Wh(o[0].el, n.vnode.el, s)) {
          o = [];
          return;
        }
        o.forEach(jh), o.forEach(kh);
        const l = o.filter(Vh);
        Ri(n.vnode.el), l.forEach((a) => {
          const c = a.el, u = c.style;
          _t(c, s), u.transform = u.webkitTransform = u.transitionDuration = "";
          const f = c[fo] = (h) => {
            h && h.target !== c || (!h || h.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", f), c[fo] = null, Yt(c, s));
          };
          c.addEventListener("transitionend", f);
        }), o = [];
      }), () => {
        const s = de(e), l = $c(s);
        let a = s.tag || De;
        if (o = [], i) for (let c = 0; c < i.length; c++) {
          const u = i[c];
          u.el && u.el instanceof Element && (o.push(u), _n(u, br(u, l, r, n)), Bc.set(u, Lc(u.el)));
        }
        i = t.default ? is(t.default()) : [];
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          u.key != null && _n(u, br(u, l, r, n));
        }
        return ke(a, null, i);
      };
    }
  }), Dh = Nh;
  function jh(e) {
    const t = e.el;
    t[fo] && t[fo](), t[sl] && t[sl]();
  }
  function kh(e) {
    Mc.set(e, Lc(e.el));
  }
  function Vh(e) {
    const t = Bc.get(e), n = Mc.get(e), r = t.left - n.left, o = t.top - n.top;
    if (r || o) {
      const i = e.el, s = i.style, l = i.getBoundingClientRect();
      let a = 1, c = 1;
      return i.offsetWidth && (a = l.width / i.offsetWidth), i.offsetHeight && (c = l.height / i.offsetHeight), (!Number.isFinite(a) || a === 0) && (a = 1), (!Number.isFinite(c) || c === 0) && (c = 1), Math.abs(a - 1) < 0.01 && (a = 1), Math.abs(c - 1) < 0.01 && (c = 1), s.transform = s.webkitTransform = `translate(${r / a}px,${o / c}px)`, s.transitionDuration = "0s", e;
    }
  }
  function Lc(e) {
    const t = e.getBoundingClientRect();
    return {
      left: t.left,
      top: t.top
    };
  }
  function Wh(e, t, n) {
    const r = e.cloneNode(), o = e[jn];
    o && o.forEach((l) => {
      l.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }), n.split(/\s+/).forEach((l) => l && r.classList.add(l)), r.style.display = "none";
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(r);
    const { hasTransform: s } = Ic(r);
    return i.removeChild(r), s;
  }
  let Uh, Kh, Gh, qh;
  Uh = [
    "ctrl",
    "shift",
    "alt",
    "meta"
  ];
  Kh = {
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
    exact: (e, t) => Uh.some((n) => e[`${n}Key`] && !t.includes(n))
  };
  Ky = (e, t) => {
    if (!e) return e;
    const n = e._withMods || (e._withMods = {}), r = t.join(".");
    return n[r] || (n[r] = ((o, ...i) => {
      for (let s = 0; s < t.length; s++) {
        const l = Kh[t[s]];
        if (l && l(o, t)) return;
      }
      return e(o, ...i);
    }));
  };
  Gh = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  };
  Gy = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}), r = t.join(".");
    return n[r] || (n[r] = ((o) => {
      if (!("key" in o)) return;
      const i = on(o.key);
      if (t.some((s) => s === i || Gh[s] === i)) return e(o);
    }));
  };
  qh = Be({
    patchProp: Mh
  }, bh);
  let ll;
  function Xh() {
    return ll || (ll = Zd(qh));
  }
  const Yh = ((...e) => {
    const t = Xh().createApp(...e), { mount: n } = t;
    return t.mount = (r) => {
      const o = Zh(r);
      if (!o) return;
      const i = t._component;
      !re(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
      const s = n(o, false, Jh(o));
      return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), s;
    }, t;
  });
  function Jh(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
  }
  function Zh(e) {
    return Oe(e) ? document.querySelector(e) : e;
  }
  let Hc;
  const Bo = (e) => Hc = e, zc = Symbol();
  function Ai(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var fr;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(fr || (fr = {}));
  function Qh() {
    const e = ba(true), t = e.run(() => be({}));
    let n = [], r = [];
    const o = es({
      install(i) {
        Bo(o), o._a = i, i.provide(zc, o), i.config.globalProperties.$pinia = o, r.forEach((s) => n.push(s)), r = [];
      },
      use(i) {
        return this._a ? n.push(i) : r.push(i), this;
      },
      _p: n,
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: t
    });
    return o;
  }
  const Nc = () => {
  };
  function al(e, t, n, r = Nc) {
    e.add(t);
    const o = () => {
      e.delete(t) && r();
    };
    return !n && ya() && Bf(o), o;
  }
  function $n(e, ...t) {
    e.forEach((n) => {
      n(...t);
    });
  }
  const ep = (e) => e(), cl = Symbol(), ni = Symbol();
  function Ti(e, t) {
    e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const n in t) {
      if (!t.hasOwnProperty(n)) continue;
      const r = t[n], o = e[n];
      Ai(o) && Ai(r) && e.hasOwnProperty(n) && !Re(r) && !Nt(r) ? e[n] = Ti(o, r) : e[n] = r;
    }
    return e;
  }
  const tp = Symbol();
  function np(e) {
    return !Ai(e) || !Object.prototype.hasOwnProperty.call(e, tp);
  }
  const { assign: Jt } = Object;
  function rp(e) {
    return !!(Re(e) && e.effect);
  }
  function op(e, t, n, r) {
    const { state: o, actions: i, getters: s } = t, l = n.state.value[e];
    let a;
    function c() {
      l || (n.state.value[e] = o ? o() : {});
      const u = nd(n.state.value[e]);
      return Jt(u, i, Object.keys(s || {}).reduce((f, h) => (f[h] = es(se(() => {
        Bo(n);
        const v = n._s.get(e);
        return s[h].call(v, v);
      })), f), {}));
    }
    return a = Dc(e, c, t, n, r, true), a;
  }
  function Dc(e, t, n = {}, r, o, i) {
    let s;
    const l = Jt({
      actions: {}
    }, n), a = {
      deep: true
    };
    let c, u, f = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), v;
    const p = r.state.value[e];
    !i && !p && (r.state.value[e] = {});
    let b;
    function _(w) {
      let y;
      c = u = false, typeof w == "function" ? (w(r.state.value[e]), y = {
        type: fr.patchFunction,
        storeId: e,
        events: v
      }) : (Ti(r.state.value[e], w), y = {
        type: fr.patchObject,
        payload: w,
        storeId: e,
        events: v
      });
      const M = b = Symbol();
      Eo().then(() => {
        b === M && (c = true);
      }), u = true, $n(f, y, r.state.value[e]);
    }
    const E = i ? function() {
      const { state: y } = n, M = y ? y() : {};
      this.$patch((V) => {
        Jt(V, M);
      });
    } : Nc;
    function x() {
      s.stop(), f.clear(), h.clear(), r._s.delete(e);
    }
    const B = (w, y = "") => {
      if (cl in w) return w[ni] = y, w;
      const M = function() {
        Bo(r);
        const V = Array.from(arguments), F = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
        function ie(q) {
          F.add(q);
        }
        function fe(q) {
          Q.add(q);
        }
        $n(h, {
          args: V,
          name: M[ni],
          store: j,
          after: ie,
          onError: fe
        });
        let oe;
        try {
          oe = w.apply(this && this.$id === e ? this : j, V);
        } catch (q) {
          throw $n(Q, q), q;
        }
        return oe instanceof Promise ? oe.then((q) => ($n(F, q), q)).catch((q) => ($n(Q, q), Promise.reject(q))) : ($n(F, oe), oe);
      };
      return M[cl] = true, M[ni] = y, M;
    }, I = {
      _p: r,
      $id: e,
      $onAction: al.bind(null, h),
      $patch: _,
      $reset: E,
      $subscribe(w, y = {}) {
        const M = al(f, w, y.detached, () => V()), V = s.run(() => sr(() => r.state.value[e], (F) => {
          (y.flush === "sync" ? u : c) && w({
            storeId: e,
            type: fr.direct,
            events: v
          }, F);
        }, Jt({}, a, y)));
        return M;
      },
      $dispose: x
    }, j = En(I);
    r._s.set(e, j);
    const A = (r._a && r._a.runWithContext || ep)(() => r._e.run(() => (s = ba()).run(() => t({
      action: B
    }))));
    for (const w in A) {
      const y = A[w];
      if (Re(y) && !rp(y) || Nt(y)) i || (p && np(y) && (Re(y) ? y.value = p[w] : Ti(y, p[w])), r.state.value[e][w] = y);
      else if (typeof y == "function") {
        const M = B(y, w);
        A[w] = M, l.actions[w] = y;
      }
    }
    return Jt(j, A), Jt(de(j), A), Object.defineProperty(j, "$state", {
      get: () => r.state.value[e],
      set: (w) => {
        _((y) => {
          Jt(y, w);
        });
      }
    }), r._p.forEach((w) => {
      Jt(j, s.run(() => w({
        store: j,
        app: r._a,
        pinia: r,
        options: l
      })));
    }), p && i && n.hydrate && n.hydrate(j.$state, p), c = true, u = true, j;
  }
  function ip(e, t, n) {
    let r;
    const o = typeof t == "function";
    r = o ? n : t;
    function i(s, l) {
      const a = dd();
      return s = s || (a ? Ce(zc, null) : null), s && Bo(s), s = Hc, s._s.has(e) || (o ? Dc(e, t, r, s) : op(e, r, s)), s._s.get(e);
    }
    return i.$id = e, i;
  }
  const Fn = typeof document < "u";
  function jc(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
  }
  function sp(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && jc(e.default);
  }
  const pe = Object.assign;
  function ri(e, t) {
    const n = {};
    for (const r in t) {
      const o = t[r];
      n[r] = mt(o) ? o.map(e) : e(o);
    }
    return n;
  }
  const dr = () => {
  }, mt = Array.isArray;
  function ul(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
  }
  const kc = /#/g, lp = /&/g, ap = /\//g, cp = /=/g, up = /\?/g, Vc = /\+/g, fp = /%5B/g, dp = /%5D/g, Wc = /%5E/g, hp = /%60/g, Uc = /%7B/g, pp = /%7C/g, Kc = /%7D/g, gp = /%20/g;
  function us(e) {
    return e == null ? "" : encodeURI("" + e).replace(pp, "|").replace(fp, "[").replace(dp, "]");
  }
  function vp(e) {
    return us(e).replace(Uc, "{").replace(Kc, "}").replace(Wc, "^");
  }
  function Oi(e) {
    return us(e).replace(Vc, "%2B").replace(gp, "+").replace(kc, "%23").replace(lp, "%26").replace(hp, "`").replace(Uc, "{").replace(Kc, "}").replace(Wc, "^");
  }
  function mp(e) {
    return Oi(e).replace(cp, "%3D");
  }
  function bp(e) {
    return us(e).replace(kc, "%23").replace(up, "%3F");
  }
  function yp(e) {
    return bp(e).replace(ap, "%2F");
  }
  function Cr(e) {
    if (e == null) return null;
    try {
      return decodeURIComponent("" + e);
    } catch {
    }
    return "" + e;
  }
  const xp = /\/$/, wp = (e) => e.replace(xp, "");
  function oi(e, t, n = "/") {
    let r, o = {}, i = "", s = "";
    const l = t.indexOf("#");
    let a = t.indexOf("?");
    return a = l >= 0 && a > l ? -1 : a, a >= 0 && (r = t.slice(0, a), i = t.slice(a, l > 0 ? l : t.length), o = e(i.slice(1))), l >= 0 && (r = r || t.slice(0, l), s = t.slice(l, t.length)), r = Ep(r ?? t, n), {
      fullPath: r + i + s,
      path: r,
      query: o,
      hash: Cr(s)
    };
  }
  function _p(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
  }
  function fl(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
  }
  function Cp(e, t, n) {
    const r = t.matched.length - 1, o = n.matched.length - 1;
    return r > -1 && r === o && kn(t.matched[r], n.matched[o]) && Gc(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
  }
  function kn(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function Gc(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return false;
    for (var n in e) if (!Sp(e[n], t[n])) return false;
    return true;
  }
  function Sp(e, t) {
    return mt(e) ? dl(e, t) : mt(t) ? dl(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
  }
  function dl(e, t) {
    return mt(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
  }
  function Ep(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"), r = e.split("/"), o = r[r.length - 1];
    (o === ".." || o === ".") && r.push("");
    let i = n.length - 1, s, l;
    for (s = 0; s < r.length; s++) if (l = r[s], l !== ".") if (l === "..") i > 1 && i--;
    else break;
    return n.slice(0, i).join("/") + "/" + r.slice(s).join("/");
  }
  const qt = {
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
  let Pi = (function(e) {
    return e.pop = "pop", e.push = "push", e;
  })({}), ii = (function(e) {
    return e.back = "back", e.forward = "forward", e.unknown = "", e;
  })({});
  function Rp(e) {
    if (!e) if (Fn) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), wp(e);
  }
  const Ap = /^[^#]+#/;
  function Tp(e, t) {
    return e.replace(Ap, "#") + t;
  }
  function Op(e, t) {
    const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - n.left - (t.left || 0),
      top: r.top - n.top - (t.top || 0)
    };
  }
  const Mo = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function Pp(e) {
    let t;
    if ("el" in e) {
      const n = e.el, r = typeof n == "string" && n.startsWith("#"), o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
      if (!o) return;
      t = Op(o, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
  }
  function hl(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const $i = /* @__PURE__ */ new Map();
  function $p(e, t) {
    $i.set(e, t);
  }
  function Ip(e) {
    const t = $i.get(e);
    return $i.delete(e), t;
  }
  function Fp(e) {
    return typeof e == "string" || e && typeof e == "object";
  }
  function qc(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  let Te = (function(e) {
    return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
  })({});
  const Xc = Symbol("");
  Te.MATCHER_NOT_FOUND + "", Te.NAVIGATION_GUARD_REDIRECT + "", Te.NAVIGATION_ABORTED + "", Te.NAVIGATION_CANCELLED + "", Te.NAVIGATION_DUPLICATED + "";
  function Vn(e, t) {
    return pe(new Error(), {
      type: e,
      [Xc]: true
    }, t);
  }
  function Ft(e, t) {
    return e instanceof Error && Xc in e && (t == null || !!(e.type & t));
  }
  const Bp = [
    "params",
    "query",
    "hash"
  ];
  function Mp(e) {
    if (typeof e == "string") return e;
    if (e.path != null) return e.path;
    const t = {};
    for (const n of Bp) n in e && (t[n] = e[n]);
    return JSON.stringify(t, null, 2);
  }
  function Lp(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const n = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < n.length; ++r) {
      const o = n[r].replace(Vc, " "), i = o.indexOf("="), s = Cr(i < 0 ? o : o.slice(0, i)), l = i < 0 ? null : Cr(o.slice(i + 1));
      if (s in t) {
        let a = t[s];
        mt(a) || (a = t[s] = [
          a
        ]), a.push(l);
      } else t[s] = l;
    }
    return t;
  }
  function pl(e) {
    let t = "";
    for (let n in e) {
      const r = e[n];
      if (n = mp(n), r == null) {
        r !== void 0 && (t += (t.length ? "&" : "") + n);
        continue;
      }
      (mt(r) ? r.map((o) => o && Oi(o)) : [
        r && Oi(r)
      ]).forEach((o) => {
        o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
      });
    }
    return t;
  }
  function Hp(e) {
    const t = {};
    for (const n in e) {
      const r = e[n];
      r !== void 0 && (t[n] = mt(r) ? r.map((o) => o == null ? null : "" + o) : r == null ? r : "" + r);
    }
    return t;
  }
  const zp = Symbol(""), gl = Symbol(""), Lo = Symbol(""), fs = Symbol(""), Ii = Symbol("");
  function Qn() {
    let e = [];
    function t(r) {
      return e.push(r), () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      };
    }
    function n() {
      e = [];
    }
    return {
      add: t,
      list: () => e.slice(),
      reset: n
    };
  }
  function Qt(e, t, n, r, o, i = (s) => s()) {
    const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () => new Promise((l, a) => {
      const c = (h) => {
        h === false ? a(Vn(Te.NAVIGATION_ABORTED, {
          from: n,
          to: t
        })) : h instanceof Error ? a(h) : Fp(h) ? a(Vn(Te.NAVIGATION_GUARD_REDIRECT, {
          from: t,
          to: h
        })) : (s && r.enterCallbacks[o] === s && typeof h == "function" && s.push(h), l());
      }, u = i(() => e.call(r && r.instances[o], t, n, c));
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(c)), f.catch((h) => a(h));
    });
  }
  function si(e, t, n, r, o = (i) => i()) {
    const i = [];
    for (const s of e) for (const l in s.components) {
      let a = s.components[l];
      if (!(t !== "beforeRouteEnter" && !s.instances[l])) if (jc(a)) {
        const c = (a.__vccOpts || a)[t];
        c && i.push(Qt(c, n, r, s, l, o));
      } else {
        let c = a();
        i.push(() => c.then((u) => {
          if (!u) throw new Error(`Couldn't resolve component "${l}" at "${s.path}"`);
          const f = sp(u) ? u.default : u;
          s.mods[l] = u, s.components[l] = f;
          const h = (f.__vccOpts || f)[t];
          return h && Qt(h, n, r, s, l, o)();
        }));
      }
    }
    return i;
  }
  function Np(e, t) {
    const n = [], r = [], o = [], i = Math.max(t.matched.length, e.matched.length);
    for (let s = 0; s < i; s++) {
      const l = t.matched[s];
      l && (e.matched.find((c) => kn(c, l)) ? r.push(l) : n.push(l));
      const a = e.matched[s];
      a && (t.matched.find((c) => kn(c, a)) || o.push(a));
    }
    return [
      n,
      r,
      o
    ];
  }
  let Dp = () => location.protocol + "//" + location.host;
  function Yc(e, t) {
    const { pathname: n, search: r, hash: o } = t, i = e.indexOf("#");
    if (i > -1) {
      let s = o.includes(e.slice(i)) ? e.slice(i).length : 1, l = o.slice(s);
      return l[0] !== "/" && (l = "/" + l), fl(l, "");
    }
    return fl(n, e) + r + o;
  }
  function jp(e, t, n, r) {
    let o = [], i = [], s = null;
    const l = ({ state: h }) => {
      const v = Yc(e, location), p = n.value, b = t.value;
      let _ = 0;
      if (h) {
        if (n.value = v, t.value = h, s && s === p) {
          s = null;
          return;
        }
        _ = b ? h.position - b.position : 0;
      } else r(v);
      o.forEach((E) => {
        E(n.value, p, {
          delta: _,
          type: Pi.pop,
          direction: _ ? _ > 0 ? ii.forward : ii.back : ii.unknown
        });
      });
    };
    function a() {
      s = n.value;
    }
    function c(h) {
      o.push(h);
      const v = () => {
        const p = o.indexOf(h);
        p > -1 && o.splice(p, 1);
      };
      return i.push(v), v;
    }
    function u() {
      if (document.visibilityState === "hidden") {
        const { history: h } = window;
        if (!h.state) return;
        h.replaceState(pe({}, h.state, {
          scroll: Mo()
        }), "");
      }
    }
    function f() {
      for (const h of i) h();
      i = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u);
    }
    return window.addEventListener("popstate", l), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u), {
      pauseListeners: a,
      listen: c,
      destroy: f
    };
  }
  function vl(e, t, n, r = false, o = false) {
    return {
      back: e,
      current: t,
      forward: n,
      replaced: r,
      position: window.history.length,
      scroll: o ? Mo() : null
    };
  }
  function kp(e) {
    const { history: t, location: n } = window, r = {
      value: Yc(e, n)
    }, o = {
      value: t.state
    };
    o.value || i(r.value, {
      back: null,
      current: r.value,
      forward: null,
      position: t.length - 1,
      replaced: true,
      scroll: null
    }, true);
    function i(a, c, u) {
      const f = e.indexOf("#"), h = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a : Dp() + e + a;
      try {
        t[u ? "replaceState" : "pushState"](c, "", h), o.value = c;
      } catch (v) {
        console.error(v), n[u ? "replace" : "assign"](h);
      }
    }
    function s(a, c) {
      i(a, pe({}, t.state, vl(o.value.back, a, o.value.forward, true), c, {
        position: o.value.position
      }), true), r.value = a;
    }
    function l(a, c) {
      const u = pe({}, o.value, t.state, {
        forward: a,
        scroll: Mo()
      });
      i(u.current, u, true), i(a, pe({}, vl(r.value, a, null), {
        position: u.position + 1
      }, c), false), r.value = a;
    }
    return {
      location: r,
      state: o,
      push: l,
      replace: s
    };
  }
  function Vp(e) {
    e = Rp(e);
    const t = kp(e), n = jp(e, t.state, t.location, t.replace);
    function r(i, s = true) {
      s || n.pauseListeners(), history.go(i);
    }
    const o = pe({
      location: "",
      base: e,
      go: r,
      createHref: Tp.bind(null, e)
    }, t, n);
    return Object.defineProperty(o, "location", {
      enumerable: true,
      get: () => t.location.value
    }), Object.defineProperty(o, "state", {
      enumerable: true,
      get: () => t.state.value
    }), o;
  }
  function Wp(e) {
    return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Vp(e);
  }
  let hn = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
  })({});
  var He = (function(e) {
    return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
  })(He || {});
  const Up = {
    type: hn.Static,
    value: ""
  }, Kp = /[a-zA-Z0-9_]/;
  function Gp(e) {
    if (!e) return [
      []
    ];
    if (e === "/") return [
      [
        Up
      ]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(v) {
      throw new Error(`ERR (${n})/"${c}": ${v}`);
    }
    let n = He.Static, r = n;
    const o = [];
    let i;
    function s() {
      i && o.push(i), i = [];
    }
    let l = 0, a, c = "", u = "";
    function f() {
      c && (n === He.Static ? i.push({
        type: hn.Static,
        value: c
      }) : n === He.Param || n === He.ParamRegExp || n === He.ParamRegExpEnd ? (i.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
        type: hn.Param,
        value: c,
        regexp: u,
        repeatable: a === "*" || a === "+",
        optional: a === "*" || a === "?"
      })) : t("Invalid state to consume buffer"), c = "");
    }
    function h() {
      c += a;
    }
    for (; l < e.length; ) {
      if (a = e[l++], a === "\\" && n !== He.ParamRegExp) {
        r = n, n = He.EscapeNext;
        continue;
      }
      switch (n) {
        case He.Static:
          a === "/" ? (c && f(), s()) : a === ":" ? (f(), n = He.Param) : h();
          break;
        case He.EscapeNext:
          h(), n = r;
          break;
        case He.Param:
          a === "(" ? n = He.ParamRegExp : Kp.test(a) ? h() : (f(), n = He.Static, a !== "*" && a !== "?" && a !== "+" && l--);
          break;
        case He.ParamRegExp:
          a === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + a : n = He.ParamRegExpEnd : u += a;
          break;
        case He.ParamRegExpEnd:
          f(), n = He.Static, a !== "*" && a !== "?" && a !== "+" && l--, u = "";
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return n === He.ParamRegExp && t(`Unfinished custom RegExp for param "${c}"`), f(), s(), o;
  }
  const ml = "[^/]+?", qp = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  var Je = (function(e) {
    return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
  })(Je || {});
  const Xp = /[.+*?^${}()[\]/\\]/g;
  function Yp(e, t) {
    const n = pe({}, qp, t), r = [];
    let o = n.start ? "^" : "";
    const i = [];
    for (const c of e) {
      const u = c.length ? [] : [
        Je.Root
      ];
      n.strict && !c.length && (o += "/");
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        let v = Je.Segment + (n.sensitive ? Je.BonusCaseSensitive : 0);
        if (h.type === hn.Static) f || (o += "/"), o += h.value.replace(Xp, "\\$&"), v += Je.Static;
        else if (h.type === hn.Param) {
          const { value: p, repeatable: b, optional: _, regexp: E } = h;
          i.push({
            name: p,
            repeatable: b,
            optional: _
          });
          const x = E || ml;
          if (x !== ml) {
            v += Je.BonusCustomRegExp;
            try {
              `${x}`;
            } catch (I) {
              throw new Error(`Invalid custom RegExp for param "${p}" (${x}): ` + I.message);
            }
          }
          let B = b ? `((?:${x})(?:/(?:${x}))*)` : `(${x})`;
          f || (B = _ && c.length < 2 ? `(?:/${B})` : "/" + B), _ && (B += "?"), o += B, v += Je.Dynamic, _ && (v += Je.BonusOptional), b && (v += Je.BonusRepeatable), x === ".*" && (v += Je.BonusWildcard);
        }
        u.push(v);
      }
      r.push(u);
    }
    if (n.strict && n.end) {
      const c = r.length - 1;
      r[c][r[c].length - 1] += Je.BonusStrict;
    }
    n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
    const s = new RegExp(o, n.sensitive ? "" : "i");
    function l(c) {
      const u = c.match(s), f = {};
      if (!u) return null;
      for (let h = 1; h < u.length; h++) {
        const v = u[h] || "", p = i[h - 1];
        f[p.name] = v && p.repeatable ? v.split("/") : v;
      }
      return f;
    }
    function a(c) {
      let u = "", f = false;
      for (const h of e) {
        (!f || !u.endsWith("/")) && (u += "/"), f = false;
        for (const v of h) if (v.type === hn.Static) u += v.value;
        else if (v.type === hn.Param) {
          const { value: p, repeatable: b, optional: _ } = v, E = p in c ? c[p] : "";
          if (mt(E) && !b) throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);
          const x = mt(E) ? E.join("/") : E;
          if (!x) if (_) h.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = true);
          else throw new Error(`Missing required param "${p}"`);
          u += x;
        }
      }
      return u || "/";
    }
    return {
      re: s,
      score: r,
      keys: i,
      parse: l,
      stringify: a
    };
  }
  function Jp(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const r = t[n] - e[n];
      if (r) return r;
      n++;
    }
    return e.length < t.length ? e.length === 1 && e[0] === Je.Static + Je.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Je.Static + Je.Segment ? 1 : -1 : 0;
  }
  function Jc(e, t) {
    let n = 0;
    const r = e.score, o = t.score;
    for (; n < r.length && n < o.length; ) {
      const i = Jp(r[n], o[n]);
      if (i) return i;
      n++;
    }
    if (Math.abs(o.length - r.length) === 1) {
      if (bl(r)) return 1;
      if (bl(o)) return -1;
    }
    return o.length - r.length;
  }
  function bl(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const Zp = {
    strict: false,
    end: true,
    sensitive: false
  };
  function Qp(e, t, n) {
    const r = Yp(Gp(e.path), n), o = pe(r, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
  }
  function eg(e, t) {
    const n = [], r = /* @__PURE__ */ new Map();
    t = ul(Zp, t);
    function o(f) {
      return r.get(f);
    }
    function i(f, h, v) {
      const p = !v, b = xl(f);
      b.aliasOf = v && v.record;
      const _ = ul(t, f), E = [
        b
      ];
      if ("alias" in f) {
        const I = typeof f.alias == "string" ? [
          f.alias
        ] : f.alias;
        for (const j of I) E.push(xl(pe({}, b, {
          components: v ? v.record.components : b.components,
          path: j,
          aliasOf: v ? v.record : b
        })));
      }
      let x, B;
      for (const I of E) {
        const { path: j } = I;
        if (h && j[0] !== "/") {
          const W = h.record.path, A = W[W.length - 1] === "/" ? "" : "/";
          I.path = h.record.path + (j && A + j);
        }
        if (x = Qp(I, h, _), v ? v.alias.push(x) : (B = B || x, B !== x && B.alias.push(x), p && f.name && !wl(x) && s(f.name)), Zc(x) && a(x), b.children) {
          const W = b.children;
          for (let A = 0; A < W.length; A++) i(W[A], x, v && v.children[A]);
        }
        v = v || x;
      }
      return B ? () => {
        s(B);
      } : dr;
    }
    function s(f) {
      if (qc(f)) {
        const h = r.get(f);
        h && (r.delete(f), n.splice(n.indexOf(h), 1), h.children.forEach(s), h.alias.forEach(s));
      } else {
        const h = n.indexOf(f);
        h > -1 && (n.splice(h, 1), f.record.name && r.delete(f.record.name), f.children.forEach(s), f.alias.forEach(s));
      }
    }
    function l() {
      return n;
    }
    function a(f) {
      const h = rg(f, n);
      n.splice(h, 0, f), f.record.name && !wl(f) && r.set(f.record.name, f);
    }
    function c(f, h) {
      let v, p = {}, b, _;
      if ("name" in f && f.name) {
        if (v = r.get(f.name), !v) throw Vn(Te.MATCHER_NOT_FOUND, {
          location: f
        });
        _ = v.record.name, p = pe(yl(h.params, v.keys.filter((B) => !B.optional).concat(v.parent ? v.parent.keys.filter((B) => B.optional) : []).map((B) => B.name)), f.params && yl(f.params, v.keys.map((B) => B.name))), b = v.stringify(p);
      } else if (f.path != null) b = f.path, v = n.find((B) => B.re.test(b)), v && (p = v.parse(b), _ = v.record.name);
      else {
        if (v = h.name ? r.get(h.name) : n.find((B) => B.re.test(h.path)), !v) throw Vn(Te.MATCHER_NOT_FOUND, {
          location: f,
          currentLocation: h
        });
        _ = v.record.name, p = pe({}, h.params, f.params), b = v.stringify(p);
      }
      const E = [];
      let x = v;
      for (; x; ) E.unshift(x.record), x = x.parent;
      return {
        name: _,
        path: b,
        params: p,
        matched: E,
        meta: ng(E)
      };
    }
    e.forEach((f) => i(f));
    function u() {
      n.length = 0, r.clear();
    }
    return {
      addRoute: i,
      resolve: c,
      removeRoute: s,
      clearRoutes: u,
      getRoutes: l,
      getRecordMatcher: o
    };
  }
  function yl(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
  }
  function xl(e) {
    const t = {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: e.aliasOf,
      beforeEnter: e.beforeEnter,
      props: tg(e),
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
  function tg(e) {
    const t = {}, n = e.props || false;
    if ("component" in e) t.default = n;
    else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
    return t;
  }
  function wl(e) {
    for (; e; ) {
      if (e.record.aliasOf) return true;
      e = e.parent;
    }
    return false;
  }
  function ng(e) {
    return e.reduce((t, n) => pe(t, n.meta), {});
  }
  function rg(e, t) {
    let n = 0, r = t.length;
    for (; n !== r; ) {
      const i = n + r >> 1;
      Jc(e, t[i]) < 0 ? r = i : n = i + 1;
    }
    const o = og(e);
    return o && (r = t.lastIndexOf(o, r - 1)), r;
  }
  function og(e) {
    let t = e;
    for (; t = t.parent; ) if (Zc(t) && Jc(e, t) === 0) return t;
  }
  function Zc({ record: e }) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
  }
  function _l(e) {
    const t = Ce(Lo), n = Ce(fs), r = se(() => {
      const a = mn(e.to);
      return t.resolve(a);
    }), o = se(() => {
      const { matched: a } = r.value, { length: c } = a, u = a[c - 1], f = n.matched;
      if (!u || !f.length) return -1;
      const h = f.findIndex(kn.bind(null, u));
      if (h > -1) return h;
      const v = Cl(a[c - 2]);
      return c > 1 && Cl(u) === v && f[f.length - 1].path !== v ? f.findIndex(kn.bind(null, a[c - 2])) : h;
    }), i = se(() => o.value > -1 && cg(n.params, r.value.params)), s = se(() => o.value > -1 && o.value === n.matched.length - 1 && Gc(n.params, r.value.params));
    function l(a = {}) {
      if (ag(a)) {
        const c = t[mn(e.replace) ? "replace" : "push"](mn(e.to)).catch(dr);
        return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => c), c;
      }
      return Promise.resolve();
    }
    return {
      route: r,
      href: se(() => r.value.href),
      isActive: i,
      isExactActive: s,
      navigate: l
    };
  }
  function ig(e) {
    return e.length === 1 ? e[0] : e;
  }
  const sg = Ne({
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
    useLink: _l,
    setup(e, { slots: t }) {
      const n = En(_l(e)), { options: r } = Ce(Lo), o = se(() => ({
        [Sl(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
        [Sl(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
      }));
      return () => {
        const i = t.default && ig(t.default(n));
        return e.custom ? i : $("a", {
          "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
          href: n.href,
          onClick: n.navigate,
          class: o.value
        }, i);
      };
    }
  }), lg = sg;
  function ag(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), true;
    }
  }
  function cg(e, t) {
    for (const n in t) {
      const r = t[n], o = e[n];
      if (typeof r == "string") {
        if (r !== o) return false;
      } else if (!mt(o) || o.length !== r.length || r.some((i, s) => i.valueOf() !== o[s].valueOf())) return false;
    }
    return true;
  }
  function Cl(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
  }
  const Sl = (e, t, n) => e ?? t ?? n, ug = Ne({
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
    setup(e, { attrs: t, slots: n }) {
      const r = Ce(Ii), o = se(() => e.route || r.value), i = Ce(gl, 0), s = se(() => {
        let c = mn(i);
        const { matched: u } = o.value;
        let f;
        for (; (f = u[c]) && !f.components; ) c++;
        return c;
      }), l = se(() => o.value.matched[s.value]);
      tn(gl, se(() => s.value + 1)), tn(zp, l), tn(Ii, o);
      const a = be();
      return sr(() => [
        a.value,
        l.value,
        e.name
      ], ([c, u, f], [h, v, p]) => {
        u && (u.instances[f] = c, v && v !== u && c && c === h && (u.leaveGuards.size || (u.leaveGuards = v.leaveGuards), u.updateGuards.size || (u.updateGuards = v.updateGuards))), c && u && (!v || !kn(u, v) || !h) && (u.enterCallbacks[f] || []).forEach((b) => b(c));
      }, {
        flush: "post"
      }), () => {
        const c = o.value, u = e.name, f = l.value, h = f && f.components[u];
        if (!h) return El(n.default, {
          Component: h,
          route: c
        });
        const v = f.props[u], p = v ? v === true ? c.params : typeof v == "function" ? v(c) : v : null, _ = $(h, pe({}, p, t, {
          onVnodeUnmounted: (E) => {
            E.component.isUnmounted && (f.instances[u] = null);
          },
          ref: a
        }));
        return El(n.default, {
          Component: _,
          route: c
        }) || _;
      };
    }
  });
  function El(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
  }
  const fg = ug;
  function dg(e) {
    const t = eg(e.routes, e), n = e.parseQuery || Lp, r = e.stringifyQuery || pl, o = e.history, i = Qn(), s = Qn(), l = Qn(), a = ts(qt);
    let c = qt;
    Fn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = ri.bind(null, (R) => "" + R), f = ri.bind(null, yp), h = ri.bind(null, Cr);
    function v(R, k) {
      let N, X;
      return qc(R) ? (N = t.getRecordMatcher(R), X = k) : X = R, t.addRoute(X, N);
    }
    function p(R) {
      const k = t.getRecordMatcher(R);
      k && t.removeRoute(k);
    }
    function b() {
      return t.getRoutes().map((R) => R.record);
    }
    function _(R) {
      return !!t.getRecordMatcher(R);
    }
    function E(R, k) {
      if (k = pe({}, k || a.value), typeof R == "string") {
        const m = oi(n, R, k.path), C = t.resolve({
          path: m.path
        }, k), T = o.createHref(m.fullPath);
        return pe(m, C, {
          params: h(C.params),
          hash: Cr(m.hash),
          redirectedFrom: void 0,
          href: T
        });
      }
      let N;
      if (R.path != null) N = pe({}, R, {
        path: oi(n, R.path, k.path).path
      });
      else {
        const m = pe({}, R.params);
        for (const C in m) m[C] == null && delete m[C];
        N = pe({}, R, {
          params: f(m)
        }), k.params = f(k.params);
      }
      const X = t.resolve(N, k), le = R.hash || "";
      X.params = u(h(X.params));
      const d = _p(r, pe({}, R, {
        hash: vp(le),
        path: X.path
      })), g = o.createHref(d);
      return pe({
        fullPath: d,
        hash: le,
        query: r === pl ? Hp(R.query) : R.query || {}
      }, X, {
        redirectedFrom: void 0,
        href: g
      });
    }
    function x(R) {
      return typeof R == "string" ? oi(n, R, a.value.path) : pe({}, R);
    }
    function B(R, k) {
      if (c !== R) return Vn(Te.NAVIGATION_CANCELLED, {
        from: k,
        to: R
      });
    }
    function I(R) {
      return A(R);
    }
    function j(R) {
      return I(pe(x(R), {
        replace: true
      }));
    }
    function W(R, k) {
      const N = R.matched[R.matched.length - 1];
      if (N && N.redirect) {
        const { redirect: X } = N;
        let le = typeof X == "function" ? X(R, k) : X;
        return typeof le == "string" && (le = le.includes("?") || le.includes("#") ? le = x(le) : {
          path: le
        }, le.params = {}), pe({
          query: R.query,
          hash: R.hash,
          params: le.path != null ? {} : R.params
        }, le);
      }
    }
    function A(R, k) {
      const N = c = E(R), X = a.value, le = R.state, d = R.force, g = R.replace === true, m = W(N, X);
      if (m) return A(pe(x(m), {
        state: typeof m == "object" ? pe({}, le, m.state) : le,
        force: d,
        replace: g
      }), k || N);
      const C = N;
      C.redirectedFrom = k;
      let T;
      return !d && Cp(r, X, N) && (T = Vn(Te.NAVIGATION_DUPLICATED, {
        to: C,
        from: X
      }), Pe(X, X, true, false)), (T ? Promise.resolve(T) : M(C, X)).catch((S) => Ft(S) ? Ft(S, Te.NAVIGATION_GUARD_REDIRECT) ? S : Ie(S) : ne(S, C, X)).then((S) => {
        if (S) {
          if (Ft(S, Te.NAVIGATION_GUARD_REDIRECT)) return A(pe({
            replace: g
          }, x(S.to), {
            state: typeof S.to == "object" ? pe({}, le, S.to.state) : le,
            force: d
          }), k || C);
        } else S = F(C, X, true, g, le);
        return V(C, X, S), S;
      });
    }
    function w(R, k) {
      const N = B(R, k);
      return N ? Promise.reject(N) : Promise.resolve();
    }
    function y(R) {
      const k = bt.values().next().value;
      return k && typeof k.runWithContext == "function" ? k.runWithContext(R) : R();
    }
    function M(R, k) {
      let N;
      const [X, le, d] = Np(R, k);
      N = si(X.reverse(), "beforeRouteLeave", R, k);
      for (const m of X) m.leaveGuards.forEach((C) => {
        N.push(Qt(C, R, k));
      });
      const g = w.bind(null, R, k);
      return N.push(g), Fe(N).then(() => {
        N = [];
        for (const m of i.list()) N.push(Qt(m, R, k));
        return N.push(g), Fe(N);
      }).then(() => {
        N = si(le, "beforeRouteUpdate", R, k);
        for (const m of le) m.updateGuards.forEach((C) => {
          N.push(Qt(C, R, k));
        });
        return N.push(g), Fe(N);
      }).then(() => {
        N = [];
        for (const m of d) if (m.beforeEnter) if (mt(m.beforeEnter)) for (const C of m.beforeEnter) N.push(Qt(C, R, k));
        else N.push(Qt(m.beforeEnter, R, k));
        return N.push(g), Fe(N);
      }).then(() => (R.matched.forEach((m) => m.enterCallbacks = {}), N = si(d, "beforeRouteEnter", R, k, y), N.push(g), Fe(N))).then(() => {
        N = [];
        for (const m of s.list()) N.push(Qt(m, R, k));
        return N.push(g), Fe(N);
      }).catch((m) => Ft(m, Te.NAVIGATION_CANCELLED) ? m : Promise.reject(m));
    }
    function V(R, k, N) {
      l.list().forEach((X) => y(() => X(R, k, N)));
    }
    function F(R, k, N, X, le) {
      const d = B(R, k);
      if (d) return d;
      const g = k === qt, m = Fn ? history.state : {};
      N && (X || g ? o.replace(R.fullPath, pe({
        scroll: g && m && m.scroll
      }, le)) : o.push(R.fullPath, le)), a.value = R, Pe(R, k, N, g), Ie();
    }
    let Q;
    function ie() {
      Q || (Q = o.listen((R, k, N) => {
        if (!dt.listening) return;
        const X = E(R), le = W(X, dt.currentRoute.value);
        if (le) {
          A(pe(le, {
            replace: true,
            force: true
          }), X).catch(dr);
          return;
        }
        c = X;
        const d = a.value;
        Fn && $p(hl(d.fullPath, N.delta), Mo()), M(X, d).catch((g) => Ft(g, Te.NAVIGATION_ABORTED | Te.NAVIGATION_CANCELLED) ? g : Ft(g, Te.NAVIGATION_GUARD_REDIRECT) ? (A(pe(x(g.to), {
          force: true
        }), X).then((m) => {
          Ft(m, Te.NAVIGATION_ABORTED | Te.NAVIGATION_DUPLICATED) && !N.delta && N.type === Pi.pop && o.go(-1, false);
        }).catch(dr), Promise.reject()) : (N.delta && o.go(-N.delta, false), ne(g, X, d))).then((g) => {
          g = g || F(X, d, false), g && (N.delta && !Ft(g, Te.NAVIGATION_CANCELLED) ? o.go(-N.delta, false) : N.type === Pi.pop && Ft(g, Te.NAVIGATION_ABORTED | Te.NAVIGATION_DUPLICATED) && o.go(-1, false)), V(X, d, g);
        }).catch(dr);
      }));
    }
    let fe = Qn(), oe = Qn(), q;
    function ne(R, k, N) {
      Ie(R);
      const X = oe.list();
      return X.length ? X.forEach((le) => le(R, k, N)) : console.error(R), Promise.reject(R);
    }
    function Ae() {
      return q && a.value !== qt ? Promise.resolve() : new Promise((R, k) => {
        fe.add([
          R,
          k
        ]);
      });
    }
    function Ie(R) {
      return q || (q = !R, ie(), fe.list().forEach(([k, N]) => R ? N(R) : k()), fe.reset()), R;
    }
    function Pe(R, k, N, X) {
      const { scrollBehavior: le } = e;
      if (!Fn || !le) return Promise.resolve();
      const d = !N && Ip(hl(R.fullPath, 0)) || (X || !N) && history.state && history.state.scroll || null;
      return Eo().then(() => le(R, k, d)).then((g) => g && Pp(g)).catch((g) => ne(g, R, k));
    }
    const $e = (R) => o.go(R);
    let ft;
    const bt = /* @__PURE__ */ new Set(), dt = {
      currentRoute: a,
      listening: true,
      addRoute: v,
      removeRoute: p,
      clearRoutes: t.clearRoutes,
      hasRoute: _,
      getRoutes: b,
      resolve: E,
      options: e,
      push: I,
      replace: j,
      go: $e,
      back: () => $e(-1),
      forward: () => $e(1),
      beforeEach: i.add,
      beforeResolve: s.add,
      afterEach: l.add,
      onError: oe.add,
      isReady: Ae,
      install(R) {
        R.component("RouterLink", lg), R.component("RouterView", fg), R.config.globalProperties.$router = dt, Object.defineProperty(R.config.globalProperties, "$route", {
          enumerable: true,
          get: () => mn(a)
        }), Fn && !ft && a.value === qt && (ft = true, I(o.location).catch((X) => {
        }));
        const k = {};
        for (const X in qt) Object.defineProperty(k, X, {
          get: () => a.value[X],
          enumerable: true
        });
        R.provide(Lo, dt), R.provide(fs, Ba(k)), R.provide(Ii, a);
        const N = R.unmount;
        bt.add(R), R.unmount = function() {
          bt.delete(R), bt.size < 1 && (c = qt, Q && Q(), Q = null, a.value = qt, ft = false, q = false), N();
        };
      }
    };
    function Fe(R) {
      return R.reduce((k, N) => k.then(() => y(N)), Promise.resolve());
    }
    return dt;
  }
  qy = function() {
    return Ce(Lo);
  };
  Xy = function(e) {
    return Ce(fs);
  };
  function hg(e) {
    const { extendRoutes: t, routes: n } = e;
    return t && console.warn('"extendRoutes()" is deprecated, please modify the routes directly. See https://uvr.esm.is/guide/extending-routes.html#extending-routes-at-runtime for an alternative.'), dg(Object.assign(e, {
      routes: typeof t == "function" && t(n) || n
    }));
  }
  let pg, gg, Rl, Xt, vg;
  pg = "modulepreload";
  gg = function(e) {
    return "/admin/" + e;
  };
  Rl = {};
  Xt = function(t, n, r) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      let s = function(c) {
        return Promise.all(c.map((u) => Promise.resolve(u).then((f) => ({
          status: "fulfilled",
          value: f
        }), (f) => ({
          status: "rejected",
          reason: f
        }))));
      };
      document.getElementsByTagName("link");
      const l = document.querySelector("meta[property=csp-nonce]"), a = (l == null ? void 0 : l.nonce) || (l == null ? void 0 : l.getAttribute("nonce"));
      o = s(n.map((c) => {
        if (c = gg(c), c in Rl) return;
        Rl[c] = true;
        const u = c.endsWith(".css"), f = u ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${c}"]${f}`)) return;
        const h = document.createElement("link");
        if (h.rel = u ? "stylesheet" : pg, u || (h.as = "script"), h.crossOrigin = "", h.href = c, a && h.setAttribute("nonce", a), document.head.appendChild(h), u) return new Promise((v, p) => {
          h.addEventListener("load", v), h.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${c}`)));
        });
      }));
    }
    function i(s) {
      const l = new Event("vite:preloadError", {
        cancelable: true
      });
      if (l.payload = s, window.dispatchEvent(l), !l.defaultPrevented) throw s;
    }
    return o.then((s) => {
      for (const l of s || []) l.status === "rejected" && i(l.reason);
      return t().catch(i);
    });
  };
  vg = [
    {
      path: "/",
      name: "/",
      component: () => Xt(() => import("./index-DhY-29rN.js"), __vite__mapDeps([0,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/backends",
      name: "/backends",
      component: () => Xt(() => import("./backends--ZcUi5X4.js"), __vite__mapDeps([2,3,4,5,6,7,8,9]))
    },
    {
      path: "/dashboard",
      name: "/dashboard",
      component: () => Xt(() => import("./dashboard-Ds_-6f2N.js"), __vite__mapDeps([10,3,4,5,11,12,13,8,7]))
    },
    {
      path: "/flags",
      name: "/flags",
      component: () => Xt(() => import("./flags-COoXx5Xu.js"), __vite__mapDeps([14,4,5,13]))
    },
    {
      path: "/keys",
      name: "/keys",
      component: () => Xt(() => import("./keys-Xree--d-.js"), __vite__mapDeps([15,11,4,5,7,6,8,9]))
    },
    {
      path: "/login",
      name: "/login",
      component: () => Xt(() => import("./login-XI2yG39w.js"), __vite__mapDeps([16,9,5,7,1])),
      meta: {
        layout: "auth"
      }
    },
    {
      path: "/mappings",
      name: "/mappings",
      component: () => Xt(() => import("./mappings-C7F0tzMn.js"), __vite__mapDeps([17,4,5,7,6,8,9]))
    },
    {
      path: "/usage",
      name: "/usage",
      component: () => Xt(() => import("./usage-f3KpMkDc.js"), __vite__mapDeps([18,4,5,7,8,9,12]))
    }
  ];
  mg = ip("auth", () => {
    const e = be(sessionStorage.getItem("admin_api_key") ?? ""), t = be(sessionStorage.getItem("admin_version") ?? ""), n = se(() => !!e.value);
    function r(i, s) {
      e.value = i, t.value = s, sessionStorage.setItem("admin_api_key", i), sessionStorage.setItem("admin_version", s);
    }
    function o() {
      e.value = "", t.value = "", sessionStorage.removeItem("admin_api_key"), sessionStorage.removeItem("admin_version");
    }
    return {
      apiKey: e,
      version: t,
      isAuthenticated: n,
      login: r,
      logout: o
    };
  });
  function bg(e) {
    let t = ".", n = "__", r = "--", o;
    if (e) {
      let p = e.blockPrefix;
      p && (t = p), p = e.elementPrefix, p && (n = p), p = e.modifierPrefix, p && (r = p);
    }
    const i = {
      install(p) {
        o = p.c;
        const b = p.context;
        b.bem = {}, b.bem.b = null, b.bem.els = null;
      }
    };
    function s(p) {
      let b, _;
      return {
        before(E) {
          b = E.bem.b, _ = E.bem.els, E.bem.els = null;
        },
        after(E) {
          E.bem.b = b, E.bem.els = _;
        },
        $({ context: E, props: x }) {
          return p = typeof p == "string" ? p : p({
            context: E,
            props: x
          }), E.bem.b = p, `${(x == null ? void 0 : x.bPrefix) || t}${E.bem.b}`;
        }
      };
    }
    function l(p) {
      let b;
      return {
        before(_) {
          b = _.bem.els;
        },
        after(_) {
          _.bem.els = b;
        },
        $({ context: _, props: E }) {
          return p = typeof p == "string" ? p : p({
            context: _,
            props: E
          }), _.bem.els = p.split(",").map((x) => x.trim()), _.bem.els.map((x) => `${(E == null ? void 0 : E.bPrefix) || t}${_.bem.b}${n}${x}`).join(", ");
        }
      };
    }
    function a(p) {
      return {
        $({ context: b, props: _ }) {
          p = typeof p == "string" ? p : p({
            context: b,
            props: _
          });
          const E = p.split(",").map((I) => I.trim());
          function x(I) {
            return E.map((j) => `&${(_ == null ? void 0 : _.bPrefix) || t}${b.bem.b}${I !== void 0 ? `${n}${I}` : ""}${r}${j}`).join(", ");
          }
          const B = b.bem.els;
          return B !== null ? x(B[0]) : x();
        }
      };
    }
    function c(p) {
      return {
        $({ context: b, props: _ }) {
          p = typeof p == "string" ? p : p({
            context: b,
            props: _
          });
          const E = b.bem.els;
          return `&:not(${(_ == null ? void 0 : _.bPrefix) || t}${b.bem.b}${E !== null && E.length > 0 ? `${n}${E[0]}` : ""}${r}${p})`;
        }
      };
    }
    return Object.assign(i, {
      cB: ((...p) => o(s(p[0]), p[1], p[2])),
      cE: ((...p) => o(l(p[0]), p[1], p[2])),
      cM: ((...p) => o(a(p[0]), p[1], p[2])),
      cNotM: ((...p) => o(c(p[0]), p[1], p[2]))
    }), i;
  }
  function yg(e) {
    let t = 0;
    for (let n = 0; n < e.length; ++n) e[n] === "&" && ++t;
    return t;
  }
  const Qc = /\s*,(?![^(]*\))\s*/g, xg = /\s+/g;
  function wg(e, t) {
    const n = [];
    return t.split(Qc).forEach((r) => {
      let o = yg(r);
      if (o) {
        if (o === 1) {
          e.forEach((s) => {
            n.push(r.replace("&", s));
          });
          return;
        }
      } else {
        e.forEach((s) => {
          n.push((s && s + " ") + r);
        });
        return;
      }
      let i = [
        r
      ];
      for (; o--; ) {
        const s = [];
        i.forEach((l) => {
          e.forEach((a) => {
            s.push(l.replace("&", a));
          });
        }), i = s;
      }
      i.forEach((s) => n.push(s));
    }), n;
  }
  function _g(e, t) {
    const n = [];
    return t.split(Qc).forEach((r) => {
      e.forEach((o) => {
        n.push((o && o + " ") + r);
      });
    }), n;
  }
  function Cg(e) {
    let t = [
      ""
    ];
    return e.forEach((n) => {
      n = n && n.trim(), n && (n.includes("&") ? t = wg(t, n) : t = _g(t, n));
    }), t.join(", ").replace(xg, " ");
  }
  function Al(e) {
    if (!e) return;
    const t = e.parentElement;
    t && t.removeChild(e);
  }
  function Ho(e, t) {
    return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
  }
  function Sg(e) {
    const t = document.createElement("style");
    return t.setAttribute("cssr-id", e), t;
  }
  function Dr(e) {
    return e ? /^\s*@(s|m)/.test(e) : false;
  }
  const Eg = /[A-Z]/g;
  function eu(e) {
    return e.replace(Eg, (t) => "-" + t.toLowerCase());
  }
  function Rg(e, t = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${eu(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
  }
  function Ag(e, t, n) {
    return typeof e == "function" ? e({
      context: t.context,
      props: n
    }) : e;
  }
  function Tl(e, t, n, r) {
    if (!t) return "";
    const o = Ag(t, n, r);
    if (!o) return "";
    if (typeof o == "string") return `${e} {
${o}
}`;
    const i = Object.keys(o);
    if (i.length === 0) return n.config.keepEmptyBlock ? e + ` {
}` : "";
    const s = e ? [
      e + " {"
    ] : [];
    return i.forEach((l) => {
      const a = o[l];
      if (l === "raw") {
        s.push(`
` + a + `
`);
        return;
      }
      l = eu(l), a != null && s.push(`  ${l}${Rg(a)}`);
    }), e && s.push("}"), s.join(`
`);
  }
  function Fi(e, t, n) {
    e && e.forEach((r) => {
      if (Array.isArray(r)) Fi(r, t, n);
      else if (typeof r == "function") {
        const o = r(t);
        Array.isArray(o) ? Fi(o, t, n) : o && n(o);
      } else r && n(r);
    });
  }
  function tu(e, t, n, r, o) {
    const i = e.$;
    let s = "";
    if (!i || typeof i == "string") Dr(i) ? s = i : t.push(i);
    else if (typeof i == "function") {
      const c = i({
        context: r.context,
        props: o
      });
      Dr(c) ? s = c : t.push(c);
    } else if (i.before && i.before(r.context), !i.$ || typeof i.$ == "string") Dr(i.$) ? s = i.$ : t.push(i.$);
    else if (i.$) {
      const c = i.$({
        context: r.context,
        props: o
      });
      Dr(c) ? s = c : t.push(c);
    }
    const l = Cg(t), a = Tl(l, e.props, r, o);
    s ? n.push(`${s} {`) : a.length && n.push(a), e.children && Fi(e.children, {
      context: r.context,
      props: o
    }, (c) => {
      if (typeof c == "string") {
        const u = Tl(l, {
          raw: c
        }, r, o);
        n.push(u);
      } else tu(c, t, n, r, o);
    }), t.pop(), s && n.push("}"), i && i.after && i.after(r.context);
  }
  function Tg(e, t, n) {
    const r = [];
    return tu(e, [], r, t, n), r.join(`

`);
  }
  function Bi(e) {
    for (var t = 0, n, r = 0, o = e.length; o >= 4; ++r, o -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
    switch (o) {
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
  function Og(e, t, n, r) {
    const { els: o } = t;
    if (n === void 0) o.forEach(Al), t.els = [];
    else {
      const i = Ho(n, r);
      i && o.includes(i) && (Al(i), t.els = o.filter((s) => s !== i));
    }
  }
  function Ol(e, t) {
    e.push(t);
  }
  function Pg(e, t, n, r, o, i, s, l, a) {
    let c;
    if (n === void 0 && (c = t.render(r), n = Bi(c)), a) {
      a.adapter(n, c ?? t.render(r));
      return;
    }
    l === void 0 && (l = document.head);
    const u = Ho(n, l);
    if (u !== null && !i) return u;
    const f = u ?? Sg(n);
    if (c === void 0 && (c = t.render(r)), f.textContent = c, u !== null) return u;
    if (s) {
      const h = l.querySelector(`meta[name="${s}"]`);
      if (h) return l.insertBefore(f, h), Ol(t.els, f), f;
    }
    return o ? l.insertBefore(f, l.querySelector("style, link")) : l.appendChild(f), Ol(t.els, f), f;
  }
  function $g(e) {
    return Tg(this, this.instance, e);
  }
  function Ig(e = {}) {
    const { id: t, ssr: n, props: r, head: o = false, force: i = false, anchorMetaName: s, parent: l } = e;
    return Pg(this.instance, this, t, r, o, i, s, l, n);
  }
  function Fg(e = {}) {
    const { id: t, parent: n } = e;
    Og(this.instance, this, t, n);
  }
  const jr = function(e, t, n, r) {
    return {
      instance: e,
      $: t,
      props: n,
      children: r,
      els: [],
      render: $g,
      mount: Ig,
      unmount: Fg
    };
  }, Bg = function(e, t, n, r) {
    return Array.isArray(t) ? jr(e, {
      $: null
    }, null, t) : Array.isArray(n) ? jr(e, t, null, n) : Array.isArray(r) ? jr(e, t, n, r) : jr(e, t, n, null);
  };
  Mg = function(e = {}) {
    const t = {
      c: ((...n) => Bg(t, ...n)),
      use: (n, ...r) => n.install(t, ...r),
      find: Ho,
      context: {},
      config: e
    };
    return t;
  };
  function Lg(e, t) {
    if (e === void 0) return false;
    if (t) {
      const { context: { ids: n } } = t;
      return n.has(e);
    }
    return Ho(e) !== null;
  }
  const Hg = "n", Sr = `.${Hg}-`, zg = "__", Ng = "--", nu = Mg(), ru = bg({
    blockPrefix: Sr,
    elementPrefix: zg,
    modifierPrefix: Ng
  });
  nu.use(ru);
  let Yy;
  ({ c: K, find: Yy } = nu);
  ({ cB: ae, cE: ze, cM: ue, cNotM: Dg } = ru);
  Jy = function(e) {
    return K(({ props: { bPrefix: t } }) => `${t || Sr}modal, ${t || Sr}drawer`, [
      e
    ]);
  };
  Zy = function(e) {
    return K(({ props: { bPrefix: t } }) => `${t || Sr}popover`, [
      e
    ]);
  };
  Qy = function(e) {
    return K(({ props: { bPrefix: t } }) => `&${t || Sr}modal`, e);
  };
  e1 = (...e) => K(">", [
    ae(...e)
  ]);
  Bt = function(e, t) {
    return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
  };
  jg = function(e) {
    return e.composedPath()[0] || null;
  };
  Pl = function(e) {
    return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
  };
  kg = function(e) {
    if (e != null) return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  };
  Bn = function(e, t) {
    const n = e.trim().split(/\s+/g), r = {
      top: n[0]
    };
    switch (n.length) {
      case 1:
        r.right = n[0], r.bottom = n[0], r.left = n[0];
        break;
      case 2:
        r.right = n[1], r.left = n[1], r.bottom = n[0];
        break;
      case 3:
        r.right = n[1], r.bottom = n[2], r.left = n[1];
        break;
      case 4:
        r.right = n[1], r.bottom = n[2], r.left = n[3];
        break;
      default:
        throw new Error("[seemly/getMargin]:" + e + " is not a valid value.");
    }
    return t === void 0 ? r : r[t];
  };
  const $l = {
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
  function Vg(e, t, n) {
    t /= 100, n /= 100;
    let r = (o, i = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
    return [
      r(5) * 255,
      r(3) * 255,
      r(1) * 255
    ];
  }
  function Wg(e, t, n) {
    t /= 100, n /= 100;
    let r = t * Math.min(n, 1 - n), o = (i, s = (i + e / 30) % 12) => n - r * Math.max(Math.min(s - 3, 9 - s, 1), -1);
    return [
      o(0) * 255,
      o(8) * 255,
      o(4) * 255
    ];
  }
  const Ot = "^\\s*", Pt = "\\s*$", rn = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", st = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", pn = "([0-9A-Fa-f])", gn = "([0-9A-Fa-f]{2})", ou = new RegExp(`${Ot}hsl\\s*\\(${st},${rn},${rn}\\)${Pt}`), iu = new RegExp(`${Ot}hsv\\s*\\(${st},${rn},${rn}\\)${Pt}`), su = new RegExp(`${Ot}hsla\\s*\\(${st},${rn},${rn},${st}\\)${Pt}`), lu = new RegExp(`${Ot}hsva\\s*\\(${st},${rn},${rn},${st}\\)${Pt}`), Ug = new RegExp(`${Ot}rgb\\s*\\(${st},${st},${st}\\)${Pt}`), Kg = new RegExp(`${Ot}rgba\\s*\\(${st},${st},${st},${st}\\)${Pt}`), Gg = new RegExp(`${Ot}#${pn}${pn}${pn}${Pt}`), qg = new RegExp(`${Ot}#${gn}${gn}${gn}${Pt}`), Xg = new RegExp(`${Ot}#${pn}${pn}${pn}${pn}${Pt}`), Yg = new RegExp(`${Ot}#${gn}${gn}${gn}${gn}${Pt}`);
  function ot(e) {
    return parseInt(e, 16);
  }
  function Jg(e) {
    try {
      let t;
      if (t = su.exec(e)) return [
        ho(t[1]),
        en(t[5]),
        en(t[9]),
        yn(t[13])
      ];
      if (t = ou.exec(e)) return [
        ho(t[1]),
        en(t[5]),
        en(t[9]),
        1
      ];
      throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  function Zg(e) {
    try {
      let t;
      if (t = lu.exec(e)) return [
        ho(t[1]),
        en(t[5]),
        en(t[9]),
        yn(t[13])
      ];
      if (t = iu.exec(e)) return [
        ho(t[1]),
        en(t[5]),
        en(t[9]),
        1
      ];
      throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  Cn = function(e) {
    try {
      let t;
      if (t = qg.exec(e)) return [
        ot(t[1]),
        ot(t[2]),
        ot(t[3]),
        1
      ];
      if (t = Ug.exec(e)) return [
        Ge(t[1]),
        Ge(t[5]),
        Ge(t[9]),
        1
      ];
      if (t = Kg.exec(e)) return [
        Ge(t[1]),
        Ge(t[5]),
        Ge(t[9]),
        yn(t[13])
      ];
      if (t = Gg.exec(e)) return [
        ot(t[1] + t[1]),
        ot(t[2] + t[2]),
        ot(t[3] + t[3]),
        1
      ];
      if (t = Yg.exec(e)) return [
        ot(t[1]),
        ot(t[2]),
        ot(t[3]),
        yn(ot(t[4]) / 255)
      ];
      if (t = Xg.exec(e)) return [
        ot(t[1] + t[1]),
        ot(t[2] + t[2]),
        ot(t[3] + t[3]),
        yn(ot(t[4] + t[4]) / 255)
      ];
      if (e in $l) return Cn($l[e]);
      if (ou.test(e) || su.test(e)) {
        const [n, r, o, i] = Jg(e);
        return [
          ...Wg(n, r, o),
          i
        ];
      } else if (iu.test(e) || lu.test(e)) {
        const [n, r, o, i] = Zg(e);
        return [
          ...Vg(n, r, o),
          i
        ];
      }
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  };
  function Qg(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function Mi(e, t, n, r) {
    return `rgba(${Ge(e)}, ${Ge(t)}, ${Ge(n)}, ${Qg(r)})`;
  }
  function li(e, t, n, r, o) {
    return Ge((e * t * (1 - r) + n * r) / o);
  }
  ev = function(e, t) {
    Array.isArray(e) || (e = Cn(e)), Array.isArray(t) || (t = Cn(t));
    const n = e[3], r = t[3], o = yn(n + r - n * r);
    return Mi(li(e[0], n, t[0], r, o), li(e[1], n, t[1], r, o), li(e[2], n, t[2], r, o), o);
  };
  t1 = function(e, t) {
    const [n, r, o, i = 1] = Array.isArray(e) ? e : Cn(e);
    return typeof t.alpha == "number" ? Mi(n, r, o, t.alpha) : Mi(n, r, o, i);
  };
  function kr(e, t) {
    const [n, r, o, i = 1] = Array.isArray(e) ? e : Cn(e), { lightness: s = 1, alpha: l = 1 } = t;
    return tv([
      n * s,
      r * s,
      o * s,
      i * l
    ]);
  }
  function yn(e) {
    const t = Math.round(Number(e) * 100) / 100;
    return t > 1 ? 1 : t < 0 ? 0 : t;
  }
  function ho(e) {
    const t = Math.round(Number(e));
    return t >= 360 || t < 0 ? 0 : t;
  }
  function Ge(e) {
    const t = Math.round(Number(e));
    return t > 255 ? 255 : t < 0 ? 0 : t;
  }
  function en(e) {
    const t = Math.round(Number(e));
    return t > 100 ? 100 : t < 0 ? 0 : t;
  }
  function tv(e) {
    const [t, n, r] = e;
    return 3 in e ? `rgba(${Ge(t)}, ${Ge(n)}, ${Ge(r)}, ${yn(e[3])})` : `rgba(${Ge(t)}, ${Ge(n)}, ${Ge(r)}, 1)`;
  }
  au = function(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  };
  n1 = function(e, t) {
    const n = [];
    for (let r = 0; r < e; ++r) n.push(t);
    return n;
  };
  function Jr(e) {
    return e.composedPath()[0];
  }
  const nv = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function rv(e, t, n) {
    if (e === "mousemoveoutside") {
      const r = (o) => {
        t.contains(Jr(o)) || n(o);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = false;
      const o = (s) => {
        r = !t.contains(Jr(s));
      }, i = (s) => {
        r && (t.contains(Jr(s)) || n(s));
      };
      return {
        mousedown: o,
        mouseup: i,
        touchstart: o,
        touchend: i
      };
    }
    return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`), {};
  }
  function cu(e, t, n) {
    const r = nv[e];
    let o = r.get(t);
    o === void 0 && r.set(t, o = /* @__PURE__ */ new WeakMap());
    let i = o.get(n);
    return i === void 0 && o.set(n, i = rv(e, t, n)), i;
  }
  function ov(e, t, n, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const o = cu(e, t, n);
      return Object.keys(o).forEach((i) => {
        nr(i, document, o[i], r);
      }), true;
    }
    return false;
  }
  function iv(e, t, n, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const o = cu(e, t, n);
      return Object.keys(o).forEach((i) => {
        un(i, document, o[i], r);
      }), true;
    }
    return false;
  }
  function sv() {
    if (typeof window > "u") return {
      on: () => {
      },
      off: () => {
      }
    };
    const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    function n() {
      e.set(this, true);
    }
    function r() {
      e.set(this, true), t.set(this, true);
    }
    function o(A, w, y) {
      const M = A[w];
      return A[w] = function() {
        return y.apply(A, arguments), M.apply(A, arguments);
      }, A;
    }
    function i(A, w) {
      A[w] = Event.prototype[w];
    }
    const s = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function a() {
      var A;
      return (A = s.get(this)) !== null && A !== void 0 ? A : null;
    }
    function c(A, w) {
      l !== void 0 && Object.defineProperty(A, "currentTarget", {
        configurable: true,
        enumerable: true,
        get: w ?? l.get
      });
    }
    const u = {
      bubble: {},
      capture: {}
    }, f = {};
    function h() {
      const A = function(w) {
        const { type: y, eventPhase: M, bubbles: V } = w, F = Jr(w);
        if (M === 2) return;
        const Q = M === 1 ? "capture" : "bubble";
        let ie = F;
        const fe = [];
        for (; ie === null && (ie = window), fe.push(ie), ie !== window; ) ie = ie.parentNode || null;
        const oe = u.capture[y], q = u.bubble[y];
        if (o(w, "stopPropagation", n), o(w, "stopImmediatePropagation", r), c(w, a), Q === "capture") {
          if (oe === void 0) return;
          for (let ne = fe.length - 1; ne >= 0 && !e.has(w); --ne) {
            const Ae = fe[ne], Ie = oe.get(Ae);
            if (Ie !== void 0) {
              s.set(w, Ae);
              for (const Pe of Ie) {
                if (t.has(w)) break;
                Pe(w);
              }
            }
            if (ne === 0 && !V && q !== void 0) {
              const Pe = q.get(Ae);
              if (Pe !== void 0) for (const $e of Pe) {
                if (t.has(w)) break;
                $e(w);
              }
            }
          }
        } else if (Q === "bubble") {
          if (q === void 0) return;
          for (let ne = 0; ne < fe.length && !e.has(w); ++ne) {
            const Ae = fe[ne], Ie = q.get(Ae);
            if (Ie !== void 0) {
              s.set(w, Ae);
              for (const Pe of Ie) {
                if (t.has(w)) break;
                Pe(w);
              }
            }
          }
        }
        i(w, "stopPropagation"), i(w, "stopImmediatePropagation"), c(w);
      };
      return A.displayName = "evtdUnifiedHandler", A;
    }
    function v() {
      const A = function(w) {
        const { type: y, eventPhase: M } = w;
        if (M !== 2) return;
        const V = f[y];
        V !== void 0 && V.forEach((F) => F(w));
      };
      return A.displayName = "evtdUnifiedWindowEventHandler", A;
    }
    const p = h(), b = v();
    function _(A, w) {
      const y = u[A];
      return y[w] === void 0 && (y[w] = /* @__PURE__ */ new Map(), window.addEventListener(w, p, A === "capture")), y[w];
    }
    function E(A) {
      return f[A] === void 0 && (f[A] = /* @__PURE__ */ new Set(), window.addEventListener(A, b)), f[A];
    }
    function x(A, w) {
      let y = A.get(w);
      return y === void 0 && A.set(w, y = /* @__PURE__ */ new Set()), y;
    }
    function B(A, w, y, M) {
      const V = u[w][y];
      if (V !== void 0) {
        const F = V.get(A);
        if (F !== void 0 && F.has(M)) return true;
      }
      return false;
    }
    function I(A, w) {
      const y = f[A];
      return !!(y !== void 0 && y.has(w));
    }
    function j(A, w, y, M) {
      let V;
      if (typeof M == "object" && M.once === true ? V = (oe) => {
        W(A, w, V, M), y(oe);
      } : V = y, ov(A, w, V, M)) return;
      const Q = M === true || typeof M == "object" && M.capture === true ? "capture" : "bubble", ie = _(Q, A), fe = x(ie, w);
      if (fe.has(V) || fe.add(V), w === window) {
        const oe = E(A);
        oe.has(V) || oe.add(V);
      }
    }
    function W(A, w, y, M) {
      if (iv(A, w, y, M)) return;
      const F = M === true || typeof M == "object" && M.capture === true, Q = F ? "capture" : "bubble", ie = _(Q, A), fe = x(ie, w);
      if (w === window && !B(w, F ? "bubble" : "capture", A, y) && I(A, y)) {
        const q = f[A];
        q.delete(y), q.size === 0 && (window.removeEventListener(A, b), f[A] = void 0);
      }
      fe.has(y) && fe.delete(y), fe.size === 0 && ie.delete(w), ie.size === 0 && (window.removeEventListener(A, p, Q === "capture"), u[Q][A] = void 0);
    }
    return {
      on: j,
      off: W
    };
  }
  ({ on: nr, off: un } = sv());
  lv = function() {
    const e = be(false);
    return Rn(() => {
      e.value = true;
    }), eo(e);
  };
  const av = (typeof window > "u" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
  function cv() {
    return av;
  }
  r1 = function(e) {
    return e;
  };
  function uv(e) {
    const t = {
      isDeactivated: false
    };
    let n = false;
    return ec(() => {
      if (t.isDeactivated = false, !n) {
        n = true;
        return;
      }
      e();
    }), tc(() => {
      t.isDeactivated = true, n || (n = true);
    }), t;
  }
  const fv = "@css-render/vue3-ssr";
  function dv(e, t) {
    return `<style cssr-id="${e}">
${t}
</style>`;
  }
  function hv(e, t, n) {
    const { styles: r, ids: o } = n;
    o.has(e) || r !== null && (o.add(e), r.push(dv(e, t)));
  }
  const pv = typeof document < "u";
  zo = function() {
    if (pv) return;
    const e = Ce(fv, null);
    if (e !== null) return {
      adapter: (t, n) => hv(t, n, e),
      context: e
    };
  };
  function Il(e, t) {
    console.error(`[vueuc/${e}]: ${t}`);
  }
  var xn = [], gv = function() {
    return xn.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, vv = function() {
    return xn.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, Fl = "ResizeObserver loop completed with undelivered notifications.", mv = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: Fl
    }) : (e = document.createEvent("Event"), e.initEvent("error", false, false), e.message = Fl), window.dispatchEvent(e);
  }, Er;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Er || (Er = {}));
  var wn = function(e) {
    return Object.freeze(e);
  }, bv = /* @__PURE__ */ (function() {
    function e(t, n) {
      this.inlineSize = t, this.blockSize = n, wn(this);
    }
    return e;
  })(), uu = (function() {
    function e(t, n, r, o) {
      return this.x = t, this.y = n, this.width = r, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, wn(this);
    }
    return e.prototype.toJSON = function() {
      var t = this, n = t.x, r = t.y, o = t.top, i = t.right, s = t.bottom, l = t.left, a = t.width, c = t.height;
      return {
        x: n,
        y: r,
        top: o,
        right: i,
        bottom: s,
        left: l,
        width: a,
        height: c
      };
    }, e.fromRect = function(t) {
      return new e(t.x, t.y, t.width, t.height);
    }, e;
  })(), ds = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, fu = function(e) {
    if (ds(e)) {
      var t = e.getBBox(), n = t.width, r = t.height;
      return !n && !r;
    }
    var o = e, i = o.offsetWidth, s = o.offsetHeight;
    return !(i || s || e.getClientRects().length);
  }, Bl = function(e) {
    var t;
    if (e instanceof Element) return true;
    var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
    return !!(n && e instanceof n.Element);
  }, yv = function(e) {
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
  }, hr = typeof window < "u" ? window : {}, Vr = /* @__PURE__ */ new WeakMap(), Ml = /auto|scroll/, xv = /^tb|vertical/, wv = /msie|trident/i.test(hr.navigator && hr.navigator.userAgent), xt = function(e) {
    return parseFloat(e || "0");
  }, Nn = function(e, t, n) {
    return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = false), new bv((n ? t : e) || 0, (n ? e : t) || 0);
  }, Ll = wn({
    devicePixelContentBoxSize: Nn(),
    borderBoxSize: Nn(),
    contentBoxSize: Nn(),
    contentRect: new uu(0, 0, 0, 0)
  }), du = function(e, t) {
    if (t === void 0 && (t = false), Vr.has(e) && !t) return Vr.get(e);
    if (fu(e)) return Vr.set(e, Ll), Ll;
    var n = getComputedStyle(e), r = ds(e) && e.ownerSVGElement && e.getBBox(), o = !wv && n.boxSizing === "border-box", i = xv.test(n.writingMode || ""), s = !r && Ml.test(n.overflowY || ""), l = !r && Ml.test(n.overflowX || ""), a = r ? 0 : xt(n.paddingTop), c = r ? 0 : xt(n.paddingRight), u = r ? 0 : xt(n.paddingBottom), f = r ? 0 : xt(n.paddingLeft), h = r ? 0 : xt(n.borderTopWidth), v = r ? 0 : xt(n.borderRightWidth), p = r ? 0 : xt(n.borderBottomWidth), b = r ? 0 : xt(n.borderLeftWidth), _ = f + c, E = a + u, x = b + v, B = h + p, I = l ? e.offsetHeight - B - e.clientHeight : 0, j = s ? e.offsetWidth - x - e.clientWidth : 0, W = o ? _ + x : 0, A = o ? E + B : 0, w = r ? r.width : xt(n.width) - W - j, y = r ? r.height : xt(n.height) - A - I, M = w + _ + j + x, V = y + E + I + B, F = wn({
      devicePixelContentBoxSize: Nn(Math.round(w * devicePixelRatio), Math.round(y * devicePixelRatio), i),
      borderBoxSize: Nn(M, V, i),
      contentBoxSize: Nn(w, y, i),
      contentRect: new uu(f, a, w, y)
    });
    return Vr.set(e, F), F;
  }, hu = function(e, t, n) {
    var r = du(e, n), o = r.borderBoxSize, i = r.contentBoxSize, s = r.devicePixelContentBoxSize;
    switch (t) {
      case Er.DEVICE_PIXEL_CONTENT_BOX:
        return s;
      case Er.BORDER_BOX:
        return o;
      default:
        return i;
    }
  }, _v = /* @__PURE__ */ (function() {
    function e(t) {
      var n = du(t);
      this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = wn([
        n.borderBoxSize
      ]), this.contentBoxSize = wn([
        n.contentBoxSize
      ]), this.devicePixelContentBoxSize = wn([
        n.devicePixelContentBoxSize
      ]);
    }
    return e;
  })(), pu = function(e) {
    if (fu(e)) return 1 / 0;
    for (var t = 0, n = e.parentNode; n; ) t += 1, n = n.parentNode;
    return t;
  }, Cv = function() {
    var e = 1 / 0, t = [];
    xn.forEach(function(s) {
      if (s.activeTargets.length !== 0) {
        var l = [];
        s.activeTargets.forEach(function(c) {
          var u = new _v(c.target), f = pu(c.target);
          l.push(u), c.lastReportedSize = hu(c.target, c.observedBox), f < e && (e = f);
        }), t.push(function() {
          s.callback.call(s.observer, l, s.observer);
        }), s.activeTargets.splice(0, s.activeTargets.length);
      }
    });
    for (var n = 0, r = t; n < r.length; n++) {
      var o = r[n];
      o();
    }
    return e;
  }, Hl = function(e) {
    xn.forEach(function(n) {
      n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(o) {
        o.isActive() && (pu(o.target) > e ? n.activeTargets.push(o) : n.skippedTargets.push(o));
      });
    });
  }, Sv = function() {
    var e = 0;
    for (Hl(e); gv(); ) e = Cv(), Hl(e);
    return vv() && mv(), e > 0;
  }, ai, gu = [], Ev = function() {
    return gu.splice(0).forEach(function(e) {
      return e();
    });
  }, Rv = function(e) {
    if (!ai) {
      var t = 0, n = document.createTextNode(""), r = {
        characterData: true
      };
      new MutationObserver(function() {
        return Ev();
      }).observe(n, r), ai = function() {
        n.textContent = "".concat(t ? t-- : t++);
      };
    }
    gu.push(e), ai();
  }, Av = function(e) {
    Rv(function() {
      requestAnimationFrame(e);
    });
  }, Zr = 0, Tv = function() {
    return !!Zr;
  }, Ov = 250, Pv = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }, zl = [
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
  ], Nl = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, ci = false, $v = (function() {
    function e() {
      var t = this;
      this.stopped = true, this.listener = function() {
        return t.schedule();
      };
    }
    return e.prototype.run = function(t) {
      var n = this;
      if (t === void 0 && (t = Ov), !ci) {
        ci = true;
        var r = Nl(t);
        Av(function() {
          var o = false;
          try {
            o = Sv();
          } finally {
            if (ci = false, t = r - Nl(), !Tv()) return;
            o ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var t = this, n = function() {
        return t.observer && t.observer.observe(document.body, Pv);
      };
      document.body ? n() : hr.addEventListener("DOMContentLoaded", n);
    }, e.prototype.start = function() {
      var t = this;
      this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), zl.forEach(function(n) {
        return hr.addEventListener(n, t.listener, true);
      }));
    }, e.prototype.stop = function() {
      var t = this;
      this.stopped || (this.observer && this.observer.disconnect(), zl.forEach(function(n) {
        return hr.removeEventListener(n, t.listener, true);
      }), this.stopped = true);
    }, e;
  })(), Li = new $v(), Dl = function(e) {
    !Zr && e > 0 && Li.start(), Zr += e, !Zr && Li.stop();
  }, Iv = function(e) {
    return !ds(e) && !yv(e) && getComputedStyle(e).display === "inline";
  }, Fv = (function() {
    function e(t, n) {
      this.target = t, this.observedBox = n || Er.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var t = hu(this.target, this.observedBox, true);
      return Iv(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
    }, e;
  })(), Bv = /* @__PURE__ */ (function() {
    function e(t, n) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
    }
    return e;
  })(), Wr = /* @__PURE__ */ new WeakMap(), jl = function(e, t) {
    for (var n = 0; n < e.length; n += 1) if (e[n].target === t) return n;
    return -1;
  }, Ur = (function() {
    function e() {
    }
    return e.connect = function(t, n) {
      var r = new Bv(t, n);
      Wr.set(t, r);
    }, e.observe = function(t, n, r) {
      var o = Wr.get(t), i = o.observationTargets.length === 0;
      jl(o.observationTargets, n) < 0 && (i && xn.push(o), o.observationTargets.push(new Fv(n, r && r.box)), Dl(1), Li.schedule());
    }, e.unobserve = function(t, n) {
      var r = Wr.get(t), o = jl(r.observationTargets, n), i = r.observationTargets.length === 1;
      o >= 0 && (i && xn.splice(xn.indexOf(r), 1), r.observationTargets.splice(o, 1), Dl(-1));
    }, e.disconnect = function(t) {
      var n = this, r = Wr.get(t);
      r.observationTargets.slice().forEach(function(o) {
        return n.unobserve(t, o.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  })(), Mv = (function() {
    function e(t) {
      if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof t != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      Ur.connect(this, t);
    }
    return e.prototype.observe = function(t, n) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Bl(t)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Ur.observe(this, t, n);
    }, e.prototype.unobserve = function(t) {
      if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Bl(t)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Ur.unobserve(this, t);
    }, e.prototype.disconnect = function() {
      Ur.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  })();
  class Lv {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Mv)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
    }
    handleResize(t) {
      for (const n of t) {
        const r = this.elHandlersMap.get(n.target);
        r !== void 0 && r(n);
      }
    }
    registerHandler(t, n) {
      this.elHandlersMap.set(t, n), this.observer.observe(t);
    }
    unregisterHandler(t) {
      this.elHandlersMap.has(t) && (this.elHandlersMap.delete(t), this.observer.unobserve(t));
    }
  }
  kl = new Lv();
  Vl = Ne({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let t = false;
      const n = Pr().proxy;
      function r(o) {
        const { onResize: i } = e;
        i !== void 0 && i(o);
      }
      Rn(() => {
        const o = n.$el;
        if (o === void 0) {
          Il("resize-observer", "$el does not exist.");
          return;
        }
        if (o.nextElementSibling !== o.nextSibling && o.nodeType === 3 && o.nodeValue !== "") {
          Il("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        o.nextElementSibling !== null && (kl.registerHandler(o.nextElementSibling, r), t = true);
      }), Po(() => {
        t && kl.unregisterHandler(n.$el.nextElementSibling);
      });
    },
    render() {
      return Pd(this.$slots, "default");
    }
  });
  function Wl(e) {
    const { left: t, right: n, top: r, bottom: o } = Bn(e);
    return `${r} ${t} ${o} ${n}`;
  }
  o1 = function(e, t) {
    console.error(`[naive/${e}]: ${t}`);
  };
  Hv = function(e, t) {
    throw new Error(`[naive/${e}]: ${t}`);
  };
  zv = function(e, t = [], n) {
    const r = {};
    return t.forEach((o) => {
      r[o] = e[o];
    }), Object.assign(r, n);
  };
  Nv = function(e) {
    return Object.keys(e);
  };
  vu = function(e, t = [], n) {
    const r = {};
    return Object.getOwnPropertyNames(e).forEach((i) => {
      t.includes(i) || (r[i] = e[i]);
    }), Object.assign(r, n);
  };
  fn = function(e, ...t) {
    return typeof e == "function" ? e(...t) : typeof e == "string" ? Ci(e) : typeof e == "number" ? Ci(String(e)) : null;
  };
  let mu;
  Ul = Ne({
    render() {
      var e, t;
      return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
    }
  });
  An = "n-config-provider";
  mu = "n";
  Ir = function(e = {}, t = {
    defaultBordered: true
  }) {
    const n = Ce(An, null);
    return {
      inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
      mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
      mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
      mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
      mergedBorderedRef: se(() => {
        var r, o;
        const { bordered: i } = e;
        return i !== void 0 ? i : (o = (r = n == null ? void 0 : n.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && o !== void 0 ? o : true;
      }),
      mergedClsPrefixRef: n ? n.mergedClsPrefixRef : ts(mu),
      namespaceRef: se(() => n == null ? void 0 : n.mergedNamespaceRef.value)
    };
  };
  i1 = function() {
    const e = Ce(An, null);
    return e ? e.mergedClsPrefixRef : ts(mu);
  };
  hs = function(e, t, n, r) {
    n || Hv("useThemeClass", "cssVarsRef is not passed");
    const o = Ce(An, null), i = o == null ? void 0 : o.mergedThemeHashRef, s = o == null ? void 0 : o.styleMountTarget, l = be(""), a = zo();
    let c;
    const u = `__${e}`, f = () => {
      let h = u;
      const v = t ? t.value : void 0, p = i == null ? void 0 : i.value;
      p && (h += `-${p}`), v && (h += `-${v}`);
      const { themeOverrides: b, builtinThemeOverrides: _ } = r;
      b && (h += `-${Bi(JSON.stringify(b))}`), _ && (h += `-${Bi(JSON.stringify(_))}`), l.value = h, c = () => {
        const E = n.value;
        let x = "";
        for (const B in E) x += `${B}: ${E[B]};`;
        K(`.${h}`, x).mount({
          id: h,
          ssr: a,
          parent: s
        }), c = void 0;
      };
    };
    return Ro(() => {
      f();
    }), {
      themeClass: l,
      onRender: () => {
        c == null ? void 0 : c();
      }
    };
  };
  let bu, Dv, yu, jv, kv, er;
  bu = typeof global == "object" && global && global.Object === Object && global;
  Dv = typeof self == "object" && self && self.Object === Object && self;
  Un = bu || Dv || Function("return this")();
  Wn = Un.Symbol;
  yu = Object.prototype;
  jv = yu.hasOwnProperty;
  kv = yu.toString;
  er = Wn ? Wn.toStringTag : void 0;
  function Vv(e) {
    var t = jv.call(e, er), n = e[er];
    try {
      e[er] = void 0;
      var r = true;
    } catch {
    }
    var o = kv.call(e);
    return r && (t ? e[er] = n : delete e[er]), o;
  }
  var Wv = Object.prototype, Uv = Wv.toString;
  function Kv(e) {
    return Uv.call(e);
  }
  var Gv = "[object Null]", qv = "[object Undefined]", Kl = Wn ? Wn.toStringTag : void 0;
  Fr = function(e) {
    return e == null ? e === void 0 ? qv : Gv : Kl && Kl in Object(e) ? Vv(e) : Kv(e);
  };
  Kn = function(e) {
    return e != null && typeof e == "object";
  };
  var Xv = "[object Symbol]";
  Yv = function(e) {
    return typeof e == "symbol" || Kn(e) && Fr(e) == Xv;
  };
  Jv = function(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; ) o[n] = t(e[n], n, e);
    return o;
  };
  let Gl, ql;
  po = Array.isArray;
  Gl = Wn ? Wn.prototype : void 0;
  ql = Gl ? Gl.toString : void 0;
  function xu(e) {
    if (typeof e == "string") return e;
    if (po(e)) return Jv(e, xu) + "";
    if (Yv(e)) return ql ? ql.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
  }
  Tn = function(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  };
  wu = function(e) {
    return e;
  };
  var Zv = "[object AsyncFunction]", Qv = "[object Function]", em = "[object GeneratorFunction]", tm = "[object Proxy]";
  function ps(e) {
    if (!Tn(e)) return false;
    var t = Fr(e);
    return t == Qv || t == em || t == Zv || t == tm;
  }
  var ui = Un["__core-js_shared__"], Xl = (function() {
    var e = /[^.]+$/.exec(ui && ui.keys && ui.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  })();
  function nm(e) {
    return !!Xl && Xl in e;
  }
  var rm = Function.prototype, om = rm.toString;
  im = function(e) {
    if (e != null) {
      try {
        return om.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  };
  var sm = /[\\^$.*+?()[\]{}|]/g, lm = /^\[object .+?Constructor\]$/, am = Function.prototype, cm = Object.prototype, um = am.toString, fm = cm.hasOwnProperty, dm = RegExp("^" + um.call(fm).replace(sm, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function hm(e) {
    if (!Tn(e) || nm(e)) return false;
    var t = ps(e) ? dm : lm;
    return t.test(im(e));
  }
  function pm(e, t) {
    return e == null ? void 0 : e[t];
  }
  gs = function(e, t) {
    var n = pm(e, t);
    return hm(n) ? n : void 0;
  };
  var Yl = Object.create, gm = /* @__PURE__ */ (function() {
    function e() {
    }
    return function(t) {
      if (!Tn(t)) return {};
      if (Yl) return Yl(t);
      e.prototype = t;
      var n = new e();
      return e.prototype = void 0, n;
    };
  })();
  function vm(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  function mm(e, t) {
    var n = -1, r = e.length;
    for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
    return t;
  }
  var bm = 800, ym = 16, xm = Date.now;
  function wm(e) {
    var t = 0, n = 0;
    return function() {
      var r = xm(), o = ym - (r - n);
      if (n = r, o > 0) {
        if (++t >= bm) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function _m(e) {
    return function() {
      return e;
    };
  }
  var go = (function() {
    try {
      var e = gs(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  })(), Cm = go ? function(e, t) {
    return go(e, "toString", {
      configurable: true,
      enumerable: false,
      value: _m(t),
      writable: true
    });
  } : wu, Sm = wm(Cm), Em = 9007199254740991, Rm = /^(?:0|[1-9]\d*)$/;
  _u = function(e, t) {
    var n = typeof e;
    return t = t ?? Em, !!t && (n == "number" || n != "symbol" && Rm.test(e)) && e > -1 && e % 1 == 0 && e < t;
  };
  function vs(e, t, n) {
    t == "__proto__" && go ? go(e, t, {
      configurable: true,
      enumerable: true,
      value: n,
      writable: true
    }) : e[t] = n;
  }
  No = function(e, t) {
    return e === t || e !== e && t !== t;
  };
  var Am = Object.prototype, Tm = Am.hasOwnProperty;
  function Om(e, t, n) {
    var r = e[t];
    (!(Tm.call(e, t) && No(r, n)) || n === void 0 && !(t in e)) && vs(e, t, n);
  }
  function Pm(e, t, n, r) {
    var o = !n;
    n || (n = {});
    for (var i = -1, s = t.length; ++i < s; ) {
      var l = t[i], a = void 0;
      a === void 0 && (a = e[l]), o ? vs(n, l, a) : Om(n, l, a);
    }
    return n;
  }
  var Jl = Math.max;
  function $m(e, t, n) {
    return t = Jl(t === void 0 ? e.length - 1 : t, 0), function() {
      for (var r = arguments, o = -1, i = Jl(r.length - t, 0), s = Array(i); ++o < i; ) s[o] = r[t + o];
      o = -1;
      for (var l = Array(t + 1); ++o < t; ) l[o] = r[o];
      return l[t] = n(s), vm(e, this, l);
    };
  }
  function Im(e, t) {
    return Sm($m(e, t, wu), e + "");
  }
  var Fm = 9007199254740991;
  Cu = function(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Fm;
  };
  ms = function(e) {
    return e != null && Cu(e.length) && !ps(e);
  };
  function Bm(e, t, n) {
    if (!Tn(n)) return false;
    var r = typeof t;
    return (r == "number" ? ms(n) && _u(t, n.length) : r == "string" && t in n) ? No(n[t], e) : false;
  }
  function Mm(e) {
    return Im(function(t, n) {
      var r = -1, o = n.length, i = o > 1 ? n[o - 1] : void 0, s = o > 2 ? n[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, s && Bm(n[0], n[1], s) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++r < o; ) {
        var l = n[r];
        l && e(t, l, r, i);
      }
      return t;
    });
  }
  var Lm = Object.prototype;
  Su = function(e) {
    var t = e && e.constructor, n = typeof t == "function" && t.prototype || Lm;
    return e === n;
  };
  function Hm(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  }
  var zm = "[object Arguments]";
  function Zl(e) {
    return Kn(e) && Fr(e) == zm;
  }
  let Eu, Nm, Dm;
  Eu = Object.prototype;
  Nm = Eu.hasOwnProperty;
  Dm = Eu.propertyIsEnumerable;
  Hi = Zl(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? Zl : function(e) {
    return Kn(e) && Nm.call(e, "callee") && !Dm.call(e, "callee");
  };
  function jm() {
    return false;
  }
  let Ru, Ql, km, ea, Vm, Wm, Um, Km, Gm, qm, Xm, Ym, Jm, Zm, Qm, eb, tb, nb, rb, ob, ib, sb, lb, ab, cb, ub, fb, db, hb, _e;
  Ru = typeof exports == "object" && exports && !exports.nodeType && exports;
  Ql = Ru && typeof module == "object" && module && !module.nodeType && module;
  km = Ql && Ql.exports === Ru;
  ea = km ? Un.Buffer : void 0;
  Vm = ea ? ea.isBuffer : void 0;
  Au = Vm || jm;
  Wm = "[object Arguments]";
  Um = "[object Array]";
  Km = "[object Boolean]";
  Gm = "[object Date]";
  qm = "[object Error]";
  Xm = "[object Function]";
  Ym = "[object Map]";
  Jm = "[object Number]";
  Zm = "[object Object]";
  Qm = "[object RegExp]";
  eb = "[object Set]";
  tb = "[object String]";
  nb = "[object WeakMap]";
  rb = "[object ArrayBuffer]";
  ob = "[object DataView]";
  ib = "[object Float32Array]";
  sb = "[object Float64Array]";
  lb = "[object Int8Array]";
  ab = "[object Int16Array]";
  cb = "[object Int32Array]";
  ub = "[object Uint8Array]";
  fb = "[object Uint8ClampedArray]";
  db = "[object Uint16Array]";
  hb = "[object Uint32Array]";
  _e = {};
  _e[ib] = _e[sb] = _e[lb] = _e[ab] = _e[cb] = _e[ub] = _e[fb] = _e[db] = _e[hb] = true;
  _e[Wm] = _e[Um] = _e[rb] = _e[Km] = _e[ob] = _e[Gm] = _e[qm] = _e[Xm] = _e[Ym] = _e[Jm] = _e[Zm] = _e[Qm] = _e[eb] = _e[tb] = _e[nb] = false;
  function pb(e) {
    return Kn(e) && Cu(e.length) && !!_e[Fr(e)];
  }
  function gb(e) {
    return function(t) {
      return e(t);
    };
  }
  let Tu, pr, vb, fi, ta, na, mb, bb;
  Tu = typeof exports == "object" && exports && !exports.nodeType && exports;
  pr = Tu && typeof module == "object" && module && !module.nodeType && module;
  vb = pr && pr.exports === Tu;
  fi = vb && bu.process;
  ta = (function() {
    try {
      var e = pr && pr.require && pr.require("util").types;
      return e || fi && fi.binding && fi.binding("util");
    } catch {
    }
  })();
  na = ta && ta.isTypedArray;
  Ou = na ? gb(na) : pb;
  mb = Object.prototype;
  bb = mb.hasOwnProperty;
  yb = function(e, t) {
    var n = po(e), r = !n && Hi(e), o = !n && !r && Au(e), i = !n && !r && !o && Ou(e), s = n || r || o || i, l = s ? Hm(e.length, String) : [], a = l.length;
    for (var c in e) (t || bb.call(e, c)) && !(s && (c == "length" || o && (c == "offset" || c == "parent") || i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || _u(c, a))) && l.push(c);
    return l;
  };
  xb = function(e, t) {
    return function(n) {
      return e(t(n));
    };
  };
  function wb(e) {
    var t = [];
    if (e != null) for (var n in Object(e)) t.push(n);
    return t;
  }
  var _b = Object.prototype, Cb = _b.hasOwnProperty;
  function Sb(e) {
    if (!Tn(e)) return wb(e);
    var t = Su(e), n = [];
    for (var r in e) r == "constructor" && (t || !Cb.call(e, r)) || n.push(r);
    return n;
  }
  function Pu(e) {
    return ms(e) ? yb(e, true) : Sb(e);
  }
  var Rr = gs(Object, "create");
  function Eb() {
    this.__data__ = Rr ? Rr(null) : {}, this.size = 0;
  }
  function Rb(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  var Ab = "__lodash_hash_undefined__", Tb = Object.prototype, Ob = Tb.hasOwnProperty;
  function Pb(e) {
    var t = this.__data__;
    if (Rr) {
      var n = t[e];
      return n === Ab ? void 0 : n;
    }
    return Ob.call(t, e) ? t[e] : void 0;
  }
  var $b = Object.prototype, Ib = $b.hasOwnProperty;
  function Fb(e) {
    var t = this.__data__;
    return Rr ? t[e] !== void 0 : Ib.call(t, e);
  }
  var Bb = "__lodash_hash_undefined__";
  function Mb(e, t) {
    var n = this.__data__;
    return this.size += this.has(e) ? 0 : 1, n[e] = Rr && t === void 0 ? Bb : t, this;
  }
  function Sn(e) {
    var t = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Sn.prototype.clear = Eb;
  Sn.prototype.delete = Rb;
  Sn.prototype.get = Pb;
  Sn.prototype.has = Fb;
  Sn.prototype.set = Mb;
  function Lb() {
    this.__data__ = [], this.size = 0;
  }
  function Do(e, t) {
    for (var n = e.length; n--; ) if (No(e[n][0], t)) return n;
    return -1;
  }
  var Hb = Array.prototype, zb = Hb.splice;
  function Nb(e) {
    var t = this.__data__, n = Do(t, e);
    if (n < 0) return false;
    var r = t.length - 1;
    return n == r ? t.pop() : zb.call(t, n, 1), --this.size, true;
  }
  function Db(e) {
    var t = this.__data__, n = Do(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function jb(e) {
    return Do(this.__data__, e) > -1;
  }
  function kb(e, t) {
    var n = this.__data__, r = Do(n, e);
    return r < 0 ? (++this.size, n.push([
      e,
      t
    ])) : n[r][1] = t, this;
  }
  function Wt(e) {
    var t = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Wt.prototype.clear = Lb;
  Wt.prototype.delete = Nb;
  Wt.prototype.get = Db;
  Wt.prototype.has = jb;
  Wt.prototype.set = kb;
  $u = gs(Un, "Map");
  function Vb() {
    this.size = 0, this.__data__ = {
      hash: new Sn(),
      map: new ($u || Wt)(),
      string: new Sn()
    };
  }
  function Wb(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  function jo(e, t) {
    var n = e.__data__;
    return Wb(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
  }
  function Ub(e) {
    var t = jo(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  }
  function Kb(e) {
    return jo(this, e).get(e);
  }
  function Gb(e) {
    return jo(this, e).has(e);
  }
  function qb(e, t) {
    var n = jo(this, e), r = n.size;
    return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
  }
  Gn = function(e) {
    var t = -1, n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  };
  Gn.prototype.clear = Vb;
  Gn.prototype.delete = Ub;
  Gn.prototype.get = Kb;
  Gn.prototype.has = Gb;
  Gn.prototype.set = qb;
  Xb = function(e) {
    return e == null ? "" : xu(e);
  };
  var Iu = xb(Object.getPrototypeOf, Object), Yb = "[object Object]", Jb = Function.prototype, Zb = Object.prototype, Fu = Jb.toString, Qb = Zb.hasOwnProperty, e0 = Fu.call(Object);
  function t0(e) {
    if (!Kn(e) || Fr(e) != Yb) return false;
    var t = Iu(e);
    if (t === null) return true;
    var n = Qb.call(t, "constructor") && t.constructor;
    return typeof n == "function" && n instanceof n && Fu.call(n) == e0;
  }
  function n0(e, t, n) {
    var r = -1, o = e.length;
    t < 0 && (t = -t > o ? 0 : o + t), n = n > o ? o : n, n < 0 && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
    for (var i = Array(o); ++r < o; ) i[r] = e[r + t];
    return i;
  }
  function r0(e, t, n) {
    var r = e.length;
    return n = n === void 0 ? r : n, !t && n >= r ? e : n0(e, t, n);
  }
  var o0 = "\\ud800-\\udfff", i0 = "\\u0300-\\u036f", s0 = "\\ufe20-\\ufe2f", l0 = "\\u20d0-\\u20ff", a0 = i0 + s0 + l0, c0 = "\\ufe0e\\ufe0f", u0 = "\\u200d", f0 = RegExp("[" + u0 + o0 + a0 + c0 + "]");
  function Bu(e) {
    return f0.test(e);
  }
  function d0(e) {
    return e.split("");
  }
  var Mu = "\\ud800-\\udfff", h0 = "\\u0300-\\u036f", p0 = "\\ufe20-\\ufe2f", g0 = "\\u20d0-\\u20ff", v0 = h0 + p0 + g0, m0 = "\\ufe0e\\ufe0f", b0 = "[" + Mu + "]", zi = "[" + v0 + "]", Ni = "\\ud83c[\\udffb-\\udfff]", y0 = "(?:" + zi + "|" + Ni + ")", Lu = "[^" + Mu + "]", Hu = "(?:\\ud83c[\\udde6-\\uddff]){2}", zu = "[\\ud800-\\udbff][\\udc00-\\udfff]", x0 = "\\u200d", Nu = y0 + "?", Du = "[" + m0 + "]?", w0 = "(?:" + x0 + "(?:" + [
    Lu,
    Hu,
    zu
  ].join("|") + ")" + Du + Nu + ")*", _0 = Du + Nu + w0, C0 = "(?:" + [
    Lu + zi + "?",
    zi,
    Hu,
    zu,
    b0
  ].join("|") + ")", S0 = RegExp(Ni + "(?=" + Ni + ")|" + C0 + _0, "g");
  function E0(e) {
    return e.match(S0) || [];
  }
  function R0(e) {
    return Bu(e) ? E0(e) : d0(e);
  }
  function A0(e) {
    return function(t) {
      t = Xb(t);
      var n = Bu(t) ? R0(t) : void 0, r = n ? n[0] : t.charAt(0), o = n ? r0(n, 1).join("") : t.slice(1);
      return r[e]() + o;
    };
  }
  var T0 = A0("toUpperCase");
  function O0() {
    this.__data__ = new Wt(), this.size = 0;
  }
  function P0(e) {
    var t = this.__data__, n = t.delete(e);
    return this.size = t.size, n;
  }
  function $0(e) {
    return this.__data__.get(e);
  }
  function I0(e) {
    return this.__data__.has(e);
  }
  var F0 = 200;
  function B0(e, t) {
    var n = this.__data__;
    if (n instanceof Wt) {
      var r = n.__data__;
      if (!$u || r.length < F0 - 1) return r.push([
        e,
        t
      ]), this.size = ++n.size, this;
      n = this.__data__ = new Gn(r);
    }
    return n.set(e, t), this.size = n.size, this;
  }
  qn = function(e) {
    var t = this.__data__ = new Wt(e);
    this.size = t.size;
  };
  qn.prototype.clear = O0;
  qn.prototype.delete = P0;
  qn.prototype.get = $0;
  qn.prototype.has = I0;
  qn.prototype.set = B0;
  var ju = typeof exports == "object" && exports && !exports.nodeType && exports, ra = ju && typeof module == "object" && module && !module.nodeType && module, M0 = ra && ra.exports === ju, oa = M0 ? Un.Buffer : void 0;
  oa && oa.allocUnsafe;
  function L0(e, t) {
    return e.slice();
  }
  ia = Un.Uint8Array;
  function H0(e) {
    var t = new e.constructor(e.byteLength);
    return new ia(t).set(new ia(e)), t;
  }
  function z0(e, t) {
    var n = H0(e.buffer);
    return new e.constructor(n, e.byteOffset, e.length);
  }
  function N0(e) {
    return typeof e.constructor == "function" && !Su(e) ? gm(Iu(e)) : {};
  }
  function D0(e) {
    return function(t, n, r) {
      for (var o = -1, i = Object(t), s = r(t), l = s.length; l--; ) {
        var a = s[++o];
        if (n(i[a], a, i) === false) break;
      }
      return t;
    };
  }
  j0 = D0();
  function Di(e, t, n) {
    (n !== void 0 && !No(e[t], n) || n === void 0 && !(t in e)) && vs(e, t, n);
  }
  function k0(e) {
    return Kn(e) && ms(e);
  }
  function ji(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__") return e[t];
  }
  function V0(e) {
    return Pm(e, Pu(e));
  }
  function W0(e, t, n, r, o, i, s) {
    var l = ji(e, n), a = ji(t, n), c = s.get(a);
    if (c) {
      Di(e, n, c);
      return;
    }
    var u = i ? i(l, a, n + "", e, t, s) : void 0, f = u === void 0;
    if (f) {
      var h = po(a), v = !h && Au(a), p = !h && !v && Ou(a);
      u = a, h || v || p ? po(l) ? u = l : k0(l) ? u = mm(l) : v ? (f = false, u = L0(a)) : p ? (f = false, u = z0(a)) : u = [] : t0(a) || Hi(a) ? (u = l, Hi(l) ? u = V0(l) : (!Tn(l) || ps(l)) && (u = N0(a))) : f = false;
    }
    f && (s.set(a, u), o(u, a, r, i, s), s.delete(a)), Di(e, n, u);
  }
  function ku(e, t, n, r, o) {
    e !== t && j0(t, function(i, s) {
      if (o || (o = new qn()), Tn(i)) W0(e, t, s, n, ku, r, o);
      else {
        var l = r ? r(ji(e, s), i, s + "", e, t, o) : void 0;
        l === void 0 && (l = i), Di(e, s, l);
      }
    }, Pu);
  }
  var Kr = Mm(function(e, t, n) {
    ku(e, t, n);
  });
  Ar = "naive-ui-style";
  bs = function(e, t, n) {
    if (!t) return;
    const r = zo(), o = se(() => {
      const { value: l } = t;
      if (!l) return;
      const a = l[e];
      if (a) return a;
    }), i = Ce(An, null), s = () => {
      Ro(() => {
        const { value: l } = n, a = `${l}${e}Rtl`;
        if (Lg(a, r)) return;
        const { value: c } = o;
        c && c.style.mount({
          id: a,
          head: true,
          anchorMetaName: Ar,
          props: {
            bPrefix: l ? `.${l}-` : void 0
          },
          ssr: r,
          parent: i == null ? void 0 : i.styleMountTarget
        });
      });
    };
    return r ? s() : Oo(s), o;
  };
  let U0, K0, G0, Vu;
  Br = {
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
  ({ fontSize: U0, fontFamily: K0, lineHeight: G0 } = Br);
  Vu = K("body", `
 margin: 0;
 font-size: ${U0};
 font-family: ${K0};
 line-height: ${G0};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [
    K("input", `
 font-family: inherit;
 font-size: inherit;
 `)
  ]);
  ys = function(e, t, n) {
    if (!t) return;
    const r = zo(), o = Ce(An, null), i = () => {
      const s = n.value;
      t.mount({
        id: s === void 0 ? e : s + e,
        head: true,
        anchorMetaName: Ar,
        props: {
          bPrefix: s ? `.${s}-` : void 0
        },
        ssr: r,
        parent: o == null ? void 0 : o.styleMountTarget
      }), (o == null ? void 0 : o.preflightStyleDisabled) || Vu.mount({
        id: "n-global",
        head: true,
        anchorMetaName: Ar,
        ssr: r,
        parent: o == null ? void 0 : o.styleMountTarget
      });
    };
    r ? i() : Oo(i);
  };
  s1 = function(e) {
    return e;
  };
  On = function(e, t, n, r, o, i) {
    const s = zo(), l = Ce(An, null);
    if (n) {
      const c = () => {
        const u = i == null ? void 0 : i.value;
        n.mount({
          id: u === void 0 ? t : u + t,
          head: true,
          props: {
            bPrefix: u ? `.${u}-` : void 0
          },
          anchorMetaName: Ar,
          ssr: s,
          parent: l == null ? void 0 : l.styleMountTarget
        }), (l == null ? void 0 : l.preflightStyleDisabled) || Vu.mount({
          id: "n-global",
          head: true,
          anchorMetaName: Ar,
          ssr: s,
          parent: l == null ? void 0 : l.styleMountTarget
        });
      };
      s ? c() : Oo(c);
    }
    return se(() => {
      var c;
      const { theme: { common: u, self: f, peers: h = {} } = {}, themeOverrides: v = {}, builtinThemeOverrides: p = {} } = o, { common: b, peers: _ } = v, { common: E = void 0, [e]: { common: x = void 0, self: B = void 0, peers: I = {} } = {} } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, { common: j = void 0, [e]: W = {} } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, { common: A, peers: w = {} } = W, y = Kr({}, u || x || E || r.common, j, A, b), M = Kr((c = f || B || r.self) === null || c === void 0 ? void 0 : c(y), p, W, v);
      return {
        common: y,
        self: M,
        peers: Kr({}, r.peers, I, h),
        peerOverrides: Kr({}, p.peers, w, _)
      };
    });
  };
  On.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  let q0;
  q0 = ae("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [
    K("svg", `
 height: 1em;
 width: 1em;
 `)
  ]);
  xs = Ne({
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
      ys("-base-icon", q0, ns(e, "clsPrefix"));
    },
    render() {
      return $("i", {
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
  Wu = Ne({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: t }) {
      const n = lv();
      return () => $(_r, {
        name: "icon-switch-transition",
        appear: n.value
      }, t);
    }
  });
  Mr = function(e, t) {
    const n = Ne({
      render() {
        return t();
      }
    });
    return Ne({
      name: T0(e),
      setup() {
        var r;
        const o = (r = Ce(An, null)) === null || r === void 0 ? void 0 : r.mergedIconsRef;
        return () => {
          var i;
          const s = (i = o == null ? void 0 : o.value) === null || i === void 0 ? void 0 : i[e];
          return s ? s() : $(n, null);
        };
      }
    });
  };
  let X0, Y0;
  X0 = Mr("close", () => $("svg", {
    viewBox: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  }, $("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, $("g", {
    fill: "currentColor",
    "fill-rule": "nonzero"
  }, $("path", {
    d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
  })))));
  Uu = Mr("error", () => $("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, $("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, $("g", {
    "fill-rule": "nonzero"
  }, $("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
  })))));
  Ku = Mr("info", () => $("svg", {
    viewBox: "0 0 28 28",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, $("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, $("g", {
    "fill-rule": "nonzero"
  }, $("path", {
    d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
  })))));
  Gu = Mr("success", () => $("svg", {
    viewBox: "0 0 48 48",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, $("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, $("g", {
    "fill-rule": "nonzero"
  }, $("path", {
    d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
  })))));
  qu = Mr("warning", () => $("svg", {
    viewBox: "0 0 24 24",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, $("g", {
    stroke: "none",
    "stroke-width": "1",
    "fill-rule": "evenodd"
  }, $("g", {
    "fill-rule": "nonzero"
  }, $("path", {
    d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
  })))));
  ({ cubicBezierEaseInOut: Y0 } = Br);
  ki = function({ originalTransform: e = "", left: t = 0, top: n = 0, transition: r = `all .3s ${Y0} !important` } = {}) {
    return [
      K("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
        transform: `${e} scale(0.75)`,
        left: t,
        top: n,
        opacity: 0
      }),
      K("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
        transform: `scale(1) ${e}`,
        left: t,
        top: n,
        opacity: 1
      }),
      K("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
        transformOrigin: "center",
        position: "absolute",
        left: t,
        top: n,
        transition: r
      })
    ];
  };
  let J0, Q0, di, sa;
  J0 = ae("base-close", `
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
    ue("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),
    K("&::before", `
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
    Dg("disabled", [
      K("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
      K("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `),
      K("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `),
      K("&:active", `
 color: var(--n-close-icon-color-pressed);
 `),
      K("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)
    ]),
    ue("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),
    ue("round", [
      K("&::before", `
 border-radius: 50%;
 `)
    ])
  ]);
  Xu = Ne({
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
      return ys("-base-close", J0, ns(e, "clsPrefix")), () => {
        const { clsPrefix: t, disabled: n, absolute: r, round: o, isButtonTag: i } = e;
        return $(i ? "button" : "div", {
          type: i ? "button" : void 0,
          tabindex: n || !e.focusable ? -1 : 0,
          "aria-disabled": n,
          "aria-label": "close",
          role: i ? void 0 : "button",
          disabled: n,
          class: [
            `${t}-base-close`,
            r && `${t}-base-close--absolute`,
            n && `${t}-base-close--disabled`,
            o && `${t}-base-close--round`
          ],
          onMousedown: (l) => {
            e.focusable || l.preventDefault();
          },
          onClick: e.onClick
        }, $(xs, {
          clsPrefix: t
        }, {
          default: () => $(X0, null)
        }));
      };
    }
  });
  Z0 = Ne({
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
      function n(l) {
        e.width ? l.style.maxWidth = `${l.offsetWidth}px` : l.style.maxHeight = `${l.offsetHeight}px`, l.offsetWidth;
      }
      function r(l) {
        e.width ? l.style.maxWidth = "0" : l.style.maxHeight = "0", l.offsetWidth;
        const { onLeave: a } = e;
        a && a();
      }
      function o(l) {
        e.width ? l.style.maxWidth = "" : l.style.maxHeight = "";
        const { onAfterLeave: a } = e;
        a && a();
      }
      function i(l) {
        if (l.style.transition = "none", e.width) {
          const a = l.offsetWidth;
          l.style.maxWidth = "0", l.offsetWidth, l.style.transition = "", l.style.maxWidth = `${a}px`;
        } else if (e.reverse) l.style.maxHeight = `${l.offsetHeight}px`, l.offsetHeight, l.style.transition = "", l.style.maxHeight = "0";
        else {
          const a = l.offsetHeight;
          l.style.maxHeight = "0", l.offsetWidth, l.style.transition = "", l.style.maxHeight = `${a}px`;
        }
        l.offsetWidth;
      }
      function s(l) {
        var a;
        e.width ? l.style.maxWidth = "" : e.reverse || (l.style.maxHeight = ""), (a = e.onAfterEnter) === null || a === void 0 || a.call(e);
      }
      return () => {
        const { group: l, width: a, appear: c, mode: u } = e, f = l ? Dh : _r, h = {
          name: a ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
          appear: c,
          onEnter: i,
          onAfterEnter: s,
          onBeforeLeave: n,
          onLeave: r,
          onAfterLeave: o
        };
        return l || (h.mode = u), $(f, h, t);
      };
    }
  });
  Q0 = K([
    K("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),
    ae("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [
      ze("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [
        ki()
      ]),
      ze("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [
        ki({
          left: "50%",
          top: "50%",
          originalTransform: "translateX(-50%) translateY(-50%)"
        })
      ]),
      ze("container", `
 animation: rotator 3s linear infinite both;
 `, [
        ze("icon", `
 height: 1em;
 width: 1em;
 `)
      ])
    ])
  ]);
  di = "1.6s";
  ey = {
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
  ty = Ne({
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
    }, ey),
    setup(e) {
      ys("-base-loading", Q0, ns(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: t, strokeWidth: n, stroke: r, scale: o } = this, i = t / o;
      return $("div", {
        class: `${e}-base-loading`,
        role: "img",
        "aria-label": "loading"
      }, $(Wu, null, {
        default: () => this.show ? $("div", {
          key: "icon",
          class: `${e}-base-loading__transition-wrapper`
        }, $("div", {
          class: `${e}-base-loading__container`
        }, $("svg", {
          class: `${e}-base-loading__icon`,
          viewBox: `0 0 ${2 * i} ${2 * i}`,
          xmlns: "http://www.w3.org/2000/svg",
          style: {
            color: r
          }
        }, $("g", null, $("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};270 ${i} ${i}`,
          begin: "0s",
          dur: di,
          fill: "freeze",
          repeatCount: "indefinite"
        }), $("circle", {
          class: `${e}-base-loading__icon`,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": n,
          "stroke-linecap": "round",
          cx: i,
          cy: i,
          r: t - n / 2,
          "stroke-dasharray": 5.67 * t,
          "stroke-dashoffset": 18.48 * t
        }, $("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
          begin: "0s",
          dur: di,
          fill: "freeze",
          repeatCount: "indefinite"
        }), $("animate", {
          attributeName: "stroke-dashoffset",
          values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
          begin: "0s",
          dur: di,
          fill: "freeze",
          repeatCount: "indefinite"
        })))))) : $("div", {
          key: "placeholder",
          class: `${e}-base-loading__placeholder`
        }, this.$slots)
      }));
    }
  });
  ({ cubicBezierEaseInOut: sa } = Br);
  ny = function({ name: e = "fade-in", enterDuration: t = "0.2s", leaveDuration: n = "0.2s", enterCubicBezier: r = sa, leaveCubicBezier: o = sa } = {}) {
    return [
      K(`&.${e}-transition-enter-active`, {
        transition: `all ${t} ${r}!important`
      }),
      K(`&.${e}-transition-leave-active`, {
        transition: `all ${n} ${o}!important`
      }),
      K(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
        opacity: 0
      }),
      K(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
        opacity: 1
      })
    ];
  };
  const Z = {
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
  }, ry = Cn(Z.neutralBase), Yu = Cn(Z.neutralInvertBase), oy = `rgba(${Yu.slice(0, 3).join(", ")}, `;
  function la(e) {
    return `${oy + String(e)})`;
  }
  function Ve(e) {
    const t = Array.from(Yu);
    return t[3] = Number(e), ev(ry, t);
  }
  let iy;
  ws = Object.assign(Object.assign({
    name: "common"
  }, Br), {
    baseColor: Z.neutralBase,
    primaryColor: Z.primaryDefault,
    primaryColorHover: Z.primaryHover,
    primaryColorPressed: Z.primaryActive,
    primaryColorSuppl: Z.primarySuppl,
    infoColor: Z.infoDefault,
    infoColorHover: Z.infoHover,
    infoColorPressed: Z.infoActive,
    infoColorSuppl: Z.infoSuppl,
    successColor: Z.successDefault,
    successColorHover: Z.successHover,
    successColorPressed: Z.successActive,
    successColorSuppl: Z.successSuppl,
    warningColor: Z.warningDefault,
    warningColorHover: Z.warningHover,
    warningColorPressed: Z.warningActive,
    warningColorSuppl: Z.warningSuppl,
    errorColor: Z.errorDefault,
    errorColorHover: Z.errorHover,
    errorColorPressed: Z.errorActive,
    errorColorSuppl: Z.errorSuppl,
    textColorBase: Z.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    textColorDisabled: Ve(Z.alpha4),
    placeholderColor: Ve(Z.alpha4),
    placeholderColorDisabled: Ve(Z.alpha5),
    iconColor: Ve(Z.alpha4),
    iconColorHover: kr(Ve(Z.alpha4), {
      lightness: 0.75
    }),
    iconColorPressed: kr(Ve(Z.alpha4), {
      lightness: 0.9
    }),
    iconColorDisabled: Ve(Z.alpha5),
    opacity1: Z.alpha1,
    opacity2: Z.alpha2,
    opacity3: Z.alpha3,
    opacity4: Z.alpha4,
    opacity5: Z.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    closeIconColor: Ve(Number(Z.alphaClose)),
    closeIconColorHover: Ve(Number(Z.alphaClose)),
    closeIconColorPressed: Ve(Number(Z.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    clearColor: Ve(Z.alpha4),
    clearColorHover: kr(Ve(Z.alpha4), {
      lightness: 0.75
    }),
    clearColorPressed: kr(Ve(Z.alpha4), {
      lightness: 0.9
    }),
    scrollbarColor: la(Z.alphaScrollbar),
    scrollbarColorHover: la(Z.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: Ve(Z.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: Z.neutralPopover,
    tableColor: Z.neutralCard,
    cardColor: Z.neutralCard,
    modalColor: Z.neutralModal,
    bodyColor: Z.neutralBody,
    tagColor: "#eee",
    avatarColor: Ve(Z.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: Ve(Z.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: Z.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  });
  iy = {
    railInsetHorizontalBottom: "auto 2px 4px 2px",
    railInsetHorizontalTop: "4px 2px auto 2px",
    railInsetVerticalRight: "2px 4px 2px auto",
    railInsetVerticalLeft: "2px auto 2px 4px",
    railColor: "transparent"
  };
  function sy(e) {
    const { scrollbarColor: t, scrollbarColorHover: n, scrollbarHeight: r, scrollbarWidth: o, scrollbarBorderRadius: i } = e;
    return Object.assign(Object.assign({}, iy), {
      height: r,
      width: o,
      borderRadius: i,
      color: t,
      colorHover: n
    });
  }
  let ly, ay, wt, cy, uy;
  Ju = {
    name: "Scrollbar",
    common: ws,
    self: sy
  };
  ly = ae("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [
    K(">", [
      ae("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [
        K("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `),
        K(">", [
          ae("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
        ])
      ])
    ]),
    K(">, +", [
      ae("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [
        ue("horizontal", `
 height: var(--n-scrollbar-height);
 `, [
          K(">", [
            ze("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)
          ])
        ]),
        ue("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),
        ue("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),
        ue("vertical", `
 width: var(--n-scrollbar-width);
 `, [
          K(">", [
            ze("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)
          ])
        ]),
        ue("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),
        ue("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),
        ue("disabled", [
          K(">", [
            ze("scrollbar", "pointer-events: none;")
          ])
        ]),
        K(">", [
          ze("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [
            ny(),
            K("&:hover", "background-color: var(--n-scrollbar-color-hover);")
          ])
        ])
      ])
    ])
  ]);
  ay = Object.assign(Object.assign({}, On.props), {
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
  Zu = Ne({
    name: "Scrollbar",
    props: ay,
    inheritAttrs: false,
    setup(e) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: n, mergedRtlRef: r } = Ir(e), o = bs("Scrollbar", r, t), i = be(null), s = be(null), l = be(null), a = be(null), c = be(null), u = be(null), f = be(null), h = be(null), v = be(null), p = be(null), b = be(null), _ = be(0), E = be(0), x = be(false), B = be(false);
      let I = false, j = false, W, A, w = 0, y = 0, M = 0, V = 0;
      const F = cv(), Q = On("Scrollbar", "-scrollbar", ly, Ju, e, t), ie = se(() => {
        const { value: P } = h, { value: U } = u, { value: te } = p;
        return P === null || U === null || te === null ? 0 : Math.min(P, te * P / U + Pl(Q.value.self.width) * 1.5);
      }), fe = se(() => `${ie.value}px`), oe = se(() => {
        const { value: P } = v, { value: U } = f, { value: te } = b;
        return P === null || U === null || te === null ? 0 : te * P / U + Pl(Q.value.self.height) * 1.5;
      }), q = se(() => `${oe.value}px`), ne = se(() => {
        const { value: P } = h, { value: U } = _, { value: te } = u, { value: we } = p;
        if (P === null || te === null || we === null) return 0;
        {
          const Le = te - P;
          return Le ? U / Le * (we - ie.value) : 0;
        }
      }), Ae = se(() => `${ne.value}px`), Ie = se(() => {
        const { value: P } = v, { value: U } = E, { value: te } = f, { value: we } = b;
        if (P === null || te === null || we === null) return 0;
        {
          const Le = te - P;
          return Le ? U / Le * (we - oe.value) : 0;
        }
      }), Pe = se(() => `${Ie.value}px`), $e = se(() => {
        const { value: P } = h, { value: U } = u;
        return P !== null && U !== null && U > P;
      }), ft = se(() => {
        const { value: P } = v, { value: U } = f;
        return P !== null && U !== null && U > P;
      }), bt = se(() => {
        const { trigger: P } = e;
        return P === "none" || x.value;
      }), dt = se(() => {
        const { trigger: P } = e;
        return P === "none" || B.value;
      }), Fe = se(() => {
        const { container: P } = e;
        return P ? P() : s.value;
      }), R = se(() => {
        const { content: P } = e;
        return P ? P() : l.value;
      }), k = (P, U) => {
        if (!e.scrollable) return;
        if (typeof P == "number") {
          g(P, U ?? 0, 0, false, "auto");
          return;
        }
        const { left: te, top: we, index: Le, elSize: rt, position: ht, behavior: Ee, el: ct, debounce: Kt = true } = P;
        (te !== void 0 || we !== void 0) && g(te ?? 0, we ?? 0, 0, false, Ee), ct !== void 0 ? g(0, ct.offsetTop, ct.offsetHeight, Kt, Ee) : Le !== void 0 && rt !== void 0 ? g(0, Le * rt, rt, Kt, Ee) : ht === "bottom" ? g(0, Number.MAX_SAFE_INTEGER, 0, false, Ee) : ht === "top" && g(0, 0, 0, false, Ee);
      }, N = uv(() => {
        e.container || k({
          top: _.value,
          left: E.value
        });
      }), X = () => {
        N.isDeactivated || Y();
      }, le = (P) => {
        if (N.isDeactivated) return;
        const { onResize: U } = e;
        U && U(P), Y();
      }, d = (P, U) => {
        if (!e.scrollable) return;
        const { value: te } = Fe;
        te && (typeof P == "object" ? te.scrollBy(P) : te.scrollBy(P, U || 0));
      };
      function g(P, U, te, we, Le) {
        const { value: rt } = Fe;
        if (rt) {
          if (we) {
            const { scrollTop: ht, offsetHeight: Ee } = rt;
            if (U > ht) {
              U + te <= ht + Ee || rt.scrollTo({
                left: P,
                top: U + te - Ee,
                behavior: Le
              });
              return;
            }
          }
          rt.scrollTo({
            left: P,
            top: U,
            behavior: Le
          });
        }
      }
      function m() {
        H(), L(), Y();
      }
      function C() {
        T();
      }
      function T() {
        S(), z();
      }
      function S() {
        A !== void 0 && window.clearTimeout(A), A = window.setTimeout(() => {
          B.value = false;
        }, e.duration);
      }
      function z() {
        W !== void 0 && window.clearTimeout(W), W = window.setTimeout(() => {
          x.value = false;
        }, e.duration);
      }
      function H() {
        W !== void 0 && window.clearTimeout(W), x.value = true;
      }
      function L() {
        A !== void 0 && window.clearTimeout(A), B.value = true;
      }
      function O(P) {
        const { onScroll: U } = e;
        U && U(P), J();
      }
      function J() {
        const { value: P } = Fe;
        P && (_.value = P.scrollTop, E.value = P.scrollLeft * ((o == null ? void 0 : o.value) ? -1 : 1));
      }
      function D() {
        const { value: P } = R;
        P && (u.value = P.offsetHeight, f.value = P.offsetWidth);
        const { value: U } = Fe;
        U && (h.value = U.offsetHeight, v.value = U.offsetWidth);
        const { value: te } = c, { value: we } = a;
        te && (b.value = te.offsetWidth), we && (p.value = we.offsetHeight);
      }
      function G() {
        const { value: P } = Fe;
        P && (_.value = P.scrollTop, E.value = P.scrollLeft * ((o == null ? void 0 : o.value) ? -1 : 1), h.value = P.offsetHeight, v.value = P.offsetWidth, u.value = P.scrollHeight, f.value = P.scrollWidth);
        const { value: U } = c, { value: te } = a;
        U && (b.value = U.offsetWidth), te && (p.value = te.offsetHeight);
      }
      function Y() {
        e.scrollable && (e.useUnifiedContainer ? G() : (D(), J()));
      }
      function ce(P) {
        var U;
        return !(!((U = i.value) === null || U === void 0) && U.contains(jg(P)));
      }
      function ve(P) {
        P.preventDefault(), P.stopPropagation(), j = true, nr("mousemove", window, me, true), nr("mouseup", window, Se, true), y = E.value, M = (o == null ? void 0 : o.value) ? window.innerWidth - P.clientX : P.clientX;
      }
      function me(P) {
        if (!j) return;
        W !== void 0 && window.clearTimeout(W), A !== void 0 && window.clearTimeout(A);
        const { value: U } = v, { value: te } = f, { value: we } = oe;
        if (U === null || te === null) return;
        const rt = ((o == null ? void 0 : o.value) ? window.innerWidth - P.clientX - M : P.clientX - M) * (te - U) / (U - we), ht = te - U;
        let Ee = y + rt;
        Ee = Math.min(ht, Ee), Ee = Math.max(Ee, 0);
        const { value: ct } = Fe;
        if (ct) {
          ct.scrollLeft = Ee * ((o == null ? void 0 : o.value) ? -1 : 1);
          const { internalOnUpdateScrollLeft: Kt } = e;
          Kt && Kt(Ee);
        }
      }
      function Se(P) {
        P.preventDefault(), P.stopPropagation(), un("mousemove", window, me, true), un("mouseup", window, Se, true), j = false, Y(), ce(P) && T();
      }
      function Me(P) {
        P.preventDefault(), P.stopPropagation(), I = true, nr("mousemove", window, et, true), nr("mouseup", window, tt, true), w = _.value, V = P.clientY;
      }
      function et(P) {
        if (!I) return;
        W !== void 0 && window.clearTimeout(W), A !== void 0 && window.clearTimeout(A);
        const { value: U } = h, { value: te } = u, { value: we } = ie;
        if (U === null || te === null) return;
        const rt = (P.clientY - V) * (te - U) / (U - we), ht = te - U;
        let Ee = w + rt;
        Ee = Math.min(ht, Ee), Ee = Math.max(Ee, 0);
        const { value: ct } = Fe;
        ct && (ct.scrollTop = Ee);
      }
      function tt(P) {
        P.preventDefault(), P.stopPropagation(), un("mousemove", window, et, true), un("mouseup", window, tt, true), I = false, Y(), ce(P) && T();
      }
      Ro(() => {
        const { value: P } = ft, { value: U } = $e, { value: te } = t, { value: we } = c, { value: Le } = a;
        we && (P ? we.classList.remove(`${te}-scrollbar-rail--disabled`) : we.classList.add(`${te}-scrollbar-rail--disabled`)), Le && (U ? Le.classList.remove(`${te}-scrollbar-rail--disabled`) : Le.classList.add(`${te}-scrollbar-rail--disabled`));
      }), Rn(() => {
        e.container || Y();
      }), Po(() => {
        W !== void 0 && window.clearTimeout(W), A !== void 0 && window.clearTimeout(A), un("mousemove", window, et, true), un("mouseup", window, tt, true);
      });
      const Ut = se(() => {
        const { common: { cubicBezierEaseInOut: P }, self: { color: U, colorHover: te, height: we, width: Le, borderRadius: rt, railInsetHorizontalTop: ht, railInsetHorizontalBottom: Ee, railInsetVerticalRight: ct, railInsetVerticalLeft: Kt, railColor: nf } } = Q.value, { top: rf, right: of, bottom: sf, left: lf } = Bn(ht), { top: af, right: cf, bottom: uf, left: ff } = Bn(Ee), { top: df, right: hf, bottom: pf, left: gf } = Bn((o == null ? void 0 : o.value) ? Wl(ct) : ct), { top: vf, right: mf, bottom: bf, left: yf } = Bn((o == null ? void 0 : o.value) ? Wl(Kt) : Kt);
        return {
          "--n-scrollbar-bezier": P,
          "--n-scrollbar-color": U,
          "--n-scrollbar-color-hover": te,
          "--n-scrollbar-border-radius": rt,
          "--n-scrollbar-width": Le,
          "--n-scrollbar-height": we,
          "--n-scrollbar-rail-top-horizontal-top": rf,
          "--n-scrollbar-rail-right-horizontal-top": of,
          "--n-scrollbar-rail-bottom-horizontal-top": sf,
          "--n-scrollbar-rail-left-horizontal-top": lf,
          "--n-scrollbar-rail-top-horizontal-bottom": af,
          "--n-scrollbar-rail-right-horizontal-bottom": cf,
          "--n-scrollbar-rail-bottom-horizontal-bottom": uf,
          "--n-scrollbar-rail-left-horizontal-bottom": ff,
          "--n-scrollbar-rail-top-vertical-right": df,
          "--n-scrollbar-rail-right-vertical-right": hf,
          "--n-scrollbar-rail-bottom-vertical-right": pf,
          "--n-scrollbar-rail-left-vertical-right": gf,
          "--n-scrollbar-rail-top-vertical-left": vf,
          "--n-scrollbar-rail-right-vertical-left": mf,
          "--n-scrollbar-rail-bottom-vertical-left": bf,
          "--n-scrollbar-rail-left-vertical-left": yf,
          "--n-scrollbar-rail-color": nf
        };
      }), $t = n ? hs("scrollbar", void 0, Ut, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: k,
        scrollBy: d,
        sync: Y,
        syncUnifiedContainer: G,
        handleMouseEnterWrapper: m,
        handleMouseLeaveWrapper: C
      }), {
        mergedClsPrefix: t,
        rtlEnabled: o,
        containerScrollTop: _,
        wrapperRef: i,
        containerRef: s,
        contentRef: l,
        yRailRef: a,
        xRailRef: c,
        needYBar: $e,
        needXBar: ft,
        yBarSizePx: fe,
        xBarSizePx: q,
        yBarTopPx: Ae,
        xBarLeftPx: Pe,
        isShowXBar: bt,
        isShowYBar: dt,
        isIos: F,
        handleScroll: O,
        handleContentResize: X,
        handleContainerResize: le,
        handleYScrollMouseDown: Me,
        handleXScrollMouseDown: ve,
        containerWidth: v,
        cssVars: n ? void 0 : Ut,
        themeClass: $t == null ? void 0 : $t.themeClass,
        onRender: $t == null ? void 0 : $t.onRender
      });
    },
    render() {
      var e;
      const { $slots: t, mergedClsPrefix: n, triggerDisplayManually: r, rtlEnabled: o, internalHoistYRail: i, yPlacement: s, xPlacement: l, xScrollable: a } = this;
      if (!this.scrollable) return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
      const c = this.trigger === "none", u = (v, p) => $("div", {
        ref: "yRailRef",
        class: [
          `${n}-scrollbar-rail`,
          `${n}-scrollbar-rail--vertical`,
          `${n}-scrollbar-rail--vertical--${s}`,
          v
        ],
        "data-scrollbar-rail": true,
        style: [
          p || "",
          this.verticalRailStyle
        ],
        "aria-hidden": true
      }, $(c ? Ul : _r, c ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? $("div", {
          class: `${n}-scrollbar-rail__scrollbar`,
          style: {
            height: this.yBarSizePx,
            top: this.yBarTopPx
          },
          onMousedown: this.handleYScrollMouseDown
        }) : null
      })), f = () => {
        var v, p;
        return (v = this.onRender) === null || v === void 0 || v.call(this), $("div", Ec(this.$attrs, {
          role: "none",
          ref: "wrapperRef",
          class: [
            `${n}-scrollbar`,
            this.themeClass,
            o && `${n}-scrollbar--rtl`
          ],
          style: this.cssVars,
          onMouseenter: r ? void 0 : this.handleMouseEnterWrapper,
          onMouseleave: r ? void 0 : this.handleMouseLeaveWrapper
        }), [
          this.container ? (p = t.default) === null || p === void 0 ? void 0 : p.call(t) : $("div", {
            role: "none",
            ref: "containerRef",
            class: [
              `${n}-scrollbar-container`,
              this.containerClass
            ],
            style: [
              this.containerStyle,
              this.internalExposeWidthCssVar ? {
                "--n-scrollbar-current-width": kg(this.containerWidth)
              } : void 0
            ],
            onScroll: this.handleScroll,
            onWheel: this.onWheel
          }, $(Vl, {
            onResize: this.handleContentResize
          }, {
            default: () => $("div", {
              ref: "contentRef",
              role: "none",
              style: [
                {
                  width: this.xScrollable ? "fit-content" : null
                },
                this.contentStyle
              ],
              class: [
                `${n}-scrollbar-content`,
                this.contentClass
              ]
            }, t)
          })),
          i ? null : u(void 0, void 0),
          a && $("div", {
            ref: "xRailRef",
            class: [
              `${n}-scrollbar-rail`,
              `${n}-scrollbar-rail--horizontal`,
              `${n}-scrollbar-rail--horizontal--${l}`
            ],
            style: this.horizontalRailStyle,
            "data-scrollbar-rail": true,
            "aria-hidden": true
          }, $(c ? Ul : _r, c ? null : {
            name: "fade-in-transition"
          }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? $("div", {
              class: `${n}-scrollbar-rail__scrollbar`,
              style: {
                width: this.xBarSizePx,
                right: o ? this.xBarLeftPx : void 0,
                left: o ? void 0 : this.xBarLeftPx
              },
              onMousedown: this.handleXScrollMouseDown
            }) : null
          }))
        ]);
      }, h = this.container ? f() : $(Vl, {
        onResize: this.handleContainerResize
      }, {
        default: f
      });
      return i ? $(De, null, h, u(this.themeClass, this.cssVars)) : h;
    }
  });
  l1 = Zu;
  ({ cubicBezierEaseInOut: wt, cubicBezierEaseOut: cy, cubicBezierEaseIn: uy } = Br);
  fy = function({ overflow: e = "hidden", duration: t = ".3s", originalTransition: n = "", leavingDelay: r = "0s", foldPadding: o = false, enterToProps: i = void 0, leaveToProps: s = void 0, reverse: l = false } = {}) {
    const a = l ? "leave" : "enter", c = l ? "enter" : "leave";
    return [
      K(`&.fade-in-height-expand-transition-${c}-from,
 &.fade-in-height-expand-transition-${a}-to`, Object.assign(Object.assign({}, i), {
        opacity: 1
      })),
      K(`&.fade-in-height-expand-transition-${c}-to,
 &.fade-in-height-expand-transition-${a}-from`, Object.assign(Object.assign({}, s), {
        opacity: 0,
        marginTop: "0 !important",
        marginBottom: "0 !important",
        paddingTop: o ? "0 !important" : void 0,
        paddingBottom: o ? "0 !important" : void 0
      })),
      K(`&.fade-in-height-expand-transition-${c}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${wt} ${r},
 opacity ${t} ${cy} ${r},
 margin-top ${t} ${wt} ${r},
 margin-bottom ${t} ${wt} ${r},
 padding-top ${t} ${wt} ${r},
 padding-bottom ${t} ${wt} ${r}
 ${n ? `,${n}` : ""}
 `),
      K(`&.fade-in-height-expand-transition-${a}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${wt},
 opacity ${t} ${uy},
 margin-top ${t} ${wt},
 margin-bottom ${t} ${wt},
 padding-top ${t} ${wt},
 padding-bottom ${t} ${wt}
 ${n ? `,${n}` : ""}
 `)
    ];
  };
  let Qu, hy;
  dy = "n-message-api";
  Qu = "n-message-provider";
  hy = {
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
  function py(e) {
    const { textColor2: t, closeIconColor: n, closeIconColorHover: r, closeIconColorPressed: o, infoColor: i, successColor: s, errorColor: l, warningColor: a, popoverColor: c, boxShadow2: u, primaryColor: f, lineHeight: h, borderRadius: v, closeColorHover: p, closeColorPressed: b } = e;
    return Object.assign(Object.assign({}, hy), {
      closeBorderRadius: v,
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
      iconColorSuccess: s,
      iconColorWarning: a,
      iconColorError: l,
      iconColorLoading: f,
      closeColorHover: p,
      closeColorPressed: b,
      closeIconColor: n,
      closeIconColorHover: r,
      closeIconColorPressed: o,
      closeColorHoverInfo: p,
      closeColorPressedInfo: b,
      closeIconColorInfo: n,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: o,
      closeColorHoverSuccess: p,
      closeColorPressedSuccess: b,
      closeIconColorSuccess: n,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: o,
      closeColorHoverError: p,
      closeColorPressedError: b,
      closeIconColorError: n,
      closeIconColorHoverError: r,
      closeIconColorPressedError: o,
      closeColorHoverWarning: p,
      closeColorPressedWarning: b,
      closeIconColorWarning: n,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: o,
      closeColorHoverLoading: p,
      closeColorPressedLoading: b,
      closeIconColorLoading: n,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: o,
      loadingColor: f,
      lineHeight: h,
      borderRadius: v,
      border: "0"
    });
  }
  const gy = {
    common: ws,
    self: py
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
  }, vy = K([
    ae("message-wrapper", `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [
      fy({
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
    ae("message", `
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
      ze("content", `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `),
      ze("icon", `
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
        ].map((e) => ue(`${e}-type`, [
          K("> *", `
 color: var(--n-icon-color-${e});
 transition: color .3s var(--n-bezier);
 `)
        ])),
        K("> *", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [
          ki()
        ])
      ]),
      ze("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [
        K("&:hover", `
 color: var(--n-close-icon-color-hover);
 `),
        K("&:active", `
 color: var(--n-close-icon-color-pressed);
 `)
      ])
    ]),
    ae("message-container", `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [
      ue("top", `
 top: 12px;
 left: 0;
 right: 0;
 `),
      ue("top-left", `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `),
      ue("top-right", `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `),
      ue("bottom", `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `),
      ue("bottom-left", `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `),
      ue("bottom-right", `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)
    ])
  ]), my = {
    info: () => $(Ku, null),
    success: () => $(Gu, null),
    warning: () => $(qu, null),
    error: () => $(Uu, null),
    default: () => null
  }, by = Ne({
    name: "Message",
    props: Object.assign(Object.assign({}, ef), {
      render: Function
    }),
    setup(e) {
      const { inlineThemeDisabled: t, mergedRtlRef: n } = Ir(e), { props: r, mergedClsPrefixRef: o } = Ce(Qu), i = bs("Message", n, o), s = On("Message", "-message", vy, gy, r, o), l = se(() => {
        const { type: c } = e, { common: { cubicBezierEaseInOut: u }, self: { padding: f, margin: h, maxWidth: v, iconMargin: p, closeMargin: b, closeSize: _, iconSize: E, fontSize: x, lineHeight: B, borderRadius: I, border: j, iconColorInfo: W, iconColorSuccess: A, iconColorWarning: w, iconColorError: y, iconColorLoading: M, closeIconSize: V, closeBorderRadius: F, [Bt("textColor", c)]: Q, [Bt("boxShadow", c)]: ie, [Bt("color", c)]: fe, [Bt("closeColorHover", c)]: oe, [Bt("closeColorPressed", c)]: q, [Bt("closeIconColor", c)]: ne, [Bt("closeIconColorPressed", c)]: Ae, [Bt("closeIconColorHover", c)]: Ie } } = s.value;
        return {
          "--n-bezier": u,
          "--n-margin": h,
          "--n-padding": f,
          "--n-max-width": v,
          "--n-font-size": x,
          "--n-icon-margin": p,
          "--n-icon-size": E,
          "--n-close-icon-size": V,
          "--n-close-border-radius": F,
          "--n-close-size": _,
          "--n-close-margin": b,
          "--n-text-color": Q,
          "--n-color": fe,
          "--n-box-shadow": ie,
          "--n-icon-color-info": W,
          "--n-icon-color-success": A,
          "--n-icon-color-warning": w,
          "--n-icon-color-error": y,
          "--n-icon-color-loading": M,
          "--n-close-color-hover": oe,
          "--n-close-color-pressed": q,
          "--n-close-icon-color": ne,
          "--n-close-icon-color-pressed": Ae,
          "--n-close-icon-color-hover": Ie,
          "--n-line-height": B,
          "--n-border-radius": I,
          "--n-border": j
        };
      }), a = t ? hs("message", se(() => e.type[0]), l, {}) : void 0;
      return {
        mergedClsPrefix: o,
        rtlEnabled: i,
        messageProviderProps: r,
        handleClose() {
          var c;
          (c = e.onClose) === null || c === void 0 || c.call(e);
        },
        cssVars: t ? void 0 : l,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender,
        placement: r.placement
      };
    },
    render() {
      const { render: e, type: t, closable: n, content: r, mergedClsPrefix: o, cssVars: i, themeClass: s, onRender: l, icon: a, handleClose: c, showIcon: u } = this;
      l == null ? void 0 : l();
      let f;
      return $("div", {
        class: [
          `${o}-message-wrapper`,
          s
        ],
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: [
          {
            alignItems: this.placement.startsWith("top") ? "flex-start" : "flex-end"
          },
          i
        ]
      }, e ? e(this.$props) : $("div", {
        class: [
          `${o}-message ${o}-message--${t}-type`,
          this.rtlEnabled && `${o}-message--rtl`
        ]
      }, (f = yy(a, t, o, this.spinProps)) && u ? $("div", {
        class: `${o}-message__icon ${o}-message__icon--${t}-type`
      }, $(Wu, null, {
        default: () => f
      })) : null, $("div", {
        class: `${o}-message__content`
      }, fn(r)), n ? $(Xu, {
        clsPrefix: o,
        class: `${o}-message__close`,
        onClick: c,
        absolute: true
      }) : null));
    }
  });
  function yy(e, t, n, r) {
    if (typeof e == "function") return e();
    {
      const o = t === "loading" ? $(ty, Object.assign({
        clsPrefix: n,
        strokeWidth: 24,
        scale: 0.85
      }, r)) : my[t]();
      return o ? $(xs, {
        clsPrefix: n,
        key: t
      }, {
        default: () => o
      }) : null;
    }
  }
  const xy = Ne({
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
      const n = be(true);
      Rn(() => {
        r();
      });
      function r() {
        const { duration: u } = e;
        u && (t = window.setTimeout(s, u));
      }
      function o(u) {
        u.currentTarget === u.target && t !== null && (window.clearTimeout(t), t = null);
      }
      function i(u) {
        u.currentTarget === u.target && r();
      }
      function s() {
        const { onHide: u } = e;
        n.value = false, t && (window.clearTimeout(t), t = null), u && u();
      }
      function l() {
        const { onClose: u } = e;
        u && u(), s();
      }
      function a() {
        const { onAfterLeave: u, onInternalAfterLeave: f, onAfterHide: h, internalKey: v } = e;
        u && u(), f && f(v), h && h();
      }
      function c() {
        s();
      }
      return {
        show: n,
        hide: s,
        handleClose: l,
        handleAfterLeave: a,
        handleMouseleave: i,
        handleMouseenter: o,
        deactivate: c
      };
    },
    render() {
      return $(Z0, {
        appear: true,
        onAfterLeave: this.handleAfterLeave,
        onLeave: this.onLeave
      }, {
        default: () => [
          this.show ? $(by, {
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
  }), wy = Object.assign(Object.assign({}, On.props), {
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
  }), _y = Ne({
    name: "MessageProvider",
    props: wy,
    setup(e) {
      const { mergedClsPrefixRef: t } = Ir(e), n = be([]), r = be({}), o = {
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
        destroyAll: l
      };
      tn(Qu, {
        props: e,
        mergedClsPrefixRef: t
      }), tn(dy, o);
      function i(a, c) {
        const u = au(), f = En(Object.assign(Object.assign({}, c), {
          content: a,
          key: u,
          destroy: () => {
            var v;
            (v = r.value[u]) === null || v === void 0 || v.hide();
          }
        })), { max: h } = e;
        return h && n.value.length >= h && n.value.shift(), n.value.push(f), f;
      }
      function s(a) {
        n.value.splice(n.value.findIndex((c) => c.key === a), 1), delete r.value[a];
      }
      function l() {
        Object.values(r.value).forEach((a) => {
          a.hide();
        });
      }
      return Object.assign({
        mergedClsPrefix: t,
        messageRefs: r,
        messageList: n,
        handleAfterLeave: s
      }, o);
    },
    render() {
      var e, t, n;
      return $(De, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.messageList.length ? $(Ga, {
        to: (n = this.to) !== null && n !== void 0 ? n : "body"
      }, $("div", {
        class: [
          `${this.mergedClsPrefix}-message-container`,
          `${this.mergedClsPrefix}-message-container--${this.placement}`,
          this.containerClass
        ],
        key: "message-container",
        style: this.containerStyle
      }, this.messageList.map((r) => $(xy, Object.assign({
        ref: (o) => {
          o && (this.messageRefs[r.key] = o);
        },
        internalKey: r.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, vu(r, [
        "destroy"
      ], void 0), {
        duration: r.duration === void 0 ? this.duration : r.duration,
        keepAliveOnHover: r.keepAliveOnHover === void 0 ? this.keepAliveOnHover : r.keepAliveOnHover,
        closable: r.closable === void 0 ? this.closable : r.closable
      }))))) : null);
    }
  }), Cy = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  };
  function Sy(e) {
    const { textColor2: t, successColor: n, infoColor: r, warningColor: o, errorColor: i, popoverColor: s, closeIconColor: l, closeIconColorHover: a, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: f, textColor1: h, textColor3: v, borderRadius: p, fontWeightStrong: b, boxShadow2: _, lineHeight: E, fontSize: x } = e;
    return Object.assign(Object.assign({}, Cy), {
      borderRadius: p,
      lineHeight: E,
      fontSize: x,
      headerFontWeight: b,
      iconColor: t,
      iconColorSuccess: n,
      iconColorInfo: r,
      iconColorWarning: o,
      iconColorError: i,
      color: s,
      textColor: t,
      closeIconColor: l,
      closeIconColorHover: a,
      closeIconColorPressed: c,
      closeBorderRadius: p,
      closeColorHover: u,
      closeColorPressed: f,
      headerTextColor: h,
      descriptionTextColor: v,
      actionTextColor: t,
      boxShadow: _
    });
  }
  const Ey = {
    name: "Notification",
    common: ws,
    peers: {
      Scrollbar: Ju
    },
    self: Sy
  }, ko = "n-notification-provider", Ry = Ne({
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
      const { mergedThemeRef: e, mergedClsPrefixRef: t, wipTransitionCountRef: n } = Ce(ko), r = be(null);
      return Ro(() => {
        var o, i;
        n.value > 0 ? (o = r == null ? void 0 : r.value) === null || o === void 0 || o.classList.add("transitioning") : (i = r == null ? void 0 : r.value) === null || i === void 0 || i.classList.remove("transitioning");
      }), {
        selfRef: r,
        mergedTheme: e,
        mergedClsPrefix: t,
        transitioning: n
      };
    },
    render() {
      const { $slots: e, scrollable: t, mergedClsPrefix: n, mergedTheme: r, placement: o } = this;
      return $("div", {
        ref: "selfRef",
        class: [
          `${n}-notification-container`,
          t && `${n}-notification-container--scrollable`,
          `${n}-notification-container--${o}`
        ]
      }, t ? $(Zu, {
        theme: r.peers.Scrollbar,
        themeOverrides: r.peerOverrides.Scrollbar,
        contentStyle: {
          overflow: "hidden"
        }
      }, e) : e);
    }
  }), Ay = {
    info: () => $(Ku, null),
    success: () => $(Gu, null),
    warning: () => $(qu, null),
    error: () => $(Uu, null),
    default: () => null
  }, _s = {
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
  }, Ty = Nv(_s), Oy = Ne({
    name: "Notification",
    props: _s,
    setup(e) {
      const { mergedClsPrefixRef: t, mergedThemeRef: n, props: r } = Ce(ko), { inlineThemeDisabled: o, mergedRtlRef: i } = Ir(), s = bs("Notification", i, t), l = se(() => {
        const { type: c } = e, { self: { color: u, textColor: f, closeIconColor: h, closeIconColorHover: v, closeIconColorPressed: p, headerTextColor: b, descriptionTextColor: _, actionTextColor: E, borderRadius: x, headerFontWeight: B, boxShadow: I, lineHeight: j, fontSize: W, closeMargin: A, closeSize: w, width: y, padding: M, closeIconSize: V, closeBorderRadius: F, closeColorHover: Q, closeColorPressed: ie, titleFontSize: fe, metaFontSize: oe, descriptionFontSize: q, [Bt("iconColor", c)]: ne }, common: { cubicBezierEaseOut: Ae, cubicBezierEaseIn: Ie, cubicBezierEaseInOut: Pe } } = n.value, { left: $e, right: ft, top: bt, bottom: dt } = Bn(M);
        return {
          "--n-color": u,
          "--n-font-size": W,
          "--n-text-color": f,
          "--n-description-text-color": _,
          "--n-action-text-color": E,
          "--n-title-text-color": b,
          "--n-title-font-weight": B,
          "--n-bezier": Pe,
          "--n-bezier-ease-out": Ae,
          "--n-bezier-ease-in": Ie,
          "--n-border-radius": x,
          "--n-box-shadow": I,
          "--n-close-border-radius": F,
          "--n-close-color-hover": Q,
          "--n-close-color-pressed": ie,
          "--n-close-icon-color": h,
          "--n-close-icon-color-hover": v,
          "--n-close-icon-color-pressed": p,
          "--n-line-height": j,
          "--n-icon-color": ne,
          "--n-close-margin": A,
          "--n-close-size": w,
          "--n-close-icon-size": V,
          "--n-width": y,
          "--n-padding-left": $e,
          "--n-padding-right": ft,
          "--n-padding-top": bt,
          "--n-padding-bottom": dt,
          "--n-title-font-size": fe,
          "--n-meta-font-size": oe,
          "--n-description-font-size": q
        };
      }), a = o ? hs("notification", se(() => e.type[0]), l, r) : void 0;
      return {
        mergedClsPrefix: t,
        showAvatar: se(() => e.avatar || e.type !== "default"),
        handleCloseClick() {
          e.onClose();
        },
        rtlEnabled: s,
        cssVars: o ? void 0 : l,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender
      };
    },
    render() {
      var e;
      const { mergedClsPrefix: t } = this;
      return (e = this.onRender) === null || e === void 0 || e.call(this), $("div", {
        class: [
          `${t}-notification-wrapper`,
          this.themeClass
        ],
        onMouseenter: this.onMouseenter,
        onMouseleave: this.onMouseleave,
        style: this.cssVars
      }, $("div", {
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
      }, this.showAvatar ? $("div", {
        class: `${t}-notification__avatar`
      }, this.avatar ? fn(this.avatar) : this.type !== "default" ? $(xs, {
        clsPrefix: t
      }, {
        default: () => Ay[this.type]()
      }) : null) : null, this.closable ? $(Xu, {
        clsPrefix: t,
        class: `${t}-notification__close`,
        onClick: this.handleCloseClick
      }) : null, $("div", {
        ref: "bodyRef",
        class: `${t}-notification-main`
      }, this.title ? $("div", {
        class: `${t}-notification-main__header`
      }, fn(this.title)) : null, this.description ? $("div", {
        class: `${t}-notification-main__description`
      }, fn(this.description)) : null, this.content ? $("pre", {
        class: `${t}-notification-main__content`
      }, fn(this.content)) : null, this.meta || this.action ? $("div", {
        class: `${t}-notification-main-footer`
      }, this.meta ? $("div", {
        class: `${t}-notification-main-footer__meta`
      }, fn(this.meta)) : null, this.action ? $("div", {
        class: `${t}-notification-main-footer__action`
      }, fn(this.action)) : null) : null)));
    }
  }), Py = Object.assign(Object.assign({}, _s), {
    duration: Number,
    onClose: Function,
    onLeave: Function,
    onAfterEnter: Function,
    onAfterLeave: Function,
    onHide: Function,
    onAfterShow: Function,
    onAfterHide: Function
  }), $y = Ne({
    name: "NotificationEnvironment",
    props: Object.assign(Object.assign({}, Py), {
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
      const { wipTransitionCountRef: t } = Ce(ko), n = be(true);
      let r = null;
      function o() {
        n.value = false, r && window.clearTimeout(r);
      }
      function i(p) {
        t.value++, Eo(() => {
          p.style.height = `${p.offsetHeight}px`, p.style.maxHeight = "0", p.style.transition = "none", p.offsetHeight, p.style.transition = "", p.style.maxHeight = p.style.height;
        });
      }
      function s(p) {
        t.value--, p.style.height = "", p.style.maxHeight = "";
        const { onAfterEnter: b, onAfterShow: _ } = e;
        b && b(), _ && _();
      }
      function l(p) {
        t.value++, p.style.maxHeight = `${p.offsetHeight}px`, p.style.height = `${p.offsetHeight}px`, p.offsetHeight;
      }
      function a(p) {
        const { onHide: b } = e;
        b && b(), p.style.maxHeight = "0", p.offsetHeight;
      }
      function c() {
        t.value--;
        const { onAfterLeave: p, onInternalAfterLeave: b, onAfterHide: _, internalKey: E } = e;
        p && p(), b(E), _ && _();
      }
      function u() {
        const { duration: p } = e;
        p && (r = window.setTimeout(o, p));
      }
      function f(p) {
        p.currentTarget === p.target && r !== null && (window.clearTimeout(r), r = null);
      }
      function h(p) {
        p.currentTarget === p.target && u();
      }
      function v() {
        const { onClose: p } = e;
        p ? Promise.resolve(p()).then((b) => {
          b !== false && o();
        }) : o();
      }
      return Rn(() => {
        e.duration && (r = window.setTimeout(o, e.duration));
      }), {
        show: n,
        hide: o,
        handleClose: v,
        handleAfterLeave: c,
        handleLeave: a,
        handleBeforeLeave: l,
        handleAfterEnter: s,
        handleBeforeEnter: i,
        handleMouseenter: f,
        handleMouseleave: h
      };
    },
    render() {
      return $(_r, {
        name: "notification-transition",
        appear: true,
        onBeforeEnter: this.handleBeforeEnter,
        onAfterEnter: this.handleAfterEnter,
        onBeforeLeave: this.handleBeforeLeave,
        onLeave: this.handleLeave,
        onAfterLeave: this.handleAfterLeave
      }, {
        default: () => this.show ? $(Oy, Object.assign({}, zv(this.$props, Ty), {
          onClose: this.handleClose,
          onMouseenter: this.duration && this.keepAliveOnHover ? this.handleMouseenter : void 0,
          onMouseleave: this.duration && this.keepAliveOnHover ? this.handleMouseleave : void 0
        })) : null
      });
    }
  }), Iy = K([
    ae("notification-container", `
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `, [
      K(">", [
        ae("scrollbar", `
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
          K(">", [
            ae("scrollbar-container", `
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [
              ae("scrollbar-content", `
 padding-top: 12px;
 padding-bottom: 33px;
 `)
            ])
          ])
        ])
      ]),
      ue("top, top-right, top-left", `
 top: 12px;
 `, [
        K("&.transitioning >", [
          ae("scrollbar", [
            K(">", [
              ae("scrollbar-container", `
 min-height: 100vh !important;
 `)
            ])
          ])
        ])
      ]),
      ue("bottom, bottom-right, bottom-left", `
 bottom: 12px;
 `, [
        K(">", [
          ae("scrollbar", [
            K(">", [
              ae("scrollbar-container", [
                ae("scrollbar-content", `
 padding-bottom: 12px;
 `)
              ])
            ])
          ])
        ]),
        ae("notification-wrapper", `
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)
      ]),
      ue("top, bottom", `
 left: 50%;
 transform: translateX(-50%);
 `, [
        ae("notification-wrapper", [
          K("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: scale(0.85);
 `),
          K("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: scale(1);
 `)
        ])
      ]),
      ue("top", [
        ae("notification-wrapper", `
 transform-origin: top center;
 `)
      ]),
      ue("bottom", [
        ae("notification-wrapper", `
 transform-origin: bottom center;
 `)
      ]),
      ue("top-right, bottom-right", [
        ae("notification", `
 margin-left: 28px;
 margin-right: 16px;
 `)
      ]),
      ue("top-left, bottom-left", [
        ae("notification", `
 margin-left: 16px;
 margin-right: 28px;
 `)
      ]),
      ue("top-right", `
 right: 0;
 `, [
        Gr("top-right")
      ]),
      ue("top-left", `
 left: 0;
 `, [
        Gr("top-left")
      ]),
      ue("bottom-right", `
 right: 0;
 `, [
        Gr("bottom-right")
      ]),
      ue("bottom-left", `
 left: 0;
 `, [
        Gr("bottom-left")
      ]),
      ue("scrollable", [
        ue("top-right", `
 top: 0;
 `),
        ue("top-left", `
 top: 0;
 `),
        ue("bottom-right", `
 bottom: 0;
 `),
        ue("bottom-left", `
 bottom: 0;
 `)
      ]),
      ae("notification-wrapper", `
 margin-bottom: 12px;
 `, [
        K("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),
        K("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 opacity: 1;
 `),
        K("&.notification-transition-leave-active", `
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
        K("&.notification-transition-enter-active", `
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
      ae("notification", `
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
        ze("avatar", [
          ae("icon", `
 color: var(--n-icon-color);
 `),
          ae("base-icon", `
 color: var(--n-icon-color);
 `)
        ]),
        ue("show-avatar", [
          ae("notification-main", `
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)
        ]),
        ue("closable", [
          ae("notification-main", [
            K("> *:first-child", `
 padding-right: 20px;
 `)
          ]),
          ze("close", `
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)
        ]),
        ze("avatar", `
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
          ae("icon", "transition: color .3s var(--n-bezier);")
        ]),
        ae("notification-main", `
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `, [
          ae("notification-main-footer", `
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `, [
            ze("meta", `
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
            ze("action", `
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)
          ]),
          ze("header", `
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),
          ze("description", `
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),
          ze("content", `
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `, [
            K("&:first-child", "margin: 0;")
          ])
        ])
      ])
    ])
  ]);
  function Gr(e) {
    const n = e.split("-")[1] === "left" ? "calc(-100%)" : "calc(100%)";
    return ae("notification-wrapper", [
      K("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: translate(${n}, 0);
 `),
      K("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: translate(0, 0);
 `)
    ]);
  }
  const Fy = "n-notification-api", By = Object.assign(Object.assign({}, On.props), {
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
  }), My = Ne({
    name: "NotificationProvider",
    props: By,
    setup(e) {
      const { mergedClsPrefixRef: t } = Ir(e), n = be([]), r = {}, o = /* @__PURE__ */ new Set();
      function i(v) {
        const p = au(), b = () => {
          o.add(p), r[p] && r[p].hide();
        }, _ = En(Object.assign(Object.assign({}, v), {
          key: p,
          destroy: b,
          hide: b,
          deactivate: b
        })), { max: E } = e;
        if (E && n.value.length - o.size >= E) {
          let x = false, B = 0;
          for (const I of n.value) {
            if (!o.has(I.key)) {
              r[I.key] && (I.destroy(), x = true);
              break;
            }
            B++;
          }
          x || n.value.splice(B, 1);
        }
        return n.value.push(_), _;
      }
      const s = [
        "info",
        "success",
        "warning",
        "error"
      ].map((v) => (p) => i(Object.assign(Object.assign({}, p), {
        type: v
      })));
      function l(v) {
        o.delete(v), n.value.splice(n.value.findIndex((p) => p.key === v), 1);
      }
      const a = On("Notification", "-notification", Iy, Ey, e, t), c = {
        create: i,
        info: s[0],
        success: s[1],
        warning: s[2],
        error: s[3],
        open: f,
        destroyAll: h
      }, u = be(0);
      tn(Fy, c), tn(ko, {
        props: e,
        mergedClsPrefixRef: t,
        mergedThemeRef: a,
        wipTransitionCountRef: u
      });
      function f(v) {
        return i(v);
      }
      function h() {
        Object.values(n.value).forEach((v) => {
          v.hide();
        });
      }
      return Object.assign({
        mergedClsPrefix: t,
        notificationList: n,
        notificationRefs: r,
        handleAfterLeave: l
      }, c);
    },
    render() {
      var e, t, n;
      const { placement: r } = this;
      return $(De, null, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e), this.notificationList.length ? $(Ga, {
        to: (n = this.to) !== null && n !== void 0 ? n : "body"
      }, $(Ry, {
        class: this.containerClass,
        style: this.containerStyle,
        scrollable: this.scrollable && r !== "top" && r !== "bottom",
        placement: r
      }, {
        default: () => this.notificationList.map((o) => $($y, Object.assign({
          ref: (i) => {
            const s = o.key;
            i === null ? delete this.notificationRefs[s] : this.notificationRefs[s] = i;
          }
        }, vu(o, [
          "destroy",
          "hide",
          "deactivate"
        ]), {
          internalKey: o.key,
          onInternalAfterLeave: this.handleAfterLeave,
          keepAliveOnHover: o.keepAliveOnHover === void 0 ? this.keepAliveOnHover : o.keepAliveOnHover
        })))
      })) : null);
    }
  }), Ly = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  }, Hy = {};
  function zy(e, t) {
    const n = Ad("RouterView"), r = My, o = _y;
    return so(), ao(o, null, {
      default: vi(() => [
        ke(r, null, {
          default: vi(() => [
            ke(n)
          ]),
          _: 1
        })
      ]),
      _: 1
    });
  }
  const Ny = Ly(Hy, [
    [
      "render",
      zy
    ]
  ]), Cs = Yh(Ny), Dy = Qh(), tf = hg({
    history: Wp(),
    routes: vg
  });
  tf.beforeEach((e) => {
    const t = mg();
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
  Cs.use(Dy);
  Cs.use(tf);
  Cs.mount("#app");
})();
export {
  Z0 as $,
  Ff as A,
  Ci as B,
  Ki as C,
  Re as D,
  t1 as E,
  ki as F,
  Dg as G,
  ty as H,
  Bt as I,
  kg as J,
  Pl as K,
  De as L,
  ky as M,
  Wu as N,
  ny as O,
  Ro as P,
  ey as Q,
  ev as R,
  fy as S,
  _r as T,
  Ec as U,
  Xu as V,
  xs as W,
  Uu as X,
  qu as Y,
  Ku as Z,
  Gu as _,
  __tla,
  An as a,
  Tn as a$,
  bs as a0,
  Bn as a1,
  ys as a2,
  Nv as a3,
  tn as a4,
  mg as a5,
  Ky as a6,
  Xy as a7,
  Gy as a8,
  eo as a9,
  Mg as aA,
  Ga as aB,
  zo as aC,
  Vl as aD,
  ec as aE,
  tc as aF,
  Pd as aG,
  au as aH,
  kl as aI,
  gs as aJ,
  Un as aK,
  xb as aL,
  Su as aM,
  ms as aN,
  yb as aO,
  po as aP,
  Fr as aQ,
  im as aR,
  $u as aS,
  Gn as aT,
  Wn as aU,
  No as aV,
  ia as aW,
  Au as aX,
  qn as aY,
  Ou as aZ,
  Kn as a_,
  nr as aa,
  Oo as ab,
  Po as ac,
  un as ad,
  r1 as ae,
  s1 as af,
  Jy as ag,
  Qy as ah,
  fn as ai,
  Ju as aj,
  oc as ak,
  o1 as al,
  nn as am,
  jy as an,
  Zu as ao,
  Uy as ap,
  zv as aq,
  Eo as ar,
  lv as as,
  jg as at,
  Cn as au,
  Mr as av,
  Hv as aw,
  Pr as ax,
  En as ay,
  qe as az,
  ws as b,
  Cu as b0,
  _u as b1,
  Hi as b2,
  wu as b3,
  j0 as b4,
  Jv as b5,
  Br as b6,
  e1 as b7,
  l1 as b8,
  Io as b9,
  Ul as ba,
  Zy as bb,
  vu as bc,
  i1 as bd,
  n1 as be,
  Ar as bf,
  dy as bg,
  Yv as bh,
  Xb as bi,
  xr as bj,
  se as c,
  Ne as d,
  K as e,
  ae as f,
  ue as g,
  ze as h,
  Ce as i,
  $ as j,
  Ir as k,
  On as l,
  hs as m,
  ao as n,
  Rn as o,
  vi as p,
  mn as q,
  be as r,
  so as s,
  ns as t,
  qy as u,
  ke as v,
  sr as w,
  Wy as x,
  Sc as y,
  Vy as z
};
