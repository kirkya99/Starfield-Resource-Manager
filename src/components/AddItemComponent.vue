<script lang="ts">
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import { Modification } from 'src/data/Modification'

export default defineComponent({
  name: 'ModificationsListComponent',
  props: {
    receiveItems: {
      type: Function,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  emits: ['addItemToWishlist'],
  data () {
    return {
      items: [],
      selectedItem: null as Modification | null
    }
  },
  created () {
    this.items = this.receiveItems()
  },
  methods: {
    onSubmit () {
      if (this.selectedItem != null) {
        this.$emit('addItemToWishlist', this.selectedItem)
        Notify.create({
          type: 'positive',
          message: `${this.selectedItem.Modification} added to ${this.type} list`,
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
        this.selectedItem = null
      }
    },
    validateModification (value: Modification | null): boolean | string {
      if (!value) {
        return 'Selection is required'
      }
      return true
    }
  }
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="() => selectedItem = null">
    <div class="row items-center">
      <div class="col-8">
        <q-select filled v-model="selectedItem" :options="items" :label="type" :option-label="type" clearable use-input dense/>
      </div>
      <div class="col-4">
        <q-btn align="around" type="submit" label="Add" color="primary" icon="add" :rules="[validateModification]" />
      </div>
    </div>
  </q-form>
</template>

<style scoped>

</style>
