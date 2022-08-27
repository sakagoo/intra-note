import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotesView from "../views/NotesView.vue";
import DetailsView from "../views/DetailsView.vue";
import SigninView from "../views/SigninView.vue";
import SearchView from "@/views/SearchView.vue";
import UserView from "@/views/UserView.vue";
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
      path: "/:user_id",
      name: "user",
      component: UserView,
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
      path: "/search",
      name: "search",
      component: SearchView,
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
