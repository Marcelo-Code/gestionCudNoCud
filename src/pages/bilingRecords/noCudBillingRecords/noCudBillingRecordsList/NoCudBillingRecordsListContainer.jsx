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
  };

  return <NoCudBillingRecordsList {...noCudBillingRecordsListProps} />;
};
