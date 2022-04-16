<template>
    <div class="row">
        <div class="col w15" style="font-weight: 600;">Фильтр:</div>
        <div class="col w85">
            <div class="row mb15">
                <FilterInput
                    :input-value="data.country"
                    :label="`Страна`"
                    :options="countryOptions"
                    @update:input-value="(value) => {data.country = value}"
                />
                <FilterInput
                    :input-value="data.city"
                    :label="`Город`"
                    :options="cityOptions"
                    @update:input-value="(value) => {data.city = value}"
                    class="mla"
                />
            </div>
            <div class="row mb15">
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Комнаты`"
                    :options="roomsOptions"
                    @update:input-value="(value) => {data.rooms = value}"
                />
            </div>
            <div class="row mb15">
                <FilterInput
                    :input-value="data.date_from"
                    :label="`Дата от`"
                    @update:input-value="(value) => {data.date_from = value}"
                    type="date"
                />
                <FilterInput
                    :input-value="data.date_to"
                    :label="`Дата до`"
                    type="date"
                    @update:input-value="(value) => {data.date_to = value}"
                    class="mla"
                />
            </div>
            <div class="row" style="justify-content: flex-end;">
                <Button @click="search()">Поиск</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterInput from "@/components/FilterInput.vue";
import Button from "@/components/Button.vue";
import { store as _store } from "@/stores/store";
import { computed, onBeforeMount } from "vue";

const store = _store();
onBeforeMount( async () => {
    await store.getFilters();
})

const countryOptions = computed(() => store.filters.countryQuery.map((el: any) => {
    return {
        value: el.id,
        label: el.name
    }
}));
const roomsOptions = computed(() => store.filters.roomQuery.map((el: any) => {
    return {
        value: el.bedroom_count,
        label: el.bedroom_count
    }
}));
const cityOptions = computed(() => store.filters.cityQuery.map((el: any) => {
    return {
        value: el.id,
        label: el.name
    }
}));


const data = {
    country: "",
    city: "",
    rooms: "",
    date_from: "",
    date_to: ""
};

const emit = defineEmits(["search"]);

const search = () => {
    emit("search", data);
}

</script>

<style>
.w15 {
    width: 15%;
}
.w85 {
    width: 85%;
}

.mb15 {
    margin-bottom: 15px;
}

.mla{
    margin-left: auto;
}
</style>
