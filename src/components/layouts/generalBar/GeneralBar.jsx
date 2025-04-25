import { Box } from "@mui/material";
import { EditionBar } from "./bars/EditionBar";
import "./generalBar.css";
import { ReportBarContainer } from "./bars/reportBar/ReportBarContainer";
import { SearchFilterBarContainer } from "./bars/searchFilterBar/SearchFilterBarContainer";
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
    fieldsToSearch,
    setFilteredRecords,
    records,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
  } = generalBarProps;

  const searchFilterBarContainerProps = {
    activeBar,
    setActiveBar,
    enableReportBar,
    fieldsToSearch,
    setFilteredRecords,
    records,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
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
        {enableSearchFilterBar && (
          <SearchFilterBarContainer {...searchFilterBarContainerProps} />
        )}
        {enableReportBar && <ReportBarContainer {...reportBarContainerProps} />}
      </Box>
    </Box>
  );
};
