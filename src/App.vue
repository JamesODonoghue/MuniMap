<template>
    <div id="app">
        <template v-if="routeInfo">
            <AppHeader />
            <CustomSelect :options="routeInfo" valueKey="tag" labelKey="title" :value="currentRoute" :onChange="handleChange" />
            <BaseMap :vehicles="routeVehicles" :routes="routeInfo" :selectedRoute="currentRoute" />
        </template>
    </div>
</template>

<script>
import NextBusService from "./services/NextBusService";

import RouteFilter from "./components/RouteFilter.vue";
import CustomSelect from "./components/CustomSelect.vue";
import AppHeader from "./components/AppHeader.vue";
import BaseMap from "./components/BaseMap.vue";

import {
    mapState,
    mapActions
} from "vuex";

import {
    FETCH_ROUTES,
    FILTER_UPDATE,
    FETCH_ROUTE_VEHICLES
} from "@/store/action-types";

export default {
    name: "App",
    components: {
        CustomSelect,
        BaseMap,
        AppHeader
    },
    created() {

    },
    mounted() {
        if (!this.routeInfo) this.FETCH_ROUTES();
    },
    computed: {
        ...mapState(["routeInfo", "routesLoaded", "currentRoute", "routeVehicles"]),
    },
    methods: {
        handleChange(routeObj) {
            this.FILTER_UPDATE(routeObj);
        },
        ...mapActions([FETCH_ROUTES, FETCH_ROUTE_VEHICLES, FILTER_UPDATE]),
    }
};
</script>

<style>
#app {
    display: flex;
}

body {
    background: #000;
    font-family: "Helvetica";
    font-weight: bold;
}
</style>
