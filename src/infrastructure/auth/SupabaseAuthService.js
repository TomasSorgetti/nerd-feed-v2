import {supabase} from "../supabase/client.js";

export const SupabaseAuthService = {
  async signUp(email, password) {
    return await supabase.auth.signUp({ email, password });
  },

  async signIn(email, password) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    return await supabase.auth.getUser();
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
