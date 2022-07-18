<script setup lang="ts">
import { ref } from "vue";

const user_icon = ref();

user_icon.value = "src/assets/スプラトゥーン3.jpeg";
</script>

<template>
  <header id="header">
    <nav class="headerNavigation">
      <div class="headerNavigation-serviceLogo">
        <a href="/"
          ><img
            alt="kibela"
            src="https://cdn.kibe.la/assets/kibela_logo-18bb447dfc0fe9b71ad3c05572b12e3f76e97de2ed3e04bfb2cde980c9055f5b.svg"
          />
        </a>
      </div>
      <ul class="headerNavigation-menus">
        <li class="is-active">
          <router-link :to="{ name: 'home' }"><span>ホーム</span></router-link>
        </li>
        <li class="">
          <a href="/groups">グループ</a>
        </li>
        <li class="">
          <a href="/notes/folder">フォルダ</a>
        </li>
        <li class="">
          <a href="/members">メンバー</a>
        </li>
      </ul>
      <div class="headerNavigation-actions">
        <router-link :to="{ name: 'notes' }"
          ><span>記事を書く</span></router-link
        >
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
</style>
