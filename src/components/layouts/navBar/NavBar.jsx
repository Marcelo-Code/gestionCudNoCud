import { Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";

import "./navBar.css";
import { Link } from "react-router-dom";
import { AlertsContainer } from "../../../pages/alerts/AlertsContainer";

export const NavBar = (navBarProps) => {
  const { showLogo, handleLogout } = navBarProps;
  return (
    <Box className="navBarContainer">
      <BurguerMenuContainer />
      {showLogo && (
        <Box className="navBarLogo">
          <Tooltip title="Home" placement="top-end" arrow>
            <Link to="/">
              <Box
                component="img"
                src="/images/logo.png"
                alt="Logo"
                sx={{ width: "90px", height: "90px" }}
              />
            </Link>
          </Tooltip>
          <Box className="navBarLogoTitle">Gestión Cudnocud</Box>
        </Box>
      )}

      <Box style={{ padding: "10px" }}>
        <Tooltip title="Logout" placement="top-end" arrow>
          <IconButton onClick={handleLogout}>
            <Icons.LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box style={{ padding: "10px" }}>
        <AlertsContainer />
      </Box>
    </Box>
  );
};
