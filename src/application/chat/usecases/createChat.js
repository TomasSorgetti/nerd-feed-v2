export async function createChatUseCase(
  { from, to },
  { chatRepo, profileRepo }
) {
  let toId = to;

  const isUUID = /^[0-9a-fA-F-]{36}$/.test(to);

  if (!isUUID) {
    const profile = await profileRepo.getByUsername(to);
    if (!profile) throw new Error("Usuario destino no encontrado");
    toId = profile.id;
  }

  return await chatRepo.create({ from, to: toId });
}
