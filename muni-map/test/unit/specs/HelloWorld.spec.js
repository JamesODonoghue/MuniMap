import Vue from 'vue'
import MuniMap from '@/components/MuniMap'

describe('MuniMap.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MuniMap)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
