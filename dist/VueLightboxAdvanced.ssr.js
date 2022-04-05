'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VueLightboxAdvanced',
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    shuffleBy: {
      type: String,
      default: ''
    },
    returnSrc: {
      type: Boolean,
      default: false
    },
    css: {
      type: String,
      default: function _default() {
        return 'h-250 h-md-400 h-lg-600';
      }
    },
    cells: {
      type: Number,
      default: function _default() {
        return 5;
      }
    }
  },
  computed: {
    shuffled: function shuffled() {
      return this.shuffleArray();
    }
  },
  data: function data() {
    return {
      indexedArray: [],
      allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT']
    };
  },
  methods: {
    shuffleArray: function shuffleArray() {
      this.indexedArray = this.items.map(function (v, i) {
        return {
          src: v,
          index: i
        };
      });
      if (!this.shuffle) return this.indexedArray;
      this.shuffledBy(this.shuffleBy);
      return this.indexedArray;
    },
    randomSelect: function randomSelect(mn, mx) {
      return Math.random() * (mx - mn) + mn;
    },
    shuffledBy: function shuffledBy(type) {
      switch (type) {
        case 'DYNAMIC':
          this.shuffledBy(this.allShuffledBy[Math.floor(this.randomSelect(0, this.allShuffledBy.length))]);
          break;

        case 'ASC':
          this.indexedArray.sort();
          break;

        case 'DESC':
          this.indexedArray.reverse();
          break;

        case 'RANDOM':
          this.indexedArray.sort(function () {
            return Math.random() - 0.5;
          });
          break;

        default:
        case 'DEFAULT':
          break;
      }
    },
    clicked: function clicked(item) {
      this.$emit('clicked:index', this.returnSrc ? item.src : item.index);
    },
    bg: function bg(i) {
      return i && i.length > 0 ? "background-image: url('".concat(i, "')") : '';
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.items.length > 0 ? _c('div', {
    staticClass: "VueLightboxAdvanced"
  }, [_vm._ssrNode("<div" + _vm._ssrClass("lb-grid", [_vm.css, _vm.items.length > _vm.cells ? 'lb-grid-' + _vm.cells : 'lb-grid-' + _vm.items.length]) + ">" + _vm._ssrList(_vm.shuffled, function (item, i) {
    return i < _vm.cells ? "<a class=\"lb-item\"" + _vm._ssrStyle(null, _vm.bg(item.src), null) + ">" + (i == _vm.cells - 1 && _vm.items.length - _vm.cells > 0 ? "<span class=\"lb-more\">" + _vm._ssrEscape(_vm._s(_vm.items.length - _vm.cells) + "+") + "</span>" : "<!---->") + "</a>" : "<!---->";
  }) + "</div>")]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-4b9dfaef";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component$1 = __vue_component__;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueLightboxAdvanced', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;