<script lang="ts">
import { defineComponent } from 'vue'
import ModificationsListComponent from 'components/ModificationsListComponent.vue'
import { Modification } from 'src/data/Modification'
import modificationsJson from '../data/modifications.json'

export default defineComponent({
  name: 'ModificationsPage',
  components: {
    ModificationsListComponent
  },
  data () {
    return {
      modifications: [] as Modification[]
    }
  },
  methods: {
    getModifications (): Modification[] {
      return modificationsJson.map(item => ({
        Modification: item.Modification,
        Type: item.Type,
        Slot: item.Slot,
        Resources: new Map<string, number>(Object.entries(item.Resources))
      }))
    },
    getModification (modification: Modification) {
      this.modifications.push(modification)
    },
    filterFunction (item: Modification, needle: string) {
      return item.Modification.toLocaleLowerCase().includes(needle)
    }
  }
})
</script>

<template>
  <q-page padding>
    <ModificationsListComponent />
  </q-page>
</template>

<style scoped>

</style>
