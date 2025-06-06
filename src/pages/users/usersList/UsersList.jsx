import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "../../../assets/css/globalFormat.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { EditModeButtonGroupContainer } from "../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";
import { GeneralBarContainer } from "../../../components/layouts/generalBar/GeneralBarContainer";
import { normalizeName } from "../../../utils/helpers";

export const UsersList = (usersListProps) => {
  const {
    users,
    editMode,
    setEditMode,
    handleDeleteUser,
    active,
    handleUndeleteUser,
  } = usersListProps;

  const generalBarContainerProps = {
    editMode,
    setEditMode,
    buttonText: "Usuario",
    buttonIcon: <Icons.PersonAddIcon />,
    to: "/users/createUser",

    enableReportBar: false,
    enableSearchFilterBar: false,
  };

  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "5px" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {active === "active" && "Lista de usuarios"}
        {active === "inactive" && "Lista de usuarios inactivos"}
      </Box>

      {/* Para los registros inactivos se deshabilita la barra de edición */}

      {active === "active" && (
        <GeneralBarContainer {...generalBarContainerProps} />
      )}

      <Box className="generalSubTitle">
        {`${users.length} registros obtenidos`}
      </Box>
      <Box className="listContainer">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icons.AssignmentIndIcon sx={iconStyle} />
                  {user.perfil}
                </Typography>
                <Icons.PersonIcon sx={{ fontSize: "4em" }} />
                <Typography gutterBottom variant="h5">
                  {normalizeName(user.nombreyapellidousuario)}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.MailIcon sx={{ mr: 1 }} />
                  <b>Email:</b> {user.email}
                </Typography>
                {user.professionalid && (
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Icons.PersonIcon sx={{ mr: 1 }} />
                    <b>Profesional:</b>
                    {normalizeName(
                      user.profesionales?.nombreyapellidoprofesional
                    )}
                  </Typography>
                )}
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icons.PersonIcon sx={{ mr: 1 }} />
                  <b>ID:</b>
                  {user.auth_user_id}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {editMode && active === "active" && (
                  <EditModeButtonGroupContainer
                    deleteFunction={() =>
                      handleDeleteUser(user.id, user.nombreyapellidousuario)
                    }
                    editLink={`/users/edit/${user.id}`}
                    isAllowed={true}
                  />
                )}
                {active === "inactive" && (
                  <Tooltip title="Restaurar usuario" placement="top-end" arrow>
                    <IconButton
                      onClick={() =>
                        handleUndeleteUser(user.id, user.nombreyapellidousuario)
                      }
                    >
                      <Icons.RestoreFromTrashIcon sx={iconStyle} />
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "90%",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      >
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
