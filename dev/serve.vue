<script>
import { defineComponent } from 'vue';
import VueLightboxAdvanced from '@/vue-lightbox-advanced.vue';
import '@/vue-lightbox-advanced.css';

export default defineComponent({
  name: 'ServeDev',
  data() {
    return {
      images: [
        "https://cdn.pixabay.com/photo/2015/09/17/14/24/woman-944261_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/05/11/16/32/bridge-1385938_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_960_720.jpg",
        "https://cdn.pixabay.com/photo/2020/09/15/09/10/church-5573087_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/01/25/14/12/nature-3106213_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/01/22/14/13/animal-3099035_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/boat-1014711_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg"
      ]
    }
  },
  components: {
    VueLightboxAdvanced
  },
  methods: {
    onClicked(v) {
      console.log(`Event Emmited....`)
      console.log(`Return Index: ${v}`)
    },
    onClickedSrc(v) {
      console.log(`Event Emmited....`)
      console.log(`Return Value: ${v}`)
    },
  }
});
</script>

<template>
  <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
    <div id="app">
      <h3>Default</h3>
      <div class="fixheight">
        <vue-lightbox-advanced :items="images" />
      </div>

      <h3>With Shuffle ( RANDOM )</h3>
      <div class="fixheight">
        <vue-lightbox-advanced :shuffle=true shuffle-by="RANDOM" :items="images" />
      </div>

      <h3>With 3 column</h3>
      <div class="fixheight">
        <vue-lightbox-advanced :cells="3" :items="images" :shuffle=true shuffle-by="DESC" />
      </div>

      <h3>With Event</h3>
      <div class="fixheight">
        <vue-lightbox-advanced @clicked:index="onClicked" :items="images" />
      </div>

      <h3>With SRC</h3>
      <div class="fixheight">
        <vue-lightbox-advanced :return-src="true" @clicked:index="onClickedSrc" :items="images" />
      </div>
    </div>
  </div>
</template>

<style>
  body {
     font-family: 'Caveat';
  }
  .text-center {
    text-align: center;
    /*margin: auto;*/
  }
  .fixheight {
    width: 550px;
  }
  #app {
      margin: auto;
  }
  @media (min-width: 601px) {
    #app {
      display: table;
    }
  }
  @media (max-width: 800px) {
    .fixheight {
      width: 450px;
    }
  }
  @media (max-width: 600px) {
    .fixheight {
      width: 100%;
    }
  }
</style>