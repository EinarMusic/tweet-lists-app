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
                <div class="video-content" v-if="retweeted.media.type == 'video'">
                    <BaseVideo
                        :media="retweeted.media.preview_image_url"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
                        top="140px"
                        left="215px"
                    />
                </div>
                <div class="video-content" v-if="retweeted.media.type == 'animated_gif'">
                    <BaseVideo
                        :media="retweeted.media.preview_image_url"
                        :gif="true"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
                        top="140px"
                        left="215px"
                    />
                </div>
                <div class="image-content" v-if="retweeted.media.type == 'photo'">
                    <BaseImage
                        :media="retweeted.media"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
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
    display: flex;

    padding: 12px 17px 3px 10px;
}

.retweeted:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
.retweeted-tweet {
    display: flex;
    flex-direction: column;

    margin-left: 10px;
}

.content p {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 500;
}

.url-content {
    margin-top: 10px;
}

.metrict {
    width: 500px;
}
</style>