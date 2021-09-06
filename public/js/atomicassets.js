// var atomicassets = function(t) {
//     var e = {};

//     function r(n) {
//         if (e[n]) return e[n].exports;
//         var i = e[n] = {
//             i: n,
//             l: !1,
//             exports: {}
//         };
//         return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
//     }
//     return r.m = t, r.c = e, r.d = function(t, e, n) {
//         r.o(t, e) || Object.defineProperty(t, e, {
//             enumerable: !0,
//             get: n
//         })
//     }, r.r = function(t) {
//         "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
//             value: "Module"
//         }), Object.defineProperty(t, "__esModule", {
//             value: !0
//         })
//     }, r.t = function(t, e) {
//         if (1 & e && (t = r(t)), 8 & e) return t;
//         if (4 & e && "object" == typeof t && t && t.__esModule) return t;
//         var n = Object.create(null);
//         if (r.r(n), Object.defineProperty(n, "default", {
//                 enumerable: !0,
//                 value: t
//             }), 2 & e && "string" != typeof t)
//             for (var i in t) r.d(n, i, function(e) {
//                 return t[e]
//             }.bind(null, i));
//         return n
//     }, r.n = function(t) {
//         var e = t && t.__esModule ? function() {
//             return t.default
//         } : function() {
//             return t
//         };
//         return r.d(e, "a", e), e
//     }, r.o = function(t, e) {
//         return Object.prototype.hasOwnProperty.call(t, e)
//     }, r.p = "", r(r.s = 12)
// }([function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.byte_vector_to_int = e.int_to_byte_vector = e.concat_byte_arrays = e.hex_encode = e.hex_decode = e.base58_encode = e.base58_decode = e.zigzag_decode = e.zigzag_encode = e.integer_unsign = e.integer_sign = e.varint_decode = e.varint_encode = void 0;
//     const i = n(r(6)),
//         a = n(r(3)),
//         o = n(r(1)),
//         s = n(r(24));
//     e.varint_encode = function(t) {
//         const e = [];
//         let r = i.default(t);
//         if (r.lesser(0)) throw new o.default("cant pack negative integer");
//         for (;;) {
//             const t = r.and(127);
//             if (r = r.shiftRight(7), r.equals(0)) {
//                 e.push(t.toJSNumber());
//                 break
//             }
//             e.push(t.toJSNumber() + 128)
//         }
//         return new Uint8Array(e)
//     }, e.varint_decode = function(t) {
//         let e = i.default(0);
//         for (let r = 0;; r++) {
//             if (t.position >= t.data.length) throw new a.default("failed to unpack integer");
//             const n = i.default(t.data[t.position]);
//             if (t.position += 1, n.lesser(128)) {
//                 e = e.plus(n.shiftLeft(7 * r));
//                 break
//             }
//             e = e.plus(n.and(127).shiftLeft(7 * r))
//         }
//         return e
//     }, e.integer_sign = function(t, e) {
//         const r = i.default(t);
//         if (r.greaterOrEquals(i.default(2).pow(8 * e - 1))) throw new Error("cannot sign integer: too big");
//         return r.greaterOrEquals(0) ? r : r.negate().xor(i.default(2).pow(8 * e).minus(1)).plus(1)
//     }, e.integer_unsign = function(t, e) {
//         const r = i.default(t);
//         if (r.greater(i.default(2).pow(8 * e))) throw new Error("cannot unsign integer: too big");
//         return r.greater(i.default(2).pow(8 * e - 1)) ? r.minus(1).xor(i.default(2).pow(8 * e).minus(1)).negate() : r
//     }, e.zigzag_encode = function(t) {
//         const e = i.default(t);
//         return e.lesser(0) ? e.plus(1).multiply(-2).plus(1) : e.multiply(2)
//     }, e.zigzag_decode = function(t) {
//         const e = i.default(t);
//         return e.mod(2).equals(0) ? e.divmod(2).quotient : e.divmod(2).quotient.multiply(-1).minus(1)
//     };
//     const u = new s.default("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
//     e.base58_decode = function(t) {
//         return u.decode(t)
//     }, e.base58_encode = function(t) {
//         return u.encode(t)
//     }, e.hex_decode = function(t) {
//         const e = t.match(/.{1,2}/g);
//         return e ? new Uint8Array(e.map(t => parseInt(t, 16))) : new Uint8Array(0)
//     }, e.hex_encode = function(t) {
//         return t.reduce((t, e) => t + e.toString(16).padStart(2, "0"), "")
//     }, e.concat_byte_arrays = function(t) {
//         const e = new Uint8Array(t.reduce((t, e) => t + e.length, 0));
//         let r = 0;
//         for (const n of t) e.set(n, r), r += n.length;
//         return e
//     }, e.int_to_byte_vector = function(t) {
//         const e = [];
//         let r = i.default(t);
//         for (; r.notEquals(0);) e.push(r.and(255).toJSNumber()), r = r.shiftRight(8);
//         return new Uint8Array(e)
//     }, e.byte_vector_to_int = function(t) {
//         let e = i.default(0);
//         for (let r = 0; r < t.length; r++) e = e.plus(i.default(t[r]).shiftLeft(8 * r));
//         return e.toJSNumber()
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     class n extends Error {}
//     e.default = n
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.deserialize = e.serialize = void 0;
//     const i = n(r(16)),
//         a = r(0),
//         o = n(r(25));
//     e.serialize = function(t, e) {
//         const r = e.serialize(t);
//         return e instanceof i.default ? r.slice(0, r.length - 1) : r
//     }, e.deserialize = function(t, e) {
//         e instanceof i.default && (t = a.concat_byte_arrays([t, a.varint_encode(0)]));
//         const r = new o.default(t, 0);
//         return e.deserialize(r)
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     class n extends Error {}
//     e.default = n
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.toAttributeMap = e.ActionGenerator = void 0;
//     const i = n(r(1));
//     e.ActionGenerator = class {
//         constructor(t) {
//             this.contract = t
//         }
//         async acceptoffer(t, e) {
//             return this._pack(t, "acceptoffer", {
//                 offer_id: e
//             })
//         }
//         async addcolauth(t, e, r) {
//             return this._pack(t, "addcolauth", {
//                 collection_name: e,
//                 account_to_add: r
//             })
//         }
//         async addconftoken(t, e, r) {
//             return this._pack(t, "addconftoken", {
//                 token_contract: e,
//                 token_symbol: r
//             })
//         }
//         async addnotifyacc(t, e, r) {
//             return this._pack(t, "addnotifyacc", {
//                 collection_name: e,
//                 account_to_add: r
//             })
//         }
//         async announcedepo(t, e, r) {
//             return this._pack(t, "announcedepo", {
//                 owner: e,
//                 symbol_to_announce: r
//             })
//         }
//         async backasset(t, e, r, n, i) {
//             return this._pack(t, "backasset", {
//                 payer: e,
//                 asset_owner: r,
//                 asset_id: n,
//                 token_to_back: i
//             })
//         }
//         async burnasset(t, e, r) {
//             return this._pack(t, "burnasset", {
//                 asset_owner: e,
//                 asset_id: r
//             })
//         }
//         async canceloffer(t, e) {
//             return this._pack(t, "canceloffer", {
//                 offer_id: e
//             })
//         }
//         async createcol(t, e, r, n, i, a, o, s) {
//             return this._pack(t, "createcol", {
//                 author: e,
//                 collection_name: r,
//                 allow_notify: n,
//                 authorized_accounts: i,
//                 notify_accounts: a,
//                 market_fee: o,
//                 data: s
//             })
//         }
//         async createoffer(t, e, r, n, i, a) {
//             return this._pack(t, "createoffer", {
//                 sender: e,
//                 recipient: r,
//                 sender_asset_ids: n,
//                 recipient_asset_ids: i,
//                 memo: a
//             })
//         }
//         async createtempl(t, e, r, n, i, a, o, s) {
//             return this._pack(t, "createtempl", {
//                 authorized_creator: e,
//                 collection_name: r,
//                 schema_name: n,
//                 transferable: i,
//                 burnable: a,
//                 max_supply: o,
//                 immutable_data: s
//             })
//         }
//         async createschema(t, e, r, n, i) {
//             return this._pack(t, "createschema", {
//                 authorized_creator: e,
//                 collection_name: r,
//                 schema_name: n,
//                 schema_format: i
//             })
//         }
//         async declineoffer(t, e) {
//             return this._pack(t, "declineoffer", {
//                 offer_id: e
//             })
//         }
//         async extendschema(t, e, r, n, i) {
//             return this._pack(t, "extendschema", {
//                 authorized_editor: e,
//                 collection_name: r,
//                 schema_name: n,
//                 schema_format_extension: i
//             })
//         }
//         async forbidnotify(t, e) {
//             return this._pack(t, "forbidnotify", {
//                 collection_name: e
//             })
//         }
//         async locktemplate(t, e, r, n) {
//             return this._pack(t, "locktemplate", {
//                 authorized_editor: e,
//                 collection_name: r,
//                 template_id: n
//             })
//         }
//         async mintasset(t, e, r, n, i, a, o, s, u) {
//             return this._pack(t, "mintasset", {
//                 authorized_minter: e,
//                 collection_name: r,
//                 schema_name: n,
//                 template_id: i,
//                 new_asset_owner: a,
//                 immutable_data: o,
//                 mutable_data: s,
//                 tokens_to_back: u
//             })
//         }
//         async payofferram(t, e, r) {
//             return this._pack(t, "payofferram", {
//                 payer: e,
//                 offer_id: r
//             })
//         }
//         async remcolauth(t, e, r) {
//             return this._pack(t, "remcolauth", {
//                 collection_name: e,
//                 account_to_remove: r
//             })
//         }
//         async remnotifyacc(t, e, r) {
//             return this._pack(t, "remnotifyacc", {
//                 collection_name: e,
//                 account_to_remove: r
//             })
//         }
//         async setassetdata(t, e, r, n, i) {
//             return this._pack(t, "setassetdata", {
//                 authorized_editor: e,
//                 asset_owner: r,
//                 asset_id: n,
//                 new_mutable_data: i
//             })
//         }
//         async setcoldata(t, e, r) {
//             return this._pack(t, "setcoldata", {
//                 collection_name: e,
//                 data: r
//             })
//         }
//         async setmarketfee(t, e, r) {
//             return this._pack(t, "setmarketfee", {
//                 collection_name: e,
//                 market_fee: r
//             })
//         }
//         async transfer(t, e, r, n, i) {
//             return this._pack(t, "transfer", {
//                 from: e,
//                 to: r,
//                 asset_ids: n,
//                 memo: i
//             })
//         }
//         async withdraw(t, e, r) {
//             return this._pack(t, "withdraw", {
//                 owner: e,
//                 token_to_withdraw: r
//             })
//         }
//         _pack(t, e, r) {
//             return [{
//                 account: this.contract,
//                 name: e,
//                 authorization: t,
//                 data: r
//             }]
//         }
//     }, e.toAttributeMap = function(t, e) {
//         const r = {},
//             n = [];
//         for (const t of e) r[t.name] = t.type;
//         const a = Object.keys(t);
//         for (const e of a) {
//             if (void 0 !== r[e]) throw new i.default("field not defined in schema");
//             n.push({
//                 key: e,
//                 value: [r[e], t[e]]
//             })
//         }
//         return n
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     class n extends Error {}
//     e.default = n
// }, function(t, e, r) {
//     (function(t) {
//         var n, i = function(t) {
            
//             var e = 9007199254740992,
//                 r = l(e),
//                 n = "function" == typeof BigInt;

//             function a(t, e, r, n) {
//                 return void 0 === t ? a[0] : void 0 !== e && (10 != +e || r) ? F(t, e, r, n) : Z(t)
//             }

//             function o(t, e) {
//                 this.value = t, this.sign = e, this.isSmall = !1
//             }

//             function s(t) {
//                 this.value = t, this.sign = t < 0, this.isSmall = !0
//             }

//             function u(t) {
//                 this.value = t
//             }

//             function c(t) {
//                 return -e < t && t < e
//             }

//             function l(t) {
//                 return t < 1e7 ? [t] : t < 1e14 ? [t % 1e7, Math.floor(t / 1e7)] : [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)]
//             }

//             function f(t) {
//                 p(t);
//                 var e = t.length;
//                 if (e < 4 && x(t, r) < 0) switch (e) {
//                     case 0:
//                         return 0;
//                     case 1:
//                         return t[0];
//                     case 2:
//                         return t[0] + 1e7 * t[1];
//                     default:
//                         return t[0] + 1e7 * (t[1] + 1e7 * t[2])
//                 }
//                 return t
//             }

//             function p(t) {
//                 for (var e = t.length; 0 === t[--e];);
//                 t.length = e + 1
//             }

//             function h(t) {
//                 for (var e = new Array(t), r = -1; ++r < t;) e[r] = 0;
//                 return e
//             }

//             function d(t) {
//                 return t > 0 ? Math.floor(t) : Math.ceil(t)
//             }

//             function y(t, e) {
//                 var r, n, i = t.length,
//                     a = e.length,
//                     o = new Array(i),
//                     s = 0;
//                 for (n = 0; n < a; n++) s = (r = t[n] + e[n] + s) >= 1e7 ? 1 : 0, o[n] = r - 1e7 * s;
//                 for (; n < i;) s = 1e7 === (r = t[n] + s) ? 1 : 0, o[n++] = r - 1e7 * s;
//                 return s > 0 && o.push(s), o
//             }

