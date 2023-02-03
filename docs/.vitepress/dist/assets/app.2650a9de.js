function js(e, t) {
  const n = Object.create(null),
    s = e.split(',')
  for (let o = 0; o < s.length; o++) n[s[o]] = !0
  return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
}
function Kn(e) {
  if (q(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        o = xe(s) ? jr(s) : Kn(s)
      if (o) for (const i in o) t[i] = o[i]
    }
    return t
  } else {
    if (xe(e)) return e
    if (ve(e)) return e
  }
}
const Fr = /;(?![^(]*\))/g,
  Hr = /:([^]+)/,
  Rr = /\/\*.*?\*\//gs
function jr(e) {
  const t = {}
  return (
    e
      .replace(Rr, '')
      .split(Fr)
      .forEach(n => {
        if (n) {
          const s = n.split(Hr)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function me(e) {
  let t = ''
  if (xe(e)) t = e
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = me(e[n])
      s && (t += s + ' ')
    }
  else if (ve(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const Dr =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Ur = js(Dr)
function _i(e) {
  return !!e || e === ''
}
const ie = e =>
    xe(e)
      ? e
      : e == null
      ? ''
      : q(e) || (ve(e) && (e.toString === bi || !Z(e.toString)))
      ? JSON.stringify(e, mi, 2)
      : String(e),
  mi = (e, t) =>
    t && t.__v_isRef
      ? mi(e, t.value)
      : Ft(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, o]) => ((n[`${s} =>`] = o), n),
            {}
          )
        }
      : vi(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ve(t) && !q(t) && !yi(t)
      ? String(t)
      : t,
  ge = {},
  Ot = [],
  We = () => {},
  zr = () => !1,
  Kr = /^on[^a-z]/,
  vn = e => Kr.test(e),
  Ds = e => e.startsWith('onUpdate:'),
  we = Object.assign,
  Us = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  Wr = Object.prototype.hasOwnProperty,
  le = (e, t) => Wr.call(e, t),
  q = Array.isArray,
  Ft = e => Wn(e) === '[object Map]',
  vi = e => Wn(e) === '[object Set]',
  Z = e => typeof e == 'function',
  xe = e => typeof e == 'string',
  zs = e => typeof e == 'symbol',
  ve = e => e !== null && typeof e == 'object',
  gi = e => ve(e) && Z(e.then) && Z(e.catch),
  bi = Object.prototype.toString,
  Wn = e => bi.call(e),
  qr = e => Wn(e).slice(8, -1),
  yi = e => Wn(e) === '[object Object]',
  Ks = e => xe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  tn = js(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  qn = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  Gr = /-(\w)/g,
  Ze = qn(e => e.replace(Gr, (t, n) => (n ? n.toUpperCase() : ''))),
  Yr = /\B([A-Z])/g,
  Yt = qn(e => e.replace(Yr, '-$1').toLowerCase()),
  Gn = qn(e => e.charAt(0).toUpperCase() + e.slice(1)),
  fs = qn(e => (e ? `on${Gn(e)}` : '')),
  an = (e, t) => !Object.is(e, t),
  ds = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  Mn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Qr = e => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  Xr = e => {
    const t = xe(e) ? Number(e) : NaN
    return isNaN(t) ? e : t
  }
let wo
const Jr = () =>
  wo ||
  (wo =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
let Be
class Zr {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Be),
      !t && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Be
      try {
        return (Be = this), t()
      } finally {
        Be = n
      }
    }
  }
  on() {
    Be = this
  }
  off() {
    Be = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop()
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function el(e, t = Be) {
  t && t.active && t.effects.push(e)
}
function xi() {
  return Be
}
function tl(e) {
  Be && Be.cleanups.push(e)
}
const Ws = e => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  $i = e => (e.w & _t) > 0,
  wi = e => (e.n & _t) > 0,
  nl = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= _t
  },
  sl = e => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let s = 0; s < t.length; s++) {
        const o = t[s]
        $i(o) && !wi(o) ? o.delete(e) : (t[n++] = o), (o.w &= ~_t), (o.n &= ~_t)
      }
      t.length = n
    }
  },
  $s = new WeakMap()
let en = 0,
  _t = 1
const ws = 30
let ze
const Vt = Symbol(''),
  ks = Symbol('')
class qs {
  constructor(t, n = null, s) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      el(this, s)
  }
  run() {
    if (!this.active) return this.fn()
    let t = ze,
      n = ht
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = ze),
        (ze = this),
        (ht = !0),
        (_t = 1 << ++en),
        en <= ws ? nl(this) : ko(this),
        this.fn()
      )
    } finally {
      en <= ws && sl(this),
        (_t = 1 << --en),
        (ze = this.parent),
        (ht = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    ze === this
      ? (this.deferStop = !0)
      : this.active &&
        (ko(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function ko(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let ht = !0
const ki = []
function Qt() {
  ki.push(ht), (ht = !1)
}
function Xt() {
  const e = ki.pop()
  ht = e === void 0 ? !0 : e
}
function Le(e, t, n) {
  if (ht && ze) {
    let s = $s.get(e)
    s || $s.set(e, (s = new Map()))
    let o = s.get(n)
    o || s.set(n, (o = Ws())), Pi(o)
  }
}
function Pi(e, t) {
  let n = !1
  en <= ws ? wi(e) || ((e.n |= _t), (n = !$i(e))) : (n = !e.has(ze)),
    n && (e.add(ze), ze.deps.push(e))
}
function ot(e, t, n, s, o, i) {
  const r = $s.get(e)
  if (!r) return
  let l = []
  if (t === 'clear') l = [...r.values()]
  else if (n === 'length' && q(e)) {
    const a = Number(s)
    r.forEach((u, h) => {
      ;(h === 'length' || h >= a) && l.push(u)
    })
  } else
    switch ((n !== void 0 && l.push(r.get(n)), t)) {
      case 'add':
        q(e)
          ? Ks(n) && l.push(r.get('length'))
          : (l.push(r.get(Vt)), Ft(e) && l.push(r.get(ks)))
        break
      case 'delete':
        q(e) || (l.push(r.get(Vt)), Ft(e) && l.push(r.get(ks)))
        break
      case 'set':
        Ft(e) && l.push(r.get(Vt))
        break
    }
  if (l.length === 1) l[0] && Ps(l[0])
  else {
    const a = []
    for (const u of l) u && a.push(...u)
    Ps(Ws(a))
  }
}
function Ps(e, t) {
  const n = q(e) ? e : [...e]
  for (const s of n) s.computed && Po(s)
  for (const s of n) s.computed || Po(s)
}
function Po(e, t) {
  ;(e !== ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const ol = js('__proto__,__v_isRef,__isVue'),
  Ci = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== 'arguments' && e !== 'caller')
      .map(e => Symbol[e])
      .filter(zs)
  ),
  il = Gs(),
  rl = Gs(!1, !0),
  ll = Gs(!0),
  Co = al()
function al() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...n) {
        const s = ce(this)
        for (let i = 0, r = this.length; i < r; i++) Le(s, 'get', i + '')
        const o = s[t](...n)
        return o === -1 || o === !1 ? s[t](...n.map(ce)) : o
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...n) {
        Qt()
        const s = ce(this)[t].apply(this, n)
        return Xt(), s
      }
    }),
    e
  )
}
function cl(e) {
  const t = ce(this)
  return Le(t, 'has', e), t.hasOwnProperty(e)
}
function Gs(e = !1, t = !1) {
  return function (s, o, i) {
    if (o === '__v_isReactive') return !e
    if (o === '__v_isReadonly') return e
    if (o === '__v_isShallow') return t
    if (o === '__v_raw' && i === (e ? (t ? Pl : Ti) : t ? Vi : Ai).get(s))
      return s
    const r = q(s)
    if (!e) {
      if (r && le(Co, o)) return Reflect.get(Co, o, i)
      if (o === 'hasOwnProperty') return cl
    }
    const l = Reflect.get(s, o, i)
    return (zs(o) ? Ci.has(o) : ol(o)) || (e || Le(s, 'get', o), t)
      ? l
      : Ce(l)
      ? r && Ks(o)
        ? l
        : l.value
      : ve(l)
      ? e
        ? Xs(l)
        : Qn(l)
      : l
  }
}
const ul = Si(),
  fl = Si(!0)
function Si(e = !1) {
  return function (n, s, o, i) {
    let r = n[s]
    if (Wt(r) && Ce(r) && !Ce(o)) return !1
    if (
      !e &&
      (!Nn(o) && !Wt(o) && ((r = ce(r)), (o = ce(o))), !q(n) && Ce(r) && !Ce(o))
    )
      return (r.value = o), !0
    const l = q(n) && Ks(s) ? Number(s) < n.length : le(n, s),
      a = Reflect.set(n, s, o, i)
    return (
      n === ce(i) && (l ? an(o, r) && ot(n, 'set', s, o) : ot(n, 'add', s, o)),
      a
    )
  }
}
function dl(e, t) {
  const n = le(e, t)
  e[t]
  const s = Reflect.deleteProperty(e, t)
  return s && n && ot(e, 'delete', t, void 0), s
}
function hl(e, t) {
  const n = Reflect.has(e, t)
  return (!zs(t) || !Ci.has(t)) && Le(e, 'has', t), n
}
function pl(e) {
  return Le(e, 'iterate', q(e) ? 'length' : Vt), Reflect.ownKeys(e)
}
const Ei = { get: il, set: ul, deleteProperty: dl, has: hl, ownKeys: pl },
  _l = {
    get: ll,
    set(e, t) {
      return !0
    },
    deleteProperty(e, t) {
      return !0
    }
  },
  ml = we({}, Ei, { get: rl, set: fl }),
  Ys = e => e,
  Yn = e => Reflect.getPrototypeOf(e)
