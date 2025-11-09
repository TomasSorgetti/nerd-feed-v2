import { supabase } from "../supabase/client.js";
import { User } from "../../domain/entities/User.js";
import { AuthRepositoryInterface } from "../../domain/interfaces/AuthRepositoryInterface.js";

export class AuthRepository extends AuthRepositoryInterface {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return new User({ id: data.user.id, email: data.user.email });
  }

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return new User({ id: data.user.id, email: data.user.email });
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return new User({ id: data.user.id, email: data.user.email });
  }
}
