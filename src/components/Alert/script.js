export default {
  data () {
    return {
      show: false,
      message: '',
      icon: ''
    }
  },

  methods: {
    open (message, icon) {
      this.message = message
      this.show = true
      this.icon = icon

      setTimeout(() => (this.show = false), 800)
    },

    hide () {
      this.show = false
    }
  }
}
