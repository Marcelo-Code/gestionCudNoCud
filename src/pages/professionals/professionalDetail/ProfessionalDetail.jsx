import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Icons } from "../../../assets/Icons";
import "./professionalDetail.css";
import "../../../assets/css/globalFormat.css";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";

export const ProfessionalDetail = (professionalDetailProps) => {
  const { formData, userProfile, userProfessionalId } = professionalDetailProps;

  const dataStyle = {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  };

  const lineStyle = {
    marginRight: "5px",
    marginLeft: "5px",
    verticalAlign: "middle",
  };

  const nameStyle = {
    textAlign: "center",
    borderBottom: "1px solid black",
    padding: "10px",
  };

  const emailStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "@media (max-width: 800px)": {
      gridTemplateColumns: "1fr",
    },
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Detalle de profesional</Box>

      <Card className="patientDetailContainer">
        <CardContent>
          <Typography gutterBottom variant="h7" component="div" sx={emailStyle}>
            <Box>
              <Icons.PhoneInTalkIcon sx={lineStyle} />
              <a
                href={`https://wa.me/${formData.telefonoprofesional}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.telefonoprofesional}
              </a>
            </Box>

            {formData.emailprofesional !== "" && (
              <Box>
                <Icons.MailIcon sx={lineStyle} />
                <a href={`mailto:${formData.emailprofesional}`}>
                  {formData.emailprofesional}
                </a>
              </Box>
            )}
          </Typography>
          <Typography sx={nameStyle} gutterBottom variant="h4" component="div">
            {formData.nombreyapellidoprofesional}
          </Typography>
        </CardContent>
        <CardContent sx={gridStyle}>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CardMembershipIcon sx={lineStyle} />
            <b style={lineStyle}>Especialidad: </b>
            {formData.especialidadprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon sx={lineStyle} />
            <b style={lineStyle}>Matrícula: </b>
            {formData.matriculaprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.ImportContactsIcon sx={lineStyle} />
            <b style={lineStyle}>CUIT: </b>
            {formData.cuitprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.ImportContactsIcon sx={lineStyle} />
            <b style={lineStyle}>DNI: </b>
            {formData.dniprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.HouseIcon sx={lineStyle} />
            <b style={lineStyle}>Dirección: </b>
            {formData.direccionprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.LocationCityIcon sx={lineStyle} />
            <b style={lineStyle}>Ciudad: </b>
            {formData.ciudadprofesional}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Fecha Vencimiento RNP: </b>
            {dateFormat(formData.fechavencimientornpprofesional)}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Fecha Última Actualización: </b>
            {dateFormat(formData.fechaultimaactualizacion)}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              margin: "10px",
            }}
          >
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Link to={`/professionals/documentation/${formData.id}`}>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<Icons.DescriptionIcon />}
                >
                  Documentación
                </Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Link to={`/billingRecords/list/professional/${formData.id}`}>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  startIcon={<Icons.ReceiptIcon />}
                >
                  Facturación
                </Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Link to={`/medicalRecords/list/professional/${formData.id}`}>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  startIcon={<Icons.LocalHospitalIcon />}
                >
                  H. Report
                </Button>
              </Link>
            </Box>
            {userProfile !== "admin" && (
              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <Link to={`/professionals/edit/${userProfessionalId}`}>
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    startIcon={<Icons.EditIcon />}
                  >
                    Edición
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </CardActions>
        <CardActions>
          <BackButtonContainer />
        </CardActions>
      </Card>
    </Box>
  );
};
