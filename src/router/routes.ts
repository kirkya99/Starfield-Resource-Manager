import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('pages/LandingPage.vue')
      },
      {
        name: 'Home',
        path: '/home',
        component: () => import('pages/IndexPage.vue')
      },
      {
        name: 'Mods',
        path: 'mods',
        component: () => import('pages/ModificationsPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
