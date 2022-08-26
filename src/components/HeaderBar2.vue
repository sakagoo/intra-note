<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const isEdit = "edit" === route.params.objective ? true : false;
</script>

<template>
  <header id="header">
    <nav class="headerNavigation">
      <div class="headerNavigation-menus">
        <router-link :to="{ name: 'home' }"><span>戻る</span></router-link>
      </div>
      <div class="headerNavigation-actions">
        <a v-if="isEdit" @click.prevent.stop="$emit('update')" href="/"
          >更新する</a
        >
        <a v-if="!isEdit" @click.prevent.stop="$emit('saveDraft')" href="/"
          >下書き保存</a
        >
        <a v-if="!isEdit" @click.prevent.stop="$emit('submit')" href="/"
          >投稿する</a
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
header .headerNavigation {
  display: flex;
  height: 60px;
  padding: 0px 30px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

ul {
  display: inline;
}
li {
  list-style: none;
  display: inline;
  padding: 10px;
}
a {
  margin: auto 10px;
}
.headerNavigation-menus {
  display: block;
}
.headerNavigation-actions {
  display: flex;
  margin-left: auto;
  align-items: center;
}
</style>
