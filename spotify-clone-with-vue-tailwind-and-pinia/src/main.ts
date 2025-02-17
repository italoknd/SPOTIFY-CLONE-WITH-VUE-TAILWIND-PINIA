import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();

const app = createApp(App);

pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
app.mount("#app");
