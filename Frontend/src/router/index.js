import { createRouter, createWebHistory } from 'vue-router'
import Articles from '../views/Articles.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Articles
  },
  {
    path: '/article/:id',
    name: 'articleId',
    component: () => import('../views/ArticleId')
  },
  {
    path: '/analytic',
    name: 'analytic',
    component: () => import('../views/Analytic')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
