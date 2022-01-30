<template>
    <div class="dropdown">
        <div class="user-search" v-for="a in [0, 0, 0]" :key="a.id">
            <div class="img-users">
                <img
                    src="https://pbs.twimg.com/profile_images/697361498587451394/_rX0-O0W_normal.png"
                    alt
                />
            </div>
            <div class="desc-users">
                <span class="name">
                    Elon Musk
                    <span class="verified">
                        <Verified width="18" height="18" />
                    </span>
                </span>
                <span class="username">@elonmusk</span>
            </div>
            <div class="add-icon">
                <Add />
            </div>
        </div>
    </div>
</template>

<script setup>
import Verified from "../components/Icon/Verified.vue";
import Add from "../components/Icon/Add.vue"
</script>

<style scoped>
.dropdown {
    width: 320px;

    padding: 5px 0;

    background: white;
    border-radius: 16px;

    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
        rgb(101 119 134 / 15%) 0px 0px 3px 1px;
}
.user-search {
    display: flex;
    align-items: center;

    padding: 10px 15px;
}

.user-search:hover {
    background: rgb(247, 249, 249);
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
</style>