import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { Link } from "react-router-dom";

import "./medicalRecordList.css";
import "../../../assets/css/globalFormat.css";
import { useState } from "react";

import { dateFormat } from "../../../utils/helpers";
import { BackButtonContainer } from "../../../components/common/backButton/BackButtonContainer";
import { GeneralBarContainer } from "../../../components/layouts/generalBar/GeneralBarContainer";
import { EditModeButtonGroupContainer } from "../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";
import { PaginationContainer } from "../../../components/common/pagination/PaginationContainer";
export const MedicalRecordsList = ({
  medicalRecords,
  professionalsList,
  handleDeleteMedicalRecord,
  editMode,
  setEditMode,
  patientId,
  professionalId,
  titleName,
  handleCheckboxChange,
  selectedRecords,
  patient,
  professionals,
  userProfessionalId,
  userProfile,
  fieldsToSearch,
  setFilteredRecords,
  records,
}) => {
  const [reportMode, setReportMode] = useState(false);

  let createRoute = "/medicalRecords/createMedicalRecord";
  let editRoute = "/medicalRecords/edit";

  //Si se ingresa por el perfil del profesional se utiliza el id del profesional
  if (professionalId) {
    createRoute += `/professional/${professionalId}`;
    editRoute += `/professional/${professionalId}`;
  } else if (userProfessionalId && userProfile !== "admin") {
    //Si no se ingresa por el perfil del profesional y el usuario no es admin se utiliza el id del profesional del contexto
    createRoute += `/professional/${userProfessionalId}`;
    editRoute += `/professional/${userProfessionalId}`;
  }
  if (patientId) {
    createRoute += `/patient/${patientId}`;
    editRoute += `/patient/${patientId}`;
  }

  const generalBarContainerProps = {
    //Barra edicion
    editMode,
    setEditMode,
    buttonText: "Consulta",
    buttonIcon: <Icons.AddIcon />,
    to: `${createRoute}`,
    tooltipMessage: "Crear consulta",

    //Barra reporte
    professionalsList,
    selectedRecords,
    patient,
    professionals,
    enableReportBar: patientId ? true : false, //Solamente se accede a la barra de reporte si se ha seleccionado un paciente

    //General
    reportMode,
    setReportMode,

    //Barra busqueda
    fieldsToSearch,
    setFilteredRecords,
    records,
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        Consultas {(patientId || professionalId) && `${titleName}`}
      </Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${medicalRecords.length} registros obtenidos`}</Box>

      <PaginationContainer items={medicalRecords} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="listContainer">
            {recordsToShow.map((medicalRecord) => {
              // Si el usuario no es admin, solamente puede editarse sus propias consultas
              const editAllowed =
                userProfile === "admin" ||
                userProfessionalId === medicalRecord.idprofesional;
              return (
                <Card key={medicalRecord.id} className="medicalRecordListItem">
                  <CardContent>
                    {reportMode && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => handleCheckboxChange(medicalRecord)}
                            checked={selectedRecords.some(
                              (r) => r.id === medicalRecord.id
                            )}
                          />
                        }
                        label="Seleccionar para informe"
                      />
                    )}
                    <Box className="medicalRecordListItemHeader">
                      <Box>
                        <b>Paciente: </b>
                        {medicalRecord.pacientes.nombreyapellidopaciente}
                      </Box>
                      <Box>
                        <b>Profesional: </b>
                        {medicalRecord.profesionales.nombreyapellidoprofesional}
                      </Box>
                      <Box>
                        <b>Fecha: </b> {dateFormat(medicalRecord.fechaconsulta)}
                      </Box>
                      <Box>
                        <b>Tipo Consulta: </b> {medicalRecord.tipoconsulta}
                      </Box>
                    </Box>
                    <Typography className="medicalRecordListItemDescription">
                      {medicalRecord.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions className="medicalRecordListItemActions">
                    {editMode ? (
                      <EditModeButtonGroupContainer
                        deleteFunction={() =>
                          handleDeleteMedicalRecord(medicalRecord.id)
                        }
                        editLink={`${editRoute}/${medicalRecord.id}`}
                        isAllowed={editAllowed}
                      />
                    ) : (
                      <Link to={`/medicalRecords/detail/${medicalRecord.id}`}>
                        <Button variant="outlined" size="small">
                          Ver detalles
                        </Button>
                      </Link>
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
