import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import "./home.css";
import { Icons } from "../../assets/Icons";

export const Home = (homeProps) => {
  const { totalSize } = homeProps;
  return (
    <Box className="generalContainer">
      <Box className="homeTitle">Home</Box>
      <Box className="homeData">
        <Box sx={{ marginTop: "10px" }}>
          <b>Tamaño base de datos:</b>{" "}
          {totalSize.database_size || "Cargando..."}
        </Box>
        <Box>
          <b>Tamaño storage:</b> {totalSize.storage_size || "Cargando..."}
        </Box>
        <Box>
          <b>Tamaño Total:</b> {totalSize.total_size || "Cargando..."}
        </Box>
      </Box>
    </Box>
  );
};
