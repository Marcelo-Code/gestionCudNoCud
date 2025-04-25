import React, { useState } from "react";
import { SearchFilterBar } from "./SearchFilterBar";

export const SearchFilterBarContainer = ({
  activeBar = "editionBar",
  setActiveBar,
  enableReportBar,
  fieldsToSearch,
  setFilteredRecords,
  records,
}) => {
  const DEFAULT_STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Activos" },
    { value: "inactive", label: "Inactivos" },
  ];

  const DEFAULT_TYPE_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "individual", label: "Individual" },
    { value: "company", label: "Empresa" },
  ];

  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    { value: "alphabetical-asc", label: "Nombre (A-Z)", name: "full_name" },
    { value: "alphabetical-desc", label: "Nombre (Z-A)", name: "full_name" },
    { value: "date-desc", label: "Más reciente", name: "fechaconsulta" },
    { value: "date-asc", label: "Más antiguo", name: "fechaconsulta" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "all", type: "all" });
  const [sortOption, setSortOption] = useState("none");

  const applyFiltersAndSort = (
    query = searchQuery,
    newFilters = filters,
    newSort = sortOption
  ) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(" ").filter(Boolean);

    let result = records.filter((record) => {
      const matchesSearch = keywords.every((word) =>
        fieldsToSearch.some((getField) =>
          (getField(record) || "").toLowerCase().includes(word)
        )
      );

      const matchesStatus =
        newFilters.status === "all" || record.status === newFilters.status;

      const matchesType =
        newFilters.type === "all" || record.type === newFilters.type;

      return matchesSearch && matchesStatus && matchesType;
    });

    const selectedSort = DEFAULT_SORT_OPTIONS.find(
      (opt) => opt.value === newSort
    );
    if (selectedSort && selectedSort.value !== "none") {
      result = [...result].sort((a, b) => {
        const aValue = a[selectedSort.name];
        const bValue = b[selectedSort.name];

        if (selectedSort.value.includes("alphabetical")) {
          return selectedSort.value.includes("asc")
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (selectedSort.value.includes("date")) {
          return selectedSort.value.includes("asc")
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        return 0;
      });
    }

    setFilteredRecords(result);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFiltersAndSort(query, filters, sortOption);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFiltersAndSort(searchQuery, newFilters, sortOption);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    applyFiltersAndSort(searchQuery, filters, newSort);
  };

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
