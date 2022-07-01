<script setup>
import Verified from './Icon/Verified.vue';
import BaseImage from './BaseImage.vue';
import BaseVideo from "./BaseVideo.vue"
import BaseUrl from "./BaseUrl.vue"

import { ref, computed } from "vue";
import { fetchById } from "../utility/tweetById.js";

const props = defineProps(["quotedID"])

const { referenced } = fetchById(computed(() => props.quotedID));
</script>

<template>
<div v-for="quoted in referenced" :key="quoted.id">
    <div class="quotes" v-if="quoted != undefined" >
        <div class="user-desc" v-if="quoted.users != undefined">
            <div class="user-img">
                <img :src="quoted.users.profile_image_url" alt />
            </div>
            <div class="user-names">
                <span class="name">{{ quoted.users.name }}</span>
                <span class="icon-verified" v-if="quoted.users.verified">
                    <Verified height="18" width="18" />
                </span>
                <span class="username">@{{ quoted.users.username }} · {{ quoted.data.created_at }}.</span>
            </div>
        </div>
        <div class="content">
            <div class="text" v-if="quoted.data != undefined && quoted.data.text != ''">
                <p>{{ quoted.data.text }}</p>
            </div>
            <div class="content-url" v-if="quoted.data != undefined">
                <BaseUrl :urlsID="quoted.data.tweet_id" />
            </div>
            <div class="media" v-if="quoted.media != undefined">
                <div class="content-img" v-if="quoted.media.type == 'photo'">
                    <BaseImage :media="quoted.media" />
                </div>
                <div class="content-video" v-if="quoted.media.type == 'video' || quoted.media.type == 'animated_gif'">
                    <BaseVideo :media="quoted.media.preview_image_url" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style scoped>
.quotes {

    margin: 12px 0 5px 0;

    cursor: pointer;

    border: 1px solid rgb(207, 217, 222);
    border-radius: 16px;
}

.content {
    display: inline-flex;
    flex-direction: column;
}
.user-desc {
    display: inline-flex;
    align-items: center;

    padding: 9px 9px 0 9px;
}

.user-img {
    width: 20px;
    height: 20px;

    margin-right: 3px;
}
.user-img img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

.user-names {
    display: flex;
    align-items: center;
}

.user-names .name {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: bold;
}
.user-names .username {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}

.icon-verified {
    margin-top: 4px;
}

.user-img,
.name,
.icon-verified,
.username {
    margin-right: 3px;
}

.content .text {
    padding: 0 9px 9px 9px;

    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 500;
}
</style>