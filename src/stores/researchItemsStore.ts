import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { ResearchItem } from 'src/typescript/Research'
import { CraftableResource, getCraftableResource } from 'src/typescript/CraftableResource'
import { StoreManager } from 'src/typescript/StoreManager'

export const useResearchItemsStore = defineStore('researchItemsList', () => {
  const researchItemsList = ref<ResearchItem[]>([])
  const storeManager = new StoreManager()

  const addResearchItem = (researchItem: ResearchItem) => {
    researchItemsList.value.push(researchItem)
    const nonCraftableResourceList: Map<string, number> = new Map<string, number>()

    researchItem.resources.forEach((value, key) => {
      const resource: CraftableResource | undefined = getCraftableResource(key)
      if (resource) {
        for (let i = 0; i < value; i++) {
          storeManager.craftableResourceListStore.addCraftableResource(resource)
        }
      } else {
        nonCraftableResourceList.set(key, value)
      }
    })

    storeManager.shoppingListStore.addResource(nonCraftableResourceList)
    persistResearchItemsList()
  }

  const removeResearchItem = (researchItemName: string | null) => {
    const index = researchItemsList.value.findIndex(resItem => resItem.name === researchItemName)
    if (index !== -1) {
      researchItemsList.value.splice(index, 1)
      persistResearchItemsList()
    }
  }

  const persistResearchItemsList = () => {
    localStorage.setItem('modificationList', JSON.stringify(researchItemsList.value))
  }

  const hydrateModifications = () => {
    const storedModificationList = localStorage.getItem('researchItemsList')
    if (storedModificationList) {
      researchItemsList.value = JSON.parse(storedModificationList)
    }
  }

  const clearModificationList = () => {
    researchItemsList.value = []
    localStorage.removeItem('researchItem')
  }

  onMounted(() => hydrateModifications())

  return {
    researchItemsList,
    addResearchItem,
    removeResearchItem,
    clearModificationList
  }
})
