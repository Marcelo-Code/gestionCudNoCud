import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { errorAlert } from "../alerts/alerts";

export const EditModeButtonGroup = (editModeButtonGroupProps) => {
  const { deleteFunction, editLink, isAllowed } = editModeButtonGroupProps;
  const navigate = useNavigate();
  const iconStyle = { color: "blue", fontSize: "1.5em", margin: "10px" };
  return (
    <Box>
      <Tooltip title="Eliminar" placement="top-end" arrow>
        <IconButton
          onClick={
            isAllowed
              ? deleteFunction
              : () => errorAlert("Usuario no autorizado, solamente lectura")
          }
        >
          <Icons.DeleteIcon sx={iconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar" placement="top-end" arrow>
        <IconButton
          onClick={(e) => {
            if (isAllowed) {
              navigate(editLink);
            } else {
              e.preventDefault(); // evita comportamiento por defecto
              errorAlert("Usuario no autorizado, solamente lectura");
            }
          }}
        >
          <Icons.EditIcon sx={iconStyle} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
