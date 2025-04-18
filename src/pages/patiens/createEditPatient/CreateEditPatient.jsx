import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./createEditPatient.css";
import "../../../assets/css/globalFormat.css";
import { FormButtonGroupContainer } from "../../../components/common/formButtonGroup/FormButtonGroupContainer";
import { NumericFormat } from "react-number-format";

export const CreateEditPatient = ({
  handleSubmit,
  handleChange,
  isLoadingButton,
  modifiedFlag,
  formData,
  dniMatch,
  foundPatient,
  patientId,
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
        {patientId ? "Editar Paciente" : "Crear nuevo paciente"}
      </span>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box className="createEditPatientItem">
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre y Apellido Paciente"
                variant="outlined"
                name="nombreyapellidopaciente"
                onChange={handleChange}
                required
                value={formData.nombreyapellidopaciente}
              />
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
                required
                value={formData.obrasocialpaciente}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.WhatsAppIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Teléfono Obra Social"
                variant="outlined"
                name="telefonoobrasocial"
                onChange={handleChange}
                required
                value={formData.telefonoobrasocial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MailIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="e-mail 1 Obra Social"
                variant="outlined"
                name="email1obrasocial"
                type="email"
                onChange={handleChange}
                required
                value={formData.email1obrasocial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MailIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="e-mail 2 Obra Social"
                variant="outlined"
                name="email2obrasocial"
                type="email"
                onChange={handleChange}
                value={formData.email2obrasocial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MailIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="e-mail 3 Obra Social"
                variant="outlined"
                name="email3obrasocial"
                type="email"
                onChange={handleChange}
                value={formData.email3obrasocial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Referente Obra Social"
                variant="outlined"
                name="nombreyapellidoreferenteobrasocial"
                onChange={handleChange}
                required
                value={formData.nombreyapellidoreferenteobrasocial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.CardMembershipIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nro Afiliado"
                variant="outlined"
                name="nroafiliadopaciente"
                onChange={handleChange}
                required
                value={formData.nroafiliadopaciente}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.ImportContactsIcon />
              <NumericFormat
                customInput={TextField}
                label="DNI"
                name="dnipaciente"
                style={elementStyle}
                value={formData.dnipaciente}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "dnipaciente",
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
                    ? `El DNI ya existe: ${foundPatient.nombreyapellidopaciente}`
                    : ""
                }
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.EventIcon />
              <TextField
                sx={elementStyle}
                label="Fecha nacimiento"
                name="fechanacimientopaciente"
                onChange={handleChange}
                required
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.fechanacimientopaciente}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.MedicationIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Diagnóstico Previo"
                variant="outlined"
                name="diagnosticoprevio"
                onChange={handleChange}
                required
                value={formData.diagnosticoprevio}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.HouseIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
                name="direccionpaciente"
                onChange={handleChange}
                required
                value={formData.direccionpaciente}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.LocationCityIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudadpaciente"
                onChange={handleChange}
                required
                value={formData.ciudadpaciente}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre y Apellido Responsable"
                variant="outlined"
                name="nombreyapellidoresponsable"
                onChange={handleChange}
                required
                value={formData.nombreyapellidoresponsable}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.WhatsAppIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Teléfono Responsable"
                variant="outlined"
                name="telefonoresponsable"
                onChange={handleChange}
                required
                value={formData.telefonoresponsable}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.SchoolIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Escuela"
                variant="outlined"
                name="escuela"
                onChange={handleChange}
                required
                value={formData.escuela}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.SchoolIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Dirección Escuela"
                variant="outlined"
                name="direccionescuela"
                onChange={handleChange}
                required
                value={formData.direccionescuela}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.WhatsAppIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Teléfono Escuela"
                variant="outlined"
                name="telefonoescuela"
                onChange={handleChange}
                required
                value={formData.telefonoescuela}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.SchoolIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Año/Grado/Sala"
                variant="outlined"
                name="aniogradosala"
                onChange={handleChange}
                required
                value={formData.aniogradosala}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre Docente Referente"
                variant="outlined"
                name="nombreyapellidodocentereferenteescuela"
                onChange={handleChange}
                required
                value={formData.nombreyapellidodocentereferenteescuela}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre Directivo Escuela"
                variant="outlined"
                name="nombreyapellidodirectivoescuela"
                onChange={handleChange}
                required
                value={formData.nombreyapellidodirectivoescuela}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.SchoolIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Escuela Especial"
                variant="outlined"
                name="escuelaespecial"
                onChange={handleChange}
                value={formData.escuelaespecial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre Docente Ref. Esc. Esp."
                variant="outlined"
                name="nombreyapellidodocentereferenteescuelaespecial"
                onChange={handleChange}
                value={formData.nombreyapellidodocentereferenteescuelaespecial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.WhatsAppIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Tel. Ref. Escuela Esp."
                variant="outlined"
                name="telefonodocentereferenteescuelaespecial"
                onChange={handleChange}
                value={formData.telefonodocentereferenteescuelaespecial}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.CardMembershipIcon />
              <Box>CUD</Box>
              <RadioGroup
                row
                style={elementStyle}
                name="cud"
                value={formData.cud ? "yes" : "no"}
                onChange={(e) => {
                  const value = e.target.value === "yes";
                  handleChange({
                    target: {
                      name: "cud",
                      value: value,
                    },
                  });
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            {formData.cud && (
              <Box className="createEditPatientElement">
                <Icons.EventIcon />
                <TextField
                  sx={elementStyle}
                  label="Fecha vto. CUD"
                  name="fechavencimientocud"
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.fechavencimientocud}
                />
              </Box>
            )}
            <Box className="createEditPatientElement">
              <Icons.EventIcon />
              <TextField
                sx={elementStyle}
                label="Fecha initio tto."
                name="fechainiciotto"
                value={formData.fechainiciotto}
                onChange={handleChange}
                required
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
          <FormButtonGroupContainer {...formButtonGroupProps} />
        </FormGroup>
      </form>
    </div>
  );
};
