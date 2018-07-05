<template>
  <div id="info">
    <r-lock v-if="!employee" title="Поднесите Идентификационную карточку к считывателю" type="rfid"></r-lock>
    <r-profile v-if="employee" type="small" style="margin-bottom: 3rem" :data="employee"></r-profile>

    <h2>Активные ключи</h2>

    <r-card class="r-card--scroll">
      <r-table :data="keys" small></r-table>
    </r-card>

    <r-alert ref="info"></r-alert>

    <r-status></r-status>
  </div>
</template>

<script src="./script.js"></script>
