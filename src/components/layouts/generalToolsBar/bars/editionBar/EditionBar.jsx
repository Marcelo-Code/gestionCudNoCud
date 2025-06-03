import { SwitchEditionMode } from "../../../../common/switchEditionMode/SwitchEditionMode";
import { Box, Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import "../generalBar.css";
import { Icons } from "../../../../../assets/Icons";
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
    enableSearchFilterBar,
    disableEditionBarButton,
    tooltipMessage,
  } = editionBarProps;

  return (
    <Box
      className={`editionBar ${
        activeBar === "editionBar" ? "showedEditionBar" : "hiddenEditionBar"
      }`}
    >
      {buttonText && buttonIcon && (
        <Tooltip title={tooltipMessage} placement="top-end" arrow>
          <Button
            component={Link}
            to={disableEditionBarButton ? "#" : to}
            aria-label="fingerprint"
            size="small"
            variant="contained"
            startIcon={buttonIcon}
            disabled={disableEditionBarButton}
          >
            {buttonText}
          </Button>
        </Tooltip>
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
    </Box>
  );
};
