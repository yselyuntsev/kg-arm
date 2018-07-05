<template>
  <r-card>
    <div class="r-profile" :class="type">
      <img class="r-profile__photo" :src="data.encoded_photo">
      <div class="r-profile__extra">
        <p class="r-profile__title">{{ data.last_name + ' ' + data.first_name + ' ' + data.patronym }}</p>
        <p class="r-profile__description">Карточка сотрудника #: {{ data.card }}</p>
      </div>
    </div>
  </r-card>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
