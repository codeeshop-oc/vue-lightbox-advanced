# Vue Lightbox Advanced

## Props

### Passing Setting Props

```html
<template>
  <VueLightboxAdvanced :items="images" />
</template>
```

### All Props

Check out [demo examples](https://codeeshop-oc.github.io/vue-lightbox-advanced/) for settings usage.

| Prop name        | Description                                                                                                                                                                           | Type    | Values                | Default      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------ |
| images           | pass images array					                  	   | array   | -                                				   | []            			 |
| shuffle          | enable the shuffling of images                       	   | boolean | -  												   | false 	      			 |
| shuffleBy        | choose one type to shuffle the images based upon          | string  | 'ASC', 'DESC', 'RANDOM', 'DEFAULT' 		   | DEFAULT  	  			 |
| returnSrc        | if you want to return src other than index on image click | Boolean | 			    		 							   | false 				     |
| css              | pass the css classes to add in DIV tag                    | string  | - 												   | h-250 h-md-400 h-lg-600 |
| cells              | pass the css classes to add in DIV tag                  | number  | - 												   | 5 |

### Listening to Events

```html
<template>
  <VueLightboxAdvanced @clicked:index="onClicked" />
</template>
<script>
  export default {
    methods: {
      onClicked(v) {
        console.log(`Event Emmited....`)
      	console.log(`Return Value: ${v}`)
      },
    },
  }
</script>
```

### All Events

| Event name    | Description                         				| Arguments                                  |
| ------------- | ------------------------------------------------- | ------------------------------------------ |
| clicked:index | return index or src based on returnSrc prop value | -                                          |
