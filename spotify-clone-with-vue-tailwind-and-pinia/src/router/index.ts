import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";

const routes = [
  // { path: "/", component: App },
  { path: "/", component: Home },
  { path: "/search", component: Search },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
