import { Modification } from 'src/typescript/Modification'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { addResources, Resource } from 'src/typescript/ShoppingList'

export const useSessionStore = defineStore('session', () => {
  // Attributes
  const modifications = ref<Modification[]>([])
  const userId = ref<string>('')
  const shoppingList = ref<Resource[]>([])

  // Setter
  const addModification = (modification: Modification) => {
    modifications.value.push(modification)
    persistModifications()
  }

  const setUserId = (id: string) => {
    userId.value = id
    persistUserId()
  }

  const addResourceToShoppingList = (resources: Map<string, number>) => {
    shoppingList.value = addResources(resources, shoppingList.value)
    persistShoppingList()
  }

  const removeModification = (modificationName: string | null) => {
    const index = modifications.value.findIndex(mod => mod.modification === modificationName)
    if (index !== -1) {
      modifications.value.splice(index, 1)
      persistModifications()
    }
  }

  const removeResourceFromShoppingList = (resourceName: string | null) => {
    const index = shoppingList.value.findIndex(s => s.resource === resourceName)
    if (index !== -1) {
      shoppingList.value.splice(index, 1)
      persistShoppingList()
    }
  }

  // Local storage: Persist
  const persistModifications = () => {
    localStorage.setItem('modifications', JSON.stringify(modifications.value))
  }

  const persistUserId = () => {
    if (userId.value !== '') {
      localStorage.setItem('userId', userId.value)
    } else {
      localStorage.removeItem('userId')
    }
  }

  const persistShoppingList = () => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList.value))
  }

  // Local storage: Hydrate
  const hydrateModifications = () => {
    const storedModifications = localStorage.getItem('modifications')
    if (storedModifications) {
      modifications.value = JSON.parse(storedModifications)
    }
  }

  const hydrateUserId = () => {
    const value: string | null = localStorage.getItem('userId')
    if (value) {
      userId.value = value
    }
  }

  const hydrateShoppingList = () => {
    const storedMShoppingList = localStorage.getItem('shoppingList')
    if (storedMShoppingList) {
      shoppingList.value = JSON.parse(storedMShoppingList)
    }
  }

  // Clear
  const clearModifications = () => {
    modifications.value = []
    localStorage.removeItem('modifications')
  }

  const clearUserId = () => {
    userId.value = ''
    persistUserId()
  }

  const clearShoppingList = () => {
    shoppingList.value = []
    localStorage.removeItem('shoppingList')
  }

  onMounted(() => {
    hydrateModifications()
    hydrateUserId()
    hydrateShoppingList()
  })

  return {
    modifications,
    addModification,
    removeModification,
    clearModifications,
    userId,
    setUserId,
    clearUserId,
    shoppingList,
    addResourceToShoppingList,
    removeResourceFromShoppingList,
    clearShoppingList
  }
})
