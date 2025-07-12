
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.0";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/prerender-manifest.js
var require_prerender_manifest = __commonJS({
  ".next/prerender-manifest.js"() {
    "use strict";
    self.__PRERENDER_MANIFEST = '{"version":4,"routes":{"/api/workflows/cron":{"initialHeaders":{"content-type":"application/json","x-next-cache-tags":"_N_T_/layout,_N_T_/api/layout,_N_T_/api/workflows/layout,_N_T_/api/workflows/cron/layout,_N_T_/api/workflows/cron/route,_N_T_/api/workflows/cron"},"experimentalBypassFor":[{"type":"header","key":"Next-Action"},{"type":"header","key":"content-type","value":"multipart/form-data;.*"}],"initialRevalidateSeconds":false,"srcRoute":"/api/workflows/cron","dataRoute":null},"/favicon.ico":{"initialHeaders":{"cache-control":"public, max-age=0, must-revalidate","content-type":"image/x-icon","x-next-cache-tags":"_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico"},"experimentalBypassFor":[{"type":"header","key":"Next-Action"},{"type":"header","key":"content-type","value":"multipart/form-data;.*"}],"initialRevalidateSeconds":false,"srcRoute":"/favicon.ico","dataRoute":null}},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}';
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o].call(i.exports, i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], u = true, f = 0; f < o.length; f++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < a && (a = i));
            if (u) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, u] = o2, f = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < l.length; f++) i = l[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 67: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 480: () => {
    }, 599: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => ib });
      var i, a, s, o, l, c, u, d, h, p, f, g, m, v, y, b, w, _, S, k, x, T, E, C, O, P, R, I, N, A, M, U = {};
      async function L() {
        let e10 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e10) try {
          await e10();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      r.r(U), r.d(U, { config: () => ig, default: () => ip });
      let D = null;
      function j() {
        return D || (D = L()), D;
      }
      function q(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Error(q(e10));
        }, construct() {
          throw Error(q(e10));
        }, apply(r10, n10, i2) {
          if ("function" == typeof i2[0]) return i2[0](t10);
          throw Error(q(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), j();
      class B extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class H extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class $ extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      function K(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i2] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...function(e11) {
          var t11, r11, n11, i3, a2, s2 = [], o2 = 0;
          function l2() {
            for (; o2 < e11.length && /\s/.test(e11.charAt(o2)); ) o2 += 1;
            return o2 < e11.length;
          }
          for (; o2 < e11.length; ) {
            for (t11 = o2, a2 = false; l2(); ) if ("," === (r11 = e11.charAt(o2))) {
              for (n11 = o2, o2 += 1, l2(), i3 = o2; o2 < e11.length && "=" !== (r11 = e11.charAt(o2)) && ";" !== r11 && "," !== r11; ) o2 += 1;
              o2 < e11.length && "=" === e11.charAt(o2) ? (a2 = true, o2 = i3, s2.push(e11.substring(t11, n11)), t11 = o2) : o2 = n11 + 1;
            } else o2 += 1;
            (!a2 || o2 >= e11.length) && s2.push(e11.substring(t11, e11.length));
          }
          return s2;
        }(i2)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i2;
        return t10;
      }
      function z(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      let F = Symbol("response"), V = Symbol("passThrough"), J = Symbol("waitUntil");
      class W {
        constructor(e10) {
          this[J] = [], this[V] = false;
        }
        respondWith(e10) {
          this[F] || (this[F] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[V] = true;
        }
        waitUntil(e10) {
          this[J].push(e10);
        }
      }
      class G extends W {
        constructor(e10) {
          super(e10.request), this.sourcePage = e10.page;
        }
        get request() {
          throw new B({ page: this.sourcePage });
        }
        respondWith() {
          throw new B({ page: this.sourcePage });
        }
      }
      function X(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function Q(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function Y(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i2 } = Q(e10);
        return "" + t10 + r10 + n10 + i2;
      }
      function Z(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i2 } = Q(e10);
        return "" + r10 + t10 + n10 + i2;
      }
      function ee(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = Q(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function et(e10, t10) {
        let r10;
        let n10 = e10.split("/");
        return (t10 || []).some((t11) => !!n10[1] && n10[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, n10.splice(1, 1), e10 = n10.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let er = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function en(e10, t10) {
        return new URL(String(e10).replace(er, "localhost"), t10 && String(t10).replace(er, "localhost"));
      }
      let ei = Symbol("NextURLInternal");
      class ea {
        constructor(e10, t10, r10) {
          let n10, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i2 = r10 || {}) : i2 = r10 || t10 || {}, this[ei] = { url: en(e10, n10 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i2;
          let a2 = function(e11, t11) {
            var r11, n11;
            let { basePath: i3, i18n: a3, trailingSlash: s3 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : s3 };
            i3 && ee(o3.pathname, i3) && (o3.pathname = function(e12, t12) {
              if (!ee(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, i3), o3.basePath = i3);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              o3.buildId = r12, l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (a3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : et(o3.pathname, a3.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (n11 = e12.pathname) ? n11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : et(l2, a3.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[ei].url.pathname, { nextConfig: this[ei].options.nextConfig, parseData: true, i18nProvider: this[ei].options.i18nProvider }), s2 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[ei].url, this[ei].options.headers);
          this[ei].domainLocale = this[ei].options.i18nProvider ? this[ei].options.i18nProvider.detectDomainLocale(s2) : function(e11, t11, r11) {
            if (e11) for (let a3 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, i3;
              if (t11 === (null == (n11 = a3.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === a3.defaultLocale.toLowerCase() || (null == (i3 = a3.locales) ? void 0 : i3.some((e12) => e12.toLowerCase() === r11))) return a3;
            }
          }(null == (t10 = this[ei].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, s2);
          let o2 = (null == (r10 = this[ei].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i2 = this[ei].options.nextConfig) ? void 0 : null == (n10 = i2.i18n) ? void 0 : n10.defaultLocale);
          this[ei].url.pathname = a2.pathname, this[ei].defaultLocale = o2, this[ei].basePath = a2.basePath ?? "", this[ei].buildId = a2.buildId, this[ei].locale = a2.locale ?? o2, this[ei].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i2 = e11.toLowerCase();
            return !n10 && (ee(i2, "/api") || ee(i2, "/" + t11.toLowerCase())) ? e11 : Y(e11, "/" + t11);
          }((e10 = { basePath: this[ei].basePath, buildId: this[ei].buildId, defaultLocale: this[ei].options.forceLocale ? void 0 : this[ei].defaultLocale, locale: this[ei].locale, pathname: this[ei].url.pathname, trailingSlash: this[ei].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = X(t10)), e10.buildId && (t10 = Z(Y(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = Y(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : Z(t10, "/") : X(t10);
        }
        formatSearch() {
          return this[ei].url.search;
        }
        get buildId() {
          return this[ei].buildId;
        }
        set buildId(e10) {
          this[ei].buildId = e10;
        }
        get locale() {
          return this[ei].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[ei].locale || !(null == (r10 = this[ei].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[ei].locale = e10;
        }
        get defaultLocale() {
          return this[ei].defaultLocale;
        }
        get domainLocale() {
          return this[ei].domainLocale;
        }
        get searchParams() {
          return this[ei].url.searchParams;
        }
        get host() {
          return this[ei].url.host;
        }
        set host(e10) {
          this[ei].url.host = e10;
        }
        get hostname() {
          return this[ei].url.hostname;
        }
        set hostname(e10) {
          this[ei].url.hostname = e10;
        }
        get port() {
          return this[ei].url.port;
        }
        set port(e10) {
          this[ei].url.port = e10;
        }
        get protocol() {
          return this[ei].url.protocol;
        }
        set protocol(e10) {
          this[ei].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[ei].url = en(e10), this.analyze();
        }
        get origin() {
          return this[ei].url.origin;
        }
        get pathname() {
          return this[ei].url.pathname;
        }
        set pathname(e10) {
          this[ei].url.pathname = e10;
        }
        get hash() {
          return this[ei].url.hash;
        }
        set hash(e10) {
          this[ei].url.hash = e10;
        }
        get search() {
          return this[ei].url.search;
        }
        set search(e10) {
          this[ei].url.search = e10;
        }
        get password() {
          return this[ei].url.password;
        }
        set password(e10) {
          this[ei].url.password = e10;
        }
        get username() {
          return this[ei].url.username;
        }
        set username(e10) {
          this[ei].url.username = e10;
        }
        get basePath() {
          return this[ei].basePath;
        }
        set basePath(e10) {
          this[ei].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new ea(String(this), this[ei].options);
        }
      }
      var es = r(701);
      let eo = Symbol("internal request");
      class el extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          z(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new ea(r10, { headers: K(this.headers), nextConfig: t10.nextConfig });
          this[eo] = { cookies: new es.q(this.headers), geo: t10.geo || {}, ip: t10.ip, nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[eo].cookies;
        }
        get geo() {
          return this[eo].geo;
        }
        get ip() {
          return this[eo].ip;
        }
        get nextUrl() {
          return this[eo].nextUrl;
        }
        get page() {
          throw new H();
        }
        get ua() {
          throw new $();
        }
        get url() {
          return this[eo].url;
        }
      }
      let ec = Symbol("internal response"), eu = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ed(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n10, i2] of e10.request.headers) t10.set("x-middleware-request-" + n10, i2), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eh extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10), this[ec] = { cookies: new es.n(this.headers), url: t10.url ? new ea(t10.url, { headers: K(this.headers), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ec].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eh(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eu.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n10 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == n10 ? void 0 : n10.headers);
          return i2.set("Location", z(e10)), new eh(null, { ...n10, headers: i2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", z(e10)), ed(t10, r10), new eh(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ed(e10, t10), new eh(null, { ...e10, headers: t10 });
        }
      }
      function ep(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i2 = r10.protocol + "//" + r10.host;
        return n10.protocol + "//" + n10.host === i2 ? n10.toString().replace(i2, "") : n10.toString();
      }
      let ef = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]];
      r(387);
      let eg = { client: "client", server: "server", edgeServer: "edge-server" };
      eg.client, eg.server, eg.edgeServer, Symbol("polyfills");
      let em = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], ev = ["__nextDataReq"], ey = "nxtP", eb = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      ({ ...eb, GROUP: { serverOnly: [eb.reactServerComponents, eb.actionBrowser, eb.appMetadataRoute, eb.appRouteHandler, eb.instrument], clientOnly: [eb.serverSideRendering, eb.appPagesBrowser], nonClientServerTarget: [eb.middleware, eb.api], app: [eb.reactServerComponents, eb.actionBrowser, eb.appMetadataRoute, eb.appRouteHandler, eb.serverSideRendering, eb.appPagesBrowser, eb.shared, eb.instrument] } });
      var ew = r(226), e_ = r(991);
      !function(e10) {
        e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404";
      }(i || (i = {})), function(e10) {
        e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents";
      }(a || (a = {})), function(e10) {
        e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer";
      }(s || (s = {})), function(e10) {
        e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch";
      }(o || (o = {})), (l || (l = {})).startServer = "startServer.startServer", function(e10) {
        e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult";
      }(c || (c = {})), function(e10) {
        e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch";
      }(u || (u = {})), (d || (d = {})).executeRoute = "Router.executeRoute", (h || (h = {})).runHandler = "Node.runHandler", (p || (p = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e10) {
        e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport";
      }(f || (f = {})), (g || (g = {})).execute = "Middleware.execute";
      let eS = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ek = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: ex, propagation: eT, trace: eE, SpanStatusCode: eC, SpanKind: eO, ROOT_CONTEXT: eP } = n = r(692), eR = (e10) => null !== e10 && "object" == typeof e10 && "function" == typeof e10.then, eI = (e10, t10) => {
        (null == t10 ? void 0 : t10.bubble) === true ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eC.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eN = /* @__PURE__ */ new Map(), eA = n.createContextKey("next.rootSpanId"), eM = 0, eU = () => eM++;
      class eL {
        getTracerInstance() {
          return eE.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ex;
        }
        getActiveScopeSpan() {
          return eE.getSpan(null == ex ? void 0 : ex.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = ex.active();
          if (eE.getSpanContext(n10)) return t10();
          let i2 = eT.extract(n10, e10, r10);
          return ex.with(i2, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, i2] = e10, { fn: a2, options: s2 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: i2, options: { ...n10 } }, o2 = s2.spanName ?? r10;
          if (!eS.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || s2.hideSpan) return a2();
          let l2 = this.getSpanContext((null == s2 ? void 0 : s2.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t10 = eE.getSpanContext(l2)) ? void 0 : t10.isRemote) && (c2 = true) : (l2 = (null == ex ? void 0 : ex.active()) ?? eP, c2 = true);
          let u2 = eU();
          return s2.attributes = { "next.span_name": o2, "next.span_type": r10, ...s2.attributes }, ex.with(l2.setValue(eA, u2), () => this.getTracerInstance().startActiveSpan(o2, s2, (e11) => {
            let t11 = "performance" in globalThis ? globalThis.performance.now() : void 0, n11 = () => {
              eN.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ek.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            c2 && eN.set(u2, new Map(Object.entries(s2.attributes ?? {})));
            try {
              if (a2.length > 1) return a2(e11, (t13) => eI(e11, t13));
              let t12 = a2(e11);
              if (eR(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw eI(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw eI(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eS.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, s2 = arguments[a2];
            if ("function" != typeof s2) return t10.trace(r10, e11, () => i2.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(ex.active(), s2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eE.setSpan(ex.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ex.active().getValue(eA);
          return eN.get(e10);
        }
      }
      let eD = (() => {
        let e10 = new eL();
        return () => e10;
      })(), ej = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ej);
      class eq {
        constructor(e10, t10, r10, n10) {
          var i2;
          let a2 = e10 && function(e11, t11) {
            let r11 = ew.h.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, s2 = null == (i2 = r10.get(ej)) ? void 0 : i2.value;
          this.isEnabled = !!(!a2 && s2 && e10 && s2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: ej, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: ej, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      let eB = { wrap(e10, { req: t10, res: r10, renderOpts: n10 }, i2) {
        let a2;
        function s2(e11) {
          r10 && r10.setHeader("Set-Cookie", e11);
        }
        n10 && "previewProps" in n10 && (a2 = n10.previewProps);
        let o2 = {}, l2 = { get headers() {
          return o2.headers || (o2.headers = function(e11) {
            let t11 = ew.h.from(e11);
            for (let e12 of ef) t11.delete(e12.toString().toLowerCase());
            return ew.h.seal(t11);
          }(t10.headers)), o2.headers;
        }, get cookies() {
          return o2.cookies || (o2.cookies = function(e11) {
            let t11 = new es.q(ew.h.from(e11));
            return e_.Qb.seal(t11);
          }(t10.headers)), o2.cookies;
        }, get mutableCookies() {
          return o2.mutableCookies || (o2.mutableCookies = function(e11, t11) {
            let r11 = new es.q(ew.h.from(e11));
            return e_.vr.wrap(r11, t11);
          }(t10.headers, (null == n10 ? void 0 : n10.onUpdateCookies) || (r10 ? s2 : void 0))), o2.mutableCookies;
        }, get draftMode() {
          return o2.draftMode || (o2.draftMode = new eq(a2, t10, this.cookies, this.mutableCookies)), o2.draftMode;
        }, reactLoadableManifest: (null == n10 ? void 0 : n10.reactLoadableManifest) || {}, assetPrefix: (null == n10 ? void 0 : n10.assetPrefix) || "" };
        return e10.run(l2, i2, l2);
      } };
      var eH = r(369);
      class e$ extends el {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new B({ page: this.sourcePage });
        }
        respondWith() {
          throw new B({ page: this.sourcePage });
        }
        waitUntil() {
          throw new B({ page: this.sourcePage });
        }
      }
      let eK = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ez = (e10, t10) => eD().withPropagatedContext(e10.headers, t10, eK), eF = false;
      async function eV(e10) {
        let t10, n10;
        !function() {
          if (!eF && (eF = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(311);
            e11(), ez = t11(ez);
          }
        }(), await j();
        let i2 = void 0 !== self.__BUILD_MANIFEST, a2 = "string" == typeof self.__PRERENDER_MANIFEST ? JSON.parse(self.__PRERENDER_MANIFEST) : void 0;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let s2 = new ea(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...s2.searchParams.keys()]) {
          let t11 = s2.searchParams.getAll(e11);
          if (e11 !== ey && e11.startsWith(ey)) {
            let r10 = e11.substring(ey.length);
            for (let e12 of (s2.searchParams.delete(r10), t11)) s2.searchParams.append(r10, e12);
            s2.searchParams.delete(e11);
          }
        }
        let o2 = s2.buildId;
        s2.buildId = "";
        let l2 = e10.request.headers["x-nextjs-data"];
        l2 && "/index" === s2.pathname && (s2.pathname = "/");
        let c2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), u2 = /* @__PURE__ */ new Map();
        if (!i2) for (let e11 of ef) {
          let t11 = e11.toString().toLowerCase();
          c2.get(t11) && (u2.set(t11, c2.get(t11)), c2.delete(t11));
        }
        let d2 = new e$({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, n11 = r10 ? new URL(e11) : e11;
          for (let e12 of em) n11.searchParams.delete(e12);
          if (t11) for (let e12 of ev) n11.searchParams.delete(e12);
          return r10 ? n11.toString() : n11;
        }(s2, true).toString(), init: { body: e10.request.body, geo: e10.request.geo, headers: c2, ip: e10.request.ip, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        l2 && Object.defineProperty(d2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: { previewModeId: "development-id" } }) }));
        let h2 = new G({ request: d2, page: e10.page });
        if ((t10 = await ez(d2, () => "/middleware" === e10.page || "/src/middleware" === e10.page ? eD().trace(g.execute, { spanName: `middleware ${d2.method} ${d2.nextUrl.pathname}`, attributes: { "http.target": d2.nextUrl.pathname, "http.method": d2.method } }, () => eB.wrap(eH.O, { req: d2, renderOpts: { onUpdateCookies: (e11) => {
          n10 = e11;
        }, previewProps: (null == a2 ? void 0 : a2.preview) || { previewModeId: "development-id", previewModeEncryptionKey: "", previewModeSigningKey: "" } } }, () => e10.handler(d2, h2))) : e10.handler(d2, h2))) && !(t10 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t10 && n10 && t10.headers.set("set-cookie", n10);
        let p2 = null == t10 ? void 0 : t10.headers.get("x-middleware-rewrite");
        if (t10 && p2 && !i2) {
          let r10 = new ea(p2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          r10.host === d2.nextUrl.host && (r10.buildId = o2 || r10.buildId, t10.headers.set("x-middleware-rewrite", String(r10)));
          let n11 = ep(String(r10), String(s2));
          l2 && t10.headers.set("x-nextjs-rewrite", n11);
        }
        let f2 = null == t10 ? void 0 : t10.headers.get("Location");
        if (t10 && f2 && !i2) {
          let r10 = new ea(f2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t10 = new Response(t10.body, t10), r10.host === d2.nextUrl.host && (r10.buildId = o2 || r10.buildId, t10.headers.set("Location", String(r10))), l2 && (t10.headers.delete("Location"), t10.headers.set("x-nextjs-redirect", ep(String(r10), String(s2))));
        }
        let m2 = t10 || eh.next(), v2 = m2.headers.get("x-middleware-override-headers"), y2 = [];
        if (v2) {
          for (let [e11, t11] of u2) m2.headers.set(`x-middleware-request-${e11}`, t11), y2.push(e11);
          y2.length > 0 && m2.headers.set("x-middleware-override-headers", v2 + "," + y2.join(","));
        }
        return { response: m2, waitUntil: Promise.all(h2[J]), fetchMetrics: d2.fetchMetrics };
      }
      function eJ(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function eW(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      let eG = { toRegexp: (e10) => {
        try {
          return function e11(t10, r10, n10) {
            var i2;
            return t10 instanceof RegExp ? function(e12, t11) {
              if (!t11) return e12;
              for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, n11 = 0, i3 = r11.exec(e12.source); i3; ) t11.push({ name: i3[1] || n11++, prefix: "", suffix: "", modifier: "", pattern: "" }), i3 = r11.exec(e12.source);
              return e12;
            }(t10, r10) : Array.isArray(t10) ? (i2 = t10.map(function(t11) {
              return e11(t11, r10, n10).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), eW(n10))) : function(e12, t11, r11) {
              void 0 === r11 && (r11 = {});
              for (var n11 = r11.strict, i3 = void 0 !== n11 && n11, a2 = r11.start, s2 = r11.end, o2 = r11.encode, l2 = void 0 === o2 ? function(e13) {
                return e13;
              } : o2, c2 = r11.delimiter, u2 = r11.endsWith, d2 = "[".concat(eJ(void 0 === u2 ? "" : u2), "]|$"), h2 = "[".concat(eJ(void 0 === c2 ? "/#?" : c2), "]"), p2 = void 0 === a2 || a2 ? "^" : "", f2 = 0; f2 < e12.length; f2++) {
                var g2 = e12[f2];
                if ("string" == typeof g2) p2 += eJ(l2(g2));
                else {
                  var m2 = eJ(l2(g2.prefix)), v2 = eJ(l2(g2.suffix));
                  if (g2.pattern) {
                    if (t11 && t11.push(g2), m2 || v2) {
                      if ("+" === g2.modifier || "*" === g2.modifier) {
                        var y2 = "*" === g2.modifier ? "?" : "";
                        p2 += "(?:".concat(m2, "((?:").concat(g2.pattern, ")(?:").concat(v2).concat(m2, "(?:").concat(g2.pattern, "))*)").concat(v2, ")").concat(y2);
                      } else p2 += "(?:".concat(m2, "(").concat(g2.pattern, ")").concat(v2, ")").concat(g2.modifier);
                    } else "+" === g2.modifier || "*" === g2.modifier ? p2 += "((?:".concat(g2.pattern, ")").concat(g2.modifier, ")") : p2 += "(".concat(g2.pattern, ")").concat(g2.modifier);
                  } else p2 += "(?:".concat(m2).concat(v2, ")").concat(g2.modifier);
                }
              }
              if (void 0 === s2 || s2) i3 || (p2 += "".concat(h2, "?")), p2 += r11.endsWith ? "(?=".concat(d2, ")") : "$";
              else {
                var b2 = e12[e12.length - 1], w2 = "string" == typeof b2 ? h2.indexOf(b2[b2.length - 1]) > -1 : void 0 === b2;
                i3 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), w2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
              }
              return new RegExp(p2, eW(r11));
            }(function(e12, t11) {
              void 0 === t11 && (t11 = {});
              for (var r11 = function(e13) {
                for (var t12 = [], r12 = 0; r12 < e13.length; ) {
                  var n12 = e13[r12];
                  if ("*" === n12 || "+" === n12 || "?" === n12) {
                    t12.push({ type: "MODIFIER", index: r12, value: e13[r12++] });
                    continue;
                  }
                  if ("\\" === n12) {
                    t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e13[r12++] });
                    continue;
                  }
                  if ("{" === n12) {
                    t12.push({ type: "OPEN", index: r12, value: e13[r12++] });
                    continue;
                  }
                  if ("}" === n12) {
                    t12.push({ type: "CLOSE", index: r12, value: e13[r12++] });
                    continue;
                  }
                  if (":" === n12) {
                    for (var i4 = "", a3 = r12 + 1; a3 < e13.length; ) {
                      var s3 = e13.charCodeAt(a3);
                      if (s3 >= 48 && s3 <= 57 || s3 >= 65 && s3 <= 90 || s3 >= 97 && s3 <= 122 || 95 === s3) {
                        i4 += e13[a3++];
                        continue;
                      }
                      break;
                    }
                    if (!i4) throw TypeError("Missing parameter name at ".concat(r12));
                    t12.push({ type: "NAME", index: r12, value: i4 }), r12 = a3;
                    continue;
                  }
                  if ("(" === n12) {
                    var o3 = 1, l3 = "", a3 = r12 + 1;
                    if ("?" === e13[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                    for (; a3 < e13.length; ) {
                      if ("\\" === e13[a3]) {
                        l3 += e13[a3++] + e13[a3++];
                        continue;
                      }
                      if (")" === e13[a3]) {
                        if (0 == --o3) {
                          a3++;
                          break;
                        }
                      } else if ("(" === e13[a3] && (o3++, "?" !== e13[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                      l3 += e13[a3++];
                    }
                    if (o3) throw TypeError("Unbalanced pattern at ".concat(r12));
                    if (!l3) throw TypeError("Missing pattern at ".concat(r12));
                    t12.push({ type: "PATTERN", index: r12, value: l3 }), r12 = a3;
                    continue;
                  }
                  t12.push({ type: "CHAR", index: r12, value: e13[r12++] });
                }
                return t12.push({ type: "END", index: r12, value: "" }), t12;
              }(e12), n11 = t11.prefixes, i3 = void 0 === n11 ? "./" : n11, a2 = "[^".concat(eJ(t11.delimiter || "/#?"), "]+?"), s2 = [], o2 = 0, l2 = 0, c2 = "", u2 = function(e13) {
                if (l2 < r11.length && r11[l2].type === e13) return r11[l2++].value;
              }, d2 = function(e13) {
                var t12 = u2(e13);
                if (void 0 !== t12) return t12;
                var n12 = r11[l2], i4 = n12.type, a3 = n12.index;
                throw TypeError("Unexpected ".concat(i4, " at ").concat(a3, ", expected ").concat(e13));
              }, h2 = function() {
                for (var e13, t12 = ""; e13 = u2("CHAR") || u2("ESCAPED_CHAR"); ) t12 += e13;
                return t12;
              }; l2 < r11.length; ) {
                var p2 = u2("CHAR"), f2 = u2("NAME"), g2 = u2("PATTERN");
                if (f2 || g2) {
                  var m2 = p2 || "";
                  -1 === i3.indexOf(m2) && (c2 += m2, m2 = ""), c2 && (s2.push(c2), c2 = ""), s2.push({ name: f2 || o2++, prefix: m2, suffix: "", pattern: g2 || a2, modifier: u2("MODIFIER") || "" });
                  continue;
                }
                var v2 = p2 || u2("ESCAPED_CHAR");
                if (v2) {
                  c2 += v2;
                  continue;
                }
                if (c2 && (s2.push(c2), c2 = ""), u2("OPEN")) {
                  var m2 = h2(), y2 = u2("NAME") || "", b2 = u2("PATTERN") || "", w2 = h2();
                  d2("CLOSE"), s2.push({ name: y2 || (b2 ? o2++ : ""), pattern: y2 && !b2 ? a2 : b2, prefix: m2, suffix: w2, modifier: u2("MODIFIER") || "" });
                  continue;
                }
                d2("END");
              }
              return s2;
            }(t10, n10), r10, n10);
          }(e10);
        } catch (t10) {
          throw Error(`Invalid path: ${e10}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp
${t10.message}`);
        }
      } }, eX = (e10) => e10.map((e11) => e11 instanceof RegExp ? e11 : eG.toRegexp(e11));
      var eQ = r(67), eY = { InvalidSecretKey: "clerk_key_invalid" }, eZ = { TokenExpired: "token-expired", TokenInvalid: "token-invalid", TokenInvalidAlgorithm: "token-invalid-algorithm", TokenInvalidAuthorizedParties: "token-invalid-authorized-parties", TokenInvalidSignature: "token-invalid-signature", TokenNotActiveYet: "token-not-active-yet", TokenVerificationFailed: "token-verification-failed", InvalidSecretKey: "secret-key-invalid", LocalJWKMissing: "jwk-local-missing", RemoteJWKFailedToLoad: "jwk-remote-failed-to-load", JWKFailedToResolve: "jwk-failed-to-resolve", JWKKidMismatch: "jwk-kid-mismatch" }, e0 = { ContactSupport: "Contact support@clerk.com", EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.", SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.", SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable." }, e1 = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: n10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = n10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      };
      let e2 = crypto;
      var e4 = (e10) => "undefined" != typeof atob && "function" == typeof atob ? atob(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10, "base64").toString() : e10, e3 = (Object.getOwnPropertyDescriptor, Object.getOwnPropertyNames, Object.prototype.hasOwnProperty, (e10) => {
        throw TypeError(e10);
      }), e5 = (e10, t10, r10) => t10.has(e10) || e3("Cannot " + r10), e6 = (e10, t10, r10) => (e5(e10, t10, "read from private field"), r10 ? r10.call(e10) : t10.get(e10)), e8 = (e10, t10, r10) => t10.has(e10) ? e3("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), e9 = (e10, t10, r10, n10) => (e5(e10, t10, "write to private field"), n10 ? n10.call(e10, r10) : t10.set(e10, r10), r10), e7 = (e10, t10, r10) => (e5(e10, t10, "access private method"), r10), te = { crypto: e2, fetch: fetch.bind(globalThis), AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, tt = { parse: (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let n10 = e11.length;
        for (; "=" === e11[n10 - 1]; ) if (--n10, !r10.loose && !((e11.length - n10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let i2 = new (r10.out ?? Uint8Array)(n10 * t11.bits / 8 | 0), a2 = 0, s2 = 0, o2 = 0;
        for (let r11 = 0; r11 < n10; ++r11) {
          let n11 = t11.codes[e11[r11]];
          if (void 0 === n11) throw SyntaxError("Invalid character " + e11[r11]);
          s2 = s2 << t11.bits | n11, (a2 += t11.bits) >= 8 && (a2 -= 8, i2[o2++] = 255 & s2 >> a2);
        }
        if (a2 >= t11.bits || 255 & s2 << 8 - a2) throw SyntaxError("Unexpected end of data");
        return i2;
      }(e10, tr, t10) }, tr = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tn = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, ti = "RSASSA-PKCS1-v1_5", ta = { RS256: ti, RS384: ti, RS512: ti }, ts = Object.keys(tn), to = (e10) => Array.isArray(e10) && e10.length > 0 && e10.every((e11) => "string" == typeof e11), tl = (e10, t10) => {
        let r10 = [t10].flat().filter((e11) => !!e11), n10 = [e10].flat().filter((e11) => !!e11);
        if (r10.length > 0 && n10.length > 0) {
          if ("string" == typeof e10) {
            if (!r10.includes(e10)) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
          } else if (to(e10) && !e10.some((e11) => r10.includes(e11))) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
        }
      }, tc = (e10) => {
        if (void 0 !== e10 && "JWT" !== e10) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenInvalid, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "JWT".` });
      }, tu = (e10) => {
        if (!ts.includes(e10)) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenInvalidAlgorithm, message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${ts}.` });
      }, td = (e10) => {
        if ("string" != typeof e10) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(e10)}.` });
      }, th = (e10, t10) => {
        if (e10 && t10 && 0 !== t10.length && !t10.includes(e10)) throw new e1({ reason: eZ.TokenInvalidAuthorizedParties, message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(e10)}. Expected "${t10}".` });
      }, tp = (e10, t10) => {
        if ("number" != typeof e10) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() <= r10.getTime() - t10) throw new e1({ reason: eZ.TokenExpired, message: `JWT is expired. Expiry date: ${n10.toUTCString()}, Current date: ${r10.toUTCString()}.` });
      }, tf = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new e1({ reason: eZ.TokenNotActiveYet, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      }, tg = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new e1({ reason: eZ.TokenNotActiveYet, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      };
      async function tm(e10, t10) {
        let { header: r10, signature: n10, raw: i2 } = e10, a2 = new TextEncoder().encode([i2.header, i2.payload].join(".")), s2 = function(e11) {
          let t11 = tn[e11], r11 = ta[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${ts.join(",")}.`);
          return { hash: { name: tn[e11] }, name: ta[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return te.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let n11 = function(e13) {
              let t12 = e4(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, n12 = t12.length; e14 < n12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), i3 = "sign" === r11 ? "pkcs8" : "spki";
            return te.crypto.subtle.importKey(i3, n11, t11, false, [r11]);
          }(t10, s2, "verify");
          return { data: await te.crypto.subtle.verify(s2.name, e11, n10, a2) };
        } catch (e11) {
          return { errors: [new e1({ reason: eZ.TokenInvalidSignature, message: e11?.message })] };
        }
      }
      function tv(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new e1({ reason: eZ.TokenInvalid, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, n10, i2] = t10, a2 = new TextDecoder(), s2 = JSON.parse(a2.decode(tt.parse(r10, { loose: true })));
        return { data: { header: s2, payload: JSON.parse(a2.decode(tt.parse(n10, { loose: true }))), signature: tt.parse(i2, { loose: true }), raw: { header: r10, payload: n10, signature: i2, text: e10 } } };
      }
      async function ty(e10, t10) {
        let { audience: r10, authorizedParties: n10, clockSkewInMs: i2, key: a2 } = t10, s2 = i2 || 5e3, { data: o2, errors: l2 } = tv(e10);
        if (l2) return { errors: l2 };
        let { header: c2, payload: u2 } = o2;
        try {
          let { typ: e11, alg: t11 } = c2;
          tc(e11), tu(t11);
          let { azp: i3, sub: a3, aud: o3, iat: l3, exp: d3, nbf: h3 } = u2;
          td(a3), tl([o3], [r10]), th(i3, n10), tp(d3, s2), tf(h3, s2), tg(l3, s2);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d2, errors: h2 } = await tm(o2, a2);
        return h2 ? { errors: [new e1({ action: e0.EnsureClerkJWT, reason: eZ.TokenVerificationFailed, message: `Error verifying JWT signature. ${h2[0]}` })] } : d2 ? { data: u2 } : { errors: [new e1({ reason: eZ.TokenInvalidSignature, message: "JWT signature is invalid." })] };
      }
      function tb(e10) {
        var t10, r10, n10, i2, a2;
        return { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: null == (t10 = null == e10 ? void 0 : e10.meta) ? void 0 : t10.param_name, sessionId: null == (r10 = null == e10 ? void 0 : e10.meta) ? void 0 : r10.session_id, emailAddresses: null == (n10 = null == e10 ? void 0 : e10.meta) ? void 0 : n10.email_addresses, identifiers: null == (i2 = null == e10 ? void 0 : e10.meta) ? void 0 : i2.identifiers, zxcvbn: null == (a2 = null == e10 ? void 0 : e10.meta) ? void 0 : a2.zxcvbn } };
      }
      var tw = class e10 extends Error {
        constructor(t10, { data: r10, status: n10, clerkTraceId: i2 }) {
          super(t10), this.toString = () => {
            let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
            return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
          }, Object.setPrototypeOf(this, e10.prototype), this.status = n10, this.message = t10, this.clerkTraceId = i2, this.clerkError = true, this.errors = function(e11 = []) {
            return e11.length > 0 ? e11.map(tb) : [];
          }(r10);
        }
      }, t_ = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tS({ packageName: e10, customMessages: t10 }) {
        let r10 = e10, n10 = { ...t_, ...t10 };
        function i2(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let n11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            n11 = n11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${n11}`;
        }
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(n10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(i2(n10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(i2(n10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(i2(n10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(i2(n10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(i2(n10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(i2(e11));
        } };
      }
      var tk = r(353);
      async function tx(e10, t10 = 1, r10 = 5) {
        try {
          return await e10();
        } catch (i2) {
          var n10;
          if (t10 >= r10) throw i2;
          return await (n10 = 2 ** t10 * 100, new Promise((e11) => setTimeout(e11, n10))), tx(e10, t10 + 1, r10);
        }
      }
      var tT = (e10) => "undefined" != typeof btoa && "function" == typeof btoa ? btoa(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10).toString("base64") : e10, tE = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], tC = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], tO = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], tP = [".accountsstage.dev"], tR = "https://api.clerk.com", tI = "pk_live_";
      function tN(e10, t10 = {}) {
        if (!(e10 = e10 || "") || !function(e11) {
          let t11 = (e11 = e11 || "").startsWith(tI) || e11.startsWith("pk_test_"), r11 = e4(e11.split("_")[2] || "").endsWith("$");
          return t11 && r11;
        }(e10)) {
          if (t10.fatal) throw Error("Publishable key not valid.");
          return null;
        }
        let r10 = e10.startsWith(tI) ? "production" : "development", n10 = e4(e10.split("_")[2]);
        return n10 = n10.slice(0, -1), t10.proxyUrl ? n10 = t10.proxyUrl : "development" !== r10 && t10.domain && (n10 = `clerk.${t10.domain}`), { instanceType: r10, frontendApi: n10 };
      }
      function tA(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function tM(e10, t10 = globalThis.crypto.subtle) {
        let r10 = new TextEncoder().encode(e10);
        return tT(String.fromCharCode(...new Uint8Array(await t10.digest("sha-1", r10)))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      var tU = (e10, t10) => `${e10}_${t10}`, tL = () => false, tD = () => {
        try {
          return true;
        } catch (e10) {
        }
        return false;
      }, tj = /* @__PURE__ */ new Set(), tq = (e10, t10, r10) => {
        let n10 = tL() || tD(), i2 = null != r10 ? r10 : e10;
        tj.has(i2) || n10 || (tj.add(i2), console.warn(`Clerk - DEPRECATION WARNING: "${e10}" is deprecated and will be removed in the next major release.
${t10}`));
      }, tB = r(2), tH = "https://api.clerk.com", t$ = { Session: "__session", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count" }, tK = { ClerkSynced: "__clerk_synced", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: t$.DevBrowser, Handshake: t$.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session" }, tz = { Cookies: t$, Headers: { AuthToken: "x-clerk-auth-token", AuthSignature: "x-clerk-auth-signature", AuthStatus: "x-clerk-auth-status", AuthReason: "x-clerk-auth-reason", AuthMessage: "x-clerk-auth-message", ClerkUrl: "x-clerk-clerk-url", EnableDebug: "x-clerk-debug", ClerkRequestData: "x-clerk-request-data", ClerkRedirectTo: "x-clerk-redirect-to", CloudFrontForwardedProto: "cloudfront-forwarded-proto", Authorization: "authorization", ForwardedPort: "x-forwarded-port", ForwardedProto: "x-forwarded-proto", ForwardedHost: "x-forwarded-host", Accept: "accept", Referrer: "referer", UserAgent: "user-agent", Origin: "origin", Host: "host", ContentType: "content-type", SecFetchDest: "sec-fetch-dest", Location: "location" }, ContentTypes: { Json: "application/json" }, QueryParameters: tK }, tF = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, tV = RegExp("(?<!:)/{1,}", "g");
      function tJ(...e10) {
        return e10.filter((e11) => e11).join("/").replace(tV, "/");
      }
      var tW = "/allowlist_identifiers", tG = class extends tF {
        async getAllowlistIdentifierList() {
          return this.request({ method: "GET", path: tW, queryParams: { paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: tW, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(tW, e10) });
        }
      }, tX = "/clients", tQ = class extends tF {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: tX, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(tX, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: tJ(tX, "verify"), bodyParams: { token: e10 } });
        }
      }, tY = class extends tF {
        async deleteDomain(e10) {
          return this.request({ method: "DELETE", path: tJ("/domains", e10) });
        }
      }, tZ = "/email_addresses", t0 = class extends tF {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(tZ, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: tZ, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(tZ, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(tZ, e10) });
        }
      }, t1 = "/invitations", t2 = class extends tF {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: t1, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: t1, bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(t1, e10, "revoke") });
        }
      }, t4 = "/organizations", t3 = class extends tF {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: t4, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: t4, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let t10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(t10), this.request({ method: "GET", path: tJ(t4, t10) });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(t4, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new te.FormData();
          return r10.append("file", t10?.file), r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: tJ(t4, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(t4, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(t4, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: tJ(t4, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, limit: r10, offset: n10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: tJ(t4, t10, "memberships"), queryParams: { limit: r10, offset: n10 } });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, role: n10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: tJ(t4, t10, "memberships"), bodyParams: { userId: r10, role: n10 } });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, role: n10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: tJ(t4, t10, "memberships", r10), bodyParams: { role: n10 } });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, publicMetadata: n10, privateMetadata: i2 } = e10;
          return this.request({ method: "PATCH", path: tJ(t4, t10, "memberships", r10, "metadata"), bodyParams: { publicMetadata: n10, privateMetadata: i2 } });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: tJ(t4, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, status: r10, limit: n10, offset: i2 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: tJ(t4, t10, "invitations"), queryParams: { status: r10, limit: n10, offset: i2 } });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: tJ(t4, t10, "invitations"), bodyParams: { ...r10 } });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: tJ(t4, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, requestingUserId: n10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: tJ(t4, t10, "invitations", r10, "revoke"), bodyParams: { requestingUserId: n10 } });
        }
      }, t5 = "/phone_numbers", t6 = class extends tF {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(t5, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: t5, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(t5, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(t5, e10) });
        }
      }, t8 = "/redirect_urls", t9 = class extends tF {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: t8, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(t8, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: t8, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(t8, e10) });
        }
      }, t7 = "/sessions", re = class extends tF {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: t7, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(t7, e10) });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(t7, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(t7, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(t7, e10, "tokens", t10 || "") });
        }
      }, rt = "/sign_in_tokens", rr = class extends tF {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: rt, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(rt, e10, "revoke") });
        }
      }, rn = "/users", ri = class extends tF {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: n10, ...i2 } = e10, [a2, s2] = await Promise.all([this.request({ method: "GET", path: rn, queryParams: e10 }), this.getCount(i2)]);
          return { data: a2, totalCount: s2 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(rn, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: rn, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(rn, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new te.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: tJ(rn, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(rn, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(rn, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: tJ(rn, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(rn, e10, "oauth_access_tokens", t10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(rn, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: n10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: tJ(rn, t10, "organization_memberships"), queryParams: { limit: r10, offset: n10 } });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: tJ(rn, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: tJ(rn, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(rn, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(rn, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(rn, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: tJ(rn, e10, "unlock") });
        }
      }, ra = "/saml_connections", rs = class extends tF {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: ra, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: ra, bodyParams: e10 });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: tJ(ra, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: tJ(ra, e10), bodyParams: t10 });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: tJ(ra, e10) });
        }
      }, ro = class extends tF {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, rl = tS({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: rc } = /* @__PURE__ */ function() {
        let e10 = /* @__PURE__ */ new Map();
        return { isDevOrStagingUrl: (t10) => {
          if (!t10) return false;
          let r10 = "string" == typeof t10 ? t10 : t10.hostname, n10 = e10.get(r10);
          return void 0 === n10 && (n10 = tC.some((e11) => r10.endsWith(e11)), e10.set(r10, n10)), n10;
        } };
      }();
      function ru(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var rd = class e10 {
        constructor(e11, t10, r10, n10, i2) {
          this.id = e11, this.identifier = t10, this.createdAt = r10, this.updatedAt = n10, this.invitationId = i2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.created_at, t10.updated_at, t10.invitation_id);
        }
      }, rh = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2, l2) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = n10, this.lastActiveAt = i2, this.expireAt = a2, this.abandonAt = s2, this.createdAt = o2, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at);
        }
      }, rp = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = n10, this.signUpId = i2, this.lastActiveSessionId = a2, this.createdAt = s2, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => rh.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.created_at, t10.updated_at);
        }
      }, rf = class e10 {
        constructor(e11, t10, r10, n10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, rg = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2, l2, c2, u2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = n10, this.subject = i2, this.body = a2, this.bodyPlain = s2, this.status = o2, this.slug = l2, this.data = c2, this.deliveredByClerk = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, rm = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, rv = class e10 {
        constructor(e11, t10, r10 = null, n10 = null, i2 = null, a2 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = n10, this.expireAt = i2, this.nonce = a2;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, ry = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && rv.fromJSON(t10.verification), t10.linked_to.map((e11) => rm.fromJSON(e11)));
        }
      }, rb = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2, l2, c2, u2 = {}, d2, h2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = n10, this.approvedScopes = i2, this.emailAddress = a2, this.firstName = s2, this.lastName = o2, this.imageUrl = l2, this.username = c2, this.publicMetadata = u2, this.label = d2, this.verification = h2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.public_metadata, t10.label, t10.verification && rv.fromJSON(t10.verification));
        }
      }, rw = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = n10, this.updatedAt = i2, this.status = a2, this.revoked = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.revoked);
        }
      }, r_ = { AllowlistIdentifier: "allowlist_identifier", Client: "client", Email: "email", EmailAddress: "email_address", Invitation: "invitation", OauthAccessToken: "oauth_access_token", Organization: "organization", OrganizationInvitation: "organization_invitation", OrganizationMembership: "organization_membership", PhoneNumber: "phone_number", RedirectUrl: "redirect_url", Session: "session", SignInToken: "sign_in_token", SmsMessage: "sms_message", User: "user", Token: "token", TotalCount: "total_count" }, rS = class e10 {
        constructor(e11, t10, r10, n10 = {}, i2, a2, s2) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = n10, this.label = i2, this.scopes = a2, this.tokenSecret = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret);
        }
      }, rk = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2, l2 = {}, c2 = {}, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = n10, this.hasImage = i2, this.createdBy = a2, this.createdAt = s2, this.updatedAt = o2, this.publicMetadata = l2, this.privateMetadata = c2, this.maxAllowedMemberships = u2, this.adminDeleteEnabled = d2, this.membersCount = h2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_by, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count);
        }
      }, rx = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2 = {}, l2 = {}) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.organizationId = n10, this.createdAt = i2, this.updatedAt = a2, this.status = s2, this.publicMetadata = o2, this.privateMetadata = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.role, t10.organization_id, t10.created_at, t10.updated_at, t10.status, t10.public_metadata, t10.private_metadata);
        }
      }, rT = class e10 {
        constructor(e11, t10, r10 = {}, n10 = {}, i2, a2, s2, o2) {
          this.id = e11, this.role = t10, this.publicMetadata = r10, this.privateMetadata = n10, this.createdAt = i2, this.updatedAt = a2, this.organization = s2, this.publicUserData = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.role, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, rk.fromJSON(t10.organization), rE.fromJSON(t10.public_user_data));
        }
      }, rE = class e10 {
        constructor(e11, t10, r10, n10, i2, a2) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = n10, this.hasImage = i2, this.userId = a2;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, rC = class e10 {
        constructor(e11, t10, r10, n10, i2, a2) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = n10, this.verification = i2, this.linkedTo = a2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && rv.fromJSON(t10.verification), t10.linked_to.map((e11) => rm.fromJSON(e11)));
        }
      }, rO = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, rP = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = n10, this.url = i2, this.createdAt = a2, this.updatedAt = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, rR = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = n10, this.status = i2, this.phoneNumberId = a2, this.data = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, rI = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, rN = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = n10, this.emailAddress = i2, this.firstName = a2, this.lastName = s2, this.verification = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && rv.fromJSON(t10.verification));
        }
      }, rA = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && rv.fromJSON(t10.verification));
        }
      }, rM = class e10 {
        constructor(e11, t10, r10, n10, i2, a2, s2, o2, l2, c2, u2, d2, h2, p2, f2, g2, m2, v2, y2, b2 = {}, w2 = {}, _2 = {}, S2 = [], k2 = [], x2 = [], T2 = [], E2 = [], C2, O2, P2 = null) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = n10, this.twoFactorEnabled = i2, this.banned = a2, this.locked = s2, this.createdAt = o2, this.updatedAt = l2, this.imageUrl = c2, this.hasImage = u2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = g2, this.username = m2, this.firstName = v2, this.lastName = y2, this.publicMetadata = b2, this.privateMetadata = w2, this.unsafeMetadata = _2, this.emailAddresses = S2, this.phoneNumbers = k2, this.web3Wallets = x2, this.externalAccounts = T2, this.samlAccounts = E2, this.lastActiveAt = C2, this.createOrganizationEnabled = O2, this.createOrganizationsLimit = P2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => ry.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => rC.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => rA.fromJSON(e11)), (t10.external_accounts || []).map((e11) => rb.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => rN.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit);
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      };
      function rU(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return rf.fromJSON(e10);
        switch (e10.object) {
          case r_.AllowlistIdentifier:
            return rd.fromJSON(e10);
          case r_.Client:
            return rp.fromJSON(e10);
          case r_.EmailAddress:
            return ry.fromJSON(e10);
          case r_.Email:
            return rg.fromJSON(e10);
          case r_.Invitation:
            return rw.fromJSON(e10);
          case r_.OauthAccessToken:
            return rS.fromJSON(e10);
          case r_.Organization:
            return rk.fromJSON(e10);
          case r_.OrganizationInvitation:
            return rx.fromJSON(e10);
          case r_.OrganizationMembership:
            return rT.fromJSON(e10);
          case r_.PhoneNumber:
            return rC.fromJSON(e10);
          case r_.RedirectUrl:
            return rO.fromJSON(e10);
          case r_.SignInToken:
            return rP.fromJSON(e10);
          case r_.Session:
            return rh.fromJSON(e10);
          case r_.SmsMessage:
            return rR.fromJSON(e10);
          case r_.Token:
            return rI.fromJSON(e10);
          case r_.TotalCount:
            return e10.total_count;
          case r_.User:
            return rM.fromJSON(e10);
          default:
            return e10;
        }
      }
      function rL(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function rD(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tb) : [];
        }
        return [];
      }
      function rj(e10) {
        var t10;
        let r10 = (t10 = async (t11) => {
          let r11;
          let { secretKey: n10, apiUrl: i2 = tH, apiVersion: a2 = "v1", userAgent: s2 = "@clerk/backend@1.7.0" } = e10, { path: o2, method: l2, queryParams: c2, headerParams: u2, bodyParams: d2, formData: h2 } = t11;
          ru(n10);
          let p2 = new URL(tJ(i2, a2, o2));
          if (c2) for (let [e11, t12] of Object.entries(tk({ ...c2 }))) t12 && [t12].flat().forEach((t13) => p2.searchParams.append(e11, t13));
          let f2 = { Authorization: `Bearer ${n10}`, "User-Agent": s2, ...u2 };
          try {
            if (h2) r11 = await te.fetch(p2.href, { method: l2, headers: f2, body: h2 });
            else {
              f2["Content-Type"] = "application/json";
              let e12 = "GET" !== l2 && d2 && Object.keys(d2).length > 0 ? { body: JSON.stringify(tk(d2, { deep: false })) } : null;
              r11 = await te.fetch(p2.href, { method: l2, headers: f2, ...e12 });
            }
            let e11 = r11?.headers && r11.headers?.get(tz.Headers.ContentType) === tz.ContentTypes.Json, t12 = await (e11 ? r11.json() : r11.text());
            if (!r11.ok) return { data: null, errors: rD(t12), status: r11?.status, statusText: r11?.statusText, clerkTraceId: rL(t12, r11?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => rU(e12)) } : t12 && "object" == typeof t12 && "data" in t12 && Array.isArray(t12.data) && void 0 !== t12.data ? { data: t12.data.map((e12) => rU(e12)), totalCount: t12.total_count } : { data: rU(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: rL(e11, r11?.headers) };
            return { data: null, errors: rD(e11), status: r11?.status, statusText: r11?.statusText, clerkTraceId: rL(e11, r11?.headers) };
          }
        }, async (...e11) => {
          let { data: r11, errors: n10, totalCount: i2, status: a2, statusText: s2, clerkTraceId: o2 } = await t10(...e11);
          if (n10) {
            let e12 = new tw(s2 || "", { data: [], status: a2, clerkTraceId: o2 });
            throw e12.errors = n10, e12;
          }
          return void 0 !== i2 ? { data: r11, totalCount: i2 } : r11;
        });
        return { allowlistIdentifiers: new tG(r10), clients: new tQ(r10), emailAddresses: new t0(r10), invitations: new t2(r10), organizations: new t3(r10), phoneNumbers: new t6(r10), redirectUrls: new t9(r10), sessions: new re(r10), signInTokens: new rr(r10), users: new ri(r10), domains: new tY(r10), samlConnections: new rs(r10), testingTokens: new ro(r10) };
      }
      var rq = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      }, rB = (e10) => {
        let { fetcher: t10, sessionToken: r10, sessionId: n10 } = e10 || {};
        return async (e11 = {}) => n10 ? e11.template ? t10(n10, e11.template) : r10 : null;
      }, rH = (e10) => {
        let { orgId: t10, orgRole: r10, userId: n10, orgPermissions: i2 } = e10;
        return (e11) => {
          if (!e11?.permission && !e11?.role) throw Error('Missing parameters. `has` from `auth` or `getAuth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"`');
          return !!t10 && !!n10 && !!r10 && !!i2 && (e11.permission ? i2.includes(e11.permission) : !!e11.role && r10 === e11.role);
        };
      }, r$ = { SignedIn: "signed-in", SignedOut: "signed-out", Handshake: "handshake" }, rK = { ClientUATWithoutSessionToken: "client-uat-but-no-session-token", DevBrowserMissing: "dev-browser-missing", DevBrowserSync: "dev-browser-sync", PrimaryRespondsToSyncing: "primary-responds-to-syncing", SatelliteCookieNeedsSyncing: "satellite-needs-syncing", SessionTokenAndUATMissing: "session-token-and-uat-missing", SessionTokenMissing: "session-token-missing", SessionTokenOutdated: "session-token-outdated", SessionTokenWithoutClientUAT: "session-token-but-no-client-uat", UnexpectedError: "unexpected-error" };
      function rz(e10, t10, r10 = new Headers(), n10) {
        let i2 = function(e11, t11, r11) {
          let { act: n11, sid: i3, org_id: a2, org_role: s2, org_slug: o2, org_permissions: l2, sub: c2 } = r11, u2 = rj(e11), d2 = rB({ sessionId: i3, sessionToken: t11, fetcher: async (...e12) => (await u2.sessions.getToken(...e12)).jwt });
          return { actor: n11, sessionClaims: r11, sessionId: i3, userId: c2, orgId: a2, orgRole: s2, orgSlug: o2, orgPermissions: l2, getToken: d2, has: rH({ orgId: a2, orgRole: s2, orgPermissions: l2, userId: c2 }), debug: rq({ ...e11, sessionToken: t11 }) };
        }(e10, n10, t10);
        return { status: r$.SignedIn, reason: null, message: null, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: true, toAuth: () => i2, headers: r10, token: n10 };
      }
      function rF(e10, t10, r10 = "", n10 = new Headers()) {
        return rV({ status: r$.SignedOut, reason: t10, message: r10, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: false, headers: n10, toAuth: () => ({ sessionClaims: null, sessionId: null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, getToken: () => Promise.resolve(null), has: () => false, debug: rq({ ...e10, status: r$.SignedOut, reason: t10, message: r10 }) }), token: null });
      }
      var rV = (e10) => {
        let t10 = new Headers(e10.headers || {});
        return e10.message && t10.set(tz.Headers.AuthMessage, e10.message), e10.reason && t10.set(tz.Headers.AuthReason, e10.reason), e10.status && t10.set(tz.Headers.AuthStatus, e10.status), e10.headers = t10, e10;
      }, rJ = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, rW = (...e10) => new rJ(...e10), rG = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(tz.Headers.ForwardedProto), n10 = e10.headers.get(tz.Headers.ForwardedHost), i2 = e10.headers.get(tz.Headers.Host), a2 = t10.protocol, s2 = this.getFirstValueFromHeader(n10) ?? i2, o2 = this.getFirstValueFromHeader(r10) ?? a2?.replace(/[:/]/, ""), l2 = s2 && o2 ? `${o2}://${s2}` : t10.origin;
          return rW(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, tB.Q)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, rX = (...e10) => e10[0] instanceof rG ? e10[0] : new rG(...e10), rQ = {}, rY = 0;
      function rZ(e10, t10 = true) {
        rQ[e10.kid] = e10, rY = t10 ? Date.now() : -1;
      }
      var r0 = "local";
      function r1(e10) {
        if (!rQ[r0]) {
          if (!e10) throw new e1({ action: e0.SetClerkJWTKey, message: "Missing local JWK.", reason: eZ.LocalJWKMissing });
          rZ({ kid: "local", kty: "RSA", alg: "RS256", n: e10.replace(/(\r\n|\n|\r)/gm, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" }, false);
        }
        return rQ[r0];
      }
      async function r2({ secretKey: e10, apiUrl: t10 = tH, apiVersion: r10 = "v1", kid: n10, skipJwksCache: i2 }) {
        if (i2 || function() {
          if (-1 === rY) return false;
          let e11 = Date.now() - rY >= 3e5;
          return e11 && (rQ = {}), e11;
        }() || !rQ[n10]) {
          if (!e10) throw new e1({ action: e0.ContactSupport, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: eZ.RemoteJWKFailedToLoad });
          let { keys: n11 } = await tx(() => r4(t10, e10, r10));
          if (!n11 || !n11.length) throw new e1({ action: e0.ContactSupport, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: eZ.RemoteJWKFailedToLoad });
          n11.forEach((e11) => rZ(e11));
        }
        let a2 = rQ[n10];
        if (!a2) {
          let e11 = Object.values(rQ).map((e12) => e12.kid).sort().join(", ");
          throw new e1({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${e0.ContactSupport} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${n10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: eZ.JWKKidMismatch });
        }
        return a2;
      }
      async function r4(e10, t10, r10) {
        if (!t10) throw new e1({ action: e0.SetClerkSecretKey, message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: eZ.RemoteJWKFailedToLoad });
        let n10 = new URL(e10);
        n10.pathname = tJ(n10.pathname, r10, "/jwks");
        let i2 = await te.fetch(n10.href, { headers: { Authorization: `Bearer ${t10}`, "Content-Type": "application/json" } });
        if (!i2.ok) {
          let e11 = await i2.json(), t11 = r3(e11?.errors, eY.InvalidSecretKey);
          if (t11) {
            let e12 = eZ.InvalidSecretKey;
            throw new e1({ action: e0.ContactSupport, message: t11.message, reason: e12 });
          }
          throw new e1({ action: e0.ContactSupport, message: `Error loading Clerk JWKS from ${n10.href} with code=${i2.status}`, reason: eZ.RemoteJWKFailedToLoad });
        }
        return i2.json();
      }
      var r3 = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function r5(e10, t10) {
        let { data: r10, errors: n10 } = tv(e10);
        if (n10) return { errors: n10 };
        let { header: i2 } = r10, { kid: a2 } = i2;
        try {
          let r11;
          if (t10.jwtKey) r11 = r1(t10.jwtKey);
          else {
            if (!t10.secretKey) return { errors: [new e1({ action: e0.SetClerkJWTKey, message: "Failed to resolve JWK during verification.", reason: eZ.JWKFailedToResolve })] };
            r11 = await r2({ ...t10, kid: a2 });
          }
          return await ty(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      var r6 = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues(), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.sessionTokenInHeader;
        }
        initPublishableKeyValues(e10) {
          tN(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = tN(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain });
          this.instanceType = t10.instanceType, this.frontendApi = t10.frontendApi;
        }
        initHeaderValues() {
          this.sessionTokenInHeader = this.stripAuthorizationHeader(this.getHeader(tz.Headers.Authorization)), this.origin = this.getHeader(tz.Headers.Origin), this.host = this.getHeader(tz.Headers.Host), this.forwardedHost = this.getHeader(tz.Headers.ForwardedHost), this.forwardedProto = this.getHeader(tz.Headers.CloudFrontForwardedProto) || this.getHeader(tz.Headers.ForwardedProto), this.referrer = this.getHeader(tz.Headers.Referrer), this.userAgent = this.getHeader(tz.Headers.UserAgent), this.secFetchDest = this.getHeader(tz.Headers.SecFetchDest), this.accept = this.getHeader(tz.Headers.Accept);
        }
        initCookieValues() {
          this.suffixedCookies = this.shouldUseSuffixed(), this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(tz.Cookies.Session), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(tz.Cookies.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(tz.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(tz.Cookies.DevBrowser), this.handshakeToken = this.getQueryParam(tz.QueryParameters.Handshake) || this.getCookie(tz.Cookies.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(tz.Cookies.RedirectCount)) || 0;
        }
        stripAuthorizationHeader(e10) {
          return e10?.replace("Bearer ", "");
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          return this.getCookie(tU(e10, this.cookieSuffix)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.suffixedCookies ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        shouldUseSuffixed() {
          let e10 = this.getSuffixedCookie(tz.Cookies.ClientUat), t10 = this.getCookie(tz.Cookies.ClientUat), r10 = this.getSuffixedCookie(tz.Cookies.Session) || "", n10 = this.getCookie(tz.Cookies.Session) || "";
          if (n10 && !this.tokenHasIssuer(n10)) return false;
          if (n10 && !this.tokenBelongsToInstance(n10)) return true;
          if (!e10 && !r10) return false;
          let { data: i2 } = tv(n10), a2 = i2?.payload.iat || 0, { data: s2 } = tv(r10), o2 = s2?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && a2 > o2 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(s2);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = tv(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = tv(e10);
          if (r10) return false;
          let n10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.frontendApi === n10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= Date.now() / 1e3 >> 0;
        }
      }, r8 = async (e10, t10) => new r6(t10.publishableKey ? await tM(t10.publishableKey, te.crypto.subtle) : "", e10, t10), r9 = (e10) => e10.split(";")[0]?.split("=")[0], r7 = (e10) => e10.split(";")[0]?.split("=")[1];
      async function ne(e10, { key: t10 }) {
        let { data: r10, errors: n10 } = tv(e10);
        if (n10) throw n10[0];
        let { header: i2, payload: a2 } = r10, { typ: s2, alg: o2 } = i2;
        tc(s2), tu(o2);
        let { data: l2, errors: c2 } = await tm(r10, t10);
        if (c2) throw new e1({ reason: eZ.TokenVerificationFailed, message: `Error verifying handshake token. ${c2[0]}` });
        if (!l2) throw new e1({ reason: eZ.TokenInvalidSignature, message: "Handshake signature is invalid." });
        return a2;
      }
      async function nt(e10, t10) {
        let r10;
        let { secretKey: n10, apiUrl: i2, apiVersion: a2, jwksCacheTtlInMs: s2, jwtKey: o2, skipJwksCache: l2 } = t10, { data: c2, errors: u2 } = tv(e10);
        if (u2) throw u2[0];
        let { kid: d2 } = c2.header;
        if (o2) r10 = r1(o2);
        else if (n10) r10 = await r2({ secretKey: n10, apiUrl: i2, apiVersion: a2, kid: d2, jwksCacheTtlInMs: s2, skipJwksCache: l2 });
        else throw new e1({ action: e0.SetClerkJWTKey, message: "Failed to resolve JWK during handshake verification.", reason: eZ.JWKFailedToResolve });
        return await ne(e10, { key: r10 });
      }
      async function nr(e10, t10) {
        let r10 = await r8(rX(e10), t10);
        async function n10() {
          let e11 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t11 = (await nt(r10.handshakeToken, r10)).handshake, n11 = "";
          if (t11.forEach((t12) => {
            e11.append("Set-Cookie", t12), r9(t12).startsWith(tz.Cookies.Session) && (n11 = r7(t12));
          }), "development" === r10.instanceType) {
            let t12 = new URL(r10.clerkUrl);
            t12.searchParams.delete(tz.QueryParameters.Handshake), t12.searchParams.delete(tz.QueryParameters.HandshakeHelp), e11.append("Location", t12.toString());
          }
          if ("" === n11) return rF(r10, rK.SessionTokenMissing, "", e11);
          let { data: i3, errors: [a3] = [] } = await r5(n11, r10);
          if (i3) return rz(r10, i3, e11, n11);
          if ("development" === r10.instanceType && (a3?.reason === eZ.TokenExpired || a3?.reason === eZ.TokenNotActiveYet)) {
            a3.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${a3.getFullMessage()}`);
            let { data: t12, errors: [i4] = [] } = await r5(n11, { ...r10, clockSkewInMs: 864e5 });
            if (t12) return rz(r10, t12, e11, n11);
            throw i4;
          }
          throw a3;
        }
        function i2(e11, t11, n11, i3) {
          if (function(e12) {
            let { accept: t12, secFetchDest: r11 } = e12;
            return !!("document" === r11 || "iframe" === r11 || !r11 && t12?.startsWith("text/html"));
          }(e11)) {
            let a3 = i3 ?? function() {
              let e12 = function(e13) {
                let t13 = new URL(e13);
                return t13.searchParams.delete(tz.QueryParameters.DevBrowser), t13.searchParams.delete(tz.QueryParameters.LegacyDevBrowser), t13;
              }(r10.clerkUrl), t12 = r10.frontendApi.replace(/http(s)?:\/\//, ""), n12 = new URL(`https://${t12}/v1/client/handshake`);
              return n12.searchParams.append("redirect_url", e12?.href || ""), n12.searchParams.append("suffixed_cookies", r10.suffixedCookies.toString()), "development" === r10.instanceType && r10.devBrowserToken && n12.searchParams.append(tz.QueryParameters.DevBrowser, r10.devBrowserToken), new Headers({ location: n12.href });
            }();
            return !function(e12) {
              if (3 === r10.handshakeRedirectLoopCounter) return true;
              let t12 = r10.handshakeRedirectLoopCounter + 1, n12 = tz.Cookies.RedirectCount;
              return e12.append("Set-Cookie", `${n12}=${t12}; SameSite=Lax; HttpOnly; Max-Age=3`), false;
            }(a3) ? function(e12, t12, r11 = "", n12) {
              return rV({ status: r$.Handshake, reason: t12, message: r11, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, headers: n12, toAuth: () => null, token: null });
            }(e11, t11, n11, a3) : (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), rF(e11, t11, n11));
          }
          return rF(e11, t11, n11);
        }
        async function a2() {
          let { sessionTokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: n11 } = await r5(e11, r10);
            if (n11) throw n11[0];
            return await rz(r10, t11, void 0, e11);
          } catch (e12) {
            return o2(e12, "header");
          }
        }
        async function s2() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, a3 = !!r10.devBrowserToken, s3 = r10.isSatellite && "document" === r10.secFetchDest && !r10.clerkUrl.searchParams.has(tz.QueryParameters.ClerkSynced);
          if (r10.handshakeToken) try {
            return await n10();
          } catch (e12) {
            e12 instanceof e1 && "development" === r10.instanceType && function(e13) {
              if (e13.reason === eZ.TokenInvalidSignature) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
              throw Error(`Clerk: Handshake token verification failed: ${e13.getFullMessage()}.`);
            }(e12);
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(tz.QueryParameters.DevBrowser)) return i2(r10, rK.DevBrowserSync, "");
          if ("production" === r10.instanceType && s3) return i2(r10, rK.SatelliteCookieNeedsSyncing, "");
          if ("development" === r10.instanceType && s3) {
            let e12 = new URL(r10.signInUrl);
            e12.searchParams.append(tz.QueryParameters.ClerkRedirectUrl, r10.clerkUrl.toString());
            let t12 = new Headers({ location: e12.toString() });
            return i2(r10, rK.SatelliteCookieNeedsSyncing, "", t12);
          }
          let l2 = new URL(r10.clerkUrl).searchParams.get(tz.QueryParameters.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && l2) {
            let e12 = new URL(l2);
            r10.devBrowserToken && e12.searchParams.append(tz.QueryParameters.DevBrowser, r10.devBrowserToken), e12.searchParams.append(tz.QueryParameters.ClerkSynced, "true");
            let t12 = new Headers({ location: e12.toString() });
            return i2(r10, rK.PrimaryRespondsToSyncing, "", t12);
          }
          if ("development" === r10.instanceType && !a3) return i2(r10, rK.DevBrowserMissing, "");
          if (!e11 && !t11) return rF(r10, rK.SessionTokenAndUATMissing, "");
          if (!e11 && t11) return i2(r10, rK.SessionTokenWithoutClientUAT, "");
          if (e11 && !t11) return i2(r10, rK.ClientUATWithoutSessionToken, "");
          let { data: c2, errors: u2 } = tv(r10.sessionTokenInCookie);
          if (u2) return o2(u2[0], "cookie");
          if (c2.payload.iat < r10.clientUat) return i2(r10, rK.SessionTokenOutdated, "");
          try {
            let { data: e12, errors: t12 } = await r5(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            return await rz(r10, e12, void 0, r10.sessionTokenInCookie);
          } catch (e12) {
            return o2(e12, "cookie");
          }
          return rF(r10, rK.UnexpectedError);
        }
        function o2(e11, t11) {
          return e11 instanceof e1 ? (e11.tokenCarrier = t11, [eZ.TokenExpired, eZ.TokenNotActiveYet].includes(e11.reason)) ? i2(r10, rK.SessionTokenOutdated, e11.getFullMessage()) : rF(r10, e11.reason, e11.getFullMessage()) : rF(r10, rK.UnexpectedError);
        }
        return ru(r10.secretKey), r10.isSatellite && (function(e11, t11) {
          if (!e11 && tA(t11)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
        }(r10.signInUrl, r10.secretKey), r10.signInUrl && r10.origin && function(e11, t11) {
          let r11;
          try {
            r11 = new URL(e11);
          } catch {
            throw Error("The signInUrl needs to have a absolute url format.");
          }
          if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
        }(r10.signInUrl, r10.origin), function(e11) {
          if (!e11) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }(r10.proxyUrl || r10.domain)), r10.sessionTokenInHeader ? a2() : s2();
      }
      var nn = (e10) => {
        let { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i2, publishableKey: a2, isSatellite: s2, domain: o2 } = e10;
        return { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i2, publishableKey: a2, isSatellite: s2, domain: o2 };
      };
      function ni(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      var na = { secretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" }, ns = (e10, t10, r10, n10) => {
        if ("" === e10) return no(t10.toString(), r10?.toString());
        let i2 = new URL(e10), a2 = r10 ? new URL(r10, i2) : void 0, s2 = new URL(t10, i2);
        return a2 && s2.searchParams.set("redirect_url", a2.toString()), n10 && i2.hostname !== s2.hostname && s2.searchParams.set(tz.QueryParameters.DevBrowser, n10), s2.toString();
      }, no = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let n10 = new URL(t10);
          r10 = new URL(e10, n10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      }, nl = (e10) => {
        if (!e10) return "";
        let t10 = e10.replace(/(clerk\.accountsstage\.)/, "accountsstage.").replace(/(clerk\.accounts\.|clerk\.)/, "accounts.");
        return `https://${t10}`;
      }, nc = (e10) => {
        let { publishableKey: t10, redirectAdapter: r10, signInUrl: n10, signUpUrl: i2, baseUrl: a2 } = e10, s2 = tN(t10), o2 = s2?.frontendApi, l2 = s2?.instanceType === "development", c2 = nl(o2);
        return { redirectToSignUp: ({ returnBackUrl: t11 } = {}) => {
          i2 || c2 || rl.throwMissingPublishableKeyError();
          let n11 = `${c2}/sign-up`;
          return r10(ns(a2, i2 || n11, t11, l2 ? e10.devBrowserToken : null));
        }, redirectToSignIn: ({ returnBackUrl: t11 } = {}) => {
          n10 || c2 || rl.throwMissingPublishableKeyError();
          let i3 = `${c2}/sign-in`;
          return r10(ns(a2, n10 || i3, t11, l2 ? e10.devBrowserToken : null));
        } };
      }, nu = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let n10 = { ...r10 };
          for (let r11 of Object.keys(n10)) {
            let i2 = e10(r11.toString());
            i2 !== r11 && (n10[i2] = n10[r11], delete n10[r11]), "object" == typeof n10[i2] && (n10[i2] = t10(n10[i2]));
          }
          return n10;
        };
        return t10;
      };
      function nd(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      nu(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), nu(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      });
      var nh = class {
        constructor() {
          e8(this, y), e8(this, m, "clerk_telemetry_throttler"), e8(this, v, 864e5);
        }
        isEventThrottled(e10) {
          var t10;
          if (!e6(this, y, _)) return false;
          let r10 = Date.now(), n10 = e7(this, y, b).call(this, e10), i2 = null == (t10 = e6(this, y, w)) ? void 0 : t10[n10];
          if (!i2) {
            let e11 = { ...e6(this, y, w), [n10]: r10 };
            localStorage.setItem(e6(this, m), JSON.stringify(e11));
          }
          if (i2 && r10 - i2 > e6(this, v)) {
            let e11 = e6(this, y, w);
            delete e11[n10], localStorage.setItem(e6(this, m), JSON.stringify(e11));
          }
          return !!i2;
        }
      };
      m = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakSet(), b = function(e10) {
        let { sk: t10, pk: r10, payload: n10, ...i2 } = e10, a2 = { ...n10, ...i2 };
        return JSON.stringify(Object.keys({ ...n10, ...i2 }).sort().map((e11) => a2[e11]));
      }, w = function() {
        let e10 = localStorage.getItem(e6(this, m));
        return e10 ? JSON.parse(e10) : {};
      }, _ = function() {
        if ("undefined" == typeof window) return false;
        let e10 = window.localStorage;
        if (!e10) return false;
        try {
          let t10 = "test";
          return e10.setItem(t10, t10), e10.removeItem(t10), true;
        } catch (t10) {
          return t10 instanceof DOMException && ("QuotaExceededError" === t10.name || "NS_ERROR_DOM_QUOTA_REACHED" === t10.name) && e10.length > 0 && e10.removeItem(e6(this, m)), false;
        }
      };
      var np = { samplingRate: 1, maxBufferSize: 5, endpoint: "https://clerk-telemetry.com" }, nf = class {
        constructor(e10) {
          var t10, r10, n10, i2, a2, s2;
          e8(this, C), e8(this, S), e8(this, k), e8(this, x, {}), e8(this, T, []), e8(this, E), e9(this, S, { maxBufferSize: null != (t10 = e10.maxBufferSize) ? t10 : np.maxBufferSize, samplingRate: null != (r10 = e10.samplingRate) ? r10 : np.samplingRate, disabled: null != (n10 = e10.disabled) && n10, debug: null != (i2 = e10.debug) && i2, endpoint: np.endpoint }), e10.clerkVersion || "undefined" != typeof window ? e6(this, x).clerkVersion = null != (a2 = e10.clerkVersion) ? a2 : "" : e6(this, x).clerkVersion = "", e6(this, x).sdk = e10.sdk, e6(this, x).sdkVersion = e10.sdkVersion, e6(this, x).publishableKey = null != (s2 = e10.publishableKey) ? s2 : "";
          let o2 = tN(e10.publishableKey);
          o2 && (e6(this, x).instanceType = o2.instanceType), e10.secretKey && (e6(this, x).secretKey = e10.secretKey.substring(0, 16)), e9(this, k, new nh());
        }
        get isEnabled() {
          var e10;
          return !("development" !== e6(this, x).instanceType || e6(this, S).disabled || "undefined" != typeof process && nd(process.env.CLERK_TELEMETRY_DISABLED)) && ("undefined" == typeof window || null == (e10 = null == window ? void 0 : window.navigator) || !e10.webdriver);
        }
        get isDebug() {
          return e6(this, S).debug || "undefined" != typeof process && nd(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          let t10 = e7(this, C, M).call(this, e10.event, e10.payload);
          e7(this, C, N).call(this, t10.event, t10), e7(this, C, O).call(this, t10, e10.eventSamplingRate) && (e6(this, T).push(t10), e7(this, C, R).call(this));
        }
      };
      S = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), E = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakSet(), O = function(e10, t10) {
        return this.isEnabled && !this.isDebug && e7(this, C, P).call(this, e10, t10);
      }, P = function(e10, t10) {
        let r10 = Math.random();
        return !e6(this, k).isEventThrottled(e10) && r10 <= e6(this, S).samplingRate && (void 0 === t10 || r10 <= t10);
      }, R = function() {
        if ("undefined" == typeof window) {
          e7(this, C, I).call(this);
          return;
        }
        if (e6(this, T).length >= e6(this, S).maxBufferSize) {
          e6(this, E) && ("undefined" != typeof cancelIdleCallback ? cancelIdleCallback : clearTimeout)(e6(this, E)), e7(this, C, I).call(this);
          return;
        }
        e6(this, E) || ("requestIdleCallback" in window ? e9(this, E, requestIdleCallback(() => {
          e7(this, C, I).call(this);
        })) : e9(this, E, setTimeout(() => {
          e7(this, C, I).call(this);
        }, 0)));
      }, I = function() {
        fetch(new URL("/v1/event", e6(this, S).endpoint), { method: "POST", body: JSON.stringify({ events: e6(this, T) }), headers: { "Content-Type": "application/json" } }).catch(() => void 0).then(() => {
          e9(this, T, []);
        }).catch(() => void 0);
      }, N = function(e10, t10) {
        this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
      }, A = function() {
        let e10 = { name: e6(this, x).sdk, version: e6(this, x).sdkVersion };
        return "undefined" != typeof window && window.Clerk && (e10 = { ...e10, ...window.Clerk.constructor.sdkMetadata }), e10;
      }, M = function(e10, t10) {
        var r10, n10;
        let i2 = e7(this, C, A).call(this);
        return { event: e10, cv: null != (r10 = e6(this, x).clerkVersion) ? r10 : "", it: null != (n10 = e6(this, x).instanceType) ? n10 : "", sdk: i2.name, sdkv: i2.version, ...e6(this, x).publishableKey ? { pk: e6(this, x).publishableKey } : {}, ...e6(this, x).secretKey ? { sk: e6(this, x).secretKey } : {}, payload: t10 };
      }, r(568), "undefined" == typeof URLPattern || URLPattern;
      let ng = { Headers: { NextRewrite: "x-middleware-rewrite", NextResume: "x-middleware-next", NextRedirect: "Location", NextUrl: "next-url", NextAction: "next-action", NextjsData: "x-nextjs-data" } }, nm = (e10) => e10.headers.get(ng.Headers.NextRedirect), nv = (e10, t10, r10) => (e10.headers.set(t10, r10), e10);
      var ny = "__clerk_db_jwt";
      let nb = (e10, t10, r10) => {
        let n10 = t10.headers.get("location");
        if ("true" === t10.headers.get(tz.Headers.ClerkRedirectTo) && n10 && tA(r10.secretKey) && e10.clerkUrl.isCrossOrigin(n10)) {
          let r11 = e10.cookies.get(ny) || "", i2 = function(e11, t11) {
            let r12 = new URL(e11), n11 = r12.searchParams.get(ny);
            r12.searchParams.delete(ny);
            let i3 = n11 || t11;
            return i3 && r12.searchParams.set(ny, i3), r12;
          }(new URL(n10), r11);
          return eh.redirect(i2.href, t10);
        }
        return t10;
      }, nw = { i8: "14.2.5" }, n_ = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch (e11) {
          return "";
        }
      }, nS = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? n_(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, n_(t10)])), null, 2)).join(", "), nk = (e10, t10) => () => {
        let r10 = [], n10 = false;
        return { enable: () => {
          n10 = true;
        }, debug: (...e11) => {
          n10 && r10.push(e11.map((e12) => "function" == typeof e12 ? e12() : e12));
        }, commit: () => {
          if (n10) {
            for (let n11 of (console.log(`[clerk debug start: ${e10}]`), r10)) {
              let e11 = t10(n11);
              e11 = e11.split("\n").map((e12) => `  ${e12}`).join("\n"), process.env.VERCEL && (e11 = function(e12, t11) {
                let r11 = new TextEncoder(), n12 = new TextDecoder("utf-8"), i2 = r11.encode(e12).slice(0, 4096);
                return n12.decode(i2).replace(/\uFFFD/g, "");
              }(e11, 0)), console.log(e11);
            }
            console.log(`[clerk debug end: ${e10}] (@clerk/nextjs=5.3.2,next=${nw.i8})`);
          }
        } };
      }, nx = (e10, t10) => (...r10) => {
        let n10 = ("string" == typeof e10 ? nk(e10, nS) : e10)(), i2 = t10(n10);
        try {
          let e11 = i2(...r10);
          if ("object" == typeof e11 && "then" in e11 && "function" == typeof e11.then) return e11.then((e12) => (n10.commit(), e12)).catch((e12) => {
            throw n10.commit(), e12;
          });
          return n10.commit(), e11;
        } catch (e11) {
          throw n10.commit(), e11;
        }
      };
      function nT(e10) {
        let t10 = { ...e10 }, r10 = rj(t10), n10 = function(e11) {
          let t11 = ni(na, e11.options);
          return { authenticateRequest: (e12, r11 = {}) => {
            let { apiUrl: n11, apiVersion: i3 } = t11, a2 = ni(t11, r11);
            return nr(e12, { ...r11, ...a2, apiUrl: n11, apiVersion: i3 });
          }, debugRequestState: nn };
        }({ options: t10, apiClient: r10 }), i2 = new nf({ ...e10.telemetry, publishableKey: t10.publishableKey, secretKey: t10.secretKey, ...t10.sdkMetadata ? { sdk: t10.sdkMetadata.name, sdkVersion: t10.sdkMetadata.version } : {} });
        return { ...r10, ...n10, telemetry: i2 };
      }
      let nE = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), n10 = r10.includes("dynamic server usage"), i2 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || n10 || i2;
      }, nC = () => {
        try {
          let { headers: e10 } = r(384);
          return new el("https://placeholder.com", { headers: e10() });
        } catch (e10) {
          if (e10 && nE(e10)) throw e10;
          throw Error(`Clerk: auth() and currentUser() are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      };
      process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let nO = process.env.CLERK_API_VERSION || "v1", nP = process.env.CLERK_SECRET_KEY || "", nR = "pk_test_bmljZS1nYXplbGxlLTI3LmNsZXJrLmFjY291bnRzLmRldiQ", nI = process.env.CLERK_ENCRYPTION_KEY || "", nN = process.env.CLERK_API_URL || ((e10) => {
        var t10;
        let r10 = null == (t10 = tN(e10)) ? void 0 : t10.frontendApi;
        return (null == r10 ? void 0 : r10.startsWith("clerk.")) && tE.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? tR : tO.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? "https://api.lclclerk.com" : tP.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? "https://api.clerkstage.dev" : tR;
      })(nR), nA = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", nM = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", nU = nd(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, nL = "/sign-in", nD = nd(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), nj = nd(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG);
      function nq(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      var nB = /* @__PURE__ */ new Set(), nH = { warnOnce: (e10) => {
        nB.has(e10) || (nB.add(e10), console.warn(e10));
      } };
      function n$(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var nK = r(980), nz = r.n(nK), nF = r(481), nV = r.n(nF), nJ = r(11), nW = r.n(nJ);
      let nG = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true}); // or the deprecated authMiddleware()
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, nX = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true}); // or the deprecated authMiddleware()
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, nQ = tS({ packageName: "@clerk/nextjs" }), nY = "x-middleware-override-headers", nZ = "x-middleware-request", n0 = (e10, t10, r10) => {
        e10.headers.get(nY) || (e10.headers.set(nY, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${nZ}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(nY, `${e10.headers.get(nY)},${t11}`), e10.headers.set(`${nZ}-${t11}`, r11);
        });
      }, n1 = (e10, t10) => {
        let r10;
        let n10 = nq(null == t10 ? void 0 : t10.proxyUrl, e10.clerkUrl, nM);
        r10 = n10 && !n$(n10) ? new URL(n10, e10.clerkUrl).toString() : n10;
        let i2 = nq(t10.isSatellite, new URL(e10.url), nU), a2 = nq(t10.domain, new URL(e10.url), nA), s2 = (null == t10 ? void 0 : t10.signInUrl) || nL;
        if (i2 && !r10 && !a2) throw Error(nG);
        if (i2 && !n$(s2) && tA(t10.secretKey || nP)) throw Error(nX);
        return { proxyUrl: r10, isSatellite: i2, domain: a2, signInUrl: s2 };
      }, n2 = (e10) => eh.redirect(e10, { headers: { [tz.Headers.ClerkRedirectTo]: "true" } }), n4 = { secretKey: nP, publishableKey: nR, apiUrl: nN, apiVersion: nO, userAgent: "@clerk/nextjs@5.3.2", proxyUrl: nM, domain: nA, isSatellite: nU, sdkMetadata: { name: "@clerk/nextjs", version: "5.3.2", environment: "production" }, telemetry: { disabled: nD, debug: nj } }, n3 = (e10) => nT({ ...n4, ...e10 }), n5 = nT(n4), n6 = new Proxy(Object.assign(() => {
        var e10;
        let t10;
        try {
          let e11 = nC(), r11 = function(e12, t11) {
            var r12, n10;
            return !function(e13) {
              try {
                let { headers: t12, nextUrl: r13, cookies: n11 } = e13 || {};
                return "function" == typeof (null == t12 ? void 0 : t12.get) && "function" == typeof (null == r13 ? void 0 : r13.searchParams.get) && "function" == typeof (null == n11 ? void 0 : n11.get);
              } catch (e14) {
                return false;
              }
            }(e12) ? e12.headers[t11] || e12.headers[t11.toLowerCase()] || (null == (n10 = null == (r12 = e12.socket) ? void 0 : r12._httpMessage) ? void 0 : n10.getHeader(t11)) : e12.headers.get(t11);
          }(e11, tz.Headers.ClerkRequestData);
          t10 = function(e12) {
            if (!e12) return {};
            try {
              let t11 = nz().decrypt(e12, nI || nP).toString(nV());
              return JSON.parse(t11);
            } catch (e13) {
              throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
            }
          }(r11);
        } catch (e11) {
          if (e11 && nE(e11)) throw e11;
        }
        let r10 = null != (e10 = ia.getStore()) ? e10 : t10;
        return (null == r10 ? void 0 : r10.secretKey) || (null == r10 ? void 0 : r10.publishableKey) ? n3(r10) : n5;
      }, n5), { get: (e10, t10, r10) => (tq("clerkClient singleton", "Use `clerkClient()` as a function instead."), Reflect.get(e10, t10, r10)) }), n8 = (e10) => {
        let { redirectToSignIn: t10, authObject: r10, redirect: n10, notFound: i2, request: a2 } = e10;
        return (...e11) => {
          var s2, o2, l2, c2, u2, d2;
          let h2 = (null == (s2 = e11[0]) ? void 0 : s2.unauthenticatedUrl) || (null == (o2 = e11[0]) ? void 0 : o2.unauthorizedUrl) ? void 0 : e11[0], p2 = (null == (l2 = e11[0]) ? void 0 : l2.unauthenticatedUrl) || (null == (c2 = e11[1]) ? void 0 : c2.unauthenticatedUrl), f2 = (null == (u2 = e11[0]) ? void 0 : u2.unauthorizedUrl) || (null == (d2 = e11[1]) ? void 0 : d2.unauthorizedUrl), g2 = () => f2 ? n10(f2) : i2();
          return r10.userId ? h2 ? "function" == typeof h2 ? h2(r10.has) ? r10 : g2() : r10.has(h2) ? r10 : g2() : r10 : p2 ? n10(p2) : n7(a2) ? t10() : i2();
        };
      }, n9 = (e10) => {
        var t10, r10;
        return !!e10.headers.get(ng.Headers.NextUrl) && ((null == (t10 = e10.headers.get(tz.Headers.Accept)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(tz.Headers.ContentType)) ? void 0 : r10.includes("multipart/form-data")) || !!e10.headers.get(ng.Headers.NextAction));
      }, n7 = (e10) => {
        var t10;
        return "document" === e10.headers.get(tz.Headers.SecFetchDest) || "iframe" === e10.headers.get(tz.Headers.SecFetchDest) || (null == (t10 = e10.headers.get(tz.Headers.Accept)) ? void 0 : t10.includes("text/html")) || ie(e10) || ir(e10);
      }, ie = (e10) => !!e10.headers.get(ng.Headers.NextUrl) && !n9(e10) || it(), it = () => {
        var e10;
        let t10 = globalThis.fetch;
        return !!(function(e11) {
          return "__nextPatched" in e11 && true === e11.__nextPatched;
        }(t10) && (null == (e10 = t10.__nextGetStaticStore().getStore()) ? void 0 : e10.pagePath));
      }, ir = (e10) => !!e10.headers.get(ng.Headers.NextjsData), ii = { FORCE_NOT_FOUND: "CLERK_PROTECT_REWRITE", REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL", REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN" }, ia = new eQ.AsyncLocalStorage(), is = (e10) => [e10[0] instanceof Request ? e10[0] : void 0, e10[0] instanceof Request ? e10[1] : void 0], io = (e10) => ["function" == typeof e10[0] ? e10[0] : void 0, (2 === e10.length ? e10[1] : "function" == typeof e10[0] ? {} : e10[0]) || {}], il = (e10, t10) => ({ ...t10, ...n1(e10, t10) }), ic = (e10) => (t10 = {}) => {
        let r10 = Error(ii.REDIRECT_TO_SIGN_IN);
        throw r10.returnBackUrl = null === t10.returnBackUrl ? "" : t10.returnBackUrl || e10.clerkUrl.toString(), r10;
      }, iu = (e10, t10, r10) => (n10, i2) => n8({ request: e10, redirect: (e11) => {
        let t11 = Error(ii.REDIRECT_TO_URL);
        throw t11.redirectUrl = e11, t11;
      }, notFound: () => {
        throw Error(ii.FORCE_NOT_FOUND);
      }, authObject: t10, redirectToSignIn: r10 })(n10, i2), id = (e10, t10, r10) => {
        switch (e10.message) {
          case ii.FORCE_NOT_FOUND:
            return nv(eh.rewrite(`${t10.clerkUrl.origin}/clerk_${Date.now()}`), tz.Headers.AuthReason, "protect-rewrite");
          case ii.REDIRECT_TO_URL:
            return n2(e10.redirectUrl);
          case ii.REDIRECT_TO_SIGN_IN:
            return nc({ redirectAdapter: n2, baseUrl: t10.clerkUrl, signInUrl: r10.signInUrl, signUpUrl: r10.signUpUrl, publishableKey: r10.publishableKey }).redirectToSignIn({ returnBackUrl: e10.returnBackUrl });
          default:
            throw e10;
        }
      }, ih = ((e10) => {
        if ("function" == typeof e10) return (t11) => e10(t11);
        let t10 = eX([e10 || ""].flat().filter(Boolean));
        return (e11) => t10.some((t11) => t11.test(e11.nextUrl.pathname));
      })(["/sign-in(.*)", "/sign-up(.*)", "/api/workflows/(.*)*"]), ip = ((...e10) => {
        let [t10, r10] = is(e10), [n10, i2] = io(e10), a2 = function(e11, t11) {
          return e11 || t11(), e11;
        }(i2.publishableKey || nR, () => nQ.throwMissingPublishableKeyError()), s2 = function(e11, t11) {
          return e11 || t11(), e11;
        }(i2.secretKey || nP, () => nQ.throwMissingSecretKeyError()), o2 = i2.signInUrl || nL, l2 = i2.signUpUrl || "/sign-up", c2 = { ...i2, publishableKey: a2, secretKey: s2, signInUrl: o2, signUpUrl: l2 };
        return ia.run(c2, () => {
          n6().telemetry.record({ event: "METHOD_CALLED", payload: { method: "clerkMiddleware", handler: !!n10, satellite: !!c2.isSatellite, proxy: !!c2.proxyUrl } });
          let e11 = nx("clerkMiddleware", (e12) => async (t11, r11) => {
            i2.debug && e12.enable();
            let a3 = rX(t11);
            e12.debug("options", c2), e12.debug("url", () => a3.toJSON());
            let s3 = await n6().authenticateRequest(a3, il(a3, c2));
            if (e12.debug("requestState", () => ({ status: s3.status, headers: JSON.stringify(Object.fromEntries(s3.headers)), reason: s3.reason })), s3.headers.get(tz.Headers.Location)) return new Response(null, { status: 307, headers: s3.headers });
            if (s3.status === r$.Handshake) throw Error("Clerk: handshake status without redirect");
            let o3 = s3.toAuth();
            e12.debug("auth", () => ({ auth: o3, debug: o3.debug() }));
            let l3 = ic(a3), u2 = iu(a3, o3, l3), d2 = Object.assign(o3, { protect: u2, redirectToSignIn: l3 }), h2 = eh.next();
            try {
              h2 = await ia.run(c2, async () => null == n10 ? void 0 : n10(() => d2, t11, r11)) || h2;
            } catch (e13) {
              h2 = id(e13, a3, s3);
            }
            return (s3.headers && s3.headers.forEach((e13, t12) => {
              h2.headers.append(t12, e13);
            }), nm(h2)) ? (e12.debug("handlerResult is redirect"), nb(a3, h2, c2)) : (c2.debug && n0(h2, a3, { [tz.Headers.EnableDebug]: "true" }), !function(e13, t12, r12, n11) {
              var i3, a4;
              let s4;
              let { reason: o4, message: l4, status: c3, token: u3 } = r12;
              if (t12 || (t12 = eh.next()), t12.headers.get(ng.Headers.NextRedirect)) return;
              "1" === t12.headers.get(ng.Headers.NextResume) && (t12.headers.delete(ng.Headers.NextResume), s4 = new URL(e13.url));
              let d3 = t12.headers.get(ng.Headers.NextRewrite);
              if (d3) {
                let t13 = new URL(e13.url);
                if ((s4 = new URL(d3)).origin !== t13.origin) return;
              }
              if (s4) {
                let r13 = function(e14) {
                  var t13;
                  if (e14 && Object.values(e14).length) {
                    if (e14.secretKey && !nI) {
                      nH.warnOnce("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys");
                      return;
                    }
                    return nz().encrypt(JSON.stringify(e14), nI || (t13 = () => nQ.throwMissingSecretKeyError(), nP || t13(), nP)).toString();
                  }
                }(n11);
                n0(t12, e13, { [tz.Headers.AuthStatus]: c3, [tz.Headers.AuthToken]: u3 || "", [tz.Headers.AuthSignature]: u3 ? (a4 = null != (i3 = null == n11 ? void 0 : n11.secretKey) ? i3 : nP, nW()(u3, a4).toString()) : "", [tz.Headers.AuthMessage]: l4 || "", [tz.Headers.AuthReason]: o4 || "", [tz.Headers.ClerkUrl]: e13.clerkUrl.toString(), ...r13 ? { [tz.Headers.ClerkRequestData]: r13 } : {} }), t12.headers.set(ng.Headers.NextRewrite, s4.href);
              }
            }(a3, h2, s3, i2), h2);
          });
          return t10 && r10 ? e11(t10, r10) : e11;
        });
      })(async (e10, t10) => {
        ih(t10) || await e10().protect();
      }), ig = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] }, im = { ...U }, iv = im.middleware || im.default, iy = "/src/middleware";
      if ("function" != typeof iv) throw Error(`The Middleware "${iy}" must export a \`middleware\` or a \`default\` function`);
      function ib(e10) {
        return eV({ ...e10, page: iy, handler: iv });
      }
    }, 2: (e, t) => {
      "use strict";
      function r(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
      t.Q = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("argument str must be a string");
        for (var n = {}, i = (t2 || {}).decode || r, a = 0; a < e2.length; ) {
          var s = e2.indexOf("=", a);
          if (-1 === s) break;
          var o = e2.indexOf(";", a);
          if (-1 === o) o = e2.length;
          else if (o < s) {
            a = e2.lastIndexOf(";", s - 1) + 1;
            continue;
          }
          var l = e2.slice(a, s).trim();
          if (void 0 === n[l]) {
            var c = e2.slice(s + 1, o).trim();
            34 === c.charCodeAt(0) && (c = c.slice(1, -1)), n[l] = function(e3, t3) {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            }(c, i);
          }
          a = o + 1;
        }
        return n;
      }, Object.prototype.toString;
    }, 980: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s, o, l, c, u, d, h, p, f;
        return t2 = e2.lib.BlockCipher, r2 = e2.algo, n2 = [], i = [], a = [], s = [], o = [], l = [], c = [], u = [], d = [], h = [], function() {
          for (var e3 = [], t3 = 0; t3 < 256; t3++) t3 < 128 ? e3[t3] = t3 << 1 : e3[t3] = t3 << 1 ^ 283;
          for (var r3 = 0, p2 = 0, t3 = 0; t3 < 256; t3++) {
            var f2 = p2 ^ p2 << 1 ^ p2 << 2 ^ p2 << 3 ^ p2 << 4;
            f2 = f2 >>> 8 ^ 255 & f2 ^ 99, n2[r3] = f2, i[f2] = r3;
            var g = e3[r3], m = e3[g], v = e3[m], y = 257 * e3[f2] ^ 16843008 * f2;
            a[r3] = y << 24 | y >>> 8, s[r3] = y << 16 | y >>> 16, o[r3] = y << 8 | y >>> 24, l[r3] = y;
            var y = 16843009 * v ^ 65537 * m ^ 257 * g ^ 16843008 * r3;
            c[f2] = y << 24 | y >>> 8, u[f2] = y << 16 | y >>> 16, d[f2] = y << 8 | y >>> 24, h[f2] = y, r3 ? (r3 = g ^ e3[e3[e3[v ^ g]]], p2 ^= e3[e3[p2]]) : r3 = p2 = 1;
          }
        }(), p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], f = r2.AES = t2.extend({ _doReset: function() {
          if (!this._nRounds || this._keyPriorReset !== this._key) {
            for (var e3, t3 = this._keyPriorReset = this._key, r3 = t3.words, i2 = t3.sigBytes / 4, a2 = ((this._nRounds = i2 + 6) + 1) * 4, s2 = this._keySchedule = [], o2 = 0; o2 < a2; o2++) o2 < i2 ? s2[o2] = r3[o2] : (e3 = s2[o2 - 1], o2 % i2 ? i2 > 6 && o2 % i2 == 4 && (e3 = n2[e3 >>> 24] << 24 | n2[e3 >>> 16 & 255] << 16 | n2[e3 >>> 8 & 255] << 8 | n2[255 & e3]) : e3 = (n2[(e3 = e3 << 8 | e3 >>> 24) >>> 24] << 24 | n2[e3 >>> 16 & 255] << 16 | n2[e3 >>> 8 & 255] << 8 | n2[255 & e3]) ^ p[o2 / i2 | 0] << 24, s2[o2] = s2[o2 - i2] ^ e3);
            for (var l2 = this._invKeySchedule = [], f2 = 0; f2 < a2; f2++) {
              var o2 = a2 - f2;
              if (f2 % 4) var e3 = s2[o2];
              else var e3 = s2[o2 - 4];
              f2 < 4 || o2 <= 4 ? l2[f2] = e3 : l2[f2] = c[n2[e3 >>> 24]] ^ u[n2[e3 >>> 16 & 255]] ^ d[n2[e3 >>> 8 & 255]] ^ h[n2[255 & e3]];
            }
          }
        }, encryptBlock: function(e3, t3) {
          this._doCryptBlock(e3, t3, this._keySchedule, a, s, o, l, n2);
        }, decryptBlock: function(e3, t3) {
          var r3 = e3[t3 + 1];
          e3[t3 + 1] = e3[t3 + 3], e3[t3 + 3] = r3, this._doCryptBlock(e3, t3, this._invKeySchedule, c, u, d, h, i);
          var r3 = e3[t3 + 1];
          e3[t3 + 1] = e3[t3 + 3], e3[t3 + 3] = r3;
        }, _doCryptBlock: function(e3, t3, r3, n3, i2, a2, s2, o2) {
          for (var l2 = this._nRounds, c2 = e3[t3] ^ r3[0], u2 = e3[t3 + 1] ^ r3[1], d2 = e3[t3 + 2] ^ r3[2], h2 = e3[t3 + 3] ^ r3[3], p2 = 4, f2 = 1; f2 < l2; f2++) {
            var g = n3[c2 >>> 24] ^ i2[u2 >>> 16 & 255] ^ a2[d2 >>> 8 & 255] ^ s2[255 & h2] ^ r3[p2++], m = n3[u2 >>> 24] ^ i2[d2 >>> 16 & 255] ^ a2[h2 >>> 8 & 255] ^ s2[255 & c2] ^ r3[p2++], v = n3[d2 >>> 24] ^ i2[h2 >>> 16 & 255] ^ a2[c2 >>> 8 & 255] ^ s2[255 & u2] ^ r3[p2++], y = n3[h2 >>> 24] ^ i2[c2 >>> 16 & 255] ^ a2[u2 >>> 8 & 255] ^ s2[255 & d2] ^ r3[p2++];
            c2 = g, u2 = m, d2 = v, h2 = y;
          }
          var g = (o2[c2 >>> 24] << 24 | o2[u2 >>> 16 & 255] << 16 | o2[d2 >>> 8 & 255] << 8 | o2[255 & h2]) ^ r3[p2++], m = (o2[u2 >>> 24] << 24 | o2[d2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[255 & c2]) ^ r3[p2++], v = (o2[d2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[255 & u2]) ^ r3[p2++], y = (o2[h2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[u2 >>> 8 & 255] << 8 | o2[255 & d2]) ^ r3[p2++];
          e3[t3] = g, e3[t3 + 1] = m, e3[t3 + 2] = v, e3[t3 + 3] = y;
        }, keySize: 8 }), e2.AES = t2._createHelper(f), e2.AES;
      }, e.exports = n(r(308), r(836), r(681), r(926), r(358));
    }, 358: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s, o, l, c, u, d, h, p, f, g, m, v;
        e2.lib.Cipher || (r2 = (t2 = e2.lib).Base, n2 = t2.WordArray, i = t2.BufferedBlockAlgorithm, (a = e2.enc).Utf8, s = a.Base64, o = e2.algo.EvpKDF, l = t2.Cipher = i.extend({ cfg: r2.extend(), createEncryptor: function(e3, t3) {
          return this.create(this._ENC_XFORM_MODE, e3, t3);
        }, createDecryptor: function(e3, t3) {
          return this.create(this._DEC_XFORM_MODE, e3, t3);
        }, init: function(e3, t3, r3) {
          this.cfg = this.cfg.extend(r3), this._xformMode = e3, this._key = t3, this.reset();
        }, reset: function() {
          i.reset.call(this), this._doReset();
        }, process: function(e3) {
          return this._append(e3), this._process();
        }, finalize: function(e3) {
          return e3 && this._append(e3), this._doFinalize();
        }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: /* @__PURE__ */ function() {
          function e3(e4) {
            return "string" == typeof e4 ? v : g;
          }
          return function(t3) {
            return { encrypt: function(r3, n3, i2) {
              return e3(n3).encrypt(t3, r3, n3, i2);
            }, decrypt: function(r3, n3, i2) {
              return e3(n3).decrypt(t3, r3, n3, i2);
            } };
          };
        }() }), t2.StreamCipher = l.extend({ _doFinalize: function() {
          return this._process(true);
        }, blockSize: 1 }), c = e2.mode = {}, u = t2.BlockCipherMode = r2.extend({ createEncryptor: function(e3, t3) {
          return this.Encryptor.create(e3, t3);
        }, createDecryptor: function(e3, t3) {
          return this.Decryptor.create(e3, t3);
        }, init: function(e3, t3) {
          this._cipher = e3, this._iv = t3;
        } }), d = c.CBC = function() {
          var e3 = u.extend();
          function t3(e4, t4, r3) {
            var n3, i2 = this._iv;
            i2 ? (n3 = i2, this._iv = void 0) : n3 = this._prevBlock;
            for (var a2 = 0; a2 < r3; a2++) e4[t4 + a2] ^= n3[a2];
          }
          return e3.Encryptor = e3.extend({ processBlock: function(e4, r3) {
            var n3 = this._cipher, i2 = n3.blockSize;
            t3.call(this, e4, r3, i2), n3.encryptBlock(e4, r3), this._prevBlock = e4.slice(r3, r3 + i2);
          } }), e3.Decryptor = e3.extend({ processBlock: function(e4, r3) {
            var n3 = this._cipher, i2 = n3.blockSize, a2 = e4.slice(r3, r3 + i2);
            n3.decryptBlock(e4, r3), t3.call(this, e4, r3, i2), this._prevBlock = a2;
          } }), e3;
        }(), h = (e2.pad = {}).Pkcs7 = { pad: function(e3, t3) {
          for (var r3 = 4 * t3, i2 = r3 - e3.sigBytes % r3, a2 = i2 << 24 | i2 << 16 | i2 << 8 | i2, s2 = [], o2 = 0; o2 < i2; o2 += 4) s2.push(a2);
          var l2 = n2.create(s2, i2);
          e3.concat(l2);
        }, unpad: function(e3) {
          var t3 = 255 & e3.words[e3.sigBytes - 1 >>> 2];
          e3.sigBytes -= t3;
        } }, t2.BlockCipher = l.extend({ cfg: l.cfg.extend({ mode: d, padding: h }), reset: function() {
          l.reset.call(this);
          var e3, t3 = this.cfg, r3 = t3.iv, n3 = t3.mode;
          this._xformMode == this._ENC_XFORM_MODE ? e3 = n3.createEncryptor : (e3 = n3.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e3 ? this._mode.init(this, r3 && r3.words) : (this._mode = e3.call(n3, this, r3 && r3.words), this._mode.__creator = e3);
        }, _doProcessBlock: function(e3, t3) {
          this._mode.processBlock(e3, t3);
        }, _doFinalize: function() {
          var e3, t3 = this.cfg.padding;
          return this._xformMode == this._ENC_XFORM_MODE ? (t3.pad(this._data, this.blockSize), e3 = this._process(true)) : (e3 = this._process(true), t3.unpad(e3)), e3;
        }, blockSize: 4 }), p = t2.CipherParams = r2.extend({ init: function(e3) {
          this.mixIn(e3);
        }, toString: function(e3) {
          return (e3 || this.formatter).stringify(this);
        } }), f = (e2.format = {}).OpenSSL = { stringify: function(e3) {
          var t3 = e3.ciphertext, r3 = e3.salt;
          return (r3 ? n2.create([1398893684, 1701076831]).concat(r3).concat(t3) : t3).toString(s);
        }, parse: function(e3) {
          var t3, r3 = s.parse(e3), i2 = r3.words;
          return 1398893684 == i2[0] && 1701076831 == i2[1] && (t3 = n2.create(i2.slice(2, 4)), i2.splice(0, 4), r3.sigBytes -= 16), p.create({ ciphertext: r3, salt: t3 });
        } }, g = t2.SerializableCipher = r2.extend({ cfg: r2.extend({ format: f }), encrypt: function(e3, t3, r3, n3) {
          n3 = this.cfg.extend(n3);
          var i2 = e3.createEncryptor(r3, n3), a2 = i2.finalize(t3), s2 = i2.cfg;
          return p.create({ ciphertext: a2, key: r3, iv: s2.iv, algorithm: e3, mode: s2.mode, padding: s2.padding, blockSize: e3.blockSize, formatter: n3.format });
        }, decrypt: function(e3, t3, r3, n3) {
          return n3 = this.cfg.extend(n3), t3 = this._parse(t3, n3.format), e3.createDecryptor(r3, n3).finalize(t3.ciphertext);
        }, _parse: function(e3, t3) {
          return "string" == typeof e3 ? t3.parse(e3, this) : e3;
        } }), m = (e2.kdf = {}).OpenSSL = { execute: function(e3, t3, r3, i2, a2) {
          if (i2 || (i2 = n2.random(8)), a2) var s2 = o.create({ keySize: t3 + r3, hasher: a2 }).compute(e3, i2);
          else var s2 = o.create({ keySize: t3 + r3 }).compute(e3, i2);
          var l2 = n2.create(s2.words.slice(t3), 4 * r3);
          return s2.sigBytes = 4 * t3, p.create({ key: s2, iv: l2, salt: i2 });
        } }, v = t2.PasswordBasedCipher = g.extend({ cfg: g.cfg.extend({ kdf: m }), encrypt: function(e3, t3, r3, n3) {
          var i2 = (n3 = this.cfg.extend(n3)).kdf.execute(r3, e3.keySize, e3.ivSize, n3.salt, n3.hasher);
          n3.iv = i2.iv;
          var a2 = g.encrypt.call(this, e3, t3, i2.key, n3);
          return a2.mixIn(i2), a2;
        }, decrypt: function(e3, t3, r3, n3) {
          n3 = this.cfg.extend(n3), t3 = this._parse(t3, n3.format);
          var i2 = n3.kdf.execute(r3, e3.keySize, e3.ivSize, t3.salt, n3.hasher);
          return n3.iv = i2.iv, g.decrypt.call(this, e3, t3, i2.key, n3);
        } }));
      }, e.exports = n(r(308), r(926));
    }, 308: function(e, t, r) {
      var n;
      n = function() {
        var e2 = e2 || function(e3, t2) {
          if ("undefined" != typeof window && window.crypto && (n2 = window.crypto), "undefined" != typeof self && self.crypto && (n2 = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (n2 = globalThis.crypto), !n2 && "undefined" != typeof window && window.msCrypto && (n2 = window.msCrypto), !n2 && void 0 !== r.g && r.g.crypto && (n2 = r.g.crypto), !n2) try {
            n2 = r(480);
          } catch (e4) {
          }
          var n2, i = function() {
            if (n2) {
              if ("function" == typeof n2.getRandomValues) try {
                return n2.getRandomValues(new Uint32Array(1))[0];
              } catch (e4) {
              }
              if ("function" == typeof n2.randomBytes) try {
                return n2.randomBytes(4).readInt32LE();
              } catch (e4) {
              }
            }
            throw Error("Native crypto module could not be used to get secure random number.");
          }, a = Object.create || /* @__PURE__ */ function() {
            function e4() {
            }
            return function(t3) {
              var r2;
              return e4.prototype = t3, r2 = new e4(), e4.prototype = null, r2;
            };
          }(), s = {}, o = s.lib = {}, l = o.Base = { extend: function(e4) {
            var t3 = a(this);
            return e4 && t3.mixIn(e4), t3.hasOwnProperty("init") && this.init !== t3.init || (t3.init = function() {
              t3.$super.init.apply(this, arguments);
            }), t3.init.prototype = t3, t3.$super = this, t3;
          }, create: function() {
            var e4 = this.extend();
            return e4.init.apply(e4, arguments), e4;
          }, init: function() {
          }, mixIn: function(e4) {
            for (var t3 in e4) e4.hasOwnProperty(t3) && (this[t3] = e4[t3]);
            e4.hasOwnProperty("toString") && (this.toString = e4.toString);
          }, clone: function() {
            return this.init.prototype.extend(this);
          } }, c = o.WordArray = l.extend({ init: function(e4, r2) {
            e4 = this.words = e4 || [], t2 != r2 ? this.sigBytes = r2 : this.sigBytes = 4 * e4.length;
          }, toString: function(e4) {
            return (e4 || d).stringify(this);
          }, concat: function(e4) {
            var t3 = this.words, r2 = e4.words, n3 = this.sigBytes, i2 = e4.sigBytes;
            if (this.clamp(), n3 % 4) for (var a2 = 0; a2 < i2; a2++) {
              var s2 = r2[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
              t3[n3 + a2 >>> 2] |= s2 << 24 - (n3 + a2) % 4 * 8;
            }
            else for (var o2 = 0; o2 < i2; o2 += 4) t3[n3 + o2 >>> 2] = r2[o2 >>> 2];
            return this.sigBytes += i2, this;
          }, clamp: function() {
            var t3 = this.words, r2 = this.sigBytes;
            t3[r2 >>> 2] &= 4294967295 << 32 - r2 % 4 * 8, t3.length = e3.ceil(r2 / 4);
          }, clone: function() {
            var e4 = l.clone.call(this);
            return e4.words = this.words.slice(0), e4;
          }, random: function(e4) {
            for (var t3 = [], r2 = 0; r2 < e4; r2 += 4) t3.push(i());
            return new c.init(t3, e4);
          } }), u = s.enc = {}, d = u.Hex = { stringify: function(e4) {
            for (var t3 = e4.words, r2 = e4.sigBytes, n3 = [], i2 = 0; i2 < r2; i2++) {
              var a2 = t3[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              n3.push((a2 >>> 4).toString(16)), n3.push((15 & a2).toString(16));
            }
            return n3.join("");
          }, parse: function(e4) {
            for (var t3 = e4.length, r2 = [], n3 = 0; n3 < t3; n3 += 2) r2[n3 >>> 3] |= parseInt(e4.substr(n3, 2), 16) << 24 - n3 % 8 * 4;
            return new c.init(r2, t3 / 2);
          } }, h = u.Latin1 = { stringify: function(e4) {
            for (var t3 = e4.words, r2 = e4.sigBytes, n3 = [], i2 = 0; i2 < r2; i2++) {
              var a2 = t3[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              n3.push(String.fromCharCode(a2));
            }
            return n3.join("");
          }, parse: function(e4) {
            for (var t3 = e4.length, r2 = [], n3 = 0; n3 < t3; n3++) r2[n3 >>> 2] |= (255 & e4.charCodeAt(n3)) << 24 - n3 % 4 * 8;
            return new c.init(r2, t3);
          } }, p = u.Utf8 = { stringify: function(e4) {
            try {
              return decodeURIComponent(escape(h.stringify(e4)));
            } catch (e5) {
              throw Error("Malformed UTF-8 data");
            }
          }, parse: function(e4) {
            return h.parse(unescape(encodeURIComponent(e4)));
          } }, f = o.BufferedBlockAlgorithm = l.extend({ reset: function() {
            this._data = new c.init(), this._nDataBytes = 0;
          }, _append: function(e4) {
            "string" == typeof e4 && (e4 = p.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
          }, _process: function(t3) {
            var r2, n3 = this._data, i2 = n3.words, a2 = n3.sigBytes, s2 = this.blockSize, o2 = a2 / (4 * s2), l2 = (o2 = t3 ? e3.ceil(o2) : e3.max((0 | o2) - this._minBufferSize, 0)) * s2, u2 = e3.min(4 * l2, a2);
            if (l2) {
              for (var d2 = 0; d2 < l2; d2 += s2) this._doProcessBlock(i2, d2);
              r2 = i2.splice(0, l2), n3.sigBytes -= u2;
            }
            return new c.init(r2, u2);
          }, clone: function() {
            var e4 = l.clone.call(this);
            return e4._data = this._data.clone(), e4;
          }, _minBufferSize: 0 });
          o.Hasher = f.extend({ cfg: l.extend(), init: function(e4) {
            this.cfg = this.cfg.extend(e4), this.reset();
          }, reset: function() {
            f.reset.call(this), this._doReset();
          }, update: function(e4) {
            return this._append(e4), this._process(), this;
          }, finalize: function(e4) {
            return e4 && this._append(e4), this._doFinalize();
          }, blockSize: 16, _createHelper: function(e4) {
            return function(t3, r2) {
              return new e4.init(r2).finalize(t3);
            };
          }, _createHmacHelper: function(e4) {
            return function(t3, r2) {
              return new g.HMAC.init(e4, r2).finalize(t3);
            };
          } });
          var g = s.algo = {};
          return s;
        }(Math);
        return e2;
      }, e.exports = n();
    }, 836: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2;
        return t2 = e2.lib.WordArray, e2.enc.Base64 = { stringify: function(e3) {
          var t3 = e3.words, r2 = e3.sigBytes, n2 = this._map;
          e3.clamp();
          for (var i = [], a = 0; a < r2; a += 3) for (var s = (t3[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (t3[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | t3[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, o = 0; o < 4 && a + 0.75 * o < r2; o++) i.push(n2.charAt(s >>> 6 * (3 - o) & 63));
          var l = n2.charAt(64);
          if (l) for (; i.length % 4; ) i.push(l);
          return i.join("");
        }, parse: function(e3) {
          var r2 = e3.length, n2 = this._map, i = this._reverseMap;
          if (!i) {
            i = this._reverseMap = [];
            for (var a = 0; a < n2.length; a++) i[n2.charCodeAt(a)] = a;
          }
          var s = n2.charAt(64);
          if (s) {
            var o = e3.indexOf(s);
            -1 !== o && (r2 = o);
          }
          return function(e4, r3, n3) {
            for (var i2 = [], a2 = 0, s2 = 0; s2 < r3; s2++) if (s2 % 4) {
              var o2 = n3[e4.charCodeAt(s2 - 1)] << s2 % 4 * 2 | n3[e4.charCodeAt(s2)] >>> 6 - s2 % 4 * 2;
              i2[a2 >>> 2] |= o2 << 24 - a2 % 4 * 8, a2++;
            }
            return t2.create(i2, a2);
          }(e3, r2, i);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, e2.enc.Base64;
      }, e.exports = n(r(308));
    }, 481: function(e, t, r) {
      var n;
      n = function(e2) {
        return e2.enc.Utf8;
      }, e.exports = n(r(308));
    }, 926: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s;
        return r2 = (t2 = e2.lib).Base, n2 = t2.WordArray, a = (i = e2.algo).MD5, s = i.EvpKDF = r2.extend({ cfg: r2.extend({ keySize: 4, hasher: a, iterations: 1 }), init: function(e3) {
          this.cfg = this.cfg.extend(e3);
        }, compute: function(e3, t3) {
          for (var r3, i2 = this.cfg, a2 = i2.hasher.create(), s2 = n2.create(), o = s2.words, l = i2.keySize, c = i2.iterations; o.length < l; ) {
            r3 && a2.update(r3), r3 = a2.update(e3).finalize(t3), a2.reset();
            for (var u = 1; u < c; u++) r3 = a2.finalize(r3), a2.reset();
            s2.concat(r3);
          }
          return s2.sigBytes = 4 * l, s2;
        } }), e2.EvpKDF = function(e3, t3, r3) {
          return s.create(r3).compute(e3, t3);
        }, e2.EvpKDF;
      }, e.exports = n(r(308), r(822), r(474));
    }, 11: function(e, t, r) {
      var n;
      n = function(e2) {
        return e2.HmacSHA1;
      }, e.exports = n(r(308), r(822), r(474));
    }, 474: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2;
        t2 = e2.lib.Base, r2 = e2.enc.Utf8, e2.algo.HMAC = t2.extend({ init: function(e3, t3) {
          e3 = this._hasher = new e3.init(), "string" == typeof t3 && (t3 = r2.parse(t3));
          var n2 = e3.blockSize, i = 4 * n2;
          t3.sigBytes > i && (t3 = e3.finalize(t3)), t3.clamp();
          for (var a = this._oKey = t3.clone(), s = this._iKey = t3.clone(), o = a.words, l = s.words, c = 0; c < n2; c++) o[c] ^= 1549556828, l[c] ^= 909522486;
          a.sigBytes = s.sigBytes = i, this.reset();
        }, reset: function() {
          var e3 = this._hasher;
          e3.reset(), e3.update(this._iKey);
        }, update: function(e3) {
          return this._hasher.update(e3), this;
        }, finalize: function(e3) {
          var t3 = this._hasher, r3 = t3.finalize(e3);
          return t3.reset(), t3.finalize(this._oKey.clone().concat(r3));
        } });
      }, e.exports = n(r(308));
    }, 681: function(e, t, r) {
      var n;
      n = function(e2) {
        return function(t2) {
          var r2 = e2.lib, n2 = r2.WordArray, i = r2.Hasher, a = e2.algo, s = [];
          !function() {
            for (var e3 = 0; e3 < 64; e3++) s[e3] = 4294967296 * t2.abs(t2.sin(e3 + 1)) | 0;
          }();
          var o = a.MD5 = i.extend({ _doReset: function() {
            this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(e3, t3) {
            for (var r3 = 0; r3 < 16; r3++) {
              var n3 = t3 + r3, i2 = e3[n3];
              e3[n3] = (i2 << 8 | i2 >>> 24) & 16711935 | (i2 << 24 | i2 >>> 8) & 4278255360;
            }
            var a2 = this._hash.words, o2 = e3[t3 + 0], h = e3[t3 + 1], p = e3[t3 + 2], f = e3[t3 + 3], g = e3[t3 + 4], m = e3[t3 + 5], v = e3[t3 + 6], y = e3[t3 + 7], b = e3[t3 + 8], w = e3[t3 + 9], _ = e3[t3 + 10], S = e3[t3 + 11], k = e3[t3 + 12], x = e3[t3 + 13], T = e3[t3 + 14], E = e3[t3 + 15], C = a2[0], O = a2[1], P = a2[2], R = a2[3];
            C = l(C, O, P, R, o2, 7, s[0]), R = l(R, C, O, P, h, 12, s[1]), P = l(P, R, C, O, p, 17, s[2]), O = l(O, P, R, C, f, 22, s[3]), C = l(C, O, P, R, g, 7, s[4]), R = l(R, C, O, P, m, 12, s[5]), P = l(P, R, C, O, v, 17, s[6]), O = l(O, P, R, C, y, 22, s[7]), C = l(C, O, P, R, b, 7, s[8]), R = l(R, C, O, P, w, 12, s[9]), P = l(P, R, C, O, _, 17, s[10]), O = l(O, P, R, C, S, 22, s[11]), C = l(C, O, P, R, k, 7, s[12]), R = l(R, C, O, P, x, 12, s[13]), P = l(P, R, C, O, T, 17, s[14]), O = l(O, P, R, C, E, 22, s[15]), C = c(C, O, P, R, h, 5, s[16]), R = c(R, C, O, P, v, 9, s[17]), P = c(P, R, C, O, S, 14, s[18]), O = c(O, P, R, C, o2, 20, s[19]), C = c(C, O, P, R, m, 5, s[20]), R = c(R, C, O, P, _, 9, s[21]), P = c(P, R, C, O, E, 14, s[22]), O = c(O, P, R, C, g, 20, s[23]), C = c(C, O, P, R, w, 5, s[24]), R = c(R, C, O, P, T, 9, s[25]), P = c(P, R, C, O, f, 14, s[26]), O = c(O, P, R, C, b, 20, s[27]), C = c(C, O, P, R, x, 5, s[28]), R = c(R, C, O, P, p, 9, s[29]), P = c(P, R, C, O, y, 14, s[30]), O = c(O, P, R, C, k, 20, s[31]), C = u(C, O, P, R, m, 4, s[32]), R = u(R, C, O, P, b, 11, s[33]), P = u(P, R, C, O, S, 16, s[34]), O = u(O, P, R, C, T, 23, s[35]), C = u(C, O, P, R, h, 4, s[36]), R = u(R, C, O, P, g, 11, s[37]), P = u(P, R, C, O, y, 16, s[38]), O = u(O, P, R, C, _, 23, s[39]), C = u(C, O, P, R, x, 4, s[40]), R = u(R, C, O, P, o2, 11, s[41]), P = u(P, R, C, O, f, 16, s[42]), O = u(O, P, R, C, v, 23, s[43]), C = u(C, O, P, R, w, 4, s[44]), R = u(R, C, O, P, k, 11, s[45]), P = u(P, R, C, O, E, 16, s[46]), O = u(O, P, R, C, p, 23, s[47]), C = d(C, O, P, R, o2, 6, s[48]), R = d(R, C, O, P, y, 10, s[49]), P = d(P, R, C, O, T, 15, s[50]), O = d(O, P, R, C, m, 21, s[51]), C = d(C, O, P, R, k, 6, s[52]), R = d(R, C, O, P, f, 10, s[53]), P = d(P, R, C, O, _, 15, s[54]), O = d(O, P, R, C, h, 21, s[55]), C = d(C, O, P, R, b, 6, s[56]), R = d(R, C, O, P, E, 10, s[57]), P = d(P, R, C, O, v, 15, s[58]), O = d(O, P, R, C, x, 21, s[59]), C = d(C, O, P, R, g, 6, s[60]), R = d(R, C, O, P, S, 10, s[61]), P = d(P, R, C, O, p, 15, s[62]), O = d(O, P, R, C, w, 21, s[63]), a2[0] = a2[0] + C | 0, a2[1] = a2[1] + O | 0, a2[2] = a2[2] + P | 0, a2[3] = a2[3] + R | 0;
          }, _doFinalize: function() {
            var e3 = this._data, r3 = e3.words, n3 = 8 * this._nDataBytes, i2 = 8 * e3.sigBytes;
            r3[i2 >>> 5] |= 128 << 24 - i2 % 32;
            var a2 = t2.floor(n3 / 4294967296);
            r3[(i2 + 64 >>> 9 << 4) + 15] = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360, r3[(i2 + 64 >>> 9 << 4) + 14] = (n3 << 8 | n3 >>> 24) & 16711935 | (n3 << 24 | n3 >>> 8) & 4278255360, e3.sigBytes = (r3.length + 1) * 4, this._process();
            for (var s2 = this._hash, o2 = s2.words, l2 = 0; l2 < 4; l2++) {
              var c2 = o2[l2];
              o2[l2] = (c2 << 8 | c2 >>> 24) & 16711935 | (c2 << 24 | c2 >>> 8) & 4278255360;
            }
            return s2;
          }, clone: function() {
            var e3 = i.clone.call(this);
            return e3._hash = this._hash.clone(), e3;
          } });
          function l(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 & r3 | ~t3 & n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function c(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 & n3 | r3 & ~n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function u(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 ^ r3 ^ n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function d(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (r3 ^ (t3 | ~n3)) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          e2.MD5 = i._createHelper(o), e2.HmacMD5 = i._createHmacHelper(o);
        }(Math), e2.MD5;
      }, e.exports = n(r(308));
    }, 822: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s;
        return r2 = (t2 = e2.lib).WordArray, n2 = t2.Hasher, i = e2.algo, a = [], s = i.SHA1 = n2.extend({ _doReset: function() {
          this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(e3, t3) {
          for (var r3 = this._hash.words, n3 = r3[0], i2 = r3[1], s2 = r3[2], o = r3[3], l = r3[4], c = 0; c < 80; c++) {
            if (c < 16) a[c] = 0 | e3[t3 + c];
            else {
              var u = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
              a[c] = u << 1 | u >>> 31;
            }
            var d = (n3 << 5 | n3 >>> 27) + l + a[c];
            c < 20 ? d += (i2 & s2 | ~i2 & o) + 1518500249 : c < 40 ? d += (i2 ^ s2 ^ o) + 1859775393 : c < 60 ? d += (i2 & s2 | i2 & o | s2 & o) - 1894007588 : d += (i2 ^ s2 ^ o) - 899497514, l = o, o = s2, s2 = i2 << 30 | i2 >>> 2, i2 = n3, n3 = d;
          }
          r3[0] = r3[0] + n3 | 0, r3[1] = r3[1] + i2 | 0, r3[2] = r3[2] + s2 | 0, r3[3] = r3[3] + o | 0, r3[4] = r3[4] + l | 0;
        }, _doFinalize: function() {
          var e3 = this._data, t3 = e3.words, r3 = 8 * this._nDataBytes, n3 = 8 * e3.sigBytes;
          return t3[n3 >>> 5] |= 128 << 24 - n3 % 32, t3[(n3 + 64 >>> 9 << 4) + 14] = Math.floor(r3 / 4294967296), t3[(n3 + 64 >>> 9 << 4) + 15] = r3, e3.sigBytes = 4 * t3.length, this._process(), this._hash;
        }, clone: function() {
          var e3 = n2.clone.call(this);
          return e3._hash = this._hash.clone(), e3;
        } }), e2.SHA1 = n2._createHelper(s), e2.HmacSHA1 = n2._createHmacHelper(s), e2.SHA1;
      }, e.exports = n(r(308));
    }, 81: (e) => {
      "use strict";
      let t = (e2) => "object" == typeof e2 && null !== e2, r = Symbol("skip"), n = (e2) => t(e2) && !(e2 instanceof RegExp) && !(e2 instanceof Error) && !(e2 instanceof Date), i = (e2, t2, a, s = /* @__PURE__ */ new WeakMap()) => {
        if (a = { deep: false, target: {}, ...a }, s.has(e2)) return s.get(e2);
        s.set(e2, a.target);
        let { target: o } = a;
        delete a.target;
        let l = (e3) => e3.map((e4) => n(e4) ? i(e4, t2, a, s) : e4);
        if (Array.isArray(e2)) return l(e2);
        for (let [c, u] of Object.entries(e2)) {
          let d = t2(c, u, e2);
          if (d === r) continue;
          let [h, p, { shouldRecurse: f = true } = {}] = d;
          "__proto__" !== h && (a.deep && f && n(p) && (p = Array.isArray(p) ? l(p) : i(p, t2, a, s)), o[h] = p);
        }
        return o;
      };
      e.exports = (e2, r2, n2) => {
        if (!t(e2)) throw TypeError(`Expected an object, got \`${e2}\` (${typeof e2})`);
        return i(e2, r2, n2);
      }, e.exports.mapObjectSkip = r;
    }, 447: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, a = {};
      function s(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, i2], ...a2] = o(e2), { domain: s2, expires: l2, httponly: d2, maxage: h2, path: p, samesite: f, secure: g, partitioned: m, priority: v } = Object.fromEntries(a2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(i2), domain: s2, ...l2 && { expires: new Date(l2) }, ...d2 && { httpOnly: true }, ..."string" == typeof h2 && { maxAge: Number(h2) }, path: p, ...f && { sameSite: c.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...v && { priority: u.includes(r2 = (r2 = v).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(a, { RequestCookies: () => d, ResponseCookies: () => h, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => s }), e.exports = ((e2, a2, s2, o2) => {
        if (a2 && "object" == typeof a2 || "function" == typeof a2) for (let l2 of n(a2)) i.call(e2, l2) || l2 === s2 || t(e2, l2, { get: () => a2[l2], enumerable: !(o2 = r(a2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), a);
      var c = ["strict", "lax", "none"], u = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => s(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => s(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, s2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (a2 = true, o2 = i3, s2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!a2 || o2 >= e4.length) && s2.push(e4.substring(t3, e4.length));
            }
            return s2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = s(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, n2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: n2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(s).join("; ");
        }
      };
    }, 692: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), a2 = r2(930), s = "context", o = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(s, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(s) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(s, a2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), a2 = r2(957), s = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, s.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let c = (0, s.getGlobal)("diag"), u = (0, i2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : a2.DiagLogLevel.INFO, e4);
                if (c && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, s.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, s.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), a2 = r2(930), s = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(s, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(s) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(s, a2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), a2 = r2(194), s = r2(277), o = r2(369), l = r2(930), c = "propagation", u = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = s.getBaggage, this.getActiveBaggage = s.getActiveBaggage, this.setBaggage = s.setBaggage, this.deleteBaggage = s.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c) || u;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), a2 = r2(139), s = r2(607), o = r2(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = s.deleteSpan, this.getSpan = s.getSpan, this.getActiveSpan = s.getActiveSpan, this.getSpanContext = s.getSpanContext, this.setSpan = s.setSpan, this.setSpanContext = s.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = c;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = a2, t3.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), a2 = r2(830), s = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (s.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          }
          function a2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), a2 = r2(130), s = i2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${s}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var a3;
            let s2 = l[o] = null !== (a3 = l[o]) && void 0 !== a3 ? a3 : { version: i2.VERSION };
            if (!n3 && s2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (s2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${s2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return s2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function s(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return s(e4);
              let o = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != o.prerelease || a3.major !== o.major ? s(e4) : 0 === a3.major ? a3.minor === o.minor && a3.patch <= o.patch ? (t4.add(e4), true) : s(e4) : a3.minor <= o.minor ? (t4.add(e4), true) : s(e4);
            };
          }
          t3._makeCompatibilityCheck = a2, t3.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = a2;
          class s extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = s;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class c extends o {
          }
          t3.NoopObservableGaugeMetric = c;
          class u extends o {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new s(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), a2 = r2(403), s = r2(139), o = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new a2.NonRecordingSpan();
              let n3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, s.isSpanContextValid)(n3) ? new a2.NonRecordingSpan(n3) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3, s2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (a3 = t4, l2 = r3) : (a3 = t4, s2 = r3, l2 = n3);
              let c = null != s2 ? s2 : o.active(), u = this.startSpan(e3, a3, c), d = (0, i2.setSpan)(c, u);
              return o.with(d, l2, void 0, u);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class a2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = a2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), a2 = r2(491), s = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(s) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(s, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(a2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(s);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r3.slice(0, i3), s = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(s) && e4.set(a2, s);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), s = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return a2.test(e3);
          }, t3.validateValue = function(e3) {
            return s.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), a2 = /^([0-9a-f]{32})$/i, s = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return s.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var a2 = n[e2] = { exports: {} }, s = true;
          try {
            t2[e2].call(a2.exports, a2, a2.exports, i), s = false;
          } finally {
            s && delete n[e2];
          }
          return a2.exports;
        }
        i.ab = "//";
        var a = {};
        (() => {
          Object.defineProperty(a, "__esModule", { value: true }), a.trace = a.propagation = a.metrics = a.diag = a.context = a.INVALID_SPAN_CONTEXT = a.INVALID_TRACEID = a.INVALID_SPANID = a.isValidSpanId = a.isValidTraceId = a.isSpanContextValid = a.createTraceState = a.TraceFlags = a.SpanStatusCode = a.SpanKind = a.SamplingDecision = a.ProxyTracerProvider = a.ProxyTracer = a.defaultTextMapSetter = a.defaultTextMapGetter = a.ValueType = a.createNoopMeter = a.DiagLogLevel = a.DiagConsoleLogger = a.ROOT_CONTEXT = a.createContextKey = a.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(a, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(a, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(a, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(a, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(a, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var s = i(102);
          Object.defineProperty(a, "createNoopMeter", { enumerable: true, get: function() {
            return s.createNoopMeter;
          } });
          var o = i(901);
          Object.defineProperty(a, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(a, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(a, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = i(125);
          Object.defineProperty(a, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var u = i(846);
          Object.defineProperty(a, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(a, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var h = i(357);
          Object.defineProperty(a, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var p = i(847);
          Object.defineProperty(a, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(a, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(a, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(a, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(a, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(a, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var v = i(476);
          Object.defineProperty(a, "INVALID_SPANID", { enumerable: true, get: function() {
            return v.INVALID_SPANID;
          } }), Object.defineProperty(a, "INVALID_TRACEID", { enumerable: true, get: function() {
            return v.INVALID_TRACEID;
          } }), Object.defineProperty(a, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return v.INVALID_SPAN_CONTEXT;
          } });
          let y = i(67);
          Object.defineProperty(a, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let b = i(506);
          Object.defineProperty(a, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let w = i(886);
          Object.defineProperty(a, "metrics", { enumerable: true, get: function() {
            return w.metrics;
          } });
          let _ = i(939);
          Object.defineProperty(a, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = i(845);
          Object.defineProperty(a, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), a.default = { context: y.context, diag: b.diag, metrics: w.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = a;
      })();
    }, 373: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, a = t2.split(n), s = (r2 || {}).decode || e2, o = 0; o < a.length; o++) {
              var l = a[o], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, s));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var a = n2 || {}, s = a.encode || r;
            if ("function" != typeof s) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = s(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != a.maxAge) {
              var c = a.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (a.domain) {
              if (!i.test(a.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + a.domain;
            }
            if (a.path) {
              if (!i.test(a.path)) throw TypeError("option path is invalid");
              l += "; Path=" + a.path;
            }
            if (a.expires) {
              if ("function" != typeof a.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly && (l += "; HttpOnly"), a.secure && (l += "; Secure"), a.sameSite) switch ("string" == typeof a.sameSite ? a.sameSite.toLowerCase() : a.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 568: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, a2) {
          !function(s2, o2) {
            "use strict";
            var l = "function", c = "undefined", u = "object", d = "string", h = "major", p = "model", f = "name", g = "type", m = "vendor", v = "version", y = "architecture", b = "console", w = "mobile", _ = "tablet", S = "smarttv", k = "wearable", x = "embedded", T = "Amazon", E = "Apple", C = "ASUS", O = "BlackBerry", P = "Browser", R = "Chrome", I = "Firefox", N = "Google", A = "Huawei", M = "Microsoft", U = "Motorola", L = "Opera", D = "Samsung", j = "Sharp", q = "Sony", B = "Xiaomi", H = "Zebra", $ = "Facebook", K = "Chromium OS", z = "Mac OS", F = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, V = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, J = function(e2, t2) {
              return typeof e2 === d && -1 !== W(t2).indexOf(W(e2));
            }, W = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === c ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, n2, i3, a3, s3, c2, d2 = 0; d2 < t2.length && !s3; ) {
                var h2 = t2[d2], p2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < h2.length && !s3 && h2[r2]; ) if (s3 = h2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) c2 = s3[++n2], typeof (a3 = p2[i3]) === u && a3.length > 0 ? 2 === a3.length ? typeof a3[1] == l ? this[a3[0]] = a3[1].call(this, c2) : this[a3[0]] = a3[1] : 3 === a3.length ? typeof a3[1] !== l || a3[1].exec && a3[1].test ? this[a3[0]] = c2 ? c2.replace(a3[1], a3[2]) : void 0 : this[a3[0]] = c2 ? a3[1].call(this, c2, a3[2]) : void 0 : 4 === a3.length && (this[a3[0]] = c2 ? a3[3].call(this, c2.replace(a3[1], a3[2])) : void 0) : this[a3] = c2 || o2;
                d2 += 2;
              }
            }, Q = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (J(t2[r2][n2], e2)) return "?" === r2 ? o2 : r2;
              } else if (J(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [v, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [v, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, v], [/opios[\/ ]+([\w\.]+)/i], [v, [f, L + " Mini"]], [/\bopr\/([\w\.]+)/i], [v, [f, L]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, v], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [v, [f, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [v, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [v, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [v, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [v, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [v, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + P], v], [/\bfocus\/([\w\.]+)/i], [v, [f, I + " Focus"]], [/\bopt\/([\w\.]+)/i], [v, [f, L + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [v, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [v, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [v, [f, L + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [v, [f, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [v, [f, I]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + P], v], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], v], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, v], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, $], v], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, v], [/\bgsa\/([\w\.]+) .*safari\//i], [v, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [v, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [v, [f, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, R + " WebView"], v], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [v, [f, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, v], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [v, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [v, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [v, Q, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, v], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], v], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [v, [f, I + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, v], [/(cobalt)\/([\w\.]+)/i], [f, [v, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, W]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [m, D], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [m, D], [g, w]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [m, E], [g, w]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [m, E], [g, _]], [/(macintosh);/i], [p, [m, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [m, j], [g, w]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [m, A], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [m, A], [g, w]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, w]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [m, "OPPO"], [g, w]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [m, "Vivo"], [g, w]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [m, "Realme"], [g, w]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [m, U], [g, w]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [m, U], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [m, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [m, "LG"], [g, w]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [m, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [m, "Nokia"], [g, w]], [/(pixel c)\b/i], [p, [m, N], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [m, N], [g, w]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [m, q], [g, w]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [m, q], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [m, "OnePlus"], [g, w]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [m, T], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [m, T], [g, w]], [/(playbook);[-\w\),; ]+(rim)/i], [p, m, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [m, O], [g, w]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [m, C], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [m, C], [g, w]], [/(nexus 9)/i], [p, [m, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [p, /_/g, " "], [g, w]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [m, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [m, "Meizu"], [g, w]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, p, [g, w]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, p, [g, _]], [/(surface duo)/i], [p, [m, M], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [m, "Fairphone"], [g, w]], [/(u304aa)/i], [p, [m, "AT&T"], [g, w]], [/\bsie-(\w*)/i], [p, [m, "Siemens"], [g, w]], [/\b(rct\w+) b/i], [p, [m, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [m, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [m, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [m, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [m, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [m, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [m, "ZTE"], [g, w]], [/\b(gen\d{3}) b.+49h/i], [p, [m, "Swiss"], [g, w]], [/\b(zur\d{3}) b/i], [p, [m, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [m, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [m, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [m, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], p, [g, w]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], p, [g, w]], [/\b(ph-1) /i], [p, [m, "Essential"], [g, w]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [m, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [m, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [m, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [m, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [m, p, [g, w]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [m, M], [g, w]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [m, H], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [m, H], [g, w]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [m, D], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [p, E + " TV"], [g, S]], [/crkey/i], [[p, R + "cast"], [m, N], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [m, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [m, j], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [m, q], [g, S]], [/(mitv-\w{5}) bui/i], [p, [m, B], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, G], [p, G], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, p, [g, b]], [/droid.+; (shield) bui/i], [p, [m, "Nvidia"], [g, b]], [/(playstation [345portablevi]+)/i], [p, [m, q], [g, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [m, M], [g, b]], [/((pebble))app/i], [m, p, [g, k]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [m, E], [g, k]], [/droid.+; (glass) \d/i], [p, [m, N], [g, k]], [/droid.+; (wt63?0{2,3})\)/i], [p, [m, H], [g, k]], [/(quest( 2| pro)?)/i], [p, [m, $], [g, k]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, x]], [/(aeobc)\b/i], [p, [m, T], [g, x]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, w]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [v, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [v, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, v], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [v, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, v], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [v, Q, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [v, Q, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[v, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, z], [v, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [v, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, v], [/\(bb(10);/i], [v, [f, O]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [v, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [v, [f, I + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [v, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [v, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [v, [f, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, K], v], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, v], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], v], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, v]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof s2 !== c && s2.navigator ? s2.navigator : o2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o2, a3 = t2 ? F(Z, t2) : Z, b2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[v] = o2, X.call(t3, n2, a3.browser), t3[h] = typeof (e3 = t3[v]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, b2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = o2, X.call(e3, n2, a3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = o2, e3[p] = o2, e3[g] = o2, X.call(e3, n2, a3.device), b2 && !e3[g] && i3 && i3.mobile && (e3[g] = w), b2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== c && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[v] = o2, X.call(e3, n2, a3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[v] = o2, X.call(e3, n2, a3.os), b2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, K).replace(/macos/i, z)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = V([f, v, h]), ee.CPU = V([y]), ee.DEVICE = V([p, m, g, b, w, S, _, k, x]), ee.ENGINE = ee.OS = V([f, v]), typeof a2 !== c ? (i2.exports && (a2 = i2.exports = ee), a2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof s2 !== c && (s2.UAParser = ee);
            var et = typeof s2 !== c && (s2.jQuery || s2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, a = {};
        function s(e2) {
          var t2 = a[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = a[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, s), n2 = false;
          } finally {
            n2 && delete a[e2];
          }
          return r2.exports;
        }
        s.ab = "//";
        var o = s(226);
        e.exports = o;
      })();
    }, 384: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { cookies: () => m, draftMode: () => v, headers: () => g });
      var n = r(991), i = r(226), a = r(701);
      let s = (0, r(612).P)();
      var o = r(850), l = r(942);
      class c extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
      class u extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      let d = "function" == typeof l.unstable_postpone;
      function h(e2, t2) {
        let r2 = new URL(e2.urlPathname, "http://n").pathname;
        if (e2.isUnstableCacheCallback) throw Error(`Route ${r2} used "${t2}" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "${t2}" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        if (e2.dynamicShouldError) throw new u(`Route ${r2} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${t2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        if (e2.prerenderState) !function(e3, t3, r3) {
          !function() {
            if (!d) throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
          }();
          let n2 = `Route ${r3} needs to bail out of prerendering at this point because it used ${t3}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
          e3.dynamicAccesses.push({ stack: e3.isDebugSkeleton ? Error().stack : void 0, expression: t3 }), l.unstable_postpone(n2);
        }(e2.prerenderState, t2, r2);
        else if (e2.revalidate = 0, e2.isStaticGeneration) {
          let n2 = new c(`Route ${r2} couldn't be rendered statically because it used \`${t2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
          throw e2.dynamicUsageDescription = t2, e2.dynamicUsageStack = n2.stack, n2;
        }
      }
      class p {
        get isEnabled() {
          return this._provider.isEnabled;
        }
        enable() {
          let e2 = o.A.getStore();
          return e2 && h(e2, "draftMode().enable()"), this._provider.enable();
        }
        disable() {
          let e2 = o.A.getStore();
          return e2 && h(e2, "draftMode().disable()"), this._provider.disable();
        }
        constructor(e2) {
          this._provider = e2;
        }
      }
      var f = r(369);
      function g() {
        let e2 = "headers", t2 = o.A.getStore();
        if (t2) {
          if (t2.forceStatic) return i.h.seal(new Headers({}));
          h(t2, e2);
        }
        return (0, f.F)(e2).headers;
      }
      function m() {
        let e2 = "cookies", t2 = o.A.getStore();
        if (t2) {
          if (t2.forceStatic) return n.Qb.seal(new a.q(new Headers({})));
          h(t2, e2);
        }
        let r2 = (0, f.F)(e2), i2 = s.getStore();
        return (null == i2 ? void 0 : i2.isAction) || (null == i2 ? void 0 : i2.isAppRoute) ? r2.mutableCookies : r2.cookies;
      }
      function v() {
        return new p((0, f.F)("draftMode").draftMode);
      }
    }, 369: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => i, O: () => n });
      let n = (0, r(612).P)();
      function i(e2) {
        let t2 = n.getStore();
        if (t2) return t2;
        throw Error("`" + e2 + "` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
      }
    }, 850: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(612).P)();
    }, 226: (e, t, r) => {
      "use strict";
      r.d(t, { h: () => a });
      var n = r(173);
      class i extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new i();
        }
      }
      class a extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, i2) {
            if ("symbol" == typeof r2) return n.g.get(t2, r2, i2);
            let a2 = r2.toLowerCase(), s = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            if (void 0 !== s) return n.g.get(t2, s, i2);
          }, set(t2, r2, i2, a2) {
            if ("symbol" == typeof r2) return n.g.set(t2, r2, i2, a2);
            let s = r2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return n.g.set(t2, o ?? r2, i2, a2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return n.g.has(t2, r2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 !== a2 && n.g.has(t2, a2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return n.g.deleteProperty(t2, r2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 === a2 || n.g.deleteProperty(t2, a2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return i.callable;
              default:
                return n.g.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new a(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 173: (e, t, r) => {
      "use strict";
      r.d(t, { g: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 991: (e, t, r) => {
      "use strict";
      r.d(t, { Qb: () => o, vr: () => c });
      var n = r(701), i = r(173), a = r(850);
      class s extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new s();
        }
      }
      class o {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return i.g.get(e3, t2, r2);
            }
          } });
        }
      }
      let l = Symbol.for("next.mutated.cookies");
      class c {
        static wrap(e2, t2) {
          let r2 = new n.n(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let s2 = [], o2 = /* @__PURE__ */ new Set(), c2 = () => {
            let e3 = a.A.getStore();
            if (e3 && (e3.pathWasRevalidated = true), s2 = r2.getAll().filter((e4) => o2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of s2) {
                let r3 = new n.n(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          };
          return new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case l:
                return s2;
              case "delete":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e3.delete(...t4);
                  } finally {
                    c2();
                  }
                };
              case "set":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4);
                  } finally {
                    c2();
                  }
                };
              default:
                return i.g.get(e3, t3, r3);
            }
          } });
        }
      }
    }, 701: (e, t, r) => {
      "use strict";
      r.d(t, { n: () => n.ResponseCookies, q: () => n.RequestCookies });
      var n = r(447);
    }, 387: (e) => {
      "use strict";
      e.exports = ["chrome 64", "edge 79", "firefox 67", "opera 51", "safari 12"];
    }, 703: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return s;
      }, withRequest: function() {
        return a;
      } });
      let n = new (r(67)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function a(e2, t2, r2) {
        let a2 = i(e2, t2);
        return a2 ? n.run(a2, r2) : r2();
      }
      function s(e2, t2) {
        return n.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 407: (e, t, r) => {
      "use strict";
      var n = r(195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return a;
      } });
      let i = r(703), a = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function s(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: s2, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: s2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, a);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, c = await s(o2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let d = await u.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? n.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(d);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 311: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return a;
      }, wrapRequestHandler: function() {
        return s;
      } });
      let n = r(703), i = r(407);
      function a() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function s(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 222: (e, t) => {
      "use strict";
      var r = Symbol.for("react.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), p = Symbol.iterator, f = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } }, g = Object.assign, m = {};
      function v(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = m, this.updater = r2 || f;
      }
      function y() {
      }
      function b(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = m, this.updater = r2 || f;
      }
      v.prototype.isReactComponent = {}, v.prototype.setState = function(e2, t2) {
        if ("object" != typeof e2 && "function" != typeof e2 && null != e2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e2, t2, "setState");
      }, v.prototype.forceUpdate = function(e2) {
        this.updater.enqueueForceUpdate(this, e2, "forceUpdate");
      }, y.prototype = v.prototype;
      var w = b.prototype = new y();
      w.constructor = b, g(w, v.prototype), w.isPureReactComponent = true;
      var _ = Array.isArray, S = Object.prototype.hasOwnProperty, k = { current: null }, x = { key: true, ref: true, __self: true, __source: true };
      function T(e2, t2, n2) {
        var i2, a2 = {}, s2 = null, o2 = null;
        if (null != t2) for (i2 in void 0 !== t2.ref && (o2 = t2.ref), void 0 !== t2.key && (s2 = "" + t2.key), t2) S.call(t2, i2) && !x.hasOwnProperty(i2) && (a2[i2] = t2[i2]);
        var l2 = arguments.length - 2;
        if (1 === l2) a2.children = n2;
        else if (1 < l2) {
          for (var c2 = Array(l2), u2 = 0; u2 < l2; u2++) c2[u2] = arguments[u2 + 2];
          a2.children = c2;
        }
        if (e2 && e2.defaultProps) for (i2 in l2 = e2.defaultProps) void 0 === a2[i2] && (a2[i2] = l2[i2]);
        return { $$typeof: r, type: e2, key: s2, ref: o2, props: a2, _owner: k.current };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === r;
      }
      var C = /\/+/g;
      function O(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function P(e2, t2, i2) {
        if (null == e2) return e2;
        var a2 = [], s2 = 0;
        return !function e3(t3, i3, a3, s3, o2) {
          var l2, c2, u2, d2 = typeof t3;
          ("undefined" === d2 || "boolean" === d2) && (t3 = null);
          var h2 = false;
          if (null === t3) h2 = true;
          else switch (d2) {
            case "string":
            case "number":
              h2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case r:
                case n:
                  h2 = true;
              }
          }
          if (h2) return o2 = o2(h2 = t3), t3 = "" === s3 ? "." + O(h2, 0) : s3, _(o2) ? (a3 = "", null != t3 && (a3 = t3.replace(C, "$&/") + "/"), e3(o2, i3, a3, "", function(e4) {
            return e4;
          })) : null != o2 && (E(o2) && (l2 = o2, c2 = a3 + (!o2.key || h2 && h2.key === o2.key ? "" : ("" + o2.key).replace(C, "$&/") + "/") + t3, o2 = { $$typeof: r, type: l2.type, key: c2, ref: l2.ref, props: l2.props, _owner: l2._owner }), i3.push(o2)), 1;
          if (h2 = 0, s3 = "" === s3 ? "." : s3 + ":", _(t3)) for (var f2 = 0; f2 < t3.length; f2++) {
            var g2 = s3 + O(d2 = t3[f2], f2);
            h2 += e3(d2, i3, a3, g2, o2);
          }
          else if ("function" == typeof (g2 = null === (u2 = t3) || "object" != typeof u2 ? null : "function" == typeof (u2 = p && u2[p] || u2["@@iterator"]) ? u2 : null)) for (t3 = g2.call(t3), f2 = 0; !(d2 = t3.next()).done; ) g2 = s3 + O(d2 = d2.value, f2++), h2 += e3(d2, i3, a3, g2, o2);
          else if ("object" === d2) throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === (i3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : i3) + "). If you meant to render a collection of children, use an array instead.");
          return h2;
        }(e2, a2, "", "", function(e3) {
          return t2.call(i2, e3, s2++);
        }), a2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      var I = { current: null }, N = { transition: null };
      function A() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      t.Children = { map: P, forEach: function(e2, t2, r2) {
        P(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return P(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return P(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error("React.Children.only expected to receive a single React element child.");
        return e2;
      } }, t.Component = v, t.Fragment = i, t.Profiler = s, t.PureComponent = b, t.StrictMode = a, t.Suspense = u, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { ReactCurrentDispatcher: I, ReactCurrentBatchConfig: N, ReactCurrentOwner: k }, t.act = A, t.cloneElement = function(e2, t2, n2) {
        if (null == e2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e2 + ".");
        var i2 = g({}, e2.props), a2 = e2.key, s2 = e2.ref, o2 = e2._owner;
        if (null != t2) {
          if (void 0 !== t2.ref && (s2 = t2.ref, o2 = k.current), void 0 !== t2.key && (a2 = "" + t2.key), e2.type && e2.type.defaultProps) var l2 = e2.type.defaultProps;
          for (c2 in t2) S.call(t2, c2) && !x.hasOwnProperty(c2) && (i2[c2] = void 0 === t2[c2] && void 0 !== l2 ? l2[c2] : t2[c2]);
        }
        var c2 = arguments.length - 2;
        if (1 === c2) i2.children = n2;
        else if (1 < c2) {
          l2 = Array(c2);
          for (var u2 = 0; u2 < c2; u2++) l2[u2] = arguments[u2 + 2];
          i2.children = l2;
        }
        return { $$typeof: r, type: e2.type, key: a2, ref: s2, props: i2, _owner: o2 };
      }, t.createContext = function(e2) {
        return (e2 = { $$typeof: l, _currentValue: e2, _currentValue2: e2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: o, _context: e2 }, e2.Consumer = e2;
      }, t.createElement = T, t.createFactory = function(e2) {
        var t2 = T.bind(null, e2);
        return t2.type = e2, t2;
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: c, render: e2 };
      }, t.isValidElement = E, t.lazy = function(e2) {
        return { $$typeof: h, _payload: { _status: -1, _result: e2 }, _init: R };
      }, t.memo = function(e2, t2) {
        return { $$typeof: d, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.startTransition = function(e2) {
        var t2 = N.transition;
        N.transition = {};
        try {
          e2();
        } finally {
          N.transition = t2;
        }
      }, t.unstable_act = A, t.useCallback = function(e2, t2) {
        return I.current.useCallback(e2, t2);
      }, t.useContext = function(e2) {
        return I.current.useContext(e2);
      }, t.useDebugValue = function() {
      }, t.useDeferredValue = function(e2) {
        return I.current.useDeferredValue(e2);
      }, t.useEffect = function(e2, t2) {
        return I.current.useEffect(e2, t2);
      }, t.useId = function() {
        return I.current.useId();
      }, t.useImperativeHandle = function(e2, t2, r2) {
        return I.current.useImperativeHandle(e2, t2, r2);
      }, t.useInsertionEffect = function(e2, t2) {
        return I.current.useInsertionEffect(e2, t2);
      }, t.useLayoutEffect = function(e2, t2) {
        return I.current.useLayoutEffect(e2, t2);
      }, t.useMemo = function(e2, t2) {
        return I.current.useMemo(e2, t2);
      }, t.useReducer = function(e2, t2, r2) {
        return I.current.useReducer(e2, t2, r2);
      }, t.useRef = function(e2) {
        return I.current.useRef(e2);
      }, t.useState = function(e2) {
        return I.current.useState(e2);
      }, t.useSyncExternalStore = function(e2, t2, r2) {
        return I.current.useSyncExternalStore(e2, t2, r2);
      }, t.useTransition = function() {
        return I.current.useTransition();
      }, t.version = "18.3.1";
    }, 942: (e, t, r) => {
      "use strict";
      e.exports = r(222);
    }, 831: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { snakeCase: () => l });
      var n = function() {
        return (n = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var i2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
          return e2;
        }).apply(this, arguments);
      };
      function i(e2) {
        return e2.toLowerCase();
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      var a = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], s = /[^A-Z0-9]+/gi;
      function o(e2, t2, r2) {
        return t2 instanceof RegExp ? e2.replace(t2, r2) : t2.reduce(function(e3, t3) {
          return e3.replace(t3, r2);
        }, e2);
      }
      function l(e2, t2) {
        var r2;
        return void 0 === t2 && (t2 = {}), void 0 === (r2 = n({ delimiter: "_" }, t2)) && (r2 = {}), function(e3, t3) {
          void 0 === t3 && (t3 = {});
          for (var r3 = t3.splitRegexp, n2 = t3.stripRegexp, l2 = t3.transform, c = t3.delimiter, u = o(o(e3, void 0 === r3 ? a : r3, "$1\0$2"), void 0 === n2 ? s : n2, "\0"), d = 0, h = u.length; "\0" === u.charAt(d); ) d++;
          for (; "\0" === u.charAt(h - 1); ) h--;
          return u.slice(d, h).split("\0").map(void 0 === l2 ? i : l2).join(void 0 === c ? " " : c);
        }(e2, n({ delimiter: "." }, r2));
      }
    }, 353: (e, t, r) => {
      "use strict";
      let n = r(81), { snakeCase: i } = r(831);
      e.exports = function(e2, t2) {
        return n(e2, function(e3, r2) {
          return [t2.exclude.some(function(t3) {
            return "string" == typeof t3 ? t3 === e3 : t3.test(e3);
          }) ? e3 : i(e3, t2.parsingOptions), r2];
        }, t2 = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, t2));
      };
    }, 612: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => s });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
      }
      let a = globalThis.AsyncLocalStorage;
      function s() {
        return a ? new a() : new i();
      }
    } }, (e) => {
      var t = e(e.s = 599);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(.json)?[\\/#\\?]?$"] }];
    require_prerender_manifest();
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 3, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "E:\\Demo\\next-workflow", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.mjs" };
var BuildId = "My1kQsaKYuemoWYk7Thso";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/credentials", "regex": "^/credentials(?:/)?$", "routeKeys": {}, "namedRegex": "^/credentials(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/workflows", "regex": "^/workflows(?:/)?$", "routeKeys": {}, "namedRegex": "^/workflows(?:/)?$" }], "dynamic": [{ "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }, { "page": "/workflow/editor/[workflowId]", "regex": "^/workflow/editor/([^/]+?)(?:/)?$", "routeKeys": { "nxtPworkflowId": "nxtPworkflowId" }, "namedRegex": "^/workflow/editor/(?<nxtPworkflowId>[^/]+?)(?:/)?$" }, { "page": "/workflow/runs/[workflowId]", "regex": "^/workflow/runs/([^/]+?)(?:/)?$", "routeKeys": { "nxtPworkflowId": "nxtPworkflowId" }, "namedRegex": "^/workflow/runs/(?<nxtPworkflowId>[^/]+?)(?:/)?$" }, { "page": "/workflow/runs/[workflowId]/[executionId]", "regex": "^/workflow/runs/([^/]+?)/([^/]+?)(?:/)?$", "routeKeys": { "nxtPworkflowId": "nxtPworkflowId", "nxtPexecutionId": "nxtPexecutionId" }, "namedRegex": "^/workflow/runs/(?<nxtPworkflowId>[^/]+?)/(?<nxtPexecutionId>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/api/workflows/cron": { "initialHeaders": { "content-type": "application/json", "x-next-cache-tags": "_N_T_/layout,_N_T_/api/layout,_N_T_/api/workflows/layout,_N_T_/api/workflows/cron/layout,_N_T_/api/workflows/cron/route,_N_T_/api/workflows/cron" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/api/workflows/cron", "dataRoute": null }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "eb7574b1abf8a5f0fb1e77ae506b171a", "previewModeSigningKey": "d78eed215fbf3df0c1be0799051aab8b1323cd07334c6bbd915fe9872289c62c", "previewModeEncryptionKey": "4daf348019fb425e9c5e71abb6c2f43844f7117225c5485b116f3689ad5fe1e7" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["prerender-manifest.js", "server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "environments": { "previewModeId": "eb7574b1abf8a5f0fb1e77ae506b171a", "previewModeSigningKey": "d78eed215fbf3df0c1be0799051aab8b1323cd07334c6bbd915fe9872289c62c", "previewModeEncryptionKey": "4daf348019fb425e9c5e71abb6c2f43844f7117225c5485b116f3689ad5fe1e7" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/workflows/execute/route": "/api/workflows/execute", "/favicon.ico/route": "/favicon.ico", "/api/workflows/cron/route": "/api/workflows/cron", "/(auth)/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/workflow/editor/[workflowId]/page": "/workflow/editor/[workflowId]", "/(auth)/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/workflow/runs/[workflowId]/[executionId]/page": "/workflow/runs/[workflowId]/[executionId]", "/workflow/runs/[workflowId]/page": "/workflow/runs/[workflowId]", "/(dashboard)/credentials/page": "/credentials", "/(dashboard)/(home)/page": "/", "/(dashboard)/workflows/page": "/workflows" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const config = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(config?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(config?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(config?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
/*!
* cookie
* Copyright(c) 2012-2014 Roman Shtylman
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
