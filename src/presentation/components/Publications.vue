<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: Boolean, default: null },
  publications: { type: [Object], default: [] },
});
</script>

<template>
  <p v-if="loading" class="mt-4 text-text">Loading...</p>
  <p v-else-if="error" class="mt-4 text-text">an error occurred.</p>
  <p v-else-if="!error && publications.length === 0" class="mt-4 text-text">
    There are no publications.
  </p>

  <div v-else>
    <ul>
      <li v-for="publication in publications" :key="publication.id">
        {{ publication.title }}
      </li>
    </ul>
  </div>
</template>
