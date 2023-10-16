<template>
  <div class="articles">
    <n-space vertical align="center" class="space">
      <n-form
      :rules="rules"
      class="form"
      ref="formRef"
      :model="formValue"
      @submit.prevent
      >
        <n-form-item label="Заголовок" path="title">
          <n-input class="form__inputs" v-model:value="formValue.title" placeholder="Заголовок" />
        </n-form-item>
        <n-form-item label="Содержание" path="text">
          <n-input class="form__inputs" v-model:value="formValue.text" placeholder="Содержание" type="textarea"/>
        </n-form-item>
        <n-button type="primary" @click="handleValidateClick" :disabled="isDisabled">
          Primary
        </n-button>
      </n-form>
  </n-space>

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui"
import ArticlesList from '@/components/ArticlesList';
import axios from "axios";

export default defineComponent({
  name: 'Articles',
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    let isDisabled = ref(false)

      const formValue = ref({
        title: "",
        text: "",
      })
      const rules = {
        title: {
          required: true,
          message: "Впишите заголовок",
          trigger: ["blur"]
        },
        text: {
          required: true,
          message: "Впишите текст",
          trigger: ["input", "blur"]
        }
      }

      
      
      async function handleValidateClick(e){
        e.preventDefault();
        message.destroyAll()
        isDisabled.value = true
        if (formValue.value.title && formValue.value.text) {
          let msgReactive = null;
          msgReactive = message.create('Создание статьи', {type: 'loading', duration: 5000})
          await axios.post('http://192.168.1.2:3000/api/article', {...formValue.value})
          .then(() => {
              setTimeout(() => {
                msgReactive.type = "success"
                msgReactive.content = "Успешно"
                isDisabled.value = false
                formValue.value.title = ''
                formValue.value.text = ''
              }, 1000);
            }
          )
          .catch((error) => {
            console.log(error);
              msgReactive.type = "error"
              msgReactive.content = "Ошибка"
              isDisabled.value = false
          })
        }else{
          message.error('Ошибка валидации')
          isDisabled.value = false
        }
      }

    return {
      handleValidateClick,
      formRef,
      formValue,
      rules,
      isDisabled
    };
  }
})
</script>

<style>
  .articles{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
  }
  .form{
    max-width: 550px;
    width: 100%;
  }
  .space > div[role="none"] {
    min-width: 100%;
  } 
  .form__inputs{
    font-size: 16px;
  }
  
</style>
