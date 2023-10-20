<template>
      <div class="comment__item">
        <p class="number__of__comments">{{ comments + 1 }} </p>
        <p>{{ comment.text }}</p>
        <div class="button__group__comment">
            <n-button type="warning">
                Редактировать
            </n-button>
            <n-button @click="deleteComment" type="error">
                Удалить
            </n-button>
        </div>
      </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useMessage } from "naive-ui"

const message = useMessage()
const route = useRoute()
const id = route.params.id
const store = useStore()
let edit = ref(false)

const props = defineProps({
        comment: Object
    })
let comments = store.state.comments.indexOf(props.comment)

async function deleteComment(){
    await axios.delete(`http://192.168.1.2:3000/api/article/${id}/comment/${comments + 1}`)
    .then(() => {
        message.success('Успешно')
        store.dispatch('deleteComment', props.comment)
    })
    .catch((error) => {
        message.error('Ошибка')
        console.log(error);
    })
}
</script>

<style scoped>
.comment__item{
    display: flex;
    padding: 10px 10px;
    margin-bottom: 10px;
}
.number__of__comments{
    font-weight: 700;
    margin-right: 10px;
}

.button__group__comment{
    display: flex;
    margin-left: auto;
    gap: 10px;
}
</style>