import { createRouter, createWebHistory } from 'vue-router';
// import Login from "./components/authentication/Login.vue";

const routes = [

  {
    path: '/hello-world',
    component: () => import('./components/HelloWorld.vue')
  },
//   {
//     path: '/login',
//     component: () => import(Login)
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;