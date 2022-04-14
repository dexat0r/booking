<template>
    <div class="row">
        <div class="col w15" style="font-weight: 600;">Создать:</div>
        <div class="col w85">
            <div class="row mb15">
                <FilterInput
                    :input-value="data.country"
                    :label="`Страна`"
                    type="text"
                />
                <FilterInput
                    :input-value="data.city"
                    :label="`Город`"
                    type="text"
                    class="mla"
                />
            </div>
            <div class="row mb15">
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Комнаты`"
                    type="text"

                />
                <FilterInput
                    :input-value="data.rooms"
                    :label="`Рейтинг`"
                    type="text"
                    class="mla"
                />
            </div>
            <div class="row" style="justify-content: flex-end;">
                <Button>Создать</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterInput from "@/components/FilterInput.vue";
import Button from "@/components/Button.vue";

const countryOptions = [];
const roomsOptions = [];
const cityOptions = [];

const data = {
    country: "",
    city: "",
    rooms: "",
    rate: 0
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

.mla{
    margin-left: auto;
}
</style>
