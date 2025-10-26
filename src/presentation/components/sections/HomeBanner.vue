<script setup>
import Background from "../../assets/background.svg";
import Video from "../../assets/video.png";
import Badge from "../ui/Badge.vue";
import MainButton from "../ui/buttons/MainButton.vue";
</script>

<template>
  <section
    class="relative overflow-hidden w-full max-w-7xl container mx-auto rounded-5xl mt-32 bg-background-bis shadow-xl p-4"
  >
    <img
      :src="Background"
      alt=""
      class="absolute top-0 left-0 w-full select-none pointer-events-none"
    />

    <div class="relative z-20 text-center pt-10 flex flex-col items-center">
      <Badge>Nerd Feed - For Developers, By Developers</Badge>
      <h1 class="relative text-8xl font-semibold max-w-2xl mt-2">
        Share your bugs,
        <span class="text-accent animate-pulse">memes and code tips.</span>
      </h1>
      <p class="mt-10 max-w-md">
        Nerd Feed is the social network for programmers: a space to share ideas,
        epic bugs, and quick tips.
      </p>
      <MainButton to="/auth/register" variant="primary">Sign Up</MainButton>
    </div>

    <div
      class="relative z-10 w-full min-h-[600px] mt-20 rounded-2xl overflow-hidden shadow-xl border border-secondary/20"
    >
      <img
        :src="Video"
        alt="nerd feed video"
        class="w-full h-full object-cover"
      />
    </div>
  </section>
</template>
