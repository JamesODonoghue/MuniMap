<template>
  <g>
    <path v-for="feature in features" :key="feature.id" :d="path(feature)" :class="featureClass"></path>
    <!-- <text v-for="feature in features" :x="path.centroid(feature)[0]" :y="path.centroid(feature)[1]">{{feature.properties.neighborho}}</text> -->
  </g>
</template>

<script>
import streets from "@/assets/streets.json";
import hoods from "@/assets/neighborhoods.json";

export default {
  name: "MapStreets",
  props: {
    path: Function,
    features: Array,
    featureClass: String
  },

  methods: {
    handleHover(e) {
      e.setAttribute('transform', 'scale(1.2)')
    }
  }
};
</script>

<style>
path.streets {
  stroke: grey;
  stroke-opacity: 0.2;
  fill: none;
}

path.hoods {
  stroke: #fff;
  stroke-width: 2;
  fill: #000;
}

path.arteries {
  stroke: gold;
  stroke-opacity: 0.7;
  fill: none;
}

text {
  color: #fff;
  text-anchor: middle;
  fill: #fff;
  font-size: 20px;
}
</style>