function wn(e, t, n = !1, s = !1) {
  e = e.__v_raw
  const o = ce(e),
    i = ce(t)
  n || (t !== i && Le(o, 'get', t), Le(o, 'get', i))
  const { has: r } = Yn(o),
    l = s ? Ys : n ? Zs : cn
  if (r.call(o, t)) return l(e.get(t))
  if (r.call(o, i)) return l(e.get(i))
  e !== o && e.get(t)
}
function kn(e, t = !1) {
  const n = this.__v_raw,
    s = ce(n),
    o = ce(e)
  return (
    t || (e !== o && Le(s, 'has', e), Le(s, 'has', o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  )
}
function Pn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Le(ce(e), 'iterate', Vt), Reflect.get(e, 'size', e)
  )
}
function So(e) {
  e = ce(e)
  const t = ce(this)
  return Yn(t).has.call(t, e) || (t.add(e), ot(t, 'add', e, e)), this
}
function Eo(e, t) {
  t = ce(t)
  const n = ce(this),
    { has: s, get: o } = Yn(n)
  let i = s.call(n, e)
  i || ((e = ce(e)), (i = s.call(n, e)))
  const r = o.call(n, e)
  return (
    n.set(e, t), i ? an(t, r) && ot(n, 'set', e, t) : ot(n, 'add', e, t), this
  )
}
function Ao(e) {
  const t = ce(this),
    { has: n, get: s } = Yn(t)
  let o = n.call(t, e)
  o || ((e = ce(e)), (o = n.call(t, e))), s && s.call(t, e)
  const i = t.delete(e)
  return o && ot(t, 'delete', e, void 0), i
}
function Vo() {
  const e = ce(this),
    t = e.size !== 0,
    n = e.clear()
  return t && ot(e, 'clear', void 0, void 0), n
}
function Cn(e, t) {
  return function (s, o) {
    const i = this,
      r = i.__v_raw,
      l = ce(r),
      a = t ? Ys : e ? Zs : cn
    return (
      !e && Le(l, 'iterate', Vt), r.forEach((u, h) => s.call(o, a(u), a(h), i))
    )
  }
}
function Sn(e, t, n) {
  return function (...s) {
    const o = this.__v_raw,
      i = ce(o),
      r = Ft(i),
      l = e === 'entries' || (e === Symbol.iterator && r),
      a = e === 'keys' && r,
      u = o[e](...s),
      h = n ? Ys : t ? Zs : cn
    return (
      !t && Le(i, 'iterate', a ? ks : Vt),
      {
        next() {
          const { value: _, done: g } = u.next()
          return g
            ? { value: _, done: g }
            : { value: l ? [h(_[0]), h(_[1])] : h(_), done: g }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function lt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this
  }
}
function vl() {
  const e = {
      get(i) {
        return wn(this, i)
      },
      get size() {
        return Pn(this)
      },
      has: kn,
      add: So,
      set: Eo,
      delete: Ao,
      clear: Vo,
      forEach: Cn(!1, !1)
    },
    t = {
      get(i) {
        return wn(this, i, !1, !0)
      },
      get size() {
        return Pn(this)
      },
      has: kn,
      add: So,
      set: Eo,
      delete: Ao,
      clear: Vo,
      forEach: Cn(!1, !0)
    },
    n = {
      get(i) {
        return wn(this, i, !0)
      },
      get size() {
        return Pn(this, !0)
      },
      has(i) {
        return kn.call(this, i, !0)
      },
      add: lt('add'),
      set: lt('set'),
      delete: lt('delete'),
      clear: lt('clear'),
      forEach: Cn(!0, !1)
    },
    s = {
      get(i) {
        return wn(this, i, !0, !0)
      },
      get size() {
        return Pn(this, !0)
      },
      has(i) {
        return kn.call(this, i, !0)
      },
      add: lt('add'),
      set: lt('set'),
      delete: lt('delete'),
      clear: lt('clear'),
      forEach: Cn(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(i => {
      ;(e[i] = Sn(i, !1, !1)),
        (n[i] = Sn(i, !0, !1)),
        (t[i] = Sn(i, !1, !0)),
        (s[i] = Sn(i, !0, !0))
    }),
    [e, n, t, s]
  )
}
const [gl, bl, yl, xl] = vl()
function Qs(e, t) {
  const n = t ? (e ? xl : yl) : e ? bl : gl
  return (s, o, i) =>
    o === '__v_isReactive'
      ? !e
      : o === '__v_isReadonly'
      ? e
      : o === '__v_raw'
      ? s
      : Reflect.get(le(n, o) && o in s ? n : s, o, i)
}
const $l = { get: Qs(!1, !1) },
  wl = { get: Qs(!1, !0) },
  kl = { get: Qs(!0, !1) },
  Ai = new WeakMap(),
  Vi = new WeakMap(),
  Ti = new WeakMap(),
  Pl = new WeakMap()
function Cl(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Sl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Cl(qr(e))
}
function Qn(e) {
  return Wt(e) ? e : Js(e, !1, Ei, $l, Ai)
}
function El(e) {
  return Js(e, !1, ml, wl, Vi)
}
function Xs(e) {
  return Js(e, !0, _l, kl, Ti)
}
function Js(e, t, n, s, o) {
  if (!ve(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = o.get(e)
  if (i) return i
  const r = Sl(e)
  if (r === 0) return e
  const l = new Proxy(e, r === 2 ? s : n)
  return o.set(e, l), l
}
function Ht(e) {
  return Wt(e) ? Ht(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Wt(e) {
  return !!(e && e.__v_isReadonly)
}
function Nn(e) {
  return !!(e && e.__v_isShallow)
}
function Li(e) {
  return Ht(e) || Wt(e)
}
function ce(e) {
  const t = e && e.__v_raw
  return t ? ce(t) : e
}
function nn(e) {
  return Mn(e, '__v_skip', !0), e
}
const cn = e => (ve(e) ? Qn(e) : e),
  Zs = e => (ve(e) ? Xs(e) : e)
function Ii(e) {
  ht && ze && ((e = ce(e)), Pi(e.dep || (e.dep = Ws())))
}
function Mi(e, t) {
  e = ce(e)
  const n = e.dep
  n && Ps(n)
}
function Ce(e) {
  return !!(e && e.__v_isRef === !0)
}
function oe(e) {
  return Ni(e, !1)
}
function Al(e) {
  return Ni(e, !0)
}
function Ni(e, t) {
  return Ce(e) ? e : new Vl(e, t)
}
class Vl {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ce(t)),
      (this._value = n ? t : cn(t))
  }
  get value() {
    return Ii(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || Nn(t) || Wt(t)
    ;(t = n ? t : ce(t)),
      an(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : cn(t)), Mi(this))
  }
}
function p(e) {
  return Ce(e) ? e.value : e
}
const Tl = {
  get: (e, t, n) => p(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t]
    return Ce(o) && !Ce(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s)
  }
}
function Bi(e) {
  return Ht(e) ? e : new Proxy(e, Tl)
}
var Oi
class Ll {
  constructor(t, n, s, o) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Oi] = !1),
      (this._dirty = !0),
      (this.effect = new qs(t, () => {
        this._dirty || ((this._dirty = !0), Mi(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = ce(this)
    return (
      Ii(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
Oi = '__v_isReadonly'
function Il(e, t, n = !1) {
  let s, o
  const i = Z(e)
  return (
    i ? ((s = e), (o = We)) : ((s = e.get), (o = e.set)),
    new Ll(s, o, i || !o, n)
  )
}
function pt(e, t, n, s) {
  let o
  try {
    o = s ? e(...s) : e()
  } catch (i) {
    Xn(i, t, n)
  }
  return o
}
function Re(e, t, n, s) {
  if (Z(e)) {
    const i = pt(e, t, n, s)
    return (
      i &&
        gi(i) &&
        i.catch(r => {
          Xn(r, t, n)
        }),
      i
    )
  }
  const o = []
  for (let i = 0; i < e.length; i++) o.push(Re(e[i], t, n, s))
  return o
}
function Xn(e, t, n, s = !0) {
  const o = t ? t.vnode : null
  if (t) {
    let i = t.parent
    const r = t.proxy,
      l = n
    for (; i; ) {
      const u = i.ec
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, r, l) === !1) return
      }
      i = i.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) {
      pt(a, null, 10, [e, r, l])
      return
    }
  }
  Ml(e, n, o, s)
}
function Ml(e, t, n, s = !0) {
  console.error(e)
}
let un = !1,
  Cs = !1
const Pe = []
let Xe = 0
const Rt = []
let st = null,
  Ct = 0
const Fi = Promise.resolve()
let eo = null
function to(e) {
  const t = eo || Fi
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Nl(e) {
  let t = Xe + 1,
    n = Pe.length
  for (; t < n; ) {
    const s = (t + n) >>> 1
    fn(Pe[s]) < e ? (t = s + 1) : (n = s)
  }
  return t
}
function no(e) {
  ;(!Pe.length || !Pe.includes(e, un && e.allowRecurse ? Xe + 1 : Xe)) &&
    (e.id == null ? Pe.push(e) : Pe.splice(Nl(e.id), 0, e), Hi())
}
function Hi() {
  !un && !Cs && ((Cs = !0), (eo = Fi.then(Ri)))
}
function Bl(e) {
  const t = Pe.indexOf(e)
  t > Xe && Pe.splice(t, 1)
}
function Ol(e) {
  q(e)
    ? Rt.push(...e)
    : (!st || !st.includes(e, e.allowRecurse ? Ct + 1 : Ct)) && Rt.push(e),
    Hi()
}
function To(e, t = un ? Xe + 1 : 0) {
  for (; t < Pe.length; t++) {
    const n = Pe[t]
    n && n.pre && (Pe.splice(t, 1), t--, n())
  }
}
function Bn(e) {
  if (Rt.length) {
    const t = [...new Set(Rt)]
    if (((Rt.length = 0), st)) {
      st.push(...t)
      return
    }
    for (st = t, st.sort((n, s) => fn(n) - fn(s)), Ct = 0; Ct < st.length; Ct++)
      st[Ct]()
    ;(st = null), (Ct = 0)
  }
}
const fn = e => (e.id == null ? 1 / 0 : e.id),
  Fl = (e, t) => {
    const n = fn(e) - fn(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Ri(e) {
  ;(Cs = !1), (un = !0), Pe.sort(Fl)
  const t = We
  try {
    for (Xe = 0; Xe < Pe.length; Xe++) {
      const n = Pe[Xe]
      n && n.active !== !1 && pt(n, null, 14)
    }
  } finally {
    ;(Xe = 0),
      (Pe.length = 0),
      Bn(),
      (un = !1),
      (eo = null),
      (Pe.length || Rt.length) && Ri()
  }
}
function Hl(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || ge
  let o = n
  const i = t.startsWith('update:'),
    r = i && t.slice(7)
  if (r && r in s) {
    const h = `${r === 'modelValue' ? 'model' : r}Modifiers`,
      { number: _, trim: g } = s[h] || ge
    g && (o = n.map(k => (xe(k) ? k.trim() : k))), _ && (o = n.map(Qr))
  }
  let l,
    a = s[(l = fs(t))] || s[(l = fs(Ze(t)))]
  !a && i && (a = s[(l = fs(Yt(t)))]), a && Re(a, e, 6, o)
  const u = s[l + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), Re(u, e, 6, o)
  }
}
function ji(e, t, n = !1) {
  const s = t.emitsCache,
    o = s.get(e)
  if (o !== void 0) return o
  const i = e.emits
  let r = {},
    l = !1
  if (!Z(e)) {
    const a = u => {
      const h = ji(u, t, !0)
      h && ((l = !0), we(r, h))
    }
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a)
  }
  return !i && !l
    ? (ve(e) && s.set(e, null), null)
    : (q(i) ? i.forEach(a => (r[a] = null)) : we(r, i), ve(e) && s.set(e, r), r)
}
function Jn(e, t) {
  return !e || !vn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      le(e, t[0].toLowerCase() + t.slice(1)) || le(e, Yt(t)) || le(e, t))
}
let Se = null,
  Zn = null
function On(e) {
  const t = Se
  return (Se = e), (Zn = (e && e.type.__scopeId) || null), t
}
function et(e) {
  Zn = e
}
function tt() {
  Zn = null
}
function L(e, t = Se, n) {
  if (!t || e._n) return e
  const s = (...o) => {
    s._d && jo(-1)
    const i = On(t)
    let r
    try {
      r = e(...o)
    } finally {
      On(i), s._d && jo(1)
    }
    return r
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function hs(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: i,
    propsOptions: [r],
    slots: l,
    attrs: a,
    emit: u,
    render: h,
    renderCache: _,
    data: g,
    setupState: k,
    ctx: j,
    inheritAttrs: N
  } = e
  let J, y
  const A = On(e)
  try {
    if (n.shapeFlag & 4) {
      const Y = o || s
      ;(J = Ue(h.call(Y, Y, _, i, k, g, j))), (y = a)
    } else {
      const Y = t
      ;(J = Ue(
        Y.length > 1 ? Y(i, { attrs: a, slots: l, emit: u }) : Y(i, null)
      )),
        (y = t.props ? a : Rl(a))
    }
  } catch (Y) {
    ;(on.length = 0), Xn(Y, e, 1), (J = V(Oe))
  }
  let M = J
  if (y && N !== !1) {
    const Y = Object.keys(y),
      { shapeFlag: te } = M
    Y.length && te & 7 && (r && Y.some(Ds) && (y = jl(y, r)), (M = mt(M, y)))
  }
  return (
    n.dirs && ((M = mt(M)), (M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (M.transition = n.transition),
    (J = M),
    On(A),
    J
  )
}
const Rl = e => {
    let t
    for (const n in e)
      (n === 'class' || n === 'style' || vn(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  jl = (e, t) => {
    const n = {}
    for (const s in e) (!Ds(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function Dl(e, t, n) {
  const { props: s, children: o, component: i } = e,
    { props: r, children: l, patchFlag: a } = t,
    u = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && a >= 0) {
    if (a & 1024) return !0
    if (a & 16) return s ? Lo(s, r, u) : !!r
    if (a & 8) {
      const h = t.dynamicProps
      for (let _ = 0; _ < h.length; _++) {
        const g = h[_]
        if (r[g] !== s[g] && !Jn(u, g)) return !0
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : s === r
      ? !1
      : s
      ? r
        ? Lo(s, r, u)
        : !0
      : !!r
  return !1
}
function Lo(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let o = 0; o < s.length; o++) {
    const i = s[o]
    if (t[i] !== e[i] && !Jn(n, i)) return !0
  }
  return !1
}
function Ul({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const zl = e => e.__isSuspense
function Di(e, t) {
  t && t.pendingBranch
    ? q(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ol(e)
}
function jt(e, t) {
  if (ye) {
    let n = ye.provides
    const s = ye.parent && ye.parent.provides
    s === n && (n = ye.provides = Object.create(s)), (n[e] = t)
  }
}
function qe(e, t, n = !1) {
  const s = ye || Se
  if (s) {
    const o =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
    if (o && e in o) return o[e]
    if (arguments.length > 1) return n && Z(t) ? t.call(s.proxy) : t
  }
}
function Lt(e, t) {
  return es(e, null, t)
}
function Ui(e, t) {
  return es(e, null, { flush: 'post' })
}
const En = {}
function Je(e, t, n) {
  return es(e, t, n)
}
function es(
  e,
  t,
  { immediate: n, deep: s, flush: o, onTrack: i, onTrigger: r } = ge
) {
  const l = xi() === (ye == null ? void 0 : ye.scope) ? ye : null
  let a,
    u = !1,
    h = !1
  if (
    (Ce(e)
      ? ((a = () => e.value), (u = Nn(e)))
      : Ht(e)
      ? ((a = () => e), (s = !0))
      : q(e)
      ? ((h = !0),
        (u = e.some(M => Ht(M) || Nn(M))),
        (a = () =>
          e.map(M => {
            if (Ce(M)) return M.value
            if (Ht(M)) return Bt(M)
            if (Z(M)) return pt(M, l, 2)
          })))
      : Z(e)
      ? t
        ? (a = () => pt(e, l, 2))
        : (a = () => {
            if (!(l && l.isUnmounted)) return _ && _(), Re(e, l, 3, [g])
          })
      : (a = We),
    t && s)
  ) {
    const M = a
    a = () => Bt(M())
  }
  let _,
    g = M => {
      _ = y.onStop = () => {
        pt(M, l, 4)
      }
    },
    k
  if (pn)
    if (
      ((g = We),
      t ? n && Re(t, l, 3, [a(), h ? [] : void 0, g]) : a(),
      o === 'sync')
    ) {
      const M = Ba()
      k = M.__watcherHandles || (M.__watcherHandles = [])
    } else return We
  let j = h ? new Array(e.length).fill(En) : En
  const N = () => {
    if (y.active)
      if (t) {
        const M = y.run()
        ;(s || u || (h ? M.some((Y, te) => an(Y, j[te])) : an(M, j))) &&
          (_ && _(),
          Re(t, l, 3, [M, j === En ? void 0 : h && j[0] === En ? [] : j, g]),
          (j = M))
      } else y.run()
  }
  N.allowRecurse = !!t
  let J
  o === 'sync'
    ? (J = N)
    : o === 'post'
    ? (J = () => Te(N, l && l.suspense))
    : ((N.pre = !0), l && (N.id = l.uid), (J = () => no(N)))
  const y = new qs(a, J)
  t
    ? n
      ? N()
      : (j = y.run())
    : o === 'post'
    ? Te(y.run.bind(y), l && l.suspense)
    : y.run()
  const A = () => {
    y.stop(), l && l.scope && Us(l.scope.effects, y)
  }
  return k && k.push(A), A
}
function Kl(e, t, n) {
  const s = this.proxy,
    o = xe(e) ? (e.includes('.') ? zi(s, e) : () => s[e]) : e.bind(s, s)
  let i
  Z(t) ? (i = t) : ((i = t.handler), (n = t))
  const r = ye
  Gt(this)
  const l = es(o, i.bind(s), n)
  return r ? Gt(r) : Tt(), l
}
function zi(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let o = 0; o < n.length && s; o++) s = s[n[o]]
    return s
  }
}
function Bt(e, t) {
  if (!ve(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), Ce(e))) Bt(e.value, t)
  else if (q(e)) for (let n = 0; n < e.length; n++) Bt(e[n], t)
  else if (vi(e) || Ft(e))
    e.forEach(n => {
      Bt(n, t)
    })
  else if (yi(e)) for (const n in e) Bt(e[n], t)
  return e
}
function Wl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map()
  }
  return (
    Ie(() => {
      e.isMounted = !0
    }),
    Yi(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Fe = [Function, Array],
  ql = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Fe,
      onEnter: Fe,
      onAfterEnter: Fe,
      onEnterCancelled: Fe,
      onBeforeLeave: Fe,
      onLeave: Fe,
      onAfterLeave: Fe,
      onLeaveCancelled: Fe,
      onBeforeAppear: Fe,
      onAppear: Fe,
      onAfterAppear: Fe,
      onAppearCancelled: Fe
    },
    setup(e, { slots: t }) {
      const n = os(),
        s = Wl()
      let o
      return () => {
        const i = t.default && qi(t.default(), !0)
        if (!i || !i.length) return
        let r = i[0]
        if (i.length > 1) {
          for (const N of i)
            if (N.type !== Oe) {
              r = N
              break
            }
        }
        const l = ce(e),
          { mode: a } = l
        if (s.isLeaving) return ps(r)
        const u = Io(r)
        if (!u) return ps(r)
        const h = Ss(u, l, s, n)
        Es(u, h)
        const _ = n.subTree,
          g = _ && Io(_)
        let k = !1
        const { getTransitionKey: j } = u.type
        if (j) {
          const N = j()
          o === void 0 ? (o = N) : N !== o && ((o = N), (k = !0))
        }
        if (g && g.type !== Oe && (!St(u, g) || k)) {
          const N = Ss(g, l, s, n)
          if ((Es(g, N), a === 'out-in'))
            return (
              (s.isLeaving = !0),
              (N.afterLeave = () => {
                ;(s.isLeaving = !1), n.update.active !== !1 && n.update()
              }),
              ps(r)
            )
          a === 'in-out' &&
            u.type !== Oe &&
            (N.delayLeave = (J, y, A) => {
              const M = Wi(s, g)
              ;(M[String(g.key)] = g),
                (J._leaveCb = () => {
                  y(), (J._leaveCb = void 0), delete h.delayedLeave
                }),
                (h.delayedLeave = A)
            })
        }
        return r
      }
    }
  },
  Ki = ql
function Wi(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function Ss(e, t, n, s) {
  const {
      appear: o,
      mode: i,
      persisted: r = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: h,
      onBeforeLeave: _,
      onLeave: g,
      onAfterLeave: k,
      onLeaveCancelled: j,
      onBeforeAppear: N,
      onAppear: J,
      onAfterAppear: y,
      onAppearCancelled: A
    } = t,
    M = String(e.key),
    Y = Wi(n, e),
    te = (I, ee) => {
      I && Re(I, s, 9, ee)
    },
    he = (I, ee) => {
      const X = ee[1]
      te(I, ee),
        q(I) ? I.every(ae => ae.length <= 1) && X() : I.length <= 1 && X()
    },
    re = {
      mode: i,
      persisted: r,
      beforeEnter(I) {
        let ee = l
        if (!n.isMounted)
          if (o) ee = N || l
          else return
        I._leaveCb && I._leaveCb(!0)
        const X = Y[M]
        X && St(e, X) && X.el._leaveCb && X.el._leaveCb(), te(ee, [I])
      },
      enter(I) {
        let ee = a,
          X = u,
          ae = h
        if (!n.isMounted)
          if (o) (ee = J || a), (X = y || u), (ae = A || h)
          else return
        let F = !1
        const ne = (I._enterCb = D => {
          F ||
            ((F = !0),
            D ? te(ae, [I]) : te(X, [I]),
            re.delayedLeave && re.delayedLeave(),
            (I._enterCb = void 0))
        })
        ee ? he(ee, [I, ne]) : ne()
      },
      leave(I, ee) {
        const X = String(e.key)
        if ((I._enterCb && I._enterCb(!0), n.isUnmounting)) return ee()
        te(_, [I])
        let ae = !1
        const F = (I._leaveCb = ne => {
          ae ||
            ((ae = !0),
            ee(),
            ne ? te(j, [I]) : te(k, [I]),
            (I._leaveCb = void 0),
            Y[X] === e && delete Y[X])
        })
        ;(Y[X] = e), g ? he(g, [I, F]) : F()
      },
      clone(I) {
        return Ss(I, t, n, s)
      }
    }
  return re
}
function ps(e) {
  if (ts(e)) return (e = mt(e)), (e.children = null), e
}
function Io(e) {
  return ts(e) ? (e.children ? e.children[0] : void 0) : e
}
function Es(e, t) {
  e.shapeFlag & 6 && e.component
    ? Es(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function qi(e, t = !1, n) {
  let s = [],
    o = 0
  for (let i = 0; i < e.length; i++) {
    let r = e[i]
    const l = n == null ? r.key : String(n) + String(r.key != null ? r.key : i)
    r.type === Q
      ? (r.patchFlag & 128 && o++, (s = s.concat(qi(r.children, t, l))))
      : (t || r.type !== Oe) && s.push(l != null ? mt(r, { key: l }) : r)
  }
  if (o > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2
  return s
}
function O(e) {
  return Z(e) ? { setup: e, name: e.name } : e
}
const Dt = e => !!e.type.__asyncLoader,
  ts = e => e.type.__isKeepAlive
function Gl(e, t) {
  Gi(e, 'a', t)
}
function Yl(e, t) {
  Gi(e, 'da', t)
}
function Gi(e, t, n = ye) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n
      for (; o; ) {
        if (o.isDeactivated) return
        o = o.parent
      }
      return e()
    })
  if ((ns(t, s, n), n)) {
    let o = n.parent
    for (; o && o.parent; ) ts(o.parent.vnode) && Ql(s, t, n, o), (o = o.parent)
  }
}
function Ql(e, t, n, s) {
  const o = ns(t, e, s, !0)
  vt(() => {
    Us(s[t], o)
  }, n)
}
function ns(e, t, n = ye, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...r) => {
          if (n.isUnmounted) return
          Qt(), Gt(n)
          const l = Re(t, n, e, r)
          return Tt(), Xt(), l
        })
    return s ? o.unshift(i) : o.push(i), i
  }
}
const it =
    e =>
    (t, n = ye) =>
      (!pn || e === 'sp') && ns(e, (...s) => t(...s), n),
  Xl = it('bm'),
  Ie = it('m'),
  Jl = it('bu'),
  so = it('u'),
  Yi = it('bum'),
  vt = it('um'),
  Zl = it('sp'),
  ea = it('rtg'),
  ta = it('rtc')
function na(e, t = ye) {
  ns('ec', e, t)
}
function Qe(e, t, n, s) {
  const o = e.dirs,
    i = t && t.dirs
  for (let r = 0; r < o.length; r++) {
    const l = o[r]
    i && (l.oldValue = i[r].value)
    let a = l.dir[s]
    a && (Qt(), Re(a, n, 8, [e.el, l, e, t]), Xt())
  }
}
const oo = 'components'
function je(e, t) {
  return Xi(oo, e, !0, t) || e
}
const Qi = Symbol()
function dn(e) {
  return xe(e) ? Xi(oo, e, !1) || e : e || Qi
}
function Xi(e, t, n = !0, s = !1) {
  const o = Se || ye
  if (o) {
    const i = o.type
    if (e === oo) {
      const l = Ta(i, !1)
      if (l && (l === t || l === Ze(t) || l === Gn(Ze(t)))) return i
    }
    const r = Mo(o[e] || i[e], t) || Mo(o.appContext[e], t)
    return !r && s ? i : r
  }
}
function Mo(e, t) {
  return e && (e[t] || e[Ze(t)] || e[Gn(Ze(t))])
}
function Ae(e, t, n, s) {
  let o
  const i = n && n[s]
  if (q(e) || xe(e)) {
    o = new Array(e.length)
    for (let r = 0, l = e.length; r < l; r++)
      o[r] = t(e[r], r, void 0, i && i[r])
  } else if (typeof e == 'number') {
    o = new Array(e)
    for (let r = 0; r < e; r++) o[r] = t(r + 1, r, void 0, i && i[r])
  } else if (ve(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (r, l) => t(r, l, void 0, i && i[l]))
    else {
      const r = Object.keys(e)
      o = new Array(r.length)
      for (let l = 0, a = r.length; l < a; l++) {
        const u = r[l]
        o[l] = t(e[u], u, l, i && i[l])
      }
    }
  else o = []
  return n && (n[s] = o), o
}
function S(e, t, n = {}, s, o) {
  if (Se.isCE || (Se.parent && Dt(Se.parent) && Se.parent.isCE))
    return t !== 'default' && (n.name = t), V('slot', n, s && s())
  let i = e[t]
  i && i._c && (i._d = !1), d()
  const r = i && Ji(i(n)),
    l = W(
      Q,
      { key: n.key || (r && r.key) || `_${t}` },
      r || (s ? s() : []),
      r && e._ === 1 ? 64 : -2
    )
  return (
    !o && l.scopeId && (l.slotScopeIds = [l.scopeId + '-s']),
    i && i._c && (i._d = !0),
    l
  )
}
function Ji(e) {
  return e.some(t =>
    Rn(t) ? !(t.type === Oe || (t.type === Q && !Ji(t.children))) : !0
  )
    ? e
    : null
}
const As = e => (e ? (cr(e) ? ao(e) || e.proxy : As(e.parent)) : null),
  sn = we(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => As(e.parent),
    $root: e => As(e.root),
    $emit: e => e.emit,
    $options: e => io(e),
    $forceUpdate: e => e.f || (e.f = () => no(e.update)),
    $nextTick: e => e.n || (e.n = to.bind(e.proxy)),
    $watch: e => Kl.bind(e)
  }),
  _s = (e, t) => e !== ge && !e.__isScriptSetup && le(e, t),
  sa = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: o,
        props: i,
        accessCache: r,
        type: l,
        appContext: a
      } = e
      let u
      if (t[0] !== '$') {
        const k = r[t]
        if (k !== void 0)
          switch (k) {
            case 1:
              return s[t]
            case 2:
              return o[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (_s(s, t)) return (r[t] = 1), s[t]
          if (o !== ge && le(o, t)) return (r[t] = 2), o[t]
          if ((u = e.propsOptions[0]) && le(u, t)) return (r[t] = 3), i[t]
          if (n !== ge && le(n, t)) return (r[t] = 4), n[t]
          Vs && (r[t] = 0)
        }
      }
      const h = sn[t]
      let _, g
      if (h) return t === '$attrs' && Le(e, 'get', t), h(e)
      if ((_ = l.__cssModules) && (_ = _[t])) return _
      if (n !== ge && le(n, t)) return (r[t] = 4), n[t]
      if (((g = a.config.globalProperties), le(g, t))) return g[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: o, ctx: i } = e
      return _s(o, t)
        ? ((o[t] = n), !0)
        : s !== ge && le(s, t)
        ? ((s[t] = n), !0)
        : le(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: o,
          propsOptions: i
        }
      },
      r
    ) {
      let l
      return (
        !!n[r] ||
        (e !== ge && le(e, r)) ||
        _s(t, r) ||
        ((l = i[0]) && le(l, r)) ||
        le(s, r) ||
        le(sn, r) ||
        le(o.config.globalProperties, r)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : le(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
let Vs = !0
function oa(e) {
  const t = io(e),
    n = e.proxy,
    s = e.ctx
  ;(Vs = !1), t.beforeCreate && No(t.beforeCreate, e, 'bc')
  const {
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: a,
    inject: u,
    created: h,
    beforeMount: _,
    mounted: g,
    beforeUpdate: k,
    updated: j,
    activated: N,
    deactivated: J,
    beforeDestroy: y,
    beforeUnmount: A,
    destroyed: M,
    unmounted: Y,
    render: te,
    renderTracked: he,
    renderTriggered: re,
    errorCaptured: I,
    serverPrefetch: ee,
    expose: X,
    inheritAttrs: ae,
    components: F,
    directives: ne,
    filters: D
  } = t
  if ((u && ia(u, s, null, e.appContext.config.unwrapInjectedRef), r))
    for (const be in r) {
      const pe = r[be]
      Z(pe) && (s[be] = pe.bind(n))
    }
  if (o) {
    const be = o.call(n, n)
    ve(be) && (e.data = Qn(be))
  }
  if (((Vs = !0), i))
    for (const be in i) {
      const pe = i[be],
        yt = Z(pe) ? pe.bind(n, n) : Z(pe.get) ? pe.get.bind(n, n) : We,
        xn = !Z(pe) && Z(pe.set) ? pe.set.bind(n) : We,
        xt = K({ get: yt, set: xn })
      Object.defineProperty(s, be, {
        enumerable: !0,
        configurable: !0,
        get: () => xt.value,
        set: Ge => (xt.value = Ge)
      })
    }
  if (l) for (const be in l) Zi(l[be], s, n, be)
  if (a) {
    const be = Z(a) ? a.call(n) : a
    Reflect.ownKeys(be).forEach(pe => {
      jt(pe, be[pe])
    })
  }
  h && No(h, e, 'c')
  function fe(be, pe) {
    q(pe) ? pe.forEach(yt => be(yt.bind(n))) : pe && be(pe.bind(n))
  }
  if (
    (fe(Xl, _),
    fe(Ie, g),
    fe(Jl, k),
    fe(so, j),
    fe(Gl, N),
    fe(Yl, J),
    fe(na, I),
    fe(ta, he),
    fe(ea, re),
    fe(Yi, A),
    fe(vt, Y),
    fe(Zl, ee),
    q(X))
  )
    if (X.length) {
      const be = e.exposed || (e.exposed = {})
      X.forEach(pe => {
        Object.defineProperty(be, pe, {
          get: () => n[pe],
          set: yt => (n[pe] = yt)
        })
      })
    } else e.exposed || (e.exposed = {})
  te && e.render === We && (e.render = te),
    ae != null && (e.inheritAttrs = ae),
    F && (e.components = F),
    ne && (e.directives = ne)
}
function ia(e, t, n = We, s = !1) {
  q(e) && (e = Ts(e))
  for (const o in e) {
    const i = e[o]
    let r
    ve(i)
      ? 'default' in i
        ? (r = qe(i.from || o, i.default, !0))
        : (r = qe(i.from || o))
      : (r = qe(i)),
      Ce(r) && s
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: l => (r.value = l)
          })
        : (t[o] = r)
  }
}
function No(e, t, n) {
  Re(q(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Zi(e, t, n, s) {
  const o = s.includes('.') ? zi(n, s) : () => n[s]
  if (xe(e)) {
    const i = t[e]
    Z(i) && Je(o, i)
  } else if (Z(e)) Je(o, e.bind(n))
  else if (ve(e))
    if (q(e)) e.forEach(i => Zi(i, t, n, s))
    else {
      const i = Z(e.handler) ? e.handler.bind(n) : t[e.handler]
      Z(i) && Je(o, i, e)
    }
}
function io(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: r }
    } = e.appContext,
    l = i.get(t)
  let a
  return (
    l
      ? (a = l)
      : !o.length && !n && !s
      ? (a = t)
      : ((a = {}), o.length && o.forEach(u => Fn(a, u, r, !0)), Fn(a, t, r)),
    ve(t) && i.set(t, a),
    a
  )
}
function Fn(e, t, n, s = !1) {
  const { mixins: o, extends: i } = t
  i && Fn(e, i, n, !0), o && o.forEach(r => Fn(e, r, n, !0))
  for (const r in t)
    if (!(s && r === 'expose')) {
      const l = ra[r] || (n && n[r])
      e[r] = l ? l(e[r], t[r]) : t[r]
    }
  return e
}
const ra = {
  data: Bo,
  props: Pt,
  emits: Pt,
  methods: Pt,
  computed: Pt,
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  components: Pt,
  directives: Pt,
  watch: aa,
  provide: Bo,
  inject: la
}
function Bo(e, t) {
  return t
    ? e
      ? function () {
          return we(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function la(e, t) {
  return Pt(Ts(e), Ts(t))
}
function Ts(e) {
  if (q(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Pt(e, t) {
  return e ? we(we(Object.create(null), e), t) : t
}
function aa(e, t) {
  if (!e) return t
  if (!t) return e
  const n = we(Object.create(null), e)
  for (const s in t) n[s] = Ve(e[s], t[s])
  return n
}
function ca(e, t, n, s = !1) {
  const o = {},
    i = {}
  Mn(i, ss, 1), (e.propsDefaults = Object.create(null)), er(e, t, o, i)
  for (const r in e.propsOptions[0]) r in o || (o[r] = void 0)
  n ? (e.props = s ? o : El(o)) : e.type.props ? (e.props = o) : (e.props = i),
    (e.attrs = i)
}
function ua(e, t, n, s) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: r }
    } = e,
    l = ce(o),
    [a] = e.propsOptions
  let u = !1
  if ((s || r > 0) && !(r & 16)) {
    if (r & 8) {
      const h = e.vnode.dynamicProps
      for (let _ = 0; _ < h.length; _++) {
        let g = h[_]
        if (Jn(e.emitsOptions, g)) continue
        const k = t[g]
        if (a)
          if (le(i, g)) k !== i[g] && ((i[g] = k), (u = !0))
          else {
            const j = Ze(g)
            o[j] = Ls(a, l, j, k, e, !1)
          }
        else k !== i[g] && ((i[g] = k), (u = !0))
      }
    }
  } else {
    er(e, t, o, i) && (u = !0)
    let h
    for (const _ in l)
      (!t || (!le(t, _) && ((h = Yt(_)) === _ || !le(t, h)))) &&
        (a
          ? n &&
            (n[_] !== void 0 || n[h] !== void 0) &&
            (o[_] = Ls(a, l, _, void 0, e, !0))
          : delete o[_])
    if (i !== l) for (const _ in i) (!t || !le(t, _)) && (delete i[_], (u = !0))
  }
  u && ot(e, 'set', '$attrs')
}
function er(e, t, n, s) {
  const [o, i] = e.propsOptions
  let r = !1,
    l
  if (t)
    for (let a in t) {
      if (tn(a)) continue
      const u = t[a]
      let h
      o && le(o, (h = Ze(a)))
        ? !i || !i.includes(h)
          ? (n[h] = u)
          : ((l || (l = {}))[h] = u)
        : Jn(e.emitsOptions, a) ||
          ((!(a in s) || u !== s[a]) && ((s[a] = u), (r = !0)))
    }
  if (i) {
    const a = ce(n),
      u = l || ge
    for (let h = 0; h < i.length; h++) {
      const _ = i[h]
      n[_] = Ls(o, a, _, u[_], e, !le(u, _))
    }
  }
  return r
}
function Ls(e, t, n, s, o, i) {
  const r = e[n]
  if (r != null) {
    const l = le(r, 'default')
    if (l && s === void 0) {
      const a = r.default
      if (r.type !== Function && Z(a)) {
        const { propsDefaults: u } = o
        n in u ? (s = u[n]) : (Gt(o), (s = u[n] = a.call(null, t)), Tt())
      } else s = a
    }
    r[0] && (i && !l ? (s = !1) : r[1] && (s === '' || s === Yt(n)) && (s = !0))
  }
  return s
}
function tr(e, t, n = !1) {
  const s = t.propsCache,
    o = s.get(e)
  if (o) return o
  const i = e.props,
    r = {},
    l = []
  let a = !1
  if (!Z(e)) {
    const h = _ => {
      a = !0
      const [g, k] = tr(_, t, !0)
      we(r, g), k && l.push(...k)
    }
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h)
  }
  if (!i && !a) return ve(e) && s.set(e, Ot), Ot
  if (q(i))
    for (let h = 0; h < i.length; h++) {
      const _ = Ze(i[h])
      Oo(_) && (r[_] = ge)
    }
  else if (i)
    for (const h in i) {
      const _ = Ze(h)
      if (Oo(_)) {
        const g = i[h],
          k = (r[_] = q(g) || Z(g) ? { type: g } : Object.assign({}, g))
        if (k) {
          const j = Ro(Boolean, k.type),
            N = Ro(String, k.type)
          ;(k[0] = j > -1),
            (k[1] = N < 0 || j < N),
            (j > -1 || le(k, 'default')) && l.push(_)
        }
      }
    }
  const u = [r, l]
  return ve(e) && s.set(e, u), u
}
function Oo(e) {
  return e[0] !== '$'
}
function Fo(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function Ho(e, t) {
  return Fo(e) === Fo(t)
}
function Ro(e, t) {
  return q(t) ? t.findIndex(n => Ho(n, e)) : Z(t) && Ho(t, e) ? 0 : -1
}
const nr = e => e[0] === '_' || e === '$stable',
  ro = e => (q(e) ? e.map(Ue) : [Ue(e)]),
  fa = (e, t, n) => {
    if (t._n) return t
    const s = L((...o) => ro(t(...o)), n)
    return (s._c = !1), s
  },
  sr = (e, t, n) => {
    const s = e._ctx
    for (const o in e) {
      if (nr(o)) continue
      const i = e[o]
      if (Z(i)) t[o] = fa(o, i, s)
      else if (i != null) {
        const r = ro(i)
        t[o] = () => r
      }
    }
  },
  or = (e, t) => {
    const n = ro(t)
    e.slots.default = () => n
  },
  da = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = ce(t)), Mn(t, '_', n)) : sr(t, (e.slots = {}))
    } else (e.slots = {}), t && or(e, t)
    Mn(e.slots, ss, 1)
  },
  ha = (e, t, n) => {
    const { vnode: s, slots: o } = e
    let i = !0,
      r = ge
    if (s.shapeFlag & 32) {
      const l = t._
      l
        ? n && l === 1
          ? (i = !1)
          : (we(o, t), !n && l === 1 && delete o._)
        : ((i = !t.$stable), sr(t, o)),
        (r = t)
    } else t && (or(e, t), (r = { default: 1 }))
    if (i) for (const l in o) !nr(l) && !(l in r) && delete o[l]
  }
function ir() {
  return {
    app: null,
    config: {
      isNativeTag: zr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let pa = 0
function _a(e, t) {
  return function (s, o = null) {
    Z(s) || (s = Object.assign({}, s)), o != null && !ve(o) && (o = null)
    const i = ir(),
      r = new Set()
    let l = !1
    const a = (i.app = {
      _uid: pa++,
      _component: s,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Oa,
      get config() {
        return i.config
      },
      set config(u) {},
      use(u, ...h) {
        return (
          r.has(u) ||
            (u && Z(u.install)
              ? (r.add(u), u.install(a, ...h))
              : Z(u) && (r.add(u), u(a, ...h))),
          a
        )
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), a
      },
      component(u, h) {
        return h ? ((i.components[u] = h), a) : i.components[u]
      },
      directive(u, h) {
        return h ? ((i.directives[u] = h), a) : i.directives[u]
      },
      mount(u, h, _) {
        if (!l) {
          const g = V(s, o)
          return (
            (g.appContext = i),
            h && t ? t(g, u) : e(g, u, _),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            ao(g.component) || g.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__)
      },
      provide(u, h) {
        return (i.provides[u] = h), a
      }
    })
    return a
  }
}
function Hn(e, t, n, s, o = !1) {
  if (q(e)) {
    e.forEach((g, k) => Hn(g, t && (q(t) ? t[k] : t), n, s, o))
    return
  }
  if (Dt(s) && !o) return
  const i = s.shapeFlag & 4 ? ao(s.component) || s.component.proxy : s.el,
    r = o ? null : i,
    { i: l, r: a } = e,
    u = t && t.r,
    h = l.refs === ge ? (l.refs = {}) : l.refs,
    _ = l.setupState
  if (
    (u != null &&
      u !== a &&
      (xe(u)
        ? ((h[u] = null), le(_, u) && (_[u] = null))
        : Ce(u) && (u.value = null)),
    Z(a))
  )
    pt(a, l, 12, [r, h])
  else {
    const g = xe(a),
      k = Ce(a)
    if (g || k) {
      const j = () => {
        if (e.f) {
          const N = g ? (le(_, a) ? _[a] : h[a]) : a.value
          o
            ? q(N) && Us(N, i)
            : q(N)
            ? N.includes(i) || N.push(i)
            : g
            ? ((h[a] = [i]), le(_, a) && (_[a] = h[a]))
            : ((a.value = [i]), e.k && (h[e.k] = a.value))
        } else
          g
            ? ((h[a] = r), le(_, a) && (_[a] = r))
            : k && ((a.value = r), e.k && (h[e.k] = r))
      }
      r ? ((j.id = -1), Te(j, n)) : j()
    }
  }
}
let at = !1
const An = e => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
  Vn = e => e.nodeType === 8
function ma(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: o,
        nextSibling: i,
        parentNode: r,
        remove: l,
        insert: a,
        createComment: u
      }
    } = e,
    h = (y, A) => {
      if (!A.hasChildNodes()) {
        n(null, y, A), Bn(), (A._vnode = y)
        return
      }
      ;(at = !1),
        _(A.firstChild, y, null, null, null),
        Bn(),
        (A._vnode = y),
        at && console.error('Hydration completed but contains mismatches.')
    },
    _ = (y, A, M, Y, te, he = !1) => {
      const re = Vn(y) && y.data === '[',
        I = () => N(y, A, M, Y, te, re),
        { type: ee, ref: X, shapeFlag: ae, patchFlag: F } = A
      let ne = y.nodeType
      ;(A.el = y), F === -2 && ((he = !1), (A.dynamicChildren = null))
      let D = null
      switch (ee) {
        case qt:
          ne !== 3
            ? A.children === ''
              ? (a((A.el = o('')), r(y), y), (D = y))
              : (D = I())
            : (y.data !== A.children && ((at = !0), (y.data = A.children)),
              (D = i(y)))
          break
        case Oe:
          ne !== 8 || re ? (D = I()) : (D = i(y))
          break
        case Ut:
          if ((re && ((y = i(y)), (ne = y.nodeType)), ne === 1 || ne === 3)) {
            D = y
            const Me = !A.children.length
            for (let fe = 0; fe < A.staticCount; fe++)
              Me && (A.children += D.nodeType === 1 ? D.outerHTML : D.data),
                fe === A.staticCount - 1 && (A.anchor = D),
                (D = i(D))
            return re ? i(D) : D
          } else I()
          break
        case Q:
          re ? (D = j(y, A, M, Y, te, he)) : (D = I())
          break
        default:
          if (ae & 1)
            ne !== 1 || A.type.toLowerCase() !== y.tagName.toLowerCase()
              ? (D = I())
              : (D = g(y, A, M, Y, te, he))
          else if (ae & 6) {
            A.slotScopeIds = te
            const Me = r(y)
            if (
              (t(A, Me, null, M, Y, An(Me), he),
              (D = re ? J(y) : i(y)),
              D && Vn(D) && D.data === 'teleport end' && (D = i(D)),
              Dt(A))
            ) {
              let fe
              re
                ? ((fe = V(Q)),
                  (fe.anchor = D ? D.previousSibling : Me.lastChild))
                : (fe = y.nodeType === 3 ? Ee('') : V('div')),
                (fe.el = y),
                (A.component.subTree = fe)
            }
          } else
            ae & 64
              ? ne !== 8
                ? (D = I())
                : (D = A.type.hydrate(y, A, M, Y, te, he, e, k))
              : ae & 128 &&
                (D = A.type.hydrate(y, A, M, Y, An(r(y)), te, he, e, _))
      }
      return X != null && Hn(X, null, Y, A), D
    },
    g = (y, A, M, Y, te, he) => {
      he = he || !!A.dynamicChildren
      const { type: re, props: I, patchFlag: ee, shapeFlag: X, dirs: ae } = A,
        F = (re === 'input' && ae) || re === 'option'
      if (F || ee !== -1) {
        if ((ae && Qe(A, null, M, 'created'), I))
          if (F || !he || ee & 48)
            for (const D in I)
              ((F && D.endsWith('value')) || (vn(D) && !tn(D))) &&
                s(y, D, null, I[D], !1, void 0, M)
          else I.onClick && s(y, 'onClick', null, I.onClick, !1, void 0, M)
        let ne
        if (
          ((ne = I && I.onVnodeBeforeMount) && He(ne, M, A),
          ae && Qe(A, null, M, 'beforeMount'),
          ((ne = I && I.onVnodeMounted) || ae) &&
            Di(() => {
              ne && He(ne, M, A), ae && Qe(A, null, M, 'mounted')
            }, Y),
          X & 16 && !(I && (I.innerHTML || I.textContent)))
        ) {
          let D = k(y.firstChild, A, y, M, Y, te, he)
          for (; D; ) {
            at = !0
            const Me = D
            ;(D = D.nextSibling), l(Me)
          }
        } else
          X & 8 &&
            y.textContent !== A.children &&
            ((at = !0), (y.textContent = A.children))
      }
      return y.nextSibling
    },
    k = (y, A, M, Y, te, he, re) => {
      re = re || !!A.dynamicChildren
      const I = A.children,
        ee = I.length
      for (let X = 0; X < ee; X++) {
        const ae = re ? I[X] : (I[X] = Ue(I[X]))
        if (y) y = _(y, ae, Y, te, he, re)
        else {
          if (ae.type === qt && !ae.children) continue
          ;(at = !0), n(null, ae, M, null, Y, te, An(M), he)
        }
      }
      return y
    },
    j = (y, A, M, Y, te, he) => {
      const { slotScopeIds: re } = A
      re && (te = te ? te.concat(re) : re)
      const I = r(y),
        ee = k(i(y), A, I, M, Y, te, he)
      return ee && Vn(ee) && ee.data === ']'
        ? i((A.anchor = ee))
        : ((at = !0), a((A.anchor = u(']')), I, ee), ee)
    },
    N = (y, A, M, Y, te, he) => {
      if (((at = !0), (A.el = null), he)) {
        const ee = J(y)
        for (;;) {
          const X = i(y)
          if (X && X !== ee) l(X)
          else break
        }
      }
      const re = i(y),
        I = r(y)
      return l(y), n(null, A, I, re, M, Y, An(I), te), re
    },
    J = y => {
      let A = 0
      for (; y; )
        if (
          ((y = i(y)), y && Vn(y) && (y.data === '[' && A++, y.data === ']'))
        ) {
          if (A === 0) return i(y)
          A--
        }
      return y
    }
  return [h, _]
}
const Te = Di
function va(e) {
  return ga(e, ma)
}
function ga(e, t) {
  const n = Jr()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: o,
      patchProp: i,
      createElement: r,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: h,
      parentNode: _,
      nextSibling: g,
      setScopeId: k = We,
      insertStaticContent: j
    } = e,
    N = (
      c,
      f,
      m,
      $ = null,
      x = null,
      C = null,
      T = !1,
      P = null,
      E = !!f.dynamicChildren
    ) => {
      if (c === f) return
      c && !St(c, f) && (($ = $n(c)), Ge(c, x, C, !0), (c = null)),
        f.patchFlag === -2 && ((E = !1), (f.dynamicChildren = null))
      const { type: w, ref: U, shapeFlag: H } = f
      switch (w) {
        case qt:
          J(c, f, m, $)
          break
        case Oe:
          y(c, f, m, $)
          break
        case Ut:
          c == null && A(f, m, $, T)
          break
        case Q:
          F(c, f, m, $, x, C, T, P, E)
          break
        default:
          H & 1
            ? te(c, f, m, $, x, C, T, P, E)
            : H & 6
            ? ne(c, f, m, $, x, C, T, P, E)
            : (H & 64 || H & 128) && w.process(c, f, m, $, x, C, T, P, E, Mt)
      }
      U != null && x && Hn(U, c && c.ref, C, f || c, !f)
    },
    J = (c, f, m, $) => {
      if (c == null) s((f.el = l(f.children)), m, $)
      else {
        const x = (f.el = c.el)
        f.children !== c.children && u(x, f.children)
      }
    },
    y = (c, f, m, $) => {
      c == null ? s((f.el = a(f.children || '')), m, $) : (f.el = c.el)
    },
    A = (c, f, m, $) => {
      ;[c.el, c.anchor] = j(c.children, f, m, $, c.el, c.anchor)
    },
    M = ({ el: c, anchor: f }, m, $) => {
      let x
      for (; c && c !== f; ) (x = g(c)), s(c, m, $), (c = x)
      s(f, m, $)
    },
    Y = ({ el: c, anchor: f }) => {
      let m
      for (; c && c !== f; ) (m = g(c)), o(c), (c = m)
      o(f)
    },
    te = (c, f, m, $, x, C, T, P, E) => {
      ;(T = T || f.type === 'svg'),
        c == null ? he(f, m, $, x, C, T, P, E) : ee(c, f, x, C, T, P, E)
    },
    he = (c, f, m, $, x, C, T, P) => {
      let E, w
      const { type: U, props: H, shapeFlag: z, transition: G, dirs: se } = c
      if (
        ((E = c.el = r(c.type, C, H && H.is, H)),
        z & 8
          ? h(E, c.children)
          : z & 16 &&
            I(c.children, E, null, $, x, C && U !== 'foreignObject', T, P),
        se && Qe(c, null, $, 'created'),
        re(E, c, c.scopeId, T, $),
        H)
      ) {
        for (const de in H)
          de !== 'value' &&
            !tn(de) &&
            i(E, de, null, H[de], C, c.children, $, x, nt)
        'value' in H && i(E, 'value', null, H.value),
          (w = H.onVnodeBeforeMount) && He(w, $, c)
      }
      se && Qe(c, null, $, 'beforeMount')
      const _e = (!x || (x && !x.pendingBranch)) && G && !G.persisted
      _e && G.beforeEnter(E),
        s(E, f, m),
        ((w = H && H.onVnodeMounted) || _e || se) &&
          Te(() => {
            w && He(w, $, c), _e && G.enter(E), se && Qe(c, null, $, 'mounted')
          }, x)
    },
    re = (c, f, m, $, x) => {
      if ((m && k(c, m), $)) for (let C = 0; C < $.length; C++) k(c, $[C])
      if (x) {
        let C = x.subTree
        if (f === C) {
          const T = x.vnode
          re(c, T, T.scopeId, T.slotScopeIds, x.parent)
        }
      }
    },
    I = (c, f, m, $, x, C, T, P, E = 0) => {
      for (let w = E; w < c.length; w++) {
        const U = (c[w] = P ? ft(c[w]) : Ue(c[w]))
        N(null, U, f, m, $, x, C, T, P)
      }
    },
    ee = (c, f, m, $, x, C, T) => {
      const P = (f.el = c.el)
      let { patchFlag: E, dynamicChildren: w, dirs: U } = f
      E |= c.patchFlag & 16
      const H = c.props || ge,
        z = f.props || ge
      let G
      m && $t(m, !1),
        (G = z.onVnodeBeforeUpdate) && He(G, m, f, c),
        U && Qe(f, c, m, 'beforeUpdate'),
        m && $t(m, !0)
      const se = x && f.type !== 'foreignObject'
      if (
        (w
          ? X(c.dynamicChildren, w, P, m, $, se, C)
          : T || pe(c, f, P, null, m, $, se, C, !1),
        E > 0)
      ) {
        if (E & 16) ae(P, f, H, z, m, $, x)
        else if (
          (E & 2 && H.class !== z.class && i(P, 'class', null, z.class, x),
          E & 4 && i(P, 'style', H.style, z.style, x),
          E & 8)
        ) {
          const _e = f.dynamicProps
          for (let de = 0; de < _e.length; de++) {
            const $e = _e[de],
              De = H[$e],
              Nt = z[$e]
            ;(Nt !== De || $e === 'value') &&
              i(P, $e, De, Nt, x, c.children, m, $, nt)
          }
        }
        E & 1 && c.children !== f.children && h(P, f.children)
      } else !T && w == null && ae(P, f, H, z, m, $, x)
      ;((G = z.onVnodeUpdated) || U) &&
        Te(() => {
          G && He(G, m, f, c), U && Qe(f, c, m, 'updated')
        }, $)
    },
    X = (c, f, m, $, x, C, T) => {
      for (let P = 0; P < f.length; P++) {
        const E = c[P],
          w = f[P],
          U =
            E.el && (E.type === Q || !St(E, w) || E.shapeFlag & 70)
              ? _(E.el)
              : m
        N(E, w, U, null, $, x, C, T, !0)
      }
    },
    ae = (c, f, m, $, x, C, T) => {
      if (m !== $) {
        if (m !== ge)
          for (const P in m)
            !tn(P) && !(P in $) && i(c, P, m[P], null, T, f.children, x, C, nt)
        for (const P in $) {
          if (tn(P)) continue
          const E = $[P],
            w = m[P]
          E !== w && P !== 'value' && i(c, P, w, E, T, f.children, x, C, nt)
        }
        'value' in $ && i(c, 'value', m.value, $.value)
      }
    },
    F = (c, f, m, $, x, C, T, P, E) => {
      const w = (f.el = c ? c.el : l('')),
        U = (f.anchor = c ? c.anchor : l(''))
      let { patchFlag: H, dynamicChildren: z, slotScopeIds: G } = f
      G && (P = P ? P.concat(G) : G),
        c == null
          ? (s(w, m, $), s(U, m, $), I(f.children, m, U, x, C, T, P, E))
          : H > 0 && H & 64 && z && c.dynamicChildren
          ? (X(c.dynamicChildren, z, m, x, C, T, P),
            (f.key != null || (x && f === x.subTree)) && rr(c, f, !0))
          : pe(c, f, m, U, x, C, T, P, E)
    },
    ne = (c, f, m, $, x, C, T, P, E) => {
      ;(f.slotScopeIds = P),
        c == null
          ? f.shapeFlag & 512
            ? x.ctx.activate(f, m, $, T, E)
            : D(f, m, $, x, C, T, E)
          : Me(c, f, E)
    },
    D = (c, f, m, $, x, C, T) => {
      const P = (c.component = Sa(c, $, x))
      if ((ts(c) && (P.ctx.renderer = Mt), Ea(P), P.asyncDep)) {
        if ((x && x.registerDep(P, fe), !c.el)) {
          const E = (P.subTree = V(Oe))
          y(null, E, f, m)
        }
        return
      }
      fe(P, c, f, m, x, C, T)
    },
    Me = (c, f, m) => {
      const $ = (f.component = c.component)
      if (Dl(c, f, m))
        if ($.asyncDep && !$.asyncResolved) {
          be($, f, m)
          return
        } else ($.next = f), Bl($.update), $.update()
      else (f.el = c.el), ($.vnode = f)
    },
    fe = (c, f, m, $, x, C, T) => {
      const P = () => {
          if (c.isMounted) {
            let { next: U, bu: H, u: z, parent: G, vnode: se } = c,
              _e = U,
              de
            $t(c, !1),
              U ? ((U.el = se.el), be(c, U, T)) : (U = se),
              H && ds(H),
              (de = U.props && U.props.onVnodeBeforeUpdate) && He(de, G, U, se),
              $t(c, !0)
            const $e = hs(c),
              De = c.subTree
            ;(c.subTree = $e),
              N(De, $e, _(De.el), $n(De), c, x, C),
              (U.el = $e.el),
              _e === null && Ul(c, $e.el),
              z && Te(z, x),
              (de = U.props && U.props.onVnodeUpdated) &&
                Te(() => He(de, G, U, se), x)
          } else {
            let U
            const { el: H, props: z } = f,
              { bm: G, m: se, parent: _e } = c,
              de = Dt(f)
            if (
              ($t(c, !1),
              G && ds(G),
              !de && (U = z && z.onVnodeBeforeMount) && He(U, _e, f),
              $t(c, !0),
              H && us)
            ) {
              const $e = () => {
                ;(c.subTree = hs(c)), us(H, c.subTree, c, x, null)
              }
              de
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && $e())
                : $e()
            } else {
              const $e = (c.subTree = hs(c))
              N(null, $e, m, $, c, x, C), (f.el = $e.el)
            }
            if ((se && Te(se, x), !de && (U = z && z.onVnodeMounted))) {
              const $e = f
              Te(() => He(U, _e, $e), x)
            }
            ;(f.shapeFlag & 256 ||
              (_e && Dt(_e.vnode) && _e.vnode.shapeFlag & 256)) &&
              c.a &&
              Te(c.a, x),
              (c.isMounted = !0),
              (f = m = $ = null)
          }
        },
        E = (c.effect = new qs(P, () => no(w), c.scope)),
        w = (c.update = () => E.run())
      ;(w.id = c.uid), $t(c, !0), w()
    },
    be = (c, f, m) => {
      f.component = c
      const $ = c.vnode.props
      ;(c.vnode = f),
        (c.next = null),
        ua(c, f.props, $, m),
        ha(c, f.children, m),
        Qt(),
        To(),
        Xt()
    },
    pe = (c, f, m, $, x, C, T, P, E = !1) => {
      const w = c && c.children,
        U = c ? c.shapeFlag : 0,
        H = f.children,
        { patchFlag: z, shapeFlag: G } = f
      if (z > 0) {
        if (z & 128) {
          xn(w, H, m, $, x, C, T, P, E)
          return
        } else if (z & 256) {
          yt(w, H, m, $, x, C, T, P, E)
          return
        }
      }
      G & 8
        ? (U & 16 && nt(w, x, C), H !== w && h(m, H))
        : U & 16
        ? G & 16
          ? xn(w, H, m, $, x, C, T, P, E)
          : nt(w, x, C, !0)
        : (U & 8 && h(m, ''), G & 16 && I(H, m, $, x, C, T, P, E))
    },
    yt = (c, f, m, $, x, C, T, P, E) => {
      ;(c = c || Ot), (f = f || Ot)
      const w = c.length,
        U = f.length,
        H = Math.min(w, U)
      let z
      for (z = 0; z < H; z++) {
        const G = (f[z] = E ? ft(f[z]) : Ue(f[z]))
        N(c[z], G, m, null, x, C, T, P, E)
      }
      w > U ? nt(c, x, C, !0, !1, H) : I(f, m, $, x, C, T, P, E, H)
    },
    xn = (c, f, m, $, x, C, T, P, E) => {
      let w = 0
      const U = f.length
      let H = c.length - 1,
        z = U - 1
      for (; w <= H && w <= z; ) {
        const G = c[w],
          se = (f[w] = E ? ft(f[w]) : Ue(f[w]))
        if (St(G, se)) N(G, se, m, null, x, C, T, P, E)
        else break
        w++
      }
      for (; w <= H && w <= z; ) {
        const G = c[H],
          se = (f[z] = E ? ft(f[z]) : Ue(f[z]))
        if (St(G, se)) N(G, se, m, null, x, C, T, P, E)
        else break
        H--, z--
      }
      if (w > H) {
        if (w <= z) {
          const G = z + 1,
            se = G < U ? f[G].el : $
          for (; w <= z; )
            N(null, (f[w] = E ? ft(f[w]) : Ue(f[w])), m, se, x, C, T, P, E), w++
        }
      } else if (w > z) for (; w <= H; ) Ge(c[w], x, C, !0), w++
      else {
        const G = w,
          se = w,
          _e = new Map()
        for (w = se; w <= z; w++) {
          const Ne = (f[w] = E ? ft(f[w]) : Ue(f[w]))
          Ne.key != null && _e.set(Ne.key, w)
        }
        let de,
          $e = 0
        const De = z - se + 1
        let Nt = !1,
          yo = 0
        const Jt = new Array(De)
        for (w = 0; w < De; w++) Jt[w] = 0
        for (w = G; w <= H; w++) {
          const Ne = c[w]
          if ($e >= De) {
            Ge(Ne, x, C, !0)
            continue
          }
          let Ye
          if (Ne.key != null) Ye = _e.get(Ne.key)
          else
            for (de = se; de <= z; de++)
              if (Jt[de - se] === 0 && St(Ne, f[de])) {
                Ye = de
                break
              }
          Ye === void 0
            ? Ge(Ne, x, C, !0)
            : ((Jt[Ye - se] = w + 1),
              Ye >= yo ? (yo = Ye) : (Nt = !0),
              N(Ne, f[Ye], m, null, x, C, T, P, E),
              $e++)
        }
        const xo = Nt ? ba(Jt) : Ot
        for (de = xo.length - 1, w = De - 1; w >= 0; w--) {
          const Ne = se + w,
            Ye = f[Ne],
            $o = Ne + 1 < U ? f[Ne + 1].el : $
          Jt[w] === 0
            ? N(null, Ye, m, $o, x, C, T, P, E)
            : Nt && (de < 0 || w !== xo[de] ? xt(Ye, m, $o, 2) : de--)
        }
      }
    },
    xt = (c, f, m, $, x = null) => {
      const { el: C, type: T, transition: P, children: E, shapeFlag: w } = c
      if (w & 6) {
        xt(c.component.subTree, f, m, $)
        return
      }
      if (w & 128) {
        c.suspense.move(f, m, $)
        return
      }
      if (w & 64) {
        T.move(c, f, m, Mt)
        return
      }
      if (T === Q) {
        s(C, f, m)
        for (let H = 0; H < E.length; H++) xt(E[H], f, m, $)
        s(c.anchor, f, m)
        return
      }
      if (T === Ut) {
        M(c, f, m)
        return
      }
      if ($ !== 2 && w & 1 && P)
        if ($ === 0) P.beforeEnter(C), s(C, f, m), Te(() => P.enter(C), x)
        else {
          const { leave: H, delayLeave: z, afterLeave: G } = P,
            se = () => s(C, f, m),
            _e = () => {
              H(C, () => {
                se(), G && G()
              })
            }
          z ? z(C, se, _e) : _e()
        }
      else s(C, f, m)
    },
    Ge = (c, f, m, $ = !1, x = !1) => {
      const {
        type: C,
        props: T,
        ref: P,
        children: E,
        dynamicChildren: w,
        shapeFlag: U,
        patchFlag: H,
        dirs: z
      } = c
      if ((P != null && Hn(P, null, m, c, !0), U & 256)) {
        f.ctx.deactivate(c)
        return
      }
      const G = U & 1 && z,
        se = !Dt(c)
      let _e
      if ((se && (_e = T && T.onVnodeBeforeUnmount) && He(_e, f, c), U & 6))
        Or(c.component, m, $)
      else {
        if (U & 128) {
          c.suspense.unmount(m, $)
          return
        }
        G && Qe(c, null, f, 'beforeUnmount'),
          U & 64
            ? c.type.remove(c, f, m, x, Mt, $)
            : w && (C !== Q || (H > 0 && H & 64))
            ? nt(w, f, m, !1, !0)
            : ((C === Q && H & 384) || (!x && U & 16)) && nt(E, f, m),
          $ && go(c)
      }
      ;((se && (_e = T && T.onVnodeUnmounted)) || G) &&
        Te(() => {
          _e && He(_e, f, c), G && Qe(c, null, f, 'unmounted')
        }, m)
    },
    go = c => {
      const { type: f, el: m, anchor: $, transition: x } = c
      if (f === Q) {
        Br(m, $)
        return
      }
      if (f === Ut) {
        Y(c)
        return
      }
      const C = () => {
        o(m), x && !x.persisted && x.afterLeave && x.afterLeave()
      }
      if (c.shapeFlag & 1 && x && !x.persisted) {
        const { leave: T, delayLeave: P } = x,
          E = () => T(m, C)
        P ? P(c.el, C, E) : E()
      } else C()
    },
    Br = (c, f) => {
      let m
      for (; c !== f; ) (m = g(c)), o(c), (c = m)
      o(f)
    },
    Or = (c, f, m) => {
      const { bum: $, scope: x, update: C, subTree: T, um: P } = c
      $ && ds($),
        x.stop(),
        C && ((C.active = !1), Ge(T, c, f, m)),
        P && Te(P, f),
        Te(() => {
          c.isUnmounted = !0
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve())
    },
    nt = (c, f, m, $ = !1, x = !1, C = 0) => {
      for (let T = C; T < c.length; T++) Ge(c[T], f, m, $, x)
    },
    $n = c =>
      c.shapeFlag & 6
        ? $n(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : g(c.anchor || c.el),
    bo = (c, f, m) => {
      c == null
        ? f._vnode && Ge(f._vnode, null, null, !0)
        : N(f._vnode || null, c, f, null, null, null, m),
        To(),
        Bn(),
        (f._vnode = c)
    },
    Mt = {
      p: N,
      um: Ge,
      m: xt,
      r: go,
      mt: D,
      mc: I,
      pc: pe,
      pbc: X,
      n: $n,
      o: e
    }
  let cs, us
  return (
    t && ([cs, us] = t(Mt)), { render: bo, hydrate: cs, createApp: _a(bo, cs) }
  )
}
function $t({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function rr(e, t, n = !1) {
  const s = e.children,
    o = t.children
  if (q(s) && q(o))
    for (let i = 0; i < s.length; i++) {
      const r = s[i]
      let l = o[i]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[i] = ft(o[i])), (l.el = r.el)),
        n || rr(r, l)),
        l.type === qt && (l.el = r.el)
    }
}
function ba(e) {
  const t = e.slice(),
    n = [0]
  let s, o, i, r, l
  const a = e.length
  for (s = 0; s < a; s++) {
    const u = e[s]
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        ;(t[s] = o), n.push(s)
        continue
      }
      for (i = 0, r = n.length - 1; i < r; )
        (l = (i + r) >> 1), e[n[l]] < u ? (i = l + 1) : (r = l)
      u < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, r = n[i - 1]; i-- > 0; ) (n[i] = r), (r = t[r])
  return n
}
const ya = e => e.__isTeleport,
  Q = Symbol(void 0),
  qt = Symbol(void 0),
  Oe = Symbol(void 0),
  Ut = Symbol(void 0),
  on = []
let Ke = null
function d(e = !1) {
  on.push((Ke = e ? null : []))
}
function xa() {
  on.pop(), (Ke = on[on.length - 1] || null)
}
let hn = 1
function jo(e) {
  hn += e
}
function lr(e) {
  return (
    (e.dynamicChildren = hn > 0 ? Ke || Ot : null),
    xa(),
    hn > 0 && Ke && Ke.push(e),
    e
  )
}
function v(e, t, n, s, o, i) {
  return lr(b(e, t, n, s, o, i, !0))
}
function W(e, t, n, s, o) {
  return lr(V(e, t, n, s, o, !0))
}
function Rn(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function St(e, t) {
  return e.type === t.type && e.key === t.key
}
const ss = '__vInternal',
  ar = ({ key: e }) => e ?? null,
  Ln = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? xe(e) || Ce(e) || Z(e)
        ? { i: Se, r: e, k: t, f: !!n }
        : e
      : null
function b(
  e,
  t = null,
  n = null,
  s = 0,
  o = null,
  i = e === Q ? 0 : 1,
  r = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ar(t),
    ref: t && Ln(t),
    scopeId: Zn,
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
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Se
  }
  return (
    l
      ? (lo(a, n), i & 128 && e.normalize(a))
      : n && (a.shapeFlag |= xe(n) ? 8 : 16),
    hn > 0 &&
      !r &&
      Ke &&
      (a.patchFlag > 0 || i & 6) &&
      a.patchFlag !== 32 &&
      Ke.push(a),
    a
  )
}
const V = $a
function $a(e, t = null, n = null, s = 0, o = null, i = !1) {
  if (((!e || e === Qi) && (e = Oe), Rn(e))) {
    const l = mt(e, t, !0)
    return (
      n && lo(l, n),
      hn > 0 &&
        !i &&
        Ke &&
        (l.shapeFlag & 6 ? (Ke[Ke.indexOf(e)] = l) : Ke.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((La(e) && (e = e.__vccOpts), t)) {
    t = wa(t)
    let { class: l, style: a } = t
    l && !xe(l) && (t.class = me(l)),
      ve(a) && (Li(a) && !q(a) && (a = we({}, a)), (t.style = Kn(a)))
  }
  const r = xe(e) ? 1 : zl(e) ? 128 : ya(e) ? 64 : ve(e) ? 4 : Z(e) ? 2 : 0
  return b(e, t, n, s, o, r, i, !0)
}
function wa(e) {
  return e ? (Li(e) || ss in e ? we({}, e) : e) : null
}
function mt(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: i, children: r } = e,
    l = t ? In(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ar(l),
    ref:
      t && t.ref ? (n && o ? (q(o) ? o.concat(Ln(t)) : [o, Ln(t)]) : Ln(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Q ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}
function Ee(e = ' ', t = 0) {
  return V(qt, null, e, t)
}
function ka(e, t) {
  const n = V(Ut, null, e)
  return (n.staticCount = t), n
}
function R(e = '', t = !1) {
  return t ? (d(), W(Oe, null, e)) : V(Oe, null, e)
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? V(Oe)
    : q(e)
    ? V(Q, null, e.slice())
    : typeof e == 'object'
    ? ft(e)
    : V(qt, null, String(e))
}
function ft(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e)
}
function lo(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (q(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const o = t.default
      o && (o._c && (o._d = !1), lo(e, o()), o._c && (o._d = !0))
      return
    } else {
      n = 32
      const o = t._
      !o && !(ss in t)
        ? (t._ctx = Se)
        : o === 3 &&
          Se &&
          (Se.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: Se }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ee(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function In(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const o in s)
      if (o === 'class')
        t.class !== s.class && (t.class = me([t.class, s.class]))
      else if (o === 'style') t.style = Kn([t.style, s.style])
      else if (vn(o)) {
        const i = t[o],
          r = s[o]
        r &&
          i !== r &&
          !(q(i) && i.includes(r)) &&
          (t[o] = i ? [].concat(i, r) : r)
      } else o !== '' && (t[o] = s[o])
  }
  return t
}
function He(e, t, n, s = null) {
  Re(e, t, 7, [n, s])
}
const Pa = ir()
let Ca = 0
function Sa(e, t, n) {
  const s = e.type,
    o = (t ? t.appContext : e.appContext) || Pa,
    i = {
      uid: Ca++,
      vnode: e,
      type: s,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Zr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: tr(s, o),
      emitsOptions: ji(s, o),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: s.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
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
    }
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Hl.bind(null, i)),
    e.ce && e.ce(i),
    i
  )
}
let ye = null
const os = () => ye || Se,
  Gt = e => {
    ;(ye = e), e.scope.on()
  },
  Tt = () => {
    ye && ye.scope.off(), (ye = null)
  }
function cr(e) {
  return e.vnode.shapeFlag & 4
}
let pn = !1
function Ea(e, t = !1) {
  pn = t
  const { props: n, children: s } = e.vnode,
    o = cr(e)
  ca(e, n, o, t), da(e, s)
  const i = o ? Aa(e, t) : void 0
  return (pn = !1), i
}
function Aa(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = nn(new Proxy(e.ctx, sa)))
  const { setup: s } = n
  if (s) {
    const o = (e.setupContext = s.length > 1 ? fr(e) : null)
    Gt(e), Qt()
    const i = pt(s, e, 0, [e.props, o])
    if ((Xt(), Tt(), gi(i))) {
      if ((i.then(Tt, Tt), t))
        return i
          .then(r => {
            Do(e, r, t)
          })
          .catch(r => {
            Xn(r, e, 0)
          })
      e.asyncDep = i
    } else Do(e, i, t)
  } else ur(e, t)
}
function Do(e, t, n) {
  Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ve(t) && (e.setupState = Bi(t)),
    ur(e, n)
}
let Uo
function ur(e, t, n) {
  const s = e.type
  if (!e.render) {
    if (!t && Uo && !s.render) {
      const o = s.template || io(e).template
      if (o) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = s,
          u = we(we({ isCustomElement: i, delimiters: l }, r), a)
        s.render = Uo(o, u)
      }
    }
    e.render = s.render || We
  }
  Gt(e), Qt(), oa(e), Xt(), Tt()
}
function Va(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Le(e, 'get', '$attrs'), t[n]
    }
  })
}
function fr(e) {
  const t = s => {
    e.exposed = s || {}
  }
  let n
  return {
    get attrs() {
      return n || (n = Va(e))
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}
function ao(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Bi(nn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in sn) return sn[n](e)
        },
        has(t, n) {
          return n in t || n in sn
        }
      }))
    )
}
function Ta(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function La(e) {
  return Z(e) && '__vccOpts' in e
}
const K = (e, t) => Il(e, t, pn)
function Ia() {
  return Ma().slots
}
function Ma() {
  const e = os()
  return e.setupContext || (e.setupContext = fr(e))
}
function jn(e, t, n) {
  const s = arguments.length
  return s === 2
    ? ve(t) && !q(t)
      ? Rn(t)
        ? V(e, null, [t])
        : V(e, t)
      : V(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Rn(n) && (n = [n]),
      V(e, t, n))
}
const Na = Symbol(''),
  Ba = () => qe(Na),
  Oa = '3.2.47',
  Fa = 'http://www.w3.org/2000/svg',
  Et = typeof document < 'u' ? document : null,
  zo = Et && Et.createElement('template'),
  Ha = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const o = t
        ? Et.createElementNS(Fa, e)
        : Et.createElement(e, n ? { is: n } : void 0)
      return (
        e === 'select' &&
          s &&
          s.multiple != null &&
          o.setAttribute('multiple', s.multiple),
        o
      )
    },
    createText: e => Et.createTextNode(e),
    createComment: e => Et.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Et.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, o, i) {
      const r = n ? n.previousSibling : t.lastChild
      if (o && (o === i || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === i || !(o = o.nextSibling));

        );
      else {
        zo.innerHTML = s ? `<svg>${e}</svg>` : e
        const l = zo.content
        if (s) {
          const a = l.firstChild
          for (; a.firstChild; ) l.appendChild(a.firstChild)
          l.removeChild(a)
        }
        t.insertBefore(l, n)
      }
      return [
        r ? r.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ]
    }
  }
function Ra(e, t, n) {
  const s = e._vtc
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t)
}
function ja(e, t, n) {
  const s = e.style,
    o = xe(n)
  if (n && !o) {
    if (t && !xe(t)) for (const i in t) n[i] == null && Is(s, i, '')
    for (const i in n) Is(s, i, n[i])
  } else {
    const i = s.display
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (s.display = i)
  }
}
const Ko = /\s*!important$/
function Is(e, t, n) {
  if (q(n)) n.forEach(s => Is(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = Da(e, t)
    Ko.test(n)
      ? e.setProperty(Yt(s), n.replace(Ko, ''), 'important')
      : (e[s] = n)
  }
}
const Wo = ['Webkit', 'Moz', 'ms'],
  ms = {}
function Da(e, t) {
  const n = ms[t]
  if (n) return n
  let s = Ze(t)
  if (s !== 'filter' && s in e) return (ms[t] = s)
  s = Gn(s)
  for (let o = 0; o < Wo.length; o++) {
    const i = Wo[o] + s
    if (i in e) return (ms[t] = i)
  }
  return t
}
const qo = 'http://www.w3.org/1999/xlink'
function Ua(e, t, n, s, o) {
  if (s && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(qo, t.slice(6, t.length))
      : e.setAttributeNS(qo, t, n)
  else {
    const i = Ur(t)
    n == null || (i && !_i(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : n)
  }
}
function za(e, t, n, s, o, i, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    s && r(s, o, i), (e[t] = n ?? '')
    return
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n
    const a = n ?? ''
    ;(e.value !== a || e.tagName === 'OPTION') && (e.value = a),
      n == null && e.removeAttribute(t)
    return
  }
  let l = !1
  if (n === '' || n == null) {
    const a = typeof e[t]
    a === 'boolean'
      ? (n = _i(n))
      : n == null && a === 'string'
      ? ((n = ''), (l = !0))
      : a === 'number' && ((n = 0), (l = !0))
  }
  try {
    e[t] = n
  } catch {}
  l && e.removeAttribute(t)
}
function Ka(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function Wa(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
function qa(e, t, n, s, o = null) {
  const i = e._vei || (e._vei = {}),
    r = i[t]
  if (s && r) r.value = s
  else {
    const [l, a] = Ga(t)
    if (s) {
      const u = (i[t] = Xa(s, o))
      Ka(e, l, u, a)
    } else r && (Wa(e, l, r, a), (i[t] = void 0))
  }
}
const Go = /(?:Once|Passive|Capture)$/
function Ga(e) {
  let t
  if (Go.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Go)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : Yt(e.slice(2)), t]
}
let vs = 0
const Ya = Promise.resolve(),
  Qa = () => vs || (Ya.then(() => (vs = 0)), (vs = Date.now()))
function Xa(e, t) {
  const n = s => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    Re(Ja(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = Qa()), n
}
function Ja(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map(s => o => !o._stopped && s && s(o))
    )
  } else return t
}
const Yo = /^on[a-z]/,
  Za = (e, t, n, s, o = !1, i, r, l, a) => {
    t === 'class'
      ? Ra(e, s, o)
      : t === 'style'
      ? ja(e, n, s)
      : vn(t)
      ? Ds(t) || qa(e, t, n, s, r)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : ec(e, t, s, o)
        )
      ? za(e, t, s, i, r, l, a)
      : (t === 'true-value'
          ? (e._trueValue = s)
          : t === 'false-value' && (e._falseValue = s),
        Ua(e, t, s, o))
  }
function ec(e, t, n, s) {
  return s
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Yo.test(t) && Z(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Yo.test(t) && xe(n))
    ? !1
    : t in e
}
function tc(e) {
  const t = os()
  if (!t) return
  const n = (t.ut = (o = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach(i => Ns(i, o))
    }),
    s = () => {
      const o = e(t.proxy)
      Ms(t.subTree, o), n(o)
    }
  Ui(s),
    Ie(() => {
      const o = new MutationObserver(s)
      o.observe(t.subTree.el.parentNode, { childList: !0 }),
        vt(() => o.disconnect())
    })
}
function Ms(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense
    ;(e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Ms(n.activeBranch, t)
        })
  }
  for (; e.component; ) e = e.component.subTree
  if (e.shapeFlag & 1 && e.el) Ns(e.el, t)
  else if (e.type === Q) e.children.forEach(n => Ms(n, t))
  else if (e.type === Ut) {
    let { el: n, anchor: s } = e
    for (; n && (Ns(n, t), n !== s); ) n = n.nextSibling
  }
}
function Ns(e, t) {
  if (e.nodeType === 1) {
    const n = e.style
    for (const s in t) n.setProperty(`--${s}`, t[s])
  }
}
const ct = 'transition',
  Zt = 'animation',
  is = (e, { slots: t }) => jn(Ki, nc(e), t)
is.displayName = 'Transition'
const dr = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}
is.props = we({}, Ki.props, dr)
const wt = (e, t = []) => {
    q(e) ? e.forEach(n => n(...t)) : e && e(...t)
  },
  Qo = e => (e ? (q(e) ? e.some(t => t.length > 1) : e.length > 1) : !1)
function nc(e) {
  const t = {}
  for (const F in e) F in dr || (t[F] = e[F])
  if (e.css === !1) return t
  const {
      name: n = 'v',
      type: s,
      duration: o,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: r = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = i,
      appearActiveClass: u = r,
      appearToClass: h = l,
      leaveFromClass: _ = `${n}-leave-from`,
      leaveActiveClass: g = `${n}-leave-active`,
      leaveToClass: k = `${n}-leave-to`
    } = e,
    j = sc(o),
    N = j && j[0],
    J = j && j[1],
    {
      onBeforeEnter: y,
      onEnter: A,
      onEnterCancelled: M,
      onLeave: Y,
      onLeaveCancelled: te,
      onBeforeAppear: he = y,
      onAppear: re = A,
      onAppearCancelled: I = M
    } = t,
    ee = (F, ne, D) => {
      kt(F, ne ? h : l), kt(F, ne ? u : r), D && D()
    },
    X = (F, ne) => {
      ;(F._isLeaving = !1), kt(F, _), kt(F, k), kt(F, g), ne && ne()
    },
    ae = F => (ne, D) => {
      const Me = F ? re : A,
        fe = () => ee(ne, F, D)
      wt(Me, [ne, fe]),
        Xo(() => {
          kt(ne, F ? a : i), ut(ne, F ? h : l), Qo(Me) || Jo(ne, s, N, fe)
        })
    }
  return we(t, {
    onBeforeEnter(F) {
      wt(y, [F]), ut(F, i), ut(F, r)
    },
    onBeforeAppear(F) {
      wt(he, [F]), ut(F, a), ut(F, u)
    },
    onEnter: ae(!1),
    onAppear: ae(!0),
    onLeave(F, ne) {
      F._isLeaving = !0
      const D = () => X(F, ne)
      ut(F, _),
        rc(),
        ut(F, g),
        Xo(() => {
          F._isLeaving && (kt(F, _), ut(F, k), Qo(Y) || Jo(F, s, J, D))
        }),
        wt(Y, [F, D])
    },
    onEnterCancelled(F) {
      ee(F, !1), wt(M, [F])
    },
    onAppearCancelled(F) {
      ee(F, !0), wt(I, [F])
    },
    onLeaveCancelled(F) {
      X(F), wt(te, [F])
    }
  })
}
function sc(e) {
  if (e == null) return null
  if (ve(e)) return [gs(e.enter), gs(e.leave)]
  {
    const t = gs(e)
    return [t, t]
  }
}
function gs(e) {
  return Xr(e)
}
function ut(e, t) {
  t.split(/\s+/).forEach(n => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t)
}
function kt(e, t) {
  t.split(/\s+/).forEach(s => s && e.classList.remove(s))
  const { _vtc: n } = e
  n && (n.delete(t), n.size || (e._vtc = void 0))
}
function Xo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let oc = 0
function Jo(e, t, n, s) {
  const o = (e._endId = ++oc),
    i = () => {
      o === e._endId && s()
    }
  if (n) return setTimeout(i, n)
  const { type: r, timeout: l, propCount: a } = ic(e, t)
  if (!r) return s()
  const u = r + 'end'
  let h = 0
  const _ = () => {
      e.removeEventListener(u, g), i()
    },
    g = k => {
      k.target === e && ++h >= a && _()
    }
  setTimeout(() => {
    h < a && _()
  }, l + 1),
    e.addEventListener(u, g)
}
function ic(e, t) {
  const n = window.getComputedStyle(e),
    s = j => (n[j] || '').split(', '),
    o = s(`${ct}Delay`),
    i = s(`${ct}Duration`),
    r = Zo(o, i),
    l = s(`${Zt}Delay`),
    a = s(`${Zt}Duration`),
    u = Zo(l, a)
  let h = null,
    _ = 0,
    g = 0
  t === ct
    ? r > 0 && ((h = ct), (_ = r), (g = i.length))
    : t === Zt
    ? u > 0 && ((h = Zt), (_ = u), (g = a.length))
    : ((_ = Math.max(r, u)),
      (h = _ > 0 ? (r > u ? ct : Zt) : null),
      (g = h ? (h === ct ? i.length : a.length) : 0))
  const k =
    h === ct && /\b(transform|all)(,|$)/.test(s(`${ct}Property`).toString())
  return { type: h, timeout: _, propCount: g, hasTransform: k }
}
function Zo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((n, s) => ei(n) + ei(e[s])))
}
function ei(e) {
  return Number(e.slice(0, -1).replace(',', '.')) * 1e3
}
function rc() {
  return document.body.offsetHeight
}
const lc = ['ctrl', 'shift', 'alt', 'meta'],
  ac = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => 'button' in e && e.button !== 0,
    middle: e => 'button' in e && e.button !== 1,
    right: e => 'button' in e && e.button !== 2,
    exact: (e, t) => lc.some(n => e[`${n}Key`] && !t.includes(n))
  },
  hr =
    (e, t) =>
    (n, ...s) => {
      for (let o = 0; o < t.length; o++) {
        const i = ac[t[o]]
        if (i && i(n, t)) return
      }
      return e(n, ...s)
    },
  cc = we({ patchProp: Za }, Ha)
let bs,
  ti = !1
function uc() {
  return (bs = ti ? bs : va(cc)), (ti = !0), bs
}
const fc = (...e) => {
  const t = uc().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = s => {
      const o = dc(s)
      if (o) return n(o, !0, o instanceof SVGElement)
    }),
    t
  )
}
function dc(e) {
  return xe(e) ? document.querySelector(e) : e
}
const B = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, o] of t) n[s] = o
    return n
  },
  hc = 'modulepreload',
  pc = function (e) {
    return '/' + e
  },
  ni = {},
  _c = function (t, n, s) {
    if (!n || n.length === 0) return t()
    const o = document.getElementsByTagName('link')
    return Promise.all(
      n.map(i => {
        if (((i = pc(i)), i in ni)) return
        ni[i] = !0
        const r = i.endsWith('.css'),
          l = r ? '[rel="stylesheet"]' : ''
        if (!!s)
          for (let h = o.length - 1; h >= 0; h--) {
            const _ = o[h]
            if (_.href === i && (!r || _.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${i}"]${l}`)) return
        const u = document.createElement('link')
        if (
          ((u.rel = r ? 'stylesheet' : hc),
          r || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = i),
          document.head.appendChild(u),
          r)
        )
          return new Promise((h, _) => {
            u.addEventListener('load', h),
              u.addEventListener('error', () =>
                _(new Error(`Unable to preload CSS for ${i}`))
              )
          })
      })
    ).then(() => t())
  }
const mc = O({
  __name: 'VPBadge',
  props: { text: null, type: null },
  setup(e) {
    return (t, n) => (
      d(),
      v(
        'span',
        { class: me(['VPBadge', e.type ?? 'tip']) },
        [S(t.$slots, 'default', {}, () => [Ee(ie(e.text), 1)], !0)],
        2
      )
    )
  }
})
const vc = B(mc, [['__scopeId', 'data-v-cf5e8e67']]),
  gc = JSON.parse(
    '{"lang":"en-US","dir":"ltr","title":"vue-lightbox-advanced","description":"Vue Lightbox Advanced Photo Grid component Vue.js 3","base":"/","head":[],"appearance":true,"themeConfig":{"repo":"codeeshop-oc/vue-lightbox-advanced","docsRepo":"codeeshop-oc/vue-lightbox-advanced","docsDir":"docs","docsBranch":"main","siteTitle":"vue-lightbox-advanced","nav":[{"text":"Guide","link":"/getting-started"},{"text":"Configs","link":"/configs"},{"text":"Examples","link":"examples"}],"sidebar":[{"text":"Introduction","items":[{"text":"Getting Started","link":"/getting-started"},{"text":"Configs","link":"/configs"},{"text":"Examples","link":"/examples"}]},{"text":"API","items":[{"text":"Props","link":"/api/props"},{"text":"Events","link":"/api/events"}]}]},"locales":{},"scrollOffset":90,"cleanUrls":false}'
  ),
  rs = /^[a-z]+:/i,
  bc = /^pathname:\/\//,
  si = 'vitepress-theme-appearance',
  pr = /#.*$/,
  yc = /(index)?\.(md|html)$/,
  ke = typeof document < 'u',
  _r = {
    relativePath: '',
    title: '404',
    description: 'Not Found',
    headers: [],
    frontmatter: { sidebar: !1, layout: 'page' },
    lastUpdated: 0
  }
function It(e, t, n = !1) {
  if (t === void 0) return !1
  if (((e = oi(`/${e}`)), n)) return new RegExp(t).test(e)
  if (oi(t) !== e) return !1
  const s = t.match(pr)
  return s ? (ke ? location.hash : '') === s[0] : !0
}
function oi(e) {
  return decodeURI(e).replace(pr, '').replace(yc, '')
}
function mr(e) {
  return rs.test(e)
}
function xc(e, t) {
  var s, o, i, r, l, a, u
  const n =
    Object.keys(e.locales).find(
      h => h !== 'root' && !mr(h) && It(t, `/${h}/`, !0)
    ) || 'root'
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((o = e.locales[n]) == null ? void 0 : o.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate:
      ((r = e.locales[n]) == null ? void 0 : r.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: gr(e.head, ((a = e.locales[n]) == null ? void 0 : a.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((u = e.locales[n]) == null ? void 0 : u.themeConfig)
    }
  })
}
function vr(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate
  if (typeof s == 'string' && s.includes(':title'))
    return s.replace(/:title/g, n)
  const o = $c(e.title, s)
  return `${n}${o}`
}
function $c(e, t) {
  return t === !1
    ? ''
    : t === !0 || t === void 0
    ? ` | ${e}`
    : e === t
    ? ''
    : ` | ${t}`
}
function wc(e, t) {
  const [n, s] = t
  if (n !== 'meta') return !1
  const o = Object.entries(s)[0]
  return o == null ? !1 : e.some(([i, r]) => i === n && r[o[0]] === o[1])
}
function gr(e, t) {
  return [...e.filter(n => !wc(t, n)), ...t]
}
const kc = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  Pc = /^[a-z]:/i
function ii(e) {
  const t = Pc.exec(e),
    n = t ? t[0] : ''
  return (
    n +
    e
      .slice(n.length)
      .replace(kc, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  )
}
const br = Symbol(),
  dt = Al(gc)
function Cc(e) {
  const t = K(() => xc(dt.value, e.data.relativePath))
  return {
    site: t,
    theme: K(() => t.value.themeConfig),
    page: K(() => e.data),
    frontmatter: K(() => e.data.frontmatter),
    lang: K(() => t.value.lang),
    dir: K(() => t.value.dir),
    localeIndex: K(() => t.value.localeIndex || 'root'),
    title: K(() => vr(t.value, e.data)),
    description: K(() => e.data.description || t.value.description),
    isDark: oe(!1)
  }
}
function yr() {
  const e = qe(br)
  if (!e) throw new Error('vitepress data not properly injected in app')
  return e
}
function Sc(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/')
}
function _n(e) {
  return rs.test(e) || e.startsWith('.') ? e : Sc(dt.value.base, e)
}
function xr(e) {
  let t = e.replace(/\.html$/, '')
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, '/index')), ke)) {
    const n = '/'
    t = ii(t.slice(n.length).replace(/\//g, '_') || 'index') + '.md'
    let s = __VP_HASH_MAP__[t.toLowerCase()]
    s ||
      ((t = t.endsWith('_index.md')
        ? t.slice(0, -9) + '.md'
        : t.slice(0, -3) + '_index.md'),
      (s = __VP_HASH_MAP__[t.toLowerCase()])),
      (t = `${n}assets/${t}.${s}.js`)
  } else t = `./${ii(t.slice(1).replace(/\//g, '_'))}.md.js`
  return t
}
const $r = Symbol(),
  ri = 'http://a.com',
  Ec = () => ({ path: '/', component: null, data: _r })
function Ac(e, t) {
  const n = Qn(Ec()),
    s = { route: n, go: o }
  async function o(l = ke ? location.href : '/') {
    var u, h
    await ((u = s.onBeforeRouteChange) == null ? void 0 : u.call(s, l))
    const a = new URL(l, ri)
    dt.value.cleanUrls ||
      (!a.pathname.endsWith('/') &&
        !a.pathname.endsWith('.html') &&
        ((a.pathname += '.html'), (l = a.pathname + a.search + a.hash))),
      ke &&
        l !== location.href &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, '', l)),
      await r(l),
      await ((h = s.onAfterRouteChanged) == null ? void 0 : h.call(s, l))
  }
  let i = null
  async function r(l, a = 0, u = !1) {
    const h = new URL(l, ri),
      _ = (i = h.pathname)
    try {
      let g = await e(_)
      if (i === _) {
        i = null
        const { default: k, __pageData: j } = g
        if (!k) throw new Error(`Invalid route component: ${k}`)
        ;(n.path = ke ? _ : _n(_)),
          (n.component = nn(k)),
          (n.data = nn(j)),
          ke &&
            to(() => {
              let N =
                dt.value.base +
                j.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1')
              if (
                (!dt.value.cleanUrls && !N.endsWith('/') && (N += '.html'),
                N !== h.pathname &&
                  ((h.pathname = N),
                  (l = N + h.search + h.hash),
                  history.replaceState(null, '', l)),
                h.hash && !a)
              ) {
                let J = null
                try {
                  J = document.querySelector(decodeURIComponent(h.hash))
                } catch (y) {
                  console.warn(y)
                }
                if (J) {
                  li(J, h.hash)
                  return
                }
              }
              window.scrollTo(0, a)
            })
      }
    } catch (g) {
      if (
        (!/fetch/.test(g.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(g),
        !u)
      )
        try {
          const k = await fetch(dt.value.base + 'hashmap.json')
          ;(window.__VP_HASH_MAP__ = await k.json()), await r(l, a, !0)
          return
        } catch {}
      i === _ &&
        ((i = null),
        (n.path = ke ? _ : _n(_)),
        (n.component = t ? nn(t) : null),
        (n.data = _r))
    }
  }
  return (
    ke &&
      (window.addEventListener(
        'click',
        l => {
          if (l.target.closest('button')) return
          const u = l.target.closest('a')
          if (
            u &&
            !u.closest('.vp-raw') &&
            (u instanceof SVGElement || !u.download)
          ) {
            const { target: h } = u,
              {
                href: _,
                origin: g,
                pathname: k,
                hash: j,
                search: N
              } = new URL(
                u.href instanceof SVGAnimatedString ? u.href.animVal : u.href,
                u.baseURI
              ),
              J = window.location,
              y = k.match(/\.\w+$/)
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              h !== '_blank' &&
              g === J.origin &&
              !(y && y[0] !== '.html') &&
              (l.preventDefault(),
              k === J.pathname && N === J.search
                ? j &&
                  j !== J.hash &&
                  (history.pushState(null, '', j),
                  window.dispatchEvent(new Event('hashchange')),
                  li(u, j, u.classList.contains('header-anchor')))
                : o(_))
          }
        },
        { capture: !0 }
      ),
      window.addEventListener('popstate', l => {
        r(location.href, (l.state && l.state.scrollPosition) || 0)
      }),
      window.addEventListener('hashchange', l => {
        l.preventDefault()
      })),
    s
  )
}
function Vc() {
  const e = qe($r)
  if (!e) throw new Error('useRouter() is called without provider.')
  return e
}
function gt() {
  return Vc().route
}
function li(e, t, n = !1) {
  let s = null
  try {
    s = e.classList.contains('header-anchor')
      ? e
      : document.querySelector(decodeURIComponent(t))
  } catch (o) {
    console.warn(o)
  }
  if (s) {
    let o = dt.value.scrollOffset
    typeof o == 'string' &&
      (o = document.querySelector(o).getBoundingClientRect().bottom + 24)
    const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
      r = window.scrollY + s.getBoundingClientRect().top - o + i
    !n || Math.abs(r - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, r)
      : window.scrollTo({ left: 0, top: r, behavior: 'smooth' })
  }
}
const Tc = O({
    name: 'VitePressContent',
    props: { onContentUpdated: Function },
    setup(e) {
      const t = gt()
      return (
        so(() => {
          var n
          ;(n = e.onContentUpdated) == null || n.call(e)
        }),
        () =>
          jn('div', { style: { position: 'relative' } }, [
            t.component ? jn(t.component) : null
          ])
      )
    }
  }),
  ue = yr
var ai
const gn = typeof window < 'u',
  Lc = e => typeof e == 'string',
  Ic = () => {}
gn &&
  (ai = window == null ? void 0 : window.navigator) != null &&
  ai.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent)
