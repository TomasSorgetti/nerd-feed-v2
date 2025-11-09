<script setup>
import MainButton from "../../ui/buttons/MainButton.vue";

const handleSubmit = () => {};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-background-bis rounded-2xl border border-secondary/15 shadow-2xl px-16 py-12 mt-20"
  >
    <textarea
      name="feed"
      id="feed"
      placeholder="Escribe tu mensaje"
      class="w-full bg-background resize-none min-h-32 p-4 border border-secondary/15 shadow-md rounded-xl"
    ></textarea>
    <div class="w-full flex items-center justify-between mt-6">
      <div></div>
      <MainButton type="submit" variant="primary">Publicar</MainButton>
    </div>
  </form>
</template>
