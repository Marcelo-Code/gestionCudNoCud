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
  monthFormat,
} from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";

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
  } = cudBillingRecordsListProps;

  const generalBarContainerProps = {
    buttonText: "Factura CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: "/billingRecords/createCudBillingRecord",
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
                    "Paciente",
                    "Prestación",
                    "Período Facturado",
                    "Fecha Presentación O.S.",
                    "Estado Facturación",
                    "Factura Mensual",
                    "Asistencia Mensual",
                    "Monto Facturado",
                    "Nro. Factura",
                    "Obra Social",

                    // "Informe Mensual",

                    "Fecha Aviso Recepción O.S.",
                    "Reclamos",
                    "Fecha de Cobro",
                    "Monto Percibido",
                    "35% Retención",
                    "Monto Final Profesional",
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
                {cudBillingRecords.map((record) => (
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
                                handleDeleteCudBillingRecord(record.id)
                              }
                            >
                              <Icons.DeleteIcon sx={iconStyle} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar" placement="top-end" arrow>
                            <Link
                              to={`/billingRecords/cudBillingRecords/edit/${record.id}`}
                            >
                              <Icons.EditIcon sx={iconStyle} />
                            </Link>
                          </Tooltip>
                        </div>
                      </td>
                    )}
                    <td style={colStyle}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.profesionales.nombreyapellidoprofesional}
                      </span>
                    </td>
                    <td style={colStyle}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.pacientes.nombreyapellidopaciente}
                      </span>
                    </td>
                    <td style={colStyle}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.profesionales.especialidadprofesional}
                      </span>
                    </td>
                    <td style={colStyle}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.periodofacturado
                          ? monthFormat(record.periodofacturado)
                          : "Sin fecha"}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.fechapresentacionos
                          ? dateFormat(record.fechapresentacionos)
                          : "Sin fecha"}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={inLineStyle}>
                        <TrafficLightStatus status={record.estadofacturacion} />
                        {record.estadofacturacion}
                      </span>
                    </td>
                    <td style={colStyle}>
                      {record.documentofacturamensual ? (
                        <Link
                          to={record.documentofacturamensual}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Documento Fact. Mensual
                        </Link>
                      ) : (
                        "Sin Documento"
                      )}
                    </td>
                    <td style={colStyle}>
                      {record.imgasistenciamensual ? (
                        <Link
                          to={record.imgasistenciamensual}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Documento Asist. Mensual
                        </Link>
                      ) : (
                        "Sin Documento"
                      )}
                    </td>

                    <td>{currencyFormat(record.montofacturado)}</td>
                    <td style={{ padding: "16px" }}>{record.nrofactura}</td>
                    <td style={colStyle}>
                      {record.pacientes.obrasocialpaciente}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.fecharecepcionos
                        ? dateFormat(record.fecharecepcionos)
                        : "Sin fecha"}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <Button
                        size="small"
                        startIcon={<Icons.ErrorIcon />}
                        variant="contained"
                      >
                        Reclamos
                      </Button>
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.fechacobro
                        ? dateFormat(record.fechacobro)
                        : "Sin fecha"}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montopercibido)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montopercibido * 0.35)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montofinalprofesional)}
                    </td>
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
                    colSpan={editMode ? 9 : 8}
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Totales:
                  </td>
                  <td>{currencyFormat(totalMontoFacturado)}</td>
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
                  <td style={{ padding: "16px" }}>
                    {currencyFormat(totalMontoPercibido)}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {currencyFormat(totalRetencion)}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {currencyFormat(totalProfesional)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
