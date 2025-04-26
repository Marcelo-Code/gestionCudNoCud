import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Drawer,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Icons } from "../../../../../assets/Icons";
import "../../generalBar.css";

export const SearchFilterBar = ({
  activeBar,
  setActiveBar,
  enableReportBar,
  handleSearchChange,
  searchQuery,
  sortOption,
  handleSortChange,
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
          }}
        >
          <Tooltip title="Cerrar" placement="top-start" arrow>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Icons.CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: "broughton",
              textAlign: "center",
              color: "black",
              borderBottom: "1px solid white",
              paddingBottom: "10px",
            }}
          >
            Filtros
          </Typography>

          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography sx={{ color: "black", mb: 1 }}>Estado</Typography>
            <RadioGroup
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              {DEFAULT_STATUS_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio sx={{ color: "black" }} />}
                  label={option.label}
                  sx={{ color: "black" }}
                />
              ))}
            </RadioGroup>
          </FormControl> */}

          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography sx={{ color: "black", mb: 1 }}>
              Tipo de cliente
            </Typography>
            <RadioGroup
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              {DEFAULT_TYPE_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio sx={{ color: "black" }} />}
                  label={option.label}
                  sx={{ color: "black" }}
                />
              ))}
            </RadioGroup>
          </FormControl> */}

          <FormControl fullWidth>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "black",
                margin: "10px 0",
              }}
            >
              <SortIcon fontSize="small" /> Ordenar por
            </Typography>

            <RadioGroup value={sortOption} onChange={handleSortChange}>
              {DEFAULT_SORT_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  sx={{ color: "black" }}
                  control={
                    <Radio
                      sx={{
                        color: "black",
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
      </Drawer>
    </>
  );
};
