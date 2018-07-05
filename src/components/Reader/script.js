export default {
  mounted () {
    let input = document.getElementById('r-reader')
    input.focus()
    input.addEventListener('blur', () => {
      input.focus()
    })

    input.addEventListener('keydown', (e) => {
      var key = e.which || e.keyCode
      if (key === 13 && input.value.trim() !== '') {
        this.$emit('enter', input.value.trim())
        input.value = ''
      }
    })
  }
}
