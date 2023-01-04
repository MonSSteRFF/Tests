<script setup lang="ts">
import { ref } from "vue";
import Curency from "../assets/Curency.json";
import type { TCurency, TCursItem } from "@/assets/Curency.type";
import getRates from "@/modules/getRates";

const curency = ref<TCurency[]>(Curency);
const list = ref<TCursItem[]>([]);
const initSelected = ref<string>("RUB");

const changeHandler = () => {
  getRates(initSelected.value, list);
  document.location.hash = `curse=${initSelected.value}`;
};
getRates(initSelected.value, list);

const spl = document.location.hash.replace("#", "").split("=");
if (spl[0] === "curse") {
  initSelected.value = spl[1];
}
</script>

<template>
  <p class="title">Текущий курс валюты по отношению к другим валютам</p>
  <select v-model="initSelected" @change="changeHandler" class="select">
    <option v-for="value in curency" :value="value.name" :key="value.name">
      {{ value.fullName }}
    </option>
  </select>

  <div class="list">
    <div
      v-for="curs in list.filter((listItem) => listItem.name !== initSelected)"
      v-bind:key="curs.name"
      class="list__item"
    >
      <p class="icon">
        1 {{ curency.filter((item) => item.name === initSelected)[0].icon }}
      </p>

      <p class="property">
        = {{ curs.property }}
        {{ curency.filter((item) => item.name === curs.name)[0].icon }}
      </p>

      <p class="name">({{ curs.name }})</p>

      <p>{{ curs.fullName }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 15px;
  font-size: 40px;
  line-height: 50px;
}

.select {
  margin-bottom: 10px;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  &__item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .icon {
      width: 60px;
      margin: 0 10px;
    }

    .property {
      min-width: 230px;
      margin: 0 15px;
    }

    .name {
      width: 90px;
      margin: 0 15px;
    }
  }
}
</style>
