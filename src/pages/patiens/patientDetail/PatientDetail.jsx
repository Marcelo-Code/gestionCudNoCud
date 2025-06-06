import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Icons } from "../../../assets/Icons";
import "./patientDetail.css";
import "../../../assets/css/globalFormat.css";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";

export const PatientDetail = (patientDetailProps) => {
  const { formData, patientAge, userProfessionalId } = patientDetailProps;

  const medicalRecordsListRoute = `/medicalRecords/list/patient`;
  // let medicalRecordsListRoute;
  // if (userProfessionalId) {
  //   medicalRecordsListRoute = `/medicalRecords/list/professional/${userProfessionalId}/patient`;
  // } else {
  //   medicalRecordsListRoute = `/medicalRecords/list/patient`;
  // }

  let billingRecordsListRoute;
  if (userProfessionalId) {
    billingRecordsListRoute = `/billingRecords/list/professional/${userProfessionalId}/patient`;
  } else {
    billingRecordsListRoute = `/billingRecords/list/patient`;
  }

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
      <Box className="generalTitle">Detalle de paciente</Box>
      <Card className="patientDetailContainer">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {formData.obrasocialpaciente}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={emailStyle}>
            <Box>
              <Icons.PhoneInTalkIcon sx={lineStyle} />
              <a
                href={`https://wa.me/${formData.telefonoobrasocial}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.telefonoobrasocial}
              </a>
            </Box>

            {formData.email1obrasocial !== "" && (
              <Box>
                <Icons.MailIcon sx={lineStyle} />
                <a href={`mailto:${formData.email1obrasocial}`}>
                  {formData.email1obrasocial}
                </a>
              </Box>
            )}

            {formData.email2obrasocial !== "" && (
              <Box>
                <Icons.MailIcon sx={lineStyle} />
                <a href={`mailto:${formData.email2obrasocial}`}>
                  {formData.email2obrasocial}
                </a>
              </Box>
            )}

            {formData.email3obrasocial !== "" && (
              <Box>
                <Icons.MailIcon sx={lineStyle} />
                <a href={`mailto:${formData.email3obrasocial}`}>
                  {formData.email3obrasocial}
                </a>
              </Box>
            )}
          </Typography>
          <Typography sx={nameStyle} gutterBottom variant="h4" component="div">
            {formData.nombreyapellidopaciente}
          </Typography>
        </CardContent>
        <CardContent sx={gridStyle}>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CardMembershipIcon sx={lineStyle} />
            <b style={lineStyle}>Nro afiliado: </b>
            {formData.nroafiliadopaciente}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon sx={lineStyle} />
            <b style={lineStyle}>Referente O.S.: </b>
            {formData.nombreyapellidoreferenteobrasocial}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.ImportContactsIcon sx={lineStyle} />
            <b style={lineStyle}>DNI: </b>
            {formData.dnipaciente}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Fecha Nacimiento: </b>
            {dateFormat(formData.fechanacimientopaciente)}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CakeIcon sx={lineStyle} />
            <b style={lineStyle}>Edad: </b>
            {patientAge}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.HouseIcon sx={lineStyle} />
            <b style={lineStyle}>Dirección: </b>
            {formData.direccionpaciente}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.WhatsAppIcon sx={lineStyle} />
            <b style={lineStyle}>Tel. Resp.: </b>
            <a
              href={`https://wa.me/${formData.telefonoresponsable}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.telefonoresponsable}
            </a>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.LocationCityIcon sx={lineStyle} />
            <b style={lineStyle}>Ciudad: </b>
            {formData.ciudadpaciente}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Pers. Resp. Paciente: </b>
            {formData.nombreyapellidoresponsable}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.SchoolIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Escuela: </b>
            {formData.escuela}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.SchoolIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Dirección Escuela: </b>
            {formData.direccionescuela}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.WhatsAppIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Teléfono Escuela: </b>
            <a
              href={`https://wa.me/${formData.telefonoescuela}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.telefonoescuela}
            </a>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.SchoolIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Año / Grado / Sala: </b>
            {formData.aniogradoSala}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Docente Referente: </b>
            {formData.nombreyapellidodocentereferenteescuela}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Directivo Escuela: </b>
            {formData.nombreyapellidodirectivoescuela}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.SchoolIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Escuela Especial: </b>
            {formData.escuelaespecial}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.PersonIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Ref. Esc. Esp.: </b>
            {formData.nombreyapellidodocentereferenteescuelaespecial}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.WhatsAppIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Tel. Ref. Esc. Esp.: </b>
            <a
              href={`https://wa.me/${formData.telefonodocentereferenteescuelaespecial}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.telefonodocentereferenteescuelaespecial}
            </a>
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CardMembershipIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>CUD: </b>
            {formData.cud ? "Si" : "No"}
          </Typography>
          {formData.cud && (
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={dataStyle}
            >
              <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
              <b style={lineStyle}>Fecha Venc. CUD: </b>
              {dateFormat(formData.fechavencimientocud)}
            </Typography>
          )}
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Fecha inicio: </b>
            {dateFormat(formData.fechainiciotto)}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.MedicationIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Diagóstico Previo: </b>
            {formData.diagnosticoprevio}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={dataStyle}>
            <Icons.CalendarMonthIcon variant="h7" sx={lineStyle} />
            <b style={lineStyle}>Última Actualización: </b>
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
              margin: "0 10px 0 10px",
            }}
          >
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Link to={`/patients/documentation/${formData.id}`}>
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
              <Link to={`${billingRecordsListRoute}/${formData.id}`}>
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
              <Link to={`${medicalRecordsListRoute}/${formData.id}`}>
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
          </Box>
        </CardActions>
        <CardActions>
          <BackButtonContainer />
        </CardActions>
      </Card>
    </Box>
  );
};
