import { PublicationRepository } from "../../infrastructure/repositories/PublicationRepository.js";
import { createPublication } from "./usecases/createPublication.js";
import { getAllPublications } from "./usecases/getAllPublications.js";
import { getPublicationsByProfile } from "./usecases/getPublicationsByProfile.js";

export class PublicationService {
  constructor() {
    this.publicationRepo = new PublicationRepository();
  }

  async getAll() {
    return await getAllPublications({ publicationRepo: this.publicationRepo });
  }

  async getByProfile(profileId) {
    return await getPublicationsByProfile(profileId, {
      publicationRepo: this.publicationRepo,
    });
  }

  async create({ content, image, user_id }) {
    return await createPublication(
      { content, image, user_id },
      {
        publicationRepo: this.publicationRepo,
      }
    );
  }
}
