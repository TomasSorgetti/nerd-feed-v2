<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Logo from "./assets/logo.svg";

const isLoading = ref(true);

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1900));
  isLoading.value = false;
});
</script>

<template>
  <div
    v-if="isLoading"
    class="flex items-center justify-center h-screen bg-background"
  >
    <img
      :src="Logo"
      alt="logo de nerd feed"
      class="w-20 h-auto animate-pulse select-none pointer-events-none"
    />
  </div>

  <div v-else class="min-h-screen">
    <Navbar />

    <router-view />
  </div>
</template>
