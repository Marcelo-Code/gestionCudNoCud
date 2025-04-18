import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getProfessional,
  getProfessionals,
} from "../../../../services/api/professionals";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditNoCudBillingRecord } from "./CreateEditNoCudBillingRecord";
import { allowedFileTypes } from "../../../../data/DocumentData";
import { noCudBillingRecordInitialState } from "../../../../data/models";
import {
  errorAlert,
  successAlert,
} from "../../../../components/common/alerts/alerts";
import { deleteNoCudBillingDocument } from "../../../../services/api/documentation";
import { documentationNoCudBillingFolder } from "../../../../services/config/config";
import dayjs from "dayjs";
import {
  createNoCudBillingRecord,
  getNoCudBillingRecord,
  getNoCudBillingRecords,
  updateNoCudBillingRecord,
  uploadNoCudBillingDocument,
} from "../../../../services/api/noCudBillingRecords";
import { getCurrentDateTimeString } from "../../../../utils/helpers";
import {
  getNoCudPatients,
  getPatient,
} from "../../../../services/api/patients";

export const CreateEditNoCudBillingRecordContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = noCudBillingRecordInitialState;

  //hook para guardar los pacientes
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  //hook para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});

  //hook para guardar las facturas
  const [noCudBillingRecords, setNoCudBillingRecords] = useState([]);

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
    noCudBillingRecordId = null,
  } = useParams();

  const documentoFacturaFileInputRef = useRef(null);
  const comprobanteRetencionFileInputRef = useRef(null);

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const file = files?.[0];

    let updatedFormData = { ...formData };

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
    if (name === "montosesion") {
      const witholdingTaxValue = value * witholdingTax;
      updatedFormData.retencion = witholdingTaxValue;
      updatedFormData.montofinalprofesional = value - witholdingTaxValue;
    }

    // Limpieza de campos si el estado de la factura no es 'cobrado'
    if (value === "pendiente") {
      updatedFormData = {
        ...updatedFormData,
        fechadepago: null,
        mediopago: "",
        montosesion: 0,
        retencion: 0,
        montofinalprofesional: 0,
        documentofactura: "",
        documentocomprobantepagoretencion: "",
      };
    }

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para eliminar el nombre del archivo del formulario
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

    const isPago = formData.estadopago === "pagado";

    // Validación: monto de sesión no puede ser 0 si está marcado como "pagado"
    if (isPago && formData.montosesion === 0) {
      errorAlert("Debe ingresarse el monto de la sesión");
      return;
    }

    // Validación: si está pagado, deben existir ambos documentos
    if (isPago && !formData.documentocomprobantepagoretencion) {
      errorAlert("Subir documento comprobante retención");
      return;
    }

    setIsLoadingButton(true); // Se activa indicador de carga

    let updatedFormData = { ...formData };

    try {
      // Construcción del nombre base para los archivos
      const professional = professionals.find(
        (profesional) => profesional.id === parseInt(formData.idprofesional)
      );
      const patient = patients.find(
        (patient) => patient.id === formData.idpaciente
      );
      const halfDocumentName = `${professional.nombreyapellidoprofesional}_${
        patient.nombreyapellidopaciente
      }_${getCurrentDateTimeString()}`;

      // Eliminamos propiedades que no van a la base de datos
      delete updatedFormData.pacientes;
      delete updatedFormData.profesionales;

      // Función auxiliar: borra documento anterior si fue reemplazado
      const maybeDeleteOldDocument = async (newDoc, oldDoc) => {
        if (newDoc !== oldDoc) {
          console.log(oldDoc);
          try {
            await deleteNoCudBillingDocument(oldDoc);
          } catch (err) {
            console.warn("Error al eliminar documento antiguo:", err);
          }
        }
      };

      // Si estamos editando, verificamos si los archivos cambiaron para borrarlos
      if (noCudBillingRecordId) {
        await Promise.all([
          maybeDeleteOldDocument(
            formData.documentofactura,
            formFiles.documentofactura
          ),
          maybeDeleteOldDocument(
            formData.documentocomprobantepagoretencion,
            formFiles.documentocomprobantepagoretencion
          ),
        ]);
      }

      // Si está pagado, subimos los nuevos documentos
      if (isPago) {
        try {
          //Si documentofactura cambia se sube el nuevo
          if (formData.documentofactura !== formFiles.documentofactura) {
            const facturaUrl = await uploadNoCudBillingDocument(
              formData.documentofactura,
              documentationNoCudBillingFolder,
              "documentofactura",
              halfDocumentName
            );
            //se actualiza url en el formData
            updatedFormData = {
              ...updatedFormData,
              documentofactura: facturaUrl,
            };
          }
          //Si documentocomprobantepagoretencion cambia se sube el nuevo
          if (
            formData.documentocomprobantepagoretencion !==
            formFiles.documentocomprobantepagoretencion
          ) {
            const comprobanteUrl = await uploadNoCudBillingDocument(
              formData.documentocomprobantepagoretencion,
              documentationNoCudBillingFolder,
              "documentocomprobantepagoretencion",
              halfDocumentName
            );
            //Se actualiza url en el formData
            updatedFormData = {
              ...updatedFormData,
              documentocomprobantepagoretencion: comprobanteUrl,
            };
          }
        } catch (uploadError) {
          // Manejo de error en subida de documentos
          console.error("Error al subir los documentos:", uploadError);
          errorAlert(
            "Hubo un error al subir los documentos. Intente nuevamente."
          );
          return;
        }
      }

      try {
        // Determinamos si es creación o edición
        const saveFn = noCudBillingRecordId
          ? updateNoCudBillingRecord
          : createNoCudBillingRecord;

        // Ejecutamos la función correspondiente
        const response = await saveFn(updatedFormData);
        console.log("Registro guardado correctamente:", response);
        successAlert("El registro se guardo correctamente.");

        // Volvemos atrás si todo salió bien
        handleGoBack();
      } catch (saveError) {
        // Manejo de error al guardar el registro
        console.error("Error al guardar el registro:", saveError);
        errorAlert("No se pudo guardar el registro. Intente nuevamente.");
      }
    } catch (error) {
      // Manejo de errores generales no capturados
      console.error("Error general en handleSubmit:", error);
      errorAlert("Ocurrió un error inesperado.");
    } finally {
      // Desactivamos el botón de carga sin importar el resultado
      setIsLoadingButton(false);
    }
  };

  //Función para limitar el ingreso de período facturado al mes actual

  const currentMonth = dayjs().format("YYYY-MM");

  //Obtener lista de pacientes
  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getNoCudPatients(),
      getProfessionals(),
      getNoCudBillingRecords(),
      noCudBillingRecordId
        ? getNoCudBillingRecord(noCudBillingRecordId)
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
          noCudBillingRecordsResponse,
          noCudBillingRecordResponse,
          professionalResponse,
          patientResponse,
        ]) => {
          const patientsData = patientsResponse.data;
          const professionalsData = professionalsResponse.data;
          const noCudBillingRecordsData = noCudBillingRecordsResponse.data;
          const noCudBillingRecordResponseData =
            noCudBillingRecordResponse.data[0];
          const professionalData = professionalResponse.data[0];
          const patientData = patientResponse.data[0];

          setPatients(patientsData);
          setProfessionals(professionalsData);
          setNoCudBillingRecords(noCudBillingRecordsData);
          setProfessional(professionalData);
          setPatient(patientData);

          // baseData será el objeto que se va a cargar en el form
          let baseData = noCudBillingRecordResponseData || { ...initialState };

          // Si hay patientId y/o professionalId, lo agregamos al formData
          if (patientId)
            baseData = {
              ...baseData,
              idpaciente: parseInt(patientId),
            };
          if (professionalId)
            baseData = {
              ...baseData,
              idprofesional: parseInt(professionalId),
              prestacion: professionalData.especialidadprofesional,
            };

          setFormData(baseData);
          setFormFiles(baseData);
        }
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  console.log(formData);

  const createEditNoCudBillingProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    handleGoBack,
    patients,
    professionals,
    documentoFacturaFileInputRef,
    comprobanteRetencionFileInputRef,
    handleRemoveFile,
    currentMonth,
    patient,
    professional,
    patientId,
    professionalId,
    noCudBillingRecordId,
  };
  return <CreateEditNoCudBillingRecord {...createEditNoCudBillingProps} />;
};
