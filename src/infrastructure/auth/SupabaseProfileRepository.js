import { supabase } from "../supabase/client.js";
import { Profile } from "../../domain/entities/Profile.js";
import { ProfileRepository } from "../../domain/repositories/ProfileRepository.js";

export class SupabaseProfileRepository extends ProfileRepository {
  async createProfile({ id, username, email, tag, avatar }) {
    const { error } = await supabase
      .from("profile")
      .insert({ id, username, email, tag, avatar });
    if (error) throw new Error(error.message);
  }

  async getProfileById(userId) {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw new Error(error.message);
    return new Profile(data);
  }

  async checkEmailExists(email) {
    const { data, error } = await supabase
      .from("profile")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return !!data;
  }
}
