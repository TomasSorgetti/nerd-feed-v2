<script setup>
import { isLoading } from "../stores/loading.js";
import Logo from "../assets/logo.svg";
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      role="status"
      aria-busy="true"
      aria-label="Loading page"
      class="fixed inset-0 z-100 flex items-center justify-center bg-background"
    >
      <img
        :src="Logo"
        alt="logo de Nerd Feed"
        class="w-20 h-auto animate-pulse select-none pointer-events-none"
      />
    </div>
  </transition>
</template>
