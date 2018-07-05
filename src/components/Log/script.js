export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    employeeStack (employee) {
      let data = employee
      delete data.encoded_photo
      return data
    }
  }
}
