import { ref, onMounted } from "vue";
import { PublicationService } from "../../application/publication/PublicationService.js";

//? deberia hacer un solo composable (profile y feed) y me ahorro la repeticion e instancia de dos servicios
const publicationService = new PublicationService();

export function useFeedPublications() {
  const publications = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const load = async () => {
    loading.value = true;
    try {
      publications.value = await publicationService.getAll();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createPublication = async (data) => {
    if (!data) return;
    loading.value = true;
    try {
      const newPublication = await publicationService.create(data);
      console.log("publication[new]: ", newPublication);

      publications.value.unshift(newPublication);
    } catch (err) {
      console.log(err);

      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(load);

  return { publications, loading, error, reload: load, createPublication };
}
