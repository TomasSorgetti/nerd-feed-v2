export async function getPublicationsByProfile(profileId, { publicationRepo }) {
  if (!profileId) throw new Error("Profile ID is required");
  return await publicationRepo.getByProfile(profileId);
}
