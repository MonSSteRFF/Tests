<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="link">Конвертер</RouterLink>
    <RouterLink to="/curses" class="link">Курсы валют</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped lang="scss">
  .link{
    &:not(:last-child){
      margin-right: 25px;
    }
  }
  .nav{
    margin-bottom: 20px;
  }
</style>
