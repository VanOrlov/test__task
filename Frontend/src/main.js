import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'

import components from '@/components/UI'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
});

app.use(store).use(naive).use(router).mount('#app')
