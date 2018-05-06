<template>
    <div class="filter-route-container card">
        <h2> Filter by Route</h2>
        <div class="container routes-container">
            <div v-for="route in routes" :key="route.id">
                <label>
                    <input class="filled-in" type="checkbox" checked="checked" :value="route.tag" v-model="selectedRoutes" @change="updateValue">
                    <span class=""> {{route.tag}}</span>
                </label>            
            </div>
        </div>
    </div>
</template>

<script>

    import eventHub from '@/services/EventHub.js';
    import * as constants from '@/constants/constants.js';

    import NextBusService from '@/services/NextBusService';
    import _ from 'lodash';

    export default {
        name: 'BusRoutes',

        data() {
            return {
                routes: [],
                selectedRoutes: this.value || []
            }
        },

        mounted() {

            this.getRoutes().then(function(data){
                this.routes = data.route
                eventHub.$emit(constants.GET_ROUTE_SUCCESS, data);
            }.bind(this))

        },

        watch: {
            selectedRoutes: function(val){
                console.log(val);
            }
        },

        methods:{
            getRoutes: function() {
                var self = this;
                return NextBusService.getRouteList(constants.MUNI_TAG);
            },

            updateValue: function() {
                eventHub.$emit(constants.UPDATE_ROUTE, this.selectedRoutes);
            }
        }
    }
</script>

<style scoped>

.routes-container {
    max-height: 600px;
    max-width: 400px;
    overflow: auto;
}

.filter-route-container{
    position: fixed;
    padding: 2em;
}

</style>