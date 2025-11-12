import { FavoriteRepositoryInterface } from "../../domain/interfaces/FavoriteRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

export class FavoriteRepository extends FavoriteRepositoryInterface {
  async addToFavorite(userId, postId) {
    return await supabase
      .from("favorites")
      .insert([{ user_id: userId, post_id: postId }]);
  }

  async removeFavorite(userId, postId) {
    return await supabase
      .from("favorites")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);
  }
}
