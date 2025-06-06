import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icons } from "../../../assets/Icons";
import "./burguerMenu.css";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { normalizeName } from "../../../utils/helpers";

export const BurguerMenu = (burguerMenuProps) => {
  const { toggleDrawer, options, open, userName, userProfile, handleLogout } =
    burguerMenuProps;
  return (
    <Box>
      <Tooltip title="Menú" placement="top-end" arrow>
        <IconButton onClick={toggleDrawer(true)}>
          <Icons.MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 300,
            backgroundColor: "aqua",
            height: "100vh",
          }}
          role="presentation"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Cerrar" placement="top-end" arrow>
              <IconButton onClick={toggleDrawer(false)}>
                <Icons.CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            className="generalSubTitle"
            sx={{ textAlign: "left", paddingLeft: 3 }}
          >
            <b>Usuario: </b> {normalizeName(userName) || "Cargando..."}
          </Box>
          <Box
            className="generalSubTitle"
            sx={{ textAlign: "left", paddingLeft: 3 }}
          >
            <b>Perfil: </b>
            {userProfile || "Cargando..."}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "start",
              backgroundColor: "aqua",
              overflow: "auto",
              height: "80%",
            }}
          >
            <List sx={{ width: "100%", fontSize: "16px" }}>
              {options.map(({ icon, option, link }) => (
                <ListItem sx={{ padding: "0px", margin: "0px" }} key={option}>
                  <ListItemButton component={Link} to={link}>
                    <ListItemIcon
                      sx={{
                        color: "white",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={option}
                      primaryTypographyProps={{
                        color: "black",
                        fontFamily: "roboto",
                      }}
                      onClick={toggleDrawer(false)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List sx={{ width: "100%", fontSize: "16px" }}>
              <ListItem sx={{ padding: "0px", margin: "0px" }}>
                <ListItemButton
                  onClick={() => {
                    // toggleDrawer(false);
                    handleLogout();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    <Icons.LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    onClick={toggleDrawer(false)}
                    primaryTypographyProps={{
                      color: "black",
                      fontFamily: "roboto",
                      fontSize: "17px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
