import { useContext, useState } from "react";
import { CudBillingRecordsList } from "./CudBillingRecordsList";
import { GeneralContext } from "../../../../context/GeneralContext";

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
    paymentRequests,
    cudBillingRecordsfieldsToSearch,
    setFilteredCudBillingRecords,
    records,
  } = cudBillingRecordsListContainerProps;

  const [editMode, setEditMode] = useState(false);

  const { userProfessionalId, userProfile } = useContext(GeneralContext);

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

  //Define los campos a ordenar en el menú de filtros
  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    {
      value: "alphabetical-asc-paciente",
      label: "Paciente (A-Z)",
      name: "pacientes.nombreyapellidopaciente",
    },
    {
      value: "alphabetical-desc-paciente",
      label: "Paciente (Z-A)",
      name: "pacientes.nombreyapellidopaciente",
    },
    {
      value: "alphabetical-asc-profesional",
      label: "Profesional (A-Z)",
      name: "profesionales.nombreyapellidoprofesional",
    },
    {
      value: "alphabetical-desc-profesional",
      label: "Profesional (Z-A)",
      name: "profesionales.nombreyapellidoprofesional",
    },
    {
      value: "alphabetical-asc-prestacion",
      label: "Prestación (A-Z)",
      name: "prestacion",
    },
    {
      value: "alphabetical-desc-prestacion",
      label: "Prestación (Z-A)",
      name: "profesionales.prestacion",
    },
    {
      value: "alphabetical-asc-obrasocialpaciente",
      label: "Obra social (A-Z)",
      name: "pacientes.obrasocialpaciente",
    },
    {
      value: "alphabetical-desc-obrasocialpaciente",
      label: "Obra social (Z-A)",
      name: "pacientes.obrasocialpaciente",
    },
    {
      value: "date-desc",
      label: "Período facturado (más recientes)",
      name: "periodofacturado",
    },
    {
      value: "date-asc",
      label: "Período facturado (más antiguos)",
      name: "periodofacturado",
    },
  ];

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
    paymentRequests,
    userProfessionalId,
    userProfile,
    cudBillingRecordsfieldsToSearch,
    setFilteredCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  };

  return <CudBillingRecordsList {...cudBillingRecordsListProps} />;
};
