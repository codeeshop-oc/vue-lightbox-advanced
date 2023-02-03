import {
  defineComponent as c,
  openBlock as s,
  createElementBlock as r,
  createElementVNode as u,
  normalizeClass as f,
  Fragment as h,
  renderList as y,
  normalizeStyle as m,
  withModifiers as g,
  toDisplayString as p,
  createCommentVNode as a
} from 'vue'
const b = c({
  // type inference enabled
  name: 'VueLightboxAdvanced',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    shuffle: {
      type: Boolean,
      default: !1
    },
    shuffleBy: {
      type: String,
      default: ''
    },
    returnSrc: {
      type: Boolean,
      default: !1
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
})
const A = (e, t) => {
    const l = e.__vccOpts || e
    for (const [d, i] of t) l[d] = i
    return l
  },
  k = {
    key: 0,
    class: 'vue-lightbox-advanced'
  },
  v = ['onClickPassive'],
  S = {
    key: 0,
    class: 'lb-more'
  }
function B(e, t, l, d, i, _) {
  return e.items.length > 0
    ? (s(),
      r('div', k, [
        u(
          'div',
          {
            class: f([
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
            (s(!0),
            r(
              h,
              null,
              y(
                e.shuffled,
                (o, n) => (
                  s(),
                  r(
                    h,
                    { key: n },
                    [
                      n < e.cells
                        ? (s(),
                          r(
                            'a',
                            {
                              key: 0,
                              class: 'lb-item',
                              style: m(e.bg(o.src)),
                              onClickPassive: g(C => e.clicked(o), ['stop'])
                            },
                            [
                              n == e.cells - 1 && e.items.length - e.cells > 0
                                ? (s(),
                                  r(
                                    'span',
                                    S,
                                    p(e.items.length - e.cells) + '+',
                                    1
                                  ))
                                : a('', !0)
                            ],
                            44,
                            v
                          ))
                        : a('', !0)
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
    : a('', !0)
}
const M = /* @__PURE__ */ A(b, [
  ['render', B],
  ['__scopeId', 'data-v-13de3c2b']
])
export { M as default }
