<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { marked } from "marked";
import { useDatabaseStore, type Airticle } from "@/stores/database";
import { useRoute } from "vue-router";

const title = ref("");
const markdown = ref("");
const route = useRoute();
const content_id = ref(0);

const displayTitle = computed(() => {
  return title.value;
});

const compiledMarkdown = computed(() => {
  if (markdown.value) {
    return marked.parse(markdown.value, {});
  } else {
    return "";
  }
});

const deleteAirticle = async () => {
  const databaseStore = useDatabaseStore();
  const id = Number(route.params.id);
  await databaseStore.deleteArticle(id);
};

onMounted(async () => {
  const databaseStore = useDatabaseStore();
  const id = Number(route.params.id);
  const airticle: Airticle = await databaseStore.loadArticle(id);
  title.value = airticle.title;
  markdown.value = airticle.markdown;
  content_id.value = id;
});

defineExpose({
  displayTitle,
  compiledMarkdown,
});
</script>

<template>
  <div id="contentsBox">
    <main>
      <div id="displayArea">
        <h1 id="displayTitle">{{ displayTitle }}</h1>
        <div id="displayContents" v-html="compiledMarkdown"></div>
      </div>
    </main>
    <aside>
      <router-link
        :to="{
          name: 'notes-edit',
          params: { id: content_id, objective: 'edit' },
        }"
        >編集</router-link
      >
      <a id="deleteLink" href="/" @click="deleteAirticle">削除</a>
    </aside>
  </div>
</template>

<style scoped>
#contentsBox {
  display: flex;
  width: 100%;
}
main {
  display: flex;
  width: 100%;
  margin: 10px;
}
aside {
  display: flex;
  width: 20%;
  margin: 10px;
}
#displayArea {
  display: block;
  width: 100%;
  margin: 10px;
}
#displayTitle {
  display: block;
  width: 90%;
  margin: 10px;
}
#displayContents {
  display: block;
  width: 90%;
  height: 500px;
  margin: 10px;
}
#deleteLink {
  margin: 0 auto;
}
</style>
