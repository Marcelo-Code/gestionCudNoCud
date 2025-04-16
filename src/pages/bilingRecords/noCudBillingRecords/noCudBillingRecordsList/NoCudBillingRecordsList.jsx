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
import { Link } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";

export const NoCudBillingRecordsList = (cudBillingRecordsListProps) => {
  const {
    noCudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
    totalMontoSesion,
    totalProfesional,
    totalRetencion,
  } = cudBillingRecordsListProps;

  const generalBarContainerProps = {
    buttonText: "Factura No CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: "/billingRecords/noCudBillingRecords/createNoCudBillingRecord",
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
                  {editMode && (
                    <th
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 3,
                        backgroundColor: "#fff",
                        padding: "16px",
                        width: "120px",
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
                {noCudBillingRecords.map((record) => (
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
                    {editMode && (
                      <td
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          backgroundColor: "#fff",
                          padding: "16px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Tooltip title="Eliminar" placement="top-end" arrow>
                            <IconButton
                              onClick={() =>
                                handleDeleteNoCudBillingRecord(record.id)
                              }
                            >
                              <Icons.DeleteIcon sx={iconStyle} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar" placement="top-end" arrow>
                            {/* <Link
                              to={`/billingRecords/cudBillingRecords/edit/${record.id}`}
                              > */}
                            <IconButton>
                              <Icons.EditIcon sx={iconStyle} />
                            </IconButton>
                            {/* </Link> */}
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
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montosesion)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.retencion)}
                    </td>
                    <td style={{ padding: "16px" }}>
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
                          {getExtension(record.documentofactura).toUpperCase()}
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
                ))}
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
                    colSpan={editMode ? 8 : 7}
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Totales:
                  </td>
                  <td>{currencyFormat(totalMontoSesion)}</td>
                  <td style={{ padding: "16px" }}>
                    {currencyFormat(totalRetencion)}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {currencyFormat(totalProfesional)}
                  </td>
                  <td colSpan={6}></td>
                </tr>
              </tfoot>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
