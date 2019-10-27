<template>
    <g>
        <g v-for="(vehicles, key) in mappedRouteVehicles" :key="key">
            <g v-for="vehicle in vehicles" :key="vehicle.id" :transform="vehicle.transform">
                <circle fill="#fff" stroke="#fff;" r="20px"></circle>
                <text :style="vehicle.style" v-html="'\uf207'"></text>

            </g>
        </g>
    </g>
</template>

<script>
import NextBusService from "@/services/NextBusService";
import _ from "lodash";

import eventHub from "@/services/EventHub.js";
import * as constants from "@/constants/constants.js";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "MuniBuses",
    mounted() {

    },

    data() {
        return {
            busStyle: {
                'font-family': "FontAwesome",
                'font-size': "30px",
                'text-anchor': "middle",
                'transform': "translate(0 10)"
            }
        }
    },

    props: {
        objects: Object,
        objectMeta: Object,
        projection: Function
    },

    computed: {
        mappedRouteVehicles() {
            let newArr = Object.keys(this.objects).map(obj => {
                return this.objects[obj].map((vehicle) => {
                    return {
                        ...vehicle,
                        style: {
                            ...this.busStyle,
                            fill: this.objectMeta[obj].color
                        },
                        transform: "translate(" + this.projection([vehicle.lon, vehicle.lat]) + ")"
                    }
                })
            });

            return newArr;
        }
    },

    methods: {
    }
};
</script>

<style scoped>

</style>