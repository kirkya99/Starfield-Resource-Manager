<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginComponent',
  data () {
    return {
      email: '',
      password: ''
    }
  }
})
</script>

<template>
  <template>
    <q-form>
      <q-input filled v-model="email" label="Email" hint="Your Email address"  />

      <q-input filled v-model="password" label="Password" hint="Your Password" />

    </q-form>
  </template>
</template>

<style scoped>

</style>
