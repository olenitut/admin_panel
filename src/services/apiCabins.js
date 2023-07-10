import supabase, { supabaseUrl } from "./supabaseClient";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(`Cabins could not be loaded`);
    throw new Error(`Cabins could not be loaded`);
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(`Cabin could not be deleted`);
    throw new Error(`Cabin could not be deleted`);
  }
};

export const createCabin = async (cabin) => {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.log(`Cabin could not be created`);
    throw new Error(`Cabin could not be created`);
  }
  const { error: imgErr } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);
  if (imgErr) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(imgErr);
    throw new Error(imgErr.message);
  }

  return data;
};

export const editCabin = async (cabinData) => {
  if (typeof cabinData.image === "object") {
    const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { error: imgErr } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);
    if (imgErr) {
      console.log(imgErr);
      throw new Error(imgErr.message);
    }
    cabinData.image = imagePath;
  }
  const { data, error } = await supabase
    .from("cabins")
    .update(cabinData)
    .eq("id", cabinData.id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be updated`);
  }

  return data;
};
