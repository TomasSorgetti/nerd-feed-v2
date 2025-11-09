<script setup>
import Avatar from "../components/ui/Avatar.vue";
import ChatListItem from "../components/ui/ChatListItem.vue";
import PrivateMessage from "../components/ui/PrivateMessage.vue";
import MainButton from "../components/ui/buttons/MainButton.vue";
</script>

<template>
  <div class="h-screen pt-32 pb-10 container mx-auto max-w-7xl">
    <div
      class="flex items-start justify-between h-full shadow-2xl border border-secondary/20 rounded-2xl overflow-hidden"
    >
      <aside
        class="w-full max-w-1/3 p-2 h-full bg-background-bis border-r border-secondary/10 shadow-xl overflow-y-scroll"
      >
        <h1 class="ml-8 py-6 font-semibold text-2xl">Chat List</h1>
        <ul class="space-y-1">
          <li>
            <ChatListItem :isActive="true" />
          </li>
          <li>
            <ChatListItem />
          </li>
          <li>
            <ChatListItem />
          </li>
          <li>
            <ChatListItem />
          </li>
        </ul>
      </aside>

      <div class="bg-background w-full h-full flex flex-col justify-between">
        <header
          class="w-full flex items-center justify-start gap-2 border-b border-secondary/10 px-8 py-4"
        >
          <Avatar :src="'/default-avatar.png'" size="lg" />
          <div>
            <h2 class="font-semibold text-xl">Username</h2>
            <p class="text-text text-sm">Online</p>
          </div>
        </header>

        <div class="w-full h-full p-8 overflow-y-scroll">
          <PrivateMessage>Hola, ¿Qué tal?</PrivateMessage>
          <PrivateMessage variant="secondary"
            >Hola, Todo bien y vos?</PrivateMessage
          >
        </div>

        <form class="w-full px-8 py-4 border-t border-secondary/10">
          <textarea
            name="new-message"
            id="new-message"
            class="w-full rounded border border-secondary/40 p-2 h-28 resize-none"
          ></textarea>
          <div class="flex w-full py-1 items-center justify-between">
            <ul></ul>
            <!-- Todo -> cuando se envia el mensaje, se limpia el textarea y se dirije el chat al final -->
            <MainButton>Send</MainButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
