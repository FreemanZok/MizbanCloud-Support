import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import PortalView from "@/layouts/PortalView.vue";

const routes = [
  {
    path: "/hello-world",
    component: () => import("@/components/HelloWorld.vue"),
    meta: { layout: "PortalView" }, // Add default layout meta
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

router.beforeEach((to, from, next) => {
  if (to.meta.layout === "PortalView") {
    to.matched[0].components.default = () => import("@/layouts/PortalView.vue");
  }

  next();
});

export default router;
