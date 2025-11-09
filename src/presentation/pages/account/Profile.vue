<script setup>
import { useRoute } from "vue-router";
import Avatar from "../../components/ui/Avatar.vue";
import { useAuth } from "../../composables/useAuth";
import { usePublicProfile } from "../../composables/usePublicProfile";
import MainButton from "../../components/ui/buttons/MainButton.vue";
import Publications from "../../components/Publications.vue";
import { useProfilePublications } from "../../composables/useProfilePublications";

const route = useRoute();

const { user } = useAuth();
const { profile, loading, error } = usePublicProfile(route.params.username);
const { publications } = useProfilePublications(profile?.id);
</script>

<template>
  <div class="container mx-auto mt-32 max-w-5xl">
    <!-- Todo loading -->
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <section class="flex items-start justify-start gap-16">
      <h1 class="sr-only">User Profile Page - Coming soon</h1>
      <Avatar size="3xl" />
      <div class="h-full flex flex-col items-start">
        <h2 class="text-3xl text-black font-semibold mt-4">
          {{ profile?.username }}
        </h2>
        <span>{{ profile?.tag }}</span>
        <p class="max-w-md text-secondary mt-2">
          Nerd Feed is the social network for programmers: a space to share
          ideas, epic bugs, and quick tips.
        </p>

        <div class="flex items-center gap-2 mt-4">
          <template v-if="user?.profile?.username !== profile?.username">
            <MainButton variant="tertiary">Follow</MainButton>
            <MainButton>Send Message</MainButton>
          </template>

          <template v-else>
            <MainButton variant="tertiary">Settings</MainButton>
            <MainButton>Add Post</MainButton>
          </template>
        </div>
      </div>
    </section>

    <section class="mt-20">
      <h2 class="text-4xl font-semibold text-text-heading">Publications</h2>
      <Publications :publications="publications" />
    </section>
  </div>
</template>
