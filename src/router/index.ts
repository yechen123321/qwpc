import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    // {
    //   path: '/models',
    //   name: 'Models',
    //   component: () => import('@/views/Models.vue')
    // },
    // {
    //   path: '/qa',
    //   name: 'QA',
    //   component: () => import('@/views/QA.vue')
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('@/views/About.vue')
    // }
  ]
})

export default router 