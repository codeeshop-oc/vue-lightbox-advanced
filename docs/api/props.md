# Props

Props used are given below.

## Passing Setting Props

```html
<template>
  <VueLightboxAdvanced :items="images" />
</template>
```

## All Props

Check out [demo examples](https://codeeshop-oc.github.io/vue-lightbox-advanced/) for settings usage.

| Prop name | Description                                               | Type    | Values                             | Default                 |
| --------- | --------------------------------------------------------- | ------- | ---------------------------------- | ----------------------- |
| images    | pass images array                                         | array   | -                                  | []                      |
| shuffle   | enable the shuffling of images                            | boolean | -                                  | false                   |
| shuffleBy | choose one type to shuffle the images based upon          | string  | 'ASC', 'DESC', 'RANDOM', 'DEFAULT' | DEFAULT                 |
| returnSrc | if you want to return src other than index on image click | Boolean |                                    | false                   |
| css       | pass the css classes to add in DIV tag                    | string  | -                                  | h-250 h-md-400 h-lg-600 |
| cells     | pass the css classes to add in DIV tag                    | number  | -                                  | 5                       |
