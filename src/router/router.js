import { createRouter, createWebHistory } from "vue-router";
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
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/forgot-password",
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

export default router;
