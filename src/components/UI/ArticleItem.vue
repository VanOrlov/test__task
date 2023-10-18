<template>
    <n-card :title="article.title" hoverable closable @close="removeArticle" class="item">
        <template #header-extra>
            <p class="createdAt">{{ formattedDate(article.createdAt) }}</p>
        </template>
        <div class="card__contain">
            {{ article.text }}
            <p class="articleId" @click="$router.push(`/article/${id}`)">Подробнее</p>
        </div>
    </n-card>
</template>

<script setup>
    import { defineProps } from 'vue'
    import axios from 'axios'
    import { useMessage } from "naive-ui"
    const props = defineProps({
        article: Object
    })
    const id = props.article.id
    let message = useMessage()
    async function removeArticle(){
        message.destroyAll()
        await axios.delete(`http://192.168.1.2:3000/api/article/${id}`)
        .then(() => {
            message.success('Удалено')
        })
        .catch((error) => {
            message.error('Ошибка удаления')
        })
    }

    function formattedDate(data){
        const date = new Date(data);
        const year = date.getFullYear(); // Год 
        const month = date.getMonth() + 1; // Месяц 
        const day = date.getDate(); // День 
        const hours = date.getHours(); // Часы
        let minutes = date.getMinutes(); //Минуты
        minutes = minutes < 10 ? `0${minutes}` : minutes 
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }
</script>

<style scoped>
.item {
    width: 100%;
    height: 100%;
    gap: 20px;
}
.card__contain{
    display: flex;
    flex-direction: column;
}
.articleId{
    font-style: italic;
    width: fit-content;
    text-decoration: underline;
    margin-top: 20px;
}
.articleId:hover{
    cursor: pointer;
}
.createdAt{
    color: rgba(0, 0, 0, .5);
}
</style>
