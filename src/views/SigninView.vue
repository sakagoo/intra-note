<script setup lang="ts">
import SigninMain from "@/components/SigninMain.vue";
</script>

<template>
  <div id="main">
    <div class="center">
      <SigninMain />
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
