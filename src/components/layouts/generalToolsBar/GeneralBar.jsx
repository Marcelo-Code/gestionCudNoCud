import { Box } from "@mui/material";
import "./generalBar.css";
import { SearchFilterBarContainer } from "./bars/searchFilterBar/SearchFilterBarContainer";
import { EditionBar } from "../generalBar/bars/EditionBar";
export const GeneralBar = (generalBarProps) => {
  const {
    editMode,
    setEditMode,
    buttonText,
    buttonIcon,
    to,
    activeBar,
    setActiveBar,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
    setFilteredRecords,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    FILTER_CONFIGS,
  } = generalBarProps;

  const searchFilterBarContainerProps = {
    activeBar,
    setActiveBar,
    setFilteredRecords,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    SORT_OPTIONS,
    FILTER_CONFIGS,
  };

  const editionBarProps = {
    activeBar,
    setActiveBar,
    buttonText,
    buttonIcon,
    editMode,
    setEditMode,
    to,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
  };

  return (
    <Box className="barContainer">
      <Box className="barInner">
        <EditionBar {...editionBarProps} />
        {enableSearchFilterBar && (
          <SearchFilterBarContainer {...searchFilterBarContainerProps} />
        )}
      </Box>
    </Box>
  );
};
