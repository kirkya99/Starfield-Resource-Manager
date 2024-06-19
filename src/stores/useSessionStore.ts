import { Modification } from 'src/typescript/Modification'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const modifications = ref<Modification[]>([])
  const userId = ref<string>('')

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
    localStorage.removeItem('modifications')
  }

  const setUserId = (id: string) => {
    userId.value = id
    persistUserId()
  }

  const clearUserId = () => {
    userId.value = ''
    persistUserId()
  }

  const persistUserId = () => {
    if (userId.value !== '') {
      localStorage.setItem('userId', userId.value)
    } else {
      localStorage.removeItem('userId')
    }
  }

  const hydrateUserId = () => {
    const value: string | null = localStorage.getItem('userId')
    if (value) {
      userId.value = value
    }
  }

  onMounted(() => {
    hydrateModifications()
    hydrateUserId()
  })

  return {
    modifications,
    addModification,
    removeModification,
    clearModifications,
    userId,
    setUserId,
    clearUserId
  }
})
