import { Modification } from 'src/typescript/Modification'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { addResources, Resource } from 'src/typescript/Resource'
import { CraftableResource, getCraftableResource } from 'src/typescript/CraftableResource'

export const useSessionStore = defineStore('session', () => {
  // Attributes
  const modifications = ref<Modification[]>([])
  const userId = ref<string>('')
  const shoppingList = ref<Resource[]>([])
  const craftableResources = ref <CraftableResource[]>([])

  // Setter
  const addModification = (modification: Modification) => {
    modifications.value.push(modification)
    const nonCraftable: Map<string, number> = new Map<string, number>()

    modification.resources.forEach((value, key) => {
      const resource: CraftableResource | undefined = getCraftableResource(key)
      if (resource) {
        console.log(`Manufactured: ${resource.name}`)
        addCraftableResource(resource)
      } else {
        nonCraftable.set(key, value)
      }
    })

    addResourceToShoppingList(nonCraftable)
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

  const addCraftableResource = (craftable: CraftableResource) => {
    craftable.resources.forEach((value, key) => console.log(`${key}: ${value}`))
    craftableResources.value.push(craftable)
    const nonCraftable: Map<string, number> = new Map<string, number>()

    craftable.resources.forEach((value, key) => {
      const resource: CraftableResource | undefined = getCraftableResource(key)
      if (resource) {
        addCraftableResource(resource)
      } else {
        nonCraftable.set(key, value)
      }
    })

    addResourceToShoppingList(nonCraftable)
    persistCraftables()
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

  const persistCraftables = () => {
    localStorage.setItem('craftableResources', JSON.stringify(craftableResources.value))
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

  const hydrateCraftableResources = () => {
    const storedModifications = localStorage.getItem('craftableResources')
    if (storedModifications) {
      craftableResources.value = JSON.parse(storedModifications)
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
    hydrateCraftableResources()
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
