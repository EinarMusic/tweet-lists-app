<script setup>
import Caret from "./Icon/Caret.vue"

import { ref, computed } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { getLists } from "../api/listService.js";

const isOpen = ref(false);
const saveOpen = ref(false);

const store = useStore();
const router = useRouter();

const allLists = computed(() => {
    return getLists();
});

const getTweets = (users) => {
    store.commit("getUsers", users);
    router.push("/lists");
}

function openItems() {
    isOpen.value == true ? isOpen.value = false : isOpen.value = true;
}

function openSave() {
    saveOpen.value == true ? saveOpen.value = false : saveOpen.value = true;
}
</script>

<template>
    <div class="side-nav">
        <div class="list">
            <ul class="nav-list">
                <li class="nav-items-top-level">
                    <span class="wrap-btn-top-level" @click="openItems()">
                        <span class="nav-items-title">List</span>
                        <button>
                            <span
                                class="nav-items-list"
                                :style="{ transform: isOpen == true ? 'rotate(180deg)' : 'rotate(0)' }"
                            >
                                <Caret />
                            </span>
                        </button>
                    </span>
                    <ul
                        class="nav-list-second-level"
                        :style="{ display: isOpen == true && allLists.flat().length != 0 ? 'block' : 'none' }"
                        v-for="list in allLists.flat()"
                    >
                        <!-- style="color: #1d9bf0" -->
                        <li class="nav-items-second-level">
                            <span @click="getTweets(list.users)">{{ list.name }}</span>
                        </li>
                    </ul>
                </li>
                <li class="nav-items-top-level">
                    <span class="wrap-btn-top-level" @click="openSave()">
                        <span class="nav-items-title">
                            <span>Save</span>
                        </span>
                        <button>
                            <span
                                class="nav-items-save"
                                :style="{ transform: saveOpen == true ? 'rotate(180deg)' : 'rotate(0)' }"
                            >
                                <Caret />
                            </span>
                        </button>
                    </span>
                    <ul
                        class="nav-list-second-level"
                        :style="{ display: saveOpen == true ? 'block' : 'none' }"
                    >
                        <li class="nav-items-second-level">
                            <a href>Sport</a>
                        </li>
                        <li class="nav-items-second-level">
                            <a href>News</a>
                        </li>
                        <li class="nav-items-second-level">
                            <a href>Politic</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.side-nav {
    background: #182430;

    width: 260px;
    height: 100vh;

    padding: 10px 25px 0 35px;
}

.wrap-btn-top-level {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 20px 0;
}

.nav-items-title {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #fff;

    display: flex;
    align-items: center;
}

span {
    cursor: pointer;
}

li {
    list-style: none;

    margin: 20px 0 20px 12px;
}

span {
    text-decoration: none;
    line-height: 16px;
    font-size: 15px;
    word-break: break-word;
    letter-spacing: normal;
    font-weight: normal;
    color: #fff;
}

button {
    outline: none;
    border: none;
    background-color: transparent;
}

.nav-items-list {
    display: inline-block;
}
.nav-items-save {
    display: inline-block;
}
</style>