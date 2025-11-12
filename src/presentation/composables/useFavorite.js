import { ref } from "vue";
import { FavoriteService } from "../../application/favorite/FavoriteService";

const favoriteService = new FavoriteService();

export function useFavorite() {
  const loading = ref(true);
  const error = ref(null);

  const toggleFavorite = async (userId, postId, isFavorite) => {
    console.log("Toggle favorite...");

    if (!userId || !postId) return;

    loading.value = true;
    try {
      if (isFavorite) {
        await favoriteService.RemoveFromFavorite({
          user_id: userId,
          post_id: postId,
        });
      } else {
        await favoriteService.AddToFavorite({
          user_id: userId,
          post_id: postId,
        });
      }
    } catch (err) {
      console.log("Togle Error", err);

      error.value = err.message;
    } finally {
      console.log("Togle func end.");
      loading.value = false;
    }
  };

  return { toggleFavorite, loading, error };
}
