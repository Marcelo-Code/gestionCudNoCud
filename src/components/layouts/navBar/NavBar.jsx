import { Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";

import "./navBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Box className="navBarContainer">
      <BurguerMenuContainer />
      <Box className="navBarLogo">
        <Tooltip title="Home" placement="top-end" arrow>
          <Link to="/">
            <img
              src="/images/elReinoDelReves.png"
              alt=""
              style={{ width: "80px", height: "80px" }}
            />
          </Link>
        </Tooltip>
        <Box className="navBarLogoTitle">Gestión Cudnocud</Box>
      </Box>

      <Box style={{ padding: "10px" }}>
        <Tooltip title="Logout" placement="top-end" arrow>
          <IconButton>
            <Icons.LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box style={{ padding: "10px" }}>
        <Tooltip title="Alertas" placement="top-end" arrow>
          <IconButton>
            <Icons.NotificationsActiveIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
