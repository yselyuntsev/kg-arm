/* Import services */
import Api from '@/services/ApiService'
import Logs from '@/services/LogService'

export default {
  data () {
    return {
      online: true,
      timer: null
    }
  },

  created () {
    clearInterval(this.timer)
    this.timer = null
  },

  mounted () {
    this.checkServer()
    this.timer = setInterval(() => this.checkServer(), 10000)
  },

  beforeDestroy () {
    clearInterval(this.timer)
  },

  methods: {
    async checkServer () {
      try {
        await Api.status()
        this.online = true
      } catch (error) {
        Logs.error('Нет доступа к серверу', error)
        this.online = false
      }
    }
  }
}
