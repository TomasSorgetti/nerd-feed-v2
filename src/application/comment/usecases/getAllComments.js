export async function getAllComments({ publicationId }, { commentRepo }) {
  const { data, error } = await commentRepo.getByPublication(publicationId);

  if (error) throw new Error(error);

  return data;
}
