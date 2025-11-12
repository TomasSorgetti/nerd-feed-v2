import { PublicationRepositoryInterface } from "../../domain/interfaces/PublicationRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

export class PublicationRepository extends PublicationRepositoryInterface {
  async getAll() {
    return await supabase
      .from("posts")
      .select(
        "*, profile:profile(id, username, tag, avatar), comments ( id ),favorites ( id, user_id )"
      )
      .order("created_at", { ascending: false });
  }

  async getByProfile(profileId) {
    return await supabase
      .from("posts")
      .select(
        "*, profile:profile(id, username, tag, avatar), comments ( id ),favorites ( user_id )"
      )
      .eq("user_id", profileId)
      .order("created_at", { ascending: false });
  }

  async create(publication) {
    // todo -> en vez de select * se puede pedir el id, content, image, etc y evitar devolver un array
    return await supabase.from("posts").insert(publication).select("*");
  }
}
