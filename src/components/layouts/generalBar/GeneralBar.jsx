import { SearchFilterBar } from "./bars/SearchFilterBar";
import { Box } from "@mui/material";
import { EditionBar } from "./bars/EditionBar";
import "./generalBar.css";
import { ReportBarContainer } from "./bars/reportBar/ReportBarContainer";
export const GeneralBar = (generalBarProps) => {
  const {
    editMode,
    setEditMode,
    buttonText,
    buttonIcon,
    to,
    activeBar,
    setActiveBar,
    professionalsList = [],
    enableReportBar,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    onsearch,
  } = generalBarProps;

  const searchFilterBarProps = {
    activeBar,
    setActiveBar,
    enableReportBar,
    onsearch,
  };

  const editionBarProps = {
    activeBar,
    setActiveBar,
    buttonText,
    buttonIcon,
    editMode,
    setEditMode,
    to,
    enableReportBar,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
  };

  const reportBarContainerProps = {
    activeBar,
    setActiveBar,
    professionalsList,
    enableSearchFilterBar,
    selectedRecords,
    patient,
    professionals,
  };

  return (
    <Box className="barContainer">
      <Box className="barInner">
        <EditionBar {...editionBarProps} />
        {enableSearchFilterBar && <SearchFilterBar {...searchFilterBarProps} />}
        {enableReportBar && <ReportBarContainer {...reportBarContainerProps} />}
      </Box>
    </Box>
  );
};
