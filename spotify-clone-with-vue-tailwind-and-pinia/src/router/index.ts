import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import App from "../App.vue";
import Home from "../views/Home.vue";

const routes = [
  // { path: "/", component: App },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
