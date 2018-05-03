<template>
  <div id="app">
    <div class="container fixed-top">
      <app-header/>
      <route-filter/>
    </div>    
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
import Header from './components/Header.vue'

import UpdateBuses from './genrators/UpdateBuses'

export default {

  name: 'App',
  components: {
    'route-filter': RouteFilter,
    'app-header': Header
  },

  mounted() {
    Map.load();
    UpdateBuses.getVehicles();
    setInterval(function(){
      UpdateBuses.getVehicles();
    }, 5000)

  }
}
</script>

<style>

</style>
