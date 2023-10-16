import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'

createApp(App).use(store).use(naive).use(router).mount('#app')