function Mc(e) {
  return typeof e == 'function' ? e() : p(e)
}
function Nc(e) {
  return e
}
function wr(e) {
  return xi() ? (tl(e), !0) : !1
}
function Bc(e) {
  return typeof e == 'function' ? K(e) : oe(e)
}
function Oc(e, t = !0) {
  os() ? Ie(e) : t ? e() : to(e)
}
function Fc(e) {
  var t
  const n = Mc(e)
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const co = gn ? window : void 0
gn && window.document
gn && window.navigator
gn && window.location
function Hc(...e) {
  let t, n, s, o
  if (
    (Lc(e[0]) || Array.isArray(e[0])
      ? (([n, s, o] = e), (t = co))
      : ([t, n, s, o] = e),
    !t)
  )
    return Ic
  Array.isArray(n) || (n = [n]), Array.isArray(s) || (s = [s])
  const i = [],
    r = () => {
      i.forEach(h => h()), (i.length = 0)
    },
    l = (h, _, g) => (
      h.addEventListener(_, g, o), () => h.removeEventListener(_, g, o)
    ),
    a = Je(
      () => Fc(t),
      h => {
        r(), h && i.push(...n.flatMap(_ => s.map(g => l(h, _, g))))
      },
      { immediate: !0, flush: 'post' }
    ),
    u = () => {
      a(), r()
    }
  return wr(u), u
}
function Rc(e, t = !1) {
  const n = oe(),
    s = () => (n.value = Boolean(e()))
  return s(), Oc(s, t), n
}
function Bs(e, t = {}) {
  const { window: n = co } = t,
    s = Rc(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function')
  let o
  const i = oe(!1),
    r = () => {
      o &&
        ('removeEventListener' in o
          ? o.removeEventListener('change', l)
          : o.removeListener(l))
    },
    l = () => {
      s.value &&
        (r(),
        (o = n.matchMedia(Bc(e).value)),
        (i.value = o.matches),
        'addEventListener' in o
          ? o.addEventListener('change', l)
          : o.addListener(l))
    }
  return Lt(l), wr(() => r()), i
}
const Os =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Fs = '__vueuse_ssr_handlers__'
Os[Fs] = Os[Fs] || {}
Os[Fs]
var ci
;(function (e) {
  ;(e.UP = 'UP'),
    (e.RIGHT = 'RIGHT'),
    (e.DOWN = 'DOWN'),
    (e.LEFT = 'LEFT'),
    (e.NONE = 'NONE')
})(ci || (ci = {}))
var jc = Object.defineProperty,
  ui = Object.getOwnPropertySymbols,
  Dc = Object.prototype.hasOwnProperty,
  Uc = Object.prototype.propertyIsEnumerable,
  fi = (e, t, n) =>
    t in e
      ? jc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  zc = (e, t) => {
    for (var n in t || (t = {})) Dc.call(t, n) && fi(e, n, t[n])
    if (ui) for (var n of ui(t)) Uc.call(t, n) && fi(e, n, t[n])
    return e
  }
const Kc = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
}
zc({ linear: Nc }, Kc)
function Wc({ window: e = co } = {}) {
  if (!e) return { x: oe(0), y: oe(0) }
  const t = oe(e.pageXOffset),
    n = oe(e.pageYOffset)
  return (
    Hc(
      e,
      'scroll',
      () => {
        ;(t.value = e.pageXOffset), (n.value = e.pageYOffset)
      },
      { capture: !1, passive: !0 }
    ),
    { x: t, y: n }
  )
}
function qc(e, t) {
  let n,
    s = !1
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1
          }, t))
  }
}
function Hs(e) {
  return /^\//.test(e) ? e : `/${e}`
}
function mn(e) {
  if (mr(e)) return e.replace(bc, '')
  const { site: t } = ue(),
    { pathname: n, search: s, hash: o } = new URL(e, 'http://example.com'),
    i =
      n.endsWith('/') || n.endsWith('.html')
        ? e
        : e.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${n.replace(
              /(\.md)?$/,
              t.value.cleanUrls ? '' : '.html'
            )}${s}${o}`
          )
  return _n(i)
}
function kr(e, t) {
  if (Array.isArray(e)) return e
  if (e == null) return []
  t = Hs(t)
  const n = Object.keys(e)
    .sort((s, o) => o.split('/').length - s.split('/').length)
    .find(s => t.startsWith(Hs(s)))
  return n ? e[n] : []
}
function Gc(e) {
  const t = []
  let n = 0
  for (const s in e) {
    const o = e[s]
    if (o.items) {
      n = t.push(o)
      continue
    }
    t[n] || t.push({ items: [] }), t[n].items.push(o)
  }
  return t
}
function Yc(e) {
  const t = []
  function n(s) {
    for (const o of s)
      o.text && o.link && t.push({ text: o.text, link: o.link }),
        o.items && n(o.items)
  }
  return n(e), t
}
function Rs(e, t) {
  return Array.isArray(t)
    ? t.some(n => Rs(e, n))
    : It(e, t.link)
    ? !0
    : t.items
    ? Rs(e, t.items)
    : !1
}
function rt() {
  const e = gt(),
    { theme: t, frontmatter: n } = ue(),
    s = Bs('(min-width: 960px)'),
    o = oe(!1),
    i = K(() => {
      const k = t.value.sidebar,
        j = e.data.relativePath
      return k ? kr(k, j) : []
    }),
    r = K(
      () =>
        n.value.sidebar !== !1 &&
        i.value.length > 0 &&
        n.value.layout !== 'home'
    ),
    l = K(() => n.value.layout !== 'home' && n.value.aside !== !1),
    a = K(() => r.value && s.value),
    u = K(() => (r.value ? Gc(i.value) : []))
  function h() {
    o.value = !0
  }
  function _() {
    o.value = !1
  }
  function g() {
    o.value ? _() : h()
  }
  return {
    isOpen: o,
    sidebar: i,
    sidebarGroups: u,
    hasSidebar: r,
    hasAside: l,
    isSidebarEnabled: a,
    open: h,
    close: _,
    toggle: g
  }
}
function Qc(e, t) {
  let n
  Lt(() => {
    n = e.value ? document.activeElement : void 0
  }),
    Ie(() => {
      window.addEventListener('keyup', s)
    }),
    vt(() => {
      window.removeEventListener('keyup', s)
    })
  function s(o) {
    o.key === 'Escape' && e.value && (t(), n == null || n.focus())
  }
}
function Xc(e) {
  const { page: t } = ue(),
    n = oe(!1),
    s = K(() => e.value.collapsed != null),
    o = K(() => !!e.value.link),
    i = K(() => It(t.value.relativePath, e.value.link)),
    r = K(() =>
      i.value
        ? !0
        : e.value.items
        ? Rs(t.value.relativePath, e.value.items)
        : !1
    ),
    l = K(() => !!(e.value.items && e.value.items.length))
  Lt(() => {
    n.value = !!(s.value && e.value.collapsed)
  }),
    Lt(() => {
      ;(i.value || r.value) && (n.value = !1)
    })
  function a() {
    s.value && (n.value = !n.value)
  }
  return {
    collapsed: n,
    collapsible: s,
    isLink: o,
    isActiveLink: i,
    hasActiveLink: r,
    hasChildren: l,
    toggle: a
  }
}
const Jc = O({
  __name: 'VPSkipLink',
  setup(e) {
    const t = gt(),
      n = oe()
    Je(
      () => t.path,
      () => n.value.focus()
    )
    function s({ target: o }) {
      const i = document.querySelector(o.hash)
      if (i) {
        const r = () => {
          i.removeAttribute('tabindex'), i.removeEventListener('blur', r)
        }
        i.setAttribute('tabindex', '-1'),
          i.addEventListener('blur', r),
          i.focus(),
          window.scrollTo(0, 0)
      }
    }
    return (o, i) => (
      d(),
      v(
        Q,
        null,
        [
          b(
            'span',
            { ref_key: 'backToTop', ref: n, tabindex: '-1' },
            null,
            512
          ),
          b(
            'a',
            {
              href: '#VPContent',
              class: 'VPSkipLink visually-hidden',
              onClick: s
            },
            ' Skip to content '
          )
        ],
        64
      )
    )
  }
})
const Zc = B(Jc, [['__scopeId', 'data-v-d9417cee']]),
  eu = { key: 0, class: 'VPBackdrop' },
  tu = O({
    __name: 'VPBackdrop',
    props: { show: { type: Boolean } },
    setup(e) {
      return (t, n) => (
        d(),
        W(
          is,
          { name: 'fade' },
          { default: L(() => [e.show ? (d(), v('div', eu)) : R('', !0)]), _: 1 }
        )
      )
    }
  })
const nu = B(tu, [['__scopeId', 'data-v-32f795ad']])
function su() {
  const e = oe(!1)
  function t() {
    ;(e.value = !0), window.addEventListener('resize', o)
  }
  function n() {
    ;(e.value = !1), window.removeEventListener('resize', o)
  }
  function s() {
    e.value ? n() : t()
  }
  function o() {
    window.outerWidth >= 768 && n()
  }
  const i = gt()
  return (
    Je(() => i.path, n),
    { isScreenOpen: e, openScreen: t, closeScreen: n, toggleScreen: s }
  )
}
function bn({ removeCurrent: e = !0, correspondingLink: t = !1 } = {}) {
  const { site: n, localeIndex: s, page: o, theme: i } = ue(),
    r = K(() => {
      var a, u
      return {
        label: (a = n.value.locales[s.value]) == null ? void 0 : a.label,
        link:
          ((u = n.value.locales[s.value]) == null ? void 0 : u.link) ||
          (s.value === 'root' ? '/' : `/${s.value}/`)
      }
    })
  return {
    localeLinks: K(() =>
      Object.entries(n.value.locales).flatMap(([a, u]) =>
        e && r.value.label === u.label
          ? []
          : {
              text: u.label,
              link: ou(
                u.link || (a === 'root' ? '/' : `/${a}/`),
                i.value.i18nRouting !== !1 && t,
                o.value.relativePath.slice(r.value.link.length - 1),
                !n.value.cleanUrls
              )
            }
      )
    ),
    currentLang: r
  }
}
function ou(e, t, n, s) {
  return t
    ? e.replace(/\/$/, '') +
        Hs(
          n.replace(/(^|\/)?index.md$/, '$1').replace(/\.md$/, s ? '.html' : '')
        )
    : e
}
const iu = ['src', 'alt'],
  ru = { inheritAttrs: !1 },
  lu = O({
    ...ru,
    __name: 'VPImage',
    props: { image: null, alt: null },
    setup(e) {
      return (t, n) => {
        const s = je('VPImage', !0)
        return e.image
          ? (d(),
            v(
              Q,
              { key: 0 },
              [
                typeof e.image == 'string' || 'src' in e.image
                  ? (d(),
                    v(
                      'img',
                      In(
                        { key: 0, class: 'VPImage' },
                        typeof e.image == 'string'
                          ? t.$attrs
                          : { ...e.image, ...t.$attrs },
                        {
                          src: p(_n)(
                            typeof e.image == 'string' ? e.image : e.image.src
                          ),
                          alt:
                            e.alt ??
                            (typeof e.image == 'string'
                              ? ''
                              : e.image.alt || '')
                        }
                      ),
                      null,
                      16,
                      iu
                    ))
                  : (d(),
                    v(
                      Q,
                      { key: 1 },
                      [
                        V(
                          s,
                          In(
                            {
                              class: 'dark',
                              image: e.image.dark,
                              alt: e.image.alt
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ['image', 'alt']
                        ),
                        V(
                          s,
                          In(
                            {
                              class: 'light',
                              image: e.image.light,
                              alt: e.image.alt
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ['image', 'alt']
                        )
                      ],
                      64
                    ))
              ],
              64
            ))
          : R('', !0)
      }
    }
  })
const uo = B(lu, [['__scopeId', 'data-v-9498dcaf']]),
  au = ['href'],
  cu = O({
    __name: 'VPNavBarTitle',
    setup(e) {
      const { site: t, theme: n } = ue(),
        { hasSidebar: s } = rt(),
        { currentLang: o } = bn()
      return (i, r) => (
        d(),
        v(
          'div',
          { class: me(['VPNavBarTitle', { 'has-sidebar': p(s) }]) },
          [
            b(
              'a',
              { class: 'title', href: p(mn)(p(o).link) },
              [
                S(i.$slots, 'nav-bar-title-before', {}, void 0, !0),
                p(n).logo
                  ? (d(),
                    W(
                      uo,
                      { key: 0, class: 'logo', image: p(n).logo },
                      null,
                      8,
                      ['image']
                    ))
                  : R('', !0),
                p(n).siteTitle
                  ? (d(), v(Q, { key: 1 }, [Ee(ie(p(n).siteTitle), 1)], 64))
                  : p(n).siteTitle === void 0
                  ? (d(), v(Q, { key: 2 }, [Ee(ie(p(t).title), 1)], 64))
                  : R('', !0),
                S(i.$slots, 'nav-bar-title-after', {}, void 0, !0)
              ],
              8,
              au
            )
          ],
          2
        )
      )
    }
  })
const uu = B(cu, [['__scopeId', 'data-v-1f611634']])
const fu = { key: 0, class: 'VPNavBarSearch' },
  du = {
    type: 'button',
    class: 'DocSearch DocSearch-Button',
    'aria-label': 'Search'
  },
  hu = { class: 'DocSearch-Button-Container' },
  pu = b(
    'svg',
    {
      class: 'DocSearch-Search-Icon',
      width: '20',
      height: '20',
      viewBox: '0 0 20 20'
    },
    [
      b('path', {
        d: 'M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z',
        stroke: 'currentColor',
        fill: 'none',
        'fill-rule': 'evenodd',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ],
    -1
  ),
  _u = { class: 'DocSearch-Button-Placeholder' },
  mu = b(
    'span',
    { class: 'DocSearch-Button-Keys' },
    [
      b('kbd', { class: 'DocSearch-Button-Key' }),
      b('kbd', { class: 'DocSearch-Button-Key' }, 'K')
    ],
    -1
  ),
  vu = O({
    __name: 'VPNavBarSearch',
    setup(e) {
      tc(u => ({ '6ed372c8': i.value }))
      const t = () => null,
        { theme: n, localeIndex: s } = ue(),
        o = oe(!1),
        i = oe("'Meta'"),
        r = K(() => {
          var u, h, _, g, k, j, N, J
          return (
            ((k =
              (g =
                (_ =
                  (h = (u = n.value.algolia) == null ? void 0 : u.locales) ==
                  null
                    ? void 0
                    : h[s.value]) == null
                  ? void 0
                  : _.translations) == null
                ? void 0
                : g.button) == null
              ? void 0
              : k.buttonText) ||
            ((J =
              (N = (j = n.value.algolia) == null ? void 0 : j.translations) ==
              null
                ? void 0
                : N.button) == null
              ? void 0
              : J.buttonText) ||
            'Search'
          )
        })
      Ie(() => {
        if (!n.value.algolia) return
        i.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
          ? "'⌘'"
          : "'Ctrl'"
        const u = _ => {
            _.key === 'k' &&
              (_.ctrlKey || _.metaKey) &&
              (_.preventDefault(), l(), h())
          },
          h = () => {
            window.removeEventListener('keydown', u)
          }
        window.addEventListener('keydown', u), vt(h)
      })
      function l() {
        o.value || ((o.value = !0), setTimeout(a, 16))
      }
      function a() {
        const u = new Event('keydown')
        ;(u.key = 'k'),
          (u.metaKey = !0),
          window.dispatchEvent(u),
          setTimeout(() => {
            document.querySelector('.DocSearch-Modal') || a()
          }, 16)
      }
      return (
        Ie(() => {
          const u = 'VPAlgoliaPreconnect'
          ;(window.requestIdleCallback || setTimeout)(() => {
            if (!n.value.algolia || document.head.querySelector(`#${u}`)) return
            const _ = document.createElement('link')
            ;(_.id = u),
              (_.rel = 'preconnect'),
              (_.href = `https://${n.value.algolia.appId}-dsn.algolia.net`),
              (_.crossOrigin = ''),
              document.head.appendChild(_)
          })
        }),
        (u, h) =>
          p(n).algolia
            ? (d(),
              v('div', fu, [
                o.value
                  ? (d(),
                    W(p(t), { key: 0, algolia: p(n).algolia }, null, 8, [
                      'algolia'
                    ]))
                  : (d(),
                    v('div', { key: 1, id: 'docsearch', onClick: l }, [
                      b('button', du, [
                        b('span', hu, [pu, b('span', _u, ie(p(r)), 1)]),
                        mu
                      ])
                    ]))
              ]))
            : R('', !0)
      )
    }
  })
