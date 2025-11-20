export class CommentRepositoryInterface {
  constructor() {
    if (new.target === CommentRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async getByPublication() {
    throw new Error("Method[getByPublication] not implemented");
  }

  async create() {
    throw new Error("Method[create] not implemented");
  }

  subscribeToComments() {
    throw new Error("Method[subscribeToComments] not implemented");
  }
}
