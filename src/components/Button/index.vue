<template>
  <button v-if="!link" class="r-button" :class="type">
    <i v-if="icon" class="material-icons">{{ icon }}</i>
    <slot></slot>
  </button>
  <router-link v-else :to="link" class="r-button" :class="type">
    <i v-if="icon" class="material-icons">{{ icon }}</i>
    <slot></slot>
  </router-link>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
