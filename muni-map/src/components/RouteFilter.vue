<template>
    <div class="route-filter">
        <input type="text" id="myInput" v-model="filter" placeholder="Search for names.." title="Type in a name">
    </div>
</template>

<script>

import NextBusService from '@/services/NextBusService'
import UpdateBuses from '@/components/UpdateBuses'

export default {

  name: 'RouteFilter',

//   mounted() {
//       this.getRouteList();
//   },

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

//   methods: {
    //   getRouteList: function() {

    //       let success = (data) => {
    //           this.routeList = data.route;
    //       }

    //       NextBusService.getRouteList('sf-muni')
    //         .then(success.bind(this));

    //   }
//   } 
}
</script>

<style>

</style>
