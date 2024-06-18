<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Notify } from 'quasar'
import { getModifications, Modification, Columns } from 'src/typescript/Modification'

const modifications = ref<Modification[]>([])
const selectedItem = ref<Modification | null>(null)
const myModifications = ref<Modification[]>([])
const modsColumns = ref<typeof Columns>(Columns)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  rowsPerPage: 20
})
const deleteDialogOpened = ref(false)
const toBeDeletedName = ref<string | null>(null)

onMounted(() => {
  modifications.value = getModifications()
})

const onSubmit = () => {
  if (selectedItem.value != null) {
    myModifications.value.push(selectedItem.value)
    Notify.create({
      type: 'positive',
      message: `${selectedItem.value.Modification} added to modifications list`,
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
    selectedItem.value = null
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

const callDeleteDialog = (row: { key: string }) => {
  toBeDeletedName.value = row.key
  deleteDialogOpened.value = true
}

const deleteRow = () => {
  const toBeRemovedModificationIndex: number | null = myModifications.value.findIndex(modification => modification.Modification === toBeDeletedName.value)

  if (toBeRemovedModificationIndex !== -1) {
    myModifications.value.splice(toBeRemovedModificationIndex, 1)
    Notify.create({
      type: 'positive',
      message: `${toBeDeletedName.value} removed from modifications list`,
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  } else {
    Notify.create({
      type: 'negative',
      message: 'Error while removing: Failed to remove item from modifications list',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  }
}

function filterFn (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    modifications.value = getModifications().filter(m => m.Modification.toLocaleLowerCase().includes(needle))
  })
}
</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Modifications
    </div>
    <div class="col-md-9 col-y-xs-12">
      <q-form @submit="onSubmit" @reset="() => selectedItem = null" class="row text-body1 q-gutter-sm">
        <q-select v-model="selectedItem" use-input input-debounce="0" label="Modifications"
                  :options="modifications" option-label="Modification"
                  clearable dense @filter="filterFn" style="width: 100%">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-btn align="around" type="submit" label="Add" color="primary" icon="add" :disabled="selectedItem === null"/>
      </q-form>
    </div>
    <div class="col-md-9 col-xs-12 q-mt-md">
      <q-table flat bordered :rows="myModifications" :columns="modsColumns" row-key="Modification"
               :pagination="initialPagination" style="max-height: 70vh">
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
        <span class="q-ml-sm">{{ `Remove ${toBeDeletedName} from modifications list?` }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
        <q-btn label="Delete" color="negative" v-close-popup @click="deleteRow"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

<!-- TODO: Add Details dialog -->
</template>

<style scoped>

</style>
