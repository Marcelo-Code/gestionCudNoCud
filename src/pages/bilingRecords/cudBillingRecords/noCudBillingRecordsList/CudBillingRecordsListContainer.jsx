import { CudBillingRecordsList } from "./CudBillingRecordsList";

export const CudBillingRecordsListContainer = (
  CudBillingRecordsListContainerProps
) => {
  const {
    cudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteCudBillingRecord,
  } = CudBillingRecordsListContainerProps;

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
  };

  return <CudBillingRecordsList {...cudBillingRecordsListProps} />;
};
