import { SupabaseAuthRepository } from "../../infrastructure/auth/SupabaseAuthRepository.js";
import { SupabaseProfileRepository } from "../../infrastructure/auth/SupabaseProfileRepository.js";
import { LocalStorageUserStore } from "../../infrastructure/storage/LocalStorageUserStore.js";
import { signInUser } from "./usecases/signInUser.js";
import { signUpUser } from "./usecases/signUpUser.js";
import { signOutUser } from "./usecases/signOutUser.js";
import { emailExists } from "./usecases/emailExists.js";

/**
 *  Auth service funciona como una especie de intermediario que inyecta las dependencias de los usecases
 *  y deja los metodos servidos para la interfaz
 */
export class AuthService {
  constructor() {
    this.authRepo = new SupabaseAuthRepository();
    this.profileRepo = new SupabaseProfileRepository();
    this.userStore = new LocalStorageUserStore();
  }

  get currentUser() {
    return this.userStore.user;
  }

  subscribe(fn) {
    return this.userStore.subscribe(fn);
  }

  async signIn(email, password) {
    return await signInUser(
      { email, password },
      {
        authRepo: this.authRepo,
        profileRepo: this.profileRepo,
        userStore: this.userStore,
      }
    );
  }

  async signUp(username, email, password) {
    return await signUpUser(
      { username, email, password },
      {
        authRepo: this.authRepo,
        profileRepo: this.profileRepo,
        userStore: this.userStore,
      }
    );
  }

  async emailExists(email) {
    return await emailExists(email, {
      profileRepo: this.profileRepo,
    });
  }

  async signOut() {
    return await signOutUser(null, {
      authRepo: this.authRepo,
      userStore: this.userStore,
    });
  }
}
