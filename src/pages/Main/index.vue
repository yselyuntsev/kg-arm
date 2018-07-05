<template>
  <div id="arm">
    <r-profile v-if="person" style="margin-bottom: 2rem" :data="person"></r-profile>

    <h2>Активные ключи</h2>

    <r-card :class="cardStyle">
      <r-table v-if="person" :data="employeeKeys" @send="selectKey($event)"></r-table>
      <r-table v-else :data="keys" @send="selectKey($event)"></r-table>
    </r-card>

    <r-modal ref="modular" title="Информация о ключе" @returnKey="returnKey($event)">
      <r-loader slot="content" title="информация о ключе не найдена"></r-loader>
    </r-modal>

    <r-reader ref="reader" @enter="enter($event)"></r-reader>
    <r-button v-show="person" @click.native="finish()" type="arm" icon="check">Завершить обслуживание</r-button>
    <r-alert ref="info"></r-alert>

    <r-status></r-status>
  </div>
</template>

<script src="./script.js"></script>
