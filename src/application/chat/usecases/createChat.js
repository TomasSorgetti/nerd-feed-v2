export async function createChatUseCase(
  { from, to },
  { chatRepo, profileRepo }
) {
  let toId = to;

  const isUUID = /^[0-9a-fA-F-]{36}$/.test(to);

  if (!isUUID) {
    const profile = await profileRepo.getByUsername(to);
    if (!profile) throw new Error("User not found");
    toId = profile.id;
  }

  if (toId === from) {
    throw new Error("You cannot create a chat with yourself");
  }

  const { data, error } = await chatRepo.createChat({ from, to: toId });

  if (error) throw new Error(error);
  return data;
}
