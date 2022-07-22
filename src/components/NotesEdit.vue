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
  if (title.value === "") {
    return "タイトル";
  } else {
    return title.value;
  }
});

const compiledMarkdown = computed(() =>
  marked.parse(
    input.value === "" ? "プレビューが表示されます…" : input.value,
    {}
  )
);

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

const onKeyEnter = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const sentence = target.value;
  const pos = target.selectionStart ?? 0;
  const lastReturnPos = sentence.substring(0, pos).lastIndexOf("\n");
  let spaceCount = 0;
  const arr = sentence.substring(lastReturnPos + 1).match(/^ +/);
  if (arr == null) {
    spaceCount = 0;
  } else {
    spaceCount = arr[0].length;
  }
  const leadingSpace = " ".repeat(spaceCount);

  if (sentence[lastReturnPos + spaceCount + 1] === "-") {
    e.preventDefault();
    target.value =
      sentence.substring(0, pos) +
      "\n" +
      leadingSpace +
      "- " +
      sentence.substring(pos, pos + sentence.length);
    target.selectionStart = pos + spaceCount + 3;
    target.selectionEnd = target.selectionStart;
  }
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
    <div class="titleArea">
      <textarea
        class="title"
        v-model="title"
        placeholder="タイトルを入力..."
      ></textarea>
      <div class="displayTitle">{{ displayTitle }}</div>
    </div>
    <div class="contentsArea">
      <textarea
        class="contents"
        :value="input"
        @input="loadArticle"
        @keydown.enter="onKeyEnter"
        placeholder="Markdownで本文を入力..."
      ></textarea>
      <div class="displayContents" v-html="compiledMarkdown"></div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: block;
  width: auto;
  margin: 10px;
}
.titleArea {
  display: flex;
  width: 100%;
}
.title {
  display: block;
  width: 50%;
  margin: 10px;
  color: #4d4d4d;
  background: #fafafa;
  resize: none;
  padding: 10px;
  font-size: 1.3rem;
}
.displayTitle {
  display: block;
  width: 50%;
  margin: auto 10px;
  font-size: 2rem;
}
.contentsArea {
  display: flex;
  color: #4d4d4d;
  line-height: 1.6;
  font-size: 1.2rem;
  width: 100%;
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
.inputArea {
  display: block;
  width: 50%;
  margin: 10px;
}
.contents {
  display: block;
  width: 50%;
  height: 500px;
  margin: 10px;
}
.displayContents {
  display: block;
  width: 50%;
  height: 500px;
  margin: 0 10px;
}
</style>
