<script lang="ts">
import { defineComponent } from 'vue'
import packageJson from '../../package.json'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      router: useRouter(),
      leftDrawerOpen: false,
      version: packageJson.version,
      selectedItem: '',
      routes: [
        { name: 'Home', path: '/home', separator: true, icon: 'home' },
        { name: 'Modifications', path: '/mods', separator: false, icon: 'build' },
        { name: 'Research', path: '/research', separator: false, icon: 'science' },
        { name: 'Outpost modules', path: '/outpost', separator: false, icon: 'flag' }
      ]
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    navigate (name: string, path: string) {
      this.selectedItem = name
      this.router.push(path)
    }
  }
})

</script>

<template>

  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
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
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model=" leftDrawerOpen" side="left" elevated>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(route, index) in routes" :key="index">
            <q-item clickable @click="navigate(route.name, route.path)" :active="route.name === selectedItem"
                    v-ripple>
              <q-item-section avatar>
                <q-icon :name="route.icon"/>
              </q-item-section>
              <q-item-section>
                {{ route.name }}
              </q-item-section>
            </q-item>
          </template>
          <q-separator/>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
