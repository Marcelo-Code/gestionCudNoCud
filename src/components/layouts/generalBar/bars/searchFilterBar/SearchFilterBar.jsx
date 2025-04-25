import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useState } from "react";
import "../../generalBar.css";
import { Icons } from "../../../../../assets/Icons";

export const SearchFilterBar = ({
  activeBar,
  setActiveBar,
  enableReportBar,

  handleSearchChange,
  searchQuery,

  filters,
  handleFilterChange,
  sortOption,
  handleSortChange,

  DEFAULT_STATUS_OPTIONS,
  DEFAULT_TYPE_OPTIONS,
  DEFAULT_SORT_OPTIONS,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        className={`searchBar ${
          activeBar === "searchBar" ? "showedSearchBar" : "hiddenSearchBar"
        }`}
      >
        <TextField
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            maxWidth: "250px",
            width: "50%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Filtros" placement="top-end" arrow>
          <IconButton onClick={() => setDrawerOpen(true)} size="small">
            <FilterIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Barra edición" placement="top-end" arrow>
          <IconButton onClick={() => setActiveBar("editionBar")} size="small">
            <EditIcon />
          </IconButton>
        </Tooltip>

        {enableReportBar && (
          <Tooltip title="Barra reporte" placement="top-end" arrow>
            <IconButton onClick={() => setActiveBar("reportBar")} size="small">
              <Icons.DescriptionIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "aqua",
            color: "white",
          },
        }}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "horndon",
              textAlign: "center",
              marginTop: 2,
              textShadow: "0 0 20px black",
            }}
          >
            Filtros
          </Typography>

          {DEFAULT_STATUS_OPTIONS.length > 0 && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                {DEFAULT_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {DEFAULT_TYPE_OPTIONS.length > 0 && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="type-label">Tipo de cliente</InputLabel>
              <Select
                labelId="type-label"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                {DEFAULT_TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "white",
                  margin: "10px",
                }}
              >
                <SortIcon fontSize="small" /> Ordenar por
              </Typography>

              <RadioGroup value={sortOption} onChange={handleSortChange}>
                {DEFAULT_SORT_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
              }}
              fullWidth
              onClick={() => setDrawerOpen(false)}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
