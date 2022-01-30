
<script setup>
import Logo from "./Icon/Logo.vue"
import TransitionInput from "./TransitionInput.vue";
import Create from "./Icon/Create.vue";
import SearchDropdown from "../views/SearchDropdown.vue";
import CreateList from "../views/CreateList.vue";

import { ref } from "vue";

const clickCreateDropdown = ref(false);

function clickCreate() {
    clickCreateDropdown.value == true ? clickCreateDropdown.value = false : clickCreateDropdown.value = true
}

</script>

<template>
    <div class="nav-bar">
        <div class="logo-and-brand">
            <div class="logo">
                <Logo />
            </div>
            <div class="brand">
                <span>Tweet Lists</span>
            </div>
            <div class="menu">
                <a href>
                    <span>Github</span>
                </a>
                <a href>
                    <span>About Us</span>
                </a>
            </div>
        </div>
        <div class="profile-setting">
            <div class="search">
                <TransitionInput />
                <div class="search-dropdown" style="display: none;">
                    <SearchDropdown />
                </div>
            </div>
            <div class="create-list" @click="clickCreate()">
                <Create />
            </div>
            <div
                class="create-dropdown"
                :style="{ display: clickCreateDropdown ? 'block' : 'none' }"
            >
                <CreateList v-on:clickCreate="clickCreate()" />
            </div>
            <button class="btn-profile-setting">
                <img
                    src="https://pbs.twimg.com/profile_images/1372385481653108737/sfSFcAL__normal.jpg"
                    alt
                />
            </button>
        </div>
    </div>
</template>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 96px;
    padding: 0 44px;

    position: relative;
}
.logo-and-brand {
    display: flex;
    align-items: center;
}

.logo-and-brand .logo {
    margin: 0 25px 4px 0;
    cursor: pointer;
}

.logo-and-brand .brand {
    margin-right: 55px;
    cursor: pointer;
}

.logo-and-brand .brand span {
    letter-spacing: 0;
    line-height: 24px;
    font-weight: bold;
    font-size: 24px;
    color: #14171a;
}

.menu {
    display: flex;
}

.menu a {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;

    margin-right: 30px;
    padding: 10px 0;

    border: 3px solid transparent;
}

.menu a:hover {
    border-bottom: 3px solid #ccd6dd;
}

.profile-setting {
    display: flex;
    align-items: center;
}

.search {
    position: relative;
    cursor: pointer;
}

.search-dropdown {
    position: absolute;
    right: -10px;
}

.create-list {
    width: 50px;
    height: 50px;
    margin-left: 15px;
    border-radius: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #ccd6dd;
    position: relative;
}
.create-list:hover {
    border: 2px solid #ccd6dd;
}

.create-dropdown {
    position: absolute;
    right: 105px;
    top: 75px;
}

.btn-profile-setting {
    margin-left: 15px;
}

.btn-profile-setting img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    cursor: pointer;
}

.btn-profile-setting img:hover {
    border: 2px solid #ccd6dd;
}

button {
    border: none;
    background: white;
}

a {
    text-decoration: none;
}
</style>