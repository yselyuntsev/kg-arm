<template>
  <div class="r-input">
    <label class="r-label" v-if="label" :for="id">{{ label }}</label>
    <input
      class="r-input__field"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
