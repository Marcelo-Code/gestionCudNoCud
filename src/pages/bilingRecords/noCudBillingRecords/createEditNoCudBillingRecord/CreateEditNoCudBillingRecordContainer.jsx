import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoCudPatients } from "../../../../services/api/patients";
import { getProfessionals } from "../../../../services/api/professionals";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditNoCudBillingRecord } from "./CreateEditNoCudBillingRecord";
import { allowedFileTypes } from "../../../../data/DocumentData";
import { noCudBillingRecordInitialState } from "../../../../data/models";
import { errorAlert } from "../../../../components/common/alerts/alerts";
import {
  deleteCudBillingDocument,
  uploadCudBillingDocument,
} from "../../../../services/api/documentation";
import {
  documentationCudBillingFolder,
  documentationNoCudBillingFolder,
} from "../../../../services/config/config";
import dayjs from "dayjs";
import {
  createNoCudBillingRecord,
  getNoCudBillingRecords,
  uploadNoCudBillingDocument,
} from "../../../../services/api/noCudBillingRecords";

export const CreateEditNoCudBillingRecordContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = noCudBillingRecordInitialState;

  //hook para guardar los pacientes
  const [patients, setPatients] = useState([]);

  //hook para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

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
    if (name === "estadopago" && value === "pendiente") {
      updatedFormData = {
        ...updatedFormData,
        fechadepago: "",
        mediopago: "",
        montosesion: 0,
        retencion: 0,
        montofinalprofesional: 0,
        documentofactura: "",
        documentocomprobantepagoretencion: "",
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
      [fieldName]: "",
    };
    setFormData(updatedFormData);
  };

  //Función submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

    if (formData.montosesion === 0 && formData.estadopago === "pagado") {
      errorAlert("Debe ingresarse el monto de la sesión");
      return;
    }
    if (
      formData.estadopago === "pagado" &&
      (!formData.documentofactura ||
        !formData.documentocomprobantepagoretencion)
    ) {
      errorAlert("Faltan archivos por seleccionar.");
      return;
    }

    // Eliminar campos que no van a la base de datos
    delete updatedFormData.pacientes;
    delete updatedFormData.profesionales;

    setIsLoadingButton(true);

    let halfDocumentName = "";

    try {
      if (noCudBillingRecordId) {
        // Si hay edición y se modifican los archivos a cargar se borran los archivos anteriores
        if (formFiles.documentofactura !== formData.documentofactura)
          deleteCudBillingDocument(formFiles.documentofactura);
        if (
          formFiles.documentocomprobantepagoretencion !==
          formData.documentocomprobantepagoretencion
        )
          deleteCudBillingDocument(formFiles.documentocomprobantepagoretencion);
      }

      // Si se modifican los archivos a cargar se borran los archivos anteriores
      halfDocumentName = `factura_${formData.fechasesion}_${formData.idprofesional}_${formData.idpaciente}`;

      if (formData.estadopago === "pagado") {
        const documentoFacturaUrl = await uploadNoCudBillingDocument(
          formData.documentofactura,
          documentationNoCudBillingFolder,
          "documentofactura",
          halfDocumentName
        );

        console.log(documentoFacturaUrl);
        updatedFormData = {
          ...updatedFormData,
          documentofactura: documentoFacturaUrl,
        };
      }

      halfDocumentName = `comprobantePagoRetencion_${formData.fechasesion}_${formData.idprofesional}_${formData.idpaciente}`;

      // Si se modifican los archivos a cargar se borran los archivos anteriores
      if (formData.estadopago === "pagado") {
        const documentoComprobantePagoRetencionUrl =
          await uploadNoCudBillingDocument(
            formData.documentocomprobantepagoretencion,
            documentationNoCudBillingFolder,
            "documentocomprobantepagoretencion",
            halfDocumentName
          );

        console.log(documentoComprobantePagoRetencionUrl);
        updatedFormData = {
          ...updatedFormData,
          documentocomprobantepagoretencion:
            documentoComprobantePagoRetencionUrl,
        };
      }

      // Si no hay edición se llama a la función create
      if (!noCudBillingRecordId) {
        const createResponse = await createNoCudBillingRecord(updatedFormData);
        console.log(createResponse);
        handleGoBack();
      } else {
        // Si no hay edición se llama a la función de update
        const updateResponse = await updateNoCudBillingRecord(updatedFormData);
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
      getNoCudPatients(),
      getProfessionals(),
      getNoCudBillingRecords(),
    ])
      .then(
        ([patientsResponse, professionalsResponse, noCudBillingResponse]) => {
          const patientsData = patientsResponse.data;
          const professionalsData = professionalsResponse.data;
          const noCudBillingData = noCudBillingResponse.data;

          setPatients(patientsData);
          setProfessionals(professionalsData);
          setNoCudBillingRecords(noCudBillingData);

          if (noCudBillingRecordId) {
            const noCudBillingRecordToEdit = noCudBillingData.find(
              (record) => record.id === parseInt(noCudBillingRecordId)
            );
            setFormData(noCudBillingRecordToEdit);
            setFormFiles(noCudBillingRecordToEdit);
          } else {
            setFormData(initialState);
          }

          console.log("Pacientes:", patientsData);
          console.log("Profesionales:", professionalsData);
        }
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const createEditNoCudBillingProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    handleGoBack,
    professionalId,
    noCudBillingRecordId,
    patients,
    professionals,
    documentoFacturaFileInputRef,
    comprobanteRetencionFileInputRef,
    handleRemoveFile,
    currentMonth,
  };
  return <CreateEditNoCudBillingRecord {...createEditNoCudBillingProps} />;
};
