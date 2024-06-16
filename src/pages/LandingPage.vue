<script lang="ts">
import { defineComponent } from 'vue'
import LoginComponent from 'components/LoginComponent.vue'
// import LoginComponent from 'components/LoginComponent.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginComponent
  }
})
</script>

<template>
  <q-page padding>
    <LoginComponent />
  </q-page>
</template>

<style scoped>

</style>
