export const getAllMessagesUseCase = async ({ chatId }, { messageRepo }) => {
  const { data, error } = await messageRepo.getAll({ chatId });

  if (error) throw new Error(error);
  return data;
};
