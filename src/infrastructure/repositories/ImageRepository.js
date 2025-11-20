import { ImageRepositoryInterface } from "../../domain/interfaces/ImageRepositoryInterface.js";
import { supabase } from "../supabase/client.js";

// deberia ir en storage?
// todo -> rename bucket to images
export class ImageRepository extends ImageRepositoryInterface {
  async upload(file, folder = "publications") {
    const fileName = Date.now() + "-" + file.name;
    const filePath = `${folder}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (storageError) throw error;

    const { data, error } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    if (error) throw error;

    return data.publicUrl;
  }
}
