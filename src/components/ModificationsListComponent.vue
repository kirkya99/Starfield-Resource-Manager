<script lang="ts">
import { defineComponent } from 'vue'
import { Notify, useQuasar } from 'quasar'
import { getModifications, Modification, Columns } from 'src/typescript/Modification'

export default defineComponent({
  name: 'ModificationsListComponent',
  data () {
    return {
      $q: useQuasar(),
      modifications: [] as Modification[],
      filteredModifications: [] as Modification[],
      selectedItem: null as Modification | null,
      myModifications: [] as Modification[],
      filterValue: '',
      modsColumns: Columns,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 20
      },
      deleteDialogOpened: false,
      toBeDeletedName: null as string | null,
      selectedButton: false
    }
  },
  created () {
    this.modifications = getModifications()
  },
  methods: {
    onSubmit () {
      if (this.selectedItem != null) {
        this.myModifications.push(this.selectedItem)
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
    },
    callDeleteDialog (row: { key: string }) {
      this.toBeDeletedName = row.key
      this.deleteDialogOpened = true
    },
    deleteRow () {
      const toBeRemovedModificationIndex: number | null = this.myModifications.findIndex(modification => modification.Modification === this.toBeDeletedName)

      if (toBeRemovedModificationIndex !== -1) {
        this.myModifications.splice(toBeRemovedModificationIndex, 1)
        Notify.create({
          type: 'positive',
          message: `${this.toBeDeletedName} removed from modifications list`,
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
  }
})
</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Modifications
    </div>
    <div class="col-md-9 col-y-xs-12">
      <q-form @submit="onSubmit" @reset="() => selectedItem = null" class="row text-body1 q-gutter-sm">
        <q-select outlined v-model="selectedItem" use-input input-debounce="0" label="Modifications"
                  :options="modifications" option-label="Modification" clearable dense style="width: 60%" />
        <q-btn align="around" type="submit" label="Add" color="primary" icon="add"/>
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

</template>

<style scoped>
.sticky-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}
</style>
