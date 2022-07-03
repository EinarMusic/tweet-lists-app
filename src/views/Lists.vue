<script setup>
import Tweet from "../components/Tweet.vue";
import DescribeList from "../components/DescribeList.vue";
import EditList from "../components/EditList.vue";

import { organizeTweetDataOfSelectedUsers } from "../feature/feature.js";
import { userFetch } from "../utility/usersDesc.js"; 

import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useMediaQuery } from '@vueuse/core';

import api from "../data/testApi.js";
const testApi = ref(api);

const store = useStore();

const { usersDesc } = userFetch(computed(() => store.state.list.users.twOf));

const isSmallScreen = useMediaQuery('(min-width: 700px)');

const dropEdit = ref(false);

watchEffect(() => {
    store.dispatch("list/getTweetFromTw", store.state.list.users.twOf); 
})

</script>

<template>
    <div class="list" :style="{width: !isSmallScreen ? '100vw' : '100%'}">
        <div class="description">
            <div class="wrap-desc"> 
                <DescribeList :descListAndSave="store.state.list.users" :usersDesc="usersDesc" :mobile="!isSmallScreen" @dropEdit="dropEdit = !dropEdit"> 
                    <div v-if="dropEdit">
                        <EditList @dropEdit="dropEdit = !dropEdit" /> 
                    </div>
                </DescribeList>
            </div>
        </div>
        <div class="tweets">
            <!-- v-for="tw in organizeTweetDataOfSelectedUsers(store.state.list.tweets)" -->
            <div
                class="tweets-content"
                v-for="tw in organizeTweetDataOfSelectedUsers([testApi])"
                :key="tw.id"
            >
                <div
                    class="referenced_tweets"
                    v-for="referenced_tweets in tw.referenced_tweets"
                    :key="referenced_tweets"
                >
                    <div>
                        <Tweet :tw="tw" :referenced_tweets="referenced_tweets" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list {
    position: relative;

    display: inline-block;

    border-bottom: 1px solid rgb(207, 217, 222);

    /* desktop */
    /* width: 600px; */

    /* mobile */
    /* width: 100vw; */
    
}

.tweets {
    margin-top: 68px;
}

.wrap-desc {
    position: fixed;
    min-width: 600px;

    /* width: 100%; */

    z-index: 1;
}
</style>