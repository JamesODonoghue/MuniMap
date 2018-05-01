import map from './Map';
import NextBusService from '../services/NextBusService';


var busDisplay = {};


busDisplay.getVehicles = function(){

    let _this = this
    let lastReportTime = 0
    
    let params = {
      agencyTag: 'sf-muni',
      routeTag: ''
    }

    // let params = Object.assign({}, defaults, queryParams)

    let success = (data) => {
        busDisplay.updateBuses(data);
    }
      

    NextBusService.getVehicleLocations(params.agencyTag, params.routeTag, lastReportTime)
        .then(success.bind(this))
        .catch(function(error){
            console.error(error)
        });

}


busDisplay.updateBuses = function(busData){
    let currentBuses, 
    newBuses, 
    projection = map.projection;

    currentBuses = map.buses.selectAll('.bus')
        .data(busData, function(d) { 
        return d.id; 
        })


    // currentBuses.selectAll('.bus').remove();

    newBuses = currentBuses.enter()

    newBuses
        .append('circle')
        .attr('cx', function (d) { 
        return projection([d.lon, d.lat])[0]; 
        })
        .attr('cy', function (d) { 
        return projection([d.lon, d.lat])[1]; 
        })
        .attr('r', '4px')      
        .attr('fill', 'red');


    currentBuses.exit().remove()
}

export default busDisplay;

