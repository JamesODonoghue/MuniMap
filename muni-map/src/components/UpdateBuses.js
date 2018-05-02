import map from './Map';
import NextBusService from '../services/NextBusService';

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

    currentBuses.style('opacity', function(d){
        if(d.routeTag != routeFilter){
            return 0;
        }
    })

}


busDisplay.updateBuses = function(busData){
    let currentBuses, 
    newBuses, 
    projection = map.projection;

    let busLayer = map.svg

    currentBuses = busLayer.selectAll('.bus')
        .data(busData, function(d) { 
        return d.id; 
        })

    currentBuses.enter()
        .append('circle')
        .attr('r', 0)

    currentBuses
        .attr('fill', 'green')
        .transition()
        .duration(1500)
        .attr('cx', function (d) { 
            return projection([d.lon, d.lat])[0]; 
            })
        .attr('cy', function (d) { 
            return projection([d.lon, d.lat])[1]; 
            })
        .attr('r', 6)
        .transition()
        .duration(500)            
        .attr('r', 4)      
        .attr('fill', 'red');

    
    currentBuses.enter()
        .append('circle')
        .attr('class', 'bus')        
        .attr('cx', function (d) { 
        return projection([d.lon, d.lat])[0]; 
        })
        .attr('cy', function (d) { 
        return projection([d.lon, d.lat])[1]; 
        })
        .attr('r', '4px')      
        .attr('fill', 'red');

    

}

export default busDisplay;

