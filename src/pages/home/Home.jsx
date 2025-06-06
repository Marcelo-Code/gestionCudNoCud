import { Box, Button } from "@mui/material";
import "../../assets/css/globalFormat.css";
import "./home.css";
import DonutChart from "../../components/common/donutChart/DonutChart";
// import { generateDoc } from "../../components/layouts/generalBar/bars/exportToWord/GenerateDocContainer";

export const Home = (homeProps) => {
  const { totalSize } = homeProps;

  // const handleGenerateDoc = async () => {
  //   await generateDoc();
  // };

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
      {/* <Button
        onClick={() => {
          handleGenerateDoc();
        }}
      >
        DOC
      </Button> */}
    </Box>
  );
};