//             function m(t, e) {
//                 return t.length >= e.length ? y(t, e) : y(e, t)
//             }

//             function v(t, e) {
//                 var r, n, i = t.length,
//                     a = new Array(i);
//                 for (n = 0; n < i; n++) r = t[n] - 1e7 + e, e = Math.floor(r / 1e7), a[n] = r - 1e7 * e, e += 1;
//                 for (; e > 0;) a[n++] = e % 1e7, e = Math.floor(e / 1e7);
//                 return a
//             }

//             function w(t, e) {
//                 var r, n, i = t.length,
//                     a = e.length,
//                     o = new Array(i),
//                     s = 0;
//                 for (r = 0; r < a; r++)(n = t[r] - s - e[r]) < 0 ? (n += 1e7, s = 1) : s = 0, o[r] = n;
//                 for (r = a; r < i; r++) {
//                     if (!((n = t[r] - s) < 0)) {
//                         o[r++] = n;
//                         break
//                     }
//                     n += 1e7, o[r] = n
//                 }
//                 for (; r < i; r++) o[r] = t[r];
//                 return p(o), o
//             }

//             function _(t, e, r) {
//                 var n, i, a = t.length,
//                     u = new Array(a),
//                     c = -e;
//                 for (n = 0; n < a; n++) i = t[n] + c, c = Math.floor(i / 1e7), i %= 1e7, u[n] = i < 0 ? i + 1e7 : i;
//                 return "number" == typeof(u = f(u)) ? (r && (u = -u), new s(u)) : new o(u, r)
//             }

//             function g(t, e) {
//                 var r, n, i, a, o = t.length,
//                     s = e.length,
//                     u = h(o + s);
//                 for (i = 0; i < o; ++i) {
//                     a = t[i];
//                     for (var c = 0; c < s; ++c) r = a * e[c] + u[i + c], n = Math.floor(r / 1e7), u[i + c] = r - 1e7 * n, u[i + c + 1] += n
//                 }
//                 return p(u), u
//             }

//             function b(t, e) {
//                 var r, n, i = t.length,
//                     a = new Array(i),
//                     o = 0;
//                 for (n = 0; n < i; n++) r = t[n] * e + o, o = Math.floor(r / 1e7), a[n] = r - 1e7 * o;
//                 for (; o > 0;) a[n++] = o % 1e7, o = Math.floor(o / 1e7);
//                 return a
//             }

//             function A(t, e) {
//                 for (var r = []; e-- > 0;) r.push(0);
//                 return r.concat(t)
//             }

//             function E(t, e, r) {
//                 return new o(t < 1e7 ? b(e, t) : g(e, l(t)), r)
//             }

//             function O(t) {
//                 var e, r, n, i, a = t.length,
//                     o = h(a + a);
//                 for (n = 0; n < a; n++) {
//                     r = 0 - (i = t[n]) * i;
//                     for (var s = n; s < a; s++) e = i * t[s] * 2 + o[n + s] + r, r = Math.floor(e / 1e7), o[n + s] = e - 1e7 * r;
//                     o[n + a] = r
//                 }
//                 return p(o), o
//             }

//             function M(t, e) {
//                 var r, n, i, a, o = t.length,
//                     s = h(o);
//                 for (i = 0, r = o - 1; r >= 0; --r) i = (a = 1e7 * i + t[r]) - (n = d(a / e)) * e, s[r] = 0 | n;
//                 return [s, 0 | i]
//             }

//             function S(t, e) {
//                 var r, i = Z(e);
//                 if (n) return [new u(t.value / i.value), new u(t.value % i.value)];
//                 var c, y = t.value,
//                     m = i.value;
//                 if (0 === m) throw new Error("Cannot divide by zero");
//                 if (t.isSmall) return i.isSmall ? [new s(d(y / m)), new s(y % m)] : [a[0], t];
//                 if (i.isSmall) {
//                     if (1 === m) return [t, a[0]];
//                     if (-1 == m) return [t.negate(), a[0]];
//                     var v = Math.abs(m);
//                     if (v < 1e7) {
//                         c = f((r = M(y, v))[0]);
//                         var _ = r[1];
//                         return t.sign && (_ = -_), "number" == typeof c ? (t.sign !== i.sign && (c = -c), [new s(c), new s(_)]) : [new o(c, t.sign !== i.sign), new s(_)]
//                     }
//                     m = l(v)
//                 }
//                 var g = x(y, m);
//                 if (-1 === g) return [a[0], t];
//                 if (0 === g) return [a[t.sign === i.sign ? 1 : -1], a[0]];
//                 c = (r = y.length + m.length <= 200 ? function(t, e) {
//                     var r, n, i, a, o, s, u, c = t.length,
//                         l = e.length,
//                         p = h(e.length),
//                         d = e[l - 1],
//                         y = Math.ceil(1e7 / (2 * d)),
//                         m = b(t, y),
//                         v = b(e, y);
//                     for (m.length <= c && m.push(0), v.push(0), d = v[l - 1], n = c - l; n >= 0; n--) {
//                         for (r = 1e7 - 1, m[n + l] !== d && (r = Math.floor((1e7 * m[n + l] + m[n + l - 1]) / d)), i = 0, a = 0, s = v.length, o = 0; o < s; o++) i += r * v[o], u = Math.floor(i / 1e7), a += m[n + o] - (i - 1e7 * u), i = u, a < 0 ? (m[n + o] = a + 1e7, a = -1) : (m[n + o] = a, a = 0);
//                         for (; 0 !== a;) {
//                             for (r -= 1, i = 0, o = 0; o < s; o++)(i += m[n + o] - 1e7 + v[o]) < 0 ? (m[n + o] = i + 1e7, i = 0) : (m[n + o] = i, i = 1);
//                             a += i
//                         }
//                         p[n] = r
//                     }
//                     return m = M(m, y)[0], [f(p), f(m)]
//                 }(y, m) : function(t, e) {
//                     for (var r, n, i, a, o, s = t.length, u = e.length, c = [], l = []; s;)
//                         if (l.unshift(t[--s]), p(l), x(l, e) < 0) c.push(0);
//                         else {
//                             i = 1e7 * l[(n = l.length) - 1] + l[n - 2], a = 1e7 * e[u - 1] + e[u - 2], n > u && (i = 1e7 * (i + 1)), r = Math.ceil(i / a);
//                             do {
//                                 if (x(o = b(e, r), l) <= 0) break;
//                                 r--
//                             } while (r);
//                             c.push(r), l = w(l, o)
//                         } return c.reverse(), [f(c), f(l)]
//                 }(y, m))[0];
//                 var A = t.sign !== i.sign,
//                     E = r[1],
//                     O = t.sign;
//                 return "number" == typeof c ? (A && (c = -c), c = new s(c)) : c = new o(c, A), "number" == typeof E ? (O && (E = -E), E = new s(E)) : E = new o(E, O), [c, E]
//             }

//             function x(t, e) {
//                 if (t.length !== e.length) return t.length > e.length ? 1 : -1;
//                 for (var r = t.length - 1; r >= 0; r--)
//                     if (t[r] !== e[r]) return t[r] > e[r] ? 1 : -1;
//                 return 0
//             }

//             function P(t) {
//                 var e = t.abs();
//                 return !e.isUnit() && (!!(e.equals(2) || e.equals(3) || e.equals(5)) || !(e.isEven() || e.isDivisibleBy(3) || e.isDivisibleBy(5)) && (!!e.lesser(49) || void 0))
//             }

