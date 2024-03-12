<template>
  <div>hello this is app.vue</div>
  <component :is="layout" />

  <!-- <router-view /> -->
</template>
<script setup>
import PortalView from "/src/views/PortalView.vue";
import { onBeforeRouteUpdate, ref } from "vue";

const layout = ref("PortalView");

onBeforeRouteUpdate((to) => {
  layout.value = to.meta.layout || "PortalView"; // Default to 'PortalView' if no custom layout is specified
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
