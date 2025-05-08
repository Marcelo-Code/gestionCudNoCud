import { Box, FormGroup, IconButton, TextField, Tooltip } from "@mui/material";
import "./createEditCudBillingRecord.css";
import "../../../../assets/css/globalFormat.css";
import { OptionSelect } from "../../../../components/common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../../components/common/formButtonGroup/FormButtonGroupContainer";

import { Icons } from "../../../../assets/Icons";
import { billingOptions } from "../../../../data/documentsData";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { formatToInputMonth } from "../../../../utils/helpers";

export const CreateEditCudBillingRecord = (createEditCudBillingProps) => {
  const elementStyle = {
    margin: "10px",
    width: "200px",
    backgroundColor: "white",
  };

  const {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    patientId,
    professionalId,
    cudBillingRecordId,
    patients,
    professionals,
    facturaMensualFileInputRef,
    asistenciaMensualFileInputRef,
    comprobantePagoRetencionFileInputRef,
    handleRemoveFile,
    existingCudBillingNumber,
    currentMonth,
    patient,
    professional,
  } = createEditCudBillingProps;

  const formButtonGroupProps = {
    modifiedFlag,
    isLoadingButton,
  };

  const iconsStyle = { marginRight: "5px" };

  const iconsUploadStyle = { color: "blue", fontSize: "1.2em" };

  let title = "Facturación CUD";

  if (!cudBillingRecordId) {
    if (patientId) {
      title = `Crear nueva facturación CUD paciente ${
        patient?.nombreyapellidopaciente || ""
      }`;
    } else if (professionalId) {
      title = `Crear nueva facturación CUD profesional ${
        professional?.nombreyapellidoprofesional || ""
      }`;
    } else {
      title = "Crear nueva facturación CUD";
    }
  } else {
    if (patientId) {
      title = `Editar facturación CUD paciente ${
        patient?.nombreyapellidopaciente || ""
      }`;
    } else if (professionalId) {
      title = `Editar facturación CUD profesional ${
        professional?.nombreyapellidoprofesional || ""
      }`;
    } else {
      title = "Editar facturación CUD";
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
              <Icons.CardMembershipIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Obra Social"
                variant="outlined"
                name="obrasocialpaciente"
                onChange={handleChange}
                disabled={true}
                required
                value={formData.obrasocialpaciente || "Selecc. paciente"}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.CalendarMonthIcon />
              <TextField
                sx={elementStyle}
                label="Período facturado"
                name="periodofacturado"
                onChange={handleChange}
                required
                variant="outlined"
                type="month"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: currentMonth, // limita al mes actual
                }}
                value={formatToInputMonth(formData.periodofacturado)}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.ReceiptIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nro factura"
                variant="outlined"
                name="nrofactura"
                onChange={handleChange}
                required
                value={formData.nrofactura}
                error={existingCudBillingNumber}
                helperText={
                  existingCudBillingNumber && "El número de factura ya existe"
                }
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MonetizationOnIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Monto facturado"
                variant="outlined"
                name="montofacturado"
                onChange={handleChange}
                required
                value={formData.montofacturado}
                type="number"
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.CalendarMonthIcon />
              <TextField
                sx={elementStyle}
                label="Presentación O.S."
                name="fechapresentacionos"
                onChange={handleChange}
                required
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.fechapresentacionos}
              />
            </Box>

            {/* Selector de archivos factura mensual */}
            <Box className="createEditPatientElement">
              <input
                type="file"
                ref={facturaMensualFileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
                name="documentofacturamensual"
              />

              {formData.documentofacturamensual ? (
                <Tooltip title="Quitar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() => handleRemoveFile("documentofacturamensual")}
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.ClearIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Seleccionar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() => facturaMensualFileInputRef.current.click()}
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.UploadIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              )}
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Doc. factura mensual"
                variant="outlined"
                required
                value={
                  !formData.documentofacturamensual
                    ? "No seleccionado"
                    : typeof formData.documentofacturamensual === "object"
                    ? formData.documentofacturamensual.name
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

            {/* Selector de archivos comrobante retención */}
            <Box className="createEditPatientElement">
              <input
                type="file"
                ref={comprobantePagoRetencionFileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
                name="documentocomprobantepagoretencion"
              />
              {formData.documentocomprobantepagoretencion ? (
                <Tooltip title="Quitar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() =>
                      handleRemoveFile("documentocomprobantepagoretencion")
                    }
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.ClearIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Seleccionar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() =>
                      comprobantePagoRetencionFileInputRef.current.click()
                    }
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.UploadIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              )}
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Doc. comprobante retención"
                variant="outlined"
                value={
                  !formData.documentocomprobantepagoretencion
                    ? "No seleccionado"
                    : typeof formData.documentocomprobantepagoretencion ===
                      "object"
                    ? formData.documentocomprobantepagoretencion.name
                    : "Doc. pago retención"
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

            {/* Selector de archivos factura mensual */}
            <Box className="createEditPatientElement">
              <input
                type="file"
                ref={asistenciaMensualFileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
                name="imgasistenciamensual"
              />
              {formData.imgasistenciamensual ? (
                <Tooltip title="Quitar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() => handleRemoveFile("imgasistenciamensual")}
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.ClearIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Seleccionar archivo" placement="top-end" arrow>
                  <IconButton
                    onClick={() =>
                      asistenciaMensualFileInputRef.current.click()
                    }
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <Icons.UploadIcon sx={iconsUploadStyle} />
                  </IconButton>
                </Tooltip>
              )}
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Doc. asistencia mensual"
                variant="outlined"
                required
                value={
                  !formData.imgasistenciamensual
                    ? "No seleccionado"
                    : typeof formData.imgasistenciamensual === "object"
                    ? formData.imgasistenciamensual.name
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
            <Box className="createBillingSelect">
              <Box sx={{ marginRight: "10px" }}>
                <TrafficLightStatus status={formData.estadofacturacion} />
              </Box>
              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="estadofacturacion"
                  placeholder="Seleccionar estado"
                  clients={billingOptions}
                  value={formData.estadofacturacion}
                  onChange={handleChange}
                  label={"Estado facturación"}
                  required
                />
              </Box>
            </Box>

            {formData.estadofacturacion === "recibido" && (
              <Box className="createEditPatientElement">
                <Icons.CalendarMonthIcon />
                <TextField
                  sx={elementStyle}
                  label="Recepción O.S."
                  name="fecharecepcionos"
                  onChange={handleChange}
                  required={formData.estadofacturacion === "recibido"}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.fecharecepcionos}
                  disabled={formData.estadofacturacion !== "recibido"}
                />
              </Box>
            )}
            {formData.estadofacturacion === "pagado" && (
              <>
                <Box className="createEditPatientElement">
                  <Icons.CalendarMonthIcon />
                  <TextField
                    sx={elementStyle}
                    label="Fecha cobro"
                    name="fechacobro"
                    onChange={handleChange}
                    required={formData.estadofacturacion === "pagado"}
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.fechacobro}
                    disabled={formData.estadofacturacion !== "pagado"}
                  />
                </Box>

                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Monto percibido"
                    variant="outlined"
                    name="montopercibido"
                    onChange={handleChange}
                    required={formData.estadofacturacion === "pagado"}
                    value={formData.montopercibido}
                    disabled={formData.estadofacturacion !== "pagado"}
                    type="number"
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Retención 35%"
                    variant="outlined"
                    name="retención"
                    onChange={handleChange}
                    required={formData.estadofacturacion === "pagado"}
                    value={parseFloat(formData.retencion).toFixed(2)}
                    disabled={true}
                    type="number"
                  />
                </Box>
                <Box className="createEditPatientElement">
                  <Icons.MonetizationOnIcon />
                  <TextField
                    style={elementStyle}
                    id="outlined-basic"
                    label="Monto Final"
                    variant="outlined"
                    name="montofinalprofesional"
                    onChange={handleChange}
                    required={formData.estadofacturacion === "pagado"}
                    value={parseFloat(formData.montofinalprofesional).toFixed(
                      2
                    )}
                    disabled={true}
                    type="number"
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
