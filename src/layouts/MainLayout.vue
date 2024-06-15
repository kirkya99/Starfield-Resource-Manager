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
        { name: 'Modifications', path: '/mods', separator: false, icon: 'build' }
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
                <q-separator :key="'sep' + index" v-if="route.separator"/>
              </q-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>

    <div v-if="$q.platform.is.mobile">
      <q-drawer show-if-above v-model=" leftDrawerOpen" side="left" behavior="mobile" elevated>
        <q-scroll-area class="fit">
          <q-list>
            <q-item v-for="route in routes" clickable :key="route.path" @click="navigate(route.name, route.path)"
                    :active="route.name === selectedItem" v-ripple>
              <q-item-section avatar>
                <q-icon :name="route.icon"/>
              </q-item-section>
              <q-item-section>
                {{ route.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
