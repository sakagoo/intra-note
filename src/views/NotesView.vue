<script setup lang="ts">
import NotesEdit from "@/components/NotesEdit.vue";
import HeaderBar2 from "@/components/HeaderBar2.vue";
import { ref } from "vue";

const note = ref();
const submit = () => {
  note.value.submit(false);
};
const update = () => {
  note.value.update();
};
const saveDraft = () => {
  note.value.submit(true);
};
</script>

<template>
  <HeaderBar2 @submit="submit()" @update="update()" @saveDraft="saveDraft()" />
  <main>
    <NotesEdit ref="note" />
  </main>
</template>

<style scoped>
.main_view {
  margin: 0px;
  padding: 0px;
}
</style>
