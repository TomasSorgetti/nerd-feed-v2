// useChats.js
import { ref, onMounted } from "vue";
import { ChatService } from "../../application/chat/ChatService";

const chatService = new ChatService();

export function useChats(userId) {
  const chats = ref([]); // ← ref
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
      console.log("get All chats: ", data);
      chats.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createChat = async ({ from, to }, { local = false } = {}) => {
    console.log("createChat called", { from, to, local });

    if (local) {
      const tempId = `temp_${Date.now()}_${from}`;
      const tempChat = {
        id: tempId,
        user1_id: from,
        user2_id: to,
        users: [from, to],
        created_at: new Date().toISOString(),
        isTemp: true,
      };
      chats.value.unshift(tempChat);
      return tempChat;
    }

    const newChat = await chatService.createChat(from, to);
    chats.value = chats.value.map((c) =>
      c.isTemp && c.users.includes(from) && c.users.includes(to) ? newChat : c
    );
    if (!chats.value.find((c) => c.id === newChat.id)) {
      chats.value.unshift(newChat);
    }
    return newChat;
  };

  onMounted(() => {
    loadChats();
  });

  return { chats, loading, error, reload: loadChats, createChat };
}
