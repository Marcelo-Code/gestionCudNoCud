import { Link } from "react-router-dom";
import "./pageNotFound.css";
import { Box, Button } from "@mui/material";
import { Icons } from "../../assets/Icons";

export const PageNotFound = () => {
  return (
    <div className="pageNotFoundContainer">
      <Icons.CancelIcon sx={{ fontSize: "50px" }} />

      <Box className="pageNotFoundTitle">Error 404: Página no encontrada</Box>
      <Link to="/">
        <Button
          variant="outlined"
          size="small"
          sx={{
            background: "white",
            width: "90%",
            maxWidth: "800px",
            minWidth: "300px",
          }}
        >
          Home
        </Button>
      </Link>
    </div>
  );
};
