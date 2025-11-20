import { ref, watch, onMounted } from "vue";
import { PublicationService } from "../../application/publication/PublicationService.js";

const service = new PublicationService();

export function usePublications(options) {
  const publications = ref([]);
  const publication = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const load = async () => {
    loading.value = true;
    error.value = null;

    try {
      switch (options.type) {
        case "feed":
          publications.value = await service.getAll(options.userId);
          break;

        case "profile":
          if (!options.profileId.value) return;
          publications.value = await service.getByProfile(
            options.profileId.value,
            options.userId
          );
          break;

        case "detail":
          if (!options.publicationId.value) return;
          publication.value = await service.getById(
            options.publicationId.value,
            options.userId
          );
          break;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createPublication = async (data) => {
    if (options.type !== "feed") return;

    loading.value = true;
    try {
      const newPub = await service.create(data);
      publications.value.unshift(newPub);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  if (options.type === "feed") {
    onMounted(load);
  }

  if (options.type === "profile") {
    watch(options.profileId, load, { immediate: true });
  }

  if (options.type === "detail") {
    watch(options.publicationId, load, { immediate: true });
  }

  return {
    publications,
    publication,
    loading,
    error,
    reload: load,
    createPublication,
  };
}
