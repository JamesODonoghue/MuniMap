import { MUNI_TAG } from '@/constants/constants';
import NextBusApi from '@/api/NextBusApi';
import { FETCH_ROUTES, FETCH_VEHICLES, FETCH_ROUTE_VEHICLES, FILTER_UPDATE } from '../action-types';
import { FETCH_ROUTES_SUCCESS, FETCH_VEHICLES_SUCCESS, HIDE_VEHICLE} from '../mutation-types';

const state = {
    routeVehicles: {}
}

const getters = {};

const actions = {

    async [FETCH_ROUTE_VEHICLES]({ state, commit, rootState }, routeTag) {
        let params = {
            agencyTag: MUNI_TAG,
            lastReportedTime: 0,
            routeTag: routeTag
        }

        let routeVehiclesResponse = await NextBusApi.getVehicleLocations(params);

        if (routeVehiclesResponse) {
            commit(FETCH_VEHICLES_SUCCESS, { routeTag, routeVehiclesResponse, rootState })
        }
    },

    [FILTER_UPDATE]({ dispatch, commit }, payload) {
        let route = payload.target.value;

        if(route in state.routeVehicles){
            commit(HIDE_VEHICLE, route)
        } else {
            dispatch(FETCH_ROUTE_VEHICLES, route);
        }
    }
}

const mutations = {
    setVehicles(state, vehicles) {
        state.vehicles = vehicles;
    },

    [FETCH_VEHICLES_SUCCESS](state, { routeTag, routeVehiclesResponse, rootState }) {

        let newState = {
            routeVehicles:{
                ...state.routeVehicles,
                [routeTag]: routeVehiclesResponse.vehicle
            }
        };

        state.routeVehicles = newState.routeVehicles;

    },

    [HIDE_VEHICLE](state, routeTag){
        const routeVehicles = {...state.routeVehicles};
        delete routeVehicles[routeTag];
        state.routeVehicles = routeVehicles;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}