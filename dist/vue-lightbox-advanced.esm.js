import { defineComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, Fragment, renderList, withModifiers, normalizeStyle, toDisplayString, createCommentVNode } from 'vue';

var script = /*#__PURE__*/defineComponent({
  name: 'VueLightboxAdvanced',

  // vue component name
  data() {
    return {
      indexedArray: [],
      allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT']
    };
  },

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
      default: () => 'h-200 h-md-400 h-lg-600'
    },
    cells: {
      type: Number,
      default: () => 5
    }
  },
  computed: {
    shuffled() {
      return this.shuffleArray();
    } // changedBy() {
    //   const { message } = this;
    //   if (!message.action) return 'initialized';
    //   return `${message.action} ${message.amount || ''}`.trim();
    // },


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
});

const _hoisted_1 = {
  key: 0,
  class: "vue-lightbox-advanced VueLightboxAdvanced"
};
const _hoisted_2 = ["onClickPassive"];
const _hoisted_3 = {
  key: 0,
  class: "lb-more"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.items.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [createElementVNode("div", {
    class: normalizeClass(["lb-grid", [_ctx.css, _ctx.items.length > _ctx.cells ? 'lb-grid-' + _ctx.cells : 'lb-grid-' + _ctx.items.length]])
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.shuffled, (item, i) => {
    return openBlock(), createElementBlock(Fragment, null, [i < _ctx.cells ? (openBlock(), createElementBlock("a", {
      key: 0,
      class: "lb-item",
      onClickPassive: withModifiers($event => _ctx.clicked(item), ["stop"]),
      style: normalizeStyle(_ctx.bg(item.src))
    }, [i == _ctx.cells - 1 && _ctx.items.length - _ctx.cells > 0 ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.items.length - _ctx.cells) + "+", 1)) : createCommentVNode("", true)], 44, _hoisted_2)) : createCommentVNode("", true)], 64);
  }), 256))], 2)])) : createCommentVNode("", true);
}

script.render = render;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('VueLightboxAdvanced', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
