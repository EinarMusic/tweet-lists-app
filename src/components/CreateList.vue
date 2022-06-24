<script setup>
import BaseInput from "./BaseInput.vue";
import Check from "./Icon/Check.vue";

import Axios from "axios";
import { setList } from "../api/listService.js";

import { validateInputUser } from "../utility/validateUsers.js"; 

import { ref, reactive } from "vue";
import { useStore } from "vuex";

const createList = ref({ name: "", description: "", users: "" });

const emit = defineEmits(["dropCreate"]);
const store = useStore();

const dropName = ref(false);
const dropDesc = ref(false);
const dropUsers = ref(false);

const usersInputInvalid = ref({});
const emptyInputName = ref("");

const setNewList = () => {
    if (createList.value.name.length == 0) emptyInputName.value = "this field is not optional";

    if (createList.value.name.length != 0) {
        const { validate } = validateInputUser(createList.value.users);

        if (validate.value.valid == true) {
            createList.value.users = validate.value.users;

            setList(createList.value, store.state.auth.user.email);

            store.dispatch("list/getListsForNav", store.state.auth.user.email);

            emit("dropCreate");
        } else if (validate.value.valid == false) {
            usersInputInvalid.value = validate.value.message;
        }
    }
};

</script> 

<template>
    <div class="wrap-all">
        <div class="create">
            <div class="header">
                <span class="title">List</span>
                <span v-if="createList.users.length != 0">
                    <Check @click="setNewList()" />
                </span>
            </div>
            <div class="content">
                <div class="title-content">
                    <div class="label-title" @click="dropName = !dropName">
                        <span>Name</span>
                    </div>
                    <div class="title-input" v-if="dropName">
                        <BaseInput v-model="createList.name" placeholder="Name your list" :error="emptyInputName"
                            :border="false" />
                    </div>
                </div>
                <div class="desc">
                    <div class="label-desc" @click="dropDesc = !dropDesc">
                        <span>Description</span>
                    </div>
                    <div class="desc-input" v-if="dropDesc">
                        <BaseInput v-model="createList.description" placeholder="describe what it is about"
                            :border="false" />
                    </div>
                </div>
                <div class="users">
                    <div class="label-users" @click="dropUsers = !dropUsers">
                        <span>Users</span>
                        <!-- <span class="user-error" v-if="!messageApiError">user not found</span> -->
                    </div>
                    <div class="users-input" v-if="dropUsers">
                        <BaseInput v-model="createList.users" placeholder="@elonmusk @BrendanEich"
                          :error="usersInputInvalid.message" :border="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.create {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);

    width: 320px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px 10px 20px;
}

.title {
    font-weight: bold;
    font-size: 20px;
    color: #182430;
}

.content {
    display: flex;
    flex-direction: column;
}

.label-title,
.label-desc,
.label-users {
    padding: 0 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 44px;
    cursor: pointer;
}

.label-title:hover,
.label-desc:hover,
.label-users:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.title-input,
.desc-input,
.users-input {
    padding-left: 30px;

    height: 44px;
}

.user-error {
    color: red;
    font-size: 12px;
}
</style>

