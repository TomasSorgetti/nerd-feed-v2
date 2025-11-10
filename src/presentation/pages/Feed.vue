<script setup lang="ts">
import Publications from "../components/ui/Publications.vue";
import FeedBanner from "../components/feed/FeedBanner.vue";
import FeedInput from "../components/feed/FeedInput.vue";
import { useAuth } from "../composables/useAuth";
import { useFeedPublications } from "../composables/useFeedPublications";

const { user } = useAuth();
/**
 * todo -> fix loading all components
 * todo -> deberia crear un loading local unicamente para el create publication y usar el loading global para cuando cargan
 */
const {
  publications,
  loading: loadingPublications,
  error: errorPublications,
  createPublication,
} = useFeedPublications();

const handleCreatePublication = async ({ content, image }) => {
  createPublication({ content, image, user_id: user.value.id });
};
</script>

<template>
  <main class="container mx-auto max-w-5xl pt-40">
    <FeedBanner />
    <FeedInput @submit="handleCreatePublication" />
    <Publications
      :publications="publications"
      :loading="loadingPublications"
      :error="errorPublications"
    />
  </main>
</template>
