<template>
  <div class="r-log" :class="'r-log--' + type">
    <div class="r-log__header">
      <h5>{{ data.title }}</h5>
      <span class="r-log__date">{{ data.date }}</span>
    </div>

    <div class="r-log__body">
      <div v-if="type === 'person'">
        <p class="r-log__employee">
          <img class="r-log__photo" :src="data.data.encoded_photo" />
          <span class="r-log__employee">{{ `${data.data.last_name}  ${data.data.first_name}  ${data.data.patronym}` }}</span>
        </p>

        <p class="r-log__stack">
          {{ JSON.stringify(employeeStack(data.data)) }}
        </p>
      </div>

      <div v-else>
        <p class="r-log__stack">
          {{ JSON.stringify(data.data) }}
        </p>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
