export class PublicationRepositoryInterface {
  constructor() {
    if (new.target === PublicationRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async getAll() {
    throw new Error("Method[getAll] not implemented");
  }
  async getByProfile() {
    throw new Error("Method[getByProfile] not implemented");
  }
  async create() {
    throw new Error("Method[create] not implemented");
  }
}
