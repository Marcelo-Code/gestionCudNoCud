import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CudBillingRecordsList } from "./CudBillingRecordList";

export const CudBillingRecordsListContainer = (
  cudBillingRecordsListContainerProps
) => {
  const {
    patientId,
    professionalId,
    handleDeleteCudBillingRecord,
    patient,
    professional,
    paymentRequests,
    setFilteredRecords,
    records,
    filteredCudBillingRecords,
  } = cudBillingRecordsListContainerProps;

  const [editMode, setEditMode] = useState(false);

  const { userProfessionalId, userProfile } = useContext(GeneralContext);

  const [totalProfesional, setTotalProfesional] = useState(0);
  const [totalRetencion, setTotalRetencion] = useState(0);
  const [totalMontoPercibido, setTotalMontoPercibido] = useState(0);
  const [totalMontoFacturado, setTotalMontoFacturado] = useState(0);

  useEffect(() => {
    const totalProfesional = filteredCudBillingRecords.reduce((acc, record) => {
      return acc + Number.parseFloat(record.montofinalprofesional);
    }, 0);
    const totalRetencion = filteredCudBillingRecords.reduce((acc, record) => {
      if (!record.documentocomprobantepagoretencion) {
        return acc + Number.parseFloat(record.retencion);
      }
      return acc;
    }, 0);
    const totalMontoPercibido = filteredCudBillingRecords.reduce(
      (acc, record) => {
        return acc + Number.parseFloat(record.montopercibido);
      },
      0
    );
    const totalMontoFacturado = filteredCudBillingRecords.reduce(
      (acc, record) => {
        return acc + Number.parseFloat(record.montofacturado);
      },
      0
    );
    setTotalProfesional(totalProfesional);
    setTotalRetencion(totalRetencion);
    setTotalMontoPercibido(totalMontoPercibido);
    setTotalMontoFacturado(totalMontoFacturado);
  }, [filteredCudBillingRecords]);

  const cudBillingRecordsListProps = {
    editMode,
    setEditMode,
    handleDeleteCudBillingRecord,
    totalProfesional,
    totalRetencion,
    totalMontoPercibido,
    totalMontoFacturado,
    patientId,
    professionalId,
    patient,
    professional,
    paymentRequests,
    userProfessionalId,
    userProfile,
    setFilteredRecords,
    records,
    filteredCudBillingRecords,
  };

  return <CudBillingRecordsList {...cudBillingRecordsListProps} />;
};
