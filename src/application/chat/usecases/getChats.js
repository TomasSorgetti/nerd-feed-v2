export async function getChatsUseCase(userId, { chatRepo }) {
  const chats = await chatRepo.getAllByUserId(userId);

  return chats.map((chat) => ({
    ...chat,
    users: [chat.user1_id, chat.user2_id],
  }));
}
