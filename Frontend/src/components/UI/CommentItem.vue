<template>
      <div class="comment__item">
        <p class="number__of__comments">{{ comments + 1 }} </p>
        <p>{{ comment.text }}</p>
        <div class="button__group__comment">
            <n-button type="warning" @click="showCommentModal = true">
                Редактировать
            </n-button>
            <n-button @click="deleteComment" type="error">
                Удалить
            </n-button>
        </div>
        <n-modal title="Редактирование комментария" v-model:show="showCommentModal" preset="card" :style="bodyCommentStyle">
            <div class="comment__modal__container">
                <n-input placeholder="Комментарий" v-model:value="editValue.text"></n-input>
                <n-button @click="editComment" :loading="comment__button__loading" :disabled="comment__button__disabled" type="success">Редактировать</n-button>
            </div>
        </n-modal>
      </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useMessage } from "naive-ui"

const message = useMessage()
const route = useRoute()
const id = route.params.id
const store = useStore()

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

const showCommentModal = ref(false)
const bodyCommentStyle = {
    width: "600px"
}
let editValue = ref({
    text: props.comment.text
})
let comment__button__loading = ref(false)
let comment__button__disabled = computed(() => editValue.value.text == '')

async function editComment(){
    comment__button__loading.value = true
    setTimeout(async () => {
        await axios.patch(`http://192.168.1.2:3000/api/article/${id}/comment/${comments + 1}`, {...editValue.value})
        .then(() => {
            comment__button__loading.value = false
            showCommentModal.value = false
            store.dispatch('getComment', id)
        })
        .catch((error) => {
            console.log(error);
        })
    }, 1000);
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
.comment__modal__container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    gap: 20px;
}
</style>