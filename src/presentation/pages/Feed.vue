<script setup lang="ts">
import Publications from "../components/Publications.vue";
import FeedBanner from "../components/sections/feed/FeedBanner.vue";
import FeedInput from "../components/sections/feed/FeedInput.vue";
import { useFeedPublications } from "../composables/useFeedPublications";

const {
  publications,
  loading: loadingPublications,
  error: errorPublications,
} = useFeedPublications();
</script>

<template>
  <main class="container mx-auto max-w-5xl pt-40">
    <FeedBanner />
    <FeedInput />
    <Publications
      :publications="publications"
      :loading="loadingPublications"
      :error="errorPublications"
    />
  </main>
</template>
