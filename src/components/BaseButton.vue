<template>
    <div class="btn">
        <button>
            <span>Save</span>
        </button>
    </div>
</template>

<style scoped>
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    background: black;
    border-radius: 32px;
}

.btn span {
    color: white;
    font-size: 15px;
    font-weight: 700;
}

button {
    outline: none;
    border: none;
    background-color: transparent;

    padding: 5px 25px;
    cursor: pointer;
}
</style>