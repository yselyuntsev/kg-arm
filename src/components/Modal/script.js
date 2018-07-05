/* Import nested components */
import RButton from '@/components/Button'
import RInputField from '@/components/InputField'

export default {
  props: {
    title: [String, Number],
    scrollable: Boolean
  },

  components: {
    RButton,
    RInputField
  },

  data () {
    return {
      show: false,
      key: {},
      employee: {}
    }
  },

  computed: {
    scroll () {
      return this.scrollable ? 'scrollable' : 0
    }
  },

  methods: {
    open (key) {
      this.show = true
      this.key = key
    },

    returnKey () {
      this.$emit('returnKey', {id: this.key.id, taken_by: this.key.taken_by})
      this.close()
    },

    close () {
      this.show = false
    }
  }
}
