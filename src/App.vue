<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BaseNavBar from './components/BaseNavBar.vue';
import BaseSideNav from './components/BaseSideNav.vue';
import DescribeList from './components/DescribeList.vue';

</script>

<template>
  <div class="wrap-all-main">
    <div class="nav">
      <BaseNavBar />
    </div>
    <div class="content">
      <BaseSideNav />
      <div class="main">
        <div class="side-section">
          <DescribeList />
        </div>
        <div class="main-section">
          <router-view></router-view>
        </div>
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
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0 0 0 70px;
}

.main-section {
  overflow: scroll;
  height: 79vh;
}
</style>
