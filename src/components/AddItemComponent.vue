<script lang="ts">
import { defineComponent } from 'vue'

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
      selectedItem: null
    }
  },
  created () {
    this.items = this.receiveItems()
  },
  methods: {
    onSubmit () {
      if (this.selectedItem != null) {
        this.$emit('addItemToWishlist', this.selectedItem)
        this.selectedItem = null
      }
    },
    validateModification (val: unknown): boolean | string {
      return !!val || `Please select a ${this.type}`
    }
  }
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="() => selectedItem = null">
    <div class="row justify-around items-center">
      <div class="col-8">
        <q-select filled v-model="selectedItem" :options="items" :label="type.toLowerCase()" :option-label="type" clearable use-input/>
      </div>
      <div class="col-3 ">
        <q-btn align="around" type="submit" label="Save modification" color="primary" icon="add" size="lg" :rules="[validateModification]" />
      </div>
    </div>
  </q-form>
</template>

<style scoped>

</style>
