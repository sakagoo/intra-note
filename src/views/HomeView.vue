<script setup lang="ts">
import HomeMain from "@/components/HomeMain.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import HomeMenu from "@/components/HomeMenu.vue";
</script>

<template>
  <HeaderBar />
  <div id="main">
    <div class="aside">
      <HomeMenu />
    </div>
    <div class="center">
      <HomeMain />
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
