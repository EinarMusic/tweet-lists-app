
<script setup>
import Logo from "./Icon/Logo.vue";
import Create from "./Icon/Create.vue";
import CreateList from "./CreateList.vue";
import MobileShowLists from "./Icon/MobileShowLists.vue";
import AccountSetting from "./AccountSetting.vue";

import { ref } from "vue";

const dropCreate = ref(false);
const dropSetting = ref(false);

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
            </div>
        </div>
        <div class="profile-setting">
            <div class="create">
                <div class="create-list" @click="dropCreate = !dropCreate">
                    <Create /> 
                </div>
                <div class="create-dropdown" v-if="dropCreate">
                    <CreateList v-on:dropCreate="dropCreate = !dropCreate" />
                </div>
            </div>
            <div class="setting">
                <div class="btn-profile-setting" @click="dropSetting = !dropSetting">
                    <img
                        src="https://pbs.twimg.com/profile_images/1372385481653108737/sfSFcAL__normal.jpg"
                        alt
                    />
                </div>
                <div class="account" v-if="dropSetting">
                    <AccountSetting v-on:dropSetting="dropSetting = !dropSetting" />
                </div>
            </div>
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
    z-index: 3;
    right: 105px;
    top: 80px;
}

.btn-profile-setting {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    position: relative;

    margin-left: 15px;
}

.btn-profile-setting img {
    width: 50px;
    height: 50px;

    object-fit: cover;
    border-radius: 100%;
    cursor: pointer;

    border: 1px solid #ccd6dd;
}

.btn-profile-setting img:hover {
    border: 2px solid #ccd6dd;
}

.account {
    position: absolute;
    z-index: 3;
    right: 50px;
    top: 80px;
}

a {
    text-decoration: none;
}
</style>