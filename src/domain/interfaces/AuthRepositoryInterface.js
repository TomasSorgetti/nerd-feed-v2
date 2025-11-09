export class AuthRepositoryInterface {
  constructor() {
    if (new.target === AuthRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }
  async signIn() {
    throw new Error("Method not implemented");
  }
  async signUp() {
    throw new Error("Method not implemented");
  }
  async signOut() {
    throw new Error("Method not implemented");
  }
  async getUser() {
    throw new Error("Method not implemented");
  }
}
