import { Link } from "react-router-dom";
import "./unauthorizedUserPage.css";
import { Button } from "@mui/material";
import { Icons } from "../../assets/Icons";

export const UnauthorizedUserPage = (unauthorizedUserPageProps) => {
  const { handleGoBack } = unauthorizedUserPageProps;
  return (
    <div className="unauthorizedUserPageContainer">
      {/* <img src="/images/logo.png" width={"200px"} height={"200px"} alt="404" /> */}
      <Icons.DoDisturbIcon sx={{ fontSize: "50px" }} />
      <span className="unauthorizedUserPageTitle">Usuario no autorizado</span>
      <Button
        onClick={handleGoBack}
        variant="outlined"
        size="small"
        sx={{
          background: "white",
          width: "90%",
          maxWidth: "320px",
        }}
      >
        Volver
      </Button>
    </div>
  );
};
