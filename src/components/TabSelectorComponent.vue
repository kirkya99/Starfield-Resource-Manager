<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabSelectorComponent',
  data () {
    return {
      selectedButton: true
    }
  }
})
</script>

<template>
  <q-btn-group style="width: 20%">
    <q-btn :outline="selectedButton" @click="() => selectedButton = !selectedButton" color="primary" label="Login" style="width: 50%"/>
    <q-btn :outline="!selectedButton" @click="() => selectedButton = !selectedButton"  color="primary" label="Register" style="width: 50%"/>
  </q-btn-group>
</template>

<style scoped>

</style>
