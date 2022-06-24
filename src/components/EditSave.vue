<script setup>
import Check from "./Icon/Check.vue";
import BaseInput from "./BaseInput.vue";

import { editSave, removeSave } from "../api/saveService.js";

import { ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(["clickMenu"]);

const dropEdit = ref(false);
const save = ref({ name: "", description: "" });


const updateSave = () => {
    if (save.value.name.length == 0) save.value.name = store.state.save.showSaveList.name;
    if (save.value.description.length == 0) save.value.description = store.state.save.showSaveList.description;

    /* if change the name will be change the name of the collection. 
    the problem is that only one time i can edit or make ref to the list that I edit. */
    editSave({
        name: save.value.name, description: save.value.description,
        save_name: store.state.save.showSaveList.name
    });

    save.value.name = "";
    save.value.description = "";

    emit("clickMenu");
}

const deleteSave = () => {
    removeSave(store.state.save.showSaveList);
    store.dispatch("save/getSaveForNav");

    emit("clickMenu");
}

</script>

<template>
    <div class="edit-save">
        <div class="users-menu drop">
            <div class="input-list">
                <div class="edit-title" @click="dropEdit = !dropEdit">
                    <span>Edit</span>
                    <Check
                        v-if="save.name.length != 0 || save.description.length != 0"
                        @click="updateSave"
                    />
                </div>
                <div class="edit-dropdown" v-if="dropEdit">
                    <div class="name">
                        <BaseInput
                            v-model="save.name"
                            :placeholder="store.state.save.showSaveList.name"
                            :border="false"
                        />
                    </div>
                    <div class="description">
                        <BaseInput
                            v-model="save.description"
                            :placeholder="store.state.save.showSaveList.description"
                            :border="false"
                        />
                    </div>
                </div>
            </div>
            <div class="delete-save" @click="deleteSave">
                <span>Delete</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-save {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);

    width: 320px;

    cursor: default;
}
.edit-dropdown {
    padding: 0 15px;
}

.edit-title,
.delete-save {
    padding: 0 20px;

    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
}

.edit-title:hover,
.delete-save:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
.name,
.description {
    height: 44px;
}

.delete-save {
    color: red;
}
</style>