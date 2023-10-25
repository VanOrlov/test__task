<template>
    <n-card :title="title" hoverable :segmented="{content: true}">
        <AnalyticItemComment v-for="comment in comments" :number="comments.indexOf(comment) + 1" :text="comment.text" :createdAt="comment.createdAt" :updatedAt="comment.updatedAt"/>
        <template #footer>
            <p class="redirect" @click="$router.push(`/article/${id}`)">Подробнее</p>
        </template>
    </n-card>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import axios from 'axios';
import AnalyticItemComment from '@/components/UI/AnalyticItemComment'

const props = defineProps({
    id: String,
    comments: Array,
})

let title = ref(null)

onMounted(async () => {
    await axios.get(`http://192.168.1.2:3000/api/article/${props.id}`)
    .then((res) => {
        console.log(res.data);
        title.value = res.data.title
    })
    .catch((error) => {
        console.log(error);
    })
})

</script>

<style scoped>
.n-card{
    height: 100%;
}
.redirect{
    width: fit-content;
    color: rgba(0, 0, 0, .5);
    font-style: italic;
}
.redirect:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>