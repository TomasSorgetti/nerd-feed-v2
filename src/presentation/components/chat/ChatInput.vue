<script setup>
import { ref } from "vue";
import { Paperclip } from "lucide-vue-next";
import MainButton from "../shared/buttons/MainButton.vue";

const props = defineProps({
  activeChat: Object,
  sendMessage: Function,
  createChat: Function,
  user: Object,
});

const text = ref("");

const handleSend = async () => {
  if (!text.value.trim()) return;

  let chat = props.activeChat;

  if (chat.is_local) {
    const newChat = await props.createChat(
      { from: props.user.id, to: chat.profile?.id },
      { local: false }
    );

    if (!newChat) return;

    chat = newChat;
  }

  await props.sendMessage(text.value);

  text.value = "";
};
</script>

<template>
  <form
    v-if="activeChat"
    class="w-full px-8 py-4 border-t border-secondary/10"
    @submit.prevent="handleSend"
  >
    <textarea
      v-model="text"
      class="w-full rounded border border-secondary/40 p-2 h-28 resize-none"
      placeholder="Write a message..."
    ></textarea>

    <div class="flex w-full py-1 items-center justify-between">
      <Paperclip />
      <MainButton type="submit">Send</MainButton>
    </div>
  </form>
</template>
