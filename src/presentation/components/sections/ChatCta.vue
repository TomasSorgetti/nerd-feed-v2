<script setup>
import Background from "../../assets/background.svg";
import ChatVideo from "../../assets/chat.png";
import Badge from "../ui/Badge.vue";
import MainButton from "../ui/buttons/MainButton.vue";
</script>

<template>
  <section
    id="cta-chat"
    aria-labelledby="cta-chat-title"
    class="relative overflow-hidden w-full max-w-7xl container mx-auto rounded-5xl mt-32 border border-secondary/15 bg-background-bis shadow-xl p-4 flex flex-col items-center text-center gap-6 py-10"
  >
    <img
      :src="Background"
      alt=""
      role="presentation"
      aria-hidden="true"
      draggable="false"
      loading="lazy"
      class="absolute top-0 left-0 w-full select-none pointer-events-none"
    />

    <div class="relative z-20 flex flex-col items-center pt-6">
      <Badge dataLabel="Sección de comunidad de desarrolladores"
        >Nerd Feed - For Developers, By Developers</Badge
      >

      <h2 id="cta-chat-title" class="text-6xl font-medium max-w-xl mt-2">
        Share your bugs, memes and code tips.
      </h2>

      <p class="mt-6 max-w-md text-text">
        Nerd Feed is the social network for programmers: a space to share ideas,
        epic bugs, and quick tips.
      </p>
    </div>

    <figure>
      <img
        :src="ChatVideo"
        alt="Preview of Nerd Feed chat interface showing developer messages"
        draggable="false"
        loading="lazy"
        class="relative z-20 w-full max-w-200 mx-auto border border-secondary/15 rounded-2xl shadow-2xl mt-10"
      />

      <figcaption class="sr-only">
        Example of how Nerd Feed looks — a feed for sharing developer content.
      </figcaption>
    </figure>

    <MainButton
      to="/auth/register"
      variant="primary"
      size="lg"
      dataLabel="Sign up for Nerd Feed to join the chat"
      >Sign Up</MainButton
    >
  </section>
</template>
