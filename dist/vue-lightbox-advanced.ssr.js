'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
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
}var script = /*#__PURE__*/vue.defineComponent({
  name: 'VueLightboxAdvanced',
  // vue component name
  data: function data() {
    return {
      indexedArray: [],
      allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT']
    };
  },
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
        return 'h-200 h-md-400 h-lg-600';
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
    } // changedBy() {
    //   const { message } = this;
    //   if (!message.action) return 'initialized';
    //   return `${message.action} ${message.amount || ''}`.trim();
    // },

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
});var _hoisted_1 = {
  key: 0,
  class: "vue-lightbox-advanced VueLightboxAdvanced"
};
var _hoisted_2 = ["onClickPassive"];
var _hoisted_3 = {
  key: 0,
  class: "lb-more"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.items.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.createElementVNode("div", {
    class: vue.normalizeClass(["lb-grid", [_ctx.css, _ctx.items.length > _ctx.cells ? 'lb-grid-' + _ctx.cells : 'lb-grid-' + _ctx.items.length]])
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.shuffled, function (item, i) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [i < _ctx.cells ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 0,
      class: "lb-item",
      onClickPassive: vue.withModifiers(function ($event) {
        return _ctx.clicked(item);
      }, ["stop"]),
      style: vue.normalizeStyle(_ctx.bg(item.src))
    }, [i == _ctx.cells - 1 && _ctx.items.length - _ctx.cells > 0 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, vue.toDisplayString(_ctx.items.length - _ctx.cells) + "+", 1)) : vue.createCommentVNode("", true)], 44, _hoisted_2)) : vue.createCommentVNode("", true)], 64);
  }), 256))], 2)])) : vue.createCommentVNode("", true);
}script.render = render;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VueLightboxAdvanced', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;