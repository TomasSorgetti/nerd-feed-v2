<script setup>
import { computed } from "vue";

const props = defineProps({
  src: { type: String, default: "" },
  alt: { type: String, default: "User avatar" },
  size: { type: [Number, String], default: "md" },
  rounded: { type: String, default: "full" },
  clickable: { type: Boolean, default: false },
  onClick: { type: Function },
  ring: { type: Boolean, default: false },
});

const sizeClass = computed(() => {
  if (typeof props.size === "number") {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
    };
  }

  const map = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
    "3xl": "w-60 h-60",
  };
  return map[props.size] || map.md;
});
</script>

<template>
  <button
    v-if="clickable"
    type="button"
    @click="onClick"
    :aria-label="alt"
    class="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  >
    <div
      :class="[
        'overflow-hidden border border-secondary/50 bg-gray-100 shrink-0',
        ring ? 'ring-2 ring-accent' : '',
        `rounded-${rounded}`,
        typeof size === 'string' ? sizeClass : '',
      ]"
      :style="typeof size === 'number' ? sizeClass : undefined"
    >
      <img
        :src="src"
        :alt="alt"
        class="object-cover w-full h-full select-none"
        loading="lazy"
        draggable="false"
        decoding="async"
      />
    </div>
  </button>

  <div
    v-else
    :class="[
      'overflow-hidden border border-secondary/50 bg-gray-100 shrink-0',
      ring ? 'ring-2 ring-accent' : '',
      `rounded-${rounded}`,
      typeof size === 'string' ? sizeClass : '',
    ]"
    :style="typeof size === 'number' ? sizeClass : undefined"
  >
    <img
      :src="src"
      :alt="alt"
      class="object-cover w-full h-full select-none"
      loading="lazy"
      draggable="false"
      decoding="async"
    />
  </div>
</template>
