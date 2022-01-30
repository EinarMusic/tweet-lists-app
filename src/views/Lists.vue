<script setup>
import Tweet from "../components/Tweet.vue";
import { getListTweets } from "../api/tweetService.js";

import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

// let some = ref([]);
// const nose = () => {
//     some.value = getListTweets(store.state.users);
// }
// const algo = setTimeout(nose, 1000);

const tweets = computed(() => {
    return getListTweets(store.state.users);
});

</script>

<template>
    <div class="tweets">
        <div class="tweets-content" v-for="tw in tweets.flat()" :key="tw.id">
            <div
                class="referenced_tweets"
                v-for="referenced_tweets in tw.referenced_tweets"
                :key="referenced_tweets"
            >
                <div class="retweeted">
                    <Tweet :tw="tw" :referenced_tweets="referenced_tweets" />
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
</style>