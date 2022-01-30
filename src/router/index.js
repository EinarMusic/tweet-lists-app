import { createRouter, createWebHistory } from "vue-router";

import Lists from "../views/Lists.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/lists",
      component: Lists
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/",
      redirect: "/"
    }
  ]
});

export default router;
