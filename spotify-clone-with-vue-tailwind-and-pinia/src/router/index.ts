import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import Home from "../App.vue";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
