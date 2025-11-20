export async function getPublicationsById(
  { publicationId, userId },
  { publicationRepo }
) {
  const { data, error } = await publicationRepo.getById(publicationId);

  if (error) throw new Error(error);

  return data;
}
