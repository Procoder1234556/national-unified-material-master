import { t as e } from './rolldown-runtime-H_PjY6_i.js';
var t = e({ Api: () => Ur, DataTable: () => Fn, Dom: () => _e, default: () => Fn, util: () => ce }),
  r = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
  n = /<([^>]*>)/g,
  a = new RegExp(
    '(\\' +
      ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join(
        '|\\'
      ) +
      ')',
    'g'
  ),
  i = Object.freeze({
    __proto__: null,
    isoTimezone: /[T\s]\d{2}.*?(Z|[+-]\d{2}(?::?\d{2})?)$/,
    reDate: /^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/,
    reFormattedNumeric: r,
    reHtml: n,
    reNewLines: /[\r\n\u2028]/g,
    reRegexCharacters: a
  }),
  o = Math.pow(2, 28),
  l = function (e, t) {
    if ('string' != typeof e) return e;
    var r = e.normalize ? e.normalize('NFD') : e;
    return r.length !== e.length
      ? (!0 === t ? e + ' ' : '') + r.replace(/[\u0300-\u036f]/g, '')
      : r;
  },
  s = function (e, t = '') {
    if (!e || 'string' != typeof e) return e;
    if (e.length > o) throw new Error('Exceeded max str len');
    let r,
      a = e.replace(n, t);
    do {
      ((r = a), (a = a.replace(/<script/i, '')));
    } while (a !== r);
    return r;
  },
  c = function (e) {
    let t = Array.isArray(e) ? e.join(',') : e;
    return 'string' == typeof t
      ? t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      : t;
  };
function u(e) {
  return e.replace(a, '\\$1');
}
function d(e) {
  var t = typeof e;
  if ('function' !== t) return 'string' === t || Array.isArray(e) ? c(e) : e;
  c = e;
}
function f(e, t) {
  if ('function' != typeof e) return l(e, t);
  l = e;
}
function p(e, t) {
  const r = typeof e;
  if ('function' !== r) return 'string' === r ? s(e, t) : e;
  s = e;
}
var h = Object.freeze({
    __proto__: null,
    escapeHtml: d,
    escapeRegex: u,
    normalize: f,
    stripHtml: p
  }),
  g = {};
function m(e) {
  var t = parseInt(e, 10);
  return !isNaN(t) && isFinite(e) ? t : null;
}
function v(e, t) {
  return (
    g[t] || (g[t] = new RegExp(u(t), 'g')),
    'string' == typeof e && '.' !== t ? e.replace(/\./g, '').replace(g[t], '.') : e
  );
}
var y = Object.freeze({ __proto__: null, intVal: m, numToDecimal: v });
function b(e) {
  return e && 'string' != typeof e && void 0 !== e.length && void 0 === e.nodeType;
}
function w(e) {
  return e && 'object' == typeof e && e._isDom;
}
function x(e) {
  return !e || !0 === e || '-' === e;
}
function T(e) {
  return x(e) || 'string' == typeof e;
}
function _(e, t, n, a) {
  let i = typeof e;
  return (
    'number' === i ||
    'bigint' === i ||
    !(!a || !x(e)) ||
    (t && 'string' === i && (e = v(e, t)),
    n && 'string' === i && (e = e.replace(r, '')),
    !isNaN(parseFloat(e)) && isFinite(e))
  );
}
function A(e) {
  if ('object' != typeof e || null === e) return !1;
  let t = Object.getPrototypeOf(e);
  return null === t || t === Object.prototype;
}
var D = Object.freeze({
  __proto__: null,
  arrayLike: b,
  dom: w,
  element: function (e) {
    return 'object' == typeof e && e.nodeName;
  },
  empty: x,
  html: T,
  htmlNum: function (e, t, r, n) {
    return (
      !(!n || !x(e)) ||
      ('string' == typeof e && e.match(/<(input|select)/i)
        ? null
        : (T(e) && !!_(p(e), t, r, n)) || null)
    );
  },
  jquery: function (e) {
    return e && 'string' == typeof e.jquery;
  },
  num: _,
  plainObject: A
});
function j(e, t) {
  if (!e) return;
  let r = Object.keys(e);
  for (let n = 0; r.length > n; n++) {
    let a = r[n];
    t(a, e[a], n);
  }
}
function C(e, ...t) {
  let r = Object(e);
  for (let n = 0; t.length > n; n++) {
    let e = t[n];
    if (null != e)
      for (let t in e) {
        let n = e[t];
        '__proto__' !== t && r !== n && void 0 !== n && (r[t] = n);
      }
  }
  return r;
}
function O(e, ...t) {
  if (!e) return {};
  for (let r = 0; t.length > r; r++) {
    let n = t[r];
    if (n)
      for (const [t, r] of Object.entries(n))
        Array.isArray(r)
          ? (Array.isArray(e[t]) || (e[t] = []), O(e[t], r))
          : A(r)
            ? (A(e[t]) || (e[t] = {}), O(e[t], r))
            : void 0 !== n[t] && (e[t] = n[t]);
  }
  return e;
}
var N,
  S,
  R,
  I,
  E,
  L,
  M,
  F,
  k = Object.freeze({
    __proto__: null,
    assign: C,
    assignDeep: O,
    assignDeepObjects: function e(t, r, n = !1) {
      let a;
      for (let i in r)
        Object.prototype.hasOwnProperty.call(r, i) &&
          ((a = r[i]),
          A(a)
            ? (A(t[i]) || (t[i] = {}), e(t[i], a, n))
            : (t[i] = n && 'data' !== i && 'aaData' !== i && Array.isArray(a) ? a.slice() : a));
      return t;
    },
    each: j,
    map: function (e, t) {
      let r = [];
      return (
        j(e, (e, n) => {
          r.push(t(e, n));
        }),
        r
      );
    }
  });
function H() {
  return (
    N ||
    ('undefined' != typeof globalThis && globalThis.window
      ? globalThis.window
      : 'undefined' != typeof window
        ? window
        : {})
  );
}
function P(e, t) {
  var r = 'string' == typeof e ? t : e,
    n = 'string' == typeof t ? t : e;
  if (void 0 === r && 'string' == typeof n)
    switch (n) {
      case 'lib':
      case 'jq':
        if (F) return F;
        let e = H().jQuery;
        return e && e.fn ? e : null;
      case 'win':
        return H();
      case 'doc':
        return H().document;
      case 'datatable':
        return M;
      case 'datetime':
        return L;
      case 'luxon':
        return I || H().luxon || null;
      case 'moment':
        return E || H().moment || null;
      case 'bootstrap':
        return S || H().bootstrap || null;
      case 'foundation':
        return R || H().Foundation || null;
      default:
        return null;
    }
  'lib' === n || 'jq' === n || (r && r.fn && r.fn.jquery)
    ? ((F = r),
      M &&
        F &&
        ((M.$ = F),
        (F.fn.dataTable = M),
        (F.fn.DataTable = function (e) {
          return new M(this.toArray(), e);
        }),
        (F.fn.dataTableSettings = M.ext.settings),
        (F.fn.dataTableExt = M.ext),
        j(M, function (e, t) {
          F.fn.DataTable[e] = t;
        })))
    : 'datatable' === n || (r && r.isDataTable)
      ? (M = r)
      : 'win' === n || (r && r.document)
        ? (N = r)
        : 'datetime' === n || (r && 'DateTime' === r.type)
          ? (L = r)
          : 'luxon' === n || (r && r.FixedOffsetZone)
            ? (I = r)
            : 'moment' === n || (r && r.isMoment)
              ? (E = r)
              : 'bootstrap' === n || (r && r.Modal && 'modal' === r.Modal.NAME)
                ? (S = r)
                : ('foundation' === n || (r && r.Reveal)) && (R = r);
}
var q = {
  cache: !0,
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  headers: {},
  traditional: !1,
  url: ''
};
function W(e) {
  let t = new XMLHttpRequest(),
    r = C({}, q, e),
    n = (function (e) {
      let t = [];
      return (
        'GET' === U(e) && t.push(X(e.data, e.traditional)),
        'DELETE' !== U(e) ||
          (void 0 !== e.deleteBody && !0 !== e.deleteBody) ||
          (t.push(X(e.data, e.traditional)), delete e.data),
        !1 === e.cache && t.push(X({ _: +new Date() })),
        B(t.filter(e => !!e).join('&'), e)
      );
    })(r),
    a = U(r),
    i = null;
  return (
    'json' === r.submitAs &&
      r.data &&
      ((r.data = JSON.stringify(r.data)),
      r.contentType || (r.contentType = 'application/json; charset=utf-8')),
    t.open(
      a,
      r.url + (n ? (r.url.includes('?') ? '&' : '?') + n : ''),
      !0,
      r.username || null,
      r.password || null
    ),
    !r.contentType ||
      r.data instanceof FormData ||
      t.setRequestHeader('Content-Type', r.contentType),
    !r.headers ||
      r.headers['X-Requested-With'] ||
      (function (e) {
        const t = P('win');
        return new URL(e, t.location.origin).origin !== t.location.origin;
      })(r.url) ||
      (r.headers['X-Requested-With'] = 'XMLHttpRequest'),
    'json' === r.dataType &&
      r.headers &&
      !r.headers.accepts &&
      (r.headers.Accept = 'application/json, text/javascript, */*; q=0.01'),
    j(r.headers, (e, r) => {
      t.setRequestHeader(e, r);
    }),
    r.data instanceof FormData
      ? (i = r.data)
      : 'GET' !== a &&
        r.data &&
        ('string' == typeof r.data
          ? (i = r.data)
          : ((i = X(r.data, r.traditional)), (i = B(i, r)), (r.data = i))),
    (t.onreadystatechange = function () {
      if (4 != t.readyState) return;
      let e = t.responseText,
        n = 'success';
      if (0 !== t.status) {
        if (
          (204 === t.status || 'HEAD' === a
            ? (n = 'nocontent')
            : 304 === t.status
              ? (n = 'notmodified')
              : 400 > t.status || (n = 'error'),
          'json' === r.dataType)
        )
          try {
            e = JSON.parse(e);
          } catch (i) {
            n = 'parsererror';
          }
        else if (!r.dataType)
          try {
            e = JSON.parse(e);
          } catch (i) {}
        ('success' === n ? z(r.success, e, n, t) : z(r.error, t, n, t.statusText),
          z(r.complete, t, n));
      }
    }),
    r.beforeSend && !1 === r.beforeSend.call(r, t, r) ? (t.abort(), t) : (t.send(i), t)
  );
}
function z(e, t, r, n) {
  if (!e) return;
  let a = Array.isArray(e) ? e : [e];
  for (let i = 0; a.length > i; i++) a[i](t, r, n);
}
function B(e, t) {
  return 0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded')
    ? e.replace(/%20/g, '+')
    : e;
}
function U(e) {
  let t = 'GET';
  return (e.type && (t = e.type), e.method && (t = e.method), t.toUpperCase());
}
function X(e, t = !1) {
  var r = [];
  return null == e ? '' : ($(r, e, t), r.join('&'));
}
function $(e, t, r, n = '') {
  let a = Array.isArray(t);
  for (let i in t) {
    let o = t[i],
      l = Array.isArray(o) || (!r && A(o));
    (n && (i = r ? n : n + '[' + (!a || l ? i : '') + ']'),
      !n && a ? V(e, o.name, o.value) : l ? $(e, o, r, i) : V(e, i, o));
  }
}
function V(e, t, r) {
  let n = 'function' == typeof r ? r() : r;
  e.push(encodeURIComponent(t) + '=' + encodeURIComponent(null === n ? '' : n));
}
function J(e, t) {
  if (Array.isArray(t) || b(t)) for (var r = 0; t.length > r; r++) J(e, t[r]);
  else e.push(t);
  return e;
}
function G(e, t) {
  return e.filter(e => t.includes(e));
}
function Y(e, t, r) {
  let n = [],
    a = 0,
    i = e.length;
  if (void 0 !== r) for (; i > a; a++) e[a] && e[a][t] && n.push(e[a][t][r]);
  else for (; i > a; a++) e[a] && n.push(e[a][t]);
  return n;
}
function Z(e, t, r, n) {
  let a = [],
    i = 0,
    o = t.length;
  if (void 0 !== n) for (; o > i; i++) e[t[i]] && e[t[i]][r] && a.push(e[t[i]][r][n]);
  else for (; o > i; i++) e[t[i]] && a.push(e[t[i]][r]);
  return a;
}
function Q(e, t) {
  var r,
    n = [];
  void 0 === t ? ((t = 0), (r = e)) : ((r = t), (t = e));
  for (var a = t; r > a; a++) n.push(a);
  return n;
}
function K(e) {
  for (var t = [], r = 0, n = e.length; n > r; r++) e[r] && t.push(e[r]);
  return t;
}
function ee(e) {
  if (Array.from && Set) return Array.from(new Set(e));
  if (
    (function (e) {
      if (2 > e.length) return !0;
      for (var t = e.slice().sort(), r = t[0], n = 1, a = t.length; a > n; n++) {
        if (t[n] === r) return !1;
        r = t[n];
      }
      return !0;
    })(e)
  )
    return e.slice();
  var t,
    r,
    n,
    a = [],
    i = e.length,
    o = 0;
  e: for (r = 0; i > r; r++) {
    for (t = e[r], n = 0; o > n; n++) if (a[n] === t) continue e;
    (a.push(t), o++);
  }
  return a;
}
((W.defaults = q), (W.serialize = X));
var te = /\[.*?\]$/,
  re = /\(\)$/;
function ne(e) {
  return (e.match(/(\\.|[^.])+/g) || ['']).map(function (e) {
    return e.replace(/\\\./g, '.');
  });
}
function ae(e) {
  if (null === e)
    return function (e) {
      return e;
    };
  if ('function' == typeof e)
    return function (t, r, n, a) {
      return e(t, r, n, a);
    };
  if (
    'string' != typeof e ||
    (-1 === e.indexOf('.') && -1 === e.indexOf('[') && -1 === e.indexOf('('))
  ) {
    if (A(e)) {
      let t = {};
      return (
        j(e, function (e, r) {
          r && (t[e] = ae(r));
        }),
        function (e, r, n, a) {
          let i = t[r] || t._;
          return void 0 !== i ? i(e, r, n, a) : e;
        }
      );
    }
    return function (t) {
      return t[e];
    };
  }
  {
    let t = function (e, r, n) {
      let a, i, o, l;
      if ('' !== n) {
        let s = ne(n);
        for (let n = 0, c = s.length; c > n; n++) {
          if (((a = s[n].match(te)), (i = s[n].match(re)), a)) {
            if (
              ((s[n] = s[n].replace(te, '')),
              '' !== s[n] && (e = e[s[n]]),
              (o = []),
              s.splice(0, n + 1),
              (l = s.join('.')),
              Array.isArray(e))
            )
              for (let n = 0, a = e.length; a > n; n++) o.push(t(e[n], r, l));
            let i = a[0].substring(1, a[0].length - 1);
            e = '' === i ? o : o.join(i);
            break;
          }
          if (i) ((s[n] = s[n].replace(re, '')), (e = e[s[n]]()));
          else {
            if (null === e || null === e[s[n]]) return null;
            if (void 0 === e || void 0 === e[s[n]]) return;
            e = e[s[n]];
          }
        }
      }
      return e;
    };
    return function (r, n) {
      return t(r, n, e);
    };
  }
}
function ie(e) {
  if (null === e) return function () {};
  if ('function' == typeof e)
    return function (t, r, n) {
      e(t, 'set', r, n);
    };
  if (
    'string' != typeof e ||
    (-1 === e.indexOf('.') && -1 === e.indexOf('[') && -1 === e.indexOf('('))
  )
    return A(e)
      ? ie(e._)
      : function (t, r) {
          t[e] = r;
        };
  {
    let t = function (e, r, n) {
      let a,
        i,
        o,
        l,
        s,
        c = ne(n),
        u = c[c.length - 1];
      for (let d = 0, f = c.length - 1; f > d; d++) {
        if ('__proto__' === c[d] || 'constructor' === c[d])
          throw new Error('Cannot set prototype values');
        if (((i = c[d].match(te)), (o = c[d].match(re)), i)) {
          if (
            ((c[d] = c[d].replace(te, '')),
            (e[c[d]] = []),
            (a = c.slice()),
            a.splice(0, d + 1),
            (s = a.join('.')),
            Array.isArray(r))
          )
            for (let n = 0, a = r.length; a > n; n++) ((l = {}), t(l, r[n], s), e[c[d]].push(l));
          else e[c[d]] = r;
          return;
        }
        (o && ((c[d] = c[d].replace(re, '')), (e = e[c[d]](r))),
          null == e[c[d]] && (e[c[d]] = {}),
          (e = e[c[d]]));
      }
      u.match(re) ? (e = e[u.replace(re, '')](r)) : (e[u.replace(te, '')] = r);
    };
    return function (r, n) {
      return t(r, n, e);
    };
  }
}
function oe(e, t = 250) {
  let r;
  return function (...n) {
    (clearTimeout(r),
      (r = setTimeout(() => {
        e.call(this, ...n);
      }, t)));
  };
}
function le(e, t = 200) {
  let r, n;
  return function (...a) {
    const i = +new Date();
    r && r + t > i
      ? (clearTimeout(n),
        (n = setTimeout(() => {
          ((r = void 0), e.call(this, ...a));
        }, t)))
      : ((r = i), e.call(this, ...a));
  };
}
function se(e, t) {
  let r = P('datatable');
  for (
    var n,
      a,
      i = t ? t.split('.') : r.ext.version.split('.'),
      o = e.split('.'),
      l = 0,
      s = o.length;
    s > l;
    l++
  )
    if ((n = parseInt(i[l], 10) || 0) !== (a = parseInt(o[l], 10) || 0)) return n > a;
  return !0;
}
var ce = {
    ajax: W,
    array: Object.freeze({
      __proto__: null,
      flatten: J,
      intersection: G,
      pluck: Y,
      pluckOrder: Z,
      range: Q,
      removeEmpty: K,
      selectiveJoin: function (e, t) {
        if ('number' == typeof t) return '' + e[t];
        if (0 === t.length) return '';
        let r = '' + e[t[0]];
        for (let n = 1; t.length > n; n++) r += '  ' + e[t[n]];
        return r;
      },
      unique: ee
    }),
    conv: y,
    data: Object.freeze({ __proto__: null, get: ae, set: ie }),
    debounce: oe,
    diacritics: f,
    escapeHtml: d,
    escapeRegex: u,
    external: P,
    get: ae,
    is: D,
    object: k,
    regex: i,
    set: ie,
    string: h,
    stripHtml: p,
    throttle: le,
    timer: Object.freeze({ __proto__: null, debounce: oe, throttle: le }),
    unique: ee,
    version: Object.freeze({ __proto__: null, check: se })
  },
  ue = 1,
  de = [];
