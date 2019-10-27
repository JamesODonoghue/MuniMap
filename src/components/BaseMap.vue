<template>
    <div>
        <svg :width="width" :height="height" id="map" class="sf-map">
            <g id="map-group">
                <MapFeatures v-bind:path="path" v-bind:features="hoods.features" :featureClass="hoods.class" />
                <!-- <MapFeatures
                v-bind:path="path"
                v-bind:features="streets.features"
                :featureClass="streets.class"
                /> -->
                <!-- <MapFeatures
                v-bind:path="path"
                v-bind:features="arteries.features"
                :featureClass="arteries.class"
                /> -->

                <g v-for="(paths, i) in routePaths" :key="i">
                    <line stroke="red" stroke-width="1.5" :x1="paths[0][0]" :y1="paths[0][1]" :x2="paths[1][0]" :y2="paths[1][1]"></line>
                </g>   

                <MuniBuses :objects="vehicles" :objectMeta="routes" :projection="projection" />
                <circle :transform="transform" r="10px" />
            </g>
        </svg>
    </div>
</template>

<script>
import { geoPath, geoMercator } from "d3-geo";
import * as d3zoom from 'd3-zoom';
import * as d3select from 'd3-selection';

// import streets from "@/assets/streets.json";
import hoods from "@/assets/neighborhoods.json";
// import arteries from "@/assets/arteries.json";

import MapFeatures from "./MapFeatures";
import MuniBuses from "./MuniBuses";

import EventHub from "@/services/EventHub.js";

import { dispatch, mapActions, mapState } from "vuex";

export default {
    name: "BaseMap",

    components: {
        MapFeatures,
        MuniBuses
    },
    mounted() {
        const mapZoom = d3zoom.zoom()
            .scaleExtent([0.1, 10])
            .on('zoom', () =>{
                this.g.attr('transform', d3select.event.transform);
            });
        this.svg = d3select.select('#map');
        this.g = d3select.select('#map-group');
        this.svg.call(mapZoom);
        this.createMap();
    },

    data() {
        return {
            height: "100vh",
            width: "100%",
            scale: .5,
            center: [0, 0],
            translate: [0, 0],

            translateX: 0,
            translateY: 0,
            touchStarted: false,
            touchLastX: 0,
            touchLastY: 0,

            // streets: {
            //     features: streets.features,
            //     class: "streets"
            // },
            hoods: {
                features: hoods.features,
                class: "hoods"
            },
            // arteries: {
            //     features: arteries.features,
            //     class: "arteries"
            // }
        };
    },

    props: {
        vehicles: Object,
        routes: Object,
        selectedRoute: Object
    },

    computed: {
        routePaths() {

            let paths = [];
            let projected = [];

            // this.selectedRoute = !this.selectedRoute ? this.routes[0] : this.selectedRoute;

            if(this.selectedRoute.tag && this.routes[this.selectedRoute.tag].path){
                this.routes[this.selectedRoute.tag].path.forEach(path => {
                    let points = path.point;
                    for (let i = 0; i < points.length - 1; i++) {
                        let curr = points[i];
                        let next = points[i + 1];

                        projected.push([
                            this.projection([curr.lon, curr.lat]),
                            this.projection([next.lon, next.lat])
                        ]);
                    }
                });
            }
           
            return projected;
            // return connectedPaths;

        },
        transform() {
            return `translate(${this.projection(this.center)})`;
        },
        projection() {
            return geoMercator()
                .center(this.center)
                .scale(this.scale)
                .translate([this.translateX, this.translateY])
        },
        path() {
            return geoPath().projection(this.projection);
        }

    },

    methods: {
        onTouchStart(e) {
            this.touchStarted = true;

            this.touchLastX = e.clientX;
            this.touchLastY = e.clientY;
        },
        onTouchEnd() {
            this.touchStarted = false;
        },
        onTouchMove(e) {
            if (this.touchStarted) {
                this.translateX = this.translateX + e.clientX - this.touchLastX;
                this.translateY = this.translateY + e.clientY - this.touchLastY;

                this.touchLastX = e.clientX;
                this.touchLastY = e.clientY;
            }
        },
        async createMap() {
            let width = window.innerWidth;
            let height = window.innerHeight;

            this.translateX = width / 2;
            this.translateY = height / 2;

            let getPosition = options => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, options);
                });
            };

            let position = await getPosition();
            this.center = [position.coords.longitude, position.coords.latitude];

            // Compute the bounds of a feature of interest, then derive scale & translate.

            let b = this.path.bounds(hoods),
                s =
                0.95 /
                Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [
                    (width - s * (b[1][0] + b[0][0])) / 2,
                    (height - s * (b[1][1] + b[0][1])) / 2
                ];

            this.scale = s;
            this.translate = t;
        }
    }
};
</script>

<style scoped>
.sf-map {
    position: absolute;
}

@media screen and (max-width: 768px) {
    .sf-map {
        position: relative;
        padding: 0;
    }
}

path.streets {
    stroke: grey;
    stroke-opacity: 0.2;
    fill: none;
}

path.hoods {
    stroke: darkgrey;
    stroke-opacity: 0.8;
    fill: #eee;
}

path.arteries {
    stroke: gold;
    stroke-opacity: 0.7;
    fill: none;
}
</style>