import Vue from 'vue'
import axios from 'axios'

const NEXT_BUS_URL = '//webservices.nextbus.com/service/publicJSONFeed';

var NextBusService = {};

export default NextBusService = {

    getData: function(params){
        let apiUrl = NEXT_BUS_URL;
        
        let paramsStr = (Object.keys(params).length?'?':'') +
            Object.keys(params).map(function(key) {
            return [key, params[key]].join('=');
            }).join('&');

        return axios.get(apiUrl + paramsStr)
            .then(function(res) { return res.data; })
    },

    getRouteList: function(agencyTag) {
        var params = {
            a: agencyTag,
            command: 'routeConfig'
        };

        return NextBusService.getData(params)

    },

    getVehicleLocations: function(agencyTag, routeTag, lastTime, callback ) {
        lastTime = lastTime || 0; // Last 15 min default

        var params = {
            a: agencyTag,
            command: 'vehicleLocations',
            t: lastTime
        };

        if (routeTag) params.r = routeTag;
        if (lastTime) params.t = lastTime;


        return NextBusService.getData(params)
            .then(function(data){
                NextBusService.lastTimeReported = data.lastTime.time;
                return data.vehicle.map(function(busData){
                    return busData;
                })
            })
            .then(callback)

    }
}