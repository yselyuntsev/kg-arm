<template>
  <div id="logs">
    <r-card style="padding: 1rem" class="r-card--logs">
      <div style="display: flex; justify-content: space-between;">
        <h2>Логи</h2>
        <r-button @click.native="clear()">Очистить логи</r-button>
      </div>

      <br>

      <r-log v-for="(log, index) in logs" :key="index" :data="log" :type="log.type"></r-log>
    </r-card>
  </div>
</template>

<script src="./script.js"></script>
