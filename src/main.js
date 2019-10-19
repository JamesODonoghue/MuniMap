// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store';

Vue.config.productionTip = false

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render (h) {
    return h('App')
  }
})