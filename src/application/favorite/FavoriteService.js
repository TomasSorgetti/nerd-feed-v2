import { FavoriteRepository } from "../../infrastructure/repositories/FavoriteRepository.js";
import { AddToFavoriteUseCase } from "./usecases/add.js";
import { RemoveFromFavoriteUseCase } from "./usecases/remove.js";

export class FavoriteService {
  constructor() {
    this.favoriteRepo = new FavoriteRepository();
  }

  async AddToFavorite({ user_id, post_id }) {
    return await AddToFavoriteUseCase(
      {
        user_id,
        post_id,
      },
      {
        favoriteRepo: this.favoriteRepo,
      }
    );
  }

  async RemoveFromFavorite({ user_id, post_id }) {
    return await RemoveFromFavoriteUseCase(
      {
        user_id,
        post_id,
      },
      {
        favoriteRepo: this.favoriteRepo,
      }
    );
  }
}
