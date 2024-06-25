import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { Modification } from 'src/typescript/Modification'
import { CraftableResource, getCraftableResource } from 'src/typescript/CraftableResource'
import { StoreManager } from 'src/typescript/StoreManager'

export const useModificationListStore = defineStore('modificationList', () => {
  const modificationList = ref<Modification[]>([])
  const storeManager = new StoreManager()

  const addModification = (modification: Modification) => {
    modificationList.value.push(modification)
    const nonCraftableResourceList: Map<string, number> = new Map<string, number>()

    modification.resources.forEach((value, key) => {
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
    persistModifications()
  }

  const removeModification = (modificationName: string | null) => {
    const index = modificationList.value.findIndex(mod => mod.modification === modificationName)
    if (index !== -1) {
      modificationList.value.splice(index, 1)
      persistModifications()
    }
  }

  const persistModifications = () => {
    localStorage.setItem('modificationList', JSON.stringify(modificationList.value))
  }

  const hydrateModifications = () => {
    const storedModificationList = localStorage.getItem('modificationList')
    if (storedModificationList) {
      modificationList.value = JSON.parse(storedModificationList)
    }
  }

  const clearModificationList = () => {
    modificationList.value = []
    localStorage.removeItem('modifications')
  }

  onMounted(() => hydrateModifications())

  return {
    modificationList,
    addModification,
    removeModification,
    clearModificationList
  }
})