const gu = {},
  bu = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    height: '24px',
    viewBox: '0 0 24 24',
    width: '24px'
  },
  yu = b('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }, null, -1),
  xu = b(
    'path',
    { d: 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z' },
    null,
    -1
  ),
  $u = [yu, xu]
function wu(e, t) {
  return d(), v('svg', bu, $u)
}
const ku = B(gu, [['render', wu]]),
  Pu = O({
    __name: 'VPLink',
    props: { tag: null, href: null, noIcon: { type: Boolean } },
    setup(e) {
      const t = e,
        n = K(() => (t.tag ?? t.href ? 'a' : 'span')),
        s = K(() => t.href && rs.test(t.href))
      return (o, i) => (
        d(),
        W(
          dn(p(n)),
          {
            class: me(['VPLink', { link: e.href }]),
            href: e.href ? p(mn)(e.href) : void 0,
            target: p(s) ? '_blank' : void 0,
            rel: p(s) ? 'noreferrer' : void 0
          },
          {
            default: L(() => [
              S(o.$slots, 'default', {}, void 0, !0),
              p(s) && !e.noIcon
                ? (d(), W(ku, { key: 0, class: 'icon' }))
                : R('', !0)
            ]),
            _: 3
          },
          8,
          ['class', 'href', 'target', 'rel']
        )
      )
    }
  })
const bt = B(Pu, [['__scopeId', 'data-v-d0a0207f']]),
  Cu = O({
    __name: 'VPNavBarMenuLink',
    props: { item: null },
    setup(e) {
      const { page: t } = ue()
      return (n, s) => (
        d(),
        W(
          bt,
          {
            class: me({
              VPNavBarMenuLink: !0,
              active: p(It)(
                p(t).relativePath,
                e.item.activeMatch || e.item.link,
                !!e.item.activeMatch
              )
            }),
            href: e.item.link,
            noIcon: !0
          },
          { default: L(() => [Ee(ie(e.item.text), 1)]), _: 1 },
          8,
          ['class', 'href']
        )
      )
    }
  })
const Su = B(Cu, [['__scopeId', 'data-v-d88376ef']]),
  fo = oe()
let Pr = !1,
  ys = 0
function Eu(e) {
  const t = oe(!1)
  if (ke) {
    !Pr && Au(), ys++
    const n = Je(fo, s => {
      var o, i, r
      s === e.el.value || ((o = e.el.value) != null && o.contains(s))
        ? ((t.value = !0), (i = e.onFocus) == null || i.call(e))
        : ((t.value = !1), (r = e.onBlur) == null || r.call(e))
    })
    vt(() => {
      n(), ys--, ys || Vu()
    })
  }
  return Xs(t)
}
function Au() {
  document.addEventListener('focusin', Cr),
    (Pr = !0),
    (fo.value = document.activeElement)
}
function Vu() {
  document.removeEventListener('focusin', Cr)
}
function Cr() {
  fo.value = document.activeElement
}
const Tu = {},
  Lu = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  Iu = b(
    'path',
    {
      d: 'M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z'
    },
    null,
    -1
  ),
  Mu = [Iu]
function Nu(e, t) {
  return d(), v('svg', Lu, Mu)
}
const Sr = B(Tu, [['render', Nu]]),
  Bu = {},
  Ou = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  Fu = b('circle', { cx: '12', cy: '12', r: '2' }, null, -1),
  Hu = b('circle', { cx: '19', cy: '12', r: '2' }, null, -1),
  Ru = b('circle', { cx: '5', cy: '12', r: '2' }, null, -1),
  ju = [Fu, Hu, Ru]
function Du(e, t) {
  return d(), v('svg', Ou, ju)
}
const Uu = B(Bu, [['render', Du]]),
  zu = { class: 'VPMenuLink' },
  Ku = O({
    __name: 'VPMenuLink',
    props: { item: null },
    setup(e) {
      const { page: t } = ue()
      return (n, s) => (
        d(),
        v('div', zu, [
          V(
            bt,
            {
              class: me({
                active: p(It)(
                  p(t).relativePath,
                  e.item.activeMatch || e.item.link,
                  !!e.item.activeMatch
                )
              }),
              href: e.item.link
            },
            { default: L(() => [Ee(ie(e.item.text), 1)]), _: 1 },
            8,
            ['class', 'href']
          )
        ])
      )
    }
  })
const ls = B(Ku, [['__scopeId', 'data-v-02855057']]),
  Wu = { class: 'VPMenuGroup' },
  qu = { key: 0, class: 'title' },
  Gu = O({
    __name: 'VPMenuGroup',
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        d(),
        v('div', Wu, [
          e.text ? (d(), v('p', qu, ie(e.text), 1)) : R('', !0),
          (d(!0),
          v(
            Q,
            null,
            Ae(
              e.items,
              s => (
                d(),
                v(
                  Q,
                  null,
                  [
                    'link' in s
                      ? (d(), W(ls, { key: 0, item: s }, null, 8, ['item']))
                      : R('', !0)
                  ],
                  64
                )
              )
            ),
            256
          ))
        ])
      )
    }
  })
