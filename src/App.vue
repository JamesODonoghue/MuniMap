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
import BaseMap from './components/BaseMap.vue'

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
