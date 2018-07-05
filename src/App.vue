<template>
  <div id="app">
    <r-header></r-header>

    <r-content>
      <router-view></router-view>
    </r-content>
  </div>
</template>

<script>
import RHeader from '@/components/Header'
import RContent from '@/components/Content'

export default {
  components: {
    RHeader,
    RContent
  }
}
</script>

<style lang="less">
@import './assets/styles/normalize.css';
@import './assets/styles/base';
@import './assets/styles/grid';
@import './assets/styles/typography';
</style>
