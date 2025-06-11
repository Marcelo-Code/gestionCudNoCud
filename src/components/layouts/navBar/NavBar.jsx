import { Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";

import "./navBar.css";
import { Link } from "react-router-dom";
import { AlertsContainer } from "../../../pages/alerts/AlertsContainer";

export const NavBar = () => {
  return (
    <Box>
      <Box className="navBarContainer">
        <BurguerMenuContainer />
        <Box className="navBarLogo">
          <Tooltip title="Home" placement="top-end" arrow>
            <Link to="/">
              <Box
                component="img"
                src="/images/crown.png"
                alt="Logo"
                sx={{ width: "30px", height: "30px", mt: 1.5, mr: 1 }}
              />
            </Link>
          </Tooltip>
          <Box className="navBarLogoTitle">Gestión Cudnocud</Box>
        </Box>

        <Box style={{ padding: "10px" }}>
          <AlertsContainer />
        </Box>
      </Box>
    </Box>
  );
};
