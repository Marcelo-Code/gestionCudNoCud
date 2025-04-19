import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../loading/LoadingContainer";

import {
  deletePaymentRequestRecord,
  getPaymentRequest,
  getPaymentRequests,
} from "../../../services/api/paymentRequest";
import { PaymentRequestsList } from "./PaymentRequestsList";

export const PaymentRequestsListContainer = () => {
  //hook para obtener el id de la facturacion CUD
  const { cudBillingRecordId = null } = useParams();

  //hook para actualizar la lista luego de una acción
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el array de reclamos
  const [paymentRequests, setPaymentRequests] = useState([]);

  //Función para eliminar una consulta
  const handleDeletePaymentRequest = (paymentRequestRecordId) => {
    deletePaymentRequestRecord(paymentRequestRecordId, setUpdateList)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (cudBillingRecordId) {
          const response = await getPaymentRequest(cudBillingRecordId);
          setPaymentRequests(response.data); // lo envolvemos en un array si es un único objeto
        } else {
          const response = await getPaymentRequests();
          setPaymentRequests(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [updateList, cudBillingRecordId]);

  if (isLoading) return <LoadingContainer />;

  const paymentRequestsListProps = {
    paymentRequests,
    handleDeletePaymentRequest,
    editMode,
    setEditMode,
    cudBillingRecordId,
  };

  console.log(paymentRequests);

  return <PaymentRequestsList {...paymentRequestsListProps} />;
};