const Yu = B(Gu, [['__scopeId', 'data-v-7e271807']]),
  Qu = { class: 'VPMenu' },
  Xu = { key: 0, class: 'items' },
  Ju = O({
    __name: 'VPMenu',
    props: { items: null },
    setup(e) {
      return (t, n) => (
        d(),
        v('div', Qu, [
          e.items
            ? (d(),
              v('div', Xu, [
                (d(!0),
                v(
                  Q,
                  null,
                  Ae(
                    e.items,
                    s => (
                      d(),
                      v(
                        Q,
                        { key: s.text },
                        [
                          'link' in s
                            ? (d(),
                              W(ls, { key: 0, item: s }, null, 8, ['item']))
                            : (d(),
                              W(
                                Yu,
                                { key: 1, text: s.text, items: s.items },
                                null,
                                8,
                                ['text', 'items']
                              ))
                        ],
                        64
                      )
                    )
                  ),
                  128
                ))
              ]))
            : R('', !0),
          S(t.$slots, 'default', {}, void 0, !0)
        ])
      )
    }
  })
const Zu = B(Ju, [['__scopeId', 'data-v-82bf798f']]),
  ef = ['aria-expanded', 'aria-label'],
  tf = { key: 0, class: 'text' },
  nf = { class: 'menu' },
  sf = O({
    __name: 'VPFlyout',
    props: { icon: null, button: null, label: null, items: null },
    setup(e) {
      const t = oe(!1),
        n = oe()
      Eu({ el: n, onBlur: s })
      function s() {
        t.value = !1
      }
      return (o, i) => (
        d(),
        v(
          'div',
          {
            class: 'VPFlyout',
            ref_key: 'el',
            ref: n,
            onMouseenter: i[1] || (i[1] = r => (t.value = !0)),
            onMouseleave: i[2] || (i[2] = r => (t.value = !1))
          },
          [
            b(
              'button',
              {
                type: 'button',
                class: 'button',
                'aria-haspopup': 'true',
                'aria-expanded': t.value,
                'aria-label': e.label,
                onClick: i[0] || (i[0] = r => (t.value = !t.value))
              },
              [
                e.button || e.icon
                  ? (d(),
                    v('span', tf, [
                      e.icon
                        ? (d(), W(dn(e.icon), { key: 0, class: 'option-icon' }))
                        : R('', !0),
                      Ee(' ' + ie(e.button) + ' ', 1),
                      V(Sr, { class: 'text-icon' })
                    ]))
                  : (d(), W(Uu, { key: 1, class: 'icon' }))
              ],
              8,
              ef
            ),
            b('div', nf, [
              V(
                Zu,
                { items: e.items },
                {
                  default: L(() => [S(o.$slots, 'default', {}, void 0, !0)]),
                  _: 3
                },
                8,
                ['items']
              )
            ])
          ],
          544
        )
      )
    }
  })
const ho = B(sf, [['__scopeId', 'data-v-7b2f5db1']]),
  of = O({
    __name: 'VPNavBarMenuGroup',
    props: { item: null },
    setup(e) {
      const { page: t } = ue()
      return (n, s) => (
        d(),
        W(
          ho,
          {
            class: me({
              VPNavBarMenuGroup: !0,
              active: p(It)(
                p(t).relativePath,
                e.item.activeMatch,
                !!e.item.activeMatch
              )
            }),
            button: e.item.text,
            items: e.item.items
          },
          null,
          8,
          ['class', 'button', 'items']
        )
      )
    }
  }),
  rf = e => (et('data-v-68f20f79'), (e = e()), tt(), e),
  lf = {
    key: 0,
    'aria-labelledby': 'main-nav-aria-label',
    class: 'VPNavBarMenu'
  },
  af = rf(() =>
    b(
      'span',
      { id: 'main-nav-aria-label', class: 'visually-hidden' },
      'Main Navigation',
      -1
    )
  ),
  cf = O({
    __name: 'VPNavBarMenu',
    setup(e) {
      const { theme: t } = ue()
      return (n, s) =>
        p(t).nav
          ? (d(),
            v('nav', lf, [
              af,
              (d(!0),
              v(
                Q,
                null,
                Ae(
                  p(t).nav,
                  o => (
                    d(),
                    v(
                      Q,
                      { key: o.text },
                      [
                        'link' in o
                          ? (d(), W(Su, { key: 0, item: o }, null, 8, ['item']))
                          : (d(), W(of, { key: 1, item: o }, null, 8, ['item']))
                      ],
                      64
                    )
                  )
                ),
                128
              ))
            ]))
          : R('', !0)
    }
  })
const uf = B(cf, [['__scopeId', 'data-v-68f20f79']]),
  ff = {},
  df = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  hf = b('path', { d: 'M0 0h24v24H0z', fill: 'none' }, null, -1),
  pf = b(
    'path',
    {
      d: ' M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ',
      class: 'css-c4d79v'
    },
    null,
    -1
  ),
  _f = [hf, pf]
function mf(e, t) {
  return d(), v('svg', df, _f)
}
const Er = B(ff, [['render', mf]]),
  vf = { class: 'items' },
  gf = { class: 'title' },
  bf = O({
    __name: 'VPNavBarTranslations',
    setup(e) {
      const { localeLinks: t, currentLang: n } = bn({ correspondingLink: !0 })
      return (s, o) =>
        p(t).length && p(n).label
          ? (d(),
            W(
              ho,
              { key: 0, class: 'VPNavBarTranslations', icon: Er },
              {
                default: L(() => [
                  b('div', vf, [
                    b('p', gf, ie(p(n).label), 1),
                    (d(!0),
                    v(
                      Q,
                      null,
                      Ae(
                        p(t),
                        i => (
                          d(),
                          W(ls, { key: i.link, item: i }, null, 8, ['item'])
                        )
                      ),
                      128
                    ))
                  ])
                ]),
                _: 1
              }
            ))
          : R('', !0)
    }
  })
