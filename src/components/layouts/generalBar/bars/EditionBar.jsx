import React from "react";
import { SwitchEditionMode } from "../../../common/switchEditionMode/SwitchEditionMode";
import { Link } from "react-router-dom";
import { Box, Button, Tooltip } from "@mui/material";
import "../generalBar.css";
import { Icons } from "../../../../assets/Icons";
import { IconButton } from "@mui/material";

export const EditionBar = (editionBarProps) => {
  const {
    activeBar = "editionBar",
    setActiveBar,
    buttonText,
    buttonIcon,
    editMode,
    setEditMode,
    to,
    enableReportBar,
    enableSearchFilterBar,
  } = editionBarProps;

  return (
    <Box
      className={`editionBar ${
        activeBar === "editionBar" ? "showedEditionBar" : "hiddenEditionBar"
      }`}
    >
      {buttonText && buttonIcon && (
        <Link to={to}>
          <Button
            aria-label="fingerprint"
            size="small"
            variant="contained"
            startIcon={buttonIcon}
          >
            {buttonText}
          </Button>
        </Link>
      )}
      <Box
        style={{
          fontFamily: "Arial",
          fontSize: "1.1em",
          color: "gray",
        }}
      >
        Edición
        <Tooltip
          title={editMode ? "Desactivar edición" : "Activar edición"}
          placement="top-end"
          arrow
        >
          <SwitchEditionMode
            checked={editMode}
            onChange={() => setEditMode((prev) => !prev)}
            sx={{ transform: "scale(1.2)" }}
          />
        </Tooltip>
      </Box>

      {/* acceso a barra de búsqueda */}

      {enableSearchFilterBar && (
        <Tooltip title="Barra búsqueda" placement="top-end" arrow>
          <IconButton onClick={() => setActiveBar("searchBar")} size="small">
            <Icons.SearchIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* acceso a barra de reportes */}

      {enableReportBar && (
        <Tooltip title="Barra reporte" placement="top-end" arrow>
          <IconButton onClick={() => setActiveBar("reportBar")} size="small">
            <Icons.DescriptionIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
