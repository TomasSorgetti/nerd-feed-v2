<script setup>
import Background from "../../assets/background.svg";
import Video from "../../assets/video.webp";
import Badge from "../shared/Badge.vue";
import MainButton from "../shared/buttons/MainButton.vue";
</script>

<template>
  <section
    id="hero"
    aria-labelledby="hero-title"
    class="relative overflow-hidden w-full max-w-7xl container mx-auto rounded-5xl mt-32 bg-background-bis shadow-xl p-4"
  >
    <img
      :src="Background"
      alt=""
      role="presentation"
      aria-hidden="true"
      class="absolute top-0 left-0 w-full select-none pointer-events-none"
    />

    <div class="relative z-20 text-center pt-10 flex flex-col items-center">
      <Badge dataLabel="Sección de comunidad de desarrolladores"
        >Nerd Feed - For Developers, By Developers</Badge
      >

      <h1
        id="hero-title"
        class="relative text-8xl font-semibold max-w-2xl mt-2"
      >
        Share your bugs,
        <span class="text-accent animate-pulse">memes and code tips.</span>
      </h1>

      <p class="mt-10 max-w-md">
        Nerd Feed is the social network for programmers: a space to share ideas,
        epic bugs, and quick tips.
      </p>

      <div class="mt-10">
        <MainButton
          to="/auth/register"
          variant="primary"
          dataLabel="Sign up for Nerd Feed"
          >Sign Up</MainButton
        >
      </div>
    </div>

    <figure
      class="relative z-10 w-full min-h-[600px] mt-20 rounded-2xl overflow-hidden shadow-xl border border-secondary/20"
    >
      <img
        :src="Video"
        alt="Preview of Nerd Feed app interface showing developer posts"
        draggable="false"
        loading="eager"
        class="w-full h-full object-cover"
      />

      <figcaption class="sr-only">
        Example of how Nerd Feed looks — a feed for sharing developer content.
      </figcaption>
    </figure>
  </section>
</template>
