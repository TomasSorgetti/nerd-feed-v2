import { supabase } from "../supabase/client.js";

export class MessageRepository {
  async getAll({ chatId }) {
    return await supabase
      .from("private_chat_messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });
  }

  async create(message) {
    return await supabase
      .from("private_chat_messages")
      .insert(message)
      .select()
      .single();
  }
}
