<script setup>
import ChatListItem from "./ChatListItem.vue";

const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
  activeChat: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["select"]);
</script>

<template>
  <aside
    class="w-full max-w-1/3 p-2 h-full bg-background-bis border-r border-secondary/10 shadow-xl overflow-y-scroll"
  >
    <h1 class="ml-8 py-6 font-semibold text-2xl">Chat List</h1>

    <ul class="space-y-1">
      <template v-if="chats.length">
        <li v-for="chat in chats" :key="chat.id">
          <ChatListItem
            :chat="chat"
            :active="chat.id === activeChat?.id"
            @select="emit('select', chat)"
          />
        </li>
      </template>

      <template v-else>
        <li class="text-text text-sm ml-4">
          <p>
            No chats found.
            <router-link
              to="/feed"
              class="text-text-heading font-semibold hover:underline"
            >
              Start a conversation
            </router-link>
          </p>
        </li>
      </template>
    </ul>
  </aside>
</template>
