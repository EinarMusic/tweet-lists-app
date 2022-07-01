<script setup>
import Caret from "../Icon/Caret.vue";
import Close from "../Icon/Close.vue";
import Create from "../Icon/Create.vue";
import AccountSetting from "../AccountSetting.vue";
import CreateList from "../CreateList.vue";

import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const listOpen = ref(true);
const saveOpen = ref(false);

const store = useStore();
const router = useRouter();

const emit = defineEmits(["dropMenu"]);

const dropSetting = ref(false);
const dropCreate = ref(false);

const getTweets = (tw) => {
    store.commit("list/clearToShowNewTweetList");
    store.commit("list/setUsers", tw); 

    router.push("/lists");
    emit("dropMenu")
}

const getSaveList = () => {
    store.dispatch("save/getSpecificSave", store.state.auth.user.email);

    router.push("/save");
}
</script>

<template>
    <div class="side-nav">
        <div class="list">
            <div class="header-menu">
                <h1 class="title-menu">Tweet List</h1>
                <Close @click="emit('dropMenu')" />
            </div>
            <div class="create">
                <div>
                    <div class="create-list" @click="dropCreate = !dropCreate">
                        <div class="wrap-icon-create">
                            <Create /> 
                        </div>
                        <span class="btn-create">Create List</span>
                    </div>
                    <div class="create-dropdown" v-if="dropCreate">
                        <CreateList v-on:dropCreate="dropCreate = !dropCreate" />
                    </div>
                </div>
            </div>
            <ul class="nav-list">
                <li class="nav-items-top-level">
                    <div class="wrap-btn-top-level" @click="listOpen = !listOpen">
                        <span class="nav-items-title">Lists</span>
                        <span class="nav-items-list" :style="{ transform: listOpen ? 'rotate(180deg)' : 'rotate(0)' }">
                            <Caret />
                        </span>
                    </div>
                    <ul class="nav-list-second-level" :style="{ display: listOpen ? 'block' : 'none' }" 
                        v-for="list in store.state.list.listsForNav"
                    >
                        <li class="nav-items-first-level" v-for="desc in list.descList">
                            <span @click="getTweets(list)">{{ desc.name }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="footer">
                <div class="setting">
                    <div class="btn-profile-setting" @click="dropSetting = !dropSetting">
                        <img
                            src="https://pbs.twimg.com/profile_images/1372385481653108737/sfSFcAL__normal.jpg"
                            alt
                        />
                        <span class="btn-create">Sign out</span>
                    </div>
                    <div class="account" v-if="dropSetting">
                        <AccountSetting v-on:dropSetting="dropSetting = !dropSetting" />
                    </div>
                </div>
                <div class="github-btn">
                    <span class="btn-git">Github</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-nav {
    background: #182430;

    width: 100%;
    height: 100vh;


    position: relative;
    overflow: hidden;
}

.header-menu {
    display:flex;
    align-items:center;
    justify-content: space-between;

    padding: 15px 22px 15px 17px;
}

.title-menu {
    font-weight: bold;
    font-size: 19px;
    letter-spacing: 0.4px;
    color: #fff;
}

.wrap-btn-top-level {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    padding: 20px 25px 10px 17px;
}

.nav-items-title {
    font-weight: 500;
    font-size: 19px;
    letter-spacing: 0.4px;
    color: #fff;
}

.nav-items-list,
.nav-items-save {
    display: inline-block;
    font-weight: 550;
}

.nav-items-first-level,
.nav-items-second-level {
    color: #b6c4ce;
    white-space: nowrap;
    text-overflow: ellipsis;

    width: 170px;
    overflow: hidden;

    padding: 5px 27px;
}

li {
    list-style: none;
}

span {
    display: inline-block;
    text-decoration: none;
    line-height: 16px;
    font-size: 15px;

    word-break: break-word;
    letter-spacing: normal;
    font-weight: normal;
    cursor: pointer;
}

button {
    outline: none;
    border: none;
    background-color: transparent;
}

/* setting */

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding: 5px 22px 5px 18px;


    position: fixed;
    bottom: 0;
    left: 0;

    /* left: 17px; */
}

.setting {
    margin: 0 0 10px 0;
}

.github-btn {
    cursor: pointer;
}

.btn-git {
    color: #b6c4ce;
    font-size: 16px;
    font-weight: 500;
}

.btn-profile-setting {
    display: inline-flex;
    align-items: center;

    position: relative;

    cursor: pointer;
}

.btn-profile-setting img {
    width: 35px;
    height: 35px;

    object-fit: cover;

    border-radius: 100%;
    border: 2px solid #ccd6dd;
}

.account {
    position: absolute;
    z-index: 3;
    /* right: 50px; */
    top: 0px;
}

.btn-sign {
    color: #b6c4ce;
    font-size: 16px;
    font-weight: 500;

    padding: 10px;
}

/* create */

.create {
    padding: 0 22px 0 17px;
}

.create-list {
    display: inline-flex;
    align-items: center;

    cursor: pointer;
    position: relative;
}

.btn-create {
    color: #b6c4ce;
    font-size: 16px;
    font-weight: 500;

    padding: 10px;
}

.wrap-icon-create {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 35px;
    height: 35px;

    border-radius: 100%;
    border: 2px solid #ccd6dd;
    background: white;
}

.create-dropdown {
    position: absolute;
    z-index: 3;
    /* right: 55px; */
    top: 140px;
}


</style>