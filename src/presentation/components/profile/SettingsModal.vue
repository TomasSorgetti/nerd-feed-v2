<script setup>
import { ref } from "vue";
import MainButton from "../shared/buttons/MainButton.vue";

const emit = defineEmits(["close", "submit"]);

const form = ref({
  username: "",
  tag: "",
  bio: "",
});
</script>

<template>
  <div
    @close="emit('close')"
    class="fixed inset-0 z-100 w-full h-screen bg-black/30"
  >
    <div class="relative w-full h-full">
      <aside
        class="absolute top-0 right-0 w-full h-full max-w-md bg-background shadow-2xl border border-secondary/30 rounded-l-2xl flex flex-col p-8"
      >
        <span class="text-2xl font-semibold text-text-heading"
          >Update profile</span
        >
        <form @submit.prevent="emit('submit')" class="mt-6">
          <!-- Username -->
          <div class="w-full flex flex-col items-start mt-4">
            <label for="username" class="text-text-heading font-semibold"
              >Username:</label
            >
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              class="border border-secondary/30 w-full h-10 rounded"
            />
          </div>

          <!-- Tag -->
          <div class="w-full flex flex-col items-start mt-4">
            <label for="tag" class="text-text-heading font-semibold"
              >Tag:</label
            >
            <input
              type="text"
              name="tag"
              id="tag"
              v-model="tag"
              class="border border-secondary/30 w-full h-10 rounded"
            />
          </div>

          <!-- Bio -->
          <div class="w-full flex flex-col items-start mt-4">
            <label for="bio" class="text-text-heading font-semibold"
              >Bio:</label
            >
            <textarea
              name="bio"
              id="bio"
              v-model="bio"
              class="border border-secondary/30 w-full h-30 resize-none rounded"
            ></textarea>
          </div>

          <div class="mt-10 w-full">
            <MainButton type="submit">Update</MainButton>
          </div>
        </form>
      </aside>
    </div>
  </div>
</template>
