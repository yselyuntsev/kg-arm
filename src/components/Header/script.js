/* Import nested components */
import RFlat from '@/components/Flat'
import RLogo from '@/components/Logo'

export default {
  components: {
    RFlat,
    RLogo
  },

  data () {
    return {
      time: new Date().toLocaleString()
    }
  },

  computed: {
    navigation () {
      return location.href.split(`${location.origin}/`)[1] === 'info'
    }
  },

  mounted () {
    setInterval(() => (this.time = new Date().toLocaleString()), 1000)
  },

  methods: {
    reload () {
      location.reload()
    }
  }
}
