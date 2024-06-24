<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { StoreManager } from 'src/typescript/StoreManager'

const storeManager = new StoreManager()

const router = useRouter()
const email = ref<string | null>(null)
const password = ref<string | null>(null)
const isPwd = ref<boolean>(true)

const onSubmit = () => {
  console.log(`Email: ${email.value}; Password: ${password.value}`)
  storeManager.userStore.setUserId('userId')
  router.push('/')
}
</script>

<template>
  <div class="row justify-center">
    <q-card class="col-md-2">
      <q-form @submit="onSubmit" class="q-ma-md q-gutter-y-md">
        <div class="text-h5">Register</div>
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
          <q-btn label="Register" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>

</style>
