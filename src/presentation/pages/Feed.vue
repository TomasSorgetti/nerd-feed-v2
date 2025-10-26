<script setup lang="ts">
import FeedBanner from "../components/sections/feed/FeedBanner.vue";
import MainButton from "../components/ui/buttons/MainButton.vue";
</script>

<template>
  <main class="container mx-auto max-w-5xl pt-40">
    <FeedBanner />

    <!-- Todo => move to component -->
    <div
      class="bg-background-bis rounded-2xl border border-secondary/15 shadow-2xl px-16 py-12 mt-20"
    >
      <textarea
        name=""
        id=""
        placeholder="Escribe tu mensaje"
        class="w-full bg-background resize-none min-h-32 p-4 border border-secondary/15 shadow-md rounded-xl"
      ></textarea>
      <div class="w-full flex items-center justify-between">
        <div></div>
        <MainButton variant="primary">Publicar</MainButton>
      </div>
    </div>
  </main>
</template>
