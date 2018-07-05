<template>
  <div class="r-modular__group">
    <transition name="fade">
      <div class="splash" @click="close()" v-show="show"></div>
    </transition>
    <transition name="slide">
      <div class="r-modular" @keyup.esc="close()" v-show="show">
        <div class="r-modular__content" :class="scroll">
          <div class="r-modular__group">
            <div class="r-modular__header">
              <h3>{{ title }}</h3>
            </div>
            <div class="r-modular__body">
              <r-input-field label="Номер ключа" id="key-id" :value="key.id" disabled />
              <r-input-field label="Название ключа" id="key-name" :value="key.name" disabled />
              <r-input-field label="Описание ключа" id="key-extra" :value="key.extra" disabled />
              <r-input-field label="Дата" id="key-date" :value="key.date" disabled />
            </div>
          </div>
          <div class="r-modular__footer">
            <r-button type="full" @click.native="returnKey()">Отметить ключ вернутым</r-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
