import { Publication } from "../../../domain/entities/Publication";

export async function createPublication(
  { content, image, user_id },
  { publicationRepo, imageRepo }
) {
  let imageUrl = null;

  if (image) {
    imageUrl = await imageRepo.upload(image, "publications");
  }

  const newPublication = new Publication({
    content,
    image: imageUrl,
    user_id,
  });

  const { data, error } = await publicationRepo.create(
    newPublication.toObject()
  );

  if (error) throw new Error(error);

  // que feo devolver la data[0]
  // todo -> cambiar desde el repositorio para que devuelva un objeto
  return data[0];
}
