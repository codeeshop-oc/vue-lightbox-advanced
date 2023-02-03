import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import VueLightboxAdvanced from '../../src/components/VueLightboxAdvanced.vue'

test('VueLightboxAdvanced.ts', async () => {
  let wrapper: any
  wrapper = mount(VueLightboxAdvanced)
  expect(wrapper.find('.vue-lightbox-advanced').exists()).toBe(false)
})

test('VueLightboxAdvanced.ts', async () => {
  let wrapper: any
  wrapper = mount(VueLightboxAdvanced, {
    props: {
      items: [
        'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg'
      ]
    }
  })
  expect(wrapper.find('.vue-lightbox-advanced').exists()).toBe(true)
})