//             function z(t, e) {
//                 for (var r, n, a, o = t.prev(), s = o, u = 0; s.isEven();) s = s.divide(2), u++;
//                 t: for (n = 0; n < e.length; n++)
//                     if (!t.lesser(e[n]) && !(a = i(e[n]).modPow(s, t)).isUnit() && !a.equals(o)) {
//                         for (r = u - 1; 0 != r; r--) {
//                             if ((a = a.square().mod(t)).isUnit()) return !1;
//                             if (a.equals(o)) continue t
//                         }
//                         return !1
//                     }
//                 return !0
//             }
//             o.prototype = Object.create(a.prototype), s.prototype = Object.create(a.prototype), u.prototype = Object.create(a.prototype), o.prototype.add = function(t) {
//                 var e = Z(t);
//                 if (this.sign !== e.sign) return this.subtract(e.negate());
//                 var r = this.value,
//                     n = e.value;
//                 return e.isSmall ? new o(v(r, Math.abs(n)), this.sign) : new o(m(r, n), this.sign)
//             }, o.prototype.plus = o.prototype.add, s.prototype.add = function(t) {
//                 var e = Z(t),
//                     r = this.value;
//                 if (r < 0 !== e.sign) return this.subtract(e.negate());
//                 var n = e.value;
//                 if (e.isSmall) {
//                     if (c(r + n)) return new s(r + n);
//                     n = l(Math.abs(n))
//                 }
//                 return new o(v(n, Math.abs(r)), r < 0)
//             }, s.prototype.plus = s.prototype.add, u.prototype.add = function(t) {
//                 return new u(this.value + Z(t).value)
//             }, u.prototype.plus = u.prototype.add, o.prototype.subtract = function(t) {
//                 var e = Z(t);
//                 if (this.sign !== e.sign) return this.add(e.negate());
//                 var r = this.value,
//                     n = e.value;
//                 return e.isSmall ? _(r, Math.abs(n), this.sign) : function(t, e, r) {
//                     var n;
//                     return x(t, e) >= 0 ? n = w(t, e) : (n = w(e, t), r = !r), "number" == typeof(n = f(n)) ? (r && (n = -n), new s(n)) : new o(n, r)
//                 }(r, n, this.sign)
//             }, o.prototype.minus = o.prototype.subtract, s.prototype.subtract = function(t) {
//                 var e = Z(t),
//                     r = this.value;
//                 if (r < 0 !== e.sign) return this.add(e.negate());
//                 var n = e.value;
//                 return e.isSmall ? new s(r - n) : _(n, Math.abs(r), r >= 0)
//             }, s.prototype.minus = s.prototype.subtract, u.prototype.subtract = function(t) {
//                 return new u(this.value - Z(t).value)
//             }, u.prototype.minus = u.prototype.subtract, o.prototype.negate = function() {
//                 return new o(this.value, !this.sign)
//             }, s.prototype.negate = function() {
//                 var t = this.sign,
//                     e = new s(-this.value);
//                 return e.sign = !t, e
//             }, u.prototype.negate = function() {
//                 return new u(-this.value)
//             }, o.prototype.abs = function() {
//                 return new o(this.value, !1)
//             }, s.prototype.abs = function() {
//                 return new s(Math.abs(this.value))
//             }, u.prototype.abs = function() {
//                 return new u(this.value >= 0 ? this.value : -this.value)
//             }, o.prototype.multiply = function(t) {
//                 var e, r, n, i = Z(t),
//                     s = this.value,
//                     u = i.value,
//                     c = this.sign !== i.sign;
//                 if (i.isSmall) {
//                     if (0 === u) return a[0];
//                     if (1 === u) return this;
//                     if (-1 === u) return this.negate();
//                     if ((e = Math.abs(u)) < 1e7) return new o(b(s, e), c);
//                     u = l(e)
//                 }
//                 return r = s.length, n = u.length, new o(-.012 * r - .012 * n + 15e-6 * r * n > 0 ? function t(e, r) {
//                     var n = Math.max(e.length, r.length);
//                     if (n <= 30) return g(e, r);
//                     n = Math.ceil(n / 2);
//                     var i = e.slice(n),
//                         a = e.slice(0, n),
//                         o = r.slice(n),
//                         s = r.slice(0, n),
//                         u = t(a, s),
//                         c = t(i, o),
//                         l = t(m(a, i), m(s, o)),
//                         f = m(m(u, A(w(w(l, u), c), n)), A(c, 2 * n));
//                     return p(f), f
//                 }(s, u) : g(s, u), c)
//             }, o.prototype.times = o.prototype.multiply, s.prototype._multiplyBySmall = function(t) {
//                 return c(t.value * this.value) ? new s(t.value * this.value) : E(Math.abs(t.value), l(Math.abs(this.value)), this.sign !== t.sign)
//             }, o.prototype._multiplyBySmall = function(t) {
//                 return 0 === t.value ? a[0] : 1 === t.value ? this : -1 === t.value ? this.negate() : E(Math.abs(t.value), this.value, this.sign !== t.sign)
//             }, s.prototype.multiply = function(t) {
//                 return Z(t)._multiplyBySmall(this)
//             }, s.prototype.times = s.prototype.multiply, u.prototype.multiply = function(t) {
//                 return new u(this.value * Z(t).value)
//             }, u.prototype.times = u.prototype.multiply, o.prototype.square = function() {
//                 return new o(O(this.value), !1)
//             }, s.prototype.square = function() {
//                 var t = this.value * this.value;
//                 return c(t) ? new s(t) : new o(O(l(Math.abs(this.value))), !1)
//             }, u.prototype.square = function(t) {
//                 return new u(this.value * this.value)
//             }, o.prototype.divmod = function(t) {
//                 var e = S(this, t);
//                 return {
//                     quotient: e[0],
//                     remainder: e[1]
//                 }
//             }, u.prototype.divmod = s.prototype.divmod = o.prototype.divmod, o.prototype.divide = function(t) {
//                 return S(this, t)[0]
//             }, u.prototype.over = u.prototype.divide = function(t) {
//                 return new u(this.value / Z(t).value)
//             }, s.prototype.over = s.prototype.divide = o.prototype.over = o.prototype.divide, o.prototype.mod = function(t) {
//                 return S(this, t)[1]
//             }, u.prototype.mod = u.prototype.remainder = function(t) {
//                 return new u(this.value % Z(t).value)
//             }, s.prototype.remainder = s.prototype.mod = o.prototype.remainder = o.prototype.mod, o.prototype.pow = function(t) {
//                 var e, r, n, i = Z(t),
//                     o = this.value,
//                     u = i.value;
//                 if (0 === u) return a[1];
//                 if (0 === o) return a[0];
//                 if (1 === o) return a[1];
//                 if (-1 === o) return i.isEven() ? a[1] : a[-1];
//                 if (i.sign) return a[0];
//                 if (!i.isSmall) throw new Error("The exponent " + i.toString() + " is too large.");
//                 if (this.isSmall && c(e = Math.pow(o, u))) return new s(d(e));
//                 for (r = this, n = a[1]; !0 & u && (n = n.times(r), --u), 0 !== u;) u /= 2, r = r.square();
//                 return n
//             }, s.prototype.pow = o.prototype.pow, u.prototype.pow = function(t) {
//                 var e = Z(t),
//                     r = this.value,
//                     n = e.value,
//                     i = BigInt(0),
//                     o = BigInt(1),
//                     s = BigInt(2);
//                 if (n === i) return a[1];
//                 if (r === i) return a[0];
//                 if (r === o) return a[1];
//                 if (r === BigInt(-1)) return e.isEven() ? a[1] : a[-1];
//                 if (e.isNegative()) return new u(i);
//                 for (var c = this, l = a[1];
//                     (n & o) === o && (l = l.times(c), --n), n !== i;) n /= s, c = c.square();
//                 return l
//             }, o.prototype.modPow = function(t, e) {
//                 if (t = Z(t), (e = Z(e)).isZero()) throw new Error("Cannot take modPow with modulus 0");
//                 var r = a[1],
//                     n = this.mod(e);
//                 for (t.isNegative() && (t = t.multiply(a[-1]), n = n.modInv(e)); t.isPositive();) {
//                     if (n.isZero()) return a[0];
//                     t.isOdd() && (r = r.multiply(n).mod(e)), t = t.divide(2), n = n.square().mod(e)
//                 }
//                 return r
//             }, u.prototype.modPow = s.prototype.modPow = o.prototype.modPow, o.prototype.compareAbs = function(t) {
//                 var e = Z(t),
//                     r = this.value,
//                     n = e.value;
//                 return e.isSmall ? 1 : x(r, n)
//             }, s.prototype.compareAbs = function(t) {
//                 var e = Z(t),
//                     r = Math.abs(this.value),
//                     n = e.value;
//                 return e.isSmall ? r === (n = Math.abs(n)) ? 0 : r > n ? 1 : -1 : -1
//             }, u.prototype.compareAbs = function(t) {
//                 var e = this.value,
//                     r = Z(t).value;
//                 return (e = e >= 0 ? e : -e) === (r = r >= 0 ? r : -r) ? 0 : e > r ? 1 : -1
//             }, o.prototype.compare = function(t) {
//                 if (t === 1 / 0) return -1;
//                 if (t === -1 / 0) return 1;
//                 var e = Z(t),
//                     r = this.value,
//                     n = e.value;
//                 return this.sign !== e.sign ? e.sign ? 1 : -1 : e.isSmall ? this.sign ? -1 : 1 : x(r, n) * (this.sign ? -1 : 1)
//             }, o.prototype.compareTo = o.prototype.compare, s.prototype.compare = function(t) {
//                 if (t === 1 / 0) return -1;
//                 if (t === -1 / 0) return 1;
//                 var e = Z(t),
//                     r = this.value,
//                     n = e.value;
//                 return e.isSmall ? r == n ? 0 : r > n ? 1 : -1 : r < 0 !== e.sign ? r < 0 ? -1 : 1 : r < 0 ? 1 : -1
//             }, s.prototype.compareTo = s.prototype.compare, u.prototype.compare = function(t) {
//                 if (t === 1 / 0) return -1;
//                 if (t === -1 / 0) return 1;
//                 var e = this.value,
//                     r = Z(t).value;
//                 return e === r ? 0 : e > r ? 1 : -1
//             }, u.prototype.compareTo = u.prototype.compare, o.prototype.equals = function(t) {
//                 return 0 === this.compare(t)
//             }, u.prototype.eq = u.prototype.equals = s.prototype.eq = s.prototype.equals = o.prototype.eq = o.prototype.equals, o.prototype.notEquals = function(t) {
//                 return 0 !== this.compare(t)
//             }, u.prototype.neq = u.prototype.notEquals = s.prototype.neq = s.prototype.notEquals = o.prototype.neq = o.prototype.notEquals, o.prototype.greater = function(t) {
//                 return this.compare(t) > 0
//             }, u.prototype.gt = u.prototype.greater = s.prototype.gt = s.prototype.greater = o.prototype.gt = o.prototype.greater, o.prototype.lesser = function(t) {
//                 return this.compare(t) < 0
//             }, u.prototype.lt = u.prototype.lesser = s.prototype.lt = s.prototype.lesser = o.prototype.lt = o.prototype.lesser, o.prototype.greaterOrEquals = function(t) {
//                 return this.compare(t) >= 0
//             }, u.prototype.geq = u.prototype.greaterOrEquals = s.prototype.geq = s.prototype.greaterOrEquals = o.prototype.geq = o.prototype.greaterOrEquals, o.prototype.lesserOrEquals = function(t) {
//                 return this.compare(t) <= 0
//             }, u.prototype.leq = u.prototype.lesserOrEquals = s.prototype.leq = s.prototype.lesserOrEquals = o.prototype.leq = o.prototype.lesserOrEquals, o.prototype.isEven = function() {
//                 return 0 == (1 & this.value[0])
//             }, s.prototype.isEven = function() {
//                 return 0 == (1 & this.value)
//             }, u.prototype.isEven = function() {
//                 return (this.value & BigInt(1)) === BigInt(0)
//             }, o.prototype.isOdd = function() {
//                 return 1 == (1 & this.value[0])
//             }, s.prototype.isOdd = function() {
//                 return 1 == (1 & this.value)
//             }, u.prototype.isOdd = function() {
//                 return (this.value & BigInt(1)) === BigInt(1)
//             }, o.prototype.isPositive = function() {
//                 return !this.sign
//             }, s.prototype.isPositive = function() {
//                 return this.value > 0
//             }, u.prototype.isPositive = s.prototype.isPositive, o.prototype.isNegative = function() {
//                 return this.sign
//             }, s.prototype.isNegative = function() {
//                 return this.value < 0
//             }, u.prototype.isNegative = s.prototype.isNegative, o.prototype.isUnit = function() {
//                 return !1
//             }, s.prototype.isUnit = function() {
//                 return 1 === Math.abs(this.value)
//             }, u.prototype.isUnit = function() {
//                 return this.abs().value === BigInt(1)
//             }, o.prototype.isZero = function() {
//                 return !1
//             }, s.prototype.isZero = function() {
//                 return 0 === this.value
//             }, u.prototype.isZero = function() {
//                 return this.value === BigInt(0)
//             }, o.prototype.isDivisibleBy = function(t) {
//                 var e = Z(t);
//                 return !e.isZero() && (!!e.isUnit() || (0 === e.compareAbs(2) ? this.isEven() : this.mod(e).isZero()))
//             }, u.prototype.isDivisibleBy = s.prototype.isDivisibleBy = o.prototype.isDivisibleBy, o.prototype.isPrime = function(t) {
//                 var e = P(this);
//                 if (void 0 !== e) return e;
//                 var r = this.abs(),
//                     n = r.bitLength();
//                 if (n <= 64) return z(r, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
//                 for (var a = Math.log(2) * n.toJSNumber(), o = Math.ceil(!0 === t ? 2 * Math.pow(a, 2) : a), s = [], u = 0; u < o; u++) s.push(i(u + 2));
//                 return z(r, s)
//             }, u.prototype.isPrime = s.prototype.isPrime = o.prototype.isPrime, o.prototype.isProbablePrime = function(t, e) {
//                 var r = P(this);
//                 if (void 0 !== r) return r;
//                 for (var n = this.abs(), a = void 0 === t ? 5 : t, o = [], s = 0; s < a; s++) o.push(i.randBetween(2, n.minus(2), e));
//                 return z(n, o)
//             }, u.prototype.isProbablePrime = s.prototype.isProbablePrime = o.prototype.isProbablePrime, o.prototype.modInv = function(t) {
//                 for (var e, r, n, a = i.zero, o = i.one, s = Z(t), u = this.abs(); !u.isZero();) e = s.divide(u), r = a, n = s, a = o, s = u, o = r.subtract(e.multiply(o)), u = n.subtract(e.multiply(u));
//                 if (!s.isUnit()) throw new Error(this.toString() + " and " + t.toString() + " are not co-prime");
//                 return -1 === a.compare(0) && (a = a.add(t)), this.isNegative() ? a.negate() : a
//             }, u.prototype.modInv = s.prototype.modInv = o.prototype.modInv, o.prototype.next = function() {
//                 var t = this.value;
//                 return this.sign ? _(t, 1, this.sign) : new o(v(t, 1), this.sign)
//             }, s.prototype.next = function() {
//                 var t = this.value;
//                 return t + 1 < e ? new s(t + 1) : new o(r, !1)
//             }, u.prototype.next = function() {
//                 return new u(this.value + BigInt(1))
//             }, o.prototype.prev = function() {
//                 var t = this.value;
//                 return this.sign ? new o(v(t, 1), !0) : _(t, 1, this.sign)
//             }, s.prototype.prev = function() {
//                 var t = this.value;
//                 return t - 1 > -e ? new s(t - 1) : new o(r, !0)
//             }, u.prototype.prev = function() {
//                 return new u(this.value - BigInt(1))
//             };
//             for (var j = [1]; 2 * j[j.length - 1] <= 1e7;) j.push(2 * j[j.length - 1]);
//             var k = j.length,
//                 q = j[k - 1];

//             function D(t) {
//                 return Math.abs(t) <= 1e7
//             }

//             function N(t, e, r) {
//                 e = Z(e);
//                 for (var n = t.isNegative(), a = e.isNegative(), o = n ? t.not() : t, s = a ? e.not() : e, u = 0, c = 0, l = null, f = null, p = []; !o.isZero() || !s.isZero();) u = (l = S(o, q))[1].toJSNumber(), n && (u = q - 1 - u), c = (f = S(s, q))[1].toJSNumber(), a && (c = q - 1 - c), o = l[0], s = f[0], p.push(r(u, c));
//                 for (var h = 0 !== r(n ? 1 : 0, a ? 1 : 0) ? i(-1) : i(0), d = p.length - 1; d >= 0; d -= 1) h = h.multiply(q).add(i(p[d]));
//                 return h
//             }
//             o.prototype.shiftLeft = function(t) {
//                 var e = Z(t).toJSNumber();
//                 if (!D(e)) throw new Error(String(e) + " is too large for shifting.");
//                 if (e < 0) return this.shiftRight(-e);
//                 var r = this;
//                 if (r.isZero()) return r;
//                 for (; e >= k;) r = r.multiply(q), e -= k - 1;
//                 return r.multiply(j[e])
//             }, u.prototype.shiftLeft = s.prototype.shiftLeft = o.prototype.shiftLeft, o.prototype.shiftRight = function(t) {
//                 var e, r = Z(t).toJSNumber();
//                 if (!D(r)) throw new Error(String(r) + " is too large for shifting.");
//                 if (r < 0) return this.shiftLeft(-r);
//                 for (var n = this; r >= k;) {
//                     if (n.isZero() || n.isNegative() && n.isUnit()) return n;
//                     n = (e = S(n, q))[1].isNegative() ? e[0].prev() : e[0], r -= k - 1
//                 }
//                 return (e = S(n, j[r]))[1].isNegative() ? e[0].prev() : e[0]
//             }, u.prototype.shiftRight = s.prototype.shiftRight = o.prototype.shiftRight, o.prototype.not = function() {
//                 return this.negate().prev()
//             }, u.prototype.not = s.prototype.not = o.prototype.not, o.prototype.and = function(t) {
//                 return N(this, t, (function(t, e) {
//                     return t & e
//                 }))
//             }, u.prototype.and = s.prototype.and = o.prototype.and, o.prototype.or = function(t) {
//                 return N(this, t, (function(t, e) {
//                     return t | e
//                 }))
//             }, u.prototype.or = s.prototype.or = o.prototype.or, o.prototype.xor = function(t) {
//                 return N(this, t, (function(t, e) {
//                     return t ^ e
//                 }))
//             }, u.prototype.xor = s.prototype.xor = o.prototype.xor;

