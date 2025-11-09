export class ProfileRepositoryInterface {
  constructor() {
    if (new.target === ProfileRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async createProfile() {
    throw new Error("Method not implemented");
  }
  async getProfileById() {
    throw new Error("Method not implemented");
  }
  async updateProfile() {
    throw new Error("Method not implemented");
  }
  async getPublicProfileByUsername() {
    throw new Error("Method not implemented");
  }
}