const yf = B(bf, [['__scopeId', 'data-v-babb79f9']])
const xf = {},
  $f = { class: 'VPSwitch', type: 'button', role: 'switch' },
  wf = { class: 'check' },
  kf = { key: 0, class: 'icon' }
function Pf(e, t) {
  return (
    d(),
    v('button', $f, [
      b('span', wf, [
        e.$slots.default
          ? (d(), v('span', kf, [S(e.$slots, 'default', {}, void 0, !0)]))
          : R('', !0)
      ])
    ])
  )
}
const Cf = B(xf, [
    ['render', Pf],
    ['__scopeId', 'data-v-081b2e80']
  ]),
  Sf = {},
  Ef = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  Af = ka(
    '<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>',
    9
  ),
  Vf = [Af]
function Tf(e, t) {
  return d(), v('svg', Ef, Vf)
}
const Lf = B(Sf, [['render', Tf]]),
  If = {},
  Mf = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  Nf = b(
    'path',
    {
      d: 'M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z'
    },
    null,
    -1
  ),
  Bf = [Nf]
function Of(e, t) {
  return d(), v('svg', Mf, Bf)
}
const Ff = B(If, [['render', Of]]),
  Hf = O({
    __name: 'VPSwitchAppearance',
    setup(e) {
      const { site: t, isDark: n } = ue(),
        s = oe(!1),
        o = typeof localStorage < 'u' ? i() : () => {}
      Ie(() => {
        s.value = document.documentElement.classList.contains('dark')
      })
      function i() {
        const r = window.matchMedia('(prefers-color-scheme: dark)'),
          l = document.documentElement.classList
        let a = localStorage.getItem(si),
          u =
            (t.value.appearance === 'dark' && a == null) ||
            (a === 'auto' || a == null ? r.matches : a === 'dark')
        r.onchange = g => {
          a === 'auto' && _((u = g.matches))
        }
        function h() {
          _((u = !u)),
            (a = u
              ? r.matches
                ? 'auto'
                : 'dark'
              : r.matches
              ? 'light'
              : 'auto'),
            localStorage.setItem(si, a)
        }
        function _(g) {
          const k = document.createElement('style')
          ;(k.type = 'text/css'),
            k.appendChild(
              document.createTextNode(`:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`)
            ),
            document.head.appendChild(k),
            (s.value = g),
            l[g ? 'add' : 'remove']('dark'),
            window.getComputedStyle(k).opacity,
            document.head.removeChild(k)
        }
        return h
      }
      return (
        Je(s, r => {
          n.value = r
        }),
        (r, l) => (
          d(),
          W(
            Cf,
            {
              class: 'VPSwitchAppearance',
              'aria-label': 'toggle dark mode',
              'aria-checked': s.value,
              onClick: p(o)
            },
            {
              default: L(() => [
                V(Lf, { class: 'sun' }),
                V(Ff, { class: 'moon' })
              ]),
              _: 1
            },
            8,
            ['aria-checked', 'onClick']
          )
        )
      )
    }
  })
const po = B(Hf, [['__scopeId', 'data-v-4d241278']]),
  Rf = { key: 0, class: 'VPNavBarAppearance' },
  jf = O({
    __name: 'VPNavBarAppearance',
    setup(e) {
      const { site: t } = ue()
      return (n, s) =>
        p(t).appearance ? (d(), v('div', Rf, [V(po)])) : R('', !0)
    }
  })
const Df = B(jf, [['__scopeId', 'data-v-b059d53d']]),
  Uf = {
    discord:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
    facebook:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    github:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    instagram:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    linkedin:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    mastodon:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Mastodon</title><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>',
    slack:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
    twitter:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
    youtube:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
  },
  zf = ['href', 'innerHTML'],
  Kf = O({
    __name: 'VPSocialLink',
    props: { icon: null, link: null },
    setup(e) {
      const t = e,
        n = K(() => (typeof t.icon == 'object' ? t.icon.svg : Uf[t.icon]))
      return (s, o) => (
        d(),
        v(
          'a',
          {
            class: 'VPSocialLink',
            href: e.link,
            target: '_blank',
            rel: 'noopener',
            innerHTML: p(n)
          },
          null,
          8,
          zf
        )
      )
    }
  })
const Wf = B(Kf, [['__scopeId', 'data-v-a08f4ef6']]),
  qf = { class: 'VPSocialLinks' },
  Gf = O({
    __name: 'VPSocialLinks',
    props: { links: null },
    setup(e) {
      return (t, n) => (
        d(),
        v('div', qf, [
          (d(!0),
          v(
            Q,
            null,
            Ae(
              e.links,
              ({ link: s, icon: o }) => (
                d(),
                W(Wf, { key: s, icon: o, link: s }, null, 8, ['icon', 'link'])
              )
            ),
            128
          ))
        ])
      )
    }
  })
const _o = B(Gf, [['__scopeId', 'data-v-9e615b79']]),
  Yf = O({
    __name: 'VPNavBarSocialLinks',
    setup(e) {
      const { theme: t } = ue()
      return (n, s) =>
        p(t).socialLinks
          ? (d(),
            W(
              _o,
              { key: 0, class: 'VPNavBarSocialLinks', links: p(t).socialLinks },
              null,
              8,
              ['links']
            ))
          : R('', !0)
    }
  })
const Qf = B(Yf, [['__scopeId', 'data-v-6cbf2b21']]),
  Xf = { key: 0, class: 'group' },
  Jf = { class: 'trans-title' },
  Zf = { key: 1, class: 'group' },
  ed = { class: 'item appearance' },
  td = { class: 'label' },
  nd = { class: 'appearance-action' },
  sd = { key: 2, class: 'group' },
  od = { class: 'item social-links' },
  id = O({
    __name: 'VPNavBarExtra',
    setup(e) {
      const { site: t, theme: n } = ue(),
        { localeLinks: s, currentLang: o } = bn({ correspondingLink: !0 }),
        i = K(
          () =>
            (s.value.length && o.value.label) ||
            t.value.appearance ||
            n.value.socialLinks
        )
      return (r, l) =>
        p(i)
          ? (d(),
            W(
              ho,
              { key: 0, class: 'VPNavBarExtra', label: 'extra navigation' },
              {
                default: L(() => [
                  p(s).length && p(o).label
                    ? (d(),
                      v('div', Xf, [
                        b('p', Jf, ie(p(o).label), 1),
                        (d(!0),
                        v(
                          Q,
                          null,
                          Ae(
                            p(s),
                            a => (
                              d(),
                              W(ls, { key: a.link, item: a }, null, 8, ['item'])
                            )
                          ),
                          128
                        ))
                      ]))
                    : R('', !0),
                  p(t).appearance
                    ? (d(),
                      v('div', Zf, [
                        b('div', ed, [
                          b(
                            'p',
                            td,
                            ie(p(n).darkModeSwitchLabel || 'Appearance'),
                            1
                          ),
                          b('div', nd, [V(po)])
                        ])
                      ]))
                    : R('', !0),
                  p(n).socialLinks
                    ? (d(),
                      v('div', sd, [
                        b('div', od, [
                          V(
                            _o,
                            {
                              class: 'social-links-list',
                              links: p(n).socialLinks
                            },
                            null,
                            8,
                            ['links']
                          )
                        ])
                      ]))
                    : R('', !0)
                ]),
                _: 1
              }
            ))
          : R('', !0)
    }
  })
const rd = B(id, [['__scopeId', 'data-v-ce275be6']]),
  ld = e => (et('data-v-506a72fa'), (e = e()), tt(), e),
  ad = ['aria-expanded'],
  cd = ld(() =>
    b(
      'span',
      { class: 'container' },
      [
        b('span', { class: 'top' }),
        b('span', { class: 'middle' }),
        b('span', { class: 'bottom' })
      ],
      -1
    )
  ),
  ud = [cd],
  fd = O({
    __name: 'VPNavBarHamburger',
    props: { active: { type: Boolean } },
    emits: ['click'],
    setup(e) {
      return (t, n) => (
        d(),
        v(
          'button',
          {
            type: 'button',
            class: me(['VPNavBarHamburger', { active: e.active }]),
            'aria-label': 'mobile navigation',
            'aria-expanded': e.active,
            'aria-controls': 'VPNavScreen',
            onClick: n[0] || (n[0] = s => t.$emit('click'))
          },
          ud,
          10,
          ad
        )
      )
    }
  })
const dd = B(fd, [['__scopeId', 'data-v-506a72fa']]),
  hd = e => (et('data-v-b9f5bb62'), (e = e()), tt(), e),
  pd = { class: 'container' },
  _d = { class: 'title' },
  md = { class: 'content' },
  vd = hd(() => b('div', { class: 'curtain' }, null, -1)),
  gd = { class: 'content-body' },
  bd = O({
    __name: 'VPNavBar',
    props: { isScreenOpen: { type: Boolean } },
    emits: ['toggle-screen'],
    setup(e) {
      const { y: t } = Wc(),
        { hasSidebar: n } = rt(),
        s = K(() => ({ 'has-sidebar': n.value, fill: t.value > 0 }))
      return (o, i) => (
        d(),
        v(
          'div',
          { class: me(['VPNavBar', p(s)]) },
          [
            b('div', pd, [
              b('div', _d, [
                V(uu, null, {
                  'nav-bar-title-before': L(() => [
                    S(o.$slots, 'nav-bar-title-before', {}, void 0, !0)
                  ]),
                  'nav-bar-title-after': L(() => [
                    S(o.$slots, 'nav-bar-title-after', {}, void 0, !0)
                  ]),
                  _: 3
                })
              ]),
              b('div', md, [
                vd,
                b('div', gd, [
                  S(o.$slots, 'nav-bar-content-before', {}, void 0, !0),
                  V(vu, { class: 'search' }),
                  V(uf, { class: 'menu' }),
                  V(yf, { class: 'translations' }),
                  V(Df, { class: 'appearance' }),
                  V(Qf, { class: 'social-links' }),
                  V(rd, { class: 'extra' }),
                  S(o.$slots, 'nav-bar-content-after', {}, void 0, !0),
                  V(
                    dd,
                    {
                      class: 'hamburger',
                      active: e.isScreenOpen,
                      onClick: i[0] || (i[0] = r => o.$emit('toggle-screen'))
                    },
                    null,
                    8,
                    ['active']
                  )
                ])
              ])
            ])
          ],
          2
        )
      )
    }
  })
const yd = B(bd, [['__scopeId', 'data-v-b9f5bb62']])
function xd(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]
    return n
  } else return Array.from(e)
}
var mo = !1
if (typeof window < 'u') {
  var di = {
    get passive() {
      mo = !0
    }
  }
  window.addEventListener('testPassive', null, di),
    window.removeEventListener('testPassive', null, di)
}
var Dn =
    typeof window < 'u' &&
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1)),
  zt = [],
  Un = !1,
  vo = -1,
  rn = void 0,
  At = void 0,
  ln = void 0,
  Ar = function (t) {
    return zt.some(function (n) {
      return !!(n.options.allowTouchMove && n.options.allowTouchMove(t))
    })
  },
  zn = function (t) {
    var n = t || window.event
    return Ar(n.target) || n.touches.length > 1
      ? !0
      : (n.preventDefault && n.preventDefault(), !1)
  },
  $d = function (t) {
    if (ln === void 0) {
      var n = !!t && t.reserveScrollBarGap === !0,
        s = window.innerWidth - document.documentElement.clientWidth
      if (n && s > 0) {
        var o = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right'),
          10
        )
        ;(ln = document.body.style.paddingRight),
          (document.body.style.paddingRight = o + s + 'px')
      }
    }
    rn === void 0 &&
      ((rn = document.body.style.overflow),
      (document.body.style.overflow = 'hidden'))
  },
  wd = function () {
    ln !== void 0 && ((document.body.style.paddingRight = ln), (ln = void 0)),
      rn !== void 0 && ((document.body.style.overflow = rn), (rn = void 0))
  },
  kd = function () {
    return window.requestAnimationFrame(function () {
      if (At === void 0) {
        At = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left
        }
        var t = window,
          n = t.scrollY,
          s = t.scrollX,
          o = t.innerHeight
        ;(document.body.style.position = 'fixed'),
          (document.body.style.top = -n),
          (document.body.style.left = -s),
          setTimeout(function () {
            return window.requestAnimationFrame(function () {
              var i = o - window.innerHeight
              i && n >= o && (document.body.style.top = -(n + i))
            })
          }, 300)
      }
    })
  },
  Pd = function () {
    if (At !== void 0) {
      var t = -parseInt(document.body.style.top, 10),
        n = -parseInt(document.body.style.left, 10)
      ;(document.body.style.position = At.position),
        (document.body.style.top = At.top),
        (document.body.style.left = At.left),
        window.scrollTo(n, t),
        (At = void 0)
    }
  },
  Cd = function (t) {
    return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1
  },
  Sd = function (t, n) {
    var s = t.targetTouches[0].clientY - vo
    return Ar(t.target)
      ? !1
      : (n && n.scrollTop === 0 && s > 0) || (Cd(n) && s < 0)
      ? zn(t)
      : (t.stopPropagation(), !0)
  },
  Vr = function (t, n) {
    if (!t) {
      console.error(
        'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.'
      )
      return
    }
    if (
      !zt.some(function (o) {
        return o.targetElement === t
      })
    ) {
      var s = { targetElement: t, options: n || {} }
      ;(zt = [].concat(xd(zt), [s])),
        Dn ? kd() : $d(n),
        Dn &&
          ((t.ontouchstart = function (o) {
            o.targetTouches.length === 1 && (vo = o.targetTouches[0].clientY)
          }),
          (t.ontouchmove = function (o) {
            o.targetTouches.length === 1 && Sd(o, t)
          }),
          Un ||
            (document.addEventListener(
              'touchmove',
              zn,
              mo ? { passive: !1 } : void 0
            ),
            (Un = !0)))
    }
  },
  Tr = function () {
    Dn &&
      (zt.forEach(function (t) {
        ;(t.targetElement.ontouchstart = null),
          (t.targetElement.ontouchmove = null)
      }),
      Un &&
        (document.removeEventListener(
          'touchmove',
          zn,
          mo ? { passive: !1 } : void 0
        ),
        (Un = !1)),
      (vo = -1)),
      Dn ? Pd() : wd(),
      (zt = [])
  }
const Ed = O({
  __name: 'VPNavScreenMenuLink',
  props: { text: null, link: null },
  setup(e) {
    const t = qe('close-screen')
    return (n, s) => (
      d(),
      W(
        bt,
        { class: 'VPNavScreenMenuLink', href: e.link, onClick: p(t) },
        { default: L(() => [Ee(ie(e.text), 1)]), _: 1 },
        8,
        ['href', 'onClick']
      )
    )
  }
})
const Ad = B(Ed, [['__scopeId', 'data-v-e1e8fa7c']]),
  Vd = {},
  Td = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  Ld = b(
    'path',
    {
      d: 'M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z'
    },
    null,
    -1
  ),
  Id = [Ld]
function Md(e, t) {
  return d(), v('svg', Td, Id)
}
const Nd = B(Vd, [['render', Md]]),
  Bd = O({
    __name: 'VPNavScreenMenuGroupLink',
    props: { text: null, link: null },
    setup(e) {
      const t = qe('close-screen')
      return (n, s) => (
        d(),
        W(
          bt,
          { class: 'VPNavScreenMenuGroupLink', href: e.link, onClick: p(t) },
          { default: L(() => [Ee(ie(e.text), 1)]), _: 1 },
          8,
          ['href', 'onClick']
        )
      )
    }
  })
const Lr = B(Bd, [['__scopeId', 'data-v-1dd0b5c9']]),
  Od = { class: 'VPNavScreenMenuGroupSection' },
  Fd = { key: 0, class: 'title' },
  Hd = O({
    __name: 'VPNavScreenMenuGroupSection',
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        d(),
        v('div', Od, [
          e.text ? (d(), v('p', Fd, ie(e.text), 1)) : R('', !0),
          (d(!0),
          v(
            Q,
            null,
            Ae(
              e.items,
              s => (
                d(),
                W(Lr, { key: s.text, text: s.text, link: s.link }, null, 8, [
                  'text',
                  'link'
                ])
              )
            ),
            128
          ))
        ])
      )
    }
  })
const Rd = B(Hd, [['__scopeId', 'data-v-a40ac9a4']]),
  jd = ['aria-controls', 'aria-expanded'],
  Dd = { class: 'button-text' },
  Ud = ['id'],
  zd = { key: 1, class: 'group' },
  Kd = O({
    __name: 'VPNavScreenMenuGroup',
    props: { text: null, items: null },
    setup(e) {
      const t = e,
        n = oe(!1),
        s = K(() => `NavScreenGroup-${t.text.replace(' ', '-').toLowerCase()}`)
      function o() {
        n.value = !n.value
      }
      return (i, r) => (
        d(),
        v(
          'div',
          { class: me(['VPNavScreenMenuGroup', { open: n.value }]) },
          [
            b(
              'button',
              {
                class: 'button',
                'aria-controls': p(s),
                'aria-expanded': n.value,
                onClick: o
              },
              [b('span', Dd, ie(e.text), 1), V(Nd, { class: 'button-icon' })],
              8,
              jd
            ),
            b(
              'div',
              { id: p(s), class: 'items' },
              [
                (d(!0),
                v(
                  Q,
                  null,
                  Ae(
                    e.items,
                    l => (
                      d(),
                      v(
                        Q,
                        { key: l.text },
                        [
                          'link' in l
                            ? (d(),
                              v('div', { key: l.text, class: 'item' }, [
                                V(Lr, { text: l.text, link: l.link }, null, 8, [
                                  'text',
                                  'link'
                                ])
                              ]))
                            : (d(),
                              v('div', zd, [
                                V(
                                  Rd,
                                  { text: l.text, items: l.items },
                                  null,
                                  8,
                                  ['text', 'items']
                                )
                              ]))
                        ],
                        64
                      )
                    )
                  ),
                  128
                ))
              ],
              8,
              Ud
            )
          ],
          2
        )
      )
    }
  })
const Wd = B(Kd, [['__scopeId', 'data-v-ed935139']]),
  qd = { key: 0, class: 'VPNavScreenMenu' },
  Gd = O({
    __name: 'VPNavScreenMenu',
    setup(e) {
      const { theme: t } = ue()
      return (n, s) =>
        p(t).nav
          ? (d(),
            v('nav', qd, [
              (d(!0),
              v(
                Q,
                null,
                Ae(
                  p(t).nav,
                  o => (
                    d(),
                    v(
                      Q,
                      { key: o.text },
                      [
                        'link' in o
                          ? (d(),
                            W(
                              Ad,
                              { key: 0, text: o.text, link: o.link },
                              null,
                              8,
                              ['text', 'link']
                            ))
                          : (d(),
                            W(
                              Wd,
                              { key: 1, text: o.text || '', items: o.items },
                              null,
                              8,
                              ['text', 'items']
                            ))
                      ],
                      64
                    )
                  )
                ),
                128
              ))
            ]))
          : R('', !0)
    }
  }),
  Yd = { key: 0, class: 'VPNavScreenAppearance' },
  Qd = { class: 'text' },
  Xd = O({
    __name: 'VPNavScreenAppearance',
    setup(e) {
      const { site: t, theme: n } = ue()
      return (s, o) =>
        p(t).appearance
          ? (d(),
            v('div', Yd, [
              b('p', Qd, ie(p(n).darkModeSwitchLabel || 'Appearance'), 1),
              V(po)
            ]))
          : R('', !0)
    }
  })
const Jd = B(Xd, [['__scopeId', 'data-v-6afefc1c']]),
  Zd = { class: 'list' },
  e0 = O({
    __name: 'VPNavScreenTranslations',
    setup(e) {
      const { localeLinks: t, currentLang: n } = bn({ correspondingLink: !0 }),
        s = oe(!1)
      function o() {
        s.value = !s.value
      }
      return (i, r) =>
        p(t).length && p(n).label
          ? (d(),
            v(
              'div',
              {
                key: 0,
                class: me(['VPNavScreenTranslations', { open: s.value }])
              },
              [
                b('button', { class: 'title', onClick: o }, [
                  V(Er, { class: 'icon lang' }),
                  Ee(' ' + ie(p(n).label) + ' ', 1),
                  V(Sr, { class: 'icon chevron' })
                ]),
                b('ul', Zd, [
                  (d(!0),
                  v(
                    Q,
                    null,
                    Ae(
                      p(t),
                      l => (
                        d(),
                        v('li', { key: l.link, class: 'item' }, [
                          V(
                            bt,
                            { class: 'link', href: l.link },
                            { default: L(() => [Ee(ie(l.text), 1)]), _: 2 },
                            1032,
                            ['href']
                          )
                        ])
                      )
                    ),
                    128
                  ))
                ])
              ],
              2
            ))
          : R('', !0)
    }
  })
const t0 = B(e0, [['__scopeId', 'data-v-3ebf8a3d']]),
  n0 = O({
    __name: 'VPNavScreenSocialLinks',
    setup(e) {
      const { theme: t } = ue()
      return (n, s) =>
        p(t).socialLinks
          ? (d(),
            W(
              _o,
              {
                key: 0,
                class: 'VPNavScreenSocialLinks',
                links: p(t).socialLinks
              },
              null,
              8,
              ['links']
            ))
          : R('', !0)
    }
  }),
  s0 = { class: 'container' },
  o0 = O({
    __name: 'VPNavScreen',
    props: { open: { type: Boolean } },
    setup(e) {
      const t = oe(null)
      function n() {
        Vr(t.value, { reserveScrollBarGap: !0 })
      }
      function s() {
        Tr()
      }
      return (o, i) => (
        d(),
        W(
          is,
          { name: 'fade', onEnter: n, onAfterLeave: s },
          {
            default: L(() => [
              e.open
                ? (d(),
                  v(
                    'div',
                    { key: 0, class: 'VPNavScreen', ref_key: 'screen', ref: t },
                    [
                      b('div', s0, [
                        S(
                          o.$slots,
                          'nav-screen-content-before',
                          {},
                          void 0,
                          !0
                        ),
                        V(Gd, { class: 'menu' }),
                        V(t0, { class: 'translations' }),
                        V(Jd, { class: 'appearance' }),
                        V(n0, { class: 'social-links' }),
                        S(o.$slots, 'nav-screen-content-after', {}, void 0, !0)
                      ])
                    ],
                    512
                  ))
                : R('', !0)
            ]),
            _: 3
          }
        )
      )
    }
  })
const i0 = B(o0, [['__scopeId', 'data-v-f56f8ccc']]),
  r0 = { class: 'VPNav' },
  l0 = O({
    __name: 'VPNav',
    setup(e) {
      const { isScreenOpen: t, closeScreen: n, toggleScreen: s } = su()
      return (
        jt('close-screen', n),
        (o, i) => (
          d(),
          v('header', r0, [
            V(
              yd,
              { 'is-screen-open': p(t), onToggleScreen: p(s) },
              {
                'nav-bar-title-before': L(() => [
                  S(o.$slots, 'nav-bar-title-before', {}, void 0, !0)
                ]),
                'nav-bar-title-after': L(() => [
                  S(o.$slots, 'nav-bar-title-after', {}, void 0, !0)
                ]),
                'nav-bar-content-before': L(() => [
                  S(o.$slots, 'nav-bar-content-before', {}, void 0, !0)
                ]),
                'nav-bar-content-after': L(() => [
                  S(o.$slots, 'nav-bar-content-after', {}, void 0, !0)
                ]),
                _: 3
              },
              8,
              ['is-screen-open', 'onToggleScreen']
            ),
            V(
              i0,
              { open: p(t) },
              {
                'nav-screen-content-before': L(() => [
                  S(o.$slots, 'nav-screen-content-before', {}, void 0, !0)
                ]),
                'nav-screen-content-after': L(() => [
                  S(o.$slots, 'nav-screen-content-after', {}, void 0, !0)
                ]),
                _: 3
              },
              8,
              ['open']
            )
          ])
        )
      )
    }
  })
const a0 = B(l0, [['__scopeId', 'data-v-2d3caaf2']]),
  c0 = {},
  u0 = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  f0 = b(
    'path',
    {
      d: 'M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z'
    },
    null,
    -1
  ),
  d0 = b(
    'path',
    { d: 'M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z' },
    null,
    -1
  ),
  h0 = b(
    'path',
    {
      d: 'M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z'
    },
    null,
    -1
  ),
  p0 = b(
    'path',
    {
      d: 'M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z'
    },
    null,
    -1
  ),
  _0 = [f0, d0, h0, p0]
function m0(e, t) {
  return d(), v('svg', u0, _0)
}
const v0 = B(c0, [['render', m0]]),
  g0 = { key: 0, class: 'VPLocalNav' },
  b0 = ['aria-expanded'],
  y0 = { class: 'menu-text' },
  x0 = O({
    __name: 'VPLocalNav',
    props: { open: { type: Boolean } },
    emits: ['open-menu'],
    setup(e) {
      const { theme: t } = ue(),
        { hasSidebar: n } = rt()
      function s() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
      return (o, i) =>
        p(n)
          ? (d(),
            v('div', g0, [
              b(
                'button',
                {
                  class: 'menu',
                  'aria-expanded': e.open,
                  'aria-controls': 'VPSidebarNav',
                  onClick: i[0] || (i[0] = r => o.$emit('open-menu'))
                },
                [
                  V(v0, { class: 'menu-icon' }),
                  b('span', y0, ie(p(t).sidebarMenuLabel || 'Menu'), 1)
                ],
                8,
                b0
              ),
              b(
                'a',
                { class: 'top-link', href: '#', onClick: s },
                ie(p(t).returnToTopLabel || 'Return to top'),
                1
              )
            ]))
          : R('', !0)
    }
  })
const $0 = B(x0, [['__scopeId', 'data-v-f0cdc7a9']]),
  w0 = {},
  k0 = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
    viewBox: '0 0 24 24'
  },
  P0 = b(
    'path',
    {
      d: 'M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z'
    },
    null,
    -1
  ),
  C0 = [P0]
