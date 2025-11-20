<script setup>
import { computed } from "vue";

const props = defineProps({
  to: { type: [String, Object], default: null },
  type: { type: String, default: "text" },
  dataLabel: { type: String, default: "" },
  variant: { type: String, default: "primary" },
  size: { type: String, default: "sm" },
  handleClick: { type: Function, default: () => {} },
});

const commonClasses =
  "relative z-10 text-center font-medium rounded-lg cursor-pointer shadow flex items-center justfy-center";

const variantClasses = computed(() => {
  return {
    "bg-primary text-text-invert hover:bg-secondary active:bg-secondary/70":
      props.variant === "primary",
    "bg-background text-text hover:bg-background-bis active:bg-background":
      props.variant === "secondary",
    "bg-secondary text-white hover:bg-secondary/60 active:bg-secondary/40":
      props.variant === "tertiary",
  };
});

const sizeClasses = computed(() => {
  return {
    "px-6 py-2": props.size === "sm",
    "px-16 py-2": props.size === "lg",
  };
});
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    :aria-label="props.dataLabel"
    :class="[commonClasses, variantClasses, sizeClasses]"
  >
    <slot>Link</slot>
  </router-link>

  <button
    v-else
    :type="type"
    @click="props.handleClick"
    :aria-label="props.dataLabel"
    :class="[commonClasses, variantClasses, sizeClasses]"
  >
    <slot>Button</slot>
  </button>
</template>
