<template>
    <div class="analytic">
        <div class="date__picker">
            <div class="date__picker__container">
                <n-date-picker v-model:value="dateRange" type="daterange" clearable />
            </div>
            <n-button :disabled="disabled" @click="a" type="success">Загрузить</n-button>
        </div>
        <n-grid :x-gap="12" :y-gap="50" :cols="2">
            <n-grid-item v-for="(comments, id) in $store.state.commentsAll">
                <AnalyticItem :id="id" :comments="comments" :key="id"/>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import AnalyticItem from '@/components/UI/AnalyticItem'

const store = useStore()
let dateRange = ref([1, Date.now()])
let disabled = computed(() => dateRange.value == null)

function a(){
    store.dispatch('setCommentsAll', dateRange.value)
}

</script>

<style scoped>
.analytic{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
}
.date__picker{
    width: 100%;
    padding: 20px 0;
    display: flex;
}
.date__picker__container{
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>