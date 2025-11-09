import { Profile } from "../../../domain/entities/Profile";

export async function signUpUser(
  { username, email, password },
  { authRepo, profileRepo, userStore }
) {
  const user = await authRepo.signUp(email, password);

  const newProfileEntity = new Profile({ id: user.id, username, email });
  await profileRepo.createProfile(newProfileEntity);

  const profile = await profileRepo.getProfileById(user.id);

  user.profile = profile;

  userStore.set(user);

  return user;
}
