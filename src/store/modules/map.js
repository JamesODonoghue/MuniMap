import { MUNI_TAG } from '@/constants/constants';
import NextBusApi from '@/api/NextBusApi';
import * as d3 from 'd3';

import streets from '@/assets/streets.json';
import hoods from '@/assets/neighborhoods.json';
import arteries from '@/assets/arteries.json';

const state = {
    projection: null,
    geoPath: '',

}

const getters = {};

const actions = {
    createProjection({state, commit}, projection) {
        commit('UPDATE_PROJECTION', projection);
    }
};
const mutations = {
    UPDATE_PROJECTION(state, projection) {
        state.projection = projection;
        state.geoPath = d3.geoPath().projection(projection);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

