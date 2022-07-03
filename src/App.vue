<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BaseNavBar from './components/BaseNavBar.vue';
import BaseSideNav from './components/BaseSideNav.vue';
//
import NavBar from './components/RESPONSIVE/NavBar.vue';
import SideNav from './components/RESPONSIVE/SideNav.vue';

import { ref } from "vue";
import { useStore } from "vuex";

import { useMediaQuery } from '@vueuse/core';
import firebase from "firebase/compat/app";

const store = useStore();

const isSmallScreen = useMediaQuery('(min-width: 700px)');

const dropMenu = ref(false);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch("list/getListsForNav", user.email);
        store.commit("auth/userInfo", user)
        //store.dispatch("save/getSaveForNav");
    }
})
</script>

<template>
  <div class="wrap-all-main">
    <!--  -->
    <div v-if="!isSmallScreen" class="mobile">
      <NavBar v-on:dropMenu="dropMenu = !dropMenu" />
      <div class="mobile-nav-side" v-if="dropMenu">
        <SideNav v-on:dropMenu="dropMenu = !dropMenu"/>
      </div>
      <div>
        <div class="mobi-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-else>
      <div class="nav" >
        <BaseNavBar />
      </div>
      <div class="content">
        <div class="nav-side">
          <BaseSideNav />
        </div>
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<style>
* {
  font-family: Avenir, Chirp, -apple-system, BlinkMacSystemFont, Segoe UI,
    Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrap-all-main {
  height: 100vh;
  overflow: hidden;
  position: relative;


}

.mobile {
}

.mobile-nav-side {
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100%; */

  /* display: inline-flex;
  align-items: center;
  justify-content: space-between; */
}

.mobi-content {
  display: inline-block;

  overflow-x: hidden;
  overflow-y: scroll;

  height: 100vh;
  /* height: 90vh; */
}

/*  */

.content {
  display: inline-flex;
  overflow: hidden;
}

.nav-side {
  width: 270px;
}

.main {
  display: inline-block;

  overflow-x: hidden;
  overflow-y: scroll;

  height: 86vh;
  margin-left: 50px;

  width: 600px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
