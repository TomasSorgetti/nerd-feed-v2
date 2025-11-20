import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { ProfileService } from "../../application/profile/ProfileService.js";

const profileService = new ProfileService();

export function usePublicProfile(usernameRef, currentUserRef) {
  const profile = ref(null);
  const loading = ref(true);
  const error = ref(null);

  let unsubscribe = () => {};

  const loadProfile = async (username) => {
    if (!username) return;
    loading.value = true;
    error.value = null;
    try {
      profile.value = await profileService.getPublicProfile(username);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const subscribeToProfile = (username) => {
    if (unsubscribe) unsubscribe();
    if (!username) return;

    unsubscribe = profileService.subscribe((p) => {
      profile.value = p;
    });

    const cached = profileService.getCached(username);
    if (cached) {
      profile.value = cached;
      loading.value = false;
    } else {
      loadProfile(username);
    }
  };

  const updateProfile = async (profileId, updatedData) => {
    try {
      loading.value = true;
      const updatedProfile = await profileService.updateProfile(
        profileId,
        updatedData
      );

      profile.value = updatedProfile;

      //! important -> sin esto no se actualiza el profile global
      if (currentUserRef?.value?.id === updatedProfile.id) {
        Object.assign(currentUserRef.value, updatedProfile);
        if (currentUserRef.value.profile) {
          Object.assign(currentUserRef.value.profile, updatedProfile);
        }
      }

      return updatedProfile;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAvatar = async (profileId, file) => {
    try {
      loading.value = true;

      const updatedProfile = await profileService.updateAvatar(profileId, file);
      profile.value = updatedProfile;

      if (currentUserRef?.value?.id === updatedProfile.id) {
        Object.assign(currentUserRef.value, updatedProfile);
        if (currentUserRef.value.profile) {
          Object.assign(currentUserRef.value.profile, updatedProfile);
        }
      }

      return updatedProfile;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    subscribeToProfile(usernameRef.value);
  });

  watch(usernameRef, (newUsername) => {
    subscribeToProfile(newUsername);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return {
    profile,
    loading,
    error,
    reload: loadProfile,
    updateProfile,
    updateAvatar,
  };
}
