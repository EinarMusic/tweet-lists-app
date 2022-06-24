<script setup>
import Verified from './Icon/Verified.vue';

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
    },
    retweetdBy: {
        type: Object
    }
})

</script>

<template>
    <span class="info">
        <div class="retweet-by-user" v-if="props.retweetedBool">
            <span>{{props.retweetdBy.name}} lo retwitteó</span>
        </div>
        <div class="name-user">
            <span class="name">{{ props.users.name }}</span>
            <span class="verified-icon" v-if="props.users.verified" style="margin-right: 3px;">
                <Verified />
            </span>
            <span class="user-name">@{{ props.users.username }} · 12h</span>
        </div>
    </span>
</template>

<style scoped>
.info {
    display: inline;
    margin-bottom: 1px;
}

.retweet-by-user {
    color: rgb(83, 100, 113);
    font-weight: bold;
    font-size: 14px;
}

.name-user {
    display: inline-flex;
    height: 22px;
}

.name {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: bold;

    margin-right: 4px;
}

.user-name {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}
</style>