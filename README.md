# Vue Lightbox Advanced

> Vue Lightbox Advanced Photo Grid component for Vue.js

[![Latest Stable Version](https://img.shields.io/npm/v/vue-lightbox-advanced.svg)](https://www.npmjs.com/package/vue-lightbox-advanced) [![Total Downloads](https://img.shields.io/npm/dt/vue-lightbox-advanced.svg)](https://npm-stat.com/charts.html?package=vue-lightbox-advanced)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/codeeshop-oc/vue-lightbox-advanced/issues?&q=is%3Aissue+is%3Aopen)
![Downloads Monthly](https://img.shields.io/npm/dm/vue-lightbox-advanced.svg)

Vue Lightbox Advanced provides flexibility of displaying first x (1-5) images of your gallery in a grid view as you seen on Facebook timeline. Click on the thumbnail will return an event with the index or file url (src) as per passed props that can be used to show the image or can be used to redirect to that specific file url (src).
It provides the shuffling images according to given options in docs.

> Note: It requires parent height and width as the component will adapt to its resolutions

## Version Support

Vue 3 - Current Branch ( TypeScript + Vite + vitest )

[Vue 2](https://github.com/codeeshop-oc/vue-lightbox-advanced/tree/vue2)

## 🎨 Features

Find out all available features on [settings props](/docs/api/props.md) and see how that works on [examples](/docs/examples.md).

## 🚚 Installation

### yarn/npm

```bash
# npm
npm i vue-lightbox-advanced
# yarn
yarn add vue-lightbox-advanced
```

### cdn

```bash
# latest
https://unpkg.com/vue-lightbox-advanced
```

<br/>

## 🚀 Quick Start

```html
<template>
  <div style="height: 250px; width: 400px;">
    <vue-lightbox-advanced :items="images" />
  </div>
</template>

<script>
  import VueLightboxAdvanced from 'vue-lightbox-advanced'
  import 'vue-lightbox-advanced/dist/vue-lightbox-advanced.css'

  export default {
    name: 'MyComponent',
    components: { VueLightboxAdvanced },
    data() {
      return {
        images: [
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
      }
    }
  }
</script>
```

<br/>

## 🔖 License

This software is licensed under the [MIT](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/main/LICENSE).

### Reference

[Morioh-Lab/v-lightbox](https://github.com/Morioh-Lab/v-lightbox)
