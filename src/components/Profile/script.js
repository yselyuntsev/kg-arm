/* Import nested components */
import RCard from '@/components/Card'

export default {
  components: {
    RCard
  },

  props: {
    type: String,
    data: {
      type: Object,
      required: true
    }
  }
}
