import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/Community.vue')
    },
    {
      path: '/show',
      name: 'Show',
      component: () => import('@/views/Show.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/time',
      name: 'TimeList',
      component: () => import('@/views/TimeList.vue')
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