<template>
    <div class="comment__container">
        <div class="comment">
            <p class="number">{{ number }}</p>
            <p>{{ text }}</p>
        </div>
        <div class="date">
            <p>Создан: {{ formattedDate(createdAt) }}</p>
            <p v-if="updatedAt">Редактирован: {{ formattedDate(updatedAt) }}</p>
            <p v-else>Не отредактирован</p>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    number: Number,
    text: String,
    createdAt: null,
    updatedAt: null
})

function formattedDate(data){
        const date = new Date(data);
        const year = date.getFullYear(); // Год 
        const month = date.getMonth() + 1; // Месяц 
        const day = date.getDate(); // День 
        const hours = date.getHours(); // Часы
        let minutes = date.getMinutes(); //Минуты
        minutes = minutes < 10 ? `0${minutes}` : minutes 
        return `${year}.${month}.${day} ${hours}:${minutes}`
    }
</script>

<style scoped>
.comment__container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 10px;
}
.comment{
    display: flex;
    width: 100%;
}
.number{
    font-weight: 600;
    margin-right: 10px;
    width: 13px;
}
.date{
    color: rgba(0, 0, 0, .5);
    font-style: italic;
}
</style>