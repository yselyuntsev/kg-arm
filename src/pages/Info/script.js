/* Import components */
import RAlert from '@/components/Alert'
import RCard from '@/components/Card'
import RLock from '@/components/Lock'
import RProfile from '@/components/Profile'
import RReader from '@/components/Reader'
import RStatus from '@/components/Status'
import RTable from '@/components/Table'

/* Import services */
import Sockets from '@/services/SocketsService'

export default {
  components: {
    RAlert,
    RCard,
    RLock,
    RProfile,
    RReader,
    RStatus,
    RTable
  },

  data () {
    return {
      keys: [],
      employee: null
    }
  },

  mounted () {
    Sockets.open()

    Sockets.on(data => {
      switch (data.type) {
        case 'person':
          this.employee = data.body
          break

        case 'keys':
          this.keys = data.body
          break
      }
    })
  },

  beforeDestroy () {
    Sockets.close()
  }
}
