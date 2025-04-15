import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getCudPatients } from "../../../../services/api/patients";
import { getProfessionals } from "../../../../services/api/professionals";
import {
  createCudBillingRecord,
  getCudBillingRecord,
  getCudBillingRecords,
  updateCudBillingRecord,
} from "../../../../services/api/cudBillingRecords";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditCudBillingRecord } from "./CreateEditCudBillingRecord";
import { allowedFileTypes } from "../../../../data/DocumentData";
import { cudBillingRecordInitialState } from "../../../../data/models";
import { errorAlert } from "../../../../components/common/alerts/alerts";
import {
  deleteCudBillingDocument,
  uploadCudBillingDocument,
} from "../../../../services/api/documentation";
import { documentationCudBillingFolder } from "../../../../services/config/config";

export const CreateEditCudBillingRecordContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = cudBillingRecordInitialState;

  //hook para guardar los pacientes
  const [patients, setPatients] = useState([]);

  //hook para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

  //hook para guardar las facturas
  const [cudBillingRecords, setCudBillingRecords] = useState([]);

  //hook para avisar si el número de factura que se está cargando existe
  const [existingCudBillingNumber, setExistingCudBillingNumber] =
    useState(false);

  //hooks para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //hooks para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});
  const [formFiles, setFormFiles] = useState({});

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

    // Selección automática de la obra especialidad si se cambia el idprofesional
    if (name === "idprofesional") {
      const profesional = professionals.find(
        (profesional) => profesional.id === parseInt(value)
      );
      if (profesional) {
        updatedFormData.prestacion = profesional.especialidadprofesional;
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

    if (name === "nrofactura") {
      const exist = cudBillingRecords.some(
        (cudBillingRecord) => cudBillingRecord.nrofactura === value
      );
      if (exist) {
        setExistingCudBillingNumber(true);
      } else {
        setExistingCudBillingNumber(false);
      }
    }

    setFormData(updatedFormData);
    console.log(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para eliminar un archivo del formulario
  const handleRemoveFile = (fieldName) => {
    const updatedFormData = {
      ...formData,
      [fieldName]: "",
    };
    setFormData(updatedFormData);
  };

  //Función submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingCudBillingNumber) {
      errorAlert(
        "El número de factura ya existe. Por favor, ingresá uno diferente."
      );
      return;
    }

    if (!formData.documentofacturamensual || !formData.imgasistenciamensual) {
      errorAlert("Faltan archivos por seleccionar.");
      return;
    }

    setIsLoadingButton(true);

    let halfDocumentName = "";
    halfDocumentName = `facturaMensual_${formData.nrofactura}`;

    try {
      if (cudBillingRecordId) {
        // Eliminar documentos anteriores
        if (
          formFiles.documentofacturamensual !== formData.documentofacturamensual
        )
          deleteCudBillingDocument(formFiles.documentofacturamensual);
        if (formFiles.imgasistenciamensual !== formData.imgasistenciamensual)
          deleteCudBillingDocument(formFiles.imgasistenciamensual);
      }

      // Subir factura mensual
      if (
        formFiles.documentofacturamensual !== formData.documentofacturamensual
      ) {
        const facturaMensualUrl = await uploadCudBillingDocument(
          formData.documentofacturamensual,
          documentationCudBillingFolder,
          "documentofacturamensual",
          halfDocumentName
        );

        console.log(facturaMensualUrl);
        setFormData({
          ...formData,
          documentofacturamensual: facturaMensualUrl,
        });
      }

      halfDocumentName = `asistenciaMensual_${formData.nrofactura}`;

      if (formFiles.imgasistenciamensual !== formData.imgasistenciamensual) {
        // Subir asistencia mensual
        const asistenciaMensualUrl = await uploadCudBillingDocument(
          formData.imgasistenciamensual,
          documentationCudBillingFolder,
          "imgasistenciamensual",
          halfDocumentName
        );

        console.log(asistenciaMensualUrl);
        setFormData({
          ...formData,
          documentofacturamensual: asistenciaMensualUrl,
        });

        // Solo crear registro si no existe
        if (!cudBillingRecordId) {
          const createResponse = await createCudBillingRecord(formData);
          console.log(createResponse);
          handleGoBack();
        } else {
          const updateResponse = await updateCudBillingRecord(formData);
          console.log(updateResponse);
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
        setCudBillingRecords(cudBillingData);

        if (cudBillingRecordId) {
          const cudBillingRecordToEdit = cudBillingData.find(
            (record) => record.id === parseInt(cudBillingRecordId)
          );
          setFormData(cudBillingRecordToEdit);
          setFormFiles(cudBillingRecordToEdit);
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
    existingCudBillingNumber,
  };
  return <CreateEditCudBillingRecord {...createEditCudBillingProps} />;
};
