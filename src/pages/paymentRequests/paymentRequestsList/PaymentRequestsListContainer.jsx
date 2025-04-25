import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../loading/LoadingContainer";

import {
  deletePaymentRequestRecord,
  getPaymentRequestByCudBillingRecordId,
  getPaymentRequests,
} from "../../../services/api/paymentRequest";
import { PaymentRequestsList } from "./PaymentRequestsList";
import { getCudBillingRecord } from "../../../services/api/cudBillingRecords";
import { GeneralContext } from "../../../context/GeneralContext";

export const PaymentRequestsListContainer = () => {
  //hook para obtener el id de la facturacion CUD
  const { cudBillingRecordId = null, professionalId = null } = useParams();

  //hook para actualizar la lista luego de una acción
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el array de reclamos
  const [paymentRequests, setPaymentRequests] = useState([]);

  //hook para el array de reclamos filtrados
  const [filteredPaymentRequests, setFilteredPaymentRequests] = useState([]);

  //hook para el el registro de la factura reclamada
  const [cudBillingRecord, setCudBillingRecord] = useState({});

  const { userProfile, userProfessionalId } = useContext(GeneralContext);

  //Función para eliminar una consulta
  const handleDeletePaymentRequest = (paymentRequestRecordId) => {
    deletePaymentRequestRecord(paymentRequestRecordId, setUpdateList)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let action;
    if (cudBillingRecordId) {
      action = getPaymentRequestByCudBillingRecordId(cudBillingRecordId);
    } else {
      action = getPaymentRequests();
    }
    setIsLoading(true);

    Promise.all([
      action,
      cudBillingRecordId
        ? getCudBillingRecord(cudBillingRecordId)
        : Promise.resolve({ data: [null] }),
    ])
      .then(([paymentRequestResponse, cudBillingRecordResponse]) => {
        const paymentRequestsData = paymentRequestResponse.data;
        const cudBillingRecordData = cudBillingRecordResponse.data[0];
        setPaymentRequests(paymentRequestsData);
        setFilteredPaymentRequests(paymentRequestsData);
        setCudBillingRecord(cudBillingRecordData);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList, cudBillingRecordId]);

  if (isLoading) return <LoadingContainer />;

  console.log(paymentRequests);

  //Campos de busqueda para el filtro
  const paymentRequestFieldsToSearch = [
    (r) => r.medioreclamo,
    (r) => r.descripcionreclamo,
    (r) => r.respuestareclamo,
    (r) => r.facturacioncud.nrofactura,
    (r) => r.facturacioncud.pacientes.nombreyapellidopaciente,
    (r) => r.facturacioncud.pacientes.obrasocialpaciente,
    (r) => r.facturacioncud.profesionales.nombreyapellidoprofesional,
  ];

  const paymentRequestsListProps = {
    paymentRequests: filteredPaymentRequests,
    handleDeletePaymentRequest,
    editMode,
    setEditMode,
    cudBillingRecordId,
    cudBillingRecord,
    userProfile,
    userProfessionalId,
    paymentRequestFieldsToSearch,
    setFilteredPaymentRequests,
    records: paymentRequests,
  };

  return <PaymentRequestsList {...paymentRequestsListProps} />;
};
