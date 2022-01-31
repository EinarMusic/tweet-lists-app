<script setup>
import Axios from "axios";
import { environment } from "../environments/environments.js";
import Tweet from "../components/Tweet.vue";
import { organizeTweetDataOfSelectedUsers } from "../feature/feature.js";

import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

let tweets = ref([]);

watchEffect(() => {
    tweets.value = [];
    for (const tw of store.state.users.users) {
        Axios.get(`${environment.backend}/api/tweet?myList=${tw}`)
            .then((tweet) => {
                tweets.value.push(tweet.data);
            })
            .catch((e) => console.log(e));
    }
})

</script>

<template>
    <div class="tweets">
        <div
            class="tweets-content"
            v-for="tw in organizeTweetDataOfSelectedUsers(tweets)"
            :key="tw.id"
        >
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