import { createRouter, createWebHistory } from "vue-router";

import Lists from "../views/Lists.vue";
import Save from "../views/Save.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/lists",
      component: Lists,
    },
    {
      path: "/save",
      component: Save,
    },
    {
      path: "/",
      redirect: "/",
    },
  ],
});

export default router;
