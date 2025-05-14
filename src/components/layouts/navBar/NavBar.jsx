import { Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";

import "./navBar.css";
import { Link } from "react-router-dom";
import { AlertsContainer } from "../../../pages/alerts/AlertsContainer";

export const NavBar = (navBarProps) => {
  const { showLogo } = navBarProps;

  return (
    <Box>
      <Box className="navBarContainer">
        <BurguerMenuContainer />
        {showLogo && (
          <Box className="navBarLogo">
            <Tooltip title="Home" placement="top-end" arrow>
              <Link to="/">
                <Box
                  component="img"
                  src="/images/elReinoDelReves.png"
                  alt="Logo"
                  sx={{ width: "90px", height: "90px" }}
                />
              </Link>
            </Tooltip>
            <Box className="navBarLogoTitle">Gestión Cudnocud</Box>
          </Box>
        )}

        <Box style={{ p: 1 }}>
          <Tooltip title="Actualizar contraseña" placement="top-end" arrow>
            <Link to={"/users/updatePasswordLoggedInUser"}>
              <IconButton>
                <Icons.KeyIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

        <Box style={{ padding: "10px" }}>
          <AlertsContainer />
        </Box>
      </Box>
    </Box>
  );
};
