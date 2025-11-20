import { ref, watch, onMounted, onUnmounted } from "vue";
import { ProfileService } from "../../application/profile/ProfileService.js";

const profileService = new ProfileService();

// todo -> refactor to observer
export function usePublicProfile(usernameRef) {
  const profile = ref(null);
  const loading = ref(true);
  const error = ref(null);

  let unsubscribe = null;

  const loadProfile = async (username) => {
    if (!username) return;
    loading.value = true;
    error.value = null;
    try {
      await profileService.getPublicProfile(username);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const subscribeToProfile = (username) => {
    if (unsubscribe) unsubscribe();
    if (!username) return;

    unsubscribe = profileService.subscribe(username, (p) => {
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

  onMounted(() => {
    subscribeToProfile(usernameRef.value);
  });

  watch(usernameRef, (newUsername) => {
    subscribeToProfile(newUsername);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { profile, loading, error, reload: loadProfile };
}
