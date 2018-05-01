<template>
    <div class="muni-map"></div>

</template>

<script>

import * as d3 from 'd3'

import streets from '@/assets/streets.json'
import neighborhoods from '@/assets/neighborhoods.json'
import freeways from '@/assets/freeways.json'
import NextBusService from '@/services/NextBusService'

import _ from 'lodash'

export default {
  name: 'muni-map',
  mounted(){

    // Define map projection

    this.createMap({element: '.muni-map'})

    this.updateBusLocations();


  },
  data () {
    return {
      vehicleLocations: [],
      map: {},
      projection: {},
      buses: {}
    }
  },

  methods: {

    updateBusLocations: function(queryParams){
      let _this = this
      let lastReportTime = 0
      
      let defaults = {
        agencyTag: 'sf-muni',
        routeTag: ''
      }

      let params = Object.assign({}, defaults, queryParams)

      let success = (data) => {
        this.drawBuses(data)
      }
      

      NextBusService.getVehicleLocations(params.agencyTag, params.routeTag, lastReportTime)
        .then(success.bind(this))
        .then(function(){
          // setTimeout(_this.updateBusLocations, 10000)
        })
        .catch(function(error){
          console.error(error)
        })

    },

    drawBuses: function(buses) {

      let currentBuses, 
          newBuses, 
          projection = this.projection

      currentBuses = this.buses.selectAll('.bus')
        .data(buses, function(d) { 
          return d.id; 
        })

      currentBuses.selectAll('.bus').remove()

      // Update existing buses position
      // currentBuses
      //   .transition().duration(500)
      //     .attr('cx', function (d) { 
      //       return projection([d.lon, d.lat])[0]; 
      //     })
      //     .attr('cy', function (d) { 
      //       return projection([d.lon, d.lat])[1]; 
      //     })

      newBuses = currentBuses
        .enter()
        .append('circle')
        .attr('class', 'bus')
        .attr('r', '4px')      
        .attr('fill', 'red')

      currentBuses
        .attr('cx', function (d) { 
          return projection([d.lon, d.lat])[0]; 
        })
        .attr('cy', function (d) { 
          return projection([d.lon, d.lat])[1]; 
        })


      currentBuses.exit().remove()
          
      // newBuses
      //   .enter()
      //   .append('circle')        
      //   .attr('cx', function (d) { 
      //     return projection([d.lon, d.lat])[0]; 
      //   })
      //   .attr('cy', function (d) { 
      //     return projection([d.lon, d.lat])[1]; 
      //   })
      //   .attr('r', '4px')      
      //   .attr('fill', 'red')
        

    },
    createMap: function(options){

      let defaultOptions,
          mapOptions,
          features,
          projection,
          path,
          svg,
          map,
          buses


      defaultOptions = {
        jsonMap: streets,
        element: 'body',
        svgClass: 'svg-map',
        mapClass: 'bus-map'
      }

      mapOptions = Object.assign({}, defaultOptions, options);

      features = mapOptions.jsonMap.features ? mapOptions.jsonMap.features : alert('Map does not have features array');

      projection = d3.geoMercator()
        .center([-122.453701, 37.8])
        .scale(400000)
      
      // create a path to draw the streets

      path = d3
        .geoPath()
        .projection(projection)

      // Create SVG element

      svg = d3
        .select('body')
        .append('svg')
        .attr('class', 'map-container')

      this.map = svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'sf-map')

      this.buses = svg.append('g')
        .attr('class', 'bus');

      this.projection = projection

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sf-map {
  fill: #eee;
  stroke: #000;
  stroke-width: .5
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
