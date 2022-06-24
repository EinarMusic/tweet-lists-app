<script setup>

const props = defineProps({
    media: {
        type: String
    },
    width: {
        type: String,
        default: "100%"
    },
    height: {
        type: String,
        default: "100%"
    },
    borderRadius: {
        type: String,
        default: "0 0 16px 16px"
    },
    top: {
        type: String,
        default: "110px"
    },
    left: {
        type: String,
        default: "215px"
    },
    gif: {
        type: Boolean,
        default: false
    }
})

</script>
        
<template>
    <div class="video">
        <div class="content-video" :style="{ width: props.width, height: props.height }">
            <img
                class="img"
                :style="{ 'border-radius': props.borderRadius }"
                :src="props.media"
                alt
            />
            <div class="btn-play" :style="{ top: props.top, left: props.left }">
                <img class="play" v-if="!props.gif" src="../assets/play-video.png" alt />
            </div>
        </div>
    </div>
</template>


<style scoped>
.video {
    margin-top: 16px;
}

.content-video {
    position: relative;
}

.content-video .img {
    width: 100%;
    height: 100%;

    border-radius: 16px;
    object-fit: cover;
}

.content-video .btn-play {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    position: absolute;
}

.content-video .play {
    width: 100%;
    height: 100%;
}
</style>