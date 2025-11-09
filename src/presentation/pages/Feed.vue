<script setup lang="ts">
import FeedBanner from "../components/sections/feed/FeedBanner.vue";
import FeedInput from "../components/sections/feed/FeedInput.vue";
</script>

<template>
  <main class="container mx-auto max-w-5xl pt-40">
    <FeedBanner />

    <!-- Todo => move to component -->
    <FeedInput />
  </main>
</template>
