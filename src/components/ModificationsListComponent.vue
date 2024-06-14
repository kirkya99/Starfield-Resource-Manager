<script lang="ts">
import { defineComponent } from 'vue'
// import { Modification } from 'src/data/Modification'
import modificationsJson from '../data/modifications.json'

export default defineComponent({
  name: 'ModificationsListComponent',

  data () {
    return {
      modifications: modificationsJson,
      selectedMod: null
    }
  },
  created () {
    console.log(this.modifications)
  },
  methods: {
  }
})
</script>

<template>
  <div class="row">
    <div class="col-8">
      <!-- TODO: Add Autocomplete -->
<!--      <q-select v-model="selectedMod.Modification" :options="modifications" filled/>-->
    </div>
    <div class="col-4">
      <!-- TODO: Add Add Modification Button -->
      <q-btn/>
    </div>
    <div class="col-all">
      <!-- TODO: Add Tracked Modifications Table -->
<!--      {{ selectedMod.Modification }}-->
    </div>
  </div>
</template>

<style scoped>

</style>
