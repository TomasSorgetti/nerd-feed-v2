import { v4 as uuidv4 } from "uuid";

export class Message {
  #id;
  #chat_id;
  #sender_id;
  #content;
  #read_at;
  #attachment_url;
  #last_message_id;
  #created_at;

  constructor({
    id = uuidv4(),
    chat_id,
    sender_id,
    content,
    read_at = null,
    attachment_url = null,
    last_message_id,
    created_at = new Date().toISOString(),
  }) {
    if (!chat_id) throw new Error("Chat ID is required");
    if (!sender_id) throw new Error("Sender ID is required");
    if (!content) throw new Error("Content is required");

    this.#id = id;
    this.#chat_id = chat_id;
    this.#sender_id = sender_id;
    this.#content = content;
    this.#read_at = read_at;
    this.#attachment_url = attachment_url;
    this.#last_message_id = last_message_id;
    this.#created_at = created_at;
  }

  get id() {
    return this.#id;
  }

  get chat_id() {
    return this.#chat_id;
  }

  get sender_id() {
    return this.#sender_id;
  }

  get content() {
    return this.#content;
  }

  get read_at() {
    return this.#read_at;
  }

  get attachment_url() {
    return this.#attachment_url;
  }

  get last_message_id() {
    return this.#last_message_id;
  }

  get created_at() {
    return this.#created_at;
  }

  toObject() {
    return {
      id: this.#id,
      chat_id: this.#chat_id,
      sender_id: this.#sender_id,
      last_message_id: this.#last_message_id,
      created_at: this.#created_at,
    };
  }
}
