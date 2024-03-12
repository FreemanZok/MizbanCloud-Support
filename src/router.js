import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/hello-world",
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/cdn/:domain_name/:domain_id/https-settings",
    component: () => import("@/components/cdn/HttpsSetting.vue"),
    meta: {
      layout: "PortalView",
      pageTitle: "Https Setting",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
