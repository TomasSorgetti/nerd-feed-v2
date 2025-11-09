<script setup>
import Avatar from "../Avatar.vue";
const { publication } = defineProps({
  publication: { type: Object, required: true },
});
</script>

<template>
  <div
    :id="publication.id"
    class="w-full bg-background rounded-2xl shadow-2xl px-6 py-4"
  >
    <div class="flex items-center gap-3 justify-start w-full">
      <Avatar
        :src="publication?.profile?.avater || '/default-avatar.png'"
        size="md"
      />
      <div class="flex flex-col items-start justify-center">
        <span class="font-semibold text-text-heading text-lg">
          {{ publication?.profile?.username }}
        </span>
        <span class="text-sm">{{ publication?.profile?.tag || "User" }}</span>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-text">
        {{ publication.content }}
      </p>
      <small>{{ publication.created_at }}</small>
    </div>
  </div>
</template>
<!-- {
    "id": "3abafdf0-dabe-4411-98d0-1e78c3715312",
    "created_at": "2025-10-06T22:37:23.506+00:00",
    "content": "Probando...",
    "user_id": "01e400ee-47ad-4ad6-ab9f-705ee3220436",
    "profile": {
        "id": "01e400ee-47ad-4ad6-ab9f-705ee3220436",
        "avatar": null,
        "username": "Tomas Sorg"
    }
} -->
