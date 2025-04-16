import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { supabaseClient } from "../config/config";

//Funcion para crear un paciente
export const createPatient = async (newPatient) => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .insert([newPatient]);
    if (error) throw error;

    successAlert(
      `Paciente ${newPatient.nombreyapellidopaciente} creado con éxito`
    );

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear paciente");

    return {
      status: 400,
      message: "Error al crear registro",
      error: error.message,
    };
  }
};

//Funcion para obtener todos los pacientes
export const getPatients = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .select("*")
      .eq("activo", true)
      .order("nombreyapellidopaciente", { ascending: true });
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

//Función para obtener pacientes inactivos
export const getInactivePatients = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .select("*")
      .eq("activo", false)
      .order("nombreyapellidopaciente", { ascending: true });
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

export const getCudPatients = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .select("*")
      .eq("activo", true)
      .eq("cud", true)
      .order("nombreyapellidopaciente", { ascending: true });
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

export const getNoCudPatients = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .select("*")
      .eq("activo", true)
      .eq("cud", false)
      .order("nombreyapellidopaciente", { ascending: true });
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

//Funcion para obtener un paciente
export const getPatient = async (patientId) => {
  try {
    const { data, error } = await supabaseClient
      .from("pacientes")
      .select("*")
      .eq("id", patientId);
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
export const updatePatient = async (updatedPatient) => {
  try {
    const { id, ...fieldsToUpdate } = updatedPatient;

    const { data, error } = await supabaseClient
      .from("pacientes")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    successAlert(
      `Paciente ${fieldsToUpdate.nombreyapellidopaciente} actualizado con éxito`
    );

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar paciente");

    return {
      status: 400,
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};

//Funcion para eliminar un paciente
export const deletePatient = async (patientId, patientName, setUpdateList) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de eliminar el paciente ${patientName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("pacientes")
      .delete()
      .match({ id: patientId });
    if (error) throw error;
    successAlert("Paciente eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro eliminado con éxito",
    };
  } catch (error) {
    errorAlert("Error al eliminar paciente");
    return {
      status: 404,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};
export const softDeletePatient = async (
  patientId,
  patientName,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de eliminar el paciente ${patientName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("pacientes")
      .update({ activo: false })
      .match({ id: patientId });
    if (error) throw error;
    successAlert("Paciente eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro eliminado con éxito",
    };
  } catch (error) {
    errorAlert("Error al eliminar paciente");
    return {
      status: 404,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};

export const softUndeletePatient = async (
  patientId,
  patientName,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de restaurar el paciente ${patientName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("pacientes")
      .update({ activo: true })
      .match({ id: patientId });
    if (error) throw error;
    successAlert("Paciente restaurado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro restaurado con éxito",
    };
  } catch (error) {
    errorAlert("Error al restaurar paciente");
    return {
      status: 404,
      message: "Error al restaurar registro",
      error: error.message,
    };
  }
};
