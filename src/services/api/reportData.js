import { supabaseClient } from "../config/config";

export const getReportData = async () => {
  try {
    const { error, data } = await supabaseClient
      .from("datos")
      .select("*")
      .single();

    if (error) throw error;
    return {
      status: 200,
      data,
      message: "Registros obtenidos con exito",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registros",
      error: error.message,
    };
  }
};

export const updateReportData = async (updatedReportData) => {
  try {
    const { error } = await supabaseClient
      .from("datos")
      .update(updatedReportData)
      .eq("id", 1);
    if (error) throw error;
    return {
      status: 200,
      message: "Registros actualizados con exito",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al actualizar registros",
      error: error.message,
    };
  }
};
