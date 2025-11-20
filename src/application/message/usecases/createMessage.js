export const createMessageUseCase = async (
  { chatId, senderId, content },
  { messageRepo, messageFactory }
) => {
  console.log("Creating message...", { chatId, senderId, content });
  // const message = messageFactory.create({
  //   chat_id: chatId,
  //   sender_id: senderId,
  //   content,
  // });

  // const { data, error } = await messageRepo.create(message.toObject());

  const { data, error } = await messageRepo.create({
    chat_id: chatId,
    sender_id: senderId,
    content,
  });

  console.log("Message Repo create: ", { data, error });

  if (error) throw new Error(error);

  return data;
};
