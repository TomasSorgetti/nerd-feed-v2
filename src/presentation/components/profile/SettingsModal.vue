<script setup>
import { ref, watch, computed } from "vue";
import MainButton from "../shared/buttons/MainButton.vue";

const emit = defineEmits(["close", "submit"]);
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

const form = ref({
  username: "",
  tag: "",
  bio: "",
});

watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      form.value.username = newProfile.username || "";
      form.value.tag = newProfile.tag || "";
      form.value.bio = newProfile.bio || "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("submit", { ...form.value });
};
</script>

<template>
  <div
    @click.self="emit('close')"
    class="fixed inset-0 z-100 w-full h-screen bg-black/30 flex justify-end"
  >
    <aside
      class="relative w-full max-w-md h-full bg-background shadow-2xl border border-secondary/30 rounded-l-2xl flex flex-col p-8"
    >
      <span class="text-2xl font-semibold text-text-heading">
        Update profile
      </span>

      <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-4">
        <div class="flex flex-col items-start">
          <label for="username" class="text-text-heading font-semibold"
            >Username:</label
          >
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="border border-secondary/30 w-full h-10 rounded px-2"
          />
        </div>

        <div class="flex flex-col items-start">
          <label for="tag" class="text-text-heading font-semibold">Tag:</label>
          <input
            type="text"
            id="tag"
            v-model="form.tag"
            class="border border-secondary/30 w-full h-10 rounded px-2"
          />
        </div>

        <div class="flex flex-col items-start">
          <label for="bio" class="text-text-heading font-semibold">Bio:</label>
          <textarea
            id="bio"
            v-model="form.bio"
            class="border border-secondary/30 w-full h-32 resize-none rounded p-2"
          ></textarea>
        </div>

        <MainButton type="submit" class="mt-4">Update</MainButton>
      </form>
    </aside>
  </div>
</template>
