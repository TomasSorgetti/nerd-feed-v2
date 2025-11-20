<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { usePublicProfile } from "../composables/usePublicProfile";
import Publications from "../components/shared/Publications.vue";
import SettingsModal from "../components/profile/SettingsModal.vue";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import { usePublications } from "../composables/usePublications";

const router = useRouter();
const route = useRoute();
const isOpenModal = ref(false);

const { user } = useAuth();
const { profile, loading, error, updateProfile, updateAvatar } =
  usePublicProfile(
    computed(() => route.params.username),
    user
  );

const profileId = computed(() => profile.value?.id);
const {
  publications,
  error: errorPublications,
  loading: loadingPublications,
} = usePublications({
  type: "profile",
  profileId,
  userId: user.value.id,
});

const handleAvatarUpdate = async ({ blob, url }) => {
  try {
    const oldAvatar = profile.value.avatar;

    const updatedProfile = await updateAvatar(profile.value.id, blob);

    profile.value.avatar = updatedProfile.avatar;

    if (user.value.id === updatedProfile.id) {
      Object.assign(user.value, updatedProfile);
    }
  } catch (err) {
    console.error("Error updating avatar:", err);
  }
};
const handleUpdateProfile = async (formData) => {
  try {
    const updatedProfile = await updateProfile(profile.value.id, formData);

    profile.value = updatedProfile;

    if (user.value.id === updatedProfile.id) {
      Object.assign(user.value, updatedProfile);
    }

    if (route.params.username !== updatedProfile.username) {
      router.push({
        name: "Profile",
        params: { username: updatedProfile.username },
      });
    }

    isOpenModal.value = false;
  } catch (err) {
    console.error(err);
  }
};
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

    <SettingsModal
      v-if="isOpenModal"
      :profile="profile"
      @close="toggleModal"
      @submit="handleUpdateProfile"
    />
  </div>
</template>
