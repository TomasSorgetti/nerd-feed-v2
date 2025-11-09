import { supabase } from "../supabase/client.js";

export class PublicationRepository {
  async getAll() {
    return await supabase
      .from("publications")
      .select("*, profile:profile(id, username, avatar)")
      .order("created_at", { ascending: false });
  }

  async getByProfile(profileId) {
    return await supabase
      .from("posts")
      .select("*, profile:profile(id, username, avatar)")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });
  }
}
