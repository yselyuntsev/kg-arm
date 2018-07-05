/* Import components */
import RAlert from '@/components/Alert'
import RButton from '@/components/Button'
import RCard from '@/components/Card'
import RLoader from '@/components/Loader'
import RLock from '@/components/Lock'
import RModal from '@/components/Modal'
import RProfile from '@/components/Profile'
import RReader from '@/components/Reader'
import RStatus from '@/components/Status'
import RTable from '@/components/Table'

/* Import services */
import Api from '@/services/ApiService'
import Logs from '@/services/LogService'
import Sockets from '@/services/SocketsService'

export default {
  components: {
    RAlert,
    RButton,
    RCard,
    RLoader,
    RLock,
    RModal,
    RProfile,
    RReader,
    RStatus,
    RTable
  },

  data () {
    return {
      keys: [],
      employeeKeys: [],
      person: null,
      index: null
    }
  },

  mounted () {
    Sockets.open()
    this.getTakenKeys()
  },

  beforeDestroy () {
    Sockets.close()
  },

  computed: {
    cardStyle () {
      return this.person ? 'r-card--person' : ''
    }
  },

  methods: {
    enter (id) {
      this.person ? this.takeOrReturnKey(id, this.person.id) : this.getPersonInfo(id)
    },

    async addKeys (from, keys = [], date = '', taken_by = '') {
      for (let key of from) {
        let current_key = (await Api.getKeyById(key.key_id)).data.data.key

        if (this.person) {
          date = new Date().toLocaleString()
          taken_by = this.person.id
          Logs.event('Взятие ключа', current_key)
        } else {
          date = new Date(key.taken_at).toLocaleString()
          taken_by = key.taken_by
        }
        current_key.date = date
        current_key.taken_by = taken_by
        keys.unshift(current_key)
      }
      return keys
    },

    async getTakenKeys () {
      try {
        let keys = (await Api.getTakenKeys()).data.data.keys
        this.keys = await this.addKeys(keys)
      } catch (error) {
        this.$refs.info.open('Ошибка получения взятых ключей', 'error_outline')
      }
    },

    async getPersonInfo (cardID) {
      try {
        if (!this.person) {
          this.person = (await Api.getEmployeeByCardId(cardID)).data.data.employee
          let keys = ((await Api.getEmployeeTakenKeys(this.person.id)).data.data.keys)
          this.employeeKeys = await this.addKeys(keys, this.employeeKeys)
          
          Logs.person('Идентификация сотрудника', this.person)

          try {
            Sockets.send('person', this.person)
            Sockets.send('keys', this.employeeKeys)
          } catch (error) {
            Logs.error('Веб-сокеты недоступны', error)
          }
        }
      } catch (error) {
        this.$refs.info.open('Извините, сотрудник не найден', 'error_outline')
        Logs.error('Сотрудник не найден', error)
      }
    },

    async takeOrReturnKey (keyID, employeeID) {
      try {
        let key = (await Api.takeOrReturnKey(keyID, employeeID)).data.data
        let type = ''
        
        if (key.action === 'take') {
          type = 'взят'
          this.employeeKeys = await this.addKeys([key], this.employeeKeys)
        } else {
          type = 'сдан'
          let index = this.employeeKeys.findIndex(key => key.id === keyID)
          this.employeeKeys.splice(index, 1)
        }
        Sockets.send('keys', this.employeeKeys)
        this.$refs.info.open(`Ключ успешно ${type}!`, 'check')
      } catch (error) {
        console.log(error)
        this.$refs.info.open('Не возможно взять/сдать ключ', 'error_outline')
      }
    },

    async finish () {
      this.person = null
      this.employeeKeys = []
      await this.getTakenKeys()
      try {
        Sockets.send('person', null)
        Sockets.send('keys', [])
      } catch (error) {
        Logs.error('Веб-сокеты недоступны', error)
      }
    },

    selectKey (data, keys = []) {
      this.person ? keys = this.employeeKeys : keys = this.keys
      this.index = keys.findIndex(key => key.id === data.id)
      this.$refs.modular.open(data)
    },

    returnKey (data) {
      this.takeOrReturnKey(data.id, data.taken_by)
      this.person ? this.employeeKeys.splice(this.index, 1) : this.keys.splice(this.index, 1)
    }
  }
}
