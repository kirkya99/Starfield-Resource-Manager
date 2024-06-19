import { Modification } from 'src/typescript/Modification'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const modifications = ref<Modification[]>([])

  const addModification = (modification: Modification) => {
    modifications.value.push(modification)
    persistModifications()
  }

  const removeModification = (modificationName: string | null) => {
    const index = modifications.value.findIndex(mod => mod.Modification === modificationName)
    if (index !== -1) {
      modifications.value.splice(index, 1)
      persistModifications()
    }
  }

  const persistModifications = () => {
    localStorage.setItem('modifications', JSON.stringify(modifications.value))
  }

  const hydrateModifications = () => {
    const storedModifications = localStorage.getItem('modifications')
    if (storedModifications) {
      modifications.value = JSON.parse(storedModifications)
    }
  }

  const clearModifications = () => {
    modifications.value = []
    persistModifications()
  }

  onMounted(() => hydrateModifications())

  return {
    modifications,
    addModification,
    removeModification,
    persistModifications,
    hydrateModifications,
    clearModifications
  }
})
