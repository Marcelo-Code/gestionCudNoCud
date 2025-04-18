import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import "../generalBar.css";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { ExportToWordContainer } from "./exportToWord/ExportToWordContainer";
import { useState } from "react";

export const ReportBar = (reportBarProps) => {
  const {
    activeBar,
    setActiveBar,
    professionalsList,
    enableSearchFilterBar,
    selectedRecords,
    patient,
    professionals,
  } = reportBarProps;

  const [professional, setProfessional] = useState({});
  const [formData, setFormData] = useState({});

  console.log(professionalsList);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "idprofesional")
      setProfessional(
        professionalsList.find((professional) => professional.id === value)
      );

    console.log(professional);

    setFormData({ ...formData, [name]: value });

    if (name === "professional")
      setProfessional(
        professionals.find((professional) => professional.id === value)
      );

    console.log(name, value);
  };

  const exportToWordContainerProps = {
    selectedRecords,
    patient,
    professional,
    enableReportButton: true,
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
