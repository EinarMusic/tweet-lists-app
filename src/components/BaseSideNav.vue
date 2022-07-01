<script setup>
import Caret from "./Icon/Caret.vue"
import Close from "./Icon/Close.vue"

import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const listOpen = ref(true);
const saveOpen = ref(false);

const store = useStore();
const router = useRouter();

const props = defineProps(["mobile"]);
const emit = defineEmits(["mobileDropLists"]);

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
            <div class="close-menu-mobile" v-if="props.mobile">
                <Close @click="emit('mobileDropLists')" />
            </div>
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

    /* width: 270px; */
    width: 100%;
    height: 100vh;

    padding: 10px 0;
}

.wrap-btn-top-level {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0px 30px;
}

.nav-items-title {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #fff;

    display: flex;
    align-items: center;
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

    padding: 0 35px;
}

.close-menu-mobile {
    display:flex;
    align-items:center;
    justify-content:end;

    padding: 20px 25px;

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


</style>