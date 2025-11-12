export async function AddToFavoriteUseCase(
  { user_id, post_id },
  { favoriteRepo }
) {
  //todo create a notification entity
  //todo create a favorite entity

  const { error } = await favoriteRepo.addToFavorite(user_id, post_id);

  if (error) throw error;

  //todo notify to post owner
  return true;
}
