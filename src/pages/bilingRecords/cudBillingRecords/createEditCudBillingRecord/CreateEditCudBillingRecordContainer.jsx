import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getCudPatients } from "../../../../services/api/patients";
import { getProfessionals } from "../../../../services/api/professionals";
import {
  createCudBillingRecord,
  getCudBillingRecords,
} from "../../../../services/api/cudBillingRecords";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditCudBillingRecord } from "./CreateEditCudBillingRecord";
import {
  allowedFileTypes,
  cudDocumentData,
} from "../../../../data/DocumentData";
import { cudBillingRecordInitialState } from "../../../../data/models";
import { createMedicalRecord } from "../../../../services/api/medicalRecords";
import { errorAlert } from "../../../../components/common/alerts/alerts";
import {
  uploadDocument,
  uploadDocument2,
} from "../../../../services/api/documentation";
import {
  documentationCudBillingFolder,
  professionalDocumentationFolder,
} from "../../../../services/config/config";

export const CreateEditCudBillingRecordContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = cudBillingRecordInitialState;

  //hooks para guardar los pacientes
  const [patients, setPatients] = useState([]);

  //hooks para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

  //hooks para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //hooks para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  //Valor de retención el cálculo del valor final
  const witholdingTax = 0.35;

  //hook para obtener el id del paciente
  const {
    patientId = null,
    professionalId = null,
    cudBillingRecordId = null,
  } = useParams();

  const facturaMensualFileInputRef = useRef(null);
  const asistenciaMensualFileInputRef = useRef(null);

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files?.[0];

    // Validación de tipo de archivo
    if (file && !allowedFileTypes.includes(file.type)) {
      errorAlert("Formato de archivo no permitido");
      console.error("Formato no permitido");
      return;
    }

    let updatedFormData = { ...formData };

    // Si es un archivo, se actualiza el formData con el archivo
    if (file) {
      updatedFormData[name] = file;
    } else {
      updatedFormData[name] = value;
    }

    // Selección automática de la obra social si se cambia el idpaciente
    if (name === "idpaciente") {
      const patient = patients.find(
        (patient) => patient.id === parseInt(value)
      );
      if (patient) {
        updatedFormData.obrasocialpaciente = patient.obrasocialpaciente;
      }
    }

    // Cálculo de retención y monto final si se cambia el monto percibido
    if (name === "montopercibido") {
      const witholdingTaxValue = value * witholdingTax;
      updatedFormData.retencion = witholdingTaxValue;
      updatedFormData.montofinalprofesional = value - witholdingTaxValue;
    }

    // Limpieza de campos si el estado de la factura no es 'cobrado'
    if (
      name === "estadofacturacion" &&
      (value === "pendiente" || value === "recibido")
    ) {
      updatedFormData = {
        ...updatedFormData,
        fechacobro: "",
        montopercibido: 0,
        retencion: 0,
        montofinalprofesional: 0,
      };
    }

    setFormData(updatedFormData);
    console.log(updatedFormData);

    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para eliminar un archivo del formulario
  const handleRemoveFile = (fieldName) => {
    const updatedFormData = {
      ...formData,
      [fieldName]: null,
    };
    setFormData(updatedFormData);
  };

  //Función submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.documentofacturamensual || !formData.imgasistenciamensual) {
      console.error("Faltan archivos por seleccionar.");
      return;
    }

    setIsLoadingButton(true);

    try {
      // Subir factura mensual
      const facturaMensualUrl = await uploadDocument2(
        formData.documentofacturamensual,
        professionalDocumentationFolder,
        "documentofacturamensual",
        "facturaMensual"
      );

      console.log(facturaMensualUrl);

      // Subir asistencia mensual
      const asistenciaMensualUrl = await uploadDocument2(
        formData.imgasistenciamensual,
        professionalDocumentationFolder,
        "imgasistenciamensual",
        "asistenciaMensual"
      );

      console.log(asistenciaMensualUrl);

      // Verifica que ambas subidas hayan sido exitosas
      if (facturaMensualUrl && asistenciaMensualUrl) {
        // Actualiza el estado formData con ambas URLs
        const updatedFormData = {
          ...formData,
          documentofacturamensual: facturaMensualUrl,
          imgasistenciamensual: asistenciaMensualUrl,
        };

        setFormData(updatedFormData); // Actualiza el estado

        // Solo crear registro si no existe
        if (!cudBillingRecordId) {
          const createResponse = await createCudBillingRecord(updatedFormData);
          console.log(createResponse);
          handleGoBack();
        }
      } else {
        console.error("Error al cargar uno o ambos documentos.");
      }
    } catch (error) {
      console.error("Error al subir los documentos:", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  //Obtener lista de pacientes
  useEffect(() => {
    setIsLoading(true);

    Promise.all([getCudPatients(), getProfessionals(), getCudBillingRecords()])
      .then(([patientsResponse, professionalsResponse, cudBillingResponse]) => {
        const patientsData = patientsResponse.data;
        const professionalsData = professionalsResponse.data;
        const cudBillingData = cudBillingResponse.data;

        setPatients(patientsData);
        setProfessionals(professionalsData);

        if (cudBillingRecordId) {
          const cudBillingRecordToEdit = cudBillingData.find(
            (record) => record.id === parseInt(cudBillingRecordId)
          );
          setFormData(cudBillingRecordToEdit);
        } else {
          setFormData(initialState);
        }

        console.log("Pacientes:", patientsData);
        console.log("Profesionales:", professionalsData);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const createEditCudBillingProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    handleGoBack,
    professionalId,
    cudBillingRecordId,
    patients,
    professionals,
    facturaMensualFileInputRef,
    asistenciaMensualFileInputRef,
    handleRemoveFile,
  };
  return <CreateEditCudBillingRecord {...createEditCudBillingProps} />;
};
