const lp_pure = (() => {
  const _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;

  return function (moduleArg = {}) {
    let a = moduleArg,
      n,
      t;
    a.ready = new Promise((b, g) => {
      n = b;
      t = g;
    });
    let v = Object.assign({}, a),
      w = '';
    'undefined' != typeof document &&
      document.currentScript &&
      (w = document.currentScript.src);
    _scriptDir && (w = _scriptDir);
    0 !== w.indexOf('blob:')
      ? (w = w.substr(0, w.replace(/[?#].*/, '').lastIndexOf('/') + 1))
      : (w = '');
    const x = a.printErr || console.error.bind(console);
    Object.assign(a, v);
    v = null;
    let y;
    a.wasmBinary && (y = a.wasmBinary);
    const noExitRuntime = a.noExitRuntime || !0;
    'object' != typeof WebAssembly && z('no native wasm support detected');
    let B,
      C = !1,
      D,
      E,
      F = [],
      G = [],
      H = [];
    function I() {
      const b = a.preRun.shift();
      F.unshift(b);
    }
    let J = 0,
      K = null,
      L = null;
    function z(b) {
      if (a.onAbort) a.onAbort(b);
      b = 'Aborted(' + b + ')';
      x(b);
      C = !0;
      b = new WebAssembly.RuntimeError(
        b + '. Build with -sASSERTIONS for more info.'
      );
      t(b);
      throw b;
    }
    function M(b) {
      return b.startsWith('value:application/octet-stream;base64,');
    }
    let N;
    N =
      'value:application/octet-stream;base64,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';
    if (!M(N)) {
      const O = N;
      N = a.locateFile ? a.locateFile(O, w) : w + O;
    }
    function P(b) {
      try {
        if (b == N && y) return new Uint8Array(y);
        if (M(b))
          try {
            const g = atob(b.slice(37)),
              e = new Uint8Array(g.length);
            for (b = 0; b < g.length; ++b) e[b] = g.charCodeAt(b);
            var c = e;
          } catch (p) {
            throw Error('Converting base64 string to bytes failed.');
          }
        else c = void 0;
        const q = c;
        if (q) return q;
        throw 'both async and sync fetching of the wasm failed';
      } catch (p) {
        z(p);
      }
    }
    function aa(b) {
      return y || 'function' != typeof fetch
        ? Promise.resolve().then(() => P(b))
        : fetch(b, { credentials: 'same-origin' })
            .then((g) => {
              if (!g.ok) throw "failed to load wasm binary file at '" + b + "'";
              return g.arrayBuffer();
            })
            .catch(() => P(b));
    }
    function Q(b, g, e) {
      return aa(b)
        .then((c) => WebAssembly.instantiate(c, g))
        .then((c) => c)
        .then(e, (c) => {
          x('failed to asynchronously prepare wasm: ' + c);
          z(c);
        });
    }
    function ba(b, g) {
      const e = N;
      return y ||
        'function' != typeof WebAssembly.instantiateStreaming ||
        M(e) ||
        'function' != typeof fetch
        ? Q(e, b, g)
        : fetch(e, { credentials: 'same-origin' }).then((c) =>
            WebAssembly.instantiateStreaming(c, b).then(g, function (q) {
              x('wasm streaming compile failed: ' + q);
              x('falling back to ArrayBuffer instantiation');
              return Q(e, b, g);
            })
          );
    }
    const R = (b) => {
        for (; 0 < b.length; ) b.shift()(a);
      },
      S = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function T(b, g, e, c) {
      const q = {
        string: (d) => {
          let l = 0;
          if (null !== d && void 0 !== d && 0 !== d) {
            for (var f = (l = 0); f < d.length; ++f) {
              var k = d.charCodeAt(f);
              127 >= k
                ? l++
                : 2047 >= k
                ? (l += 2)
                : 55296 <= k && 57343 >= k
                ? ((l += 4), ++f)
                : (l += 3);
            }
            let h = l + 1;
            f = l = U(h);
            k = E;
            if (0 < h) {
              h = f + h - 1;
              for (let r = 0; r < d.length; ++r) {
                let m = d.charCodeAt(r);
                if (55296 <= m && 57343 >= m) {
                  const ca = d.charCodeAt(++r);
                  m = (65536 + ((m & 1023) << 10)) | (ca & 1023);
                }
                if (127 >= m) {
                  if (f >= h) break;
                  k[f++] = m;
                } else {
                  if (2047 >= m) {
                    if (f + 1 >= h) break;
                    k[f++] = 192 | (m >> 6);
                  } else {
                    if (65535 >= m) {
                      if (f + 2 >= h) break;
                      k[f++] = 224 | (m >> 12);
                    } else {
                      if (f + 3 >= h) break;
                      k[f++] = 240 | (m >> 18);
                      k[f++] = 128 | ((m >> 12) & 63);
                    }
                    k[f++] = 128 | ((m >> 6) & 63);
                  }
                  k[f++] = 128 | (m & 63);
                }
              }
              k[f] = 0;
            }
          }
          return l;
        },
        array: (d) => {
          const l = U(d.length);
          D.set(d, l);
          return l;
        },
      };
      b = a['_' + b];
      let p = [],
        A = 0;
      if (c)
        for (let u = 0; u < c.length; u++) {
          const V = q[e[u]];
          V ? (0 === A && (A = W()), (p[u] = V(c[u]))) : (p[u] = c[u]);
        }
      e = b.apply(null, p);
      return (e = (function (d) {
        0 !== A && X(A);
        if ('string' === g)
          if (d) {
            for (var l = E, f = d + NaN, k = d; l[k] && !(k >= f); ) ++k;
            if (16 < k - d && l.buffer && S) d = S.decode(l.subarray(d, k));
            else {
              for (f = ''; d < k; ) {
                let h = l[d++];
                if (h & 128) {
                  const r = l[d++] & 63;
                  if (192 == (h & 224))
                    f += String.fromCharCode(((h & 31) << 6) | r);
                  else {
                    const m = l[d++] & 63;
                    h =
                      224 == (h & 240)
                        ? ((h & 15) << 12) | (r << 6) | m
                        : ((h & 7) << 18) |
                          (r << 12) |
                          (m << 6) |
                          (l[d++] & 63);
                    65536 > h
                      ? (f += String.fromCharCode(h))
                      : ((h -= 65536),
                        (f += String.fromCharCode(
                          55296 | (h >> 10),
                          56320 | (h & 1023)
                        )));
                  }
                } else f += String.fromCharCode(h);
              }
              d = f;
            }
          } else d = '';
        else d = 'boolean' === g ? !!d : d;
        return d;
      })(e));
    }
    const da = {};
    (function () {
      function b(e) {
        e = e.exports;
        a.asm = e;
        B = a.asm.a;
        let c = B.buffer;
        a.HEAP8 = D = new Int8Array(c);
        a.HEAP16 = new Int16Array(c);
        a.HEAP32 = new Int32Array(c);
        a.HEAPU8 = E = new Uint8Array(c);
        a.HEAPU16 = new Uint16Array(c);
        a.HEAPU32 = new Uint32Array(c);
        a.HEAPF32 = new Float32Array(c);
        a.HEAPF64 = new Float64Array(c);
        G.unshift(a.asm.b);
        J--;
        a.monitorRunDependencies && a.monitorRunDependencies(J);
        0 == J &&
          (null !== K && (clearInterval(K), (K = null)),
          L && ((c = L), (L = null), c()));
        return e;
      }
      const g = { a: da };
      J++;
      a.monitorRunDependencies && a.monitorRunDependencies(J);
      if (a.instantiateWasm)
        try {
          return a.instantiateWasm(g, b);
        } catch (e) {
          x('Module.instantiateWasm callback failed with error: ' + e), t(e);
        }
      ba(g, function (e) {
        b(e.instance);
      }).catch(t);
      return {};
    })();
    a._lp_cos = function () {
      return (a._lp_cos = a.asm.c).apply(null, arguments);
    };
    function W() {
      return (W = a.asm.d).apply(null, arguments);
    }
    function X() {
      return (X = a.asm.e).apply(null, arguments);
    }
    function U() {
      return (U = a.asm.f).apply(null, arguments);
    }
    a.ccall = T;
    a.cwrap = function (b, g, e, c) {
      const q = !e || e.every((p) => 'number' === p || 'boolean' === p);
      return 'string' !== g && q && !c
        ? a['_' + b]
        : function () {
            return T(b, g, e, arguments, c);
          };
    };
    let Y;
    L = function ea() {
      Y || Z();
      Y || (L = ea);
    };
    function Z() {
      function b() {
        if (!Y && ((Y = !0), (a.calledRun = !0), !C)) {
          R(G);
          n(a);
          if (a.onRuntimeInitialized) a.onRuntimeInitialized();
          if (a.postRun)
            for (
              'function' == typeof a.postRun && (a.postRun = [a.postRun]);
              a.postRun.length;

            ) {
              const g = a.postRun.shift();
              H.unshift(g);
            }
          R(H);
        }
      }
      if (!(0 < J)) {
        if (a.preRun)
          for (
            'function' == typeof a.preRun && (a.preRun = [a.preRun]);
            a.preRun.length;

          )
            I();
        R(F);
        0 < J ||
          (a.setStatus
            ? (a.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  a.setStatus('');
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    if (a.preInit)
      for (
        'function' == typeof a.preInit && (a.preInit = [a.preInit]);
        0 < a.preInit.length;

      )
        a.preInit.pop()();
    Z();

    return moduleArg.ready;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = lp_pure;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return lp_pure;
  });
else if (typeof exports === 'object') exports['lp_pure'] = lp_pure;
