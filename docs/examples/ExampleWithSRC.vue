<template>
  <vue-lightbox-advanced
    :return-src="true"
    :items="images"
    @clicked:index="onClickedSrc"
  />
</template>

<script>
import { ref, defineComponent } from 'vue'
import '../../dist/vue-lightbox-advanced.css'
import VueLightboxAdvanced from '../../dist/vue-lightbox-advanced'
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
      'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'
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
