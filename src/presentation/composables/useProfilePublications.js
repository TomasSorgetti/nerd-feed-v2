import { ref, watch } from "vue";
import { PublicationService } from "../../application/publication/PublicationService.js";

const publicationService = new PublicationService();

export function useProfilePublications(profileId, userId) {
  const publications = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const load = async () => {
    if (!profileId.value) return;
    loading.value = true;
    try {
      publications.value = await publicationService.getByProfile(
        profileId.value,
        userId
      );
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  /**
   * watch necesario para cuando cambia el profile
   */
  watch(profileId, load, { immediate: true });

  return {
    publications,
    loading,
    error,
    reload: load,
  };
}
