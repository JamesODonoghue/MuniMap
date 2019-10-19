const NEXT_BUS_URL = 'http://webservices.nextbus.com/service/publicJSONFeed';
import axios from 'axios'
import { MUNI_TAG } from '@/constants/constants';

let NextBusApi = {}
export default NextBusApi = {

    getData: function (params) {
        let apiUrl = NEXT_BUS_URL;

        let queryString = `?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}`;

        console.log(queryString);
        return axios
            .get(apiUrl + queryString)
            .then(res => res.data)
    },

    fetchRouteList() {
        var params = {
            a: MUNI_TAG,
            command: 'routeConfig'
        };

        return NextBusApi.getData(params)

    },

    getVehicleLocations(params) {
        console.log(params);
        let { agencyTag, lastReportedTime = 0, routeTag } = params;
        var params = {
            a: agencyTag,
            command: 'vehicleLocations',
            t: lastReportedTime,
            r: routeTag
        };

        console.log(params);

        return NextBusApi.getData(params)
            .then((data) => {
                return data;
            })

    }
}