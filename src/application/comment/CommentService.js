import { CommentRepository } from "../../infrastructure/repositories/CommentRepository.js";
import { getAllComments } from "./usecases/getAllComments.js";
import { createComment } from "./usecases/createComment.js";

export class CommentService {
  constructor() {
    this.commentRepo = new CommentRepository();
  }

  async getAllComments(publicationId) {
    return await getAllComments(
      { publicationId },
      { commentRepo: this.commentRepo }
    );
  }

  async createComment(publicationId, userId, content) {
    return await createComment(
      { publicationId, userId, content },
      { commentRepo: this.commentRepo }
    );
  }

  subscribeToComments(publicationId, callback) {
    return this.commentRepo.subscribeToComments(publicationId, callback);
  }
}
