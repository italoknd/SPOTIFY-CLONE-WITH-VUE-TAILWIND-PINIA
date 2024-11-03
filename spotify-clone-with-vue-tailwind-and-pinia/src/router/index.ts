import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Library from "../views/Library.vue";

const routes = [
  // { path: "/", component: App },
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/library", component: Library },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
