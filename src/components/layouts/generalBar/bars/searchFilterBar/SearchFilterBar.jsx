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
  FormLabel,
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
import "../../generalBar.css";
import { Icons } from "../../../../../assets/Icons";

export const SearchFilterBar = ({
  darkMode,
  darkColor,
  lightColor,
  buttonColor,

  setDrawerOpen,
  drawerOpen,
  sortOption,
  handleSortChange,

  filters,
  handleFilterChange,

  activeBar,
  setActiveBar,
  enableReportBar,

  handleSearchChange,
  searchQuery,

  DEFAULT_STATUS_OPTIONS,
  DEFAULT_TYPE_OPTIONS,
  DEFAULT_SORT_OPTIONS,
}) => {
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

        {/* acceso a panel de filtros */}
        <Tooltip title="Filtros" placement="top-end" arrow>
          <IconButton
            sx={{ color: darkMode ? "white" : buttonColor }}
            onClick={() => setDrawerOpen(true)}
            size="small"
          >
            <FilterIcon />
          </IconButton>
        </Tooltip>

        {/* acceso barra de edición */}
        <Tooltip title="Barra edición" placement="top-end" arrow>
          <IconButton
            onClick={() => setActiveBar("editionBar")}
            sx={{ color: darkMode ? "white" : buttonColor }}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        {/* acceso a barra de reporte */}
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
            backgroundColor: darkMode ? darkColor : lightColor,
          },
        }}
      >
        <Box sx={{ width: 300, p: 3, color: "white" }}>
          <Typography
            className="filterTitle"
            sx={{
              fontFamily: "horndon",
              textAlign: "center",
              marginTop: 2,
              textShadow: "0 0 20px black",
            }}
            variant="h4"
            gutterBottom
          >
            Filtros
          </Typography>

          <Box sx={{ mt: 3 }}>
            {DEFAULT_STATUS_OPTIONS.length > 0 && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={filters.status || ""}
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
                  id="type"
                  value={filters.type || ""}
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

            {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.active || false}
                    onChange={(e) =>
                      handleFilterChange("active", e.target.checked)
                    }
                  />
                }
                label="Solo mostrar clientes activos"
                sx={{ mb: 3 }}
              /> */}

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
                      name={option.name}
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
          </Box>

          <Box sx={{ display: "flex", mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: darkMode ? "white" : buttonColor,
                borderColor: darkMode ? "white" : buttonColor,
                backgroundColor: darkMode ? darkColor : "white",
              }}
              fullWidth
              onClick={() => setDrawerOpen(false)}
            >
              Cerrar
            </Button>
            {/* <Button
                variant="contained"
                onClick={() => toggleDrawer(false)}
                sx={{ ml: 1 }}
                fullWidth
              >
                Aplicar
              </Button> */}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

// SearchFilter.propTypes = {
//   toggleSearchBar: PropTypes.func.isRequired,
//   handleSearchChange: PropTypes.func.isRequired,
//   searchQuery: PropTypes.string.isRequired,
//   toggleDrawer: PropTypes.func.isRequired,
//   drawerOpen: PropTypes.bool.isRequired,
//   filters: PropTypes.object.isRequired,
//   safeStatusOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   handleFilterChange: PropTypes.func.isRequired,
//   safeTypeOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   sortOption: PropTypes.string.isRequired,
//   handleSortChange: PropTypes.func.isRequired,
//   safeSortOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   darkMode: PropTypes.bool,
//   darkColor: PropTypes.string,
//   style: PropTypes.object,
// };
