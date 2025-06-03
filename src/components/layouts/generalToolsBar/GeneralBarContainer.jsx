import { useState } from "react";
import { GeneralBar } from "./GeneralBar";
import { ChipsBarContainer } from "./bars/chipsBar/ChipsBarContainer";

// Función genérica para filtrar propiedades anidadas, incluyendo arrays
function deepMatch(record, pathArray, value) {
  if (!record) return false;

  const key = pathArray[0];
  const restPath = pathArray.slice(1);

  const currentVal = record[key];

  if (currentVal === undefined) return false;

  if (restPath.length === 0) {
    // En el último nivel, si es array, chequeo si alguno coincide
    if (Array.isArray(currentVal)) {
      return currentVal.some((item) => item === value);
    }
    return currentVal == value;
  }

  if (Array.isArray(currentVal)) {
    // Si es array, busco recursivamente en cada elemento
    return currentVal.some((item) => deepMatch(item, restPath, value));
  }

  // Si es objeto, sigo bajando
  return deepMatch(currentVal, restPath, value);
}

export const GeneralBarContainer = (generalBarContainerProps) => {
  const {
    enableSearchFilterBar = true,
    disableEditionBarButton = false,
    enableEditionBar = true,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
    FIELDS_TO_SEARCH,
    setFilteredRecords,
    records,
    SORT_OPTIONS,
    FILTER_OPTIONS = [],
    initialActiveBar = "editionBar",
  } = generalBarContainerProps;

  const [activeBar, setActiveBar] = useState(initialActiveBar);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("none");

  // Construir configs para filtros con valor actual o "all"
  const FILTER_CONFIGS = FILTER_OPTIONS.map((options) => ({
    ...options,
    value: filters[options.name] || "all",
  }));

  const applyFiltersAndSort = (
    query = searchQuery,
    newFilters = filters,
    newSort = sortOption
  ) => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(" ").filter(Boolean);

    let result = records.filter((record) => {
      // Filtrado por búsqueda
      const matchesSearch = keywords.every((word) =>
        FIELDS_TO_SEARCH.some((getField) =>
          (getField(record) || "").toLowerCase().includes(word)
        )
      );

      // Filtrado por filtros seleccionados
      const matchesAllFilters = Object.entries(newFilters).every(
        ([key, value]) => {
          if (value === "all") return true;

          const path = key.split(".");
          return deepMatch(record, path, value);
        }
      );

      return matchesSearch && matchesAllFilters;
    });

    // Ordenar resultado si se seleccionó opción distinta a "none"
    if (newSort !== "none") {
      const sortConfig = SORT_OPTIONS.find((opt) => opt.value === newSort);
      if (sortConfig) {
        const [type, direction] = newSort.split("-");
        const fieldPath = sortConfig.name.split(".");

        const getValue = (obj, path) =>
          path.reduce(
            (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
            obj
          );

        result = [...result].sort((a, b) => {
          const aValue = getValue(a, fieldPath);
          const bValue = getValue(b, fieldPath);

          if (aValue === "" || aValue == null) return 1;
          if (bValue === "" || bValue == null) return -1;

          if (type === "alphabetical") {
            return direction === "asc"
              ? String(aValue).localeCompare(String(bValue))
              : String(bValue).localeCompare(String(aValue));
          }

          if (type === "date") {
            return direction === "asc"
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
          }

          if (type === "number") {
            const numA = Number(aValue);
            const numB = Number(bValue);
            if (isNaN(numA)) return 1;
            if (isNaN(numB)) return -1;
            return direction === "asc" ? numA - numB : numB - numA;
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
    const config = FILTER_CONFIGS.find((f) => f.name === key);
    return config?.options?.find((opt) => opt.value === value)?.label || value;
  };

  const generalBarProps = {
    ...generalBarContainerProps,
    activeBar,
    setActiveBar,
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
    selectedRecords,
    patient,
    professionals,
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

  const chipsBarContainerProps = {
    filters,
    handleFilterChange,
    handleSortChange,
    sortOption,
    getFilterLabel,
    SORT_OPTIONS,
  };

  return (
    <>
      <GeneralBar {...generalBarProps} />
      <ChipsBarContainer {...chipsBarContainerProps} />
    </>
  );
};
