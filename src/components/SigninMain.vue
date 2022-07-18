<script setup lang="ts">
import { useDatabaseStore } from "@/stores/database";
import { ref } from "vue";
import router from "@/router";

const databaseStore = useDatabaseStore();
const userid = ref("");
const password = ref("");
const onSubmit = async () => {
  await databaseStore
    .signin(userid.value, password.value)
    .then((ret) => {
      if (ret) {
        router.push({
          name: "home",
        });
      }
    })
    .catch(() => {
      console.log("error");
    });
};
</script>

<template>
  <main>
    <h1>ログイン</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="userid" placeholder="メールアドレス" />
      <input v-model="password" placeholder="パスワード" type="password" />
      <input
        type="submit"
        name="commit"
        value="ログインする"
        class="button is-button-attention right"
        data-disable-with="ログインする"
      />
    </form>
  </main>
</template>

<style scoped>
h1 {
  margin: 100 auto;
  text-align: center;
}
main {
  display: block;
  margin: 0 auto;
}
input {
  display: block;
  margin: 10px auto;
}
</style>
