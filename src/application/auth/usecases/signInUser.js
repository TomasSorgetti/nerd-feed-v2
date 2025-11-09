import { Profile } from "../../../domain/entities/Profile";

export async function signInUser(
  { email, password },
  { authRepo, profileRepo, userStore }
) {
  const user = await authRepo.signIn(email, password);

  const profile = await profileRepo.getProfileById(user.id);
  user.profile = new Profile(profile);
  
  userStore.set(user);
  return user;
}
