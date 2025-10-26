<script setup>
import GoogleIcon from "../../../assets/icons/google.svg";
</script>

<template>
  <button
    type="button"
    class="w-full h-11 text-sm bg-background border border-secondary/30 rounded-lg text-text duration-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary/5 hover:shadow-lg"
  >
    <img :src="GoogleIcon" alt="google icon" class="size-6" />
    <slot />
  </button>
</template>
