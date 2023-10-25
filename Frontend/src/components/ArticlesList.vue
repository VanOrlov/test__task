<template>
    <div class="grid__container">
        <n-grid :x-gap="12" :y-gap="50" :cols="2">
            <n-grid-item v-for="article in $store.state.articles">
                <ArticleItem :article="article" :key="article.id"/>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import ArticleItem from '@/components/UI/ArticleItem'
import { useStore} from 'vuex'


export default defineComponent({
    name: 'ArticlesList',
    components:{
        ArticleItem
    },
    setup(){

      const store = useStore()
      onMounted(async() => {
        await store.dispatch('getArticles')
      })
    }
})
</script>

<style scoped>
.grid__container{
    width: 100%;
    height: auto;
}
</style>