<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      router: useRouter(),
      route: useRoute(),
      showHeaderAndDrawer: true,
      leftDrawerOpen: false,
      homeRoute: { name: 'Home', path: '/home', icon: 'home' },
      shoppingListRoute: { name: 'Shopping list', path: '/shoppingList', icon: 'shopping_cart' },
      modsRoute: { name: 'Modifications', path: '/mods', icon: 'build' },
      researchRoute: { name: 'Research', path: '/research', icon: 'science' },
      outpostModulesRoute: { name: 'Outpost modules', path: '/outpost', icon: 'flag' },
      profileRoute: { name: 'Profile', path: '/profile', icon: 'person' },
      logoutRoute: { name: 'Logout', path: '/', icon: 'logout' }

    }
  },
  mounted () {
    this.checkRoute()
  },
  updated () {
    this.checkRoute()
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    navigate (path: string) {
      this.router.push(path)
    },
    checkRoute () {
      this.showHeaderAndDrawer = this.route.name !== 'Login'
    }

  }
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
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn round icon="person" unelevated>
          <q-menu fit anchor="top right" self="top right">
            <q-list>
              <q-item clickable v-close-popup @click="navigate(profileRoute.path)">
                <q-item-section avatar>
                  <q-icon :name="profileRoute.icon"/>
                </q-item-section>
                <q-item-section>{{ profileRoute.name }}</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="navigate(logoutRoute.path)">
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
</template>
