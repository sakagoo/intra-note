<script setup lang="ts">
import { useDatabaseStore } from "@/stores/database";
import { computed, onMounted } from "vue";

const databaseStore = useDatabaseStore();

const articles = computed(() => {
  return databaseStore.articles;
});

onMounted(async () => {
  await databaseStore.loadAllArticles();
});

defineExpose({
  articles,
});
</script>

<template>
  <main>
    <h1>Home</h1>
    <div class="article" v-for="article in articles" :key="article.content_id">
      <router-link
        :to="{
          name: 'details',
          params: { id: Number(article.content_id) },
        }"
        class="title"
        >{{ article.title }}</router-link
      >
      <p>{{ article.markdown }}</p>
    </div>
  </main>
</template>

<style scoped>
.article {
  height: 100px;
  border-top: 1px solid #e6e6e6;
  padding: 15px;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.3;
  word-break: break-all;
  color: #4d4d4d;
}
</style>
