// src/presentation/composables/useAuth.js
import { ref, onMounted, onUnmounted } from "vue";
import { AuthService } from "../../application/auth/AuthService.js";

const authService = new AuthService();

export function useAuth() {
  const user = ref(authService.currentUser);

  let unsubscribe = null;

  onMounted(() => {
    unsubscribe = authService.subscribe((u) => (user.value = u));
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return {
    user,
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
  };
}
