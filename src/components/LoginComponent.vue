<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginComponent',
  data () {
    return {
      router: useRouter(),
      email: null as string | null,
      password: null as string | null,
      isPwd: true
    }
  },
  methods: {
    onSubmit () {
      console.log(`Email: ${this.email}; Password: ${this.password}`)
      this.router.push('/home')
    },
    onReset () {
      this.email = null
      this.password = null
    }
  }
})
</script>

<template >
  <div class="row justify-center">
  <q-card class="col-md-3">
    <q-form @submit="onSubmit" class="q-ma-md q-gutter-y-md">
      <div class="text-h5">Login</div>
      <q-input v-model="email" filled type="email" dense label="Email" lazy-rules  :rules="[val => !!val || 'Email field is required']" />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" dense label="Password" lazy-rules :rules="[val => !!val || 'Password field is required']">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-card>
  </div>
</template>

<style scoped>

</style>
