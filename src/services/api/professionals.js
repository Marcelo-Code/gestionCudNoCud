import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { supabaseClient } from "../config/config";

//Funcion para crear un profesional
export const createProfessional = async (newProfessional) => {
  try {
    const { data, error } = await supabaseClient
      .from("profesionales")
      .insert([newProfessional]);
    if (error) throw error;

    successAlert(
      `Profesional ${newProfessional.nombreyapellidoprofesional} creado con éxito`
    );

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear profesional");

    return {
      status: 400,
      message: "Error al crear registro",
      error: error.message,
    };
  }
};

//Funcion para obtener todos los profesionales
export const getProfessionals = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("profesionales")
      .select("*")
      .eq("activo", true)
      .order("nombreyapellidoprofesional", { ascending: true });
    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registros",
      error: error.message,
    };
  }
};

export const getInactiveProfessionals = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("profesionales")
      .select("*")
      .eq("activo", false)
      .order("nombreyapellidoprofesional", { ascending: true });
    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registros",
      error: error.message,
    };
  }
};

//Funcion para obtener un profesional
export const getProfessional = async (professionalId) => {
  try {
    const { data, error } = await supabaseClient
      .from("profesionales")
      .select("*")
      .eq("id", professionalId);
    if (error) throw error;
    return {
      status: 201,
      message: "Registro obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};

//Funcion para actualizar un paciente
export const updateProfessional = async (updatedProfessional) => {
  try {
    const { id, ...fieldsToUpdate } = updatedProfessional;

    const { data, error } = await supabaseClient
      .from("profesionales")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    successAlert(
      `Profesional ${fieldsToUpdate.nombreyapellidoprofesional} actualizado con éxito`
    );

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar profesional");

    return {
      status: 400,
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};

//Funcion para eliminar un profesional
export const deleteProfessional = async (
  professionalId,
  professionalName,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de eliminar el profesional ${professionalName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("profesionales")
      .delete()
      .match({ id: professionalId });
    if (error) throw error;
    successAlert("Profesional eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro eliminado con éxito",
    };
  } catch (error) {
    errorAlert("Error al eliminar profesional");
    return {
      status: 404,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};

export const softDeleteProfessional = async (
  professionalId,
  professionalName,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de eliminar el profesional ${professionalName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("profesionales")
      .update({ activo: false })
      .match({ id: professionalId });
    if (error) throw error;
    successAlert("Profesional eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro eliminado con éxito",
    };
  } catch (error) {
    errorAlert("Error al eliminar profesional");
    return {
      status: 404,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};

export const softUndeleteProfessional = async (
  professionalId,
  professionalName,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de restaurar el profesional ${professionalName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("profesionales")
      .update({ activo: true })
      .match({ id: professionalId });
    if (error) throw error;
    successAlert("Profesional restaurado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro restaurado con éxito",
    };
  } catch (error) {
    errorAlert("Error al restaurar profesional");
    return {
      status: 404,
      message: "Error al restaurar registro",
      error: error.message,
    };
  }
};
