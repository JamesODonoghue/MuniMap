import * as d3 from 'd3'
import $ from 'jquery'

import streets from '@/assets/streets.json';
import hoods from '@/assets/neighborhoods.json';


var map = {};

export default map = {

    load: function (options) {

        let defaultOptions = {
            jsonMap: streets,
            element: '#map'
        }

        let mapOptions = Object.assign({}, defaultOptions, options);
        let features = mapOptions.jsonMap.features ? mapOptions.jsonMap.features : alert('Map does not have features array');

        // Create SVG element

        var { path, projection } = map.createJsonPath();
        var { svg, sfMap } = map.createMap(path, features);
               
        map.geoPath = path;
        map.projection = projection;
        map.features = features;
        map.svg = svg;

    },

    createMap: function(path, features) {
        let svg = d3
            .select('#app')
            .append('svg')
            .attr('viewbox', "0 0 600 200")
            .attr('preserveAspectRatio', 'xMinYMin')
            .style('position', 'absolute')
            .style('height', '100%')
            .style('width', '100%')

        // Create SF Map

        let sfMap = svg.selectAll('path')
            .data(features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('stroke-width', '.5')
            .style('stroke', 'black')
            .style('fill', '#eee')

        svg.selectAll('path')
            .data(hoods.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('stroke-width', '.5')
            .style('stroke', 'green')
            .style('fill', '#eee')

        return {
            svg: svg,
            sfMap: sfMap

        }

    },

    createJsonPath: function() {
        //https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object


        var height = window.innerHeight
        var width = window.innerWidth

        // Create a unit projection.
        var projection = d3.geoMercator()
            .scale(1)
            .translate([0, 0]);

        // Create a path generator.
        var path = d3.geoPath()
            .projection(projection);

        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(streets),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.
        projection
            .scale(s)
            .translate(t);


        // var center = d3.geoCentroid(streets)
        // var scale  = 100;
        // var offset = [width/2, height/2];
        // var projection = d3.geoMercator().scale(scale).center(center)
        //     .translate(offset);

    
        // create the path
        path = d3.geoPath().projection(projection);
    
        // // using the path determine the bounds of the current map and use 
        // // these to determine better values for the scale and translation
        // var bounds  = path.bounds(streets);
        // var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
        // var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
        // var scale   = (hscale < vscale) ? hscale : vscale;
        // var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
        //                     height - (bounds[0][1] + bounds[1][1])/2];
    
        // // new projection
        // projection = d3.geoMercator().center(center)
        //     .scale(scale).translate(offset);
        // path = path.projection(projection);

        return {
            projection: projection,
            path: path
        }

    }

}