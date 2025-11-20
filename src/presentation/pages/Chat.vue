<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useChats } from "../composables/useChat";

import ChatSidebar from "../components/chat/ChatSidebar.vue";
import ChatHeader from "../components/chat/ChatHeader.vue";
import ChatWindow from "../components/chat/ChatWindow.vue";
import ChatInput from "../components/chat/ChatInput.vue";
import { useMessages } from "../composables/useMessages";

const route = useRoute();
const { user } = useAuth();
const { chats, createChat } = useChats(computed(() => user.value?.id));
const queryUserId = computed(() => route.query.user || null);
const activeChat = ref(null);

const chatId = computed(() => activeChat.value?.id || null);
const { messages, sendMessage } = useMessages(
  chatId,
  computed(() => user.value?.id)
);

watch(queryUserId, () => {
  activeChat.value = null;
});

/**
 * Estoy cansado jefe
 * Todo -> tal vez esta logica la deberia hacer el createChat
 */
watch(chats, async () => {
  if (!queryUserId.value) return;

  const chatExists = chats.value.find((chat) => {
    console.log(chat);

    return chat.profile?.username === queryUserId.value;
  });

  console.log("Chat exists: ", { chatExists });

  if (chatExists) {
    activeChat.value = chatExists;
    return;
  }

  const newLocalChat = await createChat(
    { from: user.value.id, to: queryUserId.value },
    { local: true }
  );

  activeChat.value = newLocalChat;
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
        <ChatWindow :activeChat="activeChat" :messages="messages" />
        <ChatInput
          :activeChat="activeChat"
          :sendMessage="sendMessage"
          :createChat="createChat"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>
