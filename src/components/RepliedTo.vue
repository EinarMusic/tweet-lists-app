<script setup>
import TweetProfileImage from "./TweetProfileImage.vue"
import TweetUserDesc from "./TweetUserDesc.vue"
import BaseUrl from "./BaseUrl.vue"
import BaseImage from "./BaseImage.vue"
import BaseVideo from "./BaseVideo.vue"
import PublicMetric from './PublicMetrict.vue';

import { ref, computed } from "vue";
import { fetchById } from "../utility/tweetById.js";

const props = defineProps(["repliedID"]);

const { referenced } = fetchById(computed(() => props.repliedID));
</script>

<template>
    <div class="replied" v-for="replied in referenced" :key="replied.id">
        <div class="replied-left-side" v-if="replied.users != undefined">
            <div>
                <TweetProfileImage :users="replied.users" :replied="true" />
            </div>
            <div class="side-bar-replied">
                <span></span>
            </div>
        </div>
        <div class="replied-tweet">
            <div v-if="replied.users != undefined">
                <TweetUserDesc :users="replied.users" />
            </div>
            <div class="content" v-if="replied.data != undefined">
               <p>{{ replied.data.text }}</p>
            </div>
            <div class="url-content" v-if="replied.data != undefined">
                <BaseUrl :urlsID="replied.data.tweet_id" />
            </div>
            <div class="media" v-if="replied.media != '' && replied.media != undefined">
                <div class="video-content" v-if="replied.media.type == 'video'">
                    <BaseVideo
                        :media="replied.media.preview_image_url"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
                        top="140px"
                        left="215px"
                    />
                </div>
                <div class="video-content" v-if="replied.media.type == 'animated_gif'">
                    <BaseVideo
                        :media="replied.media.preview_image_url"
                        :gif="true"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
                        top="140px"
                        left="215px"
                    />
                </div>
                <div class="image-content" v-if="replied.media.type == 'photo'">
                    <BaseImage
                        :media="replied.media"
                        borderRadius="16px"
                        width="510px"
                        height="360px"
                    />
                </div>
            </div>
            <div class="metrict" v-if="replied.data != undefined">
                <PublicMetric :public_metrics="replied.data.public_metrics" :saveIcon="false" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* replied */

.replied {
    display: flex;

    padding: 12px 17px 3px 10px;
}

.replied:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
.replied-tweet {
    display: inline-flex;
    flex-direction: column;

    margin-left: 10px;
}
.side-bar-replied {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
}
.side-bar-replied span {
    display: inline-block;

    border: 1px solid rgb(207, 217, 222);
    text-align: end;
}

.content p {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 500;
}

.url-content {
    margin-top: 10px;
}

.media {
    z-index: -1;
}

</style>