import { confirmationAlert } from "../../components/common/alerts/alerts";
import { extractPath, sanitizeFileName } from "../../utils/helpers";
import {
  bucketName,
  documentationCudBillingFolder,
  supabaseClient,
} from "../config/config";

//Funcion para subir un archivo
export const uploadDocument = async (
  file,
  folder,
  documentName,
  formData,
  updateFunction,
  setUploadingDocumentName,
  halfFileName
) => {
  setUploadingDocumentName(documentName);

  try {
    //define la extensión del archivo
    const extension = file.name.split(".").pop();

    // Elimina del nombre del archivo los acentos y carácteres especiales
    const cleanHalfFileName = sanitizeFileName(halfFileName);

    //Define el nombre del archivo
    const fileName = `${folder}/${documentName}_${cleanHalfFileName}.${extension}`;

    // Sube el archivo a Supabase
    const { error: uploadError } = await supabaseClient.storage
      .from(bucketName)
      .upload(fileName, file, {
        //Tiempo de vida del archivo en el cache
        cacheControl: "0",

        //Sobreescribe el archivo en caso de que ya exista
        upsert: true,
      });

    if (uploadError) throw uploadError;

    //Obtiene la URL pública del archivo subido
    const { data: publicData } = supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    //Ejecuta la función de actualizar paciente
    if (publicData.publicUrl) {
      //Reemplaza %20 por un espacio
      const decodedUrl = decodeURIComponent(publicData.publicUrl);

      if (!publicData)
        throw new Error("No se pudo obtener la URL pública del archivo");

      const updatedRecord = {
        ...formData,
        [documentName]: decodedUrl,
      };

      //Actualiza el registro correspondiente
      const response = await updateFunction(updatedRecord);
      return response;
    }
  } catch (error) {
    console.error("Error al cargar archivo:", error);
  }
};

//Funcion para eliminar un archivo
export const deleteDocument = async (
  documentName,
  formData,
  updateFunction,
  folder,
  setUploadingDocumentName,
  setUpdateList,
  halfFileName
) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de eliminar el documento ${documentName}?`
  );
  if (!confirm) return;

  setUploadingDocumentName(documentName);

  try {
    const currentUrl = formData[documentName];
    if (!currentUrl)
      throw new Error("No se encontró una URL válida en formData");

    // Obtener extensión desde la URL
    const extension = currentUrl.split(".").pop();

    // Elimina del nombre del archivo los acentos y carácteres especiales
    const cleanHalfFileName = sanitizeFileName(halfFileName);

    // Reconstruir el nombre del archivo como en uploadDocument
    const fileName = `${folder}/${documentName}_${cleanHalfFileName}.${extension}`;

    // Eliminar archivo del bucket (requiere un array)
    const { error: deleteError } = await supabaseClient.storage
      .from(bucketName)
      .remove([fileName]);

    if (deleteError) throw deleteError;

    // Actualiza el formData (deja ese campo vacío)
    const updatedRecord = {
      ...formData,
      [documentName]: "",
    };
    await updateFunction(updatedRecord);

    //Actualiza la lista de documentos
    setUpdateList((prev) => !prev);

    console.log("Archivo eliminado correctamente:", fileName);
    return { success: true, file: fileName };
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return { success: false, error };
  }
};

//Funcion para descargar un archivo
export const downloadDocument = async (documentName, formData) => {
  try {
    const publicUrl = formData[documentName];
    if (!publicUrl)
      throw new Error(
        "No se encontró una URL válida para descargar el documento"
      );

    // Abrir en una nueva pestaña o forzar descarga
    const link = document.createElement("a");
    link.href = publicUrl;
    link.download = ""; // Nombre opcional para descarga
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Descarga iniciada para ${documentName}`);
    return { success: true };
  } catch (error) {
    console.error("Error al descargar el documento:", error);
    return { success: false, error };
  }
};

export const uploadCudBillingDocument = async (
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
    console.log(fileName);

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

export const deleteCudBillingDocument = async (filePath) => {
  try {
    const pathToDelete = extractPath(filePath, documentationCudBillingFolder);
    const { error } = await supabaseClient.storage
      .from(bucketName)
      .remove([pathToDelete]);

    console.log("Archivo eliminado correctamente:", pathToDelete);

    if (error) {
      throw error;
    }
    return {
      status: 200,
      message: "Archivo eliminado correctamente",
    };
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return {
      status: 400,
      message: "Error al eliminar el archivo",
      error: error.message,
    };
  }
};
