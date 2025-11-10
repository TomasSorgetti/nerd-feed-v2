export class ChatRepositoryInterface {
  constructor() {
    if (new.target === ChatRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async getAllByUserId() {
    throw new Error("Method[getAllByUserId] not implemented");
  }

  async create() {
    throw new Error("Method[create] not implemented");
  }
}
