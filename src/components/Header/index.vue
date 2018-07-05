<template>
  <div class="r-header">
    <r-logo></r-logo>
    <nav v-if="!navigation" class="r-nav">
      <r-flat link="/">
        <i class="material-icons">home</i> Главный экран
      </r-flat>
      <r-flat link="/configuration">
        <i class="material-icons">settings</i> Конфигурация
      </r-flat>
      <r-flat link="/logs">
        <i class="material-icons">view_stream</i> Логи
      </r-flat>
      <r-flat @click.native="reload()" style="margin-left: 3rem">
        <i class="material-icons">refresh</i> Обновить
      </r-flat>
    </nav>
    <span class="r-header__time">{{ time }}</span>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
