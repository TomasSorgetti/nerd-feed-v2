<script setup>
import Background from "../../assets/background_black.svg";
import Badge from "../ui/Badge.vue";
import MainButton from "../ui/buttons/MainButton.vue";
</script>

<template>
  <section class="px-4 mt-30">
    <div
      class="relative overflow-hidden w-full h-180 bg-tertiary rounded-t-5xl flex items-center justify-center"
    >
      <img
        :src="Background"
        alt=""
        class="absolute top-0 left-0 w-full select-none pointer-events-none"
      />

      <div class="relative z-20 flex flex-col items-center text-center">
        <Badge variant="secondary"
          >Nerd Feed - For Developers, By Developers</Badge
        >
        <h2 class="text-6xl font-medium max-w-xl text-text-invert mt-4">
          Share your bugs, memes and code tips.
        </h2>
        <p class="mt-10 mb-4 max-w-md text-text-invert">
          Nerd Feed is the social network for programmers: a space to share
          ideas, epic bugs, and quick tips.
        </p>
        <MainButton to="/auth/register" variant="secondary" size="lg"
          >Sign Up for Free</MainButton
        >
      </div>
    </div>
  </section>
</template>
