<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="bg-yellow-200 h-5">this is bagher</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
