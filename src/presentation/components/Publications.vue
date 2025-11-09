<script setup>
import Publication from "./ui/cards/Publication.vue";

const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: Boolean, default: null },
  publications: { type: [Object], default: [] },
});
</script>

<template>
  <div class="mt-20 text-text">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">An error occurred.</p>
    <p v-else-if="!error && publications.length === 0">
      There are no publications.
    </p>

    <div v-else>
      <ul class="space-y-4">
        <li v-for="publication in publications" :key="publication.id">
          <Publication :publication="publication" />
        </li>
      </ul>
    </div>
  </div>
</template>
