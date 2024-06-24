import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { addResources, Resource } from 'src/typescript/Resource'

export const useShoppingListStore = defineStore('shoppingList', () => {
  const shoppingList = ref<Resource[]>([])

  const addResource = (resources: Map<string, number>) => {
    shoppingList.value = addResources(resources, shoppingList.value)
    persistShoppingList()
  }

  const removeResource = (resourceName: string | null) => {
    const index = shoppingList.value.findIndex(s => s.resource === resourceName)
    if (index !== -1) {
      shoppingList.value.splice(index, 1)
      persistShoppingList()
    }
  }

  const persistShoppingList = () => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList.value))
  }

  const hydrateShoppingList = () => {
    const storedMShoppingList = localStorage.getItem('shoppingList')
    if (storedMShoppingList) {
      shoppingList.value = JSON.parse(storedMShoppingList)
    }
  }

  const clearShoppingList = () => {
    shoppingList.value = []
    localStorage.removeItem('shoppingList')
  }

  onMounted(() => hydrateShoppingList())

  return {
    shoppingList,
    addResource,
    removeResource,
    clearShoppingList
  }
})
