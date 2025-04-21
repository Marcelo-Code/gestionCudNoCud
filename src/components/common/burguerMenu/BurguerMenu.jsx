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

export const BurguerMenu = (burguerMenuProps) => {
  const { toggleDrawer, options, open } = burguerMenuProps;
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
            height: "100%",
            backgroundColor: "aqua",
          }}
          role="presentation"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              px: 2,
            }}
          >
            <Tooltip title="Cerrar" placement="top-end" arrow>
              <IconButton onClick={toggleDrawer(false)}>
                <Icons.CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <List>
              {options.map(({ icon, option, link }) => (
                <ListItem key={option}>
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
                        fontFamily: "broughton, 'Times New Roman', serif",
                        fontSize: "1.2rem",
                      }}
                      onClick={toggleDrawer(false)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
