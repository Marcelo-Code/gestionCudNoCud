import { SearchFilterBar } from "./SearchFilterBar";

export const SearchFilterBarContainer = ({
  activeBar = "editionBar",
  setActiveBar,
  enableReportBar,

  searchQuery,
  handleSearchChange,
  filters,
  handleFilterChange,
  sortOption,
  handleSortChange,
  DEFAULT_STATUS_OPTIONS,
  DEFAULT_TYPE_OPTIONS,
  DEFAULT_SORT_OPTIONS,
}) => {
  return (
    <SearchFilterBar
      activeBar={activeBar}
      setActiveBar={setActiveBar}
      enableReportBar={enableReportBar}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      filters={filters}
      handleFilterChange={handleFilterChange}
      sortOption={sortOption}
      handleSortChange={handleSortChange}
      DEFAULT_STATUS_OPTIONS={DEFAULT_STATUS_OPTIONS}
      DEFAULT_TYPE_OPTIONS={DEFAULT_TYPE_OPTIONS}
      DEFAULT_SORT_OPTIONS={DEFAULT_SORT_OPTIONS}
    />
  );
};
