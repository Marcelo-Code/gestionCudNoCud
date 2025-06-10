import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import "./footer.css";
import { Icons } from "../../../assets/Icons";

export const Footer = (footerProps) => {
  const { isLoading, FOOTER_DATA } = footerProps;
  return (
    <Box className="footerContainer">
      <Box className="footerTitle">Gestión Cudnocud</Box>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          fontFamily: "roboto",
          fontSize: "20px",
          mb: 2,
        }}
      >
        Canales de Contacto
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "roboto",
          flexWrap: "wrap",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          FOOTER_DATA.map((item) => (
            <Box
              key={item.title}
              sx={{
                wordBreak: "break-word", // Permite romper la palabra si es necesario
                overflowWrap: "break-word", // Complementa wordBreak para los navegadores
                whiteSpace: "normal", // Permite el salto de línea normal
                flexWrap: "wrap",
              }}
            >
              {item.icon}
              <b>{item.title}</b>
              {item.text}
              <Tooltip title="Copiar" placement="top">
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(
                      item.title + (item.text.props?.children || item.text)
                    )
                  }
                >
                  <Icons.ContentCopyIcon
                    sx={{ color: "white", verticalAlign: "middle" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          ))
        )}
      </Box>
      <Box className="footerNameDeveloper">
        Marcelo Feltes Dos Mil Veinticinco
      </Box>
    </Box>
  );
};