function fe(e) {
  let t = e._event_uid;
  return t && de[t] ? de[t] : null;
}
var pe = [
  'click',
  'dblclick',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup'
];
function he(e, t, r) {
  Object.defineProperty(e, t, { configurable: !0, get: () => r });
}
function ge(e) {
  if (!e) return { eventName: null, namespaces: [] };
  let t = e.split('.'),
    r = t.shift(),
    n = !1,
    a = !1;
  return (
    'mouseenter' === r
      ? ((r = 'mouseover'), (n = !0))
      : 'mouseleave' === r
        ? ((r = 'mouseout'), (n = !0))
        : 'focus' === r
          ? ((r = 'focusin'), (a = !0))
          : 'blur' === r
            ? ((r = 'focusout'), (a = !0))
            : 'ready' === r && (r = 'DOMContentLoaded'),
    { eventName: r, isFocus: a, isHover: n, namespaces: t }
  );
}
function me(e, t, r, n, a) {
  let i = P('jq'),
    o = P('doc');
  if (i && e.constructor !== EventTarget) {
    let o = a ? 'one' : 'on';
    return void (n ? i(e)[o](t, n, r) : i(e)[o](t, r));
  }
  let { eventName: l, namespaces: s, isFocus: c, isHover: u } = ge(t);
  if (!l) return;
  if (e === o && 'DOMContentLoaded' === l && t.includes('ready') && 'complete' === o.readyState)
    return void r(new Event('DOMContentLoaded'));
  let d = function (t) {
    let i = e;
    if (t.namespace && !G(s, t.namespace.split('.')).length) return;
    if (!n && ((c && t.target !== e) || (u && t.relatedTarget && e.contains(t.relatedTarget))))
      return;
    if (n) {
      let r = (function (e, t, r) {
        let n = Array.from(e.querySelectorAll(t)),
          a = r.target;
        for (; a && a !== this; a = a.parentNode) for (let e of n) if (e === a) return a;
      })(e, n, t);
      if (!r) return;
      if (u && t.relatedTarget && r.contains(t.relatedTarget)) return;
      i = r;
    }
    (he(t, 'currentTarget', i),
      he(t, 'delegateTarget', e),
      he(t, 'relatedTarget', t.relatedTarget));
    let o = r.apply(i, [t, ...(t._args || [])]);
    (a && ve(e, l, r, n), !1 === o && (t.preventDefault(), t.stopPropagation()), (t.result = o));
  };
  ((d.delegateSelector = n),
    (d.original = r),
    (d.one = a),
    (d.type = l),
    (d.namespaces = s),
    (function (e, t) {
      let r = (function (e) {
        return (e._event_uid || (e._event_uid = ue++), e._event_uid);
      })(e);
      (void 0 === de[r] && (de[r] = []), de[r].push(t));
    })(e, d),
    e.addEventListener(l, d));
}
function ve(e, t, r, n) {
  let a = P('jq');
  if (a && e.constructor !== EventTarget) return void (n ? a(e).off(t, n, r) : a(e).off(t, r));
  let { eventName: i, namespaces: o } = ge(t),
    l = [],
    s = fe(e);
  null !== s &&
    ((l =
      i && n && r
        ? s.filter(e => e.type === i && e.delegateSelector === n && e.original === r)
        : i && n
          ? s.filter(e => e.type === i && e.delegateSelector === n)
          : i && r
            ? s.filter(e => e.type === i && e.original === r)
            : i
              ? s.filter(e => e.type === i)
              : s),
    o.length && (l = l.filter(e => e.namespaces.filter(e => o.includes(e)).length === o.length)),
    l.forEach(t => {
      (!(function (e, t) {
        let r = fe(e);
        if (!r) return;
        let n = r.indexOf(t);
        -1 !== n && r.splice(n, 1);
      })(e, t),
        e.removeEventListener(t.type, t));
    }));
}
function ye(e, t, r = !1, n = [], a = null, i = !1) {
  let o = P('jq'),
    l = P('win');
  if (o && e.constructor !== EventTarget) {
    let l = r ? 'trigger' : 'triggerHandler',
      s = o.Event(t);
    return (
      j(a, (e, t) => {
        he(s, e, t);
      }),
      o(e)[l](s, n || []),
      i ? ((s.defaultPrevented = s.isDefaultPrevented()), s) : !s.isDefaultPrevented()
    );
  }
  let s,
    { eventName: c, namespaces: u } = ge(t);
  return (
    !!c &&
    ((s =
      e.constructor === EventTarget
        ? new Event(c, { bubbles: r, cancelable: !0 })
        : pe.includes(c.toLowerCase())
          ? new l.MouseEvent(c, { bubbles: r, cancelable: !0 })
          : new l.Event(c, { bubbles: r, cancelable: !0 })),
    he(s, 'namespace', u.join('.')),
    he(s, '_args', n || []),
    j(a, (e, t) => he(s, e, t)),
    e.dispatchEvent(s),
    i ? s : !s.defaultPrevented)
  );
}
var be = {
  height() {
    var e;
    return (
      (null === (e = P('doc').querySelector('html')) || void 0 === e ? void 0 : e.clientHeight) || 0
    );
  },
  off(e, t = null) {
    ve(window, e, t, null);
  },
  on(e, t) {
    me(window, e, t, null, !1);
  },
  one(e, t) {
    me(window, e, t, null, !0);
  },
  scrollLeft: e => (void 0 !== e && (window.scrollX = e), window.scrollX),
  scrollTop: e => (void 0 !== e && (window.scrollY = e), window.scrollY),
  width() {
    var e;
    return (
      (null === (e = P('doc').querySelector('html')) || void 0 === e ? void 0 : e.clientWidth) || 0
    );
  }
};
function we(e) {
  let t = P('doc').createElement(e);
  return new _e(t);
}
function xe(e) {
  return new _e(e);
}
var Te = new EventTarget(),
  _e = class e {
    constructor(e) {
      ((this.length = 0), (this._isDom = !0), e && this.add(e));
    }
    add(t, r = !0) {
      if (t)
        if ('string' == typeof t) Oe(this, Array.from(P('doc').querySelectorAll(t)));
        else if (t instanceof e) Oe(this, t.get());
        else if ('object' != typeof t || t.nodeName || void 0 === t.length) Oe(this, t);
        else {
          let e = t;
          for (let t = 0; e.length > t; t++) Oe(this, e[t]);
          r = !1;
        }
      return (r && this.sort(), this);
    }
    append(e) {
      if (!e) return this;
      b(e) || (e = [e]);
      let t = J([], e).filter(e => !!e);
      return t.find(e => 'string' == typeof e)
        ? this.each(e => {
            for (let r = 0; t.length > r; r++)
              'string' == typeof t[r] ? e.insertAdjacentHTML('beforeend', t[r]) : e.append(t[r]);
          })
        : this.each(e => {
            let r = new DocumentFragment();
            for (let n = 0; t.length > n; n++) r.append(t[n]);
            e.append(r);
          });
    }
    appendTo(t) {
      return ((t instanceof e ? t : new e(t)).append(this), this);
    }
    attr(e, t) {
      return 'string' == typeof e && void 0 === t
        ? this.count()
          ? this[0].getAttribute(e)
          : null
        : this.each(r => {
            'string' == typeof e
              ? null != t && r.setAttribute(e, 'string' == typeof t ? t : t.toString())
              : j(e, (e, t) => {
                  null != t && r.setAttribute(e, t);
                });
          });
    }
    attrRemove(e) {
      return this.each(t => t.removeAttribute(e));
    }
    blur() {
      return this.each(e => e.blur());
    }
    children(e) {
      return this.map(t => {
        let r = Array.from(t.children);
        return e ? r.filter(t => t.matches(e)) : r;
      });
    }
    classAdd(e) {
      if (!e) return this;
      let t = Ne(e);
      return this.each(e => {
        t.filter(e => e).forEach(t => e.classList.add(t));
      });
    }
    classHas(e) {
      return !!this.count() && this[0].classList.contains(e);
    }
    classRemove(e) {
      if (!e) return this;
      let t = Ne(e);
      return this.each(e => {
        t.filter(e => e).forEach(t => e.classList.remove(t));
      });
    }
    classToggle(e, t) {
      let r = Array.isArray(e) ? e : e.split(' ');
      return this.each(e => {
        r.filter(e => e).forEach(r => e.classList.toggle(r, t));
      });
    }
    clone(e = !1) {
      return this.map(t => t.cloneNode(e));
    }
    closest(e) {
      return this.map(
        'string' == typeof e
          ? t => t.closest(e)
          : t => {
              for (; t.parentElement;) {
                if (t.parentElement === e) return e;
                t = t.parentElement;
              }
              return null;
            }
      );
    }
    contains(e) {
      return 0 !== this.find(e).count();
    }
    count() {
      return this.length;
    }
    css(e, t) {
      return 'string' == typeof e && void 0 === t
        ? this.length
          ? getComputedStyle(this[0])[e]
          : null
        : this.each(r => {
            'string' == typeof e ? (r.style[e] = t) : Object.assign(r.style, e);
          });
    }
    data(e, t) {
      if (!e) {
        let e = {};
        return this.count()
          ? (ce.object.each(this[0].dataset, (t, r) => {
              e[t] = Ae(r);
            }),
            e)
          : e;
      }
      return 'string' == typeof e && void 0 === t
        ? this.length
          ? Ae(this[0].dataset[e])
          : null
        : ('string' == typeof e
            ? this.each(r => (r.dataset[e] = JSON.stringify(t)))
            : j(e, (e, t) => {
                this.each(r => (r.dataset[e] = JSON.stringify(t)));
              }),
          this);
    }
    detach() {
      return this.each(e => e.remove());
    }
    detachChildren() {
      return this.each(e => {
        e.replaceChildren();
      });
    }
    each(e) {
      for (let t = 0; this.length > t; t++) {
        let r = this[t];
        e.call(r, r, t);
      }
      return this;
    }
    eachReverse(e) {
      for (let t = this.length - 1; t >= 0; t--) {
        let r = this[t];
        e.call(r, r, t);
      }
      return this;
    }
    empty() {
      return this.each(e => {
        var t;
        if (e.replaceChildren) e.replaceChildren();
        else for (; e.childNodes.length;) null === (t = e.firstChild) || void 0 === t || t.remove();
      });
    }
    eq(t) {
      return t < this.count() ? new e(this.get(t)) : new e();
    }
    get(e) {
      return void 0 !== e ? this[e] : Array.from(this);
    }
    focus() {
      return this.each(e => e.focus());
    }
    filter(e) {
      return this.map(t =>
        void 0 === e
          ? t
          : 'function' == typeof e
            ? e(t)
              ? t
              : null
            : 'string' != typeof e
              ? b(e)
                ? Array.from(e).includes(t)
                  ? t
                  : null
                : e === t
                  ? t
                  : null
              : t.matches(e) &&
                  (t.parentNode || (!e.match(/:\w+-child/) && !e.match(/:\w+-of-type/)))
                ? t
                : null
      );
    }
    find(t) {
      if (null === t) return new e();
      if ('string' == typeof t) return this.map(e => Array.from(e.querySelectorAll(t)));
      let r = t instanceof e ? t.get() : t,
        n = !1;
      return (
        this.each(t => {
          new e(r).closest(t).count() && (n = !0);
        }),
        new e(n ? r : [])
      );
    }
    first() {
      return new e(this.length ? this[0] : null);
    }
    height(e) {
      if (!this.count()) return 0;
      if (
        void 0 === e ||
        'withPadding' === e ||
        'withBorder' === e ||
        'withMargin' === e ||
        'inner' === e ||
        'outer' === e
      ) {
        let t = this[0],
          r = P('win').getComputedStyle(this[0]),
          n = t.getBoundingClientRect().height;
        if (e && 'content' !== e)
          return 'withPadding' === e || 'inner' === e
            ? n - parseFloat(r.borderTop) - parseFloat(r.borderBottom)
            : 'withBorder' === e
              ? n
              : n + parseFloat(r.marginTop) + parseFloat(r.marginBottom);
        {
          let e =
            t.offsetHeight - parseFloat(r.borderTop) - parseFloat(r.borderBottom) - t.clientHeight;
          return (
            n -
            parseFloat(r.paddingTop) -
            parseFloat(r.paddingBottom) -
            parseFloat(r.borderTop) -
            parseFloat(r.borderBottom) -
            e
          );
        }
      }
      return this.each(t => (t.style.height = 'string' == typeof e ? e : e + 'px'));
    }
    hide() {
      return this.each(e => {
        e.style.display = 'none';
      });
    }
    html(e) {
      return void 0 !== e
        ? this.each(t => {
            t.innerHTML = e;
          })
        : this.count()
          ? this[0].innerHTML
          : null;
    }
    is(e) {
      return this.filter(e).count() > 0;
    }
    isAttached() {
      return 0 !== this.count() && P('doc').body.contains(this[0]);
    }
    isVisible() {
      if (0 === this.count()) return !1;
      let e = this[0];
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }
    index() {
      if (this.count()) {
        let e = this[0];
        return Array.from(e.parentNode.children).indexOf(e);
      }
      return -1;
    }
    insertAfter(e) {
      let t = Ce(e);
      return this.eachReverse(e => {
        t.forEach(t => {
          var r;
          return null === (r = null == t ? void 0 : t.parentNode) || void 0 === r
            ? void 0
            : r.insertBefore(e, t.nextSibling);
        });
      });
    }
    insertBefore(e) {
      let t = Ce(e);
      return this.each(e => {
        t.forEach(t => {
          var r;
          return null === (r = null == t ? void 0 : t.parentNode) || void 0 === r
            ? void 0
            : r.insertBefore(e, t);
        });
      });
    }
    last() {
      let t = this;
      return new e(t.length ? t[t.length - 1] : null);
    }
    map(t) {
      let r = new e();
      return (
        this.each(e => {
          r.add(t(e), !1);
        }),
        r
      );
    }
    mapTo(e) {
      let t = [];
      return (this.each((r, n) => t.push(e(r, n))), t);
    }
    off(e, t, r) {
      let { handler: n, names: a, selector: i } = De(e, t, r);
      return this.each(e => {
        a.forEach(t => {
          ve(e, t, n, i);
        });
      });
    }
    offset() {
      if (!this.count()) return { top: 0, left: 0 };
      let e = this[0].getBoundingClientRect(),
        t = P('doc').documentElement;
      return {
        top: e.top + P('win').pageYOffset - t.clientTop,
        left: e.left + P('win').pageXOffset - t.clientLeft
      };
    }
    offsetParent() {
      return this.map(e => e.offsetParent || P('doc').body);
    }
    on(e, t, r) {
      let { handler: n, names: a, selector: i } = De(e, t, r);
      return this.each(e => {
        a.filter(e => null !== e).forEach(t => {
          me(e, t, n, i, !1);
        });
      });
    }
    one(e, t, r) {
      let { handler: n, names: a, selector: i } = De(e, t, r);
      return this.each(e => {
        a.filter(e => null !== e).forEach(t => {
          me(e, t, n, i, !0);
        });
      });
    }
    parent(e) {
      return this.map(t => {
        let r = t.parentElement;
        return e ? ((null == r ? void 0 : r.matches(e)) ? r : null) : r;
      });
    }
    position() {
      if (!this.count()) return { top: 0, left: 0 };
      let e = this[0],
        { marginTop: t, marginLeft: r } = getComputedStyle(e);
      return { top: e.offsetTop - parseInt(t), left: e.offsetLeft - parseInt(r) };
    }
    prepend(t) {
      return this.each(r => {
        t instanceof e
          ? Array.from(t)
              .reverse()
              .forEach(e => r.prepend(e))
          : 'string' == typeof t
            ? r.insertAdjacentHTML('afterbegin', t)
            : r.prepend(t);
      });
    }
    prependTo(t) {
      return (t instanceof e ? t.prepend(this) : new e(t).prepend(this), this);
    }
    prop(e, t) {
      return 'string' == typeof e && void 0 === t
        ? this.count()
          ? this[0][e]
          : null
        : this.each(r => {
            r[e] = t;
          });
    }
    propRemove(e) {
      return this.each(t => {
        delete t[e];
      });
    }
    remove() {
      return this.each(e => e.remove());
    }
    replaceWith(t) {
      return this.each(r => {
        t instanceof e ? r.replaceWith(...t.get()) : r.replaceWith(t);
      });
    }
    scrollLeft(e) {
      return void 0 === e
        ? this.count()
          ? this[0].scrollLeft
          : 0
        : this.each(t => (t.scrollLeft = e));
    }
    scrollTop(e) {
      return void 0 === e
        ? this.count()
          ? this[0].scrollTop
          : 0
        : this.each(t => (t.scrollTop = e));
    }
    siblings() {
      return this.map(e =>
        e.parentElement ? Array.from(e.parentElement.children).filter(t => t !== e) : []
      );
    }
    show() {
      return this.each(e => {
        e.style.display = 'block';
      });
    }
    sort() {
      return (Array.prototype.sort.call(this, je), this);
    }
    text(e) {
      return void 0 === e
        ? this.count()
          ? this[0].textContent
          : null
        : this.each(t => {
            t.textContent = e;
          });
    }
    transition(t, r, n, a) {
      if (!this.count()) return this;
      if (
        (r || 0 === r || (r = 400), n || (n = ''), a || (a = () => {}), e.transitions && 0 !== r)
      ) {
        let e = this[0];
        (e._dom_tra && (clearTimeout(e._dom_tra), delete e._dom_tra),
          setTimeout(() => {
            (this.css('transition', 'all ' + r + 'ms ' + n), this.css(t));
          }, 0),
          (e._dom_tra = setTimeout(() => {
            (delete e._dom_tra, this.css('transition', ''), a.call(this));
          }, r)));
      } else (this.css(t), a.call(this));
      return this;
    }
    trigger(e, t = !0, r = null, n = null, a = !1) {
      let { names: i } = De(e),
        o = [];
      return (
        this.each(e => {
          i.filter(e => null !== e).forEach(i => {
            o.push(ye(e, i, t, r, n, a));
          });
        }),
        o
      );
    }
    val(e) {
      if (void 0 === e) {
        if (!this.count()) return null;
        let e = this[0];
        return e.options && e.multiple
          ? Array.from(e.options)
              .filter(e => e.selected)
              .map(e => e.value)
          : e.value;
      }
      return this.each(t => {
        if (t.options && t.multiple) {
          let r = Array.isArray(e) ? e : [e];
          Array.from(t.options).forEach(e => (e.selected = r.includes(e.value)));
        } else t.value = e;
      });
    }
    width(e) {
      if (!this.count()) return 0;
      if (
        void 0 === e ||
        'withPadding' === e ||
        'withBorder' === e ||
        'withMargin' === e ||
        'inner' === e ||
        'outer' === e
      ) {
        let t = this[0],
          r = P('win').getComputedStyle(t),
          n = t.getBoundingClientRect().width;
        if (e && 'content' !== e)
          return 'withPadding' === e || 'inner' === e
            ? n - parseFloat(r.borderLeft) - parseFloat(r.borderRight)
            : 'withBorder' === e
              ? n
              : n + parseFloat(r.marginLeft) + parseFloat(r.marginRight);
        {
          let e =
            t.offsetWidth - parseFloat(r.borderLeft) - parseFloat(r.borderRight) - t.clientWidth;
          return (
            n -
            parseFloat(r.paddingLeft) -
            parseFloat(r.paddingRight) -
            parseFloat(r.borderLeft) -
            parseFloat(r.borderRight) -
            e
          );
        }
      }
      return this.each(t => (t.style.width = 'string' == typeof e ? e : e + 'px'));
    }
  };
function Ae(e) {
  if (void 0 === e) return null;
  try {
    return JSON.parse(e);
  } catch (t) {
    return e;
  }
}
function De(e, t, r) {
  let n, a;
  return (
    'string' == typeof t ? ((n = t), (a = r)) : ((n = null), (a = t)),
    { handler: a, names: e ? e.split(' ').map(e => e.trim()) : [null], selector: n }
  );
}
function je(e, t) {
  if (e === t) return 0;
  let r = e.compareDocumentPosition(t);
  return r & Node.DOCUMENT_POSITION_DISCONNECTED
    ? P('doc').body.contains(e)
      ? -1
      : P('doc').body.contains(t)
        ? 1
        : 0
    : r & Node.DOCUMENT_POSITION_FOLLOWING || r & Node.DOCUMENT_POSITION_CONTAINED_BY
      ? -1
      : r & Node.DOCUMENT_POSITION_PRECEDING || r & Node.DOCUMENT_POSITION_CONTAINS
        ? 1
        : 0;
}
function Ce(e) {
  return w(e) ? e.get() : Array.isArray(e) ? e : [e];
}
function Oe(e, t) {
  if (ce.is.arrayLike(t))
    for (var r = 0; t.length > r; r++) {
      let n = t[r];
      null != n && ((e[e.length] = n), e.length++);
    }
  else null != t && ((e[e.length] = t), e.length++);
}
function Ne(e) {
  let t = [],
    r = function (e) {
      t.push.apply(t, e.split(' '));
    };
  return (Array.isArray(e) ? e.forEach(e => r(e)) : r(e), t);
}
((_e.c = we),
  (_e.create = we),
  (_e.on = function (e, t) {
    me(Te, e, t, null, !1);
  }),
  (_e.s = xe),
  (_e.select = xe),
  (_e.transitions = !0),
  (_e.trigger = function (e, t, r) {
    ye(Te, e, !0, t, r);
  }),
  (_e.w = be),
  (_e.prototype.addClass = _e.prototype.classAdd),
  (_e.prototype.hasClass = _e.prototype.classHas),
  (_e.prototype.removeClass = _e.prototype.classRemove));
var Se = {},
  Re = [];
function Ie(e, t, r = '') {
  ((Se[e] = t), r && Re.push({ cFeature: r, fnInit: t }));
}
function Ee(e, t, r, n) {
  let a = [],
    i = Math.floor(r / 2),
    o = n ? 2 : 1,
    l = n ? 1 : 0;
  return (
    t > r
      ? 1 === r
        ? (a = [e])
        : 3 === r
          ? e > 1
            ? t - 2 > e
              ? (a = ['ellipsis', e, 'ellipsis'])
              : ((a = Q(t - 2, t)), a.unshift('ellipsis'))
            : (a = [0, 1, 'ellipsis'])
          : e > i
            ? t - 1 - i > e
              ? ((a = Q(e - i + o, e + i - l)),
                a.push('ellipsis'),
                a.unshift('ellipsis'),
                n && (a.push(t - 1), a.unshift(0)))
              : ((a = Q(t - (r - o), t)), a.unshift('ellipsis'), n && a.unshift(0))
            : ((a = Q(0, r - o)), a.push('ellipsis'), n && a.push(t - 1))
      : (a = Q(0, t)),
    a
  );
}
var Le = {
    simple: function () {
      return ['previous', 'next'];
    },
    full: function () {
      return ['first', 'previous', 'next', 'last'];
    },
    numbers: function () {
      return ['numbers'];
    },
    simple_numbers: function () {
      return ['previous', 'numbers', 'next'];
    },
    full_numbers: function () {
      return ['first', 'previous', 'numbers', 'next', 'last'];
    },
    first_last: function () {
      return ['first', 'last'];
    },
    first_last_numbers: function () {
      return ['first', 'numbers', 'last'];
    },
    _numbers: Ee,
    numbers_length: 7
  },
  Me = {
    addedClasses: [],
    cells: [],
    data: [],
    details: void 0,
    detailsShow: void 0,
    displayData: null,
    idx: -1,
    orderCache: null,
    searchCellCache: null,
    searchRowCache: null,
    src: 'dom',
    tr: null
  };
