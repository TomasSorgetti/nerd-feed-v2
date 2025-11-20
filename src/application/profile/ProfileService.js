import { ProfileRepository } from "../../infrastructure/repositories/ProfileRepository.js";
import { getPublicProfileByUsername } from "./usecases/getPublicProfileByUsername.js";
import { ImageRepository } from "../../infrastructure/repositories/ImageRepository.js";

export class ProfileService {
  #profiles = new Map();
  #subscribers = new Map();

  constructor() {
    this.profileRepo = new ProfileRepository();
    this.imageRepo = new ImageRepository();
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

  /**
   * Todo -> usecase
   */
  async updateProfile(profileId, updatedData) {
    const currentProfile = Array.from(this.#profiles.values()).find(
      (p) => p.id === profileId
    );
    const oldUsername = currentProfile?.username;

    const { data, error } = await this.profileRepo.updateProfile(
      profileId,
      updatedData
    );

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return null;

    this.#profiles.set(data.username, data);

    if (oldUsername && oldUsername !== data.username) {
      this.#notify(oldUsername);
    }
    this.#notify(data.username);

    return data;
  }

  /**
   * Todo -> usecase
   */
  async updateAvatar(profileId, file) {
    const currentProfile = Array.from(this.#profiles.values()).find(
      (p) => p.id === profileId
    );

    if (!currentProfile) {
      throw new Error("Profile not found");
    }

    const oldAvatarUrl = currentProfile.avatar;

    const newAvatarUrl = await this.imageRepo.upload(file, "avatars");

    const updatedProfile = await this.updateProfile(profileId, {
      avatar: newAvatarUrl,
    });

    if (oldAvatarUrl && !oldAvatarUrl.includes("default-avatar.png")) {
      const oldPath = this.imageRepo.getPathFromUrl(oldAvatarUrl);
      await this.imageRepo.delete(oldPath);
    }

    return updatedProfile;
  }
}
