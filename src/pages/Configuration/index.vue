<template>
  <div id="configuration">
    <r-card style="padding: 1rem">
      <h2>Настройка конфигурации</h2>

      <div class="grid">
        <div class="grid__column size-2of4">
          <r-input-field id="origin" label="Адрес сервера" v-model="configuration.origin" placeholder="Введите адрес сервера"></r-input-field>
        </div>

        <div class="grid__column size-2of4">
          <r-input-field id="api-url" label="Путь до API" v-model="configuration.apiUrl" placeholder="Введите путь до API на сервере"></r-input-field>
        </div>

        <div class="grid__column size-2of4">
          <r-input-field id="api-url" label="Токен авторизации" v-model="configuration.token"  placeholder="Введите токен"></r-input-field>
        </div>

        <div class="grid__column size-2of4">
          <r-input-field id="api-url" label="Адрес WebSocket сервера" v-model="configuration.websocketUrl"  placeholder="Введите адрес WebSocket сервера"></r-input-field>
        </div>

        <div class="grid__column">
          <r-button @click.native="saveConfiguration()" icon="check" type="full">Сохранить конфигурацию</r-button>
        </div>
      </div>
    </r-card>

    <r-alert ref="success"></r-alert>
  </div>
</template>

<script src="./script.js"></script>
