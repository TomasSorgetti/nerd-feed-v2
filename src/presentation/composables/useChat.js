import { ref, watch, onMounted, onUnmounted } from "vue";
import { ChatService } from "../../application/chat/ChatService";

const chatService = new ChatService();

export function useChats(userIdRef) {
  const chats = ref(chatService.currentChats);
  const loading = ref(true);
  const error = ref(null);

  let unsubscribe = null;

  const loadChats = async (userId) => {
    if (!userId) return;
    loading.value = true;
    try {
      await chatService.getChats(userId);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createChat = async ({ from, to }, { local = false } = {}) => {
    try {
      return local
        ? await chatService.createLocalChat(from, to)
        : await chatService.createChat(from, to);
    } catch (err) {
      error.value = err.message;
      return null;
    }
  };

  onMounted(() => {
    unsubscribe = chatService.subscribe((newChats) => {
      chats.value = newChats;
    });

    if (userIdRef.value) {
      loadChats(userIdRef.value);
    }
  });

  watch(userIdRef, (newId) => {
    if (newId) loadChats(newId);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { chats, loading, error, reload: loadChats, createChat };
}
