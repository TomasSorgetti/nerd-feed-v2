import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

export class ChatRepository extends ChatRepositoryInterface {
  async getAllByUserId(userId) {
    const { data, error } = await supabase
      .from("private_chats")
      .select("*")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    console.log("get all chats", { data, error });

    if (error) throw error;

    return data;
  }

  //todo refactor create -> deberia hacer esto el usecase?
  async createChat({ from, to }) {
    const { data: existing, error: existingError } = await supabase
      .from("private_chats")
      .select("*")
      .or(
        `and(user1_id.eq.${from},user2_id.eq.${to}),and(user1_id.eq.${to},user2_id.eq.${from})`
      )
      .maybeSingle();

    console.log("Chat find: ", { existing, existingError });

    if (existing) {
      return { data: existing, error: null };
    }

    if (existingError) {
      return { data: null, error: existingError };
    }

    const { data: createData, error: createError } = await supabase
      .from("private_chats")
      .insert({
        user1_id: from,
        user2_id: to,
        last_message_id: null,
      })
      .select()
      .single();

    console.log("create chat: ", { createData, createError });

    return { data: createData, error: createError };
  }
}
