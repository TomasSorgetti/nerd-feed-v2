<script setup>
import { useScrollPosition } from "../composables/useScrollPosition.js";
import { useAuth } from "../composables/useAuth.js";

import Logo from "../assets/logo.svg";
import NavLink from "./ui/NavLink.vue";
import MainButton from "./ui/buttons/MainButton.vue";
import AccountDropdown from "./ui/AccountDropdown.vue";
import { Bell } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { useRouter } from "vue-router";

const { isScrolled } = useScrollPosition(20);

const { user, signOut } = useAuth();

const router = useRouter();

const handleLogout = async () => {
  try {
    await signOut();
    localStorage.removeItem("isAuthenticated");
    router.push("/auth/login");
  } catch (error) {
    router.push("/500");
  }
};
</script>

<template>
  <header
    class="fixed top-0 mx-auto left-0 right-0 z-50 py-2 w-full transition-all duration-800 ease-in-out"
    :class="isScrolled ? 'max-w-3xl' : 'max-w-7xl'"
  >
    <nav
      class="relative p-4 flex items-center justify-between rounded-2xl"
      :class="isScrolled && 'bg-white shadow-md'"
    >
      <router-link
        to="/"
        class="relative flex items-center pr-5 gap-2 text-xl font-semibold overflow-hidden duration-1000 ease-in-out"
        :class="isScrolled ? 'w-8' : 'w-auto'"
      >
        <img :src="Logo" alt="logo de nerd feed" class="w-8 h-auto min-w-8" />
        <span class="whitespace-nowrap">Nerd Feed</span>
        <div
          class="absolute right-0 bottom-0 h-5 w-5 flex items-center justify-center bg-primary rounded text-xs text-text-invert"
          :class="isScrolled && 'hidden'"
        >
          v.2
        </div>
      </router-link>

      <ul class="flex items-center gap-8 flex-1 justify-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li class="cursor-not-allowed">
          Features
          <!-- <NavLink to="/features">Features</NavLink> -->
        </li>
        <li class="cursor-not-allowed">
          Blog
          <!-- <NavLink to="/blog">Blog</NavLink> -->
        </li>
        <li class="cursor-not-allowed">
          Demo
          <!-- <NavLink to="/demo">Demo</NavLink> -->
        </li>
        <li v-if="user">
          <router-link to="/feed" class="text-accent font-medium">
            Feed
          </router-link>
        </li>
      </ul>

      <ul class="flex items-center gap-4">
        <template v-if="!user || !user?.id">
          <li>
            <router-link to="/auth/login" class="hover:underline"
              >Sign In</router-link
            >
          </li>
          <li
            class="duration-0"
            :class="
              isScrolled
                ? 'opacity-100 visibility-visible'
                : 'h-0 w-0 visibility-hidden opacity-0'
            "
          >
            <MainButton to="/auth/register" variant="secondary">
              Sign Up
            </MainButton>
          </li>
        </template>

        <template v-else>
          <li class="flex items-center">
            <button>
              <Search class="w-6 h-6 text-text cursor-not-allowed" />
            </button>
          </li>
          <li class="flex items-center">
            <button>
              <Bell class="w-6 h-6 text-text cursor-not-allowed" />
            </button>
          </li>
          <li>
            <AccountDropdown
              :user="user"
              :handleLogout="handleLogout"
              class="ml-auto"
            />
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
