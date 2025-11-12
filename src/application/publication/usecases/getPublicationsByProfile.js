export async function getPublicationsByProfile(
  { profileId, userId },
  { publicationRepo }
) {
  const { data, error } = await publicationRepo.getByProfile(profileId);

  if (error) throw new Error(error);

  /**
   * todo -> fijarse de hacerlo por supabase, queda horrible asi
   */
  return data.map((post) => ({
    ...post,
    is_favorited: userId
      ? post.favorites?.some((fav) => fav.user_id === userId)
      : false,
    favorites_count: post.favorites?.length || 0,
  }));
}
