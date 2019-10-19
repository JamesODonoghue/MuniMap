<template v-if="routeInfo">
  <div id="app" >
      <AppHeader />
      <CustomSelect :options="routeInfo" valueKey="tag" labelKey="title" />
      <!-- <RouteFilter /> -->
      <BaseMap />
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
    FILTER_UPDATE
} from "@/store/action-types";

export default {
    name: "App",
    components: {
        CustomSelect,
        BaseMap,
        AppHeader
    },
    created(){
    },
    mounted(){
      if(!this.routeInfo) this.FETCH_ROUTES();
    },
    computed: {
        ...mapState("routes", ["routeInfo", "routesLoaded"])
    },
    methods: {
        ...mapActions("routes", [FETCH_ROUTES])    
    }
};
</script>

<style>
#app {
    display: flex;
}
</style>
