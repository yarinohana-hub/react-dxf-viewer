var Ee = Object.defineProperty;
var Ce = (c, e, t) => e in c ? Ee(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var f = (c, e, t) => Ce(c, typeof e != "symbol" ? e + "" : e, t);
import Se, { forwardRef as Pe, createElement as ve, useMemo as Me, useRef as te, useState as re, useEffect as Z, useCallback as q } from "react";
import * as a from "three";
var le = { exports: {} }, se = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ge;
function Re() {
  if (ge) return se;
  ge = 1;
  var c = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(n, i, s) {
    var o = null;
    if (s !== void 0 && (o = "" + s), i.key !== void 0 && (o = "" + i.key), "key" in i) {
      s = {};
      for (var l in i)
        l !== "key" && (s[l] = i[l]);
    } else s = i;
    return i = s.ref, {
      $$typeof: c,
      type: n,
      key: o,
      ref: i !== void 0 ? i : null,
      props: s
    };
  }
  return se.Fragment = e, se.jsx = t, se.jsxs = t, se;
}
var oe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ye;
function De() {
  return ye || (ye = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === Y ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case T:
          return "Fragment";
        case C:
          return "Profiler";
        case N:
          return "StrictMode";
        case V:
          return "Suspense";
        case A:
          return "SuspenseList";
        case B:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case O:
            return "Portal";
          case S:
            return r.displayName || "Context";
          case w:
            return (r._context.displayName || "Context") + ".Consumer";
          case k:
            var d = r.render;
            return r = r.displayName, r || (r = d.displayName || d.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case E:
            return d = r.displayName || null, d !== null ? d : c(r.type) || "Memo";
          case _:
            d = r._payload, r = r._init;
            try {
              return c(r(d));
            } catch {
            }
        }
      return null;
    }
    function e(r) {
      return "" + r;
    }
    function t(r) {
      try {
        e(r);
        var d = !1;
      } catch {
        d = !0;
      }
      if (d) {
        d = console;
        var g = d.error, b = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return g.call(
          d,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          b
        ), e(r);
      }
    }
    function n(r) {
      if (r === T) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === _)
        return "<...>";
      try {
        var d = c(r);
        return d ? "<" + d + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var r = H.A;
      return r === null ? null : r.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function o(r) {
      if (U.call(r, "key")) {
        var d = Object.getOwnPropertyDescriptor(r, "key").get;
        if (d && d.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function l(r, d) {
      function g() {
        J || (J = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          d
        ));
      }
      g.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: g,
        configurable: !0
      });
    }
    function m() {
      var r = c(this.type);
      return z[r] || (z[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function P(r, d, g, b, K, ie) {
      var L = g.ref;
      return r = {
        $$typeof: j,
        type: r,
        key: d,
        props: g,
        _owner: b
      }, (L !== void 0 ? L : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: m
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: K
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ie
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function x(r, d, g, b, K, ie) {
      var L = d.children;
      if (L !== void 0)
        if (b)
          if ($(L)) {
            for (b = 0; b < L.length; b++)
              F(L[b]);
            Object.freeze && Object.freeze(L);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else F(L);
      if (U.call(d, "key")) {
        L = c(r);
        var h = Object.keys(d).filter(function(v) {
          return v !== "key";
        });
        b = 0 < h.length ? "{key: someKey, " + h.join(": ..., ") + ": ...}" : "{key: someKey}", ce[L + b] || (h = 0 < h.length ? "{" + h.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          b,
          L,
          h,
          L
        ), ce[L + b] = !0);
      }
      if (L = null, g !== void 0 && (t(g), L = "" + g), o(d) && (t(d.key), L = "" + d.key), "key" in d) {
        g = {};
        for (var u in d)
          u !== "key" && (g[u] = d[u]);
      } else g = d;
      return L && l(
        g,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), P(
        r,
        L,
        g,
        i(),
        K,
        ie
      );
    }
    function F(r) {
      R(r) ? r._store && (r._store.validated = 1) : typeof r == "object" && r !== null && r.$$typeof === _ && (r._payload.status === "fulfilled" ? R(r._payload.value) && r._payload.value._store && (r._payload.value._store.validated = 1) : r._store && (r._store.validated = 1));
    }
    function R(r) {
      return typeof r == "object" && r !== null && r.$$typeof === j;
    }
    var D = Se, j = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), w = Symbol.for("react.consumer"), S = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), Y = Symbol.for("react.client.reference"), H = D.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = Object.prototype.hasOwnProperty, $ = Array.isArray, ne = console.createTask ? console.createTask : function() {
      return null;
    };
    D = {
      react_stack_bottom_frame: function(r) {
        return r();
      }
    };
    var J, z = {}, X = D.react_stack_bottom_frame.bind(
      D,
      s
    )(), W = ne(n(s)), ce = {};
    oe.Fragment = T, oe.jsx = function(r, d, g) {
      var b = 1e4 > H.recentlyCreatedOwnerStacks++;
      return x(
        r,
        d,
        g,
        !1,
        b ? Error("react-stack-top-frame") : X,
        b ? ne(n(r)) : W
      );
    }, oe.jsxs = function(r, d, g) {
      var b = 1e4 > H.recentlyCreatedOwnerStacks++;
      return x(
        r,
        d,
        g,
        !0,
        b ? Error("react-stack-top-frame") : X,
        b ? ne(n(r)) : W
      );
    };
  })()), oe;
}
var xe;
function Te() {
  return xe || (xe = 1, process.env.NODE_ENV === "production" ? le.exports = Re() : le.exports = De()), le.exports;
}
var y = Te();
function Oe(c) {
  const e = c.isLineSegments2;
  if (!(c instanceof a.Mesh || c instanceof a.Line || c instanceof a.LineSegments || e))
    return null;
  const t = c.geometry;
  if (!t) return null;
  if (e) {
    const m = t.getAttribute("instanceStart"), P = t.getAttribute("instanceEnd");
    if (!m || !P) {
      if (!t.getAttribute("position")) return null;
    } else {
      const x = new a.Box3();
      let F = !1;
      c.updateMatrixWorld(!0);
      const R = (D) => {
        const j = D.array, O = D.itemSize;
        for (let T = 0; T < j.length; T += O) {
          const N = j[T], C = j[T + 1], w = O > 2 ? j[T + 2] : 0;
          if (isFinite(N) && isFinite(C) && isFinite(w)) {
            const S = new a.Vector3(N, C, w).applyMatrix4(c.matrixWorld);
            isFinite(S.x) && isFinite(S.y) && isFinite(S.z) && (x.expandByPoint(S), F = !0);
          }
        }
      };
      return R(m), R(P), F ? x : null;
    }
  }
  const n = t.getAttribute("position");
  if (!n || !n.array) return null;
  const i = n.array, s = n.itemSize, o = new a.Box3();
  let l = !1;
  c.updateMatrixWorld(!0);
  for (let m = 0; m < i.length; m += s) {
    const P = i[m], x = i[m + 1], F = s > 2 ? i[m + 2] : 0;
    if (isFinite(P) && isFinite(x) && isFinite(F)) {
      const R = new a.Vector3(P, x, F).applyMatrix4(c.matrixWorld);
      isFinite(R.x) && isFinite(R.y) && isFinite(R.z) && (o.expandByPoint(R), l = !0);
    }
  }
  return l ? o : null;
}
function ke(c) {
  const e = new a.Box3();
  let t = !1;
  for (const n of c) {
    const i = Oe(n);
    i && !i.isEmpty() && (e.union(i), t = !0);
  }
  return t ? e : null;
}
function pe(c, e, t) {
  const n = t.getBoundingClientRect();
  return new a.Vector2(
    (c - n.left) / n.width * 2 - 1,
    -((e - n.top) / n.height) * 2 + 1
  );
}
function Ae(c, e, t, n) {
  const i = pe(c, e, t), s = new a.Vector3(i.x, i.y, 0);
  return s.unproject(n), s.z = 0, s;
}
let I = null;
async function Fe() {
  return I || (I = await import("./Line2Helper-D4QmpFuS.js")), I;
}
function be(c, e, t = 1) {
  return I ? I.getLineMaterial(c, e, t) : new a.LineBasicMaterial({ color: c, linewidth: e, transparent: !0, opacity: t });
}
function Ie(c, e, t, n) {
  return I ? I.createOverlayFromCoordinates(c, e, t, n) : null;
}
function je(c, e) {
  return I ? I.createOverlay(c, e) : null;
}
function Ne(c, e) {
  I && I.updateResolution(c, e);
}
function He() {
  I && I.clearLineMaterialCache();
}
class Ge {
  constructor(e, t) {
    f(this, "viewer");
    f(this, "hoveredObject", null);
    f(this, "isMouseDown", !1);
    f(this, "isDragging", !1);
    f(this, "interactionLayer");
    f(this, "activeOverlays", /* @__PURE__ */ new Map());
    f(this, "selectedHandles", /* @__PURE__ */ new Set());
    f(this, "validHandles", null);
    f(this, "intersectableObjectsCache", null);
    f(this, "cacheLastUpdated", 0);
    f(this, "CACHE_TTL", 2e3);
    f(this, "dxfEntities", null);
    f(this, "_boundOnPointerMove");
    f(this, "_boundOnPointerLeave");
    f(this, "_boundOnPointerDown");
    f(this, "_boundOnPointerUp");
    f(this, "_boundOnViewChanged");
    f(this, "isEnabled", !0);
    f(this, "onClick");
    f(this, "boundingBoxMesh", null);
    f(this, "animationFrameId", null);
    f(this, "_boundOnLoaded");
    f(this, "_boundOnCleared");
    this.viewer = e, this.onClick = t, this.interactionLayer = new a.Group(), this.interactionLayer.name = "InteractionLayer", this.interactionLayer.renderOrder = 999, this.viewer.GetScene().add(this.interactionLayer), this.updateResolution(), this._boundOnPointerMove = this._onPointerMove.bind(this), this._boundOnPointerLeave = this._onPointerLeave.bind(this), this._boundOnPointerDown = this._onPointerDown.bind(this), this._boundOnPointerUp = this._onPointerUp.bind(this), this._boundOnViewChanged = this.updateResolution.bind(this), this._boundOnLoaded = this._onLoaded.bind(this), this._boundOnCleared = this._onCleared.bind(this), this.setupEventListeners(), this.initLine2Helper();
  }
  _onLoaded() {
    this.viewer.GetScene().add(this.interactionLayer), this.dxfEntities = null, this.clearHighlights();
  }
  _onCleared() {
    this.clearHighlights(), this.dxfEntities = null, this.intersectableObjectsCache = null;
  }
  async initLine2Helper() {
    await Fe();
  }
  updateResolution() {
    const e = this.viewer.GetCanvas();
    e && Ne(e.width, e.height);
  }
  setEnabled(e) {
    this.isEnabled = e, e || (this._clearHover(), this.clearHighlights());
  }
  setupEventListeners() {
    const e = this.viewer.GetCanvas();
    e && (e.addEventListener("pointermove", this._boundOnPointerMove), e.addEventListener("pointerleave", this._boundOnPointerLeave), e.addEventListener("pointerdown", this._boundOnPointerDown), e.addEventListener("pointerup", this._boundOnPointerUp), this.viewer.Subscribe("pointerdown", this._boundOnPointerDown), this.viewer.Subscribe("resized", this._boundOnViewChanged), this.viewer.Subscribe("loaded", this._boundOnLoaded), this.viewer.Subscribe("cleared", this._boundOnCleared));
  }
  destroy() {
    const e = this.viewer.GetCanvas();
    e && (e.removeEventListener("pointermove", this._boundOnPointerMove), e.removeEventListener("pointerleave", this._boundOnPointerLeave), e.removeEventListener("pointerdown", this._boundOnPointerDown), e.removeEventListener("pointerup", this._boundOnPointerUp)), this.viewer.Unsubscribe("pointerdown", this._boundOnPointerDown), this.viewer.Unsubscribe("resized", this._boundOnViewChanged), this.viewer.Unsubscribe("loaded", this._boundOnLoaded), this.viewer.Unsubscribe("cleared", this._boundOnCleared), this._clearHover(), this.clearHighlights(), He(), this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.viewer.GetScene().remove(this.interactionLayer);
  }
  resolveDxfObject(e) {
    let t = e;
    for (; t; ) {
      if (t.userData && t.userData.dxfHandle)
        return t;
      t = t.parent;
    }
    return null;
  }
  ensureDxfIndex() {
    if (this.dxfEntities) return;
    const e = this.viewer.GetDxf();
    if (!e) return;
    this.dxfEntities = /* @__PURE__ */ new Map();
    const t = (n) => {
      if (n)
        for (const i of n)
          i.handle && this.dxfEntities.set(i.handle, i);
    };
    if (e.entities && t(e.entities), e.blocks)
      if (e.blocks instanceof Map)
        e.blocks.forEach((n) => {
          n.entities && t(n.entities);
        });
      else
        for (const n in e.blocks) {
          const i = e.blocks[n];
          i.entities && t(i.entities);
        }
  }
  getGeometryFromHandle(e) {
    if (this.ensureDxfIndex(), !this.dxfEntities) return null;
    const t = this.dxfEntities.get(e);
    if (!t) return null;
    if (t.type === "LWPOLYLINE") {
      const n = t.elevation || 0;
      return { vertices: (t.vertices || []).map((s) => ({ x: s.x ?? 0, y: s.y ?? 0, z: n })), isClosed: !!(t.shape || t.closed) };
    } else {
      if (t.type === "POLYLINE")
        return { vertices: (t.vertices || []).map((i) => ({ x: i.x ?? 0, y: i.y ?? 0, z: i.z ?? 0 })), isClosed: !!(t.shape || t.closed) };
      if (t.type === "LINE") {
        if (t.vertices)
          return { vertices: t.vertices.map((i) => ({ x: i.x ?? 0, y: i.y ?? 0, z: i.z ?? 0 })), isClosed: !1 };
        if (t.start && t.end)
          return {
            vertices: [
              { x: t.start.x ?? 0, y: t.start.y ?? 0, z: t.start.z ?? 0 },
              { x: t.end.x ?? 0, y: t.end.y ?? 0, z: t.end.z ?? 0 }
            ],
            isClosed: !1
          };
      }
    }
    return null;
  }
  addOverlay(e, t, n = 3, i = 1, s = !1) {
    const o = this.resolveDxfObject(e);
    if (!o || this.activeOverlays.has(o)) return !1;
    o.updateMatrixWorld(!0);
    let l = null;
    const m = o.userData.dxfHandle, P = s ? null : this.getGeometryFromHandle(m);
    if (P) {
      const x = be(t, n, i);
      l = Ie(
        P.vertices,
        x,
        P.isClosed,
        o.matrixWorld
      );
    }
    if (!l) {
      if (o instanceof a.LineSegments || o instanceof a.Line)
        if (s) {
          const x = new a.LineBasicMaterial({
            color: t,
            linewidth: 1,
            depthTest: !1,
            transparent: !0,
            opacity: i
          });
          l = o.clone(), l.material = x, l.renderOrder = 999;
        } else {
          const x = be(t, n, i);
          l = je(o, x);
        }
      else if (o instanceof a.Mesh) {
        const x = new a.MeshBasicMaterial({
          color: t,
          transparent: !0,
          opacity: i,
          depthTest: !1
        });
        l = o.clone(), l.material = x, l.renderOrder = 999;
      }
    }
    return l ? (this.interactionLayer.add(l), this.activeOverlays.set(o, l), !0) : !1;
  }
  removeOverlay(e) {
    const t = this.resolveDxfObject(e);
    if (!t) return;
    const n = this.activeOverlays.get(t);
    n && (this.cleanupOverlayResource(n), this.activeOverlays.delete(t), this.viewer.Render());
  }
  clearAllOverlays() {
    this.activeOverlays.forEach((e) => {
      this.cleanupOverlayResource(e);
    }), this.activeOverlays.clear(), this.viewer.Render();
  }
  cleanupOverlayResource(e) {
    if (!e) return;
    e.parent && e.parent.remove(e), e.geometry && e.geometry.dispose();
    const t = e.material;
    if (t) {
      const n = e.isLineSegments2 || e.type === "LineSegments2", i = e.isLine2 || e.type === "Line2";
      !n && !i && (Array.isArray(t) ? t.forEach((s) => s.dispose()) : t.dispose());
    }
    e.children && [...e.children].forEach((n) => this.cleanupOverlayResource(n));
  }
  setValidHandles(e) {
    this.validHandles = e ? new Set(e.map((t) => t.toLowerCase())) : null, this.intersectableObjectsCache = null;
  }
  getIntersectableObjects() {
    const e = Date.now();
    if (this.intersectableObjectsCache && e - this.cacheLastUpdated < this.CACHE_TTL)
      return this.intersectableObjectsCache;
    const t = [];
    return this.viewer.GetScene().traverse((n) => {
      if (n.userData.dxfHandle && n.parent !== this.interactionLayer) {
        if (this.validHandles && !this.validHandles.has(n.userData.dxfHandle.toLowerCase()))
          return;
        t.push(n);
      }
    }), this.intersectableObjectsCache = t, this.cacheLastUpdated = e, t;
  }
  _onPointerMove(e) {
    if (!this.isEnabled) return;
    this.isMouseDown && (this.isDragging = !0);
    const t = this.viewer.GetCanvas();
    if (!t) {
      this._clearHover();
      return;
    }
    const n = pe(e.clientX, e.clientY, t), i = new a.Raycaster();
    i.setFromCamera(n, this.viewer.GetCamera()), i.params.Line.threshold = 6;
    const s = i.intersectObjects(this.getIntersectableObjects());
    let o = null;
    s.length > 0 && (o = this.resolveDxfObject(s[0].object)), o ? o !== this.hoveredObject && (this._clearHover(), this._startHover(o)) : this.hoveredObject && this._clearHover();
  }
  _startHover(e) {
    this.hoveredObject = e;
    const t = this.viewer.GetCanvas();
    t && (t.style.cursor = "pointer"), this.addOverlay(e, 39423, 4, 0.5), this.viewer.Render();
  }
  _clearHover() {
    if (this.hoveredObject) {
      const t = this.hoveredObject.userData.dxfHandle;
      (!t || !this.selectedHandles.has(t.toLowerCase())) && this.removeOverlay(this.hoveredObject), this.hoveredObject = null;
    }
    const e = this.viewer.GetCanvas();
    e && (e.style.cursor = "default");
  }
  _onPointerDown(e) {
    this.isEnabled && (this.isMouseDown = !0, this.isDragging = !1);
  }
  _onPointerUp(e) {
    if (!this.isEnabled) return;
    if (this.isDragging) {
      this.isMouseDown = !1, this.isDragging = !1;
      return;
    }
    if (this.hoveredObject) {
      const o = this.hoveredObject.userData.dxfHandle;
      this.onClick && this.onClick(o), this.isMouseDown = !1, this.isDragging = !1;
      return;
    }
    const t = this.viewer.GetCanvas();
    if (!t) return;
    const n = pe(e.clientX, e.clientY, t), i = new a.Raycaster();
    i.setFromCamera(n, this.viewer.GetCamera()), i.params.Line.threshold = 3;
    const s = i.intersectObjects(this.getIntersectableObjects());
    if (s.length > 0) {
      const o = this.resolveDxfObject(s[0].object);
      if (o) {
        const l = o.userData.dxfHandle;
        this.onClick && this.onClick(l);
      }
    }
    this.isMouseDown = !1, this.isDragging = !1;
  }
  _onPointerLeave() {
    this._clearHover(), this.isMouseDown = !1, this.isDragging = !1;
  }
  highlightHandles(e) {
    if (this.clearHighlights(), e.length === 0) return;
    const t = e.map((n) => n.toLowerCase());
    this.viewer.GetScene().traverse((n) => {
      const i = n.userData.dxfHandle;
      i && t.includes(i.toLowerCase()) && n.parent !== this.interactionLayer && this.addOverlay(n, 39423, 6);
    }), this.viewer.Render();
  }
  highlightContext(e) {
    if (e.length === 0) return;
    const t = e.map((n) => n.toLowerCase());
    this.viewer.GetScene().traverse((n) => {
      const i = n.userData.dxfHandle;
      if (i && t.includes(i.toLowerCase()) && n.parent !== this.interactionLayer) {
        if (this.selectedHandles.has(i.toLowerCase())) return;
        this.addOverlay(n, 13421772, 2);
      }
    }), this.viewer.Render();
  }
  selectHandles(e, t = [], n = !0) {
    if (this.clearHighlights(), e.length === 0) return;
    const i = e.map((l) => l.toLowerCase());
    e.forEach((l) => this.selectedHandles.add(l.toLowerCase())), t.length > 0 && this.highlightContext(t);
    const s = [];
    if (this.viewer.GetScene().traverse((l) => {
      const m = l.userData.dxfHandle;
      m && i.includes(m.toLowerCase()) && l.parent !== this.interactionLayer && ((l instanceof a.LineSegments || l instanceof a.Line) && l.geometry && !l.geometry.boundingBox && l.geometry.computeBoundingBox(), s.push(l));
    }), s.length === 0) return;
    s.forEach((l) => {
      const m = l.userData.dxfType;
      (m === "TEXT" || m === "MTEXT" || m === "ATTRIB") && l instanceof a.LineSegments ? this.addOverlay(l, 39423, 2, 1, !0) : this.addOverlay(l, 39423, 5);
    }), this.viewer.Render();
    const o = ke(s);
    !o || o.isEmpty() || (t.length === 0 && this.highlightContextInBounds(o, Array.from(this.selectedHandles)), this.createBoundingBoxOverlay(o), n && this.animateToFit(o, 800));
  }
  highlightContextInBounds(e, t) {
    const n = e.clone(), i = new a.Vector3();
    e.getSize(i), n.expandByVector(i.multiplyScalar(0.1));
    const s = t.map((o) => o.toLowerCase());
    this.viewer.GetScene().traverse((o) => {
      if (o.parent === this.interactionLayer) return;
      const l = o.userData.dxfHandle;
      if (l && s.includes(l.toLowerCase()) || !(o instanceof a.Mesh || o instanceof a.Line || o instanceof a.LineSegments)) return;
      const m = new a.Vector3();
      o.getWorldPosition(m), n.containsPoint(m) && this.addOverlay(o, 13421772, 2);
    }), this.viewer.Render();
  }
  clearHighlights() {
    this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.selectedHandles.clear(), this.clearAllOverlays(), this.boundingBoxMesh && (this.cleanupOverlayResource(this.boundingBoxMesh), this.boundingBoxMesh = null), this.viewer.Render();
  }
  createBoundingBoxOverlay(e) {
    if (e.isEmpty() || !isFinite(e.min.x) || !isFinite(e.min.y) || !isFinite(e.min.z) || !isFinite(e.max.x) || !isFinite(e.max.y) || !isFinite(e.max.z))
      return;
    this.boundingBoxMesh && (this.cleanupOverlayResource(this.boundingBoxMesh), this.boundingBoxMesh = null);
    const t = new a.Vector3(), n = new a.Vector3();
    e.getSize(t), e.getCenter(n);
    const i = 10;
    t.x < i && (t.x = i), t.y < i && (t.y = i), t.z < i && (t.z = i);
    try {
      const s = new a.BoxGeometry(t.x, t.y, t.z), o = new a.MeshBasicMaterial({
        color: 9647082,
        transparent: !0,
        opacity: 0.2,
        side: a.DoubleSide,
        depthTest: !1
      });
      this.boundingBoxMesh = new a.Mesh(s, o), this.boundingBoxMesh.position.copy(n);
      const l = new a.EdgesGeometry(s), m = new a.LineBasicMaterial({
        color: 9647082,
        linewidth: 2,
        depthTest: !1
      }), P = new a.LineSegments(l, m);
      this.boundingBoxMesh.add(P), this.viewer.GetScene().add(this.boundingBoxMesh), this.viewer.Render();
    } catch (s) {
      console.error("[EntityInteraction] Error creating bounding box overlay:", s);
    }
  }
  animateToFit(e, t) {
    this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null);
    const n = this.viewer.GetOrigin();
    if (e.isEmpty() || !isFinite(e.min.x) || !isFinite(e.min.y)) return;
    const i = new a.Vector3(), s = new a.Vector3();
    e.getSize(i), e.getCenter(s);
    const o = s.x - n.x, l = s.y - n.y, m = this.viewer.GetCanvas(), P = m ? m.width : 800, x = m ? m.height : 600, F = P / x, R = 1.5;
    let D = i.x * R;
    i.y * R * F > D && (D = i.y * R * F), D = Math.max(D, 30);
    let O = null;
    const T = performance.now(), N = (C) => {
      if (!O) {
        const _ = this.viewer.GetCamera();
        if (!isFinite(_.position.x) || !isFinite(_.zoom)) {
          this.animationFrameId = null;
          return;
        }
        if (O = {
          cx: _.position.x - n.x,
          cy: _.position.y - n.y,
          vw: _.right - _.left
        }, Math.hypot(o - O.cx, l - O.cy) < O.vw * 0.01 && Math.abs(D - O.vw) < O.vw * 0.01) {
          this.animationFrameId = null;
          return;
        }
      }
      const w = C - T, S = Math.min(w / t, 1), k = S < 0.5 ? 4 * S * S * S : 1 - Math.pow(-2 * S + 2, 3) / 2, V = O.cx + (o - O.cx) * k, A = O.cy + (l - O.cy) * k, E = O.vw + (D - O.vw) * k;
      this.viewer.SetView({ x: V + n.x, y: A + n.y }, E), this.viewer.Render(), S < 1 ? this.animationFrameId = requestAnimationFrame(N) : this.animationFrameId = null;
    };
    this.animationFrameId = requestAnimationFrame(N);
  }
}
const Be = 40, Ve = 10, ze = 20, fe = 7, ae = 16711680, We = 16733525, Ye = 16711680, Ue = 3, ee = 999, me = !1;
class $e {
  constructor(e, t, n) {
    f(this, "viewer");
    f(this, "canvas");
    f(this, "isActive", !1);
    f(this, "points", []);
    f(this, "previewLine", null);
    f(this, "polygonLine", null);
    f(this, "pointsMesh", null);
    f(this, "startPointMesh", null);
    f(this, "mousePosition", new a.Vector3());
    f(this, "completedPolygonLine", null);
    f(this, "completedPointsMesh", null);
    f(this, "isHoveringNearStart", !1);
    f(this, "onComplete");
    f(this, "onCancel");
    f(this, "_boundOnPointerDown");
    f(this, "_boundOnPointerMove");
    f(this, "_boundOnKeyDown");
    f(this, "_boundOnDblClick");
    this.viewer = e;
    const i = e.GetCanvas();
    if (!i)
      throw new Error("Canvas not available");
    this.canvas = i, this.onComplete = t, this.onCancel = n, this._boundOnPointerDown = this._onPointerDown.bind(this), this._boundOnPointerMove = this._onPointerMove.bind(this), this._boundOnKeyDown = this._onKeyDown.bind(this), this._boundOnDblClick = this._onDblClick.bind(this);
  }
  activate() {
    this.isActive || (this.isActive = !0, this.points = [], this.canvas.style.cursor = "crosshair", this.canvas.addEventListener("pointerdown", this._boundOnPointerDown, { capture: !0 }), this.canvas.addEventListener("pointermove", this._boundOnPointerMove), window.addEventListener("keydown", this._boundOnKeyDown), this.canvas.addEventListener("dblclick", this._boundOnDblClick, { capture: !0 }));
  }
  deactivate() {
    this.isActive && (this.isActive = !1, this.canvas.style.cursor = "default", this.canvas.removeEventListener("pointerdown", this._boundOnPointerDown, { capture: !0 }), this.canvas.removeEventListener("pointermove", this._boundOnPointerMove), window.removeEventListener("keydown", this._boundOnKeyDown), this.canvas.removeEventListener("dblclick", this._boundOnDblClick, { capture: !0 }), this.clearDrawingVisuals());
  }
  clearCompletedPolygon() {
    const e = this.viewer.GetScene();
    this.completedPolygonLine && (e.remove(this.completedPolygonLine), this.completedPolygonLine.geometry.dispose(), this.completedPolygonLine.material.dispose(), this.completedPolygonLine = null), this.completedPointsMesh && (e.remove(this.completedPointsMesh), this.completedPointsMesh.geometry.dispose(), this.completedPointsMesh.material.dispose(), this.completedPointsMesh = null), this.viewer.Render();
  }
  clearInProgressPolygon() {
    this.points = [], this.clearDrawingVisuals();
  }
  clearDrawingVisuals() {
    this.clearDrawingVisualsOnly();
    const e = this.viewer.GetScene();
    this.previewLine && (e.remove(this.previewLine), this.previewLine.geometry.dispose(), this.previewLine.material.dispose(), this.previewLine = null), this.viewer.Render();
  }
  getSnapThreshold() {
    const e = this.viewer.GetCamera(), n = (e.right - e.left) / e.zoom / this.canvas.width;
    return Be * n;
  }
  isNearStartPoint(e) {
    if (this.points.length < 3)
      return !1;
    const t = this.points[0], n = e.distanceTo(t), i = this.getSnapThreshold();
    return n < i;
  }
  _getWorldPosition(e) {
    return Ae(e.clientX, e.clientY, this.canvas, this.viewer.GetCamera());
  }
  _onPointerDown(e) {
    if (e.button !== 0) return;
    e.stopPropagation(), e.preventDefault();
    const t = this._getWorldPosition(e);
    if (t) {
      if (this.isNearStartPoint(t)) {
        this.completeSelection();
        return;
      }
      this.points.push(t), this.updateVisuals();
    }
  }
  _onPointerMove(e) {
    const t = this._getWorldPosition(e);
    t && (this.mousePosition.copy(t), this.isHoveringNearStart = this.isNearStartPoint(t), this.canvas.style.cursor = this.isHoveringNearStart ? "pointer" : "crosshair", this.updatePreview(), this.updateVisuals());
  }
  _onDblClick(e) {
    e.preventDefault(), e.stopPropagation(), this.completeSelection();
  }
  _onKeyDown(e) {
    this.isActive && (e.key === "Enter" ? (e.preventDefault(), e.stopPropagation(), this.completeSelection()) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this.cancelSelection()));
  }
  updateVisuals() {
    const e = this.viewer.GetScene();
    this.clearDrawingVisualsOnly(), this.points.length > 0 && (this.drawRegularPoints(e), this.drawStartPoint(e), this.drawPolygonLine(e)), this.viewer.Render();
  }
  drawRegularPoints(e) {
    if (this.points.length <= 1) return;
    const t = new a.BufferGeometry().setFromPoints(this.points.slice(1)), n = new a.PointsMaterial({
      color: ae,
      size: fe,
      sizeAttenuation: me
    });
    this.pointsMesh = new a.Points(t, n), this.pointsMesh.renderOrder = ee, e.add(this.pointsMesh);
  }
  drawStartPoint(e) {
    const t = this.isHoveringNearStart ? We : ae, n = new a.BufferGeometry().setFromPoints([this.points[0]]), i = new a.PointsMaterial({
      color: t,
      size: fe,
      sizeAttenuation: me
    });
    this.startPointMesh = new a.Points(n, i), this.startPointMesh.renderOrder = ee, e.add(this.startPointMesh);
  }
  drawPolygonLine(e) {
    if (this.points.length <= 1) return;
    const t = new a.BufferGeometry().setFromPoints(this.points), n = new a.LineBasicMaterial({ color: ae });
    this.polygonLine = new a.Line(t, n), this.polygonLine.renderOrder = ee, e.add(this.polygonLine);
  }
  clearDrawingVisualsOnly() {
    const e = this.viewer.GetScene();
    this.polygonLine && (e.remove(this.polygonLine), this.polygonLine.geometry.dispose(), this.polygonLine.material.dispose(), this.polygonLine = null), this.pointsMesh && (e.remove(this.pointsMesh), this.pointsMesh.geometry.dispose(), this.pointsMesh.material.dispose(), this.pointsMesh = null), this.startPointMesh && (e.remove(this.startPointMesh), this.startPointMesh.geometry.dispose(), this.startPointMesh.material.dispose(), this.startPointMesh = null);
  }
  updatePreview() {
    if (this.points.length === 0) return;
    const e = this.viewer.GetScene();
    this.clearPreviewLine(e);
    const t = this.points[this.points.length - 1], n = this.calculatePreviewEndPoint(), i = this.createPreviewMaterial();
    this.previewLine = new a.Line(
      new a.BufferGeometry().setFromPoints([t, n]),
      i
    ), i instanceof a.LineDashedMaterial && this.previewLine.computeLineDistances(), this.previewLine.renderOrder = ee, e.add(this.previewLine), this.viewer.Render();
  }
  clearPreviewLine(e) {
    this.previewLine && (e.remove(this.previewLine), this.previewLine.geometry.dispose(), this.previewLine.material.dispose(), this.previewLine = null);
  }
  calculatePreviewEndPoint() {
    return this.isHoveringNearStart && this.points.length >= 3 ? this.points[0] : this.mousePosition;
  }
  createPreviewMaterial() {
    return new a.LineDashedMaterial({
      color: Ye,
      dashSize: Ve,
      gapSize: ze,
      transparent: !1
    });
  }
  completeSelection() {
    if (this.points.length < Ue) {
      this.cancelSelection();
      return;
    }
    this.createCompletedPolygonBoundary();
    const e = this.findEntitiesInPolygon();
    this.onComplete(e), this.deactivate();
  }
  createCompletedPolygonBoundary() {
    const e = this.viewer.GetScene();
    this.completedPolygonLine && e.remove(this.completedPolygonLine), this.completedPointsMesh && e.remove(this.completedPointsMesh);
    const t = new a.BufferGeometry().setFromPoints(this.points), n = new a.PointsMaterial({
      color: ae,
      size: fe,
      sizeAttenuation: me
    });
    this.completedPointsMesh = new a.Points(t, n), this.completedPointsMesh.renderOrder = ee, this.completedPointsMesh.name = "completed-polygon-points", e.add(this.completedPointsMesh);
    const i = new a.BufferGeometry().setFromPoints(this.points), s = new a.LineBasicMaterial({
      color: ae
    });
    this.completedPolygonLine = new a.LineLoop(i, s), this.completedPolygonLine.renderOrder = ee, this.completedPolygonLine.name = "completed-polygon-boundary", e.add(this.completedPolygonLine), this.viewer.Render();
  }
  cancelSelection() {
    this.onCancel(), this.deactivate();
  }
  findEntitiesInPolygon() {
    const e = [], t = new a.Box3().setFromPoints(this.points);
    return this.viewer.GetScene().traverse((n) => {
      if (n.userData.dxfHandle) {
        const i = Oe(n);
        if (i && t.intersectsBox(i)) {
          const s = new a.Vector3();
          i.getCenter(s), this.isPointInPolygon(s) && e.push(n.userData.dxfHandle);
        }
      }
    }), e;
  }
  isPointInPolygon(e) {
    let t = !1;
    for (let n = 0, i = this.points.length - 1; n < this.points.length; i = n++) {
      const s = this.points[n].x, o = this.points[n].y, l = this.points[i].x, m = this.points[i].y;
      o > e.y != m > e.y && e.x < (l - s) * (e.y - o) / (m - o) + s && (t = !t);
    }
    return t;
  }
}
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Le = (...c) => c.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var qe = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = Pe(
  ({
    color: c = "currentColor",
    size: e = 24,
    strokeWidth: t = 2,
    absoluteStrokeWidth: n,
    className: i = "",
    children: s,
    iconNode: o,
    ...l
  }, m) => ve(
    "svg",
    {
      ref: m,
      ...qe,
      width: e,
      height: e,
      stroke: c,
      strokeWidth: n ? Number(t) * 24 / Number(e) : t,
      className: Le("lucide", i),
      ...l
    },
    [
      ...o.map(([P, x]) => ve(P, x)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const de = (c, e) => {
  const t = Pe(
    ({ className: n, ...i }, s) => ve(Ze, {
      ref: s,
      iconNode: e,
      className: Le(`lucide-${Xe(c)}`, n),
      ...i
    })
  );
  return t.displayName = `${c}`, t;
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = de("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ke = de("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qe = de("ZoomIn", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = de("ZoomOut", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
function ue(c) {
  const e = te(c);
  return Z(() => {
    e.current = c;
  }, [c]), e;
}
function he({ onClick: c, active: e, title: t, children: n }) {
  return /* @__PURE__ */ y.jsx(
    "button",
    {
      className: `dxf-toolbar-btn ${e ? "dxf-toolbar-btn-active" : ""}`,
      onClick: c,
      title: t,
      type: "button",
      children: n
    }
  );
}
function it({
  file: c,
  url: e,
  fileName: t = "drawing.dxf",
  fonts: n,
  className: i,
  // Inputs
  selectedHandles: s = [],
  visibleHandles: o = null,
  filteredHandles: l = null,
  isPolygonMode: m = !1,
  // Outputs
  onLoad: P,
  onError: x,
  onSelectionChange: F,
  onPolygonModeChange: R,
  // Options
  showToolbar: D = !0,
  enablePolygonSelection: j = !0,
  enableInteraction: O = !0,
  enableZoomOnSelect: T = !0
}) {
  const N = Me(
    () => o,
    [o]
  ), C = ue(F), w = ue(R), S = ue(P), k = ue(x), V = te(null), A = te(null), E = te(null), _ = te(null), B = te(!1), [Y, H] = re(!1), [U, $] = re(!0), [ne, J] = re("Initializing..."), [z, X] = re(null), [W, ce] = re(null);
  Z(() => {
    H(m);
  }, [m]), Z(() => {
    typeof window > "u" || import("./index-eV3yEHKa.js").then((h) => {
      ce(() => h.DxfViewer);
    }).catch((h) => {
      console.error("Failed to load DxfViewer:", h), X(h instanceof Error ? h : new Error(String(h))), $(!1);
    });
  }, []);
  const r = q(() => {
    var h;
    if (!V.current || !W) return null;
    if (A.current) {
      try {
        A.current.Destroy();
      } catch (u) {
        console.warn("Error destroying viewer:", u);
      }
      A.current = null;
    }
    try {
      const u = {
        autoResize: !0,
        clearColor: new a.Color("#ffffff"),
        clearAlpha: 1,
        antialias: !0,
        colorCorrection: !0,
        blackWhiteInversion: !0
      }, v = new W(V.current, u);
      if (!v.HasRenderer())
        throw new Error("WebGL not available. Please check your browser supports WebGL.");
      return A.current = v, v.Subscribe("loaded", () => {
        var M;
        console.log("DXF loaded successfully");
        const p = v.GetBounds();
        if (p) {
          const G = v.GetOrigin();
          v.FitView(
            p.minX - G.x,
            p.maxX - G.x,
            p.minY - G.y,
            p.maxY - G.y,
            0.1
          );
        }
        v.Render(), $(!1), (M = S.current) == null || M.call(S);
      }), v.Subscribe("message", (p) => {
        const { message: M, level: G } = p.detail;
        G === "error" ? console.error("[DxfViewer]", M) : G === "warn" && console.warn("[DxfViewer]", M);
      }), v;
    } catch (u) {
      const v = u instanceof Error ? u : new Error(String(u));
      return X(v), $(!1), (h = k.current) == null || h.call(k, v), null;
    }
  }, [W, S, k]), d = q(
    async (h, u) => {
      var v;
      $(!0), X(null), J("Loading...");
      try {
        let p;
        if (typeof u == "string")
          p = u;
        else {
          const M = new Blob([u], { type: "application/octet-stream" });
          p = URL.createObjectURL(M);
        }
        await h.Load({
          url: p,
          fonts: n ?? null,
          progressCbk: (M, G, we) => {
            let Q = M;
            if (M === "fetch" ? Q = "Downloading..." : M === "parse" ? Q = "Parsing DXF..." : M === "prepare" ? Q = "Preparing scene..." : M === "font" && (Q = "Loading fonts..."), we && G) {
              const _e = Math.round(G / we * 100);
              J(`${Q} ${_e}%`);
            } else
              J(Q);
          }
        }), typeof u != "string" && URL.revokeObjectURL(p);
      } catch (p) {
        const M = p instanceof Error ? p : new Error(String(p));
        console.error("Failed to load DXF:", M), X(M), $(!1), (v = k.current) == null || v.call(k, M);
      }
    },
    [n, k]
  );
  Z(() => {
    if (!W || !V.current) return;
    const h = r();
    if (h)
      return O && (E.current = new Ge(h, (u) => {
        var v, p;
        H(!1), (v = w.current) == null || v.call(w, !1), B.current = !1, (p = C.current) == null || p.call(C, [u]);
      })), j && (_.current = new $e(
        h,
        (u) => {
          var v, p;
          H(!1), (v = w.current) == null || v.call(w, !1), B.current = !0, (p = C.current) == null || p.call(C, u, { isPolygonSelection: !0 });
        },
        () => {
          var u;
          H(!1), (u = w.current) == null || u.call(w, !1);
        }
      )), c ? d(h, c) : e && d(h, e), () => {
        var u, v;
        if ((u = E.current) == null || u.destroy(), E.current = null, (v = _.current) == null || v.deactivate(), _.current = null, A.current) {
          try {
            A.current.Destroy();
          } catch (p) {
            console.warn("Error destroying viewer:", p);
          }
          A.current = null;
        }
      };
  }, [W, c, e, r, d, O, j, C, w]), Z(() => {
    !E.current || !_.current || (Y ? (E.current.setEnabled(!1), _.current.activate()) : (_.current.deactivate(), E.current.setEnabled(!0), s.length > 0 && !B.current && E.current.selectHandles(s, [], T)));
  }, [Y, s, T]), Z(() => {
    if (!E.current || U || z) return;
    const h = B.current;
    B.current = !1;
    const u = o || [];
    if (s.length > 0) {
      const v = s.length === 1, p = T && (v || !h);
      E.current.selectHandles(s, u, p);
    } else l && l.length > 0 ? E.current.highlightHandles(l) : E.current.selectHandles([], u, !1);
  }, [s, o, l, U, z, T]), Z(() => {
    E.current && E.current.setValidHandles(N);
  }, [N]);
  const g = q(() => {
    var u;
    const h = !Y;
    H(h), (u = w.current) == null || u.call(w, h);
  }, [Y, w]), b = q(() => {
    const h = A.current;
    if (!h) return;
    const u = h.GetBounds();
    if (u) {
      const v = h.GetOrigin();
      h.FitView(
        u.minX - v.x,
        u.maxX - v.x,
        u.minY - v.y,
        u.maxY - v.y,
        0.1
      ), h.Render();
    }
  }, []), K = q(() => {
    var h, u;
    H(!1), (h = w.current) == null || h.call(w, !1), E.current && E.current.clearHighlights(), _.current && (_.current.clearCompletedPolygon(), _.current.clearInProgressPolygon()), B.current = !1, (u = C.current) == null || u.call(C, [], { isReset: !0 }), b();
  }, [b, C, w]), ie = q(() => {
    const h = A.current;
    if (!h) return;
    const u = h.GetCamera();
    u.zoom *= 1.25, u.updateProjectionMatrix(), h.Render();
  }, []), L = q(() => {
    const h = A.current;
    if (!h) return;
    const u = h.GetCamera();
    u.zoom *= 0.8, u.updateProjectionMatrix(), h.Render();
  }, []);
  return /* @__PURE__ */ y.jsx("div", { className: `dxf-viewer-wrapper ${i ?? ""}`, children: /* @__PURE__ */ y.jsx("div", { className: "dxf-main-content", children: /* @__PURE__ */ y.jsxs("div", { className: "dxf-viewer-container", children: [
    /* @__PURE__ */ y.jsx(
      "div",
      {
        ref: V,
        style: { width: "100%", height: "100%", position: "absolute", inset: 0 }
      }
    ),
    U && /* @__PURE__ */ y.jsxs("div", { className: "dxf-loading-overlay", children: [
      /* @__PURE__ */ y.jsx("div", { className: "dxf-loading-spinner" }),
      /* @__PURE__ */ y.jsx("div", { className: "dxf-loading-progress", children: ne })
    ] }),
    z && /* @__PURE__ */ y.jsxs("div", { className: "dxf-error-overlay", children: [
      /* @__PURE__ */ y.jsxs("svg", { className: "dxf-error-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
        /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ y.jsx("path", { d: "M15 9l-6 6M9 9l6 6" })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "dxf-error-title", children: "Failed to load DXF" }),
      /* @__PURE__ */ y.jsx("div", { className: "dxf-error-message", children: z.message })
    ] }),
    D && !U && !z && /* @__PURE__ */ y.jsxs("div", { className: "dxf-bottom-toolbar", children: [
      /* @__PURE__ */ y.jsx(he, { onClick: K, title: "Reset View", children: /* @__PURE__ */ y.jsx(Je, { size: 18 }) }),
      j && /* @__PURE__ */ y.jsx(
        he,
        {
          active: Y,
          onClick: g,
          title: "Polygon Selection Tool",
          children: /* @__PURE__ */ y.jsx(Ke, { size: 18 })
        }
      ),
      /* @__PURE__ */ y.jsx("div", { className: "dxf-toolbar-separator" }),
      /* @__PURE__ */ y.jsx(he, { onClick: L, title: "Zoom Out", children: /* @__PURE__ */ y.jsx(et, { size: 18 }) }),
      /* @__PURE__ */ y.jsx(he, { onClick: ie, title: "Zoom In", children: /* @__PURE__ */ y.jsx(Qe, { size: 18 }) })
    ] })
  ] }) }) });
}
export {
  it as DxfViewer,
  Ge as EntityInteraction,
  $e as PolygonSelectionTool,
  pe as getNDC,
  Oe as getSafeObjectBounds,
  ke as getSafeObjectsBounds,
  Ae as unprojectToPlane
};
