import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicalRecord } from "../../../services/api/medicalRecords";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPaymentRequest } from "../../../services/api/paymentRequest";
import { PaymentRequestDetail } from "./PaymentRequestDetail";

export const PaymentRequestDetailContainer = () => {
  //hook para obtener el id de la consulta
  const { paymentRequestId } = useParams();

  //hook para mostrar datos del formulario
  const [formData, setFormData] = useState({});

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //Importa variables de context
  const { textSize, setTextSize } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    getPaymentRequest(paymentRequestId)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [paymentRequestId]);

  if (isLoading) return <LoadingContainer />;

  const paymentRequestDetailProps = {
    formData,
    textSize,
    setTextSize,
  };

  return <PaymentRequestDetail {...paymentRequestDetailProps} />;
};
