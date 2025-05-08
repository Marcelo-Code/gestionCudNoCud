import { Box, FormGroup, IconButton, TextField, Tooltip } from "@mui/material";
import "./createEditNoCudBillingRecord.css";
import "../../../../assets/css/globalFormat.css";
import { OptionSelect } from "../../../../components/common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../../components/common/formButtonGroup/FormButtonGroupContainer";

import { Icons } from "../../../../assets/Icons";
import { noCudBillingOptions } from "../../../../data/documentsData";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";

export const CreateEditNoCudBillingRecord = (createEditCudBillingProps) => {
  const {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    patients,
    professionals,
    documentoFacturaFileInputRef,
    comprobanteRetencionFileInputRef,
    handleRemoveFile,
    currentMonth,
    patient,
    professional,
    patientId,
    professionalId,
    noCudBillingRecordId,
  } = createEditCudBillingProps;

  const elementStyle = {
    margin: "10px",
    width: "200px",
    backgroundColor: "white",
  };

  const formButtonGroupProps = {
    modifiedFlag,
    isLoadingButton,
  };

  const iconsStyle = { marginRight: "5px" };

  const iconsUploadStyle = { color: "blue", fontSize: "1.2em" };
  const iconsUploadStyleDisabled = { color: "gray", fontSize: "1.2em" };

  console.log(formData.idpaciente);

  let title = "Facturación no CUD";

  if (!noCudBillingRecordId) {
    if (patientId) {
      title = `Crear nueva facturación no CUD paciente ${
        patient?.nombreyapellidopaciente || ""
      }`;
    } else if (professionalId) {
      title = `Crear nueva facturación no CUD profesional ${
        professional?.nombreyapellidoprofesional || ""
      }`;
    } else {
      title = "Crear nueva facturación no CUD";
    }
  } else {
    if (patientId) {
      title = `Editar facturación no CUD paciente ${
        patient?.nombreyapellidopaciente || ""
      }`;
    } else if (professionalId) {
      title = `Editar facturación no CUD profesional ${
        professional?.nombreyapellidoprofesional || ""
      }`;
    } else {
      title = "Editar facturación no CUD";
    }
  }

  return (
    <div className="generalContainer">
      <span className="generalTitle">{title}</span>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box className="createEditPatientItem">
            <Box className="createEditPatientElement">
              <Icons.PersonIcon sx={iconsStyle} />
              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) =>
                    `${option.nombreyapellidoprofesional}`
                  }
                  name="idprofesional"
                  placeholder="Seleccionar profesional"
                  clients={professionals}
                  value={formData.idprofesional}
                  onChange={handleChange}
                  label={"Profesional"}
                  required
                  disabled={professionalId ? true : false}
                />
              </Box>
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MedicationIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Prestación"
                variant="outlined"
                name="prestacion"
                onChange={handleChange}
                required
                value={formData.prestacion || "Selecc. profesional"}
                disabled={true}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon sx={iconsStyle} />
              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) =>
                    `${option.nombreyapellidopaciente}`
                  }
                  name="idpaciente"
                  placeholder="Seleccionar paciente"
                  clients={patients}
                  value={formData.idpaciente}
                  onChange={handleChange}
                  label={"Paciente"}
                  required
                  disabled={patientId ? true : false}
                />
              </Box>
            </Box>
            <Box className="createEditPatientElement">
              <Icons.CalendarMonthIcon />
              <TextField
                sx={elementStyle}
                label="Fecha sesión"
                name="fechasesion"
                onChange={handleChange}
                required
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.fechasesion || ""}
              />
            </Box>
            <Box className="createBillingSelect">
              <Box sx={{ marginRight: "10px" }}>
                <TrafficLightStatus status={formData.estadopago} />
              </Box>
              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="estadopago"
                  placeholder="Seleccionar estado"
                  clients={noCudBillingOptions}
                  value={formData.estadopago}
                  onChange={handleChange}
                  label={"Estado pago"}
                  required
                />
              </Box>
            </Box>

            {formData.estadopago === "pagado" && (
              <>
                <Box className="createEditPatientElement">
                  <Icons.CalendarMonthIcon />
                  <TextField
                    sx={elementStyle}
                    label="Fecha de pago"
                    name="fechadepago"
                    onChange={handleChange}
                    required={formData.estadopago === "pagado"}
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.fechadepago}
                    disabled={formData.estadopago !== "pagado"}
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Medio de pago"
                    variant="outlined"
                    name="mediopago"
                    onChange={handleChange}
                    required={formData.estadopago === "pagado"}
                    value={formData.mediopago}
                    disabled={formData.estadopago !== "pagado"}
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Monto sesión"
                    variant="outlined"
                    name="montosesion"
                    onChange={handleChange}
                    value={parseFloat(formData.montosesion).toFixed(2)}
                    type="number"
                    disabled={formData.estadopago !== "pagado"}
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Retención"
                    variant="outlined"
                    name="retencion"
                    onChange={handleChange}
                    required={formData.estadopago === "pagado"}
                    value={parseFloat(formData.retencion).toFixed(2)}
                    type="number"
                    disabled={true}
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Monto final profesional"
                    variant="outlined"
                    name="montofinalprofesional"
                    onChange={handleChange}
                    required={formData.estadopago === "pagado"}
                    value={parseFloat(formData.montofinalprofesional).toFixed(
                      2
                    )}
                    type="number"
                    disabled={true}
                  />
                </Box>

                {/* Selector de archivos factura mensual */}
                <Box className="createEditPatientElement">
                  <input
                    type="file"
                    ref={documentoFacturaFileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                    name="documentofactura"
                    disabled={formData.estadopago !== "pagado"}
                  />

                  {formData.documentofactura ? (
                    <Tooltip title="Quitar archivo" placement="top-end" arrow>
                      <IconButton
                        onClick={() => handleRemoveFile("documentofactura")}
                        sx={{ margin: 0, padding: 0 }}
                      >
                        <Icons.ClearIcon
                          sx={
                            formData.estadopago === "pagado"
                              ? iconsUploadStyle
                              : iconsUploadStyleDisabled
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Seleccionar archivo"
                      placement="top-end"
                      arrow
                    >
                      <IconButton
                        onClick={() =>
                          documentoFacturaFileInputRef.current.click()
                        }
                        sx={{ margin: 0, padding: 0 }}
                      >
                        <Icons.UploadIcon
                          sx={
                            formData.estadopago === "pagado"
                              ? iconsUploadStyle
                              : iconsUploadStyleDisabled
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Doc. factura familia"
                    variant="outlined"
                    required={formData.estadopago === "pagado"}
                    name="documentofactura"
                    value={
                      !formData.documentofactura
                        ? "No seleccionado"
                        : typeof formData.documentofactura === "object"
                        ? formData.documentofactura.name
                        : "Doc. factura mensual"
                    }
                    disabled={true}
                    InputLabelProps={{ shrink: true }} // 👈 Esto mantiene el label flotante
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-disabled": {
                        color: "black", // texto
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "black", // label
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black", // borde
                      },
                    }}
                  />
                </Box>

                {/* Selector de comprobante de retención */}
                <Box className="createEditPatientElement">
                  <input
                    type="file"
                    ref={comprobanteRetencionFileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                    name="documentocomprobantepagoretencion"
                    disabled={formData.estadopago !== "pagado"}
                  />
                  {formData.documentocomprobantepagoretencion ? (
                    <Tooltip title="Quitar archivo" placement="top-end" arrow>
                      <IconButton
                        onClick={() =>
                          handleRemoveFile("documentocomprobantepagoretencion")
                        }
                        sx={{ margin: 0, padding: 0 }}
                      >
                        <Icons.ClearIcon
                          sx={
                            formData.estadopago === "pagado"
                              ? iconsUploadStyle
                              : iconsUploadStyleDisabled
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Seleccionar archivo"
                      placement="top-end"
                      arrow
                    >
                      <IconButton
                        onClick={() =>
                          comprobanteRetencionFileInputRef.current.click()
                        }
                        sx={{ margin: 0, padding: 0 }}
                      >
                        <Icons.UploadIcon
                          sx={
                            formData.estadopago === "pagado"
                              ? iconsUploadStyle
                              : iconsUploadStyleDisabled
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Doc. comprobante retención"
                    variant="outlined"
                    // required={formData.estadopago === "pagado"}
                    name="documentocomprobantepagoretencion"
                    value={
                      !formData.documentocomprobantepagoretencion
                        ? "No seleccionado"
                        : typeof formData.documentocomprobantepagoretencion ===
                          "object"
                        ? formData.documentocomprobantepagoretencion.name
                        : "Doc. asistencia mensual"
                    }
                    disabled={true}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-disabled": {
                        color: "black", // texto
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "black", // label
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black", // borde
                      },
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
          <FormButtonGroupContainer {...formButtonGroupProps} />
        </FormGroup>
      </form>
    </div>
  );
};
