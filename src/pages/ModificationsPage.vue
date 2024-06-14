<script lang="ts">
import { defineComponent } from 'vue'
import AddItemComponent from 'components/AddItemComponent.vue'
import { Modification } from 'src/data/Modification'
import modificationsJson from '../data/modifications.json'

export default defineComponent({
  name: 'ModificationsPage',
  components: {
    AddItemComponent
  },
  data () {
    return {
      modifications: [] as Modification[]
    }
  },
  methods: {
    getModifications () : Modification[] {
      return modificationsJson.map(item => ({
        Modification: item.Modification,
        Type: item.Type,
        Slot: item.Slot,
        Resources: new Map<string, number>(Object.entries(item.Resources))
      }))
    },
    getModification (modification: Modification) {
      this.modifications.push(modification)
    }
  }
})
</script>

<template>
  <AddItemComponent :receive-items="getModifications" type="Modification" @addItemToWishlist="getModification"/>
</template>

<style scoped>

</style>
