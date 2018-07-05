<template>
  <router-link v-if="link" :to="link" class="r-flat"><slot></slot></router-link>
  <button v-else class="r-flat"><slot></slot></button>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
