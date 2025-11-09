import { ProfileRepository } from "../../infrastructure/repositories/ProfileRepository.js";
import { getPublicProfileByUsername } from "./usecases/getPublicProfileByUsername.js";

export class ProfileService {
  constructor() {
    this.profileRepo = new ProfileRepository();
  }

  async getPublicProfile(username) {
    return await getPublicProfileByUsername(username, {
      profileRepo: this.profileRepo,
    });
  }
}
