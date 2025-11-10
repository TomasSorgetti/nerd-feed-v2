import { ChatRepository } from "../../infrastructure/repositories/ChatRepository";
import { ProfileRepository } from "../../infrastructure/repositories/ProfileRepository";
import { getChatsUseCase } from "./usecases/getChats";
import { createChatUseCase } from "./usecases/createChat";

export class ChatService {
  constructor() {
    this.chatRepo = new ChatRepository();
    this.profileRepo = new ProfileRepository();
  }

  async getChats(userId) {
    return await getChatsUseCase(userId, {
      chatRepo: this.chatRepo,
    });
  }

  async createChat(from, to) {
    return await createChatUseCase(
      { from, to },
      { chatRepo: this.chatRepo, profileRepo: this.profileRepo }
    );
  }
}
