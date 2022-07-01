
<script setup>
import Logo from "../Icon/Logo.vue";
import MobileShowLists from "../Icon/MobileShowLists.vue";

const emit = defineEmits(["dropMenu"]);
</script>

<template>
    <div class="nav-bar">
        <div class="logo-and-brand">
            <div class="logo">
                <Logo />
            </div>
            <div class="brand">
                <h1>Tweet Lists</h1>
            </div>
        </div>
        <div class="mobile-show-list">
            <MobileShowLists @click="emit('dropMenu')"  />
        </div>
    </div>
</template>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 95px;
    padding: 0 24px;

    position: relative;
}
.logo-and-brand {
    display: flex;
    align-items: center;
}

.logo-and-brand .logo {
    margin: 0 18px 4px 0;
    cursor: pointer;
}

.logo-and-brand .brand {
    cursor: pointer;
    margin-right: 10px;

    color: #14171a;

    font-weight: bold;
    font-size: 10px;
    letter-spacing: 0.4px;
}


</style>