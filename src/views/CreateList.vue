<script setup>
import BaseInput from "../components/BaseInput.vue"
import BaseButton from "../components/BaseButton.vue"
import Close from "../components/Icon/Close.vue"

import { reactive, ref } from "vue"
import { useStore } from "vuex";
import { createNewList } from "../api/listService.js"

const emptyFieldName = ref("");
const usersFieldError = ref("");

const createList = reactive({ name: "", description: "", users: "" });

const emit = defineEmits(["clickCreate"]);

const setNewList = () => {

    const usersFieldOk = createList.users.split("").some(e => e == "@");

    if (createList.name == "") emptyFieldName.value = "this field is not optional";

    if (createList.users != "" && !usersFieldOk) usersFieldError.value = "the @ is not optional";
    if (createList.users == "") usersFieldError.value = "this field is not optional";

    if (createList.name != "" && usersFieldOk && createList.users != "") {

        createList.users = createList.users.split(" ");

        const usersOk = [];
        createList.users.forEach((e) => {
            usersOk.push(
                e.split("").splice(1).join("")
            );
        })

        createList.users = usersOk;

        createNewList(createList);

        emit("clickCreate");

        createList.name = "";
        createList.description = "";
        createList.users = "";

    }
};

const close = () => {

    emptyFieldName.value = "";
    usersFieldError.value = "";

    emit("clickCreate");

    createList.name = "";
    createList.description = "";
    createList.users = "";

};

</script> 

<template>
    <div class="wrap-all">
        <div class="create">
            <div class="header">
                <span class="icon">
                    <Close @click="close()" />
                </span>
                <span class="title">Create a new List</span>
                <span>
                    <BaseButton @click="setNewList()" />
                </span>
            </div>
            <div class="content">
                <div class="title-input">
                    <BaseInput v-model="createList.name" label="Name" :error="emptyFieldName" />
                </div>
                <div class="desc-input">
                    <BaseInput v-model="createList.description" label="Description" height="70px" />
                </div>
                <div class="users-input">
                    <BaseInput
                        v-model="createList.users"
                        label="Users"
                        placeholder="@elonmusk @jack @BrendanEich"
                        :error="usersFieldError"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.create {
    border-radius: 12px;

    background: white;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
        rgb(101 119 134 / 15%) 0px 0px 3px 1px;

    width: 500px;
    height: 370px;
}

.header {
    display: flex;
    align-items: center;

    padding: 15px;
}

.icon {
    margin-right: 25px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.icon:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
.title {
    flex: 1;

    letter-spacing: 0;
    line-height: 18px;
    font-weight: bold;
    font-size: 24px;
    color: #14171a;
}

.content {
    display: flex;
    flex-direction: column;

    padding: 15px;
}
</style>

