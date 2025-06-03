import { useContext, useEffect, useState } from "react";
import { NoCudBillingRecordsList } from "./NoCudBillingRecordsList";
import { GeneralContext } from "../../../../context/GeneralContext";

export const NoCudBillingRecordsListContainer = (
  noCudBillingRecordsListContainerProps
) => {
  const {
    patientId,
    professionalId,
    handleDeleteNoCudBillingRecord,
    patient,

    setFilteredRecords,
    records,
    filteredNoCudBillingRecords,
  } = noCudBillingRecordsListContainerProps;

  const [editMode, setEditMode] = useState(false);

  const { userProfessionalId, userProfile } = useContext(GeneralContext);

  const [totalMontoSesion, setTotalMontoSesion] = useState(0);
  const [totalRetencion, setTotalRetencion] = useState(0);
  const [totalProfesional, setTotalProfesional] = useState(0);

  useEffect(() => {
    const totalMontoSesion = filteredNoCudBillingRecords.reduce(
      (acc, record) => {
        return acc + Number.parseFloat(record.montosesion);
      },
      0
    );
    const totalRetencion = filteredNoCudBillingRecords.reduce((acc, record) => {
      if (!record.documentocomprobantepagoretencion) {
        return acc + Number.parseFloat(record.retencion);
      }
      return acc;
    }, 0);
    const totalProfesional = filteredNoCudBillingRecords.reduce(
      (acc, record) => {
        return acc + Number.parseFloat(record.montofinalprofesional);
      },
      0
    );
    setTotalMontoSesion(totalMontoSesion);
    setTotalRetencion(totalRetencion);
    setTotalProfesional(totalProfesional);
  }, [filteredNoCudBillingRecords]);

  const noCudBillingRecordsListProps = {
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
    totalMontoSesion,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    userProfessionalId,
    userProfile,
    records,
    setFilteredRecords,
    filteredNoCudBillingRecords,
  };

  return <NoCudBillingRecordsList {...noCudBillingRecordsListProps} />;
};
