<template>
    <div class="articles">
        <n-card v-if="$store.state.article.id" :title="title" hoverable>
            <template #header-extra>
                <p class="createdAt">{{ formattedDate($store.state.article.createdAt) }}</p>
                <n-button type="warning" @click="showModal = true">Редактировать</n-button>
            </template>
            <p class="article__text">{{ $store.state.article.text }}</p>
            <n-collapse arrow-placement="right" v-if="$store.state.comments.length > 0">
                <n-collapse-item :title="titleComments" name="1">
                    <CommentItem v-for="comment in $store.state.comments" :comment="comment"/>
                </n-collapse-item>
            </n-collapse>
            <p v-else>Комментариев пока что нет, напишите первым!</p>
            <div class="create__comment">
                <n-input v-model:value="comment.text" placeholder="Напишите комментарий" />
                <n-button :disabled="commentCreate" @click="createComment" type="primary">Создать</n-button>
            </div>
        </n-card>
        <p v-else>Такой статьи не существует</p>
        <n-modal title="Редактирование статьи" v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle">
            <div class="modal__input__container">
                <n-input placeholder="Заголовок" v-model:value="editValue.title"></n-input>
                <n-input placeholder="Содержание" v-model:value="editValue.text" type="textarea"></n-input>
                <n-button :loading="button__loading" :disabled="button__disabled" class="editButton" type="success" @click="editingArticle">Редактировать</n-button>
            </div>
        </n-modal>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useStore, mapState } from 'vuex'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/UI/CommentItem'
import axios from 'axios';
import { useMessage } from "naive-ui"

const store = useStore()
const route = useRoute()
const message = useMessage()
const id = route.params.id
let title = computed(() => store.state.article.title)
let titleComments = ref(`Комментарии (${store.state.comments.length})`)
watchEffect(() => {
  titleComments.value = `Коммантарии (${store.state.comments.length})`
});

let comment = ref({
    text: ''
})
let commentCreate = computed(() => comment.value.text == '')
onMounted(async () => {
    await store.dispatch('getOneArticle', id)
    await store.dispatch('getComment', id)
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

async function createComment(){
    message.destroyAll()
    await axios.post(`http://192.168.1.2:3000/api/article/${id}/comment`, {...comment.value})
    .then(() => {
        message.success('Успешно')
        store.dispatch('addComment', comment.value)
        comment.value.text = ''
    })
    .catch((error) => {
        message.error('Ошибка')
        console.log(error)
    })
}

const showModal = ref(false)
let editValue = ref({
    title: '',
    text: ''
})

const bodyStyle = {
    width: "600px"
}
const button__disabled = computed(() => editValue.value.title == '' || editValue.value.text == '')
let button__loading = ref(false)

async function editingArticle(){
    button__loading.value = true
    setTimeout(async () => {
        await axios.patch(`http://192.168.1.2:3000/api/article/${id}`, {...editValue.value})
        .then(() => {
            button__loading.value = false
            showModal.value = false
            store.dispatch('getOneArticle', id)
            store.dispatch('getComment', id)
        })
        .catch((error) => {
            console.log(error);
        })
    }, 1000);
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
    margin-right: 10px;
}
.article__text{
    margin-bottom: 20px;
}
.create__comment{
    margin-top: 30px;
    display: flex;
    gap: 20px;
}

.modal__input__container{
    display: flex;
    width: 100%;
    gap: 20px;
    flex-direction: column;
    align-items: flex-end;
}
.editButton{
    width: fit-content;
}
</style>