//             function B(t) {
//                 var e = t.value,
//                     r = "number" == typeof e ? e | 1 << 30 : "bigint" == typeof e ? e | BigInt(1 << 30) : e[0] + 1e7 * e[1] | 1073758208;
//                 return r & -r
//             }

//             function T(t, e) {
//                 return t = Z(t), e = Z(e), t.greater(e) ? t : e
//             }

//             function C(t, e) {
//                 return t = Z(t), e = Z(e), t.lesser(e) ? t : e
//             }

//             function I(t, e) {
//                 if (t = Z(t).abs(), e = Z(e).abs(), t.equals(e)) return t;
//                 if (t.isZero()) return e;
//                 if (e.isZero()) return t;
//                 for (var r, n, i = a[1]; t.isEven() && e.isEven();) r = C(B(t), B(e)), t = t.divide(r), e = e.divide(r), i = i.multiply(r);
//                 for (; t.isEven();) t = t.divide(B(t));
//                 do {
//                     for (; e.isEven();) e = e.divide(B(e));
//                     t.greater(e) && (n = e, e = t, t = n), e = e.subtract(t)
//                 } while (!e.isZero());
//                 return i.isUnit() ? t : t.multiply(i)
//             }
//             o.prototype.bitLength = function() {
//                 var t = this;
//                 return t.compareTo(i(0)) < 0 && (t = t.negate().subtract(i(1))), 0 === t.compareTo(i(0)) ? i(0) : i(function t(e, r) {
//                     if (r.compareTo(e) <= 0) {
//                         var n = t(e, r.square(r)),
//                             a = n.p,
//                             o = n.e,
//                             s = a.multiply(r);
//                         return s.compareTo(e) <= 0 ? {
//                             p: s,
//                             e: 2 * o + 1
//                         } : {
//                             p: a,
//                             e: 2 * o
//                         }
//                     }
//                     return {
//                         p: i(1),
//                         e: 0
//                     }
//                 }(t, i(2)).e).add(i(1))
//             }, u.prototype.bitLength = s.prototype.bitLength = o.prototype.bitLength;
//             var F = function(t, e, r, n) {
//                 r = r || "0123456789abcdefghijklmnopqrstuvwxyz", t = String(t), n || (t = t.toLowerCase(), r = r.toLowerCase());
//                 var i, a = t.length,
//                     o = Math.abs(e),
//                     s = {};
//                 for (i = 0; i < r.length; i++) s[r[i]] = i;
//                 for (i = 0; i < a; i++) {
//                     if ("-" !== (l = t[i]) && (l in s && s[l] >= o)) {
//                         if ("1" === l && 1 === o) continue;
//                         throw new Error(l + " is not a valid digit in base " + e + ".")
//                     }
//                 }
//                 e = Z(e);
//                 var u = [],
//                     c = "-" === t[0];
//                 for (i = c ? 1 : 0; i < t.length; i++) {
//                     var l;
//                     if ((l = t[i]) in s) u.push(Z(s[l]));
//                     else {
//                         if ("<" !== l) throw new Error(l + " is not a valid character");
//                         var f = i;
//                         do {
//                             i++
//                         } while (">" !== t[i] && i < t.length);
//                         u.push(Z(t.slice(f + 1, i)))
//                     }
//                 }
//                 return L(u, e, c)
//             };

//             function L(t, e, r) {
//                 var n, i = a[0],
//                     o = a[1];
//                 for (n = t.length - 1; n >= 0; n--) i = i.add(t[n].times(o)), o = o.times(e);
//                 return r ? i.negate() : i
//             }

//             function U(t, e) {
//                 if ((e = i(e)).isZero()) {
//                     if (t.isZero()) return {
//                         value: [0],
//                         isNegative: !1
//                     };
//                     throw new Error("Cannot convert nonzero numbers to base 0.")
//                 }
//                 if (e.equals(-1)) {
//                     if (t.isZero()) return {
//                         value: [0],
//                         isNegative: !1
//                     };
//                     if (t.isNegative()) return {
//                         value: [].concat.apply([], Array.apply(null, Array(-t.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
//                         isNegative: !1
//                     };
//                     var r = Array.apply(null, Array(t.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
//                     return r.unshift([1]), {
//                         value: [].concat.apply([], r),
//                         isNegative: !1
//                     }
//                 }
//                 var n = !1;
//                 if (t.isNegative() && e.isPositive() && (n = !0, t = t.abs()), e.isUnit()) return t.isZero() ? {
//                     value: [0],
//                     isNegative: !1
//                 } : {
//                     value: Array.apply(null, Array(t.toJSNumber())).map(Number.prototype.valueOf, 1),
//                     isNegative: n
//                 };
//                 for (var a, o = [], s = t; s.isNegative() || s.compareAbs(e) >= 0;) {
//                     a = s.divmod(e), s = a.quotient;
//                     var u = a.remainder;
//                     u.isNegative() && (u = e.minus(u).abs(), s = s.next()), o.push(u.toJSNumber())
//                 }
//                 return o.push(s.toJSNumber()), {
//                     value: o.reverse(),
//                     isNegative: n
//                 }
//             }

//             function J(t, e, r) {
//                 var n = U(t, e);
//                 return (n.isNegative ? "-" : "") + n.value.map((function(t) {
//                     return function(t, e) {
//                         return t < (e = e || "0123456789abcdefghijklmnopqrstuvwxyz").length ? e[t] : "<" + t + ">"
//                     }(t, r)
//                 })).join("")
//             }

//             function R(t) {
//                 if (c(+t)) {
//                     var e = +t;
//                     if (e === d(e)) return n ? new u(BigInt(e)) : new s(e);
//                     throw new Error("Invalid integer: " + t)
//                 }
//                 var r = "-" === t[0];
//                 r && (t = t.slice(1));
//                 var i = t.split(/e/i);
//                 if (i.length > 2) throw new Error("Invalid integer: " + i.join("e"));
//                 if (2 === i.length) {
//                     var a = i[1];
//                     if ("+" === a[0] && (a = a.slice(1)), (a = +a) !== d(a) || !c(a)) throw new Error("Invalid integer: " + a + " is not a valid exponent.");
//                     var l = i[0],
//                         f = l.indexOf(".");
//                     if (f >= 0 && (a -= l.length - f - 1, l = l.slice(0, f) + l.slice(f + 1)), a < 0) throw new Error("Cannot include negative exponent part for integers");
//                     t = l += new Array(a + 1).join("0")
//                 }
//                 if (!/^([0-9][0-9]*)$/.test(t)) throw new Error("Invalid integer: " + t);
//                 if (n) return new u(BigInt(r ? "-" + t : t));
//                 for (var h = [], y = t.length, m = y - 7; y > 0;) h.push(+t.slice(m, y)), (m -= 7) < 0 && (m = 0), y -= 7;
//                 return p(h), new o(h, r)
//             }

//             function Z(t) {
//                 return "number" == typeof t ? function(t) {
//                     if (n) return new u(BigInt(t));
//                     if (c(t)) {
//                         if (t !== d(t)) throw new Error(t + " is not an integer.");
//                         return new s(t)
//                     }
//                     return R(t.toString())
//                 }(t) : "string" == typeof t ? R(t) : "bigint" == typeof t ? new u(t) : t
//             }
//             o.prototype.toArray = function(t) {
//                 return U(this, t)
//             }, s.prototype.toArray = function(t) {
//                 return U(this, t)
//             }, u.prototype.toArray = function(t) {
//                 return U(this, t)
//             }, o.prototype.toString = function(t, e) {
//                 if (void 0 === t && (t = 10), 10 !== t) return J(this, t, e);
//                 for (var r, n = this.value, i = n.length, a = String(n[--i]); --i >= 0;) r = String(n[i]), a += "0000000".slice(r.length) + r;
//                 return (this.sign ? "-" : "") + a
//             }, s.prototype.toString = function(t, e) {
//                 return void 0 === t && (t = 10), 10 != t ? J(this, t, e) : String(this.value)
//             }, u.prototype.toString = s.prototype.toString, u.prototype.toJSON = o.prototype.toJSON = s.prototype.toJSON = function() {
//                 return this.toString()
//             }, o.prototype.valueOf = function() {
//                 return parseInt(this.toString(), 10)
//             }, o.prototype.toJSNumber = o.prototype.valueOf, s.prototype.valueOf = function() {
//                 return this.value
//             }, s.prototype.toJSNumber = s.prototype.valueOf, u.prototype.valueOf = u.prototype.toJSNumber = function() {
//                 return parseInt(this.toString(), 10)
//             };
//             for (var G = 0; G < 1e3; G++) a[G] = Z(G), G > 0 && (a[-G] = Z(-G));
//             return a.one = a[1], a.zero = a[0], a.minusOne = a[-1], a.max = T, a.min = C, a.gcd = I, a.lcm = function(t, e) {
//                 return t = Z(t).abs(), e = Z(e).abs(), t.divide(I(t, e)).multiply(e)
//             }, a.isInstance = function(t) {
//                 return t instanceof o || t instanceof s || t instanceof u
//             }, a.randBetween = function(t, e, r) {
//                 t = Z(t), e = Z(e);
//                 var n = r || Math.random,
//                     i = C(t, e),
//                     o = T(t, e).subtract(i).add(1);
//                 if (o.isSmall) return i.add(Math.floor(n() * o));
//                 for (var s = U(o, 1e7).value, u = [], c = !0, l = 0; l < s.length; l++) {
//                     var f = c ? s[l] : 1e7,
//                         p = d(n() * f);
//                     u.push(p), p < f && (c = !1)
//                 }
//                 return i.add(a.fromArray(u, 1e7, !1))
//             }, a.fromArray = function(t, e, r) {
//                 return L(t.map(Z), Z(e || 10), r)
//             }, a
//         }();
//         t.hasOwnProperty("exports") && (t.exports = i), void 0 === (n = function() {
//             return i
//         }.call(e, r, e, t)) || (t.exports = n)
//     }).call(this, r(23)(t))
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const n = r(8),
//         i = r(2);
//     e.default = class {
//         constructor(t, e, r, n = !0) {
//             this.api = t, this.name = e, this._data = new Promise(async (i, a) => {
//                 if (r) i(r);
//                 else try {
//                     i(await t.queue.fetchCollection(e, n))
//                 } catch (t) {
//                     a(t)
//                 }
//             })
//         }
//         async author() {
//             return (await this._data).author
//         }
//         async allowNotify() {
//             return (await this._data).allow_notify
//         }
//         async authorizedAccounts() {
//             return (await this._data).authorized_accounts
//         }
//         async notifyAccounts() {
//             return (await this._data).notify_accounts
//         }
//         async marketFee() {
//             return Number((await this._data).market_fee)
//         }
//         async data() {
//             return i.deserialize((await this._data).serialized_data, n.ObjectSchema((await this.api.config()).collection_format))
//         }
//         async toObject() {
//             return {
//                 collection_name: this.name,
//                 author: await this.author(),
//                 allowNotify: await this.allowNotify(),
//                 authorizedAccounts: await this.authorizedAccounts(),
//                 notifyAccounts: await this.notifyAccounts(),
//                 marketFee: await this.marketFee(),
//                 data: await this.data()
//             }
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.ObjectSchema = void 0;
//     const i = n(r(5)),
//         a = n(r(16)),
//         o = n(r(26)),
//         s = n(r(27));

//     function u(t, e) {
//         const r = [];
//         let n = e[t];
//         void 0 === n && (n = []), delete e[t];
//         for (const t of n) r.push({
//             name: t.name,
//             value: c(t.type, e)
//         });
//         return new a.default(r)
//     }

