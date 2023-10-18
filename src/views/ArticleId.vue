<template>
    <div class="articles">
        <n-card v-if="$store.state.article.id" :title="title.title" hoverable closable>
            <template #header-extra>
                <p class="createdAt">{{ formattedDate($store.state.article.createdAt) }}</p>
            </template>
            <p class="article__text">{{ $store.state.article.text }}</p>
            <n-collapse arrow-placement="right" v-if="$store.state.comments.length > 0">
                <n-collapse-item title="Комментарии" name="1">
                    <CommentItem v-for="comment in $store.state.comments" :comment="comment"/>
                </n-collapse-item>
            </n-collapse>
            <p v-else>Комментариев пока что нет, напишите первым!</p>
        </n-card>
        <p v-else>Такой статьи не существует</p>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore, mapState } from 'vuex'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/UI/CommentItem'

const store = useStore()
const route = useRoute()
const id = route.params.id
let title = ref([])
onMounted(async () => {
    await store.dispatch('getOneArticle', id)
    await store.dispatch('getComment', id)
    title.value = store.state.article
})

function formattedDate(data) {
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
.articles {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
}
.createdAt{
    color: rgba(0, 0, 0, .5);
}
.article__text{
    margin-bottom: 20px;
}
</style>