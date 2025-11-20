import { supabase } from "../../infrastructure/supabase/client";
import { MessageFactory } from "../../domain/factories/MessageFactory";
import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";
import { createMessageUseCase } from "./usecases/createMessage";
import { getAllMessagesUseCase } from "./usecases/getAllMessages";

export class MessagesService {
  #messages = new Map();
  #subscribers = new Map();
  #channels = new Map();

  constructor() {
    this.messageRepo = new MessageRepository();
  }

  #subscribeRealtime(chatId) {
    if (!chatId) return;

    if (this.#channels.has(chatId)) return;

    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "private_chat_messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          this.#handleIncomingMessage(payload.new);
        }
      )
      .subscribe();

    this.#channels.set(chatId, channel);
  }

  #handleIncomingMessage(newMessage) {
    const chatId = newMessage.chat_id;
    const old = this.#messages.get(chatId) || [];
    const exists = old.some((m) => m.id === newMessage.id);

    if (!exists) {
      const updated = [...old, newMessage];
      this.#messages.set(chatId, updated);
      this.#notify(chatId);
    }
  }

  subscribe(chatId, fn) {
    if (!this.#subscribers.has(chatId)) {
      this.#subscribers.set(chatId, new Set());
    }

    this.#subscribers.get(chatId).add(fn);

    if (this.#messages.has(chatId)) {
      fn(this.#messages.get(chatId));
    }

    this.#subscribeRealtime(chatId);

    return () => {
      this.#subscribers.get(chatId)?.delete(fn);
    };
  }

  #notify(chatId) {
    const subs = this.#subscribers.get(chatId);
    if (!subs) return;

    const messages = this.#messages.get(chatId) || [];
    for (const fn of subs) fn(messages);
  }

  async getAllMessages(chatId) {
    const data = await getAllMessagesUseCase(
      { chatId },
      { messageRepo: this.messageRepo }
    );

    this.#messages.set(chatId, data);
    this.#notify(chatId);
  }

  async createMessage({ chatId, senderId, content }) {
    const data = await createMessageUseCase(
      { chatId, senderId, content },
      { messageRepo: this.messageRepo, messageFactory: MessageFactory }
    );

    const old = this.#messages.get(chatId) || [];
    const updated = [...old, data];

    this.#messages.set(chatId, updated);
    this.#notify(chatId);

    return data;
  }
}
