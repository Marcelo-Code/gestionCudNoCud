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
    to: "/billingRecords/createNoCudBillingRecord",
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
                    "Modo Pago",
                    "Medio de Pago",
                    "Destinatario",
                    "Monto Sesión",
                    "35% Retención",
                    "Monto Final Profesional",
                    "Fecha de Pago",
                    "Destinatario",
                    "Paciente Adeuda",
                    "Fecha Deuda",
                    "Pago Monto Adeudado",
                    "Fecha Pago",
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
                            // onClick={() =>
                            //   handleDeleteCudBillingRecord(record.id)
                            // }
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
                    <td style={{ padding: "16px" }}>{record.modopago}</td>
                    <td style={{ padding: "16px" }}>{record.mediopago}</td>
                    <td style={{ padding: "16px" }}>{record.destinatario}</td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montosesion)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.retencion)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {currencyFormat(record.montofinalprofesional)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.fechadepago
                        ? dateFormat(record.fechadepago)
                        : "Sin fecha"}
                    </td>
                    <td style={{ padding: "16px" }}>{record.destinatario}</td>
                    <td style={{ padding: "16px" }}>
                      {record.pacienteadeuda ? "Si" : "No"}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.fechadeuda
                        ? dateFormat(record.fechadeuda)
                        : "Sin fecha"}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.pagomontoadeudado}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {record.fechadeuda
                        ? dateFormat(record.fechapagomontoadeudado)
                        : "Sin fecha"}
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
                    colSpan={editMode ? 7 : 6}
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
