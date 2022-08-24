<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar.vue";
import HomeMenu from "@/components/HomeMenu.vue";
import SearchMain from "@/components/SearchMain.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const query: string = route.query.query?.toString() ?? "";
</script>

<template>
  <HeaderBar />
  <div id="main">
    <div class="aside">
      <HomeMenu />
    </div>
    <div class="center">
      <SearchMain :query="query" />
    </div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  width: auto;
}
.aside {
  display: flex;
  width: 290px;
}
.center {
  display: flex;
  width: 100%;
}
</style>