//     function c(t, e) {
//         if (t.endsWith("[]")) return new s.default(c(t.substring(0, t.length - 2), e));
//         if (t.startsWith("object{") && t.endsWith("}")) {
//             const r = parseInt(t.substring(7, t.length - 1), 10);
//             if (isNaN(r)) throw new i.default(`invalid type '${t}'`);
//             return u(r, e)
//         }
//         return new o.default(t)
//     }
//     e.ObjectSchema = function(t) {
//         const e = {};
//         for (const r of t) {
//             const t = void 0 === r.parent ? 0 : r.parent;
//             void 0 === e[t] && (e[t] = []), e[t].push(r)
//         }
//         return u(0, e)
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = r(8),
//         a = n(r(7));
//     e.default = class {
//         constructor(t, e, r, n, i = !0) {
//             this.api = t, this.collection = e, this.name = r, this._data = new Promise(async (a, o) => {
//                 if (n) a(n);
//                 else try {
//                     a(await t.queue.fetchSchema(e, r, i))
//                 } catch (t) {
//                     o(t)
//                 }
//             }), this._collection = new Promise(async (r, n) => {
//                 try {
//                     r(new a.default(t, e, void 0, i))
//                 } catch (t) {
//                     n(t)
//                 }
//             })
//         }
//         async format() {
//             return i.ObjectSchema((await this._data).format)
//         }
//         async rawFormat() {
//             return (await this._data).format
//         }
//         async toObject() {
//             return {
//                 collection_name: this.collection,
//                 schema_name: this.name,
//                 format: await this.rawFormat()
//             }
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(3)),
//         a = n(r(1));
//     e.default = class {
//         constructor(t) {
//             this.size = t
//         }
//         deserialize(t) {
//             t.position += this.size;
//             const e = t.data.slice(t.position - this.size, t.position);
//             if (e.length !== this.size) throw new i.default("FixedParser: read past end");
//             return e
//         }
//         serialize(t) {
//             if (t.length !== this.size) throw new a.default("input data does not conform fixed size");
//             return t
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(3)),
//         a = r(0);
//     e.default = class {
//         deserialize(t) {
//             const e = a.varint_decode(t).toJSNumber();
//             t.position += e;
//             const r = t.data.slice(t.position - e, t.position);
//             if (r.length !== e) throw new i.default("VariableParser: read past end");
//             return r
//         }
//         serialize(t) {
//             return a.concat_byte_arrays([a.varint_encode(t.length), t])
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.ActionGenerator = e.ExplorerActionGenerator = e.RpcActionGenerator = e.ParserTypes = e.serialize = e.deserialize = e.ObjectSchema = e.ExplorerApi = e.RpcApi = void 0;
//     const i = n(r(13));
//     e.ExplorerActionGenerator = i.default;
//     const a = r(4);
//     Object.defineProperty(e, "ActionGenerator", {
//         enumerable: !0,
//         get: function() {
//             return a.ActionGenerator
//         }
//     });
//     const o = n(r(14));
//     e.RpcActionGenerator = o.default;
//     const s = n(r(18));
//     e.ExplorerApi = s.default;
//     const u = n(r(20));
//     e.RpcApi = u.default;
//     const c = r(8);
//     Object.defineProperty(e, "ObjectSchema", {
//         enumerable: !0,
//         get: function() {
//             return c.ObjectSchema
//         }
//     });
//     const l = r(2);
//     Object.defineProperty(e, "deserialize", {
//         enumerable: !0,
//         get: function() {
//             return l.deserialize
//         }
//     }), Object.defineProperty(e, "serialize", {
//         enumerable: !0,
//         get: function() {
//             return l.serialize
//         }
//     });
//     const f = r(32);
//     Object.defineProperty(e, "ParserTypes", {
//         enumerable: !0,
//         get: function() {
//             return f.ParserTypes
//         }
//     })
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const n = r(4);
//     class i extends n.ActionGenerator {
//         constructor(t, e) {
//             super(t), this.api = e, this.config = e.getConfig()
//         }
//         async createcol(t, e, r, i, a, o, s, u) {
//             return super.createcol(t, e, r, i, a, o, s, n.toAttributeMap(u, (await this.config).collection_format))
//         }
//         async createtempl(t, e, r, i, a, o, s, u) {
//             const c = await this.api.getSchema(r, i),
//                 l = n.toAttributeMap(u, c.format);
//             return super.createtempl(t, e, r, i, a, o, s, l)
//         }
//         async mintasset(t, e, r, i, a, o, s, u, c) {
//             const l = await this.api.getSchema(r, i),
//                 f = n.toAttributeMap(s, l.format),
//                 p = n.toAttributeMap(u, l.format);
//             return super.mintasset(t, e, r, i, a, o, f, p, c)
//         }
//         async setassetdata(t, e, r, i, a) {
//             const o = await this.api.getAsset(i),
//                 s = n.toAttributeMap(a, o.schema.format);
//             return super.setassetdata(t, e, r, i, s)
//         }
//         async setcoldata(t, e, r) {
//             const i = n.toAttributeMap(r, (await this.config).collection_format);
//             return super.setcoldata(t, e, i)
//         }
//     }
//     e.default = i
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const n = r(4);
//     class i extends n.ActionGenerator {
//         constructor(t) {
//             super(t.contract), this.api = t
//         }
//         async createcol(t, e, r, i, a, o, s, u) {
//             const c = await this.api.config();
//             return super.createcol(t, e, r, i, a, o, s, n.toAttributeMap(u, c.collection_format))
//         }
//         async createtempl(t, e, r, i, a, o, s, u) {
//             const c = await this.api.getSchema(r, i),
//                 l = n.toAttributeMap(u, await c.rawFormat());
//             return super.createtempl(t, e, r, i, a, o, s, l)
//         }
//         async mintasset(t, e, r, i, a, o, s, u, c) {
//             const l = await this.api.getTemplate(r, a),
//                 f = n.toAttributeMap(s, await (await l.schema()).rawFormat()),
//                 p = n.toAttributeMap(u, await (await l.schema()).rawFormat());
//             return super.mintasset(t, e, r, i, a, o, f, p, c)
//         }
//         async setassetdata(t, e, r, i, a) {
//             const o = await this.api.getAsset(r, i),
//                 s = await o.schema(),
//                 u = n.toAttributeMap(a, await s.rawFormat());
//             return super.setassetdata(t, e, r, i, u)
//         }
//         async setcoldata(t, e, r) {
//             const i = n.toAttributeMap(r, (await this.api.config()).collection_format);
//             return super.setcoldata(t, e, i)
//         }
//     }
//     e.default = i
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = r(2),
//         a = n(r(7)),
//         o = n(r(9)),
//         s = n(r(17));
//     e.default = class {
//         constructor(t, e, r, n, i, u, c, l = !0) {
//             this.api = t, this.owner = e, this.id = r, this._data = new Promise(async (i, a) => {
//                 if (n) i(n);
//                 else try {
//                     i(await t.queue.fetchAsset(e, r, l))
//                 } catch (t) {
//                     a(t)
//                 }
//             }), this._template = new Promise(async (e, r) => {
//                 if (c) e(c);
//                 else try {
//                     const r = await this._data;
//                     if (Number(r.template_id) < 0) return e(null);
//                     e(new s.default(t, r.collection_name, r.template_id, void 0, void 0, l))
//                 } catch (t) {
//                     r(t)
//                 }
//             }), this._collection = new Promise(async (e, r) => {
//                 if (i) e(i);
//                 else try {
//                     const r = await this._data;
//                     e(new a.default(t, r.collection_name, void 0, l))
//                 } catch (t) {
//                     r(t)
//                 }
//             }), this._schema = new Promise(async (e, r) => {
//                 if (u) e(u);
//                 else try {
//                     const r = await this._data;
//                     e(new o.default(t, r.collection_name, r.schema_name, void 0, l))
//                 } catch (t) {
//                     r(t)
//                 }
//             })
//         }
//         async template() {
//             return await this._template
//         }
//         async collection() {
//             return await this._collection
//         }
//         async schema() {
//             return await this._schema
//         }
//         async backedTokens() {
//             return (await this._data).backed_tokens
//         }
//         async immutableData() {
//             const t = await this.schema(),
//                 e = await this._data;
//             return i.deserialize(e.immutable_serialized_data, await t.format())
//         }
//         async mutableData() {
//             const t = await this.schema(),
//                 e = await this._data;
//             return i.deserialize(e.mutable_serialized_data, await t.format())
//         }
//         async data() {
//             const t = await this.mutableData(),
//                 e = await this.immutableData(),
//                 r = await this.template(),
//                 n = r ? await r.immutableData() : {};
//             return Object.assign({}, t, e, n)
//         }
//         async toObject() {
//             const t = await this.template(),
//                 e = await this.collection(),
//                 r = await this.schema();
//             return {
//                 asset_id: this.id,
//                 collection: await e.toObject(),
//                 schema: await r.toObject(),
//                 template: t ? await t.toObject() : null,
//                 backedTokens: await this.backedTokens(),
//                 immutableData: await this.immutableData(),
//                 mutableData: await this.mutableData(),
//                 data: await this.data()
//             }
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(5)),
//         a = r(0);
//     e.default = class {
//         constructor(t) {
//             this.attributes = t, this.reserved = 4
//         }
//         deserialize(t) {
//             const e = {};
//             for (; t.position < t.data.length;) {
//                 const r = a.varint_decode(t);
//                 if (r.equals(0)) break;
//                 const n = this.getAttribute(r.toJSNumber());
//                 e[n.name] = n.value.deserialize(t)
//             }
//             return e
//         }
//         serialize(t) {
//             const e = [];
//             for (let r = 0; r < this.attributes.length; r++) {
//                 const n = this.attributes[r];
//                 void 0 !== t[n.name] && (e.push(a.varint_encode(r + this.reserved)), e.push(n.value.serialize(t[n.name])))
//             }
//             return e.push(a.varint_encode(0)), a.concat_byte_arrays(e)
//         }
//         getAttribute(t) {
//             const e = t - this.reserved;
//             if (e >= this.attributes.length) throw new i.default("attribute does not exists");
//             return this.attributes[Number(e)]
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = r(2),
//         a = n(r(9));
//     e.default = class {
//         constructor(t, e, r, n, i, o = !0) {
//             this.api = t, this.collection = e, this.id = r, this._data = new Promise(async (i, a) => {
//                 if (n) i(n);
//                 else try {
//                     i(await t.queue.fetchTemplate(e, r, o))
//                 } catch (t) {
//                     a(t)
//                 }
//             }), this._schema = new Promise(async (t, r) => {
//                 if (i) t(i);
//                 else try {
//                     const r = await this._data;
//                     t(new a.default(this.api, e, r.schema_name, void 0, o))
//                 } catch (t) {
//                     r(t)
//                 }
//             })
//         }
//         async schema() {
//             return await this._schema
//         }
//         async immutableData() {
//             const t = await this._schema;
//             return i.deserialize((await this._data).immutable_serialized_data, await t.format())
//         }
//         async isTransferable() {
//             return (await this._data).transferable
//         }
//         async isBurnable() {
//             return (await this._data).burnable
//         }
//         async maxSupply() {
//             return (await this._data).max_supply
//         }
//         async circulation() {
//             return (await this._data).issued_supply
//         }
//         async toObject() {
//             return {
//                 collection_name: this.collection,
//                 template_id: this.id,
//                 schema: await (await this.schema()).toObject(),
//                 immutableData: await this.immutableData(),
//                 transferable: await this.isTransferable(),
//                 burnable: await this.isBurnable(),
//                 maxSupply: await this.maxSupply(),
//                 circulation: await this.circulation()
//             }
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(13)),
//         a = n(r(19));

