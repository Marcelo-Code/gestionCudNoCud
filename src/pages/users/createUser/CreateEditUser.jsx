import { Box, FormGroup, TextField } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./createEditUser.css";
import "../../../assets/css/globalFormat.css";
import { FormButtonGroupContainer } from "../../../components/common/formButtonGroup/FormButtonGroupContainer";
import { OptionSelect } from "../../../components/common/optionSelect/OptionSelect";
import { userProfiles } from "../../../data/documentsData";

export const CreateEditUser = (createEditUserProps) => {
  const {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    emailMatch,
    foundUser,
    userId,
    professionals,
  } = createEditUserProps;

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

  const helperText = emailMatch
    ? `Email en uso: ${foundUser.nombreyapellidousuario}`
    : "";

  return (
    <Box className="generalContainer">
      <span className="generalTitle">
        {userId ? "Editar usuario" : "Crear nuevo usuario"}
      </span>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box className="createEditPatientItem">
            <Box className="createEditPatientElement">
              <Icons.PersonIcon />
              <TextField
                style={elementStyle}
                id="outlined-basic"
                label="Nombre y Apellido Usuario"
                variant="outlined"
                name="nombreyapellidousuario"
                onChange={handleChange}
                required
                value={formData.nombreyapellidousuario}
              />
            </Box>

            <Box className="createEditPatientElement">
              <Icons.MailIcon />
              <TextField
                type="email"
                style={elementStyle}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                required
                value={formData.email}
                error={emailMatch}
                helperText={helperText}
                disabled={userId ? true : false}
              />
            </Box>
            <Box className="createEditPatientElement">
              <Icons.PersonIcon sx={iconsStyle} />
              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="perfil"
                  placeholder="Seleccionar perfil"
                  clients={userProfiles}
                  value={formData.perfil}
                  onChange={handleChange}
                  label={"Perfil"}
                />
              </Box>
            </Box>
            <Box className="createEditPatientElement">
              <Icons.AssignmentIndIcon sx={iconsStyle} />

              <Box sx={{ width: "200px" }}>
                <OptionSelect
                  getOptionLabel={(option) =>
                    `${option.nombreyapellidoprofesional}`
                  }
                  name="professionalid"
                  placeholder="Seleccionar profesional"
                  clients={professionals}
                  value={formData.professionalid}
                  onChange={handleChange}
                  label={"Profesional"}
                  disabled={formData.perfil === "admin"}
                />
              </Box>
            </Box>
          </Box>
          <FormButtonGroupContainer {...formButtonGroupProps} />
        </FormGroup>
      </form>
    </Box>
  );
};
