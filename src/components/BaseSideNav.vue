<script setup>
import Caret from "./Icon/Caret.vue"

import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import firebase from "firebase/compat/app";

const listOpen = ref(true);
const saveOpen = ref(false);

const store = useStore();
const router = useRouter();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch("list/getListsForNav", user.email);
        store.commit("auth/userInfo", user)
        //store.dispatch("save/getSaveForNav");
    }
})

const getTweets = (tw) => {
    store.commit("list/clearToShowNewTweetList");
    store.commit("list/setUsers", tw); 

    router.push("/lists");
}

const getSaveList = () => {
    store.dispatch("save/getSpecificSave", store.state.auth.user.email);

    router.push("/save");
}

</script>

<template>
    <div class="side-nav">
        <div class="list">
            <ul class="nav-list">
                <li class="nav-items-top-level">
                    <span class="wrap-btn-top-level" @click="listOpen = !listOpen">
                        <span class="nav-items-title">List</span>
                        <button>
                            <span
                                class="nav-items-list"
                                :style="{ transform: listOpen == true ? 'rotate(180deg)' : 'rotate(0)' }"
                            >
                                <Caret />
                            </span>
                        </button>
                    </span>
                    <ul
                        class="nav-list-second-level"
                        :style="{ display: listOpen == true ? 'block' : 'none' }"
                        v-for="list in store.state.list.listsForNav"
                    >
                        <!-- style="color: #1d9bf0" -->
                        <li class="nav-items-first-level" v-for="desc in list.descList">
                            <span @click="getTweets(list)">{{ desc.name }}</span>
                        </li>
                    </ul>
                </li>
                <li class="nav-items-top-level">
                    <span class="wrap-btn-top-level" @click="saveOpen = !saveOpen">
                        <span class="nav-items-title">Save</span>
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
                        v-for="save in store.state.save.savelistForNavSide"
                    >
                        <li class="nav-items-second-level">
                            <span @click="getSaveList">{{ save.name }}</span>
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

    width: 270px;
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

.nav-items-list,
.nav-items-save {
    display: inline-block;

    font-weight: 550;
}

.nav-items-first-level,
.nav-items-second-level {
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;

    width: 170px;
    overflow: hidden;
}
</style>