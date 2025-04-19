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
}) => {
  const [reportMode, setReportMode] = useState(false);

  let createRoute = "/medicalRecords/createMedicalRecord";
  let editRoute = "/medicalRecords/edit";

  if (professionalId) {
    createRoute += `/professional/${professionalId}`;
    editRoute += `/professional/${professionalId}`;
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
