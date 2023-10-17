<template>
    <div class="item">
        <h1>{{ article.title }}</h1>
        <p>{{ article.text }}</p>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        article: Object
    })
    
    const name = "ArticleItem"
    console.log(props);
</script>

<style scoped>
.item {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    height: 100%;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
h1{
    font-size: 28px;
    text-align: center;
}
p{
    font-size: 20px;
}
</style>
