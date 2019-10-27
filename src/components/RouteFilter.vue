<template>
<div class="filter-container" :class="{'open': showDropdown}">
    <!-- <div class="filter-search">
        <input type="text" v-model="query" />
    </div>
    <div class="filter-dropdown">
        <div class="routes-container">
            <div v-for="(route, key) in filteredRoutes" :key="key" class="filter-item">
                <input :id="key" class="filled-in" type="checkbox" :checked="route.selected" :value="key" @change="FILTER_UPDATE" v-model="routeInfo[key].selected">
                <label :for="key"> {{key, route.selected}}</label>
            </div>
        </div>
        <div class="filter-button">
            <button v-on:click.prevent="showDropdown=!showDropdown"></button>
        </div>
    </div> -->
</div>
</template>

<script>
import eventHub from "@/services/EventHub.js";
import * as constants from "@/constants/constants.js";

import _ from "lodash";
import NextBusService from "@/services/NextBusService";
import {
    mapActions,
    mapState
} from "vuex";
import {
    FETCH_ROUTES,
    FILTER_UPDATE
} from "@/store/action-types";

export default {
    name: "BusRoutes",

    data() {
        return {
            query: "",
            showDropdown: false
        };
    },

    computed: {
        filteredRoutes() {
            if (!this.routeInfo) this.FETCH_ROUTES();

            const search = this.query.toLowerCase().trim();
            if (!search) return this.routeInfo;

            let array = Object.keys(this.routeInfo);

            let filtered = array.filter(r => r.indexOf(search) > -1);

            let filteredObj = {};

            filtered.forEach(r => {
                filteredObj[r] = this.routeInfo[r];
            });

            return filteredObj;
        }
    },

    methods: {
    }
};
</script>

<style scoped>
.routes-container {
    display: flex;
    flex-flow: wrap;
    background: #fff;
    overflow: auto;
    margin: 1rem;
}

.filter-container {
    width: 50%;
    position: fixed;
    z-index: 99999;
    transition: all 150ms;
}

.filter-dropdown {
  display: none;
}

.filter-section.open {
    left: 0;
}

.filter-slideout {
    display: flex;
}

.filter-item {
    margin: 2rem 0;
    width: 33%;
}

.filter-dropdown {
    overflow: auto;
    height: 100vh;
}

.filter-route-container {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.filter-search {
    height: 100px;
    margin: 1rem;
}

.filter-search input {
    width: 100%;
    height: 100%;
    font-size: 40px;
    box-sizing: border-box;
    padding-left: 1rem;
}

input[type="checkbox"] {
    display: none;
}

input:checked~label {
    color: #fff;
    background: #fd000c;
}

label {
    padding: 2rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    font-size: 20px;
}

@media screen and (max-width: 768px) {
    .filter-route-container {
        padding: 2em;
        margin: 0;
        position: relative;
    }
}
</style>
