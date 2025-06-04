import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Icons } from "../../../assets/Icons";

import "./paymentRequestsList.css";
import "../../../assets/css/globalFormat.css";

import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { GeneralBarContainer } from "../../../components/layouts/generalBar/GeneralBarContainer";
import { EditModeButtonGroupContainer } from "../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";
import { PaginationContainer } from "../../../components/common/pagination/PaginationContainer";
import { allowCondition } from "../../../routes/allowedConditions";
export const PaymentRequestsList = ({
  paymentRequests,
  handleDeletePaymentRequest,
  editMode,
  setEditMode,
  cudBillingRecordId,
  professionalId,
  cudBillingRecord,
  userProfile,
  userProfessionalId,
  paymentRequestFieldsToSearch,
  setFilteredPaymentRequests,
  records,
  DEFAULT_SORT_OPTIONS,
}) => {
  let createRoute = "/paymentRequests/createPaymentRequest";
  let editRoute = "/paymentRequests/edit";

  if (cudBillingRecordId) {
    createRoute += `/cudBillingRecords/${cudBillingRecordId}/professional/${cudBillingRecord.idprofesional}`;
    editRoute += `/cudBillingRecords/${cudBillingRecordId}/professional/${cudBillingRecord.idprofesional}`;
  } else if (userProfessionalId && userProfile !== "admin") {
    editRoute += `/professional/${userProfessionalId}`;
  }

  if (professionalId) {
    createRoute += `/professional/${professionalId}`;
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
    fieldsToSearch: paymentRequestFieldsToSearch,
    setFilteredRecords: setFilteredPaymentRequests,
    records,
    DEFAULT_SORT_OPTIONS,
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
              // Si el usuario no es admin, solamente puede editarse sus propias consultas
              const editAllowed = allowCondition(
                userProfile,
                userProfessionalId,
                paymentRequest?.facturacioncud?.idprofesional
              );
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
                          paymentRequest?.facturacioncud?.profesionales
                            ?.nombreyapellidoprofesional
                        }
                      </Box>
                      <Box>
                        <b>Obra social: </b>
                        {
                          paymentRequest?.facturacioncud?.pacientes
                            ?.obrasocialpaciente
                        }
                      </Box>
                      <Box>
                        <b>Factura: </b>
                        {paymentRequest?.facturacioncud?.nrofactura}
                      </Box>
                      <Box>
                        <b>Medio reclamo: </b>
                        {paymentRequest?.medioreclamo}
                      </Box>
                    </Box>
                    <Box className="medicalRecordListItemDescription">
                      <Typography>
                        <b>Descripción reclamo: </b>
                      </Typography>
                      <Typography>
                        {paymentRequest?.descripcionreclamo}
                      </Typography>
                    </Box>
                    <Box className="medicalRecordListItemDescription">
                      <Typography>
                        <b>Respuesta reclamo: </b>
                      </Typography>
                      <Typography>
                        {paymentRequest?.respuestareclamo}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions className="medicalRecordListItemActions">
                    {editMode && (
                      <>
                        <EditModeButtonGroupContainer
                          deleteFunction={() =>
                            handleDeletePaymentRequest(paymentRequest.id)
                          }
                          editLink={`${editRoute}/${paymentRequest.id}`}
                          isAllowed={editAllowed}
                        />
                      </>
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
