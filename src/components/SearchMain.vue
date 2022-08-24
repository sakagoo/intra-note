<script setup lang="ts">
import { useDatabaseStore } from "@/stores/database";
import { computed, onMounted, ref } from "vue";

const databaseStore = useDatabaseStore();
const user_icon = ref();
const user_name = ref();

const articles = computed(() => {
  return databaseStore.articles;
});

onMounted(async () => {
  await databaseStore.loadAllArticles();
  user_name.value = databaseStore.user_info.name;
  user_icon.value =
    "/img/" +
    databaseStore.user_info.id.toString() +
    databaseStore.user_info.icon;
});

defineExpose({
  articles,
});
</script>

<template>
  <main>
    <div class="article" v-for="article in articles" :key="article.content_id">
      <div class="article_info">
        <img class="userIcon" :src="user_icon" alt="UserIcon" />
        <div>
          <div class="userName">{{ user_name }}</div>
          <div class="updateDate">{{ article.update_at.toString() }}</div>
        </div>
      </div>
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
h1 {
  font-weight: 400;
}
.article {
  height: 172px;
  border-top: 1px solid #e6e6e6;
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #4d4d4d;
  font-weight: 300;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.3;
  word-break: break-all;
  color: #4d4d4d;
}
.article_info {
  display: flex;
  margin-bottom: 10px;
}
.userIcon {
  display: flex;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-left: 0px;
  margin-right: 10px;
  align-items: center;
}
.userName {
  font-size: small;
  font-weight: bold;
  margin: 0;
  color: #4d4d4d;
}
.updateDate {
  font-size: small;
  margin: 0;
  color: #4d4d4d;
}
</style>
