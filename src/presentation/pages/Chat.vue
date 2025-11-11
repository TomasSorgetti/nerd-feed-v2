<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useChats } from "../composables/useChat";

import ChatSidebar from "../components/chat/ChatSidebar.vue";
import ChatHeader from "../components/chat/ChatHeader.vue";
import ChatWindow from "../components/chat/ChatWindow.vue";
import ChatInput from "../components/chat/ChatInput.vue";

const route = useRoute();
const { user } = useAuth();
const { chats, createChat } = useChats(user?.value?.id);
const queryUserId = computed(() => route.query.user || null);
const activeChat = ref(null);

watch(queryUserId, () => {
  activeChat.value = null;
});

/**
 * Estoy cansado jefe
 */
watch(chats, async () => {
  /**
   * Todo -> tal vez esta logica la deberia hacer el createChat
   */
  if (queryUserId.value) {
    const chatExists = chats.value.find(
      (chat) => chat.username === queryUserId.value
    );
    if (chatExists) {
      // si ya existe un chat con este usuario, se setea como active
      activeChat.value = chatExists;
    } else {
      // si no existe un chat con este usuario, se crea uno localmente y se setea como active
      const newLocalChat = await createChat(
        { from: user.value.id, to: queryUserId.value },
        { local: true }
      );
      activeChat.value = newLocalChat;
    }
  }
});
</script>

<template>
  <div class="h-screen pt-32 pb-10 container mx-auto max-w-7xl">
    <div
      class="flex h-full shadow-2xl border border-secondary/20 rounded-2xl overflow-hidden"
    >
      <ChatSidebar
        :chats="chats"
        :activeChat="activeChat"
        @select="activeChat = $event"
      />

      <div class="bg-background w-full h-full flex flex-col justify-between">
        <ChatHeader
          :activeChat="activeChat"
          :username="activeChat?.profile?.username"
        />
        <ChatWindow :activeChat="activeChat" />
        <ChatInput :activeChat="activeChat" />
      </div>
    </div>
  </div>
</template>
