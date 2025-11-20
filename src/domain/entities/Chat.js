import { v4 as uuidv4 } from "uuid";

export class Chat {
  #id;
  #user1_id;
  #user2_id;
  #last_message_id;
  #last_message;
  #profile;
  #messages;
  #is_local;
  #created_at;

  constructor({
    id = uuidv4(),
    user1_id,
    user2_id,
    last_message_id,
    last_message = null,
    profile = null,
    messages = [],
    is_local = false,
    created_at = new Date().toISOString(),
  }) {
    if (!user1_id) throw new Error("User1 ID is required");
    if (!user2_id) throw new Error("User2 ID is required");

    this.#id = id;
    this.#user1_id = user1_id;
    this.#user2_id = user2_id;
    this.#last_message_id = last_message_id;
    this.#last_message = last_message;
    this.#profile = profile;
    this.#messages = messages;
    this.#is_local = is_local;
    this.#created_at = created_at;
  }

  get id() {
    return this.#id;
  }

  get user1_id() {
    return this.#user1_id;
  }

  get user2_id() {
    return this.#user2_id;
  }

  get last_message_id() {
    return this.#last_message_id;
  }

  get last_message() {
    return this.#last_message;
  }

  get created_at() {
    return this.#created_at;
  }

  get profile() {
    return this.#profile;
  }

  get messages() {
    return this.#messages;
  }

  toObject() {
    return {
      id: this.#id,
      user1_id: this.#user1_id,
      user2_id: this.#user2_id,
      last_message_id: this.#last_message_id,
      last_message: this.#last_message,
      created_at: this.#created_at,
      profile: this.#profile,
      messages: this.#messages,
      is_local: this.#is_local,
    };
  }
}
