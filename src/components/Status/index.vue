<template>
  <div v-if="online" class="r-status">
    <span class="r-status__indicator online"></span>
    Сервер онлайн
  </div>

  <div v-else class="r-offline">
    <img class="r-offline__image" src="@/assets/images/lock.svg">
    <h2>Сервер временно недоступен</h2>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
