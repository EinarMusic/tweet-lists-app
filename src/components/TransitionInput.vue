<script setup>

import Search from './Icon/Search.vue';
import { ref } from "vue";

const click = ref(false)

function clicked() {
    return click.value = true
};

</script>

<template>
    <div class="input">
        <div @click="clicked()" :class="click == false ? 'wrap-input' : 'wrap-input-click'">
            <span class="icon">
                <Search :click="click" />
            </span>
            <input type="text" placeholder="Search Users" />
        </div>
    </div>
</template>


<style scoped>
.wrap-input {
    display: flex;
    align-items: center;

    width: 48px;
    height: 48px;
    transition: width 1s, height 1s;

    border-radius: 9999px;
}

.wrap-input-click {
    display: flex;
    align-items: center;

    width: 300px;
    height: 45px;
    transition: width 2s, height 2s, transform 2s;

    border: 1px solid rgb(29, 155, 240);
    border-radius: 9999px;
}

/* .wrap-input:hover {
    width: 300px;
    height: 45px;

    border: 1px solid rgb(29, 155, 240);
} */

.icon {
    margin-top: 6px;
}

input {
    outline: none;
    border: none;

    width: 100%;

    border-radius: 9999px;
    padding-left: 5px;

    font-size: 15px;
    font-weight: 500;
}
::placeholder {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}
</style>