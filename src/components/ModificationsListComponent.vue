<script lang="ts">
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import { getModifications, Modification } from 'src/data/Modification'

export default defineComponent({
  name: 'ModificationsListComponent',
  data () {
    return {
      modifications: [] as Modification[],
      selectedItem: null as Modification | null,
      filterValue: null as string | null
    }
  },
  created () {
    this.modifications = getModifications()
  },
  methods: {
    onSubmit () {
      if (this.selectedItem != null) {
        this.$emit('addItemToWishlist', this.selectedItem)
        Notify.create({
          type: 'positive',
          message: `${this.selectedItem.Modification} added to modifications list`,
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
        this.selectedItem = null
      } else {
        Notify.create({
          type: 'negative',
          message: 'Error: No modification selected.',
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
      }
    }
  }
})
</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Modifications
    </div>
    <div class="col-md-9 col-y-xs-12">
      <q-form @submit="onSubmit" @reset="() => selectedItem = null" class="row text-body1 q-gutter-sm" >
        <q-select outlined v-model="selectedItem" use-input input-debounce="0" label="Modifications"
                  :options="modifications" option-label="Modification" clearable dense/>
        <q-btn align="around" type="submit" label="Add" color="primary" icon="add"/>
      </q-form>
    </div>
    <div class="col-md-9 col-xs-12 bg-red-8 q-mt-md" style="height: 500px">

    </div>
  </div>
</template>

<style scoped>

</style>
