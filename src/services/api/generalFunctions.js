import { supabaseClient } from "../config/config";

export const getTotalStorageAndDbSize = async () => {
  try {
    const { data, error } = await supabaseClient.rpc(
      "get_total_storage_and_db_size"
    );

    if (error) throw error;

    return {
      status: 200,
      message: "Tamaño total obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 400,
      message: "Error al obtener el tamaño total",
      error: error.message,
    };
  }
};
