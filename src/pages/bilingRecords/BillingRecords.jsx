import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import { CustomTabsContainer } from "../../components/common/customsTabs/CustomTabsContainer";

export const BillingRecords = (billingRecordsProps) => {
  const { patientId, professionalId, professional, patient, tabs } =
    billingRecordsProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {professionalId &&
          `Facturación profesional ${professional?.nombreyapellidoprofesional}`}
        {patientId &&
          `Facturación paciente ${patient?.nombreyapellidopaciente}`}
        {!professionalId && !patientId && "Facturación"}
      </Box>
      <CustomTabsContainer tabs={tabs} />
    </Box>
  );
};
