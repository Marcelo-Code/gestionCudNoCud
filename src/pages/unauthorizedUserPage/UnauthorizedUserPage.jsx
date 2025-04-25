import { Link } from "react-router-dom";
import "./unauthorizedUserPage.css";
import { Button } from "@mui/material";

export const UnauthorizedUserPage = (unauthorizedUserPageProps) => {
  const { handleGoBack } = unauthorizedUserPageProps;
  return (
    <div className="unauthorizedUserPageContainer">
      <img src="/images/logo.png" width={"200px"} height={"200px"} alt="404" />
      <span className="unauthorizedUserPageTitle">Usuario no autorizado</span>
      <Button
        onClick={handleGoBack}
        variant="outlined"
        size="small"
        sx={{
          background: "white",
          width: "90%",
          maxWidth: "800px",
          minWidth: "300px",
        }}
      >
        Volver
      </Button>
    </div>
  );
};
