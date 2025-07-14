import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "../pages/SignupPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomePage from "../pages/HomePage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", name: "Home", component: HomePage }],
  },

  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: LoginPage }],
  },
  {
    path: "/signup",
    component: AuthLayout,
    children: [{ path: "", component: SignupPage }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
