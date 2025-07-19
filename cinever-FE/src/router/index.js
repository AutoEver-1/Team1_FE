import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "../pages/SignupPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomePage from "../pages/HomePage.vue";
import ReviewPage from "../pages/ReviewPage.vue";
import UserPage from "../pages/UserPage.vue";
import MovieDetailPage from "../pages/MovieDetailPage.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Top100Page from "../pages/Top100Page.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import AdminReviewerPage from "../pages/admin/AdminReviewerPage.vue";
import AdminReviewPage from "../pages/admin/AdminReviewPage.vue";
import AdminStatisticsPage from "../pages/admin/AdminStatisticsPage.vue";
import SearchPage from "../pages/SearchPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: HomePage },
      { path: "/home", name: "", component: HomePage },
      { path: "/review", name: "Review", component: ReviewPage },
      { path: "/user/:id", name: "User", component: UserPage },
      { path: "/top100", name: "Top100", component: Top100Page },
      {
        path: "/movie/:id",
        name: "MovieDetail",
        component: MovieDetailPage,
        props: true,
      },
      { path: "/search", name: "Search", component: SearchPage },
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
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "reviewer", component: AdminReviewerPage },
      { path: "review", component: AdminReviewPage },
      { path: "statistics", component: AdminStatisticsPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
