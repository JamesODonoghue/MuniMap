import Vue from 'vue';
import Vuex from 'vuex';
import buses from './modules/buses';
import routes from './modules/routes';
import map from './modules/map';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        buses, 
		routes,
		map
	},
	state: {
		hasLoaded: false
	},
    mutations: {
        initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
    }
})