import React, { useState } from "react";
import { SearchFilterBar } from "./SearchFilterBar";

export const SearchFilterBarContainer = ({
  activeBar = "editionBar",
  setActiveBar,
  enableReportBar,
  fieldsToSearch,
  setFilteredRecords,
  records,
  DEFAULT_SORT_OPTIONS,
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

    if (newSort !== "none") {
      const sortConfig = DEFAULT_SORT_OPTIONS.find(
        (opt) => opt.value === newSort
      );
      if (sortConfig) {
        const [type, direction] = newSort.split("-");

        const fieldPath = sortConfig.name.split("."); // ej: ["pacientes", "nombreyapellidopaciente"]

        const getValue = (obj, path) =>
          path.reduce(
            (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
            obj
          );

        result = [...result].sort((a, b) => {
          const aValue = getValue(a, fieldPath);
          const bValue = getValue(b, fieldPath);

          if (type === "alphabetical") {
            return direction === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }

          if (type === "date") {
            return direction === "asc"
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
          }

          return 0;
        });
      }
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
