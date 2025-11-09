export async function getAllPublications({ publicationRepo }) {
  return await publicationRepo.getAll();
}
