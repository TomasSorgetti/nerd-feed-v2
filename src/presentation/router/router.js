import { createRouter, createWebHistory } from "vue-router";
import { isLoading } from "../stores/loading";

import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";

import Feed from "../pages/Feed.vue";
import Publication from "../pages/Publication.vue";
import Profile from "../pages/Profile.vue";

import ServerError from "../pages/error/ServerError.vue";
import NotFound from "../pages/error/NotFound.vue";
import Chat from "../pages/Chat.vue";

const routes = [
  // public routes
  {
    path: "/",
    component: Home,
  },
  {
    path: "/auth/login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/auth/register",
    component: Register,
    meta: { guestOnly: true },
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPassword,
    meta: { guestOnly: true },
  },

  // private routes
  {
    path: "/feed",
    component: Feed,
    meta: { requiresAuth: true },
  },
  {
    path: "/publication/:publicationId",
    component: Publication,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:username",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    component: Chat,
    meta: { requiresAuth: true },
  },

  // error routes
  {
    path: "/500",
    component: ServerError,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  //? de donde saco el user, importo el servicio?
  // if (to.meta.requiresAuth && user.id === null) {
  //   return "/auth/login";
  // }
  // if (to.meta.guestOnly && user.id !== null) {
  //   return "/feed";
  // }

  isLoading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  next();
});

router.afterEach(() => {
  isLoading.value = false;
});

export default router;
