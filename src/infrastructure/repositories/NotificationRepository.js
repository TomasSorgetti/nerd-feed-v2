import { NotificationRepositoryInterface } from "../../domain/interfaces/NotificationRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

export class NotificationRepository extends NotificationRepositoryInterface {
  async create(notification) {
    return await supabase
      .from("notifications")
      .insert(notification)
      .select("*");
  }
}
