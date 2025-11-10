<script setup>
import logo from "../../assets/logo.svg";
import PrivateMessage from "./PrivateMessage.vue";

const props = defineProps({
  activeChat: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="w-full h-full p-8 overflow-y-scroll">
    <template v-if="activeChat">
      <PrivateMessage>Hola, ¿Qué tal?</PrivateMessage>
      <PrivateMessage variant="secondary"
        >Hola, Todo bien y vos?</PrivateMessage
      >
    </template>

    <template v-else>
      <div
        class="w-full h-full text-center flex flex-col items-center justify-center"
      >
        <img
          :src="logo"
          alt="Nerd Feed Logo"
          draggable="false"
          loading="lazy"
          class="w-30 h-30"
        />
        <p class="max-w-md text-text mt-6">
          Nerd Feed is the social network for programmers: a space to share
          ideas, epic bugs, and quick tips.
        </p>
      </div>
    </template>
  </div>
</template>
