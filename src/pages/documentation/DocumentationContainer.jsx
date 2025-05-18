import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getPatient, updatePatient } from "../../services/api/patients";
import { LoadingContainer } from "../loading/LoadingContainer";
import {
  deleteDocument,
  downloadDocument,
  uploadDocument,
} from "../../services/api/documentation";
import {
  patientDocumentationFolder,
  professionalDocumentationFolder,
} from "../../services/config/config";
import { errorAlert } from "../../components/common/alerts/alerts";
import {
  getProfessional,
  updateProfessional,
} from "../../services/api/professionals";
import { Documentation } from "./Documentation";
import {
  patientDocumentData,
  professionalDocumentData,
} from "../../data/documentsData";
import { GeneralContext } from "../../context/GeneralContext";

export const DocumentationContainer = () => {
  //hooks para los datos del formulario
  const [formData, setFormData] = useState({});
  const [documentName, setDocumentName] = useState("");

  //hooks para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para actualizar la lista luego de una accion
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para obtener el id del paciente
  const { patientId = null, professionalId = null } = useParams();

  //hook para el loading de un documento específico (tanto para el upload como para el delete)
  const [uploadingDocumentName, setUploadingDocumentName] = useState(null);

  //importa el perfil de usuario del contexto
  const { userProfile, userProfessionalId } = useContext(GeneralContext);

  //hook para el selector de archivos
  const fileInputRef = useRef(null);

  //Lógica para definir función de update dependiendo de si es paciente o profesional
  let updateFunction;
  let folder;
  let halfFileName;
  let documentData;
  if (patientId) {
    updateFunction = updatePatient;
    //Define la carpeta donde se guardará el archivo en el bucket
    folder = patientDocumentationFolder;
    //Define el medio nombre del archivo
    halfFileName = `${formData.dnipaciente}_${formData.nombreyapellidopaciente}`;
    //Define el array con los datos del documento
    documentData = patientDocumentData;
  }
  if (professionalId) {
    updateFunction = updateProfessional;
    folder = professionalDocumentationFolder;
    halfFileName = `${formData.dniprofesional}_${formData.nombreyapellidoprofesional}`;
    documentData = professionalDocumentData;
  }

  //Función para abrir el selector de archivos
  const handleUploadDocument = (documentName) => {
    if (formData[documentName]) {
      errorAlert(
        "Ya existen documentos, para cargar otros, primero elimine los anteriores"
      );
      return;
    }
    setDocumentName(documentName);
    fileInputRef.current.click();
  };

  // Función para manejar la carga de archivos
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verifica el formato del archivo
      const allowedFileTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];
      if (!allowedFileTypes.includes(file.type)) {
        errorAlert("Formato de archivo no permitido");
        console.error("Formato no permitido");
        return;
      }
      console.log("Archivo seleccionado:", file);

      // Llama a la función para subir el archivo
      uploadDocument(
        file,
        folder,
        documentName,
        formData,
        updateFunction,
        setUploadingDocumentName,
        halfFileName
      )
        .then((response) => {
          console.log(response);
          setUpdateList((prevState) => !prevState);
        })
        .catch((error) => console.log(error))
        .finally(() => setUploadingDocumentName(null));
    }
  };

  // Función para manejar la eliminación de documentos
  const handleDeleteDocument = (documentName) => {
    if (!formData[documentName]) {
      errorAlert("No existen documentos para eliminar");
      return;
    }

    // Llama a la función para eliminar el archivo
    deleteDocument(
      documentName,
      formData,
      updateFunction,
      folder,
      setUploadingDocumentName,
      setUpdateList,
      halfFileName
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setUploadingDocumentName(null));
  };

  // Función para manejar la descarga de documentos
  const handleDownloadDocument = (documentName) => {
    if (!formData[documentName]) {
      errorAlert("No existen documentos para descargar");
      return;
    }
    // Llama a la función para descargar el archivo
    downloadDocument(documentName, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  //Obtener paciente determinado
  useEffect(() => {
    setIsLoading(true);
    if (patientId) {
      getPatient(patientId)
        .then((response) => {
          setFormData(response.data[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
    if (professionalId) {
      getProfessional(professionalId)
        .then((response) => {
          setFormData(response.data[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [patientId, professionalId, updateList]);

  if (isLoading || !formData) return <LoadingContainer />;

  const documentationProps = {
    patientId,
    professionalId,
    formData,
    documentData,
    editMode,
    setEditMode,
    uploadingDocumentName,
    handleDeleteDocument,
    handleUploadDocument,
    handleFileChange,
    fileInputRef,
    handleDownloadDocument,
    userProfile,
    userProfessionalId,
  };

  return <Documentation {...documentationProps} />;
};
