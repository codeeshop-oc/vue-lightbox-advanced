# Vue Lightbox Advanced

> Vue Lightbox Advanced Photo Grid component for Vue.js

[![npm](https://img.shields.io/badge/npm-1.0.0-blue)](https://www.npmjs.com/package/vue-lightbox-advanced)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/vue2/LICENSE)
[![bit](https://img.shields.io/badge/components-1-yellowgreen)](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/vue2/src/VueLightboxAdvanced.vue)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/codeeshop-oc/vue-lightbox-advanced/issues?&q=is%3Aissue+is%3Aopen)

Vue Lightbox Advanced provides flexibility of displaying first x (1-5) images of your gallery in a grid view as you seen on Facebook timeline. Click on the thumbnail will return an event with the index or file url (src) as per passed props that can be used to show the image or can be used to redirect to that specific file url (src).
It provides the shuffling images according to given options in docs.

> Note: It requires parent height and width as the component will adapt to its resolutions

## Version Support

[Vue 3](https://github.com/codeeshop-oc/vue-lightbox-advanced/tree/main)

Vue 2 - Current branch

## 🎨 Features

Find out all available features on [settings props](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/vue2/docs/API.md#props) and see how that works on [examples](https://codeeshop-oc.github.io/vue-lightbox-advanced/).


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
    <VueLightboxAdvanced :items="images" />
  </div>
</template>

<script>
  import VueLightboxAdvanced from 'vue-lightbox-advanced'
  import 'vue-lightbox-advanced/dist/VueLightboxAdvanced.css'

  export default {
    name: 'MyComponent',
    components: { VueLightboxAdvanced },
    data() {
	    return {
	      images: [
	        "https://i.wifegeek.com/200426/f9459c52.jpg",
	        "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
	        "https://i.wifegeek.com/200426/5fa51df3.jpg",
	        "https://i.wifegeek.com/200426/663181fe.jpg",
	        "https://i.wifegeek.com/200426/2d110780.jpg",
	        "https://i.wifegeek.com/200426/e73cd3fa.jpg",
	        "https://i.wifegeek.com/200426/15160d6e.jpg",
	        "https://i.wifegeek.com/200426/81e24a47.jpg",
	        "https://i.wifegeek.com/200426/43e2e8bb.jpg"
	      ]
	    }
	},
  }
</script>
```

<br/>

## 🔖 License

This software is licensed under the [MIT](https://github.com/codeeshop-oc/vue-lightbox-advanced/blob/vue2/LICENSE).

### Reference

[Morioh-Lab/v-lightbox](https://github.com/Morioh-Lab/v-lightbox)