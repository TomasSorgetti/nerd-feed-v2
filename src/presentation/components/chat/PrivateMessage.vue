<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },
});

const variantClasses = computed(() => {
  return {
    "justify-start": props.variant === "primary",
    "justify-end": props.variant === "secondary",
  };
});

const variantChildClasses = computed(() => {
  return {
    "bg-secondary text-background": props.variant === "primary",
    "bg-background text-text": props.variant === "secondary",
  };
});
</script>

<template>
  <div class="w-full flex items-center" :class="variantClasses">
    <div
      :class="[
        'px-4 py-3 rounded-2xl flex shadow-lg border border-secondary/20 max-w-1/2',
        variantChildClasses,
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>
