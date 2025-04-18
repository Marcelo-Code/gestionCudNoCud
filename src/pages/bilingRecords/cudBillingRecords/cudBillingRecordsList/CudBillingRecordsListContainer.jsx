import { useState } from "react";
import { CudBillingRecordsList } from "./CudBillingRecordsList";

export const CudBillingRecordsListContainer = (
  cudBillingRecordsListContainerProps
) => {
  const {
    cudBillingRecords,
    handleDeleteCudBillingRecord,
    patientId,
    professionalId,
    patient,
    professional,
  } = cudBillingRecordsListContainerProps;

  const [editMode, setEditMode] = useState(false);

  const totalProfesional = cudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.montofinalprofesional);
  }, 0);
  const totalRetencion = cudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.retencion);
  }, 0);
  const totalMontoPercibido = cudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.montopercibido);
  }, 0);
  const totalMontoFacturado = cudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.montofacturado);
  }, 0);

  const cudBillingRecordsListProps = {
    cudBillingRecords,
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
  };

  return <CudBillingRecordsList {...cudBillingRecordsListProps} />;
};
