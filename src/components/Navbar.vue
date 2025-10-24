<script setup>
import { useScrollPosition } from "../composables/useScrollPosition.js";
import Logo from "../assets/logo.svg";
import NavLink from "./ui/NavLink.vue";

const { isScrolled } = useScrollPosition(20);
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
        class="flex items-center gap-2 text-xl font-semibold overflow-hidden duration-1000 ease-in-out"
        :class="isScrolled ? 'w-8' : 'w-50'"
      >
        <img :src="Logo" alt="logo de nerd feed" class="w-8 h-auto" />
        <span class="whitespace-nowrap">Nerd Feed</span>
      </router-link>

      <ul class="flex items-center gap-8 flex-1 justify-center">
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Features</NavLink>
        </li>
        <li>
          <NavLink>Blog</NavLink>
        </li>
        <li>
          <NavLink>Demo</NavLink>
        </li>
      </ul>

      <ul class="flex items-center gap-4">
        <li>Sign In</li>
        <li
          class="duration-300 ease-in-out"
          :class="
            isScrolled
              ? 'opacity-100 visibility-visible'
              : 'visibility-hidden opacity-0'
          "
        >
          Sign Up
        </li>
      </ul>
    </nav>
  </header>
</template>
