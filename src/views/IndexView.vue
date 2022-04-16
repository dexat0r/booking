<template>
    <Header :withGradient="false"></Header>
    <div class="index-wrap">
        <template v-if="user.role == 0"> 
            <Filters @search="search"/>
        </template>
        <template v-if="user.role == 1">
            <Create />
            <span style="font-weight: 600;">Ваши объявления:</span>
        </template>
        <template v-if="user.role == 2">
            <span style="font-weight: 600;">Все объявления:</span>
        </template>
        <div class="cards-wrap" v-if="!isSearch">
            <Card v-for="card in cards" :title="card.title" :location="card.location" :amenities="card.amenities" :rooms="card.rooms" :watches="card.watches" class="mb15"/>
        </div>
        <div class="search" v-if="isSearch">
            <Card v-for="card in getSearchCards()" :title="card.title" :location="card.location" :amenities="card.amenities" :rooms="card.rooms" :watches="card.watches" class="mb15"/>
        </div>
    </div>
</template>

<style>
.index-wrap {
    margin-top: 30px;
    max-width: 1200px;
    margin: 30px auto;
}

.cards-wrap, .search {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { store as _store } from "../stores/store";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import Filters from "@/components/Filters.vue";
import Create from "@/components/Create.vue";
import { computed, onBeforeMount, reactive, ref } from "vue";

const store = _store();
const router = useRouter();
store.getLogin();
const user = store.user;

onBeforeMount(async () => await store.getPosts());

const cards = computed(() => store.posts.map((el:any, index) => {
    return {
        title: el.name,
        location: {
            country: el.id_country,
            town: el.id_city
        },
        rooms: el.bedroom_count,
        amenities: el.amenity,
        booking: el.booking,
        watches: el.watches
    }
}))

interface FilterData {
    country: string;
    city: string;
    rooms: string;
    date_from: string;
    date_to: string;
}

let isSearch = ref(false);
let searchData: FilterData = {
    country: '',
    city: '',
    rooms: '',
    date_from: '',
    date_to: ''
};

const getSearchCards = () => {
    let searchCards = cards.value.filter((value, index, array) => {
        const isBooked = value.booking.filter((_value) => {
            return( _value.date_start > searchData.date_to && _value.date_end < searchData.date_from) || (searchData.date_from > _value.date_end && searchData.date_to < _value.date_from);
        });
        return searchData.country == value.location.country && searchData.city == value.location.town && searchData.rooms == value.rooms && !isBooked.length
    });
    isSearch.value = true;
    return searchCards;
}

const search = (data:FilterData) => {
    isSearch.value = true;
    searchData = data;
}

if (!store.isLogin) {
    router.push("/login");
}

</script>
