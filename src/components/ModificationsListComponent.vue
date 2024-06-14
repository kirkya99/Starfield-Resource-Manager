<script lang="ts">
import { defineComponent } from 'vue'
import modificationsJson from '../data/modifications.json'
import { Columns, Modification } from 'src/data/Modification'

export default defineComponent({
  name: 'ModificationsListComponent',

  data () {
    return {
      modifications: [] as Modification[],
      savedModifications: [],
      selectedMod: null
    }
  },
  created () {
    this.receiveModifications()
    console.log(this.modifications)
    console.log(Columns)
  },
  methods: {
    onSubmit () {
      if (this.selectedMod != null) {
        this.savedModifications.push(this.selectedMod)
        this.selectedMod = null
      }
    },
    validateModification (val: unknown): boolean | string {
      return !!val || 'Please select a modification'
    },
    receiveModifications () {
      this.modifications = modificationsJson.map(item => ({
        Modification: item.Modification,
        Type: item.Type,
        Slot: item.Slot,
        Resources: new Map<string, number>(Object.entries(item.Resources))
      }))
    }
  }
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="() => selectedMod = null">
    <div class="row justify-around items-center">
      <div class="col-8">
        <q-select filled v-model="selectedMod" :options="modifications" label="Modification" option-label="Modification" clearable use-input/>
      </div>
      <div class="col-3 ">
        <q-btn align="around" type="submit" label="Save modification" color="primary" icon="add" size="lg" :rules="[validateModification]" />
      </div>
    </div>
  </q-form>

  <div class="col-all">
    <!-- TODO: Add Tracked Modifications Table -->
    {{ selectedMod }}
  </div>
</template>

<style scoped>

</style>
