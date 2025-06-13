import React from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import { generalBackgroundColor, generalColor } from "../../utils/helpers";

export const Login = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  error,
  buttonIsLoading,
}) => {
  return (
    <Container component="main" className="loginContainer">
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
            color: generalColor,
          }}
          className="loginForm"
        >
          <Box className="loginTitle">Gestión Cudnocud</Box>
          <Box className="loginSubTitle">Login</Box>
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
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: "white" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="black" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<Icons.LoginIcon />}
            onClick={handleLogin}
            loading={buttonIsLoading}
            size="small"
          >
            LogIn
          </Button>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography>
              <Link
                to={"/recoverPassword"}
                style={{ color: generalColor, justifySelf: "center" }}
              >
                Olvidé mi contraseña
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