function Fe(e = {}) {
  return ce.object.assignDeep({}, Me, e);
}
function ke(e, t, r, n) {
  var a = e.data.length,
    i = Fe({ src: r ? 'dom' : 'data', idx: a });
  ((i.data = t), e.data.push(i));
  for (var o = e.columns, l = 0, s = o.length; s > l; l++) o[l].type = null;
  e.displayMaster.push(a);
  var c = e.rowIdFn(t);
  return (void 0 !== c && (e.ids[c] = i), (!r && e.features.deferRender) || St(e, a, r, n), a);
}
function He(e, t) {
  return t.mapTo(t => {
    let r = (function (e, t) {
      let r = e.rowReadObject ? {} : [],
        n = _e.s(t).children('th, td'),
        a = t.getAttribute('id');
      return (
        n.each((t, n) => {
          Xe(e, t, r, n);
        }),
        a && ce.set(e.rowId)(r, a),
        { data: r, cells: n.get() }
      );
    })(e, t);
    return ke(e, r.data, t, r.cells);
  });
}
function Pe(e, t, r, n) {
  'search' === n ? (n = 'filter') : 'order' === n && (n = 'sort');
  var a = e.data[t];
  if (a) {
    var i = e.drawCount,
      o = e.columns[r],
      l = a.data,
      s = o.defaultContent,
      c = o.dataGet(l, n, { settings: e, row: t, col: r });
    if (
      ('display' !== n && c && 'object' == typeof c && c.nodeName && (c = c.innerHTML),
      void 0 === c)
    )
      return (
        e.drawError != i &&
          null === s &&
          (zt(
            e,
            0,
            'Requested unknown parameter ' +
              ('function' == typeof o.data ? '{function}' : "'" + o.data + "'") +
              ' for row ' +
              t +
              ', column ' +
              r,
            4
          ),
          (e.drawError = i)),
        s
      );
    if ((c !== l && null !== c) || null === s || void 0 === n) {
      if ('function' == typeof c) return c.call(l);
    } else c = s;
    if (null === c && 'display' === n) return '';
    if ('filter' === n) {
      var u = Hr.type.search;
      o.type && u[o.type] && (c = u[o.type](c));
    }
    return c;
  }
}
function qe(e, t) {
  let r = _e.s(e);
  t && 'object' == typeof t && t.nodeName ? r.empty().append(t) : r.html(t);
}
function We(e) {
  return ce.array.pluck(e.data, 'data');
}
function ze(e) {
  ((e.data.length = 0), (e.displayMaster.length = 0), (e.display.length = 0), (e.ids = {}));
}
function Be(e, t, r, n) {
  var a,
    i,
    o = e.data[t];
  if (o) {
    if (
      ((o.orderCache = null),
      (o.searchCellCache = null),
      (o.displayData = null),
      'dom' !== r && ((r && 'auto' !== r) || 'dom' !== o.src))
    ) {
      var l = o.cells,
        s = Nt(e, t);
      if (l.length)
        if (void 0 !== n) qe(l[n], s[n]);
        else for (a = 0, i = l.length; i > a; a++) qe(l[a], s[a]);
    } else
      o.data = (function (e, t, r) {
        let n = t.cells;
        for (let a = 0; n.length > a; a++) (void 0 !== r && r !== a) || Xe(e, n[a], t.data, a);
        if (t.tr) {
          let r = t.tr.getAttribute('id');
          r && ce.set(e.rowId)(t.data, r);
        }
        return { data: t.data, cells: n };
      })(e, o, n).data;
    (Ue(e, n), Rt(e, o), $t(e, null, 'rowInvalidate', [e, t, n], !1));
  }
}
function Ue(e, t) {
  var r = e.columns;
  if (void 0 !== t) ((r[t].type = null), (r[t].wideStrings = null));
  else for (let n = 0, a = r.length; a > n; n++) ((r[n].type = null), (r[n].wideStrings = null));
  e.containerWidth = -1;
}
function Xe(e, t, r, n) {
  let a = e.columns[n],
    i = t.innerHTML.trim();
  if (a.attrSrc) {
    let e = a.data,
      n = function (e, t) {
        if ('string' == typeof e) {
          let n = e.indexOf('@');
          if (-1 !== n) {
            let a = e.substring(n + 1);
            ce.set(e)(r, t.getAttribute(a));
          }
        }
      };
    (ce.set(e._)(r, i), n(e.sort, t), n(e.type, t), n(e.filter, t));
  } else (a.setter || (a.setter = ce.set(a.data)), a.setter(r, i));
}
function $e(e, t) {
  (e.doingDraw && !1 === t) || $t(e, null, 'processing', [e, t]);
}
function Ve(e, t, r) {
  t
    ? ($e(e, !0),
      setTimeout(function () {
        (r(), $e(e, !1));
      }, 0))
    : r();
}
function Je(e, t) {
  var r = e.renderer,
    n = Hr.renderer[t];
  return A(r) && r[t] ? n[r[t]] || n._ : ('string' == typeof r && n[r]) || n._;
}
function Ge(e) {
  if (e.features.autoWidth) {
    var t,
      r,
      n,
      a = e.table,
      i = e.columns,
      o = e.scroll,
      l = o.y,
      s = o.x,
      c = Or(e, 'visible'),
      u = a.getAttribute('width'),
      d = a.parentElement,
      f = a.style.width,
      p = Ye(e);
    if (p === e.containerWidth) return !1;
    ((e.containerWidth = p),
      f || u || ((a.style.width = '100%'), (f = '100%')),
      f && -1 !== f.indexOf('%') && (u = f),
      $t(e, null, 'column-calc', [{ visible: c }], !1));
    var h = _e.s(a.cloneNode()).css('visibility', 'hidden').css('margin', '0').attrRemove('id');
    (h.append(_e.c('tbody')),
      h.append(e.thead.cloneNode(!0)).append(e.tfoot.cloneNode(!0)),
      h.find('tfoot th, tfoot td').css('width', ''),
      h.find('thead th, thead td').each(t => {
        var r = Er(e, t, !0);
        r
          ? ((t.style.width = r),
            s &&
              ((t.style.minWidth = r),
              _e
                .s(t)
                .append(
                  _e
                    .c('div')
                    .css({ width: r, margin: '0', padding: '0', border: '0', height: '1px' })
                )))
          : (t.style.width = '');
      }));
    var g = [];
    for (t = 0; c.length > t; t++) g.push(Ze(e, c[t]));
    if (g.length)
      for (t = 0; g[0].length > t; t++) {
        var m = _e.c('tr').appendTo(h.children('tbody'));
        for (r = 0; c.length > r; r++) {
          var v = g[r][t] || '',
            y = Hr.type.className[(n = i[c[r]]).type],
            b = v + (n.contentPadding || (s ? '-' : '')),
            w = _e.c('td').classAdd(y).classAdd(n.className).appendTo(m);
          -1 === v.indexOf('<') && -1 === v.indexOf('&') ? w.text(b) : w.html(b);
        }
      }
    h.find('[name]').attrRemove('name');
    var x = _e
      .c('div')
      .css(
        s || l
          ? {
              position: 'absolute',
              top: '0',
              left: '0',
              height: '1px',
              right: '0',
              overflow: 'hidden'
            }
          : {}
      )
      .append(h)
      .appendTo(d);
    s
      ? (h.css('width', 'auto').attrRemove('width'),
        h.width() < d.clientWidth && u && h.width(d.clientWidth))
      : l
        ? h.width(d.clientWidth)
        : u && h.width(u);
    var T = 0,
      _ = h.find('tbody tr').eq(0).children();
    for (t = 0; c.length > t; t++) {
      var A = _.get(t).getBoundingClientRect().width;
      ((T += A), (i[c[t]].width = Qe(A)));
    }
    if (
      ((a.style.width = Qe(T)), x.remove(), u && (a.style.width = Qe(u)), (u || s) && !e.reszEvt)
    ) {
      var D = ce.throttle(function () {
        var t = Ye(e);
        e.destroying || 0 === t || Ar(e);
      });
      if (window.ResizeObserver) {
        var j = _e.s(e.tableWrapper).isVisible(),
          C = _e
            .c('div')
            .css({ width: '100%', height: '0' })
            .classAdd('dt-autosize')
            .appendTo(e.tableWrapper);
        ((e.resizeObserver = new ResizeObserver(function (e) {
          j ? (j = !1) : D();
        })),
          e.resizeObserver.observe(C.get(0)));
      } else (window.addEventListener('resize', D), (e.windowResizeCb = D));
      e.reszEvt = !0;
    }
  }
}
function Ye(e) {
  let t = _e.s(e.tableWrapper);
  return t.isVisible() ? t.width() : 0;
}
function Ze(e, t) {
  var r = e.columns[t];
  if (!r.wideStrings) {
    for (var n = [], a = [], i = 0, o = e.displayMaster.length; o > i; i++) {
      var l = Nt(e, e.displayMaster[i])[t],
        s = l && 'object' == typeof l && l.nodeType ? l.innerHTML : l + '';
      s = (s = s.replace(/id=".*?"/g, '').replace(/name=".*?"/g, ''))
        .replace(/<script[\s\S]*?<\/script(?:\s[^>]*)?>/gi, ' ')
        .replace(/<dialog[\s\S]*?<\/dialog(?:\s[^>]*)?>/gi, ' ')
        .replace(/<template[\s\S]*?<\/template(?:\s[^>]*)?>/gi, ' ');
      var c = ce.string.stripHtml(s, ' ').replace(/&nbsp;/g, ' ');
      (a.push({ str: s, len: c.length }), n.push(c));
    }
    (a
      .sort(function (e, t) {
        return t.len - e.len;
      })
      .splice(3),
      (r.wideStrings = a.map(function (e) {
        return e.str;
      })));
    const u = n.join(' ').split(' ');
    (u.sort(function (e, t) {
      return t.length - e.length;
    }),
      u.length && r.wideStrings.push(u[0]),
      u.length > 1 && r.wideStrings.push(u[1]),
      u.length > 2 && r.wideStrings.push(u[3]));
  }
  return r.wideStrings;
}
function Qe(e) {
  return null === e
    ? '0px'
    : 'number' == typeof e
      ? 0 > e
        ? '0px'
        : e + 'px'
      : e.match(/\d$/)
        ? e + 'px'
        : e;
}
function Ke(e) {
  var t = e.columns;
  e.colgroup.empty();
  for (var r = 0; t.length > r; r++) t[r].visible && e.colgroup.append(t[r].colEl);
}
function et(e) {
  let t = _e.s(e.table),
    r = e.scroll,
    n = r.x,
    a = r.y;
  if ('' === a && '' === n) return t.get(0);
  let i = e.classes.scrolling,
    o = e.captionNode,
    l = o ? o._captionSide : null,
    s = t.clone(!1),
    c = t.clone(!1),
    u = t.children('tfoot'),
    d = function (e) {
      return e ? Qe(e) : '100%';
    },
    f = _e
      .c('div')
      .classAdd(i.container)
      .attr('role', 'table')
      .append(
        _e
          .c('div')
          .classAdd(i.header.self)
          .css({ overflow: 'hidden', position: 'relative', border: '0', width: n ? d(n) : '100%' })
          .attr('role', 'none')
          .append(
            _e
              .c('div')
              .classAdd(i.header.inner)
              .css({ 'box-sizing': 'content-box', width: r.xInner || '100%' })
              .attr('role', 'none')
              .append(
                s
                  .attrRemove('id')
                  .css('margin-left', '0')
                  .append('top' === l ? o : null)
                  .append(t.children('thead'))
              )
          )
      )
      .append(
        _e
          .c('div')
          .classAdd(i.body)
          .css({ position: 'relative', overflow: 'auto', width: d(n) })
          .attr('role', 'none')
          .append(t)
      );
  u.count() &&
    f.append(
      _e
        .c('div')
        .classAdd(i.footer.self)
        .css({ overflow: 'hidden', border: '0', width: n ? d(n) : '100%' })
        .attr('role', 'none')
        .append(
          _e
            .c('div')
            .classAdd(i.footer.inner)
            .attr('role', 'none')
            .append(
              c
                .attrRemove('id')
                .css('margin-left', '0')
                .append('bottom' === l ? o : null)
                .append(t.children('tfoot'))
            )
        )
    );
  let p = f.children(),
    h = p.eq(0),
    g = p.eq(1),
    m = p.eq(2);
  (g.on('scroll.DT', () => {
    let e = g.scrollLeft();
    (h.scrollLeft(e), m.scrollLeft(e));
  }),
    h.on('scroll.DT', () => {
      let e = h.scrollLeft();
      (g.scrollLeft(e), m.scrollLeft(e));
    }),
    m.on('scroll.DT', () => {
      let e = m.scrollLeft();
      (h.scrollLeft(e), g.scrollLeft(e));
    }),
    g.css('max-height', d(a)),
    r.collapse || g.css('height', d(a)),
    (e.scrollHead = h),
    (e.scrollBody = g),
    (e.scrollFoot = m),
    e.callbacks.draw.push(tt),
    t.attr('role', 'none'),
    t.find('tbody').attr('role', 'rowgroup'),
    s.attr('role', 'none'),
    c.attr('role', 'none'),
    e.colgroup.find('colgroup').attr('role', 'none'));
  let v = t.attr('aria-describedby');
  return (v && (f.attr('aria-describedby', v), t.attrRemove('aria-describedby')), f.get(0));
}
function tt(e) {
  let t,
    r,
    n = e.scroll,
    a = n.barWidth,
    i = e.scrollHead.children('div'),
    o = i.children('table'),
    l = e.scrollBody,
    s = l,
    c = e.scrollFoot.children('div'),
    u = c.children('table'),
    d = _e.s(e.thead),
    f = _e.s(e.table),
    p = _e.s(e.tfoot),
    h = e.browser,
    g = l.get(0).scrollHeight > l.get(0).clientHeight;
  if (e.scrollBarVis !== g && void 0 !== e.scrollBarVis) return ((e.scrollBarVis = g), void Ar(e));
  if (
    ((e.scrollBarVis = g),
    d.find('thead').attr('role', 'rowgroup'),
    p.find('tfoot').attr('role', 'rowgroup'),
    f.children('thead, tfoot').remove(),
    (t = d.clone(!0).prependTo(f)),
    t.find('th, td').attrRemove('tabindex'),
    t.find('[id]').attrRemove('id'),
    p.count() && ((r = p.clone(!0).prependTo(f)), r.find('[id]').attrRemove('id')),
    e.display.length)
  ) {
    let t = null,
      r = 'ssp' !== Jt(e) ? e.displayStart : 0;
    for (let n = r; r + e.display.length > n; n++) {
      let r = e.data[e.display[n]];
      if (r) {
        let e = r.tr;
        if (e) {
          t = e;
          break;
        }
      }
    }
    if (t) {
      let r = _e
        .s(t)
        .children('th, td')
        .mapTo(function (t, r) {
          return { idx: Dr(e, r), width: _e.s(t).width('outer') };
        });
      for (let t = 0; r.length > t; t++) {
        let a = e.columns[r[t].idx].colEl;
        (a.css('width', r[t].width + 'px'), n.x && a.css('minWidth', r[t].width + 'px'));
      }
    }
  }
  (o.find('colgroup').remove(),
    o.append(e.colgroup.clone(!0)),
    p && (u.find('colgroup').remove(), u.append(e.colgroup.clone(!0))),
    t.find('th, td').each(function (e) {
      _e.c('div').classAdd('dt-scroll-sizing').append(Array.from(e.childNodes)).appendTo(e);
    }),
    r &&
      r.find('th, td').each(function (e) {
        _e.c('div').classAdd('dt-scroll-sizing').append(Array.from(e.childNodes)).appendTo(e);
      }));
  let m = Math.floor(f.height()) > l.get(0).clientHeight || 'scroll' == s.css('overflow-y'),
    v = 'padding' + (h.scrollbarLeft ? 'Left' : 'Right'),
    y = f.width('withPadding');
  (o.css('width', Qe(y)),
    i.css('width', Qe(y)).css(v, m ? a + 'px' : '0px'),
    p.count() && (u.css('width', Qe(y)), c.css('width', Qe(y)).css(v, m ? a + 'px' : '0px')),
    f.children('colgroup').prependTo(f),
    f.find('thead, tfoot').find('[tabindex]').attrRemove('tabindex'),
    f.find('thead, tfoot').attr('role', 'none').find('[role]').attrRemove('role'),
    f.find('tbody tr:not([role])').attr('role', 'row'),
    f.find('tbody td:not([role]), tbody th:not([role])').attr('role', 'cell'),
    rt(t),
    rt(r),
    s.trigger('scroll'),
    (!e.wasOrdered && !e.wasFiltered) || e.drawHold || l.scrollTop(0));
}
function rt(e) {
  e &&
    (e.find('tfoot:not([role])').attr('role', 'rowgroup'),
    e.find('tr:not([role])').attr('role', 'row'),
    e.find('th:not([role])').attr('role', 'columnheader'),
    e.find('td:not([role])').attr('role', 'cell'));
}
function nt(e, t, r) {
  if (Array.isArray(r)) for (var n = 0; r.length > n; n++) nt(e, t, r[n]);
  else {
    var a = e[t];
    ce.is.plainObject(r)
      ? r.features
        ? (r.rowId && (e.id = r.rowId),
          r.rowClass && (e.className = r.rowClass),
          (a.id = r.id),
          (a.className = r.className),
          nt(e, t, r.features))
        : ce.object.each(r, (e, t) => {
            a.items.push({ feature: e, opts: t });
          })
      : a.items.push(r);
  }
}
function at(e, t, r) {
  var n = [];
  (ce.object.each(t, function (e, t) {
    var a = e.match(/^([a-z]+)([0-9]*)([A-Za-z]*)$/);
    if (null !== t && a) {
      var i = a[2] ? parseInt(a[2]) : 0,
        o = a[3] ? a[3].toLowerCase() : 'full';
      a[1] === r &&
        (('full' !== o && 'start' !== o && 'end' !== o) ||
          nt(
            (function (e, t, r) {
              for (var n, a = 0; e.length > a; a++)
                if (
                  (n = e[a]).rowNum === t &&
                  (('full' === r && n.full) ||
                    (('start' === r || 'end' === r) && (n.start || n.end)))
                )
                  return (n[r] || (n[r] = { contents: [], items: [] }), n);
              return (((n = { rowNum: t })[r] = { contents: [], items: [] }), e.push(n), n);
            })(n, i, o),
            o,
            t
          ));
    }
  }),
    n.sort(function (e, t) {
      var n = e.rowNum || 0,
        a = t.rowNum || 0;
      if (n === a) {
        var i = e.full && !t.full ? -1 : 1;
        return 'bottom' === r ? -1 * i : i;
      }
      return a - n;
    }),
    'bottom' === r && n.reverse());
  for (var a = 0; n.length > a; a++) (delete n[a].rowNum, it(e, n[a]));
  return n;
}
function it(e, t) {
  var r = function (t, r) {
      return (
        Hr.features[t] || zt(e, 0, 'Unknown feature: ' + t),
        Hr.features[t].apply(this, [e, r])
      );
    },
    n = function (n) {
      t[n] &&
        (t[n].contents = t[n].items
          .filter(e => !!e)
          .map(t => {
            if ('string' == typeof t) return r(t, null);
            if (ce.is.plainObject(t)) return r(t.feature, t.opts);
            if ('function' == typeof t.node) return t.node(e);
            if ('function' == typeof t) {
              var n = t(e);
              return 'function' == typeof n.node ? n.node() : n;
            }
            return t.nodeName ? t : t instanceof _e ? t.get(0) : t.length ? t[0] : void 0;
          }));
    };
  (n('start'), n('end'), n('full'));
}
function ot(e, t, r, n, a) {
  Ut(t, r, function (t) {
    var r = !1,
      i = void 0 === n ? Lr(t.target) : 'function' == typeof n ? n() : Array.isArray(n) ? n : [n];
    if (i.length) {
      for (
        var o = 0, l = i.length;
        l > o &&
        (!1 !== dt(e, i[o], o, t.shiftKey) && (r = !0),
        1 !== e.order.length || '' !== e.order[0][1]);
        o++
      );
      r &&
        Ve(e, !0, function () {
          (ut(e), lt(e, e.display), Ft(e, !1, !1), a && a());
        });
    }
  });
}
function lt(e, t) {
  if (t.length >= 2) {
    for (var r = e.displayMaster, n = {}, a = {}, i = 0; r.length > i; i++) n[r[i]] = i;
    for (i = 0; t.length > i; i++) a[t[i]] = n[t[i]];
    t.sort(function (e, t) {
      return a[e] - a[t];
    });
  }
}
function st(e, t, r) {
  var n = function (r) {
    if (A(r)) {
      let a = r;
      if (void 0 !== r.idx) t.push([r.idx, r.dir]);
      else if (a.name) {
        var n = Y(e.columns, 'name').indexOf(a.name);
        -1 !== n && t.push([n, a.dir]);
      }
    } else t.push(r);
  };
  if (A(r)) n(r);
  else if (Array.isArray(r) && 'number' == typeof r[0]) n(r);
  else if (Array.isArray(r)) for (var a = 0; r.length > a; a++) n(r[a]);
}
function ct(e) {
  var t,
    r,
    n,
    a,
    i,
    o,
    l,
    s = [],
    c = Hr.type.order,
    u = e.columns,
    d = e.orderFixed,
    f = A(d),
    p = [];
  if (!e.features.ordering) return s;
  for (
    Array.isArray(d) && st(e, p, d),
      f && d.pre && st(e, p, d.pre),
      st(e, p, e.order),
      f && d.post && st(e, p, d.post),
      t = 0;
    p.length > t;
    t++
  )
    if (u[(l = p[t][0])])
      for (r = 0, n = (a = u[l].orderData).length; n > r; r++)
        ((o = u[(i = a[r])].type || 'string'),
          void 0 === p[t]._idx && (p[t]._idx = u[i].orderSequence.indexOf(p[t][1])),
          p[t][1] &&
            s.push({
              src: l,
              col: i,
              dir: p[t][1],
              index: p[t]._idx,
              type: o,
              formatter: c[o + '-pre'],
              sorter: c[o + '-' + p[t][1]]
            }));
  return s;
}
function ut(e, t, r) {
  var n,
    a,
    i,
    o = [],
    l = Hr.type.order,
    s = e.data,
    c = e.displayMaster;
  if ((Sr(e), void 0 !== t)) {
    var u = e.columns[t];
    ((i = [
      {
        src: t,
        col: t,
        dir: r || '',
        index: 0,
        type: u.type,
        formatter: l[u.type + '-pre'],
        sorter: l[u.type + '-' + r]
      }
    ]),
      (c = c.slice()));
  } else i = ct(e);
  for (n = 0, a = i.length; a > n; n++) pt(e, i[n].col);
  if ('ssp' != Jt(e) && 0 !== i.length) {
    for (n = 0, a = c.length; a > n; n++) o[n] = n;
    (i.length && 'desc' === i[0].dir && e.orderDescReverse && o.reverse(),
      c.sort(function (e, t) {
        var r,
          n,
          a,
          l,
          c,
          u,
          d,
          f = i.length,
          p = null === (r = s[e]) || void 0 === r ? void 0 : r.orderCache,
          h = null === (n = s[t]) || void 0 === n ? void 0 : n.orderCache;
        for (c = 0; f > c; c++)
          if (((a = p[(d = i[c]).col]), (l = h[d.col]), d.sorter)) {
            if (0 !== (u = d.sorter(a, l))) return u;
          } else if (0 != (u = l > a ? -1 : a > l ? 1 : 0)) return 'asc' === d.dir ? u : -u;
        return (l = o[t]) > (a = o[e]) ? -1 : a > l ? 1 : 0;
      }));
  } else
    0 === i.length &&
      c.sort(function (e, t) {
        return t > e ? -1 : e > t ? 1 : 0;
      });
  return (
    void 0 === t && ((e.wasOrdered = !0), (e.sortDetails = i), $t(e, null, 'order', [e, i])),
    c
  );
}
function dt(e, t, r, n) {
  var a,
    i = e.columns[t],
    o = e.order,
    l = i.orderSequence,
    s = function (e, t) {
      var r = e._idx;
      return (void 0 === r && (r = l.indexOf(e[1])), l.length > r + 1 ? r + 1 : t ? null : 0);
    };
  if (!i.orderable) return !1;
  if (('number' == typeof o[0] && (o = e.order = [o]), (n || r) && e.features.orderMulti)) {
    var c = Y(o, '0').indexOf(t);
    -1 !== c
      ? (null === (a = s(o[c], !0)) && 1 === o.length && (a = 0),
        null === a || '' === l[a] ? o.splice(c, 1) : ((o[c][1] = l[a]), (o[c]._idx = a)))
      : n
        ? (o.push([t, l[0], 0]), (o[o.length - 1]._idx = 0))
        : (o.push([t, o[0][1], 0]), (o[o.length - 1]._idx = 0));
  } else
    o.length && o[0][0] == t
      ? (a = s(o[0]))
        ? ((o.length = 1), (o[0][1] = l[a]), (o[0]._idx = a))
        : ((o.length = 1), (o[0][1] = l[0]), (o[0]._idx = 0))
      : ((o.length = 0), o.push([t, l[0]]), (o[0]._idx = 0));
}
function ft(e) {
  var t,
    r,
    n = e.lastOrder,
    a = e.classes.order.position,
    i = ct(e),
    o = e.features;
  if (o.ordering && o.orderClasses) {
    for (t = 0, r = n.length; r > t; t++)
      _e.s(Y(e.data, 'cells', n[t].src)).classRemove(a + (2 > t ? t + 1 : 3));
    for (t = 0, r = i.length; r > t; t++)
      _e.s(Y(e.data, 'cells', i[t].src)).classAdd(a + (2 > t ? t + 1 : 3));
  }
  e.lastOrder = i;
}
function pt(e, t) {
  var r,
    n,
    a,
    i = e.columns[t],
    o = Hr.order[i.orderDataType];
  o && (r = o.call(e.instance, e, t, jr(e, t)));
  for (var l = Hr.type.order[i.type + '-pre'], s = e.data, c = 0; s.length > c; c++)
    s[c] &&
      ((n = s[c]) && !n.orderCache && (n.orderCache = []),
      !n ||
        (n.orderCache[t] && !o) ||
        ((a = o ? r[c] : Pe(e, c, t, 'sort')), (n.orderCache[t] = l ? l(a, e) : a)));
}
var ht,
  gt,
  mt = {
    boundary: !1,
    caseInsensitive: !0,
    columns: null,
    exact: !1,
    regex: !1,
    return: !1,
    search: '',
    smart: !0
  };
