<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Avatar from "../../components/shared/Avatar.vue";
import { useAuth } from "../../composables/useAuth";
import { usePublicProfile } from "../../composables/usePublicProfile";
import MainButton from "../../components/shared/buttons/MainButton.vue";
import Publications from "../../components/shared/Publications.vue";
import { useProfilePublications } from "../../composables/useProfilePublications";
import { Settings } from "lucide-vue-next";

const route = useRoute();

const { user } = useAuth();
const { profile, loading, error } = usePublicProfile(route.params.username);

const profileId = computed(() => profile.value?.id);

const {
  publications,
  error: errorPublications,
  loading: loadingPublications,
} = useProfilePublications(profileId);
</script>

<template>
  <div class="container mx-auto mt-32 max-w-5xl">
    <!-- Todo improve loading -->
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <section class="flex items-start justify-start gap-16">
      <h1 class="sr-only">User Profile Page {{ profile?.username }}</h1>
      <Avatar :src="profile?.avatar || '/default-avatar.png'" size="3xl" />

      <div class="h-full flex flex-col items-start">
        <h2 class="text-3xl text-black font-semibold mt-4">
          {{ profile?.username }}
        </h2>
        <span>{{ profile?.tag }}</span>
        <p class="max-w-md text-secondary mt-2">
          {{ profile?.bio || "This user does not have a bio yet." }}
        </p>

        <div class="flex items-center gap-2 mt-4">
          <template v-if="user?.profile?.username !== profile?.username">
            <MainButton variant="tertiary">Follow</MainButton>
            <MainButton :to="`/chat?user=${profile?.username}`"
              >Send Message</MainButton
            >
          </template>

          <template v-else>
            <MainButton>
              <Settings class="mr-2 w-4 h-4" />
              Settings
            </MainButton>
          </template>
        </div>
      </div>
    </section>

    <section class="mt-20">
      <h2 class="text-4xl font-semibold text-text-heading">Publications</h2>
      <Publications
        :publications="publications"
        :loading="loadingPublications"
        :error="errorPublications"
      />
    </section>
  </div>
</template>
