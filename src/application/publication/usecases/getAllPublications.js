export async function getAllPublications({ publicationRepo }) {
  const { data, error } = await publicationRepo.getAll();

  if (error) throw new Error(error);

  return data;
}
