import React from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./recoverPassword.css";
import { Icons } from "../../assets/Icons";

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
          sx={{ mt: 1 }}
          className="recoverPasswordForm"
        >
          <span className="loginTitle">Recuperar Contraseña</span>
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
          <Button
            fullWidth
            variant="outlined"
            style={{ border: "1px solid white", color: "white" }}
            onClick={handleGoBack}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
