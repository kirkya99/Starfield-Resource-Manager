import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
