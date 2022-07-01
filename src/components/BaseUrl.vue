<script setup>
import { ref, computed } from "vue";
import { fetchById } from "../utility/tweetById.js";

const props = defineProps(["urlsID"]);

const bigImg = ref(true);

const { referenced } = fetchById(computed(() => props.urlsID));
</script>

<template>
<div v-for="urls in referenced" :key="urls">
    <div v-if="urls.urls != undefined">
        <div v-if="urls.urls.images != '' && urls.urls.description != undefined">
            <div :class="bigImg == true ? 'wrap-url-img-big' : 'wrap-url'">
                <div :class="bigImg == true ? 'url-img-big' : 'url-img'">
                    <span>
                        <img :src="urls.urls.images" />
                    </span>
                </div>
                <div class="desc-url">
                    <span class="display-url">{{ urls.urls.display_url }}</span>
                    <span class="url-title">{{ urls.urls.title }}</span>
                    <p
                        :class="bigImg == true ? 'description-big-img' : 'description'"
                    >{{ urls.urls.description }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.wrap-url {
    display: inline-flex;
    align-items: center;

    /* width: 510px; */
    width: 30px;

    cursor: pointer;

    border: 1px solid blue;
    /* border: 1px solid rgb(207, 217, 222); */
    border-radius: 16px;
}

.url-img {
    width: 220px;
    height: 126px;

    border-right: 1px solid rgb(207, 217, 222);
}

.url-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.desc-url {
    display: flex;
    flex-direction: column;

    margin: 10px 10px 10px 10px;
}

.display-url,
.description {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}

.description {
    width: 350px;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.url-title {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: 500;

    margin: 1px 0;
}

/*  big img */
.wrap-url-img-big {
    /* width: 510px; */
    width: 100%;
    cursor: pointer;

    border: 1px solid rgb(207, 217, 222);
    border-radius: 16px;
}

.url-img-big {
    /* height: 265px; */

    border-bottom: 1px solid rgb(207, 217, 222);
}

.url-img-big img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.description-big-img {
    /* width: 485px;
    height: 45px; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
