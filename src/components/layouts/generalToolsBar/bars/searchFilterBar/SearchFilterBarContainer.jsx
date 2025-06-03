import { SearchFilterBar } from "./SearchFilterBar";

export const SearchFilterBarContainer = ({
  activeBar = "editionBar",
  setActiveBar,
  searchQuery,
  handleSearchChange,
  filters,
  handleFilterChange,
  sortOption,
  handleSortChange,
  enableEditionBar,
  FILTER_CONFIGS,
  DEFAULT_TYPE_OPTIONS = [],
  SORT_OPTIONS = [],
}) => {
  const searhFilterBarProps = {
    activeBar,
    setActiveBar,
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    sortOption,
    handleSortChange,
    enableEditionBar,
    FILTER_CONFIGS,
    DEFAULT_TYPE_OPTIONS,
    SORT_OPTIONS,
  };
  return <SearchFilterBar {...searhFilterBarProps} />;
};
