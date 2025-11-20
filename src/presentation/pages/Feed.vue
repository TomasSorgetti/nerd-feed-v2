<script setup>
import Publications from "../components/shared/Publications.vue";
import FeedBanner from "../components/feed/FeedBanner.vue";
import FeedInput from "../components/feed/FeedInput.vue";
import { useAuth } from "../composables/useAuth";
import { useFavorite } from "../composables/useFavorite";
import { usePublications } from "../composables/usePublications";

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
} = usePublications({
  type: "feed",
  userId: user.value.id,
});

const { toggleFavorite } = useFavorite();

const handleCreatePublication = async ({ content, image }) => {
  createPublication({ content, image, user_id: user.value.id });
};

const handleToggleFavorite = async (publication) => {
  if (!user.value) return;
  await toggleFavorite(user.value.id, publication.id, publication.is_favorited);

  publication.is_favorited = !publication.is_favorited;
  publication.favorites_count += publication.is_favorited ? 1 : -1;
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
      @toggle-favorite="handleToggleFavorite"
    />
  </main>
</template>
