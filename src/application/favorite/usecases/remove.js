export async function RemoveFromFavoriteUseCase(
  { user_id, post_id },
  { favoriteRepo }
) {
  const { error } = await favoriteRepo.removeFavorite(user_id, post_id);

  if (error) throw error;

  return true;
}
