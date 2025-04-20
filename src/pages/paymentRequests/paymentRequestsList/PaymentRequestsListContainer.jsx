import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../loading/LoadingContainer";

import {
  deletePaymentRequestRecord,
  getPaymentRequest,
  getPaymentRequestByCudBillingRecord,
  getPaymentRequests,
} from "../../../services/api/paymentRequest";
import { PaymentRequestsList } from "./PaymentRequestsList";
import { getCudBillingRecord } from "../../../services/api/cudBillingRecords";

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

  //hook para el el registro de la factura reclamada
  const [cudBillingRecord, setCudBillingRecord] = useState({});

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
          const responsePaymentRequest =
            await getPaymentRequestByCudBillingRecord(cudBillingRecordId);
          const responseCudBillingRecord = await getCudBillingRecord(
            cudBillingRecordId
          );

          setPaymentRequests(responsePaymentRequest.data);
          setCudBillingRecord(responseCudBillingRecord.data[0]);
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
    cudBillingRecord,
  };

  return <PaymentRequestsList {...paymentRequestsListProps} />;
};
