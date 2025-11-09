import { v4 as uuidv4 } from "uuid";

export class Publication {
  #id;
  #content;
  #image;
  #created_at;
  #user_id;
  #profile;

  constructor({
    id = uuidv4(),
    content,
    image = null,
    created_at = new Date().toISOString(),
    user_id,
    profile = null,
  }) {
    if (!content) throw new Error("content is required");
    if (!user_id) throw new Error("user_id is required");

    this.#id = id;
    this.#content = content;
    this.#image = image;
    this.#created_at = created_at;
    this.#user_id = user_id;
    this.#profile = profile;
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  get image() {
    return this.#image;
  }

  get created_at() {
    return this.#created_at;
  }

  get user_id() {
    return this.#user_id;
  }

  get profile() {
    return this.#profile;
  }

  toObject() {
    return {
      id: this.#id,
      content: this.#content,
      image: this.#image,
      created_at: this.#created_at,
      user_id: this.#user_id,
      // profile: this.#profile, // para crearlo en la base de datos hay que sacarlo, no se si para el get lo necesito
    };
  }
}
