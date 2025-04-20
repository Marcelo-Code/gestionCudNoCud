import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Icons } from "../../../assets/Icons";

import "./paymentRequestsList.css";
import "../../../assets/css/globalFormat.css";

import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { GeneralBarContainer } from "../../../components/layouts/generalBar/GeneralBarContainer";
import { EditModeButtonGroupContainer } from "../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";
import { PaginationContainer } from "../../../components/common/pagination/PaginationContainer";
export const PaymentRequestsList = ({
  paymentRequests,
  handleDeletePaymentRequest,
  editMode,
  setEditMode,
  cudBillingRecordId,
  cudBillingRecord,
}) => {
  let createRoute = "/paymentRequests/createPaymentRequest";
  let editRoute = "/paymentRequests/edit";

  if (cudBillingRecordId) {
    createRoute += `/cudBillingRecords/${cudBillingRecordId}`;
    editRoute += `/cudBillingRecords/${cudBillingRecordId}`;
  }

  const generalBarContainerProps = {
    //Barra edicion
    editMode,
    setEditMode,
    buttonText: "Reclamo",
    buttonIcon: <Icons.AddIcon />,
    to: `${createRoute}`,
    tooltipMessage: "Crear reclamo",

    enableReportBar: false,
  };

  let titleName = "Reclamos";

  if (cudBillingRecordId) {
    titleName += ` factura ${cudBillingRecord.nrofactura}`;
  }

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">{titleName}</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${paymentRequests.length} registros obtenidos`}</Box>

      <PaginationContainer items={paymentRequests} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="listContainer">
            {recordsToShow.map((paymentRequest) => {
              return (
                <Card key={paymentRequest.id} className="medicalRecordListItem">
                  <CardContent>
                    <Box className="medicalRecordListItemHeader">
                      <Box>
                        <b>Fecha reclamo: </b>
                        {dateFormat(paymentRequest.fechareclamo)}
                      </Box>
                      <Box>
                        <b>Profesional: </b>
                        {
                          paymentRequest.facturacioncud.profesionales
                            .nombreyapellidoprofesional
                        }
                      </Box>
                      <Box>
                        <b>Obra social: </b>
                        {
                          paymentRequest.facturacioncud.pacientes
                            .obrasocialpaciente
                        }
                      </Box>
                      <Box>
                        <b>Factura: </b>
                        {paymentRequest.facturacioncud.nrofactura}
                      </Box>
                      <Box>
                        <b>Medio reclamo: </b>
                        {paymentRequest.medioreclamo}
                      </Box>
                    </Box>
                    <Box className="medicalRecordListItemDescription">
                      <Typography>
                        <b>Descripción reclamo: </b>
                      </Typography>
                      <Typography>
                        {paymentRequest.descripcionreclamo}
                      </Typography>
                    </Box>
                    <Box className="medicalRecordListItemDescription">
                      <Typography>
                        <b>Respuesta reclamo: </b>
                      </Typography>
                      <Typography>{paymentRequest.respuestareclamo}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions className="medicalRecordListItemActions">
                    {editMode && (
                      <EditModeButtonGroupContainer
                        deleteFunction={() =>
                          handleDeletePaymentRequest(paymentRequest.id)
                        }
                        editLink={`${editRoute}/${paymentRequest.id}`}
                      />
                    )}
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
      </PaginationContainer>
      <BackButtonContainer />
    </Box>
  );
};
