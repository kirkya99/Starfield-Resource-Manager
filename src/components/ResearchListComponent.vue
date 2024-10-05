<script setup lang="ts">

import { ref, watch } from 'vue'
import { Notify } from 'quasar'
import { getResearchItems, ResearchItem, columns, ResearchType, radioOptions } from 'src/typescript/Research'
import researchCategories from 'src/json/reseach_categories.json'
import { getResources, Resource } from 'src/typescript/Resource'
import { StoreManager } from 'src/typescript/StoreManager'

const storeManager = new StoreManager()
const categories = researchCategories

const researchItemOptions = ref<ResearchItem[]>(getResearchItems())
const researchResourcesList = ref<Resource[]>([{ resource: '', amount: 0 }])
const categoriesOptions = ref(categories)

const selectedItem = ref<ResearchItem | null>(null)
const researchColumns = ref<typeof columns>(columns)
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  rowsPerPage: 20
})
const deleteDialogOpened = ref(false)
const toBeDeletedName = ref<string | null>(null)
const addDialogOpened = ref<boolean>(false)
const radioOption = ref<ResearchType>(ResearchType.Existing)

const researchName = ref<string>('')
const researchCategory = ref<string>('')
const researchResources = ref<Map<string, number>>(new Map<string, number>())
const resourcesOptions = ref<string[]>(getResources())

const onSubmit = () => {
  switch (radioOption.value) {
    case ResearchType.Existing:
      if (selectedItem.value !== null) {
        storeManager.researchItemsListStore.addResearchItem(selectedItem.value)
        Notify.create({
          type: 'positive',
          message: `${selectedItem.value.name} added to research items list`,
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
          message: 'Error: No research item selected.',
          actions: [
            {
              icon: 'close',
              color: 'white'
            }]
        })
      }
      break
    case ResearchType.Custom:
      if (selectedItem.value) {
        storeManager.researchItemsListStore.addResearchItem(selectedItem.value)
        Notify.create({
          type: 'positive',
          message: `${selectedItem.value.name} added to research items list`,
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
    storeManager.researchItemsListStore.removeResearchItem(toBeDeletedName.value)
    Notify.create({
      type: 'positive',
      message: `${toBeDeletedName.value} removed from research items list`,
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  } else {
    Notify.create({
      type: 'negative',
      message: 'Error while removing: Failed to remove item from research items list',
      actions: [
        {
          icon: 'close',
          color: 'white'
        }]
    })
  }
}

function filterResearchItems (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    researchItemOptions.value = getResearchItems().filter(m => m.name.toLocaleLowerCase().includes(needle))
  })
}

function filterCategories (val: string, update: (callback: () => void) => void, abort: () => void) {
  if (val.length < 2) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLocaleLowerCase()
    categoriesOptions.value = categoriesOptions.value.filter(r => r.toLowerCase().indexOf(needle) > -1)
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
  researchResourcesList.value.forEach(value => {
    if (value.resource !== '') {
      resMap.set(value.resource, value.amount)
    }
  })
  researchResources.value = resMap
  researchResourcesList.value.push({ resource: '', amount: 0 })

  selectedItem.value = {
    name: researchName.value,
    category: researchCategory.value,
    resources: resMap,
    requirements: [],
    skills: [],
    unlocks: []
  }
}

function removeResFromList (index: number) {
  researchResourcesList.value.splice(index, 1)

  const resMap = new Map<string, number>()
  researchResourcesList.value.forEach(value => {
    if (value.resource !== '') {
      resMap.set(value.resource, value.amount)
    }
  })
  researchResources.value = resMap

  selectedItem.value = {
    name: researchName.value,
    category: researchCategory.value,
    resources: resMap,
    requirements: [],
    skills: [],
    unlocks: []
  }
}

const onClose = () => {
  radioOption.value = ResearchType.Existing
}

watch(radioOption, () => {
  selectedItem.value = null
  researchName.value = ''
  researchCategory.value = ''
  researchResourcesList.value = [{ resource: '', amount: 0 }]
  researchResources.value = new Map<string, number>()
})

</script>

<template>
  <div class="row justify-center q-gutter-y-sm">
    <div class="col-md-9 col-xs-12 text-h5">
      Research
      <q-btn align="around" label="Add" color="primary" icon="add" @click="() => addDialogOpened = true"
             class="float-right"/>
    </div>

    <div class="col-md-9 col-xs-12 q-mt-md">
      <q-table flat bordered :rows="storeManager.researchItemsListStore.researchItemsList" :columns="researchColumns"
               row-key="modification"
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
        <span class="q-ml-sm">{{ `Remove ${toBeDeletedName} from research items list?` }}</span>
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
            <div class="text-h6">Add Research item</div>

            <div>
              <div class="text-body1">Select research item type</div>
              <q-option-group :options="radioOptions" v-model="radioOption" type="radio"/>
            </div>

            <div>
              <div class="text-body1 disabled" v-show="radioOption === ResearchType.Custom">Select existing
                research item
              </div>
              <div class="text-body1" v-show="radioOption === ResearchType.Existing">Select existing research item
              </div>
              <q-select v-model="selectedItem" use-input input-debounce="0" label="Reseach item"
                        :options="researchItemOptions" option-label="name"
                        clearable @filter="filterResearchItems"
                        :disable="radioOption === ResearchType.Custom" :hide-selected="radioOption === ResearchType.Custom">
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
              <div class="text-body1 disabled " v-show="radioOption === ResearchType.Existing">
                Create custom research item
              </div>
              <div class="text-body1" v-show="radioOption === ResearchType.Custom">Create custom research item</div>
              <q-input v-model="researchName" label="Name" clearable :disable="radioOption === ResearchType.Existing"/>
              <q-select v-model="researchCategory" use-input input-debounce="0" label="Category" :options="categoriesOptions"
                        @filter="filterCategories" :disable="radioOption === ResearchType.Existing" new-value-mode="add"
                        @on-new-value="(value: string) => researchCategory = value" clearable/>

              <div v-for="(resource, index) in researchResourcesList" :key="index" class="row justify-between">
                <div class="col-7">
                  <q-select v-model="resource.resource" use-input input-debounce="0" label="Resource"
                            :options="resourcesOptions"
                            @filter="filterResources" :disable="radioOption === ResearchType.Existing"
                            new-value-mode="add" @on-new-value="(value: string) => resource.resource = value"
                            clearable emit-value map-options/>
                </div>
                <div class="col-2">
                  <q-input
                    v-model="resource.amount"
                    type="number"
                    label="Amount"
                    :disable="radioOption === ResearchType.Existing"/>
                </div>
                <div class="col-2 column items-center">
                  <q-btn flat :disable="radioOption === ResearchType.Existing || researchResourcesList.length === 1" class="max-dim" icon="delete" color="primary" @click="removeResFromList(index)"/>
                </div>
              </div>
              <div class="col-12 q-pt-sm">
                <q-btn :disable="radioOption === ResearchType.Existing" color="primary" icon="add"
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
