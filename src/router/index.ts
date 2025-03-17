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
    {
      path: '/animal',
      name: 'Animal',
      component: () => import('@/views/Animal.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/views/List.vue')
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('@/views/Game.vue')
    },
    {
      path: '/card',
      name: 'Card',
      component: () => import('@/views/Card.vue')
    },
    {
      path: '/hh',
      name: 'HH',
      component: () => import('@/views/HH.vue')
    },
    {
      path: '/cc',
      name: 'cc',
      component: () => import('@/views/cc.vue')
    },
    {
      path: '/dd',
      name: 'dd',
      component: () => import('@/views/dd.vue')
    },
    {
      path: '/ee',
      name: 'ee',
      component: () => import('@/views/ee.vue')
    },
    {
      path: '/gg',
      name: 'gg',
      component: () => import('@/views/gg.vue')
    },
  ]
})

export default router 