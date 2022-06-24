<script setup>
import Check from "./Icon/Check.vue";
import UsersDropdown from './UsersDropdown.vue';
import BaseInput from "./BaseInput.vue";

import { editList, addUsers, removeUser, removeList } from "../api/listService.js";
import { userFetch } from "../utility/usersDesc.js";
import { validateInputUser } from "../utility/validateUsers.js";

import { ref, computed } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(["clickMenu"]);

const { usersDesc, retry } = userFetch(computed(() => store.state.list.users.twOf));

const dropEdit = ref(false);
const dropAdd = ref(false);
const dropUsers = ref(false);

const list = ref({
    name: "",
    description: "",
    users: "",
});

const descList = computed(() => store.state.list.users.descList.find(data => data))

const usersInputInvalid = ref({});

const updateList = () => {

    let edit = {
        name: list.value.name || descList.value.name,
        description: list.value.description || descList.value.description
    }
    
    editList(store.state.auth.user.email, store.state.list.users.id, descList.value, edit);

    store.commit("list/setUsers", {
        ...store.state.list.users, 
        descList: [
            { description: edit.description, name: edit.name }
        ]
    });

    store.dispatch("list/getListsForNav", store.state.auth.user.email);

    list.value.name = "";
    list.value.description = "";
    
    emit("clickMenu");
}

const updateUsers =  () => {
    const { validate } = validateInputUser(list.value.users);

    if (validate.value.valid == true) {
        store.commit("list/clearToShowNewTweetList");
        
        addUsers(store.state.auth.user.email, validate.value.users, store.state.list.users.id);

        const twOfUpdate = store.state.list.users.twOf.concat(validate.value.users)

        store.dispatch("list/getTweetFromTw", twOfUpdate);
        store.commit("list/setUsers", {...store.state.list.users, twOf: twOfUpdate});

        list.value.users = "";

        emit("clickMenu");
    } else if (validate.value.valid == false) {
        usersInputInvalid.value = validate.value;
    }
}

const userToRemove = ref({});
const takeToRemove = (remove) => userToRemove.value = remove;

const deleteUser = () => { 
    if (userToRemove.value.length != 0) {
        removeUser(store.state.auth.user.email, userToRemove.value, store.state.list.users.id);

        store.dispatch("list/getListsForNav", store.state.auth.user.email);
    }

    userToRemove.value = {};
    emit("clickMenu");
}

const deleteList = () => {
    removeList(store.state.auth.user.email, store.state.list.users.id);
    store.commit("list/clearToShowNewTweetList");
    store.dispatch("list/getListsForNav");
    emit("clickMenu");
}

</script>

<template>
    <div class="user-edit">
        <div class="users-menu drop">
            <div class="input-list">
                <div class="edit-title" @click="dropEdit = !dropEdit">
                    <span>Edit</span>
                    <Check v-if="list.name.length != 0 || list.description.length != 0" @click="updateList" />
                </div>
                <div class="edit-dropdown" v-if="dropEdit">
                    <div class="name">
                        <BaseInput v-model="list.name" :placeholder="descList.name" :border="false" />
                    </div>
                    <div class="description">
                        <BaseInput v-model="list.description"
                            :placeholder="descList.description.length == '' ? 'description' : descList.description"
                            :border="false" />
                    </div>
                </div>
                <div class="add-user">
                    <div class="add-title" @click="dropAdd = !dropAdd">
                        <span>Add </span>
                        <span class="error">{{usersInputInvalid.message}}</span>
                        <Check v-if="list.users.length != 0" @click="updateUsers" />
                    </div>
                    <div class="add-dropdown" v-if="dropAdd">
                        <BaseInput v-model="list.users" placeholder="@jack @elonmusk" :border="false" />
                    </div>
                </div>
            </div>
            <div class="users">
                <div class="users-title" @click="dropUsers = !dropUsers, retry">
                    <span>Users</span>
                    <Check v-if="userToRemove != 0" @click="deleteUser" />
                </div>
                <div class="users-dropdown" v-if="dropUsers">
                    <UsersDropdown @takeToRemove="takeToRemove" :usersDesc="usersDesc" />
                </div>
            </div>
            <div class="delete-list" @click="deleteList">
                <span>Delete</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-edit {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);

    width: 320px;
}

.edit-dropdown,
.add-dropdown {
    padding: 0 15px;
}

.edit-title,
.add-title,
.users-title,
.delete-list {
    padding: 0 20px;

    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
}

.edit-title:hover,
.add-title:hover,
.users-title:hover,
.delete-list:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.name,
.description {
    height: 44px;
}

.users-dropdown {
    overflow: scroll;

    height: 185px;
}

.error {
    color: red;
    font-size: 12px;

    /* position: absolute;
    top: 26px;
    right: 3px; */
}

.delete-list {
    color: red;
    }
</style>