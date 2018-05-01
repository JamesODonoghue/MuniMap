<template>
  <div id="app">
    <div id=#map></div>
  </div>
</template>

<script>

import streets from './assets/streets.json'
import neighborhoods from './assets/neighborhoods.json'
import freeways from './assets/freeways.json'
import NextBusService from './services/NextBusService'
import Map from './components/Map'

import UpdateBuses from './components/UpdateBuses'

export default {
  name: 'App',
  mounted() {
    Map.load();
    UpdateBuses.getVehicles();

  }
}
</script>

<style>

</style>