function vt(e = {}) {
  return ce.object.assignDeep({}, mt, e);
}
function yt(e, t, r) {
  var n = e.displayStart,
    a = e.pageLength,
    i = qt(e);
  if (0 === i || -1 === a) n = 0;
  else if ('number' == typeof t) (n = t * a) > i && (n = 0);
  else if ('first' == t) n = 0;
  else if ('previous' == t) 0 > (n = 0 > a ? 0 : n - a) && (n = 0);
  else if ('next' == t) i > n + a && (n += a);
  else if ('last' == t) n = Math.floor((i - 1) / a) * a;
  else {
    if ('ellipsis' === t) return;
    zt(e, 0, 'Unknown paging action: ' + t, 5);
  }
  var o = e.displayStart !== n;
  return ((e.displayStart = n), $t(e, null, o ? 'page' : 'page-nc', [e]), o && r && Mt(e), o);
}
function bt(e) {
  if (!e.loadingState) {
    var t = [];
    st(e, t, e.order);
    var r = e.columns,
      n = {
        columns: e.columns.map(function (t, r) {
          return { name: t.name, visible: t.visible, search: Object.assign({}, e.searches[r]) };
        }),
        length: e.pageLength,
        order: t.map(function (e) {
          return r[e[0]] && r[e[0]].name ? [r[e[0]].name, e[1]] : e.slice();
        }),
        search: Object.assign({}, e.searches['*']),
        searchGroups: Object.keys(e.searches)
          .filter(e => e.includes(','))
          .map(t => Object.assign({}, e.searches[t])),
        start: e.displayStart,
        time: +new Date()
      };
    ((e.stateSaved = n),
      $t(e, 'stateSaveParams', 'stateSaveParams', [e, n]),
      e.features.stateSave && !e.destroying && e.stateSaveCallback.call(e.instance, e, n));
  }
}
function wt(e, t, r, n) {
  var a,
    i,
    o = e.columns,
    l = Y(e.columns, 'name');
  e.loadingState = !0;
  var s = e.initDone ? new Ur(e) : null;
  if (!r) {
    if (!t || !t.time) return ((e.loadingState = !1), void n());
    var c = e.stateDuration;
    if (c > 0 && +new Date() - 1e3 * c > t.time) return ((e.loadingState = !1), void n());
  }
  if (-1 !== $t(e, 'stateLoadParams', 'stateLoadParams', [e, t]).indexOf(!1))
    return ((e.loadingState = !1), void n());
  if (
    ((e.stateLoaded = O({}, t)),
    $t(e, null, 'stateLoadInit', [e, t], !0),
    void 0 !== t.length && (s ? s.page.len(t.length) : (e.pageLength = t.length)),
    void 0 !== t.start &&
      (null === s
        ? ((e.displayStart = t.start), (e.displayStartInit = t.start))
        : yt(e, t.start / e.pageLength)),
    void 0 !== t.order)
  ) {
    e.order = [];
    for (let r = 0; t.order.length > r; r++) {
      let n = t.order[r],
        a = [n[0], n[1]];
      if ('string' == typeof n[0]) {
        let e = l.indexOf(n[0]);
        if (0 > e) continue;
        a[0] = e;
      } else if (a[0] >= o.length) continue;
      e.order.push(a);
    }
  }
  if (
    (void 0 !== t.search && Object.assign(e.searches['*'], t.search),
    t.searchGroups &&
      t.searchGroups.forEach(t => {
        if (t.columns) {
          let r = t.columns.join(',');
          e.searches[r] = vt(t);
        }
      }),
    t.columns)
  ) {
    var u = t.columns,
      d = Y(t.columns, 'name');
    if (d.join('').length && d.join('') !== l.join(''))
      for (u = [], a = 0; l.length > a; a++)
        if ('' != l[a]) {
          var f = d.indexOf(l[a]);
          u.push(0 > f ? {} : t.columns[f]);
        } else u.push({});
    if (u.length === o.length) {
      for (a = 0, i = u.length; i > a; a++) {
        var p = u[a];
        (void 0 !== p.visible &&
          (s ? s.column(a).visible(p.visible, !1) : (o[a].visible = p.visible)),
          void 0 !== p.search &&
            (Object.assign(e.searches[a], p.search), (e.searches[a].columns = [a])));
      }
      s &&
        s.one('draw', function () {
          s.columns.adjust();
        });
    }
  }
  ((e.loadingState = !1), $t(e, 'stateLoaded', 'stateLoaded', [e, t]), n());
}
function xt(e) {
  var t,
    r = e.init,
    n = e.deferLoading,
    a = Jt(e);
  e.initialised
    ? (It(e, 'header'),
      It(e, 'footer'),
      (function (e, t) {
        if (e.features.stateSave) {
          var r = e.stateLoadCallback.call(e.instance, e, function (r, n = !1) {
            wt(e, r, n, t);
          });
          return (void 0 !== r && wt(e, r, !1, t), !0);
        }
        t();
      })(e, function () {
        (Lt(e, e.header), Lt(e, e.footer));
        var i = e.displayStartInit;
        if (r && r.data) for (t = 0; r.data.length > t; t++) ke(e, r.data[t]);
        else (n || 'dom' == a) && He(e, _e.s(e.tbody).children('tr'));
        ((e.display = e.displayMaster.slice()),
          (function (e) {
            var t = e.classes,
              r = _e
                .c('div')
                .attr('id', e.tableId + '_wrapper')
                .classAdd(t.container)
                .insertBefore(e.table);
            if (((e.tableWrapper = r.get(0)), e.dom))
              !(function (e, t, r) {
                let n,
                  a,
                  i,
                  o,
                  l,
                  s = t.match(/(".*?")|('.*?')|./g);
                if (s)
                  for (let c = 0; s.length > c; c++) {
                    if (((n = null), (a = s[c]), '<' == a)) {
                      if (((i = _e.c('div')), (o = s[c + 1]), "'" == o[0] || '"' == o[0])) {
                        l = o.replace(/['"]/g, '');
                        let e,
                          t = '';
                        if (-1 != l.indexOf('.')) {
                          let r = l.split('.');
                          ((t = r[0]), (e = r[1]));
                        } else '#' == l[0] ? (t = l) : (e = l);
                        (i.attr('id', t.substring(1)).classAdd(e), c++);
                      }
                      (r.append(i.get()), (r = i));
                    } else
                      '>' == a
                        ? (r = r.parent())
                        : 't' == a
                          ? (n = et(e))
                          : Hr.feature.forEach(function (t) {
                              a == t.cFeature && (n = t.fnInit(e));
                            });
                    n && r.append(n instanceof _e ? n.get() : n);
                  }
              })(e, e.dom, r);
            else {
              var n = at(e, e.layout, 'top'),
                a = at(e, e.layout, 'bottom'),
                i = Je(e, 'layout');
              (n.forEach(function (t) {
                i(e, r, t);
              }),
                i(e, r, { full: { contents: [et(e)], items: [], table: !0 } }),
                a.forEach(function (t) {
                  i(e, r, t);
                }));
            }
            !(function (e) {
              var t = e.table,
                r = '' !== e.scroll.x || '' !== e.scroll.y;
              if (e.features.processing) {
                var n = _e
                  .c('div')
                  .attr('id', e.tableId + '_processing')
                  .attr('role', 'status')
                  .classAdd(e.classes.processing.container)
                  .html(e.language.processing)
                  .append(
                    _e
                      .c('div')
                      .append(_e.c('div'))
                      .append(_e.c('div'))
                      .append(_e.c('div'))
                      .append(_e.c('div'))
                  );
                (r
                  ? n.prependTo(_e.s(e.tableWrapper).find('div.dt-scroll').get(0))
                  : n.insertBefore(t),
                  _e.s(t).on('processing.dt.DT', (e, t, r) => {
                    n.css('display', r ? 'block' : 'none');
                  }));
              }
            })(e);
          })(e),
          (function (e) {
            e.orderHandler &&
              Fr(e, ':not([data-dt-order="disable"]):not([data-dt-order="icon-only"])').each(t => {
                ot(e, t, '');
              });
            var t = [];
            (st(e, t, e.order), (e.order = t));
          })(e),
          Ke(e),
          $e(e, !0),
          $t(e, null, 'preInit', [e], !0),
          Ft(e),
          ('ssp' != a || n) &&
            ('ajax' == a
              ? _t(e, {}, function (r) {
                  var n = Dt(e, r, !1);
                  for (t = 0; n.length > t; t++) ke(e, n[t]);
                  ((e.displayStartInit = i), Ft(e), $e(e, !1), Tt(e));
                })
              : (Tt(e), $e(e, !1))));
      }))
    : setTimeout(function () {
        xt(e);
      }, 200);
}
function Tt(e) {
  if (e.initDone) return;
  var t = [e, e.json];
  e.initDone = !0;
  let r = _e.s(e.tfoot);
  (0 === r.children().count() && r.remove(),
    Ar(e),
    $t(e, null, 'plugin-init', t, !0),
    $t(e, 'init', 'init', t, !0));
}
function _t(e, t, r) {
  var n,
    a = e.ajax,
    i = e.instance,
    o = function (t) {
      var n = e.jqXHR ? e.jqXHR.status : null;
      (null === t || ('number' == typeof n && 204 == n)) && Dt(e, (t = {}), []);
      var a = t.error || t.sError;
      if ((a && zt(e, 0, a), t.d && 'string' == typeof t.d))
        try {
          t = JSON.parse(t.d);
        } catch (i) {}
      ((e.json = t), Ue(e), $t(e, null, 'xhr', [e, t, e.jqXHR], !0), r(t));
    };
  if (ce.is.plainObject(a) && a.data) {
    var l = 'function' == typeof (n = a.data) ? n(t, e) : n;
    ((t = 'function' == typeof n && l ? l : ce.object.assignDeep(t, l)), delete a.data);
  }
  var s = {
    url: 'string' == typeof a ? a : '',
    data: t,
    success: o,
    dataType: 'json',
    cache: !1,
    type: e.serverMethod,
    error: function (t, r) {
      (-1 === $t(e, null, 'xhr', [e, null, e.jqXHR], !0).indexOf(!1) &&
        ('parsererror' == r
          ? zt(e, 0, 'Invalid JSON response', 1)
          : 4 === t.readyState && zt(e, 0, 'Ajax error', 7)),
        $e(e, !1));
    }
  };
  if (
    (ce.is.plainObject(a) && ce.object.assign(s, a),
    (e.ajaxData = t),
    $t(e, null, 'preXhr', [e, t, s], !0),
    'function' == typeof a)
  )
    e.jqXHR = a.call(i, t, o, e);
  else if (a && 'string' != typeof a && '' === a.url) {
    var c = {};
    (Dt(e, c, []), o(c));
  } else e.jqXHR = ce.ajax(s);
  n && (a.data = n);
}
function At(e) {
  return 'function' == typeof e ? 'function' : e.toString();
}
function Dt(e, t, r) {
  var n = 'data';
  if (ce.is.plainObject(e.ajax) && void 0 !== e.ajax.dataSrc) {
    var a = e.ajax.dataSrc;
    'string' == typeof a || 'function' == typeof a ? (n = a) : void 0 !== a.data && (n = a.data);
  }
  if (!r) return 'data' === n ? t.aaData || t[n] : '' !== n ? ce.get(n)(t) : t;
  ce.set(n)(t, r);
}
function jt(e, t, r) {
  var n = ce.is.plainObject(e.ajax) ? e.ajax.dataSrc : null;
  if (n && n[t]) return ce.data.get(n[t])(r);
  var a = '';
  return (
    'draw' === t
      ? (a = 'sEcho')
      : 'recordsTotal' === t
        ? (a = 'iTotalRecords')
        : 'recordsFiltered' === t && (a = 'iTotalDisplayRecords'),
    void 0 !== r[a] ? r[a] : r[t]
  );
}
function Ct(e) {
  ('ssp' != Jt(e) &&
    ((function (e) {
      let t,
        r,
        n,
        a,
        i,
        o = e.columns,
        l = e.data,
        s = !1;
      ht || ((ht = _e.c('div').get(0)), (gt = void 0 !== ht.textContent));
      for (let c = 0; l.length > c; c++)
        if (l[c] && ((i = l[c]), i && !i.searchCellCache)) {
          const l = [];
          for (r = 0, n = o.length; n > r; r++)
            ((t = o[r]),
              t.searchable
                ? ((a = Pe(e, c, r, 'filter')),
                  null === a && (a = ''),
                  'string' != typeof a && a.toString && (a = a.toString()))
                : (a = ''),
              a.indexOf &&
                -1 !== a.indexOf('&') &&
                ((ht.innerHTML = a), (a = gt ? ht.textContent : ht.innerText)),
              a.replace && (a = a.replace(/[\r\n\u2028]/g, '')),
              l.push(a));
          ((i.searchCellCache = l), (i.searchRowCache = l.join('  ')), (s = !0));
        }
    })(e),
    (e.display = e.displayMaster.slice()),
    ce.object.each(e.searches, (t, r) => {
      Ot(e.display, e, r.search, r);
    }),
    ce.object.each(e.searchesFixed, function (t) {
      ce.object.each(e.searchesFixed[t], function (t, r) {
        Ot(e.display, e, r.search, r);
      });
    }),
    (function (e) {
      let t,
        r,
        n = Hr.search,
        a = e.display;
      for (let i = 0, o = n.length; o > i; i++) {
        let o = [];
        for (let l = 0, s = a.length; s > l; l++)
          ((r = a[l]), (t = e.data[r]), t && n[i](e, t.searchCellCache, r, t.data, l) && o.push(r));
        ((a.length = 0), Yt(a, o));
      }
    })(e)),
    (e.wasFiltered = !0),
    $t(e, null, 'search', [e]));
}
function Ot(e, t, r, n) {
  if ('' === r) return;
  let a = 0,
    i = [],
    o = 'function' == typeof r ? r : null,
    l =
      r instanceof RegExp
        ? r
        : o
          ? null
          : (function (e, t) {
              let r = [],
                n = Object.assign(
                  {},
                  { boundary: !1, caseInsensitive: !0, exact: !1, regex: !1, smart: !0 },
                  t
                ),
                a = 'string' != typeof e ? e.toString() : e;
              if (((a = ce.diacritics(a)), n.exact))
                return new RegExp('^' + ce.escapeRegex(a) + '$', n.caseInsensitive ? 'i' : '');
              if (((a = n.regex ? a : ce.escapeRegex(a)), n.smart)) {
                let e = (a.match(/!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || ['']).map(
                    function (e) {
                      let t,
                        n = !1;
                      return (
                        '!' === e.charAt(0) && ((n = !0), (e = e.substring(1))),
                        '"' === e.charAt(0)
                          ? ((t = e.match(/^"(.*)"$/)), (e = t ? t[1] : e))
                          : '“' === e.charAt(0) &&
                            ((t = e.match(/^\u201C(.*)\u201D$/)), (e = t ? t[1] : e)),
                        n && (e.length > 1 && r.push('(?!' + e + ')'), (e = '')),
                        e.replace(/"/g, '')
                      );
                    }
                  ),
                  t = r.length ? r.join('') : '',
                  i = n.boundary ? '\\b' : '';
                a = '^(?=.*?' + i + e.join(')(?=.*?' + i) + ')(' + t + '.)*$';
              }
              return new RegExp(a, n.caseInsensitive ? 'i' : '');
            })(r, n),
    s = n.columns ? n.columns : ce.array.range(t.columns.length);
  for (a = 0; e.length > a; a++) {
    let r = t.data[e[a]];
    if (r) {
      let t = ce.array.selectiveJoin(r.searchCellCache, s);
      ((o && o(t, r.data, e[a], 1 === s.length ? s[0] : s)) ||
        (l && 'string' == typeof t && l.test(t))) &&
        i.push(e[a]);
    }
  }
  for (e.length = i.length, a = 0; i.length > a; a++) e[a] = i[a];
}
function Nt(e, t) {
  var r = e.data[t],
    n = e.columns;
  if (!r) return [];
  if (!r.displayData) {
    r.displayData = [];
    for (var a = 0, i = n.length; i > a; a++) r.displayData.push(Pe(e, t, a, 'display'));
  }
  return r.displayData;
}
function St(e, t, r, n) {
  var a,
    i,
    o,
    l,
    s,
    c,
    u = e.data[t],
    d = [],
    f = e.classes.tbody.row,
    p = P('doc');
  if (u && null === u.tr) {
    let g = u.data;
    for (
      a = r || p.createElement('tr'),
        u.tr = a,
        u.cells = d,
        _e.s(a).classAdd(f),
        a._DT_RowIndex = t,
        Rt(e, u),
        l = 0,
        s = e.columns.length;
      s > l;
      l++
    ) {
      ((o = e.columns[l]),
        (i = (c = !(r && n && n[l])) ? p.createElement(o.cellType) : n[l]) ||
          zt(e, 0, 'Incorrect column count', 18),
        (i._DT_CellIndex = { row: t, column: l }),
        d.push(i));
      var h = Nt(e, t);
      ((c ||
        ((o.render || o.data !== l) &&
          (!ce.is.plainObject(o.data) || (o.data && o.data._ !== l + '.display')))) &&
        qe(i, h[l]),
        _e.s(i).classAdd(o.className),
        o.visible && c ? a.appendChild(i) : o.visible || c || i.parentNode.removeChild(i),
        o.createdCell && o.createdCell.call(e.instance, i, Pe(e, t, l), g, t, l));
    }
    $t(e, 'rowCreated', 'row-created', [a, g, t, d]);
  } else u && _e.s(u.tr).classAdd(f);
}
function Rt(e, t) {
  var r = t.tr,
    n = t.data;
  if (r) {
    var a = e.rowIdFn(n);
    if ((a && (r.id = a), n.DT_RowClass)) {
      var i = n.DT_RowClass.split(' ');
      ((t.addedClasses = t.addedClasses ? ce.unique(t.addedClasses.concat(i)) : i),
        _e.s(r).classRemove(t.addedClasses.join(' ')).classAdd(n.DT_RowClass));
    }
    (n.DT_RowAttr && _e.s(r).attr(n.DT_RowAttr), n.DT_RowData && _e.s(r).data(n.DT_RowData));
  }
}
function It(e, t) {
  let r,
    n,
    a,
    i = e.classes,
    o = e.columns,
    l = _e.s('header' === t ? e.thead : e.tfoot),
    s = 'header' === t ? 'title' : t;
  if (!l) return;
  if (
    ('header' === t || ce.array.pluck(e.columns, s).join('')) &&
    ((a = l.find('tr')), a.count() || (a = _e.c('tr').appendTo(l)), 1 === a.count())
  ) {
    let e = 0;
    for (
      a.find('td, th').each(t => {
        e += t.colSpan;
      }),
        r = e,
        n = o.length;
      n > r;
      r++
    )
      _e.c('th')
        .html(o[r][s] || '')
        .appendTo(a);
  }
  let c = Ht(e, l.get(0), !0);
  ('header' === t
    ? ((e.header = c), l.find('tr').classAdd(i.thead.row))
    : ((e.footer = c), l.find('tr').classAdd(i.tfoot.row)),
    l
      .children('tr')
      .children('th, td')
      .each(r => {
        Je(e, 'header' === t ? 'header' : 'footer')(e, _e.s(r), i);
      }));
}
function Et(e, t, r) {
  var n,
    a,
    i,
    o,
    l,
    s = [],
    c = [],
    u = e.columns;
  if (t) {
    for (
      r ||
        (r = ce.array.range(u.length).filter(function (e) {
          return u[e].visible;
        })),
        n = 0;
      t.length > n;
      n++
    )
      ((s[n] = t[n].slice().filter(function (e, t) {
        return r.includes(t);
      })),
        c.push([]));
    for (n = 0; s.length > n; n++)
      for (a = 0; s[n].length > a; a++)
        if (((o = 1), (l = 1), void 0 === c[n][a])) {
          for (i = s[n][a].cell; void 0 !== s[n + o] && s[n][a].cell == s[n + o][a].cell;)
            ((c[n + o][a] = null), o++);
          for (; void 0 !== s[n][a + l] && s[n][a].cell == s[n][a + l].cell;) {
            for (var d = 0; o > d; d++) c[n + d][a + l] = null;
            l++;
          }
          var f = _e.s(i).find('.dt-column-title');
          c[n][a] = {
            cell: i,
            colspan: l,
            rowspan: o,
            title: f.count() ? f.html() : _e.s(i).html()
          };
        }
    return c;
  }
}
function Lt(e, t) {
  let r,
    n = Et(e, t);
  if (n)
    for (let a = 0; t.length > a; a++) {
      ((r = t[a].row), r && _e.s(r).detachChildren());
      for (let e = 0; n[a].length > e; e++) {
        let t = n[a][e];
        t && _e.s(t.cell).appendTo(r).attr('rowspan', t.rowspan).attr('colspan', t.colspan);
      }
    }
}
function Mt(e, t) {
  if (
    ((function (e) {
      var t = 'ssp' == Jt(e),
        r = e.displayStartInit;
      void 0 !== r &&
        -1 !== r &&
        ((e.displayStart = t || r < qt(e) ? r : 0), (e.displayStartInit = -1));
    })(e),
    -1 === $t(e, 'preDraw', 'preDraw', [e]).indexOf(!1))
  ) {
    var r = [],
      n = 0,
      a = 'ssp' == Jt(e),
      i = e.display,
      o = e.displayStart,
      l = Wt(e),
      s = e.columns,
      c = _e.s(e.tbody);
    if (((e.doingDraw = !0), e.deferLoading)) ((e.deferLoading = !1), e.drawCount++, $e(e, !1));
    else if (a) {
      if (!e.destroying && !t)
        return (
          0 === e.drawCount && c.empty().append(kt(e)),
          void (function (e) {
            (e.drawCount++,
              $e(e, !0),
              _t(
                e,
                (function (e) {
                  var t = e.columns,
                    r = e.features,
                    n = e.searches,
                    a = e.searchesFixed,
                    i = function (e, r) {
                      return 'function' == typeof t[e][r] ? 'function' : t[e][r];
                    };
                  return {
                    draw: e.drawCount,
                    columns: t.map(function (e, t) {
                      return {
                        data: i(t, 'data'),
                        name: e.name,
                        searchable: e.searchable,
                        orderable: e.orderable,
                        search: {
                          value: n[t] ? At(n[t].search) : '',
                          regex: !!n[t] && n[t].regex,
                          fixed: a[t]
                            ? Object.keys(a[t]).map(e => ({ name: e, term: At(a[t][e].search) }))
                            : []
                        }
                      };
                    }),
                    order: ct(e).map(function (e) {
                      return { column: e.col, dir: e.dir, name: i(e.col, 'name') };
                    }),
                    start: e.displayStart,
                    length: r.paging ? e.pageLength : -1,
                    search: {
                      value: At(n['*'].search),
                      regex: n['*'].regex,
                      fixed: Object.keys(e.searchesFixed['*']).map(t => ({
                        name: t,
                        term: At(e.searchesFixed['*'][t].search)
                      })),
                      groups: Object.keys(e.searches)
                        .filter(e => e.includes(','))
                        .map(t => ({
                          columns: e.searches[t].columns || [],
                          term: At(e.searches[t].search)
                        })),
                      groupsFixed: Object.keys(e.searchesFixed)
                        .filter(e => e.includes(','))
                        .map(t => {
                          let r = e.searchesFixed[t];
                          return Object.keys(r).map(e => ({
                            columns: r[e].columns || [],
                            name: e,
                            term: At(r[e].search)
                          }));
                        })
                        .flat()
                    }
                  };
                })(e),
                function (t) {
                  !(function (e, t) {
                    var r = Dt(e, t, !1),
                      n = jt(e, 'draw', t),
                      a = jt(e, 'recordsTotal', t),
                      i = jt(e, 'recordsFiltered', t),
                      o = e.columns.map(e => e.type).join(',');
                    if (void 0 !== n) {
                      if (e.drawCount > 1 * n) return;
                      e.drawCount = 1 * n;
                    }
                    (r || (r = []),
                      ze(e),
                      (e.recordsTotal = parseInt(a, 10)),
                      (e.recordsDisplay = parseInt(i, 10)));
                    for (var l = 0, s = r.length; s > l; l++) ke(e, r[l]);
                    ((e.display = e.displayMaster.slice()), Sr(e, o), Mt(e, !0), Tt(e), $e(e, !1));
                  })(e, t);
                }
              ));
          })(e)
        );
    } else e.drawCount++;
    if (0 !== i.length)
      for (var u = a ? e.data.length : l, d = a ? 0 : o; u > d; d++) {
        var f = i[d],
          p = e.data[f];
        if (null !== p) {
          null === p.tr && St(e, f);
          for (var h = p.tr, g = 0; s.length > g; g++) {
            var m = s[g];
            _e.s(p.cells[g])
              .classAdd(m.type ? Hr.type.className[m.type] : null)
              .classAdd(e.classes.tbody.cell);
          }
          ($t(e, 'row', null, [h, p.data, n, d, f]), r.push(h), n++);
        }
      }
    else r[0] = kt(e);
    ($t(e, 'header', 'header', [_e.s(e.thead).children('tr').get(0), We(e), o, l, i]),
      $t(e, 'footer', 'footer', [_e.s(e.tfoot).children('tr').get(0), We(e), o, l, i]),
      c.detachChildren().append(r),
      _e.s(e.tableWrapper).classToggle('dt-empty-footer', 0 === _e.s(e.tfoot).find('tr').count()),
      $t(e, 'draw', 'draw', [e], !0),
      (e.wasOrdered = !1),
      (e.wasFiltered = !1),
      (e.doingDraw = !1));
  } else $e(e, !1);
}
function Ft(e, t, r) {
  let n = e.features,
    a = n.ordering,
    i = n.searching;
  ((void 0 !== r && !0 !== r) ||
    (Sr(e),
    (function (e) {
      e.columns.map(e => e.wideStrings).includes(null) && Ge(e);
    })(e),
    a && ut(e),
    i ? Ct(e) : (e.display = e.displayMaster.slice())),
    !0 !== t ? (e.displayStart = 0) : Vt(e),
    (e.drawHold = t),
    Mt(e),
    e.api.one('draw', function () {
      e.drawHold = !1;
    }));
}
function kt(e) {
  let t = e.language,
    r = t.zeroRecords,
    n = Jt(e);
  return (
    ('ssp' !== n && 'ajax' !== n) || e.json
      ? t.emptyTable && 0 === Pt(e) && (r = t.emptyTable)
      : (r = t.loadingRecords),
    _e
      .c('tr')
      .append(_e.c('td').attr('colSpan', Cr(e)).classAdd(e.classes.empty.row).html(r))
      .get(0)
  );
}
function Ht(e, t, r) {
  let n,
    a,
    i,
    o,
    l,
    s,
    c,
    u,
    d,
    f,
    p,
    h = e.columns,
    g = _e.s(t).children('tr'),
    m = e.titleRow,
    v = t && 'thead' === t.nodeName.toLowerCase(),
    y = [],
    b = function (e, t, r) {
      let n = e[t];
      for (; n[r];) r++;
      return r;
    };
  for (i = 0, s = g.count(); s > i; i++) y.push([]);
  for (i = 0, s = g.count(); s > i; i++)
    for (n = g.get(i), u = 0, a = n.firstChild; a;) {
      if ('TD' == a.nodeName.toUpperCase() || 'TH' == a.nodeName.toUpperCase()) {
        let t = _e.s(a),
          s = [];
        if (
          ((d = parseInt(t.attr('colspan') || '1') || 1),
          (f = parseInt(t.attr('rowspan') || '1') || 1),
          (d = d && 0 !== d && 1 !== d ? d : 1),
          (f = f && 0 !== f && 1 !== f ? f : 1),
          (c = b(y, i, 0)),
          (p = 1 === d),
          r)
        ) {
          if (p) {
            _r(e, c, Qt(t.data()));
            let r = h[c],
              n = t.attr('width') || null,
              a = t.get(0).style.width.match(/width:\s*(\d+[pxem%]+)/);
            (a && (n = a[1]),
              (r.widthOrig = r.width || n),
              v
                ? (null === r.title ||
                    r.autoTitle ||
                    (((!0 === m && 0 === i) ||
                      (!1 === m && i === g.count() - 1) ||
                      m === i ||
                      null === m) &&
                      t.html(r.title)),
                  !r.title && p && ((r.title = ce.string.stripHtml(t.html())), (r.autoTitle = !0)))
                : r.footer && t.html(r.footer),
              r.ariaTitle || (r.ariaTitle = t.attr('aria-label') || r.title),
              r.className && t.classAdd(r.className));
          }
          (0 === t.find('div.dt-column-title').count() &&
            _e
              .c('div')
              .classAdd('dt-column-title')
              .append(Array.from(t.get(0).childNodes))
              .appendTo(t),
            e.orderIndicators &&
              v &&
              0 !== t.filter(':not([data-dt-order=disable])').count() &&
              0 !== t.parent(':not([data-dt-order=disable])').count() &&
              0 === t.find('div.dt-column-order').count() &&
              _e.c('div').classAdd('dt-column-order').appendTo(t));
          var w = v ? 'header' : 'footer';
          0 === t.find('div.dt-column-' + w).count() &&
            _e
              .c('div')
              .classAdd('dt-column-' + w)
              .append(Array.from(t.get(0).childNodes))
              .appendTo(t);
        }
        for (l = 0; d > l; l++) {
          for (o = 0; f > o; o++)
            ((y[i + o][c + l] = { cell: t.get(0), unique: p }), (y[i + o].row = n));
          s.push(c + l);
        }
        t.attr('data-dt-column', ce.unique(s).join(','));
      }
      a = a.nextSibling;
    }
  return y;
}
function Pt(e) {
  return 'ssp' == Jt(e) ? 1 * e.recordsTotal : e.displayMaster.length;
}
function qt(e) {
  return 'ssp' == Jt(e) ? 1 * e.recordsDisplay : e.display.length;
}
function Wt(e) {
  var t = e.pageLength,
    r = e.displayStart,
    n = r + t,
    a = e.display.length,
    i = e.features,
    o = i.paging;
  return i.serverSide
    ? !1 === o || -1 === t
      ? r + a
      : Math.min(r + t, e.recordsDisplay)
    : !o || n > a || -1 === t
      ? a
      : n;
}
function zt(e, t, r, n) {
  ((r = 'DataTables warning: ' + (e ? 'table id=' + e.tableId + ' - ' : '') + r),
    n &&
      (r += '. For more information about this error, please see https://datatables.net/tn/' + n));
  var a = Hr.sErrMode || Hr.errMode;
  if ((e && $t(e, null, 'dt-error', [e, n, r], !0), 'alert' == a)) alert(r);
  else {
    if ('throw' == a) throw new Error(r);
    'function' == typeof a && a(e, n, r);
  }
}
function Bt(e, t, r, n) {
  if (Array.isArray(r))
    for (let a = 0; r.length > a; a++) {
      let n = r[a];
      Array.isArray(n) ? Bt(e, t, n[0], n[1]) : Bt(e, t, n);
    }
  else (void 0 === n && (n = r), void 0 !== t[r] && (e[n] = t[r]));
}
function Ut(e, t, r) {
  _e.s(e)
    .on('click.DT', t, function (e) {
      r(e);
    })
    .on('keypress.DT', t, function (e) {
      13 === e.which && (e.preventDefault(), r(e));
    })
    .on('selectstart.DT', t, function () {
      return !1;
    });
}
function Xt(e, t, r) {
  r && e.callbacks[t].push(r);
}
function $t(e, t, r, n, a = !1) {
  var i = [];
  if (
    (t &&
      (i = e.callbacks[t]
        .slice()
        .reverse()
        .map(function (t) {
          return t.apply(e.instance, n);
        })),
    null !== r)
  ) {
    a && _e.trigger(r + '.dt', n, { dt: e.api });
    let t = _e.s(e.table),
      o = t.trigger(r + '.dt', a, n, { dt: e.api });
    (a && 0 === t.closest('body').count() && _e.s('body').trigger(r + '.dt', a, n, { dt: e.api }),
      i.push(o[0]));
  }
  return i;
}
function Vt(e) {
  var t = e.displayStart,
    r = Wt(e),
    n = e.pageLength;
  (r > t || (t = r - n), (t -= t % n), (-1 === n || 0 > t) && (t = 0), (e.displayStart = t));
}
function Jt(e) {
  return e.features.serverSide ? 'ssp' : e.ajax ? 'ajax' : 'dom';
}
function Gt(e, t, r) {
  var n = e.formatNumber,
    a = e.displayStart + 1,
    i = e.pageLength,
    o = qt(e),
    l = Pt(e),
    s = -1 === i;
  return t
    .replace(/_START_/g, n(a, e))
    .replace(/_END_/g, n(Wt(e), e))
    .replace(/_MAX_/g, n(l, e))
    .replace(/_TOTAL_/g, n(o, e))
    .replace(/_PAGE_/g, n(s ? 1 : Math.ceil(a / i), e))
    .replace(/_PAGES_/g, n(s ? 1 : Math.ceil(o / i), e))
    .replace(/_ENTRIES_/g, e.api.i18n('entries', '', r))
    .replace(/_ENTRIES-MAX_/g, e.api.i18n('entries', '', l))
    .replace(/_ENTRIES-TOTAL_/g, e.api.i18n('entries', '', o));
}
function Yt(e, t) {
  if (t)
    if (1e4 > t.length) e.push.apply(e, t);
    else for (var r = 0; t.length > r; r++) e.push(t[r]);
}
function Zt(e, t, r) {
  let n = Array.isArray(r) ? r : [r];
  for (var a = 0; n.length > a; a++) e.on(t + '.dt.DT', n[a]);
}
function Qt(e) {
  return (
    Hr.escape.attributes &&
      j(e, function (t, r) {
        e[t] = d(r);
      }),
    e
  );
}
var Kt = { className: {}, detect: [], render: {}, search: {}, order: {} };
function er(e, t) {
  return function (t) {
    return ce.is.empty(t) || 'string' != typeof t
      ? t
      : ((t = t.replace(ce.regex.reNewLines, ' ')),
        e && (t = ce.stripHtml(t)),
        (t = ce.diacritics(t, !1)));
  };
}
function tr(e, t, r, n) {
  return 0 === e || (e && '-' !== e)
    ? 'number' == typeof e || 'bigint' == typeof e
      ? e
      : (t && (e = ce.conv.numToDecimal(e, t)),
        'string' == typeof e && (r && (e = e.replace(r, '')), n && (e = e.replace(n, ''))),
        1 * e)
    : -1 / 0;
}
function rr(e, t, r) {
  if (!t)
    return {
      className: Kt.className[e],
      detect: Kt.detect.find(function (t) {
        return t._name === e;
      }),
      order: { pre: Kt.order[e + '-pre'], asc: Kt.order[e + '-asc'], desc: Kt.order[e + '-desc'] },
      render: Kt.render[e],
      search: Kt.search[e]
    };
  var n = function (t, r) {
      Kt[t][e] = r;
    },
    a = function (t) {
      Object.defineProperty(t, '_name', { value: e });
      var r = Kt.detect.findIndex(function (t) {
        return t._name === e;
      });
      -1 === r ? Kt.detect.unshift(t) : Kt.detect.splice(r, 1, t);
    },
    i = function (t) {
      ((Kt.order[e + '-pre'] = t.pre),
        (Kt.order[e + '-asc'] = t.asc),
        (Kt.order[e + '-desc'] = t.desc));
    };
  (void 0 === r && ((r = t), (t = void 0)),
    'className' === t
      ? n('className', r)
      : 'detect' === t
        ? a(r)
        : 'order' === t
          ? i(r)
          : 'render' === t
            ? n('render', r)
            : 'search' === t
              ? n('search', r)
              : t ||
                (r.className && n('className', r.className),
                void 0 !== r.detect && a(r.detect),
                r.order && i(r.order),
                void 0 !== r.render && n('render', r.render),
                void 0 !== r.search && n('search', r.search)));
}
var nr = function (e, t) {
    return (
      (e = null != e ? e.toString().toLowerCase() : ''),
      (t = null != t ? t.toString().toLowerCase() : ''),
      e.localeCompare(t, navigator.languages[0] || navigator.language, {
        numeric: !0,
        ignorePunctuation: !0
      })
    );
  },
  ar = function (e, t) {
    return ((e = ce.stripHtml(e)), (t = ce.stripHtml(t)), nr(e, t));
  };
function ir(e, t, r, n, a) {
  return lr ? e[t](a) : or ? e[r](a) : n ? e[n](a) : e;
}
(rr('string', {
  detect: function () {
    return 'string';
  },
  order: {
    pre: function (e) {
      return ce.is.empty(e) && 'boolean' != typeof e
        ? ''
        : 'string' == typeof e
          ? e.toLowerCase()
          : e.toString
            ? e.toString()
            : '';
    }
  },
  search: er(!1)
}),
  rr('string-utf8', {
    detect: {
      allOf: function () {
        return !0;
      },
      oneOf: function (e) {
        return (
          !ce.is.empty(e) &&
          navigator.languages &&
          'string' == typeof e &&
          !!e.match(/[^\x00-\x7F]/)
        );
      }
    },
    order: {
      asc: nr,
      desc: function (e, t) {
        return -1 * nr(e, t);
      }
    },
    search: er(!1)
  }),
  rr('html', {
    detect: {
      allOf: function (e) {
        return ce.is.empty(e) || ('string' == typeof e && -1 !== e.indexOf('<'));
      },
      oneOf: function (e) {
        return !ce.is.empty(e) && 'string' == typeof e && -1 !== e.indexOf('<');
      }
    },
    order: {
      pre: function (e) {
        return ce.is.empty(e) ? '' : e.replace ? ce.stripHtml(e).trim().toLowerCase() : e + '';
      }
    },
    search: er(!0)
  }),
  rr('html-utf8', {
    detect: {
      allOf: function (e) {
        return ce.is.empty(e) || ('string' == typeof e && -1 !== e.indexOf('<'));
      },
      oneOf: function (e) {
        return (
          navigator.languages &&
          !ce.is.empty(e) &&
          'string' == typeof e &&
          -1 !== e.indexOf('<') &&
          'string' == typeof e &&
          !!e.match(/[^\x00-\x7F]/)
        );
      }
    },
    order: {
      asc: ar,
      desc: function (e, t) {
        return -1 * ar(e, t);
      }
    },
    search: er(!0)
  }),
  rr('date', {
    className: 'dt-type-date',
    detect: {
      allOf: function (e) {
        if (e && !(e instanceof Date) && !ce.regex.reDate.test(e)) return null;
        var t = Date.parse(e);
        return (null !== t && !isNaN(t)) || ce.is.empty(e);
      },
      oneOf: function (e) {
        return e instanceof Date || ('string' == typeof e && ce.regex.reDate.test(e));
      }
    },
    order: {
      pre: function (e) {
        var t = Date.parse(e);
        return isNaN(t) ? -1 / 0 : t;
      }
    }
  }),
  rr('html-num-fmt', {
    className: 'dt-type-numeric',
    detect: {
      allOf: function (e, t) {
        return ce.is.htmlNum(e, t.language.decimal, !0, !1);
      },
      oneOf: function (e, t) {
        return ce.is.htmlNum(e, t.language.decimal, !0, !1);
      }
    },
    order: {
      pre: function (e, t) {
        return tr(e, t.language.decimal, ce.regex.reHtml, ce.regex.reFormattedNumeric);
      }
    },
    search: er(!0)
  }),
  rr('html-num', {
    className: 'dt-type-numeric',
    detect: {
      allOf: function (e, t) {
        return ce.is.htmlNum(e, t.language.decimal, !1, !0);
      },
      oneOf: function (e, t) {
        return ce.is.htmlNum(e, t.language.decimal, !1, !1);
      }
    },
    order: {
      pre: function (e, t) {
        return tr(e, t.language.decimal, ce.regex.reHtml);
      }
    },
    search: er(!0)
  }),
  rr('num-fmt', {
    className: 'dt-type-numeric',
    detect: {
      allOf: function (e, t) {
        return ce.is.num(e, t.language.decimal, !0, !0);
      },
      oneOf: function (e, t) {
        return ce.is.num(e, t.language.decimal, !0, !1);
      }
    },
    order: {
      pre: function (e, t) {
        return tr(e, t.language.decimal, ce.regex.reFormattedNumeric);
      }
    }
  }),
  rr('num', {
    className: 'dt-type-numeric',
    detect: {
      allOf: function (e, t) {
        return ce.is.num(e, t.language.decimal, !1, !0);
      },
      oneOf: function (e, t) {
        return ce.is.num(e, t.language.decimal, !1, !1);
      }
    },
    order: {
      pre: function (e, t) {
        return tr(e, t.language.decimal);
      }
    }
  }));
var or,
  lr,
  sr,
  cr,
  ur = !1;
function dr(e, t, r) {
  var n;
  if (((or = ce.external('luxon')), (lr = ce.external('moment')))) {
    if (!(n = lr(e, t, r, !0)).isValid()) return null;
  } else if (or) {
    if (
      !(n = t && 'string' == typeof e ? or.DateTime.fromFormat(e, t) : or.DateTime.fromISO(e))
        .isValid
    )
      return null;
    n = n.setLocale(r);
  } else
    t
      ? (ur ||
          alert(
            'DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17'
          ),
        (ur = !0))
      : (n = new Date(e));
  return n;
}
function fr(e) {
  return function (t, r, n, a) {
    0 === arguments.length
      ? ((n = 'en'), (r = null), (t = null))
      : 1 === arguments.length
        ? ((n = 'en'), (r = t), (t = null))
        : 2 === arguments.length && ((n = r), (r = t), (t = null));
    var i = 'datetime' + (r ? '-' + r : '');
    return (
      Kt.order[i + '-pre'] ||
        rr(i, {
          detect: function (e) {
            return e === i && i;
          },
          order: {
            pre: function (e) {
              return e.valueOf();
            }
          }
        }),
      Kt.className[i] || (Kt.className[i] = 'dt-right'),
      function (o, l) {
        if (null == o)
          if ('--now' === a) {
            var s = new Date();
            o = new Date(
              Date.UTC(
                s.getFullYear(),
                s.getMonth(),
                s.getDate(),
                s.getHours(),
                s.getMinutes(),
                s.getSeconds()
              )
            );
          } else o = '';
        if ('type' === l) return i;
        if ('' === o) return 'sort' !== l ? '' : dr('0000-01-01 00:00:00', null, n);
        if (null !== r && t === r && 'sort' !== l && 'type' !== l && !(o instanceof Date)) return o;
        let c = {},
          u = 'string' == typeof o ? o.match(ce.regex.isoTimezone) : null;
        u && (c.timeZone = 'Z' === u[1] ? 'UTC' : u[1]);
        var d = dr(o, t, n);
        if (null === d) return o;
        if ('sort' === l) return d;
        var f =
          null === r
            ? ir(d, 'toDate', 'toJSDate', '')[e](navigator.language, c)
            : ir(d, 'format', 'toFormat', 'toISOString', r);
        return 'display' === l ? ce.escapeHtml(f) : f;
      }
    );
  };
}
var pr = {
    date: fr('toLocaleDateString'),
    datetime: fr('toLocaleString'),
    time: fr('toLocaleTimeString'),
    number: function (e, t, r, n, a) {
      return (
        sr ||
          cr ||
          (function () {
            let e = Fn.use('win');
            if (((sr = ','), (cr = '.'), void 0 !== e.Intl))
              try {
                for (
                  var t = new Intl.NumberFormat().formatToParts(100000.1), r = 0;
                  t.length > r;
                  r++
                )
                  'group' === t[r].type
                    ? (sr = t[r].value)
                    : 'decimal' === t[r].type && (cr = t[r].value);
              } catch (n) {}
          })(),
        null == e && (e = sr),
        null == t && (t = cr),
        {
          display: function (i) {
            if ('number' != typeof i && 'string' != typeof i) return i;
            if ('' === i || null === i) return i;
            var o = 'number' == typeof i ? i : parseFloat(i),
              l = 0 > o ? '-' : '',
              s = Math.abs(o);
            if (s >= 1e11 || (1e-4 > s && 0 !== s)) {
              var c = o.toExponential(r).split(/e\+?/);
              return c[0] + ' x 10<sup>' + c[1] + '</sup>';
            }
            if (isNaN(o)) return ce.escapeHtml(i);
            o = o.toFixed(r);
            var u = Math.abs(o),
              d = Math.abs(parseInt(o, 10)),
              f = r ? t + (u - d).toFixed(r).substring(2) : '';
            return (
              0 === d && 0 === parseFloat(f) && (l = ''),
              l + (n || '') + d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, e) + f + (a || '')
            );
          }
        }
      );
    },
    text: function () {
      return { display: ce.escapeHtml, filter: ce.escapeHtml };
    }
  },
  hr = {
    ariaTitle: '',
    cellType: 'td',
    className: '',
    contentPadding: '',
    createdCell: null,
    data: null,
    defaultContent: null,
    footer: null,
    name: '',
    orderable: !0,
    orderData: null,
    orderDataType: 'std',
    orderSequence: ['asc', 'desc', ''],
    render: null,
    search: null,
    searchable: !0,
    title: null,
    type: null,
    visible: !0,
    width: null
  },
  gr = class {
    constructor() {
      ((this.attrSrc = !1),
        (this.ariaTitle = ''),
        (this.className = null),
        (this.contentPadding = null),
        (this.data = null),
        (this.defaultContent = null),
        (this.name = null),
        (this.orderData = []),
        (this.orderDataType = 'std'),
        (this.orderingClass = null),
        (this.orderSequence = []),
        (this.render = null),
        (this.title = null),
        (this.typeManual = null),
        (this.wideStrings = null),
        (this.width = null),
        (this.widthOrig = null));
    }
  },
  mr = { barWidth: -1, scrollbarLeft: !1 },
  vr = /^(a|aa|ai|ao|as|b|fn|i|m|o|s)([A-Z])([a-z].*$)/;
function yr(e) {
  if (!e) return e;
  let t = Object.keys(e),
    r = e;
  for (let n = 0; t.length > n; n++) {
    let a = t[n],
      i = a.match(vr);
    (i && (e[i[2].toLowerCase() + i[3]] = r[a]), ce.is.plainObject(r[a]) && yr(r[a]));
  }
  return e;
}
function br(e, t, r) {
  void 0 !== e[r] && (e[t] = e[r]);
}
function wr(e, t = !1) {
  (yr(e),
    br(e, 'ordering', 'sort'),
    br(e, 'orderMulti', 'sortMulti'),
    br(e, 'orderClasses', 'sortClasses'),
    br(e, 'orderCellsTop', 'sortCellsTop'),
    br(e, 'order', 'sorting'),
    br(e, 'orderFixed', 'sortingFixed'),
    br(e, 'paging', 'paginate'),
    br(e, 'pagingType', 'paginationType'),
    br(e, 'pageLength', 'displayLength'),
    br(e, 'searching', 'filter'),
    br(e, 'stateDuration', 'cookieDuration'),
    'boolean' == typeof e.scrollX && (e.scrollX = e.scrollX ? '100%' : ''),
    'object' == typeof e.ordering
      ? ((e.orderIndicators = void 0 === e.ordering.indicators || e.ordering.indicators),
        (e.orderHandler = void 0 === e.ordering.handler || e.ordering.handler),
        t || (e.ordering = !0))
      : !1 === e.ordering
        ? ((e.orderIndicators = !1), (e.orderHandler = !1))
        : !0 === e.ordering && ((e.orderIndicators = !0), (e.orderHandler = !0)),
    'boolean' == typeof e.orderCellsTop && (e.titleRow = e.orderCellsTop));
  var r = e.searchCols;
  if (r) for (var n = 0, a = r.length; a > n; n++) r[n] && yr(r[n]);
  (e.serverSide && !e.searchDelay && (e.searchDelay = 400),
    e.language && e.language.url && !e.language.ajax && (e.language.ajax = e.language.url));
}
function xr(e) {
  (yr(e),
    br(e, 'orderable', 'sortable'),
    br(e, 'orderData', 'dataSort'),
    br(e, 'orderSequence', 'sorting'),
    br(e, 'orderDataType', 'sortDataType'),
    br(e, 'className', 'class'));
  var t = e.aDataSort,
    r = e.orderData;
  ('number' == typeof t && (e.orderData = [t]),
    'number' == typeof r && (e.orderData = [r]),
    void 0 === e.dataProp || e.data || (e.data = e.dataProp));
}
function Tr(e) {
  let t = e.columns.length,
    r = ce.object.assign({}, new gr(), hr, {
      orderData: hr.orderData ? hr.orderData : [t],
      data: hr.data ? hr.data : t,
      idx: t,
      searchFixed: {},
      colEl: _e.c('col').attr('data-dt-column', t)
    });
  e.columns.push(r);
  let n = e.searchCols;
  ((e.searches[t] = vt(n[t] ? yr(n[t]) : {})), (e.searches[t].columns = [t]));
}
function _r(e, t, r) {
  var n = e.columns[t];
  if (null != r) {
    (xr(r),
      r.type && (n.typeManual = r.type),
      r.className && !r.className && (r.className = r.className));
    var a = n.className;
    (ce.object.assign(n, r),
      Bt(n, r, 'width', 'widthOrig'),
      a !== n.className && (n.className = a + ' ' + n.className),
      Bt(n, r, 'orderData'),
      r.search && ce.object.assign(e.searches[t], r.search));
  }
  var i = n.data,
    o = ce.get(i);
  if (n.render && Array.isArray(n.render)) {
    var l = n.render.slice();
    n.render = pr[l.shift()].apply(window, l);
  }
  n.renderer = n.render ? ce.get(n.render) : null;
  var s = function (e) {
    return 'string' == typeof e && -1 !== e.indexOf('@');
  };
  ((n.attrSrc = !!i && ce.is.plainObject(i) && (s(i.sort) || s(i.type) || s(i.filter))),
    (n.setter = null),
    (n.dataGet = function (e, t, r) {
      var a = o(e, t, void 0, r);
      return n.renderer && t ? n.renderer(a, t, e, r) : a;
    }),
    (n.dataSet = function (e, t, r) {
      return ce.set(i)(e, t, r);
    }),
    'number' == typeof i || n._isArrayHost || (e.rowReadObject = !0),
    e.features.ordering || (n.orderable = !1));
}
function Ar(e) {
  (Ge(e),
    (function (e) {
      let t = e.columns;
      for (let r = 0; t.length > r; r++) {
        let n = Er(e, [r], !1);
        n && (t[r].colEl.css('width', n), e.scroll.x && t[r].colEl.css('min-width', n));
      }
    })(e));
  let t = e.scroll;
  (('' === t.y && '' === t.x) || tt(e), $t(e, null, 'column-sizing', [e]));
}
function Dr(e, t) {
  let r = Or(e, 'visible');
  return 'number' == typeof r[t] ? r[t] : null;
}
function jr(e, t) {
  let r = Or(e, 'visible').indexOf(t);
  return -1 !== r ? r : null;
}
function Cr(e) {
  let t = e.header,
    r = e.columns,
    n = 0;
  if (t.length)
    for (let a = 0, i = t[0].length; i > a; a++)
      r[a].visible && 'none' !== _e.s(t[0][a].cell).css('display') && n++;
  return n;
}
function Or(e, t) {
  let r = [];
  return (
    e.columns.map(function (e, n) {
      e[t] && r.push(n);
    }),
    r
  );
}
function Nr(e, t) {
  return !0 === t ? e._name : t;
}
function Sr(e, t = '') {
  var r,
    n,
    a,
    i,
    o,
    l,
    s,
    c,
    u,
    d = e.columns,
    f = e.data,
    p = Hr.type.detect;
  for (t || (t = d.map(e => e.type).join(',')), r = 0, n = d.length; n > r; r++) {
    if (((u = []), !(s = d[r]).type && s.typeManual)) s.type = s.typeManual;
    else if (!s.type) {
      if (!e.typeDetect) return;
      for (a = 0, i = p.length; i > a; a++) {
        let t,
          n,
          i,
          d = p[a],
          h = !1;
        if (
          ('function' == typeof d ? (n = d) : ((t = d.oneOf), (n = d.allOf), (i = d.init)),
          (c = null),
          i && (c = Nr(d, i(e, s, r))))
        ) {
          s.type = c;
          break;
        }
        for (o = 0, l = f.length; l > o; o++)
          if (f[o]) {
            if (
              (void 0 === u[o] && (u[o] = Pe(e, o, r, 'type')),
              t && !h && (h = Nr(d, t(u[o], e))),
              !(c = Nr(d, n(u[o], e))) && a !== p.length - 3)
            )
              break;
            if ('html' === c && !ce.is.empty(u[o])) break;
          }
        if ((t && h && c) || (!t && c)) {
          s.type = c;
          break;
        }
      }
      s.type || (s.type = 'string');
    }
    var h = Hr.type.className[s.type];
    h && (Ir(e.header, r, h), Ir(e.footer, r, h));
    var g = Hr.type.render[s.type];
    g && !s.renderer && ((s.renderer = ce.get(g)), Rr(e, r));
  }
  d.map(e => e.type).join(',') !== t && $t(e, null, 'columnTypes', [e], !1);
}
function Rr(e, t) {
  let r = e.data;
  for (let n = 0; r.length > n; n++) {
    let a = r[n];
    if (a && a.tr) {
      let r = Pe(e, n, t, 'display');
      ((a.displayData[t] = r), qe(a.cells[t], r));
    }
  }
}
function Ir(e, t, r) {
  e.forEach(function (e) {
    e[t] && e[t].unique && _e.s(e[t].cell).classAdd(r);
  });
}
function Er(e, t, r, n) {
  Array.isArray(t) || (t = Lr(t));
  let a = 0,
    i = 'px',
    o = e.columns;
  for (let l = 0, s = t.length; s > l; l++) {
    let e = o[t[l]],
      n = r ? e.widthOrig : e.width;
    if (!1 !== e.visible) {
      if (null == n) return null;
      if ('number' == typeof n) a += n;
      else {
        let e = n.match(/([\d\.]+)([^\d]*)/);
        e && ((a += parseFloat(e[1])), (i = 3 === e.length ? e[2] : 'px'));
      }
    }
  }
  return a + i;
}
function Lr(e) {
  let t = _e.s(e).closest('[data-dt-column]').attr('data-dt-column');
  return t
    ? t.split(',').map(function (e) {
        return parseInt(e);
      })
    : [];
}
function Mr(e, t = null, r = null) {
  for (var n = [], a = 0; e.length > a; a++)
    if (null === t || t === a)
      for (var i = 0; e[a].length > i; i++) {
        var o = e[a][i].cell;
        (null !== r && r !== i) || n.includes(o) || n.push(o);
      }
  return n;
}
function Fr(e, t) {
  var r,
    n = e.titleRow;
  return (
    (r =
      !0 === n
        ? Mr(e.header, 0)
        : !1 === n
          ? Mr(e.header, e.header.length - 1)
          : null !== n
            ? Mr(e.header, n)
            : Mr(e.header)),
    _e
      .s(r)
      .filter('th' + t + ', td' + t)
      .filter(e => 0 !== _e.s(e).parent().filter(t).length)
  );
}
function kr(e, t) {
  (e.start && t('start', e.start), e.end && t('end', e.end), e.full && t('full', e.full));
}
var Hr = {
  builder: '-source-',
  buttons: {},
  ccContent: {},
  classes: {
    container: 'dt-container',
    empty: { row: 'dt-empty' },
    info: { container: 'dt-info' },
    layout: {
      row: 'dt-layout-row',
      cell: 'dt-layout-cell',
      tableRow: 'dt-layout-table',
      tableCell: '',
      start: 'dt-layout-start',
      end: 'dt-layout-end',
      full: 'dt-layout-full'
    },
    length: { container: 'dt-length', select: 'dt-input' },
    order: {
      canAsc: 'dt-orderable-asc',
      canDesc: 'dt-orderable-desc',
      isAsc: 'dt-ordering-asc',
      isDesc: 'dt-ordering-desc',
      none: 'dt-orderable-none',
      position: 'sorting_'
    },
    processing: { container: 'dt-processing' },
    scrolling: {
      body: 'dt-scroll-body',
      container: 'dt-scroll',
      footer: { self: 'dt-scroll-foot', inner: 'dt-scroll-footInner' },
      header: { self: 'dt-scroll-head', inner: 'dt-scroll-headInner' }
    },
    search: { container: 'dt-search', input: 'dt-input' },
    table: 'dataTable',
    tbody: { cell: '', row: '' },
    thead: { cell: '', row: '' },
    tfoot: { cell: '', row: '' },
    paging: {
      active: 'current',
      button: 'dt-paging-button',
      container: 'dt-paging',
      disabled: 'disabled',
      nav: ''
    }
  },
  errMode: 'alert',
  escape: { attributes: !1 },
  feature: Re,
  features: Se,
  search: [],
  selector: { cell: [], column: [], row: [] },
  settings: [],
  legacy: { ajax: null },
  pager: Le,
  renderer: {
    footer: {
      _: (e, t, r) => {
        t.classAdd(r.tfoot.cell);
      }
    },
    header: {
      _: (e, t, r) => {
        (t.classAdd(r.thead.cell),
          e.features.ordering || t.classAdd(r.order.none),
          Fr(e, ':not([data-dt-order="disable"])').get().includes(t[0]) &&
            _e.s(e.table).on('order.dt.DT column-visibility.dt.DT', function (n, a, i) {
              if (e === a) {
                var o = a.sortDetails;
                if (o) {
                  var l = Y(o, 'col');
                  if ('column-visibility' !== n.type || l.includes(i)) {
                    var s,
                      c = r.order,
                      u = a.api.columns(t),
                      d = e.columns[u.flatten()[0]],
                      f = u.orderable().includes(!0),
                      p = '',
                      h = u.indexes(),
                      g = u.orderable(!0).flatten(),
                      m = e.tabIndex,
                      v = a.orderHandler && f;
                    t.classRemove(c.isAsc + ' ' + c.isDesc)
                      .classToggle(c.none, !f)
                      .classToggle(c.canAsc, v && g.includes('asc'))
                      .classToggle(c.canDesc, v && g.includes('desc'));
                    var y = !0;
                    for (s = 0; h.length > s; s++) l.includes(h[s]) || (y = !1);
                    if (y) {
                      var b = u.order();
                      t.classAdd(
                        (b.includes('asc') ? c.isAsc : '') + (b.includes('desc') ? c.isDesc : '')
                      );
                    }
                    var w = -1;
                    for (s = 0; l.length > s; s++)
                      if (e.columns[l[s]].visible) {
                        w = l[s];
                        break;
                      }
                    if (h[0] == w) {
                      var x = o[0],
                        T = d.orderSequence;
                      (t.attr('aria-sort', 'asc' === x.dir ? 'ascending' : 'descending'),
                        (p = T && !T[x.index + 1] ? 'Remove' : 'Reverse'));
                    } else t.attrRemove('aria-sort');
                    if (f) {
                      var _ = t.find('.dt-column-order');
                      (_.attr('role', 'button').attr(
                        'aria-label',
                        f ? d.ariaTitle + a.api.i18n('aria.orderable' + p) : d.ariaTitle
                      ),
                        -1 !== m && _.attr('tabindex', m));
                    }
                  }
                }
              }
            }));
      }
    },
    layout: {
      _: (e, t, r) => {
        let n = e.classes.layout,
          a = _e
            .c('div')
            .attr('id', r.id || null)
            .classAdd(r.className || n.row)
            .appendTo(t);
        kr(r, function (e, t) {
          var r = '';
          (t.table && (a.classAdd(n.tableRow), (r += n.tableCell + ' ')),
            (r += 'start' === e ? n.start : 'end' === e ? n.end : n.full),
            _e
              .c('div')
              .attr({ id: t.id || null, class: t.className ? t.className : n.cell + ' ' + r })
              .append(t.contents)
              .appendTo(a));
        });
      }
    },
    pagingButton: {
      _: (e, t, r, n, a) => {
        var i,
          o = e.classes.paging,
          l = [o.button];
        return (
          n && l.push(o.active),
          a && l.push(o.disabled),
          {
            display: (i =
              'ellipsis' === t
                ? _e.c('span').classAdd('ellipsis').html(r).get(0)
                : _e
                    .c('button')
                    .classAdd(l.join(' '))
                    .attr('role', 'link')
                    .attr('type', 'button')
                    .html(r)
                    .get(0)),
            clicker: i
          }
        );
      }
    },
    pagingContainer: { _: (e, t) => t }
  },
  rendererDisplayRowCells: kr,
  order: {},
  type: Kt,
  _unique: 0,
  version: '3.1.2'
};
function Pr(e, t, r, n, a) {
  var i,
    o,
    l,
    s = [],
    c = typeof t;
  for (
    t instanceof _e && (t = t.get()),
      (t && 'string' !== c && 'function' !== c && void 0 !== t.length) || (t = [t]),
      o = 0,
      l = t.length;
    l > o;
    o++
  )
    (i = (i = r('string' == typeof t[o] ? t[o].trim() : t[o])).filter(function (e) {
      return null != e;
    })) &&
      i.length &&
      (s = s.concat(i));
  var u = Hr.selector[e];
  if (u.length) for (o = 0, l = u.length; l > o; o++) s = u[o](n, a, s);
  return ee(s);
}
function qr(e) {
  return (
    e || (e = {}),
    e.filter && void 0 === e.search && (e.search = e.filter),
    C({}, { columnOrder: 'implied', search: 'none', order: 'current', page: 'all' }, e)
  );
}
function Wr(e) {
  var t = e.inst(e.context[0], null, e._newClass.replace(/s$/, ''));
  return (
    e.length && t.push(e[0]),
    (t.selector = e.selector),
    t.length && t[0].length > 1 && t[0].splice(1),
    t
  );
}
function zr(e, t) {
  var r,
    n,
    a,
    i = [],
    o = e.display,
    l = e.displayMaster,
    s = t.search,
    c = t.order,
    u = t.page;
  if ('ssp' == Jt(e)) return 'removed' === s ? [] : Q(0, l.length);
  if ('current' == u) for (r = e.displayStart, n = Wt(e); n > r; r++) i.push(o[r]);
  else if ('current' == c || 'applied' == c) {
    if ('none' == s) i = l.slice();
    else if ('applied' == s) i = o.slice();
    else if ('removed' == s) {
      var d = {};
      for (r = 0, n = o.length; n > r; r++) d[o[r]] = null;
      l.forEach(function (e) {
        Object.prototype.hasOwnProperty.call(d, e) || i.push(e);
      });
    }
  } else if ('index' == c || 'original' == c)
    for (r = 0, n = e.data.length; n > r; r++)
      e.data[r] &&
        ('none' == s ||
          (-1 === (a = o.indexOf(r)) && 'removed' == s) ||
          (a >= 0 && 'applied' == s)) &&
        i.push(r);
  else if ('number' == typeof c) {
    var f = ut(e, c, 'asc');
    if ('none' === s) i = f;
    else
      for (r = 0; f.length > r; r++)
        ((-1 === (a = o.indexOf(f[r])) && 'removed' == s) || (a >= 0 && 'applied' == s)) &&
          i.push(f[r]);
  }
  return i;
}
Object.assign(Hr, {
  afnFiltering: Hr.search,
  aTypes: Hr.type.detect,
  ofnSearch: Hr.type.search,
  oSort: Hr.type.order,
  afnSortData: Hr.order,
  aoFeatures: Hr.feature,
  oStdClasses: Hr.classes,
  oPagination: Hr.pager,
  sVersion: Hr.version,
  fnVersionCheck: se
});
var Br = Array.prototype,
  Ur = function (e, t) {
    if (!(this instanceof Ur)) return new Ur(e, t);
    ((this.context = Yr(e)), Yt(this, t), Gr(this, 'Api'));
  };
function Xr(e, t) {
  if (Array.isArray(e)) {
    for (let r = 0; e.length > r; r++) Ur.register(e[r], t);
    return;
  }
  let r = (function (e) {
    let t = e.split('.'),
      r = null,
      n = 'Api',
      a = 'Api',
      i = '',
      o = '',
      l = '';
    for (let s = 0; t.length > s; s++) {
      let e = t[s],
        c = e.replace('()', '');
      ((n = a),
        (a += c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()),
        e.includes('()')
          ? ((i = c), l.includes('()') && ((r = null), (o = '')))
          : ((r = e), (o = n)),
        (l = e));
    }
    return { couldReturn: a, hostClass: n, property: r, propertyHost: o, methodName: i };
  })(e);
  if (
    (Jr[r.hostClass] ||
      (function (e) {
        let t = function (e, t) {
          ((this.context = Yr(e)), Yt(this, t), Gr(this, 'Api'), Gr(this, this._newClass));
        };
        ((t.prototype = Object.create(Ur.prototype)),
          Object.defineProperty(t, 'name', { value: e, writable: !1 }),
          (t.prototype._newClass = e),
          (Jr[e] = t));
      })(r.hostClass),
    r.property)
  )
    (Vr[r.propertyHost] || (Vr[r.propertyHost] = []),
      Vr[r.propertyHost].push({
        couldReturn: r.couldReturn,
        property: r.property,
        method: r.methodName,
        fn: t
      }));
  else {
    let e = function () {
      let e = this._newClass;
      this._newClass = r.couldReturn;
      let n = t.apply(this, arguments);
      return ((this._newClass = e), n);
    };
    ((Jr[r.hostClass].prototype[r.methodName] = e),
      'Api' === r.hostClass &&
        ce.object.each(Jr, (t, n) => {
          n.prototype[r.methodName] || (n.prototype[r.methodName] = e);
        }));
  }
}
function $r(e, t, r) {
  (Ur.register(e, r),
    Ur.register(t, function () {
      var e = r.apply(this, arguments);
      return e === this
        ? this
        : e && e.isDataTableApi
          ? e.length
            ? Array.isArray(e[0])
              ? this.inst(e.context, e[0])
              : e[0]
            : void 0
          : e;
    }));
}
(ce.object.assign(Ur.prototype, {
  _newClass: 'Api',
  isDataTableApi: !0,
  any() {
    return 0 !== this.count();
  },
  context: [],
  count() {
    return this.flatten().length;
  },
  each(e) {
    for (var t = 0, r = this.length; r > t; t++) e.call(this, this[t], t, this);
    return this;
  },
  eq(e) {
    var t = this.context;
    return t.length > e ? this.inst(t[e], this[e], 'Api') : null;
  },
  filter(e) {
    var t = Br.filter.call(this, e, this);
    return this.inst(this.context, t);
  },
  flatten() {
    var e = [];
    return this.inst(this.context, e.concat.apply(e, this.toArray()));
  },
  get(e) {
    return this[e];
  },
  join: Br.join,
  includes(e) {
    return -1 !== this.indexOf(e);
  },
  indexOf: Br.indexOf,
  inst(e, t, r) {
    let n = r || this._newClass,
      a = Ur;
    return (Jr[n] && (a = Jr[n]), new a(e, t));
  },
  iterator(e, t, r, n) {
    var a,
      i,
      o,
      l,
      s,
      c,
      u,
      d,
      f = [],
      p = this.context,
      h = this.selector;
    for (
      'string' == typeof e && ((n = r), (r = t), (t = e), (e = !1)), i = 0, o = p.length;
      o > i;
      i++
    ) {
      var g = this.inst(p[i]);
      if ('table' === t) void 0 !== (a = r.call(g, p[i], i)) && f.push(a);
      else if ('columns' === t || 'rows' === t)
        void 0 !== (a = r.call(g, p[i], this[i], i)) && f.push(a);
      else if (
        'every' === t ||
        'column' === t ||
        'column-rows' === t ||
        'row' === t ||
        'cell' === t
      )
        for (
          u = this[i], 'column-rows' === t && (c = zr(p[i], h.opts)), l = 0, s = u.length;
          s > l;
          l++
        )
          ((d = u[l]),
            void 0 !==
              (a =
                'cell' === t
                  ? r.call(g, p[i], d.row, d.column, i, l)
                  : r.call(g, p[i], d, i, l, c)) && f.push(a));
    }
    if (f.length || n) {
      var m = this.inst(p, e ? f.concat.apply([], f) : f),
        v = m.selector;
      return (v && ((v.rows = h.rows), (v.cols = h.cols), (v.opts = h.opts)), m);
    }
    return this;
  },
  lastIndexOf: Br.lastIndexOf,
  length: 0,
  map(e) {
    var t = Br.map.call(this, e, this);
    return this.inst(this.context, t);
  },
  pluck(e) {
    var t = ce.get(e);
    return this.map(e => t(e));
  },
  pop: Br.pop,
  push: Br.push,
  reduce: Br.reduce,
  reduceRight: Br.reduceRight,
  reverse: Br.reverse,
  selector: { rows: void 0, cols: void 0, opts: void 0 },
  shift: Br.shift,
  slice() {
    return this.inst(this.context, this);
  },
  sort: Br.sort,
  splice: Br.splice,
  toArray() {
    return Br.slice.call(this);
  },
  to$() {
    return ce.external('jq')(this);
  },
  toDom() {
    return new _e(this.toArray());
  },
  toJQuery: function () {
    return ce.external('jq')(this);
  },
  unique: function () {
    return this.inst(this.context, ce.array.unique(this.toArray()));
  },
  unshift: Br.unshift
}),
  (Ur.register = Xr),
  (Ur.registerPlural = $r));
var Vr = {},
  Jr = { Api: Ur };
function Gr(e, t) {
  let r = Vr[t];
  if (r)
    for (let n = 0; r.length > n; n++) {
      let t = r[n];
      if (e[t.property]) {
        if (!e.hasOwnProperty(t.property)) {
          let r = e[t.property];
          e[t.property] = function () {
            return r.apply(e, arguments);
          };
        }
      } else e[t.property] = {};
      e[t.property][t.method] = function () {
        let r = e._newClass;
        e._newClass = t.couldReturn;
        let n = t.fn.apply(e, arguments);
        return ((e._newClass = r), n);
      };
    }
}
function Yr(e) {
  var t,
    r = [],
    n = function (e) {
      var t = (function (e) {
        var t,
          r = e,
          n = null,
          a = Hr.settings,
          i = ce.array.pluck(a, 'table');
        return r
          ? r.table && r.features
            ? [r]
            : r.nodeName && 'table' === r.nodeName.toLowerCase()
              ? -1 !== (t = i.indexOf(r))
                ? [a[t]]
                : null
              : r && 'function' == typeof r.settings
                ? r.settings().toArray()
                : ('string' == typeof r
                    ? (n = _e.s(r).get())
                    : (ce.is.jquery(r) || ce.is.dom(r)) && (n = r.get()),
                  n
                    ? a.filter(function (e, t) {
                        return n.includes(i[t]);
                      })
                    : void 0)
          : [];
      })(e);
      t && r.push.apply(r, t);
    };
  if (Array.isArray(e)) for (t = 0; e.length > t; t++) n(e[t]);
  else n(e);
  return r.length > 1 ? ce.unique(r) : r;
}
function Zr(e, t) {
  let r = _e.s(e);
  (r.find('.dt-column-order').remove(),
    r.find('.dt-column-title').each(function (e) {
      let t = _e.s(e);
      var r = t.html();
      (t.parent().parent().html(r), t.remove());
    }),
    r.find('div.dt-column-' + t).remove(),
    r.find('th, td').attrRemove('data-dt-column'));
}
(Xr('$()', function (e, t) {
  let r = ce.external('jq');
  r || zt(this.context[0], 0, 'No jQuery available. Use `.dom()` or register jQuery');
  let n = r(this.rows(t).nodes());
  return r([].concat(n.filter(e).toArray(), n.find(e).toArray()));
}),
  ['on', 'one', 'off'].forEach(e => {
    Xr(e + '()', function () {
      var t = Array.prototype.slice.call(arguments);
      t[0] = t[0]
        .split(/\s/)
        .map(function (e) {
          return e.match(/\.dt\b/) ? e : e + '.dt';
        })
        .join(' ');
      var r = _e.s(this.tables().nodes());
      return (r[e].apply(r, t), this);
    });
  }),
  Xr('clear()', function () {
    return this.iterator('table', function (e) {
      ze(e);
    });
  }),
  Xr('error()', function (e) {
    return this.iterator('table', function (t) {
      zt(t, 0, e);
    });
  }),
  Xr('settings()', function () {
    return new Ur(this.context, this.context);
  }),
  Xr('init()', function () {
    var e = this.context;
    return e.length ? e[0].init : null;
  }),
  Xr('data()', function () {
    return this.iterator('table', function (e) {
      return ce.array.pluck(e.data, 'data');
    }).flatten();
  }),
  Xr('trigger()', function (e, t, r) {
    return this.iterator('table', function (n) {
      return $t(n, null, e, t, r);
    }).flatten();
  }),
  Xr('ready()', function (e) {
    var t = this.context;
    return e
      ? this.tables().every(function () {
          var t = this;
          this.context[0].initDone
            ? e.call(t)
            : this.on('init.dt.DT', function () {
                e.call(t);
              });
        })
      : (t.length && t[0].initDone) || !1;
  }),
  Xr('destroy()', function (e) {
    return (
      (e = e || !1),
      this.iterator('table', function (t) {
        var r = t.classes,
          n = t.table,
          a = t.tbody,
          i = t.thead,
          o = t.tfoot,
          l = _e.s(n),
          s = _e.s(a),
          c = _e.s(t.tableWrapper),
          u = t.data
            .map(function (e) {
              return e ? e.tr : null;
            })
            .filter(e => !!e),
          d = r.order;
        ((t.destroying = !0),
          $t(t, 'destroy', 'destroy', [t], !0),
          e || new Ur(t).columns().visible(),
          t.resizeObserver && t.resizeObserver.disconnect(),
          c.off('.DT').find(':not(tbody *)').off('.DT'),
          t.windowResizeCb && window.removeEventListener('resize', t.windowResizeCb),
          n != i.parentNode && (l.children('thead').detach(), l.append(i)),
          o && n != o.parentNode && (l.children('tfoot').detach(), l.append(o)),
          Zr(i, 'header'),
          Zr(o, 'footer'),
          t.colgroup.remove(),
          (t.order = []),
          (t.orderFixed = []),
          ft(t),
          l.find('th, td').classRemove(Object.values(Hr.type.className).join(' ')),
          _e
            .s(i)
            .find('th, td')
            .classRemove(d.none + ' ' + d.canAsc + ' ' + d.canDesc + ' ' + d.isAsc + ' ' + d.isDesc)
            .css('width', '')
            .attrRemove('aria-sort'),
          s.children().detach(),
          s.append(u));
        var f = t.tableWrapper.parentNode,
          p = t.tableWrapper.nextSibling,
          h = e ? 'remove' : 'detach';
        (l[h](),
          c[h](),
          !e && f && (f.insertBefore(n, p), l.css('width', t + 'px').classRemove(r.table)));
        var g = Hr.settings.indexOf(t);
        -1 !== g && Hr.settings.splice(g, 1);
      })
    );
  }),
  Xr('i18n()', function (e, t, r) {
    var n = this.context[0],
      a = ce.get(e)(n.language);
    return (
      void 0 === a && (a = t),
      ce.is.plainObject(a) && !1 !== r && (a = void 0 !== r && void 0 !== a[r] ? a[r] : a._),
      'string' == typeof a ? a.replace('%d', r) : a
    );
  }));
var Qr = function (e, t, r) {
  if (r) {
    var n = new Ur(e);
    n.one('draw', function () {
      r(n.ajax.json());
    });
  }
  if ('ssp' == Jt(e)) Ft(e, t);
  else {
    $e(e, !0);
    var a = e.jqXHR;
    (a && 4 !== a.readyState && 'function' == typeof a.abort && a.abort(),
      _t(e, {}, function (r) {
        ze(e);
        for (var n = Dt(e, r, !1), a = 0, i = n.length; i > a; a++) ke(e, n[a]);
        (Ft(e, t), Tt(e), $e(e, !1));
      }));
  }
};
(Xr('ajax.json()', function () {
  var e = this.context;
  if (e.length > 0) return e[0].json;
}),
  Xr('ajax.params()', function () {
    var e = this.context;
    if (e.length > 0) return e[0].ajaxData;
  }),
  Xr('ajax.reload()', function (e, t) {
    return this.iterator('table', function (r) {
      Qr(r, !1 === t, e);
    });
  }),
  Xr('ajax.url()', function (e) {
    var t = this.context;
    if (void 0 === e) {
      if (0 === t.length) return;
      let e = t[0];
      return ce.is.plainObject(e.ajax) ? e.ajax.url : e.ajax;
    }
    return this.iterator(
      'table',
      function (t) {
        ce.is.plainObject(t.ajax) ? (t.ajax.url = e) : (t.ajax = e);
      },
      !0
    );
  }),
  Xr('ajax.url().load()', function (e, t) {
    return this.iterator('table', function (r) {
      Qr(r, !1 === t, e);
    });
  }),
  Xr('cells()', function (e, t, r) {
    let n,
      a,
      i = null,
      o = null;
    if (
      (A(e)
        ? void 0 === e.row
          ? (a = e)
          : ((n = e), (a = t))
        : A(t) || void 0 === t
          ? ((n = e), (a = t))
          : void 0 !== e && ((i = e), (o = t), (a = r)),
      null === o)
    )
      return this.iterator('table', function (e) {
        return (function (e, t, r) {
          var n,
            a,
            i,
            o,
            l,
            s,
            c,
            u,
            d = e.data,
            f = zr(e, r),
            p = e.columns.length;
          return Pr(
            'cell',
            t,
            function (t) {
              var r = 'function' == typeof t;
              if (null == t || r) {
                for (i = [], o = 0, l = f.length; l > o; o++)
                  for (a = f[o], s = 0; p > s; s++)
                    ((c = { row: a, column: s }),
                      r
                        ? ((u = d[a]),
                          t(c, Pe(e, a, s), u && u.cells ? u.cells[s] : null) && i.push(c))
                        : i.push(c));
                return i;
              }
              if (A(t))
                return void 0 !== t.column && void 0 !== t.row && -1 !== f.indexOf(t.row)
                  ? [t]
                  : [];
              if (!n) {
                let e = K(Z(d, f, 'cells'));
                n = _e.s(J([], e));
              }
              let h = n
                .filter(t)
                .mapTo(e => ({ row: e._DT_CellIndex.row, column: e._DT_CellIndex.column }));
              if (h.length || !t.nodeName) return h;
              let g = _e.s(t).closest('*[data-dt-row]'),
                m = _e.s(t).closest('*[data-dt-column]');
              return g.count()
                ? [
                    {
                      row: parseInt(g.attr('data-dt-row')),
                      column: parseInt(m.attr('data-dt-column'))
                    }
                  ]
                : [];
            },
            e,
            r
          );
        })(e, n, qr(a));
      });
    let l,
      s,
      c,
      u,
      d = a ? { page: a.page, order: a.order, search: a.search } : {},
      f = this.columns(o, d),
      p = this.rows(i, d),
      h = this.iterator(
        'table',
        function (e, t) {
          let r = [];
          for (l = 0, s = p[t].length; s > l; l++)
            for (c = 0, u = f[t].length; u > c; c++) r.push({ row: p[t][l], column: f[t][c] });
          return r;
        },
        !0
      ),
      g = a && a.selected ? this.cells(h.toArray(), a) : h;
    return (C(g.selector, { cols: o, rows: i, opts: a }), g);
  }),
  Xr('cells().every()', function (e) {
    var t = this.selector.opts,
      r = 0;
    return this.iterator('every', (n, a, i) => {
      let o = this.cell(a, t);
      (e.call(o, o[0][0].row, o[0][0].column, i, r), r++);
    });
  }),
  $r('cells().nodes()', 'cell().node()', function () {
    return this.iterator(
      'cell',
      function (e, t, r) {
        var n = e.data[t];
        return n && n.cells ? n.cells[r] : void 0;
      },
      !0
    );
  }),
  Xr('cells().data()', function () {
    return this.iterator(
      'cell',
      function (e, t, r) {
        return Pe(e, t, r);
      },
      !0
    );
  }),
  $r('cells().render()', 'cell().render()', function (e) {
    return this.iterator(
      'cell',
      function (t, r, n) {
        return Pe(t, r, n, e);
      },
      !0
    );
  }),
  $r('cells().indexes()', 'cell().index()', function () {
    return this.iterator(
      'cell',
      function (e, t, r) {
        return { row: t, column: r, columnVisible: jr(e, r) };
      },
      !0
    );
  }),
  $r('cells().invalidate()', 'cell().invalidate()', function (e) {
    return this.iterator('cell', function (t, r, n) {
      Be(t, r, e, n);
    });
  }),
  Xr('cell()', function (e, t, r) {
    return Wr(this.cells(e, t, r));
  }),
  Xr('cell().data()', function (e) {
    var t = this.context,
      r = this[0];
    return void 0 === e
      ? t.length && r.length
        ? Pe(t[0], r[0].row, r[0].column)
        : void 0
      : ((function (e, t, r, n) {
          let a = e.data[t];
          a && e.columns[r].dataSet(a.data, n, { settings: e, row: t, col: r });
        })(t[0], r[0].row, r[0].column, e),
        Be(t[0], r[0].row, 'data', r[0].column),
        this);
  }));
var Kr = /^(.*?):(name|title|visIdx|visible)$/;
function en(e, t, r, n, a, i) {
  let o = [];
  for (let l = 0, s = a.length; s > l; l++) o.push(Pe(e, a[l], t, i));
  return o;
}
function tn(e, t, r) {
  var n = e.header,
    a = e.titleRow,
    i = 0;
  if (void 0 !== r) i = r;
  else if (!0 === a) i = 0;
  else if (!1 === a) i = n.length - 1;
  else if (null !== a) i = a;
  else {
    for (var o = 0; n.length > o; o++)
      n[o][t].unique && _e.s(n[o][t].cell).find('.dt-column-title').text() && (i = o);
    null === i && (i = 0);
  }
  return n[i][t].cell;
}
function rn(e, t) {
  let r = 'string' == typeof t ? parseInt(t, 10) : t;
  ((e.pageLength = r), Vt(e), $t(e, null, 'length', [e, r]));
}
function nn(e, t) {
  t &&
    t.childRows &&
    e
      .rows(
        t.childRows.map(function (e) {
          return e.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g, '$1\\:');
        })
      )
      .every(function () {
        $t(e.settings()[0], null, 'requestChild', [this]);
      });
}
(Xr('columns()', function (e, t) {
  let r, n;
  (void 0 === e ? (r = '') : A(e) ? ((r = ''), (t = e)) : (r = e), (n = qr(t)));
  let a = this.iterator(
    'table',
    e =>
      (function (e, t, r) {
        var n,
          a,
          i = e.columns,
          o = Pr(
            'column',
            t,
            function (t) {
              var o = m(t);
              if ('' === t) return Q(i.length);
              if (null !== o) return [0 > o ? i.length + o : o];
              if ('function' == typeof t) {
                var l = zr(e, r);
                return i.map(function (r, n) {
                  return t(n, en(e, n, 0, 0, l), tn(e, n)) ? n : null;
                });
              }
              var s = 'string' == typeof t ? t.match(Kr) : '';
              if (s)
                switch (s[2]) {
                  case 'visIdx':
                  case 'visible':
                    if (s[1] && s[1].match(/^\d+$/)) {
                      var c = parseInt(s[1], 10);
                      if (0 > c) {
                        var u = i.map(function (e, t) {
                          return e.visible ? t : null;
                        });
                        return [u[u.length + c]];
                      }
                      return [Dr(e, c)];
                    }
                    return i.map(function (t, r) {
                      if (!t.visible) return null;
                      if (!1 === t.responsiveVisible) return null;
                      if (s && s[1]) {
                        let n = Mr(e.header, null, t.idx);
                        return _e.s(n).filter(s[1]).count() > 0 ? r : null;
                      }
                      return r;
                    });
                  case 'name':
                    return (
                      n || (n = Y(i, 'name')),
                      n.map(function (e, t) {
                        return s && e === s[1] ? t : null;
                      })
                    );
                  case 'title':
                    return (
                      a || (a = Y(i, 'title')),
                      a.map(function (e, t) {
                        return s && e === s[1] ? t : null;
                      })
                    );
                  default:
                    return [];
                }
              if (t.nodeName && t._DT_CellIndex) return [t._DT_CellIndex.column];
              var d = _e
                .s(Mr(e.header))
                .filter(t)
                .mapTo(e => Lr(e))
                .flat()
                .sort(function (e, t) {
                  return e - t;
                });
              if (d.length || !t.nodeName) return d;
              var f = _e.s(t).closest('*[data-dt-column]');
              return f.count() ? [parseInt(f.attr('data-dt-column'))] : [];
            },
            e,
            r
          );
        return r.columnOrder && 'index' === r.columnOrder
          ? o.sort(function (e, t) {
              return e - t;
            })
          : o;
      })(e, r, n),
    !0
  );
  return ((a.selector.cols = r), (a.selector.opts = n), a);
}),
  Xr('columns().every()', function (e) {
    var t = this.selector.opts,
      r = 0;
    return this.iterator('every', (n, a, i) => {
      let o = this.column(a, t);
      (e.call(o, a, i, r), r++);
    });
  }),
  $r('columns().header()', 'column().header()', function (e) {
    return this.iterator(
      'column',
      function (t, r) {
        return tn(t, r, e);
      },
      !0
    );
  }),
  $r('columns().footer()', 'column().footer()', function (e) {
    return this.iterator(
      'column',
      function (t, r) {
        return t.footer.length ? t.footer[void 0 !== e ? e : 0][r].cell : null;
      },
      !0
    );
  }),
  $r('columns().data()', 'column().data()', function () {
    return this.iterator('column-rows', en, !0);
  }),
  $r('columns().render()', 'column().render()', function (e) {
    return this.iterator(
      'column-rows',
      function (t, r, n, a, i) {
        return en(t, r, 0, 0, i, e);
      },
      !0
    );
  }),
  $r('columns().dataSrc()', 'column().dataSrc()', function () {
    return this.iterator(
      'column',
      function (e, t) {
        return e.columns[t].data;
      },
      !0
    );
  }),
  $r('columns().init()', 'column().init()', function () {
    return this.iterator(
      'column',
      function (e, t) {
        return e.columns[t];
      },
      !0
    );
  }),
  $r('columns().names()', 'column().name()', function () {
    return this.iterator(
      'column',
      function (e, t) {
        return e.columns[t].name;
      },
      !0
    );
  }),
  $r('columns().nodes()', 'column().nodes()', function () {
    return this.iterator(
      'column-rows',
      function (e, t, r, n, a) {
        return K(Z(e.data, a, 'cells', t));
      },
      !0
    );
  }),
  $r('columns().titles()', 'column().title()', function (e, t) {
    return this.iterator(
      'column',
      function (r, n) {
        'number' == typeof e && ((t = e), (e = void 0));
        var a = _e.s(this.column(n).header(t)).find('.dt-column-title');
        return void 0 !== e ? (a.html(e), this) : a.html();
      },
      !0
    );
  }),
  $r('columns().types()', 'column().type()', function () {
    return this.iterator(
      'column',
      function (e, t) {
        var r = e.columns[t],
          n = r.type;
        return (n || (Sr(e), (n = r.type)), n);
      },
      !0
    );
  }),
  $r('columns().visible()', 'column().visible()', function (e, t) {
    var r = this,
      n = [],
      a = this.iterator('column', function (t, r) {
        if (void 0 === e) return t.columns[r].visible;
        (function (e, t, r) {
          var n,
            a,
            i,
            o,
            l = e.columns,
            s = l[t],
            c = e.data;
          if (void 0 === r) return s.visible;
          if (s.visible === r) return !1;
          if (r) {
            var u = Y(l, 'visible').indexOf(!0, t + 1);
            for (a = 0, i = c.length; i > a; a++) {
              let e = c[a];
              e && ((n = e.cells), (o = e.tr) && o.insertBefore(n[t], n[u] || null));
            }
          } else _e.s(K(Y(e.data, 'cells', t))).detach();
          return ((s.visible = r), Ke(e), !0);
        })(t, r, e) && n.push(r);
      });
    return (
      void 0 !== e &&
        this.iterator('table', function (a) {
          (Lt(a, a.header),
            Lt(a, a.footer),
            a.display.length || _e.s(a.tbody).find('td[colspan]').attr('colspan', Cr(a)),
            bt(a),
            r.iterator('column', function (r, a) {
              n.includes(a) && $t(r, null, 'column-visibility', [r, a, e, t]);
            }),
            n.length && (void 0 === t || t) && r.columns.adjust());
        }),
      a
    );
  }),
  $r('columns().widths()', 'column().width()', function () {
    var e = this.columns(':visible'),
      t = _e.c('tr').html('<td>' + Array(e.count()).join('</td><td>') + '</td>');
    _e.s(this.table().body()).append(t);
    var r = [],
      n = e.indexes();
    return (
      t.children().each((e, t) => {
        r[n[t]] = _e.s(e).width('outer');
      }),
      t.remove(),
      this.iterator('column', (e, t) => r[t] || 0, !0)
    );
  }),
  $r('columns().indexes()', 'column().index()', function (e) {
    return this.iterator(
      'column',
      function (t, r) {
        return 'visible' === e ? jr(t, r) : r;
      },
      !0
    );
  }),
  Xr('columns.adjust()', function () {
    return this.iterator(
      'table',
      function (e) {
        ((e.containerWidth = -1), Ar(e));
      },
      !0
    );
  }),
  Xr('column.index()', function (e, t) {
    if (0 !== this.context.length) {
      var r = this.context[0];
      if ('fromVisible' === e || 'toData' === e) return Dr(r, t);
      if ('fromData' === e || 'toVisible' === e) return jr(r, t);
    }
    return -1;
  }),
  Xr('column()', function (e, t) {
    return Wr(this.columns(e, t));
  }),
  Ur.register('draw()', function (e) {
    return this.iterator('table', function (t) {
      'page' === e ? Mt(t) : ('string' == typeof e && (e = 'full-hold' !== e), Ft(t, !1 === e));
    });
  }),
  Xr('order()', function (e, t) {
    let r = this.context,
      n = Array.prototype.slice.call(arguments);
    return void 0 === e
      ? 0 !== r.length
        ? r[0].order
        : void 0
      : ('number' == typeof e && 'string' == typeof t ? (e = [[e, t]]) : n.length > 1 && (e = n),
        this.iterator('table', function (t) {
          let r = [];
          (st(t, r, e), (t.order = r));
        }));
  }),
  Xr('order.listener()', function (e, t, r) {
    return this.iterator('table', function (n) {
      ot(n, e, '', t, r);
    });
  }),
  Xr('order.fixed()', function (e) {
    if (!e) {
      var t = this.context,
        r = t.length ? t[0].orderFixed : void 0;
      return Array.isArray(r) ? { pre: r } : r;
    }
    return this.iterator('table', function (t) {
      t.orderFixed = O({}, e);
    });
  }),
  Xr(['columns().order()', 'column().order()'], function (e) {
    var t = this;
    return e
      ? this.iterator('table', function (r, n) {
          r.order = t[n].map(function (t) {
            return [t, e];
          });
        })
      : this.iterator(
          'column',
          function (e, t) {
            for (var r = ct(e), n = 0, a = r.length; a > n; n++)
              if (r[n].col === t) return r[n].dir;
            return null;
          },
          !0
        );
  }),
  $r('columns().orderable()', 'column().orderable()', function (e) {
    return this.iterator(
      'column',
      function (t, r) {
        var n = t.columns[r];
        return e ? n.orderSequence : n.orderable;
      },
      !0
    );
  }),
  Xr('page()', function (e) {
    return void 0 === e
      ? this.page.info().page
      : this.iterator('table', function (t) {
          yt(t, e);
        });
  }),
  Xr('page.info()', function () {
    var e = this.context[0],
      t = e.displayStart,
      r = e.features.paging ? e.pageLength : -1,
      n = qt(e),
      a = -1 === r;
    return {
      page: a ? 0 : Math.floor(t / r),
      pages: a ? 1 : Math.ceil(n / r),
      start: t,
      end: Wt(e),
      length: r,
      recordsTotal: Pt(e),
      recordsDisplay: n,
      serverSide: 'ssp' === Jt(e)
    };
  }),
  Xr('page.len()', function (e) {
    return null == e
      ? 0 !== this.context.length
        ? this.context[0].pageLength
        : void 0
      : this.iterator('table', function (t) {
          rn(t, e);
        });
  }),
  Xr('processing()', function (e) {
    return this.iterator('table', t => $e(t, e));
  }),
  _e.on('preInit.dt', function (e, t) {
    var r = new Ur(t);
    (r.on('stateSaveParams.DT', function (e, t, r) {
      for (var n = t.rowIdFn, a = t.displayMaster, i = [], o = 0; a.length > o; o++) {
        var l = t.data[a[o]];
        l.detailsShow && i.push('#' + n(l.data));
      }
      r.childRows = i;
    }),
      r.on('stateLoaded.DT', function (e, t, n) {
        nn(r, n);
      }));
  }),
  _e.on('plugin-init.dt', function (e, t) {
    var r = t.api;
    nn(r, r.state.loaded());
  }));
var an = ce.throttle(function (e) {
  bt(e[0]);
}, 500);
function on(e, t) {
  var r = e.context;
  if (r.length) {
    var n = r[0].data[void 0 !== t ? t : e[0]];
    n &&
      n.details &&
      (n.details.detach(),
      (n.detailsShow = void 0),
      (n.details = void 0),
      _e.s(n.tr).classRemove('dt-hasChild'),
      an(r));
  }
}
function ln(e, t) {
  var r = e.context;
  if (r.length && e.length) {
    var n = r[0].data[e[0]];
    n &&
      n.details &&
      ((n.detailsShow = t),
      t && n.tr
        ? (n.details.insertAfter(n.tr), _e.s(n.tr).classAdd('dt-hasChild'))
        : t || (n.details.detach(), _e.s(n.tr).classRemove('dt-hasChild')),
      $t(r[0], null, 'childRow', [t, e.row(e[0])]),
      (function (e) {
        var t = new Ur(e),
          r = '.dt.DT_details',
          n = 'draw' + r,
          a = 'column-sizing' + r,
          i = 'destroy' + r,
          o = e.data;
        (t.off(n + ' ' + a + ' ' + i),
          ce.array.pluck(o, 'details').length > 0 &&
            (t.on(n, function (r, n) {
              e === n &&
                t
                  .rows({ page: 'current' })
                  .eq(0)
                  .each(function (e) {
                    var t = o[e];
                    t && t.detailsShow && t.details && t.tr && t.details.insertAfter(t.tr);
                  });
            }),
            t.on(a, function (t, r) {
              if (e === r)
                for (var n, a = Cr(r), i = 0, l = o.length; l > i; i++)
                  (n = o[i]) &&
                    n.details &&
                    n.details.each(function (e) {
                      var t = _e.s(e).children('td');
                      1 == t.count() && t.attr('colspan', a);
                    });
            }),
            t.on(i, function (r, n) {
              if (e === n)
                for (var a = 0, i = o.length; i > a; a++) {
                  let e = o[a];
                  e && e.details && on(t, a);
                }
            })));
      })(r[0]),
      an(r));
  }
}
var sn = 'row().child',
  cn = sn + '()';
function un(e, t) {
  if (Array.isArray(e)) {
    var r = [];
    return (
      e.forEach(function (e) {
        Yt(r, un(e, t));
      }),
      r.filter(e => !!e)
    );
  }
  if ('number' == typeof e) return [t[e]];
  var n = t.map(function (e) {
    return e.table;
  });
  return _e
    .s(n)
    .filter(e)
    .mapTo(e => t[n.indexOf(e)]);
}
(Ur.register(cn, function (e, t) {
  var r,
    n = this.context;
  return void 0 === e
    ? n.length && this.length && n[0].data[this[0]]
      ? null === (r = n[0].data[this[0]]) || void 0 === r
        ? void 0
        : r.details
      : void 0
    : (!0 === e
        ? this.child.show()
        : !1 === e
          ? on(this)
          : n.length &&
            this.length &&
            (function (e, t, r, n) {
              if (t) {
                var a = [],
                  i = function (r, n) {
                    if (Array.isArray(r) || ce.is.jquery(r))
                      for (var o = 0, l = r.length; l > o; o++) i(r[o], n);
                    else if (r.nodeName && 'tr' === r.nodeName.toLowerCase())
                      (r.setAttribute('data-dt-row', t.idx), a.push(r));
                    else {
                      let i = _e.c('td').classAdd(n),
                        o = _e.c('tr').append(i).attr('data-dt-row', t.idx).classAdd(n);
                      (r.nodeName ? i.append(r) : i.html(r),
                        (i.get(0).colSpan = Cr(e)),
                        a.push(o.get(0)));
                    }
                  };
                (i(r, n),
                  t.details && t.details.detach(),
                  (t.details = _e.s(a)),
                  t.detailsShow && t.tr && t.details.insertAfter(t.tr));
              }
            })(n[0], n[0].data[this[0]], e, t),
      this.inst(this.context, this));
}),
  Ur.register([sn + '.show()', cn + '.show()'], function () {
    return (ln(this, !0), this);
  }),
  Ur.register([sn + '.hide()', cn + '.hide()'], function () {
    return (ln(this, !1), this);
  }),
  Ur.register([sn + '.remove()', cn + '.remove()'], function () {
    return (on(this), this);
  }),
  Ur.register(sn + '.isShown()', function () {
    var e = this.context;
    return (e.length && this.length && e[0].data[this[0]] && e[0].data[this[0]].detailsShow) || !1;
  }),
  Xr('rows()', function (e, t) {
    let r, n;
    (void 0 === e ? (n = '') : ce.is.plainObject(e) ? ((n = ''), (r = e)) : ((n = e), (r = t)),
      (r = qr(r)));
    var a = this.iterator(
      'table',
      function (e) {
        return (function (e, t, r) {
          var n,
            a = Pr(
              'row',
              t,
              function (t) {
                var a = ce.conv.intVal(t),
                  i = e.data;
                if (null !== a && !r) return [a];
                if ((n || (n = zr(e, r)), null !== a && -1 !== n.indexOf(a))) return [a];
                if (null == t || '' === t) return n;
                if ('function' == typeof t)
                  return n.map(function (e) {
                    var r = i[e];
                    return r && t(e, r.data, r.tr) ? e : null;
                  });
                if (t.nodeName) {
                  var o,
                    l = t._DT_RowIndex,
                    s = t._DT_CellIndex;
                  if (void 0 !== l) return (o = i[l]) && o.tr === t ? [l] : [];
                  if (s) return (o = i[s.row]) && o.tr === t.parentNode ? [s.row] : [];
                  var c = _e.s(t).closest('*[data-dt-row]');
                  return c.count() ? [parseInt(c.attr('data-dt-row'))] : [];
                }
                if ('string' == typeof t)
                  if ('#' === t.charAt(0)) {
                    var u = e.ids[t.replace(/^#/, '')];
                    if (void 0 !== u) return [u.idx];
                  } else if (t.match(/^(tr)?:eq\(\d+\)$/)) {
                    let e = parseInt(t.replace(/[^\d]/g, ''));
                    return void 0 !== n[e] ? [n[e]] : [];
                  }
                var d = ce.array.removeEmpty(ce.array.pluckOrder(e.data, n, 'tr'));
                return _e
                  .s(d)
                  .filter(t)
                  .mapTo(e => e._DT_RowIndex);
              },
              e,
              r
            );
          return (('current' !== r.order && 'applied' !== r.order) || lt(e, a), a);
        })(e, n, r);
      },
      !0
    );
    return ((a.selector.rows = n), (a.selector.opts = r), a);
  }),
  Xr('rows().every()', function (e) {
    var t = this.selector.opts,
      r = 0;
    return this.iterator('every', (n, a, i) => {
      let o = this.row(a, t);
      (e.call(o, a, i, r), r++);
    });
  }),
  Xr('rows().nodes()', function () {
    return this.iterator(
      'row',
      function (e, t) {
        var r;
        return (null === (r = e.data[t]) || void 0 === r ? void 0 : r.tr) || void 0;
      },
      !0
    );
  }),
  Xr('rows().data()', function () {
    return this.iterator(
      !0,
      'rows',
      function (e, t) {
        return ce.array.pluckOrder(e.data, t, 'data');
      },
      !0
    );
  }),
  $r('rows().invalidate()', 'row().invalidate()', function (e) {
    return this.iterator('row', function (t, r) {
      Be(t, r, e);
    });
  }),
  $r('rows().indexes()', 'row().index()', function () {
    return this.iterator(
      'row',
      function (e, t) {
        return t;
      },
      !0
    );
  }),
  $r('rows().ids()', 'row().id()', function (e) {
    for (var t, r = [], n = this.context, a = 0, i = n.length; i > a; a++)
      for (var o = 0, l = this[a].length; l > o; o++) {
        var s = n[a].rowIdFn(
          null === (t = n[a].data[this[a][o]]) || void 0 === t ? void 0 : t.data
        );
        r.push((!0 === e ? '#' : '') + s);
      }
    return this.inst(n, r);
  }),
  $r('rows().remove()', 'row().remove()', function () {
    return (
      this.iterator('row', function (e, t) {
        var r = e.data,
          n = r[t],
          a = e.displayMaster.indexOf(t);
        (-1 !== a && e.displayMaster.splice(a, 1),
          e.recordsDisplay > 0 && e.recordsDisplay--,
          Vt(e));
        var i = e.rowIdFn(null == n ? void 0 : n.data);
        (void 0 !== i && delete e.ids[i], (r[t] = null));
      }),
      this
    );
  }),
  Xr('rows.add()', function (e) {
    var t = this.iterator(
        'table',
        function (t) {
          var r,
            n,
            a,
            i = [];
          for (n = 0, a = e.length; a > n; n++)
            (r = e[n]).nodeName && 'TR' === r.nodeName.toUpperCase()
              ? i.push(He(t, _e.s(r))[0])
              : i.push(ke(t, r));
          return i;
        },
        !0
      ),
      r = this.rows(-1);
    return (r.pop(), Yt(r, t), r);
  }),
  Xr('row()', function (e, t) {
    return Wr(this.rows(e, t));
  }),
  Xr('row().data()', function (e) {
    var t,
      r = this.context;
    if (void 0 === e)
      return r.length && this.length && this[0].length
        ? null === (t = r[0].data[this[0]]) || void 0 === t
          ? void 0
          : t.data
        : void 0;
    var n = r[0].data[this[0]];
    return (
      (n.data = e),
      Array.isArray(e) && n.tr && n.tr.id && ce.set(r[0].rowId)(e, n.tr.id),
      Be(r[0], this[0][0], 'data'),
      this
    );
  }),
  Xr('row().node()', function () {
    var e = this.context;
    if (e.length && this.length && this[0].length) {
      var t = e[0].data[this[0]];
      if (t && t.tr) return t.tr;
    }
    return null;
  }),
  Xr('row.add()', function (e) {
    e && e.fn && e.length && (e = e[0]);
    var t = this.iterator('table', function (t) {
      return (
        Ue(t),
        e.nodeName && 'TR' === e.nodeName.toUpperCase() ? He(t, _e.s(e))[0] : ke(t, e)
      );
    });
    return this.row(t[0]);
  }),
  Xr('search()', function (e, t, r, n) {
    if (void 0 === e) {
      let e = this.context;
      if (0 === e.length) return;
      return e[0].searches['*'].search;
    }
    return this.iterator('table', function (a) {
      if (!a.features.searching) return;
      let i = a.searches['*'];
      (i || (i = vt()),
        C(
          i,
          'object' == typeof t
            ? t
            : { regex: null !== t && t, smart: null === r || r, caseInsensitive: null === n || n }
        ),
        (i.search = e),
        (a.searches['*'] = i),
        Ct(a));
    });
  }),
  Xr('search.fixed()', function (e, t, r) {
    var n = this.iterator(!0, 'table', function (n) {
      var a,
        i = n.searchesFixed['*'];
      if (!e) return Object.keys(i);
      if (void 0 === t) return null === (a = i[e]) || void 0 === a ? void 0 : a.search;
      if (null === t) delete i[e];
      else {
        let n = i[e];
        ((n && ce.is.plainObject(n)) || (n = vt()), r && C(n, r), (n.search = t), (i[e] = n));
      }
      return this;
    });
    return void 0 !== e && void 0 === t ? n[0] : n;
  }),
  Xr(['columns().search()', 'column().search()'], function (e, t, r, n) {
    var a;
    if (void 0 === e) {
      let e = this[0].join(',');
      return (
        (this.context.length &&
          (null === (a = this.context[0].searches[e]) || void 0 === a ? void 0 : a.search)) ||
        ''
      );
    }
    return this.iterator('columns', function (a, i) {
      let o = i.join(','),
        l = a.searches[o];
      (l || (l = vt()),
        ('' !== e && null !== e) || 1 >= i.length
          ? (C(
              l,
              'object' == typeof t
                ? t
                : {
                    regex: null !== t && t,
                    smart: null === r || r,
                    caseInsensitive: null === n || n
                  }
            ),
            (l.search = e),
            (l.columns = i.slice()),
            (a.searches[o] = l),
            Ct(a))
          : delete a.searches[o]);
    });
  }),
  Xr(['columns().search.fixed()', 'column().search.fixed()'], function (e, t, r) {
    if (!e)
      return this.iterator(!0, 'columns', function (e, t) {
        let r = t.join(','),
          n = e.searchesFixed[r];
        return n ? Object.keys(n) : [];
      });
    if (void 0 !== t)
      return this.iterator(!0, 'columns', function (n, a) {
        let i = a.join(','),
          o = n.searchesFixed[i];
        if ((o || ((o = {}), (n.searchesFixed[i] = o)), null === t)) delete o[e];
        else {
          let n = o[e];
          ((n && ce.is.plainObject(n)) || (n = vt()),
            r && C(n, r),
            (n.search = t),
            (n.columns = a),
            (o[e] = n));
        }
        return this;
      });
    if (this.context.length) {
      let t = this[0].join(','),
        r = this.context[0].searchesFixed[t];
      return r && r[e] ? r[e].search : void 0;
    }
  }),
  Xr('state()', function (e, t = !0) {
    if (!e) return this.context.length ? this.context[0].stateSaved : null;
    let r = O({}, e);
    return this.iterator('table', function (e) {
      wt(e, r, t, function () {});
    });
  }),
  Xr('state.clear()', function () {
    return this.iterator('table', function (e) {
      e.stateSaveCallback.call(e.instance, e, {});
    });
  }),
  Xr('state.loaded()', function () {
    return this.context.length ? this.context[0].stateLoaded : null;
  }),
  Xr('state.save()', function () {
    return this.iterator('table', function (e) {
      bt(e);
    });
  }),
  Xr('tables()', function (e) {
    return this.inst(null != e ? un(e, this.context) : this.context);
  }),
  Xr('table()', function (e) {
    return Wr(this.tables(e));
  }),
  [
    ['nodes', 'node', 'table'],
    ['body', 'body', 'tbody'],
    ['header', 'header', 'thead'],
    ['footer', 'footer', 'tfoot']
  ].forEach(function (e) {
    $r('tables().' + e[0] + '()', 'table().' + e[1] + '()', function () {
      return this.iterator('table', t => t[e[2]], !0);
    });
  }),
  ['header', 'footer'].forEach(function (e) {
    Xr('table().' + e + '.structure()', function (t) {
      var r = this.columns(t).indexes().flatten().toArray(),
        n = this.context[0],
        a = Et(n, n[e], r),
        i = r.slice().sort(function (e, t) {
          return e - t;
        });
      return a.map(function (e) {
        return r.map(function (t) {
          return e[i.indexOf(t)];
        });
      });
    });
  }),
  $r('tables().containers()', 'table().container()', function () {
    return this.iterator(
      'table',
      function (e) {
        return e.tableWrapper;
      },
      !0
    );
  }),
  Xr('tables().every()', function (e) {
    return this.iterator('table', (t, r) => {
      e.call(this.table(r), r);
    });
  }),
  Xr('caption()', function (e, t) {
    var r = this.context;
    if (void 0 === e) {
      var n = r[0].captionNode;
      return n && r.length ? n.innerHTML : null;
    }
    return this.iterator(
      'table',
      function (r) {
        var n = _e.s(r.table),
          a = _e.s(r.captionNode),
          i = _e.s(r.tableWrapper);
        (a.count() ||
          ((a = _e.c('caption').html(e)),
          (r.captionNode = a.get(0)),
          t || (n.prepend(a), (t = a.css('caption-side')))),
          a.html(e),
          t && (a.css('caption-side', t), (a.get(0)._captionSide = t)),
          i.find('div.dt-scroll').count()
            ? i.find('div.dt-scroll-' + ('top' === t ? 'head' : 'foot') + ' table').prepend(a)
            : n.prepend(a));
      },
      !0
    );
  }),
  Xr('caption.node()', function () {
    var e = this.context;
    return e.length ? e[0].captionNode : null;
  }));
var dn,
  fn,
  pn = !1,
  hn = !1,
  gn = null,
  mn = null,
  vn = { developers: 0, type: null, expires: null, valid: null };
function yn(e) {
  return Uint8Array.from(atob(e), e => e.charCodeAt(0));
}
function bn(e, t) {
  let r = vn.expires;
  if (_n())
    if (!1 === vn.valid) (xn('Invalid license key'), Tn());
    else {
      if ('trial' === vn.type) {
        let e = r ? Math.ceil((r.getTime() - new Date().getTime()) / 864e5) : -1;
        return 0 > e
          ? (wn(
              'Your trial has now expired. Please visit https://datatables.net/plus to purchase a license',
              'warn'
            ),
            xn('Trial expired'),
            Tn(),
            !1)
          : (wn('Your trial expires in ' + e + ' day' + (1 === e ? '' : 's')), !0);
      }
      if (null === t) return !0;
      if ('plus' === vn.type || ('editor' === vn.type && 'editor' === t))
        return !(!r || new Date(e) > r) || (xn('Upgrade required for this version'), Tn(), !1);
      if ('editor' === vn.type && 'editor' !== t)
        return (xn('License for Editor only. Upgrade for Plus'), Tn(), !1);
    }
  else (xn('Unable to validate license key'), Tn());
  return (xn(), Tn(), !1);
}
function wn(e, t = 'log') {
  ('log' === t ? console.log : console.warn)(
    '%cDataTables Plus%c ' + e,
    'background: #007bff; color: #fff; padding: 2px 5px;',
    'color: inherit;'
  );
}
function xn(e) {
  if (!pn) {
    if (!pn) {
      fn || (fn = _e.c('div'));
      let e = fn[0].attachShadow({ mode: 'closed' }),
        t = _e
          .c('div')
          .css({
            position: 'fixed',
            bottom: '1em',
            right: '1em',
            border: '1px solid #ffc107',
            background: '#fff3cd',
            color: '#856404',
            padding: '0.5em 1em',
            'font-family': 'sans-serif',
            'font-size': '12px',
            'line-height': '1.4em',
            'text-align': 'center',
            'border-radius': '4px',
            'z-index': '10000',
            'box-shadow': '1px 3px 5px rgba(0, 0, 0, 0.333)'
          });
      (e.appendChild(t[0]), (dn = t), (pn = !0));
    }
    (dn.empty(),
      e
        ? dn
            .append(_e.c('span').text('DataTables Plus'))
            .append(_e.c('br'))
            .append(_e.c('span').text(e + ' - '))
            .append(
              _e
                .c('a')
                .attr('href', 'https://datatables.net/tn/25')
                .attr('target', '_blank')
                .css({ color: 'inherit' })
                .html('learn more &#187;')
            )
        : dn
            .append(_e.c('span').text('DataTables Plus - Evaluation Mode'))
            .append(_e.c('br'))
            .append(
              _e
                .c('a')
                .attr('href', 'https://datatables.net/plus/trial')
                .attr('target', '_blank')
                .css({ color: 'inherit' })
                .text('Start a Free Trial')
            )
            .append(_e.c('span').text(' - '))
            .append(
              _e
                .c('a')
                .attr('href', 'https://datatables.net/plus')
                .attr('target', '_blank')
                .css({ color: 'inherit' })
                .text('Purchase a License')
            ));
  }
}
function Tn() {
  let e = P('doc');
  hn || !e.body || e.body.contains(fn[0]) || e.body.appendChild(fn[0]);
}
function _n() {
  let e = P('win'),
    t = e.crypto || e.msCrypto;
  return t.subtle || t.webkitSubtle;
}
function An(e, t) {
  var r = !1;
  return (
    e && e.document && ((window = e), (document = e.document)),
    t && t.fn && t.fn.jquery && (r = !0),
    r
  );
}
function Dn(e, t, r) {
  r && (e[t] = r);
}
function jn(e) {
  let t = [];
  return (
    e.numbers && t.push('numbers'),
    e.previousNext && (t.unshift('previous'), t.push('next')),
    e.firstLast && (t.unshift('first'), t.push('last')),
    t
  );
}
function Cn(e, t, r) {
  if (!e.initDone) return;
  let n = r.type ? Hr.pager[r.type] : jn,
    a = e.language.aria.paginate || {},
    i = e.displayStart,
    o = e.pageLength,
    l = qt(e),
    s = -1 === o,
    c = s ? 0 : Math.ceil(i / o),
    u = s ? (l ? 1 : 0) : Math.ceil(l / o),
    d = [],
    f = [],
    p = n(r).map(function (e) {
      return 'numbers' === e ? Ee(c, u, r.buttons, r.boundaryNumbers) : e;
    });
  d = d.concat.apply(d, p);
  for (let m = 0; d.length > m; m++) {
    let t = d[m],
      r = On(e, t, c, u),
      n = Je(e, 'pagingButton')(e, t, r.display, r.active, r.disabled),
      i = 'string' == typeof t ? a[t] : a.number ? a.number + (t + 1) : null;
    (_e
      .s(n.clicker)
      .attr({
        'aria-controls': e.tableId,
        'aria-disabled': r.disabled ? 'true' : null,
        'aria-current': r.active ? 'page' : null,
        'aria-label': i,
        'data-dt-idx': t,
        tabIndex: r.disabled
          ? -1
          : e.tabIndex && 'span' !== n.clicker.nodeName.toLowerCase()
            ? e.tabIndex
            : null
      }),
      'number' != typeof t && _e.s(n.clicker).classAdd(t),
      Ut(n.clicker, '', function (r) {
        (r.preventDefault(), yt(e, t, !0));
      }),
      f.push(n.display));
  }
  let h = Je(e, 'pagingContainer')(e, f),
    g = t.find(P('doc').activeElement).attr('data-dt-idx');
  if ((t.empty().append(h), g && t.find('[data-dt-idx="' + g + '"]').trigger('focus'), f.length)) {
    let n = _e.s(f[0]).height('withBorder');
    r.buttons > 1 &&
      n > 0 &&
      t.height() >= 2 * n - 10 &&
      Cn(e, t, Object.assign({}, r, { buttons: r.buttons - 2 }));
  }
}
function On(e, t, r, n) {
  let a = e.language.paginate,
    i = { display: '', active: !1, disabled: !1 };
  switch (t) {
    case 'ellipsis':
      i.display = '&#x2026;';
      break;
    case 'first':
      ((i.display = a.first), 0 === r && (i.disabled = !0));
      break;
    case 'previous':
      ((i.display = a.previous), 0 === r && (i.disabled = !0));
      break;
    case 'next':
      ((i.display = a.next), (0 !== n && r !== n - 1) || (i.disabled = !0));
      break;
    case 'last':
      ((i.display = a.last), (0 !== n && r !== n - 1) || (i.disabled = !0));
      break;
    default:
      'number' == typeof t && ((i.display = e.formatNumber(t + 1, e)), r === t && (i.active = !0));
  }
  return i;
}
(Ie('div', function (e, t) {
  var r = _e.c('div').get(0);
  return (
    t &&
      (Dn(r, 'className', t.className),
      Dn(r, 'id', t.id),
      Dn(r, 'innerHTML', t.html),
      Dn(r, 'textContent', t.text)),
    r
  );
}),
  Ie(
    'info',
    function (e, t) {
      if (!e.features.info) return null;
      let r = e.language,
        n = e.tableId,
        a = _e.c('div').classAdd(e.classes.info.container),
        i = Object.assign(
          {
            callback: r.infoCallback,
            empty: r.infoEmpty,
            postfix: r.infoPostFix,
            search: r.infoFiltered,
            text: r.info
          },
          t
        );
      return (
        e.callbacks.draw.push(function (e) {
          !(function (e, t, r) {
            var n = e.displayStart + 1,
              a = Wt(e),
              i = Pt(e),
              o = qt(e),
              l = o ? t.text : t.empty;
            (o !== i && (l += ' ' + t.search),
              (l = Gt(e, (l += t.postfix))),
              t.callback && (l = t.callback.call(e.instance, e, n, a, i, o, l)),
              r.html(l),
              $t(e, null, 'info', [e, r.get(0), l]));
          })(e, i, a);
        }),
        e.infoEl ||
          (a.attr({ 'aria-live': 'polite', id: n + '_info', role: 'status' }),
          _e.s(e.table).attr('aria-describedby', n + '_info'),
          (e.infoEl = a)),
        a
      );
    },
    'i'
  ),
  Ie(
    'paging',
    function (e, t) {
      if (!e.features.paging) return null;
      let r = Object.assign(
          {
            buttons: Hr.pager.numbers_length,
            type: e.pagingType,
            boundaryNumbers: !0,
            firstLast: !0,
            previousNext: !0,
            numbers: !0
          },
          t
        ),
        n = _e
          .c('div')
          .classAdd(e.classes.paging.container + (r.type ? ' paging_' + r.type : ''))
          .append(_e.c('nav').attr('aria-label', 'pagination').classAdd(e.classes.paging.nav)),
        a = function () {
          Cn(e, n.children(), r);
        };
      return (e.callbacks.draw.push(a), _e.s(e.table).on('column-sizing.dt.DT', a), n);
    },
    'p'
  ));
var Nn = 0;
Ie(
  'pageLength',
  function (e, t) {
    var r = e.features;
    if (!r.paging || !r.lengthChange) return null;
    let n,
      a = Object.assign({ menu: e.lengthMenu, text: e.language.lengthMenu }, t),
      i = e.classes.length,
      o = e.tableId,
      l = a.menu,
      s = [],
      c = [];
    if (Array.isArray(l[0])) ((s = l[0]), (c = l[1]));
    else
      for (n = 0; l.length > n; n++)
        A(l[n]) ? (s.push(l[n].value), c.push(l[n].label)) : (s.push(l[n]), c.push(l[n]));
    var u = a.text.match(/_MENU_$/),
      d = a.text.match(/^_MENU_/),
      f = a.text.replace(/_MENU_/, ''),
      p = '<label>' + a.text + '</label>';
    d ? (p = '_MENU_<label>' + f + '</label>') : u && (p = '<label>' + f + '</label>_MENU_');
    var h = 'tmp-' + +new Date(),
      g = _e
        .c('div')
        .classAdd(i.container)
        .html(p.replace('_MENU_', '<span id="' + h + '"></span>')),
      m = [];
    Array.prototype.slice.call(g.find('label').get(0).childNodes).forEach(function (e) {
      e.nodeType === Node.TEXT_NODE && m.push({ el: e, text: e.textContent });
    });
    var v = function (t) {
        m.forEach(function (r) {
          r.el.textContent = Gt(e, r.text, t);
        });
      },
      y = _e.c('select').attr('aria-controls', o).attr('autocomplete', 'off').classAdd(i.select);
    for (n = 0; s.length > n; n++) {
      var b = e.api.i18n('lengthLabels.' + s[n], null);
      (null === b && (b = 'number' == typeof c[n] ? e.formatNumber(c[n], e) : c[n]),
        (y.get(0)[n] = new Option(b, s[n])));
    }
    return (
      g.find('#' + h).replaceWith(y),
      g
        .find('select')
        .attr('id', 'dt-length-' + Nn)
        .val(e.pageLength)
        .on('change.DT', function () {
          (rn(e, y.val()), Mt(e));
        }),
      g.find('label').attr('for', 'dt-length-' + Nn),
      Nn++,
      _e.s(e.table).on('length.dt.DT', function (t, r, n) {
        if (e === r) {
          let e = g.find('select');
          if (
            (e.find('option[data-dt-len-tmp]').remove(),
            !e.find('option[value="' + n + '"]').length)
          ) {
            let t = (function (e, t) {
                let r = e.find('option'),
                  n = r.mapTo(e => parseInt(e.value)).findIndex(e => e > t);
                return -1 > n ? null : r.eq(n);
              })(y, n),
              r = _e.c('option').val(n).text(n).attr('data-dt-len-tmp', !0);
            t && t.length ? r.insertBefore(t) : e.append(r);
          }
          (e.val(n), v(n));
        }
      }),
      v(e.pageLength),
      g
    );
  },
  'l'
);
var Sn = 0;
function Rn(e) {
  return e instanceof RegExp ? e.toString() : 'function' != typeof e ? e : '';
}
Ie(
  'search',
  function (e, t) {
    if (!e.features.searching) return null;
    let r = e.classes.search,
      n = e.tableId,
      a = e.language,
      i = '<input type="search" class="' + r.input + '" autocomplete="off"/>',
      o = ce.object.assignDeep(
        { columns: '*', placeholder: a.searchPlaceholder, processing: !1, text: a.search },
        t
      );
    (-1 === o.text.indexOf('_INPUT_') && (o.text += '_INPUT_'), (o.text = Gt(e, o.text)));
    let l = e.api.columns(o.columns).indexes().toArray(),
      s = '*' === o.columns ? '*' : l.join(','),
      c = e.searches[s];
    (c || ((c = vt()), (e.searches[s] = c)), (c.columns = l));
    let u = o.text.match(/_INPUT_$/),
      d = o.text.match(/^_INPUT_/),
      f = o.text.replace(/_INPUT_/, ''),
      p = '<label>' + o.text + '</label>';
    d ? (p = '_INPUT_<label>' + f + '</label>') : u && (p = '<label>' + f + '</label>_INPUT_');
    let h = _e
      .c('div')
      .classAdd(r.container)
      .html(p.replace(/_INPUT_/, i));
    (h.find('label').attr('for', 'dt-search-' + Sn),
      h.find('input').attr('id', 'dt-search-' + Sn),
      Sn++);
    let g = function (t) {
        let r = this.value;
        (c.return && 'Enter' !== t.key) ||
          (r != c.search &&
            Ve(e, o.processing, function () {
              ((c.search = r), Ct(e), (e.displayStart = 0), Mt(e));
            }));
      },
      m = e.searchDelay,
      v = h
        .find('input')
        .val(Rn(c.search))
        .attr('placeholder', o.placeholder)
        .on('keyup.DT search.DT input.DT paste.DT cut.DT', m ? ce.debounce(g, m) : g)
        .on('mouseup.DT', function (e) {
          setTimeout(function () {
            g.call(v.get(0), e);
          }, 10);
        })
        .on('keypress.DT', function (e) {
          if (13 == e.keyCode) return !1;
        })
        .attr('aria-controls', n);
    return (
      _e.s(e.table).on('search.dt.DT', function (t, r) {
        e === r && v.get(0) !== document.activeElement && v.val(Rn(e.searches[s].search));
      }),
      h
    );
  },
  'f'
);
var In = {
  ajax: null,
  ajaxDataGet: !1,
  api: null,
  browser: { barWidth: 0, scrollbarLeft: !1 },
  callbacks: {
    destroy: [],
    draw: [],
    footer: [],
    header: [],
    init: [],
    preDraw: [],
    row: [],
    rowCreated: [],
    stateLoadParams: [],
    stateLoaded: [],
    stateSaveParams: []
  },
  caption: '',
  captionNode: null,
  classes: {},
  columns: [],
  containerWidth: -1,
  data: [],
  deferLoading: !1,
  destroyWidth: 0,
  destroying: !1,
  display: [],
  displayMaster: [],
  displayStart: 0,
  displayStartInit: -1,
  doingDraw: !1,
  dom: null,
  drawCount: 0,
  drawError: -1,
  drawHold: !1,
  features: {
    autoWidth: !1,
    deferRender: !1,
    info: !1,
    lengthChange: !1,
    orderClasses: !1,
    orderMulti: !1,
    ordering: !1,
    paging: !1,
    processing: !1,
    searching: !1,
    serverSide: !1,
    stateSave: !1
  },
  footer: [],
  header: [],
  ids: {},
  init: {},
  initDone: !1,
  initialised: !1,
  language: {
    ajax: '',
    aria: {
      orderable: '',
      orderableRemove: '',
      orderableReverse: '',
      paginate: { first: '', last: '', next: '', number: '', previous: '' }
    },
    decimal: '',
    emptyTable: '',
    entries: { _: '' },
    info: '',
    infoEmpty: '',
    infoFiltered: '',
    infoPostFix: '',
    lengthMenu: '',
    lengthLabels: {},
    loadingRecords: '',
    paginate: { first: '', last: '', next: '', previous: '' },
    processing: '',
    search: '',
    searchPlaceholder: '',
    thousands: '',
    url: '',
    zeroRecords: ''
  },
  lastOrder: [],
  layout: {},
  loadingState: !1,
  order: [],
  orderCellsTop: null,
  orderDescReverse: !1,
  orderFixed: [],
  orderHandler: !0,
  orderIndicators: !0,
  pageLength: 10,
  pagingControls: 0,
  pagingType: 'two_button',
  searchCols: [],
  recordsDisplay: 0,
  recordsTotal: 0,
  renderer: null,
  resizeObserver: null,
  reszEvt: !1,
  rowId: '',
  rowReadObject: !1,
  scroll: { barWidth: 0, collapse: null, x: '', xInner: '', y: '' },
  scrollBarVis: !1,
  searchDelay: 0,
  searches: {},
  searchesFixed: { '*': {} },
  serverMethod: null,
  sortDetails: [],
  stateDuration: 0,
  stateLoadCallback: () => ({}),
  stateLoaded: null,
  stateSaveCallback: () => {},
  stateSaved: null,
  tabIndex: 0,
  tableId: '',
  titleRow: null,
  typeDetect: !0,
  unique: '',
  wasFiltered: !1,
  wasOrdered: !1,
  windowResizeCb: () => {}
};
function En(e = {}) {
  return ce.object.assignDeep({}, In, e);
}
var Ln = { Column: gr, Row: Fe, Search: vt, Settings: En },
  Mn = {
    ajax: null,
    autoWidth: !0,
    caption: '',
    classes: {},
    column: hr,
    columnDefs: null,
    columns: null,
    createdRow: null,
    data: null,
    deferLoading: null,
    deferRender: !0,
    destroy: !1,
    displayStart: 0,
    dom: null,
    drawCallback: null,
    footerCallback: null,
    formatNumber: function (e, t) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t.language.thousands);
    },
    headerCallback: null,
    info: !0,
    infoCallback: null,
    initComplete: null,
    language: {
      ajax: '',
      aria: {
        orderable: ': Activate to sort',
        orderableRemove: ': Activate to remove sorting',
        orderableReverse: ': Activate to invert sorting',
        paginate: { first: 'First', last: 'Last', next: 'Next', number: '', previous: 'Previous' }
      },
      decimal: '',
      emptyTable: 'No data available in table',
      entries: { _: 'entries', 1: 'entry' },
      info: 'Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_',
      infoEmpty: 'Showing 0 to 0 of 0 _ENTRIES-TOTAL_',
      infoFiltered: '(filtered from _MAX_ total _ENTRIES-MAX_)',
      infoPostFix: '',
      lengthLabels: { '-1': 'All' },
      lengthMenu: '_MENU_ _ENTRIES_ per page',
      loadingRecords: 'Loading...',
      paginate: { first: '«', last: '»', next: '›', previous: '‹' },
      processing: '',
      search: 'Search:',
      searchPlaceholder: '',
      thousands: ',',
      url: '',
      zeroRecords: 'No matching records found'
    },
    layout: { bottomEnd: 'paging', bottomStart: 'info', topEnd: 'search', topStart: 'pageLength' },
    lengthChange: !0,
    lengthMenu: [10, 25, 50, 100],
    on: {},
    order: [[0, 'asc']],
    orderCellsTop: null,
    orderClasses: !0,
    orderDescReverse: !0,
    orderFixed: [],
    orderMulti: !0,
    ordering: !0,
    pageLength: 10,
    paging: !0,
    pagingType: '',
    preDrawCallback: null,
    processing: !1,
    renderer: null,
    retrieve: !1,
    rowCallback: null,
    rowId: 'DT_RowId',
    scrollCollapse: !1,
    scrollX: '',
    scrollY: '',
    search: mt,
    searchCols: [],
    searchDelay: 0,
    searching: !0,
    serverMethod: 'GET',
    serverSide: !1,
    stateDuration: 7200,
    stateLoadCallback: function (e) {
      try {
        const t = (-1 === e.stateDuration ? sessionStorage : localStorage).getItem(
          'DataTables_' + e.unique + '_' + P('win').location.pathname
        );
        return t ? JSON.parse(t) : {};
      } catch (t) {
        return {};
      }
    },
    stateLoadParams: null,
    stateLoaded: null,
    stateSave: !1,
    stateSaveCallback: function (e, t) {
      try {
        (-1 === e.stateDuration ? sessionStorage : localStorage).setItem(
          'DataTables_' + e.unique + '_' + P('win').location.pathname,
          JSON.stringify(t)
        );
      } catch (r) {}
    },
    stateSaveParams: null,
    tabIndex: 0,
    titleRow: null,
    typeDetect: !0
  },
  Fn = function (e, t) {
    if (An(e, t)) return Fn;
    if (((this.api = () => new Ur(e)), 'string' == typeof this.jquery))
      return (new Fn(this.toArray(), e), this);
    var r = void 0 === t;
    let n = _e.s(e),
      a = n.count();
    return (
      r && (t = {}),
      n.each(e => {
        var n,
          i = a > 1 ? ce.object.assignDeepObjects({}, t, !0) : t,
          o = 0,
          l = e.getAttribute('id'),
          s = _e.s(e);
        if ('table' != e.nodeName.toLowerCase())
          return void zt(null, 0, 'Non-table node initialisation (' + e.nodeName + ')', 2);
        (i.on && i.on.options && Zt(s, 'options', i.on.options),
          _e.trigger('options.dt', [i]),
          s.trigger('options.dt', !0, [i]),
          wr(Mn, !0),
          xr(hr),
          ce.object.assign(i, Qt(s.data())),
          wr(i));
        var c = Hr.settings;
        for (o = 0, n = c.length; n > o; o++) {
          var u = c[o];
          if (
            u.table == e ||
            (u.thead && u.thead.parentNode == e) ||
            (u.tfoot && u.tfoot.parentNode == e)
          ) {
            if (r || i.retrieve) return u.instance;
            if (i.destroy) {
              new Ur(u).destroy();
              break;
            }
            return void zt(u, 0, 'Cannot reinitialise DataTable', 3);
          }
          if (u.tableId == e.id) {
            c.splice(o, 1);
            break;
          }
        }
        ((null !== l && '' !== l) || ((l = 'DataTables_Table_' + Hr._unique++), (e.id = l)),
          s.children('colgroup').remove());
        var d = En({
          destroyWidth: s.width(),
          unique: l,
          tableId: l,
          colgroup: _e.c('colgroup'),
          fastData: function (e, t, r) {
            return Pe(d, e, t, r);
          }
        });
        ((d.table = e),
          (d.init = i),
          c.push(d),
          (d.api = new Ur(d)),
          (d.instance = _e.s(e)),
          (d.instance.api = () => d.api),
          i.lengthMenu &&
            !i.pageLength &&
            (i.pageLength =
              'number' == typeof i.lengthMenu[0]
                ? i.lengthMenu[0]
                : Array.isArray(i.lengthMenu[0])
                  ? i.lengthMenu[0][0]
                  : i.lengthMenu[0].value));
        let f = ce.object.assignDeepObjects(ce.object.assignDeep({}, Mn), i);
        (Bt(d.features, f, [
          'autoWidth',
          'deferRender',
          'info',
          'lengthChange',
          'orderClasses',
          'ordering',
          'orderMulti',
          'paging',
          'processing',
          'searching',
          'serverSide'
        ]),
          Bt(d, f, [
            'ajax',
            'formatNumber',
            'serverMethod',
            'order',
            'orderFixed',
            'lengthMenu',
            'pagingType',
            'stateDuration',
            'orderCellsTop',
            'tabIndex',
            'dom',
            'stateLoadCallback',
            'stateSaveCallback',
            'renderer',
            'searchDelay',
            'rowId',
            'caption',
            'layout',
            'orderDescReverse',
            'orderIndicators',
            'orderHandler',
            'titleRow',
            'typeDetect',
            'pageLength',
            'searchCols'
          ]),
          Bt(d.scroll, f, [
            ['scrollX', 'x'],
            ['scrollY', 'y'],
            ['scrollCollapse', 'collapse']
          ]),
          Bt(d.language, f, 'infoCallback'),
          (d.searches['*'] = vt(f.search)),
          Xt(d, 'draw', f.drawCallback),
          Xt(d, 'stateSaveParams', f.stateSaveParams),
          Xt(d, 'stateLoadParams', f.stateLoadParams),
          Xt(d, 'stateLoaded', f.stateLoaded),
          Xt(d, 'row', f.rowCallback),
          Xt(d, 'rowCreated', f.createdRow),
          Xt(d, 'header', f.headerCallback),
          Xt(d, 'footer', f.footerCallback),
          Xt(d, 'init', f.initComplete),
          Xt(d, 'preDraw', f.preDrawCallback),
          (d.rowIdFn = ce.get(d.rowId)),
          f.on &&
            Object.keys(f.on).forEach(function (e) {
              Zt(s, e, f.on[e]);
            }),
          (function (e) {
            if (-1 === mr.barWidth) {
              var t = _e
                  .c('div')
                  .css({
                    position: 'fixed',
                    top: '0',
                    left: -1 * P('win').pageXOffset + 'px',
                    height: '1px',
                    width: '1px',
                    overflow: 'hidden'
                  })
                  .append(
                    _e
                      .c('div')
                      .css({
                        position: 'absolute',
                        top: '1px',
                        left: '1px',
                        width: '100px',
                        overflow: 'scroll'
                      })
                      .append(_e.c('div').css({ width: '100%', height: '10px' }))
                  )
                  .appendTo('body'),
                r = t.children(),
                n = r.children();
              ((mr.barWidth = r.get(0).offsetWidth - r.get(0).clientWidth),
                (mr.scrollbarLeft = 1 !== Math.round(n.offset().left)),
                t.remove());
            }
            (Object.assign(e.browser, mr), (e.scroll.barWidth = mr.barWidth));
          })(d));
        var p = d.classes;
        (ce.object.assignDeep(p, Hr.classes, f.classes),
          s.classAdd(p.table),
          d.features.paging || (f.displayStart = 0),
          -1 === d.displayStartInit &&
            ((d.displayStartInit = f.displayStart), (d.displayStart = f.displayStart)));
        var h = f.deferLoading;
        null !== h &&
          ((d.deferLoading = !0),
          Array.isArray(h)
            ? ((d.recordsDisplay = h[0]), (d.recordsTotal = h[1]))
            : ((d.recordsDisplay = h), (d.recordsTotal = h)));
        var g = [],
          m = s.children('thead'),
          v = Ht(d, m.get(0), !1);
        if (f.columns) g = f.columns;
        else if (v.length) for (o = 0, n = v[0].length; n > o; o++) g.push(null);
        for (o = 0, n = g.length; n > o; o++) Tr(d);
        !(function (e, t, r, n, a) {
          var i,
            o,
            l,
            s,
            c,
            u,
            d = e.columns;
          if (r) for (i = 0, o = r.length; o > i; i++) r[i] && r[i].name && (d[i].name = r[i].name);
          if (t)
            for (i = t.length - 1; i >= 0; i--) {
              let r = t[i],
                o = void 0 !== r.target ? r.target : void 0 !== r.targets ? r.targets : r.aTargets;
              for (Array.isArray(o) || (o = [o]), l = 0, s = o.length; s > l; l++) {
                var f = o[l];
                if ('number' != typeof f || 0 > f) {
                  if ('number' == typeof f && 0 > f) a(d.length + f, r);
                  else if ('string' == typeof f)
                    for (c = 0, u = d.length; u > c; c++)
                      '_all' === f
                        ? a(c, r)
                        : -1 !== f.indexOf(':name')
                          ? d[c].name === f.replace(':name', '') && a(c, r)
                          : n.forEach(function (e) {
                              if (e[c]) {
                                var t = e[c].cell;
                                (f.match(/^[a-z][\w-]*$/i) && (f = '.' + f),
                                  t.matches(f) && a(c, r));
                              }
                            });
                } else {
                  for (; f >= d.length;) Tr(e);
                  a(f, r);
                }
              }
            }
          if (r) for (i = 0, o = r.length; o > i; i++) a(i, r[i]);
        })(d, f.columnDefs, g, v, function (e, t) {
          _r(d, e, t);
        });
        var y = s.children('tbody').find('tr:first-child').eq(0);
        if (y.count()) {
          var b = function (e, t) {
            return null !== e.getAttribute('data-' + t) ? t : null;
          };
          y.eq(0)
            .children('th, td')
            .each(function (e, t) {
              var r = d.columns[t];
              if ((r || zt(d, 0, 'Incorrect column count', 18), r.data === t)) {
                var n = b(e, 'sort') || b(e, 'order'),
                  a = b(e, 'filter') || b(e, 'search');
                (null === n && null === a) ||
                  ((r.data = {
                    _: t + '.display',
                    sort: null !== n ? t + '.@data-' + n : void 0,
                    type: null !== n ? t + '.@data-' + n : void 0,
                    filter: null !== a ? t + '.@data-' + a : void 0
                  }),
                  (r._isArrayHost = !0),
                  _r(d, t));
              }
            });
        }
        Xt(d, 'draw', bt);
        var w = d.features;
        if ((f.stateSave && (w.stateSave = !0), void 0 === f.order)) {
          var x = d.order;
          for (o = 0, n = x.length; n > o; o++) x[o][1] = d.columns[o].orderSequence[0];
        }
        (ft(d),
          Xt(d, 'draw', function () {
            (d.wasOrdered || 'ssp' === Jt(d) || w.deferRender) && ft(d);
          }));
        var T = s.children('caption');
        (d.caption && (0 === T.count() && (T = _e.c('caption').prependTo(s)), T.html(d.caption)),
          T.count() &&
            ((T.get(0)._captionSide = T.css('caption-side')), (d.captionNode = T.get(0))),
          T.count() ? d.colgroup.insertAfter(T.get(0)) : d.colgroup.prependTo(e),
          0 === m.count() && (m = _e.c('thead').appendTo(s)),
          (d.thead = m.get(0)));
        var _ = s.children('tbody');
        (0 === _.count() && (_ = _e.c('tbody').insertAfter(m.get(0))), (d.tbody = _.get(0)));
        var A = s.children('tfoot');
        (0 === A.count() && (A = _e.c('tfoot').appendTo(e)),
          (d.tfoot = A.get(0)),
          (d.display = d.displayMaster.slice()),
          (d.initialised = !0));
        var D = d.language;
        if ((f.language && ce.object.assignDeep(D, f.language), D.ajax)) {
          let e = function (e) {
            (yr(e),
              ce.object.assignDeep(D, e, d.init.language),
              $t(d, null, 'i18n', [d], !0),
              xt(d));
          };
          if ('function' == typeof D.ajax) D.ajax(d, e);
          else {
            let t = {
              dataType: 'json',
              url: '',
              success: e,
              error: function () {
                (zt(d, 0, 'i18n file loading error', 21), xt(d));
              }
            };
            ('string' == typeof D.ajax ? (t.url = D.ajax) : (t = ce.object.assign(t, D.ajax)),
              ce.ajax(t));
          }
        } else ($t(d, null, 'i18n', [d], !0), xt(d));
      }),
      this.api()
    );
  };
((Fn.type = rr),
  (Fn.types = function () {
    return Kt.detect.map(function (e) {
      return e._name;
    });
  }),
  (Fn.render = pr),
  (Fn.ext = Hr),
  (Fn.use = ce.external),
  (Fn.factory = An),
  (Fn.versionCheck = ce.version.check),
  (Fn.version = Hr.version),
  (Fn.isDataTable = function (e) {
    if (e instanceof Ur) return !0;
    b(e) && (e = Array.from(e));
    var t = _e.s(e).get(0),
      r = !1;
    for (let i = 0; Hr.settings.length > i; i++) {
      let e = Hr.settings[i];
      var n = e.scrollHead ? e.scrollHead.find('table').get(0) : null,
        a = e.scrollFoot ? e.scrollFoot.find('table').get(0) : null;
      (e.table !== t && n !== t && a !== t) || (r = !0);
    }
    return r;
  }),
  (Fn.tables = function (e) {
    var t = !1;
    e && 'boolean' != typeof e && ((t = e.api || !1), (e = e.visible || !1));
    var r = Hr.settings
      .filter(function (t) {
        return !!(!e || (e && _e.s(t.table).isVisible()));
      })
      .map(function (e) {
        return e.table;
      });
    return t ? new Ur(r) : r;
  }),
  (Fn.util = ce),
  (Fn.Api = Ur),
  (Fn.datetime = function (e, t) {
    var r = 'datetime-' + e;
    (t || (t = 'en'),
      Kt.order[r] ||
        rr(r, {
          detect: function (n) {
            var a = dr(n, e, t);
            return !('' !== n && !a) && r;
          },
          order: {
            pre: function (r) {
              return dr(r, e, t) || 0;
            }
          }
        }),
      Kt.className[r] || (Kt.className[r] = 'dt-right'));
  }),
  (Fn.__browser = mr),
  (Fn.Dom = _e),
  (Fn.ajax = ce.ajax),
  (Fn.key = function (e) {
    var t;
    ((hn = !0),
      ((t = e),
      new Promise(function (e) {
        try {
          var r = t.split(':');
          if (2 !== r.length) return ((vn.valid = !1), e());
          var n = r[0],
            a = r[1],
            i = n.match(/(plus|trial|editor)_(\d+)_(\d{4})(\d{2})(\d{2})/);
          if (!i || 6 !== i.length) return ((vn.valid = !1), e());
          ((vn.type = i[1]),
            (vn.developers = parseInt(i[2])),
            (vn.expires = new Date(i[3] + '-' + i[4] + '-' + i[5])));
          var o = _n(),
            l = yn(
              'BE1A9w9D9U/4s4/TogY+1sW/dLJ8IquzK1PmV70J93ZTIvXMZ0eV2NAb52ntpgwVFySSB2fOI7geLNO737rQAyo='
            ),
            s = yn(a),
            c = new TextEncoder().encode(n);
          if (!o) return ((vn.valid = !1), void e());
          o.importKey('raw', l, { name: 'ECDSA', namedCurve: 'P-256' }, !1, ['verify'])
            .then(function (e) {
              return o.verify({ name: 'ECDSA', hash: { name: 'SHA-256' } }, e, s, c);
            })
            .then(function (t) {
              ((vn.valid = t), e());
            })
            .catch(function () {
              ((vn.valid = !1), e());
            });
        } catch (u) {
          ((vn.valid = !1), e());
        }
      }))
        .then(e => {
          ((hn = !1), bn(gn, mn));
        })
        .catch(() => {
          ((hn = !1), bn(gn, mn));
        }));
  }),
  (function (e) {
    Object.defineProperty(e, 'plus', {
      value: function (e, t = '') {
        let r = P('win').location.hostname;
        return (
          !('192.168.234.234' !== r && !r.endsWith('.datatables.net') && 'datatables.net' !== r) ||
          (hn ? ((gn = e), (mn = t), !0) : bn(e, t))
        );
      },
      configurable: !1,
      enumerable: !1,
      writable: !1
    });
  })(Fn),
  (Fn.settings = Hr.settings),
  (Fn.models = Ln),
  (Fn.defaults = Mn),
  (Fn.feature = { register: Ie }),
  ce.external(Fn),
  'undefined' != typeof window && window.jQuery && ce.external(window.jQuery));
export { t };
