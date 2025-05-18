import {
  Box,
  Card,
  CardActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "../../assets/css/globalFormat.css";
import "./documentation.css";
import { Icons } from "../../assets/Icons";
import { Link } from "react-router-dom";
import { getExtension } from "../../utils/helpers";
import { LoadingContainer } from "../loading/LoadingContainer";
import { BackButtonContainer } from "../../components/common/backButton/BackButtonContainer";
import { GeneralBarContainer } from "../../components/layouts/generalBar/GeneralBarContainer";

export const Documentation = (documentationProps) => {
  const {
    patientId,
    professionalId,
    formData,
    documentData,
    editMode,
    setEditMode,
    uploadingDocumentName,
    handleDeleteDocument,
    handleUploadDocument,
    handleDownloadDocument,
    handleFileChange,
    fileInputRef,
    userProfile,
    userProfessionalId,
  } = documentationProps;

  const generalBarContainerProps = {
    editMode,
    setEditMode,

    enableReportBar: false,
    enableSearchFilterBar: false,
  };

  const iconDocumentStyle = {
    margin: "10px",
    fontSize: "2em",
    verticalAlign: "middle",
  };

  const iconStyle = { color: "blue", fontSize: "1.5em", margin: "10px" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {patientId && `Documentación: ${formData.nombreyapellidopaciente}`}
        {professionalId &&
          `Documentación: ${formData.nombreyapellidoprofesional}`}
      </Box>

      {/* Solamente los usuarios admin pueden editar documentación */}
      {(userProfile === "admin" ||
        userProfessionalId === parseInt(professionalId)) && (
        <GeneralBarContainer {...generalBarContainerProps} />
      )}

      <Box className="listContainer">
        {documentData.map((document, index) => {
          return (
            <Card className="patientDocumentationItem" key={index}>
              <Typography className="patientDocumentationItemTitle">
                <b>{document.title}</b>
              </Typography>

              <Typography
                className="patientDocumentationItemDocumentation"
                component="div"
              >
                {/* Si hay documentación cargada mostrar el nombre del documento */}
                {formData[document.name] &&
                  uploadingDocumentName !== document.name && (
                    <Box>
                      <Box sx={{ height: "50px" }}>
                        <Link
                          to={formData[document.name]}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          color="primary"
                          component="a"
                        >
                          {patientId &&
                            `${document.title}/${formData.nombreyapellidopaciente}`}
                          {professionalId &&
                            `${document.title}/${formData.nombreyapellidoprofesional}`}
                        </Link>
                      </Box>
                      <Box>
                        {/* Renderiza el tipo de archivo que se cargó */}
                        {getExtension(formData[document.name]).toUpperCase()}
                        {getExtension(formData[document.name]) === "pdf" && (
                          <Icons.PictureAsPdfIcon sx={iconDocumentStyle} />
                        )}
                        {["jpg", "png", "jpeg"].includes(
                          getExtension(formData[document.name])
                        ) && <Icons.ImageIcon sx={iconDocumentStyle} />}
                        {["doc", "docx"].includes(
                          getExtension(formData[document.name])
                        ) && <Icons.ArticleIcon sx={iconDocumentStyle} />}
                      </Box>
                    </Box>
                  )}
                {/* Si no hay documentación mostrar "Sin documentación" */}
                {!formData[document.name] &&
                  uploadingDocumentName !== document.name &&
                  "Sin documentación"}
                {/* Si el nombre del documento coincide con el que se esta cargando, mostrar "Cargando..." */}
                {/*Lo hará solamente en el box del documento que se esta cargando*/}
                {uploadingDocumentName === document.name && (
                  // "Cargando..."
                  <LoadingContainer />
                )}
              </Typography>

              {/* Si se está subiendo o eliminando un archivo se oculta el CardActions */}
              {editMode && !uploadingDocumentName && (
                <CardActions sx={{ justifyContent: "center" }}>
                  {/* Llama a función de borrado */}
                  <Tooltip title="Eliminar documento" placement="top-end" arrow>
                    <IconButton
                      onClick={() => handleDeleteDocument(document.name)}
                    >
                      <Icons.DeleteIcon sx={iconStyle} />
                    </IconButton>
                  </Tooltip>

                  {/* Llama a la función de carga de archivos */}
                  <Tooltip title="Subir documento" placement="top-end" arrow>
                    <IconButton
                      onClick={() => handleUploadDocument(document.name)}
                    >
                      <Icons.UploadIcon sx={iconStyle} />
                    </IconButton>
                  </Tooltip>

                  {/* Abre el selector de archivos */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  {/* Llama a función de descarga */}
                  <Tooltip
                    title="Descargar documento"
                    placement="top-end"
                    arrow
                  >
                    <IconButton
                      onClick={() => handleDownloadDocument(document.name)}
                    >
                      <Icons.DownloadIcon sx={iconStyle} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              )}
            </Card>
          );
        })}
      </Box>
      <BackButtonContainer />
    </Box>
  );
};
