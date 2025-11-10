<script setup>
import LoadingPage from "./components/shared/LoadingPage.vue";
import Navbar from "./components/shared/Navbar.vue";
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
