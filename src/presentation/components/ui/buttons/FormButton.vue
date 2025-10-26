<script setup>
import { computed } from "vue";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  type: { type: String, default: "submit" },
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: "Loading..." },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: "primary" },
  full: { type: Boolean, default: true },
  ariaLabel: { type: String, default: "" },
});

const isDisabled = computed(() => props.loading || props.disabled);

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-lg shadow-sm transition duration-200";

const variants = {
  primary:
    "bg-primary text-text-invert hover:bg-secondary active:bg-secondary/70",
  secondary: "bg-secondary text-text hover:bg-secondary/80",
  outline: "border border-secondary text-text hover:bg-secondary/10",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

const sizeClasses = "h-11 px-4 text-sm";

const widthClass = computed(() => (props.full ? "w-full" : "w-auto"));
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading"
    :aria-label="ariaLabel"
    :class="[
      baseClasses,
      variants[variant],
      sizeClasses,
      widthClass,
      isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <Loader2
      v-if="loading"
      class="animate-spin"
      :size="18"
      aria-hidden="true"
    />
    <span>
      <slot v-if="!loading" />
      <span v-else>{{ loadingText }}</span>
    </span>
  </button>
</template>
