export async function createComment(
  { publicationId, userId, content },
  { commentRepo }
) {
  const { data, error } = await commentRepo.create({
    publicationId,
    userId,
    content,
  });

  if (error) throw new Error(error);

  return data;
}
