# Examples

## [Basic Example](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/docs/examples/ExampleBasic.vue)

<ExampleBasic></ExampleBasic>

```vue
<template>
  <vue-lightbox-advanced :items="images" />
</template>

<script>
import { ref, defineComponent } from 'vue'
import VueLightboxAdvanced from 'vue-lightbox-advanced'
import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'
export default defineComponent({
  name: 'ExampleBasic',
  components: {
    VueLightboxAdvanced
  },
  emits: ['clicked'],
  setup() {
    const images = ref([])

    images.value = [
      'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg'
    ]
    return {
      images: images,
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Index: ${v}`)
      },
      onClickedSrc(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  }
})
</script>
```

## [With Random Shuffle](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/docs/examples/ExampleRandomShuffle.vue)

<ExampleRandomShuffle></ExampleRandomShuffle>

```vue
<template>
  <div class="fixheight">
    <vue-lightbox-advanced
      :shuffle="true"
      shuffle-by="RANDOM"
      :items="images"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import VueLightboxAdvanced from 'vue-lightbox-advanced'
import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'
export default defineComponent({
  name: 'ExampleRandomShuffle',
  components: {
    VueLightboxAdvanced
  },
  emits: ['clicked'],
  setup() {
    const images = ref([])

    images.value = [
      'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg'
    ]
    return {
      images: images,
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Index: ${v}`)
      },
      onClickedSrc(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  }
})
</script>
```

## [With 3 column](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/docs/examples/ExampleWith3column.vue)

<ExampleWith3column></ExampleWith3column>

```vue
<template>
  <div class="fixheight">
    <vue-lightbox-advanced
      :cells="3"
      :items="images"
      :shuffle="true"
      shuffle-by="DESC"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import VueLightboxAdvanced from 'vue-lightbox-advanced'
import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'
export default defineComponent({
  name: 'ExampleWith3column',
  components: {
    VueLightboxAdvanced
  },
  emits: ['clicked'],
  setup() {
    const images = ref([])

    images.value = [
      'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg'
    ]
    return {
      images: images,
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Index: ${v}`)
      },
      onClickedSrc(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  }
})
</script>
```

## [With Event](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/docs/examples/ExampleWithEvent.vue)

<ExampleWithEvent></ExampleWithEvent>

```vue
<template>
  <div class="fixheight">
    <vue-lightbox-advanced :items="images" @clicked:index="onClicked" />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import VueLightboxAdvanced from 'vue-lightbox-advanced'
import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'
export default defineComponent({
  name: 'ExampleWithEvent',
  components: {
    VueLightboxAdvanced
  },
  emits: ['clicked'],
  setup() {
    const images = ref([])

    images.value = [
      'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg'
    ]
    return {
      images: images,
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Index: ${v}`)
      },
      onClickedSrc(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  }
})
</script>
```

## [With SRC](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/docs/examples/ExampleWithSRC.vue)

<ExampleWithSRC></ExampleWithSRC>

```vue
<template>
  <div class="fixheight">
    <vue-lightbox-advanced
      :return-src="true"
      :items="images"
      @clicked:index="onClickedSrc"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import VueLightboxAdvanced from 'vue-lightbox-advanced'
import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'
export default defineComponent({
  name: 'ExampleWithSRC',
  components: {
    VueLightboxAdvanced
  },
  emits: ['clicked'],
  setup() {
    const images = ref([])

    images.value = [
      'https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg'
    ]
    return {
      images: images,
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Index: ${v}`)
      },
      onClickedSrc(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  }
})
</script>
```
