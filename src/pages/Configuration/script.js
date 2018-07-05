/* Import components */
import RAlert from '@/components/Alert'
import RButton from '@/components/Button'
import RCard from '@/components/Card'
import RInputField from '@/components/InputField'

/* Import services */
import Configuration from '@/services/ConfigurationService'
import Logs from '@/services/LogService'

export default {
  components: {
    RAlert,
    RButton,
    RCard,
    RInputField
  },

  data () {
    return {
      configuration: Configuration.getCurrent()
    }
  },

  methods: {
    saveConfiguration () {
      Configuration.store(this.configuration)
      this.$refs.success.open('Конфигурация успешно сохранена!', 'check')
      Logs.system('Изменение конфигурации', this.configuration)
      setTimeout(() => location.reload(), 500)
    }
  }
}
