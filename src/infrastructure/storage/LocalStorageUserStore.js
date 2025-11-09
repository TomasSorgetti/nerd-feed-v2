import { UserStoreInterface } from "../../domain/interfaces/UserStoreInterface.js";

export class LocalStorageUserStore extends UserStoreInterface {
  constructor() {
    super();
    this.user = null;
    this.observers = [];
    const saved = localStorage.getItem("user");
    if (saved) this.user = JSON.parse(saved);
  }

  set(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    this.notify();
  }

  clear() {
    this.user = null;
    localStorage.removeItem("user");
    this.notify();
  }

  subscribe(fn) {
    this.observers.push(fn);
    fn(this.user);
    return () => {
      this.observers = this.observers.filter((o) => o !== fn);
    };
  }

  notify() {
    this.observers.forEach((fn) => fn(this.user));
  }
}
