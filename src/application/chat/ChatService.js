import { ChatRepository } from "../../infrastructure/repositories/ChatRepository";
import { ProfileRepository } from "../../infrastructure/repositories/ProfileRepository";
import { getChatsUseCase } from "./usecases/getChats";
import { createChatUseCase } from "./usecases/createChat";
import { createLocalChatUseCase } from "./usecases/createLocalChat";

export class ChatService {
  #subscribers = new Set();
  #chats = [];

  constructor() {
    this.chatRepo = new ChatRepository();
    this.profileRepo = new ProfileRepository();
  }

  #notify() {
    for (const fn of this.#subscribers) fn(this.#chats);
  }

  get currentChats() {
    return this.#chats;
  }

  subscribe(fn) {
    this.#subscribers.add(fn);
    fn(this.#chats);

    return () => {
      this.#subscribers.delete(fn);
    };
  }

  async getChats(userId) {
    const data = await getChatsUseCase(userId, { chatRepo: this.chatRepo });
    this.#chats = data;
    this.#notify();
    return this.#chats;
  }

  async createChat(from, to) {
    const newChat = await createChatUseCase(
      { from, to },
      { chatRepo: this.chatRepo, profileRepo: this.profileRepo }
    );
    this.#chats.unshift(newChat);
    this.#notify();
    return newChat;
  }

  async createLocalChat(from, to) {
    const localChat = await createLocalChatUseCase(
      { from, to },
      {
        profileRepo: this.profileRepo,
      }
    );
    this.#chats.unshift(localChat);
    this.#notify();
    return localChat;
  }
}
