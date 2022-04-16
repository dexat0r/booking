<script setup lang="ts">
import {  RouterView  } from "vue-router";
import { store as _store } from "./stores/store";

const store = _store();

if (localStorage.getItem("login") == 'true') {
    store.isLogin = true;
}


</script>

<template>
    <main class="main-wrap">
        <RouterView />
    </main>
</template>

<style>
@import "@/assets/base.css";

.main-wrap {
    width: 80%;
    margin: 0 auto;
    padding: 0 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
