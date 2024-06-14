<script lang="ts">
import { defineComponent } from 'vue'
import packageJson from '../../package.json'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  data () {
    return {
      router: useRouter(),
      leftDrawerOpen: false,
      version: packageJson.version,
      routes: [
        { name: 'Home', path: '/home', separator: true },
        { name: 'Modifications', path: '/mods', separator: false }
      ]
    }
  },

  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    navigate (path: string) {
      this.router.push(path)
    }

  }
})

</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div>Starfield Resource Manager</div>
        </q-toolbar-title>

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>
    <div v-if="$q.platform.is.desktop">
      <q-drawer show-if-above v-model=" leftDrawerOpen" side="left" behavior="desktop" elevated>
        <q-list>
          <q-item v-for="route in routes" clickable :key="route.path" @click="navigate(route.path)">
            <q-item-section>{{ route.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>

    <div v-if="$q.platform.is.mobile">
      <q-drawer show-if-above v-model=" leftDrawerOpen" side="left" behavior="mobile" elevated>
        <q-list>
          <q-item v-for="route in routes" clickable :key="route.path" @click="navigate(route.path)">
            <q-item-section>{{ route.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
