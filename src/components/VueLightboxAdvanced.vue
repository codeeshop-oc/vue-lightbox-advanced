<script lang="ts">
import { Indexed } from '../types/index'
import { defineComponent } from 'vue'
export default defineComponent({
  // type inference enabled
  name: 'VueLightboxAdvanced',
  props: {
    items: {
      type: Array,
      default: () => []
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
  emits: ['clicked:index'],
  data() {
    return {
      indexedArray: [] as Indexed[],
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
      this.indexedArray = this.items.map((v, i) => {
        return {
          src: String(v),
          i: i
        }
      })

      if (!this.shuffle) return this.indexedArray

      return this.shuffledBy(this.shuffleBy)
    },
    randomSelect(mn: number, mx: number) {
      return Math.random() * (mx - mn) + mn
    },
    shuffledBy(type: string) {
      switch (type) {
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
    clicked(item: any) {
      this.$emit('clicked:index', this.returnSrc ? item.src : item.i)
    },
    bg(i: string) {
      return i && i.length > 0 ? `background-image: url('${i}')` : ''
    }
  }
})
</script>

<template>
  <div v-if="items.length > 0" class="vue-lightbox-advanced">
    <div
      class="lb-grid"
      :class="[
        css,
        items.length > cells ? 'lb-grid-' + cells : 'lb-grid-' + items.length
      ]"
    >
      <template v-for="(item, i) in shuffled" :key="i">
        <a
          v-if="i < cells"
          class="lb-item"
          :style="bg(item.src)"
          @click.stop.passive="clicked(item)"
        >
          <span
            v-if="i == cells - 1 && items.length - cells > 0"
            class="lb-more"
            >{{ items.length - cells }}+</span
          >
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.h-250 {
  height: 250px;
}
.h-200 {
  height: 200px;
}
.lb-grid {
  position: relative;
  display: block;
}

.lb-item {
  position: absolute;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: solid 2px #fff;
  border-right: solid 2px #fff;
}

.lb-item:hover,
.lb-item:focus {
  opacity: 0.6;
}

.lb-grid-1 .lb-item {
  width: 100%;
  height: 100%;
}

.lb-grid-2 .lb-item,
.lb-grid-3 .lb-item,
.lb-grid-4 .lb-item,
.lb-grid-5 .lb-item {
  width: 50%;
}

.lb-grid-2 .lb-item,
.lb-grid-3 .lb-item:nth-child(1),
.lb-grid-4 .lb-item:nth-child(1) {
  height: 100%;
  left: 0;
}

.lb-grid-3 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(1),
.lb-grid-5 .lb-item:nth-child(2) {
  height: 50%;
  left: 0;
}

.lb-item:last-child,
.lb-grid-2 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(2),
.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(5) {
  left: auto;
  right: 0;
  border-right: 0;
}

.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(2),
.lb-grid-5 .lb-item:nth-child(5) {
  bottom: 0;
  top: auto;
}

.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4) {
  top: 33.333333333333336%;
}

.lb-grid-4 .lb-item:nth-child(2),
.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(5) {
  height: 33.333333333333336%;
}

.lb-more {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  font-size: 3rem;
  background-color: rgba(0, 0, 0, 0.4);
}

.lb-more:before {
  display: inline-block;
  content: '';
  vertical-align: middle;
  height: 100%;
}
</style>
