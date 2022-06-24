<script setup>
import Tweet from "../components/Tweet.vue";
import DescribeList from "../components/DescribeList.vue";
import EditList from "../components/EditList.vue";

import { organizeTweetDataOfSelectedUsers } from "../feature/feature.js";
import { userFetch } from "../utility/usersDesc.js"; 

import { computed, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

const { usersDesc } = userFetch(computed(() => store.state.list.users.twOf));

watchEffect(() => {
    store.dispatch("list/getTweetFromTw", store.state.list.users.twOf); 
})

</script>

<template>
    <div class="list">
        <div class="description">
            <div class="wrap-desc">
                <DescribeList :descListAndSave="store.state.list.users" :usersDesc="usersDesc">
                    <EditList /> 
                </DescribeList>
            </div>
        </div>
        <div class="tweets">
            <div
                class="tweets-content"
                v-for="tw in organizeTweetDataOfSelectedUsers(store.state.list.tweets)"
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
}

.description {
    margin-bottom: 50px;
}

.wrap-desc {
    position: fixed;
}
</style>