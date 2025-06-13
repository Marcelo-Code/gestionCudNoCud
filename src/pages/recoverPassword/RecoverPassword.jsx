import React from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./recoverPassword.css";
import { Icons } from "../../assets/Icons";
import { gridInitialColumnVisibilityModelSelector } from "@mui/x-data-grid/internals";
import { generalBackgroundColor, generalColor } from "../../utils/helpers";
import { BackButtonContainer } from "../../components/common/backButton/BackButtonContainer";

export const RecoverPassword = ({
  handleGoBack,
  handleRecoverPassword,
  email,
  setEmail,
  error,
  successMessage,
}) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="recoverPasswordContainer"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
            backgroundColor: generalBackgroundColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="recoverPasswordForm"
        >
          <span className="recoverPasswordTitle" sx={{ color: generalColor }}>
            Recuperar Contraseña
          </span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ backgroundColor: "white" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ mt: 3, mb: 2, width: "240px" }}
            startIcon={<Icons.SendIcon />}
            onClick={handleRecoverPassword}
          >
            Enviar Link
          </Button>
          {error && (
            <Typography color="white" align="center">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="white" align="center">
              {successMessage}
            </Typography>
          )}

          <BackButtonContainer />
        </Box>
      </Box>
    </Container>
  );
};
