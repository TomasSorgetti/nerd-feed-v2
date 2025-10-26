export async function signUpUser(
  { username, email, password },
  { authRepo, profileRepo, userStore }
) {
  // todo => add user entity before repository call
  const user = await authRepo.signUp(email, password);

  await profileRepo.createProfile({ id: user.id, username, email });

  const profile = await profileRepo.getProfileById(user.id);

  user.profile = profile;

  userStore.set(user);

  return user;
}
