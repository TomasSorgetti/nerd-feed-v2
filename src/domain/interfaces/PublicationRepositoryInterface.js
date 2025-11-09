export class PublicationRepositoryInterface {
  constructor() {
    if (new.target === PublicationRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async getAll() {
    throw new Error("Method not implemented");
  }
  async getByProfile() {
    throw new Error("Method not implemented");
  }
  async create() {
    throw new Error("Method not implemented");
  }
}
