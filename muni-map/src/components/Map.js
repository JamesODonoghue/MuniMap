import * as d3 from 'd3'

import streets from '@/assets/streets.json';

var map = {};

export default map = {

    load: function (options) {

        let defaultOptions,
            mapOptions,
            features,
            projection,
            geoPath,
            svg,
            sfMap,
            buses;

        defaultOptions = {
            jsonMap: streets,
            element: '#map',
            svgClass: 'svg-map',
            mapClass: 'bus-map'
        }

        mapOptions = Object.assign({}, defaultOptions, options);

        features = mapOptions.jsonMap.features ? mapOptions.jsonMap.features : alert('Map does not have features array');

        projection = d3.geoMercator()
            .center([-122.453701, 37.8])
            .scale(400000)

        // create a path to draw the streets

        geoPath = d3
            .geoPath()
            .projection(projection)

        // Create SVG element

        svg = d3
            .select('#app')
            .append('svg')
            .style('position', 'absolute')
            .style('height', '100%')
            .style('width', '100%')

        // Create SF Map

        sfMap = svg.selectAll('path')
            .data(features)
            .enter()
            .append('path')
            .attr('d', geoPath)
            .style('stroke-width', '.5')
            .style('stroke', 'black')
            .style('fill', '#eee')

        map.geoPath = geoPath;
        map.buses = svg.append('g')
            .attr('class', 'bus')

        map.projection = projection;

    }

}