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
      path: '/manager',
      name: 'manager',
      component: () => import('@/views/manager.vue')
    },
    {
      path: '/show',
      name: 'Show',
      component: () => import('@/views/Show.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/time',
      name: 'TimeList',
      component: () => import('@/components/TimeList.vue')
    },
    {
      path: '/animal',
      name: 'Animal',
      component: () => import('@/views/Animal.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/components/List.vue')
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('@/components/Game.vue')
    },
    {
      path: '/card',
      name: 'Card',
      component: () => import('@/components/Card.vue')
    },
    {
      path: '/hh',
      name: 'HH',
      component: () => import('@/components/HH.vue')
    },
    {
      path: '/cc',
      name: 'cc',
      component: () => import('@/components/cc.vue')
    },
    {
      path: '/dd',
      name: 'dd',
      component: () => import('@/components/dd.vue')
    },
    {
      path: '/ee',
      name: 'ee',
      component: () => import('@/components/ee.vue')
    },
    {
      path: '/gg',
      name: 'gg',
      component: () => import('@/components/gg.vue')
    },
    {
      path: '/tt',
      name: 'tt',
      component: () => import('@/components/tok.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/library.vue')
    },
    {
      path: '/species/:id',
      name: 'SpeciesDetail',
      component: () => import('@/components/SpeciesDetail.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesPage.vue')
    },
    {
      path: '/recent/:id',
      name: 'RecentDiscoveries',
      component: () => import('@/components/RecentDiscoveries.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/community.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/chat.vue')
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('@/views/DetailPage.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/components/map.vue')
    },
    {
      path: '/public',
      name: 'public',
      component: () => import('@/views/PublicationPage.vue')
    },
    {
      path: '/public/detail',
      name: 'PublicDetail',
      component: () => import('@/views/PublicationDetailPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/ItemManagementPage.vue')
    },
    {
      path: '/1',
      name: '1',
      component: () => import('@/components/phone/EncyclopediaEntryPage.vue')
    },
    {
      path: '/2',
      name: '2',
      component: () => import('@/components/phone/BeachCleanupEventPage.vue')
    },
    {
      path: '/3',
      name: '3',
      component: () => import('@/components/phone/CommunityPostDetailPage.vue')
    },
    {
      path: '/4',
      name: '4',
      component: () => import('@/components/phone/Comms.vue')
    },
    {
      path: '/5',
      name: '5',
      component: () => import('@/components/phone/AIChat.vue')
    },
    {
      path: '/6',
      name: '6',
      component: () => import('@/components/phone/AddObject.vue')
    },
    {
      path: '/7',
      name: '7',
      component: () => import('@/components/phone/VideosGalleryPage.vue')
    },
    {
      path: '/8',
      name: '8',
      component: () => import('@/components/phone/ScheduleManagementPage.vue')
    },
  ]
})

export default router 