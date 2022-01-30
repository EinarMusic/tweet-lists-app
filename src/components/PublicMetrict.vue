<script setup>
import Comments from "./Icon/Comments.vue"
import Retweet from "./Icon/Retweets.vue"
import Like from "./Icon/Like.vue"
import List from "./Icon/List.vue"

const props = defineProps(["public_metrics"])
</script>

<template>
    <div class="metrict">
        <div class="public_metrics">
            <div class="comments-icon">
                <Comments />
                <span>{{ props.public_metrics.reply_count }}</span>
            </div>
            <div class="retweet-icon">
                <Retweet />
                <span>{{ props.public_metrics.retweet_count }}</span>
            </div>
            <div class="like-icon">
                <Like />
                <span>{{ props.public_metrics.like_count }}</span>
            </div>
        </div>
        <div class="created-list">
            <List />
        </div>
    </div>
</template>

<style scoped>
.metrict {
    display: flex;
    justify-content: space-between;
}
.public_metrics {
    display: flex;
    align-items: center;
}

.public_metrics div {
    display: flex;
    align-items: center;

    margin-right: 30px;
}
.public_metrics span {
    color: rgb(83, 100, 113);
    font-size: 13px;
    font-weight: 500;

    margin-left: 10px;
}
</style>