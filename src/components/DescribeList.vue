<template>
    <div class="desc">
        <div class="info-list">
            <div class="title-list">
                <span class="list-name">News</span>
                <span class="count-users">
                    <strong style="font-size: 15px;margin-right:5px">10</strong>
                    <span style="color: rgb(83, 100, 113);">Miembros</span>
                </span>
            </div>
            <div class="desc-list">
                <span>news importantes.</span>
            </div>
        </div>
        <div class="images">
            <div class="image-users-list" v-for="a in [1, 2, 3, 4, 5, 6, 7]" :key="a.id">
                <div class="wrap-img">
                    <img
                        src="https://pbs.twimg.com/profile_images/697361498587451394/_rX0-O0W_normal.png"
                        alt
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.desc {
    display: inline-flex;
    width: 600px;

    margin-bottom: 10px;
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

.title-list .count-users {
    font-size: 12px;
}

.images {
    display: flex;
    margin: 23px 0 0 15px;
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
</style>