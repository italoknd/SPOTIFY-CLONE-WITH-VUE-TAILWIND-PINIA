import { createRouter, createWebHashHistory } from "vue-router"; //importando módulos do vue router

import Home from "../views/Home.vue";
import HomeMobile from "../views/HomeMobile.vue";
import Search from "../views/Search.vue";
import Library from "../views/Library.vue";
import AlbumDetails from "../views/AlbumDetails.vue";
import LibraryMobile from "../views/LibraryMobile.vue";

const routes = [
  { path: "/", component: window.innerWidth < 768 ? HomeMobile : Home },
  { path: "/search", component: Search },
  {
    path: "/library",
    component: window.innerWidth < 768 ? LibraryMobile : Library,
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
