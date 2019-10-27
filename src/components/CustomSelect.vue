<template>
    <div class="dropdown">
        <div @click="toggle" class="dropdown-value">
            {{ getLabel(selected) }}
        </div>
        <div v-if="opened" class="dropdown-content">
            <div :key="o[labelKey]" v-for="o in options" :value="getVal(value)" @click="change(o)" :class="{__active: getVal(o) == getVal(value)}" class="dropdown-item">{{ getLabel(o) }}</div>
        </div>
    </div>
</template>

<script>
import eventHub from "@/services/EventHub.js";
import * as constants from "@/constants/constants.js";
import {
    FETCH_ROUTES,
    FILTER_UPDATE
} from "@/store/action-types";

export default {
    name: "CustomSelect",

    data() {
        return {
            opened: false,
            selected: this.value
        };
    },

    mounted(){
    },

    computed: {
        // selected() {
        //     return this.value;
        // }
    },
    props: {
        value: {
            required: false
        },
        options: {
            type: Object,
            required: true
        },
        valueKey: {
            type: String,
            required: false
        },
        labelKey: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },
        disabled: {
            type: Boolean
        }
    },

    methods: {
        getVal(opt) {
            return !this.valueKey ? opt : opt[this.valueKey]
        },
        getLabel(opt) {
            return !this.labelKey ? opt : opt[this.labelKey]
        },
        change(opt) {
            this.selected = opt;
            this.opened = false
            if (this.onChange !== undefined) {
                this.onChange(this.selected)
            }
        },
        toggle() {
            if (this.disabled) {
                return
            }
            this.opened = !this.opened
        }
    }
};
</script>

<style scoped>

.dropdown {
    position: fixed;
    z-index: 9999;
    background: #fff;
    top: 200px;
    width: 200px;
}

.dropdown-item {
    padding: 1rem 0;
}

.dropdown-value {
    padding: 1rem;
}

.dropdown-item:hover {
    background: lightgrey
}

.dropdown-content {
    height: 300px;
    overflow: auto;
}

</style>
