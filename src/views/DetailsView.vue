<script setup lang="ts">
import DetailsMain from "@/components/DetailsMain.vue";
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<template>
  <HeaderBar />
  <div id="main">
    <div class="aside">
      <HomeMenu />
    </div>
    <div class="center">
      <DetailsMain />
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
