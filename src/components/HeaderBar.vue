<script setup lang="ts">
import { useDatabaseStore } from "@/stores/database";
import { onMounted, ref } from "vue";

const databaseStore = useDatabaseStore();
const user_icon = ref();
const user_name = ref();

user_icon.value =
  "/img/" + databaseStore.user_info.id + databaseStore.user_info.icon;

onMounted(async () => {
  await databaseStore.loadAllArticles();
  user_name.value = databaseStore.user_info.name;
  user_icon.value =
    "/img/" + databaseStore.user_info.id + databaseStore.user_info.icon;
});
</script>

<template>
  <header id="header">
    <nav class="headerNavigation">
      <div class="headerNavigation-serviceLogo">
        <a href="/"><img alt="logo" src="/img/logo.svg" /> </a>
      </div>
      <ul class="headerNavigation-menus">
        <li class="is-active">
          <router-link :to="{ name: 'home' }"><span>ホーム</span></router-link>
        </li>
        <li class="">
          <router-link
            :to="{
              name: 'user',
              params: { user_id: '@' + databaseStore.user_info.id },
            }"
            ><span>下書き</span></router-link
          >
        </li>
        <!-- <li class="">
          <a href="/groups">グループ</a>
        </li>
        <li class="">
          <a href="/notes/folder">フォルダ</a>
        </li>
        <li class="">
          <a href="/members">メンバー</a>
        </li> -->
      </ul>
      <div class="headerNavigation-actions">
        <form action="/search" method="get">
          <div class="searchBox">
            <input
              type="search"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              placeholder="検索"
              value=""
              name="query"
            />
          </div>
        </form>
        <div class="article-entry-botton">
          <router-link :to="{ name: 'notes' }"
            ><span>記事を書く</span></router-link
          >
        </div>
        <img class="headerUserIcon" :src="user_icon" alt="UserIcon" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
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
  margin: auto;
}
.headerNavigation {
  display: flex;
  width: 100%;
}
.headerNavigation-serviceLogo {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  width: auto;
}
.headerNavigation-menus {
  display: flex;
  width: auto;
  margin-top: auto;
  margin-bottom: auto;
  text-align: left;
}
.headerNavigation-actions {
  display: flex;
  width: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}
.headerUserIcon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  align-items: center;
}
.searchBox {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 0;
  width: 150px;
  height: 40px;
}
.article-entry-botton {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 0;
  width: 150px;
  height: 40px;
}
</style>
