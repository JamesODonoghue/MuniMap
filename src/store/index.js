import Vue from 'vue';
import Vuex from 'vuex';
import NextBusApi from '@/api/NextBusApi';

import {
	FETCH_ROUTES,
	FETCH_ROUTE_VEHICLES,
	FILTER_UPDATE
} from './action-types';
import {
	FETCH_ROUTES_SUCCESS,
	FETCH_VEHICLES_SUCCESS,
	HIDE_VEHICLE,
	SET_CURRENT_ROUTE
} from './mutation-types';

import { MUNI_TAG } from '@/constants/constants';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hasLoaded: false,
		routeInfo: null,
		routesLoaded: false,
		routeData: {},
		routeVehicles: {},
		currentRoute: {
			tag: '1',
			title: '1- California'
		},
	},
	actions: {
		async [FETCH_ROUTES]({ state, commit }) {
			let response = await NextBusApi.fetchRouteList();

			if (response) {
				commit(FETCH_ROUTES_SUCCESS, response)
			}
		},

		async [FETCH_ROUTE_VEHICLES]({ state, commit, rootState }, route) {
			let routeTag = route.tag;
			let params = {
				agencyTag: MUNI_TAG,
				lastReportedTime: 0,
				routeTag: routeTag
			}

			let routeVehiclesResponse = await NextBusApi.getVehicleLocations(params);

			if (routeVehiclesResponse) {
				commit(FETCH_VEHICLES_SUCCESS, { route, routeVehiclesResponse, rootState })
			}
		},

		[FILTER_UPDATE]({ state, dispatch, commit }, route) {
			let { tag } = route;
			commit(SET_CURRENT_ROUTE, route);
			dispatch(FETCH_ROUTE_VEHICLES, route);

			// if (tag in state.routeVehicles) {
			// 	commit(HIDE_VEHICLE, tag)
			// } else {
			// 	dispatch(FETCH_ROUTE_VEHICLES, route);
			// }
		}


	},
	mutations: {
		initialiseStore(state) {
			if (localStorage.getItem('store')) {
				Object.assign(state, JSON.parse(localStorage.getItem('store')));
			}
		},

		[FETCH_ROUTES_SUCCESS](state, response) {
			let routes = response.route;
			let routeMap = {};

			routes.forEach((route) => {
				routeMap[route.tag] = {
					...route,
					selected: false
				};
			})

			state.routesLoaded = true;
			state.routeInfo = routeMap;
		},
		[FETCH_VEHICLES_SUCCESS](state, { route, routeVehiclesResponse, rootState }) {
			const { tag } = route;
			let newVehicles = {...state.routeVehicles};

			let newState = {
				...state,
				routeVehicles: {
					[tag]: routeVehiclesResponse.vehicle
				}
			};

			state.routeVehicles = newState.routeVehicles;

		},

		[HIDE_VEHICLE](state, routeTag) {
			const routeVehicles = { ...state.routeVehicles };
			delete routeVehicles[routeTag];
			state.routeVehicles = routeVehicles;
		},

		[SET_CURRENT_ROUTE](state, route) {
			state.currentRoute = route;
		}
	}
})