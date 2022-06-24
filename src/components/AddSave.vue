<script setup>
import Check from "./Icon/Check.vue";
import BaseInput from "./BaseInput.vue";
import Add from "./Icon/Add.vue";

import { setSaveList, setTweetForSaveList } from "../api/saveService.js";

import { ref, inject } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["dropAdd"]);

const dropEdit = ref(false);
const dropAdd = ref(false);

const save = ref({ name: "", description: "", tweet: [] });

const { tweet, tweetForSave } = inject('save-tweet');

const setSave = () => {

    tweetForSave()

    /* if the tweet is a quoted the field: (in_reply_to_user_id) is undefined. 
    and for firebase is a error. so we need remove this field, because for SaveList not is needed */
    save.value.tweet.push({
        users: tweet.value.users, author_id: tweet.value.author_id,
        media: tweet.value.media, attachments: tweet.value.attachments, created_at: tweet.value.created_at,
        public_metrics: tweet.value.public_metrics, referenced_tweets: tweet.value.referenced_tweets,
        text: tweet.value.text, tweet_id: tweet.value.tweet_id
    });

    setSaveList(save.value, store.state.auth.user.email);

    store.dispatch("save/getSaveForNav")
    emit('dropAdd');
}

let infoToExistintSaveList = ref(null)
const takeTweetAndShowIconEvent = (save) => {
    tweetForSave();

    infoToExistintSaveList.value = { name: save.name, tweet: tweet.value }
}

const setTweetToExistingSaveList = () => {
    if (infoToExistintSaveList.value)
        setTweetForSaveList(infoToExistintSaveList.value);

    emit('dropAdd');
}

</script>

<template>
    <div class="add-save">
        <div class="header">
            <span class="title">Save</span>
        </div>
        <div class="create">
            <div class="create-title" @click="dropEdit = !dropEdit">
                <span>Create</span>
                <Check @click="setSave" v-if="save.name != ''" />
            </div>
            <div class="edit-dropdown" v-if="dropEdit">
                <div class="name">
                    <BaseInput v-model="save.name" placeholder="name" :border="false" />
                </div>
                <div class="description">
                    <BaseInput v-model="save.description" placeholder="describe what it is about" :border="false" />
                </div>
            </div>
        </div>
        <div class="add">
            <div class="add-title" @click="dropAdd = !dropAdd">
                <span>Add</span>
                <Check v-if="infoToExistintSaveList" @click="setTweetToExistingSaveList" />
            </div>
            <div class="add-dropdown" v-if="dropAdd" v-for="save in store.state.save.savelistForNavSide">
                <span @click="takeTweetAndShowIconEvent(save)">{{ save.name }}</span>
                <div class="add-icon">
                    <Add />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-save {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);

    width: 320px;

    cursor: default;

    z-index: 9999;
}

.header {
    margin: 10px 0 10px 20px;
}

.title {
    font-weight: bold;
    font-size: 20px;
    color: #182430;
}

.edit-dropdown {
    padding-left: 20px;
}

.create-title,
.add-title {
    padding: 0 30px;

    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
}

.create-title:hover,
.add-title:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.name,
.description {
    height: 44px;
}

.add-dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;

    overflow: scroll;
    padding: 5px 20px 5px 30px;

    cursor: default;

    font-weight: 500;
    color: #182430;
}

.add-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 30px;
    width: 30px;
    border-radius: 50%;

    cursor: pointer;
}

.add-icon:hover {
    background: #19cf8613;
}
</style>