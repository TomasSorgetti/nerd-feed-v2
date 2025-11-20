<script setup>
import Avatar from "../Avatar.vue";

const { comment } = defineProps({
  comment: { type: Object, required: true },
});
</script>

<template>
  <div class="w-full border border-black/5 rounded-md p-2 shadow-md mt-2">
    <router-link
      :to="`/profile/${comment?.profile?.username}`"
      class="flex items-center gap-3 justify-start w-full"
    >
      <Avatar
        :src="comment?.profile?.avatar || '/default-avatar.png'"
        size="sm"
      />
      <div class="flex flex-col items-start justify-center">
        <h1 class="font-semibold text-text-heading text-sm">
          {{ comment?.profile?.username }}
          <span class="sr-only">comment</span>
        </h1>
        <span class="text-xs">{{
          comment?.profile?.tag || "Nerd feed user"
        }}</span>
      </div>
    </router-link>

    <p class="text-base mt-2">{{ comment?.content }}</p>
  </div>
</template>
