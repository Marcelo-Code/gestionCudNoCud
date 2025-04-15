import { SearchFilterBar } from "./bars/SearchFilterBar";
import { Box } from "@mui/material";
import { EditionBar } from "./bars/EditionBar";
import "./generalBar.css";
import { ReportBar } from "./bars/reportBar";
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
  } = generalBarProps;

  const searchFilterBarProps = {
    activeBar,
    setActiveBar,
    enableReportBar,
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
  };

  const reportBarProps = {
    activeBar,
    setActiveBar,
    professionalsList,
    enableSearchFilterBar,
  };

  return (
    <Box className="barContainer">
      <Box className="barInner">
        <EditionBar {...editionBarProps} />
        {enableSearchFilterBar && <SearchFilterBar {...searchFilterBarProps} />}
        {enableReportBar && <ReportBar {...reportBarProps} />}
      </Box>
    </Box>
  );
};
