<template>
    <div>
        <svg width="100%" height="100%" id="map" class="sf-map">
            <MapFeatures v-bind:path="geoPath()" v-bind:features="hoods.features" :featureClass="hoods.class"/>
            <MapFeatures v-bind:path="geoPath()" v-bind:features="streets.features" :featureClass="streets.class"/>
            <MapFeatures v-bind:path="geoPath()" v-bind:features="arteries.features" :featureClass="arteries.class"/>
            
            <MuniBuses v-bind:projection="projection()"/>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import streets from '@/assets/streets.json';
    import hoods from '@/assets/neighborhoods.json';
    import arteries from '@/assets/arteries.json';
    

    import MapFeatures from './MapFeatures'
    import MuniBuses from './MuniBuses'
    
    import EventHub from '@/services/EventHub.js';
    

    export default {
        name: 'BaseMap',

        components:{
            MapFeatures,
            MuniBuses
        },

        data() {
            return {
                path: '',
                streets: {
                    features: streets.features,
                    class: 'streets'
                },
                hoods: {
                    features: hoods.features,
                    class: 'hoods'
                },
                arteries: {
                    features: arteries.features,
                    class: 'arteries'
                }
            }
        },

        methods: {
            projection() {
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
                return projection
                        .scale(s)
                        .translate(t);

            },
            geoPath() {

                return d3.geoPath().projection(this.projection());

            }
        }
        
    }
</script>

<style scoped>


    .sf-map {
        position: absolute;
        padding-left: 100px;
        border: 1px solid grey;
        border-radius: 6px;
        background: lightblue;
    }

</style>