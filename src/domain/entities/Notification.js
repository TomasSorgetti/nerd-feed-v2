import { v4 as uuidv4 } from "uuid";
import { NotificationTypes } from "../enums/NotificationTypes";

export class Notification {
  #id;
  #user_id;
  #type;
  #title;
  #message;
  #metadata;
  #is_read;
  #read_at;
  #created_at;

  constructor({
    id = uuidv4(),
    user_id,
    type,
    title,
    message,
    metadata,
    is_read = false,
    read_at = null,
    created_at = new Date().toISOString(),
  }) {
    if (!user_id) throw new Error("User ID is required");
    if (!type) throw new Error("Type is required");
    if (!Object.values(NotificationTypes).includes(type)) {
      throw new Error("Type is invalid");
    }
    if (!title) throw new Error("Title is required");
    if (!message) throw new Error("Message is required");
    if (!metadata) throw new Error("Metadata is required");

    this.#id = id;
    this.#user_id = user_id;
    this.#type = type;
    this.#title = title;
    this.#message = message;
    this.#metadata = metadata;
    this.#is_read = is_read;
    this.#read_at = read_at;
    this.#created_at = created_at;
  }

  get id() {
    return this.#id;
  }

  get user_id() {
    return this.#user_id;
  }

  get type() {
    return this.#type;
  }

  get title() {
    return this.#title;
  }

  get message() {
    return this.#message;
  }

  get metadata() {
    return this.#metadata;
  }

  get is_read() {
    return this.#is_read;
  }

  get read_at() {
    return this.#read_at;
  }

  get created_at() {
    return this.#created_at;
  }

  toObject() {
    return {
      id: this.#id,
      user_id: this.#user_id,
      type: this.#type,
      title: this.#title,
      message: this.#message,
      metadata: this.#metadata,
      is_read: this.#is_read,
      read_at: this.#read_at,
      created_at: this.#created_at,
    };
  }
}
