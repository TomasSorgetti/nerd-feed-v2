import { Chat } from "../../../domain/entities/Chat";

export async function createLocalChatUseCase({ from, to }, { profileRepo }) {
  const profile = await profileRepo.getProfileById(to);

  if (!profile) throw new Error("User not found");

  return new Chat({
    user1_id: from,
    user2_id: to,
    profile,
  }).toObject();
}
