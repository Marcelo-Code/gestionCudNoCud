import { Link } from "react-router-dom";
import "./pageNotFound.css";
import { Button } from "@mui/material";

export const PageNotFound = () => {
  return (
    <div className="pageNotFoundContainer">
      <img src="/images/logo.png" width={"200px"} height={"200px"} alt="404" />
      <span className="pageNotFoundTitle">Error 404: Página no encontrada</span>
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
