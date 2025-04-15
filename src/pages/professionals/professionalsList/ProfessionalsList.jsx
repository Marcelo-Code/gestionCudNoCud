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

export const ProfessionalsList = (professionalsListProps) => {
  const {
    professionals,
    editMode,
    setEditMode,
    handleDeleteProfessional,
    handleUndeleteProfessional,
    active,
  } = professionalsListProps;

  const generalBarContainerProps = {
    editMode,
    setEditMode,
    buttonText: "Profesional",
    buttonIcon: <Icons.PersonAddIcon />,
    to: "/professionals/createProfessional",

    enableReportBar: false,
    enableSearchFilterBar: false,
  };

  const iconStyle = { color: "blue", fontSize: "1.5em", margin: "10px" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        Lista de profesionales {active === "inactive" && "inactivos"}
      </Box>
      {/* <EditionBarContainer {...editionBarProps} /> */}
      {active === "active" && (
        <GeneralBarContainer {...generalBarContainerProps} />
      )}

      <Box className="generalSubTitle">{`${professionals.length} registros obtenidos`}</Box>
      <Box className="listContainer">
        {professionals.map((professional) => {
          return (
            <Card
              key={professional.id}
              sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Icons.PersonIcon sx={{ fontSize: "4em" }} />
                <Typography gutterBottom variant="h5">
                  {professional.nombreyapellidoprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.MedicationIcon sx={{ mr: 1 }} />
                  <b>Especialidad:</b> {professional.especialidadprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.CardMembershipIcon sx={{ mr: 1 }} />
                  <b>Matrícula:</b> {professional.matriculaprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.CardMembershipIcon sx={{ mr: 1 }} />
                  <b>CUIT:</b> {professional.cuitprofesional}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.CalendarMonthIcon sx={{ mr: 1 }} />
                  <b>Última Act.:</b> {professional.fechaultimaactualizacion}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode && active === "active" && (
                  // <>
                  //   <Link
                  //     onClick={() =>
                  //       handleDeleteProfessional(
                  //         professional.id,
                  //         professional.nombreyapellidoprofesional
                  //       )
                  //     }
                  //   >
                  //     <Icons.DeleteIcon
                  //       sx={{ margin: "10px", fontSize: "2em" }}
                  //     />
                  //   </Link>
                  //   <Link to={`/professionals/edit/${professional.id}`}>
                  //     <Icons.EditIcon
                  //       sx={{ margin: "10px", fontSize: "2em" }}
                  //     />
                  //   </Link>
                  // </>
                  <EditModeButtonGroupContainer
                    deleteFunction={() =>
                      handleDeleteProfessional(
                        professional.id,
                        professional.nombreyapellidoprofesional
                      )
                    }
                    editLink={`/professionals/edit/${professional.id}`}
                  />
                )}
                {!editMode && active === "active" && (
                  <Link to={`/professionals/detail/${professional.id}`}>
                    <Button variant="outlined" fullWidth>
                      Ver detalles
                    </Button>
                  </Link>
                )}
                {active === "inactive" && (
                  <IconButton
                    onClick={() =>
                      handleUndeleteProfessional(
                        professional.id,
                        professional.nombreyapellidopaciente
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
