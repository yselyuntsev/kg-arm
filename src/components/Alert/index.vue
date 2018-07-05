<template>
  <transition name="fade">
    <div v-show="show" @click="hide" class="splash">
      <transition name="push">
        <div v-show="show" class="r-alert">
          <i v-if="icon" class="material-icons">{{ icon }}</i>
          <span>{{ message }}</span>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
