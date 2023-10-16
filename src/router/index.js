import { createRouter, createWebHistory } from 'vue-router'
import Articles from '../views/Articles.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Articles
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
