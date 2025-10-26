import { createRouter, createWebHistory } from "vue-router";
import { isLoading } from "../stores/loading";

import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";

import Feed from "../pages/Feed.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import Profile from "../pages/account/Profile.vue";
import Settings from "../pages/account/Settings.vue";

import ServerError from "../pages/error/ServerError.vue";
import NotFound from "../pages/error/NotFound.vue";

const routes = [
  // public routes
  {
    path: "/",
    component: Home,
  },
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/register",
    component: Register,
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPassword,
  },

  // private routes
  {
    path: "/feed",
    component: Feed,
  },
  {
    path: "/private-chat/:roomId",
    component: PrivateChat,
  },
  {
    path: "/profile/:username",
    component: Profile,
  },
  {
    path: "/settings/:userId",
    component: Settings,
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
  isLoading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  next();
});

router.afterEach(() => {
  isLoading.value = false;
});

export default router;
