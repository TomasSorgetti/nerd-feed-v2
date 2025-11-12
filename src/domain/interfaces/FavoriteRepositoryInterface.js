export class FavoriteRepositoryInterface {
  constructor() {
    if (new.target === FavoriteRepositoryInterface) {
      throw new Error("Cannot instantiate interface directly");
    }
  }
  async addToFavorite() {
    throw new Error("Method[addToFavorite] not implemented");
  }
  async removeFromFavorite() {
    throw new Error("Method[removeFromFavorite] not implemented");
  }
}
