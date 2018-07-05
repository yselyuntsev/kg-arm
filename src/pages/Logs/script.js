/* Import components */
import RButton from '@/components/Button'
import RCard from '@/components/Card'
import RLog from '@/components/Log'

/* Import services */
import Logs from '@/services/LogService'

export default {
  components: {
    RButton,
    RCard,
    RLog
  },

  data () {
    return {
      logs: Logs.getLogs()
    }
  },

  methods: {
    clear () {
      Logs.clear()
      this.logs = []
    }
  }
}
