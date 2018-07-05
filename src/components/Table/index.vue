<template>
  <div style="overflow-x: auto">
    <table class="r-table" v-if="data.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Номер</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Цвет</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody :class="smallFont">
        <tr @click="sendData(row)" v-for="(row, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.extra }}</td>
          <td><span class="r-table__color" :style="'background-color:' + row.color"></span></td>
          <td>{{ row.date }}</td>
         </tr>
      </tbody>
    </table>
    <r-loader title="данные о ключах не найдены" v-else></r-loader>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
