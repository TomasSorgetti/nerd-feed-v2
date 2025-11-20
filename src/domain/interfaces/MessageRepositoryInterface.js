export class MessageRepositoryInterface {
  constructor() {
    if (new.target === MessageRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async create() {
    throw new Error("Method[create] not implemented");
  }
}
