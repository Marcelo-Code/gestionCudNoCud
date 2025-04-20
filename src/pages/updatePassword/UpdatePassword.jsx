import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./updatePassword.css";
import { Icons } from "../../assets/Icons";
export const UpdatePassword = (updatePasswordProps) => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    error,
    successMessage,
  } = updatePasswordProps;
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="updatePasswordContainer"
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
          className="updatePasswordForm"
        >
          <span className="updatePasswordTitle">Actualizar Contraseña</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            autoFocus
            sx={{ backgroundColor: "white" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            sx={{ backgroundColor: "white" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdatePassword}
            startIcon={<Icons.KeyIcon />}
          >
            Actualizar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
