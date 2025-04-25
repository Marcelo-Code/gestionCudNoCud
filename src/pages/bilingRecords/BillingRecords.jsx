import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import { CustomTabsContainer } from "../../components/common/customsTabs/CustomTabsContainer";

export const BillingRecords = (billingRecordsProps) => {
  const { patientId, professionalId, professional, patient, tabs } =
    billingRecordsProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {`Facturación${
          professionalId
            ? ` profesional ${professional.nombreyapellidoprofesional}`
            : " "
        } ${patientId && professionalId ? "y" : ""}${
          patientId ? ` paciente ${patient.nombreyapellidopaciente}` : ""
        }`}
      </Box>
      <CustomTabsContainer tabs={tabs} />
    </Box>
  );
};
