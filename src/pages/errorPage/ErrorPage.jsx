import { Link } from "react-router-dom";
import "./errorPage.css";
import { Box, Button } from "@mui/material";

export const ErrorPage = (errorPageContainerProps) => {
  const { error } = errorPageContainerProps;

  console.log(error);
  return (
    <Box className="pageNotFoundContainer">
      <img src="/images/logo.png" width={"200px"} height={"200px"} alt="404" />
      <Box className="pageNotFoundTitle">Error:</Box>
      <Box className="errorMessage">
        {error?.message || "Ha ocurrido un error inesperado."}
      </Box>
      <Link to="/">
        <Button
          variant="outlined"
          size="small"
          sx={{
            background: "white",
            width: "90%",
            minWidth: "320px",
          }}
        >
          Home
        </Button>
      </Link>
    </Box>
  );
};
