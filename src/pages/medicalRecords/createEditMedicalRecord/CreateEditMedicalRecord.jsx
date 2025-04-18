import { Box, FormGroup, TextareaAutosize, TextField } from "@mui/material";

import "./createEditMedicalRecord.css";
import "../../../assets/css/globalFormat.css";
import { Icons } from "../../../assets/Icons";
import { FormButtonGroupContainer } from "../../../components/common/formButtonGroup/formButtonGroupContainer";
import { OptionSelect } from "../../../components/common/optionSelect/OptionSelect";
import { SizeTextButtonGroupContainer } from "../../../components/common/sizeTextButtonGroup/SizeTextButtonGroupContainer";

export const CreateEditMedicalRecord = ({
  formData,
  meetings,
  patients,
  professionals,
  handleChange,
  handleSubmit,
  modifiedFlag,
  isLoadingButton,
  setTextSize,
  textSize,
  medicalRecordId,
  patientId,
  professionalId,
  professional,
  patient,
}) => {
  const formButtonGroupProps = {
    modifiedFlag,
    isLoadingButton,
  };

  const sizeTextButtonGroupContainerProps = { textSize, setTextSize };

  const textareaAutosizeStyle = {
    width: "90%",
    maxWidth: "1000px",
    height: "100px",
    fontSize: textSize,
  };

  const iconsStyle = { marginRight: "5px" };

  console.log(professional);

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {medicalRecordId
          ? professionalId
            ? `Editar consulta profesional ${professional.nombreyapellidoprofesional}`
            : patientId
            ? `Editar consulta paciente ${patient.nombreyapellidopaciente}`
            : "Editar Consulta"
          : "Crear Nueva Consulta"}
      </Box>
      <Box className="createEditMedicalRecordContainer">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Box className="createEditMedicalRecordMenuContainer">
              <Box className="createEditMedicalRecordMenuItemContainer">
                <Icons.CalendarMonthIcon />
                <TextField
                  label="Fecha consulta"
                  name="fechaconsulta"
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.fechaconsulta}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      backgroundColor: "white",
                    },
                    width: "100%",
                  }}
                />
              </Box>

              <Box className="createEditMedicalRecordMenuItemContainer">
                <Icons.PersonIcon sx={iconsStyle} />
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

              <Box className="createEditMedicalRecordMenuItemContainer">
                <Icons.PersonIcon sx={iconsStyle} />
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
                  disabled={professionalId ? true : false}
                  required
                />
              </Box>
              <Box className="createEditMedicalRecordMenuItemContainer">
                <Icons.GroupsIcon sx={iconsStyle} />
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="tipoconsulta"
                  placeholder="Seleccionar consulta"
                  clients={meetings}
                  value={formData.tipoconsulta}
                  onChange={handleChange}
                  label={"Consulta"}
                  required
                />
              </Box>
            </Box>

            {/* Barra de botones para cambiar el tamaño del texto */}
            <SizeTextButtonGroupContainer
              {...sizeTextButtonGroupContainerProps}
            />

            <Box className="createEditMedicalRecordTextAreaContainer">
              <TextareaAutosize
                style={textareaAutosizeStyle}
                aria-label="minimum height"
                minRows={3}
                placeholder="Escribí el texto de tu consulta"
                name="descripcion"
                onChange={handleChange}
                value={formData.descripcion}
              />
            </Box>
            <Box className="createEditMedicalRecordTextAreaContainer">
              <Box sx={{ width: "90%", maxWidth: "1000px" }}>
                <FormButtonGroupContainer {...formButtonGroupProps} />
              </Box>
            </Box>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};
