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
    border: {
        type: Boolean,
        default: true
    },
    error: {
        type: String,
        defulat: ""
    },
    modelValue: {
        type: String
    }
})

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="base-input">
        <span class="label">{{ props.label }}</span>
        <div
            class="wrap-input"
            :style="{ height: props.height, border: props.border == true ? '1px solid rgb(207, 217, 222)' : 'none' }"
        >
            <input
                v-model="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                type="text"
                :placeholder="props.placeholder"
            />
            <p class="error">{{ props.error }}</p>
        </div>
    </div>
</template>

<style scoped>
.base-input .label {
    color: rgb(83, 100, 113);
    font-size: 15px;
    font-weight: 500;
}
.wrap-input {
    border-radius: 4px;
    position: relative;
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

    position: absolute;
    top: 26px;
    right: 3px;
}
</style>