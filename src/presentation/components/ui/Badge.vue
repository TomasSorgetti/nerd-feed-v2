<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },
});

const variantClasses = computed(() => {
  return {
    "bg-background text-text-secondary": props.variant === "primary",
    "bg-secondary text-text-invert shadow-secondary/30":
      props.variant === "secondary",
  };
});
</script>

<template>
  <span
    class="border border-secondary/15 px-2 py-1 rounded-full text-xs shadow"
    :class="variantClasses"
  >
    <slot></slot>
  </span>
</template>
