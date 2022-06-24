<script setup>
import Verified from "../components/Icon/Verified.vue";
import Delete from "../components/Icon/Delete.vue";

const emit = defineEmits(["takeToRemove"]);
const props = defineProps(["usersDesc"]);
</script> 

<template>
    <div class="dropdown">
        <div class="user-search" v-for="users in props.usersDesc" :key="users.id">
            <div class="img-users">
                <img :src="users.profile_image_url" alt />
            </div>
            <div class="desc-users">
                <span class="name">
                    {{ users.name }}
                    <span class="verified" v-if="users.verified">
                        <Verified width="18" height="18" />
                    </span>
                </span>
                <span class="username">@{{ users.username }}</span>
            </div>
            <div class="add-icon">
                <div class="delete-icon" @click="emit('takeToRemove', users)">
                    <Delete />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.dropdown {
    width: 100%;

    padding: 0;

    background: white;
}

.user-search {
    display: flex;
    align-items: center;

    padding: 10px 15px;
}

.img-users {
    margin-right: 10px;
}

.img-users img {
    border-radius: 9999px;
}

.desc-users {
    display: flex;
    flex-direction: column;

    flex: 1;
}

.desc-users .name {
    color: rgb(15, 20, 25);
    font-size: 15px;
    font-weight: bold;
}

.desc-users .username {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}

.desc-users .verified {
    margin-top: 10px;
}

.delete-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 35px;
    width: 35px;
    border-radius: 50%;

    cursor: pointer;
}

.delete-icon:hover {
    background: rgba(255, 0, 0, 0.055);
}
</style>