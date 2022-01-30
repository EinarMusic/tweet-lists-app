        <script setup>
// si son mas de una imagen?.

// si es un quotes solo tendra border-radius debajo.
// si es otro tipo de tweet tendra border-radius en todas las esquinas.

const props = defineProps({
    media: {
        type: [Object]
    },
    borderRadius: {
        type: String,
        default: "0 0 16px 16px"
    },
})
</script>

<template>
    <div class="image">
        <div class="content-img" v-if="props.media.type == 'photo'">
            <img :style="{ 'border-radius': props.borderRadius }" :src="props.media.url" alt />
            <!-- https://pbs.twimg.com/media/FJa55K1WYAU36gU?format=jpg&name=small -->
        </div>
    </div>
</template>


<style scoped>
.content-img img {
    border: 1px solid rgb(207, 217, 222);

    width: 100%;
    height: 100%;
}
</style>