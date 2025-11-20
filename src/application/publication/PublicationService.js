import { PublicationRepository } from "../../infrastructure/repositories/PublicationRepository.js";
import { ImageRepository } from "../../infrastructure/repositories/ImageRepository.js";
import { createPublication } from "./usecases/createPublication.js";
import { getAllPublications } from "./usecases/getAllPublications.js";
import { getPublicationsById } from "./usecases/getPublicationsById.js";
import { getPublicationsByProfile } from "./usecases/getPublicationsByProfile.js";

/**
 * Todo -> convert to observer
 */
export class PublicationService {
  constructor() {
    this.publicationRepo = new PublicationRepository();
    this.imageRepo = new ImageRepository();
  }

  async getAll(userId) {
    return await getAllPublications(userId, {
      publicationRepo: this.publicationRepo,
    });
  }

  async getByProfile(profileId, userId) {
    return await getPublicationsByProfile(
      { profileId, userId },
      {
        publicationRepo: this.publicationRepo,
      }
    );
  }

  async getById(publicationId, userId = null) {
    return await getPublicationsById(
      { publicationId, userId },
      {
        publicationRepo: this.publicationRepo,
      }
    );
  }

  async create({ content, image, user_id }) {
    return await createPublication(
      { content, image, user_id },
      {
        publicationRepo: this.publicationRepo,
        imageRepo: this.imageRepo,
      }
    );
  }
}
