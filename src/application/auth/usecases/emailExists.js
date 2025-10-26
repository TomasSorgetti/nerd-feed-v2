export async function emailExists(email, { profileRepo }) {
  return await profileRepo.checkEmailExists(email);
}
