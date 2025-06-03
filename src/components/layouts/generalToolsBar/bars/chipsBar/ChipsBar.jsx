import { Box, Chip } from "@mui/material";
import {
  generalBackgroundColor,
  generalColor,
} from "../../../../../utils/helpers";

export const ChipsBar = (chipsBarProps) => {
  const {
    filters,
    handleFilterChange,
    handleSortChange,
    sortOption,
    getFilterLabel,
    SORT_OPTIONS,
  } = chipsBarProps;
  return (
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
                backgroundColor: generalBackgroundColor,
                color: generalColor,
              }}
            />
          )
      )}

      {/* Mostrar chip de ordenación solo si se ha seleccionado un orden */}
      {sortOption !== "none" && (
        <Chip
          label={
            SORT_OPTIONS.find((opt) => opt.value === sortOption)?.label ||
            sortOption
          }
          onDelete={() => handleSortChange({ target: { value: "none" } })}
          color="primary"
          size="small"
          sx={{
            mt: 1,
            mb: 1,
            pl: 1,
            pr: 1,
            backgroundColor: "black",
          }}
        />
      )}
    </Box>
  );
};
