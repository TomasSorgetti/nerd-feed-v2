<script setup>
import { computed } from "vue";

const props = defineProps({
  to: { type: [String, Object], default: null },
  dataLabel: { type: String, default: "" },
  variant: { type: String, default: "primary" },
  handleClick: { type: Function, default: () => {} },
});

const commonClasses =
  "py-2 px-6 font-medium mt-10 rounded-lg cursor-pointer shadow";

const classes = computed(() => {
  return {
    "bg-primary text-text-invert": props.variant === "primary",
    "bg-background text-text": props.variant === "secondary",
  };
});
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    :aria-label="props.dataLabel"
    :class="[commonClasses, classes]"
  >
    <slot>Link</slot>
  </router-link>

  <button
    v-else
    type="button"
    @click="props.handleClick"
    :aria-label="props.dataLabel"
    :class="[commonClasses, classes]"
  >
    <slot>Button</slot>
  </button>
</template>
