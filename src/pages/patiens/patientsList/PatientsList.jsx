import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../../../assets/css/globalFormat.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { EditModeButtonGroupContainer } from "../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";
import { GeneralBarContainer } from "../../../components/layouts/generalBar/GeneralBarContainer";
import { allowCondition } from "../../../routes/allowedConditions";

export const PatientsList = (patientsListProps) => {
  const {
    patients,
    editMode,
    setEditMode,
    handleDeletePatient,
    active,
    handleUndeletePatient,
    userProfile,
  } = patientsListProps;

  const generalBarContainerProps = {
    editMode,
    setEditMode,
    buttonText: "Paciente",
    buttonIcon: <Icons.PersonAddIcon />,
    to: "/patients/createPatient",

    enableReportBar: false,
    enableSearchFilterBar: false,
  };

  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "5px" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        Lista de pacientes {active === "inactive" && "inactivos"}
      </Box>

      {/* Para los registros inactivos se deshabilita la barra de edición */}
      {/* Solamente los usuarios admin pueden editar pacientes */}

      {active === "active" && userProfile === "admin" && (
        <GeneralBarContainer {...generalBarContainerProps} />
      )}

      <Box className="generalSubTitle">
        {`${patients.length} registros obtenidos`}
      </Box>
      <Box className="listContainer">
        {patients.map((patient) => {
          const isAllowed = allowCondition(userProfile);
          return (
            <Card
              key={patient.id}
              sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5">
                  {patient.obrasocialpaciente}
                </Typography>
                <Icons.PersonIcon sx={{ fontSize: "4em" }} />
                <Typography gutterBottom variant="h5">
                  {patient.nombreyapellidopaciente}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.CardMembershipIcon sx={{ mr: 1 }} />
                  <b>Nro afiliado:</b> {patient.nroafiliadopaciente}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.ImportContactsIcon sx={{ mr: 1 }} />
                  <b>DNI:</b> {patient.dnipaciente}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode && active === "active" && (
                  <EditModeButtonGroupContainer
                    deleteFunction={() =>
                      handleDeletePatient(
                        patient.id,
                        patient.nombreyapellidopaciente
                      )
                    }
                    editLink={`/patients/edit/${patient.id}`}
                    isAllowed={isAllowed}
                  />
                )}
                {!editMode && active === "active" && (
                  <Link to={`/patients/detail/${patient.id}`}>
                    <Button size="small" variant="outlined" fullWidth>
                      Ver detalles
                    </Button>
                  </Link>
                )}

                {/* Botón para restaurar registro */}
                {active === "inactive" && (
                  <IconButton
                    onClick={() =>
                      handleUndeletePatient(
                        patient.id,
                        patient.nombreyapellidopaciente
                      )
                    }
                  >
                    <Icons.RestoreFromTrashIcon sx={iconStyle} />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <BackButtonContainer />
    </Box>
  );
};
