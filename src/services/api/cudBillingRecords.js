import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { extractPath } from "../../utils/helpers";
import {
  bucketName,
  documentationCudBillingFolder,
  supabaseClient,
} from "../config/config";

export const createCudBillingRecord = async (newCudBillingRecord) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .insert([newCudBillingRecord]);
    if (error) {
      throw error;
    }

    successAlert("Facturación creada con éxito");

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear facturación");
    return {
      status: 404,
      message: "Error al crear el registro",
      error: error.message,
    };
  }
};

export const getCudBillingRecords = async () => {
  try {
    const { data } = await supabaseClient
      .from("facturacioncud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .order("id", { ascending: false });

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

export const getCudBillingRecord = async (cudBillingRecordId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("id", cudBillingRecordId);

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

export const getCudBillingRecordsByProfessional = async (professionalId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idprofesional", professionalId)
      .order("periodofacturado", { ascending: false });

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

export const getCudBillingRecordsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idpaciente", patientId)
      .order("id", { ascending: false });

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

//Borrar registro de facturación
export const deleteCudBillingRecord = async (
  cudBillingRecordId,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    "¿Estás seguro de eliminar este registro de facturación?"
  );
  if (!confirm) return;

  try {
    const response = await getCudBillingRecord(cudBillingRecordId);
    const record = response?.data?.[0];

    if (!record) throw new Error("Registro no encontrado");

    // Extrae ruta relativa a partir de un nombre de carpeta conocido
    const filesToDelete = [
      extractPath(
        record.documentofacturamensual,
        documentationCudBillingFolder
      ),
      extractPath(record.imgasistenciamensual, documentationCudBillingFolder),
    ].filter(Boolean); // Saca nulls o undefined

    if (filesToDelete.length > 0) {
      const { error: deleteError } = await supabaseClient.storage
        .from(bucketName)
        .remove(filesToDelete);
      if (deleteError) throw deleteError;
    }

    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .delete()
      .eq("id", cudBillingRecordId);

    if (error) throw error;

    successAlert("Registro eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 200,
      message: "Registro eliminado con éxito",
      data,
    };
  } catch (error) {
    console.error("Error en deleteCudBillingRecord:", error);
    errorAlert("Error al eliminar registro");
    return {
      status: 400,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};

export const updateCudBillingRecord = async (updatedCudBillingRecord) => {
  try {
    const { id, ...fieldsToUpdate } = updatedCudBillingRecord;

    const { data, error } = await supabaseClient
      .from("facturacioncud")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) {
      throw error;
    }

    successAlert("Facturación actualizada con éxito");

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar facturación");
    return {
      status: 400,
      message: "Error al actualizar el registro",
      error: error.message,
    };
  }
};
