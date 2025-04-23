import { Box } from "@mui/material";
import "../../assets/css/globalFormat.css";
import "./home.css";
import DonutChart from "../../components/common/donutChart/DonutChart";

export const Home = (homeProps) => {
  const { totalSize } = homeProps;

  return (
    <Box className="generalContainer">
      <Box className="homeTitle">Home</Box>
      <Box className="homeData">
        <DonutChart
          usedSize={totalSize.database_size_mb}
          totalSize={500}
          nameChart={"Base de Datos"}
        />
        <DonutChart
          usedSize={totalSize.storage_size_mb}
          totalSize={1000}
          nameChart={"Storage"}
        />
      </Box>
    </Box>
  );
};
