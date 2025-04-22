import { Box, Button, Card, TextField } from "@mui/material";
import React from "react";
import "../../../assets/css/globalFormat.css";
import "./updatePasswordLoggedInUser.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";

export const UpdatePasswordLoggedInUser = (updatePasswordLoggedInUserProps) => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    isLoadingButton,
    authUser,
  } = updatePasswordLoggedInUserProps;

  const elementStyle = {
    margin: "10px",
    width: "200px",
    backgroundColor: "white",
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Actualizar contraseña:</Box>
      <Box className="generalSubTitle">
        <b>Usuario: </b> {authUser.email || "Cargando..."}
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: "30px" }}>
          <Box className="updatePasswordElement">
            <Icons.KeyIcon />
            <TextField
              type="password"
              style={elementStyle}
              label="Contraseña actual"
              variant="outlined"
              onChange={(e) => setOldPassword(e.target.value)}
              required
              value={oldPassword}
            />
          </Box>
          <Box className="updatePasswordElement">
            <Icons.KeyIcon />
            <TextField
              type="password"
              style={elementStyle}
              label="Nueva Contraseña"
              variant="outlined"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              value={newPassword}
            />
          </Box>
          <Box className="updatePasswordElement">
            <Icons.KeyIcon />
            <TextField
              type="password"
              style={elementStyle}
              label="Repetir nueva contraseña"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              value={confirmPassword}
            />
          </Box>
        </Box>
        <Box className="updatePasswordItem">
          <Button
            variant="contained"
            size="small"
            startIcon={<Icons.KeyIcon />}
            type="submit"
            loading={isLoadingButton}
          >
            Actualizar contraseña
          </Button>
        </Box>
      </form>
      <BackButtonContainer />
    </Box>
  );
};
