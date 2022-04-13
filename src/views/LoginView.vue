<template>
    <div class="login-wrap">
        <Header :withGradient="true" />
        <Form :type="'login'" class="login-form"></Form>
    </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Form from "@/components/Form.vue";
</script>

<style>
.login-form {
    margin: 0 auto;
    justify-self: center;
    align-self: center;
}
</style>
