import React, { useEffect, useState } from "react";
import { GeneralBar } from "./GeneralBar";
import { Box, Chip } from "@mui/material";

export const GeneralBarContainer = (generalBarContainerProps) => {
  const {
    setReportMode = () => {},
    setEditMode,
    enableReportBar = true,
    enableSearchFilterBar = true,
    disableEditionBarButton = false,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    fieldsToSearch,
    setFilteredRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  } = generalBarContainerProps;

  const [activeBar, setActiveBar] = useState("editionBar");

  // Cada vez que se cambia el activeBar se consulta si está activa la reportBar
  useEffect(() => {
    if (!enableReportBar) return; // No hacer nada si está deshabilitado
    if (activeBar === "reportBar") {
      setReportMode(true);
      setEditMode(false);
    } else {
      setReportMode(false);
    }
  }, [activeBar, setReportMode, setEditMode, enableReportBar]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "all", type: "all" });
  const [sortOption, setSortOption] = useState("none");

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

  const getFilterLabel = (key, value) => {
    if (key === "status") {
      return DEFAULT_STATUS_OPTIONS.find((opt) => opt.value === value)?.label;
    }
    if (key === "type") {
      return DEFAULT_TYPE_OPTIONS.find((opt) => opt.value === value)?.label;
    }
    return value;
  };

  const generalBarProps = {
    ...generalBarContainerProps,
    activeBar,
    setActiveBar,
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
  };

  return (
    <>
      <GeneralBar {...generalBarProps} />
      {/* Chips visibles solo cuando hay filtros activos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
        }}
      >
        {/* Mostrar chips solo si hay filtros activos */}
        {Object.entries(filters).map(
          ([key, value]) =>
            value !== "all" && (
              <Chip
                key={key}
                label={getFilterLabel(key, value)}
                onDelete={() => handleFilterChange(key, "all")}
                color="primary"
                size="small"
                sx={{
                  mt: 1,
                  mb: 1,
                  pl: 1,
                  pr: 1,
                }}
              />
            )
        )}

        {/* Mostrar chip de ordenación solo si se ha seleccionado un orden */}
        {sortOption !== "none" && (
          <Chip
            label={
              DEFAULT_SORT_OPTIONS.find((opt) => opt.value === sortOption)
                ?.label || sortOption
            }
            onDelete={() => handleSortChange({ target: { value: "none" } })}
            color="secondary"
            size="small"
            sx={{
              mt: 1,
              mb: 1,
              pl: 1,
              pr: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};
