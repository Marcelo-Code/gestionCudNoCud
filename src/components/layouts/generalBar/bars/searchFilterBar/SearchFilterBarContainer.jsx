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
    // { value: "all", label: "Todos" },
    // { value: "active", label: "Activos" },
    // { value: "inactive", label: "Inactivos" },
    // { value: "pending", label: "Pendientes" },
  ];

  const DEFAULT_TYPE_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "individual", label: "Individual" },
    // { value: "company", label: "Empresa" },
    // { value: "government", label: "Gobierno" },
  ];

  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "none" },
    { value: "alphabetical-asc", label: "Nombre (A-Z)", name: "full_name" },
    { value: "alphabetical-desc", label: "Nombre (Z-A)", name: "full_name" },
    // { value: "alphabetical-asc", label: "Dirección (A-Z)", name: "address" },
    // { value: "alphabetical-desc", label: "Dirección (Z-A)", name: "address" },
    // { value: "alphabetical-asc", label: "email (A-Z)", name: "email" },
    // { value: "alphabetical-desc", label: "email (Z-A)", name: "email" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (handleSearch) {
      handleSearch(query, fieldsToSearch);
    }
  };

  const handleSearch = (query, fieldsToSearch) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(" ").filter(Boolean);

    const result = records.filter((record) => {
      return keywords.every((word) =>
        fieldsToSearch.some((getField) => {
          const value = (getField(record) || "").toLowerCase();
          return value.includes(word);
        })
      );
    });

    setFilteredRecords(result);
  };

  const searchFilterBarProps = {
    activeBar,
    setActiveBar,
    enableReportBar,

    fieldsToSearch,
    setFilteredRecords,
    records,

    handleSearchChange,
    searchQuery,

    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
  };

  return <SearchFilterBar {...searchFilterBarProps} />;
};
