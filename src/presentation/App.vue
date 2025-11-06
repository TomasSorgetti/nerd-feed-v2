<script setup>
import LoadingPage from "./components/LoadingPage.vue";
import Navbar from "./components/Navbar.vue";
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
