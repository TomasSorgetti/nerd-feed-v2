import { supabase } from "../supabase/client.js";
import { CommentRepositoryInterface } from "../../domain/interfaces/CommentRepositoryInterface.js";

export class CommentRepository extends CommentRepositoryInterface {
  async getByPublication(publicationId) {
    const { data, error } = await supabase
      .from("comments")
      .select("*, profile:profile(id, username, tag, avatar)")
      .eq("post_id", publicationId)
      .order("created_at", { ascending: true });

    if (error) return { data: null, error: error.message };
    return { data, error: null };
  }

  async create({ publicationId, userId, content }) {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: publicationId,
        user_id: userId,
        content,
      })
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
  }

  subscribeToComments(publicationId, callback) {
    return supabase
      .channel(`comments:publication:${publicationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${publicationId}`,
        },
        (payload) => callback(payload)
      )
      .subscribe();
  }
}
