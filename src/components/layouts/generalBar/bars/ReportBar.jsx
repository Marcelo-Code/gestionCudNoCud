import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import "../generalBar.css";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { meetings } from "../../../../data/documentsData";

export const ReportBar = (reportBarProps) => {
  const { activeBar, setActiveBar, professionalsList, enableSearchFilterBar } =
    reportBarProps;
  return (
    <Box
      className={`reportBar ${
        activeBar === "reportBar" ? "showedReportBar" : "hiddenReportBar"
      }`}
    >
      <Box sx={{ width: "45%", maxWidth: "250px", minWidth: "120px" }}>
        <OptionSelect
          getOptionLabel={(option) => `${option.name}`}
          label={"Profesional"}
          clients={professionalsList}
          placeholder={"Selecc. profesional"}
        />
      </Box>
      <Box sx={{ width: "45%", maxWidth: "250px", minWidth: "120px" }}>
        <OptionSelect
          getOptionLabel={(option) => `${option.name}`}
          label={"Reunion"}
          //Pasa el array de reuniones por orden alfabetico
          clients={meetings.sort((a, b) => a.name.localeCompare(b.name))}
          placeholder={"Selecc. reunión"}
        />
      </Box>
      <Button startIcon={<Icons.AddIcon />} size="small" variant="contained">
        Informe
      </Button>

      {/* acceso a barra de edición */}
      <Tooltip title="Barra edición" placement="top-end" arrow>
        <IconButton onClick={() => setActiveBar("editionBar")} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* acceso a barra de búsqueda */}
      {enableSearchFilterBar && (
        <Tooltip title="Barra búsqueda" placement="top-end" arrow>
          <IconButton onClick={() => setActiveBar("searchBar")} size="small">
            <Icons.SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
