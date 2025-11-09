import { ref, watch } from "vue";
import { PublicationService } from "../../application/publication/PublicationService.js";

const publicationService = new PublicationService();

export function useProfilePublications(profileId) {
  const publications = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const load = async () => {
    if (!profileId.value) return;
    // todo --> if publications is empty, load them
    loading.value = true;
    try {
      publications.value = await publicationService.getByProfile(
        profileId.value
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

  return { publications, loading, error, reload: load };
}
