<script lang="ts">
import { defineComponent } from 'vue'
import LoginComponent from 'components/LoginComponent.vue'
import RegisterComponent from 'components/RegisterComponent.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    RegisterComponent,
    LoginComponent
  },
  data () {
    return {
      loginSelected: true
    }
  }
})
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-h4 col-12 text-center">Starfield Resource Manager</div>
      <div class="col-md-2 q-pt-md q-mt-md">
      <q-btn-group outline spread>
        <q-btn :outline="!loginSelected" color="primary" label="Login" @click="() => loginSelected = !loginSelected" />
        <q-btn :outline="loginSelected" color="primary" label="Register" @click="() => loginSelected = !loginSelected" />
      </q-btn-group>
      </div>
      <div class="col-12 q-pt-md q-mt-md">
      <LoginComponent v-if="loginSelected" class="col-12"/>
      <RegisterComponent v-if="!loginSelected"  class="col-12"/>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
