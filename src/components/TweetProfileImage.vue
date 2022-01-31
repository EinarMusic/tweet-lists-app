<script setup>
import RetweetBy from './Icon/RetweetBy.vue';

const props = defineProps({
    replied: {
        type: Boolean,
        default: false
    },
    users: {
        type: [Object]
    },
    retweetedBool: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <div class="info-user-header">
        <div class="img-user-and-icon-retweetby">
            <div class="retweetby-icon" v-if="props.retweetedBool">
                <RetweetBy />
            </div>
            <img :src="props.users.profile_image_url" alt />
        </div>
    </div>
</template>

<style scoped>
.info-user-header {
    display: flex;
    flex-direction: column;

    height: 100%;
}
.img-user-and-icon-retweetby .retweetby-icon {
    text-align: end;
    margin-top: 2px;
}
.img-user-and-icon-retweetby img {
    border-radius: 9999px;
    border: 3px solid white;
}
</style>