//     function o(t, e) {
//         const r = Object.keys(e),
//             n = {};
//         for (const t of r) "number" == typeof e[t] ? n["data:number." + t] = e[t] : "boolean" == typeof e[t] ? n["data:bool." + t] = e[t] : n["data." + t] = e[t];
//         return Object.assign({}, t, n)
//     }
//     e.default = class {
//         constructor(t, e, r) {
//             this.endpoint = t, this.namespace = e, r.fetch ? this.fetchBuiltin = r.fetch : this.fetchBuiltin = window.fetch, this.action = (async () => new i.default((await this.getConfig()).contract, this))()
//         }
//         async getConfig() {
//             return await this.fetchEndpoint("/v1/config", {})
//         }
//         async getAssets(t = {}, e = 1, r = 100, n = {}) {
//             return await this.fetchEndpoint("/v1/assets", Object.assign({
//                 page: e,
//                 limit: r
//             }, o(t, n)))
//         }
//         async countAssets(t, e = {}) {
//             return await this.countEndpoint("/v1/assets", o(t, e))
//         }
//         async getAsset(t) {
//             return await this.fetchEndpoint("/v1/assets/" + t, {})
//         }
//         async getAssetLogs(t, e = 1, r = 100, n = "desc") {
//             return await this.fetchEndpoint("/v1/assets/" + t + "/logs", {
//                 page: e,
//                 limit: r,
//                 order: n
//             })
//         }
//         async getCollections(t = {}, e = 1, r = 100) {
//             return await this.fetchEndpoint("/v1/collections", Object.assign({
//                 page: e,
//                 limit: r
//             }, t))
//         }
//         async countCollections(t = {}) {
//             return await this.countEndpoint("/v1/collections", t)
//         }
//         async getCollection(t) {
//             return await this.fetchEndpoint("/v1/collections/" + t, {})
//         }
//         async getCollectionLogs(t, e = 1, r = 100, n = "desc") {
//             return await this.fetchEndpoint("/v1/collections/" + t + "/logs", {
//                 page: e,
//                 limit: r,
//                 order: n
//             })
//         }
//         async getSchemas(t = {}, e = 1, r = 100) {
//             return await this.fetchEndpoint("/v1/schemas", Object.assign({
//                 page: e,
//                 limit: r
//             }, t))
//         }
//         async countSchemas(t = {}) {
//             return await this.countEndpoint("/v1/schemas", t)
//         }
//         async getSchema(t, e) {
//             return await this.fetchEndpoint("/v1/schemas/" + t + "/" + e, {})
//         }
//         async getSchemaStats(t, e) {
//             return await this.fetchEndpoint("/v1/schemas/" + t + "/" + e + "/stats", {})
//         }
//         async getSchemaLogs(t, e, r = 1, n = 100, i = "desc") {
//             return await this.fetchEndpoint("/v1/schemas/" + t + "/" + e + "/logs", {
//                 page: r,
//                 limit: n,
//                 order: i
//             })
//         }
//         async getTemplates(t = {}, e = 1, r = 100, n = {}) {
//             return await this.fetchEndpoint("/v1/templates", Object.assign({
//                 page: e,
//                 limit: r
//             }, o(t, n)))
//         }
//         async countTemplates(t = {}, e = {}) {
//             return await this.countEndpoint("/v1/templates", o(t, e))
//         }
//         async getTemplate(t, e) {
//             return await this.fetchEndpoint("/v1/templates/" + t + "/" + e, {})
//         }
//         async getTemplateStats(t, e) {
//             return await this.fetchEndpoint("/v1/templates/" + t + "/" + e + "/stats", {})
//         }
//         async getTemplateLogs(t, e, r = 1, n = 100, i = "desc") {
//             return await this.fetchEndpoint("/v1/templates/" + t + "/" + e + "/logs", {
//                 page: r,
//                 limit: n,
//                 order: i
//             })
//         }
//         async getTransfers(t = {}, e = 1, r = 100) {
//             return await this.fetchEndpoint("/v1/transfers", Object.assign({
//                 page: e,
//                 limit: r
//             }, t))
//         }
//         async countTransfers(t = {}) {
//             return await this.countEndpoint("/v1/transfers", t)
//         }
//         async getOffers(t = {}, e = 1, r = 100) {
//             return await this.fetchEndpoint("/v1/offers", Object.assign({
//                 page: e,
//                 limit: r
//             }, t))
//         }
//         async countOffers(t = {}) {
//             return await this.countEndpoint("/v1/offers", t)
//         }
//         async getOffer(t) {
//             return await this.fetchEndpoint("/v1/offers/" + t, {})
//         }
//         async getAccounts(t = {}, e = 1, r = 100) {
//             return await this.fetchEndpoint("/v1/accounts", Object.assign({
//                 page: e,
//                 limit: r
//             }, t))
//         }
//         async countAccounts(t = {}) {
//             return await this.countEndpoint("/v1/accounts", t)
//         }
//         async getAccount(t, e = {}) {
//             return await this.fetchEndpoint("/v1/accounts/" + t, e)
//         }
//         async getAccountCollection(t, e, r = {}) {
//             return await this.fetchEndpoint("/v1/accounts/" + t + "/" + e, r)
//         }
//         async fetchEndpoint(t, e) {
//             let r;
//             const n = this.fetchBuiltin,
//                 i = Object.keys(e).map(t => t + "=" + encodeURIComponent(e[t])).join("&");
//             try {
//                 r = await n(this.endpoint + "/" + this.namespace + t + (i.length > 0 ? "?" + i : ""))
//             } catch (t) {
//                 throw new a.default(t.message, 500)
//             }
//             const o = await r.json();
//             if (200 !== r.status) throw new a.default(o.message, r.status);
//             if (!o.success) throw new a.default(o.message, r.status);
//             return o.data
//         }
//         async countEndpoint(t, e) {
//             const r = await this.fetchEndpoint(t + "/_count", e);
//             return parseInt(r, 10)
//         }
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     class n extends Error {
//         constructor(t, e) {
//             super(t), this.message = t, this.status = e, this.isApiError = !0
//         }
//     }
//     e.default = n
// }, function(t, e, r) {
    
//     (function(t) {
//         var n = this && this.__importDefault || function(t) {
//             return t && t.__esModule ? t : {
//                 default: t
//             }
//         };
//         Object.defineProperty(e, "__esModule", {
//             value: !0
//         });
//         const i = n(r(14)),
//             a = n(r(22)),
//             o = n(r(15)),
//             s = n(r(28)),
//             u = n(r(7)),
//             c = n(r(30)),
//             l = n(r(31)),
//             f = n(r(9)),
//             p = n(r(17));
//         e.default = class {
//             constructor(e, r, n = {
//                 rateLimit: 4
//             }) {
//                 this.endpoint = e, this.contract = r, n.fetch ? this.fetchBuiltin = n.fetch : this.fetchBuiltin = t.fetch, this.queue = new l.default(this, n.rateLimit), this.cache = new s.default, this.action = new i.default(this), this._config = new Promise(async (t, e) => {
//                     try {
//                         const r = await this.getTableRows({
//                             code: this.contract,
//                             scope: this.contract,
//                             table: "config"
//                         });
//                         return 1 !== r.rows.length ? e("invalid config") : t(r.rows[0])
//                     } catch (t) {
//                         e(t)
//                     }
//                 })
//             }
//             async config() {
//                 return await this._config
//             }
//             async getAsset(t, e, r = !0) {
//                 r || this.cache.deleteAsset(e);
//                 const n = await this.queue.fetchAsset(t, e, r);
//                 return new o.default(this, t, e, n, void 0, void 0, void 0, r)
//             }
//             async getTemplate(t, e, r = !0) {
//                 r || this.cache.deleteTemplate(t, e);
//                 const n = await this.queue.fetchTemplate(t, e, r);
//                 return new p.default(this, t, e, n, void 0, r)
//             }
//             async getCollection(t, e = !0) {
//                 e || this.cache.deleteCollection(t);
//                 const r = await this.queue.fetchCollection(t, e);
//                 return new u.default(this, t, r, e)
//             }
//             async getCollectionTemplates(t) {
//                 return (await this.queue.fetchCollectionTemplates(t)).map(e => new p.default(this, t, String(e.template_id), e, void 0))
//             }
//             async getCollectionsSchemas(t) {
//                 return (await this.queue.fetchCollectionSchemas(t)).map(e => new f.default(this, t, e.schema_name, void 0))
//             }
//             async getSchema(t, e, r = !0) {
//                 r || this.cache.deleteSchema(t, e);
//                 const n = await this.queue.fetchSchema(t, e, r);
//                 return new f.default(this, t, e, n, r)
//             }
//             async getOffer(t, e = !0) {
//                 e || this.cache.deleteOffer(t);
//                 const r = await this.queue.fetchOffer(t, e);
//                 return new c.default(this, t, r, void 0, void 0, e)
//             }
//             async getAccountOffers(t) {
//                 return (await this.queue.fetchAccountOffers(t)).map(t => new c.default(this, t.offer_id, t, void 0, void 0))
//             }
//             async getAccountAssets(t) {
//                 return (await this.queue.fetchAccountAssets(t)).map(e => new o.default(this, t, e.asset_id, e, void 0, void 0, void 0))
//             }
//             async getCollectionInventory(t, e) {
//                 return await this.queue.preloadCollection(t, !0), (await this.queue.fetchAccountAssets(e)).filter(e => e.collection_name === t).map(t => new o.default(this, e, t.asset_id, t, void 0, void 0, void 0))
//             }
//             async preloadCollection(t, e = !0) {
//                 await this.queue.preloadCollection(t, e)
//             }
//             async getTableRows({
//                 code: t,
//                 scope: e,
//                 table: r,
//                 table_key: n = "",
//                 lower_bound: i = "",
//                 upper_bound: a = "",
//                 index_position: o = 1,
//                 key_type: s = ""
//             }) {
//                 return await this.fetchRpc("/v1/chain/get_table_rows", {
//                     code: t,
//                     scope: e,
//                     table: r,
//                     table_key: n,
//                     lower_bound: i,
//                     upper_bound: a,
//                     index_position: o,
//                     key_type: s,
//                     limit: 101,
//                     reverse: !1,
//                     show_payer: !1,
//                     json: !0
//                 })
//             }
//             async fetchRpc(t, e) {
//                 let r, n;
//                 try {
//                     const i = this.fetchBuiltin;
//                     r = await i(this.endpoint + t, {
//                         body: JSON.stringify(e),
//                         method: "POST"
//                     }), n = await r.json()
//                 } catch (t) {
//                     throw t.isFetchError = !0, t
//                 }
//                 if (n.processed && n.processed.except || !r.ok) throw new a.default(n);
//                 return n
//             }
//         }
//     }).call(this, r(21))
// }, function(t, e) {
//     var r;
//     r = function() {
//         return this
//     }();
//     try {
//         r = r || new Function("return this")()
//     } catch (t) {
//         "object" == typeof window && (r = window)
//     }
//     t.exports = r
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     class n extends Error {
//         constructor(t) {
//             t.error && t.error.details && t.error.details.length && t.error.details[0].message ? super(t.error.details[0].message) : t.processed && t.processed.except && t.processed.except.message ? super(t.processed.except.message) : super(t.message), this.json = t
//         }
//     }
//     e.default = n
// }, function(t, e) {
//     t.exports = function(t) {
//         return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
//             enumerable: !0,
//             get: function() {
//                 return t.l
//             }
//         }), Object.defineProperty(t, "id", {
//             enumerable: !0,
//             get: function() {
//                 return t.i
//             }
//         }), t.webpackPolyfill = 1), t
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     e.default = class {
//         constructor(t) {
//             if (this.ALPHABET = t, t.length >= 255) throw new TypeError("Alphabet too long");
//             this.BASE_MAP = new Uint8Array(256);
//             for (let t = 0; t < this.BASE_MAP.length; t++) this.BASE_MAP[t] = 255;
//             for (let e = 0; e < t.length; e++) {
//                 const r = t.charAt(e),
//                     n = r.charCodeAt(0);
//                 if (255 !== this.BASE_MAP[n]) throw new TypeError(r + " is ambiguous");
//                 this.BASE_MAP[n] = e
//             }
//             this.BASE = t.length, this.LEADER = t.charAt(0), this.FACTOR = Math.log(this.BASE) / Math.log(256), this.iFACTOR = Math.log(256) / Math.log(this.BASE)
//         }
//         encode(t) {
//             if (0 === t.length) return "";
//             let e = 0,
//                 r = 0,
//                 n = 0;
//             const i = t.length;
//             for (; n !== i && 0 === t[n];) n++, e++;
//             const a = (i - n) * this.iFACTOR + 1 >>> 0,
//                 o = new Uint8Array(a);
//             for (; n !== i;) {
//                 let e = t[n],
//                     i = 0;
//                 for (let t = a - 1;
//                     (0 !== e || i < r) && -1 !== t; t--, i++) e += 256 * o[t] >>> 0, o[t] = e % this.BASE >>> 0, e = e / this.BASE >>> 0;
//                 if (0 !== e) throw new Error("Non-zero carry");
//                 r = i, n++
//             }
//             let s = a - r;
//             for (; s !== a && 0 === o[s];) s++;
//             let u = this.LEADER.repeat(e);
//             for (; s < a; ++s) u += this.ALPHABET.charAt(o[s]);
//             return u
//         }
//         decode(t) {
//             const e = this.decodeUnsafe(t);
//             if (e) return e;
//             throw new Error("Non-base" + this.BASE + " character")
//         }
//         decodeUnsafe(t) {
//             if (0 === t.length) return new Uint8Array(0);
//             let e = 0;
//             if (" " === t[e]) return new Uint8Array(0);
//             let r = 0,
//                 n = 0;
//             for (; t[e] === this.LEADER;) r++, e++;
//             const i = (t.length - e) * this.FACTOR + 1 >>> 0,
//                 a = new Uint8Array(i);
//             for (; t[e];) {
//                 let r = this.BASE_MAP[t.charCodeAt(e)];
//                 if (255 === r) return new Uint8Array(0);
//                 let o = 0;
//                 for (let t = i - 1;
//                     (0 !== r || o < n) && -1 !== t; t--, o++) r += this.BASE * a[t] >>> 0, a[t] = r % 256 >>> 0, r = r / 256 >>> 0;
//                 if (0 !== r) throw new Error("Non-zero carry");
//                 n = o, e++
//             }
//             if (" " === t[e]) return new Uint8Array(0);
//             let o = i - n;
//             for (; o !== i && 0 === a[o];) o++;
//             const s = new Uint8Array(r + (i - o));
//             s.fill(0, 0, r);
//             let u = r;
//             for (; o !== i;) s[u++] = a[o++];
//             return s
//         }
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.prepare = void 0;
//     class n {
//         constructor(t, e = 0) {
//             this.data = t, this.position = e
//         }
//     }
//     e.default = n, e.prepare = function(t) {
//         return new n(t, 0)
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(5)),
//         a = r(12);
//     e.default = class {
//         constructor(t) {
//             if (void 0 === a.ParserTypes[t]) throw new i.default(`attribute type '${t}' not defined`);
//             this.parser = a.ParserTypes[t]
//         }
//         deserialize(t) {
//             return this.parser.deserialize(t)
//         }
//         serialize(t) {
//             return this.parser.serialize(t)
//         }
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const n = r(0);
//     e.default = class {
//         constructor(t) {
//             this.element = t
//         }
//         deserialize(t) {
//             const e = n.varint_decode(t).toJSNumber(),
//                 r = [];
//             for (let n = 0; n < e; n++) r.push(this.element.deserialize(t));
//             return r
//         }
//         serialize(t) {
//             const e = [n.varint_encode(t.length)];
//             for (const r of t) e.push(this.element.serialize(r));
//             return n.concat_byte_arrays(e)
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(29));
//     e.default = class {
//         constructor() {
//             this.cache = new i.default({
//                 expiryCheckInterval: 6e4
//             })
//         }
//         getAsset(t, e) {
//             return e && (e.mutable_serialized_data = new Uint8Array(e.mutable_serialized_data), e.immutable_serialized_data = new Uint8Array(e.immutable_serialized_data)), this.access("assets", t, e)
//         }
//         deleteAsset(t) {
//             this.delete("assets", t)
//         }
//         getTemplate(t, e, r) {
//             return r && (r.immutable_serialized_data = new Uint8Array(r.immutable_serialized_data)), this.access("templates", t + ":" + e, r)
//         }
//         deleteTemplate(t, e) {
//             this.delete("templates", t + ":" + e)
//         }
//         getSchema(t, e, r) {
//             return this.access("schemas", t + ":" + e, r)
//         }
//         deleteSchema(t, e) {
//             this.delete("schemas", t + ":" + e)
//         }
//         getCollection(t, e) {
//             return this.access("collections", t, e)
//         }
//         deleteCollection(t) {
//             this.delete("collections", t)
//         }
//         getOffer(t, e) {
//             return this.access("offers", t, e)
//         }
//         deleteOffer(t) {
//             this.delete("offers", t)
//         }
//         access(t, e, r) {
//             if (void 0 === r) {
//                 const r = this.cache.get(t + ":" + e);
//                 return null === r ? null : r.value
//             }
//             return this.cache.put(t + ":" + e, r, 9e5), r
//         }
//         delete(t, e) {
//             this.cache.remove(t + ":" + e)
//         }
//     }
// }, function(t, e, r) {
//     t.exports = function() {
        

//         function t(t, e) {
//             if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
//         }

//         function e(t, e) {
//             for (var r = 0; r < e.length; r++) {
//                 var n = e[r];
//                 n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
//             }
//         }

//         function r(t, r, n) {
//             return r && e(t.prototype, r), n && e(t, n), t
//         }

//         function n(t, e, r) {
//             return e in t ? Object.defineProperty(t, e, {
//                 value: r,
//                 enumerable: !0,
//                 configurable: !0,
//                 writable: !0
//             }) : t[e] = r, t
//         }

//         function i(t) {
//             return t = t || Object.create(null), {
//                 on: function(e, r) {
//                     (t[e] || (t[e] = [])).push(r)
//                 },
//                 off: function(e, r) {
//                     t[e] && t[e].splice(t[e].indexOf(r) >>> 0, 1)
//                 },
//                 emit: function(e, r) {
//                     (t[e] || []).slice().map((function(t) {
//                         t(r)
//                     })), (t["*"] || []).slice().map((function(t) {
//                         t(e, r)
//                     }))
//                 }
//             }
//         }
//         var a = "expiry",
//             o = function(t) {
//                 if (t) throw new Error("Cannot use disposed instance.")
//             },
//             s = {
//                 expiryCheckInterval: 100
//             },
//             u = function() {
//                 function e() {
//                     var r = this,
//                         i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
//                     t(this, e), n(this, "expire", (function() {
//                         o(r.disposed);
//                         for (var t = Date.now(), e = t; e >= r.lastExpiredTime; e -= 1) {
//                             var n = r.queue[e];
//                             n && (delete r.queue[e], n.forEach((function(t) {
//                                 var e = t.key;
//                                 return (0, t.onExpire)(e)
//                             })))
//                         }
//                         r.lastExpiredTime = t
//                     })), this.config = Object.assign({}, s, i), this.queue = {}, this.disposed = !1, this.lastExpiredTime = Date.now() - 1;
//                     var a = this.config.expiryCheckInterval;
//                     this.timer = setInterval(this.expire, a)
//                 }
//                 return r(e, [{
//                     key: "add",
//                     value: function(t, e, r) {
//                         return o(this.disposed), this.queue[t] || (this.queue[t] = []), this.queue[t].push({
//                             key: e,
//                             onExpire: r
//                         }), !0
//                     }
//                 }, {
//                     key: "remove",
//                     value: function(t, e) {
//                         o(this.disposed);
//                         var r = this.queue[t];
//                         if (r) {
//                             var n = r.filter((function(t) {
//                                 return t.key !== e
//                             }));
//                             return n.length ? this.queue[t] = n : delete this.queue[t], !0
//                         }
//                         return !1
//                     }
//                 }, {
//                     key: "dispose",
//                     value: function() {
//                         return o(this.disposed), clearInterval(this.timer), this.timer = null, this.queue = {}, this.disposed = !0, !0
//                     }
//                 }]), e
//             }(),
//             c = {
//                 defaultCacheExpiryIn: 6e4,
//                 expiryCheckInterval: 100
//             };
//         return function() {
//             function e() {
//                 var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
//                     n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u;
//                 t(this, e), this.config = Object.assign({}, c, r);
//                 var a = i(),
//                     o = a.on,
//                     s = a.off,
//                     l = a.emit,
//                     f = [o, s, l];
//                 this.on = f[0], this.off = f[1], this.emit = f[2], this.cacheStore = {}, this.disposed = !1;
//                 var p = this.config.expiryCheckInterval;
//                 this.cacheExpirer = new n({
//                     expiryCheckInterval: p
//                 })
//             }
//             return r(e, [{
//                 key: "put",
//                 value: function() {
//                     var t = this,
//                         e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
//                         r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
//                         n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.config.defaultCacheExpiryIn;
//                     o(this.disposed), this.cacheStore[e] && this.remove(e);
//                     var i = Date.now(),
//                         s = n ? i + n : null,
//                         u = {
//                             value: r,
//                             addedAt: i,
//                             expiryAt: s
//                         };
//                     if (this.cacheStore[e] = u, s) {
//                         var c = function() {
//                             t.remove(e), t.emit(a, {
//                                 key: e,
//                                 data: t.cacheStore[e]
//                             })
//                         };
//                         this.cacheExpirer.add(s, e, c)
//                     }
//                     return this.emit("add", {
//                         key: e,
//                         data: u
//                     }), u
//                 }
//             }, {
//                 key: "get",
//                 value: function() {
//                     var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
//                     o(this.disposed);
//                     var e = this.cacheStore[t];
//                     return e ? (this.emit("get", {
//                         key: t,
//                         data: e
//                     }), e) : null
//                 }
//             }, {
//                 key: "remove",
//                 value: function(t) {
//                     o(this.disposed);
//                     var e = this.cacheStore[t];
//                     if (e) {
//                         delete this.cacheStore[t];
//                         var r = e.expiryAt;
//                         return this.cacheExpirer.remove(r, t), this.emit("remove", {
//                             key: t,
//                             data: e
//                         }), !0
//                     }
//                     return !1
//                 }
//             }, {
//                 key: "dispose",
//                 value: function() {
//                     var t = this;
//                     return o(this.disposed), Object.keys(this.cacheStore).forEach((function(e) {
//                         return t.remove(e)
//                     })), this.emit("clear", {}), this.cacheExpirer.dispose(), this.disposed = !0, !0
//                 }
//             }]), e
//         }()
//     }()
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(15));
//     e.default = class {
//         constructor(t, e, r, n, a, o = !0) {
//             this.api = t, this.id = e, this._data = new Promise(async (t, n) => {
//                 if (r) t(r);
//                 else try {
//                     t(await this.api.queue.fetchOffer(e, o))
//                 } catch (t) {
//                     n(t)
//                 }
//             }), this._senderAssets = new Promise(async (t, e) => {
//                 if (n) t(n);
//                 else try {
//                     const e = await this._data,
//                         r = await this.api.queue.fetchAccountAssets(e.sender);
//                     return t(e.sender_asset_ids.map(t => {
//                         const n = r.find(e => e.asset_id === t);
//                         return n ? new i.default(this.api, e.sender, t, n, void 0, void 0, void 0, o) : t
//                     }))
//                 } catch (t) {
//                     return e(t)
//                 }
//             }), this._recipientAssets = new Promise(async (t, e) => {
//                 if (a) t(a);
//                 else try {
//                     const e = await this._data,
//                         r = await this.api.queue.fetchAccountAssets(e.recipient);
//                     return t(e.recipient_asset_ids.map(t => {
//                         const n = r.find(e => e.asset_id === t);
//                         return n ? new i.default(this.api, e.recipient, t, n, void 0, void 0, void 0, o) : t
//                     }))
//                 } catch (t) {
//                     return e(t)
//                 }
//             })
//         }
//         async sender() {
//             return (await this._data).sender
//         }
//         async recipient() {
//             return (await this._data).recipient
//         }
//         async senderAssets() {
//             return await this._senderAssets
//         }
//         async recipientAssets() {
//             return await this._recipientAssets
//         }
//         async memo() {
//             return (await this._data).memo
//         }
//         async toObject() {
//             return {
//                 offer_id: this.id,
//                 sender: {
//                     account: await this.sender(),
//                     assets: await Promise.all((await this.senderAssets()).map(async t => "string" == typeof t ? t : await t.toObject()))
//                 },
//                 recipient: {
//                     account: await this.recipient(),
//                     assets: await Promise.all((await this.recipientAssets()).map(async t => "string" == typeof t ? t : await t.toObject()))
//                 },
//                 memo: await this.memo()
//             }
//         }
//     }
// }, function(t, e, r) {
    
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     e.default = class {
//         constructor(t, e = 4) {
//             this.api = t, this.requestLimit = e, this.elements = [], this.interval = null, this.preloadedCollections = {}
//         }
//         async fetchAsset(t, e, r = !0) {
//             return await this.fetch_single_row("assets", t, e, t => r || void 0 !== t ? this.api.cache.getAsset(e, t) : null)
//         }
//         async fetchAccountAssets(t) {
//             return (await this.fetch_all_rows("assets", t, "asset_id")).map(t => this.api.cache.getAsset(t.asset_id, t))
//         }
//         async fetchTemplate(t, e, r = !0) {
//             return await this.fetch_single_row("templates", t, e, n => r || void 0 !== n ? this.api.cache.getTemplate(t, e, n) : null)
//         }
//         async fetchSchema(t, e, r = !0) {
//             return await this.fetch_single_row("schemas", t, e, n => r || void 0 !== n ? this.api.cache.getSchema(t, e, n) : null)
//         }
//         async fetchCollection(t, e = !0) {
//             return await this.fetch_single_row("collections", this.api.contract, t, r => e || void 0 !== r ? this.api.cache.getCollection(t, r) : null)
//         }
//         async fetchCollectionSchemas(t) {
//             return (await this.fetch_all_rows("schemas", t, "schema_name")).map(e => this.api.cache.getSchema(t, e.schema_name, e))
//         }
//         async fetchCollectionTemplates(t) {
//             return (await this.fetch_all_rows("templates", t, "template_id")).map(e => this.api.cache.getTemplate(t, String(e.template_id), e))
//         }
//         async preloadCollection(t, e = !0) {
//             (!e || !this.preloadedCollections[t] || this.preloadedCollections[t] + 9e5 < Date.now()) && (await this.fetchCollectionSchemas(t), await this.fetchCollectionTemplates(t))
//         }
//         async fetchOffer(t, e = !0) {
//             return await this.fetch_single_row("offers", this.api.contract, t, r => e || void 0 !== r ? this.api.cache.getOffer(t, r) : null)
//         }
//         async fetchAccountOffers(t) {
//             const e = await Promise.all([this.fetch_all_rows("offers", this.api.contract, "offer_sender", t, t, 2, "name"), this.fetch_all_rows("offers", this.api.contract, "offer_recipient", t, t, 3, "name")]);
//             return e[0].concat(e[1]).map(t => this.api.cache.getOffer(t.offer_id, t))
//         }
//         dequeue() {
//             this.interval || (this.interval = setInterval(async () => {
//                 this.elements.length > 0 ? this.elements.shift()() : (clearInterval(this.interval), this.interval = null)
//             }, Math.ceil(1e3 / this.requestLimit)))
//         }
//         async fetch_single_row(t, e, r, n, i = 1, a = "") {
//             return new Promise((o, s) => {
//                 let u = n();
//                 if (null !== u) return o(u);
//                 this.elements.push(async () => {
//                     if (u = n(), null !== u) return o(u);
//                     try {
//                         const u = {
//                                 code: this.api.contract,
//                                 table: t,
//                                 scope: e,
//                                 limit: 1,
//                                 lower_bound: r,
//                                 upper_bound: r,
//                                 index_position: i,
//                                 key_type: a
//                             },
//                             c = await this.api.getTableRows(u);
//                         return 0 === c.rows.length ? s(new Error("Row not found for " + JSON.stringify(u))) : o(n(c.rows[0]))
//                     } catch (t) {
//                         return s(t)
//                     }
//                 }), this.dequeue()
//             })
//         }
//         async fetch_all_rows(t, e, r, n = "", i = "", a = 1, o = "") {
//             return new Promise(async (s, u) => {
//                 this.elements.push(async () => {
//                     const c = await this.api.getTableRows({
//                         code: this.api.contract,
//                         scope: e,
//                         table: t,
//                         lower_bound: n,
//                         upper_bound: i,
//                         limit: 1e3,
//                         index_position: a,
//                         key_type: o
//                     });
//                     c.more && 1 === a ? (this.elements.unshift(async () => {
//                         try {
//                             const n = await this.fetch_all_rows(t, e, r, c.rows[c.rows.length - 1][r], i, a, o);
//                             n.length > 0 && n.shift(), s(c.rows.concat(n))
//                         } catch (t) {
//                             u(t)
//                         }
//                     }), this.dequeue()) : s(c.rows)
//                 }), this.dequeue()
//             })
//         }
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.ParserTypes = void 0;
//     const i = n(r(33)),
//         a = r(34),
//         o = n(r(35)),
//         s = n(r(36)),
//         u = n(r(38)),
//         c = n(r(39)),
//         l = n(r(40));
//     e.ParserTypes = {
//         int8: new l.default(1, !1),
//         int16: new l.default(2, !1),
//         int32: new l.default(4, !1),
//         int64: new l.default(8, !1),
//         uint8: new l.default(1, !0),
//         uint16: new l.default(2, !0),
//         uint32: new l.default(4, !0),
//         uint64: new l.default(8, !0),
//         fixed8: new o.default(1),
//         fixed16: new o.default(2),
//         fixed32: new o.default(4),
//         fixed64: new o.default(8),
//         bool: new i.default,
//         bytes: new a.ByteParser,
//         string: new c.default,
//         image: new c.default,
//         ipfs: new u.default,
//         float: new s.default(!1),
//         double: new s.default(!0)
//     }
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(10));
//     class a extends i.default {
//         constructor() {
//             super(1)
//         }
//         deserialize(t) {
//             return 1 === super.deserialize(t)[0]
//         }
//         serialize(t) {
//             return super.serialize(new Uint8Array([t ? 1 : 0]))
//         }
//     }
//     e.default = a
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     }), e.ByteParser = void 0;
//     const i = n(r(11));
//     class a extends i.default {
//         deserialize(t) {
//             return super.deserialize(t)
//         }
//         serialize(t) {
//             return super.serialize(t)
//         }
//     }
//     e.ByteParser = a
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(6)),
//         a = n(r(10));
//     class o extends a.default {
//         deserialize(t) {
//             const e = super.deserialize(t).reverse();
//             let r = i.default(0);
//             for (const t of e) r = r.shiftLeft(8), r = r.plus(t);
//             return this.size <= 6 ? r.toJSNumber() : r.toString()
//         }
//         serialize(t) {
//             let e = i.default(t);
//             const r = [];
//             for (let t = 0; t < this.size; t++) r.push(e.and(255).toJSNumber()), e = e.shiftRight(8);
//             return super.serialize(new Uint8Array(r))
//         }
//     }
//     e.default = o
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(10)),
//         a = r(37);
//     class o extends i.default {
//         constructor(t) {
//             super(t ? 8 : 4), this.isDouble = t
//         }
//         deserialize(t) {
//             return this.isDouble ? a.readDoubleLE(super.deserialize(t)) : a.readFloatLE(super.deserialize(t))
//         }
//         serialize(t) {
//             let e = [];
//             return this.isDouble ? (a.writeDoubleLE(e, t), super.serialize(new Uint8Array(e))) : (a.writeFloatLE(e, t), super.serialize(new Uint8Array(e)))
//         }
//     }
//     e.default = o
// }, function(t, e, r) {
    
