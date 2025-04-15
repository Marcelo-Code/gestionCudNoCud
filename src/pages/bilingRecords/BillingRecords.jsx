import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import { CustomTabsContainer } from "../../components/common/customsTabs/CustomTabsContainer";

export const BillingRecords = (billingRecordsProps) => {
  const { tabs } = billingRecordsProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Facturación:</Box>
      <CustomTabsContainer tabs={tabs} />
    </Box>
  );
};
