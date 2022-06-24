<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BaseNavBar from './components/BaseNavBar.vue';
import BaseSideNav from './components/BaseSideNav.vue';

</script>

<template>
  <div class="wrap-all-main">
    <div class="nav">
      <BaseNavBar />
    </div>
    <div class="content">
      <BaseSideNav />
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
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

.content {
  display: inline-flex;
}

.main {
  display: inline-block;

  overflow-x: hidden;
  overflow-y: scroll;

  height: 86vh;
  margin-left: 50px;
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