//     var n, i, a, o, s, u, c, l, f, p, h, d, y = !1;

//     function m(t, e, r) {
//         var n = t[e++],
//             i = t[e++],
//             a = t[e++],
//             o = t[e];
//         return "bige" === r ? 256 * (256 * (256 * n + i) + a) + o : 256 * (256 * (256 * o + a) + i) + n
//     }

//     function v(t, e, r, n) {
//         var i = e >>> 24 & 255,
//             a = e >> 16 & 255,
//             o = e >> 8 & 255,
//             s = 255 & e;
//         "bige" === n ? (t[r++] = i, t[r++] = a, t[r++] = o, t[r] = s) : (t[r++] = s, t[r++] = o, t[r++] = a, t[r] = i)
//     }

//     function w(t, e, r, n, i) {
//         "bige" === i ? (v(t, e, n, i), v(t, r, n + 4, i)) : (v(t, r, n, i), v(t, e, n + 4, i))
//     }
//     "function" == typeof Float32Array && (f = new Float32Array(1), p = new Uint8Array(f.buffer), f[0] = -1, y = 0 === p[3], n = function(t, e) {
//         return (e = e || 0) < 0 || e + 4 > t.length ? 0 : (p[0] = t[e++], p[1] = t[e++], p[2] = t[e++], p[3] = t[e], f[0])
//     }, a = function(t, e) {
//         return (e = e || 0) < 0 || e + 4 > t.length ? 0 : (p[3] = t[e++], p[2] = t[e++], p[1] = t[e++], p[0] = t[e], f[0])
//     }, i = function(t, e, r) {
//         r = r || 0, f[0] = e, t[r++] = p[0], t[r++] = p[1], t[r++] = p[2], t[r] = p[3]
//     }, o = function(t, e, r) {
//         r = r || 0, f[0] = e, t[r++] = p[3], t[r++] = p[2], t[r++] = p[1], t[r] = p[0]
//     }), "function" == typeof Float64Array && (h = new Float64Array(1), d = new Uint8Array(h.buffer), s = function(t, e) {
//         return (e = e || 0) < 0 || e + 8 > t.length ? 0 : (d[0] = t[e + 0], d[1] = t[e + 1], d[2] = t[e + 2], d[3] = t[e + 3], d[4] = t[e + 4], d[5] = t[e + 5], d[6] = t[e + 6], d[7] = t[e + 7], h[0])
//     }, c = function(t, e) {
//         return (e = e || 0) < 0 || e + 8 > t.length ? 0 : (d[7] = t[e + 0], d[6] = t[e + 1], d[5] = t[e + 2], d[4] = t[e + 3], d[3] = t[e + 4], d[2] = t[e + 5], d[1] = t[e + 6], d[0] = t[e + 7], h[0])
//     }, u = function(t, e, r) {
//         r = r || 0, h[0] = e, t[r + 0] = d[0], t[r + 1] = d[1], t[r + 2] = d[2], t[r + 3] = d[3], t[r + 4] = d[4], t[r + 5] = d[5], t[r + 6] = d[6], t[r + 7] = d[7]
//     }, l = function(t, e, r) {
//         r = r || 0, h[0] = e, t[r + 0] = d[7], t[r + 1] = d[6], t[r + 2] = d[5], t[r + 3] = d[4], t[r + 4] = d[3], t[r + 5] = d[2], t[r + 6] = d[1], t[r + 7] = d[0]
//     });
//     for (var _ = new Array, g = 0; g < 1200; g++) _[g] = Math.pow(2, g);
//     var b = new Array;
//     for (g = 0; g < 1200; g++) b[g] = Math.pow(2, -g);

