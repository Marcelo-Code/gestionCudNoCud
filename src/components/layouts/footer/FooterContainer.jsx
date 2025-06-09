import { useContext, useEffect, useState } from "react";
import "./footer.css";
import { FooterData } from "./FooterData";
import { GeneralContext } from "../../../context/GeneralContext";
import { getReportData } from "../../../services/api/reportData";
import { Box, CircularProgress } from "@mui/material";

export const FooterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const { updateFooter } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    getReportData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateFooter]);

  return (
    <Box className="footerContainer">
      <Box className="footerTitle">Gestión Cudnocud</Box>
      {isLoading ? <CircularProgress /> : <FooterData {...data} />}
      <Box className="footerNameDeveloper">
        Marcelo Feltes Dos Mil Veinticinco
      </Box>
    </Box>
  );
};
