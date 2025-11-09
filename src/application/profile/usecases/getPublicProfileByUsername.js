import { Profile } from "../../../domain/entities/Profile";

export async function getPublicProfileByUsername(username, { profileRepo }) {
  if (!username) throw new Error("Username is required");

  const { data, error } = await profileRepo.getPublicProfileByUsername(
    username
  );

  if (error) throw new Error(error.message);

  return new Profile(data);
}
