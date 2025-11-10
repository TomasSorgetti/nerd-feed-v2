import { v4 as uuidv4 } from "uuid";

export class Favorite {
  #id;
  #post_id;
  #user_id;
  #created_at;

  constructor({
    id = uuidv4(),
    post_id,
    user_id,
    created_at = new Date().toISOString(),
  }) {
    if (!post_id) throw new Error("Post ID is required");
    if (!user_id) throw new Error("User ID is required");

    this.#id = id;
    this.#post_id = post_id;
    this.#user_id = user_id;
    this.#created_at = created_at;
  }

  get id() {
    return this.#id;
  }

  get post_id() {
    return this.#post_id;
  }

  get user_id() {
    return this.#user_id;
  }

  get created_at() {
    return this.#created_at;
  }

  toObject() {
    return {
      id: this.#id,
      post_id: this.#post_id,
      user_id: this.#user_id,
      created_at: this.#created_at,
    };
  }
}
