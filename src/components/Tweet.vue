<script setup>
import TweetUserDesc from "./TweetUserDesc.vue";
import BaseUrl from "./BaseUrl.vue";
import BaseQuoted from "./Quoted.vue";
import BaseImage from "./BaseImage.vue";
import BaseVideo from "./BaseVideo.vue";
//
import TweetProfileImage from "./TweetProfileImage.vue";
import Retweeted from "./Retweeted.vue";
import RepliedTo from "./RepliedTo.vue";
import PublicMetric from './PublicMetrict.vue';
//
import AddSave from "./AddSave.vue";

import { ref, provide } from "vue";

const props = defineProps(["tw", "referenced_tweets"]);

const dropAdd = ref(false);

const tweet = ref([])

const tweetForSave = () => tweet.value = props.tw; 

provide("save-tweet", {
    tweet,
    tweetForSave
})

</script>

<template>
    <div class="lists">
        <div class="tweet-type" v-if="props.referenced_tweets.type == 'retweeted'">
            <div class="retweeted">
                <Retweeted :retweetedID="props.referenced_tweets.id" :tw="tw" /> 
            </div>
        </div>
        <div class="tweet-type" v-else-if="props.referenced_tweets.type != 'retweeted'">
            <div v-if="props.referenced_tweets.type == 'replied_to'">
                <div class="replied">
                    <RepliedTo :repliedID="props.referenced_tweets.id" />
                </div>
            </div>
            <div class="list-content">
                <div class="left-side">
                    <TweetProfileImage :users="props.tw.users" />
                </div>
                <div class="tweets">
                    <TweetUserDesc :users="props.tw.users" />
                    <div class="content" v-if="props.tw.text.length != 0">
                        <p>{{ props.tw.text }}</p>
                    </div>
                    <div class="quotes" v-if="props.referenced_tweets.type == 'quoted'">
                        <BaseQuoted :quotedID="props.referenced_tweets.id" />
                    </div>
                    <div class="url-content" v-if="props.referenced_tweets.type == 'normal'">
                        <BaseUrl :urlsID="props.tw.tweet_id" />
                    </div>
                    <!-- BaseImage funciona -->
                    <div v-if="props.tw.attachments != undefined && props.tw.media != undefined">
                        <div class="image-content" v-if="props.tw.media.type == 'photo'">
                            <BaseImage
                                :media="props.tw.media"
                                borderRadius="16px"
                                width="510px"
                                height="360px"
                            />
                        </div>
                        <div class="video-content" v-else-if="props.tw.media.type == 'video'">
                            <BaseVideo
                                :media="props.tw.media.preview_image_url"
                                borderRadius="16px"
                                width="510px"
                                height="360px"
                                top="140px"
                                left="215px"
                            />
                        </div>
                        <div
                            class="video-content"
                            v-else-if="props.tw.media.type == 'animated_gif'"
                        >
                            <BaseVideo
                                :media="props.tw.media.preview_image_url"
                                :gif="true"
                                borderRadius="16px"
                                width="510px"
                                height="360px"
                                top="140px"
                                left="215px"
                            />
                        </div>
                    </div>
                    <!-- BaseUrl funciona -->
                    <div class="metrict">
                        <PublicMetric
                            :public_metrics="props.tw.public_metrics"
                            v-on:dropAdd="dropAdd = !dropAdd"
                        />
                        <div class="save-dropdown">
                            <AddSave v-if="dropAdd" v-on:dropAdd="dropAdd = !dropAdd" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.lists {
    display: inline-block;

    width: 600px;

    cursor: pointer;

    border-top: 1px solid rgb(207, 217, 222);
    border-left: 1px solid rgb(207, 217, 222);
    border-right: 1px solid rgb(207, 217, 222);
}

.list-content {
    display: flex;
    padding: 12px 17px 3px 10px;
}
.list-content:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.tweets {
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

.save-dropdown {
    position: absolute;
    right: 0;
}
</style>