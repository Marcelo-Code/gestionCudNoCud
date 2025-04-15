import { supabaseClient } from "../config/config";

export const getNoCudBillingRecords = async () => {
  try {
    const { data } = await supabaseClient
      .from("facturacionnocud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      );

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

export const getNoCudBillingRecordsByProfessional = async (professionalId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .select("*")
      .eq("idprofesional", professionalId);

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

export const getNoCudBillingRecordsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .select("*")
      .eq("idpaciente", patientId);

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
