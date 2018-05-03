<template>
    <div class="route-filter">
        <input type="text" id="myInput" v-model="filter" placeholder="Search for Routes..." title="Type in a name">
    </div>
</template>

<script>

import NextBusService from '@/services/NextBusService'
import UpdateBuses from '@/generators/UpdateBuses'

export default {

  name: 'RouteFilter',

  data() {
      return {
          filter: '',
          routeList: []
      }
  },

  watch: {
      filter: function(val){
          console.log(val)
          UpdateBuses.filterBuses(val)
      }
  }
}
</script>

<style>

</style>
