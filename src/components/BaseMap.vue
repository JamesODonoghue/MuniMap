<template>
    <div>
        <svg :width="width" :height="height" id="map" class="sf-map">
            <MapFeatures v-bind:path="geoPath" v-bind:features="hoods.features" :featureClass="hoods.class"/>
            <MapFeatures v-bind:path="geoPath" v-bind:features="streets.features" :featureClass="streets.class"/>
            <MapFeatures v-bind:path="geoPath" v-bind:features="arteries.features" :featureClass="arteries.class"/>
            <MuniBuses v-bind:objects="routeVehicles"/>
            <circle :transform="transform" r="10px"></circle>
        </svg>
    </div>
</template>

<script>
import * as d3 from "d3";
import streets from "@/assets/streets.json";
import hoods from "@/assets/neighborhoods.json";
import arteries from "@/assets/arteries.json";

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

  created() {
    this.addProjection();
  },

  data() {
    return {
      transform: null,
      height: "100vh",
      width: "100%",
      streets: {
        features: streets.features,
        class: "streets"
      },
      hoods: {
        features: hoods.features,
        class: "hoods"
      },
      arteries: {
        features: arteries.features,
        class: "arteries"
      }
    };
  },

  computed: {
    ...mapState("map", ["projection", "geoPath"]),
    ...mapState("buses", ["routeVehicles"]),
    ...mapState("routes", ["routeInfo"])
  },

  methods: {
    ...mapActions("map", ["createProjection"]),
    async addProjection() {
      let getPosition = options => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

      let position = await getPosition();

      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;


      var height = window.innerHeight;
      var width = window.innerWidth;
      // Create a unit projection.
      var projection = d3
        .geoMercator()
        .center([this.lon, this.lat])
        .scale(.1)
        .translate([0, 0]);

      // Create a path generator.
      var path = d3.geoPath().projection(projection);

      // Compute the bounds of a feature of interest, then derive scale & translate.
      var b = path.bounds(streets),
        s =
          0.95 /
          Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [
          (width - s * (b[1][0] + b[0][0])) / 2,
          (height - s * (b[1][1] + b[0][1])) / 2
        ];

      this.createProjection(projection.scale(s).translate(t));

      this.transform = `translate(${projection([this.lon, this.lat])})`;

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
</style>