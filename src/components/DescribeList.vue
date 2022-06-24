<script setup>
import Menu from "../components/Icon/Menu.vue"

import { ref, computed} from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps(["descListAndSave", "usersDesc"]);

const clickMenuDropdown = ref(false);

const descList = computed(() => {
    return props.descListAndSave.descList.map((data) => {
        return {
            name: data.name,
            description: data.description,
            countUser: props.descListAndSave.twOf.length
        }
    })
})


</script>

<template>
    <div class="desc">
        <div class="info-list" v-for="desc in descList">
            <div class="title-list">
                <span class="list-name" >{{ desc.name }} </span>
                <!---->
                <span v-if="route.path != '/save'">
                    <!---->
                    <span class="count-users">
                        {{ desc.countUser }}
                        <!---->
                    </span>
                    <!---->
                    <span class="count-title">Miembros</span>
                    <!---->
                </span>
                <!---->
            </div>
            <div class="desc-list">
                <span>{{ desc.description }}</span>
            </div>
        </div>
        <div class="images">
            <!-- props.descListAndSave.userListDesc" -->
            <div v-if="route.path != '/save'" class="image-users-list" v-for="imageUser in props.usersDesc">
                <div class="wrap-img">
                    <img :src="imageUser.profile_image_url" alt />
                </div>
            </div>
        </div>
        <div class="menu" @click="clickMenuDropdown = !clickMenuDropdown">
            <Menu />
        </div>
        <div class="drop-menu" :style="{ display: clickMenuDropdown ? 'block' : 'none' }">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.desc {
    display: inline-flex;
    width: 600px;
    background: white;
}

.title-list {
    display: inline-flex;

    justify-content: space-between;
    min-width: 150px;
    align-items: center;
}

.title-list .list-name {
    letter-spacing: 0;
    line-height: 24px;
    font-weight: bold;
    font-size: 20px;
    color: #14171a;

    margin-right: 10px;
}

.count-users {
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
}

.count-title {
    color: rgb(83, 100, 113);
}

.desc-list {
    width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.images {
    display: flex;
    margin: 23px 0 0 15px;

    flex: 1;
}

.image-users-list {
    display: flex;
    align-items: center;
    position: relative;
}

.wrap-img {
    width: 10px;
    height: 10px;

    display: flex;

    margin-right: 10px;
}

.wrap-img img {
    display: inline-block;

    position: absolute;
    top: -10px;

    width: 30px;

    border-radius: 50%;
}

.menu {
    padding-top: 5px;
    position: relative;
}

.drop-menu {
    position: absolute;
    top: 50px;
    right: 1px;
}
</style>