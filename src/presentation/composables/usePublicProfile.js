import { ref, onMounted } from "vue";
import { ProfileService } from "../../application/profile/ProfileService.js";

const profileService = new ProfileService();

export function usePublicProfile(username) {
  const profile = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const loadProfile = async () => {
    if (!username) {
      error.value = "No username provided";
      loading.value = false;
      return;
    }

    try {
      profile.value = await profileService.getPublicProfile(username);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadProfile);

  //? Reload para volver a cargar el perfil serpía necesario?
  return { profile, loading, error, reload: loadProfile };
}
