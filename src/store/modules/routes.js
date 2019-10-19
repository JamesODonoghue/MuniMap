import NextBusApi from '@/api/NextBusApi';
import { FETCH_ROUTES, FETCH_VEHICLES, FETCH_ROUTE_VEHICLES, FILTER_UPDATE } from '../action-types';
import { FETCH_ROUTES_SUCCESS, FETCH_VEHICLES_SUCCESS } from '../mutation-types';
import { MUNI_TAG } from '@/constants/constants';

const state = {
    routeInfo: null,
    routesLoaded: false
}

const getters = {
    selectedRoutes: (state, getters, rootState) => {
        let selected = state.routeCollection.filter(route => route.selected);

        let newCollection = selected.map((value) => {
            let vehicles = value.vehicles.map((vehicle) => {
                return {
                    ...vehicle,
                    transform: "translate(" + rootState.map.projection([vehicle.lon, vehicle.lat]) + ")"
                }
            });

            return {
                ...value,
                vehicles: vehicles
            };
        });

        return newCollection;
    }
};

const actions = {
    async [FETCH_ROUTES]({ state, commit }) {
        let response = await NextBusApi.fetchRouteList();

        if (response) {
            commit(FETCH_ROUTES_SUCCESS, response)
        }
    }
}

const mutations = {
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

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}