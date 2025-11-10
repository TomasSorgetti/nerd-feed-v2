<script setup>
import { defineAsyncComponent } from "vue";
import Seo from "../components/Seo.vue";
import HomeBanner from "../components/home/HomeBanner.vue";

const ChatCta = defineAsyncComponent(() =>
  import("../components/home/ChatCta.vue")
);
const HomeCta = defineAsyncComponent(() =>
  import("../components/home/HomeCta.vue")
);
const Sponsors = defineAsyncComponent(() =>
  import("../components/home/Sponsors.vue")
);
</script>

<template>
  <Seo
    title="Nerd Feed - For Developers, By Developers"
    description="Nerd Feed is the social network for programmers: a space to share ideas, epic bugs, and quick tips."
    canonical="/"
    robots="index, follow"
  />

  <HomeBanner />
  <Sponsors />
  <ChatCta />
  <HomeCta />
</template>
