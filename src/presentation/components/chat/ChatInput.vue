<script setup>
import { Paperclip } from "lucide-vue-next";
import MainButton from "../ui/buttons/MainButton.vue";

const props = defineProps({
  activeChat: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <form v-if="activeChat" class="w-full px-8 py-4 border-t border-secondary/10">
    <textarea
      name="new-message"
      id="new-message"
      class="w-full rounded border border-secondary/40 p-2 h-28 resize-none"
    ></textarea>
    <div class="flex w-full py-1 items-center justify-between">
      <ul>
        <li>
          <Paperclip />
        </li>
      </ul>
      <MainButton>Send</MainButton>
    </div>
  </form>
</template>
