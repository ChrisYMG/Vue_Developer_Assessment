import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "../views/HomeScreen.vue";

const routes = [
  {
    path: "/",
    name: "HomeScreen",
    component: HomeScreen,
  },
  {
    path: "/MovieDetailsScreen",
    name: "MovieDetailsScreen",
    component: () =>
      import(
        /* webpackChunkName: "MovieDetailsScreen" */ "../views/MovieDetailsScreen.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
