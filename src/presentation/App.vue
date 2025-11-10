<script setup>
import LoadingPage from "./components/ui/LoadingPage.vue";
import Navbar from "./components/ui/Navbar.vue";
</script>

<template>
  <LoadingPage />

  <div class="min-h-screen">
    <Navbar />

    <main>
      <router-view />
    </main>
  </div>
</template>
