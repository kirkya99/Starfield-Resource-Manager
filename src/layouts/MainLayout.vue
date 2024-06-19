<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute, RouteLocationNormalized } from 'vue-router'
import { useSessionStore } from 'stores/useSessionStore'

const sessionStore = useSessionStore()
const router = useRouter()
const route = useRoute()
const showHeaderAndDrawer = ref<boolean>(true)
const leftDrawerOpen = ref<boolean>(false)
const onLogoutOpened = ref<boolean>(false)

interface routeDef {
  name: string;
  path: string;
  icon: string;
}

const homeRoute = ref<routeDef>({ name: 'Home', path: '/home', icon: 'home' })
const shoppingListRoute = ref<routeDef>({ name: 'Shopping list', path: '/shoppingList', icon: 'shopping_cart' })
const modsRoute = ref<routeDef>({ name: 'Modifications', path: '/mods', icon: 'build' })
const researchRoute = ref<routeDef>({ name: 'Research', path: '/research', icon: 'science' })
const outpostModulesRoute = ref<routeDef>({ name: 'Outpost modules', path: '/outpost', icon: 'flag' })
const profileRoute = ref<routeDef>({ name: 'Profile', path: '/profile', icon: 'person' })
const logoutRoute = ref<routeDef>({ name: 'Logout', path: '/', icon: 'logout' })

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const navigate = (path: string) => {
  router.push(path)
}

const checkRoute = () => {
  showHeaderAndDrawer.value = route.name !== 'Login'
}

const logout = () => {
  sessionStore.clearModifications()
  sessionStore.clearUserId()
  router.push(logoutRoute.value.path)
}

onMounted(() => checkRoute())

router.beforeEach((to: RouteLocationNormalized) => {
  showHeaderAndDrawer.value = to.name !== 'Login'
})

</script>

<template>

  <q-layout view="hHh Lpr lFf">
    <q-header v-if="showHeaderAndDrawer" elevated>
      <q-toolbar class="row justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Navigation Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn round icon="login" v-if="sessionStore.userId === ''" unelevated aria-label="Login" @click="() => sessionStore.setUserId('name')">
          <q-tooltip class="text-12px">
            Login or register to access your resource management from multiple devices
          </q-tooltip>
        </q-btn>
        <q-btn round icon="person" v-if="sessionStore.userId !== ''" unelevated aria-label="Personal Menu">
          <q-menu cover>
            <q-list>
              <q-item clickable v-close-popup @click="navigate(profileRoute.path)">
                <q-item-section avatar>
                  <q-icon :name="profileRoute.icon"/>
                </q-item-section>
                <q-item-section>{{ profileRoute.name }}</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="() => onLogoutOpened = true">
                <q-item-section avatar>
                  <q-icon :name="logoutRoute.icon"/>
                </q-item-section>
                <q-item-section>{{ logoutRoute.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="showHeaderAndDrawer" show-if-above v-model=" leftDrawerOpen" side="left" elevated>
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable @click="navigate(homeRoute.path)" :active="homeRoute.name === route.name"
                  v-ripple>
            <q-item-section avatar>
              <q-icon :name="homeRoute.icon"/>
            </q-item-section>
            <q-item-section>
              {{ homeRoute.name }}
            </q-item-section>
          </q-item>
          <q-item clickable @click="navigate(homeRoute.path)" :active="shoppingListRoute.name === route.name"
                  v-ripple>
            <q-item-section avatar>
              <q-icon :name="shoppingListRoute.icon"/>
            </q-item-section>
            <q-item-section>
              {{ shoppingListRoute.name }}
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable @click="navigate(modsRoute.path)" :active="modsRoute.name === route.name" v-ripple>
            <q-item-section avatar>
              <q-icon :name="modsRoute.icon"/>
            </q-item-section>
            <q-item-section>
              {{ modsRoute.name }}
            </q-item-section>
          </q-item>
          <q-item clickable @click="navigate(researchRoute.path)" :active="researchRoute.name === route.name" v-ripple>
            <q-item-section avatar>
              <q-icon :name="researchRoute.icon"/>
            </q-item-section>
            <q-item-section>
              {{ researchRoute.name }}
            </q-item-section>
          </q-item>
          <q-item clickable @click="navigate(outpostModulesRoute.path)"
                  :active="outpostModulesRoute.name === route.name"
                  v-ripple>
            <q-item-section avatar>
              <q-icon :name="outpostModulesRoute.icon"/>
            </q-item-section>
            <q-item-section>
              {{ outpostModulesRoute.name }}
            </q-item-section>
          </q-item>
          <q-separator/>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="onLogoutOpened" persistent>
    <q-card>
      <q-card-section avatar class="row items-center">
        <q-avatar icon="logout" text-color="primary"></q-avatar>
        <span class="q-ml-sm">Do you want to logout?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
        <q-btn label="Logout" color="primary" v-close-popup @click="logout"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
