<template>
      <div class="comment__item">
        <p class="number__of__comments">{{ comments + 1 }} </p>
        <p>{{ comment.text }}</p>
        <div class="button__group__comment">
            <n-button type="warning">
                Редактировать
            </n-button>
            <n-button type="error">
                Удалить
            </n-button>
        </div>
      </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
        comment: Object
    })
let comments = store.state.comments.indexOf(props.comment)
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