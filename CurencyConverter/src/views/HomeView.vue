<script setup lang="ts">
import { ref } from "vue";
import converterHasher from "@/modules/converterHasher";
import convert from "@/modules/convert";
import getInfo from "@/modules/getInfo";
import curency from "../assets/Curency.json";
import type { TCurency } from "@/assets/Curency.type";

const values = ref<TCurency[]>(curency);
const initSelected = ref<string>("RUB");
const resolveSelected = ref<string>("EUR");

const initInput = ref<string>("0");
const result = ref<string>("0");
const info = ref<string>("");

converterHasher(
  values.value.map((value) => value.name),
  initSelected,
  resolveSelected,
  initInput
);
getInfo(initSelected.value, resolveSelected.value, info);

const changeHandler: () => void = () => {
  if (initSelected.value === resolveSelected.value) {
    resolveSelected.value = resolveSelected.value === "RUB" ? "EUR" : "RUB";
  }
  getInfo(initSelected.value, resolveSelected.value, info);

  initChangeHandler();
};

const initChangeHandler: () => void = () => {
  if (!isNaN(Number(initInput.value))) {
    if (initInput.value !== "" && Number(initInput.value) !== 0) {
      convert(initInput.value, initSelected.value, resolveSelected.value, result);
    }
  } else {
    result.value = "Ошибка";
  }
  document.location.hash = `init=${initSelected.value}&resolve=${resolveSelected.value}&amount=${initInput.value}`;
};

initChangeHandler();
</script>

<template>
  <p class="title">
    Конвертер курса валют из {{ initSelected }} в {{ resolveSelected }}
  </p>
  <p class="subtitle">
    Текущий курс 1{{
      values.filter((value) => value.name === initSelected)[0].icon
    }}
    к {{ info }}
    {{ values.filter((value) => value.name === resolveSelected)[0].icon }}
  </p>

  <div class="menu">
    <div class="menu__item">
      <select v-model="initSelected" @change="changeHandler" class="select">
        <option v-for="value in values" :value="value.name" :key="value.name">
          {{ value.fullName }}
        </option>
      </select>

      <label class="label">
        <input
          type="text"
          class="input"
          v-model="initInput"
          placeholder="Сумма"
          @keyup="initChangeHandler"
          @keydown="initChangeHandler"
        />
        <span>
          {{ values.filter((value) => value.name === initSelected)[0].icon }}
        </span>
      </label>
    </div>

    <div class="menu__item">
      <select v-model="resolveSelected" @change="changeHandler" class="select">
        <option
          v-for="value in values.filter((item) => item.name !== initSelected)"
          :value="value.name"
          :key="value.name"
        >
          {{ value.fullName }}
        </option>
      </select>

      <div class="resultLabel">
        <p class="result">{{ result }}</p>
        <p>
          {{ values.filter((value) => value.name === resolveSelected)[0].icon }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 15px;
  font-size: 40px;
  line-height: 50px;
}

.subtitle {
  margin-bottom: 30px;
}

.menu {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;

  &__item {
    width: 500px;
    margin-right: 20px;
  }
}

.select {
  margin-bottom: 10px;
}

.label {
  display: flex;
  align-items: center;
  border-bottom: 1px #000 solid;
  height: 45px;

  .input {
    width: 100%;
    padding: 5px;
  }

  p {
    padding: 0 10px;
  }
}

.resultLabel {
  @extend .label;

  .result {
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
  }
}
</style>
