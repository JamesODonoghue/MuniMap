<template>
  <div id="app">
    <AppHeader/>
    <BaseMap/>
    <RouteFilter />
  </div>
</template>

<script>

import NextBusService from './services/NextBusService'

import RouteFilter from './components/RouteFilter.vue'
import AppHeader from './components/AppHeader.vue'

import Map from './generators/Map'
import Bus from './generators/Bus'

import BaseMap from './components/BaseMap.vue'

import 'materialize-css'

export default {

  name: 'App',
  components: {
    RouteFilter,
    BaseMap,
    AppHeader
  },

  data() {
    return {
      routes: []
    }
  }
}
</script>

<style>

</style>
