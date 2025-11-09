export class UserStoreInterface {
  constructor() {
    if (new.target === UserStoreInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }

  set() {
    throw new Error("Method not implemented");
  }
  clear() {
    throw new Error("Method not implemented");
  }
  subscribe() {
    throw new Error("Method not implemented");
  }
}
