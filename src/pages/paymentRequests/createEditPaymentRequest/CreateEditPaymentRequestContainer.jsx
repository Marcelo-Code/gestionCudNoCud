import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { paymentRequestInitialState } from "../../../data/models";
import { LoadingContainer } from "../../loading/LoadingContainer";

import { GeneralContext } from "../../../context/GeneralContext";
import {
  getCudBillingRecord,
  getCudBillingRecords,
  getCudBillingRecordsByProfessional,
} from "../../../services/api/cudBillingRecords";
import { CreateEditPaymentRequest } from "./CreateEditPaymentRequest";
import {
  createPaymentRequest,
  getPaymentRequest,
  updatePaymentRequest,
} from "../../../services/api/paymentRequest";
import { getProfessional } from "../../../services/api/professionals";

export const CreateEditPaymentRequestContainer = () => {
  //hooks para cargar los registros de facturas CUD
  const [cudBillingRecords, setCudBillingRecords] = useState([]);
  const [cudBillingRecord, setCudBillingRecord] = useState({});
  const [professional, setProfessional] = useState({});

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Importa variables de context
  const {
    handleGoBack,
    textSize,
    setTextSize,
    userProfessionalId,
    userProfile,
  } = useContext(GeneralContext);

  //hook para obtener el id de la consulta
  const { paymentRequestId = null, cudBillingRecordId = null } = useParams();

  //hook para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Activar el flag solo si no se ha activado antes
    if (!modifiedFlag) {
      setModifiedFlag(true);
    }
  };

  //Función submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Se borra la columna que no corresponde a la tabla
    delete formData.facturacioncud;

    setIsLoadingButton(true);

    //Si existe el id del reclamo se actualiza
    //Si no se crea
    const action = paymentRequestId
      ? updatePaymentRequest
      : createPaymentRequest;

    action(formData)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingButton(false));
  };

  useEffect(() => {
    setIsLoading(true);

    let action;
    if (userProfile === "admin") {
      action = getCudBillingRecords();
    } else if (cudBillingRecordId) {
      action = getCudBillingRecord(cudBillingRecordId);
    } else if (!cudBillingRecordId && userProfile !== "admin") {
      action = getCudBillingRecordsByProfessional(userProfessionalId);
    }

    Promise.all([
      action,
      paymentRequestId
        ? getPaymentRequest(paymentRequestId)
        : Promise.resolve({ data: [null] }),
      cudBillingRecordId
        ? getCudBillingRecord(cudBillingRecordId)
        : Promise.resolve({ data: [null] }),
      userProfessionalId
        ? getProfessional(userProfessionalId)
        : Promise.resolve({ data: [null] }),
    ])
      .then(
        ([
          cudBillingRecordsResponse,
          paymentRequestResponse,
          cudBillingRecordResponse,
          professionalResponse,
        ]) => {
          const cudBillingRecordsResponseData = cudBillingRecordsResponse.data;
          const paymentRequestResponseData = paymentRequestResponse.data[0];
          const cudBillingRecordResponseData = cudBillingRecordResponse.data[0];
          const professionalResponseData = professionalResponse.data[0];

          setCudBillingRecords(cudBillingRecordsResponseData);
          setCudBillingRecord(cudBillingRecordResponseData);
          setProfessional(professionalResponseData);

          // baseData será el objeto que se va a cargar en el form
          let baseData = paymentRequestResponseData || {
            ...paymentRequestInitialState,
          };

          if (cudBillingRecordId) {
            baseData = {
              ...baseData,
              idfacturacioncud: parseInt(cudBillingRecordId),
            };
          }

          setFormData(baseData);
        }
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [paymentRequestId, cudBillingRecordId]);

  if (isLoading) return <LoadingContainer />;

  const createEditPaymentRequestProps = {
    formData,
    cudBillingRecords,
    modifiedFlag,
    isLoadingButton,
    textSize,
    setTextSize,
    paymentRequestId,
    cudBillingRecordId,
    handleChange,
    handleSubmit,
    cudBillingRecord,
    userProfessionalId,
    userProfile,
    professional,
  };

  return <CreateEditPaymentRequest {...createEditPaymentRequestProps} />;
  // return <h1>hola</h1>;
};
