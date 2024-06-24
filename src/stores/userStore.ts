import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const userId = ref<string>('')

  const setUserId = (id: string) => {
    userId.value = id
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

  const clearUserId = () => {
    userId.value = ''
    persistUserId()
  }

  onMounted(() => hydrateUserId())

  return {
    userId,
    setUserId,
    clearUserId
  }
})
