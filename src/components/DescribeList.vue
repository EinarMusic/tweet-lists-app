<script setup>
import Menu from "../components/Icon/Menu.vue"

import { ref, computed} from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps(["descListAndSave", "usersDesc", "mobile"]);
const emit = defineEmits(["dropEdit"]);

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
    <!-- #182430 - #14171a -->
    <div class="desc" :style="{
        'background-color': props.mobile ? '#182430' : 'white', 
        'justify-content': props.mobile ? 'space-between' : 'none',
        width: props.mobile ? '100vw' : '100%'
    }">
        <div class="info-list" v-for="desc in descList">
            <div class="title-list">
                <span class="list-name" :style="{color: props.mobile ? 'white' : 'color: #14171a;'}" >{{ desc.name }}</span>
                <!---->
                <span v-if="route.path != '/save'">
                    <!---->
                    <span class="count-users" :style="{color: props.mobile ? 'white' : 'black'}">
                        {{ desc.countUser }}
                        <!---->
                    </span>
                    <!---->
                    <span class="count-title" :style="{color: props.mobile ? '#b6c4ce' : 'rgb(83, 100, 113)'}">Miembros</span>
                    <!---->
                </span>
                <!---->
            </div>
            <div class="desc-list" :style="{color: props.mobile ? '#b6c4ce' : 'rgb(83, 100, 113)'}">
                <span>{{ desc.description }}</span>
            </div>
        </div>
        <div class="images" v-if=!props.mobile>
            <!-- props.descListAndSave.userListDesc" -->
            <div v-if="route.path != '/save'" class="image-users-list" v-for="imageUser in props.usersDesc">
                <div class="wrap-img">
                    <img :src="imageUser.profile_image_url" alt />
                </div>
            </div>
        </div>
        <div class="menu" @click="emit('dropEdit')">
            <Menu :mobile="props.mobile" />
        </div>
        <div class="drop-menu" :style="{ right: props.mobile ? '220px' : '1px'}">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.desc {
    display: flex;
    /* justify-content: space-between;
    width: 100vw; */

    /* width: 600px; */

    /* background: white; */

    padding: 10px 14px 10px 14px;

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

    margin-right: 10px;
}

.count-users {
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
}

.desc-list {
    /* width: 380px; */

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
    top: 60px;
    /* right: 150px; */
}
</style>