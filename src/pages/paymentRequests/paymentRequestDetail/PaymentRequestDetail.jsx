import { Box, Card, CardContent, Typography } from "@mui/material";

import "./paymentRequestDetail.css";
import "../../../assets/css/globalFormat.css";
import { SizeTextButtonGroupContainer } from "../../../components/common/sizeTextButtonGroup/SizeTextButtonGroupContainer";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { dateFormat } from "../../../utils/helpers";

export const PaymentRequestDetail = ({ formData, textSize, setTextSize }) => {
  const sizeTextButtonGroupContainerProps = { textSize, setTextSize };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">{`Detalle reclamo`}</Box>

      {/* Barra de botones para cambiar el tamaño del texto */}
      <SizeTextButtonGroupContainer {...sizeTextButtonGroupContainerProps} />

      <Card sx={{ width: "90%" }} className="paymentRequestDetailContainer">
        <CardContent>
          <Box className="paymentRequestDetailHeader">
            <Box>
              <b>Fecha reclamo: </b>
              {dateFormat(formData.fechareclamo)}
            </Box>
            <Box>
              <b>Profesional: </b>
              {
                formData.facturacioncud?.profesionales
                  ?.nombreyapellidoprofesional
              }
            </Box>
            <Box>
              <b>Obra social: </b>
              {formData.facturacioncud?.pacientes?.obrasocialpaciente}
            </Box>
            <Box>
              <b>Factura: </b>
              {formData.facturacioncud?.nrofactura}
            </Box>
            <Box>
              <b>Medio reclamo: </b>
              {formData.medioreclamo}
            </Box>
          </Box>
          <Box className="paymentRequestDetailDescription">
            <Typography>
              <b>Descripción reclamo: </b>
            </Typography>
            <Typography>{formData.descripcionreclamo}</Typography>
          </Box>
          <Box className="paymentRequestDetailDescription">
            <Typography>
              <b>Respuesta reclamo: </b>
            </Typography>
            <Typography>{formData.respuestareclamo}</Typography>
          </Box>
        </CardContent>
      </Card>
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
