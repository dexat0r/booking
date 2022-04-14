<template>
    <Header :withGradient="false"></Header>
    <div class="index-wrap">
        <template v-if="user.role == 0"> 
            <Filters />
        </template>
        <template v-if="user.role == 1">
            <Create />
            <span style="font-weight: 600;">Ваши объявления:</span>
        </template>
        <template v-if="user.role == 2">
            <span style="font-weight: 600;">Все объявления:</span>
        </template>
        <div class="cards-wrap">
            <Card v-for="card in userCards" :title="card.title" :location="card.location" :rate="card.rate" :rooms="card.rooms" class="mb15"/>
        </div>
    </div>
</template>

<style>
.index-wrap {
    margin-top: 30px;
}

.cards-wrap {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script lang="ts" setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { store as _store } from "../stores/store";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import Filters from "@/components/Filters.vue";
import Create from "@/components/Create.vue";

const store = _store();
const router = useRouter();

const user = {
    id: 1,
    role: 1,
};

const userCards = [
    {
        title: '1',
        location: {
            country: '2',
            town: '3'
        },
        rate: 5,
        rooms: 5
    },
    {
        title: '1',
        location: {
            country: '2',
            town: '3'
        },
        rate: 5,
        rooms: 5
    }
]

console.log(store.isLogin);
if (!store.isLogin) {
    router.push("/login");
}
</script>
