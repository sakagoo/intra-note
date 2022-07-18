<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { marked } from "marked";
import _ from "lodash";
import { useDatabaseStore, type Airticle } from "@/stores/database";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const input = ref("");
const title = ref("");
const content_id = ref(0);
const user_id = ref("");

const displayTitle = computed(() => {
  return title.value;
});

const compiledMarkdown = computed(() => marked.parse(input.value, {}));

const loadArticle = _.debounce((e: Event) => {
  const target = e.target as HTMLInputElement;
  input.value = target.value;
}, 300);

const submit = async () => {
  const date = new Date();
  const create_at = new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .format(date)
    .replace(/\//g, "-");
  const airticle: Airticle = {
    content_id: 0,
    title: title.value,
    markdown: input.value,
    state: "OK",
    created_at: create_at.toLocaleString(),
    created_by: user_id.value,
    update_at: create_at.toLocaleString(),
    update_by: user_id.value,
  };
  const databaseStore = useDatabaseStore();
  content_id.value = await databaseStore.postArticles(airticle);
  router.push({
    name: "details",
    params: { id: content_id.value },
  });
};

const update = async () => {
  const date = new Date();
  const update_at = new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .format(date)
    .replace(/\//g, "-");
  const airticle: Airticle = {
    content_id: content_id.value,
    title: title.value,
    markdown: input.value,
    state: "OK",
    created_at: "",
    created_by: "",
    update_at: update_at.toLocaleString(),
    update_by: user_id.value,
  };
  const databaseStore = useDatabaseStore();
  await databaseStore.updateArticle(airticle);
  router.push({
    name: "details",
    params: { id: content_id.value },
  });
};

onMounted(async () => {
  const databaseStore = useDatabaseStore();
  const id = Number(route.params.id);
  const airticle: Airticle = await databaseStore.loadArticle(id);
  title.value = airticle.title;
  input.value = airticle.markdown;
  content_id.value = id;
  user_id.value = databaseStore.user_info.id;
});

defineExpose({
  submit,
  update,
});
</script>

<template>
  <main>
    <div id="inputArea">
      <div class="editor-titleBox-flexInput">
        <textarea
          id="title"
          v-model="title"
          placeholder="タイトルを入力..."
        ></textarea>
      </div>
      <textarea
        id="contents"
        :value="input"
        @input="loadArticle"
        placeholder="Markdownで本文を入力..."
      ></textarea>
    </div>
    <div id="displayArea">
      <h1 id="displayTitle">{{ displayTitle }}</h1>
      <div id="displayContents" v-html="compiledMarkdown"></div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: auto;
  margin: 10px;
}
.editor-titleBox-flexInput {
  display: block;
  color: #4d4d4d;
  line-height: 1.6;
  font-size: 1.2rem;
}
textarea {
  font-size: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  line-height: 1.5;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  resize: auto;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  column-count: initial !important;
}
textarea.focas {
  outline: 0;
  border-color: #327ac2;
  background: #ffffff;
}
#inputArea {
  display: block;
  width: 50%;
  margin: 10px;
}
#title {
  display: block;
  width: 90%;
  margin: 10px;
  color: #4d4d4d;
  background: #fafafa;
  resize: none;
  padding: 10px;
}
#contents {
  display: block;
  width: 90%;
  height: 500px;
  margin: 10px;
}
#displayArea {
  display: block;
  width: auto;
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
.editor-titleBox-flexInput-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
