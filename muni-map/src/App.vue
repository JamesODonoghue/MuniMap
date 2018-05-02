<template>
  <div id="app">
    <route-filter></route-filter>
    <div id=#map></div>

  </div>
</template>

<script>

import streets from './assets/streets.json'
import neighborhoods from './assets/neighborhoods.json'
import freeways from './assets/freeways.json'
import NextBusService from './services/NextBusService'
import Map from './components/Map'
import RouteFilter from './components/RouteFilter.vue'

import UpdateBuses from './components/UpdateBuses'

export default {

  name: 'App',
  components: {
    'route-filter': RouteFilter
  },

  mounted() {
    Map.load();
    UpdateBuses.getVehicles();
    setInterval(function(){
      UpdateBuses.getVehicles();
    }, 15000)

  }
}
</script>

<style>

</style>
