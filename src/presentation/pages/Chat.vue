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

const queryName = computed(() => route.query.user || null);
const chatsState = ref(null);
const activeChat = ref(null);

watch(
  () => user.value?.id,
  (userId) => {
    if (userId) {
      chatsState.value = useChats(userId);
      chatsState.value.reload();
    }
  },
  { immediate: true }
);

watch(
  [queryName, () => chatsState.value],
  async ([username, state]) => {
    if (!username || !state || !state.chats || !user.value) return;

    const chats = state.chats.value;
    console.log("Chats: ", chats);
    if (!Array.isArray(chats)) return;

    console.log("Watcher ejecutado", { username, chats: chats.length });

    const existingChat = chats.find(
      (chat) =>
        chat.users?.includes(user.value.id) && chat.users?.includes(username)
    );

    if (existingChat) {
      activeChat.value = existingChat;
    } else {
      console.log("Creando chat local con", username);
      const newChat = await state.createChat(
        { from: user.value.id, to: username },
        { local: true }
      );
      if (newChat) {
        activeChat.value = newChat;
        console.log("Chat creado:", newChat.id);
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="h-screen pt-32 pb-10 container mx-auto max-w-7xl">
    <div
      class="flex h-full shadow-2xl border border-secondary/20 rounded-2xl overflow-hidden"
    >
      <ChatSidebar
        :chats="chatsState?.chats?.value || []"
        :activeChat="activeChat"
        @select="activeChat = $event"
      />

      <div class="bg-background w-full h-full flex flex-col justify-between">
        <ChatHeader :activeChat="activeChat" :username="queryName" />
        <ChatWindow :activeChat="activeChat" />
        <ChatInput :activeChat="activeChat" />
      </div>
    </div>
  </div>
</template>
