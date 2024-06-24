import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { CraftableResource, getCraftableResource } from 'src/typescript/CraftableResource'
import { StoreManager } from 'src/typescript/StoreManager'

export const useCraftableResourceListStore = defineStore('craftableResourceList', () => {
  const craftableResourceList = ref <CraftableResource[]>([])
  const storeManager = new StoreManager()

  const addCraftableResource = (craftable: CraftableResource) => {
    console.log(craftable)
    craftableResourceList.value.push(craftable)
    const nonCraftableResourceList: Map<string, number> = new Map<string, number>()

    craftable.resources.forEach((value, key) => {
      const resource: CraftableResource | undefined = getCraftableResource(key)
      if (resource) {
        addCraftableResource(resource)
      } else {
        nonCraftableResourceList.set(key, value)
      }
    })

    storeManager.shoppingListStore.addResource(nonCraftableResourceList)
    persistCraftableResourceList()
  }

  const persistCraftableResourceList = () => {
    localStorage.setItem('craftableResourceList', JSON.stringify(craftableResourceList.value))
  }

  const removeCraftableResource = (craftableResourceName: string | null) => {
    const index = craftableResourceList.value.findIndex(mod => mod.name === craftableResourceName)
    if (index !== -1) {
      craftableResourceList.value.splice(index, 1)
      persistCraftableResourceList()
    }
  }

  const hydrateCraftableResourceList = () => {
    const storedcraftableResourceList = localStorage.getItem('craftableResourceList')
    if (storedcraftableResourceList) {
      craftableResourceList.value = JSON.parse(storedcraftableResourceList)
    }
  }

  const clearCraftableResourceList = () => {
    craftableResourceList.value = []
    localStorage.removeItem('craftableResourceList')
  }

  onMounted(() => hydrateCraftableResourceList())

  return {
    craftableResourceList,
    addCraftableResource,
    removeCraftableResource,
    clearCraftableResourceList
  }
})
