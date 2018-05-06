<template>

</template>

<script>

    import NextBusService from '@/services/NextBusService';
    import * as d3 from 'd3';
    import _ from 'lodash';
        
    import eventHub from '@/services/EventHub.js';
    import * as constants from '@/constants/constants.js';

    export default {
        name: 'MuniBuses',

        props: {
            projection: [Function, Object]
        },

        created() {

            // Set up subscriptions

            eventHub.$on(constants.GET_ROUTE_SUCCESS, function(data){
                this.routes = data.route;
                this.getVehicles();
            }.bind(this))

            eventHub.$on(constants.UPDATE_ROUTE, function(routes){
                this.filterRoutes(routes);
            }.bind(this))

        },
        mounted() {
            var self = this;
            this.busGroup = d3.select('svg').append('g');

            setInterval(function(){
                self.getVehicles();
            }, 15000);
            
        },

        data() {
            return {
                routes: [],
                vehicles: [],
                busGroup: {}
            }
        },

        methods: {
            getVehicles: function(){

                var self = this;

                let params = {
                    agencyTag: constants.MUNI_TAG,
                    routeTag: '',
                    lastReportTime: NextBusService.lastTimeReported
                }

                let success = (data) => {
                    self.vehicles = data.map(function(bus, i){
                        let routeObj = _.find(self.routes, function(route){
                            return route.tag === bus.routeTag;
                        });
                        bus.color = routeObj.color;
                        return bus;
                    })
                    self.drawBuses(self.vehicles);
                }
                
                NextBusService.getVehicleLocations(params.agencyTag, params.routeTag, params.lastReportTime)
                    .then(success.bind(this))

            },

            getRoutes: function() {
                var self = this;
                return NextBusService.getRouteList(constants.MUNI_TAG)
                    .then(function(data){
                        return self.routes = data.route;
                    });
            },

            filterRoutes(routes){

                let busLayer = this.busGroup;
                let currentBuses = busLayer.selectAll('.bus');

                currentBuses.style('opacity', function(d){
                    if(routes.length && _.indexOf(routes, d.routeTag) === -1){
                        return 0;
                    }
                })
            },

            drawBuses: function(busData){
                let currentBuses, 
                    newBuses, 
                    projection = this.projection,
                    busLayer = this.busGroup;

                let busIcon = '\uf207';

                currentBuses = busLayer.selectAll('.bus')
                    .data(busData, function(d) { 
                    return d.id; 
                    })

                // Update current bus location
                currentBuses
                    .transition()
                    .duration(1000)
                    .attr('transform', function(d) {
                        return 'translate(' + projection([d.lon, d.lat]) + ') scale(2)'
                    })
                    .transition()
                    .duration(1000)
                    .attr('transform', function(d) {
                        return 'translate(' + projection([d.lon, d.lat]) + ') scale(1)'
                    })

                // Add new buses

                newBuses = currentBuses.enter()
                    .append('g')
                    .attr('class', 'bus')

                // Bus icon
                newBuses
                    .append('text')
                    .text(function(d) { return busIcon; })
                    .style('font-family', 'FontAwesome')
                    .style('font-size', '12px' )
                    .style('text-anchor', 'middle')
                    .style('fill', function(d){
                        return '#' + d.color;
                    })

                newBuses
                    .attr('transform', function(d) {
                        return 'translate(' + projection([d.lon, d.lat]) + ')'
                    })

            }
        }
    }


</script>

<style scoped>

</style>