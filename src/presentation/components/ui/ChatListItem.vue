<script setup>
import { Bell } from "lucide-vue-next";
import Avatar from "./Avatar.vue";

const props = defineProps({
  isActive: { type: Boolean, default: false },
});
</script>

<template>
  <button
    class="flex items-center gap-4 py-4 px-6 w-full hover:bg-background hover:shadow-md rounded duration-300 cursor-pointer"
    :class="isActive ? 'bg-background shadow-md' : ''"
  >
    <Avatar :src="'/default-avatar.png'" size="sm" />
    <div class="flex items-center justify-between w-full">
      <ol class="w-full flex flex-col items-start flex-1">
        <li>
          <h2 class="font-semibold text-text-heading text-base">Username</h2>
        </li>
        <li class="text-text text-sm">
          <p>Last message...</p>
        </li>
      </ol>
      <div class="flex flex-col items-center gap-1">
        <time datetime="" class="text-text text-xs">9:42 a.m.</time>
        <Bell class="w-4 h-4 text-text" />
      </div>
    </div>
  </button>
</template>