//     function A(t) {
//         return t >= 0 ? _[t] : b[-t]
//     }
//     A(-1023);

//     function E(t, e, r) {
//         var n, i, a = m(t, e, r),
//             o = m(t, e + 4, r);
//         "bige" === r ? (n = a, i = o) : (n = o, i = a);
//         var s = 4294967296 * (1048575 & n) + i,
//             u = (2146435072 & n) >>> 20;
//         return (n >> 31 || 1) * (0 === u ? s ? s * A(-1074) : 0 : u < 2047 ? s >= 0 ? (1 + 2220446049250313e-31 * s) * A(u - 1023) : 0 : s ? NaN : 1 / 0)
//     }
//     var O = Math.pow(2, -23),
//         M = Math.pow(2, -127);

//     function S(t, e, r) {
//         var n = m(t, e, r),
//             i = 8388607 & n,
//             a = (2139095040 & n) >>> 23;
//         return (n >> 31 || 1) * (0 === a ? i ? i * O * 2 * M : 0 : a < 255 ? (1 + i * O) * A(a - 127) : i ? NaN : 1 / 0)
//     }
//     var x = {
//         exp: 0,
//         mant: 0
//     };

//     function P(t) {
//         var e = 0;
//         return t >= 2 ? (t *= A(-(e = j(1, t)))) >= 2 && (t /= 2, e += 1) : t < 1 && ((e = j(t, 2)) <= 1023 ? t *= A(e) : (t *= A(e - 100), t *= A(100)), e = -e), x.exp = e, x.mant = t, x
//     }
//     var z = Math.pow(2, 192);

//     function j(t, e) {
//         for (var r = 0; t * z < e;) t *= z, r += 192;
//         for (; 0x10000000000000000 * t < e;) t *= 0x10000000000000000, r += 64;
//         for (; 65536 * t < e;) t *= 65536, r += 16;
//         for (; 64 * t < e;) t *= 64, r += 6;
//         for (; 2 * t < e;) t *= 2, r += 1;
//         return r
//     }

//     function k(t, e) {
//         return (t *= e) - Math.floor(t) != .5 || 1 & t ? t + .5 : t
//     }

//     function q(t, e, r, n) {
//         var i, a = 0;
//         e < 0 && (a = 2147483648, e = -e), e && e < 1 / 0 ? ((i = P(e)).exp += 127, i.exp <= 0 ? i.exp <= -25 ? (i.mant = 0, i.exp = 0) : (i.mant = k(i.mant, A(22 + i.exp)), i.exp = 0, i.mant >= 8388608 && (i.mant -= 8388608, i.exp += 1)) : (i.mant = k(i.mant - 1, 8388608), i.mant >= 8388608 && (i.mant -= 8388608, i.exp += 1), i.exp > 254 && (i.mant = 0, i.exp = 255)), v(t, a | i.exp << 23 | i.mant, r, n)) : v(t, 0 === e ? 1 / e < 0 ? 2147483648 : 0 : e === 1 / 0 ? 2139095040 | a : 2143289344, r, n)
//     }
//     new Uint8Array(8);
//     var D = Math.pow(2, 52);

//     function N(t, e, r, n) {
//         var i, a, o, s = 0;
//         e < 0 && (s = 2147483648, e = -e), e && e < 1 / 0 ? ((i = P(e)).exp += 1023, i.exp <= 0 ? (i.mant *= A(51 + i.exp), i.exp = 0) : i.mant = (i.mant - 1) * D, w(t, a = s | i.exp << 20 | i.mant / 4294967296, o = i.mant >>> 0, r, n)) : (0 === e ? (a = 1 / e < 0 ? 2147483648 : 0, o = 0) : e === 1 / 0 ? (a = s + 2146435072, o = 0) : (a = 2146959360, o = 0), w(t, a, o, r, n))
//     }(function e() {
//         var r = t.exports || this;
//         r.readWord = m, r.writeWord = v, r.writeDoubleWord = w, r.readFloat = S, r.writeFloat = q, r.readDouble = E, r.writeDouble = N, r._useFloatArray = function(t) {
//             r._usingFloatArray = t, t ? ("full" == t && (r.readFloatLE = y ? a : n), r.writeFloatLE = y ? o : i, "full" == t && (r.readFloatBE = y ? n : a), r.writeFloatBE = y ? i : o, r.readDoubleLE = y ? c : s, r.writeDoubleLE = y ? l : u, r.readDoubleBE = y ? s : c, r.writeDoubleBE = y ? u : l) : (r._usingFloatArray = "", r.readFloatLE = function(t, e) {
//                 return r.readFloat(t, e || 0, "le")
//             }, r.writeFloatLE = function(t, e, n) {
//                 r.writeFloat(t, e, n || 0, "le")
//             }, r.readFloatBE = function(t, e) {
//                 return r.readFloat(t, e || 0, "bige")
//             }, r.writeFloatBE = function(t, e, n) {
//                 r.writeFloat(t, e, n || 0, "bige")
//             }, r.readDoubleLE = function(t, e) {
//                 return r.readDouble(t, e || 0, "le")
//             }, r.writeDoubleLE = function(t, e, n) {
//                 r.writeDouble(t, e, n || 0, "le")
//             }, r.readDoubleBE = function(t, e) {
//                 return r.readDouble(t, e || 0, "bige")
//             }, r.writeDoubleBE = function(t, e, n) {
//                 r.writeDouble(t, e, n || 0, "bige")
//             })
//         }, r._getBigeCpu = function() {
//             return y
//         }, r._setBigeCpu = function(t) {
//             y = t
//         }, r._useFloatArray(!1), r._useFloatArray(n && s && "fastest"), e.prototype = r
//     }).call(this)
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = r(0),
//         a = n(r(11));
//     class o extends a.default {
//         deserialize(t) {
//             return i.base58_encode(super.deserialize(t))
//         }
//         serialize(t) {
//             return super.serialize(i.base58_decode(t))
//         }
//     }
//     e.default = o
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(11));
//     class a extends i.default {
//         deserialize(t) {
//             return (new TextDecoder).decode(super.deserialize(t))
//         }
//         serialize(t) {
//             return super.serialize((new TextEncoder).encode(t))
//         }
//     }
//     e.default = a
// }, function(t, e, r) {
    
//     var n = this && this.__importDefault || function(t) {
//         return t && t.__esModule ? t : {
//             default: t
//         }
//     };
//     Object.defineProperty(e, "__esModule", {
//         value: !0
//     });
//     const i = n(r(6)),
//         a = n(r(3)),
//         o = n(r(1)),
//         s = r(0);
//     e.default = class {
//         constructor(t, e) {
//             this.size = t, this.unsigned = e
//         }
//         deserialize(t) {
//             let e = s.varint_decode(t);
//             if (this.unsigned || (e = s.zigzag_decode(e)), e.greaterOrEquals(i.default(2).pow(8 * this.size - (this.unsigned ? 0 : 1)))) throw new a.default("number '" + e.toString() + "' too large for given type");
//             return this.size <= 6 ? e.toJSNumber() : e.toString()
//         }
//         serialize(t) {
//             let e = i.default(t);
//             if (e.greaterOrEquals(i.default(2).pow(8 * this.size - (this.unsigned ? 0 : 1)))) throw new o.default("number '" + e.toString() + "' too large for given type");
//             return this.unsigned || (e = s.zigzag_encode(e)), s.varint_encode(e)
//         }
//     }
// }]);