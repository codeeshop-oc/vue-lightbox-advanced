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
//
var script = {
  name: 'VueLightboxAdvanced',
  props: {
    items: {
      type: Array,
      default: () => {
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
      default: () => 'h-250 h-md-400 h-lg-600'
    },
    cells: {
      type: Number,
      default: () => 5
    }
  },
  computed: {
    shuffled() {
      return this.shuffleArray();
    }

  },

  data() {
    return {
      indexedArray: [],
      allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT']
    };
  },

  methods: {
    shuffleArray() {
      this.indexedArray = this.items.map((v, i) => {
        return {
          src: v,
          index: i
        };
      });
      if (!this.shuffle) return this.indexedArray;
      this.shuffledBy(this.shuffleBy);
      return this.indexedArray;
    },

    randomSelect(mn, mx) {
      return Math.random() * (mx - mn) + mn;
    },

    shuffledBy(type) {
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

    clicked(item) {
      this.$emit('clicked:index', this.returnSrc ? item.src : item.index);
    },

    bg(i) {
      return i && i.length > 0 ? `background-image: url('${i}')` : '';
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.items.length > 0 ? _c('div', {
    staticClass: "VueLightboxAdvanced"
  }, [_c('div', {
    staticClass: "lb-grid",
    class: [_vm.css, _vm.items.length > _vm.cells ? 'lb-grid-' + _vm.cells : 'lb-grid-' + _vm.items.length]
  }, [_vm._l(_vm.shuffled, function (item, i) {
    return [i < _vm.cells ? _c('a', {
      staticClass: "lb-item",
      style: _vm.bg(item.src),
      on: {
        "&click": function ($event) {
          $event.stopPropagation();

          if ($event.target !== $event.currentTarget) {
            return null;
          }

          return _vm.clicked(item);
        }
      }
    }, [i == _vm.cells - 1 && _vm.items.length - _vm.cells > 0 ? _c('span', {
      staticClass: "lb-more"
    }, [_vm._v(_vm._s(_vm.items.length - _vm.cells) + "+")]) : _vm._e()]) : _vm._e()];
  })], 2)]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueLightboxAdvanced', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
