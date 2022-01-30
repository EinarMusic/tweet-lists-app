<script setup>
const props = defineProps({
    label: {
        type: String
    },
    height: {
        type: String,
        default: "40px"
    },
    placeholder: {
        type: String,
        default: ""
    },
    error: {
        type: String,
        defulat: ""
    },
    modelValue: String,
})
</script>

<template>
    <div class="input">
        <span class="label">{{ props.label }}</span>
        <div class="wrap-input" :style="{ height: props.height }">
            <input
                @input="$emit('update:modelValue', $event.target.value)"
                v-bind="$attrs"
                type="text"
                :placeholder="props.placeholder"
            />
            <p class="error">{{ props.error }}</p>
        </div>
    </div>
</template>

<style scoped>
.input .label {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}
.wrap-input {
    border: 1px solid rgb(207, 217, 222);
    border-radius: 4px;
}

.input {
    margin: 5px 0 10px 0;
}

input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;

    padding-left: 10px;
}

::placeholder {
    font-size: 15px;
}

.error {
    color: red;
    font-size: 12px;
    text-align: end;

    margin-top: 2px;
}
</style>