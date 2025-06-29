import { Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { errorAlert } from "../alerts/alerts";

export const EditModeButtonGroup = (editModeButtonGroupProps) => {
  const { deleteFunction, editLink, isAllowed } = editModeButtonGroupProps;
  const navigate = useNavigate();
  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "0 5px 0 5px" };
  return (
    <Box>
      <Tooltip title="Editar" placement="top-end" arrow>
        <IconButton
          onClick={(e) => {
            if (isAllowed) {
              navigate(editLink);
            } else {
              e.preventDefault();
              errorAlert("Usuario no autorizado, solamente lectura");
            }
          }}
        >
          <Icons.EditIcon sx={iconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar" placement="top-end" arrow>
        <IconButton
          onClick={
            isAllowed
              ? deleteFunction
              : () => errorAlert("Usuario no autorizado, solamente lectura")
          }
        >
          <Icons.DeleteIcon sx={{ ...iconStyle, color: "red" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
