import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('pages/LandingPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Home',
        path: '/home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Mods',
        path: 'mods',
        component: () => import('pages/ModificationsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Research',
        path: 'research',
        component: () => import('pages/ResearchPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Outpost modules',
        path: 'outpost',
        component: () => import('pages/OutpostModulesPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { requiresAuth: false }
  }
]

export default routes
