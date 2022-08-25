<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { marked } from "marked";
import hljs from "highlightjs";
import { useDatabaseStore, type Airticle } from "@/stores/database";
import { useRoute } from "vue-router";

const title = ref("");
const markdown = ref("");
const route = useRoute();
const content_id = ref(0);
const user_icon = ref("");
const user_name = ref("");

const displayTitle = computed(() => {
  return title.value;
});

const compiledMarkdown = computed(() => {
  marked.setOptions({
    langPrefix: "",
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      const mk = hljs.highlightAuto(code, [language]).value;
      return mk;
    },
  });
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
  user_name.value = databaseStore.user_info.name;
  user_icon.value =
    "/img/" +
    databaseStore.user_info.id.toString() +
    databaseStore.user_info.icon;
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
        <div class="user_info">
          <img class="userIcon" :src="user_icon" alt="UserIcon" />
          <div class="userName">{{ user_name }}</div>
        </div>

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

<style src="highlightjs/styles/github.css"></style>
<style>
pre {
  margin-bottom: 1.6rem;
  border: 1px solid #eeede7;
  border-radius: 4px;
  line-height: 1.5;
  word-wrap: break-word;
  color: #4d4d4d;
  background: #f9f8f5;
  padding: 16px;
}
</style>
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
.user_info {
  display: flex;
  margin-bottom: 10px;
}

.userIcon {
  display: flex;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-left: 0px;
  margin-right: 10px;
  align-items: center;
}
.userName {
  font-size: medium;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  color: #4d4d4d;
}
</style>
