<script setup>
import TweetProfileImage from "./TweetProfileImage.vue"
import TweetUserDesc from "./TweetUserDesc.vue"
import BaseUrl from "./BaseUrl.vue"
import BaseImage from "./BaseImage.vue"
import BaseVideo from "./BaseVideo.vue"
import PublicMetric from './PublicMetrict.vue';

import { ref, computed } from "vue";
import { fetchById } from "../utility/tweetById.js";

const props = defineProps(["retweetedID", "tw"]);

const { referenced } = fetchById(computed(() => props.retweetedID));
</script>

<template>
    <div class="retweeted" v-for="retweeted in referenced" :key="retweeted.id">
        <div class="retweeted-left-side" v-if="retweeted.users != undefined">
            <div>
                <TweetProfileImage :users="retweeted.users" :retweetedBool="true" />
            </div>
        </div>
        <div class="retweeted-tweet">
            <div v-if="retweeted.users != undefined">
                <TweetUserDesc :users="retweeted.users" :retweetedBool="true" :retweetdBy="props.tw.users" />
            </div>
            <div class="content" v-if="retweeted.data != undefined">
                <p>{{ retweeted.data.text }}</p>
            </div>
            <div class="url-content" v-if="retweeted.data != undefined">
                <BaseUrl :urlsID="retweeted.data.tweet_id" />
            </div>
            <div class="media" v-if="retweeted.media != '' && retweeted.media != undefined">
                <div class="video-content" v-if="retweeted.media.type == 'video' || retweeted.media.type == 'animated_gif'">
                    <BaseVideo
                        :media="retweeted.media.preview_image_url"
                        borderRadius="16px"
                        top="140px"
                        left="215px"
                        width="100%"
                        height="360px"
                    />
                </div>
                <div class="image-content" v-if="retweeted.media.type == 'photo'">
                    <BaseImage
                        :media="retweeted.media"
                        borderRadius="16px"
                    />
                </div>
            </div>
            <div class="metrict" v-if="retweeted.data != undefined">
                <PublicMetric :public_metrics="retweeted.data.public_metrics" :saveIcon="false" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* retweeted */

.retweeted {
    display: inline-flex;

    padding: 7px 14px 7px 7px;
    width: 100%;
}

.retweeted:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
.retweeted-tweet {
    display: inline;

    width: 100%;

    margin-left: 10px;
}

.content {
    width: 100%;
}

.content p {
    color: rgb(15, 20, 25);
    font-size: 13px;
    font-weight: 500;
}

.url-content {
    margin-top: 10px;
}

</style>