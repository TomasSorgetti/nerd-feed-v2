export class NotificationRepositoryInterface {
  constructor() {
    if (new.target === NotificationRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  async create() {
    throw new Error("Method[create] not implemented");
  }
}
