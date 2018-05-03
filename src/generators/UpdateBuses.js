import map from './Map';
import NextBusService from '../services/NextBusService';
import _ from 'lodash';

var busDisplay = {};


busDisplay.getVehicles = function(){

    let lastReportTime = NextBusService.lastTimeReported;
    
    let params = {
      agencyTag: 'sf-muni',
      routeTag: ''
    }

    let success = (data) => {
        busDisplay.updateBuses(data);
    }
      

    NextBusService.getVehicleLocations(params.agencyTag, params.routeTag, lastReportTime)
        .then(success.bind(this))
        .catch(function(error){
            console.error(error)
        });

}

busDisplay.filterBuses = function(routeFilter){


    let busLayer = map.svg
    let currentBuses = busLayer.selectAll('.bus')

    let filter = routeFilter.split(',');

    // debugger

    currentBuses.style('opacity', function(d){
        if(routeFilter !== '' && _.indexOf(filter, d.routeTag) === -1){
            return 0;
        }
    })

}


busDisplay.updateBuses = function(busData){
    let currentBuses, 
    newBuses, 
    projection = map.projection;

    // projection.scale(150);

    let busLayer = map.svg
    let busIcon = '\uf207';

    currentBuses = busLayer.selectAll('.bus')
        .data(busData, function(d) { 
        return d.id; 
        })

    // Update current bus location

    currentBuses
        .transition()
        .duration(2000)
        .attr('transform', function(d) {
            return 'translate(' + projection([d.lon, d.lat]) + ')'
          })

    // Add new buses

    newBuses = currentBuses.enter()
        .append('g')
        .attr('class', 'bus')
        .attr('transform', function(d) {
            console.log(projection([d.lon, d.lat]));
            return 'translate(' + projection([d.lon, d.lat]) + ')'
          });

    // Bus icon
    newBuses
        .append('text')
        .text(function(d) { return busIcon; })
        .style('font-family', 'FontAwesome')
        .style('font-size', '10px' )
        .style('text-anchor', 'middle')
        .style('fill', '#4A148C')
        .style('stroke', '#000')
        .style('stroke-width', .2)
        

    

}

export default busDisplay;

