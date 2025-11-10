<script setup>
import Avatar from "../shared/Avatar.vue";

const props = defineProps({
  activeChat: {
    type: Object,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <header
    v-if="props.activeChat"
    class="w-full flex items-center justify-start gap-2 border-b border-secondary/10 px-8 py-4"
  >
    <Avatar :src="'/default-avatar.png'" size="lg" />
    <div>
      <h2 class="font-semibold text-xl">{{ props.username || "Anonymous" }}</h2>
      <p class="text-text text-sm">Online</p>
    </div>
  </header>
</template>
