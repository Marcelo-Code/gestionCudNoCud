import { Box, Card, CardContent, Typography } from "@mui/material";
import "../../../assets/css/globalFormat.css";
import "./medicalRecordDetail.css";
import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { SizeTextButtonGroupContainer } from "../../../components/common/sizeTextButtonGroup/SizeTextButtonGroupContainer";

export const MedicalRecordDetail = (medicalRecordDetailProps) => {
  const { formData, textSize, setTextSize } = medicalRecordDetailProps;

  const sizeTextButtonGoupProps = { textSize, setTextSize };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Detalle Consulta:</Box>
      <SizeTextButtonGroupContainer {...sizeTextButtonGoupProps} />
      <Card className="medicalRecordDetailContainer">
        <CardContent sx={{ fontSize: `${textSize}px` }}>
          <Box className="medicalRecordDetailHeaderContainer">
            <Box>
              <b>Paciente: </b>
              {formData.pacientes?.nombreyapellidopaciente}
            </Box>
            <Box>
              <b>Profesional: </b>
              {formData.profesionales?.nombreyapellidoprofesional}
            </Box>
            <Box>
              <b>CUIT: </b>
              {formData.profesionales?.cuitprofesional}
            </Box>
            <Box>
              <b>Matrícula: </b>
              {formData.profesionales?.matriculaprofesional}
            </Box>
            <Box>
              <b>Especialidad: </b>
              {formData.profesionales?.especialidadprofesional}
            </Box>
            <Box>
              <b>Fecha: </b>
              {dateFormat(formData.fechaconsulta)}
            </Box>
            <Box>
              <b>Tipo Consulta: </b> {formData.tipoconsulta}
            </Box>
          </Box>
          <Typography
            className="medicalRecordDetailDescription"
            sx={{ fontSize: `${textSize}px` }}
          >
            {formData.descripcion}
          </Typography>
        </CardContent>
      </Card>
      <BackButtonContainer />
    </Box>
  );
};
