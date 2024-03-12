<template>
  <div class="bg-yellow-200 h-8">HelloWorld</div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
