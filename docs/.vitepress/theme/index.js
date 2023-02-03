import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ExampleBasic from '../../examples/ExampleBasic.vue'
import ExampleRandomShuffle from '../../examples/ExampleRandomShuffle.vue'
import ExampleWith3column from '../../examples/ExampleWith3column.vue'
import ExampleWithEvent from '../../examples/ExampleWithEvent.vue'
import ExampleWithSRC from '../../examples/ExampleWithSRC.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('ExampleBasic', ExampleBasic)
    ctx.app.component('ExampleRandomShuffle', ExampleRandomShuffle)
    ctx.app.component('ExampleWith3column', ExampleWith3column)
    ctx.app.component('ExampleWithEvent', ExampleWithEvent)
    ctx.app.component('ExampleWithSRC', ExampleWithSRC)
  }
}
