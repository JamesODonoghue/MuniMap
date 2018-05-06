<template>
    <g>
        <path v-for="feature in features" :key="feature.id" :d="path(feature)" :class="featureClass"></path>
    </g>

</template>

<script>

    import streets from '@/assets/streets.json';
    import hoods from '@/assets/neighborhoods.json';
    import * as d3 from 'd3';

    export default {
        name: 'MapStreets',
        props: {
            path: Function,
            features: Array,
            featureClass: String
        }
    }
</script>

<style>



path.streets {
    stroke: grey;
    stroke-opacity: 0.2;
    fill: none;

}

path.hoods {
    stroke: darkgrey;
    stroke-opacity: 0.8;
    fill: #EEE;
}

path.arteries {
    stroke: gold;
    stroke-opacity: 0.7;
    fill: none;
}

</style>