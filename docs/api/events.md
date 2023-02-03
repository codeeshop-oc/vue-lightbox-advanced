# Events

Events provides more flexibility to intercept image click event

## Listening to Events

```html
<template>
  <VueLightboxAdvanced @clicked:index="onClicked" />
</template>

<script>
  export default defineComponent({
    methods: {
      onClicked(v) {
        console.log(`Event Emmited....`)
        console.log(`Return Value: ${v}`)
      }
    }
  })
</script>
```

## All Events

| Event name    | Description                                       | Arguments |
| ------------- | ------------------------------------------------- | --------- |
| clicked:index | return index or src based on returnSrc prop value | -         |
