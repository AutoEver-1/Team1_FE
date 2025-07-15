import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "../pages/SignupPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomePage from "../pages/HomePage.vue";
import ReviewPage from "../pages/ReviewPage.vue";
import UserPage from "../pages/UserPage.vue";
import MovieDetailPage from "../pages/MovieDetailPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import MoviePage from "../pages/MoviePage.vue";
import Top100Page from "../pages/Top100Page.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: HomePage },
      { path: "/review", name: "Review", component: ReviewPage },
      { path: "/user", name: "User", component: UserPage },
      { path: "/movie", name: "MovieList", component: MoviePage },
      { path: "/top100", name: "Top100", component: Top100Page },
      {
        path: "/movie/:id",
        name: "MovieDetail",
        component: MovieDetailPage,
        props: true,
      },
    ],
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
