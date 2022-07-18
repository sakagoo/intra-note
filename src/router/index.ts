import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotesView from "../views/NotesView.vue";
import DetailsView from "../views/DetailsView.vue";
import SigninView from "../views/SigninView.vue";
import { useDatabaseStore } from "@/stores/database";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SigninView,
    },
    {
      path: "/notes",
      name: "notes",
      component: NotesView,
    },
    {
      path: "/notes/:id/:objective",
      name: "notes-edit",
      component: NotesView,
    },
    {
      path: "/details/:id",
      name: "details",
      component: DetailsView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const databaseStore = useDatabaseStore();
  if (to.name !== "signin") {
    if (databaseStore.isAuthenticated) {
      next();
    } else {
      next("/signin");
    }
  } else {
    if (databaseStore.isAuthenticated) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
