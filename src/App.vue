<template>
  <div>hello this is app.vue</div>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>
<script>
export default {
  computed: {
    currentLayout() {
      const layout = this.$route.meta.layout;
      return layout ? layout : "PortalView";
    },
  },
};
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
