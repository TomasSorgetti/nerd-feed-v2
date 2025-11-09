export async function getPublicationsByProfile(profileId, { publicationRepo }) {
  const { data, error } = await publicationRepo.getByProfile(profileId);

  if (error) throw new Error(error);

  return data;
}