function S0(e, t) {
  return d(), v('svg', k0, C0)
}
const E0 = B(w0, [['render', S0]]),
  A0 = e => (et('data-v-eba31354'), (e = e()), tt(), e),
  V0 = ['role'],
  T0 = A0(() => b('div', { class: 'indicator' }, null, -1)),
  L0 = { key: 1, class: 'items' },
  I0 = O({
    __name: 'VPSidebarItem',
    props: { item: null, depth: null },
    setup(e) {
      const t = e,
        {
          collapsed: n,
          collapsible: s,
          isLink: o,
          isActiveLink: i,
          hasActiveLink: r,
          hasChildren: l,
          toggle: a
        } = Xc(K(() => t.item)),
        u = K(() => (l.value ? 'section' : 'div')),
        h = K(() => (o.value ? 'a' : 'div')),
        _ = K(() =>
          l.value ? (t.depth + 2 === 7 ? 'p' : `h${t.depth + 2}`) : 'p'
        ),
        g = K(() => (o.value ? void 0 : 'button')),
        k = K(() => [
          [`level-${t.depth}`],
          { collapsible: s.value },
          { collapsed: n.value },
          { 'is-link': o.value },
          { 'is-active': i.value },
          { 'has-active': r.value }
        ])
      function j() {
        !t.item.link && a()
      }
      function N() {
        t.item.link && a()
      }
      return (J, y) => {
        const A = je('VPSidebarItem', !0)
        return (
          d(),
          W(
            dn(p(u)),
            { class: me(['VPSidebarItem', p(k)]) },
            {
              default: L(() => [
                e.item.text
                  ? (d(),
                    v(
                      'div',
                      { key: 0, class: 'item', role: p(g), onClick: j },
                      [
                        T0,
                        V(
                          bt,
                          { tag: p(h), class: 'link', href: e.item.link },
                          {
                            default: L(() => [
                              (d(),
                              W(
                                dn(p(_)),
                                { class: 'text', innerHTML: e.item.text },
                                null,
                                8,
                                ['innerHTML']
                              ))
                            ]),
                            _: 1
                          },
                          8,
                          ['tag', 'href']
                        ),
                        e.item.collapsed != null
                          ? (d(),
                            v(
                              'div',
                              {
                                key: 0,
                                class: 'caret',
                                role: 'button',
                                onClick: N
                              },
                              [V(E0, { class: 'caret-icon' })]
                            ))
                          : R('', !0)
                      ],
                      8,
                      V0
                    ))
                  : R('', !0),
                e.item.items && e.item.items.length
                  ? (d(),
                    v('div', L0, [
                      e.depth < 5
                        ? (d(!0),
                          v(
                            Q,
                            { key: 0 },
                            Ae(
                              e.item.items,
                              M => (
                                d(),
                                W(
                                  A,
                                  { key: M.text, item: M, depth: e.depth + 1 },
                                  null,
                                  8,
                                  ['item', 'depth']
                                )
                              )
                            ),
                            128
                          ))
                        : R('', !0)
                    ]))
                  : R('', !0)
              ]),
              _: 1
            },
            8,
            ['class']
          )
        )
      }
    }
  })
const M0 = B(I0, [['__scopeId', 'data-v-eba31354']]),
  Ir = e => (et('data-v-27584ce4'), (e = e()), tt(), e),
  N0 = Ir(() => b('div', { class: 'curtain' }, null, -1)),
  B0 = {
    class: 'nav',
    id: 'VPSidebarNav',
    'aria-labelledby': 'sidebar-aria-label',
    tabindex: '-1'
  },
  O0 = Ir(() =>
    b(
      'span',
      { class: 'visually-hidden', id: 'sidebar-aria-label' },
      ' Sidebar Navigation ',
      -1
    )
  ),
  F0 = O({
    __name: 'VPSidebar',
    props: { open: { type: Boolean } },
    setup(e) {
      const t = e,
        { sidebarGroups: n, hasSidebar: s } = rt()
      let o = oe(null)
      function i() {
        Vr(o.value, { reserveScrollBarGap: !0 })
      }
      function r() {
        Tr()
      }
      return (
        Ui(async () => {
          var l
          t.open ? (i(), (l = o.value) == null || l.focus()) : r()
        }),
        (l, a) =>
          p(s)
            ? (d(),
              v(
                'aside',
                {
                  key: 0,
                  class: me(['VPSidebar', { open: e.open }]),
                  ref_key: 'navEl',
                  ref: o,
                  onClick: a[0] || (a[0] = hr(() => {}, ['stop']))
                },
                [
                  N0,
                  b('nav', B0, [
                    O0,
                    S(l.$slots, 'sidebar-nav-before', {}, void 0, !0),
                    (d(!0),
                    v(
                      Q,
                      null,
                      Ae(
                        p(n),
                        u => (
                          d(),
                          v('div', { key: u.text, class: 'group' }, [
                            V(M0, { item: u, depth: 0 }, null, 8, ['item'])
                          ])
                        )
                      ),
                      128
                    )),
                    S(l.$slots, 'sidebar-nav-after', {}, void 0, !0)
                  ])
                ],
                2
              ))
            : R('', !0)
      )
    }
  })
const H0 = B(F0, [['__scopeId', 'data-v-27584ce4']]),
  R0 = {},
  j0 = { class: 'VPPage' }
function D0(e, t) {
  const n = je('Content')
  return d(), v('div', j0, [V(n)])
}
const U0 = B(R0, [['render', D0]]),
  z0 = O({
    __name: 'VPButton',
    props: { tag: null, size: null, theme: null, text: null, href: null },
    setup(e) {
      const t = e,
        n = K(() => [t.size ?? 'medium', t.theme ?? 'brand']),
        s = K(() => t.href && rs.test(t.href)),
        o = K(() => (t.tag ? t.tag : t.href ? 'a' : 'button'))
      return (i, r) => (
        d(),
        W(
          dn(p(o)),
          {
            class: me(['VPButton', p(n)]),
            href: e.href ? p(mn)(e.href) : void 0,
            target: p(s) ? '_blank' : void 0,
            rel: p(s) ? 'noreferrer' : void 0
          },
          { default: L(() => [Ee(ie(e.text), 1)]), _: 1 },
          8,
          ['class', 'href', 'target', 'rel']
        )
      )
    }
  })
const K0 = B(z0, [['__scopeId', 'data-v-30737bac']]),
  W0 = e => (et('data-v-f3162aed'), (e = e()), tt(), e),
  q0 = { class: 'container' },
  G0 = { class: 'main' },
  Y0 = { key: 0, class: 'name' },
  Q0 = { class: 'clip' },
  X0 = { key: 1, class: 'text' },
  J0 = { key: 2, class: 'tagline' },
  Z0 = { key: 3, class: 'actions' },
  eh = { key: 0, class: 'image' },
  th = { class: 'image-container' },
  nh = W0(() => b('div', { class: 'image-bg' }, null, -1)),
  sh = O({
    __name: 'VPHero',
    props: {
      name: null,
      text: null,
      tagline: null,
      image: null,
      actions: null
    },
    setup(e) {
      const t = qe('hero-image-slot-exists')
      return (n, s) => (
        d(),
        v(
          'div',
          { class: me(['VPHero', { 'has-image': e.image || p(t) }]) },
          [
            b('div', q0, [
              b('div', G0, [
                e.name
                  ? (d(), v('h1', Y0, [b('span', Q0, ie(e.name), 1)]))
                  : R('', !0),
                e.text ? (d(), v('p', X0, ie(e.text), 1)) : R('', !0),
                e.tagline ? (d(), v('p', J0, ie(e.tagline), 1)) : R('', !0),
                e.actions
                  ? (d(),
                    v('div', Z0, [
                      (d(!0),
                      v(
                        Q,
                        null,
                        Ae(
                          e.actions,
                          o => (
                            d(),
                            v('div', { key: o.link, class: 'action' }, [
                              V(
                                K0,
                                {
                                  tag: 'a',
                                  size: 'medium',
                                  theme: o.theme,
                                  text: o.text,
                                  href: o.link
                                },
                                null,
                                8,
                                ['theme', 'text', 'href']
                              )
                            ])
                          )
                        ),
                        128
                      ))
                    ]))
                  : R('', !0)
              ]),
              e.image || p(t)
                ? (d(),
                  v('div', eh, [
                    b('div', th, [
                      nh,
                      S(
                        n.$slots,
                        'home-hero-image',
                        {},
                        () => [
                          e.image
                            ? (d(),
                              W(
                                uo,
                                { key: 0, class: 'image-src', image: e.image },
                                null,
                                8,
                                ['image']
                              ))
                            : R('', !0)
                        ],
                        !0
                      )
                    ])
                  ]))
                : R('', !0)
            ])
          ],
          2
        )
      )
    }
  })
const oh = B(sh, [['__scopeId', 'data-v-f3162aed']]),
  ih = O({
    __name: 'VPHomeHero',
    setup(e) {
      const { frontmatter: t } = ue()
      return (n, s) =>
        p(t).hero
          ? (d(),
            W(
              oh,
              {
                key: 0,
                class: 'VPHomeHero',
                name: p(t).hero.name,
                text: p(t).hero.text,
                tagline: p(t).hero.tagline,
                image: p(t).hero.image,
                actions: p(t).hero.actions
              },
              {
                'home-hero-image': L(() => [S(n.$slots, 'home-hero-image')]),
                _: 3
              },
              8,
              ['name', 'text', 'tagline', 'image', 'actions']
            ))
          : R('', !0)
    }
  }),
  rh = {},
  lh = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  ah = b(
    'path',
    {
      d: 'M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z'
    },
    null,
    -1
  ),
  ch = [ah]
function uh(e, t) {
  return d(), v('svg', lh, ch)
}
const fh = B(rh, [['render', uh]]),
  dh = { class: 'box' },
  hh = { key: 1, class: 'icon' },
  ph = { class: 'title' },
  _h = { class: 'details' },
  mh = { key: 2, class: 'link-text' },
  vh = { class: 'link-text-value' },
  gh = O({
    __name: 'VPFeature',
    props: {
      icon: null,
      title: null,
      details: null,
      link: null,
      linkText: null
    },
    setup(e) {
      return (t, n) => (
        d(),
        W(
          bt,
          { class: 'VPFeature', href: e.link, 'no-icon': !0 },
          {
            default: L(() => [
              b('article', dh, [
                typeof e.icon == 'object'
                  ? (d(),
                    W(
                      uo,
                      {
                        key: 0,
                        image: e.icon,
                        alt: e.icon.alt,
                        height: e.icon.height,
                        width: e.icon.width
                      },
                      null,
                      8,
                      ['image', 'alt', 'height', 'width']
                    ))
                  : e.icon
                  ? (d(), v('div', hh, ie(e.icon), 1))
                  : R('', !0),
                b('h2', ph, ie(e.title), 1),
                b('p', _h, ie(e.details), 1),
                e.linkText
                  ? (d(),
                    v('div', mh, [
                      b('p', vh, [
                        Ee(ie(e.linkText) + ' ', 1),
                        V(fh, { class: 'link-text-icon' })
                      ])
                    ]))
                  : R('', !0)
              ])
            ]),
            _: 1
          },
          8,
          ['href']
        )
      )
    }
  })
const bh = B(gh, [['__scopeId', 'data-v-3fe44174']]),
  yh = { key: 0, class: 'VPFeatures' },
  xh = { class: 'container' },
  $h = { class: 'items' },
  wh = O({
    __name: 'VPFeatures',
    props: { features: null },
    setup(e) {
      const t = e,
        n = K(() => {
          const s = t.features.length
          if (s) {
            if (s === 2) return 'grid-2'
            if (s === 3) return 'grid-3'
            if (s % 3 === 0) return 'grid-6'
            if (s % 2 === 0) return 'grid-4'
          } else return
        })
      return (s, o) =>
        e.features
          ? (d(),
            v('div', yh, [
              b('div', xh, [
                b('div', $h, [
                  (d(!0),
                  v(
                    Q,
                    null,
                    Ae(
                      e.features,
                      i => (
                        d(),
                        v(
                          'div',
                          { key: i.title, class: me(['item', [p(n)]]) },
                          [
                            V(
                              bh,
                              {
                                icon: i.icon,
                                title: i.title,
                                details: i.details,
                                link: i.link,
                                'link-text': i.linkText
                              },
                              null,
                              8,
                              ['icon', 'title', 'details', 'link', 'link-text']
                            )
                          ],
                          2
                        )
                      )
                    ),
                    128
                  ))
                ])
              ])
            ]))
          : R('', !0)
    }
  })
const kh = B(wh, [['__scopeId', 'data-v-adc9add7']]),
  Ph = O({
    __name: 'VPHomeFeatures',
    setup(e) {
      const { frontmatter: t } = ue()
      return (n, s) =>
        p(t).features
          ? (d(),
            W(
              kh,
              { key: 0, class: 'VPHomeFeatures', features: p(t).features },
              null,
              8,
              ['features']
            ))
          : R('', !0)
    }
  }),
  Ch = { class: 'VPHome' },
  Sh = O({
    __name: 'VPHome',
    setup(e) {
      return (t, n) => {
        const s = je('Content')
        return (
          d(),
          v('div', Ch, [
            S(t.$slots, 'home-hero-before', {}, void 0, !0),
            V(ih, null, {
              'home-hero-image': L(() => [
                S(t.$slots, 'home-hero-image', {}, void 0, !0)
              ]),
              _: 3
            }),
            S(t.$slots, 'home-hero-after', {}, void 0, !0),
            S(t.$slots, 'home-features-before', {}, void 0, !0),
            V(Ph),
            S(t.$slots, 'home-features-after', {}, void 0, !0),
            V(s)
          ])
        )
      }
    }
  })
