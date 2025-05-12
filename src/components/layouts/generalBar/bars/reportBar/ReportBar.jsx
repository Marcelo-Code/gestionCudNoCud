import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import "../../generalBar.css";
import { Icons } from "../../../../../assets/Icons";
import { OptionSelect } from "../../../../common/optionSelect/OptionSelect";
import { ExportToWordContainer } from "../exportToWord/ExportToWordContainer";

export const ReportBar = (reportBarProps) => {
  const {
    activeBar,
    setActiveBar,
    professionalsList,
    signatureData,
    enableSearchFilterBar,
    selectedRecords,
    patient,
    handleChange,
    professional,
    signature,
    formData,
  } = reportBarProps;

  const exportToWordContainerProps = {
    selectedRecords,
    patient,
    professional,
    signature,
  };

  return (
    <Box
      className={`reportBar ${
        activeBar === "reportBar" ? "showedReportBar" : "hiddenReportBar"
      }`}
    >
      <Box
        sx={{
          width: "45%",
          maxWidth: "250px",
          minWidth: "120px",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icons.PersonIcon />
        <OptionSelect
          getOptionLabel={(option) => `${option.nombreyapellidoprofesional}`}
          name="idprofesional"
          placeholder={"Selecc. profesional"}
          clients={professionalsList}
          value={formData.idprofesional}
          onChange={handleChange}
          label={"Profesional"}
        />
      </Box>

      <Box
        sx={{
          width: "45%",
          maxWidth: "250px",
          minWidth: "120px",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icons.PersonIcon />
        <OptionSelect
          getOptionLabel={(option) => `${option.name}`}
          name="signatureDataId"
          placeholder={"Selecc. firma"}
          clients={signatureData}
          value={formData.signatureDataId}
          onChange={handleChange}
          label={"Firma"}
        />
      </Box>

      {/* <Box sx={{ width: "45%", maxWidth: "250px", minWidth: "120px" }}>
        <OptionSelect
          getOptionLabel={(option) => `${option.name}`}
          label={"Reunion"}
          //Pasa el array de reuniones por orden alfabetico
          clients={meetings.sort((a, b) => a.name.localeCompare(b.name))}
          placeholder={"Selecc. reunión"}
        />
      </Box> */}

      <ExportToWordContainer {...exportToWordContainerProps} />

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
