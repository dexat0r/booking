<template>
    <div class="row">
        <div class="col w15" style="font-weight: 600">Создать:</div>
        <div class="col w85">
            <div class="row mb15">
                <FilterInput
                    :input-value="data.country"
                    :label="`Страна`"
                    :options="countryOptions"
                    @update:input-value="
                        (value) => {
                            data.country = value;
                        }
                    "
                />
                <FilterInput
                    :input-value="data.city"
                    :label="`Город`"
                    :options="cityOptions"
                    @update:input-value="
                        (value) => {
                            data.city = value;
                        }
                    "
                    class="mla"
                />
            </div>
            <div class="row mb15">
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Комнаты`"
                    type="number"
                    :min="1"
                />
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Рейтинг`"
                    type="text"
                    class="mla"
                />
            </div>
            <div class="row mb15">
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Стоимость`"
                    type="number"
                    :min="0"
                />
            </div>
            <div class="row" style="justify-content: flex-end">
                <Button>Создать</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterInput from "@/components/FilterInput.vue";
import Button from "@/components/Button.vue";
import { computed, onBeforeMount } from "vue";
import { store as _store } from "@/stores/store";

const store = _store();
onBeforeMount(async () => { 
    await store.getFilters();
});
const countryOptions = computed(() =>
    store.filters.countryQuery.map((el: any) => {
        return {
            value: el.id,
            label: el.name,
        };
    })
);
const cityOptions = computed(() =>
    store.filters.cityQuery.map((el: any) => {
        return {
            value: el.id,
            label: el.name,
        };
    })
);

const data = {
    country: "",
    city: "",
    rooms: "",
    rate: 0,
};
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

.mla {
    margin-left: auto;
}
</style>
