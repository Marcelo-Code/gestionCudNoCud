import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { extractPath, sanitizeFileName } from "../../utils/helpers";
import {
  bucketName,
  documentationNoCudBillingFolder,
  supabaseClient,
} from "../config/config";

export const createNoCudBillingRecord = async (newNoCudBillingRecord) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .insert([newNoCudBillingRecord]);
    if (error) {
      throw error;
    }

    successAlert("Registro creado con éxito");

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear registro");
    return {
      status: 404,
      message: "Error al crear el registro",
      error: error.message,
    };
  }
};

export const getNoCudBillingRecords = async () => {
  try {
    const { data } = await supabaseClient
      .from("facturacionnocud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .order("fechasesion", { ascending: false });

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

export const getNoCudBillingRecord = async (noCudBillingRecordId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("id", noCudBillingRecordId);
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

export const getNoCudBillingRecordsByProfessional = async (professionalId) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idprofesional", professionalId)
      .order("fechasesion", { ascending: false });

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
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idpaciente", patientId)
      .order("fechasesion", { ascending: false });

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

export const getNoCudBillingRecordsByProfessionalAndByPatient = async (
  professionalId,
  patientId
) => {
  try {
    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .select(
        "*, pacientes: idpaciente(nombreyapellidopaciente, obrasocialpaciente), profesionales: idprofesional(nombreyapellidoprofesional, matriculaprofesional, cuitprofesional, especialidadprofesional)"
      )
      .eq("idprofesional", professionalId)
      .eq("idpaciente", patientId)
      .order("fechasesion", { ascending: false });

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

export const deleteNoCudBillingRecord = async (
  noCudBillingRecordId,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    "¿Estás seguro de eliminar este registro?"
  );
  if (!confirm) return;

  try {
    const response = await getNoCudBillingRecord(noCudBillingRecordId);
    const record = response?.data?.[0];

    if (!record) throw new Error("Registro no encontrado");

    // Extrae ruta relativa a partir de un nombre de carpeta conocido
    const filesToDelete = [
      extractPath(record.documentofactura, documentationNoCudBillingFolder),
      extractPath(
        record.documentocomprobantepagoretencion,
        documentationNoCudBillingFolder
      ),
    ].filter(Boolean); // Saca nulls o undefined

    if (filesToDelete.length > 0) {
      const { error: deleteError } = await supabaseClient.storage
        .from(bucketName)
        .remove(filesToDelete);
      if (deleteError) throw deleteError;
    }

    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .delete()
      .eq("id", noCudBillingRecordId);

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

export const uploadNoCudBillingDocument = async (
  file,
  folder,
  documentName,
  halfFileName
) => {
  try {
    const extension = file.name.split(".").pop();

    console.log(file);

    // Elimina acentos y caracteres especiales del nombre base del archivo
    const cleanHalfFileName = sanitizeFileName(halfFileName);

    const fileName = `${folder}/${documentName}_${cleanHalfFileName}.${extension}`;

    // Subida del archivo
    const { error: uploadError } = await supabaseClient.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: "0",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data: publicData } = supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!publicData || !publicData.publicUrl)
      throw new Error("No se pudo obtener la URL pública del archivo");

    const decodedUrl = decodeURIComponent(publicData.publicUrl);

    //Se devuelve directamente la URL para manejarla desde afuera
    return decodedUrl;
  } catch (error) {
    console.error("Error al cargar archivo:", error);
    return null; // Para que pueda verificarse fácilmente si falló
  }
};

export const updateNoCudBillingRecord = async (updatedNoCudBillingRecord) => {
  try {
    const { id, ...fieldsToUpdate } = updatedNoCudBillingRecord;

    const { data, error } = await supabaseClient
      .from("facturacionnocud")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) {
      throw error;
    }

    successAlert("Registro actualizado con éxito");

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar registro");
    return {
      status: 400,
      message: "Error al actualizar el registro",
      error: error.message,
    };
  }
};
