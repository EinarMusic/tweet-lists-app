<script setup>
const props = defineProps(["click"])
</script>

<template>
    <div :style="{ border: props.click == true ? 'none' : '1px solid #ccd6dd' }">
        <svg
            :style="{ border: props.click == true ? 'none' : '' }"
            aria-hidden="true"
            fill="white"
            height="48"
            width="48"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23.517 22.3389L25.5893 24.4111C25.9148 24.7361 25.9148 25.2639 25.5893 25.5889C25.427 25.7522 25.2137 25.8333 25.0004 25.8333C24.787 25.8333 24.5737 25.7522 24.4115 25.5889L22.3393 23.5167C21.5215 24.0989 20.5243 24.4445 19.4448 24.4445C16.6837 24.4445 14.4448 22.2056 14.4448 19.4445C14.4448 16.6833 16.6837 14.4445 19.4448 14.4445C22.2059 14.4445 24.4448 16.6833 24.4448 19.4445C24.4448 20.5233 24.1004 21.5206 23.517 22.3389ZM16.1115 19.4445C16.1115 21.2823 17.607 22.7778 19.4448 22.7778C21.2826 22.7778 22.7781 21.2823 22.7781 19.4445C22.7781 17.6067 21.2826 16.1112 19.4448 16.1112C17.607 16.1112 16.1115 17.6067 16.1115 19.4445Z"
                fill="#1D9BF0"
            />
        </svg>
    </div>
</template>

<style scoped>
div {
    display: inline-block;
    /* border: 1px solid #ccd6dd; */

    width: 50px;
    height: 50px;

    border-radius: 50%;
}
svg:hover {
    border-radius: 50%;
    border: 2px solid #ccd6dd;
}
</style>


