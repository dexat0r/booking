<template>
    <button class="btn">
        <slot />
    </button>
</template>

<style>
    .btn {
        color: black;
        background: #FFF5C0;
        border-radius: 8px;
        padding: 7px 58px;
        outline: 0;
        border: 0;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px;
    }
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonComponent",
});
</script>
