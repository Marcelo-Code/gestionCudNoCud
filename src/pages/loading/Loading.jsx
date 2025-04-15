import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import LinearProgress from "@mui/material/LinearProgress";

export const Loading = () => {
  return (
    <div className="generalContainer">
      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <LinearProgress />
      </Box>{" "}
    </div>
  );
};
