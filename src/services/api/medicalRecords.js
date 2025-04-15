import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { supabaseClient } from "../config/config";

export const getMedicalRecords = async () => {
  try {
    const { data } = await supabaseClient
      .from("consultas")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .order("fechaconsulta", { ascending: false });

    return {
      status: 201,
      message: "Consultas obtenidas con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener consutlas",
      error: error.message,
    };
  }
};
export const getMedicalRecordsByProfessional = async (professionalId) => {
  try {
    const { data } = await supabaseClient
      .from("consultas")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idprofesional", professionalId)
      .order("fechaconsulta", { ascending: false });

    return {
      status: 201,
      message: "Consultas obtenidas con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener consutlas",
      error: error.message,
    };
  }
};

export const getMedicalRecordsByPatient = async (patientId) => {
  try {
    const { data } = await supabaseClient
      .from("consultas")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idpaciente", patientId)
      .order("fechaconsulta", { ascending: false });

    return {
      status: 201,
      message: "Consultas obtenidas con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener consutlas",
      error: error.message,
    };
  }
};

export const getMedicalRecord = async (medicalRecordId) => {
  try {
    const { data, error } = await supabaseClient
      .from("consultas")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("id", medicalRecordId);

    if (error) throw error;

    return {
      status: 200,
      message: "Registro obtenido con éxito",
      data: data[0],
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener la registro",
      error: error.message,
    };
  }
};

export const createMedicalRecord = async (newRecord) => {
  try {
    const { data, error } = await supabaseClient
      .from("consultas")
      .insert([newRecord])
      .select(); // opcional: devuelve el registro creado

    if (error) throw error;

    successAlert("Consulta creada con éxito");

    return {
      status: 201,
      message: "Consulta creada con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear consulta");

    return {
      status: 400,
      message: "Error al crear consulta",
      error: error.message,
    };
  }
};

export const deleteMedicalRecord = async (medicalRecordId, setUpdateList) => {
  const confirm = await confirmationAlert(
    "¿Estás seguro de eliminar la consulta?"
  );
  if (!confirm) return;
  try {
    const { data, error } = await supabaseClient
      .from("consultas")
      .delete()
      .eq("id", medicalRecordId);

    if (error) throw error;

    successAlert("Consulta eliminada con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 200,
      message: "Consulta eliminada con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al eliminar consulta");
    return {
      status: 400,
      message: "Error al eliminar consulta",
      error: error.message,
    };
  }
};
