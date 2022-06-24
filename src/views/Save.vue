<script setup>
import Tweet from "../components/Tweet.vue";
import DescribeList from "../components/DescribeList.vue";
import EditSave from "../components/EditSave.vue";

import { useStore } from "vuex";

const store = useStore();

</script>

<template>
    <div class="save">
        <div class="description">
            <div class="wrap-desc">
                <DescribeList :descListAndSave="store.state.save.showSaveList">
                    <EditSave />
                </DescribeList>
            </div>
        </div>
        <div v-for="tw in store.state.save.showSaveList.tweets" :key="tw.id">
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
</template>

<style scoped>
.save {
    position: relative;

    display: inline-block;

    border-bottom: 1px solid rgb(207, 217, 222);
}

.wrap-desc {
    position: fixed;
}
</style>