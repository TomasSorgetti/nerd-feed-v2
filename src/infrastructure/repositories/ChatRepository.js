import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

export class ChatRepository extends ChatRepositoryInterface {
  async getAllByUserId(userId) {
    const { data, error } = await supabase
      .from("private_chats")
      .select("*")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  //todo refactor create -> deberia hacer esto el usecase?
  async create({ from, to }) {
    const { data: existing, error: existingError } = await supabase
      .from("private_chats")
      .select("*")
      .or(
        `and(user1_id.eq.${from},user2_id.eq.${to}),and(user1_id.eq.${to},user2_id.eq.${from})`
      );

    if (existingError) throw existingError;

    if (existing?.length > 0) return existing[0];

    const { data, error } = await supabase
      .from("private_chats")
      .insert({
        user1_id: from,
        user2_id: to,
      })
      .select("*")
      .single();

    if (error) throw error;

    return data;
  }
}
