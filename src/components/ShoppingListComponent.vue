<script setup lang="ts">
import { useSessionStore } from 'stores/useSessionStore'
import { columns } from 'src/typescript/ShoppingList'
import { Notify } from 'quasar'
import { ref } from 'vue'

const sessionStore = useSessionStore()
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  rowsPerPage: 20
})
const toBeDeletedName = ref<string | null>(null)
const deleteDialogOpened = ref<boolean>(false)

const callDeleteDialog = (row: { key: string }) => {
  toBeDeletedName.value = row.key
  deleteDialogOpened.value = true
}

const deleteRow = () => {
  if (toBeDeletedName.value) {
    sessionStore.removeResourceFromShoppingList(toBeDeletedName.value)
    Notify.create({
      type: 'positive',
      message: `${toBeDeletedName.value} removed from shopping list`,
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  } else {
    Notify.create({
      type: 'negative',
      message: 'Error while removing: Failed to remove item from shopping list',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  }
}
</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Shopping list
    </div>
    <div class="col-md-9 col-xs-12 q-mt-md">
      <q-table flat bordered :rows="sessionStore.shoppingList" :columns="columns" row-key="resource"
               :pagination="initialPagination" style="max-height: 65vh" class="sticky-header">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="sticky-header"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
            <q-btn flat round icon="delete" @click="callDeleteDialog(props)"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
  <!-- Delete dialog -->
  <q-dialog v-model="deleteDialogOpened" persistent>
    <q-card>
      <q-card-section avatar class="row items-center">
        <q-avatar icon="delete" text-color="negative"></q-avatar>
        <span class="q-ml-sm">{{ `Remove ${toBeDeletedName} from shopping list?` }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
        <q-btn label="Delete" color="negative" v-close-popup @click="deleteRow"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
