import { ref, onUnmounted, watch } from "vue";
import { CommentService } from "../../application/comment/CommentService.js";

const commentService = new CommentService();

export function useComments(publicationId) {
  const comments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  let unsubscribe = () => {};

  async function loadComments() {
    if (!publicationId.value) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      comments.value = await commentService.getAllComments(publicationId.value);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createComment({ userId, content }) {
    try {
      await commentService.createComment(publicationId.value, userId, content);

      // comments.value.push(newComment);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  function subscribe() {
    if (!publicationId.value) return;

    if (unsubscribe) unsubscribe();

    unsubscribe = commentService.subscribeToComments(
      publicationId.value,
      (payload) => {
        if (payload.eventType === "INSERT") {
          comments.value.push(payload.new);
        }
      }
    );
  }

  watch(publicationId, () => {
    loadComments();
    subscribe();
  });

  onUnmounted(() => unsubscribe && unsubscribe());

  return {
    comments,
    loading,
    error,
    loadComments,
    createComment,
    subscribe,
  };
}
