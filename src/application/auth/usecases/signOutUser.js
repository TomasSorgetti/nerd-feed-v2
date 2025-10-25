export async function signOutUser(_, { authRepo, userStore }) {
  await authRepo.signOut();
  userStore.clear();
}
