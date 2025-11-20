<script setup>
import { Heart } from "lucide-vue-next";
import Avatar from "../Avatar.vue";
import { MessageCircle } from "lucide-vue-next";
import { Share2 } from "lucide-vue-next";

const { publication } = defineProps({
  publication: { type: Object, required: true },
});

const emit = defineEmits(["toggle-favorite"]);
</script>

<template>
  <div
    :id="publication.id"
    class="w-full bg-background rounded-2xl shadow-2xl px-6 py-4"
  >
    <router-link
      :to="`/profile/${publication?.profile?.username}`"
      class="flex items-center gap-3 justify-start w-full"
    >
      <Avatar
        :src="publication?.profile?.avatar || '/default-avatar.png'"
        size="md"
      />
      <div class="flex flex-col items-start justify-center">
        <span class="font-semibold text-text-heading text-lg">
          {{ publication?.profile?.username }}
        </span>
        <span class="text-sm">{{ publication?.profile?.tag || "User" }}</span>
      </div>
    </router-link>

    <div class="mt-4">
      <p class="text-text">
        {{ publication?.content }}
      </p>
      <div v-if="publication.image">
        <img :src="publication.image" alt="" />
      </div>
      <small>{{ publication?.created_at }}</small>
    </div>

    <ul class="flex items-center justify-start gap-2 mt-4">
      <li>
        <button
          @click="emit('toggle-favorite')"
          class="flex items-center justify-start gap-1 cursor-pointer"
        >
          <Heart
            :class="[
              'w-5 h-5 transition',
              publication?.is_favorited ? 'fill-red-500 text-red-500' : '',
            ]"
          />
          <span class="text-sm">{{
            publication?.favorites_count ?? publication?.favorites?.length
          }}</span>
        </button>
      </li>
      <li>
        <router-link
          :to="`/publication/${publication?.id}`"
          class="flex items-center justify-start gap-1 cursor-pointer"
        >
          <MessageCircle class="w-5 h-5" />
          <span class="text-sm">{{ publication?.comments?.length }}</span>
        </router-link>
      </li>
      <li>
        <button class="flex items-center justify-start gap-1 cursor-pointer">
          <Share2 class="w-5 h-5" />
        </button>
      </li>
    </ul>
  </div>
</template>
