import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getCudPatients, getPatient } from "../../../../services/api/patients";
import {
  getProfessional,
  getProfessionals,
} from "../../../../services/api/professionals";
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
import dayjs from "dayjs";
import { getCurrentDateTimeString } from "../../../../utils/helpers";

export const CreateEditCudBillingRecordContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = cudBillingRecordInitialState;

  //hook para guardar los pacientes
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  //hook para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});

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

    let updatedFormData = { ...formData, [name]: value };

    if (name === "periodofacturado") {
      updatedFormData = {
        ...updatedFormData,
        periodofacturado: `${value}-01`,
      };
    }

    // Validación de tipo de archivo
    if (file && !allowedFileTypes.includes(file.type)) {
      errorAlert("Formato de archivo no permitido");
      console.error("Formato no permitido");
      return;
    }

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
        fechacobro: null,
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

    let updatedFormData = { ...formData };

    // Eliminar campos que no van a la base de datos
    delete updatedFormData.pacientes;
    delete updatedFormData.profesionales;

    if (existingCudBillingNumber) {
      errorAlert(
        "El número de factura ya existe. Por favor, ingresá uno diferente."
      );
      return;
    }

    if (formData.montofacturado === 0) {
      errorAlert("Ingresar un valor diferente a 0 para el monto facturado.");
      return;
    }

    if (!formData.documentofacturamensual || !formData.imgasistenciamensual) {
      errorAlert("Faltan archivos por seleccionar.");
      return;
    }

    setIsLoadingButton(true);

    let halfDocumentName = "";

    try {
      if (cudBillingRecordId) {
        // Si hay edición y se modifican los archivos a cargar se borran los archivos anteriores
        if (
          formFiles.documentofacturamensual !== formData.documentofacturamensual
        )
          deleteCudBillingDocument(formFiles.documentofacturamensual);
        if (formFiles.imgasistenciamensual !== formData.imgasistenciamensual)
          deleteCudBillingDocument(formFiles.imgasistenciamensual);
      }

      // Construcción del nombre base para los archivos
      const patient = patients.find(
        (patient) => patient.id === formData.idpaciente
      );
      const professional = professionals.find(
        (professional) => professional.id === formData.idprofesional
      );
      halfDocumentName = `${patient.nombreyapellidopaciente}_${
        professional.nombreyapellidoprofesional
      }_${getCurrentDateTimeString()}`;

      // Si se modifican los archivos a cargar se borran los archivos anteriores
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
        updatedFormData = {
          ...updatedFormData,
          documentofacturamensual: facturaMensualUrl,
        };
      }

      // Si se modifican los archivos a cargar se borran los archivos anteriores
      if (formFiles.imgasistenciamensual !== formData.imgasistenciamensual) {
        const asistenciaMensualUrl = await uploadCudBillingDocument(
          formData.imgasistenciamensual,
          documentationCudBillingFolder,
          "imgasistenciamensual",
          halfDocumentName
        );

        console.log(asistenciaMensualUrl);
        updatedFormData = {
          ...updatedFormData,
          imgasistenciamensual: asistenciaMensualUrl,
        };
      }

      // Si no hay edición se llama a la función create
      if (!cudBillingRecordId) {
        const createResponse = await createCudBillingRecord(updatedFormData);
        console.log(createResponse);
        handleGoBack();
      } else {
        // Si no hay edición se llama a la función de update
        const updateResponse = await updateCudBillingRecord(updatedFormData);
        console.log(updateResponse);
        handleGoBack();
      }
    } catch (error) {
      console.error("Error al subir los documentos:", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  //Función para limitar el ingreso de período facturado al mes actual

  const currentMonth = dayjs().format("YYYY-MM"); // ejemplo con dayjs

  //Obtener lista de pacientes
  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getCudPatients(),
      getProfessionals(),
      getCudBillingRecords(),
      cudBillingRecordId
        ? getCudBillingRecord(cudBillingRecordId)
        : Promise.resolve({ data: [null] }),
      professionalId
        ? getProfessional(professionalId)
        : Promise.resolve({ data: [null] }),
      patientId ? getPatient(patientId) : Promise.resolve({ data: [null] }),
    ])
      .then(
        ([
          patientsResponse,
          professionalsResponse,
          cudBillingRecordsResponse,
          cudBillingRecordResponse,
          professionalResponse,
          patientResponse,
        ]) => {
          const patientsData = patientsResponse.data;
          const professionalsData = professionalsResponse.data;
          const cudBillingData = cudBillingRecordsResponse.data;
          const cudBillingRecordResponseData = cudBillingRecordResponse.data[0];
          const professional = professionalResponse.data[0];
          const patient = patientResponse.data[0];

          setPatients(patientsData);
          setProfessionals(professionalsData);
          setCudBillingRecords(cudBillingData);
          setProfessional(professional);
          setPatient(patient);

          // baseData será el objeto que se va a cargar en el form
          let baseData = cudBillingRecordResponseData || { ...initialState };

          // Si hay patientId y/o professionalId, lo agregamos al formData
          if (patientId)
            baseData = { ...baseData, idpaciente: parseInt(patientId) };
          if (professionalId)
            baseData = { ...baseData, idprofesional: parseInt(professionalId) };

          setFormData(baseData);
          setFormFiles(baseData);
        }
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  //Obtiene el paciente y profesional

  const createEditCudBillingProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    handleGoBack,
    patientId,
    professionalId,
    cudBillingRecordId,
    patients,
    professionals,
    facturaMensualFileInputRef,
    asistenciaMensualFileInputRef,
    handleRemoveFile,
    existingCudBillingNumber,
    currentMonth,
    patient,
    professional,
  };
  return <CreateEditCudBillingRecord {...createEditCudBillingProps} />;
};
