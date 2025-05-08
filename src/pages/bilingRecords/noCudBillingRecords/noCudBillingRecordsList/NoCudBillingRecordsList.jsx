import { Box, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import "../../../../assets/css/globalFormat.css";
import "./noCudBillingRecordsList.css";
import { GeneralBarContainer } from "../../../../components/layouts/generalBar/GeneralBarContainer";
import { Icons } from "../../../../assets/Icons";
import {
  currencyFormat,
  dateFormat,
  getExtension,
} from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { errorAlert } from "../../../../components/common/alerts/alerts";

export const NoCudBillingRecordsList = (cudBillingRecordsListProps) => {
  const {
    noCudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
    totalMontoSesion,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    professional,
    userProfessionalId,
    userProfile,
    noCudBillingRecordsfieldsToSearch,
    setFilteredNoCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  } = cudBillingRecordsListProps;

  let createRoute =
    "/billingRecords/noCudBillingRecords/createNoCudBillingRecord";
  let editRoute = "/billingRecords/noCudBillingRecords/edit";

  if (professionalId) {
    createRoute += `/professional/${professionalId}`;
    editRoute += `/professional/${professionalId}`;
  } else if (userProfessionalId && userProfile !== "admin") {
    //Si no se ingresa por el perfil del profesional y el usuario no es admin se utiliza el id del profesional del contexto
    createRoute += `/professional/${userProfessionalId}`;
    editRoute += `/professional/${userProfessionalId}`;
  }
  if (patientId) {
    createRoute += `/patient/${patientId}`;
    editRoute += `/patient/${patientId}`;
  }

  //Se deshabilita el boton de edicion si el paciente es CUD
  const disableEditionBarButton = !!(patientId && patient.cud);
  const navigate = useNavigate();

  const generalBarContainerProps = {
    buttonText: "Factura No CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: `${createRoute}`,
    disableEditionBarButton: disableEditionBarButton,
    tooltipMessage: disableEditionBarButton
      ? "El paciente no es CUD"
      : "Crear factura no CUD",
    fieldsToSearch: noCudBillingRecordsfieldsToSearch,
    setFilteredRecords: setFilteredNoCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  };

  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "5px" };
  const inLineStyle = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "left",
    alignItems: "center",
    gap: "8px",
  };

  const colStyle = {
    padding: "16px",
    // fuerza el quiebre de palabras largas si es necesario
    wordWrap: "break-word",
    // permite el salto de línea
    whiteSpace: "normal",
    maxWidth: "300px",
    minWidth: "200px",
  };

  const iconDocumentStyle = {
    margin: "10px",
    fontSize: "2em",
    verticalAlign: "middle",
  };

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {`${noCudBillingRecords.length} registros obtenidos`}
      </Box>

      <Card sx={{ width: "100vw" }}>
        <CardContent>
          <Box className="billingRecordsListContainer">
            <table className="billingRecordsTable">
              <thead className="billingRecordsTableHeader">
                <tr>
                  <th
                    style={{
                      position: "sticky",
                      left: 0,
                      zIndex: 3,
                      backgroundColor: "#fff",
                      width: "60px",
                      textAlign: "center",
                      padding: "2px",
                    }}
                  >
                    #
                  </th>
                  {editMode && (
                    <th
                      style={{
                        position: "sticky",
                        left: "20px",
                        zIndex: 3,
                        backgroundColor: "#fff",
                        padding: "16px",
                        width: "70px",
                        textAlign: "center",
                      }}
                    >
                      Edición
                    </th>
                  )}
                  {[
                    "Profesional",
                    "Prestación",
                    "Paciente",
                    "Fecha Sesión",
                    "Estado Pago",
                    "Fecha de Pago",
                    "Medio de Pago",
                    "Monto Sesión",
                    "35% Retención",
                    "Monto Final Profesional",
                    "Factura Familia",
                    "Comprobante Retención",
                  ].map((label, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        minWidth: "100px",
                        width: "auto",
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {noCudBillingRecords.map((record, index) => {
                  // Si el usuario no es admin, solamente puede editarse sus propias consultas
                  const editAllowed =
                    userProfile === "admin" ||
                    userProfessionalId === record.idprofesional;

                  return (
                    <tr
                      key={record.id}
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        backgroundColor: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(0,0,0,0.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "inherit")
                      }
                    >
                      <td
                        style={{
                          position: "sticky",
                          left: 0,
                          margin: 0,
                          backgroundColor: "#fff",
                          zIndex: 2,
                          padding: "2px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </td>
                      {editMode && (
                        <td
                          style={{
                            position: "sticky",
                            left: "20px",
                            zIndex: 2,
                            backgroundColor: "#fff",
                            padding: "10px",
                          }}
                        >
                          <div style={{ display: "flex", gap: "8px" }}>
                            <Tooltip title="Eliminar" placement="top-end" arrow>
                              <IconButton
                                onClick={() => {
                                  editAllowed
                                    ? handleDeleteNoCudBillingRecord(record.id)
                                    : errorAlert(
                                        "Usuario no autorizado, solo lectura"
                                      );
                                }}
                              >
                                <Icons.DeleteIcon sx={iconStyle} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top-end" arrow>
                              <IconButton
                                onClick={(e) => {
                                  if (editAllowed) {
                                    navigate(`${editRoute}/${record.id}`);
                                  } else {
                                    e.preventDefault(); // evita comportamiento por defecto
                                    errorAlert(
                                      "Usuario no autorizado, solamente lectura"
                                    );
                                  }
                                }}
                              >
                                <Icons.EditIcon sx={iconStyle} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      )}
                      <td style={colStyle}>
                        {record.profesionales.nombreyapellidoprofesional}
                      </td>
                      <td style={colStyle}>
                        {record.profesionales.especialidadprofesional}
                      </td>
                      <td style={colStyle}>
                        {record.pacientes.nombreyapellidopaciente}
                      </td>
                      <td style={colStyle}>
                        {record.fechasesion
                          ? dateFormat(record.fechasesion)
                          : "Sin fecha"}
                      </td>
                      <td style={colStyle}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus status={record.estadopago} />
                          {record.estadopago}
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        {record.fechadepago
                          ? dateFormat(record.fechadepago)
                          : "Sin fecha"}
                      </td>
                      <td style={{ padding: "16px" }}>{record.mediopago}</td>
                      <td style={{ textAlign: "right", padding: "16px" }}>
                        {currencyFormat(record.montosesion)}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "16px",
                          textDecoration:
                            record.documentocomprobantepagoretencion
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {currencyFormat(record.retencion)}
                      </td>
                      <td style={{ textAlign: "right", padding: "16px" }}>
                        {currencyFormat(record.montofinalprofesional)}
                      </td>
                      <td style={colStyle}>
                        {record.documentofactura ? (
                          <>
                            <Link
                              to={record.documentofactura}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Documento Pago Retención
                            </Link>
                            {["jpg", "png", "jpeg"].includes(
                              getExtension(record.documentofactura)
                            ) && <Icons.ImageIcon sx={iconDocumentStyle} />}
                            {["doc", "docx"].includes(
                              getExtension(record.documentofactura)
                            ) && <Icons.ArticleIcon sx={iconDocumentStyle} />}
                            {["pdf"].includes(
                              getExtension(record.documentofactura)
                            ) && (
                              <Icons.PictureAsPdfIcon sx={iconDocumentStyle} />
                            )}
                            {getExtension(
                              record.documentofactura
                            ).toUpperCase()}
                          </>
                        ) : (
                          "Sin documento"
                        )}
                      </td>
                      <td style={colStyle}>
                        {record.documentocomprobantepagoretencion ? (
                          <>
                            <Link
                              to={record.documentocomprobantepagoretencion}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Documento Pago Retención
                            </Link>
                            {["jpg", "png", "jpeg"].includes(
                              getExtension(
                                record.documentocomprobantepagoretencion
                              )
                            ) && <Icons.ImageIcon sx={iconDocumentStyle} />}
                            {["doc", "docx"].includes(
                              getExtension(
                                record.documentocomprobantepagoretencion
                              )
                            ) && <Icons.ArticleIcon sx={iconDocumentStyle} />}
                            {["pdf"].includes(
                              getExtension(
                                record.documentocomprobantepagoretencion
                              )
                            ) && (
                              <Icons.PictureAsPdfIcon sx={iconDocumentStyle} />
                            )}
                            {getExtension(
                              record.documentocomprobantepagoretencion
                            ).toUpperCase()}
                          </>
                        ) : (
                          "Sin documento"
                        )}
                      </td>
                      <td style={{ padding: "16px" }}></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#fff",
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    zIndex: 2,
                  }}
                >
                  <td
                    colSpan={editMode ? 9 : 8}
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Totales:
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    {currencyFormat(totalMontoSesion)}
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    {currencyFormat(totalRetencion)}
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    {currencyFormat(totalProfesional)}
                  </td>
                  <td colSpan={6}></td>
                </tr>
              </tfoot>
            </table>
          </Box>
        </CardContent>
      </Card>
      <BackButtonContainer />
    </Box>
  );
};
