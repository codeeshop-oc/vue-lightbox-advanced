<script>
import { defineComponent } from 'vue';

export default /*#__PURE__*/defineComponent({
  name: 'VueLightboxAdvanced', // vue component name
  data() {
    return {
      indexedArray: [],
      allShuffledBy: ['ASC', 'DESC', 'RANDOM', 'DEFAULT'],
    };
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    shuffle: {
      type: Boolean,
      default: false,
    },
    shuffleBy: {
      type: String,
      default: '',
    },
    returnSrc: {
      type: Boolean,
      default: false,
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
      return this.shuffleArray()
    }
    // changedBy() {
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
        }
      })
      if(!this.shuffle) return this.indexedArray

      this.shuffledBy(this.shuffleBy)
      return this.indexedArray;
    },
    randomSelect(mn, mx) {
      return Math.random() * (mx - mn) + mn;
    },
    shuffledBy(type) {
      switch(type) {
        case 'DYNAMIC':
          this.shuffledBy(this.allShuffledBy[Math.floor(this.randomSelect(0, this.allShuffledBy.length))])
          break;
        case 'ASC':
          this.indexedArray.sort()
          break;
        case 'DESC':
          this.indexedArray.reverse()
          break;
        case 'RANDOM':
          this.indexedArray.sort(function(){return Math.random() - 0.5})
          break;
        default:
        case 'DEFAULT':
          break;
      }
    },
    clicked(item) {
      this.$emit('clicked:index', this.returnSrc ? item.src : item.index)
    },
    bg(i) {
      return i && i.length > 0 ? `background-image: url('${i}')` : '';
    }
  },
});
</script>

<template>
  <div class="vue-lightbox-advanced VueLightboxAdvanced" v-if="items.length>0">
    <div class="lb-grid" :class="[css,items.length>cells?'lb-grid-' + cells: 'lb-grid-' + items.length]">
      <template v-for="(item, i) in shuffled" >
        <a v-if="i<cells" class="lb-item" @click.stop.passive="clicked(item)" :style="bg(item.src)">
          <span class="lb-more" v-if="i==cells-1 && items.length - cells>0">{{ items.length - cells}}+</span>
        </a>
      </template>
    </div>
  </div>
</template>