<template>
    <div class="card">
        <div class="card-title title"><span class="title-text">{{ props.title }}</span></div>
        <div class="card-row" style="height: 100%;">
            <div class="card-col w30" style="justify-content: flex-end;">
                <div class="card-row" style="justify-content: space-between;">
                    <div class="card-col">
                        <div class="text">
                            {{ props.location.country }}
                        </div>
                        <div class="text">
                            {{ props.location.town }}
                        </div>
                    </div>
                    <div class="card-col">
                        <div class="text">Комнаты:<span style="font-weight: 600;">{{ props.rooms }}</span></div>
                        <div class="text">Рейтинг:<span style="font-weight: 600;">{{ props.rate }}</span></div>
                    </div>
                </div>
            </div>
            <div class="card-col w70" style="padding-left:100px">
                <div class="card-row" style="align-items: center;height: 100%;">
                    Даты:
                    <div class="card-col card-dates">
                        <input type="date" class="date">
                        <input type="date" class="date">
                    </div>
                    <Button>Забронировать</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    border-radius: 8px;
    border: 0.5px solid #B9B9B9;
    height: 110px;
    width: 980px;
    padding: 16px 30px;
    position: relative;
}

.w30 {
    width: 30%;
}

.w70 {
    width: 70%;
}

.card-title {
    position: absolute;
}

.card-col {
    display: flex;
    flex-direction: column;
}

.card-row {
    display: flex;
    flex-direction: row;
}

.card-col>div {
    margin: 0;
}

.card-col>.text:first-child {
    margin-bottom: 10px;
}

.card-col>.text>span {
    margin-left:5px;
}

.card-dates {
    margin: 0 auto;
}

.date {
    width: 270px;
    margin: 0 auto;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #B9B9B9
}

.date:first-child {
    margin-bottom: 10px;
}
</style>

<script lang="ts" setup>
import Button from "@/components/Button.vue";

interface Props {
    title: string,
    location: {
        country: string,
        town: string
    },
    rooms: number,
    rate: number
}

const props = defineProps<Props>();

const data = {
    date1: '',
    date2: ''
}

</script>