<script setup>
/**
 * Todo ==> cuando se cambia el username, no se actualiza la info del usuario
 */
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { usePublicProfile } from "../composables/usePublicProfile";
import Publications from "../components/shared/Publications.vue";
import { useProfilePublications } from "../composables/useProfilePublications";
import SettingsModal from "../components/profile/SettingsModal.vue";
import ProfileHeader from "../components/profile/ProfileHeader.vue";

const route = useRoute();
const isOpenModal = ref(false);

const { user } = useAuth();
const { profile, loading, error } = usePublicProfile(route.params.username);

const profileId = computed(() => profile.value?.id);
const {
  publications,
  error: errorPublications,
  loading: loadingPublications,
} = useProfilePublications(profileId, user.value.id);

function handleAvatarUpdate({ blob, url }) {
  // profile.value.avatar = url;
  // updateAvatar(blob).then((newUrl) => {
  //   profile.value.avatar = newUrl;
  // });
}

const toggleModal = () => (isOpenModal.value = !isOpenModal.value);
</script>

<template>
  <div class="container mx-auto mt-32 max-w-5xl">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ProfileHeader
      :profile="profile"
      :user="user"
      @toggleModal="toggleModal"
      @update:avatar="handleAvatarUpdate"
    />

    <section class="mt-20">
      <h2 class="text-4xl font-semibold text-text-heading">Publications</h2>
      <Publications
        :publications="publications"
        :loading="loadingPublications"
        :error="errorPublications"
      />
    </section>

    <SettingsModal v-if="isOpenModal" @close="toggleModal" />
  </div>
</template>
