import { ref, watch, onMounted, onUnmounted } from "vue";
import { MessagesService } from "../../application/message/MessageService";

const messagesService = new MessagesService();

export function useMessages(chatIdRef, userIdRef) {
  const messages = ref([]);
  const loading = ref(false);
  const error = ref(null);

  let unsubscribe = null;

  const subscribeToChat = (chatId) => {
    if (unsubscribe) unsubscribe();
    if (!chatId) return;

    unsubscribe = messagesService.subscribe(chatId, (m) => {
      messages.value = m || [];
    });

    loading.value = true;

    messagesService
      .getAllMessages(chatId)
      .catch((e) => (error.value = e.message))
      .finally(() => (loading.value = false));
  };

  watch(chatIdRef, (id) => subscribeToChat(id));

  onMounted(() => {
    if (chatIdRef.value) subscribeToChat(chatIdRef.value);
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  const sendMessage = async (content) => {
    if (!chatIdRef.value) {
      console.warn("No chatId available to send message");
      return;
    }

    return messagesService.createMessage({
      chatId: chatIdRef.value,
      senderId: userIdRef.value,
      content,
    });
  };

  return { messages, loading, error, sendMessage };
}
