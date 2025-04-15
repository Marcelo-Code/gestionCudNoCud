import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";
import { Link } from "react-router-dom";

export const EditModeButtonGroup = (editModeButtonGroupProps) => {
  const { deleteFunction, editLink } = editModeButtonGroupProps;
  const iconStyle = { color: "blue", fontSize: "1.5em", margin: "10px" };
  return (
    <Box>
      <Tooltip title="Eliminar" placement="top-end" arrow>
        <IconButton onClick={deleteFunction}>
          <Icons.DeleteIcon sx={iconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar" placement="top-end" arrow>
        <Link to={`${editLink}`}>
          <IconButton>
            <Icons.EditIcon sx={iconStyle} />
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};
