import { Box, FormGroup, TextField } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./createEditProfessional.css";
import "../../../assets/css/globalFormat.css";
import { FormButtonGroupContainer } from "../../../components/common/formButtonGroup/FormButtonGroupContainer";
import { NumericFormat } from "react-number-format";

export const CreateEditProfessional = ({
  handleSubmit,
  handleChange,
  isLoadingButton,
  modifiedFlag,
  formData,
  dniMatch,
  foundProfessional,
  professionalId,
}) => {
  const elementStyle = {
    margin: "10px",
    width: "200px",
    backgroundColor: "white",
  };

  const formButtonGroupProps = {
    modifiedFlag,
    isLoadingButton,
  };

  return (
    <div className="generalContainer">
      <span className="generalTitle">
        {professionalId ? "Editar Profesional" : "Crear nuevo profesional"}
      </span>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box className="createEditProfessionalItem">
            <Box className="createEditProffessionalElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre y Apellido Profesional"
                variant="outlined"
                name="nombreyapellidoprofesional"
                onChange={handleChange}
                required
                value={formData.nombreyapellidoprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.MedicationIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Especialidad"
                variant="outlined"
                name="especialidadprofesional"
                onChange={handleChange}
                required
                value={formData.especialidadprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.CardMembershipIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Matrícula"
                variant="outlined"
                name="matriculaprofesional"
                onChange={handleChange}
                required
                value={formData.matriculaprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.ImportContactsIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="CUIT"
                variant="outlined"
                name="cuitprofesional"
                onChange={handleChange}
                required
                value={formData.cuitprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.ImportContactsIcon />
              <NumericFormat
                customInput={TextField}
                label="DNI"
                name="dniprofesional"
                style={elementStyle}
                value={formData.dniprofesional}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "dniprofesional",
                      value: value,
                    },
                  });
                }}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={0}
                allowNegative={false}
                allowLeadingZeros={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue >= 0;
                }}
                error={dniMatch}
                helperText={
                  dniMatch
                    ? `El DNI ya existe: ${foundProfessional.nombreyapellidoProfesional}`
                    : ""
                }
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.HouseIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionprofesional"
                onChange={handleChange}
                required
                value={formData.direccionprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.LocationCityIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadprofesional"
                onChange={handleChange}
                required
                value={formData.ciudadprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.CalendarMonthIcon />
              <TextField
                sx={elementStyle}
                label="Fecha Venc. RNP"
                name="fechavencimientornpprofesional"
                onChange={handleChange}
                required
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.fechavencimientornpprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.WhatsAppIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                name="telefonoprofesional"
                onChange={handleChange}
                required
                value={formData.telefonoprofesional}
              />
            </Box>
            <Box className="createEditProffessionalElement">
              <Icons.MailIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                name="emailprofesional"
                type="email"
                onChange={handleChange}
                required
                value={formData.emailprofesional}
              />
            </Box>
          </Box>
          <FormButtonGroupContainer {...formButtonGroupProps} />
        </FormGroup>
      </form>
    </div>
  );
};
