<script lang="ts">
import { defineComponent } from 'vue'
import { Modification } from 'src/types/Modification'

export default defineComponent({
  name: 'ModificationsListComponent',

  data () {
    return {
      allModsList: [] as Modification[],
      allModsNames: [] as string[],
      selectedModsList: []as Modification[],
      selectedMod: '' as string
    }
  },
  created () {
    this.readModsJson()
  },
  methods: {
    async readModsJson () {
      try {
        const response = await fetch('.src/data/modifications.json')
        this.allModsList = response.json()
        this.allModsNames = this.allModsList.map(item => item.Modification)
      } catch (error) {
        console.error('Error fetching JSON data:', error)
      }
    }
  }
})
</script>

<template>
  <div class="row">
    <div class="col-8">
      <!-- TODO: Add Autocomplete -->
      <q-select v-model="selectedMod" :options="allModsNames" filled />
    </div>
    <div class="col-4">
      <!-- TODO: Add Add Modification Button -->
      <q-btn />
    </div>
    <div class="col-all">
      <!-- TODO: Add Tracked Modifications Table -->
      {{ selectedMod }}
    </div>
  </div>
</template>

<style scoped>

</style>
