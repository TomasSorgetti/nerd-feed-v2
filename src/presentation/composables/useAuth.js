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

  /**
   * Important
   * Bind lo que hace es que cuando un componente llame a uno de los metodos,
   * el 'this' dentro de ese método siga apuntando a la instancia de authService y no se pierda
   */
  return {
    user,
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
  };
}
