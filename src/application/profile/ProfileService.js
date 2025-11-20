import { ProfileRepository } from "../../infrastructure/repositories/ProfileRepository.js";
import { getPublicProfileByUsername } from "./usecases/getPublicProfileByUsername.js";

export class ProfileService {
  #profiles = new Map();
  #subscribers = new Map();

  constructor() {
    this.profileRepo = new ProfileRepository();
  }

  subscribe(username, fn) {
    if (!this.#subscribers.has(username)) {
      this.#subscribers.set(username, new Set());
    }

    const subs = this.#subscribers.get(username);
    subs.add(fn);

    if (this.#profiles.has(username)) {
      fn(this.#profiles.get(username));
    }

    return () => subs.delete(fn);
  }

  #notify(username) {
    const subs = this.#subscribers.get(username);
    if (!subs) return;
    const profile = this.#profiles.get(username);
    for (const fn of subs) fn(profile);
  }

  async getPublicProfile(username) {
    const profile = await getPublicProfileByUsername(username, {
      profileRepo: this.profileRepo,
    });
    this.#profiles.set(username, profile);
    this.#notify(username);
    return profile;
  }

  getCached(username) {
    return this.#profiles.get(username) || null;
  }
}
