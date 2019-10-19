<template>
    <g>
        <g v-for="(vehicles, key) in mappedRouteVehicles" :key="key">
            <g v-for="vehicle in vehicles" :key="vehicle.id" :transform="vehicle.transform">
                <text :style="vehicle.style" v-html="'\uf207'"></text>
            </g>
        </g>
    </g>
   
</template>

<script>
import NextBusService from "@/services/NextBusService";
import * as d3 from "d3";
import _ from "lodash";

import eventHub from "@/services/EventHub.js";
import * as constants from "@/constants/constants.js";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "MuniBuses",

  data(){
      return {
          busStyle:{
            'font-family': "FontAwesome",
            'font-size': "12px",
            'text-anchor': "middle"
          }
      }
  },
  
  props: {
      objects: Object,
      projection: Function
  },

  computed: {
    mappedRouteVehicles() {
        return Object.keys(this.objects).map(obj => {
            return this.objects[obj].map((vehicle) => {
                return {
                    ...vehicle,
                    style: {
                        ...this.busStyle,
                        fill: this.routeInfo[route].color
                    },
                    transform: "translate(" + this.projection([vehicle.lon, vehicle.lat])+")"
                }
            })
        })
    }
  },

  methods: {
    ...mapActions("buses", ["getAllVehicles"])
  }
};
</script>

<style scoped>
</style>