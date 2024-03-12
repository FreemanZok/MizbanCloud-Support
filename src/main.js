import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import requests from "./requests";
import newStore from "@/store/store.js";
import "@/index.css";
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
app.use(router);
app.use(vuetify);

app.config.globalProperties.$requests = requests;
app.config.globalProperties.$newStore = newStore;

app.mount("#app");
