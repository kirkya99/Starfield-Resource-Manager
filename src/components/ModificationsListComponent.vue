<script setup lang="ts">

import { ref, watch } from 'vue'
import { Notify } from 'quasar'
import { Columns, getModifications, Modification, ModificationType, radioOptions } from 'src/typescript/Modification'
import typesJson from 'src/json/types.json'
import slotsJson from 'src/json/slots.json'
import { getResources, Resource } from 'src/typescript/Resource'
import { StoreManager } from 'src/typescript/StoreManager'

const storeManager = new StoreManager()
const types = typesJson
const slots = slotsJson

const modificationOptions = ref<Modification[]>(getModifications())
const modResourcesList = ref<Resource[]>([{ resource: '', amount: 0 }])
const typesOptions = ref(types)
const slotsOptions = ref(slots)
const resourcesOptions = ref<string[]>(getResources())

const selectedItem = ref<Modification | null>(null)
const modsColumns = ref<typeof Columns>(Columns)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  rowsPerPage: 20
})
const deleteDialogOpened = ref(false)
const toBeDeletedName = ref<string | null>(null)
const addDialogOpened = ref<boolean>(false)
const radioOption = ref<ModificationType>(ModificationType.Existing)

const modName = ref<string>('')
const modType = ref<string>('')
const modSlot = ref<string>('')
const modResources = ref<Map<string, number>>(new Map<string, number>())

const onSubmit = () => {
  switch (radioOption.value) {
    case ModificationType.Existing:
      if (selectedItem.value !== null) {
        storeManager.modificationListStore.addModification(selectedItem.value)
        Notify.create({
          type: 'positive',
          message: `${selectedItem.value.modification} added to modifications list`,
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
        onClose()
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
      break
    case ModificationType.Custom:
      if (selectedItem.value) {
        storeManager.modificationListStore.addModification(selectedItem.value)
        Notify.create({
          type: 'positive',
          message: `${selectedItem.value.modification} added to modifications list`,
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
          message: 'Error: Input fields not correctly filled.',
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
      }
      break
  }
}

const callDeleteDialog = (row: { key: string }) => {
  toBeDeletedName.value = row.key
  deleteDialogOpened.value = true
}

const deleteRow = () => {
  if (toBeDeletedName.value) {
    storeManager.modificationListStore.removeModification(toBeDeletedName.value)
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

function filterModifications (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    modificationOptions.value = getModifications().filter(m => m.modification.toLocaleLowerCase().includes(needle))
  })
}

function filterTypes (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    typesOptions.value = types.filter(r => r.toLowerCase().indexOf(needle) > -1)
  })
}

function filterSlots (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    slotsOptions.value = slots.filter(r => r.toLowerCase().indexOf(needle) > -1)
  })
}

function filterResources (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    resourcesOptions.value = getResources().filter(r => r.toLowerCase().indexOf(needle) > -1)
  })
}

function updateResourcesMap () {
  const resMap = new Map<string, number>()
  modResourcesList.value.forEach(value => {
    if (value.resource !== '') {
      resMap.set(value.resource, value.amount)
    }
  })
  modResources.value = resMap
  modResourcesList.value.push({ resource: '', amount: 0 })

  selectedItem.value = {
    modification: modName.value,
    type: modType.value,
    slot: modSlot.value,
    description: `${modName.value} is a custom modification`,
    resources: resMap
  }
}

function removeResFromList (index: number) {
  modResourcesList.value.splice(index, 1)

  const resMap = new Map<string, number>()
  modResourcesList.value.forEach(value => {
    if (value.resource !== '') {
      resMap.set(value.resource, value.amount)
    }
  })
  modResources.value = resMap

  selectedItem.value = {
    modification: modName.value,
    type: modType.value,
    slot: modSlot.value,
    description: `${modName.value} is a custom modification`,
    resources: resMap
  }
}

const onClose = () => {
  radioOption.value = ModificationType.Existing
}

watch(radioOption, () => {
  selectedItem.value = null
  modName.value = ''
  modType.value = ''
  modSlot.value = ''
  modResourcesList.value = [{ resource: '', amount: 0 }]
  modResources.value = new Map<string, number>()
})

</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Modifications
      <q-btn align="around" label="Add" color="primary" icon="add" @click="() => addDialogOpened = true"
             class="float-right"/>
    </div>

    <div class="col-md-9 col-xs-12 q-mt-md">
      <q-table flat bordered :rows="storeManager.modificationListStore.modificationList" :columns="modsColumns" row-key="modification"
               :pagination="initialPagination" style="max-height: 65vh" class="table-preset" dark>
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

  <!--  Add Dialog -->
  <q-dialog v-model="addDialogOpened" persistent>
    <q-card class="max-width">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="q-col-gutter-y-md">
            <div class="text-h6">Add Modification</div>

            <div>
              <div class="text-body1">Select modification type</div>
              <q-option-group :options="radioOptions" v-model="radioOption" type="radio"/>
            </div>

            <div>
              <div class="text-body1 disabled" v-show="radioOption === ModificationType.Custom">Select existing
                modification
              </div>
              <div class="text-body1" v-show="radioOption === ModificationType.Existing">Select existing modification
              </div>
              <q-select v-model="selectedItem" use-input input-debounce="0" label="Modifications"
                        :options="modificationOptions" option-label="modification"
                        clearable @filter="filterModifications"
                        :disable="radioOption === ModificationType.Custom" :hide-selected="radioOption === ModificationType.Custom">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <div class="text-body1 disabled " v-show="radioOption === ModificationType.Existing">
                  Create custom modification
              </div>
              <div class="text-body1" v-show="radioOption === ModificationType.Custom">Create custom modification</div>
              <q-input v-model="modName" label="Name" clearable :disable="radioOption === ModificationType.Existing"/>
              <q-select v-model="modType" use-input input-debounce="0" label="Type" :options="typesOptions"
                        @filter="filterTypes" :disable="radioOption === ModificationType.Existing" new-value-mode="add"
                        @on-new-value="(value: string) => modType = value" clearable/>
              <q-select v-model="modSlot" use-input input-debounce="0" label="Slot" :options="slotsOptions"
                        @filter="filterSlots" :disable="radioOption === ModificationType.Existing"
                        new-value-mode="add" @on-new-value="(value: string) => modSlot = value" clearable/>

              <div v-for="(resource, index) in modResourcesList" :key="index" class="row justify-between">
                <div class="col-7">
                  <q-select v-model="resource.resource" use-input input-debounce="0" label="Resource"
                            :options="resourcesOptions"
                            @filter="filterResources" :disable="radioOption === ModificationType.Existing"
                            new-value-mode="add" @on-new-value="(value: string) => resource.resource = value"
                            clearable emit-value map-options/>
                </div>
                <div class="col-2">
                  <q-input
                    v-model="resource.amount"
                    type="number"
                    label="Amount"
                    :disable="radioOption === ModificationType.Existing"/>
                </div>
                <div class="col-2 column items-center">
                  <q-btn flat :disable="radioOption === ModificationType.Existing || modResourcesList.length === 1" class="max-dim" icon="delete" color="primary" @click="removeResFromList(index)"/>
                </div>
              </div>
              <div class="col-12 q-pt-sm">
                <q-btn :disable="radioOption === ModificationType.Existing" color="primary" icon="add"
                       style="width: 100%" @click="updateResourcesMap"/>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
          <q-btn type="submit" label="Save" color="primary" v-close-popup :disable="selectedItem === null"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
