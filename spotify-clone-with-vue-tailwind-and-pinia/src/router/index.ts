import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Library from "../views/Library.vue";
import AlbumDetails from "../views/AlbumDetails.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  {
    path: "/library",
    component: Library,
  },
  {
    path: "/selected-album",
    component: AlbumDetails,
  },
  {
    path: "/liked",
    component: AlbumDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
