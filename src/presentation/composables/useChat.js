// useChats.js
import { ref, onMounted } from "vue";
import { ChatService } from "../../application/chat/ChatService";

const chatService = new ChatService();

export function useChats(userId) {
  const chats = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const loadChats = async () => {
    if (!userId) {
      error.value = "No userId provided";
      loading.value = false;
      return;
    }

    try {
      const data = await chatService.getChats(userId);
      chats.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createChat = async ({ from, to }, { local = false } = {}) => {
    if (local) {
      const localChat = await chatService.createLocalChat(from, to);
      chats.value.unshift(localChat);
      return localChat;
    }

    // const newChat = await chatService.createChat(from, to);
    // chats.value = chats.value.map((c) =>
    //   c.isTemp && c.users.includes(from) && c.users.includes(to) ? newChat : c
    // );
    // if (!chats.value.find((c) => c.id === newChat.id)) {
    //   chats.value.unshift(newChat);
    // }
    // return newChat;
  };

  onMounted(() => {
    loadChats();
  });

  return { chats, loading, error, reload: loadChats, createChat };
}
