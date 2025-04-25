import { useContext, useState } from "react";
import { NoCudBillingRecordsList } from "./NoCudBillingRecordsList";
import { GeneralContext } from "../../../../context/GeneralContext";

export const NoCudBillingRecordsListContainer = (
  noCudBillingRecordsListContainerProps
) => {
  const {
    noCudBillingRecords,
    handleDeleteNoCudBillingRecord,
    patientId,
    professionalId,
    patient,
    professional,
    noCudBillingRecordsfieldsToSearch,
    setFilteredNoCudBillingRecords,
    records,
  } = noCudBillingRecordsListContainerProps;

  const [editMode, setEditMode] = useState(false);

  const { userProfessionalId, userProfile } = useContext(GeneralContext);

  const totalMontoSesion = noCudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.montosesion);
  }, 0);
  const totalRetencion = noCudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.retencion);
  }, 0);
  const totalProfesional = noCudBillingRecords.reduce((acc, record) => {
    return acc + Number.parseFloat(record.montofinalprofesional);
  }, 0);

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
      value: "date-desc-fechasesion",
      label: "⬇️ Fecha sesión",
      name: "fechasesion",
    },
    {
      value: "date-asc-fechasesion",
      label: "⬆️ Fecha sesión",
      name: "fechasesion",
    },
    {
      value: "date-desc-fechapago",
      label: "⬇️ Fecha pago",
      name: "fechadepago",
    },
    {
      value: "date-asc-fechapago",
      label: "⬆️ Fecha pago",
      name: "fechadepago",
    },
  ];

  const noCudBillingRecordsListProps = {
    noCudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
    totalMontoSesion,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    professional,
    userProfessionalId,
    userProfile,
    noCudBillingRecordsfieldsToSearch,
    setFilteredNoCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  };

  return <NoCudBillingRecordsList {...noCudBillingRecordsListProps} />;
};
