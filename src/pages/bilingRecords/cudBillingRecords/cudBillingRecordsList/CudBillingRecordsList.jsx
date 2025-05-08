import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import "../../../../assets/css/globalFormat.css";
import "./cudBillingRecordsList.css";
import { GeneralBarContainer } from "../../../../components/layouts/generalBar/GeneralBarContainer";
import { Icons } from "../../../../assets/Icons";
import {
  currencyFormat,
  dateFormat,
  getExtension,
  monthFormat,
} from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { errorAlert } from "../../../../components/common/alerts/alerts";

export const CudBillingRecordsList = (cudBillingRecordsListProps) => {
  const {
    cudBillingRecords,
    setEditMode,
    editMode,
    handleDeleteCudBillingRecord,
    totalMontoFacturado,
    totalMontoPercibido,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    professional,
    paymentRequests,
    userProfessionalId,
    userProfile,
    cudBillingRecordsfieldsToSearch,
    setFilteredCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
    handleSort,
    sortedRecords,
    sortConfig,
  } = cudBillingRecordsListProps;

  let createRoute = "/billingRecords/createCudBillingRecord";
  let editRoute = "/billingRecords/cudBillingRecords/edit";

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

  //Se deshabilita la barra de edición si el paciente no es CUD
  const disableEditionBarButton = !!(patientId && !patient.cud);

  const navigate = useNavigate();

  const generalBarContainerProps = {
    buttonText: "Factura CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: `${createRoute}`,
    disableEditionBarButton: disableEditionBarButton,
    tooltipMessage: disableEditionBarButton
      ? "El paciente no es CUD"
      : "Crear factura CUD",
    fieldsToSearch: cudBillingRecordsfieldsToSearch,
    setFilteredRecords: setFilteredCudBillingRecords,
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
    verticalAlign: "middle",
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

  // const iconStyle = { color: "blue", fontSize: "1.5em", margin: "10px" };

  const iconDocumentStyle = {
    margin: "10px",
    fontSize: "2em",
    verticalAlign: "middle",
  };

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {`${cudBillingRecords.length} registros obtenidos`}
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
                    {
                      label: "Profesional",
                      key: "profesionales.nombreyapellidoprofesional",
                      sortable: true,
                    },
                    {
                      label: "Paciente",
                      key: "pacientes.nombreyapellidopaciente",
                      sortable: true,
                    },
                    {
                      label: "Prestación",
                      key: "profesionales.especialidadprofesional",
                      sortable: true,
                    },
                    {
                      label: "Período Facturado",
                      key: "periodofacturado",
                      sortable: true,
                    },
                    {
                      label: "Fecha Presentación O.S.",
                      key: "fechapresentacionos",
                      sortable: true,
                    },
                    {
                      label: "Estado Facturación",
                      key: "estadofacturacion",
                      sortable: true,
                    },
                    {
                      label: "Factura Mensual",
                      key: "facturaMensual",
                      sortable: false,
                    },
                    {
                      label: "Asistencia Mensual",
                      key: "asistenciaMensual",
                      sortable: false,
                    },
                    {
                      label: "Monto Facturado",
                      key: "montofacturado",
                      sortable: true,
                    },
                    {
                      label: "Nro. Factura",
                      key: "nrofactura",
                      sortable: true,
                    },
                    {
                      label: "Obra Social",
                      key: "obrasocialpaciente",
                      sortable: true,
                    },

                    // "Informe Mensual",

                    {
                      label: "Fecha Aviso Recepción O.S.",
                      key: "fecharecepcionos",
                      sortable: true,
                    },
                    { label: "Reclamos", key: "reclamos", sortable: false },
                    {
                      label: "Fecha de Cobro",
                      key: "fechacobro",
                      sortable: true,
                    },
                    {
                      label: "Monto Percibido",
                      key: "montopercibido",
                      sortable: true,
                    },
                    {
                      label: "35% Retención",
                      key: "retencion",
                      sortable: true,
                    },
                    {
                      label: "Monto Final Profesional",
                      key: "montofinalprofesional",
                      sortable: true,
                    },
                    {
                      label: "Pago Retención",
                      key: "documentocomprobrantepagoretencion",
                      sortable: false,
                    },
                  ].map(({ label, key, sortable }) => (
                    <th
                      onClick={sortable ? () => handleSort(key) : undefined}
                      key={key}
                      style={{
                        padding: "8px",
                        textAlign: "center",
                        minWidth: "100px",
                        width: "auto",
                        color: sortable ? "#555" : "#888",
                        cursor: sortable ? "pointer" : "default",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (sortable) e.currentTarget.style.color = "#1976d2"; // MUI primary
                      }}
                      onMouseLeave={(e) => {
                        if (sortable) e.currentTarget.style.color = "#555";
                      }}
                    >
                      <div>
                        {label}
                        {sortable && sortConfig.key === key && (
                          <span>
                            {sortConfig.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((record, index) => {
                  //Cuenta la cantidad de reclamos asociados a la factura
                  //para mostrarlo en el Tooltip del botón "Reclamo"
                  const paymentRequestsCount = paymentRequests.filter(
                    (request) =>
                      request.idfacturacioncud === parseInt(record.id)
                  ).length;

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
                          <div style={{ display: "flex", gap: "1px" }}>
                            <Tooltip title="Eliminar" placement="top-end" arrow>
                              <IconButton
                                onClick={() => {
                                  editAllowed
                                    ? handleDeleteCudBillingRecord(record.id)
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
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.profesionales.nombreyapellidoprofesional}
                        </span>
                      </td>
                      <td style={colStyle}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.pacientes.nombreyapellidopaciente}
                        </span>
                      </td>
                      <td style={colStyle}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.profesionales.especialidadprofesional}
                        </span>
                      </td>
                      <td style={colStyle}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.periodofacturado
                            ? monthFormat(record.periodofacturado)
                            : "Sin fecha"}
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.fechapresentacionos
                            ? dateFormat(record.fechapresentacionos)
                            : "Sin fecha"}
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span style={inLineStyle}>
                          <TrafficLightStatus
                            status={record.estadofacturacion}
                          />
                          {record.estadofacturacion}
                        </span>
                      </td>
                      <td style={colStyle}>
                        {record.documentofacturamensual ? (
                          <>
                            <Link
                              to={record.documentofacturamensual}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {/* Documento Fact. Mensual */}
                              {["jpg", "png", "jpeg"].includes(
                                getExtension(record.documentofacturamensual)
                              ) && <Icons.ImageIcon sx={iconDocumentStyle} />}
                              {["doc", "docx"].includes(
                                getExtension(record.documentofacturamensual)
                              ) && <Icons.ArticleIcon sx={iconDocumentStyle} />}
                              {["pdf"].includes(
                                getExtension(record.documentofacturamensual)
                              ) && (
                                <Icons.PictureAsPdfIcon
                                  sx={iconDocumentStyle}
                                />
                              )}
                              {getExtension(
                                record.documentofacturamensual
                              ).toUpperCase()}
                            </Link>
                          </>
                        ) : (
                          "Sin Documento"
                        )}
                      </td>
                      <td style={colStyle}>
                        {record.imgasistenciamensual ? (
                          <>
                            <Link
                              to={record.imgasistenciamensual}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {/* Documento Asist. Mensual */}
                              {["jpg", "png", "jpeg"].includes(
                                getExtension(record.imgasistenciamensual)
                              ) && <Icons.ImageIcon sx={iconDocumentStyle} />}
                              {["doc", "docx"].includes(
                                getExtension(record.imgasistenciamensual)
                              ) && <Icons.ArticleIcon sx={iconDocumentStyle} />}
                              {["pdf"].includes(
                                getExtension(record.imgasistenciamensual)
                              ) && (
                                <Icons.PictureAsPdfIcon
                                  sx={iconDocumentStyle}
                                />
                              )}
                              {getExtension(
                                record.imgasistenciamensual
                              ).toUpperCase()}
                            </Link>
                          </>
                        ) : (
                          "Sin Documento"
                        )}
                      </td>

                      <td style={{ textAlign: "right" }}>
                        {currencyFormat(record.montofacturado)}
                      </td>
                      <td style={{ padding: "16px" }}>{record.nrofactura}</td>
                      <td style={colStyle}>
                        {record.pacientes?.obrasocialpaciente}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {record.fecharecepcionos
                          ? dateFormat(record.fecharecepcionos)
                          : "Sin fecha"}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <Tooltip
                          title={`${paymentRequestsCount} reclamos`}
                          placement="top-end"
                          arrow
                        >
                          <Link
                            to={`/paymentRequests/list/cudBillingRecords/${record.id}`}
                          >
                            <Button
                              size="small"
                              startIcon={<Icons.ErrorIcon />}
                              variant="contained"
                            >
                              Reclamos
                            </Button>
                          </Link>
                        </Tooltip>
                      </td>
                      <td style={{ padding: "16px" }}>
                        {record.fechacobro
                          ? dateFormat(record.fechacobro)
                          : "Sin fecha"}
                      </td>
                      <td style={{ textAlign: "right", padding: "16px" }}>
                        {currencyFormat(record.montopercibido)}
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
                        {currencyFormat(record.montopercibido * 0.35)}
                      </td>
                      <td style={{ textAlign: "right", padding: "16px" }}>
                        {currencyFormat(record.montofinalprofesional)}
                      </td>
                      <td style={colStyle}>
                        {record.documentocomprobantepagoretencion ? (
                          <>
                            <Link
                              to={record.documentocomprobantepagoretencion}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {/* Documento Asist. Mensual */}
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
                                <Icons.PictureAsPdfIcon
                                  sx={iconDocumentStyle}
                                />
                              )}
                              {getExtension(
                                record.documentocomprobantepagoretencion
                              ).toUpperCase()}
                            </Link>
                          </>
                        ) : (
                          "Sin Documento"
                        )}
                      </td>
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
                    colSpan={editMode ? 10 : 9}
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Totales:
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {currencyFormat(totalMontoFacturado)}
                  </td>
                  <td
                    colSpan={5}
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Totales:{" "}
                  </td>
                  <td style={{ textAlign: "right", padding: "16px" }}>
                    {currencyFormat(totalMontoPercibido)}
                  </td>
                  <td style={{ textAlign: "right", padding: "16px" }}>
                    {currencyFormat(totalRetencion)}
                  </td>
                  <td style={{ textAlign: "right", padding: "16px" }}>
                    {currencyFormat(totalProfesional)}
                  </td>
                  <td style={{ padding: "16px" }}></td>
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
