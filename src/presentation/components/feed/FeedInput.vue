<script setup>
import { ref } from "vue";
import MainButton from "../ui/buttons/MainButton.vue";

const emit = defineEmits(["submit"]);

const content = ref("");
</script>

<template>
  <form
    @submit.prevent="
      emit('submit', { content: content.valueOf(), image: null })
    "
    class="bg-background-bis rounded-2xl border border-secondary/15 shadow-2xl px-16 py-12 mt-20"
  >
    <textarea
      v-model="content"
      name="content"
      id="content"
      placeholder="Write something..."
      class="w-full bg-background resize-none min-h-32 p-4 border border-secondary/15 shadow-md rounded-xl"
    ></textarea>
    <div class="w-full flex items-center justify-between mt-6">
      <div></div>
      <MainButton type="submit" variant="primary">Publish</MainButton>
    </div>
  </form>
</template>
