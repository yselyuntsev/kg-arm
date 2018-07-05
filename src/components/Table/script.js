/* Import nested components */
import RLoader from '@/components/Loader'

export default {
  name: 'RTable',

  props: {
    data: {
      type: Array,
      required: true
    },

    small: Boolean
  },

  components: {
    RLoader
  },

  computed: {
    smallFont () {
      return this.small ? 'small' : 0
    }
  },

  methods: {
    sendData (row) {
      this.$emit('send', row)
    }
  }
}
