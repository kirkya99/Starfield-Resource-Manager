import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Shopping list',
        path: 'shoppingList',
        component: () => import('pages/ShoppingListPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Modifications',
        path: 'mods',
        component: () => import('pages/ModificationsPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Research',
        path: 'research',
        component: () => import('pages/ResearchPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Outpost modules',
        path: 'outpost',
        component: () => import('pages/OutpostModulesPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Manufactured resources',
        path: 'manufactured',
        component: () => import('pages/ManufacturedResources.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('pages/SettingsPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'Login',
        path: '/login',
        component: () => import('pages/LandingPage.vue'),
        meta: { requiresAuth: false }
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
