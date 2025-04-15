import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { bucketName, supabaseClient } from "../config/config";

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

export const getCudBillingRecordsByProfessional = async (professionalId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
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

export const getCudBillingRecordsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacioncud")
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

export const deleteCudBillingRecord = async (
  cudBillingRecordId,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    "¿Estás seguro de eliminar este registro de facturación?"
  );
  if (!confirm) return;

  try {
    // 1. Obtener el registro para acceder a las URLs
    const { data: recordData, error: fetchError } = await supabaseClient
      .from("facturacioncud")
      .select("imgasistenciamensual, documentofacturamensual")
      .eq("id", cudBillingRecordId)
      .single();

    if (fetchError) throw fetchError;

    // 2. Extraer los paths de las URLs públicas
    const urls = [
      recordData.imgasistenciamensual,
      recordData.documentofacturamensual,
    ];

    const pathsToDelete = urls
      .filter(Boolean)
      .map((url) => {
        const parts = url.split("/storage/v1/object/public/");
        return parts.length === 2 ? parts[1] : null;
      })
      .filter(Boolean);

    // 3. Eliminar archivos del bucket
    if (pathsToDelete.length) {
      const { error: deleteFilesError } = await supabaseClient.storage
        .from(bucketName) // Asegurate de que `bucketName` está definido globalmente o pasalo como parámetro
        .remove(pathsToDelete);

      if (deleteFilesError)
        console.warn("Error al borrar archivos:", deleteFilesError.message);
    }

    // 4. Eliminar el registro de la tabla
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
    errorAlert("Error al eliminar registro");
    return {
      status: 400,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};
