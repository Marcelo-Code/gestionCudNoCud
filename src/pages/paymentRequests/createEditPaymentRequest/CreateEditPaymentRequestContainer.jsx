import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { paymentRequestInitialState } from "../../../data/models";
import { LoadingContainer } from "../../loading/LoadingContainer";

import { GeneralContext } from "../../../context/GeneralContext";
import { getCudBillingRecords } from "../../../services/api/cudBillingRecords";
import { CreateEditPaymentRequest } from "./CreateEditPaymentRequest";
import {
  createPaymentRequest,
  getPaymentRequest,
} from "../../../services/api/paymentRequest";

export const CreateEditPaymentRequestContainer = () => {
  //hooks para cargar los registros de facturas CUD
  const [cudBillingRecords, setCudBillingRecords] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Importa variables de context
  const { handleGoBack, textSize, setTextSize } = useContext(GeneralContext);

  //hook para obtener el id de la consulta
  const { paymentRequestId = null, cudBillinRecordId = null } = useParams();

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

    setIsLoadingButton(true);
    createPaymentRequest(formData)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingButton(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getCudBillingRecords(),
      paymentRequestId
        ? getPaymentRequest(paymentRequestId)
        : Promise.resolve({ data: [null] }),
    ])
      .then(([cudBillingRecordsResponse, cudBillingRecordResponse]) => {
        const cudBillingRecordsResponseData = cudBillingRecordsResponse.data;
        const cudBillingRecordResponseData = cudBillingRecordResponse.data[0];

        setCudBillingRecords(cudBillingRecordsResponseData);

        // baseData será el objeto que se va a cargar en el form
        let baseData = cudBillingRecordResponseData || {
          ...paymentRequestInitialState,
        };

        setFormData(baseData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [paymentRequestId]);

  if (isLoading) return <LoadingContainer />;

  const createEditPaymentRequestProps = {
    formData,
    cudBillingRecords,
    modifiedFlag,
    isLoadingButton,
    textSize,
    setTextSize,
    paymentRequestId,
    cudBillinRecordId,
    handleChange,
    handleSubmit,
  };

  return <CreateEditPaymentRequest {...createEditPaymentRequestProps} />;
};