const Eh = B(Sh, [['__scopeId', 'data-v-7769467e']])
function Ah() {
  const { hasSidebar: e } = rt(),
    t = Bs('(min-width: 960px)'),
    n = Bs('(min-width: 1280px)')
  return {
    isAsideEnabled: K(() =>
      !n.value && !t.value ? !1 : e.value ? n.value : t.value
    )
  }
}
const Vh = 71
function Th(e, t) {
  if (e === !1) return []
  let n = []
  return (
    document.querySelectorAll('h2, h3, h4, h5, h6').forEach(s => {
      if (s.textContent && s.id) {
        let o = s.textContent
        if (t === !1) {
          const i = s.cloneNode(!0)
          for (const r of i.querySelectorAll('.VPBadge')) r.remove()
          o = i.textContent || ''
        }
        n.push({
          level: Number(s.tagName[1]),
          title: o.replace(/\s+#\s*$/, ''),
          link: `#${s.id}`
        })
      }
    }),
    Lh(n, e)
  )
}
function Lh(e, t) {
  const n = (typeof t == 'object' && !Array.isArray(t) ? t.level : t) || 2
  return Ih(e, typeof n == 'number' ? [n, n] : n === 'deep' ? [2, 6] : n)
}
function Ih(e, t) {
  const n = []
  return (
    (e = e.map(s => ({ ...s }))),
    e.forEach((s, o) => {
      s.level >= t[0] && s.level <= t[1] && Mh(o, e, t) && n.push(s)
    }),
    n
  )
}
function Mh(e, t, n) {
  if (e === 0) return !0
  const s = t[e]
  for (let o = e - 1; o >= 0; o--) {
    const i = t[o]
    if (i.level < s.level && i.level >= n[0] && i.level <= n[1])
      return i.children == null && (i.children = []), i.children.push(s), !1
  }
  return !0
}
function Nh(e, t) {
  const { isAsideEnabled: n } = Ah(),
    s = qc(i, 100)
  let o = null
  Ie(() => {
    requestAnimationFrame(i), window.addEventListener('scroll', s)
  }),
    so(() => {
      r(location.hash)
    }),
    vt(() => {
      window.removeEventListener('scroll', s)
    })
  function i() {
    if (!n.value) return
    const l = [].slice.call(e.value.querySelectorAll('.outline-link')),
      a = [].slice
        .call(document.querySelectorAll('.content .header-anchor'))
        .filter(k => l.some(j => j.hash === k.hash && k.offsetParent !== null)),
      u = window.scrollY,
      h = window.innerHeight,
      _ = document.body.offsetHeight,
      g = Math.abs(u + h - _) < 1
    if (a.length && g) {
      r(a[a.length - 1].hash)
      return
    }
    for (let k = 0; k < a.length; k++) {
      const j = a[k],
        N = a[k + 1],
        [J, y] = Bh(k, j, N)
      if (J) {
        r(y)
        return
      }
    }
  }
  function r(l) {
    o && o.classList.remove('active'),
      l !== null &&
        (o = e.value.querySelector(`a[href="${decodeURIComponent(l)}"]`))
    const a = o
    a
      ? (a.classList.add('active'),
        (t.value.style.top = a.offsetTop + 33 + 'px'),
        (t.value.style.opacity = '1'))
      : ((t.value.style.top = '33px'), (t.value.style.opacity = '0'))
  }
}
function hi(e) {
  return e.parentElement.offsetTop - Vh
}
function Bh(e, t, n) {
  const s = window.scrollY
  return e === 0 && s === 0
    ? [!0, null]
    : s < hi(t)
    ? [!1, null]
    : !n || s < hi(n)
    ? [!0, t.hash]
    : [!1, null]
}
const Oh = ['href'],
  Fh = O({
    __name: 'VPDocAsideOutlineItem',
    props: {
      headers: null,
      onClick: { type: Function },
      root: { type: Boolean }
    },
    setup(e) {
      return (t, n) => {
        const s = je('VPDocAsideOutlineItem', !0)
        return (
          d(),
          v(
            'ul',
            { class: me(e.root ? 'root' : 'nested') },
            [
              (d(!0),
              v(
                Q,
                null,
                Ae(
                  e.headers,
                  ({ children: o, link: i, title: r }) => (
                    d(),
                    v('li', null, [
                      b(
                        'a',
                        {
                          class: 'outline-link',
                          href: i,
                          onClick:
                            n[0] ||
                            (n[0] = (...l) => e.onClick && e.onClick(...l))
                        },
                        ie(r),
                        9,
                        Oh
                      ),
                      o != null && o.length
                        ? (d(),
                          W(
                            s,
                            { key: 0, headers: o, onClick: e.onClick },
                            null,
                            8,
                            ['headers', 'onClick']
                          ))
                        : R('', !0)
                    ])
                  )
                ),
                256
              ))
            ],
            2
          )
        )
      }
    }
  })
const Hh = B(Fh, [['__scopeId', 'data-v-3fd1207a']]),
  Rh = e => (et('data-v-95c92f7c'), (e = e()), tt(), e),
  jh = { class: 'content' },
  Dh = { class: 'outline-title' },
  Uh = { 'aria-labelledby': 'doc-outline-aria-label' },
  zh = Rh(() =>
    b(
      'span',
      { class: 'visually-hidden', id: 'doc-outline-aria-label' },
      ' Table of Contents for current page ',
      -1
    )
  ),
  Kh = O({
    __name: 'VPDocAsideOutline',
    setup(e) {
      const { frontmatter: t, theme: n } = ue(),
        s = K(() => t.value.outline ?? n.value.outline),
        o = qe('onContentUpdated')
      o.value = () => {
        i.value = Th(s.value, n.value.outlineBadges)
      }
      const i = oe([]),
        r = K(() => i.value.length > 0),
        l = oe(),
        a = oe()
      Nh(l, a)
      function u({ target: h }) {
        const _ = '#' + h.href.split('#')[1],
          g = document.querySelector(decodeURIComponent(_))
        g == null || g.focus()
      }
      return (h, _) => (
        d(),
        v(
          'div',
          {
            class: me(['VPDocAsideOutline', { 'has-outline': p(r) }]),
            ref_key: 'container',
            ref: l
          },
          [
            b('div', jh, [
              b(
                'div',
                { class: 'outline-marker', ref_key: 'marker', ref: a },
                null,
                512
              ),
              b(
                'div',
                Dh,
                ie(
                  (typeof p(n).outline == 'object' &&
                    !Array.isArray(p(n).outline) &&
                    p(n).outline.label) ||
                    p(n).outlineTitle ||
                    'On this page'
                ),
                1
              ),
              b('nav', Uh, [
                zh,
                V(Hh, { headers: i.value, root: !0, onClick: u }, null, 8, [
                  'headers'
                ])
              ])
            ])
          ],
          2
        )
      )
    }
  })
const Wh = B(Kh, [['__scopeId', 'data-v-95c92f7c']]),
  qh = { class: 'VPDocAsideCarbonAds' },
  Gh = O({
    __name: 'VPDocAsideCarbonAds',
    props: { carbonAds: null },
    setup(e) {
      const t = () => null
      return (n, s) => (
        d(),
        v('div', qh, [
          V(p(t), { 'carbon-ads': e.carbonAds }, null, 8, ['carbon-ads'])
        ])
      )
    }
  }),
  Yh = e => (et('data-v-6ed7e943'), (e = e()), tt(), e),
  Qh = { class: 'VPDocAside' },
  Xh = Yh(() => b('div', { class: 'spacer' }, null, -1)),
  Jh = O({
    __name: 'VPDocAside',
    setup(e) {
      const { theme: t } = ue()
      return (n, s) => (
        d(),
        v('div', Qh, [
          S(n.$slots, 'aside-top', {}, void 0, !0),
          S(n.$slots, 'aside-outline-before', {}, void 0, !0),
          V(Wh),
          S(n.$slots, 'aside-outline-after', {}, void 0, !0),
          Xh,
          S(n.$slots, 'aside-ads-before', {}, void 0, !0),
          p(t).carbonAds
            ? (d(),
              W(Gh, { key: 0, 'carbon-ads': p(t).carbonAds }, null, 8, [
                'carbon-ads'
              ]))
            : R('', !0),
          S(n.$slots, 'aside-ads-after', {}, void 0, !0),
          S(n.$slots, 'aside-bottom', {}, void 0, !0)
        ])
      )
    }
  })
const Zh = B(Jh, [['__scopeId', 'data-v-6ed7e943']])
function e1() {
  const { theme: e, page: t } = ue()
  return K(() => {
    const { text: n = 'Edit this page', pattern: s = '' } =
        e.value.editLink || {},
      { relativePath: o } = t.value
    return { url: s.replace(/:path/g, o), text: n }
  })
}
function t1() {
  const { page: e, theme: t, frontmatter: n } = ue()
  return K(() => {
    const s = kr(t.value.sidebar, e.value.relativePath),
      o = Yc(s),
      i = o.findIndex(r => It(e.value.relativePath, r.link))
    return {
      prev: n.value.prev ? { ...o[i - 1], text: n.value.prev } : o[i - 1],
      next: n.value.next ? { ...o[i + 1], text: n.value.next } : o[i + 1]
    }
  })
}
const n1 = {},
  s1 = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  o1 = b(
    'path',
    {
      d: 'M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z'
    },
    null,
    -1
  ),
  i1 = b(
    'path',
    {
      d: 'M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z'
    },
    null,
    -1
  ),
  r1 = [o1, i1]
function l1(e, t) {
  return d(), v('svg', s1, r1)
}
const a1 = B(n1, [['render', l1]]),
  c1 = { class: 'VPLastUpdated' },
  u1 = ['datetime'],
  f1 = O({
    __name: 'VPDocFooterLastUpdated',
    setup(e) {
      const { theme: t, page: n } = ue(),
        s = K(() => new Date(n.value.lastUpdated)),
        o = K(() => s.value.toISOString()),
        i = oe('')
      return (
        Ie(() => {
          Lt(() => {
            i.value = s.value.toLocaleString(window.navigator.language)
          })
        }),
        (r, l) => (
          d(),
          v('p', c1, [
            Ee(ie(p(t).lastUpdatedText || 'Last updated') + ': ', 1),
            b('time', { datetime: p(o) }, ie(i.value), 9, u1)
          ])
        )
      )
    }
  })
const d1 = B(f1, [['__scopeId', 'data-v-33293894']]),
  h1 = { key: 0, class: 'VPDocFooter' },
  p1 = { key: 0, class: 'edit-info' },
  _1 = { key: 0, class: 'edit-link' },
  m1 = { key: 1, class: 'last-updated' },
  v1 = { key: 1, class: 'prev-next' },
  g1 = { class: 'pager' },
  b1 = ['href'],
  y1 = ['innerHTML'],
  x1 = ['innerHTML'],
  $1 = ['href'],
  w1 = ['innerHTML'],
  k1 = ['innerHTML'],
  P1 = O({
    __name: 'VPDocFooter',
    setup(e) {
      const { theme: t, page: n, frontmatter: s } = ue(),
        o = e1(),
        i = t1(),
        r = K(() => t.value.editLink && s.value.editLink !== !1),
        l = K(() => n.value.lastUpdated && s.value.lastUpdated !== !1),
        a = K(() => r.value || l.value || i.value.prev || i.value.next)
      return (u, h) => {
        var _, g
        return p(a)
          ? (d(),
            v('footer', h1, [
              p(r) || p(l)
                ? (d(),
                  v('div', p1, [
                    p(r)
                      ? (d(),
                        v('div', _1, [
                          V(
                            bt,
                            {
                              class: 'edit-link-button',
                              href: p(o).url,
                              'no-icon': !0
                            },
                            {
                              default: L(() => [
                                V(a1, { class: 'edit-link-icon' }),
                                Ee(' ' + ie(p(o).text), 1)
                              ]),
                              _: 1
                            },
                            8,
                            ['href']
                          )
                        ]))
                      : R('', !0),
                    p(l) ? (d(), v('div', m1, [V(d1)])) : R('', !0)
                  ]))
                : R('', !0),
              p(i).prev || p(i).next
                ? (d(),
                  v('div', v1, [
                    b('div', g1, [
                      p(i).prev
                        ? (d(),
                          v(
                            'a',
                            {
                              key: 0,
                              class: 'pager-link prev',
                              href: p(mn)(p(i).prev.link)
                            },
                            [
                              b(
                                'span',
                                {
                                  class: 'desc',
                                  innerHTML:
                                    ((_ = p(t).docFooter) == null
                                      ? void 0
                                      : _.prev) || 'Previous page'
                                },
                                null,
                                8,
                                y1
                              ),
                              b(
                                'span',
                                { class: 'title', innerHTML: p(i).prev.text },
                                null,
                                8,
                                x1
                              )
                            ],
                            8,
                            b1
                          ))
                        : R('', !0)
                    ]),
                    b(
                      'div',
                      { class: me(['pager', { 'has-prev': p(i).prev }]) },
                      [
                        p(i).next
                          ? (d(),
                            v(
                              'a',
                              {
                                key: 0,
                                class: 'pager-link next',
                                href: p(mn)(p(i).next.link)
                              },
                              [
                                b(
                                  'span',
                                  {
                                    class: 'desc',
                                    innerHTML:
                                      ((g = p(t).docFooter) == null
                                        ? void 0
                                        : g.next) || 'Next page'
                                  },
                                  null,
                                  8,
                                  w1
                                ),
                                b(
                                  'span',
                                  { class: 'title', innerHTML: p(i).next.text },
                                  null,
                                  8,
                                  k1
                                )
                              ],
                              8,
                              $1
                            ))
                          : R('', !0)
                      ],
                      2
                    )
                  ]))
                : R('', !0)
            ]))
          : R('', !0)
      }
    }
  })
const C1 = B(P1, [['__scopeId', 'data-v-b4cb942e']]),
  S1 = e => (et('data-v-edb2a2c0'), (e = e()), tt(), e),
  E1 = { class: 'container' },
  A1 = { key: 0, class: 'aside' },
  V1 = S1(() => b('div', { class: 'aside-curtain' }, null, -1)),
  T1 = { class: 'aside-container' },
  L1 = { class: 'aside-content' },
  I1 = { class: 'content' },
  M1 = { class: 'content-container' },
  N1 = { class: 'main' },
  B1 = O({
    __name: 'VPDoc',
    setup(e) {
      const t = gt(),
        { hasSidebar: n, hasAside: s } = rt(),
        o = K(() => t.path.replace(/[./]+/g, '_').replace(/_html$/, '')),
        i = oe()
      return (
        jt('onContentUpdated', i),
        (r, l) => {
          const a = je('Content')
          return (
            d(),
            v(
              'div',
              {
                class: me(['VPDoc', { 'has-sidebar': p(n), 'has-aside': p(s) }])
              },
              [
                b('div', E1, [
                  p(s)
                    ? (d(),
                      v('div', A1, [
                        V1,
                        b('div', T1, [
                          b('div', L1, [
                            V(Zh, null, {
                              'aside-top': L(() => [
                                S(r.$slots, 'aside-top', {}, void 0, !0)
                              ]),
                              'aside-bottom': L(() => [
                                S(r.$slots, 'aside-bottom', {}, void 0, !0)
                              ]),
                              'aside-outline-before': L(() => [
                                S(
                                  r.$slots,
                                  'aside-outline-before',
                                  {},
                                  void 0,
                                  !0
                                )
                              ]),
                              'aside-outline-after': L(() => [
                                S(
                                  r.$slots,
                                  'aside-outline-after',
                                  {},
                                  void 0,
                                  !0
                                )
                              ]),
                              'aside-ads-before': L(() => [
                                S(r.$slots, 'aside-ads-before', {}, void 0, !0)
                              ]),
                              'aside-ads-after': L(() => [
                                S(r.$slots, 'aside-ads-after', {}, void 0, !0)
                              ]),
                              _: 3
                            })
                          ])
                        ])
                      ]))
                    : R('', !0),
                  b('div', I1, [
                    b('div', M1, [
                      S(r.$slots, 'doc-before', {}, void 0, !0),
                      b('main', N1, [
                        V(
                          a,
                          {
                            class: me(['vp-doc', p(o)]),
                            onContentUpdated: i.value
                          },
                          null,
                          8,
                          ['class', 'onContentUpdated']
                        )
                      ]),
                      S(r.$slots, 'doc-footer-before', {}, void 0, !0),
                      V(C1),
                      S(r.$slots, 'doc-after', {}, void 0, !0)
                    ])
                  ])
                ])
              ],
              2
            )
          )
        }
      )
    }
  })
const O1 = B(B1, [['__scopeId', 'data-v-edb2a2c0']]),
  F1 = O({
    __name: 'VPContent',
    setup(e) {
      const t = gt(),
        { frontmatter: n } = ue(),
        { hasSidebar: s } = rt(),
        o = qe('NotFound')
      return (i, r) => (
        d(),
        v(
          'div',
          {
            class: me([
              'VPContent',
              { 'has-sidebar': p(s), 'is-home': p(n).layout === 'home' }
            ]),
            id: 'VPContent'
          },
          [
            p(t).component === p(o)
              ? (d(), W(p(o), { key: 0 }))
              : p(n).layout === 'page'
              ? (d(), W(U0, { key: 1 }))
              : p(n).layout === 'home'
              ? (d(),
                W(
                  Eh,
                  { key: 2 },
                  {
                    'home-hero-before': L(() => [
                      S(i.$slots, 'home-hero-before', {}, void 0, !0)
                    ]),
                    'home-hero-image': L(() => [
                      S(i.$slots, 'home-hero-image', {}, void 0, !0)
                    ]),
                    'home-hero-after': L(() => [
                      S(i.$slots, 'home-hero-after', {}, void 0, !0)
                    ]),
                    'home-features-before': L(() => [
                      S(i.$slots, 'home-features-before', {}, void 0, !0)
                    ]),
                    'home-features-after': L(() => [
                      S(i.$slots, 'home-features-after', {}, void 0, !0)
                    ]),
                    _: 3
                  }
                ))
              : (d(),
                W(
                  O1,
                  { key: 3 },
                  {
                    'doc-footer-before': L(() => [
                      S(i.$slots, 'doc-footer-before', {}, void 0, !0)
                    ]),
                    'doc-before': L(() => [
                      S(i.$slots, 'doc-before', {}, void 0, !0)
                    ]),
                    'doc-after': L(() => [
                      S(i.$slots, 'doc-after', {}, void 0, !0)
                    ]),
                    'aside-top': L(() => [
                      S(i.$slots, 'aside-top', {}, void 0, !0)
                    ]),
                    'aside-outline-before': L(() => [
                      S(i.$slots, 'aside-outline-before', {}, void 0, !0)
                    ]),
                    'aside-outline-after': L(() => [
                      S(i.$slots, 'aside-outline-after', {}, void 0, !0)
                    ]),
                    'aside-ads-before': L(() => [
                      S(i.$slots, 'aside-ads-before', {}, void 0, !0)
                    ]),
                    'aside-ads-after': L(() => [
                      S(i.$slots, 'aside-ads-after', {}, void 0, !0)
                    ]),
                    'aside-bottom': L(() => [
                      S(i.$slots, 'aside-bottom', {}, void 0, !0)
                    ]),
                    _: 3
                  }
                ))
          ],
          2
        )
      )
    }
  })
const H1 = B(F1, [['__scopeId', 'data-v-d5a62444']]),
  R1 = { class: 'container' },
  j1 = ['innerHTML'],
  D1 = ['innerHTML'],
  U1 = O({
    __name: 'VPFooter',
    setup(e) {
      const { theme: t } = ue(),
        { hasSidebar: n } = rt()
      return (s, o) =>
        p(t).footer
          ? (d(),
            v(
              'footer',
              { key: 0, class: me(['VPFooter', { 'has-sidebar': p(n) }]) },
              [
                b('div', R1, [
                  p(t).footer.message
                    ? (d(),
                      v(
                        'p',
                        {
                          key: 0,
                          class: 'message',
                          innerHTML: p(t).footer.message
                        },
                        null,
                        8,
                        j1
                      ))
                    : R('', !0),
                  p(t).footer.copyright
                    ? (d(),
                      v(
                        'p',
                        {
                          key: 1,
                          class: 'copyright',
                          innerHTML: p(t).footer.copyright
                        },
                        null,
                        8,
                        D1
                      ))
                    : R('', !0)
                ])
              ],
              2
            ))
          : R('', !0)
    }
  })
const z1 = B(U1, [['__scopeId', 'data-v-7865a11b']]),
  K1 = { key: 0, class: 'Layout' },
  W1 = O({
    __name: 'Layout',
    setup(e) {
      const { isOpen: t, open: n, close: s } = rt(),
        o = gt()
      Je(() => o.path, s),
        Qc(t, s),
        jt('close-sidebar', s),
        jt('is-sidebar-open', t)
      const { frontmatter: i } = ue(),
        r = Ia(),
        l = K(() => !!r['home-hero-image'])
      return (
        jt('hero-image-slot-exists', l),
        (a, u) => {
          const h = je('Content')
          return p(i).layout !== !1
            ? (d(),
              v('div', K1, [
                S(a.$slots, 'layout-top', {}, void 0, !0),
                V(Zc),
                V(
                  nu,
                  { class: 'backdrop', show: p(t), onClick: p(s) },
                  null,
                  8,
                  ['show', 'onClick']
                ),
                V(a0, null, {
                  'nav-bar-title-before': L(() => [
                    S(a.$slots, 'nav-bar-title-before', {}, void 0, !0)
                  ]),
                  'nav-bar-title-after': L(() => [
                    S(a.$slots, 'nav-bar-title-after', {}, void 0, !0)
                  ]),
                  'nav-bar-content-before': L(() => [
                    S(a.$slots, 'nav-bar-content-before', {}, void 0, !0)
                  ]),
                  'nav-bar-content-after': L(() => [
                    S(a.$slots, 'nav-bar-content-after', {}, void 0, !0)
                  ]),
                  'nav-screen-content-before': L(() => [
                    S(a.$slots, 'nav-screen-content-before', {}, void 0, !0)
                  ]),
                  'nav-screen-content-after': L(() => [
                    S(a.$slots, 'nav-screen-content-after', {}, void 0, !0)
                  ]),
                  _: 3
                }),
                V($0, { open: p(t), onOpenMenu: p(n) }, null, 8, [
                  'open',
                  'onOpenMenu'
                ]),
                V(
                  H0,
                  { open: p(t) },
                  {
                    'sidebar-nav-before': L(() => [
                      S(a.$slots, 'sidebar-nav-before', {}, void 0, !0)
                    ]),
                    'sidebar-nav-after': L(() => [
                      S(a.$slots, 'sidebar-nav-after', {}, void 0, !0)
                    ]),
                    _: 3
                  },
                  8,
                  ['open']
                ),
                V(H1, null, {
                  'home-hero-before': L(() => [
                    S(a.$slots, 'home-hero-before', {}, void 0, !0)
                  ]),
                  'home-hero-image': L(() => [
                    S(a.$slots, 'home-hero-image', {}, void 0, !0)
                  ]),
                  'home-hero-after': L(() => [
                    S(a.$slots, 'home-hero-after', {}, void 0, !0)
                  ]),
                  'home-features-before': L(() => [
                    S(a.$slots, 'home-features-before', {}, void 0, !0)
                  ]),
                  'home-features-after': L(() => [
                    S(a.$slots, 'home-features-after', {}, void 0, !0)
                  ]),
                  'doc-footer-before': L(() => [
                    S(a.$slots, 'doc-footer-before', {}, void 0, !0)
                  ]),
                  'doc-before': L(() => [
                    S(a.$slots, 'doc-before', {}, void 0, !0)
                  ]),
                  'doc-after': L(() => [
                    S(a.$slots, 'doc-after', {}, void 0, !0)
                  ]),
                  'aside-top': L(() => [
                    S(a.$slots, 'aside-top', {}, void 0, !0)
                  ]),
                  'aside-bottom': L(() => [
                    S(a.$slots, 'aside-bottom', {}, void 0, !0)
                  ]),
                  'aside-outline-before': L(() => [
                    S(a.$slots, 'aside-outline-before', {}, void 0, !0)
                  ]),
                  'aside-outline-after': L(() => [
                    S(a.$slots, 'aside-outline-after', {}, void 0, !0)
                  ]),
                  'aside-ads-before': L(() => [
                    S(a.$slots, 'aside-ads-before', {}, void 0, !0)
                  ]),
                  'aside-ads-after': L(() => [
                    S(a.$slots, 'aside-ads-after', {}, void 0, !0)
                  ]),
                  _: 3
                }),
                V(z1),
                S(a.$slots, 'layout-bottom', {}, void 0, !0)
              ]))
            : (d(), W(h, { key: 1 }))
        }
      )
    }
  })
const q1 = B(W1, [['__scopeId', 'data-v-578a2eb6']]),
  as = e => (et('data-v-cda24b05'), (e = e()), tt(), e),
  G1 = { class: 'NotFound' },
  Y1 = as(() => b('p', { class: 'code' }, '404', -1)),
  Q1 = as(() => b('h1', { class: 'title' }, 'PAGE NOT FOUND', -1)),
  X1 = as(() => b('div', { class: 'divider' }, null, -1)),
  J1 = as(() =>
    b(
      'blockquote',
      { class: 'quote' },
      " But if you don't change your direction, and if you keep looking, you may end up where you are heading. ",
      -1
    )
  ),
  Z1 = { class: 'action' },
  ep = ['href'],
  tp = O({
    __name: 'NotFound',
    setup(e) {
      const { site: t } = ue(),
        { localeLinks: n } = bn({ removeCurrent: !1 }),
        s = oe('/')
      return (
        Ie(() => {
          var i
          const o = window.location.pathname
            .replace(t.value.base, '')
            .replace(/(^.*?\/).*$/, '/$1')
          n.value.length &&
            (s.value =
              ((i = n.value.find(({ link: r }) => r.startsWith(o))) == null
                ? void 0
                : i.link) || n.value[0].link)
        }),
        (o, i) => (
          d(),
          v('div', G1, [
            Y1,
            Q1,
            X1,
            J1,
            b('div', Z1, [
              b(
                'a',
                {
                  class: 'link',
                  href: p(_n)(s.value),
                  'aria-label': 'go to home'
                },
                ' Take me home ',
                8,
                ep
              )
            ])
          ])
        )
      )
    }
  })
const np = B(tp, [['__scopeId', 'data-v-cda24b05']])
const pi = {
  Layout: q1,
  NotFound: np,
  enhanceApp: ({ app: e }) => {
    e.component('Badge', vc)
  }
}
const sp = O({
    name: 'VueLightboxAdvanced',
    props: {
      items: { type: Array, default: () => [] },
      shuffle: { type: Boolean, default: !1 },
      shuffleBy: { type: String, default: '' },
      returnSrc: { type: Boolean, default: !1 },
      css: { type: String, default: () => 'h-200 h-md-400 h-lg-600' },
      cells: { type: Number, default: () => 5 }
    },
    emits: ['clicked:index'],
    data() {
      return {
        indexedArray: [],
        allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT']
      }
    },
    computed: {
      shuffled() {
        return this.shuffleArray()
      }
    },
    methods: {
      shuffleArray() {
        return (
          (this.indexedArray = this.items.map((e, t) => ({
            src: String(e),
            i: t
          }))),
          this.shuffle ? this.shuffledBy(this.shuffleBy) : this.indexedArray
        )
      },
      randomSelect(e, t) {
        return Math.random() * (t - e) + e
      },
      shuffledBy(e) {
        switch (e) {
          case 'DYNAMIC':
            this.shuffledBy(
              this.allShuffledBy[
                Math.floor(this.randomSelect(0, this.allShuffledBy.length))
              ]
            )
            break
          case 'ASC':
            this.indexedArray.sort()
            break
          case 'DESC':
            this.indexedArray.reverse()
            break
          case 'RANDOM':
            this.indexedArray.sort(function () {
              return Math.random() - 0.5
            })
            break
          default:
          case 'DEFAULT':
            break
        }
        return this.indexedArray
      },
      clicked(e) {
        this.$emit('clicked:index', this.returnSrc ? e.src : e.i)
      },
      bg(e) {
        return e && e.length > 0 ? `background-image: url('${e}')` : ''
      }
    }
  }),
  op = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, o] of t) n[s] = o
    return n
  },
  ip = { key: 0, class: 'vue-lightbox-advanced' },
  rp = ['onClickPassive'],
  lp = { key: 0, class: 'lb-more' }
function ap(e, t, n, s, o, i) {
  return e.items.length > 0
    ? (d(),
      v('div', ip, [
        b(
          'div',
          {
            class: me([
              'lb-grid',
              [
                e.css,
                e.items.length > e.cells
                  ? 'lb-grid-' + e.cells
                  : 'lb-grid-' + e.items.length
              ]
            ])
          },
          [
            (d(!0),
            v(
              Q,
              null,
              Ae(
                e.shuffled,
                (r, l) => (
                  d(),
                  v(
                    Q,
                    { key: l },
                    [
                      l < e.cells
                        ? (d(),
                          v(
                            'a',
                            {
                              key: 0,
                              class: 'lb-item',
                              style: Kn(e.bg(r.src)),
                              onClickPassive: hr(a => e.clicked(r), ['stop'])
                            },
                            [
                              l == e.cells - 1 && e.items.length - e.cells > 0
                                ? (d(),
                                  v(
                                    'span',
                                    lp,
                                    ie(e.items.length - e.cells) + '+',
                                    1
                                  ))
                                : R('', !0)
                            ],
                            44,
                            rp
                          ))
                        : R('', !0)
                    ],
                    64
                  )
                )
              ),
              128
            ))
          ],
          2
        )
      ]))
    : R('', !0)
}
const yn = op(sp, [
    ['render', ap],
    ['__scopeId', 'data-v-13de3c2b']
  ]),
  cp = O({
    name: 'ExampleBasic',
    components: { VueLightboxAdvanced: yn },
    emits: ['clicked'],
    setup() {
      const e = oe([])
      return (
        (e.value = [
          'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
          'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
          'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
        ]),
        {
          images: e,
          onClicked(t) {
            console.log('Event Emmited....'), console.log(`Return Index: ${t}`)
          },
          onClickedSrc(t) {
            console.log('Event Emmited....'), console.log(`Return Value: ${t}`)
          }
        }
      )
    }
  })
function up(e, t, n, s, o, i) {
  const r = je('vue-lightbox-advanced')
  return d(), W(r, { items: e.images }, null, 8, ['items'])
}
const fp = B(cp, [['render', up]]),
  dp = O({
    name: 'ExampleRandomShuffle',
    components: { VueLightboxAdvanced: yn },
    emits: ['clicked'],
    setup() {
      const e = oe([])
      return (
        (e.value = [
          'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
          'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
          'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
        ]),
        {
          images: e,
          onClicked(t) {
            console.log('Event Emmited....'), console.log(`Return Index: ${t}`)
          },
          onClickedSrc(t) {
            console.log('Event Emmited....'), console.log(`Return Value: ${t}`)
          }
        }
      )
    }
  })
function hp(e, t, n, s, o, i) {
  const r = je('vue-lightbox-advanced')
  return (
    d(),
    W(r, { shuffle: !0, 'shuffle-by': 'RANDOM', items: e.images }, null, 8, [
      'items'
    ])
  )
}
const pp = B(dp, [['render', hp]]),
  _p = O({
    name: 'ExampleWith3column',
    components: { VueLightboxAdvanced: yn },
    emits: ['clicked'],
    setup() {
      const e = oe([])
      return (
        (e.value = [
          'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
          'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
          'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
        ]),
        {
          images: e,
          onClicked(t) {
            console.log('Event Emmited....'), console.log(`Return Index: ${t}`)
          },
          onClickedSrc(t) {
            console.log('Event Emmited....'), console.log(`Return Value: ${t}`)
          }
        }
      )
    }
  })
function mp(e, t, n, s, o, i) {
  const r = je('vue-lightbox-advanced')
  return (
    d(),
    W(
      r,
      { cells: 3, items: e.images, shuffle: !0, 'shuffle-by': 'DESC' },
      null,
      8,
      ['items']
    )
  )
}
const vp = B(_p, [['render', mp]]),
  gp = O({
    name: 'ExampleWithEvent',
    components: { VueLightboxAdvanced: yn },
    emits: ['clicked'],
    setup() {
      const e = oe([])
      return (
        (e.value = [
          'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
          'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
          'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
        ]),
        {
          images: e,
          onClicked(t) {
            console.log('Event Emmited....'), console.log(`Return Index: ${t}`)
          },
          onClickedSrc(t) {
            console.log('Event Emmited....'), console.log(`Return Value: ${t}`)
          }
        }
      )
    }
  })
function bp(e, t, n, s, o, i) {
  const r = je('vue-lightbox-advanced')
  return (
    d(),
    W(r, { items: e.images, 'onClicked:index': e.onClicked }, null, 8, [
      'items',
      'onClicked:index'
    ])
  )
}
const yp = B(gp, [['render', bp]]),
  xp = O({
    name: 'ExampleWithSRC',
    components: { VueLightboxAdvanced: yn },
    emits: ['clicked'],
    setup() {
      const e = oe([])
      return (
        (e.value = [
          'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
          'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
          'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
          'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
        ]),
        {
          images: e,
          onClicked(t) {
            console.log('Event Emmited....'), console.log(`Return Index: ${t}`)
          },
          onClickedSrc(t) {
            console.log('Event Emmited....'), console.log(`Return Value: ${t}`)
          }
        }
      )
    }
  })
function $p(e, t, n, s, o, i) {
  const r = je('vue-lightbox-advanced')
  return (
    d(),
    W(
      r,
      { 'return-src': !0, items: e.images, 'onClicked:index': e.onClickedSrc },
      null,
      8,
      ['items', 'onClicked:index']
    )
  )
}
const wp = B(xp, [['render', $p]]),
  Kt = {
    ...pi,
    enhanceApp(e) {
      pi.enhanceApp(e),
        e.app.component('ExampleBasic', fp),
        e.app.component('ExampleRandomShuffle', pp),
        e.app.component('ExampleWith3column', vp),
        e.app.component('ExampleWithEvent', yp),
        e.app.component('ExampleWithSRC', wp)
    }
  }
function kp(e, t) {
  let n = [],
    s = !0
  const o = i => {
    if (s) {
      s = !1
      return
    }
    n.forEach(r => document.head.removeChild(r)),
      (n = []),
      i.forEach(r => {
        const l = Pp(r)
        document.head.appendChild(l), n.push(l)
      })
  }
  Lt(() => {
    const i = e.data,
      r = t.value,
      l = i && i.description,
      a = (i && i.frontmatter.head) || []
    ;(document.title = vr(r, i)),
      document
        .querySelector('meta[name=description]')
        .setAttribute('content', l || r.description),
      o(gr(r.head, Sp(a)))
  })
}
function Pp([e, t, n]) {
  const s = document.createElement(e)
  for (const o in t) s.setAttribute(o, t[o])
  return n && (s.innerHTML = n), s
}
function Cp(e) {
  return e[0] === 'meta' && e[1] && e[1].name === 'description'
}
function Sp(e) {
  return e.filter(t => !Cp(t))
}
const xs = new Set(),
  Mr = () => document.createElement('link'),
  Ep = e => {
    const t = Mr()
    ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
  },
  Ap = e => {
    const t = new XMLHttpRequest()
    t.open('GET', e, (t.withCredentials = !0)), t.send()
  }
let Tn
const Vp =
  ke &&
  (Tn = Mr()) &&
  Tn.relList &&
  Tn.relList.supports &&
  Tn.relList.supports('prefetch')
    ? Ep
    : Ap
function Tp() {
  if (!ke || !window.IntersectionObserver) return
  let e
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return
  const t = window.requestIdleCallback || setTimeout
  let n = null
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver(i => {
        i.forEach(r => {
          if (r.isIntersecting) {
            const l = r.target
            n.unobserve(l)
            const { pathname: a } = l
            if (!xs.has(a)) {
              xs.add(a)
              const u = xr(a)
              Vp(u)
            }
          }
        })
      })),
      t(() => {
        document.querySelectorAll('#app a').forEach(i => {
          const { target: r } = i,
            { hostname: l, pathname: a } = new URL(
              i.href instanceof SVGAnimatedString ? i.href.animVal : i.href,
              i.baseURI
            ),
            u = a.match(/\.\w+$/)
          ;(u && u[0] !== '.html') ||
            (r !== '_blank' &&
              l === location.hostname &&
              (a !== location.pathname ? n.observe(i) : xs.add(a)))
        })
      })
  }
  Ie(s)
  const o = gt()
  Je(() => o.path, s),
    vt(() => {
      n && n.disconnect()
    })
}
const Lp = O({
  setup(e, { slots: t }) {
    const n = oe(!1)
    return (
      Ie(() => {
        n.value = !0
      }),
      () => (n.value && t.default ? t.default() : null)
    )
  }
})
function Ip() {
  if (ke) {
    const e = new Map()
    window.addEventListener('click', t => {
      var s
      const n = t.target
      if (n.matches('div[class*="language-"] > button.copy')) {
        const o = n.parentElement,
          i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling
        if (!o || !i) return
        const r = /language-(shellscript|shell|bash|sh|zsh)/.test(o.className)
        let l = ''
        i.querySelectorAll('span.line:not(.diff.remove)').forEach(
          a =>
            (l +=
              (a.textContent || '') +
              `
`)
        ),
          (l = l.slice(0, -1)),
          r && (l = l.replace(/^ *(\$|>) /gm, '').trim()),
          Mp(l).then(() => {
            n.classList.add('copied'), clearTimeout(e.get(n))
            const a = setTimeout(() => {
              n.classList.remove('copied'), n.blur(), e.delete(n)
            }, 2e3)
            e.set(n, a)
          })
      }
    })
  }
}
async function Mp(e) {
  try {
    return navigator.clipboard.writeText(e)
  } catch {
    const t = document.createElement('textarea'),
      n = document.activeElement
    ;(t.value = e),
      t.setAttribute('readonly', ''),
      (t.style.contain = 'strict'),
      (t.style.position = 'absolute'),
      (t.style.left = '-9999px'),
      (t.style.fontSize = '12pt')
    const s = document.getSelection(),
      o = s ? s.rangeCount > 0 && s.getRangeAt(0) : null
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand('copy'),
      document.body.removeChild(t),
      o && (s.removeAllRanges(), s.addRange(o)),
      n && n.focus()
  }
}
function Np() {
  ke &&
    window.addEventListener('click', e => {
      var n, s
      const t = e.target
      if (t.matches('.vp-code-group input')) {
        const o = (n = t.parentElement) == null ? void 0 : n.parentElement,
          i = Array.from(
            (o == null ? void 0 : o.querySelectorAll('input')) || []
          ).indexOf(t),
          r =
            o == null
              ? void 0
              : o.querySelector('div[class*="language-"].active'),
          l =
            (s =
              o == null
                ? void 0
                : o.querySelectorAll('div[class*="language-"]')) == null
              ? void 0
              : s[i]
        r &&
          l &&
          r !== l &&
          (r.classList.remove('active'), l.classList.add('active'))
      }
    })
}
const Nr = Kt.NotFound || (() => '404 Not Found'),
  Bp = O({
    name: 'VitePressApp',
    setup() {
      const { site: e } = yr()
      return (
        Ie(() => {
          Lt(() => {
            ;(document.documentElement.lang = e.value.lang),
              (document.documentElement.dir = e.value.dir)
          })
        }),
        Tp(),
        Ip(),
        Np(),
        Kt.setup && Kt.setup(),
        () => jn(Kt.Layout)
      )
    }
  })
async function Op() {
  const e = Hp(),
    t = Fp()
  t.provide($r, e)
  const n = Cc(e.route)
  return (
    t.provide(br, n),
    t.provide('NotFound', Nr),
    t.component('Content', Tc),
    t.component('ClientOnly', Lp),
    Object.defineProperty(t.config.globalProperties, '$frontmatter', {
      get() {
        return n.frontmatter.value
      }
    }),
    Kt.enhanceApp && (await Kt.enhanceApp({ app: t, router: e, siteData: dt })),
    { app: t, router: e, data: n }
  )
}
function Fp() {
  return fc(Bp)
}
function Hp() {
  let e = ke,
    t
  return Ac(n => {
    let s = xr(n)
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, '.lean.js')),
      ke && (e = !1),
      _c(() => import(s), [])
    )
  }, Nr)
}
ke &&
  Op().then(({ app: e, router: t, data: n }) => {
    t.go().then(() => {
      kp(t.route, n.site), e.mount('#app')
    })
  })
export { B as _, ka as a, V as b, v as c, Op as createApp, d as o, je as r }
