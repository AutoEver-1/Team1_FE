import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/HomePage.vue";

const routes = [{ path: "/", component: SearchPage }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
