<script setup>
import logo from "../../assets/logo.svg";
import PrivateMessage from "./PrivateMessage.vue";

const props = defineProps({
  messages: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="w-full h-full p-8 overflow-y-scroll">
    <template v-if="messages.length">
      <PrivateMessage
        v-for="msg in messages"
        :key="msg.id"
        :variant="msg.isMine ? 'primary' : 'secondary'"
      >
        {{ msg.content }}
      </PrivateMessage>
    </template>

    <template v-else>
      <div
        class="w-full h-full text-center flex flex-col items-center justify-center"
      >
        <img :src="logo" draggable="false" loading="lazy" class="w-30 h-30" />
        <p class="max-w-md text-text mt-6">
          Select a chat to start the conversation.
        </p>
      </div>
    </template>
  </div>
</template>
