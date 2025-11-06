<script setup>
import { useHead } from "@vueuse/head";

const BASE_URI = "https://nerdfeed.com";

const { title, description, canonical, robots } = defineProps({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  canonical: { type: String, default: "/" },
  robots: { type: String, default: "index, follow" },
});

useHead({
  title: title,
  meta: [
    { name: "description", content: description },
    { name: "robots", content: robots },
  ],
  link: [{ rel: "canonical", href: `${BASE_URI}${canonical}` }],
});
</script>

<template></template>
